/**
 * ====================================================================================
 * MÓDULO: SONOTERAPIA AUDIO (V43.1 - Blindaje Anti-Caché Tainted Canvas)
 * ------------------------------------------------------------------------------------
 * Reproductor inmersivo con Playlist continua y protección contra bloqueos CORS.
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

// 1. INYECCIÓN HTML AL CONSTRUCTOR MAESTRO (Intacta con las 3 secciones)
window.ValtaraModulos.sonoterapia_audio = `
    <div style="text-align: center; max-width: 1200px; margin: 4rem auto 2rem auto;">
        <h3 style="color: var(--valtara-cian-brillante); font-family: var(--font-accent); font-size: 3rem; margin-bottom: 1rem;">II. Frecuencias Acústicas</h3>
        <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; font-weight: 300; letter-spacing: 0.1rem; text-transform: uppercase;">Curaduría de Audio Botánico de Valtara</p>
    </div>
    
    <div class="glass-card reveal" style="padding: 4rem; max-width: 1000px; margin: 0 auto 5rem auto; border-color: var(--valtara-cian-brillante); background: rgba(0,0,0,0.7); box-shadow: 0 2rem 6rem rgba(0, 255, 255, 0.15);">
        
        <div id="oasis-now-playing" style="text-align: center; color: var(--valtara-cian-brillante); font-size: 1.8rem; font-family: var(--font-accent); margin-bottom: 2rem; min-height: 2.5rem; letter-spacing: 1px;">
            Selecciona una pista botánica para comenzar
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

                <button class="master-play-btn" id="btn-master-play" aria-label="Reproducir o Pausar Audio" style="margin: 0; width: 85px; height: 85px; font-size: 2.5rem; flex-shrink: 0; background: transparent; border: none; color: white; cursor: pointer;">
                    <i class="fa-solid fa-play"></i>
                </button>

                <button class="radio-nav-btn" id="btn-next-track" aria-label="Siguiente pista" style="background: transparent; border: none; color: #fff; font-size: 1.8rem; cursor: pointer; transition: 0.3s;"><i class="fa-solid fa-forward-step"></i></button>

                <div style="display: flex; align-items: center; gap: 1.2rem; color: var(--valtara-oro-suave); font-size: 1.4rem; margin-left: 1.5rem;">
                    <i class="fa-solid fa-volume-low"></i>
                    <input type="range" id="oasis-volume-slider" min="0" max="1" step="0.01" value="0.7" style="width: 100px; accent-color: var(--valtara-oro); cursor: pointer; height: 6px;">
                    <i class="fa-solid fa-volume-high"></i>
                </div>
            </div>
        </div>
    </div>

    <div style="max-width: 1200px; margin: 0 auto 1.5rem auto; padding-left: 2rem; border-left: 5px solid var(--valtara-verde-menta);">
        <h4 style="color: var(--valtara-verde-menta); font-size: 2rem; font-family: var(--font-accent); margin: 0;">Micro-Dosis Botánicas</h4>
        <p style="color: #aaa; font-size: 1.1rem; margin: 0;">Frecuencias para reinicios cognitivos rápidos.</p>
    </div>
    <div class="carousel-master-container reveal" style="margin-bottom: 5rem;">
        <div id="audio-carousel-short" class="horizontal-carousel"></div>
        <div class="carousel-navigation">
            <button aria-label="Ver audios anteriores" class="carousel-btn" onclick="window.ValtaraCarousels && window.ValtaraCarousels.scroll('audio-carousel-short', -1)"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="carousel-indicator" id="indicator-audio-short" aria-live="polite">1 de 9</div>
            <button aria-label="Ver siguientes audios" class="carousel-btn" onclick="window.ValtaraCarousels && window.ValtaraCarousels.scroll('audio-carousel-short', 1)"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    </div>

    <div style="max-width: 1200px; margin: 0 auto 1.5rem auto; padding-left: 2rem; border-left: 5px solid var(--valtara-morado-vivo);">
        <h4 style="color: #E58CFF; font-size: 2rem; font-family: var(--font-accent); margin: 0;">Inmersión Profunda</h4>
        <p style="color: #aaa; font-size: 1.1rem; margin: 0;">Catálogo Acústico Extendido para meditación profunda.</p>
    </div>
    <div class="carousel-master-container reveal" style="margin-bottom: 6rem;">
        <div id="audio-carousel-long" class="horizontal-carousel"></div>
        <div class="carousel-navigation">
            <button aria-label="Ver audios anteriores" class="carousel-btn" onclick="window.ValtaraCarousels && window.ValtaraCarousels.scroll('audio-carousel-long', -1)"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="carousel-indicator" id="indicator-audio-long" aria-live="polite">1 de 14</div>
            <button aria-label="Ver siguientes audios" class="carousel-btn" onclick="window.ValtaraCarousels && window.ValtaraCarousels.scroll('audio-carousel-long', 1)"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    </div>

    <div style="max-width: 1200px; margin: 0 auto 1.5rem auto; padding-left: 2rem; border-left: 5px solid var(--valtara-oro-brillante);">
        <h4 style="color: var(--valtara-oro-brillante); font-size: 2rem; font-family: var(--font-accent); margin: 0;">Valtara Radio</h4>
        <p style="color: #aaa; font-size: 1.1rem; margin: 0;">Playlist continua de inmersión acústica.</p>
    </div>
    <div class="carousel-master-container reveal" style="margin-bottom: 6rem;">
        <div id="audio-carousel-radio" class="horizontal-carousel"></div>
        <div class="carousel-navigation">
            <button aria-label="Ver audios anteriores" class="carousel-btn" onclick="window.ValtaraCarousels && window.ValtaraCarousels.scroll('audio-carousel-radio', -1)"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="carousel-indicator" id="indicator-audio-radio" aria-live="polite">1 de 15</div>
            <button aria-label="Ver siguientes audios" class="carousel-btn" onclick="window.ValtaraCarousels && window.ValtaraCarousels.scroll('audio-carousel-radio', 1)"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    </div>
`;

// 2. BASES DE DATOS DE PISTAS
const playlists = {
    short: [
        { title: "Reseteo Alfa I", src: "audio/1.mp3" }, { title: "Reseteo Alfa II", src: "audio/2.mp3" }, { title: "Reseteo Alfa III", src: "audio/3.mp3" },
        { title: "Reseteo Alfa IV", src: "audio/4.mp3" }, { title: "Reseteo Alfa V", src: "audio/5.mp3" }, { title: "Reseteo Alfa VI", src: "audio/6.mp3" },
        { title: "Reseteo Alfa VII", src: "audio/7.mp3" }, { title: "Reseteo Alfa VIII", src: "audio/8.mp3" }, { title: "Reseteo Alfa IX", src: "audio/9.mp3" }
    ],
    long: [
        { title: "Beneath a Darkened Tide", src: "audio/beneath_a_darkened_tide.mp3" }, { title: "Dissolving the Indigo", src: "audio/dissolving_the_indigo.mp3" },
        { title: "El Umbral de Cristal", src: "audio/el_umbral_de_cristal.mp3" }, { title: "Flujo de Sal y de Piel", src: "audio/flujo_de_sal_y_de_piel.mp3" },
        { title: "Gilded Canopy", src: "audio/gilded_canopy.mp3" }, { title: "La Geometría del Silencio", src: "audio/la_geometr_a_del_silencio.mp3" },
        { title: "Manto Sin Orillas", src: "audio/manto_sin_orillas.mp3" }, { title: "Marea de Terciopelo", src: "audio/marea_de_terciopelo.mp3" },
        { title: "Piedra y Sal", src: "audio/piedra_y_sal.mp3" }, { title: "Sombra Divina", src: "audio/sombra_divina.mp3" },
        { title: "Tide Beneath Twilight", src: "audio/tide_beneath_the_twilight.mp3" }, { title: "Un Hilo de Oro", src: "audio/un_hilo_de_oro.mp3" },
        { title: "Bajo el Vidrio (Alt)", src: "audio/bajo_el_vidrio (1).mp3" }, { title: "The Slow Rotation (Alt)", src: "audio/the_slow_rotation (1).mp3" }
    ],
    radio: [
        { title: "Nuestra Catedral", src: "audio/nuestra_catedral.mp3" }, { title: "Steam From The Porcelain", src: "audio/steam_from_the_porcelain.mp3" },
        { title: "Donde el Alma Descansa", src: "audio/donde_el_alma_descansa.mp3" }, { title: "Un Respiro en el Andar", src: "audio/un_respiro_en_el_andar.mp3" },
        { title: "Un Puerto donde Descansar", src: "audio/un_puerto_donde_descansar.mp3" }, { title: "Refugio entre Ramas", src: "audio/refugio_entre_ramas.mp3" },
        { title: "Donde la Piedra se Rinde", src: "audio/donde_la_piedra_se_rinde.mp3" }, { title: "The Willow and the Stone", src: "audio/the_willow_and_the_stone.mp3" },
        { title: "Blue-inked Islands", src: "audio/blue-inked_islands.mp3" }, { title: "The Slow Rotation", src: "audio/the_slow_rotation.mp3" },
        { title: "Where Pulse and Pasture Meet", src: "audio/where_pulse_and_pasture_meet.mp3" }, { title: "Midnight Architecture", src: "audio/midnight_architecture.mp3" },
        { title: "Cristal y Sal", src: "audio/cristal_y_sal.mp3" }, { title: "The Quiet Pulse", src: "audio/the_quiet_pulse.mp3" }, { title: "Bajo el Vidrio", src: "audio/bajo_el_vidrio.mp3" }
    ]
};

// 3. MOTOR DE AUDIO BLINDADO (Desacoplado)
window.ValtaraAudioEngine = {
    audio: null, // Se inicializará dinámicamente para evitar corrupción de memoria
    currentPlaylist: 'radio',
    currentIndex: 0,
    isPlaying: false,
    audioCtx: null,
    analyser: null,
    canvasCtx: null,
    animationId: null,

    init: function() {
        console.log("🎵 [AUDIO ENGINE V43.1] Inicializando reproductor anti-caché...");
        this.renderCarousels();
        this.bindEvents();

        if (!this.audio) {
            this.audio = new Audio();
            // ⚠️ ELIMINAMOS crossOrigin="anonymous" PARA EVITAR EL BLOQUEO DEL CACHÉ EN GITHUB PAGES
            this.audio.volume = 0.7;

            // Lógica de Auto-Play Continuo
            this.audio.addEventListener('ended', () => this.playNext());
            this.audio.addEventListener('timeupdate', () => this.updateProgress());
            this.audio.addEventListener('loadedmetadata', () => {
                const totalSpan = document.getElementById('oasis-time-total');
                if(totalSpan) totalSpan.textContent = this.formatTime(this.audio.duration);
            });
            
            // Seguro de vida: Si el audio falla, salta a la siguiente canción
            this.audio.addEventListener('error', (e) => {
                console.warn("Error al cargar pista. Saltando a la siguiente...", e);
                setTimeout(() => this.playNext(), 1500);
            });
        }
    },

    renderCarousels: function() {
        const renderList = (listId, arrayName, color) => {
            const container = document.getElementById(listId);
            if (!container) return;
            let html = '';
            playlists[arrayName].forEach((track, index) => {
                html += `
                    <button class="track-btn" onclick="window.ValtaraAudioEngine.playTrack('${arrayName}', ${index})" style="min-width: 250px; background: rgba(255,255,255,0.05); border: 1px solid ${color}; border-radius: 15px; padding: 2rem; color: white; cursor: pointer; text-align: left; transition: 0.3s; flex-shrink: 0; margin-right: 15px;">
                        <i class="fa-solid fa-play" style="color: ${color}; font-size: 2rem; margin-bottom: 1rem;"></i>
                        <h5 style="margin: 0; font-size: 1.1rem; font-family: var(--font-accent);">${track.title}</h5>
                    </button>`;
            });
            container.innerHTML = html;
        };

        renderList('audio-carousel-short', 'short', 'rgba(0, 255, 153, 0.4)');
        renderList('audio-carousel-long', 'long', 'rgba(229, 140, 255, 0.4)');
        renderList('audio-carousel-radio', 'radio', 'rgba(212, 175, 55, 0.4)');
    },

    playTrack: function(listName, index) {
        this.currentPlaylist = listName;
        this.currentIndex = index;
        const track = playlists[this.currentPlaylist][this.currentIndex];
        
        this.audio.pause();
        
        // Carga pura sin queries extraños
        this.audio.src = track.src;
        this.audio.load();

        this.audio.play().then(() => {
            this.isPlaying = true;
            document.getElementById('oasis-now-playing').textContent = track.title;
            const btn = document.getElementById('btn-master-play');
            if(btn) btn.innerHTML = '<i class="fa-solid fa-pause" style="color: var(--valtara-cian-brillante);"></i>';
            
            // Inicializar visualizador de forma segura
            this.initVisualizerSafe();
        }).catch(e => console.warn("Interacción requerida por el navegador:", e));
    },

    playNext: function() {
        this.currentIndex++;
        if (this.currentIndex >= playlists[this.currentPlaylist].length) {
            this.currentIndex = 0; // Loop de la playlist actual
        }
        this.playTrack(this.currentPlaylist, this.currentIndex);
    },

    playPrev: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = playlists[this.currentPlaylist].length - 1;
        }
        this.playTrack(this.currentPlaylist, this.currentIndex);
    },

    togglePlay: function() {
        if (!this.audio.src) {
            this.playTrack('radio', 0); // Empieza por la radio por defecto
            return;
        }

        const btn = document.getElementById('btn-master-play');
        if (this.isPlaying) {
            this.audio.pause();
            btn.innerHTML = '<i class="fa-solid fa-play" style="color: white;"></i>';
            this.isPlaying = false;
        } else {
            this.audio.play().then(() => {
                btn.innerHTML = '<i class="fa-solid fa-pause" style="color: var(--valtara-cian-brillante);"></i>';
                this.isPlaying = true;
                this.initVisualizerSafe();
            }).catch(e => console.error("Error al reproducir:", e));
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

    seekTo: function() {
        const bar = document.getElementById('oasis-progress-bar');
        if (bar && this.audio.duration) {
            this.audio.currentTime = (bar.value / 100) * this.audio.duration;
        }
    },

    formatTime: function(seconds) {
        if(isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },

    bindEvents: function() {
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

    // 4. EL BLINDAJE (Aislamiento del Visualizador)
    initVisualizerSafe: function() {
        try {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                
                // Si el caché no tiene headers CORS, esta línea fallaría y detendría todo.
                // Al estar dentro del try/catch, si falla, el error es contenido y LA MÚSICA SIGUE.
                const source = this.audioCtx.createMediaElementSource(this.audio);
                this.analyser = this.audioCtx.createAnalyser();
                
                source.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);
                
                this.analyser.fftSize = 256;
                const canvas = document.getElementById("oasis-visualizer");
                if(canvas) this.canvasCtx = canvas.getContext("2d");
            }
            
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }

            this.drawVisualizer();
            
        } catch(e) { 
            console.warn("🛡️ Valtara Audio: Visualizador en pausa por seguridad del Caché. Reproducción asegurada.", e); 
        }
    },

    drawVisualizer: function() {
        if (!this.canvasCtx || !this.analyser) return;
        
        const canvas = document.getElementById("oasis-visualizer");
        if(!canvas) return;
        
        const width = canvas.width;
        const height = canvas.height;
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
            if(!this.isPlaying) return; // Pausar animación si no hay música
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
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.ValtaraAudioEngine.init();
    }, 400); 
});
