/**
 * ====================================================================================
 * BLOQUE 8: AURA AI ENGINE V19.0 (EVENT DELEGATION & AGGRESSIVE SYNC)
 * Repara botones sordos, inyecta identidad a la fuerza y mantiene el Modo Dios CSS.
 * ====================================================================================
 */

const AuraEngine = {
    isOpen: false,
    isTyping: false, 
    chatHistory: [], 
    userName: "Invitado",    
    apiUrl: "https://aura-server-erfj.vercel.app/api/chat",
    recognition: null,
    isRecording: false,
    activeSpeakBtn: null,   

    init: function() {
        this.refreshIdentity();
        this.forceInjectStyles(); 
        this.initVoiceEngines(); 
        this.bindEvents();
        
        // Escucha silenciosamente si el UserEngine dice que hubo un cambio de nombre
        window.addEventListener('valtaraIdentityUpdated', () => {
            this.refreshIdentity();
        });
    },

    // 1. SINCRONIZACIÓN AGRESIVA DE IDENTIDAD
    refreshIdentity: function() {
        try {
            const storedData = localStorage.getItem('valtara_vault_v15');
            if (storedData) {
                const parsed = JSON.parse(storedData);
                if (parsed && parsed.name && parsed.name !== "Apreciable visitante") {
                    this.userName = parsed.name;
                } else {
                    this.userName = "Invitado";
                }
            } else {
                this.userName = "Invitado";
            }
        } catch (e) { console.error("Error al leer la bóveda para Aura:", e); }

        // FUERZA BRUTA: Busca el SPAN en el HTML nativo y lo sobrescribe inmediatamente
        const nameSpan = document.getElementById('aura-welcome-name');
        if(nameSpan) {
            nameSpan.textContent = this.userName;
        }
    },

    forceInjectStyles: function() {
        if(document.getElementById('aura-god-mode-styles')) return;
        const style = document.createElement('style');
        style.id = 'aura-god-mode-styles';
        style.innerHTML = `
            #aura-modal { background: rgba(5, 5, 10, 0.45) !important; backdrop-filter: blur(25px) !important; -webkit-backdrop-filter: blur(25px) !important; border: 1px solid rgba(242, 201, 76, 0.4) !important; }
            .aura-container { background: transparent !important; }
            .modal-header { background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%) !important; border-bottom: 1px solid rgba(242,201,76,0.2) !important; }
            #aura-chat { display: flex !important; flex-direction: column !important; gap: 1.5rem !important; padding: 2rem 1rem !important; }
            .msg { max-width: 85% !important; width: fit-content !important; padding: 1.5rem 2rem !important; font-size: 1.25rem !important; line-height: 1.7 !important; border-radius: 2rem !important; box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important; backdrop-filter: blur(15px) !important; animation: slideInMsg 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards !important; }
            .msg.user { align-self: flex-end !important; margin-left: auto !important; background: linear-gradient(135deg, rgba(242, 201, 76, 0.15), rgba(0,0,0,0.85)) !important; border: 1px solid rgba(242, 201, 76, 0.3) !important; border-right: 4px solid var(--valtara-oro) !important; border-bottom-right-radius: 0.5rem !important; color: var(--valtara-oro-suave) !important; }
            .msg.bot { align-self: flex-start !important; margin-right: auto !important; background: linear-gradient(135deg, rgba(0,255,255,0.08), rgba(0,0,0,0.85)) !important; border: 1px solid rgba(0,255,255,0.2) !important; border-left: 4px solid var(--valtara-cian-brillante) !important; border-bottom-left-radius: 0.5rem !important; color: var(--valtara-blanco) !important; }
            .msg.bot a, .msg.bot button { display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 12px !important; background: linear-gradient(135deg, var(--valtara-whatsapp), #128C7E) !important; color: var(--valtara-negro-fondo) !important; padding: 1.2rem 2.5rem !important; border-radius: 3rem !important; text-decoration: none !important; font-weight: 900 !important; font-family: var(--font-main) !important; margin-top: 1.5rem !important; border: none !important; box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3) !important; white-space: normal !important; text-align: center !important; line-height: 1.3 !important; width: fit-content !important; max-width: 100% !important; transition: all 0.3s ease !important; }
            .msg.bot a:hover { transform: translateY(-3px) scale(1.05) !important; box-shadow: 0 15px 35px rgba(37, 211, 102, 0.6) !important; color: #fff !important; }
            .msg.bot .aura-speak-btn { background: rgba(0,255,255,0.05) !important; border: 1px solid var(--valtara-cian-brillante) !important; color: var(--valtara-cian-brillante) !important; padding: 0 !important; width: 45px !important; height: 45px !important; border-radius: 50% !important; margin-top: 0 !important; margin-left: 15px !important; box-shadow: none !important; }
            @keyframes slideInMsg { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
            #aura-welcome-screen { background: transparent !important; z-index: 50 !important; }
            .aura-suggestion-card { background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.6) 100%); border-radius: 1.5rem; padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; text-align: left; cursor: pointer; transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.5); width: 100%; border: 1px solid rgba(255,255,255,0.1); }
            .aura-suggestion-card:hover { transform: translateY(-5px); background: linear-gradient(90deg, rgba(242, 201, 76, 0.15) 0%, rgba(0,0,0,0.8) 100%); border-color: var(--valtara-oro) !important; }
        `;
        document.head.appendChild(style);
    },

    initVoiceEngines: function() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'es-MX'; 
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.onresult = (event) => {
                const inputField = document.getElementById('aura-input');
                if(inputField) inputField.value = event.results[0][0].transcript;
            };
            this.recognition.onend = () => {
                this.isRecording = false;
                const micBtn = document.getElementById('aura-mic-btn');
                if(micBtn) { micBtn.classList.remove('mic-recording'); micBtn.innerHTML = '<i aria-hidden="true" class="fa-solid fa-microphone"></i>'; }
            };
            this.recognition.onerror = () => {
                this.isRecording = false;
                const micBtn = document.getElementById('aura-mic-btn');
                if(micBtn) { micBtn.classList.remove('mic-recording'); micBtn.innerHTML = '<i aria-hidden="true" class="fa-solid fa-microphone-slash"></i>'; setTimeout(() => { micBtn.innerHTML = '<i aria-hidden="true" class="fa-solid fa-microphone"></i>'; }, 2000); }
            };
        } else {
            const micBtn = document.getElementById('aura-mic-btn');
            if(micBtn) micBtn.style.display = 'none';
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
                if(!this.isOpen) {
                    this.refreshIdentity(); // Obligamos a leer la identidad al abrir
                }
                this.toggleModal();
            });
        }
        
        if(closeBtn) closeBtn.addEventListener('click', () => this.toggleModal()); 
        document.querySelectorAll('.close-modal-btn[data-close="aura-modal"]').forEach(btn => {
            btn.addEventListener('click', () => { if(this.isOpen) this.toggleModal(); });
        });

        if(sendBtn) sendBtn.addEventListener('click', () => this.handleInput());
        if(inputField) inputField.addEventListener('keypress', (e) => { if(e.key === 'Enter') this.handleInput(); });

        if(micBtn && this.recognition) {
            micBtn.addEventListener('click', () => {
                if(this.isRecording) { this.recognition.stop(); } 
                else {
                    try { this.recognition.start(); this.isRecording = true; micBtn.classList.add('mic-recording'); micBtn.innerHTML = '<i aria-hidden="true" class="fa-solid fa-stop"></i>'; } catch(e) {}
                }
            });
        }

        // 2. LA MAGIA: DELEGACIÓN DE EVENTOS (Cura los botones sordos)
        const welcomeScreen = document.getElementById('aura-welcome-screen');
        if(welcomeScreen) {
            // Escuchamos clics en toda la pantalla de bienvenida
            welcomeScreen.addEventListener('click', (e) => {
                // Buscamos si el clic fue dentro de una tarjeta de sugerencia
                const targetBtn = e.target.closest('.aura-suggestion-card');
                if(targetBtn) {
                    const query = targetBtn.getAttribute('data-query');
                    this.processDirectQuery(query);
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
            welcomeScreen.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.transform = 'translateY(-50px) scale(0.95)';
            setTimeout(() => { 
                welcomeScreen.style.display = 'none'; 
            }, 600); 
        }
    },

    handleInput: function() {
        if(this.isTyping) return; 
        window.speechSynthesis.cancel();
        this.resetActiveSpeakBtn();

        const inputField = document.getElementById('aura-input');
        if (!inputField) return;
        const txt = inputField.value.trim(); 
        if(txt === '') return; 
        
        this.hideWelcomeScreen(); 
        this.appendMsg(txt, 'user'); 
        inputField.value = ''; 
        this.sendMessageToAI(txt);
    },

    processDirectQuery: function(query) {
        if(this.isTyping) return;
        window.speechSynthesis.cancel();
        this.resetActiveSpeakBtn();
        this.hideWelcomeScreen(); 
        this.appendMsg(query, 'user');
        this.sendMessageToAI(query);
    },

    sendMessageToAI: async function(userText) {
        this.isTyping = true;
        const chatLog = document.getElementById('aura-chat');
        this.chatHistory.push({ role: "user", content: userText });

        const typingDiv = document.createElement('div');
        typingDiv.id = 'temp-typing';
        typingDiv.style.cssText = "align-self: flex-start; margin-right: auto; max-width: 85%; padding: 1.5rem 2rem; border-radius: 2rem; background: linear-gradient(135deg, rgba(0,255,255,0.05), rgba(0,0,0,0.8)); backdrop-filter: blur(15px); border: 1px solid rgba(0,255,255,0.2); border-left: 4px solid var(--valtara-cian-brillante); color: #fff; font-size: 1.2rem; display: flex; gap: 5px;";
        typingDiv.innerHTML = '<span style="animation: pulse 1s infinite alternate;">.</span><span style="animation: pulse 1s infinite alternate 0.2s;">.</span><span style="animation: pulse 1s infinite alternate 0.4s;">.</span>';
        chatLog.appendChild(typingDiv);
        chatLog.scrollTo({ top: chatLog.scrollHeight, behavior: 'smooth' });

        if(window.A11yEngine) A11yEngine.announce("Aura está analizando tu caso...");

        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ history: this.chatHistory, userName: this.userName })
            });

            if(document.getElementById('temp-typing')) document.getElementById('temp-typing').remove();
            if (!response.ok) throw new Error("Error.");

            const data = await response.json();
            let auraRespuesta = data.reply;
            
            if (!auraRespuesta.includes("leve interrupción")) {
                this.chatHistory.push({ role: "assistant", content: auraRespuesta });
            }
            
            let auraFormateada = auraRespuesta.replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank"><i class="fa-brands fa-whatsapp" style="font-size: 1.5rem;"></i> $1</a>');
            auraFormateada = auraFormateada.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
            auraFormateada = auraFormateada.replace(/style="[^"]*"/gi, ''); 
            auraFormateada = auraFormateada.replace(/\n/g, '<br>');
            
            this.appendMsg(auraFormateada, 'bot', true);

        } catch (error) {
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
        if(isHtml) { contentDiv.innerHTML = txtOrHtml; } else { contentDiv.textContent = txtOrHtml; }
        
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
