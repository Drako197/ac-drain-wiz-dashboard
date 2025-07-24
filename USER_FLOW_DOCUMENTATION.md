# AC Drain Wiz - User Flow Documentation

## 📋 **Table of Contents**
1. [Current Application Flow](#current-application-flow)
2. [Proposed Pre-Login Features](#proposed-pre-login-features)
3. [Post-Login User Interactions](#post-login-user-interactions)
4. [Mobile vs Desktop Variations](#mobile-vs-desktop-variations)
5. [Error Handling & Edge Cases](#error-handling--edge-cases)
6. [Data Flow & State Management](#data-flow--state-management)

---

## 🚀 **Current Application Flow**

### **Entry Point & Onboarding**
```
┌─────────────────┐
│   User Lands    │
│   on App        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Check Local     │
│ Storage for     │
│ Onboarding      │
│ Completion      │
└─────────┬───────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌─────────┐ ┌─────────┐
│ Not     │ │ Already │
│ Complete│ │ Complete│
└────┬────┘ └────┬────┘
     │           │
     ▼           ▼
┌─────────┐ ┌─────────┐
│ Show    │ │ Show    │
│ Onboard │ │ Dashboard│
│ Modal   │ │         │
└────┬────┘ └────┬────┘
     │           │
     ▼           ▼
┌─────────┐ ┌─────────┐
│ Step 1: │ │ Main    │
│ Welcome │ │ App     │
│ Screen  │ │ Flow    │
└────┬────┘ └─────────┘
     │
     ▼
┌─────────┐
│ Step 2: │
│ Company │
│ Details │
└────┬────┘
     │
     ▼
┌─────────┐
│ Step 3: │
│ Contact │
│ Info    │
└────┬────┘
     │
     ▼
┌─────────┐
│ Step 4: │
│ Services│
│ Offered │
└────┬────┘
     │
     ▼
┌─────────┐
│ Step 5: │
│ Complete│
│ Setup   │
└────┬────┘
     │
     ▼
┌─────────┐
│ Save to │
│ Local   │
│ Storage │
└────┬────┘
     │
     ▼
┌─────────┐
│ Show    │
│ Success │
│ Toast   │
└────┬────┘
     │
     ▼
┌─────────┐
│ Navigate│
│ to      │
│ Dashboard│
└─────────┘
```

### **Dashboard Navigation Flow**
```
┌─────────────┐
│   Dashboard  │
│   (Main)     │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Navigation   │
│ Options      │
└─────┬───────┘
      │
  ┌───┴───┐
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Logo │ │Menu │
│Click│ │Click│
└─┬───┘ └─┬───┘
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Back │ │Open │
│to   │ │Nav  │
│Dash │ │Menu │
└─────┘ └─┬───┘
          │
          ▼
┌─────────────┐
│ Mobile Nav  │
│ Menu Items  │
└─────┬───────┘
      │
  ┌───┴───┐
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Dash │ │Clients│
└─────┘ └─┬───┘
          │
          ▼
┌─────────────┐
│ Manage      │
│ Clients     │
│ Page        │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Client      │
│ Actions     │
└─────┬───────┘
      │
  ┌───┴───┐
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Add  │ │Edit │
│Client│ │Client│
└─────┘ └─────┘
```

---

## 🔐 **Proposed Pre-Login Features**

### **Authentication Flow**
```
┌─────────────────┐
│   Landing Page  │
│   (Pre-Login)   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Login Form    │
│   - Email       │
│   - Password    │
└─────────┬───────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌─────────┐ ┌─────────┐
│ Valid   │ │ Invalid │
│ Creds   │ │ Creds   │
└────┬────┘ └────┬────┘
     │           │
     ▼           ▼
┌─────────┐ ┌─────────┐
│ Auth    │ │ Show    │
│ Success │ │ Error   │
└────┬────┘ └────┬────┘
     │           │
     ▼           ▼
┌─────────┐ ┌─────────┐
│ Navigate│ │ Return  │
│ to App  │ │ to Form │
└─────────┘ └─────────┘
```

### **Registration Flow**
```
┌─────────────────┐
│   Landing Page  │
│   (Pre-Login)   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ "Create Account"│
│ Button          │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Registration    │
│ Form            │
│ - Company Name  │
│ - Email         │
│ - Password      │
│ - Confirm Pass  │
└─────────┬───────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌─────────┐ ┌─────────┐
│ Valid   │ │ Invalid │
│ Data    │ │ Data    │
└────┬────┘ └────┬────┘
     │           │
     ▼           ▼
┌─────────┐ ┌─────────┐
│ Send    │ │ Show    │
│ Email   │ │ Error   │
│ Verify  │ │ Message │
└────┬────┘ └────┬────┘
     │           │
     ▼           ▼
┌─────────┐ ┌─────────┐
│ Email   │ │ Return  │
│ Sent    │ │ to Form │
│ Success │ │         │
└────┬────┘ └─────────┘
     │
     ▼
┌─────────┐
│ Check   │
│ Email   │
│ Inbox   │
└────┬────┘
     │
     ▼
┌─────────┐
│ Click   │
│ Verify  │
│ Link    │
└────┬────┘
     │
     ▼
┌─────────┐
│ Account │
│ Active  │
└────┬────┘
     │
     ▼
┌─────────┐
│ Navigate│
│ to App  │
└─────────┘
```

### **Forgot Password Flow**
```
┌─────────────────┐
│   Login Form    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ "Forgot         │
│ Password?" Link │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Forgot Password │
│ Form            │
│ - Email Address │
└─────────┬───────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌─────────┐ ┌─────────┐
│ Valid   │ │ Invalid │
│ Email   │ │ Email   │
└────┬────┘ └────┬────┘
     │           │
     ▼           ▼
┌─────────┐ ┌─────────┐
│ Send    │ │ Show    │
│ Reset   │ │ Error   │
│ Email   │ │ Message │
└────┬────┘ └────┬────┘
     │           │
     ▼           ▼
┌─────────┐ ┌─────────┐
│ Email   │ │ Return  │
│ Sent    │ │ to Form │
│ Success │ │         │
└────┬────┘ └─────────┘
     │
     ▼
┌─────────┐
│ Check   │
│ Email   │
│ Inbox   │
└────┬────┘
     │
     ▼
┌─────────┐
│ Click   │
│ Reset   │
│ Link    │
└────┬────┘
     │
     ▼
┌─────────┐
│ Reset   │
│ Password│
│ Form    │
└────┬────┘
     │
     ▼
┌─────────┐
│ New     │
│ Password│
│ Set     │
└────┬────┘
     │
     ▼
┌─────────┐
│ Navigate│
│ to Login│
└─────────┘
```

---

## 🎯 **Post-Login User Interactions**

### **Dashboard Interactions**
```
┌─────────────────┐
│   Dashboard     │
│   (Main Page)   │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Clickable       │
│ Elements        │
└─────┬───────────┘
      │
  ┌───┴───┐
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Logo │ │Contact│
│Click│ │Card  │
└─┬───┘ └─┬───┘
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Back │ │Show  │
│to   │ │Contact│
│Dash │ │Info  │
└─────┘ └─────┘
```

### **Navigation Menu Interactions**
```
┌─────────────────┐
│   Navigation    │
│   Menu          │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Menu Items      │
└─────┬───────────┘
      │
  ┌───┴───┐
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Dash │ │Clients│
└─┬───┘ └─┬───┘
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Dash │ │Manage│
│Page │ │Clients│
└─────┘ └─┬───┘
          │
          ▼
┌─────────────┐
│ Client      │
│ Actions     │
└─────┬───────┘
      │
  ┌───┴───┐
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Add  │ │Edit │
│Client│ │Client│
└─────┘ └─────┘
```

### **Mobile Navigation Flow**
```
┌─────────────────┐
│   Mobile        │
│   Header        │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Hamburger       │
│ Menu Button     │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Mobile          │
│ Navigation      │
│ Menu Opens      │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Menu Items      │
└─────┬───────────┘
      │
  ┌───┴───┐
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Dash │ │Close│
│Click│ │Menu │
└─┬───┘ └─┬───┘
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Nav  │ │Menu │
│to   │ │Closes│
│Dash │ │     │
└─────┘ └─────┘
```

---

## 📱 **Mobile vs Desktop Variations**

### **Responsive Behavior**
```
┌─────────────────┐
│   Screen Size   │
│   Detection     │
└─────┬───────────┘
      │
  ┌───┴───┐
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│≤768px│ │>768px│
│Mobile│ │Desktop│
└─┬───┘ └─┬───┘
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Show │ │Show │
│Mobile│ │Sidebar│
│Header│ │      │
└─┬───┘ └─┬───┘
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Mobile│ │Desktop│
│Nav   │ │Nav   │
│Menu  │ │Menu  │
└─────┘ └─────┘
```

### **Onboarding Variations**
```
┌─────────────────┐
│   Onboarding    │
│   Modal         │
└─────┬───────────┘
      │
  ┌───┴───┐
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Mobile│ │Desktop│
│View  │ │View  │
└─┬───┘ └─┬───┘
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Mobile│ │Desktop│
│Header│ │Left   │
│Logo  │ │Panel  │
└─┬───┘ └─┬───┘
  │       │
  ▼       ▼
┌─────┐ ┌─────┐
│Mobile│ │Desktop│
│Step  │ │Step  │
│Indic │ │Indic │
└─────┘ └─────┘
```

---

## ⚠️ **Error Handling & Edge Cases**

### **Onboarding Errors**
```
┌─────────────────┐
│   Onboarding    │
│   Form Input    │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Validation      │
│ Check           │
└─────┬───────────┘
      │
  ┌───┴─────┐
  │         │
  ▼         ▼
┌─────┐ ┌─────────┐
│Valid│ │Invalid  │
│Data │ │Data     │
└─┬───┘ └────┬────┘
  │          │
  ▼          ▼
┌─────┐ ┌─────────┐
│Proceed│ │Show    │
│to Next│ │Error   │
│Step  │ │Message  │
└─────┘ └─────────┘
```

### **Navigation Errors**
```
┌─────────────────┐
│   Navigation    │
│   Attempt       │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Route           │
│ Validation      │
└─────┬───────────┘
      │
  ┌───┴─────┐
  │         │
  ▼         ▼
┌─────┐ ┌─────────┐
│Valid│ │Invalid  │
│Route│ │Route    │
└─┬───┘ └────┬────┘
  │          │
  ▼          ▼
┌─────┐ ┌─────────┐
│Load │ │Show 404 │
│Page │ │Error     │
└─────┘ └─────────┘
```

---

## 💾 **Data Flow & State Management**

### **Local Storage Flow**
```
┌─────────────────┐
│   User Action   │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Update State    │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Save to Local   │
│ Storage         │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Persist Data    │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Load on Next    │
│ Visit           │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Restore State   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Continue User   │
│ Experience      │
└─────────────────┘
```

### **Component State Flow**
```
┌─────────────────┐
│   App State     │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Component       │
│ Props           │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ User            │
│ Interaction     │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ State Update    │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Re-render       │
│ Components      │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ Updated UI      │
└─────────────────┘
```

---

## 🔄 **Proposed Feature Integration Points**

### **Pre-Login Integration**
- **Landing Page** → Login/Register options
- **Authentication** → Onboarding flow
- **Email Verification** → Dashboard access
- **Password Reset** → Login flow

### **Post-Login Enhancements**
- **User Profile** → Settings page
- **Data Export** → Client/Employee management
- **Notifications** → Toast system
- **Search** → Global search functionality

### **Mobile Optimizations**
- **Touch Targets** → Minimum 44px
- **Gesture Support** → Swipe navigation
- **Offline Support** → Local data caching
- **Push Notifications** → Service call alerts

---

## 📊 **Flow Metrics & KPIs**

### **User Journey Metrics**
- **Onboarding Completion Rate**
- **Time to First Dashboard**
- **Navigation Path Analysis**
- **Mobile vs Desktop Usage**

### **Performance Metrics**
- **Page Load Times**
- **Navigation Response Time**
- **Error Rate Tracking**
- **User Session Duration**

---

## 🎨 **Visual Design Considerations**

### **Mobile-First Approach**
- **Responsive Breakpoints**: 480px, 768px, 1024px
- **Touch-Friendly Interface**: 44px minimum touch targets
- **Gesture Navigation**: Swipe, pinch, tap
- **Progressive Enhancement**: Core functionality first

### **Accessibility Standards**
- **WCAG 2.1 AA Compliance**
- **Keyboard Navigation Support**
- **Screen Reader Compatibility**
- **Color Contrast Requirements**

---

*This document serves as a comprehensive blueprint for creating visual user flow diagrams in tools like Visio, Figma, or Lucidchart.* 

## 🖥️ **Desktop Applications:**

### **1. Typora** (Recommended)
- **Platform:** macOS, Windows, Linux
- **Features:** Live preview, direct PDF export
- **Cost:** $14.99 (one-time purchase)
- **Pros:** WYSIWYG editor, excellent formatting
- **Download:** https://typora.io/

### **2. Marked 2** (macOS only)
- **Platform:** macOS
- **Features:** Real-time preview, multiple export formats
- **Cost:** $13.99
- **Pros:** Beautiful interface, great for technical docs

### **3. MacDown** (Free)
- **Platform:** macOS
- **Features:** Live preview, PDF export
- **Cost:** Free
- **Pros:** Open source, lightweight

## 🌐 **Online Tools:**

### **1. Pandoc** (Command Line)
```bash
# Install via Homebrew
brew install pandoc

# Convert to PDF
pandoc USER_FLOW_DOCUMENTATION.md -o user_flow.pdf
```

### **2. Markdown to PDF Online**
- **URL:** https://md-to-pdf.fly.dev/
- **Features:** Drag & drop, instant conversion
- **Cost:** Free

### **3. Dillinger.io**
- **URL:** https://dillinger.io/
- **Features:** Live preview, export to PDF
- **Cost:** Free

## 📱 **VS Code Extensions:**

### **1. Markdown PDF**
- **Extension ID:** `yzane.markdown-pdf`
- **Features:** Direct PDF export from VS Code
- **Cost:** Free

### **2. Markdown All in One**
- **Extension ID:** `yzhang.markdown-all-in-one`
- **Features:** Preview, export, formatting
- **Cost:** Free

## 🚀 **Quick Recommendation:**

For your user flow document, I'd recommend:

1. **Typora** - Best overall experience
2. **VS Code + Markdown PDF extension** - If you're already using VS Code
3. **Pandoc** - If you prefer command line tools

Would you like me to help you set up any of these options? 