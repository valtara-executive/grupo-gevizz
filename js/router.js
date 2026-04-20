/**
 * ====================================================================================
 * NÚCLEO DE NAVEGACIÓN Y SEO DINÁMICO (rr.js)
 * ====================================================================================
 */

const Router = {
    currentRoute: '',

    // 1. DICCIONARIO DE RUTAS
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

    // 2. METADATOS DE ULTRA-LUJO
    seoData: {
        'home': { title: 'VALTARA | Executive Therapy', desc: 'Santuario de restauración biomecánica.', img: 'https://valtaraexecutive.com/logo.png' },
        'restoration': { title: 'Masoterapia Clínica | VALTARA', desc: 'Protocolos de descompresión muscular para ejecutivos.', img: 'https://valtaraexecutive.com/gallery/r1.jpg' },
        'beauty': { title: 'Art & Nails Studio | VALTARA', desc: 'Sistemas Rubber Base y pedicura SPA.', img: 'https://valtaraexecutive.com/gallery/gel1.jpg' },
        'sonotherapy': { title: 'Sonoterapia Acústica | VALTARA', desc: 'Terapia de frecuencias para disolver el Burnout.', img: 'https://valtaraexecutive.com/logo.png' },
        'science': { title: 'Matriz Biomecánica | VALTARA', desc: 'Fundamentos neurobiológicos de nuestra terapia.', img: 'https://valtaraexecutive.com/logo.png' },
        'legal': { title: 'Transparencia Corporativa | VALTARA', desc: 'Términos de servicio y el manifiesto ético.', img: 'https://valtaraexecutive.com/logo.png' },
        'aura': { title: 'Aura AI | VALTARA', desc: 'Asistente inteligente para triaje clínico.', img: 'https://valtaraexecutive.com/logo.png' },
        'user-vault': { title: 'Mi Bóveda de Paciente | VALTARA', desc: 'Acceso seguro a tu expediente clínico digital.', img: 'https://valtaraexecutive.com/logo.png' }
    },

    init: function() {
        // RECUPERACIÓN DE RUTA FANTASMA (El parche del 404)
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

    bindGlobalEvents: function() {
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('[data-target]');
            if (link) {
                e.preventDefault();
                this.navigate(link.getAttribute('data-target'));
            }
        });
    },

    navigate: function(id) {
        if (this.currentRoute === id) return;
        const path = this.routes[id] || '/';
        window.history.pushState({view: id}, "", path);
        this.showView(id);
    },

    loadFromUrl: function() {
        let path = window.location.pathname;
        if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
        const viewId = Object.keys(this.routes).find(key => this.routes[key] === path) || 'home';
        this.showView(viewId);
    },

    showView: function(id) {
        document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`view-${id}`);
        if (target) {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        this.updateMetaTags(id);
        this.currentRoute = id;

        // Cierra el menú lateral si está abierto
        const nav = document.getElementById('main-nav');
        if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            if(window.CoreEngine && typeof window.CoreEngine.unlockBodyScroll === 'function') {
                window.CoreEngine.unlockBodyScroll();
            }
        }
    },

    updateMetaTags: function(id) {
        const data = this.seoData[id] || this.seoData['home'];
        document.title = data.title;
        
        const updateOrStore = (attr, val, content) => {
            let el = document.querySelector(`meta[${attr}="${val}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, val);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        updateOrStore('name', 'description', data.desc);
        updateOrStore('property', 'og:title', data.title);
        updateOrStore('property', 'og:description', data.desc);
        updateOrStore('property', 'og:image', data.img);
        updateOrStore('property', 'og:url', window.location.href);
    }
};

document.addEventListener('DOMContentLoaded', () => Router.init());
