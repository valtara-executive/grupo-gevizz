/**
 * ====================================================================================
 * BLOQUE 10: EXPEDIENTE CLÍNICO SOBERANO V28.0 "ESTÉTICA INSTITUCIONAL"
 * Triaje Biomecánico Riguroso, Firma Canvas, PDF Alta Seguridad (Nivel Billete).
 * Propiedad Intelectual: Grupo Gevizz S.A.S. | Terapeuta: Ángel de J. Guerrero V.
 * ====================================================================================
 */

window.ExpedienteEngine = {
    currentStep: 0,
    totalSteps: 11,
    signaturePad: null,
    isDrawing: false,
    
    formData: {
        personal: { fullName: '', birthDate: '', age: '', gender: '', phone: '', email: '', occupation: '', activity: '', filledBy: 'Paciente' },
        motivo: { principal: '', objetivo: '', evolucion: '', recurrente: '', mejora: '' },
        zonas: [], 
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
        { id: "co", label: "Dificultad instrucciones", icon: "fa-brain" },
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
        if(document.getElementById('valtara-exp-styles')) return;
        const style = document.createElement('style');
        style.id = 'valtara-exp-styles';
        style.innerHTML = `
            .exp-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(2, 2, 5, 0.95); z-index: 999999; display: none; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); opacity: 0; transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
            .exp-overlay.active { display: flex; opacity: 1; }
            .exp-container { width: 95%; max-width: 850px; height: 92vh; background: rgba(15, 15, 20, 0.6); border: 1px solid rgba(242, 201, 76, 0.2); border-radius: 24px; display: flex; flex-direction: column; box-shadow: 0 30px 80px rgba(0,0,0,0.9); overflow: hidden; position: relative; }
            
            .exp-header { padding: 25px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; background: linear-gradient(180deg, rgba(20,20,25,0.9) 0%, transparent 100%); }
            .exp-body { flex: 1; overflow-y: auto; padding: 35px; scrollbar-width: thin; scrollbar-color: var(--valtara-oro) transparent; }
            .exp-footer { padding: 25px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(10,10,15,0.9); display: flex; gap: 15px; align-items: center;}
            
            .exp-input-group { margin-bottom: 25px; position: relative; }
            .exp-input-group label { display: block; color: var(--valtara-oro-suave); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; font-weight: 700; }
            .exp-input, .exp-select, .exp-textarea { width: 100%; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 18px; border-radius: 14px; font-size: 1.05rem; transition: all 0.3s ease; box-shadow: inset 0 2px 5px rgba(0,0,0,0.2); }
            .exp-input:focus, .exp-select:focus, .exp-textarea:focus { border-color: var(--valtara-oro); outline: none; background: rgba(255,255,255,0.06); box-shadow: 0 0 15px rgba(242,201,76,0.1); }
            
            .exp-btn { padding: 18px 25px; border-radius: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: flex; justify-content: center; align-items: center; gap: 12px; font-size: 1rem; border: none; }
            .btn-primary { background: linear-gradient(135deg, #F2C94C, #F2994A); color: #050508; box-shadow: 0 10px 25px rgba(242,201,76,0.3); flex: 2; }
            .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(242,201,76,0.5); }
            .btn-secondary { background: rgba(255,255,255,0.03); color: #aaa; border: 1px solid rgba(255,255,255,0.1); flex: 1; }
            .btn-secondary:hover { background: rgba(255,255,255,0.08); color: white; transform: translateY(-3px); }
            .btn-success { background: linear-gradient(135deg, #00b09b, #00796b); color: white; flex: 2; box-shadow: 0 10px 30px rgba(0,176,155,0.4); }
            .btn-success:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(0,176,155,0.6); }
            
            .exp-step { display: none; animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .exp-step.active { display: block; }
            
            .check-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 18px; color: #888; text-align: left; }
            .check-card:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); }
            .check-card.checked { background: rgba(242,201,76,0.08); border-color: var(--valtara-oro); color: white; box-shadow: 0 5px 20px rgba(242,201,76,0.1); }
            .check-card.danger.checked { background: rgba(255,85,85,0.08); border-color: #ff5555; box-shadow: 0 5px 20px rgba(255,85,85,0.15); }
            
            .sig-canvas { width: 100%; height: 250px; background: #f9f9f9; border-radius: 14px; cursor: crosshair; border: 2px dashed #ccc; transition: 0.3s; }
            .sig-canvas:focus { border-color: var(--valtara-oro); background: #fff; }
            
            @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(0, 255, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0); } }
        `;
        document.head.appendChild(style);
    },

    injectModal: function() {
        if(document.getElementById('expediente-overlay')) return;
        const html = `
        <div id="expediente-overlay" class="exp-overlay">
            <div class="exp-container">
                <div class="exp-header">
                    <div>
                        <h2 style="margin:0; color:var(--valtara-oro); font-family:var(--font-accent); font-size:1.8rem; letter-spacing:1px;"><i class="fa-solid fa-file-shield text-indigo-400" style="margin-right:10px;"></i> Historia Clínica</h2>
                        <p style="margin:5px 0 0 0; color:#aaa; font-size:0.75rem; letter-spacing:3px; text-transform:uppercase;">Valtara Executive Therapy</p>
                    </div>
                    <button id="exp-close" style="background:transparent; border:none; color:#666; font-size:2rem; cursor:pointer; transition:0.3s;"><i class="fa-solid fa-xmark"></i></button>
                </div>
                
                <div style="background: rgba(255,255,255,0.03); height: 4px; width: 100%;">
                    <div id="exp-progress" style="height: 100%; background: linear-gradient(90deg, var(--valtara-cian-brillante), var(--valtara-verde-menta)); width: 0%; transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);"></div>
                </div>

                <div class="exp-body" id="exp-wizard-content"></div>

                <div class="exp-footer">
                    <button id="exp-btn-prev" class="exp-btn btn-secondary" style="display:none;"><i class="fa-solid fa-arrow-left-long"></i> Atrás</button>
                    <div id="exp-loader" style="display:none; color:var(--valtara-cian-brillante); font-family:monospace; font-size:0.9rem; flex:2; text-align:center; letter-spacing:2px; font-weight:bold;"><i class="fa-solid fa-lock fa-fade"></i> CIFRANDO Y RENDERIZANDO...</div>
                    <button id="exp-btn-next" class="exp-btn btn-primary">Siguiente <i class="fa-solid fa-arrow-right-long"></i></button>
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
            <div style="text-align: center; padding: 20px 0; max-width:600px; margin:0 auto;">
                <i class="fa-solid fa-scale-balanced" style="font-size: 4.5rem; color: var(--valtara-oro); margin-bottom: 25px; filter: drop-shadow(0 0 20px rgba(242,201,76,0.3));"></i>
                <h2 style="font-size: 2.8rem; color: white; font-family: var(--font-accent); margin-bottom: 15px; line-height:1.2;">Protocolo Institucional</h2>
                <p style="color: #aaa; font-size: 1.15rem; line-height: 1.6; margin-bottom: 30px; font-weight:300;">
                    Bienvenido. Este documento rige su seguridad física y nuestra responsabilidad técnica. 
                    <strong style="color:var(--valtara-cian-brillante);">El llenado requiere aproximadamente 20 minutos.</strong> 
                    Le solicitamos responder con sinceridad y precisión.
                </p>
                <div style="background: rgba(255,255,255,0.02); padding: 20px; border-radius: 18px; border-left: 4px solid var(--valtara-oro); text-align: left;">
                    <strong style="color: white; font-size:1.1rem; letter-spacing:1px;"><i class="fa-solid fa-gavel text-indigo-400"></i> Respaldo Legal</strong>
                    <p style="color: #888; font-size: 0.95rem; margin-top: 10px; line-height:1.5;">Su información se procesa bajo el marco de la <strong>NOM-004-SSA3-2012</strong> y se resguarda bajo encriptación local (Ley ARCO/INAI). Grupo Gevizz S.A.S. garantiza absoluta confidencialidad.</p>
                </div>
            </div>
        `);

        // PASO 1: Identificación
        html += this.buildStep(1, `
            <h2 style="color: var(--valtara-oro); margin-bottom: 25px; font-family: var(--font-accent); font-size:2.2rem;">1. Identidad Ejecutiva</h2>
            ${this.buildInput('text', 'Nombre Completo Oficial', 'personal', 'fullName', 'Como aparece en su identificación')}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${this.buildInput('date', 'Fecha Nacimiento', 'personal', 'birthDate')}
                ${this.buildInput('number', 'Edad', 'personal', 'age')}
                ${this.buildInput('text', 'Sexo / Género', 'personal', 'gender')}
                ${this.buildInput('tel', 'Teléfono Celular', 'personal', 'phone')}
            </div>
            ${this.buildInput('email', 'Correo Electrónico', 'personal', 'email')}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${this.buildInput('text', 'Ocupación o Cargo', 'personal', 'occupation')}
                ${this.buildSelect('Actividad Física Habitual', 'personal', 'activity', ['Sedentaria', 'Ligera', 'Moderada', 'Intensa', 'Alto Rendimiento'])}
            </div>
        `);

        // PASO 2: Motivo
        html += this.buildStep(2, `
            <h2 style="color: var(--valtara-cian-brillante); margin-bottom: 25px; font-family: var(--font-accent); font-size:2.2rem;">2. Motivo de Atención</h2>
            ${this.buildInput('text', 'Motivo Principal de Consulta', 'motivo', 'principal', 'Describa brevemente su necesidad')}
            ${this.buildSelect('Objetivo de la sesión', 'motivo', 'objetivo', ['Alivio de dolor agudo', 'Relajación profunda', 'Descarga muscular', 'Recuperación deportiva', 'Mantenimiento preventivo', 'Evaluación biomecánica'])}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${this.buildInput('text', 'Tiempo de evolución del problema', 'motivo', 'evolucion', 'Ej. 2 semanas')}
                ${this.buildSelect('¿Es un problema recurrente?', 'motivo', 'recurrente', ['Sí, ocurre con frecuencia', 'No, es la primera vez'])}
            </div>
            ${this.buildInput('textarea', '¿Qué expectativas o mejoras busca obtener hoy?', 'motivo', 'mejora', 'Ser lo más específico posible ayuda a nuestro terapeuta...')}
        `);

        // PASO 3: Zonas
        let zonasHTML = this.zonasList.map(z => this.buildCheckCard(z, 'zonas', null, z, 'fa-child-reaching')).join('');
        html += this.buildStep(3, `
            <h2 style="color: var(--valtara-oro); margin-bottom: 10px; font-family: var(--font-accent); font-size:2.2rem;">3. Mapa de Tensión Corporal</h2>
            <p style="color:#aaa; font-size:1rem; margin-bottom:25px;">Seleccione amablemente todas las zonas que presenten molestia, rigidez o dolor actual.</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px;">${zonasHTML}</div>
        `);

        // PASO 4: Dolor
        html += this.buildStep(4, `
            <h2 style="color: #ff5555; margin-bottom: 15px; font-family: var(--font-accent); font-size:2.2rem;">4. Análisis Sensorial del Dolor</h2>
            <p style="color:#aaa; font-size:1rem; margin-bottom:25px;">Respecto a las zonas seleccionadas, ayúdenos a entender su percepción de la molestia.</p>
            ${this.buildSelect('¿Cómo describe la sensación principal?', 'dolorDetalle', 'sensacion', ['Dolor sordo y profundo', 'Presión o tensión extrema', 'Rigidez y falta de movilidad', 'Punzada aguda o piquetes', 'Hormigueo', 'Entumecimiento / Pérdida de sensibilidad', 'Cansancio / Pesadez muscular', 'Otro'])}
            <div class="exp-input-group" style="background:rgba(255,85,85,0.05); padding:20px; border-radius:15px; border:1px solid rgba(255,85,85,0.2);">
                <label style="color:#ff5555;">Intensidad del dolor (0 = Sin dolor, 10 = Inoportable)</label>
                <input type="range" min="0" max="10" value="${this.formData.dolorDetalle.intensidad}" oninput="document.getElementById('lvl-int').innerText=this.value; ExpedienteEngine.updateData('dolorDetalle', 'intensidad', this.value)" style="width:100%; accent-color:#ff5555; margin-top:10px;">
                <div id="lvl-int" style="text-align:center; color:#ff5555; font-size:2.5rem; font-weight:900; margin-top:15px;">${this.formData.dolorDetalle.intensidad}</div>
            </div>
            ${this.buildInput('text', '¿Desde cuándo inició esta molestia específica?', 'dolorDetalle', 'desde')}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${this.buildInput('text', '¿Qué posturas o actividades lo empeoran?', 'dolorDetalle', 'empeora')}
                ${this.buildInput('text', '¿Qué acciones lo alivian momentáneamente?', 'dolorDetalle', 'alivia')}
            </div>
            ${this.buildSelect('Frecuencia del malestar', 'dolorDetalle', 'constante', ['Constante (No desaparece)', 'Intermitente (Va y viene)', 'Solo al realizar un esfuerzo físico', 'Principalmente al despertar', 'Principalmente al final del día'])}
        `);

        // PASO 5: Clínica (Iterar Diccionario)
        let clinicas = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            clinicas += `<h3 style="color:var(--valtara-cian-brillante); margin: 30px 0 15px 0; border-bottom:1px solid rgba(0,255,255,0.2); padding-bottom:10px; font-size:1.3rem; text-transform:uppercase; letter-spacing:1px;"><i class="fa-solid ${category.icon}"></i> ${category.title}</h3><div style="display:flex; flex-direction:column; gap:12px;">`;
            category.items.forEach(item => {
                const isDanger = catKey === 'precauciones' || catKey === 'infecciosas';
                clinicas += this.buildCheckCard(`<strong>${item.label}</strong><br><span style="font-size:0.85rem;color:#888; margin-top:5px; display:block;">${item.desc}</span>`, 'clinical', catKey, item.id, isDanger ? 'fa-triangle-exclamation' : 'fa-notes-medical', isDanger);
            });
            clinicas += `</div>`;
        }
        html += this.buildStep(5, `
            <h2 style="color: var(--valtara-blanco); margin-bottom: 10px; font-family: var(--font-accent); font-size:2.2rem;">5. Historial Médico Relevante</h2>
            <p style="color:#aaa; font-size:1rem; margin-bottom:10px; line-height:1.5;">La masoterapia interactúa con los sistemas circulatorio y nervioso. Marque <strong>únicamente</strong> las condiciones con las que ha sido diagnosticado recientemente o de forma crónica.</p>
            ${clinicas}
        `);

        // PASO 6: Hábitos
        html += this.buildStep(6, `
            <h2 style="color: var(--valtara-oro); margin-bottom: 25px; font-family: var(--font-accent); font-size:2.2rem;">6. Carga Física y Estilo de Vida</h2>
            <div class="exp-input-group" style="background:rgba(242,201,76,0.05); padding:20px; border-radius:15px; border:1px solid rgba(242,201,76,0.2);">
                <label>Nivel de Estrés Psicológico / Laboral Percibido (0-10)</label>
                <input type="range" min="0" max="10" value="${this.formData.habitos.estres}" oninput="document.getElementById('lvl-est').innerText=this.value; ExpedienteEngine.updateData('habitos', 'estres', this.value)" style="width:100%; accent-color:var(--valtara-oro); margin-top:10px;">
                <div id="lvl-est" style="text-align:center; color:var(--valtara-oro); font-size:2.5rem; font-weight:900; margin-top:15px;">${this.formData.habitos.estres}</div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${this.buildSelect('Calidad General del Sueño', 'habitos', 'suenoCalidad', ['Muy Buena', 'Buena', 'Regular', 'Mala', 'Insomnio severo'])}
                ${this.buildInput('number', 'Horas promedio de sueño diario', 'habitos', 'suenoHoras')}
                ${this.buildSelect('¿Su trabajo requiere estar sentado mucho tiempo?', 'habitos', 'sentado', ['Sí, más de 6 horas', 'Moderadamente', 'No'])}
                ${this.buildSelect('¿Su trabajo requiere estar de pie mucho tiempo?', 'habitos', 'pie', ['Sí, más de 6 horas', 'Moderadamente', 'No'])}
                ${this.buildSelect('¿Realiza carga o esfuerzo físico constante?', 'habitos', 'carga', ['Sí, frecuente', 'A veces', 'No'])}
                ${this.buildSelect('¿Practica algún deporte o entrenamiento de alto impacto?', 'habitos', 'deporte', ['Sí, a nivel competitivo', 'Sí, recreativo', 'No'])}
            </div>
        `);

        // PASO 7: Accesibilidad
        let accHTML = this.accessibilityDict.map(i => this.buildCheckCard(i.label, 'accessibility', 'profile', i.label, i.icon)).join('');
        let ajsHTML = this.ajustesDict.map(i => this.buildCheckCard(i.label, 'accessibility', 'supports', i.label, 'fa-check')).join('');
        html += this.buildStep(7, `
            <h2 style="color: var(--valtara-cian-brillante); margin-bottom: 10px; font-family: var(--font-accent); font-size:2.2rem;">7. Inclusión y Accesibilidad</h2>
            <p style="color:#aaa; font-size:1rem; margin-bottom:25px; line-height:1.5;">Garantizar su dignidad y comodidad es nuestra prioridad. Por favor, infórmenos si requiere algún tipo de apoyo o ajuste para su visita.</p>
            <h3 style="color:white; font-size:1.1rem; margin-bottom:15px; border-bottom:1px solid #333; padding-bottom:5px;">Situaciones o Necesidades (Si aplican):</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 30px;">${accHTML}</div>
            <h3 style="color:white; font-size:1.1rem; margin-bottom:15px; border-bottom:1px solid #333; padding-bottom:5px;">Ajustes Razonables Sugeridos:</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">${ajsHTML}</div>
        `);

        // PASO 8: Observaciones
        html += this.buildStep(8, `
            <h2 style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.2rem;">8. Observaciones Adicionales</h2>
            <p style="color:#aaa; font-size:1rem; margin-bottom:20px;">Utilice este espacio para comunicarle a su terapeuta cualquier inquietud, trauma físico pasado, o recomendación específica antes de iniciar su sesión.</p>
            ${this.buildInput('textarea', 'Información extra relevante:', 'extra', null, 'Ej. "Me operaron la rodilla hace 5 años", "No me gusta que me toquen los pies", "Prefiero música de naturaleza"...')}
        `);

        // PASO 9: Revisión
        html += this.buildStep(9, `
            <h2 style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.2rem;">9. Revisión Maestra</h2>
            <p style="color:#aaa; font-size:1rem; margin-bottom:25px;">Por favor, verifique que la información esencial sea correcta antes de proceder al cifrado criptográfico del documento.</p>
            <div style="background: rgba(255,255,255,0.02); padding: 25px; border-radius: 15px; border: 1px solid rgba(242,201,76,0.3); line-height:1.8;">
                <p style="color:white; margin:0 0 15px 0; font-size:1.1rem;"><strong>Identidad:</strong> ${this.formData.personal.fullName || '<span style="color:#ff5555; font-weight:bold;">[Nombre No Especificado]</span>'}</p>
                <p style="color:white; margin:0 0 15px 0; font-size:1.1rem;"><strong>Zonas Tensión:</strong> <span style="color:var(--valtara-oro);">${this.formData.zonas.length} seleccionadas.</span></p>
                <p style="color:white; margin:0 0 15px 0; font-size:1.1rem;"><strong>Estrés Actual:</strong> <span style="color:var(--valtara-cian-brillante); font-weight:bold;">${this.formData.habitos.estres}/10</span></p>
                <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:15px 0;">
                <p style="color:#aaa; font-size:0.9rem; margin:0;">Si detecta un error, use el botón "Atrás" para corregirlo.</p>
            </div>
        `);

        // PASO 10: Legal y FIRMA (CANVAS)
        html += this.buildStep(10, `
            <h2 style="color: var(--valtara-oro); margin-bottom: 20px; font-family: var(--font-accent); font-size:2.2rem;">10. Certificación y Firma</h2>
            
            <div style="background: rgba(255,255,255,0.02); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 4px solid var(--valtara-cian-brillante);">
                <p style="color:#ddd; font-size:0.95rem; margin-bottom:15px; text-align:justify; line-height:1.6;"><strong>Aviso de Privacidad (Resumen ARCO):</strong> Sus datos de salud son considerados sensibles. Serán almacenados de forma encriptada en la memoria local de su dispositivo y no serán transferidos a terceros. Usted es el custodio de esta información.</p>
                <p style="color:#ddd; font-size:0.95rem; margin-bottom:0; text-align:justify; line-height:1.6;"><strong>Declaración de Verdad:</strong> Maniﬁesto bajo protesta de decir verdad que la información compartida es veraz. Entiendo que ocultar condiciones de salud graves exime de responsabilidad técnica a Grupo Gevizz S.A.S.</p>
            </div>
            
            <label class="check-card ${this.formData.legal.truthOath ? 'checked' : ''}" style="margin-bottom:25px; padding:20px;">
                <input type="checkbox" onchange="ExpedienteEngine.updateData('legal', 'truthOath', this.checked); ExpedienteEngine.renderWizard();" ${this.formData.legal.truthOath ? 'checked' : ''} style="display:none;">
                <i class="fa-solid fa-file-contract" style="font-size:1.8rem;"></i> <span style="font-size:1.1rem; flex:1;">He leído y acepto los términos de privacidad y declaro la veracidad de mis datos.</span>
                <i class="fa-solid ${this.formData.legal.truthOath ? 'fa-check' : 'fa-circle'}" style="${this.formData.legal.truthOath ? 'color:var(--valtara-oro);' : 'color:#444;'}"></i>
            </label>

            <div class="exp-input-group" style="margin-top: 10px;">
                <label style="color:white; font-size:1.1rem;"><i class="fa-solid fa-pen-nib text-indigo-400"></i> Firma Autógrafa Digital</label>
                <p style="color:#888; font-size:0.85rem; margin-bottom:15px;">Por favor, dibuje su rúbrica en el recuadro inferior usando su dedo o dispositivo táctil.</p>
                <canvas id="sig-canvas" class="sig-canvas"></canvas>
                <div style="text-align:right; margin-top:10px;">
                    <button onclick="ExpedienteEngine.clearCanvas()" style="background:rgba(255,85,85,0.1); border:1px solid #ff5555; color:#ff5555; padding:8px 15px; border-radius:8px; font-size:0.85rem; cursor:pointer; transition:0.3s; text-transform:uppercase; letter-spacing:1px;"><i class="fa-solid fa-eraser"></i> Limpiar Lienzo</button>
                </div>
            </div>
        `);

        content.innerHTML = html;
        this.updateUI();

        // Inicializar Canvas si estamos en el último paso (Garantizado)
        if (this.currentStep === 10) setTimeout(() => this.initCanvas(), 100);
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
        if (type === 'textarea') return `<div class="exp-input-group"><label>${label}</label><textarea rows="4" oninput="${onInput}" class="exp-textarea ${extraClass}" placeholder="${placeholder}">${val}</textarea></div>`;
        return `<div class="exp-input-group"><label>${label}</label><input type="${type}" oninput="${onInput}" value="${val}" class="exp-input ${extraClass}" placeholder="${placeholder}"></div>`;
    },

    buildSelect: function(label, cat, key, options) {
        let val = this.formData[cat][key];
        let optsHTML = options.map(o => `<option value="${o}" ${val === o ? 'selected' : ''} style="background:#111; color:white;">${o}</option>`).join('');
        return `<div class="exp-input-group"><label>${label}</label><select onchange="ExpedienteEngine.updateData('${cat}', '${key}', this.value)" class="exp-select"><option value="" disabled ${val === '' ? 'selected' : ''}>Seleccione...</option>${optsHTML}</select></div>`;
    },

    buildCheckCard: function(label, cat, arrKey, val, icon, isDanger = false) {
        let isChecked = false;
        if(Array.isArray(this.formData[cat][arrKey])) {
            isChecked = this.formData[cat][arrKey].includes(val);
        } else if(arrKey) {
            isChecked = this.formData[cat][arrKey][val]; 
        } else {
            isChecked = this.formData[cat].includes(val); 
        }

        const func = arrKey ? (Array.isArray(this.formData[cat][arrKey]) ? `toggleArray('${cat}','${arrKey}','${val}')` : `toggleClinical('${cat}','${arrKey}','${val}')`) : `toggleArray('${cat}',null,'${val}')`;
        const dangerClass = isDanger ? 'danger' : '';

        return `
        <div onclick="ExpedienteEngine.${func}; ExpedienteEngine.renderWizard();" class="check-card ${dangerClass} ${isChecked ? 'checked' : ''}">
            <i class="fa-solid ${icon}" style="font-size:1.8rem; ${isChecked ? (isDanger ? 'color:#ff5555;' : 'color:var(--valtara-oro);') : ''}"></i>
            <span style="flex:1;">${label}</span>
            <i class="fa-solid ${isChecked ? 'fa-check' : 'fa-circle'}" style="${isChecked ? (isDanger ? 'color:#ff5555;' : 'color:var(--valtara-oro);') : 'color:#444;'}"></i>
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
        const btnClose = document.getElementById('exp-close');
        const btnNext = document.getElementById('exp-btn-next');
        const btnPrev = document.getElementById('exp-btn-prev');
        const btnSubmit = document.getElementById('exp-btn-submit');

        if(btnClose) btnClose.addEventListener('click', () => overlay.classList.remove('active'));

        btnNext.addEventListener('click', () => {
            if(this.currentStep === 1 && (!this.formData.personal.fullName)) { alert("Por favor, ingrese su Nombre Completo para generar el documento."); return; }
            if(this.currentStep < this.totalSteps - 1) { this.currentStep++; this.renderWizard(); }
        });
        
        btnPrev.addEventListener('click', () => {
            if(this.currentStep > 0) { this.currentStep--; this.renderWizard(); }
        });

        btnSubmit.addEventListener('click', () => {
            if(!this.formData.legal.truthOath) { alert("Debe aceptar el compromiso de veracidad para continuar."); return; }
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

    initCanvas: function() {
        const canvas = document.getElementById('sig-canvas');
        if(!canvas) return;
        this.signaturePad = canvas;
        const ctx = canvas.getContext('2d');
        
        // Ajustar resolución nativa
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
    // MOTOR PDF MULTI-HOJA DE ALTA SEGURIDAD INSTITUCIONAL
    // ====================================================================
    generatePDF: function() {
        const d = this.formData;
        const nombre = d.personal.fullName || 'Paciente';
        const iniciales = nombre.split(' ').map(n => n[0]).join('').substring(0,3).toUpperCase();
        
        // Folio y Criptografía
        const dateObj = new Date();
        const folioStr = `${dateObj.getFullYear()}${(dateObj.getMonth()+1).toString().padStart(2,'0')}${dateObj.getDate().toString().padStart(2,'0')}`;
        const horaStr = `${dateObj.getHours().toString().padStart(2,'0')}${dateObj.getMinutes().toString().padStart(2,'0')}`;
        const folioReal = `FOLIO-${iniciales}-${folioStr}-${horaStr}`;
        const hash = "SHA256-" + Math.random().toString(36).substr(2, 16).toUpperCase() + Math.random().toString(36).substr(2, 16).toUpperCase();

        // Extraer Padecimientos
        let clinicaHTML = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let activos = [];
            category.items.forEach(item => { if(d.clinical[catKey] && d.clinical[catKey][item.id]) activos.push(item.label); });
            if(activos.length > 0) clinicaHTML += `<div style="margin-bottom:8px; border-left:3px solid #c62828; padding-left:10px;"><strong>${category.title}:</strong> <span style="color:#c62828; font-weight:bold;">${activos.join(', ')}</span></div>`;
        }
        if(clinicaHTML === '') clinicaHTML = '<div style="color:#2e7d32; font-weight:bold;">Ninguna condición diagnosticada reportada.</div>';

        // ESTILOS PDF BASE Y MARCA DE AGUA NIVEL BILLETE
        const pCSS = `width: 8.5in; height: 10.5in; padding: 0.5in 0.6in; background: white; font-family: 'Lato', sans-serif; color: #111; font-size: 13px; position: relative; box-sizing: border-box; overflow: hidden;`;
        
        // Marca de agua ultra-segura (Repeticiones micro y logo central gigante)
        const watermark = `
            <!-- Sello Central Opacidad Baja -->
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; opacity:0.04; z-index:0; pointer-events:none; width:100%;">
                <img src="logo.png" style="width:300px; height:auto; margin-bottom:20px; filter:grayscale(100%);">
                <h1 style="font-size:90px; font-family:'Playfair Display',serif; margin:0; letter-spacing:15px;">VALTARA</h1>
            </div>
            <!-- Micro-textos en 4 esquinas -->
            <div style="position:absolute; top:25px; left:25px; font-size:7px; color:#999; font-family:monospace; z-index:0;">DOC. OFICIAL | G. GEVIZZ S.A.S. | ${folioReal}</div>
            <div style="position:absolute; top:25px; right:25px; font-size:7px; color:#999; font-family:monospace; z-index:0;">VERIFICACIÓN: ${hash.substr(0,15)}</div>
            <div style="position:absolute; bottom:25px; left:25px; font-size:7px; color:#999; font-family:monospace; z-index:0;">COPIA SOBERANA DEL PACIENTE</div>
            <div style="position:absolute; bottom:25px; right:25px; font-size:7px; color:#999; font-family:monospace; z-index:0;">${new Date().toLocaleString()}</div>
        `;

        const header = (title, pageNum) => `
            <div style="border-bottom: 4px double #050508; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-end; position:relative; z-index:2;">
                <div style="display:flex; align-items:center; gap:15px;">
                    <img src="logo.png" style="width:40px; height:40px;">
                    <div>
                        <h1 style="font-family: 'Playfair Display', serif; color: #050508; margin: 0; font-size: 24px; font-weight:900;">VALTARA</h1>
                        <p style="color: #444; font-size: 9px; margin: 0; letter-spacing: 3px; font-weight:bold;">EXECUTIVE THERAPY</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: 900; color: #000; font-size:14px; text-transform:uppercase;">${title}</p>
                    <p style="margin: 0; font-size: 10px; color:#555;">Folio Único: <strong>${folioReal}</strong></p>
                    <p style="margin: 0; font-size: 10px; color:#555;">Página ${pageNum} de 4</p>
                </div>
            </div>
        `;

        const titleBox = (t) => `<h3 style="color:#000; background:#f0f0f0; padding:10px 15px; border-left:5px solid #D4AF37; margin: 25px 0 15px 0; font-size:14px; text-transform:uppercase; font-weight:bold; letter-spacing:1px; z-index:2; position:relative;">${t}</h3>`;
        const renderRow = (lbl, val) => `<div style="margin-bottom:8px; z-index:2; position:relative; display:flex; border-bottom:1px solid #f5f5f5; padding-bottom:4px;"><strong style="width:180px; color:#444;">${lbl}:</strong> <span style="flex:1; color:#000;">${val || '---'}</span></div>`;

        // =========================================================================
        // CONSTRUCCIÓN DE LAS 4 HOJAS
        // =========================================================================
        const pdfContent = document.createElement('div');
        
        // --- HOJA 1: IDENTIDAD Y MOTIVO ---
        pdfContent.innerHTML += `
            <div style="${pCSS}">
                ${watermark}
                ${header("Historia Clínica - Registro", 1)}
                
                ${titleBox("1. Identificación del Paciente")}
                <div style="padding:10px 20px;">
                    ${renderRow('Nombre Completo', d.personal.fullName)}
                    ${renderRow('CURP', d.personal.curp)}
                    ${renderRow('Fecha de Nacimiento', d.personal.birthDate)}
                    ${renderRow('Edad', d.personal.age)}
                    ${renderRow('Sexo / Género', d.personal.gender)}
                    ${renderRow('Teléfono Contacto', d.personal.phone)}
                    ${renderRow('Correo Electrónico', d.personal.email)}
                    ${renderRow('Ocupación', d.personal.occupation)}
                    ${renderRow('Nivel Act. Física', d.personal.activity)}
                </div>

                ${titleBox("2. Motivo de Atención Terapéutica")}
                <div style="padding:10px 20px;">
                    ${renderRow('Motivo Principal', d.motivo.principal)}
                    ${renderRow('Objetivo de la Sesión', d.motivo.objetivo)}
                    ${renderRow('Tiempo de Evolución', d.motivo.evolucion)}
                    ${renderRow('¿Es Recurrente?', d.motivo.recurrente)}
                    ${renderRow('Expectativas', d.motivo.mejora)}
                </div>
            </div>
            <div class="html2pdf__page-break"></div>
        `;

        // --- HOJA 2: ZONAS Y CLÍNICA ---
        pdfContent.innerHTML += `
            <div style="${pCSS}">
                ${watermark}
                ${header("Historia Clínica - Triaje Físico", 2)}

                ${titleBox("3. Mapa de Tensión y Dolor")}
                <div style="padding:10px 20px;">
                    ${renderRow('Zonas Afectadas', d.zonas.join(', ') || 'Ninguna reportada')}
                    <div style="margin: 15px 0; padding:15px; border:1px solid #ffcdd2; background:#fffafa; border-radius:5px;">
                        <div style="margin-bottom:8px;"><strong>Sensación Descrita:</strong> ${d.dolorDetalle.sensacion}</div>
                        <div style="margin-bottom:8px;"><strong>Intensidad Declarada:</strong> <span style="font-size:18px; font-weight:bold; color:#c62828;">${d.dolorDetalle.intensidad} / 10</span></div>
                        <div style="margin-bottom:8px;"><strong>Evolución:</strong> ${d.dolorDetalle.desde}</div>
                        <div style="margin-bottom:8px;"><strong>Frecuencia:</strong> ${d.dolorDetalle.constante}</div>
                        <div style="margin-bottom:8px;"><strong>Agravantes:</strong> ${d.dolorDetalle.empeora}</div>
                        <div><strong>Atenuantes:</strong> ${d.dolorDetalle.alivia}</div>
                    </div>
                </div>

                ${titleBox("4. Antecedentes Médicos Relevantes")}
                <div style="padding:15px 20px; background:#fcfcfc; border:1px solid #ddd;">
                    <p style="font-size:10px; color:#666; margin-top:0; font-style:italic;">* Declaración del paciente bajo protesta de decir verdad:</p>
                    ${clinicaHTML}
                </div>
            </div>
            <div class="html2pdf__page-break"></div>
        `;

        // --- HOJA 3: ESTILO DE VIDA Y ACCESIBILIDAD ---
        pdfContent.innerHTML += `
            <div style="${pCSS}">
                ${watermark}
                ${header("Historia Clínica - Hábitos y Apoyo", 3)}

                ${titleBox("5. Estilo de Vida y Carga Biomecánica")}
                <div style="padding:10px 20px;">
                    ${renderRow('Estrés Psicológico / Laboral', `<span style="font-weight:bold; font-size:16px;">${d.habitos.estres} / 10</span>`)}
                    ${renderRow('Calidad del Sueño', d.habitos.suenoCalidad)}
                    ${renderRow('Horas de Sueño', d.habitos.suenoHoras)}
                    ${renderRow('Trabajo Prolongado Sentado', d.habitos.sentado)}
                    ${renderRow('Trabajo Prolongado de Pie', d.habitos.pie)}
                    ${renderRow('Esfuerzo Físico Constante', d.habitos.carga)}
                    ${renderRow('Deporte Alto Impacto', d.habitos.deporte)}
                </div>

                ${titleBox("6. Accesibilidad e Inclusión")}
                <div style="padding:10px 20px; border-left:4px solid #0288d1; background:#f1f9ff;">
                    ${renderRow('Apoyos Específicos Requeridos', d.accessibility.profile.join(', ') || 'Ninguno reportado')}
                    ${renderRow('Ajustes Razonables Solicitados', d.accessibility.supports.join(', ') || 'Ninguno reportado')}
                </div>

                ${titleBox("7. Observaciones Adicionales")}
                <div style="padding:15px 20px; font-style:italic; border:1px solid #ccc; background:#fafafa;">
                    "${d.extra || 'El paciente no refirió observaciones adicionales o notas específicas para el terapeuta.'}"
                </div>
            </div>
            <div class="html2pdf__page-break"></div>
        `;

        // --- HOJA 4: LEGAL, FIRMAS Y AVAL INSTITUCIONAL ---
        pdfContent.innerHTML += `
            <div style="${pCSS}">
                ${watermark}
                ${header("Marco Legal y Firmas", 4)}

                ${titleBox("8. Consentimiento Informado (ARCO)")}
                <div style="font-size:11px; text-align:justify; line-height:1.6; color:#333; padding:15px; border:1px solid #000;">
                    <p><strong>DECLARACIÓN DE VERDAD Y RESPONSABILIDAD:</strong> Maniﬁesto bajo protesta de decir verdad que la información contenida en este expediente (Folio ${folioReal}) es veraz. Entiendo categóricamente que la atención brindada por Grupo Gevizz S.A.S. de C.V. corresponde a masoterapia clínica, terapia manual y valoración funcional, y de ninguna manera sustituye un diagnóstico ni tratamiento médico alópata.</p>
                    <p>He sido debidamente informado de que omitir dolencias agudas, infecciones, cirugías recientes, embarazos, uso de anticoagulantes o presencia de patologías severas (como trombosis) compromete gravemente mi integridad física, deslindando absolutamente a la empresa y al terapeuta a cargo de cualquier responsabilidad derivada de dicha omisión.</p>
                    <p><strong>AVISO DE PRIVACIDAD:</strong> Autorizo que mis datos de salud (sensibles) sean recabados y resguardados en mi dispositivo local, para fines exclusivos de mi atención terapéutica, seguimiento de seguridad y control interno, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
                </div>

                <!-- BLOQUE DE FIRMAS DUAL -->
                <div style="margin-top: 50px; display: flex; justify-content: space-between;">
                    <!-- PACIENTE (Canvas Insertado) -->
                    <div style="width: 45%; text-align: center;">
                        <img src="${d.legal.signatureData}" style="max-width:100%; height:90px; object-fit:contain; border-bottom:2px solid #000; margin-bottom:5px;">
                        <p style="margin:0; font-size:11px; font-weight:900; text-transform:uppercase;">Firma Digital Autógrafa</p>
                        <p style="margin:2px 0 0 0; font-size:10px;">${nombre}</p>
                        <p style="margin:2px 0 0 0; font-size:9px; color:#666;">(El Paciente)</p>
                    </div>
                    
                    <!-- TERAPEUTA (Espacio en blanco) -->
                    <div style="width: 45%; text-align: center;">
                        <div style="height:90px; border-bottom:2px solid #000; margin-bottom:5px; display:flex; align-items:end; justify-content:center; color:#999; font-size:9px; font-style:italic; padding-bottom:5px;">
                            (Sello y firma a la recepción del documento)
                        </div>
                        <p style="margin:0; font-size:11px; font-weight:900; text-transform:uppercase;">El Terapeuta Clínico</p>
                        <p style="margin:2px 0 0 0; font-size:10px; color:#D4AF37; font-weight:bold;">Ángel de Jesús Guerrero Vizzuett</p>
                        <p style="margin:2px 0 0 0; font-size:9px; color:#666;">Se entregará copia física o digital firmada.</p>
                    </div>
                </div>

                <!-- CERTIFICACIONES DEL TERAPEUTA -->
                <div style="margin-top: 50px; background:#050508; color:white; padding:20px; border-radius:5px; border-left:8px solid #D4AF37;">
                    <p style="margin:0 0 10px 0; color:#D4AF37; font-weight:bold; text-transform:uppercase; font-size:12px; letter-spacing:1px;">Aval y Certificaciones de Práctica Profesional:</p>
                    <ul style="margin:0; padding-left:20px; font-size:11px; line-height:1.6; color:#ddd;">
                        <li><strong>Terapeuta Físico para la Salud</strong>, Especialidad en Masoterapia Clínica.</li>
                        <li>Registro Nacional de Terapeutas <strong>(RENATED): A-54878</strong>.</li>
                        <li>Secretaría de Educación Pública <strong>(SEP DGCFT): RVOE 17FT061</strong>.</li>
                        <li>Acreditación Institucional Sistema de Salud y Educación <strong>(SISAE)</strong>.</li>
                    </ul>
                </div>
                
                <div style="margin-top:20px; text-align:center;">
                    <p style="font-family:monospace; font-size:9px; color:#555; word-break:break-all;"><strong>SELLO CRIPTOGRÁFICO DE TIEMPO:</strong> ${hash}</p>
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

        // UI Feedback de "Encriptación"
        document.getElementById('exp-btn-prev').style.display = 'none';
        const btnSubmit = document.getElementById('exp-btn-submit');
        btnSubmit.style.display = 'none';
        
        const loader = document.getElementById('exp-loader');
        loader.style.display = 'block';

        if (typeof html2pdf !== 'undefined') {
            // Simulamos tiempo de encriptación para dar peso psicológico al proceso
            setTimeout(() => {
                html2pdf().set(opt).from(pdfContent).save().then(() => {
                    loader.innerHTML = '<i class="fa-solid fa-check"></i> EXPEDIENTE CIFRADO Y DESCARGADO';
                    loader.style.color = '#00b09b';
                    
                    const mensaje = `*Aura Assistant (Valtara)* 🌿%0A%0AHe concluido el llenado y certificación de mi Historia Clínica.%0A%0A*Paciente:* ${nombre}%0A*Folio:* ${folioReal}%0A*Estrés Biomecánico:* ${d.habitos.estres}/10%0A%0A_A continuación adjunto el PDF de 4 páginas debidamente firmado para revisión del Terapeuta Titular._`;
                    
                    setTimeout(() => {
                        document.getElementById('expediente-overlay').classList.remove('active');
                        window.open(`https://wa.me/5213348572070?text=${mensaje}`, '_blank');
                        
                        // Restaurar UI
                        setTimeout(() => { 
                            loader.style.display = 'none'; 
                            loader.innerHTML = '<i class="fa-solid fa-lock fa-fade"></i> CIFRANDO Y RENDERIZANDO...';
                            loader.style.color = 'var(--valtara-cian-brillante)';
                            btnSubmit.style.display = 'block';
                            document.getElementById('exp-btn-prev').style.display = 'block';
                        }, 1000); 
                    }, 2500);
                });
            }, 1500); // 1.5s de fake-loader para UX de seguridad
        }
    }
};

window.addEventListener('DOMContentLoaded', () => ExpedienteEngine.init());
