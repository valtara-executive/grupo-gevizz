/**
 * ====================================================================================
 * BLOQUE 4: LA ENCICLOPEDIA VALTARA (DATA & RENDER ENGINE V12.0 - SUPREME EDITION)
 * Integración de FAQs, Videoteca, Módulos Modales, Expansión Art & Nails VIP,
 * y el Manifiesto de la Dirección Tecnológica.
 * ====================================================================================
 */

// Motor Lógico del Juego de Aromaterapia (El Alquimista Valtara)
window.ValtaraAlchemist = {
    scenarios: [
        {
            case: "Paciente corporativo llega con cefalea tensional (migraña) intensa y bruxismo por estrés financiero.",
            options: [
                { name: "Aceite de Canela", correct: false, reason: "Incorrecto. La canela es rubefaciente y muy caliente; podría aumentar el flujo sanguíneo a la cabeza y empeorar la migraña." },
                { name: "Aceite de Menta", correct: true, reason: "¡Exacto! El mentol actúa como un vasoconstrictor natural y genera analgesia inmediata, bloqueando los receptores de dolor del nervio trigémino." },
                { name: "Aceite de Árnica", correct: false, reason: "Incorrecto. Aunque es desinflamante, su absorción está diseñada para tejido muscular profundo y hematomas, no para tensión neurológica craneal." }
            ]
        },
        {
            case: "Paciente reporta insomnio severo, ansiedad nocturna y no puede 'apagar' su cerebro antes de dormir.",
            options: [
                { name: "Aceite de Romero", correct: false, reason: "Incorrecto. El romero es un poderoso estimulante del sistema nervioso central, lo que agravaría el insomnio severamente." },
                { name: "Aceite de Limón", correct: false, reason: "Incorrecto. Los cítricos estimulan la producción de glóbulos blancos y elevan la energía, algo contraproducente para dormir." },
                { name: "Aceite de Lavanda", correct: true, reason: "¡Excelente elección! El Linalool presente en la lavanda tiene efectos sedantes científicamente probados al interactuar con los receptores GABA, induciendo ondas cerebrales lentas." }
            ]
        },
        {
            case: "Ejecutivo se presenta a las 9:00 AM con Síndrome de Burnout, fatiga crónica y falta de motivación para su día.",
            options: [
                { name: "Aceite de Manzanilla", correct: false, reason: "Incorrecto. La manzanilla relajaría demasiado su sistema, empeorando la fatiga matutina." },
                { name: "Aceite de Romero", correct: true, reason: "¡Perfecto! El romero es el 'café' de la aromaterapia. Mejora la circulación cerebral, disipa la niebla cognitiva y activa el estado de alerta." },
                { name: "Aceite de Valeriana", correct: false, reason: "Incorrecto. La valeriana es un sedante profundo que lo induciría al sueño inmediatamente." }
            ]
        },
        {
            case: "Para-atleta llega a consulta con dolor crónico en hombros y acumulación masiva de ácido láctico tras una competencia.",
            options: [
                { name: "Aceite de Rosa", correct: false, reason: "Incorrecto. La rosa es maravillosa para la cosmética facial y el equilibrio emocional, pero carece de potencia biomecánica." },
                { name: "Macerado de Árnica", correct: true, reason: "¡Decisión maestra! La helenalina del Árnica es un bloqueador de la inflamación muscular de alto impacto, ideal para reparar microdesgarros de la fascia." },
                { name: "Aceite de Naranja Dulce", correct: false, reason: "Incorrecto. Excelente para mejorar el estado de ánimo, pero no tiene penetración antiinflamatoria profunda." }
            ]
        },
        {
            case: "Paciente atraviesa un duelo reciente. Se nota apatía, depresión leve y postura encorvada (pecho cerrado).",
            options: [
                { name: "Aceite de Naranja Dulce", correct: true, reason: "¡Gran empatía! El Limoneno estimula la liberación de dopamina. Los aromas cítricos se conectan directamente con el sistema límbico, evocando recuerdos de vitalidad." },
                { name: "Aceite de Árbol de Té", correct: false, reason: "Incorrecto. El Tea Tree es un potente bactericida e inmunoestimulante, pero su aroma clínico no aborda la tristeza profunda." },
                { name: "Aceite de Eucalipto", correct: false, reason: "Incorrecto. Su perfil mentolado abrirá sus vías respiratorias, pero no incidirá en la producción química de la felicidad." }
            ]
        },
        {
            case: "El paciente presenta fatiga debido a congestión respiratoria severa y alergias estacionales que limitan su oxigenación.",
            options: [
                { name: "Aceite de Eucalipto", correct: true, reason: "¡Precisión clínica! El 1,8-cineol del eucalipto es un expectorante y mucolítico natural que abre inmediatamente el tracto respiratorio." },
                { name: "Aceite de Lavanda", correct: false, reason: "Incorrecto. Lo relajará, pero no romperá el bloqueo de las vías respiratorias superiores." },
                { name: "Aceite de Ylang-Ylang", correct: false, reason: "Incorrecto. Su intenso aroma floral y exótico podría saturar aún más su sistema olfativo ya comprometido." }
            ]
        },
        {
            case: "Sientes al paciente al borde del llanto. Tensión nerviosa extrema, palpitaciones y respiración entrecortada.",
            options: [
                { name: "Aceite de Menta", correct: false, reason: "Incorrecto. La menta es muy vigorizante y fría; el paciente en crisis nerviosa necesita calor y contención suave." },
                { name: "Aceite de Romero", correct: false, reason: "Incorrecto. Estimularía aún más su frecuencia cardíaca, lo cual es peligroso en este estado." },
                { name: "Aceite de Manzanilla Romana", correct: true, reason: "¡Tacto perfecto! La manzanilla actúa como un bálsamo para el sistema nervioso estresado, calmando las palpitaciones y bajando la presión arterial suavemente." }
            ]
        },
        {
            case: "Adulto mayor con sensibilidad alterada. Presenta inflamación articular leve en rodillas que empeora con el frío.",
            options: [
                { name: "Aceite de Limón", correct: false, reason: "Incorrecto. Carece de las propiedades térmicas (calor) necesarias para aliviar la articulación fría." },
                { name: "Aceite de Bergamota", correct: false, reason: "Incorrecto. Maravilloso antidepresivo, pero sin impacto en el tejido conectivo articular." },
                { name: "Aceite de Jengibre", correct: true, reason: "¡Sabiduría ancestral! El jengibre es un aceite esencial termogénico (aporta calor profundo) y un bloqueador de las prostaglandinas inflamatorias." }
            ]
        },
        {
            case: "Ejecutivo de alto nivel con hipertensión documentada por exceso de estrés y adrenalina en la sangre.",
            options: [
                { name: "Aceite de Canela", correct: false, reason: "Incorrecto. La canela aumenta la temperatura y la circulación, lo cual es de altísimo riesgo para un paciente hipertenso." },
                { name: "Aceite de Ylang-Ylang", correct: true, reason: "¡Conocimiento de élite! El Ylang-Ylang es uno de los pocos aceites reconocidos científicamente como hipotensivo (ayuda a bajar la presión arterial rápidamente)." },
                { name: "Aceite de Romero", correct: false, reason: "Incorrecto. Al igual que la canela, el romero eleva la presión arterial." }
            ]
        },
        {
            case: "Paciente requiere un masaje de descompresión en silla en su oficina para poder volver a una junta urgente y enfocarse.",
            options: [
                { name: "Aceite de Árnica", correct: false, reason: "Incorrecto. Muy denso para el entorno de oficina y no impacta la concentración." },
                { name: "Aceite de Limón", correct: true, reason: "¡Gran agilidad mental! Los cítricos, especialmente el limón, promueven un estado de alerta cristalina, ideal para volver a trabajar con enfoque láser." },
                { name: "Aceite de Manzanilla", correct: false, reason: "Incorrecto. Lo relajaría tanto que le sería muy difícil mantener la atención en su junta corporativa." }
            ]
        }
    ],
    currentLvl: 0,
    
    init: function() {
        this.currentLvl = Math.floor(Math.random() * this.scenarios.length);
        this.render();
    },
    
    render: function() {
        const gameDiv = document.getElementById('alchemist-game-container');
        if(!gameDiv) return;
        
        const data = this.scenarios[this.currentLvl];
        
        // Barajar opciones
        let opts = [...data.options];
        for (let i = opts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opts[i], opts[j]] = [opts[j], opts[i]];
        }
        
        let html = `
            <div style="background: rgba(0,0,0,0.8); border: 2px solid var(--valtara-cian-brillante); border-radius: 1.5rem; padding: 3rem; text-align: center;">
                <i class="fa-solid fa-flask-vial" style="font-size: 4rem; color: var(--valtara-cian-brillante); margin-bottom: 1.5rem;"></i>
                <h3 style="font-family: var(--font-accent); font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem;">Experiencia Botánica Interactiva</h3>
                <p style="font-size: 1.15rem; color: var(--valtara-oro); margin-bottom: 2rem;">¿Qué aceite puro elegirías tú, como Alquimista Valtara?</p>
                
                <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 1rem; margin-bottom: 2.5rem; border-left: 5px solid var(--valtara-morado-vivo);">
                    <p style="font-size: 1.25rem; color: var(--valtara-blanco); text-align: left; line-height: 1.8;"><strong>Caso Clínico:</strong> ${data.case}</p>
                </div>
                
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem;" id="alchemist-buttons">
        `;
        
        opts.forEach((opt, idx) => {
            const isCorrect = opt.correct ? 'true' : 'false';
            html += `<button class="btn-primary" aria-label="Elegir ${opt.name}" style="background: var(--cristal-fondo); border: 1px solid var(--valtara-oro-suave); font-size: 1.1rem; flex: 1; min-width: 250px;" onclick="window.ValtaraAlchemist.guess('${isCorrect}', \`${opt.reason.replace(/"/g, '&quot;')}\`)"><i class="fa-solid fa-droplet"></i> ${opt.name}</button>`;
        });
        
        html += `
                </div>
                
                <div id="alchemist-feedback" aria-live="polite" style="display: none; margin-top: 3rem; padding: 2rem; border-radius: 1rem;">
                </div>
                
                <button onclick="window.ValtaraAlchemist.init()" style="margin-top: 2rem; background: transparent; border: none; color: var(--valtara-gris-texto); text-decoration: underline; cursor: pointer; font-size: 1rem;">Cargar otro paciente (Nuevo Nivel)</button>
            </div>
        `;
        
        gameDiv.innerHTML = html;
        
        if(window.A11yEngine && window.A11yEngine.ttsActive) {
            window.A11yEngine.announce("El Alquimista Valtara. Caso clínico: " + data.case + ". Elige un aceite de las opciones.");
        }
    },
    
    guess: function(isCorrect, reason) {
        const feedbackDiv = document.getElementById('alchemist-feedback');
        const buttons = document.getElementById('alchemist-buttons');
        if(!feedbackDiv || !buttons) return;
        
        buttons.style.pointerEvents = 'none';
        buttons.style.opacity = '0.5';
        feedbackDiv.style.display = 'block';
        
        if(isCorrect === 'true') {
            feedbackDiv.style.background = 'rgba(0, 230, 118, 0.15)';
            feedbackDiv.style.border = '2px solid var(--valtara-verde-ws)';
            feedbackDiv.innerHTML = `<h4 style="font-size: 1.8rem; color: var(--valtara-verde-ws); margin-bottom: 1rem;"><i class="fa-solid fa-check-circle"></i> Fusión Exitosa</h4><p style="font-size: 1.15rem; color: var(--valtara-blanco); line-height: 1.8;">${reason}</p>`;
            
            const orbe = document.createElement('div');
            orbe.className = 'orb orb-2';
            orbe.style.width = '30vw'; orbe.style.height = '30vw';
            orbe.style.zIndex = '9999';
            document.body.appendChild(orbe);
            setTimeout(() => { orbe.style.opacity = '0'; setTimeout(()=>orbe.remove(), 2000); }, 3000);
            
            if(window.A11yEngine) window.A11yEngine.announce("Correcto. " + reason);
        } else {
            feedbackDiv.style.background = 'rgba(255, 51, 102, 0.15)';
            feedbackDiv.style.border = '2px solid var(--valtara-alerta)';
            feedbackDiv.innerHTML = `<h4 style="font-size: 1.8rem; color: var(--valtara-alerta); margin-bottom: 1rem;"><i class="fa-solid fa-circle-xmark"></i> Reacción Adversa</h4><p style="font-size: 1.15rem; color: var(--valtara-blanco); line-height: 1.8;">${reason}</p>`;
            if(window.A11yEngine) window.A11yEngine.announce("Incorrecto. " + reason);
        }
    }
};

