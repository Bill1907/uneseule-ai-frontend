# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

This is a Next.js 15 application using the App Router with internationalization (i18n) support. The project integrates Clerk for authentication and Supabase for database operations using a custom token-based approach.

### Key Technical Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Authentication**: Clerk with custom Supabase integration
- **Database**: Supabase with TypeScript types
- **Styling**: Tailwind CSS 4 with Radix UI components
- **Voice**: ElevenLabs integration via Edge Functions
- **Languages**: Korean (default), English, Spanish

### Folder Structure
- `app/[locale]/` - Internationalized pages with locale-based routing
- `actions/` - Server actions for data operations (onboarding, lessons)
- `components/` - Reusable UI components with shadcn/ui
- `lib/` - Core utilities (Supabase clients, translations, database types)
- `hooks/` - Custom React hooks
- `types/` - TypeScript type definitions
- `supabase/functions/` - Edge Functions for external integrations

### Authentication & Database Integration

The project uses a unique Clerk-Supabase integration pattern where Clerk tokens are passed to Supabase for RLS policies:

- **Client-side**: Use `useSupabaseClient()` hook for authenticated requests
- **Server-side**: Use `getSupabaseServerClient()` for server components
- **RLS**: Supabase policies validate Clerk JWT tokens via `auth.jwt() ->> 'sub'`

### Internationalization

- Locale-based routing: `/[locale]/...` (ko, en, es)
- Translation files in `messages/` directory
- Custom translation utilities in `lib/translations.ts`
- Language toggle component with window-based navigation

### Key Components

- **Layout**: Locale-aware layout with Clerk authentication UI
- **Voice Agent**: ElevenLabs WebRTC integration for voice interactions
- **Theme Provider**: Dark/light mode support with next-themes
- **Sidebar Navigation**: Product service navigation

### Middleware

Custom middleware handles:
- Locale validation and routing
- Protected route authentication (`/[locale]/service/product/*`)
- Automatic redirects to auth pages for unauthenticated users

### Supabase Configuration

- Local development on port 54321-54324
- Edge Functions for ElevenLabs integration
- JWT expiry: 1 hour
- Email auth enabled, SMS disabled
- Studio available on port 54323

### Environment Requirements

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Clerk configuration variables
- ElevenLabs API keys (for Edge Functions)

### TypeScript Configuration

- Strict mode enabled
- Custom path mapping: `@/*` points to root
- Excludes Supabase functions from compilation
- ESLint and TypeScript errors fail builds (production-ready)