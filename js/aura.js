/**
 * ====================================================================================
 * AURA AI ENGINE (PRODUCCIÓN - SENSORY UPDATE)
 * ------------------------------------------------------------------------------------
 * - Sonido de espera tipo GPT (Respiración de baja frecuencia).
 * - Doble Pop al enviar y vibraciones hápticas.
 * - Teclado y micrófono desbloqueados desde el inicio.
 * - Indicador visual "Pensando...".
 * - Enlaces y API de producción intactos.
 * ====================================================================================
 */

// ====================================================================================
// 1. MOTOR SENSORIAL (Sonidos GPT y Vibración)
// ====================================================================================
const AuraSensory = {
    ctx: null,
    thinkingInterval: null,
    osc: null,
    gain: null,

    init: function() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if(AudioContext) this.ctx = new AudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    playTone: function(freq, type, duration, vol = 0.1) {
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

    // DOBLE POP (Al enviar mensaje)
    playSend: function() {
        this.init();
        this.playTone(400, 'sine', 0.1, 0.15); // Primer pop
        setTimeout(() => this.playTone(500, 'sine', 0.1, 0.2), 100); // Segundo pop más agudo
        if(navigator.vibrate) navigator.vibrate([15, 30, 15]); // Doble vibración corta
    },

    // GPT BREATH (Sonido de espera / buscando)
    startThinking: function() {
        this.init();
        try {
            this.osc = this.ctx.createOscillator();
            this.gain = this.ctx.createGain();
            
            this.osc.type = 'sine';
            this.osc.frequency.setValueAtTime(180, this.ctx.currentTime); // Frecuencia grave tipo GPT
            
            // Efecto de respiración rítmica (Fade In / Fade Out)
            this.gain.gain.setValueAtTime(0, this.ctx.currentTime);
            this.gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 1);
            this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2);
            
            this.osc.connect(this.gain);
            this.gain.connect(this.ctx.destination);
            
            this.osc.start();
            
            this.thinkingInterval = setInterval(() => {
                this.gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 1);
                this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2);
            }, 2000);
        } catch(e) {}
    },

    stopThinking: function() {
        if(this.thinkingInterval) clearInterval(this.thinkingInterval);
        if(this.osc) {
            try { this.osc.stop(); this.osc.disconnect(); } catch(e){}
        }
    },

    // ACORDE DE CRISTAL (Al recibir mensaje)
    playReceive: function() {
        this.init();
        this.stopThinking();
        setTimeout(() => this.playTone(880, 'sine', 0.4, 0.1), 0);
        setTimeout(() => this.playTone(1108.73, 'sine', 0.6, 0.15), 150);
        if(navigator.vibrate) navigator.vibrate([20, 50, 20]);
    }
};

