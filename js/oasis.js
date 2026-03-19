/**
 * ====================================================================================
 * BLOQUE 9: OASIS AUDIO ENGINE (V 10.1 SOVEREIGN)
 * Sintetizador generativo Web Audio API (Frecuencia Solfeggio 432Hz).
 * ====================================================================================
 */

const OasisEngine = {
    audioCtx: null,
    oscillator1: null,
    oscillator2: null,
    lfo: null,
    masterGain: null,
    isPlaying: false,
    animationId: null,
    
    // Frecuencia base de sanación (432Hz)
    baseFreq: 432,

    initAudio: function() {
        // Inicializa el contexto de audio solo cuando el usuario hace clic (política de navegadores)
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext();
        }
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    },

    togglePlay: function() {
        this.initAudio();
        
        const btnIcon = document.getElementById('play-icon');
        
        if (this.isPlaying) {
            this.stopSound();
            if(btnIcon) {
                btnIcon.classList.remove('fa-pause');
                btnIcon.classList.add('fa-play');
            }
            if(window.A11yEngine) A11yEngine.announce("Terapia sonora Oasis detenida.");
        } else {
            this.startSound();
            if(btnIcon) {
                btnIcon.classList.remove('fa-play');
                btnIcon.classList.add('fa-pause');
            }
            if(window.A11yEngine) A11yEngine.announce("Terapia sonora Oasis en reproducción a 432 Hertz.");
        }
        
        this.isPlaying = !this.isPlaying;
    },

    startSound: function() {
        // Crear el control de volumen maestro
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime); // Empieza en silencio
        this.masterGain.gain.linearRampToValueAtTime(0.15, this.audioCtx.currentTime + 3); // Sube volumen suave en 3s
        this.masterGain.connect(this.audioCtx.destination);

        // Oscilador 1: Tono puro fundamental
        this.oscillator1 = this.audioCtx.createOscillator();
        this.oscillator1.type = 'sine';
        this.oscillator1.frequency.value = this.baseFreq;
        this.oscillator1.connect(this.masterGain);

        // Oscilador 2: Tono profundo (Una octava abajo) para dar cuerpo
        this.oscillator2 = this.audioCtx.createOscillator();
        this.oscillator2.type = 'triangle';
        this.oscillator2.frequency.value = this.baseFreq / 2;
        
        const subGain = this.audioCtx.createGain();
        subGain.gain.value = 0.4;
        this.oscillator2.connect(subGain);
        subGain.connect(this.masterGain);

        // LFO (Low Frequency Oscillator) para crear el efecto de "Olas" o respiración
        this.lfo = this.audioCtx.createOscillator();
        this.lfo.type = 'sine';
        this.lfo.frequency.value = 0.15; // Muy lento (0.15Hz)
        
        const lfoGain = this.audioCtx.createGain();
        lfoGain.gain.value = 0.05;
        this.lfo.connect(lfoGain);
        lfoGain.connect(this.masterGain.gain);

        // Encender motores
        this.oscillator1.start();
        this.oscillator2.start();
        this.lfo.start();

        // Iniciar visualizador en pantalla
        this.startVisualizer();
    },

    stopSound: function() {
        if (this.masterGain) {
            // Bajar volumen suavemente en 2 segundos antes de apagar
            this.masterGain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 2);
            
            setTimeout(() => {
                if(this.oscillator1) this.oscillator1.stop();
                if(this.oscillator2) this.oscillator2.stop();
                if(this.lfo) this.lfo.stop();
                
                this.oscillator1.disconnect();
                this.oscillator2.disconnect();
                this.lfo.disconnect();
                this.masterGain.disconnect();
            }, 2100);
        }
        
        cancelAnimationFrame(this.animationId);
        this.clearVisualizer();
    },

    startVisualizer: function() {
        // En lugar de usar un AnalyserNode pesado, dibujamos matemáticas puras para máximo rendimiento
        const canvas = document.querySelector('#audio-modal canvas') || document.createElement('canvas');
        // Si no existe el canvas físicamente pero sí el contenedor (dependiendo de la estructura), intentamos encontrar su wrapper
        const container = document.querySelector('#audio-modal div[style*="100px"]');
        if(container && !document.querySelector('#audio-modal canvas')) {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            container.innerHTML = '';
            container.appendChild(canvas);
        }

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        let time = 0;
        
        const draw = () => {
            // Fondo semitransparente para crear estela
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'var(--valtara-cian-fluor, #4CC9F0)';
            
            const amplitude = canvas.height / 3;
            const frequency = 0.02;
            
            // Dibujar la onda sinodal pulsante
            for (let x = 0; x < canvas.width; x++) {
                const y = canvas.height/2 + Math.sin(x * frequency + time) * amplitude * Math.cos(time * 0.5);
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            
            ctx.stroke();
            time += 0.05;
            
            this.animationId = requestAnimationFrame(draw);
        };
        
        draw();
    },

    clearVisualizer: function() {
        const canvas = document.querySelector('#audio-modal canvas');
        if(canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const container = canvas.parentElement;
            if(container) container.innerHTML = '[ Sistema en Reposo ]';
        }
    }
};

// Se vincula globalmente para que el botón HTML pueda llamarlo con onclick="OasisEngine.togglePlay()"
window.OasisEngine = OasisEngine;
