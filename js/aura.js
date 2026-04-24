/**
 * ====================================================================================
 * AURA AI ENGINE V40.0 — SENSORY UPDATE PRO
 * ------------------------------------------------------------------------------------
 * Mejoras V40.0:
 * - Sonido de espera tipo llamada telefónica (turu-turu-turu) con Web Audio API puro
 * - Contexto ampliado del negocio: masajes, manicura, sonoterapia, ubicaciones
 * - Enlace directo a WhatsApp e Instagram de la manicurista al preguntar por uñas
 * - Auto-envío al terminar de dictar por voz (speech-to-text)
 * - Diseño e interfaz sin cambios — solo mejoras internas
 *
 * Archivo: js/aura.js
 * Ubicación: carpeta js/
 * ====================================================================================
 */

// ====================================================================================
// 1. MOTOR SENSORIAL — Sonidos y vibración
// ====================================================================================
const AuraSensory = {
    ctx: null,
    ringInterval: null,
    ringOsc: null,
    ringGain: null,

    init: function() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) this.ctx = new AudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    },

    playTone: function(freq, type, duration, vol = 0.12, startDelay = 0) {
        if (!this.ctx) return;
        try {
            const osc  = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const t    = this.ctx.currentTime + startDelay;
            osc.type = type;
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(vol, t + 0.02);
            gain.gain.setValueAtTime(vol, t + duration - 0.03);
            gain.gain.linearRampToValueAtTime(0, t + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + duration);
        } catch(e) {}
    },

    // ── POP DOBLE al enviar mensaje ──────────────────────────────────
    playSend: function() {
        this.init();
        this.playTone(520, 'sine', 0.08, 0.18, 0);
        this.playTone(660, 'sine', 0.08, 0.22, 0.1);
        if (navigator.vibrate) navigator.vibrate([10, 20, 10]);
    },

    // ── TURU-TURU-TURU — Sonido de llamada / espera tipo Messenger ──
    // Patrón: bip (0.22s) + silencio (0.12s) + bip (0.22s) + pausa (1.4s) + repite
    startThinking: function() {
        this.init();
        if (!this.ctx) return;

        let cycle = 0;
        const ringPattern = () => {
            try {
                // Primer tono del par "turu"
                this.playTone(480, 'triangle', 0.22, 0.14, 0);
                // Segundo tono del par "turu"
                this.playTone(480, 'triangle', 0.22, 0.14, 0.34);
                // Tercer tono del par "turu" (3 tonos = efecto de timbrado)
                this.playTone(480, 'triangle', 0.22, 0.14, 0.68);
            } catch(e) {}
            cycle++;
        };

        ringPattern(); // Primer ciclo inmediato
        this.ringInterval = setInterval(ringPattern, 2000); // Cada 2s
    },

    stopThinking: function() {
        if (this.ringInterval) {
            clearInterval(this.ringInterval);
            this.ringInterval = null;
        }
    },

    // ── ACORDE DE CRISTAL al recibir respuesta ───────────────────────
    playReceive: function() {
        this.init();
        this.stopThinking();
        this.playTone(880,    'sine', 0.35, 0.10, 0);
        this.playTone(1108.7, 'sine', 0.55, 0.14, 0.15);
        this.playTone(1318.5, 'sine', 0.40, 0.08, 0.30);
        if (navigator.vibrate) navigator.vibrate([15, 40, 15]);
    }
};

