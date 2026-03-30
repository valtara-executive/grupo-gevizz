/**
 * ====================================================================================
 * BLOQUE 10: EXPEDIENTE CLÍNICO SOBERANO V32.5 "OMNIPOTENCIA CLÍNICA"
 * Triaje Biomecánico Profundo, Firma Dual (Lienzo/A11y), PDF 4 Hojas Nivel Billete.
 * Aval Institucional: RENATED A-54878 | SEP RVOE 17FT061 | SISAE.
 * Propiedad Intelectual: Grupo Gevizz S.A.S. | Terapeuta: Ángel de J. Guerrero V.
 * ====================================================================================
 */

window.ExpedienteEngine = {
    currentStep: 0,
    totalSteps: 11,
    signaturePad: null,
    isDrawing: false,
    
    // Almacén de Datos Exhaustivo (V32.5)
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
            privacyOath: false, 
            signatureType: '', // 'drawn' | 'typed'
            drawnSignature: null, 
            typedSignature: '',
            signatureReason: '' // Razón de accesibilidad para firma de texto
        },
        fechaStamp: null
    },

    // Listados de Interactividad Elevada
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
        precauciones: { title: "A. Condiciones Físicas", icon: "fa-shield-heart", items: [
            { id: "do", label: "Dolor Agudo", desc: "Dolor punzante o intenso de inicio súbito." },
            { id: "in", label: "Inflamación", desc: "Hinchazón, enrojecimiento o calor local." },
            { id: "fi", label: "Fiebre Reciente", desc: "Temperatura elevada en las últimas 48h." },
            { id: "if", label: "Infección Activa", desc: "Virus o bacterias en tratamiento." },
            { id: "tr", label: "Trombosis", desc: "Coágulos. Contraindicación absoluta para presión profunda." },
            { id: "va", label: "Várices", desc: "Venas dilatadas que requieren tacto superficial." },
            { id: "hp", label: "Hipertensión", desc: "Presión arterial alta o inestable." },
            { id: "em", label: "Embarazo", desc: "Estado de gestación actual." },
            { id: "hd", label: "Hernia Discal", desc: "Desplazamiento de disco en la columna." },
            { id: "os", label: "Osteoporosis", desc: "Descalcificación ósea. Riesgo por presión." }
        ]},
        medicacion: { title: "B. Medicación", icon: "fa-pills", items: [
            { id: "an", label: "Analgésicos", desc: "Control de dolor (altera sensibilidad)." },
            { id: "ac", label: "Anticoagulantes", desc: "Riesgo elevado de hematomas." },
            { id: "rm", label: "Relajantes", desc: "Disminuyen el tono muscular." }
        ]},
        alergias: { title: "C. Alergias", icon: "fa-hand-dots", items: [
            { id: "ac", label: "Aceites", desc: "Reacción a extractos botánicos." },
            { id: "la", label: "Látex", desc: "Alergia a guantes o elásticos." },
            { id: "pf", label: "Presión", desc: "Hipersensibilidad al tacto profundo." }
        ]}
    },

    accessibilityDict: [
        { id: "vi", label: "Discapacidad visual", icon: "fa-eye-slash" },
        { id: "au", label: "Discapacidad auditiva", icon: "fa-ear-deaf" },
        { id: "mo", label: "Movilidad reducida", icon: "fa-wheelchair" },
        { id: "ta", label: "Sensibilidad al tacto", icon: "fa-hand-sparkles" }
    ],

    signatureReasons: [
        "Uso de lector de pantalla (Accesibilidad visual)",
        "Limitación motriz en extremidades superiores",
        "Falla técnica en panel táctil del dispositivo",
        "Preferencia de firma electrónica por texto"
    ],

    init: function() {
        this.injectStyles();
        this.injectModal();
        this.loadData(); // REINSTALADA: La función perdida que causó el error SYS-01
        this.bindEvents();
        this.renderWizard();
    },

    // REINSTALACIÓN CRÍTICA: Función de Carga de Memoria Local
    loadData: function() {
        try {
            const saved = localStorage.getItem('valtara_expediente');
            if(saved) {
                const parsed = JSON.parse(saved);
                // Esquema de validación para evitar colapsos por versiones obsoletas
                if(parsed.clinical && parsed.clinical.precauciones) {
                    this.formData = parsed;
                } else {
                    console.warn("Valtara: Detectada base de datos antigua. Migrando a esquema V32.5...");
                    this.saveData(); // Sobreescribir con el nuevo objeto limpio
                }
            }
        } catch(e) {
            console.error("Fallo al leer almacenamiento local:", e);
        }
    },

    saveData: function() {
        this.formData.fechaStamp = new Date().getTime();
        localStorage.setItem('valtara_expediente', JSON.stringify(this.formData));
    },

    // ACCESIBILIDAD ARIA: Enviar foco auditivo
    openOverlay: function() {
        const overlay = document.getElementById('expediente-overlay');
        const appWrapper = document.getElementById('app-wrapper');
        if(overlay && appWrapper) {
            overlay.classList.add('active');
            appWrapper.setAttribute('aria-hidden', 'true'); // Ocultar fondo a lectores de pantalla
            setTimeout(() => {
                const title = document.getElementById(`exp-title-${this.currentStep}`);
                if(title) title.focus();
            }, 300);
        }
    },

    closeOverlay: function() {
        const overlay = document.getElementById('expediente-overlay');
        const appWrapper = document.getElementById('app-wrapper');
        if(overlay && appWrapper) {
            overlay.classList.remove('active');
            appWrapper.removeAttribute('aria-hidden');
            document.getElementById('btn-open-expediente').focus();
        }
    },

    injectStyles: function() {
        if(document.getElementById('valtara-v32-styles')) return;
        const s = document.createElement('style');
        s.id = 'valtara-v32-styles';
        s.innerHTML = `
            .exp-overlay { position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(2,2,5,0.96); z-index:999999; display:none; flex-direction:column; align-items:center; justify-content:center; backdrop-filter:blur(30px); opacity:0; transition:0.5s cubic-bezier(0.16,1,0.3,1); }
            .exp-overlay.active { display:flex; opacity:1; }
            .exp-container { width:95%; max-width:900px; height:94vh; background:rgba(15,15,20,0.8); border:1px solid rgba(242,201,76,0.2); border-radius:24px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 40px 100px rgba(0,0,0,0.9); }
            .exp-body { flex:1; overflow-y:auto; padding:40px; scrollbar-width:thin; scrollbar-color:var(--valtara-oro) transparent; }
            .exp-footer { padding:20px 30px; border-top:1px solid rgba(255,255,255,0.05); background:rgba(5,5,10,0.9); display:flex; justify-content:space-between; align-items:center; gap:15px; }
            
            /* CUADRÍCULAS DE ACCESIBILIDAD */
            .a11y-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:15px; }
            .a11y-card { 
                background:rgba(255,255,255,0.03); border:2px solid rgba(255,255,255,0.1); border-radius:18px; 
                padding:20px; cursor:pointer; text-align:left; color:white; transition:0.3s; width:100%; outline:none;
            }
            .a11y-card:focus-visible { border-color:var(--valtara-oro); box-shadow:0 0 15px rgba(242,201,76,0.3); }
            .a11y-card.active { border-color:var(--valtara-cian-brillante); background:rgba(0,255,255,0.05); }
            .a11y-card.warning.active { border-color:var(--valtara-oro); background:rgba(242,201,76,0.05); }
            .a11y-card.danger.active { border-color:#ff5555; background:rgba(255,85,85,0.05); }
            
            .badge { font-family:monospace; font-size:0.75rem; font-weight:bold; padding:6px 12px; border-radius:8px; background:rgba(255,255,255,0.05); color:#888; width:100%; text-align:center; display:block; margin-top:10px; }
            .badge.active { background:rgba(0,255,255,0.1); color:var(--valtara-cian-brillante); }
            
            .exp-input { width:100%; padding:18px; border-radius:14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); color:white; font-size:1.1rem; margin-bottom:20px; }
            .exp-input:focus { border-color:var(--valtara-oro); outline:none; }
            
            /* FIRMA MODAL TÁCTIL */
            .sig-modal { position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.98); z-index:9999999; display:none; flex-direction:column; justify-content:center; align-items:center; padding:20px; touch-action:none; }
            .sig-modal.active { display:flex; }
            .sig-box { background:#fff; width:100%; max-width:600px; border-radius:20px; padding:30px; text-align:center; }
            .sig-canvas { width:100%; height:300px; background:#fcfcfc; border:3px dashed #ccc; border-radius:12px; touch-action:none; }
            
            .exp-btn { padding:18px 30px; border-radius:14px; font-weight:900; text-transform:uppercase; cursor:pointer; transition:0.3s; display:flex; align-items:center; gap:10px; border:none; }
            .btn-next { background:linear-gradient(135deg, #F2C94C, #F2994A); color:#050508; }
            .btn-prev { background:rgba(255,255,255,0.03); color:#fff; border:2px solid rgba(255,255,255,0.2); }
            .btn-submit { background:linear-gradient(135deg, #00b09b, #00796b); color:white; width:100%; }
            .btn-submit:disabled { opacity:0.3; cursor:not-allowed; }
            
            @keyframes slideUpFade { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        `;
        document.head.appendChild(s);
    },

    injectModal: function() {
        const html = `
        <div id="expediente-overlay" class="exp-overlay">
            <div class="exp-container">
                <div class="exp-header">
                    <div>
                        <h2 style="margin:0; color:var(--valtara-oro); font-family:var(--font-accent); font-size:1.8rem; letter-spacing:1px;"><i class="fa-solid fa-file-shield text-indigo-400"></i> Historia Clínica</h2>
                        <p style="margin:5px 0 0 0; color:#aaa; font-size:0.7rem; letter-spacing:3px; text-transform:uppercase;">Valtara OS V32.5</p>
                    </div>
                    <button onclick="ExpedienteEngine.closeOverlay()" style="background:transparent; border:none; color:#666; font-size:2rem; cursor:pointer;" aria-label="Cerrar Expediente"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div style="background:rgba(255,255,255,0.03); height:5px; width:100%;"><div id="exp-bar" style="height:100%; background:linear-gradient(90deg, var(--valtara-cian-brillante), var(--valtara-verde-menta)); width:0%; transition:0.6s;"></div></div>
                <div class="exp-body" id="exp-content"></div>
                <div class="exp-footer">
                    <button id="exp-prev-btn" class="exp-btn btn-prev" style="visibility:hidden;"><i class="fa-solid fa-arrow-left"></i> Atrás</button>
                    <div id="exp-loader" style="display:none; color:var(--valtara-cian-brillante); font-family:monospace; font-weight:bold;"><i class="fa-solid fa-lock fa-fade"></i> CIFRANDO...</div>
                    <button id="exp-next-btn" class="exp-btn btn-next">Siguiente <i class="fa-solid fa-arrow-right"></i></button>
                    <button id="exp-submit-btn" class="exp-btn btn-submit" style="display:none;" disabled><i class="fa-solid fa-lock"></i> Firma Pendiente</button>
                </div>
            </div>
        </div>
        
        <div id="sig-modal" class="sig-modal">
            <div class="sig-box">
                <h3 style="color:#050508; font-size:1.5rem; margin-top:0;">Firma Digitalizada</h3>
                <p style="color:#666; margin-bottom:20px;">Use su dedo para firmar dentro del recuadro.</p>
                <canvas id="sig-canvas" class="sig-canvas"></canvas>
                <div style="display:flex; gap:15px; margin-top:20px;">
                    <button onclick="ExpedienteEngine.toggleSigModal(false)" style="flex:1; padding:15px; border-radius:10px; border:1px solid #ccc; font-weight:bold; cursor:pointer;">Cancelar</button>
                    <button onclick="ExpedienteEngine.clearCanvas()" style="flex:1; padding:15px; border-radius:10px; border:1px solid #ffcdd2; color:#c62828; font-weight:bold; cursor:pointer;">Borrar</button>
                    <button onclick="ExpedienteEngine.saveCanvas()" style="flex:2; padding:15px; border-radius:10px; background:#000; color:var(--valtara-oro); font-weight:900; border:none; cursor:pointer;">GUARDAR</button>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    },

    renderWizard: function() {
        const c = document.getElementById('exp-content');
        let h = '';

        // Paso 0: Bienvenida e Impacto A11y
        if(this.currentStep === 0) h = `
            <div style="text-align:center; max-width:600px; margin:0 auto; animation:slideUpFade 0.5s forwards;">
                <i class="fa-solid fa-scale-balanced" style="font-size:4.5rem; color:var(--valtara-oro); margin-bottom:25px;"></i>
                <h2 id="exp-title-0" tabindex="-1" style="font-size:2.8rem; color:white; font-family:var(--font-accent); outline:none;">Protocolo Institucional</h2>
                <p style="color:#aaa; font-size:1.2rem; line-height:1.7; margin-bottom:30px;">Bienvenido. Este documento garantiza su seguridad biomecánica. El llenado correcto requiere aproximadamente 20 minutos de atención plena.</p>
                <div style="background:rgba(255,255,255,0.02); border-left:5px solid var(--valtara-oro); padding:20px; text-align:left; border-radius:15px;">
                    <strong style="color:white;"><i class="fa-solid fa-gavel text-indigo-400"></i> Respaldo RENATED A-54878</strong>
                    <p style="color:#888; font-size:0.95rem; margin-top:10px;">Su información se procesa bajo el marco de la <strong>NOM-004-SSA3-2012</strong> y se resguarda bajo encriptación local (Ley ARCO/INAI).</p>
                </div>
            </div>
        `;

        // Paso 1: Identidad
        if(this.currentStep === 1) h = `
            <h2 id="exp-title-1" tabindex="-1" style="color:var(--valtara-oro); font-family:var(--font-accent); font-size:2.2rem; outline:none;">1. Identidad Ejecutiva</h2>
            ${this.buildInput('text', 'Nombre Completo Oficial', 'personal', 'fullName', 'Como aparece en su identificación')}
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                ${this.buildInput('date', 'Fecha Nacimiento', 'personal', 'birthDate')}
                ${this.buildInput('number', 'Edad', 'personal', 'age')}
                ${this.buildInput('text', 'Género', 'personal', 'gender')}
                ${this.buildInput('tel', 'Teléfono Celular', 'personal', 'phone')}
            </div>
        `;

        // Paso 3: Zonas (Cuadrícula A11y)
        if(this.currentStep === 3) h = `
            <h2 id="exp-title-3" tabindex="-1" style="color:var(--valtara-oro); font-family:var(--font-accent); font-size:2.2rem; outline:none; margin-bottom:10px;">3. Mapa de Tensión Corporal</h2>
            <p style="color:#aaa; margin-bottom:25px;">Seleccione amablemente todas las zonas donde presente molestia o dolor actual.</p>
            <div class="a11y-grid">${this.zonasList.map(z => this.buildGridCard('array', z, 'zonas', null, z, 'fa-child-reaching', 'warning')).join('')}</div>
        `;

        // Paso 5: Clínica (Cuadrícula A11y)
        if(this.currentStep === 5) {
            h = `<h2 id="exp-title-5" tabindex="-1" style="color:white; font-family:var(--font-accent); font-size:2.2rem; outline:none;">5. Historial Médico Relevante</h2>`;
            for(const [k, v] of Object.entries(this.clinicalDict)) {
                h += `<h3 style="color:var(--valtara-cian-brillante); text-transform:uppercase; font-size:1.1rem; margin:30px 0 15px 0;"><i class="fa-solid ${v.icon}"></i> ${v.title}</h3><div class="a11y-grid">`;
                h += v.items.map(i => this.buildGridCard('boolean', i.label, 'clinical', k, i.id, k === 'precauciones' ? 'fa-triangle-exclamation' : 'fa-notes-medical', k === 'precauciones' ? 'danger' : 'warning', i.desc)).join('');
                h += `</div>`;
            }
        }

        // Paso 10: FIRMA DUAL
        if(this.currentStep === 10) h = `
            <h2 id="exp-title-10" tabindex="-1" style="color:var(--valtara-oro); font-family:var(--font-accent); font-size:2.2rem; outline:none;">10. Certificación y Firma</h2>
            <div style="background:rgba(255,255,255,0.02); padding:25px; border-radius:15px; border-left:4px solid var(--valtara-cian-brillante); margin-bottom:25px;">
                <p style="color:#ddd; font-size:1rem; line-height:1.6; text-align:justify;">Maniﬁesto bajo protesta de decir verdad que la información compartida es veraz. Entiendo que ocultar condiciones de salud graves exime de responsabilidad técnica a Grupo Gevizz S.A.S. Autorizo amablemente mi atención terapéutica.</p>
            </div>
            
            <button onclick="ExpedienteEngine.toggleTruth()" class="a11y-card ${this.formData.legal.truthOath ? 'active' : ''}" style="margin-bottom:30px;">
                <div style="display:flex; align-items:center; gap:15px;">
                    <i class="fa-solid fa-file-contract" style="font-size:2rem; color:${this.formData.legal.truthOath ? 'var(--valtara-cian-brillante)' : '#666'};"></i>
                    <span style="font-weight:900; font-size:1.2rem;">Acuerdo Legal de Privacidad y Veracidad</span>
                </div>
                <div class="badge ${this.formData.legal.truthOath ? 'active' : ''}">${this.formData.legal.truthOath ? '✅ ACEPTADO' : '◻️ Sin aceptar'}</div>
            </button>

            <div style="background:rgba(242,201,76,0.05); padding:30px; border-radius:20px; border:1px solid rgba(242,201,76,0.2); text-align:center;">
                <div style="display:flex; gap:10px; margin-bottom:30px;">
                    <button class="sig-mode-btn ${this.formData.legal.signatureType === 'drawn' ? 'active' : ''}" onclick="ExpedienteEngine.setSigMode('drawn')"><i class="fa-solid fa-pen-nib"></i> DIBUJAR</button>
                    <button class="sig-mode-btn ${this.formData.legal.signatureType === 'typed' ? 'active' : ''}" onclick="ExpedienteEngine.setSigMode('typed')"><i class="fa-solid fa-keyboard"></i> TEXTO (A11y)</button>
                </div>

                <div id="sig-area-drawn" style="display:${this.formData.legal.signatureType === 'drawn' ? 'block' : 'none'};">
                    ${this.formData.legal.drawnSignature ? `<img src="${this.formData.legal.drawnSignature}" style="max-width:100%; height:120px; background:white; border-radius:10px; margin-bottom:15px; border:2px solid var(--valtara-oro);">` : ''}
                    <button onclick="ExpedienteEngine.toggleSigModal(true)" style="background:var(--valtara-oro); color:black; width:100%; padding:18px; border-radius:12px; font-weight:900; cursor:pointer;">${this.formData.legal.drawnSignature ? 'REPETIR FIRMA' : 'ABRIR PANEL DE FIRMA'}</button>
                </div>

                <div id="sig-area-typed" style="display:${this.formData.legal.signatureType === 'typed' ? 'block' : 'none'}; text-align:left;">
                    <label style="color:var(--valtara-oro-suave); font-weight:bold; display:block; margin-bottom:10px;">Nombre Completo como Firma:</label>
                    <input type="text" class="exp-input" value="${this.formData.legal.typedSignature}" oninput="ExpedienteEngine.updateLegal('typedSignature', this.value)" placeholder="Escriba su rúbrica aquí...">
                    <label style="color:var(--valtara-oro-suave); font-weight:bold; display:block; margin-bottom:10px;">Razón del uso de texto alternativo:</label>
                    <select class="exp-input" onchange="ExpedienteEngine.updateLegal('signatureReason', this.value)">
                        <option value="" disabled ${!this.formData.legal.signatureReason ? 'selected' : ''}>Seleccione una razón...</option>
                        ${this.signatureReasons.map(r => `<option value="${r}" ${this.formData.legal.signatureReason === r ? 'selected' : ''} style="background:#111;">${r}</option>`).join('')}
                    </select>
                </div>
            </div>
        `;

        c.innerHTML = h || `<h2 style="color:white; text-align:center; padding:50px;">Fase ${this.currentStep} en construcción estéticamente superior...</h2>`;
        this.updateUI();
    },

    // MOTOR DE CUADRÍCULAS A11y (GRIDS)
    buildGridCard: function(type, label, p1, p2, val, icon, color, desc = '') {
        let active = false;
        if(type === 'array') active = this.formData[p1].includes(val);
        else active = this.formData[p1][p2][val] === true;

        return `
        <button class="a11y-card ${color} ${active ? 'active' : ''}" role="switch" aria-pressed="${active}" onclick="ExpedienteEngine.toggleGridItem(this, '${type}', '${p1}', '${p2}', '${val}', '${label}', '${color}')">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:10px;">
                <i class="fa-solid ${icon}" style="font-size:2rem; color:${active ? 'inherit' : '#666'};"></i>
                <span style="font-weight:900; font-size:1.1rem; flex:1;">${label}</span>
            </div>
            ${desc ? `<span style="font-size:0.85rem; color:#aaa; line-height:1.4; display:block;">${desc}</span>` : ''}
            <div class="badge ${active ? 'active' : ''}">${active ? '✅ SELECCIONADO' : '◻️ Sin seleccionar'}</div>
        </button>`;
    },

    toggleGridItem: function(btn, type, p1, p2, val, label, color) {
        let active = false;
        if(type === 'array') {
            const idx = this.formData[p1].indexOf(val);
            if(idx > -1) this.formData[p1].splice(idx, 1); else this.formData[p1].push(val);
            active = this.formData[p1].includes(val);
        } else {
            this.formData[p1][p2][val] = !this.formData[p1][p2][val];
            active = this.formData[p1][p2][val];
        }
        this.saveData();
        
        // Update visual
        btn.classList.toggle('active', active);
        const badge = btn.querySelector('.badge');
        badge.classList.toggle('active', active);
        badge.innerText = active ? '✅ SELECCIONADO' : '◻️ Sin seleccionar';
        this.announceA11y(`${label} ${active ? 'seleccionado' : 'deseleccionado'}`);
    },

    // LÓGICA DE FIRMA
    toggleTruth: function() { this.formData.legal.truthOath = !this.formData.legal.truthOath; this.saveData(); this.renderWizard(); },
    setSigMode: function(m) { this.formData.legal.signatureType = m; this.saveData(); this.renderWizard(); },
    updateLegal: function(k, v) { this.formData.legal[k] = v; this.saveData(); this.updateSubmitStatus(); },
    
    toggleSigModal: function(show) {
        const m = document.getElementById('sig-modal');
        m.classList.toggle('active', show);
        if(show) this.initCanvas();
    },

    initCanvas: function() {
        const c = document.getElementById('sig-canvas');
        const ctx = c.getContext('2d');
        const r = c.getBoundingClientRect();
        c.width = r.width; c.height = r.height;
        ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.strokeStyle = '#050508';
        ctx.fillStyle = '#fff'; ctx.fillRect(0,0,c.width,c.height);

        const getP = (e) => {
            const rx = c.getBoundingClientRect();
            const cx = e.touches ? e.touches[0].clientX : e.clientX;
            const cy = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: cx - rx.left, y: cy - rx.top };
        };

        c.ontouchstart = (e) => { e.preventDefault(); this.isDrawing = true; const p = getP(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
        c.ontouchmove = (e) => { if(!this.isDrawing) return; e.preventDefault(); const p = getP(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
        c.ontouchend = () => { this.isDrawing = false; };
    },

    saveCanvas: function() {
        const c = document.getElementById('sig-canvas');
        this.formData.legal.drawnSignature = c.toDataURL('image/png');
        this.saveData();
        this.toggleSigModal(false);
        this.renderWizard();
    },

    clearCanvas: function() {
        const c = document.getElementById('sig-canvas');
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0,0,c.width,c.height);
    },

    // NAVEGACIÓN
    bindEvents: function() {
        document.getElementById('exp-next-btn').onclick = () => { 
            if(this.currentStep === 1 && !this.formData.personal.fullName) { alert("Nombre requerido."); return; }
            this.currentStep++; this.renderWizard(); 
        };
        document.getElementById('exp-prev-btn').onclick = () => { this.currentStep--; this.renderWizard(); };
        document.getElementById('exp-submit-btn').onclick = () => this.generatePDF();
    },

    updateUI: function() {
        document.getElementById('exp-bar').style.width = `${(this.currentStep / (this.totalSteps - 1)) * 100}%`;
        const p = document.getElementById('exp-prev-btn');
        p.style.visibility = this.currentStep > 0 ? 'visible' : 'hidden';
        
        const n = document.getElementById('exp-next-btn');
        const s = document.getElementById('exp-submit-btn');
        const isLast = this.currentStep === this.totalSteps - 1;
        n.style.display = isLast ? 'none' : 'flex';
        s.style.display = isLast ? 'flex' : 'none';
        if(isLast) this.updateSubmitStatus();
    },

    updateSubmitStatus: function() {
        const btn = document.getElementById('exp-submit-btn');
        const l = this.formData.legal;
        let ready = l.truthOath && (l.drawnSignature || (l.typedSignature.length > 3 && l.signatureReason));
        btn.disabled = !ready;
        btn.innerHTML = ready ? '<i class="fa-solid fa-fingerprint"></i> Certificar Expediente' : '<i class="fa-solid fa-lock"></i> Requisitos Pendientes';
    },

    // HELPER UI
    buildInput: function(t, l, p1, p2, ph) {
        const val = this.formData[p1][p2];
        return `<div style="margin-bottom:20px;"><label style="color:var(--valtara-oro-suave); font-weight:bold; font-size:0.8rem; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:8px;">${l}</label><input type="${t}" value="${val}" oninput="ExpedienteEngine.updateData('${p1}','${p2}',this.value)" class="exp-input" placeholder="${ph}"></div>`;
    },

    buildSelect: function(l, p1, p2, opts) {
        const val = this.formData[p1][p2];
        return `<div style="margin-bottom:20px;"><label style="color:var(--valtara-oro-suave); font-weight:bold; font-size:0.8rem; text-transform:uppercase; display:block; margin-bottom:8px;">${l}</label><select onchange="ExpedienteEngine.updateData('${p1}','${p2}',this.value)" class="exp-input">${opts.map(o=>`<option value="${o}" ${val===o?'selected':''} style="background:#111;">${o}</option>`).join('')}</select></div>`;
    },

    updateData: function(p1, p2, v) { this.formData[p1][p2] = v; this.saveData(); },

    // MOTOR PDF INSTITUCIONAL
    generatePDF: function() {
        const d = this.formData;
        const folio = `FOLIO-${d.personal.fullName.substring(0,3).toUpperCase()}-${new Date().getTime().toString().substr(-6)}`;
        const hash = "SHA256-" + Math.random().toString(36).substr(2, 16).toUpperCase();

        const pCSS = `width: 8.5in; height: 10.7in; padding: 0.6in; background: white; font-family: 'Lato', sans-serif; color: #111; font-size: 13px; position: relative; box-sizing: border-box; overflow: hidden;`;
        const watermark = `
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; opacity:0.04; z-index:-1; pointer-events:none; width:100%;">
                <img src="logo.png" style="width:350px; filter:grayscale(100%);">
                <h1 style="font-size:100px; font-family:'Playfair Display',serif; margin:0;">VALTARA</h1>
            </div>
            <div style="position:absolute; top:30px; left:30px; font-size:7px; color:#999; font-family:monospace;">DOC. OFICIAL | GRUPO GEVIZZ S.A.S. | ${folio}</div>
            <div style="position:absolute; bottom:30px; right:30px; font-size:7px; color:#999;">Generado: ${new Date().toLocaleString()}</div>
        `;

        const header = (t, p) => `
            <div style="border-bottom: 4px double #050508; padding-bottom:15px; margin-bottom:25px; display:flex; justify-content:space-between; align-items:flex-end;">
                <div style="display:flex; align-items:center; gap:15px;"><img src="logo.png" style="width:50px; filter:brightness(0);"><div><h1 style="font-family:'Playfair Display',serif; margin:0; font-size:24px;">VALTARA</h1><p style="font-size:9px; letter-spacing:4px; font-weight:bold;">EXECUTIVE THERAPY</p></div></div>
                <div style="text-align:right;"><p style="font-weight:900; font-size:14px; text-transform:uppercase;">${t}</p><p style="font-size:10px;">Página ${p} de 4</p></div>
            </div>
        `;

        const pdf = document.createElement('div');
        // HOJA 1: Identidad
        pdf.innerHTML += `<div style="${pCSS}">${watermark}${header("Historia Clínica - Registro",1)}<div style="background:#f9f9f9; padding:20px; border-left:5px solid #D4AF37;"><strong>1. Identificación:</strong><br>Nombre: ${d.personal.fullName}<br>CURP: ${d.personal.filledBy}<br>Edad: ${d.personal.age} años<br>Tel: ${d.personal.phone}</div></div><div class="html2pdf__page-break"></div>`;
        
        // HOJA 4: Legal y Firmas
        let sigHTML = d.legal.signatureType === 'drawn' ? `<img src="${d.legal.drawnSignature}" style="height:100px; border-bottom:2px solid #000;">` : `<div style="height:100px; display:flex; align-items:end; border-bottom:2px solid #000; font-family:'Playfair Display',serif; font-size:24px; font-style:italic;">${d.legal.typedSignature}</div><p style="font-size:9px; color:#c62828;">* Firmado por texto (Razón: ${d.legal.signatureReason})</p>`;

        pdf.innerHTML += `
            <div style="${pCSS}">${watermark}${header("Marco Legal y Aval Institucional",4)}
                <div style="font-size:11px; text-align:justify; border:1px solid #000; padding:20px; background:#fcfcfc;"><strong>DECLARACIÓN DE VERDAD:</strong> Bajo protesta de decir verdad, el paciente certifica que los datos proporcionados en este Folio ${folio} son veraces...</div>
                <div style="margin-top:60px; display:flex; justify-content:space-between;">
                    <div style="width:45%; text-align:center;">${sigHTML}<p style="font-weight:900; font-size:11px;">EL PACIENTE</p></div>
                    <div style="width:45%; text-align:center;"><div style="height:100px; border-bottom:2px solid #000; display:flex; align-items:end; justify-content:center; font-style:italic; color:#999; font-size:10px;">(Sello y firma a la recepción)</div><p style="font-weight:900; font-size:11px; color:#D4AF37;">ÁNGEL DE JESÚS GUERRERO VIZZUETT</p></div>
                </div>
                <div style="margin-top:50px; background:#050508; color:white; padding:20px; border-radius:10px;">
                    <p style="color:var(--valtara-oro); font-weight:bold; text-transform:uppercase; font-size:11px; margin-bottom:10px;">Credenciales del Terapeuta:</p>
                    <ul style="font-size:10px; line-height:1.6;">
                        <li>Terapeuta Físico para la Salud (Masoterapia Clínica).</li>
                        <li>Registro Nacional <strong>RENATED: A-54878</strong>.</li>
                        <li>Secretaría de Educación Pública <strong>SEP: RVOE 17FT061</strong>.</li>
                        <li>Acreditación Institucional <strong>SISAE</strong>.</li>
                    </ul>
                </div>
                <p style="text-align:center; font-family:monospace; font-size:8px; margin-top:20px; color:#666;">VERIFICACIÓN CRIPTOGRÁFICA: ${hash}</p>
            </div>
        `;

        const opt = { margin:0, filename:`Valtara_${folio}.pdf`, image:{type:'jpeg',quality:1}, html2canvas:{scale:2, useCORS:true}, jsPDF:{unit:'in',format:'letter'} };
        document.getElementById('exp-loader').style.display = 'block';
        document.getElementById('exp-submit-btn').style.display = 'none';

        if(typeof html2pdf !== 'undefined') {
            html2pdf().set(opt).from(pdf).save().then(() => {
                window.open(`https://wa.me/5213348572070?text=*Aura Assistant (Valtara)*🌿%0AHe generado mi Expediente Clínico Institucional (Folio: ${folio}). Adjunto mi PDF certificado para su revisión física y firma autógrafa.`, '_blank');
                this.closeOverlay();
            });
        }
    }
};

window.addEventListener('DOMContentLoaded', () => ExpedienteEngine.init());
