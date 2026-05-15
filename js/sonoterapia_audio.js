window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.sonoterapia_audio = `
<section id="valtara-sonoterapia-audio">

    <div style="text-align:center;max-width:1200px;margin:4rem auto 2rem auto;">
        <h3 style="color:var(--valtara-cian-brillante);font-family:var(--font-accent);font-size:3rem;margin-bottom:1rem;">
            II. Frecuencias Acústicas
        </h3>

        <p style="color:var(--valtara-gris-texto);font-size:1.1rem;letter-spacing:.12rem;text-transform:uppercase;">
            Curaduría de Audio Botánico de Valtara
        </p>
    </div>

    <div class="glass-card reveal"
        style="
            padding:4rem;
            max-width:1000px;
            margin:0 auto 5rem auto;
            border-color:var(--valtara-cian-brillante);
            background:rgba(0,0,0,.72);
            box-shadow:0 2rem 6rem rgba(0,255,255,.12);
        ">

        <div id="oasis-now-playing"
            style="
                text-align:center;
                color:var(--valtara-cian-brillante);
                font-size:1.8rem;
                font-family:var(--font-accent);
                margin-bottom:1rem;
                min-height:2.5rem;
            ">
            Selecciona una pista botánica para comenzar
        </div>

        <div id="oasis-next-track"
            style="
                text-align:center;
                color:#aaa;
                font-size:.95rem;
                margin-bottom:2rem;
                letter-spacing:.08rem;
            ">
            Próxima canción: —
        </div>

        <div class="canvas-audio-wrapper"
            style="
                margin-bottom:2.5rem;
                border-radius:1.5rem;
                overflow:hidden;
                border:1px solid rgba(0,255,255,.2);
                background:radial-gradient(circle, rgba(0,255,255,.05) 0%, rgba(0,0,0,.92) 100%);
            ">

            <canvas id="oasis-visualizer"
                style="
                    height:180px;
                    width:100%;
                    display:block;
                ">
            </canvas>
        </div>

        <div class="oasis-player-controls"
            style="
                background:rgba(255,255,255,.03);
                padding:2.5rem;
                border-radius:1.5rem;
                border:1px solid rgba(0,255,255,.18);
            ">

            <div style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:1rem;
                margin-bottom:2rem;
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
                align-items:center;
                justify-content:center;
                gap:1.5rem;
                flex-wrap:wrap;
            ">

                <button id="btn-prev-track"
                    class="carousel-btn"
                    aria-label="Anterior">
                    <i class="fa-solid fa-backward-step"></i>
                </button>

                <button
                    class="master-play-btn"
                    id="btn-master-play"
                    aria-label="Play Pause"
                    style="
                        width:90px;
                        height:90px;
                        font-size:2.5rem;
                    ">
                    <i class="fa-solid fa-play"></i>
                </button>

                <button id="btn-next-track"
                    class="carousel-btn"
                    aria-label="Siguiente">
                    <i class="fa-solid fa-forward-step"></i>
                </button>

            </div>

            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                gap:1rem;
                margin-top:2rem;
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
                        width:220px;
                        accent-color:var(--valtara-oro);
                    "
                >

                <i class="fa-solid fa-volume-high"></i>

            </div>

        </div>

    </div>

    <!-- MICRODOSIS -->

    <div style="max-width:1200px;margin:0 auto 1.5rem auto;padding-left:2rem;border-left:5px solid var(--valtara-verde-menta);">
        <h4 style="color:var(--valtara-verde-menta);font-size:2rem;font-family:var(--font-accent);margin:0;">
            Micro-Dosis Botánicas
        </h4>

        <p style="color:#aaa;">
            Frecuencias para reinicios cognitivos rápidos.
        </p>
    </div>

    <div class="carousel-master-container reveal" style="margin-bottom:5rem;">
        <div id="audio-carousel-short" class="horizontal-carousel"></div>

        <div class="carousel-navigation">
            <button class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-short', -1)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div class="carousel-indicator">
                Micro-Dosis
            </div>

            <button class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-short', 1)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </div>

    <!-- INMERSION -->

    <div style="max-width:1200px;margin:0 auto 1.5rem auto;padding-left:2rem;border-left:5px solid var(--valtara-morado-vivo);">
        <h4 style="color:#E58CFF;font-size:2rem;font-family:var(--font-accent);margin:0;">
            Inmersión Profunda
        </h4>

        <p style="color:#aaa;">
            Catálogo acústico extendido para meditación profunda.
        </p>
    </div>

    <div class="carousel-master-container reveal" style="margin-bottom:5rem;">
        <div id="audio-carousel-long" class="horizontal-carousel"></div>

        <div class="carousel-navigation">
            <button class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-long', -1)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div class="carousel-indicator">
                Inmersión
            </div>

            <button class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-long', 1)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </div>

    <!-- RADIO -->

    <div style="max-width:1200px;margin:0 auto 1.5rem auto;padding-left:2rem;border-left:5px solid var(--valtara-oro);">
        <h4 style="color:var(--valtara-oro);font-size:2rem;font-family:var(--font-accent);margin:0;">
            Radio Valtara
        </h4>

        <p style="color:#aaa;">
            Flujo continuo de composiciones inmersivas originales.
        </p>
    </div>

    <div class="carousel-master-container reveal" style="margin-bottom:6rem;">
        <div id="audio-carousel-radio" class="horizontal-carousel"></div>

        <div class="carousel-navigation">
            <button class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-radio', -1)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div class="carousel-indicator">
                Radio
            </div>

            <button class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-radio', 1)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </div>

</section>
`;



