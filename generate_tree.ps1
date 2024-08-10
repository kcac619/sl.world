function Show-TreeStructure {
    param (
        [string]$Path = ".",
        [string]$Indent = "",
        [string]$LastItemPrefix = "`---",
        [string]$ItemPrefix = "|---",
        [string]$ChildItemPrefix = "|   "
    )

    $items = Get-ChildItem -Path $Path | Where-Object {
        $_.Name -notin @("node_modules", ".next",  ".env", ".eslintrc.json", ".gitignore", "code_context.txt", "directory_tree.txt", "generate_tree.ps1", "get_code_context.ps1", "next.config.js", "package-lock.json", "README.md")
    }

    foreach ($item in $items) {
        $isLast = ($item -eq $items[-1])
        $prefix = if ($isLast) { $LastItemPrefix } else { $ItemPrefix }
        
        Write-Output "$Indent$prefix$($item.Name)"

        if ($item.PSIsContainer) {
            $newIndent = if ($isLast) { "$Indent    " } else { "$Indent$ChildItemPrefix" }
            Show-TreeStructure -Path $item.FullName -Indent $newIndent
        }
    }
}

$project_dir = Get-Location
$output_file = Join-Path $project_dir "next_app_structure.txt"

Show-TreeStructure | Out-File -FilePath $output_file -Encoding utf8

Write-Output "The Next.js app structure has been generated at: $output_file"