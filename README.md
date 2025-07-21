# Trading Algo Frontend

A modern dashboard for managing and monitoring a Directional Option Selling trading strategy. Built with Next.js, React Query, and Tailwind CSS.

## Features

- **Broker Authentication**: Login and status for Zerodha and Upstox.
- **Strategy Dashboard**: Start/stop strategy, view and manage trades, see current position and config.
- **Trade Management**: View, delete, and exit trades with confirmation dialogs.
- **Config Management**: Edit strategy config in a modal dialog.
- **Force New Position**: Toggle for force new position flag.
- **Current Position**: View and update (BULL/BEAR/NONE) with instant feedback.
- **Live Logs**: Auto-refreshing, searchable, color-coded logs with auto-scroll.
- **Notifications**: Toasts for all actions and errors.
- **Robust API Integration**: All data is fetched and mutated via backend endpoints using React Query.

## Tech Stack

- [Next.js 14+](https://nextjs.org/) (App Router)
- [React 18+](https://react.dev/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript

## Getting Started

### Prerequisites
- Node.js 18+
- Backend API running (see below for endpoints)

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file if you need to override the backend URL:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## API Endpoints (Backend)

The frontend expects the following endpoints (see code for full details):
- `/auth/login-zerodha`, `/auth/login-upstox`, `/auth/profile-zerodha`, `/auth/profile-upstox`
- `/initialize-broker`
- `/directional-option-selling/start`, `/stop`, `/status`, `/current-trades`, `/delete-trade/{id}`, `/exit-trade/{id}`
- `/directional-option-selling/get-force-new-position`, `/set_force_new_position`
- `/directional-option-selling/get-current-position`, `/update-current-position`
- `/directional-option-selling/config` (GET/POST)
- `/directional-option-selling/logs`

## Project Structure

- `src/app/components/` — All React components (dashboard, dialogs, log display, etc.)
- `src/app/hooks/` — React Query hooks for API integration
- `src/app/utils/` — Types and config
- `public/` — Static assets

## Customization
- Tailwind CSS is used for all styling. You can easily adjust the look and feel in `globals.css` or component classes.
- All API endpoints are configured in `src/app/utils/config.ts`.

## Development Tips
- Use the TanStack Query Devtools (visible in dev mode) for debugging API state.
- All forms and actions have robust error handling and user feedback.
- Logs auto-refresh every 5 seconds and support search/filter.

## License

MIT
