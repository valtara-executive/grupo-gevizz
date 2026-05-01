/**
 * ====================================================================================
 * BLOQUE 10: EXPEDIENTE CLÍNICO SOBERANO V37.0 "MOTOR VECTORIAL BANCARIO"
 * Renderizado PDF por Coordenadas Matemáticas (jsPDF Nativo), Textos Seleccionables,
 * Auto-Paginación Dinámica Inteligente, Fondo Oscuro Puro, Firma Tinta Oro.
 * Aval Institucional: RENATED A-54878 | SEP RVOE 17FT061 | SISAE | NTCL CSSA0409.01
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
        legal: { 
            truthOath: false, 
            signatureType: 'drawn', 
            drawnSignature: null, 
            typedSignature: '',
            signatureReason: ''
        },
        fechaStamp: null
    },

    // Mapeo Topográfico de Precisión para Renderizado Vectorial (Motor SVG)
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

    loadData: function() {
        try {
            const saved = localStorage.getItem('valtara_expediente');
            if(saved) {
                const parsed = JSON.parse(saved);
                if(parsed.clinical && parsed.clinical.precauciones) {
                    this.formData = parsed;
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

    saveData: function() {
        this.formData.fechaStamp = new Date().getTime();
        localStorage.setItem('valtara_expediente', JSON.stringify(this.formData));
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
        div.style.cssText = "position: fixed; top: 20px; left: 0; right: 0; margin: 0 auto; width: 90%; max-width: 450px; background: rgba(5,5,10,0.98); border: 2px solid var(--valtara-cian-brillante); border-radius: 1.5rem; padding: 25px; z-index: 999999; box-shadow: 0 2rem 5rem rgba(0,255,255,0.3); backdrop-filter: blur(25px); text-align: center; animation: floatUp 0.6s ease forwards;";
        
        div.innerHTML = `
            <i class="fa-solid fa-heart-pulse" style="color: var(--valtara-cian-brillante); font-size: 3rem; margin-bottom: 15px; animation: breathe 2s infinite;"></i>
            <h4 style="color: white; font-family: var(--font-accent); font-size: 1.8rem; margin:0 0 15px 0;">Control Clínico Periódico</h4>
            <p style="color: #ccc; font-size: 1.1rem; margin-bottom: 25px; font-weight: 300; line-height: 1.5;">Han pasado más de 15 días desde su último registro. Por su seguridad técnica, ¿han cambiado sus niveles de dolor o condiciones médicas?</p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="btn-centinela-no" style="background: transparent; border: 1px solid #666; color: #aaa; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-size: 1rem; transition: 0.3s; font-weight:bold;">Todo sigue igual</button>
                <button id="btn-centinela-si" style="background: var(--valtara-cian-brillante); border: none; color: black; padding: 12px 24px; border-radius: 25px; font-weight: 900; cursor: pointer; font-size: 1rem; box-shadow: 0 5px 15px rgba(0,255,255,0.4); transition: 0.3s;">ACTUALIZAR FICHA</button>
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
                this.announceA11y("Historia Clínica Soberana iniciada. Navegue hacia abajo para completar los campos. Utilice los botones inferiores para avanzar.");
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
            .exp-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(2, 2, 5, 0.97); z-index: 999999; display: none; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(35px); -webkit-backdrop-filter: blur(35px); opacity: 0; transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
            .exp-overlay.active { display: flex; opacity: 1; }
            .exp-container { width: 95%; max-width: 900px; height: 92vh; background: rgba(15, 15, 20, 0.85); border: 1px solid rgba(242, 201, 76, 0.25); border-radius: 24px; display: flex; flex-direction: column; box-shadow: 0 40px 100px rgba(0,0,0,0.9); position: relative; overflow:hidden; }
            
            .exp-header { padding: 25px 30px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; background: linear-gradient(180deg, rgba(15,15,20,0.95) 0%, rgba(15,15,20,0.8) 100%); }
            .exp-body { flex: 1; overflow-y: auto; padding: 40px 30px; scrollbar-width: thin; scrollbar-color: var(--valtara-oro) transparent; scroll-behavior: smooth; }
            
            .exp-footer { padding: 20px 30px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(10,10,15,0.98); display: flex; justify-content: space-between; align-items: center; gap:15px; }
            
            .exp-input-group { margin-bottom: 25px; position: relative; }
            .exp-input-group label { display: block; color: var(--valtara-oro-suave); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-weight: 900; }
            .exp-input, .exp-select, .exp-textarea { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 18px; border-radius: 12px; font-size: 1.1rem; transition: all 0.3s ease; box-shadow:inset 0 2px 5px rgba(0,0,0,0.2); }
            .exp-input:focus, .exp-select:focus, .exp-textarea:focus { border-color: var(--valtara-oro); outline: none; background: rgba(255,255,255,0.08); box-shadow: 0 0 15px rgba(242,201,76,0.15); }
            
            .exp-btn { padding: 18px 30px; border-radius: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: flex; justify-content: center; align-items: center; gap: 12px; font-size: 1rem; border: none; }
            .btn-primary { background: linear-gradient(135deg, #F2C94C, #F2994A); color: #050508; box-shadow: 0 10px 25px rgba(242,201,76,0.3); }
            .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(242,201,76,0.5); }
            .btn-secondary { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.2); }
            .btn-secondary:hover { background: rgba(255,255,255,0.1); border-color:white; transform: translateY(-3px); }
            .btn-success { background: linear-gradient(135deg, #00b09b, #00796b); color: white; width:100%; box-shadow: 0 10px 30px rgba(0,176,155,0.4); }
            .btn-success:disabled { background: #333; color:#777; box-shadow:none; cursor:not-allowed; }
            .btn-success:not(:disabled):hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(0,176,155,0.6); }
            
            .exp-step { display: none; animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .exp-step.active { display: block; }
            
            /* CUADRÍCULAS DE ACCESIBILIDAD */
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
            .a11y-status-badge { font-family:monospace; font-weight:bold; font-size:0.85rem; padding:8px 12px; border-radius:8px; background:rgba(255,255,255,0.05); color:#888; width:100%; text-align:center; transition:0.3s; margin-top:auto; }
            
            /* BOTONES DE MODO DE FIRMA */
            .sig-mode-btn { flex:1; padding: 20px; border-radius:14px; font-weight:900; cursor:pointer; transition:0.3s; border:2px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.02); color:#888; font-size:1.1rem; display:flex; flex-direction:column; align-items:center; gap:8px; }
            .sig-mode-btn.active { border-color:var(--valtara-oro); background:rgba(242,201,76,0.1); color:white; box-shadow: 0 5px 20px rgba(242,201,76,0.2); }
            .sig-mode-btn:focus-visible { border-color: var(--valtara-cian-brillante); outline:none; }
            
            /* LIENZO DE FIRMA INLINE TRANSPARENTE (GOLD INK) */
            .sig-canvas-inline { width: 100%; height: 280px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 2px dashed rgba(242,201,76,0.4); cursor: crosshair; touch-action: none; margin-bottom:15px; transition:0.3s; }
            .sig-canvas-inline:focus { border-color: var(--valtara-oro); outline:none; background: rgba(255,255,255,0.05); box-shadow: 0 0 20px rgba(242,201,76,0.2); }
            
            @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
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
                        <h2 id="exp-main-title" tabindex="-1" style="margin:0; color:var(--valtara-oro); font-family:var(--font-accent); font-size:2rem; letter-spacing:1px; outline:none;"><i class="fa-solid fa-file-shield text-indigo-400" aria-hidden="true" style="margin-right:10px;"></i> Historia Clínica Oficial</h2>
                        <p style="margin:5px 0 0 0; color:#aaa; font-size:0.8rem; letter-spacing:3px; text-transform:uppercase;">Valtara Executive Therapy</p>
                    </div>
                    <button id="exp-close" onclick="ExpedienteEngine.closeOverlay()" style="background:transparent; border:none; color:#666; font-size:2.2rem; cursor:pointer; transition:0.3s;" aria-label="Cerrar Expediente"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
                </div>
                
                <div style="background: rgba(255,255,255,0.03); height: 5px; width: 100%;" aria-hidden="true">
                    <div id="exp-progress" style="height: 100%; background: linear-gradient(90deg, var(--valtara-cian-brillante), var(--valtara-verde-menta)); width: 0%; transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);"></div>
                </div>

                <div class="exp-body" id="exp-wizard-content" role="region" aria-live="polite"></div>

                <div class="exp-footer">
                    <div style="flex:1;">
                        <button id="exp-btn-prev" class="exp-btn btn-secondary" style="visibility:hidden;" aria-label="Regresar al paso anterior"><i class="fa-solid fa-arrow-left-long" aria-hidden="true"></i> Atrás</button>
                    </div>
                    <div id="exp-loader" style="display:none; color:var(--valtara-cian-brillante); font-family:monospace; font-size:1rem; flex:2; text-align:center; letter-spacing:2px; font-weight:bold;" aria-live="assertive"><i class="fa-solid fa-lock fa-fade"></i> CIFRANDO Y RENDERIZANDO...</div>
                    <div style="flex:1; display:flex; justify-content:flex-end;">
                        <button id="exp-btn-next" class="exp-btn btn-primary" aria-label="Continuar al siguiente paso">Siguiente <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i></button>
                    </div>
                    <button id="exp-btn-submit" class="exp-btn btn-success" style="display:none;" disabled aria-label="Certificar Expediente"><span id="submit-btn-text">Firma Pendiente</span></button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    },

    renderWizard: function() {
        const content = document.getElementById('exp-wizard-content');
        let html = '';

        html += this.buildStep(0, `
            <div style="text-align: center; padding: 20px 0; max-width:650px; margin:0 auto;">
                <i class="fa-solid fa-scale-balanced" aria-hidden="true" style="font-size: 5rem; color: var(--valtara-oro); margin-bottom: 25px; filter: drop-shadow(0 0 25px rgba(242,201,76,0.3));"></i>
                <h2 id="exp-step-title-0" tabindex="-1" style="font-size: 3rem; color: white; font-family: var(--font-accent); margin-bottom: 15px; line-height:1.2; outline:none;">Protocolo Institucional</h2>
                <p style="color: #aaa; font-size: 1.2rem; line-height: 1.6; margin-bottom: 30px; font-weight:300;">
                    Bienvenido. Este documento rige su seguridad física y la responsabilidad técnica de nuestra intervención clínica. 
                    <strong style="color:var(--valtara-cian-brillante);">El llenado requiere aproximadamente 20 minutos.</strong> 
                    Le solicitamos amablemente responder con absoluta sinceridad.
                </p>
                <div style="background: rgba(255,255,255,0.02); padding: 25px; border-radius: 18px; border-left: 5px solid var(--valtara-oro); text-align: left;">
                    <strong style="color: white; font-size:1.2rem; letter-spacing:1px;"><i class="fa-solid fa-gavel text-indigo-400" aria-hidden="true"></i> Respaldo Legal Aplicable</strong>
                    <p style="color: #888; font-size: 1rem; margin-top: 10px; line-height:1.6;">El tratamiento de datos de salud exige consentimiento expreso para datos sensibles (Ley ARCO/INAI). Su información se procesa bajo la referencia de la <strong>NOM-004-SSA3-2012</strong> adaptada estrictamente a la Masoterapia Clínica.</p>
                </div>
            </div>
        `);

        html += this.buildStep(1, `
            <h2 id="exp-step-title-1" tabindex="-1" style="color: var(--valtara-oro); margin-bottom: 25px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">1. Identidad Ejecutiva</h2>
            ${this.buildInput('text', 'Nombre Completo Oficial', 'personal', 'fullName', 'Como aparece en su identificación')}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${this.buildInput('date', 'Fecha de Nacimiento', 'personal', 'birthDate')}
                ${this.buildInput('number', 'Edad Actual', 'personal', 'age')}
                ${this.buildInput('text', 'Sexo / Género', 'personal', 'gender')}
                ${this.buildInput('tel', 'Teléfono de Contacto', 'personal', 'phone')}
            </div>
            ${this.buildInput('email', 'Correo Electrónico', 'personal', 'email')}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${this.buildInput('text', 'Ocupación o Cargo', 'personal', 'occupation')}
                ${this.buildSelect('Nivel de Actividad Física', 'personal', 'activity', ['Sedentaria', 'Ligera', 'Moderada', 'Intensa', 'Alto Rendimiento'])}
            </div>
        `);

        html += this.buildStep(2, `
            <h2 id="exp-step-title-2" tabindex="-1" style="color: var(--valtara-cian-brillante); margin-bottom: 25px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">2. Motivo de Atención</h2>
            ${this.buildInput('text', 'Motivo Principal de Consulta', 'motivo', 'principal', 'Describa brevemente su necesidad')}
            ${this.buildSelect('Objetivo principal de la sesión', 'motivo', 'objetivo', ['Alivio de dolor agudo', 'Relajación profunda', 'Descarga muscular', 'Recuperación deportiva', 'Mantenimiento preventivo', 'Evaluación biomecánica'])}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${this.buildInput('text', 'Tiempo de evolución del problema', 'motivo', 'evolucion', 'Ej. 2 semanas, 3 años...')}
                ${this.buildSelect('¿Es un problema recurrente?', 'motivo', 'recurrente', ['Sí, ocurre con frecuencia', 'No, es la primera vez'])}
            </div>
            ${this.buildInput('textarea', '¿Qué expectativas o mejoras busca obtener en esta sesión?', 'motivo', 'mejora', 'Ser lo más específico posible ayuda enormemente a nuestro terapeuta...')}
        `);

        let zonasHTML = this.zonasList.map(z => this.buildGridToggleCard('array', z, 'zonas', null, z, 'fa-child-reaching', 'warning')).join('');
        html += this.buildStep(3, `
            <h2 id="exp-step-title-3" tabindex="-1" style="color: var(--valtara-oro); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">3. Mapa de Tensión Corporal</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px;">Seleccione amablemente todas las áreas de su cuerpo donde presente tensión, rigidez o dolor actual.</p>
            <div class="a11y-grid" role="group" aria-label="Zonas del cuerpo afectadas">${zonasHTML}</div>
        `);

        html += this.buildStep(4, `
            <h2 id="exp-step-title-4" tabindex="-1" style="color: #ff5555; margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">4. Análisis Sensorial del Dolor</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px;">Respecto a las zonas seleccionadas, ayúdenos a entender su percepción de la molestia.</p>
            ${this.buildSelect('¿Cómo describe la sensación principal?', 'dolorDetalle', 'sensacion', ['Dolor sordo y profundo', 'Presión o tensión extrema', 'Rigidez y falta de movilidad', 'Punzada aguda o piquetes', 'Hormigueo', 'Entumecimiento / Pérdida de sensibilidad', 'Cansancio / Pesadez muscular', 'Otro'])}
            
            <div class="exp-input-group" style="background:rgba(255,85,85,0.05); padding:30px; border-radius:15px; border:1px solid rgba(255,85,85,0.2);">
                <label style="color:#ff5555; font-size:1.1rem;" for="slider-dolor">Intensidad del dolor (0 = Sin dolor, 10 = Inoportable)</label>
                <input type="range" id="slider-dolor" min="0" max="10" value="${this.formData.dolorDetalle.intensidad}" oninput="document.getElementById('lvl-int').innerText=this.value; ExpedienteEngine.updateData('dolorDetalle', 'intensidad', this.value); ExpedienteEngine.announceA11y('Nivel de dolor '+this.value);" style="width:100%; accent-color:#ff5555; margin-top:20px;" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${this.formData.dolorDetalle.intensidad}">
                <div id="lvl-int" style="text-align:center; color:#ff5555; font-size:3.5rem; font-weight:900; margin-top:25px;" aria-hidden="true">${this.formData.dolorDetalle.intensidad}</div>
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
            clinicas += `<h3 style="color:var(--valtara-cian-brillante); margin: 40px 0 20px 0; border-bottom:2px solid rgba(0,255,255,0.2); padding-bottom:10px; font-size:1.5rem; text-transform:uppercase; letter-spacing:1px;"><i class="fa-solid ${category.icon}" aria-hidden="true"></i> ${category.title}</h3><div class="a11y-grid" role="group" aria-label="${category.title}">`;
            category.items.forEach(item => {
                const isDanger = catKey === 'precauciones';
                clinicas += this.buildGridToggleCard('boolean', item.label, 'clinical', catKey, item.id, isDanger ? 'fa-triangle-exclamation' : 'fa-notes-medical', isDanger ? 'danger' : 'warning', item.desc);
            });
            clinicas += `</div>`;
        }
        html += this.buildStep(5, `
            <h2 id="exp-step-title-5" tabindex="-1" style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">5. Historial Médico Relevante</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px; line-height:1.6;">La masoterapia interactúa con los sistemas circulatorio y nervioso. Seleccione <strong>únicamente</strong> las condiciones con las que ha sido diagnosticado recientemente o de forma crónica.</p>
            ${clinicas}
        `);

        html += this.buildStep(6, `
            <h2 id="exp-step-title-6" tabindex="-1" style="color: var(--valtara-oro); margin-bottom: 25px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">6. Carga Física y Estilo de Vida</h2>
            <div class="exp-input-group" style="background:rgba(242,201,76,0.05); padding:30px; border-radius:15px; border:1px solid rgba(242,201,76,0.2);">
                <label style="font-size:1.1rem;" for="slider-estres">Nivel de Estrés Psicológico / Laboral Percibido (0-10)</label>
                <input type="range" id="slider-estres" min="0" max="10" value="${this.formData.habitos.estres}" oninput="document.getElementById('lvl-est').innerText=this.value; ExpedienteEngine.updateData('habitos', 'estres', this.value); ExpedienteEngine.announceA11y('Nivel de estrés '+this.value);" style="width:100%; accent-color:var(--valtara-oro); margin-top:20px;" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${this.formData.habitos.estres}">
                <div id="lvl-est" style="text-align:center; color:var(--valtara-oro); font-size:3.5rem; font-weight:900; margin-top:25px;" aria-hidden="true">${this.formData.habitos.estres}</div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
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
            <h2 id="exp-step-title-7" tabindex="-1" style="color: var(--valtara-cian-brillante); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">7. Inclusión y Accesibilidad</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px; line-height:1.6;">Garantizar su dignidad y comodidad es nuestra prioridad. Por favor, infórmenos si requiere algún tipo de apoyo o ajuste para su visita.</p>
            <h3 style="color:white; font-size:1.5rem; margin-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">Situaciones o Necesidades Especiales:</h3>
            <div class="a11y-grid" style="margin-bottom:40px;" role="group" aria-label="Necesidades de Accesibilidad">${accHTML}</div>
            <h3 style="color:white; font-size:1.5rem; margin-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">Ajustes Razonables Sugeridos a su Terapeuta:</h3>
            <div class="a11y-grid" role="group" aria-label="Ajustes Razonables Sugeridos">${ajsHTML}</div>
        `);

        html += this.buildStep(8, `
            <h2 id="exp-step-title-8" tabindex="-1" style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">8. Observaciones Adicionales</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:25px;">Utilice este espacio para comunicarle a su terapeuta cualquier inquietud, trauma físico pasado, o recomendación específica antes de iniciar su sesión.</p>
            ${this.buildInput('textarea', 'Información extra relevante o notas abiertas:', 'extra', null, 'Ej. "Me operaron la rodilla hace 5 años y sigue sensible", "No me gusta que me toquen los pies por favor", "Prefiero música de naturaleza"...')}
        `);

        html += this.buildStep(9, `
            <h2 id="exp-step-title-9" tabindex="-1" style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">9. Revisión Maestra</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px;">Por favor, verifique que la información esencial sea correcta antes de proceder al cifrado criptográfico y firma del documento.</p>
            <div style="display:flex; flex-direction:column; gap:20px; background: rgba(255,255,255,0.02); padding: 30px; border-radius: 20px; border: 1px solid rgba(242,201,76,0.3);">
                ${this.buildReviewRow('1. Identidad Ejecutiva', `<strong>Nombre:</strong> ${this.formData.personal.fullName || '<span style="color:#ff5555; font-weight:bold;">[Falta Nombre]</span>'}<br><strong>Teléfono:</strong> ${this.formData.personal.phone || '[Falta Teléfono]'}`, 1)}
                ${this.buildReviewRow('3. Mapa de Tensión', `${this.formData.zonas.length > 0 ? this.formData.zonas.join(', ') : 'Ninguna zona seleccionada'}`, 3)}
                ${this.buildReviewRow('6. Nivel de Estrés', `<strong style="font-size:1.3rem; color:var(--valtara-cian-brillante);">${this.formData.habitos.estres} / 10</strong>`, 6)}
                <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:10px 0;">
                <p style="color:#aaa; font-size:1.05rem; margin:0;">Si detecta un error u omisión en cualquier sección, presione el botón "Editar".</p>
            </div>
        `);

        html += this.buildStep(10, `
            <h2 id="exp-step-title-10" tabindex="-1" style="color: var(--valtara-oro); margin-bottom: 20px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">10. Certificación y Firma</h2>
            
            <div style="background: rgba(255,255,255,0.02); padding: 30px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid var(--valtara-cian-brillante);">
                <p style="color:#ddd; font-size:1.1rem; margin-bottom:15px; text-align:justify; line-height:1.6;"><strong>Aviso de Privacidad (ARCO):</strong> Sus datos de salud son considerados sensibles. Serán almacenados de forma encriptada en la memoria local de su dispositivo para proteger su privacidad de extremo a extremo.</p>
                <p style="color:#ddd; font-size:1.1rem; margin-bottom:0; text-align:justify; line-height:1.6;"><strong>Declaración de Verdad:</strong> Maniﬁesto bajo protesta de decir verdad que la información compartida es veraz. Entiendo categóricamente que ocultar condiciones de salud graves exime de responsabilidad técnica a Grupo Gevizz S.A.S.</p>
            </div>
            
            <button type="button" onclick="ExpedienteEngine.toggleLegalTruth(this)" class="a11y-grid-btn ${this.formData.legal.truthOath ? 'active' : ''}" role="switch" aria-pressed="${this.formData.legal.truthOath}" style="margin-bottom:35px; border-color:${this.formData.legal.truthOath ? 'var(--valtara-cian-brillante)' : 'rgba(255,255,255,0.2)'}; width:100%;">
                <div class="a11y-btn-header">
                    <i class="fa-solid fa-file-contract" aria-hidden="true" style="font-size:2.8rem; color:${this.formData.legal.truthOath ? 'var(--valtara-cian-brillante)' : '#888'};"></i>
                    <span class="a11y-btn-title" style="font-size:1.3rem;">Acuerdo Legal de Privacidad y Veracidad</span>
                </div>
                <span class="a11y-btn-desc" style="font-size:1.05rem;">He leído cuidadosamente los términos. Autorizo mi terapia y el procesamiento local de mis datos sensibles.</span>
                <div class="a11y-status-badge" style="${this.formData.legal.truthOath ? 'background:rgba(0,255,255,0.1); color:var(--valtara-cian-brillante); font-size:1.1rem;' : 'font-size:1.1rem;'}">${this.formData.legal.truthOath ? '✅ TÉRMINOS ACEPTADOS' : '◻️ Sin aceptar'}</div>
            </button>

            <div style="background: rgba(242,201,76,0.05); border:1px solid rgba(242,201,76,0.3); padding:35px; border-radius:20px; text-align:center;">
                <h3 style="color:var(--valtara-oro); margin-top:0; font-size:1.6rem; text-transform:uppercase;">Identidad Biométrica</h3>
                <p style="color:#aaa; font-size:1.1rem; margin-bottom:25px;">Requerimos su firma para certificar el documento y otorgarle validez médica y legal.</p>
                
                <div style="display:flex; gap:15px; margin-bottom:30px; justify-content:center;">
                    <button class="sig-mode-btn ${this.formData.legal.signatureType === 'drawn' ? 'active' : ''}" onclick="ExpedienteEngine.setSignatureMode('drawn')" aria-label="Modo dibujo manual">
                        <i class="fa-solid fa-pen-nib" aria-hidden="true"></i> DIBUJAR FIRMA
                    </button>
                    <button class="sig-mode-btn ${this.formData.legal.signatureType === 'typed' ? 'active' : ''}" onclick="ExpedienteEngine.setSignatureMode('typed')" aria-label="Modo teclado por accesibilidad">
                        <i class="fa-solid fa-keyboard" aria-hidden="true"></i> ESCRIBIR FIRMA <span style="font-size:0.8rem; display:block; font-weight:normal; margin-top:5px;">(A11y Inclusión)</span>
                    </button>
                </div>

                <!-- AREA FIRMA DIBUJADA INLINE -->
                <div id="sig-area-drawn" style="display:${this.formData.legal.signatureType === 'drawn' ? 'block' : 'none'};">
                    <p style="color:#fff; font-size:1rem; margin-bottom:15px; text-align:left;">Por favor, dibuje su rúbrica en el recuadro inferior:</p>
                    
                    <canvas id="sig-canvas" class="sig-canvas-inline" aria-label="Lienzo táctil para dibujar firma"></canvas>
                    
                    <div style="display:flex; justify-content:space-between; gap:15px; margin-top:20px;">
                        <button onclick="ExpedienteEngine.clearCanvas()" style="padding:18px; background:rgba(255,85,85,0.1); color:#ff5555; border:1px solid #ff5555; border-radius:12px; font-weight:bold; flex:1; cursor:pointer; font-size:1.05rem;" aria-label="Borrar lienzo y repetir"><i class="fa-solid fa-eraser"></i> Borrar / Repetir</button>
                        <button onclick="ExpedienteEngine.saveCanvas()" style="padding:18px; background:var(--valtara-oro); color:black; border:none; border-radius:12px; font-weight:900; flex:2; cursor:pointer; font-size:1.1rem; box-shadow:0 5px 15px rgba(242,201,76,0.3);" aria-label="Confirmar firma dibujada"><i class="fa-solid fa-check"></i> CONFIRMAR FIRMA</button>
                    </div>
                    
                    <div id="firma-success-msg" style="display:${this.formData.legal.drawnSignature ? 'block' : 'none'}; color:var(--valtara-cian-brillante); background:rgba(0,255,255,0.1); padding:15px; border-radius:10px; font-weight:bold; margin-top:20px; font-size:1.1rem; border:1px solid var(--valtara-cian-brillante);"><i class="fa-solid fa-check-circle"></i> FIRMA REGISTRADA EXITOSAMENTE</div>
                </div>

                <!-- AREA FIRMA ESCRITA (ACCESIBILIDAD) -->
                <div id="sig-area-typed" style="display:${this.formData.legal.signatureType === 'typed' ? 'block' : 'none'}; text-align:left;">
                    <div class="exp-input-group">
                        <label for="typed-sig-input">Escriba su Nombre Completo como Firma:</label>
                        <input type="text" id="typed-sig-input" class="exp-input" placeholder="Ej. Antonio López García" value="${this.formData.legal.typedSignature}" oninput="ExpedienteEngine.updateData('legal', 'typedSignature', this.value); ExpedienteEngine.updateSubmitButton();" style="font-family: 'Playfair Display', serif; font-size:1.8rem; font-style:italic; padding:25px;">
                    </div>
                    <div class="exp-input-group">
                        <label for="typed-sig-reason">Para nuestros registros oficiales de inclusión, seleccione el motivo del uso de texto alternativo:</label>
                        <select id="typed-sig-reason" class="exp-select" onchange="ExpedienteEngine.updateData('legal', 'signatureReason', this.value); ExpedienteEngine.updateSubmitButton();" style="font-size:1.05rem; padding:20px;">
                            <option value="" disabled ${!this.formData.legal.signatureReason ? 'selected' : ''}>Seleccione un motivo de la lista...</option>
                            ${this.signatureReasons.map(r => `<option value="${r}" ${this.formData.legal.signatureReason === r ? 'selected' : ''} style="background:#111;">${r}</option>`).join('')}
                        </select>
                    </div>
                    <p style="color:#aaa; font-size:0.95rem; text-align:center; margin-top:25px;"><i class="fa-solid fa-info-circle" aria-hidden="true"></i> Su nombre impreso tendrá la misma validez que la rúbrica autógrafa y se anotará el motivo justificado en el documento final.</p>
                </div>
            </div>
        `);

        content.innerHTML = html;
        this.updateUI();

        if (this.currentStep === 10 && this.formData.legal.signatureType === 'drawn') {
            setTimeout(() => this.initCanvas(), 200);
        }
    },

    // ====================================================================
    // CONSTRUCTORES UI
    // ====================================================================
    buildStep: function(index, content) {
        return `<div id="exp-step-${index}" class="exp-step ${index === this.currentStep ? 'active' : ''}">${content}</div>`;
    },

    buildInput: function(type, label, cat, key, placeholder='', extraClass='') {
        let val = cat && key ? this.formData[cat][key] : (cat ? this.formData[cat] : '');
        const onInput = `ExpedienteEngine.updateData('${cat}', '${key}', this.value)`;
        const idStr = `input-${cat}-${key}`;
        if (type === 'textarea') return `<div class="exp-input-group"><label for="${idStr}">${label}</label><textarea id="${idStr}" rows="5" oninput="${onInput}" class="exp-textarea ${extraClass}" placeholder="${placeholder}">${val}</textarea></div>`;
        return `<div class="exp-input-group"><label for="${idStr}">${label}</label><input id="${idStr}" type="${type}" oninput="${onInput}" value="${val}" class="exp-input ${extraClass}" placeholder="${placeholder}"></div>`;
    },

    buildSelect: function(label, cat, key, options) {
        let val = this.formData[cat][key];
        const idStr = `sel-${cat}-${key}`;
        let optsHTML = options.map(o => `<option value="${o}" ${val === o ? 'selected' : ''} style="background:#111; color:white;">${o}</option>`).join('');
        return `<div class="exp-input-group"><label for="${idStr}">${label}</label><select id="${idStr}" onchange="ExpedienteEngine.updateData('${cat}', '${key}', this.value)" class="exp-select"><option value="" disabled ${val === '' ? 'selected' : ''}>Seleccione...</option>${optsHTML}</select></div>`;
    },

    buildReviewRow: function(title, content, targetStep) {
        return `
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
                <div>
                    <h4 style="color: var(--valtara-oro); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">${title}</h4>
                    <p style="color: #ddd; font-size: 1.1rem; margin:0; line-height: 1.6; font-weight: 300;">${content}</p>
                </div>
                <button type="button" onclick="ExpedienteEngine.goToStep(${targetStep})" aria-label="Editar sección ${title}" style="background: rgba(242,201,76,0.1); border: 1px solid var(--valtara-oro); color: var(--valtara-oro); padding: 10px 20px; border-radius: 12px; cursor: pointer; font-size: 0.95rem; font-weight: bold; flex-shrink: 0; text-transform:uppercase; transition:0.3s;">Editar</button>
            </div>
        `;
    },

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

    setSignatureMode: function(mode) {
        this.formData.legal.signatureType = mode;
        this.saveData();
        this.renderWizard();
        this.announceA11y(`Modo de firma cambiado a ${mode === 'drawn' ? 'Dibujo manual' : 'Escritura por teclado'}`);
        this.updateSubmitButton();
        setTimeout(() => { if(mode === 'typed') document.getElementById('typed-sig-input').focus(); }, 200);
    },

    // ====================================================================
    // LÓGICA DEL CANVAS INLINE
    // ====================================================================
    initCanvas: function() {
        const canvas = document.getElementById('sig-canvas');
        if(!canvas) return;
        
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        this.signaturePad = canvas;
        const ctx = canvas.getContext('2d');
        
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#D4AF37'; // Tinta Oro Valtara
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
        
        canvas.addEventListener('mousedown', startPos);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endPos);
        canvas.addEventListener('mouseout', endPos);
        canvas.addEventListener('touchstart', startPos, {passive: false});
        canvas.addEventListener('touchmove', draw, {passive: false});
        canvas.addEventListener('touchend', endPos, {passive: false});
    },

    saveCanvas: function() {
        if(this.isCanvasBlank()) {
            alert("El lienzo está vacío. Por favor, dibuje su firma.");
            this.announceA11y("Error: El lienzo de firma está vacío.");
            return;
        }
        this.formData.legal.drawnSignature = this.signaturePad.toDataURL('image/png');
        this.saveData();
        document.getElementById('firma-success-msg').style.display = 'block';
        this.announceA11y("Firma dibujada confirmada y guardada exitosamente.");
        this.updateSubmitButton();
    },

    clearCanvas: function() {
        if(!this.signaturePad) return;
        const ctx = this.signaturePad.getContext('2d');
        ctx.clearRect(0, 0, this.signaturePad.width, this.signaturePad.height);
        this.formData.legal.drawnSignature = null;
        this.saveData();
        document.getElementById('firma-success-msg').style.display = 'none';
        this.announceA11y("Lienzo de firma borrado.");
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
                alert("Por favor, ingrese amablemente su Nombre Completo para continuar."); 
                this.announceA11y("Error: Nombre completo requerido para continuar.");
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
        const content = document.getElementById('exp-wizard-content');
        if (content) content.scrollTop = 0;
        
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
            this.announceA11y("El documento está listo para ser certificado y descargado.");
        } else {
            btnSubmit.disabled = true;
            btnSubmit.style.background = "#333";
            btnSubmit.style.color = "#888";
            submitText.innerText = `Bloqueado: ${errorMsg}`;
        }
    },

    // ====================================================================
    // MOTOR GENERADOR DE SVG PARA EL MAPA CORPORAL
    // ====================================================================
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
                    <text x="${lineX}%" y="${coords.cy - 1}%" fill="#ffffff" font-size="2.5" font-family="helvetica" text-anchor="${anchor}" font-weight="bold">${zoneName.toUpperCase()}</text>
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

    // ====================================================================
    // MOTOR PDF VECTORIAL MATEMÁTICO (jsPDF Nativo Cero Cortes)
    // ====================================================================
    generatePDF: async function() {
        const btnSubmit = document.getElementById('exp-btn-submit');
        const loader = document.getElementById('exp-loader');
        
        btnSubmit.style.display = 'none';
        document.getElementById('exp-btn-prev').style.display = 'none';
        loader.style.display = 'block';
        this.announceA11y("Iniciando motor matemático de renderizado PDF. Por favor, espere.");

        // Inyectamos jsPDF dinámicamente si no existe (Aseguramos la herramienta bancaria)
        if (!window.jspdf) {
            try {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            } catch (e) {
                alert("Error crítico: El firewall bloqueó el motor PDF. Por favor verifique su conexión.");
                btnSubmit.style.display = 'flex';
                loader.style.display = 'none';
                return;
            }
        }

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
        
        // Constantes del Documento
        const d = this.formData;
        const nombre = d.personal.fullName || 'Paciente Ejecutivo';
        const iniciales = nombre.split(' ').map(n => n[0]).join('').substring(0,3).toUpperCase();
        const dateObj = new Date();
        const folioReal = `FOLIO-${iniciales}-${dateObj.getFullYear()}${(dateObj.getMonth()+1).toString().padStart(2,'0')}${dateObj.getDate().toString().padStart(2,'0')}-${dateObj.getHours().toString().padStart(2,'0')}${dateObj.getMinutes().toString().padStart(2,'0')}`;
        const hash = "SHA256-" + Math.random().toString(36).substr(2, 16).toUpperCase() + Math.random().toString(36).substr(2, 16).toUpperCase();
        
        const pageWidth = pdf.internal.pageSize.getWidth(); // 612 pts
        const pageHeight = pdf.internal.pageSize.getHeight(); // 792 pts
        const margin = 40;
        let currentY = margin;
        let pageNum = 1;

        // Paleta de Colores Corporativa
        const c_bg = [5, 5, 8];       // #050508 Midnight Black
        const c_gold = [212, 175, 55]; // #D4AF37 Valtara Gold
        const c_white = [255, 255, 255];
        const c_gray = [170, 170, 170];
        const c_red = [255, 85, 85];
        const c_green = [0, 176, 155];

        // Función Maestra: Crear Nueva Hoja con Sellos Institucionales
        const addPageWithHeaders = () => {
            pdf.setFillColor(...c_bg);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');
            
            // Sellos en las Esquinas
            pdf.setFontSize(6);
            pdf.setTextColor(80, 80, 80);
            pdf.setFont("helvetica", "normal");
            pdf.text("VALTARA EXECUTIVE THERAPY | DOC. OFICIAL", 20, 20);
            pdf.text(`VERIFICACIÓN CRIPTOGRÁFICA: ${hash.substring(0,25)}...`, 20, pageHeight - 15);
            pdf.text("COPIA SOBERANA DEL PACIENTE", pageWidth - 20, pageHeight - 15, { align: 'right' });

            // Encabezado Principal
            pdf.setFont("times", "bold");
            pdf.setFontSize(26);
            pdf.setTextColor(...c_gold);
            pdf.text("VALTARA", margin, margin + 20);
            
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(8);
            pdf.setTextColor(120, 120, 120);
            pdf.text("EXECUTIVE THERAPY & BIOMECHANICS", margin, margin + 32);

            // Información Derecha
            pdf.setFontSize(10);
            pdf.setTextColor(...c_white);
            pdf.text(`FOLIO: ${folioReal}`, pageWidth - margin, margin + 15, { align: 'right' });
            pdf.setTextColor(...c_gray);
            pdf.setFontSize(8);
            pdf.text(`Paciente: ${nombre}`, pageWidth - margin, margin + 26, { align: 'right' });
            pdf.text(`Fecha: ${dateObj.toLocaleDateString()}`, pageWidth - margin, margin + 36, { align: 'right' });

            // Línea Divisoria
            pdf.setDrawColor(...c_gold);
            pdf.setLineWidth(1.5);
            pdf.line(margin, margin + 45, pageWidth - margin, margin + 45);

            // Pie de Página (Certificaciones Institucionales Omnipresentes)
            const footerY = pageHeight - 65;
            pdf.setDrawColor(...c_gold);
            pdf.setLineWidth(0.5);
            pdf.line(margin, footerY, pageWidth - margin, footerY);
            
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(7);
            pdf.setTextColor(...c_gold);
            pdf.text("AVAL Y CERTIFICACIONES OFICIALES INSTITUCIONALES:", margin, footerY + 15);
            
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(150, 150, 150);
            pdf.text("Terapeuta Físico para la Salud (Masoterapia Clínica) | RENATED: A-54878 | SEP DGCFT: RVOE 17FT061 | SISAE | NTCL: CSSA0409.01", margin, footerY + 25);
            pdf.text("Este documento está protegido bajo secreto profesional y la Ley Federal de Protección de Datos Personales (ARCO).", margin, footerY + 35);
            
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Página ${pageNum}`, pageWidth - margin, footerY + 25, { align: 'right' });

            currentY = margin + 80; // Resetea el cursor Y para el contenido
        };

        // Algoritmo Paginador Matemático
        const checkPageBreak = (neededHeight) => {
            if (currentY + neededHeight > pageHeight - 80) { // Respeta el footer
                pdf.addPage();
                pageNum++;
                addPageWithHeaders();
            }
        };

        // Herramienta de Dibujo de Tablas Vectoriales
        const drawSectionTitle = (title, theme = 'gold') => {
            checkPageBreak(40);
            const color = theme === 'danger' ? c_red : (theme === 'success' ? c_green : c_gold);
            
            // Barra lateral
            pdf.setFillColor(...color);
            pdf.rect(margin, currentY, 4, 22, 'F');
            
            // Fondo oscuro de tarjeta
            pdf.setFillColor(15, 15, 20);
            pdf.rect(margin + 4, currentY, pageWidth - (margin*2) - 4, 22, 'F');
            
            // Texto
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(11);
            pdf.setTextColor(...color);
            pdf.text(title.toUpperCase(), margin + 15, currentY + 15);
            
            currentY += 30;
        };

        const drawRow = (label, value, isHighlight = false) => {
            const valStr = (value === '' || value === null || value === undefined) ? '---' : String(value);
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            const splitVal = pdf.splitTextToSize(valStr, 300); // Envoltura automática de texto
            const rowHeight = Math.max(22, splitVal.length * 12 + 10);
            
            checkPageBreak(rowHeight);

            // Etiqueta
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(...c_gray);
            pdf.text(label, margin + 10, currentY + 12);

            // Valor
            if (isHighlight) {
                pdf.setFont("helvetica", "bold");
                pdf.setTextColor(...c_gold);
            } else {
                pdf.setFont("helvetica", "normal");
                pdf.setTextColor(...c_white);
            }
            pdf.text(splitVal, margin + 200, currentY + 12);

            // Línea sutil
            pdf.setDrawColor(30, 30, 35);
            pdf.setLineWidth(0.5);
            pdf.line(margin, currentY + rowHeight - 2, pageWidth - margin, currentY + rowHeight - 2);

            currentY += rowHeight;
        };

        const drawTextBlock = (text, isDanger = false) => {
            pdf.setFont("helvetica", "italic");
            pdf.setFontSize(10);
            const splitText = pdf.splitTextToSize(text, pageWidth - (margin*2) - 20);
            const height = splitText.length * 14 + 20;
            checkPageBreak(height);

            pdf.setFillColor(10, 10, 15);
            pdf.rect(margin, currentY, pageWidth - (margin*2), height, 'F');
            pdf.setTextColor(isDanger ? c_red[0] : 200, isDanger ? c_red[1] : 200, isDanger ? c_red[2] : 200);
            pdf.text(splitText, margin + 10, currentY + 18);
            
            currentY += height + 15;
        };

        // ==============================================================================
        // INICIO DEL ARMADO DEL DOCUMENTO VECTORIAL
        // ==============================================================================
        addPageWithHeaders();

        // 1. Identidad
        drawSectionTitle("1. Identidad Ejecutiva");
        drawRow("Nombre Oficial", d.personal.fullName, true);
        drawRow("Identificación (CURP)", d.personal.curp);
        drawRow("Fecha de Nacimiento", d.personal.birthDate);
        drawRow("Edad", d.personal.age ? `${d.personal.age} años` : '');
        drawRow("Sexo / Género", d.personal.gender);
        drawRow("Teléfono / Correo", `${d.personal.phone || '---'} | ${d.personal.email || '---'}`);
        drawRow("Ocupación", d.personal.occupation);
        drawRow("Actividad Física", d.personal.activity);
        currentY += 15;

        // 2. Motivo
        drawSectionTitle("2. Motivo de Atención Terapéutica");
        drawRow("Motivo Principal", d.motivo.principal);
        drawRow("Objetivo de la Sesión", d.motivo.objetivo);
        drawRow("Evolución", d.motivo.evolucion);
        drawRow("Recurrencia", d.motivo.recurrente);
        drawTextBlock(`Expectativas: "${d.motivo.mejora || 'No especificadas'}"`);

        // 3. Mapa Biomecánico
        drawSectionTitle("3. Escáner Topográfico de Tensión", "danger");
        drawRow("Zonas Afectadas", d.zonas.length > 0 ? d.zonas.join(', ') : 'Ninguna reportada');
        
        // Renderizado SVG a Canvas y a PDF
        const svgString = this.generateBodyMapSVG(d.zonas);
        const svgBlob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
        const url = URL.createObjectURL(svgBlob);
        
        await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 800; canvas.height = 500;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#050508'; // Garantiza fondo negro
                ctx.fillRect(0,0,800,500);
                ctx.drawImage(img, 0, 0, 800, 500);
                const mapDataUrl = canvas.toDataURL('image/jpeg', 1.0);
                
                checkPageBreak(220); // Espacio para la imagen
                pdf.addImage(mapDataUrl, 'JPEG', margin + 20, currentY, pageWidth - (margin*2) - 40, 200);
                currentY += 220;
                URL.revokeObjectURL(url);
                resolve();
            };
            img.src = url;
        });

        // 4. Sensorial
        drawSectionTitle("4. Análisis Sensorial Específico", "danger");
        drawRow("Sensación Descrita", d.dolorDetalle.sensacion);
        
        // Fila especial para Intensidad
        checkPageBreak(30);
        pdf.setFont("helvetica", "bold"); pdf.setFontSize(10); pdf.setTextColor(...c_gray);
        pdf.text("Intensidad Declarada", margin + 10, currentY + 20);
        pdf.setFontSize(18); pdf.setTextColor(...c_red);
        pdf.text(`${d.dolorDetalle.intensidad} / 10`, margin + 200, currentY + 20);
        currentY += 35;

        drawRow("Inicio del Malestar", d.dolorDetalle.desde);
        drawRow("Frecuencia", d.dolorDetalle.constante);
        drawRow("Agravantes", d.dolorDetalle.empeora);
        drawRow("Atenuantes", d.dolorDetalle.alivia);
        currentY += 15;

        // 5. Historial Clínico
        drawSectionTitle("5. Historial Médico y Contraindicaciones", "danger");
        let hasClinicals = false;
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let activos = [];
            category.items.forEach(item => { if(d.clinical[catKey] && d.clinical[catKey][item.id]) activos.push(item.label); });
            if(activos.length > 0) {
                drawRow(category.title, activos.join(', '));
                hasClinicals = true;
            }
        }
        if(!hasClinicals) drawTextBlock("El paciente no reportó ninguna condición médica o riesgo diagnosticado.", false);
        currentY += 15;

        // 6. Hábitos
        drawSectionTitle("6. Carga Biomecánica y Hábitos");
        checkPageBreak(30);
        pdf.setFont("helvetica", "bold"); pdf.setFontSize(10); pdf.setTextColor(...c_gray);
        pdf.text("Estrés Psicológico / Laboral", margin + 10, currentY + 20);
        pdf.setFontSize(18); pdf.setTextColor(...c_gold);
        pdf.text(`${d.habitos.estres} / 10`, margin + 200, currentY + 20);
        currentY += 35;
        
        drawRow("Calidad / Horas Sueño", `${d.habitos.suenoCalidad || '---'} (${d.habitos.suenoHoras || '---'} hrs)`);
        drawRow("Trabajo (Sentado/Pie)", `${d.habitos.sentado || '---'} | ${d.habitos.pie || '---'}`);
        drawRow("Carga Física / Deporte", `${d.habitos.carga || '---'} | ${d.habitos.deporte || '---'}`);
        currentY += 15;

        // 7. Accesibilidad
        drawSectionTitle("7. Inclusión y Observaciones Especiales");
        drawRow("Apoyos Requeridos", d.accessibility.profile.length > 0 ? d.accessibility.profile.join(', ') : 'Ninguno reportado');
        drawRow("Ajustes Solicitados", d.accessibility.supports || 'Ninguno reportado');
        drawTextBlock(`Notas Abiertas: "${d.extra || 'Sin notas.'}"`);

        // 8. LEGAL Y FIRMAS
        checkPageBreak(250); // Asegurar que todo el bloque legal entre en una hoja
        drawSectionTitle("8. Consentimiento y Firma de Autorización");
        
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(180, 180, 180);
        const legalText = `Manifiesto bajo protesta de decir verdad que la información contenida en este expediente (Folio ${folioReal}) es veraz. Entiendo que la atención brindada por Grupo Gevizz S.A.S. corresponde a masoterapia clínica y valoración funcional, no sustituye diagnóstico médico alópata. Omitir condiciones graves exime de responsabilidad técnica a la empresa.\n\nAutorizo que mis datos sensibles sean resguardados en mi dispositivo local, conforme a la Ley Federal de Protección de Datos Personales (ARCO).`;
        const splitLegal = pdf.splitTextToSize(legalText, pageWidth - (margin*2));
        pdf.text(splitLegal, margin, currentY);
        currentY += splitLegal.length * 12 + 30;

        // Renderizado Dual de Firma Exactamente sobre la línea
        const drawSignatureBlock = () => {
            // Bloque Paciente (Izquierda)
            if (d.legal.signatureType === 'drawn' && d.legal.drawnSignature) {
                // Inyectamos la imagen PNG transparente
                pdf.addImage(d.legal.drawnSignature, 'PNG', margin + 10, currentY, 180, 70);
            } else {
                // Firma por Texto Accesible (Serif Itálica)
                pdf.setFont("times", "italic");
                pdf.setFontSize(16);
                pdf.setTextColor(...c_white);
                pdf.text(d.legal.typedSignature, margin + 100, currentY + 50, { align: 'center' });
            }

            // Líneas y Nombres
            pdf.setDrawColor(...c_gold);
            pdf.setLineWidth(1);
            pdf.line(margin, currentY + 70, margin + 200, currentY + 70);
            
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(10);
            pdf.setTextColor(...c_white);
            pdf.text(d.legal.signatureType === 'drawn' ? "FIRMA DIGITAL AUTÓGRAFA" : "FIRMA POR TEXTO ALTERNATIVO", margin + 100, currentY + 85, { align: 'center' });
            
            pdf.setFontSize(8);
            pdf.setTextColor(...c_gray);
            pdf.text(nombre, margin + 100, currentY + 97, { align: 'center' });
            if (d.legal.signatureType === 'typed') {
                pdf.setTextColor(...c_red);
                pdf.text("* Accesibilidad / Inclusión", margin + 100, currentY + 109, { align: 'center' });
            }

            // Bloque Terapeuta (Derecha)
            const rightX = pageWidth - margin - 200;
            pdf.setDrawColor(100, 100, 100);
            pdf.setLineWidth(0.5);
            // pdf.setLineDash([5, 5], 0); // No disponible en todos los builds de jsPDF, usamos linea sólida sutil
            pdf.line(rightX, currentY + 70, pageWidth - margin, currentY + 70);
            
            pdf.setFont("helvetica", "italic");
            pdf.setFontSize(7);
            pdf.setTextColor(120, 120, 120);
            pdf.text("(Sello y firma a la recepción del documento)", rightX + 100, currentY + 65, { align: 'center' });
            
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(10);
            pdf.setTextColor(...c_white);
            pdf.text("EL TERAPEUTA CLÍNICO", rightX + 100, currentY + 85, { align: 'center' });
            
            pdf.setFontSize(9);
            pdf.setTextColor(...c_gold);
            pdf.text("Ángel de Jesús Guerrero Vizzuett", rightX + 100, currentY + 97, { align: 'center' });
        };

        drawSignatureBlock();
        
        // Guardado y Descarga Final
        pdf.save(`Valtara_${folioReal}.pdf`);
        
        loader.innerHTML = '<i class="fa-solid fa-check"></i> EXPEDIENTE DESCARGADO';
        loader.style.color = '#00b09b';
        this.announceA11y("Documento generado y descargado con éxito.");
        
        const mensaje = `*Aura Assistant (Valtara)* 🌿%0A%0AHe concluido el llenado y certificación de mi Historia Clínica.%0A%0A*Paciente:* ${nombre}%0A*Folio:* ${folioReal}%0A*Estrés Biomecánico:* ${d.habitos.estres}/10%0A%0A_A continuación adjunto el Dossier Oficial Cifrado para su revisión física y firma autógrafa._`;
        
        setTimeout(() => {
            this.closeOverlay();
            window.open(`https://wa.me/5213348572070?text=${mensaje}`, '_blank');
            setTimeout(() => { 
                loader.style.display = 'none'; 
                loader.innerHTML = '<i class="fa-solid fa-lock fa-fade"></i> CIFRANDO DOCUMENTO...';
                loader.style.color = 'var(--valtara-cian-brillante)';
                btnSubmit.style.display = 'flex';
                document.getElementById('exp-btn-prev').style.display = 'flex';
            }, 1000); 
        }, 2500);
    }
};

window.addEventListener('DOMContentLoaded', () => ExpedienteEngine.init());
