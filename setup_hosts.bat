@echo off
echo Setting up hosts file for subdomain testing...
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

REM Backup original hosts file
echo Backing up original hosts file...
copy "C:\Windows\System32\drivers\etc\hosts" "C:\Windows\System32\drivers\etc\hosts.backup" >nul 2>&1

REM Add subdomain entries
echo Adding subdomain entries to hosts file...
echo 127.0.0.1 amritkumars.localhost >> "C:\Windows\System32\drivers\etc\hosts"
echo 127.0.0.1 test.localhost >> "C:\Windows\System32\drivers\etc\hosts"
echo 127.0.0.1 demo.localhost >> "C:\Windows\System32\drivers\etc\hosts"

echo.
echo ✅ Hosts file updated successfully!
echo.
echo You can now test subdomains:
echo - http://amritkumars.localhost:3000
echo - http://test.localhost:3000
echo - http://demo.localhost:3000
echo.
echo To remove these entries later, run: remove_hosts.bat
echo.
pause
