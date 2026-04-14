/**
 * ====================================================================================
 * BLOQUE 6: ROUTER ENGINE V38.1 (ENRUTAMIENTO SEMÁNTICO & SEO INVISIBLE)
 * Transiciones de seda y captura de "Nodos Fantasma" del Sitemap.
 * ====================================================================================
 */

const Router = {
    routes: ['home', 'restoration', 'beauty', 'sonotherapy', 'science', 'legal'],
    
    // DICCIONARIO SEO: Traduce las URLs bonitas de Google a las vistas de tu SPA
    seoRoutesMap: {
        '/masaje-deportivo-reforma': 'restoration',
        '/liberacion-miofascial-cdmx': 'restoration',
        '/terapia-biomecanica-ejecutiva': 'restoration',
        '/catalogo-masajes-clinicos': 'restoration',
        '/art-and-nails-estudio': 'beauty',
        '/sonoterapia-y-meditacion': 'sonotherapy',
        '/ciencia-neurobiologia-del-dolor': 'science',
        '/herbario-clinico-aceites-esenciales': 'science',
        '/ergonomia-y-tejido-hidratado': 'science',
        '/manifiesto-codex-valtara': 'legal',
        '/politicas-privacidad-y-legal': 'legal'
    },

    init: function() {
        this.bindEvents();
        
        // 1. CAPTURA DE REDIRECCIÓN FANTASMA (Desde el 404.html)
        // Si el 404.html salvó una URL en sessionStorage, la leemos aquí.
        const redirectUrl = sessionStorage.redirect;
        delete sessionStorage.redirect; // Limpiamos la memoria

        if (redirectUrl) {
            const urlObj = new URL(redirectUrl);
            const path = urlObj.pathname; // Ej: "/masaje-deportivo-reforma"
            
            // Buscamos si esa ruta existe en nuestro Diccionario SEO
            const targetView = this.seoRoutesMap[path];
            
            if (targetView) {
                // Si la ruta hace match, vamos directo a esa vista sin pasar por el Inicio
                this.navigate(targetView, false); 
            } else {
                this.navigate('home', false); // Fallback de seguridad
            }
        } 
        // 2. NAVEGACIÓN NORMAL (Sin redirección previa)
        else {
            this.handleRoute();
        }

        window.addEventListener('popstate', () => this.handleRoute());
    },

    bindEvents: function() {
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('[data-target]');
            if(link) {
                e.preventDefault();
                const target = link.getAttribute('data-target');
                this.navigate(target);
                
                // Si el link estaba en el menú lateral, lo cerramos con elegancia
                const nav = document.getElementById('main-nav');
                if(nav && nav.classList.contains('open')) {
                    document.getElementById('menu-close-btn').click();
                }
            }
        });
    },

    handleRoute: function() {
        let hash = window.location.hash.replace('#', '');
        if(!hash || !this.routes.includes(hash)) hash = 'home';
        this.renderView(hash);
    },

    navigate: function(target, updateHistory = true) {
        if(!this.routes.includes(target)) return;
        
        if(updateHistory) {
            window.history.pushState(null, null, `#${target}`);
        }
        
        this.renderView(target);
    },

    renderView: function(viewId) {
        window.scrollTo({ top: 0, behavior: 'instant' });

        document.querySelectorAll('.view-section').forEach(section => {
            if(section.classList.contains('active')) {
                section.style.opacity = '0';
                section.style.transform = 'translate3d(0, 40px, 0) scale(0.98)';
                section.style.filter = 'blur(8px)';
                
                setTimeout(() => {
                    section.classList.remove('active');
                    section.style.display = 'none';
                }, 400); // Sincronizado con la transición CSS
            }
        });

        setTimeout(() => {
            const activeSection = document.getElementById(`view-${viewId}`);
            if(activeSection) {
                activeSection.style.display = 'block';
                // Pequeño reflow forzado para reiniciar la animación CSS
                void activeSection.offsetWidth; 
                activeSection.classList.add('active');
                activeSection.style.opacity = '1';
                activeSection.style.transform = 'translate3d(0, 0, 0) scale(1)';
                activeSection.style.filter = 'blur(0)';

                if(window.A11yEngine) A11yEngine.announce(`Pantalla cambiada a: ${activeSection.getAttribute('aria-label')}`);
                this.updateMenuHighlight(viewId);
                
                // Si el usuario entra a Sonoterapia, le recordamos usar audífonos
                if(viewId === 'sonotherapy' && window.AuraEngine) {
                    setTimeout(() => {
                        AuraEngine.appendMsg("Para una inmersión biomecánica total en la sala de acústica, recomiendo el uso de auriculares de alta fidelidad.", "bot");
                    }, 1000);
                }
            }
        }, 400);
    },

    updateMenuHighlight: function(viewId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('data-target') === viewId) {
                item.classList.add('active');
            }
        });
    }
};

window.addEventListener('DOMContentLoaded', () => Router.init());
