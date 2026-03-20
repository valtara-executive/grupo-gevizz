/**
 * ====================================================================================
 * BLOQUE 7: A11Y ENGINE V11.1 (ACCESIBILIDAD UNIVERSAL E INCLUSIÓN)
 * Zoom Matemático, TTS (Voz), Máscaras cognitivas y Contraste Inteligente.
 * ====================================================================================
 */

const A11yEngine = {
    // Registro de botones y sus respectivas clases CSS
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
    currentZoom: 1, // Escala base (100%)

    init: function() {
        this.injectDynamicHelpers();
        this.loadPreferences();
        this.bindEvents();
    },

    // ================================================================================
    // INYECCIÓN DINÁMICA DE AYUDAS VISUALES (TDAH Y ENFOQUE)
    // ================================================================================
    injectDynamicHelpers: function() {
        // Creamos la línea de la guía de lectura (Una línea cian brillante)
        const guide = document.createElement('div');
        guide.id = 'reading-guide-line';
        guide.setAttribute('aria-hidden', 'true');
        document.body.appendChild(guide);

        // Creamos las máscaras de enfoque (Oscurecen arriba y abajo del cursor)
        const maskTop = document.createElement('div');
        maskTop.id = 'focus-mask-top';
        maskTop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(maskTop);

        const maskBottom = document.createElement('div');
        maskBottom.id = 'focus-mask-bottom';
        maskBottom.setAttribute('aria-hidden', 'true');
        document.body.appendChild(maskBottom);

        // Algoritmo de seguimiento fluido (Mouse y Táctil)
        document.addEventListener('mousemove', (e) => this.updateHelpersPosition(e.clientY));
        document.addEventListener('touchmove', (e) => {
            if(e.touches.length > 0) this.updateHelpersPosition(e.touches[0].clientY);
        }, { passive: true });
    },

    updateHelpersPosition: function(yPos) {
        // Solo ejecuta cálculos si los modos están activos para no gastar batería
        if(document.body.classList.contains('reading-guide-active')) {
            const guide = document.getElementById('reading-guide-line');
            if(guide) guide.style.top = `${yPos}px`;
        }

        if(document.body.classList.contains('focus-mask-active')) {
            const maskTop = document.getElementById('focus-mask-top');
            const maskBottom = document.getElementById('focus-mask-bottom');
            const aperture = 180; // Tamaño de la "ventana" transparente en píxeles (Para leer de 3 a 4 líneas)

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
        // Cargar modos visuales
        Object.keys(this.modes).forEach(btnId => {
            const cssClass = this.modes[btnId];
            const isEnabled = localStorage.getItem(`valtara_${cssClass}_v11`) === 'true';
            
            if(isEnabled) {
                document.body.classList.add(cssClass);
                const btn = document.getElementById(btnId);
                if(btn) btn.setAttribute('aria-pressed', 'true');
            }
        });

        // Cargar Zoom Matemático Seguro
        const savedZoom = localStorage.getItem('valtara_zoom_v11');
        if(savedZoom) {
            this.currentZoom = parseFloat(savedZoom);
            this.applyZoom();
        }

        // Revisar si el motor de audio y animaciones deben bloquearse (Vestibular)
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
                    localStorage.setItem(`valtara_${cssClass}_v11`, isNowActive);
                    
                    // Lógica especial para Modo Vestibular (Apagar animaciones y audio inmediatamente)
                    if(cssClass === 'reduced-motion') {
                        if(isNowActive) {
                            if(window.OasisEngine) {
                                window.OasisEngine.stopAll();
                                window.OasisEngine.performanceMode = true;
                            }
                            this.announce("Animaciones de fondo y audio inmersivo desactivados por protocolo vestibular.");
                        } else {
                            if(window.OasisEngine) window.OasisEngine.performanceMode = false;
                            this.announce("Animaciones de fondo restauradas.");
                        }
                    } else {
                        const featureName = btn.querySelector('span').textContent;
                        this.announce(`Modo ${featureName} ${isNowActive ? 'activado' : 'desactivado'}.`);
                    }
                });
            }
        });

        // Vincular Zoom In / Zoom Out (Zoom Seguro Matemático)
        const zoomInBtn = document.getElementById('a11y-zoom-in');
        const zoomOutBtn = document.getElementById('a11y-zoom-out');

        if(zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                if(this.currentZoom < 1.8) { // Máximo 180%
                    this.currentZoom += 0.1;
                    this.applyZoom();
                } else {
                    this.announce("Zoom máximo alcanzado.");
                }
            });
        }

        if(zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                if(this.currentZoom > 0.8) { // Mínimo 80%
                    this.currentZoom -= 0.1;
                    this.applyZoom();
                } else {
                    this.announce("Zoom mínimo alcanzado.");
                }
            });
        }

        // Vincular el botón de Texto a Voz (TTS)
        const ttsBtn = document.getElementById('a11y-voice');
        if(ttsBtn) {
            ttsBtn.addEventListener('click', () => this.toggleTTS(ttsBtn));
        }
    },

    // ================================================================================
    // MOTOR DE ZOOM MATEMÁTICO (NO ROMPE EL DISEÑO)
    // ================================================================================
    applyZoom: function() {
        const appWrapper = document.getElementById('app-wrapper');
        if(appWrapper) {
            // Aplicar transformación matemática
            appWrapper.style.transform = `scale(${this.currentZoom})`;
            
            // Si hacemos zoom in, la página se hace "más ancha" virtualmente.
            // Para evitar scrolls horizontales feos, limitamos el ancho del contenedor.
            if(this.currentZoom > 1) {
                appWrapper.style.width = `${100 / this.currentZoom}%`;
                appWrapper.style.margin = '0 auto';
            } else {
                appWrapper.style.width = '100%';
            }

            localStorage.setItem('valtara_zoom_v11', this.currentZoom);
            this.announce(`Nivel de acercamiento visual ajustado al ${Math.round(this.currentZoom * 100)} por ciento.`);
        }
    },

    // ================================================================================
    // MOTOR DE SÍNTESIS DE VOZ (TEXT-TO-SPEECH)
    // ================================================================================
    toggleTTS: function(btn) {
        if (!this.synth) {
            this.announce("Lo sentimos, el navegador actual no soporta el motor de síntesis de voz.");
            return;
        }

        this.ttsActive = !this.ttsActive;
        btn.setAttribute('aria-pressed', this.ttsActive ? 'true' : 'false');

        if(this.ttsActive) {
            this.announce("Modo de lectura en voz alta activado. Comenzando lectura del documento.");
            this.readCurrentView();
        } else {
            this.synth.cancel(); // Detener la lectura
            this.announce("Lectura en voz alta cancelada.");
        }
    },

    readCurrentView: function() {
        if(!this.ttsActive) return;
        this.synth.cancel();

        // Buscar qué sección de la SPA está activa actualmente
        const activeSection = document.querySelector('.view-section.active');
        if(!activeSection) return;

        // Extraer texto limpio para la Inteligencia Artificial de Voz
        let textToRead = "Estás leyendo la sección: ";
        
        const headings = activeSection.querySelectorAll('h2, h3, h4');
        headings.forEach(h => textToRead += h.textContent + ". ");
        
        const paragraphs = activeSection.querySelectorAll('p, .card-meta-info');
        paragraphs.forEach(p => textToRead += p.textContent + ". ");

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'es-MX'; // Español de México para una cadencia correcta
        utterance.rate = 0.95; // Velocidad ligeramente relajada
        utterance.pitch = 1;

        // Buscar una voz femenina (tipo Concierge) si el dispositivo la tiene instalada
        const voices = this.synth.getVoices();
        const mexicanVoice = voices.find(v => v.lang.includes('es-MX') && (v.name.includes('Sabina') || v.name.includes('Paulina')));
        if(mexicanVoice) utterance.voice = mexicanVoice;

        this.synth.speak(utterance);
    },

    // ================================================================================
    // LOCUTOR ARIA (Para Lectores de Pantalla para Invidentes)
    // ================================================================================
    announce: function(message) {
        const liveRegion = document.getElementById('a11y-announcer');
        if(liveRegion) {
            liveRegion.textContent = ''; // Limpiar
            setTimeout(() => {
                liveRegion.textContent = message; // Forzar al lector a hablar
            }, 100);
        }
    }
};

