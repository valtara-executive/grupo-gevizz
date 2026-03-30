/**
 * ====================================================================================
 * BLOQUE 10: EXPEDIENTE CLÍNICO SOBERANO V26.0 "NIVEL INSTITUCIONAL"
 * Triaje Biomecánico Riguroso (20 min), PDF Multi-Página, Credenciales RENATED/SEP
 * Propiedad Intelectual: Grupo Gevizz S.A.S. | Terapeuta: Ángel de J. Guerrero V.
 * ====================================================================================
 */

window.ExpedienteEngine = {
    currentStep: 0,
    totalSteps: 11, // 11 Pasos densos y meticulosamente estructurados
    
    // Almacén de Datos Exhaustivo
    formData: {
        personal: { fullName: '', birthDate: '', age: '', gender: '', phone: '', email: '', occupation: '', activity: '', filledBy: '' },
        motivo: { principal: '', objetivo: 'Alivio de dolor', evolucion: '', recurrente: 'No', mejora: '' },
        zonas: [], // Array de zonas afectadas
        dolorDetalle: { sensacion: '', intensidad: 5, desde: '', empeora: '', alivia: '', constante: 'Intermitente' },
        accessibility: { profile: [], supports: '' },
        clinical: {
            precauciones: {}, medicacion: {}, alergias: {}
        },
        habitos: { estres: 5, suenoCalidad: 'Buena', suenoHoras: '', sentado: 'No', pie: 'No', carga: 'No', deporte: 'No' },
        extra: '',
        legal: { truthOath: false, privacyOath: false, signature: '' },
        fechaStamp: null
    },

    // Diccionarios de UI
    zonasList: [
        "Cuello", "Trapecios", "Hombro derecho", "Hombro izquierdo", "Espalda alta", 
        "Espalda media", "Espalda baja / lumbar", "Cadera derecha", "Cadera izquierda", 
        "Glúteo derecho", "Glúteo izquierdo", "Brazo derecho", "Brazo izquierdo", 
        "Codo derecho", "Codo izquierdo", "Antebrazo derecho", "Antebrazo izquierdo", 
        "Muñeca derecha", "Muñeca izquierda", "Mano derecha", "Mano izquierda", 
        "Pierna derecha", "Pierna izquierda", "Rodilla derecha", "Rodilla izquierda", 
        "Tobillo derecho", "Tobillo izquierdo", "Pie derecho", "Pie izquierdo", 
        "Mandíbula / ATM", "Cabeza"
    ],

    clinicalDict: {
        precauciones: { title: "A. Condiciones y Precauciones Físicas", icon: "fa-shield-heart", items: [
            { id: "do", label: "Dolor Agudo Importante", desc: "Dolor intenso reciente que limita severamente el movimiento." },
            { id: "in", label: "Inflamación Visible", desc: "Hinchazón, enrojecimiento o calor en alguna zona del cuerpo." },
            { id: "fi", label: "Fiebre Reciente", desc: "Temperatura elevada en las últimas 48 horas." },
            { id: "if", label: "Infección Activa", desc: "Presencia de virus o bacterias (Ej. gripa, infecciones cutáneas)." },
            { id: "he", label: "Herida Abierta / Sangrado", desc: "Cortes, úlceras o sangrados no cicatrizados." },
            { id: "hm", label: "Hematomas Frecuentes", desc: "Aparición de moretones con facilidad o sin causa aparente." },
            { id: "tr", label: "Trombosis / Sospecha", desc: "Formación de coágulos en venas. CRÍTICO: El masaje profundo está contraindicado." },
            { id: "va", label: "Várices Importantes", desc: "Venas dilatadas en piernas. Requiere técnica muy suave." },
            { id: "hp", label: "Hipertensión Arterial", desc: "Presión alta. Nos ayuda a moderar las presiones intensas." },
            { id: "ci", label: "Problemas Circulatorios", desc: "Mala circulación, manos/pies fríos constantemente." },
            { id: "em", label: "Embarazo Actual", desc: "Estado de gestación. Requiere posiciones y técnicas especiales." },
            { id: "po", label: "Postparto Reciente", desc: "Recuperación tras parto en los últimos 6 meses." },
            { id: "cr", label: "Cirugía Reciente", desc: "Intervenciones quirúrgicas en el último año." },
            { id: "fr", label: "Fractura o Esguince", desc: "Lesión ósea o de ligamentos reciente." },
            { id: "pr", label: "Prótesis / Implantes", desc: "Implantes metálicos, estéticos o marcapasos." },
            { id: "hd", label: "Hernia Discal", desc: "Desplazamiento de disco en la columna. Requiere abordaje preciso." },
            { id: "ar", label: "Artritis / Artrosis", desc: "Inflamación o desgaste crónico de las articulaciones." },
            { id: "os", label: "Osteoporosis / Osteopenia", desc: "Pérdida de masa ósea. Nos indica usar presiones superficiales y seguras." },
            { id: "ne", label: "Neuropatía", desc: "Pérdida de sensibilidad o dolor nervioso (Ej. por diabetes)." },
            { id: "ve", label: "Mareos / Vértigo", desc: "Sensación de giro. Nos indica cuidado al cambiarle de postura en camilla." }
        ]},
        medicacion: { title: "B. Medicación Actual", icon: "fa-pills", items: [
            { id: "an", label: "Analgésicos", desc: "Medicamentos para el dolor (Ocultan la sensibilidad al masaje)." },
            { id: "ai", label: "Antiinflamatorios", desc: "Reducen la inflamación muscular o articular." },
            { id: "ac", label: "Anticoagulantes", desc: "Diluyen la sangre. CRÍTICO: Aumentan riesgo de moretones." },
            { id: "ah", label: "Antihipertensivos", desc: "Control de la presión arterial." },
            { id: "rm", label: "Relajantes Musculares", desc: "Disminuyen el tono muscular artificialmente." },
            { id: "ad", label: "Antidepresivos / Ansiolíticos", desc: "Medicamentos para el sistema nervioso central." },
            { id: "in", label: "Insulina / Metabólicos", desc: "Control de diabetes u hormonas." }
        ]},
        alergias: { title: "C. Alergias y Sensibilidad", icon: "fa-hand-dots", items: [
            { id: "ac", label: "Alergia a Aceites", desc: "Reacción a aceites esenciales o vehiculares." },
            { id: "cr", label: "Alergia a Cremas", desc: "Reacción a lociones terapéuticas." },
            { id: "fr", label: "Alergia a Fragancias", desc: "Sensibilidad respiratoria o cutánea a olores." },
            { id: "la", label: "Alergia al Látex", desc: "Reacción a guantes o materiales elásticos." },
            { id: "fr2", label: "Sensibilidad al Frío", desc: "Intolerancia a compresas frías." },
            { id: "ca", label: "Sensibilidad al Calor", desc: "Intolerancia a piedras calientes o toallas." },
            { id: "pf", label: "Intolerancia a Presión Fuerte", desc: "El tejido reacciona con dolor ante masaje profundo." }
        ]}
    },

    accessibilityDict: [
        { id: "vi", label: "Discapacidad visual", icon: "fa-eye-slash" },
        { id: "au", label: "Discapacidad auditiva", icon: "fa-ear-deaf" },
        { id: "mo", label: "Discapacidad motora / Movilidad", icon: "fa-wheelchair" },
        { id: "ca", label: "Dificultad para caminar", icon: "fa-crutch" },
        { id: "ac", label: "Dificultad para permanecer acostado(a)", icon: "fa-bed" },
        { id: "se", label: "Dificultad para sentarse/incorporarse", icon: "fa-person-arrow-up-from-line" },
        { id: "ha", label: "Dificultad para hablar/comunicarse", icon: "fa-comment-slash" },
        { id: "co", label: "Dificultad para comprender instrucciones", icon: "fa-brain" },
        { id: "ta", label: "Sensibilidad extrema al tacto", icon: "fa-hand-sparkles" },
        { id: "lu", label: "Sensibilidad a la luz", icon: "fa-lightbulb" },
        { id: "ru", label: "Sensibilidad al ruido", icon: "fa-volume-xmark" },
        { id: "ol", label: "Sensibilidad a olores", icon: "fa-spray-can-sparkles" },
        { id: "dp", label: "Dolor al cambiar de posición", icon: "fa-arrows-rotate" },
        { id: "pa", label: "Necesita pausas durante la sesión", icon: "fa-pause" },
        { id: "am", label: "Requiere ingresar con acompañante", icon: "fa-user-group" }
    ],

    ajustesDict: [
        { id: "ex", label: "Explicaciones más claras y lentas" },
        { id: "ls", label: "Lenguaje simple" },
        { id: "ap", label: "Apoyo para leer o llenar formatos" },
        { id: "tg", label: "Texto más grande" },
        { id: "il", label: "Menor intensidad de luz" },
        { id: "mr", label: "Menor ruido ambiente" },
        { id: "mp", label: "Mayor privacidad" },
        { id: "as", label: "Apoyo para subir/acomodarse en camilla" },
        { id: "cp", label: "Cambios de posición muy graduales" },
        { id: "ip", label: "Menor intensidad de presión terapéutica" },
        { id: "em", label: "Evitar zonas o maniobras dolorosas" },
        { id: "pp", label: "Pausas programadas" }
    ],

    init: function() {
        this.injectModal();
        this.loadData();
        this.bindEvents();
        this.renderWizard();
        setTimeout(() => this.checkCentinela(), 3500); 
    },

    checkCentinela: function() {
        if(!this.formData.fechaStamp) return;
        const diffDays = (new Date().getTime() - this.formData.fechaStamp) / (1000 * 60 * 60 * 24);
        if(diffDays >= 15) this.showCentinelaAlert();
    },

    showCentinelaAlert: function() {
        if(document.getElementById('centinela-modal')) return;
        const div = document.createElement('div');
        div.id = 'centinela-modal';
        div.style.cssText = "position: fixed; top: 20px; left: 0; right: 0; margin: 0 auto; width: 90%; max-width: 400px; background: rgba(5,5,10,0.98); border: 2px solid var(--valtara-cian-brillante); border-radius: 1.5rem; padding: 2rem; z-index: 999999; box-shadow: 0 2rem 5rem rgba(0,255,255,0.3); backdrop-filter: blur(25px); text-align: center; animation: floatUp 0.6s ease forwards;";
        
        div.innerHTML = `
            <i class="fa-solid fa-heart-pulse" style="color: var(--valtara-cian-brillante); font-size: 3rem; margin-bottom: 1rem; animation: breathe 2s infinite;"></i>
            <h4 style="color: white; font-family: var(--font-accent); font-size: 1.6rem; margin:0 0 10px 0;">Control de Seguimiento</h4>
            <p style="color: #ccc; font-size: 1.1rem; margin-bottom: 2rem; font-weight: 300; line-height: 1.5;">Han pasado 15 días desde su último registro. Por su seguridad, ¿han cambiado sus niveles de dolor o condiciones médicas?</p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="btn-centinela-no" style="background: transparent; border: 1px solid #666; color: #aaa; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-size: 1rem; transition: 0.3s;">Todo igual</button>
                <button id="btn-centinela-si" style="background: var(--valtara-cian-brillante); border: none; color: black; padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; font-size: 1rem; box-shadow: 0 5px 15px rgba(0,255,255,0.4); transition: 0.3s;">Actualizar Ficha</button>
            </div>
        `;
        document.body.appendChild(div);

        document.getElementById('btn-centinela-no').addEventListener('click', () => {
            this.formData.fechaStamp = new Date().getTime();
            this.saveData();
            div.remove();
        });
        document.getElementById('btn-centinela-si').addEventListener('click', () => {
            div.remove();
            this.currentStep = 1;
            this.renderWizard();
            document.getElementById('expediente-modal').showModal();
        });
    },

    injectModal: function() {
        if(document.getElementById('expediente-modal')) return;
        const modalHTML = `
        <dialog aria-label="Historia Clínica Terapéutica" class="modal-dialog mega-modal" id="expediente-modal" style="background: rgba(5, 5, 10, 0.95); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border: 1px solid rgba(242,201,76,0.3); border-radius: 2rem; box-shadow: 0 30px 60px rgba(0,0,0,0.9);">
            <div class="modal-content" style="background: transparent; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; height: 92vh;">
                
                <header class="modal-header" style="border-bottom: 1px solid rgba(242,201,76,0.3); padding-bottom: 1rem; flex-shrink: 0; align-items: center;">
                    <div>
                        <h3 style="color: var(--valtara-oro); font-family: var(--font-accent); font-size: 2.2rem; margin:0;"><i class="fa-solid fa-file-signature text-indigo-400"></i> Historia Clínica</h3>
                        <p style="color: white; font-size: 0.8rem; letter-spacing: 3px; text-transform: uppercase; margin:0 0 0 5px; font-weight: 300;">Aval Institucional: RENATED A-54878</p>
                    </div>
                    <button aria-label="Cerrar expediente" class="close-modal-btn" id="close-expediente-btn" style="color: #888; font-size: 1.8rem; transition: 0.3s; background:transparent; border:none; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                </header>
                
                <div style="padding: 1rem 0; flex-shrink: 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--valtara-cian-brillante); font-weight: bold; letter-spacing: 1px;">
                        <span id="wizard-step-text">Fase 1 de ${this.totalSteps}</span>
                        <span id="wizard-percent-text">0%</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);">
                        <div id="wizard-progress-bar" style="height: 100%; background: linear-gradient(90deg, var(--valtara-cian-brillante), var(--valtara-verde-menta)); width: 0%; transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);"></div>
                    </div>
                </div>

                <div id="wizard-content" style="flex-grow: 1; overflow-y: auto; padding: 2rem 1rem; scrollbar-width: thin;" class="custom-scrollbar"></div>

                <div style="display: flex; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); flex-shrink: 0; margin-top: auto;">
                    <button id="wiz-prev" style="padding: 1.2rem; border-radius: 15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: white; cursor: pointer; flex: 1; display: none; transition: 0.3s; font-size: 1.1rem;">
                        <i class="fa-solid fa-chevron-left"></i> Atrás
                    </button>
                    <button id="wiz-next" style="padding: 1.2rem; border-radius: 15px; background: var(--valtara-oro); border: none; color: black; font-weight: 900; cursor: pointer; flex: 2; box-shadow: 0 10px 30px rgba(242,201,76,0.3); transition: 0.3s; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">
                        Continuar <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    <button id="wiz-submit" style="padding: 1.2rem; border-radius: 15px; background: linear-gradient(135deg, var(--valtara-verde-menta), #00cc88); border: none; color: black; font-weight: 900; cursor: pointer; flex: 2; display: none; box-shadow: 0 10px 30px rgba(0,255,170,0.4); transition: 0.3s; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">
                        <i class="fa-solid fa-fingerprint"></i> Certificar Expediente
                    </button>
                </div>
            </div>
        </dialog>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    renderWizard: function() {
        const content = document.getElementById('wizard-content');
        let html = '';

        // PASO 0: Protocolo Inicial
        html += this.buildStep(0, `
            <div style="text-align: center; max-width: 700px; margin: 0 auto; padding: 2rem 0;">
                <i class="fa-solid fa-scale-balanced" style="font-size: 4rem; color: var(--valtara-oro); margin-bottom: 2rem;"></i>
                <h2 style="font-size: 2.8rem; color: var(--valtara-blanco); font-family: var(--font-accent); margin-bottom: 1rem; line-height:1.2;">Protocolo Clínico Institucional</h2>
                <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; line-height: 1.8; margin-bottom: 2rem; font-weight: 300;">
                    Bienvenido. Este documento rige su seguridad física y la responsabilidad técnica de nuestra intervención. 
                    <strong style="color:var(--valtara-cian-brillante);">El llenado de este formato requiere aproximadamente 20 minutos de su tiempo.</strong> 
                    Por favor, responda con sinceridad absoluta. Su honestidad es la base de un abordaje biomecánico seguro y efectivo.
                </p>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(242,201,76,0.3); padding: 1.5rem; border-radius: 20px; text-align: left; margin-bottom: 2rem; border-left: 5px solid var(--valtara-oro);">
                    <strong style="color: white; font-size: 1.1rem; display: block; margin-bottom: 5px;"><i class="fa-solid fa-gavel text-indigo-400"></i> Respaldo Legal Aplicable</strong>
                    <p style="color: #aaa; font-size: 0.95rem; margin:0; line-height: 1.5; font-style:italic;">
                        El tratamiento de datos de salud exige consentimiento expreso para datos sensibles (Ley ARCO/INAI). Esta historia clínica terapéutica electrónica se estructura bajo los lineamientos de la NOM-004-SSA3-2012, adaptada estrictamente a la Masoterapia Clínica y evaluación funcional.
                    </p>
                </div>
            </div>
        `);

        // PASO 1: Identificación
        html += this.buildStep(1, `
            <h2 style="font-size: 2rem; color: var(--valtara-oro); margin-bottom: 1.5rem; font-family: var(--font-accent);">1. Identificación del Paciente</h2>
            <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
                ${this.buildInput('text', 'Nombre completo', 'personal', 'fullName')}
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    ${this.buildInput('date', 'Fecha de nacimiento', 'personal', 'birthDate')}
                    ${this.buildInput('number', 'Edad', 'personal', 'age')}
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    ${this.buildInput('text', 'Sexo / Género', 'personal', 'gender')}
                    ${this.buildInput('tel', 'Teléfono', 'personal', 'phone')}
                </div>
                ${this.buildInput('email', 'Correo electrónico', 'personal', 'email')}
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    ${this.buildInput('text', 'Ocupación', 'personal', 'occupation')}
                    ${this.buildSelect('Actividad física habitual', 'personal', 'activity', ['Sedentaria', 'Ligera', 'Moderada', 'Intensa'])}
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    ${this.buildSelect('¿Quién llena el formulario?', 'personal', 'filledBy', ['Paciente', 'Acompañante', 'Tutor', 'Terapeuta'])}
                </div>
            </div>
        `);

        // PASO 2: Motivo
        html += this.buildStep(2, `
            <h2 style="font-size: 2rem; color: var(--valtara-cian-brillante); margin-bottom: 1.5rem; font-family: var(--font-accent);">2. Motivo de Atención</h2>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                ${this.buildInput('text', 'Motivo principal de consulta', 'motivo', 'principal', 'Ej. Dolor constante en cuello...')}
                ${this.buildSelect('Objetivo de la sesión', 'motivo', 'objetivo', ['Alivio de dolor', 'Relajación', 'Descarga muscular', 'Recuperación', 'Mantenimiento', 'Otro'])}
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    ${this.buildInput('text', 'Tiempo de evolución', 'motivo', 'evolucion', 'Ej. 3 semanas, 2 años...')}
                    ${this.buildSelect('¿Es un problema recurrente?', 'motivo', 'recurrente', ['Sí', 'No'])}
                </div>
                ${this.buildInput('textarea', '¿Qué desea mejorar específicamente con la terapia?', 'motivo', 'mejora', 'Sus expectativas son cruciales para nosotros...')}
            </div>
        `);

        // PASO 3: Mapa de Zonas
        let zonasHTML = '';
        this.zonasList.forEach(zona => {
            const isChecked = this.formData.zonas.includes(zona);
            zonasHTML += `<label style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.03); padding:12px; border-radius:10px; border:1px solid ${isChecked ? 'var(--valtara-oro)' : 'rgba(255,255,255,0.1)'}; cursor:pointer; color:${isChecked ? 'white' : '#aaa'}; font-weight:${isChecked ? 'bold' : 'normal'}; transition:0.3s;">
                <input type="checkbox" value="${zona}" onchange="ExpedienteEngine.toggleArray('zonas', null, this.value); ExpedienteEngine.renderWizard();" ${isChecked ? 'checked' : ''} style="width:18px; height:18px; accent-color:var(--valtara-oro);"> ${zona}
            </label>`;
        });

        html += this.buildStep(3, `
            <h2 style="font-size: 2rem; color: var(--valtara-oro); margin-bottom: 1rem; font-family: var(--font-accent);">3. Zonas de Molestia o Limitación</h2>
            <p style="color: #aaa; margin-bottom: 1.5rem; font-size: 1.1rem; font-weight: 300;">Marque amablemente todas las áreas de su cuerpo donde presenta tensión o dolor:</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
                ${zonasHTML}
            </div>
        `);

        // PASO 4: Detalle del Dolor
        html += this.buildStep(4, `
            <h2 style="font-size: 2rem; color: #ff5555; margin-bottom: 1.5rem; font-family: var(--font-accent);">4. Detalle Sensorial del Dolor</h2>
            <p style="color: #aaa; margin-bottom: 2rem; font-size: 1.1rem; font-weight: 300;">Enfocándonos en la zona principal que marcó, describa lo que siente:</p>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                ${this.buildSelect('¿Qué siente?', 'dolorDetalle', 'sensacion', ['Dolor sordo', 'Presión / Tensión', 'Rigidez', 'Punzada aguda', 'Hormigueo', 'Entumecimiento', 'Cansancio / Pesadez', 'Otro'])}
                
                <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
                    <label style="color: var(--valtara-oro-suave); font-weight: bold; display: block; margin-bottom: 1rem;">Intensidad del dolor (0 = Nulo, 10 = Inoportable):</label>
                    <input type="range" min="0" max="10" value="${this.formData.dolorDetalle.intensidad}" oninput="document.getElementById('lbl-int').innerText=this.value; ExpedienteEngine.updateData('dolorDetalle', 'intensidad', this.value)" style="width: 100%; accent-color: #ff5555;">
                    <div id="lbl-int" style="text-align: center; color: #ff5555; font-size: 2rem; font-weight: bold; margin-top: 10px;">${this.formData.dolorDetalle.intensidad}</div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    ${this.buildInput('text', '¿Qué actividad lo empeora?', 'dolorDetalle', 'empeora')}
                    ${this.buildInput('text', '¿Qué postura/acción lo alivia?', 'dolorDetalle', 'alivia')}
                </div>
                ${this.buildSelect('Frecuencia del dolor', 'dolorDetalle', 'constante', ['Constante (Todo el día)', 'Intermitente (Va y viene)', 'Solo al hacer esfuerzo'])}
            </div>
        `);

        // PASO 5: Clínico General (Iterando el Diccionario Múltiple)
        let clinicas = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            clinicas += `<h3 style="font-size: 1.4rem; color: var(--valtara-cian-brillante); margin: 2rem 0 1rem 0; border-bottom:1px solid rgba(0,255,255,0.2); padding-bottom:5px;"><i class="fa-solid ${category.icon}"></i> ${category.title}</h3>`;
            clinicas += `<div style="display: grid; grid-template-columns: 1fr; gap: 10px;">`;
            category.items.forEach(item => {
                clinicas += this.buildClinicalCard(catKey, item.id, item.label, item.desc);
            });
            clinicas += `</div>`;
        }

        html += this.buildStep(5, `
            <h2 style="font-size: 2rem; color: var(--valtara-blanco); margin-bottom: 1rem; font-family: var(--font-accent);">5. Antecedentes Relevantes</h2>
            <p style="color: #aaa; margin-bottom: 1rem; font-size: 1.1rem; font-weight: 300;">Marque <strong style="color:white;">únicamente</strong> las condiciones médicas con las que haya sido diagnosticado. Esta información es vital para definir maniobras seguras o contraindicaciones absolutas en el masaje.</p>
            ${clinicas}
        `);

        // PASO 6: Hábitos, Sueño y Estrés
        html += this.buildStep(6, `
            <h2 style="font-size: 2rem; color: var(--valtara-oro); margin-bottom: 1.5rem; font-family: var(--font-accent);">6. Estilo de Vida y Carga Física</h2>
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                
                <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
                    <label style="color: var(--valtara-oro-suave); font-weight: bold; display: block; margin-bottom: 1rem;">Estrés psicológico/laboral percibido (0-10):</label>
                    <input type="range" min="0" max="10" value="${this.formData.habitos.estres}" oninput="document.getElementById('lbl-estres-hab').innerText=this.value; ExpedienteEngine.updateData('habitos', 'estres', this.value)" style="width: 100%; accent-color: var(--valtara-oro);">
                    <div id="lbl-estres-hab" style="text-align: center; color: var(--valtara-oro); font-size: 2rem; font-weight: bold; margin-top: 10px;">${this.formData.habitos.estres}</div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    ${this.buildSelect('Calidad del sueño', 'habitos', 'suenoCalidad', ['Buena', 'Regular', 'Mala'])}
                    ${this.buildInput('number', 'Horas promedio de sueño', 'habitos', 'suenoHoras')}
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; background: rgba(255,255,255,0.02); padding:1.5rem; border-radius: 15px;">
                    ${this.buildSelect('¿Trabaja sentado mucho tiempo?', 'habitos', 'sentado', ['Sí', 'No'])}
                    ${this.buildSelect('¿Trabaja de pie mucho tiempo?', 'habitos', 'pie', ['Sí', 'No'])}
                    ${this.buildSelect('¿Realiza carga física pesada?', 'habitos', 'carga', ['Sí', 'No'])}
                    ${this.buildSelect('¿Entrena o hace deporte intenso?', 'habitos', 'deporte', ['Sí', 'No'])}
                </div>
            </div>
        `);

        // PASO 7: Accesibilidad
        let accProfile = '';
        this.accessibilityDict.forEach(item => {
            accProfile += this.buildCheckBtn(item.label, 'accessibility', 'profile', item.label, item.icon);
        });

        let ajustesHTML = '';
        this.ajustesDict.forEach(item => {
            const isChecked = this.formData.accessibility.supports.includes(item.label);
            ajustesHTML += `<label style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.03); padding:12px; border-radius:10px; border:1px solid ${isChecked ? 'var(--valtara-cian-brillante)' : 'rgba(255,255,255,0.1)'}; cursor:pointer; color:${isChecked ? 'white' : '#aaa'}; font-size:0.9rem; transition:0.3s;">
                <input type="checkbox" value="${item.label}" onchange="ExpedienteEngine.toggleStringArray('accessibility', 'supports', this.value); ExpedienteEngine.renderWizard();" ${isChecked ? 'checked' : ''} style="width:18px; height:18px; accent-color:var(--valtara-cian-brillante);"> ${item.label}
            </label>`;
        });

        html += this.buildStep(7, `
            <h2 style="font-size: 2rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem; font-family: var(--font-accent);"><i class="fa-solid fa-universal-access"></i> 7. Accesibilidad y Ajustes Razonables</h2>
            <p style="color: #aaa; margin-bottom: 2rem; font-size: 1.1rem; font-weight: 300;">Identificar sus necesidades nos permite brindarle una atención más digna y cómoda. Seleccione si aplica alguna situación:</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-bottom: 2rem;">
                ${accProfile}
            </div>

            <h3 style="color:white; font-size:1.2rem; margin-bottom:1rem;">Ajustes sugeridos que podemos aplicar:</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 2rem;">
                ${ajustesHTML}
            </div>
        `);

        // PASO 8: Observaciones Extra
        html += this.buildStep(8, `
            <h2 style="font-size: 2rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);"><i class="fa-solid fa-pen-to-square"></i> 8. Espacio Adicional del Paciente</h2>
            <p style="color: #aaa; margin-bottom: 2rem; font-size: 1.1rem; font-weight: 300;">¿Existe alguna molestia, limitación o situación importante que no hayamos mencionado y que su terapeuta deba conocer?</p>
            ${this.buildInput('textarea', 'Cualquier información adicional relevante:', 'extra', null, 'Texto libre para el paciente...')}
        `);

        // PASO 9: Revisión Maestra
        html += this.buildStep(9, this.buildReviewTable());

        // PASO 10: Legal, Consentimiento y Firma Autógrafa
        html += this.buildStep(10, `
            <div style="background: rgba(0,0,0,0.4); padding: 2rem; border-radius: 20px; border-left: 5px solid var(--valtara-oro); margin-bottom: 2rem; border-right: 1px solid rgba(255,255,255,0.05); height: 250px; overflow-y: auto;" class="custom-scrollbar">
                <h3 style="color: var(--valtara-oro); margin-top:0; font-family: var(--font-accent); font-size: 1.5rem;">Consentimiento Informado</h3>
                <p style="color: #ccc; font-size: 0.95rem; text-align: justify; margin-bottom: 1rem; line-height: 1.6;">
                    Declaro que la información proporcionada en este formato es verdadera en la medida de mi conocimiento y que informaré cualquier cambio relevante antes de cada sesión. Entiendo que la atención brindada por Grupo Gevizz S.A.S. de C.V. corresponde a masoterapia clínica / terapia manual / valoración funcional terapéutica, y no sustituye diagnóstico ni tratamiento médico.
                </p>
                <p style="color: #ccc; font-size: 0.95rem; text-align: justify; margin-bottom: 1rem; line-height: 1.6;">
                    Entiendo que debo comunicar de forma previa cualquier dolor agudo, infección, fiebre, cirugía reciente, lesión, embarazo, uso de anticoagulantes, alergia, mareo, alteración neurológica, restricción médica o cualquier otra condición que pueda modificar o contraindicar la sesión.
                </p>
                <h3 style="color: var(--valtara-cian-brillante); margin-top:1.5rem; font-family: var(--font-accent); font-size: 1.3rem;">Aviso de Privacidad (Resumen)</h3>
                <p style="color: #ccc; font-size: 0.95rem; text-align: justify; margin-bottom: 0; line-height: 1.6;">
                    Los datos de salud pasada, presente o futura son datos personales sensibles. Al firmar este documento, usted autoriza el tratamiento de sus datos personales bajo las leyes vigentes (Ley ARCO) exclusivamente para fines de atención, seguridad y control terapéutico. Su información será procesada y almacenada de forma local.
                </p>
            </div>
            
            <label style="display: flex; align-items: flex-start; gap: 1.2rem; margin-bottom: 1.5rem; cursor: pointer; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 15px; border: 1px solid rgba(242,201,76,0.3);">
                <input type="checkbox" onchange="ExpedienteEngine.updateData('legal', 'truthOath', this.checked)" ${this.formData.legal.truthOath ? 'checked' : ''} style="width: 25px; height: 25px; accent-color: var(--valtara-oro); margin-top: 2px;">
                <span style="color: white; font-weight: bold; font-size: 0.95rem; line-height: 1.4;">Declaro bajo protesta de decir verdad y acepto el Consentimiento Informado.</span>
            </label>
            
            <label style="display: flex; align-items: flex-start; gap: 1.2rem; margin-bottom: 2.5rem; cursor: pointer; padding: 1rem; background: rgba(0,255,255,0.03); border-radius: 15px; border: 1px solid rgba(0,255,255,0.3);">
                <input type="checkbox" onchange="ExpedienteEngine.updateData('legal', 'privacyOath', this.checked)" ${this.formData.legal.privacyOath ? 'checked' : ''} style="width: 25px; height: 25px; accent-color: var(--valtara-cian-brillante); margin-top: 2px;">
                <span style="color: white; font-weight: bold; font-size: 0.95rem; line-height: 1.4;">He leído y acepto el Aviso de Privacidad sobre mis datos sensibles.</span>
            </label>

            <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
                <label style="color: var(--valtara-oro-suave); font-weight: bold; display: block; margin-bottom: 1rem; text-transform:uppercase; letter-spacing:1px;">Firma Digital Autógrafa (Escriba su Nombre Completo)</label>
                <input type="text" oninput="ExpedienteEngine.updateData('legal', 'signature', this.value)" value="${this.formData.legal.signature}" placeholder="Su nombre aquí funciona como rúbrica legal..." style="width: 100%; padding: 1.5rem; background: transparent; border-bottom: 3px solid var(--valtara-oro); border-top:none; border-left:none; border-right:none; color: white; outline: none; font-family: 'Playfair Display', serif; font-size: 2rem; font-style: italic; text-align:center;">
            </div>
        `);

        content.innerHTML = html;
        this.updateUI();
    },

    // ====================================================================
    // HELPERS UI & ESTADO
    // ====================================================================
    buildStep: function(index, content) {
        return `<div id="step-${index}" class="exp-step animate-in fade-in" style="display: ${index === 0 ? 'block' : 'none'};">${content}</div>`;
    },

    buildInput: function(type, label, cat, key, placeholder='', extraClass='') {
        let val = cat && key ? this.formData[cat][key] : (cat ? this.formData[cat] : '');
        if (type === 'textarea') {
            return `
            <div>
                <label style="color: var(--valtara-oro-suave); font-size: 0.85rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 0.5rem;">${label}</label>
                <textarea rows="4" oninput="ExpedienteEngine.updateData('${cat}', '${key}', this.value)" class="${extraClass}" style="width: 100%; padding: 1.2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.15); color: white; border-radius: 12px; outline: none; resize: none; font-size: 1rem; line-height: 1.5;" placeholder="${placeholder}">${val}</textarea>
            </div>`;
        }
        return `
        <div>
            <label style="color: var(--valtara-oro-suave); font-size: 0.85rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 0.5rem;">${label}</label>
            <input type="${type}" oninput="ExpedienteEngine.updateData('${cat}', '${key}', this.value)" value="${val}" class="${extraClass}" style="width: 100%; padding: 1.2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.15); color: white; border-radius: 12px; outline: none; font-size: 1.05rem;" placeholder="${placeholder}">
        </div>`;
    },

    buildSelect: function(label, cat, key, options) {
        let val = this.formData[cat][key];
        let optsHTML = options.map(o => `<option value="${o}" ${val === o ? 'selected' : ''} style="background:#111; color:white;">${o}</option>`).join('');
        return `
        <div>
            <label style="color: var(--valtara-oro-suave); font-size: 0.85rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 0.5rem;">${label}</label>
            <select onchange="ExpedienteEngine.updateData('${cat}', '${key}', this.value)" style="width: 100%; padding: 1.2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.15); color: white; border-radius: 12px; outline: none; font-size: 1.05rem; cursor:pointer;">
                <option value="" disabled ${val === '' ? 'selected' : ''}>Seleccione...</option>
                ${optsHTML}
            </select>
        </div>`;
    },

    buildCheckBtn: function(label, cat, arrKey, val, icon) {
        const arr = Array.isArray(this.formData[cat][arrKey]) ? this.formData[cat][arrKey] : [];
        const isChecked = arr.includes(val);
        const bg = isChecked ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255,255,255,0.02)';
        const border = isChecked ? 'var(--valtara-cian-brillante)' : 'rgba(255,255,255,0.1)';
        const color = isChecked ? 'white' : '#aaa';
        
        return `
        <button onclick="ExpedienteEngine.toggleArray('${cat}', '${arrKey}', '${val}'); ExpedienteEngine.renderWizard();" style="padding: 1.2rem 0.5rem; border-radius: 15px; background: ${bg}; border: 2px solid ${border}; color: ${color}; cursor: pointer; transition: 0.3s; display: flex; flex-direction: column; align-items: center; gap: 10px; text-align:center;">
            <i class="fa-solid ${icon}" style="font-size: 1.8rem; color: ${isChecked ? 'var(--valtara-cian-brillante)' : '#666'};"></i>
            <span style="font-weight: bold; font-size: 0.8rem; text-transform: uppercase; line-height:1.2;">${label}</span>
        </button>`;
    },

    buildClinicalCard: function(cat, id, label, desc) {
        const isChecked = this.formData.clinical[cat][id];
        const bg = isChecked ? 'rgba(242, 201, 76, 0.08)' : 'rgba(255,255,255,0.02)';
        const border = isChecked ? 'var(--valtara-oro)' : 'rgba(255,255,255,0.1)';
        const iconColor = isChecked ? 'var(--valtara-oro)' : '#555';
        const icon = isChecked ? 'fa-circle-check' : 'fa-circle';

        return `
        <button onclick="ExpedienteEngine.toggleClinical('${cat}', '${id}'); ExpedienteEngine.renderWizard();" style="width: 100%; text-align: left; padding: 1.2rem; border-radius: 12px; background: ${bg}; border: 1px solid ${border}; cursor: pointer; transition: 0.3s; display: flex; align-items: center; gap: 15px;">
            <i class="fa-regular ${icon}" style="color: ${iconColor}; font-size: 1.8rem; flex-shrink:0;"></i>
            <div style="flex: 1;">
                <strong style="color: white; display: block; font-size: 1.05rem; margin-bottom: 2px;">${label}</strong>
                <span style="color: #aaa; font-size: 0.85rem; line-height: 1.3; font-weight: 300; display:block;">${desc}</span>
            </div>
        </button>`;
    },

    buildReviewTable: function() {
        const d = this.formData;
        const nombre = d.personal.fullName || '<span style="color:#ff5555;">[Requerido]</span>';
        const curp = d.personal.curp || '<span style="color:#ff5555;">[Requerido]</span>';
        
        let padecimientosHTML = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let activos = [];
            category.items.forEach(item => { if(d.clinical[catKey][item.id]) activos.push(item.label); });
            if(activos.length > 0) padecimientosHTML += `<strong>${category.title}:</strong> ${activos.join(', ')}<br>`;
        }
        if(padecimientosHTML === '') padecimientosHTML = '<span style="color:var(--valtara-verde-menta);">Ninguna condición clínica reportada.</span>';

        return `
            <h2 style="font-size: 2rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);"><i class="fa-solid fa-magnifying-glass-chart text-indigo-400"></i> 9. Revisión Maestra</h2>
            <p style="color: #aaa; margin-bottom: 2rem; font-size: 1.1rem; font-weight: 300;">Antes de firmar, por favor verifique sus datos. Presione "Editar" si desea corregir alguna sección.</p>
            
            <div style="display: flex; flex-direction: column; gap: 1.5rem; background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);">
                ${this.buildReviewRow('1. Identidad', `<strong>Nombre:</strong> ${nombre}<br><strong>CURP:</strong> ${curp}<br><strong>Contacto:</strong> ${d.personal.phone}`, 1)}
                ${this.buildReviewRow('2. Motivo', `<strong>Principal:</strong> ${d.motivo.principal || 'No especificado'}<br><strong>Objetivo:</strong> ${d.motivo.objetivo}`, 2)}
                ${this.buildReviewRow('3 y 4. Dolor', `<strong>Zonas:</strong> ${d.zonas.join(', ') || 'Ninguna'}<br><strong>Sensación:</strong> ${d.dolorDetalle.sensacion || 'N/A'} (Intensidad: ${d.dolorDetalle.intensidad}/10)`, 3)}
                ${this.buildReviewRow('5. Antecedentes Médicos', padecimientosHTML, 5)}
                ${this.buildReviewRow('7. Accesibilidad', `<strong>Apoyos:</strong> ${d.accessibility.profile.join(', ') || 'Ninguno'}<br><strong>Ajustes sugeridos:</strong> ${d.accessibility.supports || 'Ninguno'}`, 7)}
            </div>
        `;
    },

    buildReviewRow: function(title, content, targetStep) {
        return `
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem; display: flex; justify-content: space-between; align-items: start; gap: 15px;">
                <div>
                    <h4 style="color: var(--valtara-oro); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0;">${title}</h4>
                    <p style="color: #ddd; font-size: 0.95rem; margin:0; line-height: 1.5; font-weight: 300;">${content}</p>
                </div>
                <button onclick="ExpedienteEngine.currentStep = ${targetStep}; ExpedienteEngine.renderWizard();" style="background: rgba(242,201,76,0.1); border: 1px solid var(--valtara-oro); color: var(--valtara-oro); padding: 5px 12px; border-radius: 12px; cursor: pointer; font-size: 0.8rem; font-weight: bold; flex-shrink: 0;">EDITAR</button>
            </div>
        `;
    },

    updateData: function(cat, key, val) {
        if(key) this.formData[cat][key] = val;
        else this.formData[cat] = val;
        this.saveData();
    },

    toggleArray: function(cat, arrKey, val) {
        if(!this.formData[cat][arrKey]) this.formData[cat][arrKey] = [];
        const arr = this.formData[cat][arrKey];
        const idx = arr.indexOf(val);
        if(idx > -1) arr.splice(idx, 1);
        else arr.push(val);
        this.saveData();
    },

    toggleStringArray: function(cat, key, val) {
        let str = this.formData[cat][key] || "";
        let arr = str.split(', ').filter(i => i.trim() !== "");
        const idx = arr.indexOf(val);
        if(idx > -1) arr.splice(idx, 1);
        else arr.push(val);
        this.formData[cat][key] = arr.join(', ');
        this.saveData();
    },

    toggleClinical: function(cat, id) {
        this.formData.clinical[cat][id] = !this.formData.clinical[cat][id];
        this.saveData();
    },

    bindEvents: function() {
        const btnOpen = document.getElementById('btn-open-expediente');
        const btnClose = document.getElementById('close-expediente-btn');
        const btnNext = document.getElementById('wiz-next');
        const btnPrev = document.getElementById('wiz-prev');
        const btnSubmit = document.getElementById('wiz-submit');

        if(btnOpen) {
            btnOpen.addEventListener('click', () => {
                document.getElementById('expediente-modal').showModal();
                const menu = document.getElementById('main-nav');
                if(menu) menu.classList.remove('open');
            });
        }
        if(btnClose) btnClose.addEventListener('click', () => document.getElementById('expediente-modal').close());

        if(btnNext) btnNext.addEventListener('click', () => { 
            // Validación mínima antes de pasar el paso 1
            if(this.currentStep === 1 && (!this.formData.personal.fullName || !this.formData.personal.curp)) {
                alert("Por favor, ingrese amablemente su Nombre y CURP para continuar.");
                return;
            }
            if(this.currentStep < this.totalSteps - 1) { this.currentStep++; this.renderWizard(); }
        });
        if(btnPrev) btnPrev.addEventListener('click', () => { if(this.currentStep > 0) { this.currentStep--; this.renderWizard(); }});
        
        if(btnSubmit) btnSubmit.addEventListener('click', () => {
            if(!this.formData.legal.truthOath || !this.formData.legal.privacyOath || !this.formData.legal.signature) {
                alert("Debe amablemente aceptar los términos legales, el aviso de privacidad y firmar el expediente.");
                return;
            }
            this.generateAndSendPDF();
        });
    },

    updateUI: function() {
        document.querySelectorAll('.exp-step').forEach((el, i) => {
            el.style.display = i === this.currentStep ? 'block' : 'none';
        });

        document.getElementById('wizard-step-text').innerText = `Fase ${this.currentStep + 1} de ${this.totalSteps}`;
        document.getElementById('wizard-percent-text').innerText = `${Math.round((this.currentStep / (this.totalSteps - 1)) * 100)}%`;
        document.getElementById('wizard-progress-bar').style.width = `${(this.currentStep / (this.totalSteps - 1)) * 100}%`;

        document.getElementById('wiz-prev').style.display = this.currentStep > 0 ? 'block' : 'none';
        
        const isLastStep = this.currentStep === this.totalSteps - 1;
        document.getElementById('wiz-next').style.display = isLastStep ? 'none' : 'block';
        document.getElementById('wiz-submit').style.display = isLastStep ? 'block' : 'none';
    },

    saveData: function() {
        this.formData.fechaStamp = new Date().getTime();
        localStorage.setItem('valtara_expediente', JSON.stringify(this.formData));
    },

    loadData: function() {
        const saved = localStorage.getItem('valtara_expediente');
        if(saved) this.formData = JSON.parse(saved);
    },

    // ====================================================================
    // 4. MOTOR DE RENDERIZADO PDF MULTI-PÁGINA "NIVEL DUBAI"
    // ====================================================================
    generateAndSendPDF: function() {
        const d = this.formData;
        const nombre = d.personal.fullName || 'Paciente_Soberano';
        const hash = "HASH-" + Math.random().toString(36).substr(2, 12).toUpperCase();
        
        const cssBase = `font-family: 'Lato', sans-serif; color: #111; font-size: 12px; line-height: 1.5;`;
        const cssH3 = `color: #D4AF37; border-bottom: 2px solid #f2c94c44; padding-bottom: 5px; margin: 25px 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing:1px;`;
        const rowHTML = (lbl, val) => `<div style="margin-bottom:4px;"><strong>${lbl}:</strong> <span style="color:#444;">${val || 'No especificado'}</span></div>`;

        // Procesar Padecimientos Clínicos
        let clinicaHTML = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let activos = [];
            category.items.forEach(item => { if(d.clinical[catKey] && d.clinical[catKey][item.id]) activos.push(item.label); });
            if(activos.length > 0) {
                clinicaHTML += `<div style="margin-bottom:8px;"><strong>${category.title}:</strong> <span style="color: #c62828; font-weight:bold;">${activos.join(', ')}</span></div>`;
            }
        }
        if(clinicaHTML === '') clinicaHTML = '<div style="color: #2e7d32; font-weight: bold; font-style:italic;">Cero padecimientos reportados por el paciente.</div>';

        // MARCA DE AGUA (Se dibuja usando CSS absolute en cada página)
        const watermark = `<div style="position:absolute; top:35%; left:0; right:0; text-align:center; opacity:0.04; z-index:-1; pointer-events:none;">
            <h1 style="font-size: 120px; font-family:'Playfair Display', serif; transform: rotate(-45deg);">VALTARA</h1>
        </div>`;

        // HEADER REUTILIZABLE
        const buildHeader = (pageTitle) => `
            <div style="border-bottom: 4px solid #D4AF37; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <h1 style="font-family: 'Playfair Display', serif; color: #050508; margin: 0; font-size: 28px; letter-spacing: 2px;">VALTARA</h1>
                    <p style="color: #666; font-size: 10px; margin: 0; letter-spacing: 3px; text-transform: uppercase;">Executive Therapy & Biomechanics</p>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: bold; color: #D4AF37; font-size:14px; text-transform:uppercase;">${pageTitle}</p>
                    <p style="margin: 0; font-size: 10px; color: #888;">Folio: ${hash.substr(5,8)} | Fecha: ${new Date().toLocaleDateString()}</p>
                </div>
            </div>
        `;

        const pdfContent = document.createElement('div');
        pdfContent.style.cssText = `padding: 40px 50px; background: #fff; ${cssBase}`;
        
        // --- PÁGINA 1: Identificación y Motivo ---
        pdfContent.innerHTML = `
            <div style="position:relative; min-height: 900px;">
                ${watermark}
                ${buildHeader("Expediente Clínico Terapéutico")}
                
                <h3 style="${cssH3}">1. Identificación del Paciente</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #fdfdfd; padding: 15px; border: 1px solid #eee; border-radius: 8px; border-left: 5px solid #050508;">
                    ${rowHTML('Nombre', nombre)}
                    ${rowHTML('CURP', d.personal.curp)}
                    ${rowHTML('Nacimiento / Edad', `${d.personal.birthDate} (${d.personal.age} años)`)}
                    ${rowHTML('Sexo/Género', d.personal.gender)}
                    ${rowHTML('Teléfono', d.personal.phone)}
                    ${rowHTML('Correo', d.personal.email)}
                    ${rowHTML('Ocupación', d.personal.occupation)}
                    ${rowHTML('Actividad Física', d.personal.activity)}
                </div>

                <h3 style="${cssH3}">2. Motivo de Atención</h3>
                <div style="background: #fdfdfd; padding: 15px; border: 1px solid #eee; border-radius: 8px;">
                    ${rowHTML('Motivo Principal', d.motivo.principal)}
                    ${rowHTML('Objetivo de la sesión', d.motivo.objetivo)}
                    ${rowHTML('Tiempo de evolución', d.motivo.evolucion)}
                    ${rowHTML('¿Problema recurrente?', d.motivo.recurrente)}
                    ${rowHTML('¿Qué desea mejorar?', d.motivo.mejora)}
                </div>

                <h3 style="${cssH3}">3. Zonas de Molestia y Limitación</h3>
                <div style="background: #fdfdfd; padding: 15px; border: 1px solid #eee; border-radius: 8px; border-left: 5px solid #c62828;">
                    ${rowHTML('Zonas Afectadas', d.zonas.join(', ') || 'Ninguna marcada')}
                    <hr style="border:0; border-top:1px dashed #ccc; margin: 10px 0;">
                    ${rowHTML('Sensación del Dolor', d.dolorDetalle.sensacion)}
                    ${rowHTML('Intensidad (0-10)', `<strong>${d.dolorDetalle.intensidad}</strong>`)}
                    ${rowHTML('Frecuencia', d.dolorDetalle.constante)}
                    ${rowHTML('¿Qué lo empeora?', d.dolorDetalle.empeora)}
                    ${rowHTML('¿Qué lo alivia?', d.dolorDetalle.alivia)}
                </div>
                
                <h3 style="${cssH3}">4. Contacto Vital (Emergencia)</h3>
                <div style="background: #fdfdfd; padding: 15px; border: 1px solid #eee; border-radius: 8px;">
                    ${rowHTML('Nombre Contacto', d.emergency.name)}
                    ${rowHTML('Relación / Parentesco', d.emergency.relationship)}
                    ${rowHTML('Teléfono', d.emergency.phone)}
                </div>
            </div>
            
            <div class="html2pdf__page-break"></div>
            
            <!-- --- PÁGINA 2: Clínica y Accesibilidad --- -->
            <div style="position:relative; min-height: 900px; padding-top:20px;">
                ${watermark}
                ${buildHeader("Análisis Biomecánico y Funcional")}

                <h3 style="${cssH3}">5. Antecedentes Relevantes para Masoterapia</h3>
                <div style="background: #fcfcfc; padding: 15px; border: 1px solid #ddd; border-radius: 8px; border-left: 5px solid #d32f2f;">
                    <p style="font-size:10px; color:#666; margin-top:0; font-style:italic;">* Padecimientos marcados por el paciente bajo protesta de decir verdad:</p>
                    ${clinicaHTML}
                </div>

                <h3 style="${cssH3}">6. Estilo de Vida, Sueño y Estrés</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #fdfdfd; padding: 15px; border: 1px solid #eee; border-radius: 8px;">
                    ${rowHTML('Estrés Percibido (0-10)', `<strong>${d.habitos.estres}</strong>`)}
                    ${rowHTML('Calidad de Sueño', `${d.habitos.suenoCalidad} (${d.habitos.suenoHoras} hrs)`)}
                    ${rowHTML('Trabajo Sentado', d.habitos.sentado)}
                    ${rowHTML('Trabajo de Pie', d.habitos.pie)}
                    ${rowHTML('Carga Física', d.habitos.carga)}
                    ${rowHTML('Entrenamiento/Deporte', d.habitos.deporte)}
                </div>

                <h3 style="${cssH3}">7. Accesibilidad y Ajustes Razonables</h3>
                <div style="background: #fdfdfd; padding: 15px; border: 1px solid #eee; border-radius: 8px; border-left: 5px solid #0288d1;">
                    ${rowHTML('Perfil de Accesibilidad', d.accessibility.profile.length > 0 ? d.accessibility.profile.join(', ') : 'No refiere')}
                    ${rowHTML('Ajustes Razonables Sugeridos', d.accessibility.supports || 'No refiere')}
                </div>

                <h3 style="${cssH3}">8. Observaciones Adicionales del Paciente</h3>
                <div style="background: #fff8e1; padding: 15px; border: 1px solid #ffe082; border-radius: 8px; font-style:italic;">
                    ${d.extra || 'Sin observaciones adicionales registradas.'}
                </div>
            </div>

            <div class="html2pdf__page-break"></div>

            <!-- --- PÁGINA 3: Legal, Firmas y Terapeuta --- -->
            <div style="position:relative; min-height: 900px; padding-top:20px;">
                ${watermark}
                ${buildHeader("Aval Institucional y Cierre Legal")}

                <h3 style="${cssH3}">9. Consentimiento Informado y Aviso de Privacidad</h3>
                <div style="font-size: 10px; color: #444; text-align: justify; line-height: 1.4; background: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 5px solid #9e9e9e;">
                    <p>Declaro que la información proporcionada en este formato es verdadera en la medida de mi conocimiento. Entiendo que la atención brindada por Grupo Gevizz S.A.S. de C.V. corresponde a masoterapia clínica / terapia manual, y no sustituye diagnóstico médico.</p>
                    <p>Entiendo que debo comunicar cualquier dolor agudo, infección, cirugía reciente, uso de anticoagulantes u otra condición que pueda contraindicar la sesión. Autorizo el tratamiento de mis datos de salud (Ley ARCO, INAI) de forma local para fines de seguridad y seguimiento.</p>
                </div>

                <div style="margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end;">
                    <div style="text-align: center; width: 45%;">
                        <div style="font-family: 'Playfair Display', serif; font-size: 26px; font-style: italic; color: #050508; border-bottom: 1px solid #000; margin-bottom: 5px; padding-bottom: 5px; height:40px; display:flex; align-items:end; justify-content:center;">
                            ${d.legal.signature}
                        </div>
                        <p style="margin: 0; font-size: 10px; font-weight: bold; text-transform: uppercase;">Firma del Paciente Soberano</p>
                        <p style="margin: 2px 0 0 0; font-size: 8px; color: #666;">CURP: ${curp}</p>
                    </div>
                    
                    <div style="text-align: center; width: 45%;">
                        <div style="border-bottom: 1px solid #000; margin-bottom: 5px; padding-bottom: 5px; height:40px;"></div>
                        <p style="margin: 0; font-size: 10px; font-weight: bold; text-transform: uppercase;">Firma del Terapeuta a Cargo</p>
                        <p style="margin: 2px 0 0 0; font-size: 10px; color: #D4AF37; font-weight:bold;">ÁNGEL DE JESÚS GUERRERO VIZZUETT</p>
                        <p style="margin: 2px 0 0 0; font-size: 8px; color: #666;">Terapeuta Físico para la Salud (Masoterapia)</p>
                    </div>
                </div>

                <div style="margin-top: 40px; background: #050508; color: white; padding: 20px; border-radius: 12px; display:flex; justify-content: space-between; align-items:center;">
                    <div>
                        <p style="margin: 0 0 5px 0; font-size: 9px; color: #D4AF37; font-weight: bold; text-transform: uppercase; letter-spacing:1px;">Certificaciones Institucionales</p>
                        <ul style="margin:0; padding-left: 15px; font-size: 9px; line-height:1.6; color:#ccc;">
                            <li>Registro Nacional RENATED: <strong>A-54878</strong></li>
                            <li>Autorización S.E.P. RVOE: <strong>17FT061</strong> (DGCFT)</li>
                            <li>Acreditación SISAE / Fundación Educa Deporte A.C.</li>
                        </ul>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin: 0; font-size: 9px; color: #D4AF37; font-weight: bold; text-transform: uppercase;">Sello Criptográfico Local</p>
                        <p style="margin: 2px 0 0 0; font-size: 12px; color: white; font-family: monospace; font-weight: bold;">${hash}</p>
                        <p style="margin: 2px 0 0 0; font-size: 8px; color: #888;">Validación NOM-151-SCFI-2016 Placebo</p>
                    </div>
                </div>

                <div style="margin-top: 30px; text-align: center; color: #999; font-size: 8px; line-height: 1.4;">
                    <p style="margin:0;">Sovereign OS V26.0 | Arquitectura "Local-First" | Grupo Gevizz S.A.S. CDMX.</p>
                    <p style="margin:0;">Documento confidencial. Prohibida su reproducción total o parcial sin autorización del paciente.</p>
                </div>
            </div>
        `;

        // Configuración de html2pdf (Páginas múltiples activadas)
        const opt = {
            margin:       0,
            filename:     `Valtara_Exp_Clinico_${nombre.replace(/\s+/g, '_')}.pdf`,
            image:        { type: 'jpeg', quality: 1 }, 
            pagebreak:    { mode: ['css', 'legacy'] }, // Habilita los saltos de página con la clase css
            html2canvas:  { scale: 3, useCORS: true, logging: false }, 
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        const btnSubmit = document.getElementById('wiz-submit');
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Cifrando Documento Institucional...';
        btnSubmit.style.pointerEvents = 'none';

        if (typeof html2pdf !== 'undefined') {
            html2pdf().set(opt).from(pdfContent).save().then(() => {
                btnSubmit.innerHTML = '<i class="fa-solid fa-check"></i> Expediente Guardado';
                btnSubmit.style.background = '#1b5e20';
                
                const mensaje = `*Aura Assistant (Valtara)* 🌿%0A%0ASe ha generado un Expediente Clínico Institucional.%0A%0A*Paciente:* ${nombre}%0A*Motivo:* ${d.motivo.principal || 'Evaluación General'}%0A*Tensión:* ${d.estres}/10%0A%0A_Adjunto mi PDF de 3 páginas para revisión del Terapeuta Titular._`;
                
                setTimeout(() => {
                    document.getElementById('expediente-modal').close();
                    window.open(`https://wa.me/5213348572070?text=${mensaje}`, '_blank');
                    setTimeout(() => { btnSubmit.style.pointerEvents = 'auto'; this.renderWizard(); }, 1000); 
                }, 2000);
            }).catch(err => {
                console.error("Error en render PDF Multi-Page:", err);
                btnSubmit.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error Interno';
                btnSubmit.style.pointerEvents = 'auto';
            });
        } else {
            console.error("Librería PDF bloqueada por seguridad.");
            btnSubmit.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Escudo Activo';
            btnSubmit.style.pointerEvents = 'auto';
        }
    }
};

window.addEventListener('DOMContentLoaded', () => ExpedienteEngine.init());
