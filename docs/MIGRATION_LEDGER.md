# N'kai Migration Ledger & Sidecar Upgrade Guide

> **Canonical Specification**: Semantic Versioning, DOM Hook Contracts, and Non-Destructive Migration Paths for N'kai Sidecars.

---

## 1. Architectural Philosophy: The Non-Destructive Migration Invariant

Every N'kai sidecar serves as an interactive pair-programming canvas paired with Google Antigravity. As the framework evolves (introducing dynamic data loaders, slide-over utility drawers, haptic feedback, and decision matrices), older sidecars must be upgradeable to the latest framework capabilities without:
1. **Zero Content Loss**: Custom research sections, visual simulators, triage decisions, and card text must never be lost or modified during an upgrade.
2. **Zero-Dependency Durability**: Sidecars must remain 100% functional offline from local disk (`file:///`) with zero build steps or external server requirements.
3. **Automated Verifiability**: Upgrades must be executable via deterministic CLI codemods (`tools/upgrade_sidecar.py`) and verified against automated tag-balance checks (`opens == closes`, 0 diff).

---

## 2. Upgrade Models & 4-Lens Tradeoff Analysis

| Perspective Lens | Model 1: Decoupled Shared Core (`../core/sidecar.css`) | Model 2: Manual Inlined Refactoring | Model 3: Hybrid Pragmatic Standard (Winner) |
| :--- | :--- | :--- | :--- |
| 🌍 **Real-World Ergonomics** | Breaks when files are moved to `brain/<conversation-id>/` artifacts directory or zipped. | High developer fatigue; editing 100KB files manually leads to unclosed tags and errors. | **Optimal**: 1-click CLI command (`python upgrade_sidecar.py --target board.html`) upgrades in seconds. |
| 🎛️ **Audio Software Industry** | Like missing dynamic DLLs; host crashes if relative path breaks. | Monolithic plugin binaries with zero update path; hardcoded assets that never modernize. | **Gold Standard**: Factory preset state migration (e.g., FabFilter Pro-Q2 ➔ Pro-Q3 state import). |
| 🏛️ **Wider SOTA Systems** | Brittle symlink / relative script patterns that fail across container boundaries. | Static unversioned HTML files typical of legacy static sites. | **Modern Best Practice**: Astro/Vite single-file bundles with automated migration codemods. |
| 🏆 **Best Practices & Sustainability** | Fails zero-dependency offline invariant; dead links rot silently. | High technical debt; different sidecars drift on obsolete unmaintained versions. | **Production Grade**: Clean SemVer tracking in Git; automated AST verification guarantees zero content loss. |

---

## 3. SemVer Migration Ledger: v1.0.0 ➔ v1.1.0

### Version Summary
- **v1.0.0 (Baseline)**: Monolithic single-file layout, sticky multiline header, basic font size scaler (`localStorage`), two-column layout (sidebar + main content), active workshop hero card, post-mortem scorecard & composer.
- **v1.1.0 (Current)**:
  - **Dynamic Utility Drawers**: Right-anchored slide-over drawers for Ecosystem Roadmaps and Paused Triage Sessions (`#roadmap-drawer`, `#sessions-drawer`) with click-trapping fix (`pointer-events: none`).
  - **Universal Data Loader (`NkaiDataLoader`)**: Dual-mode data loader supporting Node.js Sidecar SDK/HTTP IPC in plugin mode and zero-CORS synchronous `.data.js` script tags in offline `file:///` mode.
  - **Cache-Busting Navigation**: `forceReloadCanvas()` bypassing Chromium's `file:///` memory cache via timestamp query parameters (`?_t=Date.now()`).
  - **Multi-Engine Audio Haptics (`NkaiAudio`)**: Subtle mechanical clicks and triad chimes using Web Audio API with automatic fallback to procedural Base64 PCM WAVs, persistent mute toggle, and visual ripple animation.
  - **2x2 Decision Matrix**: Visual impact-vs-effort quadrant view for rapid milestone triage.
  - **Strict-Mode Event Fix**: Decoupled `switchTab()` from implicit global `event`.

