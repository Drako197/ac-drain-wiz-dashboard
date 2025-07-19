#!/usr/bin/env python3
"""
AC Drain Wiz Production Flow Analyzer
This script scrapes the production site and captures user flows, onboarding behavior, and navigation patterns.
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from urllib.parse import urljoin, urlparse
import os
from datetime import datetime


class ProductionFlowAnalyzer:
    def __init__(self, base_url="https://acdw.luislopezdesign.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        )
        self.analysis_results = {
            "timestamp": datetime.now().isoformat(),
            "base_url": base_url,
            "pages_analyzed": [],
            "onboarding_flow": {},
            "navigation_structure": {},
            "assets_found": [],
            "interactions_detected": [],
            "css_classes": set(),
            "javascript_functions": set(),
            "forms_detected": [],
            "data_structures": {},
        }

    def scrape_page(self, url_path="/"):
        """Scrape a specific page and extract information"""
        full_url = urljoin(self.base_url, url_path)
        print(f"🔍 Scraping: {full_url}")

        try:
            response = self.session.get(full_url)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, "html.parser")

            page_data = {
                "url": full_url,
                "status_code": response.status_code,
                "title": soup.title.string if soup.title else None,
                "meta_description": (
                    soup.find("meta", {"name": "description"})["content"]
                    if soup.find("meta", {"name": "description"})
                    else None
                ),
                "headings": [
                    h.get_text().strip()
                    for h in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])
                ],
                "buttons": [],
                "forms": [],
                "navigation_links": [],
                "assets": [],
                "css_classes": set(),
                "javascript_code": [],
                "onboarding_elements": [],
            }

            # Extract buttons and their text
            for button in soup.find_all(["button", "a"]):
                if button.get_text().strip():
                    page_data["buttons"].append(
                        {
                            "text": button.get_text().strip(),
                            "tag": button.name,
                            "classes": button.get("class", []),
                            "href": button.get("href"),
                            "onclick": button.get("onclick"),
                        }
                    )

            # Extract forms
            for form in soup.find_all("form"):
                form_data = {
                    "action": form.get("action"),
                    "method": form.get("method", "GET"),
                    "inputs": [],
                }
                for input_elem in form.find_all(["input", "select", "textarea"]):
                    form_data["inputs"].append(
                        {
                            "type": input_elem.get("type", input_elem.name),
                            "name": input_elem.get("name"),
                            "placeholder": input_elem.get("placeholder"),
                            "required": input_elem.get("required") is not None,
                        }
                    )
                page_data["forms"].append(form_data)

            # Extract navigation links
            for link in soup.find_all("a", href=True):
                href = link.get("href")
                if (
                    href
                    and not href.startswith("#")
                    and not href.startswith("javascript:")
                ):
                    page_data["navigation_links"].append(
                        {
                            "text": link.get_text().strip(),
                            "href": href,
                            "classes": link.get("class", []),
                        }
                    )

            # Extract assets
            for asset in soup.find_all(["img", "link", "script"]):
                src = asset.get("src") or asset.get("href")
                if src:
                    page_data["assets"].append(
                        {
                            "type": asset.name,
                            "src": src,
                            "alt": asset.get("alt"),
                            "rel": asset.get("rel"),
                        }
                    )

            # Extract CSS classes
            for element in soup.find_all(True):
                if element.get("class"):
                    page_data["css_classes"].update(element.get("class"))

            # Extract JavaScript code
            for script in soup.find_all("script"):
                if script.string:
                    page_data["javascript_code"].append(script.string)

            # Look for onboarding elements
            onboarding_keywords = [
                "onboarding",
                "welcome",
                "tour",
                "modal",
                "popup",
                "tutorial",
            ]
            for element in soup.find_all(True):
                element_text = element.get_text().lower()
                element_classes = " ".join(element.get("class", [])).lower()
                if any(
                    keyword in element_text or keyword in element_classes
                    for keyword in onboarding_keywords
                ):
                    page_data["onboarding_elements"].append(
                        {
                            "tag": element.name,
                            "text": element.get_text().strip()[:100],
                            "classes": element.get("class", []),
                            "id": element.get("id"),
                        }
                    )

            return page_data

        except requests.RequestException as e:
            print(f"❌ Error scraping {full_url}: {e}")
            return None

    def analyze_onboarding_flow(self):
        """Analyze the onboarding flow specifically"""
        print("\n🎯 Analyzing Onboarding Flow...")

        # Scrape the main page first
        main_page = self.scrape_page("/")
        if main_page:
            self.analysis_results["pages_analyzed"].append(main_page)

            # Look for onboarding modal triggers
            onboarding_triggers = []
            for button in main_page["buttons"]:
                if any(
                    keyword in button["text"].lower()
                    for keyword in ["welcome", "tour", "onboarding", "help", "guide"]
                ):
                    onboarding_triggers.append(button)

            self.analysis_results["onboarding_flow"]["triggers"] = onboarding_triggers

            # Look for modal/dialog elements
            modal_elements = []
            for element in main_page["onboarding_elements"]:
                modal_elements.append(element)

            self.analysis_results["onboarding_flow"]["modal_elements"] = modal_elements

            # Check for localStorage/sessionStorage usage (common in onboarding)
            js_code = " ".join(main_page["javascript_code"])
            if "localStorage" in js_code or "sessionStorage" in js_code:
                self.analysis_results["onboarding_flow"]["storage_used"] = True
                self.analysis_results["onboarding_flow"]["storage_patterns"] = (
                    re.findall(
                        r"(localStorage|sessionStorage)\.(getItem|setItem|removeItem)\([^)]+\)",
                        js_code,
                    )
                )

    def analyze_navigation_structure(self):
        """Analyze the navigation structure"""
        print("\n🧭 Analyzing Navigation Structure...")

        # Common navigation paths to test
        navigation_paths = [
            "/",
            "/dashboard",
            "/clients",
            "/employees",
            "/service-calls",
            "/settings",
            "/support",
        ]

        for path in navigation_paths:
            page_data = self.scrape_page(path)
            if page_data:
                self.analysis_results["pages_analyzed"].append(page_data)

                # Extract navigation structure
                nav_structure = {
                    "path": path,
                    "title": page_data["title"],
                    "main_content": (
                        page_data["headings"][:5] if page_data["headings"] else []
                    ),
                    "actions_available": [
                        btn["text"] for btn in page_data["buttons"][:10]
                    ],
                    "forms_present": len(page_data["forms"]),
                    "assets_count": len(page_data["assets"]),
                }

                self.analysis_results["navigation_structure"][path] = nav_structure

    def analyze_data_structures(self):
        """Analyze data structures and patterns"""
        print("\n📊 Analyzing Data Structures...")

        for page in self.analysis_results["pages_analyzed"]:
            # Look for data patterns in JavaScript
            js_code = " ".join(page["javascript_code"])

            # Find object/array patterns
            data_patterns = re.findall(r"const\s+(\w+)\s*=\s*(\[|\{)", js_code)
            if data_patterns:
                self.analysis_results["data_structures"]["variables"] = data_patterns

            # Find API calls
            api_calls = re.findall(r'fetch\([\'"]([^\'"]+)[\'"]', js_code)
            if api_calls:
                self.analysis_results["data_structures"]["api_endpoints"] = api_calls

            # Find state management patterns
            state_patterns = re.findall(r"useState|useReducer|useContext", js_code)
            if state_patterns:
                self.analysis_results["data_structures"]["state_management"] = list(
                    set(state_patterns)
                )

    def generate_test_script(self):
        """Generate a test script based on the analysis"""
        print("\n🧪 Generating Test Script...")

        test_script = f"""
