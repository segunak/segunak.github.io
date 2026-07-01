[CmdletBinding()]
param(
    [string]$PostsPath = (Join-Path (Get-Location) 'docs/_posts'),
    [switch]$Markdown
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Add-Tag {
    param(
        [System.Collections.Generic.SortedSet[string]]$TagSet,
        [string]$Value
    )

    $tag = $Value.Trim()

    if ($tag.Length -eq 0) {
        return
    }

    if (($tag.StartsWith('"') -and $tag.EndsWith('"')) -or ($tag.StartsWith("'") -and $tag.EndsWith("'"))) {
        $tag = $tag.Substring(1, $tag.Length - 2).Trim()
    }

    if ($tag.Length -gt 0) {
        $null = $TagSet.Add($tag)
    }
}

function Add-TagValue {
    param(
        [System.Collections.Generic.SortedSet[string]]$TagSet,
        [string]$RawValue
    )

    $value = $RawValue.Trim()

    if ($value.Length -eq 0) {
        return
    }

    if ($value.StartsWith('[') -and $value.EndsWith(']')) {
        $inner = $value.Substring(1, $value.Length - 2)

        foreach ($part in ($inner -split ',')) {
            Add-Tag -TagSet $TagSet -Value $part
        }

        return
    }

    Add-Tag -TagSet $TagSet -Value $value
}

if (-not (Test-Path -LiteralPath $PostsPath -PathType Container)) {
    throw "Posts path not found: $PostsPath"
}

$tags = [System.Collections.Generic.SortedSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$posts = Get-ChildItem -LiteralPath $PostsPath -Filter '*.md' -File | Sort-Object Name

foreach ($post in $posts) {
    $lines = Get-Content -LiteralPath $post.FullName

    if ($lines.Count -eq 0 -or $lines[0].TrimEnd() -ne '---') {
        continue
    }

    $inTags = $false

    for ($index = 1; $index -lt $lines.Count; $index++) {
        $line = $lines[$index].TrimEnd()

        if ($line -eq '---') {
            break
        }

        if ($line -match '^tags:\s*(.*)$') {
            $inTags = $true
            Add-TagValue -TagSet $tags -RawValue $Matches[1]
            continue
        }

        if ($line -match '^[A-Za-z0-9_-]+:\s*') {
            $inTags = $false
            continue
        }

        if ($inTags -and $line -match '^\s*-\s*(.+?)\s*$') {
            Add-TagValue -TagSet $tags -RawValue $Matches[1]
        }
    }
}

foreach ($tag in $tags) {
    if ($Markdown) {
        "- $tag"
    }
    else {
        $tag
    }
}