// ================================================================================
// INYECCIÓN DE CSS DINÁMICO DE ACCESIBILIDAD (Para no ensuciar main.css)
// ================================================================================
const a11yStyles = document.createElement('style');
a11yStyles.textContent = `
    /* Máscaras y Guías Visuales */
    #reading-guide-line {
        display: none; position: fixed; left: 0; width: 100vw; height: 3px;
        background: var(--valtara-cian-brillante); z-index: 99998; pointer-events: none;
        box-shadow: 0 0 15px var(--valtara-cian-brillante); transition: top 0.1s linear;
    }
    body.reading-guide-active #reading-guide-line { display: block; }
    
    #focus-mask-top, #focus-mask-bottom {
        display: none; position: fixed; left: 0; width: 100vw;
        background: rgba(0,0,0,0.85); z-index: 99997; pointer-events: none;
        transition: height 0.1s linear, top 0.1s linear; backdrop-filter: blur(2px);
    }
    body.focus-mask-active #focus-mask-top, body.focus-mask-active #focus-mask-bottom { display: block; }
    
    /* Alto Contraste Real (Colores súper brillantes sobre negro absoluto) */
    body.high-contrast {
        --valtara-negro-fondo: #000000 !important;
        --valtara-negro-modal: #000000 !important;
        --cristal-fondo: #000000 !important;
        --cristal-borde: #FFFF00 !important;
        --valtara-blanco: #FFFFFF !important;
        --valtara-gris-texto: #FFFFFF !important;
        --valtara-oro: #FFFF00 !important;
        --valtara-cian-brillante: #FFFF00 !important;
        --valtara-magenta-neon: #FFFF00 !important;
        --valtara-purpura-aura: #FFFF00 !important;
        --valtara-verde-ws: #FFFF00 !important;
        --valtara-whatsapp: #FFFF00 !important;
    }
    body.high-contrast .ambient-engine, body.high-contrast .gold-icon { display: none !important; }
    body.high-contrast .glass-card { box-shadow: none !important; border: 3px solid #FFFF00 !important; }
    
    /* Tipografía para Dislexia (OpenDyslexic o Comic Sans fallback) */
    body.dyslexia-font * { font-family: 'OpenDyslexic', 'Comic Sans MS', sans-serif !important; letter-spacing: 0.1rem !important; line-height: 2 !important; }
    
    /* Espaciado Cognitivo (Para TDAH) */
    body.text-spacing * { letter-spacing: 0.15em !important; word-spacing: 0.35em !important; line-height: 2.2 !important; }
    
    /* Sensibilidad Vestibular (Apaga todas las luces, esferas y zooms) */
    body.reduced-motion * { animation: none !important; transition: none !important; transform: none !important; }
    body.reduced-motion .ambient-engine { display: none !important; }
`;
document.head.appendChild(a11yStyles);

// Inicializar cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => A11yEngine.init());
