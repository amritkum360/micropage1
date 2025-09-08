# PowerShell script to restart backend with Vercel environment variables

Write-Host "🔄 Restarting Backend Server with Vercel Integration..." -ForegroundColor Green

# Set environment variables
$env:VERCEL_API_TOKEN = "YdibGoolFjxmtEAvQtERbjGS"
$env:VERCEL_PROJECT_ID = "prj_hJubliY3ZTaF4ubAGsP6GtBJ1f9s"

Write-Host "✅ Environment variables set" -ForegroundColor Green
Write-Host "VERCEL_API_TOKEN: Set" -ForegroundColor Yellow
Write-Host "VERCEL_PROJECT_ID: Set" -ForegroundColor Yellow

# Navigate to backend directory
Set-Location backend

Write-Host "🚀 Starting backend server..." -ForegroundColor Green
Write-Host "Now when you add custom domains through frontend, they will be added to Vercel automatically!" -ForegroundColor Cyan

# Start server
node server.js
