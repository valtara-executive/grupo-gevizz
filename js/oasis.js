/**
 * ====================================================================================
 * BLOQUE 9: OASIS AUDIO ENGINE V18.6 (APPLE MUSIC IMMERSIVE EDITION - FIXED)
 * Motor acústico de doble carrusel con scroll magnético, UI de tarjetas y A11y.
 * ====================================================================================
 */

// AQUÍ ESTÁ EL PARCHE: Ahora es window.OasisEngine para que el Constructor lo vea
window.OasisEngine = {
    ctx: null, 
    masterGain: null, 
    analyser: null,
    audioEl: null,       
    audioSource: null,   
    isPlaying: false, 
    currentTrack: -1, 
    animFrame: null, 
    performanceMode: false,

    // Bóveda de Sonido: 14 Pistas en 2 Categorías apuntando al directorio audio/
    tracks: [
        // --- CATEGORÍA 1: MICRO-DOSIS (30 SEGUNDOS) ---
        { id: 1, type: 'short', name: "I. Brisa de Lavanda", icon: "fa-wind", file: "audio/1.mp3" },
        { id: 2, type: 'short', name: "II. Latido de Cuarzo", icon: "fa-gem", file: "audio/2.mp3" },
        { id: 3, type: 'short', name: "III. Susurro de Bosque", icon: "fa-leaf", file: "audio/3.mp3" },
        { id: 4, type: 'short', name: "IV. Gota de Rocío", icon: "fa-droplet", file: "audio/4.mp3" },
        { id: 5, type: 'short', name: "V. Eco Estelar", icon: "fa-meteor", file: "audio/5.mp3" },
        { id: 6, type: 'short', name: "VI. Mente Cristalina", icon: "fa-brain", file: "audio/6.mp3" },
        { id: 7, type: 'short', name: "VII. Respiro de Loto", icon: "fa-spa", file: "audio/7.mp3" },
        { id: 8, type: 'short', name: "VIII. Aura Serena", icon: "fa-water", file: "audio/8.mp3" },
        { id: 9, type: 'short', name: "IX. Reflejo de Luna", icon: "fa-moon", file: "audio/9.mp3" },
        
        // --- CATEGORÍA 2: INMERSIÓN PROFUNDA (2 MINUTOS) ---
        { id: 10, type: 'long', name: "X. Marea de Terciopelo", icon: "fa-water", file: "audio/marea_de_terciopelo.mp3" },
        { id: 11, type: 'long', name: "XI. Marea Bajo el Crepúsculo", icon: "fa-cloud-moon", file: "audio/tide_beneath_the_twilight.mp3" },
        { id: 12, type: 'long', name: "XII. Un Hilo de Oro", icon: "fa-sun", file: "audio/un_hilo_de_oro.mp3" },
        { id: 13, type: 'long', name: "XIII. Manto Sin Orillas", icon: "fa-infinity", file: "audio/manto_sin_orillas.mp3" },
        { id: 14, type: 'long', name: "XIV. Dosel Dorado", icon: "fa-tree", file: "audio/gilded_canopy.mp3" }
    ],

    init: function() {
        this.audioEl = new Audio();
        this.audioEl.crossOrigin = "anonymous";
        this.audioEl.loop = true; 
        this.audioEl.volume = 0.7;
        
        this.renderTrackLists();
        this.bindEvents();
        // Arrancamos el radar de accesibilidad para los contadores de carrusel
        setTimeout(() => this.setupCarouselIndicators(), 1000);
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
        const playBtn = document.getElementById('btn-master-play');
        if(playBtn) {
            playBtn.addEventListener('click', () => {
                this.lazyInitAudio();
                this.unlockAudioContext();
                this.togglePlay();
            });
        }
        
        const volumeSlider = document.getElementById('oasis-volume-slider');
        if(volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                if(this.audioEl) this.audioEl.volume = e.target.value;
            });
        }

        const progressBar = document.getElementById('oasis-progress-bar');
        const timeCurrent = document.getElementById('oasis-time-current');
        const timeTotal = document.getElementById('oasis-time-total');

        if(this.audioEl && progressBar && timeCurrent && timeTotal) {
            this.audioEl.addEventListener('loadedmetadata', () => {
                progressBar.max = this.audioEl.duration;
                timeTotal.textContent = this.formatTime(this.audioEl.duration);
            });

            this.audioEl.addEventListener('timeupdate', () => {
                if(!this.audioEl.duration) return;
                progressBar.value = this.audioEl.currentTime;
                timeCurrent.textContent = this.formatTime(this.audioEl.currentTime);
            });

            progressBar.addEventListener('input', (e) => {
                this.audioEl.currentTime = e.target.value;
            });
        }
    },

    renderTrackLists: function() {
        const containerShort = document.getElementById('audio-carousel-short');
        const containerLong = document.getElementById('audio-carousel-long');
        
        if(containerShort) containerShort.innerHTML = '';
        if(containerLong) containerLong.innerHTML = '';

        this.tracks.forEach(t => {
            const btn = document.createElement('button');
            btn.className = 'track-btn carousel-card glass-card';
            btn.setAttribute('data-id', t.id);
            btn.style.cssText = 'flex-direction: column; padding: 2.5rem 1.5rem; justify-content: center; min-width: 250px; border-radius: 2rem; gap: 1.5rem;';
            
            const durationText = t.type === 'short' ? 'Micro-Dosis (30s)' : 'Inmersión (2 min)';
            
            btn.innerHTML = `
                <div style="width: 90px; height: 90px; border-radius: 50%; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,0,0,0.6)); display: flex; justify-content: center; align-items: center; border: 1px solid rgba(0,255,255,0.3); box-shadow: inset 0 0 25px rgba(0,255,255,0.15); margin: 0 auto; transition: 0.3s;">
                    <i class="fa-solid ${t.icon}" style="font-size: 2.8rem; color: var(--valtara-cian-brillante);"></i>
                </div>
                <div style="width: 100%;">
                    <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin: 0; font-family: var(--font-accent); line-height: 1.3;">${t.name}</h4>
                    <span style="color: #aaa; font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; display: block; margin-top: 8px;">${durationText}</span>
                </div>
            `;
            
            btn.addEventListener('click', () => {
                this.lazyInitAudio();
                this.unlockAudioContext(); 
                this.selectTrack(t.id);
            });
            
            if(t.type === 'short' && containerShort) {
                containerShort.appendChild(btn);
            } else if(t.type === 'long' && containerLong) {
                containerLong.appendChild(btn);
            }
        });
    },

    setupCarouselIndicators: function() {
        const setups = [
            { id: 'video-carousel', indId: 'indicator-video', total: 8 },
            { id: 'audio-carousel-short', indId: 'indicator-audio-short', total: 9 },
            { id: 'audio-carousel-long', indId: 'indicator-audio-long', total: 5 }
        ];

        setups.forEach(setup => {
            const carousel = document.getElementById(setup.id);
            const indicator = document.getElementById(setup.indId);
            
            if (carousel && indicator) {
                carousel.addEventListener('scroll', () => {
                    const scrollLeft = carousel.scrollLeft;
                    const card = carousel.querySelector('.carousel-card');
                    if(!card) return;
                    
                    const cardWidth = card.offsetWidth + 40; 
                    const currentIndex = Math.round(scrollLeft / cardWidth) + 1;
                    
                    let finalIndex = Math.min(Math.max(currentIndex, 1), setup.total);
                    indicator.textContent = finalIndex + " de " + setup.total;
                });
            }
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
            this.selectTrack(this.currentTrack === -1 ? 10 : this.currentTrack);
        }
    },

    stopAll: function() {
        this.isPlaying = false;
        if(this.audioEl) this.audioEl.pause();
        
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
            const nowPlayingText = document.getElementById('oasis-now-playing');
            if(nowPlayingText) {
                nowPlayingText.innerHTML = `<i class="fa-solid fa-music" style="margin-right: 8px;"></i> ${trackObj.name}`;
            }

            this.audioEl.src = encodeURI(trackObj.file);
            
            this.audioEl.play().catch(e => {
                console.error("Error al cargar la canción desde el directorio:", e);
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
