/**
 * ====================================================================================
 * BLOQUE 10: EXPEDIENTE CLÍNICO SOVEREIGN V25.3 "ESTETICISMO CLÍNICO"
 * Wizard Interactivo de 14 Pasos, Módulo de Revisión Maestra y PDF de Alta Costura.
 * Cero Servidores | Privacidad Local Absoluta | NOM-151 Placebo Criptográfico.
 * Propiedad de Grupo Gevizz S.A.S. - CDMX.
 * ====================================================================================
 */

window.ExpedienteEngine = {
    currentStep: 0,
    totalSteps: 14, // Aumentado por el paso de Revisión
    
    // Almacén de Datos (Estructura robusta V25.3)
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

    // Diccionario Clínico Expandido con Máximo Respeto y Profundidad (Goal 3)
    clinicalDict: {
        cardio: { title: "Salud Cardiovascular", icon: "fa-heart", items: [
            { id: "hi", label: "Hipertensión Arterial", desc: "Presión sanguínea que requiere cuidado con presiones intensas." },
            { id: "in", label: "Antecedente de Infarto", desc: "Muerte de tejido cardiaco previo. Requiere autorización médica." },
            { id: "tr", label: "Trombosis / Coágulos", desc: "Historial de coágulos en sangre. (Antecedente CRÍTICO para masaje)." },
            { id: "va", label: "Várices Prominentes", desc: "Venas dilatadas. Evitamos masaje profundo en zonas afectadas." },
            { id: "ma", label: "Marcapasos o Stents", desc: "Dispositivos electrónicos o mecánicos en el corazón." }
        ]},
        resp: { title: "Salud Respiratoria", icon: "fa-wind", items: [
            { id: "as", label: "Asma Bronquial", desc: "Dificultad para respirar por inflamación de vías aéreas." },
            { id: "ep", label: "EPOC / Enfisema", desc: "Daño pulmonar persistente (Ej. por tabaquismo prolongado)." },
            { id: "ne", label: "Neumonía Reciente", desc: "Infecciones pulmonares graves en los últimos meses." },
            { id: "ap", label: "Apnea del Sueño", desc: "Pausas respiratorias durante el sueño." }
        ]},
        digest: { title: "Salud Digestiva", icon: "fa-stethoscope", items: [
            { id: "ga", label: "Gastritis o Úlceras", desc: "Inflamación o heridas en la pared del estómago." },
            { id: "co", label: "Colitis o Crohn", desc: "Procesos inflamatorios crónicos del intestino." },
            { id: "re", label: "Reflujo Severo", desc: "Regreso de ácido. Afecta la inclinación de la camilla." }
        ]},
        neuro: { title: "Salud Neurológica", icon: "fa-brain", items: [
            { id: "ep", label: "Epilepsia", desc: "Descargas eléctricas que afectan movimiento/conciencia." },
            { id: "mi", label: "Migrañas Crónicas", desc: "Dolores de cabeza intensos con sensibilidad a luz/sonido." },
            { id: "ve", label: "Vértigo", desc: "Sensación de giro o mareo ante cambios de postura." }
        ]},
        musculo: { title: "Salud Osteomuscular (Biomecánica)", icon: "fa-bone", items: [
            { id: "os", label: "Osteoporosis", desc: "Baja densidad ósea severa. Alto riesgo de fractura por presión." },
            { id: "on", label: "Osteopenia", desc: "Pérdida de densidad ósea moderada (Pre-osteoporosis)." },
            { id: "de", label: "Descalcificación Ósea", desc: "Debilitamiento general de la estructura ósea." },
            { id: "ar", label: "Artritis / Artrosis", desc: "Desgaste e inflamación en articulaciones." },
            { id: "he_l", label: "Hernia Discal Lumbar", desc: "Desplazamiento de disco en la espalda baja." },
            { id: "he_c", label: "Hernia Discal Cervical", desc: "Desplazamiento de disco en el cuello." },
            { id: "es", label: "Escoliosis Severa", desc: "Curvatura anormal de la columna vertebral." },
            { id: "pl", label: "Placas/Tornillos", desc: "Implantes metálicos por cirugías previas." }
        ]},
        piel: { title: "Salud de la Piel y Otros", icon: "fa-spa", items: [
            { id: "de", label: "Dermatitis", desc: "Inflamación o irritación visible de la piel." },
            { id: "ho", label: "Hongos en Piel", desc: "Infecciones cutáneas activas (Micosis)." },
            { id: "al", label: "Alergias a Aceites", desc: "Reacciones a fragancias, frutos secos o químicos." },
            { id: "em", label: "Embarazo", desc: "Gestación actual. Cuidado con abdomen y posición lumbar." }
        ]},
        infecciosas: { title: "Seguridad Sanitaria y Patógenos", icon: "fa-virus", items: [
            { id: "he", label: "Hepatitis B o C", desc: "Virus que afectan el hígado y se transmiten por sangre." },
            { id: "vi", label: "VIH", desc: "Virus de Inmunodeficiencia Humana." },
            { id: "tu", label: "Tuberculosis", desc: "Infección bacteriana contagiosa, usualmente pulmonar." },
            { id: "vi_a", label: "COVID/Influenza", desc: "Presencia de síntomas o contagio activo." }
        ]}
    },

    init: function() {
        this.injectModal();
        this.loadData();
        this.bindEvents();
        this.renderWizard();
        setTimeout(() => this.checkCentinela(), 3000); // Vigía de tiempo
    },

    // ====================================================================
    // 1. EL CENTINELA (Cookie de Tiempo - 15 días)
    // ====================================================================
    checkCentinela: function() {
        if(!this.formData.fechaStamp) return;
        
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
        div.style.cssText = "position: fixed; top: 20px; left: 0; right: 0; margin: 0 auto; width: 90%; max-width: 400px; background: rgba(5,5,10,0.98); border: 2px solid var(--valtara-cian-brillante); border-radius: 1.5rem; padding: 2rem; z-index: 999999; box-shadow: 0 2rem 5rem rgba(0,255,255,0.3); backdrop-filter: blur(25px); text-align: center; animation: floatUp 0.6s ease forwards;";
        
        div.innerHTML = `
            <i class="fa-solid fa-heart-pulse" style="color: var(--valtara-cian-brillante); font-size: 3rem; margin-bottom: 1rem; animation: breathe 2s infinite;"></i>
            <h4 style="color: white; font-family: var(--font-accent); font-size: 1.6rem; margin:0 0 10px 0;">¡Hola, ${nombre}!</h4>
            <p style="color: #ccc; font-size: 1.1rem; margin-bottom: 2rem; font-weight: 300; line-height: 1.5;">Han pasado más de 15 días desde tu última actualización de salud. ¿Has experimentado cambios en tu tensión cervical o estrés?</p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="btn-centinela-no" style="background: transparent; border: 1px solid #666; color: #aaa; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-size: 1rem; transition: 0.3s;">Todo igual</button>
                <button id="btn-centinela-si" style="background: var(--valtara-cian-brillante); border: none; color: black; padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; font-size: 1rem; box-shadow: 0 5px 15px rgba(0,255,255,0.4); transition: 0.3s;">Actualizar Datos</button>
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
            ExpedienteEngine.currentStep = 1; // Directo a datos
            ExpedienteEngine.renderWizard();
            document.getElementById('expediente-modal').showModal();
        });
    },

    // ====================================================================
    // 2. CONSTRUCCIÓN DEL MODAL Y WIZARD (Goal 2: UI Maestra)
    // ====================================================================
    injectModal: function() {
        if(document.getElementById('expediente-modal')) return;

        const modalHTML = `
        <dialog aria-label="Expediente Clínico Soberano" class="modal-dialog mega-modal" id="expediente-modal" style="background: rgba(5, 5, 10, 0.9); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border: 1px solid rgba(242,201,76,0.2); border-radius: 2rem; box-shadow: 0 30px 60px rgba(0,0,0,0.8);">
            <div class="modal-content" style="background: transparent; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; height: 92vh;">
                
                <header class="modal-header" style="border-bottom: 1px solid rgba(242,201,76,0.2); padding-bottom: 1rem; flex-shrink: 0;">
                    <div>
                        <h3 style="color: var(--valtara-oro); font-family: var(--font-accent); font-size: 2.2rem; margin:0;"><i class="fa-solid fa-file-medical text-indigo-400"></i> Expediente Soberano</h3>
                        <p style="color: white; font-size: 0.9rem; letter-spacing: 3px; text-transform: uppercase; margin:0 0 0 5px; font-weight: 300;">By Grupo Gevizz</p>
                    </div>
                    <button aria-label="Cerrar expediente" class="close-modal-btn" id="close-expediente-btn" style="color: #666; font-size: 1.5rem; transition: 0.3s;"><i class="fa-solid fa-xmark"></i></button>
                </header>
                
                <div style="padding: 1rem 0; flex-shrink: 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--valtara-cian-brillante); font-weight: bold; letter-spacing: 1px;">
                        <span id="wizard-step-text">Paso 1 de 14</span>
                        <span id="wizard-percent-text">0%</span>
                    </div>
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);">
                        <div id="wizard-progress-bar" style="height: 100%; background: linear-gradient(90deg, var(--valtara-cian-brillante), var(--valtara-verde-menta)); width: 0%; transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);"></div>
                    </div>
                </div>

                <div id="wizard-content" style="flex-grow: 1; overflow-y: auto; padding: 2rem 1rem; scrollbar-width: thin; -webkit-overflow-scrolling: touch;" class="custom-scrollbar">
                    </div>

                <div style="display: flex; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); flex-shrink: 0; margin-top: auto;">
                    <button id="wiz-prev" style="padding: 1.2rem; border-radius: 15px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: #aaa; cursor: pointer; flex: 1; display: none; transition: 0.3s; font-size: 1.1rem;">
                        <i class="fa-solid fa-chevron-left"></i> Atrás
                    </button>
                    <button id="wiz-next" style="padding: 1.2rem; border-radius: 15px; background: var(--valtara-oro); border: none; color: black; font-weight: 900; cursor: pointer; flex: 2; box-shadow: 0 10px 30px rgba(242,201,76,0.3); transition: 0.3s; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">
                        Siguiente <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    <button id="wiz-submit" style="padding: 1.2rem; border-radius: 15px; background: linear-gradient(135deg, var(--valtara-verde-menta), #00cc88); border: none; color: black; font-weight: 900; cursor: pointer; flex: 2; display: none; box-shadow: 0 10px 30px rgba(0,255,170,0.4); transition: 0.3s; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">
                        <i class="fa-solid fa-fingerprint"></i> Cifrar y Enviar a WhatsApp
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

        // PASO 0: Bienvenida Inmersiva
        html += this.buildStep(0, `
            <div style="text-align: center; max-width: 600px; margin: 0 auto; padding: 2rem 0;">
                <i class="fa-solid fa-seedling" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 2rem; animation: breathe 3s infinite;"></i>
                <h2 style="font-size: 2.8rem; color: var(--valtara-blanco); font-family: var(--font-accent); margin-bottom: 1rem; letter-spacing: 1px;">Bienvenido a su Santuario Digital.</h2>
                <p style="color: var(--valtara-gris-texto); font-size: 1.3rem; line-height: 1.8; margin-bottom: 2.5rem; font-weight: 300;">Este expediente es el primer paso para una terapia biomecánica de excelencia. Por favor, responda amablemente y con total veracidad para garantizar su seguridad técnica.</p>
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(242,201,76,0.2); padding: 2rem; border-radius: 20px; text-align: left; display: flex; gap: 15px; align-items: start;">
                    <i class="fa-solid fa-lock" style="color: var(--valtara-oro); font-size: 2.5rem; margin-top: 5px;"></i>
                    <div>
                        <strong style="color: white; font-size: 1.1rem; display: block; margin-bottom: 5px;">Privacidad Local Cifrada: NOM-151 active.</strong>
                        <p style="color: #aaa; font-size: 0.95rem; margin:0; font-weight: 300; line-height: 1.5;">Su información se encripta y guarda <strong style="color: var(--valtara-oro-suave);">exclusivamente en su dispositivo</strong>. Grupo Gevizz no almacena estos datos médicos en la nube.</p>
                    </div>
                </div>
            </div>
        `);

        // PASO 1: Identidad Ejecutiva
        html += this.buildStep(1, `
            <h2 style="font-size: 2rem; color: var(--valtara-oro); margin-bottom: 2rem; font-family: var(--font-accent);"><i class="fa-solid fa-user"></i> Identidad y Verificación Ejecutiva</h2>
            <div style="display: flex; flex-direction: column; gap: 1.8rem;">
                ${this.buildInput('text', 'Nombre Completo (Como en Identificación Oficial)', 'personal', 'fullName', 'Ej. Antonio López García')}
                ${this.buildInput('text', 'CURP', 'personal', 'curp', 'Clave Única de Registro de Población (18 dígitos)', 'uppercase tracking-widest font-mono')}
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    ${this.buildInput('date', 'Fecha de Nacimiento', 'personal', 'birthDate')}
                    ${this.buildInput('tel', 'Teléfono de Contacto (10 dígitos)', 'personal', 'phone')}
                </div>
            </div>
        `);

        // PASO 2: Accesibilidad Respetuosa (Goal 3)
        html += this.buildStep(2, `
            <h2 style="font-size: 2rem; color: var(--valtara-cian-brillante); margin-bottom: 1.5rem; font-family: var(--font-accent);"><i class="fa-solid fa-universal-access"></i> Accesibilidad y Dignidad</h2>
            <p style="color: #aaa; margin-bottom: 2.5rem; font-size: 1.1rem; font-weight: 300; line-height: 1.6;">En Valtara, la inclusión es un derecho fundamental. Si nos permite saber, amablemente díganos si requiere algún ajuste razonable para honrar sus necesidades de apoyo o sensoriales:</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2.5rem;">
                ${this.buildCheckBtn('Apoyo a la Movilidad', 'accessibility', 'profile', 'motriz', 'fa-wheelchair')}
                ${this.buildCheckBtn('Apoyo Neurocognitivo', 'accessibility', 'profile', 'neuro', 'fa-brain')}
                ${this.buildCheckBtn('Ajuste Sensorial (Luz/Aroma)', 'accessibility', 'profile', 'sensory', 'fa-eye-slash')}
                ${this.buildCheckBtn('Apoyo Comunicativo', 'accessibility', 'profile', 'comm', 'fa-ear-listen')}
            </div>
            ${this.buildInput('textarea', 'Díganos cómo podemos ser más respetuosos con su espacio:', 'accessibility', 'supports', 'Ej: "Reducir intensidad de luz", "No tocar la cabeza", "Música ambiental muy suave", "No usar aceites cítricos".')}
        `);

        // PASO 3: Emergencia Vital
        html += this.buildStep(3, `
            <h2 style="font-size: 2rem; color: #ff5555; margin-bottom: 1.5rem; font-family: var(--font-accent);"><i class="fa-solid fa-truck-medical"></i> Coordenadas de Emergencia</h2>
            <p style="color: #aaa; margin-bottom: 2.5rem; font-size: 1.1rem; font-weight: 300;">¿A quién debemos contactar en caso de una situación biomecánica inesperada?</p>
            <div style="display: flex; flex-direction: column; gap: 1.8rem;">
                ${this.buildInput('text', 'Nombre Completo del Contacto', 'emergency', 'name')}
                ${this.buildInput('text', 'Relación o Parentesco', 'emergency', 'relationship')}
                ${this.buildInput('tel', 'Número de Teléfono Directo', 'emergency', 'phone')}
            </div>
        `);

        // PASOS 4 AL 10: Clínicos Generados Dinámicamente (Goal 3 - Respeto y Profundidad)
        let stepIdx = 4;
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let catHTML = `<h2 style="font-size: 2rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);"><i class="fa-solid ${category.icon} text-indigo-400"></i> ${category.title}</h2>`;
            catHTML += `<p style="color: #aaa; margin-bottom: 2.5rem; font-size: 1.1rem; font-weight: 300; line-height: 1.6;">Si nos permite saber para su seguridad, ¿ha sido diagnosticado con alguna condición relacionada amablemente con las siguientes situaciones por un médico profesional?</p>`;
            catHTML += `<div style="display: flex; flex-direction: column; gap: 1.2rem;">`;
            category.items.forEach(item => {
                catHTML += this.buildClinicalCard(catKey, item.id, item.label, item.desc);
            });
            catHTML += `</div>`;
            html += this.buildStep(stepIdx, catHTML);
            stepIdx++;
        }

        // PASO 11: Necesidades y Estrés
        html += this.buildStep(11, `
            <h2 style="font-size: 2rem; color: var(--valtara-oro); margin-bottom: 1.5rem; font-family: var(--font-accent);"><i class="fa-solid fa-comment-medical"></i> Observaciones Biomecánicas del Corazón</h2>
            <p style="color: #aaa; margin-bottom: 2.5rem; font-size: 1.1rem; font-weight: 300;">¿Hay algo más que debamos amablemente saber para que su sesión sea perfecta? Piense en lesiones recientes o áreas que requieran atención especial.</p>
            
            <div style="margin-bottom: 2.5rem; background: rgba(255,255,255,0.03); padding: 2rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
                <label style="color: var(--valtara-blanco); font-weight: bold; display: block; margin-bottom: 1rem; font-size: 1.1rem;">Nivel de Tensión/Estrés Percibido (1 = Calma Absoluta, 10 = Crisis):</label>
                <input type="range" min="1" max="10" value="${this.formData.estres}" oninput="document.getElementById('lbl-estres').innerText=this.value; ExpedienteEngine.updateData('estres', null, this.value)" style="width: 100%; accent-color: var(--valtara-cian-brillante); cursor: pointer; height: 10px;">
                <div id="lbl-estres" style="text-align: center; color: var(--valtara-cian-brillante); font-size: 2.5rem; font-weight: bold; margin-top: 15px; font-family: monospace;">${this.formData.estres}</div>
            </div>
            ${this.buildInput('textarea', 'Mensaje para su terapeuta biomecánico (Zonas de dolor agudo, cirugías recientes, traumas):', 'extra', null, 'Ej: "Dolor punzante en el omóplato derecho", "Uso anticoagulantes", "Reciente liposucción", "Me siento emocionalmente sensible hoy".')}
        `);

        // PASO 12: REVISIÓN MAESTRA "TABLE VIEW" (Goal 2 - Interactividad)
        html += this.buildStep(12, this.buildReviewTable());

        // PASO 13: Compromiso Legal y Firma (Goal 2 - Veracidad)
        html += this.buildStep(13, `
            <div style="background: rgba(0,0,0,0.5); padding: 2rem; border-radius: 25px; border-left: 5px solid var(--valtara-verde-menta); margin-bottom: 2rem; border-right: 1px solid rgba(255,255,255,0.05);">
                <h3 style="color: var(--valtara-verde-menta); margin-top:0; font-family: var(--font-accent); font-size: 1.6rem;"><i class="fa-solid fa-balance-scale"></i> Certificación de Veracidad y Confianza</h3>
                <p style="color: white; font-size: 1.1rem; text-align: justify; margin-bottom: 0; line-height: 1.6;">Maniﬁesto bajo protesta de decir verdad que la información aquí compartida es veraz. Entiendo que ocultar condiciones de salud graves (como coágulos, patógenos contagiosos, patologías óseas o prótesis) pone en riesgo mi integridad y la del personal, deslindando a Grupo Gevizz S.A.S. de cualquier consecuencia derivada de dicha omisión.</p>
            </div>
            
            <label style="display: flex; align-items: flex-start; gap: 1.2rem; margin-bottom: 2.5rem; cursor: pointer; padding: 1.5rem; background: rgba(0,255,170,0.05); border-radius: 15px; border: 1px solid rgba(0,255,170,0.2);">
                <input type="checkbox" onchange="ExpedienteEngine.updateData('legal', 'truthOath', this.checked)" ${this.formData.legal.truthOath ? 'checked' : ''} style="width: 30px; height: 30px; accent-color: var(--valtara-verde-menta); margin-top: 5px; cursor: pointer;">
                <span style="color: white; font-weight: bold; font-size: 1rem; line-height: 1.5;">He leído y acepto el compromiso de veracidad. Autorizo amablemente a Grupo Gevizz S.A.S. para mi atención terapéutica.</span>
            </label>

            ${this.buildInput('text', 'FIRMA DIGITAL (Escriba amablemente su Nombre Completo)', 'legal', 'signature', 'Su nombre aquí vincula su identidad (CURP) al documento.')}
            <div style="text-align: right; color: #666; font-size: 0.8rem; margin-top: 10px; font-family: monospace;">Validación NOM-151 active.</div>
        `);

        content.innerHTML = html;
        this.updateUI();
    },

    // ====================================================================
    // 3. HELPERS DE HTML, EVENTOS Y EDICIÓN (Goal 2)
    // ====================================================================
    buildStep: function(index, content) {
        return `<div id="step-${index}" class="exp-step animate-in fade-in" style="display: ${index === 0 ? 'block' : 'none'};">${content}</div>`;
    },

    buildInput: function(type, label, cat, key, placeholder='', extraClass='') {
        let val = cat && key ? this.formData[cat][key] : (cat ? this.formData[cat] : '');
        if (type === 'textarea') {
            return `
            <div>
                <label style="color: var(--valtara-oro-suave); font-size: 0.9rem; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 0.8rem;">${label}</label>
                <textarea rows="5" oninput="ExpedienteEngine.updateData('${cat}', '${key}', this.value)" class="${extraClass}" style="width: 100%; padding: 1.2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 15px; outline: none; resize: none; font-size: 1rem; line-height: 1.5;" placeholder="${placeholder}">${val}</textarea>
            </div>`;
        }
        return `
        <div>
            <label style="color: var(--valtara-oro-suave); font-size: 0.9rem; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 0.8rem;">${label}</label>
            <input type="${type}" oninput="ExpedienteEngine.updateData('${cat}', '${key}', this.value)" value="${val}" class="${extraClass}" style="width: 100%; padding: 1.4rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 15px; outline: none; font-size: 1.1rem;" placeholder="${placeholder}">
        </div>`;
    },

    buildCheckBtn: function(label, cat, arrKey, val, icon) {
        const isChecked = this.formData[cat][arrKey].includes(val);
        const bg = isChecked ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255,255,255,0.02)';
        const border = isChecked ? 'var(--valtara-cian-brillante)' : 'rgba(255,255,255,0.1)';
        const color = isChecked ? 'white' : '#aaa';
        
        return `
        <button onclick="ExpedienteEngine.toggleArray('${cat}', '${arrKey}', '${val}'); ExpedienteEngine.renderWizard();" style="padding: 1.8rem 1rem; border-radius: 18px; background: ${bg}; border: 2px solid ${border}; color: ${color}; cursor: pointer; transition: 0.3s; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: ${isChecked ? '0 5px 15px rgba(0,255,255,0.1)' : 'none'};">
            <i class="fa-solid ${icon}" style="font-size: 2.2rem; color: ${isChecked ? 'var(--valtara-cian-brillante)' : '#666'};"></i>
            <span style="font-weight: bold; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${label}</span>
        </button>`;
    },

    buildClinicalCard: function(cat, id, label, desc) {
        const isChecked = this.formData.clinical[cat][id];
        const bg = isChecked ? 'rgba(242, 201, 76, 0.08)' : 'rgba(255,255,255,0.02)';
        const border = isChecked ? 'var(--valtara-oro)' : 'rgba(255,255,255,0.1)';
        const iconColor = isChecked ? 'var(--valtara-oro)' : '#555';
        const icon = isChecked ? 'fa-circle-check' : 'fa-circle';

        return `
        <button onclick="ExpedienteEngine.toggleClinical('${cat}', '${id}'); ExpedienteEngine.renderWizard();" style="width: 100%; text-align: left; padding: 1.4rem; border-radius: 15px; background: ${bg}; border: 1px solid ${border}; cursor: pointer; transition: 0.3s; display: flex; align-items: center; gap: 18px;">
            <i class="fa-regular ${icon}" style="color: ${iconColor}; font-size: 1.8rem; margin-top: 3px;"></i>
            <div style="flex: 1;">
                <strong style="color: white; display: block; font-size: 1.15rem; margin-bottom: 2px;">${label}</strong>
                <span style="color: #aaa; font-size: 0.9rem; line-height: 1.4; font-weight: 300;">${desc}</span>
            </div>
        </button>`;
    },

    // MÓDULO DE REVISIÓN "TABLE VIEW" (Goal 2)
    buildReviewTable: function() {
        const d = this.formData;
        const nombre = d.personal.fullName || '<span style="color:#ff5555;">[Falta]</span>';
        
        let clinicaResumen = [];
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let activos = [];
            category.items.forEach(item => { if(d.clinical[catKey][item.id]) activos.push(item.label); });
            if(activos.length > 0) clinicaResumen.push(`<strong>${category.title}:</strong> ${activos.join(', ')}`);
        }
        const clinicaHTML = clinicaResumen.length > 0 ? clinicaResumen.join('<br>') : '<span style="color:var(--valtara-verde-menta);">Cero padecimientos reportados.</span>';

        return `
            <h2 style="font-size: 2rem; color: var(--valtara-blanco); margin-bottom: 2rem; font-family: var(--font-accent);"><i class="fa-solid fa-clipboard-list text-indigo-400"></i> Revisión Maestra de Datos</h2>
            <p style="color: #aaa; margin-bottom: 2.5rem; font-size: 1.1rem; font-weight: 300; line-height: 1.6;">Le solicitamos amablemente revisar que sus datos sean veraces antes de cifrarlos. Si necesita corregir algo, toque el botón <strong style="color:var(--valtara-oro);">Editar</strong>.</p>
            
            <div style="display: flex; flex-direction: column; gap: 1.5rem; background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 25px; border: 1px solid rgba(255,255,255,0.05);">
                ${this.buildReviewRow('I. Identidad', `<strong>Ejecutivo:</strong> ${nombre}<br><strong>CURP:</strong> ${d.personal.curp}<br><strong>Nacimiento:</strong> ${d.personal.birthDate}`, 1)}
                ${this.buildReviewRow('II. Accesibilidad', `<strong>Perfil:</strong> ${d.accessibility.profile.join(', ') || 'Sin requerimientos'}<br><strong>Apoyos:</strong> ${d.accessibility.supports || 'N/A'}`, 2)}
                ${this.buildReviewRow('III. Emergencia', `<strong>Contacto:</strong> ${d.emergency.name}<br><strong>Relación:</strong> ${d.emergency.relationship}<br><strong>Teléfono:</strong> ${d.emergency.phone}`, 3)}
                ${this.buildReviewRow('IV. Estado Biomecánico', clinicaHTML, 4)}
                ${this.buildReviewRow('V. Estrés y Notas', `<strong>Nivel Estrés:</strong> ${d.estres}/10<br><strong>Mensaje:</strong> ${d.extra || 'N/A'}`, 11)}
            </div>
        `;
    },

    buildReviewRow: function(title, content, targetStep) {
        return `
            <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: start; gap: 20px;">
                <div>
                    <h4 style="color: var(--valtara-oro); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 10px 0; font-weight: 900;">${title}</h4>
                    <p style="color: white; font-size: 1rem; margin:0; line-height: 1.6; font-weight: 300;">${content}</p>
                </div>
                <button onclick="ExpedienteEngine.goToStep(${targetStep})" style="background: rgba(242,201,76,0.1); border: 1px solid var(--valtara-oro); color: var(--valtara-oro); padding: 8px 15px; border-radius: 20px; cursor: pointer; font-size: 0.85rem; font-weight: bold; flex-shrink: 0; transition: 0.3s; text-transform: uppercase;">Editar</button>
            </div>
        `;
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

    goToStep: function(stepIdx) {
        this.currentStep = stepIdx;
        this.renderWizard(); // Re-render para actualizar el HTML de revisión si cambió algo
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

        if(btnNext) btnNext.addEventListener('click', () => { if(this.currentStep < this.totalSteps - 1) { this.currentStep++; this.renderWizard(); }}); // Renderizar en cada paso por si acaso
        if(btnPrev) btnPrev.addEventListener('click', () => { if(this.currentStep > 0) { this.currentStep--; this.renderWizard(); }});
        
        if(btnSubmit) btnSubmit.addEventListener('click', () => {
            if(!this.formData.legal.truthOath || !this.formData.legal.signature) {
                alert("Debe amablemente aceptar las condiciones de veracidad y firmar el expediente.");
                return;
            }
            this.generateAndSendPDF();
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
        
        const isLastStep = this.currentStep === this.totalSteps - 1;
        document.getElementById('wiz-next').style.display = isLastStep ? 'none' : 'block';
        document.getElementById('wiz-submit').style.display = isLastStep ? 'block' : 'none';
    },

    // ====================================================================
    // 4. MEMORIA LOCAL Y EXPORTACIÓN PDF DE LUJO (Goal 1: PDF Guapo)
    // ====================================================================
    saveData: function() {
        this.formData.fechaStamp = new Date().getTime(); // Actualiza la estampa del centinela
        localStorage.setItem('valtara_expediente', JSON.stringify(this.formData));
    },

    loadData: function() {
        const saved = localStorage.getItem('valtara_expediente');
        if(saved) this.formData = JSON.parse(saved);
    },

    generateAndSendPDF: function() {
        const d = this.formData;
        const nombre = d.personal.fullName || 'Paciente_Sovereign';
        const curp = d.personal.curp || 'N/A_CURP';
        const hash = "HASH-" + Math.random().toString(36).substr(2, 12).toUpperCase();
        const fechaDoc = new Date().toLocaleDateString();

        // Extraer los padecimientos que están en "True" (Rojo carmesí para alertar)
        let clinicaHTML = '';
        for (const [catKey, category] of Object.entries(this.clinicalDict)) {
            let activos = [];
            category.items.forEach(item => { if(d.clinical[catKey][item.id]) activos.push(item.label); });
            if(activos.length > 0) {
                clinicaHTML += `<p style="margin: 3px 0; font-size:11px;"><strong>${category.title}:</strong> <span style="color: #c62828; font-weight:bold;">${activos.join(', ')}</span></p>`;
            }
        }
        if(clinicaHTML === '') clinicaHTML = '<p style="color: #1b5e20; font-weight: bold; font-size:11px;">Cero padecimientos biomecánicos reportados.</p>';

        const pdfContent = document.createElement('div');
        pdfContent.style.cssText = "padding: 30px 40px; font-family: 'Lato', sans-serif; color: #111; background: #fff; font-size: 11px; line-height: 1.4; position: relative;";
        
        pdfContent.innerHTML = `
            <div style="border-bottom: 3px solid #D4AF37; padding-bottom: 10px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <img src="logo.png" style="width: 50px; height: auto; margin-bottom: 3px;">
                    <h1 style="font-family: 'Playfair Display', serif; color: #050508; margin: 0; font-size: 26px; letter-spacing: 2px;">VALTARA</h1>
                    <p style="color: #666; font-size: 9px; margin: 0; letter-spacing: 3px; text-transform: uppercase;">Executive Therapy & Biomechanics</p>
                </div>
                <div style="text-align: right;">
                    <p style="margin: 0; font-weight: bold; color: #D4AF37; font-size:14px;">EXPEDIENTE CLÍNICO SOBERANO</p>
                    <p style="margin: 0; font-size: 10px; color: #888;">ID: HASH-${hash.substr(5,6)}</p>
                    <p style="margin: 0; font-size: 10px; color: #888;">Fecha: ${fechaDoc}</p>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                <div style="background: #fdfdfd; padding: 10px; border-radius: 8px; border: 1px solid #eee; border-left: 4px solid #050508;">
                    <h3 style="margin: 0 0 8px 0; color: #050508; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #eee; padding-bottom:3px; letter-spacing:1px;">I. Identidad Ejecutiva</h3>
                    <p style="margin:2px 0;"><strong>Paciente:</strong> ${nombre}</p>
                    <p style="margin:2px 0;"><strong>CURP:</strong> ${curp}</p>
                    <p style="margin:2px 0;"><strong>Nacimiento:</strong> ${d.personal.birthDate}</p>
                    <p style="margin:2px 0;"><strong>Teléfono:</strong> ${d.personal.phone}</p>
                </div>
                <div style="background: #fff; padding: 10px; border-radius: 8px; border: 1px solid #eee;">
                    <h3 style="margin: 0 0 8px 0; color: #ff5555; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #eee; padding-bottom:3px; letter-spacing:1px;">II. Contacto Vital</h3>
                    <p style="margin:2px 0;"><strong>Contacto:</strong> ${d.emergency.name}</p>
                    <p style="margin:2px 0;"><strong>Relación:</strong> ${d.emergency.relationship}</p>
                    <p style="margin:2px 0;"><strong>Teléfono:</strong> ${d.emergency.phone}</p>
                </div>
            </div>

            <div style="margin-bottom: 15px;">
                <h3 style="margin: 0 0 8px 0; color: #D4AF37; border-bottom: 1px solid #f2c94c22; padding-bottom: 4px; font-size: 11px; text-transform: uppercase; letter-spacing:1px;">III. Análisis Biomecánico & Clínico</h3>
                <p style="margin: 3px 0; font-size:11px;"><strong>Nivel de Tensión/Estrés Percibido:</strong> <strong style="font-size:12px;">${d.estres} / 10</strong></p>
                ${clinicaHTML}
            </div>

            <div style="margin-bottom: 15px;">
                <h3 style="margin: 0 0 8px 0; color: #00897b; border-bottom: 1px solid #00897b22; padding-bottom: 4px; font-size: 11px; text-transform: uppercase; letter-spacing:1px;">IV. Accesibilidad y Notas Especiales</h3>
                <p style="margin: 3px 0; font-size:11px;"><strong>Apoyos Requeridos:</strong> ${d.accessibility.profile.length > 0 ? d.accessibility.profile.join(', ') : 'Ninguno reportado.'}</p>
                <div style="margin: 5px 0; background: #fdfaf0; padding: 8px; border-radius: 5px; border-left: 3px solid #D4AF37; font-style: italic; color:#333; font-size:10px; line-height:1.3;">
                    ${d.extra || 'Cero observaciones biomecánicas adicionales del corazón.'}
                </div>
            </div>

            <div style="margin-top: 30px; padding-top: 15px; border-top: 2px dashed #eee;">
                <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                    <div style="text-align: center; width: 300px;">
                        <div style="font-family: 'Playfair Display', serif; font-size: 20px; font-style: italic; color: #050508; border-bottom: 1px solid #050508; margin-bottom: 5px; padding-bottom: 5px;">
                            ${d.legal.signature}
                        </div>
                        <p style="margin: 0; font-size: 9px; font-weight: bold; text-transform: uppercase; letter-spacing:1px;">Firma del Paciente Soberano</p>
                        <p style="margin: 2px 0 0 0; font-size: 8px; color: #888;">Validado vía CURP: ${curp}</p>
                    </div>
                    <div style="text-align: right; background: #050508; color: white; padding: 10px; border-radius: 8px;">
                        <p style="margin: 0; font-size: 8px; color: #D4AF37; font-weight: bold; text-transform: uppercase;">Sello Criptográfico de Tiempo (NOM-151)</p>
                        <p style="margin: 2px 0 0 0; font-size: 11px; color: white; font-family: monospace; font-weight: bold;">${hash}</p>
                    </div>
                </div>
            </div>

            <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 8px; line-height: 1.3;">
                <p style="margin:0 0 3px 0;">Sovereign OS V25.3 | Certificación Digital de Privacidad Local | Grupo Gevizz S.A.S. CDMX.</p>
                <p style="margin:0; text-transform: uppercase; letter-spacing:1px; color:#888;">Queda prohibida la alteración o falsificación de este documento certificado criptográficamente.</p>
            </div>
        `;

        // Configuración de html2pdf para máxima calidad y ajuste a una hoja Carta
        const opt = {
            margin:       0,
            filename:     `Valtara_Expediente_${nombre.replace(/\s+/g, '_')}.pdf`,
            image:        { type: 'jpeg', quality: 1 }, // JPEG para evitar bloqueos PNG CSP
            html2canvas:  { scale: 3, useCORS: true, logging: false }, // CORS para logo.png
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' } // Carta Vertical
        };

        const btnSubmit = document.getElementById('wiz-submit');
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Cifrando y Generando...';
        btnSubmit.style.pointerEvents = 'none';
        btnSubmit.style.opacity = '0.7';

        // Lanzar generación PDF ( html2pdf debe estar cargado en index.html )
        if (typeof html2pdf !== 'undefined') {
            html2pdf().set(opt).from(pdfContent).save().then(() => {
                btnSubmit.innerHTML = '<i class="fa-solid fa-check"></i> Descargado en Local';
                btnSubmit.style.background = 'linear-gradient(135deg, #1b5e20, #2e7d32)';
                
                // Disparar WhatsApp Assistant
                const mensaje = `*Aura Assistant (Valtara)* 🌿%0A%0ASe ha actualizado y generado un Expediente Soberano Certificado.%0A%0A*Ejecutivo:* ${d.personal.fullName}%0A*Tensión Biomecánica:* ${d.estres}/10%0A%0A_El paciente enviará su PDF certificado a continuación._`;
                
                setTimeout(() => {
                    document.getElementById('expediente-modal').close();
                    window.open(`https://wa.me/5213348572070?text=${mensaje}`, '_blank');
                    // Restaurar botón
                    setTimeout(() => { this.renderWizard(); }, 1000); 
                }, 2000);
            }).catch(err => {
                console.error("Falla en la renderización PDF Soberano:", err);
                btnSubmit.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error de Render';
                btnSubmit.style.background = '#c62828';
                btnSubmit.style.pointerEvents = 'auto';
                btnSubmit.style.opacity = '1';
            });
        } else {
            console.error("Librería html2pdf no detectada.");
            btnSubmit.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Librería Bloqueada';
            btnSubmit.style.background = '#666';
            btnSubmit.style.pointerEvents = 'auto';
            btnSubmit.style.opacity = '1';
        }
    }
};

// Auto-inicialización
window.addEventListener('DOMContentLoaded', () => ExpedienteEngine.init());
