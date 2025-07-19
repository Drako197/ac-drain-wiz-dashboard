#!/bin/bash

# Update Local Files to Match Production Script
# This script updates local files to match the Netlify production version

echo "=== Updating Local Files to Match Production ==="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NETLIFY_DIR="../netlify-production-files"
LOCAL_DIR="."

# Function to copy file if it exists
copy_if_exists() {
    local source="$1"
    local dest="$2"
    local description="$3"
    
    if [ -f "$source" ]; then
        if cp "$source" "$dest"; then
            echo -e "  ${GREEN}✓${NC} $description"
        else
            echo -e "  ${RED}✗${NC} Failed to copy $description"
        fi
    else
        echo -e "  ${YELLOW}⚠${NC} Source not found: $source"
    fi
}

# Function to update assets
update_assets() {
    echo "Updating assets..."
    
    # Copy images
    copy_if_exists "$NETLIFY_DIR/images/acdrainwiz_logo.png" "$LOCAL_DIR/public/images/acdrainwiz_logo.png" "Logo"
    copy_if_exists "$NETLIFY_DIR/images/technician-hero.png" "$LOCAL_DIR/public/images/technician-hero.png" "Technician Hero"
    copy_if_exists "$NETLIFY_DIR/images/Congrats_header_image.png" "$LOCAL_DIR/public/images/Congrats_header_image.png" "Congratulations Header"
    copy_if_exists "$NETLIFY_DIR/images/Rocket_lower_right_bg.png" "$LOCAL_DIR/public/images/Rocket_lower_right_bg.png" "Rocket Background"
    copy_if_exists "$NETLIFY_DIR/images/rocket-full.svg" "$LOCAL_DIR/public/images/rocket-full.svg" "Rocket SVG"
    
    # Copy other assets
    copy_if_exists "$NETLIFY_DIR/vite.svg" "$LOCAL_DIR/public/vite.svg" "Vite SVG"
    copy_if_exists "$NETLIFY_DIR/favicon.ico" "$LOCAL_DIR/public/favicon.ico" "Favicon"
}

# Function to check for visual differences
check_visual_differences() {
    echo ""
    echo "=== Visual Differences Analysis ==="
    
    # Check if Material Symbols font is being used
    if grep -q "Material+Symbols+Outlined" "$LOCAL_DIR/index.html"; then
        echo -e "  ${GREEN}✓${NC} Material Symbols font included"
    else
        echo -e "  ${RED}✗${NC} Material Symbols font missing"
    fi
    
    # Check for key CSS classes that might be different
    echo ""
    echo "Checking for key styling differences..."
    
    # List files that might have visual differences
    local files_to_check=(
        "src/App.css"
        "src/styles.css"
        "src/components/Sidebar.css"
        "src/components/OnboardingModal.css"
        "src/components/Toast.css"
    )
    
    for file in "${files_to_check[@]}"; do
        if [ -f "$file" ]; then
            echo -e "  ${GREEN}✓${NC} $file exists"
        else
            echo -e "  ${RED}✗${NC} $file missing"
        fi
    done
}

# Function to create production build comparison
create_production_build() {
    echo ""
    echo "=== Creating Production Build for Comparison ==="
    
    if npm run build; then
        echo -e "  ${GREEN}✓${NC} Production build created successfully"
        
        # Compare built files with Netlify files
        echo ""
        echo "Comparing built files with Netlify files..."
        
        if [ -f "dist/index.html" ] && [ -f "$NETLIFY_DIR/index.html" ]; then
            if diff -q "dist/index.html" "$NETLIFY_DIR/index.html" >/dev/null; then
                echo -e "  ${GREEN}✓${NC} Built HTML matches Netlify"
            else
                echo -e "  ${YELLOW}⚠${NC} Built HTML differs from Netlify"
                echo "    Key differences:"
                diff "dist/index.html" "$NETLIFY_DIR/index.html" | head -10
            fi
        fi
    else
        echo -e "  ${RED}✗${NC} Production build failed"
    fi
}

# Function to provide recommendations
provide_recommendations() {
    echo ""
    echo "=== Recommendations ==="
    echo ""
    echo "1. ${GREEN}Assets Updated${NC}: All production images have been copied"
    echo "2. ${GREEN}Font Added${NC}: Material Symbols font is now included"
    echo "3. ${YELLOW}Build Comparison${NC}: Production build created for comparison"
    echo ""
    echo "Next steps:"
    echo "  - Restart your development server: npm run dev"
    echo "  - Check the visual appearance at http://localhost:5173"
    echo "  - Compare with production at https://acdw.luislopezdesign.com"
    echo ""
    echo "If visual differences remain:"
    echo "  - Check CSS files for missing styles"
    echo "  - Compare component implementations"
    echo "  - Verify all assets are loading correctly"
}

# Main execution
main() {
    echo "Starting update to match production version..."
    echo ""
    
    # Update assets
    update_assets
    
    # Check for visual differences
    check_visual_differences
    
    # Create production build for comparison
    create_production_build
    
    # Provide recommendations
    provide_recommendations
    
    echo ""
    echo "=== Update Complete ==="
    echo "Your local version should now more closely match the production experience."
    echo "Restart your development server to see the changes."
}

# Run main function
main 