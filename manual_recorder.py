#!/usr/bin/env python3
"""
Manual AC Drain Wiz Recorder
This script opens your production site and records your manual actions with screenshots.
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
from selenium.webdriver.common.action_chains import ActionChains
import threading
import queue

class ManualRecorder:
    def __init__(self):
        self.driver = None
        self.base_url = "https://acdw.luislopezdesign.com"
        self.recordings_dir = "manual_recordings"
        self.screenshots_dir = f"{self.recordings_dir}/screenshots"
        self.actions_log = []
        self.recording = True
        
        # Create directories
        os.makedirs(self.recordings_dir, exist_ok=True)
        os.makedirs(self.screenshots_dir, exist_ok=True)
        
        # Action queue for recording
        self.action_queue = queue.Queue()
        
    def setup_driver(self):
        """Setup Chrome driver with recording capabilities"""
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        self.driver.implicitly_wait(5)
        
    def take_screenshot(self, action_name):
        """Take a screenshot with timestamp"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{action_name}_{timestamp}.png"
        filepath = os.path.join(self.screenshots_dir, filename)
        self.driver.save_screenshot(filepath)
        return filename
        
    def log_action(self, action_type, details):
        """Log an action with timestamp and details"""
        action = {
            'timestamp': datetime.now().isoformat(),
            'type': action_type,
            'details': details,
            'url': self.driver.current_url,
            'title': self.driver.title
        }
        self.actions_log.append(action)
        print(f"📝 {action_type}: {details}")
        
    def start_recording(self):
        """Start the manual recording session"""
        print("🎬 Starting Manual Recording Session")
        print("=" * 60)
        print(f"🌐 Opening: {self.base_url}")
        print("📸 Screenshots will be saved automatically")
        print("📝 Actions will be logged in real-time")
        print("⏹️  Press Ctrl+C to stop recording")
        print("=" * 60)
        
        # Navigate to the site
        self.driver.get(self.base_url)
        time.sleep(3)
        
        # Take initial screenshot
        initial_screenshot = self.take_screenshot("01_initial_page")
        self.log_action("page_load", f"Initial page loaded - {initial_screenshot}")
        
        # Start action monitoring thread
        monitor_thread = threading.Thread(target=self.monitor_actions)
        monitor_thread.daemon = True
        monitor_thread.start()
        
        try:
            # Keep the browser open for manual interaction
            while self.recording:
                time.sleep(1)
                
        except KeyboardInterrupt:
            print("\n⏹️  Recording stopped by user")
            self.stop_recording()
            
    def monitor_actions(self):
        """Monitor for page changes and log them"""
        last_url = self.driver.current_url
        last_title = self.driver.title
        
        while self.recording:
            try:
                current_url = self.driver.current_url
                current_title = self.driver.title
                
                # Detect URL changes
                if current_url != last_url:
                    screenshot = self.take_screenshot("navigation")
                    self.log_action("navigation", f"URL changed to {current_url} - {screenshot}")
                    last_url = current_url
                    
                # Detect title changes
                if current_title != last_title:
                    self.log_action("title_change", f"Title changed to: {current_title}")
                    last_title = current_title
                    
                time.sleep(0.5)
                
            except Exception as e:
                print(f"⚠️ Monitoring error: {e}")
                time.sleep(1)
                
    def stop_recording(self):
        """Stop recording and save results"""
        self.recording = False
        
        # Take final screenshot
        final_screenshot = self.take_screenshot("99_final_page")
        self.log_action("recording_end", f"Recording ended - {final_screenshot}")
        
        # Save recording results
        self.save_recording_results()
        
        if self.driver:
            self.driver.quit()
            
    def save_recording_results(self):
        """Save all recording results"""
        print("\n💾 Saving Recording Results...")
        
        # Save actions log
        actions_file = os.path.join(self.recordings_dir, "manual_actions.json")
        with open(actions_file, 'w') as f:
            json.dump(self.actions_log, f, indent=2, default=str)
            
        # Create summary report
        summary_file = os.path.join(self.recordings_dir, "recording_summary.md")
        with open(summary_file, 'w') as f:
            f.write(f"""# Manual Recording Summary
Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## Recording Results
- **Actions Recorded**: {len(self.actions_log)}
- **Screenshots Taken**: {len([f for f in os.listdir(self.screenshots_dir) if f.endswith('.png')])}
- **Duration**: {self.calculate_duration()}

## Action Timeline
""")
            
            for i, action in enumerate(self.actions_log, 1):
                f.write(f"{i}. **{action['type']}** - {action['details']}\n")
                f.write(f"   - Time: {action['timestamp']}\n")
                f.write(f"   - URL: {action['url']}\n")
                f.write(f"   - Title: {action['title']}\n\n")
                
        print(f"✅ Results saved to: {self.recordings_dir}/")
        print(f"📄 Files generated:")
        print(f"  - manual_actions.json")
        print(f"  - recording_summary.md")
        print(f"  - screenshots/ (directory)")
        
    def calculate_duration(self):
        """Calculate recording duration"""
        if len(self.actions_log) < 2:
            return "Unknown"
            
        start_time = datetime.fromisoformat(self.actions_log[0]['timestamp'])
        end_time = datetime.fromisoformat(self.actions_log[-1]['timestamp'])
        duration = end_time - start_time
        return str(duration)
        
    def run_recording(self):
        """Run the manual recording session"""
        try:
            self.setup_driver()
            self.start_recording()
        except Exception as e:
            print(f"❌ Recording failed: {e}")
        finally:
            if self.driver:
                self.driver.quit()