# AC Drain Wiz Production Flow Test Script
# Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
# Based on analysis of {self.base_url}

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

class ACWizFlowTester:
    def __init__(self):
        self.driver = None
        self.base_url = "{self.base_url}"
        self.test_results = {{}}
        
    def setup_driver(self):
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        # chrome_options.add_argument("--headless")  # Uncomment for headless testing
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.implicitly_wait(10)
        
    def test_onboarding_flow(self):
        print("🎯 Testing Onboarding Flow...")
        
        # Navigate to main page
        self.driver.get(self.base_url)
        time.sleep(2)
        
        # Look for onboarding triggers
        onboarding_triggers = [
            "Welcome",
            "Tour", 
            "Onboarding",
            "Help",
            "Guide",
            "Get Started"
        ]
        
        for trigger in onboarding_triggers:
            try:
                element = self.driver.find_element(By.XPATH, f"//*[contains(text(), '{{trigger}}')]")
                print(f"✅ Found onboarding trigger: {{trigger}}")
                element.click()
                time.sleep(2)
                
                # Capture modal content
                modals = self.driver.find_elements(By.CLASS_NAME, "modal")
                if modals:
                    print(f"✅ Found {{len(modals)}} modal(s)")
                    for i, modal in enumerate(modals):
                        modal_text = modal.text
                        print(f"Modal {{i+1}} content: {{modal_text[:100]}}...")
                
                break
            except:
                continue
        
        # Test onboarding completion
        try:
            close_buttons = self.driver.find_elements(By.XPATH, "//button[contains(text(), 'Close') or contains(text(), 'Skip') or contains(text(), 'Got it')]")
            if close_buttons:
                close_buttons[0].click()
                print("✅ Closed onboarding modal")
                time.sleep(1)
        except:
            print("⚠️ No close button found for onboarding")
    
    def test_navigation(self):
        print("🧭 Testing Navigation...")
        
        # Test each navigation path
        navigation_paths = {json.dumps(list(self.analysis_results['navigation_structure'].keys()))}
        
        for path in navigation_paths:
            try:
                print(f"Testing navigation to: {{path}}")
                self.driver.get(f"{{self.base_url}}{{path}}")
                time.sleep(2)
                
                # Check if page loaded successfully
                page_title = self.driver.title
                print(f"✅ Page loaded: {{page_title}}")
                
                # Capture page content
                main_content = self.driver.find_elements(By.TAG_NAME, "h1") + self.driver.find_elements(By.TAG_NAME, "h2")
                if main_content:
                    print(f"Main content: {{main_content[0].text}}")
                
            except Exception as e:
                print(f"❌ Error navigating to {{path}}: {{e}}")
    
    def test_interactions(self):
        print("🖱️ Testing User Interactions...")
        
        # Test button clicks
        buttons = self.driver.find_elements(By.TAG_NAME, "button")
        for button in buttons[:5]:  # Test first 5 buttons
            try:
                button_text = button.text
                if button_text:
                    print(f"Testing button: {{button_text}}")
                    button.click()
                    time.sleep(1)
            except:
                continue
        
        # Test form interactions
        forms = self.driver.find_elements(By.TAG_NAME, "form")
        for form in forms:
            try:
                inputs = form.find_elements(By.TAG_NAME, "input")
                for input_elem in inputs[:3]:  # Test first 3 inputs
                    input_type = input_elem.get_attribute("type")
                    if input_type in ["text", "email"]:
                        input_elem.send_keys("test")
                        time.sleep(0.5)
            except:
                continue
    
    def run_full_test(self):
        print("🚀 Starting AC Drain Wiz Production Flow Test")
        
        try:
            self.setup_driver()
            
            # Run all tests
            self.test_onboarding_flow()
            self.test_navigation()
            self.test_interactions()
            
            print("✅ All tests completed successfully!")
            
        except Exception as e:
            print(f"❌ Test failed: {{e}}")
        finally:
            if self.driver:
                self.driver.quit()

