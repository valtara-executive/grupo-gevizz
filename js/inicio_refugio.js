/**
 * ====================================================================================
 * MÓDULO: INICIO PROMOCIONES — VISUAL FIX FINAL
 * Compatible con constructor_maestro.js / core.js / renderAll()
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `
<div style="max-width:1100px;margin:2rem auto 4rem auto;padding:0 1.2rem;">

    <style>

        .vtx-promo-shell *{
            box-sizing:border-box;
        }

        .vtx-promo-shell{
            width:100%;
        }

        .vtx-main-card{
            position:relative;
            overflow:hidden;
            border-radius:32px;
            padding:2.5rem;
            background:rgba(255,255,255,0.035);
            border:1px solid rgba(255,255,255,0.08);
            backdrop-filter:blur(16px);
            -webkit-backdrop-filter:blur(16px);
            margin-bottom:1.4rem;
        }

        .vtx-main-card::before{
            content:'';
            position:absolute;
            inset:0;
            background:
                radial-gradient(circle at top right, rgba(242,201,76,0.12), transparent 30%),
                radial-gradient(circle at bottom left, rgba(0,255,204,0.08), transparent 25%);
            pointer-events:none;
        }

        .vtx-badge{
            display:inline-flex;
            align-items:center;
            gap:10px;
            padding:10px 18px;
            border-radius:999px;
            background:rgba(242,201,76,0.10);
            border:1px solid rgba(242,201,76,0.22);
            color:var(--valtara-oro);
            font-size:0.8rem;
            font-weight:900;
            letter-spacing:2px;
            text-transform:uppercase;
            margin-bottom:1.5rem;
        }

        .vtx-title{
            font-family:var(--font-accent);
            font-size:clamp(2.4rem,5vw,4.2rem);
            line-height:1.05;
            color:white;
            margin-bottom:1.4rem;
            max-width:780px;
            position:relative;
            z-index:2;
        }

        .vtx-text{
            color:var(--valtara-gris-texto);
            line-height:1.9;
            font-size:1.1rem;
            max-width:760px;
            position:relative;
            z-index:2;
        }

        .vtx-highlight-card{
            margin-top:2rem;
            padding:1.8rem;
            border-radius:26px;
            background:rgba(255,255,255,0.04);
            border:1px solid rgba(255,255,255,0.08);
            position:relative;
            z-index:2;
        }

        .vtx-highlight-card h3{
            color:white;
            font-size:2rem;
            margin-bottom:1rem;
            line-height:1.2;
        }

        .vtx-highlight-card p{
            color:#d7d7d7;
            line-height:2;
            font-size:1rem;
            margin-bottom:1.2rem;
        }

        .vtx-price{
            color:var(--valtara-oro);
            font-weight:900;
        }

        .vtx-grid{
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
            gap:1rem;
            margin-top:1.4rem;
        }

        .vtx-mini{
            border-radius:24px;
            padding:1.4rem;
            background:rgba(255,255,255,0.03);
            border:1px solid rgba(255,255,255,0.08);
            backdrop-filter:blur(12px);
        }

        .vtx-mini-icon{
            width:58px;
            height:58px;
            border-radius:18px;
            display:flex;
            align-items:center;
            justify-content:center;
            background:rgba(255,255,255,0.06);
            border:1px solid rgba(255,255,255,0.08);
            color:var(--valtara-oro);
            font-size:1.4rem;
            margin-bottom:1rem;
        }

        .vtx-mini h4{
            color:white;
            font-size:1.15rem;
            margin-bottom:0.8rem;
        }

        .vtx-mini p{
            color:#d0d0d0;
            line-height:1.8;
            font-size:0.95rem;
        }

        .vtx-buttons{
            display:flex;
            flex-wrap:wrap;
            gap:1rem;
            margin-top:2rem;
        }

        .vtx-btn-primary{
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
            transition:all 0.3s ease;
            box-shadow:0 10px 30px rgba(242,201,76,0.25);
        }

        .vtx-btn-primary:hover{
            transform:translateY(-4px);
        }

        .vtx-btn-secondary{
            display:inline-flex;
            align-items:center;
            justify-content:center;
            gap:12px;
            padding:16px 28px;
            border-radius:18px;
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.12);
            color:white;
            font-weight:700;
            text-decoration:none;
            transition:all 0.3s ease;
            cursor:pointer;
        }

        .vtx-btn-secondary:hover{
            background:rgba(255,255,255,0.10);
            transform:translateY(-4px);
        }

        .vtx-note{
            margin-top:1.4rem;
            color:#aaaaaa;
            line-height:1.8;
            font-size:0.92rem;
        }

        @media(max-width:768px){

            .vtx-main-card{
                padding:2rem 1.4rem;
                border-radius:28px;
            }

            .vtx-highlight-card h3{
                font-size:1.6rem;
            }

            .vtx-buttons{
                flex-direction:column;
            }

            .vtx-btn-primary,
            .vtx-btn-secondary{
                width:100%;
            }

        }

    </style>

    <section class="vtx-promo-shell reveal">

        <article class="vtx-main-card">

            <div class="vtx-badge">
                <i class="fa-solid fa-sparkles"></i>
                EXPERIENCIAS DESTACADAS
            </div>

            <h2 class="vtx-title">
                Hay días donde el cuerpo solo necesita
                sentirse cuidado otra vez.
            </h2>

            <p class="vtx-text">
                Valtara combina biomecánica, masaje terapéutico,
                aromaterapia y experiencias sensoriales premium
                para transformar agotamiento físico en descanso profundo.
                Todo dentro de una experiencia elegante,
                íntima y emocionalmente reconfortante.
            </p>

            <div class="vtx-highlight-card">

                <h3>
                    Ritual Lomi Lomi Supremo ·
                    <span class="vtx-price">$999 MXN</span>
                </h3>

                <p>
                    Inspirado en las tradiciones hawaianas,
                    este ritual utiliza movimientos largos,
                    envolventes y continuos acompañados
                    por pétalos de rosas,
                    flores aromáticas
                    y aceites tibios cuidadosamente seleccionados.

                    El objetivo no es solamente relajar músculos:
                    es ayudarle al cuerpo a salir del estado de alerta constante.
                </p>

                <div class="vtx-grid">

                    <div class="vtx-mini">

                        <div class="vtx-mini-icon">
                            <i class="fa-solid fa-fire"></i>
                        </div>

                        <h4>
                            Veloterapia & Esferas Chinas
                        </h4>

                        <p>
                            Terapia inmersiva con esferas terapéuticas,
                            vibración sonora y velas de soya aromáticas.
                            Diseñada para ansiedad,
                            sensibilidad emocional
                            y descanso profundo.
                            <strong style="color:white;">$819 MXN</strong>
                        </p>

                    </div>

                    <div class="vtx-mini">

                        <div class="vtx-mini-icon">
                            <i class="fa-solid fa-leaf"></i>
                        </div>

                        <h4>
                            Aromaterapias incluidas
                        </h4>

                        <p>
                            Lavanda,
                            Jazmín,
                            Té Blanco,
                            Eucalipto,
                            Vainilla y más.
                            Todas las esencias están incluidas
                            sin costo adicional
                            y sujetas a disponibilidad.
                        </p>

                    </div>

                    <div class="vtx-mini">

                        <div class="vtx-mini-icon">
                            <i class="fa-solid fa-gift"></i>
                        </div>

                        <h4>
                            Promociones activas
                        </h4>

                        <p>
                            $169 MXN de cortesía
                            lunes y martes en horarios seleccionados
                            y 20% OFF matutino antes de las 2 PM
                            en experiencias participantes.
                        </p>

                    </div>

                </div>

                <div class="vtx-buttons">

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20vi%20las%20experiencias%20destacadas%20de%20Valtara%20y%20me%20gustaría%20agendar."
                        target="_blank"
                        class="vtx-btn-primary">

                        <i class="fa-brands fa-whatsapp"></i>
                        Reservar experiencia

                    </a>

                    <button
                        onclick="if(window.Router){window.Router.navigate('restoration');}"
                        class="vtx-btn-secondary">

                        <i class="fa-solid fa-book-open"></i>
                        Explorar catálogo completo

                    </button>

                </div>

                <p class="vtx-note">
                    Promociones sujetas a disponibilidad y horario.
                    Aromaterapias incluidas sin costo adicional.
                    Contacto oficial Valtara:
                    <strong style="color:white;">33 4857 2070</strong>.
                </p>

            </div>

        </article>

    </section>

</div>
`;
