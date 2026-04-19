/**
 * ====================================================================================
 * BLOQUE 5: CORE ENGINE V42.0 (SISTEMA NERVIOSO SOBERANO Y ESCUDO TÉRMICO)
 * ------------------------------------------------------------------------------------
 * Arquitectura masiva con: 
 * 1. Reloj Biológico (Ciclo Sol/Luna Automático).
 * 2. Motor Háptico (Vibración Táctil Premium).
 * 3. Escudo Térmico Dinámico (Battery Status API).
 * 4. Intersection Observers (Scroll Reveal Fluido).
 * ====================================================================================
 */

const CoreEngine = {
    init: function() {
        try {
            console.log("🟢 [VALTARA CORE V42] Iniciando secuencia de arranque imperial...");

            // 1. Renderizado de Componentes Maestros
            if(window.ValtaraData && typeof window.ValtaraData.renderAll === 'function') {
                ValtaraData.renderAll();
            }
            
            // 2. Inicialización de Subsistemas
            this.initRelojBiologico();
            this.initMotorHaptico();
            this.initModals();
            this.initSideMenu();
            this.initBodyMap();
            this.initThermalShield(); 
            this.initSmartFABs();
            this.initScrollReveal();
            
            // 3. Retirar cortina de carga
            setTimeout(() => {
                document.body.classList.remove('system-loading');
                console.log("✨ [VALTARA CORE V42] Interfaz de Lujo Híbrida completamente activa.");
            }, 400);
            
        } catch (error) {
            console.error("🔴 [VALTARA CORE ERROR] Fallo crítico en el arranque:", error);
            if(window.ValtaraDiagnostics) ValtaraDiagnostics.evaluarImpacto('CORE_FAIL', 'Arranque del Sistema', error);
        }
    },

    // ================================================================================
    // 1. RELOJ BIOLÓGICO (CICLO CELESTIAL SOL / LUNA)
    // Evalúa la hora local del paciente para adaptar el CSS (Main.css V42)
    // ================================================================================
    initRelojBiologico: function() {
        const evaluarHora = () => {
            const hora = new Date().getHours();
            const body = document.body;
            
            // Si es entre las 19:00 PM y las 05:59 AM -> Modo Noche (Luna)
            if (hora >= 19 || hora < 6) {
                if (!body.classList.contains('modo-noche')) {
                    body.classList.add('modo-noche');
                    console.log("🌙 [RELOJ BIOLÓGICO] Activando Modo Noche. El Sol desciende, emerge la Media Luna.");
                }
            } else {
                // Día (Sol)
                if (body.classList.contains('modo-noche')) {
                    body.classList.remove('modo-noche');
                    console.log("☀️ [RELOJ BIOLÓGICO] Activando Modo Día. El Sol rige el santuario.");
                }
            }
        };

        // Evaluar inmediatamente al cargar
        evaluarHora();
        
        // Evaluar cada 5 minutos por si el paciente deja la app abierta en la transición
        setInterval(evaluarHora, 300000);
    },

    // ================================================================================
    // 2. MOTOR HÁPTICO (VIBRACIÓN TÁCTIL DE ULTRA-LUJO)
    // Solo funciona en dispositivos móviles soportados. Da un toque premium.
    // ================================================================================
    initMotorHaptico: function() {
        this.triggerVibration = (pattern) => {
            // Verifica si el dispositivo soporta la API de vibración
            if ('vibrate' in navigator) {
                try {
                    navigator.vibrate(pattern);
                } catch(e) {} // Fallback silencioso en iOS estricto
            }
        };

        // Aplicar a botones principales
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-primary') || e.target.closest('.fab-btn') || e.target.closest('.nav-item')) {
                this.triggerVibration(15); // Vibración ultra-corta y elegante
            }
            if (e.target.closest('.close-btn') || e.target.closest('.close-modal-btn')) {
                this.triggerVibration([10, 30, 10]); // Doble toque sutil al cerrar
            }
        }, { passive: true });
    },

    // ================================================================================
    // 3. GESTIÓN DE SMART FABS (Ocultamiento Dinámico al hacer Scroll)
    // ================================================================================
    initSmartFABs: function() {
        let lastScrollY = window.scrollY || document.documentElement.scrollTop;
        let ticking = false;
        const fabs = document.getElementById('smart-fabs');

        if(!fabs) return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY || document.documentElement.scrollTop;
            
            // Si baja rápido, oculta los botones flotantes para limpiar la pantalla
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
                fabs.classList.add('fab-hidden');
            } else {
                // Si sube, los vuelve a mostrar
                fabs.classList.remove('fab-hidden');
            }
            
            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }, { passive: true });
    },

    // ================================================================================
    // 4. OBSERVERS DE RENDERIZADO (SCROLL REVEAL)
    // Hace que las tarjetas "floten" suavemente al aparecer en pantalla.
    // ================================================================================
    initScrollReveal: function() {
        const revealElements = document.querySelectorAll('.glass-card, .marketing-text, .audio-tracks-grid');
        
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = `fadeInView 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                threshold: 0.1, // Dispara cuando el 10% del elemento es visible
                rootMargin: "0px 0px -50px 0px"
            });

            revealElements.forEach(el => {
                el.style.opacity = '0'; // Ocultar por defecto
                revealObserver.observe(el);
            });
        } else {
            // Fallback para navegadores muy antiguos
            revealElements.forEach(el => el.style.opacity = '1');
        }
    },

    // ================================================================================
    // 5. ESCUDO TÉRMICO Y GESTIÓN DE BATERÍA (EMPATÍA CORPORATIVA)
    // ================================================================================
    initThermalShield: function() {
        const body = document.body;
        
        // Verifica si el dispositivo soporta la API de batería
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                const checkBattery = () => {
                    // Si tiene menos del 20% y no está cargando -> Modo Ahorro Total
                    if (battery.level <= 0.20 && !battery.charging) {
                        if(!body.classList.contains('pausar-ambiente')) {
                            body.classList.add('pausar-ambiente');
                            console.warn("🛡️ [ESCUDO TÉRMICO] Batería baja detectada. Animaciones ambientales congeladas.");
                        }
                    } else {
                        body.classList.remove('pausar-ambiente');
                    }
                };

                checkBattery();
                battery.addEventListener('levelchange', checkBattery);
                battery.addEventListener('chargingchange', checkBattery);
            }).catch(e => console.log("[ESCUDO TÉRMICO] API de batería restringida por el navegador."));
        }
        
        // Atajo manual: Si el usuario pulsa el botón de "Detener Animaciones" en el panel de Inclusión
        const motionBtn = document.getElementById('a11y-motion');
        if(motionBtn) {
            motionBtn.addEventListener('click', () => {
                body.classList.toggle('pausar-ambiente');
                const isPaused = body.classList.contains('pausar-ambiente');
                motionBtn.setAttribute('aria-pressed', isPaused);
                if(window.A11yEngine) A11yEngine.announce(isPaused ? "Animaciones pausadas." : "Animaciones reanudadas.");
                this.triggerVibration([20, 50, 20]);
            });
        }
    },

    // ================================================================================
    // 6. GESTIÓN DE INTERFACES (MODALES Y MENÚS)
    // ================================================================================
    initSideMenu: function() {
        const menuBtn = document.getElementById('menu-toggle-btn');
        const closeMenuBtn = document.getElementById('menu-close-btn');
        const sideMenu = document.getElementById('main-nav');

        if (menuBtn && sideMenu) {
            menuBtn.addEventListener('click', () => {
                sideMenu.classList.add('open');
                menuBtn.setAttribute('aria-expanded', 'true');
                sideMenu.setAttribute('aria-hidden', 'false');
                this.triggerVibration(15);
            });

            closeMenuBtn.addEventListener('click', () => {
                sideMenu.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                sideMenu.setAttribute('aria-hidden', 'true');
                this.triggerVibration(10);
            });

            // Cierre al tocar fuera del menú
            document.addEventListener('click', (e) => {
                if (sideMenu.classList.contains('open') && !sideMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                    sideMenu.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    },

    initModals: function() {
        const modals = document.querySelectorAll('dialog');
        
        // Polyfill para navegadores viejos y cierre haciendo click en el fondo (backdrop)
        modals.forEach(dialog => {
            dialog.addEventListener('click', (event) => {
                const rect = dialog.getBoundingClientRect();
                const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                                    rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
                if (!isInDialog) {
                    dialog.close();
                }
            });

            // Compatibilidad con la tecla Escape
            dialog.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') dialog.close();
            });
        });
    },

    // ================================================================================
    // 7. INTERFAZ BIOMECÁNICA (MAPA DEL CUERPO SVG)
    // ================================================================================
    initBodyMap: function() {
        const zones = document.querySelectorAll('#svg-cuerpo-humano path, #svg-cuerpo-humano circle');
        const infoCards = document.querySelectorAll('.zone-info');

        if (zones.length === 0) return;

        zones.forEach(zone => {
            zone.addEventListener('click', (e) => {
                // Vibración táctil para sentir la zona del cuerpo seleccionada
                this.triggerVibration(25); 
                
                // Reiniciar selección visual
                zones.forEach(z => z.style.fill = 'rgba(255,255,255,0.1)');
                zones.forEach(z => z.style.filter = 'none');
                
                // Aplicar estilo de foco a la zona seleccionada
                e.target.style.fill = 'var(--valtara-cian-brillante)';
                e.target.style.filter = 'drop-shadow(0 0 10px var(--valtara-cian-brillante))';

                // Mostrar la tarjeta de información biomecánica correspondiente
                const targetId = e.target.getAttribute('data-zone');
                infoCards.forEach(card => {
                    card.style.display = 'none';
                    card.classList.remove('active');
                });

                const targetCard = document.getElementById(`info-${targetId}`);
                if (targetCard) {
                    targetCard.style.display = 'block';
                    // Pequeño timeout para que se ejecute la animación de entrada
                    setTimeout(() => targetCard.classList.add('active'), 50);
                    
                    if(window.A11yEngine) {
                        const title = targetCard.querySelector('h3');
                        if(title) A11yEngine.announce(`Zona seleccionada: ${title.innerText}`);
                    }
                }
            });
            
            // Cursor pointer para indicar interactividad
            zone.style.cursor = 'pointer';
        });
    }
};

/**
 * ====================================================================================
 * MOTOR DE AUDIO SOBERANO (VALTARA MEDIA ENGINE V42)
 * Manejo avanzado de transiciones suaves (Fade In / Fade Out) para Sonoterapia.
 * ====================================================================================
 */
window.ValtaraMedia = {
    activeFades: {},

    silenciarTodo: function(exceptoEsteMedia = null) {
        const audios = document.querySelectorAll('audio, video');
        audios.forEach(media => {
            if (media !== exceptoEsteMedia && !media.paused) {
                this.fadeOut(media);
            }
        });
        document.querySelectorAll('.track-btn').forEach(btn => btn.classList.remove('playing'));
    },

    fadeOut: function(media) {
        if(this.activeFades[media.src]) clearInterval(this.activeFades[media.src]);

        let vol = media.volume;
        this.activeFades[media.src] = setInterval(() => {
            if (vol > 0.05) {
                vol -= 0.05;
                try { media.volume = vol; } catch(e){}
            } else {
                clearInterval(this.activeFades[media.src]);
                media.pause();
                try { media.volume = 1; } catch(e){} 
            }
        }, 40); 
    },

    fadeIn: function(media, targetVolume = 1) {
        this.silenciarTodo(media); 
        if(this.activeFades[media.src]) clearInterval(this.activeFades[media.src]);

        try { media.volume = 0; } catch(e){}
        const playPromise = media.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                let vol = 0;
                this.activeFades[media.src] = setInterval(() => {
                    if (vol < targetVolume - 0.05) {
                        vol += 0.05;
                        try { media.volume = vol; } catch(e){}
                    } else {
                        clearInterval(this.activeFades[media.src]);
                        try { media.volume = targetVolume; } catch(e){}
                    }
                }, 50);
            }).catch(error => {
                console.log("⚠️ [MEDIA ENGINE] Auto-play prevenido por seguridad del navegador.");
            });
        }
    }
};

// Captura de clics globales para detener audio fuera de contexto
window.addEventListener('click', function(e) {
    if (e.target.closest('.carousel-card') || e.target.closest('#logo-btn')) {
        window.ValtaraMedia.silenciarTodo();
    }
}, { capture: true, passive: true });

// Arrancar el motor principal al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    CoreEngine.init();
});
