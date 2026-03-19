/**
 * ====================================================================================
 * BLOQUE 4: LA ENCICLOPEDIA VALTARA (DATA & RENDER ENGINE V10.3)
 * Textos expansivos, copywriting de ultra-lujo y rigor clínico.
 * ====================================================================================
 */

window.ValtaraData = {
    /* --------------------------------------------------------------------------------
       1. SECCIÓN INICIO Y MAPA CORPORAL
       -------------------------------------------------------------------------------- */
    home: `
        <div class="hero-view reveal" style="text-align: center; padding: 4rem 0;">
            <i aria-hidden="true" class="fa-solid fa-leaf gold-icon" style="font-size: 5rem; color: var(--valtara-oro); margin-bottom: 2.5rem; filter: drop-shadow(0 0 3rem rgba(242,201,76,0.6));"></i>
            <h1 style="font-family: var(--font-accent); font-size: 4rem; margin-bottom: 1rem; letter-spacing: 0.3rem;">VALTARA</h1>
            <h2 style="color: var(--valtara-oro-suave); font-size: 1.4rem; letter-spacing: 0.2rem; margin-bottom: 2rem; font-weight: 300; text-transform: uppercase;">Executive Therapy & Biomechanics</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; max-width: 800px; margin: 0 auto 3rem auto; line-height: 2; font-weight: 300;">
                El éxito exige un vehículo biológico capaz de sostenerlo. En nuestro santuario privado ubicado en Paseo de la Reforma, decodificamos la tensión acumulada por la alta exigencia corporativa mediante una fusión de ciencia anatómica profunda y un entorno acústicamente blindado. Su sistema nervioso está a punto de reiniciarse.
            </p>
            
            <div class="cortesia-box" id="cortesia-dinamica" style="display: inline-block; padding: 1.5rem 3rem; background: rgba(242,201,76,0.05); border: 1px solid var(--valtara-oro); border-radius: 4rem; color: var(--valtara-oro-suave); font-size: 1.1rem; font-weight: bold; box-shadow: 0 1rem 3rem rgba(242,201,76,0.15);">
                <i class="fa-solid fa-gem" style="margin-right: 15px;"></i> Calibrando privilegios de su identidad clínica...
            </div>
        </div>

        <div class="body-map-container reveal" style="margin-top: 6rem; background: rgba(6,6,10,0.8); border: 1px solid var(--valtara-cian-fluor); border-radius: 1.5rem; padding: 4rem 3rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 4rem; box-shadow: inset 0 0 4rem rgba(76,201,240,0.05);">
            <div>
                <h3 style="font-family: var(--font-accent); color: var(--valtara-cian-fluor); font-size: 2.5rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-microscope"></i> Triaje Biomecánico</h3>
                <p style="color: var(--valtara-gris-texto); font-size: 1.1rem; margin-bottom: 3rem; line-height: 1.8;">Interactúe con nuestro mapa de somatización. Seleccione la zona principal donde su cuerpo ha cristalizado el estrés. Nuestro algoritmo clínico diagnosticará el conflicto anatómico subyacente y prescribirá la intervención exacta para desmantelarlo.</p>
                <div class="body-zones" style="display: flex; flex-direction: column; gap: 1rem;">
                    <button class="zone-btn" data-zone="craneo" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 1.5rem; border-radius: 1rem; text-align: left; font-size: 1.1rem; transition: 0.3s; cursor: pointer; display: flex; align-items: center; gap: 1.5rem;"><i class="fa-solid fa-head-side-virus" style="font-size: 1.8rem; color: var(--valtara-cian-fluor); width: 30px;"></i> Cráneo, Mandíbula y Fascia Facial</button>
                    <button class="zone-btn" data-zone="cervical" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 1.5rem; border-radius: 1rem; text-align: left; font-size: 1.1rem; transition: 0.3s; cursor: pointer; display: flex; align-items: center; gap: 1.5rem;"><i class="fa-solid fa-user-injured" style="font-size: 1.8rem; color: var(--valtara-cian-fluor); width: 30px;"></i> Cervicales, Nuca y Trapecios</button>
                    <button class="zone-btn" data-zone="lumbar" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 1.5rem; border-radius: 1rem; text-align: left; font-size: 1.1rem; transition: 0.3s; cursor: pointer; display: flex; align-items: center; gap: 1.5rem;"><i class="fa-solid fa-child" style="font-size: 1.8rem; color: var(--valtara-cian-fluor); width: 30px;"></i> Región Lumbar y Compresión Ciática</button>
                    <button class="zone-btn" data-zone="linfa" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 1.5rem; border-radius: 1rem; text-align: left; font-size: 1.1rem; transition: 0.3s; cursor: pointer; display: flex; align-items: center; gap: 1.5rem;"><i class="fa-solid fa-shoe-prints" style="font-size: 1.8rem; color: var(--valtara-cian-fluor); width: 30px;"></i> Pesadez y Drenaje de Extremidades</button>
                </div>
            </div>
            <div class="zone-info" id="zone-display" aria-live="polite" style="background: rgba(0,0,0,0.6); padding: 3rem; border-radius: 1.5rem; display: flex; flex-direction: column; justify-content: center; border-left: 4px solid var(--valtara-cian-fluor);">
                <i class="fa-solid fa-person-dots-from-line" style="font-size: 4rem; color: var(--valtara-cian-fluor); margin-bottom: 2rem; opacity: 0.5;"></i>
                <h4 style="font-size: 2rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);">Esperando biometría...</h4>
                <p style="color: var(--valtara-gris-claro); line-height: 1.8; font-size: 1.1rem; font-weight: 300;">El mapa interactivo se encuentra en reposo. Seleccione un segmento anatómico a su izquierda para comenzar la decodificación clínica de su dolor.</p>
            </div>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       2. CATÁLOGO DE RESTAURACIÓN BIOMECÁNICA (Textos Expandidos)
       -------------------------------------------------------------------------------- */
    restoration: `
        <div style="text-align: center; max-width: 900px; margin: 0 auto 4rem auto;">
            <h2 style="font-family: var(--font-accent); font-size: 3.5rem; color: var(--valtara-blanco); margin-bottom: 1.5rem;" class="reveal">Catálogo de Restauración</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; line-height: 1.8; font-weight: 300;" class="reveal">Cada intervención en Valtara es un protocolo estructurado. No ofrecemos masajes genéricos; ejecutamos procedimientos biomecánicos diseñados para desmantelar la cristalización del estrés corporativo en su tejido conectivo. Toda sesión incluye análisis postural preliminar.</p>
        </div>
        
        <div class="grid-container grid-2-cols">
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper"><i class="fa-solid fa-dumbbell"></i></div>
                <h3>Masaje Deportivo y Descompresión</h3>
                <div class="card-meta-info"><span class="duracion"><i class="fa-solid fa-clock"></i> 60 - 90 Minutos</span><span class="precio">$949 MXN</span></div>
                <p class="marketing-text"><strong>El antídoto contra la "armadura" de estrés.</strong> Diseñado para ejecutivos y atletas que someten su cuerpo a tensión extrema. Este no es un masaje de caricias; utilizamos fricción transversal profunda con antebrazos, codos y ventosas de silicón médico de alta succión (tecnología sin marcas) para separar las fibras musculares adheridas, romper nódulos crónicos (gatillos) y forzar la entrada de oxígeno fresco a los tejidos asfixiados por el ácido láctico.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" aria-label="Reservar Masaje Deportivo"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>
            
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-cian-fluor); color: var(--valtara-cian-fluor);"><i class="fa-solid fa-child-reaching"></i></div>
                <h3>Reductivo Estructural y Maderoterapia</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 50 Minutos</span><span class="precio" style="color: var(--valtara-cian-fluor);">$899 MXN</span></div>
                <p class="marketing-text"><strong>Ingeniería estética de alto impacto sin bisturí.</strong> Un abordaje agresivo pero controlado contra el tejido adiposo rebelde y la celulitis fibrosa. Combinamos manipulaciones térmicas de alta velocidad con geles activos y herramientas anatómicas de madera noble. El objetivo clínico es fragmentar los macro-nódulos de grasa y redirigir las toxinas hacia los ganglios linfáticos, acelerando su metabolismo local y esculpiendo el contorno natural de su cuerpo.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-cian-fluor); color: var(--valtara-negro-profundo); border-color: var(--valtara-cian-fluor);"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-purpura-aura); color: var(--valtara-purpura-aura);"><i class="fa-solid fa-crown"></i></div>
                <h3>Ritual Lomi Lomi Supremo</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 90 Minutos</span><span class="precio" style="color: var(--valtara-purpura-aura);">$1,419 MXN</span></div>
                <p class="marketing-text"><strong>La joya de la corona. Un cortocircuito al Burnout.</strong> Un protocolo ininterrumpido que simula el oleaje del océano Pacífico. El terapeuta utiliza ambos antebrazos en movimientos largos, rítmicos y envolventes a lo largo de todo el cuerpo de forma simultánea. Esta técnica abruma positivamente los receptores sensoriales, forzando a su cerebro a apagar la voz interior ansiosa y descender a ondas Theta (estado de sueño profundo y regeneración).</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-purpura-aura); color: var(--valtara-blanco); border-color: var(--valtara-purpura-aura);"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: #ffaa00; color: #ffaa00;"><i class="fa-solid fa-candle-holder"></i></div>
                <h3>Fusión con Velas Térmicas</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 60 Minutos</span><span class="precio" style="color: #ffaa00;">$1,199 MXN</span></div>
                <p class="marketing-text"><strong>Sedación muscular absoluta y nutrición dérmica.</strong> Reemplazamos el aceite tradicional por cera de abejas y manteca de karité purificada, fundidas a una temperatura exacta. Vertemos este elixir dorado y cálido directamente sobre su columna vertebral. El calor penetra la fascia instantáneamente, derritiendo la rigidez mecánica sin necesidad de ejercer dolor o presión severa, dejando su piel profundamente hidratada y su mente en paz.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: #ffaa00; color: var(--valtara-negro-profundo); border-color: #ffaa00;"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-verde-ws); color: var(--valtara-verde-ws);"><i class="fa-solid fa-spa"></i></div>
                <h3>Holístico Integrativo</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 90 Minutos</span><span class="precio" style="color: var(--valtara-verde-ws);">$1,199 MXN</span></div>
                <p class="marketing-text"><strong>Restauración del sistema parasimpático tras crisis o luto.</strong> El ser humano no es solo carne y hueso. Esta intervención aborda el cuerpo como una unidad inquebrantable. Fusión precisa que amalgama la fluidez de las manipulaciones suecas para bajar la presión arterial, con presiones medias en puntos gatillo específicos para liberar bloqueos emocionales somatizados en el pecho y el diafragma.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-verde-ws); color: var(--valtara-negro-profundo); border-color: var(--valtara-verde-ws);"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-blanco); color: var(--valtara-blanco);"><i class="fa-solid fa-person-praying"></i></div>
                <h3>Tailandés Pasivo (Alineación)</h3>
                <div class="card-meta-info" style="color: var(--valtara-blanco);"><span><i class="fa-solid fa-clock"></i> 90 Minutos</span><span class="precio" style="color: var(--valtara-blanco);">$1,449 MXN</span></div>
                <p class="marketing-text"><strong>Yoga asistido para combatir el sedentarismo de oficina.</strong> Usted no hace ningún esfuerzo. Nosotros utilizamos nuestro peso corporal, palancas, rodillas y pies para estirar sus cadenas musculares posteriores al límite seguro, abriendo articulaciones acartonadas y descomprimiendo milimétricamente el espacio entre las vértebras lumbares para salvar a su nervio ciático de la compresión diaria.</p>
                <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-blanco); color: var(--valtara-negro-profundo); border-color: var(--valtara-blanco);"><i class="fa-brands fa-whatsapp"></i> Reclamar mi Sesión</a>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       3. MANIFIESTO CODEX (Visión y Filosofía Expandida)
       -------------------------------------------------------------------------------- */
    codex: `
        <div class="glass-card reveal" style="padding: 5rem 4rem; max-width: 1000px; margin: 0 auto;">
            <h2 style="font-family: var(--font-accent); font-size: 3.5rem; color: var(--valtara-oro); margin-bottom: 2.5rem; border-bottom: 1px solid rgba(242,201,76,0.3); padding-bottom: 2rem; letter-spacing: 0.1rem;">Manifiesto Codex Valtara</h2>
            
            <p style="font-size: 1.2rem; color: var(--valtara-gris-claro); line-height: 2.2; text-align: justify; margin-bottom: 2rem; font-weight: 300;">
                <span style="float: left; font-size: 6rem; font-family: var(--font-accent); color: var(--valtara-magenta-neon); line-height: 0.8; margin-right: 1.5rem; margin-top: 0.5rem; text-shadow: 0 0 2rem rgba(247,37,133,0.3);">E</span>n el umbral implacable de la era corporativa moderna, el cuerpo humano se ha convertido en el depósito silencioso de una velocidad sin precedentes y responsabilidades aplastantes. Observamos a diario cómo el estrés, el miedo a fallar y el peso del liderazgo no se disipan simplemente descansando los fines de semana. Estas cargas habitan en la materia: se solidifican en la fascia, acortan los flexores, comprimen los discos y alteran severamente la química de la sangre mediante inyecciones crónicas de cortisol.
            </p>
            
            <p style="font-size: 1.2rem; color: var(--valtara-gris-claro); line-height: 2.2; text-align: justify; margin-bottom: 3rem; font-weight: 300;">
                Valtara nace de una premisa radical y disruptiva: <strong>el bienestar de alto nivel no es un estado pasivo ni un lujo de fin de semana, es una obra de ingeniería constante.</strong> Nos negamos a ofrecer "masajes de spa genéricos" que solo acarician la superficie. Hemos construido una instalación de élite en Reforma 195 donde la compasión incondicional de las tradiciones milenarias choca intencionalmente con el rigor y la brutalidad hermosa de la anatomía clínica para restaurar, por la fuerza si es necesario, la arquitectura original del ser humano.
            </p>
            
            <h3 style="color: var(--valtara-cian-fluor); font-size: 2.2rem; font-family: var(--font-accent); margin-top: 4rem; margin-bottom: 2rem; border-left: 5px solid var(--valtara-cian-fluor); padding-left: 1.5rem;">El ADN Corporativo y Nuestras Leyes Inquebrantables</h3>
            <ul style="color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 2.2; list-style: none;">
                <li style="margin-bottom: 1.5rem; padding: 1.5rem; background: rgba(255,255,255,0.02); border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05);">
                    <i class="fa-solid fa-microscope" style="color:var(--valtara-oro); margin-right:15px; font-size: 1.5rem;"></i> 
                    <strong style="color: var(--valtara-blanco);">1. Rigor Clínico y Científico:</strong> No hay un solo movimiento, presión o estiramiento sin un fundamento anatómico. Entendemos las inserciones musculares, la biomecánica de las palancas óseas y la neurobiología del dolor.
                </li>
                <li style="margin-bottom: 1.5rem; padding: 1.5rem; background: rgba(255,255,255,0.02); border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05);">
                    <i class="fa-solid fa-scale-balanced" style="color:var(--valtara-oro); margin-right:15px; font-size: 1.5rem;"></i> 
                    <strong style="color: var(--valtara-blanco);">2. Neutralidad Ética Absoluta:</strong> Nuestra cabina es un búnker de paz. Garantizamos un espacio de aceptación incondicional. Su peso, sus cicatrices, su identidad, su edad o su nivel de agotamiento no son motivo de juicio, sino de profundo honor y respeto.
                </li>
                <li style="margin-bottom: 1.5rem; padding: 1.5rem; background: rgba(255,255,255,0.02); border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05);">
                    <i class="fa-solid fa-hand-holding-heart" style="color:var(--valtara-oro); margin-right:15px; font-size: 1.5rem;"></i> 
                    <strong style="color: var(--valtara-blanco);">3. La Compasión como Tecnología:</strong> Hemos mecanizado la sala, optimizado los fluidos y digitalizado el triaje, pero sabemos que, al final del día, el contacto humano con intención pura sigue siendo la tecnología de sanación más avanzada que existe sobre la Tierra.
                </li>
            </ul>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       4. CIENCIA Y VIDEOTECA
       -------------------------------------------------------------------------------- */
    science: `
        <div style="text-align: center; max-width: 900px; margin: 0 auto 4rem auto;">
            <h2 style="font-family: var(--font-accent); font-size: 3.5rem; color: var(--valtara-blanco); margin-bottom: 1rem;" class="reveal">Biblioteca Científica</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; line-height: 1.8; font-weight: 300;" class="reveal">Creemos en el paciente educado. Entender la raíz neurobiológica y botánica de su dolor y su recuperación es el primer paso hacia la restauración total. Explore nuestros documentales producidos in-house.</p>
        </div>
        
        <div class="grid-container grid-2-cols" style="display:flex; justify-content:center;">
            <article class="glass-card tilt-card reveal" style="max-width: 600px; width: 100%;">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; margin-bottom: 2rem; border-radius: 1rem; overflow: hidden; border: 1px solid rgba(255,0,0,0.3);">
                    <iframe src="https://www.youtube.com/embed/Uc5wVxOW46o?rel=0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen aria-label="Video de Chocolaterapia"></iframe>
                </div>
                <h3 style="font-size: 1.8rem; margin-bottom: 1rem; color: var(--valtara-blanco);">Chocolaterapia: ¿Lujo o Bio-Medicina?</h3>
                <p class="marketing-text" style="text-align: justify;">Un análisis profundo de cómo el uso tópico del cacao puro, utilizado desde las antiguas civilizaciones Olmecas, no es un mero capricho estético. En este documental, desgranamos el poder de alcaloides como la <em>teobromina</em> para inducir vasodilatación periférica, y cómo la <em>anandamida</em> (conocida como la molécula de la felicidad) interactúa con los receptores cannabinoides de la piel para combatir el estrés oxidativo celular y reparar el tejido dañado por el medio ambiente.</p>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       5. ERGONOMÍA UNIVERSAL (Textos Profundos)
       -------------------------------------------------------------------------------- */
    ergonomics: `
        <div style="text-align: center; max-width: 900px; margin: 0 auto 4rem auto;">
            <h2 style="font-family: var(--font-accent); font-size: 3.5rem; color: var(--valtara-blanco); margin-bottom: 1rem;" class="reveal">Ergonomía Universal y Neuro-Inclusión</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; line-height: 1.8; font-weight: 300;" class="reveal">El alivio del dolor es un derecho humano universal, no un privilegio de quienes encajan en un molde anatómico o neurológico estándar. En Valtara, destruimos las barreras de la práctica clínica tradicional.</p>
        </div>

        <div class="grid-container grid-2-cols">
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-verde-ws); color: var(--valtara-verde-ws);"><i class="fa-solid fa-wheelchair"></i></div>
                <h3 style="font-size: 1.6rem;">Inclusión Motriz Sin Barreras</h3>
                <p class="marketing-text"><strong>No exigimos que su cuerpo se adapte a nuestro entorno.</strong> Si el paciente tiene movilidad reducida o dolor agudo que impide la transición a una camilla clínica, nuestros terapeutas están capacitados biomecánicamente para ejecutar rutinas completas de descompresión cervical, dorsal y lumbar trabajando directamente sobre su propia silla de ruedas, asegurando dignidad y confort absoluto.</p>
            </article>
            
            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-purpura-aura); color: var(--valtara-purpura-aura);"><i class="fa-solid fa-brain"></i></div>
                <h3 style="font-size: 1.6rem;">Protocolos para Neurodivergencia</h3>
                <p class="marketing-text">Entendemos profundamente que los sistemas nerviosos autistas, con TDAH o con alta sensibilidad (PAS) procesan los estímulos de manera abrumadora. <strong>Usted tiene el control del entorno.</strong> Ajustamos la luz a oscuridad casi total, cancelamos el uso de aromaterapia si lo solicita, suprimimos el hilo musical, e incluso adaptamos nuestras técnicas para evitar toques ligeros que puedan causar sobrecarga sensorial, utilizando únicamente presiones firmes y predecibles.</p>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-oro); color: var(--valtara-oro);"><i class="fa-solid fa-desktop"></i></div>
                <h3 style="font-size: 1.6rem;">Higiene Postural: Regla 90/90</h3>
                <p class="marketing-text">El trabajo de escritorio es el nuevo tabaquismo para la columna. Exigimos a nuestros pacientes corporativos aplicar esta regla: Al sentarse, rodillas y cadera deben formar un ángulo de 90 grados apoyando los pies planos. Simultáneamente, el tercio superior de su monitor debe estar alineado horizontalmente con sus ojos. Esta configuración básica evita que los discos lumbares L4 y L5 sean triturados por el peso de su propio torso durante jornadas de 8 horas.</p>
            </article>

            <article class="glass-card tilt-card reveal">
                <div class="card-icon-wrapper" style="border-color: var(--valtara-rojo-alerta); color: var(--valtara-rojo-alerta);"><i class="fa-solid fa-mobile-screen-button"></i></div>
                <h3 style="font-size: 1.6rem;">La Amenaza del "Text Neck"</h3>
                <p class="marketing-text">Una cabeza humana en posición neutral pesa unos 5 kilos. Sin embargo, por las leyes de la física y el brazo de palanca, <strong>cada centímetro que inclina su cabeza hacia abajo para revisar su teléfono celular</strong>, multiplica drásticamente la fuerza de gravedad. A 60 grados de inclinación, su frágil cuello y trapecios se ven obligados a soportar una tensión brutal equivalente a cargar 27 kilos constantes, generando nódulos crónicos e isquemia tisular (falta de sangre).</p>
            </article>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       6. MARCO LEGAL (Aviso de Privacidad)
       -------------------------------------------------------------------------------- */
    legal: `
        <h2 style="font-family: var(--font-accent); font-size: 3.5rem; text-align: center; color: var(--valtara-blanco); margin-bottom: 1rem;" class="reveal">Marco Legal y Privacidad</h2>
        <div class="glass-card reveal" style="text-align: center; max-width: 800px; margin: 0 auto;">
            <i class="fa-solid fa-shield-halved" style="font-size: 4rem; color: var(--valtara-oro); margin-bottom: 2rem;"></i>
            <h3 style="font-size: 2rem; margin-bottom: 1.5rem; color: var(--valtara-blanco);">Aviso de Privacidad Digital Restringida</h3>
            <p class="marketing-text" style="text-align: justify; font-size: 1.1rem; line-height: 2;">
                En cumplimiento con la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong> de los Estados Unidos Mexicanos, Valtara y Grupo Gevizz S.A.S. de C.V. garantizan la inviolabilidad de su expediente digital.<br><br>
                Hemos diseñado la Arquitectura Sovereign V10.3 bajo el principio de <em>Privacidad por Diseño</em>. A diferencia de corporaciones tecnológicas que extraen metadatos:
                <br><br>
                <i class="fa-solid fa-check" style="color: var(--valtara-verde-ws);"></i> <strong>No rastreamos su ubicación GPS</strong> ni sus coordenadas geográficas en ningún momento.<br>
                <i class="fa-solid fa-check" style="color: var(--valtara-verde-ws);"></i> <strong>No compartimos ni comercializamos su identidad</strong> con agencias de marketing de terceros.<br>
                <i class="fa-solid fa-check" style="color: var(--valtara-verde-ws);"></i> Toda la información que usted proporciona (como su nombre o ajustes de contraste visual para accesibilidad) no viaja a nuestros servidores de forma persistente; <strong>se guarda exclusivamente en el almacenamiento local de su propio dispositivo (Local Storage).</strong> Usted es el único dueño de su rastro en nuestro portal.<br><br>
                Su navegación por nuestra biblioteca y catálogos clínicos es un ejercicio de libertad estrictamente confidencial.
            </p>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       7. MEGA FOOTER (Pie de página masivo)
       -------------------------------------------------------------------------------- */
    footer: `
        <div class="footer-grid">
            <div class="footer-col">
                <h4 style="font-size: 2.5rem; letter-spacing: 0.2rem; font-family: var(--font-accent); color: var(--valtara-blanco);">VALTARA</h4>
                <p style="font-style: italic; color: var(--valtara-oro-suave); font-size: 1.15rem; margin-bottom: 2rem; letter-spacing: 0.1rem;">Executive Therapy & Biomechanics</p>
                <p style="font-size: 1rem; color: #777;">Arquitectura de software Sovereign V 10.3. Diseño, código e inteligencia artificial desarrollados 100% in-house por la división de ingeniería de Grupo Gevizz. Código puro, rendimiento implacable.</p>
            </div>
            <div class="footer-col">
                <h4 style="font-size: 1.4rem; color: var(--valtara-oro); margin-bottom: 1.5rem;">Coordenadas y Logística</h4>
                <a href="https://maps.app.goo.gl/zvrD44iVseA7zVQZ9" target="_blank" aria-label="Abrir mapa de ubicación en Google Maps" style="display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.5rem; transition: 0.3s;">
                    <i class="fa-solid fa-map-location-dot" style="color:var(--valtara-oro); font-size: 1.5rem; margin-top: 5px;"></i> 
                    <span>Av. Paseo de la Reforma 195, Piso 3.<br>Col. Cuauhtémoc, CDMX. C.P. 06500</span>
                </a>
                <a href="tel:+523348572070" aria-label="Llamar al Concierge" style="display: flex; gap: 1rem; align-items: center; transition: 0.3s;">
                    <i class="fa-solid fa-phone" style="color:var(--valtara-oro); font-size: 1.5rem;"></i> 
                    <span style="font-size: 1.2rem; font-weight: bold;">33 4857 2070</span>
                </a>
            </div>
            <div class="footer-col">
                <h4 style="font-size: 1.4rem; color: var(--valtara-oro); margin-bottom: 1.5rem;">Avales Clínicos</h4>
                <p style="font-size: 0.95rem; line-height: 1.8;">Nuestras intervenciones están respaldadas por rigurosos estudios en fisiología humana y avaladas por la Secretaría de Salud y SEP. Operamos bajo protocolos estrictos de bioseguridad.</p>
                <div style="margin-top: 2rem; display: flex; gap: 1.5rem; font-size: 2rem;">
                    <a href="#" aria-label="Instagram" style="color: #666; transition: 0.3s;"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" aria-label="Facebook" style="color: #666; transition: 0.3s;"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#" aria-label="TikTok" style="color: #666; transition: 0.3s;"><i class="fa-brands fa-tiktok"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom" style="text-align: center; margin-top: 5rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.9rem; color: #555; letter-spacing: 0.1rem;">
            © 2026 GRUPO GEVIZZ S.A.S. DE C.V. TODOS LOS DERECHOS INTELECTUALES Y MARCAS COMERCIALES RESERVADOS.
        </div>
    `,

    /* --------------------------------------------------------------------------------
       MÉTODO INYECTOR
       -------------------------------------------------------------------------------- */
    renderAll: function() {
        const homeDiv = document.getElementById('view-home');
        if(homeDiv) homeDiv.innerHTML = this.home;
        
        const restDiv = document.getElementById('view-restoration');
        if(restDiv) restDiv.innerHTML = this.restoration;
        
        const codexDiv = document.getElementById('view-codex');
        if(codexDiv) codexDiv.innerHTML = this.codex;
        
        const sciDiv = document.getElementById('view-science');
        if(sciDiv) sciDiv.innerHTML = this.science;
        
        const ergoDiv = document.getElementById('view-ergonomics');
        if(ergoDiv) ergoDiv.innerHTML = this.ergonomics;
        
        const legalDiv = document.getElementById('view-legal');
        if(legalDiv) legalDiv.innerHTML = this.legal;
        
        const footDiv = document.getElementById('main-footer');
        if(footDiv) footDiv.innerHTML = this.footer;
    }
};
