/**
 * ====================================================================================
 * BLOQUE 8: USER ENGINE V10.3 (GESTOR DE IDENTIDAD)
 * Controla el Onboarding inmersivo, privacidad local (LFPDPPP) y perfil del paciente.
 * ====================================================================================
 */

const UserEngine = {
    userName: 'Apreciable visitante',
    
    init: function() {
        this.bindEvents();
        // Esperamos un segundo para que cargue la interfaz antes de decidir si mostrar el Onboarding
        setTimeout(() => { this.checkIdentity(); }, 500);
    },

    // ================================================================================
    // FLUJO DE ONBOARDING Y RECONOCIMIENTO
    // ================================================================================
    checkIdentity: function() {
        const savedName = localStorage.getItem('valtara_identity');
        const onboardingScreen = document.getElementById('onboarding-screen');
        
        if (savedName) {
            // Usuario recurrente: Quitar pantalla negra inmediatamente
            this.userName = savedName;
            if(onboardingScreen) onboardingScreen.classList.add('fade-out');
            
            this.updateUI();
            if(window.A11yEngine) A11yEngine.announce(`Bienvenido de nuevo, ${this.userName}. El santuario está listo.`);
        } else {
            // Usuario nuevo: La pantalla negra ya está visible por defecto, enfocamos el input
            if(onboardingScreen) {
                onboardingScreen.setAttribute('aria-hidden', 'false');
                const nameInput = document.getElementById('welcome-name-input');
                if(nameInput) nameInput.focus();
                if(window.A11yEngine) A11yEngine.announce("Pantalla de bienvenida. Por favor, introduzca su nombre para personalizar su expediente clínico.");
            }
        }
    },

    bindEvents: function() {
        // 1. Botones del Onboarding (Pantalla Negra)
        const startBtn = document.getElementById('welcome-start-btn');
        const skipBtn = document.getElementById('welcome-skip-btn');
        const welcomeInput = document.getElementById('welcome-name-input');
        
        if(startBtn && welcomeInput) {
            startBtn.addEventListener('click', () => {
                const val = welcomeInput.value.trim();
                if(val) this.saveAndEnter(val);
                else welcomeInput.focus();
            });
            welcomeInput.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') startBtn.click();
            });
        }
        
        if(skipBtn) {
            skipBtn.addEventListener('click', () => {
                this.saveAndEnter('Invitado');
            });
        }

        // 2. Botones de Edición (En el menú lateral)
        const saveEditBtn = document.getElementById('save-edit-name-btn');
        const editInput = document.getElementById('edit-name-input');
        
        if(saveEditBtn && editInput) {
            saveEditBtn.addEventListener('click', () => {
                const val = editInput.value.trim();
                if(val) {
                    this.userName = val;
                    localStorage.setItem('valtara_identity', val);
                    this.updateUI();
                    
                    const modal = document.getElementById('edit-name-modal');
                    if(modal) { modal.close(); document.body.style.overflow = 'auto'; }
                    
                    if(window.A11yEngine) A11yEngine.announce(`Identidad actualizada a ${val}.`);
                }
            });
            editInput.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') saveEditBtn.click();
            });
        }
    },

    saveAndEnter: function(name) {
        this.userName = name;
        if(name !== 'Invitado') {
            localStorage.setItem('valtara_identity', name);
        }
        
        // Desaparecer pantalla de onboarding
        const onboardingScreen = document.getElementById('onboarding-screen');
        if(onboardingScreen) {
            onboardingScreen.classList.add('fade-out');
            onboardingScreen.setAttribute('aria-hidden', 'true');
        }
        
        this.updateUI();
        if(window.A11yEngine) A11yEngine.announce(`Ingresando al santuario. Es un honor recibirle, ${this.userName}.`);
    },

    // ================================================================================
    // ACTUALIZACIÓN DE INTERFAZ (Textos dinámicos)
    // ================================================================================
    updateUI: function() {
        const hour = new Date().getHours();
        let greeting = "Buenas noches";
        let cortesia = "Ritual del Ocaso (Post 7PM): Culmine con degustación de Té Orgánico de Frutos Rojos.";

        if (hour >= 4 && hour < 12) {
            greeting = "Buenos días";
            cortesia = "Cortesía Matutina (9AM-12PM): 20% de privilegio corporativo en Masaje Deportivo.";
        } else if (hour >= 12 && hour < 19) {
            greeting = "Buenas tardes";
            cortesia = "Privilegio Corporativo: Análisis Postural y Biomecánico en cortesía.";
        }

        // A. Actualizar el menú lateral (Perfil del Paciente)
        const menuGreeting = document.getElementById('menu-greeting');
        const menuName = document.getElementById('menu-user-name');
        if(menuGreeting) menuGreeting.textContent = greeting + ",";
        if(menuName) menuName.textContent = this.userName;

        // B. Actualizar el Hero (Portada)
        const heroTitle = document.querySelector('.hero-view h1');
        if (heroTitle) {
            heroTitle.style.fontSize = '3.5rem';
            heroTitle.style.letterSpacing = '0.1rem';
            heroTitle.style.textTransform = 'none';
            heroTitle.innerHTML = `${greeting}, <br><span style="color: var(--valtara-oro);">${this.userName}.</span>`;
        }

        // C. Actualizar la tarjeta de cortesía
        const cortesiaDiv = document.getElementById('cortesia-dinamica');
        if (cortesiaDiv) {
            cortesiaDiv.innerHTML = `<i class="fa-solid fa-gem" style="margin-right: 15px;" aria-hidden="true"></i> ${cortesia}`;
        }
    }
};

window.addEventListener('DOMContentLoaded', () => UserEngine.init());
