/**
 * ====================================================================================
 * BLOQUE 6: USER ENGINE V15.0 (SOVEREIGN IDENTITY & CONTEXTUAL CORE)
 * Gestor de Identidad, Interfaz Dinámica (Dual Render), Seguridad XSS, 
 * Almacenamiento JSON, Marketing Predictivo por Hora y Omnicanalidad WhatsApp.
 * ====================================================================================
 */

const UserEngine = {
    // Estado actual del usuario en memoria
    userData: {
        name: 'Apreciable visitante',
        avatar: 'fa-spa',
        isRegistered: false,
        lastVisit: null
    },
    
    // Mapeo de nombres de Avatar para WhatsApp
    avatarNames: {
        'fa-spa': 'Loto Paz',
        'fa-gem': 'Cuarzo Luz',
        'fa-circle-notch': 'Esfera Zen',
        'fa-leaf': 'Botánico',
        'fa-fingerprint': 'Esencia'
    },

    // Base de datos de Marketing Dinámico
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
        this.loadIdentity();
        this.bindPersistentEvents();
        // Retraso intencional para permitir que las animaciones ambientales fluyan
        setTimeout(() => { this.evaluateSession(); }, 400);
    },

    // ================================================================================
    // 1. CAPA DE SEGURIDAD Y ALMACENAMIENTO ESTRUCTURADO (JSON)
    // ================================================================================
    loadIdentity: function() {
        try {
            const stored = localStorage.getItem('valtara_vault_v15');
            if (stored) {
                const parsed = JSON.parse(stored);
                // Validamos que el paquete no esté corrupto
                if(parsed && parsed.name) {
                    this.userData = parsed;
                }
            }
        } catch(e) {
            console.error("Bóveda de identidad corrupta. Reiniciando núcleo.", e);
            localStorage.removeItem('valtara_vault_v15');
        }
    },

    saveIdentity: function(name, avatar, isGuest = false) {
        this.userData.name = this.sanitizeString(name);
        this.userData.avatar = avatar;
        this.userData.isRegistered = !isGuest;
        this.userData.lastVisit = new Date().toISOString();

        if (!isGuest) {
            // Empaquetado Hermético JSON
            localStorage.setItem('valtara_vault_v15', JSON.stringify(this.userData));
        }
        
        this.closeOnboarding();
        this.updateUI();
        this.injectContextualMarketing();
        this.updateWhatsAppLinks(); // Disparamos la Omnicanalidad
        
        if(window.A11yEngine) A11yEngine.announce(`Identidad actualizada. Bienvenido ${this.userData.name}.`);
    },

    // Escudo Anti-XSS y Embellecedor Textual
    sanitizeString: function(str) {
        // Elimina símbolos matemáticos, etiquetas HTML y códigos
        let clean = str.replace(/[<>\/\\"\'=\$%\^&\*]/g, '').trim().substring(0, 20);
        if (clean.length > 0) {
            // Convierte "ángel" a "Ángel" (Capitalización elegante)
            clean = clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
        }
        return clean;
    },

    // ================================================================================
    // 2. RENDERIZADO DINÁMICO DE INTERFAZ (DUAL-MODE)
    // ================================================================================
    evaluateSession: function() {
        const screen = document.getElementById('onboarding-screen');
        if (this.userData.isRegistered) {
            // Usuario recurrente: Entra directo al santuario
            if(screen) screen.classList.add('fade-out');
            this.updateUI();
            this.injectContextualMarketing();
            this.updateWhatsAppLinks();
        } else {
            // Usuario Nuevo
            this.renderOnboardingMode('new');
        }
    },

    renderOnboardingMode: function(mode) {
        const screen = document.getElementById('onboarding-screen');
        const contentBox = screen.querySelector('.onboarding-content');
        if(!screen || !contentBox) return;

        // Limpiamos el contenedor
        contentBox.innerHTML = '';

        let html = '';
        if (mode === 'new') {
            html = `
                <div class="glow-icon-wrapper" style="margin-bottom: 1.5rem;">
                    <i aria-hidden="true" class="fa-solid fa-seedling gold-icon" style="font-size: 4rem;"></i>
                </div>
                <h1 id="onboarding-title" style="font-family: var(--font-accent); font-size: 3.5rem; margin-bottom: 1rem; color: #fff;">Bienvenido a Valtara</h1>
                <p style="color: #e2e2e8; font-size: 1.3rem; margin-bottom: 3rem; font-weight: 300; line-height: 1.8;">
                    Descubre un santuario diseñado para tu paz mental y corporal.<br>Para brindarte una experiencia a medida, elige un avatar y dinos cómo te gustaría que te llamemos.
                </p>
            `;
        } else {
            // MODO EDICIÓN: Mensaje Ultra-Empático y de Lujo
            html = `
                <div class="glow-icon-wrapper" style="margin-bottom: 1.5rem;">
                    <i aria-hidden="true" class="fa-solid fa-pen-nib gold-icon" style="font-size: 4rem; color: var(--valtara-morado-vivo); text-shadow: 0 0 30px rgba(178,0,255,0.6);"></i>
                </div>
                <h1 id="onboarding-title" style="font-family: var(--font-accent); font-size: 3.5rem; margin-bottom: 1rem; color: var(--valtara-blanco);">Renueva tu Identidad</h1>
                <p style="color: var(--valtara-gris-texto); font-size: 1.3rem; margin-bottom: 3rem; font-weight: 300; line-height: 1.8;">
                    Claro, estamos contigo. La transformación es parte del proceso.<br>Platícanos cómo deseas que te llamemos en esta nueva etapa y elige el avatar que mejor resuene contigo hoy.
                </p>
            `;
        }

        // Construcción de la Cuadrícula de Avatares
        html += `
            <div class="input-group" style="transition: all 0.4s ease;">
                <fieldset class="avatar-selection-group" aria-label="Elige tu Avatar">
                    <legend class="sr-only">Selección de Avatar</legend>
                    <div class="avatar-grid">
                        ${this.generateAvatarHTML('fa-spa', 'Loto Paz')}
                        ${this.generateAvatarHTML('fa-gem', 'Cuarzo Luz')}
                        ${this.generateAvatarHTML('fa-circle-notch', 'Esfera Zen')}
                        ${this.generateAvatarHTML('fa-leaf', 'Botánico')}
                        ${this.generateAvatarHTML('fa-fingerprint', 'Esencia')}
                    </div>
                </fieldset>

                <div style="margin-top: 3rem; position: relative;">
                    <label for="welcome-name-input" class="sr-only">Tu nombre o apodo</label>
                    <i class="fa-solid fa-user" style="position: absolute; left: 1.5rem; top: 1.8rem; font-size: 1.2rem; color: #888;"></i>
                    <input type="text" id="welcome-name-input" placeholder="Ej. Antonio, Doctor, Cinnamoroll..." autocomplete="off" style="padding-left: 4rem;" value="${mode === 'edit' && this.userData.name !== 'Apreciable visitante' ? this.userData.name : ''}">
                </div>

                <button id="welcome-start-btn" class="btn-primary" style="margin-top: 2.5rem; width: 100%; font-size: 1.2rem; padding: 1.5rem; background: rgba(255,255,255,0.05); color: #666; border-color: transparent; pointer-events: none; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
                    <i class="fa-solid fa-door-open" style="margin-right: 10px;"></i> ${mode === 'new' ? 'Entrar al Santuario' : 'Actualizar Identidad'}
                </button>
            </div>
        `;

        if (mode === 'new') {
            html += `<button id="welcome-skip-btn" class="btn-text-only" style="margin-top: 2.5rem; color: #aaa; font-size: 1.1rem; text-decoration: underline; background: transparent; border: none; cursor: pointer; transition: 0.3s;">Prefiero explorar de forma anónima</button>`;
        } else {
            html += `<button id="welcome-cancel-btn" class="btn-text-only" style="margin-top: 2.5rem; color: #ff5555; font-size: 1.1rem; text-decoration: underline; background: transparent; border: none; cursor: pointer; transition: 0.3s;">Cancelar edición y volver</button>`;
        }

        contentBox.innerHTML = html;
        
        // Revelamos la pantalla
        screen.classList.remove('fade-out');
        screen.setAttribute('aria-hidden', 'false');

        // Volvemos a conectar los "cables" de los botones inyectados
        this.bindDynamicEvents(mode);
    },

    generateAvatarHTML: function(iconClass, label) {
        const isChecked = this.userData.avatar === iconClass ? 'checked' : '';
        return `
            <label class="avatar-option">
                <input type="radio" name="user_avatar" value="${iconClass}" ${isChecked}>
                <span class="avatar-icon"><i class="fa-solid ${iconClass}"></i></span>
                <span class="avatar-name">${label}</span>
            </label>
        `;
    },

    // ================================================================================
    // 3. LÓGICA DE VALIDACIÓN EN TIEMPO REAL (El botón mágico)
    // ================================================================================
    bindDynamicEvents: function(mode) {
        const startBtn = document.getElementById('welcome-start-btn');
        const skipBtn = document.getElementById('welcome-skip-btn');
        const cancelBtn = document.getElementById('welcome-cancel-btn');
        const input = document.getElementById('welcome-name-input');

        if(input && startBtn) {
            // Lógica de encendido del botón
            const checkInput = () => {
                const val = input.value.trim();
                if(val.length > 0) {
                    // Encender botón (Modo Lujo)
                    startBtn.style.pointerEvents = 'auto';
                    startBtn.style.background = 'var(--valtara-cian-brillante)';
                    startBtn.style.color = 'var(--valtara-negro-fondo)';
                    startBtn.style.boxShadow = '0 1rem 3rem rgba(0, 255, 255, 0.4)';
                } else {
                    // Apagar botón
                    startBtn.style.pointerEvents = 'none';
                    startBtn.style.background = 'rgba(255,255,255,0.05)';
                    startBtn.style.color = '#666';
                    startBtn.style.boxShadow = 'none';
                }
            };

            input.addEventListener('input', checkInput);
            // Revisar por si en modo edición ya tiene nombre precargado
            checkInput(); 

            startBtn.addEventListener('click', () => {
                const val = input.value.trim();
                const selectedAvatar = document.querySelector('input[name="user_avatar"]:checked');
                const avatarClass = selectedAvatar ? selectedAvatar.value : 'fa-spa';
                
                if(val) this.saveIdentity(val, avatarClass, false);
            });

            input.addEventListener('keypress', (e) => {
                if(e.key === 'Enter' && input.value.trim().length > 0) startBtn.click();
            });
        }

        if(skipBtn) {
            skipBtn.addEventListener('click', () => {
                this.saveIdentity('Apreciable visitante', 'fa-spa', true);
            });
        }

        if(cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.closeOnboarding();
            });
        }
    },

    bindPersistentEvents: function() {
        const changeNameMenuBtn = document.getElementById('btn-change-name-menu');
        const resetSessionBtn = document.getElementById('btn-reset-session');
        
        if(changeNameMenuBtn) {
            changeNameMenuBtn.addEventListener('click', () => {
                this.renderOnboardingMode('edit');
                document.getElementById('menu-close-btn').click(); // Cierra el menú lateral
            });
        }

        if(resetSessionBtn) {
            resetSessionBtn.addEventListener('click', () => {
                localStorage.removeItem('valtara_vault_v15');
                window.location.reload(); 
            });
        }
    },

    closeOnboarding: function() {
        const screen = document.getElementById('onboarding-screen');
        if(screen) {
            screen.classList.add('fade-out');
            screen.setAttribute('aria-hidden', 'true');
        }
    },

    // ================================================================================
    // 4. ACTUALIZACIÓN VISUAL DEL EDIFICIO
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

        const menuGreeting = document.getElementById('menu-greeting');
        const menuName = document.getElementById('menu-user-name');
        const sidebarAvatar = document.getElementById('sidebar-avatar-icon');
        
        if(menuGreeting) menuGreeting.textContent = greeting + ",";
        if(menuName) menuName.textContent = this.userData.name;
        if(sidebarAvatar) sidebarAvatar.innerHTML = `<i class="fa-solid ${this.userData.avatar}"></i>`;

        const heroTitle = document.getElementById('hero-dynamic-greeting');
        if (heroTitle) {
            if (!this.userData.isRegistered) {
                heroTitle.innerHTML = `${greeting},<br><span style="color: ${greetingColor}; font-size: 3.5rem;">Apreciable visitante.</span>`;
            } else {
                heroTitle.innerHTML = `${greeting},<br><span style="color: ${greetingColor};">${this.userData.name}.</span>`;
            }
        }
    },

    // ================================================================================
    // 5. MARKETING CONTEXTUAL (RELOJ BIOLÓGICO) Y REFACTORIZACIÓN EN BUCLE
    // ================================================================================
    injectContextualMarketing: function() {
        let pool = [...this.promoPool];
        const hour = new Date().getHours();
        let priorityPromo = null;

        // Lógica de Inteligencia de Tiempo
        if (hour >= 6 && hour < 12) {
            // Mañana: Forzar Masaje Deportivo
            const idx = pool.findIndex(p => p.title.includes("Descompresión Matutina"));
            if(idx > -1) priorityPromo = pool.splice(idx, 1)[0];
        } else if (hour >= 17 && hour <= 23) {
            // Tarde/Noche: Forzar Ritual del Ocaso
            const idx = pool.findIndex(p => p.title.includes("Ritual del Ocaso"));
            if(idx > -1) priorityPromo = pool.splice(idx, 1)[0];
        }

        // Barajamos el resto (Fisher-Yates)
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }

        // Armamos la baraja final de 3 cartas
        let finalPromos = [];
        if (priorityPromo) {
            finalPromos.push(priorityPromo);
            finalPromos.push(pool[0], pool[1]);
        } else {
            finalPromos = pool.slice(0, 3);
        }

        // BUCLE INTELIGENTE: Busca las IDs en el HTML y las rellena solitas
        for (let i = 0; i < finalPromos.length; i++) {
            const titleEl = document.getElementById(`promo${i+1}-title`);
            const textEl = document.getElementById(`promo${i+1}-text`);
            
            if (titleEl && textEl) {
                titleEl.style.color = finalPromos[i].color;
                titleEl.innerHTML = `<i class="fa-solid ${finalPromos[i].icon}"></i> ${finalPromos[i].title}`;
                textEl.innerHTML = finalPromos[i].desc;
            }
        }
    },

    // ================================================================================
    // 6. OMNICANALIDAD: WHATSAPP DINÁMICO
    // ================================================================================
    updateWhatsAppLinks: function() {
        // Encontramos todos los enlaces que apuntan a WhatsApp en la página
        const waLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
        const phoneTarget = "5213348572070";
        
        // Traducimos el ícono del avatar a su nombre místico
        const avatarStr = this.avatarNames[this.userData.avatar] || 'Alma Libre';
        let customMessage = "";

        if (this.userData.isRegistered) {
            customMessage = `Hola, mi nombre es ${this.userData.name}, explorador del avatar ${avatarStr}. Estoy navegando en su santuario digital y me gustaría recibir asesoría para agendar una sesión.`;
        } else {
            customMessage = `Hola, estoy explorando su santuario digital como invitado. Me gustaría recibir asesoría para conocer más sobre sus terapias y agendar una sesión.`;
        }

        // Codificamos el mensaje para que WhatsApp lo entienda (reemplaza espacios por %20 etc)
        const encodedMessage = encodeURIComponent(customMessage);

        waLinks.forEach(link => {
            // Sobrescribimos el enlace con el nuevo mensaje personalizado
            link.href = `https://wa.me/${phoneTarget}?text=${encodedMessage}`;
        });
    }
};

// Iniciar al cargar la ventana
window.addEventListener('DOMContentLoaded', () => UserEngine.init());
