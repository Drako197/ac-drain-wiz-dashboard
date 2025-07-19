#!/usr/bin/env python3
"""
Enhanced AC Drain Wiz Production Flow Tester
This script captures screenshots, detailed behavior, and comprehensive user flow analysis.
"""

import time
import os
import json
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class EnhancedACWizTester:
    def __init__(self):
        self.driver = None
        self.base_url = "https://acdw.luislopezdesign.com"
        self.results_dir = "test_results"
        self.screenshots_dir = f"{self.results_dir}/screenshots"
        self.test_results = {
            'timestamp': datetime.now().isoformat(),
            'base_url': self.base_url,
            'pages_tested': [],
            'onboarding_flow': {},
            'navigation_flow': {},
            'interactions': [],
            'errors': [],
            'screenshots_taken': []
        }
        
        # Create results directories
        os.makedirs(self.results_dir, exist_ok=True)
        os.makedirs(self.screenshots_dir, exist_ok=True)
        
    def setup_driver(self):
        """Setup Chrome driver with enhanced options"""
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.add_argument("--window-size=1920,1080")
        
        # Uncomment for headless testing
        # chrome_options.add_argument("--headless")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        self.driver.implicitly_wait(10)
        
    def take_screenshot(self, name):
        """Take a screenshot and save it"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{name}_{timestamp}.png"
        filepath = os.path.join(self.screenshots_dir, filename)
        self.driver.save_screenshot(filepath)
        self.test_results['screenshots_taken'].append({
            'name': name,
            'filename': filename,
            'timestamp': timestamp
        })
        print(f"📸 Screenshot saved: {filename}")
        return filepath
        
    def wait_for_page_load(self, timeout=10):
        """Wait for page to fully load"""
        try:
            WebDriverWait(self.driver, timeout).until(
                lambda driver: driver.execute_script("return document.readyState") == "complete"
            )
            time.sleep(2)  # Additional wait for dynamic content
        except TimeoutException:
            print("⚠️ Page load timeout")
            
    def capture_page_info(self, page_name):
        """Capture detailed information about the current page"""
        page_info = {
            'name': page_name,
            'url': self.driver.current_url,
            'title': self.driver.title,
            'timestamp': datetime.now().isoformat()
        }
        
        # Capture all text content
        try:
            body_text = self.driver.find_element(By.TAG_NAME, "body").text
            page_info['body_text'] = body_text[:500] + "..." if len(body_text) > 500 else body_text
        except:
            page_info['body_text'] = ""
            
        # Capture all buttons and their text
        buttons = []
        try:
            for button in self.driver.find_elements(By.TAG_NAME, "button"):
                buttons.append({
                    'text': button.text.strip(),
                    'classes': button.get_attribute('class'),
                    'id': button.get_attribute('id')
                })
        except:
            pass
        page_info['buttons'] = buttons
        
        # Capture all links
        links = []
        try:
            for link in self.driver.find_elements(By.TAG_NAME, "a"):
                if link.text.strip():
                    links.append({
                        'text': link.text.strip(),
                        'href': link.get_attribute('href'),
                        'classes': link.get_attribute('class')
                    })
        except:
            pass
        page_info['links'] = links
        
        # Capture forms
        forms = []
        try:
            for form in self.driver.find_elements(By.TAG_NAME, "form"):
                form_info = {
                    'action': form.get_attribute('action'),
                    'method': form.get_attribute('method'),
                    'inputs': []
                }
                for input_elem in form.find_elements(By.TAG_NAME, "input"):
                    form_info['inputs'].append({
                        'type': input_elem.get_attribute('type'),
                        'name': input_elem.get_attribute('name'),
                        'placeholder': input_elem.get_attribute('placeholder')
                    })
                forms.append(form_info)
        except:
            pass
        page_info['forms'] = forms
        
        # Capture CSS classes for styling analysis
        css_classes = set()
        try:
            for element in self.driver.find_elements(By.XPATH, "//*[@class]"):
                classes = element.get_attribute('class').split()
                css_classes.update(classes)
        except:
            pass
        page_info['css_classes'] = list(css_classes)
        
        return page_info
        
    def test_onboarding_flow(self):
        """Test the onboarding flow with detailed capture"""
        print("\n🎯 Testing Onboarding Flow...")
        
        # Navigate to main page
        self.driver.get(self.base_url)
        self.wait_for_page_load()
        
        # Take initial screenshot
        self.take_screenshot("01_initial_page")
        
        # Capture initial page info
        initial_info = self.capture_page_info("Initial Page")
        self.test_results['pages_tested'].append(initial_info)
        
        # Look for onboarding triggers
        onboarding_triggers = [
            "Welcome", "Tour", "Onboarding", "Help", "Guide", 
            "Get Started", "Tutorial", "First Time", "New User"
        ]
        
        onboarding_found = False
        for trigger in onboarding_triggers:
            try:
                # Look for elements containing the trigger text
                elements = self.driver.find_elements(By.XPATH, f"//*[contains(text(), '{trigger}')]")
                if elements:
                    print(f"✅ Found onboarding trigger: {trigger}")
                    onboarding_found = True
                    
                    # Click the first matching element
                    elements[0].click()
                    time.sleep(3)
                    
                    # Take screenshot after trigger
                    self.take_screenshot(f"02_onboarding_trigger_{trigger}")
                    
                    # Look for modal/dialog
                    modals = self.driver.find_elements(By.CLASS_NAME, "modal")
                    if not modals:
                        modals = self.driver.find_elements(By.CLASS_NAME, "dialog")
                    if not modals:
                        modals = self.driver.find_elements(By.CLASS_NAME, "popup")
                    
                    if modals:
                        print(f"✅ Found {len(modals)} modal(s)")
                        for i, modal in enumerate(modals):
                            modal_text = modal.text
                            print(f"Modal {i+1} content: {modal_text[:100]}...")
                            
                            # Take screenshot of modal
                            self.take_screenshot(f"03_modal_{i+1}")
                            
                            # Capture modal info
                            modal_info = self.capture_page_info(f"Modal {i+1}")
                            self.test_results['onboarding_flow'][f'modal_{i+1}'] = modal_info
                    
                    break
            except Exception as e:
                print(f"❌ Error with trigger '{trigger}': {e}")
                continue
        
        if not onboarding_found:
            print("⚠️ No onboarding triggers found")
            
        # Test onboarding completion
        try:
            close_buttons = self.driver.find_elements(By.XPATH, 
                "//button[contains(text(), 'Close') or contains(text(), 'Skip') or contains(text(), 'Got it') or contains(text(), 'Next')]")
            if close_buttons:
                close_buttons[0].click()
                print("✅ Closed onboarding modal")
                time.sleep(2)
                self.take_screenshot("04_after_onboarding_close")
            else:
                print("⚠️ No close button found for onboarding")
        except Exception as e:
            print(f"❌ Error closing onboarding: {e}")
            
    def test_navigation(self):
        """Test navigation through all pages"""
        print("\n🧭 Testing Navigation...")
        
        # Navigation paths to test
        navigation_paths = [
            ("/", "Home"),
            ("/dashboard", "Dashboard"),
            ("/clients", "Clients"),
            ("/employees", "Employees"),
            ("/service-calls", "Service Calls"),
            ("/settings", "Settings"),
            ("/support", "Support")
        ]
        
        for path, page_name in navigation_paths:
            try:
                print(f"Testing navigation to: {page_name}")
                self.driver.get(f"{self.base_url}{path}")
                self.wait_for_page_load()
                
                # Take screenshot
                self.take_screenshot(f"05_{page_name.lower().replace(' ', '_')}")
                
                # Capture page info
                page_info = self.capture_page_info(page_name)
                self.test_results['navigation_flow'][page_name] = page_info
                
                # Check for dynamic content loading
                time.sleep(3)  # Wait for any dynamic content
                
                # Take another screenshot after dynamic content loads
                self.take_screenshot(f"06_{page_name.lower().replace(' ', '_')}_after_load")
                
                print(f"✅ Page loaded: {self.driver.title}")
                
            except Exception as e:
                print(f"❌ Error navigating to {page_name}: {e}")
                self.test_results['errors'].append({
                    'page': page_name,
                    'error': str(e),
                    'timestamp': datetime.now().isoformat()
                })
                
    def test_interactions(self):
        """Test user interactions on each page"""
        print("\n🖱️ Testing User Interactions...")
        
        # Test button clicks
        buttons = self.driver.find_elements(By.TAG_NAME, "button")
        print(f"Found {len(buttons)} buttons to test")
        
        for i, button in enumerate(buttons[:10]):  # Test first 10 buttons
            try:
                button_text = button.text.strip()
                if button_text:
                    print(f"Testing button {i+1}: {button_text}")
                    
                    # Take screenshot before click
                    self.take_screenshot(f"07_before_button_{i+1}")
                    
                    # Click button
                    button.click()
                    time.sleep(2)
                    
                    # Take screenshot after click
                    self.take_screenshot(f"08_after_button_{i+1}")
                    
                    # Record interaction
                    self.test_results['interactions'].append({
                        'type': 'button_click',
                        'text': button_text,
                        'button_index': i+1,
                        'timestamp': datetime.now().isoformat()
                    })
                    
            except Exception as e:
                print(f"❌ Error clicking button {i+1}: {e}")
                
        # Test form interactions
        forms = self.driver.find_elements(By.TAG_NAME, "form")
        print(f"Found {len(forms)} forms to test")
        
        for i, form in enumerate(forms):
            try:
                inputs = form.find_elements(By.TAG_NAME, "input")
                for j, input_elem in enumerate(inputs[:3]):  # Test first 3 inputs per form
                    input_type = input_elem.get_attribute("type")
                    if input_type in ["text", "email"]:
                        print(f"Testing input {j+1} in form {i+1}: {input_type}")
                        
                        # Take screenshot before input
                        self.take_screenshot(f"09_before_input_{i+1}_{j+1}")
                        
                        # Enter test data
                        input_elem.send_keys("test")
                        time.sleep(1)
                        
                        # Take screenshot after input
                        self.take_screenshot(f"10_after_input_{i+1}_{j+1}")
                        
                        # Record interaction
                        self.test_results['interactions'].append({
                            'type': 'form_input',
                            'input_type': input_type,
                            'form_index': i+1,
                            'input_index': j+1,
                            'timestamp': datetime.now().isoformat()
                        })
                        
            except Exception as e:
                print(f"❌ Error testing form {i+1}: {e}")
                
    def test_sidebar_navigation(self):
        """Test sidebar navigation specifically"""
        print("\n📱 Testing Sidebar Navigation...")
        
        # Look for sidebar elements
        sidebar_selectors = [
            "nav", "aside", ".sidebar", ".navigation", ".menu",
            "[role='navigation']", ".nav", ".nav-menu"
        ]
        
        sidebar_found = False
        for selector in sidebar_selectors:
            try:
                sidebar = self.driver.find_element(By.CSS_SELECTOR, selector)
                if sidebar:
                    print(f"✅ Found sidebar with selector: {selector}")
                    sidebar_found = True
                    
                    # Take screenshot of sidebar
                    self.take_screenshot("11_sidebar_found")
                    
                    # Find all navigation links in sidebar
                    nav_links = sidebar.find_elements(By.TAG_NAME, "a")
                    print(f"Found {len(nav_links)} navigation links")
                    
                    for i, link in enumerate(nav_links):
                        try:
                            link_text = link.text.strip()
                            if link_text:
                                print(f"Testing sidebar link {i+1}: {link_text}")
                                
                                # Take screenshot before clicking
                                self.take_screenshot(f"12_before_sidebar_link_{i+1}")
                                
                                # Click the link
                                link.click()
                                time.sleep(3)
                                
                                # Take screenshot after clicking
                                self.take_screenshot(f"13_after_sidebar_link_{i+1}")
                                
                                # Record navigation
                                self.test_results['interactions'].append({
                                    'type': 'sidebar_navigation',
                                    'link_text': link_text,
                                    'link_index': i+1,
                                    'timestamp': datetime.now().isoformat()
                                })
                                
                        except Exception as e:
                            print(f"❌ Error clicking sidebar link {i+1}: {e}")
                    
                    break
                    
            except NoSuchElementException:
                continue
                
        if not sidebar_found:
            print("⚠️ No sidebar found")
            
    def save_results(self):
        """Save all test results"""
        print("\n💾 Saving Test Results...")
        
        # Save JSON results
        results_file = os.path.join(self.results_dir, "enhanced_test_results.json")
        with open(results_file, 'w') as f:
            json.dump(self.test_results, f, indent=2, default=str)
            
        # Create summary report
        summary_file = os.path.join(self.results_dir, "test_summary.md")
        with open(summary_file, 'w') as f:
            f.write(f"""# Enhanced AC Drain Wiz Test Summary
Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## Test Results
- **Pages Tested**: {len(self.test_results['pages_tested'])}
- **Screenshots Taken**: {len(self.test_results['screenshots_taken'])}
- **Interactions Recorded**: {len(self.test_results['interactions'])}
- **Errors Encountered**: {len(self.test_results['errors'])}

