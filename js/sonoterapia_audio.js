window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.sonoterapia_audio = `
    <div style="text-align: center; max-width: 1200px; margin: 4rem auto 2rem auto;">
        <h3 style="color: var(--valtara-cian-brillante); font-family: var(--font-accent); font-size: 3rem; margin-bottom: 1rem;">
            II. Frecuencias Acústicas
        </h3>

        <p style="
            color: var(--valtara-gris-texto);
            font-size: 1.25rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
            text-transform: uppercase;
        ">
            Curaduría de Audio Botánico de Valtara
        </p>
    </div>

    <!-- REPRODUCTOR ORIGINAL -->
    <div class="glass-card reveal"
        style="
            padding: 4rem;
            max-width: 1000px;
            margin: 0 auto 5rem auto;
            border-color: var(--valtara-cian-brillante);
            background: rgba(0,0,0,0.7);
            box-shadow: 0 2rem 6rem rgba(0, 255, 255, 0.15);
        ">

        <div id="oasis-now-playing"
            style="
                text-align: center;
                color: var(--valtara-cian-brillante);
                font-size: 1.8rem;
                font-family: var(--font-accent);
                margin-bottom: 1rem;
                min-height: 2.5rem;
                letter-spacing: 1px;
            ">
            Selecciona una pista botánica para comenzar
        </div>

        <div id="oasis-next-track"
            style="
                text-align:center;
                color:#aaa;
                font-size:.9rem;
                margin-bottom:2rem;
                letter-spacing:.08rem;
            ">
            Próxima canción: —
        </div>

        <div class="canvas-audio-wrapper"
            style="
                margin-bottom: 2.5rem;
                border-radius: 1.5rem;
                overflow: hidden;
                border: 1px solid rgba(0,255,255,0.2);
                background:
                radial-gradient(circle,
                rgba(0,255,255,0.05) 0%,
                rgba(0,0,0,0.9) 100%);
            ">

            <canvas id="oasis-visualizer"
                aria-label="Visualizador de sonido"
                style="
                    height: 180px;
                    width: 100%;
                    display: block;
                ">
            </canvas>

        </div>

        <div class="oasis-player-controls"
            style="
                background: rgba(255,255,255,0.03);
                padding: 2.5rem;
                border-radius: 1.5rem;
                border: 1px solid rgba(0, 255, 255, 0.2);
                box-shadow: inset 0 0 2rem rgba(0,0,0,0.5);
            ">

            <div style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:1.5rem;
                margin-bottom:2.5rem;
                color:var(--valtara-gris-texto);
                font-size:1.2rem;
            ">

                <span id="oasis-time-current"
                    style="font-family:monospace;font-weight:bold;">
                    0:00
                </span>

                <input
                    type="range"
                    id="oasis-progress-bar"
                    value="0"
                    min="0"
                    max="100"
                    style="
                        flex:1;
                        accent-color:var(--valtara-cian-brillante);
                        cursor:pointer;
                        height:8px;
                        border-radius:4px;
                    "
                >

                <span id="oasis-time-total"
                    style="font-family:monospace;font-weight:bold;">
                    0:00
                </span>

            </div>

            <div style="
                display:flex;
                align-items:center;
                justify-content:center;
                gap:1rem;
                flex-wrap:wrap;
            ">

                <button
                    id="btn-prev-track"
                    class="carousel-btn">
                    <i class="fa-solid fa-backward-step"></i>
                </button>

                <button
                    class="master-play-btn"
                    id="btn-master-play"
                    aria-label="Reproducir o Pausar Audio"
                    style="
                        margin:0;
                        width:85px;
                        height:85px;
                        font-size:2.5rem;
                        flex-shrink:0;
                    ">

                    <i class="fa-solid fa-play"></i>

                </button>

                <button
                    id="btn-next-track"
                    class="carousel-btn">
                    <i class="fa-solid fa-forward-step"></i>
                </button>

            </div>

            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                gap:1rem;
                margin-top:2rem;
            ">

                <i class="fa-solid fa-volume-low"></i>

                <input
                    type="range"
                    id="oasis-volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value="0.7"
                    style="
                        width:140px;
                        accent-color:var(--valtara-oro);
                    "
                >

                <i class="fa-solid fa-volume-high"></i>

            </div>

        </div>

    </div>

    <!-- MICRODOSIS -->

    <div style="
        max-width:1200px;
        margin:0 auto 1.5rem auto;
        padding-left:2rem;
        border-left:5px solid var(--valtara-verde-menta);
    ">

        <h4 style="
            color:var(--valtara-verde-menta);
            font-size:2rem;
            font-family:var(--font-accent);
            margin:0;
        ">
            Micro-Dosis Botánicas
        </h4>

        <p style="color:#aaa;font-size:1.1rem;margin:0;">
            Frecuencias para reinicios cognitivos rápidos.
        </p>

    </div>

    <div class="carousel-master-container reveal"
        style="margin-bottom:5rem;">

        <div id="audio-carousel-short"
            class="horizontal-carousel">
        </div>

        <div class="carousel-navigation">

            <button
                aria-label="Ver audios anteriores"
                class="carousel-btn"
                onclick="window.ValtaraCarousels.scroll('audio-carousel-short', -1)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div class="carousel-indicator">
                Micro-Dosis
            </div>

            <button
                aria-label="Ver siguientes audios"
                class="carousel-btn"
                onclick="window.ValtaraCarousels.scroll('audio-carousel-short', 1)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>

        </div>

    </div>

    <!-- INMERSION -->

    <div style="
        max-width:1200px;
        margin:0 auto 1.5rem auto;
        padding-left:2rem;
        border-left:5px solid var(--valtara-morado-vivo);
    ">

        <h4 style="
            color:#E58CFF;
            font-size:2rem;
            font-family:var(--font-accent);
            margin:0;
        ">
            Inmersión Profunda
        </h4>

        <p style="color:#aaa;font-size:1.1rem;margin:0;">
            Catálogo Acústico Extendido para meditación profunda.
        </p>

    </div>

    <div class="carousel-master-container reveal"
        style="margin-bottom:5rem;">

        <div id="audio-carousel-long"
            class="horizontal-carousel">
        </div>

        <div class="carousel-navigation">

            <button
                aria-label="Ver audios anteriores"
                class="carousel-btn"
                onclick="window.ValtaraCarousels.scroll('audio-carousel-long', -1)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div class="carousel-indicator">
                Inmersión
            </div>

            <button
                aria-label="Ver siguientes audios"
                class="carousel-btn"
                onclick="window.ValtaraCarousels.scroll('audio-carousel-long', 1)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>

        </div>

    </div>

    <!-- RADIO -->

    <div style="
        max-width:1200px;
        margin:0 auto 1.5rem auto;
        padding-left:2rem;
        border-left:5px solid var(--valtara-oro);
    ">

        <h4 style="
            color:var(--valtara-oro);
            font-size:2rem;
            font-family:var(--font-accent);
            margin:0;
        ">
            Radio Valtara
        </h4>

        <p style="color:#aaa;font-size:1.1rem;margin:0;">
            Flujo continuo de composiciones inmersivas originales.
        </p>

    </div>

    <div class="carousel-master-container reveal"
        style="margin-bottom:6rem;">

        <div id="audio-carousel-radio"
            class="horizontal-carousel">
        </div>

        <div class="carousel-navigation">

            <button
                aria-label="Ver audios anteriores"
                class="carousel-btn"
                onclick="window.ValtaraCarousels.scroll('audio-carousel-radio', -1)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div class="carousel-indicator">
                Radio Valtara
            </div>

            <button
                aria-label="Ver siguientes audios"
                class="carousel-btn"
                onclick="window.ValtaraCarousels.scroll('audio-carousel-radio', 1)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>

        </div>

    </div>
`;



/* =========================================================
   SOLO EXPANSION DEL SISTEMA ORIGINAL
========================================================= */

window.ValtaraPlaylists = window.ValtaraPlaylists || {};

window.ValtaraPlaylists.radio = [

    "audio/nuestra_catedral.mp3",
    "audio/steam_from_the_porcelain.mp3",
    "audio/donde_el_alma_descansa.mp3",
    "audio/un_respiro_en_el_andar.mp3",
    "audio/un_puerto_donde_descansar.mp3",
    "audio/refugio_entre_ramas.mp3",
    "audio/donde_la_piedra_se_rinde.mp3",
    "audio/the_willow_and_the_stone.mp3",
    "audio/blue-inked_islands.mp3",
    "audio/the_slow_rotation_1.mp3",
    "audio/the_slow_rotation.mp3",
    "audio/where_pulse_and_pasture_meet.mp3",
    "audio/midnight_architecture.mp3",
    "audio/cristal_y_sal.mp3",
    "audio/the_quiet_pulse.mp3"

];
