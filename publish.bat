@echo off
REM Publish Script for Anatomy Learning App
REM This script builds the project and pushes changes to GitHub for automatic deployment

echo.
echo =====================================
echo Publishing Anatomy Learning App...
echo =====================================
echo.

REM Step 1: Build the project
echo [1/4] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo Build failed! Please check the errors above.
    pause
    exit /b 1
)
echo Build successful!
echo.

REM Step 2: Check git status
echo [2/4] Checking git status...
call git status
echo.

REM Step 3: Add and commit changes
echo [3/4] Adding and committing changes...
call git add .
set /p commitMessage="Enter commit message (default: 'Update anatomy data and UI'): "
if "%commitMessage%"=="" (
    set commitMessage=Update anatomy data and UI
)
call git commit -m "%commitMessage%"
if %errorlevel% neq 0 (
    echo Warning: No changes to commit or commit failed
) else (
    echo Changes committed!
)
echo.

REM Step 4: Push to GitHub
echo [4/4] Pushing to GitHub...
call git push
if %errorlevel% neq 0 (
    echo.
    echo Push failed! Check your internet connection and GitHub access.
    pause
    exit /b 1
)
echo Pushed to GitHub!
echo.

echo =====================================
echo Publish Complete!
echo =====================================
echo.
echo GitHub Actions will now:
echo    1. Install dependencies
echo    2. Build the project
echo    3. Deploy to GitHub Pages
echo.
echo Check deployment status:
echo    https://github.com/liorcohencell-alt/anatomy/actions
echo.
echo Site will update in 2-3 minutes at:
echo    https://liorcohencell-alt.github.io/anatomy/
echo.
pause
