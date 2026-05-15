/**
 * ====================================================================================
 * BLOQUE 5: CORE ENGINE V40.0 (SISTEMA OPERATIVO Y ESCUDO TÉRMICO VISUAL)
 * ====================================================================================
 */

const CoreEngine = {
    init: function() {
        try {
            if (window.ValtaraData) ValtaraData.renderAll();

            this.initModals();
            this.initSideMenu();
            this.initBodyMap();
            this.inyectarCSSAltaEficiencia();
            this.initThermalShield();

            setTimeout(() => {
                document.body.classList.remove('system-loading');
            }, 300);

            console.log('🟢 CoreEngine V40.0: Inicialización completa.');
        } catch (error) {
            console.error('🔴 CoreEngine Error:', error);
        }
    },

    // ================================================================================
    // UNLOCK / LOCK BODY SCROLL
    // ================================================================================
    lockBodyScroll: function() {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('pausar-ambiente');
    },

    unlockBodyScroll: function() {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = '';
        document.body.classList.remove('scroll-locked');
        document.body.classList.remove('pausar-ambiente');
    },

    // ================================================================================
    // SMART FABS
    // ================================================================================
    toggleSmartFabs: function(hide) {
        const fabs = document.getElementById('smart-fabs');

        if (fabs) {
            fabs.classList.toggle('fab-hidden', hide);
            fabs.style.pointerEvents = hide ? 'none' : 'auto';
        }
    },

    // ================================================================================
    // ESCUDO TÉRMICO
    // ================================================================================
    initThermalShield: function() {
        try {
            const homeSection = document.getElementById('view-home');
            if (!homeSection) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        document.body.classList.remove('pausar-ambiente');
                    } else {
                        document.body.classList.add('pausar-ambiente');
                    }
                });
            }, { threshold: 0.01 });

            observer.observe(homeSection);

        } catch (error) {
            console.warn('⚠️ CoreEngine: Escudo térmico no pudo inicializarse.', error);
        }
    },

    // ================================================================================
    // CSS DE ALTA EFICIENCIA
    // ================================================================================
    inyectarCSSAltaEficiencia: function() {

        if (document.getElementById('eco-mode-styles')) return;

        const style = document.createElement('style');

        style.id = 'eco-mode-styles';

        style.innerHTML = `
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    transition-duration: 0.01ms !important;
                }

                .ambient-engine {
                    display: none !important;
                }
            }

            body.eco-mode .exp-overlay,
            body.eco-mode #aura-modal,
            body.eco-mode .msg,
            body.eco-mode .glass-card {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: rgba(10,10,15,.98) !important;
            }

            body.pausar-ambiente .ambient-engine * {
                animation-play-state: paused !important;
            }
        `;

        document.head.appendChild(style);

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('eco-mode');
            }
        });

        window.addEventListener('touchstart', () => {
            document.body.classList.remove('eco-mode');
        }, { passive: true });
    },

    // ================================================================================
    // MODALES
    // ================================================================================
    initModals: function() {

        document.body.addEventListener('click', (e) => {

            const openBtn = e.target.closest('[aria-haspopup="dialog"]');

            if (openBtn) {

                setTimeout(() => {

                    const openDialog = document.querySelector('dialog[open]');

                    if (openDialog) {

                        this.lockBodyScroll();
                        this.toggleSmartFabs(true);

                        const nav = document.getElementById('main-nav');

                        if (nav && nav.classList.contains('open')) {
                            nav.classList.remove('open');
                            this.unlockBodyScroll();
                        }

                        if (window.A11yEngine) {
                            A11yEngine.announce('Ventana abierta.');
                        }
                    }

                }, 50);
            }

            const closeBtn = e.target.closest('[data-close]');

            if (closeBtn) {

                const targetId = closeBtn.getAttribute('data-close');
                const dialog = document.getElementById(targetId);

                if (dialog && dialog.open) {

                    dialog.style.opacity = '0';
                    dialog.style.transform = 'translate3d(0, 50px, 0) scale(0.95)';

                    setTimeout(() => {

                        dialog.close();

                        dialog.style.opacity = '';
                        dialog.style.transform = '';

                        this.unlockBodyScroll();
                        this.toggleSmartFabs(false);

                    }, 400);

                    if (window.A11yEngine) {
                        A11yEngine.announce('Ventana cerrada.');
                    }
                }
            }
        });

        document.querySelectorAll('dialog').forEach(dialog => {

            dialog.addEventListener('close', () => {

                const stillOpen = document.querySelector('dialog[open]');

                if (!stillOpen) {
                    this.unlockBodyScroll();
                    this.toggleSmartFabs(false);
                }
            });

        });
    },

    // ================================================================================
    // MENÚ LATERAL
    // ================================================================================
    initSideMenu: function() {

        const menuBtn = document.getElementById('menu-toggle-btn');
        const closeBtn = document.getElementById('menu-close-btn');
        const nav = document.getElementById('main-nav');

        if (!menuBtn || !closeBtn || !nav) return;

        menuBtn.addEventListener('click', () => {

            nav.classList.add('open');

            menuBtn.setAttribute('aria-expanded', 'true');
            nav.setAttribute('aria-hidden', 'false');

            this.lockBodyScroll();
            this.toggleSmartFabs(true);

            if (window.A11yEngine) {
                A11yEngine.announce('Panel de control abierto.');
            }
        });

        closeBtn.addEventListener('click', () => {

            nav.classList.remove('open');

            menuBtn.setAttribute('aria-expanded', 'false');
            nav.setAttribute('aria-hidden', 'true');

            this.unlockBodyScroll();
            this.toggleSmartFabs(false);

            if (window.A11yEngine) {
                A11yEngine.announce('Panel cerrado.');
            }
        });
    },

    // ================================================================================
    // BODY MAP
    // ================================================================================
    initBodyMap: function() {

        const mapContainer = document.getElementById('view-home');

        if (!mapContainer) return;

        mapContainer.addEventListener('click', (e) => {

            const btn = e.target.closest('.zone-btn');

            if (!btn) return;

            document.querySelectorAll('.zone-btn').forEach(b => {

                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');

                b.style.background = 'rgba(0,0,0,.4)';
                b.style.borderColor = 'rgba(0,255,255,.15)';
                b.style.transform = 'translateY(0)';
                b.style.boxShadow = 'none';

                const icon = b.querySelector('i');
                if (icon) icon.style.color = 'var(--valtara-cian-brillante)';

                const text = b.querySelector('span');
                if (text) text.style.color = 'var(--valtara-blanco)';
            });

            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            btn.style.background = 'var(--valtara-cian-brillante)';
            btn.style.transform = 'translateY(-4px)';
            btn.style.boxShadow = '0 1rem 3rem rgba(0,255,255,.4)';

            const icon = btn.querySelector('i');
            if (icon) icon.style.color = 'var(--valtara-negro-fondo)';

            const text = btn.querySelector('span');
            if (text) text.style.color = 'var(--valtara-negro-fondo)';

            const zone = btn.getAttribute('data-zone');

            this.updateZoneInfo(zone);

        });
    },

    updateZoneInfo: function(zoneId) {

        const display = document.getElementById('zone-display');

        if (!display) return;

        display.style.opacity = 0;

        setTimeout(() => {

            display.style.opacity = 1;
            display.style.transition = 'opacity .6s ease';

        }, 300);
    }
};

