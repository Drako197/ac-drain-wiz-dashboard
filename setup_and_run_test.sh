#!/bin/bash

# Setup and Run Enhanced AC Drain Wiz Test Script
# This script installs ChromeDriver and runs the enhanced test

echo "🚀 Setting up Enhanced AC Drain Wiz Test Environment"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Chrome is installed
check_chrome() {
    if command -v google-chrome &> /dev/null; then
        echo -e "${GREEN}✓${NC} Google Chrome found"
        return 0
    elif command -v chromium-browser &> /dev/null; then
        echo -e "${GREEN}✓${NC} Chromium found"
        return 0
    else
        echo -e "${RED}✗${NC} Chrome/Chromium not found"
        echo "Please install Google Chrome or Chromium first"
        return 1
    fi
}

# Install ChromeDriver
install_chromedriver() {
    echo ""
    echo "Installing ChromeDriver..."
    
    # Check if ChromeDriver is already installed
    if command -v chromedriver &> /dev/null; then
        echo -e "${GREEN}✓${NC} ChromeDriver already installed"
        return 0
    fi
    
    # Download and install ChromeDriver
    CHROMEDRIVER_VERSION="114.0.5735.90"
    CHROMEDRIVER_URL="https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_mac64.zip"
    
    echo "Downloading ChromeDriver..."
    curl -L -o chromedriver.zip "$CHROMEDRIVER_URL"
    
    if [ $? -eq 0 ]; then
        echo "Extracting ChromeDriver..."
        unzip -o chromedriver.zip
        chmod +x chromedriver
        sudo mv chromedriver /usr/local/bin/
        rm chromedriver.zip
        
        echo -e "${GREEN}✓${NC} ChromeDriver installed successfully"
        return 0
    else
        echo -e "${RED}✗${NC} Failed to download ChromeDriver"
        return 1
    fi
}

# Run the enhanced test
run_test() {
    echo ""
    echo "Running Enhanced Production Test..."
    echo ""
    
    if python3 enhanced_production_tester.py; then
        echo ""
        echo -e "${GREEN}✅ Test completed successfully!${NC}"
        echo ""
        echo "📁 Results available in:"
        echo "  - test_results/enhanced_test_results.json"
        echo "  - test_results/test_summary.md"
        echo "  - test_results/screenshots/"
        echo ""
        echo "🎯 Next steps:"
        echo "  1. Review the screenshots to see the visual flow"
        echo "  2. Check test_summary.md for a quick overview"
        echo "  3. Use the JSON data for detailed analysis"
    else
        echo -e "${RED}❌ Test failed${NC}"
        return 1
    fi
}

# Main execution
main() {
    echo "=== Enhanced AC Drain Wiz Test Setup ==="
    echo ""
    
    # Check Chrome installation
    if ! check_chrome; then
        exit 1
    fi
    
    # Install ChromeDriver
    if ! install_chromedriver; then
        echo -e "${RED}Failed to install ChromeDriver${NC}"
        exit 1
    fi
    
    # Run the test
    if ! run_test; then
        echo -e "${RED}Test execution failed${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}🎉 Setup and test completed successfully!${NC}"
}

# Run main function
main 