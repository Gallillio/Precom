# Engineering Consultancy Website Design Guide

## Design Inspiration Analysis

### 1. **Buro Happold** (burohappold.com)
**Key Design Elements:**
- **Bold Typography**: Uses large, impactful headlines with modern sans-serif fonts
- **Monochromatic Base**: Primarily white background with black text, creating high contrast
- **Project-Focused Hero Images**: Full-width, high-quality architectural photography
- **Minimalist Navigation**: Clean, simple top navigation that becomes sticky on scroll
- **Grid-Based Layouts**: Strong use of modular grid systems for content organization
- **Subtle Animations**: Smooth scroll-triggered fade-ins and parallax effects
- **Interactive Elements**: Hover effects that reveal project details with smooth transitions

### 2. **Cundall** (cundall.com)
**Key Design Elements:**
- **Vibrant Color Accents**: Uses bright teal/turquoise as primary brand color
- **Dynamic Shapes**: Incorporates geometric patterns and angular design elements
- **Card-Based Design**: Information presented in digestible card formats
- **Progressive Disclosure**: Content reveals as users scroll, creating engagement
- **Stats & Numbers**: Bold display of achievements and metrics
- **White Space**: Generous use of negative space for breathing room
- **Micro-Interactions**: Subtle button animations and hover states

### 3. **Royal HaskoningDHV** (haskoning.com)
**Key Design Elements:**
- **Blue Color Palette**: Professional blues ranging from navy to bright blue
- **Parametric Design Elements**: Mathematical/technical patterns in backgrounds
- **Full-Screen Video Headers**: Immersive video backgrounds on key pages
- **Layered Content**: Overlapping elements creating depth
- **Technical Visualization**: Integration of data visualizations and infographics
- **Responsive Grid**: Flexible layouts that adapt seamlessly
- **Contextual Animations**: Animations that support the content narrative

### 4. **BCG** (bcg.com)
**Key Design Elements:**
- **Bold Green Accent**: Distinctive BCG green used strategically
- **Editorial Layout**: Magazine-style article cards with strong imagery
- **Gradient Overlays**: Subtle gradients on images for text readability
- **Advanced Filtering**: Sophisticated content filtering and search
- **Insights-Driven Design**: Focus on thought leadership presentation
- **Interactive Data**: Charts and graphs that respond to user interaction
- **Modular Components**: Reusable design patterns throughout

## Core Design Principles

### 1. **Visual Hierarchy**
- Use size, weight, and color to guide attention
- Primary headlines: 48-64px (desktop), 32-40px (mobile)
- Secondary headlines: 32-40px (desktop), 24-28px (mobile)
- Body text: 16-18px with 1.6-1.8 line height

### 2. **Color Strategy**
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

### 3. **Typography System**
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

### 4. **Animation Guidelines**
- Use CSS transitions for hover states (0.3s ease)
- Implement scroll-triggered animations with Intersection Observer
- Parallax scrolling for hero sections (subtle, 0.1-0.3 speed)
- Stagger animations for list items (0.1s delay between items)

## Page-Specific Design Plans

### 1. **Homepage**

**Hero Section:**
- Full-viewport height with video background showing engineering projects
- Overlaid with semi-transparent gradient (black to transparent)
- Large, bold headline: "Engineering Tomorrow's Infrastructure"
- Subtle parallax effect on scroll
- Animated arrow indicating scroll possibility

**Key Features Section:**
- 3-column grid showcasing main services
- Cards with hover effect that lifts and adds shadow
- Icon animations on hover (SVG morphing)
- Each card has:
  - Custom animated icon
  - Bold headline
  - Brief description
  - "Learn More" link with arrow animation

**Project Showcase:**
- Masonry grid layout with mixed sizes
- Images with color overlay that reveals on hover
- Project name and category appear on hover
- Click triggers smooth modal with project details

**Stats Section:**
- Full-width band with gradient background
- Animated counters that trigger on scroll
- Icons accompanying each stat
- Examples: "500+ Projects", "25 Countries", "50 Years Experience"

**Call-to-Action:**
- Split-screen design
- Left: Bold text with company mission
- Right: Contact form with floating labels
- Geometric pattern background

### 2. **About Us Page**

**Hero Section:**
- Team photo with parallax effect
- Timeline animation showing company history
- Key milestones appear as user scrolls

