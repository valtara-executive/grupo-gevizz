/**
 * ====================================================================================
 * BLOQUE 5: CORE ENGINE V55.0 (SISTEMA NERVIOSO Y CANDADO FÍSICO ANTI-BLEED)
 * ------------------------------------------------------------------------------------
 * Arquitectura masiva con: 
 * 1. Candado Físico Anti-Scroll (Elimina el sangrado visual en el menú lateral).
 * 2. Motor Háptico (Vibración Táctil Premium).
 * 3. Intersection Observers (Scroll Reveal Fluido).
 * 4. Destructor de Cortina de Carga (Garantiza que el texto SIEMPRE se muestre).
 * ====================================================================================
 */

const CoreEngine = {
    // Memoria fotográfica de la posición del usuario
    scrollPosition: 0,

    init: function() {
        try {
            console.log("🟢 [VALTARA CORE V55] Iniciando matriz física y sensorial...");

            // 1. Inicialización de Subsistemas
            this.initSideMenu();
            this.initModals();
            this.initMotorHaptico();
            this.initSmartFABs();
            this.initScrollReveal();
            this.initBodyMap();
            
            // 2. PROTOCOLO DE SUPERVIVENCIA VISUAL (Destruir la pantalla de carga)
            // Esto asegura que la página NUNCA se quede en blanco.
            setTimeout(() => {
                document.body.classList.remove('system-loading');
                console.log("✨ [VALTARA CORE] Cortina levantada. Ecosistema activo.");
            }, 300);
            
        } catch (error) {
            console.error("🔴 [VALTARA CORE ERROR] Fallo crítico:", error);
            document.body.classList.remove('system-loading'); // Liberar pantalla incluso con error
        }
    },

    // ================================================================================
    // 1. CANDADO FÍSICO ANTI-SCROLL BLEED (ELIMINA EL "EFECTO LIGA" EN MÓVILES)
    // ================================================================================
    lockBodyScroll: function() {
        // 1. Guardamos la coordenada exacta
        this.scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        const body = document.body;

        // 2. Congelamiento absoluto de la física de la página
        body.style.position = 'fixed';
        body.style.top = `-${this.scrollPosition}px`;
        body.style.width = '100%';
        body.style.overflow = 'hidden';
        body.style.touchAction = 'none'; 
        
        // 3. Ocultar botones flotantes (WhatsApp/Aura) para que no ensucien el menú
        const fabs = document.getElementById('smart-fabs');
        if(fabs) fabs.style.display = 'none';
        
        console.log("🔒 [FÍSICA] Pantalla congelada.");
    },

    unlockBodyScroll: function() {
        const body = document.body;

        // 1. Descongelamiento
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.overflow = '';
        body.style.touchAction = '';

        // 2. Teletransportación al pixel exacto donde estaba el usuario
        window.scrollTo(0, this.scrollPosition);
        
        // 3. Mostrar botones flotantes de nuevo (Solo si no estamos en Aura o la Bóveda)
        const fabs = document.getElementById('smart-fabs');
        if(fabs && !document.querySelector('#view-aura.active') && !document.querySelector('#view-user-vault.active')) {
            fabs.style.display = 'flex';
        }
        
        console.log("🔓 [FÍSICA] Pantalla liberada.");
    },

    // ================================================================================
    // 2. GESTIÓN DEL MENÚ LATERAL BENTO GRID (Con Candado Físico)
    // ================================================================================
    initSideMenu: function() {
        const menuBtn = document.getElementById('menu-toggle-btn');
        const closeMenuBtn = document.getElementById('menu-close-btn');
        const sideMenu = document.getElementById('main-nav');

        if (menuBtn && sideMenu) {
            // ABRIR MENÚ
            menuBtn.addEventListener('click', () => {
                sideMenu.classList.add('open');
                menuBtn.setAttribute('aria-expanded', 'true');
                this.triggerVibration(15);
                this.lockBodyScroll(); // ACTIVA EL ESCUDO ANTI-SCROLL
            });

            // CERRAR MENÚ
            closeMenuBtn.addEventListener('click', () => {
                sideMenu.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                this.triggerVibration([10, 30, 10]);
                this.unlockBodyScroll(); // DESACTIVA EL ESCUDO
            });

            // CERRAR AL TOCAR EL FONDO OSCURO (El Backdrop)
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
    // 3. GESTIÓN DE MODALES (Aplica el candado al abrir "Accesibilidad" o "Términos")
    // ================================================================================
    initModals: function() {
        const modals = document.querySelectorAll('dialog');
        
        modals.forEach(dialog => {
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

            // Cierre haciendo clic en la sombra de fondo
            dialog.addEventListener('click', (event) => {
                const rect = dialog.getBoundingClientRect();
                const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                                    rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
                if (!isInDialog) {
                    dialog.close();
                    this.triggerVibration(10);
                }
            });
        });
    },

    // ================================================================================
    // 4. MOTOR HÁPTICO (VIBRACIÓN TÁCTIL DE ULTRA-LUJO)
    // ================================================================================
    initMotorHaptico: function() {
        this.triggerVibration = (pattern) => {
            if ('vibrate' in navigator) {
                try { navigator.vibrate(pattern); } catch(e) {} 
            }
        };

        // Vibrar al tocar cualquier botón premium
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
    // 5. GESTIÓN DE SMART FABS (Se ocultan al bajar rápido)
    // ================================================================================
    initSmartFABs: function() {
        let lastScrollY = window.scrollY || document.documentElement.scrollTop;
        let ticking = false;
        const fabs = document.getElementById('smart-fabs');

        if(!fabs) return;

        const handleScroll = () => {
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
    // 6. OBSERVERS DE RENDERIZADO (Animación suave al scrollear las tarjetas)
    // ================================================================================
    initScrollReveal: function() {
        const revealElements = document.querySelectorAll('.glass-card, .marketing-text');
        
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = `fadeInView 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

            revealElements.forEach(el => {
                el.style.opacity = '0'; 
                revealObserver.observe(el);
            });
        } else {
            revealElements.forEach(el => el.style.opacity = '1');
        }
    },

    // ================================================================================
    // 7. INTERFAZ BIOMECÁNICA (MAPA DEL CUERPO SVG)
    // ================================================================================
    initBodyMap: function() {
        const zones = document.querySelectorAll('#svg-cuerpo-humano path');
        const infoCards = document.querySelectorAll('.zone-info');

        if (zones.length === 0) return;

        zones.forEach(zone => {
            zone.addEventListener('click', (e) => {
                this.triggerVibration(25); 
                
                // Reiniciar zonas
                zones.forEach(z => z.style.fill = 'rgba(255,255,255,0.1)');
                
                // Encender la zona tocada
                e.target.style.fill = 'var(--valtara-cian-brillante)';

                const targetId = e.target.getAttribute('data-zone');
                
                // Apagar todas las tarjetas de información
                infoCards.forEach(card => {
                    card.style.display = 'none';
                    card.classList.remove('active');
                });

                // Encender la tarjeta correcta
                const targetCard = document.getElementById(`info-${targetId}`);
                if (targetCard) {
                    targetCard.style.display = 'block';
                    setTimeout(() => targetCard.classList.add('active'), 50);
                }
            });
        });
    }
};

// ====================================================================================
// AUTO-INICIO SEGURO
// ====================================================================================
document.addEventListener('DOMContentLoaded', () => {
    CoreEngine.init();
});
