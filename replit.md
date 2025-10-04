# Frame Plus Photography Portfolio

## Overview

Frame Plus is a professional photography portfolio website built as a full-stack application showcasing photography services, team members, and portfolio work. The application features a modern, bilingual (Arabic/English) interface for a photography business offering various services including weddings, portraits, events, and commercial photography. Users can browse the portfolio, learn about the team, view service packages, and submit booking inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React with TypeScript for type-safe component development
- Wouter for lightweight client-side routing
- Single-page application with hash-based navigation for smooth scrolling between sections

**UI Component System**
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with CSS variables for theming
- Custom design system with Frame Plus brand colors (neon yellow primary)
- Responsive design with mobile-first approach

**State Management**
- TanStack Query (React Query) for server state management
- Form state handled by React Hook Form with Zod validation
- Local component state for UI interactions (lightbox, navigation, filters)

**Data Fetching Strategy**
- Query-based data fetching with automatic caching and background updates
- Custom `apiRequest` wrapper for consistent API communication
- Optimistic updates disabled in favor of server-driven state

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Custom Vite middleware integration for development HMR
- Request/response logging middleware for API monitoring

**Storage Layer**
- In-memory storage implementation (`MemStorage`) for development
- Interface-based storage abstraction (`IStorage`) allowing easy migration to database
- Designed for PostgreSQL with Drizzle ORM (schema defined but not yet connected)

**API Design**
- RESTful API endpoints organized by resource:
  - `/api/portfolio` - Portfolio items and category filtering
  - `/api/team` - Team member information
  - `/api/services` - Service packages
  - `/api/bookings` - Booking submissions
- JSON request/response format
- Input validation using Zod schemas

**Database Schema (PostgreSQL via Drizzle)**
- `users` - User authentication (not yet implemented)
- `portfolio_items` - Portfolio work with categories and images
- `team_members` - Team profiles with social links
- `services` - Service packages with features and pricing
- `bookings` - Customer booking inquiries with status tracking

**Build & Development**
- Development: tsx for TypeScript execution with hot module replacement
- Production: Vite for frontend bundling, esbuild for server bundling
- Separate build outputs (frontend to `dist/public`, server to `dist`)

### External Dependencies

**Database & ORM**
- Neon Database serverless PostgreSQL driver (@neondatabase/serverless)
- Drizzle ORM for type-safe database queries and migrations
- Connection string via `DATABASE_URL` environment variable

**UI Libraries**
- Radix UI primitives for accessible component foundations (dialogs, dropdowns, forms, etc.)
- Tailwind CSS for utility-based styling
- Lucide React for icon system
- Embla Carousel for image galleries

**Form Management**
- React Hook Form for performant form state
- @hookform/resolvers for Zod schema integration
- Zod for runtime validation and TypeScript type inference

**Build Tools**
- Vite for frontend bundling and development server
- esbuild for fast server bundling
- PostCSS with Autoprefixer for CSS processing

**Development Tools (Replit-specific)**
- @replit/vite-plugin-runtime-error-modal for error overlays
- @replit/vite-plugin-cartographer for code navigation
- @replit/vite-plugin-dev-banner for development indicators

**Font System**
- Google Fonts integration (Poppins, Inter, Cairo for Arabic support)
- Multiple font families for display, body text, and Arabic content

**Key Architectural Decisions**

1. **Hybrid Storage Strategy**: Currently uses in-memory storage for rapid prototyping with a clear interface for database migration using Drizzle ORM and PostgreSQL.

2. **Monorepo Structure**: Shared schema definitions between client and server in `/shared` directory ensure type safety across the stack.

3. **Bilingual Support**: UI designed for Arabic-first content with English support, utilizing Arabic-compatible fonts (Cairo) and RTL-aware layouts.

4. **Component Organization**: Separation between page components (`/pages`), feature components (`/components`), and UI primitives (`/components/ui`).

5. **Image Management**: Portfolio images currently reference external URLs; no file upload system implemented.