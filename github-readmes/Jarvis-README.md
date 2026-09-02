# JARVIS Voice Assistant (14-Agent Orchestration Swarm) 🤖🎙️

[![Python](https://img.shields.io/badge/Python-3.11%2B-blue?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111.0%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![LiveKit WebRTC](https://img.shields.io/badge/LiveKit-WebRTC_Voice-FF0055?logo=webrtc&logoColor=white)](https://livekit.io)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_Memory-purple?logo=databricks&logoColor=white)](https://trychroma.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A real-time, voice-first autonomous AI system powered by a **14-Agent Orchestration Swarm**, **LiveKit WebRTC bi-directional audio streaming**, and a **Two-Speed Learning Loop** backed by SQLite and ChromaDB vector memory.

---

## 🧠 14-Agent Swarm Matrix

The system distributes tasks across a central Supervisor and 13 domain-specialized agents communicating over an asynchronous in-memory event bus:

1. **Supervisor Agent:** Root orchestrator managing session state, intent routing, and dynamic delegation.
2. **Coordinator Agent:** High-level workflow scheduling and dependency resolution.
3. **Planning Agent:** Decomposes complex multi-step user prompts into sequential DAG plans.
4. **Execution Agent:** Coordinates parallel tool invocation and shell actions.
5. **Verification Agent:** Validates code, API responses, and file outputs against goal specifications.
6. **Recovery Agent:** Autonomous self-healing loop that diagnoses errors and rolls back failing actions.
7. **Memory Agent:** Interacts with SQLite long-term storage and ChromaDB semantic embeddings.
8. **Browser Agent:** Headless web navigation, DOM parsing, and web data extraction.
9. **Coding Agent:** Synthesizes, analyzes, and refactors application source code.
10. **Debugging Agent:** In-depth stack trace inspection and AST-level patch proposals.
11. **Integration Agent:** Manages third-party REST/GraphQL and external service bridges.
12. **Vision Agent:** Processes UI screenshots, images, and visual element grounding.
13. **Interaction Agent:** Voice synthesis modulation and user dialog state handling.
14. **Language Agent:** Multi-lingual translation, semantic summarization, and tone adaptation.

---

## ⚡ Real-Time Features & Architecture

* **LiveKit WebRTC Audio Pipeline:** Sub-500ms voice-to-action routing latency using WebRTC data and media tracks.
* **Two-Speed Learning Loop:**
  * **Fast Loop:** Instantaneous Exponential Moving Average (EMA) capability scoring computed per agent after each execution.
  * **Slow Loop:** Nightly memory consolidation routine purging stale items, decaying obsolete weights, and writing persistent behavioral rules to ChromaDB.
* **MCP Integration:** Native support for the Model Context Protocol (MCP) to plug in external developer tools and data sources.

---

## 🚀 Installation & Local Setup

```bash
# 1. Clone Repository
git clone https://github.com/ra901625072-boop/Jarvis-Voice-Assistant.git
cd Jarvis-Voice-Assistant

# 2. Virtual Environment & Dependencies
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# 3. Configure Environment (.env)
cp .env.example .env

# 4. Start Server
python src/main.py
```
