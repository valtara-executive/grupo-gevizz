/**
 * ====================================================================================
 * NÚCLEO DE NAVEGACIÓN Y SEO DINÁMICO — router.js V40.0
 * ------------------------------------------------------------------------------------
 * Correcciones V40.0:
 * - showView() llama a window._syncBnav() para sincronizar la barra inferior
 * - vault-user-name se actualiza al navegar a la bóveda del paciente
 * - unlockBodyScroll usa CoreEngine si está disponible (ya no falla en V40.0)
 * ====================================================================================
 */

const Router = {
    currentRoute: '',

    // 1. DICCIONARIO DE RUTAS — espejo exacto de sitemap.xml
    routes: {
        'home':       '/',
        'restoration':'/catalogo-masajes',
        'beauty':     '/estudio-manicura',
        'sonotherapy':'/sonoterapia',
        'science':    '/ciencia-y-botanica',
        'legal':      '/manifiesto-y-privacidad',
        'aura':       '/aura-ai',
        'user-vault': '/boveda-paciente'
    },

    // 2. METADATOS POR SECCIÓN — para Google, WhatsApp, Facebook
    seoData: {
        'home': {
            title: 'VALTARA | Executive Therapy & Biomechanics',
            desc:  'Santuario de masoterapia, biomecánica y bienestar corporativo de ultra-lujo en Paseo de la Reforma, CDMX y Tizayuca.',
            img:   'https://valtaraexecutive.com/logo.png'
        },
        'restoration': {
            title: 'Catálogo de Masajes y Biomecánica | VALTARA',
            desc:  'Protocolos de descompresión muscular, masaje deportivo y rituales Lomi Lomi diseñados para el alto rendimiento ejecutivo.',
            img:   'https://valtaraexecutive.com/gallery/r1.jpg'
        },
        'beauty': {
            title: 'Art & Nails Studio | VALTARA',
            desc:  'Estudio de estética integral. Especialistas en sistemas Rubber Base, manicura de autor y pedicura SPA con asepsia clínica.',
            img:   'https://valtaraexecutive.com/gallery/gel1.jpg'
        },
        'sonotherapy': {
            title: 'Sonoterapia Inmersiva | VALTARA',
            desc:  'Inmersión acústica y terapia de ondas alfa para disolver el Burnout corporativo y restaurar tu equilibrio neuronal.',
            img:   'https://valtaraexecutive.com/logo.png'
        },
        'science': {
            title: 'Ciencia y Biomecánica | VALTARA',
            desc:  'Conoce los fundamentos neurobiológicos, la anatomía de la fascia y la ciencia aplicada a nuestra terapia ejecutiva de precisión.',
            img:   'https://valtaraexecutive.com/logo.png'
        },
        'legal': {
            title: 'Manifiesto y Privacidad | VALTARA',
            desc:  'Transparencia corporativa, historia de la clínica, filosofía de inclusión y políticas de privacidad de Grupo Gevizz.',
            img:   'https://valtaraexecutive.com/logo.png'
        },
        'aura': {
            title: 'Aura AI — Triaje Inteligente | VALTARA',
            desc:  'Asistente de Inteligencia Artificial para diagnóstico preventivo y la personalización de tu experiencia biomecánica.',
            img:   'https://valtaraexecutive.com/logo.png'
        },
        'user-vault': {
            title: 'Mi Bóveda de Paciente | VALTARA',
            desc:  'Santuario privado de datos. Gestiona tu expediente, aromaterapia clínica y personaliza tu próxima sesión.',
            img:   'https://valtaraexecutive.com/logo.png'
        }
    },

    // 3. INICIALIZACIÓN
    init: function() {
        console.log('🧭 [ROUTER V40.0] Iniciando motor de rutas...');

        // Recuperar ruta guardada por 404.html
        let redirectedPath = null;
        try { redirectedPath = sessionStorage.getItem('redirect'); } catch(e) {}
        if (redirectedPath) {
            try { sessionStorage.removeItem('redirect'); } catch(e) {}
            const cleanPath = redirectedPath.replace(window.location.origin, '');
            window.history.replaceState(null, null, cleanPath);
        }

        window.addEventListener('popstate', () => this.loadFromUrl());
        this.bindGlobalEvents();
        this.loadFromUrl();
        window.Router = this;
    },

    // 4. ESCUCHA DE BOTONES CON data-target
    bindGlobalEvents: function() {
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('[data-target]');
            if (link) {
                e.preventDefault();
                this.navigate(link.getAttribute('data-target'));
            }
        });
    },

    // 5. CAMBIO DE RUTA (SPA — sin recargar)
    navigate: function(id) {
        if (this.currentRoute === id) return;
        const path = this.routes[id] || '/';
        window.history.pushState({ view: id }, '', path);
        this.showView(id);
    },

    // 6. LEER URL ACTUAL Y MOSTRAR LA VISTA CORRESPONDIENTE
    loadFromUrl: function() {
        let path = window.location.pathname;
        if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
        const viewId = Object.keys(this.routes).find(key => this.routes[key] === path) || 'home';
        this.showView(viewId);
    },

    // 7. RENDERIZADO DE VISTA
    showView: function(id) {
        // Apagar todas las secciones
        document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));

        // Encender la sección objetivo
        const target = document.getElementById(`view-${id}`);
        if (target) {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Actualizar SEO
        this.updateMetaTags(id);
        this.currentRoute = id;

        // Sincronizar la barra de navegación inferior
        if (typeof window._syncBnav === 'function') {
            window._syncBnav(id);
        }

        // Si se navega a la bóveda del paciente, mostrar el nombre del usuario
        if (id === 'user-vault') {
            const vaultName = document.getElementById('vault-user-name');
            if (vaultName) {
                let nombre = 'Paciente';
                try { nombre = localStorage.getItem('valtara_user_name') || 'Paciente'; } catch(e) {}
                vaultName.textContent = nombre;
            }
        }

        // Cerrar el menú lateral si estaba abierto y liberar scroll
        const nav = document.getElementById('main-nav');
        if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            const menuBtn = document.getElementById('menu-toggle-btn');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
            nav.setAttribute('aria-hidden', 'true');

            if (window.CoreEngine && typeof window.CoreEngine.unlockBodyScroll === 'function') {
                window.CoreEngine.unlockBodyScroll();
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.documentElement.style.overflow = '';
            }
        }

        // Anunciar cambio de vista a lectores de pantalla
        if (window.A11yEngine) {
            const seo = this.seoData[id] || this.seoData['home'];
            A11yEngine.announce(`Vista activa: ${seo.title}`);
        }
    },

    // 8. MOTOR DE SEO Y OPEN GRAPH DINÁMICO
    updateMetaTags: function(id) {
        const data = this.seoData[id] || this.seoData['home'];

        document.title = data.title;

        const updateOrStore = (attrName, attrValue, contentValue) => {
            let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attrName, attrValue);
                document.head.appendChild(el);
            }
            el.setAttribute('content', contentValue);
        };

        updateOrStore('name',     'description',    data.desc);
        updateOrStore('property', 'og:title',       data.title);
        updateOrStore('property', 'og:description', data.desc);
        updateOrStore('property', 'og:image',       data.img);
        updateOrStore('property', 'og:url',         window.location.href);
    }
};

document.addEventListener('DOMContentLoaded', () => Router.init());
