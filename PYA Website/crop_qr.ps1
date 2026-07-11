Add-Type -AssemblyName System.Drawing
$imagePath = Join-Path -Path $PSScriptRoot -ChildPath "UPI - PYA.jpeg"
$img = [System.Drawing.Image]::FromFile($imagePath)

# The image is 908 x 1280
# The QR code starts around Y=400 and ends around Y=900
$x = 200
$y = 400
$w = 508
$h = 508

$cropRect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
$bmpImage = New-Object System.Drawing.Bitmap($cropRect.Width, $cropRect.Height)
$gfx = [System.Drawing.Graphics]::FromImage($bmpImage)
$gfx.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $bmpImage.Width, $bmpImage.Height)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
$savePath = Join-Path -Path $PSScriptRoot -ChildPath "qr_code.jpg"
$bmpImage.Save($savePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$gfx.Dispose()
$bmpImage.Dispose()
$img.Dispose()
Write-Host "QR Code cropped and saved to qr_code.jpg"
