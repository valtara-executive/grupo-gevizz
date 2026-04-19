/**
 * ====================================================================================
 * BLOQUE 10: ROUTER ENGINE V58.0 (SITEMAP SYNC & EVENT DELEGATION)
 * ------------------------------------------------------------------------------------
 * Gestor de navegación HTML5 History API.
 * 1. Rutas exactas basadas en sitemap.xml.
 * 2. Delegación de eventos: Resucita los botones de WhatsApp y Aura flotantes.
 * ====================================================================================
 */

const Router = {
    currentRoute: '',

    // MAPA DE RUTAS (Sincronizado estrictamente con tu sitemap.xml)
    rutasLimpias: {
        'home': '/',
        'restoration': '/catalogo-masajes',
        'beauty': '/estudio-manicura',
        'sonotherapy': '/sonoterapia',
        'science': '/ciencia-y-botanica',
        'legal': '/manifiesto-y-privacidad',
        'aura': '/aura-ai',
        'user-vault': '/boveda-paciente'
    },

    rutasInversas: {
        '/': 'home',
        '/index.html': 'home',
        '/catalogo-masajes': 'restoration',
        '/estudio-manicura': 'beauty',
        '/sonoterapia': 'sonotherapy',
        '/ciencia-y-botanica': 'science',
        '/manifiesto-y-privacidad': 'legal',
        '/aura-ai': 'aura',
        '/boveda-paciente': 'user-vault'
    },

    init: function() {
        console.log("🧭 [ROUTER V58] Sincronizando coordenadas y activando Delegación de Eventos...");

        // 1. Activar la escucha de clics en toda la pantalla (Revive los botones)
        this.bindGlobalLinks();

        // 2. Escuchar botones nativos del celular (Atrás/Adelante)
        window.addEventListener('popstate', () => this.handleLocation());

        // 3. Procesar la URL al cargar la página
        this.handleLocation();

        // 4. Exponer al universo global
        window.Router = this;
    },

    // ================================================================================
    // DELEGACIÓN DE EVENTOS (LA MAGIA QUE REVIVE LOS BOTONES)
    // ================================================================================
    bindGlobalLinks: function() {
        // En lugar de tocar los botones, escuchamos el cuerpo entero de la página.
        // Si el clic viene de un elemento con data-target, lo interceptamos.
        document.body.addEventListener('click', (e) => {
            // Busca si lo que tocaste (o su contenedor) tiene el atributo data-target
            const link = e.target.closest('[data-target]');
            
            if (link) {
                // Previene que el navegador haga un salto brusco
                e.preventDefault();
                
                const target = link.getAttribute('data-target');
                if(target) this.navigate(target);
            }
        });
    },

    // ================================================================================
    // LECTOR DE URL Y NAVEGACIÓN
    // ================================================================================
    handleLocation: function() {
        let path = window.location.pathname;
        if (path.length > 1 && path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        const pathParts = path.split('/');
        const lastPart = '/' + pathParts[pathParts.length - 1];

        let viewId = this.rutasInversas[lastPart] || this.rutasInversas[path];

        if (!viewId) {
            viewId = 'home';
            window.history.replaceState({}, "", "/");
        }

        this.loadView(viewId);
    },

    navigate: function(targetId) {
        if (this.currentRoute === targetId) {
            this.closeSidebarOnMobile();
            return;
        }

        const cleanPath = this.rutasLimpias[targetId] || '/';
        window.history.pushState({ view: targetId }, "", cleanPath);
        
        this.loadView(targetId);
    },

    goBack: function() {
        if (window.history.length > 1 && window.location.pathname !== '/') {
            window.history.back();
        } else {
            this.navigate('home');
        }
    },

    // ================================================================================
    // MOTOR VISUAL DE TRANSICIÓN
    // ================================================================================
    loadView: function(target) {
        const targetView = document.getElementById(`view-${target}`);
        
        if (!targetView) {
            setTimeout(() => this.navigate('home'), 100);
            return;
        }

        // Apagar todas las vistas
        document.querySelectorAll('.view-section').forEach(view => {
            view.classList.remove('active');
            view.style.display = 'none';
        });

        // Desactivar botones del menú
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });

        // Encender la vista solicitada
        targetView.style.display = 'block';
        setTimeout(() => targetView.classList.add('active'), 20);

        // Resaltar botón del menú
        const activeNav = document.querySelector(`.nav-item[data-target="${target}"]`);
        if (activeNav) activeNav.classList.add('active');

        this.currentRoute = target;
        this.closeSidebarOnMobile();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (window.CoreEngine && typeof CoreEngine.triggerVibration === 'function') {
            CoreEngine.triggerVibration(10);
        }

        if (window.A11yEngine && typeof A11yEngine.announce === 'function') {
            const friendlyName = this.rutasLimpias[target] ? this.rutasLimpias[target].replace('/', '').replace(/-/g, ' ').toUpperCase() : target;
            A11yEngine.announce(`Pantalla actual: ${friendlyName}`);
        }
    },

    closeSidebarOnMobile: function() {
        const sideMenu = document.getElementById('main-nav');
        const menuBtn = document.getElementById('menu-toggle-btn');
        
        if (sideMenu && sideMenu.classList.contains('open')) {
            sideMenu.classList.remove('open');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
            
            if (window.CoreEngine && typeof CoreEngine.unlockBodyScroll === 'function') {
                CoreEngine.unlockBodyScroll();
            } else {
                document.body.style.overflow = '';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => { Router.init(); });
