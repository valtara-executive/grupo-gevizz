/**
 * ====================================================================================
 * BLOQUE 8: AURA AI ENGINE V17.0 (ULTRA-LUXURY "GOD MODE" OVERRIDE)
 * Inyecta su propio diseño, fuerza transparencias, arregla alineaciones 
 * y sincroniza la identidad en tiempo real.
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
        this.forceInjectStyles(); // <-- AURA AHORA CONTROLA SU PROPIO DISEÑO
        this.initVoiceEngines(); 
        this.bindEvents();
    },

    // 1. LEE LA BÓVEDA EN TIEMPO REAL
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
            }
        } catch (e) { console.error("Error al leer la bóveda para Aura:", e); }
    },

    // 2. MODO DIOS: AURA INYECTA SU PROPIO CSS (Destruye el fondo negro y arregla posiciones)
    forceInjectStyles: function() {
        if(document.getElementById('aura-god-mode-styles')) return;
        const style = document.createElement('style');
        style.id = 'aura-god-mode-styles';
        style.innerHTML = `
            /* Destruimos el fondo negro sólido y dejamos pasar los colores de la página */
            #aura-modal { background: rgba(5, 5, 10, 0.45) !important; backdrop-filter: blur(25px) !important; -webkit-backdrop-filter: blur(25px) !important; border: 1px solid rgba(242, 201, 76, 0.4) !important; }
            .aura-container { background: transparent !important; }
            .modal-header { background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%) !important; border-bottom: 1px solid rgba(242,201,76,0.2) !important; }
            
            /* Forzamos el comportamiento del contenedor de chat para que funcione Derecha/Izquierda */
            #aura-chat { display: flex !important; flex-direction: column !important; gap: 1.5rem !important; padding: 2rem 1rem !important; }
            
            /* Pantalla de bienvenida 100% asegurada */
            #aura-welcome-screen { background: transparent !important; z-index: 50 !important; }
            
            /* Tarjetas Panorámicas */
            .aura-suggestion-card { background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.6) 100%); border-radius: 1.5rem; padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; text-align: left; cursor: pointer; transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.5); width: 100%; border: 1px solid rgba(255,255,255,0.1); }
            .aura-suggestion-card:hover { transform: translateY(-5px); background: linear-gradient(90deg, rgba(242, 201, 76, 0.15) 0%, rgba(0,0,0,0.8) 100%); border-color: var(--valtara-oro) !important; }
            
            /* Animación de latido */
            @keyframes pulseAuraGold { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1.2); opacity: 1; } }
            @keyframes slideInMsg { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(style);
    },

    // 3. INYECCIÓN DEL DISEÑO DE ULTRA-LUJO EN LA PANTALLA
    renderUltraLujoWelcome: function() {
        this.refreshIdentity(); // Sincroniza el nombre justo antes de pintar la pantalla

        const welcomeContainer = document.getElementById('aura-welcome-screen');
        if(!welcomeContainer) return;
        
        // Forzamos a que sea visible
        welcomeContainer.style.display = 'flex';
        welcomeContainer.style.opacity = '1';
        welcomeContainer.style.visibility = 'visible';
        welcomeContainer.style.transform = 'translateY(0) scale(1)';

        welcomeContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; max-width: 700px; margin: auto; padding: 1rem;">
                
                <div style="position: relative; margin-bottom: 2.5rem; display: flex; justify-content: center; align-items: center;">
                    <div style="position: absolute; width: 140px; height: 140px; background: radial-gradient(circle, rgba(242,201,76,0.35) 0%, transparent 100%); border-radius: 50%; filter: blur(25px); animation: pulseAuraGold 3s infinite alternate;"></div>
                    <i class="fa-solid fa-sparkles" style="font-size: 4.5rem; color: var(--valtara-oro); position: relative; z-index: 2; text-shadow: 0 0 40px rgba(242,201,76,0.9);"></i>
                </div>

                <h2 style="font-size: 3.5rem; font-family: var(--font-accent); font-weight: 600; margin-bottom: 1rem; text-align: center; color: var(--valtara-blanco); line-height: 1.2;">
                    Hola, <span style="color: var(--valtara-oro); font-style: italic;">${this.userName}</span>
                </h2>
                <p style="font-size: 1.3rem; color: #e2e2e8; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4rem; text-align: center; border-bottom: 1px solid rgba(242,201,76,0.3); padding-bottom: 1.5rem;">
                    ¿Cómo podemos ayudarte el día de hoy?
                </p>

                <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; width: 100%;">
                    
                    <button class="aura-suggestion-card" data-query="Necesito un masaje relajante y descompresión física">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(0,255,255,0.1); border: 1px solid rgba(0,255,255,0.3); display: flex; justify-content: center; align-items: center; flex-shrink: 0; box-shadow: inset 0 0 15px rgba(0,255,255,0.2);">
                            <i class="fa-solid fa-spa" style="color: var(--valtara-cian-brillante); font-size: 2.2rem;"></i>
                        </div>
                        <div style="flex-grow: 1;">
                            <span style="color: var(--valtara-blanco); font-size: 1.5rem; font-weight: 700; font-family: var(--font-accent); display: block; margin-bottom: 0.3rem;">Masaje Relajante</span>
                            <span style="color: #aaa; font-size: 1.1rem; font-weight: 300; line-height: 1.4;">Deseo agendar una sesión para liberar estrés acumulado.</span>
                        </div>
                        <i class="fa-solid fa-chevron-right" style="color: #666; font-size: 1.5rem; padding-left: 1rem;"></i>
                    </button>

                    <button class="aura-suggestion-card" data-query="Me duele la espalda, el cuello o tengo tensión crónica por el trabajo">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(242, 201, 76, 0.1); border: 1px solid rgba(242, 201, 76, 0.3); display: flex; justify-content: center; align-items: center; flex-shrink: 0; box-shadow: inset 0 0 15px rgba(242,201,76,0.2);">
                            <i class="fa-solid fa-child-reaching" style="color: var(--valtara-oro); font-size: 2.2rem;"></i>
                        </div>
                        <div style="flex-grow: 1;">
                            <span style="color: var(--valtara-blanco); font-size: 1.5rem; font-weight: 700; font-family: var(--font-accent); display: block; margin-bottom: 0.3rem;">Terapia Biomecánica</span>
                            <span style="color: #aaa; font-size: 1.1rem; font-weight: 300; line-height: 1.4;">Evaluación profunda y tratamiento de dolores musculares.</span>
                        </div>
                        <i class="fa-solid fa-chevron-right" style="color: #666; font-size: 1.5rem; padding-left: 1rem;"></i>
                    </button>

                    <button class="aura-suggestion-card" data-query="Quiero conocer los precios de los servicios y paquetes">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(178, 0, 255, 0.1); border: 1px solid rgba(178, 0, 255, 0.3); display: flex; justify-content: center; align-items: center; flex-shrink: 0; box-shadow: inset 0 0 15px rgba(178,0,255,0.2);">
                            <i class="fa-solid fa-tag" style="color: var(--valtara-morado-vivo); font-size: 2.2rem;"></i>
                        </div>
                        <div style="flex-grow: 1;">
                            <span style="color: var(--valtara-blanco); font-size: 1.5rem; font-weight: 700; font-family: var(--font-accent); display: block; margin-bottom: 0.3rem;">Tarifas y Paquetes</span>
                            <span style="color: #aaa; font-size: 1.1rem; font-weight: 300; line-height: 1.4;">Explorar el catálogo de inversiones en bienestar.</span>
                        </div>
                        <i class="fa-solid fa-chevron-right" style="color: #666; font-size: 1.5rem; padding-left: 1rem;"></i>
                    </button>

                    <button class="aura-suggestion-card" data-query="Quiero hablar directamente con un humano en WhatsApp">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.3); display: flex; justify-content: center; align-items: center; flex-shrink: 0; box-shadow: inset 0 0 15px rgba(37,211,102,0.2);">
                            <i class="fa-brands fa-whatsapp" style="color: var(--valtara-whatsapp); font-size: 2.5rem;"></i>
                        </div>
                        <div style="flex-grow: 1;">
                            <span style="color: var(--valtara-blanco); font-size: 1.5rem; font-weight: 700; font-family: var(--font-accent); display: block; margin-bottom: 0.3rem;">Asesoría Humana</span>
                            <span style="color: #aaa; font-size: 1.1rem; font-weight: 300; line-height: 1.4;">Redirigir a WhatsApp para atención personalizada por el Concierge.</span>
                        </div>
                        <i class="fa-solid fa-chevron-right" style="color: #666; font-size: 1.5rem; padding-left: 1rem;"></i>
                    </button>
                </div>
            </div>
        `;

        const newChips = welcomeContainer.querySelectorAll('.aura-suggestion-card');
        newChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                const targetBtn = e.target.closest('.aura-suggestion-card');
                if(targetBtn) {
                    const query = targetBtn.getAttribute('data-query');
                    this.processDirectQuery(query);
                }
            });
        });
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
                    // Solo mostramos la bienvenida si el chat está vacío
                    if(this.chatHistory.length === 0) {
                        this.renderUltraLujoWelcome(); 
                    }
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

        // Burbuja temporal de Aura pensando
        const typingDiv = document.createElement('div');
        typingDiv.id = 'temp-typing';
        typingDiv.style.cssText = "align-self: flex-start; margin-right: auto; max-width: 85%; padding: 1.5rem 2rem; border-radius: 2rem; background: linear-gradient(135deg, rgba(0,255,255,0.05), rgba(0,0,0,0.8)); backdrop-filter: blur(15px); border: 1px solid rgba(0,255,255,0.2); border-left: 4px solid var(--valtara-cian-brillante); color: #fff; font-size: 1.2rem; display: flex; gap: 5px;";
        typingDiv.innerHTML = '<span style="animation: pulse 1s infinite alternate;">.</span><span style="animation: pulse 1s infinite alternate 0.2s;">.</span><span style="animation: pulse 1s infinite alternate 0.4s;">.</span>';
        chatLog.appendChild(typingDiv);
        chatLog.scrollTop = chatLog.scrollHeight;

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
            
            let auraFormateada = auraRespuesta.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
            this.appendMsg(auraFormateada, 'bot', true);

        } catch (error) {
            if(document.getElementById('temp-typing')) document.getElementById('temp-typing').remove();
            this.appendMsg(`Por una leve interrupción en nuestra red, no he podido procesar tu solicitud. Comunícate en WhatsApp:<br><br><a href="https://wa.me/5213348572070" target="_blank" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 30px; text-decoration: none; display: inline-flex; font-weight: bold; font-family: sans-serif;">📲 Abrir WhatsApp</a>`, 'bot', true);
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

    // 4. MODO DIOS DE ALINEACIÓN DE MENSAJES (Destruye los estilos CSS viejos)
    appendMsg: function(txtOrHtml, sender, isHtml = false) {
        const log = document.getElementById('aura-chat');
        if(!log) return;

        const div = document.createElement('div'); 
        
        // ESTILOS INYECTADOS DIRECTAMENTE A LA VENA PARA QUE JAMÁS SE ROMPAN
        div.style.maxWidth = '85%';
        div.style.padding = '1.8rem 2.2rem';
        div.style.fontSize = '1.25rem';
        div.style.lineHeight = '1.8';
        div.style.borderRadius = '2rem';
        div.style.animation = 'slideInMsg 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        div.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        div.style.backdropFilter = 'blur(15px)';

        if (sender === 'user') {
            // Usuario: Derecha, Dorado
            div.style.alignSelf = 'flex-end';
            div.style.marginLeft = 'auto'; // Fuerza a la derecha absoluto
            div.style.background = 'linear-gradient(135deg, rgba(242, 201, 76, 0.1), rgba(0,0,0,0.85))';
            div.style.border = '1px solid rgba(242, 201, 76, 0.2)';
            div.style.borderRight = '4px solid var(--valtara-oro)';
            div.style.borderBottomRightRadius = '0.5rem';
            div.style.color = 'var(--valtara-oro-suave)';
            div.style.fontWeight = '400';
        } else {
            // Aura (Bot): Izquierda, Cian
            div.style.alignSelf = 'flex-start';
            div.style.marginRight = 'auto'; // Fuerza a la izquierda absoluto
            div.style.background = 'linear-gradient(135deg, rgba(0,255,255,0.08), rgba(0,0,0,0.85))';
            div.style.border = '1px solid rgba(0,255,255,0.15)';
            div.style.borderLeft = '4px solid var(--valtara-cian-brillante)';
            div.style.borderBottomLeftRadius = '0.5rem';
            div.style.color = 'var(--valtara-blanco)';
        }
        
        const contentDiv = document.createElement('div');
        if(isHtml) { contentDiv.innerHTML = txtOrHtml; } else { contentDiv.textContent = txtOrHtml; }
        
        if(sender === 'bot') {
            const speakBtn = document.createElement('button');
            speakBtn.className = 'aura-speak-btn';
            speakBtn.style.cssText = "background: rgba(0,255,255,0.05); border: 1px solid var(--valtara-cian-brillante); color: var(--valtara-cian-brillante); border-radius: 50%; width: 35px; height: 35px; margin-left: 15px; cursor: pointer; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; transition: 0.3s;";
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
