/**
 * ====================================================================================
 * AURA AI ENGINE V22.0 (MULTI-MODEL FAILOVER & SENSORY INTELLIGENCE)
 * ------------------------------------------------------------------------------------
 * Integración: Meta Llama 3.1 & Qwen 2.5 vía Groq.
 * Feedback: Sonido de procesado GPT-Style y sincronización con UserEngine.
 * ====================================================================================
 */

const AuraEngine = {
    // 1. CONFIGURACIÓN DE RED (Soberanía de Modelos)
    config: {
        endpoint: "https://api.groq.com/openai/v1/chat/completions",
        apiKey: "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", // Reemplazar por tu Key de producción
        models: [
            "llama-3.1-70b-versatile", // Meta (Principal)
            "qwen-2.5-coder-32b",      // Chino (Failover 1)
            "mixtral-8x7b-32768"       // Respaldo (Failover 2)
        ],
        currentModelIndex: 0
    },

    // 2. MOTOR SENSORIAL (Web Audio API)
    sensory: {
        ctx: null,
        osc: null,
        gain: null,
        
        init: function() {
            if (!this.ctx) {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            }
        },

        startThinkingSound: function() {
            this.init();
            this.osc = this.ctx.createOscillator();
            this.gain = this.ctx.createGain();
            
            this.osc.type = 'sine';
            this.osc.frequency.setValueAtTime(180, this.ctx.currentTime);
            
            // Efecto de respiración rítmica (GPT-style)
            this.gain.gain.setValueAtTime(0, this.ctx.currentTime);
            this.gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 1);
            this.gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2);
            
            this.osc.connect(this.gain);
            this.gain.connect(this.ctx.destination);
            
            this.osc.start();
            // Loop de respiración
            this.interval = setInterval(() => {
                this.gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 1);
                this.gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 2);
            }, 2000);
        },

        stopThinkingSound: function() {
            if (this.osc) {
                clearInterval(this.interval);
                this.osc.stop();
                this.osc.disconnect();
            }
        }
    },

    // 3. INICIALIZACIÓN
    init: function() {
        console.log("🧠 [AURA V22] Conectando neuronas y activando periféricos...");
        this.bindEvents();
        this.syncUserContext();
        this.enableInputs(); // Habilitar mic y teclado desde el inicio
    },

    syncUserContext: function() {
        const profile = localStorage.getItem('valtara_sovereign_profile');
        this.userContext = profile ? JSON.parse(profile) : { name: "Director" };
    },

    enableInputs: function() {
        const input = document.getElementById('aura-input');
        const mic = document.getElementById('aura-mic-btn');
        if(input) input.disabled = false;
        if(mic) mic.style.opacity = "1";
    },

    bindEvents: function() {
        const sendBtn = document.getElementById('aura-send-btn');
        const input = document.getElementById('aura-input');
        const micBtn = document.getElementById('aura-mic-btn');

        if(sendBtn) sendBtn.onclick = () => this.handleMessage();
        if(input) input.onkeypress = (e) => { if(e.key === 'Enter') this.handleMessage(); };
        if(micBtn) micBtn.onclick = () => this.toggleSpeech();
    },

    // 4. LÓGICA DE PETICIÓN (Failover Loop)
    async sendMessageToAI(prompt) {
        this.sensory.startThinkingSound();
        this.addMessage("bot", "Aura pensando...", false, "thinking-temp");

        for (let i = this.config.currentModelIndex; i < this.config.models.length; i++) {
            try {
                const response = await fetch(this.config.endpoint, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${this.config.apiKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: this.config.models[i],
                        messages: [
                            { role: "system", content: `Eres Aura, la conciencia biomecánica de Valtara. Tu paciente es ${this.userContext.name}. Sé empática, clínica y usa un tono de ultra-lujo.` },
                            { role: "user", content: prompt }
                        ],
                        temperature: 0.7
                    })
                });

                if (!response.ok) throw new Error("Model failed");

                const data = await response.json();
                this.sensory.stopThinkingSound();
                this.removeTempMessage();
                return data.choices[0].message.content;

            } catch (err) {
                console.warn(`⚠️ Fallo en modelo ${this.config.models[i]}. Intentando respaldo...`);
                continue; // Salta al siguiente modelo chino o de respaldo
            }
        }
        
        this.sensory.stopThinkingSound();
        return "Lo lamento, mi red neuronal está bajo mantenimiento biomecánico. Por favor, contacta a nuestro concierge.";
    },

    // 5. INTERFAZ DE USUARIO
    async handleMessage() {
        const input = document.getElementById('aura-input');
        const text = input.value.trim();
        if (!text) return;

        input.value = "";
        this.addMessage("user", text);
        
        const aiResponse = await this.sendMessageToAI(text);
        this.addMessage("bot", aiResponse);
    },

    addMessage(sender, text, isHtml = false, tempId = null) {
        const log = document.getElementById('aura-chat');
        if (!log) return;

        const div = document.createElement('div');
        div.className = `msg ${sender}`;
        if(tempId) div.id = tempId;
        div.textContent = text;
        
        log.appendChild(div);
        log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
    },

    removeTempMessage() {
        const temp = document.getElementById('thinking-temp');
        if(temp) temp.remove();
    },

    // 6. RECONOCIMIENTO DE VOZ (Mejorado para acceso instantáneo)
    toggleSpeech: function() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return alert("Tu navegador no soporta voz.");

        const recognition = new SpeechRecognition();
        recognition.lang = 'es-MX';
        
        recognition.onstart = () => {
            document.getElementById('aura-mic-btn').style.color = "var(--v-rosa-mexicano)";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('aura-input').value = transcript;
            this.handleMessage();
        };

        recognition.onend = () => {
            document.getElementById('aura-mic-btn').style.color = "var(--valtara-cian-brillante)";
        };

        recognition.start();
    }
};

// Auto-arranque
document.addEventListener('DOMContentLoaded', () => AuraEngine.init());