---

## 4. DOM Hook Contracts

To ensure automated codemods can safely upgrade sidecars, N'kai defines the following standardized DOM hooks:

### Hook 1: Header Shell & Utility Cluster
```html
<!-- Hook: header.app-header -->
<header class="app-header">
  <div class="brand-title">...</div>
  <div class="header-modes">...</div>
  <!-- Hook: div.header-controls -->
  <div class="header-controls">
    <button class="header-btn blue" onclick="toggleDrawer('roadmap-drawer')">🗺️ Roadmap <span class="badge badge-blue">v0.4.0</span></button>
    <button class="header-btn amber" onclick="toggleDrawer('sessions-drawer')">📦 Sessions <span class="badge badge-amber">1 PAUSED</span></button>
    <div class="zoom-group">...</div>
    <button id="header-mute-btn" class="header-btn green" onclick="toggleAudioMute()">🔊 Sound: ON</button>
    <button class="header-btn" onclick="forceReloadCanvas(this)" title="Force Refresh">🔄</button>
  </div>
</header>
```

### Hook 2: Slide-Over Drawers & Overlay
```html
<!-- Injected immediately after </header> -->
<div class="drawer-overlay" id="drawer-overlay" onclick="closeAllDrawers()"></div>

<div class="slide-drawer" id="roadmap-drawer">
  <!-- Dynamically populated or rendered via NkaiDataLoader -->
</div>

<div class="slide-drawer" id="sessions-drawer">
  <!-- Populated from sessions_manifest.data.js -->
</div>
```

### Hook 3: Universal Data Loader
```javascript
// Injected into <script> block
class NkaiDataLoader {
  static async load(key, scriptPath, apiPath = `/api/${key}`) {
    window.NKAI_DATA = window.NKAI_DATA || {};
    if (window.NKAI_DATA[key]) return window.NKAI_DATA[key];

    if (window.location.protocol === 'http:' || window.sidecar) {
      const res = await fetch(apiPath);
      return (window.NKAI_DATA[key] = await res.json());
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptPath;
      script.onload = () => resolve(window.NKAI_DATA[key]);
      script.onerror = () => reject(new Error(`Failed to load ${scriptPath}`));
      document.head.appendChild(script);
    });
  }
}
```

### Hook 4: Cache-Busting Refresh
```javascript
function forceReloadCanvas(btn) {
  if (btn) btn.classList.add('is-spinning');
  setTimeout(() => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('_t', Date.now());
      window.location.replace(url.toString());
    } catch(e) {
      window.location.reload();
    }
  }, 50);
}
```

---

## 5. Migration Action Plan: Upgrading `TheKlangSuite` UI/UX Board

When ready to upgrade `c:\Dev\TheKlangSuite\.agents\sidecar\ui_ux_research_board.html` to N'kai v1.1.0:

1. **Pre-flight Snapshot**:
   ```bash
   cp c:\Dev\TheKlangSuite\.agents\sidecar\ui_ux_research_board.html c:\Dev\TheKlangSuite\.agents\sidecar\ui_ux_research_board.v1.0.0.bak
   ```
2. **Execute Automated Codemod**:
   ```bash
   python c:\Dev\nkai\tools\upgrade_sidecar.py --target c:\Dev\TheKlangSuite\.agents\sidecar\ui_ux_research_board.html --to v1.1.0
   ```
3. **Automated Verification**:
   The migrator asserts:
   - All 23 research sections and 7 workshop items are preserved intact.
   - `<div>` tags balance with 100% precision (`opens == closes`, diff = 0).
   - All interactive controls (`goToContext`, `setVerdict`, `toggleDrawer`, `forceReloadCanvas`) are validated.
4. **Deploy & Mirror**:
   Sync to Antigravity brain artifact directory and verify in IDE webview.
