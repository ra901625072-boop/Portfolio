# Pali CBDC Portal 🏦📊

[![FastAPI](https://img.shields.io/badge/FastAPI-0.95.0%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite&logoColor=white)](https://sqlite.org)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?logo=vercel)](https://pali-omega.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A localized web portal developed for the **Panchayat Office (Pali)** to coordinate, register, and analyze resident enrollment for the Central Bank Digital Currency (CBDC) rollout. The application is highly optimized to load fast over rural network infrastructure.

---

## 📸 Visuals & Screenshots

*(Add screenshots of your portal under `/screenshots`)*
*   **Public Beneficiary Search:** `![Beneficiary Lookup](./screenshots/home.png)`
*   **Admin Dashboard Analytics:** `![Admin Console](./screenshots/dashboard.png)`
*   **Mobile View Layout:** `![Mobile View](./screenshots/mobile.png)`

---

## ✨ Features

*   **Public Enrollment Search:** Simple, optimized index allowing residents to search their enrollment status by Name or Aadhaar suffix.
*   **Talati Admin Dashboard:** Secure authentication portal for village administrators to add, update, or remove entries.
*   **Real-time Analytics:** Visualizes registration milestones, demographics, and completion progress.
*   **CSV/Excel Exporting:** Quick single-click data downloads for local offline governmental archives.
*   **Optimization for Slow Networks:** Clean layout structure requiring minimal assets, designed to prevent timeout failure on 3G/rural connectivity.

---

## 🛠️ Tech Stack

*   **Backend:** Python 3.9+ & FastAPI
*   **Database:** SQLite (local development), PostgreSQL (production-ready mapping)
*   **ORM Layer:** SQLAlchemy
*   **Frontend UI:** Vanilla HTML5, CSS3 Custom Properties (variables), JavaScript (ES6)
*   **Deployment:** Vercel / Render

---

## 📂 Repository Structure

```
Pali/
├── api/                     # Backend server entry points & routing
│   ├── main.py              # Main API router, middleware & configuration
│   ├── database.py          # Database session handling & engines
│   ├── models.py            # SQL tables mapped to Python classes
│   └── schemas.py           # Pydantic data schemas
├── assets/                  # CSS, JS, and image assets
│   ├── css/
│   │   └── main.css         # Custom variables and layout rules
│   ├── js/
│   │   └── admin.js         # AJAX request logic & charts rendering
│   └── images/              # Icons and graphics
├── docs/                    # Government rollout mandates & protocols
├── screenshots/             # Interface mockups
├── templates/               # Jinja2 template files for web rendering
├── vercel.json              # Vercel serverless functions configuration
├── requirements.txt         # Package dependencies list
└── README.md                # System documentation
```

---

## 🚀 Installation & Local Setup

### Prerequisites

- Python 3.9+ installed.
- Pip package installer.

### 1. Clone the Repository
```bash
git clone https://github.com/ra901625072-boop/pali.git
cd pali
```

### 2. Configure Local Database & Env
Create a `.env` file in the root directory:
```env
DATABASE_URL=sqlite:///./pali_cbdc.db
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password_here
ENVIRONMENT=development
```

### 3. Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Run Development Server
```bash
uvicorn api.main:app --reload
```
Open your browser and navigate to `http://localhost:8000` to view the public portal, or `http://localhost:8000/admin` to access the dashboard.

---

## 🗺️ Future Roadmap

*   [ ] Add SMS notification status updates via Twilio API.
*   [ ] Support multiple regional language translations (Gujarati, Hindi, English).
*   [ ] Upgrade DB storage layer to PostgreSQL to support multi-concurrent administrators.
*   [ ] Include QR code scanning verification.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
