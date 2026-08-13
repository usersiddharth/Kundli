@echo off
title Kundli & Astrology Software Launcher
echo =======================================================
echo   Starting Detailed Kundli Software (Gujarati/Hindi/EN)
echo =======================================================
echo.
echo Launching development server...
cd /d "%~dp0"
start "" http://localhost:5173/
npm run dev -- --host
