/**
 * ====================================================================================
 * OASIS AUDIO ENGINE V27.0 — MOTOR ESTABLE SPA/PWA
 * ====================================================================================
 *
 * RECONSTRUCCIÓN TOTAL ORIENTADA A ESTABILIDAD:
 *
 * ✔ UNA sola instancia global de Audio
 * ✔ UN solo AudioContext persistente
 * ✔ UN solo MediaElementSource
 * ✔ Compatible con Android Chrome
 * ✔ Compatible con PWA
 * ✔ Compatible con SPA
 * ✔ Compatible con recargas
 * ✔ Mantiene visualizador
 * ✔ Mantiene playlists
 * ✔ Mantiene next/prev
 * ✔ Mantiene indicadores
 * ✔ Mantiene progress bar
 * ✔ Mantiene volumen
 * ✔ Mantiene categorías
 * ✔ Mantiene UI moderna
 *
 * ELIMINADO:
 * ✘ ctx.close()
 * ✘ múltiples Audio()
 * ✘ múltiples MediaElementSource
 * ✘ crossfade complejo
 * ✘ swapping dinámico de audioEl
 * ====================================================================================
 */

window.OasisEngine = {

    /* ───────────────────────────────────────────────────────────── */
    /* ESTADO GLOBAL                                                */
    /* ───────────────────────────────────────────────────────────── */

    ctx: null,
    analyser: null,
    masterGain: null,
    audioSource: null,

    audioEl: null,

    currentId: null,
    currentSection: null,
    currentIndex: -1,

    isPlaying: false,
    animFrame: null,

    performanceMode: false,
    targetVolume: 0.7,

    /* ───────────────────────────────────────────────────────────── */
    /* COLORES                                                      */
    /* ───────────────────────────────────────────────────────────── */

    sectionColors: {
        short: 'rgba(0,255,170,.65)',
        long:  'rgba(229,140,255,.65)',
        radio: 'rgba(212,175,55,.65)'
    },

    sectionLabels: {
        short: 'Micro-Dosis',
        long:  'Inmersión Profunda',
        radio: 'Valtara Radio'
    },

    /* ═════════════════════════════════════════════════════════════ */
    /* INIT                                                         */
    /* ═════════════════════════════════════════════════════════════ */

    init: function () {

        console.log('🟢 OasisEngine V27.0 iniciando...');

        /* ========================================================= */
        /* REUTILIZAR AUDIO GLOBAL                                   */
        /* ========================================================= */

        if (!this.audioEl) {

            this.audioEl = new Audio();

            this.audioEl.crossOrigin = 'anonymous';
            this.audioEl.preload = 'auto';
            this.audioEl.volume = this.targetVolume;

            this.audioEl.addEventListener('ended', () => {

                if (this.isPlaying) {
                    this.playNext();
                }
            });

            console.log('🎵 Audio global creado');
        }

        /* ========================================================= */
        /* AUDIO CONTEXT ÚNICO                                       */
        /* ========================================================= */

        this.initAudioContext();

        /* ========================================================= */
        /* RENDER                                                    */
        /* ========================================================= */

        this.renderCarousels();

        /* ========================================================= */
        /* EVENTOS                                                   */
        /* ========================================================= */

        this.bindEvents();

        /* ========================================================= */
        /* INDICADORES                                               */
        /* ========================================================= */

        this.setupCarouselIndicators();

        /* ========================================================= */
        /* PROGRESS LOOP                                             */
        /* ========================================================= */

        this.startProgressLoop();
    },

    /* ═════════════════════════════════════════════════════════════ */
    /* AUDIO CONTEXT                                                */
    /* ═════════════════════════════════════════════════════════════ */

    initAudioContext: function () {

        if (this.ctx) return;

        try {

            const AC = window.AudioContext || window.webkitAudioContext;

            this.ctx = new AC();

            this.masterGain = this.ctx.createGain();

            this.analyser = this.ctx.createAnalyser();

            this.analyser.fftSize = 256;

            this.audioSource =
                this.ctx.createMediaElementSource(this.audioEl);

            this.audioSource.connect(this.masterGain);

            this.masterGain.connect(this.analyser);

            this.analyser.connect(this.ctx.destination);

            console.log('🔊 AudioContext único creado');

        } catch (e) {

            console.warn('⚠️ Error AudioContext:', e);
        }
    },

    unlockAudioContext: function () {

        if (this.ctx && this.ctx.state === 'suspended') {

            this.ctx.resume().catch(() => {});
        }
    },

    /* ═════════════════════════════════════════════════════════════ */
    /* PLAYLIST HELPERS                                             */
    /* ═════════════════════════════════════════════════════════════ */

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

    /* ═════════════════════════════════════════════════════════════ */
    /* RENDER                                                       */
    /* ═════════════════════════════════════════════════════════════ */

    renderCarousels: function () {

        const sections = ['short', 'long', 'radio'];

        const ids = {
            short: 'audio-carousel-short',
            long:  'audio-carousel-long',
            radio: 'audio-carousel-radio'
        };

        sections.forEach(section => {

            const container =
                document.getElementById(ids[section]);

            if (!container) return;

            container.innerHTML = '';

            const color = this.sectionColors[section];

            const label = this.sectionLabels[section];

            this._playlist(section).forEach((track, index) => {

                const btn = document.createElement('button');

                btn.className =
                    'track-btn carousel-card glass-card';

                btn.setAttribute('data-id', track.id);

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

                    this.unlockAudioContext();

                    this.playById(track.id, section, index);
                });

                container.appendChild(btn);
            });
        });
    },

    /* ═════════════════════════════════════════════════════════════ */
    /* PLAYBACK                                                     */
    /* ═════════════════════════════════════════════════════════════ */

    playById: function (id, section, index) {

        if (this.performanceMode) return;

        const playlist = this._playlist(section);

        const track = playlist[index];

        if (!track) return;

        this.currentId = id;
        this.currentSection = section;
        this.currentIndex = index;

        this.audioEl.pause();

        this.audioEl.src = encodeURI(track.src);

        this.audioEl.load();

        const playPromise = this.audioEl.play();

        if (playPromise !== undefined) {

            playPromise.then(() => {

                this.isPlaying = true;

                this._setPlayIcon('pause');

                this._highlightCard(id);

                this._updateNowPlaying(
                    track,
                    section,
                    playlist,
                    index
                );

                this.startVisualizer();

            }).catch((err) => {

                console.warn('⚠️ Error reproducción:', err);

                this._showPlayError();
            });
        }
    },

    togglePlay: function () {

        if (!this.audioEl) return;

        if (this.isPlaying) {

            this.pause();

        } else {

            this.unlockAudioContext();

            this.audioEl.play().then(() => {

                this.isPlaying = true;

                this._setPlayIcon('pause');

                this.startVisualizer();

            }).catch(() => {});
        }
    },

    pause: function () {

        this.isPlaying = false;

        this.audioEl.pause();

        this._setPlayIcon('play');

        document.querySelectorAll('.track-btn')
            .forEach(btn => btn.classList.remove('playing'));

        cancelAnimationFrame(this.animFrame);

        this._clearVisualizer();
    },

    playNext: function () {

        if (!this.currentSection) return;

        const pl = this._playlist(this.currentSection);

        const next =
            (this.currentIndex + 1) % pl.length;

        this.playById(
            pl[next].id,
            this.currentSection,
            next
        );
    },

    playPrev: function () {

        if (!this.currentSection) return;

        const pl = this._playlist(this.currentSection);

        const prev =
            (this.currentIndex - 1 + pl.length) % pl.length;

        this.playById(
            pl[prev].id,
            this.currentSection,
            prev
        );
    },

    /* ═════════════════════════════════════════════════════════════ */
    /* CONTROLES                                                    */
    /* ═════════════════════════════════════════════════════════════ */

    bindEvents: function () {

        const get = id => document.getElementById(id);

        const playBtn   = get('btn-master-play');
        const nextBtn   = get('btn-next-track');
        const prevBtn   = get('btn-prev-track');
        const volSlider = get('oasis-volume-slider');
        const progress  = get('oasis-progress-bar');

        if (playBtn) {

            playBtn.onclick = () => {

                this.unlockAudioContext();

                this.togglePlay();
            };
        }

        if (nextBtn) {

            nextBtn.onclick = () => {

                this.unlockAudioContext();

                this.playNext();
            };
        }

        if (prevBtn) {

            prevBtn.onclick = () => {

                this.unlockAudioContext();

                this.playPrev();
            };
        }

        if (volSlider) {

            volSlider.oninput = (e) => {

                this.targetVolume =
                    parseFloat(e.target.value);

                this.audioEl.volume =
                    this.targetVolume;
            };
        }

        if (progress) {

            progress.oninput = (e) => {

                if (!this.audioEl.duration) return;

                this.audioEl.currentTime =
                    (e.target.value / 100)
                    * this.audioEl.duration;
            };
        }
    },

    /* ═════════════════════════════════════════════════════════════ */
    /* PROGRESS                                                     */
    /* ═════════════════════════════════════════════════════════════ */

    startProgressLoop: function () {

        const tick = () => {

            const bar =
                document.getElementById('oasis-progress-bar');

            const curr =
                document.getElementById('oasis-time-current');

            const total =
                document.getElementById('oasis-time-total');

            if (
                this.audioEl &&
                this.audioEl.duration
            ) {

                const pct =
                    (this.audioEl.currentTime /
                    this.audioEl.duration) * 100;

                if (bar) bar.value = pct;

                if (curr) {
                    curr.textContent =
                        this._fmt(this.audioEl.currentTime);
                }

                if (total) {
                    total.textContent =
                        this._fmt(this.audioEl.duration);
                }
            }

            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    },

    /* ═════════════════════════════════════════════════════════════ */
    /* VISUALIZER                                                   */
    /* ═════════════════════════════════════════════════════════════ */

    startVisualizer: function () {

        if (!this.analyser) return;

        const canvas =
            document.getElementById('oasis-visualizer');

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const bufferLength =
            this.analyser.frequencyBinCount;

        const dataArray =
            new Uint8Array(bufferLength);

        const barWidth =
            (canvas.width / bufferLength) * 2.5;

        const draw = () => {

            if (!this.isPlaying) return;

            this.animFrame =
                requestAnimationFrame(draw);

            this.analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = 'rgba(0,0,0,.2)';

            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            let x = 0;

            for (let i = 0; i < bufferLength; i++) {

                const h = dataArray[i] / 1.5;

                ctx.fillStyle =
                    `rgb(${Math.min(255, h + 50)},${Math.max(0,255 - h * 2)},255)`;

                ctx.fillRect(
                    x,
                    canvas.height - h,
                    barWidth,
                    h
                );

                x += barWidth + 1;
            }
        };

        cancelAnimationFrame(this.animFrame);

        draw();
    },

    _clearVisualizer: function () {

        const canvas =
            document.getElementById('oasis-visualizer');

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );
    },

    /* ═════════════════════════════════════════════════════════════ */
    /* UI                                                           */
    /* ═════════════════════════════════════════════════════════════ */

    _setPlayIcon: function (state) {

        const icon =
            document.querySelector('#btn-master-play i');

        if (!icon) return;

        icon.className =
            `fa-solid fa-${state === 'pause' ? 'pause' : 'play'}`;
    },

    _highlightCard: function (id) {

        document.querySelectorAll('.track-btn')
            .forEach(btn => {

                btn.classList.toggle(
                    'playing',
                    btn.getAttribute('data-id') === id
                );
            });
    },

    _updateNowPlaying: function (
        track,
        section,
        playlist,
        index
    ) {

        const nowEl =
            document.getElementById('oasis-now-playing');

        const nextEl =
            document.getElementById('oasis-next-track');

        if (nowEl) {

            nowEl.innerHTML =
                `<i class="fa-solid fa-music" style="margin-right:8px;"></i>${track.title}`;
        }

        if (nextEl) {

            const nextIndex =
                (index + 1) % playlist.length;

            const nextTrack =
                playlist[nextIndex];

            nextEl.textContent =
                nextTrack
                ? `A continuación: ${nextTrack.title}`
                : '';
        }
    },

    _showPlayError: function () {

        const icon =
            document.querySelector('#btn-master-play i');

        if (!icon) return;

        icon.className =
            'fa-solid fa-triangle-exclamation';

        icon.style.color = '#ff5555';

        setTimeout(() => {

            icon.className =
                'fa-solid fa-play';

            icon.style.color = '';

        }, 3000);
    },

    _fmt: function (s) {

        if (isNaN(s) || !isFinite(s)) {
            return '0:00';
        }

        const m = Math.floor(s / 60);

        const sec = Math.floor(s % 60);

        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    },

    /* ═════════════════════════════════════════════════════════════ */
    /* INDICADORES                                                  */
    /* ═════════════════════════════════════════════════════════════ */

    setupCarouselIndicators: function () {

        const setups = [
            {
                id:'audio-carousel-short',
                indId:'indicator-audio-short',
                total:9
            },
            {
                id:'audio-carousel-long',
                indId:'indicator-audio-long',
                total:14
            },
            {
                id:'audio-carousel-radio',
                indId:'indicator-audio-radio',
                total:15
            }
        ];

        setups.forEach(setup => {

            const carousel =
                document.getElementById(setup.id);

            const indicator =
                document.getElementById(setup.indId);

            if (!carousel || !indicator) return;

            carousel.addEventListener('scroll', () => {

                const card =
                    carousel.querySelector('.carousel-card');

                if (!card) return;

                const cardWidth =
                    card.offsetWidth + 40;

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
