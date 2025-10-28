#!/bin/bash

echo "==========================================="
echo "SFPMS Frontend Setup Script"
echo "==========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install npm dependencies"
    exit 1
fi

echo "✅ npm dependencies installed successfully"
echo ""

# Compile assets for development
echo "🔨 Compiling assets for development..."
npm run dev

if [ $? -ne 0 ]; then
    echo "❌ Failed to compile assets"
    exit 1
fi

echo "✅ Assets compiled successfully"
echo ""

echo "==========================================="
echo "✅ Frontend setup complete!"
echo "==========================================="
echo ""
echo "Next steps:"
echo "1. Run 'php artisan serve' to start the Laravel server"
echo "2. Open http://localhost:8000 in your browser"
echo "3. Login with demo credentials:"
echo "   Admin: admin@sfpms.edu / admin123"
echo "   Faculty: john.smith@sfpms.edu / faculty123"
echo "   Student: alice.williams@student.sfpms.edu / student123"
echo ""
echo "For development with auto-reload:"
echo "Run 'npm run watch' in a separate terminal"
echo ""

