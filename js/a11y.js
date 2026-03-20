/**
 * ====================================================================================
 * BLOQUE 7: A11Y ENGINE V11.0 (ACCESIBILIDAD UNIVERSAL E INCLUSIÓN)
 * Controla TTS (Texto a Voz), Máscaras cognitivas, Dislexia y Contraste Extremo.
 * ====================================================================================
 */

const A11yEngine = {
    // Registro de modos activos
    modes: {
        'a11y-contrast': 'high-contrast',
        'a11y-invert': 'invert-colors',
        'a11y-dyslexia': 'dyslexia-font',
        'a11y-spacing': 'text-spacing',
        'a11y-guide': 'reading-guide-active',
        'a11y-mask': 'focus-mask-active',
        'a11y-motion': 'reduced-motion'
    },
    
    ttsActive: false,
    synth: window.speechSynthesis,

    init: function() {
        this.injectDynamicHelpers();
        this.loadPreferences();
        this.bindEvents();
    },

    // ================================================================================
    // INYECCIÓN DINÁMICA DE AYUDAS VISUALES (TDAH Y ENFOQUE)
    // ================================================================================
    injectDynamicHelpers: function() {
        // Creamos la línea de la guía de lectura
        const guide = document.createElement('div');
        guide.id = 'reading-guide-line';
        guide.setAttribute('aria-hidden', 'true');
        document.body.appendChild(guide);

        // Creamos las máscaras de enfoque (Arriba y Abajo)
        const maskTop = document.createElement('div');
        maskTop.id = 'focus-mask-top';
        maskTop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(maskTop);

        const maskBottom = document.createElement('div');
        maskBottom.id = 'focus-mask-bottom';
        maskBottom.setAttribute('aria-hidden', 'true');
        document.body.appendChild(maskBottom);

        // Algoritmo de seguimiento del cursor / dedo
        document.addEventListener('mousemove', (e) => this.updateHelpersPosition(e.clientY));
        document.addEventListener('touchmove', (e) => {
            if(e.touches.length > 0) this.updateHelpersPosition(e.touches[0].clientY);
        }, { passive: true });
    },

    updateHelpersPosition: function(yPos) {
        // Solo calcular si los modos están activos para ahorrar batería (Performance)
        if(document.body.classList.contains('reading-guide-active')) {
            const guide = document.getElementById('reading-guide-line');
            if(guide) guide.style.top = `${yPos}px`;
        }

        if(document.body.classList.contains('focus-mask-active')) {
            const maskTop = document.getElementById('focus-mask-top');
            const maskBottom = document.getElementById('focus-mask-bottom');
            const aperture = 150; // Tamaño de la "ventana" transparente en píxeles

            if(maskTop && maskBottom) {
                maskTop.style.height = `${yPos - (aperture / 2)}px`;
                maskBottom.style.top = `${yPos + (aperture / 2)}px`;
                maskBottom.style.height = `calc(100vh - ${yPos + (aperture / 2)}px)`;
            }
        }
    },

    // ================================================================================
    // GESTIÓN DE PREFERENCIAS (LFPDPPP COMPLIANT - LOCAL STORAGE)
    // ================================================================================
    loadPreferences: function() {
        Object.keys(this.modes).forEach(btnId => {
            const cssClass = this.modes[btnId];
            const isEnabled = localStorage.getItem(`valtara_${cssClass}`) === 'true';
            
            if(isEnabled) {
                document.body.classList.add(cssClass);
                const btn = document.getElementById(btnId);
                if(btn) {
                    btn.setAttribute('aria-pressed', 'true');
                }
            }
        });

        // Revisar si el motor de audio debe bloquearse por sensibilidad vestibular
        if(document.body.classList.contains('reduced-motion')) {
            if(window.OasisEngine) window.OasisEngine.performanceMode = true;
        }
    },

    bindEvents: function() {
        // Vincular todos los botones de accesibilidad visual
        Object.keys(this.modes).forEach(btnId => {
            const btn = document.getElementById(btnId);
            if(btn) {
                btn.addEventListener('click', () => {
                    const cssClass = this.modes[btnId];
                    const isNowActive = document.body.classList.toggle(cssClass);
                    
                    // Actualizar UI del botón
                    btn.setAttribute('aria-pressed', isNowActive ? 'true' : 'false');
                    
                    // Guardar en el dispositivo
                    localStorage.setItem(`valtara_${cssClass}`, isNowActive);
                    
                    // Lógica especial para Modo Vestibular (Apagar animaciones y audio)
                    if(cssClass === 'reduced-motion') {
                        if(isNowActive) {
                            if(window.OasisEngine) {
                                window.OasisEngine.stopAll();
                                window.OasisEngine.performanceMode = true;
                            }
                            this.announce("Animaciones y audio inmersivo desactivados por protocolo vestibular.");
                        } else {
                            if(window.OasisEngine) window.OasisEngine.performanceMode = false;
                            this.announce("Animaciones restauradas.");
                        }
                    } else {
                        const featureName = btn.querySelector('span').textContent;
                        this.announce(`${featureName} ${isNowActive ? 'activado' : 'desactivado'}.`);
                    }
                });
            }
        });

        // Vincular el botón de Texto a Voz (TTS)
        const ttsBtn = document.getElementById('a11y-voice');
        if(ttsBtn) {
            ttsBtn.addEventListener('click', () => {
                this.toggleTTS(ttsBtn);
            });
        }
    },

    // ================================================================================
    // MOTOR DE SÍNTESIS DE VOZ (TEXT-TO-SPEECH)
    // ================================================================================
    toggleTTS: function(btn) {
        if (!this.synth) {
            this.announce("Lo sentimos, su navegador no soporta síntesis de voz.");
            return;
        }

        this.ttsActive = !this.ttsActive;
        btn.setAttribute('aria-pressed', this.ttsActive ? 'true' : 'false');

        if(this.ttsActive) {
            this.announce("Modo de lectura en voz alta activado. Procesando la pantalla actual.");
            this.readCurrentView();
        } else {
            this.synth.cancel(); // Detener la lectura inmediatamente
            this.announce("Lectura en voz alta desactivada.");
        }
    },

    readCurrentView: function() {
        if(!this.ttsActive) return;
        
        // Cancelar cualquier lectura previa para no empalmar audios
        this.synth.cancel();

        // Buscar qué sección de la SPA (Single Page Application) está activa actualmente
        const activeSection = document.querySelector('.view-section.active');
        if(!activeSection) return;

        // Extraer texto limpio de títulos y párrafos, ignorando botones para no ensuciar la lectura
        let textToRead = "Sección actual: ";
        
        const headings = activeSection.querySelectorAll('h2, h3');
        headings.forEach(h => textToRead += h.textContent + ". ");
        
        const paragraphs = activeSection.querySelectorAll('p.marketing-text, p.hero-desc');
        paragraphs.forEach(p => textToRead += p.textContent + ". ");

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'es-MX'; // Español de México
        utterance.rate = 0.95; // Velocidad ligeramente pausada para ser relajante
        utterance.pitch = 1;

        // Buscar una voz femenina suave si está disponible
        const voices = this.synth.getVoices();
        const mexicanVoice = voices.find(v => v.lang === 'es-MX' && v.name.includes('Sabina'));
        if(mexicanVoice) utterance.voice = mexicanVoice;

        this.synth.speak(utterance);
    },

    // ================================================================================
    // LOCUTOR ARIA (Para Lectores de Pantalla para Invidentes)
    // ================================================================================
    announce: function(message) {
        const liveRegion = document.getElementById('a11y-announcer');
        if(liveRegion) {
            // Limpiamos y re-inyectamos para forzar al lector a hablar
            liveRegion.textContent = '';
            setTimeout(() => {
                liveRegion.textContent = message;
            }, 100);
        }
    }
};

