/**
 * ====================================================================================
 * CORE ENGINE V63.0 (SISTEMA NERVIOSO Y ATMÓSFERA DINÁMICA)
 * ------------------------------------------------------------------------------------
 * Controla la física de la página, el menú lateral y la Inyección Ambiental 
 * para asegurar que el fondo nunca se vea "negro y feo", reaccionando a cada vista.
 * ====================================================================================
 */

const CoreEngine = {
    scrollPosition: 0,

    init: function() {
        console.log("🟢 [CORE V63] Iniciando Sistema Nervioso y Atmósfera...");

        this.initAmbientEngine();
        this.initSideMenu();
        this.initHeaderScroll();
        this.initModals();
        this.initSmartFABs();
        this.initHaptics();

        // Seguridad: Levantar la cortina de carga siempre
        setTimeout(() => {
            document.body.classList.remove('system-loading');
        }, 300);
    },

    // ================================================================================
    // 1. MOTOR AMBIENTAL (Mata el fondo negro y feo dinámicamente)
    // ================================================================================
    initAmbientEngine: function() {
        const body = document.body;
        
        // Función que pinta el fondo dependiendo de la sección
        const updateAtmosphere = (viewId) => {
            let resplandor = 'rgba(212, 175, 55, 0.12)'; // Oro (Home/Bóveda)
            
            if(viewId === 'view-restoration') resplandor = 'rgba(0, 168, 107, 0.15)'; // Verde Quetzal
            else if(viewId === 'view-beauty') resplandor = 'rgba(224, 26, 89, 0.12)'; // Rosa Mexicano
            else if(viewId === 'view-sonotherapy') resplandor = 'rgba(0, 191, 255, 0.15)'; // Azul Talavera
            else if(viewId === 'view-science') resplandor = 'rgba(255, 153, 0, 0.12)'; // Ámbar
            else if(viewId === 'view-aura') resplandor = 'rgba(0, 255, 204, 0.12)'; // Cian

            // Inyectamos el fondo radial de ultra-lujo directo al body
            body.style.backgroundImage = `radial-gradient(circle at top right, ${resplandor} 0%, #070712 70%)`;
            body.style.backgroundAttachment = 'fixed';
            body.style.backgroundColor = '#070712';
            body.style.transition = 'background-image 1.5s ease-in-out';
        };

        // Ponemos un vigía (Observer) que mira cuando el Router cambia la clase 'active'
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('active')) {
                    updateAtmosphere(mutation.target.id);
                }
            });
        });

        // Configurar el vigía para observar todas las secciones de vista
        setTimeout(() => {
            document.querySelectorAll('.view-section').forEach(section => {
                observer.observe(section, { attributes: true, attributeFilter: ['class'] });
                // Aplicar a la vista inicial
                if(section.classList.contains('active')) updateAtmosphere(section.id);
            });
        }, 500); // Esperamos a que el DOM esté inyectado
    },

    // ================================================================================
    // 2. EFECTO CRISTAL EN EL ENCABEZADO AL HACER SCROLL
    // ================================================================================
    initHeaderScroll: function() {
        const header = document.querySelector('.system-header');
        if(!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(5, 5, 8, 0.95)';
                header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
                header.style.padding = '0 2rem'; // Se encoge ligeramente
            } else {
                header.style.background = 'rgba(7, 7, 12, 0.7)';
                header.style.boxShadow = 'none';
                header.style.padding = '0 3.5rem'; // Vuelve al tamaño original
            }
        }, { passive: true });
    },

    // ================================================================================
    // 3. CANDADO FÍSICO DEL MENÚ LATERAL (Evita el "Scroll-Bleed")
    // ================================================================================
    lockBodyScroll: function() {
        this.scrollPosition = window.scrollY || document.documentElement.scrollTop;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollPosition}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        
        const fabs = document.getElementById('smart-fabs');
        if(fabs) fabs.style.display = 'none';
    },

    unlockBodyScroll: function() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, this.scrollPosition);
        
        const fabs = document.getElementById('smart-fabs');
        if(fabs && !document.querySelector('#view-aura.active') && !document.querySelector('#view-user-vault.active')) {
            fabs.style.display = 'flex';
        }
    },

    initSideMenu: function() {
        const menuBtn = document.getElementById('menu-toggle-btn');
        const sideMenu = document.getElementById('main-nav');
        
        // El botón de cierre puede no existir al principio si está dentro del menú, 
        // así que usamos delegación de eventos.
        if (menuBtn && sideMenu) {
            menuBtn.addEventListener('click', () => {
                sideMenu.classList.add('open');
                this.triggerVibration(15);
                this.lockBodyScroll();
            });

            sideMenu.addEventListener('click', (e) => {
                // Si toca el botón de cerrar o toca fuera del panel (fondo oscuro)
                if (e.target.closest('.close-btn') || e.target === sideMenu) {
                    sideMenu.classList.remove('open');
                    this.triggerVibration([10, 30, 10]);
                    this.unlockBodyScroll();
                }
            });
        }
    },

    // ================================================================================
    // 4. GESTIÓN DE MODALES LEGALES Y ACCESIBILIDAD
    // ================================================================================
    initModals: function() {
        document.body.addEventListener('click', (e) => {
            const openModalBtn = e.target.closest('[aria-controls]');
            if (openModalBtn) {
                const modalId = openModalBtn.getAttribute('aria-controls');
                const modal = document.getElementById(modalId);
                if (modal && typeof modal.showModal === 'function') {
                    modal.showModal();
                    this.lockBodyScroll();
                }
            }

            const closeModalBtn = e.target.closest('.close-modal-btn');
            if (closeModalBtn) {
                const modal = closeModalBtn.closest('dialog');
                if (modal) {
                    modal.close();
                    this.unlockBodyScroll();
                }
            }
        });
    },

    // ================================================================================
    // 5. SMART FABS (Se ocultan suavemente al bajar para no estorbar)
    // ================================================================================
    initSmartFABs: function() {
        let lastScrollY = window.scrollY;
        const fabs = document.getElementById('smart-fabs');

        if(!fabs) return;

        window.addEventListener('scroll', () => {
            if (document.body.style.position === 'fixed') return;
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                fabs.style.transform = 'translateY(120px) scale(0.8)';
                fabs.style.opacity = '0';
            } else {
                fabs.style.transform = 'translateY(0) scale(1)';
                fabs.style.opacity = '1';
            }
            lastScrollY = currentScrollY;
        }, { passive: true });
    },

    // ================================================================================
    // 6. MOTOR HÁPTICO SUTIL
    // ================================================================================
    initHaptics: function() {
        this.triggerVibration = (pattern) => {
            if ('vibrate' in navigator) {
                try { navigator.vibrate(pattern); } catch(e) {} 
            }
        };

        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.btn-primary') || e.target.closest('.nav-item') || e.target.closest('.fab-btn')) {
                this.triggerVibration(10); 
            }
        }, { passive: true });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    CoreEngine.init();
});
