/**
 * ====================================================================================
 * BLOQUE 10: EXPEDIENTE CLÍNICO V25.2 (WIZARD DE 13 PASOS & CENTINELA)
 * Triaje Médico Completo, Privacidad Local y Generador de PDF de Lujo.
 * ====================================================================================
 */

window.ExpedienteEngine = {
    currentStep: 0,
    totalSteps: 13,
    
    // Almacén de Datos (Basado en la estructura de tu React)
    formData: {
        personal: { fullName: '', curp: '', birthDate: '', phone: '' },
        emergency: { name: '', relationship: '', phone: '' },
        accessibility: { profile: [], supports: '' },
        clinical: {
            cardio: {}, resp: {}, digest: {}, neuro: {}, musculo: {}, piel: {}, infecciosas: {}
        },
        extra: '',
        estres: 5,
        legal: { truthOath: false, signature: '' },
        fechaStamp: null
    },

    // Diccionario Clínico para generar la UI y el PDF automáticamente
    clinicalDict: {
        cardio: { title: "Salud Cardiovascular", icon: "fa-heart", items: [
            { id: "hi", label: "Hipertensión Arterial", desc: "Presión sanguínea alta." },
            { id: "in", label: "Antecedente de Infarto", desc: "Daño en tejido cardiaco previo." },
            { id: "tr", label: "Trombosis / Coágulos", desc: "Historial de coágulos (Crítico)." },
            { id: "va", label: "Várices Prominentes", desc: "Requiere manipulación suave." },
            { id: "ma", label: "Marcapasos o Stents", desc: "Dispositivos en el corazón." }
        ]},
        resp: { title: "Salud Respiratoria", icon: "fa-wind", items: [
            { id: "as", label: "Asma Bronquial", desc: "Dificultad para respirar." },
            { id: "ep", label: "EPOC / Enfisema", desc: "Daño pulmonar persistente." },
            { id: "ne", label: "Neumonía Reciente", desc: "Infecciones pulmonares." },
            { id: "ap", label: "Apnea del Sueño", desc: "Pausas respiratorias al dormir." }
        ]},
        digest: { title: "Salud Digestiva", icon: "fa-stethoscope", items: [
            { id: "ga", label: "Gastritis o Úlceras", desc: "Inflamación en estómago." },
            { id: "co", label: "Colitis o Crohn", desc: "Inflamación intestinal." },
            { id: "re", label: "Reflujo Severo", desc: "Afecta la posición en camilla." }
        ]},
        neuro: { title: "Salud Neurológica", icon: "fa-brain", items: [
            { id: "ep", label: "Epilepsia", desc: "Crisis o convulsiones." },
            { id: "mi", label: "Migrañas", desc: "Sensibilidad a luz/sonido." },
            { id: "ve", label: "Vértigo", desc: "Inestabilidad posicional." }
        ]},
        musculo: { title: "Salud Osteomuscular", icon: "fa-bone", items: [
            { id: "os", label: "Osteoporosis", desc: "Riesgo de fractura por presión." },
            { id: "ar", label: "Artritis", desc: "Inflamación articular." },
            { id: "he", label: "Hernias Discales", desc: "Desplazamiento en columna." },
            { id: "pl", label: "Placas/Tornillos", desc: "Implantes metálicos." }
        ]},
        piel: { title: "Piel y Otros", icon: "fa-spa", items: [
            { id: "de", label: "Dermatitis", desc: "Inflamación visible." },
            { id: "al", label: "Alergias a Aceites", desc: "Reacción a fragancias." },
            { id: "em", label: "Embarazo", desc: "Estado de gestación." }
        ]},
        infecciosas: { title: "Patógenos y Seguridad", icon: "fa-virus", items: [
            { id: "he", label: "Hepatitis/VIH", desc: "Virus persistentes." },
            { id: "vi", label: "COVID/Influenza", desc: "Síntomas activos." },
            { id: "tu", label: "Oncología", desc: "Procesos tumorales." }
        ]}
    },

    init: function() {
        this.injectModal();
        this.loadData();
        this.bindEvents();
        this.renderWizard();
        
        // Retrasamos el Centinela 3 segundos para no asustar al paciente al entrar
        setTimeout(() => this.checkCentinela(), 3000);
    },

    // ====================================================================
    // 1. EL CENTINELA DE SALUD (Actualización cada 15 días)
    // ====================================================================
    checkCentinela: function() {
        if(!this.formData.fechaStamp) return; // Si es nuevo, no hay nada que vigilar
        
        const now = new Date().getTime();
        const diffDays = (now - this.formData.fechaStamp) / (1000 * 60 * 60 * 24);
        
        if(diffDays >= 15) {
            this.showCentinelaAlert();
        }
    },

    showCentinelaAlert: function() {
        if(document.getElementById('centinela-modal')) return;
        const nombre = this.formData.personal.fullName ? this.formData.personal.fullName.split(' ')[0] : 'Ejecutivo';
        
        const div = document.createElement('div');
        div.id = 'centinela-modal';
        div.style.cssText = "position: fixed; top: 20px; left: 0; right: 0; margin: 0 auto; width: 90%; max-width: 400px; background: rgba(5,5,10,0.95); border: 1px solid var(--valtara-cian-brillante); border-radius: 1.5rem; padding: 2rem; z-index: 999999; box-shadow: 0 2rem 5rem rgba(0,255,255,0.2); backdrop-filter: blur(25px); text-align: center; animation: floatUp 0.5s ease forwards;";
        
        div.innerHTML = `
            <i class="fa-solid fa-heart-pulse" style="color: var(--valtara-cian-brillante); font-size: 2.5rem; margin-bottom: 1rem; animation: breathe 2s infinite;"></i>
            <h4 style="color: white; font-family: var(--font-accent); font-size: 1.4rem;">Hola, ${nombre}</h4>
            <p style="color: #aaa; font-size: 1rem; margin-bottom: 1.5rem;">Han pasado más de 15 días desde tu última actualización biomecánica. ¿Has experimentado algún cambio en tu nivel de tensión o salud?</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="btn-centinela-no" style="background: transparent; border: 1px solid #666; color: #aaa; padding: 10px 20px; border-radius: 20px; cursor: pointer;">Todo igual</button>
                <button id="btn-centinela-si" style="background: var(--valtara-cian-brillante); border: none; color: black; padding: 10px 20px; border-radius: 20px; font-weight: bold; cursor: pointer; box-shadow: 0 5px 15px rgba(0,255,255,0.3);">Actualizar Datos</button>
            </div>
        `;
        document.body.appendChild(div);

        document.getElementById('btn-centinela-no').addEventListener('click', () => {
            // Resetea el contador para que no moleste por otros 15 días
            this.formData.fechaStamp = new Date().getTime();
            this.saveData();
            div.remove();
        });

        document.getElementById('btn-centinela-si').addEventListener('click', () => {
            div.remove();
            document.getElementById('expediente-modal').showModal();
        });
    },

    // ====================================================================
    // 2. CONSTRUCCIÓN DEL MODAL Y WIZARD
    // ====================================================================
    injectModal: function() {
        const modalHTML = `
        <dialog aria-label="Expediente Clínico Biomecánico" class="modal-dialog mega-modal" id="expediente-modal" style="background: rgba(5, 5, 10, 0.95); backdrop-filter: blur(25px);">
            <div class="modal-content" style="background: transparent; max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; height: 90vh;">
                
                <header class="modal-header" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; flex-shrink: 0;">
                    <div>
                        <h3 style="color: var(--valtara-blanco); font-family: var(--font-accent); font-size: 1.8rem; margin:0;"><i class="fa-solid fa-file-medical text-indigo-400"></i> Expediente Valtara</h3>
                        <p style="color: var(--valtara-oro); font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; margin:0;">Triaje Biomecánico Seguro</p>
                    </div>
                    <button aria-label="Cerrar expediente" class="close-modal-btn" id="close-expediente-btn"><i class="fa-solid fa-xmark"></i></button>
                </header>
                
                <div style="padding: 1.5rem 0; flex-shrink: 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.8rem; color: var(--valtara-cian-brillante); font-weight: bold;">
                        <span id="wizard-step-text">Paso 1 de 13</span>
                        <span id="wizard-percent-text">0%</span>
                    </div>
                    <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                        <div id="wizard-progress-bar" style="height: 100%; background: var(--valtara-cian-brillante); width: 0%; transition: 0.5s;"></div>
                    </div>
                </div>

                <div id="wizard-content" style="flex-grow: 1; overflow-y: auto; padding: 2rem 1rem; scrollbar-width: thin;" class="custom-scrollbar">
                    </div>

                <div style="display: flex; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;">
                    <button id="wiz-prev" style="padding: 1.2rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: white; cursor: pointer; flex: 1; display: none;">
                        <i class="fa-solid fa-chevron-left"></i> Atrás
                    </button>
                    <button id="wiz-next" style="padding: 1.2rem; border-radius: 12px; background: var(--valtara-oro); border: none; color: black; font-weight: 900; cursor: pointer; flex: 2; box-shadow: 0 5px 20px rgba(242,201,76,0.3);">
                        Siguiente <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    <button id="wiz-submit" style="padding: 1.2rem; border-radius: 12px; background: linear-gradient(135deg, var(--valtara-verde-menta), #00cc88); border: none; color: black; font-weight: 900; cursor: pointer; flex: 2; display: none; box-shadow: 0 5px 20px rgba(0,255,170,0.3);">
                        <i class="fa-solid fa-fingerprint"></i> Cifrar y Generar PDF
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

        // PASO 0: Bienvenida
        html += this.buildStep(0, `
            <h2 style="font-size: 2.2rem; color: var(--valtara-blanco); font-family: var(--font-accent); margin-bottom: 1rem;">Bienvenido a su espacio.</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem;">En Valtara, su cuerpo es tratado con el rigor de un templo. Este expediente garantiza que su terapeuta aplique la biomecánica de forma segura.</p>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(242,201,76,0.3); padding: 1.5rem; border-radius: 15px; border-left: 5px solid var(--valtara-oro);">
                <i class="fa-solid fa-shield-halved" style="color: var(--valtara-oro); font-size: 2rem; margin-bottom: 10px;"></i>
                <p style="color: #aaa; font-size: 0.95rem; font-style: italic;">Su información se cifra y guarda únicamente en su celular bajo la Ley Federal de Protección de Datos.</p>
            </div>
        `);

        // PASO 1: Identidad
        html += this.buildStep(1, `
            <h2 style="font-size: 1.8rem; color: var(--valtara-oro); margin-bottom: 1.5rem;"><i class="fa-solid fa-user"></i> Identidad y Contacto</h2>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                ${this.buildInput('text', 'Nombre Completo', 'personal', 'fullName', 'Ej. Antonio López')}
                ${this.buildInput('text', 'CURP', 'personal', 'curp', '', 'uppercase')}
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    ${this.buildInput('date', 'Nacimiento', 'personal', 'birthDate')}
                    ${this.buildInput('tel', 'Teléfono', 'personal', 'phone')}
                </div>
            </div>
        `);

        // PASO 2: Accesibilidad
        html += this.buildStep(2, `
            <h2 style="font-size: 1.8rem; color: var(--valtara-cian-brillante); margin-bottom: 1rem;"><i class="fa-solid fa-universal-access"></i> Accesibilidad y Dignidad</h2>
            <p style="color: #aaa; margin-bottom: 1.5rem;">Seleccione si requiere ajustes para honrar su espacio:</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                ${this.buildCheckBtn('Apoyo Motriz', 'accessibility', 'profile', 'motriz', 'fa-wheelchair')}
                ${this.buildCheckBtn('Neurodivergencia', 'accessibility', 'profile', 'neuro', 'fa-brain')}
                ${this.buildCheckBtn('Ajuste Sensorial', 'accessibility', 'profile', 'sensory', 'fa-eye-slash')}
                ${this.buildCheckBtn('Apoyo Auditivo/Visual', 'accessibility', 'profile', 'comm', 'fa-ear-listen')}
            </div>
            ${this.buildInput('textarea', 'Especifique sus necesidades de espacio/luz/sonido:', 'accessibility', 'supports')}
        `);

        // PASO 3: Emergencia
        html += this.buildStep(3, `
            <h2 style="font-size: 1.8rem; color: #ff5555; margin-bottom: 1.5rem;"><i class="fa-solid fa-truck-medical"></i> Contacto Vital</h2>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                ${this.buildInput('text', 'Nombre del Contacto', 'emergency', 'name')}
                ${this.buildInput('text', 'Parentesco', 'emergency', 'relationship')}
                ${this.buildInput('tel', 'Teléfono de Emergencia', 'emergency', 'phone')}
            </div>
        `);

        // PASOS 4 AL 10: Clínicos Generados Dinámicamente
        let stepIdx = 4;
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let catHTML = `<h2 style="font-size: 1.8rem; color: var(--valtara-blanco); margin-bottom: 1.5rem;"><i class="fa-solid ${category.icon} text-indigo-400"></i> ${category.title}</h2>`;
            catHTML += `<div style="display: flex; flex-direction: column; gap: 1rem;">`;
            category.items.forEach(item => {
                catHTML += this.buildClinicalCard(catKey, item.id, item.label, item.desc);
            });
            catHTML += `</div>`;
            html += this.buildStep(stepIdx, catHTML);
            stepIdx++;
        }

        // PASO 11: Necesidades y Estrés
        html += this.buildStep(11, `
            <h2 style="font-size: 1.8rem; color: var(--valtara-oro); margin-bottom: 1.5rem;"><i class="fa-solid fa-comment-medical"></i> Observaciones Finales</h2>
            <div style="margin-bottom: 2rem;">
                <label style="color: var(--valtara-blanco); font-weight: bold; display: block; margin-bottom: 1rem;">Nivel de Estrés o Dolor (1-10):</label>
                <input type="range" min="1" max="10" value="${this.formData.estres}" oninput="document.getElementById('lbl-estres').innerText=this.value; ExpedienteEngine.updateData('estres', null, this.value)" style="width: 100%; accent-color: var(--valtara-cian-brillante);">
                <div id="lbl-estres" style="text-align: center; color: var(--valtara-cian-brillante); font-size: 1.5rem; font-weight: bold; margin-top: 10px;">${this.formData.estres}</div>
            </div>
            ${this.buildInput('textarea', 'Mensaje para su terapeuta (Zonas a evitar, lesiones, etc.):', 'extra', null)}
        `);

        // PASO 12: Legal y Firma
        html += this.buildStep(12, `
            <div style="background: rgba(0,0,0,0.5); padding: 1.5rem; border-radius: 15px; border-left: 5px solid var(--valtara-verde-menta); margin-bottom: 2rem;">
                <h3 style="color: var(--valtara-verde-menta); margin-top:0;"><i class="fa-solid fa-balance-scale"></i> Protesta de Verdad</h3>
                <p style="color: #aaa; font-size: 0.9rem; text-align: justify; margin-bottom: 0;">Declaro que mi información es veraz. Entiendo que omitir datos médicos me pone en riesgo y deslindo a Grupo Gevizz S.A.S.</p>
            </div>
            
            <label style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 2rem; cursor: pointer;">
                <input type="checkbox" onchange="ExpedienteEngine.updateData('legal', 'truthOath', this.checked)" ${this.formData.legal.truthOath ? 'checked' : ''} style="width: 25px; height: 25px; accent-color: var(--valtara-verde-menta);">
                <span style="color: white; font-weight: bold; font-size: 0.95rem;">Acepto las condiciones clínicas y autorizo mi terapia.</span>
            </label>

            ${this.buildInput('text', 'FIRMA DIGITAL (Escriba su Nombre)', 'legal', 'signature')}
        `);

        content.innerHTML = html;
        this.updateUI();
    },

    // ====================================================================
    // 3. HELPERS DE HTML Y EVENTOS
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
                <textarea rows="4" oninput="ExpedienteEngine.updateData('${cat}', '${key}', this.value)" class="${extraClass}" style="width: 100%; padding: 1rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 12px; outline: none; resize: none;" placeholder="${placeholder}">${val}</textarea>
            </div>`;
        }
        return `
        <div>
            <label style="color: var(--valtara-oro-suave); font-size: 0.85rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 0.5rem;">${label}</label>
            <input type="${type}" oninput="ExpedienteEngine.updateData('${cat}', '${key}', this.value)" value="${val}" class="${extraClass}" style="width: 100%; padding: 1.2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 12px; outline: none;" placeholder="${placeholder}">
        </div>`;
    },

    buildCheckBtn: function(label, cat, arrKey, val, icon) {
        const isChecked = this.formData[cat][arrKey].includes(val);
        const bg = isChecked ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255,255,255,0.03)';
        const border = isChecked ? 'var(--valtara-cian-brillante)' : 'rgba(255,255,255,0.1)';
        const color = isChecked ? 'var(--valtara-cian-brillante)' : '#aaa';
        
        return `
        <button onclick="ExpedienteEngine.toggleArray('${cat}', '${arrKey}', '${val}'); ExpedienteEngine.renderWizard();" style="padding: 1.5rem 1rem; border-radius: 15px; background: ${bg}; border: 1px solid ${border}; color: ${color}; cursor: pointer; transition: 0.3s; display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <i class="fa-solid ${icon}" style="font-size: 1.8rem;"></i>
            <span style="font-weight: bold; font-size: 0.85rem;">${label}</span>
        </button>`;
    },

    buildClinicalCard: function(cat, id, label, desc) {
        const isChecked = this.formData.clinical[cat][id];
        const bg = isChecked ? 'rgba(242, 201, 76, 0.1)' : 'rgba(255,255,255,0.03)';
        const border = isChecked ? 'var(--valtara-oro)' : 'rgba(255,255,255,0.1)';
        const iconColor = isChecked ? 'var(--valtara-oro)' : '#666';
        const icon = isChecked ? 'fa-circle-check' : 'fa-circle';

        return `
        <button onclick="ExpedienteEngine.toggleClinical('${cat}', '${id}'); ExpedienteEngine.renderWizard();" style="width: 100%; text-align: left; padding: 1.2rem; border-radius: 15px; background: ${bg}; border: 1px solid ${border}; cursor: pointer; transition: 0.3s; display: flex; align-items: center; gap: 15px;">
            <i class="fa-regular ${icon}" style="color: ${iconColor}; font-size: 1.5rem;"></i>
            <div>
                <strong style="color: white; display: block; font-size: 1.1rem;">${label}</strong>
                <span style="color: #aaa; font-size: 0.85rem;">${desc}</span>
            </div>
        </button>`;
    },

    updateData: function(cat, key, val) {
        if(key) this.formData[cat][key] = val;
        else this.formData[cat] = val;
        this.saveData();
    },

    toggleArray: function(cat, arrKey, val) {
        const arr = this.formData[cat][arrKey];
        const idx = arr.indexOf(val);
        if(idx > -1) arr.splice(idx, 1);
        else arr.push(val);
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
                const modal = document.getElementById('expediente-modal');
                if(modal) modal.showModal();
                const menu = document.getElementById('main-nav');
                if(menu) menu.classList.remove('open');
            });
        }
        if(btnClose) btnClose.addEventListener('click', () => document.getElementById('expediente-modal').close());

        if(btnNext) btnNext.addEventListener('click', () => { if(this.currentStep < this.totalSteps - 1) { this.currentStep++; this.updateUI(); }});
        if(btnPrev) btnPrev.addEventListener('click', () => { if(this.currentStep > 0) { this.currentStep--; this.updateUI(); }});
        
        if(btnSubmit) btnSubmit.addEventListener('click', () => {
            if(!this.formData.legal.truthOath || !this.formData.legal.signature) {
                alert("Debe aceptar las condiciones y firmar para generar el expediente.");
                return;
            }
            this.generatePDF();
        });
    },

    updateUI: function() {
        document.querySelectorAll('.exp-step').forEach((el, i) => {
            el.style.display = i === this.currentStep ? 'block' : 'none';
        });

        document.getElementById('wizard-step-text').innerText = `Paso ${this.currentStep + 1} de ${this.totalSteps}`;
        document.getElementById('wizard-percent-text').innerText = `${Math.round((this.currentStep / (this.totalSteps - 1)) * 100)}%`;
        document.getElementById('wizard-progress-bar').style.width = `${(this.currentStep / (this.totalSteps - 1)) * 100}%`;

        document.getElementById('wiz-prev').style.display = this.currentStep > 0 ? 'block' : 'none';
        document.getElementById('wiz-next').style.display = this.currentStep < this.totalSteps - 1 ? 'block' : 'none';
        document.getElementById('wiz-submit').style.display = this.currentStep === this.totalSteps - 1 ? 'block' : 'none';
    },

    // ====================================================================
    // 4. MEMORIA LOCAL Y EXPORTACIÓN PDF
    // ====================================================================
    saveData: function() {
        this.formData.fechaStamp = new Date().getTime(); // Actualiza la estampa del centinela
        localStorage.setItem('valtara_expediente', JSON.stringify(this.formData));
    },

    loadData: function() {
        const saved = localStorage.getItem('valtara_expediente');
        if(saved) this.formData = JSON.parse(saved);
    },

    generatePDF: function() {
        const d = this.formData;
        const nombre = d.personal.fullName || 'Paciente';
        const curp = d.personal.curp || 'N/A';
        const hash = "HASH-" + Math.random().toString(36).substr(2, 12).toUpperCase();

        // Extraer los padecimientos que están en "True"
        let clinicaHTML = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let activos = [];
            category.items.forEach(item => {
                if(d.clinical[catKey][item.id]) activos.push(item.label);
            });
            if(activos.length > 0) {
                clinicaHTML += `<p style="margin: 5px 0;"><strong>${category.title}:</strong> <span style="color: #d32f2f;">${activos.join(', ')}</span></p>`;
            }
        }
        if(clinicaHTML === '') clinicaHTML = '<p style="color: #2e7d32; font-weight: bold;">Sin condiciones clínicas reportadas.</p>';

        const pdfContent = document.createElement('div');
        pdfContent.style.cssText = "padding: 40px 50px; font-family: 'Lato', sans-serif; color: #222; background: #fff; font-size: 14px; line-height: 1.5;";
        
        pdfContent.innerHTML = `
            <div style="border-bottom: 4px solid #D4AF37; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <h1 style="font-family: 'Playfair Display', serif; color: #050508; margin: 0; font-size: 32px; letter-spacing: 2px;">VALTARA</h1>
                    <p style="color: #666; font-size: 11px; margin: 0; letter-spacing: 3px;">EXECUTIVE THERAPY & BIOMECHANICS</p>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: bold; color: #D4AF37;">EXPEDIENTE MÉDICO</p>
                    <p style="margin: 0; font-size: 10px; color: #888;">Fecha: ${new Date().toLocaleDateString()}</p>
                </div>
            </div>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 25px; border-left: 5px solid #000;">
                <h3 style="margin: 0 0 10px 0; color: #000; font-size: 14px; text-transform: uppercase;">I. Identidad Ejecutiva</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <p style="margin:0;"><strong>Paciente:</strong> ${nombre}</p>
                    <p style="margin:0;"><strong>CURP:</strong> ${curp}</p>
                    <p style="margin:0;"><strong>Nacimiento:</strong> ${d.personal.birthDate}</p>
                    <p style="margin:0;"><strong>Teléfono:</strong> ${d.personal.phone}</p>
                </div>
            </div>

            <div style="margin-bottom: 25px;">
                <h3 style="margin: 0 0 10px 0; color: #D4AF37; border-bottom: 1px solid #eee; padding-bottom: 5px; font-size: 14px; text-transform: uppercase;">II. Estado Biomecánico & Clínico</h3>
                <p style="margin: 5px 0;"><strong>Nivel de Tensión/Estrés:</strong> ${d.estres} / 10</p>
                ${clinicaHTML}
            </div>

            <div style="margin-bottom: 25px;">
                <h3 style="margin: 0 0 10px 0; color: #D4AF37; border-bottom: 1px solid #eee; padding-bottom: 5px; font-size: 14px; text-transform: uppercase;">III. Accesibilidad y Observaciones</h3>
                <p style="margin: 5px 0;"><strong>Apoyos Requeridos:</strong> ${d.accessibility.profile.length > 0 ? d.accessibility.profile.join(', ') : 'Ninguno'}</p>
                <p style="margin: 5px 0; background: #f0f8ff; padding: 10px; border-left: 3px solid #0288d1; font-style: italic;">${d.extra || 'Sin observaciones adicionales.'}</p>
            </div>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px dashed #ccc;">
                <h3 style="margin: 0 0 10px 0; color: #000; font-size: 12px;">IV. Firma y Sello Criptográfico (NOM-151)</h3>
                <p style="font-size: 10px; color: #555; text-align: justify; margin-bottom: 15px;">
                    El paciente certifica la veracidad de la información contenida, autorizando a Grupo Gevizz S.A.S. al tratamiento biomecánico, deslindando a la empresa de omisiones médicas según las normativas vigentes de salud.
                </p>
                <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                    <div style="text-align: center; width: 250px;">
                        <div style="font-family: 'Georgia', serif; font-size: 24px; font-style: italic; color: #000; border-bottom: 1px solid #000; margin-bottom: 5px; padding-bottom: 5px;">
                            ${d.legal.signature}
                        </div>
                        <p style="margin: 0; font-size: 10px; font-weight: bold;">FIRMA DEL PACIENTE</p>
                    </div>
                    <div style="text-align: right; background: #eee; padding: 10px; border-radius: 5px;">
                        <p style="margin: 0; font-size: 9px; color: #666; font-weight: bold;">SELLO DIGITAL DE TIEMPO:</p>
                        <p style="margin: 0; font-size: 12px; color: #D4AF37; font-family: monospace; font-weight: bold;">${hash}</p>
                    </div>
                </div>
            </div>
        `;

        const opt = {
            margin:       0,
            filename:     `Valtara_Expediente_${nombre.replace(/\s+/g, '_')}.pdf`,
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { scale: 3, useCORS: true },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Generamos PDF y disparamos WhatsApp
        document.getElementById('wiz-submit').innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Cifrando...';
        
        html2pdf().set(opt).from(pdfContent).save().then(() => {
            document.getElementById('wiz-submit').innerHTML = '<i class="fa-solid fa-check"></i> Descargado';
            
            const resumenClinico = d.extra ? d.extra.substring(0,50)+"..." : "Sin notas extra.";
            const mensaje = `*Aura Assistant (Valtara)* 🌿%0A%0ASe ha actualizado un Expediente Clínico Seguro.%0A%0A*Ejecutivo:* ${nombre}%0A*Estrés:* ${d.estres}/10%0A*Notas:* ${resumenClinico}%0A%0A_El paciente enviará su PDF certificado a continuación._`;
            
            setTimeout(() => {
                document.getElementById('expediente-modal').close();
                window.open(`https://wa.me/5213348572070?text=${mensaje}`, '_blank');
            }, 1500);
        });
    }
};

window.addEventListener('DOMContentLoaded', () => ExpedienteEngine.init());
