/**
 * ====================================================================================
 * NÚCLEO DE NAVEGACIÓN Y SEO DINÁMICO (js/router.js)
 * ------------------------------------------------------------------------------------
 * Sincronización total con sitemap.xml, recuperación de rutas 404 de GitHub Pages
 * e inyección dinámica de metadatos (Open Graph) por categoría.
 * ====================================================================================
 */

const Router = {
    currentRoute: '',

    // 1. DICCIONARIO DE RUTAS (Espejo exacto de tu sitemap.xml)
    routes: {
        'home': '/',
        'restoration': '/catalogo-masajes',
        'beauty': '/estudio-manicura',
        'sonotherapy': '/sonoterapia',
        'science': '/ciencia-y-botanica',
        'legal': '/manifiesto-y-privacidad',
        'aura': '/aura-ai',
        'user-vault': '/boveda-paciente'
    },

    // 2. METADATOS POR CATEGORÍA (Para Google, WhatsApp, Facebook)
    seoData: {
        'home': {
            title: 'VALTARA | Executive Therapy & Biomechanics',
            desc: 'Santuario de masoterapia, biomecánica y bienestar corporativo de ultra-lujo en Paseo de la Reforma, CDMX y Tizayuca.',
            img: 'https://valtaraexecutive.com/logo.png'
        },
        'restoration': {
            title: 'Catálogo de Masajes y Biomecánica | VALTARA',
            desc: 'Protocolos de descompresión muscular, masaje deportivo y rituales Lomi Lomi diseñados para el alto rendimiento ejecutivo.',
            img: 'https://valtaraexecutive.com/gallery/r1.jpg'
        },
        'beauty': {
            title: 'Art & Nails Studio | VALTARA',
            desc: 'Estudio de estética integral. Especialistas en sistemas Rubber Base, manicura de autor y pedicura SPA con asepsia clínica.',
            img: 'https://valtaraexecutive.com/gallery/gel1.jpg'
        },
        'sonotherapy': {
            title: 'Sonoterapia Inmersiva | VALTARA',
            desc: 'Inmersión acústica y terapia de ondas alfa para disolver el Burnout corporativo y restaurar tu equilibrio neuronal.',
            img: 'https://valtaraexecutive.com/logo.png'
        },
        'science': {
            title: 'Ciencia y Biomecánica | VALTARA',
            desc: 'Conoce los fundamentos neurobiológicos, la anatomía de la fascia y la ciencia aplicada a nuestra terapia ejecutiva de precisión.',
            img: 'https://valtaraexecutive.com/logo.png'
        },
        'legal': {
            title: 'Manifiesto y Privacidad | VALTARA',
            desc: 'Transparencia corporativa, historia de la clínica, filosofía de inclusión y políticas de privacidad de Grupo Gevizz.',
            img: 'https://valtaraexecutive.com/logo.png'
        },
        'aura': {
            title: 'Aura AI - Triaje Inteligente | VALTARA',
            desc: 'Asistente de Inteligencia Artificial para diagnóstico preventivo y la personalización de tu experiencia biomecánica.',
            img: 'https://valtaraexecutive.com/logo.png'
        },
        'user-vault': {
            title: 'Mi Bóveda de Paciente | VALTARA',
            desc: 'Santuario privado de datos. Gestiona tu expediente, selecciona tu aromaterapia clínica y personaliza tu próxima sesión.',
            img: 'https://valtaraexecutive.com/logo.png'
        }
    },

    // 3. INICIALIZACIÓN DEL SISTEMA
    init: function() {
        console.log("🧭 [ROUTER] Iniciando motor de rutas y atrapando enlaces...");
        
        // RECUPERACIÓN DE ENLACES EXTERNOS (El parche del 404 de GitHub Pages)
        // Lee si el archivo 404.html dejó guardada una ruta a la que querían entrar
        const redirectedPath = sessionStorage.getItem('redirect');
        if (redirectedPath) {
            sessionStorage.removeItem('redirect');
            const cleanPath = redirectedPath.replace(window.location.origin, '');
            window.history.replaceState(null, null, cleanPath);
        }

        window.addEventListener('popstate', () => this.loadFromUrl());
        this.bindGlobalEvents();
        this.loadFromUrl();
        window.Router = this;
    },

    // 4. ESCUCHA DE BOTONES DE NAVEGACIÓN
    bindGlobalEvents: function() {
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('[data-target]');
            if (link) {
                e.preventDefault();
                this.navigate(link.getAttribute('data-target'));
            }
        });
    },

    // 5. CAMBIO DE RUTA SIN RECARGAR (SPA)
    navigate: function(id) {
        if (this.currentRoute === id) return;
        const path = this.routes[id] || '/';
        window.history.pushState({view: id}, "", path);
        this.showView(id);
    },

    // 6. LECTURA DE LA URL ACTUAL
    loadFromUrl: function() {
        let path = window.location.pathname;
        if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
        
        // Busca en el diccionario qué vista corresponde a la URL escrita
        const viewId = Object.keys(this.routes).find(key => this.routes[key] === path) || 'home';
        this.showView(viewId);
    },

    // 7. RENDERIZADO VISUAL Y CUIDADO DE LA PANTALLA
    showView: function(id) {
        // Apagar todas las secciones
        document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
        
        // Encender solo la sección objetivo
        const target = document.getElementById(`view-${id}`);
        if (target) {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Subir al tope suavemente
        }
        
        // Actualizar el SEO para esa página en específico
        this.updateMetaTags(id);
        this.currentRoute = id;

        // Cierra el menú lateral si el usuario hizo clic en un botón estando abierto
        const nav = document.getElementById('main-nav');
        if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            // Liberar el candado de scroll físico de la página
            if(window.CoreEngine && typeof window.CoreEngine.unlockBodyScroll === 'function'){
                window.CoreEngine.unlockBodyScroll();
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
        }
    },

    // 8. MOTOR DE INYECCIÓN SEO Y OPEN GRAPH
    updateMetaTags: function(id) {
        const data = this.seoData[id] || this.seoData['home'];
        
        // 1. Cambiar título de la pestaña
        document.title = data.title;
        
        // Función interna para crear o actualizar etiquetas <meta>
        const updateOrStore = (attrName, attrValue, contentValue) => {
            let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attrName, attrValue);
                document.head.appendChild(el);
            }
            el.setAttribute('content', contentValue);
        };

        // 2. SEO Clásico
        updateOrStore('name', 'description', data.desc);
        
        // 3. Open Graph (Para cuando comparten tu link en WhatsApp, Facebook, etc.)
        updateOrStore('property', 'og:title', data.title);
        updateOrStore('property', 'og:description', data.desc);
        updateOrStore('property', 'og:image', data.img);
        updateOrStore('property', 'og:url', window.location.href);
    }
};

// Arrancar al cargar la página
document.addEventListener('DOMContentLoaded', () => Router.init());
