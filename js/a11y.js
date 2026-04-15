/** * ==================================================================================== 
 * BLOQUE 7: A11Y ENGINE V12.0 PRO (ACCESIBILIDAD UNIVERSAL E INCLUSIÓN) 
 * Grado Auditor: Cumplimiento WCAG 2.1 Nivel AAA.
 * Zoom Estructural, TTS Dinámico con Resaltado, Máscaras de Enfoque optimizadas.
 * ==================================================================================== 
 */
const A11yEngine = {    
    // Registro de botones, clases CSS y estados booleanos
    modes: {        
        'a11y-contrast': 'high-contrast',        
        'a11y-invert': 'invert-colors',        
        'a11y-grayscale': 'monochrome-mode', // Nuevo: Escala de grises
        'a11y-dyslexia': 'dyslexia-font',        
        'a11y-spacing': 'text-spacing',        
        'a11y-guide': 'reading-guide-active',        
        'a11y-mask': 'focus-mask-active',        
        'a11y-motion': 'reduced-motion',
        'a11y-links': 'highlight-links',     // Nuevo: Resaltar enlaces
        'a11y-cursor': 'large-cursor'        // Nuevo: Cursor grande
    },        
    
    // Estado interno
    ttsActive: false,    
    synth: window.speechSynthesis, 
    ttsUtterance: null,
    currentElementsToRead: [],
    currentReadIndex: 0,
       
    currentZoomLevel: 0, // Niveles: -2, -1, 0, 1, 2, 3, 4
    maxZoomLevel: 5,
    minZoomLevel: -2,

    // Motor de optimización de eventos
    isTrackingMouse: false,

    init: function() {        
        console.log("♿ Valtara A11y Engine V12 Pro Iniciado.");
        this.injectDynamicHelpers();        
        this.injectCSS();
        this.loadPreferences();        
        this.bindEvents();    
    },

    // ================================================================================    
    // INYECCIÓN DINÁMICA DE AYUDAS VISUALES (TDAH Y ENFOQUE)    
    // ================================================================================    
    injectDynamicHelpers: function() {        
        // Guía de lectura
        const guide = document.createElement('div');        
        guide.id = 'reading-guide-line';        
        guide.setAttribute('aria-hidden', 'true');        
        document.body.appendChild(guide);

        // Máscaras de enfoque (Superior e Inferior)
        const maskTop = document.createElement('div');        
        maskTop.id = 'focus-mask-top';        
        maskTop.setAttribute('aria-hidden', 'true');        
        document.body.appendChild(maskTop);

        const maskBottom = document.createElement('div');        
        maskBottom.id = 'focus-mask-bottom';        
        maskBottom.setAttribute('aria-hidden', 'true');        
        document.body.appendChild(maskBottom);

        // Locutor Live Region para Lectores de Pantalla (VoiceOver, NVDA)
        let liveRegion = document.getElementById('a11y-announcer');
        if(!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'a11y-announcer';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.cssText = 'position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0;';
            document.body.appendChild(liveRegion);
        }

        // Eventos de ratón optimizados con requestAnimationFrame
        const onMove = (clientY) => {
            if (!this.isTrackingMouse) {
                window.requestAnimationFrame(() => {
                    this.updateHelpersPosition(clientY);
                    this.isTrackingMouse = false;
                });
                this.isTrackingMouse = true;
            }
        };

        document.addEventListener('mousemove', (e) => onMove(e.clientY));        
        document.addEventListener('touchmove', (e) => {            
            if(e.touches.length > 0) onMove(e.touches[0].clientY);        
        }, { passive: true });    
    },

    updateHelpersPosition: function(yPos) {        
        const isGuideActive = document.body.classList.contains('reading-guide-active');
        const isMaskActive = document.body.classList.contains('focus-mask-active');

        if(isGuideActive) {            
            const guide = document.getElementById('reading-guide-line');            
            if(guide) guide.style.top = `${yPos}px`;        
        }

        if(isMaskActive) {            
            const maskTop = document.getElementById('focus-mask-top');            
            const maskBottom = document.getElementById('focus-mask-bottom');            
            const aperture = 150; // Apertura óptima para 3 líneas de texto
            
            if(maskTop && maskBottom) {                
                maskTop.style.height = `${Math.max(0, yPos - (aperture / 2))}px`;                
                maskBottom.style.top = `${yPos + (aperture / 2)}px`;                
                maskBottom.style.height = `calc(100vh - ${yPos + (aperture / 2)}px)`;            
            }        
        }    
    },

    // ================================================================================    
    // GESTIÓN DE PREFERENCIAS (LOCAL STORAGE - COMPLIANT)    
    // ================================================================================    
    loadPreferences: function() {        
        // Cargar toggles binarios
        Object.keys(this.modes).forEach(btnId => {            
            const cssClass = this.modes[btnId];            
            const isEnabled = localStorage.getItem(`valtara_${cssClass}_v12`) === 'true';                        
            if(isEnabled) {                
                document.body.classList.add(cssClass);                
                const btn = document.getElementById(btnId);                
                if(btn) btn.setAttribute('aria-pressed', 'true');            
            }        
        });

        // Cargar Zoom Estructural
        const savedZoom = localStorage.getItem('valtara_zoom_v12');        
        if(savedZoom !== null) {            
            this.currentZoomLevel = parseInt(savedZoom, 10);            
            this.applyTextZoom(false); // Falso para no anunciar al cargar la página
        }

        // Lógica vestibular al inicio
        if(document.body.classList.contains('reduced-motion')) {            
            if(window.OasisEngine) window.OasisEngine.performanceMode = true;        
        }    
    },

    bindEvents: function() {        
        // 1. Vincular Modos Binarios (Toggles)
        Object.keys(this.modes).forEach(btnId => {            
            const btn = document.getElementById(btnId);            
            if(btn) {                
                btn.addEventListener('click', () => {                    
                    const cssClass = this.modes[btnId];                    
                    const isNowActive = document.body.classList.toggle(cssClass);                                        
                    
                    btn.setAttribute('aria-pressed', isNowActive ? 'true' : 'false');                                        
                    localStorage.setItem(`valtara_${cssClass}_v12`, isNowActive);                                        
                    
                    // Manejo Especial Vestibular
                    if(cssClass === 'reduced-motion') {                        
                        if(isNowActive) {                            
                            if(window.OasisEngine) {                                
                                window.OasisEngine.stopAll();                                
                                window.OasisEngine.performanceMode = true;                            
                            }                            
                            this.announce("Animaciones y distracciones desactivadas.");                        
                        } else {                            
                            if(window.OasisEngine) window.OasisEngine.performanceMode = false;                            
                            this.announce("Animaciones restauradas.");                        
                        }                    
                    } else {                        
                        // Extraer texto del botón para anunciar
                        const featureName = btn.getAttribute('aria-label') || btn.innerText.trim() || cssClass;                        
                        this.announce(`Modo ${featureName} ${isNowActive ? 'activado' : 'desactivado'}.`);                    
                    }                
                });            
            }        
        });

        // 2. Vincular Incremento / Decremento de Texto Seguro
        const zoomInBtn = document.getElementById('a11y-zoom-in');        
        const zoomOutBtn = document.getElementById('a11y-zoom-out');

        if(zoomInBtn) {            
            zoomInBtn.addEventListener('click', () => {                
                if(this.currentZoomLevel < this.maxZoomLevel) {                    
                    this.currentZoomLevel++;                    
                    this.applyTextZoom(true);                
                } else {                    
                    this.announce("Tamaño de texto máximo alcanzado.");                
                }            
            });        
        }

        if(zoomOutBtn) {            
            zoomOutBtn.addEventListener('click', () => {                
                if(this.currentZoomLevel > this.minZoomLevel) {                    
                    this.currentZoomLevel--;                    
                    this.applyTextZoom(true);                
                } else {                    
                    this.announce("Tamaño de texto mínimo alcanzado.");                
                }            
            });        
        }

        // 3. Vincular Lector de Texto a Voz (TTS)
        const ttsBtn = document.getElementById('a11y-voice');        
        if(ttsBtn) {            
            ttsBtn.addEventListener('click', () => this.toggleTTS(ttsBtn));        
        }

        // 4. Botón de Reinicio (Reset)
        const resetBtn = document.getElementById('a11y-reset');
        if(resetBtn) {
            resetBtn.addEventListener('click', () => this.resetAll());
        }
    },

    // ================================================================================    
    // MOTOR DE ESCALADO DE TEXTO ESTRUCTURAL (WCAG 1.4.4 COMPLIANT)
    // ================================================================================    
    applyTextZoom: function(shouldAnnounce = true) {        
        const htmlRoot = document.documentElement;
        
        // Limpiamos clases anteriores
        for(let i = this.minZoomLevel; i <= this.maxZoomLevel; i++) {
            htmlRoot.classList.remove(`a11y-text-scale-${i < 0 ? 'm' + Math.abs(i) : i}`);
        }

        // Aplicamos nueva clase
        const scaleClass = `a11y-text-scale-${this.currentZoomLevel < 0 ? 'm' + Math.abs(this.currentZoomLevel) : this.currentZoomLevel}`;
        htmlRoot.classList.add(scaleClass);
        
        localStorage.setItem('valtara_zoom_v12', this.currentZoomLevel);        
        
        if(shouldAnnounce) {
            const percentage = 100 + (this.currentZoomLevel * 10);
            this.announce(`Escala visual ajustada al ${percentage} por ciento.`);        
        }
    },

    // ================================================================================    
    // MOTOR AVANZADO DE SÍNTESIS DE VOZ (LECTURA POR BLOQUES Y RESALTADO)    
    // ================================================================================    
    toggleTTS: function(btn) {        
        if (!this.synth) {            
            this.announce("El navegador actual no soporta el motor de voz.");            
            return;        
        }

        this.ttsActive = !this.ttsActive;        
        btn.setAttribute('aria-pressed', this.ttsActive ? 'true' : 'false');

        if(this.ttsActive) {            
            this.announce("Asistente de lectura activado.");            
            this.startSmartReading();        
        } else {            
            this.synth.cancel();            
            this.clearTTSHighlight();
            this.announce("Lectura detenada.");        
        }    
    },

    startSmartReading: function() {
        this.synth.cancel();
        this.currentReadIndex = 0;
        
        // Recopilamos elementos de texto legibles de la vista actual
        const activeSection = document.querySelector('.view-section.active') || document.body;
        
        // Seleccionamos encabezados, párrafos y listas (ignorando ocultos)
        const rawElements = activeSection.querySelectorAll('h1, h2, h3, h4, p, li, .read-aloud');
        
        this.currentElementsToRead = Array.from(rawElements).filter(el => {
            // Ignorar elementos ocultos o de soporte
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden' && el.innerText.trim() !== '';
        });

        if(this.currentElementsToRead.length === 0) {
            this.announce("No hay texto legible en esta sección.");
            this.ttsActive = false;
            document.getElementById('a11y-voice')?.setAttribute('aria-pressed', 'false');
            return;
        }

        this.readNextBlock();
    },

    readNextBlock: function() {
        if(!this.ttsActive || this.currentReadIndex >= this.currentElementsToRead.length) {
            this.clearTTSHighlight();
            this.ttsActive = false;
            document.getElementById('a11y-voice')?.setAttribute('aria-pressed', 'false');
            return;
        }

        this.clearTTSHighlight();
        
        const currentElement = this.currentElementsToRead[this.currentReadIndex];
        currentElement.classList.add('a11y-tts-highlight'); // Resaltar visualmente
        
        // Hacer scroll suave hacia el elemento
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const textToRead = currentElement.innerText.trim();
        this.ttsUtterance = new SpeechSynthesisUtterance(textToRead);        
        this.ttsUtterance.lang = 'es-MX';        
        this.ttsUtterance.rate = 0.9; // Velocidad cómoda       
        this.ttsUtterance.pitch = 1;

        // Selección de voz inteligente
        const voices = this.synth.getVoices();        
        const bestVoice = voices.find(v => v.lang.includes('es-MX') || v.lang.includes('es-ES'));        
        if(bestVoice) this.ttsUtterance.voice = bestVoice;

        // Cuando termine este bloque, leer el siguiente
        this.ttsUtterance.onend = () => {
            this.currentReadIndex++;
            this.readNextBlock();
        };

        this.ttsUtterance.onerror = (e) => {
            console.warn("TTS Error: ", e);
            this.clearTTSHighlight();
        };

        this.synth.speak(this.ttsUtterance);
    },

    clearTTSHighlight: function() {
        document.querySelectorAll('.a11y-tts-highlight').forEach(el => {
            el.classList.remove('a11y-tts-highlight');
        });
    },

    // ================================================================================    
    // REINICIO TOTAL (RESET)
    // ================================================================================ 
    resetAll: function() {
        // Desactivar todos los toggles
        Object.keys(this.modes).forEach(btnId => {
            const cssClass = this.modes[btnId];
            document.body.classList.remove(cssClass);
            localStorage.setItem(`valtara_${cssClass}_v12`, 'false');
            const btn = document.getElementById(btnId);
            if(btn) btn.setAttribute('aria-pressed', 'false');
        });

        // Detener TTS
        if(this.ttsActive) {
            this.synth.cancel();
            this.ttsActive = false;
            this.clearTTSHighlight();
            const btnTts = document.getElementById('a11y-voice');
            if(btnTts) btnTts.setAttribute('aria-pressed', 'false');
        }

        // Restablecer Zoom
        this.currentZoomLevel = 0;
        this.applyTextZoom(false);

        // Restaurar Animaciones
        if(window.OasisEngine) window.OasisEngine.performanceMode = false;

        this.announce("Todas las configuraciones de accesibilidad han sido restablecidas.");
    },

    // ================================================================================    
    // LOCUTOR ARIA (Para Lector de Pantalla Invidentes)    
    // ================================================================================    
    announce: function(message) {        
        const liveRegion = document.getElementById('a11y-announcer');        
        if(liveRegion) {            
            liveRegion.textContent = ''; // Forzar cambio de estado en el DOM            
            setTimeout(() => {                
                liveRegion.textContent = message;            
            }, 50);        
        }    
    },

    // ================================================================================
    // INYECCIÓN DE CSS DINÁMICO DE ACCESIBILIDAD (Aislado y robusto)
    // ================================================================================
    injectCSS: function() {
        if(document.getElementById('a11y-core-styles')) return;

        const style = document.createElement('style');
        style.id = 'a11y-core-styles';
        style.textContent = `    
            /* 1. Máscaras y Guías Visuales */    
            #reading-guide-line {        
                display: none; position: fixed; left: 0; width: 100vw; height: 4px;        
                background: #00FFCC; z-index: 999998; pointer-events: none;        
                box-shadow: 0 0 15px #00FFCC;    
            }    
            body.reading-guide-active #reading-guide-line { display: block; }        
            
            #focus-mask-top, #focus-mask-bottom {        
                display: none; position: fixed; left: 0; width: 100vw;        
                background: rgba(0,0,0,0.85); z-index: 999997; pointer-events: none;        
                backdrop-filter: blur(3px);    
            }    
            body.focus-mask-active #focus-mask-top, body.focus-mask-active #focus-mask-bottom { display: block; }        
            
            /* 2. Modos de Color */    
            body.high-contrast {        
                --valtara-negro-fondo: #000000 !important;        
                --valtara-negro-modal: #000000 !important;        
                --cristal-fondo: #000000 !important;        
                --cristal-borde: #FFFF00 !important;        
                --valtara-blanco: #FFFFFF !important;        
                --valtara-gris-texto: #FFFFFF !important;        
                --valtara-oro: #FFFF00 !important;        
                background-color: #000 !important;
                color: #FFF !important;
            }    
            body.high-contrast * { text-shadow: none !important; }
            body.high-contrast .ambient-engine { display: none !important; }    
            body.high-contrast .glass-card { box-shadow: none !important; border: 2px solid #FFFF00 !important; }        
            
            body.invert-colors {
                filter: invert(1) hue-rotate(180deg) !important;
                background-color: #FFF; /* Fuerza fondo claro para invertir a oscuro */
            }
            body.invert-colors img, body.invert-colors video {
                filter: invert(1) hue-rotate(180deg) !important; /* Revierte imágenes para que se vean normales */
            }

            body.monochrome-mode {
                filter: grayscale(100%) !important;
            }

            /* 3. Tipografía y Espaciado cognitivo */    
            body.dyslexia-font * { 
                font-family: 'OpenDyslexic', 'Comic Sans MS', sans-serif !important; 
            }        
            body.text-spacing * { 
                letter-spacing: 0.12em !important; 
                word-spacing: 0.16em !important; 
                line-height: 1.8 !important; 
            }        
            
            /* 4. Sensibilidad Vestibular */    
            body.reduced-motion *, body.reduced-motion { 
                animation: none !important; 
                transition: none !important; 
                scroll-behavior: auto !important;
            }    
            body.reduced-motion .ambient-engine { display: none !important; }

            /* 5. Utilidades Corporativas Nuevas */
            body.highlight-links a, body.highlight-links button {
                text-decoration: underline !important;
                text-decoration-thickness: 3px !important;
                text-decoration-color: #FFFF00 !important;
                outline: 2px solid #FFFF00 !important;
                outline-offset: 2px !important;
                background-color: rgba(0,0,0,0.8) !important;
                color: #FFFF00 !important;
            }

            body.large-cursor, body.large-cursor * {
                cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><polygon points="2,2 10,30 15,20 25,28 30,23 20,15 28,10" fill="white" stroke="black" stroke-width="2"/></svg>'), auto !important;
            }

            .a11y-tts-highlight {
                background-color: #FFFF00 !important;
                color: #000 !important;
                outline: 3px solid #FF9900 !important;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
            }

            /* 6. Escalado de Texto Robusto (Root scaling combinado con Zoom) */
            /* Se modifica el tamaño raíz del documento para que los REMs escalen */
            html.a11y-text-scale-1 { font-size: 110% !important; }
            html.a11y-text-scale-2 { font-size: 120% !important; }
            html.a11y-text-scale-3 { font-size: 130% !important; }
            html.a11y-text-scale-4 { font-size: 140% !important; }
            html.a11y-text-scale-5 { font-size: 150% !important; }
            
            html.a11y-text-scale-m1 { font-size: 90% !important; }
            html.a11y-text-scale-m2 { font-size: 80% !important; }

            /* Fallback agresivo usando propiedad zoom para navegadores compatibles */
            @supports (zoom: 1.1) {
                html.a11y-text-scale-1 body { zoom: 1.1; }
                html.a11y-text-scale-2 body { zoom: 1.2; }
                html.a11y-text-scale-3 body { zoom: 1.3; }
                html.a11y-text-scale-4 body { zoom: 1.4; }
                html.a11y-text-scale-5 body { zoom: 1.5; }
                html.a11y-text-scale-m1 body { zoom: 0.9; }
                html.a11y-text-scale-m2 body { zoom: 0.8; }
            }
        `;
        document.head.appendChild(style);
    }
};

// Inicializar cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => A11yEngine.init());
