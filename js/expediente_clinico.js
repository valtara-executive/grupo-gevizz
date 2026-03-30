/**
 * ====================================================================================
 * BLOQUE 10: EXPEDIENTE CLÍNICO SOBERANO V34.0 "TITÁN OSCURO"
 * Accesibilidad ARIA, Firma Dual, PDF Auto-Paginable Dark Mode con Sellos Nativos.
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
            signatureType: 'drawn', // 'drawn' | 'typed'
            drawnSignature: null, 
            typedSignature: '',
            signatureReason: ''
        },
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
        "Discapacidad o limitación motriz severa en extremidades superiores",
        "Temblores, Parkinson o condición neurológica que impide el trazo",
        "Falla técnica o incompatibilidad del panel táctil del dispositivo actual",
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
                    console.warn("Valtara: Detectada base de datos clínica antigua. Migrando a esquema V34.0...");
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
            <h4 style="color: white; font-family: var(--font-accent); font-size: 1.8rem; margin:0 0 15px 0;">Control de Seguimiento Clínico</h4>
            <p style="color: #ccc; font-size: 1.1rem; margin-bottom: 25px; font-weight: 300; line-height: 1.5;">Han pasado más de 15 días desde su último registro biomecánico. Por su absoluta seguridad técnica, ¿han cambiado sus niveles de dolor, condiciones médicas o medicamentos?</p>
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
                if(stepTitle) {
                    stepTitle.focus();
                }
                this.announceA11y("Historia Clínica Soberana iniciada. Navegue hacia abajo para completar los campos. Utilice los botones de siguiente y atrás ubicados en la parte inferior.");
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
            .btn-secondary { background: rgba(255,255,255,0.05); color: #fff; border: 2px solid rgba(255,255,255,0.2); }
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
            
            /* LIENZO DE FIRMA INLINE */
            .sig-canvas-inline { width: 100%; height: 280px; background: #fff; border-radius: 12px; border: 3px dashed #ccc; cursor: crosshair; touch-action: none; margin-bottom:15px; box-shadow:inset 0 5px 15px rgba(0,0,0,0.1); transition:0.3s; }
            .sig-canvas-inline:focus { border-color: var(--valtara-oro); outline:none; }
            
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

        // PASO 0: Protocolo Inicial
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

        // PASO 1: Identidad
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

        // PASO 2: Motivo
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

        // PASO 3: Zonas (Cuadrícula A11y)
        let zonasHTML = this.zonasList.map(z => this.buildGridToggleCard('array', z, 'zonas', null, z, 'fa-child-reaching', 'warning')).join('');
        html += this.buildStep(3, `
            <h2 id="exp-step-title-3" tabindex="-1" style="color: var(--valtara-oro); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">3. Mapa de Tensión Corporal</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px;">Seleccione amablemente todas las áreas de su cuerpo donde presente tensión, rigidez o dolor actual.</p>
            <div class="a11y-grid" role="group" aria-label="Zonas del cuerpo afectadas">${zonasHTML}</div>
        `);

        // PASO 4: Dolor
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

        // PASO 5: Clínica
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

        // PASO 6: Hábitos
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

        // PASO 7: Accesibilidad
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

        // PASO 8: Observaciones
        html += this.buildStep(8, `
            <h2 id="exp-step-title-8" tabindex="-1" style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">8. Observaciones Adicionales</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:25px;">Utilice este espacio para comunicarle a su terapeuta cualquier inquietud, trauma físico pasado, o recomendación específica antes de iniciar su sesión.</p>
            ${this.buildInput('textarea', 'Información extra relevante o notas abiertas:', 'extra', null, 'Ej. "Me operaron la rodilla hace 5 años y sigue sensible", "No me gusta que me toquen los pies por favor", "Prefiero música de naturaleza"...')}
        `);

        // PASO 9: Revisión Maestra
        html += this.buildStep(9, `
            <h2 id="exp-step-title-9" tabindex="-1" style="color: var(--valtara-blanco); margin-bottom: 15px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">9. Revisión Maestra</h2>
            <p style="color:#aaa; font-size:1.1rem; margin-bottom:30px;">Por favor, verifique que la información esencial sea correcta antes de proceder al cifrado criptográfico y firma del documento.</p>
            <div style="display:flex; flex-direction:column; gap:20px; background: rgba(255,255,255,0.02); padding: 30px; border-radius: 20px; border: 1px solid rgba(242,201,76,0.3);">
                ${this.buildReviewRow('1. Identidad Ejecutiva', `<strong>Nombre:</strong> ${this.formData.personal.fullName || '<span style="color:#ff5555; font-weight:bold;">[Falta Nombre]</span>'}<br><strong>Ocupación:</strong> ${this.formData.personal.occupation || 'No especificada'}`, 1)}
                ${this.buildReviewRow('3. Mapa de Tensión', `${this.formData.zonas.length > 0 ? this.formData.zonas.join(', ') : 'Ninguna zona seleccionada'}`, 3)}
                ${this.buildReviewRow('6. Nivel de Estrés', `<strong style="font-size:1.3rem; color:var(--valtara-cian-brillante);">${this.formData.habitos.estres} / 10</strong>`, 6)}
                <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:10px 0;">
                <p style="color:#aaa; font-size:1.05rem; margin:0;">Si detecta un error u omisión en cualquier sección, presione el botón "Editar".</p>
            </div>
        `);

        // PASO 10: LEGAL Y FIRMA INLINE DUAL (V34.0 - Cero Modales Extra)
        html += this.buildStep(10, `
            <h2 id="exp-step-title-10" tabindex="-1" style="color: var(--valtara-oro); margin-bottom: 25px; font-family: var(--font-accent); font-size:2.4rem; outline:none;">10. Certificación y Firma</h2>
            
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

            <!-- CONTENEDOR DE FIRMA DUAL -->
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

                <!-- AREA FIRMA DIBUJADA INLINE (Segura para Móviles) -->
                <div id="sig-area-drawn" style="display:${this.formData.legal.signatureType === 'drawn' ? 'block' : 'none'};">
                    <p style="color:#fff; font-size:1rem; margin-bottom:15px; text-align:left;">Por favor, dibuje su rúbrica en el recuadro inferior:</p>
                    
                    <canvas id="sig-canvas" class="sig-canvas-inline" aria-label="Lienzo táctil en blanco para dibujar firma"></canvas>
                    
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

        // Inicializar Canvas si estamos en el último paso y modo dibujo
        if (this.currentStep === 10 && this.formData.legal.signatureType === 'drawn') {
            setTimeout(() => this.initCanvas(), 200);
        }
    },

    // ====================================================================
    // HELPERS UI & CANVAS INLINE
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
        
        setTimeout(() => {
            if(mode === 'typed') {
                const inp = document.getElementById('typed-sig-input');
                if(inp) inp.focus();
            }
        }, 200);
    },

    // ====================================================================
    // LÓGICA DEL CANVAS INLINE (Cero Modales, Bloqueo de Scroll)
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
        ctx.strokeStyle = '#050508';
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Redibujar si ya existía firma guardada antes de renderizar
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

        // Magia para Móviles: Evita que la pantalla haga scroll mientras dibujas
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
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, this.signaturePad.width, this.signaturePad.height);
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
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0, blank.width, blank.height);
        return this.signaturePad.toDataURL() === blank.toDataURL();
    },

    // ====================================================================
    // EVENTOS Y SEMÁFORO DE ERRORES
    // ====================================================================
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
        if (content) content.scrollTop = 0; // Subir el scroll en la ventana interna
        
        // Foco de Accesibilidad Dinámico
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

    // EL SEMÁFORO DE ERRORES INTELIGENTE
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
    // MOTOR PDF DE ALTA COSTURA: FONDO OSCURO, AUTO-PAGINABLE Y NATIVO (V34)
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

        // 1. Procesamiento Dinámico de Afecciones
        let clinicaHTML = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let activos = [];
            category.items.forEach(item => { if(d.clinical[catKey] && d.clinical[catKey][item.id]) activos.push(item.label); });
            if(activos.length > 0) clinicaHTML += `<div style="margin-bottom:10px; border-left:4px solid #ff5555; padding-left:12px; background:rgba(255,85,85,0.05); padding:12px; border-radius:6px;"><strong style="color:#ff5555; font-size:12px; text-transform:uppercase;">${category.title}:</strong> <span style="color:#fff; font-weight:900; font-size:13px; display:block; margin-top:5px;">${activos.join(', ')}</span></div>`;
        }
        if(clinicaHTML === '') clinicaHTML = `<div style="color:#00e676; font-weight:bold; background:rgba(0,230,118,0.05); padding:15px; border-radius:8px; border-left:4px solid #00e676; font-size:13px;">El paciente no reportó ninguna condición médica o factor de riesgo diagnosticado.</div>`;

        // 2. Procesamiento Dinámico de Firma
        let signatureBlockHTML = '';
        if (d.legal.signatureType === 'drawn') {
            signatureBlockHTML = `
                <div style="height:90px; background:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; padding:5px; margin-bottom:8px;">
                    <img src="${d.legal.drawnSignature}" style="max-width:100%; max-height:80px; object-fit:contain;">
                </div>
                <p style="margin:0; font-size:12px; font-weight:900; text-transform:uppercase; color:#fff;">Firma Digital Autógrafa</p>
                <p style="margin:2px 0 0 0; font-size:11px; color:#aaa;">${nombre}</p>
            `;
        } else {
            signatureBlockHTML = `
                <div style="height:90px; display:flex; flex-direction:column; justify-content:flex-end; border-bottom:1px solid #444; margin-bottom:8px; padding-bottom:10px;">
                    <span style="font-family: 'Playfair Display', serif; font-size: 20px; font-style: italic; color: #fff;">${d.legal.typedSignature}</span>
                </div>
                <p style="margin:0; font-size:12px; font-weight:900; text-transform:uppercase; color:#fff;">Firma por Texto Alternativo</p>
                <p style="margin:2px 0 0 0; font-size:10px; color:#ff5555; font-weight:bold;">* Accesibilidad Institucional</p>
                <p style="margin:2px 0 0 0; font-size:9px; color:#888;">Motivo: ${d.legal.signatureReason}</p>
            `;
        }

        // 3. Estructura HTML Base para Auto-Paginación
        const pdfContent = document.createElement('div');
        pdfContent.innerHTML = `
            <style>
                /* Estilos globales para PDF Dark Mode */
                .pdf-wrap { background-color: #050508; color: #ffffff; padding: 40px; font-family: 'Lato', sans-serif; box-sizing: border-box; min-height: 1000px; }
                .pdf-main-header { border-bottom: 2px solid #D4AF37; padding-bottom: 15px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items:flex-end;}
                .pdf-title-text { color: #D4AF37; font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 900; margin: 0; letter-spacing: 2px; }
                .pdf-subtitle-text { color: #888; font-size: 11px; letter-spacing: 4px; margin: 5px 0 0 0; font-weight: bold; }
                
                /* Las secciones NUNCA se cortan a la mitad gracias al page-break-inside: avoid */
                .pdf-section { page-break-inside: avoid; margin-bottom: 25px; background-color: #0c0c12; border-radius: 12px; border-left: 5px solid #D4AF37; padding: 25px; border-top: 1px solid #1a1a24; border-right: 1px solid #1a1a24; border-bottom: 1px solid #1a1a24; }
                .pdf-section.danger { border-left-color: #ff5555; }
                .pdf-section.success { border-left-color: #00b09b; }
                
                .pdf-h3 { color: #D4AF37; font-size: 15px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; font-weight: 900; letter-spacing: 1px; }
                .pdf-row { display: flex; justify-content: space-between; border-bottom: 1px solid #1a1a24; padding: 8px 0; }
                .pdf-row:last-child { border-bottom: none; padding-bottom: 0; }
                .pdf-label { width: 40%; color: #888; font-size: 12px; font-weight: bold; }
                .pdf-val { width: 60%; color: #eee; font-size: 13px; font-weight: bold; text-align:right;}
                .pdf-text { color: #ccc; font-size: 12px; line-height: 1.6; margin: 0; text-align: justify; font-style:italic;}
            </style>
            
            <div class="pdf-wrap">
                <!-- CABECERA -->
                <div class="pdf-main-header">
                    <div>
                        <h1 class="pdf-title-text">VALTARA</h1>
                        <p class="pdf-subtitle-text">EXECUTIVE THERAPY & BIOMECHANICS</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin: 0; color: #fff; font-weight: bold; font-size: 14px; text-transform: uppercase;">Expediente Clínico</p>
                        <p style="margin: 3px 0 0 0; color: #D4AF37; font-size: 11px;">Folio Único: ${folioReal}</p>
                    </div>
                </div>

                <!-- SECCIONES DE CONTENIDO QUE FLUYEN AUTOMÁTICAMENTE -->
                <div class="pdf-section">
                    <h3 class="pdf-h3">1. Identidad Ejecutiva</h3>
                    <div class="pdf-row"><div class="pdf-label">Nombre Oficial</div><div class="pdf-val" style="color:#D4AF37;">${d.personal.fullName}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Identificación (CURP)</div><div class="pdf-val">${d.personal.curp || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Nacimiento</div><div class="pdf-val">${d.personal.birthDate || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Edad</div><div class="pdf-val">${d.personal.age || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Sexo / Género</div><div class="pdf-val">${d.personal.gender || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Teléfono de Contacto</div><div class="pdf-val">${d.personal.phone || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Correo Electrónico</div><div class="pdf-val">${d.personal.email || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Ocupación / Cargo</div><div class="pdf-val">${d.personal.occupation || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Nivel de Actividad Física</div><div class="pdf-val">${d.personal.activity || '---'}</div></div>
                </div>

                <div class="pdf-section">
                    <h3 class="pdf-h3">2. Motivo de Atención Terapéutica</h3>
                    <div class="pdf-row"><div class="pdf-label">Motivo Principal</div><div class="pdf-val">${d.motivo.principal || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Objetivo de la Sesión</div><div class="pdf-val">${d.motivo.objetivo || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Tiempo de Evolución</div><div class="pdf-val">${d.motivo.evolucion || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">¿Es Recurrente?</div><div class="pdf-val">${d.motivo.recurrente || '---'}</div></div>
                    <div style="margin-top:15px;"><strong style="color:#888; font-size:12px; display:block; margin-bottom:5px;">Expectativas de Mejora:</strong><p class="pdf-text">"${d.motivo.mejora || 'No especificadas'}"</p></div>
                </div>

                <div class="pdf-section danger">
                    <h3 class="pdf-h3" style="color:#ff5555;">3. Mapa de Tensión y Dolor</h3>
                    <div class="pdf-row"><div class="pdf-label">Zonas Afectadas</div><div class="pdf-val" style="color:#ff5555; text-align:left; line-height:1.4;">${d.zonas.length > 0 ? d.zonas.join(', ') : 'Ninguna reportada'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Sensación Descrita</div><div class="pdf-val">${d.dolorDetalle.sensacion || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label" style="color:#fff;">Intensidad Declarada</div><div class="pdf-val" style="font-size:18px; color:#ff5555;">${d.dolorDetalle.intensidad} / 10</div></div>
                    <div class="pdf-row"><div class="pdf-label">Evolución</div><div class="pdf-val">${d.dolorDetalle.desde || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Frecuencia</div><div class="pdf-val">${d.dolorDetalle.constante || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Agravantes</div><div class="pdf-val">${d.dolorDetalle.empeora || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Atenuantes</div><div class="pdf-val">${d.dolorDetalle.alivia || '---'}</div></div>
                </div>

                <div class="pdf-section danger">
                    <h3 class="pdf-h3" style="color:#ff5555;">4. Antecedentes Médicos Relevantes</h3>
                    <p style="font-size:11px; color:#888; margin-top:0; font-style:italic; margin-bottom:15px;">* Declaración del paciente bajo protesta de decir verdad:</p>
                    ${clinicaHTML}
                </div>

                <div class="pdf-section">
                    <h3 class="pdf-h3">5. Estilo de Vida y Carga Biomecánica</h3>
                    <div class="pdf-row"><div class="pdf-label" style="color:#fff;">Estrés Psicológico/Laboral</div><div class="pdf-val" style="font-size:18px; color:#D4AF37;">${d.habitos.estres} / 10</div></div>
                    <div class="pdf-row"><div class="pdf-label">Calidad del Sueño</div><div class="pdf-val">${d.habitos.suenoCalidad || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Horas de Sueño Diario</div><div class="pdf-val">${d.habitos.suenoHoras || '---'} hrs</div></div>
                    <div class="pdf-row"><div class="pdf-label">Trabajo Sentado</div><div class="pdf-val">${d.habitos.sentado || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Trabajo de Pie</div><div class="pdf-val">${d.habitos.pie || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Esfuerzo Físico Constante</div><div class="pdf-val">${d.habitos.carga || '---'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Deporte de Alto Impacto</div><div class="pdf-val">${d.habitos.deporte || '---'}</div></div>
                </div>

                <div class="pdf-section">
                    <h3 class="pdf-h3">6. Accesibilidad e Inclusión</h3>
                    <div class="pdf-row"><div class="pdf-label">Apoyos Requeridos</div><div class="pdf-val" style="text-align:left; line-height:1.4;">${d.accessibility.profile.length > 0 ? d.accessibility.profile.join(', ') : 'Ninguno reportado'}</div></div>
                    <div class="pdf-row"><div class="pdf-label">Ajustes Razonables</div><div class="pdf-val" style="text-align:left; line-height:1.4;">${d.accessibility.supports || 'Ninguno reportado'}</div></div>
                </div>

                <div class="pdf-section">
                    <h3 class="pdf-h3">7. Observaciones Adicionales</h3>
                    <p class="pdf-text">"${d.extra || 'El paciente no refirió observaciones adicionales o notas específicas.'}"</p>
                </div>

                <div class="pdf-section" style="border-left-color: #555;">
                    <h3 class="pdf-h3" style="color:#fff;">8. Consentimiento Informado (ARCO)</h3>
                    <div style="font-size:11px; text-align:justify; line-height:1.6; color:#ccc; padding:15px; border:1px solid #333; border-radius:8px; background:#111;">
                        <p style="margin-top:0;"><strong>DECLARACIÓN DE VERDAD Y RESPONSABILIDAD:</strong> Maniﬁesto bajo protesta de decir verdad que la información contenida en este expediente (Folio ${folioReal}) es veraz. Entiendo categóricamente que la atención brindada por Grupo Gevizz S.A.S. de C.V. corresponde a masoterapia clínica, terapia manual y valoración funcional, y de ninguna manera sustituye un diagnóstico ni tratamiento médico alópata.</p>
                        <p>He sido debidamente informado de que omitir dolencias agudas, infecciones, cirugías recientes, embarazos, uso de anticoagulantes o presencia de patologías severas compromete gravemente mi integridad física, deslindando absolutamente a la empresa y al terapeuta a cargo de cualquier responsabilidad derivada de dicha omisión.</p>
                        <p style="margin-bottom:0;"><strong>AVISO DE PRIVACIDAD:</strong> Autorizo que mis datos de salud (sensibles) sean recabados y resguardados en mi dispositivo local, para fines exclusivos de mi atención terapéutica, seguimiento de seguridad y control interno, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>
                    </div>
                </div>

                <div class="pdf-section">
                    <h3 class="pdf-h3">Identidad Biométrica y Firmas</h3>
                    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
                        <div style="width: 45%; text-align: center;">
                            ${signatureBlockHTML}
                        </div>
                        <div style="width: 45%; text-align: center;">
                            <div style="height:90px; border-bottom:1px solid #444; display:flex; align-items:flex-end; justify-content:center; padding-bottom:10px;">
                                <span style="font-size: 10px; color: #666; font-style: italic;">(Sello y firma autógrafa a la recepción del documento)</span>
                            </div>
                            <p style="margin:5px 0 0 0; font-size:12px; font-weight:900; text-transform:uppercase; color:#fff;">El Terapeuta Clínico</p>
                            <p style="margin:2px 0 0 0; font-size:11px; color:#D4AF37; font-weight:bold;">Ángel de Jesús Guerrero Vizzuett</p>
                        </div>
                    </div>
                </div>

                <!-- SECCIÓN DE CERTIFICACIONES BLINDADA -->
                <div class="pdf-section success">
                    <h3 class="pdf-h3" style="color:#00b09b;">Aval y Certificaciones Institucionales</h3>
                    <p style="font-size: 11px; color: #888; line-height: 1.6; margin-bottom: 15px;">
                        El presente documento y la intervención clínica están respaldados por las siguientes certificaciones oficiales y de competencia laboral, garantizando el cumplimiento de la normatividad sanitaria y educativa vigente:
                    </p>
                    <ul style="font-size: 11.5px; color: #eee; line-height: 1.8; margin: 0; padding-left: 20px;">
                        <li><strong>Nombramiento:</strong> Terapeuta Físico para la Salud, Especialidad en Masoterapia Clínica.</li>
                        <li><strong>Registro Nacional de Terapeutas (RENATED):</strong> Folio <span style="color:#D4AF37;">A-54878</span>.</li>
                        <li><strong>Secretaría de Educación Pública (SEP DGCFT):</strong> Acuerdo RVOE <span style="color:#D4AF37;">17FT061</span> (Esc. de Ciencias Físicas para la Salud).</li>
                        <li><strong>Acreditación Institucional:</strong> Sistema de Acreditación Educativa (SISAE) y Registro Público de Salud (REPS).</li>
                        <li><strong>Competencia Laboral (NTCL):</strong> CSSA0409.01 "Contribución a la Recuperación de las Capacidades Físicas de las Personas".</li>
                    </ul>
                </div>
            </div>
        `;

        const opt = {
            margin:       [0.6, 0.5, 0.6, 0.5], // Márgenes: Top, Left, Bottom, Right
            filename:     `Valtara_${folioReal}.pdf`,
            image:        { type: 'jpeg', quality: 1 }, 
            html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#050508' }, // Fuerza el fondo negro profundo en el lienzo
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Bloqueo de UI
        document.getElementById('exp-btn-prev').style.display = 'none';
        const btnSubmit = document.getElementById('exp-btn-submit');
        btnSubmit.style.display = 'none';
        const loader = document.getElementById('exp-loader');
        loader.style.display = 'block';

        this.announceA11y("Iniciando cifrado y generación del documento PDF oscuro de alta seguridad.");

        if (typeof html2pdf !== 'undefined') {
            setTimeout(() => {
                // MAGIA: El PDF se genera y mediante jsPDF incrustamos las marcas de agua en las esquinas de CADA HOJA generada.
                html2pdf().set(opt).from(pdfContent).toPdf().get('pdf').then(function (pdf) {
                    const totalPages = pdf.internal.getNumberOfPages();
                    for (let i = 1; i <= totalPages; i++) {
                        pdf.setPage(i);
                        pdf.setFontSize(7);
                        pdf.setTextColor(100, 100, 100); // Color gris oscuro sutil para el fondo negro
                        
                        // Esquina Superior Izquierda y Derecha
                        pdf.text('VALTARA EXECUTIVE THERAPY | DOC. OFICIAL', 0.5, 0.4);
                        pdf.text('FOLIO: ' + folioReal, 8.0, 0.4, { align: 'right' });
                        
                        // Esquina Inferior Izquierda y Derecha
                        pdf.text('VERIFICACIÓN CRIPTOGRÁFICA: ' + hash.substring(0, 20), 0.5, 10.6);
                        pdf.text('Página ' + i + ' de ' + totalPages, 8.0, 10.6, { align: 'right' });
                    }
                }).save().then(() => {
                    loader.innerHTML = '<i class="fa-solid fa-check"></i> EXPEDIENTE DESCARGADO';
                    loader.style.color = '#00b09b';
                    this.announceA11y("Documento generado con éxito. Abriendo WhatsApp para envío.");
                    
                    const mensaje = `*Aura Assistant (Valtara)* 🌿%0A%0AHe concluido el llenado y certificación de mi Historia Clínica.%0A%0A*Paciente:* ${nombre}%0A*Folio:* ${folioReal}%0A*Estrés Biomecánico:* ${d.habitos.estres}/10%0A%0A_A continuación adjunto el PDF oscuro debidamente firmado para revisión del Terapeuta Titular._`;
                    
                    setTimeout(() => {
                        this.closeOverlay();
                        window.open(`https://wa.me/5213348572070?text=${mensaje}`, '_blank');
                        setTimeout(() => { 
                            loader.style.display = 'none'; 
                            loader.innerHTML = '<i class="fa-solid fa-lock fa-fade"></i> CIFRANDO Y RENDERIZANDO...';
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
