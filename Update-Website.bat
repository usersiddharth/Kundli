@echo off
title Update Kundli Website on Vercel
cd /d "%~dp0"

echo =======================================================
echo     Deploy / Update Website to Vercel (via GitHub)
echo =======================================================
echo.

set "commit_msg="
set /p commit_msg="Enter update description (or press ENTER for default): "

if "%commit_msg%"=="" set "commit_msg=Update website"

echo.
echo [1/3] Staging changes...
git add .

echo.
echo [2/3] Creating commit: "%commit_msg%"...
git commit -m "%commit_msg%"

echo.
echo [3/3] Pushing to GitHub...
git push

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================
    echo   SUCCESS! Changes pushed to GitHub.
    echo   Vercel is now updating your live website automatically!
    echo =======================================================
) else (
    echo.
    echo =======================================================
    echo   ERROR: Git push failed. Please check your connection.
    echo =======================================================
)

echo.
pause
