[CmdletBinding()]
param(
    [switch]$Force
)

$ErrorActionPreference = 'Stop'

$transformVersion = 1
$displayMax = 2560
$displayQuality = 90
$thumbnailMax = 1200
$thumbnailQuality = 82
$supportedExtensions = @('.jpg', '.jpeg', '.png', '.webp')

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..\..')).Path
$originalRoot = Join-Path $repoRoot 'docs\assets\images\me'
$displayRoot = Join-Path $originalRoot 'display'
$thumbnailRoot = Join-Path $originalRoot 'thumbs'
$manifestPath = Join-Path $repoRoot 'docs\_data\speaking_photos.json'

foreach ($tool in @('ffmpeg', 'ffprobe')) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        throw "$tool is required. Install Gyan.FFmpeg with winget, then run this script again."
    }
}

if (-not (Get-Command ruby -ErrorAction SilentlyContinue)) {
    throw 'ruby is required to validate the Speaking gallery configuration.'
}

function Get-ImageInfo([string]$Path) {
    $json = & ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of json $Path
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to read image dimensions: $Path"
    }

    $stream = ($json | ConvertFrom-Json).streams | Select-Object -First 1
    if (-not $stream -or $stream.width -le 0 -or $stream.height -le 0) {
        throw "Invalid image dimensions: $Path"
    }

    [pscustomobject]@{
        width = [int]$stream.width
        height = [int]$stream.height
    }
}

function Get-DefaultCaption([string]$Stem) {
    $caption = $Stem -replace '[-_]+', ' '
    $caption = $caption -creplace '(?<=[a-z0-9])(?=[A-Z])', ' '
    $caption = $caption -creplace '(?<=[A-Z])(?=[A-Z][a-z])', ' '
    $caption = $caption -creplace '(?<=[A-Za-z])(?=\d)', ' '
    $caption = $caption -creplace '(?<=\d)(?=[A-Za-z])', ' '
    $caption = $caption -replace '\s+', ' '
    $caption = $caption.Trim()
    $caption = $caption -replace '\s((?:19|20)\d{2})$', ', $1'
    $caption
}

function Get-OutputIsCurrent([object]$Existing, [string]$SourceHash, [string]$DisplayPath, [string]$ThumbnailPath) {
    if ($Force -or -not $Existing -or $Existing.source_sha256 -ne $SourceHash) {
        return $false
    }

    if (-not (Test-Path -LiteralPath $DisplayPath) -or -not (Test-Path -LiteralPath $ThumbnailPath)) {
        return $false
    }

    $displayHash = (Get-FileHash -LiteralPath $DisplayPath -Algorithm SHA256).Hash.ToLowerInvariant()
    $thumbnailHash = (Get-FileHash -LiteralPath $ThumbnailPath -Algorithm SHA256).Hash.ToLowerInvariant()
    $displayHash -eq $Existing.display_sha256 -and $thumbnailHash -eq $Existing.thumbnail_sha256
}

function Write-WebP([string]$Source, [string]$Destination, [int]$MaxDimension, [int]$Quality) {
    $temporary = Join-Path ([IO.Path]::GetDirectoryName($Destination)) (([IO.Path]::GetFileNameWithoutExtension($Destination)) + '.tmp.webp')
    $filter = "scale='min($MaxDimension,iw)':'min($MaxDimension,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2"

    try {
        & ffmpeg -v error -y -i $Source -frames:v 1 -vf $filter -c:v libwebp -quality $Quality -compression_level 6 -preset picture -map_metadata -1 $temporary
        if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $temporary)) {
            throw "Failed to generate $Destination"
        }

        & ffmpeg -v error -i $temporary -f null -
        if ($LASTEXITCODE -ne 0) {
            throw "Generated WebP failed to decode: $Destination"
        }

        $info = Get-ImageInfo $temporary
        if ([math]::Max($info.width, $info.height) -gt $MaxDimension) {
            throw "Generated WebP exceeds ${MaxDimension}px: $Destination"
        }

        Move-Item -LiteralPath $temporary -Destination $Destination -Force
        $info
    }
    finally {
        if (Test-Path -LiteralPath $temporary) {
            Remove-Item -LiteralPath $temporary -Force
        }
    }
}

New-Item -ItemType Directory -Path $displayRoot -Force | Out-Null
New-Item -ItemType Directory -Path $thumbnailRoot -Force | Out-Null

$originals = @(Get-ChildItem -LiteralPath $originalRoot -File | Where-Object {
    $supportedExtensions -contains $_.Extension.ToLowerInvariant()
})

$duplicates = @($originals | Group-Object { $_.BaseName.ToLowerInvariant() } | Where-Object Count -gt 1)
if ($duplicates) {
    $names = $duplicates | ForEach-Object { ($_.Group.Name -join ', ') }
    throw "Duplicate photo basenames are not allowed: $($names -join '; ')"
}

