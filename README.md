# LABAS E-Commerce Platform

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB.svg)
![Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933.svg)
![Deployment](https://img.shields.io/badge/Deployment-Vercel%20%7C%20Render-success.svg)

LABAS is a robust, full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). Engineered for scalability and performance, it features decoupled frontend and backend architectures, secure JWT-based authentication, an integrated image pipeline for asset management, and a comprehensive admin control panel.

## 🚀 System Architecture & Tech Stack

The platform is designed as a decoupled system where the client and API operate independently across different domains.

### Frontend (Client Application)
- **Framework:** React 18, bootstrapped with Vite for optimized HMR and bundling.
- **Styling:** Tailwind CSS for utility-first, responsive design.
- **State & Data Fetching:** React Context API & Axios.
- **Deployment Strategy:** Vercel (Configured with SPA fallback routing).

### Backend (RESTful API)
- **Runtime:** Node.js with Express.js framework.
- **Database:** MongoDB configured with Mongoose ODM.
- **Authentication:** Stateless JSON Web Tokens (JWT) stored in HTTP headers.
- **Asset Management:** ImageKit integration for optimized CDN image delivery.
- **Security:** Helmet, Express Rate Limit, and custom error handling middleware.
- **Deployment Strategy:** Render (Web Service).

---

## 📂 Repository Structure

The project is structured as a monorepo containing both the frontend client and the backend API service.

```text
labas-ecommerce/
├── backend/                # Node.js REST API
│   ├── config/             # Database & environment configurations
│   ├── controllers/        # Route logic and business rules
│   ├── middleware/         # Auth, validation, and error interceptors
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express router definitions
│   ├── utils/              # Helpers (Email, Token generation, ImageKit)
│   ├── API_DOCS.md         # Detailed API endpoint documentation
│   └── server.js           # Application entry point
│
└── frontend/               # React SPA
    ├── src/
    │   ├── assets/         # Static assets
    │   ├── components/     # Reusable UI components
    │   ├── context/        # Global state providers
    │   ├── pages/          # View-level components (Admin & Public)
    │   ├── utils/          # Axios instances and helper utilities
    │   └── App.jsx         # Root router configuration
    ├── vercel.json         # Vercel deployment configuration (SPA fallback)
    └── vite.config.js      # Vite bundler configuration
```

---

## 💻 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
- ImageKit Account (Required for product image uploads)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/labas
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=7d

# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com
FROM_NAME="LABAS"

# Client URL for CORS and Email links
CLIENT_URL=http://localhost:5173
```

Start the development server:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory. This dictates where the frontend routes its API calls:

```env
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```

Start the Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 📖 API Documentation

Comprehensive API documentation has been generated for this project, detailing all available endpoints, required authentication, request payloads, and response schemas.

Refer to the **[Backend API Documentation](./backend/API_DOCS.md)** or its **[LaTeX Equivalent](./backend/API_DOCS.tex)** for deep integration details.

---

## ⚙️ Key Engineering Decisions

1. **Decoupled Deployment Strategy:** The frontend and backend are architecturally separated. The Vite frontend is deployed on Vercel utilizing a `vercel.json` rewrite rule to manage React Router's SPA navigation, while the Node.js backend operates as an independent API service on Render.
2. **Environment-Driven Configuration:** All external communication (API base URLs, static asset paths) is abstracted into environment variables (`VITE_API_URL`, `VITE_BACKEND_URL`) to allow seamless transitions between local development and production environments without hardcoded values.
3. **Robust Security & RBAC:** Administrative routes are strictly guarded by role-based access control (RBAC) middleware verifying JWT claims, ensuring critical infrastructure (product management, order fulfillment) remains secure. Form data validation is enforced strictly via `express-validator`.
4. **Optimized Asset Pipeline:** To prevent heavy binary storage in the database or server filesystem, product image uploads are streamed directly to ImageKit, returning lightweight CDN URLs that are saved in MongoDB.

---
*Maintained by the LABAS Engineering Team.*
