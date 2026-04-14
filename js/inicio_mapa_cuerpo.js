window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraModulos.inicio_mapa_cuerpo = `
    <div class="body-map-container reveal" style="margin-top: 4rem; background: var(--cristal-fondo); border: 1px solid rgba(0, 255, 255, 0.15); border-radius: 2.5rem; padding: 4rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 4rem; backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); box-shadow: 0 2rem 6rem rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.1);">
        
        <div style="display: flex; flex-direction: column; justify-content: center;">
            <div style="display: inline-flex; align-items: center; gap: 15px; margin-bottom: 1.5rem;">
                <span style="background: rgba(0, 255, 255, 0.05); border: 1px solid rgba(0,255,255,0.2); padding: 12px; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                    <i class="fa-solid fa-microscope" style="color: var(--valtara-cian-brillante); font-size: 2rem;"></i>
                </span>
                <h3 style="font-family: var(--font-accent); color: var(--valtara-blanco); font-size: 2.8rem; margin: 0; letter-spacing: 1px;">Triaje Clínico</h3>
            </div>
            
            <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; margin-bottom: 3rem; line-height: 1.9; font-weight: 300;">Selecciona la región anatómica donde somatizas el estrés. Nuestro sistema decodificará la raíz de tu dolor mediante principios de neurobiología y biomecánica pura.</p>
            
            <div class="body-zones" style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
                <button class="zone-btn a11y-card-btn" data-zone="craneo" style="padding: 1.5rem; justify-content: flex-start; background: rgba(0,0,0,0.4); border-color: rgba(0,255,255,0.15);">
                    <i class="fa-solid fa-head-side-virus" style="color: var(--valtara-cian-brillante); font-size: 2rem;"></i> <span style="font-size: 1.2rem;">Cráneo y Mandíbula</span>
                </button>
                <button class="zone-btn a11y-card-btn" data-zone="cervical" style="padding: 1.5rem; justify-content: flex-start; background: rgba(0,0,0,0.4); border-color: rgba(0,255,255,0.15);">
                    <i class="fa-solid fa-user-injured" style="color: var(--valtara-cian-brillante); font-size: 2rem;"></i> <span style="font-size: 1.2rem;">Cervicales y Trapecios</span>
                </button>
                <button class="zone-btn a11y-card-btn" data-zone="lumbar" style="padding: 1.5rem; justify-content: flex-start; background: rgba(0,0,0,0.4); border-color: rgba(0,255,255,0.15);">
                    <i class="fa-solid fa-child" style="color: var(--valtara-cian-brillante); font-size: 2rem;"></i> <span style="font-size: 1.2rem;">Lumbar y Ciática</span>
                </button>
                <button class="zone-btn a11y-card-btn" data-zone="linfa" style="padding: 1.5rem; justify-content: flex-start; background: rgba(0,0,0,0.4); border-color: rgba(0,255,255,0.15);">
                    <i class="fa-solid fa-shoe-prints" style="color: var(--valtara-cian-brillante); font-size: 2rem;"></i> <span style="font-size: 1.2rem;">Linfa y Circulación</span>
                </button>
            </div>
        </div>

        <div class="zone-info" id="zone-display" aria-live="polite" style="background: linear-gradient(135deg, rgba(0,255,255,0.05), rgba(0,0,0,0.8)); padding: 4rem 3rem; border-radius: 2rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; border: 1px solid rgba(0,255,255,0.1); box-shadow: inset 0 0 3rem rgba(0,0,0,0.5);">
            <i class="fa-solid fa-fingerprint" style="font-size: 6rem; color: var(--valtara-cian-brillante); margin-bottom: 2rem; opacity: 0.7; animation: pulseAuraGold 3s infinite alternate;"></i>
            <h4 style="font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);">Esperando Diagnóstico</h4>
            <p style="color: var(--valtara-gris-texto); line-height: 1.8; font-size: 1.2rem; font-weight: 300;">El mapa interactivo está listo. Toca una de las regiones anatómicas a tu izquierda para iniciar el análisis profundo.</p>
        </div>

    </div>
`;
