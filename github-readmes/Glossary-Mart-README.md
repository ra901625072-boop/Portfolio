# e-Grossary Mart 🛒📦

[![FastAPI](https://img.shields.io/badge/FastAPI-0.95%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite&logoColor=white)](https://sqlite.org)
[![Render](https://img.shields.io/badge/Render-Hosted-46E3B7?logo=render&logoColor=white)](https://glossary-mart.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An inventory management ledger, supplier dashboard, and digital storefront built for retail and wholesale grocery merchants. It automates inventory tracking, alerts staff of low stock thresholds, visualizes daily revenues, and provides customers with an interactive digital checkout system.

---

## 📸 Visuals & Screenshots

*(Add screenshots of your system under `/screenshots`)*
*   **Customer Storefront Portal:** `![Storefront](./screenshots/home.png)`
*   **Manager Dashboard (Stock Ledger):** `![Inventory Ledger](./screenshots/dashboard.png)`
*   **Mobile Customer Cart:** `![Mobile Cart](./screenshots/mobile.png)`

---

## ✨ Features

*   **B2C Storefront Portal:** Interactive web shop featuring product categories, search queries, and dynamic JavaScript shopping carts synced with inventory limits.
*   **Stock Ledger Dashboard:** Management console detailing current stock levels, safety limits, and item categories.
*   **Supplier Directory:** Links store inventory directly to primary wholesale suppliers, allowing managers to draft re-order sheets.
*   **Low Stock Warnings:** Auto-flags items dropping below standard thresholds.
*   **Financial Metrics:** Visualizes daily/monthly sales, gross profit margins, and revenue breakdowns.

---

## 🛠️ Tech Stack

*   **Backend Services:** FastAPI (Python 3.9+)
*   **Database Engine:** SQLite (SQLAlchemy ORM)
*   **Frontend Logic:** Vanilla CSS Custom Properties, ES6 Javascript Fetch, HTML5
*   **Chart Engine:** Chart.js (used to build dashboard sales analytics graphs)
*   **Deployment:** Render

---

## 📂 Repository Structure

```
Glossary-Mart/
├── backend/                 # API controllers, models, and schemas
│   ├── api/
│   │   ├── routes.py        # Storefront and admin endpoint controllers
│   │   └── auth.py          # Session authentication handler
│   ├── database/
│   │   ├── connection.py    # Session creator
│   │   └── models.py        # Products, suppliers, and sales models
│   └── main.py              # Application entry point
├── frontend/                # Client-facing and admin web pages
│   ├── css/
│   │   ├── style.css        # Custom CSS styles
│   │   └── dashboard.css    # Specific layouts for admin console
│   ├── js/
│   │   ├── main.js          # Cart, search, and dynamic catalog scripts
│   │   └── charts.js        # Analytics visualizer
│   ├── admin.html           # Manager dashboard index
│   └── index.html           # Customer storefront index
├── screenshots/             # Interface mockups
├── requirements.txt         # Project dependencies
└── README.md                # Documentation guide
```

---

## 🚀 Installation & Local Setup

### Prerequisites

- Python 3.9+ installed.

### 1. Clone the Repository
```bash
git clone https://github.com/ra901625072-boop/Glossary-Mart.git
cd Glossary-Mart
```

### 2. Configure Environment
Create a `.env` file in the root folder:
```env
DATABASE_URL=sqlite:///./grocery_ledger.db
SECRET_KEY=generate_a_random_jwt_secret_key
SESSION_DURATION_HOURS=8
```

### 3. Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Boot Up Web Server
```bash
uvicorn backend.main:app --reload
```
Open `http://localhost:8000` to browse the store, or `http://localhost:8000/admin.html` to log in to the dashboard portal.

---

## 🗺️ Future Roadmap

*   [ ] Integrate payment gateway integrations (UPI / Razorpay sandbox).
*   [ ] Add automated email re-ordering reports to suppliers when stock hits critical low thresholds.
*   [ ] Support PDF invoice generation on order placement.
*   [ ] Implement barcode scanner support for cashiers.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
