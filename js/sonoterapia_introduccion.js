window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.sonoterapia_introducción = `

<style>
    @keyframes sono-pulse {
        0%, 100% { transform: scale(1);    opacity: 1;    }
        50%       { transform: scale(1.08); opacity: 0.85; }
    }
    @keyframes sono-bars {
        0%, 100% { height: 8px;  }
        25%       { height: 28px; }
        50%       { height: 16px; }
        75%       { height: 34px; }
    }
    @keyframes sono-ring {
        0%   { transform: scale(0.92); opacity: 0.15; }
        100% { transform: scale(1.55); opacity: 0;    }
    }
    @keyframes sono-float {
        0%, 100% { transform: translateY(0px);   }
        50%       { transform: translateY(-10px); }
    }
    @keyframes sono-glow {
        0%, 100% { box-shadow: 0 0 40px rgba(0,255,224,.18), 0 0 80px rgba(0,255,224,.06); }
        50%       { box-shadow: 0 0 70px rgba(0,255,224,.32), 0 0 120px rgba(0,255,224,.12); }
    }
    @keyframes sono-fade-up {
        from { opacity: 0; transform: translateY(22px); }
        to   { opacity: 1; transform: translateY(0);    }
    }
</style>

<section style="
    max-width:1100px;
    margin:0 auto 5rem auto;
    padding:0 1.5rem;
    text-align:center;
">

    <!-- Icono animado central -->
    <div style="
        position:relative;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        margin-bottom:3rem;
        animation: sono-float 6s ease-in-out infinite;
    ">

        <!-- Anillos expansivos -->
        <div style="
            position:absolute;
            width:130px;height:130px;
            border-radius:50%;
            border:1px solid rgba(0,255,224,.35);
            animation: sono-ring 2.4s ease-out infinite;
        "></div>
        <div style="
            position:absolute;
            width:130px;height:130px;
            border-radius:50%;
            border:1px solid rgba(0,255,224,.2);
            animation: sono-ring 2.4s ease-out infinite;
            animation-delay:.8s;
        "></div>
        <div style="
            position:absolute;
            width:130px;height:130px;
            border-radius:50%;
            border:1px solid rgba(0,255,224,.1);
            animation: sono-ring 2.4s ease-out infinite;
            animation-delay:1.6s;
        "></div>

        <!-- Círculo principal con glow -->
        <div style="
            position:relative;
            width:110px;height:110px;
            border-radius:50%;
            background:radial-gradient(circle at 38% 38%,
                rgba(0,255,224,.18),
                rgba(0,0,0,.75));
            border:1px solid rgba(0,255,224,.4);
            display:flex;align-items:center;justify-content:center;
            animation: sono-glow 3.5s ease-in-out infinite;
            z-index:2;
        ">
            <!-- Barras de ecualizador animadas -->
            <div style="display:flex;align-items:flex-end;gap:5px;height:42px;">
                <div style="width:5px;border-radius:3px;background:var(--valtara-cian-brillante);animation:sono-bars 1.1s ease-in-out infinite;animation-delay:0s;"></div>
                <div style="width:5px;border-radius:3px;background:var(--valtara-cian-brillante);animation:sono-bars 1.1s ease-in-out infinite;animation-delay:.18s;"></div>
                <div style="width:5px;border-radius:3px;background:var(--valtara-cian-brillante);animation:sono-bars 1.1s ease-in-out infinite;animation-delay:.36s;"></div>
                <div style="width:5px;border-radius:3px;background:var(--valtara-cian-brillante);animation:sono-bars 1.1s ease-in-out infinite;animation-delay:.54s;"></div>
                <div style="width:5px;border-radius:3px;background:var(--valtara-cian-brillante);animation:sono-bars 1.1s ease-in-out infinite;animation-delay:.72s;"></div>
            </div>
        </div>
    </div>

    <!-- Kicker -->
    <div style="
        display:inline-flex;align-items:center;gap:.6rem;
        padding:.42rem 1rem;border-radius:999px;
        background:rgba(0,255,224,.06);
        border:1px solid rgba(0,255,224,.18);
        color:var(--valtara-cian-brillante);
        font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;
        margin-bottom:1.6rem;
        animation: sono-fade-up .7s ease both;
        animation-delay:.1s;
    ">
        <i class="fa-solid fa-wave-square fa-fade" style="--fa-animation-duration:2s;"></i>
        Sonoterapia Botánica · Valtara
    </div>

    <!-- Título principal -->
    <h2 style="
        font-family:var(--font-accent);
        font-size:clamp(2.6rem,5.5vw,5rem);
        line-height:1.05;
        color:var(--valtara-blanco);
        margin:0 0 1.6rem;
        animation: sono-fade-up .7s ease both;
        animation-delay:.2s;
    ">
        El sonido también<br>
        <span style="color:var(--valtara-cian-brillante);">sana el cuerpo</span>
    </h2>

    <!-- Subtítulo -->
    <p style="
        color:var(--valtara-gris-texto);
        font-size:clamp(1rem,2vw,1.22rem);
        line-height:1.95;
        max-width:720px;
        margin:0 auto 3rem;
        font-weight:300;
        letter-spacing:.015em;
        animation: sono-fade-up .7s ease both;
        animation-delay:.32s;
    ">
        La sonoterapia es la disciplina que utiliza frecuencias acústicas específicas para
        reducir la activación del sistema nervioso simpático, facilitar la recuperación muscular
        y profundizar los estados de descanso. No es música de fondo. Es una herramienta clínica
        con fundamento neurocientífico integrada en cada sesión de Valtara.
    </p>

    <!-- Tres pilares -->
    <div style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
        gap:1.2rem;
        margin-bottom:3.5rem;
        animation: sono-fade-up .7s ease both;
        animation-delay:.44s;
    ">

        <div style="
            padding:2rem 1.6rem;
            border-radius:24px;
            background:rgba(0,255,224,.04);
            border:1px solid rgba(0,255,224,.12);
            text-align:left;
        ">
            <i class="fa-solid fa-brain" style="font-size:1.6rem;color:var(--valtara-cian-brillante);margin-bottom:1rem;display:block;"></i>
            <strong style="color:var(--valtara-blanco);font-size:1.05rem;display:block;margin-bottom:.5rem;">
                Regulación neurológica
            </strong>
            <p style="color:var(--valtara-gris-texto);font-size:.92rem;line-height:1.8;margin:0;">
                Las frecuencias theta y alpha modulan la actividad cortical, reduciendo el estado de alerta sostenida y facilitando el paso al descanso profundo.
            </p>
        </div>

        <div style="
            padding:2rem 1.6rem;
            border-radius:24px;
            background:rgba(212,175,55,.04);
            border:1px solid rgba(212,175,55,.12);
            text-align:left;
        ">
            <i class="fa-solid fa-heart-pulse" style="font-size:1.6rem;color:var(--valtara-oro);margin-bottom:1rem;display:block;"></i>
            <strong style="color:var(--valtara-blanco);font-size:1.05rem;display:block;margin-bottom:.5rem;">
                Recuperación muscular
            </strong>
            <p style="color:var(--valtara-gris-texto);font-size:.92rem;line-height:1.8;margin:0;">
                La vibración acústica aplicada durante el masaje potencia la vasodilatación periférica y acelera la eliminación de metabolitos del tejido trabajado.
            </p>
        </div>

        <div style="
            padding:2rem 1.6rem;
            border-radius:24px;
            background:rgba(178,127,255,.04);
            border:1px solid rgba(178,127,255,.12);
            text-align:left;
        ">
            <i class="fa-solid fa-wind" style="font-size:1.6rem;color:#b27fff;margin-bottom:1rem;display:block;"></i>
            <strong style="color:var(--valtara-blanco);font-size:1.05rem;display:block;margin-bottom:.5rem;">
                Coherencia emocional
            </strong>
            <p style="color:var(--valtara-gris-texto);font-size:.92rem;line-height:1.8;margin:0;">
                El entorno sonoro diseñado por Valtara reduce los marcadores de cortisol y facilita la coherencia cardiaca, generando un estado de presencia plena y bienestar sostenido.
            </p>
        </div>

    </div>

    <!-- Cita final -->
    <p style="
        font-family:var(--font-accent);
        font-size:clamp(1.1rem,2.2vw,1.45rem);
        color:rgba(255,255,255,.55);
        font-style:italic;
        line-height:1.7;
        max-width:680px;
        margin:0 auto;
        animation: sono-fade-up .7s ease both;
        animation-delay:.55s;
    ">
        &ldquo; Cada pista fue compuesta o seleccionada con un propósito terapéutico preciso.
        Nada aquí es decorativo. &rdquo;
    </p>

</section>

`;
