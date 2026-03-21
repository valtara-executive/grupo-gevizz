/**
 * ====================================================================================
 * BLOQUE 8: AURA AI ENGINE V11.3 (NLP EXPANDIDO, TRIAJE ÉTICO Y DEEP LINKS)
 * Motor IA de Valoración Biomecánica, Redirección Nativa a App WhatsApp y Transparencia.
 * ====================================================================================
 */

const AuraEngine = {
    isOpen: false,
    triageActive: false,
    triageStep: 0,
    triageData: {},
    countdownInterval: null,
    hasGrit: false, // Controla si ya saludó proactivamente

    // Base de datos NLP Expandida (Conocimiento Total de la Enciclopedia Valtara)
    intentsDB: [
        { id: "greeting", weight: 1, words: ["hola", "buenos", "buenas", "que tal", "saludos", "hey"], 
          response: "¡Hola de nuevo! ✨ Soy Aura, la IA de Valtara. ¿En qué te puedo orientar el día de hoy?" },
        
        { id: "gratitude", weight: 1, words: ["gracias", "muchas gracias", "te lo agradezco", "mil gracias", "perfecto"], 
          response: "¡El honor es todo mío! 🙏 En Valtara y Grupo Gevizz S.A.S. estamos para servirte con excelencia." },
        
        // RED FLAGS MÉDICAS (PRIORIDAD ABSOLUTA - PROTECCIÓN LEGAL)
        { id: "medical_red_flag", weight: 100, words: ["fractura", "roto", "rompi", "esguince", "desgarre", "gripe", "fiebre", "infeccion", "tos", "cirugia", "herida", "sangrado", "tumor", "cancer", "operacion", "covid", "diagnostico medico", "curar"], 
          response: "<strong>⚠️ Aviso de Ética y Seguridad:</strong> Detecto que mencionas una condición o síntoma médico. Es importante aclararte que en Valtara <strong>NO somos médicos y no podemos dar diagnósticos médicos</strong>. Somos terapeutas biomecánicos de apoyo. Tratamos estas condiciones únicamente cuando ya existe una prescripción o diagnóstico de tu médico tratante. Por favor, consulta a un doctor primero y estaremos honrados de apoyar en tu rehabilitación posterior. 🏥" },
        
        { id: "pregnancy", weight: 80, words: ["embarazo", "embarazada", "gestacion", "bebe", "prenatal", "meses de embarazo"], 
          response: "¡Felicidades por tu embarazo! 🤰 Por el momento, nuestro servicio de <strong>Cuidado Materno</strong> se encuentra en fase de adaptación arquitectónica en Reforma para garantizar tu seguridad al 100%. Aún no está disponible, pero esperamos tenerlo pronto. 🌸" },

        // ESTACIONAMIENTO Y TRANSPORTE PÚBLICO
        { id: "estacionamiento", weight: 50, words: ["estacionamiento", "valet", "parking", "coche", "auto", "carro", "donde me estaciono"], 
          response: "Por el momento <strong>no contamos con estacionamiento</strong> en el edificio. Sin embargo, nos esforzamos para poder ofrecer opciones de estacionamiento gratuitos pronto; en cuanto los tengamos disponibles se lo haremos saber. 🚗" },

        { id: "transporte", weight: 50, words: ["metrobus", "metro", "transporte publico", "llegar", "estacion", "ruta", "camion"], 
          response: "Llegar en transporte público es muy fácil. 🚇 <br><br><strong>Metrobús Línea 7:</strong> (Dirección La Diana, Campo Marte o Indios Verdes) bajar en la <strong>estación Hamburgo</strong>.<br><strong>Metrobús Línea 1:</strong> (Dirección El Caminero, Dr. Gálvez, Glorieta de Los Insurgentes o Indios Verdes) bajar también en la <strong>estación Hamburgo</strong>." },

        // POLÍTICAS, MARKETING Y LOGÍSTICA
        { id: "cancelacion", weight: 10, words: ["cancelar", "cancelacion", "reprogramar", "no puedo ir", "reembolso", "penalizacion", "perder"], 
          response: "Nuestra política protege el tiempo en cabina: ⏱️ <br><br>1. <strong>Reembolso 100%:</strong> Si cancelas o reprogramas con más de 24 hrs de anticipación.<br>2. <strong>Sin Reembolso:</strong> Cancelaciones dentro de las 24 hrs previas o no presentarte (No-Show) resultan en pérdida del 100% de tu anticipo. 🚫" },
        
        { id: "logistica", weight: 3, words: ["donde", "ubicacion", "direccion", "lugar", "domicilio", "hotel", "encuentran", "zona", "reforma", "cdmx"], 
          response: "Nuestro santuario está en: <strong>Av. Paseo de la Reforma 195, Piso 3, Col. Cuauhtémoc, CDMX</strong>. Es indispensable presentar identificación oficial en recepción. 📍 Por bioseguridad, <strong>NO ofrecemos masajes a domicilio ni en hoteles</strong>. 🛑" },

        { id: "pagos", weight: 10, words: ["pago", "pagar", "tarjeta", "efectivo", "transferencia", "anticipo", "meses sin intereses", "msi"], 
          response: "💳 Actualmente operamos exclusivamente mediante <strong>Efectivo y Transferencia Bancaria</strong>. Para asegurar tu cita pedimos un 50% de anticipo. Estamos trabajando para implementar terminales y Meses Sin Intereses muy pronto." },

        { id: "vestimenta", weight: 10, words: ["ropa", "vestimenta", "que me pongo", "desnudo", "privacidad", "toallas"], 
          response: "Tu dignidad es prioridad. 👕 Te sugerimos traer ropa deportiva cómoda (shorts). En cabina usamos sábanas de alta calidad y aplicamos el <strong>Drapeo Selectivo</strong>: solo descubrimos la zona anatómica exacta que estamos trabajando, el resto de tu cuerpo permanece cubierto." },
        
        // PRECIOS Y SERVICIOS
        { id: "paralisis", weight: 20, words: ["paralisis facial", "paralisis", "cara chueca", "nervio facial", "mitad de la cara"], 
          response: "Ofrecemos un <strong>Masaje para Parálisis Facial ($529 MXN)</strong> enfocado en rehabilitación neuromuscular. Trabajamos relajando el lado sano y estimulando el lado paralizado (con frío/calor) para apoyar en la recuperación de la simetría. Recuerda que somos apoyo a tu diagnóstico médico. 💆‍♀️" },

        { id: "precios", weight: 3, words: ["precio", "costo", "cuanto", "vale", "cobran", "tarifa", "catalogo", "menu"], 
          response: "¡Claro! 💳 Nuestras terapias inician en <strong>$799 MXN</strong> (Relajante). Tenemos opciones como Deportivo o Tailandés (<strong>$829 MXN</strong>), Drenaje Linfático (<strong>$849 MXN</strong> bajo autorización médica), energéticos como Ayurveda/Holístico (<strong>$929 MXN</strong>), y el Supremo Lomi Lomi (<strong>$1,199 MXN</strong>)." },
        
        { id: "contacto_humano", weight: 10, words: ["humano", "operador", "persona", "asesor", "hablar", "cita", "agendar", "whatsapp", "telefono", "marcar"], 
          response: "¡Por supuesto! 👤 Nuestro Concierge Clínico está listo para atenderte en WhatsApp.<br><br><button class='btn-ws' onclick='AuraEngine.openNativeWhatsApp(\"Hola, quiero hablar con el Concierge.\")' style='margin-top:10px; border-radius:30px; padding:10px 20px; font-weight:bold;'><i class='fa-brands fa-whatsapp'></i> Hablar con el Concierge</button>" }
    ],

    // Palabras detonadoras del Triaje (Si menciona esto, iniciamos las preguntas)
    triageTriggers: ["duele", "dolor", "espalda", "cuello", "hombros", "ciatica", "estres", "cansancio", "nudos", "contractura", "triaje", "recomiendas", "recomendar", "ayuda", "pesadez", "rigidez", "lumbar", "migraña"],

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

        chips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                const query = e.target.getAttribute('data-query');
                this.processDirectQuery(query);
                this.hideChips();
            });
        });

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
            
            if(this.triageActive) {
                this.advanceTriage(txt);
            } else {
                this.processNLP(txt.toLowerCase(), txt);
            }
        }, 1200); 
    },

    processNLP: function(txtLower, originalTxt) {
        // Red Flags Médicas
        const redFlagIntent = this.intentsDB.find(i => i.id === "medical_red_flag");
        let hasRedFlag = false;
        redFlagIntent.words.forEach(w => { if(txtLower.includes(w)) hasRedFlag = true; });
        if(hasRedFlag) {
            this.appendMsg(redFlagIntent.response, 'bot', true);
            return;
        }

        // Detonadores de Valoración (Triaje)
        let needsTriage = false;
        this.triageTriggers.forEach(w => {
            const regex = new RegExp("\\b" + w + "\\b", "gi");
            if(txtLower.match(regex)) needsTriage = true;
        });

        if(needsTriage) {
            this.startTriage();
            return;
        }

        // Dudas Generales
        let scores = [];
        this.intentsDB.forEach(intent => {
            if(intent.id === "medical_red_flag") return; 
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
            this.appendMsg(scores[0].response, 'bot', true);
            return;
        }

        // Fallback
        const fallbackMsg = `Te leo con atención. 🤔 Tu consulta es tan específica que prefiero que te atienda nuestro especialista humano.<br><br><button class='btn-ws' onclick='AuraEngine.openNativeWhatsApp(\"Hola, tengo esta duda: ${originalTxt}\")' style='margin-top:10px; border-radius:30px; padding:10px 20px; font-weight:bold;'><i class='fa-brands fa-whatsapp'></i> Hablar con especialista</button>`;
        this.appendMsg(fallbackMsg, 'bot', true);
    },

    // ================================================================================
    // FLUJO DE VALORACIÓN BIOMECÁNICA ÉTICA (6 PASOS)
    // ================================================================================
    startTriage: function() {
        this.triageActive = true;
        this.triageStep = 1;
        this.triageData = {};
        
        // DISCLAIMER ÉTICO (Protección de Ley General de Salud)
        const disclaimer = "<em>Antes de comenzar, es mi deber informarte que <strong>no somos médicos y esto no es un diagnóstico clínico</strong>, sino una valoración biomecánica para sugerirte la mejor terapia manual de apoyo.</em> 🩺";
        this.appendMsg(disclaimer, 'bot', true);

        setTimeout(() => {
            const question = "Paso 1: ¿En qué zona anatómica sientes la mayor tensión o molestia?";
            const options = ["Cuello, Nuca o Hombros", "Espalda Baja (Lumbar) / Ciática / Piernas", "Rostro, Mandíbula o Cabeza (Migraña)", "Estrés General en todo el cuerpo"];
            this.appendMsgWithButtons(question, options, 'step1');
        }, 1500);
    },

    advanceTriage: function(userAnswer) {
        if(this.triageStep === 1) {
            this.triageData.zona = userAnswer;
            this.triageStep = 2;
            const question = "Paso 2: ¿Cómo describirías la sensación física principal en esa zona? 🤕";
            const options = ["Rigidez o nudos musculares duros", "Punzada, hormigueo o ardor", "Pesadez, retención de líquidos o inflamación", "Tensión por parálisis o bruxismo"];
            this.appendMsgWithButtons(question, options, 'step2');
        } 
        else if(this.triageStep === 2) {
            this.triageData.sensacion = userAnswer;
            this.triageStep = 3;
            const question = "Paso 3: ¿Hace cuánto tiempo comenzó esta condición? ⏳";
            const options = ["Agudo (Hace unos días)", "Subagudo (Llevo semanas así)", "Crónico (Llevo meses o años)"];
            this.appendMsgWithButtons(question, options, 'step3');
        }
        else if(this.triageStep === 3) {
            this.triageData.tiempo = userAnswer;
            this.triageStep = 4;
            const question = "Paso 4: ¿En qué momento del día empeora o qué factor lo detona? ⚠️";
            const options = ["Al despertar / Con el clima frío", "Al estar mucho tiempo sentado trabajando", "Lo detona el estrés laboral o emocional intenso"];
            this.appendMsgWithButtons(question, options, 'step4');
        }
        else if(this.triageStep === 4) {
            this.triageData.detonante = userAnswer;
            this.triageStep = 5;
            const question = "Paso 5: Del 1 al 10, ¿cómo calificarías tu nivel de estrés mental o carga emocional actual? 🧠";
            const options = ["Leve (1 al 4)", "Moderado (5 al 7)", "Severo / Burnout (8 al 10)"];
            this.appendMsgWithButtons(question, options, 'step5');
        }
        else if(this.triageStep === 5) {
            this.triageData.estres = userAnswer;
            this.triageStep = 6;
            
            // EL MOMENTO DE LA TRANSPARENCIA ABSOLUTA
            const question = "¡He procesado tu información biomecánica! 📊 Como política de transparencia en Valtara, el resultado es tuyo sin compromiso. ¿Deseas que te comparta mi sugerencia y agendar cita, o prefieres solo llevarte la información médica por ahora?";
            const options = ["Deseo mi sugerencia y agendar cita", "Solo quiero la información por ahora, gracias"];
            this.appendMsgWithButtons(question, options, 'step6');
        }
        else if(this.triageStep === 6) {
            this.triageActive = false;
            const userName = localStorage.getItem('valtara_identity_name_v11') || 'Apreciable paciente';
            
            // CÁLCULO INTELIGENTE DE TERAPIA
            let recomendacion = "Masaje Holístico Integrativo ($929 MXN)";
            let motivo = "ayuda a liberar bloqueos emocionales somatizados y regular la presión arterial de forma generalizada";

            if (this.triageData.zona.includes("Rostro")) {
                if (this.triageData.sensacion.includes("parálisis")) { recomendacion = "Masaje para Parálisis Facial ($529 MXN)"; motivo = "ofrece rehabilitación neuromuscular especializada para el nervio facial"; }
                else { recomendacion = "Relajación Facial + Mascarilla ($419 MXN)"; motivo = "descomprime la musculatura craneal y maxilar, combatiendo la migraña"; }
            } else if (this.triageData.zona.includes("Lumbar") && this.triageData.detonante.includes("sentado")) {
                recomendacion = "Masaje Tailandés - Yoga Pasivo ($829 MXN)"; motivo = "elonga el músculo psoas acortado por el sedentarismo y libera la compresión del nervio ciático";
            } else if (this.triageData.sensacion.includes("Pesadez") || this.triageData.sensacion.includes("retención")) {
                recomendacion = "Drenaje Linfático Manual ($849 MXN)"; motivo = "moviliza líquidos estancados y toxinas (Nota: requiere autorización médica para patologías específicas)";
            } else if (this.triageData.sensacion.includes("Rigidez") && this.triageData.tiempo.includes("Crónico")) {
                recomendacion = "Masaje Deportivo y Descompresión ($829 MXN)"; motivo = "utiliza ventosas y presión profunda para romper la 'armadura' de fascias endurecidas";
            } else if (this.triageData.estres.includes("Severo")) {
                recomendacion = "Ritual Lomi Lomi Supremo ($1,199 MXN)"; motivo = "induce ondas cerebrales Theta, reseteando por completo un sistema nervioso en estado de Burnout extremo";
            }

            // RESPUESTA DE TRANSPARENCIA (SIN AGENDAR)
            if(userAnswer.includes("Solo quiero la información")) {
                const infoMsg = `¡Claro que sí, ${userName}! Con total honestidad te comparto que, según los datos que me diste, tu tejido conectivo está sufriendo una sobrecarga. La terapia de apoyo biomecánico ideal para ti es el <strong>${recomendacion}</strong>, porque ${motivo}.<br><br>Siéntete libre de guardar esta información, consultar con tu médico o comparar opciones. Si en el futuro decides que Valtara es el santuario adecuado para ti, aquí estaremos con las puertas abiertas. ¡Tu bienestar siempre es primero! ✨`;
                this.appendMsg(infoMsg, 'bot', true);
                return;
            }

            // RESPUESTA DE CIERRE Y REDIRECCIÓN A APP DE WHATSAPP
            const closingMsg = `Excelente decisión, ${userName}. 📲 Basado en la fisiología de tu tensión, la terapia exacta que tu cuerpo exige es el <strong>${recomendacion}</strong>, ya que ${motivo}.<br><br>Preparando transferencia segura a nuestro Concierge...`;
            this.appendMsg(closingMsg, 'bot', true);
            
            const wText = `¡Hola Concierge! Soy ${userName}. Aura IA me realizó una valoración y determinó que requiero el *${recomendacion}*. Mi molestia principal está en: ${this.triageData.zona}. Deseo consultar disponibilidad para agendar.`;
            this.startCountdownRedirect(wText);
        }
    },

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
    // SISTEMA DE DEEP LINK (ABRIR NATIVAMENTE LA APP DE WHATSAPP)
    // ================================================================================
    openNativeWhatsApp: function(mensaje) {
        const phone = "5213348572070";
        const text = encodeURIComponent(mensaje);
        
        // El Deep Link (whatsapp://) fuerza al celular a abrir la App instalada.
        const appUrl = `whatsapp://send?phone=${phone}&text=${text}`;
        const webUrl = `https://wa.me/${phone}?text=${text}`;

        // Intentar abrir la App nativa primero
        window.location.href = appUrl;

        // Si después de 1.5 segundos el usuario sigue en la página (porque no tiene la App, ej. PC),
        // lanzamos el fallback (abrir WhatsApp Web en nueva pestaña)
        setTimeout(() => {
            window.open(webUrl, '_blank');
        }, 1500);
    },

    startCountdownRedirect: function(mensajePreparado) {
        const panel = document.getElementById('aura-redirect-panel');
        const timerText = document.getElementById('aura-countdown-timer');
        const progressBar = document.getElementById('aura-progress-bar');
        
        if(!panel || !timerText || !progressBar) return;

        panel.style.display = 'block';
        let secondsLeft = 7;
        timerText.textContent = secondsLeft;
        progressBar.style.width = '100%';
        progressBar.style.transition = 'none'; 
        void progressBar.offsetWidth; 
        progressBar.style.transition = 'width 7s linear';
        progressBar.style.width = '0%';

        if(window.A11yEngine) A11yEngine.announce("Serás redirigido a la aplicación de WhatsApp en 7 segundos.");

        this.countdownInterval = setInterval(() => {
            secondsLeft--;
            timerText.textContent = secondsLeft;
            
            if(secondsLeft <= 0) {
                clearInterval(this.countdownInterval);
                panel.style.display = 'none';
                
                // Ejecutar el protocolo Deep Link para forzar la App
                this.openNativeWhatsApp(mensajePreparado);
                
                this.appendMsg("¡Te he transferido a tu aplicación de WhatsApp! 🌟 Cierra esta ventana y continúa tu reservación directamente allá con el Concierge humano.", "bot");
            }
        }, 1000);
    },

    appendMsg: function(txtOrHtml, sender, isHtml = false) {
        const log = document.getElementById('aura-chat');
        if(!log) return;

        const div = document.createElement('div'); 
        div.className = `msg ${sender}`;
        
        if(isHtml) { div.innerHTML = txtOrHtml; } 
        else { div.textContent = txtOrHtml; }
        
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
