# Sports Event Dashboard

A full-featured web dashboard for sports events and results, built with Next.js 16.1, TypeScript 5.9, Tailwind CSS 4.1, and Zustand 5.0. This project demonstrates modern React development practices and integrates with TheSportsDB API for real sports data.

## Features

- ✨ **Event Listing & Filtering**: Browse upcoming sports events with filters by sport, league, and date
- 🔍 **Search & Sort**: Search events by teams or event names, sort by time, popularity, or odds
- 📊 **Event Detail Pages**: View detailed match information, team statistics, and odds comparison
- ❤️ **Favorites/Watchlist**: Save events to your favorites with localStorage persistence
- 🌓 **Dark/Light Theme**: Toggle between light and dark themes with system preference detection
- 🔐 **Mock Authentication**: Frontend-only authentication system for portfolio demonstration
- ⚡ **Simulated Live Updates**: Real-time event updates using setInterval polling (simulates WebSocket)
- 📱 **Responsive Design**: Mobile-first design that works on all screen sizes

## Tech Stack

- **Framework**: Next.js 16.1 (App Router) with React Compiler ⚡
- **Language**: TypeScript 5.9 (comprehensive type definitions)
- **Styling**: Tailwind CSS 4.1
- **State Management**: Zustand 5.0
- **API**: TheSportsDB (free sports API) with mock data fallback
- **Testing**: Jest 30.2 + React Testing Library 16.3
- **Code Quality**: ESLint 9.39 + Prettier 3.8

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd sports-event-dashboard
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
- `yarn test` - Run tests in watch mode
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

- ✅ Server-side rendering (better SEO, faster initial load)
- ✅ Reduced JavaScript bundle size
- ✅ Cleaner routing logic (max ~10 lines per page)

### Feature Components (src/features)

Business logic is extracted into **client components** (`'use client'`) organized by feature:

- **EventsView** - Home page: fetches events, manages filters, live score updates
- **EventDetailView** - Detail page: displays match info, odds, team statistics
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
- Sort by time, popularity, or odds

### Event Details

- Click on any event to view detailed information
- See team statistics and head-to-head comparison
- View betting odds (mock data for demonstration)
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

- Events marked as "Live" update scores automatically
- Simulated using setInterval (10-second intervals)
- Demonstrates real-time update patterns

## API Integration

This project uses [TheSportsDB](https://www.thesportsdb.com/) free API for sports data. If the API is unavailable, the app falls back to comprehensive mock data to ensure functionality.

## Testing

Run tests with:

```bash
yarn test
```

Tests are written using Jest and React Testing Library and colocated next to the components or pages they cover using `*.test.tsx`.

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

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

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

```

# No environment variables required for basic functionality

```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for portfolio demonstration purposes.

## Author

**Alex Cocemasov**

- **GitHub**: [github.com/akocemasov](https://github.com/akocemasov)
- **Email**: [a.cocemasov@gmail.com](mailto:a.cocemasov@gmail.com)
