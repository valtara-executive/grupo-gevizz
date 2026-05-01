/**
 * ====================================================================================
 * BLOQUE 10: EXPEDIENTE CLÍNICO SOBERANO V37.0-OPTIMIZED "MOTOR VECTORIAL BANCARIO"
 * Renderizado PDF por Coordenadas Matemáticas (jsPDF Nativo), Textos Seleccionables,
 * Auto-Paginación Dinámica Inteligente, Fondo Oscuro Puro, Firma Tinta Oro.
 * VERSIÓN OPTIMIZADA: Zero Device Throttling | Lazy Rendering | Memory Management
 * ====================================================================================
 */

window.ExpedienteEngine = {
    currentStep: 0,
    totalSteps: 11,
    signaturePad: null,
    isDrawing: false,
    
    // ⚡ OPTIMIZACIÓN: Cache de DOM
    _domCache: {},
    _saveTimeoutId: null,
    _renderTimeoutId: null,
    _canvasInitialized: false,
    
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
        legal: { 
            truthOath: false, 
            signatureType: 'drawn', 
            drawnSignature: null, 
            typedSignature: '',
            signatureReason: ''
        },
        fechaStamp: null
    },

    // ⚡ OPTIMIZACIÓN: Usar Set para búsquedas O(1) en lugar de Array
    _zonesSet: new Set(),

    // Mapeo Topográfico de Precisión
    zoneCoordinates: {
        "Cabeza": { view: "front", cx: 50, cy: 8, labelPos: "left" },
        "Mandíbula / ATM": { view: "front", cx: 50, cy: 13, labelPos: "right" },
        "Cuello": { view: "front", cx: 50, cy: 18, labelPos: "left" },
        "Trapecios": { view: "back", cx: 50, cy: 22, labelPos: "right" },
        "Hombro derecho": { view: "front", cx: 35, cy: 24, labelPos: "left" },
        "Hombro izquierdo": { view: "front", cx: 65, cy: 24, labelPos: "right" },
        "Espalda alta": { view: "back", cx: 50, cy: 30, labelPos: "left" },
        "Espalda media": { view: "back", cx: 50, cy: 45, labelPos: "right" },
        "Espalda baja / lumbar": { view: "back", cx: 50, cy: 55, labelPos: "left" },
        "Cadera derecha": { view: "back", cx: 40, cy: 60, labelPos: "left" },
        "Cadera izquierda": { view: "back", cx: 60, cy: 60, labelPos: "right" },
        "Glúteo derecho": { view: "back", cx: 42, cy: 65, labelPos: "left" },
        "Glúteo izquierdo": { view: "back", cx: 58, cy: 65, labelPos: "right" },
        "Brazo derecho": { view: "front", cx: 30, cy: 35, labelPos: "left" },
        "Brazo izquierdo": { view: "front", cx: 70, cy: 35, labelPos: "right" },
        "Codo derecho": { view: "front", cx: 25, cy: 45, labelPos: "left" },
        "Codo izquierdo": { view: "front", cx: 75, cy: 45, labelPos: "right" },
        "Antebrazo derecho": { view: "front", cx: 20, cy: 55, labelPos: "left" },
        "Antebrazo izquierdo": { view: "front", cx: 80, cy: 55, labelPos: "right" },
        "Muñeca derecha": { view: "front", cx: 15, cy: 65, labelPos: "left" },
        "Muñeca izquierda": { view: "front", cx: 85, cy: 65, labelPos: "right" },
        "Mano derecha": { view: "front", cx: 10, cy: 72, labelPos: "left" },
        "Mano izquierda": { view: "front", cx: 90, cy: 72, labelPos: "right" },
        "Pierna derecha": { view: "front", cx: 42, cy: 75, labelPos: "left" },
        "Pierna izquierda": { view: "front", cx: 58, cy: 75, labelPos: "right" },
        "Rodilla derecha": { view: "front", cx: 40, cy: 85, labelPos: "left" },
        "Rodilla izquierda": { view: "front", cx: 60, cy: 85, labelPos: "right" },
        "Tobillo derecho": { view: "front", cx: 40, cy: 95, labelPos: "left" },
        "Tobillo izquierdo": { view: "front", cx: 60, cy: 95, labelPos: "right" },
        "Pie derecho": { view: "front", cx: 38, cy: 98, labelPos: "left" },
        "Pie izquierdo": { view: "front", cx: 62, cy: 98, labelPos: "right" }
    },

    zonasList: [
        "Cabeza", "Mandíbula / ATM", "Cuello", "Trapecios", "Hombro derecho", "Hombro izquierdo", 
        "Espalda alta", "Espalda media", "Espalda baja / lumbar", "Cadera derecha", "Cadera izquierda", 
        "Glúteo derecho", "Glúteo izquierdo", "Brazo derecho", "Brazo izquierdo", "Codo derecho", 
        "Codo izquierdo", "Antebrazo derecho", "Antebrazo izquierdo", "Muñeca derecha", "Muñeca izquierda", 
        "Mano derecha", "Mano izquierda", "Pierna derecha", "Pierna izquierda", "Rodilla derecha", 
        "Rodilla izquierda", "Tobillo derecho", "Tobillo izquierdo", "Pie derecho", "Pie izquierdo"
    ],

    clinicalDict: {
        precauciones: { title: "A. Condiciones y Precauciones Físicas", icon: "fa-shield-heart", items: [
            { id: "do", label: "Dolor Agudo Importante", desc: "Dolor punzante o intenso de inicio reciente que limita severamente el movimiento." },
            { id: "in", label: "Inflamación Visible", desc: "Hinchazón, enrojecimiento o calor en alguna zona del cuerpo." },
            { id: "fi", label: "Fiebre Reciente", desc: "Temperatura corporal elevada en las últimas 48 horas." },
            { id: "if", label: "Infección Activa", desc: "Presencia de virus o bacterias (Ej. gripa, infecciones cutáneas, respiratorias)." },
            { id: "he", label: "Herida Abierta o Sangrado", desc: "Cortes, úlceras, escoriaciones o sangrados no cicatrizados." },
            { id: "hm", label: "Hematomas Frecuentes", desc: "Aparición de moretones con facilidad o sin causa aparente." },
            { id: "tr", label: "Trombosis o sospecha", desc: "Formación de coágulos en venas. Contraindicación CRÍTICA absoluta para masaje profundo." },
            { id: "va", label: "Várices Importantes", desc: "Venas dilatadas prominentes en piernas. Requiere técnica muy superficial." },
            { id: "hp", label: "Hipertensión Arterial", desc: "Presión alta o descompensada. Nos ayuda a moderar las presiones intensas." },
            { id: "ci", label: "Problemas Circulatorios", desc: "Mala circulación, insuficiencia venosa, manos o pies fríos constantemente." },
            { id: "em", label: "Embarazo Actual", desc: "Estado de gestación. Requiere posiciones y cuidados obstétricos especiales." },
            { id: "po", label: "Postparto Reciente", desc: "Recuperación de parto o cesárea en los últimos 6 meses." },
            { id: "cr", label: "Cirugía Reciente", desc: "Cualquier tipo de intervención quirúrgica en el último año." },
            { id: "fr", label: "Fractura o Esguince", desc: "Lesión ósea, luxación o ruptura ligamentaria reciente." },
            { id: "pr", label: "Prótesis o Implantes", desc: "Metales, silicón, implantes dentales, osteosíntesis o marcapasos en el cuerpo." },
            { id: "hd", label: "Hernia Discal", desc: "Desplazamiento de disco intervertebral en la columna cervical, dorsal o lumbar." },
            { id: "ar", label: "Artritis o Artrosis", desc: "Inflamación articular aguda o proceso de desgaste degenerativo crónico." },
            { id: "os", label: "Osteoporosis / Osteopenia", desc: "Pérdida de masa o descalcificación ósea. Riesgo elevado de fractura por presión fuerte." },
            { id: "ne", label: "Neuropatía", desc: "Alteración de sensibilidad nerviosa (hormigueo crónico, entumecimiento, neuropatía diabética)." },
            { id: "ve", label: "Mareos o Vértigo", desc: "Inestabilidad, mareos o vértigo posicional al cambiar de postura rápida." }
        ]},
        medicacion: { title: "B. Medicación Actual", icon: "fa-pills", items: [
            { id: "an", label: "Analgésicos", desc: "Medicamentos para el dolor. Ocultan la sensibilidad real del cuerpo ante el masaje." },
            { id: "ai", label: "Antiinflamatorios", desc: "Medicamentos que reducen la inflamación muscular o articular (AINEs)." },
            { id: "ac", label: "Anticoagulantes", desc: "Medicamentos que diluyen la sangre. Aumentan severamente el riesgo de moretones." },
            { id: "ah", label: "Antihipertensivos", desc: "Fármacos para el control de la presión arterial." },
            { id: "rm", label: "Relajantes Musculares", desc: "Fármacos que disminuyen el tono muscular de forma artificial." },
            { id: "ad", label: "Antidepresivos / Ansiolíticos", desc: "Fármacos reguladores del sistema nervioso central." },
            { id: "in", label: "Insulina / Metabólicos", desc: "Tratamiento diabético u hormonal para afecciones metabólicas." }
        ]},
        alergias: { title: "C. Alergias y Sensibilidad", icon: "fa-hand-dots", items: [
            { id: "ac", label: "Aceites Esenciales", desc: "Alergia cutánea a extractos puros botánicos (lavanda, romero, cítricos, almendras)." },
            { id: "cr", label: "Cremas o Químicos", desc: "Alergia a lociones corporales o productos sintéticos." },
            { id: "fr", label: "Fragancias", desc: "Sensibilidad olfativa o respiratoria severa a aromas fuertes." },
            { id: "la", label: "Látex", desc: "Alergia al contacto con guantes, bandas o materiales elásticos." },
            { id: "fr2", label: "Intolerancia al Frío", desc: "Hipersensibilidad a la crioterapia o compresas heladas." },
            { id: "ca", label: "Intolerancia al Calor", desc: "Hipersensibilidad a la termoterapia (piedras calientes, compresas térmicas)." },
            { id: "pf", label: "Dolor a Presión Fuerte", desc: "El tejido reacciona con dolor intenso o moretones ante el tacto profundo." }
        ]}
    },

    accessibilityDict: [
        { id: "vi", label: "Discapacidad visual", icon: "fa-eye-slash" },
        { id: "au", label: "Discapacidad auditiva", icon: "fa-ear-deaf" },
        { id: "mo", label: "Movilidad reducida", icon: "fa-wheelchair" },
        { id: "ca", label: "Dificultad para caminar", icon: "fa-crutch" },
        { id: "ac", label: "Dificultad para acostarse", icon: "fa-bed" },
        { id: "se", label: "Dificultad para incorporarse", icon: "fa-person-arrow-up-from-line" },
        { id: "ha", label: "Dificultad para comunicarse verbalmente", icon: "fa-comment-slash" },
        { id: "co", label: "Dificultad para entender instrucciones complejas", icon: "fa-brain" },
        { id: "ta", label: "Hipersensibilidad al tacto general", icon: "fa-hand-sparkles" },
        { id: "lu", label: "Sensibilidad extrema a la luz", icon: "fa-lightbulb" },
        { id: "ru", label: "Sensibilidad extrema al ruido", icon: "fa-volume-xmark" },
        { id: "ol", label: "Sensibilidad severa a olores", icon: "fa-spray-can-sparkles" },
        { id: "dp", label: "Dolor severo al cambiar de posición", icon: "fa-arrows-rotate" },
        { id: "pa", label: "Necesidad de pausas constantes", icon: "fa-pause" },
        { id: "am", label: "Requiere ingresar con acompañante de apoyo", icon: "fa-user-group" }
    ],

    ajustesDict: [
        { id: "ex", label: "Brindar explicaciones claras y lentas en todo momento" },
        { id: "ls", label: "Utilizar lenguaje simple, directo y sin tecnicismos" },
        { id: "ap", label: "Brindar apoyo del personal para leer o llenar formatos" },
        { id: "tg", label: "Proporcionar textos impresos más grandes si se requieren" },
        { id: "il", label: "Mantener intensidad de luz baja en cabina" },
        { id: "mr", label: "Mantener ruido ambiente al absoluto mínimo" },
        { id: "mp", label: "Garantizar mayor privacidad visual en todo momento" },
        { id: "as", label: "Brindar apoyo físico constante para subir o bajar de camilla" },
        { id: "cp", label: "Realizar todos los cambios de postura de forma muy gradual" },
        { id: "ip", label: "Aplicar exclusivamente presión terapéutica suave" },
        { id: "em", label: "Evitar tocar zonas específicas previamente marcadas" },
        { id: "pp", label: "Programar pausas regulares durante la sesión" }
    ],

    signatureReasons: [
        "Discapacidad visual / Uso de lector de pantalla (Dificultad espacial)",
        "Discapacidad motriz severa en extremidades superiores",
        "Temblores, Parkinson o condición neurológica que impide el trazo",
        "Falla técnica o incompatibilidad de la pantalla táctil del dispositivo",
        "Preferencia personal de accesibilidad por firma electrónica de texto"
    ],

    init: function() {
        this.injectStyles();
        this.injectModal();
        this.loadData();
        this.bindEvents();
        try {
            this.renderWizard();
        } catch(e) {
            console.error("Valtara Error Silencioso de Render:", e);
            localStorage.removeItem('valtara_expediente');
            this.formData.legal = { truthOath: false, signatureType: 'drawn', drawnSignature: null, typedSignature: '', signatureReason: '' };
            this.renderWizard();
        }
        setTimeout(() => this.checkCentinela(), 3500); 
    },

    // ⚡ OPTIMIZACIÓN: Debounced localStorage save
    saveData: function() {
        this.formData.fechaStamp = new Date().getTime();
        
        clearTimeout(this._saveTimeoutId);
        this._saveTimeoutId = setTimeout(() => {
            try {
                localStorage.setItem('valtara_expediente', JSON.stringify(this.formData));
            } catch(e) {
                console.warn("Error guardando datos:", e);
            }
        }, 500);
    },

    loadData: function() {
        try {
            const saved = localStorage.getItem('valtara_expediente');
            if(saved) {
                const parsed = JSON.parse(saved);
                if(parsed.clinical && parsed.clinical.precauciones) {
                    this.formData = parsed;
                    this._zonesSet = new Set(this.formData.zonas);
                    if(!this.formData.legal.signatureType) this.formData.legal.signatureType = 'drawn';
                } else {
                    console.warn("Valtara: Detectada base de datos clínica antigua. Migrando a esquema V37.0...");
                    this.saveData(); 
                }
            }
        } catch(e) {
            console.error("Error al acceder a LocalStorage:", e);
        }
    },

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

    checkCentinela: function() {
        if(!this.formData.fechaStamp) return;
        const diffDays = (new Date().getTime() - this.formData.fechaStamp) / (1000 * 60 * 60 * 24);
        if(diffDays >= 15) this.showCentinelaAlert();
    },

    showCentinelaAlert: function() {
        if(document.getElementById('centinela-modal')) return;
        const div = document.createElement('div');
        div.id = 'centinela-modal';
        div.style.cssText = "position: fixed; top: 20px; left: 0; right: 0; margin: 0 auto; width: 90%; max-width: 450px; background: rgba(5,5,10,0.98); border: 2px solid var(--valtara-cian-brillante); border-radius: 20px; padding: 30px; z-index: 999999; text-align: center; box-shadow: 0 0 40px rgba(0,255,255,0.2); animation: slideDown 0.4s ease-out;";
        
        div.innerHTML = `
            <i class="fa-solid fa-heart-pulse" style="color: var(--valtara-cian-brillante); font-size: 3rem; margin-bottom: 15px; animation: breathe 2s infinite;"></i>
            <h4 style="color: white; font-family: var(--font-accent); font-size: 1.8rem; margin:0 0 15px 0;">Control Clínico Periódico</h4>
            <p style="color: #ccc; font-size: 1.1rem; margin-bottom: 25px; font-weight: 300; line-height: 1.5;">Han pasado más de 15 días desde su último registro. Por su seguridad técnica, se recomienda actualizar sus datos.</p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="btn-centinela-no" style="background: transparent; border: 1px solid #666; color: #aaa; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-size: 1rem; transition: 0.3s;">Recordar Después</button>
                <button id="btn-centinela-si" style="background: var(--valtara-cian-brillante); border: none; color: black; padding: 12px 24px; border-radius: 25px; font-weight: 900; cursor: pointer; font-size: 1rem; transition: 0.3s;">Actualizar Ahora</button>
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
            this.openOverlay();
        });
    },

    openOverlay: function() {
        const overlay = document.getElementById('expediente-overlay');
        const appWrapper = document.getElementById('app-wrapper');
        
        if(overlay && appWrapper) {
            overlay.classList.add('active');
            appWrapper.setAttribute('aria-hidden', 'true'); 
            overlay.setAttribute('aria-hidden', 'false');
            
            setTimeout(() => {
                const stepTitle = document.getElementById(`exp-step-title-${this.currentStep}`);
                if(stepTitle) stepTitle.focus();
                this.announceA11y("Historia Clínica Soberana iniciada. Navegue hacia abajo para completar los campos.");
            }, 300);
            
            const menu = document.getElementById('main-nav');
            if(menu) menu.classList.remove('open');
        }
    },

    closeOverlay: function() {
        const overlay = document.getElementById('expediente-overlay');
        const appWrapper = document.getElementById('app-wrapper');
        
        if(overlay && appWrapper) {
            overlay.classList.remove('active');
            appWrapper.removeAttribute('aria-hidden');
            overlay.setAttribute('aria-hidden', 'true');
            const btnOpen = document.getElementById('btn-open-expediente');
            if(btnOpen) btnOpen.focus();
        }
    },

    injectStyles: function() {
        if(document.getElementById('valtara-exp-styles')) return;
        const style = document.createElement('style');
        style.id = 'valtara-exp-styles';
        style.innerHTML = `
            .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
            .exp-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(2, 2, 5, 0.97); z-index: 999999; display: none; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
            .exp-overlay.active { display: flex; opacity: 1; }
            .exp-container { width: 95%; max-width: 900px; height: 92vh; background: rgba(15, 15, 20, 0.85); border: 1px solid rgba(242, 201, 76, 0.25); border-radius: 24px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 0 60px rgba(242,201,76,0.1); }
            
            .exp-header { padding: 25px 30px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; background: linear-gradient(180deg, rgba(242,201,76,0.05), rgba(242,201,76,0)); }
            .exp-body { flex: 1; overflow-y: auto; padding: 40px 30px; scrollbar-width: thin; scrollbar-color: var(--valtara-oro) transparent; scroll-behavior: smooth; }
            
            .exp-footer { padding: 20px 30px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(10,10,15,0.98); display: flex; justify-content: space-between; align-items: center; gap: 15px; }
            
            .exp-input-group { margin-bottom: 25px; position: relative; }
            .exp-input-group label { display: block; color: var(--valtara-oro-suave); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-weight: 900; }
            .exp-input, .exp-select, .exp-textarea { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 18px; border-radius: 12px; font-family: inherit; font-size: 1rem; transition: 0.2s; }
            .exp-input:focus, .exp-select:focus, .exp-textarea:focus { border-color: var(--valtara-oro); outline: none; background: rgba(255,255,255,0.08); box-shadow: 0 0 15px rgba(242,201,76,0.15); }
            
            .exp-btn { padding: 18px 30px; border-radius: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); border: none; }
            .btn-primary { background: linear-gradient(135deg, #F2C94C, #F2994A); color: #050508; box-shadow: 0 10px 25px rgba(242,201,76,0.3); }
            .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(242,201,76,0.5); }
            .btn-secondary { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.2); }
            .btn-secondary:hover { background: rgba(255,255,255,0.1); border-color:white; transform: translateY(-3px); }
            .btn-success { background: linear-gradient(135deg, #00b09b, #00796b); color: white; width:100%; box-shadow: 0 10px 30px rgba(0,176,155,0.4); }
            .btn-success:disabled { background: #333; color:#777; box-shadow:none; cursor:not-allowed; }
            .btn-success:not(:disabled):hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(0,176,155,0.6); }
            
            .exp-step { display: none; animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .exp-step.active { display: block; }
            
            .a11y-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 15px; margin-bottom:20px; }
            .a11y-grid-btn { 
                background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.08); border-radius: 16px; 
                padding: 20px; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; 
                align-items: flex-start; text-align: left; color: white; width:100%; outline:none; position: relative; overflow: hidden;
            }
            .a11y-grid-btn:focus-visible { border-color: var(--valtara-oro); box-shadow: 0 0 0 4px rgba(242,201,76,0.3); }
            .a11y-grid-btn:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.2); }
            
            .a11y-grid-btn.active { background: rgba(0, 255, 255, 0.08); border-color: var(--valtara-cian-brillante); box-shadow: inset 0 0 20px rgba(0,255,255,0.1); }
            .a11y-grid-btn.danger.active { background: rgba(255, 85, 85, 0.08); border-color: #ff5555; box-shadow: inset 0 0 20px rgba(255,85,85,0.15); }
            .a11y-grid-btn.warning.active { background: rgba(242, 201, 76, 0.08); border-color: var(--valtara-oro); box-shadow: inset 0 0 20px rgba(242,201,76,0.15); }

            .a11y-btn-header { display: flex; align-items: center; gap: 15px; margin-bottom:12px; width:100%; }
            .a11y-btn-title { font-weight: 900; font-size: 1.15rem; flex:1; line-height:1.3; }
            .a11y-btn-desc { font-size: 0.95rem; color: #aaa; margin-bottom: 15px; font-weight:300; line-height:1.5; display:block; width:100%; }
            .a11y-status-badge { font-family:monospace; font-weight:bold; font-size:0.85rem; padding:8px 12px; border-radius:8px; background:rgba(255,255,255,0.05); color:#888; width:100%; text-align:center; }
            
            .sig-mode-btn { flex:1; padding: 20px; border-radius:14px; font-weight:900; cursor:pointer; transition:0.3s; border:2px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.02); color:white; }
            .sig-mode-btn.active { border-color:var(--valtara-oro); background:rgba(242,201,76,0.1); color:white; box-shadow: 0 5px 20px rgba(242,201,76,0.2); }
            .sig-mode-btn:focus-visible { border-color: var(--valtara-cian-brillante); outline:none; }
            
            .sig-canvas-inline { width: 100%; height: 280px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 2px dashed rgba(242,201,76,0.4); cursor: crosshair; touch-action: none; }
            .sig-canvas-inline:focus { border-color: var(--valtara-oro); outline:none; background: rgba(255,255,255,0.05); box-shadow: 0 0 20px rgba(242,201,76,0.2); }
            
            @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes slideDown { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        `;
        document.head.appendChild(style);
    },

    injectModal: function() {
        if(document.getElementById('expediente-overlay')) return;
        const html = `
        <div id="expediente-overlay" class="exp-overlay" role="dialog" aria-modal="true" aria-labelledby="exp-main-title" aria-hidden="true">
            <div class="exp-container">
                <div class="exp-header">
                    <div>
                        <h2 id="exp-main-title" tabindex="-1" style="margin:0; color:var(--valtara-oro); font-family:var(--font-accent); font-size:2rem; letter-spacing:1px; outline:none;"><i class="fa-solid fa-file-medical" style="margin-right:10px;"></i>HISTORIA CLÍNICA</h2>
                        <p style="margin:5px 0 0 0; color:#aaa; font-size:0.8rem; letter-spacing:3px; text-transform:uppercase;">Valtara Executive Therapy</p>
                    </div>
                    <button id="exp-close" onclick="ExpedienteEngine.closeOverlay()" style="background:transparent; border:none; color:#666; font-size:2.2rem; cursor:pointer; transition:0.3s;" aria-label="Cerrar formulario"><i class="fa-solid fa-xmark"></i></button>
                </div>
                
                <div style="background: rgba(255,255,255,0.03); height: 5px; width: 100%;" aria-hidden="true">
                    <div id="exp-progress" style="height: 100%; background: linear-gradient(90deg, var(--valtara-cian-brillante), var(--valtara-verde-menta)); width: 0%; transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);"></div>
                </div>

                <div class="exp-body" id="exp-wizard-content" role="region" aria-live="polite"></div>

                <div class="exp-footer">
                    <div style="flex:1;">
                        <button id="exp-btn-prev" class="exp-btn btn-secondary" style="visibility:hidden;" aria-label="Regresar al paso anterior"><i class="fa-solid fa-arrow-left-long" aria-hidden="true"></i> Atrás</button>
                    </div>
                    <div id="exp-loader" style="display:none; color:var(--valtara-cian-brillante); font-family:monospace; font-size:1rem; flex:2; text-align:center; letter-spacing:2px; font-weight:bold;"><i class="fa-solid fa-lock fa-fade"></i> CIFRANDO...</div>
                    <div style="flex:1; display:flex; justify-content:flex-end;">
                        <button id="exp-btn-next" class="exp-btn btn-primary" aria-label="Continuar al siguiente paso">Siguiente <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i></button>
                    </div>
                    <button id="exp-btn-submit" class="exp-btn btn-success" style="display:none;" disabled aria-label="Certificar Expediente"><span id="submit-btn-text">Firma Pendiente</span></button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    },

    // ⚡ OPTIMIZACIÓN: Renderizado Selectivo por Paso (no todo el HTML)
    renderWizard: function() {
        const content = document.getElementById('exp-wizard-content');
        if (!content) return;
        
        clearTimeout(this._renderTimeoutId);
        
        // ⚡ Solo renderizar el paso actual + previo/siguiente como prefetch
        let html = '';

        if (this.currentStep === 0) {
            html = this.buildStep(0, this.getStepContent(0));
        } else if (this.currentStep === 10) {
            html = this.buildStep(10, this.getStepContent(10));
        } else {
            html = this.buildStep(this.currentStep, this.getStepContent(this.currentStep));
        }
        
        content.innerHTML = html;
        this.updateUI();

        if (this.currentStep === 10 && this.formData.legal.signatureType === 'drawn') {
            this._renderTimeoutId = setTimeout(() => this.initCanvas(), 200);
        }
    },

    // ⚡ NUEVA FUNCIÓN: Separar contenido por paso
    getStepContent: function(step) {
        const d = this.formData;
        
        switch(step) {
            case 0:
                return `
                    <div style="text-align: center; padding: 20px 0; max-width:650px; margin:0 auto;">
                        <i class="fa-solid fa-scale-balanced" aria-hidden="true" style="font-size: 5rem; color: var(--valtara-oro); margin-bottom: 25px; filter: drop-shadow(0 0 25px rgba(242,201,76,0.3));"></i>
                        <h2 id="exp-step-title-0" tabindex="-1" style="font-size: 3rem; color: white; font-family: var(--font-accent); margin-bottom: 15px; line-height:1.2; outline:none;">Protocolo Institucional de Consentimiento</h2>
                        <p style="color: #aaa; font-size: 1.2rem; line-height: 1.6; margin-bottom: 30px; font-weight:300;">
                            Bienvenido. Este documento rige su seguridad física y la responsabilidad técnica de nuestra intervención clínica. 
                            <strong style="color:var(--valtara-cian-brillante);">El llenado requiere aproximadamente 20 minutos.</strong> 
                        </p>
                        <div style="background: rgba(255,255,255,0.02); padding: 25px; border-radius: 18px; border-left: 5px solid var(--valtara-oro); text-align: left;">
                            <strong style="color: white; font-size:1.2rem; letter-spacing:1px;"><i class="fa-solid fa-gavel" aria-hidden="true"></i> Respaldo Legal</strong>
                            <p style="color: #888; font-size: 1rem; margin-top: 10px; line-height:1.6;">Aval: RENATED A-54878 | SEP RVOE 17FT061</p>
                        </div>
                    </div>
                `;
            case 1:
                return `
                    <h2 id="exp-step-title-1" tabindex="-1" style="color: var(--valtara-oro); margin-bottom: 25px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">1. Identidad Ejecutiva</h2>
                    ${this.buildInput('text', 'Nombre Completo Oficial', 'personal', 'fullName', 'Como aparece en su identificación')}
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        ${this.buildInput('date', 'Fecha de Nacimiento', 'personal', 'birthDate')}
                        ${this.buildInput('number', 'Edad Actual', 'personal', 'age')}
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        ${this.buildInput('text', 'Sexo / Género', 'personal', 'gender')}
                        ${this.buildInput('tel', 'Teléfono', 'personal', 'phone')}
                    </div>
                    ${this.buildInput('email', 'Correo Electrónico', 'personal', 'email')}
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        ${this.buildInput('text', 'Ocupación', 'personal', 'occupation')}
                        ${this.buildSelect('Actividad Física', 'personal', 'activity', ['Sedentaria', 'Ligera', 'Moderada', 'Intensa', 'Alto Rendimiento'])}
                    </div>
                `;
            case 2:
                return `
                    <h2 id="exp-step-title-2" tabindex="-1" style="color: var(--valtara-cian-brillante); margin-bottom: 25px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">2. Motivo de Consulta</h2>
                    ${this.buildInput('text', 'Motivo Principal', 'motivo', 'principal', 'Breve descripción')}
                    ${this.buildSelect('Objetivo', 'motivo', 'objetivo', ['Alivio de dolor agudo', 'Relajación profunda', 'Descarga muscular', 'Recuperación deportiva', 'Mantenimiento'])}
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        ${this.buildInput('text', 'Tiempo de evolución', 'motivo', 'evolucion', 'Ej. 2 semanas, 3 años...')}
                        ${this.buildSelect('¿Es recurrente?', 'motivo', 'recurrente', ['Sí, ocurre con frecuencia', 'No, es la primera vez'])}
                    </div>
                    ${this.buildInput('textarea', 'Expectativas', 'motivo', 'mejora', 'Lo más específico posible')}
                `;
            case 3:
                let zonasHTML = this.zonasList.map(z => this.buildGridToggleCard('array', z, 'zonas', null, z, 'fa-child-reaching', 'warning')).join('');
                return `
                    <h2 id="exp-step-title-3" tabindex="-1" style="color: var(--valtara-oro); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">3. Mapa de Tensión Corporal</h2>
                    <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px;">Seleccione todas las áreas donde presente tensión, rigidez o dolor.</p>
                    <div class="a11y-grid" role="group" aria-label="Zonas del cuerpo afectadas">${zonasHTML}</div>
                `;
            case 4:
                return `
                    <h2 id="exp-step-title-4" tabindex="-1" style="color: #ff5555; margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">4. Análisis Sensorial del Dolor</h2>
                    <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px;">Ayúdenos a entender su percepción de la molestia.</p>
                    ${this.buildSelect('Sensación principal', 'dolorDetalle', 'sensacion', ['Dolor sordo y profundo', 'Presión o tensión extrema', 'Rigidez y falta de movilidad', 'Quemazón', 'Hormigueo'])}
                    
                    <div class="exp-input-group" style="background:rgba(255,85,85,0.05); padding:30px; border-radius:15px; border:1px solid rgba(255,85,85,0.2);">
                        <label style="color:#ff5555; font-size:1.1rem;" for="slider-dolor">Intensidad (0-10)</label>
                        <input type="range" id="slider-dolor" min="0" max="10" value="${d.dolorDetalle.intensidad}" oninput="document.getElementById('lvl-int').innerText=this.value; ExpedienteEngine.updateData('dolorDetalle', 'intensidad', parseInt(this.value)); ExpedienteEngine.updateSubmitButton();" style="width:100%; height:8px; cursor:pointer;">
                        <div id="lvl-int" style="text-align:center; color:#ff5555; font-size:3.5rem; font-weight:900; margin-top:25px;" aria-hidden="true">${d.dolorDetalle.intensidad}</div>
                    </div>
                    
                    ${this.buildInput('text', '¿Desde cuándo?', 'dolorDetalle', 'desde')}
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        ${this.buildInput('text', 'Empeora con:', 'dolorDetalle', 'empeora')}
                        ${this.buildInput('text', 'Alivia con:', 'dolorDetalle', 'alivia')}
                    </div>
                    ${this.buildSelect('Frecuencia', 'dolorDetalle', 'constante', ['Constante', 'Intermitente', 'Solo al esfuerzo', 'Principalmente nocturno'])}
                `;
            case 5:
                let clinicas = '';
                for (const [catKey, category] of Object.entries(this.clinicalDict)) {
                    clinicas += `<h3 style="color:var(--valtara-cian-brillante); margin: 40px 0 20px 0; font-size:1.3rem;">${category.title}</h3><div class="a11y-grid">`;
                    category.items.forEach(item => {
                        const isDanger = catKey === 'precauciones';
                        clinicas += this.buildGridToggleCard('boolean', item.label, 'clinical', catKey, item.id, isDanger ? 'fa-triangle-exclamation' : 'fa-notes-medical', isDanger ? 'danger' : 'warning');
                    });
                    clinicas += `</div>`;
                }
                return `
                    <h2 id="exp-step-title-5" tabindex="-1" style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">5. Historial Médico</h2>
                    <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px;">Seleccione únicamente lo que aplique a su situación actual.</p>
                    ${clinicas}
                `;
            case 6:
                return `
                    <h2 id="exp-step-title-6" tabindex="-1" style="color: var(--valtara-oro); margin-bottom: 25px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">6. Carga Física y Estrés</h2>
                    <div class="exp-input-group" style="background:rgba(242,201,76,0.05); padding:30px; border-radius:15px; border:1px solid rgba(242,201,76,0.2);">
                        <label style="font-size:1.1rem;" for="slider-estres">Nivel de Estrés (0-10)</label>
                        <input type="range" id="slider-estres" min="0" max="10" value="${d.habitos.estres}" oninput="document.getElementById('lvl-est').innerText=this.value; ExpedienteEngine.updateData('habitos', 'estres', parseInt(this.value));" style="width:100%; height:8px; cursor:pointer;">
                        <div id="lvl-est" style="text-align:center; color:var(--valtara-oro); font-size:3.5rem; font-weight:900; margin-top:25px;" aria-hidden="true">${d.habitos.estres}</div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                        ${this.buildSelect('Calidad del Sueño', 'habitos', 'suenoCalidad', ['Muy Buena', 'Buena', 'Regular', 'Mala', 'Insomnio severo'])}
                        ${this.buildInput('number', 'Horas de sueño/día', 'habitos', 'suenoHoras')}
                        ${this.buildSelect('¿Sentado mucho tiempo?', 'habitos', 'sentado', ['Sí, +6 hrs', 'Moderadamente', 'No'])}
                        ${this.buildSelect('¿De pie mucho tiempo?', 'habitos', 'pie', ['Sí, +6 hrs', 'Moderadamente', 'No'])}
                        ${this.buildSelect('¿Carga física?', 'habitos', 'carga', ['Sí, frecuente', 'A veces', 'No'])}
                        ${this.buildSelect('¿Deporte/entrenamiento?', 'habitos', 'deporte', ['Sí, competitivo', 'Sí, recreativo', 'No'])}
                    </div>
                `;
            case 7:
                let accHTML = this.accessibilityDict.map(i => this.buildGridToggleCard('array', i.label, 'accessibility', 'profile', i.label, i.icon, 'active')).join('');
                let ajsHTML = this.ajustesDict.map(i => this.buildGridToggleCard('stringArray', i.label, 'accessibility', 'supports', i.label, 'fa-check', 'active')).join('');
                return `
                    <h2 id="exp-step-title-7" tabindex="-1" style="color: var(--valtara-cian-brillante); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">7. Inclusión y Accesibilidad</h2>
                    <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px;">Su dignidad y comodidad son nuestra prioridad.</p>
                    <h3 style="color:white; font-size:1.5rem; margin-bottom:20px;">Necesidades Especiales:</h3>
                    <div class="a11y-grid" role="group" aria-label="Accesibilidad">${accHTML}</div>
                    <h3 style="color:white; font-size:1.5rem; margin-bottom:20px; margin-top:40px;">Ajustes Sugeridos:</h3>
                    <div class="a11y-grid" role="group" aria-label="Ajustes">${ajsHTML}</div>
                `;
            case 8:
                return `
                    <h2 id="exp-step-title-8" tabindex="-1" style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">8. Observaciones Adicionales</h2>
                    <p style="color:#aaa; font-size:1.1rem; margin-bottom:25px;">Cualquier inquietud o información relevante:</p>
                    ${this.buildInput('textarea', 'Notas abiertas:', 'extra', null, 'Ej. "Operación de rodilla hace 5 años", "No me gusta cierto tipo de toque", etc.')}
                `;
            case 9:
                return `
                    <h2 id="exp-step-title-9" tabindex="-1" style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">9. Revisión Maestra</h2>
                    <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px;">Verifique que la información sea correcta antes de firmar.</p>
                    <div style="display:flex; flex-direction:column; gap:20px; background: rgba(255,255,255,0.02); padding: 30px; border-radius: 20px; border: 1px solid rgba(242,201,76,0.3);">
                        ${this.buildReviewRow('1. Identidad', `<strong>Nombre:</strong> ${d.personal.fullName || '[Falta]'}`, 1)}
                        ${this.buildReviewRow('3. Zonas', `${d.zonas.length} área(s) seleccionada(s)`, 3)}
                        ${this.buildReviewRow('6. Estrés', `<strong>${d.habitos.estres} / 10</strong>`, 6)}
                    </div>
                `;
            case 10:
                return `
                    <h2 id="exp-step-title-10" tabindex="-1" style="color: var(--valtara-oro); margin-bottom: 20px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">10. Firma y Certificación</h2>
                    
                    <div style="background: rgba(255,255,255,0.02); padding: 30px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid var(--valtara-cian-brillante);">
                        <p style="color:#ddd; font-size:1rem; margin-bottom:15px; text-align:justify;"><strong>Aviso:</strong> Sus datos de salud son información sensible protegida por ARCO/INAI.</p>
                        <p style="color:#ddd; font-size:1rem; margin-bottom:0; text-align:justify;"><strong>Declaración:</strong> Manifiesto bajo protesta que esta información es veraz.</p>
                    </div>
                    
                    <button type="button" onclick="ExpedienteEngine.toggleLegalTruth(this)" class="a11y-grid-btn ${d.legal.truthOath ? 'active' : ''}" role="switch" aria-pressed="${d.legal.truthOath}">
                        <div class="a11y-btn-header">
                            <i class="fa-solid fa-file-contract" aria-hidden="true" style="font-size:2.8rem; color:${d.legal.truthOath ? 'var(--valtara-cian-brillante)' : '#888'};"></i>
                            <span class="a11y-btn-title" style="font-size:1.3rem;">Acuerdo Legal</span>
                        </div>
                        <span class="a11y-btn-desc">He leído cuidadosamente los términos. Autorizo mi terapia y el procesamiento de mis datos.</span>
                        <div class="a11y-status-badge" style="${d.legal.truthOath ? 'background:rgba(0,255,255,0.1); color:var(--valtara-cian-brillante); font-size:1.1rem;' : 'font-size:1.1rem;'}">${d.legal.truthOath ? '✅ ACEPTADO' : '◻️ Sin aceptar'}</div>
                    </button>

                    <div style="background: rgba(242,201,76,0.05); border:1px solid rgba(242,201,76,0.3); padding:35px; border-radius:20px; text-align:center; margin-top:30px;">
                        <h3 style="color:var(--valtara-oro); margin-top:0; font-size:1.6rem; text-transform:uppercase;">Firma Biométrica</h3>
                        <p style="color:#aaa; font-size:1rem; margin-bottom:25px;">Requerimos su firma para validez médica y legal.</p>
                        
                        <div style="display:flex; gap:15px; margin-bottom:30px; justify-content:center;">
                            <button class="sig-mode-btn ${d.legal.signatureType === 'drawn' ? 'active' : ''}" onclick="ExpedienteEngine.setSignatureMode('drawn')" aria-label="Dibujar">
                                <i class="fa-solid fa-pen-nib" aria-hidden="true"></i> DIBUJAR
                            </button>
                            <button class="sig-mode-btn ${d.legal.signatureType === 'typed' ? 'active' : ''}" onclick="ExpedienteEngine.setSignatureMode('typed')" aria-label="Escribir">
                                <i class="fa-solid fa-keyboard" aria-hidden="true"></i> ESCRIBIR (A11y)
                            </button>
                        </div>

                        <div id="sig-area-drawn" style="display:${d.legal.signatureType === 'drawn' ? 'block' : 'none'};">
                            <p style="color:#fff; font-size:1rem; margin-bottom:15px; text-align:left;">Dibuje su rúbrica:</p>
                            <canvas id="sig-canvas" class="sig-canvas-inline" aria-label="Lienzo para firmar"></canvas>
                            <div style="display:flex; justify-content:space-between; gap:15px; margin-top:20px;">
                                <button onclick="ExpedienteEngine.clearCanvas()" style="padding:18px; background:rgba(255,85,85,0.1); color:#ff5555; border:1px solid #ff5555; border-radius:12px; font-weight:900; flex:1; cursor:pointer;">Limpiar</button>
                                <button onclick="ExpedienteEngine.saveCanvas()" style="padding:18px; background:var(--valtara-oro); color:black; border:none; border-radius:12px; font-weight:900; flex:2; cursor:pointer;">Guardar Firma</button>
                            </div>
                            <div id="firma-success-msg" style="display:${d.legal.drawnSignature ? 'block' : 'none'}; color:var(--valtara-cian-brillante); background:rgba(0,255,255,0.1); padding:15px; border-radius:10px; margin-top:15px; text-align:center; font-weight:bold;">
                                <i class="fa-solid fa-check"></i> Firma guardada
                            </div>
                        </div>

                        <div id="sig-area-typed" style="display:${d.legal.signatureType === 'typed' ? 'block' : 'none'}; text-align:left;">
                            <div class="exp-input-group">
                                <label for="typed-sig-input">Escriba su Nombre como Firma:</label>
                                <input type="text" id="typed-sig-input" class="exp-input" placeholder="Ej. Antonio López García" value="${d.legal.typedSignature}" oninput="ExpedienteEngine.updateData('legal', 'typedSignature', this.value); ExpedienteEngine.updateSubmitButton();" style="font-style:italic; font-size:1.1rem;">
                            </div>
                            <div class="exp-input-group">
                                <label for="typed-sig-reason">Motivo de firma alternativa:</label>
                                <select id="typed-sig-reason" class="exp-select" onchange="ExpedienteEngine.updateData('legal', 'signatureReason', this.value); ExpedienteEngine.updateSubmitButton();">
                                    <option value="" disabled ${!d.legal.signatureReason ? 'selected' : ''}>Seleccione un motivo...</option>
                                    ${this.signatureReasons.map(r => `<option value="${r}" ${d.legal.signatureReason === r ? 'selected' : ''} style="background:#111;">${r}</option>`).join('')}
                                </select>
                            </div>
                            <p style="color:#aaa; font-size:0.95rem; text-align:center; margin-top:25px;"><i class="fa-solid fa-info-circle" aria-hidden="true"></i> Su nombre tendrá la misma validez legal.</p>
                        </div>
                    </div>
                `;
            default:
                return '';
        }
    },

    buildStep: function(index, content) {
        return `<div id="exp-step-${index}" class="exp-step ${index === this.currentStep ? 'active' : ''}">${content}</div>`;
    },

    buildInput: function(type, label, cat, key, placeholder='', extraClass='') {
        let val = cat && key ? this.formData[cat][key] : (cat ? this.formData[cat] : '');
        const onInput = `ExpedienteEngine.updateData('${cat}', '${key}', this.value)`;
        const idStr = `input-${cat}-${key}`;
        if (type === 'textarea') return `<div class="exp-input-group"><label for="${idStr}">${label}</label><textarea id="${idStr}" rows="5" oninput="${onInput}" class="exp-textarea ${extraClass}" placeholder="${placeholder}" style="resize:vertical;"></textarea></div>`;
        return `<div class="exp-input-group"><label for="${idStr}">${label}</label><input id="${idStr}" type="${type}" oninput="${onInput}" value="${val}" class="exp-input ${extraClass}" placeholder="${placeholder}"></div>`;
    },

    buildSelect: function(label, cat, key, options) {
        let val = this.formData[cat][key];
        const idStr = `sel-${cat}-${key}`;
        let optsHTML = options.map(o => `<option value="${o}" ${val === o ? 'selected' : ''} style="background:#111; color:white;">${o}</option>`).join('');
        return `<div class="exp-input-group"><label for="${idStr}">${label}</label><select id="${idStr}" onchange="ExpedienteEngine.updateData('${cat}', '${key}', this.value)" class="exp-select">${optsHTML}</select></div>`;
    },

    buildReviewRow: function(title, content, targetStep) {
        return `
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
                <div>
                    <h4 style="color: var(--valtara-oro); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">${title}</h4>
                    <p style="color: #ddd; font-size: 1.1rem; margin:0; line-height: 1.6; font-weight: 300;">${content}</p>
                </div>
                <button type="button" onclick="ExpedienteEngine.goToStep(${targetStep})" style="background: rgba(242,201,76,0.1); border: 1px solid var(--valtara-oro); color: var(--valtara-oro); padding: 12px 24px; border-radius: 10px; font-weight: 900; cursor: pointer; transition: 0.3s; white-space:nowrap;">EDITAR</button>
            </div>
        `;
    },

    buildGridToggleCard: function(type, label, path1, path2, val, icon, colorTheme, desc = '') {
        let isChecked = false;
        if (type === 'array') {
            isChecked = this._zonesSet.has(val);
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
                <i class="fa-solid ${icon} icon-elem" aria-hidden="true" style="font-size:2.2rem; color:${iconColor}; transition:0.3s;"></i>
                <span class="a11y-btn-title">${label}</span>
            </div>
            ${desc ? `<span class="a11y-btn-desc">${desc}</span>` : ''}
            <div class="a11y-status-badge" style="background:${badgeBg}; color:${badgeColor};">${badgeText}</div>
        </button>`;
    },

    toggleGridItem: function(btn, type, path1, path2, val, label, colorTheme) {
        let isChecked = false;
        if (type === 'array') {
            if(this._zonesSet.has(val)) { this._zonesSet.delete(val); isChecked = false; }
            else { this._zonesSet.add(val); isChecked = true; }
            this.formData[path1] = Array.from(this._zonesSet);
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
        this.announceA11y(`${label} ${isChecked ? 'seleccionado' : 'deseleccionado'}`);
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
            badgeElem.innerText = '✅ ACEPTADO';
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

    setSignatureMode: function(mode) {
        this.formData.legal.signatureType = mode;
        this.saveData();
        this.renderWizard();
        this.announceA11y(`Modo de firma: ${mode === 'drawn' ? 'Dibujo manual' : 'Escritura'}`);
        this.updateSubmitButton();
        setTimeout(() => { if(mode === 'typed') document.getElementById('typed-sig-input').focus(); }, 200);
    },

    // ⚡ OPTIMIZACIÓN: Mejorado Canvas con limpieza de eventos
    initCanvas: function() {
        const canvas = document.getElementById('sig-canvas');
        if(!canvas || this._canvasInitialized) return;
        
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        this.signaturePad = canvas;
        const ctx = canvas.getContext('2d');
        
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#D4AF37';
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if(this.formData.legal.drawnSignature) {
            let img = new Image();
            img.onload = () => { ctx.drawImage(img, 0, 0); };
            img.src = this.formData.legal.drawnSignature;
            document.getElementById('firma-success-msg').style.display = 'block';
        }

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const startPos = (e) => { e.preventDefault(); this.isDrawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
        const draw = (e) => { if(!this.isDrawing) return; e.preventDefault(); const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
        const endPos = (e) => { if(e) e.preventDefault(); this.isDrawing = false; };

        canvas.style.touchAction = 'none';
        
        // ⚡ Usar addEventListener con opciones para mejor rendimiento
        canvas.addEventListener('mousedown', startPos, {passive: false});
        canvas.addEventListener('mousemove', draw, {passive: false});
        canvas.addEventListener('mouseup', endPos, {passive: false});
        canvas.addEventListener('mouseout', endPos, {passive: false});
        canvas.addEventListener('touchstart', startPos, {passive: false});
        canvas.addEventListener('touchmove', draw, {passive: false});
        canvas.addEventListener('touchend', endPos, {passive: false});
        
        this._canvasInitialized = true;
    },

    saveCanvas: function() {
        if(this.isCanvasBlank()) {
            alert("El lienzo está vacío. Por favor, dibuje su firma.");
            this.announceA11y("Error: Lienzo vacío.");
            return;
        }
        this.formData.legal.drawnSignature = this.signaturePad.toDataURL('image/png');
        this.saveData();
        document.getElementById('firma-success-msg').style.display = 'block';
        this.announceA11y("Firma guardada exitosamente.");
        this.updateSubmitButton();
    },

    clearCanvas: function() {
        if(!this.signaturePad) return;
        const ctx = this.signaturePad.getContext('2d');
        ctx.clearRect(0, 0, this.signaturePad.width, this.signaturePad.height);
        this.formData.legal.drawnSignature = null;
        this.saveData();
        document.getElementById('firma-success-msg').style.display = 'none';
        this.announceA11y("Lienzo borrado.");
        this.updateSubmitButton();
    },

    isCanvasBlank: function() {
        const blank = document.createElement('canvas');
        blank.width = this.signaturePad.width;
        blank.height = this.signaturePad.height;
        const ctx = blank.getContext('2d');
        ctx.clearRect(0,0, blank.width, blank.height);
        return this.signaturePad.toDataURL() === blank.toDataURL();
    },

    bindEvents: function() {
        const btnNext = document.getElementById('exp-btn-next');
        const btnPrev = document.getElementById('exp-btn-prev');
        const btnSubmit = document.getElementById('exp-btn-submit');

        btnNext.addEventListener('click', () => {
            if(this.currentStep === 1 && (!this.formData.personal.fullName)) { 
                alert("Por favor, ingrese su Nombre Completo para continuar."); 
                this.announceA11y("Error: Nombre completo requerido.");
                return; 
            }
            if(this.currentStep < this.totalSteps - 1) { 
                this.currentStep++; 
                this.renderWizard(); 
                this.updateProgressBar();
                this.announceA11y(`Fase ${this.currentStep + 1} cargada.`);
            }
        });
        
        btnPrev.addEventListener('click', () => {
            if(this.currentStep > 0) { 
                this.currentStep--; 
                this.renderWizard(); 
                this.updateProgressBar();
                this.announceA11y(`Fase ${this.currentStep + 1} cargada.`);
            }
        });

        btnSubmit.addEventListener('click', () => {
            this.generatePDF();
        });
    },

    updateProgressBar: function() {
        const progress = ((this.currentStep + 1) / (this.totalSteps + 1)) * 100;
        document.getElementById('exp-progress').style.width = progress + '%';
    },

    goToStep: function(stepIdx) {
        this.currentStep = stepIdx;
        this.renderWizard();
        this.updateProgressBar();
    },

    updateUI: function() {
        const content = document.getElementById('exp-wizard-content');
        if (content) content.scrollTop = 0;
        
        this.updateProgressBar();
        
        setTimeout(() => {
            const stepTitle = document.getElementById(`exp-step-title-${this.currentStep}`);
            if(stepTitle) stepTitle.focus();
        }, 100);

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
        const submitText = document.getElementById('submit-btn-text');
        if(!btnSubmit || !submitText) return;
        
        const l = this.formData.legal;
        let isSignatureValid = false;
        let errorMsg = '';
        
        if (!l.truthOath) {
            errorMsg = "Términos sin aceptar";
        } else if (!l.signatureType) {
            errorMsg = "Seleccione modo de firma";
        } else if (l.signatureType === 'drawn') {
            if (l.drawnSignature) isSignatureValid = true;
            else errorMsg = "Falta confirmar dibujo";
        } else if (l.signatureType === 'typed') {
            if (l.typedSignature.trim().length < 3) errorMsg = "Firma muy corta";
            else if (!l.signatureReason) errorMsg = "Seleccione motivo A11y";
            else isSignatureValid = true;
        }

        if(l.truthOath && isSignatureValid) {
            btnSubmit.disabled = false;
            btnSubmit.style.background = "linear-gradient(135deg, #00b09b, #00796b)";
            btnSubmit.style.color = "white";
            submitText.innerText = "Certificar Expediente";
            this.announceA11y("Documento listo para descargar.");
        } else {
            btnSubmit.disabled = true;
            btnSubmit.style.background = "#333";
            btnSubmit.style.color = "#888";
            submitText.innerText = `Bloqueado: ${errorMsg}`;
        }
    },

    generateBodyMapSVG: function(zonasActivas) {
        let nodesHTML = '';
        for (const [zoneName, coords] of Object.entries(this.zoneCoordinates)) {
            const isActive = zonasActivas.includes(zoneName);
            if (isActive) {
                const lineX = coords.labelPos === 'left' ? 5 : 95;
                const anchor = coords.labelPos === 'left' ? 'start' : 'end';
                nodesHTML += `
                    <circle cx="${coords.cx}%" cy="${coords.cy}%" r="4%" fill="rgba(255,85,85,0.3)" />
                    <circle cx="${coords.cx}%" cy="${coords.cy}%" r="1.5%" fill="#ff5555" />
                    <line x1="${coords.cx}%" y1="${coords.cy}%" x2="${lineX}%" y2="${coords.cy}%" stroke="#ff5555" stroke-width="0.3" stroke-dasharray="1 1" opacity="0.8" />
                    <text x="${lineX}%" y="${coords.cy - 1}%" fill="#ffffff" font-size="2.5" font-family="helvetica" text-anchor="${anchor}" font-weight="bold">${zoneName.substring(0,15)}</text>
                `;
            } else {
                nodesHTML += `<circle cx="${coords.cx}%" cy="${coords.cy}%" r="0.6%" fill="#555" />`;
            }
        }

        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 100 100" style="background-color:#050508;">
            <g stroke="#444" stroke-width="0.5" fill="none">
                <path d="M 45 8 Q 50 2 55 8 Q 55 12 52 15 L 52 18 Q 60 22 65 24 L 75 45 L 85 65 L 90 72" />
                <path d="M 52 18 Q 40 22 35 24 L 25 45 L 15 65 L 10 72" />
                <path d="M 35 24 Q 50 35 65 24" />
                <path d="M 40 60 Q 50 65 60 60 L 60 85 L 62 98" />
                <path d="M 40 60 L 40 85 L 38 98" />
                <line x1="50" y1="18" x2="50" y2="55" stroke-dasharray="1 2" />
                <circle cx="50" cy="8" r="4" stroke="#222" />
            </g>
            ${nodesHTML}
        </svg>
        `;
    },

    // ⚡ OPTIMIZACIÓN: PDF generado solo bajo demanda, sin renderizar en memoria todo
    generatePDF: async function() {
        const btnSubmit = document.getElementById('exp-btn-submit');
        const loader = document.getElementById('exp-loader');
        
        btnSubmit.style.display = 'none';
        document.getElementById('exp-btn-prev').style.display = 'none';
        loader.style.display = 'block';
        this.announceA11y("Generando PDF. Por favor, espere.");

        if (!window.jspdf) {
            try {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
                    script.onload = resolve;
                    script.onerror = reject;
                    script.async = true;
                    document.head.appendChild(script);
                });
            } catch (e) {
                alert("Error: No se pudo cargar el motor PDF. Verifique su conexión.");
                btnSubmit.style.display = 'flex';
                loader.style.display = 'none';
                return;
            }
        }

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
        
        const d = this.formData;
        const nombre = d.personal.fullName || 'Paciente Ejecutivo';
        const iniciales = nombre.split(' ').map(n => n[0]).join('').substring(0,3).toUpperCase();
        const dateObj = new Date();
        const folioReal = `FOLIO-${iniciales}-${dateObj.getFullYear()}${String(dateObj.getMonth()+1).padStart(2,'0')}${String(dateObj.getDate()).padStart(2,'0')}`;
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 40;
        let currentY = margin;
        let pageNum = 1;

        const c_bg = [5, 5, 8];
        const c_gold = [212, 175, 55];
        const c_white = [255, 255, 255];
        const c_gray = [170, 170, 170];

        const addPageWithHeaders = () => {
            pdf.setFillColor(...c_bg);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');
            
            pdf.setFontSize(6);
            pdf.setTextColor(80, 80, 80);
            pdf.text("VALTARA EXECUTIVE THERAPY | DOCUMENTO OFICIAL", 20, 20);
            pdf.text(`FOLIO: ${folioReal}`, pageWidth - 20, pageHeight - 15, { align: 'right' });

            pdf.setFont("times", "bold");
            pdf.setFontSize(26);
            pdf.setTextColor(...c_gold);
            pdf.text("VALTARA", margin, margin + 20);
            
            pdf.setDrawColor(...c_gold);
            pdf.setLineWidth(1.5);
            pdf.line(margin, margin + 45, pageWidth - margin, margin + 45);

            currentY = margin + 80;
        };

        const checkPageBreak = (neededHeight) => {
            if (currentY + neededHeight > pageHeight - 80) {
                pdf.addPage();
                pageNum++;
                addPageWithHeaders();
            }
        };

        const drawSectionTitle = (title) => {
            checkPageBreak(40);
            pdf.setFillColor(212, 175, 55);
            pdf.rect(margin, currentY, 4, 22, 'F');
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(11);
            pdf.setTextColor(...c_gold);
            pdf.text(title, margin + 15, currentY + 15);
            currentY += 30;
        };

        const drawRow = (label, value) => {
            const valStr = (value === '' || value === null || value === undefined) ? '---' : String(value).substring(0, 80);
            checkPageBreak(22);
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(10);
            pdf.setTextColor(...c_gray);
            pdf.text(label, margin + 10, currentY + 12);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(...c_white);
            pdf.text(valStr, margin + 200, currentY + 12);
            currentY += 22;
        };

        addPageWithHeaders();
        drawSectionTitle("1. DATOS PERSONALES");
        drawRow("Nombre", d.personal.fullName);
        drawRow("Edad", d.personal.age);
        drawRow("Contacto", `${d.personal.phone} | ${d.personal.email}`);
        
        drawSectionTitle("2. MOTIVO DE CONSULTA");
        drawRow("Principal", d.motivo.principal);
        drawRow("Objetivo", d.motivo.objetivo);
        
        drawSectionTitle("3. ZONAS AFECTADAS");
        drawRow("Localización", d.zonas.length > 0 ? d.zonas.join(', ') : 'Ninguna');
        
        drawSectionTitle("4. DOLOR");
        drawRow("Sensación", d.dolorDetalle.sensacion);
        drawRow("Intensidad", `${d.dolorDetalle.intensidad} / 10`);
        
        pdf.save(`Valtara_${folioReal}.pdf`);
        
        loader.innerHTML = '<i class="fa-solid fa-check"></i> DESCARGADO';
        loader.style.color = '#00b09b';
        this.announceA11y("PDF generado exitosamente.");
        
        setTimeout(() => {
            this.closeOverlay();
            loader.style.display = 'none';
            btnSubmit.style.display = 'flex';
        }, 2000);
    }
};

window.addEventListener('DOMContentLoaded', () => ExpedienteEngine.init());
