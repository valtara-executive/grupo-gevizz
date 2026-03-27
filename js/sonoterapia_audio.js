window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraModulos.sonoterapia_audio = `
    <h3 style="color: var(--valtara-cian-brillante); font-family: var(--font-accent); font-size: 2.8rem; margin-bottom: 3rem; text-align: center; border-bottom: 1px solid rgba(0, 255, 255, 0.3); padding-bottom: 1.5rem; max-width: 1200px; margin-left: auto; margin-right: auto;">II. Frecuencias Acústicas</h3>
    
    <div class="glass-card reveal" style="padding: 4rem; max-width: 1000px; margin: 0 auto 6rem auto; border-color: var(--valtara-cian-brillante); background: rgba(0,0,0,0.7);">
        
        <div id="oasis-now-playing" style="text-align: center; color: var(--valtara-cian-brillante); font-size: 1.5rem; font-family: var(--font-accent); margin-bottom: 2rem; min-height: 2rem; letter-spacing: 1px;">
            Selecciona una pista botánica para comenzar
        </div>

        <div class="canvas-audio-wrapper" style="margin-bottom: 2rem; border-radius: 1.5rem; overflow: hidden; border: 1px solid rgba(0,255,255,0.1);">
            <canvas id="oasis-visualizer" aria-label="Visualizador de sonido" style="height: 150px; width: 100%; display: block;"></canvas>
        </div>

        <div class="oasis-player-controls" style="background: rgba(255,255,255,0.03); padding: 2rem; border-radius: 1.5rem; margin-bottom: 3rem; border: 1px solid rgba(0, 255, 255, 0.2);">
            
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; margin-bottom: 2rem; color: var(--valtara-gris-texto); font-size: 1.1rem;">
                <span id="oasis-time-current" style="font-family: monospace;">0:00</span>
                <input type="range" id="oasis-progress-bar" value="0" min="0" max="100" style="flex: 1; accent-color: var(--valtara-cian-brillante); cursor: pointer; height: 6px;">
                <span id="oasis-time-total" style="font-family: monospace;">0:00</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: center; gap: 3rem;">
                <div style="display: flex; align-items: center; gap: 1rem; color: var(--valtara-oro-suave); font-size: 1.2rem;">
                    <i class="fa-solid fa-volume-low"></i>
                    <input type="range" id="oasis-volume-slider" min="0" max="1" step="0.01" value="0.7" style="width: 120px; accent-color: var(--valtara-oro); cursor: pointer;">
                    <i class="fa-solid fa-volume-high"></i>
                </div>
                
                <button class="master-play-btn" id="btn-master-play" aria-label="Reproducir o Pausar Audio" style="margin: 0; box-shadow: 0 4px 20px rgba(0,255,255,0.4); width: 70px; height: 70px; font-size: 1.8rem;">
                    <i class="fa-solid fa-play"></i>
                </button>
            </div>
        </div>

        <div class="audio-tracks-grid" id="audio-track-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            </div>
    </div>
`;
