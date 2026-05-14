/**
 * ====================================================================================
 * INICIO_PROMOCIONES.JS — VERSIÓN ESTABLE FINAL
 * Render estable + cotizador funcional real + promociones automáticas
 * Compatible con la arquitectura actual de Grupo Gevizz
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `

<div style="max-width:1150px;margin:2rem auto 6rem auto;padding:0 1.4rem;">

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
            background:radial-gradient(circle, rgba(0,255,224,0.15), transparent 70%);
            pointer-events:none;
        "></div>

        <!-- HEADER -->

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
                animation:pulsePromo 2s infinite;
            "></i>

            <span style="
                color:var(--valtara-oro);
                font-size:0.82rem;
                letter-spacing:2px;
                text-transform:uppercase;
                font-weight:900;
            ">
                Promociones Inteligentes
            </span>

        </div>

        <h2 style="
            font-family:var(--font-accent);
            color:white;
            font-size:clamp(2.3rem,6vw,4rem);
            line-height:1.05;
            margin-bottom:1.5rem;
        ">
            Diseña Tu <span style="color:var(--valtara-oro);">Experiencia Sensorial</span>
        </h2>

        <p style="
            color:var(--valtara-gris-texto);
            line-height:1.9;
            font-size:1.1rem;
            max-width:850px;
            margin-bottom:3rem;
        ">
            Elige tu terapia, aromaterapia y deja que nuestro sistema
            detecte automáticamente la promoción ideal para ti según
            la hora y el día actual. Una experiencia premium diseñada
            para despertar descanso, alivio y deseo de volver.
        </p>

        <!-- BENEFICIOS -->

        <div style="
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(230px,1fr));
            gap:18px;
            margin-bottom:3rem;
        ">

            <div class="promo-mini-card">
                <i class="fa-solid fa-gift"></i>
                <h4>$169 de Cortesía</h4>
                <p>Lunes y martes después de la 1 PM.</p>
            </div>

            <div class="promo-mini-card">
                <i class="fa-solid fa-sun"></i>
                <h4>20% OFF</h4>
                <p>Jueves a domingo antes de las 2 PM.</p>
            </div>

            <div class="promo-mini-card">
                <i class="fa-solid fa-mug-hot"></i>
                <h4>Té de Frutos Rojos</h4>
                <p>Experiencias nocturnas después de las 7 PM.</p>
            </div>

            <div class="promo-mini-card">
                <i class="fa-solid fa-wind"></i>
                <h4>Aromaterapia Incluida</h4>
                <p>Sin costo adicional · Sujeto a disponibilidad.</p>
            </div>

        </div>

        <!-- COTIZADOR -->

        <div style="
            padding:2rem;
            border-radius:28px;
            background:rgba(255,255,255,0.025);
            border:1px solid rgba(255,255,255,0.08);
        ">

            <h3 style="
                color:white;
                font-size:2.4rem;
                margin-bottom:2rem;
                text-align:center;
                font-family:var(--font-accent);
            ">
                Cotizador En Línea
            </h3>

            <div style="
                display:grid;
                grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
                gap:20px;
                margin-bottom:2rem;
            ">

                <!-- TERAPIA -->

                <div>

                    <label class="promo-label">
                        Elige Tu Terapia
                    </label>

                    <select id="vt-therapy" class="promo-select">

                        <option value="699">Relajante · 50 Min · $699</option>
                        <option value="899">Relajante · 90 Min · $899</option>
                        <option value="729">Deportivo & Descompresión · $729</option>
                        <option value="729">Tailandés Yoga Pasivo · $729</option>
                        <option value="829">Ayurveda & Aromaterapia · $829</option>
                        <option value="829">Holístico Integrativo · $829</option>
                        <option value="999">Ritual Lomi Lomi Supremo · $999</option>
                        <option value="819">Esferas Chinas & Velas · $819</option>
                        <option value="529">Parálisis Facial · $529</option>
                        <option value="749">Drenaje Linfático · $749</option>
                        <option value="799">Reductivo & Maderoterapia · $799</option>

                    </select>

                </div>

                <!-- AROMA -->

                <div>

                    <label class="promo-label">
                        Aromaterapia
                    </label>

                    <select id="vt-aroma" class="promo-select">

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

            <div id="promo-emotion-box" style="
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
                    🌙 Experiencia Recomendada
                </h4>

                <p id="promo-description" style="
                    color:var(--valtara-gris-texto);
                    line-height:1.8;
                    margin:0;
                ">
                    Relajación profunda diseñada para disminuir ansiedad,
                    estrés físico y agotamiento mental.
                </p>

            </div>

            <!-- RESUMEN -->

            <div style="
                padding:2rem;
                border-radius:24px;
                background:rgba(255,255,255,0.03);
                border:1px solid rgba(255,255,255,0.08);
            ">

                <div class="promo-line">
                    <span>Subtotal</span>
                    <strong id="promo-subtotal">$699 MXN</strong>
                </div>

                <div class="promo-line">
                    <span>Promoción Aplicada</span>
                    <strong id="promo-name" style="color:var(--valtara-cian-brillante);">
                        Sin promoción vigente
                    </strong>
                </div>

                <div class="promo-line">
                    <span>Descuento</span>
                    <strong id="promo-discount" style="color:#4ADE80;">
                        -$0 MXN
                    </strong>
                </div>

                <div class="promo-line">
                    <span>Aromaterapia</span>
                    <strong id="promo-aroma">
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
                        font-size:1.25rem;
                        font-weight:800;
                    ">
                        Total Estimado
                    </span>

                    <strong id="promo-total" style="
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

                <a id="promo-wa"
                   href="https://wa.me/5213348572070"
                   target="_blank"
                   style="
                        background:linear-gradient(135deg,#25D366,#1EA952);
                        color:white;
                        padding:18px 32px;
                        border-radius:18px;
                        font-weight:900;
                        text-decoration:none;
                        display:flex;
                        align-items:center;
                        gap:14px;
                        font-size:1.05rem;
                        box-shadow:0 15px 40px rgba(37,211,102,0.28);
                        transition:transform .3s ease;
                   "
                   onmouseover="this.style.transform='translateY(-4px)'"
                   onmouseout="this.style.transform='translateY(0)'"
                >

                    <i class="fa-brands fa-whatsapp" style="
                        font-size:1.3rem;
                    "></i>

                    Reservar Mi Experiencia

                </a>

                <div style="
                    color:var(--valtara-gris-texto);
                    display:flex;
                    align-items:center;
                    gap:10px;
                    font-size:1rem;
                ">

                    <i class="fa-solid fa-phone"></i>
                    33 4857 2070

                </div>

            </div>

        </div>

    </article>

</div>

<style>

@keyframes pulsePromo{
    0%{transform:scale(1);}
    50%{transform:scale(1.15);}
    100%{transform:scale(1);}
}

.promo-mini-card{
    padding:1.5rem;
    border-radius:22px;
    background:rgba(255,255,255,0.03);
    border:1px solid rgba(255,255,255,0.08);
    transition:all .3s ease;
}

.promo-mini-card:hover{
    transform:translateY(-6px);
    border-color:rgba(242,201,76,0.3);
}

.promo-mini-card i{
    font-size:1.4rem;
    color:var(--valtara-oro);
    margin-bottom:1rem;
}

.promo-mini-card h4{
    color:white;
    margin-bottom:0.6rem;
}

.promo-mini-card p{
    color:var(--valtara-gris-texto);
    line-height:1.7;
}

.promo-label{
    display:block;
    color:white;
    margin-bottom:12px;
    font-weight:700;
}

.promo-select{
    width:100%;
    padding:18px;
    border-radius:18px;
    background:#111;
    color:white;
    border:1px solid rgba(255,255,255,0.08);
    outline:none;
    font-size:1rem;
}

.promo-line{
    display:flex;
    justify-content:space-between;
    gap:20px;
    flex-wrap:wrap;
    margin-bottom:1rem;
}

.promo-line span{
    color:var(--valtara-gris-texto);
}

.promo-line strong{
    color:white;
}

</style>

<script>

setTimeout(function(){

    var therapy = document.getElementById('vt-therapy');
    var aroma = document.getElementById('vt-aroma');

    if(!therapy || !aroma){
        return;
    }

    var descriptions = {
        699: 'Relajación profunda diseñada para disminuir ansiedad, tensión física y agotamiento emocional.',
        899: 'Una experiencia extendida de restauración corporal para burnout, insomnio y sobrecarga mental.',
        729: 'Liberación muscular profunda ideal para contracturas, estrés acumulado y fatiga física.',
        829: 'Aceites tibios, aromaterapia y maniobras fluidas para reconectar mente y cuerpo.',
        999: 'Ritual inmersivo premium inspirado en el oleaje hawaiano y la desconexión total.',
        819: 'Vibración sonora, velas cálidas y armonización sensorial profunda.',
        529: 'Estimulación neuromuscular delicada enfocada en recuperación y relajación facial.',
        749: 'Movimientos suaves para sensación de ligereza y descanso corporal.',
        799: 'Maderoterapia y protocolos corporales especializados de alto impacto.'
    };

    function money(value){
        return '$' + Number(value).toLocaleString('es-MX') + ' MXN';
    }

    function updatePromo(){

        var subtotal = Number(therapy.value);

        var now = new Date();

        var day = now.getDay();
        var hour = now.getHours();

        var promoName = 'Sin promoción vigente';
        var discount = 0;

        // LUNES Y MARTES
        if((day === 1 || day === 2) && hour >= 13){

            promoName = '$169 de cortesía';
            discount = 169;

        }

        // JUEVES A DOMINGO
        else if((day === 4 || day === 5 || day === 6 || day === 0) && hour < 14){

            promoName = '20% OFF Matutino';
            discount = Math.round(subtotal * 0.20);

        }

        var total = subtotal - discount;

        document.getElementById('promo-subtotal').innerHTML = money(subtotal);

        document.getElementById('promo-name').innerHTML = promoName;

        document.getElementById('promo-discount').innerHTML =
            '-'+ money(discount);

        document.getElementById('promo-total').innerHTML = money(total);

        document.getElementById('promo-description').innerHTML =
            descriptions[subtotal];

        var message =
            'Hola, quiero reservar una experiencia Valtara.%0A%0A' +
            '✨ Terapia: ' + therapy.options[therapy.selectedIndex].text + '%0A' +
            '🌿 Aromaterapia: ' + aroma.value + '%0A' +
            '🎁 Promoción: ' + promoName + '%0A' +
            '💰 Total estimado: ' + money(total);

        document.getElementById('promo-wa').href =
            'https://wa.me/5213348572070?text=' + message;

    }

    therapy.addEventListener('change', updatePromo);

    aroma.addEventListener('change', updatePromo);

    updatePromo();

}, 400);

</script>

`;
