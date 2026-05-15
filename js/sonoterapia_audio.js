window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraAudioEngine = window.ValtaraAudioEngine || {

    audio: null,
    currentPlaylist: [],
    currentIndex: 0,
    visualizerStarted: false,
    analyser: null,
    ctx: null,
    source: null,

    init() {

        if (this.audio) return;

        this.audio = new Audio();
        this.audio.crossOrigin = "anonymous";
        this.audio.volume = 0.7;

        this.audio.addEventListener('ended', () => {
            this.next();
        });

        this.audio.addEventListener('timeupdate', () => {

            const current = document.getElementById('oasis-time-current');
            const total = document.getElementById('oasis-time-total');
            const bar = document.getElementById('oasis-progress-bar');

            if(current) {
                current.textContent = this.format(this.audio.currentTime);
            }

            if(total) {
                total.textContent = this.format(this.audio.duration || 0);
            }

            if(bar && this.audio.duration) {
                bar.value = (this.audio.currentTime / this.audio.duration) * 100;
            }

        });

    },

    playTrack(playlist, index) {

        this.init();

        this.currentPlaylist = playlist;
        this.currentIndex = index;

        const track = playlist[index];

        if(!track) return;

        this.audio.pause();

        this.audio.src = `audio/${track.file}`;
        this.audio.load();

        this.audio.play().then(() => {

            const nowPlaying = document.getElementById('oasis-now-playing');

            if(nowPlaying) {
                nowPlaying.innerHTML = `
                    <div style="font-size:1.9rem;color:var(--valtara-cian-brillante);">
                        ${track.title}
                    </div>

                    <div style="
                        margin-top:.7rem;
                        color:rgba(255,255,255,.55);
                        font-size:.95rem;
                        letter-spacing:.08rem;
                        text-transform:uppercase;
                    ">
                        ${track.category}
                    </div>
                `;
            }

            this.updateNextTrack();

            const playBtn = document.querySelector('#btn-master-play i');

            if(playBtn){
                playBtn.className = 'fa-solid fa-pause';
            }

            this.startVisualizer();

        }).catch(err => {
            console.log(err);
        });

    },

    togglePlay() {

        if(!this.audio) return;

        const icon = document.querySelector('#btn-master-play i');

        if(this.audio.paused){

            this.audio.play();

            if(icon){
                icon.className = 'fa-solid fa-pause';
            }

        } else {

            this.audio.pause();

            if(icon){
                icon.className = 'fa-solid fa-play';
            }

        }

    },

    next() {

        if(!this.currentPlaylist.length) return;

        this.currentIndex++;

        if(this.currentIndex >= this.currentPlaylist.length){
            this.currentIndex = 0;
        }

        this.playTrack(this.currentPlaylist, this.currentIndex);

    },

    previous() {

        if(!this.currentPlaylist.length) return;

        this.currentIndex--;

        if(this.currentIndex < 0){
            this.currentIndex = this.currentPlaylist.length - 1;
        }

        this.playTrack(this.currentPlaylist, this.currentIndex);

    },

    updateNextTrack() {

        const nextBox = document.getElementById('valtara-next-track');

        if(!nextBox) return;

        let nextIndex = this.currentIndex + 1;

        if(nextIndex >= this.currentPlaylist.length){
            nextIndex = 0;
        }

        const next = this.currentPlaylist[nextIndex];

        if(!next) return;

        nextBox.innerHTML = `
            <span style="opacity:.6;">A continuación:</span>
            <strong style="color:var(--valtara-oro);">
                ${next.title}
            </strong>
        `;

    },

    format(sec) {

        if(isNaN(sec)) return "0:00";

        const mins = Math.floor(sec / 60);
        const secs = Math.floor(sec % 60);

        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },

    startVisualizer() {

        if(this.visualizerStarted) return;

        const canvas = document.getElementById('oasis-visualizer');

        if(!canvas) return;

        this.ctx = new (window.AudioContext || window.webkitAudioContext)();

        this.analyser = this.ctx.createAnalyser();

        this.source = this.ctx.createMediaElementSource(this.audio);

        this.source.connect(this.analyser);

        this.analyser.connect(this.ctx.destination);

        this.analyser.fftSize = 256;

        const bufferLength = this.analyser.frequencyBinCount;

        const dataArray = new Uint8Array(bufferLength);

        const c = canvas.getContext('2d');

        canvas.width = canvas.offsetWidth;
        canvas.height = 180;

        const render = () => {

            requestAnimationFrame(render);

            this.analyser.getByteFrequencyData(dataArray);

            c.clearRect(0,0,canvas.width,canvas.height);

            let x = 0;

            const barWidth = (canvas.width / bufferLength) * 1.7;

            for(let i = 0; i < bufferLength; i++){

                const h = dataArray[i] * 0.7;

                const gradient = c.createLinearGradient(0,0,0,canvas.height);

                gradient.addColorStop(0, '#00ffff');
                gradient.addColorStop(1, '#f2c94c');

                c.fillStyle = gradient;

                c.fillRect(
                    x,
                    canvas.height - h,
                    barWidth,
                    h
                );

                x += barWidth + 2;
            }

        };

        render();

        this.visualizerStarted = true;

    }

};

