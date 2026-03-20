/**
 * ====================================================================================
 * BLOQUE 5: CORE ENGINE V11.0 (SISTEMA OPERATIVO Y EVENTOS)
 * Controla modales, menú lateral, mapa biomecánico y accesibilidad ARIA.
 * ====================================================================================
 */

const CoreEngine = {
    init: function() {
        // 1. Inyectar la Enciclopedia (Textos) en el HTML vacío
        if(window.ValtaraData) ValtaraData.renderAll();
        
        // 2. Inicializar Módulos de Interfaz
        this.initModals();
        this.initSideMenu();
        this.initBodyMap();
        
        // 3. Retirar la pantalla de carga inicial del navegador
        document.body.classList.remove('system-loading');
    },

    // ================================================================================
    // CONTROLADOR MASIVO DE VENTANAS EMERGENTES (MODALES HTML5)
    // ================================================================================
    initModals: function() {
        const openBtns = document.querySelectorAll('[aria-haspopup="dialog"]');
        const closeBtns = document.querySelectorAll('[data-close]');

        openBtns.forEach(btn => {
            // Limpieza de eventos duplicados
            btn.replaceWith(btn.cloneNode(true));
            const newBtn = document.getElementById(btn.id) || document.querySelector(`[aria-haspopup="dialog"][id="${btn.id}"]`);
            
            if(newBtn) {
                newBtn.addEventListener('click', () => {
                    let targetId = '';
                    
                    // Ruteo exacto de botones a modales
                    if(newBtn.id === 'top-a11y-btn') targetId = 'a11y-modal'; // El nuevo botón superior
                    if(newBtn.id === 'fab-audio') targetId = 'audio-modal';
                    if(newBtn.id === 'fab-aura') targetId = 'aura-modal';

                    const dialog = document.getElementById(targetId);
                    if(dialog && !dialog.open) {
                        dialog.showModal(); 
                        document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
                        
                        // Si el menú lateral está abierto, cerrarlo elegantemente
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
                        // Efecto de cierre suave
                        dialog.style.opacity = '0';
                        dialog.style.transform = 'translateY(40px) scale(0.95)';
                        
                        setTimeout(() => {
                            dialog.close();
                            // Restaurar estilos para la próxima vez
                            dialog.style.opacity = '';
                            dialog.style.transform = '';
                            document.body.style.overflow = 'auto'; // Devuelve el scroll
                        }, 400);

                        if(window.A11yEngine) A11yEngine.announce(`Ventana cerrada.`);
                    }
                });
            }
        });
    },

    // ================================================================================
    // CONTROLADOR DEL PANEL LATERAL (MENÚ DEL PACIENTE)
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
                document.body.style.overflow = 'hidden'; // Evita scrollear la página detrás del menú
                if(window.A11yEngine) A11yEngine.announce("Panel de control del paciente y menú de navegación abierto.");
            });

            closeBtn.addEventListener('click', () => {
                nav.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto';
                if(window.A11yEngine) A11yEngine.announce("Panel cerrado.");
            });
        }
    },

    // ================================================================================
    // MOTOR DE TRIAJE (MAPA BIOMECÁNICO)
    // ================================================================================
    initBodyMap: function() {
        const mapContainer = document.getElementById('view-home');
        if(!mapContainer) return;

        // Usamos delegación de eventos para capturar clics incluso si el HTML fue inyectado dinámicamente
        mapContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.zone-btn');
            if(btn) {
                // 1. Resetear todos los botones visualmente
                document.querySelectorAll('.zone-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                    b.style.background = 'rgba(255,255,255,0.03)';
                    b.style.borderColor = 'rgba(255,255,255,0.15)';
                    const icon = b.querySelector('i');
                    if(icon) icon.style.color = 'var(--valtara-cian-fluor)';
                    const text = b.querySelector('span');
                    if(text) text.style.color = 'var(--valtara-blanco)';
                });
                
                // 2. Marcar el seleccionado con colorimetría Viva (Cian Flúor)
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                btn.style.background = 'var(--valtara-cian-fluor)';
                btn.style.borderColor = 'var(--valtara-cian-fluor)';
                btn.style.transform = 'translateY(-3px)';
                btn.style.boxShadow = '0 1rem 2rem rgba(76,201,240,0.4)';
                
                const icon = btn.querySelector('i');
                if(icon) icon.style.color = 'var(--valtara-negro-fondo)';
                const text = btn.querySelector('span');
                if(text) text.style.color = 'var(--valtara-negro-fondo)';
                
                // 3. Extraer zona y mostrar el diagnóstico clínico
                const zone = btn.getAttribute('data-zone');
                this.updateZoneInfo(zone);
            }
        });
    },

    updateZoneInfo: function(zoneId) {
        // Base de datos clínica para el Triaje
        const data = {
            craneo: { 
                title: "Cráneo y Fascia Facial", 
                desc: "El estrés somatizado comprime el nervio trigémino, causando bruxismo nocturno, cefaleas tensionales y fatiga visual severa. Los músculos maseteros pueden ejercer hasta 70kg de presión involuntaria mientras duerme. <br><br><strong style='color:var(--valtara-oro);'>Prescripción Sugerida:</strong> Rehabilitación Facial por Estrés.", 
                icon: "fa-head-side-virus" 
            },
            cervical: { 
                title: "Cervicales y Trapecios", 
                desc: "La postura encorvada ('Text Neck') multiplica el peso del cráneo hasta 27kg, creando nódulos duros que bloquean la irrigación de oxígeno al cerebro, generando niebla mental y dolor punzante constante. <br><br><strong style='color:var(--valtara-oro);'>Prescripción Sugerida:</strong> Masaje Deportivo o Terapia Cervical.", 
                icon: "fa-user-injured" 
            },
            lumbar: { 
                title: "Región Lumbar y Ciática", 
                desc: "Permanecer sentado más de 6 horas acorta drásticamente los flexores de la cadera (Psoas) y comprime los discos intervertebrales L4-L5, amenazando con pinzar el nervio ciático y causar dolor irradiado hacia la pierna. <br><br><strong style='color:var(--valtara-oro);'>Prescripción Sugerida:</strong> Masaje Tailandés Pasivo.", 
                icon: "fa-child" 
            },
            linfa: { 
                title: "Drenaje de Extremidades", 
                desc: "Las piernas pesadas, la retención de líquidos o los edemas indican que la bomba natural del sistema linfático ha fallado por falta de movimiento. Las toxinas celulares se están estancando en el tejido intersticial. <br><br><strong style='color:var(--valtara-oro);'>Prescripción Sugerida:</strong> Drenaje Linfático Manual.", 
                icon: "fa-shoe-prints" 
            }
        };

        const info = data[zoneId];
        const display = document.getElementById('zone-display');
        
        if(info && display) {
            // Efecto de desvanecimiento suave para cambiar el texto
            display.style.opacity = 0;
            
            setTimeout(() => {
                display.innerHTML = `
                    <i class="fa-solid ${info.icon}" style="font-size: 5rem; color: var(--valtara-cian-fluor); margin-bottom: 2rem; filter: drop-shadow(0 0 2rem rgba(76,201,240,0.6));" aria-hidden="true"></i>
                    <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);">${info.title}</h4>
                    <p style="color: var(--valtara-gris-texto); line-height: 1.9; font-size: 1.2rem; font-weight: 300;">${info.desc}</p>
                    <a href="https://wa.me/5213348572070?text=Hola,%20realicé%20el%20triaje%20biomecánico%20en%20su%20página%20y%20me%20diagnosticaron%20tensión%20en%20${info.title}.%20Deseo%20agendar." target="_blank" class="btn-primary" style="margin-top:2.5rem; width:fit-content; background:rgba(76,201,240,0.1); border-color:var(--valtara-cian-fluor); color:var(--valtara-cian-fluor);">
                        <i class="fa-brands fa-whatsapp"></i> Consultar Disponibilidad
                    </a>
                `;
                display.style.opacity = 1;
                display.style.transition = 'opacity 0.5s ease';
                
                // Anunciador de Accesibilidad
                if(window.A11yEngine) A11yEngine.announce("Diagnóstico clínico actualizado: " + info.title);
            }, 300);
        }
    }
};

// Arrancar el motor principal cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => { 
    setTimeout(() => { CoreEngine.init(); }, 100); 
});
