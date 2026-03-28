/**
 * ====================================================================================
 * BLOQUE 8: AURA AI ENGINE V16.0 (SOVEREIGN UI & IDENTITY FIX)
 * Motor de IA Front-end de Valtara - Interfaz de ultra-lujo, Conexión JSON V15.
 * ====================================================================================
 */

const AuraEngine = {
    isOpen: false,
    isTyping: false, 
    chatHistory: [], 
    userName: "",    
    
    // 🔗 PUENTE DE COMUNICACIÓN CON VERCEL
    apiUrl: "https://aura-server-erfj.vercel.app/api/chat",

    // ==========================================
    // VARIABLES PARA MOTORES DE VOZ NATIVOS
    // ==========================================
    recognition: null,
    isRecording: false,
    activeSpeakBtn: null,   

    init: function() {
        // 1. REPARACIÓN: Extraemos la identidad desde la nueva bóveda segura JSON (V15)
        this.userName = "Invitado";
        try {
            const storedData = localStorage.getItem('valtara_vault_v15');
            if (storedData) {
                const parsed = JSON.parse(storedData);
                if (parsed && parsed.name && parsed.name !== "Apreciable visitante") {
                    this.userName = parsed.name;
                }
            }
        } catch (e) {
            console.error("Error al leer la bóveda para Aura:", e);
        }

        this.initVoiceEngines(); 
        this.bindEvents();
    },

    // 2. INYECCIÓN DEL DISEÑO DE ULTRA-LUJO (Se llama cuando se abre el modal)
    renderUltraLujoWelcome: function() {
        const welcomeContainer = document.getElementById('aura-welcome-screen');
        if(!welcomeContainer) return;
        
        // Limpiamos el contenedor antes de inyectar el nuevo diseño masivo
        welcomeContainer.innerHTML = '';
        
        const html = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; max-width: 600px; margin: 0 auto; padding: 2rem;">
                
                <div style="position: relative; margin-bottom: 2rem; display: flex; justify-content: center; align-items: center;">
                    <div style="position: absolute; width: 120px; height: 120px; background: radial-gradient(circle, rgba(0,255,255,0.4) 0%, rgba(178,0,255,0.1) 100%); border-radius: 50%; filter: blur(20px); animation: pulseAura 3s infinite alternate;"></div>
                    <i class="fa-solid fa-sparkles" style="font-size: 4rem; color: var(--valtara-blanco); position: relative; z-index: 2; text-shadow: 0 0 30px rgba(0,255,255,0.8);"></i>
                </div>

                <h2 style="font-size: 3.5rem; font-family: var(--font-accent); font-weight: 400; margin-bottom: 1rem; text-align: center; color: var(--valtara-blanco); line-height: 1.2;">
                    Hola, <span style="color: var(--valtara-cian-brillante); font-style: italic;">${this.userName}</span>
                </h2>
                <p style="font-size: 1.5rem; color: var(--valtara-gris-texto); font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4rem; text-align: center;">¿En qué puedo orientarte hoy?</p>

                <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; width: 100%;">
                    
                    <button class="aura-suggestion-card" data-query="Necesito un masaje relajante y descompresión" style="background: linear-gradient(90deg, rgba(0,255,255,0.1) 0%, rgba(0,0,0,0.6) 100%); border: 1px solid rgba(0,255,255,0.3); border-radius: 1.5rem; padding: 2rem; display: flex; align-items: center; gap: 2rem; text-align: left; cursor: pointer; transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(0,255,255,0.1); display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                            <i class="fa-solid fa-spa" style="color: var(--valtara-cian-brillante); font-size: 2rem;"></i>
                        </div>
                        <div>
                            <span style="color: var(--valtara-blanco); font-size: 1.4rem; font-weight: 700; display: block; margin-bottom: 0.5rem;">Masaje Relajante</span>
                            <span style="color: #aaa; font-size: 1rem; font-weight: 300;">Agendar una sesión de descompresión física.</span>
                        </div>
                    </button>

                    <button class="aura-suggestion-card" data-query="Me duele la espalda, el cuello o tengo estrés crónico" style="background: linear-gradient(90deg, rgba(242, 201, 76, 0.1) 0%, rgba(0,0,0,0.6) 100%); border: 1px solid rgba(242, 201, 76, 0.3); border-radius: 1.5rem; padding: 2rem; display: flex; align-items: center; gap: 2rem; text-align: left; cursor: pointer; transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(242, 201, 76, 0.1); display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                            <i class="fa-solid fa-child-reaching" style="color: var(--valtara-oro); font-size: 2rem;"></i>
                        </div>
                        <div>
                            <span style="color: var(--valtara-blanco); font-size: 1.4rem; font-weight: 700; display: block; margin-bottom: 0.5rem;">Terapia Biomecánica</span>
                            <span style="color: #aaa; font-size: 1rem; font-weight: 300;">Evaluación y tratamiento de dolores por estrés.</span>
                        </div>
                    </button>

                    <button class="aura-suggestion-card" data-query="Quiero hablar con un asesor humano en WhatsApp" style="background: linear-gradient(90deg, rgba(37, 211, 102, 0.1) 0%, rgba(0,0,0,0.6) 100%); border: 1px solid rgba(37, 211, 102, 0.3); border-radius: 1.5rem; padding: 2rem; display: flex; align-items: center; gap: 2rem; text-align: left; cursor: pointer; transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(37, 211, 102, 0.1); display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                            <i class="fa-brands fa-whatsapp" style="color: var(--valtara-whatsapp); font-size: 2.2rem;"></i>
                        </div>
                        <div>
                            <span style="color: var(--valtara-blanco); font-size: 1.4rem; font-weight: 700; display: block; margin-bottom: 0.5rem;">Asesoría Humana</span>
                            <span style="color: #aaa; font-size: 1rem; font-weight: 300;">Conectar directamente con nuestro Concierge.</span>
                        </div>
                    </button>

                </div>
            </div>
            
            <style>
                @keyframes pulseAura { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1.2); opacity: 1; } }
                .aura-suggestion-card:hover { transform: translateY(-5px); filter: brightness(1.2); }
                .aura-suggestion-card:active { transform: scale(0.98); }
            </style>
        `;
        
        welcomeContainer.innerHTML = html;

        // Conectar los nuevos botones gigantes al motor de chat
        const newChips = welcomeContainer.querySelectorAll('.aura-suggestion-card');
        newChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                // Prevenimos que el clic en el icono o texto rompa el query
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
                const transcript = event.results[0][0].transcript;
                const inputField = document.getElementById('aura-input');
                if(inputField) {
                    inputField.value = transcript;
                }
            };

            this.recognition.onend = () => {
                this.isRecording = false;
                const micBtn = document.getElementById('aura-mic-btn');
                if(micBtn) {
                    micBtn.classList.remove('mic-recording');
                    micBtn.innerHTML = '<i aria-hidden="true" class="fa-solid fa-microphone"></i>';
                }
            };
            
            this.recognition.onerror = (event) => {
                console.error("Error en reconocimiento de voz:", event.error);
                this.isRecording = false;
                const micBtn = document.getElementById('aura-mic-btn');
                if(micBtn) {
                    micBtn.classList.remove('mic-recording');
                    micBtn.innerHTML = '<i aria-hidden="true" class="fa-solid fa-microphone-slash"></i>';
                    setTimeout(() => { micBtn.innerHTML = '<i aria-hidden="true" class="fa-solid fa-microphone"></i>'; }, 2000);
                }
            };
        } else {
            console.warn("Speech Recognition no está soportado en este navegador.");
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

        // Renderizamos la UI elegante cuando se abre el Modal de Aura
        if(toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                if(!this.isOpen) this.renderUltraLujoWelcome();
                this.toggleModal();
            });
        }
        
        if(closeBtn) closeBtn.addEventListener('click', () => this.toggleModal()); 
        
        document.querySelectorAll('.close-modal-btn[data-close="aura-modal"]').forEach(btn => {
            btn.addEventListener('click', () => {
                if(this.isOpen) this.toggleModal();
            });
        });

        if(sendBtn) sendBtn.addEventListener('click', () => this.handleInput());
        if(inputField) {
            inputField.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') this.handleInput();
            });
        }

        if(micBtn && this.recognition) {
            micBtn.addEventListener('click', () => {
                if(this.isRecording) {
                    this.recognition.stop();
                } else {
                    try {
                        this.recognition.start();
                        this.isRecording = true;
                        micBtn.classList.add('mic-recording');
                        micBtn.innerHTML = '<i aria-hidden="true" class="fa-solid fa-stop"></i>';
                    } catch(e) {
                        console.error("No se pudo iniciar el micrófono.", e);
                    }
                }
            });
        }
    },

    toggleModal: function() {
        const modal = document.getElementById('aura-modal');
        if(!modal) return;
        
        this.isOpen = !this.isOpen;
        
        if (!this.isOpen) {
            window.speechSynthesis.cancel();
            this.resetActiveSpeakBtn();
        }
    },

    // 🌟 EFECTO FANTASMA MEJORADO: Desaparece la pantalla inicial flotando hacia arriba
    hideWelcomeScreen: function() {
        const welcomeScreen = document.getElementById('aura-welcome-screen');
        if(welcomeScreen && welcomeScreen.style.display !== 'none') {
            welcomeScreen.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.transform = 'translateY(-50px) scale(0.95)';
            welcomeScreen.style.visibility = 'hidden';
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

    // ================================================================================
    // MOTOR DE COMUNICACIÓN CON VERCEL
    // ================================================================================
    sendMessageToAI: async function(userText) {
        this.isTyping = true;
        const chatLog = document.getElementById('aura-chat');
        
        this.chatHistory.push({ role: "user", content: userText });

        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator active';
        typingDiv.id = 'temp-typing';
        typingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        chatLog.appendChild(typingDiv);
        chatLog.scrollTop = chatLog.scrollHeight;

        if(window.A11yEngine) A11yEngine.announce("Aura está analizando tu caso...");

        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    history: this.chatHistory, 
                    userName: this.userName 
                })
            });

            if(document.getElementById('temp-typing')) document.getElementById('temp-typing').remove();

            if (!response.ok) throw new Error("Error en la conexión con el servidor de Valtara.");

            const data = await response.json();
            let auraRespuesta = data.reply;
            let esRespuestaDeError = auraRespuesta.includes("leve interrupción");

            if (!esRespuestaDeError) {
                this.chatHistory.push({ role: "assistant", content: auraRespuesta });
            }
            
            let auraFormateada = auraRespuesta.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            auraFormateada = auraFormateada.replace(/\*(.*?)\*/g, '<em>$1</em>');
            auraFormateada = auraFormateada.replace(/\n/g, '<br>');

            this.appendMsg(auraFormateada, 'bot', true);

        } catch (error) {
            console.error("Error del Motor AI:", error);
            if(document.getElementById('temp-typing')) document.getElementById('temp-typing').remove();
            
            const errorMsg = `Por una leve interrupción en nuestra red segura corporativa, no he podido procesar tu solicitud. Por favor, comunícate directamente con nuestro Concierge en WhatsApp:<br><br><a href="https://wa.me/5213348572070" target="_blank" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 30px; text-decoration: none; display: inline-flex; font-weight: bold; font-family: sans-serif;">📲 Abrir WhatsApp</a>`;
            
            this.appendMsg(errorMsg, 'bot', true);
            this.chatHistory.pop();
        } finally {
            this.isTyping = false;
        }
    },

    // ==========================================
    // FUNCIÓN DE LECTURA (VERSIÓN ESTABLE: PLAY / STOP)
    // ==========================================
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
        const elementsToRemove = tempDiv.querySelectorAll('a, button');
        elementsToRemove.forEach(el => el.remove());
        const cleanText = tempDiv.innerText || tempDiv.textContent;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'es-MX';
        utterance.rate = 1.0; 
        utterance.pitch = 1.1; 

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => voice.lang.includes('es') && voice.name.toLowerCase().includes('female'));
        if(preferredVoice) {
            utterance.voice = preferredVoice;
        }

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
        contentDiv.className = 'msg-content';
        
        if(isHtml) { contentDiv.innerHTML = txtOrHtml; } 
        else { contentDiv.textContent = txtOrHtml; }
        
        div.appendChild(contentDiv);

        if(sender === 'bot') {
            const speakBtn = document.createElement('button');
            speakBtn.className = 'aura-speak-btn';
            speakBtn.style.cssText = "background: rgba(255,255,255,0.1); border: 1px solid var(--valtara-cian-brillante); color: var(--valtara-cian-brillante); border-radius: 50%; width: 32px; height: 32px; margin-left: 10px; cursor: pointer; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; vertical-align: top; transition: 0.3s;";
            speakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            speakBtn.title = "Escuchar / Detener respuesta";
            
            speakBtn.addEventListener('click', () => {
                this.speakMessage(txtOrHtml, speakBtn);
            });

            const flexContainer = document.createElement('div');
            flexContainer.style.display = 'flex';
            flexContainer.style.justifyContent = 'space-between';
            flexContainer.style.alignItems = 'flex-start';
            
            flexContainer.appendChild(contentDiv);
            flexContainer.appendChild(speakBtn);
            
            div.innerHTML = '';
            div.appendChild(flexContainer);
            
            if(window.A11yEngine) {
                const tempDivForA11y = document.createElement('div');
                tempDivForA11y.innerHTML = txtOrHtml;
                A11yEngine.announce("Aura dice: " + tempDivForA11y.innerText);
            }
        }
        
        log.appendChild(div);
        
        setTimeout(() => {
            log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
        }, 50);
    }
};

window.addEventListener('DOMContentLoaded', () => {
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    AuraEngine.init();
});