// CSS Dinámico para las ayudas visuales inyectadas por JS
const a11yStyles = document.createElement('style');
a11yStyles.textContent = `
    /* Estilos inyectados por el motor de Accesibilidad */
    #reading-guide-line {
        display: none; position: fixed; left: 0; width: 100vw; height: 4px;
        background: var(--valtara-cian-fluor); z-index: 99998; pointer-events: none;
        box-shadow: 0 0 15px var(--valtara-cian-fluor); transition: top 0.1s linear;
    }
    body.reading-guide-active #reading-guide-line { display: block; }
    
    #focus-mask-top, #focus-mask-bottom {
        display: none; position: fixed; left: 0; width: 100vw;
        background: rgba(0,0,0,0.85); z-index: 99997; pointer-events: none;
        transition: height 0.1s linear, top 0.1s linear; backdrop-filter: blur(2px);
    }
    body.focus-mask-active #focus-mask-top, body.focus-mask-active #focus-mask-bottom { display: block; }
    
    /* Reglas de Alto Contraste Real */
    body.high-contrast {
        --valtara-negro-fondo: #000000 !important;
        --valtara-negro-modal: #000000 !important;
        --cristal-fondo: #000000 !important;
        --cristal-borde: #FFFF00 !important;
        --valtara-blanco: #FFFFFF !important;
        --valtara-gris-texto: #FFFFFF !important;
        --valtara-oro: #FFFF00 !important;
        --valtara-cian-fluor: #FFFF00 !important;
        --valtara-magenta-neon: #FFFF00 !important;
        --valtara-purpura-aura: #FFFF00 !important;
        --valtara-verde-ws: #FFFF00 !important;
    }
    body.high-contrast .ambient-engine, body.high-contrast .gold-icon { display: none !important; }
    body.high-contrast .glass-card { box-shadow: none !important; border: 3px solid #FFFF00 !important; }
    
    /* Inversión de Colores */
    body.invert-colors { filter: invert(1) hue-rotate(180deg); background-color: #FFFFFF; }
    body.invert-colors .ambient-engine { display: none !important; }
    
    /* Tipografía para Dislexia */
    body.dyslexia-font * { font-family: 'Comic Sans MS', 'OpenDyslexic', sans-serif !important; letter-spacing: 0.1rem !important; line-height: 2 !important; }
    
    /* Espaciado Cognitivo */
    body.text-spacing * { letter-spacing: 0.15em !important; word-spacing: 0.3em !important; line-height: 2.2 !important; }
    
    /* Sensibilidad Vestibular (Reducción de Animaciones) */
    body.reduced-motion * { animation: none !important; transition: none !important; transform: none !important; }
    body.reduced-motion .ambient-engine { display: none !important; }
`;
document.head.appendChild(a11yStyles);

// Inicializar cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => A11yEngine.init());
