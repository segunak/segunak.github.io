[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$previewMax = 800
$previewQuality = 80
$supportedExtensions = @('.jpg', '.jpeg', '.png', '.webp')

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..\..')).Path
$originalRoot = Join-Path $repoRoot 'docs\assets\images\me'
$displayRoot = Join-Path $originalRoot 'display'
$previewRoot = Join-Path $originalRoot 'thumbs'
$manifestPath = Join-Path $repoRoot 'docs\_data\speaking_photos.json'
$imageScript = Join-Path $PSScriptRoot 'sync_image.py'
$validatorPath = Join-Path $PSScriptRoot 'validate-gallery.rb'

foreach ($tool in @('python', 'ruby')) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        throw "$tool is required to sync Speaking gallery previews."
    }
}

& python -c "import sys, PIL; from PIL import features; sys.exit(not (sys.version_info >= (3, 10) and int(PIL.__version__.split('.')[0]) >= 10 and features.check('webp')))"
if ($LASTEXITCODE -ne 0) {
    throw 'Python 3.10+ and Pillow 10+ with WebP support are required. Install Pillow with: python -m pip install "Pillow>=10"'
}

$lockPath = & git -C $repoRoot rev-parse --path-format=absolute --git-path speaking-photos.lock
if ($LASTEXITCODE -ne 0) {
    throw 'Unable to locate the Git directory for the speaking photo sync lock.'
}

$syncLock = $null
for ($attempt = 0; -not $syncLock; $attempt++) {
    try {
        $syncLock = [IO.File]::Open($lockPath, 'OpenOrCreate', 'ReadWrite', 'None')
    }
    catch [IO.IOException] {
        if (($_.Exception.HResult -band 0xffff) -ne 32) { throw }
        if ($attempt -ge 1200) { throw 'Timed out waiting for another speaking photo sync to finish.' }
        if ($attempt -eq 0) { Write-Host 'speaking photos: waiting for another sync to finish' }
        Start-Sleep -Seconds 1
    }
}

try {
    $photoFiles = @(& ruby $validatorPath --photo-files)
    if ($LASTEXITCODE -ne 0) {
        throw 'Unable to read the Speaking photo list.'
    }

    $sources = @()
    $expectedPreviews = @{}
    foreach ($file in $photoFiles) {
        if ([IO.Path]::GetFileName($file) -cne $file) {
            throw "Photo filename must not include a path: $file"
        }

        $extension = [IO.Path]::GetExtension($file)
        if ($supportedExtensions -notcontains $extension.ToLowerInvariant()) {
            throw "Unsupported photo format: $file"
        }

        $source = Join-Path $originalRoot $file
        if (-not (Test-Path -LiteralPath $source -PathType Leaf)) {
            throw "Photo listed in speaking.md does not exist: $file"
        }

        $stem = [IO.Path]::GetFileNameWithoutExtension($file)
        $preview = Join-Path $previewRoot "$stem.webp"
        $key = $preview.ToLowerInvariant()
        if ($expectedPreviews.ContainsKey($key)) {
            throw "Photo filenames must have unique names without regard to extension: $file"
        }

        $expectedPreviews[$key] = $true
        $sources += [pscustomobject]@{
            file = $file
            original = $source
            preview = $preview
        }
    }

    New-Item -ItemType Directory -Path $previewRoot -Force | Out-Null
    $generated = 0
    $unchanged = 0
    $removed = 0

    foreach ($photo in $sources) {
        $temporary = [IO.Path]::GetTempFileName()
        try {
            & python $imageScript $photo.original $temporary --max-dimension $previewMax --quality $previewQuality
            if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $temporary)) {
                throw "Failed to generate preview for $($photo.file)"
            }

            if ((Test-Path -LiteralPath $photo.preview) -and
                (Get-FileHash -LiteralPath $temporary -Algorithm SHA256).Hash -eq
                (Get-FileHash -LiteralPath $photo.preview -Algorithm SHA256).Hash) {
                $unchanged++
            }
            else {
                Move-Item -LiteralPath $temporary -Destination $photo.preview -Force
                $generated++
                Write-Host "generated: $($photo.file)"
            }
        }
        finally {
            if (Test-Path -LiteralPath $temporary) {
                Remove-Item -LiteralPath $temporary -Force
            }
        }
    }

    foreach ($preview in Get-ChildItem -LiteralPath $previewRoot -File -Filter *.webp) {
        if (-not $expectedPreviews.ContainsKey($preview.FullName.ToLowerInvariant())) {
            Remove-Item -LiteralPath $preview.FullName -Force
            $removed++
            Write-Host "removed orphan preview: $($preview.Name)"
        }
    }

    if (Test-Path -LiteralPath $displayRoot) {
        foreach ($display in Get-ChildItem -LiteralPath $displayRoot -File -Filter *.webp) {
            Remove-Item -LiteralPath $display.FullName -Force
            $removed++
            Write-Host "removed old display image: $($display.Name)"
        }
    }

    if (Test-Path -LiteralPath $manifestPath -PathType Leaf) {
        Remove-Item -LiteralPath $manifestPath -Force
        Write-Host 'removed obsolete photo manifest'
    }

    & ruby $validatorPath
    if ($LASTEXITCODE -ne 0) {
        throw 'Speaking gallery configuration validation failed.'
    }

    Write-Host "speaking photos: $($sources.Count) previews, $generated generated, $unchanged unchanged, $removed removed"
}
finally {
    $syncLock.Dispose()
}
