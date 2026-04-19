/**
 * ====================================================================================
 * BLOQUE 6: MOTOR DE ENRUTAMIENTO SOBERANO V42.0 (SPA & SMART BREADCRUMBS)
 * Control de vistas dedicadas, historial de navegación interno y gatillo visual.
 * Diseñado para Valtara Executive Therapy.
 * ====================================================================================
 */

const Router = {
    // 1. REGISTRO MAESTRO DE VISTAS (El ecosistema completo)
    // Si una vista no está aquí, el router la bloquea por seguridad.
    routes: [
        'home', 
        'restoration', 
        'beauty', 
        'sonotherapy', 
        'science', 
        'legal', 
        'aura',         // NUEVO: Vista dedicada de IA
        'user-vault'    // NUEVO: Bóveda del paciente
    ],
    
    // 2. MEMORIA DE NAVEGACIÓN (Para la flecha de "Volver")
    historyStack: [],
    currentRoute: 'home',

    // 3. MAPEO SEO BIDIRECCIONAL (URL Limpia <-> ID Interno)
    // Permite que Google indexe páginas completas aunque sea una SPA.
    pathToViewMap: {
        '/': 'home',
        '/catalogo-masajes': 'restoration',
        '/estudio-manicura': 'beauty',
        '/sonoterapia': 'sonotherapy',
        '/ciencia-y-botanica': 'science',
        '/politicas': 'legal',
        '/aura-ai-triaje': 'aura',
        '/boveda-paciente': 'user-vault',
        
        // Redirecciones SEO históricas (Antiguos links guardados)
        '/masaje-deportivo-reforma': 'restoration',
        '/liberacion-miofascial-cdmx': 'restoration',
        '/terapia-biomecanica-ejecutiva': 'restoration',
        '/art-and-nails-estudio': 'beauty',
        '/ciencia-neurobiologia-del-dolor': 'science'
    },

    // Invertimos el mapa para generar URLs limpias al navegar
    viewToPathMap: {},

    // ====================================================================================
    // INICIALIZACIÓN DEL NÚCLEO
    // ====================================================================================
    init: function() {
        console.log("[VALTARA ROUTER V42] Iniciando Enrutador Soberano...");

        // Construir mapa inverso (ID Interno -> URL)
        for (const [path, view] of Object.entries(this.pathToViewMap)) {
            if (!this.viewToPathMap[view] || path.length < this.viewToPathMap[view].length) {
                this.viewToPathMap[view] = path; 
            }
        }

        // Interceptar clics en todos los botones de navegación
        document.body.addEventListener('click', (e) => {
            const navBtn = e.target.closest('[data-target]');
            if (navBtn) {
                e.preventDefault();
                const targetView = navBtn.getAttribute('data-target');
                this.navigate(targetView);
            }
        });

        // Escuchar el botón "Atrás" del navegador del teléfono/PC
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.view) {
                this.navigate(e.state.view, true, true);
            } else {
                this.navigateFromURL(true);
            }
        });

        // Primera carga: Leer la URL y abrir la sección correcta
        this.navigateFromURL(false);
    },

    // ====================================================================================
    // LÓGICA DE NAVEGACIÓN (LA MAGIA DE TRANSICIÓN)
    // ====================================================================================
    navigate: function(viewId, isBackAction = false, isPopState = false) {
        // Validación de seguridad
        if (!this.routes.includes(viewId)) {
            console.error(`[ROUTER] Intento de acceso a ruta fantasma: ${viewId}. Redirigiendo a home.`);
            viewId = 'home';
        }

        // Evitar recargar la misma vista
        if (this.currentRoute === viewId && this.historyStack.length > 0) return;

        console.log(`[ROUTER] Transicionando hacia: ${viewId}`);

        // 1. GESTIÓN DEL HISTORIAL (MIGAJAS DE PAN)
        if (!isBackAction && this.currentRoute !== viewId) {
            // Guardamos dónde estábamos antes de ir a la nueva vista
            this.historyStack.push(this.currentRoute);
        }
        this.currentRoute = viewId;

        // 2. ACTUALIZACIÓN DE LA URL (Sin recargar la página)
        if (!isPopState) {
            const newPath = this.viewToPathMap[viewId] || '/';
            history.pushState({ view: viewId }, '', newPath);
        }

        // 3. APAGADO DE TODAS LAS VISTAS
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
            section.style.display = 'none';
        });

        // 4. ENCENDIDO DE LA VISTA OBJETIVO Y GATILLO VISUAL
        const activeSection = document.getElementById(`view-${viewId}`);
        if (activeSection) {
            activeSection.style.display = 'block';
            
            // FORZADO DE RENDERIZADO (El antídoto para el bug de Android)
            // Obliga al navegador a repintar el DOM, asegurando que el CSS :has() 
            // cambie los colores del fondo (Pirámides, Sol, Esferas).
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    activeSection.classList.add('active');
                    activeSection.style.opacity = '1';
                    
                    // Inyección de estado en el body por seguridad
                    document.body.setAttribute('data-vista-activa', viewId);
                });
            });

            // 5. ACCESIBILIDAD Y EXPERIENCIA
            if (window.A11yEngine) {
                A11yEngine.announce(`Pantalla cambiada a: ${activeSection.getAttribute('aria-label')}`);
            }
            
            this.updateMenuHighlight(viewId);
            this.closeSidebarOnMobile();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // 6. TRIGGERS ESPECÍFICOS POR SECCIÓN
            if (viewId === 'sonotherapy' && window.AuraEngine) {
                setTimeout(() => {
                    AuraEngine.appendMsg("Para una inmersión biomecánica total en la sala de acústica, recomiendo el uso de auriculares de alta fidelidad con cancelación de ruido.", "bot");
                }, 1500);
            }
            if (viewId === 'aura' && window.AuraEngine) {
                setTimeout(() => {
                    document.getElementById('aura-input').focus();
                }, 800);
            }
        }
    },

    // ====================================================================================
    // EL BOTÓN "VOLVER" (SISTEMA DE RETORNO INTELIGENTE)
    // ====================================================================================
    goBack: function() {
        if (this.historyStack.length > 0) {
            // Sacamos la última vista visitada
            const previousView = this.historyStack.pop();
            console.log(`[ROUTER] Retornando a la vista anterior: ${previousView}`);
            // Navegamos hacia ella marcándola como acción de retorno para no crear un loop
            this.navigate(previousView, true);
        } else {
            // Si no hay historial (ej. entró directo a Aura por un link), lo mandamos a Home
            console.log(`[ROUTER] No hay historial. Retornando al santuario principal.`);
            this.navigate('home', true);
        }
    },

    // ====================================================================================
    // UTILIDADES DEL ENRUTADOR
    // ====================================================================================
    navigateFromURL: function(isPopState = false) {
        const currentPath = window.location.pathname;
        const viewId = this.pathToViewMap[currentPath] || 'home';
        this.navigate(viewId, false, isPopState);
    },

    updateMenuHighlight: function(viewId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('data-target') === viewId) {
                item.classList.add('active');
            }
        });
    },

    closeSidebarOnMobile: function() {
        const sideMenu = document.getElementById('main-nav');
        if (sideMenu && sideMenu.classList.contains('open')) {
            sideMenu.classList.remove('open');
        }
    }
};

// Arrancar el motor en cuanto el DOM esté listo
window.addEventListener('DOMContentLoaded', () => Router.init());
