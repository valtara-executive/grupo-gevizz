const UserEngine = {
    userData: {
        name: 'Invitado VIP',
        isRegistered: false,
        aromaPreferences: [],
        lastVisit: null
    },

    init: function() {
        console.log("🛡️ [USER ENGINE] Sincronizando identidad...");
        this.loadProfile();
        this.checkOnboarding();
        this.bindEvents();
        this.updateUI();
        this.initAromatherapy();
        this.integrateWithAura();
    },

    loadProfile: function() {
        const stored = localStorage.getItem('valtara_sovereign_profile');
        if (stored) {
            try { this.userData = JSON.parse(stored); } catch (e) {}
        }
    },

    checkOnboarding: function() {
        const onboarding = document.getElementById('onboarding-modal');
        if (!onboarding) return;
        if (!this.userData.isRegistered) {
            // Mostrar el modal si no está registrado
            setTimeout(() => onboarding.showModal(), 1000);
        }
    },

    getGreeting: function() {
        const hour = new Date().getHours();
        if (hour < 12) return "Buenos días";
        if (hour < 19) return "Buenas tardes";
        return "Buenas noches";
    },

    bindEvents: function() {
        const nameInput = document.getElementById('welcome-name-input');
        const startBtn = document.getElementById('welcome-start-btn');
        const skipBtn = document.getElementById('welcome-skip-btn');

        if (nameInput && startBtn) {
            nameInput.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                if (val.length >= 2) {
                    startBtn.style.pointerEvents = 'auto';
                    startBtn.style.background = 'var(--valtara-oro)';
                    startBtn.style.color = '#000';
                } else {
                    startBtn.style.pointerEvents = 'none';
                    startBtn.style.background = 'rgba(255,255,255,0.05)';
                    startBtn.style.color = '#666';
                }
            });

            startBtn.addEventListener('click', () => {
                this.saveProfile(nameInput.value);
                document.getElementById('onboarding-modal').close();
                // Forzar actualización del texto dinámico del inicio
                if(window.ValtaraData) window.ValtaraData.renderAll(); 
            });
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                this.skipOnboarding();
                document.getElementById('onboarding-modal').close();
                if(window.ValtaraData) window.ValtaraData.renderAll();
            });
        }
    },

    updateUI: function() {
        const greeting = this.getGreeting();
        
        const menuName = document.getElementById('menu-user-name');
        const menuGreet = document.getElementById('menu-greeting');
        if (menuName) menuName.textContent = this.userData.name;
        if (menuGreet) menuGreet.textContent = greeting + ",";

        const vaultName = document.getElementById('vault-user-name');
        if (vaultName) vaultName.textContent = this.userData.name;
    },

    initAromatherapy: function() {
        const aromaCheckboxes = document.querySelectorAll('input[name="aroma_pref"]');
        aromaCheckboxes.forEach(cb => {
            if (this.userData.aromaPreferences.includes(cb.value)) cb.checked = true;
            cb.addEventListener('change', () => {
                const selected = Array.from(document.querySelectorAll('input[name="aroma_pref"]:checked')).map(c => c.value);
                this.userData.aromaPreferences = selected;
                this.saveToDisk();
                this.integrateWithAura();
            });
        });
    },

    saveProfile: function(name) {
        this.userData.name = name || 'Paciente';
        this.userData.isRegistered = true;
        this.userData.lastVisit = new Date().toISOString();
        this.saveToDisk();
        this.updateUI();
        this.integrateWithAura();
    },

    skipOnboarding: function() {
        this.userData.name = 'Invitado VIP';
        this.userData.isRegistered = true;
        this.saveToDisk();
        this.updateUI();
    },

    saveToDisk: function() {
        localStorage.setItem('valtara_sovereign_profile', JSON.stringify(this.userData));
    },

    integrateWithAura: function() {
        if (window.AuraEngine && typeof window.AuraEngine.updatePatientContext === 'function') {
            window.AuraEngine.updatePatientContext({
                nombre: this.userData.name,
                aromas: this.userData.aromaPreferences
            });
        }
        window.ValtaraPatientContext = this.userData;
    }
};

document.addEventListener('DOMContentLoaded', () => UserEngine.init());