// ====================================================================================
// 2. CONTEXTO DEL NEGOCIO — Inyectado en cada conversación
//    Permite que la IA conozca a Valtara aunque el servidor no tenga todo el contexto
// ====================================================================================
const VALTARA_CONTEXT = `
Eres AURA, la asistente de inteligencia artificial de VALTARA Executive Therapy & Biomechanics, operado por Grupo Gevizz S.A.S.

SOBRE LA EMPRESA:
- Nombre comercial: Valtara Executive Therapy & Biomechanics
- Razón social: Grupo Gevizz S.A.S.
- Sede principal: Paseo de la Reforma 195, Piso 3, Colonia Cuauhtémoc, CDMX (junto al World Trade Center y el Ángel de la Independencia)
- Cobertura de servicio a domicilio: CDMX completa, Tizayuca (Los Héroes), Pachuca de Soto, Estado de México, Morelos y Zona Metropolitana
- WhatsApp principal: +52 1 33 4857 2070
- Horario: Lunes a Sábado, 9:00 AM – 9:00 PM

CATÁLOGO DE MASAJES Y PRECIOS (en pesos mexicanos MXN):
- Masaje Relajante Neuro-Adaptativo 50 min — $799
- Masaje Relajante Neuro-Adaptativo 90 min — $999
- Masaje Deportivo y Descompresión Muscular — $829
- Masaje Tailandés / Yoga Pasivo — $829
- Masaje Ayurveda & Aromaterapia — $929
- Ritual Lomi Lomi Supremo — $1,199
- Drenaje Linfático Manual — $849
- Masaje Reductivo con Maderoterapia (paquete 10 sesiones) — $6,199
- Chocolaterapia Facial (se incluye gratis en la segunda cita) — Regalo exclusivo

DIVISIÓN ART & NAILS — MANICURA Y ESTÉTICA:
- Especialistas en manicura de autor, alta gama y diseño artístico
- Servicios: Sistemas Rubber Base, Gel Semipermanente, Acrílico, Esculpido, Nail Art, Pedicura SPA con asepsia clínica
- WhatsApp directo de la manicurista: +52 55 2524 8816 (https://wa.me/525525248816)
- Instagram de la manicurista: @art.nails02 (https://www.instagram.com/art.nails02)
- La manicurista trabaja bajo los estándares de esterilización clínica de Valtara

SALA INMERSIVA DE SONOTERAPIA:
- Sesiones de terapia de ondas alfa y delta para reducción de Burnout corporativo
- Música binaural y frecuencias Solfeggio diseñadas para restaurar el equilibrio neuronal
- Disponible en sesión presencial y como experiencia guiada vía la app

FILOSOFÍA:
- Valtara atiende a ejecutivos, profesionistas de alto rendimiento, personas con discapacidad y cualquier persona que busque bienestar de calidad
- Inclusión total: accesibilidad para personas con movilidad reducida, discapacidad visual y cognitiva
- Lema: "Lujo accesible, ciencia con alma"

INSTRUCCIONES DE COMPORTAMIENTO:
- Siempre saluda al paciente por su nombre si lo conoces
- Sé empática, profesional y cálida. Usa un tono ejecutivo pero humano
- Cuando el usuario pregunte por uñas, manicura, nail art, acrílico, gel o pedicura, proporciona SIEMPRE los contactos de la manicurista
- Cuando el usuario quiera agendar, envíalo al WhatsApp principal de Valtara
- Responde en español mexicano
- Nunca inventes precios ni servicios que no estén en este contexto
`.trim();

