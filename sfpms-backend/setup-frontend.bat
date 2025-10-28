@echo off
echo ===========================================
echo SFPMS Frontend Setup Script
echo ===========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo + Node.js is installed
node --version

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X npm is not installed. Please install npm first.
    exit /b 1
)

echo + npm is installed
npm --version
echo.

:: Install npm dependencies
echo Installing npm dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo X Failed to install npm dependencies
    exit /b 1
)

echo + npm dependencies installed successfully
echo.

:: Compile assets for development
echo Compiling assets for development...
call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo X Failed to compile assets
    exit /b 1
)

echo + Assets compiled successfully
echo.

echo ===========================================
echo + Frontend setup complete!
echo ===========================================
echo.
echo Next steps:
echo 1. Run 'php artisan serve' to start the Laravel server
echo 2. Open http://localhost:8000 in your browser
echo 3. Login with demo credentials:
echo    Admin: admin@sfpms.edu / admin123
echo    Faculty: john.smith@sfpms.edu / faculty123
echo    Student: alice.williams@student.sfpms.edu / student123
echo.
echo For development with auto-reload:
echo Run 'npm run watch' in a separate terminal
echo.

pause

