window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraModulos.sonoterapia_audio = `
    <div style="text-align: center; max-width: 1200px; margin: 4rem auto 2rem auto;">
        <h3 style="color: var(--valtara-cian-brillante); font-family: var(--font-accent); font-size: 3rem; margin-bottom: 1rem;">II. Frecuencias Acústicas</h3>
        <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; font-weight: 300; letter-spacing: 0.1rem; text-transform: uppercase;">Curaduría de Audio Botánico de Valtara</p>
    </div>
    
    <div class="glass-card reveal" style="padding: 4rem; max-width: 1000px; margin: 0 auto 5rem auto; border-color: var(--valtara-cian-brillante); background: rgba(0,0,0,0.7); box-shadow: 0 2rem 6rem rgba(0, 255, 255, 0.15);">
        
        <div id="oasis-now-playing" style="text-align: center; color: var(--valtara-cian-brillante); font-size: 1.8rem; font-family: var(--font-accent); margin-bottom: 2rem; min-height: 2.5rem; letter-spacing: 1px;">
            Selecciona una pista botánica para comenzar
        </div>

        <div class="canvas-audio-wrapper" style="margin-bottom: 2.5rem; border-radius: 1.5rem; overflow: hidden; border: 1px solid rgba(0,255,255,0.2); background: radial-gradient(circle, rgba(0,255,255,0.05) 0%, rgba(0,0,0,0.9) 100%);">
            <canvas id="oasis-visualizer" aria-label="Visualizador de sonido" style="height: 180px; width: 100%; display: block;"></canvas>
        </div>

        <div class="oasis-player-controls" style="background: rgba(255,255,255,0.03); padding: 2.5rem; border-radius: 1.5rem; border: 1px solid rgba(0, 255, 255, 0.2); box-shadow: inset 0 0 2rem rgba(0,0,0,0.5);">
            
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; margin-bottom: 2.5rem; color: var(--valtara-gris-texto); font-size: 1.2rem;">
                <span id="oasis-time-current" style="font-family: monospace; font-weight: bold;">0:00</span>
                <input type="range" id="oasis-progress-bar" value="0" min="0" max="100" style="flex: 1; accent-color: var(--valtara-cian-brillante); cursor: pointer; height: 8px; border-radius: 4px;">
                <span id="oasis-time-total" style="font-family: monospace; font-weight: bold;">0:00</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 1.2rem; color: var(--valtara-oro-suave); font-size: 1.4rem;">
                    <i class="fa-solid fa-volume-low"></i>
                    <input type="range" id="oasis-volume-slider" min="0" max="1" step="0.01" value="0.7" style="width: 120px; accent-color: var(--valtara-oro); cursor: pointer; height: 6px;">
                    <i class="fa-solid fa-volume-high"></i>
                </div>
                
                <button class="master-play-btn" id="btn-master-play" aria-label="Reproducir o Pausar Audio" style="margin: 0; width: 85px; height: 85px; font-size: 2.5rem; flex-shrink: 0;">
                    <i class="fa-solid fa-play"></i>
                </button>
            </div>
        </div>
    </div>

    <div style="max-width: 1200px; margin: 0 auto 1.5rem auto; padding-left: 2rem; border-left: 5px solid var(--valtara-verde-menta);">
        <h4 style="color: var(--valtara-verde-menta); font-size: 2rem; font-family: var(--font-accent); margin: 0;">Micro-Dosis Botánicas</h4>
        <p style="color: #aaa; font-size: 1.1rem; margin: 0;">Frecuencias para reinicios cognitivos rápidos.</p>
    </div>

    <div class="carousel-master-container reveal" style="margin-bottom: 5rem;">
        <div id="audio-carousel-short" class="horizontal-carousel">
            </div>
        <div class="carousel-navigation">
            <button aria-label="Ver audios anteriores" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-short', -1)"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="carousel-indicator" id="indicator-audio-short" aria-live="polite">Micro Dosis</div>
            <button aria-label="Ver siguientes audios" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-short', 1)"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    </div>

    <div style="max-width: 1200px; margin: 0 auto 1.5rem auto; padding-left: 2rem; border-left: 5px solid var(--valtara-morado-vivo);">
        <h4 style="color: #E58CFF; font-size: 2rem; font-family: var(--font-accent); margin: 0;">Inmersión Profunda</h4>
        <p style="color: #aaa; font-size: 1.1rem; margin: 0;">Catálogo Acústico Extendido para meditación profunda.</p>
    </div>

    <div class="carousel-master-container reveal" style="margin-bottom: 6rem;">
        <div id="audio-carousel-long" class="horizontal-carousel">
            
            <button class="track-btn carousel-card" data-src="audio/beneath_a_darkened_tide.mp3" data-title="Beneath a Darkened Tide">
                <i class="fa-solid fa-water"></i> <div style="display:flex; flex-direction:column; text-align:left;"><span style="color:var(--valtara-blanco); font-size:1.3rem;">Beneath a Darkened Tide</span><span style="color:#aaa; font-size:0.9rem; font-weight:300;">Oasis Engine</span></div>
            </button>

            <button class="track-btn carousel-card" data-src="audio/piedra_y_sal.mp3" data-title="Piedra y Sal">
                <i class="fa-solid fa-gem"></i> <div style="display:flex; flex-direction:column; text-align:left;"><span style="color:var(--valtara-blanco); font-size:1.3rem;">Piedra y Sal</span><span style="color:#aaa; font-size:0.9rem; font-weight:300;">Oasis Engine</span></div>
            </button>

            <button class="track-btn carousel-card" data-src="audio/flujo_de_sal_y_de_piel.mp3" data-title="Flujo de Sal y de Piel">
                <i class="fa-solid fa-wind"></i> <div style="display:flex; flex-direction:column; text-align:left;"><span style="color:var(--valtara-blanco); font-size:1.3rem;">Flujo de Sal y de Piel</span><span style="color:#aaa; font-size:0.9rem; font-weight:300;">Oasis Engine</span></div>
            </button>

            <button class="track-btn carousel-card" data-src="audio/dissolving_the_indigo.mp3" data-title="Dissolving the Indigo">
                <i class="fa-solid fa-droplet"></i> <div style="display:flex; flex-direction:column; text-align:left;"><span style="color:var(--valtara-blanco); font-size:1.3rem;">Dissolving the Indigo</span><span style="color:#aaa; font-size:0.9rem; font-weight:300;">Oasis Engine</span></div>
            </button>

            <button class="track-btn carousel-card" data-src="audio/el_umbral_de_cristal.mp3" data-title="El Umbral de Cristal">
                <i class="fa-solid fa-cube"></i> <div style="display:flex; flex-direction:column; text-align:left;"><span style="color:var(--valtara-blanco); font-size:1.3rem;">El Umbral de Cristal</span><span style="color:#aaa; font-size:0.9rem; font-weight:300;">Oasis Engine</span></div>
            </button>

            <button class="track-btn carousel-card" data-src="audio/sombra_divina.mp3" data-title="Sombra Divina">
                <i class="fa-solid fa-moon"></i> <div style="display:flex; flex-direction:column; text-align:left;"><span style="color:var(--valtara-blanco); font-size:1.3rem;">Sombra Divina</span><span style="color:#aaa; font-size:0.9rem; font-weight:300;">Oasis Engine</span></div>
            </button>

            <button class="track-btn carousel-card" data-src="audio/la_geometr_a_del_silencio.mp3" data-title="La Geometría del Silencio">
                <i class="fa-solid fa-shapes"></i> <div style="display:flex; flex-direction:column; text-align:left;"><span style="color:var(--valtara-blanco); font-size:1.3rem;">La Geometría del Silencio</span><span style="color:#aaa; font-size:0.9rem; font-weight:300;">Oasis Engine</span></div>
            </button>

            <button class="track-btn carousel-card" data-src="audio/bajo_el_vidrio.mp3" data-title="Bajo el Vidrio">
                <i class="fa-solid fa-snowflake"></i> <div style="display:flex; flex-direction:column; text-align:left;"><span style="color:var(--valtara-blanco); font-size:1.3rem;">Bajo el Vidrio</span><span style="color:#aaa; font-size:0.9rem; font-weight:300;">Oasis Engine</span></div>
            </button>

            <button class="track-btn carousel-card" data-src="audio/bajo_el_vidrio (1).mp3" data-title="Bajo el Vidrio (Versión Extendida)">
                <i class="fa-solid fa-icicles"></i> <div style="display:flex; flex-direction:column; text-align:left;"><span style="color:var(--valtara-blanco); font-size:1.3rem;">Bajo el Vidrio (Extended)</span><span style="color:#aaa; font-size:0.9rem; font-weight:300;">Oasis Engine</span></div>
            </button>

        </div>
        <div class="carousel-navigation">
            <button aria-label="Ver audios anteriores" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-long', -1)"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="carousel-indicator" id="indicator-audio-long" aria-live="polite">Inmersión</div>
            <button aria-label="Ver siguientes audios" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('audio-carousel-long', 1)"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    </div>
`;
