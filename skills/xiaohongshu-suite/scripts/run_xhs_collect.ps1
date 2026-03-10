param(
  [Parameter(Mandatory = $true)]
  [string]$Keyword,
  [int]$Limit = 20,
  [int]$DetailLimit = 5
)

$desktop = [Environment]::GetFolderPath("Desktop")
$safePrefix = ($Keyword -replace '[<>:"/\\|?*\x00-\x1F]', "_").Trim()
if ([string]::IsNullOrWhiteSpace($safePrefix)) {
  throw "Keyword cannot be empty after filename sanitization."
}

$csvPath = Join-Path $desktop ("{0}_top{1}.csv" -f $safePrefix, $Limit)
$reportPath = Join-Path $desktop ("{0}_summary.md" -f $safePrefix)
$scriptPath = Join-Path $PSScriptRoot "xhs_relay_collect.js"

node $scriptPath --keyword $Keyword --limit $Limit --detail-limit $DetailLimit --output-csv $csvPath --output-report $reportPath
