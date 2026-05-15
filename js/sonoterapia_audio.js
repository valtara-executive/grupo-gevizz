/**
 * ====================================================================================
 * MÓDULO: SONOTERAPIA AUDIO (Valtara Radio V42.0)
 * ------------------------------------------------------------------------------------
 * Reproductor inmersivo con visualizador Canvas y Playlist continua.
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

// 1. INYECCIÓN HTML AL CONSTRUCTOR MAESTRO
window.ValtaraModulos.sonoterapia_audio = `
    <div style="text-align: center; max-width: 1200px; margin: 4rem auto 2rem auto;">
        <h3 style="color: var(--valtara-cian-brillante); font-family: var(--font-accent); font-size: 3rem; margin-bottom: 1rem;">II. Frecuencias Acústicas</h3>
        <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; font-weight: 300; letter-spacing: 0.1rem; text-transform: uppercase;">Valtara Radio - Curaduría Botánica</p>
    </div>
    
    <div class="glass-card reveal" style="padding: 4rem; max-width: 1000px; margin: 0 auto 5rem auto; border-color: var(--valtara-cian-brillante); background: rgba(0,0,0,0.7); box-shadow: 0 2rem 6rem rgba(0, 255, 255, 0.15);">
        
        <div id="oasis-now-playing" style="text-align: center; color: var(--valtara-cian-brillante); font-size: 1.8rem; font-family: var(--font-accent); margin-bottom: 2rem; min-height: 2.5rem; letter-spacing: 1px;">
            Selecciona una pista para iniciar el flujo
        </div>

        <div class="canvas-audio-wrapper" style="margin-bottom: 2.5rem; border-radius: 1.5rem; overflow: hidden; border: 1px solid rgba(0,255,255,0.2); background: radial-gradient(circle, rgba(0,255,255,0.05) 0%, rgba(0,0,0,0.9) 100%);">
            <canvas id="oasis-visualizer" aria-label="Visualizador de sonido" style="height: 180px; width: 100%; display: block;"></canvas>
        </div>

        <div class="oasis-player-controls" style="background: rgba(255,255,255,0.03); padding: 2.5rem; border-radius: 1.5rem; border: 1px solid rgba(0, 255, 255, 0.2); box-shadow: inset 0 0 2rem rgba(0,0,0,0.5);">
            
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; margin-bottom: 2.5rem; color: var(--valtara-gris-texto); font-size: 1.2rem;">
                <span id="oasis-time-current" style="font-family: monospace; font-weight: bold;">0:00</span>
                <input type="range" id="oasis-progress-bar" value="0" min="0" max="100" style="flex: 1; accent-color: var(--valtara-cian-brillante); cursor: pointer; height: 8px; border-radius: 4px;">
                <span id="oasis-time-total" style="font-family: monospace; font-weight: bold;">0:00</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                
                <button class="radio-nav-btn" id="btn-prev-track" aria-label="Pista anterior" style="background: transparent; border: none; color: #fff; font-size: 1.8rem; cursor: pointer; transition: 0.3s;"><i class="fa-solid fa-backward-step"></i></button>

                <button class="master-play-btn" id="btn-master-play" aria-label="Reproducir o Pausar Audio" style="margin: 0; width: 85px; height: 85px; font-size: 2.5rem; flex-shrink: 0; background: var(--valtara-cian-brillante); color: #000; border-radius: 50%; border: none; cursor: pointer; transition: 0.3s; box-shadow: 0 0 20px rgba(0,255,255,0.4);">
                    <i class="fa-solid fa-play"></i>
                </button>

                <button class="radio-nav-btn" id="btn-next-track" aria-label="Siguiente pista" style="background: transparent; border: none; color: #fff; font-size: 1.8rem; cursor: pointer; transition: 0.3s;"><i class="fa-solid fa-forward-step"></i></button>

                <div style="display: flex; align-items: center; gap: 1.2rem; color: var(--valtara-oro-suave); font-size: 1.4rem; margin-left: 2rem;">
                    <i class="fa-solid fa-volume-low"></i>
                    <input type="range" id="oasis-volume-slider" min="0" max="1" step="0.01" value="0.7" style="width: 100px; accent-color: var(--valtara-oro); cursor: pointer; height: 6px;">
                    <i class="fa-solid fa-volume-high"></i>
                </div>
            </div>
        </div>
    </div>

    <!-- Carrusel Visual Opcional -->
    <div style="max-width: 1200px; margin: 0 auto 1.5rem auto; padding-left: 2rem; border-left: 5px solid var(--valtara-verde-menta);">
        <h4 style="color: var(--valtara-verde-menta); font-size: 2rem; font-family: var(--font-accent); margin: 0;">Catálogo de Pistas</h4>
        <p style="color: #aaa; font-size: 1.1rem; margin: 0;">Valtara Radio fluye automáticamente.</p>
    </div>

    <div class="carousel-master-container reveal" style="margin-bottom: 5rem;">
        <div id="audio-carousel-playlist" class="horizontal-carousel"></div>
    </div>
`;

// 2. BASE DE DATOS DE PISTAS (Valtara Radio)
const radioPlaylist = [
    { title: "Nuestra Catedral", src: "audio/nuestra_catedral.mp3" },
    { title: "Steam From The Porcelain", src: "audio/steam_from_the_porcelain.mp3" },
    { title: "Donde el Alma Descansa", src: "audio/donde_el_alma_descansa.mp3" },
    { title: "Un Respiro en el Andar", src: "audio/un_respiro_en_el_andar.mp3" },
    { title: "Un Puerto donde Descansar", src: "audio/un_puerto_donde_descansar.mp3" },
    { title: "Refugio entre Ramas", src: "audio/refugio_entre_ramas.mp3" },
    { title: "Donde la Piedra se Rinde", src: "audio/donde_la_piedra_se_rinde.mp3" },
    { title: "The Willow and the Stone", src: "audio/the_willow_and_the_stone.mp3" },
    { title: "Blue-inked Islands", src: "audio/blue-inked_islands.mp3" },
    { title: "The Slow Rotation", src: "audio/the_slow_rotation.mp3" },
    { title: "Where Pulse and Pasture Meet", src: "audio/where_pulse_and_pasture_meet.mp3" },
    { title: "Midnight Architecture", src: "audio/midnight_architecture.mp3" },
    { title: "Cristal y Sal", src: "audio/cristal_y_sal.mp3" },
    { title: "The Quiet Pulse", src: "audio/the_quiet_pulse.mp3" },
    // Pistas previas
    { title: "Beneath a Darkened Tide", src: "audio/beneath_a_darkened_tide.mp3" },
    { title: "Dissolving the Indigo", src: "audio/dissolving_the_indigo.mp3" },
    { title: "El Umbral de Cristal", src: "audio/el_umbral_de_cristal.mp3" },
    { title: "Flujo de Sal y de Piel", src: "audio/flujo_de_sal_y_de_piel.mp3" },
    { title: "Gilded Canopy", src: "audio/gilded_canopy.mp3" },
    { title: "La Geometría del Silencio", src: "audio/la_geometr_a_del_silencio.mp3" },
    { title: "Manto Sin Orillas", src: "audio/manto_sin_orillas.mp3" },
    { title: "Marea de Terciopelo", src: "audio/marea_de_terciopelo.mp3" },
    { title: "Piedra y Sal", src: "audio/piedra_y_sal.mp3" },
    { title: "Sombra Divina", src: "audio/sombra_divina.mp3" }
];

// 3. MOTOR DE RADIO CONTINUA
window.ValtaraRadioEngine = {
    audio: new Audio(),
    currentIndex: 0,
    isPlaying: false,
    audioCtx: null,
    analyser: null,
    canvasCtx: null,
    animationId: null,

    init: function() {
        console.log("📻 [VALTARA RADIO] Encendiendo frecuencias...");
        this.renderCarousel();
        this.bindEvents();
        
        // Configuraciones de audio global
        this.audio.volume = 0.7;
        
        // Evento crítico: AUTO-PLAY (Flujo Continuo)
        this.audio.addEventListener('ended', () => {
            console.log("Pista terminada. Cambiando a la siguiente...");
            this.playNext();
        });

        // Actualizar barra de progreso
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => {
            document.getElementById('oasis-time-total').textContent = this.formatTime(this.audio.duration);
        });
    },

    renderCarousel: function() {
        const container = document.getElementById('audio-carousel-playlist');
        if (!container) return;
        
        let html = '';
        radioPlaylist.forEach((track, index) => {
            html += `
                <button class="track-btn" onclick="window.ValtaraRadioEngine.playTrack(${index})" style="min-width: 250px; background: rgba(255,255,255,0.05); border: 1px solid rgba(0,255,255,0.1); border-radius: 15px; padding: 2rem; color: white; cursor: pointer; text-align: left; transition: 0.3s; flex-shrink: 0;">
                    <i class="fa-solid fa-music" style="color: var(--valtara-cian-brillante); font-size: 2rem; margin-bottom: 1rem;"></i>
                    <h5 style="margin: 0; font-size: 1.2rem; font-family: var(--font-accent);">${track.title}</h5>
                </button>
            `;
        });
        container.innerHTML = html;
    },

    playTrack: function(index) {
        this.currentIndex = index;
        const track = radioPlaylist[this.currentIndex];
        
        // Efecto Crossfade básico simulado
        this.audio.pause();
        this.audio.src = track.src;
        this.audio.play()
            .then(() => {
                this.isPlaying = true;
                document.getElementById('oasis-now-playing').textContent = track.title;
                const btn = document.getElementById('btn-master-play');
                if(btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                this.initVisualizer();
            })
            .catch(err => console.log("Bloqueo del navegador para autoplay:", err));
    },

    playNext: function() {
        this.currentIndex++;
        if (this.currentIndex >= radioPlaylist.length) this.currentIndex = 0; // Loop infinito
        this.playTrack(this.currentIndex);
    },

    playPrev: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) this.currentIndex = radioPlaylist.length - 1;
        this.playTrack(this.currentIndex);
    },

    togglePlay: function() {
        if (!this.audio.src) {
            this.playTrack(0); // Si no hay nada, empieza con la 1
            return;
        }

        const btn = document.getElementById('btn-master-play');
        if (this.isPlaying) {
            this.audio.pause();
            btn.innerHTML = '<i class="fa-solid fa-play"></i>';
            this.isPlaying = false;
        } else {
            this.audio.play();
            btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            this.isPlaying = true;
            this.initVisualizer();
        }
    },

    updateProgress: function() {
        const current = this.audio.currentTime;
        const total = this.audio.duration;
        if (!total) return;

        const percentage = (current / total) * 100;
        const bar = document.getElementById('oasis-progress-bar');
        const timeStr = document.getElementById('oasis-time-current');
        
        if (bar) bar.value = percentage;
        if (timeStr) timeStr.textContent = this.formatTime(current);
    },

    seekTo: function(e) {
        const bar = document.getElementById('oasis-progress-bar');
        const seekTime = (bar.value / 100) * this.audio.duration;
        this.audio.currentTime = seekTime;
    },

    formatTime: function(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },

    bindEvents: function() {
        // Escucha en Body para que no importe si el HTML tardó en dibujar (Delegación)
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('#btn-master-play')) this.togglePlay();
            if (e.target.closest('#btn-next-track')) this.playNext();
            if (e.target.closest('#btn-prev-track')) this.playPrev();
        });

        document.body.addEventListener('input', (e) => {
            if (e.target.id === 'oasis-progress-bar') this.seekTo();
            if (e.target.id === 'oasis-volume-slider') {
                this.audio.volume = e.target.value;
            }
        });
    },

    initVisualizer: function() {
        if (this.audioCtx) return; // Solo inicializar una vez
        
        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const source = this.audioCtx.createMediaElementSource(this.audio);
            this.analyser = this.audioCtx.createAnalyser();
            
            source.connect(this.analyser);
            this.analyser.connect(this.audioCtx.destination);
            
            this.analyser.fftSize = 256;
            const bufferLength = this.analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            const canvas = document.getElementById("oasis-visualizer");
            if(!canvas) return;
            this.canvasCtx = canvas.getContext("2d");
            
            const draw = () => {
                if(!canvas) return;
                const width = canvas.width;
                const height = canvas.height;
                
                this.animationId = requestAnimationFrame(draw);
                this.analyser.getByteFrequencyData(dataArray);
                
                this.canvasCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
                this.canvasCtx.fillRect(0, 0, width, height);
                
                const barWidth = (width / bufferLength) * 2.5;
                let barHeight;
                let x = 0;
                
                for(let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i] / 2;
                    this.canvasCtx.fillStyle = `rgb(0, ${barHeight + 100}, 255)`;
                    this.canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight);
                    x += barWidth + 1;
                }
            };
            draw();
        } catch(e) { console.warn("Visualizador bloqueado (Safari/iOS) hasta primera interacción.", e); }
    }
};

// AUTO-ARRANQUE
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.ValtaraRadioEngine.init();
    }, 400); 
});
