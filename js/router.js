/**
 * ====================================================================================
 * BLOQUE 11: ENRUTADOR SOBERANO V27.2 (DELEGACIÓN OMNISCIENTE + HISTORY API)
 * Controlador centralizado de navegación, transiciones suaves, blindaje de botones
 * y soporte nativo para gestos de retroceso en dispositivos móviles.
 * ====================================================================================
 */

const Router = {
    // 1. Añadimos el parámetro saveHistory (por defecto en true) para controlar las migajas
    navigate: function(targetId, saveHistory = true) {
        
        // ====================================================================
        // EL MOTOR DE GESTOS DEL CELULAR (HISTORY API)
        // Registra la "migaja de pan" silenciosamente en el navegador
        // ====================================================================
        if (saveHistory) {
            window.history.pushState({ vista: targetId }, '', '#' + targetId);
        }

        // 2. Desvanecer suavemente todas las secciones activas
        const sections = document.querySelectorAll('.view-section');
        sections.forEach(sec => {
            if (sec.classList.contains('active')) {
                sec.style.opacity = '0';
                sec.classList.remove('active');
            }
        });
        
        // 3. Esperar a que termine el desvanecimiento para cambiar de pantalla
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
        // Cargar la página de inicio por defecto (creando la primera migaja)
        this.navigate('home', true);
        
        // ====================================================================
        // DELEGACIÓN DE EVENTOS (EL BLINDAJE CONTRA BOTONES MUERTOS)
        // Escucha toda la página en lugar de botones individuales.
        // ====================================================================
        document.body.addEventListener('click', (e) => {
            
            // A. Navegación del Menú Principal
            const navBtn = e.target.closest('[data-target]');
            if (navBtn) {
                e.preventDefault();
                // Navega usando el atributo y crea una nueva migaja en el historial
                this.navigate(navBtn.getAttribute('data-target'), true);
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

// ========================================================================
// ESCUCHADOR DE EVENTOS GLOBALES: ATRAPAR EL GESTO DE RETROCESO DEL CELULAR
// ========================================================================
window.addEventListener('popstate', function(event) {
    // Cuando el usuario desliza para atrás o presiona el botón físico:
    if (event.state && event.state.vista) {
        // Navegamos a la sección guardada en el historial SIN crear una nueva migaja (false)
        Router.navigate(event.state.vista, false);
    } else {
        // Si retrocede más allá del historial, lo mandamos al inicio por seguridad
        Router.navigate('home', false);
    }
});

// Arrancar el enrutador con un micro-retraso para asegurar que el DOM esté listo
window.addEventListener('DOMContentLoaded', () => { 
    setTimeout(() => Router.init(), 100); 
});
