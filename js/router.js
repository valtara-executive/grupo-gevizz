/**
 * ====================================================================================
 * BLOQUE 10: ROUTER ENGINE V51.0 (ENLACES LIMPIOS & ANTI-COLAPSO)
 * ------------------------------------------------------------------------------------
 * Gestor de navegación HTML5 History API (Clean URLs).
 * Convierte rutas internas en URLs elegantes (ej. /masajes, /ciencia) y asegura
 * que ninguna pantalla se quede "en blanco" al recargar.
 * ====================================================================================
 */

const Router = {
    currentRoute: '',

    // El Traductor de Lujo: Mapea el ID de tu HTML a la URL elegante que quieres ver
    rutasLimpias: {
        'home': '/inicio',
        'restoration': '/masajes',
        'beauty': '/belleza',
        'sonotherapy': '/sonoterapia',
        'science': '/ciencia',
        'legal': '/manifiesto',
        'aura': '/aura-ai',
        'user-vault': '/boveda'
    },

    // El Traductor Inverso: Si alguien entra a /masajes, el sistema sabe que es 'restoration'
    rutasInversas: {
        '/': 'home',
        '/inicio': 'home',
        '/masajes': 'restoration',
        '/belleza': 'beauty',
        '/sonoterapia': 'sonotherapy',
        '/ciencia': 'science',
        '/manifiesto': 'legal',
        '/aura-ai': 'aura',
        '/boveda': 'user-vault'
    },

    init: function() {
        console.log("🧭 [ROUTER V51] Trazando coordenadas de enlaces limpios...");

        this.bindLinks();

        // Escuchar cuando el usuario presiona "Atrás" o "Adelante" en su celular
        window.addEventListener('popstate', () => this.handleLocation());

        // Forzar el renderizado inicial seguro (Anti-Pantalla en Blanco)
        setTimeout(() => { this.handleLocation(); }, 200);

        window.Router = this;
    },

    bindLinks: function() {
        const navLinks = document.querySelectorAll('[data-target]');
        
        navLinks.forEach(link => {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = newLink.getAttribute('data-target');
                this.navigate(target);
            });
        });
    },

    handleLocation: function() {
        // Obtenemos la URL actual limpia (ej. /masajes)
        let path = window.location.pathname;
        
        // Quitar la barra final si existe, por estética
        if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);

        // Si estamos en Github Pages, el path incluye el nombre del repo. Extraemos la última parte.
        const pathParts = path.split('/');
        const lastPart = '/' + pathParts[pathParts.length - 1];

        // Buscar qué ID de vista le corresponde a esta URL
        let viewId = this.rutasInversas[lastPart] || this.rutasInversas[path];

        // Fallback blindado: Si la URL no existe, vete a inicio.
        if (!viewId) viewId = 'home';

        this.loadView(viewId);
    },

    navigate: function(targetId) {
        // Traducimos el ID (ej. restoration) a la URL limpia (ej. /masajes)
        const cleanPath = this.rutasLimpias[targetId] || '/' + targetId;

        // Cambiamos la URL arriba sin recargar la página
        window.history.pushState({}, "", cleanPath);
        
        this.loadView(targetId);
    },

    goBack: function() {
        if (window.history.length > 1 && window.location.pathname !== '/' && window.location.pathname !== '/inicio') {
            window.history.back();
        } else {
            this.navigate('home');
        }
    },

    loadView: function(target) {
        const targetView = document.getElementById(`view-${target}`);
        
        // ESCUDO ANTI-BLANCO: Si no encontramos la vista en el HTML, reintentar en 100ms.
        // Esto salva la página si el router fue más rápido que el constructor de inyectar el HTML.
        if (!targetView) {
            console.warn(`⚠️ [ROUTER] Vista '${target}' no encontrada. Reintentando...`);
            setTimeout(() => this.loadView('home'), 100);
            return;
        }

        // Apagar todas las vistas (Quitar clase active)
        document.querySelectorAll('.view-section').forEach(view => {
            view.classList.remove('active');
            view.style.display = 'none'; // Seguro por doble vía
        });

        // Desactivar botones del menú
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });

        // Encender la vista solicitada (Esto hace que aparezcan las letras)
        targetView.style.display = 'block';
        setTimeout(() => targetView.classList.add('active'), 10);

        const activeNav = document.querySelector(`.nav-item[data-target="${target}"]`);
        if (activeNav) activeNav.classList.add('active');

        this.currentRoute = target;
        this.closeSidebarOnMobile();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (window.CoreEngine && typeof CoreEngine.triggerVibration === 'function') {
            CoreEngine.triggerVibration(10);
        }

        if (window.A11yEngine && typeof A11yEngine.announce === 'function') {
            const cleanName = this.rutasLimpias[target] ? this.rutasLimpias[target].replace('/', '').toUpperCase() : target;
            A11yEngine.announce(`Pantalla actual: ${cleanName}`);
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

document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});
