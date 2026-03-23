/**
 * ====================================================================================
 * BLOQUE 8: AURA AI ENGINE V14.0 (META LLAMA 3.3 - SOVEREIGN EDITION)
 * Motor de IA Front-end de Valtara - Optimizado para renderizado HTML y VOZ NATIVA.
 * ====================================================================================
 */

const AuraEngine = {
    isOpen: false,
    hasGrit: false, 
    isTyping: false, 
    chatHistory: [], // 🧠 Memoria a corto plazo limpia
    userName: "",    
    
    // 🔗 PUENTE DE COMUNICACIÓN CON VERCEL
    apiUrl: "https://aura-server-erfj.vercel.app/api/chat",

    // ==========================================
    // VARIABLES PARA MOTORES DE VOZ NATIVOS
    // ==========================================
    recognition: null,
    isRecording: false,
    currentUtterance: null, // Referencia global a lo que Aura está diciendo
    activeSpeakBtn: null,   // Referencia al botón que está "hablando" actualmente

    init: function() {
        this.userName = localStorage.getItem('valtara_identity_name_v11') || "Apreciable visitante";
        this.initVoiceEngines(); 
        this.bindEvents();
    },

    // ==========================================
    // INICIALIZACIÓN DE MOTORES DE VOZ (API NATIVA)
    // ==========================================
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
        const chips = document.querySelectorAll('.chip-btn');
        const micBtn = document.getElementById('aura-mic-btn');

        if(toggleBtn) toggleBtn.addEventListener('click', () => this.toggleModal());
        if(closeBtn) closeBtn.addEventListener('click', () => this.toggleModal());
        
        if(sendBtn) sendBtn.addEventListener('click', () => this.handleInput());
        if(inputField) {
            inputField.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') this.handleInput();
            });
        }

        chips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                const query = e.target.getAttribute('data-query');
                this.processDirectQuery(query);
                this.hideChips();
            });
        });

        // Evento para el botón de Micrófono
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
        
        if(this.isOpen && !this.hasGrit) {
            this.hasGrit = true;
            const chatLog = document.getElementById('aura-chat');
            
            if(chatLog && chatLog.children.length === 0) {
                const hour = new Date().getHours();
                let timeGreeting = "Buenas noches";
                let emoji = "🌙";

                if (hour >= 4 && hour < 12) { timeGreeting = "Buenos días"; emoji = "☀️"; } 
                else if (hour >= 12 && hour < 19) { timeGreeting = "Buenas tardes"; emoji = "🌤️"; }

                let saludoPersonalizado = "";
                if (this.userName !== "Apreciable visitante" && this.userName.trim() !== "") {
                    saludoPersonalizado = `¡${timeGreeting}, ${this.userName}! ${emoji}`;
                } else {
                    saludoPersonalizado = `¡${timeGreeting}! ${emoji}`;
                }

                const initialGreetingHtml = `${saludoPersonalizado} Soy Aura, la IA de Valtara. Estoy lista para realizarte una <strong>Valoración Biomecánica pre-clínica</strong>. ¿En qué parte de tu cuerpo sientes mayor tensión o molestia el día de hoy?`;
                
                this.appendMsg(initialGreetingHtml, 'bot', true);
            }
        } else if (!this.isOpen) {
            // Si cierra el modal de chat, por cortesía detenemos cualquier voz que esté sonando
            window.speechSynthesis.cancel();
            this.resetActiveSpeakBtn();
        }
    },

    hideChips: function() {
        const chipsContainer = document.getElementById('aura-chips-container');
        if(chipsContainer) {
            chipsContainer.style.transition = 'opacity 0.4s ease';
            chipsContainer.style.opacity = '0';
            setTimeout(() => { chipsContainer.style.display = 'none'; }, 400);
        }
    },

    handleInput: function() {
        if(this.isTyping) return; 

        // Detenemos la voz de Aura si el usuario envía un mensaje nuevo
        window.speechSynthesis.cancel();
        this.resetActiveSpeakBtn();

        const inputField = document.getElementById('aura-input');
        if (!inputField) return;
        const txt = inputField.value.trim(); 
        if(txt === '') return; 
        
        this.appendMsg(txt, 'user'); 
        inputField.value = ''; 
        this.hideChips(); 
        
        this.sendMessageToAI(txt);
    },

    processDirectQuery: function(query) {
        if(this.isTyping) return;
        
        window.speechSynthesis.cancel();
        this.resetActiveSpeakBtn();
        
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
    // FUNCIÓN DE LECTURA (TTS NATIVO CON PAUSA/STOP)
    // ==========================================
    resetActiveSpeakBtn: function() {
        // Restaura visualmente el botón que estaba activo a su estado original (bocina)
        if (this.activeSpeakBtn) {
            this.activeSpeakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            this.activeSpeakBtn.style.color = 'var(--valtara-cian-brillante)';
            this.activeSpeakBtn.style.borderColor = 'var(--valtara-cian-brillante)';
            this.activeSpeakBtn.classList.remove('is-speaking');
            this.activeSpeakBtn = null;
        }
    },

    speakMessage: function(htmlContent, btnElement) {
        // 1. Si Aura ya está hablando y tocan el botón activo, lo interpretamos como un "Stop"
        if (window.speechSynthesis.speaking && btnElement.classList.contains('is-speaking')) {
            window.speechSynthesis.cancel();
            this.resetActiveSpeakBtn();
            return; // Terminamos aquí
        }

        // 2. Si toca otro botón mientras Aura habla, cancelamos el anterior
        window.speechSynthesis.cancel();
        this.resetActiveSpeakBtn();
        
        // 3. Preparar el nuevo botón para "modo reproducción" (Rojo con ícono de Stop)
        this.activeSpeakBtn = btnElement;
        btnElement.classList.add('is-speaking');
        btnElement.innerHTML = '<i class="fa-solid fa-stop"></i>';
        btnElement.style.color = '#ff5555';
        btnElement.style.borderColor = '#ff5555';

        // 4. Limpiar HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const elementsToRemove = tempDiv.querySelectorAll('a, button');
        elementsToRemove.forEach(el => el.remove());
        const cleanText = tempDiv.innerText || tempDiv.textContent;

        // 5. Configurar voz
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'es-MX';
        utterance.rate = 1.0; 
        utterance.pitch = 1.1; 

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => voice.lang.includes('es') && voice.name.toLowerCase().includes('female'));
        if(preferredVoice) {
            utterance.voice = preferredVoice;
        }

        // 6. Restaurar el botón automáticamente cuando Aura termine de hablar
        utterance.onend = () => {
            this.resetActiveSpeakBtn();
        };

        utterance.onerror = () => {
            this.resetActiveSpeakBtn();
        };

        // 7. Hablar
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

        // Si es mensaje de Aura, inyectamos el botón de Parlante Inteligente
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
        log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
    }
};

window.addEventListener('DOMContentLoaded', () => {
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    AuraEngine.init();
});
