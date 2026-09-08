# SewaPath 🇳🇵

> **Making government services easier to discover, understand, and navigate.**

SewaPath is a full-stack web application designed to help citizens discover and understand government services in Nepal from one place.

Instead of searching across different websites, documents, and government portals, users can explore services, understand eligibility requirements, view required documents, follow step-by-step procedures, and find the responsible government office.

The platform is designed with a **citizen-first approach**, with support for both **English and Nepali**.

---

## ✨ Why SewaPath?

Finding information about government services can be difficult when information is distributed across different sources and presented in complicated formats.

SewaPath focuses on simplifying that experience.

A citizen should be able to answer questions such as:

* What government service do I need?
* Am I eligible?
* What documents do I need?
* What steps do I have to follow?
* Which government office is responsible?
* Where is that office located?
* Can I save this service for later?

SewaPath brings these pieces together into a single service-discovery experience.

---

## 🚀 Core Features

### 🔎 Service Discovery

Discover government services through:

* Keyword search
* Category-based browsing
* Goal-based service discovery
* Popular services

The backend exposes dedicated service APIs for searching and discovering services.

### 📋 Service Details

Each service can provide:

* Service overview
* Eligibility requirements
* Required documents
* Step-by-step journey
* Responsible government office

This turns a government service from a simple information page into an actionable journey.

### ✅ Eligibility Checking

Users can answer service-specific eligibility questions and receive an eligibility result.

The backend provides a dedicated eligibility resource:

```text
/api/services/:id/eligibility
```

### 📄 Document Checklist

Users can see the documents required for a particular service.

```text
/api/services/:id/documents
```

This is intended to reduce uncertainty before visiting a government office.

### 🧭 Step-by-Step Service Journey

Services can contain structured journey steps that guide citizens through the process.

```text
/api/services/:id/journey
```

### 🏢 Government Office Directory

SewaPath connects services with responsible government offices and provides an office map using **Leaflet / React-Leaflet** and OpenStreetMap-based mapping.

### 🔐 Authentication

The application supports:

* User registration
* User login
* JWT-based authentication
* Password hashing with bcrypt
* Current-user retrieval
* Role-based authorization

The backend uses JWT, bcrypt, and authorization middleware to protect resources.

### ⭐ Saved Services

Authenticated citizens can bookmark services and access them from their dashboard.

```text
/api/saved-services
```

### 👤 Role-Based Access

SewaPath currently defines two primary roles:

| Role      | Capabilities                                                                                   |
| --------- | ---------------------------------------------------------------------------------------------- |
| `citizen` | Discover services, check eligibility, view requirements, save services, use personal dashboard |
| `admin`   | Manage services, categories, offices, eligibility rules, documents, and journey steps          |

### 🌐 English + Nepali

SewaPath is designed as a bilingual platform.

Content fields such as service titles, descriptions, questions, documents, and journey steps are stored as English/Nepali pairs.

The frontend also provides English and Nepali UI content and remembers the selected language using `localStorage`.

---

# 🏗️ Architecture

SewaPath follows a separated full-stack architecture:

```text
                         ┌──────────────────────┐
                         │      Citizen         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │   Vite + Tailwind    │
                         └──────────┬───────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │      Node.js         │
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
          ┌─────────────┐   ┌──────────────┐   ┌─────────────┐
          │   Routes    │   │ Controllers  │   │ Middleware  │
          └──────┬──────┘   └──────┬───────┘   └─────────────┘
                 │                 │
                 └────────┬────────┘
                          ▼
                   ┌──────────────┐
                   │   Mongoose   │
                   │    Models    │
                   └──────┬───────┘
                          │
                          ▼
                   ┌──────────────┐
                   │   MongoDB    │
                   └──────────────┘
```

The backend is organized around configuration, routes, controllers, middleware, models, seed data, and utilities.

This separation keeps HTTP routing, business operations, data models, and authorization responsibilities distinct.

---

# 🛠️ Tech Stack

## Frontend

| Technology    | Purpose                           |
| ------------- | --------------------------------- |
| React 18      | User interface                    |
| Vite          | Development server and build tool |
| React Router  | Client-side routing               |
| Tailwind CSS  | Styling                           |
| Leaflet       | Maps                              |
| React-Leaflet | React integration for maps        |
| Lucide React  | UI icons                          |

## Backend

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| Node.js            | Runtime                   |
| Express            | REST API                  |
| MongoDB            | Database                  |
| Mongoose           | MongoDB ODM               |
| JWT                | Authentication            |
| bcryptjs           | Password hashing          |
| Express Rate Limit | Request rate limiting     |
| Morgan             | HTTP request logging      |
| dotenv             | Environment configuration |
| CORS               | Cross-origin requests     |

