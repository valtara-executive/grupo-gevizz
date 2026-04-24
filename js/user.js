/**
 * ====================================================================================
 * USER ENGINE V40.0 — IDENTIDAD SOBERANA & SINCRONIZACIÓN TOTAL
 * ------------------------------------------------------------------------------------
 * Responsabilidades:
 * 1. Onboarding (pantalla de bienvenida con nombre)
 * 2. Saludo dinámico: "Buenos días / tardes / noches, [Nombre]"
 * 3. Doble persistencia: valtara_sovereign_profile (JSON completo)
 *                         valtara_user_name (string simple, leído por router.js)
 * 4. Conexión con AuraEngine para contexto del paciente
 * 5. Botones de configuración dentro del panel "Más"
 *
 * Archivo: js/user.js
 * Ubicación: carpeta js/ (misma que core.js y router.js)
 * ====================================================================================
 */

const UserEngine = {

    userData: {
        name: 'Invitado',
        isRegistered: false,
        aromaPreferences: [],
        lastVisit: null
    },

    // ================================================================================
    // 1. INICIO
    // ================================================================================
    init: function() {
        console.log('🛡️ [USER ENGINE V40.0] Sincronizando identidad...');
        this.loadProfile();
        this.checkOnboarding();
        this.bindEvents();
        this.updateUI();
        this.initAromatherapy();
        this.integrateWithAura();
        this.startGreetingClock(); // Saludo dinámico que se mantiene actualizado
    },

    // ================================================================================
    // 2. CARGA DE PERFIL DESDE DISCO
    // ================================================================================
    loadProfile: function() {
        try {
            const stored = localStorage.getItem('valtara_sovereign_profile');
            if (stored) {
                const parsed = JSON.parse(stored);
                this.userData = Object.assign(this.userData, parsed);
            }
        } catch (e) {
            console.warn('[USER] Error al leer perfil guardado:', e);
        }
    },

    // ================================================================================
    // 3. CONTROL DE ONBOARDING
    // ================================================================================
    checkOnboarding: function() {
        const onboarding = document.getElementById('onboarding-screen');
        if (!onboarding) return;

        if (this.userData.isRegistered) {
            onboarding.style.transition = 'opacity 0.8s ease';
            onboarding.style.opacity = '0';
            setTimeout(() => {
                onboarding.style.display = 'none';
                onboarding.setAttribute('aria-hidden', 'true');
            }, 800);
        } else {
            onboarding.style.display = 'flex';
            onboarding.setAttribute('aria-hidden', 'false');
            // Enfocar el input de nombre automáticamente para accesibilidad
            setTimeout(() => {
                const input = document.getElementById('welcome-name-input');
                if (input) input.focus();
            }, 400);
        }
    },

    // ================================================================================
    // 4. EVENTOS DE LA PANTALLA DE ONBOARDING Y PANEL MÁS
    // ================================================================================
    bindEvents: function() {
        const nameInput  = document.getElementById('welcome-name-input');
        const startBtn   = document.getElementById('welcome-start-btn');
        const skipBtn    = document.getElementById('welcome-skip-btn');
        const changeBtn  = document.getElementById('btn-change-name-menu');
        const resetBtn   = document.getElementById('btn-reset-session');

        // --- Validar input para habilitar botón de entrada ---
        if (nameInput && startBtn) {
            nameInput.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                const valid = val.length >= 2;
                startBtn.style.pointerEvents  = valid ? 'auto' : 'none';
                startBtn.style.background     = valid ? 'var(--valtara-oro-brillante, #F2C94C)' : 'rgba(255,255,255,0.05)';
                startBtn.style.color          = valid ? '#000' : '#666';
                startBtn.style.borderColor    = valid ? 'var(--valtara-oro-brillante, #F2C94C)' : 'transparent';
                startBtn.style.opacity        = valid ? '1' : '0.5';
                startBtn.setAttribute('aria-disabled', valid ? 'false' : 'true');
            });

            // Enter en el input = confirmar
            nameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && nameInput.value.trim().length >= 2) {
                    this.saveProfile(nameInput.value.trim());
                }
            });

            startBtn.addEventListener('click', () => {
                const val = nameInput.value.trim();
                if (val.length >= 2) this.saveProfile(val);
            });
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.skipOnboarding());
        }

        // --- Cambiar nombre desde el panel "Más" ---
        if (changeBtn) {
            changeBtn.addEventListener('click', () => {
                const nuevoNombre = prompt(
                    `¿Cuál es tu nombre o apodo, ${this.userData.name}?`,
                    this.userData.name
                );
                if (nuevoNombre && nuevoNombre.trim().length >= 2) {
                    this.saveProfile(nuevoNombre.trim());
                    if (window.A11yEngine) A11yEngine.announce(`Nombre actualizado a ${nuevoNombre.trim()}`);
                }
            });
        }

        // --- Cerrar sesión desde el panel "Más" ---
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                const confirmar = confirm('¿Deseas cerrar sesión y borrar tus datos locales?');
                if (confirmar) {
                    this.resetSession();
                }
            });
        }
    },

    // ================================================================================
    // 5. ACTUALIZACIÓN DE LA INTERFAZ
    // ================================================================================
    updateUI: function() {
        // Nombre en el menú lateral
        const menuName = document.getElementById('menu-user-name');
        if (menuName) menuName.textContent = this.userData.name;

        // Nombre en la bóveda del paciente
        const vaultName = document.getElementById('vault-user-name');
        if (vaultName) vaultName.textContent = this.userData.name;

        // Saludo en el menú lateral
        this.updateGreeting();

        // Avatar: cambiar ícono si es usuario registrado
        const avatar = document.getElementById('sidebar-avatar-icon');
        if (avatar) {
            avatar.innerHTML = this.userData.isRegistered && this.userData.name !== 'Invitado'
                ? `<i class="fa-solid fa-user-check" style="color:var(--valtara-oro);"></i>`
                : `<i class="fa-solid fa-spa"></i>`;
        }
    },

    // ================================================================================
    // 6. SALUDO DINÁMICO POR HORA DEL DÍA
    // Buenos días (6-11) / Buenas tardes (12-18) / Buenas noches (19-5)
    // ================================================================================
    getGreeting: function() {
        const hour = new Date().getHours();
        if (hour >= 6  && hour < 12) return 'Buenos días';
        if (hour >= 12 && hour < 19) return 'Buenas tardes';
        return 'Buenas noches';
    },

    updateGreeting: function() {
        const greetingEl = document.getElementById('menu-greeting');
        if (!greetingEl) return;
        const saludo = this.getGreeting();
        const nombre = this.userData.name;
        greetingEl.textContent = `${saludo},`;
        greetingEl.setAttribute('aria-label', `${saludo}, ${nombre}`);
    },

    // Reloj que actualiza el saludo automáticamente al cambiar de franja horaria
    startGreetingClock: function() {
        this.updateGreeting();
        // Verificar cada 5 minutos si cambió la franja horaria
        setInterval(() => this.updateGreeting(), 5 * 60 * 1000);
    },

    // ================================================================================
    // 7. AROMATERAPIA (preferencias en expediente)
    // ================================================================================
    initAromatherapy: function() {
        document.querySelectorAll('input[name="aroma_pref"]').forEach(cb => {
            if (this.userData.aromaPreferences.includes(cb.value)) {
                cb.checked = true;
            }
            cb.addEventListener('change', () => {
                const selected = Array.from(
                    document.querySelectorAll('input[name="aroma_pref"]:checked')
                ).map(c => c.value);
                this.userData.aromaPreferences = selected;
                this.saveToDisk();
                this.integrateWithAura();
            });
        });
    },

    // ================================================================================
    // 8. GUARDAR PERFIL AL COMPLETAR ONBOARDING
    // ================================================================================
    saveProfile: function(name) {
        this.userData.name         = name || 'Paciente';
        this.userData.isRegistered = true;
        this.userData.lastVisit    = new Date().toISOString();
        this.saveToDisk();
        this.updateUI();
        this.checkOnboarding();
        this.integrateWithAura();

        console.log(`✅ [USER ENGINE] Perfil guardado: ${this.userData.name}`);
    },

    skipOnboarding: function() {
        this.userData.name         = 'Invitado';
        this.userData.isRegistered = true;
        this.saveToDisk();
        this.updateUI();
        this.checkOnboarding();
    },

    // ================================================================================
    // 9. PERSISTENCIA DUAL — JSON completo + string simple
    // valtara_sovereign_profile → usado por user.js y expediente_clinico.js
    // valtara_user_name         → usado por router.js al renderizar la bóveda
    // ================================================================================
    saveToDisk: function() {
        try {
            localStorage.setItem('valtara_sovereign_profile', JSON.stringify(this.userData));
            localStorage.setItem('valtara_user_name', this.userData.name);
        } catch (e) {
            console.warn('[USER] No se pudo guardar en localStorage:', e);
        }
    },

    // ================================================================================
    // 10. CERRAR SESIÓN
    // ================================================================================
    resetSession: function() {
        try {
            localStorage.removeItem('valtara_sovereign_profile');
            localStorage.removeItem('valtara_user_name');
            localStorage.removeItem('valtara_a11y_preferences');
        } catch(e) {}
        this.userData = { name: 'Invitado', isRegistered: false, aromaPreferences: [], lastVisit: null };
        this.updateUI();
        // Mostrar onboarding de nuevo
        const onboarding = document.getElementById('onboarding-screen');
        if (onboarding) {
            onboarding.style.display = 'flex';
            onboarding.style.opacity = '1';
            onboarding.setAttribute('aria-hidden', 'false');
        }
        // Cerrar el panel lateral si estaba abierto
        const nav = document.getElementById('main-nav');
        if (nav) {
            nav.classList.remove('open');
            if (window.CoreEngine) CoreEngine.unlockBodyScroll();
        }
    },

    // ================================================================================
    // 11. CONEXIÓN CON AURA AI
    // ================================================================================
    integrateWithAura: function() {
        // Exponer contexto globalmente para que AuraEngine lo lea
        window.ValtaraPatientContext = {
            nombre:      this.userData.name,
            saludo:      this.getGreeting(),
            aromas:      this.userData.aromaPreferences,
            registrado:  this.userData.isRegistered,
            ultimaVisita: this.userData.lastVisit
        };

        // Si AuraEngine ya está cargado, notificarle directamente
        if (window.AuraEngine && typeof window.AuraEngine.updatePatientContext === 'function') {
            window.AuraEngine.updatePatientContext(window.ValtaraPatientContext);
        }
    }
};

// Arrancar el motor de usuario
document.addEventListener('DOMContentLoaded', () => {
    UserEngine.init();
});
