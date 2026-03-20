/**
 * ====================================================================================
 * BLOQUE 8: AURA AI ENGINE V11.0 (NLP & CONCIERGE)
 * Motor de lenguaje natural, Suggestion Chips y Red Flags Médicas.
 * ====================================================================================
 */

const AuraEngine = {
    // Saludos dinámicos al abrir el chat
    greetings: [
        "Iniciando Red Neuronal Sovereign... Bienvenido a Valtara. Soy Aura. ¿Desea que evaluemos su estado fascial o su requerimiento estético hoy?",
        "Conexión encriptada establecida. Su cuerpo exige un reseteo estructural. Descríbame su molestia a detalle, y la analizaré con precisión clínica.",
        "Valtara OS 11.0 en línea. Soy Aura, inteligencia clínica de Grupo Gevizz. Seleccione una sugerencia o redacte su situación muscular."
    ],
    
    // BASE DE DATOS NLP 11.0 (Pesos y palabras clave)
    intentsDB: [
        // SOCIAL & CONVERSACIONAL
        { id: "greeting", weight: 1, words: ["hola", "buenos dias", "buenas tardes", "buenas noches", "que tal", "saludos", "hey"], 
          response: "¡Hola! Es un verdadero honor saludarle. Soy Aura, la inteligencia clínica de Valtara. ¿En qué puedo asistirle hoy para elevar su bienestar?" },
        { id: "gratitude", weight: 1, words: ["gracias", "muchas gracias", "te lo agradezco", "mil gracias", "muy amable", "perfecto"], 
          response: "El honor es todo mío. En Valtara y Grupo Gevizz estamos para servirle con excelencia. ¿Hay alguna otra duda que pueda resolver por usted?" },
        
        // RED FLAGS MÉDICAS (PRIORIDAD ABSOLUTA - WEIGHT ALTO PARA CANCELAR CUALQUIER OTRA INTENCIÓN)
        { id: "medical_red_flag", weight: 100, words: ["fractura", "roto", "rompi", "esguince", "desgarre", "gripe", "fiebre", "infeccion", "tos", "cirugia", "herida", "sangrado", "tumor", "cancer", "operacion", "covid"], 
          response: "<strong>⚠️ Aviso Clínico de Seguridad:</strong> He analizado su mensaje y detecto síntomas agudos (posible fractura, lesión severa o infección) que escapan al alcance de la masoterapia biomecánica. Por protocolo de Grupo Gevizz, <strong>le instamos a consultar a un Médico o Traumatólogo de inmediato</strong>. En Valtara no tratamos lesiones agudas. Una vez que su médico le dé el alta oficial, estaremos honrados de asistirle en su rehabilitación." },
        { id: "pregnancy", weight: 80, words: ["embarazo", "embarazada", "gestacion", "bebe", "prenatal", "meses de embarazo"], 
          response: "Detecto que menciona un estado de gestación. Por el momento, el <strong>Cuidado Materno</strong> se encuentra en fase de adaptación arquitectónica y de mobiliario en nuestra sede de Reforma para garantizar su seguridad al 100%. Aún no está disponible." },

        // INTENCIONES DE TERAPIA Y SÍNTOMAS
        { id: "dolor_espalda", weight: 5, words: ["espalda", "lumbar", "cuello", "hombros", "trapecio", "ciatica", "dolor", "contractura", "tension", "carga", "pesadez", "rigidez", "sentado", "computadora"], 
          response: "Los síntomas en la musculatura posterior indican somatización por carga laboral. Para desmantelar esa 'armadura', le prescribo el <strong>Masaje Deportivo y Descompresión ($949 MXN)</strong>. Utilizaremos ventosas de silicón para separar la fascia adherida.<br><br><button class='btn-ws' onclick='document.getElementById(\"aura-close-btn\").click(); AppRouter.navigate(\"view-restoration\")'><i class='fa-solid fa-bolt'></i> Ver Masaje Deportivo</button>" },
        
        { id: "estetica_reductivo", weight: 5, words: ["grasa", "celulitis", "reductivo", "talla", "medidas", "maderoterapia", "modelado", "estetica", "peso", "bajar", "flacidez", "abdomen"], 
          response: "Su requerimiento estético se aborda con el <strong>Masaje Reductivo Estructural ($899 MXN)</strong>. Es una intervención de alto impacto sin bisturí. Combinamos geles térmicos con Maderoterapia para romper nódulos de celulitis y acelerar su metabolismo basal." },

        // POLÍTICAS, MARKETING Y LOGÍSTICA
        { id: "cancelacion", weight: 10, words: ["cancelar", "cancelacion", "reprogramar", "no puedo ir", "reembolso", "penalizacion", "perder"], 
          response: "Nuestra política es estricta por respeto al tiempo clínico: <br>1. <strong>Reembolso 100%:</strong> Si cancela o reprograma con más de 24 hrs de anticipación.<br>2. <strong>Sin Reembolso:</strong> Cancelaciones dentro de las 24 horas previas o no presentarse (No-Show) resultan en la pérdida del 100% de su anticipo." },
        { id: "primavera_promos", weight: 3, words: ["primavera", "equinoccio", "descuento", "promocion", "mañana", "matutino", "20%", "beneficio"], 
          response: "Para darle la bienvenida a la primavera, ofrecemos un beneficio exclusivo: <strong>20% de cortesía</strong> en sus reservaciones matutinas (entre las 9:00 AM y las 12:00 PM). ¡Es el momento perfecto para arrancar su día con máximo rigor clínico!" },
        { id: "logistica", weight: 3, words: ["donde", "ubicacion", "direccion", "lugar", "domicilio", "hotel", "encuentran", "zona", "reforma", "cdmx"], 
          response: "Operamos exclusivamente en nuestro santuario corporativo: <strong>Av. Paseo de la Reforma 195, Piso 3, CDMX</strong>. Por protocolos de bioseguridad, <strong>no ofrecemos servicios a domicilio ni en hoteles</strong>." },
        { id: "precios", weight: 3, words: ["precio", "costo", "cuanto", "vale", "cobran", "tarifa", "catalogo", "pago"], 
          response: "La excelencia es accesible. Nuestras terapias inician en <strong>$879 MXN</strong> (Relajante), <strong>$899 MXN</strong> (Reductivo Maderoterapia), <strong>$949 MXN</strong> (Deportivo con Ventosas), hasta el exclusivo Lomi Lomi de 90 mins por <strong>$1,419 MXN</strong>." },
        { id: "contacto_humano", weight: 10, words: ["humano", "operador", "persona", "asesor", "hablar", "cita", "agendar", "whatsapp", "telefono", "marcar"], 
          response: "Por supuesto. Para gestión inmediata de su reservación, nuestro Concierge Clínico está listo para atenderle en WhatsApp.<br><br><a href='https://wa.me/5213348572070?text=Hola,%20deseo%20hablar%20con%20un%20Concierge%20humano.' target='_blank' class='btn-ws' style='text-decoration:none;'><i class='fa-brands fa-whatsapp'></i> Contactar Concierge Humano</a>" }
    ],

    isOpen: false,

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

        // Eventos para los Suggestion Chips
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
        
        if(this.isOpen) {
            // Si el chat está vacío (solo está el typing indicator oculto), enviamos saludo
            const chatLog = document.getElementById('aura-chat');
            if(chatLog && chatLog.children.length === 0) {
                const r = Math.floor(Math.random() * this.greetings.length);
                this.appendMsg(this.greetings[r], 'bot', false);
            }
        }
    },

    hideChips: function() {
        const chipsContainer = document.getElementById('aura-chips-container');
        if(chipsContainer) {
            chipsContainer.style.transition = 'opacity 0.4s ease';
            chipsContainer.style.opacity = '0';
            setTimeout(() => {
                chipsContainer.style.display = 'none';
            }, 400);
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
        
        // Crear y mostrar indicador de "escribiendo..."
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator active';
        typingDiv.id = 'temp-typing';
        typingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        chatLog.appendChild(typingDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
        
        // Simular tiempo de procesamiento neuronal
        setTimeout(() => {
            if(document.getElementById('temp-typing')) {
                document.getElementById('temp-typing').remove();
            }
            const responseHtml = this.processNLP(txt.toLowerCase(), txt);
            this.appendMsg(responseHtml, 'bot', true);
        }, 1500);
    },

    // ================================================================================
    // MOTOR NLP (Procesamiento de Lenguaje Natural por Pesos)
    // ================================================================================
    processNLP: function(txtLower, originalTxt) {
        let scores = [];
        
        this.intentsDB.forEach(intent => {
            let localScore = 0;
            intent.words.forEach(word => {
                // Búsqueda de palabra exacta o fragmentos
                const regex = new RegExp("\\b" + word + "\\b", "gi");
                const matches = txtLower.match(regex);
                if(matches) { 
                    localScore += (matches.length * intent.weight); 
                } else if (txtLower.includes(word)) { 
                    localScore += (0.5 * intent.weight); 
                } 
            });
            if(localScore > 0) { 
                scores.push({ id: intent.id, score: localScore, response: intent.response }); 
            }
        });
        
        if(scores.length > 0) {
            // Ordenamos de mayor a menor coincidencia
            scores.sort((a, b) => b.score - a.score);
            
            // Lógica de "Exceso de Síntomas" (Si el paciente escribe un texto muy largo y NO es un Red Flag)
            const wordCount = txtLower.split(/\s+/).length;
            if(wordCount > 25 && scores.length > 1 && scores[0].id !== "medical_red_flag" && scores[0].id !== "pregnancy") {
                return "He analizado su extenso caso. Presenta una acumulación de síntomas sistémicos cruzados. La complejidad de su tensión amerita una valoración presencial cuidadosa. Le sugiero agendar un <strong>Masaje Holístico Integrativo</strong> para que nuestro especialista diagnostique su cuerpo en cabina.<br><br><a href='https://wa.me/5213348572070' target='_blank' class='btn-ws' style='text-decoration:none;'><i class='fa-brands fa-whatsapp'></i> Agendar Valoración</a>";
            }
            
            // Devuelve la respuesta ganadora
            return scores[0].response;
        }

        // Fallback: Si no entiende nada, lo transfiere elegantemente al humano
        const wLink = `https://wa.me/5213348572070?text=Hola,%20Aura%20IA%20requiere%20apoyo%20cl%C3%ADnico%20para%20esta%20duda:%20${encodeURIComponent(originalTxt)}`;
        return `He escaneado su mensaje. Su requerimiento es tan específico que escapa a los parámetros de mi algoritmo actual. Le pido atentamente que presione el botón inferior para que nuestro Concierge Humano lea su solicitud en WhatsApp y le asista con precisión clínica.<br><br><a href='${wLink}' target='_blank' class='btn-ws' style='text-decoration:none;'><i class='fa-brands fa-whatsapp'></i> Transferir al Concierge</a>`;
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
        
        // Anunciador de accesibilidad para respuestas del bot
        if(sender === 'bot' && window.A11yEngine) {
            // Extraer solo texto si es HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = txtOrHtml;
            A11yEngine.announce("Aura dice: " + tempDiv.textContent);
        }
    }
};

window.addEventListener('DOMContentLoaded', () => AuraEngine.init());
