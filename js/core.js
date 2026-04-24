/**
 * ====================================================================================
 * BLOQUE 5: CORE ENGINE V40.0 (SISTEMA OPERATIVO Y ESCUDO TÉRMICO VISUAL)
 * ------------------------------------------------------------------------------------
 * Correcciones V40.0:
 * - Añadido método unlockBodyScroll() (router.js lo llamaba pero no existía)
 * - initModals() actualizado para escuchar cierre por onclick además de data-close
 * - Guardián anti-congelamiento mejorado
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
    // UNLOCK / LOCK BODY SCROLL — Llamados por router.js y menú lateral
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
    // SMART FABS — ya no existen FABs flotantes externos,
    // pero mantenemos el método para que aura.js u otros módulos no fallen
    // ================================================================================
    toggleSmartFabs: function(hide) {
        const fabs = document.getElementById('smart-fabs');
        if (fabs) {
            fabs.classList.toggle('fab-hidden', hide);
            fabs.style.pointerEvents = hide ? 'none' : 'auto';
        }
    },

    // ================================================================================
    // ESCUDO TÉRMICO — Pausa animaciones al hacer scroll hacia abajo
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
    // CSS DE ALTA EFICIENCIA Y ACCESIBILIDAD
    // ================================================================================
    inyectarCSSAltaEficiencia: function() {
        if (document.getElementById('eco-mode-styles')) return;
        const style = document.createElement('style');
        style.id = 'eco-mode-styles';
        style.innerHTML = `
            @media (prefers-reduced-motion: reduce) {
                * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
                .ambient-engine { display: none !important; }
            }
            body.eco-mode .exp-overlay,
            body.eco-mode #aura-modal,
            body.eco-mode .msg,
            body.eco-mode .glass-card {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: rgba(10, 10, 15, 0.98) !important;
            }
            body.pausar-ambiente .ambient-engine * {
                animation-play-state: paused !important;
            }
        `;
        document.head.appendChild(style);

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') document.body.classList.add('eco-mode');
        });
        window.addEventListener('touchstart', () => {
            document.body.classList.remove('eco-mode');
        }, { passive: true });
    },

    // ================================================================================
    // CONTROLADOR DE MODALES MAESTRO
    // Escucha tanto data-close como clics directos en botones de cierre con onclick
    // ================================================================================
    initModals: function() {
        document.body.addEventListener('click', (e) => {

            // ABRIR modal por aria-haspopup="dialog"
            const openBtn = e.target.closest('[aria-haspopup="dialog"]');
            if (openBtn) {
                // Los botones con onclick ya manejan el showModal() ellos mismos.
                // Solo ejecutamos la lógica de estado aquí si el modal se abrió.
                // Damos un tick para que el onclick haya corrido primero.
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
                        if (window.A11yEngine) A11yEngine.announce(`Ventana abierta.`);
                    }
                }, 50);
            }

            // CERRAR modal por data-close
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
                    if (window.A11yEngine) A11yEngine.announce('Ventana cerrada.');
                }
            }
        });

        // Cuando un <dialog> se cierra por cualquier medio (onclick, Escape, programático)
        // restauramos el scroll. Capturamos el evento nativo 'close' del elemento dialog.
        document.querySelectorAll('dialog').forEach(dialog => {
            dialog.addEventListener('close', () => {
                // Solo liberar si no hay otro modal abierto
                const stillOpen = document.querySelector('dialog[open]');
                if (!stillOpen) {
                    this.unlockBodyScroll();
                    this.toggleSmartFabs(false);
                }
            });
        });
    },

    // ================================================================================
    // CONTROLADOR DEL PANEL LATERAL
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
            if (window.A11yEngine) A11yEngine.announce('Panel de control abierto.');
        });

        closeBtn.addEventListener('click', () => {
            nav.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            nav.setAttribute('aria-hidden', 'true');
            this.unlockBodyScroll();
            this.toggleSmartFabs(false);
            if (window.A11yEngine) A11yEngine.announce('Panel cerrado.');
        });
    },

    // ================================================================================
    // MOTOR DE TRIAJE EDUCATIVO (Mapa del cuerpo)
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
                b.style.background = 'rgba(0,0,0,0.4)';
                b.style.borderColor = 'rgba(0,255,255,0.15)';
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
            btn.style.boxShadow = '0 1rem 3rem rgba(0,255,255,0.4)';

            const icon = btn.querySelector('i');
            if (icon) icon.style.color = 'var(--valtara-negro-fondo)';
            const text = btn.querySelector('span');
            if (text) text.style.color = 'var(--valtara-negro-fondo)';

            const zone = btn.getAttribute('data-zone');
            this.updateZoneInfo(zone);
        });
    },

    updateZoneInfo: function(zoneId) {
        const data = {
            craneo: `
                <i class="fa-solid fa-head-side-virus" style="font-size:4rem;color:var(--valtara-cian-brillante);margin-bottom:1rem;"></i>
                <h4 style="font-size:2.2rem;color:var(--valtara-blanco);margin-bottom:1rem;font-family:var(--font-accent);">Cráneo, Mandíbula y Rostro</h4>
                <p style="color:var(--valtara-gris-texto);font-size:1.15rem;margin-bottom:1.5rem;font-weight:300;">El estrés somatizado en el segmento superior es silencioso pero clínicamente devastador.</p>
                <details style="background:rgba(255,255,255,0.05);padding:1.5rem;border-radius:1rem;margin-bottom:1rem;border:1px solid rgba(0,255,255,0.3);cursor:pointer;text-align:left;">
                    <summary style="font-weight:900;font-size:1.2rem;color:var(--valtara-cian-brillante);outline:none;"><i class="fa-solid fa-microscope"></i> 1. El Nervio Trigémino y el Bruxismo</summary>
                    <p style="margin-top:1.5rem;color:var(--valtara-gris-texto);font-size:1.1rem;line-height:1.8;">El nervio trigémino controla los músculos de la masticación. Bajo niveles sostenidos de cortisol, ejerces hasta 70kg de presión involuntaria mientras duermes, fracturando el esmalte dental.</p>
                </details>
                <details style="background:rgba(255,255,255,0.05);padding:1.5rem;border-radius:1rem;margin-bottom:1.5rem;border:1px solid rgba(242,201,76,0.3);cursor:pointer;text-align:left;">
                    <summary style="font-weight:900;font-size:1.2rem;color:var(--valtara-oro);outline:none;"><i class="fa-solid fa-prescription-bottle-medical"></i> 2. La Solución Clínica Valtara</summary>
                    <p style="margin-top:1.5rem;color:var(--valtara-gris-texto);font-size:1.1rem;line-height:1.8;">Sugerimos la <strong>Rehabilitación Facial por Estrés Severo</strong>.</p>
                </details>
            `,
            cervical: `
                <i class="fa-solid fa-user-injured" style="font-size:4rem;color:var(--valtara-cian-brillante);margin-bottom:1rem;"></i>
                <h4 style="font-size:2.2rem;color:var(--valtara-blanco);margin-bottom:1rem;font-family:var(--font-accent);">Cervicales, Nuca y Trapecios</h4>
                <p style="color:var(--valtara-gris-texto);font-size:1.15rem;margin-bottom:1.5rem;font-weight:300;">Conocida en biomecánica como "La Zona del Intelecto". Pilar maestro de la máquina biológica.</p>
                <details style="background:rgba(255,255,255,0.05);padding:1.5rem;border-radius:1rem;margin-bottom:1rem;border:1px solid rgba(0,255,255,0.3);cursor:pointer;text-align:left;">
                    <summary style="font-weight:900;font-size:1.2rem;color:var(--valtara-cian-brillante);outline:none;"><i class="fa-solid fa-mobile-screen-button"></i> 1. El Síndrome Pandémico: "Text Neck"</summary>
                    <p style="margin-top:1.5rem;color:var(--valtara-gris-texto);font-size:1.1rem;line-height:1.8;">Al inclinar el cuello 60 grados viendo el móvil, tu columna soporta 27 kg de presión, destrozando los discos intervertebrales.</p>
                </details>
                <details style="background:rgba(255,255,255,0.05);padding:1.5rem;border-radius:1rem;margin-bottom:1.5rem;border:1px solid rgba(242,201,76,0.3);cursor:pointer;text-align:left;">
                    <summary style="font-weight:900;font-size:1.2rem;color:var(--valtara-oro);outline:none;"><i class="fa-solid fa-dumbbell"></i> 2. La Solución Clínica Valtara</summary>
                    <p style="margin-top:1.5rem;color:var(--valtara-gris-texto);font-size:1.1rem;line-height:1.8;">Recomendamos el <strong>Masaje Deportivo y Descompresión Muscular</strong>.</p>
                </details>
            `,
            lumbar: `
                <i class="fa-solid fa-child" style="font-size:4rem;color:var(--valtara-cian-brillante);margin-bottom:1rem;"></i>
                <h4 style="font-size:2.2rem;color:var(--valtara-blanco);margin-bottom:1rem;font-family:var(--font-accent);">Región Lumbar y Ciática</h4>
                <p style="color:var(--valtara-gris-texto);font-size:1.15rem;margin-bottom:1.5rem;font-weight:300;">La bóveda central biomecánica. El sedentarismo de escritorio la comprime implacablemente.</p>
                <details style="background:rgba(255,255,255,0.05);padding:1.5rem;border-radius:1rem;margin-bottom:1.5rem;border:1px solid rgba(0,255,255,0.3);cursor:pointer;text-align:left;">
                    <summary style="font-weight:900;font-size:1.2rem;color:var(--valtara-cian-brillante);outline:none;"><i class="fa-solid fa-bolt"></i> 1. Pinzamiento del Nervio Ciático</summary>
                    <p style="margin-top:1.5rem;color:var(--valtara-gris-texto);font-size:1.1rem;line-height:1.8;">Más de 6 horas sentado acorta el psoas, presionando el ciático y enviando descargas eléctricas a la pantorrilla.</p>
                </details>
                <details style="background:rgba(255,255,255,0.05);padding:1.5rem;border-radius:1rem;margin-bottom:1.5rem;border:1px solid rgba(242,201,76,0.3);cursor:pointer;text-align:left;">
                    <summary style="font-weight:900;font-size:1.2rem;color:var(--valtara-oro);outline:none;"><i class="fa-solid fa-person-praying"></i> 2. La Solución Clínica Valtara</summary>
                    <p style="margin-top:1.5rem;color:var(--valtara-gris-texto);font-size:1.1rem;line-height:1.8;">Recomendamos el <strong>Masaje Tailandés de Descompresión Pasiva</strong>.</p>
                </details>
            `,
            linfa: `
                <i class="fa-solid fa-shoe-prints" style="font-size:4rem;color:var(--valtara-cian-brillante);margin-bottom:1rem;"></i>
                <h4 style="font-size:2.2rem;color:var(--valtara-blanco);margin-bottom:1rem;font-family:var(--font-accent);">Sistema Linfático y Extremidades</h4>
                <p style="color:var(--valtara-gris-texto);font-size:1.15rem;margin-bottom:1.5rem;font-weight:300;">Cuando falla el bombeo venoso, las piernas se convierten en reservorios de toxinas.</p>
                <details style="background:rgba(255,255,255,0.05);padding:1.5rem;border-radius:1rem;margin-bottom:1.5rem;border:1px solid rgba(0,255,255,0.3);cursor:pointer;text-align:left;">
                    <summary style="font-weight:900;font-size:1.2rem;color:var(--valtara-cian-brillante);outline:none;"><i class="fa-solid fa-droplet"></i> 1. Estancamiento Linfático</summary>
                    <p style="margin-top:1.5rem;color:var(--valtara-gris-texto);font-size:1.1rem;line-height:1.8;">La linfa depende del movimiento. Viajes largos y estrés detienen el flujo, generando inflamación severa y celulitis.</p>
                </details>
                <details style="background:rgba(255,255,255,0.05);padding:1.5rem;border-radius:1rem;margin-bottom:1.5rem;border:1px solid rgba(242,201,76,0.3);cursor:pointer;text-align:left;">
                    <summary style="font-weight:900;font-size:1.2rem;color:var(--valtara-oro);outline:none;"><i class="fa-solid fa-water"></i> 2. La Solución Clínica Valtara</summary>
                    <p style="margin-top:1.5rem;color:var(--valtara-gris-texto);font-size:1.1rem;line-height:1.8;">Para reducción hídrica: <strong>Masaje Reductivo Drenante</strong>. Para enfoque suave: <strong>Drenaje Linfático Manual</strong>.</p>
                </details>
            `
        };

        const htmlContent = data[zoneId];
        const display = document.getElementById('zone-display');

        if (htmlContent && display) {
            display.style.opacity = 0;
            display.style.transform = 'translateY(10px)';
            setTimeout(() => {
                display.innerHTML = htmlContent + `
                    <div style="text-align:center;margin-top:2.5rem;">
                        <a href="https://wa.me/5213348572070" target="_blank" class="btn-primary" style="background:var(--valtara-whatsapp);border-color:var(--valtara-whatsapp);color:var(--valtara-negro-fondo);box-shadow:0 1rem 3rem rgba(37,211,102,0.4);text-decoration:none;">
                            <i class="fa-brands fa-whatsapp"></i> Chatear con Especialista
                        </a>
                    </div>
                `;
                display.style.opacity = 1;
                display.style.transform = 'translateY(0)';
                display.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, 300);
        }
    }
};

// ====================================================================================
// GUARDIÁN MAESTRO DE MEDIOS V2
// ====================================================================================
window.ValtaraMedia = {
    activeFades: {},

    silenciarTodo: function(excepcion = null) {
        document.querySelectorAll('audio, video').forEach(media => {
            if (media !== excepcion && !media.paused) this.fadeOut(media);
        });
        document.querySelectorAll('iframe[src*="youtube.com"]').forEach(iframe => {
            try { iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'); }
            catch(e) { console.warn('Iframe no accesible', e); }
        });
    },

    fadeOut: function(media) {
        if (this.activeFades[media.src]) clearInterval(this.activeFades[media.src]);
        let vol = media.volume;
        this.activeFades[media.src] = setInterval(() => {
            if (vol > 0.05) {
                vol -= 0.05;
                try { media.volume = vol; } catch(e) {}
            } else {
                clearInterval(this.activeFades[media.src]);
                media.pause();
                try { media.volume = 1; } catch(e) {}
            }
        }, 30);
    },

    fadeIn: function(media, targetVolume = 1) {
        this.silenciarTodo(media);
        if (this.activeFades[media.src]) clearInterval(this.activeFades[media.src]);
        try { media.volume = 0; } catch(e) {}
        const playPromise = media.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                let vol = 0;
                this.activeFades[media.src] = setInterval(() => {
                    if (vol < targetVolume - 0.05) {
                        vol += 0.05;
                        try { media.volume = vol; } catch(e) {}
                    } else {
                        clearInterval(this.activeFades[media.src]);
                        try { media.volume = targetVolume; } catch(e) {}
                    }
                }, 50);
            }).catch(() => console.log('Auto-play prevenido por el navegador.'));
        }
    }
};

window.addEventListener('click', function(e) {
    if (e.target.closest('#btn-master-play') || e.target.closest('.carousel-card')) {
        window.ValtaraMedia.silenciarTodo();
    }
}, { capture: true, passive: true });

// ====================================================================================
// GUARDIÁN ANTI-CONGELAMIENTO DE SCROLL
// ====================================================================================
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-target]') || e.target.closest('.close-btn') || e.target.closest('.close-modal-btn')) {
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

// Botón Atrás del celular — libera scroll
window.addEventListener('popstate', () => {
    setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.documentElement.style.overflow = '';
        document.body.classList.remove('pausar-ambiente');
    }, 100);
});

window.addEventListener('DOMContentLoaded', () => {
    CoreEngine.init();
});