window.ValtaraAudioPlaylists = {

    short: [

        { title:'Audio 1', file:'1.mp3', category:'Micro-Dosis Botánicas' },
        { title:'Audio 2', file:'2.mp3', category:'Micro-Dosis Botánicas' },
        { title:'Audio 3', file:'3.mp3', category:'Micro-Dosis Botánicas' },
        { title:'Audio 4', file:'4.mp3', category:'Micro-Dosis Botánicas' },
        { title:'Audio 5', file:'5.mp3', category:'Micro-Dosis Botánicas' },
        { title:'Audio 6', file:'6.mp3', category:'Micro-Dosis Botánicas' },
        { title:'Audio 7', file:'7.mp3', category:'Micro-Dosis Botánicas' },
        { title:'Audio 8', file:'8.mp3', category:'Micro-Dosis Botánicas' },
        { title:'Audio 9', file:'9.mp3', category:'Micro-Dosis Botánicas' }

    ],

    radio: [

        { title:'Nuestra Catedral', file:'nuestra_catedral.mp3', category:'Radio Valtara' },
        { title:'Vapor de la Porcelana', file:'vapor_de_la_porcelana.mp3', category:'Radio Valtara' },
        { title:'Donde el Alma Descansa', file:'donde_el_alma_descansa.mp3', category:'Radio Valtara' },
        { title:'Un Respiro en el Andar', file:'un_respiro_en_el_andar.mp3', category:'Radio Valtara' },
        { title:'Un Puerto Donde Descansar', file:'un_puerto_donde_descansar.mp3', category:'Radio Valtara' },
        { title:'Refugio Entre Ramas', file:'refugio_entre_ramas.mp3', category:'Radio Valtara' },
        { title:'Donde la Piedra se Rinde', file:'donde_la_piedra_se_rinde.mp3', category:'Radio Valtara' },
        { title:'El Sauce y la Piedra', file:'el_sauce_y_la_piedra.mp3', category:'Radio Valtara' },
        { title:'Islas Entintadas Azules', file:'islas_entintadas_azules.mp3', category:'Radio Valtara' },
        { title:'La Rotación Lenta', file:'la_rotación_lenta.mp3', category:'Radio Valtara' },
        { title:'La Rotación Lenta I', file:'la_rotación_lenta (1).mp3', category:'Radio Valtara' },
        { title:'Donde el Pulso y el Pasto se Encuentran', file:'donde_el_pulso_y_el_pasto_se_encuentran.mp3', category:'Radio Valtara' },
        { title:'Arquitectura Medianoche', file:'arquitectura_medianoche.mp3', category:'Radio Valtara' },
        { title:'Cristal y Sal', file:'cristal_y_sal.mp3', category:'Radio Valtara' },
        { title:'El Pulso Silencioso', file:'el_pulso_silencioso.mp3', category:'Radio Valtara' }

    ]

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
    background:rgba(0,0,0,.7);
">

    <div id="oasis-now-playing"
    style="
        text-align:center;
        color:var(--valtara-cian-brillante);
        font-size:1.8rem;
        margin-bottom:1rem;
        min-height:2.5rem;
    ">
        Selecciona una pista botánica
    </div>

    <div id="valtara-next-track"
    style="
        text-align:center;
        margin-bottom:2rem;
        color:rgba(255,255,255,.7);
        min-height:1.5rem;
    ">
        A continuación: —
    </div>

    <div class="canvas-audio-wrapper"
    style="
        margin-bottom:2.5rem;
        border-radius:1.5rem;
        overflow:hidden;
        border:1px solid rgba(0,255,255,.2);
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
        justify-content:center;
        align-items:center;
        gap:1.5rem;
        flex-wrap:wrap;
    ">

        <button onclick="window.ValtaraAudioEngine.previous()"
        class="carousel-btn">
            <i class="fa-solid fa-backward-step"></i>
        </button>

        <button class="master-play-btn"
        id="btn-master-play"
        onclick="window.ValtaraAudioEngine.togglePlay()"
        style="
            width:85px;
            height:85px;
            font-size:2.4rem;
        ">
            <i class="fa-solid fa-play"></i>
        </button>

        <button onclick="window.ValtaraAudioEngine.next()"
        class="carousel-btn">
            <i class="fa-solid fa-forward-step"></i>
        </button>

    </div>

</div>

<div style="max-width:1200px;margin:0 auto 1.5rem auto;padding-left:2rem;border-left:5px solid var(--valtara-verde-menta);">
    <h4 style="color:var(--valtara-verde-menta);font-size:2rem;font-family:var(--font-accent);margin:0;">
        Micro-Dosis Botánicas
    </h4>
</div>

<div id="audio-carousel-short"
style="
    display:flex;
    gap:18px;
    overflow-x:auto;
    padding:1rem 2rem 3rem 2rem;
"></div>

<div style="max-width:1200px;margin:0 auto 1.5rem auto;padding-left:2rem;border-left:5px solid var(--valtara-oro);">
    <h4 style="color:var(--valtara-oro);font-size:2rem;font-family:var(--font-accent);margin:0;">
        Radio Valtara
    </h4>
</div>

<div id="audio-carousel-radio"
style="
    display:flex;
    gap:18px;
    overflow-x:auto;
    padding:1rem 2rem 3rem 2rem;
"></div>
`;

setTimeout(() => {

    const buildCards = (containerId, playlist) => {

        const container = document.getElementById(containerId);

        if(!container) return;

        container.innerHTML = playlist.map((track, index) => `

            <article
            onclick="window.ValtaraAudioEngine.playTrack(window.ValtaraAudioPlaylists.${containerId.includes('radio') ? 'radio' : 'short'}, ${index})"
            style="
                min-width:280px;
                padding:1.5rem;
                border-radius:22px;
                background:rgba(255,255,255,.04);
                border:1px solid rgba(255,255,255,.08);
                cursor:pointer;
                transition:.3s;
                flex-shrink:0;
            ">

                <div style="
                    height:170px;
                    border-radius:18px;
                    margin-bottom:1.2rem;
                    background:
                    radial-gradient(circle at top,
                    rgba(0,255,255,.22),
                    rgba(0,0,0,.9));
                    display:flex;
                    align-items:center;
                    justify-content:center;
                ">
                    <i class="fa-solid fa-wave-square"
                    style="
                        font-size:4rem;
                        color:var(--valtara-cian-brillante);
                    "></i>
                </div>

                <h4 style="
                    color:white;
                    font-size:1.2rem;
                    line-height:1.5;
                    margin-bottom:.7rem;
                ">
                    ${track.title}
                </h4>

                <p style="
                    color:rgba(255,255,255,.55);
                    font-size:.88rem;
                    text-transform:uppercase;
                    letter-spacing:.08rem;
                ">
                    ${track.category}
                </p>

            </article>

        `).join('');

    };

    buildCards('audio-carousel-short', window.ValtaraAudioPlaylists.short);
    buildCards('audio-carousel-radio', window.ValtaraAudioPlaylists.radio);

}, 100);
