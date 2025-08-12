# Complete Navigation Flow & URL Structure

## 🌐 **URL Structure & Navigation Flow**

### **Public Marketing Site**
\`\`\`
/ (Homepage)
├── /about
├── /pricing
├── /features
├── /blog
├── /contact
├── /login
└── /signup
\`\`\`

### **Regular User Dashboard**
\`\`\`
/dashboard (Main Dashboard)
├── /dashboard/social-accounts (Social Media Integration)
├── /dashboard/content-planner (Content Planning & Scheduling)
├── /dashboard/asset-library (Brand Asset Management)
├── /dashboard/analytics (Performance Analytics)
├── /dashboard/team (Team Management)
└── /dashboard/settings (User Settings)
\`\`\`

### **Agency Portal (White-Label)**
\`\`\`
/agency (Agency Dashboard)
├── /agency/clients (Client Management)
├── /agency/branding (White-Label Branding)
├── /agency/analytics (Agency-Wide Analytics)
└── /agency/settings (Agency Settings)
\`\`\`

### **Client Portal (Under Agency Branding)**
\`\`\`
/client/[clientId] (Client Dashboard)
├── /client/[clientId]/content (Content Planner)
├── /client/[clientId]/assets (Asset Library)
├── /client/[clientId]/social (Social Accounts)
├── /client/[clientId]/analytics (Client Analytics)
└── /client/[clientId]/settings (Client Settings)
\`\`\`

## 🔄 **User Journey & Navigation Flow**

### **1. New User Journey**
\`\`\`
Landing Page (/) 
→ Sign Up (/signup)
→ Onboarding Flow
→ Dashboard (/dashboard)
\`\`\`

### **2. Regular User Flow**
\`\`\`
Login (/login)
→ Dashboard (/dashboard)
├── Create Content (/dashboard/content-planner)
├── Manage Assets (/dashboard/asset-library)
├── Connect Social Accounts (/dashboard/social-accounts)
├── View Analytics (/dashboard/analytics)
└── Account Settings (/dashboard/settings)
\`\`\`

### **3. Agency User Flow**
\`\`\`
Agency Login (/login?type=agency)
→ Agency Dashboard (/agency)
├── Manage Clients (/agency/clients)
│   ├── View Client Dashboard (/client/[clientId])
│   ├── Invite New Client (Modal)
│   └── Client Settings
├── Customize Branding (/agency/branding)
├── View Agency Analytics (/agency/analytics)
└── Agency Settings (/agency/settings)
\`\`\`

### **4. Client User Flow (Under Agency)**
\`\`\`
Client Login (https://clients.agency.com/login)
→ Client Dashboard (/client/[clientId])
├── Plan Content (/client/[clientId]/content)
├── Manage Assets (/client/[clientId]/assets)
├── Social Accounts (/client/[clientId]/social)
├── View Analytics (/client/[clientId]/analytics)
└── Settings (/client/[clientId]/settings)
\`\`\`

## 🎨 **White-Label Implementation**

### **Agency Branding Features**
- **Custom Domain**: `clients.agency.com`
- **Custom Logo**: Agency logo replaces original branding
- **Custom Colors**: Primary/secondary color customization
- **Custom Favicon**: Agency favicon
- **Branded Emails**: All communications use agency branding

### **Hidden Original Branding**
- No references to original SaaS name
- Agency name in headers/footers
- Agency contact information
- Agency support links
- "Powered by [Agency]" attribution

## 📱 **Responsive Navigation**

### **Desktop Navigation**
- **Sidebar**: Always visible with icons + text
- **Top Bar**: Search, notifications, profile menu
- **Breadcrumbs**: Current page location

### **Mobile Navigation**
- **Hamburger Menu**: Collapsible sidebar
- **Bottom Navigation**: Quick access to main sections
- **Swipe Gestures**: Navigate between sections

## 🔐 **Authentication & Access Control**

### **User Types & Permissions**
\`\`\`
Super Admin (Platform Owner)
├── Full platform access
└── Agency management

Agency Admin
├── Agency dashboard access
├── Client management
├── Branding customization
└── Agency analytics

Agency Manager
├── Client management
├── Content oversight
└── Limited analytics

Agency Editor
├── Content creation
├── Asset management
└── Basic analytics

Client Admin
├── Full client dashboard
├── Team management
└── Client settings

Client User
├── Content creation
├── Asset access
└── Basic analytics
\`\`\`

### **Access Control Flow**
\`\`\`
Login → Role Detection → Route to Appropriate Dashboard
├── Agency User → /agency
├── Client User → /client/[clientId]
└── Regular User → /dashboard
\`\`\`

## 🔗 **Inter-Navigation Links**

### **Agency to Client Navigation**
\`\`\`
Agency Dashboard (/agency)
→ Client List (/agency/clients)
→ View Client Dashboard (/client/[clientId])
→ Return to Agency (/agency) [Breadcrumb]
\`\`\`

### **Cross-Platform Links**
- **Help & Support**: Context-aware help based on user type
- **Billing**: Different billing interfaces for agencies vs. clients
- **Settings**: Role-based settings access

## 📊 **Analytics & Tracking**

### **Navigation Analytics**
- **Page Views**: Track most visited sections
- **User Flow**: Understand navigation patterns
- **Drop-off Points**: Identify where users leave
- **Feature Usage**: Track feature adoption

### **White-Label Analytics**
- **Agency Performance**: Track across all clients
- **Client Segmentation**: Performance by client type
- **Usage Patterns**: How agencies use the platform

## 🚀 **Performance Optimization**

### **Route Optimization**
- **Code Splitting**: Load only necessary components
- **Prefetching**: Preload likely next pages
- **Caching**: Cache navigation components
- **Lazy Loading**: Load heavy components on demand

### **Mobile Optimization**
- **Touch Targets**: 44px minimum touch targets
- **Gesture Support**: Swipe navigation
- **Offline Support**: Cache critical navigation
- **Progressive Loading**: Load content progressively

## 🔧 **Technical Implementation**

### **Next.js App Router Structure**
\`\`\`
app/
├── (marketing)/
│   ├── page.tsx (Homepage)
│   ├── about/page.tsx
│   ├── pricing/page.tsx
│   └── blog/page.tsx
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── social-accounts/page.tsx
│   ├── content-planner/page.tsx
│   ├── asset-library/page.tsx
│   └── settings/page.tsx
├── agency/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── clients/page.tsx
│   ├── branding/page.tsx
│   ├── analytics/page.tsx
│   └── settings/page.tsx
└── client/
    └── [clientId]/
        ├── layout.tsx
        ├── page.tsx
        ├── content/page.tsx
        ├── assets/page.tsx
        ├── social/page.tsx
        ├── analytics/page.tsx
        └── settings/page.tsx
\`\`\`

### **Navigation Components**
- **Sidebar**: Reusable sidebar component with role-based navigation
- **Header**: Context-aware header with search and notifications
- **Breadcrumbs**: Dynamic breadcrumb generation
- **Mobile Menu**: Responsive mobile navigation

This comprehensive navigation system provides a seamless experience across all user types while maintaining proper white-label functionality for agencies and their clients.
