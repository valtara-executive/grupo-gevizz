/**
 * ====================================================================================
 * VALTARA GESTURES ENGINE V40.1 — DESLIZAMIENTO LIMPIO
 * Sin puntos de paginación. Sin indicadores visuales. Solo la navegación.
 *
 * Archivo: js/gestures.js — carpeta js/
 * Agregar en index.html antes de </body>:
 *   <script src="js/gestures.js?v=40.0.0" defer></script>
 * ====================================================================================
 */

const ValtaraGestures = {

    navOrder: ['home', 'restoration', 'beauty', 'sonotherapy'],

    touchStartX:    0,
    touchStartY:    0,
    touchStartTime: 0,
    locked:         false,

    MIN_DISTANCE:  60,
    MAX_VERTICAL:  65,
    MAX_DURATION:  420,

    init: function() {
        const main = document.getElementById('main-content');
        if (!main) return;

        main.addEventListener('touchstart', (e) => this.onStart(e), { passive: true });
        main.addEventListener('touchend',   (e) => this.onEnd(e),   { passive: true });

        console.log('[GESTURES V40.1] Swipe activo.');
    },

    onStart: function(e) {
        if (document.querySelector('.side-menu.open')) return;
        if (document.querySelector('dialog[open]')) return;
        if (e.target.closest('.horizontal-carousel, .aura-chat-window, #aura-chat')) return;

        this.touchStartX    = e.touches[0].clientX;
        this.touchStartY    = e.touches[0].clientY;
        this.touchStartTime = Date.now();
    },

    onEnd: function(e) {
        if (!this.touchStartX || this.locked) return;
        if (document.querySelector('.side-menu.open')) return;
        if (document.querySelector('dialog[open]')) return;
        if (e.target.closest('.horizontal-carousel, .aura-chat-window, #aura-chat')) return;

        const dx       = e.changedTouches[0].clientX - this.touchStartX;
        const dy       = e.changedTouches[0].clientY - this.touchStartY;
        const duration = Date.now() - this.touchStartTime;

        this.touchStartX = 0;

        const horizontal = Math.abs(dx) > Math.abs(dy);
        const farEnough  = Math.abs(dx) >= this.MIN_DISTANCE;
        const fastEnough = duration <= this.MAX_DURATION;
        const notScroll  = Math.abs(dy) <= this.MAX_VERTICAL;

        if (horizontal && farEnough && fastEnough && notScroll) {
            this.go(dx < 0 ? 'next' : 'prev');
        }
    },

    go: function(dir) {
        if (!window.Router) return;

        const idx = this.navOrder.indexOf(window.Router.currentRoute);
        if (idx === -1) return;

        const nextIdx = dir === 'next' ? idx + 1 : idx - 1;
        if (nextIdx < 0 || nextIdx >= this.navOrder.length) return;

        this.locked = true;
        setTimeout(() => { this.locked = false; }, 500);

        window.Router.navigate(this.navOrder[nextIdx]);

        if (window.A11yEngine) {
            const labels = { home:'Inicio', restoration:'Masajes', beauty:'Manicura', sonotherapy:'Sonido' };
            A11yEngine.announce('Vista: ' + (labels[this.navOrder[nextIdx]] || ''));
        }
    }
};

document.addEventListener('DOMContentLoaded', () => ValtaraGestures.init());
