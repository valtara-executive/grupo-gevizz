window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraAudio = window.ValtaraAudio || {};

window.ValtaraAudio = {

    audio: new Audio(),
    currentCategory: null,
    currentPlaylist: [],
    currentIndex: 0,
    isPlaying: false,
    crossfadeDuration: 2500,

    playlists: {

        short: [],

        long: [],

        radio: [

            "nuestra_catedral.mp3",
            "vapor_de_la_porcelana.mp3",
            "donde_el_alma_descansa.mp3",
            "un_respiro_en_el_andar.mp3",
            "un_puerto_donde_descansar.mp3",
            "refugio_entre_ramas.mp3",
            "donde_la_piedra_se_rinde.mp3",
            "el_sauce_y_la_piedra.mp3",
            "islas_entintadas_azules.mp3",
            "la_rotación_lenta (1).mp3",
            "la_rotación_lenta.mp3",
            "donde_el_pulso_y_el_pasto_se_encuentran.mp3",
            "arquitectura_medianoche.mp3",
            "cristal_y_sal.mp3",
            "el_pulso_silencioso.mp3"

        ]
    },

    reproducir: async function(categoria, archivo, titulo, index = 0) {

        try {

            this.currentCategory = categoria;
            this.currentPlaylist = this.playlists[categoria] || [];
            this.currentIndex = index;

            const nowPlaying = document.getElementById("oasis-now-playing");

            if(nowPlaying) {
                nowPlaying.innerHTML = `
                    <span style="opacity:.7;">Reproduciendo ahora:</span><br>
                    <strong style="color:white;">${titulo}</strong>
                `;
            }

            await this.fadeOut();

            this.audio.src = `audio/${archivo}`;
            this.audio.volume = 0;

            await this.audio.play();

            this.fadeIn();

            this.isPlaying = true;

            const playBtn = document.getElementById("btn-master-play");

            if(playBtn) {
                playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            }

            localStorage.setItem("valtara_track", archivo);
            localStorage.setItem("valtara_category", categoria);
            localStorage.setItem("valtara_index", index);

        } catch(e) {
            console.log(e);
        }
    },

    togglePlay: function() {

        if(!this.audio.src) return;

        const playBtn = document.getElementById("btn-master-play");

        if(this.audio.paused) {

            this.audio.play();

            this.isPlaying = true;

            if(playBtn) {
                playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            }

        } else {

            this.audio.pause();

            this.isPlaying = false;

            if(playBtn) {
                playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
            }
        }
    },

    siguiente: function() {

        if(!this.currentPlaylist.length) return;

        this.currentIndex++;

        if(this.currentIndex >= this.currentPlaylist.length) {
            this.currentIndex = 0;
        }

        const archivo = this.currentPlaylist[this.currentIndex];

        const titulo = archivo
            .replace(".mp3","")
            .replaceAll("_"," ")
            .replaceAll("(","")
            .replaceAll(")","");

        this.reproducir(
            this.currentCategory,
            archivo,
            titulo,
            this.currentIndex
        );
    },

    fadeOut: function() {

        return new Promise(resolve => {

            const fade = setInterval(() => {

                if(this.audio.volume > 0.05) {

                    this.audio.volume -= 0.05;

                } else {

                    clearInterval(fade);

                    this.audio.pause();

                    resolve();
                }

            }, 80);

        });
    },

    fadeIn: function() {

        const fade = setInterval(() => {

            if(this.audio.volume < 0.7) {

                this.audio.volume += 0.05;

            } else {

                clearInterval(fade);
            }

        }, 80);
    }
};

window.ValtaraAudio.audio.addEventListener("ended", () => {

    window.ValtaraAudio.siguiente();

});

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
        font-size:1.15rem;
        letter-spacing:.08rem;
        text-transform:uppercase;
    ">
        Curaduría Sonora de Valtara
    </p>

</div>

<div class="glass-card reveal"
     style="
        padding:4rem;
        max-width:1000px;
        margin:0 auto 5rem auto;
        border-color:rgba(0,255,255,.25);
        background:rgba(255,255,255,.03);
        backdrop-filter:blur(18px);
        box-shadow:0 2rem 6rem rgba(0,255,255,.12);
        border-radius:32px;
