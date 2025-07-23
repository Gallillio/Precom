# Navbar Transparency Implementation Guide

## Overview

This document provides a comprehensive guide to implementing the dynamic navbar transparency effect that's currently active on the homepage. The navbar starts as transparent when users are at the top of the page and transitions to a white background with shadow when scrolling.

## Current Implementation Status

✅ **Implemented**: Homepage (`/`)  
❌ **Not Implemented**: `/about`, `/services`, `/projects`, `/blog`, `/contact`

## Architecture

### File Structure

```
src/modules/shared/components/layout/
├── Header.tsx          # Main header component with transparency logic
├── HeaderWrapper.tsx   # Wrapper that determines if current page is homepage
└── ...
```

### Component Hierarchy

```
RootLayout (src/app/layout.tsx)
└── HeaderWrapper
    └── Header (with isHomePage prop)
```

## Key Implementation Details

### 1. HeaderWrapper Component (`src/modules/shared/components/layout/HeaderWrapper.tsx`)

**Purpose**: Determines whether the current page is the homepage and passes this information to the Header component.

```typescript
'use client'
import { usePathname } from 'next/navigation'
import { Header } from './Header'

interface HeaderWrapperProps {
  className?: string
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ className }) => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return <Header isHomePage={isHomePage} className={className} />
}
```

**Key Features**:
- Uses `usePathname()` hook to get current route
- Compares pathname to `'/'` to determine if it's the homepage
- Passes `isHomePage` boolean prop to Header component

### 2. Header Component (`src/modules/shared/components/layout/Header.tsx`)

**Purpose**: Main navigation component that handles the transparency effect based on scroll position and page type.

#### Interface

```typescript
interface HeaderProps {
  className?: string
  isHomePage?: boolean  // Controls transparency behavior
}
```

#### State Management

```typescript
const [isScrolled, setIsScrolled] = useState(false)
```

#### Scroll Detection Logic

```typescript
// Handle scroll effect for sticky navigation
useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY
    setIsScrolled(scrollTop > 20)  // Threshold: 20px
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

**Key Features**:
- Listens to window scroll events
- Sets `isScrolled` to `true` when scroll position > 20px
- Properly cleans up event listener on unmount

#### Dynamic Styling System

The component uses a sophisticated conditional styling system based on two key states:
- `isScrolled`: Whether user has scrolled past 20px
- `isHomePage`: Whether current page is the homepage

##### Header Background Styling

```typescript
const headerClasses = `
  fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
  ${
    isScrolled || !isHomePage
      ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[var(--border)]'
      : 'bg-transparent'
  }
`.replace(/\s+/g, ' ').trim()
```

**Logic**:
- **Non-homepage OR scrolled**: White background with blur, shadow, and border
- **Homepage AND not scrolled**: Transparent background

##### Logo Color Styling

```typescript
const logoClasses = `
  text-2xl font-bold transition-colors duration-300
  ${
    isScrolled || !isHomePage
      ? 'text-[var(--primary-blue)]'
      : 'text-white'
  }
`.replace(/\s+/g, ' ').trim()
```

**Logic**:
- **Non-homepage OR scrolled**: Blue text
- **Homepage AND not scrolled**: White text

##### Navigation Link Styling

```typescript
const navLinkClasses = (isActive: boolean) => `
  relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out
  ${
    isActive
      ? isScrolled || !isHomePage
        ? 'text-[var(--primary-blue)] bg-[var(--primary-blue)]/10'
        : 'text-[var(--accent-teal)] bg-white/20'
      : isScrolled || !isHomePage
      ? 'text-[var(--text-primary)] hover:text-[var(--primary-blue)] hover:bg-[var(--background-secondary)]'
      : 'text-white/90 hover:text-white hover:bg-white/20'
  }
`.replace(/\s+/g, ' ').trim()
```

**Logic**:
- **Active Link**:
  - Non-homepage OR scrolled: Blue text with blue background
  - Homepage AND not scrolled: Teal text with white background
- **Inactive Link**:
  - Non-homepage OR scrolled: Dark text with standard hover effects
  - Homepage AND not scrolled: White text with white hover background

##### Search Component Styling

```typescript
<CompactSearch
  onSearch={handleSearch}
  placeholder="Search..."
  className={`transition-colors duration-300 ${
    isScrolled || !isHomePage
      ? 'text-[var(--text-secondary)]'
      : 'text-white/80'
  }`}
