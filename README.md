# AssetNest

> **Digital Property Management Solution** — Secure. Organized. Smart.

[![Status](https://img.shields.io/badge/Status-In%20Development-orange)](.)
[![Module](https://img.shields.io/badge/Module-1%20%E2%80%94%20Foundation-blue)](.)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

---

## 📖 Project Overview

**AssetNest** is a full-stack SaaS platform that empowers property owners to manage all aspects of their real estate portfolio in one secure, intelligent workspace. It combines document management, AI-powered verification and valuation, smart reminders, rent tracking, and investment insights — all behind a clean, modern dashboard.

> ⚠️ **This project is being developed incrementally, module by module.**  
> Only the project foundation (Module 1) has been implemented at this stage.

---

## 🔴 Problem Statement

Property owners — especially in India — face fragmented, paper-heavy, and error-prone processes for managing their assets:

- **Scattered documents** across physical folders, email, and cloud storage
- **Missed renewals** — insurance, taxes, maintenance deadlines
- **No unified valuation** — hard to know what a property is worth right now
- **Complex rent tracking** — especially for multi-property landlords
- **Lack of AI assistance** for document verification or investment decisions

---

## ✅ Proposed Solution

AssetNest consolidates every property management task into a single, AI-augmented platform:

| Problem | AssetNest Solution |
|---|---|
| Scattered docs | Secure Document Vault with OCR indexing |
| Missed deadlines | Smart Reminders with email/SMS alerts |
| Unknown valuation | AI Property Valuation (ML-based) |
| Fake documents | AI Document Verification |
| Tedious Q&A | AI Property Assistant (LLM chat) |
| Investment blindness | ROI & Insights Reports |

---

## 🌟 Core Features

- 🏠 **Property Dashboard** — Overview of all owned/leased properties with valuations
- 📄 **Document Vault** — Upload, categorize, and search property documents
- 🤖 **AI Document Verification** — Detect forgery, missing fields, risk score
- 📈 **AI Property Valuation** — Market-rate ML predictions
- 💬 **AI Assistant** — Chat with your property data
- 🔔 **Smart Reminders** — Tax, insurance, maintenance deadlines
- 💰 **Rent Management** — Track tenants, payments, agreements
- 🛡️ **Insurance Tracker** — Policy expiry & renewal alerts
- 📊 **Reports & Insights** — ROI, yield, appreciation trends
- 🕐 **Ownership History** — Complete chain-of-title records

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js + Vite | UI framework + fast dev server |
| Tailwind CSS v3 | Utility-first styling |
| Lucide React | Icon system |
| React Router | Client-side routing (Module 2+) |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API |
| MongoDB Atlas | Document database (Module 2+) |
| Mongoose | ODM (Module 2+) |
| JWT + bcrypt | Authentication (Module 3+) |
| Cloudinary | File/document storage (Module 4+) |
| Nodemailer | Email notifications (Module 5+) |

### AI / ML (Future Modules)
| Technology | Purpose |
|---|---|
| OCR (Tesseract/Cloud) | Document text extraction |
| LLM API (OpenAI/Gemini) | AI Assistant + verification |
| Python ML service | Property valuation |

### DevOps
| Technology | Purpose |
|---|---|
| Git + GitHub | Version control |
| concurrently | Run client + server simultaneously |

---

## 📊 Current Development Status

| Module | Name | Status |
|---|---|---|
| **Module 1** | Project Foundation | ✅ **Complete** |
| Module 2 | Database & Models | 🔜 Pending |
| Module 3 | Authentication (JWT) | 🔜 Pending |
| Module 4 | Document Upload & Vault | 🔜 Pending |
| Module 5 | AI Document Verification | 🔜 Pending |
| Module 6 | Property Valuation (ML) | 🔜 Pending |
| Module 7 | Smart Reminders | 🔜 Pending |
| Module 8 | Rent & Tenant Management | 🔜 Pending |
| Module 9 | Reports & Analytics | 🔜 Pending |
| Module 10 | Deployment & CI/CD | 🔜 Pending |

---

## 📁 Project Structure

```
PLM/
│
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── assets/             # Images, icons, static files
│   │   ├── components/         # Reusable UI components
│   │   ├── layouts/            # Page layout wrappers
│   │   ├── pages/              # Route-level page components
│   │   ├── routes/             # React Router config
│   │   ├── services/           # API call functions (axios)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Helper utilities
│   │   ├── App.jsx             # Root app component
│   │   └── main.jsx            # Entry point
│   ├── public/                 # Static public assets
│   ├── .env.example            # Frontend env template
│   ├── vite.config.js          # Vite + proxy config
│   └── tailwind.config.js      # Tailwind brand config
│
├── server/                     # Node.js + Express backend
│   ├── src/
│   │   ├── config/             # DB & app configuration
│   │   ├── controllers/        # Route handler logic
│   │   ├── middleware/         # Auth, error, validation
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # Express route definitions
│   │   ├── services/           # Business logic layer
│   │   ├── utils/              # Server-side utilities
│   │   ├── app.js              # Express app factory
│   │   └── server.js           # HTTP server entry point
│   ├── .env.example            # Backend env template
│   └── package.json
│
├── docs/                       # Architecture & API docs
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
└── package.json                # Root scripts (concurrently)
```

---

## 🚀 Local Setup Instructions

### Prerequisites
- **Node.js** ≥ 18.x — [nodejs.org](https://nodejs.org)
- **npm** ≥ 9.x
- **Git**

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/assetnest.git
cd assetnest
```

### 2. Install all dependencies
```bash
# From the root directory:
npm install                   # installs concurrently
npm run install:all           # installs client + server deps
```

### 3. Configure environment variables
```bash
# Server
cp server/.env.example server/.env
# Edit server/.env and fill in your values

# Client
cp client/.env.example client/.env
# Edit client/.env if needed
```

### 4. Run the development servers
```bash
# Run BOTH client and server simultaneously (recommended):
npm run dev

# Or run individually:
npm run client    # Vite dev server on http://localhost:5173
npm run server    # Express API on http://localhost:5000
```

### 5. Verify
- Frontend: [http://localhost:5173](http://localhost:5173)
- Health:   [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔑 Environment Variables

### `server/.env`
| Variable | Description | Example |
|---|---|---|
| `PORT` | Express server port | `5000` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for signing JWTs | `your-super-secret-key` |
| `JWT_EXPIRES_IN` | JWT token lifespan | `7d` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `mycloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abc123xyz` |
| `LLM_API_KEY` | OpenAI / Gemini API key | `sk-...` |
| `CLIENT_URL` | Frontend origin for CORS | `http://localhost:5173` |
| `NODE_ENV` | Runtime environment | `development` |

### `client/.env`
| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `AssetNest` |

> ⚠️ **Never commit `.env` files with real secrets to Git.**

---

## 🌿 Git Workflow

This project follows **GitHub Flow**:

```
main (stable) ← feature/xxx → PR → review → merge
```

### Branch naming conventions
| Type | Pattern | Example |
|---|---|---|
| Feature | `feature/<name>` | `feature/auth-login` |
| Bug fix | `fix/<name>` | `fix/health-route-cors` |
| Chore | `chore/<name>` | `chore/update-deps` |
| Docs | `docs/<name>` | `docs/api-reference` |

### Commit message format (Conventional Commits)
```
feat: add property dashboard
fix: correct JWT expiry validation
docs: update README setup steps
chore: install concurrently at root
```

### Module workflow
```bash
git checkout -b feature/<module-name>
# ... implement module ...
git add .
git commit -m "feat: <module description>"
git push -u origin feature/<module-name>
# Open Pull Request on GitHub
# Merge --no-ff into main
git checkout main && git pull origin main
git branch -d feature/<module-name>
```

---

## 📝 License

MIT © AssetNest Contributors
