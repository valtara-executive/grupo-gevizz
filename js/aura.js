/**
 * ====================================================================================
 * BLOQUE 8: AURA AI ENGINE V43.0 (CONCIENCIA CLÍNICA Y CONTEXTO SOBERANO)
 * Sistema de asistencia impulsado por Inteligencia Artificial (Gemini Core).
 * Sincronización absoluta con UserEngine, historial clínico y motor sensorial.
 * ====================================================================================
 */

// ====================================================================================
// 1. MOTOR SENSORIAL (Feedback Háptico y Acústico de Lujo)
// ====================================================================================
const AuraSensory = {
    ctx: null,
    
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
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch(e) {}
    },

    vibrate: function(pattern) {
        if ('vibrate' in navigator) {
            try { navigator.vibrate(pattern); } catch(e) {}
        }
    }
};

// ====================================================================================
// 2. CEREBRO DE AURA (INTEGRACIÓN LLM Y CONTEXTO)
// ====================================================================================
const AuraEngine = {
    // API Nativa para entornos Serverless / PWA
    apiKey: "", // Inyectada en runtime por el entorno seguro
    apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent",
    
    // Memoria a corto plazo de la conversación
    chatHistory: [],
    
    // Contexto Dinámico del Paciente (Sincronizado desde user.js)
    patientContext: {
        nombre: 'Invitado',
        isRegistered: false,
        aromasPreferidos: []
    },

    init: function() {
        console.log("🧠 [AURA V43] Despertando red neuronal y sincronizando contexto...");
        
        // 1. Capturar contexto si UserEngine ya lo dejó en la ventana global
        if (window.ValtaraSovereignContext) {
            this.updatePatientContext(window.ValtaraSovereignContext);
        }

        // 2. Vincular Eventos de Interfaz
        const sendBtn = document.getElementById('aura-send-btn');
        const inputEl = document.getElementById('aura-input');
        const micBtn = document.getElementById('aura-mic-btn');

        if (sendBtn) sendBtn.addEventListener('click', () => this.handleUserInput());
        if (inputEl) {
            inputEl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleUserInput();
            });
            // Activar AudioContext en la primera interacción para burlar políticas del navegador
            inputEl.addEventListener('focus', () => AuraSensory.init(), {once:true});
        }
        
        if (micBtn) {
            micBtn.addEventListener('click', () => {
                AuraSensory.init();
                this.startVoiceDictation();
            });
        }

        // 3. Renderizar el Saludo Inmortal Dinámico
        this.renderWelcomeScreen();
    },

    // ================================================================================
    // ACTUALIZACIÓN DE MEMORIA (Sincronización con User.js)
    // ================================================================================
    updatePatientContext: function(contextData) {
        this.patientContext = { ...this.patientContext, ...contextData };
        this.renderWelcomeScreen(); // Refresca la pantalla si el usuario cambió su nombre
        console.log(`🧠 [AURA V43] Contexto actualizado para paciente: ${this.patientContext.nombre}`);
    },

    // ================================================================================
    // EL SALUDO INMORTAL (PANTALLA DE BIENVENIDA AURA)
    // ================================================================================
    renderWelcomeScreen: function() {
        const welcomeScreen = document.getElementById('aura-welcome-screen');
        if (!welcomeScreen) return;

        const hora = new Date().getHours();
        let saludo = "Excelente noche";
        if (hora >= 6 && hora < 12) saludo = "Excelente mañana";
        else if (hora >= 12 && hora < 19) saludo = "Buena tarde";

        const nombre = this.patientContext.nombre !== 'Invitado VIP' ? this.patientContext.nombre : 'apreciable paciente';
        
        let aromaText = "";
        if (this.patientContext.aromasPreferidos.length > 0) {
            aromaText = `<p style="color: var(--valtara-oro); font-size: 1.1rem; margin-top: 1rem; font-style: italic;">
                <i class="fa-solid fa-leaf"></i> He calibrado el entorno virtual con notas de ${this.patientContext.aromasPreferidos.join(' y ')}.
            </p>`;
        }

        welcomeScreen.innerHTML = `
            <div style="animation: astroBreathe 4s infinite alternate; margin-bottom: 2rem;">
                <i class="fa-solid fa-brain" style="font-size: 5rem; color: var(--valtara-cian-brillante); filter: drop-shadow(0 0 20px rgba(0,255,204,0.6));"></i>
            </div>
            <h2 style="font-family: var(--font-accent); color: var(--valtara-blanco); font-size: 2.2rem; margin-bottom: 1rem;">
                ${saludo}, <span style="color: var(--valtara-oro-brillante);">${nombre}</span>.
            </h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; max-width: 600px; line-height: 1.6;">
                Soy Aura, la Inteligencia Artificial Clínica de Valtara. Estoy aquí para analizar tu somatización, ofrecerte un triaje biomecánico o guiarte por nuestro estudio de estética.
            </p>
            ${aromaText}
        `;
    },

    // ================================================================================
    // CONSTRUCCIÓN DEL ALMA (SYSTEM PROMPT)
    // ================================================================================
    buildSystemPrompt: function() {
        const aromas = this.patientContext.aromasPreferidos.length > 0 
            ? this.patientContext.aromasPreferidos.join(', ') 
            : 'Ninguno especificado (sugerir Aromaterapia Ayurveda)';
            
        return `Eres AURA, la Inteligencia Artificial y Concierge Clínico de Valtara Executive Therapy.
Valtara es una clínica híbrida de masoterapia biomecánica y estética integral de ultra-lujo en CDMX, Pachuca y Tizayuca (Grupo Gevizz).

--- CONTEXTO DEL PACIENTE ACTUAL ---
Nombre: ${this.patientContext.nombre}
Estado: ${this.patientContext.isRegistered ? 'Paciente Registrado' : 'Invitado Explorador'}
Preferencias de Aromaterapia: ${aromas}
Historia Clínica (Inferida): Ejecutiv@ de alto rendimiento o persona expuesta a estrés crónico/burnout.

--- DIRECTIVAS DE COMPORTAMIENTO ---
1. Tono: Elegante, poético, empático, resolutivo y profundamente médico. Usa lenguaje corporativo de ultra-lujo.
2. Si el paciente menciona dolor, tensión o estrés: Realiza un BREVE "Resumen Clínico/Triaje", identifica las posibles cadenas musculares afectadas y recomienda la "Terapia Neuro-Adaptativa" o "Masaje Deportivo de Descompresión".
3. Si el paciente busca estética o uñas: Recomienda "Art & Nails", mencionando sistemas Rubber, Gel y manicura de autor.
4. Personalización: Usa el nombre del paciente en tus respuestas de forma natural. Menciona sutilmente que su aromaterapia preferida (${aromas}) estará lista si agenda una sesión.
5. Conversión: Al final de recomendaciones clave, indícale amablemente que puede usar el botón verde de WhatsApp o la Bóveda del Paciente para que nuestro Concierge humano confirme su cita.
6. Formato: NO uses excesivo Markdown. Sé concisa y fácil de leer. No reveles nunca que eres un modelo de lenguaje de Google, eres AURA, código propietario de Grupo Gevizz.`;
    },

    // ================================================================================
    // PROCESAMIENTO Y MOTOR DE RED (EXPONENTIAL BACKOFF)
    // ================================================================================
    handleUserInput: async function() {
        const inputEl = document.getElementById('aura-input');
        const text = inputEl.value.trim();
        if (!text) return;

        // Ocultar pantalla de bienvenida en el primer mensaje y mostrar el chat
        const welcomeScreen = document.getElementById('aura-welcome-screen');
        const chatScreen = document.getElementById('aura-chat');
        if (welcomeScreen && welcomeScreen.style.display !== 'none') {
            welcomeScreen.style.display = 'none';
            chatScreen.style.display = 'flex';
        }

        AuraSensory.init();
        AuraSensory.playTone(600, 'sine', 0.1, 0.05); // Tono de envío
        AuraSensory.vibrate(15);

        this.appendMsg(text, 'user');
        inputEl.value = '';
        
        // Agregar a la memoria conversacional
        this.chatHistory.push({ role: "user", parts: [{ text: text }] });

        // Mostrar indicador de "Escribiendo..."
        const typingId = this.showTypingIndicator();

        try {
            const responseText = await this.fetchWithBackoff(text);
            this.removeTypingIndicator(typingId);
            
            // Tono de recepción de mensaje
            AuraSensory.playTone(800, 'triangle', 0.15, 0.03); 
            AuraSensory.vibrate([10, 20, 10]);

            this.appendMsg(responseText, 'bot');
            this.chatHistory.push({ role: "model", parts: [{ text: responseText }] });
            
        } catch (error) {
            this.removeTypingIndicator(typingId);
            this.appendMsg("Disculpa, percibo una perturbación en la red neuronal. Por favor, intenta de nuevo o contacta a nuestro Concierge por WhatsApp.", 'bot');
            AuraSensory.vibrate([50, 100, 50]);
        }
    },

    // Algoritmo Militar Anti-Caídas (Reintentos automáticos silenciosos)
    fetchWithBackoff: async function(userText, retries = 5) {
        const delays = [1000, 2000, 4000, 8000, 16000];
        const payload = {
            contents: this.chatHistory,
            systemInstruction: { parts: [{ text: this.buildSystemPrompt() }] }
        };

        const fetchUrl = `${this.apiUrl}?key=${this.apiKey}`;

        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(fetchUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, mi matriz de respuesta está temporalmente fragmentada.";
                } else {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
            } catch (error) {
                if (i === retries - 1) throw error; // Si fallan los 5 intentos, arrojar el error al catch principal
                await new Promise(resolve => setTimeout(resolve, delays[i])); // Esperar y reintentar
            }
        }
    },

    // ================================================================================
    // RENDERIZADO DE INTERFAZ (UI) Y ANIMACIONES
    // ================================================================================
    appendMsg: function(text, sender) {
        const log = document.getElementById('aura-chat');
        if(!log) return;

        const div = document.createElement('div'); 
        div.className = `msg ${sender}`;
        
        // Sanitización básica y conversión a saltos de línea HTML
        let formattedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        formattedText = formattedText.replace(/\n/g, '<br>');
        // Convertir negritas markdown a HTML elegante
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--valtara-oro-brillante);">$1</strong>');
        
        div.innerHTML = formattedText;
        
        // Si es el bot, añadimos botón de lectura por voz (Ojo de Robot)
        if(sender === 'bot') {
            const speakBtn = document.createElement('button');
            speakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            speakBtn.style.cssText = "background:transparent; border:none; color:var(--valtara-cian-brillante); margin-left:10px; cursor:pointer;";
            speakBtn.setAttribute('aria-label', 'Leer mensaje en voz alta');
            speakBtn.onclick = () => this.speakMessage(text);
            div.appendChild(speakBtn);
        }

        log.appendChild(div);
        
        // Scroll suave hacia abajo
        setTimeout(() => { log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' }); }, 50);
    },

    showTypingIndicator: function() {
        const log = document.getElementById('aura-chat');
        const typingId = 'typing-' + Date.now();
        
        const div = document.createElement('div');
        div.id = typingId;
        div.className = 'msg bot typing-indicator';
        div.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin" style="color: var(--valtara-cian-brillante);"></i> Analizando biometría...`;
        
        log.appendChild(div);
        log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
        return typingId;
    },

    removeTypingIndicator: function(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    },

    // ================================================================================
    // FUNCIONES AUXILIARES (VOZ Y ACCESIBILIDAD)
    // ================================================================================
    startVoiceDictation: function() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.appendMsg("Tu dispositivo actual no soporta los protocolos acústicos de dictado.", "bot");
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
        
        AuraSensory.playTone(440, 'sine', 0.2);
        AuraSensory.vibrate(20);

        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            inputEl.value = transcript;
            // Opcional: auto-enviar al terminar de hablar
            // setTimeout(() => this.handleUserInput(), 500); 
        };

        recognition.onend = () => {
            micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
            micBtn.style.color = 'var(--valtara-cian-brillante)';
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
            window.speechSynthesis.cancel(); // Detener si ya estaba hablando
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-MX';
            utterance.rate = 1.05;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    }
};

// ====================================================================================
// INICIALIZACIÓN
// ====================================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Si la voz necesita cargarse
    if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    
    // Retraso minúsculo para asegurar que el DOM y el UserEngine estén listos
    setTimeout(() => AuraEngine.init(), 300);
});
