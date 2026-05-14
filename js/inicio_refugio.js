/**
 * ====================================================================================
 * INICIO_PROMOCIONES.JS — VERSIÓN CARRUSEL CINEMÁTICO V40
 * Arquitectura 100% compatible con Valtara
 * Basado en el patrón REAL que sí renderiza:
 * inicio_refugio.js
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `

<div style="max-width:950px;margin:3rem auto 6rem auto;padding:0 1.2rem;">

    <!-- HERO -->
    <section class="glass-card reveal"
        style="
            position:relative;
            overflow:hidden;
            padding:4rem 2rem;
            border-radius:28px;
            background:
                radial-gradient(circle at top right, rgba(242,201,76,0.12), transparent 30%),
                radial-gradient(circle at bottom left, rgba(0,255,204,0.08), transparent 35%),
                linear-gradient(180deg, rgba(10,10,15,0.96), rgba(5,5,10,0.98));
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
            pointer-events:none;
        "></div>

        <div style="position:relative;z-index:2;text-align:center;">

            <div style="
                display:inline-flex;
                align-items:center;
                gap:10px;
                padding:12px 24px;
                border-radius:999px;
                background:rgba(242,201,76,0.08);
                border:1px solid rgba(242,201,76,0.25);
                margin-bottom:2rem;
            ">
                <i class="fa-solid fa-fire-flame-curved fa-bounce"
                    style="
                        color:var(--valtara-oro);
                        font-size:1.2rem;
                    "
                ></i>

                <span style="
                    color:var(--valtara-oro);
                    font-size:.85rem;
                    font-weight:900;
                    letter-spacing:2px;
                    text-transform:uppercase;
                ">
                    Experiencias Destacadas
                </span>
            </div>

            <h2 style="
                font-family:var(--font-accent);
                font-size:clamp(2.7rem,6vw,4.6rem);
                color:white;
                line-height:1.1;
                margin-bottom:1.5rem;
            ">
                Descubre Tu
                <span style="color:var(--valtara-oro);">
                    Experiencia Ideal
                </span>
            </h2>

            <p style="
                max-width:760px;
                margin:0 auto 3rem auto;
                color:var(--valtara-gris-texto);
                line-height:1.9;
                font-size:1.15rem;
                font-weight:300;
            ">
                Explora promociones activas, terapias premium,
                aromaterapias sugeridas y beneficios especiales
                mediante una experiencia visual inmersiva.
            </p>

        </div>

    </section>

    <!-- CARRUSEL -->
    <section class="glass-card reveal"
        style="
            margin-top:2rem;
            border-radius:30px;
            overflow:hidden;
            position:relative;
            background:
                linear-gradient(180deg,
                rgba(12,12,18,0.97),
                rgba(5,5,10,0.99));
            border:1px solid rgba(255,255,255,0.08);
        "
    >

        <!-- CONTENEDOR -->
        <div id="vt-carrusel"
            style="
                position:relative;
                width:100%;
                aspect-ratio:1/1;
                overflow:hidden;
            "
        >

            <!-- SLIDE 1 -->
            <div class="vt-slide active"
                style="
                    background:
                        radial-gradient(circle at top right, rgba(242,201,76,0.18), transparent 30%),
                        linear-gradient(180deg, #111, #050508);
                "
            >

                <div class="vt-slide-content">

                    <div class="vt-icon gold">
                        <i class="fa-solid fa-sun fa-spin"></i>
                    </div>

                    <h3>20% OFF Matutino</h3>

                    <p>
                        Jueves a domingo antes de las 2 PM.
                        Ideal para sesiones relajantes y rituales premium.
                    </p>

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20vi%20la%20promoción%20del%2020%%20OFF%20matutino%20en%20la%20web%20de%20Valtara%20y%20quiero%20más%20información."
                        target="_blank"
                        class="vt-btn"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Reservar Ahora
                    </a>

                </div>

            </div>

            <!-- SLIDE 2 -->
            <div class="vt-slide">

                <div class="vt-slide-content">

                    <div class="vt-icon cyan">
                        <i class="fa-solid fa-wind fa-beat"></i>
                    </div>

                    <h3>Aromaterapia Lavanda</h3>

                    <p>
                        Diseñada para disminuir ansiedad,
                        tensión emocional e insomnio.
                        Incluida sin costo adicional.
                    </p>

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20me%20interesa%20una%20sesión%20con%20aromaterapia%20de%20Lavanda."
                        target="_blank"
                        class="vt-btn"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Quiero Esta Experiencia
                    </a>

                </div>

            </div>

            <!-- SLIDE 3 -->
            <div class="vt-slide">

                <div class="vt-slide-content">

                    <div class="vt-icon red">
                        <i class="fa-solid fa-dumbbell fa-bounce"></i>
                    </div>

                    <h3>Masaje Deportivo</h3>

                    <p>
                        Recuperación muscular profunda para
                        contracturas, agotamiento físico y estrés acumulado.
                    </p>

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20quiero%20agendar%20el%20Masaje%20Deportivo%20y%20Descompresión."
                        target="_blank"
                        class="vt-btn"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Agendar Terapia
                    </a>

                </div>

            </div>

            <!-- SLIDE 4 -->
            <div class="vt-slide">

                <div class="vt-slide-content">

                    <div class="vt-icon purple">
                        <i class="fa-solid fa-gift fa-shake"></i>
                    </div>

                    <h3>$169 MXN OFF</h3>

                    <p>
                        Lunes y martes después de la 1 PM.
                        Disponible en experiencias seleccionadas.
                    </p>

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20vi%20la%20promoción%20de%20$169%20MXN%20OFF%20en%20Valtara."
                        target="_blank"
                        class="vt-btn"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Reclamar Beneficio
                    </a>

                </div>

            </div>

            <!-- SLIDE 5 -->
            <div class="vt-slide">

                <div class="vt-slide-content">

                    <div class="vt-icon green">
                        <i class="fa-solid fa-leaf fa-fade"></i>
                    </div>

                    <h3>Eucalipto Premium</h3>

                    <p>
                        Sensación respiratoria fresca,
                        claridad mental y relajación profunda.
                    </p>

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20quiero%20una%20experiencia%20con%20aromaterapia%20de%20Eucalipto."
                        target="_blank"
                        class="vt-btn"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Quiero Probarlo
                    </a>

                </div>

            </div>

            <!-- SLIDE 6 -->
            <div class="vt-slide">

                <div class="vt-slide-content">

                    <div class="vt-icon gold">
                        <i class="fa-solid fa-water fa-beat-fade"></i>
                    </div>

                    <h3>Lomi Lomi Supremo</h3>

                    <p>
                        El ritual más inmersivo de Valtara.
                        Inspirado en el movimiento del océano.
                    </p>

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20quiero%20información%20sobre%20el%20Ritual%20Lomi%20Lomi%20Supremo."
                        target="_blank"
                        class="vt-btn"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Reservar Ritual
                    </a>

                </div>

            </div>

            <!-- SLIDE 7 -->
            <div class="vt-slide">

                <div class="vt-slide-content">

                    <div class="vt-icon white">
                        <i class="fa-solid fa-moon fa-fade"></i>
                    </div>

                    <h3>Sesiones Nocturnas</h3>

                    <p>
                        Algunas experiencias incluyen té de frutos rojos
                        después de las 7 PM.
                    </p>

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20quiero%20información%20sobre%20las%20sesiones%20nocturnas."
                        target="_blank"
                        class="vt-btn"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Más Información
                    </a>

                </div>

            </div>

            <!-- SLIDE 8 -->
            <div class="vt-slide">

                <div class="vt-slide-content">

                    <div class="vt-icon cyan">
                        <i class="fa-solid fa-droplet fa-beat"></i>
                    </div>

                    <h3>Drenaje Linfático</h3>

                    <p>
                        Sensación de ligereza corporal mediante
                        movimientos suaves y relajantes.
                    </p>

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20quiero%20agendar%20un%20Drenaje%20Linfático."
                        target="_blank"
                        class="vt-btn"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Agendar
                    </a>

                </div>

            </div>

            <!-- SLIDE 9 -->
            <div class="vt-slide">

                <div class="vt-slide-content">

                    <div class="vt-icon pink">
                        <i class="fa-solid fa-heart fa-beat"></i>
                    </div>

                    <h3>Frutos Rojos</h3>

                    <p>
                        Aroma dulce y envolvente para experiencias
                        cálidas y emocionalmente reconfortantes.
                    </p>

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20quiero%20una%20sesión%20con%20aroma%20Frutos%20Rojos."
                        target="_blank"
                        class="vt-btn"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Lo Quiero
                    </a>

                </div>

            </div>

            <!-- SLIDE 10 -->
            <div class="vt-slide">

                <div class="vt-slide-content">

                    <div class="vt-icon orange">
                        <i class="fa-solid fa-fire fa-bounce"></i>
                    </div>

                    <h3>Reductivo & Maderoterapia</h3>

                    <p>
                        Protocolos corporales premium para
                        acompañar objetivos estéticos y bienestar físico.
                    </p>

                    <a
                        href="https://wa.me/5213348572070?text=Hola,%20quiero%20información%20sobre%20Reductivo%20y%20Maderoterapia."
                        target="_blank"
                        class="vt-btn"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Cotizar Experiencia
                    </a>

                </div>

            </div>

        </div>

        <!-- CONTROLES -->
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            gap:14px;
            padding:1.5rem;
        ">

            <button id="vt-prev"
                class="vt-nav-btn">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <button id="vt-next"
                class="vt-nav-btn">
                <i class="fa-solid fa-chevron-right"></i>
            </button>

        </div>

    </section>

</div>

<style>

.vt-slide{
    position:absolute;
    inset:0;
    opacity:0;
    visibility:hidden;
    transition:all .6s ease;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:2rem;
}

.vt-slide.active{
    opacity:1;
    visibility:visible;
}

.vt-slide-content{
    width:100%;
    max-width:520px;
    text-align:center;
}

.vt-icon{
    width:120px;
    height:120px;
    margin:0 auto 2rem auto;
    border-radius:28px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:3rem;
    position:relative;
    overflow:hidden;
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.08);
}

.vt-icon::before{
    content:'';
    position:absolute;
    inset:-30%;
    animation:spin 10s linear infinite;
}

.gold::before{
    background:conic-gradient(from 0deg,
    rgba(242,201,76,0.7),
    transparent,
    rgba(242,201,76,0.7));
}

.cyan::before{
    background:conic-gradient(from 0deg,
    rgba(0,255,204,0.7),
    transparent,
    rgba(0,255,204,0.7));
}

.red::before{
    background:conic-gradient(from 0deg,
    rgba(255,85,85,0.7),
    transparent,
    rgba(255,85,85,0.7));
}

.green::before{
    background:conic-gradient(from 0deg,
    rgba(82,255,168,0.7),
    transparent,
    rgba(82,255,168,0.7));
}

.purple::before{
    background:conic-gradient(from 0deg,
    rgba(178,127,255,0.7),
    transparent,
    rgba(178,127,255,0.7));
}

.orange::before{
    background:conic-gradient(from 0deg,
    rgba(255,170,0,0.7),
    transparent,
    rgba(255,170,0,0.7));
}

.white::before{
    background:conic-gradient(from 0deg,
    rgba(255,255,255,0.7),
    transparent,
    rgba(255,255,255,0.7));
}

.pink::before{
    background:conic-gradient(from 0deg,
    rgba(255,105,180,0.7),
    transparent,
    rgba(255,105,180,0.7));
}

.vt-icon i{
    position:relative;
    z-index:2;
    color:white;
}

.vt-slide h3{
    color:white;
    font-size:2.2rem;
    margin-bottom:1rem;
    font-family:var(--font-accent);
}

.vt-slide p{
    color:var(--valtara-gris-texto);
    line-height:1.9;
    font-size:1.08rem;
    margin-bottom:2rem;
}

.vt-btn{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:12px;
    background:linear-gradient(135deg,#25D366,#1ebc59);
    color:white;
    text-decoration:none;
    padding:16px 30px;
    border-radius:18px;
    font-weight:900;
    transition:all .3s ease;
    box-shadow:0 12px 35px rgba(37,211,102,0.35);
}

.vt-btn:hover{
    transform:translateY(-4px);
}

.vt-nav-btn{
    width:54px;
    height:54px;
    border-radius:50%;
    border:none;
    background:rgba(255,255,255,0.06);
    color:white;
    cursor:pointer;
    font-size:1.1rem;
    transition:all .3s ease;
}

.vt-nav-btn:hover{
    background:rgba(255,255,255,0.12);
    transform:scale(1.08);
}

@keyframes spin{
    from{transform:rotate(0deg);}
    to{transform:rotate(360deg);}
}

</style>

<script>

setTimeout(function(){

    var slides = document.querySelectorAll('.vt-slide');

    if(!slides.length){
        return;
    }

    var index = 0;

    function showSlide(i){

        slides.forEach(function(slide){
            slide.classList.remove('active');
        });

        slides[i].classList.add('active');

    }

    showSlide(index);

    // AUTO PLAY
    setInterval(function(){

        index++;

        if(index >= slides.length){
            index = 0;
        }

        showSlide(index);

    },7000);

    // NEXT
    var nextBtn = document.getElementById('vt-next');

    if(nextBtn){

        nextBtn.onclick = function(){

            index++;

            if(index >= slides.length){
                index = 0;
            }

            showSlide(index);

        };

    }

    // PREV
    var prevBtn = document.getElementById('vt-prev');

    if(prevBtn){

        prevBtn.onclick = function(){

            index--;

            if(index < 0){
                index = slides.length - 1;
            }

            showSlide(index);

        };

    }

},500);

</script>
`;
