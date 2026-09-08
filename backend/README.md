# SewaPath Backend

REST API for SewaPath, a citizen-first government service navigation platform for Nepal.
Built with Node.js, Express, and MongoDB, following the SewaPath project proposal
(E-Governance Laboratory, Tribhuvan University).

## Stack
- Node.js + Express (REST API)
- MongoDB + Mongoose
- JWT auth, bcrypt password hashing, role-based access control

## Getting started

```bash
npm install
cp .env.example .env      # fill in MONGO_URI and JWT_SECRET
npm run seed               # loads the 12 launch services, categories & offices
npm run dev                 # starts on http://localhost:5000
```

## Folder structure

```
src/
  config/db.js          MongoDB connection
  models/                Mongoose schemas (bilingual en/ne fields)
  controllers/           Route handlers
  routes/                Express routers
  middleware/             auth, role guard, error handler
  utils/                  small shared helpers
  seed/                   seed script + launch-catalog data
```

## Core resources

| Resource | Purpose |
|---|---|
| `/api/auth` | register / login / current user |
| `/api/categories` | service categories for browsing |
| `/api/services` | search, goal-based discovery, service detail |
| `/api/services/:id/eligibility` | eligibility questions + eligibility check |
| `/api/services/:id/documents` | required-document checklist |
| `/api/services/:id/journey` | step-by-step journey |
| `/api/offices` | responsible-office directory |
| `/api/saved-services` | a citizen's bookmarked services |

All content fields (titles, descriptions, questions, steps, documents) are stored as
`{ en, ne }` pairs so the same API serves both the English and Nepali UI.

## Roles

- `citizen` – search, check eligibility, save services, personal dashboard
- `admin` – manage categories, services, eligibility rules, documents, journeys, offices
