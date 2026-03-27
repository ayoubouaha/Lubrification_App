Graissage et Lubrification

Points de graissage manuel des grues

## Overview
This project is a Vite + React + TypeScript frontend for the App Marsa UI.
It renders interactive crane diagrams with lubrication points, supports system navigation,
and integrates with a Spring Boot backend to fetch the latest lubrication data.

## Workspace Layout
- Frontend (this folder): React/Vite UI
- Backend: `../Backend` (Spring Boot API)

## Key Features
- Interactive diagrams with markers and popups
- Navigation between crane systems and sub-items
- Live data fetch for lubrication points via REST API
- Responsive layout and zoomable diagrams

## Requirements
- Node.js 18+ (recommended)
- npm 9+

## Environment
The backend uses a local `.env` file (see `../Backend/.env`) for database credentials.
The frontend reads API base URL from `VITE_API_BASE_URL` (optional).

## Install
```bash
npm install
```

## Development
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Preview
```bash
npm run preview
```

## Common Pages
- Dashboard: list of cranes and access buttons
- Crane overview: ARDELT/TUKAN system entry points
- System pages: translation, rotation, relevage, levage, poulies
- Drive groups sub-items: detailed views per system