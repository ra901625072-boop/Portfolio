# Jarvis Voice Assistant / Multi-Agent Automation Agent 🤖🎙️

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100.0%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Socket.io](https://img.shields.io/badge/Socket.io-WebSocket-black?logo=socketdotio)](https://socket.io)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An advanced voice- and text-mode automation assistant designed to orchestrate complex workflows by coordinating specialized AI sub-agents (Coding, Research, and Planning agents). It features real-time voice-to-text transcription, dynamic tool execution, and an interactive frontend dashboard.

---

## 📸 Visuals & Screenshots

*(Add screenshots of your application in action under `/screenshots`)*
*   **Voice Console Dashboard:** `![Voice Console](./screenshots/home.png)`
*   **Sub-Agent Orchestration Log:** `![Orchestrator](./screenshots/dashboard.png)`
*   **Mobile View:** `![Mobile Interface](./screenshots/mobile.png)`

---

## ✨ Features

*   **Multi-Agent Orchestration:** Coordinates specialized sub-agents via a JSON-over-Socket protocol.
    *   *Coding Agent:* Generates, tests, and refactors code.
    *   *Research Agent:* Performs web searching and retrieves documentation.
    *   *Planning Agent:* Breaks down user commands into sequential operations.
*   **Voice Control System:** Integrated offline/online transcription (Speech-to-Text) and text-to-speech feedback.
*   **Tool Execution Engine:** Enables agents to run bash commands, edit local files, and search directories securely.
*   **Interactive Web UI:** Real-time web socket stream displaying agent thought processes, message histories, and system status logs.

---

## 🛠️ Tech Stack

*   **Core Backend:** Python 3.10+
*   **API & Web Socket Layer:** FastAPI, WebSockets
*   **AI Integration:** OpenAI API (GPT-4o), LangChain, Custom JSON Agent Protocol
*   **Audio Pipeline:** PyAudio, Whisper (for transcription), ElevenLabs / pyttsx3 (for TTS)
*   **Local Tooling:** Custom sandboxed code runner, Google Search API

---

## 📂 Repository Structure

```
Jarvis/
├── assets/                  # Media assets, icons, sound cues
├── docs/                    # Architectural documents and protocols
├── screenshots/             # Interface mockups and screenshots
├── src/
│   ├── agents/              # Sub-agent implementations (coding, research, planner)
│   │   ├── base.py          # Abstract base agent class
│   │   ├── coding.py        # Code editor & executor agent
│   │   ├── research.py      # Search & document reader agent
│   │   └── planner.py       # High-level scheduler & task splitter
│   ├── audio/               # Voice transcription and text-to-speech modules
│   ├── core/                # Core system configuration and prompt templates
│   ├── socket/              # Web socket and event-loop messaging logic
│   └── main.py              # Main application bootstrapper
├── tests/                   # Concurrency and tool testing scripts
├── .gitignore               # Ignored runtimes, credentials, and venvs
├── CONTRIBUTING.md          # Guide for developers wanting to contribute
├── LICENSE                  # MIT License details
├── requirements.txt         # Python dependencies mapping
└── README.md                # Project documentation
```

---

## 🚀 Installation & Local Setup

### Prerequisites

Ensure you have Python 3.10+ and a microphone input device configured on your host system.

### 1. Clone the Repository
```bash
git clone https://github.com/ra901625072-boop/Jarvis-Voice-Assistant.git
cd Jarvis-Voice-Assistant
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_key_here
GOOGLE_SEARCH_API_KEY=your_google_search_key
GOOGLE_CSE_ID=your_custom_search_engine_id
VOICE_SERVICE=whisper
```

### 3. Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Run the Application
```bash
python src/main.py
```
Open your browser to the local stream dashboard (default `http://localhost:8000`) to view active logs.

---

## 🗺️ Future Roadmap

*   [ ] Integrate localized open-source LLM options (Ollama/Llama-3).
*   [ ] Implement visual multimodal input (handling screenshot analysis).
*   [ ] Add cloud deployment workflows for multi-user capabilities.
*   [ ] Upgrade to hardware-accelerated local whisper engine support.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
