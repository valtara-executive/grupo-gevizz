/**
 * ====================================================================================
 * BLOQUE 8: AURA AI FRONTEND V46.0 (CONEXIÓN SOBERANA AL BACKEND Y ACÚSTICA)
 * ------------------------------------------------------------------------------------
 * Interfaz de usuario, retroalimentación sensorial (Web Audio API + Vibración).
 * Toda la lógica de modelos de IA y fallbacks está delegada al servidor de Vercel.
 * ====================================================================================
 */

// ====================================================================================
// PARCHE GLOBAL: REPARACIÓN DE SCROLL EN VENTANAS EMERGENTES (MODALES)
// ====================================================================================
const GlobalModalFixer = {
    init: function() {
        console.log("🛡️ [MODAL FIXER] Escudo anti-scroll activado para ventanas emergentes.");
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.tagName === 'DIALOG') {
                    if (mutation.target.hasAttribute('open')) {
                        document.body.style.overflow = 'hidden';
                        document.body.style.touchAction = 'none'; 
                        const fabs = document.getElementById('smart-fabs');
                        if(fabs) fabs.style.display = 'none';
                    } else {
                        if (!document.querySelector('dialog[open]')) {
                            document.body.style.overflow = 'auto';
                            document.body.style.touchAction = 'auto';
                            const fabs = document.getElementById('smart-fabs');
                            if(fabs) fabs.style.display = 'flex';
                        }
                    }
                }
            });
        });

        document.querySelectorAll('dialog').forEach(dialog => {
            observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });
        });
    }
};

// ====================================================================================
// 1. MOTOR SENSORIAL Y ACÚSTICO (ChatGPT Style & Vibración)
// ====================================================================================
const AuraSensory = {
    ctx: null,
    tickInterval: null,
    droneGain: null,
    droneOsc: null,

    init: function() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if(AudioContext) this.ctx = new AudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    },

    playTone: function(freq, type, duration, vol = 0.05) {
        if(!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch(e) {}
    },

    startThinkingAcoustics: function() {
        this.init();
        if (!this.ctx) return;

        try {
            this.droneOsc = this.ctx.createOscillator();
            this.droneGain = this.ctx.createGain();
            this.droneOsc.type = 'sine';
            this.droneOsc.frequency.setValueAtTime(100, this.ctx.currentTime); 
            
            this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
            this.droneGain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 1.5);
            
            this.droneOsc.connect(this.droneGain);
            this.droneGain.connect(this.ctx.destination);
            this.droneOsc.start();
        } catch(e) {}

        let tickCount = 0;
        this.tickInterval = setInterval(() => {
            try {
                const tickOsc = this.ctx.createOscillator();
                const tickGain = this.ctx.createGain();
                
                const freq = tickCount % 2 === 0 ? 800 : 1200; 
                tickOsc.type = 'sine';
                tickOsc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                
                tickGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
                tickGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);
                
                tickOsc.connect(tickGain);
                tickGain.connect(this.ctx.destination);
                
                tickOsc.start();
                tickOsc.stop(this.ctx.currentTime + 0.05);
                
                tickCount++;
            } catch(e) {}
        }, 150); 
    },

    stopThinkingAcoustics: function() {
        if (this.tickInterval) clearInterval(this.tickInterval);
        
        if (this.droneGain && this.ctx) {
            this.droneGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
            setTimeout(() => {
                if (this.droneOsc) {
                    try { this.droneOsc.stop(); } catch(e){}
                }
            }, 1000);
        }
    },

    vibrate: function(pattern) {
        if ('vibrate' in navigator) {
            try { navigator.vibrate(pattern); } catch(e) {}
        }
    }
};

