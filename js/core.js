/**
 * ====================================================================================
 * BLOQUE 5: CORE ENGINE V38.2 (SISTEMA OPERATIVO Y ESCUDO TÉRMICO DE GRADO EMPRESARIAL)
 * ------------------------------------------------------------------------------------
 * Arquitectura ampliada con manejo de errores (Try/Catch), lógica Smart FABs para
 * ocultar botones flotantes dinámicamente, y un motor de triaje biomecánico 
 * con enciclopedia médica expandida para una experiencia de ultra-lujo.
 * ====================================================================================
 */

const CoreEngine = {
    init: function() {
        try {
            // 1. Inyectar la Enciclopedia (Textos masivos) en el HTML vacío
            if(window.ValtaraData) ValtaraData.renderAll();
            
            // 2. Inicializar Módulos de Interfaz y Hardware
            this.initModals();
            this.initSideMenu();
            this.initBodyMap();
            this.inyectarCSSAltaEficiencia(); 
            this.initThermalShield(); 
            
            // 3. Retirar la pantalla de carga inicial del navegador suavemente
            setTimeout(() => {
                document.body.classList.remove('system-loading');
            }, 300);
            
            console.log("🟢 CoreEngine: Inicialización completa y sistemas operativos en línea.");
        } catch (error) {
            console.error("🔴 CoreEngine Error: Fallo en la secuencia de arranque.", error);
        }
    },

    // ================================================================================
    // GESTIÓN DE SMART FABS (Botones Flotantes Inteligentes)
    // Oculta WhatsApp y Aura cuando hay modales o menús abiertos para limpiar la UI.
    // ================================================================================
    toggleSmartFabs: function(hide) {
        const fabs = document.getElementById('smart-fabs');
        if(fabs) {
            if(hide) {
                fabs.classList.add('fab-hidden');
                // Asegurar que no sean clickeables por accidente
                fabs.style.pointerEvents = 'none'; 
            } else {
                fabs.classList.remove('fab-hidden');
                fabs.style.pointerEvents = 'auto';
            }
        }
    },

    // ================================================================================
    // MOTOR TÉRMICO INTELIGENTE (Intersection Observer V2)
    // Apaga la GPU cuando el usuario no está viendo las animaciones del LOBBY.
    // ================================================================================
    initThermalShield: function() {
        try {
            const ambientBg = document.getElementById('ambient-bg');
            if(!ambientBg) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        ambientBg.style.display = 'block';
                    } else {
                        ambientBg.style.display = 'none';
                    }
                });
            }, { threshold: 0.01 });

            const homeSection = document.getElementById('view-home');
            if(homeSection) observer.observe(homeSection);
        } catch (error) {
            console.warn("⚠️ CoreEngine: El escudo térmico no pudo inicializarse.", error);
        }
    },

    // ================================================================================
    // ACCESIBILIDAD Y RENDIMIENTO CSS DINÁMICO
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

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') document.body.classList.add('eco-mode');
        });
        
        window.addEventListener('touchstart', () => {
            document.body.classList.remove('eco-mode');
        }, { passive: true });
    },

    // ================================================================================
    // CONTROLADOR DE MODALES MAESTRO (Con integración de Smart FABs)
    // ================================================================================
    initModals: function() {
        document.body.addEventListener('click', (e) => {
            
            // --- LÓGICA DE APERTURA ---
            const openBtn = e.target.closest('[aria-haspopup="dialog"]');
            if(openBtn) {
                let targetId = '';
                if(openBtn.id === 'top-a11y-btn') targetId = 'a11y-modal'; 
                if(openBtn.id === 'fab-audio') targetId = 'audio-modal';
                if(openBtn.id === 'fab-aura') targetId = 'aura-modal';

                const dialog = document.getElementById(targetId);
                if(dialog && !dialog.open) {
                    dialog.showModal(); 
                    document.body.style.overflow = 'hidden'; 
                    document.body.classList.add('pausar-ambiente'); 
                    
                    // Ocultamos los botones flotantes
                    this.toggleSmartFabs(true);
                    
                    const nav = document.getElementById('main-nav');
                    if(nav && nav.classList.contains('open')) {
                        document.getElementById('menu-close-btn').click();
                    }
                    if(window.A11yEngine) A11yEngine.announce(`Ventana abierta: ${dialog.getAttribute('aria-label')}`);
                }
            }

            // --- LÓGICA DE CIERRE ---
            const closeBtn = e.target.closest('[data-close]');
            if(closeBtn) {
                const targetId = closeBtn.getAttribute('data-close');
                const dialog = document.getElementById(targetId);
                if(dialog && dialog.open) {
                    dialog.style.opacity = '0';
                    dialog.style.transform = 'translate3d(0, 50px, 0) scale(0.95)';
                    
                    setTimeout(() => {
                        dialog.close();
                        dialog.style.opacity = '';
                        dialog.style.transform = '';
                        document.body.style.overflow = 'auto'; 
                        document.body.classList.remove('pausar-ambiente');
                        
                        // Recuperamos los botones flotantes al cerrar
                        this.toggleSmartFabs(false);
                        
                    }, 400);

                    if(window.A11yEngine) A11yEngine.announce(`Ventana cerrada.`);
                }
            }
        });
    },

    // ================================================================================
    // CONTROLADOR DEL PANEL LATERAL (Con integración de Smart FABs)
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
                document.body.classList.add('pausar-ambiente');
                
                // Limpiamos la pantalla ocultando los FABs
                this.toggleSmartFabs(true);
                
                if(window.A11yEngine) A11yEngine.announce("Panel de control abierto.");
            });

            closeBtn.addEventListener('click', () => {
                nav.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto'; 
                document.body.classList.remove('pausar-ambiente');
                
                // Restauramos los FABs
                this.toggleSmartFabs(false);
                
                if(window.A11yEngine) A11yEngine.announce("Panel cerrado.");
            });
        }
    },

    // ================================================================================
    // MOTOR DE TRIAJE EDUCATIVO (MAPA BIOMECÁNICO INTERACTIVO)
    // ================================================================================
    initBodyMap: function() {
        const mapContainer = document.getElementById('view-home');
        if(!mapContainer) return;

        mapContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.zone-btn');
            if(btn) {
                // Reiniciar estado visual de todos los botones
                document.querySelectorAll('.zone-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                    b.style.background = 'rgba(0,0,0,0.4)';
                    b.style.borderColor = 'rgba(0,255,255,0.15)';
                    b.style.transform = 'translateY(0)';
                    b.style.boxShadow = 'none';
                    const icon = b.querySelector('i');
                    if(icon) icon.style.color = 'var(--valtara-cian-brillante)';
                    const text = b.querySelector('span');
                    if(text) text.style.color = 'var(--valtara-blanco)';
                });
                
                // Activar el botón seleccionado con efecto Lujo
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

    // ================================================================================
    // ENCICLOPEDIA MÉDICA EXPANDIDA (Inyección Dinámica de Contenido)
    // Se ha ampliado el rigor científico de cada zona para educar al paciente.
    // ================================================================================
    updateZoneInfo: function(zoneId) {
        const data = {
            craneo: `
                <i class="fa-solid fa-head-side-virus" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Cráneo, Mandíbula y Rostro</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 1.5rem; font-weight: 300;">El estrés somatizado en el segmento superior es silencioso pero clínicamente devastador. Al someter el cerebro a presión constante, el tejido facial y muscular entra en estado de alarma permanente.</p>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-microscope"></i> 1. El Nervio Trigémino y la Fricción (Bruxismo)</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">El nervio trigémino controla los músculos de la masticación. Bajo niveles sostenidos de cortisol, el sistema nervioso simpático obliga a tus músculos maseteros a contraerse. Durante el sueño, puedes ejercer hasta 70kg de presión involuntaria por centímetro cuadrado, fracturando el esmalte dental y agotando la articulación temporomandibular (ATM).</p>
                    <details style="background: rgba(0,0,0,0.6); padding: 1.5rem; border-radius: 1rem; margin-top: 1.5rem; border-left: 4px solid var(--valtara-alerta); cursor: pointer;">
                        <summary style="font-weight: bold; color: var(--valtara-alerta); font-size: 1.1rem; outline: none;"><i class="fa-solid fa-triangle-exclamation"></i> Impacto Crónico a Largo Plazo</summary>
                        <p style="margin-top: 1rem; color: #ddd; font-size: 1rem; line-height: 1.7;">La falta de oxigenación tisular provoca micro-desgarros, migrañas en racimo, zumbidos auditivos (tinnitus) y un envejecimiento acelerado del tejido dérmico facial por restricción capilar.</p>
                    </details>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-prescription-bottle-medical"></i> 2. Protocolo de Restauración Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">Abordamos esta patología liberando la red miofascial del rostro y cuello, oxigenando el tejido y desactivando los puntos gatillo del masetero. Sugerimos la prescripción de la <strong>Rehabilitación Facial por Estrés Severo</strong>.</p>
                </details>
            `,
            cervical: `
                <i class="fa-solid fa-user-injured" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Cervicales, Nuca y Trapecios</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 1.5rem; font-weight: 300;">Conocida en biomecánica como "La Zona del Intelecto". Es el pilar maestro que conecta tu sistema neurológico central con el resto de la máquina biológica.</p>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-mobile-screen-button"></i> 1. El Síndrome Pandémico: "Text Neck"</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">La cabeza humana pesa en promedio 5kg en posición neutral. Sin embargo, al inclinar el cuello a 60 grados para interactuar con dispositivos móviles o monitores corporativos, la gravedad multiplica esta carga. Tu frágil columna cervical soporta hasta 27 kilos de presión isométrica constante, destrozando los discos intervertebrales.</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-dumbbell"></i> 2. Protocolo de Restauración Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">Es imperativo aplicar termoterapia profunda y descompresión de tejido profundo. Recomendamos el <strong>Masaje Deportivo y Descompresión Muscular</strong> para restablecer la elasticidad de los trapecios y escalenos.</p>
                </details>
            `,
            lumbar: `
                <i class="fa-solid fa-child" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Región Lumbar, Cadera y Ciática</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 1.5rem; font-weight: 300;">La bóveda central de tu biomecánica. Absorbe la fuerza de cada impacto que tu cuerpo genera contra el suelo. El sedentarismo de escritorio la está comprimiendo implacablemente.</p>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-bolt"></i> 1. Pinzamiento del Nervio Ciático</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">Estar sentado más de 6 horas diarias provoca el acortamiento del músculo psoas y piramidal. Cuando estos tejidos se inflaman, presionan directamente el nervio ciático, enviando descargas de dolor eléctrico que recorren desde el glúteo hasta la pantorrilla, incapacitando el movimiento natural.</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-person-praying"></i> 2. Protocolo de Restauración Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">Aplicamos tracciones avanzadas para separar milimétricamente las vértebras lumbares (L4-L5). Recomendamos el <strong>Masaje Tailandés de Descompresión Pasiva</strong> para alinear la cadera y liberar el tejido atrapado.</p>
                </details>
            `,
            linfa: `
                <i class="fa-solid fa-shoe-prints" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Sistema Linfático y Extremidades</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 1.5rem; font-weight: 300;">Las piernas albergan los músculos más grandes del cuerpo. Cuando falla el bombeo venoso, se convierten en reservorios de toxinas y líquidos intersticiales estancados.</p>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-droplet"></i> 1. Estancamiento Linfático y Pesadez</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">A diferencia del sistema circulatorio (que tiene un corazón para bombear), la linfa depende enteramente del movimiento muscular. Los viajes largos, los tacones y el estrés detienen este flujo. Esto genera inflamación severa (edema), celulitis por acumulación de adipocitos y una fatiga letárgica en las extremidades inferiores.</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-water"></i> 2. Protocolo de Restauración Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">Sugerimos dos abordajes: Para moldeo corporal profundo y reducción hídrica agresiva, el <strong>Masaje Reductivo Drenante</strong>. Para un enfoque suave e inmunológico, el <strong>Drenaje Linfático Manual Clínico</strong>.</p>
                </details>
            `
        };

        const htmlContent = data[zoneId];
        const display = document.getElementById('zone-display');
        
        if(htmlContent && display) {
            display.style.opacity = 0;
            display.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                display.innerHTML = htmlContent + `
                    <div style="text-align: center; margin-top: 2.5rem;">
                        <a href="https://wa.me/5213348572070" target="_blank" class="btn-primary" style="background: var(--valtara-whatsapp); border-color: var(--valtara-whatsapp); color: var(--valtara-negro-fondo); box-shadow: 0 1rem 3rem rgba(37,211,102,0.4); text-decoration: none;">
                            <i class="fa-brands fa-whatsapp"></i> Chatear con el Especialista
                        </a>
                    </div>
                `;
                display.style.opacity = 1;
                display.style.transform = 'translateY(0)';
                display.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, 300);
        }
    }
};

