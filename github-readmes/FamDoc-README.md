# FamDoc (Family Keepsake & Document Management System) 📂🔒

[![Kotlin](https://img.shields.io/badge/Kotlin-2.0-7F52FF?logo=kotlin&logoColor=white)](https://kotlinlang.org)
[![Android Jetpack Compose](https://img.shields.io/badge/Jetpack_Compose-Material_3-4285F4?logo=android&logoColor=white)](https://developer.android.com/jetpack/compose)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Google Drive API](https://img.shields.io/badge/Google_Drive-Multi--Account_Pooling-4285F4?logo=googledrive&logoColor=white)](https://developers.google.com/drive)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-316192?logo=postgresql&logoColor=white)](https://supabase.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-grade, resilient private cloud and keepsake management platform built with a companion **Native Android App (Kotlin & Jetpack Compose)** and a **FastAPI** backend with **Multi-Account Google Drive Storage Pooling** and automatic local-vault failover.

---

## ✨ System Architecture & Key Capabilities

1. **Native Android App (Modern Android Development - MAD):**
   - Built entirely in **Kotlin** and **Jetpack Compose** using **Material Design 3**.
   - Biometric fingerprint/face unlock for rapid and secure access.
   - On-device thumbnail caching and dynamic preview loading animations.
   - Coroutine-based networking via Retrofit with non-blocking async operations.

2. **Multi-Account Storage Pooling Engine:**
   - Aggregates multiple Google Drive storage account quotas into a single virtual family vault.
   - Automatically distributes files across available pool buckets based on remaining quota.

3. **Dual-Tier Resilient Storage Pipeline:**
   - Direct streaming write to Google Drive with automated failover to an encrypted local disk vault.
   - Background worker auto-promotes cached files once external network connectivity is restored.

4. **Security & Encryption Layer:**
   - Single-session JWT enforcement with unique `jti` validation.
   - Fernet symmetric encryption for OAuth tokens and sensitive family records.
   - Role-based access control (Admin vs Member) with immutable audit logs.

---

## 📂 Repository Structure

```
FamDoc/
├── android/                   # Native Android Jetpack Compose App
│   ├── app/
│   │   ├── src/main/java/com/famdoc/
│   │   │   ├── ui/screens/    # Compose UI (Home, Vault, Upload, Preview)
│   │   │   ├── data/api/      # Retrofit client & API definitions
│   │   │   └── util/          # Biometric & local caching helpers
│   │   └── build.gradle.kts
│   └── build_release.bat      # Automated APK/AAB release script
├── backend/                   # FastAPI Backend
│   ├── app/
│   │   ├── config.py          # Multi-account Drive credentials & env
│   │   ├── database.py        # Supabase PostgreSQL & SQLite engine
│   │   ├── encryption.py      # Fernet AES token & file encryption
│   │   ├── models/            # SQLAlchemy schemas (Family, User, File, Pool)
│   │   ├── routes/            # REST API endpoints
│   │   └── services/          # Multi-tenant Drive pooling & failover vault
│   └── main.py                # Bootstrapper & background workers
├── scripts/                   # Automated build & deployment batch scripts
└── README.md
```

---

## 🚀 Getting Started

### Backend Setup
```bash
git clone https://github.com/ra901625072-boop/FamDoc.git
cd FamDoc/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Android App Build
```bash
cd FamDoc/android
./gradlew assembleRelease
# or run scripts/build_apk.bat
```
