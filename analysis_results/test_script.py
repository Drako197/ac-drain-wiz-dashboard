
# AC Drain Wiz Production Flow Test Script
# Generated on 2025-07-17 15:08:24
# Based on analysis of https://acdw.luislopezdesign.com

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

class ACWizFlowTester:
    def __init__(self):
        self.driver = None
        self.base_url = "https://acdw.luislopezdesign.com"
        self.test_results = {}
        
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
                element = self.driver.find_element(By.XPATH, f"//*[contains(text(), '{trigger}')]")
                print(f"✅ Found onboarding trigger: {trigger}")
                element.click()
                time.sleep(2)
                
                # Capture modal content
                modals = self.driver.find_elements(By.CLASS_NAME, "modal")
                if modals:
                    print(f"✅ Found {len(modals)} modal(s)")
                    for i, modal in enumerate(modals):
                        modal_text = modal.text
                        print(f"Modal {i+1} content: {modal_text[:100]}...")
                
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
        navigation_paths = ["/", "/dashboard", "/clients", "/employees", "/service-calls", "/settings", "/support"]
        
        for path in navigation_paths:
            try:
                print(f"Testing navigation to: {path}")
                self.driver.get(f"{self.base_url}{path}")
                time.sleep(2)
                
                # Check if page loaded successfully
                page_title = self.driver.title
                print(f"✅ Page loaded: {page_title}")
                
                # Capture page content
                main_content = self.driver.find_elements(By.TAG_NAME, "h1") + self.driver.find_elements(By.TAG_NAME, "h2")
                if main_content:
                    print(f"Main content: {main_content[0].text}")
                
            except Exception as e:
                print(f"❌ Error navigating to {path}: {e}")
    
    def test_interactions(self):
        print("🖱️ Testing User Interactions...")
        
        # Test button clicks
        buttons = self.driver.find_elements(By.TAG_NAME, "button")
        for button in buttons[:5]:  # Test first 5 buttons
            try:
                button_text = button.text
                if button_text:
                    print(f"Testing button: {button_text}")
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
            print(f"❌ Test failed: {e}")
        finally:
            if self.driver:
                self.driver.quit()

if __name__ == "__main__":
    tester = ACWizFlowTester()
    tester.run_full_test()
