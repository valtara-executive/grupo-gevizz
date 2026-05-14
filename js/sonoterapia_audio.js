window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraAudioSystem = window.ValtaraAudioSystem || {};

window.ValtaraAudioSystem = {

    audio: new Audio(),
    currentTrackIndex: 0,
    currentPlaylist: [],
    currentCategory: '',
    isPlaying: false,
    analyser: null,
    audioContext: null,
    source: null,
    animationFrame: null,

    playlists: {

        radio: [

            {
                title: "Nuestra Catedral",
                file: "nuestra_catedral.mp3"
            },

            {
                title: "Steam From The Porcelain",
                file: "steam_from_the_porcelain.mp3"
            },

            {
                title: "Donde El Alma Descansa",
                file: "donde_el_alma_descansa.mp3"
            },

            {
                title: "Un Respiro En El Andar",
                file: "un_respiro_en_el_andar.mp3"
            },

            {
                title: "Un Puerto Donde Descansar",
                file: "un_puerto_donde_descansar.mp3"
            },

            {
                title: "Refugio Entre Ramas",
                file: "refugio_entre_ramas.mp3"
            },

            {
                title: "Donde La Piedra Se Rinde",
                file: "donde_la_piedra_se_rinde.mp3"
            },

            {
                title: "The Willow And The Stone",
                file: "the_willow_and_the_stone.mp3"
            },

            {
                title: "Blue-Inked Islands",
                file: "blue-inked_islands.mp3"
            },

            {
                title: "The Slow Rotation I",
                file: "the_slow_rotation (1).mp3"
            },

            {
                title: "The Slow Rotation",
                file: "the_slow_rotation.mp3"
            },

            {
                title: "Where Pulse And Pasture Meet",
                file: "where_pulse_and_pasture_meet.mp3"
            },

            {
                title: "Midnight Architecture",
                file: "midnight_architecture.mp3"
            },

            {
                title: "Cristal y Sal",
                file: "cristal_y_sal.mp3"
            },

            {
                title: "The Quiet Pulse",
                file: "the_quiet_pulse.mp3"
            }

        ]
    },

    init: function() {

        const audio = this.audio;

        audio.volume = 0.7;

        const volumeSlider = document.getElementById('oasis-volume-slider');

        if(volumeSlider) {

            volumeSlider.addEventListener('input', (e) => {
                audio.volume = e.target.value;
            });
        }

        const progress = document.getElementById('oasis-progress-bar');

        audio.addEventListener('timeupdate', () => {

            if(progress && audio.duration) {

                progress.value = (audio.currentTime / audio.duration) * 100;
            }

            const current = document.getElementById('oasis-time-current');
            const total = document.getElementById('oasis-time-total');

            if(current) current.textContent = this.formatTime(audio.currentTime);
            if(total) total.textContent = this.formatTime(audio.duration);

        });

        if(progress) {

            progress.addEventListener('input', (e) => {

                if(audio.duration) {

                    audio.currentTime = (e.target.value / 100) * audio.duration;
                }
            });
        }

        audio.addEventListener('ended', () => {

            this.nextTrack();
        });

        const playBtn = document.getElementById('btn-master-play');

        if(playBtn) {

            playBtn.addEventListener('click', () => {

                if(!this.currentPlaylist.length) {

                    this.loadPlaylist('radio', 0);
                    return;
                }

                if(audio.paused) {

                    audio.play();
                    this.isPlaying = true;

                } else {

                    audio.pause();
                    this.isPlaying = false;
                }

                this.updatePlayButton();
            });
        }

        this.setupVisualizer();

    },

    loadPlaylist: async function(type, index = 0) {

        this.currentCategory = type;
        this.currentPlaylist = this.playlists[type];
        this.currentTrackIndex = index;

        await this.playCurrentTrack();
    },

    playCurrentTrack: async function() {

        const track = this.currentPlaylist[this.currentTrackIndex];

        if(!track) return;

        try {

            await this.fadeOut();

            this.audio.src = `./audio/${track.file}`;

            await this.audio.play();

            this.isPlaying = true;

            this.updateNowPlaying();
            this.updateNextPlaying();
            this.updatePlayButton();

        } catch(e) {

            console.log(e);
        }
    },

    nextTrack: function() {

        this.currentTrackIndex++;

        if(this.currentTrackIndex >= this.currentPlaylist.length) {

            this.currentTrackIndex = 0;
        }

        this.playCurrentTrack();
    },

    prevTrack: function() {

        this.currentTrackIndex--;

        if(this.currentTrackIndex < 0) {

            this.currentTrackIndex = this.currentPlaylist.length - 1;
        }

        this.playCurrentTrack();
    },

    fadeOut: function() {

        return new Promise((resolve) => {

            const fade = setInterval(() => {

                if(this.audio.volume > 0.05) {

                    this.audio.volume -= 0.05;

                } else {

                    clearInterval(fade);

                    this.audio.pause();

                    this.audio.volume = parseFloat(
                        document.getElementById('oasis-volume-slider')?.value || 0.7
                    );

                    resolve();
                }

            }, 45);

        });
    },

    updateNowPlaying: function() {

        const current = this.currentPlaylist[this.currentTrackIndex];

        const el = document.getElementById('oasis-now-playing');

        if(el) {

            el.innerHTML = `
                <div style="font-size: .95rem; opacity:.7; margin-bottom:.5rem;">
                    AHORA SONANDO
                </div>

                <div>
                    ${current.title}
                </div>
            `;
        }
    },

    updateNextPlaying: function() {

        let nextIndex = this.currentTrackIndex + 1;

        if(nextIndex >= this.currentPlaylist.length) {

            nextIndex = 0;
        }

        const nextTrack = this.currentPlaylist[nextIndex];

        const nextEl = document.getElementById('oasis-next-track');

        if(nextEl) {

            nextEl.innerHTML = `
                <span style="opacity:.6;">
                    A continuación:
                </span>

                <strong style="color:var(--valtara-oro);">
                    ${nextTrack.title}
                </strong>
            `;
        }
    },

    updatePlayButton: function() {

        const btn = document.getElementById('btn-master-play');

        if(!btn) return;

        btn.innerHTML = this.audio.paused
            ? '<i class="fa-solid fa-play"></i>'
            : '<i class="fa-solid fa-pause"></i>';
    },

    formatTime: function(sec) {

        if(isNaN(sec)) return '0:00';

        const mins = Math.floor(sec / 60);
        const secs = Math.floor(sec % 60);

        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },

    setupVisualizer: function() {

        try {

            const canvas = document.getElementById('oasis-visualizer');

            if(!canvas) return;

            const ctx = canvas.getContext('2d');

            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            this.analyser = this.audioContext.createAnalyser();

            this.source = this.audioContext.createMediaElementSource(this.audio);

            this.source.connect(this.analyser);

            this.analyser.connect(this.audioContext.destination);

            this.analyser.fftSize = 256;

            const bufferLength = this.analyser.frequencyBinCount;

            const dataArray = new Uint8Array(bufferLength);

            const render = () => {

                this.animationFrame = requestAnimationFrame(render);

                this.analyser.getByteFrequencyData(dataArray);

                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const barWidth = (canvas.width / bufferLength) * 1.8;

                let x = 0;

                for(let i = 0; i < bufferLength; i++) {

                    const barHeight = dataArray[i];

                    const gradient = ctx.createLinearGradient(
                        0,
                        canvas.height,
                        0,
                        canvas.height - barHeight
                    );

                    gradient.addColorStop(0, '#00ffff');
                    gradient.addColorStop(1, '#ff00ff');

                    ctx.fillStyle = gradient;

                    ctx.fillRect(
                        x,
                        canvas.height - barHeight,
                        barWidth,
                        barHeight
                    );

                    x += barWidth + 2;
                }
            };

            render();

        } catch(e) {

            console.log(e);
        }
    }
};

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
        font-size:1.1rem;
        letter-spacing:.12rem;
        text-transform:uppercase;
    ">
        Curaduría Sonora Inmersiva
    </p>

