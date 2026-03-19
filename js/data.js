/**
 * ====================================================================================
 * BLOQUE 4: LA ENCICLOPEDIA VALTARA (DATA & RENDER ENGINE V11.0)
 * Redacción de ultra-lujo, rigor clínico y Búnker Legal S.A.S.
 * ====================================================================================
 */

window.ValtaraData = {
    /* --------------------------------------------------------------------------------
       1. SECCIÓN INICIO Y MAPA CORPORAL
       -------------------------------------------------------------------------------- */
    home: `
        <div class="hero-view reveal" style="text-align: center; padding: 4rem 0;">
            <i aria-hidden="true" class="fa-solid fa-leaf gold-icon" style="font-size: 5rem; color: var(--valtara-oro); margin-bottom: 2.5rem;"></i>
            
            <h1 id="hero-dynamic-greeting" style="font-family: var(--font-accent); font-size: 4.5rem; margin-bottom: 1rem; color: var(--valtara-blanco); line-height: 1.2;">VALTARA</h1>
            
            <h2 style="color: var(--valtara-oro-suave); font-size: 1.5rem; letter-spacing: 0.3rem; margin-bottom: 2rem; font-weight: 300; text-transform: uppercase;">Executive Therapy & Biomechanics</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; max-width: 850px; margin: 0 auto 3rem auto; line-height: 2; font-weight: 300;">
                El éxito corporativo exige un vehículo biológico capaz de sostenerlo. En nuestro santuario privado en Paseo de la Reforma, decodificamos la tensión acumulada por la alta exigencia mediante ciencia anatómica profunda. Su sistema nervioso está a punto de reiniciarse.
            </p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1100px; margin: 4rem auto; text-align: left;">
                <div class="glass-card" style="padding: 2rem;">
                    <h3 id="promo1-title" style="font-size: 1.4rem; color: var(--valtara-cian-fluor); margin-bottom: 1rem;"><i class="fa-solid fa-sun"></i> Privilegio de Temporada</h3>
                    <p id="promo1-text" style="font-size: 1rem; color: var(--valtara-gris-texto); font-weight: 300;">Evaluando privilegios en curso...</p>
                </div>
                <div class="glass-card" style="padding: 2rem;">
                    <h3 id="promo2-title" style="font-size: 1.4rem; color: var(--valtara-oro); margin-bottom: 1rem;"><i class="fa-solid fa-id-card-clip"></i> Valtara Member Card</h3>
                    <p id="promo2-text" style="font-size: 1rem; color: var(--valtara-gris-texto); font-weight: 300;">Calculando beneficios de lealtad estructural...</p>
                </div>
                <div class="glass-card" style="padding: 2rem;">
                    <h3 id="promo3-title" style="font-size: 1.4rem; color: var(--valtara-magenta-neon); margin-bottom: 1rem;"><i class="fa-solid fa-mug-hot"></i> Ritual del Ocaso</h3>
                    <p id="promo3-text" style="font-size: 1rem; color: var(--valtara-gris-texto); font-weight: 300;">Preparando infusiones orgánicas...</p>
                </div>
            </div>
        </div>

        <div class="body-map-container reveal" style="margin-top: 4rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 2rem; padding: 4rem 3rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 4rem; backdrop-filter: blur(20px);">
            <div>
                <h3 style="font-family: var(--font-accent); color: var(--valtara-cian-fluor); font-size: 2.8rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-microscope"></i> Triaje Biomecánico</h3>
                <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 3rem; line-height: 1.8;">Interactúe con nuestro mapa de somatización. Seleccione la zona principal donde su cuerpo ha cristalizado el estrés. Nuestro algoritmo diagnosticará el conflicto anatómico subyacente.</p>
                <div class="body-zones" style="display: flex; flex-direction: column; gap: 1rem;">
                    <button class="zone-btn a11y-card-btn" data-zone="craneo"><i class="fa-solid fa-head-side-virus" style="color: var(--valtara-cian-fluor);"></i> <span>Cráneo, Mandíbula y Fascia Facial</span></button>
                    <button class="zone-btn a11y-card-btn" data-zone="cervical"><i class="fa-solid fa-user-injured" style="color: var(--valtara-cian-fluor);"></i> <span>Cervicales, Nuca y Trapecios</span></button>
                    <button class="zone-btn a11y-card-btn" data-zone="lumbar"><i class="fa-solid fa-child" style="color: var(--valtara-cian-fluor);"></i> <span>Región Lumbar y Compresión Ciática</span></button>
                    <button class="zone-btn a11y-card-btn" data-zone="linfa"><i class="fa-solid fa-shoe-prints" style="color: var(--valtara-cian-fluor);"></i> <span>Pesadez y Drenaje de Extremidades</span></button>
                </div>
            </div>
            <div class="zone-info" id="zone-display" aria-live="polite" style="background: rgba(0,0,0,0.6); padding: 4rem 3rem; border-radius: 1.5rem; display: flex; flex-direction: column; justify-content: center; border-left: 4px solid var(--valtara-cian-fluor);">
                <i class="fa-solid fa-person-dots-from-line" style="font-size: 5rem; color: var(--valtara-cian-fluor); margin-bottom: 2rem; opacity: 0.5;"></i>
                <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);">Esperando biometría...</h4>
                <p style="color: var(--valtara-gris-texto); line-height: 1.8; font-size: 1.15rem; font-weight: 300;">El mapa interactivo se encuentra en reposo. Seleccione un segmento anatómico a su izquierda para comenzar la decodificación clínica de su dolor.</p>
            </div>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       2. CATÁLOGO DE RESTAURACIÓN BIOMECÁNICA
       -------------------------------------------------------------------------------- */
    restoration: `
        <div style="text-align: center; max-width: 900px; margin: 0 auto 4rem auto;">
            <h2 style="font-family: var(--font-accent); font-size: 3.8rem; color: var(--valtara-blanco); margin-bottom: 1.5rem;" class="reveal">Catálogo de Restauración</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; line-height: 1.9; font-weight: 300;" class="reveal">No ofrecemos masajes genéricos; ejecutamos procedimientos biomecánicos diseñados para desmantelar la cristalización del estrés corporativo en su tejido conectivo. Toda sesión incluye análisis postural preliminar.</p>
        </div>
        
        <div class="grid-container grid-2-cols">
            <article class="glass-card reveal">
                <div class="card-icon-wrapper"><i class="fa-solid fa-dumbbell"></i></div>
                <h3>Masaje Deportivo y Descompresión</h3>
                <div class="card-meta-info"><span class="duracion"><i class="fa-solid fa-clock"></i> 60 - 90 Min</span><span class="precio">$949 MXN</span></div>
                <p class="marketing-text"><strong>El antídoto contra la "armadura" de estrés.</strong> Diseñado para ejecutivos y atletas que someten su cuerpo a tensión extrema. Utilizamos antebrazos, codos y ventosas de silicón médico de alta succión (sin marcas invasivas) para separar las fibras musculares adheridas, romper puntos gatillo y forzar la entrada de oxígeno fresco a los tejidos asfixiados por el ácido láctico.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>
            
            <article class="glass-card reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-cian-fluor);"><i class="fa-solid fa-child-reaching"></i></div>
                <h3>Reductivo Estructural / Maderoterapia</h3>
                <div class="card-meta-info"><span><i class="fa-solid fa-clock"></i> 50 Min</span><span class="precio" style="color: var(--valtara-cian-fluor);">$899 MXN</span></div>
                <p class="marketing-text"><strong>Ingeniería estética de alto impacto sin bisturí.</strong> Abordaje agresivo pero controlado contra el tejido adiposo rebelde y la celulitis fibrosa. Combinamos manipulaciones térmicas de alta velocidad con geles activos y herramientas anatómicas de madera noble para fragmentar los macro-nódulos de grasa y redirigir las toxinas hacia los ganglios linfáticos.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: rgba(76,201,240,0.1); border-color: var(--valtara-cian-fluor);"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>

            <article class="glass-card reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-purpura-aura);"><i class="fa-solid fa-crown"></i></div>
                <h3>Ritual Lomi Lomi Supremo</h3>
                <div class="card-meta-info"><span><i class="fa-solid fa-clock"></i> 90 Min</span><span class="precio" style="color: var(--valtara-purpura-aura);">$1,419 MXN</span></div>
                <p class="marketing-text"><strong>La joya de la corona. Un cortocircuito al Burnout.</strong> Protocolo ininterrumpido que simula el oleaje del océano Pacífico. El terapeuta utiliza ambos antebrazos en movimientos largos, rítmicos y envolventes. Esta técnica abruma positivamente los receptores sensoriales, forzando a su cerebro a apagar la voz interior ansiosa y descender a ondas Theta de regeneración pura.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: rgba(178,0,255,0.1); border-color: var(--valtara-purpura-aura);"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>

            <article class="glass-card reveal">
                <div class="card-icon-wrapper" style="color: #ffaa00;"><i class="fa-solid fa-candle-holder"></i></div>
                <h3>Fusión con Velas Térmicas</h3>
                <div class="card-meta-info"><span><i class="fa-solid fa-clock"></i> 60 Min</span><span class="precio" style="color: #ffaa00;">$1,199 MXN</span></div>
                <p class="marketing-text"><strong>Sedación muscular absoluta y nutrición dérmica.</strong> Reemplazamos el aceite tradicional por cera de abejas y manteca de karité purificada, fundidas a una temperatura exacta. Vertemos este elixir dorado directamente sobre su columna vertebral. El calor penetra la fascia instantáneamente, derritiendo la rigidez mecánica y dejando su piel profundamente hidratada.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: rgba(255,170,0,0.1); border-color: #ffaa00;"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>

            <article class="glass-card reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-verde-ws);"><i class="fa-solid fa-spa"></i></div>
                <h3>Masaje Holístico Integrativo</h3>
                <div class="card-meta-info"><span><i class="fa-solid fa-clock"></i> 90 Min</span><span class="precio" style="color: var(--valtara-verde-ws);">$1,199 MXN</span></div>
                <p class="marketing-text"><strong>Restauración del sistema parasimpático tras crisis o luto.</strong> Esta intervención aborda el cuerpo como una unidad inquebrantable. Fusión precisa que amalgama la fluidez de las manipulaciones suecas para bajar la presión arterial, con presiones medias en puntos gatillo específicos para liberar bloqueos emocionales somatizados en el pecho y el diafragma.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>

            <article class="glass-card reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-blanco);"><i class="fa-solid fa-person-praying"></i></div>
                <h3>Tailandés Pasivo (Alineación)</h3>
                <div class="card-meta-info"><span><i class="fa-solid fa-clock"></i> 90 Min</span><span class="precio" style="color: var(--valtara-blanco);">$1,449 MXN</span></div>
                <p class="marketing-text"><strong>Yoga asistido para combatir el sedentarismo de oficina.</strong> Usted no hace ningún esfuerzo. Nosotros utilizamos nuestro peso corporal, palancas, rodillas y pies para estirar sus cadenas musculares posteriores al límite seguro, abriendo articulaciones acartonadas y descomprimiendo milimétricamente el espacio entre las vértebras lumbares.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: rgba(255,255,255,0.1); border-color: var(--valtara-blanco);"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       3. MANIFIESTO CODEX
       -------------------------------------------------------------------------------- */
    codex: `
        <div class="glass-card reveal" style="padding: 5rem 4rem; max-width: 1000px; margin: 0 auto;">
            <h2 style="font-family: var(--font-accent); font-size: 3.5rem; color: var(--valtara-oro); margin-bottom: 2.5rem; border-bottom: 1px solid rgba(242,201,76,0.3); padding-bottom: 2rem; letter-spacing: 0.1rem;">Manifiesto Codex Valtara</h2>
            
            <p style="font-size: 1.25rem; color: var(--valtara-gris-texto); line-height: 2.2; text-align: justify; margin-bottom: 2rem; font-weight: 300;">
                <span style="float: left; font-size: 6.5rem; font-family: var(--font-accent); color: var(--valtara-magenta-neon); line-height: 0.8; margin-right: 1.5rem; margin-top: 0.5rem; text-shadow: 0 0 2rem rgba(247,37,133,0.5);">E</span>n el umbral implacable de la era corporativa, el cuerpo humano se ha convertido en el depósito silencioso de una velocidad sin precedentes y responsabilidades aplastantes. El estrés no se disipa simplemente durmiendo; se solidifica en la fascia, acorta los flexores, comprime los discos intervertebrales y altera la química de la sangre mediante inyecciones crónicas de cortisol.
            </p>
            
            <p style="font-size: 1.25rem; color: var(--valtara-gris-texto); line-height: 2.2; text-align: justify; margin-bottom: 3rem; font-weight: 300;">
                Valtara nace de una premisa disruptiva: <strong>el bienestar de alto nivel no es un lujo de fin de semana, es una obra de ingeniería constante.</strong> Hemos construido una instalación de élite en Reforma 195 donde la compasión incondicional de las tradiciones milenarias choca intencionalmente con la brutalidad hermosa de la anatomía clínica para restaurar la arquitectura original del ser humano.
            </p>
            
            <h3 style="color: var(--valtara-cian-fluor); font-size: 2.2rem; font-family: var(--font-accent); margin-top: 4rem; margin-bottom: 2rem; border-left: 5px solid var(--valtara-cian-fluor); padding-left: 1.5rem;">El ADN Corporativo y Leyes Inquebrantables</h3>
            <ul style="color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 2.2; list-style: none;">
                <li style="margin-bottom: 1.5rem; padding: 1.5rem; background: rgba(255,255,255,0.03); border-radius: 1rem; border: 1px solid rgba(255,255,255,0.1);">
                    <i class="fa-solid fa-microscope" style="color:var(--valtara-oro); margin-right:15px; font-size: 1.5rem;"></i> 
                    <strong style="color: var(--valtara-blanco);">1. Rigor Clínico:</strong> No hay un solo movimiento sin fundamento anatómico. Entendemos las inserciones musculares y la biomecánica de las palancas óseas.
                </li>
                <li style="margin-bottom: 1.5rem; padding: 1.5rem; background: rgba(255,255,255,0.03); border-radius: 1rem; border: 1px solid rgba(255,255,255,0.1);">
                    <i class="fa-solid fa-scale-balanced" style="color:var(--valtara-oro); margin-right:15px; font-size: 1.5rem;"></i> 
                    <strong style="color: var(--valtara-blanco);">2. Neutralidad Ética Absoluta:</strong> Nuestra cabina es un búnker de paz. Garantizamos un espacio libre de juicios. Su identidad, cicatrices o peso corporal son sagrados.
                </li>
                <li style="margin-bottom: 1.5rem; padding: 1.5rem; background: rgba(255,255,255,0.03); border-radius: 1rem; border: 1px solid rgba(255,255,255,0.1);">
                    <i class="fa-solid fa-hand-holding-heart" style="color:var(--valtara-oro); margin-right:15px; font-size: 1.5rem;"></i> 
                    <strong style="color: var(--valtara-blanco);">3. La Compasión como Tecnología:</strong> Aunque hemos mecanizado el triaje y digitalizado la experiencia, el contacto humano puro sigue siendo nuestra tecnología de sanación más avanzada.
                </li>
            </ul>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       4. ERGONOMÍA UNIVERSAL E INCLUSIÓN
       -------------------------------------------------------------------------------- */
    ergonomics: `
        <div style="text-align: center; max-width: 900px; margin: 0 auto 4rem auto;">
            <h2 style="font-family: var(--font-accent); font-size: 3.5rem; color: var(--valtara-blanco); margin-bottom: 1rem;" class="reveal">Ergonomía Universal y Neuro-Inclusión</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; line-height: 1.8; font-weight: 300;" class="reveal">El alivio del dolor es un derecho inalienable. En Valtara, destruimos las barreras físicas y sensoriales de la práctica clínica tradicional.</p>
        </div>

        <div class="grid-container grid-2-cols">
            <article class="glass-card reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-verde-ws);"><i class="fa-solid fa-wheelchair"></i></div>
                <h3 style="color: var(--valtara-verde-ws);">Inclusión Motriz Sin Barreras</h3>
                <p class="marketing-text"><strong>El bienestar no exige adaptación.</strong> Si el paciente tiene movilidad reducida o dolor agudo que impide subir a una camilla tradicional, nuestros terapeutas están capacitados biomecánicamente para ejecutar rutinas completas de descompresión lumbar y cervical trabajando directamente sobre su propia silla de ruedas, asegurando dignidad y confort absoluto.</p>
            </article>
            
            <article class="glass-card reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-purpura-aura);"><i class="fa-solid fa-brain"></i></div>
                <h3 style="color: var(--valtara-purpura-aura);">Ajustes de Neurodivergencia</h3>
                <p class="marketing-text">Los sistemas nerviosos autistas, con TDAH o con alta sensibilidad (PAS) procesan los estímulos de manera intensa. <strong>Usted tiene el control del entorno.</strong> Al agendar, aceptamos ajustes razonables: podemos cancelar el uso de aromaterapia, apagar el hilo musical, bajar las luces al mínimo y evitar "toques ligeros" que causen sobrecarga sensorial, usando solo presiones firmes.</p>
            </article>

            <article class="glass-card reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-oro);"><i class="fa-solid fa-desktop"></i></div>
                <h3 style="color: var(--valtara-oro);">Higiene Postural: Regla 90/90</h3>
                <p class="marketing-text">El trabajo de escritorio es el nuevo tabaquismo para la columna. Exigimos a nuestros pacientes corporativos aplicar esta regla: Al sentarse, rodillas y cadera deben formar un ángulo de 90 grados apoyando los pies planos. Simultáneamente, el tercio superior de su monitor debe estar alineado horizontalmente con sus ojos para salvar los discos lumbares L4 y L5.</p>
            </article>

            <article class="glass-card reveal">
                <div class="card-icon-wrapper" style="color: #ff5555;"><i class="fa-solid fa-mobile-screen-button"></i></div>
                <h3 style="color: #ff5555;">La Amenaza del "Text Neck"</h3>
                <p class="marketing-text">Una cabeza en posición neutral pesa unos 5 kilos. Sin embargo, <strong>por cada centímetro que inclina su cabeza hacia abajo para revisar su teléfono</strong>, multiplica drásticamente la fuerza de gravedad. A 60 grados de inclinación, su frágil cuello y trapecios soportan una tensión brutal equivalente a cargar 27 kilos constantes, generando isquemia tisular.</p>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       5. CIENCIA Y VIDEOTECA
       -------------------------------------------------------------------------------- */
    science: `
        <div style="text-align: center; max-width: 900px; margin: 0 auto 4rem auto;">
            <h2 style="font-family: var(--font-accent); font-size: 3.5rem; color: var(--valtara-blanco); margin-bottom: 1rem;" class="reveal">Biblioteca Científica</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; line-height: 1.8; font-weight: 300;" class="reveal">Creemos fervientemente en el paciente educado. Entender la raíz neurobiológica de su dolor es el primer paso hacia la autocuración. Explore nuestros documentales in-house.</p>
        </div>
        
        <div class="grid-container grid-2-cols" style="display:flex; justify-content:center;">
            <article class="glass-card reveal" style="max-width: 600px; width: 100%;">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; margin-bottom: 2rem; border-radius: 1rem; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                    <iframe src="https://www.youtube.com/embed/Uc5wVxOW46o?rel=0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                </div>
                <h3 style="font-size: 1.8rem; margin-bottom: 1rem; color: var(--valtara-blanco);">Chocolaterapia: ¿Lujo o Bio-Medicina?</h3>
                <p class="marketing-text" style="text-align: justify;">Un análisis profundo de cómo el uso tópico del cacao puro no es un mero capricho de spa. Desgranamos el poder de la <em>teobromina</em> para inducir vasodilatación periférica, y cómo la <em>anandamida</em> (la molécula de la felicidad) interactúa con los receptores de la piel para combatir el estrés oxidativo celular y reparar el tejido dañado por los radicales libres de la ciudad.</p>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       6. BÚNKER JURÍDICO Y LFPDPPP (S.A.S.)
       -------------------------------------------------------------------------------- */
    legal: `
        <div style="text-align: center; max-width: 900px; margin: 0 auto 4rem auto;">
            <h2 style="font-family: var(--font-accent); font-size: 3.5rem; color: var(--valtara-blanco); margin-bottom: 1rem;" class="reveal">Búnker Legal y Ético</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; line-height: 1.8; font-weight: 300;" class="reveal">Transparencia corporativa absoluta. Estatutos y garantías dictadas por la dirección jurídica de Grupo Gevizz S.A.S. para la protección de nuestros pacientes y nuestro personal.</p>
        </div>

        <div class="grid-container grid-2-cols">
            <article class="glass-card reveal" style="border-color: var(--valtara-oro);">
                <i class="fa-solid fa-ban" style="font-size: 3.5rem; color: var(--valtara-oro); margin-bottom: 1.5rem;"></i>
                <h3 style="color: var(--valtara-oro);">Política Estricta de Cancelación</h3>
                <p class="marketing-text"><strong>El tiempo en cabina es el activo más valioso.</strong><br>
                1. <strong>Reembolso del 100%:</strong> Si la cancelación o reprogramación se notifica con un mínimo de 24 horas de anticipación a la cita.<br>
                2. <strong>Penalización Total (0% Reembolso):</strong> Las cancelaciones realizadas dentro de la ventana de 24 horas previas a la cita, o el <em>No-Show</em> (no presentarse), resultarán en la pérdida automática del 100% de su anticipo por concepto de tiempo de cabina y honorarios del terapeuta bloqueado.</p>
            </article>

            <article class="glass-card reveal" style="border-color: #ff5555;">
                <i class="fa-solid fa-gavel" style="font-size: 3.5rem; color: #ff5555; margin-bottom: 1.5rem;"></i>
                <h3 style="color: #ff5555;">Ética Profesional y Tolerancia Cero</h3>
                <p class="marketing-text"><strong>Nuestra práctica es estrictamente clínica y biomecánica.</strong> Valtara y Grupo Gevizz S.A.S. mantienen una política de tolerancia cero frente al acoso. Cualquier insinuación, comportamiento inapropiado, proposición de índole sexual o falta de respeto hacia nuestro personal clínico resultará en la <strong>terminación inmediata de la sesión, el cobro total e íntegro de la misma</strong>, el veto permanente de nuestras instalaciones y el reporte directo a las autoridades de seguridad ciudadana.</p>
            </article>

            <article class="glass-card reveal" style="border-color: var(--valtara-cian-fluor);">
                <i class="fa-solid fa-shield-halved" style="font-size: 3.5rem; color: var(--valtara-cian-fluor); margin-bottom: 1.5rem;"></i>
                <h3 style="color: var(--valtara-cian-fluor);">Privacidad Digital (LFPDPPP)</h3>
                <p class="marketing-text">Operamos bajo el principio de <em>Privacidad por Diseño</em> en cumplimiento con la Ley Federal de Protección de Datos Personales. <strong>NO guardamos su ubicación GPS, NO vendemos bases de datos y NO usamos cookies invasivas de terceros.</strong> Su nombre y configuraciones visuales (como el Avatar o el Alto Contraste) se guardan estrictamente en el almacenamiento local de su propio teléfono o computadora.</p>
            </article>

            <article class="glass-card reveal" style="border-color: var(--valtara-purpura-aura);">
                <i class="fa-solid fa-copyright" style="font-size: 3.5rem; color: var(--valtara-purpura-aura); margin-bottom: 1.5rem;"></i>
                <h3 style="color: var(--valtara-purpura-aura);">Propiedad Intelectual y Anti-Plagio</h3>
                <p class="marketing-text">La arquitectura de software <em>Sovereign 11.0</em>, el motor acústico <em>Oasis</em>, la red neuronal de lenguaje <em>Aura AI</em>, los textos descriptivos y la identidad de marca son <strong>desarrollos tecnológicos propietarios creados in-house por la división de ingeniería de Grupo Gevizz S.A.S.</strong><br>Queda estrictamente prohibida la copia, clonación estructural, raspado de datos (web scraping) o plagio de nuestros manifiestos bajo pena de acciones legales en materia de Derechos de Autor.</p>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       7. MEGA FOOTER (Datos S.A.S. completos)
       -------------------------------------------------------------------------------- */
    footer: `
        <div class="footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 4rem; max-width: 1250px; margin: 0 auto; color: var(--valtara-gris-texto); line-height: 2;">
            
            <div class="footer-col">
                <h4 style="font-family: var(--font-accent); font-size: 2rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; letter-spacing: 0.2rem;">VALTARA</h4>
                <p style="font-style: italic; color: var(--valtara-oro); font-size: 1.1rem; margin-bottom: 1.5rem;">Executive Therapy & Biomechanics</p>
                <p style="font-weight: 300; font-size: 1rem;">Una entidad comercial respaldada y operada en su totalidad por <strong>Grupo Gevizz S.A.S.</strong><br><br>Plataforma SPA Modular Sovereign 11.0. Desarrollo de software, inteligencia artificial (NLP) y diseño de interfaces construidos in-house.</p>
            </div>
            
            <div class="footer-col">
                <h4 style="font-size: 1.3rem; color: var(--valtara-cian-fluor); margin-bottom: 1.5rem;">Logística y Coordenadas</h4>
                <a href="https://maps.app.goo.gl/zvrD44iVseA7zVQZ9" target="_blank" style="display: flex; gap: 1rem; color: var(--valtara-gris-texto); text-decoration: none; margin-bottom: 1.5rem; transition: 0.3s;">
                    <i class="fa-solid fa-map-location-dot" style="font-size: 1.5rem; color: var(--valtara-cian-fluor);"></i> 
                    <span>Av. Paseo de la Reforma 195, Piso 3.<br>Colonia Cuauhtémoc, CDMX. C.P. 06500</span>
                </a>
                <a href="tel:+523348572070" style="display: flex; gap: 1rem; align-items: center; color: var(--valtara-blanco); text-decoration: none; font-size: 1.2rem; font-weight: bold; transition: 0.3s;">
                    <i class="fa-solid fa-phone" style="color: var(--valtara-verde-ws);"></i> 33 4857 2070
                </a>
                <p style="margin-top: 1.5rem; font-size: 0.9rem; font-style: italic;">* Atención clínica estrictamente bajo previa reservación confirmada. No ofrecemos servicios a domicilio por protocolos de bioseguridad.</p>
            </div>

            <div class="footer-col">
                <h4 style="font-size: 1.3rem; color: var(--valtara-magenta-neon); margin-bottom: 1.5rem;">Avales Clínicos</h4>
                <p style="font-size: 0.95rem; font-weight: 300;">Nuestras intervenciones están respaldadas por formación académica exhaustiva. Operamos bajo Cédula de Identidad REPS y certificaciones de la Secretaría de Educación Pública y regulaciones sanitarias aplicables.</p>
            </div>

        </div>

        <div style="border-top: 1px solid rgba(255,255,255,0.05); margin-top: 5rem; padding-top: 3rem; text-align: center; color: #666; font-size: 0.9rem; letter-spacing: 0.1rem; font-weight: 300;">
            © 2026 GRUPO GEVIZZ S.A.S. TODOS LOS DERECHOS INTELECTUALES RESERVADOS.<br>
            Queda estrictamente prohibida la replicación del código fuente o modelo de negocio de este dominio.
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
