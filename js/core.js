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
        this.inyectarCSSAltaEficiencia(); // CSS dinámico para evitar sobrecalentamiento
        
        // 3. Retirar la pantalla de carga inicial del navegador suavemente
        setTimeout(() => {
            document.body.classList.remove('system-loading');
        }, 300);
    },

    // ================================================================================
    // MOTOR TÉRMICO Y ACCESIBILIDAD (Detecta lector de pantalla)
    // ================================================================================
    inyectarCSSAltaEficiencia: function() {
        if(document.getElementById('eco-mode-styles')) return;
        const style = document.createElement('style');
        style.id = 'eco-mode-styles';
        style.innerHTML = `
            @media (prefers-reduced-motion: reduce) {
                * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
                .ambient-engine { display: none !important; }
            }
            body.eco-mode .exp-overlay,
            body.eco-mode #aura-modal,
            body.eco-mode .msg,
            body.eco-mode .glass-card {
                backdrop-filter: none !important; 
                -webkit-backdrop-filter: none !important;
                background: rgba(10, 10, 15, 0.98) !important; 
            }
        `;
        document.head.appendChild(style);

        // Si usa la tecla TAB (lector de pantalla), activamos el modo Eco
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') document.body.classList.add('eco-mode');
        });
        // Si toca la pantalla, asumimos dispositivo normal y devolvemos el lujo visual
        window.addEventListener('touchstart', () => {
            document.body.classList.remove('eco-mode');
        }, { passive: true });
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
                        <p style="margin-top: 1rem; color: #ddd; font-size: 1.1rem; line-height: 1.7;">Si no se atiende, esto provoca desgaste dental, migrañas crónicas y envejecimiento prematuro del tejido facial por falta de oxigenación celular.</p>
                    </details>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-prescription-bottle-medical"></i> 2. La Solución Clínica</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Recomendamos prescribir la <strong>Rehabilitación Facial por Estrés ($419 MXN)</strong>.</p>
                </details>
            `,
            cervical: `
                <i class="fa-solid fa-user-injured" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Cervicales, Nuca y Trapecios</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; margin-bottom: 1.5rem; font-weight: 300;">La zona que soporta el peso del intelecto y el trabajo corporativo.</p>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-mobile-screen-button"></i> 1. El Síndrome del "Text Neck"</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">A 60 grados de inclinación para ver el celular, tu frágil cuello soporta hasta 27 kilos de presión constante.</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-dumbbell"></i> 2. La Solución Clínica</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Recomendamos el <strong>Masaje Deportivo y Descompresión ($829 MXN)</strong>.</p>
                </details>
            `,
            lumbar: `
                <i class="fa-solid fa-child" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Región Lumbar y Ciática</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; margin-bottom: 1.5rem; font-weight: 300;">El centro de gravedad del cuerpo. El sedentarismo lo está destruyendo.</p>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-person-praying"></i> La Solución Clínica</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Recomendamos el <strong>Masaje Tailandés Pasivo ($829 MXN)</strong> para descomprimir milimétricamente las vértebras.</p>
                </details>
            `,
            linfa: `
                <i class="fa-solid fa-shoe-prints" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Pesadez en las Piernas y Linfa</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; margin-bottom: 1.5rem; font-weight: 300;">El sistema de drenaje natural de tu cuerpo se ha estancado.</p>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s;">
                    <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-droplet"></i> La Solución Clínica</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Para un enfoque estético intenso: <strong>Masaje Reductivo ($899 MXN)</strong>. Enfoque suave: <strong>Drenaje Linfático Manual ($849 MXN)</strong>.</p>
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
                        <a href="https://wa.me/5213348572070" target="_blank" class="btn-primary" style="background: var(--valtara-whatsapp); border-color: var(--valtara-whatsapp); color: var(--valtara-negro-fondo); box-shadow: 0 1rem 3rem rgba(37,211,102,0.4);">
                            <i class="fa-brands fa-whatsapp"></i> Chatear con el Especialista
                        </a>
                    </div>
                `;
                display.style.opacity = 1;
                display.style.transition = 'opacity 0.5s ease';
            }, 300);
        }
    }
};

// ====================================================================================
// GUARDIÁN MAESTRO DE MEDIOS (Evita cacofonía y hace Fade-In / Fade-Out)
// ====================================================================================
window.ValtaraMedia = {
    silenciarTodo: function(excepcion = null) {
        // 1. Apagar audios/videos nativos con Fade Out
        document.querySelectorAll('audio, video').forEach(media => {
            if (media !== excepcion && !media.paused) {
                this.fadeOut(media);
            }
        });
        
        // 2. Pausar Iframes de YouTube (requiere enablejsapi=1)
        const iframes = document.querySelectorAll('iframe[src*="youtube.com"]');
        iframes.forEach(iframe => {
            try {
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } catch(e) {}
        });
    },

    // Efecto Lujoso: Bajar volumen gradualmente
    fadeOut: function(media) {
        let vol = media.volume;
        const fadeAudio = setInterval(() => {
            if (vol > 0.05) {
                vol -= 0.05;
                media.volume = vol;
            } else {
                clearInterval(fadeAudio);
                media.pause();
                media.volume = 1; // Resetea para la próxima vez
            }
        }, 30); // Muy rápido y sutil
    },

    // Efecto Lujoso: Subir volumen gradualmente
    fadeIn: function(media, targetVolume = 1) {
        window.ValtaraMedia.silenciarTodo(media); // Apaga a los demás primero
        media.volume = 0;
        media.play();
        let vol = 0;
        const fadeAudio = setInterval(() => {
            if (vol < targetVolume - 0.05) {
                vol += 0.05;
                media.volume = vol;
            } else {
                clearInterval(fadeAudio);
                media.volume = targetVolume;
            }
        }, 50);
    }
};

// Radar global para silenciar al dar clic a cualquier control multimedia
window.addEventListener('click', function(e) {
    if (e.target.closest('#btn-master-play') || e.target.closest('.carousel-card')) {
        window.ValtaraMedia.silenciarTodo();
    }
}, true);

window.addEventListener('DOMContentLoaded', () => { 
    CoreEngine.init(); 
});
