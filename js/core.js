/**
 * ====================================================================================
 * BLOQUE 5: CORE ENGINE V48.0 (SISTEMA NERVIOSO, FÍSICA Y ESCUDO TÉRMICO)
 * ------------------------------------------------------------------------------------
 * Arquitectura masiva con: 
 * 1. Candado Físico Anti-Scroll (Elimina el sangrado visual en móviles).
 * 2. Motor Háptico (Vibración Táctil Premium).
 * 3. Reloj Biológico (Ciclo Sol/Luna Automático).
 * 4. Escudo Térmico Dinámico (Battery Status API).
 * 5. Intersection Observers (Scroll Reveal Fluido).
 * ====================================================================================
 */

const CoreEngine = {
    // Variable para guardar la posición exacta antes de bloquear la pantalla
    scrollPosition: 0,

    init: function() {
        try {
            console.log("🟢 [VALTARA CORE V48] Iniciando matriz física y sensorial...");

            // 1. Renderizado de Componentes Maestros (Si el constructor está listo)
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
                console.log("✨ [VALTARA CORE V48] Interfaz de Lujo Híbrida completamente activa y blindada.");
            }, 400);
            
        } catch (error) {
            console.error("🔴 [VALTARA CORE ERROR] Fallo crítico en la física del sistema:", error);
            if(window.ValtaraDiagnostics) ValtaraDiagnostics.evaluarImpacto('CORE_FAIL', 'Matriz Física', error);
        }
    },

    // ================================================================================
    // 1. CANDADO FÍSICO ANTI-SCROLL BLEED (ELIMINA EL "EFECTO LIGA" EN MÓVILES)
    // ================================================================================
    lockBodyScroll: function() {
        // Guardamos la posición exacta del usuario
        this.scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        const body = document.body;
        const html = document.documentElement;

        // Congelamiento absoluto
        body.style.position = 'fixed';
        body.style.top = `-${this.scrollPosition}px`;
        body.style.width = '100%';
        body.style.overflow = 'hidden';
        body.style.touchAction = 'none'; // Mata el arrastre táctil del fondo
        html.style.touchAction = 'none';
        html.style.overscrollBehavior = 'none'; // Elimina el rebote de iOS
        
        // Ocultar botones flotantes para que no estorben sobre el menú
        const fabs = document.getElementById('smart-fabs');
        if(fabs) fabs.style.display = 'none';
    },

    unlockBodyScroll: function() {
        const body = document.body;
        const html = document.documentElement;

        // Descongelamiento
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.overflow = '';
        body.style.touchAction = '';
        html.style.touchAction = '';
        html.style.overscrollBehavior = '';

        // Restaurar posición exacta
        window.scrollTo(0, this.scrollPosition);
        
        // Mostrar botones flotantes de nuevo (Aura y WhatsApp)
        const fabs = document.getElementById('smart-fabs');
        // Solo restaurarlos si no estamos en Aura o la Bóveda (que son pantalla completa)
        if(fabs && !document.querySelector('#view-aura.active') && !document.querySelector('#view-user-vault.active')) {
            fabs.style.display = 'flex';
        }
    },

    // ================================================================================
    // 2. GESTIÓN DEL MENÚ LATERAL BENTO GRID
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
                this.lockBodyScroll(); // BLINDAJE ACTIVADO
            });

            closeMenuBtn.addEventListener('click', () => {
                sideMenu.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                sideMenu.setAttribute('aria-hidden', 'true');
                this.triggerVibration([10, 30, 10]);
                this.unlockBodyScroll(); // BLINDAJE DESACTIVADO
            });

            // Cierre al tocar fuera del menú (en el fondo oscurecido)
            document.addEventListener('click', (e) => {
                if (sideMenu.classList.contains('open') && !sideMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                    sideMenu.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    this.unlockBodyScroll();
                }
            });
        }
    },

    // ================================================================================
    // 3. GESTIÓN DE MODALES (VENTANAS EMERGENTES NATIVAS)
    // ================================================================================
    initModals: function() {
        const modals = document.querySelectorAll('dialog');
        
        modals.forEach(dialog => {
            // Vigilar cuando el modal se abre para aplicar el candado
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'open') {
                        if (dialog.hasAttribute('open')) {
                            this.lockBodyScroll();
                        } else {
                            this.unlockBodyScroll();
                        }
                    }
                });
            });
            observer.observe(dialog, { attributes: true });

            // Cierre haciendo clic en el fondo (backdrop)
            dialog.addEventListener('click', (event) => {
                const rect = dialog.getBoundingClientRect();
                const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                                    rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
                if (!isInDialog) {
                    dialog.close();
                    this.triggerVibration(10);
                }
            });

            // Compatibilidad con la tecla Escape
            dialog.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') dialog.close();
            });
        });
    },

    // ================================================================================
    // 4. RELOJ BIOLÓGICO (CICLO CELESTIAL SOL / LUNA)
    // ================================================================================
    initRelojBiologico: function() {
        const evaluarHora = () => {
            const hora = new Date().getHours();
            const body = document.body;
            
            // Si es entre las 19:00 PM y las 05:59 AM -> Modo Noche (Luna)
            if (hora >= 19 || hora < 6) {
                if (!body.classList.contains('modo-noche')) {
                    body.classList.add('modo-noche');
                    console.log("🌙 [RELOJ BIOLÓGICO] Activando Modo Noche. El Sol desciende.");
                }
            } else {
                // Día (Sol)
                if (body.classList.contains('modo-noche')) {
                    body.classList.remove('modo-noche');
                    console.log("☀️ [RELOJ BIOLÓGICO] Activando Modo Día. El Sol rige el santuario.");
                }
            }
        };

        evaluarHora(); // Ejecutar al inicio
        setInterval(evaluarHora, 300000); // Evaluar cada 5 minutos
    },

    // ================================================================================
    // 5. MOTOR HÁPTICO (VIBRACIÓN TÁCTIL DE ULTRA-LUJO)
    // ================================================================================
    initMotorHaptico: function() {
        this.triggerVibration = (pattern) => {
            if ('vibrate' in navigator) {
                try { navigator.vibrate(pattern); } catch(e) {} 
            }
        };

        // Aplicar a botones principales globalmente
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-primary') || e.target.closest('.fab-btn') || e.target.closest('.nav-item')) {
                this.triggerVibration(15); 
            }
            if (e.target.closest('.close-btn') || e.target.closest('.close-modal-btn')) {
                this.triggerVibration([10, 30, 10]); 
            }
        }, { passive: true });
    },

    // ================================================================================
    // 6. GESTIÓN DE SMART FABS (Ocultamiento Dinámico al hacer Scroll)
    // ================================================================================
    initSmartFABs: function() {
        let lastScrollY = window.scrollY || document.documentElement.scrollTop;
        let ticking = false;
        const fabs = document.getElementById('smart-fabs');

        if(!fabs) return;

        const handleScroll = () => {
            // No ocultar si estamos bloqueados
            if (document.body.style.position === 'fixed') return;

            const currentScrollY = window.scrollY || document.documentElement.scrollTop;
            
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
                fabs.style.transform = 'translateY(150px)';
                fabs.style.opacity = '0';
            } else {
                fabs.style.transform = 'translateY(0)';
                fabs.style.opacity = '1';
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
    // 7. OBSERVERS DE RENDERIZADO (SCROLL REVEAL)
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
                threshold: 0.1, 
                rootMargin: "0px 0px -50px 0px"
            });

            revealElements.forEach(el => {
                el.style.opacity = '0'; 
                revealObserver.observe(el);
            });
        } else {
            revealElements.forEach(el => el.style.opacity = '1');
        }
    },

    // ================================================================================
    // 8. ESCUDO TÉRMICO Y GESTIÓN DE BATERÍA
    // ================================================================================
    initThermalShield: function() {
        const body = document.body;
        
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                const checkBattery = () => {
                    if (battery.level <= 0.20 && !battery.charging) {
                        if(!body.classList.contains('pausar-ambiente')) {
                            body.classList.add('pausar-ambiente');
                            console.warn("🛡️ [ESCUDO TÉRMICO] Batería baja. Animaciones ambientales congeladas.");
                        }
                    } else {
                        body.classList.remove('pausar-ambiente');
                    }
                };

                checkBattery();
                battery.addEventListener('levelchange', checkBattery);
                battery.addEventListener('chargingchange', checkBattery);
            }).catch(e => {});
        }
        
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
    // 9. INTERFAZ BIOMECÁNICA (MAPA DEL CUERPO SVG)
    // ================================================================================
    initBodyMap: function() {
        const zones = document.querySelectorAll('#svg-cuerpo-humano path, #svg-cuerpo-humano circle');
        const infoCards = document.querySelectorAll('.zone-info');

        if (zones.length === 0) return;

        zones.forEach(zone => {
            zone.addEventListener('click', (e) => {
                this.triggerVibration(25); 
                
                zones.forEach(z => z.style.fill = 'rgba(255,255,255,0.1)');
                zones.forEach(z => z.style.filter = 'none');
                
                e.target.style.fill = 'var(--valtara-cian-brillante)';
                e.target.style.filter = 'drop-shadow(0 0 10px var(--valtara-cian-brillante))';

                const targetId = e.target.getAttribute('data-zone');
                infoCards.forEach(card => {
                    card.style.display = 'none';
                    card.classList.remove('active');
                });

                const targetCard = document.getElementById(`info-${targetId}`);
                if (targetCard) {
                    targetCard.style.display = 'block';
                    setTimeout(() => targetCard.classList.add('active'), 50);
                    
                    if(window.A11yEngine) {
                        const title = targetCard.querySelector('h3');
                        if(title) A11yEngine.announce(`Zona seleccionada: ${title.innerText}`);
                    }
                }
            });
            zone.style.cursor = 'pointer';
        });
    }
};

/**
 * ====================================================================================
 * MOTOR DE AUDIO SOBERANO (VALTARA MEDIA ENGINE V48)
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
