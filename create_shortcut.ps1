$desktop = [Environment]::GetFolderPath('Desktop')
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("$desktop\Kundli Software.lnk")
$Shortcut.TargetPath = 'D:\Project\Astro\Start-Kundli.bat'
$Shortcut.WorkingDirectory = 'D:\Project\Astro'
$Shortcut.Description = 'Detailed Kundli & Horoscope Software'
$Shortcut.Save()
Write-Host "Desktop shortcut created successfully."
