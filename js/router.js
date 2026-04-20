/**
 * ====================================================================================
 * BLOQUE 10: ROUTER ENGINE V41.0 (SITEMAP SYNC & DINAMIC SEO)
 * ------------------------------------------------------------------------------------
 * Gestor de navegación HTML5 History API.
 * Sincronizado estrictamente con sitemap.xml.
 * INCLUYE: Actualización dinámica de Meta Tags (Open Graph) para compartir en redes.
 * ====================================================================================
 */

const Router = {
    currentRoute: '',

    // 1. SINCRONIZACIÓN ESTRICTA CON SITEMAP.XML
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

    // 2. METADATOS DINÁMICOS PARA COMPARTIR EN REDES (OPEN GRAPH)
    seoData: {
        'home': {
            title: 'VALTARA | Executive Therapy & Biomechanics',
            desc: 'Santuario de masoterapia, biomecánica y bienestar de ultra-lujo en Reforma, CDMX y Tizayuca.',
            img: 'https://valtaraexecutive.com/logo.png'
        },
        'restoration': {
            title: 'Catálogo de Masajes | VALTARA',
            desc: 'Descubre nuestros masajes neuro-adaptativos, lomi lomi y descompresión deportiva para ejecutivos.',
            img: 'https://valtaraexecutive.com/gallery/r1.jpg' // Foto de masaje
        },
        'beauty': {
            title: 'Art & Nails Estudio | VALTARA',
            desc: 'Estética integral de alta gama. Sistemas Rubber Base, Acrílico y Pedicura SPA.',
            img: 'https://valtaraexecutive.com/gallery/gel1.jpg' // Foto de uñas
        },
        'sonotherapy': {
            title: 'Sonoterapia Inmersiva | VALTARA',
            desc: 'Inmersión acústica y ondas alfa para disolver el burnout corporativo.',
            img: 'https://valtaraexecutive.com/logo.png'
        },
        'science': {
            title: 'Nuestra Ciencia | VALTARA',
            desc: 'Conoce la matriz biomecánica y los fundamentos neurobiológicos de nuestra terapia.',
            img: 'https://valtaraexecutive.com/logo.png'
        },
        'legal': {
            title: 'Manifiesto y Privacidad | VALTARA',
            desc: 'Transparencia corporativa, historia y políticas de Valtara Executive Therapy.',
            img: 'https://valtaraexecutive.com/logo.png'
        },
        'aura': {
            title: 'Aura AI | VALTARA',
            desc: 'Triaje biomecánico impulsado por Inteligencia Artificial para el paciente ejecutivo.',
            img: 'https://valtaraexecutive.com/logo.png'
        },
        'user-vault': {
            title: 'Mi Bóveda Privada | VALTARA',
            desc: 'Santuario de datos del paciente. Configura tu expediente y aromaterapia clínica.',
            img: 'https://valtaraexecutive.com/logo.png'
        }
    },

    init: function() {
        console.log("🧭 [ROUTER V41] Sincronizando coordenadas SEO y Sitemap...");
        
        // Escuchar el botón nativo de "Atrás/Adelante" del celular
        window.addEventListener('popstate', () => this.loadFromUrl());
        
        // Delegación de eventos: Escucha clics sin destruir los botones (Fija Promociones y FABs)
        this.bindLinks();
        
        // Cargar vista inicial
        this.loadFromUrl();
        
        // Exponer al objeto global
        window.Router = this;
    },

    bindLinks: function() {
        document.body.addEventListener('click', (e) => {
            // Busca si el elemento clickeado o sus padres tienen data-target
            const targetElement = e.target.closest('[data-target]');
            if (targetElement) {
                e.preventDefault();
                const viewId = targetElement.getAttribute('data-target');
                this.navigate(viewId);
            }
        });
    },

    navigate: function(id) {
        if (this.currentRoute === id) return; // Evita recargar si ya estás ahí
        
        const path = this.routes[id] || '/';
        // Cambia la URL en la barra del navegador sin recargar la página
        window.history.pushState({view: id}, "", path);
        this.showView(id);
    },

    loadFromUrl: function() {
        // Limpiamos la URL actual para que coincida con nuestro diccionario
        let path = window.location.pathname;
        if (path.length > 1 && path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        
        const pathParts = path.split('/');
        const lastPart = '/' + pathParts[pathParts.length - 1];

        // Buscar qué vista corresponde a esta URL
        let viewId = Object.keys(this.routes).find(key => this.routes[key] === lastPart || this.routes[key] === path);
        
        // Si no existe (Ej. Error 404), mándalo a casa
        if (!viewId) {
            viewId = 'home';
            window.history.replaceState({}, "", "/");
        }
        
        this.showView(viewId);
    },

    showView: function(id) {
        // 1. Apagar todas las vistas
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // 2. Encender la vista objetivo
        const targetView = document.getElementById(`view-${id}`);
        if (targetView) {
            targetView.classList.add('active');
            // Subir al tope de la página suavemente
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // 3. Apagar menú si está abierto
        const nav = document.getElementById('main-nav');
        if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            if(window.CoreEngine && typeof window.CoreEngine.unlockBodyScroll === 'function'){
                window.CoreEngine.unlockBodyScroll();
            }
        }

        // 4. Actualizar los metadatos SEO dinámicamente
        this.updateMetaTags(id);
        this.currentRoute = id;
    },

    updateMetaTags: function(id) {
        const data = this.seoData[id] || this.seoData['home'];
        
        // Actualizar Título
        document.title = data.title;
        
        // Función auxiliar para actualizar o crear Meta Tags
        const setMeta = (attrName, attrValue, content) => {
            let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attrName, attrValue);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        // Open Graph (Facebook, LinkedIn, WhatsApp)
        setMeta('property', 'og:title', data.title);
        setMeta('property', 'og:description', data.desc);
        setMeta('property', 'og:image', data.img);
        setMeta('property', 'og:url', window.location.href);
        
        // Standard SEO
        setMeta('name', 'description', data.desc);
    }
};

// AUTO-ARRANQUE
document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});
