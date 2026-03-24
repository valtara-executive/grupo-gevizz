/**
 * ====================================================================================
 * BLOQUE 9: OASIS AUDIO ENGINE V15.0 (HIGH-FIDELITY BINAURAL EDITION)
 * Motor de reproducción acústica real con visualizador de ondas en tiempo real.
 * ====================================================================================
 */

const OasisEngine = {
    ctx: null, 
    masterGain: null, 
    analyser: null,
    audioEl: null,       // Reproductor maestro de HTML5
    audioSource: null,   // Puente entre la música real y el visualizador matemático
    isPlaying: false, 
    currentTrack: -1, 
    animFrame: null, 
    performanceMode: false,

    // Las 7 Potencias Clínicas (Enlazadas a tus archivos MP3 en la raíz de GitHub)
    tracks: [
        { id: 1, name: "I. Vitalidad Cósmica", icon: "fa-mountain", file: "celestial_bloom.mp3" },
        { id: 2, name: "II. Flujo Cuántico", icon: "fa-water", file: "quantum_serenity.mp3" },
        { id: 3, name: "III. Fuego Estelar", icon: "fa-fire", file: "celestial_resonance.mp3" },
        { id: 4, name: "IV. Compasión", icon: "fa-heart", file: "celestial_whispers.mp3" },
        { id: 5, name: "V. Éter Etéreo", icon: "fa-wind", file: "ecos_etereos_de_silencio.mp3" },
        { id: 6, name: "VI. Luz Serena", icon: "fa-eye", file: "serene_luminescence.mp3" },
        { id: 7, name: "VII. Trascendencia Nocturna", icon: "fa-infinity", file: "ecos_del_silencio_nocturno.mp3" }
    ],

    init: function() {
        // Creamos el reproductor de audio oculto desde el inicio
        this.audioEl = new Audio();
        this.audioEl.crossOrigin = "anonymous";
        this.audioEl.loop = true; // Bucle infinito para los 30 segundos
        
        this.renderTrackList();
        this.bindEvents();
    },

    // INICIALIZACIÓN DEL CEREBRO DE AUDIO (Para el Visualizador de Ondas)
    lazyInitAudio: function() {
        if(this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        
        this.masterGain = this.ctx.createGain();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 256;

        // Conectamos la música física al analizador de la pantalla
        this.audioSource = this.ctx.createMediaElementSource(this.audioEl);
        this.audioSource.connect(this.masterGain);
        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
    },

    // PARCHE: Despertar el motor de audio en dispositivos Apple/Android
    unlockAudioContext: function() {
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    bindEvents: function() {
        const playBtn = document.getElementById('btn-master-play');
        if(playBtn) {
            playBtn.addEventListener('click', () => {
                this.lazyInitAudio();
                this.unlockAudioContext();
                this
