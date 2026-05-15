/**
 * ====================================================================================
 * OASIS AUDIO ENGINE V26 — Motor único de audio para Valtara Sonoterapia
 * ====================================================================================
 *
 * CAMBIOS V26 respecto a V25.1:
 *
 *   1. LEE DESDE window.ValtaraPlaylists (definido en sonoterapia_audio.js)
 *      Ya no tiene tracks hardcodeados. Fuente de verdad centralizada.
 *      Soporta las tres secciones: short (9 pistas), long (14 pistas),
 *      radio (15 pistas).
 *
 *   2. CROSSFADE REAL entre pistas
 *      Al cambiar de pista (manual o automático al terminar la cola),
 *      se crean dos elementos <audio> simultáneos:
 *        - El saliente baja de volumen_actual → 0 en CROSSFADE_MS milisegundos.
 *        - El entrante sube de 0 → volumen_deseado en CROSSFADE_MS milisegundos.
 *      Ambas rampas corren al mismo tiempo. Sin corte, sin silencio intermedio.
 *      El elemento saliente se destruye al terminar su rampa.
 *
 *   3. COLA CONTINUA POR SECCIÓN
 *      Cada sección es una playlist independiente. Al terminar la última pista
 *      vuelve a la primera (loop infinito). El avance automático usa crossfade.
 *
 *   4. PREV / NEXT RESPETAN LA COLA ACTIVA
 *      Si estás en "radio" y pulsas next, avanza dentro de radio.
 *      Si estás en "short" y pulsas prev, retrocede dentro de short.
 *
 *   5. RENDERIZA LAS TRES SECCIONES DE CARRUSEL
 *      audio-carousel-short, audio-carousel-long, audio-carousel-radio.
 *      Cada tarjeta recibe el color de acento de su sección.
 *
 *   6. SIN DOBLE MOTOR
 *      sonoterapia_audio.js ya no define ValtaraAudioEngine.
 *      Este es el único motor. Sin interferencias.
 *
 *   7. SIN ?v=Date.now() EN LAS URLs DE AUDIO
 *      El bypass del SW (sw.js V40.1) garantiza que el audio nunca
 *      pasa por el caché del Service Worker. No se necesita cache-busting.
 *
 * ====================================================================================
 */

