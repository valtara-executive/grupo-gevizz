/**
 * ====================================================================================
 * A11Y ENGINE V40.0 — ACCESIBILIDAD UNIVERSAL E INCLUSIÓN
 * ------------------------------------------------------------------------------------
 * Cumplimiento WCAG 2.1 Nivel AA.
 * Funciones activas:
 *   - Zoom híbrido (aumentar / reducir texto)
 *   - Alto contraste
 *   - Inversión de color inteligente
 *   - Monocromo / escala de grises
 *   - Fuente para dislexia (OpenDyslexic vía Google Fonts fallback)
 *   - Espaciado ampliado de texto
 *   - Resaltado de enlaces
 *   - Cursor grande
 *   - Sin animaciones (reduced motion)
 *   - Lectura en voz alta (TTS nativo)
 *   - Restablecer todo
 *   - announce() — anuncios para lectores de pantalla (aria-live)
 *   - Persistencia de preferencias en localStorage
 *
 * Archivo: js/a11y.js
 * Ubicación: carpeta js/
 * ====================================================================================
 */

const A11yEngine = {

    // Estado del motor
    ttsActive: false,
    synth: window.speechSynthesis || null,
    currentZoomLevel: 0,
    maxZoomLevel: 4,
    minZoomLevel: -2,
    toastTimer: null,

    // Mapa de botones → clases CSS en <html>
    modes: {
        'a11y-contrast':  'high-contrast',
        'a11y-invert':    'invert-colors',
        'a11y-grayscale': 'monochrome-mode',
        'a11y-dyslexia':  'dyslexia-font',
        'a11y-spacing':   'text-spacing',
        'a11y-links':     'highlight-links',
        'a11y-cursor':    'large-cursor',
        'a11y-motion':    'reduced-motion'
    },

    // ================================================================================
    // 1. INICIALIZACIÓN
    // ================================================================================
    init: function() {
        console.log('♿ [A11Y ENGINE V40.0] Inicializando inclusión universal...');
        this.injectStyles();
        this.bindButtons();
        this.loadPreferences();
        this.initKeyboardShortcuts();
        console.log('✅ [A11Y ENGINE] Listo.');
    },

    // ================================================================================
    // 2. ESTILOS DINÁMICOS DE ACCESIBILIDAD
    // ================================================================================
    injectStyles: function() {
        if (document.getElementById('a11y-engine-styles')) return;
        const style = document.createElement('style');
        style.id = 'a11y-engine-styles';
        style.textContent = `
            /* ── Alto contraste ─────────────────────────────────────── */
            html.high-contrast { filter: contrast(1.6) !important; }

            /* ── Inversión inteligente (protege imgs y videos) ─────── */
            html.invert-colors { filter: invert(1) hue-rotate(180deg) !important; }
            html.invert-colors img,
            html.invert-colors video,
            html.invert-colors canvas,
            html.invert-colors .ambient-engine,
            html.invert-colors .orb { filter: invert(1) hue-rotate(180deg) !important; }

            /* ── Monocromo ──────────────────────────────────────────── */
            html.monochrome-mode { filter: grayscale(1) !important; }

            /* ── Fuente dislexia ────────────────────────────────────── */
            html.dyslexia-font,
            html.dyslexia-font body,
            html.dyslexia-font p,
            html.dyslexia-font span,
            html.dyslexia-font li,
            html.dyslexia-font h1,
            html.dyslexia-font h2,
            html.dyslexia-font h3,
            html.dyslexia-font h4,
            html.dyslexia-font button {
                font-family: 'Comic Sans MS', 'Chalkboard SE', 'Arial Rounded MT Bold', sans-serif !important;
                letter-spacing: 0.05em !important;
                word-spacing: 0.1em !important;
            }

            /* ── Espaciado ampliado ─────────────────────────────────── */
            html.text-spacing p,
            html.text-spacing li,
            html.text-spacing span,
            html.text-spacing div {
                line-height: 2 !important;
                letter-spacing: 0.12em !important;
                word-spacing: 0.16em !important;
            }

            /* ── Resaltar enlaces ───────────────────────────────────── */
            html.highlight-links a,
            html.highlight-links button[data-target],
            html.highlight-links .nav-item {
                outline: 2.5px solid #FFD700 !important;
                outline-offset: 3px !important;
                background: rgba(255, 215, 0, 0.12) !important;
                border-radius: 4px !important;
            }

            /* ── Cursor grande ──────────────────────────────────────── */
            html.large-cursor,
            html.large-cursor * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='5' cy='5' r='4' fill='%23FFD700' stroke='%23000' stroke-width='1.5'/%3E%3Cpolygon points='5,5 30,15 15,20 10,35' fill='%23fff' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E") 5 5, auto !important; }

            /* ── Sin animaciones ────────────────────────────────────── */
            html.reduced-motion *,
            html.reduced-motion *::before,
            html.reduced-motion *::after {
                animation-duration: 0.001ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.001ms !important;
            }
            html.reduced-motion .ambient-engine { display: none !important; }

            /* ── Toast de notificación ──────────────────────────────── */
            #a11y-toast {
                position: fixed;
                bottom: calc(80px + env(safe-area-inset-bottom, 0px));
                left: 50%;
                transform: translateX(-50%) translateY(20px);
                background: rgba(10, 10, 15, 0.95);
                color: var(--valtara-oro, #F2C94C);
                border: 1px solid rgba(242,201,76,0.4);
                border-radius: 30px;
                padding: 10px 22px;
                font-size: 0.9rem;
                font-family: 'Lato', sans-serif;
                white-space: nowrap;
                z-index: 99999;
                opacity: 0;
                transition: opacity 0.3s ease, transform 0.3s ease;
                pointer-events: none;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            #a11y-toast.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        `;
        document.head.appendChild(style);

        // Crear el toast
        const toast = document.createElement('div');
        toast.id = 'a11y-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
    },

    // ================================================================================
    // 3. CONECTAR BOTONES DEL HTML
    // ================================================================================
    bindButtons: function() {
        // Modos toggle (activan/desactivan clase en <html>)
        Object.keys(this.modes).forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (!btn) return;
            btn.addEventListener('click', () => this.toggleMode(btnId));
        });

        // Zoom
        const zoomIn  = document.getElementById('a11y-zoom-in');
        const zoomOut = document.getElementById('a11y-zoom-out');
        if (zoomIn)  zoomIn.addEventListener('click',  () => this.adjustZoom(1));
        if (zoomOut) zoomOut.addEventListener('click', () => this.adjustZoom(-1));

        // Voz
        const voiceBtn = document.getElementById('a11y-voice');
        if (voiceBtn) voiceBtn.addEventListener('click', () => this.toggleVoice(voiceBtn));

        // Restablecer todo
        const resetBtn = document.getElementById('a11y-reset');
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetAll());
    },

    // ================================================================================
    // 4. TOGGLE DE MODO (contraste, inversión, etc.)
    // ================================================================================
    toggleMode: function(btnId) {
        const cssClass = this.modes[btnId];
        const btn = document.getElementById(btnId);
        const html = document.documentElement;
        const isActive = html.classList.toggle(cssClass);

        if (btn) {
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            btn.style.background    = isActive ? 'rgba(242,201,76,0.2)' : '';
            btn.style.borderColor   = isActive ? 'var(--valtara-oro, #F2C94C)' : '';
            btn.style.color         = isActive ? 'var(--valtara-oro, #F2C94C)' : '';
        }

        const labels = {
            'a11y-contrast':  isActive ? 'Alto contraste activado'    : 'Alto contraste desactivado',
            'a11y-invert':    isActive ? 'Inversión activada'          : 'Inversión desactivada',
            'a11y-grayscale': isActive ? 'Monocromo activado'          : 'Monocromo desactivado',
            'a11y-dyslexia':  isActive ? 'Fuente dislexia activada'    : 'Fuente dislexia desactivada',
            'a11y-spacing':   isActive ? 'Espaciado ampliado'          : 'Espaciado normal',
            'a11y-links':     isActive ? 'Resaltado de enlaces activo' : 'Resaltado desactivado',
            'a11y-cursor':    isActive ? 'Cursor grande activado'      : 'Cursor normal',
            'a11y-motion':    isActive ? 'Animaciones detenidas'       : 'Animaciones restauradas'
        };
        this.showToast(labels[btnId] || (isActive ? 'Activado' : 'Desactivado'));
        this.savePreferences();
    },

    // ================================================================================
    // 5. ZOOM HÍBRIDO
    // ================================================================================
    adjustZoom: function(direction) {
        this.currentZoomLevel = Math.max(
            this.minZoomLevel,
            Math.min(this.maxZoomLevel, this.currentZoomLevel + direction)
        );
        const scale = 1 + (this.currentZoomLevel * 0.1); // 80% a 140%
        document.documentElement.style.fontSize = `${scale * 100}%`;

        const pct = Math.round(scale * 100);
        this.showToast(`Texto al ${pct}%`);
        this.announce(`Tamaño de texto: ${pct} por ciento`);
        this.savePreferences();
    },

    // ================================================================================
    // 6. LECTURA EN VOZ ALTA (TTS)
    // ================================================================================
    toggleVoice: function(btn) {
        if (!this.synth) {
            this.showToast('Voz no disponible en este navegador');
            return;
        }

        if (this.ttsActive) {
            this.synth.cancel();
            this.ttsActive = false;
            if (btn) { btn.setAttribute('aria-pressed', 'false'); btn.style.background = ''; btn.style.borderColor = ''; btn.style.color = ''; }
            this.showToast('Lectura en voz alta detenida');
            return;
        }

        // Obtener el texto de la sección activa
        const activeSection = document.querySelector('.view-section.active');
        const rawText = activeSection ? activeSection.innerText : document.body.innerText;
        const cleanText = rawText.replace(/\s+/g, ' ').trim().substring(0, 3000);

        if (!cleanText) { this.showToast('No hay texto para leer'); return; }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang  = 'es-MX';
        utterance.rate  = 0.95;
        utterance.pitch = 1;

        // Seleccionar voz en español si está disponible
        const voices = this.synth.getVoices();
        const esVoice = voices.find(v => v.lang.startsWith('es')) || null;
        if (esVoice) utterance.voice = esVoice;

        utterance.onend = () => {
            this.ttsActive = false;
            if (btn) { btn.setAttribute('aria-pressed', 'false'); btn.style.background = ''; btn.style.borderColor = ''; btn.style.color = ''; }
        };

        this.synth.speak(utterance);
        this.ttsActive = true;
        if (btn) {
            btn.setAttribute('aria-pressed', 'true');
            btn.style.background  = 'rgba(242,201,76,0.2)';
            btn.style.borderColor = 'var(--valtara-oro, #F2C94C)';
            btn.style.color       = 'var(--valtara-oro, #F2C94C)';
        }
        this.showToast('Leyendo en voz alta...');
    },

    // ================================================================================
    // 7. RESTABLECER TODO
    // ================================================================================
    resetAll: function() {
        // Quitar todas las clases de modo del <html>
        Object.values(this.modes).forEach(cls => {
            document.documentElement.classList.remove(cls);
        });

        // Restablecer zoom
        this.currentZoomLevel = 0;
        document.documentElement.style.fontSize = '';

        // Detener voz
        if (this.synth) this.synth.cancel();
        this.ttsActive = false;

        // Restablecer aria-pressed en todos los botones de accesibilidad
        Object.keys(this.modes).forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.setAttribute('aria-pressed', 'false');
                btn.style.background  = '';
                btn.style.borderColor = '';
                btn.style.color       = '';
            }
        });
        ['a11y-voice', 'a11y-zoom-in', 'a11y-zoom-out'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) { btn.setAttribute('aria-pressed', 'false'); btn.style.background = ''; btn.style.borderColor = ''; btn.style.color = ''; }
        });

        try { localStorage.removeItem('valtara_a11y_preferences'); } catch(e) {}
        this.showToast('Configuración visual restablecida');
        this.announce('Configuración de accesibilidad restablecida a valores originales');
    },

    // ================================================================================
    // 8. PERSISTENCIA DE PREFERENCIAS
    // ================================================================================
    savePreferences: function() {
        try {
            const prefs = {
                zoom: this.currentZoomLevel,
                modes: Object.keys(this.modes).filter(id =>
                    document.documentElement.classList.contains(this.modes[id])
                )
            };
            localStorage.setItem('valtara_a11y_preferences', JSON.stringify(prefs));
        } catch(e) {}
    },

    loadPreferences: function() {
        try {
            const stored = localStorage.getItem('valtara_a11y_preferences');
            if (!stored) return;
            const prefs = JSON.parse(stored);

            // Restaurar zoom
            if (typeof prefs.zoom === 'number' && prefs.zoom !== 0) {
                this.currentZoomLevel = prefs.zoom;
                const scale = 1 + (this.currentZoomLevel * 0.1);
                document.documentElement.style.fontSize = `${scale * 100}%`;
            }

            // Restaurar modos activos
            if (Array.isArray(prefs.modes)) {
                prefs.modes.forEach(btnId => {
                    const cssClass = this.modes[btnId];
                    if (cssClass) {
                        document.documentElement.classList.add(cssClass);
                        const btn = document.getElementById(btnId);
                        if (btn) {
                            btn.setAttribute('aria-pressed', 'true');
                            btn.style.background  = 'rgba(242,201,76,0.2)';
                            btn.style.borderColor = 'var(--valtara-oro, #F2C94C)';
                            btn.style.color       = 'var(--valtara-oro, #F2C94C)';
                        }
                    }
                });
            }
        } catch(e) {}
    },

    // ================================================================================
    // 9. ATAJOS DE TECLADO
    // ================================================================================
    initKeyboardShortcuts: function() {
        document.addEventListener('keydown', (e) => {
            // Alt + A → abrir panel de accesibilidad
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                const modal = document.getElementById('a11y-modal');
                if (modal) modal.showModal();
            }
            // Alt + + → zoom in
            if (e.altKey && (e.key === '+' || e.key === '=')) {
                e.preventDefault();
                this.adjustZoom(1);
            }
            // Alt + - → zoom out
            if (e.altKey && e.key === '-') {
                e.preventDefault();
                this.adjustZoom(-1);
            }
            // Escape → cerrar modal abierto
            if (e.key === 'Escape') {
                const openModal = document.querySelector('dialog[open]');
                if (openModal) openModal.close();
            }
        });
    },

    // ================================================================================
    // 10. TOAST DE NOTIFICACIÓN VISUAL
    // ================================================================================
    showToast: function(message) {
        const toast = document.getElementById('a11y-toast');
        if (!toast) return;

        clearTimeout(this.toastTimer);
        toast.textContent = message;
        toast.classList.add('show');

        this.toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    },

    // ================================================================================
    // 11. ANNOUNCE — Para lectores de pantalla (aria-live)
    // Llamado por core.js y router.js con cada cambio de estado
    // ================================================================================
    announce: function(message) {
        const announcer = document.getElementById('a11y-announcer');
        if (!announcer) return;
        // Limpiar y re-inyectar para forzar re-lectura del lector
        announcer.textContent = '';
        setTimeout(() => { announcer.textContent = message; }, 50);
    }
};

// Arrancar motor de accesibilidad
document.addEventListener('DOMContentLoaded', () => A11yEngine.init());
