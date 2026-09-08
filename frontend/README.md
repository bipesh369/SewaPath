# SewaPath Frontend

Citizen-facing web app for SewaPath, built with React, Vite, and Tailwind CSS,
following the SewaPath project proposal (E-Governance Laboratory, Tribhuvan University).

## Stack
- React 18 + Vite
- React Router
- Tailwind CSS
- Leaflet / React-Leaflet (office map)

## Getting started

```bash
npm install
cp .env.example .env     # point VITE_API_URL at your backend
npm run dev                # http://localhost:5173
```

Run the backend and its `npm run seed` first so there is data to browse.

## Structure

```
src/
  api/            fetch wrappers for every backend resource
  components/     shared UI (Header, ServiceCard, StepPath, OfficeMap, ui/*)
  context/        AuthContext (JWT session)
  i18n/           English/Nepali UI copy + LanguageContext
  pages/          Home, Services, ServiceDetail, Login, Register, Dashboard
  pages/admin/    Admin dashboard: services, categories, offices
```

## Key flows

- **Home** — "describe your goal" search, category shortcuts, popular services.
- **Services** — keyword search + category filter across the launch catalog.
- **Service detail** — tabs for overview, eligibility check, document checklist,
  step-by-step journey, and the responsible office (with an OpenStreetMap map).
- **Dashboard** — a citizen's saved/bookmarked services.
- **Admin** — manage categories, offices, and services, including each
  service's eligibility questions, documents, and journey steps.

## Language

The whole UI ships in English and Nepali (`IBM Plex Sans` / `IBM Plex Sans
Devanagari`). Use the language toggle in the header; the choice is remembered
in `localStorage` and synced to the account once signed in.
