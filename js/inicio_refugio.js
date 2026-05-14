/**
 * ====================================================================================
 * MÓDULO: INICIO_PROMOCIONES.JS
 * Arquitectura compatible con TODOS los módulos Valtara existentes
 * NO usa listeners globales complejos
 * NO usa constructores externos
 * NO rompe renderizado SPA
 * TODO funciona inline igual que inicio_refugio.js
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `
<div style="max-width:1100px;margin:3rem auto 6rem auto;padding:0 1.5rem;">

    <!-- HERO -->
    <section class="glass-card reveal"
        style="
            padding:4rem 2rem;
            border-radius:28px;
            overflow:hidden;
            position:relative;
            background:
                radial-gradient(circle at top right, rgba(242,201,76,0.12), transparent 30%),
                radial-gradient(circle at bottom left, rgba(0,255,204,0.08), transparent 35%),
                linear-gradient(180deg, rgba(15,15,20,0.96), rgba(5,5,10,0.98));
            border:1px solid rgba(255,255,255,0.08);
        ">

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

        <div style="text-align:center;position:relative;z-index:2;">

            <div style="
                display:inline-flex;
                align-items:center;
                gap:10px;
                padding:10px 22px;
                border-radius:999px;
                background:rgba(242,201,76,0.08);
                border:1px solid rgba(242,201,76,0.25);
                color:var(--valtara-oro);
                font-size:.85rem;
                font-weight:900;
                letter-spacing:2px;
                text-transform:uppercase;
                margin-bottom:2rem;
            ">
                <i class="fa-solid fa-gift fa-bounce"></i>
                Promociones Inteligentes
            </div>

            <h2 style="
                font-family:var(--font-accent);
                font-size:clamp(2.5rem,5vw,4.4rem);
                color:white;
                margin-bottom:1.5rem;
                line-height:1.1;
            ">
                Cotiza Tu Experiencia
                <span style="color:var(--valtara-oro);">
                    Valtara
                </span>
            </h2>

            <p style="
                color:var(--valtara-gris-texto);
                font-size:1.2rem;
                line-height:1.9;
                max-width:820px;
                margin:0 auto 3rem auto;
                font-weight:300;
            ">
                Elige tu terapia, selecciona tu aromaterapia favorita y descubre
                automáticamente las promociones disponibles según la hora y el día.
                Todo en tiempo real y con enlace directo a WhatsApp.
            </p>

            <!-- BENEFICIOS -->
            <div style="
                display:grid;
                grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                gap:18px;
                margin-bottom:3rem;
            ">

                <div class="glass-card"
                    style="
                        padding:1.5rem;
                        border-radius:22px;
                        background:rgba(255,255,255,0.03);
                    ">

                    <i class="fa-solid fa-sun"
                        style="
                            font-size:2rem;
                            color:var(--valtara-oro);
                            margin-bottom:1rem;
                            animation: pulse 2s infinite;
                        "></i>

                    <h3 style="color:white;margin-bottom:.7rem;">
                        20% OFF
                    </h3>

                    <p style="
                        color:var(--valtara-gris-texto);
                        line-height:1.7;
                        margin:0;
                    ">
                        Jueves a domingo antes de las 2 PM.
                    </p>
                </div>

                <div class="glass-card"
                    style="
                        padding:1.5rem;
                        border-radius:22px;
                        background:rgba(255,255,255,0.03);
                    ">

                    <i class="fa-solid fa-gift"
                        style="
                            font-size:2rem;
                            color:var(--valtara-cian-brillante);
                            margin-bottom:1rem;
                            animation: floaty 3s ease-in-out infinite;
                        "></i>

                    <h3 style="color:white;margin-bottom:.7rem;">
                        $169 MXN OFF
                    </h3>

                    <p style="
                        color:var(--valtara-gris-texto);
                        line-height:1.7;
                        margin:0;
                    ">
                        Lunes y martes después de la 1 PM.
                    </p>
                </div>

                <div class="glass-card"
                    style="
                        padding:1.5rem;
                        border-radius:22px;
                        background:rgba(255,255,255,0.03);
                    ">

                    <i class="fa-solid fa-wind"
                        style="
                            font-size:2rem;
                            color:#8EF6E4;
                            margin-bottom:1rem;
                            animation: pulse 3s infinite;
                        "></i>

                    <h3 style="color:white;margin-bottom:.7rem;">
                        Aromaterapia
                    </h3>

                    <p style="
                        color:var(--valtara-gris-texto);
                        line-height:1.7;
                        margin:0;
                    ">
                        Incluida sin costo adicional.
                    </p>
                </div>

            </div>

            <!-- BOTÓN -->
            <button
                id="vt-start-btn"
                onclick="
                    document.getElementById('vt-cotizador').style.display='block';
                    this.style.display='none';
                    setTimeout(function(){
                        document.getElementById('vt-cotizador').scrollIntoView({
                            behavior:'smooth',
                            block:'start'
                        });
                    },150);
                "
                style="
                    background:linear-gradient(135deg,#F2C94C,#F2994A);
                    color:#050508;
                    border:none;
                    padding:18px 34px;
                    border-radius:16px;
                    font-size:1.1rem;
                    font-weight:900;
                    cursor:pointer;
                    box-shadow:0 12px 35px rgba(242,201,76,0.35);
                    transition:all .3s ease;
                "
                onmouseover="
                    this.style.transform='translateY(-4px)';
                    this.style.boxShadow='0 18px 45px rgba(242,201,76,0.45)';
                "
                onmouseout="
                    this.style.transform='translateY(0)';
                    this.style.boxShadow='0 12px 35px rgba(242,201,76,0.35)';
                "
            >
                <i class="fa-solid fa-spa"></i>
                Comencemos Mi Experiencia
            </button>

        </div>
    </section>

    <!-- COTIZADOR -->
    <section
        id="vt-cotizador"
        class="glass-card reveal"
        style="
            margin-top:2rem;
            padding:3rem 2rem;
            border-radius:28px;
            display:none;
            background:
                linear-gradient(180deg,
                rgba(12,12,18,0.97),
                rgba(5,5,10,0.99));
        "
    >

        <div style="text-align:center;margin-bottom:3rem;">

            <h3 style="
                color:white;
                font-size:2.4rem;
                font-family:var(--font-accent);
                margin-bottom:1rem;
            ">
                Cotizador Inteligente
            </h3>

            <p style="
                color:var(--valtara-gris-texto);
                max-width:760px;
                margin:0 auto;
                line-height:1.9;
            ">
                El total cambia automáticamente según la terapia,
                promociones activas y horario actual.
            </p>

        </div>

        <!-- GRID -->
        <div style="
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
            gap:2rem;
        ">

            <!-- IZQUIERDA -->
            <div>

                <!-- TERAPIA -->
                <div style="margin-bottom:2rem;">

                    <label style="
                        display:block;
                        color:white;
                        margin-bottom:1rem;
                        font-weight:bold;
                        font-size:1rem;
                    ">
                        <i class="fa-solid fa-spa"></i>
                        Elige Tu Terapia
                    </label>

                    <select
                        id="vt-terapia"
                        onchange="window.actualizarCotizadorValtara();"
                        style="
                            width:100%;
                            background:#0d0d12;
                            color:white;
                            border:1px solid rgba(255,255,255,0.08);
                            padding:18px;
                            border-radius:18px;
                            font-size:1.05rem;
                        "
                    >

                        <option value="699">Relajante 50 Min · $699</option>
                        <option value="899">Relajante 90 Min · $899</option>
                        <option value="729">Deportivo y Descompresión · $729</option>
                        <option value="729">Tailandés Yoga Pasivo · $729</option>
                        <option value="829">Ayurveda & Aromaterapia · $829</option>
                        <option value="829">Holístico Integrativo · $829</option>
                        <option value="799">Reductivo & Maderoterapia · $799</option>
                        <option value="999">Ritual Lomi Lomi Supremo · $999</option>
                        <option value="819">Esferas Chinas & Velas · $819</option>
                        <option value="749">Drenaje Linfático · $749</option>
                        <option value="529">Parálisis Facial · $529</option>

                    </select>

                </div>

                <!-- AROMA -->
                <div style="margin-bottom:2rem;">

                    <label style="
                        display:block;
                        color:white;
                        margin-bottom:1rem;
                        font-weight:bold;
                    ">
                        <i class="fa-solid fa-leaf"></i>
                        Aromaterapia
                    </label>

                    <select
                        id="vt-aroma"
                        onchange="window.actualizarCotizadorValtara();"
                        style="
                            width:100%;
                            background:#0d0d12;
                            color:white;
                            border:1px solid rgba(255,255,255,0.08);
                            padding:18px;
                            border-radius:18px;
                            font-size:1.05rem;
                        "
                    >

                        <option>Lavanda</option>
                        <option>Vainilla</option>
                        <option>Menta</option>
                        <option>Eucalipto</option>
                        <option>Jazmín</option>
                        <option>Rosas Blancas</option>
                        <option>Frutos Rojos</option>
                        <option>Té Blanco</option>
                        <option>Coco</option>
                        <option>Neutra</option>

                    </select>

                    <p style="
                        margin-top:1rem;
                        color:var(--valtara-cian-brillante);
                        font-size:.9rem;
                    ">
                        * Aromaterapias sujetas a disponibilidad.
                    </p>

                </div>

                <!-- DESCRIPCIÓN -->
                <div
                    id="vt-descripcion"
                    class="glass-card"
                    style="
                        padding:1.5rem;
                        border-radius:20px;
                        background:rgba(255,255,255,0.03);
                        color:var(--valtara-gris-texto);
                        line-height:1.8;
                    "
                ></div>

            </div>

            <!-- DERECHA -->
            <div>

                <div class="glass-card"
                    style="
                        padding:2rem;
                        border-radius:24px;
                        background:rgba(255,255,255,0.03);
                    "
                >

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        margin-bottom:1rem;
                        color:white;
                    ">
                        <span>Subtotal</span>
                        <strong id="vt-subtotal">$699 MXN</strong>
                    </div>

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        margin-bottom:1rem;
                        color:white;
                    ">
                        <span>Promoción</span>
                        <strong
                            id="vt-promocion"
                            style="color:var(--valtara-cian-brillante);"
                        >
                            Verificando...
                        </strong>
                    </div>

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        margin-bottom:2rem;
                        color:white;
                    ">
                        <span>Descuento</span>
                        <strong
                            id="vt-descuento"
                            style="color:#67ff9b;"
                        >
                            -$0 MXN
                        </strong>
                    </div>

                    <div style="
                        border-top:1px solid rgba(255,255,255,0.08);
                        padding-top:2rem;
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                    ">

                        <span style="
                            color:white;
                            font-size:1.3rem;
                            font-weight:bold;
                        ">
                            Total Estimado
                        </span>

                        <strong
                            id="vt-total"
                            style="
                                font-size:2.2rem;
                                color:var(--valtara-oro);
                            "
                        >
                            $699 MXN
                        </strong>

                    </div>

                    <a
                        id="vt-wa-link"
                        href="https://wa.me/5213348572070"
                        target="_blank"
                        style="
                            margin-top:2rem;
                            width:100%;
                            display:flex;
                            justify-content:center;
                            align-items:center;
                            gap:12px;
                            background:linear-gradient(135deg,#25D366,#1ebc59);
                            color:white;
                            text-decoration:none;
                            padding:18px;
                            border-radius:18px;
                            font-weight:900;
                            font-size:1.05rem;
                            box-shadow:0 12px 35px rgba(37,211,102,0.35);
                        "
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Continuar por WhatsApp
                    </a>

                    <!-- TÉRMINOS -->
                    <div style="
                        margin-top:2rem;
                        padding-top:1.5rem;
                        border-top:1px solid rgba(255,255,255,0.08);
                        color:#aaa;
                        line-height:1.8;
                        font-size:.9rem;
                    ">

                        <strong style="color:white;">
                            Términos y Condiciones
                        </strong>

                        <ul style="
                            margin-top:1rem;
                            padding-left:1.2rem;
                        ">
                            <li>Promociones no acumulables.</li>
                            <li>20% OFF aplica antes de las 2 PM.</li>
                            <li>$169 OFF aplica lunes y martes después de la 1 PM.</li>
                            <li>Aromaterapias sujetas a disponibilidad.</li>
                            <li>Contacto oficial: 33 4857 2070.</li>
                        </ul>

                    </div>

                </div>

            </div>

        </div>

    </section>

</div>

<style>

@keyframes floaty{
    0%{transform:translateY(0px);}
    50%{transform:translateY(-8px);}
    100%{transform:translateY(0px);}
}

@keyframes pulse{
    0%{transform:scale(1);}
    50%{transform:scale(1.08);}
    100%{transform:scale(1);}
}

</style>

<script>

window.actualizarCotizadorValtara = function(){

    var terapia = document.getElementById('vt-terapia');
    var aroma = document.getElementById('vt-aroma');

    if(!terapia || !aroma){
        return;
    }

    var subtotal = Number(terapia.value);

    var descripcion = '';

    switch(subtotal){

        case 699:
            descripcion = 'Relajación profunda diseñada para ansiedad, agotamiento emocional y estrés acumulado.';
        break;

        case 899:
            descripcion = 'Versión extendida para una desconexión mental y corporal completa.';
        break;

        case 729:
            descripcion = 'Liberación muscular profunda y recuperación física intensiva.';
        break;

        case 829:
            descripcion = 'Aceites tibios, aromaterapia premium y restauración emocional.';
        break;

        case 799:
            descripcion = 'Protocolos corporales reductivos y maderoterapia estética.';
        break;

        case 999:
            descripcion = 'La experiencia más inmersiva y lujosa de Valtara.';
        break;

        case 819:
            descripcion = 'Estimulación sonora y sensorial mediante esferas y luz cálida.';
        break;

        case 749:
            descripcion = 'Ligereza corporal y movilización suave de líquidos.';
        break;

        case 529:
            descripcion = 'Estimulación neuromuscular enfocada en recuperación facial.';
        break;

    }

    var now = new Date();

    var day = now.getDay();
    var hour = now.getHours();

    var promo = 'Sin promoción activa';
    var descuento = 0;

    // LUNES Y MARTES
    if((day === 1 || day === 2) && hour >= 13){

        promo = '$169 MXN OFF';
        descuento = 169;

    }

    // JUEVES A DOMINGO
    else if(
        (day === 4 || day === 5 || day === 6 || day === 0)
        && hour < 14
    ){

        promo = '20% OFF Matutino';
        descuento = Math.round(subtotal * 0.20);

    }

    var total = subtotal - descuento;

    document.getElementById('vt-subtotal').innerHTML =
        '$' + subtotal.toLocaleString('es-MX') + ' MXN';

    document.getElementById('vt-promocion').innerHTML =
        promo;

    document.getElementById('vt-descuento').innerHTML =
        '-$' + descuento.toLocaleString('es-MX') + ' MXN';

    document.getElementById('vt-total').innerHTML =
        '$' + total.toLocaleString('es-MX') + ' MXN';

    document.getElementById('vt-descripcion').innerHTML =
        descripcion;

    // WHATSAPP

    var terapiaTexto =
        terapia.options[terapia.selectedIndex].text;

    var aromaTexto =
        aroma.options[aroma.selectedIndex].text;

    var mensaje =
        'Hola, quiero reservar una experiencia Valtara.%0A%0A' +

        '✨ Terapia: ' + terapiaTexto + '%0A' +
        '🌿 Aromaterapia: ' + aromaTexto + '%0A' +
        '🎁 Promoción: ' + promo + '%0A' +
        '💰 Total estimado: $' + total + ' MXN';

    document.getElementById('vt-wa-link').href =
        'https://wa.me/5213348572070?text=' + mensaje;

};

// INIT

setTimeout(function(){

    if(window.actualizarCotizadorValtara){

        window.actualizarCotizadorValtara();

    }

},500);

</script>
`;
