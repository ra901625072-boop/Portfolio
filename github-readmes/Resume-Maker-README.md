# Resume Maker 📄🎨

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python&logoColor=white)](https://python.org)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite&logoColor=white)](https://sqlite.org)
[![Render](https://img.shields.io/badge/Render-Hosted-46E3B7?logo=render&logoColor=white)](https://resume-maker-zhcq.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An interactive, responsive resume builder designed specifically for students and design novices. Users fill in structured forms with educational milestones, professional experience, and technical achievements. The system parses inputs in real-time, displaying customizable ATS-friendly layouts that can be exported directly as formatted PDF documents.

---

## 📸 Visuals & Screenshots

*(Add screenshots of your system under `/screenshots`)*
*   **Step-by-Step Profile Form:** `![Profile Form](./screenshots/home.png)`
*   **Live Template Editor View:** `![Live Preview](./screenshots/dashboard.png)`
*   **Mobile Form Layout:** `![Mobile Interface](./screenshots/mobile.png)`

---

## ✨ Features

*   **Multi-Step Data Form:** Intuitive, organized sections capturing Profile Info, Experience, Education, Projects, Skills, and Custom achievements.
*   **Real-time Canvas Rendering:** Javascript parses form fields immediately and maps them onto design templates displayed side-by-side.
*   **Customization Filters:** Change layout fonts (Inter, Roboto, Georgia), margins, colors, and category headers instantly.
*   **ATS-Friendly Formats:** Pre-built templates structured according to common Applicant Tracking System (ATS) guidelines (using semantic layouts, sans tables).
*   **PDF Export Engine:** Formats and prints cleanly via standard browser engines or backend rendering pipes.

---

## 🛠️ Tech Stack

*   **Backend Interface:** Python 3.9+ & lightweight FastAPI
*   **Database Schema:** SQLite (for storing user template preferences & saved resume fields)
*   **Frontend Logic:** Vanilla CSS Custom Variables, Javascript DOM modules, HTML5
*   **PDF Generation:** HTML Canvas printing triggers & `jsPDF` / print styling classes
*   **Deployment:** Hosted on Render

---

## 📂 Repository Structure

```
Resume-Maker/
├── backend/
│   ├── api/
│   │   └── main.py          # Portals, routes and authentication handlers
│   ├── database/
│   │   ├── db.py            # SQLite connection setup
│   │   └── models.py        # Resume data mapping tables
├── frontend/
│   ├── css/
│   │   ├── forms.css        # Multi-step forms visual styling
│   │   └── templates/
│   │       ├── minimal.css   # ATS classic template style
│   │       └── modern.css    # Two-column modern template style
│   ├── js/
│   │   ├── app.js           # Form controller and wizard navigation
│   │   ├── templates.js     # Real-time preview canvas mapper
│   │   └── exporter.js      # PDF compilation triggers
│   ├── index.html           # Landing page
│   └── builder.html         # Resume builder interface
├── screenshots/             # Interface mockups
├── requirements.txt         # Package dependencies list
└── README.md                # System documentation
```

---

## 🚀 Installation & Local Setup

### Prerequisites

- Python 3.9+ installed.

### 1. Clone the Repository
```bash
git clone https://github.com/ra901625072-boop/Resume-Maker.git
cd Resume-Maker
```

### 2. Set Up Local DB
Create a `.env` file in the root directory:
```env
DATABASE_URL=sqlite:///./resumes.db
SECRET_KEY=your_authentication_key_here
PORT=8000
```

### 3. Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Run Application
```bash
uvicorn backend.api.main:app --reload
```
Navigate to `http://localhost:8000` to start building your resume.

---

## 🗺️ Future Roadmap

*   [ ] Add OpenAI integration to auto-suggest optimized bullet points for job descriptions.
*   [ ] Introduce more resume templates (e.g., Creative, Academic CV).
*   [ ] Support importing LinkedIn profiles to auto-fill resume fields.
*   [ ] Provide grading metrics on resume completeness and layout health.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
