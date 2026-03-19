/**
 * ====================================================================================
 * BLOQUE 9: RED NEURONAL AURA AI (V 10.1 SOVEREIGN)
 * Motor de Procesamiento de Lenguaje Natural (NLP), Triaje Clínico y Generador de URLs.
 * ====================================================================================
 */

const AuraAI = {
    // Historial para mantener el contexto de la conversación
    chatHistory: [],
    
    // El número de teléfono oficial de Valtara
    wsNumber: "5213348572070",

    init: function() {
        this.bindEvents();
        // El mensaje de bienvenida se inyectó en el HTML, así que solo inicializamos los chips
        this.renderChips([
            "Me duele la ciática", 
            "Estrés por trabajo", 
            "Parálisis Facial", 
            "Masaje para Reducir", 
            "Precios Oficiales"
        ]);
    },

    bindEvents: function() {
        const sendBtn = document.getElementById('aura-send-btn');
        const inputField = document.getElementById('aura-input');

        if (sendBtn && inputField) {
            // Enviar con botón
            sendBtn.addEventListener('click', () => this.processInput());
            
            // Enviar con tecla Enter (en PC o teclado virtual)
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Evita que se recargue la página en móviles
                    this.processInput();
                }
            });
        }
    },

    processInput: function() {
        const inputField = document.getElementById('aura-input');
        const rawText = inputField.value.trim();
        
        if (!rawText) return;

        // 1. Mostrar el mensaje del usuario
        this.appendMessage(rawText, 'user');
        
        // Limpiar el input
        inputField.value = '';
        
        // 2. Ocultar los chips rápidos mientras piensa
        this.renderChips([]);

        // 3. Mostrar el indicador de "Escribiendo..."
        this.showTypingIndicator();

        // 4. Procesar la Inteligencia Artificial (Simulamos un retraso de red neuronal)
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.analyzeText(rawText.toLowerCase());
            this.appendMessage(response.msg, 'bot');
            
            // Renderizar los nuevos chips sugeridos por la IA
            if(response.chips && response.chips.length > 0) {
                setTimeout(() => this.renderChips(response.chips), 500);
            }
            
            // Anunciar a los lectores de pantalla
            if(window.A11yEngine) A11yEngine.announce("Aura dice: Respuesta generada.");

        }, 1500 + Math.random() * 1000); // Entre 1.5 y 2.5 segundos de "pensamiento"
    },

    // ================================================================================
    // MOTOR DE PENSAMIENTO NLP (Natural Language Processing)
    // ================================================================================
    analyzeText: function(text) {
        
        // ----------------------------------------------------------------------------
        // NIVEL 0: RED FLAGS MÉDICAS (Prioridad Absoluta)
        // ----------------------------------------------------------------------------
        const redFlags = ['fractura', 'roto', 'rompi', 'esguince', 'desgarre', 'fiebre', 'infeccion', 'cirugia', 'herida', 'sangrado', 'tumor', 'cancer', 'operacion', 'covid', 'hueso', 'luxacion'];
        if (redFlags.some(word => text.includes(word))) {
            return {
                msg: `<strong style="color:var(--valtara-rojo-alerta);"><i class="fa-solid fa-triangle-exclamation"></i> Alerta Clínica:</strong> He detectado terminología asociada a trauma médico agudo. En Valtara NO diagnosticamos patologías médicas ni tratamos lesiones agudas recientes. Por su estricta seguridad, le prescribo consultar a un Médico Traumatólogo de inmediato. Una vez que cuente con el alta oficial, estaremos honrados de asistirle en su rehabilitación muscular.`,
                chips: ["Entendido, gracias", "Solo quería información"]
            };
        }
        
        const pregnancyFlags = ['embarazo', 'embarazada', 'gestacion', 'bebe', 'prenatal'];
        if (pregnancyFlags.some(word => text.includes(word))) {
            return {
                msg: `Detecto que menciona un estado de gestación. Por el momento, el <strong>Cuidado Materno</strong> se encuentra en fase de adaptación arquitectónica en Valtara para garantizar su seguridad al 100%. Aún no está disponible, pero esperamos lanzarlo muy pronto.`,
                chips: ["Otras terapias disponibles", "Hablar con Concierge"]
            };
        }

        // ----------------------------------------------------------------------------
        // NIVEL 1: TRIAJE BIOMECÁNICO (Diagnósticos)
        // ----------------------------------------------------------------------------
        const diagLumbar = ['espalda baja', 'lumbar', 'ciatica', 'ciático', 'cintura', 'cadera', 'gluteo', 'pierna', 'sentado', 'silla', 'horas'];
        if (diagLumbar.some(word => text.includes(word))) {
            const wsLink = this.generateWhatsAppLink("tensión en la región lumbar (posible compresión discal)", "el Masaje Tailandés de estiramientos pasivos");
            return {
                msg: `La sintomatología en la región lumbar y miembros inferiores suele derivar del acortamiento de los flexores por sedentarismo prolongado (sillas de oficina). Esta compresión amenaza el nervio ciático.<br><br><strong>Prescripción de Aura:</strong> Le sugiero el <strong>Masaje Tailandés ($1,449 MXN)</strong> para descomprimir vértebras mediante estiramientos pasivos.`,
                chips: ["¿Qué es el Tailandés?", "Tengo dolor en el cuello"]
            };
        }

        const diagCervical = ['cuello', 'trapecio', 'hombros', 'nuca', 'cervical', 'cervicales', 'computadora', 'monitor', 'postura', 'pesadez', 'espalda alta', 'nudos', 'contractura'];
        if (diagCervical.some(word => text.includes(word))) {
            const wsLink = this.generateWhatsAppLink("tensión severa en trapecios y cervicales por estrés postural", "el Masaje Deportivo con Descompresión");
            return {
                msg: `Menciona tensión en el segmento superior. Esto indica una solidificación de la fascia por estrés postural continuo (Síndrome de <em>Text Neck</em>). Es vital romper esa "armadura" antes de que genere migrañas.<br><br><strong>Prescripción de Aura:</strong> Sugiero categóricamente el <strong>Masaje Deportivo y Descompresión ($949 MXN)</strong> utilizando ventosas de silicón médico para oxigenar la sangre oscura. ${wsLink}`,
                chips: ["¿Duele el Masaje Deportivo?", "¿Qué son las ventosas?"]
            };
        }

        const diagFacial = ['cara', 'rostro', 'mandibula', 'dientes', 'aprieto', 'bruxismo', 'paralisis', 'tic', 'ojo', 'cabeza', 'migraña', 'dolor de cabeza'];
        if (diagFacial.some(word => text.includes(word))) {
            const wsLink = this.generateWhatsAppLink("compresión del nervio trigémino y bruxismo", "la Rehabilitación Facial");
            return {
                msg: `Las afecciones craneales y mandibulares son alertas rojas de sobrecarga en el nervio trigémino, manifestándose frecuentemente como bruxismo nocturno (apretar los dientes).<br><br><strong>Prescripción de Aura:</strong> Requiere nuestra <strong>Rehabilitación Facial por Estrés ($519 MXN)</strong>, una técnica especializada con termoterapia y micro-ventosas sin agujas. ${wsLink}`,
                chips: ["¿Es doloroso?", "Estrés y Burnout"]
            };
        }

        // ----------------------------------------------------------------------------
        // NIVEL 2: ESTÉTICA Y LINFÁTICO
        // ----------------------------------------------------------------------------
        const diagEstetico = ['grasa', 'bajar', 'peso', 'talla', 'medidas', 'reductivo', 'maderoterapia', 'celulitis', 'abdomen', 'flacidez', 'estetica', 'modelar', 'cintura'];
        if (diagEstetico.some(word => text.includes(word))) {
            const wsLink = this.generateWhatsAppLink("modelado corporal estético", "el Masaje Reductivo Estructural con Maderoterapia");
            return {
                msg: `Comprendo su objetivo estético. En Valtara abordamos el modelado corporal sin bisturí mediante la aceleración del metabolismo local.<br><br><strong>Prescripción de Aura:</strong> El <strong>Masaje Reductivo Estructural ($899 MXN)</strong>. Usamos fricción térmica y Maderoterapia avanzada para movilizar nódulos adiposos hacia el sistema linfático. ${wsLink}`,
                chips: ["¿Cuántas sesiones necesito?", "Quiero relajarme mejor"]
            };
        }

        const diagLinfa = ['hinchadas', 'hinchazon', 'liquidos', 'retencion', 'edema', 'varices', 'circulacion', 'pesadas', 'pies'];
        if (diagLinfa.some(word => text.includes(word))) {
            const wsLink = this.generateWhatsAppLink("retención de líquidos y estancamiento linfático", "el Drenaje Linfático Manual");
            return {
                msg: `El edema y la sensación de pesadez indican que su sistema linfático (que no tiene una bomba natural como el corazón) está estancado debido a la falta de movimiento o factores hormonales.<br><br><strong>Prescripción de Aura:</strong> Un <strong>Drenaje Linfático Manual</strong> es imperativo para desintoxicar las extremidades y brindar ligereza inmediata. ${wsLink}`,
                chips: ["¿Qué precio tiene?", "Masaje Reductivo"]
            };
        }

        // ----------------------------------------------------------------------------
        // NIVEL 3: EMOCIONAL Y SISTEMA NERVIOSO (BURNOUT)
        // ----------------------------------------------------------------------------
        const diagEmocional = ['estres', 'ansiedad', 'burnout', 'insomnio', 'no puedo dormir', 'cansancio', 'agotamiento', 'llorar', 'nervios', 'tristeza', 'luto', 'depresion', 'angustia'];
        if (diagEmocional.some(word => text.includes(word))) {
            const wsLink = this.generateWhatsAppLink("colapso del sistema parasimpático por burnout", "el Ritual Lomi Lomi Supremo");
            return {
                msg: `La profundidad de su mensaje revela una saturación de cortisol en el torrente sanguíneo. Su sistema nervioso simpático (alerta) está colapsado y no le permite descansar.<br><br><strong>Prescripción de Aura:</strong> Necesita una desconexión mental absoluta. Le sugiero el majestuoso <strong>Ritual Lomi Lomi Supremo ($1,419 MXN)</strong>. Sus maniobras continuas simulan el océano, forzando a su cerebro a entrar en ondas Theta (sueño profundo). ${wsLink}`,
                chips: ["¿Qué es Lomi Lomi?", "Masaje Holístico"]
            };
        }

        const diagRelax = ['relajar', 'relajante', 'suave', 'tranquilo', 'descansar', 'paz', 'consentirme', 'regalo', 'vela', 'calor'];
        if (diagRelax.some(word => text.includes(word))) {
            const wsLink = this.generateWhatsAppLink("sedación del sistema nervioso", "el Masaje con Velas Térmicas o el Masaje Relajante");
            return {
                msg: `Si su objetivo principal es la sedación muscular y el confort térmico sin aplicar dolor o presión extrema, tenemos protocolos de nutrición dérmica excelentes.<br><br><strong>Prescripción de Aura:</strong> El <strong>Masaje Relajante ($879 MXN)</strong> tradicional, o para una experiencia de lujo, el <strong>Masaje con Velas Térmicas ($1,199 MXN)</strong>, donde la manteca de karité tibia derretirá su tensión. ${wsLink}`,
                chips: ["Masaje Deportivo", "Ver Catálogo Completo"]
            };
        }

        // ----------------------------------------------------------------------------
        // NIVEL 4: LOGÍSTICA, PRECIOS Y OPERATIVA
        // ----------------------------------------------------------------------------
        const opLogistica = ['donde', 'ubicacion', 'direccion', 'lugar', 'sede', 'domicilio', 'hotel', 'estacionamiento'];
        if (opLogistica.some(word => text.includes(word))) {
            return {
                msg: `Para garantizar una bioseguridad clínica intransigente, operamos exclusivamente en nuestro santuario corporativo: <strong>Av. Paseo de la Reforma 195, Piso 3, Col. Cuauhtémoc, CDMX.</strong><br><br><em>Nota: Debido a nuestro rigor clínico y uso de aparatología pesada, NO brindamos servicios a domicilio ni en habitaciones de hotel.</em>`,
                chips: ["Ver Precios", "Ver Instalaciones (Video)"]
            };
        }

        const opPrecios = ['precio', 'cuanto', 'costo', 'tarifa', 'cobran', 'catalogo', 'menu', 'dinero'];
        if (opPrecios.some(word => text.includes(word))) {
            return {
                msg: `La excelencia biomecánica en Valtara es sumamente accesible y transparente. Nuestro catálogo inicia en <strong>$519 MXN</strong> (Rehabilitación Facial), pasando por masajes estructurales de <strong>$879 a $949 MXN</strong> (Deportivo/Reductivo), hasta nuestras experiencias magnas de 90 minutos por <strong>$1,419 MXN</strong> (Lomi Lomi).<br><br><button onclick="AppRouter.navigate('restoration'); document.getElementById('aura-close-btn').click();" style="color:var(--valtara-cian-fluor); text-decoration:underline; font-weight:bold;"><i class="fa-solid fa-book-open"></i> Navegar al Catálogo Clínico</button>`,
                chips: ["Hablar con Concierge", "Promociones y Cortesías"]
            };
        }

        const opPromos = ['promocion', 'descuento', 'oferta', 'cortesia', 'barato', '20%', 'beneficio', 'vip'];
        if (opPromos.some(word => text.includes(word))) {
            return {
                msg: `En Valtara no manejamos "descuentos", manejamos <strong>Privilegios de Lealtad</strong>.<br><br>1. <strong>Privilegio Matutino:</strong> 20% a su favor si asiste entre 9:00 AM y 12:00 PM.<br>2. <strong>Member Card:</strong> Su tercera visita corporativa le otorga un 50% de cortesía.<br>3. <strong>Ritual del Ocaso:</strong> Citas después de las 7:00 PM incluyen degustación de Té Orgánico de Frutos Rojos.`,
                chips: ["Agendar Cita (WhatsApp)", "Sede y Ubicación"]
            };
        }
        
        // ----------------------------------------------------------------------------
        // INTENCIONES CORTAS (Saludos, Gracias)
        // ----------------------------------------------------------------------------
        if (['hola', 'buenos', 'buenas', 'saludos', 'que tal'].some(w => text.includes(w))) {
            return { msg: `¡Saludos! Soy Aura, inteligencia de triaje biomecánico de Grupo Gevizz. Es un honor. ¿Presenta algún dolor específico, tensión o fatiga corporativa que pueda analizar hoy?`, chips: ["Me duele la espalda", "Estoy muy estresado", "Solo quiero relajarme"] };
        }
        if (['gracias', 'amable', 'perfecto', 'ok', 'vale'].some(w => text.includes(w))) {
            return { msg: `El honor es mío. Mi base de datos siempre estará a su disposición para restaurar su arquitectura. Si ya ha tomado una decisión, el Concierge le espera en la línea humana.`, chips: ["Hablar con Concierge"] };
        }

        // ----------------------------------------------------------------------------
        // DEFAULT / FALLBACK (Si no entiende)
        // ----------------------------------------------------------------------------
        const wsLinkFallback = this.generateWhatsAppLink("una solicitud especializada", "una valoración personalizada por el Concierge");
        return {
            msg: `He analizado la complejidad de su mensaje. Su anatomía y requerimiento presentan características muy específicas que mi red neuronal sugiere deben ser evaluadas por el criterio humano. Por favor, transfiera este caso a nuestro Especialista Clínico. ${wsLinkFallback}`,
            chips: ["Catálogo Clínico", "Marco Legal"]
        };
    },

    // ================================================================================
    // GENERADOR DE ENLACES INTELIGENTES PARA WHATSAPP
    // ================================================================================
    generateWhatsAppLink: function(sintoma, terapia) {
        // Obtener el nombre del usuario si existe, si no, usar 'Apreciable visitante'
        let userName = localStorage.getItem('valtara_identity') || 'visitante';
        
        const mensajePreescrito = `Hola, equipo Concierge. Soy ${userName}. El sistema de Inteligencia Artificial (Aura) ha detectado en mi cuerpo: *${sintoma}*. \n\nMe prescribió *${terapia}*. \n\nDeseo consultar su disponibilidad para agendar esta intervención clínica.`;
        
        const encodedMessage = encodeURIComponent(mensajePreescrito);
        const fullUrl = `https://wa.me/${this.wsNumber}?text=${encodedMessage}`;
        
        // Retornamos un botón HTML estilizado para inyectar en el chat
        return `<br><br><a href="${fullUrl}" target="_blank" style="display:inline-block; margin-top:1rem; padding: 0.8rem 1.5rem; background: var(--valtara-verde-ws); color: var(--valtara-negro-profundo); border-radius: 2rem; text-decoration: none; font-weight: bold; font-size: 0.95rem; box-shadow: 0 0.5rem 1.5rem rgba(0,230,118,0.4);"><i class="fa-brands fa-whatsapp" style="font-size: 1.2rem; margin-right: 0.5rem;"></i> Auto-Agendar este Diagnóstico</a>`;
    },

    // ================================================================================
    // UTILIDADES DE INTERFAZ DEL CHAT (UI)
    // ================================================================================
    appendMessage: function(htmlContent, senderType) {
        const chatWindow = document.getElementById('aura-chat');
        if (!chatWindow) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${senderType}`;
        msgDiv.innerHTML = htmlContent;
        
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll hacia abajo
    },

    showTypingIndicator: function() {
        const chatWindow = document.getElementById('aura-chat');
        if (!chatWindow) return;

        const typingDiv = document.createElement('div');
        typingDiv.id = 'aura-typing-indicator';
        typingDiv.className = 'chat-msg bot';
        typingDiv.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin" style="color: var(--valtara-oro);"></i> Decodificando biometría...`;
        
        chatWindow.appendChild(typingDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    },

    hideTypingIndicator: function() {
        const typingDiv = document.getElementById('aura-typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
        }
    },

    renderChips: function(chipsArray) {
        const container = document.getElementById('aura-chips');
        if (!container) return;

        container.innerHTML = ''; // Limpiar anteriores

        if (chipsArray.length === 0) {
            container.style.display = 'none';
            return;
        }

        chipsArray.forEach(chipText => {
            const btn = document.createElement('button');
            btn.className = 'aura-chip';
            btn.textContent = chipText;
            
            // Asignar el comportamiento al hacer clic en el chip
            btn.addEventListener('click', () => {
                const inputField = document.getElementById('aura-input');
                if(inputField) {
                    inputField.value = chipText; // Poner el texto en el input
                    this.processInput(); // Procesar como si lo hubiera escrito
                }
            });
            
            container.appendChild(btn);
        });

        container.style.display = 'flex';
    }
};

// Iniciar Aura AI cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => AuraAI.init());