// ====================================================================================
// 3. CEREBRO DE AURA — Lógica, UI y conexión de producción
// ====================================================================================
const AuraEngine = {
    isOpen: false,
    isTyping: false,
    chatHistory: [],
    userName: 'Invitado',

    // URL de producción — no modificar
    apiUrl: 'https://aura-server-erfj.vercel.app/api/chat',

    recognition: null,
    isRecording: false,
    activeSpeakBtn: null,

    // ── INICIO ───────────────────────────────────────────────────────
    init: function() {
        this.refreshIdentity();
        this.forceInjectStyles();
        this.initVoiceEngines();
        this.bindEvents();
        this.enableInputs();

        window.addEventListener('valtaraIdentityUpdated', () => this.refreshIdentity());
        window.addEventListener('click',       () => AuraSensory.init(), { once: true });
        window.addEventListener('touchstart',  () => AuraSensory.init(), { once: true });
    },

    // ── DESBLOQUEAR TECLADO Y MICRÓFONO DESDE EL INICIO ─────────────
    enableInputs: function() {
        const inputField = document.getElementById('aura-input');
        const micBtn     = document.getElementById('aura-mic-btn');
        if (inputField) { inputField.disabled = false; inputField.style.pointerEvents = 'auto'; }
        if (micBtn)     { micBtn.disabled = false; micBtn.style.pointerEvents = 'auto'; micBtn.style.opacity = '1'; }
    },

    // ── LEER NOMBRE DEL PACIENTE ──────────────────────────────────────
    refreshIdentity: function() {
        try {
            // Leer de ambas fuentes para compatibilidad total
            const simple = localStorage.getItem('valtara_user_name');
            if (simple && simple !== 'Invitado VIP' && simple !== 'Invitado') {
                this.userName = simple;
                return;
            }
            const stored = localStorage.getItem('valtara_sovereign_profile');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.name && parsed.name !== 'Invitado VIP' && parsed.name !== 'Invitado') {
                    this.userName = parsed.name;
                    return;
                }
            }
            this.userName = 'Invitado';
        } catch(e) { this.userName = 'Invitado'; }
    },

    // Función pública que user.js llama vía updatePatientContext
    updatePatientContext: function(ctx) {
        if (ctx && ctx.nombre) this.userName = ctx.nombre;
    },

    // ── ESTILOS INYECTADOS ────────────────────────────────────────────
    forceInjectStyles: function() {
        if (document.getElementById('aura-god-mode-styles')) return;
        const style = document.createElement('style');
        style.id = 'aura-god-mode-styles';
        style.textContent = `
            #aura-modal { background: rgba(5,5,10,0.45) !important; border: 1px solid rgba(242,201,76,0.4) !important; }
            .aura-container { background: transparent !important; }
            .modal-header { background: linear-gradient(180deg,rgba(0,0,0,0.8) 0%,transparent 100%) !important; border-bottom: 1px solid rgba(242,201,76,0.2) !important; }

            #aura-chat { display: flex !important; flex-direction: column !important; gap: 1.5rem !important; padding: 2rem 1rem !important; }

            .msg { max-width: 85% !important; width: fit-content !important; padding: 1.5rem 2rem !important; font-size: 1.25rem !important; line-height: 1.7 !important; border-radius: 2rem !important; box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important; animation: slideInMsg 0.4s cubic-bezier(0.16,1,0.3,1) forwards !important; }
            .msg.user { align-self: flex-end !important; margin-left: auto !important; background: linear-gradient(135deg,rgba(242,201,76,0.15),rgba(0,0,0,0.85)) !important; border: 1px solid rgba(242,201,76,0.3) !important; border-right: 4px solid var(--valtara-oro) !important; border-bottom-right-radius: 0.5rem !important; color: var(--valtara-oro-suave,#f5dfa0) !important; }
            .msg.bot { align-self: flex-start !important; margin-right: auto !important; background: linear-gradient(135deg,rgba(0,255,255,0.08),rgba(0,0,0,0.85)) !important; border: 1px solid rgba(0,255,255,0.2) !important; border-left: 4px solid var(--valtara-cian-brillante,#00FFCC) !important; border-bottom-left-radius: 0.5rem !important; color: var(--valtara-blanco,#fff) !important; }

            .msg.bot a { display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 12px !important; background: linear-gradient(135deg,var(--valtara-whatsapp,#25D366),#128C7E) !important; color: #000 !important; padding: 1.2rem 2.5rem !important; border-radius: 3rem !important; text-decoration: none !important; font-weight: 900 !important; margin-top: 1.5rem !important; border: none !important; box-shadow: 0 10px 25px rgba(37,211,102,0.3) !important; width: fit-content !important; transition: all 0.3s ease !important; }
            .msg.bot a.ig-link { background: linear-gradient(135deg,#E1306C,#833AB4) !important; color: #fff !important; box-shadow: 0 10px 25px rgba(225,48,108,0.3) !important; }
            .msg.bot a:hover { transform: translateY(-3px) scale(1.05) !important; }

            .msg.bot .aura-speak-btn { background: rgba(0,255,255,0.05) !important; border: 1px solid var(--valtara-cian-brillante,#00FFCC) !important; color: var(--valtara-cian-brillante,#00FFCC) !important; padding: 0 !important; width: 45px !important; height: 45px !important; border-radius: 50% !important; margin-top: 0 !important; margin-left: 15px !important; box-shadow: none !important; flex-shrink: 0; }

            #aura-welcome-screen { background: transparent !important; z-index: 50 !important; pointer-events: none; }
            .aura-suggestion-card { pointer-events: auto; background: linear-gradient(90deg,rgba(255,255,255,0.05),rgba(0,0,0,0.6)); border-radius: 1.5rem; padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; text-align: left; cursor: pointer; transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.5); width: 100%; border: 1px solid rgba(255,255,255,0.1); }
            .aura-suggestion-card:hover { transform: translateY(-5px); background: linear-gradient(90deg,rgba(242,201,76,0.15),rgba(0,0,0,0.8)); border-color: var(--valtara-oro,#F2C94C) !important; }
            .aura-controls { pointer-events: auto !important; position: relative; z-index: 60 !important; }

            /* Indicador de grabación de voz */
            @keyframes micPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(247,37,133,0.5); } 50% { box-shadow: 0 0 0 12px rgba(247,37,133,0); } }
            #aura-mic-btn.mic-recording { animation: micPulse 1s infinite; border-color: #F72585 !important; color: #F72585 !important; }

            /* Indicador de pensamiento */
            @keyframes thinkDot { 0%,80%,100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
            .think-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--valtara-cian-brillante,#00FFCC); margin: 0 3px; animation: thinkDot 1.4s infinite; }
            .think-dot:nth-child(2) { animation-delay: 0.2s; }
            .think-dot:nth-child(3) { animation-delay: 0.4s; }

            @keyframes pulseAuraGold { 0% { transform:scale(0.9); opacity:0.5; } 100% { transform:scale(1.2); opacity:1; } }
            @keyframes slideInMsg { from { opacity:0; transform:translateY(30px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
        `;
        document.head.appendChild(style);
    },

    // ── PANTALLA DE BIENVENIDA ────────────────────────────────────────
    renderUltraLujoWelcome: function() {
        const welcomeContainer = document.getElementById('aura-welcome-screen');
        if (!welcomeContainer) return;

        const hour = new Date().getHours();
        const timeGreeting = hour >= 4 && hour < 12 ? 'Buenos días'
                           : hour >= 12 && hour < 19 ? 'Buenas tardes'
                           : 'Buenas noches';

        welcomeContainer.style.display   = 'flex';
        welcomeContainer.style.opacity   = '1';
        welcomeContainer.style.transform = 'translateY(0) scale(1)';

        welcomeContainer.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;max-width:700px;margin:auto;padding:1rem;pointer-events:none;">
                <div style="position:relative;margin-bottom:2.5rem;display:flex;justify-content:center;align-items:center;">
                    <div style="position:absolute;width:140px;height:140px;background:radial-gradient(circle,rgba(242,201,76,0.35) 0%,transparent 100%);border-radius:50%;filter:blur(25px);animation:pulseAuraGold 3s infinite alternate;"></div>
                    <i class="fa-solid fa-sparkles" style="font-size:4.5rem;color:var(--valtara-oro);position:relative;z-index:2;text-shadow:0 0 40px rgba(242,201,76,0.9);"></i>
                </div>
                <h2 style="font-size:3.5rem;font-family:var(--font-accent);font-weight:600;margin-bottom:1rem;text-align:center;color:var(--valtara-blanco);line-height:1.2;">${timeGreeting}</h2>
                <p style="font-size:1.3rem;color:#e2e2e8;font-weight:300;letter-spacing:3px;text-transform:uppercase;margin-bottom:4rem;text-align:center;border-bottom:1px solid rgba(242,201,76,0.3);padding-bottom:1.5rem;">¿Cómo podemos ayudarte hoy?</p>
                <div style="display:grid;grid-template-columns:1fr;gap:1.5rem;width:100%;pointer-events:auto;">
                    <button class="aura-suggestion-card" data-query="Necesito un masaje relajante y descompresión física">
                        <div style="width:70px;height:70px;border-radius:50%;background:rgba(0,255,255,0.1);border:1px solid rgba(0,255,255,0.3);display:flex;justify-content:center;align-items:center;flex-shrink:0;"><i class="fa-solid fa-spa" style="color:var(--valtara-cian-brillante);font-size:2.2rem;"></i></div>
                        <div style="flex-grow:1;"><span style="color:var(--valtara-blanco);font-size:1.5rem;font-weight:700;font-family:var(--font-accent);display:block;margin-bottom:0.3rem;">Masaje Relajante</span><span style="color:#aaa;font-size:1.1rem;font-weight:300;line-height:1.4;">Agenda tu sesión para liberar el estrés acumulado.</span></div>
                    </button>
                    <button class="aura-suggestion-card" data-query="Me duele la espalda, el cuello o tengo tensión crónica por el trabajo">
                        <div style="width:70px;height:70px;border-radius:50%;background:rgba(242,201,76,0.1);border:1px solid rgba(242,201,76,0.3);display:flex;justify-content:center;align-items:center;flex-shrink:0;"><i class="fa-solid fa-child-reaching" style="color:var(--valtara-oro);font-size:2.2rem;"></i></div>
                        <div style="flex-grow:1;"><span style="color:var(--valtara-blanco);font-size:1.5rem;font-weight:700;font-family:var(--font-accent);display:block;margin-bottom:0.3rem;">Terapia Biomecánica</span><span style="color:#aaa;font-size:1.1rem;font-weight:300;line-height:1.4;">Evaluación y tratamiento de dolores musculares crónicos.</span></div>
                    </button>
                    <button class="aura-suggestion-card" data-query="Quiero información sobre manicura, uñas de gel o diseño de uñas">
                        <div style="width:70px;height:70px;border-radius:50%;background:rgba(225,48,108,0.1);border:1px solid rgba(225,48,108,0.3);display:flex;justify-content:center;align-items:center;flex-shrink:0;"><i class="fa-solid fa-wand-magic-sparkles" style="color:#FFB6C1;font-size:2.2rem;"></i></div>
                        <div style="flex-grow:1;"><span style="color:var(--valtara-blanco);font-size:1.5rem;font-weight:700;font-family:var(--font-accent);display:block;margin-bottom:0.3rem;">Art & Nails</span><span style="color:#aaa;font-size:1.1rem;font-weight:300;line-height:1.4;">Manicura de autor, gel, acrílico y diseño artístico.</span></div>
                    </button>
                    <button class="aura-suggestion-card" data-query="Quiero conocer los precios de todos los servicios">
                        <div style="width:70px;height:70px;border-radius:50%;background:rgba(178,0,255,0.1);border:1px solid rgba(178,0,255,0.3);display:flex;justify-content:center;align-items:center;flex-shrink:0;"><i class="fa-solid fa-tag" style="color:var(--valtara-morado-vivo,#B200FF);font-size:2.2rem;"></i></div>
                        <div style="flex-grow:1;"><span style="color:var(--valtara-blanco);font-size:1.5rem;font-weight:700;font-family:var(--font-accent);display:block;margin-bottom:0.3rem;">Tarifas y Paquetes</span><span style="color:#aaa;font-size:1.1rem;font-weight:300;line-height:1.4;">Explorar inversiones en bienestar ejecutivo.</span></div>
                    </button>
                </div>
            </div>
        `;
    },

    // ── MOTOR DE VOZ — Auto-envío al terminar de dictar ──────────────
    initVoiceEngines: function() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.lang            = 'es-MX';
            this.recognition.continuous      = false;
            this.recognition.interimResults  = false;

            this.recognition.onresult = (e) => {
                const transcript = e.results[0][0].transcript;
                const inputField = document.getElementById('aura-input');
                if (inputField) inputField.value = transcript;
                // AUTO-ENVÍO inmediato al terminar de dictar
                this.handleInput();
            };

            this.recognition.onend  = () => this.resetMicBtn();
            this.recognition.onerror = (e) => {
                console.warn('[AURA] Error de micrófono:', e.error);
                this.resetMicBtn(true);
            };
        } else {
            const micBtn = document.getElementById('aura-mic-btn');
            if (micBtn) micBtn.style.display = 'none';
        }
    },

    resetMicBtn: function(isError = false) {
        this.isRecording = false;
        const micBtn = document.getElementById('aura-mic-btn');
        if (!micBtn) return;
        micBtn.classList.remove('mic-recording');
        micBtn.innerHTML = isError
            ? '<i class="fa-solid fa-microphone-slash"></i>'
            : '<i class="fa-solid fa-microphone"></i>';
        micBtn.style.color        = 'var(--valtara-cian-brillante,#00FFCC)';
        micBtn.style.borderColor  = 'var(--valtara-cian-brillante,#00FFCC)';
        if (isError) setTimeout(() => {
            micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        }, 2000);
    },

    // ── EVENTOS ────────────────────────────────────────────────────────
    bindEvents: function() {
        const sendBtn    = document.getElementById('aura-send-btn');
        const inputField = document.getElementById('aura-input');
        const micBtn     = document.getElementById('aura-mic-btn');
        const fabAura    = document.getElementById('fab-aura');

        // Abrir Aura desde el header (el modal ya tiene showModal en onclick)
        if (fabAura) {
            fabAura.addEventListener('click', () => {
                if (this.chatHistory.length === 0) this.renderUltraLujoWelcome();
            });
        }

        // También renderizar bienvenida cuando se abre el modal por primera vez
        const auraModal = document.getElementById('aura-modal');
        if (auraModal) {
            auraModal.addEventListener('toggle', () => {
                if (auraModal.open && this.chatHistory.length === 0) {
                    this.renderUltraLujoWelcome();
                }
            });
            // Fallback para navegadores que no soportan 'toggle' en <dialog>
            const observer = new MutationObserver(() => {
                if (auraModal.open && this.chatHistory.length === 0) {
                    this.renderUltraLujoWelcome();
                }
            });
            observer.observe(auraModal, { attributes: true, attributeFilter: ['open'] });
        }

        // Enviar con botón
        if (sendBtn) sendBtn.addEventListener('click', () => this.handleInput());

        // Enviar con Enter
        if (inputField) inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleInput();
        });

        // Micrófono
        if (micBtn && this.recognition) {
            micBtn.addEventListener('click', () => {
                AuraSensory.init();
                if (this.isRecording) {
                    this.recognition.stop();
                } else {
                    try {
                        this.recognition.start();
                        this.isRecording = true;
                        micBtn.classList.add('mic-recording');
                        micBtn.innerHTML     = '<i class="fa-solid fa-stop"></i>';
                        micBtn.style.color   = '#F72585';
                        micBtn.style.borderColor = '#F72585';
                    } catch(e) { console.warn('[AURA] No se pudo iniciar el micrófono:', e); }
                }
            });
        }

        // Sugerencias de la pantalla de bienvenida
        document.body.addEventListener('click', (e) => {
            const card = e.target.closest('.aura-suggestion-card');
            if (card) {
                const query = card.getAttribute('data-query');
                if (query) this.processDirectQuery(query);
            }
        });
    },

    hideWelcomeScreen: function() {
        const ws = document.getElementById('aura-welcome-screen');
        if (ws && ws.style.display !== 'none') {
            ws.style.opacity   = '0';
            ws.style.transform = 'translateY(-50px) scale(0.95)';
            setTimeout(() => { ws.style.display = 'none'; }, 600);
        }
    },

    // ── MANEJAR INPUT DEL USUARIO ──────────────────────────────────────
    handleInput: function() {
        if (this.isTyping) return;
        const inputField = document.getElementById('aura-input');
        if (!inputField || !inputField.value.trim()) return;

        const txt = inputField.value.trim();
        inputField.value = '';
        AuraSensory.playSend();
        this.hideWelcomeScreen();
        this.appendMsg(txt, 'user');
        this.sendMessageToAI(txt);
    },

    processDirectQuery: function(query) {
        if (this.isTyping) return;
        AuraSensory.playSend();
        this.hideWelcomeScreen();
        this.appendMsg(query, 'user');
        this.sendMessageToAI(query);
    },

    // ── LLAMADA A LA API ───────────────────────────────────────────────
    sendMessageToAI: async function(userText) {
        this.isTyping = true;
        window.speechSynthesis.cancel();
        this.resetActiveSpeakBtn();

        const chatLog = document.getElementById('aura-chat');
        this.chatHistory.push({ role: 'user', content: userText });

        // Indicador visual "Pensando..." con puntitos animados
        const typingDiv = document.createElement('div');
        typingDiv.id = 'temp-typing';
        typingDiv.className = 'msg bot';
        typingDiv.style.cssText = 'opacity:0.8;align-self:flex-start;margin-right:auto;padding:1.5rem 2rem;';
        typingDiv.innerHTML = '<span class="think-dot"></span><span class="think-dot"></span><span class="think-dot"></span>';
        chatLog.appendChild(typingDiv);
        chatLog.scrollTo({ top: chatLog.scrollHeight, behavior: 'smooth' });

        AuraSensory.startThinking(); // Turu-turu-turu

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    history: this.chatHistory,
                    userName: this.userName,
                    // Contexto del negocio — el servidor lo usará si lo soporta
                    systemContext: VALTARA_CONTEXT
                })
            });

            const tempEl = document.getElementById('temp-typing');
            if (tempEl) tempEl.remove();
            AuraSensory.stopThinking();

            if (!response.ok) throw new Error('Error de conexión');

            const data = await response.json();
            let respuesta = data.reply || '';

            // Si la respuesta habla de manicura/uñas y no tiene links, los inyectamos
            const esDeManicura = /manicur|uña|nail|gel|acrílico|rubber|pedicur|art.*nails|nails.*art/i.test(userText + respuesta);
            if (esDeManicura && !respuesta.includes('wa.me/525525248816')) {
                respuesta += `\n\n**Contacto directo con nuestra manicurista:**`;
                respuesta += `\n[WhatsApp Art & Nails](https://wa.me/525525248816)`;
                respuesta += `\n[Instagram @art.nails02](https://www.instagram.com/art.nails02 "instagram")`;
            }

            if (!respuesta.includes('leve interrupción')) {
                this.chatHistory.push({ role: 'assistant', content: respuesta });
            }

            // Formatear markdown básico y links
            let html = respuesta
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');

            // Links de WhatsApp
            html = html.replace(
                /\[([^\]]+)\]\((https:\/\/wa\.me\/[^\s)]+)\)/g,
                '<a href="$2" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp" style="font-size:1.4rem;"></i> $1</a>'
            );
            // Links de Instagram
            html = html.replace(
                /\[([^\]]+)\]\((https:\/\/www\.instagram\.com\/[^\s)]+?)(?:\s+"[^"]*")?\)/g,
                '<a href="$2" target="_blank" rel="noopener" class="ig-link"><i class="fa-brands fa-instagram" style="font-size:1.4rem;"></i> $1</a>'
            );
            // Otros links genéricos
            html = html.replace(
                /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
                '<a href="$2" target="_blank" rel="noopener">$1</a>'
            );

            AuraSensory.playReceive();
            this.appendMsg(html, 'bot', true);

        } catch(error) {
            AuraSensory.stopThinking();
            const tempEl = document.getElementById('temp-typing');
            if (tempEl) tempEl.remove();
            this.appendMsg(
                `Tuve una pequeña interrupción de red. Puedes contactarnos directamente:<br><br>` +
                `<a href="https://wa.me/5213348572070" target="_blank"><i class="fa-brands fa-whatsapp" style="font-size:1.4rem;"></i> WhatsApp Valtara</a>`,
                'bot', true
            );
            this.chatHistory.pop();
        } finally {
            this.isTyping = false;
        }
    },

    // ── RENDERIZAR MENSAJE ─────────────────────────────────────────────
    appendMsg: function(txtOrHtml, sender, isHtml = false) {
        const log = document.getElementById('aura-chat');
        if (!log) return;

        const div = document.createElement('div');
        div.className = `msg ${sender}`;

        const contentDiv = document.createElement('div');
        if (isHtml) contentDiv.innerHTML = txtOrHtml;
        else        contentDiv.textContent = txtOrHtml;

        if (sender === 'bot') {
            const speakBtn = document.createElement('button');
            speakBtn.className = 'aura-speak-btn';
            speakBtn.setAttribute('aria-label', 'Leer en voz alta');
            speakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            speakBtn.addEventListener('click', () => this.speakMessage(txtOrHtml, speakBtn));

            const flex = document.createElement('div');
            flex.style.cssText = 'display:flex;justify-content:space-between;align-items:flex-start;gap:10px;';
            flex.appendChild(contentDiv);
            flex.appendChild(speakBtn);
            div.appendChild(flex);
        } else {
            div.appendChild(contentDiv);
        }

        log.appendChild(div);
        setTimeout(() => log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' }), 50);
    },

    // ── LECTURA EN VOZ ALTA DE RESPUESTAS ─────────────────────────────
    speakMessage: function(htmlContent, btnElement) {
        if (window.speechSynthesis.speaking && btnElement.classList.contains('is-speaking')) {
            window.speechSynthesis.cancel();
            this.resetActiveSpeakBtn();
            return;
        }
        window.speechSynthesis.cancel();
        this.resetActiveSpeakBtn();

        this.activeSpeakBtn = btnElement;
        btnElement.classList.add('is-speaking');
        btnElement.innerHTML     = '<i class="fa-solid fa-stop"></i>';
        btnElement.style.color       = '#ff5555';
        btnElement.style.borderColor = '#ff5555';

        const tmp = document.createElement('div');
        tmp.innerHTML = htmlContent;
        tmp.querySelectorAll('a, button').forEach(el => el.remove());
        const text = (tmp.innerText || tmp.textContent || '').trim();
        if (!text) { this.resetActiveSpeakBtn(); return; }

        const utterance   = new SpeechSynthesisUtterance(text);
        utterance.lang    = 'es-MX';
        utterance.rate    = 0.95;
        utterance.pitch   = 1.05;

        const voices = window.speechSynthesis.getVoices();
        const esVoice = voices.find(v => v.lang.startsWith('es'));
        if (esVoice) utterance.voice = esVoice;

        utterance.onend   = () => this.resetActiveSpeakBtn();
        utterance.onerror = () => this.resetActiveSpeakBtn();
        window.speechSynthesis.speak(utterance);
    },

    resetActiveSpeakBtn: function() {
        if (this.activeSpeakBtn) {
            this.activeSpeakBtn.innerHTML    = '<i class="fa-solid fa-volume-high"></i>';
            this.activeSpeakBtn.style.color       = 'var(--valtara-cian-brillante,#00FFCC)';
            this.activeSpeakBtn.style.borderColor = 'var(--valtara-cian-brillante,#00FFCC)';
            this.activeSpeakBtn.classList.remove('is-speaking');
            this.activeSpeakBtn = null;
        }
    }
};

// Arrancar Aura al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    AuraEngine.init();
});
