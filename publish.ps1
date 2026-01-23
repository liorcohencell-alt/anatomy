# Publish Script for Anatomy Learning App
# This script builds the project and pushes changes to GitHub for automatic deployment

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Publishing Anatomy Learning App..." -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build the project
Write-Host "[1/4] Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please check the errors above." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Step 2: Check git status
Write-Host "[2/4] Checking git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Step 3: Add and commit changes
Write-Host "[3/4] Adding and committing changes..." -ForegroundColor Yellow
git add .
$commitMessage = Read-Host "Enter commit message (default: 'Update anatomy data and UI')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update anatomy data and UI"
}
git commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No changes to commit or commit failed" -ForegroundColor Yellow
} else {
    Write-Host "✅ Changes committed!" -ForegroundColor Green
}
Write-Host ""

# Step 4: Push to GitHub
Write-Host "[4/4] Pushing to GitHub..." -ForegroundColor Yellow
git push
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed! Check your internet connection and GitHub access." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Pushed to GitHub!" -ForegroundColor Green
Write-Host ""

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "✅ Publish Complete!" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 GitHub Actions will now:" -ForegroundColor Green
Write-Host "   1. Install dependencies" -ForegroundColor Green
Write-Host "   2. Build the project" -ForegroundColor Green
Write-Host "   3. Deploy to GitHub Pages" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Check deployment status:" -ForegroundColor Cyan
Write-Host "   https://github.com/liorcohencell-alt/anatomy/actions" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Site will update in 2-3 minutes at:" -ForegroundColor Cyan
Write-Host "   https://liorcohencell-alt.github.io/anatomy/" -ForegroundColor Cyan
