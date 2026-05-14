/**
 * ====================================================================================
 * MÓDULO: INICIO PROMOCIONES
 * Arquitectura compatible con inicio_refugio.js
 * Versión: Sovereign OS V39.0
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraModulos.inicio_promociones = `
    
    <div style="max-width: 1250px; margin: 2rem auto 6rem auto; padding: 0 2rem;">

        <article class="glass-card reveal" style="
            border-color: rgba(0,255,224,0.18);
            background:
                radial-gradient(circle at top right, rgba(0,255,224,0.08) 0%, transparent 30%),
                radial-gradient(circle at bottom left, rgba(242,201,76,0.08) 0%, transparent 30%),
                linear-gradient(180deg, rgba(10,10,15,0.96) 0%, rgba(5,5,10,0.98) 100%);
            padding: 4rem 3rem;
            border-radius: 28px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 20px 60px rgba(0,0,0,0.55);
        ">

            <div style="
                position:absolute;
                top:-120px;
                right:-120px;
                width:320px;
                height:320px;
                background:radial-gradient(circle, rgba(0,255,224,0.12) 0%, transparent 70%);
                pointer-events:none;
            "></div>

            <div style="
                position:absolute;
                bottom:-140px;
                left:-120px;
                width:340px;
                height:340px;
                background:radial-gradient(circle, rgba(242,201,76,0.12) 0%, transparent 70%);
                pointer-events:none;
            "></div>

            <div style="
                display:inline-flex;
                align-items:center;
                gap:10px;
                padding:12px 22px;
                background:rgba(0,255,224,0.08);
                border:1px solid rgba(0,255,224,0.25);
                border-radius:50px;
                margin-bottom:2rem;
                position:relative;
                z-index:2;
            ">
                <i class="fa-solid fa-gift" style="color:var(--valtara-cian-brillante);"></i>
                <span style="
                    color:var(--valtara-cian-brillante);
                    font-weight:900;
                    letter-spacing:2px;
                    font-size:0.82rem;
                    text-transform:uppercase;
                ">
                    Promociones Ejecutivas
                </span>
            </div>

            <h2 style="
                font-family:var(--font-accent);
                font-size:3.3rem;
                color:var(--valtara-blanco);
                margin-bottom:1.5rem;
                line-height:1.1;
                font-weight:400;
                position:relative;
                z-index:2;
            ">
                Diseñe Su <span style="color:var(--valtara-oro);">Experiencia Valtara</span>
            </h2>

            <p style="
                color:var(--valtara-gris-texto);
                font-size:1.2rem;
                line-height:1.9;
                max-width:850px;
                margin-bottom:3rem;
                font-weight:300;
                position:relative;
                z-index:2;
            ">
                Seleccione su terapia ideal, agregue aromaterapia premium sin costo adicional
                y aproveche las promociones vigentes. Cada experiencia fue diseñada para
                combinar restauración física, regulación emocional y una estética clínica elegante.
            </p>

            <div style="
                display:grid;
                grid-template-columns:repeat(auto-fit,minmax(230px,1fr));
                gap:18px;
                margin-bottom:3rem;
                position:relative;
                z-index:2;
            ">

                <div style="
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,255,255,0.08);
                    border-radius:20px;
                    padding:1.2rem;
                ">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                        <i class="fa-solid fa-tag" style="color:var(--valtara-oro);"></i>
                        <strong style="color:white;">$169 de cortesía</strong>
                    </div>
                    <p style="color:var(--valtara-gris-texto);line-height:1.7;font-size:0.96rem;">
                        Disponible lunes y martes en las primeras 10 sesiones después de la 1 PM.
                    </p>
                </div>

                <div style="
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,255,255,0.08);
                    border-radius:20px;
                    padding:1.2rem;
                ">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                        <i class="fa-solid fa-sun" style="color:var(--valtara-cian-brillante);"></i>
                        <strong style="color:white;">20% Matutino</strong>
                    </div>
                    <p style="color:var(--valtara-gris-texto);line-height:1.7;font-size:0.96rem;">
                        Jueves a domingo antes de las 2 PM en terapias participantes.
                    </p>
                </div>

                <div style="
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,255,255,0.08);
                    border-radius:20px;
                    padding:1.2rem;
                ">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                        <i class="fa-solid fa-leaf" style="color:#4ADE80;"></i>
                        <strong style="color:white;">Aromaterapia incluida</strong>
                    </div>
                    <p style="color:var(--valtara-gris-texto);line-height:1.7;font-size:0.96rem;">
                        Todas las esencias están incluidas sin costo extra. Sujetas a disponibilidad.
                    </p>
                </div>

                <div style="
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,255,255,0.08);
                    border-radius:20px;
                    padding:1.2rem;
                ">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                        <i class="fa-solid fa-location-dot" style="color:#FFB84D;"></i>
                        <strong style="color:white;">Ubicaciones</strong>
                    </div>
                    <p style="color:var(--valtara-gris-texto);line-height:1.7;font-size:0.96rem;">
                        Reforma 195 · Próxima apertura cerca de Metro Eugenia.
                    </p>
                </div>

            </div>

            <div style="
                display:grid;
                grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
                gap:24px;
                position:relative;
                z-index:2;
            ">

                <!-- RELAJANTE -->
                <div class="glass-card" style="
                    padding:2rem;
                    border-radius:24px;
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(0,255,224,0.14);
                ">

                    <div style="
                        width:70px;
                        height:70px;
                        border-radius:22px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        background:rgba(0,255,224,0.08);
                        margin-bottom:1.5rem;
                        border:1px solid rgba(0,255,224,0.2);
                    ">
                        <i class="fa-solid fa-spa fa-beat-fade" style="
                            color:var(--valtara-cian-brillante);
                            font-size:1.7rem;
                        "></i>
                    </div>

                    <h3 style="
                        color:white;
                        font-size:1.5rem;
                        margin-bottom:0.6rem;
                    ">
                        Masaje Relajante
                    </h3>

                    <p style="
                        color:var(--valtara-cian-brillante);
                        font-weight:800;
                        margin-bottom:1rem;
                    ">
                        50 Min · $699 MXN
                    </p>

                    <p style="
                        color:var(--valtara-gris-texto);
                        line-height:1.8;
                        margin-bottom:1.5rem;
                    ">
                        Diseñado para disminuir ansiedad, cansancio mental y tensión muscular acumulada.
                        Ideal para quienes viven jornadas exigentes y necesitan desacelerar cuerpo y mente.
                    </p>

                    <div style="
                        display:flex;
                        flex-wrap:wrap;
                        gap:10px;
                        margin-bottom:1.5rem;
                    ">
                        <span style="
                            padding:8px 14px;
                            background:rgba(255,255,255,0.05);
                            border-radius:50px;
                            color:var(--valtara-cian-brillante);
                            font-size:0.8rem;
                            letter-spacing:1px;
                            text-transform:uppercase;
                        ">
                            Lavanda
                        </span>

                        <span style="
                            padding:8px 14px;
                            background:rgba(255,255,255,0.05);
                            border-radius:50px;
                            color:var(--valtara-cian-brillante);
                            font-size:0.8rem;
                            letter-spacing:1px;
                            text-transform:uppercase;
                        ">
                            Vainilla
                        </span>

                        <span style="
                            padding:8px 14px;
                            background:rgba(255,255,255,0.05);
                            border-radius:50px;
                            color:var(--valtara-cian-brillante);
                            font-size:0.8rem;
                            letter-spacing:1px;
                            text-transform:uppercase;
                        ">
                            Jazmín
                        </span>
                    </div>

                    <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20agendar%20el%20Masaje%20Relajante%20de%2050%20minutos%20por%20$699%20MXN." target="_blank" style="
                        background:linear-gradient(135deg,#00ffe0,#00bfa6);
                        color:#050508;
                        padding:15px 22px;
                        border-radius:14px;
                        font-weight:900;
                        text-decoration:none;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        gap:10px;
                    ">
                        <i class="fa-brands fa-whatsapp"></i>
                        Agendar Experiencia
                    </a>

                </div>

                <!-- DEPORTIVO -->
                <div class="glass-card" style="
                    padding:2rem;
                    border-radius:24px;
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,85,85,0.18);
                ">

                    <div style="
                        width:70px;
                        height:70px;
                        border-radius:22px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        background:rgba(255,85,85,0.08);
                        margin-bottom:1.5rem;
                        border:1px solid rgba(255,85,85,0.2);
                    ">
                        <i class="fa-solid fa-dumbbell fa-bounce" style="
                            color:#ff5555;
                            font-size:1.7rem;
                        "></i>
                    </div>

                    <h3 style="
                        color:white;
                        font-size:1.5rem;
                        margin-bottom:0.6rem;
                    ">
                        Deportivo & Descompresión
                    </h3>

                    <p style="
                        color:#ff7777;
                        font-weight:800;
                        margin-bottom:1rem;
                    ">
                        50 Min · $729 MXN
                    </p>

                    <p style="
                        color:var(--valtara-gris-texto);
                        line-height:1.8;
                        margin-bottom:1.5rem;
                    ">
                        Terapia enfocada en contracturas profundas, sobrecarga física y rigidez muscular.
                        Excelente para gimnasio, estrés físico acumulado o jornadas corporales intensas.
                    </p>

                    <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20agendar%20el%20Masaje%20Deportivo%20y%20Descompresión." target="_blank" style="
                        background:linear-gradient(135deg,#ff5555,#ff884d);
                        color:white;
                        padding:15px 22px;
                        border-radius:14px;
                        font-weight:900;
                        text-decoration:none;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        gap:10px;
                    ">
                        <i class="fa-brands fa-whatsapp"></i>
                        Reservar Terapia
                    </a>

                </div>

                <!-- LOMI -->
                <div class="glass-card" style="
                    padding:2rem;
                    border-radius:24px;
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(242,201,76,0.18);
                ">

                    <div style="
                        width:70px;
                        height:70px;
                        border-radius:22px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        background:rgba(242,201,76,0.08);
                        margin-bottom:1.5rem;
                        border:1px solid rgba(242,201,76,0.2);
                    ">
                        <i class="fa-solid fa-water fa-fade" style="
                            color:var(--valtara-oro);
                            font-size:1.7rem;
                        "></i>
                    </div>

                    <h3 style="
                        color:white;
                        font-size:1.5rem;
                        margin-bottom:0.6rem;
                    ">
                        Ritual Lomi Lomi Supremo
                    </h3>

                    <p style="
                        color:var(--valtara-oro);
                        font-weight:800;
                        margin-bottom:1rem;
                    ">
                        Sesión Premium · $999 MXN
                    </p>

                    <p style="
                        color:var(--valtara-gris-texto);
                        line-height:1.8;
                        margin-bottom:1.5rem;
                    ">
                        Inspirado en el oleaje hawaiano, esta experiencia premium busca una desconexión
                        profunda del estrés mediante movimientos fluidos, continuos y altamente envolventes.
                    </p>

                    <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20agendar%20el%20Ritual%20Lomi%20Lomi%20Supremo." target="_blank" style="
                        background:linear-gradient(135deg,#F2C94C,#F2994A);
                        color:#050508;
                        padding:15px 22px;
                        border-radius:14px;
                        font-weight:900;
                        text-decoration:none;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        gap:10px;
                    ">
                        <i class="fa-brands fa-whatsapp"></i>
                        Agendar Ritual Premium
                    </a>

                </div>

            </div>

            <div style="
                margin-top:3rem;
                padding:2rem;
                border-radius:22px;
                background:rgba(255,255,255,0.03);
                border:1px solid rgba(255,255,255,0.08);
                position:relative;
                z-index:2;
            ">

                <h3 style="
                    color:white;
                    margin-bottom:1rem;
                    font-size:1.4rem;
                ">
                    Aromaterapia Premium Incluida
                </h3>

                <p style="
                    color:var(--valtara-gris-texto);
                    line-height:1.9;
                    margin-bottom:1.5rem;
                ">
                    Todas las terapias pueden acompañarse con esencias seleccionadas para potenciar
                    la experiencia sensorial. Las opciones disponibles incluyen lavanda, vainilla,
                    eucalipto, jazmín, rosas blancas, frutos rojos, cacao, té blanco,
                    naranja dulce, romero y flor de azahar.
                </p>

                <div style="
                    display:flex;
                    flex-wrap:wrap;
                    gap:12px;
                ">

                    <span style="
                        background:rgba(0,255,224,0.08);
                        border:1px solid rgba(0,255,224,0.15);
                        padding:10px 16px;
                        border-radius:50px;
                        color:var(--valtara-cian-brillante);
                        font-size:0.85rem;
                    ">
                        <i class="fa-solid fa-leaf"></i> Sin costo adicional
                    </span>

                    <span style="
                        background:rgba(255,255,255,0.05);
                        border:1px solid rgba(255,255,255,0.08);
                        padding:10px 16px;
                        border-radius:50px;
                        color:white;
                        font-size:0.85rem;
                    ">
                        <i class="fa-solid fa-circle-info"></i> Sujeto a disponibilidad
                    </span>

                </div>

            </div>

            <div style="
                display:flex;
                flex-wrap:wrap;
                gap:20px;
                justify-content:center;
                margin-top:3rem;
                position:relative;
                z-index:2;
            ">

                <a href="https://wa.me/5213348572070?text=Hola,%20quiero%20información%20sobre%20las%20promociones%20vigentes%20de%20Valtara." target="_blank" style="
                    background:linear-gradient(135deg,#25D366,#1EA952);
                    color:white;
                    padding:16px 34px;
                    border-radius:14px;
                    font-weight:900;
                    text-decoration:none;
                    font-size:1.05rem;
                    display:flex;
                    align-items:center;
                    gap:12px;
                    box-shadow:0 10px 30px rgba(37,211,102,0.25);
                ">
                    <i class="fa-brands fa-whatsapp"></i>
                    Solicitar Información
                </a>

                <button onclick="if(window.Router) { window.Router.navigate('restoration'); } else { document.getElementById('view-home').classList.remove('active'); document.getElementById('view-restoration').classList.add('active'); window.scrollTo(0,0); }" style="
                    background:rgba(255,255,255,0.03);
                    color:white;
                    border:1px solid rgba(255,255,255,0.2);
                    padding:16px 34px;
                    border-radius:14px;
                    font-weight:bold;
                    cursor:pointer;
                    font-size:1.05rem;
                    transition:background 0.3s, transform 0.3s;
                    display:flex;
                    align-items:center;
                    gap:12px;
                " onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='translateY(-3px)';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.transform='translateY(0)';">

                    <i class="fa-solid fa-book-open"></i>
                    Explorar Catálogo Completo

                </button>

            </div>

        </article>

    </div>

`;
