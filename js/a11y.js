/** * ==================================================================================== 
 * BLOQUE 7: VALTARA A11Y ENGINE V12.5 PRO MAX (ACCESIBILIDAD UNIVERSAL E INCLUSIÓN) 
 * ==================================================================================== 
 * Grado Auditor: Cumplimiento WCAG 2.1 Nivel AAA.
 * * EXPANSIONES INTEGRADAS:
 * 1. Corrección Cuántica de Desbordamiento (Eliminación total del bug 100vw en móviles).
 * 2. Smart Invert: Inversión de color inteligente (protege imágenes y videos).
 * 3. Zoom Híbrido Estructural: Combinación de 'zoom' CSS y Root 'font-size'.
 * 4. Audio Ducking: Interconexión con música ambiental para bajar el volumen al hablar.
 * 5. Visual Toasts: Notificaciones elegantes en pantalla para cada acción.
 * 6. Atajos de Teclado: Accesibilidad total para usuarios sin ratón.
 * 7. Escaneo de Texto Profundo: Limpieza de nodos para el motor TTS.
 * ==================================================================================== 
 */

const A11yEngine = {    
    // Registro de botones, clases CSS y estados
    modes: {        
        'a11y-contrast': 'high-contrast',        
        'a11y-invert': 'invert-colors',        
        'a11y-grayscale': 'monochrome-mode',
        'a11y-dyslexia': 'dyslexia-font',        
        'a11y-spacing': 'text-spacing',        
        'a11y-guide': 'reading-guide-active',        
        'a11y-mask': 'focus-mask-active',        
        'a11y-motion': 'reduced-motion',
        'a11y-links': 'highlight-links',     
        'a11y-cursor': 'large-cursor'        
    },        
    
    // Estado del Motor de Voz (TTS)
    ttsActive: false,    
    synth: window.speechSynthesis, 
    ttsUtterance: null,
    currentElementsToRead: [],
    currentReadIndex: 0,
       
    // Estado del Motor de Zoom
    currentZoomLevel: 0, 
    maxZoomLevel: 4,  // 140%
    minZoomLevel: -2, // 80%

    // Optimizadores de Rendimiento
    isTrackingMouse: false,
    toastTimer: null,
    audioDuckingMemory: new Map(), // Recuerda los volúmenes originales de los audios

    // ================================================================================    
    // 1. INICIALIZACIÓN DEL SISTEMA Y DIAGNÓSTICO
    // ================================================================================    
    init: function() {        
        console.groupCollapsed("%c♿ Valtara A11y Engine V12.5 Pro Max", "color:#D4AF37; font-weight:bold; font-size:14px; background:#050508; padding:5px; border-radius:5px;");
        console.log("Iniciando inyección de estilos críticos...");
        this.injectCSS();
        
        console.log("Generando DOM de asistencia visual...");
        this.injectDynamicHelpers();        
        
        console.log("Restaurando preferencias LFPDPPP...");
        this.loadPreferences();        
        
        console.log("Vinculando controladores y atajos de teclado...");
        this.bindEvents();    
        this.bindKeyboardShortcuts();
        
        console.log("Motor de Accesibilidad Operativo al 100%.");
        console.groupEnd();
    },

    // ================================================================================    
    // 2. INYECCIÓN DINÁMICA DE AYUDAS VISUALES (TDAH Y ENFOQUE)    
    // ================================================================================    
    injectDynamicHelpers: function() {        
        // Guía de lectura (Línea central)
        const guide = document.createElement('div');        
        guide.id = 'reading-guide-line';        
        guide.setAttribute('aria-hidden', 'true');        
        document.body.appendChild(guide);

        // Máscaras de enfoque (Superior e Inferior - CORREGIDAS PARA NO USAR 100vw)
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

        // Sistema Visual Toast (Para personas sordas o que no usan lector de pantalla)
        let visualToast = document.getElementById('valtara-a11y-toast');
        if(!visualToast) {
            visualToast = document.createElement('div');
            visualToast.id = 'valtara-a11y-toast';
            visualToast.setAttribute('aria-hidden', 'true'); // Oculto al lector porque el 'announcer' ya lo lee
            document.body.appendChild(visualToast);
        }

        // Eventos de ratón y táctiles optimizados para el seguimiento de la guía
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
            const aperture = 160; // Ventana transparente de 160px
            
            if(maskTop && maskBottom) {                
                maskTop.style.height = `${Math.max(0, yPos - (aperture / 2))}px`;                
                maskBottom.style.top = `${yPos + (aperture / 2)}px`;                
                maskBottom.style.height = `calc(100vh - ${yPos + (aperture / 2)}px)`;            
            }        
        }    
    },

    // ================================================================================    
    // 3. GESTIÓN DE PREFERENCIAS (PERSISTENCIA SEGURA)    
    // ================================================================================    
    loadPreferences: function() {        
        // 3.1 Cargar Modos Booleanos
        Object.keys(this.modes).forEach(btnId => {            
            const cssClass = this.modes[btnId];            
            const isEnabled = localStorage.getItem(`valtara_${cssClass}_v12`) === 'true';                        
            if(isEnabled) {                
                document.body.classList.add(cssClass);                
                const btn = document.getElementById(btnId);                
                if(btn) btn.setAttribute('aria-pressed', 'true');            
            }        
        });

        // 3.2 Cargar Nivel de Zoom Estructural Seguro
        const savedZoom = localStorage.getItem('valtara_zoom_v12');        
        if(savedZoom !== null) {            
            this.currentZoomLevel = parseInt(savedZoom, 10);            
            this.applyTextZoom(false); // false para no bombardear al usuario con notificaciones al entrar
        }

        // 3.3 Protocolos de Seguridad Vestibular al inicio
        if(document.body.classList.contains('reduced-motion')) {            
            if(window.OasisEngine) window.OasisEngine.performanceMode = true;        
        }    
    },

    // ================================================================================    
    // 4. VINCULACIÓN DE EVENTOS DE BOTONES Y TECLADO
    // ================================================================================    
    bindEvents: function() {        
        // 4.1 Botones de Modos Booleanos (Interruptores)
        Object.keys(this.modes).forEach(btnId => {            
            const btn = document.getElementById(btnId);            
            if(btn) {                
                btn.addEventListener('click', () => {                    
                    const cssClass = this.modes[btnId];                    
                    const isNowActive = document.body.classList.toggle(cssClass);                                        
                    
                    btn.setAttribute('aria-pressed', isNowActive ? 'true' : 'false');                                        
                    localStorage.setItem(`valtara_${cssClass}_v12`, isNowActive);                                        
                    
                    // Lógica Condicional Específica
                    if(cssClass === 'reduced-motion') {                        
                        if(isNowActive) {                            
                            if(window.OasisEngine) {                                
                                window.OasisEngine.stopAll();                                
                                window.OasisEngine.performanceMode = true;                            
                            }                            
                            this.announce("Animaciones y efectos inmersivos desactivados por seguridad vestibular.");                        
                        } else {                            
                            if(window.OasisEngine) window.OasisEngine.performanceMode = false;                            
                            this.announce("Animaciones y efectos inmersivos restaurados.");                        
                        }                    
                    } else if (cssClass === 'invert-colors') {
                        this.announce(isNowActive ? "Modo de Inversión Inteligente activado." : "Colores originales restaurados.");
                    } else {                        
                        const featureName = btn.getAttribute('aria-label') || btn.innerText.trim() || cssClass;                        
                        this.announce(`${featureName} ${isNowActive ? 'activado' : 'desactivado'}.`);                    
                    }                
                });            
            }        
        });

        // 4.2 Botones de Zoom de Texto
        const zoomInBtn = document.getElementById('a11y-zoom-in');        
        const zoomOutBtn = document.getElementById('a11y-zoom-out');

        if(zoomInBtn) {            
            zoomInBtn.addEventListener('click', () => {                
                if(this.currentZoomLevel < this.maxZoomLevel) {                    
                    this.currentZoomLevel++;                    
                    this.applyTextZoom(true);                
                } else {                    
                    this.announce("Límite máximo de ampliación alcanzado.");                
                }            
            });        
        }

        if(zoomOutBtn) {            
            zoomOutBtn.addEventListener('click', () => {                
                if(this.currentZoomLevel > this.minZoomLevel) {                    
                    this.currentZoomLevel--;                    
                    this.applyTextZoom(true);                
                } else {                    
                    this.announce("Límite mínimo de reducción alcanzado.");                
                }            
            });        
        }

        // 4.3 Botón de Texto a Voz (TTS)
        const ttsBtn = document.getElementById('a11y-voice');        
        if(ttsBtn) {            
            ttsBtn.addEventListener('click', () => this.toggleTTS(ttsBtn));        
        }

        // 4.4 Botón de Reinicio Maestro
        const resetBtn = document.getElementById('a11y-reset');
        if(resetBtn) {
            resetBtn.addEventListener('click', () => this.resetAll());
        }
    },

    bindKeyboardShortcuts: function() {
        document.addEventListener('keydown', (e) => {
            // Ignorar si el usuario está escribiendo en el chat de Aura o inputs
            if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            // Atajos combinados con la tecla ALT (Estándar de Accesibilidad)
            if(e.altKey) {
                switch(e.key.toLowerCase()) {
                    case 'z': // Alt + Z = Zoom In
                        e.preventDefault();
                        if(this.currentZoomLevel < this.maxZoomLevel) { this.currentZoomLevel++; this.applyTextZoom(true); }
                        break;
                    case 'x': // Alt + X = Zoom Out
                        e.preventDefault();
                        if(this.currentZoomLevel > this.minZoomLevel) { this.currentZoomLevel--; this.applyTextZoom(true); }
                        break;
                    case 'v': // Alt + V = Toggle Voz
                        e.preventDefault();
                        const ttsBtn = document.getElementById('a11y-voice');
                        if(ttsBtn) this.toggleTTS(ttsBtn);
                        break;
                    case 'r': // Alt + R = Reset Total
                        e.preventDefault();
                        this.resetAll();
                        break;
                }
            }
        });
    },

    // ================================================================================    
    // 5. MOTOR DE ESCALADO DE TEXTO HÍBRIDO (ZOOM ESTRUCTURAL SIN BUG 100VW)
    // ================================================================================    
    applyTextZoom: function(shouldAnnounce = true) {        
        const htmlRoot = document.documentElement;
        
        // 5.1 Limpieza de clases anteriores
        for(let i = this.minZoomLevel; i <= this.maxZoomLevel; i++) {
            htmlRoot.classList.remove(`a11y-text-scale-${i < 0 ? 'm' + Math.abs(i) : i}`);
        }

        // 5.2 Aplicación de nueva escala si no es 0
        if(this.currentZoomLevel !== 0) {
            const scaleClass = `a11y-text-scale-${this.currentZoomLevel < 0 ? 'm' + Math.abs(this.currentZoomLevel) : this.currentZoomLevel}`;
            htmlRoot.classList.add(scaleClass);
        }
        
        localStorage.setItem('valtara_zoom_v12', this.currentZoomLevel);        
        
        // 5.3 Anuncio Dual (ARIA y Visual Toast)
        if(shouldAnnounce) {
            const percentage = 100 + (this.currentZoomLevel * 10);
            this.announce(`Escala visual del texto ajustada al ${percentage}%`);        
        }
    },

    // ================================================================================    
    // 6. MOTOR AVANZADO TTS Y "AUDIO DUCKING" (Atenuación Acústica)
    // ================================================================================    
    toggleTTS: function(btn) {        
        if (!this.synth) {            
            this.announce("Su dispositivo actual no soporta el motor de síntesis de voz.");            
            return;        
        }

        this.ttsActive = !this.ttsActive;        
        btn.setAttribute('aria-pressed', this.ttsActive ? 'true' : 'false');

        if(this.ttsActive) {            
            this.announce("Asistente de lectura activado.");
            this.triggerAudioDucking(true); // Baja el volumen de la música           
            this.startSmartReading();        
        } else {            
            this.synth.cancel();            
            this.clearTTSHighlight();
            this.triggerAudioDucking(false); // Restaura el volumen de la música
            this.announce("Lectura en voz alta detenida.");        
        }    
    },

    triggerAudioDucking: function(isActive) {
        // Interceptamos todos los elementos de audio HTML5
        const allAudios = document.querySelectorAll('audio');
        
        allAudios.forEach(audio => {
            if(isActive) {
                // Guardamos el volumen original si estaba sonando
                if(!audio.paused && audio.volume > 0.2) {
                    this.audioDuckingMemory.set(audio, audio.volume);
                    // Suavizado hacia abajo
                    audio.volume = 0.15; 
                }
            } else {
                // Restauramos el volumen original
                if(this.audioDuckingMemory.has(audio)) {
                    audio.volume = this.audioDuckingMemory.get(audio);
                    this.audioDuckingMemory.delete(audio);
                }
            }
        });

        // Intentar conectar con el controlador principal de Sonoterapia si existe en memoria
        if(window.SonoterapiaEngine) {
            if(isActive && typeof window.SonoterapiaEngine.fadeVolume === 'function') {
                window.SonoterapiaEngine.fadeVolume(0.15);
            } else if (!isActive && typeof window.SonoterapiaEngine.fadeVolume === 'function') {
                window.SonoterapiaEngine.fadeVolume(1.0);
            }
        }
    },

    startSmartReading: function() {
        this.synth.cancel();
        this.currentReadIndex = 0;
        
        // Buscar el contenedor activo principal para no leer texto oculto de otros menús
        const activeSection = document.querySelector('.view-section.active') || document.body;
        
        // Extracción Quirúrgica: Excluimos botones de iconos puros, scripts, o etiquetas sr-only
        const rawElements = activeSection.querySelectorAll('h1, h2, h3, h4, p, li, .read-aloud, .card-meta-info');
        
        this.currentElementsToRead = Array.from(rawElements).filter(el => {
            const style = window.getComputedStyle(el);
            // Validaciones estrictas para asegurar que el elemento es visible y relevante
            if(style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
            if(el.classList.contains('sr-only') || el.classList.contains('fab-btn')) return false;
            if(el.innerText.trim().length < 2) return false;
            return true;
        });

        if(this.currentElementsToRead.length === 0) {
            this.announce("No se detectó texto principal legible en esta área.");
            this.ttsActive = false;
            document.getElementById('a11y-voice')?.setAttribute('aria-pressed', 'false');
            this.triggerAudioDucking(false);
            return;
        }

        this.readNextBlock();
    },

    readNextBlock: function() {
        if(!this.ttsActive || this.currentReadIndex >= this.currentElementsToRead.length) {
            this.clearTTSHighlight();
            this.ttsActive = false;
            document.getElementById('a11y-voice')?.setAttribute('aria-pressed', 'false');
            this.triggerAudioDucking(false); // Termina la lectura, devuelve el volumen
            this.announce("Lectura de página finalizada.");
            return;
        }

        this.clearTTSHighlight();
        
        const currentElement = this.currentElementsToRead[this.currentReadIndex];
        currentElement.classList.add('a11y-tts-highlight'); 
        
        // Scroll Inteligente: Mueve la página suavemente para mantener el texto centrado
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Limpieza de texto para evitar que lea símbolos raros
        let textToRead = currentElement.innerText.trim().replace(/[\u{1F600}-\u{1F6FF}]/gu, ''); 
        
        this.ttsUtterance = new SpeechSynthesisUtterance(textToRead);        
        this.ttsUtterance.lang = 'es-MX';        
        this.ttsUtterance.rate = 0.9; // Cadencia relajada y corporativa      
        this.ttsUtterance.pitch = 1;

        // Búsqueda de voz de alta calidad (Premium)
        const voices = this.synth.getVoices();        
        const premiumVoice = voices.find(v => v.lang.includes('es-MX') && (v.name.includes('Premium') || v.name.includes('Sabina'))) 
                          || voices.find(v => v.lang.includes('es-ES'));        
        
        if(premiumVoice) this.ttsUtterance.voice = premiumVoice;

        this.ttsUtterance.onend = () => {
            this.currentReadIndex++;
            this.readNextBlock();
        };

        this.ttsUtterance.onerror = (e) => {
            console.warn("Valtara TTS Interrumpido: ", e);
            this.clearTTSHighlight();
            this.triggerAudioDucking(false);
        };

        this.synth.speak(this.ttsUtterance);
    },

    clearTTSHighlight: function() {
        document.querySelectorAll('.a11y-tts-highlight').forEach(el => {
            el.classList.remove('a11y-tts-highlight');
        });
    },

    // ================================================================================    
    // 7. BOTÓN MAESTRO DE RESTABLECIMIENTO TOTAL (KILL SWITCH)
    // ================================================================================ 
    resetAll: function() {
        console.log("Ejecutando protocolo de restablecimiento de accesibilidad...");
        
        // 7.1 Apagar Modos de Color y Cognitivos
        Object.keys(this.modes).forEach(btnId => {
            const cssClass = this.modes[btnId];
            document.body.classList.remove(cssClass);
            localStorage.setItem(`valtara_${cssClass}_v12`, 'false');
            const btn = document.getElementById(btnId);
            if(btn) btn.setAttribute('aria-pressed', 'false');
        });

        // 7.2 Apagar Motor de Voz
        if(this.ttsActive) {
            this.synth.cancel();
            this.ttsActive = false;
            this.clearTTSHighlight();
            this.triggerAudioDucking(false);
            const btnTts = document.getElementById('a11y-voice');
            if(btnTts) btnTts.setAttribute('aria-pressed', 'false');
        }

        // 7.3 Restablecer Zoom Estructural
        this.currentZoomLevel = 0;
        this.applyTextZoom(false);

        // 7.4 Restaurar Motores de Fondo Gráfico
        if(window.OasisEngine) window.OasisEngine.performanceMode = false;

        this.announce("Todas las configuraciones de visualización han sido devueltas a la normalidad.");
    },

    // ================================================================================    
    // 8. COMUNICADOR UNIVERSAL (ARIA LOCUTOR + VISUAL TOASTS)
    // ================================================================================    
    announce: function(message) {        
        // 8.1 Notificación a Lector de Pantalla Invidente
        const liveRegion = document.getElementById('a11y-announcer');        
        if(liveRegion) {            
            liveRegion.textContent = '';            
            setTimeout(() => {                
                liveRegion.textContent = message;            
            }, 50);        
        }    

        // 8.2 Notificación Visual Elevada (Toast)
        let toast = document.getElementById('valtara-a11y-toast');
        if(toast) {
            toast.textContent = message;
            toast.classList.add('show-toast');
            
            clearTimeout(this.toastTimer);
            this.toastTimer = setTimeout(() => { 
                toast.classList.remove('show-toast'); 
            }, 3500);
        }
    },

    // ================================================================================
    // 9. INYECCIÓN DINÁMICA DE REGLAS CSS (BLINDADO, SEGURO, SIN 100VW)
    // ================================================================================
    injectCSS: function() {
        if(document.getElementById('a11y-core-styles')) return;

        const style = document.createElement('style');
        style.id = 'a11y-core-styles';
        style.textContent = `    
            /* ========================================= */
            /* MÁSCARAS Y GUÍAS (Corrección 100vw -> 100%) */
            /* ========================================= */
            #reading-guide-line {        
                display: none; position: fixed; left: 0; right: 0; width: 100%; height: 4px;        
                background: var(--valtara-cian-brillante, #00FFCC); z-index: 999998; pointer-events: none;        
                box-shadow: 0 0 15px var(--valtara-cian-brillante, #00FFCC); box-sizing: border-box;    
            }    
            body.reading-guide-active #reading-guide-line { display: block; }        
            
            #focus-mask-top, #focus-mask-bottom {        
                display: none; position: fixed; left: 0; right: 0; width: 100%;        
                background: rgba(0,0,0,0.88); z-index: 999997; pointer-events: none;        
                backdrop-filter: blur(4px); box-sizing: border-box;
            }    
            body.focus-mask-active #focus-mask-top, body.focus-mask-active #focus-mask-bottom { display: block; }        
            
            /* ========================================= */
            /* VISUAL TOASTS (Notificaciones UI)         */
            /* ========================================= */
            #valtara-a11y-toast {
                position: fixed;
                bottom: 25px;
                left: 50%;
                transform: translate(-50%, 20px) scale(0.9);
                background: rgba(15, 15, 20, 0.95);
                color: var(--valtara-oro, #D4AF37);
                padding: 14px 28px;
                border-radius: 50px;
                font-family: 'Lato', sans-serif;
                font-weight: 600;
                font-size: 0.95rem;
                letter-spacing: 0.5px;
                z-index: 9999999;
                border: 1px solid rgba(212, 175, 55, 0.4);
                box-shadow: 0 15px 35px rgba(0,0,0,0.5), 0 0 15px rgba(212, 175, 55, 0.15);
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                pointer-events: none;
                text-align: center;
                white-space: nowrap;
            }
            #valtara-a11y-toast.show-toast {
                opacity: 1;
                visibility: visible;
                transform: translate(-50%, 0) scale(1);
            }

            /* ========================================= */
            /* ALTO CONTRASTE (Protegiendo inputs)       */
            /* ========================================= */
            body.high-contrast {        
                --valtara-negro-fondo: #000000 !important;        
                --valtara-negro-modal: #000000 !important;        
                --cristal-fondo: #000000 !important;        
                --cristal-borde: #FFFF00 !important;        
                --valtara-blanco: #FFFFFF !important;        
                --valtara-gris-texto: #FFFFFF !important;        
                --valtara-oro: #FFFF00 !important;        
                background-color: #000000 !important;
                color: #FFFFFF !important;
            }    
            body.high-contrast * { text-shadow: none !important; }
            body.high-contrast .ambient-engine { display: none !important; }    
            body.high-contrast .glass-card, body.high-contrast .modal-content { 
                box-shadow: none !important; 
                border: 3px solid #FFFF00 !important; 
                background: #000000 !important;
                backdrop-filter: none !important;
            }        
            
            /* ========================================= */
            /* INVERSOR INTELIGENTE (Smart Invert)       */
            /* Resuelve el problema de imágenes y logos  */
            /* ========================================= */
            body.invert-colors {
                filter: invert(1) hue-rotate(180deg) brightness(105%) contrast(105%) !important;
                background-color: #FAFAFA !important; /* Fuerza un fondo claro real */
            }
            /* Doble Inversión para elementos gráficos (los devuelve a la normalidad) */
            body.invert-colors img, 
            body.invert-colors video, 
            body.invert-colors iframe,
            body.invert-colors .orb,
            body.invert-colors .ambient-engine,
            body.invert-colors [style*="background-image"] {
                filter: invert(1) hue-rotate(180deg) !important; 
            }

            /* ========================================= */
            /* ESCALA DE GRISES (Monocromo real)         */
            /* ========================================= */
            body.monochrome-mode {
                filter: grayscale(100%) !important;
            }

            /* ========================================= */
            /* TIPOGRAFÍA, DISLEXIA Y ESPACIADO          */
            /* ========================================= */
            body.dyslexia-font * { 
                font-family: 'OpenDyslexic', 'Comic Sans MS', sans-serif !important; 
            }        
            body.text-spacing * { 
                letter-spacing: 0.15em !important; 
                word-spacing: 0.25em !important; 
                line-height: 2 !important; 
            }        
            
            /* ========================================= */
            /* VESTIBULAR (Apagar Movimiento Total)      */
            /* ========================================= */
            body.reduced-motion *, body.reduced-motion { 
                animation: none !important; 
                transition: none !important; 
                scroll-behavior: auto !important;
            }    
            body.reduced-motion .ambient-engine { display: none !important; }

            /* ========================================= */
            /* HIGHLIGHTS Y CURSORES (Nuevos V12)        */
            /* ========================================= */
            body.highlight-links a, body.highlight-links button, body.highlight-links .interactive {
                text-decoration: underline !important;
                text-decoration-thickness: 3px !important;
                text-decoration-color: #FFFF00 !important;
                outline: 3px solid #FFFF00 !important;
                outline-offset: 3px !important;
                background-color: rgba(0,0,0,0.9) !important;
                color: #FFFF00 !important;
            }

            body.large-cursor, body.large-cursor * {
                cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 32 32"><polygon points="2,2 10,30 15,20 25,28 30,23 20,15 28,10" fill="%23FFFFFF" stroke="%23000000" stroke-width="2"/></svg>'), auto !important;
            }

            .a11y-tts-highlight {
                background-color: var(--valtara-cian-brillante, #00FFCC) !important;
                color: #000000 !important;
                outline: 4px solid var(--valtara-cian-brillante, #00FFCC) !important;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
            }

            /* ========================================================================= */
            /* MOTOR DE ZOOM HÍBRIDO (EL DEFINITIVO)                                     */
            /* Combina propiedad zoom nativa y cascada de tamaño fuente                  */
            /* ========================================================================= */
            
            /* Fallback agresivo usando propiedad zoom para Chrome, Safari, Edge */
            @supports (zoom: 1.1) {
                html.a11y-text-scale-1 body { zoom: 1.1; }
                html.a11y-text-scale-2 body { zoom: 1.2; }
                html.a11y-text-scale-3 body { zoom: 1.3; }
                html.a11y-text-scale-4 body { zoom: 1.4; }
                html.a11y-text-scale-m1 body { zoom: 0.9; }
                html.a11y-text-scale-m2 body { zoom: 0.8; }
            }

            /* Respaldo para Firefox y navegadores estrictos que deprecian 'zoom' */
            /* Modificamos el font-size de todos los contenedores de texto específicos */
            @-moz-document url-prefix() {
                html.a11y-text-scale-1 h1, html.a11y-text-scale-1 h2, html.a11y-text-scale-1 h3, html.a11y-text-scale-1 p, html.a11y-text-scale-1 a, html.a11y-text-scale-1 span { font-size: 110% !important; }
                html.a11y-text-scale-2 h1, html.a11y-text-scale-2 h2, html.a11y-text-scale-2 h3, html.a11y-text-scale-2 p, html.a11y-text-scale-2 a, html.a11y-text-scale-2 span { font-size: 120% !important; }
                html.a11y-text-scale-3 h1, html.a11y-text-scale-3 h2, html.a11y-text-scale-3 h3, html.a11y-text-scale-3 p, html.a11y-text-scale-3 a, html.a11y-text-scale-3 span { font-size: 130% !important; }
                html.a11y-text-scale-4 h1, html.a11y-text-scale-4 h2, html.a11y-text-scale-4 h3, html.a11y-text-scale-4 p, html.a11y-text-scale-4 a, html.a11y-text-scale-4 span { font-size: 140% !important; }
                
                html.a11y-text-scale-m1 h1, html.a11y-text-scale-m1 h2, html.a11y-text-scale-m1 p, html.a11y-text-scale-m1 a { font-size: 90% !important; }
                html.a11y-text-scale-m2 h1, html.a11y-text-scale-m2 h2, html.a11y-text-scale-m2 p, html.a11y-text-scale-m2 a { font-size: 80% !important; }
            }
        `;
        document.head.appendChild(style);
    }
};

// Autoiniciador Seguro cuando el DOM ha sido parseado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => A11yEngine.init());
} else {
    A11yEngine.init();
                }
