# Sports Events Dashboard

A demo web dashboard for sports events and results, built with Next.js v16, TypeScript v5, Tailwind CSS v4, and Zustand v5. This project demonstrates modern React development practices and integrates with TheSportsDB API for real sports data.

## Features

- ✨ **Event Listing & Filtering**: Browse sports events with filters by sport, league and date
- 🔍 **Search**: Search events by teams or event names
- 📊 **Event Detail Pages**: View detailed match information
- ❤️ **Favorites/Watchlist**: Save events to your favorites with localStorage persistence
- 🔄 **Live Updates**: Automatic 30-second background data refresh
- 🌓 **Dark/Light Theme**: Toggle between themes with system preference detection
- 🔐 **Mock Authentication**: Frontend-only authentication for demonstration
- 📱 **Responsive Design**: Works on all screen sizes

## Tech Stack

- **Framework**: Next.js v16 (App Router) with React Compiler ⚡
- **Language**: TypeScript v5
- **Styling**: Tailwind CSS v4 with `@theme inline` (CSS-based config)
- **State Management**: Zustand v5 + TanStack Query v5
- **API**: TheSportsDB v1 (free tier)
- **Testing**: Jest v30 + React Testing Library v16
- **Code Quality**: ESLint v9 + Prettier v3

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn 1.x

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd sports-events-dashboard
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Run the development server:

   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint and Prettier checks
- `yarn lint:fix` - Fix ESLint and Prettier issues
- `yarn typecheck` - Run TypeScript type checking
- `yarn test` - Run all tests once
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report
- `yarn test:ci` - Run tests in CI mode

## Project Structure

```
src/
├── app/                    # Next.js App Router (pages)
│   ├── event/[id]/
│   ├── favorites/
│   ├── login/ & register/
│   └── layout.tsx
├── features/               # Feature-based organization
│   ├── events/
│   ├── auth/
│   └── favorites/
├── store/                  # Zustand state management
│   ├── eventsStore.ts
│   ├── authStore.ts
│   └── themeStore.ts
├── components/             # Reusable UI components
│   ├── AppLayout/
│   └── ui/
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
├── types/                  # TypeScript type definitions
└── styles/                 # Global styles
```

## Architecture: Server & Client Components

### Page Components (src/app)

All page components use **async Server Components (RSC)** for:

- ✅ Server-side rendering
- ✅ Reduced JavaScript bundle size
- ✅ Cleaner routing logic

### Feature Components (src/features)

Business logic is extracted into **client components** (`'use client'`) organized by feature:

- **EventsView** - Home page: fetches events, manages filters
- **EventDetailView** - Detail page: displays detailed match info
- **FavoritesView** - Favorites page: filters events from favorites array
- **LoginForm** - Login form: validation and authentication
- **RegisterForm** - Register form: multi-field validation

### Consistent Naming

- **Components**: `[Feature]View.tsx` (containers with logic) or `[Feature]Form.tsx` (forms)
- **Stores**: `[feature]Store.ts` (Zustand state management)
- **Services**: `[feature]Api.ts` (API integration, React Query keys)
- **Hooks**: `use[Feature|Entity]` (custom React hooks)
- **Event Handlers**: `handle[Action]` (form submissions, clicks)
- **Utilities**: `[verb][Entity]` (getUniqueSports, formatDate)

## Design Principles

- **Server-First**: Use Server Components by default, client components only when needed (interactivity, state)
- **Feature-Based**: Organize code by feature/domain, not by layer (events, auth, favorites)
- **Separation of Concerns**: Page routing (RSC) → Business logic (client components) → State (stores) → Services (API)
- **Type Safety**: Full TypeScript coverage, strict mode enabled
- **Consistency**: Arrow functions, consistent naming conventions, same patterns across features
- **Performance**: Minimal JavaScript, optimized bundle size, server-side rendering when possible

## Features Walkthrough

### Event Browsing

- View all upcoming sports events on the home page
- Filter by sport (Soccer, Basketball, Baseball, etc.)
- Filter by league
- Search by team or event name

### Event Details

- Click on any event to view detailed information
- Add/remove events from favorites

### Authentication (Demo)

- Mock login/register system
- Data stored in localStorage
- No backend required - purely frontend demonstration

### Theme Support

- Light and dark themes
- Automatically detects system preference
- Theme preference persisted in localStorage

### Live Updates

- Real-time event status tracking (quarters, innings, halves, finished, etc.)
- Automatic 30-second background refetch keeps data current
- Seamless updates without loading spinners

## API Integration

This project uses [TheSportsDB](https://www.thesportsdb.com/) free API for sports data.

**Data Fetching Strategy** (TanStack Query):

- **Stale Time**: 5 minutes - cached data reused during navigation
- **Refetch Interval**: 30 seconds - automatic background updates for live scores
- **UTC Timezone**: All times displayed in UTC as provided by the API

This balances fast navigation with live data updates while minimizing API calls.

## Testing

Run tests with:

```bash
yarn test
```

Tests are written using Jest and React Testing Library and colocated next to the files they cover using `*.test.tsx`.

Current test focus:

- Zustand stores (`src/store`)
- Event parsing and API utility logic (`src/features/events/utils`, `src/utils`)
- Event service layer (`src/features/events/services`)
- Core auth and filter UI flows (`src/features/auth`, `src/features/events/components/EventFilters`, `src/components`)
- App Router page smoke tests (`src/app`)

Mocking strategy:

- Unit tests primarily use manual Jest mocks for module boundaries.
- Component tests use React Testing Library + `@testing-library/user-event` for user-driven behavior.

## Code Quality

- **ESLint**: Configured with Next.js recommended rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking enabled

Run checks:

```bash
yarn lint # Check for issues
yarn lint:fix # Auto-fix issues
yarn typecheck # Type checking
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Keep framework preset as **Next.js** and use defaults:
   - Install command: `yarn install`
   - Build command: `yarn build`
4. (Optional) Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SPORTS_API_KEY`
   - `NEXT_PUBLIC_SPORTS_API_BASE_URL`
5. Deploy production from `main` and use generated `*.vercel.app` URL for demo sharing.

### GitHub Publish Checklist

1. Create a GitHub repository.
2. Ensure `.env.local` is not committed.
3. Run quality checks locally before pushing:

   ```bash
   yarn lint
   yarn typecheck
   yarn test
   yarn build
   ```

4. Push the default branch (`main`) and verify GitHub Actions CI passes.

### Other Platforms

Build the production bundle:

```bash
yarn build
```

Then start the production server:

```bash
yarn start
```

## Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SPORTS_API_KEY=123
NEXT_PUBLIC_SPORTS_API_BASE_URL=https://www.thesportsdb.com/api/v1/json
```

These variables are optional for a demo build because the app includes the same public defaults in code.

## Demo Notes

- Authentication is intentionally mock/demo-only and runs in `localStorage`.
- Sports data is fetched from TheSportsDB free tier and may vary by API availability.

## Browser Support

Chrome, Firefox, Safari, Edge (latest as of Feb-2026)

## License

This project is for demonstration purposes.

## Author

**Alex Cocemasov**

- **GitHub**: [github.com/akocemasov](https://github.com/akocemasov)
- **Email**: [a.cocemasov@gmail.com](mailto:a.cocemasov@gmail.com)
