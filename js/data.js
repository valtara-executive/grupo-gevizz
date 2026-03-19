/**
 * ====================================================================================
 * BLOQUE 4: LA ENCICLOPEDIA VALTARA (DATA & RENDER ENGINE)
 * Contiene todos los diccionarios de texto, catálogos y secciones de la SPA.
 * ====================================================================================
 */

window.ValtaraData = {
    /* --------------------------------------------------------------------------------
       1. SECCIÓN INICIO, TÓTEM Y MAPA CORPORAL
       -------------------------------------------------------------------------------- */
    home: `
        <div class="hero-view reveal">
            <i aria-hidden="true" class="fa-solid fa-leaf" style="font-size: 5rem; color: var(--valtara-oro); margin-bottom: 2rem; filter: drop-shadow(0 0 2rem rgba(242,201,76,0.5));"></i>
            <!-- El h1 se reemplaza dinámicamente por el saludo en user.js -->
            <h1>VALTARA</h1>
            <h2 class="hero-slogan">Executive Therapy & Biomechanics</h2>
            <p class="hero-desc">El éxito exige un cuerpo capaz de sostenerlo. En nuestro santuario en Paseo de la Reforma, decodificamos la tensión acumulada por la alta exigencia corporativa mediante ciencia anatómica profunda.</p>
            
            <div class="cortesia-box" id="cortesia-dinamica" style="margin-top: 3rem;">
                <i class="fa-solid fa-gem" style="font-size: 1.5rem; margin-right: 10px;"></i> Analizando privilegios corporativos...
            </div>
        </div>

        <div class="totem-section reveal">
            <h2 style="font-family: var(--font-accent); font-size: 3rem; color: var(--valtara-blanco);">La Experiencia Valtara</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-top: 1rem; font-weight: 300;">Conozca nuestras instalaciones en Reforma 195. Un refugio blindado acústicamente, diseñado para aislar su sistema nervioso del caos de la ciudad.</p>
            
            <div class="video-wrapper">
                <iframe src="https://www.youtube.com/embed/qmRr05954h4?rel=0" allowfullscreen aria-label="Video Documental Valtara"></iframe>
            </div>
            <!-- Botón de Galería eliminado a petición del cliente -->
        </div>

        <div class="body-map-container reveal">
            <div>
                <h3 style="font-family: var(--font-accent); color: var(--valtara-cian-fluor); font-size: 2.2rem; margin-bottom: 1.5rem; line-height: 1.2;"><i class="fa-solid fa-microscope"></i> Triaje Biomecánico</h3>
                <p style="color: var(--valtara-gris-texto); font-size: 1.05rem; margin-bottom: 2rem; line-height: 1.8;">Seleccione la zona de tensión muscular principal. Nuestro sistema diagnosticará el conflicto anatómico y prescribirá la intervención exacta.</p>
                <div class="body-zones">
                    <button class="zone-btn" data-zone="craneo" aria-pressed="false"><i class="fa-solid fa-head-side-virus"></i> Cráneo y Fascia Facial</button>
                    <button class="zone-btn" data-zone="cervical" aria-pressed="false"><i class="fa-solid fa-user-injured"></i> Cervicales y Trapecios</button>
                    <button class="zone-btn" data-zone="lumbar" aria-pressed="false"><i class="fa-solid fa-child"></i> Región Lumbar (Compresión)</button>
                    <button class="zone-btn" data-zone="linfa" aria-pressed="false"><i class="fa-solid fa-shoe-prints"></i> Drenaje Extremidades</button>
                </div>
            </div>
            <div class="zone-info" id="zone-display" aria-live="polite">
                <i class="fa-solid fa-person-dots-from-line" style="font-size: 3rem; color: var(--valtara-cian-fluor); margin-bottom: 1.5rem;"></i>
                <h4 style="font-size: 1.8rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">Esperando selección...</h4>
                <p style="color: var(--valtara-gris-claro); line-height: 1.8; font-size: 1.05rem; font-weight: 300;">El mapa corporal interactivo está listo para traducir su dolor en un diagnóstico estructural claro.</p>
            </div>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       2. CATÁLOGO DE RESTAURACIÓN BIOMECÁNICA
       -------------------------------------------------------------------------------- */
    restoration: `
        <h2 style="font-family: var(--font-accent); font-size: 3.5rem; text-align: center; color: var(--valtara-blanco); margin-bottom: 1rem;" class="reveal">Restauración Biomecánica</h2>
        <p style="text-align: center; color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 3rem; font-weight: 300;" class="reveal">Intervenciones clínicas y estéticas activas. Cada sesión incluye análisis postural.</p>
        
        <div class="grid-container grid-2-cols">
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper"><i class="fa-solid fa-dumbbell"></i></div>
                <h3>Masaje Deportivo y Descompresión</h3>
                <div class="card-meta-info"><span class="duracion"><i class="fa-solid fa-clock"></i> 60-90 Min</span><span class="precio">$949 MXN</span></div>
                <p class="marketing-text">Protocolo estructural intenso para profesionales con "armadura" de estrés. Utilizamos antebrazos, codos y ventosas de silicón médico (sin marcas) para derretir rigidez fascial.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" aria-label="Reservar Masaje Deportivo por WhatsApp"><i class="fa-brands fa-whatsapp"></i> Reservar Intervención</a>
            </article>
            
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-cian-fluor); color: var(--valtara-cian-fluor);"><i class="fa-solid fa-child-reaching"></i></div>
                <h3>Masaje Reductivo Estructural</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 50 Min</span><span class="precio" style="color: var(--valtara-cian-fluor);">$899 MXN</span></div>
                <p class="marketing-text">Intervención estética sin bisturí. Fricción térmica y Maderoterapia anatómica para romper nódulos de celulitis y acelerar el metabolismo linfático.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-cian-fluor); color: var(--valtara-negro-profundo); border-color: var(--valtara-cian-fluor);" aria-label="Reservar Masaje Reductivo por WhatsApp"><i class="fa-brands fa-whatsapp"></i> Reservar Intervención</a>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-purpura-aura); color: var(--valtara-purpura-aura);"><i class="fa-solid fa-crown"></i></div>
                <h3>Ritual Lomi Lomi Supremo</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 90 Min</span><span class="precio" style="color: var(--valtara-purpura-aura);">$1,419 MXN</span></div>
                <p class="marketing-text">Nuestra experiencia magna. Danza ininterrumpida de antebrazos que simulan el vaivén del océano. Induce ondas cerebrales Theta, apagando su mente del ruido.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-purpura-aura); color: var(--valtara-blanco); border-color: var(--valtara-purpura-aura);" aria-label="Reservar Ritual Lomi Lomi por WhatsApp"><i class="fa-brands fa-whatsapp"></i> Reservar Intervención</a>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: #ffaa00; color: #ffaa00;"><i class="fa-solid fa-candle-holder"></i></div>
                <h3>Masaje con Velas Térmicas</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 60 Min</span><span class="precio" style="color: #ffaa00;">$1,199 MXN</span></div>
                <p class="marketing-text">Técnica de sedación muscular. Vertemos manteca de karité tibia directamente sobre la piel. El calor derrite la tensión mecánica al instante, nutriendo la dermis.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: #ffaa00; color: var(--valtara-negro-profundo); border-color: #ffaa00;" aria-label="Reservar Masaje con Velas por WhatsApp"><i class="fa-brands fa-whatsapp"></i> Reservar Intervención</a>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-verde-ws); color: var(--valtara-verde-ws);"><i class="fa-solid fa-spa"></i></div>
                <h3>Masaje Holístico Integrativo</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 90 Min</span><span class="precio" style="color: var(--valtara-verde-ws);">$1,199 MXN</span></div>
                <p class="marketing-text">Fusión que integra la fluidez de la relajación y la precisión de movilizaciones suaves. Aborda al ser humano como una unidad inquebrantable tras crisis severas de ansiedad o luto.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-verde-ws); color: var(--valtara-negro-profundo); border-color: var(--valtara-verde-ws);" aria-label="Reservar Masaje Holístico por WhatsApp"><i class="fa-brands fa-whatsapp"></i> Reservar Intervención</a>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-blanco); color: var(--valtara-blanco);"><i class="fa-solid fa-person-praying"></i></div>
                <h3>Masaje Tailandés</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 90 Min</span><span class="precio" style="color: var(--valtara-blanco);">$1,449 MXN</span></div>
                <p class="marketing-text">Realizamos un "yoga asistido" pasivo basándonos en líneas de energía. Descomprime vértebras lumbares, estira las cadenas posteriores y lubrica articulaciones acartonadas por el sedentarismo.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-blanco); color: var(--valtara-negro-profundo); border-color: var(--valtara-blanco);" aria-label="Reservar Masaje Tailandés por WhatsApp"><i class="fa-brands fa-whatsapp"></i> Reservar Intervención</a>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       3. MANIFIESTO CODEX
       -------------------------------------------------------------------------------- */
    codex: `
        <div class="glass-card reveal" style="padding: 4rem 3rem;">
            <h2 style="font-family: var(--font-accent); font-size: 3rem; color: var(--valtara-oro); margin-bottom: 2rem; border-bottom: 1px solid rgba(242,201,76,0.3); padding-bottom: 1.5rem;">Manifiesto Codex Valtara</h2>
            <p style="font-size: 1.1rem; color: var(--valtara-gris-claro); line-height: 2; text-align: justify; margin-bottom: 1.5rem; font-weight: 300;">
                <span style="float: left; font-size: 5rem; font-family: var(--font-accent); color: var(--valtara-magenta-neon); line-height: 0.8; margin-right: 1rem; margin-top: 0.5rem;">E</span>n el umbral de la era moderna, el cuerpo humano se ha convertido en el depósito silencioso de una velocidad sin precedentes. El estrés no solo habita en la mente; se anuda en la fascia.
            </p>
            <p style="font-size: 1.1rem; color: var(--valtara-gris-claro); line-height: 2; text-align: justify; margin-bottom: 1.5rem; font-weight: 300;">
                Valtara nace de una premisa disruptiva: <strong>el bienestar no es un estado pasivo, es una obra de ingeniería constante.</strong> Aquí, la compasión milenaria se encuentra con el rigor clínico para restaurar la arquitectura humana.
            </p>
            
            <h3 style="color: var(--valtara-cian-fluor); font-size: 1.8rem; font-family: var(--font-accent); margin-top: 3rem; margin-bottom: 1.5rem;">El ADN Corporativo</h3>
            <ul style="color: var(--valtara-gris-texto); font-size: 1.05rem; line-height: 2; list-style: none;">
                <li style="margin-bottom: 1rem;"><i class="fa-solid fa-check" style="color:var(--valtara-verde-ws); margin-right:10px;"></i> <strong>Rigor Clínico:</strong> No hay movimiento sin fundamento anatómico.</li>
                <li style="margin-bottom: 1rem;"><i class="fa-solid fa-check" style="color:var(--valtara-verde-ws); margin-right:10px;"></i> <strong>Neutralidad Ética:</strong> Somos un refugio libre de juicios.</li>
                <li style="margin-bottom: 1rem;"><i class="fa-solid fa-check" style="color:var(--valtara-verde-ws); margin-right:10px;"></i> <strong>Compasión Activa:</strong> El tacto es nuestra tecnología más avanzada.</li>
            </ul>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       4. CIENCIA Y VIDEOTECA (Sin video de aromaterapia)
       -------------------------------------------------------------------------------- */
    science: `
        <h2 style="font-family: var(--font-accent); font-size: 3.5rem; text-align: center; color: var(--valtara-blanco); margin-bottom: 1rem;" class="reveal">Biblioteca Científica</h2>
        <p style="text-align: center; color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 3rem; font-weight: 300;" class="reveal">Videoteca de divulgación neurobiológica y botánica.</p>
        
        <div class="grid-container grid-2-cols" style="display:flex; justify-content:center;">
            <!-- Video de Aromaterapia Eliminado -->
            
            <article class="glass-card tilt-card reveal" style="max-width: 500px; width: 100%;">
                <i class="fa-brands fa-youtube" style="font-size: 4rem; color: #ff0000; text-align: center; margin-bottom: 1.5rem; filter: drop-shadow(0 0 1rem rgba(255,0,0,0.4));"></i>
                <h3 style="font-size: 1.6rem;">Chocolaterapia: ¿Lujo o Medicina?</h3>
                <p class="marketing-text" style="text-align: center;">Exploramos el uso del cacao desde los Olmecas. Entienda cómo la anandamida y la teobromina regeneran la piel y combaten agresivamente el estrés celular oxidativo.</p>
                <a href="https://youtu.be/Uc5wVxOW46o" target="_blank" class="btn-agenda-ahora" style="background: transparent; border-color: #ff0000; color: #ff0000;"><i class="fa-solid fa-play"></i> Ver Documental</a>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       5. ERGONOMÍA UNIVERSAL
       -------------------------------------------------------------------------------- */
    ergonomics: `
        <h2 style="font-family: var(--font-accent); font-size: 3.5rem; text-align: center; color: var(--valtara-blanco); margin-bottom: 1rem;" class="reveal">Ergonomía Universal</h2>
        <p style="text-align: center; color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 3rem; font-weight: 300;" class="reveal">Inclusión terapéutica y corrección postural activa.</p>

        <div class="grid-container grid-2-cols">
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-verde-ws); color: var(--valtara-verde-ws);"><i class="fa-solid fa-wheelchair"></i></div>
                <h3 style="font-size: 1.6rem;">Inclusión sin Barreras</h3>
                <p class="marketing-text">Adaptamos la sanación de espalda realizándola directamente sobre silla de ruedas si el paciente no puede subir a la camilla clínica.</p>
            </article>
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-oro); color: var(--valtara-oro);"><i class="fa-solid fa-desktop"></i></div>
                <h3 style="font-size: 1.6rem;">Regla del 90/90</h3>
                <p class="marketing-text">Mantenga rodillas y cadera a 90 grados exactos. El borde superior de su monitor corporativo debe estar siempre a la altura de sus ojos.</p>
            </article>
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-rojo-alerta); color: var(--valtara-rojo-alerta);"><i class="fa-solid fa-mobile-screen-button"></i></div>
                <h3 style="font-size: 1.6rem;">El Peligro del "Text Neck"</h3>
                <p class="marketing-text">Por cada centímetro que inclina la cabeza hacia abajo para ver el celular, la fuerza sobre sus cervicales se multiplica, soportando hasta 27 kilos constantes.</p>
            </article>
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-purpura-aura); color: var(--valtara-purpura-aura);"><i class="fa-solid fa-brain"></i></div>
                <h3 style="font-size: 1.6rem;">Neurodivergencia</h3>
                <p class="marketing-text">Sabemos que los sistemas nerviosos operan distinto. Aceptamos sugerencias para realizar ajustes razonables de sensibilidad (luz, aroma, sonido) en su sesión.</p>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       6. MARCO LEGAL
       -------------------------------------------------------------------------------- */
    legal: `
        <h2 style="font-family: var(--font-accent); font-size: 3.5rem; text-align: center; color: var(--valtara-blanco); margin-bottom: 1rem;" class="reveal">Marco Legal</h2>
        <div class="glass-card reveal" style="text-align: center; max-width: 700px; margin: 0 auto;">
            <i class="fa-solid fa-shield-halved" style="font-size: 4rem; color: var(--valtara-oro); margin-bottom: 1.5rem;"></i>
            <h3 style="font-size: 1.8rem; margin-bottom: 1rem;">Aviso de Privacidad Digital (LFPDPPP)</h3>
            <p class="marketing-text" style="text-align: center;">
                En Valtara y Grupo Gevizz, respetamos su entorno digital. Almacenamos su nombre y preferencias localmente en su dispositivo. <strong>No cruzamos sus datos para ventas a terceros ni rastreamos su ubicación GPS.</strong> Su navegación es estrictamente privada y auditable.
            </p>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       7. MEGA FOOTER
       -------------------------------------------------------------------------------- */
    footer: `
        <div class="footer-grid">
            <div class="footer-col">
                <h4 style="font-size: 2.2rem; letter-spacing: 0.2rem;">VALTARA</h4>
                <p style="font-style: italic; color: var(--valtara-oro-suave); font-size: 1.1rem; margin-bottom: 1.5rem;">Executive Therapy & Biomechanics</p>
                <p style="font-size: 0.95rem;">Plataforma SPA Modular V 10.2 Sovereign. Arquitectura de software desarrollada in-house por Grupo Gevizz.</p>
            </div>
            <div class="footer-col">
                <h4>Logística</h4>
                <a href="https://maps.app.goo.gl/zvrD44iVseA7zVQZ9" target="_blank" aria-label="Abrir mapa de ubicación"><i class="fa-solid fa-map-location-dot" style="color:var(--valtara-oro); width:25px;"></i> Reforma 195, Piso 3. CDMX.</a>
                <a href="tel:+523348572070" aria-label="Llamar por teléfono"><i class="fa-solid fa-phone" style="color:var(--valtara-oro); width:25px;"></i> 33 4857 2070 (Concierge)</a>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 GRUPO GEVIZZ S.A.S. DE C.V. Todos los derechos intelectuales reservados.
        </div>
    `,

    /* --------------------------------------------------------------------------------
       MÉTODO INYECTOR (RENDER)
       -------------------------------------------------------------------------------- */
    renderAll: function() {
        document.getElementById('view-home').innerHTML = this.home;
        document.getElementById('view-restoration').innerHTML = this.restoration;
        document.getElementById('view-codex').innerHTML = this.codex;
        document.getElementById('view-science').innerHTML = this.science;
        document.getElementById('view-ergonomics').innerHTML = this.ergonomics;
        document.getElementById('view-legal').innerHTML = this.legal;
        document.getElementById('main-footer').innerHTML = this.footer;
    }
};