</div>

<div class="glass-card reveal" style="
    padding:4rem;
    max-width:1000px;
    margin:0 auto 5rem auto;
    background:rgba(0,0,0,.45);
    border:1px solid rgba(255,255,255,.08);
    border-radius:2rem;
    backdrop-filter:blur(18px);
">

    <div id="oasis-now-playing" style="
        text-align:center;
        color:var(--valtara-cian-brillante);
        font-size:1.8rem;
        margin-bottom:1rem;
        font-family:var(--font-accent);
    ">
        Selecciona una frecuencia
    </div>

    <div id="oasis-next-track" style="
        text-align:center;
        color:white;
        margin-bottom:2rem;
        font-size:1rem;
        opacity:.85;
    ">
        A continuación: —
    </div>

    <div class="canvas-audio-wrapper" style="
        margin-bottom:2rem;
        border-radius:1.5rem;
        overflow:hidden;
        border:1px solid rgba(255,255,255,.08);
        background:rgba(255,255,255,.03);
    ">

        <canvas id="oasis-visualizer"
            style="
                width:100%;
                height:180px;
                display:block;
            ">
        </canvas>

    </div>

    <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:1rem;
        margin-bottom:2rem;
        flex-wrap:wrap;
    ">

        <span id="oasis-time-current">0:00</span>

        <input
            type="range"
            id="oasis-progress-bar"
            value="0"
            min="0"
            max="100"
            style="
                flex:1;
                accent-color:var(--valtara-cian-brillante);
            "
        >

        <span id="oasis-time-total">0:00</span>

    </div>

    <div style="
        display:flex;
        justify-content:center;
        align-items:center;
        gap:1.5rem;
        flex-wrap:wrap;
    ">

        <button onclick="window.ValtaraAudioSystem.prevTrack()" class="carousel-btn">
            <i class="fa-solid fa-backward-step"></i>
        </button>

        <button class="master-play-btn"
            id="btn-master-play"
            style="
                width:85px;
                height:85px;
                border-radius:50%;
                font-size:2rem;
            ">
            <i class="fa-solid fa-play"></i>
        </button>

        <button onclick="window.ValtaraAudioSystem.nextTrack()" class="carousel-btn">
            <i class="fa-solid fa-forward-step"></i>
        </button>

    </div>

    <div style="
        margin-top:2rem;
        display:flex;
        justify-content:center;
        align-items:center;
        gap:1rem;
        color:var(--valtara-oro);
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
                width:180px;
                accent-color:var(--valtara-oro);
            "
        >

        <i class="fa-solid fa-volume-high"></i>

    </div>

