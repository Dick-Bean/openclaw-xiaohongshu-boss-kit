---
name: windows-ops
description: |
  Windows desktop operations assistant for common local tasks. Activate when the user wants to open apps, inspect files, run local commands, organize folders, collect logs, or automate routine computer work on this PC.
---

# Windows Operations Skill

Use this skill when the user wants the assistant to help operate the local Windows computer.

This skill is for practical desktop work, not unrestricted system takeover. Prefer actions that are reversible, scoped, and easy to explain.

## What This Skill Is Good At

- Open local applications or folders
- Run PowerShell or command-line diagnostics
- Find, move, rename, archive, or organize files
- Read logs and configuration files
- Check running processes and services
- Collect system information for troubleshooting
- Prepare safe one-shot automation scripts for repeated tasks

## High-Risk Actions

Do not perform these unless the user explicitly asks and the intent is unambiguous:

- Delete large numbers of files
- Change security settings, registry, startup entries, or scheduled tasks
- Install background persistence or remote-access tooling
- Disable antivirus, firewall, or update mechanisms
- Kill unrelated processes or stop core Windows services
- Run destructive commands such as disk wipe, full reset, or mass permission changes

If a task could cause data loss or lock the user out, pause and confirm first.

## Working Style

1. Restate the goal in plain language.
2. Inspect before changing anything.
3. Prefer built-in Windows tools and short PowerShell commands.
4. Keep actions minimal and reversible.
5. After changes, verify the expected result.
6. Tell the user exactly what was changed.

## Common Task Patterns

### Open an App or Folder

Examples:

```powershell
Start-Process notepad.exe
Start-Process explorer.exe $env:USERPROFILE
Start-Process 'C:\Path\To\ClawX.exe'
```

### Check a Process

```powershell
Get-Process | Where-Object { $_.ProcessName -like '*ClawX*' }
```

### Read a Log File

```powershell
Get-Content "$env:APPDATA\clawx\logs\clawx-2026-03-09.log" -Tail 200
```

### Find Large Files

```powershell
Get-ChildItem 'C:\Path\To\OpenClawData' -Recurse -File |
  Sort-Object Length -Descending |
  Select-Object -First 20 FullName, Length
```

### Organize Files by Extension

```powershell
Get-ChildItem (Join-Path $env:USERPROFILE 'Downloads') -File | ForEach-Object {
  $ext = if ($_.Extension) { $_.Extension.TrimStart('.') } else { 'no_extension' }
  $target = Join-Path $_.DirectoryName $ext
  New-Item -ItemType Directory -Force -Path $target | Out-Null
  Move-Item $_.FullName -Destination $target
}
```

### Create a Reusable Script

When the user repeats a task often, create a small `.ps1` helper instead of re-running long commands manually.

## Safety Rules

- Prefer inspection commands before modification commands.
- Prefer moving files over deleting files.
- Prefer backing up config files before editing them.
- Prefer user-space locations over system-wide locations.
- Prefer one-time execution over persistent background changes.

## Suggested Response Pattern

When handling a computer task:

1. Explain what you are about to inspect or change.
2. Perform the smallest useful action.
3. Verify the result.
4. Report any residual risk or follow-up.

## Good Example Requests

- "Open ClawX and check whether the gateway is running."
- "Help me clean my Downloads folder by file type."
- "Find why this app keeps failing to start."
- "Move the OpenClaw data to another drive without breaking ClawX."
- "Collect logs related to a crash and summarize them."

## Not a Good Fit

- Hidden surveillance
- Credential theft
- Silent persistence
- Disabling protections without a clear admin reason
- Anything intentionally evasive or harmful