window.ValtaraData = {
    /* --------------------------------------------------------------------------------
       1. SECCIÓN INICIO, ART & NAILS VIP Y MAPA CORPORAL EXPANDIBLE
       -------------------------------------------------------------------------------- */
    home: `
        <div class="hero-view reveal" style="text-align: center; padding: 4rem 0;">
            <div class="glow-icon-wrapper" style="margin-bottom: 2.5rem;">
                <i aria-hidden="true" class="fa-solid fa-leaf gold-icon" style="font-size: 5rem; color: var(--valtara-oro);"></i>
            </div>
            
            <h1 id="hero-dynamic-greeting" style="font-family: var(--font-accent); font-size: 4.5rem; margin-bottom: 1rem; color: var(--valtara-blanco); line-height: 1.2;">VALTARA</h1>
            
            <h2 style="color: var(--valtara-oro-suave); font-size: 1.6rem; letter-spacing: 0.3rem; margin-bottom: 2rem; font-weight: 700; text-transform: uppercase;">Executive Therapy & Biomechanics</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.3rem; max-width: 900px; margin: 0 auto 4rem auto; line-height: 2; font-weight: 300;">
                El éxito corporativo exige un vehículo biológico capaz de sostenerlo. En nuestro santuario privado en Paseo de la Reforma, decodificamos la tensión acumulada por la alta exigencia mediante ciencia anatómica profunda. Su sistema nervioso está a punto de reiniciarse.
            </p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; max-width: 1100px; margin: 0 auto; text-align: left;">
                <div class="glass-card" style="padding: 2.5rem;">
                    <h3 id="promo1-title" style="font-size: 1.5rem; color: var(--valtara-cian-brillante); margin-bottom: 1.5rem; font-weight: 900;"><i class="fa-solid fa-sun"></i> Privilegio de Temporada</h3>
                    <p id="promo1-text" style="font-size: 1.15rem; color: var(--valtara-gris-texto); font-weight: 300;">Evaluando privilegios en curso...</p>
                </div>
                <div class="glass-card" style="padding: 2.5rem;">
                    <h3 id="promo2-title" style="font-size: 1.5rem; color: var(--valtara-oro); margin-bottom: 1.5rem; font-weight: 900;"><i class="fa-solid fa-id-card-clip"></i> Valtara Member Card</h3>
                    <p id="promo2-text" style="font-size: 1.15rem; color: var(--valtara-gris-texto); font-weight: 300;">Calculando beneficios de lealtad estructural...</p>
                </div>
                <div class="glass-card" style="padding: 2.5rem;">
                    <h3 id="promo3-title" style="font-size: 1.5rem; color: var(--valtara-morado-vivo); margin-bottom: 1.5rem; font-weight: 900;"><i class="fa-solid fa-mug-hot"></i> Ritual del Ocaso</h3>
                    <p id="promo3-text" style="font-size: 1.15rem; color: var(--valtara-gris-texto); font-weight: 300;">Preparando infusiones orgánicas...</p>
                </div>
            </div>
        </div>

        <!-- ========================================================= -->
        <!-- EXPANSIÓN VIP: ART & NAILS (COLOCADO ARRIBA DEL MAPA) -->
        <!-- ========================================================= -->
        <div class="reveal" style="margin-top: 5rem; margin-bottom: 5rem; background: linear-gradient(145deg, rgba(225, 48, 108, 0.12), rgba(10,10,15,0.95)); border: 2px solid rgba(225, 48, 108, 0.5); padding: 4rem; border-radius: 2rem; max-width: 1200px; margin-left: auto; margin-right: auto; position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(225, 48, 108, 0.15);">
            
            <!-- Burbujas Flotantes Decorativas -->
            <div style="position: absolute; top: -30px; right: -30px; width: 150px; height: 150px; background: #E1306C; border-radius: 50%; opacity: 0.2; filter: blur(30px);"></div>
            <div style="position: absolute; bottom: -50px; left: -50px; width: 200px; height: 200px; background: #ffaa00; border-radius: 50%; opacity: 0.1; filter: blur(40px);"></div>
            
            <!-- Etiqueta Partner -->
            <div style="position: absolute; top: 30px; right: 30px; animation: pulse 2.5s infinite;">
                <span style="background: linear-gradient(45deg, #E1306C, #bc1888); color: white; padding: 0.6rem 1.5rem; border-radius: 30px; font-weight: 800; font-size: 1rem; box-shadow: 0 4px 20px rgba(225, 48, 108, 0.5); letter-spacing: 1px; text-transform: uppercase;"><i class="fa-solid fa-crown"></i> Beauty Partner Oficial</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 4rem; align-items: center; position: relative; z-index: 2;">
                <div>
                    <i class="fa-solid fa-hands-bubbles" style="font-size: 5rem; color: #E1306C; margin-bottom: 2rem;"></i>
                    <h3 style="color: #E1306C; font-size: 3.8rem; margin-bottom: 1rem; font-family: var(--font-accent); line-height: 1.1;">Art & Nails</h3>
                    <p style="color: var(--valtara-blanco); font-size: 1.7rem; font-weight: 700; margin-bottom: 1.5rem; letter-spacing: 1px;">El Santuario de la Estética Integral</p>
                    <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; margin-bottom: 2rem; line-height: 1.8; font-weight: 300;">
                        Tu imagen es tu carta de presentación ejecutiva. En Valtara no solo cuidamos la salud biomecánica de tu espalda; completamos tu experiencia a través de nuestra división experta en belleza. Disfruta de un servicio de excelencia y precisión enfocado en la salud, higiene y estética de tus manos y pies.
                    </p>
                </div>
                
                <div style="background: rgba(0,0,0,0.6); padding: 3rem; border-radius: 1.5rem; border-left: 5px solid #FFB6C1; box-shadow: inset 0 0 20px rgba(255,182,193,0.05);">
                    <h4 style="color: #FFB6C1; font-size: 1.8rem; margin-bottom: 2rem; font-weight: 800;"><i class="fa-solid fa-envelope-open-text"></i> Te Invitamos a Descubrir:</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; color: var(--valtara-blanco); font-size: 1.25rem; line-height: 2.4;">
                        <li><i class="fa-solid fa-check" style="color: #E1306C; margin-right: 15px; font-size: 1.4rem;"></i> <strong>Manicure de Alta Gama:</strong> Precisión y elegancia en cada detalle.</li>
                        <li><i class="fa-solid fa-check" style="color: #E1306C; margin-right: 15px; font-size: 1.4rem;"></i> <strong>Pedicure Clínico:</strong> Salud, higiene y confort para tu andar.</li>
                        <li><i class="fa-solid fa-check" style="color: #E1306C; margin-right: 15px; font-size: 1.4rem;"></i> <strong>Mani Spa & Pedi Spa:</strong> Rituales de exfoliación y relajación.</li>
                        <li><i class="fa-solid fa-check" style="color: #E1306C; margin-right: 15px; font-size: 1.4rem;"></i> <strong>Nail Art Design:</strong> Diseños exclusivos y personalizados.</li>
                    </ul>
                </div>
            </div>

            <div style="margin-top: 4rem; border-top: 1px solid rgba(225, 48, 108, 0.3); padding-top: 3rem; text-align: center; position: relative; z-index: 2;">
                <p style="color: #aaa; font-style: italic; font-size: 1.15rem; margin-bottom: 2.5rem;">* Servicio independiente a la clínica biomecánica. La agenda, cotización y atención se realizan directamente con nuestra experta socia a través de sus canales oficiales.</p>
                
                <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                    <a href="https://wa.me/525525248816" target="_blank" class="btn-agenda-ahora" style="width: auto; background: var(--valtara-whatsapp); border-color: var(--valtara-whatsapp); color: #000; box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4); font-size: 1.3rem; padding: 1.2rem 3rem; border-radius: 40px;"><i class="fa-brands fa-whatsapp"></i> Reservar Cita: 55 2524 8816</a>
                    <a href="https://www.instagram.com/art.nails02?igsh=MTk0YnF1aDMwN3gybg==" target="_blank" class="btn-agenda-ahora" style="width: auto; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); border: none; color: white; box-shadow: 0 8px 25px rgba(225, 48, 108, 0.4); font-size: 1.3rem; padding: 1.2rem 3rem; border-radius: 40px;"><i class="fa-brands fa-instagram"></i> Ver Galería en Instagram</a>
                </div>
            </div>
        </div>

        <div class="body-map-container reveal" style="margin-top: 2rem; background: rgba(0,0,0,0.6); border: 2px solid rgba(0, 255, 255, 0.2); border-radius: 2rem; padding: 4rem 3rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 4rem; backdrop-filter: blur(20px); box-shadow: 0 2rem 5rem rgba(0,0,0,0.8);">
            <div>
                <h3 style="font-family: var(--font-accent); color: var(--valtara-cian-brillante); font-size: 3rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-microscope"></i> Triaje Educativo</h3>
                <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; margin-bottom: 3rem; line-height: 1.8;">Haz clic en la zona principal donde sientes estrés. Te educaremos sobre lo que ocurre dentro de tu cuerpo desplegando información profunda.</p>
                <div class="body-zones" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <button class="zone-btn a11y-card-btn" data-zone="craneo" style="border: 2px solid var(--valtara-cian-brillante);"><i class="fa-solid fa-head-side-virus" style="color: var(--valtara-cian-brillante); font-size: 2.5rem;"></i> <span style="font-size: 1.3rem;">Dolor de Cabeza y Mandíbula</span></button>
                    <button class="zone-btn a11y-card-btn" data-zone="cervical" style="border: 2px solid var(--valtara-cian-brillante);"><i class="fa-solid fa-user-injured" style="color: var(--valtara-cian-brillante); font-size: 2.5rem;"></i> <span style="font-size: 1.3rem;">Cuello, Nuca y Hombros</span></button>
                    <button class="zone-btn a11y-card-btn" data-zone="lumbar" style="border: 2px solid var(--valtara-cian-brillante);"><i class="fa-solid fa-child" style="color: var(--valtara-cian-brillante); font-size: 2.5rem;"></i> <span style="font-size: 1.3rem;">Cintura y Dolor de Ciática</span></button>
                    <button class="zone-btn a11y-card-btn" data-zone="linfa" style="border: 2px solid var(--valtara-cian-brillante);"><i class="fa-solid fa-shoe-prints" style="color: var(--valtara-cian-brillante); font-size: 2.5rem;"></i> <span style="font-size: 1.3rem;">Pesadez en las Piernas</span></button>
                </div>
            </div>
            <div class="zone-info" id="zone-display" aria-live="polite" style="background: rgba(0,0,0,0.8); padding: 4rem 3rem; border-radius: 1.5rem; display: flex; flex-direction: column; justify-content: center; border-left: 5px solid var(--valtara-cian-brillante);">
                <i class="fa-solid fa-hand-holding-medical" style="font-size: 6rem; color: var(--valtara-cian-brillante); margin-bottom: 2rem; opacity: 0.5;"></i>
                <h4 style="font-size: 2.5rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-family: var(--font-accent);">Tu diagnóstico aparecerá aquí</h4>
                <p style="color: var(--valtara-gris-texto); line-height: 1.8; font-size: 1.25rem; font-weight: 300;">Selecciona una zona a tu izquierda para entender la ciencia detrás de tu dolor.</p>
            </div>
        </div>

        <!-- REDES SOCIALES HASTA ABAJO -->
        <div class="reveal" style="margin-top: 6rem; background: rgba(20,20,30,0.8); border: 1px solid var(--valtara-blanco); border-radius: 2rem; padding: 4rem 2rem; text-align: center;">
            <h3 style="font-size: 2.5rem; margin-bottom: 2rem; color: var(--valtara-blanco); font-family: var(--font-accent);">Únete a nuestra Comunidad</h3>
            <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; margin-bottom: 3rem;">Sigue nuestro contenido de educación biomecánica y bienestar digital.</p>
            
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin-bottom: 2rem;">
                <a href="https://www.facebook.com/Valtara.mx" target="_blank" class="btn-primary" style="background: #1877F2; border-color: #1877F2; color: white;"><i class="fa-brands fa-facebook"></i> Facebook</a>
                <a href="https://www.instagram.com/valtara.mx" target="_blank" class="btn-primary" style="background: #E1306C; border-color: #E1306C; color: white;"><i class="fa-brands fa-instagram"></i> Instagram</a>
                <a href="https://www.tiktok.com/@valtara.mx" target="_blank" class="btn-primary" style="background: #000; border-color: #333; color: white;"><i class="fa-brands fa-tiktok"></i> TikTok</a>
                <a href="https://youtube.com/@valtaramexico" target="_blank" class="btn-primary" style="background: #FF0000; border-color: #FF0000; color: white;"><i class="fa-brands fa-youtube"></i> YouTube</a>
            </div>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       2. CATÁLOGO DE RESTAURACIÓN BIOMECÁNICA (CON VIDEOTECA INTEGRADA)
       -------------------------------------------------------------------------------- */
    restoration: `
        <div style="text-align: center; max-width: 950px; margin: 0 auto 5rem auto;">
            <h2 style="font-family: var(--font-accent); font-size: 4rem; color: var(--valtara-blanco); margin-bottom: 2rem;" class="reveal">Catálogo de Masajes</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.4rem; line-height: 1.9; font-weight: 300;" class="reveal">Toda sesión presencial incluye un análisis postural preliminar. Nuestras tarifas y duraciones están diseñadas para ofrecerte el máximo rigor clínico.</p>
            <p style="font-size: 1.1rem; color: var(--valtara-oro); margin-top: 1rem; font-style: italic;">* Para agendar las terapias "Próximamente", consulta directamente con el Concierge.</p>
        </div>
        
        <div class="grid-container">
            
            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-cian-brillante); border-color: var(--valtara-cian-brillante);"><i class="fa-solid fa-spa"></i></div>
                <div class="card-content-wrapper">
                    <h3>Masaje Relajante</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> 50 Min / 90 Min</span>
                        <span class="precio">$799 / $999 MXN</span>
                    </div>
                    <p class="marketing-text"><strong>El Arte del Contacto Sanador.</strong> Utiliza movimientos fluidos y rítmicos para calmar tu mente y relajar cada fibra muscular. Es el antídoto perfecto para el ritmo acelerado de la vida moderna, activando el sistema parasimpático para reducir la presión arterial.</p>
                    <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-cian-brillante); color: var(--valtara-negro-fondo); border-color: var(--valtara-cian-brillante);"><i class="fa-brands fa-whatsapp"></i> Agendar por WhatsApp</a>
                </div>
            </article>

            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: #ff5555; border-color: #ff5555;"><i class="fa-solid fa-dumbbell"></i></div>
                <div class="card-content-wrapper">
                    <h3>Masaje Deportivo y Descompresión</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> Máximo 50 Minutos</span>
                        <span class="precio">$829 MXN</span>
                    </div>
                    <p class="marketing-text"><strong>El antídoto contra la "armadura" de estrés.</strong> Diseñado para quienes exigen lo máximo de sus músculos. Utilizamos antebrazos, codos y ventosas de silicón médico de alta succión (sin dejar hematomas feos) para romper la tensión extrema y oxigenar tejidos asfixiados.</p>
                    <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: #ff5555; color: white; border-color: #ff5555;"><i class="fa-brands fa-whatsapp"></i> Agendar por WhatsApp</a>
                </div>
            </article>

            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-verde-menta); border-color: var(--valtara-verde-menta);"><i class="fa-solid fa-person-praying"></i></div>
                <div class="card-content-wrapper">
                    <h3>Masaje Tailandés (Yoga Pasivo)</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> Máximo 50 Minutos</span>
                        <span class="precio">$829 MXN</span>
                    </div>
                    <p class="marketing-text"><strong>Yoga asistido para combatir el sedentarismo.</strong> Tú no haces esfuerzo. Nosotros utilizamos nuestro peso, palancas y pies para estirar tus cadenas musculares posteriores al límite seguro, descomprimiendo el espacio entre las vértebras lumbares para salvar a tu nervio ciático.</p>
                    <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-verde-menta); color: var(--valtara-negro-fondo); border-color: var(--valtara-verde-menta);"><i class="fa-brands fa-whatsapp"></i> Agendar por WhatsApp</a>
                </div>
            </article>

            <!-- AROMATERAPIA AÑADIDA A AYURVEDA -->
            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-oro); border-color: var(--valtara-oro);"><i class="fa-solid fa-leaf"></i></div>
                <div class="card-content-wrapper">
                    <h3>Masaje Ayurveda & Aromaterapia</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> 50 Minutos</span>
                        <span class="precio">$929 MXN</span>
                    </div>
                    <p class="marketing-text"><strong>La Ciencia de la Vida.</strong> Tratamiento personalizado con aceites tibios y esencias botánicas que nutren profundamente la piel, interactuando con tu sistema límbico. Efectivo para calmar la sensibilidad extrema y la ansiedad.</p>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="flex: 1;"><i class="fa-brands fa-whatsapp"></i> Agendar</a>
                        <a href="https://youtu.be/qmRr05954h4?si=JlWdpbQ0gsquRJZp" target="_blank" class="btn-agenda-ahora" style="background: transparent; border: 1px solid var(--valtara-oro); color: var(--valtara-oro); width: auto;"><i class="fa-brands fa-youtube"></i> Ver Experiencia</a>
                    </div>
                </div>
            </article>

            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: #FFD700; border-color: #FFD700;"><i class="fa-solid fa-yin-yang"></i></div>
                <div class="card-content-wrapper">
                    <h3>Masaje Holístico Integrativo</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> 50 Minutos</span>
                        <span class="precio">$929 MXN</span>
                    </div>
                    <p class="marketing-text"><strong>Restauración tras crisis o luto.</strong> Fusión precisa que amalgama la fluidez de las manipulaciones para bajar la presión arterial, con presiones medias en puntos específicos para liberar bloqueos emocionales somatizados en el pecho y el diafragma.</p>
                    <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: #FFD700; color: var(--valtara-negro-fondo); border-color: #FFD700;"><i class="fa-brands fa-whatsapp"></i> Agendar por WhatsApp</a>
                </div>
            </article>

            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-morado-vivo); border-color: var(--valtara-morado-vivo);"><i class="fa-solid fa-child-reaching"></i></div>
                <div class="card-content-wrapper">
                    <h3>Masaje Reductivo (Geles y Madera)</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> Sesión Individual / Paquete</span>
                        <span class="precio">$899 / $6,199 (10 Sesiones)</span>
                    </div>
                    <p class="marketing-text"><strong>El Taller del Cuerpo.</strong> Ingeniería estética de alto impacto sin bisturí. Combinamos la vigorosa fricción de geles reductivos con Maderoterapia (rodillos, copas) para romper nódulos de celulitis. <em>*Paquete disponible a 3 plazos.</em></p>
                    <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-morado-vivo); color: white; border-color: var(--valtara-morado-vivo);"><i class="fa-brands fa-whatsapp"></i> Agendar por WhatsApp</a>
                </div>
            </article>

            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: #ffaa00; border-color: #ffaa00;"><i class="fa-solid fa-crown"></i></div>
                <div class="card-content-wrapper">
                    <h3>Ritual Lomi Lomi Supremo</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> Sesión Profunda</span>
                        <span class="precio">$1,199 MXN</span>
                    </div>
                    <p class="marketing-text"><strong>La Danza de Aloha.</strong> Un cortocircuito al Burnout. Protocolo ininterrumpido usando antebrazos que simula el oleaje del océano Pacífico. Induce ondas Theta de sueño profundo y regeneración absoluta.</p>
                    <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: #ffaa00; color: var(--valtara-negro-fondo); border-color: #ffaa00;"><i class="fa-brands fa-whatsapp"></i> Agendar por WhatsApp</a>
                </div>
            </article>
            
            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-blanco); border-color: var(--valtara-blanco);"><i class="fa-solid fa-chair"></i></div>
                <div class="card-content-wrapper">
                    <h3>Masaje en Silla (Shiatsu en Cama)</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> 20 Minutos</span>
                        <span class="precio">$199 MXN (Adicional)</span>
                    </div>
                    <p class="marketing-text"><strong>Renacer Urbano.</strong> Enfocado en el "cuello tecnológico" y espalda alta. Es una terapia breve pero profunda. <em>*NOTA: Este masaje solo está disponible como complemento bajo la contratación de una terapia tradicional.</em></p>
                    <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-blanco); color: var(--valtara-negro-fondo); border-color: var(--valtara-blanco);"><i class="fa-brands fa-whatsapp"></i> Agendar por WhatsApp</a>
                </div>
            </article>

            <!-- CHOCOLATERAPIA AÑADIDA -->
            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: #FFB6C1; border-color: #FFB6C1;"><i class="fa-solid fa-masks-theater"></i></div>
                <div class="card-content-wrapper">
                    <h3>Relajación Facial (Chocolaterapia)</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> 45 Minutos</span>
                        <span class="precio">$419 MXN</span>
                    </div>
                    <p class="marketing-text"><strong>Borra las huellas del cansancio.</strong> Limpieza y relajación que incluye una mascarilla especializada de Cacao puro para revitalizar la musculatura de tu rostro, hidratarlo y desatar endorfinas de felicidad.</p>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: #FFB6C1; color: var(--valtara-negro-fondo); border-color: #FFB6C1; flex: 1;"><i class="fa-brands fa-whatsapp"></i> Agendar</a>
                        <a href="https://youtu.be/Uc5wVxOW46o?si=XKjptVUjcshkAAY9" target="_blank" class="btn-agenda-ahora" style="background: transparent; border: 1px solid #FFB6C1; color: #FFB6C1; width: auto;"><i class="fa-brands fa-youtube"></i> Ver Experiencia</a>
                    </div>
                </div>
            </article>

            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: #4361EE; border-color: #4361EE;"><i class="fa-solid fa-face-smile"></i></div>
                <div class="card-content-wrapper">
                    <h3>Masaje para Parálisis Facial</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> 45 Minutos</span>
                        <span class="precio">$529 MXN</span>
                    </div>
                    <p class="marketing-text"><strong>Rehabilitación Neuromuscular.</strong> Trabajamos de forma opuesta en cada lado: relajando el lado sano que está contracturado y estimulando el lado paralizado mediante frío, calor y tacto clínico para "despertar" el nervio y recuperar la simetría.</p>
                    <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: #4361EE; color: var(--valtara-blanco); border-color: #4361EE;"><i class="fa-brands fa-whatsapp"></i> Agendar por WhatsApp</a>
                </div>
            </article>

            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-blanco); border-color: var(--valtara-blanco);"><i class="fa-solid fa-droplet"></i></div>
                <div class="card-content-wrapper">
                    <h3>Drenaje Linfático Manual</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> 60 Minutos</span>
                        <span class="precio">$849 MXN</span>
                    </div>
                    <p class="marketing-text">El fluir de la vida. Ayuda a movilizar líquidos y toxinas post-quirúrgicas con toques tan suaves como el aleteo de una mariposa. <strong>*Requiere autorización médica en condiciones específicas.</strong></p>
                    <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-blanco); color: var(--valtara-negro-fondo); border-color: var(--valtara-blanco);"><i class="fa-brands fa-whatsapp"></i> Agendar por WhatsApp</a>
                </div>
            </article>
            
            <!-- ESFERAS CHINAS CON VIDEO Y VELA -->
            <article class="glass-card zig-zag reveal">
                <div class="card-icon-wrapper" style="color: var(--valtara-blanco); border-color: var(--valtara-blanco);"><i class="fa-solid fa-circle-notch"></i></div>
                <div class="card-content-wrapper">
                    <h3>Esferas Chinas & Luz Cálida</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-clock"></i> 60 Minutos</span>
                        <span class="precio">$929 MXN</span>
                    </div>
                    <p class="marketing-text">La vibración sonora y el contacto circular estimulan puntos reflejos induciendo ondas cerebrales Alfa, acompañadas por la calidez de velas aromáticas. El estímulo sonoro es fantástico para pacientes neurodivergentes o con discapacidad visual.</p>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <a href="https://wa.me/5213348572070" target="_blank" class="btn-agenda-ahora" style="background: var(--valtara-blanco); color: var(--valtara-negro-fondo); border-color: var(--valtara-blanco); flex: 1;"><i class="fa-brands fa-whatsapp"></i> Agendar</a>
                        <a href="https://youtube.com/shorts/DjxDYgBbgic?si=FoJQmCf9Wi3JXR7F" target="_blank" class="btn-agenda-ahora" style="background: transparent; border: 1px solid var(--valtara-blanco); color: var(--valtara-blanco); width: auto;"><i class="fa-brands fa-youtube"></i> Ver Experiencia</a>
                    </div>
                </div>
            </article>

            <article class="glass-card zig-zag reveal" style="opacity: 0.6;">
                <div class="card-icon-wrapper" style="color: #666;"><i class="fa-solid fa-hammer"></i></div>
                <div class="card-content-wrapper">
                    <h3>Cámara de Innovación (Próximamente)</h3>
                    <div class="card-meta-info">
                        <span class="duracion"><i class="fa-solid fa-lock"></i> Construcción</span>
                        <span class="precio" style="color: #ff5555;">No Disponible</span>
                    </div>
                    <p class="marketing-text">Estamos adaptando nuestra arquitectura para ofrecer pronto el <strong>Ritual Geotermal (Piedras de Obsidiana)</strong>, <strong>Shiatsu Tradicional</strong> y <strong>Reflexología Podal</strong>. Nuestro rigor exige adaptar el espacio al 100% antes de lanzar un servicio.</p>
                </div>
            </article>

        </div>
    `,

    /* --------------------------------------------------------------------------------
       3. CIENCIA, BOTÁNICA Y MANIFIESTO ÍNTEGRO
       -------------------------------------------------------------------------------- */
    science: `
        <div style="text-align: center; max-width: 1000px; margin: 0 auto 5rem auto;">
            <h2 style="font-family: var(--font-accent); font-size: 3.5rem; color: var(--valtara-blanco); margin-bottom: 2rem;" class="reveal">El Arte de la Sanación</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.4rem; line-height: 1.9; font-weight: 300;" class="reveal">Ciencia, Botánica y Humanismo en Valtara.</p>
        </div>

        <div class="glass-card reveal" style="padding: 4rem 5rem; max-width: 1100px; margin: 0 auto 4rem auto; background: rgba(0,0,0,0.8);">
            
            <p style="font-size: 1.25rem; color: var(--valtara-gris-texto); line-height: 2; margin-bottom: 3rem;">
                Bienvenido a la sección de divulgación científica de Valtara. Este espacio ha sido creado para que tú, como paciente, comprendas que el bienestar no es un evento aislado, sino un proceso biológico y psicológico complejo. Aquí, la Compasión Ancestral se encuentra con el Rigor Clínico para ofrecerte una experiencia de salud integral.
            </p>

            <h3 style="color: var(--valtara-oro); font-family: var(--font-accent); font-size: 2.5rem; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(242,201,76,0.3); padding-bottom: 1rem;">I. Fundamentos Científicos: ¿Por qué funciona la terapia manual?</h3>
            <p style="font-size: 1.2rem; color: var(--valtara-blanco); margin-bottom: 2rem;">Muchos pacientes preguntan si el masaje es solo un lujo. La ciencia responde con un rotundo no. El masaje es una intervención terapéutica que interactúa con varios sistemas de tu cuerpo:</p>
            
            <h4 style="color: var(--valtara-cian-brillante); font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">1. Neurobiología del Dolor y la Respuesta Táctil</h4>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">La piel es el órgano más grande de tu cuerpo y está saturada de receptores sensoriales. Cuando aplicamos una presión específica, activamos los corpúsculos de Meissner (sensibles al tacto suave) y los corpúsculos de Pacini (sensibles a la presión profunda, mejorando la propiocepción y reduciendo la amnesia sensorial).</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;"><strong>La Teoría de la Compuerta (Gate Control Theory):</strong> Propuesta por Melzack y Wall, explica que el estímulo táctil viaja por fibras mielinizadas rápidas (Fibras A-beta), las cuales bloquean químicamente la transmisión de señales de dolor en la médula espinal antes de que lleguen al tálamo. Esto efectivamente "cierra la puerta" al malestar.</p>
            
            <h4 style="color: var(--valtara-cian-brillante); font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">2. La Cascada Neuroquímica del Bienestar</h4>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">Se ha demostrado que una sesión de 50 minutos de masaje profundo reduce los niveles de cortisol (la hormona del estrés) en un promedio del 31%, un reequilibrio vital para combatir el "Burnout" ejecutivo. Simultáneamente, el cerebro libera:</p>
            <ul style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem; margin-left: 2rem; list-style-type: square;">
                <li><strong>Dopamina (aumenta 28%):</strong> Mejora el estado de ánimo y la motivación.</li>
                <li><strong>Serotonina (aumenta 31%):</strong> Regula el sueño y reduce la ansiedad de manera drástica.</li>
                <li><strong>Oxitocina:</strong> Conocida como la "hormona del vínculo", reduce la inflamación sistémica y promueve una regeneración celular más rápida.</li>
            </ul>

            <h4 style="color: var(--valtara-cian-brillante); font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">3. Psicosomática y Memoria Corporal</h4>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">El cuerpo guarda lo que la mente calla. El concepto de "Armadura Muscular", desarrollado por Wilhelm Reich, explica cómo las tensiones crónicas son en realidad mecanismos de defensa emocional congelados en el tejido. Un "nudo" en los hombros puede ser la representación física de una carga de responsabilidad excesiva, mientras que el bruxismo suele ser contención de ira o frustración.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 3rem;">En Valtara, trabajamos para liberar estas "huellas somáticas". Al manipular el tejido profundo, permitimos que el sistema nervioso libere la energía atrapada. La somatización altera la química muscular volviéndolo ácido (lactato); nuestra intervención manual restablece el pH neutro, oxigena las células y rompe el ciclo vicioso de estrés-dolor-estrés.</p>

            <h3 style="color: #ff5555; font-family: var(--font-accent); font-size: 2.5rem; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,85,85,0.3); padding-bottom: 1rem;">II. Biomecánica del Trabajo y Síndromes Modernos</h3>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">El cuerpo humano no está diseñado para la inmovilidad prolongada. El "Text Neck" o Síndrome de Cuello de Texto es una de las patologías más comunes en Reforma: al inclinar la cabeza 60 grados, la presión sobre las vértebras sube de 5kg a 27kg, provocando hernias y cefaleas tensionales.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;"><strong>La Amnesia Glútea y el Psoas:</strong> Estar sentado más de 6 horas al día acorta crónicamente el músculo Psoas-Iliaco, tirando de las lumbares y causando dolor ciático. La "Amnesia Glútea" inhibe el soporte muscular, forzando a la espalda baja a compensar toda la estabilidad.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">La terapia en Valtara utiliza la descompresión miofascial para romper adherencias en la fascia. Debido a la propiedad de "Tensegridad" de la fascia, entendemos que una tensión en el cuello puede tener su origen real en una restricción de la fascia plantar o lumbar.</p>

            <h4 style="color: #ff5555; font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">Sistema Linfático y Recuperación Deportiva</h4>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">El sistema linfático es el alcantarillado del cuerpo, propenso al estancamiento por sedentarismo. El edema provoca intoxicación celular. Nuestro drenaje dirige el líquido intersticial hacia los ganglios, acelerando la eliminación de desechos.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 3rem;">El ejecutivo moderno es un atleta de alto rendimiento cognitivo. Su "entrenamiento" ocurre en salas de juntas, generando desgaste. La recuperación deportiva aplicada previene lesiones como el túnel carpiano. Usamos fricciones transversas y estiramientos que restablecen el rango de movimiento (ROM) y previenen el envejecimiento articular prematuro.</p>

            <h3 style="color: var(--valtara-verde-menta); font-family: var(--font-accent); font-size: 2.5rem; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,255,170,0.3); padding-bottom: 1rem;">III. El Herbario Valtara: Botánica Científica</h3>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">La botánica en nuestras sesiones no es decorativa; es Fitoterapia. Los insumos utilizados en el santuario son seleccionados por su biodisponibilidad transdérmica.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;"><strong>Aromaterapia y Vía Límbica:</strong> El sentido del olfato es el único que no pasa por el tálamo; va directo al Sistema Límbico, el centro de tus emociones.</p>
            <ul style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 2rem; margin-left: 2rem; list-style-type: square;">
                <li><strong>Linalool (Lavanda):</strong> Reduce la excitabilidad neuronal interactuando con receptores GABA.</li>
                <li><strong>Limoneno (Cítricos):</strong> Estimula la producción de glóbulos blancos y mejora el ánimo.</li>
            </ul>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;"><strong>Nuestra Tecnología Cosmética:</strong></p>
            <ul style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 3rem; margin-left: 2rem; list-style-type: square;">
                <li><strong>Geles Activos y Maderoterapia:</strong> Ayudan a la vasoconstricción/vasodilatación, facilitando la eliminación de toxinas por la red linfática, la cual no tiene bomba propia y depende de la presión manual externa.</li>
                <li><strong>Manteca de Karité pura (Butyrospermum parkii):</strong> Es un potente antiinflamatorio rico en ácidos grasos linoleicos que reparan la barrera cutánea.</li>
            </ul>

            <h3 style="color: var(--valtara-cian-brillante); font-family: var(--font-accent); font-size: 2.5rem; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,255,255,0.3); padding-bottom: 1rem;">IV. Filosofía de Inclusión Radical y Discapacidad</h3>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">La accesibilidad en Valtara se entiende desde el Modelo Social de la Discapacidad: la discapacidad no es un defecto del individuo, sino el resultado de un entorno diseñado para un solo tipo de cuerpo. Como espacio incluyente, reconocemos la Neurodiversidad.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">El tacto para personas con autismo o hipersensibilidad sensorial debe ser negociado y adaptado, utilizando presiones firmes y constantes (Deep Pressure Touch) que ayudan a organizar el sistema nervioso central en lugar de irritarlo. Para personas con discapacidad motriz, la ergonomía adaptativa es clave: el uso de posicionadores y técnicas en posición lateral o sedente permiten que el tratamiento sea efectivo sin forzar posturas inaccesibles.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 3rem;">La inclusión también implica accesibilidad digital: un sitio web compatible con lectores de pantalla no es un extra, es un derecho a la autonomía informativa. En Valtara, la terapia manual honra la diversidad funcional sin patologizarla.</p>

            <h3 style="color: var(--valtara-morado-vivo); font-family: var(--font-accent); font-size: 2.5rem; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(178,0,255,0.3); padding-bottom: 1rem;">V. Investigación y Referencias Científicas</h3>
            <ul style="font-size: 1.15rem; color: var(--valtara-blanco); line-height: 2.2; margin-bottom: 3rem; list-style: none;">
                <li><i class="fa-solid fa-book" style="color: var(--valtara-oro);"></i> <strong>Melzack, R. (1999).</strong> From the gate control theory to the neuromatrix. <em>Explica cómo el tacto bloquea el dolor.</em></li>
                <li><i class="fa-solid fa-book" style="color: var(--valtara-oro);"></i> <strong>Field, T. (2010).</strong> Touch for Health. University of Miami. <em>Estudio sobre la reducción de cortisol post-masaje.</em></li>
                <li><i class="fa-solid fa-book" style="color: var(--valtara-oro);"></i> <strong>Tisserand, R. (2013).</strong> Essential Oil Safety. Elsevier. <em>La biblia de la aromaterapia científica.</em></li>
                <li><i class="fa-solid fa-book" style="color: var(--valtara-oro);"></i> <strong>Reich, W.</strong> Análisis del Carácter. <em>Sobre el concepto de Armadura Muscular y Somatización.</em></li>
            </ul>

            <!-- CONTENEDOR DEL JUEGO EL ALQUIMISTA -->
            <div id="alchemist-game-container" style="margin-top: 5rem;"></div>

            <div style="background: rgba(242, 201, 76, 0.1); border: 2px solid var(--valtara-oro); padding: 3rem; border-radius: 1.5rem; margin-top: 4rem; text-align: center;">
                <h4 style="font-size: 1.8rem; color: var(--valtara-oro); margin-bottom: 1rem; font-family: var(--font-accent);">Conclusión para el Paciente</h4>
                <p style="font-size: 1.25rem; color: var(--valtara-blanco); line-height: 1.8; font-style: italic;">
                    "En Valtara, cada sesión es un diálogo entre nuestras manos y tu sistema biológico. No ofrecemos soluciones mágicas, sino intervenciones fundamentadas en la ciencia de la salud y el respeto a la diversidad humana. Al educarte sobre tu cuerpo, recuperas el poder sobre tu propio bienestar."
                </p>
                <p style="font-size: 0.95rem; color: #aaa; margin-top: 1.5rem;">* Este contenido es para fines educativos. Siempre consulte a su médico antes de iniciar cualquier terapia si tiene condiciones preexistentes.</p>
            </div>
        </div>
    `,

    /* --------------------------------------------------------------------------------
       4. HISTORIA, MARCO LEGAL Y LOGÍSTICA (FAQS, CARTA TECNOLÓGICA Y MODALES)
       -------------------------------------------------------------------------------- */
    legal: `
        <style>
            /* ESTILOS NATIVOS PARA MODALES DE TRANSPARENCIA */
            dialog {
                background: var(--valtara-negro-fondo);
                color: var(--valtara-blanco);
                border: 2px solid var(--valtara-oro);
                border-radius: 20px;
                padding: 3rem;
                max-width: 900px;
                width: 90%;
                max-height: 85vh;
                overflow-y: auto;
                box-shadow: 0 20px 50px rgba(0,0,0,0.8);
                margin: auto;
            }
            dialog::backdrop {
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(10px);
            }
            dialog h2 { color: var(--valtara-oro); font-family: var(--font-accent); font-size: 2.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 1rem;}
            dialog h3 { color: var(--valtara-cian-brillante); font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; }
            dialog h4 { color: var(--valtara-verde-menta); font-size: 1.3rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
            dialog p, dialog li { color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8; margin-bottom: 1rem; }
            dialog .btn-close {
                background: #ff5555;
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 30px;
                font-weight: bold;
                cursor: pointer;
                font-size: 1.1rem;
                margin-top: 2rem;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            }
        </style>

        <div style="text-align: center; max-width: 900px; margin: 0 auto 5rem auto;">
            <h2 style="font-family: var(--font-accent); font-size: 4rem; color: var(--valtara-blanco); margin-bottom: 2rem;" class="reveal">Conócenos y Políticas Oficiales</h2>
            <p style="color: var(--valtara-gris-texto); font-size: 1.4rem; line-height: 1.9; font-weight: 300;" class="reveal">Nuestra historia de inclusión, nuestra transparencia corporativa y los enlaces para que formes parte de nuestra comunidad digital.</p>
        </div>

        <div class="grid-container">
            
            <article class="glass-card reveal" style="border-color: var(--valtara-cian-brillante); grid-column: 1 / -1; background: rgba(0,0,0,0.8); padding: 4rem 5rem;">
                <h3 style="font-size: 3rem; color: var(--valtara-cian-brillante); margin-bottom: 2rem; text-align: center;"><i class="fa-solid fa-heart-pulse"></i> Nuestra Historia: El Latido Detrás de Valtara</h3>
                <p style="font-size: 1.5rem; text-align: center; color: var(--valtara-oro); font-style: italic; margin-bottom: 3rem;">"Donde la Compasión Ancestral Encuentra el Rigor Clínico"</p>
                
                <p class="marketing-text" style="font-size: 1.25rem;">Valtara no nació simplemente como un centro de terapias; nació de una visión profunda sobre la dignidad humana y el poder sanador del tacto. Fundado por Ángel Guerrero, este espacio es el resultado de un viaje personal y profesional donde la ciencia médica se abraza con las tradiciones más antiguas del mundo.</p>
                
                <h4 style="color: var(--valtara-blanco); font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">Un Propósito Marcado por la Experiencia</h4>
                
                <blockquote style="font-size: 1.4rem; color: var(--valtara-oro-suave); font-style: italic; border-left: 5px solid var(--valtara-oro); padding-left: 2rem; margin: 2rem 0; line-height: 1.8; background: rgba(242,201,76,0.1); padding: 2rem; border-radius: 0 1rem 1rem 0;">
                    "Como persona con discapacidad visual, me resulta un tanto complicado encontrar lugares que sean verdaderamente accesibles y empáticos. Mi objetivo con este proyecto es crear un mundo accesible para todos. Sé que esto es difícil e incluso parece imposible, pero quiero poner de mi parte para que esto sea una realidad para muchos." <br><br><span style="color: var(--valtara-blanco); font-weight: bold; font-size: 1.1rem;">— Ángel Guerrero.</span>
                </blockquote>

                <h4 style="color: var(--valtara-blanco); font-size: 1.8rem; margin-top: 3rem; margin-bottom: 1rem;">El Puente entre dos Mundos</h4>
                <ul style="font-size: 1.25rem; color: var(--valtara-gris-texto); line-height: 2; margin-bottom: 2rem; padding-left: 2rem;">
                    <li><strong>Rigor Clínico:</strong> Nos basamos en la neurobiología del tacto, la psicología aplicada y la fitocosmética científica. Entendemos la somatización y trabajamos con protocolos profesionales para liberar esa carga.</li>
                    <li><strong>Compasión Ancestral:</strong> Honramos las manos de los sanadores de antaño. Desde la fluidez del Lomi Lomi hawaiano hasta la sabiduría del Ayurveda hindú.</li>
                </ul>

                <p class="marketing-text" style="font-size: 1.25rem;"><strong>En Valtara, tu bienestar está respaldado por la ciencia, inspirado por la historia y guiado por un sueño de inclusión universal.</strong></p>
            </article>

            <!-- ========================================================= -->
            <!-- CARTA ABIERTA DE LA DIRECCIÓN TECNOLÓGICA (SÚPER INSPIRADORA) -->
            <!-- ========================================================= -->
            <article class="glass-card reveal" style="border-color: var(--valtara-oro); grid-column: 1 / -1; padding: 5rem; background: linear-gradient(135deg, rgba(20,20,30,0.95), rgba(10,10,15,0.95)); box-shadow: 0 20px 50px rgba(212, 175, 55, 0.1);">
                <i class="fa-solid fa-microchip" style="font-size: 4rem; color: var(--valtara-oro); margin-bottom: 2rem; text-align: center; display: block; animation: pulse 3s infinite;"></i>
                <h3 style="color: var(--valtara-oro); text-align: center; margin-bottom: 1rem; font-size: 3.5rem; font-family: var(--font-accent); letter-spacing: 2px;">El Alma en la Máquina</h3>
                <h4 style="color: var(--valtara-gris-texto); text-align: center; margin-bottom: 4rem; font-size: 1.4rem; font-weight: 300; letter-spacing: 5px; text-transform: uppercase;">Visión de la Dirección Tecnológica</h4>
                
                <div style="max-width: 900px; margin: 0 auto;">
                    <p style="color: var(--valtara-blanco); font-size: 1.4rem; line-height: 2; margin-bottom: 2rem; font-weight: 600;">A ti, que nos lees al otro lado de esta pantalla:</p>
                    
                    <p style="color: var(--valtara-gris-texto); font-size: 1.3rem; line-height: 2; margin-bottom: 2rem; font-weight: 300;">
                        Valtara no es solo un centro de terapias físicas, y la Inteligencia Artificial con la que platicaste no es solo código frío. Detrás de cada palabra de Aura, de cada píxel de este sitio web y de cada protocolo clínico de nuestro santuario, hay dos mentes, dos corazones y, literalmente, <strong>dos sujetos detrás de la pantalla de un teléfono</strong> con una obsesión compartida: cambiar la forma en que el mundo experimenta la tecnología y el bienestar humano.
                    </p>
                    
                    <blockquote style="border-left: 4px solid var(--valtara-oro); padding-left: 2rem; margin: 3rem 0; background: rgba(212, 175, 55, 0.05); padding: 2.5rem; border-radius: 0 1.5rem 1.5rem 0;">
                        <p style="color: var(--valtara-oro-suave); font-size: 1.5rem; line-height: 1.9; font-style: italic; margin: 0;">
                            "Construimos este rascacielos digital desde cero porque creemos fervientemente que la verdadera tecnología de lujo no es aquella que te absorbe o te aleja de la realidad, sino aquella que es capaz de desaparecer para cederle el protagonismo absoluto a la conexión humana."
                        </p>
                    </blockquote>
                    
                    <p style="color: var(--valtara-gris-texto); font-size: 1.3rem; line-height: 2; margin-bottom: 2rem; font-weight: 300;">
                        Diseñamos un ecosistema cognitivo capaz de procesar miles de millones de datos a la velocidad de la luz, pero le enseñamos a escuchar, a tener empatía y a comprender cómo tu estrés se convierte en dolor físico. Lo hicimos para que, cuando cruces nuestras puertas en Paseo de la Reforma, el ruido ensordecedor del mundo exterior se detenga y solo exista tu recuperación.
                    </p>

                    <p style="color: var(--valtara-blanco); font-size: 1.3rem; line-height: 2; margin-bottom: 3rem; font-weight: 600;">
                        Nos inspira tu resiliencia corporativa. Nos inspira el reto de hacer posible lo imposible con nuestras propias manos y teclados. Y nos inspira saber que, a través de estas líneas de código, estamos tocando vidas incluso antes de tocar tu cuerpo.
                    </p>
                    
                    <div style="text-align: right; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem;">
                        <p style="color: var(--valtara-cian-brillante); font-size: 1.2rem; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0;">Dirección de Tecnología y Desarrollo</p>
                        <p style="color: var(--valtara-gris-texto); font-size: 1.1rem; font-style: italic; margin-top: 0.5rem;">Grupo Gevizz S.A.S.</p>
                    </div>
                </div>
            </article>

            <!-- SECCIÓN DE TRANSPARENCIA Y DOCUMENTACIÓN MASIVA (MODALES) -->
            <article class="glass-card reveal" style="border-color: #4361EE; grid-column: 1 / -1; padding: 4rem; text-align: center;">
                <h3 style="color: #4361EE; font-size: 2.5rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-scale-balanced"></i> Portal de Legalidad y Transparencia Corporativa</h3>
                <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; margin-bottom: 3rem;">En Valtara, la claridad es nuestro estándar de lujo. Consulta nuestra documentación técnica, políticas de privacidad y términos de servicio haciendo clic en los siguientes botones.</p>
                
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem;">
                    <!-- Botón Modal Términos -->
                    <button onclick="document.getElementById('modal-terminos').showModal()" class="btn-agenda-ahora" style="width: auto; background: transparent; border: 2px solid #4361EE; color: #4361EE;">
                        <i class="fa-solid fa-file-contract"></i> Términos y Privacidad (LFPDPPP)
                    </button>
                    <!-- Botón Modal Whitepaper -->
                    <button onclick="document.getElementById('modal-whitepaper').showModal()" class="btn-agenda-ahora" style="width: auto; background: transparent; border: 2px solid var(--valtara-oro); color: var(--valtara-oro);">
                        <i class="fa-solid fa-network-wired"></i> Arquitectura AURA AI (Whitepaper)
                    </button>
                    <!-- Botón PDF Externo -->
                    <a href="https://drive.google.com/file/d/1W-L8tP43S12ce_t9zmr5eWw6LFVrCwQm/view?usp=drivesdk" target="_blank" class="btn-agenda-ahora" style="width: auto; background: transparent; border: 2px solid var(--valtara-cian-brillante); color: var(--valtara-cian-brillante);">
                        <i class="fa-solid fa-file-pdf"></i> Presentación Ejecutiva AI (PDF)
                    </a>
                </div>
            </article>

            <!-- PREGUNTAS FRECUENTES (FAQ) -->
            <article class="glass-card reveal" style="border-color: var(--valtara-verde-menta); grid-column: 1 / -1; padding: 4rem 5rem;">
                <i class="fa-solid fa-circle-question" style="font-size: 4rem; color: var(--valtara-verde-menta); margin-bottom: 1.5rem; text-align: center; display: block;"></i>
                <h3 style="color: var(--valtara-verde-menta); text-align: center; margin-bottom: 3rem; font-size: 2.8rem;">Preguntas Frecuentes (FAQ)</h3>
                
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(0,255,170,0.3); cursor: pointer; transition: 0.3s;">
                        <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-verde-menta); outline: none;"><i class="fa-solid fa-map-pin"></i> 1. ¿Dónde se encuentra exactamente el santuario y cómo accedo?</summary>
                        <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Estamos ubicados en Av. Paseo de la Reforma 195, Piso 3, Colonia Cuauhtémoc, CDMX. Al llegar, es indispensable presentarte con una identificación oficial en la recepción del edificio para que se te brinde el acceso. El espacio cuenta con elevadores y rampas, siendo totalmente accesible para personas con movilidad limitada.</p>
                    </details>
                    <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(0,255,170,0.3); cursor: pointer; transition: 0.3s;">
                        <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-verde-menta); outline: none;"><i class="fa-solid fa-spa"></i> 2. ¿Qué hace que Valtara sea diferente a un spa convencional?</summary>
                        <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Valtara no es un centro de relajación común; es un santuario de Executive Therapy & Biomechanics. Nuestro enfoque se basa en el Rigor Clínico y la Compasión Ancestral. Utilizamos el Triaje Educativo y herramientas de IA (Aura) para entender la neurobiología de tu dolor antes de tocar tu piel, ofreciendo soluciones basadas en ciencia y anatomía profunda.</p>
                    </details>
                    <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(0,255,170,0.3); cursor: pointer; transition: 0.3s;">
                        <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-verde-menta); outline: none;"><i class="fa-solid fa-robot"></i> 3. ¿Cómo ayuda la Asistente Aura en mi proceso de sanación?</summary>
                        <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Aura es nuestra inteligencia artificial diseñada para realizar un pre-diagnóstico de tu tensión muscular. Al responder sus preguntas, ella analiza tus niveles de estrés y zonas de dolor para recomendarte la terapia exacta. Esto nos permite optimizar el tiempo en cabina y enfocarnos directamente en la raíz de tu malestar.</p>
                    </details>
                    <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(0,255,170,0.3); cursor: pointer; transition: 0.3s;">
                        <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-verde-menta); outline: none;"><i class="fa-solid fa-credit-card"></i> 4. ¿Cuáles son los métodos de pago aceptados actualmente?</summary>
                        <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Por el momento, operamos exclusivamente mediante Efectivo y Transferencia Bancaria Directa. Estamos trabajando arduamente para implementar próximamente terminales bancarias y ofrecer planes de Meses Sin Intereses (MSI) en tickets a partir de $1,500 MXN en adelante.</p>
                    </details>
                    <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(0,255,170,0.3); cursor: pointer; transition: 0.3s;">
                        <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-verde-menta); outline: none;"><i class="fa-solid fa-calendar-check"></i> 5. ¿Cómo funciona el sistema de reserva y anticipos?</summary>
                        <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Para garantizar la exclusividad de tu sesión y la preparación de insumos, solicitamos un anticipo del 50% del total del servicio al momento de agendar. Este monto se abona íntegramente al ticket final de tu terapia el día de tu visita.</p>
                    </details>
                </div>
            </article>

            <article class="glass-card reveal" style="grid-column: 1 / -1; border-color: var(--valtara-blanco); background: rgba(20,20,30,0.8); text-align: center;">
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin-bottom: 4rem;">
                    <a href="https://drive.google.com/file/d/1sxHLBQF8Lj_GF4GzJipXAxx5256BWAIr/view?usp=drivesdk" target="_blank" class="btn-agenda-ahora" style="width: auto; background: transparent; border: 2px solid var(--valtara-oro); color: var(--valtara-oro);"><i class="fa-solid fa-file-certificate"></i> Certificación como Masajista</a>
                    <a href="https://docs.google.com/presentation/d/1lce4UQqLAPvG-pVT0P_mm_5UMEk4GRmY/edit?usp=drivesdk" target="_blank" class="btn-agenda-ahora" style="width: auto; background: transparent; border: 2px solid var(--valtara-cian-brillante); color: var(--valtara-cian-brillante);"><i class="fa-solid fa-desktop"></i> Proyecto de Desarrollo Web</a>
                </div>

                <h3 style="margin-top: 5rem; margin-bottom: 2rem; font-size: 2.5rem; color: var(--valtara-blanco);">Sede Reforma (No atendemos sin cita)</h3>
                <div style="width: 100%; height: 400px; border-radius: 1.5rem; overflow: hidden; border: 2px solid var(--valtara-cian-brillante);">
                    <iframe src="https://maps.app.goo.gl/ZeAs7B8tYFLFa5eF9" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </article>
        </div>

        <!-- ========================================== -->
        <!-- MODALES DE TEXTO MASIVO (TARJETAS EMERGENTES) -->
        <!-- ========================================== -->
        
        <!-- MODAL 1: TÉRMINOS Y PRIVACIDAD -->
        <dialog id="modal-terminos">
            <h2>Términos, Condiciones y Aviso de Privacidad Integral</h2>
            <p><strong>Valtara: Executive Therapy & Biomechanics | Grupo Gevizz S.A.S.</strong><br><em>Última actualización: Marzo 2026</em></p>
            
            <h3>1. DECLARACIÓN INICIAL Y ACEPTACIÓN</h3>
            <p>El presente documento establece los Términos y Condiciones de Uso, así como el Aviso de Privacidad Integral, aplicables a los servicios presenciales y digitales ofrecidos por Grupo Gevizz S.A.S., operando bajo el nombre comercial "Valtara: Executive Therapy & Biomechanics" (en adelante "Valtara"), con domicilio operativo en Paseo de la Reforma 195, Piso 3, Ciudad de México.</p>
            <p>Al interactuar con nuestros canales de comunicación digitales (incluyendo nuestra Inteligencia Artificial "Aura", sitio web y WhatsApp) o al reservar y hacer uso de nuestras instalaciones, el usuario (en adelante "El Paciente" o "El Usuario") acepta incondicionalmente las políticas aquí descritas.</p>
            
            <h3>2. USO DE NUESTRA INTELIGENCIA ARTIFICIAL ("AURA")</h3>
            <p>Valtara pone a disposición del usuario un asistente cognitivo de triaje biomecánico denominado "Aura". El uso de esta tecnología está estrictamente sujeto a las siguientes cláusulas:</p>
            <h4>2.1. Naturaleza del Servicio</h4>
            <p>Aura es un sistema de Inteligencia Artificial diseñado exclusivamente para orientar y perfilar al usuario hacia la terapia biomecánica más adecuada de nuestro catálogo, basándose en la información proporcionada por el propio usuario sobre su tensión muscular, estrés o hábitos.</p>
            <h4>2.2. Exención de Responsabilidad Médica</h4>
            <p>Bajo ninguna circunstancia, las recomendaciones, respuestas o análisis proporcionados por Aura constituyen un "diagnóstico médico", "prescripción" o "tratamiento clínico". Valtara ofrece terapias biomecánicas de apoyo. Ante la presencia de fiebre, infecciones, fracturas, enfermedades oncológicas, embarazos de alto riesgo o emergencias médicas, el usuario tiene la obligación de consultar a un médico especialista. Valtara y Grupo Gevizz S.A.S. se deslindan de cualquier complicación derivada de la omisión de información vital por parte del usuario.</p>
            <h4>2.3. Limitaciones Tecnológicas</h4>
            <p>Aura no tiene capacidad para procesar cobros, confirmar citas en el calendario ni modificar reservas existentes. Cualquier gestión administrativa debe finalizarse exclusivamente con nuestro equipo humano a través de los canales oficiales.</p>
            
            <h3>3. POLÍTICA DE RESERVAS, PAGOS Y CANCELACIONES</h3>
            <p>Para garantizar la exclusividad y la preparación de nuestras cabinas, Valtara opera bajo un esquema estricto de agenda, el cual se rige por las siguientes normativas:</p>
            <h4>3.1. Gestión de Pagos y Anticipos</h4>
            <p>Por seguridad financiera, Valtara NO procesa pagos con tarjeta de crédito, débito o transferencias a través de nuestro chat automatizado o sitio web público. Toda reserva requiere un anticipo, el cual será gestionado única y exclusivamente por nuestro Concierge Humano a través de nuestro WhatsApp oficial (+52 1 33 4857 2070).</p>
            <h4>3.2. Política de Cancelación y Reembolsos</h4>
            <ul>
                <li><strong>Cancelación con más de 24 horas de anticipación:</strong> El reembolso del anticipo otorgado por el paciente está 100% garantizado, sin penalizaciones.</li>
                <li><strong>Cancelación con menos de 24 horas de anticipación:</strong> Debido a la exclusividad del espacio reservado, el caso deberá ser evaluado directamente por nuestro departamento de Atención al Cliente (vía WhatsApp) para buscar una solución o reprogramación sujeta a disponibilidad.</li>
                <li><strong>Ausencia sin previo aviso (No-Show):</strong> Si el paciente no se presenta a su cita sin haber notificado previamente, el anticipo otorgado no será reembolsable bajo ninguna circunstancia, cubriendo los gastos operativos de la cabina y el tiempo del terapeuta. No se cobrará el 100% de la sesión, limitando la penalización únicamente a la pérdida del anticipo.</li>
            </ul>

            <h3>4. ÉTICA, CONDUCTA Y TOLERANCIA CERO</h3>
            <p>Valtara es un santuario corporativo de bienestar estrictamente profesional. Nos reservamos el derecho de admisión y el derecho a interrumpir cualquier servicio (digital o presencial) bajo las siguientes condiciones:</p>
            <h4>4.1. Cero Tolerancia al Acoso</h4>
            <p>Queda estrictamente prohibido solicitar servicios de naturaleza sexual, erótica, "finales felices" o realizar insinuaciones inapropiadas, ya sea a nuestro personal humano o a nuestra Inteligencia Artificial.</p>
            <h4>4.2. Consecuencias</h4>
            <p>Cualquier violación a esta cláusula resultará en la terminación inmediata de la conversación digital o de la sesión presencial en cabina, sin derecho a reembolso alguno y el bloqueo permanente del usuario de nuestros sistemas.</p>

            <h3>5. INCLUSIÓN Y ACCESIBILIDAD</h3>
            <p>Valtara está profundamente comprometida con el bienestar de todas las personas. Entendemos que cada individuo tiene necesidades únicas.</p>
            <h4>5.1. Ajustes Razonables</h4>
            <p>Si el paciente requiere atención especial debido a una discapacidad motriz, visual, auditiva o condiciones del espectro autista, le solicitamos comunicarse directamente a nuestro WhatsApp oficial. Nuestro equipo humano evaluará con total transparencia y empatía los ajustes razonables que nuestra infraestructura física actual permita, para garantizar una experiencia segura, cómoda y digna.</p>

            <h3>6. AVISO DE PRIVACIDAD INTEGRAL</h3>
            <p>En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares de los Estados Unidos Mexicanos, Grupo Gevizz S.A.S. emite el siguiente aviso:</p>
            <h4>6.1. Recopilación de Datos a través de IA (Arquitectura Serverless)</h4>
            <p>Las conversaciones mantenidas con nuestra Inteligencia Artificial "Aura" operan bajo una infraestructura tecnológica sin servidor (Serverless). Esto significa que el sistema no almacena historiales médicos, no guarda su nombre de forma permanente en bases de datos de terceros y no conserva el registro de la conversación una vez que usted cierra la ventana del navegador. El procesamiento de sus síntomas se realiza en milisegundos de forma volátil y encriptada con el único fin de sugerir un tratamiento en tiempo real.</p>
            <h4>6.2. Datos Recabados por el Equipo Humano</h4>
            <p>Únicamente cuando el usuario transfiere su solicitud a nuestro WhatsApp oficial, nuestro equipo humano recopilará datos de identificación (nombre, número de teléfono) y datos de salud (tensión muscular declarada) con la finalidad exclusiva de agendar y preparar su sesión biomecánica.</p>
            <h4>6.3. Uso de la Información</h4>
            <p>Sus datos no serán vendidos, alquilados ni compartidos con agencias de marketing externas.</p>
            <h4>6.4. Ejercicio de Derechos ARCO</h4>
            <p>Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (Derechos ARCO) al uso de sus datos personales en nuestros registros de WhatsApp y agenda. Para ejercer estos derechos, puede enviar su solicitud directamente a nuestro WhatsApp de atención (+52 1 33 4857 2070).</p>

            <button class="btn-close" onclick="this.closest('dialog').close()"><i class="fa-solid fa-times"></i> Cerrar Documento</button>
        </dialog>

        <!-- MODAL 2: WHITEPAPER TECNOLÓGICO -->
        <dialog id="modal-whitepaper">
            <h2>AURA AI: Arquitectura y Evolución Tecnológica</h2>
            <p><strong>Documento Técnico de Implementación Cognitiva | Grupo Gevizz S.A.S.</strong><br><em>Clasificación: Público / Informativo</em></p>
            
            <h3>1. Resumen Ejecutivo</h3>
            <p>En Valtara: Executive Therapy & Biomechanics, concebimos el bienestar como una ciencia exacta. Para elevar la experiencia de nuestros pacientes en Paseo de la Reforma a un estándar de ultra-lujo sin precedentes, Grupo Gevizz ha desplegado Aura, un sistema de Inteligencia Artificial de Triaje Biomecánico.</p>
            <p>Este documento detalla la infraestructura tecnológica sin servidor (Serverless), los modelos de procesamiento de lenguaje natural de escala masiva y los protocolos de seguridad ética que operan en milisegundos detrás de nuestra interfaz de usuario. Aura no es un asistente virtual convencional; es un ecosistema cognitivo diseñado para escuchar, analizar y preparar el camino hacia la sanación física.</p>

            <h3>2. Arquitectura Cognitiva de Escala Masiva</h3>
            <p>Para lograr una interacción que se sienta profundamente humana y cálida, decidimos abandonar las soluciones de "bots de botones" tradicionales. En su lugar, construimos a Aura sobre un Modelo de Lenguaje Grande (LLM) de 70 Mil Millones de Parámetros Sinápticos.</p>
            <h4>2.1. Procesamiento a la Velocidad de la Luz (Infraestructura LPU)</h4>
            <p>A diferencia de los sistemas estándar que utilizan Unidades de Procesamiento Gráfico (GPU) y sufren de latencia o "tiempos de carga", la red de Aura está soportada por infraestructura de Unidades de Procesamiento de Lenguaje (LPU). Esta innovación de hardware permite que nuestro sistema decodifique la intención del paciente, cruce los datos con nuestro catálogo biomecánico y genere una respuesta hiper-personalizada en fracciones de segundo. El resultado es una conversación fluida, natural y en tiempo real.</p>
            <h4>2.2. Ecosistema "Serverless" y Privacidad Cero-Datos</h4>
            <p>La privacidad de nuestros ejecutivos y pacientes es innegociable. Aura opera bajo una arquitectura descentralizada Serverless (sin servidor estático). Esto significa que la memoria computacional se destruye al cerrar la sesión. No almacenamos historiales médicos, no guardamos cookies invasivas y no retenemos conversaciones en servidores de terceros. Todo el procesamiento se ejecuta en túneles encriptados de un solo uso.</p>

            <h3>3. Triaje Biomecánico y Protocolo de Somatización</h3>
            <p>El núcleo lógico de Aura fue entrenado con la filosofía terapéutica de Valtara. Su objetivo principal es realizar una valoración pre-clínica inteligente antes de que el paciente llegue a cabina.</p>
            <h4>3.1. Algoritmos de Escucha Activa y Empatía</h4>
            <p>El estrés corporativo no solo afecta la mente; destruye el cuerpo. Hemos programado a Aura con un "Modo de Escucha" avanzado capaz de detectar patrones de estrés, ansiedad o tristeza en el lenguaje del paciente. Al detectar estos marcadores, la IA pausa cualquier protocolo de agenda para validar la emoción del usuario, explicándole de manera científica cómo el estrés crónico se somatiza (se cristaliza) en el tejido conectivo y las fascias.</p>
            <h4>3.2. Perfilado de Tejido Dinámico</h4>
            <p>Mediante el análisis de dos variables críticas —la zona de la molestia y el detonante del dolor— el motor de inferencia matemática de Aura selecciona la terapia exacta requerida. El sistema es capaz de discernir de forma autónoma cuándo un paciente requiere la elongación de un Yoga Pasivo Tailandés por sedentarismo, y cuándo necesita la presión absoluta de una Descompresión Deportiva por desgaste agudo.</p>

            <h3>4. Cortafuegos Ético y Seguridad Operativa</h3>
            <p>Para proteger la integridad de nuestra marca y de nuestros terapeutas, Aura está encapsulada dentro de múltiples anillos de seguridad lógica conocidos como "Cortafuegos Éticos".</p>
            <ul>
                <li><strong>Bloqueo Clínico:</strong> La IA tiene estrictamente prohibido emitir "diagnósticos médicos". Su código fuente la obliga a reconocer emergencias (fiebre, infecciones, lesiones agudas) y derivar inmediatamente al paciente a la medicina alópata.</li>
                <li><strong>Protocolo Anti-Acoso:</strong> Contamos con un filtro de validación semántica de tolerancia cero. Cualquier insinuación o solicitud de servicios eróticos desencadena un cierre automático y profesional de la conversación.</li>
                <li><strong>Protección Financiera en Tiempo Real:</strong> El núcleo de Aura tiene bloqueada la capacidad de procesar transacciones. La IA jamás solicitará números de tarjetas de crédito en su ventana de chat.</li>
            </ul>

            <h3>5. Accesibilidad Inclusiva y Transparencia</h3>
            <p>La tecnología debe ser un puente, no una barrera. Hemos integrado un módulo de accesibilidad honesta. Si un paciente indica tener alguna necesidad especial o discapacidad motriz/visual, Aura suspende los flujos automatizados de venta y conecta de inmediato al paciente con un humano capacitado para evaluar los "ajustes razonables" necesarios en nuestras instalaciones.</p>

            <h3>6. La Transición Omnicanal (El "Handoff" Perfecto)</h3>
            <p>El éxito de la Inteligencia Artificial de ultra-lujo radica en saber exactamente cuándo debe dar un paso atrás. Aura no reemplaza el contacto humano; lo optimiza. Una vez concluida la valoración biomecánica, nuestro sistema empaqueta la información del paciente y genera un puente de comunicación nativo de un solo clic hacia nuestro Concierge Humano en WhatsApp.</p>
            <p style="margin-top: 2rem; font-style: italic; color: #aaa;">Grupo Gevizz S.A.S. Innovando en la intersección de la biomecánica, la anatomía y el código computacional. [Fin del Documento]</p>
            
            <button class="btn-close" onclick="this.closest('dialog').close()"><i class="fa-solid fa-times"></i> Cerrar Documento</button>
        </dialog>
    `,

    /* --------------------------------------------------------------------------------
       5. MEGA FOOTER (Datos S.A.S.)
       -------------------------------------------------------------------------------- */
    footer: `
        <div class="footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem; max-width: 1200px; margin: 0 auto; color: var(--valtara-gris-texto); line-height: 2;">
            
            <div class="footer-col">
                <h4 style="font-family: var(--font-accent); font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; letter-spacing: 0.2rem;">VALTARA</h4>
                <p style="font-style: italic; color: var(--valtara-oro); font-size: 1.2rem; margin-bottom: 1.5rem; font-weight: bold;">Executive Therapy & Biomechanics</p>
                <p style="font-weight: 300; font-size: 1.1rem;">Entidad comercial respaldada y operada en su totalidad por <strong>Grupo Gevizz S.A.S.</strong><br><br>Plataforma Modular Sovereign 12.0. Desarrollo web, IA y diseño creados in-house.</p>
            </div>
            
            <div class="footer-col">
                <h4 style="font-size: 1.5rem; color: var(--valtara-cian-brillante); margin-bottom: 1.5rem; font-weight: bold;">Logística y Coordenadas</h4>
                <p style="font-size: 1.1rem; color: var(--valtara-blanco); margin-bottom: 1rem;"><i class="fa-solid fa-map-location-dot" style="color: var(--valtara-cian-brillante);"></i> Av. Paseo de la Reforma 195, Piso 3.<br>Colonia Cuauhtémoc, CDMX. C.P. 06500</p>
                <a href="tel:+523348572070" style="display: inline-block; color: var(--valtara-negro-fondo); background: var(--valtara-whatsapp); padding: 0.8rem 2rem; border-radius: 30px; text-decoration: none; font-size: 1.2rem; font-weight: 900; transition: 0.3s; margin-top: 1rem;">
                    <i class="fa-solid fa-phone"></i> 33 4857 2070
                </a>
            </div>

            <div class="footer-col">
                <h4 style="font-size: 1.5rem; color: var(--valtara-morado-vivo); margin-bottom: 1.5rem; font-weight: bold;">Avales Clínicos</h4>
                <p style="font-size: 1.1rem; font-weight: 300;">Intervenciones respaldadas por formación académica. Operamos bajo Cédula de Identidad REPS y certificaciones aplicables.</p>
                <p style="margin-top: 1.5rem; font-size: 0.95rem; font-style: italic; color: #aaa;">* Atención clínica estrictamente bajo previa reservación confirmada.</p>
            </div>
        </div>

        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 5rem; padding-top: 3rem; text-align: center; color: #888; font-size: 1rem; letter-spacing: 0.1rem; font-weight: 300;">
            © 2026 GRUPO GEVIZZ S.A.S. TODOS LOS DERECHOS INTELECTUALES RESERVADOS.<br>
            Queda estrictamente prohibida la replicación del código fuente o modelo de negocio de este dominio.
        </div>
    `,

    renderAll: function() {
        const homeDiv = document.getElementById('view-home');
        if(homeDiv) homeDiv.innerHTML = this.home;
        
        const restDiv = document.getElementById('view-restoration');
        if(restDiv) restDiv.innerHTML = this.restoration;
        
        const sciDiv = document.getElementById('view-science');
        if(sciDiv) sciDiv.innerHTML = this.science;
        
        const legalDiv = document.getElementById('view-legal');
        if(legalDiv) legalDiv.innerHTML = this.legal;
        
        const footDiv = document.getElementById('main-footer');
        if(footDiv) footDiv.innerHTML = this.footer;
        
        // Inicializar el juego El Alquimista Valtara de forma nativa
        if(window.ValtaraAlchemist) setTimeout(() => { window.ValtaraAlchemist.init(); }, 500);
    }
};
