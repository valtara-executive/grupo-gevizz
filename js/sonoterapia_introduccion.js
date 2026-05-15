window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.sonoterapia_introduccion = `

<section class="reveal" style="
    position:relative;
    overflow:hidden;
    padding:8rem 2rem 7rem;
    margin:0 auto 5rem auto;
    max-width:1400px;
">

    <!-- FONDO ATMOSFÉRICO -->
    <div style="
        position:absolute;
        inset:0;
        border-radius:3rem;
        overflow:hidden;
        background:
            radial-gradient(circle at 20% 30%, rgba(0,255,255,.08), transparent 35%),
            radial-gradient(circle at 80% 20%, rgba(212,175,55,.08), transparent 30%),
            radial-gradient(circle at 50% 80%, rgba(255,255,255,.03), transparent 35%),
            linear-gradient(180deg, rgba(5,10,15,.98), rgba(0,0,0,.92));
        border:1px solid rgba(255,255,255,.05);
        box-shadow:
            0 3rem 8rem rgba(0,0,0,.65),
            inset 0 0 6rem rgba(0,255,255,.03);
    "></div>

    <!-- PARTÍCULAS -->
    <div style="
        position:absolute;
        inset:0;
        pointer-events:none;
        overflow:hidden;
    ">
        <div class="valtara-particle" style="
            top:15%;
            left:12%;
            animation-delay:0s;
        "></div>

        <div class="valtara-particle" style="
            top:70%;
            left:18%;
            animation-delay:2s;
        "></div>

        <div class="valtara-particle" style="
            top:22%;
            right:15%;
            animation-delay:4s;
        "></div>

        <div class="valtara-particle" style="
            top:65%;
            right:12%;
            animation-delay:1s;
        "></div>
    </div>

    <!-- CONTENIDO -->
    <div style="
        position:relative;
        z-index:2;
        max-width:1100px;
        margin:0 auto;
        text-align:center;
    ">

        <!-- BADGE -->
        <div style="
            display:inline-flex;
            align-items:center;
            gap:.8rem;
            padding:.75rem 1.4rem;
            border-radius:999px;
            margin-bottom:2rem;
            background:rgba(255,255,255,.04);
            border:1px solid rgba(255,255,255,.08);
            backdrop-filter:blur(12px);
            -webkit-backdrop-filter:blur(12px);
        ">
            <div class="valtara-pulse-dot"></div>

            <span style="
                color:rgba(255,255,255,.78);
                font-size:.75rem;
                letter-spacing:.22em;
                text-transform:uppercase;
                font-weight:600;
            ">
                Therapeutic Frequency System
            </span>
        </div>

        <!-- TÍTULO -->
        <h2 style="
            margin:0 0 2rem 0;
            font-size:clamp(3rem,7vw,6.5rem);
            line-height:.95;
            font-family:var(--font-accent);
            font-weight:900;
            letter-spacing:-.04em;
            color:var(--valtara-blanco);
            text-shadow:0 0 40px rgba(0,255,255,.12);
        ">
            Sonoterapia
            <span style="
                display:block;
                margin-top:.5rem;
                background:linear-gradient(
                    90deg,
                    var(--valtara-cian-brillante),
                    var(--valtara-oro),
                    var(--valtara-cian-brillante)
                );
                background-size:200% auto;
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
                animation:valtaraGradient 8s linear infinite;
            ">
                Valtara
            </span>
        </h2>

        <!-- FRASE PRINCIPAL -->
        <p style="
            max-width:850px;
            margin:0 auto 2.5rem auto;
            color:rgba(255,255,255,.82);
            font-size:clamp(1.05rem,2vw,1.35rem);
            line-height:2;
            font-weight:300;
            letter-spacing:.02em;
        ">
            Algunas frecuencias no buscan distraerte del mundo.
            <span style="color:var(--valtara-cian-brillante);">
                Buscan devolverte lentamente a ti.
            </span>
            <br><br>
            Diseñamos este espacio sonoro para acompañar estados de descanso,
            concentración, regulación emocional y recuperación mental profunda.
            Respira despacio. El resto puede esperar unos minutos.
        </p>

        <!-- BLOQUES SENSORIALES -->
        <div style="
            display:flex;
            justify-content:center;
            gap:1rem;
            flex-wrap:wrap;
            margin-bottom:4rem;
        ">

            <div class="valtara-sensory-card">
                <i class="fa-solid fa-brain"></i>
                <span>Enfoque Profundo</span>
            </div>

            <div class="valtara-sensory-card">
                <i class="fa-solid fa-moon"></i>
                <span>Descanso Mental</span>
            </div>

            <div class="valtara-sensory-card">
                <i class="fa-solid fa-water"></i>
                <span>Calma Nerviosa</span>
            </div>

            <div class="valtara-sensory-card">
                <i class="fa-solid fa-spa"></i>
                <span>Recuperación Sensorial</span>
            </div>

        </div>

        <!-- FRASE INFERIOR -->
        <div style="
            max-width:700px;
            margin:0 auto;
        ">
            <div style="
                width:70px;
                height:1px;
                margin:0 auto 2rem;
                background:linear-gradient(
                    90deg,
                    transparent,
                    rgba(212,175,55,.6),
                    transparent
                );
            "></div>

            <p style="
                color:rgba(255,255,255,.45);
                font-size:.92rem;
                line-height:1.9;
                letter-spacing:.08em;
                text-transform:uppercase;
            ">
                Micro-Dosis • Inmersión Profunda • Valtara Sessions
            </p>
        </div>
    </div>

    <!-- CSS INTERNO -->
    <style>

        @keyframes valtaraFloat {
            0% {
                transform:translateY(0px);
                opacity:.15;
            }
            50% {
                transform:translateY(-18px);
                opacity:.35;
            }
            100% {
                transform:translateY(0px);
                opacity:.15;
            }
        }

        @keyframes valtaraGradient {
            0% {
                background-position:0% center;
            }
            100% {
                background-position:200% center;
            }
        }

        @keyframes valtaraPulse {
            0% {
                transform:scale(1);
                opacity:.6;
            }
            50% {
                transform:scale(1.25);
                opacity:1;
            }
            100% {
                transform:scale(1);
                opacity:.6;
            }
        }

        .valtara-particle{
            position:absolute;
            width:220px;
            height:220px;
            border-radius:50%;
            background:radial-gradient(
                circle,
                rgba(0,255,255,.12),
                transparent 70%
            );
            filter:blur(20px);
            animation:valtaraFloat 10s ease-in-out infinite;
        }

        .valtara-pulse-dot{
            width:10px;
            height:10px;
            border-radius:50%;
            background:var(--valtara-cian-brillante);
            box-shadow:0 0 20px rgba(0,255,255,.8);
            animation:valtaraPulse 2s ease infinite;
        }

        .valtara-sensory-card{
            display:flex;
            align-items:center;
            gap:.75rem;
            padding:1rem 1.4rem;
            border-radius:1.2rem;
            background:rgba(255,255,255,.04);
            border:1px solid rgba(255,255,255,.06);
            backdrop-filter:blur(10px);
            -webkit-backdrop-filter:blur(10px);
            transition:.4s ease;
        }

        .valtara-sensory-card:hover{
            transform:translateY(-6px);
            border-color:rgba(0,255,255,.22);
            box-shadow:0 1rem 2rem rgba(0,255,255,.08);
        }

        .valtara-sensory-card i{
            color:var(--valtara-oro);
            font-size:1rem;
        }

        .valtara-sensory-card span{
            color:rgba(255,255,255,.78);
            font-size:.92rem;
            letter-spacing:.04em;
        }

        @media (max-width:768px){

            .valtara-sensory-card{
                width:100%;
                justify-content:center;
            }

        }

    </style>

</section>

`;
