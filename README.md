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
   \`\`\`bash
   git clone <repository-url>
   cd sports-event-dashboard
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   yarn install

# or

npm install

# or

pnpm install
\`\`\`

3. Run the development server:
   \`\`\`bash
   yarn dev

# or

npm run dev

# or

pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- \`yarn dev\` - Start development server
- \`yarn build\` - Build for production
- \`yarn start\` - Start production server
- \`yarn lint\` - Run ESLint and Prettier checks
- \`yarn lint:fix\` - Fix ESLint and Prettier issues
- \`yarn typecheck\` - Run TypeScript type checking
- \`yarn test\` - Run tests in watch mode
- \`yarn test:ci\` - Run tests in CI mode

## Project Structure

\`\`\`
sports-event-dashboard/
├── src/
│ ├── app/                           # Next.js App Router (route handlers)
│ │ ├── event/[id]/
│ │ │ └── page.tsx                   # Event detail RSC (async)
│ │ ├── favorites/
│ │ │ └── page.tsx                   # Favorites RSC (async)
│ │ ├── login/
│ │ │ └── page.tsx                   # Login RSC (async)
│ │ ├── register/
│ │ │ └── page.tsx                   # Register RSC (async)
│ │ ├── layout.tsx                   # Root layout (server)
│ │ ├── page.tsx                     # Home RSC (async)
│ │ ├── not-found.tsx                # 404 page
│ │ └── not-found.test.tsx           # Colocated tests
│ ├── features/                      # Feature-based organization
│ │ ├── events/
│ │ │ ├── components/
│ │ │ │ ├── EventsView.tsx           # Home page logic (client)
│ │ │ │ ├── EventDetailView.tsx      # Detail page logic (client)
│ │ │ │ ├── EventCard.tsx            # Event card component (client)
│ │ │ │ └── EventFilters.tsx         # Filter UI component (client)
│ │ │ ├── services/
│ │ │ │ └── sportsApi.ts             # API integration + React Query keys
│ │ │ └── store/
│ │ │   └── eventsStore.ts            # Zustand events state
│ │ ├── auth/
│ │ │ ├── components/
│ │ │ │ ├── LoginForm.tsx            # Login form component (client)
│ │ │ │ └── RegisterForm.tsx         # Register form component (client)
│ │ │ └── store/
│ │ │   └── authStore.ts             # Zustand auth state
│ │ ├── favorites/
│ │ │ └── components/
│ │ │   └── FavoritesView.tsx        # Favorites page logic (client)
│ │ └── shared/
│ │   ├── components/
│ │   │ ├── AppLayout.tsx            # Navigation + layout (client)
│ │   │ ├── Providers.tsx            # React Query + auth init (client)
│ │   │ └── LoadingSpinner.tsx       # Loading state component
│ │   ├── store/
│ │   │ └── themeStore.ts            # Theme state
│ │   └── ui/                        # shadcn/ui components
│ └── styles/                        # Global styles (Tailwind, fonts, theme)
├── __mocks__/                       # Shared mock data
├── public/                          # Static assets
├── jest.config.mjs                  # Jest testing configuration
├── tsconfig.json                    # TypeScript configuration (strict)
└── package.json
\`\`\`

## Architecture: Server & Client Components

### Page Components (src/app)

All page components use **async Server Components (RSC)** for:
- ✅ Server-side rendering (better SEO, faster initial load)
- ✅ Direct database access (when needed)
- ✅ Reduced JavaScript bundle size
- ✅ Cleaner routing logic (max ~10 lines per page)

Example: [page.tsx](src/app/page.tsx) imports and renders `<EventsView />` (client component)

\`\`\`tsx
import { EventsView } from '@/features/events/components/EventsView';

export default function HomePage() {
  return <EventsView />;
}
\`\`\`

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
- **Utilities**: `[verb][Entity]` (getUniqueSports, formatDate, parseISO)

## Design Principles

- **Server-First**: Use Server Components by default, client components only when needed (interactivity, state)
- **Feature-Based**: Organize code by feature/domain, not by layer (events, auth, favorites)
- **Separation of Concerns**: Page routing (RSC) → Business logic (client components) → State (stores) → Services (API)
- **Type Safety**: Full TypeScript coverage, strict mode enabled, no `any` types
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
- Smooth transitions between themes
- Theme preference persisted in localStorage

### Live Updates

- Events marked as "Live" update scores automatically
- Simulated using setInterval (10-second intervals)
- Demonstrates real-time update patterns

## API Integration

This project uses [TheSportsDB](https://www.thesportsdb.com/) free API for sports data. If the API is unavailable, the app falls back to comprehensive mock data to ensure functionality.

## Testing

Run tests with:
\`\`\`bash
yarn test
\`\`\`

Tests are written using Jest and React Testing Library and colocated next to the components or pages they cover using \`*.test.tsx\`.

## Code Quality

- **ESLint**: Configured with Next.js recommended rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking enabled
- **No \`any\` types**: Comprehensive type definitions throughout

Run checks:
\`\`\`bash
yarn lint # Check for issues
yarn lint:fix # Auto-fix issues
yarn typecheck # Type checking
\`\`\`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

Build the production bundle:
\`\`\`bash
yarn build
\`\`\`

Then start the production server:
\`\`\`bash
yarn start
\`\`\`

## Environment Variables

Create a \`.env.local\` file:
\`\`\`

# No environment variables required for basic functionality

# Optional: Add custom API keys if using different sports API

\`\`\`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for portfolio demonstration purposes.

## Author

Built with ❤️ using Next.js, TypeScript, and modern React practices.

---

**Note**: This is a portfolio project demonstrating modern web development practices. The authentication system is frontend-only and should not be used in production without a proper backend.
