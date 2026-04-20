import { ConstructorMaestro } from './constructor_maestro.js';

export const Router = {
    // Mapa de rutas oficial sincronizado con sitemap.xml
    rutas: {
        '/': 'view-home',
        '/catalogo-masajes': 'view-catalogo-masajes',
        '/estudio-manicura': 'view-estudio-manicura',
        '/sonoterapia': 'view-sonoterapia',
        '/ciencia-y-botanica': 'view-ciencia',
        '/legal': 'view-legal',
        '/aura-ia': 'view-aura',
        '/expediente': 'view-expediente'
    },

    init: function() {
        // 1. Escuchar clics globales para delegación de eventos
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-target]');
            if (target) {
                e.preventDefault();
                const ruta = target.getAttribute('href') || `/${target.getAttribute('data-target').replace('view-', '')}`;
                this.navegar(ruta);
            }
        });

        // 2. Manejar botones físicos/virtuales de retroceso (Popstate)
        window.addEventListener('popstate', (e) => {
            this.renderizarVista(window.location.pathname, false);
        });

        // 3. Carga inicial al refrescar
        this.renderizarVista(window.location.pathname, true);
    },

    navegar: function(path) {
        if (window.location.pathname === path) return;
        
        // Actualizar URL sin recargar
        window.history.pushState({ path }, '', path);
        this.renderizarVista(path);
    },

    renderizarVista: function(path, scrollUp = true) {
        // Fallback para 404 o raíz
        const vistaId = this.rutas[path] || 'view-home';
        
        // 1. Gestionar clases de visibilidad
        const secciones = document.querySelectorAll('.view-section');
        secciones.forEach(s => s.classList.remove('active'));

        const seccionActiva = document.getElementById(vistaId);
        if (seccionActiva) {
            seccionActiva.classList.add('active');
            
            // 2. Llamar al Constructor para inyectar los módulos JS
            ConstructorMaestro.construir(vistaId);

            // 3. Manejo de scroll y UI
            if (scrollUp) window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // 4. Bloqueo de scroll para modos Fullscreen (Aura/Expediente)
            if (seccionActiva.classList.contains('fullscreen-mode')) {
                document.body.classList.add('scroll-locked');
            } else {
                document.body.classList.remove('scroll-locked');
            }
        }

        // Actualizar estado del menú
        this.actualizarMenu(vistaId);
    },

    actualizarMenu: function(vistaId) {
        const links = document.querySelectorAll('.nav-item');
        links.forEach(l => {
            l.classList.toggle('active', l.getAttribute('data-target') === vistaId);
        });
    }
};

// Iniciar sistema
document.addEventListener('DOMContentLoaded', () => Router.init());
