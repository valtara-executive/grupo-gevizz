/**
 * ====================================================================================
 * BLOQUE 10: ROUTER ENGINE V47.0 (ENRUTADOR SOBERANO SPA)
 * ------------------------------------------------------------------------------------
 * Gestor de navegación de Estado Único (Single Page Application).
 * Controla el historial del navegador, el botón "Atrás", el cierre automático 
 * de menús y la inyección de la clase .active para aislar pantallas.
 * ====================================================================================
 */

const Router = {
    // La pantalla que carga por defecto si no hay ninguna especificada
    defaultRoute: 'home',
    currentRoute: '',

    init: function() {
        console.log("🧭 [ROUTER V47] Trazando coordenadas de navegación...");

        // 1. Escuchar los botones con el atributo data-target (Ej. Menú Lateral)
        this.bindLinks();

        // 2. Escuchar los botones de "Atrás" / "Adelante" del celular o navegador
        window.addEventListener('hashchange', () => this.handleHashChange());

        // 3. Cargar la vista inicial basada en la URL (o mandar al home)
        this.handleHashChange();

        // 4. EXPOSICIÓN GLOBAL (CRÍTICO)
        // Permite que los botones con onclick="Router.navigate('X')" en el HTML funcionen
        window.Router = this;
    },

    // ================================================================================
    // CAPTURA DE EVENTOS Y VÍNCULOS
    // ================================================================================
    bindLinks: function() {
        // Seleccionamos todos los elementos que tengan data-target="algo"
        const navLinks = document.querySelectorAll('[data-target]');
        
        navLinks.forEach(link => {
            // Evitamos duplicar eventos si la función bindLinks se llama dos veces
            link.replaceWith(link.cloneNode(true));
        });

        // Volvemos a seleccionar tras clonar para limpiarlos
        const freshNavLinks = document.querySelectorAll('[data-target]');
        freshNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-target');
                this.navigate(target);
            });
        });
    },

    // ================================================================================
    // CONTROLADOR DE HISTORIAL (HASH CHANGE)
    // ================================================================================
    handleHashChange: function() {
        let hash = window.location.hash.replace('#', '');
        
        // Si no hay hash, o si alguien escribe una ruta inválida, nos vamos al inicio
        if (!hash) {
            hash = this.defaultRoute;
            // No cambiamos el hash aquí para mantener la URL limpia en el inicio
        }
        
        this.loadView(hash);
    },

    // ================================================================================
    // FUNCIONES PÚBLICAS DE NAVEGACIÓN
    // ================================================================================
    navigate: function(target) {
        // Al cambiar el hash de la ventana, se dispara automáticamente "handleHashChange"
        window.location.hash = target;
    },

    goBack: function() {
        // Si hay historial previo en la sesión, usamos la función nativa del teléfono
        if (window.history.length > 1 && window.location.hash !== '') {
            window.history.back();
        } else {
            // Si entraron directo a un link profundo, los mandamos al inicio por seguridad
            this.navigate(this.defaultRoute);
        }
    },

    // ================================================================================
    // MOTOR DE RENDERIZADO VISUAL
    // ================================================================================
    loadView: function(target) {
        const targetView = document.getElementById(`view-${target}`);
        
        // 1. Escudo Anti-Caídas: Si la vista no existe, vuelve al inicio
        if (!targetView) {
            console.warn(`⚠️ [ROUTER V47] La ruta '${target}' no existe en la matriz. Redirigiendo a Home.`);
            if (this.currentRoute !== this.defaultRoute) {
                this.navigate(this.defaultRoute);
            }
            return;
        }

        // 2. Apagar todas las vistas
        document.querySelectorAll('.view-section').forEach(view => {
            view.classList.remove('active');
        });

        // 3. Desactivar el resaltado de todos los botones del menú
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });

        // 4. Encender la vista solicitada (Dispara la animación CSS de entrada)
        targetView.classList.add('active');

        // 5. Resaltar el botón del menú correspondiente
        const activeNav = document.querySelector(`.nav-item[data-target="${target}"]`);
        if (activeNav) activeNav.classList.add('active');

        // 6. Actualizar el estado interno
        this.currentRoute = target;

        // 7. CERRAR EL MENÚ LATERAL AUTOMÁTICAMENTE
        this.closeSidebarOnMobile();

        // 8. SCROLL AL TOPE: Evita que la nueva página empiece a la mitad
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 9. FEEDBACK SENSORIAL (Si el motor está conectado)
        if (window.CoreEngine && typeof CoreEngine.triggerVibration === 'function') {
            CoreEngine.triggerVibration(10); // Sutil confirmación táctil de cambio de página
        }

        // 10. ACCESIBILIDAD (Para lectores de pantalla en modo invidentes)
        if (window.A11yEngine && typeof A11yEngine.announce === 'function') {
            // Anunciamos a los motores de voz que la vista cambió
            const formattedName = target.replace('-', ' ').toUpperCase();
            A11yEngine.announce(`Pantalla actual: ${formattedName}`);
        }
    },

    // ================================================================================
    // FUNCIONES AUXILIARES
    // ================================================================================
    closeSidebarOnMobile: function() {
        const sideMenu = document.getElementById('main-nav');
        const menuBtn = document.getElementById('menu-toggle-btn');
        
        if (sideMenu && sideMenu.classList.contains('open')) {
            sideMenu.classList.remove('open');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
            
            // Retirar el bloqueo de scroll temporal si el modal fixer estaba inactivo
            document.body.style.overflow = '';
        }
    }
};

// ====================================================================================
// INICIALIZACIÓN
// ====================================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Pequeño timeout para garantizar que los módulos de HTML se hayan inyectado
    setTimeout(() => {
        Router.init();
    }, 150);
});