">

    <div id="oasis-now-playing"
         style="
            text-align:center;
            color:var(--valtara-cian-brillante);
            font-size:1.7rem;
            font-family:var(--font-accent);
            margin-bottom:2rem;
            min-height:3rem;
            line-height:1.6;
    ">
        Selecciona una experiencia sonora
    </div>

    <div class="canvas-audio-wrapper"
         style="
            margin-bottom:2.5rem;
            border-radius:1.5rem;
            overflow:hidden;
            border:1px solid rgba(0,255,255,.15);
            background:
            radial-gradient(circle at center,
            rgba(0,255,255,.06) 0%,
            rgba(0,0,0,.88) 100%);
    ">

        <canvas id="oasis-visualizer"
                style="
                    height:180px;
                    width:100%;
                    display:block;
        "></canvas>

    </div>

    <div style="
        display:flex;
        align-items:center;
        justify-content:center;
        gap:2rem;
        flex-wrap:wrap;
    ">

        <button id="btn-master-play"
                onclick="window.ValtaraAudio.togglePlay()"
                style="
                    width:88px;
                    height:88px;
                    border-radius:50%;
                    border:none;
                    background:
                    linear-gradient(135deg,
                    rgba(0,255,255,.18),
                    rgba(255,255,255,.05));
                    color:white;
                    font-size:2rem;
                    cursor:pointer;
                    backdrop-filter:blur(18px);
                    box-shadow:0 0 35px rgba(0,255,255,.15);
        ">
            <i class="fa-solid fa-play"></i>
        </button>

        <div style="
            display:flex;
            align-items:center;
            gap:1rem;
            color:white;
        ">

            <i class="fa-solid fa-volume-low"></i>

            <input type="range"
                   min="0"
                   max="1"
                   step="0.01"
                   value="0.7"
                   oninput="window.ValtaraAudio.audio.volume=this.value"
                   style="
                        width:140px;
                        accent-color:var(--valtara-cian-brillante);
            ">

            <i class="fa-solid fa-volume-high"></i>

        </div>

    </div>

</div>

<!-- MICRODOSIS -->

<div style="
    max-width:1200px;
    margin:0 auto 1.5rem auto;
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

    <p style="color:#aaa;">
        Reinicios cognitivos rápidos.
    </p>

</div>

<div class="horizontal-carousel"
     id="audio-carousel-short"
     style="
        display:flex;
        gap:24px;
        overflow-x:auto;
        padding:1rem 2rem 3rem 2rem;
">

    ${Array.from({length:9}, (_,i)=>`

        <article class="glass-card carousel-card"
                 onclick="
                    window.ValtaraAudio.reproducir(
                        'short',
                        '${i+1}.mp3',
                        'Frecuencia ${String(i+1).padStart(2,'0')}',
                        ${i}
                    )
                 "
                 style="
                    min-width:320px;
                    border-radius:30px;
                    padding:2rem;
                    cursor:pointer;
                    background:rgba(255,255,255,.03);
                    backdrop-filter:blur(18px);
                    border:1px solid rgba(255,255,255,.08);
        ">

            <div style="
                width:120px;
                height:120px;
                border-radius:50%;
                margin:auto;
                margin-bottom:2rem;
                background:
                radial-gradient(circle,
                rgba(0,255,255,.18),
                rgba(0,0,0,.1));
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:3rem;
                color:var(--valtara-cian-brillante);
            ">
                <i class="fa-solid fa-leaf"></i>
            </div>

            <h4 style="
                color:white;
                font-size:2rem;
                font-family:var(--font-accent);
                margin-bottom:.8rem;
            ">
                Frecuencia ${String(i+1).padStart(2,'0')}
            </h4>

            <p style="
                color:rgba(255,255,255,.65);
                letter-spacing:.15rem;
                text-transform:uppercase;
            ">
                Micro-Dosis
            </p>

        </article>

    `).join("")}

</div>

<!-- INMERSIÓN -->

<div style="
    max-width:1200px;
    margin:0 auto 1.5rem auto;
    padding-left:2rem;
    border-left:5px solid #E58CFF;
