window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraPlaylists = {

    short: [
        { id: 's1', title: 'Reseteo Alfa I',    src: 'audio/1.mp3', icon: 'fa-leaf' },
        { id: 's2', title: 'Reseteo Alfa II',   src: 'audio/2.mp3', icon: 'fa-leaf' },
        { id: 's3', title: 'Reseteo Alfa III',  src: 'audio/3.mp3', icon: 'fa-leaf' },
        { id: 's4', title: 'Reseteo Alfa IV',   src: 'audio/4.mp3', icon: 'fa-leaf' },
        { id: 's5', title: 'Reseteo Alfa V',    src: 'audio/5.mp3', icon: 'fa-leaf' },
        { id: 's6', title: 'Reseteo Alfa VI',   src: 'audio/6.mp3', icon: 'fa-leaf' },
        { id: 's7', title: 'Reseteo Alfa VII',  src: 'audio/7.mp3', icon: 'fa-leaf' },
        { id: 's8', title: 'Reseteo Alfa VIII', src: 'audio/8.mp3', icon: 'fa-leaf' },
        { id: 's9', title: 'Reseteo Alfa IX',   src: 'audio/9.mp3', icon: 'fa-leaf' }
    ],

    long: [
        { id: 'l1',  title: 'Beneath a Darkened Tide',   src: 'audio/beneath_a_darkened_tide.mp3',   icon: 'fa-water'     },
        { id: 'l2',  title: 'Dissolving the Indigo',     src: 'audio/dissolving_the_indigo.mp3',     icon: 'fa-droplet'   },
        { id: 'l3',  title: 'El Umbral de Cristal',      src: 'audio/el_umbral_de_cristal.mp3',      icon: 'fa-cube'      },
        { id: 'l4',  title: 'Flujo de Sal y de Piel',    src: 'audio/flujo_de_sal_y_de_piel.mp3',    icon: 'fa-wind'      },
        { id: 'l5',  title: 'Gilded Canopy',             src: 'audio/gilded_canopy.mp3',             icon: 'fa-sailboat'  },
        { id: 'l6',  title: 'La Geometría del Silencio', src: 'audio/la_geometr_a_del_silencio.mp3', icon: 'fa-shapes'    },
        { id: 'l7',  title: 'Manto Sin Orillas',         src: 'audio/manto_sin_orillas.mp3',         icon: 'fa-cloud'     },
        { id: 'l8',  title: 'Marea de Terciopelo',       src: 'audio/marea_de_terciopelo.mp3',       icon: 'fa-water'     },
        { id: 'l9',  title: 'Piedra y Sal',              src: 'audio/piedra_y_sal.mp3',              icon: 'fa-gem'       },
        { id: 'l10', title: 'Sombra Divina',             src: 'audio/sombra_divina.mp3',             icon: 'fa-moon'      },
        { id: 'l11', title: 'Marea bajo el Crepúsculo',  src: 'audio/tide_beneath_the_twilight.mp3', icon: 'fa-sun'       },
        { id: 'l12', title: 'Un Hilo de Oro',            src: 'audio/un_hilo_de_oro.mp3',            icon: 'fa-ring'      },
        { id: 'l13', title: 'Bajo el Vidrio',            src: 'audio/bajo_el_vidrio.mp3',            icon: 'fa-snowflake' },
        { id: 'l14', title: 'Bajo el Vidrio (Extended)', src: 'audio/bajo_el_vidrio (1).mp3',        icon: 'fa-icicles'   }
    ]
};

