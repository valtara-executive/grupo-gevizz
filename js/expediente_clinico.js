/**
 * ====================================================================================
 * BLOQUE 10: EXPEDIENTE CLÍNICO SOBERANO V29.5 "ACCESIBILIDAD TOTAL"
 * Anti-Crash LocalStorage, Cuadrículas A11y (ARIA), Panel Firma Dedicado, PDF 4 Hojas.
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
            { id: "fi", label: "Fiebre Reciente", desc: "Temperatura elevada en últimas 48 horas." },
            { id: "if", label: "Infección Activa", desc: "Virus o bacterias (gripa, infecciones)." },
            { id: "he", label: "Herida Abierta o Sangrado", desc: "Cortes, úlceras o sangrados no cicatrizados." },
            { id: "hm", label: "Hematomas Frecuentes", desc: "Aparición de moretones con facilidad." },
            { id: "tr", label: "Trombosis o sospecha", desc: "Formación de coágulos. Contraindicación absoluta para masaje profundo." },
            { id: "va", label: "Várices Importantes", desc: "Venas dilatadas en piernas. Requiere técnica superficial." },
            { id: "hp", label: "Hipertensión Arterial", desc: "Presión alta o problemas de presión sanguínea." },
            { id: "ci", label: "Problemas Circulatorios", desc: "Mala circulación, pesadez en extremidades." },
            { id: "em", label: "Embarazo Actual", desc: "Gestación. Requiere posiciones y cuidados obstétricos." },
            { id: "po", label: "Postparto Reciente", desc: "Recuperación de parto en los últimos 6 meses." },
            { id: "cr", label: "Cirugía Reciente", desc: "Cualquier intervención quirúrgica en el último año." },
            { id: "fr", label: "Fractura o Esguince", desc: "Lesión ósea o ligamentaria reciente." },
            { id: "pr", label: "Prótesis o Implantes", desc: "Metales, silicón o dispositivos electrónicos en el cuerpo." },
            { id: "hd", label: "Hernia Discal", desc: "Desplazamiento de disco intervertebral en la columna." },
            { id: "ar", label: "Artritis o Artrosis", desc: "Inflamación articular o desgaste." },
            { id: "os", label: "Osteoporosis / Osteopenia", desc: "Descalcificación ósea. Hay riesgo por presión fuerte." },
            { id: "ne", label: "Neuropatía", desc: "Alteración de sensibilidad nerviosa (hormigueo crónico)." },
            { id: "ve", label: "Mareos o Vértigo", desc: "Inestabilidad al cambiar de postura rápida." }
        ]},
        medicacion: { title: "B. Medicación Actual", icon: "fa-pills", items: [
            { id: "an", label: "Analgésicos", desc: "Medicamentos para el dolor." },
            { id: "ai", label: "Antiinflamatorios", desc: "Reducen inflamación muscular o articular." },
            { id: "ac", label: "Anticoagulantes", desc: "Aumentan riesgo de moretones." },
            { id: "ah", label: "Antihipertensivos", desc: "Control de presión arterial." },
            { id: "rm", label: "Relajantes Musculares", desc: "Disminuyen el tono muscular." },
            { id: "ad", label: "Antidepresivos / Ansiolíticos", desc: "Fármacos reguladores del sistema nervioso." },
            { id: "in", label: "Insulina / Metabólicos", desc: "Tratamiento diabético u hormonal." }
        ]},
        alergias: { title: "C. Alergias y Sensibilidad", icon: "fa-hand-dots", items: [
            { id: "ac", label: "Aceites Esenciales", desc: "Alergia a extractos puros botánicos." },
            { id: "cr", label: "Cremas o Químicos", desc: "Alergia a lociones corporales." },
            { id: "fr", label: "Fragancias", desc: "Sensibilidad olfativa severa." },
            { id: "la", label: "Látex", desc: "Alergia a guantes o materiales elásticos." },
            { id: "fr2", label: "Intolerancia al Frío", desc: "Hipersensibilidad a la crioterapia." },
            { id: "ca", label: "Intolerancia al Calor", desc: "Hipersensibilidad a la termoterapia." },
            { id: "pf", label: "Dolor a Presión Fuerte", desc: "El tejido reacciona con dolor intenso al tacto profundo." }
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
        { id: "co", label: "Dificultad entender instrucciones", icon: "fa-brain" },
        { id: "ta", label: "Hipersensibilidad al tacto", icon: "fa-hand-sparkles" },
        { id: "lu", label: "Sensibilidad extrema a luz", icon: "fa-lightbulb" },
        { id: "ru", label: "Sensibilidad extrema a ruido", icon: "fa-volume-xmark" },
        { id: "ol", label: "Sensibilidad a olores", icon: "fa-spray-can-sparkles" },
        { id: "dp", label: "Dolor al cambiar posición", icon: "fa-arrows-rotate" },
        { id: "pa", label: "Necesidad de pausas", icon: "fa-pause" },
        { id: "am", label: "Requiere acompañante", icon: "fa-user-group" }
    ],

    ajustesDict: [
        { id: "ex", label: "Explicaciones claras y lentas" },
        { id: "ls", label: "Lenguaje simple y directo" },
        { id: "ap", label: "Apoyo para leer/llenar formatos" },
        { id: "tg", label: "Textos más grandes" },
        { id: "il", label: "Intensidad de luz baja" },
        { id: "mr", label: "Ruido ambiente al mínimo" },
        { id: "mp", label: "Mayor privacidad visual" },
        { id: "as", label: "Apoyo físico en camilla" },
        { id: "cp", label: "Cambios de postura graduales" },
        { id: "ip", label: "Menor presión terapéutica" },
        { id: "em", label: "Evitar zonas dolorosas" },
        { id: "pp", label: "Pausas durante la sesión" }
    ],

    init: function() {
        this.injectStyles();
        this.injectModal();
        this.loadData();
        this.bindEvents();
        try {
            this.renderWizard();
        } catch(e) {
            console.error("Valtara Error:", e);
            // Si ocurre un error fatal por caché, la limpiamos y recargamos
            localStorage.removeItem('valtara_expediente');
            location.reload();
        }
        setTimeout(() => this.checkCentinela(), 3500); 
    },

    // Anunciador de Accesibilidad (Voz para lectores de pantalla)
    announceA11y: function(message) {
        let announcer = document.getElementById('exp-a11y-announcer');
        if(!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'exp-a11y-announcer';
            announcer.setAttribute('aria-live', 'assertive');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            document.body.appendChild(announcer);
        }
        announcer.textContent = message;
    },

    injectStyles: function() {
        if(document.getElementById('valtara-exp-styles')) return;
        const style = document.createElement('style');
        style.id = 'valtara-exp-styles';
        style.innerHTML = `
            .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
            .exp-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(2, 2, 5, 0.95); z-index: 999999; display: none; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); opacity: 0; transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
            .exp-overlay.active { display: flex; opacity: 1; }
            .exp-container { width: 95%; max-width: 900px; height: 92vh; background: rgba(15, 15, 20, 0.8); border: 1px solid rgba(242, 201, 76, 0.2); border-radius: 20px; display: flex; flex-direction: column; box-shadow: 0 30px 80px rgba(0,0,0,0.9); overflow: hidden; position: relative; }
            
            .exp-header { padding: 25px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; background: linear-gradient(180deg, rgba(20,20,25,0.9) 0%, transparent 100%); }
            .exp-body { flex: 1; overflow-y: auto; padding: 35px; scrollbar-width: thin; scrollbar-color: var(--valtara-oro) transparent; scroll-behavior: smooth; }
            
            /* Footer de Navegación Fijo y Organizado */
            .exp-footer { padding: 20px 30px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(10,10,15,0.95); display: flex; justify-content: space-between; align-items: center; gap:15px; }
            
            .exp-input-group { margin-bottom: 25px; position: relative; }
            .exp-input-group label { display: block; color: var(--valtara-oro-suave); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-weight: 700; }
            .exp-input, .exp-select, .exp-textarea { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 18px; border-radius: 12px; font-size: 1.1rem; transition: all 0.3s ease; }
            .exp-input:focus, .exp-select:focus, .exp-textarea:focus { border-color: var(--valtara-oro); outline: none; background: rgba(255,255,255,0.08); box-shadow: 0 0 15px rgba(242,201,76,0.1); }
            
            .exp-btn { padding: 18px 30px; border-radius: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.3s; display: flex; justify-content: center; align-items: center; gap: 10px; font-size: 1rem; border: none; }
            .btn-primary { background: linear-gradient(135deg, #F2C94C, #F2994A); color: #050508; box-shadow: 0 10px 25px rgba(242,201,76,0.3); }
            .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(242,201,76,0.5); }
            .btn-secondary { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.2); }
            .btn-secondary:hover { background: rgba(255,255,255,0.1); border-color:white; transform: translateY(-3px); }
            .btn-success { background: linear-gradient(135deg, #00b09b, #00796b); color: white; width:100%; box-shadow: 0 10px 30px rgba(0,176,155,0.4); }
            .btn-success:disabled { background: #444; color:#888; box-shadow:none; cursor:not-allowed; }
            
            .exp-step { display: none; animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .exp-step.active { display: block; }
            
            /* CUADRÍCULAS DE ACCESIBILIDAD (NUEVO DISEÑO) */
            .a11y-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 15px; }
            .a11y-grid-btn { 
                background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.1); border-radius: 16px; 
                padding: 20px; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; 
                align-items: flex-start; text-align: left; color: white; width:100%; outline:none; position: relative; overflow: hidden;
            }
            .a11y-grid-btn:focus-visible { border-color: var(--valtara-oro); box-shadow: 0 0 0 4px rgba(242,201,76,0.3); }
            
            .a11y-grid-btn.active { 
                background: rgba(0, 255, 255, 0.05); border-color: var(--valtara-cian-brillante); box-shadow: inset 0 0 20px rgba(0,255,255,0.1); 
            }
            .a11y-grid-btn.danger.active { 
                background: rgba(255, 85, 85, 0.05); border-color: #ff5555; box-shadow: inset 0 0 20px rgba(255,85,85,0.15); 
            }
            .a11y-grid-btn.warning.active { 
                background: rgba(242, 201, 76, 0.05); border-color: var(--valtara-oro); box-shadow: inset 0 0 20px rgba(242,201,76,0.15); 
            }

            .a11y-btn-header { display: flex; align-items: center; gap: 15px; margin-bottom:12px; width:100%; }
            .a11y-btn-title { font-weight: 900; font-size: 1.1rem; flex:1; line-height:1.3; }
            .a11y-btn-desc { font-size: 0.9rem; color: #aaa; margin-bottom: 15px; font-weight:300; line-height:1.4; display:block; width:100%; }
            .a11y-status-badge { font-family:monospace; font-weight:bold; font-size:0.85rem; padding:8px 12px; border-radius:8px; background:rgba(255,255,255,0.05); color:#888; width:100%; text-align:center; transition:0.3s; margin-top:auto; }
            
            /* MODAL DE FIRMA DEDICADO Y BLOQUEADO */
            .sig-modal-overlay { position: fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.98); z-index:9999999; display:none; flex-direction:column; justify-content:center; align-items:center; padding:20px; touch-action: none; }
            .sig-modal-overlay.active { display:flex; animation: fadeIn 0.3s forwards; }
            .sig-modal-content { background:#fff; width:100%; max-width:600px; border-radius:20px; padding:25px; text-align:center; box-shadow: 0 10px 50px rgba(242,201,76,0.2); }
            .sig-canvas { width: 100%; height: 300px; background: #fcfcfc; border-radius: 12px; border: 3px dashed #ccc; cursor: crosshair; touch-action: none; margin-bottom:25px; }
            
            @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
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
                        <h2 style="margin:0; color:var(--valtara-oro); font-family:var(--font-accent); font-size:1.8rem; letter-spacing:1px;"><i class="fa-solid fa-file-shield text-indigo-400" style="margin-right:10px;"></i> Historia Clínica Oficial</h2>
                        <p style="margin:5px 0 0 0; color:#aaa; font-size:0.75rem; letter-spacing:3px; text-transform:uppercase;">Valtara Executive Therapy</p>
                    </div>
                    <button id="exp-close" style="background:transparent; border:none; color:#666; font-size:2rem; cursor:pointer; transition:0.3s;" aria-label="Cerrar Expediente"><i class="fa-solid fa-xmark"></i></button>
                </div>
                
                <div style="background: rgba(255,255,255,0.03); height: 4px; width: 100%;">
                    <div id="exp-progress" style="height: 100%; background: linear-gradient(90deg, var(--valtara-cian-brillante), var(--valtara-verde-menta)); width: 0%; transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);"></div>
                </div>

                <div class="exp-body" id="exp-wizard-content" role="region" aria-live="polite"></div>

                <!-- FOOTER FIJO Y CLARO -->
                <div class="exp-footer">
                    <div style="flex:1;">
                        <button id="exp-btn-prev" class="exp-btn btn-secondary" style="visibility:hidden;"><i class="fa-solid fa-arrow-left-long"></i> Atrás</button>
                    </div>
                    <div id="exp-loader" style="display:none; color:var(--valtara-cian-brillante); font-family:monospace; font-size:0.9rem; flex:2; text-align:center; letter-spacing:2px; font-weight:bold;"><i class="fa-solid fa-lock fa-fade"></i> CIFRANDO...</div>
                    <div style="flex:1; display:flex; justify-content:flex-end;">
                        <button id="exp-btn-next" class="exp-btn btn-primary">Siguiente <i class="fa-solid fa-arrow-right-long"></i></button>
                    </div>
                    <button id="exp-btn-submit" class="exp-btn btn-success" style="display:none;" disabled><i class="fa-solid fa-lock"></i> Firma Pendiente</button>
                </div>
            </div>
        </div>
        
        <!-- MODAL DEDICADO PARA FIRMA AUTÓGRAFA (CONGELA EL SCROLL) -->
        <div id="signature-modal" class="sig-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="sig-title">
            <div class="sig-modal-content">
                <h3 id="sig-title" style="color:#050508; font-size:1.6rem; margin-top:0; margin-bottom:10px; font-weight:900; text-transform:uppercase;">Firma Digital Autógrafa</h3>
                <p style="color:#666; font-size:1rem; margin-bottom:20px;">Por favor, dibuje su firma dentro del recuadro usando su dedo.</p>
                
                <canvas id="sig-canvas" class="sig-canvas" aria-label="Lienzo en blanco para dibujar firma"></canvas>
                
                <div style="display:flex; justify-content:space-between; gap:15px; margin-top:10px;">
                    <button onclick="ExpedienteEngine.closeSignaturePad(false)" style="padding:15px; background:#f5f5f5; color:#555; border:1px solid #ccc; border-radius:12px; font-weight:bold; flex:1; cursor:pointer;">Cancelar</button>
                    <button onclick="ExpedienteEngine.clearCanvas()" style="padding:15px; background:#fff0f0; color:#c62828; border:1px solid #ffcdd2; border-radius:12px; font-weight:bold; flex:1; cursor:pointer;"><i class="fa-solid fa-eraser"></i> Borrar</button>
                    <button onclick="ExpedienteEngine.closeSignaturePad(true)" style="padding:15px; background:#000; color:#D4AF37; border:none; border-radius:12px; font-weight:900; flex:2; cursor:pointer;">GUARDAR FIRMA</button>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    },

    renderWizard: function() {
        const content = document.getElementById('exp-wizard-content');
        let html = '';

        html += this.buildStep(0, `
            <div style="text-align: center; padding: 20px 0; max-width:600px; margin:0 auto;">
                <i class="fa-solid fa-scale-balanced" style="font-size: 4.5rem; color: var(--valtara-oro); margin-bottom: 25px; filter: drop-shadow(0 0 20px rgba(242,201,76,0.3));"></i>
                <h2 style="font-size: 2.8rem; color: white; font-family: var(--font-accent); margin-bottom: 15px; line-height:1.2;">Protocolo Institucional</h2>
                <p style="color: #aaa; font-size: 1.15rem; line-height: 1.6; margin-bottom: 30px; font-weight:300;">
                    Bienvenido. Este documento rige su seguridad física y nuestra responsabilidad técnica. 
                    <strong style="color:var(--valtara-cian-brillante);">El llenado requiere aproximadamente 20 minutos.</strong> 
                    Le solicitamos amablemente responder con sinceridad.
                </p>
                <div style="background: rgba(255,255,255,0.02); padding: 20px; border-radius: 18px; border-left: 4px solid var(--valtara-oro); text-align: left;">
                    <strong style="color: white; font-size:1.1rem; letter-spacing:1px;"><i class="fa-solid fa-gavel text-indigo-400"></i> Respaldo Legal</strong>
                    <p style="color: #888; font-size: 0.95rem; margin-top: 10px; line-height:1.5;">Su información se procesa bajo el marco de la <strong>NOM-004-SSA3-2012</strong> y se resguarda bajo encriptación local (Ley ARCO/INAI).</p>
                </div>
            </div>
        `);

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

        let zonasHTML = this.zonasList.map(z => this.buildGridToggleCard('array', z, 'zonas', null, z, 'fa-child-reaching', 'warning')).join('');
        html += this.buildStep(3, `
            <h2 style="color: var(--valtara-oro); margin-bottom: 10px; font-family: var(--font-accent); font-size:2.2rem;">3. Mapa de Tensión Corporal</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:25px;">Seleccione amablemente todas las zonas que presenten molestia, rigidez o dolor actual.</p>
            <div class="a11y-grid">${zonasHTML}</div>
        `);

        html += this.buildStep(4, `
            <h2 style="color: #ff5555; margin-bottom: 15px; font-family: var(--font-accent); font-size:2.2rem;">4. Análisis Sensorial del Dolor</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:25px;">Respecto a las zonas seleccionadas, ayúdenos a entender su percepción de la molestia.</p>
            ${this.buildSelect('¿Cómo describe la sensación principal?', 'dolorDetalle', 'sensacion', ['Dolor sordo y profundo', 'Presión o tensión extrema', 'Rigidez y falta de movilidad', 'Punzada aguda o piquetes', 'Hormigueo', 'Entumecimiento / Pérdida de sensibilidad', 'Cansancio / Pesadez muscular', 'Otro'])}
            <div class="exp-input-group" style="background:rgba(255,85,85,0.05); padding:25px; border-radius:15px; border:1px solid rgba(255,85,85,0.2);">
                <label style="color:#ff5555; font-size:1rem;">Intensidad del dolor (0 = Sin dolor, 10 = Inoportable)</label>
                <input type="range" min="0" max="10" value="${this.formData.dolorDetalle.intensidad}" oninput="document.getElementById('lvl-int').innerText=this.value; ExpedienteEngine.updateData('dolorDetalle', 'intensidad', this.value)" style="width:100%; accent-color:#ff5555; margin-top:15px;">
                <div id="lvl-int" style="text-align:center; color:#ff5555; font-size:3rem; font-weight:900; margin-top:20px;">${this.formData.dolorDetalle.intensidad}</div>
            </div>
            ${this.buildInput('text', '¿Desde cuándo inició esta molestia específica?', 'dolorDetalle', 'desde')}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${this.buildInput('text', '¿Qué posturas o actividades lo empeoran?', 'dolorDetalle', 'empeora')}
                ${this.buildInput('text', '¿Qué acciones lo alivian momentáneamente?', 'dolorDetalle', 'alivia')}
            </div>
            ${this.buildSelect('Frecuencia del malestar', 'dolorDetalle', 'constante', ['Constante (No desaparece)', 'Intermitente (Va y viene)', 'Solo al realizar un esfuerzo físico', 'Principalmente al despertar', 'Principalmente al final del día'])}
        `);

        let clinicas = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            clinicas += `<h3 style="color:var(--valtara-cian-brillante); margin: 35px 0 20px 0; border-bottom:1px solid rgba(0,255,255,0.2); padding-bottom:10px; font-size:1.4rem; text-transform:uppercase; letter-spacing:1px;"><i class="fa-solid ${category.icon}"></i> ${category.title}</h3><div class="a11y-grid">`;
            category.items.forEach(item => {
                const isDanger = catKey === 'precauciones';
                clinicas += this.buildGridToggleCard('boolean', item.label, 'clinical', catKey, item.id, isDanger ? 'fa-triangle-exclamation' : 'fa-notes-medical', isDanger ? 'danger' : 'warning', item.desc);
            });
            clinicas += `</div>`;
        }
        html += this.buildStep(5, `
            <h2 style="color: var(--valtara-blanco); margin-bottom: 10px; font-family: var(--font-accent); font-size:2.2rem;">5. Historial Médico Relevante</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:20px; line-height:1.6;">La masoterapia interactúa con los sistemas circulatorio y nervioso. Seleccione <strong>únicamente</strong> las condiciones con las que ha sido diagnosticado recientemente o de forma crónica.</p>
            ${clinicas}
        `);

        html += this.buildStep(6, `
            <h2 style="color: var(--valtara-oro); margin-bottom: 25px; font-family: var(--font-accent); font-size:2.2rem;">6. Carga Física y Estilo de Vida</h2>
            <div class="exp-input-group" style="background:rgba(242,201,76,0.05); padding:25px; border-radius:15px; border:1px solid rgba(242,201,76,0.2);">
                <label style="font-size:1rem;">Nivel de Estrés Psicológico / Laboral Percibido (0-10)</label>
                <input type="range" min="0" max="10" value="${this.formData.habitos.estres}" oninput="document.getElementById('lvl-est').innerText=this.value; ExpedienteEngine.updateData('habitos', 'estres', this.value)" style="width:100%; accent-color:var(--valtara-oro); margin-top:15px;">
                <div id="lvl-est" style="text-align:center; color:var(--valtara-oro); font-size:3rem; font-weight:900; margin-top:20px;">${this.formData.habitos.estres}</div>
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

        let accHTML = this.accessibilityDict.map(i => this.buildGridToggleCard('array', i.label, 'accessibility', 'profile', i.label, i.icon, 'active')).join('');
        let ajsHTML = this.ajustesDict.map(i => this.buildGridToggleCard('stringArray', i.label, 'accessibility', 'supports', i.label, 'fa-check', 'active')).join('');
        html += this.buildStep(7, `
            <h2 style="color: var(--valtara-cian-brillante); margin-bottom: 10px; font-family: var(--font-accent); font-size:2.2rem;">7. Inclusión y Accesibilidad</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:25px; line-height:1.6;">Garantizar su dignidad y comodidad es nuestra prioridad. Por favor, infórmenos si requiere algún tipo de apoyo o ajuste para su visita.</p>
            <h3 style="color:white; font-size:1.4rem; margin-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">Situaciones o Necesidades Especiales:</h3>
            <div class="a11y-grid" style="margin-bottom:30px;">${accHTML}</div>
            <h3 style="color:white; font-size:1.4rem; margin-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">Ajustes Razonables Sugeridos:</h3>
            <div class="a11y-grid">${ajsHTML}</div>
        `);

        html += this.buildStep(8, `
            <h2 style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.2rem;">8. Observaciones Adicionales</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:20px;">Utilice este espacio para comunicarle a su terapeuta cualquier inquietud, trauma físico pasado, o recomendación específica antes de iniciar su sesión.</p>
            ${this.buildInput('textarea', 'Información extra relevante:', 'extra', null, 'Ej. "Me operaron la rodilla hace 5 años", "No me gusta que me toquen los pies", "Prefiero música de naturaleza"...')}
        `);

        html += this.buildStep(9, `
            <h2 style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.2rem;">9. Revisión Maestra</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:25px;">Por favor, verifique que la información esencial sea correcta antes de proceder al cifrado criptográfico del documento.</p>
            <div style="display:flex; flex-direction:column; gap:15px; background: rgba(255,255,255,0.02); padding: 25px; border-radius: 20px; border: 1px solid rgba(242,201,76,0.3);">
                ${this.buildReviewRow('1. Identidad', `<strong>Ejecutivo:</strong> ${this.formData.personal.fullName || '<span style="color:#ff5555;">[Falta Nombre]</span>'}<br><strong>CURP:</strong> ${this.formData.personal.curp || '[Falta CURP]'}`, 1)}
                ${this.buildReviewRow('3. Zonas de Tensión', `${this.formData.zonas.length > 0 ? this.formData.zonas.join(', ') : 'Ninguna zona seleccionada'}`, 3)}
                ${this.buildReviewRow('6. Nivel de Estrés', `<strong>${this.formData.habitos.estres} / 10</strong>`, 6)}
                <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:10px 0;">
                <p style="color:#aaa; font-size:1rem; margin:0;">Si detecta un error en cualquier sección, presione el botón "Editar".</p>
            </div>
        `);

        html += this.buildStep(10, `
            <h2 style="color: var(--valtara-oro); margin-bottom: 20px; font-family: var(--font-accent); font-size:2.2rem;">10. Certificación y Firma</h2>
            
            <div style="background: rgba(255,255,255,0.02); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 4px solid var(--valtara-cian-brillante);">
                <p style="color:#ddd; font-size:1rem; margin-bottom:15px; text-align:justify; line-height:1.6;"><strong>Aviso de Privacidad (ARCO):</strong> Sus datos de salud son considerados sensibles. Serán almacenados de forma encriptada en la memoria local de su dispositivo.</p>
                <p style="color:#ddd; font-size:1rem; margin-bottom:0; text-align:justify; line-height:1.6;"><strong>Declaración de Verdad:</strong> Maniﬁesto bajo protesta de decir verdad que la información compartida es veraz. Entiendo que ocultar condiciones de salud graves exime de responsabilidad técnica a Grupo Gevizz S.A.S.</p>
            </div>
            
            <button type="button" onclick="ExpedienteEngine.toggleLegalTruth(this)" class="a11y-grid-btn ${this.formData.legal.truthOath ? 'active' : ''}" role="switch" aria-pressed="${this.formData.legal.truthOath}" style="margin-bottom:30px; border-color:${this.formData.legal.truthOath ? 'var(--valtara-cian-brillante)' : 'rgba(255,255,255,0.2)'};">
                <div class="a11y-btn-header">
                    <i class="fa-solid fa-file-contract" style="font-size:2.5rem; color:${this.formData.legal.truthOath ? 'var(--valtara-cian-brillante)' : '#888'};"></i>
                    <span class="a11y-btn-title" style="font-size:1.2rem;">Acuerdo Legal de Privacidad y Veracidad</span>
                </div>
                <span class="a11y-btn-desc">He leído los términos. Autorizo mi terapia y el procesamiento local de mis datos sensibles.</span>
                <div class="a11y-status-badge" style="${this.formData.legal.truthOath ? 'background:rgba(0,255,255,0.1); color:var(--valtara-cian-brillante); font-size:1rem;' : 'font-size:1rem;'}">${this.formData.legal.truthOath ? '✅ TÉRMINOS ACEPTADOS' : '◻️ Sin aceptar'}</div>
            </button>

            <div style="background: rgba(242,201,76,0.05); border:1px solid rgba(242,201,76,0.3); padding:30px; border-radius:20px; text-align:center;">
                <h3 style="color:var(--valtara-oro); margin-top:0; font-size:1.4rem; text-transform:uppercase;">Identidad Biométrica</h3>
                <p style="color:#aaa; font-size:1.05rem; margin-bottom:25px;">Requerimos su firma autógrafa para certificar el documento y otorgarle validez médica y legal.</p>
                
                <div id="firma-preview-container" style="display:${this.formData.legal.signatureData ? 'block' : 'none'}; margin-bottom:25px;">
                    <p style="color:#fff; font-size:0.9rem; text-transform:uppercase; letter-spacing:2px; margin-bottom:10px;">Su Firma Digitalizada:</p>
                    <img id="firma-preview-img" src="${this.formData.legal.signatureData || ''}" style="max-width:100%; height:150px; background:white; border-radius:12px; padding:10px; border:3px solid var(--valtara-oro);">
                </div>

                <button onclick="ExpedienteEngine.openSignaturePad()" style="background:var(--valtara-oro); color:black; border:none; padding:18px 30px; border-radius:15px; font-weight:900; font-size:1.2rem; cursor:pointer; width:100%; max-width:450px; margin:0 auto; display:flex; justify-content:center; align-items:center; gap:12px; box-shadow: 0 10px 25px rgba(242,201,76,0.4); transition:0.3s;">
                    <i class="fa-solid fa-pen-nib"></i> ${this.formData.legal.signatureData ? 'VOLVER A FIRMAR' : 'ABRIR PANEL DE FIRMA AUTÓGRAFA'}
                </button>
            </div>
        `);

        content.innerHTML = html;
        this.updateUI();
    },

    // ====================================================================
    // MOTOR DE CUADRÍCULAS ACCESIBLES (A11y Grid Buttons Robustos)
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

    buildReviewRow: function(title, content, targetStep) {
        return `
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem; display: flex; justify-content: space-between; align-items: flex-start; gap: 15px;">
                <div>
                    <h4 style="color: var(--valtara-oro); font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">${title}</h4>
                    <p style="color: #ddd; font-size: 1.05rem; margin:0; line-height: 1.6; font-weight: 300;">${content}</p>
                </div>
                <button type="button" onclick="ExpedienteEngine.goToStep(${targetStep})" style="background: rgba(242,201,76,0.1); border: 1px solid var(--valtara-oro); color: var(--valtara-oro); padding: 8px 18px; border-radius: 12px; cursor: pointer; font-size: 0.85rem; font-weight: bold; flex-shrink: 0; text-transform:uppercase; transition:0.3s;">Editar</button>
            </div>
        `;
    },

    // El nuevo constructor de botones para la cuadrícula
    buildGridToggleCard: function(type, label, path1, path2, val, icon, colorTheme, desc = '') {
        let isChecked = false;
        if (type === 'array') {
            const arr = path2 ? this.formData[path1][path2] : this.formData[path1];
            isChecked = arr.includes(val);
        } else if (type === 'boolean') {
            isChecked = this.formData[path1][path2][val] === true;
        } else if (type === 'stringArray') {
            const str = this.formData[path1][path2] || "";
            isChecked = str.split(', ').includes(val);
        }

        const activeClass = isChecked ? `active ${colorTheme}` : '';
        const colorVar = colorTheme === 'danger' ? '#ff5555' : (colorTheme === 'warning' ? 'var(--valtara-oro)' : 'var(--valtara-cian-brillante)');
        const iconColor = isChecked ? colorVar : '#888';
        const badgeBg = isChecked ? `rgba(${colorTheme==='danger'?'255,85,85':(colorTheme==='warning'?'242,201,76':'0,255,255')}, 0.1)` : 'rgba(255,255,255,0.05)';
        const badgeColor = isChecked ? colorVar : '#888';
        const badgeText = isChecked ? '✅ SELECCIONADO' : '◻️ Sin seleccionar';

        return `
        <button type="button" class="a11y-grid-btn ${activeClass}" role="switch" aria-pressed="${isChecked}" onclick="ExpedienteEngine.toggleGridItem(this, '${type}', '${path1}', '${path2 || ''}', '${val}', '${label}', '${colorTheme}')">
            <div class="a11y-btn-header">
                <i class="fa-solid ${icon} icon-elem" style="font-size:2.2rem; color:${iconColor}; transition:0.3s;"></i>
                <span class="a11y-btn-title">${label}</span>
            </div>
            ${desc ? `<span class="a11y-btn-desc">${desc}</span>` : ''}
            <div class="a11y-status-badge" style="background:${badgeBg}; color:${badgeColor};">${badgeText}</div>
        </button>`;
    },

    toggleGridItem: function(btn, type, path1, path2, val, label, colorTheme) {
        let isChecked = false;
        
        // Manipulación de datos segura
        if (type === 'array') {
            let arr = path2 ? this.formData[path1][path2] : this.formData[path1];
            const idx = arr.indexOf(val);
            if(idx > -1) { arr.splice(idx, 1); isChecked = false; }
            else { arr.push(val); isChecked = true; }
        } else if (type === 'boolean') {
            this.formData[path1][path2][val] = !this.formData[path1][path2][val];
            isChecked = this.formData[path1][path2][val];
        } else if (type === 'stringArray') {
            let str = this.formData[path1][path2] || "";
            let arr = str.split(', ').filter(i => i.trim() !== "");
            const idx = arr.indexOf(val);
            if(idx > -1) { arr.splice(idx, 1); isChecked = false; }
            else { arr.push(val); isChecked = true; }
            this.formData[path1][path2] = arr.join(', ');
        }
        this.saveData();

        // Cambio visual instantáneo (Sin redibujar toda la pantalla)
        const colorVar = colorTheme === 'danger' ? '#ff5555' : (colorTheme === 'warning' ? 'var(--valtara-oro)' : 'var(--valtara-cian-brillante)');
        const badgeBg = isChecked ? `rgba(${colorTheme==='danger'?'255,85,85':(colorTheme==='warning'?'242,201,76':'0,255,255')}, 0.1)` : 'rgba(255,255,255,0.05)';
        
        btn.setAttribute('aria-pressed', isChecked);
        const iconElem = btn.querySelector('.icon-elem');
        const badgeElem = btn.querySelector('.a11y-status-badge');

        if(isChecked) {
            btn.classList.add('active');
            if(colorTheme) btn.classList.add(colorTheme);
            iconElem.style.color = colorVar;
            badgeElem.style.background = badgeBg;
            badgeElem.style.color = colorVar;
            badgeElem.innerText = '✅ SELECCIONADO';
        } else {
            btn.classList.remove('active', colorTheme);
            iconElem.style.color = '#888';
            badgeElem.style.background = 'rgba(255,255,255,0.05)';
            badgeElem.style.color = '#888';
            badgeElem.innerText = '◻️ Sin seleccionar';
        }
        this.announceA11y(`${label} ${isChecked ? 'ha sido seleccionado' : 'ha sido deseleccionado'}`);
    },

    toggleLegalTruth: function(btn) {
        this.formData.legal.truthOath = !this.formData.legal.truthOath;
        this.saveData();
        
        const isChecked = this.formData.legal.truthOath;
        btn.setAttribute('aria-pressed', isChecked);
        const iconElem = btn.querySelector('.fa-file-contract');
        const badgeElem = btn.querySelector('.a11y-status-badge');

        if(isChecked) {
            btn.classList.add('active');
            btn.style.borderColor = 'var(--valtara-cian-brillante)';
            iconElem.style.color = 'var(--valtara-cian-brillante)';
            badgeElem.style.background = 'rgba(0,255,255,0.1)';
            badgeElem.style.color = 'var(--valtara-cian-brillante)';
            badgeElem.innerText = '✅ TÉRMINOS ACEPTADOS';
        } else {
            btn.classList.remove('active');
            btn.style.borderColor = 'rgba(255,255,255,0.2)';
            iconElem.style.color = '#888';
            badgeElem.style.background = 'rgba(255,255,255,0.05)';
            badgeElem.style.color = '#888';
            badgeElem.innerText = '◻️ Sin aceptar';
        }
        this.announceA11y(`Acuerdo legal ${isChecked ? 'aceptado' : 'revocado'}`);
        this.updateSubmitButton();
    },

    updateData: function(cat, key, val) {
        if(key) this.formData[cat][key] = val;
        else this.formData[cat] = val;
        this.saveData();
    },

    // ====================================================================
    // PANEL DE FIRMA AISLADO Y TÁCTIL (Modal Dedicado y Congelado)
    // ====================================================================
    openSignaturePad: function() {
        const modal = document.getElementById('signature-modal');
        modal.classList.add('active');
        
        // Inicializar o resetear el canvas al abrir
        const canvas = document.getElementById('sig-canvas');
        this.signaturePad = canvas;
        const ctx = canvas.getContext('2d');
        
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#050508';
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0, canvas.width, canvas.height);

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const startPos = (e) => { e.preventDefault(); this.isDrawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
        const draw = (e) => { if(!this.isDrawing) return; e.preventDefault(); const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
        const endPos = (e) => { if(e) e.preventDefault(); this.isDrawing = false; };

        const clone = canvas.cloneNode(true);
        canvas.parentNode.replaceChild(clone, canvas);
        this.signaturePad = document.getElementById('sig-canvas');
        const newCtx = this.signaturePad.getContext('2d');
        newCtx.lineWidth = 4; newCtx.lineCap = 'round'; newCtx.strokeStyle = '#050508';
        newCtx.fillStyle = '#fff'; newCtx.fillRect(0,0, this.signaturePad.width, this.signaturePad.height);

        this.signaturePad.addEventListener('mousedown', startPos);
        this.signaturePad.addEventListener('mousemove', draw);
        this.signaturePad.addEventListener('mouseup', endPos);
        this.signaturePad.addEventListener('mouseout', endPos);
        this.signaturePad.addEventListener('touchstart', startPos, {passive: false});
        this.signaturePad.addEventListener('touchmove', draw, {passive: false});
        this.signaturePad.addEventListener('touchend', endPos, {passive: false});
        
        this.announceA11y("Panel de firma autógrafa abierto. Dibuje su firma en el recuadro blanco.");
    },

    closeSignaturePad: function(save) {
        const modal = document.getElementById('signature-modal');
        modal.classList.remove('active');
        
        if(save) {
            if(this.isCanvasBlank()) {
                alert("El lienzo está vacío. Por favor, dibuje su firma.");
                return;
            }
            // Guardar con fondo transparente para que se vea genial en el PDF
            this.formData.legal.signatureData = this.signaturePad.toDataURL('image/png');
            this.saveData();
            
            document.getElementById('firma-preview-container').style.display = 'block';
            document.getElementById('firma-preview-img').src = this.formData.legal.signatureData;
            
            // Cambiar el texto del botón
            const btnOpenSig = document.querySelector('#exp-step-10 button[onclick="ExpedienteEngine.openSignaturePad()"]');
            if(btnOpenSig) btnOpenSig.innerHTML = '<i class="fa-solid fa-pen-nib"></i> VOLVER A FIRMAR';

            this.announceA11y("Firma guardada exitosamente.");
            this.updateSubmitButton();
        }
    },

    clearCanvas: function() {
        if(!this.signaturePad) return;
        const ctx = this.signaturePad.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, this.signaturePad.width, this.signaturePad.height);
        this.announceA11y("Lienzo de firma borrado. Puede volver a firmar.");
    },

    isCanvasBlank: function() {
        const blank = document.createElement('canvas');
        blank.width = this.signaturePad.width;
        blank.height = this.signaturePad.height;
        const ctx = blank.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0, blank.width, blank.height);
        return this.signaturePad.toDataURL() === blank.toDataURL();
    },

    // ====================================================================
    // FLUJO GENERAL Y DATOS
    // ====================================================================
    bindEvents: function() {
        const overlay = document.getElementById('expediente-overlay');
        const btnClose = document.getElementById('exp-close');
        const btnNext = document.getElementById('exp-btn-next');
        const btnPrev = document.getElementById('exp-btn-prev');
        const btnSubmit = document.getElementById('exp-btn-submit');

        if(btnClose) btnClose.addEventListener('click', () => overlay.classList.remove('active'));

        btnNext.addEventListener('click', () => {
            if(this.currentStep === 1 && (!this.formData.personal.fullName)) { 
                alert("Por favor, ingrese amablemente su Nombre Completo para generar el documento."); 
                this.announceA11y("Error: Nombre completo requerido.");
                return; 
            }
            if(this.currentStep < this.totalSteps - 1) { 
                this.currentStep++; 
                this.renderWizard(); 
                this.announceA11y(`Fase ${this.currentStep + 1} cargada.`);
            }
        });
        
        btnPrev.addEventListener('click', () => {
            if(this.currentStep > 0) { 
                this.currentStep--; 
                this.renderWizard(); 
                this.announceA11y(`Fase ${this.currentStep + 1} cargada.`);
            }
        });

        btnSubmit.addEventListener('click', () => {
            this.generatePDF();
        });
    },

    goToStep: function(stepIdx) {
        this.currentStep = stepIdx;
        this.renderWizard();
    },

    updateUI: function() {
        document.getElementById('wizard-step-text').innerText = `Fase ${this.currentStep + 1} de ${this.totalSteps}`;
        document.getElementById('wizard-percent-text').innerText = `${Math.round((this.currentStep / (this.totalSteps - 1)) * 100)}%`;
        document.getElementById('exp-progress').style.width = `${(this.currentStep / (this.totalSteps - 1)) * 100}%`;

        // Subir el scroll automáticamente en cada cambio de paso
        const content = document.getElementById('exp-wizard-content');
        if (content) content.scrollTop = 0;

        const btnPrev = document.getElementById('exp-btn-prev');
        if(this.currentStep > 0) {
            btnPrev.style.visibility = 'visible';
            btnPrev.style.display = 'flex';
        } else {
            btnPrev.style.visibility = 'hidden';
        }

        const isLast = this.currentStep === this.totalSteps - 1;
        document.getElementById('exp-btn-next').style.display = isLast ? 'none' : 'flex';
        document.getElementById('exp-btn-submit').style.display = isLast ? 'flex' : 'none';
        
        if(isLast) this.updateSubmitButton();
    },

    updateSubmitButton: function() {
        const btnSubmit = document.getElementById('exp-btn-submit');
        if(!btnSubmit) return;
        
        if(this.formData.legal.truthOath && this.formData.legal.signatureData) {
            btnSubmit.disabled = false;
            btnSubmit.style.background = "linear-gradient(135deg, #00b09b, #00796b)";
            btnSubmit.style.color = "white";
            btnSubmit.innerHTML = '<i class="fa-solid fa-fingerprint"></i> Certificar Expediente';
        } else {
            btnSubmit.disabled = true;
            btnSubmit.style.background = "#444";
            btnSubmit.style.color = "#888";
            btnSubmit.innerHTML = '<i class="fa-solid fa-lock"></i> Firma o Acuerdo Pendiente';
        }
    },

    saveData: function() {
        this.formData.fechaStamp = new Date().getTime();
        localStorage.setItem('valtara_expediente', JSON.stringify(this.formData));
    },

    loadData: function() {
        try {
            const saved = localStorage.getItem('valtara_expediente');
            if(saved) {
                const parsed = JSON.parse(saved);
                // Validador de Anti-Crasheo. Si es una versión vieja, destruye y resetea.
                if(parsed.clinical && parsed.clinical.cardio) {
                    console.warn("Valtara: Base de datos vieja detectada. Reseteando al esquema V29.5...");
                    localStorage.removeItem('valtara_expediente');
                    return;
                }
                this.formData = parsed;
            }
        } catch(e) {
            localStorage.removeItem('valtara_expediente');
        }
    },

    // ====================================================================
    // MOTOR PDF MULTI-HOJA DE ALTA SEGURIDAD (V29.5)
    // ====================================================================
    generatePDF: function() {
        const d = this.formData;
        const nombre = d.personal.fullName || 'Paciente';
        const iniciales = nombre.split(' ').map(n => n[0]).join('').substring(0,3).toUpperCase();
        
        const dateObj = new Date();
        const folioStr = `${dateObj.getFullYear()}${(dateObj.getMonth()+1).toString().padStart(2,'0')}${dateObj.getDate().toString().padStart(2,'0')}`;
        const horaStr = `${dateObj.getHours().toString().padStart(2,'0')}${dateObj.getMinutes().toString().padStart(2,'0')}`;
        const folioReal = `FOLIO-${iniciales}-${folioStr}-${horaStr}`;
        const hash = "SHA256-" + Math.random().toString(36).substr(2, 16).toUpperCase() + Math.random().toString(36).substr(2, 16).toUpperCase();

        let clinicaHTML = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let activos = [];
            category.items.forEach(item => { if(d.clinical[catKey] && d.clinical[catKey][item.id]) activos.push(item.label); });
            if(activos.length > 0) clinicaHTML += `<div style="margin-bottom:8px; border-left:4px solid #c62828; padding-left:12px; background:#fffafa; padding:8px; border-radius:4px;"><strong>${category.title}:</strong> <span style="color:#c62828; font-weight:900;">${activos.join(', ')}</span></div>`;
        }
        if(clinicaHTML === '') clinicaHTML = '<div style="color:#2e7d32; font-weight:bold; background:#e8f5e9; padding:10px; border-radius:5px;">El paciente no reportó ninguna condición médica diagnosticada.</div>';

        const pCSS = `width: 8.5in; height: 10.7in; padding: 0.5in 0.6in; background: white; font-family: 'Lato', sans-serif; color: #111; font-size: 13px; position: relative; box-sizing: border-box; overflow: hidden;`;
        
        // Marca de agua ultra-segura (Z-index negativo para no tapar texto)
        const watermark = `
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; opacity:0.04; z-index:-1; pointer-events:none; width:100%;">
                <img src="logo.png" style="width:300px; height:auto; margin-bottom:20px; filter:grayscale(100%);">
                <h1 style="font-size:110px; font-family:'Playfair Display',serif; margin:0; letter-spacing:15px;">VALTARA</h1>
            </div>
            <div style="position:absolute; top:25px; left:25px; font-size:7px; color:#999; font-family:monospace; z-index:-1;">DOC. OFICIAL | G. GEVIZZ S.A.S. | ${folioReal}</div>
            <div style="position:absolute; top:25px; right:25px; font-size:7px; color:#999; font-family:monospace; z-index:-1;">VERIFICACIÓN: ${hash.substr(0,15)}</div>
            <div style="position:absolute; bottom:25px; left:25px; font-size:7px; color:#999; font-family:monospace; z-index:-1;">COPIA SOBERANA DEL PACIENTE</div>
            <div style="position:absolute; bottom:25px; right:25px; font-size:7px; color:#999; font-family:monospace; z-index:-1;">${new Date().toLocaleString()}</div>
        `;

        const header = (title, pageNum) => `
            <div style="border-bottom: 4px double #050508; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-end; position:relative; z-index:2;">
                <div style="display:flex; align-items:center; gap:15px;">
                    <img src="logo.png" style="width:45px; height:45px; filter:brightness(0%);">
                    <div>
                        <h1 style="font-family: 'Playfair Display', serif; color: #050508; margin: 0; font-size: 26px; font-weight:900; letter-spacing:1px;">VALTARA</h1>
                        <p style="color: #444; font-size: 9px; margin: 0; letter-spacing: 4px; font-weight:bold;">EXECUTIVE THERAPY</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: 900; color: #000; font-size:15px; text-transform:uppercase;">${title}</p>
                    <p style="margin: 2px 0 0 0; font-size: 11px; color:#555;">Folio Único: <strong>${folioReal}</strong></p>
                    <p style="margin: 0; font-size: 10px; color:#555;">Página ${pageNum} de 4</p>
                </div>
            </div>
        `;

        const titleBox = (t) => `<h3 style="color:#000; background:#f5f5f5; padding:12px 15px; border-left:6px solid #D4AF37; margin: 25px 0 15px 0; font-size:15px; text-transform:uppercase; font-weight:900; letter-spacing:1px; z-index:2; position:relative;">${t}</h3>`;
        const renderRow = (lbl, val) => `<div style="margin-bottom:8px; z-index:2; position:relative; display:flex; border-bottom:1px solid #f0f0f0; padding-bottom:6px;"><strong style="width:190px; color:#333; font-size:12px;">${lbl}:</strong> <span style="flex:1; color:#000; font-size:13px;">${val || '---'}</span></div>`;

        const pdfContent = document.createElement('div');
        
        // HOJA 1
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

        // HOJA 2
        pdfContent.innerHTML += `
            <div style="${pCSS}">
                ${watermark}
                ${header("Historia Clínica - Triaje Físico", 2)}
                ${titleBox("3. Mapa de Tensión y Dolor")}
                <div style="padding:10px 20px;">
                    ${renderRow('Zonas Afectadas', d.zonas.join(', ') || 'Ninguna reportada')}
                    <div style="margin: 20px 0; padding:20px; border:2px solid #ffcdd2; background:#fffafa; border-radius:8px;">
                        <div style="margin-bottom:10px; font-size:14px;"><strong>Sensación Descrita:</strong> ${d.dolorDetalle.sensacion}</div>
                        <div style="margin-bottom:10px; font-size:14px;"><strong>Intensidad Declarada:</strong> <span style="font-size:22px; font-weight:900; color:#c62828;">${d.dolorDetalle.intensidad} / 10</span></div>
                        <div style="margin-bottom:10px; font-size:13px;"><strong>Evolución:</strong> ${d.dolorDetalle.desde}</div>
                        <div style="margin-bottom:10px; font-size:13px;"><strong>Frecuencia:</strong> ${d.dolorDetalle.constante}</div>
                        <div style="margin-bottom:10px; font-size:13px;"><strong>Agravantes:</strong> ${d.dolorDetalle.empeora}</div>
                        <div style="font-size:13px;"><strong>Atenuantes:</strong> ${d.dolorDetalle.alivia}</div>
                    </div>
                </div>
                ${titleBox("4. Antecedentes Médicos Relevantes")}
                <div style="padding:15px 20px; background:#fdfdfd; border:1px solid #ddd; border-radius:8px;">
                    <p style="font-size:11px; color:#555; margin-top:0; font-style:italic;">* Declaración del paciente bajo protesta de decir verdad:</p>
                    ${clinicaHTML}
                </div>
            </div>
            <div class="html2pdf__page-break"></div>
        `;

        // HOJA 3
        pdfContent.innerHTML += `
            <div style="${pCSS}">
                ${watermark}
                ${header("Historia Clínica - Hábitos y Apoyo", 3)}
                ${titleBox("5. Estilo de Vida y Carga Biomecánica")}
                <div style="padding:10px 20px;">
                    ${renderRow('Estrés Psicológico / Laboral', `<span style="font-weight:900; font-size:18px; color:#000;">${d.habitos.estres} / 10</span>`)}
                    ${renderRow('Calidad del Sueño', d.habitos.suenoCalidad)}
                    ${renderRow('Horas de Sueño', d.habitos.suenoHoras)}
                    ${renderRow('Trabajo Prolongado Sentado', d.habitos.sentado)}
                    ${renderRow('Trabajo Prolongado de Pie', d.habitos.pie)}
                    ${renderRow('Esfuerzo Físico Constante', d.habitos.carga)}
                    ${renderRow('Deporte Alto Impacto', d.habitos.deporte)}
                </div>
                ${titleBox("6. Accesibilidad e Inclusión")}
                <div style="padding:15px 20px; border-left:6px solid #0288d1; background:#f1f9ff; border-radius:0 8px 8px 0;">
                    ${renderRow('Apoyos Específicos Requeridos', d.accessibility.profile.join(', ') || 'Ninguno reportado')}
                    ${renderRow('Ajustes Razonables Solicitados', d.accessibility.supports || 'Ninguno reportado')}
                </div>
                ${titleBox("7. Observaciones Adicionales")}
                <div style="padding:20px; font-style:italic; border:1px solid #ccc; background:#fafafa; border-radius:8px; font-size:14px; color:#444;">
                    "${d.extra || 'El paciente no refirió observaciones adicionales o notas específicas para el terapeuta.'}"
                </div>
            </div>
            <div class="html2pdf__page-break"></div>
        `;

        // HOJA 4
        pdfContent.innerHTML += `
            <div style="${pCSS}">
                ${watermark}
                ${header("Marco Legal y Firmas", 4)}
                ${titleBox("8. Consentimiento Informado (ARCO)")}
                <div style="font-size:12px; text-align:justify; line-height:1.6; color:#111; padding:20px; border:2px solid #050508; border-radius:8px; background:#fafafa;">
                    <p style="margin-top:0;"><strong>DECLARACIÓN DE VERDAD Y RESPONSABILIDAD:</strong> Maniﬁesto bajo protesta de decir verdad que la información contenida en este expediente (Folio ${folioReal}) es veraz. Entiendo categóricamente que la atención brindada por Grupo Gevizz S.A.S. de C.V. corresponde a masoterapia clínica, terapia manual y valoración funcional, y de ninguna manera sustituye un diagnóstico ni tratamiento médico alópata.</p>
                    <p>He sido debidamente informado de que omitir dolencias agudas, infecciones, cirugías recientes, embarazos, uso de anticoagulantes o presencia de patologías severas (como trombosis) compromete gravemente mi integridad física, deslindando absolutamente a la empresa y al terapeuta a cargo de cualquier responsabilidad derivada de dicha omisión.</p>
                    <p style="margin-bottom:0;"><strong>AVISO DE PRIVACIDAD:</strong> Autorizo que mis datos de salud (sensibles) sean recabados y resguardados en mi dispositivo local, para fines exclusivos de mi atención terapéutica, seguimiento de seguridad y control interno, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
                </div>

                <div style="margin-top: 50px; display: flex; justify-content: space-between;">
                    <div style="width: 45%; text-align: center;">
                        <img src="${d.legal.signatureData}" style="max-width:100%; height:100px; object-fit:contain; border-bottom:2px solid #000; margin-bottom:5px;">
                        <p style="margin:0; font-size:12px; font-weight:900; text-transform:uppercase;">Firma Digital Autógrafa</p>
                        <p style="margin:2px 0 0 0; font-size:11px;">${nombre}</p>
                        <p style="margin:2px 0 0 0; font-size:10px; color:#555;">(El Paciente)</p>
                    </div>
                    <div style="width: 45%; text-align: center;">
                        <div style="height:100px; border-bottom:2px solid #000; margin-bottom:5px; display:flex; align-items:end; justify-content:center; color:#999; font-size:10px; font-style:italic; padding-bottom:5px;">
                            (Sello y firma a la recepción del documento)
                        </div>
                        <p style="margin:0; font-size:12px; font-weight:900; text-transform:uppercase;">El Terapeuta Clínico</p>
                        <p style="margin:2px 0 0 0; font-size:11px; color:#000; font-weight:900;">Ángel de Jesús Guerrero Vizzuett</p>
                        <p style="margin:2px 0 0 0; font-size:10px; color:#555;">Se entregará copia física o digital firmada.</p>
                    </div>
                </div>

                <div style="margin-top: 60px; background:#050508; color:white; padding:25px; border-radius:8px; border-left:10px solid #D4AF37;">
                    <p style="margin:0 0 10px 0; color:#D4AF37; font-weight:900; text-transform:uppercase; font-size:13px; letter-spacing:1px;">Aval y Certificaciones de Práctica Profesional:</p>
                    <ul style="margin:0; padding-left:20px; font-size:12px; line-height:1.6; color:#eee;">
                        <li><strong>Terapeuta Físico para la Salud</strong>, Especialidad en Masoterapia Clínica.</li>
                        <li>Registro Nacional de Terapeutas <strong>(RENATED): A-54878</strong>.</li>
                        <li>Secretaría de Educación Pública <strong>(SEP DGCFT): RVOE 17FT061</strong>.</li>
                        <li>Acreditación Institucional Sistema de Salud y Educación <strong>(SISAE)</strong>.</li>
                    </ul>
                </div>
                
                <div style="margin-top:20px; text-align:center;">
                    <p style="font-family:monospace; font-size:10px; color:#555; word-break:break-all;"><strong>SELLO CRIPTOGRÁFICO DE TIEMPO:</strong> ${hash}</p>
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

        document.getElementById('exp-btn-prev').style.display = 'none';
        const btnSubmit = document.getElementById('exp-btn-submit');
        btnSubmit.style.display = 'none';
        const loader = document.getElementById('exp-loader');
        loader.style.display = 'block';

        this.announceA11y("Iniciando cifrado y generación del documento PDF de 4 páginas.");

        if (typeof html2pdf !== 'undefined') {
            setTimeout(() => {
                html2pdf().set(opt).from(pdfContent).save().then(() => {
                    loader.innerHTML = '<i class="fa-solid fa-check"></i> EXPEDIENTE DESCARGADO';
                    loader.style.color = '#00b09b';
                    this.announceA11y("Documento generado con éxito. Abriendo WhatsApp para envío.");
                    
                    const mensaje = `*Aura Assistant (Valtara)* 🌿%0A%0AHe concluido el llenado y certificación de mi Historia Clínica.%0A%0A*Paciente:* ${nombre}%0A*Folio:* ${folioReal}%0A*Estrés Biomecánico:* ${d.habitos.estres}/10%0A%0A_A continuación adjunto el PDF de 4 páginas debidamente firmado para revisión del Terapeuta Titular._`;
                    
                    setTimeout(() => {
                        document.getElementById('expediente-overlay').classList.remove('active');
                        window.open(`https://wa.me/5213348572070?text=${mensaje}`, '_blank');
                        setTimeout(() => { 
                            loader.style.display = 'none'; 
                            loader.innerHTML = '<i class="fa-solid fa-lock fa-fade"></i> CIFRANDO DOCUMENTO...';
                            loader.style.color = 'var(--valtara-cian-brillante)';
                            btnSubmit.style.display = 'flex';
                            document.getElementById('exp-btn-prev').style.display = 'flex';
                        }, 1000); 
                    }, 2500);
                }).catch(err => {
                    console.error(err);
                    loader.innerHTML = "Error al generar PDF";
                    loader.style.color = "red";
                    btnSubmit.style.display = 'flex';
                });
            }, 1500);
        } else {
            alert("Error: Herramienta PDF bloqueada. Actualice la página.");
            btnSubmit.style.display = 'flex';
            loader.style.display = 'none';
        }
    }
};

window.addEventListener('DOMContentLoaded', () => ExpedienteEngine.init());