">

    <h4 style="
        color:#E58CFF;
        font-size:2rem;
        font-family:var(--font-accent);
        margin:0;
    ">
        Inmersión Profunda
    </h4>

    <p style="color:#aaa;">
        Meditación acústica extendida.
    </p>

</div>

<div class="horizontal-carousel"
     id="audio-carousel-long"
     style="
        display:flex;
        gap:24px;
        overflow-x:auto;
        padding:1rem 2rem 3rem 2rem;
">

    ${[
        "bajo_el_vidrio.mp3",
        "manto_sin_orillas.mp3"
    ].map((track,index)=>`

        <article class="glass-card carousel-card"
                 onclick="
                    window.ValtaraAudio.reproducir(
                        'long',
                        '${track}',
                        '${track.replace(".mp3","").replaceAll("_"," ")}',
                        ${index}
                    )
                 "
                 style="
                    min-width:320px;
                    border-radius:30px;
                    padding:2rem;
                    cursor:pointer;
                    background:rgba(255,255,255,.03);
                    backdrop-filter:blur(18px);
                    border:1px solid rgba(255,255,255,.08);
        ">

            <div style="
                width:120px;
                height:120px;
                border-radius:50%;
                margin:auto;
                margin-bottom:2rem;
                background:
                radial-gradient(circle,
                rgba(229,140,255,.2),
                rgba(0,0,0,.1));
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:3rem;
                color:#E58CFF;
            ">
                <i class="fa-solid fa-water"></i>
            </div>

            <h4 style="
                color:white;
                font-size:1.7rem;
                font-family:var(--font-accent);
                margin-bottom:.8rem;
            ">
                ${track.replace(".mp3","").replaceAll("_"," ")}
            </h4>

            <p style="
                color:rgba(255,255,255,.65);
                letter-spacing:.15rem;
                text-transform:uppercase;
            ">
                Inmersión
            </p>

        </article>

    `).join("")}

</div>

<!-- RADIO -->

<div style="
    max-width:1200px;
    margin:0 auto 1.5rem auto;
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

    <p style="color:#aaa;">
        Paisajes contemplativos para acompañar la noche.
    </p>

</div>

<div class="horizontal-carousel"
     id="audio-carousel-radio"
     style="
        display:flex;
        gap:24px;
        overflow-x:auto;
        padding:1rem 2rem 5rem 2rem;
">

    ${window.ValtaraAudio.playlists.radio.map((track,index)=>`

        <article class="glass-card carousel-card"
                 onclick="
                    window.ValtaraAudio.reproducir(
                        'radio',
                        '${track}',
                        '${track.replace(".mp3","").replaceAll("_"," ")}',
                        ${index}
                    )
                 "
                 style="
                    min-width:340px;
                    border-radius:32px;
                    padding:2rem;
                    cursor:pointer;
                    background:rgba(255,255,255,.03);
                    backdrop-filter:blur(18px);
                    border:1px solid rgba(255,255,255,.08);
                    position:relative;
                    overflow:hidden;
        ">

            <div style="
                position:absolute;
                inset:0;
                background:
                radial-gradient(circle at top right,
                rgba(255,215,0,.08),
                transparent 60%);
            "></div>

            <div style="
                width:120px;
                height:120px;
                border-radius:50%;
                margin:auto;
                margin-bottom:2rem;
                background:
                radial-gradient(circle,
                rgba(255,215,0,.16),
                rgba(0,0,0,.1));
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:3rem;
                color:var(--valtara-oro);
                position:relative;
                z-index:2;
            ">
                <i class="fa-solid fa-radio"></i>
            </div>

            <h4 style="
                color:white;
                font-size:1.6rem;
                font-family:var(--font-accent);
                margin-bottom:.9rem;
                position:relative;
                z-index:2;
                line-height:1.5;
            ">
                ${track
                    .replace(".mp3","")
                    .replaceAll("_"," ")
                    .replaceAll("(","")
                    .replaceAll(")","")}
            </h4>

            <p style="
                color:rgba(255,255,255,.65);
                line-height:1.8;
                position:relative;
                z-index:2;
            ">
                Radio contemplativa de restauración emocional y desaceleración mental.
            </p>

        </article>

    `).join("")}

</div>
`;
