# Sports Event Dashboard

A full-featured web dashboard for sports events and results, built with Next.js 15, TypeScript, Tailwind CSS, and Zustand. This project demonstrates modern React development practices and integrates with TheSportsDB API for real sports data.

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

- **Framework**: Next.js 15+ (App Router) with React Compiler ⚡
- **Language**: TypeScript 5.7+ (comprehensive type definitions)
- **Styling**: Tailwind CSS 3.4+
- **State Management**: Zustand 5+
- **API**: TheSportsDB (free sports API) with mock data fallback
- **Testing**: Jest 30.2.0 + React Testing Library 16+
- **Code Quality**: ESLint 9+ + Prettier 3.4+

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
├── app/ # Next.js App Router
│ ├── event/[id]/ # Event detail page
│ ├── favorites/ # Favorites page
│ ├── login/ # Login page
│ ├── register/ # Register page
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page
│ └── not-found.tsx # 404 page
├── src/
│ ├── components/ # Reusable components
│ │ ├── ui/ # shadcn/ui components
│ │ ├── AppLayout.tsx # Main layout wrapper
│ │ ├── EventCard.tsx # Event card component
│ │ ├── EventFilters.tsx
│ │ └── Providers.tsx # Context providers
│ ├── stores/ # Zustand stores
│ │ ├── authStore.ts
│ │ ├── eventStore.ts
│ │ └── themeStore.ts
│ ├── services/ # API services
│ │ └── sportsApi.ts
│ └── styles/ # Global styles
├── **tests**/ # Test files
├── public/ # Static assets
└── package.json
\`\`\`

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

Tests are written using Jest and React Testing Library. Example test files are in the \`**tests**\` directory.

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
