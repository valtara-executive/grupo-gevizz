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
            <i aria-hidden="true" class="fa-solid fa-leaf" style="font-size: 6rem; color: var(--valtara-oro); margin-bottom: 2rem; filter: drop-shadow(0 0 2rem rgba(242,201,76,0.5));"></i>
            <h1>VALTARA</h1>
            <h2 class="hero-slogan">Executive Therapy & Biomechanics</h2>
            <p class="hero-desc">El éxito exige un cuerpo capaz de sostenerlo. En nuestro santuario en Paseo de la Reforma, decodificamos la tensión acumulada por la alta exigencia corporativa mediante ciencia anatómica profunda.</p>
            
            <div class="btn-secondary" id="cortesia-dinamica" style="margin-top: 3rem; padding: 1.5rem 3rem; border-color: var(--valtara-oro); color: var(--valtara-oro-suave); font-size: 1.1rem; border-radius: 3rem; font-weight: bold; box-shadow: 0 1rem 3rem rgba(242,201,76,0.15);">
                <i class="fa-solid fa-gem" style="font-size: 1.5rem;"></i> Analizando privilegios corporativos...
            </div>
        </div>

        <div class="totem-section reveal">
            <h2 style="font-family: var(--font-accent); font-size: 3.5rem; color: var(--valtara-blanco);">La Experiencia Valtara</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.3rem; margin-top: 1.5rem; font-weight: 300;">Conozca nuestras instalaciones en Reforma 195. Un refugio blindado acústicamente, diseñado para aislar su sistema nervioso del caos de la ciudad.</p>
            
            <div class="video-wrapper">
                <iframe src="https://www.youtube.com/embed/qmRr05954h4?rel=0" allowfullscreen aria-label="Video Documental Valtara"></iframe>
            </div>

            <a href="https://valtara-executive.blogspot.com/2026/03/conoce-nuestras-instalaciones-en-reforma.html" target="_blank" class="btn-agenda-ahora" style="width: auto; background: transparent; border: 1px solid var(--valtara-oro); color: var(--valtara-oro); padding: 1.5rem 4rem;">
                <i class="fa-solid fa-building"></i> Ver Galería de la Sede
            </a>
        </div>

        <div class="body-map-container reveal">
            <div>
                <h3 style="font-family: var(--font-accent); color: var(--valtara-cian-fluor); font-size: 2.8rem; margin-bottom: 2rem; line-height: 1.2;"><i class="fa-solid fa-microscope"></i> Triaje Biomecánico</h3>
                <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 3rem; line-height: 2;">Seleccione la zona de tensión muscular principal. Nuestro sistema diagnosticará el conflicto anatómico y prescribirá la intervención exacta.</p>
                <div class="body-zones">
                    <button class="zone-btn" data-zone="craneo" aria-pressed="false"><i class="fa-solid fa-head-side-virus"></i> Cráneo y Fascia Facial</button>
                    <button class="zone-btn" data-zone="cervical" aria-pressed="false"><i class="fa-solid fa-user-injured"></i> Cervicales y Trapecios</button>
                    <button class="zone-btn" data-zone="lumbar" aria-pressed="false"><i class="fa-solid fa-child"></i> Región Lumbar (Compresión)</button>
                    <button class="zone-btn" data-zone="linfa" aria-pressed="false"><i class="fa-solid fa-shoe-prints"></i> Drenaje Extremidades</button>
                </div>
            </div>
            <div class="zone-info" id="zone-display" aria-live="polite">
                <i class="fa-solid fa-person-dots-from-line" style="font-size: 4rem; color: var(--valtara-cian-fluor); margin-bottom: 2rem;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);">Esperando selección...</h4>
                <p style="color: var(--valtara-gris-claro); line-height: 2; font-size: 1.2rem; font-weight: 300;">El mapa corporal interactivo está listo para traducir su dolor en un diagnóstico estructural claro.</p>
            </div>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       2. CATÁLOGO DE RESTAURACIÓN BIOMECÁNICA (TARJETAS)
       -------------------------------------------------------------------------------- */
    restoration: `
        <h2 style="font-family: var(--font-accent); font-size: 4rem; text-align: center; color: var(--valtara-blanco); margin-bottom: 1.5rem;" class="reveal">Restauración Biomecánica</h2>
        <p style="text-align: center; color: var(--valtara-gris-texto); font-size: 1.3rem; margin-bottom: 4rem; font-weight: 300;" class="reveal">Intervenciones clínicas y estéticas activas. Cada sesión incluye análisis postural.</p>
        
        <div class="grid-container grid-2-cols">
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper"><i class="fa-solid fa-dumbbell"></i></div>
                <h3>Masaje Deportivo y Descompresión</h3>
                <div class="card-meta-info"><span class="duracion"><i class="fa-solid fa-clock"></i> 60-90 Min</span><span class="precio">$949 MXN</span></div>
                <p class="marketing-text">Protocolo estructural intenso para profesionales con "armadura" de estrés. Utilizamos antebrazos, codos y ventosas de silicón médico (sin marcas) para derretir la rigidez fascial y oxigenar la sangre oscura.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" aria-label="Reservar Masaje Deportivo por WhatsApp"><i class="fa-brands fa-whatsapp"></i> Reservar Intervención</a>
            </article>
            
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-cian-fluor); color: var(--valtara-cian-fluor);"><i class="fa-solid fa-child-reaching"></i></div>
                <h3>Masaje Reductivo Estructural</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 50 Min</span><span class="precio" style="color: var(--valtara-cian-fluor);">$899 MXN</span></div>
                <p class="marketing-text">Intervención estética de alto impacto sin bisturí. Fricción térmica con geles activos y Maderoterapia anatómica para romper nódulos de celulitis y acelerar el metabolismo local linfático.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-cian-fluor); color: var(--valtara-negro-profundo); border-color: var(--valtara-cian-fluor);" aria-label="Reservar Masaje Reductivo por WhatsApp"><i class="fa-brands fa-whatsapp"></i> Reservar Intervención</a>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-purpura-aura); color: var(--valtara-purpura-aura);"><i class="fa-solid fa-crown"></i></div>
                <h3>Ritual Lomi Lomi Supremo</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 90 Min</span><span class="precio" style="color: var(--valtara-purpura-aura);">$1,419 MXN</span></div>
                <p class="marketing-text">Nuestra experiencia magna. Danza ininterrumpida de antebrazos que simulan el vaivén del océano. Induce ondas cerebrales Theta, apagando su mente del ruido corporativo.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-purpura-aura); color: var(--valtara-blanco); border-color: var(--valtara-purpura-aura);" aria-label="Reservar Ritual Lomi Lomi por WhatsApp"><i class="fa-brands fa-whatsapp"></i> Reservar Intervención</a>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: #ffaa00; color: #ffaa00;"><i class="fa-solid fa-candle-holder"></i></div>
                <h3>Masaje con Velas Térmicas</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 60 Min</span><span class="precio" style="color: #ffaa00;">$1,199 MXN</span></div>
                <p class="marketing-text">Técnica de sedación muscular profunda. Vertemos manteca de karité tibia directamente sobre la piel. El calor derrite la tensión mecánica al instante, nutriendo la dermis.</p>
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
       3. MANIFIESTO CODEX VALTARA
       -------------------------------------------------------------------------------- */
    codex: `
        <div class="glass-card reveal" style="padding: 6rem 5rem;">
            <h2 style="font-family: var(--font-accent); font-size: 4rem; color: var(--valtara-oro); margin-bottom: 3rem; border-bottom: 1px solid rgba(242,201,76,0.3); padding-bottom: 2rem;">Manifiesto Codex Valtara</h2>
            
            <p style="font-size: 1.25rem; color: var(--valtara-gris-claro); line-height: 2.2; text-align: justify; margin-bottom: 2rem; font-weight: 300;">
                <span style="float: left; font-size: 6rem; font-family: var(--font-accent); color: var(--valtara-magenta-neon); line-height: 0.8; margin-right: 1.5rem; margin-top: 0.5rem; text-shadow: 0 0 2rem rgba(247,37,133,0.5);">E</span>n el umbral de la era moderna, el cuerpo humano se ha convertido en el depósito silencioso de una velocidad sin precedentes. El estrés, la responsabilidad corporativa y la exigencia del alto rendimiento no solo habitan en la mente; se esculpen en el tejido, se anudan en la fascia y se solidifican en la postura.
            </p>
            <p style="font-size: 1.25rem; color: var(--valtara-gris-claro); line-height: 2.2; text-align: justify; margin-bottom: 2rem; font-weight: 300;">
                Valtara nace de una premisa disruptiva: <strong>el bienestar no es un estado pasivo, es una obra de ingeniería constante.</strong> No entendemos el masaje como un lujo efímero, sino como una intervención biomecánica necesaria. Aquí, la compasión de las tradiciones milenarias se encuentra con el rigor de la anatomía clínica para restaurar la arquitectura original del ser humano.
            </p>
            
            <h3 style="color: var(--valtara-cian-fluor); font-size: 2.2rem; font-family: var(--font-accent); margin-top: 4rem; margin-bottom: 2rem;">I. Identidad Institucional: El Ecosistema Gevizz</h3>
            <p style="font-size: 1.25rem; color: var(--valtara-gris-claro); line-height: 2.2; text-align: justify; margin-bottom: 2rem; font-weight: 300;">
                Detrás de cada protocolo de Valtara se encuentra el pensamiento estratégico de Grupo Gevizz S.A.S., una entidad dedicada a la creación de ecosistemas de bienestar que fusionan el desarrollo tecnológico con la profundidad del contacto humano. Grupo Gevizz es el arquitecto de la infraestructura ética y técnica que permite a Valtara operar bajo los más altos estándares.
            </p>
            
            <h4 style="color: var(--valtara-oro-suave); font-size: 1.8rem; margin-top: 3rem; margin-bottom: 1.5rem;">El ADN Corporativo: Nuestros Valores</h4>
            <ul style="color: var(--valtara-gris-texto); font-size: 1.2rem; line-height: 2.2; margin-top: 2rem; list-style: none;">
                <li style="margin-bottom: 1.5rem;"><i class="fa-solid fa-check" style="color:var(--valtara-verde-ws); margin-right:15px; font-size: 1.5rem;"></i> <strong>Rigor Clínico:</strong> No hay movimiento sin fundamento. Cada técnica aplicada es el resultado de un estudio anatómico exhaustivo.</li>
                <li style="margin-bottom: 1.5rem;"><i class="fa-solid fa-check" style="color:var(--valtara-verde-ws); margin-right:15px; font-size: 1.5rem;"></i> <strong>Neutralidad Ética:</strong> Somos un refugio. Garantizamos un espacio de absoluta aceptación, donde el juicio es inexistente.</li>
                <li style="margin-bottom: 1.5rem;"><i class="fa-solid fa-check" style="color:var(--valtara-verde-ws); margin-right:15px; font-size: 1.5rem;"></i> <strong>Transparencia Radical:</strong> Creemos en el paciente informado. Educamos a nuestra comunidad sobre las raíces de su tensión.</li>
                <li style="margin-bottom: 1.5rem;"><i class="fa-solid fa-check" style="color:var(--valtara-verde-ws); margin-right:15px; font-size: 1.5rem;"></i> <strong>Compasión Activa:</strong> El tacto es nuestra tecnología más avanzada. Detrás de cada contractura hay una historia que merece honor.</li>
            </ul>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       4. BIBLIOTECA CIENTÍFICA (VIDEOS Y BOTÁNICA)
       -------------------------------------------------------------------------------- */
    science: `
        <h2 style="font-family: var(--font-accent); font-size: 4rem; text-align: center; color: var(--valtara-blanco); margin-bottom: 1.5rem;" class="reveal">Biblioteca Científica</h2>
        <p style="text-align: center; color: var(--valtara-gris-texto); font-size: 1.3rem; margin-bottom: 4rem; font-weight: 300;" class="reveal">Videoteca de divulgación neurobiológica y botánica producida por Valtara.</p>
        
        <div class="grid-container grid-2-cols">
            <article class="glass-card tilt-card reveal">
                <i class="fa-brands fa-youtube" style="font-size: 4.5rem; color: #ff0000; text-align: center; margin-bottom: 2rem; filter: drop-shadow(0 0 1rem rgba(255,0,0,0.4));"></i>
                <h3 style="font-size: 1.8rem;">La Neurociencia del Aroma</h3>
                <p class="marketing-text" style="text-align: center;">Descubra cómo el sistema límbico procesa las moléculas olfativas de nuestros aceites esenciales para alterar instantáneamente el estado emocional y reducir el cortisol.</p>
                <a href="https://youtu.be/qmRr05954h4" target="_blank" class="btn-agenda-ahora" style="background: transparent; border-color: #ff0000; color: #ff0000;"><i class="fa-solid fa-play"></i> Ver Documental</a>
            </article>

            <article class="glass-card tilt-card reveal">
                <i class="fa-brands fa-youtube" style="font-size: 4.5rem; color: #ff0000; text-align: center; margin-bottom: 2rem; filter: drop-shadow(0 0 1rem rgba(255,0,0,0.4));"></i>
                <h3 style="font-size: 1.8rem;">Chocolaterapia: ¿Lujo o Medicina?</h3>
                <p class="marketing-text" style="text-align: center;">Exploramos el uso del cacao desde los Olmecas. Entienda cómo la anandamida y la teobromina regeneran la piel y combaten agresivamente el estrés oxidativo celular.</p>
                <a href="https://youtu.be/Uc5wVxOW46o" target="_blank" class="btn-agenda-ahora" style="background: transparent; border-color: #ff0000; color: #ff0000;"><i class="fa-solid fa-play"></i> Ver Documental</a>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       5. ERGONOMÍA UNIVERSAL (INCLUSIÓN)
       -------------------------------------------------------------------------------- */
    ergonomics: `
        <h2 style="font-family: var(--font-accent); font-size: 4rem; text-align: center; color: var(--valtara-blanco); margin-bottom: 1.5rem;" class="reveal">Ergonomía Universal</h2>
        <p style="text-align: center; color: var(--valtara-gris-texto); font-size: 1.3rem; margin-bottom: 4rem; font-weight: 300;" class="reveal">Educación postural activa e inclusión terapéutica sin barreras.</p>
        
        <div class="grid-container grid-2-cols">
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-verde-ws); color: var(--valtara-verde-ws);"><i class="fa-solid fa-wheelchair"></i></div>
                <h3 style="font-size: 1.8rem;">Usuarios de Silla de Ruedas</h3>
                <p class="marketing-text"><strong>El bienestar no debe tener barreras.</strong> Para pacientes con movilidad reducida que no pueden subir a una camilla, adaptamos la sanación de espalda realizándola directamente sobre su propia silla o ajustando la postura en camilla.</p>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-oro); color: var(--valtara-oro);"><i class="fa-solid fa-desktop"></i></div>
                <h3 style="font-size: 1.8rem;">La Regla del 90/90</h3>
                <p class="marketing-text">Al estar sentado, mantenga rodillas y cadera en un ángulo de 90 grados exactos. El borde superior de su monitor debe estar a la altura horizontal de sus ojos. Esta es la base para prevenir la compresión de los discos lumbares en la oficina.</p>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-rojo-alerta); color: var(--valtara-rojo-alerta);"><i class="fa-solid fa-mobile-screen-button"></i></div>
                <h3 style="font-size: 1.8rem;">El Peligro del "Text Neck"</h3>
                <p class="marketing-text">Una cabeza humana promedio pesa 5 kilos. Sin embargo, <strong>por cada centímetro que inclina la cabeza hacia abajo</strong> para ver el celular, la fuerza sobre sus cervicales se multiplica, forzando a su cuello a soportar hasta 27 kilos constantes.</p>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-purpura-aura); color: var(--valtara-purpura-aura);"><i class="fa-solid fa-brain"></i></div>
                <h3 style="font-size: 1.8rem;">Ajustes para Neurodivergencia</h3>
                <p class="marketing-text">Sabemos que los sistemas nerviosos operan distinto. Aceptamos sugerencias para realizar ajustes razonables de sensibilidad (como anular la aromaterapia o evitar música). Haremos todo lo posible por adaptar su entorno.</p>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       6. MARCO LEGAL Y PRIVACIDAD LFPDPPP
       -------------------------------------------------------------------------------- */
    legal: `
        <h2 style="font-family: var(--font-accent); font-size: 4rem; text-align: center; color: var(--valtara-blanco); margin-bottom: 1.5rem;" class="reveal">Marco Legal Institucional</h2>
        <p style="text-align: center; color: var(--valtara-gris-texto); font-size: 1.3rem; margin-bottom: 4rem; font-weight: 300;" class="reveal">Transparencia corporativa absoluta. Estatutos y protección de datos.</p>
        
        <div class="grid-container grid-3-cols">
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-oro);"><i class="fa-solid fa-graduation-cap"></i></div>
                <h3 style="font-size: 1.5rem;">Título Honorífico SISAE</h3>
                <p class="marketing-text">Reconocimiento Elite que avala formación sobresaliente en cultura física y salud. (Registro de marca 2676866).</p>
            </article>
            
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-cian-fluor);"><i class="fa-solid fa-id-card"></i></div>
                <h3 style="font-size: 1.5rem;">Cédula de Identidad REPS</h3>
                <p class="marketing-text">Faculta legalmente para ejercer masoterapia (Art. 5to). Serie A, Folio 854878 (Reg. Público de Salud).</p>
            </article>
            
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-verde-ws);"><i class="fa-solid fa-scroll"></i></div>
                <h3 style="font-size: 1.5rem;">Diplomado en Masoterapia</h3>
                <p class="marketing-text">Aprobación teórica y práctica del 100% de créditos académicos. Registro RAGP-610410-8X8-0005.</p>
            </article>
        </div>

        <div class="glass-card reveal" style="margin-top: 4rem; text-align: center;">
            <i class="fa-solid fa-shield-halved" style="font-size: 4rem; color: var(--valtara-oro); margin-bottom: 2rem;"></i>
            <h3 style="font-size: 2rem; margin-bottom: 1.5rem;">Aviso de Privacidad Digital (LFPDPPP)</h3>
            <p class="marketing-text" style="text-align: center; max-width: 800px; margin: 0 auto;">
                En Valtara y Grupo Gevizz S.A.S., regulados por las leyes mexicanas, respetamos su entorno digital. Solo almacenamos el nombre que usted nos proporciona y sus preferencias de accesibilidad localmente en su dispositivo mediante <code>localStorage</code>. <strong>No guardamos su ubicación GPS, ni cruzamos sus datos para ventas a terceros.</strong> Su navegación dentro de nuestra Arquitectura Sovereign es estrictamente privada y confidencial.
            </p>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       7. MEGA FOOTER (PIE DE PÁGINA CORPORATIVO)
       -------------------------------------------------------------------------------- */
    footer: `
        <div class="footer-grid">
            <div class="footer-col">
                <h4 style="font-size: 3rem; letter-spacing: 0.3rem;">VALTARA</h4>
                <p style="font-style: italic; color: var(--valtara-oro-suave); font-size: 1.3rem; margin-bottom: 2rem;">Executive Therapy & Biomechanics</p>
                <p style="font-size: 1.05rem;">Plataforma SPA Modular V 10.1 Sovereign. Arquitectura de software desarrollada 100% in-house por Grupo Gevizz.</p>
            </div>
            <div class="footer-col">
                <h4>Contacto y Logística</h4>
                <a href="https://maps.app.goo.gl/zvrD44iVseA7zVQZ9" target="_blank" aria-label="Abrir mapa de ubicación en Google Maps"><i class="fa-solid fa-map-location-dot" style="color:var(--valtara-oro); width:25px;"></i> Paseo de la Reforma 195, Piso 3. CDMX.</a>
                <a href="tel:+523348572070" aria-label="Llamar al número del concierge"><i class="fa-solid fa-phone" style="color:var(--valtara-oro); width:25px;"></i> 33 4857 2070 (Concierge)</a>
                <a href="mailto:clientes.valtara@gmail.com" aria-label="Enviar correo electrónico"><i class="fa-solid fa-envelope" style="color:var(--valtara-oro); width:25px;"></i> clientes.valtara@gmail.com</a>
                <div class="social-icons">
                    <a href="https://www.instagram.com/valtara.mx" target="_blank" aria-label="Visitar página de Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.facebook.com/Valtara.mx" target="_blank" aria-label="Visitar página de Facebook"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://www.tiktok.com/@valtara.mx" target="_blank" aria-label="Visitar perfil de TikTok"><i class="fa-brands fa-tiktok"></i></a>
                    <a href="https://youtube.com/@valtaramexico" target="_blank" aria-label="Visitar canal de YouTube"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Avales Legales</h4>
                <p>Operamos bajo protocolos estrictos de bioseguridad COFEPRIS.</p>
                <a href="https://drive.google.com/file/d/1sxHLBQF8Lj_GF4GzJipXAxx5256BWAIr/view" target="_blank" style="color: var(--valtara-cian-fluor); margin-top: 1.5rem; text-decoration: underline; font-weight: bold;" aria-label="Ver y descargar credenciales en Google Drive"><i class="fa-solid fa-file-pdf"></i> Consultar Cédula y Título</a>
                <p style="font-size: 0.9rem; margin-top: 2rem; color: #777;">*Deslinde: No somos clínica hospitalaria ni expedimos recetas médicas. Toda intervención es complementaria.*</p>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 GRUPO GEVIZZ S.A.S. DE C.V. Todos los derechos intelectuales reservados.
        </div>
    `,

    /* --------------------------------------------------------------------------------
       MÉTODO INYECTOR (RENDER)
       Este código se ejecuta en el core.js para rellenar el HTML vacío en 0.01 segundos
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
