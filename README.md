# AC Drain Wiz Dashboard

A comprehensive React-based dashboard for managing AC and drain services, built with Vite and deployed on Netlify.

## 🚀 Features

- **Dashboard Overview**: Real-time statistics and business metrics
- **Client Management**: Add, edit, and manage client information
- **Employee Management**: Track team members and their roles
- **Service Call Tracking**: Monitor and manage service requests
- **Onboarding Flow**: Interactive welcome tour for new users
- **Toast Notifications**: Real-time feedback system
- **Responsive Design**: Works on desktop and mobile devices

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── OnboardingModal.jsx  # Welcome tour
│   ├── Toast.jsx       # Notification system
│   └── *.jsx           # Icon components
├── pages/              # Main page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── ManageClients.jsx
│   ├── ManageEmployees.jsx
│   └── ManageServiceCalls.jsx
├── App.jsx             # Main application component
├── main.jsx            # React entry point
└── styles.css          # Global styles

public/
├── images/             # Static assets
└── _redirects          # Netlify redirects
```

## 🛠️ Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🚀 Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### Custom Domain Setup
1. Add custom domain in Netlify dashboard
2. Configure DNS records:
   - Type: CNAME
   - Name: acdw
   - Value: your-netlify-site.netlify.app

## 📊 Recent Updates

- ✅ Complete project restoration
- ✅ Onboarding modal system
- ✅ Toast notification system
- ✅ Enhanced dashboard with activity feed
- ✅ Quick action buttons
- ✅ Improved responsive design
- ✅ Status and priority badges
- ✅ Netlify deployment configuration

## 🔧 Configuration Files

- `package.json` - Dependencies and scripts
- `vite.config.js` - Build configuration
- `netlify.toml` - Netlify deployment settings
- `public/_redirects` - SPA routing configuration

## 📈 Business Features

### Dashboard
- Total clients overview
- Active service calls tracking
- Monthly revenue display
- Team member count
- Recent activity feed
- Quick action buttons

### Client Management
- Client information storage
- Service history tracking
- Status management
- Contact information

### Employee Management
- Team member profiles
- Role assignments
- Hire date tracking
- Status management

### Service Call Management
- Call creation and tracking
- Priority levels (urgent, high, medium)
- Status updates (scheduled, in-progress, completed)
- Employee assignment

## 🎨 UI/UX Features

- Modern gradient design
- Responsive layout
- Interactive components
- Smooth animations
- Status indicators
- Toast notifications

## 🔍 Comparison Tools

The project includes automated comparison scripts:

- `quick_compare.sh` - Quick project structure check
- `compare_projects.sh` - Full comparison between versions

## 📝 Notes

- Missing assets (images) need to be added to `public/images/`
- The project builds successfully and is ready for deployment
- All core functionality has been restored

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for AC Drain Wiz business operations. 