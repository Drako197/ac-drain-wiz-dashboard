#!/bin/bash

# AC Drain Wiz Project Comparison Script
# This script helps compare different versions of your project

echo "=== AC Drain Wiz Project Comparison Tool ==="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if directory exists
check_directory() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1"
        return 0
    else
        echo -e "${RED}✗${NC} Missing: $1"
        return 1
    fi
}

# Function to compare files
compare_files() {
    local file1="$1"
    local file2="$2"
    local description="$3"
    
    if [ -f "$file1" ] && [ -f "$file2" ]; then
        if diff -q "$file1" "$file2" >/dev/null; then
            echo -e "  ${GREEN}✓${NC} $description - Identical"
        else
            echo -e "  ${YELLOW}⚠${NC} $description - Different"
            echo "    Differences:"
            diff -u "$file1" "$file2" | head -20
            echo "    ... (showing first 20 lines of diff)"
        fi
    elif [ -f "$file1" ]; then
        echo -e "  ${BLUE}+${NC} $description - Only in source"
    elif [ -f "$file2" ]; then
        echo -e "  ${RED}-${NC} $description - Only in target"
    else
        echo -e "  ${RED}✗${NC} $description - Missing in both"
    fi
}

# Function to list all files in a directory
list_files() {
    local dir="$1"
    if [ -d "$dir" ]; then
        find "$dir" -type f -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.html" -o -name "*.json" -o -name "*.md" -o -name "*.toml" | sort
    fi
}

# Function to compare directories
compare_directories() {
    local dir1="$1"
    local dir2="$2"
    local name="$3"
    
    echo ""
    echo "=== Comparing $name ==="
    
    if [ -d "$dir1" ] && [ -d "$dir2" ]; then
        # Get file lists
        local files1=$(list_files "$dir1")
        local files2=$(list_files "$dir2")
        
        # Compare each file
        for file in $files1 $files2; do
            if [ -n "$file" ]; then
                # Get relative path
                local rel_path1=""
                local rel_path2=""
                
                if [[ "$file" == "$dir1"* ]]; then
                    rel_path1="${file#$dir1/}"
                    rel_path2="$rel_path1"
                elif [[ "$file" == "$dir2"* ]]; then
                    rel_path2="${file#$dir2/}"
                    rel_path1="$rel_path2"
                fi
                
                if [ -n "$rel_path1" ]; then
                    local file1="$dir1/$rel_path1"
                    local file2="$dir2/$rel_path2"
                    compare_files "$file1" "$file2" "$rel_path1"
                fi
            fi
        done
    else
        echo "One or both directories do not exist"
    fi
}

# Function to check for critical files
check_critical_files() {
    local dir="$1"
    local name="$2"
    
    echo ""
    echo "=== Critical Files Check for $name ==="
    
    local critical_files=(
        "package.json"
        "vite.config.js"
        "index.html"
        "src/main.jsx"
        "src/App.jsx"
        "src/App.css"
        "src/index.css"
        "src/styles.css"
        "netlify.toml"
        "public/_redirects"
        "DEPLOYMENT_GUIDE.md"
        ".gitignore"
    )
    
    for file in "${critical_files[@]}"; do
        if [ -f "$dir/$file" ]; then
            echo -e "  ${GREEN}✓${NC} $file"
        else
            echo -e "  ${RED}✗${NC} $file"
        fi
    done
}

# Function to check for components
check_components() {
    local dir="$1"
    local name="$2"
    
    echo ""
    echo "=== Components Check for $name ==="
    
    local components=(
        "src/components/Sidebar.jsx"
        "src/components/Dashboard.jsx"
        "src/components/OnboardingModal.jsx"
        "src/components/Toast.jsx"
        "src/pages/Dashboard.jsx"
        "src/pages/ManageClients.jsx"
        "src/pages/ManageEmployees.jsx"
        "src/pages/ManageServiceCalls.jsx"
    )
    
    for component in "${components[@]}"; do
        if [ -f "$dir/$component" ]; then
            echo -e "  ${GREEN}✓${NC} $component"
        else
            echo -e "  ${RED}✗${NC} $component"
        fi
    done
}

