# AC Drain Wiz Dashboard - Deployment Guide

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Netlify Deployment

### Automatic Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Manual Deployment
1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
```bash
npx netlify deploy --prod --dir=dist
```

### Custom Domain Setup
1. Add custom domain in Netlify dashboard
2. Configure DNS records:
   - Type: CNAME
   - Name: acdw
   - Value: your-netlify-site.netlify.app

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── App.jsx             # Main app component
├── main.jsx            # React entry point
└── styles.css          # Global styles

public/
├── images/             # Static assets
└── _redirects          # Netlify redirects
```

## Features

- ✅ Dashboard with statistics
- ✅ Client management
- ✅ Employee management
- ✅ Service call tracking
- ✅ Onboarding modal
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Modern UI/UX

## Recent Updates

- Added onboarding flow
- Implemented toast notification system
- Enhanced dashboard with activity feed
- Added quick action buttons
- Improved responsive design
- Added status and priority badges 