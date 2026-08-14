[CmdletBinding()]
param(
    [Parameter(Mandatory, Position = 0)][string]$Path,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$wingetIds = [ordered]@{
    ffmpeg    = 'Gyan.FFmpeg'
    oxipng    = 'Shssoichiro.Oxipng'
    jpegoptim = 'TimoKokkonen.Jpegoptim'
}

# winget and npm write shims and PATH changes that the running shell cannot see yet.
function Sync-Path {
    $parts = @(
        [Environment]::GetEnvironmentVariable('Path', 'Machine')
        [Environment]::GetEnvironmentVariable('Path', 'User')
        (Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Links')
        (Join-Path $env:APPDATA 'npm')
    )
    $env:PATH = ($parts | Where-Object { $_ }) -join ';'
}

Sync-Path
$missing = $wingetIds.Keys | Where-Object { -not (Get-Command $_ -ErrorAction SilentlyContinue) }

foreach ($tool in $missing) {
    Write-Host "Installing $tool..."
    winget install --id $wingetIds[$tool] -e --accept-source-agreements --accept-package-agreements --disable-interactivity
}

if ($missing) {
    Sync-Path
    $stillMissing = $missing | Where-Object { -not (Get-Command $_ -ErrorAction SilentlyContinue) }
    if ($stillMissing) {
        throw "Still unavailable after install: $($stillMissing -join ', '). Open a new terminal so PATH refreshes, then re-run."
    }
}

# gifsicle is absent from winget. Its npm package ships a real Windows binary and needs no admin,
# unlike the chocolatey package, which would stall on a UAC prompt.
if (-not (Get-Command gifsicle -ErrorAction SilentlyContinue) -and (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host 'Installing gifsicle...'
    npm install -g gifsicle --no-audit --no-fund --silent
    Sync-Path
}

$hasGifsicle = [bool](Get-Command gifsicle -ErrorAction SilentlyContinue)

# Proves the picture data survived. Stills hash every decoded frame. GIFs hash a resampled
# timeline, because gifsicle merges duplicate frames and combines their delays, which renders
# identically but changes the stored frame list. Video is stream copied, so hashing the copied
# bitstream is both exact and far cheaper than decoding.
function Get-MediaHash([string]$File, [string]$Kind) {
    $call = switch ($Kind) {
        'still' { @('-i', $File, '-f', 'framemd5', '-') }
        'anim' { @('-i', $File, '-vf', 'fps=50,format=rgb24', '-f', 'framemd5', '-') }
        'video' { @('-i', $File, '-c', 'copy', '-f', 'md5', '-') }
    }
    $lines = ffmpeg -v error @call 2>$null
    ((($lines) -notmatch '^#') | ForEach-Object { ($_ -split ',')[-1].Trim() }) -join "`n"
}

$targets = if (Test-Path -LiteralPath $Path -PathType Container) {
    Get-ChildItem -LiteralPath $Path -Recurse -File -Include *.png, *.jpg, *.jpeg, *.gif, *.mp4, *.mov, *.mkv, *.webm
}
else {
    @(Get-Item -LiteralPath $Path)
}

$temp = Join-Path $env:TEMP ('compress-' + [guid]::NewGuid())
New-Item -ItemType Directory -Path $temp | Out-Null

$before = 0L; $after = 0L; $count = 0; $skipped = @()

foreach ($file in $targets) {
    $ext = $file.Extension.ToLower()
    $work = Join-Path $temp $file.Name
    Copy-Item -LiteralPath $file.FullName -Destination $work -Force

    if ($ext -eq '.png') {
        $kind = 'still'
        oxipng -o max --strip safe -q $work
    }
    elseif ($ext -in '.jpg', '.jpeg') {
        $kind = 'still'
        # --all-progressive only re-orders how coefficients are stored, so the pixels are
        # untouched. It usually beats baseline optimization, which often finds nothing.
        jpegoptim -q --all-progressive $work | Out-Null
    }
    elseif ($ext -eq '.gif') {
        if (-not $hasGifsicle) { $skipped += "$($file.Name)  gifsicle not installed"; continue }
        $kind = 'anim'
        gifsicle -O3 -b $work
    }
    elseif ($ext -in '.mp4', '.mov', '.mkv', '.webm') {
        $kind = 'video'
        $remuxed = Join-Path $temp ('remux-' + $file.Name)
        ffmpeg -v error -y -i $work -c copy -movflags +faststart $remuxed
        Move-Item -LiteralPath $remuxed -Destination $work -Force
    }
    else {
        $skipped += "$($file.Name)  unsupported type"; continue
    }

    $newSize = (Get-Item -LiteralPath $work).Length
    if ($newSize -ge $file.Length) { $skipped += "$($file.Name)  already optimal"; continue }
    if ((Get-MediaHash $file.FullName $kind) -ne (Get-MediaHash $work $kind)) {
        $skipped += "$($file.Name)  VERIFY FAILED, original kept"; continue
    }

    $before += $file.Length; $after += $newSize; $count++
    '{0,-52} {1,7} -> {2,7} KB  -{3}%' -f $file.Name,
        [math]::Round($file.Length / 1KB), [math]::Round($newSize / 1KB),
        [math]::Round((1 - $newSize / $file.Length) * 100, 1)

    if (-not $DryRun) { Copy-Item -LiteralPath $work -Destination $file.FullName -Force }
}

Remove-Item -LiteralPath $temp -Recurse -Force

''
"compressed: $count of $($targets.Count)"
if ($count) {
    'total: {0} MB -> {1} MB   saved {2} MB ({3}%)' -f
        [math]::Round($before / 1MB, 2), [math]::Round($after / 1MB, 2),
        [math]::Round(($before - $after) / 1MB, 2), [math]::Round((1 - $after / $before) * 100, 1)
}
if ($skipped) { 'skipped:'; $skipped | ForEach-Object { "  $_" } }
if ($DryRun) { ''; 'DryRun: no files were modified.' }