/>
```

##### CTA Button Styling

```typescript
<Button
  variant={isScrolled || !isHomePage ? 'primary' : 'outline'}
  size="sm"
  className={`transition-all duration-300 ${
    !isScrolled && isHomePage
      ? 'border-white text-white hover:bg-white hover:text-[var(--primary-blue)]'
      : ''
  }`}
>
  Get Quote
</Button>
```

##### Mobile Menu Button Styling

```typescript
<button
  className={`p-2 rounded-lg transition-colors duration-300 ${
    isScrolled || !isHomePage
      ? 'text-[var(--text-primary)] hover:bg-[var(--background-secondary)]'
      : 'text-white hover:bg-white/20'
  }`}
>
```

#### Layout Spacing Logic

```typescript
{/* Spacer for fixed header */}
<div className={isHomePage ? '' : 'h-20'} />
```

**Important**: 
- **Homepage**: No spacer (allows hero section to start at top)
- **Other pages**: 20px spacer to prevent content from hiding behind fixed header

### 3. CSS Variables Used

The implementation relies on CSS custom properties defined in the global styles:

```css
:root {
  --primary-blue: #003366;
  --accent-teal: #00B4A6;
  --text-primary: /* dark text color */;
  --text-secondary: /* secondary text color */;
  --background-secondary: /* light background */;
  --border: /* border color */;
}
```

### 4. Animation & Transitions

All elements use consistent transition timing:
- **Duration**: 300ms
- **Easing**: `ease-in-out`
- **Properties**: `all` (for comprehensive transitions)

```css
transition-all duration-300 ease-in-out
```

## How to Implement on Other Pages

### Step 1: No Code Changes Required

The current implementation is **already set up** to work on all pages. The `HeaderWrapper` component automatically detects the current page and passes the appropriate `isHomePage` prop.

### Step 2: Behavior on Other Pages

When `isHomePage={false}`:
- Header always has white background
- Logo is always blue
- Navigation links use standard dark theme
- Header includes 20px spacer div

### Step 3: To Enable Transparency on Other Pages

If you want to enable transparency on other pages, modify the `HeaderWrapper` component:

```typescript
// Current logic (only homepage)
const isHomePage = pathname === '/'

// Extended logic (multiple pages)
const isHomePage = ['/', '/about', '/services'].includes(pathname)
```

Or create page-specific transparency:

```typescript
const transparentPages = ['/', '/about', '/services']
const isTransparentPage = transparentPages.includes(pathname)
```

## Visual States Summary

### Homepage States

| Scroll Position | Background | Logo Color | Nav Links | CTA Button |
|----------------|------------|------------|-----------|------------|
| Top (0-20px) | Transparent | White | White/Teal | Outline White |
| Scrolled (>20px) | White/Blur | Blue | Dark/Blue | Primary Blue |

### Other Pages States

| Page Type | Background | Logo Color | Nav Links | CTA Button |
|-----------|------------|------------|-----------|------------|
| Non-homepage | White/Blur | Blue | Dark/Blue | Primary Blue |

## Technical Considerations

### Performance
- Event listener is properly cleaned up on unmount
- Scroll threshold of 20px prevents excessive state updates
- CSS transitions handle smooth visual changes

### Accessibility
- All color combinations maintain sufficient contrast
- Focus states are preserved across different transparency states
- Mobile menu button includes proper ARIA labels

### Browser Compatibility
- Uses modern CSS features like `backdrop-blur-md`
- Fallbacks are in place with semi-transparent backgrounds (`bg-white/95`)

## Debugging Tips

### Common Issues

1. **Transparency not working**: Check if `isHomePage` prop is being passed correctly
2. **Abrupt transitions**: Verify CSS transition classes are applied
3. **Content hiding behind header**: Ensure spacer div logic is correct
4. **Scroll detection not working**: Check if scroll event listener is properly attached

### Testing

Test the following scenarios:
- Load homepage and scroll up/down
- Navigate between pages
- Test on mobile devices
- Test with different screen sizes
- Verify accessibility with keyboard navigation

## Future Enhancements

Potential improvements to consider:
1. **Intersection Observer**: Replace scroll event with Intersection Observer for better performance
2. **Custom Hook**: Extract scroll detection logic into a reusable hook
3. **Page-specific Transparency**: Allow individual pages to opt into transparency
4. **Animation Presets**: Create reusable animation configurations
5. **Theme Integration**: Better integration with global theme system

## Conclusion

The navbar transparency implementation is a sophisticated system that creates a professional, modern user experience. The current code is well-structured, performant, and ready to be extended to other pages with minimal modifications.

The key to success is understanding the interaction between `isHomePage`, `isScrolled`, and the conditional styling system that creates seamless transitions between transparent and solid states.