## Screenshots
""")
            for screenshot in self.test_results['screenshots_taken']:
                f.write(f"- {screenshot['filename']} ({screenshot['name']})\n")
                
            f.write(f"""
## Errors
""")
            for error in self.test_results['errors']:
                f.write(f"- {error['page']}: {error['error']}\n")
                
        print(f"✅ Results saved to: {self.results_dir}/")
        print(f"📄 Files generated:")
        print(f"  - enhanced_test_results.json")
        print(f"  - test_summary.md")
        print(f"  - screenshots/ (directory)")
        
    def run_full_test(self):
        """Run the complete enhanced test"""
        print("🚀 Starting Enhanced AC Drain Wiz Production Flow Test")
        print(f"Target URL: {self.base_url}")
        print("=" * 60)
        
        try:
            self.setup_driver()
            
            # Run all tests
            self.test_onboarding_flow()
            self.test_navigation()
            self.test_interactions()
            self.test_sidebar_navigation()
            
            print("\n✅ All tests completed successfully!")
            
        except Exception as e:
            print(f"❌ Test failed: {e}")
            self.test_results['errors'].append({
                'type': 'test_failure',
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            })
        finally:
            if self.driver:
                self.driver.quit()
                
        # Save results
        self.save_results()
        
        print("\n🎉 Enhanced Test Complete!")
        print(f"📁 Results saved to: {self.results_dir}/")
        print("📸 Check the screenshots folder for visual captures")

if __name__ == "__main__":
    tester = EnhancedACWizTester()
    tester.run_full_test() 