window.ValtaraModulos.sonoterapia_audio = `

<div style="text-align:center;max-width:1200px;margin:4rem auto 2rem auto;">
    <h3 style="
        color:var(--valtara-cian-brillante);
        font-family:var(--font-accent);
        font-size:3rem;
        margin-bottom:1rem;
    ">
        II. Frecuencias Acústicas
    </h3>
    <p style="
        color:var(--valtara-gris-texto);
        font-size:1.25rem;
        font-weight:300;
        letter-spacing:.1rem;
        text-transform:uppercase;
    ">
        Curaduría de Audio Botánico de Valtara
    </p>
</div>

<div class="glass-card reveal" style="
    padding:4rem;
    max-width:1000px;
    margin:0 auto 5rem auto;
    border-color:var(--valtara-cian-brillante);
    background:rgba(0,0,0,.72);
    box-shadow:0 2rem 6rem rgba(0,255,255,.15);
">

    <div id="oasis-now-playing" style="
        text-align:center;
        color:var(--valtara-cian-brillante);
        font-size:1.8rem;
        font-family:var(--font-accent);
        margin-bottom:1rem;
        min-height:2.5rem;
        letter-spacing:1px;
    ">
        Selecciona una pista botánica para comenzar
    </div>

    <div id="oasis-next-track" style="
        text-align:center;
        color:rgba(255,255,255,.55);
        font-size:.95rem;
        margin-bottom:2rem;
    ">
        Radio inmersiva Valtara lista
    </div>

    <div class="canvas-audio-wrapper" style="
        margin-bottom:2.5rem;
        border-radius:1.5rem;
        overflow:hidden;
        border:1px solid rgba(0,255,255,.2);
        background:radial-gradient(circle, rgba(0,255,255,.05) 0%, rgba(0,0,0,.9) 100%);
    ">
        <canvas id="oasis-visualizer" style="height:180px;width:100%;display:block;"></canvas>
    </div>

    <div class="oasis-player-controls" style="
        background:rgba(255,255,255,.03);
        padding:2.5rem;
        border-radius:1.5rem;
        border:1px solid rgba(0,255,255,.2);
    ">
        <div style="
            display:flex;align-items:center;
            justify-content:space-between;
            gap:1.5rem;margin-bottom:2.5rem;
            color:var(--valtara-gris-texto);
        ">
            <span id="oasis-time-current">0:00</span>
            <input type="range" id="oasis-progress-bar"
                value="0" min="0" max="100"
                style="flex:1;accent-color:var(--valtara-cian-brillante);">
            <span id="oasis-time-total">0:00</span>
        </div>

        <div style="
            display:flex;align-items:center;
            justify-content:center;gap:2rem;flex-wrap:wrap;
        ">
            <button id="btn-prev-track"
                style="background:none;border:none;color:white;font-size:1.8rem;cursor:pointer;"
                aria-label="Pista anterior">
                <i class="fa-solid fa-backward-step"></i>
            </button>

            <button id="btn-master-play" style="
                width:85px;height:85px;border-radius:50%;
                border:1px solid rgba(255,255,255,.15);
                background:rgba(255,255,255,.04);
                color:white;font-size:2.2rem;cursor:pointer;
            " aria-label="Reproducir / Pausar">
                <i class="fa-solid fa-play"></i>
            </button>

            <button id="btn-next-track"
                style="background:none;border:none;color:white;font-size:1.8rem;cursor:pointer;"
                aria-label="Siguiente pista">
                <i class="fa-solid fa-forward-step"></i>
            </button>

            <div style="display:flex;align-items:center;gap:1rem;margin-left:1rem;">
                <i class="fa-solid fa-volume-low" style="color:var(--valtara-gris-texto);"></i>
                <input type="range" id="oasis-volume-slider"
                    min="0" max="1" step="0.01" value="0.7"
                    aria-label="Volumen"
                    style="width:120px;accent-color:var(--valtara-oro);">
                <i class="fa-solid fa-volume-high" style="color:var(--valtara-gris-texto);"></i>
            </div>
        </div>
    </div>
</div>

<!-- SECCIÓN 1: MICRO-DOSIS -->
<div style="max-width:1200px;margin:0 auto 1.5rem auto;padding-left:2rem;border-left:5px solid var(--valtara-verde-menta);">
    <h4 style="color:var(--valtara-verde-menta);font-size:2rem;font-family:var(--font-accent);margin:0;">
        Micro-Dosis Botánicas
    </h4>
</div>
<div class="carousel-master-container reveal" style="margin-bottom:5rem;">
    <div id="audio-carousel-short" class="horizontal-carousel"></div>
</div>

<!-- SECCIÓN 2: INMERSIÓN PROFUNDA -->
<div style="max-width:1200px;margin:0 auto 1.5rem auto;padding-left:2rem;border-left:5px solid #E58CFF;">
    <h4 style="color:#E58CFF;font-size:2rem;font-family:var(--font-accent);margin:0;">
        Inmersión Profunda
    </h4>
</div>
<div class="carousel-master-container reveal" style="margin-bottom:5rem;">
    <div id="audio-carousel-long" class="horizontal-carousel"></div>
</div>

<!-- SECCIÓN 3: VALTARA RADIO -->
<div style="max-width:1200px;margin:0 auto 1.5rem auto;padding-left:2rem;border-left:5px solid var(--valtara-oro);">
    <h4 style="color:var(--valtara-oro);font-size:2rem;font-family:var(--font-accent);margin:0;">
        Valtara Radio
    </h4>
</div>

<div class="reveal" style="max-width:1200px;margin:0 auto 6rem auto;padding:0 1rem;">

    <style>
        @media (max-width:760px) {
            .valtara-radio-grid { grid-template-columns:1fr !important; }
            .valtara-radio-video { padding-bottom:100% !important; }
        }
    </style>

    <!-- Reproductor + info lateral -->
    <div class="valtara-radio-grid" style="
        background:rgba(0,0,0,.72);
        border:1px solid rgba(212,175,55,.25);
        border-radius:28px 28px 0 0;
        overflow:hidden;
        display:grid;
        grid-template-columns:1fr 1fr;
        min-height:480px;
    ">
        <div class="valtara-radio-video" style="
            position:relative;width:100%;
            padding-bottom:100%;background:#000;
        ">
            <iframe
                src="https://www.youtube.com/embed/AioVZKTOLAI?rel=0&modestbranding=1&color=white"
                title="Valtara Sessions Vol. 1"
                style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        </div>

        <div style="
            padding:3rem 2.5rem;
            display:flex;flex-direction:column;
            justify-content:center;gap:1.5rem;
        ">
            <div style="
                display:inline-flex;align-items:center;gap:.5rem;
                padding:.35rem .85rem;border-radius:999px;
                background:rgba(212,175,55,.08);
                border:1px solid rgba(212,175,55,.2);
                color:var(--valtara-oro);
                font-size:.75rem;letter-spacing:.18em;text-transform:uppercase;
                align-self:flex-start;
            ">
                <i class="fa-brands fa-youtube"></i>&nbsp;Valtara Sessions Vol. 1
            </div>

            <h3 style="
                color:var(--valtara-blanco);
                font-family:var(--font-accent);
                font-size:clamp(1.3rem,2vw,1.9rem);
                line-height:1.2;margin:0;
            ">
                Música Ambiental para Relajación, Enfoque y Bienestar Profundo
            </h3>

            <p style="color:var(--valtara-gris-texto);line-height:1.85;font-size:.95rem;margin:0;">
                Una experiencia sonora diseñada meticulosamente para armonizar tus espacios, reducir el estrés diario y potenciar tus momentos de enfoque, meditación o descanso profundo.
            </p>
        </div>
    </div>

    <!-- Bloque inferior -->
    <div style="
        background:rgba(0,0,0,.68);
        border:1px solid rgba(212,175,55,.18);
        border-top:none;
        border-radius:0 0 28px 28px;
        padding:3rem 3.5rem 3.5rem;
        box-shadow:0 2rem 6rem rgba(212,175,55,.10);
    ">

        <p style="
            color:rgba(255,255,255,.82);
            font-size:1.05rem;line-height:2;
            font-weight:300;letter-spacing:.02em;
            max-width:860px;margin:0 auto 2.5rem;
            text-align:center;
        ">
            Bienvenido a <span style="color:var(--valtara-oro);font-weight:600;">Valtara Sessions</span>.
            Cada frecuencia aquí ha sido elegida para guiar tu sistema nervioso hacia un estado de
            calma activa — ese punto donde el pensamiento se despeja, el cuerpo se suelta y el tiempo
            deja de pesar. Encuentra un espacio cómodo, respira profundo y permite que estas
            frecuencias hagan el resto.
        </p>

        <div style="
            width:60px;height:1px;
            background:linear-gradient(90deg,transparent,rgba(212,175,55,.5),transparent);
            margin:0 auto 2.5rem;
        "></div>

        <p style="
            color:var(--valtara-oro);font-size:.75rem;
            letter-spacing:.22em;text-transform:uppercase;
            text-align:center;margin:0 0 1.5rem;
        ">
            Índice de pistas
        </p>

        <div style="
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
            gap:.55rem .5rem;
            max-width:860px;margin:0 auto 3rem;
        ">
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">00:00</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">Refugio entre Ramas</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">02:51</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">Donde la Piedra se Rinde</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">05:33</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">Un Puerto Donde Descansar</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">08:20</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">The Willow and the Stone</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">11:01</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">Blue-Inked Islands</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">13:49</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">Midnight Architecture</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">16:16</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">The Slow Rotation</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">18:55</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">Where Pulse and Pasture Meet</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">24:19</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">Steam from the Porcelain</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">26:40</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">Unfolding the Crease</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">29:21</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">The Copper Line</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">31:48</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">Echoes of Ochre</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">34:54</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">El Rumor de la Marea</span></div>
            <div style="display:flex;gap:.75rem;align-items:baseline;"><span style="color:var(--valtara-oro);font-size:.8rem;min-width:3.2rem;font-weight:700;font-variant-numeric:tabular-nums;">38:07</span><span style="color:rgba(255,255,255,.75);font-size:.9rem;">Resuena el Viento</span></div>
        </div>

        <div style="
            width:60px;height:1px;
            background:linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent);
            margin:0 auto 2rem;
        "></div>

        <p style="
            text-align:center;
            color:rgba(255,255,255,.4);
            font-size:.88rem;letter-spacing:.06em;
            line-height:1.9;margin:0;
        ">
            Gracias por escuchar Valtara Radio.<br>
            <span style="color:rgba(212,175,55,.55);font-style:italic;">
                Próximamente nuevas estaciones.
            </span>
        </p>

    </div>
</div>

`;