window.ValtaraAudioEngine = {

    audio: null,
    currentPlaylist: [],
    currentIndex: 0,

    playlists: {

        radio: [

            "audio/nuestra_catedral.mp3",
            "audio/steam_from_the_porcelain.mp3",
            "audio/donde_el_alma_descansa.mp3",
            "audio/un_respiro_en_el_andar.mp3",
            "audio/un_puerto_donde_descansar.mp3",
            "audio/refugio_entre_ramas.mp3",
            "audio/donde_la_piedra_se_rinde.mp3",
            "audio/the_willow_and_the_stone.mp3",
            "audio/blue-inked_islands.mp3",
            "audio/the_slow_rotation (1).mp3",
            "audio/the_slow_rotation.mp3",
            "audio/where_pulse_and_pasture_meet.mp3",
            "audio/midnight_architecture.mp3",
            "audio/cristal_y_sal.mp3",
            "audio/the_quiet_pulse.mp3"

        ]

    },

    init() {

        if(this.audio) return;

        this.audio = new Audio();
        this.audio.volume = 0.7;

        this.renderRadio();

        const playBtn = document.getElementById("btn-master-play");
        const nextBtn = document.getElementById("btn-next-track");
        const prevBtn = document.getElementById("btn-prev-track");

        playBtn?.addEventListener("click", () => {

            if(!this.currentPlaylist.length) {
                this.startRadio();
                return;
            }

            if(this.audio.paused) {
                this.audio.play();
                playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            } else {
                this.audio.pause();
                playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
            }

        });

        nextBtn?.addEventListener("click", () => {
            this.nextTrack();
        });

        prevBtn?.addEventListener("click", () => {
            this.prevTrack();
        });

        this.audio.addEventListener("ended", () => {
            this.nextTrack();
        });

        const volume = document.getElementById("oasis-volume-slider");

        volume?.addEventListener("input", (e) => {
            this.audio.volume = e.target.value;
        });

    },

    renderRadio() {

        const radio = document.getElementById("audio-carousel-radio");

        if(!radio) return;

        radio.innerHTML = "";

        this.playlists.radio.forEach((track, index) => {

            const name = track
                .split("/")
                .pop()
                .replace(".mp3","");

            radio.innerHTML += `
                <article
                    class="glass-card carousel-card"
                    style="
                        min-width:320px;
                        padding:2rem;
                        cursor:pointer;
                    "
                    onclick="window.ValtaraAudioEngine.playTrack(${index})"
                >

                    <div style="
                        width:110px;
                        height:110px;
                        border-radius:50%;
                        margin:0 auto 2rem auto;
                        background:radial-gradient(circle, rgba(0,255,255,.18), rgba(0,0,0,.9));
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        border:1px solid rgba(0,255,255,.25);
                    ">
                        <i class="fa-solid fa-wave-square"
                            style="
                                color:var(--valtara-cian-brillante);
                                font-size:2.5rem;
                            ">
                        </i>
                    </div>

                    <h4 style="
                        color:white;
                        font-size:1.2rem;
                        text-align:center;
                        line-height:1.5;
                    ">
                        ${name.replaceAll("_"," ")}
                    </h4>

                </article>
            `;

        });

    },

    startRadio() {
        this.currentPlaylist = this.playlists.radio;
        this.currentIndex = 0;
        this.loadTrack();
    },

    playTrack(index) {
        this.currentPlaylist = this.playlists.radio;
        this.currentIndex = index;
        this.loadTrack();
    },

    loadTrack() {

        const track = this.currentPlaylist[this.currentIndex];

        if(!track) return;

        this.audio.src = track;

        this.audio.play();

        document.getElementById("btn-master-play").innerHTML =
            `<i class="fa-solid fa-pause"></i>`;

        const currentName = track
            .split("/")
            .pop()
            .replace(".mp3","")
            .replaceAll("_"," ");

        document.getElementById("oasis-now-playing").innerText =
            currentName;

        const nextIndex =
            (this.currentIndex + 1) % this.currentPlaylist.length;

        const nextTrack =
            this.currentPlaylist[nextIndex]
                .split("/")
                .pop()
                .replace(".mp3","")
                .replaceAll("_"," ");

        document.getElementById("oasis-next-track").innerText =
            "Próxima canción: " + nextTrack;

    },

    nextTrack() {

        if(!this.currentPlaylist.length) return;

        this.currentIndex++;

        if(this.currentIndex >= this.currentPlaylist.length) {
            this.currentIndex = 0;
        }

        this.loadTrack();

    },

    prevTrack() {

        if(!this.currentPlaylist.length) return;

        this.currentIndex--;

        if(this.currentIndex < 0) {
            this.currentIndex = this.currentPlaylist.length - 1;
        }

        this.loadTrack();

    }

};



setTimeout(() => {

    window.ValtaraAudioEngine.init();

}, 300);
