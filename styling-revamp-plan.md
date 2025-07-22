# Website Styling Revamp Plan

## Overview
This plan transforms the current basic website into a modern, professional engineering consultancy site inspired by industry leaders like Buro Happold, Cundall, Royal HaskoningDHV, and BCG.

## Design Implementation Instructions
**Important:** When working on this styling revamp, always:
- Follow the comprehensive design guide in `design-guide.md` for specific implementation details
- Reference the detailed page designs, animation guidelines, and component specifications  
- Focus on transforming the entire theme and design to match professional engineering consultancy standards
- Implement advanced features like sticky navigation, mega menus, video backgrounds, parallax effects, animated cards, and filtering systems
- If additional assets are needed (videos, images, etc.), compile a list after code generation and present to user
- Ensure all implementations align with the established design system and color palette

## AI Asset Generation Protocol
**Critical:** When adding new assets during development:
- **Always add detailed AI generation prompts** to `assets-needed.md` for any visual assets
- Maintain brand consistency across all generated content using established guidelines:
  - Professional engineering consultancy aesthetic
  - Color palette: Deep blue (#003366), vibrant teal (#00B4A6)
  - Premium quality matching top-tier consulting firms
  - Brand values: Innovation, reliability, technical excellence, approachability
- Include specific technical specifications (dimensions, formats, quality requirements)
- Ensure visual narrative supports the overall design transformation goals

## Implementation Progress

### **Phase 1: Foundation (Critical)**
- [x] Update CSS custom properties with new color palette
- [x] Implement new typography system with Inter font
- [x] Create design token system for consistent theming
- [x] Update all existing utility classes

### **Phase 2: Core Components (Critical)**
- [x] Redesign Button component with new styles and animations
- [x] Redesign Card component with hover effects and shadows
- [x] Redesign Form components with floating labels and validation
- [x] Create new Badge and Status components

### **Phase 3: Navigation & Layout (Critical)**
- [x] Implement sticky navigation with scroll behavior
- [x] Create mega menu for services dropdown
- [x] Add search functionality with predictive results
- [x] Redesign mobile hamburger menu with animations

### **Phase 4: Homepage Hero (High Priority)**
- [x] Implement full-viewport video background
- [x] Add parallax scrolling effects
- [x] Create overlay gradients for text readability
- [x] Add scroll indicator animations

### **Phase 5: Homepage Content (High Priority)**
- [x] Redesign services section with animated cards
- [x] Create stats section with counter animations
- [x] Implement project showcase with masonry grid
- [x] Add hover effects and transitions

### **Phase 6: About Page (Medium Priority)**
- [x] Create animated company timeline
- [x] Implement team grid with creative hover effects
- [x] Add values section with progress indicators
- [x] Create modal system for team bios

### **Phase 7: Services Page (Medium Priority)**
- [x] Implement sticky sidebar navigation
- [x] Create alternating left/right service layouts
- [x] Add tabbed content for sub-services
- [x] Include before/after comparison sliders

### **Phase 8: Projects Page (Medium Priority)**
- [x] Implement advanced filtering system
- [x] Create responsive masonry layout
- [x] Add project detail modal system
- [x] Include Ken Burns effect for hero images

### **Phase 9: Contact Page (Medium Priority)**
- [x] Create multi-step contact form
- [x] Add interactive map with custom styling
- [x] Implement file upload capability
- [x] Add success animations
- [x] **REDESIGN: Contact Hero Section** - Implement parallax hero with video background matching other pages
- [x] **REDESIGN: Contact Options Cards** - Create premium card-based layout with hover effects and animations
- [x] **REDESIGN: Enhanced Interactive Map** - Add Ken Burns effect, hover details, and advanced styling
- [x] **REDESIGN: Form Container Styling** - Match premium card design with gradients and shadows
- [x] **REDESIGN: Office Information Section** - Create animated info cards with team/location details
- [x] **REDESIGN: FAQ Section Enhancement** - Add accordion animations and interactive elements
- [x] **REDESIGN: Call-to-Action Section** - Implement split-screen design with gradient backgrounds
- [x] **REDESIGN: Page Animations** - Add scroll-triggered animations and micro-interactions throughout

### **Phase 10: Blog Page (Medium Priority)**
- [ ] Implement magazine-style article layout
- [ ] Add reading progress indicator
- [ ] Create article filtering system
- [ ] Include infinite scroll or pagination

### **Phase 11: Animation System (Medium Priority)**
- [ ] Implement scroll-triggered animations
- [ ] Add micro-interactions for buttons and links
- [ ] Create custom loading animations
- [ ] Include parallax effects throughout

### **Phase 12: Performance & Polish (Low Priority)**
- [ ] Optimize animations for performance
- [ ] Add skeleton loading screens
- [ ] Implement progressive image loading
- [ ] Final accessibility and responsiveness testing

## Design Specifications

### **Color Palette**
```scss
// Primary Colors
$primary-blue: #003366;      // Deep professional blue
$accent-teal: #00B4A6;       // Vibrant teal for CTAs
$secondary-gray: #F5F5F5;    // Light background gray

// Supporting Colors
$text-primary: #1A1A1A;      // Almost black for main text
$text-secondary: #666666;     // Medium gray for secondary text
$white: #FFFFFF;              // Pure white
$success: #10B981;            // Green for positive states
$warning: #F59E0B;            // Orange for warnings
```

### **Typography System**
```scss
// Font Stack
$heading-font: 'Inter', 'Helvetica Neue', sans-serif;
$body-font: 'Inter', 'Arial', sans-serif;

// Font Weights
$weight-regular: 400;
$weight-medium: 500;
$weight-semibold: 600;
$weight-bold: 700;
```

### **Visual Hierarchy**
- Primary headlines: 48-64px (desktop), 32-40px (mobile)
- Secondary headlines: 32-40px (desktop), 24-28px (mobile)
- Body text: 16-18px with 1.6-1.8 line height

### **Animation Guidelines**
- 0.3s ease transitions for hover states
- Scroll-triggered animations with Intersection Observer
- Subtle parallax (0.1-0.3 speed)
- Staggered animations for lists

### **Responsive Breakpoints**
```scss
$mobile: 480px;
$tablet: 768px;
$desktop: 1024px;
$wide: 1440px;
```

---

**Total Progress:** 37/48 tasks completed

**Current Phase:** Phase 9 - Contact Page (100% Complete) ✅  
**Status:** Foundation, Core Components, Navigation, Hero, Homepage Content, About Page, Services Page, Projects Page, and Contact Page Complete. All Contact Page redesigns implemented with premium styling, animations, and interactions.
**Next Milestone:** Begin Phase 10 - Blog Page implementation