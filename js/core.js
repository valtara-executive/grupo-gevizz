/**
 * ====================================================================================
 * BLOQUE 7: CORE SYSTEM V10.3 (SISTEMA OPERATIVO)
 * Director de Orquesta: Renderiza, maneja accesibilidad de menús y controla el triaje.
 * ====================================================================================
 */

const CoreEngine = {
    init: function() {
        // 1. Inyectar textos de la Enciclopedia
        if(window.ValtaraData) ValtaraData.renderAll();
        
        // 2. Inicializar interfaces
        this.initModals();
        this.initSideMenu();
        this.initBodyMap();
        
        // Retirar clase de carga
        document.body.classList.remove('system-loading');
    },

    // ================================================================================
    // CONTROLADOR DE VENTANAS FLOTANTES (MODALES HTML5)
    // ================================================================================
    initModals: function() {
        const openBtns = document.querySelectorAll('[aria-haspopup="dialog"]');
        const closeBtns = document.querySelectorAll('[data-close]');

        openBtns.forEach(btn => {
            // Prevenir duplicados de eventos
            btn.replaceWith(btn.cloneNode(true));
            const newBtn = document.getElementById(btn.id) || document.querySelector(`[aria-haspopup="dialog"][id="${btn.id}"]`);
            
            if(newBtn) {
                newBtn.addEventListener('click', () => {
                    let targetId = '';
                    if(newBtn.id === 'fab-a11y') targetId = 'a11y-modal'; // Si aún existiera botón separado
                    if(newBtn.id === 'fab-audio') targetId = 'audio-modal';
                    if(newBtn.id === 'fab-aura') targetId = 'aura-modal';
                    if(newBtn.id === 'btn-change-name') targetId = 'edit-name-modal';

                    const dialog = document.getElementById(targetId);
                    if(dialog && !dialog.open) {
                        dialog.showModal(); // Atrapa el foco de accesibilidad automáticamente
                        document.body.style.overflow = 'hidden'; // Bloquea scroll de fondo
                        
                        // Cerrar menú lateral si estaba abierto para no encimar
                        const nav = document.getElementById('main-nav');
                        if(nav && nav.classList.contains('open')) {
                            document.getElementById('menu-close-btn').click();
                        }

                        if(window.A11yEngine) A11yEngine.announce(`Ventana abierta: ${dialog.getAttribute('aria-label')}`);
                    }
                });
            }
        });

        closeBtns.forEach(btn => {
            btn.replaceWith(btn.cloneNode(true));
            const newBtn = document.querySelector(`[data-close="${btn.getAttribute('data-close')}"]`);
            
            if(newBtn) {
                newBtn.addEventListener('click', () => {
                    const targetId = newBtn.getAttribute('data-close');
                    const dialog = document.getElementById(targetId);
                    if(dialog && dialog.open) {
                        dialog.close();
                        document.body.style.overflow = 'auto';
                        if(window.A11yEngine) A11yEngine.announce(`Ventana cerrada.`);
                    }
                });
            }
        });
    },

    // ================================================================================
    // CONTROLADOR DEL MENÚ LATERAL (PANEL DE CONTROL)
    // ================================================================================
    initSideMenu: function() {
        const menuBtn = document.getElementById('menu-toggle-btn');
        const closeBtn = document.getElementById('menu-close-btn');
        const nav = document.getElementById('main-nav');

        if(menuBtn && closeBtn && nav) {
            menuBtn.addEventListener('click', () => {
                nav.classList.add('open');
                menuBtn.setAttribute('aria-expanded', 'true');
                nav.setAttribute('aria-hidden', 'false');
                if(window.A11yEngine) A11yEngine.announce("Panel de control del paciente abierto.");
            });

            closeBtn.addEventListener('click', () => {
                nav.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
                if(window.A11yEngine) A11yEngine.announce("Panel cerrado.");
            });
        }
    },

    // ================================================================================
    // MOTOR DIAGNÓSTICO (MAPA BIOMECÁNICO)
    // ================================================================================
    initBodyMap: function() {
        const mapContainer = document.getElementById('view-home');
        if(!mapContainer) return;

        mapContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.zone-btn');
            if(btn) {
                // Accesibilidad: desmarcar todos
                document.querySelectorAll('.zone-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                    b.style.background = 'rgba(255,255,255,0.03)';
                    b.style.borderColor = 'rgba(255,255,255,0.1)';
                    b.style.color = 'white';
                });
                
                // Marcar el seleccionado con colores vivos
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                btn.style.background = 'rgba(76,201,240,0.15)';
                btn.style.borderColor = 'var(--valtara-cian-fluor)';
                btn.style.color = 'var(--valtara-cian-fluor)';
                
                // Mostrar diagnóstico
                const zone = btn.getAttribute('data-zone');
                this.updateZoneInfo(zone);
            }
        });
    },

    updateZoneInfo: function(zoneId) {
        const data = {
            craneo: { title: "Cráneo y Fascia Facial", desc: "El estrés somatizado comprime el nervio trigémino, causando bruxismo nocturno, migrañas y fatiga visual severa. <br><br><strong style='color:var(--valtara-oro);'>Prescripción:</strong> Rehabilitación Facial por Estrés.", icon: "fa-head-side-virus" },
            cervical: { title: "Cervicales y Trapecios", desc: "El 'Text Neck' multiplica el peso del cráneo hasta 27kg, creando nódulos duros que bloquean el oxígeno al cerebro. <br><br><strong style='color:var(--valtara-oro);'>Prescripción:</strong> Terapia Cervical Exprés o Masaje Deportivo.", icon: "fa-user-injured" },
            lumbar: { title: "Región Lumbar y Ciática", desc: "Permanecer sentado más de 6 horas acorta los flexores de la cadera y comprime los discos intervertebrales, amenazando el nervio ciático. <br><br><strong style='color:var(--valtara-oro);'>Prescripción:</strong> Masaje Tailandés de alineación pasiva.", icon: "fa-child" },
            linfa: { title: "Drenaje de Extremidades", desc: "Las piernas pesadas o edemas indican que la bomba natural del sistema linfático ha fallado por falta de movimiento. <br><br><strong style='color:var(--valtara-oro);'>Prescripción:</strong> Terapia de Drenaje Linfático Manual.", icon: "fa-shoe-prints" }
        };

        const info = data[zoneId];
        const display = document.getElementById('zone-display');
        
        if(info && display) {
            display.innerHTML = `
                <i class="fa-solid ${info.icon}" style="font-size: 4rem; color: var(--valtara-cian-fluor); margin-bottom: 2rem; filter: drop-shadow(0 0 1rem rgba(76,201,240,0.5));" aria-hidden="true"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);">${info.title}</h4>
                <p style="color: var(--valtara-gris-claro); line-height: 1.8; font-size: 1.15rem; font-weight: 300;">${info.desc}</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="margin-top:2.5rem; width:fit-content; background:transparent; border-color:var(--valtara-cian-fluor); color:var(--valtara-cian-fluor);"><i class="fa-brands fa-whatsapp"></i> Consultar Disponibilidad</a>
            `;
            // El aria-live="polite" en el HTML hará que el lector lea esto automáticamente, pero forzamos un anuncio extra por seguridad
            if(window.A11yEngine) A11yEngine.announce("Diagnóstico actualizado: " + info.title);
        }
    }
};

window.addEventListener('DOMContentLoaded', () => { setTimeout(() => { CoreEngine.init(); }, 150); });
