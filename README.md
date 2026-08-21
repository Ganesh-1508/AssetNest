# AssetNest – Digital Property Management Solution

> **Secure. Organized. Smart.**

[![Status](https://img.shields.io/badge/Status-In%20Development-orange)](.)
[![Module](https://img.shields.io/badge/Module-3%20%E2%80%94%20Authentication-blue)](.)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

---

## 📖 Project Overview

**AssetNest** is a full-stack SaaS platform that empowers property owners to manage all aspects of their real estate portfolio in one secure, intelligent workspace. It combines document management, AI-powered verification and valuation, smart reminders, rent tracking, and investment insights — all behind a clean, modern dashboard.

---

## 🔴 Problem Statement

Property owners — especially in India — face fragmented, paper-heavy, and error-prone processes for managing their assets:

- **Scattered documents** across physical folders, email, and cloud storage
- **Missed renewals** — insurance, taxes, maintenance deadlines
- **No unified valuation** — hard to know what a property is worth right now
- **Complex rent tracking** — especially for multi-property landlords
- **Lack of AI assistance** for document verification or investment decisions

---

## ✅ Current Features (Modules 1-3)

- **User Registration** — Create a new account
- **User Login** — Authenticate securely
- **JWT Authentication** — HttpOnly cookie-based session management
- **Protected Routes** — Ensure backend and frontend require valid auth
- **Current User API** — Retrieve the authenticated profile
- **Logout** — Terminate session securely
- **Password Hashing** — Securely store passwords using bcrypt
- **MongoDB Atlas Integration** — Persistent cloud database
- **Property/User Database Models** — Structured Mongoose schemas
- **Existing AssetNest Dashboard** — Modern UI ready for features

---

## 🛠️ Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Lucide React
- React Router (Module 2+)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- jsonwebtoken

### DevOps
- Git
- GitHub
- concurrently (Run client + server simultaneously)

---

## 📁 Project Structure

```
PLM/
│
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Route-level page components (Auth, Dashboard)
│   │   ├── App.jsx             # Root app component (Auth state & Routing)
│   │   └── main.jsx            # Entry point
│   └── package.json
│
├── server/                     # Node.js + Express backend
│   ├── src/
│   │   ├── config/             # DB & app configuration
│   │   ├── controllers/        # Route handler logic (authController)
│   │   ├── middleware/         # Auth verification, error handling
│   │   ├── models/             # Mongoose schemas (User, Property, etc.)
│   │   ├── routes/             # Express route definitions
│   │   ├── app.js              # Express app factory
│   │   └── server.js           # HTTP server entry point
│   ├── .env.example            # Backend env template
│   └── package.json
│
└── README.md                   # This file
```

---

## 🚀 Installation and Setup

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Git**

### 1. Clone the repository
```bash
git clone https://github.com/Ganesh-1508/AssetNest.git
cd AssetNest
```

### 2. Install all dependencies
```bash
# Install root, client, and server dependencies
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 3. Configure environment variables
Create `.env` files based on the examples. **Never commit `.env` files with real secrets.**

```bash
# Server configuration
cp server/.env.example server/.env
```

Edit `server/.env` with your development values. 

### 4. Run the development servers
```bash
# Run BOTH client and server simultaneously from the root directory:
npm run dev
```

---

## 🔑 Environment Variables

Example for `server/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=assetnest
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🔗 Application URLs

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 🌐 API Endpoints

### Public Endpoints
- `GET /api/health` — Check if the backend is running
- `GET /api/health/db` — Check if MongoDB is connected
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Authenticate and receive a session cookie

### Protected Endpoints (Requires valid JWT Cookie)
- `GET /api/auth/me` — Get the currently logged-in user's profile
- `POST /api/auth/logout` — Clear the authentication cookie

---

## 📊 Current Development Status

- **Module 1: Complete** — Project Foundation & Dashboard UI
- **Module 2: Complete** — MongoDB Database & Models
- **Module 3: Complete** — Authentication System (JWT)
- **Module 4+: Not Started** — Document Vault, AI Tools, Reminders, etc.

---

## 📝 License

MIT © AssetNest Contributors
