/**
 * ====================================================================================
 * PATCH — COTIZADOR DINÁMICO PARA inicio_promociones.js
 * Compatible con la arquitectura actual que SÍ renderiza
 * ====================================================================================
 *
 * INSTRUCCIONES:
 * 1. NO reemplaces todo el archivo.
 * 2. PEGA ESTE BLOQUE exactamente ANTES del cierre:
 *
 * `;
 *
 * Es decir:
 * al final del HTML de inicio_promociones.js
 * justo antes de cerrar el template literal.
 *
 * ====================================================================================
 */

<div style="
    margin-top:4rem;
    padding:2.5rem;
    border-radius:28px;
    background:
        radial-gradient(circle at top right, rgba(0,255,224,0.08), transparent 30%),
        linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
    border:1px solid rgba(0,255,224,0.14);
    position:relative;
    overflow:hidden;
">

    <div style="
        position:absolute;
        top:-100px;
        right:-100px;
        width:260px;
        height:260px;
        background:radial-gradient(circle, rgba(0,255,224,0.08), transparent 70%);
        pointer-events:none;
    "></div>

    <div style="
        display:inline-flex;
        align-items:center;
        gap:10px;
        padding:10px 18px;
        border-radius:50px;
        background:rgba(0,255,224,0.08);
        border:1px solid rgba(0,255,224,0.16);
        margin-bottom:1.5rem;
    ">
        <i class="fa-solid fa-calculator" style="color:var(--valtara-cian-brillante);"></i>

        <span style="
            color:var(--valtara-cian-brillante);
            font-size:0.82rem;
            letter-spacing:2px;
            text-transform:uppercase;
            font-weight:900;
        ">
            Cotizador Inteligente
        </span>
    </div>

    <h3 style="
        color:white;
        font-size:2rem;
        margin-bottom:1rem;
        font-family:var(--font-accent);
    ">
        Calcula Tu Experiencia
    </h3>

    <p style="
        color:var(--valtara-gris-texto);
        line-height:1.9;
        margin-bottom:2rem;
        max-width:850px;
    ">
        Selecciona tu terapia y aromaterapia favorita. El sistema detectará automáticamente
        promociones válidas según el día y la hora de tu dispositivo.
    </p>

    <div style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
        gap:20px;
        margin-bottom:2rem;
    ">

        <!-- TERAPIA -->
        <div>
            <label style="
                display:block;
                margin-bottom:10px;
                color:white;
                font-weight:700;
                letter-spacing:1px;
            ">
                Terapia
            </label>

            <select id="promo-therapy" style="
                width:100%;
                padding:18px;
                border-radius:18px;
                background:rgba(255,255,255,0.04);
                border:1px solid rgba(255,255,255,0.1);
                color:white;
                font-size:1rem;
                outline:none;
            ">

                <option value="699">Masaje Relajante · $699</option>
                <option value="899">Relajante 90 Min · $899</option>
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
            <label style="
                display:block;
                margin-bottom:10px;
                color:white;
                font-weight:700;
                letter-spacing:1px;
            ">
                Aromaterapia
            </label>

            <select id="promo-aroma" style="
                width:100%;
                padding:18px;
                border-radius:18px;
                background:rgba(255,255,255,0.04);
                border:1px solid rgba(255,255,255,0.1);
                color:white;
                font-size:1rem;
                outline:none;
            ">

                <option>Lavanda</option>
                <option>Vainilla</option>
                <option>Jazmín</option>
                <option>Eucalipto</option>
                <option>Frutos Rojos</option>
                <option>Té Blanco</option>
                <option>Rosas Blancas</option>
                <option>Cacao</option>
                <option>Naranja Dulce</option>
                <option>Flor de Azahar</option>
                <option>Menta</option>
                <option>Romero</option>

            </select>
        </div>

    </div>

    <!-- RESULTADO -->
    <div id="promo-summary-box" style="
        padding:2rem;
        border-radius:22px;
        background:rgba(255,255,255,0.03);
        border:1px solid rgba(255,255,255,0.08);
    ">

        <div style="
            display:flex;
            justify-content:space-between;
            gap:20px;
            flex-wrap:wrap;
            margin-bottom:1rem;
        ">
            <span style="color:var(--valtara-gris-texto);">Subtotal</span>
            <strong id="promo-subtotal" style="color:white;">$699 MXN</strong>
        </div>

        <div style="
            display:flex;
            justify-content:space-between;
            gap:20px;
            flex-wrap:wrap;
            margin-bottom:1rem;
        ">
            <span style="color:var(--valtara-gris-texto);">Promoción Aplicada</span>
            <strong id="promo-discount-name" style="color:var(--valtara-cian-brillante);">
                Verificando horario...
            </strong>
        </div>

        <div style="
            display:flex;
            justify-content:space-between;
            gap:20px;
            flex-wrap:wrap;
            margin-bottom:1.5rem;
        ">
            <span style="color:var(--valtara-gris-texto);">Descuento</span>
            <strong id="promo-discount" style="color:#4ADE80;">
                -$0 MXN
            </strong>
        </div>

        <div style="
            height:1px;
            background:rgba(255,255,255,0.08);
            margin-bottom:1.5rem;
        "></div>

        <div style="
            display:flex;
            justify-content:space-between;
            gap:20px;
            flex-wrap:wrap;
            align-items:center;
        ">
            <span style="
                color:white;
                font-size:1.2rem;
                font-weight:700;
            ">
                Total Estimado
            </span>

            <strong id="promo-total" style="
                color:var(--valtara-oro);
                font-size:2rem;
                font-weight:900;
            ">
                $699 MXN
            </strong>
        </div>

    </div>

    <a id="promo-wa-link"
       href="https://wa.me/5213348572070"
       target="_blank"
       style="
            margin-top:2rem;
            background:linear-gradient(135deg,#25D366,#1EA952);
            color:white;
            padding:18px 28px;
            border-radius:16px;
            font-weight:900;
            text-decoration:none;
            display:flex;
            align-items:center;
            justify-content:center;
            gap:12px;
            font-size:1.05rem;
       ">

        <i class="fa-brands fa-whatsapp"></i>
        Continuar por WhatsApp · 33 4857 2070

    </a>

</div>

<script>

(function(){

    function actualizarCotizador(){

        const therapySelect = document.getElementById('promo-therapy');
        const aromaSelect = document.getElementById('promo-aroma');

        if(!therapySelect || !aromaSelect) return;

        const subtotal = Number(therapySelect.value);

        const now = new Date();

        const day = now.getDay();
        const hour = now.getHours();

        let discount = 0;
        let promoName = 'Sin promoción vigente';

        // LUNES = 1
        // MARTES = 2
        if((day === 1 || day === 2) && hour >= 13){

            discount = 169;
            promoName = '$169 de cortesía';

        }

        // JUEVES A DOMINGO
        if((day >= 4 || day === 0) && hour < 14){

            discount = Math.round(subtotal * 0.20);
            promoName = '20% OFF Matutino';

        }

        const total = subtotal - discount;

        document.getElementById('promo-subtotal').innerHTML =
            '$' + subtotal.toLocaleString('es-MX') + ' MXN';

        document.getElementById('promo-discount-name').innerHTML =
            promoName;

        document.getElementById('promo-discount').innerHTML =
            '-$' + discount.toLocaleString('es-MX') + ' MXN';

        document.getElementById('promo-total').innerHTML =
            '$' + total.toLocaleString('es-MX') + ' MXN';

        const mensaje =
            'Hola, quiero agendar una experiencia Valtara.%0A%0A' +
            'Terapia: ' + therapySelect.options[therapySelect.selectedIndex].text + '%0A' +
            'Aromaterapia: ' + aromaSelect.value + '%0A' +
            'Promoción detectada: ' + promoName + '%0A' +
            'Total estimado: $' + total.toLocaleString('es-MX') + ' MXN';

        document.getElementById('promo-wa-link').href =
            'https://wa.me/5213348572070?text=' + mensaje;

    }

    setTimeout(function(){

        actualizarCotizador();

        const therapySelect = document.getElementById('promo-therapy');
        const aromaSelect = document.getElementById('promo-aroma');

        if(therapySelect){
            therapySelect.addEventListener('change', actualizarCotizador);
        }

        if(aromaSelect){
            aromaSelect.addEventListener('change', actualizarCotizador);
        }

    }, 400);

})();

</script>
