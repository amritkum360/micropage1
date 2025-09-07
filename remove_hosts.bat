@echo off
echo Removing subdomain entries from hosts file...
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running as administrator - Good!
) else (
    echo ERROR: Please run this script as Administrator
    echo Right-click on this file and select "Run as administrator"
    pause
    exit /b 1
)

REM Restore from backup
echo Restoring hosts file from backup...
if exist "C:\Windows\System32\drivers\etc\hosts.backup" (
    copy "C:\Windows\System32\drivers\etc\hosts.backup" "C:\Windows\System32\drivers\etc\hosts" >nul 2>&1
    echo ✅ Hosts file restored successfully!
) else (
    echo ⚠️  No backup found. Please manually remove subdomain entries from hosts file.
)

echo.
pause
