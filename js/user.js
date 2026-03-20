/**
 * ====================================================================================
 * BLOQUE 6: USER ENGINE V11.0 (GESTOR DE IDENTIDAD Y MARKETING DINÁMICO)
 * Controla el Onboarding inmersivo, Avatares, Privacidad local y Promos por horario.
 * ====================================================================================
 */

const UserEngine = {
    userName: 'Apreciable visitante',
    userAvatar: 'fa-spa', // Avatar por defecto (Loto)
    
    // Base de datos de Promociones Rotativas extraídas del Manifiesto Clínico
    promos: {
        primavera: [
            { t: "Bienvenida Primavera", desc: "Celebre el renacer de su vitalidad. Reserve su espacio matutino (9 AM a 12 PM) y reciba un <strong>privilegio exclusivo del 20% de cortesía</strong> sobre la tarifa oficial. Inicie el día con el más alto rigor clínico." },
            { t: "El Renacer del Cuerpo", desc: "Aproveche nuestro horario matutino (9 a 12 PM) para restaurarse con un <strong>beneficio a su favor del 20%</strong> en cualquier terapia. Su bienestar es nuestra máxima prioridad corporativa." }
        ],
        member: [
            { t: "Valtara Member Card", desc: "Transforme su bienestar en un hábito inquebrantable. Al agendar y asistir a dos intervenciones, <strong>su tercera visita recibirá un privilegio del 50% de cortesía</strong>. Válido durante 30 días." },
            { t: "Membresía Biomecánica", desc: "La sanación no es un evento aislado. Reserve sus dos primeras citas y obtenga un <strong>50% de cortesía absoluta en la tercera</strong>. Exclusivo para pacientes comprometidos con su evolución física." }
        ],
        ocaso: [
            { t: "Ritual del Ocaso", desc: "Toda gran obra merece un final perfecto. Al reservar cualquier sesión a partir de las <strong>7:00 PM</strong>, nos despediremos invitándole a degustar un exquisito <strong>Té Orgánico de Frutos Rojos</strong>." },
            { t: "Magia Nocturna", desc: "Cierre su terapia de relajación o deportiva (citas post 7:00 PM) con el sabor profundo de nuestro <strong>Té Caliente de Frutos Rojos</strong>, diseñado para asentar su sistema digestivo." }
        ]
    },

    init: function() {
        this.bindEvents();
        // Retraso intencional de 0.5s para que el navegador renderice la interfaz fluida
        setTimeout(() => { this.checkIdentity(); }, 500);
    },

    // ================================================================================
    // FLUJO DE ONBOARDING Y RECONOCIMIENTO BIOMECÁNICO
    // ================================================================================
    checkIdentity: function() {
        const savedName = localStorage.getItem('valtara_identity_name');
        const savedAvatar = localStorage.getItem('valtara_identity_avatar');
        const onboardingScreen = document.getElementById('onboarding-screen');
        
        if (savedName) {
            // Usuario recurrente: Esconder el onboarding con fade out
            this.userName = savedName;
            this.userAvatar = savedAvatar || 'fa-spa';
            
            if(onboardingScreen) onboardingScreen.classList.add('fade-out');
            
            this.updateUI();
            this.updateDynamicPromos();
            if(window.A11yEngine) A11yEngine.announce(`Bienvenido de nuevo, ${this.userName}. El ecosistema Valtara está listo.`);
        } else {
            // Usuario nuevo: El onboarding ya es visible, enfocamos para accesibilidad
            if(onboardingScreen) {
                onboardingScreen.setAttribute('aria-hidden', 'false');
                const nameInput = document.getElementById('welcome-name-input');
                if(nameInput) nameInput.focus();
                if(window.A11yEngine) A11yEngine.announce("Pantalla de autenticación. Seleccione su avatar y escriba su nombre.");
            }
        }
    },

    bindEvents: function() {
        // 1. Botones del Onboarding (Pantalla Inmersiva)
        const startBtn = document.getElementById('welcome-start-btn');
        const skipBtn = document.getElementById('welcome-skip-btn');
        const welcomeInput = document.getElementById('welcome-name-input');
        
        if(startBtn && welcomeInput) {
            startBtn.addEventListener('click', () => {
                const val = welcomeInput.value.trim();
                // Obtener el avatar seleccionado de los radio buttons
                const selectedAvatar = document.querySelector('input[name="user_avatar"]:checked');
                const avatarClass = selectedAvatar ? selectedAvatar.value : 'fa-spa';

                if(val) {
                    this.saveAndEnter(val, avatarClass);
                } else {
                    // Si no pone nombre pero le da al botón, lo tratamos como invitado pero le respetamos el avatar
                    this.saveAndEnter('Apreciable visitante', avatarClass);
                }
            });
            welcomeInput.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') startBtn.click();
            });
        }
        
        if(skipBtn) {
            skipBtn.addEventListener('click', () => {
                this.saveAndEnter('Apreciable visitante', 'fa-spa');
            });
        }

        // 2. Botones de Gestión de Identidad (En el Menú Lateral)
        const changeNameMenuBtn = document.getElementById('btn-change-name-menu');
        const resetSessionBtn = document.getElementById('btn-reset-session');
        
        if(changeNameMenuBtn) {
            changeNameMenuBtn.addEventListener('click', () => {
                // Volver a mostrar el onboarding
                const onboardingScreen = document.getElementById('onboarding-screen');
                if(onboardingScreen) {
                    onboardingScreen.classList.remove('fade-out');
                    onboardingScreen.setAttribute('aria-hidden', 'false');
                }
                // Cerrar menú lateral
                document.getElementById('menu-close-btn').click();
                if(window.A11yEngine) A11yEngine.announce("Reconfigurando identidad clínica.");
            });
        }

        if(resetSessionBtn) {
            resetSessionBtn.addEventListener('click', () => {
                localStorage.removeItem('valtara_identity_name');
                localStorage.removeItem('valtara_identity_avatar');
                window.location.reload();
            });
        }
    },

    saveAndEnter: function(name, avatar) {
        this.userName = name;
        this.userAvatar = avatar;
        
        // Guardamos localmente bajo LFPDPPP
        if(name !== 'Apreciable visitante') {
            localStorage.setItem('valtara_identity_name', name);
            localStorage.setItem('valtara_identity_avatar', avatar);
        }
        
        // Desaparecer pantalla de onboarding con elegancia
        const onboardingScreen = document.getElementById('onboarding-screen');
        if(onboardingScreen) {
            onboardingScreen.classList.add('fade-out');
            onboardingScreen.setAttribute('aria-hidden', 'true');
        }
        
        this.updateUI();
        this.updateDynamicPromos();
        
        if(window.A11yEngine) {
            A11yEngine.announce(`Autenticación exitosa. Es un honor recibirle, ${this.userName}.`);
        }
    },

    // ================================================================================
    // ACTUALIZACIÓN DE INTERFAZ Y COLORIMETRÍA DEL TIEMPO
    // ================================================================================
    updateUI: function() {
        const hour = new Date().getHours();
        let greeting = "Buenas noches";
        let greetingColor = "var(--valtara-purpura-aura)";

        if (hour >= 4 && hour < 12) {
            greeting = "Buenos días";
            greetingColor = "var(--valtara-oro)";
        } else if (hour >= 12 && hour < 19) {
            greeting = "Buenas tardes";
            greetingColor = "var(--valtara-cian-fluor)";
        }

        // A. Actualizar el menú lateral (Perfil del Paciente)
        const menuGreeting = document.getElementById('menu-greeting');
        const menuName = document.getElementById('menu-user-name');
        const sidebarAvatar = document.getElementById('sidebar-avatar-icon');
        
        if(menuGreeting) menuGreeting.textContent = greeting + ",";
        if(menuName) menuName.textContent = this.userName;
        if(sidebarAvatar) sidebarAvatar.innerHTML = `<i class="fa-solid ${this.userAvatar}"></i>`;

        // B. Actualizar el Hero (Portada) con colorimetría temporal
        const heroTitle = document.getElementById('hero-dynamic-greeting');
        if (heroTitle) {
            if (this.userName === 'Apreciable visitante') {
                heroTitle.innerHTML = `${greeting},<br><span style="color: ${greetingColor}; font-size: 3rem;">Apreciable visitante.</span>`;
            } else {
                heroTitle.innerHTML = `${greeting},<br><span style="color: ${greetingColor};">${this.userName}.</span>`;
            }
        }
    },

    // ================================================================================
    // MARKETING DINÁMICO (Inyecta las promociones en los contenedores de cristal)
    // ================================================================================
    updateDynamicPromos: function() {
        // Seleccionamos promos aleatorias para que la página siempre luzca fresca
        const p1 = this.promos.primavera[Math.floor(Math.random() * this.promos.primavera.length)];
        const p2 = this.promos.member[Math.floor(Math.random() * this.promos.member.length)];
        const p3 = this.promos.ocaso[Math.floor(Math.random() * this.promos.ocaso.length)];
        
        const title1 = document.getElementById('promo1-title');
        const text1 = document.getElementById('promo1-text');
        if(title1 && text1) {
            title1.innerHTML = `<i class="fa-solid fa-sun"></i> ${p1.t}`;
            text1.innerHTML = p1.desc;
        }

        const title2 = document.getElementById('promo2-title');
        const text2 = document.getElementById('promo2-text');
        if(title2 && text2) {
            title2.innerHTML = `<i class="fa-solid fa-id-card-clip"></i> ${p2.t}`;
            text2.innerHTML = p2.desc;
        }

        const title3 = document.getElementById('promo3-title');
        const text3 = document.getElementById('promo3-text');
        if(title3 && text3) {
            title3.innerHTML = `<i class="fa-solid fa-mug-hot"></i> ${p3.t}`;
            text3.innerHTML = p3.desc;
        }
    }
};

window.addEventListener('DOMContentLoaded', () => UserEngine.init());