</div>

<div style="
    max-width:1200px;
    margin:0 auto 1.5rem auto;
    padding-left:2rem;
    border-left:5px solid var(--valtara-oro);
">

    <h4 style="
        color:var(--valtara-oro);
        font-size:2rem;
        margin:0;
        font-family:var(--font-accent);
    ">
        Radio Valtara
    </h4>

    <p style="
        color:#aaa;
        margin-top:.5rem;
    ">
        Estación inmersiva continua • 15 frecuencias botánicas originales
    </p>

</div>

<div class="carousel-master-container reveal" style="margin-bottom:6rem;">

    <div id="audio-carousel-radio"
        class="horizontal-carousel"
        style="
            display:flex;
            gap:24px;
            overflow-x:auto;
            scroll-behavior:smooth;
            padding:1rem;
        ">

        ${window.ValtaraAudioSystem.playlists.radio.map((track, index) => `

            <article class="glass-card carousel-card"
                onclick="window.ValtaraAudioSystem.loadPlaylist('radio', ${index})"
                style="
                    min-width:320px;
                    max-width:320px;
                    padding:2rem;
                    border-radius:2rem;
                    background:rgba(255,255,255,.03);
                    border:1px solid rgba(255,255,255,.08);
                    cursor:pointer;
                    transition:.35s;
                    flex-shrink:0;
                "
            >

                <div style="
                    width:90px;
                    height:90px;
                    border-radius:50%;
                    margin:0 auto 2rem auto;
                    background:radial-gradient(circle,
                    rgba(0,255,255,.2),
                    rgba(255,0,255,.12));
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:2rem;
                    color:var(--valtara-cian-brillante);
                ">
                    <i class="fa-solid fa-wave-square"></i>
                </div>

                <h4 style="
                    color:white;
                    font-size:1.3rem;
                    margin-bottom:1rem;
                    line-height:1.5;
                    text-align:center;
                    font-family:var(--font-accent);
                ">
                    ${track.title}
                </h4>

                <p style="
                    text-align:center;
                    color:rgba(255,255,255,.55);
                    line-height:1.8;
                ">
                    Radio Ambiental Valtara
                </p>

            </article>

        `).join('')}

    </div>

    <div class="carousel-navigation">

        <button class="carousel-btn"
            onclick="window.ValtaraCarousels.scroll('audio-carousel-radio', -1)">
            <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div class="carousel-indicator">
            15 Frecuencias
        </div>

        <button class="carousel-btn"
            onclick="window.ValtaraCarousels.scroll('audio-carousel-radio', 1)">
            <i class="fa-solid fa-chevron-right"></i>
        </button>

    </div>

</div>
`;

setTimeout(() => {

    if(window.ValtaraAudioSystem) {

        window.ValtaraAudioSystem.init();
    }

}, 700);
