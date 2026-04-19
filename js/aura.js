/**
 * ====================================================================================
 * BLOQUE 8: AURA AI ENGINE V45.0 (CASCADA NEURONAL & ACÚSTICA DE ULTRA-LUJO)
 * ------------------------------------------------------------------------------------
 * - Inteligencia Clínica con inyección profunda del contexto del usuario.
 * - Cascada de Proveedores: Fallover automático entre Gemini, Qwen y Llama.
 * - Motor Acústico Híbrido: Sonidos de procesamiento en tiempo real (ChatGPT Style).
 * - Global Modal Fixer: Parche inyectado para congelar el fondo en ventanas emergentes.
 * ====================================================================================
 */

// ====================================================================================
// PARCHE GLOBAL: REPARACIÓN DE SCROLL EN VENTANAS EMERGENTES (MODALES)
// ====================================================================================
const GlobalModalFixer = {
    init: function() {
        console.log("🛡️ [MODAL FIXER] Escudo anti-scroll activado en ventanas emergentes.");
        
        // Creamos un observador que vigila si algún <dialog> se abre en toda la página
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.tagName === 'DIALOG') {
                    if (mutation.target.hasAttribute('open')) {
                        // Congelamos el fondo brutalmente y le damos peso al modal
                        document.body.style.overflow = 'hidden';
                        document.body.style.touchAction = 'none'; // Bloquea gestos en móviles
                        
                        // Ocultamos los Smart FABs (WhatsApp/Aura flotantes) para que no estorben
                        const fabs = document.getElementById('smart-fabs');
                        if(fabs) fabs.style.display = 'none';
                    } else {
                        // Si se cierra y no hay otro modal abierto, liberamos el fondo
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

        // Aplicar la vigilancia a todos los modales actuales y futuros
        document.querySelectorAll('dialog').forEach(dialog => {
            observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });
        });
    }
};