if __name__ == "__main__":
    tester = ACWizFlowTester()
    tester.run_full_test()
"""

        return test_script

    def generate_flow_documentation(self):
        """Generate documentation of the user flow"""
        print("\n📝 Generating Flow Documentation...")

        documentation = f"""
# AC Drain Wiz Production Flow Documentation
Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Base URL: {self.base_url}

## 🎯 Onboarding Flow Analysis

### Onboarding Triggers Found:
"""

        if (
            "onboarding_flow" in self.analysis_results
            and "triggers" in self.analysis_results["onboarding_flow"]
        ):
            for trigger in self.analysis_results["onboarding_flow"]["triggers"]:
                documentation += f"- **{trigger['text']}** (Class: {', '.join(trigger['classes'])})\n"
        else:
            documentation += "- No explicit onboarding triggers found\n"

        documentation += f"""
### Modal Elements Detected:
"""

        if (
            "onboarding_flow" in self.analysis_results
            and "modal_elements" in self.analysis_results["onboarding_flow"]
        ):
            for element in self.analysis_results["onboarding_flow"]["modal_elements"]:
                documentation += (
                    f"- **{element['tag']}** with text: \"{element['text']}\"\n"
                )
        else:
            documentation += "- No modal elements detected\n"

        documentation += f"""
