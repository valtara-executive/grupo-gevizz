/**
 * ====================================================================================
 * BLOQUE 9: A11Y ENGINE V50.0 (ACCESIBILIDAD Y NEURO-INCLUSIÓN LIGERA)
 * ------------------------------------------------------------------------------------
 * Motor optimizado de inclusión. Gestiona alto contraste, fuentes para dislexia,
 * reglas de lectura para TDAH y comunicación con el lector de pantalla invisible.
 * Cero dependencias pesadas. Cero bloqueos de renderizado.
 * ====================================================================================
 */

const A11yEngine = {
    // Almacenamiento local de preferencias de accesibilidad
    prefs: {
        voice: false,
        readingGuide: false,
        contrast: false,
        dyslexia: false,
        spacing: false,
        motionPaused: false
    },

    init: function() {
        console.log("♿ [A11Y ENGINE V50] Iniciando escudos de neuro-inclusión...");
        
        this.loadPrefs();
        this.bindEvents();
        this.applyPrefs();
    },

    // ================================================================================
    // 1. EL VOCERO: COMUNICACIÓN CON SCREEN READERS (TalkBack / VoiceOver)
    // ================================================================================
    // Esta función es vital. Si la borras, el core.js se romperá al intentar usarla.
    announce: function(message) {
        const announcer = document.getElementById('a11y-announcer');
        if (announcer) {
            // El truco del doble reemplazo fuerza al lector de pantalla a hablar
            announcer.textContent = '';
            setTimeout(() => {
                announcer.textContent = message;
                console.log(`🔊 [A11Y VOZ]: ${message}`);
            }, 50);
        }
    },

    // ================================================================================
    // 2. MEMORIA DE PREFERENCIAS (Guardar y Cargar)
    // ================================================================================
    loadPrefs: function() {
        try {
            const saved = localStorage.getItem('valtara_a11y_prefs');
            if (saved) {
                this.prefs = { ...this.prefs, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.warn("⚠️ [A11Y] No se pudieron cargar las preferencias visuales.");
        }
    },

    savePrefs: function() {
        localStorage.setItem('valtara_a11y_prefs', JSON.stringify(this.prefs));
    },

    // ================================================================================
    // 3. APLICACIÓN FÍSICA (Inyección de Clases CSS en el Body)
    // ================================================================================
    applyPrefs: function() {
        const body = document.body;

        // Regla de Lectura (TDAH)
        body.classList.toggle('reading-guide-active', this.prefs.readingGuide);
        
        // Alto Contraste Visual
        body.classList.toggle('high-contrast-mode', this.prefs.contrast);
        
        // Fuente Dislexia
        body.classList.toggle('dyslexia-font-mode', this.prefs.dyslexia);
        
        // Espaciado Cognitivo
        body.classList.toggle('cognitive-spacing-mode', this.prefs.spacing);
        
        // Pausar Animaciones
        body.classList.toggle('pausar-ambiente', this.prefs.motionPaused);
        
        this.updateButtonsUI();
    },

    // ================================================================================
    // 4. CONTROL DE INTERFAZ (Botones del Panel Modal)
    // ================================================================================
    bindEvents: function() {
        // Mapeo dinámico de botones a preferencias
        const controls = [
            { id: 'a11y-voice', pref: 'voice', msg: 'Lectura inteligente activada', msgOff: 'Lectura inteligente desactivada' },
            { id: 'a11y-reading-guide', pref: 'readingGuide', msg: 'Regla de lectura activada', msgOff: 'Regla de lectura desactivada' },
            { id: 'a11y-contrast', pref: 'contrast', msg: 'Alto contraste activado', msgOff: 'Alto contraste desactivado' },
            { id: 'a11y-dyslexia', pref: 'dyslexia', msg: 'Fuente para dislexia activada', msgOff: 'Fuente estándar restaurada' },
            { id: 'a11y-spacing', pref: 'spacing', msg: 'Espaciado cognitivo aumentado', msgOff: 'Espaciado estándar restaurado' },
            // Motion es manejado parcialmente por core.js, pero lo centralizamos aquí
            { id: 'a11y-motion', pref: 'motionPaused', msg: 'Animaciones pausadas', msgOff: 'Animaciones reanudadas' }
        ];

        controls.forEach(ctrl => {
            const btn = document.getElementById(ctrl.id);
            if (btn) {
                // Eliminar clones de eventos viejos
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                newBtn.addEventListener('click', () => {
                    this.prefs[ctrl.pref] = !this.prefs[ctrl.pref];
                    this.savePrefs();
                    this.applyPrefs();
                    
                    // Feedback háptico (vibración)
                    if(window.CoreEngine && CoreEngine.triggerVibration) CoreEngine.triggerVibration(15);
                    
                    // Anuncio para ciegos
                    this.announce(this.prefs[ctrl.pref] ? ctrl.msg : ctrl.msgOff);
                });
            }
        });

        // Botón de Reseteo Total
        const resetBtn = document.getElementById('a11y-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.prefs = {
                    voice: false, readingGuide: false, contrast: false,
                    dyslexia: false, spacing: false, motionPaused: false
                };
                this.savePrefs();
                this.applyPrefs();
                if(window.CoreEngine && CoreEngine.triggerVibration) CoreEngine.triggerVibration([20, 50, 20]);
                this.announce("Todas las configuraciones visuales han sido restauradas a su estado original.");
            });
        }
    },

    updateButtonsUI: function() {
        const mapping = {
            'a11y-voice': this.prefs.voice,
            'a11y-reading-guide': this.prefs.readingGuide,
            'a11y-contrast': this.prefs.contrast,
            'a11y-dyslexia': this.prefs.dyslexia,
            'a11y-spacing': this.prefs.spacing,
            'a11y-motion': this.prefs.motionPaused
        };

        for (const [id, isActive] of Object.entries(mapping)) {
            const btn = document.getElementById(id);
            if (btn) {
                btn.setAttribute('aria-pressed', isActive.toString());
                if (isActive) {
                    btn.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'; // Oro sutil
                    btn.style.borderColor = 'var(--valtara-oro-brillante)';
                    btn.style.color = 'var(--valtara-oro-brillante)';
                } else {
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }
            }
        }
    }
};

// ====================================================================================
// INICIALIZACIÓN
// ====================================================================================
document.addEventListener('DOMContentLoaded', () => {
    A11yEngine.init();
});
