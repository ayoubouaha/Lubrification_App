Graissage et Lubrification

Points de graissage manuel des grues

## Overview
This repository contains a full-stack application:
- Frontend: React + Vite (UI for crane diagrams and lubrication points)
- Backend: Spring Boot (API for latest lubrication data)

## Repository Structure
- frontend/App_Marsa: Frontend application
- Backend: Spring Boot API

## Key Features
- Interactive crane diagrams with markers and popups
- Navigation across crane systems and sub-items
- Latest lubrication data fetched from the backend API
- Responsive layout and zoomable diagrams

## Requirements
- Node.js 18+ and npm 9+ (frontend)
- Java 17+ and Maven (backend)



## Frontend
```bash
cd frontend/App_Marsa
npm install
npm run dev
```

## Backend
```bash
cd Backend
mvn spring-boot:run
```

## Build
```bash
cd frontend/App_Marsa
npm run build

cd ../../Backend
mvn -DskipTests clean package
```

## Common Pages
- Dashboard: list of cranes
- Crane overview: ARDELT/TUKAN entry points
- System pages: translation, rotation, relevage, levage, poulies
- Drive-groups sub-items for detailed views
