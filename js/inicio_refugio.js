/**
 * ====================================================================================
 * MÓDULO: INICIO PROMOCIONES — MINIMAL LUXURY CARD
 * Compatible con Sovereign OS / Constructor Maestro
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `
<div style="
    max-width: 520px;
    margin: 2rem auto 5rem auto;
    padding: 0 1rem;
">

    <style>

        .valtara-promo-card{
            position: relative;
            overflow: hidden;
            border-radius: 34px;
            padding: 2.4rem 2rem;
            background:
                linear-gradient(
                    145deg,
                    rgba(255,255,255,0.06),
                    rgba(255,255,255,0.02)
                );
            border: 1px solid rgba(255,255,255,0.08);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            box-shadow:
                0 20px 50px rgba(0,0,0,0.35),
                inset 0 0 30px rgba(255,255,255,0.02);
            text-align: center;
        }

        .valtara-promo-card::before{
            content:'';
            position:absolute;
            inset:0;
            background:
                radial-gradient(circle at top right, rgba(242,201,76,0.12), transparent 30%),
                radial-gradient(circle at bottom left, rgba(0,255,204,0.08), transparent 25%);
            pointer-events:none;
        }

        .valtara-promo-badge{
            display:inline-flex;
            align-items:center;
            gap:10px;
            padding:10px 18px;
            border-radius:999px;
            background:rgba(242,201,76,0.10);
            border:1px solid rgba(242,201,76,0.22);
            color:var(--valtara-oro);
            font-size:0.78rem;
            font-weight:900;
            letter-spacing:2px;
            text-transform:uppercase;
            margin-bottom:1.8rem;
            position:relative;
            z-index:2;
        }

        .valtara-promo-title{
            font-family:var(--font-accent);
            font-size:2.7rem;
            line-height:1.05;
            color:white;
            margin-bottom:1.2rem;
            position:relative;
            z-index:2;
        }

        .valtara-promo-text{
            color:var(--valtara-gris-texto);
            line-height:1.9;
            font-size:1.05rem;
            margin-bottom:2rem;
            position:relative;
            z-index:2;
        }

        .valtara-promo-grid{
            display:flex;
            flex-direction:column;
            gap:1rem;
            margin-bottom:2rem;
            position:relative;
            z-index:2;
        }

        .valtara-promo-item{
            padding:1.2rem;
            border-radius:22px;
            background:rgba(255,255,255,0.04);
            border:1px solid rgba(255,255,255,0.08);
        }

        .valtara-promo-item strong{
            display:block;
            color:white;
            font-size:1.1rem;
            margin-bottom:0.5rem;
        }

        .valtara-promo-item span{
            color:#d0d0d0;
            line-height:1.8;
            font-size:0.95rem;
        }

        .valtara-promo-btn{
            display:inline-flex;
            align-items:center;
            justify-content:center;
            gap:12px;
            width:100%;
            padding:17px 24px;
            border-radius:18px;
            background:linear-gradient(135deg,#F2C94C,#F2994A);
            color:#050508;
            font-weight:900;
            text-decoration:none;
            font-size:1rem;
            transition:all 0.3s ease;
            box-shadow:0 10px 30px rgba(242,201,76,0.25);
            position:relative;
            z-index:2;
        }

        .valtara-promo-btn:hover{
            transform:translateY(-4px);
        }

        .valtara-promo-note{
            margin-top:1.4rem;
            color:#9f9f9f;
            line-height:1.7;
            font-size:0.88rem;
            position:relative;
            z-index:2;
        }

    </style>

    <article class="valtara-promo-card reveal">

        <div class="valtara-promo-badge">
            <i class="fa-solid fa-sparkles"></i>
            PROMOCIONES VALTARA
        </div>

        <h2 class="valtara-promo-title">
            Tu cuerpo también merece descanso.
        </h2>

        <p class="valtara-promo-text">
            Experiencias terapéuticas premium con promociones
            activas, aromaterapia incluida y atención personalizada.
        </p>

        <div class="valtara-promo-grid">

            <div class="valtara-promo-item">
                <strong>
                    <i class="fa-solid fa-gift"></i>
                    $169 MXN de cortesía
                </strong>
                <span>
                    Disponible lunes y martes
                    en horarios seleccionados.
                </span>
            </div>

            <div class="valtara-promo-item">
                <strong>
                    <i class="fa-solid fa-sun"></i>
                    20% OFF Matutino
                </strong>
                <span>
                    Válido antes de las 2 PM
                    en terapias participantes.
                </span>
            </div>

            <div class="valtara-promo-item">
                <strong>
                    <i class="fa-solid fa-leaf"></i>
                    Aromaterapia Incluida
                </strong>
                <span>
                    Lavanda, Jazmín, Té Blanco,
                    Eucalipto y más.
                    Sujeto a disponibilidad.
                </span>
            </div>

        </div>

        <a
            href="https://wa.me/5213348572070?text=Hola,%20vi%20las%20promociones%20de%20Valtara%20y%20me%20gustaría%20agendar."
            target="_blank"
            class="valtara-promo-btn">

            <i class="fa-brands fa-whatsapp"></i>
            Reservar por WhatsApp

        </a>

        <p class="valtara-promo-note">
            Contacto oficial Valtara:
            <strong style="color:white;">33 4857 2070</strong>
        </p>

    </article>

</div>
`;
