/**
 * ====================================================================================
 * BLOQUE 7: CORE SYSTEM (SISTEMA OPERATIVO)
 * Director de Orquesta: Inyecta los datos de data.js en el HTML y controla la UI.
 * ====================================================================================
 */

const CoreEngine = {
    init: function() {
        this.injectData();
        this.initModals();
        this.initSideMenu();
        this.initBodyMap();
        
        // Retiramos la clase de carga inicial para mostrar la web
        document.body.classList.remove('system-loading');
        
        // Anunciador para ciegos:
        if(window.A11yEngine) {
            A11yEngine.announce("Sistema Operativo Sovereign iniciado. Contenido cargado correctamente.");
        }
    },

    // 1. INYECCIÓN DE DATOS (RENDERIZADO)
    injectData: function() {
        if(window.ValtaraData) {
            // Tomamos el HTML vacío y lo rellenamos a la velocidad de la luz
            document.getElementById('view-home').innerHTML = ValtaraData.home;
            document.getElementById('view-restoration').innerHTML = ValtaraData.restoration;
            document.getElementById('view-codex').innerHTML = ValtaraData.codex;
            document.getElementById('view-science').innerHTML = ValtaraData.science;
            document.getElementById('view-ergonomics').innerHTML = ValtaraData.ergonomics;
            document.getElementById('view-legal').innerHTML = ValtaraData.legal;
            document.getElementById('main-footer').innerHTML = ValtaraData.footer;
        }
    },

    // 2. CONTROLADOR DE VENTANAS FLOTANTES (MODALES HTML5 NATIVOS)
    initModals: function() {
        // Enlaza los botones de las esquinas con sus ventanas respectivas
        const openBtns = document.querySelectorAll('[aria-haspopup="dialog"]');
        const closeBtns = document.querySelectorAll('[data-close]');

        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                let targetId = '';
                if(btn.id === 'fab-a11y') targetId = 'a11y-modal';
                if(btn.id === 'fab-audio') targetId = 'audio-modal';
                if(btn.id === 'fab-aura') targetId = 'aura-modal';
                if(btn.id === 'avatar-toggle-btn') targetId = 'user-modal';

                const dialog = document.getElementById(targetId);
                if(dialog && !dialog.open) {
                    dialog.showModal(); // Comando nativo de alta accesibilidad
                    document.body.style.overflow = 'hidden'; // Bloquea el scroll de fondo
                }
            });
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = btn.getAttribute('data-close');
                const dialog = document.getElementById(targetId);
                if(dialog && dialog.open) {
                    dialog.close();
                    document.body.style.overflow = 'auto'; // Restaura el scroll
                }
            });
        });
    },

    // 3. CONTROLADOR DEL MENÚ LATERAL
    initSideMenu: function() {
        const menuBtn = document.getElementById('menu-toggle-btn');
        const closeBtn = document.getElementById('menu-close-btn');
        const nav = document.getElementById('main-nav');

        if(menuBtn && closeBtn && nav) {
            menuBtn.addEventListener('click', () => {
                nav.classList.add('open');
                menuBtn.setAttribute('aria-expanded', 'true');
            });

            closeBtn.addEventListener('click', () => {
                nav.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        }
    },

    // 4. CONTROLADOR DEL MAPA BIOMECÁNICO
    initBodyMap: function() {
        // Al inyectar el HTML de data.js, los botones del mapa son nuevos, hay que enlazarlos
        const mapContainer = document.getElementById('view-home');
        if(mapContainer) {
            mapContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.zone-btn');
                if(btn) {
                    // Remover clase active de todos
                    document.querySelectorAll('.zone-btn').forEach(b => {
                        b.classList.remove('active');
                        b.setAttribute('aria-pressed', 'false');
                    });
                    
                    // Activar el seleccionado
                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');
                    
                    // Mostrar información en pantalla
                    const zone = btn.getAttribute('data-zone');
                    this.updateZoneInfo(zone);
                }
            });
        }
    },

    updateZoneInfo: function(zoneId) {
        const data = {
            craneo: { title: "Cráneo y Fascia Facial", desc: "El estrés somatizado comprime el nervio trigémino, causando bruxismo nocturno, migrañas y fatiga visual severa. <br><br><strong>Prescripción:</strong> Rehabilitación Facial por Estrés ($519 MXN).", icon: "fa-head-side-virus" },
            cervical: { title: "Cervicales y Trapecios", desc: "El 'Text Neck' o cuello de texto multiplica el peso del cráneo hasta 27kg, creando nódulos duros que bloquean el oxígeno al cerebro. <br><br><strong>Prescripción:</strong> Terapia Cervical Exprés o Masaje Deportivo.", icon: "fa-user-injured" },
            lumbar: { title: "Región Lumbar y Ciática", desc: "Permanecer sentado más de 6 horas acorta los flexores de la cadera y comprime los discos intervertebrales, amenazando el nervio ciático. <br><br><strong>Prescripción:</strong> Masaje Tailandés de estiramiento pasivo.", icon: "fa-child" },
            linfa: { title: "Drenaje de Extremidades", desc: "Las piernas pesadas o edemas indican que la bomba natural del sistema linfático ha fallado por falta de movimiento. <br><br><strong>Prescripción:</strong> Terapia de Drenaje Linfático Manual.", icon: "fa-shoe-prints" }
        };

        const info = data[zoneId];
        const display = document.getElementById('zone-display');
        if(info && display) {
            display.innerHTML = `
                <i class="fa-solid ${info.icon}" style="font-size: 4rem; color: var(--valtara-cian-fluor); margin-bottom: 1.5rem;" aria-hidden="true"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);">${info.title}</h4>
                <p style="color: var(--valtara-gris-claro); line-height: 2; font-size: 1.2rem; font-weight: 300;">${info.desc}</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="margin-top:2.5rem; width:fit-content; background:transparent; border-color:var(--valtara-cian-fluor); color:var(--valtara-cian-fluor);"><i class="fa-brands fa-whatsapp"></i> Consultar Disponibilidad</a>
            `;
            if(window.A11yEngine) A11yEngine.announce("Diagnóstico cargado: " + info.title);
        }
    }
};

// Esperar a que el HTML y data.js carguen para ejecutar el Director de Orquesta
window.addEventListener('DOMContentLoaded', () => {
    // Un pequeñísimo retraso (100ms) garantiza que 'ValtaraData' esté disponible en la memoria RAM
    setTimeout(() => {
        CoreEngine.init();
    }, 100);
});