$existingManifest = $null
if (Test-Path -LiteralPath $manifestPath) {
    try {
        $existingManifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
    }
    catch {
        Write-Warning 'Existing speaking photo manifest is invalid and will be regenerated.'
    }
}

$settingsCurrent = $existingManifest -and
    $existingManifest.version -eq $transformVersion -and
    $existingManifest.settings.display_max -eq $displayMax -and
    $existingManifest.settings.display_quality -eq $displayQuality -and
    $existingManifest.settings.thumbnail_max -eq $thumbnailMax -and
    $existingManifest.settings.thumbnail_quality -eq $thumbnailQuality

$existingByFile = @{}
if ($settingsCurrent) {
    foreach ($photo in $existingManifest.photos) {
        $existingByFile[$photo.file] = $photo
    }
}

$records = @()
$generated = 0
$skipped = 0
$expectedOutputs = @{}

foreach ($original in ($originals | Sort-Object Name)) {
    $stem = $original.BaseName
    $displayPath = Join-Path $displayRoot "$stem.webp"
    $thumbnailPath = Join-Path $thumbnailRoot "$stem.webp"
    $expectedOutputs[$displayPath.ToLowerInvariant()] = $true
    $expectedOutputs[$thumbnailPath.ToLowerInvariant()] = $true

    $sourceHash = (Get-FileHash -LiteralPath $original.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    $existing = $existingByFile[$original.Name]

    if (Get-OutputIsCurrent $existing $sourceHash $displayPath $thumbnailPath) {
        $displayInfo = [pscustomobject]@{ width = [int]$existing.display_width; height = [int]$existing.display_height }
        $thumbnailInfo = [pscustomobject]@{ width = [int]$existing.thumbnail_width; height = [int]$existing.thumbnail_height }
        $skipped++
    }
    else {
        $displayInfo = Write-WebP $original.FullName $displayPath $displayMax $displayQuality
        $thumbnailInfo = Write-WebP $original.FullName $thumbnailPath $thumbnailMax $thumbnailQuality
        $generated++
        Write-Host "generated: $($original.Name)"
    }

    $sourceInfo = Get-ImageInfo $original.FullName
    $yearMatches = [regex]::Matches($stem, '(?:19|20)\d{2}')
    $year = if ($yearMatches.Count) { [int]$yearMatches[$yearMatches.Count - 1].Value } else { $null }

    $records += [pscustomobject][ordered]@{
        file = $original.Name
        stem = $stem
        original = "/assets/images/me/$($original.Name)"
        display = "/assets/images/me/display/$stem.webp"
        thumbnail = "/assets/images/me/thumbs/$stem.webp"
        default_caption = Get-DefaultCaption $stem
        year = $year
        width = $sourceInfo.width
        height = $sourceInfo.height
        display_width = $displayInfo.width
        display_height = $displayInfo.height
        thumbnail_width = $thumbnailInfo.width
        thumbnail_height = $thumbnailInfo.height
        source_sha256 = $sourceHash
        display_sha256 = (Get-FileHash -LiteralPath $displayPath -Algorithm SHA256).Hash.ToLowerInvariant()
        thumbnail_sha256 = (Get-FileHash -LiteralPath $thumbnailPath -Algorithm SHA256).Hash.ToLowerInvariant()
    }
}

$removed = 0
foreach ($folder in @($displayRoot, $thumbnailRoot)) {
    foreach ($output in Get-ChildItem -LiteralPath $folder -File -Filter *.webp) {
        if (-not $expectedOutputs.ContainsKey($output.FullName.ToLowerInvariant())) {
            Remove-Item -LiteralPath $output.FullName -Force
            $removed++
            Write-Host "removed orphan: $($output.FullName)"
        }
    }
}

$records = @($records | Sort-Object @{ Expression = 'year'; Descending = $true }, @{ Expression = 'file'; Ascending = $true })
$manifest = [pscustomobject][ordered]@{
    version = $transformVersion
    settings = [pscustomobject][ordered]@{
        display_max = $displayMax
        display_quality = $displayQuality
        thumbnail_max = $thumbnailMax
        thumbnail_quality = $thumbnailQuality
    }
    photos = $records
}

$json = $manifest | ConvertTo-Json -Depth 5
$manifestDirectory = Split-Path -Parent $manifestPath
New-Item -ItemType Directory -Path $manifestDirectory -Force | Out-Null
[IO.File]::WriteAllText($manifestPath, $json + [Environment]::NewLine, [Text.UTF8Encoding]::new($false))

$validatorPath = Join-Path $PSScriptRoot 'validate-gallery.rb'
& ruby $validatorPath
if ($LASTEXITCODE -ne 0) {
    throw 'Speaking gallery configuration validation failed.'
}

Write-Host "speaking photos: $($records.Count) total, $generated generated, $skipped unchanged, $removed removed"
