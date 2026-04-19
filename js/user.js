/**
 * ====================================================================================
 * BLOQUE 7: USER ENGINE V42.0 (IDENTIDAD SOBERANA & CONCIERGE DIGITAL)
 * ------------------------------------------------------------------------------------
 * Gestor de Perfil, Preferencias de Aromaterapia (Bóveda del Paciente), 
 * Generador Dinámico de Enlaces de WhatsApp y Control de Onboarding Minimalista.
 * ====================================================================================
 */

const UserEngine = {
    // ================================================================================
    // 1. MATRIZ DE DATOS DEL PACIENTE (Almacenamiento Local Seguro)
    // ================================================================================
    userData: {
        name: 'Paciente Soberano',
        isRegistered: false,
        aromaPreference: 'Ninguno seleccionado', // Nueva integración V42
        lastVisit: null
    },

    // Pool de promociones ejecutivas (Tono de Ultra-Lujo)
    promoPool: [
        { icon: "fa-sun", color: "var(--valtara-oro-brillante)", title: "Privilegio Matutino", desc: "El silencio de la mañana es para los visionarios. Reserve su santuario entre las 9:00 AM y 12:00 PM y reciba un <strong>20% de cortesía corporativa</strong>." },
        { icon: "fa-id-card-clip", color: "var(--valtara-cian-brillante)", title: "Valtara Sovereign Card", desc: "La constancia es la clave del alto rendimiento. Al completar dos intervenciones biomecánicas, <strong>su tercera sesión recibirá un 50% de cortesía</strong>." },
        { icon: "fa-leaf", color: "var(--v-verde-quetzal)", title: "Upgrade Botánico", desc: "Eleve su experiencia. En la reserva de cualquier Masaje Neuro-Adaptativo de 90 minutos, incluimos <strong>Aromaterapia Premium y Piedras Calientes sin costo adicional</strong>." },
        { icon: "fa-crown", color: "var(--valtara-oro)", title: "Membresía Ejecutiva", desc: "Para quienes exigen la perfección continua. Adquiera nuestro paquete de 5 sesiones y <strong>obtenga la sexta intervención biomecánica como cortesía total</strong>." }
    ],

    // ================================================================================
    // 2. INICIALIZACIÓN DEL NÚCLEO DE IDENTIDAD
    // ================================================================================
    init: function() {
        console.log("🛡️ [USER ENGINE V42] Verificando identidad y bóveda del paciente...");
        
        this.loadProfile();
        this.checkOnboarding();
        this.bindEvents();
        this.updateUI();
        this.initAromatherapy();
        this.updateWhatsAppLinks();
        this.generatePromos();
    },

    // Utilidad: Conexión con el Motor Háptico del Core (Si existe)
    hapticFeedback: function(pattern) {
        if(window.CoreEngine && typeof CoreEngine.triggerVibration === 'function') {
            CoreEngine.triggerVibration(pattern);
        }
    },

    // ================================================================================
    // 3. GESTIÓN DE PERFIL Y MEMORIA LOCAL
    // ================================================================================
    loadProfile: function() {
        try {
            const savedData = localStorage.getItem('valtara_sovereign_profile');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                this.userData = { ...this.userData, ...parsed };
                // Actualizar fecha de última visita silenciosamente
                this.userData.lastVisit = new Date().toISOString();
                localStorage.setItem('valtara_sovereign_profile', JSON.stringify(this.userData));
            }
        } catch (e) {
            console.error("🔴 [USER ENGINE] Error al descifrar la Bóveda Local:", e);
        }
    },

    saveProfile: function(name, isGuest = false) {
        // Sanitización estricta contra XSS
        const sanitizedName = name.replace(/[<>\/\\'"{}]/g, '').trim().substring(0, 25);
        
        this.userData.name = isGuest ? 'Invitado VIP' : (sanitizedName || 'Paciente Soberano');
        this.userData.isRegistered = !isGuest;
        this.userData.lastVisit = new Date().toISOString();

        localStorage.setItem('valtara_sovereign_profile', JSON.stringify(this.userData));
        console.log(`✨ [USER ENGINE] Identidad sellada: ${this.userData.name}`);
        
        this.hapticFeedback(20);
        this.updateUI();
        this.updateWhatsAppLinks();
        this.hideOnboarding();
    },

    // ================================================================================
    // 4. ONBOARDING (EL PORTAL DE ENTRADA)
    // ================================================================================
    checkOnboarding: function() {
        const onboardingScreen = document.getElementById('onboarding-screen');
        if (!onboardingScreen) return;

        if (this.userData.isRegistered || this.userData.name === 'Invitado VIP') {
            // El paciente ya existe, ocultar pantalla inmediatamente
            onboardingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            // Es un paciente nuevo, bloquear scroll y mostrar pantalla
            onboardingScreen.classList.remove('fade-out');
            document.body.style.overflow = 'hidden';
            
            const inputField = document.getElementById('welcome-name-input');
            if(inputField) setTimeout(() => inputField.focus(), 800);
        }
    },

    hideOnboarding: function() {
        const onboardingScreen = document.getElementById('onboarding-screen');
        if (onboardingScreen) {
            onboardingScreen.classList.add('fade-out');
            setTimeout(() => {
                onboardingScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
                // Mensaje de bienvenida de AURA
                if(window.AuraEngine) {
                    AuraEngine.appendMsg(`Bienvenido al santuario, ${this.userData.name}. Estoy a tu disposición para cualquier consulta biomecánica.`, 'bot');
                }
            }, 800); // Coincide con la transición CSS
        }
    },

    bindEvents: function() {
        const nameInput = document.getElementById('welcome-name-input');
        const startBtn = document.getElementById('welcome-start-btn');
        const skipBtn = document.getElementById('welcome-skip-btn');
        const changeNameBtn = document.getElementById('btn-change-name-menu');
        const resetBtn = document.getElementById('btn-reset-session');

        // Lógica de Validación de Input (Solo activa el botón si hay texto)
        if (nameInput && startBtn) {
            nameInput.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                if (val.length > 1) {
                    startBtn.style.pointerEvents = 'auto';
                    startBtn.style.background = 'var(--valtara-oro-brillante)';
                    startBtn.style.color = '#000';
                    startBtn.style.boxShadow = '0 0 20px rgba(242, 201, 76, 0.5)';
                } else {
                    startBtn.style.pointerEvents = 'none';
                    startBtn.style.background = 'rgba(255,255,255,0.05)';
                    startBtn.style.color = '#666';
                    startBtn.style.boxShadow = 'none';
                }
            });

            // Permitir usar "Enter" para confirmar
            nameInput.addEventListener('keypress', (e) => {
                if(e.key === 'Enter' && nameInput.value.trim().length > 1) {
                    e.preventDefault();
                    startBtn.click();
                }
            });

            startBtn.addEventListener('click', () => {
                this.saveProfile(nameInput.value, false);
            });
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                this.saveProfile('', true);
            });
        }

        // Botones del Menú Lateral
        if (changeNameBtn) {
            changeNameBtn.addEventListener('click', () => {
                this.hapticFeedback(15);
                const onboardingScreen = document.getElementById('onboarding-screen');
                if(onboardingScreen) {
                    onboardingScreen.style.display = 'flex';
                    // Pequeño delay para asegurar que el display:flex tome efecto antes de quitar el fade
                    setTimeout(() => onboardingScreen.classList.remove('fade-out'), 50);
                    if(window.Router) Router.closeSidebarOnMobile();
                }
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.hapticFeedback([20, 50, 20]);
                if(confirm("¿Estás seguro de que deseas cerrar tu sesión? Esto borrará tus preferencias del dispositivo local.")){
                    localStorage.removeItem('valtara_sovereign_profile');
                    location.reload();
                }
            });
        }
    },

    updateUI: function() {
        const menuGreeting = document.getElementById('menu-greeting');
        const menuName = document.getElementById('menu-user-name');
        const vaultName = document.getElementById('vault-user-name');

        const isMorning = new Date().getHours() < 12;
        const isAfternoon = new Date().getHours() >= 12 && new Date().getHours() < 19;
        let greetingText = isMorning ? "Excelente mañana," : (isAfternoon ? "Buena tarde," : "Excelente noche,");

        if (menuGreeting) menuGreeting.innerText = greetingText;
        if (menuName) menuName.innerText = this.userData.name;
        if (vaultName) vaultName.innerText = this.userData.name;
    },

    // ================================================================================
    // 5. BÓVEDA DEL PACIENTE: MOTOR DE AROMATERAPIA
    // ================================================================================
    initAromatherapy: function() {
        const aromaRadios = document.querySelectorAll('input[name="aroma_pref"]');
        const whatsappBtn = document.querySelector('button[aria-label="Enviar mis preferencias de aromaterapia a WhatsApp"]');

        if (aromaRadios.length === 0) return;

        // 1. Cargar preferencia guardada (si existe)
        if (this.userData.aromaPreference && this.userData.aromaPreference !== 'Ninguno seleccionado') {
            aromaRadios.forEach(radio => {
                if (radio.value === this.userData.aromaPreference) {
                    radio.checked = true;
                }
            });
        }

        // 2. Escuchar cambios de selección
        aromaRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if(e.target.checked) {
                    this.userData.aromaPreference = e.target.value;
                    localStorage.setItem('valtara_sovereign_profile', JSON.stringify(this.userData));
                    this.hapticFeedback(20);
                    console.log(`[USER ENGINE] Aroma fijado: ${this.userData.aromaPreference}`);
                    this.updateVaultWhatsAppButton(whatsappBtn);
                }
            });
        });

        // 3. Inicializar el botón de la bóveda
        this.updateVaultWhatsAppButton(whatsappBtn);
    },

    updateVaultWhatsAppButton: function(btn) {
        if (!btn) return;
        
        const phoneTarget = "5213348572070";
        let customMessage = `Hola Concierge Valtara, soy ${this.userData.name}.`;
        
        if (this.userData.aromaPreference && this.userData.aromaPreference !== 'Ninguno seleccionado') {
            customMessage += ` Para mi próxima sesión en el santuario, he seleccionado el ambiente olfativo: *${this.userData.aromaPreference}*. Te adjunto la captura de pantalla de mi Bóveda Soberana como respaldo.`;
        } else {
            customMessage += ` Estoy configurando mi Bóveda Soberana y pronto te enviaré mis preferencias.`;
        }

        const encodedMessage = encodeURIComponent(customMessage);
        
        // Reemplazamos el onclick genérico del HTML por la redirección real
        btn.onclick = () => {
            this.hapticFeedback([10, 30, 10]);
            window.open(`https://wa.me/${phoneTarget}?text=${encodedMessage}`, '_blank');
        };
    },

    // ================================================================================
    // 6. ENLACES GLOBALES DE WHATSAPP (BOTONES FLOTANTES Y MASAJES)
    // ================================================================================
    updateWhatsAppLinks: function() {
        // Seleccionamos todos los enlaces de WhatsApp de la plataforma, excepto los que no sean "a"
        const waLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
        const phoneTarget = "5213348572070";
        let customMessage = "";

        if (this.userData.isRegistered) {
            customMessage = `Hola Concierge, mi nombre es ${this.userData.name}. Me encuentro explorando el santuario digital y solicito asesoría ejecutiva para agendar una intervención biomecánica.`;
        } else {
            customMessage = `Hola Concierge, me encuentro explorando su santuario digital como invitado. Solicito asesoría para conocer más sobre sus terapias de ultra-lujo y agendar una sesión.`;
        }

        const encodedMessage = encodeURIComponent(customMessage);
        waLinks.forEach(link => { 
            link.href = `https://wa.me/${phoneTarget}?text=${encodedMessage}`; 
        });
    },

    // ================================================================================
    // 7. GENERADOR DE PRIVILEGIOS Y PROMOCIONES (DYNAMIC INJECTION)
    // ================================================================================
    generatePromos: function() {
        const pool = [...this.promoPool];
        let finalPromos = [];

        // Algoritmo para seleccionar promociones aleatorias (Máximo 3)
        if (pool.length >= 3) {
            for (let i = pool.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [pool[i], pool[j]] = [pool[j], pool[i]];
            }
            finalPromos = pool.slice(0, 3);
        } else { 
            finalPromos = pool; 
        }

        for (let i = 0; i < finalPromos.length; i++) {
            const titleEl = document.getElementById(`promo${i+1}-title`);
            const textEl = document.getElementById(`promo${i+1}-text`);
            if (titleEl && textEl) {
                // Aplicar estilos de lujo
                titleEl.style.color = finalPromos[i].color;
                titleEl.style.textShadow = `0 0 10px ${finalPromos[i].color}40`;
                titleEl.innerHTML = `<i class="fa-solid ${finalPromos[i].icon}"></i> ${finalPromos[i].title}`;
                textEl.innerHTML = finalPromos[i].desc;
            }
        }
    }
};

// Arrancar el motor de Identidad
document.addEventListener('DOMContentLoaded', () => {
    UserEngine.init();
});
