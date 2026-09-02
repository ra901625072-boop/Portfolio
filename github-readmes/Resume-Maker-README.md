# WISAXIS AI Resume Maker & ATS Optimizer 📄⚡

[![Python](https://img.shields.io/badge/Python-3.11%2B-blue?logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.1-black?logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-AI_LLaMA_3.1_%26_Claude-purple)](https://openrouter.ai)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-red?logo=sqlalchemy&logoColor=white)](https://www.sqlalchemy.org)
[![Render](https://img.shields.io/badge/Render-Hosted-46E3B7?logo=render&logoColor=white)](https://resume-maker-zhcq.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A full-stack, AI-powered resume building and optimization platform built with **Flask 3.1**, **SQLAlchemy 2.0**, and **OpenRouter AI (LLaMA 3.1 & Claude 3.5)**. Includes automated ATS compatibility scoring, interactive AI career coach chat, CAR-framework bullet generator, and JSON Resume extraction.

---

## ✨ Features & AI Integrations

* **OpenRouter AI Integration:**
  * **CAR Framework Experience Generator:** Transforms simple descriptions into quantifiable achievements using the Challenge → Action → Result methodology.
  * **AI Professional Summary Writer:** Tailors summaries to specific target job titles and industry keywords.
  * **AI Career Coach Chatbot:** Multi-turn interactive assistant providing personalized advice and token usage tracking.
* **Real-Time ATS Compatibility Scorecard:**
  * Analyzes resume text against standard ATS parsers, outputting an overall score (0–100), key strengths, and missing keyword suggestions.
* **JSON Resume Parser & Extractor:**
  * Upload existing PDF/DOCX resumes and extract structured JSON data using `pdfplumber` and `python-docx`.
* **Version Snapshotting:**
  * Automatically saves up to 20 immutable version snapshots with JSON diff rollbacks.
* **Vector-Clean ATS PDF Export:**
  * Uses CSS print styling rules for pure vector PDF rendering without messy HTML-to-image degradation.

---

## 🛠️ Tech Stack

* **Backend:** Flask 3.1, SQLAlchemy 2.0, Werkzeug
* **AI API Gateway:** OpenRouter API (Meta LLaMA 3.1 70B, Anthropic Claude 3.5 Sonnet)
* **Database:** SQLite (local dev) / PostgreSQL (production)
* **Frontend:** Modern CSS Variables (Electric Sapphire theme), Vanilla JS DOM controllers
* **Document Extraction:** `pdfplumber`, `python-docx`
* **Hosting:** Render PaaS

---

## 🚀 Installation & Local Setup

```bash
# 1. Clone Repository
git clone https://github.com/ra901625072-boop/Resume-Maker.git
cd Resume-Maker

# 2. Virtual Environment
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# 3. Environment Variables (.env)
# Create .env with:
# OPENROUTER_API_KEY=your_key_here
# SECRET_KEY=your_secret_key

# 4. Start Server
python app.py
```
