param(
  [string]$RepoRoot = "."
)

$ErrorActionPreference = 'Stop'

$repo = Resolve-Path $RepoRoot
$canonicalRoot = Join-Path $repo 'docs\technical-docs'
$frontendRoot = Join-Path $repo 'apps\frontend\docs\technical-docs'
$backendRoot = Join-Path $repo 'apps\backend\docs'

$batchFiles = @(
  'PHASE3_BATCH1_PATHS.txt',
  'PHASE3_BATCH2_PATHS.txt',
  'PHASE3_BATCH3_PATHS.txt',
  'PHASE3_BATCH4_PATHS.txt'
)

$issues = New-Object System.Collections.Generic.List[string]

foreach ($batch in $batchFiles) {
  $batchPath = Join-Path $canonicalRoot $batch
  if (!(Test-Path $batchPath)) {
    continue
  }

  $paths = Get-Content $batchPath | Where-Object { $_ -and $_.Trim() -ne '' }
  foreach ($p in $paths) {
    $canonical = Join-Path $canonicalRoot $p
    $front = Join-Path $frontendRoot $p
    $back = Join-Path $backendRoot $p

    if (!(Test-Path $canonical)) {
      $issues.Add("Missing canonical file: $p")
    }

    foreach ($target in @($front, $back)) {
      if (!(Test-Path $target)) {
        $issues.Add("Missing app copy for migrated file: $target")
        continue
      }

      $text = Get-Content $target -Raw
      if ($text -notmatch 'Moved To Canonical Shared Docs') {
        $issues.Add("App copy is not redirect stub: $target")
      }

      if ($text -notmatch 'docs/technical-docs/') {
        $issues.Add("Redirect stub missing canonical link: $target")
      }
    }
  }
}

if ($issues.Count -gt 0) {
  Write-Output 'FAILED: shared docs migration checks found issues:'
  $issues | ForEach-Object { Write-Output ("- " + $_) }
  exit 1
}

Write-Output 'OK: shared docs migration checks passed.'
exit 0