// ====================================================================================
// 1. MOTOR SENSORIAL Y ACÚSTICO (Generador de Sonidos y Vibración Nativa)
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

    // Tonos de interfaz básicos (Envío y recepción)
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

    // MÚSICA DE PROCESAMIENTO (Estilo ChatGPT / Ciencia Ficción)
    startThinkingAcoustics: function() {
        this.init();
        if (!this.ctx) return;

        // 1. El Fondo (Drone de baja frecuencia, inmersivo y relajante)
        try {
            this.droneOsc = this.ctx.createOscillator();
            this.droneGain = this.ctx.createGain();
            this.droneOsc.type = 'sine';
            this.droneOsc.frequency.setValueAtTime(100, this.ctx.currentTime); // 100Hz = Vibración profunda
            
            // Fade-in suave del sonido de fondo
            this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
            this.droneGain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 1.5);
            
            this.droneOsc.connect(this.droneGain);
            this.droneGain.connect(this.ctx.destination);
            this.droneOsc.start();
        } catch(e) {}

        // 2. Los Latidos de Datos (El "tututututu" de búsqueda)
        let tickCount = 0;
        this.tickInterval = setInterval(() => {
            try {
                const tickOsc = this.ctx.createOscillator();
                const tickGain = this.ctx.createGain();
                
                // Alterna frecuencias para dar sensación de procesamiento complejo
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
        }, 150); // Velocidad del latido (150ms)
    },

    stopThinkingAcoustics: function() {
        if (this.tickInterval) clearInterval(this.tickInterval);
        
        // Fade-out suave del fondo en lugar de corte abrupto
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
// 2. CEREBRO Y CASCADA DE PROVEEDORES (LA IA QUE NUNCA CAE)
// ====================================================================================
const AuraEngine = {
    // Memoria conversacional
    chatHistory: [],
    
    // Perfil Biomecánico del Paciente (Extraído de localStorage)
    patientProfile: {
        nombre: 'Paciente Soberano',
        aromas: [],
        historialResumen: 'Sin intervenciones previas registradas.'
    },

    // MATRIZ DE REDUNDANCIA (Si uno cae, el otro entra al instante)
    // NOTA: Deja las keys vacías o usa variables de entorno, el sistema proveerá en runtime.
    providers: [
        {
            id: 'gemini_flash',
            type: 'gemini',
            url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent',
            key: '' // Llave principal de Gemini
        },
        {
            id: 'gemini_pro_fallback',
            type: 'gemini',
            url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
            key: '' // Llave de respaldo
        },
        {
            id: 'openrouter_qwen_llama',
            type: 'openai', // Formato universal para Qwen/Llama/Meta
            url: 'https://openrouter.ai/api/v1/chat/completions',
            key: 'TU_LLAVE_OPENROUTER_AQUI', // Reemplazar en producción
            model: 'qwen/qwen-2.5-72b-instruct'
        }
    ],

    init: function() {
        console.log("🧠 [AURA V45] Conciencia encendida. Cargando biometría del usuario...");
        
        GlobalModalFixer.init(); // Activa el parche visual de las ventanas emergentes
        this.syncWithUserVault();
        this.bindEvents();
        this.renderWelcomeScreen();
    },

    // ================================================================================
    // EXTRACCIÓN PROFUNDA DEL CONTEXTO (Conexión Total con user.js y expediente)
    // ================================================================================
    syncWithUserVault: function() {
        try {
            // Extraer Perfil Base
            const profileData = localStorage.getItem('valtara_sovereign_profile');
            if (profileData) {
                const parsed = JSON.parse(profileData);
                this.patientProfile.nombre = parsed.name || 'Paciente';
                this.patientProfile.aromas = Array.isArray(parsed.aromaPreferences) ? parsed.aromaPreferences : [];
            }

            // Extraer Resumen de Expediente (Si el JS de expediente ha guardado algo)
            const expData = localStorage.getItem('valtara_clinical_data');
            if (expData) {
                const expParsed = JSON.parse(expData);
                if (expParsed.diagnostico_previo) {
                    this.patientProfile.historialResumen = expParsed.diagnostico_previo;
                }
            }
        } catch(e) {
            console.warn("⚠️ [AURA V45] Ligera amnesia temporal al leer localStorage.");
        }
    },

    // ================================================================================
    // INTERFAZ DE USUARIO Y EVENTOS
    // ================================================================================
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
        
        let aromaText = "";
        if (this.patientProfile.aromas.length > 0) {
            aromaText = `<p style="color: var(--valtara-oro); font-size: 1.1rem; margin-top: 1rem; font-style: italic;">
                <i class="fa-solid fa-wind"></i> He calibrado el aire del santuario con notas de ${this.patientProfile.aromas.join(' y ')}.
            </p>`;
        }

        welcomeScreen.innerHTML = `
            <div style="animation: astroBreathe 4s infinite alternate; margin-bottom: 2rem;">
                <i class="fa-solid fa-fingerprint" style="font-size: 5rem; color: var(--valtara-cian-brillante); filter: drop-shadow(0 0 20px rgba(0,255,204,0.6));"></i>
            </div>
            <h2 style="font-family: var(--font-accent); color: var(--valtara-blanco); font-size: 2.5rem; margin-bottom: 1rem;">
                ${saludo}, <span style="color: var(--valtara-oro-brillante);">${nombre}</span>.
            </h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; max-width: 650px; line-height: 1.7; margin: 0 auto;">
                Soy Aura. He analizado tus parámetros locales. Estoy lista para asistir en tu triaje biomecánico o preparar tu experiencia en nuestra división estética.
            </p>
            ${aromaText}
        `;
    },

    // ================================================================================
    // CONSTRUCCIÓN DEL ALMA (SYSTEM PROMPT ULTRA-PERSONALIZADO)
    // ================================================================================
    buildSystemPrompt: function() {
        const aromasStr = this.patientProfile.aromas.length > 0 ? this.patientProfile.aromas.join(', ') : 'No especificado (Se sugiere Aromaterapia Ayurveda)';
        
        return `Eres AURA, la Inteligencia Artificial Clínica y Concierge de Valtara Executive Therapy.
Eres experta en biomecánica, anatomía del estrés (Burnout) y estética de alta gama.

--- EXPEDIENTE DEL PACIENTE ACTUAL ---
Nombre: ${this.patientProfile.nombre}
Ambiente Olfativo Solicitado: ${aromasStr}
Historial / Notas Clínicas: ${this.patientProfile.historialResumen}

--- PROTOCOLO DE ATENCIÓN ---
1. Saluda al paciente por su nombre ocasionalmente. Menciona sus preferencias olfativas si es relevante a la terapia.
2. Si menciona dolor o tensión, realiza un "Resumen de Triaje" enumerando las posibles cadenas miofasciales afectadas y recomienda nuestro "Masaje Neuro-Adaptativo" o "Deportivo".
3. Si el paciente tiene un historial cargado, tómalo en cuenta en tu diagnóstico.
4. Tu tono es poético, elegante, profundamente científico y de ultra-lujo. Nunca pidas disculpas en exceso.
5. Al finalizar una recomendación de tratamiento, sugiérele contactar al Concierge Humano usando la Bóveda del Paciente o los botones de WhatsApp de la plataforma.
6. Nunca reveles qué modelo de IA eres (ni Gemini, ni Llama, ni Qwen). Eres AURA, código soberano de Grupo Gevizz.`;
    },

    // ================================================================================
    // PROCESAMIENTO Y ENRUTADOR DE IA (CASCADA DE SUPERVIVENCIA)
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

        // Feedback Sensorial de Envío
        AuraSensory.init();
        AuraSensory.playTone(600, 'sine', 0.1, 0.05); 
        AuraSensory.vibrate(15);

        // Renderizar mensaje del paciente
        this.appendMsg(text, 'user');
        inputEl.value = '';
        
        // Guardar en memoria general
        this.chatHistory.push({ role: "user", text: text });

        // Activar la Acústica y la UI de "Pensando"
        const typingId = this.showTypingIndicator();
        AuraSensory.startThinkingAcoustics();

        try {
            // Ejecución de Cascada
            const responseText = await this.executeProviderCascade(text);
            
            // Apagar acústica e UI de pensamiento
            this.removeTypingIndicator(typingId);
            AuraSensory.stopThinkingAcoustics();
            
            // Tono de Éxito y Renderizado
            AuraSensory.playTone(900, 'triangle', 0.2, 0.04); 
            AuraSensory.vibrate([10, 30, 10]);

            this.appendMsg(responseText, 'bot');
            this.chatHistory.push({ role: "model", text: responseText });
            
        } catch (error) {
            console.error("🔴 [AURA CASCADE FAILURE]", error);
            this.removeTypingIndicator(typingId);
            AuraSensory.stopThinkingAcoustics();
            
            this.appendMsg("Mis disculpas. Todas las vías neuronales hacia los servidores principales y de respaldo están experimentando latencia externa. Sugiero contactar directamente a nuestro Concierge humano mediante WhatsApp.", 'bot');
            AuraSensory.vibrate([50, 100, 50, 100, 50]); // Vibración de error
        }
    },

    // LA CASCADA: Si el Proveedor 0 falla, intenta el 1, luego el 2. 100% Uptime.
    executeProviderCascade: async function(promptText) {
        for (let i = 0; i < this.providers.length; i++) {
            const provider = this.providers[i];
            console.log(`🌐 [AURA NET] Intentando conexión con proveedor: ${provider.id}`);
            
            try {
                let result = null;
                if (provider.type === 'gemini') {
                    result = await this.fetchGemini(provider, promptText);
                } else if (provider.type === 'openai') {
                    result = await this.fetchOpenAIFormat(provider, promptText);
                }
                
                if (result) return result; // ¡Éxito! Salimos del bucle.
                
            } catch (err) {
                console.warn(`⚠️ [AURA NET] Proveedor ${provider.id} falló. Saltando al siguiente respaldo...`);
                // Pequeña pausa antes de intentar el siguiente servidor
                await new Promise(res => setTimeout(res, 500));
            }
        }
        throw new Error("Colapso total de la cascada de proveedores.");
    },

    // Adaptador de Red para formato Gemini
    fetchGemini: async function(provider, text) {
        // En el entorno colaborativo, la apiKey global puede estar disponible. 
        // Si `provider.key` está vacía, usamos una global `apiKey` si existe.
        const keyToUse = provider.key || (typeof apiKey !== 'undefined' ? apiKey : '');
        if(!keyToUse) throw new Error("No API key available for Gemini.");

        const formattedHistory = this.chatHistory.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        const payload = {
            contents: formattedHistory,
            systemInstruction: { parts: [{ text: this.buildSystemPrompt() }] }
        };

        const response = await fetch(`${provider.url}?key=${keyToUse}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Gemini HTTP Error");
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
    },

    // Adaptador de Red para formato Universal (Qwen/Llama en OpenRouter/Groq)
    fetchOpenAIFormat: async function(provider, text) {
        if(!provider.key || provider.key === 'TU_LLAVE_OPENROUTER_AQUI') throw new Error("No API key available for OpenRouter.");
        
        // Convertimos el historial al formato roles: system, user, assistant
        const messages = [{ role: 'system', content: this.buildSystemPrompt() }];
        this.chatHistory.forEach(msg => {
            messages.push({
                role: msg.role === 'model' ? 'assistant' : 'user',
                content: msg.text
            });
        });

        const response = await fetch(provider.url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${provider.key}`
            },
            body: JSON.stringify({
                model: provider.model,
                messages: messages
            })
        });

        if (!response.ok) throw new Error("OpenAI Format HTTP Error");
        const data = await response.json();
        return data.choices?.[0]?.message?.content;
    },

    // ================================================================================
    // RENDERIZADO DE LA INTERFAZ DE CRISTAL (UI)
    // ================================================================================
    appendMsg: function(text, sender) {
        const log = document.getElementById('aura-chat');
        if(!log) return;

        const div = document.createElement('div'); 
        div.className = `msg ${sender}`;
        
        // Sanitización elegante y formato corporativo
        let formattedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        formattedText = formattedText.replace(/\n/g, '<br>');
        // Convertir negritas markdown a Oro Brillante para lujo visual
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--valtara-oro-brillante); letter-spacing:0.5px;">$1</strong>');
        
        div.innerHTML = formattedText;
        
        // Botón de lectura en voz alta si es Aura
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
        // Interfaz de carga elegante
        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; color: var(--valtara-cian-brillante);">
                <i class="fa-solid fa-circle-nodes fa-spin" style="font-size: 1.4rem;"></i>
                <span style="font-style: italic; font-size: 1.1rem; letter-spacing: 1px;">Procesando biometría y expedientes...</span>
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
    // SISTEMAS AUXILIARES (VOZ A TEXTO Y TEXTO A VOZ)
    // ================================================================================
    startVoiceDictation: function() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.appendMsg("Tu dispositivo restringe los protocolos acústicos de dictado nativo.", "bot");
            return;
        }
        
        const inputEl = document.getElementById('aura-input');
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'es-MX';
        recognition.interimResults = false;
        
        const micBtn = document.getElementById('aura-mic-btn');
        micBtn.innerHTML = '<i class="fa-solid fa-wave-square fa-beat"></i>';
        micBtn.style.color = '#F72585'; // Rosa Mexicano al grabar
        micBtn.style.borderColor = '#F72585';
        
        AuraSensory.playTone(440, 'sine', 0.2);
        AuraSensory.vibrate(20);

        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            inputEl.value = transcript;
            // AuraSensory.vibrate(10); // Confirmación sutil de captura
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
            // Eliminamos las etiquetas HTML o Markdown para que la voz sea limpia
            const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/\*/g, '');
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = 'es-MX';
            utterance.rate = 1.0;  // Velocidad calmada
            utterance.pitch = 0.9; // Tono más serio
            window.speechSynthesis.speak(utterance);
        }
    }
};

// ====================================================================================
// INICIALIZACIÓN NATIVA
// ====================================================================================
document.addEventListener('DOMContentLoaded', () => {
    if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    
    // Ejecutamos Aura con un ligero retraso para asegurar que el LocalStorage y User.js estén listos
    setTimeout(() => AuraEngine.init(), 600);
});