---

# 📁 Project Structure

```text
SewaPath/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── category.controller.js
│   │   │   ├── document.controller.js
│   │   │   ├── eligibility.controller.js
│   │   │   ├── journey.controller.js
│   │   │   ├── office.controller.js
│   │   │   ├── savedService.controller.js
│   │   │   └── service.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── authorize.middleware.js
│   │   │   └── error.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── bilingual.schema.js
│   │   │   ├── category.model.js
│   │   │   ├── documentRequirement.model.js
│   │   │   ├── eligibilityQuestion.model.js
│   │   │   ├── journeyStep.model.js
│   │   │   ├── office.model.js
│   │   │   ├── savedService.model.js
│   │   │   ├── service.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── category.routes.js
│   │   │   ├── document.routes.js
│   │   │   ├── eligibility.routes.js
│   │   │   ├── journey.routes.js
│   │   │   ├── office.routes.js
│   │   │   ├── savedService.routes.js
│   │   │   ├── service.routes.js
│   │   │   └── index.js
│   │   │
│   │   ├── seed/
│   │   │   └── seed.js
│   │   │
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── constants.js
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── i18n/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ServiceDetail.jsx
│   │   │   └── Services.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

The structure reflects the actual repository organization rather than a generic MERN template.

---

# 🔌 API Overview

The backend exposes REST resources organized around the application's domain.

| Resource                        | Purpose                                        |
| ------------------------------- | ---------------------------------------------- |
| `/api/auth`                     | Registration, login, current user              |
| `/api/categories`               | Government service categories                  |
| `/api/services`                 | Service discovery and service details          |
| `/api/services/:id/eligibility` | Eligibility questions and eligibility checking |
| `/api/services/:id/documents`   | Required documents                             |
| `/api/services/:id/journey`     | Service journey steps                          |
| `/api/offices`                  | Government office directory                    |
| `/api/saved-services`           | Citizen bookmarks                              |

The API is consumed by frontend API wrappers located under:

```text
frontend/src/api/
```

---

# 🔄 Typical User Journey

```text
Discover a service
        │
        ▼
Search / Browse categories
        │
        ▼
Open service details
        │
        ▼
Check eligibility
        │
        ▼
Review required documents
        │
        ▼
Follow service journey
        │
        ▼
Find responsible office
        │
        ▼
Save service for later
```

This is the central product flow of SewaPath.

---

# 🗄️ Data Model

SewaPath uses MongoDB with Mongoose.

The backend currently separates major domain concepts into individual models:

```text
User
 │
 └── Saved Services
        │
        ▼
     Service
     ├── Category
     ├── Eligibility Questions
     ├── Required Documents
     ├── Journey Steps
     └── Responsible Office
```

The repository contains dedicated Mongoose models for users, services, categories, offices, saved services, eligibility questions, document requirements, and journey steps.

A reusable bilingual schema supports English and Nepali content across the service domain.

---

# 🌐 Internationalization

SewaPath treats bilingual support as part of the data model, not simply as a frontend translation layer.

For example, service content can conceptually be represented as:

```json
{
  "name": {
    "en": "Birth Registration",
    "ne": "जन्म दर्ता"
  }
}
```

This allows the same backend API to serve both English and Nepali clients.

The frontend contains dedicated internationalization resources and a language context for managing the selected language.

---

# 🔐 Security

The backend includes several security-related mechanisms:

* JWT authentication
* bcrypt password hashing
* Role-based authorization
* CORS configuration
* Request rate limiting
* Centralized error middleware
* Environment-based secret configuration

The middleware layer contains dedicated authentication, authorization, and error-handling modules.

### Important

Never commit real environment variables, database credentials, or JWT secrets to Git.

Use the provided `.env.example` files as templates.

---

# ⚙️ Local Development

## Prerequisites

Make sure you have:

* Node.js
* npm
* MongoDB or a MongoDB Atlas database
* Git

---

## 1. Clone the repository

```bash
git clone https://github.com/bipesh369/SewaPath.git
cd SewaPath
```

---

## 2. Start the backend

```bash
cd backend
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Configure:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d

