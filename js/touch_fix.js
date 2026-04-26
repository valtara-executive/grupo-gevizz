/**
 * VALTARA TOUCH FIX V40.1 — Solo JS, cero CSS overrides
 * Archivo: js/touch_fix.js — carpeta js/
 */
const ValtaraTouchFix = {

    micWatchdog: null,
    MIC_TIMEOUT: 30000,

    init: function() {
        this.fixActiveStates();
        this.fixMicWatchdog();
    },

    // Llama blur() al soltar el dedo → iOS libera el estado visual activo
    fixActiveStates: function() {
        document.addEventListener('touchend', (e) => {
            const btn = e.target.closest('button, a, [role="button"]');
            if (!btn) return;
            requestAnimationFrame(() => { btn.blur(); });
        }, { passive: true });
    },

    // Watchdog para el micrófono de Aura
    fixMicWatchdog: function() {
        const poll = setInterval(() => {
            const mic = document.getElementById('aura-mic-btn');
            if (!mic) return;
            clearInterval(poll);

            mic.addEventListener('click', () => {
                clearTimeout(this.micWatchdog);
                if (mic.classList.contains('mic-recording')) {
                    // Acaba de activarse → arrancar watchdog
                    this.micWatchdog = setTimeout(() => {
                        if (!mic.classList.contains('mic-recording')) return;
                        mic.classList.remove('mic-recording');
                        mic.innerHTML = '<i class="fa-solid fa-microphone"></i>';
                        mic.style.color = mic.style.borderColor = 'var(--valtara-cian-brillante,#00FFCC)';
                    }, this.MIC_TIMEOUT);
                }
            }, { passive: true });
        }, 500);
        setTimeout(() => clearInterval(poll), 15000);
    }
};

document.addEventListener('DOMContentLoaded', () => ValtaraTouchFix.init());
