# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based engineering consultancy website (Precom) built with React 19, TypeScript, and Tailwind CSS. The project follows a modular architecture with features organized by domain.

## Commands

### Development
- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing
No test framework is currently configured.

## Architecture

### Module Structure
The codebase follows a modular architecture with all features organized under `src/modules/`. Each module contains:
- `components/` - React components specific to the module
- `screens/` - Page-level components
- `utils/` - Module-specific utilities (if needed)

### Current Modules
- `about/` - About page functionality
- `blog/` - Blog system
- `contact/` - Contact forms and information
- `home/` - Landing page
- `projects/` - Project showcase
- `services/` - Service listings
- `shared/` - Shared components and utilities

### Shared Components
Located in `src/modules/shared/`:
- `components/layout/` - Header, Footer, Navigation
- `components/ui/` - Reusable UI components (Button, Card, Input, Modal)
- `components/common/` - Common components
- `utils/` - Shared utilities, constants, and types

### Key Files
- `src/modules/shared/utils/constants.ts` - Company info, routes, services, validation rules
- `src/modules/shared/utils/types.ts` - TypeScript type definitions
- `src/modules/shared/utils/helpers.ts` - Utility functions
- `src/app/layout.tsx` - Root layout with Header/Footer
- `src/app/page.tsx` - Home page component

## Development Rules

### Modularity
From `rules/modularity.mdc`: When adding new features, check the current codebase for existing reusable functions and components. If they don't exist, create new reusable ones. Focus on modularity.

### File Structure
From `rules/filestructure.mdc`: The main folder structure is based on modules. Each module contains components, screens, and utils folders as needed.

## Code Conventions

### TypeScript
- Strict mode enabled
- Path aliases configured (`@/*` maps to `./src/*`)
- Comprehensive type definitions in `src/modules/shared/utils/types.ts`

### React
- React 19 with Next.js 15
- Functional components with hooks
- TypeScript interfaces for all props

### Styling
- Tailwind CSS for styling
- Responsive design patterns
- Consistent spacing and color schemes

### Component Structure
- UI components in `src/modules/shared/components/ui/`
- Layout components in `src/modules/shared/components/layout/`
- Each component exports with proper TypeScript interfaces
- Consistent prop patterns (variant, size, className, etc.)

## Styling Redesign Instructions

When working on the website styling revamp:
- Follow the comprehensive design guide in `design-guide.md` which details inspiration from Buro Happold, Cundall, Royal HaskoningDHV, and BCG
- Continue implementing tasks from `styling-revamp-plan.md` which tracks the complete redesign progress
- Focus on transforming the entire theme and design of the website to a modern, professional engineering consultancy aesthetic
- Implement features like sticky navigation, mega menus, video backgrounds, parallax effects, animated cards, and advanced filtering systems
- If additional assets are needed (videos, images, etc.), compile a list and present it after code generation
- Always reference the design guide for specific implementation details, color schemes, typography, and animation guidelines

## AI Asset Generation Protocol

When adding new assets to `assets-needed.md`:
- **ALWAYS include detailed AI generation prompts** for each visual asset (images, videos, icons, graphics)
- Prompts should reference the established brand guidelines:
  - Color palette: Deep blue (#003366), teal (#00B4A6), supporting grays and whites
  - Style: Professional, clean, modern engineering consultancy aesthetic
  - Quality: Premium, matching top-tier consulting firms (BCG, Buro Happold standards)
  - Brand narrative: Innovation, reliability, technical excellence, approachable professionalism
- Include specific technical requirements (dimensions, formats, styles)
- Ensure prompts maintain visual consistency across the entire asset library
- Reference the comprehensive prompt examples in `assets-needed.md` for format and detail level

## Important Notes

- Always check existing shared components before creating new ones
- Follow the established module structure for new features
- Use TypeScript types from `src/modules/shared/utils/types.ts`
- Constants should be added to `src/modules/shared/utils/constants.ts`
- The project uses Next.js App Router structure
- Company branding: "Precom" - Professional Engineering Consultancy