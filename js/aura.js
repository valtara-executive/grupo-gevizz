/**
 * ====================================================================================
 * BLOQUE 8: AURA AI ENGINE V12.0 (INTEGRACIÓN LLM EN LA NUBE - VERCEL)
 * Motor de IA Generativa de Valtara, conectado a la bóveda segura de Vercel.
 * ====================================================================================
 */

const AuraEngine = {
    isOpen: false,
    hasGrit: false, // Controla si ya saludó proactivamente
    isTyping: false, // Evita que el usuario mande 20 mensajes seguidos
    
    // 🔗 TU NUEVO PUENTE DE COMUNICACIÓN CON VERCEL
    apiUrl: "https://aura-server-sandy.vercel.app/api/chat",

    init: function() {
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

        // Si el usuario toca un "chip" (botones de opciones rápidas)
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
        
        // Saludo proactivo la primera vez que se abre el chat
        if(this.isOpen && !this.hasGrit) {
            this.hasGrit = true;
            const chatLog = document.getElementById('aura-chat');
            
            if(chatLog && chatLog.children.length === 0) {
                const userName = localStorage.getItem('valtara_identity_name_v11') || 'Apreciable visitante';
                const hour = new Date().getHours();
                let timeGreeting = "Buenas noches";
                let emoji = "🌙";

                if (hour >= 4 && hour < 12) { timeGreeting = "Buenos días"; emoji = "☀️"; } 
                else if (hour >= 12 && hour < 19) { timeGreeting = "Buenas tardes"; emoji = "🌤️"; }

                const initialGreeting = `¡${timeGreeting} ${userName}! ${emoji} Soy Aura, la IA de Valtara. Estoy lista para realizarte una <strong>Valoración Biomecánica pre-clínica</strong>. ¿En qué parte de tu cuerpo sientes mayor tensión, estrés o molestia el día de hoy?`;
                this.appendMsg(initialGreeting, 'bot', true);
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
        if(this.isTyping) return; // Si Aura está pensando, no deja enviar otro mensaje

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
    // EL NUEVO CEREBRO: CONEXIÓN CON VERCEL
    // ================================================================================
    sendMessageToAI: async function(userText) {
        this.isTyping = true;
        const chatLog = document.getElementById('aura-chat');
        
        // Mostrar indicador de "Aura está escribiendo..."
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator active';
        typingDiv.id = 'temp-typing';
        typingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        chatLog.appendChild(typingDiv);
        chatLog.scrollTop = chatLog.scrollHeight;

        if(window.A11yEngine) A11yEngine.announce("Aura está analizando tu mensaje...");

        try {
            // Enviamos el mensaje por el tubo seguro a Vercel
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: userText })
            });

            // Borramos los puntitos de "Escribiendo..."
            if(document.getElementById('temp-typing')) document.getElementById('temp-typing').remove();

            if (!response.ok) {
                throw new Error("Error en la conexión con el servidor de Valtara.");
            }

            const data = await response.json();
            
            // Formatear el texto de la IA (Convertir asteriscos en Negritas y saltos de línea)
            let auraRespuesta = data.reply;
            auraRespuesta = auraRespuesta.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Negritas
            auraRespuesta = auraRespuesta.replace(/\*(.*?)\*/g, '<em>$1</em>'); // Cursivas
            auraRespuesta = auraRespuesta.replace(/\n/g, '<br>'); // Saltos de línea

            // Mostrar la respuesta final
            this.appendMsg(auraRespuesta, 'bot', true);

        } catch (error) {
            console.error("Error del Motor AI:", error);
            if(document.getElementById('temp-typing')) document.getElementById('temp-typing').remove();
            
            // Mensaje de emergencia si falla el internet o el servidor
            const errorMsg = "Por una leve interrupción en nuestra red segura corporativa, no he podido procesar tu solicitud. Por favor, comunícate directamente con nuestro Concierge en WhatsApp: <strong>52 1 33 4857 2070</strong>.";
            this.appendMsg(errorMsg, 'bot', true);
        } finally {
            this.isTyping = false;
        }
    },

    appendMsg: function(txtOrHtml, sender, isHtml = false) {
        const log = document.getElementById('aura-chat');
        if(!log) return;

        const div = document.createElement('div'); 
        div.className = `msg ${sender}`;
        
        if(isHtml) { 
            div.innerHTML = txtOrHtml; 
        } else { 
            div.textContent = txtOrHtml; 
        }
        
        log.appendChild(div);
        
        // Animación suave de scroll hacia abajo
        log.scrollTo({
            top: log.scrollHeight,
            behavior: 'smooth'
        });
        
        // Anuncio para tu Lector de Pantalla
        if(sender === 'bot' && window.A11yEngine) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = txtOrHtml;
            A11yEngine.announce("Aura dice: " + tempDiv.textContent);
        }
    }
};

// Encender el motor cuando la página web termine de cargar
window.addEventListener('DOMContentLoaded', () => AuraEngine.init());
