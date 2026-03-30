/**
 * ====================================================================================
 * BLOQUE 11: ENRUTADOR SOBERANO V27.1 (DELEGACIÓN OMNISCIENTE)
 * Controlador centralizado de navegación, transiciones suaves y blindaje de botones.
 * ====================================================================================
 */

const Router = {
    navigate: function(targetId) {
        // 1. Desvanecer suavemente todas las secciones activas
        const sections = document.querySelectorAll('.view-section');
        sections.forEach(sec => {
            if (sec.classList.contains('active')) {
                sec.style.opacity = '0';
                sec.classList.remove('active');
            }
        });
        
        // 2. Esperar a que termine el desvanecimiento para cambiar de pantalla
        setTimeout(() => {
            sections.forEach(sec => { sec.style.display = 'none'; });
            
            const target = document.getElementById('view-' + targetId);
            if(target) {
                target.style.display = 'block';
                target.style.opacity = '0';
                
                // Forzar el repintado del navegador (truco de rendimiento)
                void target.offsetWidth; 
                
                // Aplicar la nueva pantalla con un Fade-In lujoso
                target.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                target.style.opacity = '1';
                target.classList.add('active');
                
                // Subir la pantalla suavemente al inicio
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        }, 300);
    },
    
    init: function() {
        // Cargar la página de inicio por defecto
        this.navigate('home');
        
        // ====================================================================
        // DELEGACIÓN DE EVENTOS (EL BLINDAJE CONTRA BOTONES MUERTOS)
        // Escucha toda la página en lugar de botones individuales.
        // ====================================================================
        document.body.addEventListener('click', (e) => {
            
            // A. Navegación del Menú Principal
            const navBtn = e.target.closest('[data-target]');
            if (navBtn) {
                e.preventDefault();
                this.navigate(navBtn.getAttribute('data-target'));
                this.closeMenu();
                return;
            }

            // B. Botón de Mi Expediente Soberano (Respaldo Garantizado)
            const expBtn = e.target.closest('#btn-open-expediente');
            if (expBtn) {
                e.preventDefault();
                this.openExpediente();
                this.closeMenu();
                return;
            }
            
            // C. Botón Flotante de Aura IA
            const auraBtn = e.target.closest('#fab-aura');
            if (auraBtn) {
                e.preventDefault();
                const auraModal = document.getElementById('aura-modal');
                if(auraModal && typeof auraModal.showModal === 'function') {
                    auraModal.showModal();
                }
                return;
            }
            
        });
    },

    // Función auxiliar para cerrar el menú lateral limpiamente
    closeMenu: function() {
        const nav = document.getElementById('main-nav');
        if (nav) nav.classList.remove('open');
        
        const closeBtn = document.getElementById('menu-close-btn');
        if (closeBtn) closeBtn.click();
    },

    // Disparador forzado del Expediente
    openExpediente: function() {
        // Intentar abrir la Capa de Cristal (Versión 26.5)
        const overlay = document.getElementById('expediente-overlay');
        if (overlay) {
            overlay.classList.add('active');
            return;
        }
        
        // Respaldo por si el celular sigue atrapado en la caché vieja (Versión 25.1)
        const modal = document.getElementById('expediente-modal');
        if (modal && typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            console.warn("Valtara OS: El módulo del expediente clínico aún se está cargando de la red.");
        }
    }
};

// Arrancar el enrutador con un micro-retraso para asegurar que el DOM esté listo
window.addEventListener('DOMContentLoaded', () => { 
    setTimeout(() => Router.init(), 100); 
});
