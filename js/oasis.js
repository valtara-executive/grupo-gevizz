/**
 * ====================================================================================
 * BLOQUE 9: OASIS AUDIO ENGINE V17.0 (ULTRA-LUXURY PLAYER EDITION)
 * Motor acústico real con panel de control dinámico, volumen y barra de tiempo.
 * ====================================================================================
 */

const OasisEngine = {
    ctx: null, 
    masterGain: null, 
    analyser: null,
    audioEl: null,       
    audioSource: null,   
    isPlaying: false, 
    currentTrack: -1, 
    animFrame: null, 
    performanceMode: false,

    tracks: [
        { id: 1, name: "I. Vitalidad Cósmica", icon: "fa-mountain", file: "celestial_bloom.mp3" },
        { id: 2, name: "II. Flujo Cuántico", icon: "fa-water", file: "quantum_serenity.mp3" },
        { id: 3, name: "III. Fuego Estelar", icon: "fa-fire", file: "celestial_resonance.mp3" },
        { id: 4, name: "IV. Compasión", icon: "fa-heart", file: "celestial_whispers.mp3" },
        { id: 5, name: "V. Éter Etéreo", icon: "fa-wind", file: "ecos_etéreos_de_silencio.mp3" },
        { id: 6, name: "VI. Luz Serena", icon: "fa-eye", file: "serene_luminescence.mp3" },
        { id: 7, name: "VII. Trascendencia Nocturna", icon: "fa-infinity", file: "ecos_del_silencio_nocturno.mp3" }
    ],

    init: function() {
        this.audioEl = new Audio();
        this.audioEl.crossOrigin = "anonymous";
        this.audioEl.loop = true; 
        this.audioEl.volume = 0.7; // Volumen inicial (coincide con el HTML)
        
        this.renderTrackList();
        this.bindEvents();
    },

    lazyInitAudio: function() {
        if(this.ctx) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            
            this.masterGain = this.ctx.createGain();
            this.analyser = this.ctx.createAnalyser();
            this.analyser.fftSize = 256;

            this.audioSource = this.ctx.createMediaElementSource(this.audioEl);
            this.audioSource.connect(this.masterGain);
            this.masterGain.connect(this.analyser);
            this.analyser.connect(this.ctx.destination);
        } catch(e) {
            console.error("El navegador bloqueó la conexión de audio:", e);
        }
    },

    unlockAudioContext: function() {
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    formatTime: function(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    },

    bindEvents: function() {
        // --- 1. Controles del Reproductor (Play/Pausa) ---
        const playBtn = document.getElementById('btn-master-play');
        if(playBtn) {
            playBtn.addEventListener('click', () => {
                this.lazyInitAudio();
                this.unlockAudioContext();
                this.togglePlay();
            });
        }
        
        // --- 2. Control de Volumen Dinámico ---
        const volumeSlider = document.getElementById('oasis-volume-slider');
        if(volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                if(this.audioEl) this.audioEl.volume = e.target.value;
            });
        }

        // --- 3. Barra de Progreso (Tiempo real) ---
        const progressBar = document.getElementById('oasis-progress-bar');
        const timeCurrent = document.getElementById('oasis-time-current');
        const timeTotal = document.getElementById('oasis-time-total');

        if(this.audioEl && progressBar && timeCurrent && timeTotal) {
            
            // Cuando la canción carga, leemos cuánto dura
            this.audioEl.addEventListener('loadedmetadata', () => {
                progressBar.max = this.audioEl.duration;
                timeTotal.textContent = this.formatTime(this.audioEl.duration);
            });

            // Mientras la canción suena, movemos la barrita
            this.audioEl.addEventListener('timeupdate', () => {
                if(!this.audioEl.duration) return;
                progressBar.value = this.audioEl.currentTime;
                timeCurrent.textContent = this.formatTime(this.audioEl.currentTime);
            });

            // Si el usuario arrastra la barrita, adelantamos o atrasamos la canción
            progressBar.addEventListener('input', (e) => {
                this.audioEl.currentTime = e.target.value;
            });
        }
        
        // --- 4. Animaciones del Modal ---
        const modal = document.getElementById('audio-modal');
        if(modal) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'open') {
                        if (modal.hasAttribute('open')) {
                            if(this.isPlaying) this.startVisualizer();
                        } else {
                            cancelAnimationFrame(this.animFrame);
                        }
                    }
                });
            });
            observer.observe(modal, { attributes: true });
        }
    },

    renderTrackList: function() {
        const container = document.getElementById('audio-track-list');
        if(!container) return;
        
        container.innerHTML = '';
        this.tracks.forEach(t => {
            const btn = document.createElement('button');
            btn.className = 'track-btn';
            btn.setAttribute('data-id', t.id);
            btn.innerHTML = `<i class="fa-solid ${t.icon}"></i> <span>${t.name}</span>`;
            
            btn.addEventListener('click', () => {
                this.lazyInitAudio();
                this.unlockAudioContext(); 
                this.selectTrack(t.id);
            });
            
            container.appendChild(btn);
        });
    },

    startVisualizer: function() {
        if(this.performanceMode || !this.analyser) return;
        
        const canvas = document.getElementById('oasis-visualizer');
        if(!canvas) return;
        
        const canvasCtx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
            if(!this.isPlaying) return;
            this.animFrame = requestAnimationFrame(draw);
            
            this.analyser.getByteFrequencyData(dataArray);
            
            canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;
            
            for(let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 1.5;
                
                const r = Math.min(255, barHeight + 50); 
                const g = Math.max(0, 255 - barHeight * 2); 
                const b = 255; 
                
                canvasCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1;
            }
        };
        cancelAnimationFrame(this.animFrame);
        draw();
    },

    togglePlay: function() {
        if(this.isPlaying) {
            this.stopAll();
        } else {
            this.selectTrack(this.currentTrack === -1 ? 4 : this.currentTrack);
        }
    },

    stopAll: function() {
        this.isPlaying = false;
        
        if(this.audioEl) {
            this.audioEl.pause();
        }
        
        const playBtnIcon = document.querySelector('#btn-master-play i');
        if(playBtnIcon && !playBtnIcon.classList.contains('fa-triangle-exclamation')) {
            playBtnIcon.className = 'fa-solid fa-play';
        }
        
        document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('playing'));
        
        cancelAnimationFrame(this.animFrame);
        const canvas = document.getElementById('oasis-visualizer');
        if(canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    },

    selectTrack: function(trackId) {
        if(this.performanceMode || document.body.classList.contains('reduced-motion')) return;

        if(this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        
        this.stopAll();
        this.currentTrack = trackId;
        this.isPlaying = true;
        
        document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('playing'));
        const activeBtn = document.querySelector(`.track-btn[data-id="${trackId}"]`);
        if(activeBtn) activeBtn.classList.add('playing');
        
        const playBtnIcon = document.querySelector('#btn-master-play i');
        if(playBtnIcon) playBtnIcon.className = 'fa-solid fa-pause';
        
        const trackObj = this.tracks.find(t => t.id === trackId);
        if(trackObj) {
            
            // ACTUALIZAR EL TEXTO "REPRODUCIENDO AHORA"
            const nowPlayingText = document.getElementById('oasis-now-playing');
            if(nowPlayingText) {
                nowPlayingText.innerHTML = `<i class="fa-solid fa-music" style="margin-right: 8px;"></i> ${trackObj.name}`;
            }

            this.audioEl.src = encodeURI(trackObj.file);
            
            this.audioEl.play().catch(e => {
                console.error("Error al cargar la canción desde GitHub:", e);
                this.stopAll();
                
                if(playBtnIcon) {
                    playBtnIcon.className = 'fa-solid fa-triangle-exclamation';
                    playBtnIcon.style.color = '#ff5555';
                    setTimeout(() => {
                        playBtnIcon.className = 'fa-solid fa-play';
                        playBtnIcon.style.color = '';
                    }, 3000);
                }
            });
        }

        setTimeout(() => this.startVisualizer(), 200);
    }
};

window.addEventListener('DOMContentLoaded', () => OasisEngine.init());
