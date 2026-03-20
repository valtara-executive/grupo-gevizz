/**
 * ====================================================================================
 * BLOQUE 6: USER ENGINE V11.1 (GESTOR DE IDENTIDAD Y DISUASIÓN DINÁMICA)
 * Controla el Onboarding inmersivo, Avatares, Privacidad y Aleatoriedad de Promociones.
 * ====================================================================================
 */

const UserEngine = {
    userName: 'Apreciable visitante',
    userAvatar: 'fa-spa', // Avatar Loto por defecto
    
    // Base de datos de Marketing Dinámico (Disuasión)
    // El sistema elegirá 3 de estas cartas al azar en cada recarga de página
    promoPool: [
        { 
            icon: "fa-sun", color: "var(--valtara-oro)", 
            title: "Bienvenida Primavera", 
            desc: "Celebre el renacer de su vitalidad. Reserve su espacio matutino (9 AM a 12 PM) y reciba un <strong>privilegio exclusivo del 20% de cortesía</strong>. Inicie el día con máximo rigor clínico." 
        },
        { 
            icon: "fa-id-card-clip", color: "var(--valtara-cian-brillante)", 
            title: "Valtara Member Card", 
            desc: "Transforme su bienestar en un hábito. Al agendar y asistir a dos intervenciones, <strong>su tercera visita recibirá un privilegio del 50% de cortesía</strong>. Válido durante 30 días." 
        },
        { 
            icon: "fa-mug-hot", color: "var(--valtara-morado-vivo)", 
            title: "Ritual del Ocaso", 
            desc: "Toda gran obra merece un final perfecto. Al reservar cualquier sesión a partir de las <strong>7:00 PM</strong>, nos despediremos invitándole a degustar un exquisito <strong>Té Orgánico de Frutos Rojos</strong>." 
        },
        { 
            icon: "fa-bolt", color: "#ff5555", 
            title: "Descompresión Matutina", 
            desc: "El cortisol (hormona del estrés) alcanza su pico al despertar. Agende un <strong>Masaje Deportivo</strong> antes de las 12 PM para pulverizar la tensión y enfrentar sus decisiones con claridad absoluta." 
        },
        { 
            icon: "fa-child-reaching", color: "var(--valtara-verde-menta)", 
            title: "Estrategia Reductiva", 
            desc: "Optimice su silueta este mes. Nuestro paquete de 10 sesiones de <strong>Masaje Reductivo con Maderoterapia ($6,199 MXN)</strong> está disponible a 3 plazos cómodos. Acelere su metabolismo hoy." 
        },
        { 
            icon: "fa-brain", color: "var(--valtara-blanco)", 
            title: "Pausa Corporativa", 
            desc: "Evite el colapso del sistema nervioso a mitad de semana. Una <strong>Rehabilitación Facial por Estrés ($419 MXN)</strong> en su hora de comida prevendrá el bruxismo y la fatiga visual severa." 
        }
    ],

    init: function() {
        this.bindEvents();
        // Retraso intencional para permitir que las animaciones de fondo carguen fluidamente
        setTimeout(() => { this.checkIdentity(); }, 400);
    },

    // ================================================================================
    // FLUJO DE ONBOARDING (RECONOCIMIENTO DEL PACIENTE)
    // ================================================================================
    checkIdentity: function() {
        const savedName = localStorage.getItem('valtara_identity_name_v11');
        const savedAvatar = localStorage.getItem('valtara_identity_avatar_v11');
        const onboardingScreen = document.getElementById('onboarding-screen');
        
        if (savedName) {
            // Usuario recurrente: Esconder el onboarding inmediatamente
            this.userName = savedName;
            this.userAvatar = savedAvatar || 'fa-spa';
            
            if(onboardingScreen) onboardingScreen.classList.add('fade-out');
            
            this.updateUI();
            this.injectDynamicMarketing();
            
            if(window.A11yEngine) A11yEngine.announce(`Bienvenido de nuevo, ${this.userName}. El ecosistema Valtara está activo.`);
        } else {
            // Usuario nuevo: Mostrar onboarding, enfocar para accesibilidad
            if(onboardingScreen) {
                onboardingScreen.setAttribute('aria-hidden', 'false');
                const nameInput = document.getElementById('welcome-name-input');
                if(nameInput) nameInput.focus();
                if(window.A11yEngine) A11yEngine.announce("Pantalla de autenticación. Por favor, seleccione un avatar y escriba su nombre para personalizar la experiencia.");
            }
        }
    },

    bindEvents: function() {
        // 1. Interfaz del Onboarding
        const startBtn = document.getElementById('welcome-start-btn');
        const skipBtn = document.getElementById('welcome-skip-btn');
        const welcomeInput = document.getElementById('welcome-name-input');
        
        if(startBtn && welcomeInput) {
            startBtn.addEventListener('click', () => {
                const val = welcomeInput.value.trim();
                // Extraer el avatar seleccionado de los Radio Buttons
                const selectedAvatar = document.querySelector('input[name="user_avatar"]:checked');
                const avatarClass = selectedAvatar ? selectedAvatar.value : 'fa-spa';

                if(val) {
                    this.saveAndEnter(val, avatarClass);
                } else {
                    // Si deja el campo vacío, entra como invitado pero con su avatar elegido
                    this.saveAndEnter('Apreciable visitante', avatarClass);
                }
            });
            
            // Permitir entrar presionando la tecla Enter
            welcomeInput.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') startBtn.click();
            });
        }
        
        if(skipBtn) {
            skipBtn.addEventListener('click', () => {
                this.saveAndEnter('Apreciable visitante', 'fa-spa');
            });
        }

        // 2. Gestión de Identidad desde el Menú Lateral
        const changeNameMenuBtn = document.getElementById('btn-change-name-menu');
        const resetSessionBtn = document.getElementById('btn-reset-session');
        
        if(changeNameMenuBtn) {
            changeNameMenuBtn.addEventListener('click', () => {
                // Reaparecer la pantalla de Onboarding para editar
                const onboardingScreen = document.getElementById('onboarding-screen');
                if(onboardingScreen) {
                    onboardingScreen.classList.remove('fade-out');
                    onboardingScreen.setAttribute('aria-hidden', 'false');
                }
                // Cerrar el menú lateral
                document.getElementById('menu-close-btn').click();
            });
        }

        if(resetSessionBtn) {
            resetSessionBtn.addEventListener('click', () => {
                // Destruir datos locales (Cumplimiento de Privacidad LFPDPPP)
                localStorage.removeItem('valtara_identity_name_v11');
                localStorage.removeItem('valtara_identity_avatar_v11');
                window.location.reload(); // Refrescar la página para limpiar el DOM
            });
        }
    },

    saveAndEnter: function(name, avatar) {
        this.userName = name;
        this.userAvatar = avatar;
        
        // Guardar localmente solo si no es invitado anónimo
        if(name !== 'Apreciable visitante') {
            localStorage.setItem('valtara_identity_name_v11', name);
            localStorage.setItem('valtara_identity_avatar_v11', avatar);
        }
        
        // Desvanecer el onboarding con clase CSS (Fade-Out)
        const onboardingScreen = document.getElementById('onboarding-screen');
        if(onboardingScreen) {
            onboardingScreen.classList.add('fade-out');
            onboardingScreen.setAttribute('aria-hidden', 'true');
        }
        
        this.updateUI();
        this.injectDynamicMarketing();
        
        if(window.A11yEngine) A11yEngine.announce(`Identidad autenticada. Inyectando preferencias para ${this.userName}.`);
    },

    // ================================================================================
    // ACTUALIZACIÓN DE INTERFAZ Y COLORIMETRÍA DEL TIEMPO
    // ================================================================================
    updateUI: function() {
        const hour = new Date().getHours();
        let greeting = "Buenas noches";
        let greetingColor = "var(--valtara-morado-vivo)";

        if (hour >= 4 && hour < 12) {
            greeting = "Buenos días";
            greetingColor = "var(--valtara-oro)";
        } else if (hour >= 12 && hour < 19) {
            greeting = "Buenas tardes";
            greetingColor = "var(--valtara-cian-brillante)";
        }

        // A. Actualizar Perfil en Menú Lateral
        const menuGreeting = document.getElementById('menu-greeting');
        const menuName = document.getElementById('menu-user-name');
        const sidebarAvatar = document.getElementById('sidebar-avatar-icon');
        
        if(menuGreeting) menuGreeting.textContent = greeting + ",";
        if(menuName) menuName.textContent = this.userName;
        if(sidebarAvatar) sidebarAvatar.innerHTML = `<i class="fa-solid ${this.userAvatar}"></i>`;

        // B. Actualizar Portada Principal (Hero)
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
    // MOTOR DE DISUASIÓN (MARKETING ALEATORIO PERSISTENTE)
    // ================================================================================
    injectDynamicMarketing: function() {
        // Clonar el arreglo para no mutar el original
        let pool = [...this.promoPool];
        
        // Algoritmo de Fisher-Yates para barajar el arreglo aleatoriamente
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        
        // Seleccionamos las primeras 3 cartas ya barajadas
        const selectedPromos = pool.slice(0, 3);

        // Inyectar Promo 1
        const title1 = document.getElementById('promo1-title');
        const text1 = document.getElementById('promo1-text');
        if(title1 && text1) {
            title1.style.color = selectedPromos[0].color;
            title1.innerHTML = `<i class="fa-solid ${selectedPromos[0].icon}"></i> ${selectedPromos[0].title}`;
            text1.innerHTML = selectedPromos[0].desc;
        }

        // Inyectar Promo 2
        const title2 = document.getElementById('promo2-title');
        const text2 = document.getElementById('promo2-text');
        if(title2 && text2) {
            title2.style.color = selectedPromos[1].color;
            title2.innerHTML = `<i class="fa-solid ${selectedPromos[1].icon}"></i> ${selectedPromos[1].title}`;
            text2.innerHTML = selectedPromos[1].desc;
        }

        // Inyectar Promo 3
        const title3 = document.getElementById('promo3-title');
        const text3 = document.getElementById('promo3-text');
        if(title3 && text3) {
            title3.style.color = selectedPromos[2].color;
            title3.innerHTML = `<i class="fa-solid ${selectedPromos[2].icon}"></i> ${selectedPromos[2].title}`;
            text3.innerHTML = selectedPromos[2].desc;
        }
    }
};

// Iniciar al cargar la ventana
window.addEventListener('DOMContentLoaded', () => UserEngine.init());