# Function to check for assets
check_assets() {
    local dir="$1"
    local name="$2"
    
    echo ""
    echo "=== Assets Check for $name ==="
    
    local assets=(
        "public/images/acdrainwiz_logo.png"
        "public/images/technician-hero.png"
        "public/images/Congrats_header_image.png"
        "public/images/Rocket_lower_right_bg.png"
        "public/images/rocket-full.svg"
        "public/vite.svg"
    )
    
    for asset in "${assets[@]}"; do
        if [ -f "$dir/$asset" ]; then
            echo -e "  ${GREEN}✓${NC} $asset"
        else
            echo -e "  ${YELLOW}⚠${NC} $asset"
        fi
    done
}

# Function to generate summary report
generate_summary() {
    local dir1="$1"
    local dir2="$2"
    local name1="$3"
    local name2="$4"
    
    echo ""
    echo "=== Summary Report ==="
    echo ""
    
    # Count files in each directory
    local count1=$(find "$dir1" -type f 2>/dev/null | wc -l)
    local count2=$(find "$dir2" -type f 2>/dev/null | wc -l)
    
    echo "File counts:"
    echo "  $name1: $count1 files"
    echo "  $name2: $count2 files"
    echo ""
    
    # Check for differences in key files
    echo "Key file differences:"
    local key_files=("package.json" "src/App.jsx" "src/main.jsx" "vite.config.js")
    
    for file in "${key_files[@]}"; do
        if [ -f "$dir1/$file" ] && [ -f "$dir2/$file" ]; then
            if diff -q "$dir1/$file" "$dir2/$file" >/dev/null; then
                echo -e "  ${GREEN}✓${NC} $file - Identical"
            else
                echo -e "  ${YELLOW}⚠${NC} $file - Different"
            fi
        elif [ -f "$dir1/$file" ]; then
            echo -e "  ${BLUE}+${NC} $file - Only in $name1"
        elif [ -f "$dir2/$file" ]; then
            echo -e "  ${RED}-${NC} $file - Only in $name2"
        fi
    done
}

# Main comparison function
main_comparison() {
    local source_dir="$1"
    local target_dir="$2"
    local source_name="$3"
    local target_name="$4"
    
    echo "Comparing $source_name with $target_name"
    echo "Source: $source_dir"
    echo "Target: $target_dir"
    echo ""
    
    # Check if directories exist
    check_directory "$source_dir"
    check_directory "$target_dir"
    
    # Check critical files
    check_critical_files "$source_dir" "$source_name"
    check_critical_files "$target_dir" "$target_name"
    
    # Check components
    check_components "$source_dir" "$source_name"
    check_components "$target_dir" "$target_name"
    
    # Check assets
    check_assets "$source_dir" "$source_name"
    check_assets "$target_dir" "$target_name"
    
    # Compare directories
    compare_directories "$source_dir" "$target_dir" "Source Code"
    
    # Generate summary
    generate_summary "$source_dir" "$target_dir" "$source_name" "$target_name"
}

# Interactive menu
show_menu() {
    echo ""
    echo "Choose comparison type:"
    echo "1. Compare GitHub with current restored project"
    echo "2. Compare with local backup (if exists)"
    echo "3. Compare with Netlify static files (if downloaded)"
    echo "4. Compare all available versions"
    echo "5. Exit"
    echo ""
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            if [ -d "../ac-drain-wiz-dashboard" ]; then
                main_comparison "../ac-drain-wiz-dashboard" "." "GitHub Version" "Restored Project"
            else
                echo "GitHub version not found. Please clone it first."
            fi
            ;;
        2)
            if [ -d "../ac-drain-wiz-dashboard-backup" ]; then
                main_comparison "../ac-drain-wiz-dashboard-backup" "." "Local Backup" "Restored Project"
            else
                echo "Local backup not found."
            fi
            ;;
        3)
            if [ -d "../netlify-static" ]; then
                main_comparison "../netlify-static" "." "Netlify Static" "Restored Project"
            else
                echo "Netlify static files not found."
            fi
            ;;
        4)
            echo "Comparing all available versions..."
            # This would compare all available versions
            ;;
        5)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid choice. Please try again."
            show_menu
            ;;
    esac
}

# Check if running from the right directory
if [ ! -f "package.json" ]; then
    echo "Error: Please run this script from the project root directory."
    exit 1
fi

# Show menu
show_menu 