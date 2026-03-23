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

    init: function() {
        this.userName = localStorage.getItem('valtara_identity_name_v11') || "Apreciable visitante";
        this.initVoiceEngines(); // Inicializamos los motores de voz
        this.bindEvents();
    },

    // ==========================================
    // INICIALIZACIÓN DE MOTORES DE VOZ (API NATIVA)
    // ==========================================
    initVoiceEngines: function() {
        // Verificar si el navegador soporta SpeechRecognition (Dictado)
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'es-MX'; // Español de México
            this.recognition.continuous = false;
            this.recognition.interimResults = false;

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const inputField = document.getElementById('aura-input');
                if(inputField) {
                    inputField.value = transcript;
                    // Opcional: auto-enviar el mensaje tras el dictado
                    // this.handleInput(); 
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
            // Ocultar el botón si no está soportado
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
        this.appendMsg(query, 'user');
        this.sendMessageToAI(query);
    },

    // ================================================================================
    // MOTOR DE COMUNICACIÓN CON VERCEL (FORMATO ABIERTO CON MEMORIA Y RENDER HTML)
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
            
            // 🎨 Formateo de Markdown a HTML (Respetando los botones nativos del backend)
            let auraFormateada = auraRespuesta.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            auraFormateada = auraFormateada.replace(/\*(.*?)\*/g, '<em>$1</em>');
            auraFormateada = auraFormateada.replace(/\n/g, '<br>');

            // 🚀 Inyección Directa: El backend ahora manda los botones armados, el frontend solo los pinta.
            this.appendMsg(auraFormateada, 'bot', true);

        } catch (error) {
            console.error("Error del Motor AI:", error);
            if(document.getElementById('temp-typing')) document.getElementById('temp-typing').remove();
            
            // Si hay error, generamos el botón de respaldo de WhatsApp
            const errorMsg = `Por una leve interrupción en nuestra red segura corporativa, no he podido procesar tu solicitud. Por favor, comunícate directamente con nuestro Concierge en WhatsApp:<br><br><a href="https://wa.me/5213348572070" target="_blank" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 30px; text-decoration: none; display: inline-flex; font-weight: bold; font-family: sans-serif;">📲 Abrir WhatsApp</a>`;
            
            this.appendMsg(errorMsg, 'bot', true);
            this.chatHistory.pop();
        } finally {
            this.isTyping = false;
        }
    },

    // ==========================================
    // FUNCIÓN DE LECTURA (TTS NATIVO)
    // ==========================================
    speakMessage: function(htmlContent) {
        // Detener cualquier lectura previa
        window.speechSynthesis.cancel();
        
        // Crear un div temporal para extraer solo el texto limpio (sin botones ni HTML)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        // Eliminar botones y enlaces para que no los lea
        const elementsToRemove = tempDiv.querySelectorAll('a, button');
        elementsToRemove.forEach(el => el.remove());
        
        const cleanText = tempDiv.innerText || tempDiv.textContent;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'es-MX';
        utterance.rate = 1.0; // Velocidad normal
        utterance.pitch = 1.1; // Un tono ligeramente más amable

        // Buscar una voz femenina en español si está disponible (Siri/Google)
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => voice.lang.includes('es') && voice.name.toLowerCase().includes('female'));
        if(preferredVoice) {
            utterance.voice = preferredVoice;
        }

        window.speechSynthesis.speak(utterance);
    },

    appendMsg: function(txtOrHtml, sender, isHtml = false) {
        const log = document.getElementById('aura-chat');
        if(!log) return;

        const div = document.createElement('div'); 
        div.className = `msg ${sender}`;
        
        // Contenedor principal del mensaje
        const contentDiv = document.createElement('div');
        contentDiv.className = 'msg-content';
        
        if(isHtml) { contentDiv.innerHTML = txtOrHtml; } 
        else { contentDiv.textContent = txtOrHtml; }
        
        div.appendChild(contentDiv);

        // Si es un mensaje de Aura (bot), inyectamos el botoncito de Parlante
        if(sender === 'bot') {
            const speakBtn = document.createElement('button');
            speakBtn.className = 'aura-speak-btn';
            // Estilo in-line para no depender de CSS externo y asegurar que se vea de ultra-lujo
            speakBtn.style.cssText = "background: rgba(255,255,255,0.1); border: 1px solid var(--valtara-cian-brillante); color: var(--valtara-cian-brillante); border-radius: 50%; width: 32px; height: 32px; margin-left: 10px; cursor: pointer; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; vertical-align: top;";
            speakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            speakBtn.title = "Escuchar respuesta";
            
            speakBtn.addEventListener('click', () => {
                // Pequeño efecto visual al hacer clic
                speakBtn.style.background = 'var(--valtara-cian-brillante)';
                speakBtn.style.color = '#000';
                setTimeout(() => {
                    speakBtn.style.background = 'rgba(255,255,255,0.1)';
                    speakBtn.style.color = 'var(--valtara-cian-brillante)';
                }, 500);
                
                this.speakMessage(txtOrHtml);
            });

            // Creamos un contenedor flexible para alinear el texto y el botón
            const flexContainer = document.createElement('div');
            flexContainer.style.display = 'flex';
            flexContainer.style.justifyContent = 'space-between';
            flexContainer.style.alignItems = 'flex-start';
            
            // Movemos el contenido original al contenedor flexible y añadimos el botón
            flexContainer.appendChild(contentDiv);
            flexContainer.appendChild(speakBtn);
            
            // Limpiamos el div principal y metemos el contenedor flexible
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
    // Truco para cargar las voces del sistema operativo a tiempo (Especialmente en Chrome/Android)
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    AuraEngine.init();
});
