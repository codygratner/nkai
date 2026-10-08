let currentMode = 'workshop';
    let currentHeroId = '1.1';

    const triageData = {
      '1.1': { title: 'Monolithic Titanium Faceplate', verdict: null, note: '' },
      '1.2': { title: 'Hybrid 6-8 Desktop / TBD Banking', verdict: null, note: '' },
      '1.3': { title: 'Reclaiming Screen Real Estate', verdict: null, note: '' },
      '2.1': { title: '45° Flow-Traced Signal Paths', verdict: null, note: '' },
      '2.2': { title: 'Teenage Engineering Vector Glyphs', verdict: null, note: '' },
      '3.1': { title: 'Vertical Arcade Rhythm Fader Strip', verdict: null, note: '' },
      '3.2': { title: 'Tactile Magnetic Snap Detents', verdict: null, note: '' }
    };

    function switchMode(mode) {
      currentMode = mode;
      document.querySelectorAll('.mode-wrapper').forEach(w => w.classList.remove('active'));
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));

      const target = document.getElementById(mode + '-mode');
      const btn = document.getElementById('btn-' + mode);
      if (target) target.classList.add('active');
      if (btn) btn.classList.add('active');

      updateFab();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateFab() {
      const fab = document.getElementById('fab-action');
      const fabText = document.getElementById('fab-text');
      const fabIcon = document.getElementById('fab-icon');
      if (!fab) return;

      if (currentMode === 'workshop') {
        fab.classList.add('ctx-mode');
        fabIcon.textContent = '🔍';
        fabText.textContent = 'See in Context';
      } else {
        fab.classList.remove('ctx-mode');
        fabIcon.textContent = '🔙';
        fabText.textContent = 'Back to Workshop';
      }
    }

    function handleFabClick() {
      if (currentMode === 'workshop') {
        const contextMap = {
          '1.1': { mode: 'layouts', section: 'sec-monolithic' },
          '1.2': { mode: 'layouts', section: 'sec-monolithic' },
          '1.3': { mode: 'layouts', section: 'sec-monolithic' },
          '2.1': { mode: 'layouts', section: 'sec-traces' },
          '2.2': { mode: 'layouts', section: 'sec-glyphs' },
          '3.1': { mode: 'layouts', section: 'sec-faders' },
          '3.2': { mode: 'layouts', section: 'sec-faders' }
        };
        const target = contextMap[currentHeroId] || { mode: 'layouts', section: 'sec-monolithic' };
        goToContext(target.mode, target.section);
      } else {
        switchMode('workshop');
      }
    }

    function goToContext(modeId, sectionId) {
      switchMode(modeId);
      setTimeout(() => {
        showSection(modeId, sectionId);
      }, 50);
    }

    function showHeroItem(itemId) {
      currentHeroId = itemId;
      document.querySelectorAll('.hero-stage-panel').forEach(p => p.classList.add('hidden'));
      document.querySelectorAll('#workshop-mode .nav-item').forEach(b => b.classList.remove('active'));

      const target = document.getElementById('hero-stage-' + itemId);
      if (target) target.classList.remove('hidden');

      const navItem = document.getElementById('nav-item-' + itemId);
      if (navItem) navItem.classList.add('active');

      updateFab();
    }

    function showSection(modeId, sectionId) {
      if (!sectionId) {
        sectionId = modeId;
        modeId = currentMode;
      }
      const modeWrapper = document.getElementById(modeId + '-mode');
      if (modeWrapper) {
        modeWrapper.querySelectorAll('.nav-item').forEach(n => {
          n.classList.remove('active');
          const oc = n.getAttribute('onclick') || '';
          if (oc.includes(sectionId)) {
            n.classList.add('active');
          }
        });
      }
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    function showDspSection(id) { showSection('dsp', id); }
    function showBlueSection(id) { showSection('blue', id); }
    function showTbdSection(id) { showSection('tbd', id); }
    function showPmSection(id) { showSection('pm', id); }

    function setVerdict(itemId, verdict, note) {
      if (!triageData[itemId]) return;
      triageData[itemId].verdict = verdict;
      triageData[itemId].note = note;

      const b = document.getElementById('badge-' + itemId);
      if (b) {
        b.textContent = verdict;
        b.className = 'badge ' + (verdict === 'APPROVE' ? 'good' : (verdict === 'TABLE' ? 'warn' : 'bad'));
      }

      ['APPROVE', 'TABLE', 'KILL'].forEach(v => {
        const card = document.getElementById(`card-${itemId}-${v}`);
        if (card) {
          if (v === verdict) {
            card.style.outline = '2px solid ' + (v === 'APPROVE' ? '#10b981' : (v === 'TABLE' ? '#f59e0b' : '#ef4444'));
            card.style.transform = 'scale(1.02)';
          } else {
            card.style.outline = 'none';
            card.style.transform = 'scale(1)';
          }
        }
      });

      updateComposer();
      updateScorecard();
    }

    function updateComposer() {
      const lines = ['# POST-MORTEM TRIAGE VERDICTS\n'];
      let count = 0;
      for (const [id, data] of Object.entries(triageData)) {
        if (data.verdict) {
          count++;
          lines.push(`- Item ${id} (${data.title}): [ ${data.verdict} ] - ${data.note}`);
        }
      }
      const ta = document.getElementById('triage-output');
      if (ta) {
        if (count === 0) {
          ta.value = "Click any option card above to assign verdicts, or type freely in chat!";
        } else {
          ta.value = lines.join('\n');
        }
      }
    }

    function updateScorecard() {
      let app = 0, tab = 0, kil = 0;
      for (const k in triageData) {
        if (triageData[k].verdict === 'APPROVE') app++;
        else if (triageData[k].verdict === 'TABLE') tab++;
        else if (triageData[k].verdict === 'KILL') kil++;
      }
      const sa = document.getElementById('score-approved');
      const st = document.getElementById('score-tabled');
      const sk = document.getElementById('score-killed');
      if (sa) sa.textContent = `✅ Approved: ${app}`;
      if (st) st.textContent = `⏳ Tabled: ${tab}`;
      if (sk) sk.textContent = `💀 Killed: ${kil}`;
    }

    function copyVerdictsToClipboard() {
      const ta = document.getElementById('triage-output');
      if (!ta) return;
      navigator.clipboard.writeText(ta.value).then(() => {
        const btn = document.querySelector('button[onclick="copyVerdictsToClipboard()"]');
        if (btn) {
          const orig = btn.innerHTML;
          btn.innerHTML = '<span>✅ Copied!</span>';
          setTimeout(() => { btn.innerHTML = orig; }, 2000);
        }
      });
    }

    let zoomLevel = 100;
    function changeFontSize(delta) {
      zoomLevel = Math.max(75, Math.min(140, zoomLevel + (delta * 5)));
      document.body.style.fontSize = (zoomLevel / 100) + 'rem';
      const el = document.getElementById('font-zoom-level');
      if (el) el.textContent = zoomLevel + '%';
      localStorage.setItem('sidecar_font_zoom', zoomLevel);
    }
    const savedZoom = localStorage.getItem('sidecar_font_zoom');
    if (savedZoom) {
      zoomLevel = parseInt(savedZoom, 10);
      document.body.style.fontSize = (zoomLevel / 100) + 'rem';
      const el = document.getElementById('font-zoom-level');
      if (el) el.textContent = zoomLevel + '%';
    }

    /* Simulators */
    function toggleFaceplate(mode) {
      const d = document.getElementById('sim-faceplate-display');
      const bCards = document.getElementById('sim-btn-cards');
      const bMono = document.getElementById('sim-btn-mono');
      if (!d) return;

      if (mode === 'cards') {
        bCards.style.borderColor = '#f43f5e';
        bCards.style.backgroundColor = '#270811';
        bCards.style.color = '#fda4af';
        bMono.style.borderColor = '#2d1b28';
        bMono.style.backgroundColor = '#140e16';
        bMono.style.color = '#94a3b8';

        d.innerHTML = `
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; font-family: monospace; font-size: 10px;">
            <div class="card" style="padding: 10px; margin: 0; text-align: center;">Voice 1 Core<br><span style="color: #64748b; font-size: 9px;">4 Knobs</span></div>
            <div class="card" style="padding: 10px; margin: 0; text-align: center;">Voice 1 Env<br><span style="color: #64748b; font-size: 9px;">4 Knobs</span></div>
            <div class="card" style="padding: 10px; margin: 0; text-align: center;">Voice 1 Filter<br><span style="color: #64748b; font-size: 9px;">4 Knobs</span></div>
            <div class="card" style="padding: 10px; margin: 0; text-align: center; border-style: dashed; opacity: 0.4;">[ EMPTY ]</div>
            <div class="card" style="padding: 10px; margin: 0; text-align: center; border-style: dashed; opacity: 0.4;">[ EMPTY ]</div>
            <div class="card" style="padding: 10px; margin: 0; text-align: center;">Voice 2 Core<br><span style="color: #64748b; font-size: 9px;">4 Knobs</span></div>
            <div class="card" style="padding: 10px; margin: 0; text-align: center;">Voice 2 Filter<br><span style="color: #64748b; font-size: 9px;">4 Knobs</span></div>
            <div class="card" style="padding: 10px; margin: 0; text-align: center; border-style: dashed; opacity: 0.4;">[ EMPTY ]</div>
            <div class="card" style="padding: 10px; margin: 0; text-align: center; border-style: dashed; opacity: 0.4;">[ EMPTY ]</div>
            <div class="card" style="padding: 10px; margin: 0; text-align: center;">Master Out<br><span style="color: #64748b; font-size: 9px;">4 Knobs</span></div>
          </div>
          <p style="color: #f87171; font-size: 11px; margin-top: 10px; text-align: center; font-family: monospace;">⚠️ 4 out of 10 cards (40%) are dead gray slots. Circuits split unnaturally across card borders.</p>
        `;
      } else {
        bMono.style.borderColor = '#f43f5e';
        bMono.style.backgroundColor = '#270811';
        bMono.style.color = '#fda4af';
        bCards.style.borderColor = '#2d1b28';
        bCards.style.backgroundColor = '#140e16';
        bCards.style.color = '#94a3b8';

        d.innerHTML = `
          <div style="background: #111620; padding: 12px; border-radius: 8px; border: 1px solid #1e293b; display: flex; gap: 10px; font-family: monospace; font-size: 10px;">
            <div style="flex: 1; background: #0a0d13; padding: 10px; border-radius: 6px; border: 1px solid #1e293b;">
              <strong style="color: #38bdf8;">// 01 UNIFIED FM CORE</strong>
              <div style="color: #94a3b8; font-size: 9px; margin-top: 4px;">Carrier • Ratio • Mod Depth • Mod Ratio • Feedback • Shape</div>
            </div>
            <div style="flex: 1; background: #0a0d13; padding: 10px; border-radius: 6px; border: 1px solid #1e293b;">
              <strong style="color: #f43f5e;">// 02 DUAL FILTER &amp; DRIVE</strong>
              <div style="color: #94a3b8; font-size: 9px; margin-top: 4px;">Cutoff • Resonance • Acid Bite • Drive • Slope • Mix</div>
            </div>
            <div style="flex: 1; background: #0a0d13; padding: 10px; border-radius: 6px; border: 1px solid #1e293b;">
              <strong style="color: #eab308;">// 03 TRANSIENT &amp; PUNCH</strong>
              <div style="color: #94a3b8; font-size: 9px; margin-top: 4px;">Attack • Curve • Seismic Spike • Click Amount</div>
            </div>
            <div style="width: 100px; background: #0a0d13; padding: 10px; border-radius: 6px; border: 1px solid #1e293b; text-align: center;">
              <strong style="color: #3fb950;">// SUM</strong>
              <div style="color: #94a3b8; font-size: 9px; margin-top: 4px;">4x Faders</div>
            </div>
          </div>
          <p style="color: #34d399; font-size: 11px; margin-top: 10px; text-align: center; font-family: monospace;">✨ Zero blank cards. 100% purposeful surface area with milled hairline grooves between circuits.</p>
        `;
      }
    }

    function toggleTbdView(view) {
      const d = document.getElementById('sim-tbd-display');
      const bDesk = document.getElementById('sim-btn-desk');
      const bHw = document.getElementById('sim-btn-hw');
      if (!d) return;

      if (view === 'desktop') {
        bDesk.style.borderColor = '#f43f5e';
        bDesk.style.backgroundColor = '#270811';
        bDesk.style.color = '#fda4af';
        bHw.style.borderColor = '#2d1b28';
        bHw.style.backgroundColor = '#140e16';
        bHw.style.color = '#94a3b8';

        d.innerHTML = `
          <div style="font-family: monospace; font-size: 11px;">
            <strong style="color: #fff;">Desktop UI: Unified FM Core (6 Knobs in 1 Bay)</strong>
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-top: 8px; text-align: center;">
              <div class="card" style="padding: 8px; margin: 0; color: #38bdf8; border-color: #38bdf8;">Carrier Shape</div>
              <div class="card" style="padding: 8px; margin: 0; color: #38bdf8; border-color: #38bdf8;">Coarse Ratio</div>
              <div class="card" style="padding: 8px; margin: 0; color: #38bdf8; border-color: #38bdf8;">Mod Depth</div>
              <div class="card" style="padding: 8px; margin: 0; color: #38bdf8; border-color: #38bdf8;">Mod Shape</div>
              <div class="card" style="padding: 8px; margin: 0; color: #38bdf8; border-color: #38bdf8;">Mod Ratio</div>
              <div class="card" style="padding: 8px; margin: 0; color: #38bdf8; border-color: #38bdf8;">Feedback</div>
            </div>
            <p style="color: #94a3b8; font-size: 10px; margin-top: 8px;">Sound designer tweaks Carrier and Modulator simultaneously on desktop without paging.</p>
          </div>
        `;
      } else {
        bHw.style.borderColor = '#f43f5e';
        bHw.style.backgroundColor = '#270811';
        bHw.style.color = '#fda4af';
        bDesk.style.borderColor = '#2d1b28';
        bDesk.style.backgroundColor = '#140e16';
        bDesk.style.color = '#94a3b8';

        d.innerHTML = `
          <div style="font-family: monospace; font-size: 11px;">
            <strong style="color: #34d399;">TBD-16 Hardware: Firmware Auto-Chunks JSON into Banked Quads</strong>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px;">
              <div class="card" style="padding: 8px; margin: 0; border-color: #059669; background: #06201a;">
                <span class="badge good" style="margin-bottom: 4px;">Page 1A: Carrier Bank</span>
                <div style="font-size: 10px; color: #cbd5e1; margin-top: 4px;">E1: Shape • E2: Coarse • E3: Mod Depth • E4: Mod Shape</div>
              </div>
              <div class="card" style="padding: 8px; margin: 0; border-color: #059669; background: #06201a;">
                <span class="badge good" style="margin-bottom: 4px;">Page 1B: Modulator Bank</span>
                <div style="font-size: 10px; color: #cbd5e1; margin-top: 4px;">E1: Mod Ratio • E2: Feedback • E3: [Empty] • E4: [Empty]</div>
              </div>
            </div>
            <p style="color: #a7f3d0; font-size: 10px; margin-top: 8px;">Zero C++ rewriting needed: hardware engine auto-pages JSON groups with deterministic [A/B] toggling.</p>
          </div>
        `;
      }
    }

    function triggerTracesPulse() {
      const trace1 = document.getElementById('circuit-trace-audio');
      const trace2 = document.getElementById('circuit-trace-mod');
      if (trace1) {
        trace1.style.filter = 'drop-shadow(0 0 10px #38bdf8)';
        trace1.setAttribute('stroke-width', '4');
        setTimeout(() => {
          trace1.style.filter = 'none';
          trace1.setAttribute('stroke-width', '2');
        }, 300);
      }
      if (trace2) {
        trace2.style.filter = 'drop-shadow(0 0 10px #f43f5e)';
        trace2.setAttribute('stroke-width', '4');
        setTimeout(() => {
          trace2.style.filter = 'none';
          trace2.setAttribute('stroke-width', '2');
        }, 400);
      }
    }

    function updatePolarRose(k) {
      const path = document.getElementById('svg-polar-rose');
      const label = document.getElementById('label-rose-val');
      if (label) label.textContent = k;
      if (!path) return;

      const points = [];
      const numPts = 100;
      const rScale = 35;
      const cx = 50, cy = 50;

      for (let i = 0; i <= numPts; i++) {
        const theta = (i / numPts) * 2 * Math.PI;
        const r = Math.cos(k * theta) * rScale;
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      points.push('Z');
      path.setAttribute('d', points.join(' '));
    }

    function updateAcidJaw(q) {
      const path = document.getElementById('svg-acid-jaw');
      const label = document.getElementById('label-jaw-val');
      if (label) label.textContent = q + '%';
      if (!path) return;

      const peakY = 80 - (q / 100) * 65;
      const d = `M 10 70 Q 50 70 58 ${peakY + 10} Q 60 ${peakY} 62 ${peakY + 10} Q 70 75 110 75`;
      path.setAttribute('d', d);
    }

    function updatePunchSpike(attack) {
      const path = document.getElementById('svg-punch-spike');
      const label = document.getElementById('label-spike-val');
      if (label) label.textContent = attack + ' ms';
      if (!path) return;

      const attackX = 10 + (attack / 30) * 40;
      const d = `M 10 80 L ${attackX.toFixed(1)} 15 Q ${attackX + 20} 30 110 80`;
      path.setAttribute('d', d);
    }

    function toggleFaderBank(bank) {
      const bL = document.getElementById('btn-bank-levels');
      const bD = document.getElementById('btn-bank-decays');
      if (!bL || !bD) return;

      if (bank === 'levels') {
        bL.style.borderColor = '#10b981';
        bL.style.backgroundColor = '#06201a';
        bL.style.color = '#34d399';
        bD.style.borderColor = '#2d1b28';
        bD.style.backgroundColor = '#140e16';
        bD.style.color = '#94a3b8';
        document.getElementById('readout-v1').textContent = '-3.2 dB';
        document.getElementById('readout-v2').textContent = '-6.0 dB';
        document.getElementById('readout-v3').textContent = '-1.5 dB';
        document.getElementById('readout-v4').textContent = '-8.4 dB';
      } else {
        bD.style.borderColor = '#10b981';
        bD.style.backgroundColor = '#06201a';
        bD.style.color = '#34d399';
        bL.style.borderColor = '#2d1b28';
        bL.style.backgroundColor = '#140e16';
        bL.style.color = '#94a3b8';
        document.getElementById('readout-v1').textContent = '420 ms';
        document.getElementById('readout-v2').textContent = '180 ms';
        document.getElementById('readout-v3').textContent = '45 ms';
        document.getElementById('readout-v4').textContent = '850 ms';
      }
    }

    function handleDetentSlider(rawVal) {
      let val = parseFloat(rawVal);
      const hud = document.getElementById('hud-detent-bracket');
      let snapped = false;

      [1.0, 2.0, 3.0, 4.0].forEach(snap => {
        if (Math.abs(val - snap) <= 0.07) {
          val = snap;
          snapped = true;
        }
      });

      if (hud) {
        if (snapped) {
          hud.textContent = `Detent: [ ${val.toFixed(3)}x SNAP ]`;
          hud.style.borderColor = '#059669';
          hud.style.backgroundColor = '#064e3b';
          hud.style.color = '#a7f3d0';
        } else {
          hud.textContent = `Ratio: [ ${val.toFixed(3)}x ]`;
          hud.style.borderColor = '#2d1b28';
          hud.style.backgroundColor = '#1e1320';
          hud.style.color = '#cbd5e1';
        }
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      toggleFaceplate('monolithic');
      toggleTbdView('desktop');
      updatePolarRose(3);
      updateAcidJaw(75);
      updatePunchSpike(2.5);
      updateComposer();
      updateScorecard();
      switchMode('workshop');
      showHeroItem('1.1');
    });