/**
 * ====================================================================================
 * VALTARA TOUCH FIX V40.0 — BOTONES QUE SE QUEDAN PEGADOS EN IOS
 * ------------------------------------------------------------------------------------
 * Problema: En iOS Safari, el estado :active de CSS no se limpia automáticamente
 * al levantar el dedo. Los botones se quedan iluminados indefinidamente.
 *
 * Afecta a: flechas de sonoterapia (.track-btn), micrófono de Aura (#aura-mic-btn)
 * y cualquier otro botón interactivo de la app.
 *
 * Solución: Forzar blur() en touchend para que el navegador libere el estado activo.
 * Además, un watchdog de seguridad para el micrófono que se puede quedar en estado
 * "grabando" si el reconocimiento de voz falla silenciosamente.
 *
 * Archivo: js/touch_fix.js — carpeta js/
 * Línea en index.html antes de </body>:
 *   <script src="js/touch_fix.js?v=40.0.0" defer></script>
 * ====================================================================================
 */

const ValtaraTouchFix = {

    // Máximo tiempo permitido en estado de grabación (ms)
    // Si el micrófono lleva más de este tiempo activo, se resetea automáticamente
    MIC_WATCHDOG_MS: 30000,
    micWatchdog: null,

    init: function() {
        this.fixActiveStates();
        this.fixMicButton();
        console.log('[TOUCH FIX V40.0] Activo.');
    },

    // ── FIX GLOBAL: :active que no se limpia en iOS ──────────────────
    fixActiveStates: function() {

        // Al levantar el dedo: forzar blur en el elemento tocado
        // blur() limpia el estado :active y :focus en iOS Safari
        document.addEventListener('touchend', (e) => {
            const el = e.target;
            if (!el) return;

            // Encontrar el botón más cercano (el target puede ser un ícono dentro del btn)
            const btn = el.closest('button, a, [role="button"]');
            if (!btn) return;

            // Blur con un pequeño delay para que la animación del tap se vea primero
            requestAnimationFrame(() => {
                // Solo hacer blur si el elemento sigue siendo el activo
                if (document.activeElement === btn) {
                    btn.blur();
                }
            });
        }, { passive: true });

        // Inyectar CSS que fuerza la limpieza del estado activo
        // más rápido que la duración por defecto del navegador
        const style = document.createElement('style');
        style.id = 'valtara-touch-fix-css';
        style.textContent = `
            /*
             * Transición de :active muy corta → el estado visual se libera
             * rápidamente al soltar el dedo en lugar de quedarse pegado
             */
            button, a, [role="button"] {
                -webkit-tap-highlight-color: transparent !important;
            }

            /*
             * Los .track-btn de sonoterapia: estado activo explícito y limpio
             */
            .track-btn:active,
            .track-btn.is-active-touch {
                transition: transform 0.08s ease, background 0.08s ease !important;
            }

            /*
             * Botones de navegación de carrusel: asegurar que el glow
             * no persista más de lo necesario
             */
            .carousel-nav-btn:active,
            .arrow-btn:active {
                transition: all 0.1s ease !important;
            }

            /*
             * Micrófono de Aura: solo mostrar estado activo cuando tiene
             * la clase mic-recording — nunca por :active de CSS solo
             */
            #aura-mic-btn:not(.mic-recording):active {
                opacity: 0.7 !important;
                transition: opacity 0.08s ease !important;
            }
        `;
        document.head.appendChild(style);

        // Fix específico para los track-btn de sonoterapia:
        // añadir y quitar clase de toque manualmente para tener control total
        document.body.addEventListener('touchstart', (e) => {
            const trackBtn = e.target.closest('.track-btn, .carousel-nav-btn, .arrow-btn');
            if (trackBtn) {
                trackBtn.classList.add('is-active-touch');
            }
        }, { passive: true });

        document.body.addEventListener('touchend', (e) => {
            // Limpiar todos los botones que puedan tener el estado activo
            // incluido el que acaba de soltar y cualquier otro que haya quedado
            setTimeout(() => {
                document.querySelectorAll('.is-active-touch').forEach(btn => {
                    btn.classList.remove('is-active-touch');
                });
            }, 180); // 180ms: suficiente para ver el tap, suficiente para limpiar
        }, { passive: true });

        document.body.addEventListener('touchcancel', () => {
            document.querySelectorAll('.is-active-touch').forEach(btn => {
                btn.classList.remove('is-active-touch');
            });
        }, { passive: true });
    },

    // ── FIX ESPECÍFICO: Micrófono de Aura que se queda en "grabando" ──
    fixMicButton: function() {
        // Esperar a que Aura esté cargado
        const waitForAura = setInterval(() => {
            const micBtn = document.getElementById('aura-mic-btn');
            if (!micBtn) return;
            clearInterval(waitForAura);

            // Interceptar el click del micrófono para añadir el watchdog
            micBtn.addEventListener('click', () => {
                const isRecording = micBtn.classList.contains('mic-recording');

                if (!isRecording) {
                    // Acaba de INICIAR grabación → arrancar watchdog
                    clearTimeout(this.micWatchdog);
                    this.micWatchdog = setTimeout(() => {
                        // Si después de MIC_WATCHDOG_MS sigue en estado grabando,
                        // resetear visualmente (el recognition ya habrá fallado)
                        if (micBtn.classList.contains('mic-recording')) {
                            micBtn.classList.remove('mic-recording');
                            micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
                            micBtn.style.color        = 'var(--valtara-cian-brillante, #00FFCC)';
                            micBtn.style.borderColor  = 'var(--valtara-cian-brillante, #00FFCC)';
                            micBtn.style.animation    = '';
                            console.warn('[TOUCH FIX] Micrófono reseteado por watchdog (30s sin respuesta).');
                        }
                    }, this.MIC_WATCHDOG_MS);
                } else {
                    // Acaba de DETENER grabación → cancelar watchdog
                    clearTimeout(this.micWatchdog);
                }
            }, { passive: true });

            // También resetear si el usuario toca cualquier otra parte de la pantalla
            // mientras el micrófono está activo (comportamiento más natural)
            document.addEventListener('touchstart', (e) => {
                if (!micBtn.classList.contains('mic-recording')) return;
                if (e.target.closest('#aura-mic-btn')) return;

                // Toque fuera del micrófono mientras graba → no cancelar automáticamente,
                // pero sí cancelar el watchdog y reiniciarlo desde cero
                // (el usuario puede estar leyendo mientras dicta)
                clearTimeout(this.micWatchdog);
                this.micWatchdog = setTimeout(() => {
                    if (micBtn.classList.contains('mic-recording')) {
                        micBtn.classList.remove('mic-recording');
                        micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
                        micBtn.style.color       = 'var(--valtara-cian-brillante, #00FFCC)';
                        micBtn.style.borderColor = 'var(--valtara-cian-brillante, #00FFCC)';
                        micBtn.style.animation   = '';
                    }
                }, this.MIC_WATCHDOG_MS);

            }, { passive: true });

        }, 500);

        // Timeout de seguridad: si Aura no carga en 15s, dejar de esperar
        setTimeout(() => clearInterval(waitForAura), 15000);
    }
};

document.addEventListener('DOMContentLoaded', () => ValtaraTouchFix.init());
