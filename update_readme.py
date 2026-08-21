import re

with open('README.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Update features
features_target = "## ✅ Current Features (Modules 1-3)"
features_replacement = """## ✅ Current Features (Modules 1-4)

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
- **Property Management (CRUD)** — Add, view, edit, and delete properties securely tied to the authenticated user"""
content = content.replace("## ✅ Current Features (Modules 1-3)", features_replacement)
content = content.replace("## o. Current Features (Modules 1-3)", features_replacement)

# Update API Endpoints
endpoints_target = """### Protected Endpoints (Requires valid JWT Cookie)
- `GET /api/auth/me` — Get the currently logged-in user's profile
- `POST /api/auth/logout` — Clear the authentication cookie"""

endpoints_replacement = """### Protected Endpoints (Requires valid JWT Cookie)
- `GET /api/auth/me` — Get the currently logged-in user's profile
- `POST /api/auth/logout` — Clear the authentication cookie
- `GET /api/properties` — Get all properties belonging to the user
- `POST /api/properties` — Add a new property
- `GET /api/properties/:id` — Get details of a specific property
- `PUT /api/properties/:id` — Update a property
- `DELETE /api/properties/:id` — Delete a property"""

# Handle potential emoji corruption from cat output in target
endpoints_target2 = """### Protected Endpoints (Requires valid JWT Cookie)
- `GET /api/auth/me` ?" Get the currently logged-in user's profile
- `POST /api/auth/logout` ?" Clear the authentication cookie"""

content = content.replace(endpoints_target, endpoints_replacement)
content = content.replace(endpoints_target2, endpoints_replacement)

# Update Module Status
status_target = """- **Module 1: Complete** — Project Foundation & Dashboard UI
- **Module 2: Complete** — MongoDB Database & Models
- **Module 3: Complete** — Authentication System (JWT)
- **Module 4+: Not Started** — Document Vault, AI Tools, Reminders, etc."""

status_replacement = """- **Module 1: Complete** — Project Foundation & Dashboard UI
- **Module 2: Complete** — MongoDB Database & Models
- **Module 3: Complete** — Authentication System (JWT)
- **Module 4: Complete** — Property Management (CRUD)
- **Module 5+: Not Started** — Document Vault, AI Tools, Reminders, etc."""

status_target2 = """- **Module 1: Complete** ?" Project Foundation & Dashboard UI
- **Module 2: Complete** ?" MongoDB Database & Models
- **Module 3: Complete** ?" Authentication System (JWT)
- **Module 4+: Not Started** ?" Document Vault, AI Tools, Reminders, etc."""

content = content.replace(status_target, status_replacement)
content = content.replace(status_target2, status_replacement)

with open('README.md', 'w', encoding='utf-8') as f:
    f.write(content)
