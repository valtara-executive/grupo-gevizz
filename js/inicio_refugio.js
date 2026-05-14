/**
 * ====================================================================================
 * MÓDULO: INICIO PROMOCIONES — EDITORIAL EXPERIENCE
 * Arquitectura compatible con Sovereign OS / Constructor Maestro
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `
<section id="valtara-editorial-experience" style="
    width:100%;
    max-width:1100px;
    margin:0 auto;
    padding:1rem 1.5rem 2rem 1.5rem;
    position:relative;
    overflow:hidden;
">

    <style>

        #valtara-editorial-experience *{
            box-sizing:border-box;
        }

        .vt-editorial-wrapper{
            display:flex;
            flex-direction:column;
            gap:1.5rem;
        }

        .vt-editorial-hero{
            position:relative;
            overflow:hidden;
            border-radius:34px;
            padding:2.5rem;
            background:
                linear-gradient(
                    135deg,
                    rgba(255,255,255,0.05),
                    rgba(255,255,255,0.015)
                );
            backdrop-filter:blur(18px);
            -webkit-backdrop-filter:blur(18px);
            border:1px solid rgba(255,255,255,0.08);
        }

        .vt-editorial-hero::before{
            content:'';
            position:absolute;
            inset:0;
            background:
                radial-gradient(circle at top right, rgba(242,201,76,0.12), transparent 28%),
                radial-gradient(circle at bottom left, rgba(0,255,204,0.10), transparent 25%);
            pointer-events:none;
        }

        .vt-floating-orb{
            position:absolute;
            border-radius:50%;
            filter:blur(20px);
            opacity:0.25;
            animation:vtFloat 8s ease-in-out infinite;
            pointer-events:none;
        }

        .vt-orb-1{
            width:120px;
            height:120px;
            background:#F2C94C;
            top:-40px;
            right:-30px;
        }

        .vt-orb-2{
            width:90px;
            height:90px;
            background:#00FFCC;
            bottom:-20px;
            left:-20px;
            animation-delay:2s;
        }

        @keyframes vtFloat{
            0%,100%{
                transform:translateY(0px);
            }
            50%{
                transform:translateY(-12px);
            }
        }

        .vt-kicker{
            display:inline-flex;
            align-items:center;
            gap:10px;
            padding:10px 18px;
            border-radius:999px;
            background:rgba(242,201,76,0.10);
            border:1px solid rgba(242,201,76,0.22);
            color:var(--valtara-oro);
            font-size:0.78rem;
            letter-spacing:2px;
            text-transform:uppercase;
            margin-bottom:1.5rem;
            font-weight:800;
        }

        .vt-main-title{
            font-family:var(--font-accent);
            font-size:clamp(2.5rem,5vw,4.4rem);
            line-height:1.05;
            color:white;
            margin-bottom:1.4rem;
            max-width:760px;
            position:relative;
            z-index:2;
        }

        .vt-main-text{
            color:var(--valtara-gris-texto);
            font-size:1.15rem;
            line-height:1.9;
            max-width:760px;
            position:relative;
            z-index:2;
        }

        .vt-story-card{
            margin-top:2.5rem;
            position:relative;
            z-index:2;
            display:flex;
            flex-direction:column;
            gap:1.4rem;
        }

        .vt-story-badge{
            display:inline-flex;
            align-items:center;
            gap:10px;
            width:max-content;
            padding:10px 18px;
            border-radius:999px;
            background:rgba(255,255,255,0.06);
            border:1px solid rgba(255,255,255,0.08);
            color:white;
            font-size:0.9rem;
        }

        .vt-story-title{
            font-size:2rem;
            color:white;
            font-weight:800;
            line-height:1.2;
        }

        .vt-story-description{
            color:#d7d7d7;
            line-height:2;
            font-size:1.05rem;
            max-width:780px;
        }

        .vt-highlight{
            color:var(--valtara-oro);
            font-weight:800;
        }

        .vt-meta-grid{
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
            gap:1rem;
            margin-top:1rem;
        }

        .vt-meta-card{
            padding:1.2rem;
            border-radius:22px;
            background:rgba(255,255,255,0.04);
            border:1px solid rgba(255,255,255,0.06);
            backdrop-filter:blur(12px);
        }

        .vt-meta-card strong{
            display:block;
            color:white;
            margin-bottom:0.5rem;
            font-size:1rem;
        }

        .vt-meta-card span{
            color:#d0d0d0;
            line-height:1.7;
            font-size:0.95rem;
        }

        .vt-cta-row{
            display:flex;
            flex-wrap:wrap;
            gap:1rem;
            margin-top:2rem;
        }

        .vt-btn-primary{
            display:inline-flex;
            align-items:center;
            justify-content:center;
            gap:12px;
            padding:16px 28px;
            border-radius:18px;
            background:linear-gradient(135deg,#F2C94C,#F2994A);
            color:#050508;
            font-weight:900;
            text-decoration:none;
            border:none;
            cursor:pointer;
            transition:transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow:0 10px 30px rgba(242,201,76,0.25);
        }

        .vt-btn-primary:hover{
            transform:translateY(-4px);
        }

        .vt-btn-secondary{
            display:inline-flex;
            align-items:center;
            justify-content:center;
            gap:12px;
            padding:16px 28px;
            border-radius:18px;
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.12);
            color:white;
            text-decoration:none;
            font-weight:700;
            transition:all 0.3s ease;
        }

        .vt-btn-secondary:hover{
            background:rgba(255,255,255,0.10);
            transform:translateY(-4px);
        }

        .vt-mini-grid{
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
            gap:1rem;
        }

        .vt-mini-card{
            position:relative;
            overflow:hidden;
            border-radius:28px;
            padding:1.6rem;
            background:
                linear-gradient(
                    145deg,
                    rgba(255,255,255,0.05),
                    rgba(255,255,255,0.015)
                );
            border:1px solid rgba(255,255,255,0.08);
            backdrop-filter:blur(14px);
        }

        .vt-mini-card::before{
            content:'';
            position:absolute;
            inset:0;
            background:
                radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 35%);
            pointer-events:none;
        }

        .vt-mini-icon{
            width:60px;
            height:60px;
            border-radius:18px;
            display:flex;
            align-items:center;
            justify-content:center;
            margin-bottom:1rem;
            font-size:1.4rem;
            background:rgba(255,255,255,0.06);
            border:1px solid rgba(255,255,255,0.08);
            color:var(--valtara-oro);
        }

        .vt-mini-title{
            color:white;
            font-size:1.2rem;
            font-weight:800;
            margin-bottom:0.9rem;
        }

        .vt-mini-text{
            color:#d2d2d2;
            line-height:1.9;
            font-size:0.97rem;
        }

        .vt-mini-link{
            display:inline-flex;
            align-items:center;
            gap:10px;
            margin-top:1.3rem;
            color:var(--valtara-cian-brillante);
            text-decoration:none;
            font-weight:800;
            transition:opacity 0.3s ease;
        }

        .vt-mini-link:hover{
            opacity:0.8;
        }

        .vt-footer-note{
            margin-top:1rem;
            color:#a8a8a8;
            line-height:1.8;
            font-size:0.92rem;
            text-align:center;
        }

        @media(max-width:768px){

            .vt-editorial-hero{
                padding:2rem 1.4rem;
                border-radius:28px;
            }

            .vt-main-title{
                font-size:2.4rem;
            }

            .vt-story-title{
                font-size:1.6rem;
            }

            .vt-story-description{
                font-size:1rem;
            }

            .vt-cta-row{
                flex-direction:column;
            }

            .vt-btn-primary,
            .vt-btn-secondary{
                width:100%;
            }

        }

    </style>

    <div class="vt-editorial-wrapper">

        <!-- HERO -->
        <article class="vt-editorial-hero reveal">

            <div class="vt-floating-orb vt-orb-1"></div>
            <div class="vt-floating-orb vt-orb-2"></div>

            <div class="vt-kicker">
                <i class="fa-solid fa-sparkles"></i>
                EXPERIENCIAS DESTACADAS
            </div>

            <h2 class="vt-main-title">
                Terapias que no solo relajan tu cuerpo…
                también cambian cómo se siente tu día.
            </h2>

            <p class="vt-main-text">
                Valtara combina biomecánica, aromaterapia y experiencias sensoriales
                para transformar el estrés físico en descanso profundo.
                Cada sesión está diseñada para sentirse íntima, elegante,
                cálida y completamente personalizada.
            </p>

            <div class="vt-story-card">

                <div class="vt-story-badge">
                    <i class="fa-solid fa-crown"></i>
                    EXPERIENCIA RECOMENDADA DE ESTA SEMANA
                </div>

                <div class="vt-story-title">
                    Ritual Lomi Lomi Supremo · <span class="vt-highlight">$999 MXN</span>
                </div>

                <div class="vt-story-description">
                    Imagina entrar a una habitación donde el sonido ambiental,
                    la temperatura cálida y el aroma botánico hacen que tu cuerpo
                    deje de sentirse en alerta.

                    El <strong>Lomi Lomi Supremo</strong> utiliza movimientos largos,
                    envolventes y continuos inspirados en el oleaje hawaiano,
                    acompañados por <strong>pétalos de rosas, flores aromáticas
                    y aceites tibios</strong> que convierten la sesión en una experiencia
                    emocional además de física.

                    Diseñado para quienes viven bajo presión constante,
                    agotamiento mental o burnout ejecutivo.
                </div>

                <div class="vt-meta-grid">

                    <div class="vt-meta-card">
                        <strong>
                            <i class="fa-solid fa-clock"></i>
                            Duración
                        </strong>
                        <span>
                            Sesión profunda premium enfocada en relajación
                            inmersiva y restauración emocional.
                        </span>
                    </div>

                    <div class="vt-meta-card">
                        <strong>
                            <i class="fa-solid fa-leaf"></i>
                            Aroma sugerido
                        </strong>
                        <span>
                            Lavanda + Té Blanco para inducir calma,
                            respiración lenta y descanso profundo.
                        </span>
                    </div>

                    <div class="vt-meta-card">
                        <strong>
                            <i class="fa-solid fa-gift"></i>
                            Beneficio activo
                        </strong>
                        <span>
                            20% OFF en horarios matutinos seleccionados
                            antes de las 2 PM.
                        </span>
                    </div>

                </div>

                <div class="vt-cta-row">

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20vi%20la%20experiencia%20Ritual%20Lomi%20Lomi%20Supremo%20en%20la%20página%20de%20Valtara%20y%20me%20gustaría%20agendar."
                        target="_blank"
                        class="vt-btn-primary">

                        <i class="fa-brands fa-whatsapp"></i>
                        Reservar experiencia

                    </a>

                    <button
                        onclick="if(window.Router){window.Router.navigate('restoration');}"
                        class="vt-btn-secondary">

                        <i class="fa-solid fa-book-open"></i>
                        Explorar catálogo completo

                    </button>

                </div>

            </div>

        </article>

        <!-- MINI CARDS -->
        <div class="vt-mini-grid">

            <article class="vt-mini-card reveal">

                <div class="vt-mini-icon">
                    <i class="fa-solid fa-fire"></i>
                </div>

                <div class="vt-mini-title">
                    Veloterapia & Esferas Chinas · $819 MXN
                </div>

                <div class="vt-mini-text">
                    Vibración sonora, esferas terapéuticas y el calor delicado
                    de velas de soya aromáticas crean una experiencia
                    profundamente envolvente.
                    Ideal para ansiedad, agotamiento emocional
                    y sensibilidad sensorial elevada.
                </div>

                <a
                    href="https://wa.me/5213348572070?text=Hola,%20quiero%20información%20sobre%20Veloterapia%20y%20Esferas%20Chinas."
                    target="_blank"
                    class="vt-mini-link">

                    <i class="fa-brands fa-whatsapp"></i>
                    Solicitar información

                </a>

            </article>

            <article class="vt-mini-card reveal">

                <div class="vt-mini-icon">
                    <i class="fa-solid fa-leaf"></i>
                </div>

                <div class="vt-mini-title">
                    Aromaterapias incluidas sin costo adicional
                </div>

                <div class="vt-mini-text">
                    Lavanda para descanso profundo.
                    Jazmín para equilibrio emocional.
                    Té Blanco para calma elegante.
                    Eucalipto para respiración ligera.
                    Todas las esencias están sujetas a disponibilidad.
                </div>

                <a
                    href="https://wa.me/5213348572070?text=Hola,%20quiero%20conocer%20las%20aromaterapias%20disponibles."
                    target="_blank"
                    class="vt-mini-link">

                    <i class="fa-brands fa-whatsapp"></i>
                    Ver esencias disponibles

                </a>

            </article>

        </div>

        <p class="vt-footer-note">
            Promociones sujetas a disponibilidad y horario.
            Algunas experiencias incluyen cortesías sensoriales nocturnas.
            Contacto oficial Valtara: <strong>33 4857 2070</strong>.
        </p>

    </div>

</section>
`;
