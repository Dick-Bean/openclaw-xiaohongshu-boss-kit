param(
  [string]$OpenClawHome = (Join-Path $env:USERPROFILE ".openclaw"),
  [string]$WorkspaceRoot = (Get-Location).Path
)

$repoRoot = Split-Path $PSScriptRoot -Parent
$skillsSource = Join-Path $repoRoot "skills"
$workflowSource = Join-Path $repoRoot "workflows\\xiaohongshu-boss.prose"

$skillsTarget = Join-Path $OpenClawHome "skills"
$workflowTargetDir = Join-Path $WorkspaceRoot "workflows"
$workflowTarget = Join-Path $workflowTargetDir "xiaohongshu-boss.prose"

New-Item -ItemType Directory -Force -Path $skillsTarget, $workflowTargetDir | Out-Null

foreach ($name in @("browser-assist", "windows-ops", "xiaohongshu-boss", "xiaohongshu-safe", "xiaohongshu-suite")) {
  $src = Join-Path $skillsSource $name
  $dst = Join-Path $skillsTarget $name
  if (Test-Path $dst) {
    Remove-Item $dst -Recurse -Force
  }
  Copy-Item $src -Destination $dst -Recurse -Force
}

Copy-Item $workflowSource -Destination $workflowTarget -Force

Write-Output "Installed skills to: $skillsTarget"
Write-Output "Installed workflow to: $workflowTarget"
