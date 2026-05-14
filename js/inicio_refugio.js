/**
 * ====================================================================================
 * INICIO_PROMOCIONES.JS — VERSIÓN ESTABLE Y COMPATIBLE
 * Arquitectura replicada EXACTAMENTE desde inicio_refugio.js
 * SIN objetos complejos
 * SIN render dinámico externo
 * SIN init()
 * SIN módulos secundarios
 * SIN placeholders
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `
    
    <div style="max-width:1100px;margin:2rem auto 6rem auto;padding:0 2rem;">

        <article class="glass-card reveal" style="
            padding:4rem 3rem;
            border-radius:32px;
            overflow:hidden;
            position:relative;
            background:
                radial-gradient(circle at top right, rgba(0,255,224,0.08), transparent 25%),
                radial-gradient(circle at bottom left, rgba(242,201,76,0.08), transparent 30%),
                linear-gradient(180deg, rgba(10,10,15,0.96), rgba(5,5,8,0.98));
            border:1px solid rgba(255,255,255,0.08);
            box-shadow:0 25px 60px rgba(0,0,0,0.55);
        ">

            <div style="
                position:absolute;
                top:-120px;
                right:-120px;
                width:300px;
                height:300px;
                background:radial-gradient(circle, rgba(0,255,224,0.12), transparent 70%);
                pointer-events:none;
            "></div>

            <!-- HEADER -->

            <div style="
                display:inline-flex;
                align-items:center;
                gap:10px;
                padding:12px 22px;
                border-radius:999px;
                background:rgba(242,201,76,0.08);
                border:1px solid rgba(242,201,76,0.25);
                margin-bottom:2rem;
            ">

                <i class="fa-solid fa-gift" style="
                    color:var(--valtara-oro);
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
                font-size:3rem;
                margin-bottom:1.5rem;
                line-height:1.1;
            ">
                Personaliza Tu <span style="color:var(--valtara-oro);">Experiencia</span>
            </h2>

            <p style="
                color:var(--valtara-gris-texto);
                line-height:1.9;
                font-size:1.1rem;
                max-width:850px;
                margin-bottom:3rem;
            ">
                Selecciona tu terapia, aromaterapia y el sistema detectará automáticamente
                las promociones válidas según el día y la hora actual.
                Todas las aromaterapias están incluidas sin costo adicional
                y sujetas a disponibilidad.
            </p>

            <!-- BENEFICIOS -->

            <div style="
                display:grid;
                grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                gap:18px;
                margin-bottom:3rem;
            ">

                <div style="
                    padding:1.4rem;
                    border-radius:22px;
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,255,255,0.08);
                ">
                    <i class="fa-solid fa-clock" style="
                        color:var(--valtara-cian-brillante);
                        font-size:1.3rem;
                        margin-bottom:1rem;
                    "></i>

                    <h4 style="
                        color:white;
                        margin-bottom:0.6rem;
                    ">
                        Cortesía $169
                    </h4>

                    <p style="
                        color:var(--valtara-gris-texto);
                        line-height:1.7;
                        font-size:0.95rem;
                    ">
                        Lunes y martes después de la 1 PM.
                    </p>

                </div>

                <div style="
                    padding:1.4rem;
                    border-radius:22px;
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,255,255,0.08);
                ">
                    <i class="fa-solid fa-sun" style="
                        color:#FFD166;
                        font-size:1.3rem;
                        margin-bottom:1rem;
                    "></i>

                    <h4 style="
                        color:white;
                        margin-bottom:0.6rem;
                    ">
                        20% OFF
                    </h4>

                    <p style="
                        color:var(--valtara-gris-texto);
                        line-height:1.7;
                        font-size:0.95rem;
                    ">
                        Jueves a domingo antes de las 2 PM.
                    </p>

                </div>

                <div style="
                    padding:1.4rem;
                    border-radius:22px;
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,255,255,0.08);
                ">
                    <i class="fa-solid fa-wind" style="
                        color:#90F1EF;
                        font-size:1.3rem;
                        margin-bottom:1rem;
                    "></i>

                    <h4 style="
                        color:white;
                        margin-bottom:0.6rem;
                    ">
                        Aromaterapia Incluida
                    </h4>

                    <p style="
                        color:var(--valtara-gris-texto);
                        line-height:1.7;
                        font-size:0.95rem;
                    ">
                        Sin costo adicional.
                    </p>

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
                    font-size:2rem;
                    margin-bottom:2rem;
                    font-family:var(--font-accent);
                ">
                    Cotizador En Línea
                </h3>

                <!-- SELECTS -->

                <div style="
                    display:grid;
                    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
                    gap:20px;
                    margin-bottom:2rem;
                ">

                    <div>

                        <label style="
                            display:block;
                            color:white;
                            margin-bottom:12px;
                            font-weight:700;
                        ">
                            Elige Tu Terapia
                        </label>

                        <select id="vt-calc-therapy" style="
                            width:100%;
                            padding:18px;
                            border-radius:18px;
                            background:#111;
                            color:white;
                            border:1px solid rgba(255,255,255,0.1);
                            outline:none;
                        ">

                            <option value="699">Relajante · $699</option>
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

                    <div>

                        <label style="
                            display:block;
                            color:white;
                            margin-bottom:12px;
                            font-weight:700;
                        ">
                            Aromaterapia
                        </label>

                        <select id="vt-calc-aroma" style="
                            width:100%;
                            padding:18px;
                            border-radius:18px;
                            background:#111;
                            color:white;
                            border:1px solid rgba(255,255,255,0.1);
                            outline:none;
                        ">

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

                <!-- RESUMEN -->

                <div style="
                    padding:2rem;
                    border-radius:22px;
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,255,255,0.08);
                ">

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        margin-bottom:1rem;
                        gap:20px;
                        flex-wrap:wrap;
                    ">
                        <span style="color:var(--valtara-gris-texto);">
                            Subtotal
                        </span>

                        <strong id="vt-subtotal" style="color:white;">
                            $699 MXN
                        </strong>
                    </div>

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        margin-bottom:1rem;
                        gap:20px;
                        flex-wrap:wrap;
                    ">
                        <span style="color:var(--valtara-gris-texto);">
                            Promoción
                        </span>

                        <strong id="vt-promo-name" style="
                            color:var(--valtara-cian-brillante);
                        ">
                            Verificando...
                        </strong>
                    </div>

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        margin-bottom:1rem;
                        gap:20px;
                        flex-wrap:wrap;
                    ">
                        <span style="color:var(--valtara-gris-texto);">
                            Descuento
                        </span>

                        <strong id="vt-discount" style="
                            color:#4ADE80;
                        ">
                            -$0 MXN
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
                            font-size:2rem;
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
                ">

                    <a id="vt-wa-link"
                       href="https://wa.me/5213348572070"
                       target="_blank"
                       style="
                            background:linear-gradient(135deg,#25D366,#1EA952);
                            color:white;
                            padding:18px 30px;
                            border-radius:16px;
                            font-weight:900;
                            text-decoration:none;
                            display:flex;
                            align-items:center;
                            gap:12px;
                            box-shadow:0 15px 35px rgba(37,211,102,0.25);
                       ">

                        <i class="fa-brands fa-whatsapp"></i>
                        Continuar por WhatsApp

                    </a>

                    <div style="
                        display:flex;
                        align-items:center;
                        gap:10px;
                        color:var(--valtara-gris-texto);
                    ">

                        <i class="fa-solid fa-phone"></i>
                        33 4857 2070

                    </div>

                </div>

            </div>

        </article>

    </div>

    <script>

        setTimeout(function(){

            var therapy = document.getElementById('vt-calc-therapy');
            var aroma = document.getElementById('vt-calc-aroma');

            if(!therapy || !aroma){
                return;
            }

            function actualizar(){

                var subtotal = Number(therapy.value);

                var now = new Date();

                var day = now.getDay();
                var hour = now.getHours();

                var discount = 0;
                var promoName = 'Sin promoción vigente';

                if((day === 1 || day === 2) && hour >= 13){

                    discount = 169;
                    promoName = '$169 de cortesía';

                }

                if((day >= 4 || day === 0) && hour < 14){

                    discount = Math.round(subtotal * 0.20);
                    promoName = '20% OFF Matutino';

                }

                var total = subtotal - discount;

                document.getElementById('vt-subtotal').innerHTML =
                    '$' + subtotal.toLocaleString('es-MX') + ' MXN';

                document.getElementById('vt-promo-name').innerHTML =
                    promoName;

                document.getElementById('vt-discount').innerHTML =
                    '-$' + discount.toLocaleString('es-MX') + ' MXN';

                document.getElementById('vt-total').innerHTML =
                    '$' + total.toLocaleString('es-MX') + ' MXN';

                var mensaje =
                    'Hola, quiero agendar una experiencia Valtara.%0A%0A' +
                    'Terapia: ' + therapy.options[therapy.selectedIndex].text + '%0A' +
                    'Aromaterapia: ' + aroma.value + '%0A' +
                    'Promoción: ' + promoName + '%0A' +
                    'Total estimado: $' + total.toLocaleString('es-MX') + ' MXN';

                document.getElementById('vt-wa-link').href =
                    'https://wa.me/5213348572070?text=' + mensaje;

            }

            therapy.addEventListener('change', actualizar);
            aroma.addEventListener('change', actualizar);

            actualizar();

        }, 500);

    </script>

`;
