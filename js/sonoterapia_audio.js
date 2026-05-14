window.ValtaraModulos = window.ValtaraModulos || {};

/* ============================================================================
   CAROUSEL SCROLLER GLOBAL
   ============================================================================ */
window.ValtaraCarousels = {
    scroll: function (id, direction) {
        const track = document.getElementById(id);
        if (!track) return;

        const card = track.querySelector('.carousel-card');
        const cardWidth = card ? card.offsetWidth + 24 : 340;

        track.scrollBy({
            left: direction * cardWidth,
            behavior: 'smooth'
        });
    }
};

/* ============================================================================
   AUDIO SYSTEM GLOBAL — UN SOLO MOTOR PARA TODA LA SPA
   ============================================================================ */
window.ValtaraAudioSystem = {
    audio: new Audio(),
    audioContext: null,
    analyser: null,
    source: null,
    audioGraphReady: false,
    visualizerLoopStarted: false,
    isInitialized: false,
    isTransitioning: false,

    volume: 0.7,
    currentCategory: '',
    currentTrackIndex: 0,
    currentPlaylist: [],
    currentTrack: null,

    playlists: {
        short: [
            { title: 'Frecuencia 01', file: '1.mp3' },
            { title: 'Frecuencia 02', file: '2.mp3' },
            { title: 'Frecuencia 03', file: '3.mp3' },
            { title: 'Frecuencia 04', file: '4.mp3' },
            { title: 'Frecuencia 05', file: '5.mp3' },
            { title: 'Frecuencia 06', file: '6.mp3' },
            { title: 'Frecuencia 07', file: '7.mp3' },
            { title: 'Frecuencia 08', file: '8.mp3' },
            { title: 'Frecuencia 09', file: '9.mp3' }
        ],
        long: [
            { title: 'Bajo el Vidrio', file: 'bajo_el_vidrio.mp3' },
            { title: 'Manto sin Orillas', file: 'manto_sin_orillas.mp3' }
        ],
        radio: [
            { title: 'Nuestra Catedral', file: 'nuestra_catedral.mp3' },
            { title: 'Steam From The Porcelain', file: 'steam_from_the_porcelain.mp3' },
            { title: 'Donde el Alma Descansa', file: 'donde_el_alma_descansa.mp3' },
            { title: 'Un Respiro en el Andar', file: 'un_respiro_en_el_andar.mp3' },
            { title: 'Un Puerto Donde Descansar', file: 'un_puerto_donde_descansar.mp3' },
            { title: 'Refugio Entre Ramas', file: 'refugio_entre_ramas.mp3' },
            { title: 'Donde la Piedra se Rinde', file: 'donde_la_piedra_se_rinde.mp3' },
            { title: 'The Willow and the Stone', file: 'the_willow_and_the_stone.mp3' },
            { title: 'Blue-Inked Islands', file: 'blue-inked_islands.mp3' },
            { title: 'The Slow Rotation I', file: 'the_slow_rotation (1).mp3' },
            { title: 'The Slow Rotation', file: 'the_slow_rotation.mp3' },
            { title: 'Where Pulse and Pasture Meet', file: 'where_pulse_and_pasture_meet.mp3' },
            { title: 'Midnight Architecture', file: 'midnight_architecture.mp3' },
            { title: 'Cristal y Sal', file: 'cristal_y_sal.mp3' },
            { title: 'The Quiet Pulse', file: 'the_quiet_pulse.mp3' }
        ]
    },

    fileUrl(file) {
        return `audio/${encodeURI(file)}`;
    },

    formatTime(sec) {
        if (!isFinite(sec) || isNaN(sec)) return '0:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    },

    pauseAllExternalAudio() {
        document.querySelectorAll('audio').forEach((el) => {
            if (el !== this.audio) el.pause();
        });
    },

    bindAudioGraph() {
        if (this.audioGraphReady) return;

        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        try {
            this.audioContext = new AudioCtx();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 128;

            this.source = this.audioContext.createMediaElementSource(this.audio);
            this.source.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);

            this.audioGraphReady = true;
        } catch (e) {
            console.log(e);
        }
    },

    bindBaseEvents() {
        if (this.audio.dataset.bound === 'true') return;
        this.audio.dataset.bound = 'true';

        this.audio.preload = 'metadata';
        this.audio.volume = this.volume;

        this.audio.addEventListener('timeupdate', () => {
            const progress = document.getElementById('oasis-progress-bar');
            const current = document.getElementById('oasis-time-current');
            const total = document.getElementById('oasis-time-total');

            if (current) current.textContent = this.formatTime(this.audio.currentTime);
            if (total) total.textContent = this.formatTime(this.audio.duration);

            if (progress && this.audio.duration) {
                progress.value = String((this.audio.currentTime / this.audio.duration) * 100);
            }
        });

        this.audio.addEventListener('loadedmetadata', () => {
            const total = document.getElementById('oasis-time-total');
            if (total) total.textContent = this.formatTime(this.audio.duration);
        });

        this.audio.addEventListener('play', () => {
            const btn = document.getElementById('btn-master-play');
            if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            this.updateNowPlaying();
            this.updateNextTrack();
        });

        this.audio.addEventListener('pause', () => {
            const btn = document.getElementById('btn-master-play');
            if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i>';
        });

        this.audio.addEventListener('ended', () => {
            this.nextTrack();
        });

        this.audio.addEventListener('error', () => {
            // Si un archivo falla, avanza al siguiente para no bloquear la experiencia.
            setTimeout(() => this.nextTrack(), 250);
        });
    },

    bindUI() {
        const volumeSlider = document.getElementById('oasis-volume-slider');
        const progressBar = document.getElementById('oasis-progress-bar');

        if (volumeSlider) {
            volumeSlider.value = String(this.volume);
            volumeSlider.oninput = (e) => {
                this.volume = Number(e.target.value);
                this.audio.volume = this.volume;
                localStorage.setItem('valtara_audio_volume', String(this.volume));
            };
        }

        if (progressBar) {
            progressBar.oninput = (e) => {
                if (this.audio.duration) {
                    const pct = Number(e.target.value) / 100;
                    this.audio.currentTime = this.audio.duration * pct;
                }
            };
        }
    },

    restoreState() {
        try {
            const savedVolume = localStorage.getItem('valtara_audio_volume');
            if (savedVolume !== null && !Number.isNaN(Number(savedVolume))) {
                this.volume = Math.max(0, Math.min(1, Number(savedVolume)));
                this.audio.volume = this.volume;
            }

            const savedCategory = localStorage.getItem('valtara_audio_category');
            const savedIndex = Number(localStorage.getItem('valtara_audio_index') || '0');

            if (savedCategory && this.playlists[savedCategory]) {
                this.currentCategory = savedCategory;
                this.currentPlaylist = this.playlists[savedCategory];
                this.currentTrackIndex = Math.max(0, Math.min(savedIndex, this.currentPlaylist.length - 1));
                this.currentTrack = this.currentPlaylist[this.currentTrackIndex];

                const track = this.currentTrack;
                if (track) {
                    this.audio.src = this.fileUrl(track.file);
                    this.audio.load();
                    this.updateNowPlaying();
                    this.updateNextTrack();
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    updateNowPlaying() {
        const el = document.getElementById('oasis-now-playing');
        if (!el) return;

        if (!this.currentTrack) {
            el.innerHTML = 'Selecciona una experiencia sonora';
            return;
        }

        el.innerHTML = `
            <div style="font-size:.85rem;opacity:.7;letter-spacing:.12rem;text-transform:uppercase;margin-bottom:.35rem;">
                Ahora sonando
            </div>
            <div style="font-size:1.15rem;line-height:1.5;">
                ${this.currentTrack.title}
            </div>
        `;
    },

    updateNextTrack() {
        const el = document.getElementById('oasis-next-track');
        if (!el) return;

        if (!this.currentPlaylist.length) {
            el.innerHTML = 'A continuación: —';
            return;
        }

        const nextIndex = (this.currentTrackIndex + 1) % this.currentPlaylist.length;
        const next = this.currentPlaylist[nextIndex];

        el.innerHTML = `
            <span style="opacity:.65;">A continuación:</span>
            <strong style="color:var(--valtara-oro); margin-left:.5rem;">${next.title}</strong>
        `;
    },

    updateIndicator(category) {
        const map = {
            short: 'indicator-audio-short',
            long: 'indicator-audio-long',
            radio: 'indicator-audio-radio'
        };

        const el = document.getElementById(map[category]);
        if (!el) return;

        const list = this.playlists[category] || [];
        if (!list.length) return;

        el.textContent = `${this.currentTrackIndex + 1} de ${list.length}`;
    },

    updateAllIndicators() {
        this.updateIndicator('short');
        this.updateIndicator('long');
        this.updateIndicator('radio');
    },

    async ensureAudioContextRunning() {
        if (!this.audioContext) return;

        if (this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
            } catch (e) {
                console.log(e);
            }
        }
    },

    async fadeTo(target, ms = 220) {
        const start = this.audio.volume;
        const steps = 12;
        const stepTime = Math.max(16, ms / steps);
        let i = 0;

        return new Promise((resolve) => {
            const tick = () => {
                i += 1;
                const t = i / steps;
                this.audio.volume = start + (target - start) * t;

                if (i < steps) {
                    setTimeout(tick, stepTime);
                } else {
                    this.audio.volume = target;
                    resolve();
                }
            };
            tick();
        });
    },

    async switchTrack(category, index, autoplay = true) {
        const list = this.playlists[category] || [];
        if (!list.length) return;

        const safeIndex = ((index % list.length) + list.length) % list.length;
        const track = list[safeIndex];
        if (!track) return;

        this.pauseAllExternalAudio();

        this.currentCategory = category;
        this.currentPlaylist = list;
        this.currentTrackIndex = safeIndex;
        this.currentTrack = track;

        this.updateIndicator(category);
        this.updateAllIndicators();
        this.updateNowPlaying();
        this.updateNextTrack();

        try {
            if (autoplay) {
                await this.ensureAudioContextRunning();
                if (!this.audio.paused) {
                    await this.fadeTo(0, 140);
                }

                this.audio.src = this.fileUrl(track.file);
                this.audio.load();
                this.audio.volume = 0;

                await this.audio.play();
                this.isTransitioning = true;
                await this.fadeTo(this.volume, 240);
                this.isTransitioning = false;

                localStorage.setItem('valtara_audio_category', category);
                localStorage.setItem('valtara_audio_index', String(safeIndex));
            } else {
                this.audio.src = this.fileUrl(track.file);
                this.audio.load();
                this.audio.pause();
                this.audio.volume = this.volume;

                localStorage.setItem('valtara_audio_category', category);
                localStorage.setItem('valtara_audio_index', String(safeIndex));
            }
        } catch (e) {
            console.log(e);
        }

        this.updatePlayButton();
    },

    async playCategory(category, index = 0) {
        await this.switchTrack(category, index, true);
    },

    async playTrack(category, index) {
        await this.switchTrack(category, index, true);
    },

    async togglePlay() {
        if (!this.currentPlaylist.length) {
            await this.playCategory('radio', 0);
            return;
        }

        if (!this.audio.src) {
            await this.switchTrack(this.currentCategory || 'radio', this.currentTrackIndex || 0, true);
            return;
        }

        try {
            await this.ensureAudioContextRunning();

            if (this.audio.paused) {
                await this.audio.play();
            } else {
                this.audio.pause();
            }
        } catch (e) {
            console.log(e);
        }

        this.updatePlayButton();
    },

    updatePlayButton() {
        const btn = document.getElementById('btn-master-play');
        if (!btn) return;

        btn.innerHTML = this.audio.paused
            ? '<i class="fa-solid fa-play"></i>'
            : '<i class="fa-solid fa-pause"></i>';
    },

    async nextTrack() {
        if (!this.currentPlaylist.length) {
            await this.playCategory('radio', 0);
            return;
        }

        const nextIndex = (this.currentTrackIndex + 1) % this.currentPlaylist.length;
        await this.switchTrack(this.currentCategory, nextIndex, true);
    },

    async prevTrack() {
        if (!this.currentPlaylist.length) {
            await this.playCategory('radio', 0);
            return;
        }

        const prevIndex = (this.currentTrackIndex - 1 + this.currentPlaylist.length) % this.currentPlaylist.length;
        await this.switchTrack(this.currentCategory, prevIndex, true);
    },

    setupVisualizer() {
        if (this.visualizerLoopStarted) return;
        this.visualizerLoopStarted = true;

        const draw = () => {
            const canvas = document.getElementById('oasis-visualizer');
            if (!canvas) {
                requestAnimationFrame(draw);
                return;
            }

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                requestAnimationFrame(draw);
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = Math.max(1, Math.floor(rect.width * dpr));
            canvas.height = Math.max(1, Math.floor(rect.height * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, rect.width, rect.height);

            const width = rect.width;
            const height = rect.height;
            const barCount = 36;
            const barWidth = width / barCount;

            if (this.analyser) {
                const buffer = new Uint8Array(this.analyser.frequencyBinCount);
                this.analyser.getByteFrequencyData(buffer);

                for (let i = 0; i < barCount; i++) {
                    const val = buffer[i % buffer.length] || 0;
                    const barHeight = Math.max(8, (val / 255) * height * 0.9);
                    const x = i * barWidth + 2;
                    const y = height - barHeight;

                    const grad = ctx.createLinearGradient(0, y, 0, height);
                    grad.addColorStop(0, 'rgba(0,255,255,0.95)');
                    grad.addColorStop(1, 'rgba(229,140,255,0.35)');
                    ctx.fillStyle = grad;

                    ctx.fillRect(x, y, Math.max(2, barWidth - 4), barHeight);
                }
            } else {
                const t = performance.now() / 400;
                for (let i = 0; i < barCount; i++) {
                    const pulse = (Math.sin(t + i * 0.45) + 1) / 2;
                    const barHeight = 20 + pulse * (height * 0.55);
                    const x = i * barWidth + 2;
                    const y = height - barHeight;

                    const grad = ctx.createLinearGradient(0, y, 0, height);
                    grad.addColorStop(0, 'rgba(0,255,255,0.82)');
                    grad.addColorStop(1, 'rgba(229,140,255,0.28)');
                    ctx.fillStyle = grad;

                    ctx.fillRect(x, y, Math.max(2, barWidth - 4), barHeight);
                }
            }

            requestAnimationFrame(draw);
        };

        draw();
    },

    init() {
        this.bindBaseEvents();
        this.bindUI();
        this.bindAudioGraph();
        this.setupVisualizer();
        this.restoreState();
        this.updateAllIndicators();
        this.updatePlayButton();
        this.isInitialized = true;
    }
};

/* ============================================================================
   UTILIDADES DE RENDER POR CATÁLOGO
   ============================================================================ */
function valtaraBuildTrackCard(category, index, track, accent, icon) {
    return `
        <article class="glass-card carousel-card"
            onclick="window.ValtaraAudioSystem.playTrack('${category}', ${index})"
            style="
                min-width:320px;
                max-width:320px;
                flex-shrink:0;
                padding:1.35rem;
                border-radius:28px;
                overflow:hidden;
                background:rgba(255,255,255,.03);
                border:1px solid rgba(255,255,255,.08);
                backdrop-filter:blur(14px);
                box-shadow:0 15px 40px rgba(0,0,0,.32);
                cursor:pointer;
            "
        >
            <div style="
                width:92px;
                height:92px;
                border-radius:50%;
                margin:0 auto 1.5rem auto;
                background:radial-gradient(circle, ${accent}33, rgba(0,0,0,.10));
                border:1px solid ${accent}55;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:2rem;
                color:${accent};
            ">
                <i class="${icon}"></i>
            </div>

            <h4 style="
                color:white;
                font-size:1.28rem;
                margin-bottom:.7rem;
                font-family:var(--font-accent);
                text-align:center;
                line-height:1.45;
            ">
                ${track.title}
            </h4>

            <p style="
                color:rgba(255,255,255,.62);
                line-height:1.8;
                text-align:center;
                margin:0;
            ">
                ${category === 'radio'
                    ? 'Radio ambiental Valtara'
                    : category === 'short'
                        ? 'Micro-Dosis Botánicas'
                        : 'Inmersión Profunda'}
            </p>
        </article>
    `;
}

/* ============================================================================
   MÓDULO DE SONOTERAPIA AUDIO
   ============================================================================ */
window.ValtaraModulos.sonoterapia_audio = `
    <div style="text-align:center;max-width:1200px;margin:4rem auto 2rem auto;">
        <h3 style="
            color:var(--valtara-cian-brillante);
            font-family:var(--font-accent);
            font-size:3rem;
            margin-bottom:1rem;
        ">
            II. Frecuencias Acústicas
        </h3>
        <p style="
            color:var(--valtara-gris-texto);
            font-size:1.25rem;
            font-weight:300;
            letter-spacing:0.1rem;
            text-transform:uppercase;
        ">
            Curaduría de Audio Botánico de Valtara
        </p>
    </div>

    <div class="glass-card reveal" style="
        padding:4rem;
        max-width:1000px;
        margin:0 auto 3rem auto;
        border-color:rgba(0,255,255,0.18);
        background:rgba(0,0,0,0.58);
        box-shadow:0 2rem 6rem rgba(0,255,255,0.12);
        border-radius:2rem;
    ">

        <div id="oasis-now-playing" style="
            text-align:center;
            color:var(--valtara-cian-brillante);
            font-size:1.8rem;
            font-family:var(--font-accent);
            margin-bottom:.5rem;
            min-height:2.4rem;
            letter-spacing:1px;
            line-height:1.5;
        ">
            Selecciona una pista botánica para comenzar
        </div>

        <div id="oasis-next-track" style="
            text-align:center;
            color:rgba(255,255,255,.75);
            font-size:1rem;
            margin-bottom:2rem;
            min-height:1.4rem;
        ">
            A continuación: —
        </div>

        <div class="canvas-audio-wrapper" style="
            margin-bottom:2.5rem;
            border-radius:1.5rem;
            overflow:hidden;
            border:1px solid rgba(0,255,255,0.16);
            background:radial-gradient(circle, rgba(0,255,255,0.05) 0%, rgba(0,0,0,0.9) 100%);
        ">
            <canvas id="oasis-visualizer" aria-label="Visualizador de sonido" style="
                height:180px;
                width:100%;
                display:block;
            "></canvas>
        </div>

        <div class="oasis-player-controls" style="
            background:rgba(255,255,255,0.03);
            padding:2.2rem;
            border-radius:1.5rem;
            border:1px solid rgba(0,255,255,0.18);
            box-shadow:inset 0 0 2rem rgba(0,0,0,0.5);
        ">
            <div style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:1.5rem;
                margin-bottom:1.8rem;
                color:var(--valtara-gris-texto);
                font-size:1.1rem;
                flex-wrap:wrap;
            ">
                <span id="oasis-time-current" style="font-family:monospace;font-weight:bold;">0:00</span>
                <input type="range" id="oasis-progress-bar" value="0" min="0" max="100" style="
                    flex:1;
                    min-width:220px;
                    accent-color:var(--valtara-cian-brillante);
                    cursor:pointer;
                    height:8px;
                    border-radius:4px;
                ">
                <span id="oasis-time-total" style="font-family:monospace;font-weight:bold;">0:00</span>
            </div>

            <div style="
                display:flex;
                align-items:center;
                justify-content:center;
                gap:1.2rem;
                flex-wrap:wrap;
            ">
                <button
                    class="carousel-btn"
                    onclick="window.ValtaraAudioSystem.prevTrack()"
                    aria-label="Pista anterior"
                    style="
                        width:56px;
                        height:56px;
                        border-radius:50%;
                        border:1px solid rgba(255,255,255,.12);
                        background:rgba(255,255,255,.05);
                        color:white;
                        cursor:pointer;
                    "
                >
                    <i class="fa-solid fa-backward-step"></i>
                </button>

                <button
                    class="master-play-btn"
                    id="btn-master-play"
                    onclick="window.ValtaraAudioSystem.togglePlay()"
                    aria-label="Reproducir o Pausar Audio"
                    style="
                        margin:0;
                        width:86px;
                        height:86px;
                        font-size:2.4rem;
                        flex-shrink:0;
                    "
                >
                    <i class="fa-solid fa-play"></i>
                </button>

                <button
                    class="carousel-btn"
                    onclick="window.ValtaraAudioSystem.nextTrack()"
                    aria-label="Pista siguiente"
                    style="
                        width:56px;
                        height:56px;
                        border-radius:50%;
                        border:1px solid rgba(255,255,255,.12);
                        background:rgba(255,255,255,.05);
                        color:white;
                        cursor:pointer;
                    "
                >
                    <i class="fa-solid fa-forward-step"></i>
                </button>
            </div>

            <div style="
                display:flex;
                align-items:center;
                justify-content:center;
                gap:1rem;
                margin-top:1.8rem;
                color:var(--valtara-oro-suave);
                font-size:1.2rem;
                flex-wrap:wrap;
            ">
                <i class="fa-solid fa-volume-low"></i>
                <input
                    type="range"
                    id="oasis-volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value="0.7"
                    style="
                        width:170px;
                        accent-color:var(--valtara-oro);
                        cursor:pointer;
                        height:6px;
                    "
                >
                <i class="fa-solid fa-volume-high"></i>
            </div>
        </div>
    </div>

    <div style="
        max-width:1200px;
        margin:0 auto 1.2rem auto;
        padding-left:2rem;
        border-left:5px solid var(--valtara-verde-menta);
    ">
        <h4 style="
            color:var(--valtara-verde-menta);
            font-size:2rem;
            font-family:var(--font-accent);
            margin:0;
        ">
            Micro-Dosis Botánicas
        </h4>
        <p style="color:#aaa;font-size:1.05rem;margin:0;">
            Frecuencias para reinicios cognitivos rápidos.
        </p>
    </div>

    <div class="carousel-master-container reveal" style="margin-bottom:4.5rem;">
        <div id="audio-carousel-short" class="horizontal-carousel" style="
            display:flex;
            gap:24px;
            overflow-x:auto;
            scroll-behavior:smooth;
            padding:1rem 1rem 1.5rem 1rem;
        ">
            ${window.ValtaraAudioSystem.playlists.short.map((track, index) => valtaraBuildTrackCard('short', index, track, 'var(--valtara-verde-menta)', 'fa-solid fa-leaf')).join('')}
        </div>
        <div class="carousel-navigation" style="display:flex;justify-content:center;align-items:center;gap:18px;margin-top:1rem;">
            <button aria-label="Ver audios anteriores" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-short', -1)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div class="carousel-indicator" id="indicator-audio-short" aria-live="polite">1 de ${window.ValtaraAudioSystem.playlists.short.length}</div>
            <button aria-label="Ver siguientes audios" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-short', 1)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </div>

    <div style="
        max-width:1200px;
        margin:0 auto 1.2rem auto;
        padding-left:2rem;
        border-left:5px solid var(--valtara-morado-vivo);
    ">
        <h4 style="
            color:#E58CFF;
            font-size:2rem;
            font-family:var(--font-accent);
            margin:0;
        ">
            Inmersión Profunda
        </h4>
        <p style="color:#aaa;font-size:1.05rem;margin:0;">
            Catálogo acústico extendido para meditación profunda.
        </p>
    </div>

    <div class="carousel-master-container reveal" style="margin-bottom:4.5rem;">
        <div id="audio-carousel-long" class="horizontal-carousel" style="
            display:flex;
            gap:24px;
            overflow-x:auto;
            scroll-behavior:smooth;
            padding:1rem 1rem 1.5rem 1rem;
        ">
            ${window.ValtaraAudioSystem.playlists.long.map((track, index) => valtaraBuildTrackCard('long', index, track, '#E58CFF', 'fa-solid fa-water')).join('')}
        </div>
        <div class="carousel-navigation" style="display:flex;justify-content:center;align-items:center;gap:18px;margin-top:1rem;">
            <button aria-label="Ver audios anteriores" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-long', -1)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div class="carousel-indicator" id="indicator-audio-long" aria-live="polite">1 de ${window.ValtaraAudioSystem.playlists.long.length}</div>
            <button aria-label="Ver siguientes audios" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-long', 1)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </div>

    <div style="
        max-width:1200px;
        margin:0 auto 1.2rem auto;
        padding-left:2rem;
        border-left:5px solid var(--valtara-oro);
    ">
        <h4 style="
            color:var(--valtara-oro);
            font-size:2rem;
            font-family:var(--font-accent);
            margin:0;
        ">
            Radio Valtara
        </h4>
        <p style="color:#aaa;font-size:1.05rem;margin:0;">
            Estación inmersiva continua · 15 frecuencias originales.
        </p>
    </div>

    <div style="max-width:1200px;margin:0 auto 1.2rem auto;padding:0 2rem 0 2rem;">
        <button
            onclick="window.ValtaraAudioSystem.playCategory('radio', 0)"
            style="
                display:inline-flex;
                align-items:center;
                gap:12px;
                padding:15px 22px;
                border-radius:16px;
                border:1px solid rgba(242,201,76,.2);
                background:rgba(242,201,76,.08);
                color:var(--valtara-oro);
                font-weight:900;
                cursor:pointer;
                box-shadow:0 10px 25px rgba(242,201,76,.12);
            "
        >
            <i class="fa-solid fa-radio"></i>
            Iniciar Radio Valtara
        </button>
    </div>

    <div class="carousel-master-container reveal" style="margin-bottom:5.5rem;">
        <div id="audio-carousel-radio" class="horizontal-carousel" style="
            display:flex;
            gap:24px;
            overflow-x:auto;
            scroll-behavior:smooth;
            padding:1rem 1rem 1.5rem 1rem;
        ">
            ${window.ValtaraAudioSystem.playlists.radio.map((track, index) => valtaraBuildTrackCard('radio', index, track, 'var(--valtara-oro)', 'fa-solid fa-radio')).join('')}
        </div>
        <div class="carousel-navigation" style="display:flex;justify-content:center;align-items:center;gap:18px;margin-top:1rem;">
            <button aria-label="Ver audios anteriores" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-radio', -1)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div class="carousel-indicator" id="indicator-audio-radio" aria-live="polite">1 de ${window.ValtaraAudioSystem.playlists.radio.length}</div>
            <button aria-label="Ver siguientes audios" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-radio', 1)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </div>
`;

/* ============================================================================
   AUTO INIT
   ============================================================================ */
setTimeout(() => {
    try {
        window.ValtaraAudioSystem.init();
    } catch (e) {
        console.log(e);
    }
}, 250);
