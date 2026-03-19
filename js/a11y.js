/**
 * ====================================================================================
 * BLOQUE 6: MOTOR DE ACCESIBILIDAD (A11Y ENGINE - WCAG 2.2 AAA)
 * Controla contrastes, lectores de pantalla, tipografías disléxicas y atajos de teclado.
 * ====================================================================================
 */

const A11yEngine = {
    // Definimos el contenido del modal de accesibilidad para inyectarlo
    modalHTML: `
        <div class="modal-content">
            <header class="modal-header">
                <h3><i aria-hidden="true" class="fa-solid fa-eye"></i> Panel WCAG 2.2</h3>
                <button aria-label="Cerrar panel de accesibilidad" class="close-modal-btn" data-close="a11y-modal">
                    <i aria-hidden="true" class="fa-solid fa-xmark"></i>
                </button>
            </header>
            <div class="modal-body" style="display:flex; flex-direction:column; gap:1rem;">
                <p style="color: var(--valtara-gris-texto); margin-bottom: 1rem; font-size: 1.1rem;">
                    Ajuste la interfaz clínica según sus necesidades visuales o cognitivas.
                </p>
                <button aria-label="Activar o desactivar modo de alto contraste" class="btn-secondary" id="btn-high-contrast" style="justify-content: flex-start;">
                    <i aria-hidden="true" class="fa-solid fa-circle-half-stroke"></i> Alto Contraste (Ceguera al color)
                </button>
                <button aria-label="Activar o desactivar tipografía para dislexia" class="btn-secondary" id="btn-dyslexia" style="justify-content: flex-start;">
                    <i aria-hidden="true" class="fa-solid fa-font"></i> Tipografía para Dislexia
                </button>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button aria-label="Aumentar tamaño del texto" class="btn-secondary" id="btn-zoom-in" style="flex: 1;">
                        <i aria-hidden="true" class="fa-solid fa-magnifying-glass-plus"></i> Letra (+)
                    </button>
                    <button aria-label="Reducir tamaño del texto" class="btn-secondary" id="btn-zoom-out" style="flex: 1;">
                        <i aria-hidden="true" class="fa-solid fa-magnifying-glass-minus"></i> Letra (-)
                    </button>
                </div>
            </div>
        </div>
    `,

    baseFontSize: 16, // Tamaño base en pixeles

    init: function() {
        // 1. Inyectar el HTML en el Modal
        const modalContainer = document.getElementById('a11y-modal');
        if(modalContainer) {
            modalContainer.innerHTML = this.modalHTML;
        }

        // 2. Recuperar preferencias guardadas en LocalStorage
        this.loadPreferences();

        // 3. Asignar eventos a los botones recién inyectados
        this.bindEvents();
    },

    loadPreferences: function() {
        // Contraste
        if(localStorage.getItem('valtara_a11y_contrast') === 'true') {
            document.body.classList.add('high-contrast');
        }
        // Dislexia
        if(localStorage.getItem('valtara_a11y_dyslexia') === 'true') {
            document.body.classList.add('dyslexia-font');
        }
        // Tamaño de fuente
        const savedZoom = localStorage.getItem('valtara_a11y_zoom');
        if(savedZoom) {
            this.baseFontSize = parseInt(savedZoom);
            document.documentElement.style.fontSize = this.baseFontSize + 'px';
        }
    },

    bindEvents: function() {
        const btnHC = document.getElementById('btn-high-contrast');
        const btnDys = document.getElementById('btn-dyslexia');
        const btnZoomIn = document.getElementById('btn-zoom-in');
        const btnZoomOut = document.getElementById('btn-zoom-out');

        if(btnHC) {
            btnHC.addEventListener('click', () => {
                const isActive = document.body.classList.toggle('high-contrast');
                localStorage.setItem('valtara_a11y_contrast', isActive);
                this.announce(isActive ? "Modo de alto contraste activado." : "Modo de alto contraste desactivado.");
            });
        }

        if(btnDys) {
            btnDys.addEventListener('click', () => {
                const isActive = document.body.classList.toggle('dyslexia-font');
                localStorage.setItem('valtara_a11y_dyslexia', isActive);
                this.announce(isActive ? "Tipografía para dislexia activada." : "Tipografía estándar restaurada.");
            });
        }

        if(btnZoomIn) {
            btnZoomIn.addEventListener('click', () => this.adjustZoom(1));
        }

        if(btnZoomOut) {
            btnZoomOut.addEventListener('click', () => this.adjustZoom(-1));
        }
    },

    adjustZoom: function(step) {
        // Incrementamos o decrementamos en 2px
        this.baseFontSize += (step * 2);
        
        // Límites de seguridad para no romper la pantalla
        if (this.baseFontSize < 12) this.baseFontSize = 12;
        if (this.baseFontSize > 26) this.baseFontSize = 26;

        document.documentElement.style.fontSize = this.baseFontSize + 'px';
        localStorage.setItem('valtara_a11y_zoom', this.baseFontSize);
        
        this.announce(`Tamaño de fuente ajustado a ${this.baseFontSize} pixeles.`);
    },

    announce: function(message) {
        // Esta función inyecta texto en el div oculto que leen los lectores de pantalla
        const announcer = document.getElementById('a11y-announcer');
        if (announcer) {
            // Limpiamos y volvems a inyectar para forzar al lector a hablar de nuevo
            announcer.textContent = '';
            setTimeout(() => {
                announcer.textContent = message;
            }, 100);
        }
    }
};

// Iniciar Motor de Accesibilidad
document.addEventListener('DOMContentLoaded', () => A11yEngine.init());