// ====================================================================================
// GUARDIÁN MAESTRO DE MEDIOS V2 (Blindado con Try/Catch y limpieza de intervalos)
// ====================================================================================
window.ValtaraMedia = {
    activeFades: {}, // Almacenamos las referencias a los intervalos para evitar cruces

    silenciarTodo: function(excepcion = null) {
        document.querySelectorAll('audio, video').forEach(media => {
            if (media !== excepcion && !media.paused) {
                this.fadeOut(media);
            }
        });
        
        // Pausar YouTube Iframes
        const iframes = document.querySelectorAll('iframe[src*="youtube.com"]');
        iframes.forEach(iframe => {
            try { 
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'); 
            } catch(e) { console.warn("Iframe no accesible", e); }
        });
    },

    fadeOut: function(media) {
        if(this.activeFades[media.src]) clearInterval(this.activeFades[media.src]);
        
        let vol = media.volume;
        this.activeFades[media.src] = setInterval(() => {
            if (vol > 0.05) {
                vol -= 0.05;
                try { media.volume = vol; } catch(e){}
            } else {
                clearInterval(this.activeFades[media.src]);
                media.pause();
                try { media.volume = 1; } catch(e){} 
            }
        }, 30); 
    },

    fadeIn: function(media, targetVolume = 1) {
        this.silenciarTodo(media); 
        if(this.activeFades[media.src]) clearInterval(this.activeFades[media.src]);

        try { media.volume = 0; } catch(e){}
        const playPromise = media.play();
        
        // Manejamos la promesa del Play para evitar errores en móviles
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                let vol = 0;
                this.activeFades[media.src] = setInterval(() => {
                    if (vol < targetVolume - 0.05) {
                        vol += 0.05;
                        try { media.volume = vol; } catch(e){}
                    } else {
                        clearInterval(this.activeFades[media.src]);
                        try { media.volume = targetVolume; } catch(e){}
                    }
                }, 50);
            }).catch(error => {
                console.log("Auto-play prevenido por el navegador. El usuario debe interactuar primero.");
            });
        }
    }
};

// Radar global ultra-rápido para silencio de medios (Pasivo para no trabar el scroll)
window.addEventListener('click', function(e) {
    if (e.target.closest('#btn-master-play') || e.target.closest('.carousel-card')) {
        window.ValtaraMedia.silenciarTodo();
    }
}, { capture: true, passive: true });

// Arranque del sistema Core
window.addEventListener('DOMContentLoaded', () => { 
    CoreEngine.init(); 
});
