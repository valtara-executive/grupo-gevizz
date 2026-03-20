/**
 * ====================================================================================
 * BLOQUE 8: AURA AI ENGINE V11.1 (NLP, TRIAJE INTERACTIVO Y CLOSER DE VENTAS)
 * Motor de lenguaje natural, Empatía con Emojis, Redirección y Precios Actualizados.
 * ====================================================================================
 */

const AuraEngine = {
    isOpen: false,
    triageActive: false,
    triageStep: 0,
    triageData: {},
    countdownInterval: null,

    // Base de datos NLP (Procesamiento de Lenguaje) para dudas generales
    intentsDB: [
        { id: "greeting", weight: 1, words: ["hola", "buenos", "buenas", "que tal", "saludos", "hey"], 
          response: "¡Hola de nuevo! ✨ ¿En qué más puedo orientarte el día de hoy?" },
        
        { id: "gratitude", weight: 1, words: ["gracias", "muchas gracias", "te lo agradezco", "mil gracias", "perfecto"], 
          response: "¡El honor es todo mío! 🙏 En Valtara y Grupo Gevizz S.A.S. estamos para servirte con excelencia." },
        
        // RED FLAGS MÉDICAS (PRIORIDAD ABSOLUTA - Bloquea cualquier triaje)
        { id: "medical_red_flag", weight: 100, words: ["fractura", "roto", "rompi", "esguince", "desgarre", "gripe", "fiebre", "infeccion", "tos", "cirugia", "herida", "sangrado", "tumor", "cancer", "operacion", "covid"], 
          response: "<strong>⚠️ Aviso Clínico de Seguridad:</strong> Detecto síntomas agudos o patologías médicas. Por protocolo estricto, <strong>debes consultar a un Médico de inmediato</strong>. 🏥 En Valtara no diagnosticamos ni tratamos lesiones agudas o infecciosas. Una vez que tengas alta médica, estaremos honrados de ayudarte en tu rehabilitación muscular." },
        
        { id: "pregnancy", weight: 80, words: ["embarazo", "embarazada", "gestacion", "bebe", "prenatal", "meses de embarazo"], 
          response: "¡Felicidades por tu embarazo! 🤰 Por el momento, nuestro servicio de <strong>Cuidado Materno</strong> se encuentra en fase de adaptación arquitectónica en Reforma para garantizar tu seguridad al 100%. Aún no está disponible, pero esperamos tenerlo pronto. 🌸" },

        // POLÍTICAS, MARKETING Y LOGÍSTICA
        { id: "cancelacion", weight: 10, words: ["cancelar", "cancelacion", "reprogramar", "no puedo ir", "reembolso", "penalizacion", "perder"], 
          response: "Nuestra política protege el tiempo clínico: ⏱️ <br><br>1. <strong>Reembolso 100%:</strong> Si cancelas o reprogramas con más de 24 hrs de anticipación.<br>2. <strong>Sin Reembolso:</strong> Cancelaciones dentro de las 24 horas previas o no presentarte (No-Show) resultan en la pérdida total de tu anticipo. 🚫" },
        
        { id: "primavera_promos", weight: 3, words: ["primavera", "equinoccio", "descuento", "promocion", "mañana", "matutino", "20%", "beneficio"], 
          response: "¡Tenemos un privilegio activo! 🌼 Recibe un <strong>20% de cortesía</strong> en tus reservaciones matutinas (entre las 9:00 AM y las 12:00 PM). ¡Es el momento perfecto para arrancar tu día con todo! ☀️" },
        
        { id: "logistica", weight: 3, words: ["donde", "ubicacion", "direccion", "lugar", "domicilio", "hotel", "encuentran", "zona", "reforma", "cdmx"], 
          response: "Nuestro santuario está en: <strong>Av. Paseo de la Reforma 195, Piso 3, CDMX</strong>. 📍 Por estrictos protocolos de bioseguridad, <strong>NO ofrecemos masajes a domicilio ni en hoteles</strong>. 🛑" },
        
        // PRECIOS ACTUALIZADOS 11.1
        { id: "precios", weight: 3, words: ["precio", "costo", "cuanto", "vale", "cobran", "tarifa", "catalogo", "pago"], 
          response: "¡Claro! 💳 Nuestras terapias inician en <strong>$799 MXN</strong> (Relajante). Tenemos opciones clínicas como el Deportivo o Tailandés por <strong>$829 MXN</strong>, terapias energéticas (Holístico/Ayurveda) por <strong>$929 MXN</strong>, hasta nuestra experiencia magna, el Lomi Lomi Hawaiano por <strong>$1,199 MXN</strong>. ¿Te gustaría que te ayude a elegir el ideal para ti?" },
        
        { id: "contacto_humano", weight: 10, words: ["humano", "operador", "persona", "asesor", "hablar", "cita", "agendar", "whatsapp", "telefono", "marcar"], 
          response: "¡Por supuesto! 👤 Nuestro Concierge Clínico está listo para atenderte en WhatsApp ahora mismo.<br><br><button class='btn-ws' onclick='window.open(\"https://wa.me/5213348572070\", \"_blank\")' style='margin-top:10px; border-radius:30px; padding:10px 20px; font-weight:bold;'><i class='fa-brands fa-whatsapp'></i> Hablar con el Concierge</button>" }
    ],

    // Palabras detonadoras del Triaje (Si menciona esto, iniciamos las preguntas)
    triageTriggers: ["duele", "dolor", "espalda", "cuello", "hombros", "ciatica", "estres", "cansancio", "nudos", "contractura", "triaje", "recomiendas", "recomendar", "ayuda", "pesadez", "rigidez"],

    init: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        const toggleBtn = document.getElementById('fab-aura');
        const closeBtn = document.getElementById('aura-close-btn');
        const sendBtn = document.getElementById('aura-send-btn');
        const inputField = document.getElementById('aura-input');
        const chips = document.querySelectorAll('.chip-btn');
        const cancelRedirectBtn = document.getElementById('cancel-redirect-btn');

        if(toggleBtn) toggleBtn.addEventListener('click', () => this.toggleModal());
        if(closeBtn) closeBtn.addEventListener('click', () => this.toggleModal());
        
        if(sendBtn) sendBtn.addEventListener('click', () => this.handleInput());
        if(inputField) {
            inputField.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') this.handleInput();
            });
        }

        // Eventos para los Suggestion Chips (Tarjetitas)
        chips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                const query = e.target.getAttribute('data-query');
                this.processDirectQuery(query);
                this.hideChips();
            });
        });

        // Botón para cancelar redirección a WhatsApp
        if(cancelRedirectBtn) {
            cancelRedirectBtn.addEventListener('click', () => {
                clearInterval(this.countdownInterval);
                document.getElementById('aura-redirect-panel').style.display = 'none';
                this.appendMsg("Redirección cancelada. 🛑 Sigo aquí si necesitas algo más.", "bot");
            });
        }
    },

    toggleModal: function() {
        const modal = document.getElementById('aura-modal');
        if(!modal) return;
        
        this.isOpen = !this.isOpen;
        
        if(this.isOpen) {
            const chatLog = document.getElementById('aura-chat');
            // Si es la primera vez que se abre el chat, enviar saludo dinámico y empático
            if(chatLog && chatLog.children.length === 0) {
                const userName = localStorage.getItem('valtara_identity_name_v11') || 'Apreciable visitante';
                const hour = new Date().getHours();
                let timeGreeting = "Buenas noches";
                let emoji = "🌙";

                if (hour >= 4 && hour < 12) { timeGreeting = "Buenos días"; emoji = "☀️"; } 
                else if (hour >= 12 && hour < 19) { timeGreeting = "Buenas tardes"; emoji = "🌤️"; }

                const initialGreeting = `¡${timeGreeting} ${userName}! ${emoji} ¿Cómo te puedo ayudar el día de hoy? Si sientes alguna molestia, dímelo y te recomendaré la terapia perfecta.`;
                this.appendMsg(initialGreeting, 'bot', false);
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
        const inputField = document.getElementById('aura-input');
        if (!inputField) return;
        const txt = inputField.value.trim(); 
        if(txt === '') return; 
        
        this.appendMsg(txt, 'user'); 
        inputField.value = ''; 
        this.hideChips(); 
        this.triggerBotAnalysis(txt);
    },

    processDirectQuery: function(query) {
        this.appendMsg(query, 'user');
        this.triggerBotAnalysis(query);
    },

    // Muestra animación de "escribiendo..."
    triggerBotAnalysis: function(txt) {
        const chatLog = document.getElementById('aura-chat');
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator active';
        typingDiv.id = 'temp-typing';
        typingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        chatLog.appendChild(typingDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
        
        setTimeout(() => {
            if(document.getElementById('temp-typing')) document.getElementById('temp-typing').remove();
            
            // Si estamos a la mitad de un triaje, ignoramos el NLP y pasamos al siguiente paso
            if(this.triageActive) {
                this.advanceTriage(txt);
            } else {
                this.processNLP(txt.toLowerCase(), txt);
            }
        }, 1200); // 1.2 segundos para simular que está pensando
    },

    // ================================================================================
    // MOTOR DE NLP Y DETECCIÓN DE TRIAJE
    // ================================================================================
    processNLP: function(txtLower, originalTxt) {
        // 1. Verificar Red Flags primero (Gana sobre todo)
        const redFlagIntent = this.intentsDB.find(i => i.id === "medical_red_flag");
        let hasRedFlag = false;
        redFlagIntent.words.forEach(w => { if(txtLower.includes(w)) hasRedFlag = true; });
        if(hasRedFlag) {
            this.appendMsg(redFlagIntent.response, 'bot', true);
            return;
        }

        // 2. Verificar si el paciente está pidiendo un Triaje/mencionando dolor
        let needsTriage = false;
        this.triageTriggers.forEach(w => {
            const regex = new RegExp("\\b" + w + "\\b", "gi");
            if(txtLower.match(regex)) needsTriage = true;
        });

        if(needsTriage) {
            this.startTriage();
            return;
        }

        // 3. Procesamiento NLP Normal para dudas (Precios, Cancelaciones, etc.)
        let scores = [];
        this.intentsDB.forEach(intent => {
            if(intent.id === "medical_red_flag") return; // Ya lo checamos
            let localScore = 0;
            intent.words.forEach(word => {
                const regex = new RegExp("\\b" + word + "\\b", "gi");
                const matches = txtLower.match(regex);
                if(matches) localScore += (matches.length * intent.weight);
                else if (txtLower.includes(word)) localScore += (0.5 * intent.weight); 
            });
            if(localScore > 0) scores.push({ id: intent.id, score: localScore, response: intent.response }); 
        });
        
        if(scores.length > 0) {
            scores.sort((a, b) => b.score - a.score);
            
            // Lógica de "Exceso de Síntomas"
            const wordCount = txtLower.split(/\s+/).length;
            if(wordCount > 25 && scores.length > 1 && scores[0].id !== "pregnancy") {
                return this.appendMsg("He analizado su extenso caso. Presenta una acumulación de síntomas sistémicos cruzados. La complejidad de su tensión amerita una valoración presencial cuidadosa. Le sugiero agendar un <strong>Masaje Holístico Integrativo</strong> para que nuestro especialista diagnostique su cuerpo en cabina.<br><br><a href='https://wa.me/5213348572070' target='_blank' class='btn-ws' style='text-decoration:none;'><i class='fa-brands fa-whatsapp'></i> Agendar Valoración</a>", 'bot', true);
            }
            
            this.appendMsg(scores[0].response, 'bot', true);
            return;
        }

        // Fallback: Si no entiende, lo manda a WhatsApp elegantemente
        const wLink = `https://wa.me/5213348572070?text=Hola,%20tengo%20esta%20duda%20en%20espec%C3%ADfico:%20${encodeURIComponent(originalTxt)}`;
        const fallbackMsg = `Te leo con atención. 🤔 Tu consulta es tan específica que prefiero que te atienda nuestro especialista humano. Haz clic aquí para que te asista directamente en WhatsApp 👇<br><br><button class='btn-ws' onclick='window.open(\"${wLink}\", \"_blank\")' style='margin-top:10px; border-radius:30px; padding:10px 20px; font-weight:bold;'><i class='fa-brands fa-whatsapp'></i> Hablar con especialista</button>`;
        this.appendMsg(fallbackMsg, 'bot', true);
    },

    // ================================================================================
    // FLUJO DE TRIAJE INTERACTIVO (4 PREGUNTAS) Y CIERRE DE VENTA
    // ================================================================================
    startTriage: function() {
        this.triageActive = true;
        this.triageStep = 1;
        this.triageData = {};
        const userName = localStorage.getItem('valtara_identity_name_v11') || 'paciente';

        this.appendMsg(`Entiendo perfectamente lo que sientes, ${userName}. 🩺 Para recomendarte la terapia exacta, permíteme hacerte 3 preguntas rápidas sobre tu cuerpo.`, 'bot', false);
        
        setTimeout(() => {
            const question = "¿Hace cuánto tiempo comenzó esta molestia? ⏳";
            const options = ["Hace unos días", "Hace varias semanas", "Llevo meses así"];
            this.appendMsgWithButtons(question, options, 'step1');
        }, 800);
    },

    advanceTriage: function(userAnswer) {
        // Paso 1 respondido -> Preguntar Paso 2
        if(this.triageStep === 1) {
            this.triageData.tiempo = userAnswer;
            this.triageStep = 2;
            const question = "Entendido. ¿Cómo describirías la sensación principal en la zona? 🤒";
            const options = ["Siento Rigidez y Nudos duros", "Es un dolor punzante / Ardor", "Siento pesadez e hinchazón"];
            this.appendMsgWithButtons(question, options, 'step2');
        } 
        // Paso 2 respondido -> Preguntar Paso 3
        else if(this.triageStep === 2) {
            this.triageData.tipoDolor = userAnswer;
            this.triageStep = 3;
            const question = "Ya veo. Última pregunta: Del 1 al 10, ¿qué tan alto es tu nivel de estrés o agotamiento mental hoy? 🧠";
            const options = ["Leve (1 al 4)", "Moderado (5 al 7)", "Severo / Burnout (8 al 10)"];
            this.appendMsgWithButtons(question, options, 'step3');
        }
        // Paso 3 respondido -> Confirmar y Cerrar
        else if(this.triageStep === 3) {
            this.triageData.estres = userAnswer;
            this.triageStep = 4;
            const question = "¡Gracias por confiar en mí! 🙏 Ya tengo tu perfil clínico. ¿Estás dispuesto/a a agendar una sesión con nosotros para solucionar esto de raíz? 📅";
            const options = ["¡Sí, deseo agendar!", "Solo quería información"];
            this.appendMsgWithButtons(question, options, 'step4');
        }
        // Paso 4 respondido -> Resultado y Temporizador
        else if(this.triageStep === 4) {
            this.triageActive = false; // Terminamos el triaje
            
            if(userAnswer.includes("Solo quería")) {
                this.appendMsg("Comprendo perfectamente. ✨ Si cambias de opinión, tu diagnóstico está listo. Puedes volver a escribirme o hacer clic en el botón de WhatsApp cuando lo desees.", 'bot', false);
                return;
            }

            // Diagnóstico simple basado en el tipo de dolor (Paso 2)
            let terapiaRecomendada = "Masaje Holístico Integrativo";
            if(this.triageData.tipoDolor.includes("Rigidez")) terapiaRecomendada = "Masaje Deportivo con Descompresión";
            if(this.triageData.tipoDolor.includes("Ardor") || this.triageData.estres.includes("Severo")) terapiaRecomendada = "Ritual Lomi Lomi Supremo";
            if(this.triageData.tipoDolor.includes("hinchazón")) terapiaRecomendada = "Drenaje Linfático o Masaje Reductivo";

            const userName = localStorage.getItem('valtara_identity_name_v11') || 'visitante';
            
            // LA FRASE EXACTA SOLICITADA POR EL USUARIO
            const closingMsg = `Bueno ${userName}, tomando en cuenta esta información y que aceptaste agendar, te dirigiré a WhatsApp. 📲 \n\nLa terapia ideal para tu cuerpo en este momento es el <strong>${terapiaRecomendada}</strong>.`;
            
            this.appendMsg(closingMsg, 'bot', true);
            this.startCountdownRedirect(terapiaRecomendada, userName);
        }
    },

    // Inyecta botones interactivos en el chat para el Triaje
    appendMsgWithButtons: function(questionText, optionsArray, stepContext) {
        const log = document.getElementById('aura-chat');
        const div = document.createElement('div'); 
        div.className = 'msg bot';
        
        let html = `<p style="margin-bottom: 15px;">${questionText}</p><div style="display:flex; flex-direction:column; gap:10px;">`;
        
        optionsArray.forEach(opt => {
            html += `<button class="triage-btn" style="background: rgba(178, 0, 255, 0.2); border: 1px solid var(--valtara-morado-vivo); color: #fff; padding: 12px; border-radius: 20px; font-size: 1.1rem; cursor: pointer; transition: 0.3s; text-align: left;" onclick="AuraEngine.processDirectQuery('${opt}')">${opt}</button>`;
        });
        
        html += `</div>`;
        div.innerHTML = html;
        
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
        
        if(window.A11yEngine) A11yEngine.announce("Aura pregunta: " + questionText);
    },

    // ================================================================================
    // TEMPORIZADOR DE 7 SEGUNDOS Y REDIRECCIÓN A WHATSAPP (CLOSER)
    // ================================================================================
    startCountdownRedirect: function(terapia, userName) {
        const panel = document.getElementById('aura-redirect-panel');
        const timerText = document.getElementById('aura-countdown-timer');
        const progressBar = document.getElementById('aura-progress-bar');
        
        if(!panel || !timerText || !progressBar) return;

        // Mostrar el panel
        panel.style.display = 'block';
        
        let secondsLeft = 7;
        timerText.textContent = secondsLeft;
        progressBar.style.width = '100%';
        progressBar.style.transition = 'none'; // Reset visual
        
        // Forzar reflujo para que la transición funcione
        void progressBar.offsetWidth; 
        
        // Iniciar transición CSS de la barra (7 segundos de ancho 100% a 0%)
        progressBar.style.transition = 'width 7s linear';
        progressBar.style.width = '0%';

        if(window.A11yEngine) A11yEngine.announce("Serás redirigido a WhatsApp en 7 segundos.");

        this.countdownInterval = setInterval(() => {
            secondsLeft--;
            timerText.textContent = secondsLeft;
            
            if(secondsLeft <= 0) {
                clearInterval(this.countdownInterval);
                panel.style.display = 'none';
                
                // Construir Mensaje Pre-cargado
                const wText = `¡Hola! Soy ${userName}. Hice mi triaje con Aura AI y mi cuerpo necesita la terapia de *${terapia}*. Deseo consultar sus horarios y agendar mi cita por favor. ✨`;
                const wLink = `https://wa.me/5213348572070?text=${encodeURIComponent(wText)}`;
                
                // Redirigir a la pestaña de WhatsApp
                window.open(wLink, '_blank');
                
                this.appendMsg("¡Te he transferido exitosamente a WhatsApp! 🌟 Cierra esta ventana y continúa tu reservación por allá.", "bot");
            }
        }, 1000);
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
        log.scrollTop = log.scrollHeight;
        
        if(sender === 'bot' && window.A11yEngine) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = txtOrHtml;
            A11yEngine.announce("Aura dice: " + tempDiv.textContent);
        }
    }
};

window.addEventListener('DOMContentLoaded', () => AuraEngine.init());
