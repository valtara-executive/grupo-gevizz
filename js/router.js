/**
 * ====================================================================================
 * BLOQUE 6: ROUTER ENGINE V38.4 (ENRUTAMIENTO BLINDADO ANTI-PANTALLA NEGRA)
 * Transiciones forzadas por requestAnimationFrame para máxima compatibilidad móvil.
 * ====================================================================================
 */

const Router = {
    routes: ['home', 'restoration', 'beauty', 'sonotherapy', 'science', 'legal'],
    
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
        
        const redirectUrl = sessionStorage.redirect;
        delete sessionStorage.redirect; 

        if (redirectUrl) {
            const urlObj = new URL(redirectUrl);
            const path = urlObj.pathname; 
            const targetView = this.seoRoutesMap[path];
            if (targetView) {
                this.navigate(targetView, false); 
            } else {
                this.navigate('home', false); 
            }
        } else {
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

    // LA SOLUCIÓN DEFINITIVA A LA PANTALLA NEGRA
    renderView: function(viewId) {
        window.scrollTo({ top: 0, behavior: 'instant' });

        // 1. Apagado estricto
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
            section.style.display = 'none';
        });

        // 2. Encendido forzado
        const activeSection = document.getElementById(`view-${viewId}`);
        if(activeSection) {
            activeSection.style.display = 'block';
            
            // Forzar al navegador a pintar el DOM antes de animar (Evita Black Screen of Death)
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    activeSection.classList.add('active');
                    activeSection.style.opacity = '1';
                });
            });

            if(window.A11yEngine) A11yEngine.announce(`Pantalla cambiada a: ${activeSection.getAttribute('aria-label')}`);
            this.updateMenuHighlight(viewId);
            
            if(viewId === 'sonotherapy' && window.AuraEngine) {
                setTimeout(() => {
                    AuraEngine.appendMsg("Para una inmersión biomecánica total en la sala de acústica, recomiendo el uso de auriculares de alta fidelidad.", "bot");
                }, 1000);
            }
        }
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
