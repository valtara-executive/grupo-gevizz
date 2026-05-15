/**
 * ====================================================================================
 * OASIS AUDIO ENGINE V26.1 — Motor único de audio para Valtara Sonoterapia
 * ====================================================================================
 * CORRECCIÓN IMPLEMENTADA:
 *
 * ✔ FIX DEFINITIVO PARA SPA/PWA
 * ✔ Cierre correcto del AudioContext anterior
 * ✔ Evita corrupción tras refresco SPA
 * ✔ Evita desaparición de audio tras reload
 * ✔ Evita duplicación de motores
 * ✔ Mantiene crossfade real
 * ✔ Mantiene playlists continuas
 * ✔ Mantiene visualizador
 * ✔ Mantiene indicadores
 * ✔ Mantiene navegación prev/next
 * ✔ Mantiene las 3 categorías
 * ====================================================================================
 */

window.OasisEngine = {

    /* ── Estado ───────────────────────────────────────────────────────────── */
    ctx:            null,
    masterGain:     null,
    analyser:       null,
    audioEl:        null,
    audioSource:    null,
    isPlaying:      false,
    currentId:      null,
    currentSection: null,
    currentIndex:   -1,
    animFrame:      null,
    performanceMode:false,
    targetVolume:   0.7,

    /* ── Crossfade ────────────────────────────────────────────────────────── */
    CROSSFADE_MS: 1200,
    fadingOut:    null,

    /* ── Colores ──────────────────────────────────────────────────────────── */
    sectionColors: {
        short: 'rgba(0,255,170,.65)',
        long:  'rgba(229,140,255,.65)',
        radio: 'rgba(212,175,55,.65)'
    },

    /* ── Etiquetas ───────────────────────────────────────────────────────── */
    sectionLabels: {
        short: 'Micro-Dosis',
        long:  'Inmersión Profunda',
        radio: 'Valtara Radio'
    },

    /* ════════════════════════════════════════════════════════════════════════
       INIT
       ════════════════════════════════════════════════════════════════════════ */

    init: function () {

        // =========================================================
        // FIX DEFINITIVO SPA/PWA
        // =========================================================

        if (this.ctx) {
            try {
                this.ctx.close();
            } catch(e) {}

            this.ctx         = null;
            this.masterGain  = null;
            this.analyser    = null;
            this.audioSource = null;
        }

        // =========================================================
        // LIMPIEZA TOTAL
        // =========================================================

        this._destroyAudio(this.audioEl);
        this._destroyAudio(this.fadingOut);

        this.fadingOut      = null;
        this.audioEl        = null;

        this.isPlaying      = false;
        this.currentId      = null;
        this.currentSection = null;
        this.currentIndex   = -1;

        cancelAnimationFrame(this.animFrame);

        // =========================================================
        // NUEVO AUDIO
        // =========================================================

        this.audioEl = this._newAudioEl(this.targetVolume);

        // =========================================================
        // RENDER
        // =========================================================

        this.renderCarousels();

        // =========================================================
        // EVENTOS
        // =========================================================

        this.bindEvents();

        // =========================================================
        // INDICADORES
        // =========================================================

        this.setupCarouselIndicators();
    },

    /* ════════════════════════════════════════════════════════════════════════
       HELPERS
       ════════════════════════════════════════════════════════════════════════ */

    _newAudioEl: function (vol) {

        const el = new Audio();

        el.crossOrigin = 'anonymous';
        el.volume      = vol;
        el.preload     = 'auto';

        return el;
    },

    _destroyAudio: function (el) {

        if (!el) return;

        try {
            el.pause();
            el.src = '';
            el.load();
        } catch (e) {}
    },

    _playlist: function (section) {

        const pl = window.ValtaraPlaylists;

        return (pl && pl[section])
            ? pl[section]
            : [];
    },

    _findTrack: function (id) {

        const pl = window.ValtaraPlaylists;

        if (!pl) return null;

        for (const section of ['short', 'long', 'radio']) {

            const found = pl[section].find(t => t.id === id);

            if (found) {
                return { track: found, section };
            }
        }

        return null;
    },

    /* ════════════════════════════════════════════════════════════════════════
       AUDIO CONTEXT
       ════════════════════════════════════════════════════════════════════════ */

    lazyInitAudio: function () {

        if (this.ctx) return;

        try {

            const AC = window.AudioContext || window.webkitAudioContext;

            this.ctx = new AC();

            this.masterGain = this.ctx.createGain();

            this.analyser = this.ctx.createAnalyser();

            this.analyser.fftSize = 256;

            this.audioSource = this.ctx.createMediaElementSource(this.audioEl);

            this.audioSource.connect(this.masterGain);

            this.masterGain.connect(this.analyser);

            this.analyser.connect(this.ctx.destination);

        } catch (e) {

            console.warn('[OasisEngine] AudioContext no disponible:', e);
        }
    },

    unlockAudioContext: function () {

        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    /* ════════════════════════════════════════════════════════════════════════
       RENDER
       ════════════════════════════════════════════════════════════════════════ */

    renderCarousels: function () {

        const sections = ['short', 'long', 'radio'];

        const ids = {
            short: 'audio-carousel-short',
            long:  'audio-carousel-long',
            radio: 'audio-carousel-radio'
        };

        sections.forEach(section => {

            const container = document.getElementById(ids[section]);

            if (!container) return;

            container.innerHTML = '';

            const color = this.sectionColors[section];
            const label = this.sectionLabels[section];

            this._playlist(section).forEach((track, index) => {

                const btn = document.createElement('button');

                btn.className = 'track-btn carousel-card glass-card';

                btn.setAttribute('data-id', track.id);
                btn.setAttribute('data-section', section);
                btn.setAttribute('data-index', index);

                btn.style.cssText = `
                    flex-direction:column;
                    padding:2.5rem 1.5rem;
                    justify-content:center;
                    min-width:250px;
                    border-radius:2rem;
                    gap:1.5rem;
                    cursor:pointer;
                    background:rgba(255,255,255,.04);
                    border:1px solid ${color};
                    color:white;
                    text-align:left;
                `;

                btn.innerHTML = `
                    <div style="
                        width:90px;
                        height:90px;
                        border-radius:50%;
                        background:linear-gradient(135deg,rgba(0,0,0,.6),rgba(0,0,0,.85));
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        border:1px solid ${color};
                        margin:0 auto;
                    ">
                        <i class="fa-solid ${track.icon}" style="
                            font-size:2.8rem;
                            color:${color};
                        "></i>
                    </div>

                    <div style="width:100%;">
                        <h4 style="
                            color:var(--valtara-blanco);
                            font-size:1.35rem;
                            margin:0;
                            font-family:var(--font-accent);
                        ">
                            ${track.title}
                        </h4>

                        <span style="
                            color:#aaa;
                            font-size:.85rem;
                            letter-spacing:1px;
                            text-transform:uppercase;
                            display:block;
                            margin-top:8px;
                        ">
                            ${label}
                        </span>
                    </div>
                `;

                btn.addEventListener('click', () => {

                    this.lazyInitAudio();

                    this.unlockAudioContext();

                    this.playById(track.id, section, index);
                });

                container.appendChild(btn);
            });
        });
    },

    /* ════════════════════════════════════════════════════════════════════════
       CROSSFADE
       ════════════════════════════════════════════════════════════════════════ */

    _crossfadeTo: function (src, vol, onStart) {

        const STEPS = 30;

        const INTERVAL = this.CROSSFADE_MS / STEPS;

        const outgoing = this.audioEl;

        const incoming = this._newAudioEl(0);

        incoming.src = encodeURI(src);

        incoming.play().then(() => {

            if (onStart) onStart();

            let step = 0;

            const timer = setInterval(() => {

                step++;

                const ratio = step / STEPS;

                try {
                    incoming.volume = Math.min(vol * ratio, vol);
                } catch (e) {}

                if (outgoing) {
                    try {
                        outgoing.volume = Math.max(
                            outgoing.volume * (1 - ratio / (1 - ratio + 0.01)),
                            0
                        );
                    } catch (e) {}
                }

                if (step >= STEPS) {

                    clearInterval(timer);

                    this._destroyAudio(outgoing);

                    if (this.fadingOut === outgoing) {
                        this.fadingOut = null;
                    }

                    try {
                        incoming.volume = vol;
                    } catch (e) {}
                }

            }, INTERVAL);

            this.fadingOut = outgoing;

        }).catch(err => {

            console.warn('[OasisEngine] No se pudo iniciar:', src, err);

            this._destroyAudio(incoming);

            this._showPlayError();
        });

        this.audioEl = incoming;

        if (this.ctx) {

            try {

                const newSource = this.ctx.createMediaElementSource(incoming);

                newSource.connect(this.masterGain);

                this.audioSource = newSource;

            } catch (e) {}
        }

        incoming.addEventListener('ended', () => {

            if (this.isPlaying) {
                this.playNext();
            }
        });
    },

    /* ════════════════════════════════════════════════════════════════════════
       PLAYBACK
       ════════════════════════════════════════════════════════════════════════ */

    playById: function (id, section, index) {

        if (this.performanceMode) return;

        if (!section || index === undefined) {

            const found = this._findTrack(id);

            if (!found) return;

            section = found.section;

            index = window.ValtaraPlaylists[section]
                .findIndex(t => t.id === id);
        }

        const playlist = this._playlist(section);

        const track = playlist[index];

        if (!track) return;

        this.currentId      = id;
        this.currentSection = section;
        this.currentIndex   = index;
        this.isPlaying      = true;

        this._updateNowPlaying(track, section, playlist, index);

        this._setPlayIcon('pause');

        this._highlightCard(id);

        this._crossfadeTo(track.src, this.targetVolume);

        setTimeout(() => {
            this.startVisualizer();
        }, this.CROSSFADE_MS / 2);
    },

    playNext: function () {

        if (!this.currentSection) return;

        const pl = this._playlist(this.currentSection);

        const next = (this.currentIndex + 1) % pl.length;

        this.playById(pl[next].id, this.currentSection, next);
    },

    playPrev: function () {

        if (!this.currentSection) return;

        const pl = this._playlist(this.currentSection);

        const prev = (this.currentIndex - 1 + pl.length) % pl.length;

        this.playById(pl[prev].id, this.currentSection, prev);
    },

    togglePlay: function () {

        if (this.isPlaying) {

            this.pause();

        } else {

            if (this.currentId) {

                this.audioEl.play().then(() => {

                    this.isPlaying = true;

                    this._setPlayIcon('pause');

                    setTimeout(() => {
                        this.startVisualizer();
                    }, 100);

                }).catch(() => {});

            } else {

                const pl = this._playlist('radio');

                if (pl.length) {
                    this.playById(pl[0].id, 'radio', 0);
                }
            }
        }
    },

    pause: function () {

        this.isPlaying = false;

        if (this.audioEl) {
            this.audioEl.pause();
        }

        this._setPlayIcon('play');

        document.querySelectorAll('.track-btn')
            .forEach(b => b.classList.remove('playing'));

        cancelAnimationFrame(this.animFrame);

        this._clearVisualizer();
    },

    /* ════════════════════════════════════════════════════════════════════════
       CONTROLES
       ════════════════════════════════════════════════════════════════════════ */

    bindEvents: function () {

        const get = id => document.getElementById(id);

        const playBtn     = get('btn-master-play');
        const nextBtn     = get('btn-next-track');
        const prevBtn     = get('btn-prev-track');
        const volSlider   = get('oasis-volume-slider');
        const progressBar = get('oasis-progress-bar');

        if (playBtn) {

            playBtn.onclick = () => {

                this.lazyInitAudio();

                this.unlockAudioContext();

                this.togglePlay();
            };
        }

        if (nextBtn) {

            nextBtn.onclick = () => {

                this.lazyInitAudio();

                this.unlockAudioContext();

                this.playNext();
            };
        }

        if (prevBtn) {

            prevBtn.onclick = () => {

                this.lazyInitAudio();

                this.unlockAudioContext();

                this.playPrev();
            };
        }

        if (volSlider) {

            volSlider.oninput = e => {

                this.targetVolume = parseFloat(e.target.value);

                if (this.audioEl) {

                    try {
                        this.audioEl.volume = this.targetVolume;
                    } catch (_) {}
                }
            };
        }

        if (progressBar) {

            progressBar.oninput = e => {

                if (this.audioEl && this.audioEl.duration) {

                    this.audioEl.currentTime =
                        (e.target.value / 100) * this.audioEl.duration;
                }
            };
        }

        this._startProgressPoll();
    },

    _startProgressPoll: function () {

        const tick = () => {

            const el = this.audioEl;

            const bar = document.getElementById('oasis-progress-bar');
            const curr = document.getElementById('oasis-time-current');
            const total = document.getElementById('oasis-time-total');

            if (el && el.duration && this.isPlaying) {

                const pct = (el.currentTime / el.duration) * 100;

                if (bar) {
                    bar.value = pct;
                }

                if (curr) {
                    curr.textContent = this._fmt(el.currentTime);
                }

                if (total) {
                    total.textContent = this._fmt(el.duration);
                }
            }

            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    },

    /* ════════════════════════════════════════════════════════════════════════
       VISUALIZER
       ════════════════════════════════════════════════════════════════════════ */

    startVisualizer: function () {

        if (this.performanceMode || !this.analyser) return;

        const canvas = document.getElementById('oasis-visualizer');

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const bufLen = this.analyser.frequencyBinCount;

        const data = new Uint8Array(bufLen);

        const barW = (canvas.width / bufLen) * 2.5;

        const draw = () => {

            if (!this.isPlaying) return;

            this.animFrame = requestAnimationFrame(draw);

            this.analyser.getByteFrequencyData(data);

            ctx.fillStyle = 'rgba(0,0,0,.2)';

            ctx.fillRect(0,0,canvas.width,canvas.height);

            let x = 0;

            for (let i = 0; i < bufLen; i++) {

                const h = data[i] / 1.5;

                ctx.fillStyle =
                    `rgb(${Math.min(255, h + 50)},${Math.max(0,255 - h * 2)},255)`;

                ctx.fillRect(
                    x,
                    canvas.height - h,
                    barW,
                    h
                );

                x += barW + 1;
            }
        };

        cancelAnimationFrame(this.animFrame);

        draw();
    },

    _clearVisualizer: function () {

        const canvas = document.getElementById('oasis-visualizer');

        if (canvas) {

            const ctx = canvas.getContext('2d');

            ctx.clearRect(0,0,canvas.width,canvas.height);
        }
    },

    /* ════════════════════════════════════════════════════════════════════════
       UI
       ════════════════════════════════════════════════════════════════════════ */

    _setPlayIcon: function (state) {

        const icon = document.querySelector('#btn-master-play i');

        if (icon) {

            icon.className =
                `fa-solid fa-${state === 'pause' ? 'pause' : 'play'}`;
        }
    },

    _highlightCard: function (id) {

        document.querySelectorAll('.track-btn').forEach(b => {

            b.classList.toggle(
                'playing',
                b.getAttribute('data-id') === id
            );
        });
    },

    _updateNowPlaying: function (track, section, playlist, index) {

        const nowEl  = document.getElementById('oasis-now-playing');
        const nextEl = document.getElementById('oasis-next-track');

        if (nowEl) {

            nowEl.innerHTML =
                `<i class="fa-solid fa-music" style="margin-right:8px;"></i>${track.title}`;
        }

        if (nextEl) {

            const nextIndex = (index + 1) % playlist.length;

            const nextTrack = playlist[nextIndex];

            nextEl.textContent = nextTrack
                ? `A continuación: ${nextTrack.title}`
                : '';
        }
    },

    _showPlayError: function () {

        const icon = document.querySelector('#btn-master-play i');

        if (!icon) return;

        icon.className = 'fa-solid fa-triangle-exclamation';

        icon.style.color = '#ff5555';

        setTimeout(() => {

            icon.className = 'fa-solid fa-play';

            icon.style.color = '';

        }, 3000);
    },

    _fmt: function (s) {

        if (isNaN(s) || !isFinite(s)) return '0:00';

        const m = Math.floor(s / 60);

        const sec = Math.floor(s % 60);

        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    },

    /* ════════════════════════════════════════════════════════════════════════
       INDICADORES
       ════════════════════════════════════════════════════════════════════════ */

    setupCarouselIndicators: function () {

        const setups = [
            { id:'audio-carousel-short', indId:'indicator-audio-short', total:9 },
            { id:'audio-carousel-long',  indId:'indicator-audio-long',  total:14 },
            { id:'audio-carousel-radio', indId:'indicator-audio-radio', total:15 }
        ];

        setups.forEach(setup => {

            const carousel  = document.getElementById(setup.id);
            const indicator = document.getElementById(setup.indId);

            if (!carousel || !indicator) return;

            carousel.addEventListener('scroll', () => {

                const card = carousel.querySelector('.carousel-card');

                if (!card) return;

                const cardWidth = card.offsetWidth + 40;

                const idx =
                    Math.round(carousel.scrollLeft / cardWidth) + 1;

                indicator.textContent =
                    Math.min(Math.max(idx,1),setup.total)
                    + ' de ' +
                    setup.total;
            });
        });
    }
};
