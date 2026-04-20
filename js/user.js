/**
 * ====================================================================================
 * BLOQUE 7: USER ENGINE V43.0 (IDENTIDAD SOBERANA & SINCRONIZACIÓN TOTAL)
 * ------------------------------------------------------------------------------------
 * Gestión de Perfil, Onboarding y Bóveda del Paciente.
 * Adaptado estrictamente al index.html V62 para evitar conflictos de renderizado.
 * ====================================================================================
 */

const UserEngine = {
    // 1. MATRIZ DE DATOS (Estado inicial)
    userData: {
        name: 'Invitado VIP',
        isRegistered: false,
        aromaPreferences: [], // Array para múltiples selecciones
        lastVisit: null
    },

    // 2. INICIALIZACIÓN
    init: function() {
        console.log("🛡️ [USER ENGINE] Sincronizando identidad con el Santuario...");
        
        this.loadProfile();
        this.checkOnboarding();
        this.bindEvents();
        this.updateUI();
        this.initAromatherapy();
        this.integrateWithAura();
    },

    // 3. CARGA DE MEMORIA (LocalStorage)
    loadProfile: function() {
        const stored = localStorage.getItem('valtara_sovereign_profile');
        if (stored) {
            try {
                this.userData = JSON.parse(stored);
            } catch (e) {
                console.error("Error al decodificar perfil:", e);
            }
        }
    },

    // 4. CONTROL DE ACCESO (Onboarding)
    checkOnboarding: function() {
        const onboarding = document.getElementById('onboarding-screen');
        if (!onboarding) return;

        if (this.userData.isRegistered) {
            onboarding.classList.add('fade-out');
            setTimeout(() => onboarding.style.display = 'none', 800);
        }
    },

    // 5. GESTIÓN DE EVENTOS
    bindEvents: function() {
        const nameInput = document.getElementById('welcome-name-input');
        const startBtn = document.getElementById('welcome-start-btn');
        const skipBtn = document.getElementById('welcome-skip-btn');

        // Validar input para habilitar botón de entrada
        if (nameInput && startBtn) {
            nameInput.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                if (val.length >= 2) {
                    startBtn.style.pointerEvents = 'auto';
                    startBtn.style.background = 'var(--valtara-oro-brillante)';
                    startBtn.style.color = '#000';
                    startBtn.style.opacity = '1';
                    startBtn.setAttribute('aria-disabled', 'false');
                } else {
                    startBtn.style.pointerEvents = 'none';
                    startBtn.style.background = 'rgba(255,255,255,0.05)';
                    startBtn.style.color = '#666';
                    startBtn.setAttribute('aria-disabled', 'true');
                }
            });

            startBtn.addEventListener('click', () => this.saveProfile(nameInput.value));
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.skipOnboarding());
        }
    },

    // 6. ACTUALIZACIÓN VISUAL DE LA INTERFAZ
    updateUI: function() {
        // Actualizar nombre en el Menú Lateral
        const menuName = document.getElementById('menu-user-name');
        if (menuName) menuName.textContent = this.userData.name;

        // Actualizar nombre en la Bóveda del Paciente
        const vaultName = document.getElementById('vault-user-name');
        if (vaultName) vaultName.textContent = this.userData.name;
    },

    // 7. LÓGICA DE LA BÓVEDA (Aromaterapia)
    initAromatherapy: function() {
        const aromaCheckboxes = document.querySelectorAll('input[name="aroma_pref"]');
        
        aromaCheckboxes.forEach(cb => {
            // Marcar los que ya estaban guardados
            if (this.userData.aromaPreferences.includes(cb.value)) {
                cb.checked = true;
            }

            cb.addEventListener('change', () => {
                const selected = Array.from(document.querySelectorAll('input[name="aroma_pref"]:checked'))
                                     .map(c => c.value);
                this.userData.aromaPreferences = selected;
                this.saveToDisk();
                this.integrateWithAura();
            });
        });
    },

    // 8. PERSISTENCIA Y CIERRE DE ONBOARDING
    saveProfile: function(name) {
        this.userData.name = name || 'Paciente';
        this.userData.isRegistered = true;
        this.userData.lastVisit = new Date().toISOString();
        this.saveToDisk();
        this.updateUI();
        this.checkOnboarding();
        this.integrateWithAura();
    },

    skipOnboarding: function() {
        this.userData.name = 'Invitado VIP';
        this.userData.isRegistered = true;
        this.saveToDisk();
        this.updateUI();
        this.checkOnboarding();
    },

    saveToDisk: function() {
        localStorage.setItem('valtara_sovereign_profile', JSON.stringify(this.userData));
    },

    // 9. CONEXIÓN CON AURA AI
    integrateWithAura: function() {
        if (window.AuraEngine && typeof window.AuraEngine.updatePatientContext === 'function') {
            window.AuraEngine.updatePatientContext({
                nombre: this.userData.name,
                aromas: this.userData.aromaPreferences
            });
        }
        // Compartir globalmente para otros módulos
        window.ValtaraPatientContext = this.userData;
    }
};

// Arrancar motor
document.addEventListener('DOMContentLoaded', () => {
    UserEngine.init();
});
