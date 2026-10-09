# N'kai Web QA & Sidecar Diagnostic Guide

> **Canonical Specification**: Deterministic AST Static Analysis, Electron/Chromium Webview Quirks, and Automated Repair.

---

## 1. Overview
The N'kai Sidecar framework operates in two distinct environments:
1. **Offline Standalone Artifacts (`file:///`)**: Zero-dependency local HTML/CSS/JS files running directly in browser or IDE webview.
2. **Antigravity UI Extension Plugin**: Running inside an Electron/Chromium webview with Node.js sidecar SDK support.

Both environments have unique sandboxing, caching, and parsing quirks that do not occur on standard HTTP web servers. The `web-qa` toolchain provides deterministic 50ms linting and an automated repair ladder.

---

## 2. The 6 Critical Webview Hazards

1. **JS Template Literal Escapes (Parse-Time SyntaxError)**:
   - *Trap*: Writing Windows paths like `c:\Dev\TheKlangSuite\.agents\sidecar\ui_ux...` inside JS template strings.
   - *Cause*: `\ui` triggers an invalid Unicode escape sequence (`\uXXXX`), crashing script parsing and disabling all navigation handlers (`switchTab()`, `toggleDrawer()`).
   - *Fix*: Always use forward slashes (`c:/Dev/...`) or double-escaped backslashes.

2. **HTML Tag Imbalance**:
   - *Trap*: Mismatched `<div>` tags breaking grid layout and causing tab panes to swallow subsequent cards.
   - *Fix*: Enforce `opens == closes` (`diff = 0`) across all container tags.

3. **Strict-Mode Event Handling**:
   - *Trap*: Relying on window-level global `event.target` in strict mode throws `ReferenceError: event is not defined`.
   - *Fix*: Explicitly pass `event` in handlers or query DOM elements deterministically via `document.querySelector`.

4. **Click-Trapping Overlay Pointer Events**:
   - *Trap*: Modal or drawer backdrop overlays intercepting clicks while visually invisible.
   - *Fix*: Inactive states must strictly set `visibility: hidden; pointer-events: none; opacity: 0;`.

5. **Chromium `file:///` Memory Cache Trap**:
   - *Trap*: `location.reload()` re-reads from memory cache rather than disk.
   - *Fix*: Use `forceReloadCanvas()` cache-busting timestamp navigation:
     ```javascript
     const url = new URL(window.location.href);
     url.searchParams.set('_t', Date.now());
     window.location.replace(url.toString());
     ```

6. **Web Audio API Autoplay & Studio Safety**:
   - *Trap*: Browsers block AudioContext until user gesture; unexpected test tones burst through studio monitors.
   - *Fix*: Audio haptics must default to 100% muted in `localStorage` with Base64 PCM WAV fallback.

---

## 3. Tooling & CLI Usage

### Static Analysis Linter (`tools/audit_sidecar.py`)
```bash
# Run audit
python tools/audit_sidecar.py <path-to-html>

# Automatically fix escape hazards and path formatting
python tools/audit_sidecar.py <path-to-html> --fix
```

### Agentic Invocation Flags
- `/web-qa --flash`: Lightweight, low-quota pass for layout and regex fixes.
- `/web-qa --pro`: Deep reasoning pass for obscure browser sandboxing and audio synthesis.
- `/web-qa`: Autonomous escalation ladder (Static Audit $\to$ Flash Subagent $\to$ Pro Subagent).
