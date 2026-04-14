/**
 * ====================================================================================
 * BLOQUE 5: CORE ENGINE V12.0 (SISTEMA OPERATIVO Y TRIAJE EDUCATIVO)
 * Controla modales, menú lateral, Mapa Biomecánico y SUSPENSIÓN TÉRMICA.
 * ====================================================================================
 */

const CoreEngine = {
    init: function() {
        // 1. Inyectar la Enciclopedia (Textos masivos) en el HTML vacío
        if(window.ValtaraData) ValtaraData.renderAll();
        
        // 2. Inicializar Módulos de Interfaz
        this.initModals();
        this.initSideMenu();
        this.initBodyMap();
        
        // 3. Retirar la pantalla de carga inicial del navegador suavemente
        setTimeout(() => {
            document.body.classList.remove('system-loading');
        }, 300);
    },

    // ================================================================================
    // CONTROLADOR MASIVO DE VENTANAS EMERGENTES (MODALES HTML5)
    // ================================================================================
    initModals: function() {
        const openBtns = document.querySelectorAll('[aria-haspopup="dialog"]');
        const closeBtns = document.querySelectorAll('[data-close]');

        openBtns.forEach(btn => {
            btn.replaceWith(btn.cloneNode(true));
            const newBtn = document.getElementById(btn.id) || document.querySelector(`[aria-haspopup="dialog"][id="${btn.id}"]`);
            
            if(newBtn) {
                newBtn.addEventListener('click', () => {
                    let targetId = '';
                    
                    if(newBtn.id === 'top-a11y-btn') targetId = 'a11y-modal'; 
                    if(newBtn.id === 'fab-audio') targetId = 'audio-modal';
                    if(newBtn.id === 'fab-aura') targetId = 'aura-modal';

                    const dialog = document.getElementById(targetId);
                    if(dialog && !dialog.open) {
                        dialog.showModal(); 
                        document.body.style.overflow = 'hidden'; 
                        
                        // PARCHE TÉRMICO: Congela las animaciones de fondo para enfriar el celular
                        document.body.classList.add('pausar-ambiente');
                        
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
                        dialog.style.opacity = '0';
                        dialog.style.transform = 'translateY(50px) scale(0.95)';
                        
                        setTimeout(() => {
                            dialog.close();
                            dialog.style.opacity = '';
                            dialog.style.transform = '';
                            document.body.style.overflow = 'auto'; 
                            
                            // PARCHE TÉRMICO: Descongela el fondo cuando se cierra el modal
                            document.body.classList.remove('pausar-ambiente');

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
                document.body.style.overflow = 'hidden'; 
                
                // PARCHE TÉRMICO: Congela las animaciones de fondo
                document.body.classList.add('pausar-ambiente');

                if(window.A11yEngine) A11yEngine.announce("Panel de control del paciente y menú de navegación abierto.");
            });

            closeBtn.addEventListener('click', () => {
                nav.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto'; 
                
                // PARCHE TÉRMICO: Descongela las animaciones de fondo
                document.body.classList.remove('pausar-ambiente');

                if(window.A11yEngine) A11yEngine.announce("Panel cerrado.");
            });
        }
    },

    // ================================================================================
    // MOTOR DE TRIAJE EDUCATIVO (MAPA BIOMECÁNICO EN CASCADA)
    // ================================================================================
    initBodyMap: function() {
        const mapContainer = document.getElementById('view-home');
        if(!mapContainer) return;

        mapContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.zone-btn');
            if(btn) {
                document.querySelectorAll('.zone-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                    b.style.background = 'rgba(255,255,255,0.03)';
                    b.style.borderColor = 'var(--valtara-cian-brillante)';
                    const icon = b.querySelector('i');
                    if(icon) icon.style.color = 'var(--valtara-cian-brillante)';
                    const text = b.querySelector('span');
                    if(text) text.style.color = 'var(--valtara-blanco)';
                });
                
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                btn.style.background = 'var(--valtara-cian-brillante)';
                btn.style.transform = 'translateY(-4px)';
                btn.style.boxShadow = '0 1rem 3rem rgba(0, 255, 255, 0.4)';
                
                const icon = btn.querySelector('i');
                if(icon) icon.style.color = 'var(--valtara-negro-fondo)';
                const text = btn.querySelector('span');
                if(text) text.style.color = 'var(--valtara-negro-fondo)';
                
                const zone = btn.getAttribute('data-zone');
                this.updateZoneInfo(zone);
            }
        });
    },

    updateZoneInfo: function(zoneId) {
        const data = {
            craneo: `
                <i class="fa-solid fa-head-side-virus" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Cráneo, Mandíbula y Rostro</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; margin-bottom: 1.5rem; font-weight: 300;">El estrés somatizado en esta zona es silencioso pero devastador. Explora la ciencia detrás de tu dolor:</p>
                
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-microscope"></i> 1. El Nervio Trigémino y el Bruxismo</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">El nervio trigémino controla los músculos de la masticación. Bajo niveles altos de estrés, tus músculos maseteros ejercen hasta 70kg de presión involuntaria mientras duermes (Bruxismo).</p>
                    
                    <details style="background: rgba(0,0,0,0.6); padding: 1.5rem; border-radius: 1rem; margin-top: 1.5rem; border-left: 4px solid var(--valtara-alerta); cursor: pointer;">
                        <summary style="font-weight: bold; color: var(--valtara-alerta); font-size: 1.1rem; outline: none;"><i class="fa-solid fa-triangle-exclamation"></i> Impacto a largo plazo</summary>
                        <p style="margin-top: 1rem; color: #ddd; font-size: 1.1rem; line-height: 1.7;">Si no se atiende, esto provoca el desgaste total de las piezas dentales, migrañas crónicas, fatiga visual severa y envejecimiento prematuro del tejido facial por falta de oxigenación celular.</p>
                    </details>
                </details>

                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-prescription-bottle-medical"></i> 2. La Solución Clínica en Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Recomendamos prescribir la <strong>Rehabilitación Facial por Estrés ($419 o $529 MXN)</strong>. Utilizamos técnicas de termoterapia profunda y digitopresión para "despertar" el nervio y relajar la coraza facial.</p>
                </details>
            `,

            cervical: `
                <i class="fa-solid fa-user-injured" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Cervicales, Nuca y Trapecios</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; margin-bottom: 1.5rem; font-weight: 300;">La zona que soporta el peso del intelecto y el trabajo corporativo. Aprende qué está sucediendo:</p>
                
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-mobile-screen-button"></i> 1. El Síndrome del "Text Neck"</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Una cabeza humana pesa unos 5kg. Sin embargo, al inclinar la cabeza hacia abajo para ver tu celular, la física multiplica ese peso. A 60 grados de inclinación, tu frágil cuello soporta ¡hasta 27 kilos de presión constante!</p>
                    
                    <details style="background: rgba(0,0,0,0.6); padding: 1.5rem; border-radius: 1rem; margin-top: 1.5rem; border-left: 4px solid var(--valtara-alerta); cursor: pointer;">
                        <summary style="font-weight: bold; color: var(--valtara-alerta); font-size: 1.1rem; outline: none;"><i class="fa-solid fa-virus"></i> La formación de Nódulos (Nudos)</summary>
                        <p style="margin-top: 1rem; color: #ddd; font-size: 1.1rem; line-height: 1.7;">El cuerpo, al sentirse en peligro de romperse por cargar tanto peso, envía colágeno y fibrina para endurecer el músculo y convertirlo en hueso falso (los famosos "nudos"). Esto bloquea el oxígeno al cerebro, causando niebla mental.</p>
                    </details>
                </details>

                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-dumbbell"></i> 2. La Solución Clínica en Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Para destruir esta "armadura" sólida, recomendamos el <strong>Masaje Deportivo y Descompresión ($978 MXN)</strong> o el <strong>Masaje en Silla ($199 MXN como complemento)</strong>. Usaremos fricción transversa profunda para derretir la tensión.</p>
                </details>
            `,

            lumbar: `
                <i class="fa-solid fa-child" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Región Lumbar y Ciática</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; margin-bottom: 1.5rem; font-weight: 300;">El centro de gravedad del cuerpo. El sedentarismo lo está destruyendo. Mira cómo:</p>
                
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-chair"></i> 1. El Enemigo Silencioso: La Silla</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Permanecer sentado más de 6 horas al día hace que el músculo Psoas (flexor de la cadera) se acorte permanentemente. Esto tira de tus vértebras hacia adelante, comprimiendo los discos intervertebrales L4 y L5.</p>
                    
                    <details style="background: rgba(0,0,0,0.6); padding: 1.5rem; border-radius: 1rem; margin-top: 1.5rem; border-left: 4px solid var(--valtara-alerta); cursor: pointer;">
                        <summary style="font-weight: bold; color: var(--valtara-alerta); font-size: 1.1rem; outline: none;"><i class="fa-solid fa-bolt"></i> El Pinzamiento del Nervio Ciático</summary>
                        <p style="margin-top: 1rem; color: #ddd; font-size: 1.1rem; line-height: 1.7;">Cuando los discos se comprimen, aplastan el nervio ciático (el más grueso del cuerpo). Esto genera dolor punzante, ardor, y adormecimiento que baja por el glúteo hasta la pierna, impidiendo caminar correctamente.</p>
                    </details>
                </details>

                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-person-praying"></i> 2. La Solución Clínica en Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Para salvar al nervio ciático, recomendamos el <strong>Masaje Tailandés Pasivo ($1,478 MXN)</strong>. A través de palancas y tracciones de yoga, descomprimimos milimétricamente el espacio entre tus vértebras para liberar el nervio.</p>
                </details>
            `,

            linfa: `
                <i class="fa-solid fa-shoe-prints" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Pesadez en las Piernas y Linfa</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; margin-bottom: 1.5rem; font-weight: 300;">El sistema de drenaje natural de tu cuerpo se ha estancado. Entiende el proceso:</p>
                
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-water"></i> 1. El Fallo de la Bomba Linfática</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">A diferencia de la sangre que tiene al corazón para bombearla, el líquido linfático (encargado de limpiar toxinas) solo se mueve si TÚ te mueves. Si estás de pie o sentado todo el día, los líquidos y toxinas se acumulan en las piernas por pura gravedad.</p>
                    
                    <details style="background: rgba(0,0,0,0.6); padding: 1.5rem; border-radius: 1rem; margin-top: 1.5rem; border-left: 4px solid var(--valtara-alerta); cursor: pointer;">
                        <summary style="font-weight: bold; color: var(--valtara-alerta); font-size: 1.1rem; outline: none;"><i class="fa-solid fa-biohazard"></i> Intoxicación Celular (Edemas)</summary>
                        <p style="margin-top: 1rem; color: #ddd; font-size: 1.1rem; line-height: 1.7;">Esto produce edemas (hinchazón severa), várices, celulitis rebelde y una sensación de dolor sordo y cansancio extremo que no se quita ni siquiera durmiendo.</p>
                    </details>
                </details>

                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-droplet"></i> 2. La Solución Clínica en Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Existen dos vías: Para un enfoque estético e intenso, el <strong>Masaje Reductivo con Maderoterapia ($899 MXN)</strong>. Para un enfoque suave y post-quirúrgico, el <strong>Drenaje Linfático Manual (Bajo Valoración)</strong>.</p>
                </details>
            `
        };

        const htmlContent = data[zoneId];
        const display = document.getElementById('zone-display');
        
        if(htmlContent && display) {
            display.style.opacity = 0;
            
            setTimeout(() => {
                display.innerHTML = htmlContent + `
                    <div style="text-align: center; margin-top: 2rem;">
                        <a href="https://wa.me/5213348572070?text=Hola,%20realicé%20el%20triaje%20biomecánico%20educativo%20en%20su%20página%20y%20deseo%20agendar%20una%20terapia%20para%20esta%20zona." target="_blank" class="btn-primary" style="background: var(--valtara-whatsapp); border-color: var(--valtara-whatsapp); color: var(--valtara-negro-fondo); box-shadow: 0 1rem 3rem rgba(37,211,102,0.4);">
                            <i class="fa-brands fa-whatsapp"></i> Chatear con el Especialista
                        </a>
                    </div>
                `;
                display.style.opacity = 1;
                display.style.transition = 'opacity 0.5s ease';
                
                if(window.A11yEngine) A11yEngine.announce("Módulo educativo desplegado. Utilice las flechas para expandir la información científica.");
            }, 300);
        }
    }
};

window.addEventListener('DOMContentLoaded', () => { 
    CoreEngine.init(); 
});
// ====================================================================================
// GUARDIÁN MAESTRO DE MEDIOS (Evita cacofonía auditiva)
// ====================================================================================
window.addEventListener('DOMContentLoaded', () => {
    
    // 1. Control de Audios Nativos (Ej. Sonoterapia)
    // Cuando un audio empieza a sonar (evento 'play' o 'playing'), pausamos los demás
    document.addEventListener('play', function(e) {
        const audios = document.querySelectorAll('audio, video');
        audios.forEach(media => {
            if (media !== e.target) {
                media.pause();
            }
        });

        // Opcional: También pausar todos los iframes de YouTube enviando un mensaje
        const iframes = document.querySelectorAll('iframe[src*="youtube.com"]');
        iframes.forEach(iframe => {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        });
    }, true); // El 'true' usa la fase de captura para detectar todos los eventos play

    // 2. Control de YouTube Iframes
    // Dado que YouTube está en un iframe (dominio cruzado), no podemos escuchar su evento 'play' directamente.
    // El "truco" es detectar cuando el iframe recibe el Foco (es decir, el usuario le hizo clic para reproducirlo).
    window.addEventListener('blur', function() {
        if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
            // El usuario hizo clic en un video. Pausamos inmediatamente cualquier música nativa.
            const audios = document.querySelectorAll('audio, video');
            audios.forEach(media => media.pause());
            
            // Pausamos otros iframes de YouTube enviando el comando por PostMessage
            const iframes = document.querySelectorAll('iframe[src*="youtube.com"]');
            iframes.forEach(iframe => {
                if (iframe !== document.activeElement) {
                    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            });
        }
    });
});
