#!/bin/bash

# Quick Comparison Script for AC Drain Wiz Project
# This script provides a quick overview of the current project status

echo "=== AC Drain Wiz Project Quick Comparison ==="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check file existence
check_file() {
    if [ -f "$1" ]; then
        echo -e "  ${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "  ${RED}✗${NC} $2"
        return 1
    fi
}

# Function to check directory existence
check_dir() {
    if [ -d "$1" ]; then
        echo -e "  ${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "  ${RED}✗${NC} $2"
        return 1
    fi
}

echo "=== Project Structure Check ==="

# Check core files
echo ""
echo "Core Configuration Files:"
check_file "package.json" "package.json"
check_file "vite.config.js" "vite.config.js"
check_file "index.html" "index.html"
check_file "netlify.toml" "netlify.toml"
check_file "public/_redirects" "public/_redirects"
check_file ".gitignore" ".gitignore"

# Check source files
echo ""
echo "Source Files:"
check_file "src/main.jsx" "src/main.jsx"
check_file "src/App.jsx" "src/App.jsx"
check_file "src/App.css" "src/App.css"
check_file "src/index.css" "src/index.css"
check_file "src/styles.css" "src/styles.css"

# Check components
echo ""
echo "Components:"
check_file "src/components/Sidebar.jsx" "src/components/Sidebar.jsx"
check_file "src/components/Sidebar.css" "src/components/Sidebar.css"
check_file "src/components/OnboardingModal.jsx" "src/components/OnboardingModal.jsx"
check_file "src/components/OnboardingModal.css" "src/components/OnboardingModal.css"
check_file "src/components/Toast.jsx" "src/components/Toast.jsx"
check_file "src/components/Toast.css" "src/components/Toast.css"

# Check pages
echo ""
echo "Pages:"
check_file "src/pages/Dashboard.jsx" "src/pages/Dashboard.jsx"
check_file "src/pages/ManageClients.jsx" "src/pages/ManageClients.jsx"
check_file "src/pages/ManageEmployees.jsx" "src/pages/ManageEmployees.jsx"
check_file "src/pages/ManageServiceCalls.jsx" "src/pages/ManageServiceCalls.jsx"

# Check directories
echo ""
echo "Directories:"
check_dir "src/components" "src/components/"
check_dir "src/pages" "src/pages/"
check_dir "public" "public/"
check_dir "public/images" "public/images/"

# Check for icon components
echo ""
echo "Icon Components:"
check_file "src/components/DashboardIcon.jsx" "src/components/DashboardIcon.jsx"
check_file "src/components/ManageClientsIcon.jsx" "src/components/ManageClientsIcon.jsx"
check_file "src/components/ManageEmployeesIcon.jsx" "src/components/ManageEmployeesIcon.jsx"
check_file "src/components/ManageServiceCallsIcon.jsx" "src/components/ManageServiceCallsIcon.jsx"
check_file "src/components/SettingsIcon.jsx" "src/components/SettingsIcon.jsx"
check_file "src/components/SupportIcon.jsx" "src/components/SupportIcon.jsx"

# Check documentation
echo ""
echo "Documentation:"
check_file "DEPLOYMENT_GUIDE.md" "DEPLOYMENT_GUIDE.md"
check_file "README.md" "README.md"

# Count files
echo ""
echo "=== File Counts ==="
echo "Total files in project: $(find . -type f | wc -l)"
echo "JavaScript/JSX files: $(find . -name "*.js" -o -name "*.jsx" | wc -l)"
echo "CSS files: $(find . -name "*.css" | wc -l)"
echo "Component files: $(find src/components -name "*.jsx" 2>/dev/null | wc -l)"
echo "Page files: $(find src/pages -name "*.jsx" 2>/dev/null | wc -l)"

# Check if build works
echo ""
echo "=== Build Test ==="
if npm run build >/dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} Project builds successfully"
else
    echo -e "  ${RED}✗${NC} Build failed"
fi

# Check for missing assets
echo ""
echo "=== Missing Assets Check ==="
local assets=(
    "public/images/acdrainwiz_logo.png"
    "public/images/technician-hero.png"
    "public/images/Congrats_header_image.png"
    "public/images/Rocket_lower_right_bg.png"
    "public/images/rocket-full.svg"
)

for asset in "${assets[@]}"; do
    if [ -f "$asset" ]; then
        echo -e "  ${GREEN}✓${NC} $asset"
    else
        echo -e "  ${YELLOW}⚠${NC} $asset (missing)"
    fi
done

echo ""
echo "=== Summary ==="
echo "This script has checked your current project structure."
echo "If you see any red ✗ marks, those files are missing."
echo "If you see yellow ⚠ marks, those are warnings (like missing assets)."
echo ""
echo "To compare with other versions, run the full comparison script:"
echo "  ./compare_projects.sh" 