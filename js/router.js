/**
 * ====================================================================================
 * BLOQUE 10: ROUTER ENGINE V56.0 (ENLACES LIMPIOS & SITEMAP SYNC)
 * ------------------------------------------------------------------------------------
 * Gestor de navegación HTML5 History API.
 * Sincronizado estrictamente con el sitemap.xml oficial de Valtara Executive.
 * Convierte clics internos en URLs elegantes y asegura la retención de SEO.
 * ====================================================================================
 */

const Router = {
    currentRoute: '',

    // 1. EL TRADUCTOR DE SALIDA: De ID interno a URL elegante (Sitemap Exacto)
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

    // 2. EL TRADUCTOR DE ENTRADA: De URL elegante a ID interno
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
        console.log("🧭 [ROUTER V56] Sincronizando coordenadas con Sitemap.xml...");

        // Escuchar clics en los botones de navegación
        this.bindLinks();

        // Escuchar el botón de "Atrás" / "Adelante" del navegador móvil/PC
        window.addEventListener('popstate', () => this.handleLocation());

        // Procesar la URL actual al entrar a la página
        this.handleLocation();

        // Exponer el enrutador al universo global para los botones flotantes (onclick)
        window.Router = this;
    },

    // ================================================================================
    // CAPTURA DE EVENTOS
    // ================================================================================
    bindLinks: function() {
        // Seleccionamos botones del menú lateral, tarjetas y promociones
        const navLinks = document.querySelectorAll('[data-target]');
        
        navLinks.forEach(link => {
            // Clonamos para eliminar eventos duplicados si se llama dos veces
            const newLink = link.cloneNode(true);
            if (link.parentNode) {
                link.parentNode.replaceChild(newLink, link);
            }
            
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = newLink.getAttribute('data-target');
                if(target) this.navigate(target);
            });
        });
    },

    // ================================================================================
    // LECTOR DE URL (ENTRADA DIRECTA O POPSTATE)
    // ================================================================================
    handleLocation: function() {
        // Obtener el path actual (ej. /catalogo-masajes)
        let path = window.location.pathname;
        
        // Normalizar quitando la barra final si la tiene (ej. /masajes/ -> /masajes)
        if (path.length > 1 && path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        // Si la PWA está en una subcarpeta (ej. GitHub Pages), extraemos solo el final
        const pathParts = path.split('/');
        const lastPart = '/' + pathParts[pathParts.length - 1];

        // Buscar a qué vista corresponde
        let viewId = this.rutasInversas[lastPart] || this.rutasInversas[path];

        // Escudo de emergencia: Si la URL no existe (Error 404 interno), ir al home
        if (!viewId) {
            viewId = 'home';
            // Sobrescribimos la URL fea en la barra por la raíz limpia
            window.history.replaceState({}, "", "/");
        }

        this.loadView(viewId);
    },

    // ================================================================================
    // NAVEGACIÓN ACTIVA (CLICS DEL USUARIO)
    // ================================================================================
    navigate: function(targetId) {
        // Si ya estamos en la vista, no hacer nada para ahorrar recursos
        if (this.currentRoute === targetId) {
            this.closeSidebarOnMobile();
            return;
        }

        // Encontrar la URL limpia para este destino
        const cleanPath = this.rutasLimpias[targetId] || '/';

        // Cambiar la URL en la barra del navegador SIN recargar la página
        window.history.pushState({ view: targetId }, "", cleanPath);
        
        this.loadView(targetId);
    },

    // ================================================================================
    // RETROCESO SEGURO (BOTÓN ATRÁS)
    // ================================================================================
    goBack: function() {
        if (window.history.length > 1 && window.location.pathname !== '/') {
            window.history.back();
        } else {
            // Si es la primera página que abren y le dan atrás, mandarlos al lobby
            this.navigate('home');
        }
    },

    // ================================================================================
    // MOTOR DE RENDERIZADO VISUAL
    // ================================================================================
    loadView: function(target) {
        const targetView = document.getElementById(`view-${target}`);
        
        if (!targetView) {
            console.warn(`⚠️ [ROUTER V56] Matriz visual '${target}' no encontrada. Redirigiendo a zona segura.`);
            // Si el HTML aún no carga por completo, esperamos 100ms
            setTimeout(() => this.navigate('home'), 100);
            return;
        }

        // 1. Apagar todas las vistas
        document.querySelectorAll('.view-section').forEach(view => {
            view.classList.remove('active');
            view.style.display = 'none'; // Forzado físico
        });

        // 2. Desactivar todos los botones del menú lateral
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });

        // 3. Encender la vista solicitada
        targetView.style.display = 'block';
        // Pequeño timeout para permitir que el display:block se registre antes de la opacidad
        setTimeout(() => targetView.classList.add('active'), 20);

        // 4. Resaltar el botón del menú activo
        const activeNav = document.querySelector(`.nav-item[data-target="${target}"]`);
        if (activeNav) activeNav.classList.add('active');

        // 5. Actualizar estado
        this.currentRoute = target;

        // 6. Tareas de limpieza post-navegación
        this.closeSidebarOnMobile();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 7. Feedback Sensorial (Vibración y Lectores de Pantalla)
        if (window.CoreEngine && typeof CoreEngine.triggerVibration === 'function') {
            CoreEngine.triggerVibration(10);
        }

        if (window.A11yEngine && typeof A11yEngine.announce === 'function') {
            const friendlyName = this.rutasLimpias[target] ? this.rutasLimpias[target].replace('/', '').replace(/-/g, ' ').toUpperCase() : target;
            A11yEngine.announce(`Pantalla actual: ${friendlyName}`);
        }
    },

    // ================================================================================
    // AUXILIARES
    // ================================================================================
    closeSidebarOnMobile: function() {
        const sideMenu = document.getElementById('main-nav');
        const menuBtn = document.getElementById('menu-toggle-btn');
        
        if (sideMenu && sideMenu.classList.contains('open')) {
            sideMenu.classList.remove('open');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
            
            // Liberar el candado físico si existe
            if (window.CoreEngine && typeof CoreEngine.unlockBodyScroll === 'function') {
                CoreEngine.unlockBodyScroll();
            } else {
                document.body.style.overflow = '';
            }
        }
    }
};

// ====================================================================================
// AUTO-ARRANQUE
// ====================================================================================
document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});
