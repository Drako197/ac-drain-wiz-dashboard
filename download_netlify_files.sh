#!/bin/bash

# Download Netlify Files and Compare Script
# This script downloads the production files from Netlify and compares them with local version

echo "=== Netlify Files Download and Comparison ==="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NETLIFY_URL="https://acdw.luislopezdesign.com"
DOWNLOAD_DIR="../netlify-production-files"
LOCAL_DIR="."

# Function to download files recursively
download_files() {
    local url="$1"
    local local_path="$2"
    
    echo "Downloading: $url"
    
    # Create directory if it doesn't exist
    mkdir -p "$(dirname "$local_path")"
    
    # Download the file
    if curl -s -o "$local_path" "$url"; then
        echo -e "  ${GREEN}✓${NC} Downloaded: $local_path"
    else
        echo -e "  ${RED}✗${NC} Failed to download: $url"
    fi
}

# Function to find and download all files
crawl_and_download() {
    local base_url="$1"
    local local_dir="$2"
    
    echo "Crawling $base_url for files..."
    
    # Download main HTML file first
    download_files "$base_url" "$local_dir/index.html"
    
    # Try to download common static files
    local static_files=(
        "/assets/index.js"
        "/assets/index.css"
        "/assets/vendor.js"
        "/assets/vendor.css"
        "/assets/main.js"
        "/assets/main.css"
        "/assets/App.js"
        "/assets/App.css"
        "/assets/Sidebar.js"
        "/assets/Sidebar.css"
        "/assets/Dashboard.js"
        "/assets/ManageClients.js"
        "/assets/ManageEmployees.js"
        "/assets/ManageServiceCalls.js"
        "/assets/OnboardingModal.js"
        "/assets/OnboardingModal.css"
        "/assets/Toast.js"
        "/assets/Toast.css"
        "/images/acdrainwiz_logo.png"
        "/images/technician-hero.png"
        "/images/Congrats_header_image.png"
        "/images/Rocket_lower_right_bg.png"
        "/images/rocket-full.svg"
        "/vite.svg"
        "/favicon.ico"
        "/robots.txt"
        "/sitemap.xml"
    )
    
    for file in "${static_files[@]}"; do
        download_files "$base_url$file" "$local_dir$file"
    done
    
    # Try to find and download all JS files
    echo "Searching for JavaScript files..."
    local js_files=$(curl -s "$base_url" | grep -o 'src="[^"]*\.js"' | sed 's/src="//g' | sed 's/"//g')
    for js_file in $js_files; do
        if [[ "$js_file" == /* ]]; then
            download_files "$base_url$js_file" "$local_dir$js_file"
        else
            download_files "$base_url/$js_file" "$local_dir/$js_file"
        fi
    done
    
    # Try to find and download all CSS files
    echo "Searching for CSS files..."
    local css_files=$(curl -s "$base_url" | grep -o 'href="[^"]*\.css"' | sed 's/href="//g' | sed 's/"//g')
    for css_file in $css_files; do
        if [[ "$css_file" == /* ]]; then
            download_files "$base_url$css_file" "$local_dir$css_file"
        else
            download_files "$base_url/$css_file" "$local_dir/$css_file"
        fi
    done
}

# Function to compare files
compare_files() {
    local netlify_file="$1"
    local local_file="$2"
    local description="$3"
    
    if [ -f "$netlify_file" ] && [ -f "$local_file" ]; then
        if diff -q "$netlify_file" "$local_file" >/dev/null; then
            echo -e "  ${GREEN}✓${NC} $description - Identical"
        else
            echo -e "  ${YELLOW}⚠${NC} $description - Different"
            echo "    Differences found. Run 'diff $netlify_file $local_file' for details."
        fi
    elif [ -f "$netlify_file" ]; then
        echo -e "  ${BLUE}+${NC} $description - Only in Netlify"
    elif [ -f "$local_file" ]; then
        echo -e "  ${RED}-${NC} $description - Only in Local"
    else
        echo -e "  ${RED}✗${NC} $description - Missing in both"
    fi
}

# Function to analyze differences
analyze_differences() {
    echo ""
    echo "=== Analyzing Differences ==="
    
    # Compare key files
    local key_files=(
        "index.html:index.html:Main HTML"
        "assets/index.js:dist/assets/index.js:Main JavaScript"
        "assets/index.css:dist/assets/index.css:Main CSS"
    )
    
    for file_pair in "${key_files[@]}"; do
        IFS=':' read -r netlify_file local_file description <<< "$file_pair"
        compare_files "$DOWNLOAD_DIR/$netlify_file" "$local_file" "$description"
    done
    
    # Check for missing assets
    echo ""
    echo "=== Missing Assets Check ==="
    local assets=(
        "images/acdrainwiz_logo.png"
        "images/technician-hero.png"
        "images/Congrats_header_image.png"
        "images/Rocket_lower_right_bg.png"
        "images/rocket-full.svg"
    )
    
    for asset in "${assets[@]}"; do
        if [ -f "$DOWNLOAD_DIR/$asset" ]; then
            echo -e "  ${GREEN}✓${NC} Found in Netlify: $asset"
            # Copy to local if missing
            if [ ! -f "$LOCAL_DIR/public/$asset" ]; then
                cp "$DOWNLOAD_DIR/$asset" "$LOCAL_DIR/public/$asset"
                echo -e "  ${BLUE}→${NC} Copied to local: $asset"
            fi
        else
            echo -e "  ${YELLOW}⚠${NC} Missing in Netlify: $asset"
        fi
    done
}

# Function to create comparison report
create_report() {
    echo ""
    echo "=== Comparison Report ==="
    echo "Netlify files downloaded to: $DOWNLOAD_DIR"
    echo "Local project directory: $LOCAL_DIR"
    echo ""
    
    # Count files
    local netlify_count=$(find "$DOWNLOAD_DIR" -type f 2>/dev/null | wc -l)
    local local_count=$(find "$LOCAL_DIR" -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.html" | wc -l)
    
    echo "File counts:"
    echo "  Netlify files: $netlify_count"
    echo "  Local source files: $local_count"
    echo ""
    
    # List downloaded files
    echo "Downloaded files:"
    find "$DOWNLOAD_DIR" -type f | head -20
    if [ $(find "$DOWNLOAD_DIR" -type f | wc -l) -gt 20 ]; then
        echo "... and more files"
    fi
}

# Main execution
main() {
    echo "Starting Netlify files download and comparison..."
    echo "Netlify URL: $NETLIFY_URL"
    echo "Download directory: $DOWNLOAD_DIR"
    echo ""
    
    # Create download directory
    mkdir -p "$DOWNLOAD_DIR"
    
    # Download files
    crawl_and_download "$NETLIFY_URL" "$DOWNLOAD_DIR"
    
    # Analyze differences
    analyze_differences
    
    # Create report
    create_report
    
    echo ""
    echo "=== Next Steps ==="
    echo "1. Review the downloaded files in: $DOWNLOAD_DIR"
    echo "2. Compare specific files manually if needed"
    echo "3. Update local files to match Netlify version"
    echo "4. Test the updated local version"
    echo ""
    echo "To manually compare files:"
    echo "  diff $DOWNLOAD_DIR/index.html $LOCAL_DIR/index.html"
    echo "  diff $DOWNLOAD_DIR/assets/index.js $LOCAL_DIR/dist/assets/index.js"
}

# Run main function
main 