CLIENT_ORIGIN=http://localhost:5173
```

These variables correspond to the current backend environment configuration.

---

## 3. Seed the database

SewaPath includes a seed script for loading the initial service catalog, categories, offices, and related data.

Run:

```bash
npm run seed
```

The backend README documents the seed command as loading the initial launch catalog.

---

## 4. Start the backend

For development:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

For a normal start:

```bash
npm start
```

The available scripts are defined in the backend package configuration.

---

# 💻 Start the Frontend

Open another terminal:

```bash
cd SewaPath/frontend
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Set:

```env
VITE_API_URL=http://localhost:5000/api
```

The frontend currently uses `VITE_API_URL` to connect to the backend API.

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

# 🧪 Production Build

Build the frontend:

```bash
cd frontend
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The frontend package also includes an ESLint command:

```bash
npm run lint
```

---

# 📦 Deployment Architecture

SewaPath is structured so that the frontend, backend, and database can be deployed independently.

```text
                       Internet
                          │
                          ▼
                ┌──────────────────┐
                │ React Frontend   │
                │      Vercel      │
                └────────┬─────────┘
                         │
                         │ HTTPS / REST API
                         ▼
                ┌──────────────────┐
                │ Node + Express   │
                │     Render       │
                └────────┬─────────┘
                         │
                         │ Mongoose
                         ▼
                ┌──────────────────┐
                │     MongoDB      │
                │      Atlas       │
                └──────────────────┘
```

For deployment, make sure:

1. The backend has the production MongoDB connection string.
2. `JWT_SECRET` is configured securely.
3. `CLIENT_ORIGIN` points to the deployed frontend.
4. The frontend `VITE_API_URL` points to the deployed backend API.
5. Secrets are configured through the hosting provider's environment variables.
6. The MongoDB Atlas network access configuration allows the deployed backend to connect.

---

# 🧑‍💻 Development Philosophy

SewaPath is being built around a practical principle:

> **Learn backend engineering by building a real product.**

The project intentionally separates responsibilities across layers:

```text
Route
  ↓
Controller
  ↓
Model
  ↓
Database
```

while middleware handles cross-cutting concerns such as:

```text
Authentication
Authorization
Error Handling
Rate Limiting
```

This structure makes the project useful not only as an application, but also as a practical backend engineering learning project.

---

# 🗺️ Roadmap

Potential areas for future development include:

* [ ] Expand the government service catalog
* [ ] Improve service search and ranking
* [ ] Add more sophisticated goal-based discovery
* [ ] Add service information verification workflows
* [ ] Improve admin content management
* [ ] Add richer office/location information
* [ ] Improve accessibility
* [ ] Add automated backend tests
* [ ] Add frontend tests
* [ ] Add API documentation with OpenAPI/Swagger
* [ ] Add CI/CD workflows
* [ ] Add monitoring and production logging
* [ ] Improve caching and API performance
* [ ] Add pagination for larger datasets
* [ ] Add service feedback/reporting
* [ ] Expand Nepali localization
* [ ] Add more government service categories

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### 1. Fork the repository

```bash
git fork https://github.com/bipesh369/SewaPath
```

Or fork it directly through GitHub.

### 2. Clone your fork

```bash
git clone <your-fork-url>
cd SewaPath
```

### 3. Create a feature branch

```bash
git checkout -b feature/your-feature
```

### 4. Make your changes

Keep changes focused and follow the existing project structure.

### 5. Commit your changes

```bash
git add .
git commit -m "feat: add your feature"
```

### 6. Push your branch

```bash
git push origin feature/your-feature
```

### 7. Open a Pull Request

Explain:

* What you changed
* Why you changed it
* How you tested it
* Any limitations or follow-up work

---

# 📌 Project Status

SewaPath is an actively developed project.

The current repository contains the core full-stack architecture, authentication, service discovery, eligibility flow, document requirements, service journeys, office directory, saved services, bilingual content, and admin functionality.

The project should be considered a **work in progress** rather than a finished production platform.

---

# 📄 License

A project license is not currently documented at the repository root.

Add an appropriate `LICENSE` file before presenting SewaPath as an open-source project with explicit reuse permissions.

---

# 👨‍💻 Author

**Bipesh Junior**

Frontend Developer | Full-Stack Learner

Building SewaPath as a practical project to learn and apply real-world software engineering concepts.

* GitHub: [@bipesh369](https://github.com/bipesh369)
* LinkedIn: [Bipesh Junior](https://www.linkedin.com/in/bipeshjunior10)

---

## ⭐ Support the Project

If you find SewaPath interesting or useful, consider giving the repository a ⭐ on GitHub.

It helps the project gain visibility and motivates continued development.

---

<p align="center">
  Built By Bipesh Junior Tharu
</p>
