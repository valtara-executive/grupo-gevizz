/**
 * ====================================================================================
 * BLOQUE 6: USER ENGINE V16.0 (MINIMALIST ONBOARDING & CONTEXTUAL CORE)
 * Gestor de Identidad, Onboarding Minimalista, Seguridad XSS, Almacenamiento JSON.
 * ====================================================================================
 */

const UserEngine = {
    userData: {
        name: 'Apreciable visitante',
        avatar: 'fa-spa', // Asignado por defecto para mantener el sistema estable
        isRegistered: false,
        lastVisit: null
    },
    
    avatarNames: {
        'fa-spa': 'Loto Paz',
        'fa-gem': 'Cuarzo Luz',
        'fa-circle-notch': 'Esfera Zen',
        'fa-leaf': 'Botánico',
        'fa-fingerprint': 'Esencia'
    },

    promoPool: [
        { icon: "fa-sun", color: "var(--valtara-oro)", title: "Bienvenida Primavera", desc: "Celebre el renacer de su vitalidad. Reserve su espacio matutino (9 AM a 12 PM) y reciba un <strong>privilegio exclusivo del 20% de cortesía</strong>." },
        { icon: "fa-id-card-clip", color: "var(--valtara-cian-brillante)", title: "Valtara Member Card", desc: "Transforme su bienestar en un hábito. Al agendar y asistir a dos intervenciones, <strong>su tercera visita recibirá un privilegio del 50% de cortesía</strong>." },
        { icon: "fa-mug-hot", color: "var(--valtara-morado-vivo)", title: "Ritual del Ocaso", desc: "Al reservar cualquier sesión a partir de las <strong>7:00 PM</strong>, nos despediremos invitándole a degustar un exquisito <strong>Té Orgánico de Frutos Rojos</strong>." },
        { icon: "fa-bolt", color: "#ff5555", title: "Descompresión Matutina", desc: "Agende un <strong>Masaje Deportivo</strong> antes de las 12 PM para pulverizar la tensión y enfrentar sus decisiones con claridad absoluta." },
        { icon: "fa-child-reaching", color: "var(--valtara-verde-menta)", title: "Estrategia Reductiva", desc: "Nuestro paquete de 10 sesiones de <strong>Masaje Reductivo con Maderoterapia ($6,199 MXN)</strong> está disponible a 3 plazos cómodos." },
        { icon: "fa-brain", color: "var(--valtara-blanco)", title: "Pausa Corporativa", desc: "Evite el colapso. Una <strong>Rehabilitación Facial por Estrés ($419 MXN)</strong> en su hora de comida prevendrá el bruxismo y la fatiga visual." }
    ],

    init: function() {
        this.loadIdentity();
        this.bindPersistentEvents();
        setTimeout(() => { this.evaluateSession(); }, 200);
    },

    loadIdentity: function() {
        try {
            const stored = localStorage.getItem('valtara_vault_v15');
            if (stored) {
                const parsed = JSON.parse(stored);
                if(parsed && parsed.name) {
                    this.userData = parsed;
                }
            }
        } catch(e) { localStorage.removeItem('valtara_vault_v15'); }
    },

    saveIdentity: function(name, avatar, isGuest = false) {
        this.userData.name = this.sanitizeString(name);
        this.userData.avatar = avatar; // Siempre será fa-spa (Loto) invisiblemente
        this.userData.isRegistered = !isGuest;
        this.userData.lastVisit = new Date().toISOString();

        if (!isGuest) {
            localStorage.setItem('valtara_vault_v15', JSON.stringify(this.userData));
        }
        
        this.closeOnboarding();
        this.updateUI();
        this.injectContextualMarketing();
        this.updateWhatsAppLinks(); 
        
        // Disparamos un evento personalizado para avisarle a Aura que la identidad cambió
        window.dispatchEvent(new Event('valtaraIdentityUpdated'));
    },

    sanitizeString: function(str) {
        let clean = str.replace(/[<>\/\\"\'=\$%\^&\*]/g, '').trim().substring(0, 20);
        if (clean.length > 0) { clean = clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase(); }
        return clean;
    },

    evaluateSession: function() {
        const screen = document.getElementById('onboarding-screen');
        if (this.userData.isRegistered) {
            if(screen) screen.classList.add('fade-out');
            this.updateUI();
            this.injectContextualMarketing();
            this.updateWhatsAppLinks();
        } else {
            this.renderOnboardingMode('new');
        }
    },

    // AQUI INYECTAMOS EL MINIMALISMO ABSOLUTO (Destruimos el HTML viejo)
    renderOnboardingMode: function(mode) {
        const screen = document.getElementById('onboarding-screen');
        const contentBox = screen.querySelector('.onboarding-content');
        if(!screen || !contentBox) return;

        let html = '';
        if (mode === 'new') {
            html = `
                <div class="glow-icon-wrapper" style="margin-bottom: 2rem;">
                    <i aria-hidden="true" class="fa-solid fa-seedling gold-icon" style="font-size: 3.5rem; color: var(--valtara-cian-brillante); text-shadow: 0 0 20px rgba(0,255,255,0.4);"></i>
                </div>
                <h1 id="onboarding-title" style="font-family: var(--font-accent); font-size: 3.5rem; margin-bottom: 1rem; color: var(--valtara-blanco);">Bienvenido</h1>
                <p style="color: var(--valtara-gris-texto); font-size: 1.3rem; margin-bottom: 3.5rem; font-weight: 300; letter-spacing: 1px;">
                    ¿Cómo podemos llamarte el día de hoy?
                </p>
            `;
        } else {
            html = `
                <div class="glow-icon-wrapper" style="margin-bottom: 2rem;">
                    <i aria-hidden="true" class="fa-solid fa-pen-nib gold-icon" style="font-size: 3.5rem; color: var(--valtara-morado-vivo); text-shadow: 0 0 20px rgba(178,0,255,0.4);"></i>
                </div>
                <h1 id="onboarding-title" style="font-family: var(--font-accent); font-size: 3.5rem; margin-bottom: 1rem; color: var(--valtara-blanco);">Renueva tu Identidad</h1>
                <p style="color: var(--valtara-gris-texto); font-size: 1.3rem; margin-bottom: 3.5rem; font-weight: 300; letter-spacing: 1px;">
                    Claro que sí. ¿Cómo deseas que te llamemos ahora?
                </p>
            `;
        }

        // Interfaz ultra-limpia sin avatares
        html += `
            <div class="input-group" style="background: transparent; border: none; box-shadow: none; padding: 0;">
                <div style="position: relative; max-width: 400px; margin: 0 auto;">
                    <label for="welcome-name-input" class="sr-only">Tu nombre o apodo</label>
                    <i class="fa-solid fa-user" style="position: absolute; left: 1.5rem; top: 1.8rem; font-size: 1.2rem; color: var(--valtara-oro);"></i>
                    <input type="text" id="welcome-name-input" placeholder="Ej. Antonio, Doctor..." autocomplete="off" style="padding-left: 4rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); text-align: left;" value="${mode === 'edit' && this.userData.name !== 'Apreciable visitante' ? this.userData.name : ''}">
                </div>

                <button id="welcome-start-btn" class="btn-primary" style="margin-top: 2rem; width: 100%; max-width: 400px; font-size: 1.2rem; padding: 1.5rem; background: rgba(255,255,255,0.05); color: #666; border-color: transparent; pointer-events: none; transition: all 0.4s ease;">
                    <i class="fa-solid fa-door-open" style="margin-right: 10px;"></i> Entrar al Santuario
                </button>
            </div>
        `;

        if (mode === 'new') {
            html += `<button id="welcome-skip-btn" class="btn-text-only" style="margin-top: 2.5rem; color: #aaa; font-size: 1.1rem; text-decoration: underline; background: transparent; border: none; cursor: pointer; transition: 0.3s;">Explorar como invitado</button>`;
        } else {
            html += `<button id="welcome-cancel-btn" class="btn-text-only" style="margin-top: 2.5rem; color: #ff5555; font-size: 1.1rem; text-decoration: underline; background: transparent; border: none; cursor: pointer; transition: 0.3s;">Cancelar edición</button>`;
        }

        contentBox.innerHTML = html;
        screen.classList.remove('fade-out');
        screen.setAttribute('aria-hidden', 'false');

        this.bindDynamicEvents(mode);
    },

    bindDynamicEvents: function(mode) {
        const startBtn = document.getElementById('welcome-start-btn');
        const skipBtn = document.getElementById('welcome-skip-btn');
        const cancelBtn = document.getElementById('welcome-cancel-btn');
        const input = document.getElementById('welcome-name-input');

        if(input && startBtn) {
            const checkInput = () => {
                const val = input.value.trim();
                if(val.length > 0) {
                    startBtn.style.pointerEvents = 'auto';
                    startBtn.style.background = 'var(--valtara-cian-brillante)';
                    startBtn.style.color = 'var(--valtara-negro-fondo)';
                    startBtn.style.boxShadow = '0 1rem 3rem rgba(0, 255, 255, 0.4)';
                } else {
                    startBtn.style.pointerEvents = 'none';
                    startBtn.style.background = 'rgba(255,255,255,0.05)';
                    startBtn.style.color = '#666';
                    startBtn.style.boxShadow = 'none';
                }
            };

            input.addEventListener('input', checkInput);
            checkInput(); 

            startBtn.addEventListener('click', () => {
                const val = input.value.trim();
                // Asignamos 'fa-spa' por defecto siempre para mantener estabilidad
                if(val) this.saveIdentity(val, 'fa-spa', false);
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
            cancelBtn.addEventListener('click', () => { this.closeOnboarding(); });
        }
    },

    bindPersistentEvents: function() {
        const changeNameMenuBtn = document.getElementById('btn-change-name-menu');
        const resetSessionBtn = document.getElementById('btn-reset-session');
        
        if(changeNameMenuBtn) {
            changeNameMenuBtn.addEventListener('click', () => {
                this.renderOnboardingMode('edit');
                document.getElementById('menu-close-btn').click(); 
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

    updateUI: function() {
        const hour = new Date().getHours();
        let greeting = "Buenas noches";
        let greetingColor = "var(--valtara-morado-vivo)";

        if (hour >= 4 && hour < 12) { greeting = "Buenos días"; greetingColor = "var(--valtara-oro)"; } 
        else if (hour >= 12 && hour < 19) { greeting = "Buenas tardes"; greetingColor = "var(--valtara-cian-brillante)"; }

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

    injectContextualMarketing: function() {
        let pool = [...this.promoPool];
        const hour = new Date().getHours();
        let priorityPromo = null;

        if (hour >= 6 && hour < 12) {
            const idx = pool.findIndex(p => p.title.includes("Descompresión Matutina"));
            if(idx > -1) priorityPromo = pool.splice(idx, 1)[0];
        } else if (hour >= 17 && hour <= 23) {
            const idx = pool.findIndex(p => p.title.includes("Ritual del Ocaso"));
            if(idx > -1) priorityPromo = pool.splice(idx, 1)[0];
        }

        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }

        let finalPromos = [];
        if (priorityPromo) { finalPromos.push(priorityPromo); finalPromos.push(pool[0], pool[1]); } 
        else { finalPromos = pool.slice(0, 3); }

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

    updateWhatsAppLinks: function() {
        const waLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
        const phoneTarget = "5213348572070";
        const avatarStr = this.avatarNames[this.userData.avatar] || 'Alma Libre';
        let customMessage = "";

        if (this.userData.isRegistered) {
            customMessage = `Hola, mi nombre es ${this.userData.name}. Estoy navegando en su santuario digital y me gustaría recibir asesoría para agendar una sesión.`;
        } else {
            customMessage = `Hola, estoy explorando su santuario digital como invitado. Me gustaría recibir asesoría para conocer más sobre sus terapias y agendar una sesión.`;
        }

        const encodedMessage = encodeURIComponent(customMessage);
        waLinks.forEach(link => { link.href = `https://wa.me/${phoneTarget}?text=${encodedMessage}`; });
    }
};

window.addEventListener('DOMContentLoaded', () => UserEngine.init());
