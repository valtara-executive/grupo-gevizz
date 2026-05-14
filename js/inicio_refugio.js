/**
 * ====================================================================================
 * INICIO_PROMOCIONES.JS — DEFINITIVO Y COMPATIBLE
 * Arquitectura simple EXACTAMENTE como inicio_refugio.js
 * SIN sliders complejos
 * SIN animaciones que rompan renderizado
 * SIN width:max-content
 * SIN overflow conflictivo
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `

<div style="max-width:1200px;margin:2rem auto 6rem auto;padding:0 1.5rem;">

    <!-- HERO -->
    <section class="glass-card reveal"
        style="
            padding:4rem 2rem;
            border-radius:28px;
            position:relative;
            overflow:hidden;
            background:
                radial-gradient(circle at top right, rgba(242,201,76,0.10), transparent 30%),
                radial-gradient(circle at bottom left, rgba(0,255,204,0.08), transparent 35%),
                linear-gradient(180deg, rgba(15,15,20,0.96), rgba(6,6,10,0.98));
            border:1px solid rgba(255,255,255,0.08);
            text-align:center;
        "
    >

        <div style="
            position:absolute;
            top:-80px;
            right:-80px;
            width:220px;
            height:220px;
            border-radius:50%;
            background:radial-gradient(circle, rgba(242,201,76,0.15), transparent 70%);
        "></div>

        <div style="position:relative;z-index:2;">

            <div style="
                display:inline-flex;
                align-items:center;
                gap:10px;
                padding:12px 22px;
                border-radius:999px;
                background:rgba(242,201,76,0.08);
                border:1px solid rgba(242,201,76,0.20);
                margin-bottom:2rem;
            ">
                <i class="fa-solid fa-sparkles fa-fade"
                    style="color:var(--valtara-oro);"></i>

                <span style="
                    color:var(--valtara-oro);
                    font-size:.82rem;
                    font-weight:900;
                    letter-spacing:2px;
                    text-transform:uppercase;
                ">
                    Promociones Valtara
                </span>
            </div>

            <h2 style="
                font-family:var(--font-accent);
                font-size:clamp(2.8rem,6vw,4.8rem);
                color:white;
                line-height:1.05;
                margin-bottom:1.5rem;
            ">
                Experiencias que
                <span style="color:var(--valtara-oro);">
                    transforman
                </span>
            </h2>

            <p style="
                max-width:850px;
                margin:0 auto;
                color:var(--valtara-gris-texto);
                line-height:1.9;
                font-size:1.12rem;
                font-weight:300;
            ">
                Descubre promociones exclusivas, aromaterapias premium
                y rituales biomecánicos diseñados para reducir estrés,
                restaurar movilidad y elevar la experiencia sensorial.
            </p>

        </div>

    </section>

    <!-- GRID -->
    <div style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
        gap:24px;
        margin-top:2.5rem;
    ">

        <!-- TARJETA -->
        <article class="glass-card reveal vt-card"
            style="
                padding:2rem;
                border-radius:28px;
                position:relative;
                overflow:hidden;
                min-height:420px;
            "
        >

            <div class="vt-glow"
                style="background:#F2C94C;">
            </div>

            <div class="vt-icon"
                style="background:rgba(242,201,76,0.12);">
                <i class="fa-solid fa-gift fa-bounce"
                    style="color:#F2C94C;"></i>
            </div>

            <span class="vt-tag">
                PROMOCIÓN
            </span>

            <h3 class="vt-title">
                $169 MXN OFF
            </h3>

            <p class="vt-text">
                Disponible lunes y martes después de la 1 PM.
                Una cortesía diseñada para ayudarte a vivir
                una experiencia premium a un precio preferencial.
            </p>

            <a
                href="https://wa.me/5213348572070?text=Hola,%20quiero%20la%20promoción%20de%20$169%20OFF."
                target="_blank"
                class="vt-btn"
            >
                <i class="fa-brands fa-whatsapp"></i>
                Reclamar Promoción
            </a>

        </article>

        <!-- TARJETA -->
        <article class="glass-card reveal vt-card"
            style="
                padding:2rem;
                border-radius:28px;
                position:relative;
                overflow:hidden;
                min-height:420px;
            "
        >

            <div class="vt-glow"
                style="background:#00ffe0;">
            </div>

            <div class="vt-icon"
                style="background:rgba(0,255,224,0.10);">
                <i class="fa-solid fa-wind fa-beat"
                    style="color:#00ffe0;"></i>
            </div>

            <span class="vt-tag">
                AROMATERAPIA
            </span>

            <h3 class="vt-title">
                Lavanda Premium
            </h3>

            <p class="vt-text">
                Aroma enfocado en ansiedad, estrés y descanso profundo.
                Ideal para experiencias relajantes y rituales nocturnos.
            </p>

            <a
                href="https://wa.me/5213348572070?text=Hola,%20quiero%20una%20sesión%20con%20Lavanda."
                target="_blank"
                class="vt-btn"
            >
                <i class="fa-brands fa-whatsapp"></i>
                Quiero Este Aroma
            </a>

        </article>

        <!-- TARJETA -->
        <article class="glass-card reveal vt-card"
            style="
                padding:2rem;
                border-radius:28px;
                position:relative;
                overflow:hidden;
                min-height:420px;
            "
        >

            <div class="vt-glow"
                style="background:#ff5555;">
            </div>

            <div class="vt-icon"
                style="background:rgba(255,85,85,0.12);">
                <i class="fa-solid fa-dumbbell fa-shake"
                    style="color:#ff5555;"></i>
            </div>

            <span class="vt-tag">
                TERAPIA
            </span>

            <h3 class="vt-title">
                Deportivo & Descompresión
            </h3>

            <p class="vt-text">
                Terapia profunda enfocada en contracturas,
                sobrecarga física y tensión acumulada
                por estrés o entrenamiento.
            </p>

            <a
                href="https://wa.me/5213348572070?text=Hola,%20quiero%20el%20Masaje%20Deportivo."
                target="_blank"
                class="vt-btn"
            >
                <i class="fa-brands fa-whatsapp"></i>
                Reservar Sesión
            </a>

        </article>

        <!-- TARJETA -->
        <article class="glass-card reveal vt-card"
            style="
                padding:2rem;
                border-radius:28px;
                position:relative;
                overflow:hidden;
                min-height:420px;
            "
        >

            <div class="vt-glow"
                style="background:#ffaa00;">
            </div>

            <div class="vt-icon"
                style="background:rgba(255,170,0,0.12);">
                <i class="fa-solid fa-water fa-beat-fade"
                    style="color:#ffaa00;"></i>
            </div>

            <span class="vt-tag">
                RITUAL
            </span>

            <h3 class="vt-title">
                Lomi Lomi Supremo
            </h3>

            <p class="vt-text">
                Inspirado en el movimiento oceánico hawaiano.
                Sensación profunda de desconexión mental,
                descanso corporal y restauración emocional.
            </p>

            <a
                href="https://wa.me/5213348572070?text=Hola,%20quiero%20el%20Ritual%20Lomi%20Lomi."
                target="_blank"
                class="vt-btn"
            >
                <i class="fa-brands fa-whatsapp"></i>
                Agendar Ritual
            </a>

        </article>

        <!-- TARJETA -->
        <article class="glass-card reveal vt-card"
            style="
                padding:2rem;
                border-radius:28px;
                position:relative;
                overflow:hidden;
                min-height:420px;
            "
        >

            <div class="vt-glow"
                style="background:#52ffa8;">
            </div>

            <div class="vt-icon"
                style="background:rgba(82,255,168,0.10);">
                <i class="fa-solid fa-leaf fa-fade"
                    style="color:#52ffa8;"></i>
            </div>

            <span class="vt-tag">
                AROMA
            </span>

            <h3 class="vt-title">
                Eucalipto
            </h3>

            <p class="vt-text">
                Sensación fresca y ligera que acompaña
                terapias respiratorias y experiencias
                de claridad mental.
            </p>

            <a
                href="https://wa.me/5213348572070?text=Hola,%20quiero%20Eucalipto%20en%20mi%20experiencia."
                target="_blank"
                class="vt-btn"
            >
                <i class="fa-brands fa-whatsapp"></i>
                Elegir Aroma
            </a>

        </article>

        <!-- TARJETA -->
        <article class="glass-card reveal vt-card"
            style="
                padding:2rem;
                border-radius:28px;
                position:relative;
                overflow:hidden;
                min-height:420px;
            "
        >

            <div class="vt-glow"
                style="background:#b27fff;">
            </div>

            <div class="vt-icon"
                style="background:rgba(178,127,255,0.10);">
                <i class="fa-solid fa-fire fa-bounce"
                    style="color:#b27fff;"></i>
            </div>

            <span class="vt-tag">
                CORPORAL
            </span>

            <h3 class="vt-title">
                Reductivo & Maderoterapia
            </h3>

            <p class="vt-text">
                Protocolos corporales premium
                enfocados en bienestar físico,
                activación circulatoria y estética manual.
            </p>

            <a
                href="https://wa.me/5213348572070?text=Hola,%20quiero%20información%20de%20Maderoterapia."
                target="_blank"
                class="vt-btn"
            >
                <i class="fa-brands fa-whatsapp"></i>
                Cotizar
            </a>

        </article>

    </div>

    <!-- FOOTER -->
    <section class="glass-card reveal"
        style="
            margin-top:2.5rem;
            padding:2rem;
            border-radius:24px;
            text-align:center;
        "
    >

        <h3 style="
            color:white;
            font-size:2rem;
            margin-bottom:1rem;
            font-family:var(--font-accent);
        ">
            Contacto Oficial
        </h3>

        <p style="
            color:var(--valtara-gris-texto);
            line-height:1.9;
            max-width:760px;
            margin:0 auto 2rem auto;
        ">
            Aromaterapias sujetas a disponibilidad.
            Promociones no acumulables.
            Sucursal principal en Reforma 195.
            Próxima apertura cerca de Metro Eugenia.
        </p>

        <a
            href="https://wa.me/5213348572070"
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
            "
        >
            <i class="fa-brands fa-whatsapp"
                style="font-size:1.3rem;"></i>

            WhatsApp · 33 4857 2070
        </a>

    </section>

</div>

<style>

.vt-card{
    transition:transform .35s ease, box-shadow .35s ease;
}

.vt-card:hover{
    transform:translateY(-8px);
    box-shadow:0 25px 45px rgba(0,0,0,0.35);
}

.vt-glow{
    position:absolute;
    width:180px;
    height:180px;
    border-radius:50%;
    top:-70px;
    right:-70px;
    opacity:.15;
    filter:blur(8px);
}

.vt-icon{
    width:90px;
    height:90px;
    border-radius:24px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:1.5rem;
    border:1px solid rgba(255,255,255,0.08);
    backdrop-filter:blur(10px);
}

.vt-icon i{
    font-size:2.3rem;
}

.vt-tag{
    display:inline-flex;
    padding:8px 16px;
    border-radius:999px;
    background:rgba(255,255,255,0.05);
    border:1px solid rgba(255,255,255,0.08);
    color:#d5d5d5;
    font-size:.75rem;
    font-weight:900;
    letter-spacing:2px;
    margin-bottom:1rem;
}

.vt-title{
    color:white;
    font-size:2rem;
    line-height:1.1;
    margin-bottom:1rem;
    font-family:var(--font-accent);
}

.vt-text{
    color:var(--valtara-gris-texto);
    line-height:1.9;
    font-size:1rem;
    margin-bottom:2rem;
}

.vt-btn{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:12px;
    padding:16px;
    border-radius:18px;
    background:linear-gradient(135deg,#25D366,#1EBE5D);
    color:white;
    text-decoration:none;
    font-weight:900;
    transition:all .3s ease;
    box-shadow:0 10px 28px rgba(37,211,102,0.25);
}

.vt-btn:hover{
    transform:translateY(-4px);
}

@media(max-width:768px){

    .vt-title{
        font-size:1.6rem;
    }

}

</style>

`;
