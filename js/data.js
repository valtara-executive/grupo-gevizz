/**
 * ====================================================================================
 * BLOQUE 4: LA ENCICLOPEDIA VALTARA (DATA & RENDER ENGINE V14.0 - SOVEREIGN EDITION)
 * Integración Dinámica, Manifiesto Épico, Videoteca, Expansión Científica Masiva,
 * Legalidad Corporativa (Grupo Gevizz S.A.S.), Slogan y Mapa de Coordenadas Reparado.
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
                { name: "Aceite de Naranja Dulce", correct: false, reason: "Incorrecto. Excelente para mejorar el estado de ánimo, pero no tiene penetración antiinflamoatoria profunda." }
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
            
            <!-- CONTENEDOR DINÁMICO DE TEXTO POR HORARIO -->
            <p id="hero-dynamic-text" style="color: var(--valtara-gris-texto); font-size: 1.3rem; max-width: 950px; margin: 0 auto 4rem auto; line-height: 2; font-weight: 300;">
                <!-- El texto se inyecta dinámicamente vía JavaScript al renderizar -->
            </p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; max-width: 1100px; margin: 0 auto; text-align: left;">
                <div class="glass-card" style="padding: 2.5rem;">
                    <h3 id="promo1-title" style="font-size: 1.5rem; color: var(--valtara-cian-brillante); margin-bottom: 1.5rem; font-weight: 900;"><i class="fa-solid fa-sun"></i> Privilegio de Temporada</h3>
                    <p id="promo1-text" style="font-size: 1.15rem; color: var(--valtara-gris-texto); font-weight: 300;">Evaluando privilegios en curso para maximizar tu experiencia...</p>
                </div>
                <div class="glass-card" style="padding: 2.5rem;">
                    <h3 id="promo2-title" style="font-size: 1.5rem; color: var(--valtara-oro); margin-bottom: 1.5rem; font-weight: 900;"><i class="fa-solid fa-id-card-clip"></i> Valtara Member Card</h3>
                    <p id="promo2-text" style="font-size: 1.15rem; color: var(--valtara-gris-texto); font-weight: 300;">Calculando beneficios de lealtad y estructuras de recompensa...</p>
                </div>
                <div class="glass-card" style="padding: 2.5rem;">
                    <h3 id="promo3-title" style="font-size: 1.5rem; color: var(--valtara-morado-vivo); margin-bottom: 1.5rem; font-weight: 900;"><i class="fa-solid fa-mug-hot"></i> Ritual del Ocaso</h3>
                    <p id="promo3-text" style="font-size: 1.15rem; color: var(--valtara-gris-texto); font-weight: 300;">Preparando infusiones orgánicas y botánicas post-terapia...</p>
                </div>
            </div>
        </div>

        <!-- ========================================================= -->
        <!-- EXPANSIÓN VIP: ART & NAILS (ESTRICTAMENTE ESTÉTICA Y SPA) -->
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
                        Tu imagen es tu carta de presentación ejecutiva. En Valtara no solo cuidamos la salud biomecánica de tu espalda; completamos tu experiencia a través de nuestra división experta en belleza. Disfruta de un servicio de excelencia, creatividad y precisión enfocado estrictamente en la estética, cuidado e higiene superior de tus manos y pies.
                    </p>
                </div>
                
                <div style="background: rgba(0,0,0,0.6); padding: 3rem; border-radius: 1.5rem; border-left: 5px solid #FFB6C1; box-shadow: inset 0 0 20px rgba(255,182,193,0.05);">
                    <h4 style="color: #FFB6C1; font-size: 1.8rem; margin-bottom: 2rem; font-weight: 800;"><i class="fa-solid fa-envelope-open-text"></i> Te Invitamos a Descubrir:</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; color: var(--valtara-blanco); font-size: 1.25rem; line-height: 2.4;">
                        <li><i class="fa-solid fa-check" style="color: #E1306C; margin-right: 15px; font-size: 1.4rem;"></i> <strong>Manicure de Alta Gama:</strong> Precisión, hidratación y elegancia en cada detalle.</li>
                        <li><i class="fa-solid fa-check" style="color: #E1306C; margin-right: 15px; font-size: 1.4rem;"></i> <strong>Pedicure Estético de Lujo:</strong> Embellecimiento profundo y confort absoluto para tu andar.</li>
                        <li><i class="fa-solid fa-check" style="color: #E1306C; margin-right: 15px; font-size: 1.4rem;"></i> <strong>Mani Spa & Pedi Spa:</strong> Rituales de exfoliación, mascarillas y relajación.</li>
                        <li><i class="fa-solid fa-check" style="color: #E1306C; margin-right: 15px; font-size: 1.4rem;"></i> <strong>Nail Art Design:</strong> Diseños exclusivos, acrílico y vanguardia personalizada.</li>
                    </ul>
                </div>
            </div>

            <div style="margin-top: 4rem; border-top: 1px solid rgba(225, 48, 108, 0.3); padding-top: 3rem; text-align: center; position: relative; z-index: 2;">
                <p style="color: #aaa; font-style: italic; font-size: 1.15rem; margin-bottom: 2.5rem;">* Servicio estético independiente a la clínica biomecánica. La agenda, cotización y atención se realizan directamente con nuestra experta socia a través de sus canales oficiales.</p>
                
                <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                    <a href="https://wa.me/525525248816" target="_blank" class="btn-agenda-ahora" style="width: auto; background: var(--valtara-whatsapp); border-color: var(--valtara-whatsapp); color: #000; box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4); font-size: 1.3rem; padding: 1.2rem 3rem; border-radius: 40px;"><i class="fa-brands fa-whatsapp"></i> Reservar Cita: 55 2524 8816</a>
                    <a href="https://www.instagram.com/art.nails02?igsh=MTk0YnF1aDMwN3gybg==" target="_blank" class="btn-agenda-ahora" style="width: auto; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); border: none; color: white; box-shadow: 0 8px 25px rgba(225, 48, 108, 0.4); font-size: 1.3rem; padding: 1.2rem 3rem; border-radius: 40px;"><i class="fa-brands fa-instagram"></i> Ver Galería en Instagram</a>
                </div>
            </div>
        </div>

        <div class="body-map-container reveal" style="margin-top: 2rem; background: rgba(0,0,0,0.6); border: 2px solid rgba(0, 255, 255, 0.2); border-radius: 2rem; padding: 4rem 3rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 4rem; backdrop-filter: blur(20px); box-shadow: 0 2rem 5rem rgba(0,0,0,0.8);">
            <div>
                <h3 style="font-family: var(--font-accent); color: var(--valtara-cian-brillante); font-size: 3rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-microscope"></i> Triaje Educativo</h3>
                <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; margin-bottom: 3rem; line-height: 1.8;">Haz clic en la zona principal donde sientes estrés. Te educaremos sobre lo que ocurre dentro de tu cuerpo desplegando información profunda y detallada.</p>
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
       3. CIENCIA, BOTÁNICA Y MANIFIESTO ÍNTEGRO (SÚPER EXPANDIDO V14.0)
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

            <!-- ========================================================= -->
            <!-- NUEVA EXPANSIÓN CIENTÍFICA: ELECTRICIDAD Y ACÚSTICA (V14.0)-->
            <!-- ========================================================= -->
            <h3 style="color: #F72585; font-family: var(--font-accent); font-size: 2.5rem; margin-top: 4rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(247, 37, 133, 0.3); padding-bottom: 1rem;">II. La Electricidad del Cuerpo: Tu Red Fascial</h3>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">Imagina tu cuerpo como un edificio ultra-moderno e inteligente. Dentro de tus paredes, no solo hay ladrillos (huesos) y cables (nervios), hay una red de fibra óptica cristalina e ininterrumpida que recubre absolutamente todo: desde tus músculos hasta tus órganos. A este traje de "Hombre Araña" biológico le llamamos la <strong>Fascia</strong>.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">La fascia tiene propiedades piezoeléctricas. Cuando te mueves, generas fricción y una pequeña carga eléctrica que mantiene a esta red hidratada y resbaladiza. Pero cuando te sientas frente a la computadora por 10 horas seguidas y te sometes a estrés financiero, ocurre un "cortocircuito".</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 3rem;">La fascia se deshidrata, se vuelve pegajosa, dura como el plástico y atrapa a tus nervios. Por eso sientes que te quema la espalda. En Valtara, cuando un terapeuta hunde el antebrazo o desliza una copa de maderoterapia con precisión, está generando fricción térmica para volver a "derretir" ese plástico, restaurando la hidratación y permitiendo que la electricidad de la vida vuelva a fluir por tu cuerpo sin dolor.</p>

            <h3 style="color: #4CC9F0; font-family: var(--font-accent); font-size: 2.5rem; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(76, 201, 240, 0.3); padding-bottom: 1rem;">III. La Acústica de la Paz: Frecuencias Sonoras</h3>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">No somos solo materia; somos vibración. Tu cerebro es una antena capaz de sintonizar diferentes frecuencias eléctricas. Cuando estás estresado y enojado, estás atrapado en ondas <strong>Beta altas</strong> (un estado de alerta máximo que drena tu energía). Para descansar de verdad, necesitas bajar el volumen del mundo.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">Aquí es donde entra la ciencia detrás de nuestras Esferas Chinas (Baoding) y los reproductores de atmósfera. Al introducir frecuencias rítmicas suaves y constantes (como el giro metálico armónico de las esferas), el cerebro humano, mediante un fenómeno llamado "Arrastre de Ondas Cerebrales", intenta imitar el ritmo de lo que escucha.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 3rem;">A los 10 minutos de escuchar esta acústica clínica en Valtara, tu cerebro es "hackeado" gentilmente para abandonar el estrés y entrar en <strong>Ondas Alfa</strong> (el estado previo al sueño) e incluso en <strong>Ondas Theta</strong> (el estado de meditación profunda y regeneración celular). Por eso, a veces sientes que flotaste o que el tiempo se detuvo en la cabina. No es magia, es acústica neurológica.</p>

            <h3 style="color: #ff5555; font-family: var(--font-accent); font-size: 2.5rem; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,85,85,0.3); padding-bottom: 1rem;">IV. Biomecánica del Trabajo y Síndromes Modernos</h3>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">El cuerpo humano no está diseñado para la inmovilidad prolongada. El "Text Neck" o Síndrome de Cuello de Texto es una de las patologías más comunes en Reforma: al inclinar la cabeza 60 grados, la presión sobre las vértebras sube de 5kg a 27kg, provocando hernias y cefaleas tensionales.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;"><strong>La Amnesia Glútea y el Psoas:</strong> Estar sentado más de 6 horas al día acorta crónicamente el músculo Psoas-Iliaco, tirando de las lumbares y causando dolor ciático. La "Amnesia Glútea" inhibe el soporte muscular, forzando a la espalda baja a compensar toda la estabilidad.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">La terapia en Valtara utiliza la descompresión miofascial para romper adherencias en la fascia. Debido a la propiedad de "Tensegridad" de la fascia, entendemos que una tensión en el cuello puede tener su origen real en una restricción de la fascia plantar o lumbar.</p>

            <h4 style="color: #ff5555; font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">Sistema Linfático y Recuperación Deportiva</h4>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">El sistema linfático es el alcantarillado del cuerpo, propenso al estancamiento por sedentarismo. El edema provoca intoxicación celular. Nuestro drenaje dirige el líquido intersticial hacia los ganglios, acelerando la eliminación de desechos.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 3rem;">El ejecutivo moderno es un atleta de alto rendimiento cognitivo. Su "entrenamiento" ocurre en salas de juntas, generando desgaste. La recuperación deportiva aplicada previene lesiones como el túnel carpiano. Usamos fricciones transversas y estiramientos que restablecen el rango de movimiento (ROM) y previenen el envejecimiento articular prematuro.</p>

            <h3 style="color: var(--valtara-verde-menta); font-family: var(--font-accent); font-size: 2.5rem; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,255,170,0.3); padding-bottom: 1rem;">V. El Herbario Valtara: Botánica Científica</h3>
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

            <h3 style="color: var(--valtara-cian-brillante); font-family: var(--font-accent); font-size: 2.5rem; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,255,255,0.3); padding-bottom: 1rem;">VI. Filosofía de Inclusión Radical y Discapacidad</h3>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">La accesibilidad en Valtara se entiende desde el Modelo Social de la Discapacidad: la discapacidad no es un defecto del individuo, sino el resultado de un entorno diseñado para un solo tipo de cuerpo. Como espacio incluyente, reconocemos la Neurodiversidad.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 1.5rem;">El tacto para personas con autismo o hipersensibilidad sensorial debe ser negociado y adaptado, utilizando presiones firmes y constantes (Deep Pressure Touch) que ayudan a organizar el sistema nervioso central en lugar de irritarlo. Para personas con discapacidad motriz, la ergonomía adaptativa es clave: el uso de posicionadores y técnicas en posición lateral o sedente permiten que el tratamiento sea efectivo sin forzar posturas inaccesibles.</p>
            <p style="font-size: 1.15rem; color: var(--valtara-gris-texto); line-height: 1.9; margin-bottom: 3rem;">La inclusión también implica accesibilidad digital: un sitio web compatible con lectores de pantalla no es un extra, es un derecho a la autonomía informativa. En Valtara, la terapia manual honra la diversidad funcional sin patologizarla.</p>

            <h3 style="color: var(--valtara-morado-vivo); font-family: var(--font-accent); font-size: 2.5rem; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(178,0,255,0.3); padding-bottom: 1rem;">VII. Investigación y Referencias Científicas</h3>
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
       4. HISTORIA, MARCO LEGAL Y LOGÍSTICA (FAQS, MANIFIESTO TECNOLÓGICO Y MODALES)
       -------------------------------------------------------------------------------- */
    legal: `
        <style>
            /* ESTILOS NATIVOS PARA MODALES DE TRANSPARENCIA Y MANIFIESTO */
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
            <!-- MANIFIESTO ÉPICO DE LA DIRECCIÓN TECNOLÓGICA (SÚPER EXPANDIDO) -->
            <!-- ========================================================= -->
            <article id="manifiesto-tech-target" class="glass-card reveal" style="border-color: var(--valtara-oro); grid-column: 1 / -1; padding: 6rem; background: linear-gradient(135deg, rgba(20,20,30,0.98), rgba(5,5,10,0.98)); box-shadow: 0 25px 60px rgba(212, 175, 55, 0.15);">
                <div style="text-align: center; margin-bottom: 4rem;">
                    <i class="fa-solid fa-microchip" style="font-size: 5rem; color: var(--valtara-oro); margin-bottom: 2rem; animation: pulse 3s infinite;"></i>
                    <h3 style="color: var(--valtara-oro); font-size: 4.5rem; font-family: var(--font-accent); letter-spacing: 2px; margin-bottom: 1rem; text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);">El Alma en la Máquina</h3>
                    <h4 style="color: var(--valtara-gris-texto); font-size: 1.5rem; font-weight: 300; letter-spacing: 6px; text-transform: uppercase; border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 2rem; display: inline-block;">Manifiesto de la Dirección Tecnológica y Desarrollo</h4>
                </div>
                
                <div style="max-width: 950px; margin: 0 auto;">
                    <p style="color: var(--valtara-blanco); font-size: 1.6rem; line-height: 2; margin-bottom: 3rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-left: 5px solid var(--valtara-cian-brillante); padding-left: 1.5rem;">A ti, que nos lees al otro lado de esta brillante pantalla:</p>
                    
                    <p style="color: var(--valtara-gris-texto); font-size: 1.35rem; line-height: 2.2; margin-bottom: 2rem; font-weight: 300;">
                        Lo que tienes frente a tus ojos no es solo el sitio web de un centro de terapias físicas. Y la Inteligencia Artificial con la que probablemente acabas de platicar no es un simple y frío algoritmo de respuestas automatizadas diseñado para venderte servicios. 
                    </p>

                    <p style="color: var(--valtara-gris-texto); font-size: 1.35rem; line-height: 2.2; margin-bottom: 2rem; font-weight: 300;">
                        Detrás de cada palabra generada por Aura, detrás de la estructura de cada píxel, de cada motor de accesibilidad que lee este texto en voz alta y detrás de la arquitectura clínica de nuestro santuario en Reforma, hay un esfuerzo monumental. Hay dos mentes, dos corazones y, literalmente, <strong>dos soñadores detrás de la pantalla de un teléfono</strong> con una voluntad inquebrantable y una obsesión compartida: cambiar radicalmente la forma en que el mundo moderno experimenta la tecnología, el lujo y el bienestar humano.
                    </p>

                    <p style="color: var(--valtara-gris-texto); font-size: 1.35rem; line-height: 2.2; margin-bottom: 2rem; font-weight: 300;">
                        Este ecosistema digital masivo no nació en una gigantesca y fría corporación multinacional con presupuestos ilimitados. Nació del sacrificio. Han sido incontables madrugadas de insomnio voluntario, sostenidas por tazas de café y una convicción profunda. Hemos escrito, borrado y reescrito miles y miles de líneas de código hasta rozar la perfección técnica que nuestros pacientes merecen. Enfrentamos servidores colapsados en el extranjero, superamos los límites de procesamiento de la industria actual y derribamos, uno a uno, muros tecnológicos que parecían infranqueables. 
                    </p>

                    <p style="color: var(--valtara-gris-texto); font-size: 1.35rem; line-height: 2.2; margin-bottom: 2rem; font-weight: 300;">
                        Cada error de red crítico, cada "falla de sistema" que la pantalla nos arrojó a las 3 de la mañana en el cuarto de máquinas, no fue una derrota para nosotros; fue el cincel preciso con el que esculpimos los detalles de esta obra maestra de la arquitectura de software y biomecánica.
                    </p>
                    
                    <blockquote style="border-left: 5px solid var(--valtara-oro); padding-left: 3rem; margin: 4rem 0; background: rgba(212, 175, 55, 0.05); padding: 3rem; border-radius: 0 2rem 2rem 0; box-shadow: inset 10px 0 20px -10px rgba(212, 175, 55, 0.2);">
                        <p style="color: var(--valtara-oro-suave); font-size: 1.7rem; line-height: 2.1; font-style: italic; margin: 0; font-weight: 400;">
                            "Construimos este rascacielos digital desde sus cimientos porque creemos fervientemente en algo: la verdadera tecnología de ultra-lujo no es aquella que te absorbe, te distrae o te aleja de tu propia realidad. La tecnología más avanzada, pura y elegante del mundo es aquella que es tan perfecta, tan intuitiva y tan empática que es capaz de desaparecer, cediéndole el protagonismo absoluto a la conexión y compasión humana."
                        </p>
                    </blockquote>
                    
                    <p style="color: var(--valtara-gris-texto); font-size: 1.35rem; line-height: 2.2; margin-bottom: 2rem; font-weight: 300;">
                        Desde el primer día, nos negamos rotundamente a aceptar el estándar frío y apático de la industria. Nos negamos a que nuestra Inteligencia Artificial fuera simplemente un "robot de call center" programado para la transacción o la venta pura. Queríamos que nuestra tecnología tuviera <em>alma</em>. 
                    </p>

                    <p style="color: var(--valtara-gris-texto); font-size: 1.35rem; line-height: 2.2; margin-bottom: 2rem; font-weight: 300;">
                        Le enseñamos al código fuente a comprender el peso del estrés corporativo. Le enseñamos a Aura sobre el luto humano, sobre el tejido conectivo, sobre cómo la tristeza se convierte en un nudo en los hombros. La entrenamos arduamente, mediante instrucciones inmensas, para que logre entender que cuando tú cruzas nuestras puertas y dices "estoy cansado", tu cuerpo en realidad está gritando desesperadamente por oxígeno, por empatía, por descompresión articular y por paz.
                    </p>

                    <p style="color: var(--valtara-blanco); font-size: 1.45rem; line-height: 2.2; margin-bottom: 4rem; font-weight: 600;">
                        Hoy, lo que ves, lo que escuchas y lo que sientes al navegar en esta pantalla es la prueba irrefutable de que con pasión ardiente, resiliencia extrema, horas infinitas de sacrificio y la voluntad inquebrantable de dos personas soñando en grande, se pueden reescribir las reglas del juego. 
                    </p>

                    <p style="color: var(--valtara-blanco); font-size: 1.45rem; line-height: 2.2; margin-bottom: 4rem; font-weight: 600;">
                        Hemos construido un ecosistema "Sovereign" in-house que procesa miles de millones de datos y 70 mil millones de parámetros neurales a la velocidad de la luz, única y exclusivamente para que, cuando estés con nosotros, el tiempo, el estrés y el mundo exterior simplemente se detengan.
                    </p>

                    <p style="color: var(--valtara-oro); font-size: 1.8rem; line-height: 2.2; margin-bottom: 4rem; font-weight: 700; text-align: center; font-style: italic;">
                        Este ecosistema es nuestro legado tecnológico. Es nuestra carta de amor al bienestar humano. Es nuestro regalo para ti. Bienvenido a la evolución. Bienvenido a Valtara.
                    </p>
                    
                    <div style="text-align: right; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 3rem;">
                        <p style="color: var(--valtara-cian-brillante); font-size: 1.4rem; font-weight: 900; letter-spacing: 3px; text-transform: uppercase; margin: 0;">Dirección de Tecnología, Sistemas y Desarrollo</p>
                        <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; font-style: italic; margin-top: 0.8rem; font-weight: 300;">Grupo Gevizz S.A.S.</p>
                    </div>
                </div>
            </article>

            <!-- SECCIÓN DE TRANSPARENCIA Y DOCUMENTACIÓN MASIVA (MODALES PROTEGIDOS POR GRUPO GEVIZZ S.A.S.) -->
            <article class="glass-card reveal" style="border-color: #4361EE; grid-column: 1 / -1; padding: 4rem; text-align: center;">
                <h3 style="color: #4361EE; font-size: 2.5rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-scale-balanced"></i> Portal de Legalidad y Transparencia Corporativa</h3>
                <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; margin-bottom: 3rem;">La claridad es nuestro estándar de lujo. Toda nuestra operación clínica y digital está rigurosamente protegida y administrada por nuestra entidad legal corporativa. Consulta nuestra documentación haciendo clic en los botones.</p>
                
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem;">
                    <!-- Botón Modal Términos S.A.S. -->
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
                        <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Nuestra división comercial no es un centro de relajación común; es un santuario de Executive Therapy & Biomechanics operado por Grupo Gevizz S.A.S. Nuestro enfoque se basa en el Rigor Clínico y la Compasión Ancestral. Utilizamos el Triaje Educativo y herramientas de IA (Aura) para entender la neurobiología de tu dolor antes de tocar tu piel, ofreciendo soluciones basadas en ciencia y anatomía profunda.</p>
                    </details>
                    <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(0,255,170,0.3); cursor: pointer; transition: 0.3s;">
                        <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-verde-menta); outline: none;"><i class="fa-solid fa-robot"></i> 3. ¿Cómo ayuda la Asistente Aura en mi proceso de sanación?</summary>
                        <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Aura es nuestra inteligencia artificial diseñada para realizar un pre-diagnóstico de tu tensión muscular. Al responder sus preguntas, ella analiza tus niveles de estrés y zonas de dolor para recomendarte la terapia exacta. Esto nos permite optimizar el tiempo en cabina y enfocarnos directamente en la raíz de tu malestar.</p>
                    </details>
                    <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(0,255,170,0.3); cursor: pointer; transition: 0.3s;">
                        <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-verde-menta); outline: none;"><i class="fa-solid fa-credit-card"></i> 4. ¿Cuáles son los métodos de pago aceptados actualmente?</summary>
                        <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Por el momento, operamos exclusivamente mediante Efectivo y Transferencia Bancaria Directa a nombre de Grupo Gevizz S.A.S. Estamos trabajando arduamente para implementar próximamente terminales bancarias y ofrecer planes de Meses Sin Intereses (MSI) en tickets a partir de $1,500 MXN en adelante.</p>
                    </details>
                    <details style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(0,255,170,0.3); cursor: pointer; transition: 0.3s;">
                        <summary style="font-weight: 900; font-size: 1.25rem; color: var(--valtara-verde-menta); outline: none;"><i class="fa-solid fa-calendar-check"></i> 5. ¿Cómo funciona el sistema de reserva y anticipos?</summary>
                        <p style="margin-top: 1.5rem; color: var(--valtara-gris-texto); font-size: 1.15rem; line-height: 1.8;">Para garantizar la exclusividad de tu sesión y la preparación de insumos, solicitamos un anticipo del 50% del total del servicio al momento de agendar. Este monto se abona íntegramente al ticket final de tu terapia el día de tu visita.</p>
                    </details>
                </div>
            </article>

            <!-- ========================================================= -->
            <!-- EL MAPA REPARADO DE GOOGLE MAPS (IFRAME OFICIAL)          -->
            <!-- ========================================================= -->
            <article class="glass-card reveal" style="grid-column: 1 / -1; border-color: var(--valtara-blanco); background: rgba(20,20,30,0.8); text-align: center;">
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin-bottom: 4rem;">
                    <a href="https://drive.google.com/file/d/1sxHLBQF8Lj_GF4GzJipXAxx5256BWAIr/view?usp=drivesdk" target="_blank" class="btn-agenda-ahora" style="width: auto; background: transparent; border: 2px solid var(--valtara-oro); color: var(--valtara-oro);"><i class="fa-solid fa-file-certificate"></i> Certificación como Masajista</a>
                    <a href="https://docs.google.com/presentation/d/1lce4UQqLAPvG-pVT0P_mm_5UMEk4GRmY/edit?usp=drivesdk" target="_blank" class="btn-agenda-ahora" style="width: auto; background: transparent; border: 2px solid var(--valtara-cian-brillante); color: var(--valtara-cian-brillante);"><i class="fa-solid fa-desktop"></i> Proyecto de Desarrollo Web</a>
                </div>

                <h3 style="margin-top: 5rem; margin-bottom: 2rem; font-size: 2.5rem; color: var(--valtara-blanco);">Sede Reforma (Atención Exclusiva Bajo Cita)</h3>
                
                <!-- IFRAME REPARADO APUNTANDO A PASEO DE LA REFORMA 195 -->
                <div style="width: 100%; height: 450px; border-radius: 1.5rem; overflow: hidden; border: 2px solid var(--valtara-cian-brillante); box-shadow: 0 15px 30px rgba(0, 255, 255, 0.1);">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661747805234!2d-99.16431988457002!3d19.432600986884063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8cd5b0c9f11%3A0x9597bb9cfb18bc89!2sAv.%20Paseo%20de%20la%20Reforma%20195%2C%20Renacimiento%2C%20Cuauht%C3%A9moc%2C%2006500%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1sen!2smx!4v1680000000000!5m2!1sen!2smx" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </article>
        </div>

        <!-- ========================================== -->
        <!-- MODALES LEGALES (CON PROTECCIÓN S.A.S. ESTRICTA) -->
        <!-- ========================================== -->
        
        <!-- MODAL 1: TÉRMINOS Y PRIVACIDAD S.A.S. -->
        <dialog id="modal-terminos">
            <h2>Términos, Condiciones y Aviso de Privacidad Integral</h2>
            <p style="color: var(--valtara-oro); font-size: 1.2rem; font-weight: bold; margin-bottom: 2rem;">Documento Oficial Operado por GRUPO GEVIZZ S.A.S.<br><span style="color: #aaa; font-weight: 300; font-size: 1rem;">Última actualización: Marzo 2026</span></p>
            
            <h3>1. DECLARACIÓN INICIAL Y RESPONSABILIDAD JURÍDICA</h3>
            <p>El presente documento de carácter legal establece los Términos y Condiciones de Uso de la plataforma digital, así como el Aviso de Privacidad Integral aplicable a cualquier servicio presencial o de desarrollo tecnológico ofertado. La responsabilidad civil, comercial y legal de todas las operaciones, cobros y administración de datos recae única y exclusivamente sobre la entidad legal denominada <strong>Grupo Gevizz S.A.S.</strong>.</p>
            <p>El uso del nombre comercial o branding para la división de biomecánica no deslinda, ni sustituye, la personalidad jurídica de Grupo Gevizz S.A.S. Al interactuar con nuestros canales de comunicación digitales (incluyendo nuestra Inteligencia Artificial "Aura", sitio web y WhatsApp) o al reservar nuestros servicios, el usuario (en adelante "El Paciente" o "El Usuario") acepta incondicionalmente sujetarse a las políticas de Grupo Gevizz S.A.S. aquí descritas.</p>
            
            <h3>2. USO DE TECNOLOGÍA COGNITIVA ("AURA AI")</h3>
            <p>Grupo Gevizz S.A.S. pone a disposición del usuario un asistente cognitivo de triaje biomecánico de desarrollo propio. El uso de esta tecnología está sujeto a las siguientes cláusulas limitativas:</p>
            <h4>2.1. Naturaleza del Servicio Tecnológico</h4>
            <p>El sistema "Aura" es una arquitectura de Inteligencia Artificial diseñada exclusivamente para orientar y perfilar al usuario hacia terapias biomecánicas musculares, basándose estrictamente en la información de estrés y tensión proporcionada por el usuario.</p>
            <h4>2.2. Exención de Responsabilidad Médica Absoluta</h4>
            <p>Bajo ninguna circunstancia, las recomendaciones, respuestas de texto o análisis matemáticos proporcionados por nuestro sistema constituyen un "diagnóstico médico", "prescripción" o "tratamiento clínico alópata". Grupo Gevizz S.A.S. ofrece terapias biomecánicas de apoyo muscular. Ante la presencia de fiebre, infecciones, fracturas, enfermedades oncológicas, embarazos de alto riesgo o emergencias médicas, el usuario tiene la obligación indeclinable de consultar a un médico cirujano especialista. <strong>Grupo Gevizz S.A.S.</strong> se deslinda de cualquier complicación de salud derivada de la omisión maliciosa de información vital por parte del usuario al momento del triaje.</p>
            
            <h3>3. POLÍTICA CORPORATIVA DE PAGOS Y CANCELACIONES</h3>
            <p>Para garantizar el rigor logístico de nuestras cabinas, Grupo Gevizz S.A.S. opera bajo el siguiente esquema financiero inquebrantable:</p>
            <h4>3.1. Protección Financiera y Anticipos</h4>
            <p>Por seguridad financiera antifraude, Grupo Gevizz S.A.S. NO procesa cobros ni solicita datos de tarjetas de crédito o débito a través de nuestro chat automatizado o sitio web público. Toda reserva en el santuario requiere un anticipo formal, el cual será gestionado única y exclusivamente por nuestro equipo administrativo humano a través de los canales de comunicación oficiales auditados.</p>
            <h4>3.2. Cláusulas de Cancelación y Reembolso</h4>
            <ul>
                <li><strong>Cancelación Superior a 24 horas:</strong> Si el usuario notifica la cancelación o reprogramación con más de 24 horas de anticipación a su horario reservado, Grupo Gevizz S.A.S. garantiza el reembolso del 100% de su anticipo sin penalizaciones ocultas.</li>
                <li><strong>Cancelación Inferior a 24 horas:</strong> Debido al bloqueo logístico de la agenda, cualquier cancelación dentro del margen de las 24 horas previas a la cita resultará en la retención total del anticipo otorgado como concepto de gastos operativos administrativos de Grupo Gevizz S.A.S.</li>
                <li><strong>No-Show (Ausencia sin Notificación):</strong> Si el usuario no se presenta a su cita pactada, perderá el derecho a cualquier reembolso del anticipo o reprogramación gratuita.</li>
            </ul>

            <h3>4. ÉTICA, CONDUCTA Y TOLERANCIA CERO</h3>
            <p>Las instalaciones administradas por Grupo Gevizz S.A.S. son entornos corporativos estrictamente profesionales. Nos reservamos el derecho de admisión y el derecho a cancelar unilateralmente la prestación de cualquier servicio bajo las siguientes violaciones:</p>
            <p>Queda estrictamente prohibido, y se considera una falta gravísima, solicitar servicios de naturaleza sexual, erótica, "finales felices" o realizar insinuaciones inapropiadas, ya sea a nuestro personal humano o intentar vulnerar los parámetros éticos de nuestra Inteligencia Artificial. Cualquier violación a esta cláusula resultará en la terminación inmediata del servicio, el cobro total del mismo, la expulsión de las instalaciones y el veto permanente de cualquier entidad afiliada a Grupo Gevizz S.A.S.</p>

            <h3>5. AVISO DE PRIVACIDAD Y DERECHOS ARCO (LFPDPPP)</h3>
            <p>En estricto apego a la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</strong> de los Estados Unidos Mexicanos, <strong>Grupo Gevizz S.A.S.</strong>, como responsable legal del tratamiento de sus datos, le informa:</p>
            <h4>5.1. Tratamiento Volátil de Datos (Arquitectura Serverless)</h4>
            <p>Las conversaciones mantenidas en esta plataforma digital operan bajo una infraestructura "Serverless" (Sin Servidor). Esto garantiza que Grupo Gevizz S.A.S. no almacena historiales de chat, no guarda sus síntomas ni retiene su dirección IP en bases de datos a largo plazo. El procesamiento de información lingüística es volátil, encriptado en tránsito y se destruye irreversiblemente al cerrar su navegador.</p>
            <h4>5.2. Uso de Datos Administrativos y Derechos ARCO</h4>
            <p>Únicamente al concretar una reserva a través de canales directos (WhatsApp), Grupo Gevizz S.A.S. recabará datos mínimos de identificación (nombre y número telefónico) para fines estrictamente logísticos y de facturación. Sus datos no serán vulnerados, vendidos ni transferidos a agencias de marketing de terceros en ningún momento.</p>
            <p>Usted conserva el derecho inalienable de Acceder, Rectificar, Cancelar u Oponerse (Derechos ARCO) al tratamiento de su información. Para ejercer este derecho legal, dirija su solicitud expresa a la administración de Grupo Gevizz S.A.S. a través del número oficial (+52 1 33 4857 2070).</p>

            <button class="btn-close" onclick="this.closest('dialog').close()"><i class="fa-solid fa-times"></i> Cerrar y Aceptar</button>
        </dialog>

        <!-- MODAL 2: WHITEPAPER TECNOLÓGICO -->
        <dialog id="modal-whitepaper">
            <h2>AURA AI: Arquitectura y Evolución Tecnológica</h2>
            <p><strong>Documento Técnico Oficial | Desarrollado In-House por Grupo Gevizz S.A.S.</strong><br><em>Clasificación de Documento: Público / Informativo</em></p>
            
            <h3>1. Resumen Ejecutivo (El Ecosistema Gevizz)</h3>
            <p>En nuestra visión corporativa, concebimos el bienestar como una ciencia exacta respaldada por tecnología de frontera. Para elevar la experiencia de nuestros pacientes a un estándar de ultra-lujo sin precedentes en el mercado latinoamericano, la Dirección Tecnológica de <strong>Grupo Gevizz S.A.S.</strong> ha desarrollado y desplegado "Aura", un sistema soberano de Inteligencia Artificial de Triaje Biomecánico.</p>
            <p>Este documento expone de forma transparente la infraestructura "Serverless" (cero retención de datos), los gigantescos modelos de procesamiento de lenguaje natural subyacentes y los cortafuegos éticos que Grupo Gevizz S.A.S. ha programado desde cero para garantizar que la tecnología sirva como un puente directo a la empatía humana, y no como una barrera fría.</p>

            <h3>2. Arquitectura Cognitiva de Escala Masiva (Sovereign 14.0)</h3>
            <p>Para lograr una interacción que evoque verdadera compasión y calidez humana, el equipo de ingeniería de Grupo Gevizz S.A.S. decidió abandonar desde su concepción las soluciones limitadas de "bots de botones". En su lugar, cimentamos la mente de Aura sobre un Modelo de Lenguaje Grande (LLM) que supera los 70 Mil Millones de Parámetros Sinápticos Virtuales.</p>
            <h4>2.1. Procesamiento Unidades LPU (Cero Latencia)</h4>
            <p>Nuestra infraestructura no utiliza procesadores convencionales. La red neuronal de Aura es impulsada por Unidades de Procesamiento de Lenguaje (LPU) ultrarrápidas, lo que permite decodificar la aflicción del usuario, cruzar los datos clínicos en milisegundos y emitir respuestas empáticas fluidas en tiempo real, garantizando la experiencia ininterrumpida que exige el sector corporativo.</p>

            <h3>3. Triaje Biomecánico y Detección de Somatización</h3>
            <p>El núcleo lógico de la IA fue instruido manualmente por los fundadores de Grupo Gevizz S.A.S. con literatura sobre psicología clínica, neurobiología del dolor y anatomía. Su instrucción primaria es el "Modo de Escucha Activa":</p>
            <p>Aura tiene la capacidad cognitiva para detectar tristeza profunda, niveles críticos de cortisol o ansiedad en el texto del paciente. Al reconocer estas variables, el algoritmo de Grupo Gevizz S.A.S. detiene automáticamente cualquier proceso de venta o sugerencia de catálogo, y procede a validar y acompañar la emoción del paciente, explicándole científicamente cómo la fascia de su cuerpo ha cristalizado (somatizado) ese sufrimiento emocional.</p>

            <h3>4. Cortafuegos Éticos y de Protección (La Muralla Gevizz)</h3>
            <p>Nuestra tecnología protege a la humanidad. Para asegurar la integridad total de la corporación y nuestros terapeutas, Grupo Gevizz S.A.S. encapsuló a la IA en anillos de seguridad inquebrantables:</p>
            <ul>
                <li><strong>Bloqueo Clínico:</strong> La IA tiene orden absoluta de no emitir diagnósticos médicos de ninguna índole.</li>
                <li><strong>Filtro Anti-Vulneración:</strong> Análisis semántico en tiempo real que anula cualquier interacción de índole sexual o de acoso hacia la máquina o el personal de la clínica.</li>
                <li><strong>Cero Transacciones Digitales:</strong> Bloqueo nativo contra el procesamiento de pagos, asegurando que la IA jamás sea utilizada como vector de robo de tarjetas de crédito o phishing.</li>
            </ul>

            <h3>5. Handoff y Conclusión del Ecosistema</h3>
            <p>La filosofía de innovación de <strong>Grupo Gevizz S.A.S.</strong> dicta que el éxito absoluto de la tecnología radica en saber desaparecer. Aura no reemplaza al contacto físico, lo perfecciona. Una vez concluida la contención emocional y la valoración biomecánica, el sistema compila la información y entrega la estafeta logística a nuestro equipo humano, asegurando que la sanación real ocurra en la cabina y bajo nuestras manos.</p>
            <p style="margin-top: 3rem; font-style: italic; color: var(--valtara-oro); text-align: center; font-size: 1.2rem;">
                <strong>Grupo Gevizz S.A.S. — Diseñando el ecosistema donde la tecnología abraza la naturaleza humana.</strong><br>
                <span style="font-size: 0.9rem; color: #888;">[Fin del Documento Técnico]</span>
            </p>
            
            <button class="btn-close" onclick="this.closest('dialog').close()"><i class="fa-solid fa-times"></i> Cerrar Documento</button>
        </dialog>
    `,

    /* --------------------------------------------------------------------------------
       5. MEGA FOOTER CORPORATIVO (Grupo Gevizz S.A.S.)
       -------------------------------------------------------------------------------- */
    footer: `
        <div class="footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem; max-width: 1200px; margin: 0 auto; color: var(--valtara-gris-texto); line-height: 2;">
            
            <div class="footer-col">
                <h4 style="font-family: var(--font-accent); font-size: 2.2rem; color: var(--valtara-blanco); margin-bottom: 1rem; letter-spacing: 0.2rem;">GRUPO GEVIZZ S.A.S.</h4>
                <p style="font-style: italic; color: var(--valtara-oro); font-size: 1.3rem; margin-bottom: 1.5rem; font-weight: bold; line-height: 1.6;">
                    "Diseñando el ecosistema donde la tecnología abraza la naturaleza humana."
                </p>
                <p style="font-weight: 300; font-size: 1.1rem;">
                    Valtara: Executive Therapy & Biomechanics es una marca comercial desarrollada, gestionada y operada en su totalidad por Grupo Gevizz S.A.S.
                </p>
            </div>
            
            <div class="footer-col">
                <h4 style="font-size: 1.5rem; color: var(--valtara-cian-brillante); margin-bottom: 1.5rem; font-weight: bold;">Logística y Coordenadas</h4>
                <p style="font-size: 1.1rem; color: var(--valtara-blanco); margin-bottom: 1rem;"><i class="fa-solid fa-map-location-dot" style="color: var(--valtara-cian-brillante);"></i> Av. Paseo de la Reforma 195, Piso 3.<br>Colonia Cuauhtémoc, CDMX. C.P. 06500</p>
                <a href="tel:+523348572070" style="display: inline-block; color: var(--valtara-negro-fondo); background: var(--valtara-whatsapp); padding: 0.8rem 2rem; border-radius: 30px; text-decoration: none; font-size: 1.2rem; font-weight: 900; transition: 0.3s; margin-top: 1rem;">
                    <i class="fa-solid fa-phone"></i> 33 4857 2070
                </a>
            </div>

            <div class="footer-col">
                <h4 style="font-size: 1.5rem; color: var(--valtara-morado-vivo); margin-bottom: 1.5rem; font-weight: bold;">Plataforma y Avales</h4>
                <p style="font-size: 1.1rem; font-weight: 300;">Arquitectura Sovereign 14.0. Desarrollo web, Inteligencia Artificial Cognitiva y Diseño UX construidos *In-House* por la Dirección Tecnológica de Grupo Gevizz S.A.S.</p>
                <p style="margin-top: 1.5rem; font-size: 0.95rem; font-style: italic; color: #aaa;">* Atención clínica estrictamente bajo previa reservación confirmada.</p>
            </div>
        </div>

        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 5rem; padding-top: 3rem; text-align: center; color: #888; font-size: 1.1rem; letter-spacing: 0.1rem; font-weight: 300;">
            © 2026 GRUPO GEVIZZ S.A.S. TODOS LOS DERECHOS EMPRESARIALES E INTELECTUALES RESERVADOS.<br>
            <span style="font-size: 0.95rem; opacity: 0.7;">Queda estrictamente prohibida y penada por la ley la replicación parcial o total del código fuente, arquitectura AI o modelo logístico de esta plataforma.</span>
        </div>
    `,

    renderAll: function() {
        // 1. RENDERIZAR LA VISTA HOME
        const homeDiv = document.getElementById('view-home');
        if(homeDiv) {
            homeDiv.innerHTML = this.home;
            
            // INYECCIÓN DINÁMICA DE TEXTO INSPIRADOR POR HORARIO
            const heroTextObj = document.getElementById('hero-dynamic-text');
            if(heroTextObj) {
                const hour = new Date().getHours();
                let dynText = "";
                
                if(hour >= 0 && hour < 6) { // Madrugada
                    dynText = "El silencio de la madrugada es el refugio de los grandes visionarios. Mientras la ciudad duerme, tu mente sigue creando. En nuestro santuario, decodificamos esa tensión silenciosa mediante ciencia anatómica profunda. Tu sistema nervioso está a punto de reiniciarse.";
                } else if(hour >= 6 && hour < 12) { // Mañana
                    dynText = "Un nuevo día corporativo comienza. El éxito exige un vehículo biológico capaz de sostenerlo desde la primera luz del sol. En nuestro santuario privado, calibramos tu estructura muscular para que conquistes tu jornada con enfoque y vitalidad absoluta.";
                } else if(hour >= 12 && hour < 15) { // Mediodía
                    dynText = "El mediodía marca el clímax de la exigencia ejecutiva. Es el momento preciso donde el estrés comienza a cristalizarse en tu postura. Haz una pausa estratégica; en Valtara decodificamos esa sobrecarga mediante biomecánica de precisión para devolverte a la cima.";
                } else if(hour >= 15 && hour < 19) { // Tarde
                    dynText = "La tarde avanza y el peso de las decisiones se acumula en tu tejido conectivo. No permitas que la armadura del estrés te limite. En nuestro santuario en Paseo de la Reforma, liberamos las cadenas musculares posteriores para que termines tu día con total ligereza.";
                } else if(hour >= 19 && hour < 21) { // Puesta de sol
                    dynText = "El sol desciende sobre Reforma, marcando el fin de la batalla corporativa. Es hora de hacer la transición. A través de nuestra ciencia anatómica profunda, disolvemos la adrenalina residual de tu jornada y preparamos tu cuerpo para el merecido descanso.";
                } else { // Noche
                    dynText = "La noche envuelve la ciudad y tu mente exige tregua. Es momento de apagar los motores cognitivos y cederle el control a la regeneración. En Valtara, inducimos ondas cerebrales lentas y restauramos tus fibras musculares para asegurar un mañana triunfal.";
                }
                heroTextObj.innerHTML = dynText;
            }
        }
        
        // 2. RENDERIZAR RESTO DE VISTAS
        const restDiv = document.getElementById('view-restoration');
        if(restDiv) restDiv.innerHTML = this.restoration;
        
        const sciDiv = document.getElementById('view-science');
        if(sciDiv) sciDiv.innerHTML = this.science;
        
        const legalDiv = document.getElementById('view-legal');
        if(legalDiv) legalDiv.innerHTML = this.legal;
        
        const footDiv = document.getElementById('main-footer');
        if(footDiv) footDiv.innerHTML = this.footer;
        
        // 3. INICIALIZAR EL JUEGO EL ALQUIMISTA VALTARA DE FORMA NATIVA
        if(window.ValtaraAlchemist) setTimeout(() => { window.ValtaraAlchemist.init(); }, 500);
    }
};
