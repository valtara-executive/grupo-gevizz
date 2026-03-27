window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraModulos.inicio_mapa_cuerpo = `
    <div class="body-map-container reveal" style="margin-top: 2rem; background: rgba(0,0,0,0.6); border: 2px solid rgba(0, 255, 255, 0.2); border-radius: 2rem; padding: 4rem 3rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 4rem; backdrop-filter: blur(20px); box-shadow: 0 2rem 5rem rgba(0,0,0,0.8);">
        <div>
            <h3 style="font-family: var(--font-accent); color: var(--valtara-cian-brillante); font-size: 3rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-microscope"></i> Triaje Educativo</h3>
            <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; margin-bottom: 3rem; line-height: 1.8;">Haz clic en la zona principal donde sientes estrés. Te educaremos sobre lo que ocurre dentro de tu cuerpo desplegando información profunda y detallada.</p>
            <div class="body-zones" style="display: flex; flex-direction: column; gap: 1.5rem;">
                <button class="zone-btn a11y-card-btn" data-zone="craneo" style="border: 2px solid var(--valtara-cian-brillante);"><i class="fa-solid fa-head-side-virus" style="color: var(--valtara-cian-brillante); font-size: 2.5rem;"></i> <span style="font-size: 1.3rem;">Dolor de Cabeza y Mandíbula</span></button>
                <button class="zone-btn a11y-card-btn" data-zone="cervical" style="border: 2px solid var(--valtara-cian-brillante);"><i class="fa-solid fa-user-injured" style="color: var(--valtara-cian-brillante); font-size: 2.5rem;"></i> <span style="font-size: 1.3rem;">Cuello, Nuca y Hombros</span></button>
                <button class="zone-btn a11y-card-btn" data-zone="lumbar" style="border: 2px solid var(--valtara-cian-brillante);"><i class="fa-solid fa-child" style="color: var(--valtara-cian-brillante); font-size: 2.5rem;"></i> <span style="font-size: 1.3rem;">Cintura y Dolor de Ciática</span></button>
                <button class="zone-btn a11y-card-btn" data-zone="linfa" style="border: 2px solid var(--valtara-cian-brillante);"><i class="fa-solid fa-shoe-prints" style="color: var(--valtara-cian-brillante); font-size: 2.5rem;"></i> <span style="font-size: 1.3rem;">Pesadez en las Piernas</span></button>
            </div>
        </div>
        <div class="zone-info" id="zone-display" aria-live="polite" style="background: rgba(0,0,0,0.8); padding: 4rem 3rem; border-radius: 1.5rem; display: flex; flex-direction: column; justify-content: center; border-left: 5px solid var(--valtara-cian-brillante);">
            <i class="fa-solid fa-hand-holding-medical" style="font-size: 6rem; color: var(--valtara-cian-brillante); margin-bottom: 2rem; opacity: 0.5;"></i>
            <h4 style="font-size: 2.5rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);">Tu diagnóstico aparecerá aquí</h4>
            <p style="color: var(--valtara-gris-texto); line-height: 1.8; font-size: 1.25rem; font-weight: 300;">Selecciona una zona a tu izquierda para entender la ciencia detrás de tu dolor.</p>
        </div>
    </div>
`;
