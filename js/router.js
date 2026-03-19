/**
 * ====================================================================================
 * BLOQUE 5: ENRUTADOR VIRTUAL (HASH ROUTER)
 * Soluciona el error de recarga de página y gestiona el historial del navegador.
 * ====================================================================================
 */

const Router = {
    // Definimos las secciones válidas
    routes: ['home', 'restoration', 'codex', 'science', 'ergonomics', 'legal'],
    defaultRoute: 'home',

    init: function() {
        // 1. Escuchar los clics en los botones del menú
        const navItems = document.querySelectorAll('.nav-item[data-target]');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget.getAttribute('data-target');
                this.navigate(target);
            });
        });

        // 2. Escuchar cuando el usuario usa los botones de "Atrás/Adelante" del navegador
        window.addEventListener('hashchange', () => {
            this.handleHash();
        });

        // 3. Ejecutar el enrutador al cargar la página por primera vez
        this.handleHash();
    },

    navigate: function(route) {
        // Cambiar el Hash en la URL de forma segura
        window.location.hash = route;
    },

    handleHash: function() {
        // Obtener la ruta de la URL (quitando el #)
        let currentHash = window.location.hash.replace('#', '');
        
        // Si no hay hash o es inválido, mandarlo al inicio (home)
        if (!currentHash || !this.routes.includes(currentHash)) {
            currentHash = this.defaultRoute;
            window.history.replaceState(null, null, '#' + currentHash);
        }

        this.renderView(currentHash);
    },

    renderView: function(viewId) {
        // Ocultar todas las vistas
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
            section.setAttribute('aria-hidden', 'true');
        });

        // Desmarcar todos los botones del menú
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-expanded', 'false');
        });

        // Mostrar la vista objetivo
        const targetSection = document.getElementById('view-' + viewId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.setAttribute('aria-hidden', 'false');
            
            // Efecto cinemático de revelado para las tarjetas internas
            const reveals = targetSection.querySelectorAll('.reveal');
            reveals.forEach((r, index) => {
                r.classList.remove('active');
                setTimeout(() => r.classList.add('active'), 100 * index);
            });
        }

        // Marcar el botón del menú como activo
        const targetBtn = document.querySelector(`.nav-item[data-target="${viewId}"]`);
        if (targetBtn) {
            targetBtn.classList.add('active');
            targetBtn.setAttribute('aria-expanded', 'true');
            
            // Anunciar a los lectores de pantalla (Accesibilidad)
            if(window.A11yEngine) {
                const title = targetBtn.innerText.trim();
                A11yEngine.announce(`Sección cargada: ${title}`);
            }
        }

        // Cerrar el menú lateral en móviles si está abierto
        const sideMenu = document.getElementById('main-nav');
        if (sideMenu && sideMenu.classList.contains('open')) {
            sideMenu.classList.remove('open');
        }

        // Subir hasta arriba suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Iniciar el router en cuanto cargue el DOM
document.addEventListener('DOMContentLoaded', () => Router.init());
