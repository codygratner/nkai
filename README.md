# 🌌 N'kai (NKAI)
### *Non-Euclidean Knowledge & Autonomous Interface*
> **An Asymmetric Sidecar Framework & Interactive Triage Lab for AI Pair-Programming**  
> *(Engineered for Google Antigravity & Modern Webviews)*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vibe Coded](https://img.shields.io/badge/Methodology-Vibe%20Coded-ff79c6.svg)](#the-origin-story--philosophy)
[![Pair Programmed](https://img.shields.io/badge/Pair%20Programmed-Cody%20Gratner%20%2B%20Antigravity-58a6ff.svg)](#the-origin-story--philosophy)
[![Vanilla JS](https://img.shields.io/badge/Zero%20Dependencies-Vanilla%20HTML%2FCSS%2FJS-green.svg)](#architecture)

---

## 📖 The Origin Story & Philosophy

**N'kai** was born out of an intense, late-night AI pair-programming sprint between **Cody Gratner** and **Antigravity** (Google DeepMind's Advanced Agentic Coding assistant) while architecting the multi-repo DSP ecosystem for **The Klang Suite** and **ToadTracker**.

In Lovecraftian and Clark Ashton Smith mythos, *N'kai* is the pitch-black subterranean realm far beneath the earth where Tsathoggua ("The Toad") slumbers. In our engineering universe:
- The **Ivory Tower** (the LLM chat prompt) plans and debates high-level architecture.
- Down in **N'kai** (the interactive sidecar canvas), the raw subterranean work actually happens: interactive visual prototypes, dynamic signal path simulations, audio UI mockups, and methodical triage scorecards take physical form without polluting or bloating the chat's precious LLM context window.

This project is a love letter to **true vibe coding**: combining high-speed human creative intuition and aesthetic taste with rigorous agentic engineering, zero-allocation real-time principles, and rock-solid architectural separation of concerns.

---

## ⚡ The Asymmetric Sidecar Split

Traditional LLM workflows force the agent to vomit massive walls of text, markdown tables, ASCII art, and mockups directly into the chat transcript. This creates two fatal problems:
1. **Context Window Rot**: The chat context explodes with disposable UI mockups and verbose tradeoff prose, causing the LLM to lose focus on earlier engineering constraints.
2. **Reading Fatigue**: The human developer is forced to read endless repetitive text walls when all they want is a quick visual glance and a button to click.

**N'kai solves this via the Asymmetric Sidecar Split:**
- **Chat is for Conversation**: Chat turns remain ultra-terse, punchy, and conversational (1–3 sentences or immediate action dispatches).
- **N'kai is for Cognitive Load**: All complex visual mockups, comparative tradeoffs, interactive state simulations, and option cards render live inside the side-panel canvas.

```text
┌─────────────────────────────────┐   ┌───────────────────────────────────────────────┐
│     AI CHAT (TERSE & FAST)      │   │               N'KAI SIDECAR                   │
│                                 │   │                                               │
│ User: "How does the filter look │   │  [🛠️ ACTIVE WORKSHOP] [📐 TOPOLOGY] [📋 TRIAGE] │
│ with localized resonance?"      │   │  ┌─────────────────────────────────────────┐  │
│                                 │   │  │ 🛠️ Active: Dual-Stage 2-Pole ZDF Filter   │  │
│ Agent: "Live simulator updated  │──▶│  │ [Interactive SVG Signal Flow Simulation]│  │
│ in N'kai. Check the bite curve  │   │  │ (A) Cascaded ZDF     (B) Global 4-Pole  │  │
│ and pick a verdict."            │   │  │ [ ✅ APPROVE ] [ ⏳ TABLE ] [ 💀 KILL ]   │  │
│                                 │   │  └─────────────────────────────────────────┘  │
│ User clicks [ APPROVE ], hits   │◀──│  [📋 Copy Verdicts to Chat] [🔍 Context]      │
│ copy, pastes 1 line into chat.  │   │                                               │
└─────────────────────────────────┘   └───────────────────────────────────────────────┘
```

---

## ✨ Key Features

- **🎯 Hero Stage / Active Workshop (Item 1 Slot)**:
  Isolates *only* the single active concept or bug currently under debate. Features interactive visual mockups, data-driven parameter tables, and selectable option cards (`[ ✅ APPROVE ]`, `[ ⏳ TABLE ]`, `[ 💀 KILL ]`).
- **🔄 Dual-State Floating Action Button (FAB)**:
  A fixed-position action pill pinned to the bottom right:
  - In *Hero Stage*: Morphs into `🔍 See in Context` and smooth-scrolls directly to that item embedded in the deep-dive research tabs.
  - In *Research / Deep Tabs*: Morphs into `🔙 Back to Workshop` and returns instantly to the active hero stage.
- **📋 Interactive Decision Composer**:
  Real-time scorecard tracking approvals, tabled concepts, and graveyard items across the entire session. Generates clean, machine-readable summaries copied to clipboard with one click.
- **🎨 Neo-Slate Dark Palette**:
  Tuned for long night sessions: Antigravity dark slate base (`#0d1117`), elevated panels (`#161b22`), border definition (`#30363d`), with glowing amber (`#ffab70`), cyan (`#38bdf8`), and electric green accents.
- **🔎 Zero-Dependency Font Scaler**:
  Stacked header controls with `A-` and `A+` buttons allowing instant zoom scaling of the entire canvas, permanently persisted in `localStorage`.
- **📦 Dual Deployment Paradigms**:
  1. **Standalone Offline Artifact**: Zero dependencies, zero build steps. A single `.html` file that opens anywhere via `file://` or inside IDE webviews.
  2. **Antigravity UI Extension**: Ready-to-install bundle (`plugin/`) powered by Antigravity's built-in Sidecar Node SDK for live workspace sync.

---

## 📁 Repository Structure

```text
nkai/
├── core/
│   ├── sidecar.css          # Core dark slate theme, responsive grid & card styling
│   ├── sidecar.js           # State engine (modes, hero stage, FAB, composer, font scaler)
│   └── schema.json          # Declarative JSON schema for sidecar modes and items
├── dist/
│   └── standalone-template.html # 100% self-contained, zero-dependency drop-in HTML canvas
├── examples/
│   ├── ui_ux_research_board.html # Comprehensive synthesis board with vector SVG glyphs
│   └── decision_lab.html        # Minimalist decision & triage canvas
├── plugin/                  # Google Antigravity UI Extension bundle
│   ├── plugin.json
│   ├── assets/logo.svg
│   └── sidecars/panel/
│       ├── sidecar.json     # Extension declaration for Antigravity Aux Pane
│       ├── package.json
│       ├── main.mjs         # Node.js sidecar service
│       └── index.html       # Webview host
├── LICENSE                  # MIT License
└── README.md
```

---

## 🚀 Quick Start

### Option A: The Drop-In Standalone Artifact (Zero Setup)
Copy `dist/standalone-template.html` into your project's `.agents/sidecar/` or artifacts folder:
```powershell
# Open directly in your browser or point your agent's artifact viewer to it
Start-Process "dist/standalone-template.html"
```
Or have your AI coding agent dynamically inject sections, cards, and interactive simulators into the template.

### Option B: Installing as an Antigravity UI Extension
1. Clone or symlink this directory into your Antigravity plugins directory:
   ```powershell
   git clone https://github.com/codygratner/nkai.git
   ```
2. Enable the extension in Antigravity's Plugins Manager.
3. The **N'kai Workshop** icon will appear in your IDE auxiliary side pane.

---

## 📜 Declarative Schema Contract

You don't need to manually write complex HTML. N'kai can be driven declaratively via `core/schema.json`. Define your categories, items, and interactive options in clean JSON, and the engine generates the sidecar surface:

```json
{
  "project": "The Klang Suite",
  "activeItem": {
    "id": "item-1-1",
    "title": "Monolithic Sculpted Titanium Faceplate",
    "category": "layout",
    "summary": "Unified 1px hairline grooves vs legacy 2x5 cards.",
    "options": [
      { "id": "opt-a", "label": "Approve Titanium Slate", "status": "approved" },
      { "id": "opt-b", "label": "Table for v0.5.0", "status": "tabled" }
    ]
  }
}
```

---

## 🤝 Pair Programming & Contributing

Contributions, feedback, and forks are welcome! Whether you are building audio plugins, embedded firmware, web apps, or autonomous agent frameworks, N'kai gives your AI pair-programmer a clean visual workbench.

### License
Released under the permissive [MIT License](LICENSE).  
Copyright (c) 2026 Cody Gratner.
