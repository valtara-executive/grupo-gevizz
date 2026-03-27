window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraModulos.legal_transparencia = `
        <article class="glass-card reveal" style="border-color: #4361EE; grid-column: 1 / -1; padding: 4rem; text-align: center;">
            <h3 style="color: #4361EE; font-size: 2.5rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-scale-balanced"></i> Portal de Legalidad y Transparencia Corporativa</h3>
            <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; margin-bottom: 3rem;">La claridad es nuestro estándar de lujo. Toda nuestra operación clínica y digital está rigurosamente protegida y administrada por nuestra entidad legal corporativa. Consulta nuestra documentación haciendo clic en los botones.</p>
            
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem;">
                <button onclick="document.getElementById('modal-terminos').showModal()" class="btn-agenda-ahora" style="width: auto; background: transparent; border: 2px solid #4361EE; color: #4361EE;">
                    <i class="fa-solid fa-file-contract"></i> Términos y Privacidad (LFPDPPP)
                </button>
                <button onclick="document.getElementById('modal-whitepaper').showModal()" class="btn-agenda-ahora" style="width: auto; background: transparent; border: 2px solid var(--valtara-oro); color: var(--valtara-oro);">
                    <i class="fa-solid fa-network-wired"></i> Arquitectura AURA AI (Whitepaper)
                </button>
                <a href="https://drive.google.com/file/d/1W-L8tP43S12ce_t9zmr5eWw6LFVrCwQm/view?usp=drivesdk" target="_blank" class="btn-agenda-ahora" style="width: auto; background: transparent; border: 2px solid var(--valtara-cian-brillante); color: var(--valtara-cian-brillante);">
                    <i class="fa-solid fa-file-pdf"></i> Presentación Ejecutiva AI (PDF)
                </a>
            </div>
        </article>
`;
