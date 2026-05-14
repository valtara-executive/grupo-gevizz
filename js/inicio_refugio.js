/**
 * ====================================================================================
 * INICIO_PROMOCIONES.JS — Valtara Luxury Sensory Carousel
 * Arquitectura compatible con TODOS los módulos actuales.
 * Basado EXACTAMENTE en el patrón funcional de inicio_refugio.js
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `

<div style="max-width:1400px;margin:2rem auto 7rem auto;padding:0 1.5rem;overflow:hidden;">

    <!-- HERO -->
    <section class="glass-card reveal"
        style="
            position:relative;
            overflow:hidden;
            border-radius:34px;
            padding:4rem 2rem;
            text-align:center;
            background:
                radial-gradient(circle at top right, rgba(242,201,76,0.12), transparent 30%),
                radial-gradient(circle at bottom left, rgba(0,255,204,0.08), transparent 40%),
                linear-gradient(180deg, rgba(15,15,20,0.94), rgba(6,6,10,0.98));
            border:1px solid rgba(255,255,255,0.08);
        "
    >

        <div style="
            position:absolute;
            top:-120px;
            right:-120px;
            width:320px;
            height:320px;
            border-radius:50%;
            background:radial-gradient(circle, rgba(242,201,76,0.14), transparent 70%);
            filter:blur(10px);
        "></div>

        <div style="
            position:absolute;
            bottom:-140px;
            left:-140px;
            width:340px;
            height:340px;
            border-radius:50%;
            background:radial-gradient(circle, rgba(0,255,204,0.10), transparent 70%);
            filter:blur(10px);
        "></div>

        <div style="position:relative;z-index:2;">

            <div style="
                display:inline-flex;
                align-items:center;
                gap:10px;
                padding:12px 24px;
                border-radius:999px;
                background:rgba(242,201,76,0.08);
                border:1px solid rgba(242,201,76,0.20);
                margin-bottom:2rem;
            ">
                <i class="fa-solid fa-sparkles fa-fade"
                    style="color:var(--valtara-oro);"></i>

                <span style="
                    color:var(--valtara-oro);
                    font-size:.8rem;
                    font-weight:900;
                    letter-spacing:2px;
                    text-transform:uppercase;
                ">
                    EXPERIENCIAS SENSORIALES
                </span>
            </div>

            <h2 style="
                font-family:var(--font-accent);
                font-size:clamp(3rem,6vw,5.5rem);
                line-height:1.05;
                color:white;
                margin-bottom:1.5rem;
                font-weight:400;
            ">
                El descanso también puede sentirse
                <span style="color:var(--valtara-oro);">
                    extraordinario
                </span>
            </h2>

            <p style="
                max-width:900px;
                margin:0 auto;
                color:var(--valtara-gris-texto);
                line-height:1.9;
                font-size:1.15rem;
                font-weight:300;
            ">
                Descubre promociones, rituales biomecánicos, aromaterapias y experiencias
                sensoriales diseñadas para disminuir estrés, restaurar movilidad y transformar
                completamente la manera en que tu cuerpo descansa.
            </p>

        </div>

    </section>

    <!-- CARRUSEL -->
    <div class="valtara-carousel-wrap">

        <div class="valtara-carousel-track">

            <!-- TARJETA 1 -->
            <article class="valtara-card">
                <div class="valtara-glow" style="background:#F2C94C;"></div>

                <div class="valtara-icon"
                    style="background:rgba(242,201,76,0.12);">
                    <i class="fa-solid fa-sun fa-beat-fade"
                        style="color:#F2C94C;"></i>
                </div>

                <span class="valtara-chip">20% OFF MATUTINO</span>

                <h3>Hay mañanas donde el cuerpo pide empezar diferente.</h3>

                <p>
                    Jueves a domingo antes de las 2 PM algunas experiencias cuentan
                    con un beneficio especial diseñado para ayudarte a comenzar el día
                    con claridad, calma y ligereza emocional.
                </p>

                <strong>Ideal para estrés laboral y burnout.</strong>

                <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20el%2020%25%20OFF%20matutino."
                   target="_blank">
                   Reservar experiencia
                </a>
            </article>

            <!-- TARJETA 2 -->
            <article class="valtara-card">
                <div class="valtara-glow" style="background:#ff7eb6;"></div>

                <div class="valtara-icon"
                    style="background:rgba(255,126,182,0.12);">
                    <i class="fa-solid fa-water fa-beat"
                        style="color:#ff7eb6;"></i>
                </div>

                <span class="valtara-chip">LOMI LOMI SUPREMO</span>

                <h3>El océano también sabe abrazar.</h3>

                <p>
                    Ritual hawaiano envolvente realizado con antebrazos,
                    pétalos de rosas y flores aromáticas que transforman
                    la sesión en una experiencia profundamente sensorial.
                </p>

                <strong>$999 MXN · Sensación de flotar.</strong>

                <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20el%20Ritual%20Lomi%20Lomi."
                   target="_blank">
                   Quiero vivirlo
                </a>
            </article>

            <!-- TARJETA 3 -->
            <article class="valtara-card">
                <div class="valtara-glow" style="background:#8f94fb;"></div>

                <div class="valtara-icon"
                    style="background:rgba(143,148,251,0.12);">
                    <i class="fa-solid fa-moon fa-fade"
                        style="color:#8f94fb;"></i>
                </div>

                <span class="valtara-chip">LAVANDA</span>

                <h3>No todas las personas descansan cuando duermen.</h3>

                <p>
                    Aroma ideal para ansiedad, agotamiento mental y noches
                    donde el cuerpo continúa tenso incluso después del día.
                </p>

                <strong>Sugerencia nocturna premium.</strong>

                <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20Lavanda%20en%20mi%20experiencia."
                   target="_blank">
                   Elegir aroma
                </a>
            </article>

            <!-- TARJETA 4 -->
            <article class="valtara-card">
                <div class="valtara-glow" style="background:#ffaa00;"></div>

                <div class="valtara-icon"
                    style="background:rgba(255,170,0,0.12);">
                    <i class="fa-solid fa-fire fa-bounce"
                        style="color:#ffaa00;"></i>
                </div>

                <span class="valtara-chip">VELATERAPIA SENSORIAL</span>

                <h3>El calor correcto puede cambiar completamente el cuerpo.</h3>

                <p>
                    Esferas chinas, velas cálidas y aceite de soya tibio
                    derritiéndose suavemente sobre la piel para inducir
                    relajación profunda y regulación emocional.
                </p>

                <strong>$819 MXN · Ritual inmersivo.</strong>

                <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20Veloterapia%20Sensorial."
                   target="_blank">
                   Reservar ritual
                </a>
            </article>

            <!-- TARJETA 5 -->
            <article class="valtara-card">
                <div class="valtara-glow" style="background:#ff5555;"></div>

                <div class="valtara-icon"
                    style="background:rgba(255,85,85,0.12);">
                    <i class="fa-solid fa-dumbbell fa-shake"
                        style="color:#ff5555;"></i>
                </div>

                <span class="valtara-chip">DESCOMPRESIÓN</span>

                <h3>El estrés también se queda atrapado en los músculos.</h3>

                <p>
                    Liberación profunda para cuello rígido, espalda saturada,
                    piernas fatigadas y tensión acumulada por jornadas eternas.
                </p>

                <strong>$729 MXN · Recovery profundo.</strong>

                <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20Masaje%20Deportivo."
                   target="_blank">
                   Necesito descompresión
                </a>
            </article>

            <!-- TARJETA 6 -->
            <article class="valtara-card">
                <div class="valtara-glow" style="background:#d66efd;"></div>

                <div class="valtara-icon"
                    style="background:rgba(214,110,253,0.12);">
                    <i class="fa-solid fa-mug-hot fa-fade"
                        style="color:#d66efd;"></i>
                </div>

                <span class="valtara-chip">RITUAL NOCTURNO</span>

                <h3>Las mejores noches empiezan cuando el cuerpo deja de defenderse.</h3>

                <p>
                    Algunas experiencias nocturnas incluyen té cálido
                    de frutos rojos para transformar completamente la
                    transición emocional hacia el descanso.
                </p>

                <strong>Después de las 7 PM.</strong>

                <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20una%20experiencia%20nocturna."
                   target="_blank">
                   Reservar noche
                </a>
            </article>

            <!-- TARJETA 7 -->
            <article class="valtara-card">
                <div class="valtara-glow" style="background:#52ffa8;"></div>

                <div class="valtara-icon"
                    style="background:rgba(82,255,168,0.12);">
                    <i class="fa-solid fa-leaf fa-beat"
                        style="color:#52ffa8;"></i>
                </div>

                <span class="valtara-chip">AYURVEDA</span>

                <h3>Hay personas que no necesitan fuerza. Necesitan contención.</h3>

                <p>
                    Aceites tibios y aromas botánicos para disminuir
                    hiperactividad emocional y devolverle tranquilidad
                    al sistema nervioso.
                </p>

                <strong>$829 MXN · Reconexión emocional.</strong>

                <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20Ayurveda%20y%20Aromaterapia."
                   target="_blank">
                   Quiero reconectar
                </a>
            </article>

            <!-- TARJETA 8 -->
            <article class="valtara-card">
                <div class="valtara-glow" style="background:#F2C94C;"></div>

                <div class="valtara-icon"
                    style="background:rgba(242,201,76,0.12);">
                    <i class="fa-solid fa-gift fa-bounce"
                        style="color:#F2C94C;"></i>
                </div>

                <span class="valtara-chip">$169 OFF</span>

                <h3>A veces el descanso empieza con una oportunidad.</h3>

                <p>
                    Lunes y martes después de la 1 PM algunas experiencias
                    cuentan con una cortesía diseñada para ayudarte a
                    regalarle una pausa real a tu cuerpo.
                </p>

                <strong>Promoción limitada.</strong>

                <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20la%20promoción%20de%20$169."
                   target="_blank">
                   Reclamar beneficio
                </a>
            </article>

        </div>

    </div>

    <!-- FOOTER -->
    <section class="glass-card reveal"
        style="
            margin-top:3rem;
            padding:2.5rem;
            border-radius:28px;
            text-align:center;
            background:
                linear-gradient(180deg,
                rgba(255,255,255,0.03),
                rgba(255,255,255,0.015));
        "
    >

        <h3 style="
            color:white;
            font-size:2rem;
            margin-bottom:1rem;
            font-family:var(--font-accent);
            font-weight:400;
        ">
            Reforma 195 · Próxima apertura cerca de Metro Eugenia
        </h3>

        <p style="
            color:var(--valtara-gris-texto);
            line-height:1.9;
            max-width:850px;
            margin:0 auto 2rem auto;
            font-size:1.05rem;
        ">
            Aromaterapias sujetas a disponibilidad.
            Promociones no acumulables.
            Cada experiencia está diseñada para sentirse más cercana
            a un ritual sensorial que a un masaje convencional.
        </p>

        <a href="https://wa.me/5213348572070"
           target="_blank"
           style="
                display:inline-flex;
                align-items:center;
                gap:14px;
                padding:18px 34px;
                border-radius:18px;
                background:linear-gradient(135deg,#25D366,#1EBE5D);
                color:white;
                text-decoration:none;
                font-weight:900;
                font-size:1.05rem;
                box-shadow:0 12px 35px rgba(37,211,102,0.30);
           ">

            <i class="fa-brands fa-whatsapp"
                style="font-size:1.4rem;"></i>

            WhatsApp · 33 4857 2070

        </a>

    </section>

</div>

<style>

.valtara-carousel-wrap{
    overflow-x:auto;
    overflow-y:hidden;
    padding:2rem 0 1rem 0;
    scroll-behavior:smooth;
    -webkit-overflow-scrolling:touch;
}

.valtara-carousel-wrap::-webkit-scrollbar{
    height:8px;
}

.valtara-carousel-wrap::-webkit-scrollbar-thumb{
    background:rgba(255,255,255,0.15);
    border-radius:999px;
}

.valtara-carousel-track{
    display:flex;
    gap:24px;
    width:max-content;
    padding-right:2rem;
}

.valtara-card{
    position:relative;
    overflow:hidden;
    width:340px;
    min-height:520px;
    border-radius:32px;
    padding:2rem;
    flex-shrink:0;

    background:
        linear-gradient(
            180deg,
            rgba(255,255,255,0.06),
            rgba(255,255,255,0.02)
        );

    border:1px solid rgba(255,255,255,0.08);

    backdrop-filter:blur(18px);

    transition:
        transform .45s ease,
        box-shadow .45s ease,
        border-color .45s ease;
}

.valtara-card:hover{
    transform:translateY(-10px);
    border-color:rgba(242,201,76,0.22);

    box-shadow:
        0 25px 50px rgba(0,0,0,0.35),
        0 0 40px rgba(242,201,76,0.08);
}

.valtara-glow{
    position:absolute;
    top:-80px;
    right:-80px;
    width:220px;
    height:220px;
    border-radius:50%;
    opacity:.14;
    filter:blur(10px);
}

.valtara-icon{
    position:relative;
    z-index:2;

    width:90px;
    height:90px;

    border-radius:28px;

    display:flex;
    align-items:center;
    justify-content:center;

    margin-bottom:1.6rem;

    border:1px solid rgba(255,255,255,0.08);
    backdrop-filter:blur(10px);
}

.valtara-icon i{
    font-size:2.5rem;
}

.valtara-chip{
    display:inline-flex;

    padding:10px 18px;

    border-radius:999px;

    background:rgba(255,255,255,0.05);

    border:1px solid rgba(255,255,255,0.08);

    color:var(--valtara-oro);

    font-size:.75rem;
    font-weight:900;

    letter-spacing:2px;

    margin-bottom:1.4rem;
}

.valtara-card h3{
    color:white;
    font-size:2rem;
    line-height:1.15;
    margin-bottom:1.2rem;
    font-family:var(--font-accent);
    font-weight:400;
}

.valtara-card p{
    color:var(--valtara-gris-texto);
    line-height:1.9;
    font-size:1rem;
    margin-bottom:1.3rem;
}

.valtara-card strong{
    display:block;
    color:white;
    font-size:1rem;
    margin-bottom:2rem;
    font-weight:700;
}

.valtara-card a{
    position:absolute;
    left:2rem;
    right:2rem;
    bottom:2rem;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:16px;

    border-radius:18px;

    background:
        linear-gradient(
            135deg,
            #25D366,
            #1EBE5D
        );

    color:white;
    text-decoration:none;
    font-weight:900;

    transition:all .35s ease;

    box-shadow:
        0 10px 30px rgba(37,211,102,0.28);
}

.valtara-card a:hover{
    transform:translateY(-4px);
}

@media(max-width:768px){

    .valtara-card{
        width:290px;
        min-height:500px;
    }

    .valtara-card h3{
        font-size:1.7rem;
    }

}

</style>

`;
