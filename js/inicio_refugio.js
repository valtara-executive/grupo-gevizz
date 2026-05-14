/**
 * ====================================================================================
 * INICIO_PROMOCIONES.JS — CARRUSEL EDITORIAL V41
 * Arquitectura REAL compatible con Valtara
 * Basado en el patrón que SÍ renderiza:
 * inicio_refugio.js
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `

<div style="max-width:1200px;margin:3rem auto 6rem auto;padding:0 1.2rem;">

    <!-- HERO -->
    <section class="glass-card reveal"
        style="
            position:relative;
            overflow:hidden;
            padding:4rem 2rem;
            border-radius:34px;
            background:
                radial-gradient(circle at top right, rgba(242,201,76,0.12), transparent 30%),
                radial-gradient(circle at bottom left, rgba(0,255,204,0.08), transparent 35%),
                linear-gradient(180deg, rgba(12,12,18,0.97), rgba(5,5,10,0.99));
            border:1px solid rgba(255,255,255,0.08);
        "
    >

        <div style="
            position:absolute;
            top:-120px;
            right:-120px;
            width:260px;
            height:260px;
            border-radius:50%;
            background:radial-gradient(circle, rgba(242,201,76,0.15), transparent 70%);
        "></div>

        <div style="position:relative;z-index:2;text-align:center;">

            <div style="
                display:inline-flex;
                align-items:center;
                gap:12px;
                padding:12px 24px;
                border-radius:999px;
                background:rgba(242,201,76,0.08);
                border:1px solid rgba(242,201,76,0.22);
                margin-bottom:2rem;
            ">

                <i class="fa-solid fa-sparkles fa-fade"
                    style="
                        color:var(--valtara-oro);
                        font-size:1.1rem;
                    "
                ></i>

                <span style="
                    color:var(--valtara-oro);
                    font-size:.82rem;
                    letter-spacing:2px;
                    text-transform:uppercase;
                    font-weight:900;
                ">
                    Experiencias Destacadas
                </span>

            </div>

            <h2 style="
                font-family:var(--font-accent);
                font-size:clamp(2.8rem,6vw,5rem);
                line-height:1.08;
                color:white;
                margin-bottom:1.5rem;
            ">
                Descubre Tu
                <span style="color:var(--valtara-oro);">
                    Experiencia Ideal
                </span>
            </h2>

            <p style="
                max-width:820px;
                margin:0 auto;
                color:var(--valtara-gris-texto);
                line-height:1.9;
                font-size:1.12rem;
                font-weight:300;
            ">
                Promociones, aromaterapias, rituales premium
                y experiencias biomecánicas presentadas en un
                formato editorial inmersivo tipo galería viva.
            </p>

        </div>

    </section>

    <!-- CARRUSEL -->
    <section
        class="reveal"
        style="
            margin-top:2.5rem;
            overflow:hidden;
            position:relative;
            padding:1rem 0;
        "
    >

        <div id="vt-track"
            style="
                display:flex;
                gap:22px;
                width:max-content;
                animation:vtScroll 95s linear infinite;
                align-items:stretch;
            "
        >

            <!-- TARJETA -->
            <article class="vt-card gold">

                <div class="vt-orb"></div>

                <div class="vt-icon-wrap">
                    <i class="fa-solid fa-sun fa-spin"></i>
                </div>

                <span class="vt-badge">
                    PROMOCIÓN
                </span>

                <h3>20% OFF</h3>

                <p>
                    Jueves a domingo antes de las 2 PM.
                    Perfecto para rituales relajantes
                    y experiencias premium.
                </p>

                <a
                    href="https://wa.me/5213348572070?text=Hola,%20vi%20el%2020%%20OFF%20en%20Valtara."
                    target="_blank"
                    class="vt-link"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Reservar
                </a>

            </article>

            <!-- TARJETA -->
            <article class="vt-card cyan">

                <div class="vt-orb"></div>

                <div class="vt-icon-wrap">
                    <i class="fa-solid fa-wind fa-beat"></i>
                </div>

                <span class="vt-badge">
                    AROMATERAPIA
                </span>

                <h3>Lavanda</h3>

                <p>
                    Disminuye ansiedad,
                    estrés mental y tensión emocional.
                    Aroma favorito para descanso profundo.
                </p>

                <a
                    href="https://wa.me/5213348572070?text=Hola,%20quiero%20una%20experiencia%20con%20Lavanda."
                    target="_blank"
                    class="vt-link"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Quiero Esto
                </a>

            </article>

            <!-- TARJETA -->
            <article class="vt-card red">

                <div class="vt-orb"></div>

                <div class="vt-icon-wrap">
                    <i class="fa-solid fa-dumbbell fa-bounce"></i>
                </div>

                <span class="vt-badge">
                    TERAPIA
                </span>

                <h3>Masaje Deportivo</h3>

                <p>
                    Recuperación muscular profunda,
                    descompresión y alivio de contracturas.
                </p>

                <a
                    href="https://wa.me/5213348572070?text=Hola,%20quiero%20el%20Masaje%20Deportivo."
                    target="_blank"
                    class="vt-link"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Agendar
                </a>

            </article>

            <!-- TARJETA -->
            <article class="vt-card purple">

                <div class="vt-orb"></div>

                <div class="vt-icon-wrap">
                    <i class="fa-solid fa-gift fa-shake"></i>
                </div>

                <span class="vt-badge">
                    BENEFICIO
                </span>

                <h3>$169 MXN OFF</h3>

                <p>
                    Lunes y martes después de la 1 PM.
                    Cupos limitados por día.
                </p>

                <a
                    href="https://wa.me/5213348572070?text=Hola,%20quiero%20la%20promoción%20de%20$169%20OFF."
                    target="_blank"
                    class="vt-link"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Reclamar
                </a>

            </article>

            <!-- TARJETA -->
            <article class="vt-card green">

                <div class="vt-orb"></div>

                <div class="vt-icon-wrap">
                    <i class="fa-solid fa-leaf fa-fade"></i>
                </div>

                <span class="vt-badge">
                    AROMA
                </span>

                <h3>Eucalipto</h3>

                <p>
                    Sensación fresca,
                    respiración ligera y claridad mental.
                </p>

                <a
                    href="https://wa.me/5213348572070?text=Hola,%20quiero%20Eucalipto%20en%20mi%20sesión."
                    target="_blank"
                    class="vt-link"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Me Interesa
                </a>

            </article>

            <!-- TARJETA -->
            <article class="vt-card gold">

                <div class="vt-orb"></div>

                <div class="vt-icon-wrap">
                    <i class="fa-solid fa-water fa-beat-fade"></i>
                </div>

                <span class="vt-badge">
                    RITUAL
                </span>

                <h3>Lomi Lomi</h3>

                <p>
                    Inspirado en el movimiento oceánico.
                    Desconexión física y mental total.
                </p>

                <a
                    href="https://wa.me/5213348572070?text=Hola,%20quiero%20el%20Ritual%20Lomi%20Lomi."
                    target="_blank"
                    class="vt-link"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Reservar
                </a>

            </article>

            <!-- TARJETA -->
            <article class="vt-card pink">

                <div class="vt-orb"></div>

                <div class="vt-icon-wrap">
                    <i class="fa-solid fa-heart fa-beat"></i>
                </div>

                <span class="vt-badge">
                    EXPERIENCIA
                </span>

                <h3>Frutos Rojos</h3>

                <p>
                    Aroma cálido y dulce para
                    sesiones nocturnas premium.
                </p>

                <a
                    href="https://wa.me/5213348572070?text=Hola,%20quiero%20Frutos%20Rojos."
                    target="_blank"
                    class="vt-link"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Lo Quiero
                </a>

            </article>

            <!-- TARJETA -->
            <article class="vt-card white">

                <div class="vt-orb"></div>

                <div class="vt-icon-wrap">
                    <i class="fa-solid fa-droplet fa-beat"></i>
                </div>

                <span class="vt-badge">
                    TERAPIA
                </span>

                <h3>Drenaje Linfático</h3>

                <p>
                    Ligereza corporal y sensación
                    profunda de descanso físico.
                </p>

                <a
                    href="https://wa.me/5213348572070?text=Hola,%20quiero%20Drenaje%20Linfático."
                    target="_blank"
                    class="vt-link"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Reservar
                </a>

            </article>

            <!-- TARJETA -->
            <article class="vt-card orange">

                <div class="vt-orb"></div>

                <div class="vt-icon-wrap">
                    <i class="fa-solid fa-fire fa-bounce"></i>
                </div>

                <span class="vt-badge">
                    CORPORAL
                </span>

                <h3>Maderoterapia</h3>

                <p>
                    Protocolos corporales premium
                    con enfoque estético y bienestar físico.
                </p>

                <a
                    href="https://wa.me/5213348572070?text=Hola,%20quiero%20Maderoterapia."
                    target="_blank"
                    class="vt-link"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Cotizar
                </a>

            </article>

            <!-- DUPLICADAS PARA LOOP -->
            <article class="vt-card cyan">
                <div class="vt-orb"></div>
                <div class="vt-icon-wrap">
                    <i class="fa-solid fa-moon fa-fade"></i>
                </div>
                <span class="vt-badge">NOCTURNO</span>
                <h3>Té Premium</h3>
                <p>
                    Algunas experiencias incluyen
                    té de frutos rojos después de las 7 PM.
                </p>
                <a
                    href="https://wa.me/5213348572070"
                    target="_blank"
                    class="vt-link"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Saber Más
                </a>
            </article>

        </div>

    </section>

</div>

<style>

#vt-track:hover{
    animation-play-state:paused;
}

.vt-card{
    width:340px;
    min-width:340px;
    aspect-ratio:1/1;
    border-radius:32px;
    position:relative;
    overflow:hidden;
    padding:2rem;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    background:
        linear-gradient(180deg,
        rgba(255,255,255,0.06),
        rgba(255,255,255,0.02));
    border:1px solid rgba(255,255,255,0.08);
    box-shadow:
        0 20px 45px rgba(0,0,0,0.35),
        inset 0 0 25px rgba(255,255,255,0.02);
    transition:transform .4s ease;
}

.vt-card:hover{
    transform:translateY(-8px) scale(1.02);
}

.vt-orb{
    position:absolute;
    width:180px;
    height:180px;
    border-radius:50%;
    top:-80px;
    right:-80px;
    opacity:.25;
    filter:blur(10px);
}

.gold .vt-orb{
    background:#F2C94C;
}

.cyan .vt-orb{
    background:#00ffe0;
}

.red .vt-orb{
    background:#ff5555;
}

.purple .vt-orb{
    background:#b27fff;
}

.green .vt-orb{
    background:#52ffa8;
}

.pink .vt-orb{
    background:#ff6ba6;
}

.orange .vt-orb{
    background:#ffaa00;
}

.white .vt-orb{
    background:#ffffff;
}

.vt-icon-wrap{
    width:90px;
    height:90px;
    border-radius:26px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.08);
    font-size:2.4rem;
    color:white;
    margin-bottom:1.5rem;
    backdrop-filter:blur(10px);
}

.vt-badge{
    display:inline-flex;
    width:max-content;
    padding:8px 16px;
    border-radius:999px;
    background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.08);
    color:#ddd;
    font-size:.72rem;
    letter-spacing:2px;
    font-weight:900;
    text-transform:uppercase;
    margin-bottom:1rem;
}

.vt-card h3{
    color:white;
    font-size:2rem;
    margin-bottom:1rem;
    font-family:var(--font-accent);
    line-height:1.1;
}

.vt-card p{
    color:var(--valtara-gris-texto);
    line-height:1.9;
    font-size:1rem;
    flex:1;
}

.vt-link{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:12px;
    text-decoration:none;
    color:white;
    background:
        linear-gradient(135deg,
        #25D366,
        #1ebc59);
    padding:16px;
    border-radius:18px;
    font-weight:900;
    margin-top:2rem;
    transition:all .3s ease;
    box-shadow:0 12px 30px rgba(37,211,102,0.35);
}

.vt-link:hover{
    transform:translateY(-4px);
}

@keyframes vtScroll{
    0%{
        transform:translateX(0);
    }
    100%{
        transform:translateX(-50%);
    }
}

@media(max-width:768px){

    .vt-card{
        width:280px;
        min-width:280px;
    }

}

</style>
`;
