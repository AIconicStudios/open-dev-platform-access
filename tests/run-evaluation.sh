#!/bin/bash

# Full-Stack Application Evaluation Runner
# This script runs comprehensive automated tests across UI, API, and Database components

echo "🚀 Full-Stack Application Evaluation Suite"
echo "=========================================="

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run the evaluation
echo "🔍 Running comprehensive evaluation..."
node tests/evaluation-suite.js

echo ""
echo "✅ Evaluation complete!"
echo "📄 Check evaluation-report.json for detailed results"