**Story Section:**
- Large typography for impact statements
- Pull quotes with custom styling
- Image galleries with lightbox functionality

**Team Section:**
- Grid of team members with creative hover effects
- Circular images that transform to square on hover
- Name and position slide up from bottom
- Click reveals full bio in modal

**Values Section:**
- Animated icons representing each value
- Accordion-style expandable content
- Progress bars showing commitment levels

### 3. **Services Page**

**Service Navigation:**
- Sticky sidebar with smooth scroll to sections
- Active section highlighting
- Progress indicator showing scroll position

**Individual Services:**
- Alternating left/right layouts
- Large service icons with subtle animations
- Detailed descriptions with bullet points
- Case study links with thumbnail previews

**Interactive Elements:**
- Tabbed content for sub-services
- Before/after sliders for project comparisons
- 3D rotating elements for technical diagrams

### 4. **Projects/Portfolio Page**

**Filter System:**
- Advanced filtering by:
  - Industry
  - Service type
  - Project scale
  - Location
- Animated filter pills
- Results update with smooth transitions

**Project Grid:**
- Responsive masonry layout
- Lazy loading for performance
- Quick view on hover
- Full project page on click

**Project Detail Pages:**
- Hero image with Ken Burns effect
- Project stats in sidebar
- Image gallery with various layouts
- Technical specifications in accordion
- Related projects carousel

### 5. **Contact Page**

**Contact Options:**
- Card-based layout for different contact methods
- Interactive map with custom styling
- Office locations with hover details

**Contact Form:**
- Multi-step form with progress indicator
- Real-time validation
- File upload capability for project briefs
- Success animation on submission

### 6. **Blog/News Section**

**Blog Listing:**
- Magazine-style layout
- Featured article with large image
- Grid of recent posts
- Category filters with smooth transitions
- Infinite scroll or pagination

**Article Pages:**
- Medium-style reading experience
- Progress bar showing reading position
- Sticky social share buttons
- Related articles sidebar
- Author bio with animation

## Advanced Components

### 1. **Navigation**
```scss
// Behavior
- Transparent on homepage hero
- Becomes solid on scroll
- Hamburger menu animation to X
- Mega menu for services dropdown
- Search with predictive results
```

### 2. **Footer**
```scss
// Design
- Dark background with wave SVG separator
- Newsletter signup with animated button
- Social media icons with hover effects
- Sitemap in organized columns
- Certifications and awards carousel
```

### 3. **Loading States**
```scss
// Elements
- Custom SVG loader animation
- Skeleton screens for content
- Progressive image loading
- Smooth transitions when content appears
```

### 4. **Micro-Interactions**
```scss
// Examples
- Button hover: slight scale and shadow
- Link hover: underline animation
- Form focus: glow effect
- Card hover: lift and shadow
- Icon hover: rotation or morph
```

## Technical Implementation Notes

### 1. **Performance Optimizations**
- Implement lazy loading for images and videos
- Use WebP format with fallbacks
- Minimize animation on mobile devices
- Implement critical CSS
- Use intersection observer for animations

### 2. **Accessibility**
- ARIA labels for all interactive elements
- Keyboard navigation support
- Focus indicators
- Alt text for all images
- Proper heading hierarchy

### 3. **Responsive Breakpoints**
```scss
$mobile: 480px;
$tablet: 768px;
$desktop: 1024px;
$wide: 1440px;
```

### 4. **Animation Libraries**
- Framer Motion for React components
- GSAP for complex animations
- CSS animations for simple transitions
- Lottie for icon animations

## Unique Features to Implement

1. **Project Cost Calculator**: Interactive tool with sliders and real-time updates
2. **Virtual Office Tour**: 360-degree view of facilities
3. **AI Chatbot**: Custom-styled chat interface for instant queries
4. **Resource Library**: Downloadable guides with preview functionality
5. **Client Portal**: Secure area with custom dashboard design
6. **Newsletter Archive**: Searchable past newsletters with filters
7. **Career Portal**: Job listings with advanced filtering and application tracking

## Final Notes

This design guide combines the best elements from all four reference sites while maintaining a unique identity for your engineering consultancy. The focus is on:
- Professional yet approachable design
- Technical competence shown through clean interfaces
- User engagement through meaningful interactions
- Performance and accessibility as priorities
- Scalable component system for future growth

Each element should reinforce your brand values of innovation, reliability, and excellence in engineering.