// ====================================================================================
// GUARDIÁN MAESTRO DE MEDIOS V2
// ====================================================================================
window.ValtaraMedia = {

    activeFades: {},

    silenciarTodo: function(excepcion = null) {

        document.querySelectorAll('audio, video').forEach(media => {

            if (media !== excepcion && !media.paused) {
                this.fadeOut(media);
            }

        });

        document.querySelectorAll('iframe[src*="youtube.com"]').forEach(iframe => {

            try {

                iframe.contentWindow.postMessage(
                    '{"event":"command","func":"pauseVideo","args":""}',
                    '*'
                );

            } catch(e) {

                console.warn('Iframe no accesible', e);

            }

        });
    },

    fadeOut: function(media) {

        if (this.activeFades[media.src]) {
            clearInterval(this.activeFades[media.src]);
        }

        let vol = media.volume;

        this.activeFades[media.src] = setInterval(() => {

            if (vol > 0.05) {

                vol -= 0.05;

                try {
                    media.volume = vol;
                } catch(e) {}

            } else {

                clearInterval(this.activeFades[media.src]);

                media.pause();

                try {
                    media.volume = 1;
                } catch(e) {}
            }

        }, 30);
    },

    fadeIn: function(media, targetVolume = 1) {

        this.silenciarTodo(media);

        if (this.activeFades[media.src]) {
            clearInterval(this.activeFades[media.src]);
        }

        try {
            media.volume = 0;
        } catch(e) {}

        const playPromise = media.play();

        if (playPromise !== undefined) {

            playPromise.then(() => {

                let vol = 0;

                this.activeFades[media.src] = setInterval(() => {

                    if (vol < targetVolume - 0.05) {

                        vol += 0.05;

                        try {
                            media.volume = vol;
                        } catch(e) {}

                    } else {

                        clearInterval(this.activeFades[media.src]);

                        try {
                            media.volume = targetVolume;
                        } catch(e) {}
                    }

                }, 50);

            }).catch(() => {
                console.log('Auto-play prevenido por el navegador.');
            });
        }
    }
};

// ====================================================================================
// AISLAMIENTO DEL MOTOR OASIS AUDIO
// CORRECCIÓN DEFINITIVA DEL BLOQUEO DE SONOTERAPIA
// ====================================================================================
window.addEventListener('click', function(e) {

    // NO tocar OasisEngine ni sus elementos
    if (
        e.target.closest('#btn-master-play') ||
        e.target.closest('#btn-next-track') ||
        e.target.closest('#btn-prev-track') ||
        e.target.closest('.track-btn') ||
        e.target.closest('.carousel-card') ||
        e.target.closest('#audio-carousel-short') ||
        e.target.closest('#audio-carousel-long') ||
        e.target.closest('#audio-carousel-radio')
    ) {
        return;
    }

    // El resto del sitio mantiene comportamiento normal
    window.ValtaraMedia.silenciarTodo();

}, { passive: true });

// ====================================================================================
// GUARDIÁN ANTI-CONGELAMIENTO
// ====================================================================================
document.addEventListener('click', (e) => {

    if (
        e.target.closest('[data-target]') ||
        e.target.closest('.close-btn') ||
        e.target.closest('.close-modal-btn')
    ) {

        setTimeout(() => {

            const menuAbierto = document.querySelector('.side-menu.open');
            const modalAbierto = document.querySelector('dialog[open]');

            if (!menuAbierto && !modalAbierto) {

                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';

                document.documentElement.style.overflow = '';

                document.body.classList.remove('scroll-locked');
                document.body.classList.remove('pausar-ambiente');
            }

        }, 450);
    }

});

// ====================================================================================
// BOTÓN ATRÁS
// ====================================================================================
window.addEventListener('popstate', () => {

    setTimeout(() => {

        document.body.style.overflow = '';
        document.body.style.position = '';

        document.documentElement.style.overflow = '';

        document.body.classList.remove('pausar-ambiente');

    }, 100);

});

// ====================================================================================
// INIT
// ====================================================================================
window.addEventListener('DOMContentLoaded', () => {
    CoreEngine.init();
});
