/**
 * ====================================================================================
 * MÓDULO: SONOTERAPIA AUDIO (V46 — Playlists completas + radio real)
 * ====================================================================================
 *
 * Este archivo hace SOLO dos cosas:
 *   1. Define window.ValtaraPlaylists con las tres listas reales de pistas.
 *   2. Define window.ValtaraModulos.sonoterapia_audio con el HTML del bloque.
 *
 * El motor de reproducción vive enteramente en oasis.js (OasisEngine V26).
 * NO hay ningún segundo motor aquí. Sin conflictos, sin doble-binding.
 *
 * Arquitectura de reproducción (implementada en oasis.js):
 *   - Cada sección (short / long / radio) es una cola independiente.
 *   - Al terminar una pista avanza automáticamente a la siguiente
 *     dentro de la misma cola, en bucle infinito.
 *   - Cambio de pista (manual o automático) dispara crossfade:
 *     la pista actual baja a 0 en 1.2 s, la nueva sube al volumen
 *     deseado en 1.2 s de forma simultánea y sin corte.
 *   - prev / next respetan la cola activa.
 *
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

/* ─────────────────────────────────────────────────────────────────────────────
   FUENTE DE DATOS — leída por OasisEngine (oasis.js)
   ───────────────────────────────────────────────────────────────────────────── */
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
    ],

    radio: [
        { id: 'r1',  title: 'Nuestra Catedral',             src: 'audio/nuestra_catedral.mp3',               icon: 'fa-tower-broadcast' },
        { id: 'r2',  title: 'Steam from the Porcelain',     src: 'audio/steam_from_the_porcelain.mp3',       icon: 'fa-tower-broadcast' },
        { id: 'r3',  title: 'Donde el Alma Descansa',       src: 'audio/donde_el_alma_descansa.mp3',         icon: 'fa-tower-broadcast' },
        { id: 'r4',  title: 'Un Respiro en el Andar',       src: 'audio/un_respiro_en_el_andar.mp3',         icon: 'fa-tower-broadcast' },
        { id: 'r5',  title: 'Un Puerto Donde Descansar',    src: 'audio/un_puerto_donde_descansar.mp3',      icon: 'fa-tower-broadcast' },
        { id: 'r6',  title: 'Refugio entre Ramas',          src: 'audio/refugio_entre_ramas.mp3',            icon: 'fa-tower-broadcast' },
        { id: 'r7',  title: 'Donde la Piedra se Rinde',     src: 'audio/donde_la_piedra_se_rinde.mp3',       icon: 'fa-tower-broadcast' },
        { id: 'r8',  title: 'The Willow and the Stone',     src: 'audio/the_willow_and_the_stone.mp3',       icon: 'fa-tower-broadcast' },
        { id: 'r9',  title: 'Blue-Inked Islands',           src: 'audio/blue-inked_islands.mp3',             icon: 'fa-tower-broadcast' },
        { id: 'r10', title: 'The Slow Rotation',            src: 'audio/the_slow_rotation.mp3',              icon: 'fa-tower-broadcast' },
        { id: 'r11', title: 'The Slow Rotation (Extended)', src: 'audio/the_slow_rotation (1).mp3',          icon: 'fa-tower-broadcast' },
        { id: 'r12', title: 'Where Pulse and Pasture Meet', src: 'audio/where_pulse_and_pasture_meet.mp3',   icon: 'fa-tower-broadcast' },
        { id: 'r13', title: 'Midnight Architecture',        src: 'audio/midnight_architecture.mp3',          icon: 'fa-tower-broadcast' },
        { id: 'r14', title: 'Cristal y Sal',                src: 'audio/cristal_y_sal.mp3',                  icon: 'fa-tower-broadcast' },
        { id: 'r15', title: 'The Quiet Pulse',              src: 'audio/the_quiet_pulse.mp3',                icon: 'fa-tower-broadcast' }
    ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   HTML DEL MÓDULO
   ───────────────────────────────────────────────────────────────────────────── */
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
<div class="carousel-master-container reveal" style="margin-bottom:6rem;">
    <div id="audio-carousel-radio" class="horizontal-carousel"></div>
</div>

`;
