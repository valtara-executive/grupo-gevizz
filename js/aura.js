/**
 * ====================================================================================
 * BLOQUE 8: AURA AI ENGINE V13.5 (META LLAMA 3.3 - FORMATO ABIERTO Y DINÁMICO)
 * Motor de IA Front-end de Valtara - Optimizado para renderizado de Botones Nativos HTML.
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

    init: function() {
        this.userName = localStorage.getItem('valtara_identity_name_v11') || "Apreciable visitante";
        this.bindEvents();
    },

    bindEvents: function() {
        const toggleBtn = document.getElementById('fab-aura');
        const closeBtn = document.getElementById('aura-close-btn');
        const sendBtn = document.getElementById('aura-send-btn');
        const inputField = document.getElementById('aura-input');
        const chips = document.querySelectorAll('.chip-btn');

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

    appendMsg: function(txtOrHtml, sender, isHtml = false) {
        const log = document.getElementById('aura-chat');
        if(!log) return;

        const div = document.createElement('div'); 
        div.className = `msg ${sender}`;
        
        if(isHtml) { div.innerHTML = txtOrHtml; } 
        else { div.textContent = txtOrHtml; }
        
        log.appendChild(div);
        log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
        
        if(sender === 'bot' && window.A11yEngine) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = txtOrHtml;
            A11yEngine.announce("Aura dice: " + tempDiv.innerText);
        }
    }
};

window.addEventListener('DOMContentLoaded', () => AuraEngine.init());
