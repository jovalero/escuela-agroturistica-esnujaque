Add-Type -AssemblyName System.Drawing

$srcPath = "C:/Users/Valero/.gemini/antigravity/brain/e32b1775-bc0a-4a5a-8ecb-b580cdc06ac4/.user_uploaded/media_1794609974548_dc7cb72c.jpg"
$outDir = "c:/Users/Valero/Desktop/PDS/public/brand"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Host "Original dimensions: $($bmp.Width) x $($bmp.Height)"

# Find bounding box of non-white content (threshold: brightness < 0.98 or color not pure white)
$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        # Check if pixel is not white (R, G, B not all > 250)
        if ($pixel.R -lt 248 -or $pixel.G -lt 248 -or $pixel.B -lt 248) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Bounding box of full logo: minX=$minX, maxX=$maxX, minY=$minY, maxY=$maxY"
$fullWidth = $maxX - $minX + 1
$fullHeight = $maxY - $minY + 1
Write-Host "Full logo size: $fullWidth x $fullHeight"

# Add padding
$pad = 12
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($bmp.Width - $cropX, $fullWidth + ($pad * 2))
$cropH = [Math]::Min($bmp.Height - $cropY, $fullHeight + ($pad * 2))

# 1. Save cropped full logo (with text)
$rectFull = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$croppedFull = $bmp.Clone($rectFull, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Make white background transparent
for ($y = 0; $y -lt $croppedFull.Height; $y++) {
    for ($x = 0; $x -lt $croppedFull.Width; $x++) {
        $p = $croppedFull.GetPixel($x, $y)
        if ($p.R -gt 250 -and $p.G -gt 250 -and $p.B -gt 250) {
            $croppedFull.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } elseif ($p.R -gt 240 -and $p.G -gt 240 -and $p.B -gt 240) {
            # smooth antialias edge
            $alpha = [int]((255 - [Math]::Max($p.R, [Math]::Max($p.G, $p.B))) * 255 / 15)
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 255) { $alpha = 255 }
            $croppedFull.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
        }
    }
}
$croppedFull.Save("$outDir/logo-completo.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved $outDir/logo-completo.png"

# Also save full logo with solid white/cream background
$solidFull = $bmp.Clone($rectFull, $bmp.PixelFormat)
$solidFull.Save("$outDir/logo-completo-solid.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Extract circular emblem alone
# Find the bottom of the circle: the text starts after a gap of white space
$circleMaxY = 0
for ($y = $minY; $y -lt $maxY; $y++) {
    $rowHasDark = $false
    for ($x = $minX; $x -lt $maxX; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.R -lt 240 -or $p.G -lt 240 -or $p.B -lt 240) {
            $rowHasDark = $true
            break
        }
    }
    # Look for the gap between emblem and text
    if ($y -gt ($minY + 200) -and !$rowHasDark) {
        $circleMaxY = $y
        break
    }
}

Write-Host "Circle bottom detected around Y=$circleMaxY"
$circleHeight = $circleMaxY - $minY
$circleCenterX = [int](($minX + $maxX) / 2)
$circleCenterY = [int](($minY + $circleMaxY) / 2)
$circleRadius = [int]([Math]::Max($fullWidth, $circleHeight) / 2) + 6

Write-Host "Circle center: ($circleCenterX, $circleCenterY), radius: $circleRadius"

$circleCropX = [Math]::Max(0, $circleCenterX - $circleRadius)
$circleCropY = [Math]::Max(0, $circleCenterY - $circleRadius)
$circleSize = $circleRadius * 2

$circleRect = New-Object System.Drawing.Rectangle($circleCropX, $circleCropY, $circleSize, $circleSize)
$circleBmp = $bmp.Clone($circleRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Make transparent outside circle
$rSquared = $circleRadius * $circleRadius
for ($cy = 0; $cy -lt $circleBmp.Height; $cy++) {
    for ($cx = 0; $cx -lt $circleBmp.Width; $cx++) {
        $dx = $cx - $circleRadius
        $dy = $cy - $circleRadius
        $distSq = ($dx * $dx) + ($dy * $dy)
        if ($distSq -gt ($circleRadius * $circleRadius)) {
            $circleBmp.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($distSq -gt (($circleRadius - 2) * ($circleRadius - 2))) {
            # antialias outer ring edge
            $p = $circleBmp.GetPixel($cx, $cy)
            $factor = ($circleRadius - [Math]::Sqrt($distSq)) / 2.0
            $alpha = [int]($factor * 255)
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 255) { $alpha = 255 }
            $circleBmp.SetPixel($cx, $cy, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
        }
    }
}

$circleBmp.Save("$outDir/logo-emblema.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved $outDir/logo-emblema.png ($circleSize x $circleSize)"

$bmp.Dispose()
$croppedFull.Dispose()
$solidFull.Dispose()
$circleBmp.Dispose()