class InteractiveRecorder(ManualRecorder):
    """Enhanced recorder with interactive prompts"""
    
    def __init__(self):
        super().__init__()
        self.recording_session = {
            'session_id': datetime.now().strftime("%Y%m%d_%H%M%S"),
            'notes': [],
            'focus_areas': []
        }
        
    def prompt_user(self):
        """Prompt user for recording focus areas"""
        print("\n🎯 Manual Recording Setup")
        print("What would you like to focus on during this recording?")
        print("1. Onboarding flow")
        print("2. Navigation through all pages")
        print("3. Specific user interactions")
        print("4. Complete user journey")
        print("5. Custom focus")
        
        choice = input("\nEnter your choice (1-5): ").strip()
        
        focus_areas = {
            "1": "Onboarding flow - Welcome modal, tour, first-time user experience",
            "2": "Navigation - Sidebar navigation, page transitions, breadcrumbs",
            "3": "User interactions - Button clicks, form inputs, modal interactions",
            "4": "Complete user journey - End-to-end workflow from start to finish",
            "5": "Custom focus - You'll specify during recording"
        }
        
        if choice in focus_areas:
            self.recording_session['focus_areas'].append(focus_areas[choice])
            print(f"✅ Focus area set: {focus_areas[choice]}")
        else:
            print("⚠️ Invalid choice, proceeding with general recording")
            
        # Get user notes
        notes = input("\nAny specific notes or instructions for this recording? (optional): ").strip()
        if notes:
            self.recording_session['notes'].append(notes)
            
    def enhanced_logging(self):
        """Enhanced logging with user prompts"""
        print("\n📝 Enhanced Logging Active")
        print("During recording, you can:")
        print("- Press 'Enter' to log a manual note")
        print("- Type 'screenshot' to force a screenshot")
        print("- Type 'pause' to pause recording")
        print("- Type 'resume' to resume recording")
        print("- Type 'stop' to end recording")
        
        def input_monitor():
            while self.recording:
                try:
                    user_input = input()
                    if user_input.lower() == 'screenshot':
                        screenshot = self.take_screenshot("manual_screenshot")
                        self.log_action("manual_screenshot", f"User requested screenshot - {screenshot}")
                    elif user_input.lower() == 'pause':
                        self.log_action("recording_pause", "User paused recording")
                        print("⏸️ Recording paused. Type 'resume' to continue.")
                    elif user_input.lower() == 'resume':
                        self.log_action("recording_resume", "User resumed recording")
                        print("▶️ Recording resumed.")
                    elif user_input.lower() == 'stop':
                        self.recording = False
                        print("⏹️ Recording stopped by user.")
                    else:
                        self.log_action("user_note", f"User note: {user_input}")
                except:
                    break
                    
        # Start input monitoring in separate thread
        input_thread = threading.Thread(target=input_monitor)
        input_thread.daemon = True
        input_thread.start()
        
    def run_interactive_recording(self):
        """Run interactive recording session"""
        try:
            self.prompt_user()
            self.setup_driver()
            self.enhanced_logging()
            self.start_recording()
        except Exception as e:
            print(f"❌ Interactive recording failed: {e}")
        finally:
            if self.driver:
                self.driver.quit()

if __name__ == "__main__":
    print("🎬 AC Drain Wiz Manual Recorder")
    print("=" * 40)
    print("Choose recording mode:")
    print("1. Simple recording (automatic screenshots)")
    print("2. Interactive recording (with prompts and notes)")
    
    choice = input("\nEnter your choice (1-2): ").strip()
    
    if choice == "2":
        recorder = InteractiveRecorder()
        recorder.run_interactive_recording()
    else:
        recorder = ManualRecorder()
        recorder.run_recording() 