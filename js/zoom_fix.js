/**
 * ====================================================================================
 * ZOOM FIX V40.0 — CORRECCIÓN DE PINCH-ZOOM PARA SPA MÓVIL
 * ------------------------------------------------------------------------------------
 * Problema:
 *   Al hacer pinch-zoom en móvil, el navegador separa el "layout viewport"
 *   (donde viven los position:fixed) del "visual viewport" (lo que el usuario ve).
 *   Los elementos fijos (header, barra inferior, fondo) se quedan anclados al
 *   layout viewport y aparecen en posiciones incorrectas o desaparecen.
 *
 * Solución:
 *   Usamos la Visual Viewport API (window.visualViewport) para detectar el offset
 *   y la escala del zoom. Actualizamos variables CSS en tiempo real para que los
 *   elementos fijos se anclen al visual viewport, no al layout viewport.
 *
 * Compatibilidad: Chrome 61+, Safari 13+, Firefox 91+ (cubre 98%+ de los usuarios)
 *
 * Archivo: js/zoom_fix.js
 * Ubicación: carpeta js/
 * Agregar en index.html ANTES de </body>:
 *   <script src="js/zoom_fix.js?v=40.0.0" defer></script>
 * ====================================================================================
 */

const ValtaraZoomFix = {

    // Elementos fijos que necesitan corrección
    header:    null,
    bottomNav: null,
    ambientBg: null,
    sideMenu:  null,

    // Estado
    isZoomed:      false,
    rafPending:    false,
    lastScale:     1,

    // ── INICIALIZACIÓN ─────────────────────────────────────────────
    init: function() {
        if (!window.visualViewport) {
            // Navegadores sin soporte (iOS Safari < 13): aplicar solo CSS defensivo
            this.applyFallbackCSS();
            return;
        }

        this.header    = document.querySelector('.system-header');
        this.bottomNav = document.getElementById('bottom-nav');
        this.ambientBg = document.getElementById('ambient-bg');
        this.sideMenu  = document.getElementById('main-nav');

        this.injectStyles();
        this.bindEvents();
        this.update(); // Leer el estado inicial

        console.log('🔍 [ZoomFix V40.0] Visual Viewport API activa.');
    },

    // ── ESTILOS INYECTADOS ─────────────────────────────────────────
    // No modifica main.css. Usa variables CSS que se actualizan por JS.
    injectStyles: function() {
        if (document.getElementById('valtara-zoom-fix-styles')) return;

        const style = document.createElement('style');
        style.id = 'valtara-zoom-fix-styles';
        style.textContent = `
            /*
             * Variables de posición del visual viewport.
             * Actualizadas dinámicamente por ValtaraZoomFix.update()
             * Cuando scale=1, valen 0 y todo se comporta normal.
             */
            :root {
                --vv-offset-top:  0px;
                --vv-offset-left: 0px;
                --vv-width:       100%;
                --vv-height:      100vh;
                --vv-scale:       1;
            }

            /*
             * Durante el zoom: los elementos fijos usan las variables del visual viewport
             * para posicionarse correctamente.
             * La clase 'valtara-zoomed' se añade al <html> cuando scale > 1.05
             */
            html.valtara-zoomed .system-header {
                top:   var(--vv-offset-top)  !important;
                left:  var(--vv-offset-left) !important;
                width: var(--vv-width)       !important;
                /* Transición desactivada durante zoom para evitar jitter */
                transition: none !important;
            }

            html.valtara-zoomed #bottom-nav {
                /*
                 * Cambiamos de bottom:0 a top calculado.
                 * top = offset_top + altura_visual - altura_barra
                 */
                top:    var(--vv-bottom-nav-top) !important;
                bottom: auto                     !important;
                left:   var(--vv-offset-left)   !important;
                width:  var(--vv-width)          !important;
                transition: none !important;
            }

            html.valtara-zoomed #ambient-bg {
                /* El fondo no necesita moverse, solo escalar para cubrir el viewport */
                top:    var(--vv-offset-top)  !important;
                left:   var(--vv-offset-left) !important;
                width:  var(--vv-width)       !important;
                height: var(--vv-height)      !important;
                transition: none !important;
            }

            html.valtara-zoomed #main-nav {
                /* El menú lateral también necesita ajuste de top */
                top: var(--vv-offset-top) !important;
                transition: none !important;
            }

            html.valtara-zoomed dialog[open] {
                /* Los modales también se anclan al visual viewport */
                top:    var(--vv-offset-top)  !important;
                left:   var(--vv-offset-left) !important;
                width:  var(--vv-width)       !important;
                height: var(--vv-height)      !important;
                transition: none !important;
            }

            /*
             * Suavizado al SALIR del zoom (cuando volvemos a scale=1)
             * La clase se elimina y los elementos vuelven a sus posiciones normales
             */
            html:not(.valtara-zoomed) .system-header,
            html:not(.valtara-zoomed) #bottom-nav,
            html:not(.valtara-zoomed) #ambient-bg {
                transition: top 0.2s ease, left 0.2s ease, width 0.2s ease !important;
            }

            /*
             * Prevención de layout shift extremo:
             * El contenido principal no debe quedar tapado por la barra inferior
             * cuando el usuario hace zoom out brusco
             */
            html.valtara-zoomed #main-content {
                /* Ajustamos el padding inferior según la posición real de la barra */
                padding-bottom: var(--vv-bottom-nav-height, 70px) !important;
            }

            /*
             * Indicador visual de zoom activo (opcional, sutil)
             * Una línea dorada muy fina en la barra inferior al hacer zoom
             */
            html.valtara-zoomed #bottom-nav {
                border-top-color: rgba(242, 201, 76, 0.35) !important;
                box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.6) !important;
            }
        `;

        document.head.appendChild(style);
    },

    // ── VINCULACIÓN DE EVENTOS ────────────────────────────────────
    bindEvents: function() {
        const vv = window.visualViewport;

        // Resize cubre el zoom
        vv.addEventListener('resize', () => this.scheduleUpdate(), { passive: true });

        // Scroll del visual viewport (pan durante zoom)
        vv.addEventListener('scroll', () => this.scheduleUpdate(), { passive: true });

        // Al rotar el dispositivo: resetear
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.update();
            }, 300); // Pequeño delay para que el navegador recalcule el layout
        }, { passive: true });
    },

    // ── ACTUALIZACION VIA requestAnimationFrame ───────────────────
    // Evita thrashing del DOM al actualizar solo una vez por frame
    scheduleUpdate: function() {
        if (this.rafPending) return;
        this.rafPending = true;
        requestAnimationFrame(() => {
            this.update();
            this.rafPending = false;
        });
    },

    // ── LÓGICA PRINCIPAL DE REPOSICIONAMIENTO ─────────────────────
    update: function() {
        const vv     = window.visualViewport;
        const scale  = vv.scale;
        const top    = Math.round(vv.offsetTop);
        const left   = Math.round(vv.offsetLeft);
        const width  = Math.round(vv.width);
        const height = Math.round(vv.height);

        // Altura real de la barra inferior
        const bottomNavHeight = this.bottomNav ? this.bottomNav.offsetHeight : 70;

        // Calcular dónde poner el top de la barra inferior
        // = offset_top_visual + altura_visual - altura_barra
        const bottomNavTop = top + height - bottomNavHeight;

        // Actualizar variables CSS en :root
        const root = document.documentElement;
        root.style.setProperty('--vv-offset-top',       `${top}px`);
        root.style.setProperty('--vv-offset-left',      `${left}px`);
        root.style.setProperty('--vv-width',            `${width}px`);
        root.style.setProperty('--vv-height',           `${height}px`);
        root.style.setProperty('--vv-scale',            `${scale}`);
        root.style.setProperty('--vv-bottom-nav-top',   `${bottomNavTop}px`);
        root.style.setProperty('--vv-bottom-nav-height',`${bottomNavHeight}px`);

        // Añadir/quitar clase según si hay zoom activo
        const zoomed = scale > 1.05;
        if (zoomed !== this.isZoomed) {
            this.isZoomed = zoomed;
            root.classList.toggle('valtara-zoomed', zoomed);

            // Al salir del zoom: esperar a que los elementos vuelvan a su sitio
            // y luego limpiar los estilos inline que pueda haber
            if (!zoomed) {
                setTimeout(() => this.reset(), 220);
            }
        }

        this.lastScale = scale;
    },

    // ── RESET AL SALIR DEL ZOOM ───────────────────────────────────
    reset: function() {
        const root = document.documentElement;

        // Volver a valores por defecto
        root.style.setProperty('--vv-offset-top',  '0px');
        root.style.setProperty('--vv-offset-left', '0px');
        root.style.setProperty('--vv-width',       '100%');
        root.style.setProperty('--vv-height',      '100vh');

        // Asegurarse de que la clase esté quitada
        root.classList.remove('valtara-zoomed');
    },

    // ── CSS DE FALLBACK para Safari < 13 / Firefox < 91 ──────────
    applyFallbackCSS: function() {
        // En navegadores sin Visual Viewport API, al menos prevenimos
        // el zoom automático en inputs (el culpable más común del bug)
        const style = document.createElement('style');
        style.id = 'valtara-zoom-fix-fallback';
        style.textContent = `
            /* Evita el auto-zoom en inputs en iOS Safari antiguo */
            input, textarea, select {
                font-size: max(16px, 1rem) !important;
            }
        `;
        document.head.appendChild(style);
        console.log('⚠️ [ZoomFix] Visual Viewport API no disponible. Fallback aplicado.');
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => ValtaraZoomFix.init());