## 🧭 Navigation Structure

### Pages Analyzed:
"""

        for path, structure in self.analysis_results["navigation_structure"].items():
            documentation += f"""
### {path}
- **Title**: {structure['title']}
- **Main Content**: {', '.join(structure['main_content'])}
- **Available Actions**: {', '.join(structure['actions_available'][:5])}
- **Forms Present**: {structure['forms_present']}
- **Assets Count**: {structure['assets_count']}
"""

        documentation += f"""
## 📊 Data Structures

### State Management Patterns:
"""

        if (
            "data_structures" in self.analysis_results
            and "state_management" in self.analysis_results["data_structures"]
        ):
            for pattern in self.analysis_results["data_structures"]["state_management"]:
                documentation += f"- {pattern}\n"
        else:
            documentation += "- No state management patterns detected\n"

        documentation += f"""
## 🎨 CSS Classes Found:
"""

        all_classes = set()
        for page in self.analysis_results["pages_analyzed"]:
            all_classes.update(page["css_classes"])

        for css_class in sorted(list(all_classes))[:20]:  # Show first 20 classes
            documentation += f"- {css_class}\n"

        return documentation

    def save_results(self):
        """Save all analysis results to files"""
        print("\n💾 Saving Analysis Results...")

        # Create results directory
        os.makedirs("analysis_results", exist_ok=True)

        # Save JSON results
        with open("analysis_results/production_analysis.json", "w") as f:
            json.dump(self.analysis_results, f, indent=2, default=str)

        # Save test script
        test_script = self.generate_test_script()
        with open("analysis_results/test_script.py", "w") as f:
            f.write(test_script)

        # Save documentation
        documentation = self.generate_flow_documentation()
        with open("analysis_results/flow_documentation.md", "w") as f:
            f.write(documentation)

        print("✅ Results saved to analysis_results/ directory")

    def run_full_analysis(self):
        """Run the complete analysis"""
        print("🚀 Starting AC Drain Wiz Production Flow Analysis")
        print(f"Target URL: {self.base_url}")
        print("=" * 60)

        # Run all analysis steps
        self.analyze_onboarding_flow()
        self.analyze_navigation_structure()
        self.analyze_data_structures()

        # Save results
        self.save_results()

        print("\n🎉 Analysis Complete!")
        print("📁 Results saved to: analysis_results/")
        print("📄 Files generated:")
        print("  - production_analysis.json")
        print("  - test_script.py")
        print("  - flow_documentation.md")


if __name__ == "__main__":
    analyzer = ProductionFlowAnalyzer()
    analyzer.run_full_analysis()
