# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React, TypeScript, Vite, styled-components, Tailwind CSS, and Framer Motion. The portfolio features a full-screen hero section with scroll-based fade effects, an about section, projects showcase, and contact form integrated with Formspree.

## Technology Stack

- **Build Tool**: Vite
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 + styled-components 6
- **Animation**: Framer Motion
- **Form Handling**: Formspree (@formspree/react)
- **Package Manager**: pnpm (preferred) or npm

## Development Commands

```bash
# Start development server with hot module reload
pnpm dev
# or
npm run dev

# Type-check and build for production
pnpm build
# or
npm run build

# Preview production build locally
pnpm preview
# or
npm run preview

# Run ESLint
pnpm lint
# or
npm run lint
```

## Component Generation

This project uses `generate-react-cli` for consistent component scaffolding. Configuration is in `generate-react-cli.json`.

**To generate a new component:**
```bash
npx generate-react-cli component ComponentName
```

This creates a component in `src/components/ComponentName/` with:
- `ComponentName.tsx` - Main component file
- `ComponentName.styled.ts` - styled-components file
- `ComponentName.lazy.tsx` - Lazy-loaded version
- `ComponentName.stories.tsx` - Storybook story file

**Component structure conventions:**
- All components go in `src/components/`
- Each component gets its own directory
- Use TypeScript with React.FC type
- Include styled-components for component-specific styles
- Lazy loading enabled by default

## Architecture

### Component Structure

The app follows a single-page layout with sections rendered in `App.tsx`:

```
App.tsx
├── Hero (full-width, fixed background)
└── root container
    ├── Header (navigation)
    └── main
        ├── About
        ├── Projects
        └── Contact
```

**Key architectural patterns:**

1. **Hero Component** (`src/components/Hero/Hero.tsx`):
   - Uses fixed positioning for parallax-style background
   - Scroll-based opacity fade overlay
   - Responsive image loading based on viewport width
   - Framer Motion for entrance animations
   - Initial overlay opacity: 0.25, max: 0.92 (controlled at lines 26-27)

2. **Contact Form** (`src/components/Contact/Contact.tsx`):
   - Formspree integration with form ID `xanpeaqb`
   - Client-side validation before submission
   - Error handling with real-time feedback
   - Success state after submission

3. **Styling Approach**:
   - Tailwind CSS for utility classes and layout
   - styled-components for component-scoped styles
   - Framer Motion for animations (variants patterns)
   - Custom fonts referenced in CSS (Big Shoulders Display family)

### State Management

- Local component state with React hooks (useState, useEffect, useRef)
- No global state management library
- Form state managed by Formspree's `useForm` hook

### File Organization

```
src/
├── components/           # All React components
│   ├── [ComponentName]/
│   │   ├── [ComponentName].tsx
│   │   ├── [ComponentName].styled.ts
│   │   ├── [ComponentName].lazy.tsx
│   │   └── [ComponentName].stories.tsx
├── assets/              # Static assets
├── App.tsx              # Main app component and routing
├── main.tsx             # React entry point
└── index.css            # Global styles + Tailwind directives
```

### TypeScript Configuration

- Project uses TypeScript ~5.8.3
- Two tsconfig files: `tsconfig.app.json` (app code) and `tsconfig.node.json` (build tools)
- Strict mode enabled

## Important Implementation Details

1. **Responsive Images**: Hero component loads different image sizes based on viewport width (480px, 768px, 1024px, 1440px, 1920px). Images located in `/public/images/hero-*.jpg`

2. **Scroll Effects**: Hero fade overlay uses `scrollProgress` state (0-1 range) to interpolate opacity. Calculation at Hero.tsx:22-32

3. **Form Integration**: Contact form submits to Formspree. Form ID is at Contact.tsx:31. Validation logic at Contact.tsx:44-63

4. **Animation Patterns**: Components use Framer Motion with staggered delays. Standard pattern: initial opacity 0, animate to opacity 1 with easeOut timing

5. **Styling Hybrid**: Mix of Tailwind utilities (layout, spacing, colors) and styled-components (complex animations, component-specific styles). Tailwind configured for content in `index.html` and all `src/**/*.{js,ts,jsx,tsx}` files

## Common Gotchas

- Package manager: Project has both `package-lock.json` and `pnpm-lock.yaml`. Use pnpm for consistency with latest lock file
- Contact form: Red debug background and inline styles on line 119 should be removed for production
- Hero scroll: Fixed positioning can cause z-index issues. Hero layers: background image (bottom), overlay (middle), content (z-index: 3)
- Tailwind v4: Using latest Tailwind which may have syntax differences from v3

## Standard Workflow
1. First think through the problem, read the codebase for relevant files, and write a plan to todo.md.
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information.