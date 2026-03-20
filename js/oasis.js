/**
 * ====================================================================================
 * BLOQUE 9: OASIS AUDIO ENGINE V11.0 (SÍNTESIS GENERATIVA Y BINAURAL)
 * Motor de música matemática de 7 potencias con visualizador en vivo.
 * ====================================================================================
 */

const OasisEngine = {
    ctx: null, 
    masterGain: null, 
    analyser: null,
    isPlaying: false, 
    currentTrack: -1, 
    nodes: [], 
    intervals: [],
    animFrame: null, 
    performanceMode: false,

    tracks: [
        { id: 1, name: "I. Vitalidad (Frecuencia 396Hz)", icon: "fa-mountain", alg: "drone" },
        { id: 2, name: "II. Flujo (Frecuencia 417Hz)", icon: "fa-water", alg: "marimba" },
        { id: 3, name: "III. Fuego (Frecuencia 528Hz)", icon: "fa-fire", alg: "arpeggio" },
        { id: 4, name: "IV. Compasión (Frecuencia 639Hz)", icon: "fa-heart", alg: "pad" },
        { id: 5, name: "V. Éter (Frecuencia 741Hz)", icon: "fa-wind", alg: "crystals" },
        { id: 6, name: "VI. Luz (Frecuencia 852Hz)", icon: "fa-eye", alg: "piano" },
        { id: 7, name: "VII. Trascendencia (Binaural 432Hz)", icon: "fa-infinity", alg: "binaural" }
    ],

    init: function() {
        this.renderTrackList();
        this.bindEvents();
    },

    // ================================================================================
    // INICIALIZACIÓN PEREZOSA (LAZY LOAD) DEL AUDIO CONTEXT
    // ================================================================================
    lazyInitAudio: function() {
        if(this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        
        // Analizador para el Visualizador de Ondas
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 256;
        this.masterGain.connect(this.analyser);
    },

    bindEvents: function() {
        const playBtn = document.getElementById('btn-master-play');
        if(playBtn) {
            playBtn.addEventListener('click', () => this.togglePlay());
        }
        
        // Interceptar cuando se abre/cierra el modal para el visualizador
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
                this.selectTrack(t.id);
            });
            
            container.appendChild(btn);
        });
    },

    // ================================================================================
    // MOTOR VISUALIZADOR DE ONDAS (CANVAS)
    // ================================================================================
    startVisualizer: function() {
        if(this.performanceMode || !this.analyser) return;
        
        const canvas = document.getElementById('oasis-visualizer');
        if(!canvas) return;
        
        const canvasCtx = canvas.getContext('2d');
        // Ajustar resolución interna del canvas a su tamaño real
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
            if(!this.isPlaying) return;
            this.animFrame = requestAnimationFrame(draw);
            
            this.analyser.getByteFrequencyData(dataArray);
            
            // Fondo con rastro (Glow effect)
            canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;
            
            for(let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 1.5;
                
                // Colores dinámicos basados en la altura (Cian a Púrpura)
                const r = barHeight + 70;
                const g = 100 - (barHeight / 2);
                const b = 250;
                
                canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
                canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1;
            }
        };
        draw();
    },

    // ================================================================================
    // LÓGICA DE REPRODUCCIÓN
    // ================================================================================
    togglePlay: function() {
        if(this.isPlaying) {
            this.stopAll();
        } else {
            // Si le dan play sin elegir pista, pone la número 4 (Compasión) por defecto
            this.selectTrack(this.currentTrack === -1 ? 4 : this.currentTrack);
        }
    },

    stopAll: function() {
        if(!this.ctx) return;
        
        // Limpiar ciclos de tiempo
        this.intervals.forEach(i => { clearInterval(i); clearTimeout(i); });
        this.intervals = [];

        // Apagar nodos con Fade Out suave para no lastimar los oídos
        this.nodes.forEach(n => {
            if(n.gain) n.gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
            setTimeout(() => {
                if(n.osc) { try{ n.osc.stop(); n.osc.disconnect(); } catch(e){} }
            }, 1600);
        });
        
        this.nodes = [];
        this.isPlaying = false;
        
        // Actualizar UI
        const playBtnIcon = document.querySelector('#btn-master-play i');
        if(playBtnIcon) playBtnIcon.className = 'fa-solid fa-play';
        document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('playing'));
        
        cancelAnimationFrame(this.animFrame);
        const canvas = document.getElementById('oasis-visualizer');
        if(canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        if(window.A11yEngine) A11yEngine.announce("Audio inmersivo detenido.");
    },

    selectTrack: function(trackId) {
        // Bloqueo de seguridad si el paciente activó el modo Vestibular/Rendimiento
        if(this.performanceMode || document.body.classList.contains('reduced-motion')) {
            if(window.A11yEngine) A11yEngine.announce("El audio está desactivado por el modo de reducción de animaciones.");
            return;
        }

        this.lazyInitAudio();
        if(this.ctx.state === 'suspended') this.ctx.resume();
        
        this.stopAll();
        this.currentTrack = trackId;
        this.isPlaying = true;
        
        // Actualizar UI
        document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('playing'));
        const activeBtn = document.querySelector(`.track-btn[data-id="${trackId}"]`);
        if(activeBtn) activeBtn.classList.add('playing');
        
        const playBtnIcon = document.querySelector('#btn-master-play i');
        if(playBtnIcon) playBtnIcon.className = 'fa-solid fa-pause';
        
        // Enrutar al algoritmo correcto
        const trackObj = this.tracks.find(t => t.id === trackId);
        if(trackObj) {
            if(trackObj.alg === "drone") this.playDrone();
            else if(trackObj.alg === "marimba") this.playMarimba();
            else if(trackObj.alg === "arpeggio") this.playArpeggio();
            else if(trackObj.alg === "pad") this.playPad();
            else if(trackObj.alg === "crystals") this.playCrystals();
            else if(trackObj.alg === "piano") this.playPiano();
            else if(trackObj.alg === "binaural") this.playBinaural();
            
            if(window.A11yEngine) A11yEngine.announce(`Reproduciendo frecuencia: ${trackObj.name}`);
        }

        this.startVisualizer();
    },

    // ================================================================================
    // EFECTOS DE ESTUDIO (REVERB / DELAY)
    // ================================================================================
    _applyReverb: function(sourceGain) {
        // Simulador de Reverberación expansiva usando Delays cruzados
        const delay = this.ctx.createDelay();
        delay.delayTime.value = 0.4;
        
        const feedback = this.ctx.createGain();
        feedback.gain.value = 0.35;
        
        sourceGain.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        
        sourceGain.connect(this.masterGain);
        delay.connect(this.masterGain);
    },

    // ================================================================================
    // ALGORITMOS MATEMÁTICOS DE SÍNTESIS SONORA (7 POTENCIAS)
    // ================================================================================
    
    playDrone: function() { // 1. Vitalidad
        const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
        o.type = 'sawtooth'; o.frequency.value = 65; // Frecuencia baja profunda
        
        const filter = this.ctx.createBiquadFilter(); 
        filter.type = 'lowpass'; filter.frequency.value = 150;
        
        g.gain.setValueAtTime(0.001, this.ctx.currentTime); 
        g.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 4);
        
        const lfo = this.ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.1;
        const lfoGain = this.ctx.createGain(); lfoGain.gain.value = 50;
        
        lfo.connect(lfoGain); lfoGain.connect(filter.frequency); lfo.start();
        o.connect(filter); filter.connect(g); this._applyReverb(g); o.start();
        
        this.nodes.push({osc: o, gain: g}, {osc: lfo});
    },

    playMarimba: function() { // 2. Flujo (Agua)
        const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // Pentatónica
        const drip = () => {
            if(!this.isPlaying || this.currentTrack !== 2) return;
            const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
            o.type = 'sine'; o.frequency.value = scale[Math.floor(Math.random() * scale.length)];
            
            g.gain.setValueAtTime(0.001, this.ctx.currentTime); 
            g.gain.exponentialRampToValueAtTime(0.05, this.ctx.currentTime + 0.02); 
            g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
            
            o.connect(g); this._applyReverb(g); o.start(); o.stop(this.ctx.currentTime + 2);
            this.nodes.push({osc: o, gain: g});
            
            this.intervals.push(setTimeout(drip, 300 + (Math.random() * 600)));
        };
        drip();
    },

    playArpeggio: function() { // 3. Fuego
        const scale = [196.00, 233.08, 261.63, 293.66, 349.23]; 
        let idx = 0;
        const step = () => {
            if(!this.isPlaying || this.currentTrack !== 3) return;
            const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
            o.type = 'square'; o.frequency.value = scale[idx % scale.length];
            
            const filter = this.ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 800;
            
            g.gain.setValueAtTime(0.001, this.ctx.currentTime); 
            g.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 0.05); 
            g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
            
            o.connect(filter); filter.connect(g); this._applyReverb(g); o.start(); o.stop(this.ctx.currentTime + 0.5);
            this.nodes.push({osc: o, gain: g});
            
            idx++; this.intervals.push(setTimeout(step, 200)); 
        };
        step();
    },

    playPad: function() { // 4. Compasión (Corazón)
        const freqs = [349.23, 440.00, 523.25]; // Acorde F Mayor brillante
        freqs.forEach(f => {
            const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
            o.type = 'triangle'; o.frequency.value = f;
            
            g.gain.setValueAtTime(0.001, this.ctx.currentTime); 
            g.gain.linearRampToValueAtTime(0.025, this.ctx.currentTime + 5); // Fade in muy lento
            
            // LFO para efecto de "respiración" (Chorus natural)
            const lfo = this.ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.15 + (Math.random()*0.1);
            const lg = this.ctx.createGain(); lg.gain.value = 0.01;
            
            lfo.connect(lg); lg.connect(g.gain); lfo.start();
            o.connect(g); this._applyReverb(g); o.start();
            
            this.nodes.push({osc: o, gain: g}, {osc: lfo});
        });
    },

    playCrystals: function() { // 5. Éter (Cuencos)
        const chime = () => {
            if(!this.isPlaying || this.currentTrack !== 5) return;
            const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
            o.type = 'sine'; o.frequency.value = 600 + (Math.random() * 1200); // Frecuencias altas cristalinas
            
            g.gain.setValueAtTime(0.001, this.ctx.currentTime); 
            g.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 0.1); 
            g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 4);
            
            o.connect(g); this._applyReverb(g); o.start(); o.stop(this.ctx.currentTime + 4.5);
            this.nodes.push({osc: o, gain: g});
            
            this.intervals.push(setTimeout(chime, 600 + (Math.random() * 1000)));
        };
        chime();
    },

    playPiano: function() { // 6. Luz
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00]; 
        const strike = () => {
            if(!this.isPlaying || this.currentTrack !== 6) return;
            const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
            // Mezcla de triangle y sine para simular un piano eléctrico suave
            o.type = 'triangle'; o.frequency.value = notes[Math.floor(Math.random() * notes.length)];
            if(Math.random() > 0.6) o.frequency.value *= 2; // Octava arriba
            
            g.gain.setValueAtTime(0.001, this.ctx.currentTime); 
            g.gain.exponentialRampToValueAtTime(0.05, this.ctx.currentTime + 0.05); 
            g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3);
            
            o.connect(g); this._applyReverb(g); o.start(); o.stop(this.ctx.currentTime + 3.5);
            this.nodes.push({osc: o, gain: g});
            
            this.intervals.push(setTimeout(strike, 1200 + (Math.random() * 2000)));
        };
        strike();
    },

    playBinaural: function() { // 7. Trascendencia (Pulsos Binaurales Theta)
        const baseFreq = 432; // Frecuencia del Universo
        const beat = 6; // Frecuencia Theta (6Hz) para sueño profundo
        
        // Oído Izquierdo
        const oL = this.ctx.createOscillator(); const gL = this.ctx.createGain(); 
        oL.type = 'sine'; oL.frequency.value = baseFreq - (beat/2);
        const panL = this.ctx.createStereoPanner(); panL.pan.value = -1; // 100% Izquierda
        
        gL.gain.setValueAtTime(0.001, this.ctx.currentTime); 
        gL.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 3);
        oL.connect(gL); gL.connect(panL); this._applyReverb(panL); oL.start();
        
        // Oído Derecho
        const oR = this.ctx.createOscillator(); const gR = this.ctx.createGain(); 
        oR.type = 'sine'; oR.frequency.value = baseFreq + (beat/2);
        const panR = this.ctx.createStereoPanner(); panR.pan.value = 1; // 100% Derecha
        
        gR.gain.setValueAtTime(0.001, this.ctx.currentTime); 
        gR.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 3);
        oR.connect(gR); gR.connect(panR); this._applyReverb(panR); oR.start();
        
        this.nodes.push({osc: oL, gain: gL}, {osc: oR, gain: gR});
    }
};

window.addEventListener('DOMContentLoaded', () => OasisEngine.init());
