/**
 * ====================================================================================
 * INICIO_PROMOCIONES.JS — EXPERIENCIA INTERACTIVA V2
 * Dinámico real + render estable + CTA emocional
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `

<div style="max-width:1150px;margin:2rem auto 6rem auto;padding:0 1.4rem;">

    <!-- HERO -->

    <article class="glass-card reveal" style="
        padding:4rem 2rem;
        border-radius:34px;
        overflow:hidden;
        position:relative;
        background:
            radial-gradient(circle at top right, rgba(0,255,224,0.08), transparent 28%),
            radial-gradient(circle at bottom left, rgba(242,201,76,0.08), transparent 35%),
            linear-gradient(180deg, rgba(10,10,15,0.96), rgba(5,5,8,0.99));
        border:1px solid rgba(255,255,255,0.08);
        box-shadow:0 25px 60px rgba(0,0,0,0.55);
    ">

        <div style="
            position:absolute;
            top:-140px;
            right:-140px;
            width:320px;
            height:320px;
            background:radial-gradient(circle, rgba(0,255,224,0.14), transparent 70%);
            pointer-events:none;
        "></div>

        <!-- TAG -->

        <div style="
            display:inline-flex;
            align-items:center;
            gap:10px;
            padding:12px 24px;
            border-radius:999px;
            background:rgba(242,201,76,0.08);
            border:1px solid rgba(242,201,76,0.2);
            margin-bottom:2rem;
        ">

            <i class="fa-solid fa-fire-flame-curved" style="
                color:var(--valtara-oro);
                animation:promoPulse 2s infinite;
            "></i>

            <span style="
                color:var(--valtara-oro);
                font-size:0.82rem;
                letter-spacing:2px;
                text-transform:uppercase;
                font-weight:900;
            ">
                Experiencias Premium
            </span>

        </div>

        <!-- TITULO -->

        <h2 style="
            font-family:var(--font-accent);
            color:white;
            font-size:clamp(2.4rem,6vw,4.2rem);
            line-height:1.05;
            margin-bottom:1.5rem;
        ">
            Restaura Tu Cuerpo.<br>
            <span style="color:var(--valtara-oro);">
                Reinicia Tu Mente.
            </span>
        </h2>

        <p style="
            color:var(--valtara-gris-texto);
            line-height:1.9;
            font-size:1.1rem;
            max-width:850px;
            margin-bottom:3rem;
        ">
            Terapias biomecánicas, relajación profunda y experiencias sensoriales
            diseñadas para reducir tensión, ansiedad y agotamiento físico.
            Elige tu experiencia y descubre automáticamente la promoción ideal para ti.
        </p>

        <!-- PROMOS -->

        <div style="
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(230px,1fr));
            gap:18px;
            margin-bottom:3rem;
        ">

            <div class="promo-card-vt">
                <i class="fa-solid fa-gift"></i>
                <h4>$169 de Cortesía</h4>
                <p>Disponible lunes y martes después de la 1 PM.</p>
            </div>

            <div class="promo-card-vt">
                <i class="fa-solid fa-sun"></i>
                <h4>20% OFF</h4>
                <p>Jueves a domingo antes de las 2 PM.</p>
            </div>

            <div class="promo-card-vt">
                <i class="fa-solid fa-mug-hot"></i>
                <h4>Té Premium</h4>
                <p>Experiencias nocturnas con frutos rojos.</p>
            </div>

            <div class="promo-card-vt">
                <i class="fa-solid fa-wind"></i>
                <h4>Aromaterapia Incluida</h4>
                <p>Sin costo extra · Sujeto a disponibilidad.</p>
            </div>

        </div>

        <!-- CTA PRINCIPAL -->

        <div style="
            display:flex;
            justify-content:center;
        ">

            <button
                id="vt-open-cotizador"
                type="button"
                style="
                    background:linear-gradient(135deg,#F2C94C,#D4AF37);
                    color:#050508;
                    border:none;
                    padding:20px 34px;
                    border-radius:20px;
                    font-weight:900;
                    font-size:1.08rem;
                    cursor:pointer;
                    box-shadow:0 20px 40px rgba(242,201,76,0.28);
                    transition:all .3s ease;
                    display:flex;
                    align-items:center;
                    gap:14px;
                "
                onmouseover="this.style.transform='translateY(-4px)'"
                onmouseout="this.style.transform='translateY(0)'"
            >

                <i class="fa-solid fa-sparkles"></i>

                Comencemos Mi Experiencia

            </button>

        </div>

    </article>

    <!-- COTIZADOR -->

    <div
        id="vt-cotizador-box"
        style="
            display:none;
            margin-top:2rem;
            animation:fadeInPromo .5s ease;
        "
    >

        <article class="glass-card reveal" style="
            padding:2rem;
            border-radius:28px;
            background:rgba(255,255,255,0.03);
            border:1px solid rgba(255,255,255,0.08);
        ">

            <h3 style="
                color:white;
                font-size:2.2rem;
                text-align:center;
                margin-bottom:2rem;
                font-family:var(--font-accent);
            ">
                Cotizador Inteligente
            </h3>

            <!-- SELECTORES -->

            <div style="
                display:grid;
                grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
                gap:20px;
                margin-bottom:2rem;
            ">

                <div>

                    <label class="vt-label">
                        Elige Tu Terapia
                    </label>

                    <select id="vt-therapy" class="vt-select">

                        <option value="699">Relajante · 50 Min · $699</option>
                        <option value="899">Relajante · 90 Min · $899</option>
                        <option value="729">Deportivo & Descompresión · $729</option>
                        <option value="730">Tailandés Yoga Pasivo · $729</option>
                        <option value="829">Ayurveda & Aromaterapia · $829</option>
                        <option value="830">Holístico Integrativo · $829</option>
                        <option value="999">Ritual Lomi Lomi Supremo · $999</option>
                        <option value="819">Esferas Chinas & Velas · $819</option>
                        <option value="529">Parálisis Facial · $529</option>
                        <option value="749">Drenaje Linfático · $749</option>
                        <option value="799">Reductivo & Maderoterapia · $799</option>

                    </select>

                </div>

                <div>

                    <label class="vt-label">
                        Aromaterapia
                    </label>

                    <select id="vt-aroma" class="vt-select">

                        <option>Lavanda</option>
                        <option>Vainilla</option>
                        <option>Jazmín</option>
                        <option>Eucalipto</option>
                        <option>Frutos Rojos</option>
                        <option>Té Blanco</option>
                        <option>Rosas Blancas</option>
                        <option>Menta</option>
                        <option>Cacao</option>
                        <option>Naranja Dulce</option>

                    </select>

                </div>

            </div>

            <!-- EXPERIENCIA -->

            <div id="vt-emotion-box" style="
                padding:1.5rem;
                border-radius:22px;
                background:linear-gradient(135deg, rgba(0,255,224,0.06), rgba(242,201,76,0.06));
                border:1px solid rgba(255,255,255,0.08);
                margin-bottom:2rem;
            ">

                <h4 style="
                    color:white;
                    margin-bottom:0.7rem;
                    font-size:1.2rem;
                ">
                    ✨ Experiencia Recomendada
                </h4>

                <p id="vt-description" style="
                    color:var(--valtara-gris-texto);
                    line-height:1.8;
                    margin:0;
                ">
                    Relajación profunda diseñada para disminuir ansiedad,
                    tensión física y agotamiento emocional.
                </p>

            </div>

            <!-- RESUMEN -->

            <div style="
                padding:2rem;
                border-radius:24px;
                background:rgba(255,255,255,0.03);
                border:1px solid rgba(255,255,255,0.08);
            ">

                <div class="vt-line">
                    <span>Subtotal</span>
                    <strong id="vt-subtotal">$699 MXN</strong>
                </div>

                <div class="vt-line">
                    <span>Promoción Aplicada</span>
                    <strong id="vt-promo-name" style="
                        color:var(--valtara-cian-brillante);
                    ">
                        Calculando...
                    </strong>
                </div>

                <div class="vt-line">
                    <span>Descuento</span>
                    <strong id="vt-discount" style="
                        color:#4ADE80;
                    ">
                        -$0 MXN
                    </strong>
                </div>

                <div class="vt-line">
                    <span>Aromaterapia</span>
                    <strong>
                        Incluida
                    </strong>
                </div>

                <div style="
                    height:1px;
                    background:rgba(255,255,255,0.08);
                    margin:1.5rem 0;
                "></div>

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:20px;
                    flex-wrap:wrap;
                ">

                    <span style="
                        color:white;
                        font-size:1.2rem;
                        font-weight:800;
                    ">
                        Total Estimado
                    </span>

                    <strong id="vt-total" style="
                        color:var(--valtara-oro);
                        font-size:2.2rem;
                        font-weight:900;
                    ">
                        $699 MXN
                    </strong>

                </div>

            </div>

            <!-- CTA -->

            <div style="
                display:flex;
                flex-wrap:wrap;
                gap:18px;
                margin-top:2rem;
                align-items:center;
            ">

                <a
                    id="vt-wa"
                    href="https://wa.me/5213348572070"
                    target="_blank"
                    style="
                        background:linear-gradient(135deg,#25D366,#1EA952);
                        color:white;
                        padding:18px 30px;
                        border-radius:18px;
                        font-weight:900;
                        text-decoration:none;
                        display:flex;
                        align-items:center;
                        gap:14px;
                        box-shadow:0 15px 40px rgba(37,211,102,0.28);
                    "
                >

                    <i class="fa-brands fa-whatsapp"></i>

                    Reservar Ahora

                </a>

                <div style="
                    color:var(--valtara-gris-texto);
                    display:flex;
                    align-items:center;
                    gap:10px;
                ">

                    <i class="fa-solid fa-phone"></i>
                    33 4857 2070

                </div>

            </div>

        </article>

    </div>

</div>

<style>

@keyframes promoPulse{
    0%{transform:scale(1);}
    50%{transform:scale(1.12);}
    100%{transform:scale(1);}
}

@keyframes fadeInPromo{
    from{
        opacity:0;
        transform:translateY(20px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
}

.promo-card-vt{
    padding:1.5rem;
    border-radius:22px;
    background:rgba(255,255,255,0.03);
    border:1px solid rgba(255,255,255,0.08);
    transition:all .3s ease;
}

.promo-card-vt:hover{
    transform:translateY(-6px);
    border-color:rgba(242,201,76,0.28);
}

.promo-card-vt i{
    color:var(--valtara-oro);
    font-size:1.4rem;
    margin-bottom:1rem;
}

.promo-card-vt h4{
    color:white;
    margin-bottom:0.7rem;
}

.promo-card-vt p{
    color:var(--valtara-gris-texto);
    line-height:1.7;
}

.vt-label{
    display:block;
    color:white;
    margin-bottom:12px;
    font-weight:700;
}

.vt-select{
    width:100%;
    padding:18px;
    border-radius:18px;
    background:#111;
    color:white;
    border:1px solid rgba(255,255,255,0.08);
    outline:none;
}

.vt-line{
    display:flex;
    justify-content:space-between;
    gap:20px;
    margin-bottom:1rem;
    flex-wrap:wrap;
}

.vt-line span{
    color:var(--valtara-gris-texto);
}

.vt-line strong{
    color:white;
}

</style>

<script>

setTimeout(function(){

    var openBtn = document.getElementById('vt-open-cotizador');
    var box = document.getElementById('vt-cotizador-box');

    if(openBtn && box){

        openBtn.addEventListener('click', function(){

            box.style.display = 'block';

            setTimeout(function(){

                box.scrollIntoView({
                    behavior:'smooth',
                    block:'start'
                });

            },100);

        });

    }

    var therapy = document.getElementById('vt-therapy');
    var aroma = document.getElementById('vt-aroma');

    if(!therapy || !aroma){
        return;
    }

    var descriptions = {

        '699':'Relajación profunda diseñada para disminuir ansiedad, tensión física y agotamiento emocional.',

        '899':'Una experiencia extendida para desconectar completamente del estrés acumulado.',

        '729':'Liberación muscular profunda ideal para contracturas y cansancio físico.',

        '730':'Movilidad, flexibilidad y estiramientos asistidos para reiniciar tu cuerpo.',

        '829':'Aceites tibios, aromas botánicos y relajación emocional profunda.',

        '830':'Equilibrio físico y emocional mediante técnicas integrativas premium.',

        '999':'El ritual más inmersivo y sensorial de toda la experiencia Valtara.',

        '819':'Armonización sonora y visual mediante esferas y luz cálida.',

        '529':'Estimulación neuromuscular facial enfocada en relajación y rehabilitación.',

        '749':'Movimientos suaves para sensación de ligereza corporal.',

        '799':'Maderoterapia y protocolos corporales especializados.'

    };

    function money(v){

        return '$' + Number(v).toLocaleString('es-MX') + ' MXN';

    }

    function updatePromo(){

        var subtotal = Number(therapy.value);

        var realPrice = subtotal;

        if(subtotal === 730){
            realPrice = 729;
        }

        if(subtotal === 830){
            realPrice = 829;
        }

        var now = new Date();

        var day = now.getDay();
        var hour = now.getHours();

        var promoName = 'Sin promoción vigente';
        var discount = 0;

        // Lunes y martes
        if((day === 1 || day === 2) && hour >= 13){

            promoName = '$169 de cortesía';
            discount = 169;

        }

        // Jueves a domingo
        else if((day === 4 || day === 5 || day === 6 || day === 0) && hour < 14){

            promoName = '20% OFF Matutino';
            discount = Math.round(realPrice * 0.20);

        }

        var total = realPrice - discount;

        document.getElementById('vt-subtotal').innerHTML =
            money(realPrice);

        document.getElementById('vt-promo-name').innerHTML =
            promoName;

        document.getElementById('vt-discount').innerHTML =
            '-' + money(discount);

        document.getElementById('vt-total').innerHTML =
            money(total);

        document.getElementById('vt-description').innerHTML =
            descriptions[String(subtotal)];

        var message =
            'Hola, quiero reservar una experiencia Valtara.%0A%0A' +
            '✨ Terapia: ' + therapy.options[therapy.selectedIndex].text + '%0A' +
            '🌿 Aromaterapia: ' + aroma.value + '%0A' +
            '🎁 Promoción: ' + promoName + '%0A' +
            '💰 Total estimado: ' + money(total);

        document.getElementById('vt-wa').href =
            'https://wa.me/5213348572070?text=' + message;

    }

    therapy.addEventListener('change', updatePromo);

    aroma.addEventListener('change', updatePromo);

    updatePromo();

}, 400);

</script>

`;
