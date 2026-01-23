# Bomb Rolls & Bowls - Digital Menu Web App

## Overview

This is a mobile-first digital menu web application for "Bomb Rolls and Bowls" restaurant. The app features a splash screen welcome page, promotional carousel, and categorized menu display with veg/non-veg filtering. The design follows a retro diner aesthetic with bold red and yellow colors, checkered patterns, and playful typography.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for UI state (splash screen)
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for page transitions and splash screen effects
- **Carousel**: Embla Carousel with autoplay plugin

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled with tsx for development, esbuild for production)
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts`
- **Build System**: Vite for frontend, esbuild for backend bundling

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema**: Defined in `shared/schema.ts` with categories and menu items tables
- **Migrations**: Managed via drizzle-kit with `db:push` command
- **Current State**: Static data fallback in `client/src/lib/staticData.ts` for development

### Project Structure
```
client/           # React frontend application
  src/
    components/   # UI components including shadcn/ui
    pages/        # Route page components
    hooks/        # Custom React hooks
    context/      # React Context providers
    lib/          # Utilities and static data
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Shared types and schemas
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod validation
```

### Key Design Decisions

1. **Shared Schema Pattern**: Database schema and types are shared between frontend and backend via the `shared/` directory, ensuring type safety across the stack.

2. **Static Data Fallback**: The frontend currently uses static menu data (`staticData.ts`) to function without database dependency during development.

3. **Mobile-First Design**: All components are designed for mobile viewports first, with responsive breakpoints for larger screens.

4. **Splash Screen Context**: A React Context manages splash screen visibility globally, allowing any component to trigger it.

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Frontend Libraries
- **TanStack React Query**: Data fetching and caching
- **Framer Motion**: Animation library
- **Embla Carousel**: Touch-friendly carousel component
- **Radix UI**: Headless UI primitives for accessible components

### Development Tools
- **Vite**: Frontend build tool with HMR
- **tsx**: TypeScript execution for Node.js
- **drizzle-kit**: Database migration tooling

### Fonts (Google Fonts)
- Architects Daughter (display/decorative)
- DM Sans (body text)