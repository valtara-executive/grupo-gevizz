/**
 * ====================================================================================
 * BLOQUE 7: USER ENGINE V43.0 (IDENTIDAD SOBERANA, AURA SYNC & MULTI-AROMA)
 * ------------------------------------------------------------------------------------
 * Gestor de Perfil, Preferencias Múltiples de Aromaterapia (Bóveda del Paciente), 
 * Focus Trap Obligatorio para A11y, y Sincronización de Memoria con Aura AI.
 * ====================================================================================
 */

const UserEngine = {
    // ================================================================================
    // 1. MATRIZ DE DATOS DEL PACIENTE (Almacenamiento Local Seguro)
    // ================================================================================
    userData: {
        name: 'Paciente Soberano',
        isRegistered: false,
        aromaPreferences: [], // V43: Ahora es un Array para permitir selecciones múltiples
        lastVisit: null
    },

    // ================================================================================
    // 2. INICIALIZACIÓN DEL NÚCLEO DE IDENTIDAD
    // ================================================================================
    init: function() {
        console.log("🛡️ [USER ENGINE V43] Verificando identidad, A11y y Bóveda del paciente...");
        
        this.loadProfile();
        this.checkOnboarding();
        this.bindEvents();
        this.updateUI();
        this.initAromatherapy();
        this.updateWhatsAppLinks();
        
        // Intentar sincronizar con Aura AI después de un breve delay para asegurar su carga
        setTimeout(() => this.integrateWithAura(), 1500);
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
                
                // V43 Fix: Asegurar que aromaPreferences sea un array (por si viene de V42 como string)
                if (typeof this.userData.aromaPreferences === 'string') {
                    this.userData.aromaPreferences = [this.userData.aromaPreferences];
                }
                
                this.userData.lastVisit = new Date().toISOString();
                this.saveLocalData();
            }
        } catch (e) {
            console.error("🔴 [USER ENGINE] Error al descifrar la Bóveda Local:", e);
        }
    },

    saveLocalData: function() {
        localStorage.setItem('valtara_sovereign_profile', JSON.stringify(this.userData));
    },

    saveProfile: function(name, isGuest = false) {
        // Sanitización estricta contra XSS
        const sanitizedName = name.replace(/[<>\/\\'"{}]/g, '').trim().substring(0, 25);
        
        this.userData.name = isGuest ? 'Invitado VIP' : (sanitizedName || 'Paciente Soberano');
        this.userData.isRegistered = !isGuest;
        this.userData.lastVisit = new Date().toISOString();

        this.saveLocalData();
        console.log(`✨ [USER ENGINE] Identidad sellada: ${this.userData.name}`);
        
        this.hapticFeedback(20);
        this.updateUI();
        this.updateWhatsAppLinks();
        this.integrateWithAura(); // Notificamos a la IA del nuevo nombre
        this.hideOnboarding();
    },

    // ================================================================================
    // 4. ONBOARDING (TRAMPA DE FOCO A11Y Y BLOQUEO DE FONDO)
    // ================================================================================
    checkOnboarding: function() {
        const onboardingScreen = document.getElementById('onboarding-screen');
        const appWrapper = document.getElementById('app-wrapper');
        const heritageBg = document.getElementById('ambient-bg');

        if (!onboardingScreen) return;

        if (this.userData.isRegistered || this.userData.name === 'Invitado VIP') {
            // Paciente conocido: Ocultar onboarding, habilitar fondo para Screen Readers
            onboardingScreen.style.display = 'none';
            onboardingScreen.setAttribute('aria-hidden', 'true');
            if(appWrapper) appWrapper.setAttribute('aria-hidden', 'false');
            if(heritageBg) heritageBg.setAttribute('aria-hidden', 'true'); // El fondo vivo es decorativo
            document.body.style.overflow = 'auto';
            this.releaseFocusTrap();
        } else {
            // Paciente nuevo: Mostrar onboarding, ocultar el resto para Screen Readers
            onboardingScreen.style.display = 'flex';
            onboardingScreen.classList.remove('fade-out');
            onboardingScreen.setAttribute('aria-hidden', 'false');
            
            // Ocultamos todo el resto de la web a los lectores de pantalla ciegos
            if(appWrapper) appWrapper.setAttribute('aria-hidden', 'true');
            
            document.body.style.overflow = 'hidden';
            
            const inputField = document.getElementById('welcome-name-input');
            if(inputField) setTimeout(() => inputField.focus(), 800);
            
            this.initFocusTrap(onboardingScreen);
        }
    },

    hideOnboarding: function() {
        const onboardingScreen = document.getElementById('onboarding-screen');
        const appWrapper = document.getElementById('app-wrapper');

        if (onboardingScreen) {
            onboardingScreen.classList.add('fade-out');
            setTimeout(() => {
                onboardingScreen.style.display = 'none';
                onboardingScreen.setAttribute('aria-hidden', 'true');
                if(appWrapper) appWrapper.setAttribute('aria-hidden', 'false'); // Devolvemos la web al Screen Reader
                
                document.body.style.overflow = 'auto';
                this.releaseFocusTrap();
                
                // Mensaje de bienvenida inyectado en AURA
                if(window.AuraEngine) {
                    AuraEngine.appendMsg(`El santuario ha sido preparado para ti, ${this.userData.name}. Estoy a tu disposición para cualquier consulta de biomecánica o sonoterapia.`, 'bot');
                }
            }, 800); 
        }
    },

    // A11y: Evita que el usuario use TAB para salirse de la ventana de bienvenida
    initFocusTrap: function(modalEl) {
        this.focusTrapHandler = function(e) {
            const focusableEls = modalEl.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])');
            const firstEl = focusableEls[0];
            const lastEl = focusableEls[focusableEls.length - 1];

            if (e.key === 'Tab') {
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstEl) {
                        lastEl.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastEl) {
                        firstEl.focus();
                        e.preventDefault();
                    }
                }
            }
        };
        document.addEventListener('keydown', this.focusTrapHandler);
    },

    releaseFocusTrap: function() {
        if (this.focusTrapHandler) {
            document.removeEventListener('keydown', this.focusTrapHandler);
        }
    },

    bindEvents: function() {
        const nameInput = document.getElementById('welcome-name-input');
        const startBtn = document.getElementById('welcome-start-btn');
        const skipBtn = document.getElementById('welcome-skip-btn');
        const changeNameBtn = document.getElementById('btn-change-name-menu');
        const resetBtn = document.getElementById('btn-reset-session');

        // Validación dinámica del input
        if (nameInput && startBtn) {
            nameInput.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                if (val.length > 1) {
                    startBtn.style.pointerEvents = 'auto';
                    startBtn.style.background = 'var(--valtara-oro-brillante)';
                    startBtn.style.color = '#000';
                    startBtn.style.boxShadow = '0 0 20px rgba(242, 201, 76, 0.6)';
                    startBtn.setAttribute('aria-disabled', 'false');
                } else {
                    startBtn.style.pointerEvents = 'none';
                    startBtn.style.background = 'rgba(255,255,255,0.05)';
                    startBtn.style.color = '#666';
                    startBtn.style.boxShadow = 'none';
                    startBtn.setAttribute('aria-disabled', 'true');
                }
            });

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

        // Botones del Menú Lateral (Cerrar Sesión / Cambiar Nombre)
        if (changeNameBtn) {
            changeNameBtn.addEventListener('click', () => {
                this.hapticFeedback(15);
                // Vaciamos el nombre para que lo escriba de nuevo
                if(nameInput) nameInput.value = '';
                if(startBtn) {
                    startBtn.style.pointerEvents = 'none';
                    startBtn.style.background = 'rgba(255,255,255,0.05)';
                    startBtn.style.color = '#666';
                }
                
                // Mostrar el onboarding de nuevo
                const onboardingScreen = document.getElementById('onboarding-screen');
                const appWrapper = document.getElementById('app-wrapper');
                
                if(onboardingScreen) {
                    onboardingScreen.style.display = 'flex';
                    setTimeout(() => {
                        onboardingScreen.classList.remove('fade-out');
                        onboardingScreen.setAttribute('aria-hidden', 'false');
                        if(appWrapper) appWrapper.setAttribute('aria-hidden', 'true'); // Ocultar fondo a Screen Readers
                        document.body.style.overflow = 'hidden';
                        this.initFocusTrap(onboardingScreen);
                        if(nameInput) nameInput.focus();
                    }, 50);
                    if(window.Router) Router.closeSidebarOnMobile();
                }
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.hapticFeedback([20, 50, 20]);
                if(confirm("¿Estás seguro de que deseas cerrar tu sesión? Esto borrará tu nombre y tus preferencias de aromas del dispositivo local.")){
                    localStorage.removeItem('valtara_sovereign_profile');
                    location.reload();
                }
            });
        }
    },

    // ================================================================================
    // 5. ACTUALIZACIÓN DINÁMICA DE LA INTERFAZ (EL SALUDO INMORTAL)
    // ================================================================================
    updateUI: function() {
        const menuGreeting = document.getElementById('menu-greeting');
        const menuName = document.getElementById('menu-user-name');
        const vaultName = document.getElementById('vault-user-name');

        const hora = new Date().getHours();
        let greetingText = "Excelente noche,"; // Por defecto (19:00 a 05:59)
        
        if (hora >= 6 && hora < 12) {
            greetingText = "Excelente mañana,";
        } else if (hora >= 12 && hora < 19) {
            greetingText = "Buena tarde,";
        }

        // Aplicamos el saludo de forma garantizada
        if (menuGreeting) menuGreeting.innerText = greetingText;
        if (menuName) menuName.innerText = this.userData.name;
        if (vaultName) vaultName.innerText = this.userData.name;
    },

    // ================================================================================
    // 6. BÓVEDA DEL PACIENTE: MOTOR DE AROMATERAPIA MÚLTIPLE (CHECKBOX HACK)
    // ================================================================================
    initAromatherapy: function() {
        // En el HTML actual están como type="radio". Para permitir múltiples sin que toques el HTML,
        // el JS los convertirá dinámicamente a type="checkbox". Magia pura.
        const aromaInputs = document.querySelectorAll('input[name="aroma_pref"]');
        const whatsappBtn = document.querySelector('button[aria-label="Enviar mis preferencias de aromaterapia a WhatsApp"]');

        if (aromaInputs.length === 0) return;

        aromaInputs.forEach(input => {
            // Transformación al vuelo a Checkbox para multi-selección
            input.setAttribute('type', 'checkbox');
            
            // Cargar preferencias guardadas
            if (this.userData.aromaPreferences.includes(input.value)) {
                input.checked = true;
            }

            // Escuchar cambios
            input.addEventListener('change', (e) => {
                if(e.target.checked) {
                    if(!this.userData.aromaPreferences.includes(e.target.value)) {
                        this.userData.aromaPreferences.push(e.target.value);
                    }
                } else {
                    this.userData.aromaPreferences = this.userData.aromaPreferences.filter(val => val !== e.target.value);
                }
                
                this.saveLocalData();
                this.hapticFeedback(15);
                this.updateVaultWhatsAppButton(whatsappBtn);
                this.integrateWithAura(); // Notificamos a la IA que el paciente cambió sus gustos
            });
        });

        // Inicializar el botón de la bóveda
        this.updateVaultWhatsAppButton(whatsappBtn);
    },

    // ================================================================================
    // 7. GENERADOR DE WHATSAPP DINÁMICO Y SOBERANO
    // ================================================================================
    updateVaultWhatsAppButton: function(btn) {
        if (!btn) return;
        
        const phoneTarget = "5213348572070";
        const hora = new Date().getHours();
        const saludo = (hora >= 6 && hora < 12) ? "Buenos días" : (hora >= 12 && hora < 19) ? "Buenas tardes" : "Buenas noches";
        
        let customMessage = `${saludo} Concierge Valtara, soy ${this.userData.name}.`;
        
        if (this.userData.aromaPreferences && this.userData.aromaPreferences.length > 0) {
            // Unir aromas con comas y una "y" al final si son múltiples
            const aromasText = this.userData.aromaPreferences.join(", ").replace(/,([^,]*)$/, ' y$1');
            customMessage += ` Para mi próxima sesión en el santuario, requiero el siguiente ambiente olfativo: *${aromasText}*. Te adjunto la captura de pantalla de mi Bóveda Soberana como respaldo.`;
        } else {
            customMessage += ` Estoy configurando mi Bóveda Soberana y pronto te enviaré mis preferencias.`;
        }

        const encodedMessage = encodeURIComponent(customMessage);
        
        btn.onclick = () => {
            this.hapticFeedback([10, 30, 10]);
            window.open(`https://wa.me/${phoneTarget}?text=${encodedMessage}`, '_blank');
        };
    },

    updateWhatsAppLinks: function() {
        const waLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
        const phoneTarget = "5213348572070";
        let customMessage = "";

        if (this.userData.isRegistered) {
            customMessage = `Hola Concierge, mi nombre es ${this.userData.name}. Solicito asesoría ejecutiva para agendar una intervención biomecánica en su santuario.`;
        } else {
            customMessage = `Hola Concierge, me encuentro explorando su santuario digital como invitado. Solicito asesoría para conocer más sobre sus terapias de ultra-lujo.`;
        }

        const encodedMessage = encodeURIComponent(customMessage);
        waLinks.forEach(link => { 
            // Ignoramos el botón de la bóveda para no sobrescribir sus opciones múltiples
            if(link.getAttribute('aria-label') !== "Enviar mis preferencias de aromaterapia a WhatsApp") {
                link.href = `https://wa.me/${phoneTarget}?text=${encodedMessage}`; 
            }
        });
    },

    // ================================================================================
    // 8. CONEXIÓN NEURONAL CON AURA AI (NUEVA INTEGRACIÓN V43)
    // Le permite a la IA saber quién está hablando y qué le gusta.
    // ================================================================================
    integrateWithAura: function() {
        if (window.AuraEngine && typeof window.AuraEngine.updatePatientContext === 'function') {
            AuraEngine.updatePatientContext({
                nombre: this.userData.name,
                isRegistered: this.userData.isRegistered,
                aromasPreferidos: this.userData.aromaPreferences
            });
            console.log("🧠 [USER ENGINE] Sincronización neuronal con Aura AI completada.");
        } else {
            // Si Aura no tiene el método aún, lo guardamos en una variable global para que Aura lo tome al nacer
            window.ValtaraSovereignContext = {
                nombre: this.userData.name,
                aromasPreferidos: this.userData.aromaPreferences
            };
        }
    }
};

// Arrancar el motor de Identidad
document.addEventListener('DOMContentLoaded', () => {
    UserEngine.init();
});
