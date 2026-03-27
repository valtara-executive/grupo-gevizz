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
            html += `<button class="btn-primary" aria-label="Elegir ${opt.name}" style="background: var(--cristal-fondo); border: 1px solid var(--valtara-oro-suave); font-size: 1.1rem; flex: 1; min-width: 250px;" onclick="window.ValtaraAlchemist.guess('${isCorrect}', \`${opt.reason.replace(/"/g, '"')}\`)"><i class="fa-solid fa-droplet"></i> ${opt.name}</button>`;
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
