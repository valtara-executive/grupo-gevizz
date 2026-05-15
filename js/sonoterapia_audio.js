/**
 * ====================================================================================
 * MÓDULO: SONOTERAPIA AUDIO (V44 - Anti Caché Persistente SPA/PWA)
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

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
        letter-spacing:.1rem;
        text-transform:uppercase;
    ">
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
        box-shadow:0 2rem 6rem rgba(0,255,255,.15);
    "
>

    <div id="oasis-now-playing"
        style="
            text-align:center;
            color:var(--valtara-cian-brillante);
            font-size:1.8rem;
            font-family:var(--font-accent);
            margin-bottom:1rem;
            min-height:2.5rem;
            letter-spacing:1px;
        "
    >
        Selecciona una pista botánica para comenzar
    </div>

    <div id="oasis-next-track"
        style="
            text-align:center;
            color:rgba(255,255,255,.55);
            font-size:.95rem;
            margin-bottom:2rem;
        "
    >
        Radio inmersiva Valtara lista
    </div>

    <div class="canvas-audio-wrapper"
        style="
            margin-bottom:2.5rem;
            border-radius:1.5rem;
            overflow:hidden;
            border:1px solid rgba(0,255,255,.2);
            background:radial-gradient(circle, rgba(0,255,255,.05) 0%, rgba(0,0,0,.9) 100%);
        "
    >
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
            border:1px solid rgba(0,255,255,.2);
        "
    >

        <div style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:1.5rem;
            margin-bottom:2.5rem;
            color:var(--valtara-gris-texto);
        ">

            <span id="oasis-time-current">0:00</span>

            <input type="range"
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
            gap:2rem;
            flex-wrap:wrap;
        ">

            <button id="btn-prev-track"
                style="
                    background:none;
                    border:none;
                    color:white;
                    font-size:1.8rem;
                    cursor:pointer;
                "
            >
                <i class="fa-solid fa-backward-step"></i>
            </button>

            <button id="btn-master-play"
                style="
                    width:85px;
                    height:85px;
                    border-radius:50%;
                    border:1px solid rgba(255,255,255,.15);
                    background:rgba(255,255,255,.04);
                    color:white;
                    font-size:2.2rem;
                    cursor:pointer;
                "
            >
                <i class="fa-solid fa-play"></i>
            </button>

            <button id="btn-next-track"
                style="
                    background:none;
                    border:none;
                    color:white;
                    font-size:1.8rem;
                    cursor:pointer;
                "
            >
                <i class="fa-solid fa-forward-step"></i>
            </button>

            <div style="
                display:flex;
                align-items:center;
                gap:1rem;
                margin-left:1rem;
            ">

                <i class="fa-solid fa-volume-low"></i>

                <input type="range"
                    id="oasis-volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value="0.7"
                    style="
                        width:120px;
                        accent-color:var(--valtara-oro);
                    "
                >

                <i class="fa-solid fa-volume-high"></i>

            </div>

        </div>

    </div>

</div>

<div style="max-width:1200px;margin:0 auto 1.5rem auto;padding-left:2rem;border-left:5px solid var(--valtara-verde-menta);">
    <h4 style="color:var(--valtara-verde-menta);font-size:2rem;font-family:var(--font-accent);margin:0;">
        Micro-Dosis Botánicas
    </h4>
</div>

<div class="carousel-master-container reveal" style="margin-bottom:5rem;">
    <div id="audio-carousel-short" class="horizontal-carousel"></div>
</div>

<div style="max-width:1200px;margin:0 auto 1.5rem auto;padding-left:2rem;border-left:5px solid #E58CFF;">
    <h4 style="color:#E58CFF;font-size:2rem;font-family:var(--font-accent);margin:0;">
        Inmersión Profunda
    </h4>
</div>

<div class="carousel-master-container reveal" style="margin-bottom:5rem;">
    <div id="audio-carousel-long" class="horizontal-carousel"></div>
</div>

<div style="max-width:1200px;margin:0 auto 1.5rem auto;padding-left:2rem;border-left:5px solid var(--valtara-oro);">
    <h4 style="color:var(--valtara-oro);font-size:2rem;font-family:var(--font-accent);margin:0;">
        Valtara Radio
    </h4>
</div>

<div class="carousel-master-container reveal" style="margin-bottom:6rem;">
    <div id="audio-carousel-radio" class="horizontal-carousel"></div>
</div>

`;

const playlists = {

    short: [
        { title:"Reseteo Alfa I", src:"audio/1.mp3" },
        { title:"Reseteo Alfa II", src:"audio/2.mp3" },
        { title:"Reseteo Alfa III", src:"audio/3.mp3" },
        { title:"Reseteo Alfa IV", src:"audio/4.mp3" },
        { title:"Reseteo Alfa V", src:"audio/5.mp3" },
        { title:"Reseteo Alfa VI", src:"audio/6.mp3" },
        { title:"Reseteo Alfa VII", src:"audio/7.mp3" },
        { title:"Reseteo Alfa VIII", src:"audio/8.mp3" },
        { title:"Reseteo Alfa IX", src:"audio/9.mp3" }
    ],

    long: [
        { title:"Beneath a Darkened Tide", src:"audio/beneath_a_darkened_tide.mp3" },
        { title:"Dissolving the Indigo", src:"audio/dissolving_the_indigo.mp3" },
        { title:"El Umbral de Cristal", src:"audio/el_umbral_de_cristal.mp3" },
        { title:"Flujo de Sal y de Piel", src:"audio/flujo_de_sal_y_de_piel.mp3" },
        { title:"Gilded Canopy", src:"audio/gilded_canopy.mp3" },
        { title:"La Geometría del Silencio", src:"audio/la_geometria_del_silencio.mp3" },
        { title:"Manto Sin Orillas", src:"audio/manto_sin_orillas.mp3" },
        { title:"Marea de Terciopelo", src:"audio/marea_de_terciopelo.mp3" },
        { title:"Piedra y Sal", src:"audio/piedra_y_sal.mp3" },
        { title:"Sombra Divina", src:"audio/sombra_divina.mp3" }
    ],

    radio: [
        { title:"Nuestra Catedral", src:"audio/nuestra_catedral.mp3" },
        { title:"Vapor de la Porcelana", src:"audio/vapor_de_la_porcelana.mp3" },
        { title:"Donde el Alma Descansa", src:"audio/donde_el_alma_descansa.mp3" },
        { title:"Un Respiro en el Andar", src:"audio/un_respiro_en_el_andar.mp3" },
        { title:"Un Puerto Donde Descansar", src:"audio/un_puerto_donde_descansar.mp3" },
        { title:"Refugio entre Ramas", src:"audio/refugio_entre_ramas.mp3" },
        { title:"Donde la Piedra se Rinde", src:"audio/donde_la_piedra_se_rinde.mp3" },
        { title:"El Sauce y la Piedra", src:"audio/el_sauce_y_la_piedra.mp3" },
        { title:"Islas Entintadas Azules", src:"audio/islas_entintadas_azules.mp3" },
        { title:"La Rotación Lenta", src:"audio/la_rotacion_lenta.mp3" },
        { title:"Donde el Pulso y el Pasto se Encuentran", src:"audio/donde_el_pulso_y_el_pasto_se_encuentran.mp3" },
        { title:"Arquitectura Medianoche", src:"audio/arquitectura_medianoche.mp3" },
        { title:"Cristal y Sal", src:"audio/cristal_y_sal.mp3" },
        { title:"El Pulso Silencioso", src:"audio/el_pulso_silencioso.mp3" }
    ]
};

window.ValtaraAudioEngine = {

    audio:null,
    currentPlaylist:"radio",
    currentIndex:0,
    isPlaying:false,

    init:function(){

        this.renderCarousels();

        // DESTRUIR AUDIO VIEJO
        if(this.audio){

            try{

                this.audio.pause();
                this.audio.src = "";
                this.audio.load();

            }catch(e){
                console.log(e);
            }

            this.audio = null;
        }

        // CREAR AUDIO NUEVO
        this.audio = new Audio();

        this.audio.volume = 0.7;

        this.audio.addEventListener("ended", () => {
            this.playNext();
        });

        this.audio.addEventListener("timeupdate", () => {
            this.updateProgress();
        });

        this.bindEvents();

    },

    renderCarousels:function(){

        const render = (id, list, color) => {

            const container = document.getElementById(id);

            if(!container) return;

            container.innerHTML = playlists[list].map((track,index)=>`

                <button
                    onclick="window.ValtaraAudioEngine.playTrack('${list}', ${index})"
                    style="
                        min-width:260px;
                        background:rgba(255,255,255,.04);
                        border:1px solid ${color};
                        border-radius:18px;
                        padding:2rem;
                        color:white;
                        cursor:pointer;
                        text-align:left;
                        margin-right:18px;
                        flex-shrink:0;
                    "
                >

                    <i class="fa-solid fa-play"
                        style="
                            font-size:2rem;
                            color:${color};
                            margin-bottom:1rem;
                        ">
                    </i>

                    <h5 style="
                        margin:0;
                        font-size:1.1rem;
                        font-family:var(--font-accent);
                    ">
                        ${track.title}
                    </h5>

                </button>

            `).join("");

        };

        render("audio-carousel-short","short","rgba(0,255,170,.6)");
        render("audio-carousel-long","long","rgba(229,140,255,.6)");
        render("audio-carousel-radio","radio","rgba(212,175,55,.6)");

    },

    playTrack:function(list,index){

        this.currentPlaylist = list;
        this.currentIndex = index;

        const track = playlists[list][index];

        if(!track) return;

        this.audio.pause();

        // ANTI CACHE TOTAL
        this.audio.src = `${track.src}?v=${Date.now()}`;

        this.audio.load();

        this.audio.play();

        this.isPlaying = true;

        const btn = document.getElementById("btn-master-play");

        if(btn){
            btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }

        const now = document.getElementById("oasis-now-playing");

        if(now){
            now.textContent = track.title;
        }

        const nextIndex = (index + 1) % playlists[list].length;

        const nextTrack = playlists[list][nextIndex];

        const next = document.getElementById("oasis-next-track");

        if(next && nextTrack){
            next.textContent = `A continuación: ${nextTrack.title}`;
        }

    },

    playNext:function(){

        let next = this.currentIndex + 1;

        if(next >= playlists[this.currentPlaylist].length){
            next = 0;
        }

        this.playTrack(this.currentPlaylist, next);

    },

    playPrev:function(){

        let prev = this.currentIndex - 1;

        if(prev < 0){
            prev = playlists[this.currentPlaylist].length - 1;
        }

        this.playTrack(this.currentPlaylist, prev);

    },

    togglePlay:function(){

        if(!this.audio.src){

            this.playTrack("radio",0);
            return;
        }

        const btn = document.getElementById("btn-master-play");

        if(this.audio.paused){

            this.audio.play();
            this.isPlaying = true;

            if(btn){
                btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }

        }else{

            this.audio.pause();
            this.isPlaying = false;

            if(btn){
                btn.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        }

    },

    updateProgress:function(){

        const current = this.audio.currentTime;
        const total = this.audio.duration;

        if(!total) return;

        const percentage = (current / total) * 100;

        const bar = document.getElementById("oasis-progress-bar");

        if(bar){
            bar.value = percentage;
        }

        const currentText = document.getElementById("oasis-time-current");

        if(currentText){
            currentText.textContent = this.formatTime(current);
        }

        const totalText = document.getElementById("oasis-time-total");

        if(totalText){
            totalText.textContent = this.formatTime(total);
        }

    },

    formatTime:function(seconds){

        if(isNaN(seconds)) return "0:00";

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    },

    bindEvents:function(){

        const playBtn = document.getElementById("btn-master-play");
        const nextBtn = document.getElementById("btn-next-track");
        const prevBtn = document.getElementById("btn-prev-track");
        const volume = document.getElementById("oasis-volume-slider");
        const progress = document.getElementById("oasis-progress-bar");

        if(playBtn){
            playBtn.onclick = () => this.togglePlay();
        }

        if(nextBtn){
            nextBtn.onclick = () => this.playNext();
        }

        if(prevBtn){
            prevBtn.onclick = () => this.playPrev();
        }

        if(volume){

            volume.oninput = (e) => {
                this.audio.volume = e.target.value;
            };
        }

        if(progress){

            progress.oninput = (e) => {

                if(this.audio.duration){

                    this.audio.currentTime =
                        (e.target.value / 100) * this.audio.duration;
                }
            };
        }

    }

};

/* =========================================================
   INICIALIZADOR SPA/PWA SEGURO
========================================================= */

window.initValtaraAudio = function(){

    const short = document.getElementById("audio-carousel-short");
    const long = document.getElementById("audio-carousel-long");
    const radio = document.getElementById("audio-carousel-radio");

    if(!short || !long || !radio){

        requestAnimationFrame(window.initValtaraAudio);
        return;
    }

    window.ValtaraAudioEngine.init();

};

setTimeout(() => {
    window.initValtaraAudio();
}, 100);