// ====================================================================================
// 2. CEREBRO FRONTEND (CONEXIÓN AL BACKEND DE VERCEL)
// ====================================================================================
const AuraEngine = {
    // La URL de tu backend seguro en Vercel
    backendUrl: "https://aura-server-erfj.vercel.app/api/aura",
    
    // Memoria conversacional en formato OpenAI (User / Assistant)
    chatHistory: [],
    
    // Perfil del Paciente extraído de la Bóveda Local
    patientProfile: {
        nombre: 'Visitante',
        aromas: []
    },

    init: function() {
        console.log("🧠 [AURA FRONTEND V46] Conectando interfaz con el núcleo de Vercel...");
        
        GlobalModalFixer.init(); 
        this.syncWithUserVault();
        this.bindEvents();
        this.renderWelcomeScreen();
    },

    syncWithUserVault: function() {
        try {
            const profileData = localStorage.getItem('valtara_sovereign_profile');
            if (profileData) {
                const parsed = JSON.parse(profileData);
                this.patientProfile.nombre = parsed.name || 'Visitante';
                this.patientProfile.aromas = Array.isArray(parsed.aromaPreferences) ? parsed.aromaPreferences : [];
            }
        } catch(e) {
            console.warn("⚠️ [AURA FRONTEND] No se pudo leer la identidad del usuario.");
        }
    },

    bindEvents: function() {
        const sendBtn = document.getElementById('aura-send-btn');
        const inputEl = document.getElementById('aura-input');
        const micBtn = document.getElementById('aura-mic-btn');

        if (sendBtn) sendBtn.addEventListener('click', () => this.handleUserInput());
        if (inputEl) {
            inputEl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleUserInput();
            });
            inputEl.addEventListener('focus', () => AuraSensory.init(), {once:true});
        }
        if (micBtn) {
            micBtn.addEventListener('click', () => {
                AuraSensory.init();
                this.startVoiceDictation();
            });
        }
    },

    renderWelcomeScreen: function() {
        const welcomeScreen = document.getElementById('aura-welcome-screen');
        if (!welcomeScreen) return;

        const hora = new Date().getHours();
        let saludo = "Excelente noche";
        if (hora >= 5 && hora < 12) saludo = "Excelente mañana";
        else if (hora >= 12 && hora < 19) saludo = "Buena tarde";

        const nombre = this.patientProfile.nombre !== 'Invitado VIP' ? this.patientProfile.nombre : 'apreciable paciente';
        
        welcomeScreen.innerHTML = `
            <div style="animation: astroBreathe 4s infinite alternate; margin-bottom: 2rem;">
                <i class="fa-solid fa-fingerprint" style="font-size: 5rem; color: var(--valtara-cian-brillante); filter: drop-shadow(0 0 20px rgba(0,255,204,0.6));"></i>
            </div>
            <h2 style="font-family: var(--font-accent); color: var(--valtara-blanco); font-size: 2.5rem; margin-bottom: 1rem;">
                ${saludo}, <span style="color: var(--valtara-oro-brillante);">${nombre}</span>.
            </h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; max-width: 650px; line-height: 1.7; margin: 0 auto;">
                Soy Aura. He sincronizado tus biometrías locales con nuestra red segura. ¿En qué te puedo asistir hoy?
            </p>
        `;
    },

    // ================================================================================
    // PROCESAMIENTO Y ENVÍO AL BACKEND
    // ================================================================================
    handleUserInput: async function() {
        const inputEl = document.getElementById('aura-input');
        const text = inputEl.value.trim();
        if (!text) return;

        // Transición de interfaz
        const welcomeScreen = document.getElementById('aura-welcome-screen');
        const chatScreen = document.getElementById('aura-chat');
        if (welcomeScreen && welcomeScreen.style.display !== 'none') {
            welcomeScreen.style.display = 'none';
            chatScreen.style.display = 'flex';
        }

        AuraSensory.init();
        AuraSensory.playTone(600, 'sine', 0.1, 0.05); 
        AuraSensory.vibrate(15);

        this.appendMsg(text, 'user');
        inputEl.value = '';
        
        // Guardar en memoria general (Formato OpenAI)
        this.chatHistory.push({ role: "user", content: text });

        const typingId = this.showTypingIndicator();
        AuraSensory.startThinkingAcoustics();

        try {
            // El Frontend solo empaqueta y envía a tu Vercel
            const responseText = await this.fetchFromBackend();
            
            this.removeTypingIndicator(typingId);
            AuraSensory.stopThinkingAcoustics();
            
            AuraSensory.playTone(900, 'triangle', 0.2, 0.04); 
            AuraSensory.vibrate([10, 30, 10]);

            this.appendMsg(responseText, 'bot');
            this.chatHistory.push({ role: "assistant", content: responseText });
            
        } catch (error) {
            console.error("🔴 [AURA BACKEND FAIL]", error);
            this.removeTypingIndicator(typingId);
            AuraSensory.stopThinkingAcoustics();
            
            this.appendMsg("Mis servidores biométricos están experimentando latencia. Por favor, comunícate con nuestro Concierge por WhatsApp.<br><br><a href='https://wa.me/5213348572070' style='color:var(--valtara-oro-brillante); text-decoration:underline;'>Contactar Concierge</a>", 'bot');
            AuraSensory.vibrate([50, 100, 50, 100, 50]); 
        }
    },

    // LA LLAMADA AL SERVIDOR VERCEL
    fetchFromBackend: async function() {
        const payload = {
            history: this.chatHistory,
            userName: this.patientProfile.nombre
        };

        // Nota: Si el entorno colaborativo te bloquea, es culpa del CSP. 
        // En tu index.html asegúrate que connect-src tenga https://aura-server-erfj.vercel.app
        const response = await fetch(this.backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("HTTP " + response.status);
        
        const data = await response.json();
        if (data.reply) {
            return data.reply;
        } else {
            throw new Error("Respuesta inválida del servidor");
        }
    },

    // ================================================================================
    // RENDERIZADO DE LA INTERFAZ DE CRISTAL (UI)
    // ================================================================================
    appendMsg: function(text, sender) {
        const log = document.getElementById('aura-chat');
        if(!log) return;

        const div = document.createElement('div'); 
        div.className = `msg ${sender}`;
        
        // Formateo elegante
        let formattedText = text.replace(/\n/g, '<br>');
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--valtara-oro-brillante); letter-spacing:0.5px;">$1</strong>');
        
        div.innerHTML = formattedText;
        
        if(sender === 'bot') {
            const speakBtn = document.createElement('button');
            speakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            speakBtn.style.cssText = "background:transparent; border:none; color:var(--valtara-cian-brillante); margin-left:15px; cursor:pointer; font-size: 1.1rem; float: right;";
            speakBtn.setAttribute('aria-label', 'Leer diagnóstico en voz alta');
            speakBtn.onclick = () => this.speakMessage(text);
            div.appendChild(speakBtn);
        }

        log.appendChild(div);
        setTimeout(() => { log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' }); }, 50);
    },

    showTypingIndicator: function() {
        const log = document.getElementById('aura-chat');
        const typingId = 'typing-' + Date.now();
        
        const div = document.createElement('div');
        div.id = typingId;
        div.className = 'msg bot typing-indicator';
        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; color: var(--valtara-cian-brillante);">
                <i class="fa-solid fa-circle-nodes fa-spin" style="font-size: 1.4rem;"></i>
                <span style="font-style: italic; font-size: 1.1rem; letter-spacing: 1px;">Procesando biometría...</span>
            </div>`;
        
        log.appendChild(div);
        log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
        return typingId;
    },

    removeTypingIndicator: function(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    },

    // ================================================================================
    // SISTEMAS AUXILIARES (VOZ)
    // ================================================================================
    startVoiceDictation: function() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.appendMsg("Tu dispositivo restringe los protocolos acústicos nativos.", "bot");
            return;
        }
        
        const inputEl = document.getElementById('aura-input');
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'es-MX';
        recognition.interimResults = false;
        
        const micBtn = document.getElementById('aura-mic-btn');
        micBtn.innerHTML = '<i class="fa-solid fa-wave-square fa-beat"></i>';
        micBtn.style.color = '#F72585'; 
        micBtn.style.borderColor = '#F72585';
        
        AuraSensory.playTone(440, 'sine', 0.2);
        AuraSensory.vibrate(20);

        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            inputEl.value = transcript;
        };

        recognition.onend = () => {
            micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
            micBtn.style.color = 'var(--valtara-cian-brillante)';
            micBtn.style.borderColor = 'var(--valtara-cian-brillante)';
        };

        recognition.onerror = () => {
            micBtn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
            setTimeout(() => {
                micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
                micBtn.style.color = 'var(--valtara-cian-brillante)';
            }, 2000);
        };
    },

    speakMessage: function(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); 
            // Eliminamos las etiquetas HTML para la voz
            const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/\*/g, '');
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = 'es-MX';
            utterance.rate = 1.0;  
            utterance.pitch = 0.9; 
            window.speechSynthesis.speak(utterance);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    setTimeout(() => AuraEngine.init(), 600);
});
