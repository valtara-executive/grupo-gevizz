/**
 * ====================================================================================
 * BLOQUE 6: ROUTER ENGINE V39.0 (CLEAN URLS & ANTI-PANTALLA NEGRA)
 * Enrutamiento History API (Sin "#") con Mapeo SEO Bidireccional.
 * ====================================================================================
 */

const Router = {
    // Los IDs internos de tus secciones (No tocamos esto para no romper tu HTML)
    routes: ['home', 'restoration', 'beauty', 'sonotherapy', 'science', 'legal'],
    
    // 1. MAPEO DE ENTRADA (URL Limpia -> ID de Vista Interna)
    // Esto le dice a Google y al navegador qué sección abrir cuando alguien entra a la URL
    pathToViewMap: {
        '/': 'home',
        '/catalogo-masajes': 'restoration',
        '/estudio-manicura': 'beauty',
        '/sonoterapia': 'sonotherapy',
        '/ciencia-y-botanica': 'science',
        '/politicas': 'legal',
        
        // Redirecciones SEO históricas (Las mantenemos por si alguien guardó estos links)
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

    // 2. MAPEO DE SALIDA (ID de Vista Interna -> URL Limpia)
    // Esto es lo que se escribirá en la barra de direcciones sin recargar la página
    viewToPathMap: {
        'home': '/',
        'restoration': '/catalogo-masajes',
        'beauty': '/estudio-manicura',
        'sonotherapy': '/sonoterapia',
        'science': '/ciencia-y-botanica',
        'legal': '/politicas'
    },

    init: function() {
        this.bindEvents();
        
        // Intercepción del archivo 404.html (El hack de la PWA para GitHub Pages)
        const redirectUrl = sessionStorage.redirect;
        delete sessionStorage.redirect; 

        if (redirectUrl) {
            const urlObj = new URL(redirectUrl);
            const path = urlObj.pathname; 
            
            // Buscar la vista que corresponde a la URL limpia
            const targetView = this.pathToViewMap[path];
            if (targetView) {
                this.navigate(targetView, false); // false = no duplicar en historial
            } else {
                this.navigate('home', false); 
            }
        } else {
            // Entrada normal (Ej: el usuario escribió valtaraexecutive.com/politicas)
            this.handleRoute();
        }

        // Escuchar los botones "Atrás/Adelante" del navegador móvil/escritorio
        window.addEventListener('popstate', () => this.handleRoute());
    },

    bindEvents: function() {
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('[data-target]');
            if(link) {
                e.preventDefault();
                // Extrae el ID interno (ej. 'restoration')
                const target = link.getAttribute('data-target');
                this.navigate(target);
                
                // Cierra el menú móvil si estaba abierto
                const nav = document.getElementById('main-nav');
                if(nav && nav.classList.contains('open')) {
                    document.getElementById('menu-close-btn').click();
                }
            }
        });
    },

    handleRoute: function() {
        // LEEMOS LA RUTA REAL (Pathname) EN VEZ DEL HASH (#)
        const currentPath = window.location.pathname;
        
        // Identificamos qué vista renderizar basándonos en el mapeo
        let targetView = this.pathToViewMap[currentPath];
        
        // Si no existe la ruta (Ej: escribieron algo mal), mandamos al inicio
        if(!targetView || !this.routes.includes(targetView)) {
            targetView = 'home';
        }
        
        this.renderView(targetView);
    },

    navigate: function(target, updateHistory = true) {
        if(!this.routes.includes(target)) return;
        
        // Convertimos el ID interno (ej. 'beauty') a su URL oficial (ej. '/estudio-manicura')
        const cleanPath = this.viewToPathMap[target] || '/';

        if(updateHistory) {
            // MAGIA: Cambia la URL visible en el navegador SIN usar "#" y SIN recargar la página
            window.history.pushState(null, null, cleanPath);
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
