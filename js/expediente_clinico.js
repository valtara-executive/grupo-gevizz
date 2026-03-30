/**
 * ====================================================================================
 * BLOQUE 10: EXPEDIENTE CLÍNICO SOBERANO V26.5 "NIVEL INSTITUCIONAL"
 * Triaje Biomecánico (20 min), Firma con Dedo (Canvas), PDF 4 Hojas Carta, 
 * Marca de Agua de Alta Seguridad, Credenciales RENATED/SEP.
 * Propiedad Intelectual: Grupo Gevizz S.A.S. | Terapeuta: Ángel de J. Guerrero V.
 * ====================================================================================
 */

window.ExpedienteEngine = {
    currentStep: 0,
    totalSteps: 11,
    signaturePad: null,
    isDrawing: false,
    
    // Almacén de Datos Exhaustivo
    formData: {
        personal: { fullName: '', birthDate: '', age: '', gender: '', phone: '', email: '', occupation: '', activity: '', filledBy: 'Paciente' },
        motivo: { principal: '', objetivo: '', evolucion: '', recurrente: '', mejora: '' },
        zonas: [], // Array de zonas afectadas
        dolorDetalle: { sensacion: '', intensidad: 5, desde: '', empeora: '', alivia: '', constante: '' },
        accessibility: { profile: [], supports: '' },
        clinical: { precauciones: {}, medicacion: {}, alergias: {} },
        habitos: { estres: 5, suenoCalidad: '', suenoHoras: '', sentado: '', pie: '', carga: '', deporte: '' },
        extra: '',
        legal: { truthOath: false, privacyOath: false, signatureData: null },
        fechaStamp: null
    },

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
            { id: "do", label: "Dolor Agudo Importante", desc: "Dolor punzante o intenso reciente." },
            { id: "in", label: "Inflamación Visible", desc: "Hinchazón, enrojecimiento o calor en el cuerpo." },
            { id: "fi", label: "Fiebre Reciente", desc: "Temperatura elevada en las últimas 48 horas." },
            { id: "if", label: "Infección Activa", desc: "Presencia de virus o bacterias (gripa, infecciones)." },
            { id: "he", label: "Herida Abierta / Sangrado", desc: "Cortes, úlceras o sangrados no cicatrizados." },
            { id: "hm", label: "Hematomas Frecuentes", desc: "Aparición de moretones con facilidad." },
            { id: "tr", label: "Trombosis / Sospecha", desc: "Formación de coágulos. Contraindicación absoluta para masaje profundo." },
            { id: "va", label: "Várices Importantes", desc: "Venas dilatadas. Requiere técnica superficial." },
            { id: "hp", label: "Hipertensión Arterial", desc: "Presión alta o problemas de presión." },
            { id: "ci", label: "Problemas Circulatorios", desc: "Mala circulación, pesadez." },
            { id: "em", label: "Embarazo Actual", desc: "Gestación. Requiere cuidados obstétricos." },
            { id: "po", label: "Postparto Reciente", desc: "Recuperación en los últimos 6 meses." },
            { id: "cr", label: "Cirugía Reciente", desc: "Cualquier intervención en el último año." },
            { id: "fr", label: "Fractura o Esguince", desc: "Lesión ósea o ligamentaria reciente." },
            { id: "pr", label: "Prótesis / Implantes", desc: "Metales, silicón o dispositivos electrónicos." },
            { id: "hd", label: "Hernia Discal", desc: "Desplazamiento de disco intervertebral." },
            { id: "ar", label: "Artritis / Artrosis", desc: "Inflamación articular o desgaste." },
            { id: "os", label: "Osteoporosis / Osteopenia", desc: "Pérdida de masa ósea. Riesgo por presión." },
            { id: "ne", label: "Neuropatía", desc: "Alteración de sensibilidad nerviosa." },
            { id: "ve", label: "Mareos / Vértigo", desc: "Inestabilidad al cambiar de postura." }
        ]},
        medicacion: { title: "B. Medicación Actual", icon: "fa-pills", items: [
            { id: "an", label: "Analgésicos", desc: "Medicamentos para el dolor." },
            { id: "ai", label: "Antiinflamatorios", desc: "Reducen inflamación muscular." },
            { id: "ac", label: "Anticoagulantes", desc: "Aumentan riesgo de moretones." },
            { id: "ah", label: "Antihipertensivos", desc: "Control de presión arterial." },
            { id: "rm", label: "Relajantes Musculares", desc: "Disminuyen el tono muscular." },
            { id: "ad", label: "Antidepresivos / Ansiolíticos", desc: "Psicofármacos." },
            { id: "in", label: "Insulina / Metabólicos", desc: "Tratamiento diabético u hormonal." }
        ]},
        alergias: { title: "C. Alergias y Sensibilidad", icon: "fa-hand-dots", items: [
            { id: "ac", label: "Aceites Esenciales", desc: "Alergia a extractos puros." },
            { id: "cr", label: "Cremas / Químicos", desc: "Alergia a lociones corporales." },
            { id: "fr", label: "Fragancias", desc: "Sensibilidad olfativa severa." },
            { id: "la", label: "Látex", desc: "Alergia a guantes o elásticos." },
            { id: "fr2", label: "Frío", desc: "Intolerancia a la crioterapia." },
            { id: "ca", label: "Calor", desc: "Intolerancia a la termoterapia." },
            { id: "pf", label: "Presión Fuerte", desc: "Reacción dolorosa al tacto profundo." }
        ]}
    },

    accessibilityDict: [
        { id: "vi", label: "Discapacidad visual", icon: "fa-eye-slash" },
        { id: "au", label: "Discapacidad auditiva", icon: "fa-ear-deaf" },
        { id: "mo", label: "Movilidad reducida", icon: "fa-wheelchair" },
        { id: "ca", label: "Dificultad para caminar", icon: "fa-crutch" },
        { id: "ac", label: "Dificultad para acostarse", icon: "fa-bed" },
        { id: "se", label: "Dificultad para incorporarse", icon: "fa-person-arrow-up-from-line" },
        { id: "ha", label: "Dificultad para comunicarse", icon: "fa-comment-slash" },
        { id: "co", label: "Dificultad para instrucciones", icon: "fa-brain" },
        { id: "ta", label: "Sensibilidad al tacto", icon: "fa-hand-sparkles" },
        { id: "lu", label: "Sensibilidad a la luz", icon: "fa-lightbulb" },
        { id: "ru", label: "Sensibilidad al ruido", icon: "fa-volume-xmark" },
        { id: "ol", label: "Sensibilidad a olores", icon: "fa-spray-can-sparkles" },
        { id: "dp", label: "Dolor al cambiar posición", icon: "fa-arrows-rotate" },
        { id: "pa", label: "Necesita pausas", icon: "fa-pause" },
        { id: "am", label: "Requiere acompañante", icon: "fa-user-group" }
    ],

    ajustesDict: [
        { id: "ex", label: "Explicaciones claras y lentas" },
        { id: "ls", label: "Lenguaje simple" },
        { id: "ap", label: "Apoyo para leer/llenar" },
        { id: "tg", label: "Texto más grande" },
        { id: "il", label: "Menor luz" },
        { id: "mr", label: "Menor ruido" },
        { id: "mp", label: "Mayor privacidad" },
        { id: "as", label: "Apoyo en camilla" },
        { id: "cp", label: "Cambios graduales" },
        { id: "ip", label: "Menor presión" },
        { id: "em", label: "Evitar zonas" },
        { id: "pp", label: "Pausas" }
    ],

    init: function() {
        this.injectStyles();
        this.injectModal();
        this.loadData();
        this.bindEvents();
        this.renderWizard();
    },

    injectStyles: function() {
        const style = document.createElement('style');
        style.innerHTML = `
            .exp-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(5, 5, 10, 0.98); z-index: 999999; display: none; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(20px); opacity: 0; transition: opacity 0.4s ease; }
            .exp-overlay.active { display: flex; opacity: 1; }
            .exp-container { width: 95%; max-width: 850px; height: 90vh; background: rgba(255,255,255,0.02); border: 1px solid rgba(242, 201, 76, 0.3); border-radius: 20px; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.8); overflow: hidden; position: relative; }
            .exp-header { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.5); }
            .exp-body { flex: 1; overflow-y: auto; padding: 30px; scrollbar-width: thin; scrollbar-color: var(--valtara-oro) transparent; }
            .exp-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.5); display: flex; gap: 15px; }
            .exp-input-group { margin-bottom: 20px; }
            .exp-input-group label { display: block; color: var(--valtara-oro-suave); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: bold; }
            .exp-input, .exp-select, .exp-textarea { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 15px; border-radius: 10px; font-size: 1rem; transition: 0.3s; }
            .exp-input:focus, .exp-select:focus, .exp-textarea:focus { border-color: var(--valtara-oro); outline: none; background: rgba(255,255,255,0.08); }
            .exp-btn { padding: 15px 25px; border-radius: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: 0.3s; display: flex; justify-content: center; align-items: center; gap: 10px; font-size: 1rem; border: none; }
            .btn-primary { background: var(--valtara-oro); color: black; box-shadow: 0 5px 15px rgba(242,201,76,0.3); flex: 2; }
            .btn-secondary { background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); flex: 1; }
            .btn-success { background: linear-gradient(135deg, #00b09b, #00796b); color: white; flex: 2; box-shadow: 0 5px 20px rgba(0,176,155,0.4); }
            .exp-step { display: none; animation: fadeIn 0.4s ease forwards; }
            .exp-step.active { display: block; }
            .check-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 15px; cursor: pointer; transition: 0.3s; display: flex; align-items: center; gap: 15px; color: #aaa; text-align: left; }
            .check-card.checked { background: rgba(242,201,76,0.1); border-color: var(--valtara-oro); color: white; }
            .sig-canvas { width: 100%; height: 200px; background: white; border-radius: 10px; cursor: crosshair; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(style);
    },

    injectModal: function() {
        const html = `
        <div id="expediente-overlay" class="exp-overlay">
            <div class="exp-container">
                <div class="exp-header">
                    <div>
                        <h2 style="margin:0; color:var(--valtara-oro); font-family:var(--font-accent); font-size:1.8rem;"><i class="fa-solid fa-file-signature text-indigo-400"></i> Historia Clínica</h2>
                        <p style="margin:0; color:#aaa; font-size:0.8rem; letter-spacing:2px; text-transform:uppercase;">Valtara Executive Therapy</p>
                    </div>
                    <button id="exp-close" style="background:transparent; border:none; color:#888; font-size:2rem; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                </div>
                
                <div style="background: rgba(255,255,255,0.05); height: 6px; width: 100%;">
                    <div id="exp-progress" style="height: 100%; background: var(--valtara-oro); width: 0%; transition: 0.4s;"></div>
                </div>

                <div class="exp-body" id="exp-wizard-content"></div>

                <div class="exp-footer">
                    <button id="exp-btn-prev" class="exp-btn btn-secondary" style="display:none;"><i class="fa-solid fa-chevron-left"></i> Atrás</button>
                    <button id="exp-btn-next" class="exp-btn btn-primary">Continuar <i class="fa-solid fa-chevron-right"></i></button>
                    <button id="exp-btn-submit" class="exp-btn btn-success" style="display:none;"><i class="fa-solid fa-fingerprint"></i> Certificar Expediente</button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    },

    renderWizard: function() {
        const content = document.getElementById('exp-wizard-content');
        let html = '';

        // PASO 0: Protocolo Inicial
        html += this.buildStep(0, `
            <div style="text-align: center; padding: 20px 0;">
                <i class="fa-solid fa-scale-balanced" style="font-size: 4rem; color: var(--valtara-oro); margin-bottom: 20px;"></i>
                <h2 style="font-size: 2.5rem; color: white; font-family: var(--font-accent); margin-bottom: 15px; line-height:1.2;">Protocolo Clínico Institucional</h2>
                <p style="color: #aaa; font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">
                    Bienvenido. Este documento rige su seguridad física y nuestra responsabilidad técnica. 
                    <strong style="color:var(--valtara-cian-brillante);">El llenado requiere aproximadamente 20 minutos.</strong> 
                    Responda con total sinceridad.
                </p>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 15px; border-left: 5px solid var(--valtara-oro); text-align: left;">
                    <strong style="color: white;"><i class="fa-solid fa-gavel"></i> Fundamento Legal</strong>
                    <p style="color: #999; font-size: 0.9rem; margin-top: 5px;">Protección de Datos Sensibles (Ley ARCO/INAI). Estructura referenciada en la NOM-004-SSA3-2012 para Masoterapia Clínica. Datos almacenados localmente.</p>
                </div>
            </div>
        `);

        // PASO 1: Identificación
        html += this.buildStep(1, `
            <h2 style="color: var(--valtara-oro); margin-bottom: 20px; font-family: var(--font-accent);">1. Identificación del Paciente</h2>
            ${this.buildInput('text', 'Nombre Completo', 'personal', 'fullName')}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                ${this.buildInput('date', 'Fecha Nacimiento', 'personal', 'birthDate')}
                ${this.buildInput('number', 'Edad', 'personal', 'age')}
                ${this.buildInput('text', 'Sexo / Género', 'personal', 'gender')}
                ${this.buildInput('tel', 'Teléfono', 'personal', 'phone')}
            </div>
            ${this.buildInput('email', 'Correo Electrónico', 'personal', 'email')}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                ${this.buildInput('text', 'Ocupación', 'personal', 'occupation')}
                ${this.buildSelect('Actividad Física', 'personal', 'activity', ['Sedentaria', 'Ligera', 'Moderada', 'Intensa'])}
            </div>
        `);

        // PASO 2: Motivo
        html += this.buildStep(2, `
            <h2 style="color: var(--valtara-cian-brillante); margin-bottom: 20px; font-family: var(--font-accent);">2. Motivo de Atención</h2>
            ${this.buildInput('text', 'Motivo Principal', 'motivo', 'principal', 'Ej. Dolor lumbar constante')}
            ${this.buildSelect('Objetivo de la sesión', 'motivo', 'objetivo', ['Alivio de dolor', 'Relajación', 'Descarga muscular', 'Recuperación', 'Mantenimiento', 'Otro'])}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                ${this.buildInput('text', 'Tiempo de evolución', 'motivo', 'evolucion')}
                ${this.buildSelect('¿Es recurrente?', 'motivo', 'recurrente', ['Sí', 'No'])}
            </div>
            ${this.buildInput('textarea', '¿Qué desea mejorar?', 'motivo', 'mejora')}
        `);

        // PASO 3: Zonas
        let zonasHTML = this.zonasList.map(z => this.buildCheckCard(z, 'zonas', null, z, 'fa-child')).join('');
        html += this.buildStep(3, `
            <h2 style="color: var(--valtara-oro); margin-bottom: 20px; font-family: var(--font-accent);">3. Zonas de Molestia</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">${zonasHTML}</div>
        `);

        // PASO 4: Dolor
        html += this.buildStep(4, `
            <h2 style="color: #ff5555; margin-bottom: 20px; font-family: var(--font-accent);">4. Detalle del Dolor</h2>
            ${this.buildSelect('¿Qué siente?', 'dolorDetalle', 'sensacion', ['Dolor sordo', 'Presión', 'Rigidez', 'Punzada', 'Hormigueo', 'Pesadez', 'Otro'])}
            <div class="exp-input-group">
                <label>Intensidad (0-10)</label>
                <input type="range" min="0" max="10" value="${this.formData.dolorDetalle.intensidad}" oninput="document.getElementById('lvl-int').innerText=this.value; ExpedienteEngine.updateData('dolorDetalle', 'intensidad', this.value)" style="width:100%; accent-color:#ff5555;">
                <div id="lvl-int" style="text-align:center; color:#ff5555; font-size:2rem; font-weight:bold;">${this.formData.dolorDetalle.intensidad}</div>
            </div>
            ${this.buildInput('text', '¿Desde cuándo?', 'dolorDetalle', 'desde')}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                ${this.buildInput('text', '¿Qué lo empeora?', 'dolorDetalle', 'empeora')}
                ${this.buildInput('text', '¿Qué lo alivia?', 'dolorDetalle', 'alivia')}
            </div>
            ${this.buildSelect('Frecuencia', 'dolorDetalle', 'constante', ['Constante', 'Intermitente', 'Por esfuerzo'])}
        `);

        // PASO 5: Clínica (Iterar Diccionario)
        let clinicas = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            clinicas += `<h3 style="color:var(--valtara-cian-brillante); margin: 20px 0 10px 0; border-bottom:1px solid rgba(0,255,255,0.2); padding-bottom:5px;">${category.title}</h3><div style="display:flex; flex-direction:column; gap:10px;">`;
            category.items.forEach(item => {
                clinicas += this.buildCheckCard(`<strong>${item.label}</strong><br><span style="font-size:0.8rem;color:#888;">${item.desc}</span>`, 'clinical', catKey, item.id, 'fa-notes-medical');
            });
            clinicas += `</div>`;
        }
        html += this.buildStep(5, `
            <h2 style="color: var(--valtara-blanco); margin-bottom: 20px; font-family: var(--font-accent);">5. Antecedentes Relevantes</h2>
            <p style="color:#aaa; font-size:0.9rem;">Marque únicamente las condiciones diagnosticadas aplicables.</p>
            ${clinicas}
        `);

        // PASO 6: Hábitos
        html += this.buildStep(6, `
            <h2 style="color: var(--valtara-oro); margin-bottom: 20px; font-family: var(--font-accent);">6. Hábitos y Estilo de Vida</h2>
            <div class="exp-input-group">
                <label>Estrés Percibido (0-10)</label>
                <input type="range" min="0" max="10" value="${this.formData.habitos.estres}" oninput="document.getElementById('lvl-est').innerText=this.value; ExpedienteEngine.updateData('habitos', 'estres', this.value)" style="width:100%; accent-color:var(--valtara-oro);">
                <div id="lvl-est" style="text-align:center; color:var(--valtara-oro); font-size:2rem; font-weight:bold;">${this.formData.habitos.estres}</div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                ${this.buildSelect('Calidad de Sueño', 'habitos', 'suenoCalidad', ['Buena', 'Regular', 'Mala'])}
                ${this.buildInput('number', 'Horas de sueño', 'habitos', 'suenoHoras')}
                ${this.buildSelect('Trabajo Sentado', 'habitos', 'sentado', ['Sí', 'No'])}
                ${this.buildSelect('Trabajo de Pie', 'habitos', 'pie', ['Sí', 'No'])}
                ${this.buildSelect('Carga Física', 'habitos', 'carga', ['Sí', 'No'])}
                ${this.buildSelect('Deporte Intenso', 'habitos', 'deporte', ['Sí', 'No'])}
            </div>
        `);

        // PASO 7: Accesibilidad
        let accHTML = this.accessibilityDict.map(i => this.buildCheckCard(i.label, 'accessibility', 'profile', i.label, i.icon)).join('');
        let ajsHTML = this.ajustesDict.map(i => this.buildCheckCard(i.label, 'accessibility', 'supports', i.label, 'fa-check')).join('');
        html += this.buildStep(7, `
            <h2 style="color: var(--valtara-cian-brillante); margin-bottom: 20px; font-family: var(--font-accent);">7. Accesibilidad</h2>
            <h3 style="color:white; font-size:1rem; margin-bottom:10px;">Necesidades de Apoyo:</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">${accHTML}</div>
            <h3 style="color:white; font-size:1rem; margin-bottom:10px;">Ajustes Razonables Sugeridos:</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">${ajsHTML}</div>
        `);

        // PASO 8: Observaciones
        html += this.buildStep(8, `
            <h2 style="color: var(--valtara-blanco); margin-bottom: 20px; font-family: var(--font-accent);">8. Observaciones Adicionales</h2>
            ${this.buildInput('textarea', 'Información extra relevante para el terapeuta:', 'extra', null)}
        `);

        // PASO 9: Revisión
        html += this.buildStep(9, `
            <h2 style="color: var(--valtara-blanco); margin-bottom: 20px; font-family: var(--font-accent);">9. Revisión Maestra</h2>
            <p style="color:#aaa; font-size:0.95rem;">Antes de firmar, verifique que todo sea correcto. Si falta algo, use el botón Atrás.</p>
            <div style="background: rgba(255,255,255,0.03); padding: 15px; border-radius: 10px; border: 1px solid var(--valtara-oro);">
                <p style="color:white; margin:0 0 10px 0;"><strong>Paciente:</strong> ${this.formData.personal.fullName || '<span style="color:red">Falta Nombre</span>'}</p>
                <p style="color:white; margin:0 0 10px 0;"><strong>Zonas Dolor:</strong> ${this.formData.zonas.length} seleccionadas.</p>
                <p style="color:white; margin:0;"><strong>Estrés:</strong> ${this.formData.habitos.estres}/10</p>
            </div>
        `);

        // PASO 10: Legal y FIRMA (CANVAS)
        html += this.buildStep(10, `
            <h2 style="color: var(--valtara-oro); margin-bottom: 20px; font-family: var(--font-accent);">10. Consentimiento y Firma</h2>
            <div style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid var(--valtara-oro);">
                <p style="color:#ccc; font-size:0.85rem; margin-bottom:10px; text-align:justify;">Declaro que la información es verdadera. Entiendo que la atención es masoterapia clínica y no sustituye diagnóstico médico. Autorizo el tratamiento de mis datos sensibles de forma local.</p>
            </div>
            
            <label class="check-card ${this.formData.legal.truthOath ? 'checked' : ''}" style="margin-bottom:10px;">
                <input type="checkbox" onchange="ExpedienteEngine.updateData('legal', 'truthOath', this.checked); ExpedienteEngine.renderWizard();" ${this.formData.legal.truthOath ? 'checked' : ''} style="display:none;">
                <i class="fa-solid fa-scale-balanced" style="font-size:1.5rem;"></i> Acepto bajo protesta de verdad
            </label>

            <div class="exp-input-group" style="margin-top: 20px;">
                <label style="color:white;"><i class="fa-solid fa-pen"></i> Firma Autógrafa Digital (Dibuje aquí con su dedo)</label>
                <canvas id="sig-canvas" class="sig-canvas"></canvas>
                <button onclick="ExpedienteEngine.clearCanvas()" style="background:transparent; border:1px solid #666; color:#aaa; padding:5px 10px; border-radius:5px; font-size:0.8rem; margin-top:5px; cursor:pointer;">Limpiar Firma</button>
            </div>
        `);

        content.innerHTML = html;
        this.updateUI();

        // Inicializar Canvas si estamos en el último paso
        if (this.currentStep === 10) this.initCanvas();
    },

    // ====================================================================
    // HELPERS UI & CANVAS FIRMA
    // ====================================================================
    buildStep: function(index, content) {
        return `<div id="exp-step-${index}" class="exp-step ${index === this.currentStep ? 'active' : ''}">${content}</div>`;
    },

    buildInput: function(type, label, cat, key, placeholder='', extraClass='') {
        let val = cat && key ? this.formData[cat][key] : (cat ? this.formData[cat] : '');
        const onInput = `ExpedienteEngine.updateData('${cat}', '${key}', this.value)`;
        if (type === 'textarea') return `<div class="exp-input-group"><label>${label}</label><textarea rows="3" oninput="${onInput}" class="exp-textarea ${extraClass}" placeholder="${placeholder}">${val}</textarea></div>`;
        return `<div class="exp-input-group"><label>${label}</label><input type="${type}" oninput="${onInput}" value="${val}" class="exp-input ${extraClass}" placeholder="${placeholder}"></div>`;
    },

    buildSelect: function(label, cat, key, options) {
        let val = this.formData[cat][key];
        let optsHTML = options.map(o => `<option value="${o}" ${val === o ? 'selected' : ''} style="background:#111; color:white;">${o}</option>`).join('');
        return `<div class="exp-input-group"><label>${label}</label><select onchange="ExpedienteEngine.updateData('${cat}', '${key}', this.value)" class="exp-select"><option value="" disabled ${val === '' ? 'selected' : ''}>Seleccione...</option>${optsHTML}</select></div>`;
    },

    buildCheckCard: function(label, cat, arrKey, val, icon) {
        // Maneja Arrays o booleanos simples
        let isChecked = false;
        if(Array.isArray(this.formData[cat][arrKey])) {
            isChecked = this.formData[cat][arrKey].includes(val);
        } else if(arrKey) {
            isChecked = this.formData[cat][arrKey][val]; // Para clinicalDict
        } else {
            isChecked = this.formData[cat].includes(val); // Para Zonas
        }

        const func = arrKey ? (Array.isArray(this.formData[cat][arrKey]) ? `toggleArray('${cat}','${arrKey}','${val}')` : `toggleClinical('${cat}','${arrKey}','${val}')`) : `toggleArray('${cat}',null,'${val}')`;

        return `
        <div onclick="ExpedienteEngine.${func}; ExpedienteEngine.renderWizard();" class="check-card ${isChecked ? 'checked' : ''}">
            <i class="fa-solid ${icon}" style="font-size:1.5rem; ${isChecked ? 'color:var(--valtara-oro);' : ''}"></i>
            <span style="flex:1;">${label}</span>
            <i class="fa-solid ${isChecked ? 'fa-check' : 'fa-circle'}" style="${isChecked ? 'color:var(--valtara-oro);' : 'color:#444;'}"></i>
        </div>`;
    },

    updateData: function(cat, key, val) {
        if(key) this.formData[cat][key] = val;
        else this.formData[cat] = val;
        this.saveData();
    },

    toggleArray: function(cat, arrKey, val) {
        let arr = arrKey ? this.formData[cat][arrKey] : this.formData[cat];
        const idx = arr.indexOf(val);
        if(idx > -1) arr.splice(idx, 1);
        else arr.push(val);
        this.saveData();
    },

    toggleClinical: function(cat, subCat, id) {
        this.formData.clinical[cat][subCat][id] = !this.formData.clinical[cat][subCat][id];
        this.saveData();
    },

    bindEvents: function() {
        const overlay = document.getElementById('expediente-overlay');
        const btnOpen = document.getElementById('btn-open-expediente');
        const btnClose = document.getElementById('exp-close');
        const btnNext = document.getElementById('exp-btn-next');
        const btnPrev = document.getElementById('exp-btn-prev');
        const btnSubmit = document.getElementById('exp-btn-submit');

        if(btnOpen) btnOpen.addEventListener('click', () => { overlay.classList.add('active'); const menu = document.getElementById('main-nav'); if(menu) menu.classList.remove('open'); });
        if(btnClose) btnClose.addEventListener('click', () => overlay.classList.remove('active'));

        btnNext.addEventListener('click', () => {
            if(this.currentStep === 1 && (!this.formData.personal.fullName)) { alert("Por favor, ingrese amablemente su Nombre."); return; }
            if(this.currentStep < this.totalSteps - 1) { this.currentStep++; this.renderWizard(); }
        });
        
        btnPrev.addEventListener('click', () => {
            if(this.currentStep > 0) { this.currentStep--; this.renderWizard(); }
        });

        btnSubmit.addEventListener('click', () => {
            if(!this.formData.legal.truthOath) { alert("Debe aceptar el compromiso de veracidad."); return; }
            if(!this.signaturePad || this.isCanvasBlank()) { alert("Por favor, dibuje su firma en el recuadro blanco."); return; }
            
            // Guardar imagen del canvas
            this.formData.legal.signatureData = this.signaturePad.toDataURL('image/png');
            this.saveData();
            this.generatePDF();
        });
    },

    updateUI: function() {
        document.getElementById('wizard-step-text').innerText = `Fase ${this.currentStep + 1} de ${this.totalSteps}`;
        document.getElementById('wizard-percent-text').innerText = `${Math.round((this.currentStep / (this.totalSteps - 1)) * 100)}%`;
        document.getElementById('exp-progress').style.width = `${(this.currentStep / (this.totalSteps - 1)) * 100}%`;

        document.getElementById('exp-btn-prev').style.display = this.currentStep > 0 ? 'block' : 'none';
        const isLast = this.currentStep === this.totalSteps - 1;
        document.getElementById('exp-btn-next').style.display = isLast ? 'none' : 'block';
        document.getElementById('exp-btn-submit').style.display = isLast ? 'block' : 'none';
    },

    // LÓGICA DEL LIENZO DE FIRMA (CANVAS)
    initCanvas: function() {
        const canvas = document.getElementById('sig-canvas');
        if(!canvas) return;
        this.signaturePad = canvas;
        const ctx = canvas.getContext('2d');
        
        // Ajustar resolución
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#050508';

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const startPos = (e) => { e.preventDefault(); this.isDrawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
        const draw = (e) => { if(!this.isDrawing) return; e.preventDefault(); const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
        const endPos = () => { this.isDrawing = false; };

        canvas.addEventListener('mousedown', startPos);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endPos);
        canvas.addEventListener('mouseout', endPos);
        canvas.addEventListener('touchstart', startPos, {passive: false});
        canvas.addEventListener('touchmove', draw, {passive: false});
        canvas.addEventListener('touchend', endPos);
    },

    clearCanvas: function() {
        if(!this.signaturePad) return;
        const ctx = this.signaturePad.getContext('2d');
        ctx.clearRect(0, 0, this.signaturePad.width, this.signaturePad.height);
    },

    isCanvasBlank: function() {
        const blank = document.createElement('canvas');
        blank.width = this.signaturePad.width;
        blank.height = this.signaturePad.height;
        return this.signaturePad.toDataURL() === blank.toDataURL();
    },

    saveData: function() {
        localStorage.setItem('valtara_expediente', JSON.stringify(this.formData));
    },

    loadData: function() {
        const saved = localStorage.getItem('valtara_expediente');
        if(saved) this.formData = JSON.parse(saved);
    },

    // ====================================================================
    // MOTOR PDF MULTI-HOJA DE ALTA COSTURA
    // ====================================================================
    generatePDF: function() {
        const d = this.formData;
        const nombre = d.personal.fullName || 'Paciente';
        const iniciales = nombre.split(' ').map(n => n[0]).join('').substring(0,3).toUpperCase();
        
        // Folio Legal Real (Iniciales + Fecha compacta)
        const dateObj = new Date();
        const folioStr = `${dateObj.getFullYear()}${(dateObj.getMonth()+1).toString().padStart(2,'0')}${dateObj.getDate().toString().padStart(2,'0')}`;
        const folioReal = `FOLIO-${iniciales}-${folioStr}`;
        const fechaFormat = dateObj.toLocaleDateString();

        // Extraer Padecimientos
        let clinicaHTML = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let activos = [];
            category.items.forEach(item => { if(d.clinical[catKey] && d.clinical[catKey][item.id]) activos.push(item.label); });
            if(activos.length > 0) clinicaHTML += `<div style="margin-bottom:6px;"><strong>${category.title}:</strong> <span style="color:#c62828;">${activos.join(', ')}</span></div>`;
        }
        if(clinicaHTML === '') clinicaHTML = '<div style="color:#2e7d32;">Sin condiciones reportadas.</div>';

        // Estilos PDF Base (Tamaño Carta Exacto para html2pdf)
        const pCSS = `width: 8.5in; height: 10.7in; padding: 0.5in 0.6in; background: white; font-family: 'Lato', sans-serif; color: #222; font-size: 13px; position: relative; box-sizing: border-box; overflow: hidden;`;
        const h3CSS = `color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 4px; margin: 25px 0 15px 0; font-size: 15px; text-transform: uppercase; font-weight: bold;`;
        
        // MARCA DE AGUA (Texto + Logo) en todas las hojas, absoluta al centro
        const watermark = `
            <div style="position:absolute; top:40%; left:50%; transform:translate(-50%, -50%); text-align:center; opacity:0.04; z-index:0; pointer-events:none; width:100%;">
                <img src="logo.png" style="width:250px; height:auto; margin-bottom:20px; filter:grayscale(100%);">
                <h1 style="font-size:80px; font-family:'Playfair Display',serif; margin:0; letter-spacing:10px;">VALTARA</h1>
            </div>
            <div style="position:absolute; top:20px; left:20px; font-size:8px; color:#aaa; z-index:0;">DOCUMENTO CLÍNICO OFICIAL | GRUPO GEVIZZ S.A.S.</div>
            <div style="position:absolute; top:20px; right:20px; font-size:8px; color:#aaa; z-index:0;">VERSIÓN S.O.S. 26.5</div>
            <div style="position:absolute; bottom:20px; left:20px; font-size:8px; color:#aaa; z-index:0;">${folioReal}</div>
        `;

        const header = (title) => `
            <div style="border-bottom: 4px solid #050508; padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; position:relative; z-index:2;">
                <div>
                    <h1 style="font-family: 'Playfair Display', serif; color: #050508; margin: 0; font-size: 26px;">VALTARA</h1>
                    <p style="color: #666; font-size: 10px; margin: 0; letter-spacing: 2px;">EXECUTIVE THERAPY & BIOMECHANICS</p>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: bold; color: #D4AF37; font-size:12px;">${title}</p>
                    <p style="margin: 0; font-size: 10px;">${folioReal} | Fecha: ${fechaFormat}</p>
                </div>
            </div>
        `;

        const renderRow = (lbl, val) => `<div style="margin-bottom:6px; z-index:2; position:relative;"><strong>${lbl}:</strong> ${val || '---'}</div>`;

        // =========================================================================
        // CONSTRUCCIÓN DE HOJAS
        // =========================================================================
        const pdfContent = document.createElement('div');
        
        // HOJA 1: IDENTIDAD Y MOTIVO
        pdfContent.innerHTML += `
            <div style="${pCSS}">
                ${watermark}
                ${header("Historia Clínica - Pág. 1")}
                
                <h3 style="${h3CSS}">1. Identificación del Paciente</h3>
                <div style="background:#fafafa; padding:15px; border:1px solid #ddd; border-radius:5px;">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        ${renderRow('Nombre', d.personal.fullName)}
                        ${renderRow('CURP', d.personal.curp)}
                        ${renderRow('Nacimiento', d.personal.birthDate)}
                        ${renderRow('Edad', d.personal.age)}
                        ${renderRow('Teléfono', d.personal.phone)}
                        ${renderRow('Ocupación', d.personal.occupation)}
                    </div>
                </div>

                <h3 style="${h3CSS}">2. Motivo de Atención</h3>
                <div style="padding:10px;">
                    ${renderRow('Motivo', d.motivo.principal)}
                    ${renderRow('Objetivo', d.motivo.objetivo)}
                    ${renderRow('Evolución', d.motivo.evolucion)}
                </div>

                <h3 style="${h3CSS}">3. Zonas de Molestia y Dolor</h3>
                <div style="padding:10px; border-left:4px solid #c62828; background:#fff5f5;">
                    ${renderRow('Zonas Marcadas', d.zonas.join(', ') || 'Ninguna')}
                    <hr style="border:0; border-top:1px dashed #ccc; margin:10px 0;">
                    ${renderRow('Sensación', d.dolorDetalle.sensacion)}
                    ${renderRow('Intensidad (0-10)', `<strong>${d.dolorDetalle.intensidad}</strong>`)}
                    ${renderRow('Empeora con', d.dolorDetalle.empeora)}
                    ${renderRow('Alivia con', d.dolorDetalle.alivia)}
                </div>
            </div>
            <div class="html2pdf__page-break"></div>
        `;

        // HOJA 2: CLÍNICA Y ESTILO DE VIDA
        pdfContent.innerHTML += `
            <div style="${pCSS}">
                ${watermark}
                ${header("Historia Clínica - Pág. 2")}

                <h3 style="${h3CSS}">4. Antecedentes Relevantes</h3>
                <div style="padding:15px; border:1px solid #ddd; border-radius:5px; background:#fafafa;">
                    ${clinicaHTML}
                </div>

                <h3 style="${h3CSS}">5. Estilo de Vida y Hábitos</h3>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:10px;">
                    ${renderRow('Estrés Percibido (0-10)', `<strong>${d.habitos.estres}</strong>`)}
                    ${renderRow('Sueño', `${d.habitos.suenoCalidad} (${d.habitos.suenoHoras}h)`)}
                    ${renderRow('Trabajo Sentado', d.habitos.sentado)}
                    ${renderRow('Carga Física', d.habitos.carga)}
                </div>

                <h3 style="${h3CSS}">6. Accesibilidad y Observaciones</h3>
                <div style="padding:10px; border-left:4px solid #0288d1; background:#f1f9ff;">
                    ${renderRow('Apoyos', d.accessibility.profile.join(', ') || 'N/A')}
                    ${renderRow('Ajustes Razonables', d.accessibility.supports.join(', ') || 'N/A')}
                    <div style="margin-top:10px; font-style:italic;">"${d.extra || 'Sin notas adicionales'}"</div>
                </div>
            </div>
            <div class="html2pdf__page-break"></div>
        `;

        // HOJA 3: LEGAL, CANVAS Y TERAPEUTA
        pdfContent.innerHTML += `
            <div style="${pCSS}">
                ${watermark}
                ${header("Consentimiento y Firmas - Pág. 3")}

                <h3 style="${h3CSS}">7. Consentimiento Informado</h3>
                <div style="font-size:11px; text-align:justify; line-height:1.5; color:#444; padding:10px; background:#f9f9f9; border-radius:5px;">
                    <p>Declaro bajo protesta de decir verdad que la información proporcionada es veraz. Autorizo a Grupo Gevizz S.A.S. a mi atención terapéutica, entendiendo que la masoterapia clínica no sustituye un tratamiento médico. He sido informado de los riesgos si omito condiciones como trombosis, cirugías recientes o infecciones.</p>
                </div>

                <!-- BLOQUE FIRMAS -->
                <div style="margin-top: 50px; display: flex; justify-content: space-between;">
                    <div style="width: 45%; text-align: center;">
                        <img src="${d.legal.signatureData}" style="max-width:100%; height:80px; object-fit:contain; border-bottom:1px solid #000; margin-bottom:5px;">
                        <p style="margin:0; font-size:10px; font-weight:bold;">Firma Digitalizada del Paciente</p>
                        <p style="margin:0; font-size:9px;">Nombre: ${nombre}</p>
                    </div>
                    <div style="width: 45%; text-align: center;">
                        <div style="height:80px; border-bottom:1px solid #000; margin-bottom:5px; display:flex; align-items:end; justify-content:center; color:#ccc; font-size:9px; font-style:italic; padding-bottom:5px;">
                            (Firma autógrafa a la recepción del documento digital/impreso)
                        </div>
                        <p style="margin:0; font-size:10px; font-weight:bold;">Firma del Terapeuta Clínico</p>
                        <p style="margin:0; font-size:9px; color:#D4AF37; font-weight:bold;">Ángel de Jesús Guerrero Vizzuett</p>
                    </div>
                </div>

                <!-- CERTIFICACIONES DEL TERAPEUTA -->
                <div style="margin-top: 60px; background:#050508; color:white; padding:20px; border-radius:10px;">
                    <p style="margin:0 0 10px 0; color:#D4AF37; font-weight:bold; text-transform:uppercase; font-size:11px;">Credenciales y Autorizaciones de Práctica:</p>
                    <ul style="margin:0; padding-left:20px; font-size:10px; line-height:1.6; color:#ccc;">
                        <li>Terapeuta Físico para la Salud - Masoterapia Clínica.</li>
                        <li>Registro Nacional de Terapeutas <strong>(RENATED): A-54878</strong></li>
                        <li>Secretaría de Educación Pública <strong>(SEP DGCFT): RVOE 17FT061</strong></li>
                        <li>Acreditación Sistema de Salud y Educación <strong>(SISAE)</strong></li>
                    </ul>
                </div>
            </div>
        `;

        const opt = {
            margin:       0,
            filename:     `Valtara_${folioReal}.pdf`,
            image:        { type: 'jpeg', quality: 1 }, 
            pagebreak:    { mode: ['css', 'legacy'] },
            html2canvas:  { scale: 2, useCORS: true, logging: false }, 
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        const btnSubmit = document.getElementById('exp-btn-submit');
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Renderizando...';
        btnSubmit.style.pointerEvents = 'none';

        if (typeof html2pdf !== 'undefined') {
            html2pdf().set(opt).from(pdfContent).save().then(() => {
                btnSubmit.innerHTML = '<i class="fa-solid fa-check"></i> Descargado';
                
                const mensaje = `*Aura Assistant (Valtara)* 🌿%0A%0ASe ha generado una Historia Clínica Oficial.%0A%0A*Paciente:* ${nombre}%0A*Folio:* ${folioReal}%0A*Tensión:* ${d.habitos.estres}/10%0A%0A_Adjunto mi PDF firmado para revisión._`;
                I O
                setTimeout(() => {
                    document.getElementById('expediente-overlay').classList.remove('active');
                    window.open(`https://wa.me/5213348572070?text=${mensaje}`, '_blank');
                    setTimeout(() => { btnSubmit.style.pointerEvents = 'auto'; btnSubmit.innerHTML = '<i class="fa-solid fa-fingerprint"></i> Certificar Expediente'; }, 1000); 
                }, 2000);
            });
        }
    }
};

window.addEventListener('DOMContentLoaded', () => ExpedienteEngine.init());
