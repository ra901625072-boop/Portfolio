# FamDoc (Family Document Manager) 📂🔒

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.98.0%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Google Drive API](https://img.shields.io/badge/Google_Drive-API-4285F4?logo=googledrive&logoColor=white)](https://developers.google.com/drive)
[![Vercel](https://img.shields.io/badge/Vercel-Hosted-000000?logo=vercel&logoColor=white)](https://famdoc-ten.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A private cloud storage sharing portal modeled after shared network directories. FamDoc allows users to create secured family spaces utilizing unique join codes. Any member of the family can securely upload, organize, search, and download critical records (tax forms, academic certificates, medical files) streamed directly to Google Drive and MEGA cloud backends.

---

## 📸 Visuals & Screenshots

*(Add screenshots of your system under `/screenshots`)*
*   **Family File Explorer Dashboard:** `![Dashboard View](./screenshots/home.png)`
*   **Categorized File Search & Tags:** `![File Search](./screenshots/dashboard.png)`
*   **Mobile view layout:** `![Mobile View](./screenshots/mobile.png)`

---

## ✨ Features

*   **Secured Family Code Hub:** Create a secure family database partition. Family members join using a unique generated 8-digit alpha-numeric key.
*   **Streamed Cloud Storage:** Uploads are streamed via chunks to external APIs (Google Drive and MEGA), saving server bandwidth and local storage footprints.
*   **Aadhaar/Document Encryption:** Encrypts sensitive governmental IDs on rest using AES encryption protocols before transmission.
*   **Elastic Tag-based Search:** Instant indexing allows sorting and searching documents by tags, uploader, date range, or title.
*   **Permission Hierarchy:** Restrict delete capabilities to uploader or family creator roles.

---

## 🛠️ Tech Stack

*   **Backend framework:** FastAPI (Python 3.9+)
*   **Storage APIs:** Google Workspace Drive API (v3), MegaPy API wrapper
*   **Database:** SQLite & SQLAlchemy ORM
*   **Encryption Layer:** Cryptography (Fernet symmetric key encryption)
*   **Frontend Client:** HTML5, CSS3, ES6 Javascript
*   **Deployment:** Render

---

## 📂 Repository Structure

```
FamDoc/
├── backend/
│   ├── app/
│   │   ├── config.py        # Environmental variables & third-party keys
│   │   ├── database.py      # SQLite session connector
│   │   ├── encryption.py    # AES encrypt/decrypt helpers
│   │   ├── models.py        # SQLite User, Family, and File tables
│   │   ├── routes/          # REST endpoints (auth, files, family code)
│   │   └── services/        # Cloud upload engines (Google Drive & Mega)
│   └── main.py              # Backend bootstrapper
├── frontend/
│   ├── css/
│   │   └── dashboard.css    # Responsive directory grid styling
│   ├── js/
│   │   └── main.js          # DOM rendering, search filters, and AJAX uploads
│   ├── dashboard.html       # Shared documents board
│   └── index.html           # Login & Family Creation landing page
├── docs/                    # Security configurations and API setup guide
├── screenshots/             # Interface mockups
├── requirements.txt         # Package dependencies list
└── README.md                # System documentation
```

---

## 🚀 Installation & Local Setup

### Prerequisites

- Python 3.9+ installed.
- Google Developer Console account with Drive API enabled & Credentials JSON downloaded.
- MEGA account details.

### 1. Clone the Repository
```bash
git clone https://github.com/ra901625072-boop/FamDoc.git
cd FamDoc
```

### 2. Configure Environment
Create a `.env` file in the root folder:
```env
DATABASE_URL=sqlite:///./famdoc.db
FERNET_SECRET_KEY=your_generated_aes_key_here
GOOGLE_APPLICATION_CREDENTIALS=credentials.json
MEGA_USERNAME=your_mega_email@domain.com
MEGA_PASSWORD=your_mega_password_here
```
Place your Google credentials json file in the root directory named `credentials.json`.

### 3. Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Run Application Server
```bash
uvicorn backend.main:app --reload
```
Open `http://localhost:8000` to access the application.

---

## 🗺️ Future Roadmap

*   [ ] Support file preview overlays (PDF, Images, Word files) directly in-app without downloading.
*   [ ] Add temporary file share links with customizable expiration timers.
*   [ ] Integrate push notifications when a family member uploads a new file.
*   [ ] Build automated weekly file backup schedules.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