// ====================================================================================
// 2. CEREBRO DE AURA (Lógica, UI y Conexión de Producción)
// ====================================================================================
const AuraEngine = {
    isOpen: false,
    isTyping: false, 
    chatHistory: [], 
    userName: "Invitado",    
    
    // ENLACE DE PRODUCCIÓN INTACTO
    apiUrl: "https://aura-server-erfj.vercel.app/api/chat",
    
    recognition: null,
    isRecording: false,
    activeSpeakBtn: null,   

    init: function() {
        this.refreshIdentity(); 
        this.forceInjectStyles(); 
        this.initVoiceEngines(); 
        this.bindEvents(); 
        this.enableInputs(); // Desbloquea inputs desde el inicio
        
        window.addEventListener('valtaraIdentityUpdated', () => {
            this.refreshIdentity();
        });
        
        // Desbloquear motor de audio nativo en el primer tap
        window.addEventListener('click', () => AuraSensory.init(), { once: true });
        window.addEventListener('touchstart', () => AuraSensory.init(), { once: true });
    },

    // DESBLOQUEO DE TECLADO Y DICTADO
    enableInputs: function() {
        const inputField = document.getElementById('aura-input');
        const micBtn = document.getElementById('aura-mic-btn');
        if(inputField) {
            inputField.disabled = false;
            inputField.style.pointerEvents = 'auto';
        }
        if(micBtn) {
            micBtn.disabled = false;
            micBtn.style.pointerEvents = 'auto';
            micBtn.style.opacity = '1';
        }
    },

    refreshIdentity: function() {
        try {
            const storedData = localStorage.getItem('valtara_vault_v15') || localStorage.getItem('valtara_sovereign_profile');
            if (storedData) {
                const parsed = JSON.parse(storedData);
                this.userName = (parsed && parsed.name && parsed.name !== "Apreciable visitante" && parsed.name !== "Invitado VIP") ? parsed.name : "Invitado";
            } else {
                this.userName = "Invitado";
            }
        } catch (e) { console.error("Error Bóveda:", e); }
    },

    forceInjectStyles: function() {
        if(document.getElementById('aura-god-mode-styles')) return;
        const style = document.createElement('style');
        style.id = 'aura-god-mode-styles';
        style.innerHTML = `
            #aura-modal { background: rgba(5, 5, 10, 0.45) !important; border: 1px solid rgba(242, 201, 76, 0.4) !important; }
            .aura-container { background: transparent !important; }
            .modal-header { background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%) !important; border-bottom: 1px solid rgba(242,201,76,0.2) !important; }
            
            #aura-chat { display: flex !important; flex-direction: column !important; gap: 1.5rem !important; padding: 2rem 1rem !important; }
            
            .msg { max-width: 85% !important; width: fit-content !important; padding: 1.5rem 2rem !important; font-size: 1.25rem !important; line-height: 1.7 !important; border-radius: 2rem !important; box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important; animation: slideInMsg 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards !important; }
            
            .msg.user { align-self: flex-end !important; margin-left: auto !important; background: linear-gradient(135deg, rgba(242, 201, 76, 0.15), rgba(0,0,0,0.85)) !important; border: 1px solid rgba(242, 201, 76, 0.3) !important; border-right: 4px solid var(--valtara-oro) !important; border-bottom-right-radius: 0.5rem !important; color: var(--valtara-oro-suave) !important; }
            .msg.bot { align-self: flex-start !important; margin-right: auto !important; background: linear-gradient(135deg, rgba(0,255,255,0.08), rgba(0,0,0,0.85)) !important; border: 1px solid rgba(0,255,255,0.2) !important; border-left: 4px solid var(--valtara-cian-brillante) !important; border-bottom-left-radius: 0.5rem !important; color: var(--valtara-blanco) !important; }

            .msg.bot a, .msg.bot button { display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 12px !important; background: linear-gradient(135deg, var(--valtara-whatsapp), #128C7E) !important; color: var(--valtara-negro-fondo) !important; padding: 1.2rem 2.5rem !important; border-radius: 3rem !important; text-decoration: none !important; font-weight: 900 !important; font-family: var(--font-main) !important; margin-top: 1.5rem !important; border: none !important; box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3) !important; text-align: center !important; width: fit-content !important; transition: all 0.3s ease !important; }
            .msg.bot a:hover { transform: translateY(-3px) scale(1.05) !important; box-shadow: 0 15px 35px rgba(37, 211, 102, 0.6) !important; color: #fff !important; }

            .msg.bot .aura-speak-btn { background: rgba(0,255,255,0.05) !important; border: 1px solid var(--valtara-cian-brillante) !important; color: var(--valtara-cian-brillante) !important; padding: 0 !important; width: 45px !important; height: 45px !important; border-radius: 50% !important; margin-top: 0 !important; margin-left: 15px !important; box-shadow: none !important; }

            /* Pantalla de bienvenida no bloquea el click abajo */
            #aura-welcome-screen { background: transparent !important; z-index: 50 !important; pointer-events: none; }
            .aura-suggestion-card { pointer-events: auto; background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.6) 100%); border-radius: 1.5rem; padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; text-align: left; cursor: pointer; transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.5); width: 100%; border: 1px solid rgba(255,255,255,0.1); }
            .aura-suggestion-card:hover { transform: translateY(-5px); background: linear-gradient(90deg, rgba(242, 201, 76, 0.15) 0%, rgba(0,0,0,0.8) 100%); border-color: var(--valtara-oro) !important; }
            
            .aura-controls { pointer-events: auto !important; position: relative; z-index: 60 !important; }

            @keyframes pulseAuraGold { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1.2); opacity: 1; } }
            @keyframes slideInMsg { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
            @keyframes pulseThinking { 0% { opacity: 0.4; } 100% { opacity: 1; } }
        `;
        document.head.appendChild(style);
    },

    renderUltraLujoWelcome: function() {
        const welcomeContainer = document.getElementById('aura-welcome-screen');
        if(!welcomeContainer) return;
        
        const hour = new Date().getHours();
        let timeGreeting = hour >= 4 && hour < 12 ? "Buenos días" : hour >= 12 && hour < 19 ? "Buenas tardes" : "Buenas noches";

        welcomeContainer.style.display = 'flex';
        welcomeContainer.style.opacity = '1';
        welcomeContainer.style.transform = 'translateY(0) scale(1)';

        welcomeContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; max-width: 700px; margin: auto; padding: 1rem; pointer-events: none;">
                <div style="position: relative; margin-bottom: 2.5rem; display: flex; justify-content: center; align-items: center;">
                    <div style="position: absolute; width: 140px; height: 140px; background: radial-gradient(circle, rgba(242,201,76,0.35) 0%, transparent 100%); border-radius: 50%; filter: blur(25px); animation: pulseAuraGold 3s infinite alternate;"></div>
                    <i class="fa-solid fa-sparkles" style="font-size: 4.5rem; color: var(--valtara-oro); position: relative; z-index: 2; text-shadow: 0 0 40px rgba(242,201,76,0.9);"></i>
                </div>
                <h2 style="font-size: 3.5rem; font-family: var(--font-accent); font-weight: 600; margin-bottom: 1rem; text-align: center; color: var(--valtara-blanco); line-height: 1.2;">${timeGreeting}</h2>
                <p style="font-size: 1.3rem; color: #e2e2e8; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4rem; text-align: center; border-bottom: 1px solid rgba(242,201,76,0.3); padding-bottom: 1.5rem;">¿Cómo podemos ayudarte el día de hoy?</p>
                
                <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; width: 100%; pointer-events: auto;">
                    <button class="aura-suggestion-card" data-query="Necesito un masaje relajante y descompresión física">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(0,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); display: flex; justify-content: center; align-items: center; flex-shrink: 0;"><i class="fa-solid fa-spa" style="color: var(--valtara-cian-brillante); font-size: 2.2rem;"></i></div>
                        <div style="flex-grow: 1;"><span style="color: var(--valtara-blanco); font-size: 1.5rem; font-weight: 700; font-family: var(--font-accent); display: block; margin-bottom: 0.3rem;">Masaje Relajante</span><span style="color: #aaa; font-size: 1.1rem; font-weight: 300; line-height: 1.4;">Deseo agendar una sesión para liberar estrés acumulado.</span></div>
                    </button>
                    <button class="aura-suggestion-card" data-query="Me duele la espalda, el cuello o tengo tensión crónica por el trabajo">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(242, 201, 76, 0.1); border: 1px solid rgba(242, 201, 76, 0.3); display: flex; justify-content: center; align-items: center; flex-shrink: 0;"><i class="fa-solid fa-child-reaching" style="color: var(--valtara-oro); font-size: 2.2rem;"></i></div>
                        <div style="flex-grow: 1;"><span style="color: var(--valtara-blanco); font-size: 1.5rem; font-weight: 700; font-family: var(--font-accent); display: block; margin-bottom: 0.3rem;">Terapia Biomecánica</span><span style="color: #aaa; font-size: 1.1rem; font-weight: 300; line-height: 1.4;">Evaluación profunda y tratamiento de dolores musculares.</span></div>
                    </button>
                    <button class="aura-suggestion-card" data-query="Quiero conocer los precios de los servicios y paquetes">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(178, 0, 255, 0.1); border: 1px solid rgba(178, 0, 255, 0.3); display: flex; justify-content: center; align-items: center; flex-shrink: 0;"><i class="fa-solid fa-tag" style="color: var(--valtara-morado-vivo); font-size: 2.2rem;"></i></div>
                        <div style="flex-grow: 1;"><span style="color: var(--valtara-blanco); font-size: 1.5rem; font-weight: 700; font-family: var(--font-accent); display: block; margin-bottom: 0.3rem;">Tarifas y Paquetes</span><span style="color: #aaa; font-size: 1.1rem; font-weight: 300; line-height: 1.4;">Explorar el catálogo de inversiones en bienestar.</span></div>
                    </button>
                </div>
            </div>
        `;
    },

    initVoiceEngines: function() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'es-MX'; 
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.onresult = (e) => {
                const inputField = document.getElementById('aura-input');
                if(inputField) inputField.value = e.results[0][0].transcript;
                this.handleInput(); // Auto-envía el mensaje al terminar de dictar
            };
            this.recognition.onend = () => { this.resetMicBtn(); };
            this.recognition.onerror = () => { this.resetMicBtn(true); };
        } else {
            const micBtn = document.getElementById('aura-mic-btn');
            if(micBtn) micBtn.style.display = 'none';
        }
    },

    resetMicBtn: function(isError = false) {
        this.isRecording = false;
        const micBtn = document.getElementById('aura-mic-btn');
        if(micBtn) {
            micBtn.classList.remove('mic-recording');
            micBtn.innerHTML = isError ? '<i class="fa-solid fa-microphone-slash"></i>' : '<i class="fa-solid fa-microphone"></i>';
            micBtn.style.color = "var(--valtara-cian-brillante)";
            if(isError) setTimeout(() => { micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>'; }, 2000);
        }
    },

    bindEvents: function() {
        const toggleBtn = document.getElementById('fab-aura');
        const closeBtn = document.getElementById('aura-close-btn');
        const sendBtn = document.getElementById('aura-send-btn');
        const inputField = document.getElementById('aura-input');
        const micBtn = document.getElementById('aura-mic-btn');

        if(toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                if(!this.isOpen && this.chatHistory.length === 0) this.renderUltraLujoWelcome(); 
                this.toggleModal();
            });
        }
        if(closeBtn) closeBtn.addEventListener('click', () => this.toggleModal()); 
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.close-modal-btn[data-close="aura-modal"]')) {
                if(this.isOpen) this.toggleModal();
            }
        });

        if(sendBtn) sendBtn.addEventListener('click', () => this.handleInput());
        if(inputField) inputField.addEventListener('keypress', (e) => { if(e.key === 'Enter') this.handleInput(); });

        if(micBtn && this.recognition) {
            micBtn.addEventListener('click', () => {
                AuraSensory.init(); // Permiso de audio
                if(this.isRecording) { this.recognition.stop(); } 
                else { 
                    try { 
                        this.recognition.start(); 
                        this.isRecording = true; 
                        micBtn.classList.add('mic-recording'); 
                        micBtn.innerHTML = '<i class="fa-solid fa-stop"></i>'; 
                        micBtn.style.color = "var(--v-rosa-mexicano)";
                    } catch(e) {} 
                }
            });
        }

        const modalContainer = document.getElementById('aura-modal');
        if(modalContainer) {
            modalContainer.addEventListener('click', (e) => {
                const targetCard = e.target.closest('.aura-suggestion-card');
                if(targetCard) {
                    const query = targetCard.getAttribute('data-query');
                    if(query) this.processDirectQuery(query);
                }
            });
        }
    },

    toggleModal: function() {
        const modal = document.getElementById('aura-modal');
        if(!modal) return;
        this.isOpen = !this.isOpen;
        if (!this.isOpen) { window.speechSynthesis.cancel(); this.resetActiveSpeakBtn(); }
    },

    hideWelcomeScreen: function() {
        const welcomeScreen = document.getElementById('aura-welcome-screen');
        if(welcomeScreen && welcomeScreen.style.display !== 'none') {
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.transform = 'translateY(-50px) scale(0.95)';
            setTimeout(() => { welcomeScreen.style.display = 'none'; }, 600); 
        }
    },

    handleInput: function() {
        if(this.isTyping) return; 
        const inputField = document.getElementById('aura-input');
        if (!inputField || inputField.value.trim() === '') return; 
        
        const txt = inputField.value.trim(); 
        inputField.value = ''; 
        
        AuraSensory.playSend(); // Doble Pop
        this.hideWelcomeScreen(); 
        this.appendMsg(txt, 'user'); 
        this.sendMessageToAI(txt);
    },

    processDirectQuery: function(query) {
        if(this.isTyping) return;
        AuraSensory.playSend(); // Doble pop
        this.hideWelcomeScreen(); 
        this.appendMsg(query, 'user');
        this.sendMessageToAI(query);
    },

    sendMessageToAI: async function(userText) {
        this.isTyping = true;
        window.speechSynthesis.cancel();
        this.resetActiveSpeakBtn();
        
        const chatLog = document.getElementById('aura-chat');
        this.chatHistory.push({ role: "user", content: userText });

        // MENSAJE TEMPORAL "PENSANDO..."
        const typingDiv = document.createElement('div');
        typingDiv.id = 'temp-typing';
        typingDiv.className = 'msg bot';
        typingDiv.style.cssText = "opacity: 0.8; font-style: italic; max-width: 85%; padding: 1.5rem 2rem; border-radius: 2rem; background: linear-gradient(135deg, rgba(0,255,255,0.05), rgba(0,0,0,0.8)); border: 1px solid rgba(0,255,255,0.2); border-left: 4px solid var(--valtara-cian-brillante); color: #fff; align-self: flex-start; margin-right: auto;";
        typingDiv.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" style="color: var(--valtara-cian-brillante); margin-right: 10px; font-size: 1.2rem;"></i> <span style="animation: pulseThinking 1.5s infinite alternate;">Pensando...</span>';
        chatLog.appendChild(typingDiv);
        chatLog.scrollTo({ top: chatLog.scrollHeight, behavior: 'smooth' });

        AuraSensory.startThinking(); // Sonido GPT Breath

        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ history: this.chatHistory, userName: this.userName })
            });

            if(document.getElementById('temp-typing')) document.getElementById('temp-typing').remove();
            if (!response.ok) throw new Error("Error de conexión.");

            const data = await response.json();
            let auraRespuesta = data.reply;
            
            if (!auraRespuesta.includes("leve interrupción")) this.chatHistory.push({ role: "assistant", content: auraRespuesta });
            
            let auraFormateada = auraRespuesta.replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank"><i class="fa-brands fa-whatsapp" style="font-size: 1.5rem;"></i> $1</a>');
            auraFormateada = auraFormateada.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
            auraFormateada = auraFormateada.replace(/style="[^"]*"/gi, ''); 
            auraFormateada = auraFormateada.replace(/\n/g, '<br>');
            
            AuraSensory.playReceive();
            this.appendMsg(auraFormateada, 'bot', true);

        } catch (error) {
            AuraSensory.stopThinking();
            if(document.getElementById('temp-typing')) document.getElementById('temp-typing').remove();
            this.appendMsg(`Por una leve interrupción en nuestra red, no he podido procesar tu solicitud. Comunícate en WhatsApp:<br><br><a href="https://wa.me/5213348572070" target="_blank"><i class="fa-brands fa-whatsapp" style="font-size: 1.5rem;"></i> Abrir WhatsApp</a>`, 'bot', true);
            this.chatHistory.pop();
        } finally {
            this.isTyping = false;
        }
    },

    resetActiveSpeakBtn: function() {
        if (this.activeSpeakBtn) {
            this.activeSpeakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            this.activeSpeakBtn.style.color = 'var(--valtara-cian-brillante)';
            this.activeSpeakBtn.style.borderColor = 'var(--valtara-cian-brillante)';
            this.activeSpeakBtn.classList.remove('is-speaking');
            this.activeSpeakBtn = null;
        }
    },

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
        btnElement.innerHTML = '<i class="fa-solid fa-stop"></i>'; 
        btnElement.style.color = '#ff5555';
        btnElement.style.borderColor = '#ff5555';

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        tempDiv.querySelectorAll('a, button').forEach(el => el.remove());

        const utterance = new SpeechSynthesisUtterance(tempDiv.innerText || tempDiv.textContent);
        utterance.lang = 'es-MX';
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => voice.lang.includes('es') && voice.name.toLowerCase().includes('female'));
        if(preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => { this.resetActiveSpeakBtn(); };
        utterance.onerror = () => { this.resetActiveSpeakBtn(); };
        window.speechSynthesis.speak(utterance);
    },

    appendMsg: function(txtOrHtml, sender, isHtml = false) {
        const log = document.getElementById('aura-chat');
        if(!log) return;

        const div = document.createElement('div'); 
        div.className = `msg ${sender}`;
        
        const contentDiv = document.createElement('div');
        if(isHtml) contentDiv.innerHTML = txtOrHtml; 
        else contentDiv.textContent = txtOrHtml; 
        
        if(sender === 'bot') {
            const speakBtn = document.createElement('button');
            speakBtn.className = 'aura-speak-btn';
            speakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            speakBtn.addEventListener('click', () => { this.speakMessage(txtOrHtml, speakBtn); });

            const flexContainer = document.createElement('div');
            flexContainer.style.display = 'flex'; 
            flexContainer.style.justifyContent = 'space-between'; 
            flexContainer.style.alignItems = 'flex-start';
            flexContainer.appendChild(contentDiv); 
            flexContainer.appendChild(speakBtn);
            div.appendChild(flexContainer);
        } else {
            div.appendChild(contentDiv);
        }
        
        log.appendChild(div);
        setTimeout(() => { log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' }); }, 50);
    }
};

window.addEventListener('DOMContentLoaded', () => {
    if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    AuraEngine.init();
});
