Add-Type -AssemblyName System.Drawing
$imagePath = Join-Path -Path $PSScriptRoot -ChildPath "UPI - PYA.jpeg"
$img = [System.Drawing.Image]::FromFile($imagePath)
Write-Host "Width: $($img.Width)"
Write-Host "Height: $($img.Height)"
$img.Dispose()