window.OasisEngine = {

    /* ── Estado ───────────────────────────────────────────────────────────── */
    ctx:            null,
    masterGain:     null,
    analyser:       null,
    audioEl:        null,       // elemento <audio> activo (el que suena ahora)
    audioSource:    null,       // MediaElementSource del audioEl actual
    isPlaying:      false,
    currentId:      null,       // id de la pista activa  (e.g. 'r1', 'l3', 's5')
    currentSection: null,       // 'short' | 'long' | 'radio'
    currentIndex:   -1,         // índice dentro de la sección activa
    animFrame:      null,
    performanceMode:false,
    targetVolume:   0.7,        // volumen que controla el slider

    /* ── Crossfade ────────────────────────────────────────────────────────── */
    CROSSFADE_MS: 1200,         // duración del fundido en milisegundos
    fadingOut:    null,         // elemento <audio> saliente durante crossfade

    /* ── Colores de acento por sección ───────────────────────────────────── */
    sectionColors: {
        short: 'rgba(0,255,170,.65)',
        long:  'rgba(229,140,255,.65)',
        radio: 'rgba(212,175,55,.65)'
    },

    /* ── Etiquetas de sección ─────────────────────────────────────────────── */
    sectionLabels: {
        short: 'Micro-Dosis',
        long:  'Inmersión Profunda',
        radio: 'Valtara Radio'
    },

    /* ════════════════════════════════════════════════════════════════════════
       INIT — Punto de entrada llamado por constructor_maestro.js
       ════════════════════════════════════════════════════════════════════════ */
    init: function () {

        // Limpiar motor anterior si existe (SPA re-render)
        this._destroyAudio(this.audioEl);
        this._destroyAudio(this.fadingOut);
        this.fadingOut     = null;
        this.audioEl       = null;
        this.audioSource   = null;
        this.ctx           = null;
        this.isPlaying     = false;
        this.currentId     = null;
        this.currentSection= null;
        this.currentIndex  = -1;
        cancelAnimationFrame(this.animFrame);

        // Crear elemento de audio primario
        this.audioEl = this._newAudioEl(this.targetVolume);

        // Renderizar carruseles con datos de ValtaraPlaylists
        this.renderCarousels();

        // Vincular controles del player
        this.bindEvents();
    },

    /* ════════════════════════════════════════════════════════════════════════
       HELPERS INTERNOS
       ════════════════════════════════════════════════════════════════════════ */

    /** Crea un nuevo elemento <audio> limpio con crossOrigin y volumen dado */
    _newAudioEl: function (vol) {
        const el = new Audio();
        el.crossOrigin = 'anonymous';
        el.volume      = vol;
        el.preload     = 'auto';
        return el;
    },

    /** Destruye un elemento <audio> de forma segura */
    _destroyAudio: function (el) {
        if (!el) return;
        try { el.pause(); el.src = ''; el.load(); } catch (e) {}
    },

    /** Retorna la playlist de la sección indicada (array) */
    _playlist: function (section) {
        const pl = window.ValtaraPlaylists;
        return (pl && pl[section]) ? pl[section] : [];
    },

    /** Retorna el track por id buscando en todas las secciones */
    _findTrack: function (id) {
        const pl = window.ValtaraPlaylists;
        if (!pl) return null;
        for (const section of ['short', 'long', 'radio']) {
            const found = pl[section].find(t => t.id === id);
            if (found) return { track: found, section };
        }
        return null;
    },

    /* ════════════════════════════════════════════════════════════════════════
       LAZY INIT AUDIO CONTEXT (solo tras gesto del usuario)
       ════════════════════════════════════════════════════════════════════════ */
    lazyInitAudio: function () {
        if (this.ctx) return;
        try {
            const AC    = window.AudioContext || window.webkitAudioContext;
            this.ctx    = new AC();
            this.masterGain = this.ctx.createGain();
            this.analyser   = this.ctx.createAnalyser();
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
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    },

    /* ════════════════════════════════════════════════════════════════════════
       RENDERIZADO DE CARRUSELES
       ════════════════════════════════════════════════════════════════════════ */
    renderCarousels: function () {
        const sections = ['short', 'long', 'radio'];
        const ids      = {
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
                btn.setAttribute('aria-label', `Reproducir ${track.title}`);
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
                        width:90px;height:90px;border-radius:50%;
                        background:linear-gradient(135deg,rgba(0,0,0,.6),rgba(0,0,0,.85));
                        display:flex;justify-content:center;align-items:center;
                        border:1px solid ${color};
                        box-shadow:inset 0 0 25px ${color.replace('.65)', '.12)')};
                        margin:0 auto;transition:.3s;
                    ">
                        <i class="fa-solid ${track.icon}" style="font-size:2.8rem;color:${color};"></i>
                    </div>
                    <div style="width:100%;">
                        <h4 style="
                            color:var(--valtara-blanco);
                            font-size:1.35rem;margin:0;
                            font-family:var(--font-accent);
                            line-height:1.3;
                        ">${track.title}</h4>
                        <span style="
                            color:#aaa;font-size:.85rem;
                            letter-spacing:1px;text-transform:uppercase;
                            display:block;margin-top:8px;
                        ">${label}</span>
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
       CROSSFADE — el corazón del cambio de pista
       ════════════════════════════════════════════════════════════════════════ */

    /**
     * Hace crossfade desde el audio activo actual hacia una nueva pista.
     * @param {string} src  - Ruta del archivo (e.g. 'audio/1.mp3')
     * @param {number} vol  - Volumen objetivo (0–1)
     * @param {function} onStart - Callback cuando el nuevo audio empieza a sonar
     */
    _crossfadeTo: function (src, vol, onStart) {
        const STEPS    = 30;
        const INTERVAL = this.CROSSFADE_MS / STEPS;
        const outgoing = this.audioEl;   // guardar referencia al elemento saliente

        // Crear elemento entrante
        const incoming = this._newAudioEl(0);  // empieza en silencio
        incoming.src = encodeURI(src);

        // Arrancar reproducción del entrante
        incoming.play().then(() => {

            if (onStart) onStart();

            // Rampas simultáneas
            let step = 0;
            const timer = setInterval(() => {
                step++;
                const ratio = step / STEPS;

                // Entrante: 0 → vol
                try { incoming.volume = Math.min(vol * ratio, vol); } catch (e) {}

                // Saliente: volActual → 0
                if (outgoing) {
                    try { outgoing.volume = Math.max(outgoing.volume * (1 - ratio / (1 - ratio + 0.01)), 0); } catch (e) {}
                }

                if (step >= STEPS) {
                    clearInterval(timer);
                    // Destruir el saliente
                    this._destroyAudio(outgoing);
                    if (this.fadingOut === outgoing) this.fadingOut = null;
                    // Asegurar volumen exacto
                    try { incoming.volume = vol; } catch (e) {}
                }
            }, INTERVAL);

            // Guardar referencia al saliente para limpieza si se interrumpe
            this.fadingOut = outgoing;

        }).catch(err => {
            console.warn('[OasisEngine] No se pudo iniciar la pista:', src, err);
            this._destroyAudio(incoming);
            this._showPlayError();
        });

        // El nuevo elemento se convierte en el activo
        this.audioEl = incoming;

        // Reconectar AudioContext al nuevo elemento si existe
        if (this.ctx) {
            try {
                const newSource = this.ctx.createMediaElementSource(incoming);
                newSource.connect(this.masterGain);
                this.audioSource = newSource;
            } catch (e) {
                // Si falla la reconexión de contexto, el audio sigue funcionando
                // sin visualizador hasta el próximo gesto del usuario
            }
        }

        // Registrar evento 'ended' para avance automático de cola
        incoming.addEventListener('ended', () => {
            if (this.isPlaying) this.playNext();
        });
    },

    /* ════════════════════════════════════════════════════════════════════════
       API PÚBLICA DE REPRODUCCIÓN
       ════════════════════════════════════════════════════════════════════════ */

    /** Reproduce una pista por su id. section e index son opcionales (se calculan). */
    playById: function (id, section, index) {
        if (this.performanceMode) return;

        // Resolver sección e índice si no se pasaron
        if (!section || index === undefined) {
            const found = this._findTrack(id);
            if (!found) return;
            section = found.section;
            index   = window.ValtaraPlaylists[section].findIndex(t => t.id === id);
        }

        const playlist = this._playlist(section);
        const track    = playlist[index];
        if (!track) return;

        // Actualizar estado
        this.currentId      = id;
        this.currentSection = section;
        this.currentIndex   = index;
        this.isPlaying      = true;

        // UI inmediata
        this._updateNowPlaying(track, section, playlist, index);
        this._setPlayIcon('pause');
        this._highlightCard(id);

        // Crossfade al nuevo src
        this._crossfadeTo(track.src, this.targetVolume, () => {
            // Puede ser útil para analytics o UI futura
        });

        // Visualizador
        setTimeout(() => this.startVisualizer(), this.CROSSFADE_MS / 2);
    },

    /** Siguiente pista dentro de la cola activa (con wrap) */
    playNext: function () {
        if (!this.currentSection) return;
        const pl   = this._playlist(this.currentSection);
        const next = (this.currentIndex + 1) % pl.length;
        this.playById(pl[next].id, this.currentSection, next);
    },

    /** Pista anterior dentro de la cola activa (con wrap) */
    playPrev: function () {
        if (!this.currentSection) return;
        const pl   = this._playlist(this.currentSection);
        const prev = (this.currentIndex - 1 + pl.length) % pl.length;
        this.playById(pl[prev].id, this.currentSection, prev);
    },

    /** Play / Pause del botón maestro */
    togglePlay: function () {
        if (this.isPlaying) {
            this.pause();
        } else {
            if (this.currentId) {
                // Reanudar lo que estaba
                this.audioEl.play().then(() => {
                    this.isPlaying = true;
                    this._setPlayIcon('pause');
                    setTimeout(() => this.startVisualizer(), 100);
                }).catch(() => {});
            } else {
                // Primera vez: arrancar con la primera pista de radio
                const pl = this._playlist('radio');
                if (pl.length) this.playById(pl[0].id, 'radio', 0);
            }
        }
    },

    pause: function () {
        this.isPlaying = false;
        if (this.audioEl) this.audioEl.pause();
        this._setPlayIcon('play');
        document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('playing'));
        cancelAnimationFrame(this.animFrame);
        this._clearVisualizer();
    },

    /* ════════════════════════════════════════════════════════════════════════
       EVENTOS DE CONTROLES
       ════════════════════════════════════════════════════════════════════════ */
    bindEvents: function () {
        const get = id => document.getElementById(id);

        const playBtn    = get('btn-master-play');
        const nextBtn    = get('btn-next-track');
        const prevBtn    = get('btn-prev-track');
        const volSlider  = get('oasis-volume-slider');
        const progressBar= get('oasis-progress-bar');
        const timeCurr   = get('oasis-time-current');
        const timeTotal  = get('oasis-time-total');

        if (playBtn)  playBtn.addEventListener('click',  () => { this.lazyInitAudio(); this.unlockAudioContext(); this.togglePlay(); });
        if (nextBtn)  nextBtn.addEventListener('click',  () => { this.lazyInitAudio(); this.unlockAudioContext(); this.playNext(); });
        if (prevBtn)  prevBtn.addEventListener('click',  () => { this.lazyInitAudio(); this.unlockAudioContext(); this.playPrev(); });

        if (volSlider) {
            volSlider.addEventListener('input', e => {
                this.targetVolume = parseFloat(e.target.value);
                if (this.audioEl) {
                    try { this.audioEl.volume = this.targetVolume; } catch(_) {}
                }
            });
        }

        // Progress bar — usa delegación en audioEl actual
        // Se actualiza en startVisualizer/timeupdate loop
        if (progressBar) {
            progressBar.addEventListener('input', e => {
                if (this.audioEl && this.audioEl.duration) {
                    this.audioEl.currentTime = (e.target.value / 100) * this.audioEl.duration;
                }
            });
        }

        // Actualizar barra de progreso y tiempos mediante polling en animFrame
        // (evita múltiples listeners al cambiar audioEl)
        this._startProgressPoll(progressBar, timeCurr, timeTotal);
    },

    _startProgressPoll: function (bar, curr, total) {
        const tick = () => {
            const el = this.audioEl;
            if (el && el.duration && this.isPlaying) {
                const pct = (el.currentTime / el.duration) * 100;
                if (bar)   bar.value        = pct;
                if (curr)  curr.textContent = this._fmt(el.currentTime);
                if (total) total.textContent= this._fmt(el.duration);
            }
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    },

    /* ════════════════════════════════════════════════════════════════════════
       VISUALIZADOR
       ════════════════════════════════════════════════════════════════════════ */
    startVisualizer: function () {
        if (this.performanceMode || !this.analyser) return;

        const canvas = document.getElementById('oasis-visualizer');
        if (!canvas) return;

        const ctx    = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height= canvas.offsetHeight;

        const bufLen  = this.analyser.frequencyBinCount;
        const data    = new Uint8Array(bufLen);
        const barW    = (canvas.width / bufLen) * 2.5;

        const draw = () => {
            if (!this.isPlaying) return;
            this.animFrame = requestAnimationFrame(draw);

            this.analyser.getByteFrequencyData(data);

            ctx.fillStyle = 'rgba(0,0,0,.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let x = 0;
            for (let i = 0; i < bufLen; i++) {
                const h = data[i] / 1.5;
                ctx.fillStyle = `rgb(${Math.min(255, h + 50)},${Math.max(0, 255 - h * 2)},255)`;
                ctx.fillRect(x, canvas.height - h, barW, h);
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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    },

    /* ════════════════════════════════════════════════════════════════════════
       HELPERS DE UI
       ════════════════════════════════════════════════════════════════════════ */
    _setPlayIcon: function (state) {
        const icon = document.querySelector('#btn-master-play i');
        if (icon) icon.className = `fa-solid fa-${state === 'pause' ? 'pause' : 'play'}`;
    },

    _highlightCard: function (id) {
        document.querySelectorAll('.track-btn').forEach(b => {
            b.classList.toggle('playing', b.getAttribute('data-id') === id);
        });
    },

    _updateNowPlaying: function (track, section, playlist, index) {
        const nowEl  = document.getElementById('oasis-now-playing');
        const nextEl = document.getElementById('oasis-next-track');

        if (nowEl) {
            nowEl.innerHTML = `<i class="fa-solid fa-music" style="margin-right:8px;"></i>${track.title}`;
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
        icon.className    = 'fa-solid fa-triangle-exclamation';
        icon.style.color  = '#ff5555';
        setTimeout(() => {
            icon.className   = 'fa-solid fa-play';
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
       SETUP DE INDICADORES DE CARRUSEL (funcionalidad original conservada)
       ════════════════════════════════════════════════════════════════════════ */
    setupCarouselIndicators: function () {
        const setups = [
            { id: 'audio-carousel-short', indId: 'indicator-audio-short', total: 9  },
            { id: 'audio-carousel-long',  indId: 'indicator-audio-long',  total: 14 },
            { id: 'audio-carousel-radio', indId: 'indicator-audio-radio', total: 15 }
        ];

        setups.forEach(setup => {
            const carousel  = document.getElementById(setup.id);
            const indicator = document.getElementById(setup.indId);
            if (!carousel || !indicator) return;

            carousel.addEventListener('scroll', () => {
                const card = carousel.querySelector('.carousel-card');
                if (!card) return;
                const cardWidth  = card.offsetWidth + 40;
                const idx        = Math.round(carousel.scrollLeft / cardWidth) + 1;
                indicator.textContent = Math.min(Math.max(idx, 1), setup.total) + ' de ' + setup.total;
            });
        });
    }
};
