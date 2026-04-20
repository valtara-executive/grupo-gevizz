/**
 * ====================================================================================
 * BLOQUE 5: CORE ENGINE V38.3 (SISTEMA OPERATIVO Y ESCUDO TÉRMICO VISUAL)
 * ------------------------------------------------------------------------------------
 * Arquitectura ampliada con manejo de errores (Try/Catch), lógica Smart FABs para
 * ocultar botones flotantes dinámicamente, y un motor de triaje biomecánico.
 * El Escudo Térmico ahora CONGELA el fondo en lugar de borrarlo, manteniendo el lujo.
 * ====================================================================================
 */

const CoreEngine = {
    init: function() {
        try {
            if(window.ValtaraData) ValtaraData.renderAll();
            
            this.initModals();
            this.initSideMenu();
            this.initBodyMap();
            this.inyectarCSSAltaEficiencia(); 
            this.initThermalShield(); 
            
            setTimeout(() => {
                document.body.classList.remove('system-loading');
            }, 300);
            
            console.log("🟢 CoreEngine: Inicialización completa. Interfaz de Lujo activa.");
        } catch (error) {
            console.error("🔴 CoreEngine Error: Fallo en la secuencia de arranque.", error);
        }
    },

    // ================================================================================
    // GESTIÓN DE SMART FABS (Botones Flotantes Inteligentes)
    // ================================================================================
    toggleSmartFabs: function(hide) {
        const fabs = document.getElementById('smart-fabs');
        if(fabs) {
            if(hide) {
                fabs.classList.add('fab-hidden');
                fabs.style.pointerEvents = 'none'; 
            } else {
                fabs.classList.remove('fab-hidden');
                fabs.style.pointerEvents = 'auto';
            }
        }
    },

    // ================================================================================
    // MOTOR TÉRMICO INTELIGENTE (LA REPARACIÓN DE LA PANTALLA NEGRA)
    // Ahora CONGELA la animación en lugar de ocultarla, preservando el fondo hermoso.
    // ================================================================================
    initThermalShield: function() {
        try {
            const ambientBg = document.getElementById('ambient-bg');
            if(!ambientBg) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        // El usuario está arriba: Descongelamos las luces
                        document.body.classList.remove('pausar-ambiente');
                    } else {
                        // El usuario bajó: Congelamos las luces, PERO NO LAS BORRAMOS.
                        // El fondo se sigue viendo hermoso en todo momento.
                        document.body.classList.add('pausar-ambiente');
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
            /* Regla crucial para el Escudo Térmico */
            body.pausar-ambiente .ambient-engine * {
                animation-play-state: paused !important;
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
    // CONTROLADOR DE MODALES MAESTRO (Integrado con Smart Fabs)
    // ================================================================================
    initModals: function() {
        document.body.addEventListener('click', (e) => {
            
            // --- ABRIR ---
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
                    
                    this.toggleSmartFabs(true); // Oculta WhatsApp/Aura
                    
                    const nav = document.getElementById('main-nav');
                    if(nav && nav.classList.contains('open')) {
                        document.getElementById('menu-close-btn').click();
                    }
                    if(window.A11yEngine) A11yEngine.announce(`Ventana abierta: ${dialog.getAttribute('aria-label')}`);
                }
            }

            // --- CERRAR ---
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
                        
                        this.toggleSmartFabs(false); // Regresa WhatsApp/Aura
                        
                    }, 400);

                    if(window.A11yEngine) A11yEngine.announce(`Ventana cerrada.`);
                }
            }
        });
    },

    // ================================================================================
    // CONTROLADOR DEL PANEL LATERAL
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
                
                this.toggleSmartFabs(true); // Limpiamos pantalla
                
                if(window.A11yEngine) A11yEngine.announce("Panel de control abierto.");
            });

            closeBtn.addEventListener('click', () => {
                nav.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto'; 
                document.body.classList.remove('pausar-ambiente');
                
                this.toggleSmartFabs(false); // Restauramos pantalla
                
                if(window.A11yEngine) A11yEngine.announce("Panel cerrado.");
            });
        }
    },

    // ================================================================================
    // MOTOR DE TRIAJE EDUCATIVO
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
                    b.style.background = 'rgba(0,0,0,0.4)';
                    b.style.borderColor = 'rgba(0,255,255,0.15)';
                    b.style.transform = 'translateY(0)';
                    b.style.boxShadow = 'none';
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
                <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 1.5rem; font-weight: 300;">El estrés somatizado en el segmento superior es silencioso pero clínicamente devastador.</p>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-microscope"></i> 1. El Nervio Trigémino y el Bruxismo</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">El nervio trigémino controla los músculos de la masticación. Bajo niveles sostenidos de cortisol, ejerces hasta 70kg de presión involuntaria mientras duermes, fracturando el esmalte dental.</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-prescription-bottle-medical"></i> 2. La Solución Clínica Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">Sugerimos la prescripción de la <strong>Rehabilitación Facial por Estrés Severo</strong>.</p>
                </details>
            `,
            cervical: `
                <i class="fa-solid fa-user-injured" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Cervicales, Nuca y Trapecios</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 1.5rem; font-weight: 300;">Conocida en biomecánica como "La Zona del Intelecto". Es el pilar maestro de la máquina biológica.</p>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-mobile-screen-button"></i> 1. El Síndrome Pandémico: "Text Neck"</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">Al inclinar el cuello a 60 grados para ver el móvil, tu columna soporta 27 kilos de presión, destrozando los discos intervertebrales.</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-dumbbell"></i> 2. La Solución Clínica Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">Recomendamos el <strong>Masaje Deportivo y Descompresión Muscular</strong>.</p>
                </details>
            `,
            lumbar: `
                <i class="fa-solid fa-child" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Región Lumbar y Ciática</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 1.5rem; font-weight: 300;">La bóveda central biomecánica. El sedentarismo de escritorio la comprime implacablemente.</p>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-bolt"></i> 1. Pinzamiento del Nervio Ciático</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">Estar sentado más de 6 horas acorta el músculo psoas, presionando el nervio ciático y enviando descargas de dolor eléctrico a la pantorrilla.</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-person-praying"></i> 2. La Solución Clínica Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">Recomendamos el <strong>Masaje Tailandés de Descompresión Pasiva</strong>.</p>
                </details>
            `,
            linfa: `
                <i class="fa-solid fa-shoe-prints" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Sistema Linfático y Extremidades</h4>
                <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 1.5rem; font-weight: 300;">Cuando falla el bombeo venoso, las piernas se convierten en reservorios de toxinas.</p>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(0,255,255,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-cian-brillante); outline: none;"><i class="fa-solid fa-droplet"></i> 1. Estancamiento Linfático</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">La linfa depende del movimiento. Los viajes largos y el estrés detienen el flujo, generando inflamación severa y celulitis.</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; border: 1px solid rgba(242,201,76,0.3); cursor: pointer; transition: 0.3s; text-align: left;">
                    <summary style="font-weight: 900; font-size: 1.2rem; color: var(--valtara-oro); outline: none;"><i class="fa-solid fa-water"></i> 2. La Solución Clínica Valtara</summary>
                    <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.8;">Para reducción hídrica, <strong>Masaje Reductivo Drenante</strong>. Para un enfoque suave, el <strong>Drenaje Linfático Manual</strong>.</p>
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
                            <i class="fa-brands fa-whatsapp"></i> Chatear Especialista
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
// GUARDIÁN MAESTRO DE MEDIOS V2 (Blindado con Try/Catch)
// ====================================================================================
window.ValtaraMedia = {
    activeFades: {}, 

    silenciarTodo: function(excepcion = null) {
        document.querySelectorAll('audio, video').forEach(media => {
            if (media !== excepcion && !media.paused) {
                this.fadeOut(media);
            }
        });
        
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
                console.log("Auto-play prevenido por el navegador.");
            });
        }
    }
};

window.addEventListener('click', function(e) {
    if (e.target.closest('#btn-master-play') || e.target.closest('.carousel-card')) {
        window.ValtaraMedia.silenciarTodo();
    }
}, { capture: true, passive: true });

window.addEventListener('DOMContentLoaded', () => { 
    CoreEngine.init(); 
});
