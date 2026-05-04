const InicioMapaCuerpo = (function() {
    const WHATSAPP_NUMBER = "523348572070"; 

    const aromatherapyOptions = [
        { id: 'lavanda', name: 'Lavanda (Calma Profunda)', desc: 'Ideal para insomnio y estrés agudo.' },
        { id: 'eucalipto', name: 'Eucalipto (Respiración Libre)', desc: 'Despeja la mente y las vías respiratorias.' },
        { id: 'citricos', name: 'Cítricos (Energía Vital)', desc: 'Revitaliza y mejora el estado de ánimo.' },
        { id: 'romero', name: 'Romero (Claridad Mental)', desc: 'Ayuda a la concentración y alivia la fatiga muscular.' },
        { id: 'sin_aroma', name: 'Sin Aroma', desc: 'Prefiero una experiencia neutra.' }
    ];

    const triageData = {
        cabeza_cuello: {
            id: 'cabeza_cuello',
            title: 'Cabeza, Cuello y Hombros',
            icon: '💆‍♀️',
            description: 'El centro de tus pensamientos y la carga del día a día.',
            symptoms: [
                {
                    id: 'tension_alta',
                    label: 'Tensión rígida y estrés acumulado',
                    why: 'El estrés diario, las horas frente a la pantalla y las preocupaciones se acumulan directamente en la base de tu cráneo y trapecios. Tu cuerpo está creando una "armadura" de tensión para protegerte del agotamiento mental.',
                    recommendation: 'Masaje de Relajación Profunda o Terapia de Sonido',
                    whatsapp_base: 'Hola Oasik, siento mucha tensión y rigidez en mi cuello/hombros por el estrés. Me gustaría agendar un masaje relajante para liberar esta carga.'
                },
                {
                    id: 'dolor_cabeza',
                    label: 'Pesadez mental y dolores de cabeza tensionales',
                    why: 'La falta de pausas mentales y la contracción muscular constante en el cuello restringen el flujo de oxígeno a tu cabeza. Tu cuerpo te está pidiendo a gritos que pauses el ruido externo.',
                    recommendation: 'Masaje Craneofacial + Aromaterapia',
                    whatsapp_base: 'Hola Oasik, últimamente tengo pesadez mental y dolores tensionales. Quisiera información sobre un masaje craneofacial para aliviarme.'
                }
            ]
        },
        espalda: {
            id: 'espalda',
            title: 'Espalda (Alta, Media y Baja)',
            icon: '🧘‍♀️',
            description: 'El pilar que sostiene toda tu estructura y emociones.',
            symptoms: [
                {
                    id: 'nudos',
                    label: 'Nudos, contracturas y dolor punzante',
                    why: 'Los "nudos" son fibras musculares que se han quedado contraídas por malas posturas, cargar peso físico o peso emocional. La fascia se deshidrata y pierde su elasticidad natural.',
                    recommendation: 'Masaje Descontracturante Profundo',
                    whatsapp_base: 'Hola Oasik, tengo nudos y contracturas fuertes en la espalda. Necesito agendar un masaje descontracturante, por favor.'
                },
                {
                    id: 'fatiga_lumbar',
                    label: 'Fatiga o cansancio en la espalda baja',
                    why: 'Pasar mucho tiempo sentada o de pie afecta el centro de gravedad de tu cuerpo. La zona lumbar compensa esta falta de equilibrio, sobrecargándose y generando esa sensación de quemazón o fatiga.',
                    recommendation: 'Masaje de Tejido Profundo enfocado en zona Lumbar',
                    whatsapp_base: 'Hola Oasik, siento mucha fatiga y cansancio en mi espalda baja. Me gustaría agendar una sesión para liberar esta zona.'
                }
            ]
        },
        manos_brazos: {
            id: 'manos_brazos',
            title: 'Manos y Brazos',
            icon: '💅',
            description: 'Tus herramientas de conexión, creación y expresión.',
            symptoms: [
                {
                    id: 'manos_secas',
                    label: 'Resequedad, cutículas dañadas o uñas frágiles',
                    why: 'Tus manos están expuestas a químicos, agua y clima todo el día. La fragilidad y resequedad son signos de deshidratación profunda y pérdida de aceites naturales esenciales. Merecen volver a la vida.',
                    recommendation: 'Manicura Spa con Hidratación Profunda (Gelish / Acrílico opcional)',
                    whatsapp_base: 'Hola Oasik, mis manos y uñas necesitan un respiro y mucha hidratación. Quisiera agendar una Manicura Spa.'
                },
                {
                    id: 'tension_brazos',
                    label: 'Tensión en antebrazos y manos cansadas',
                    why: 'El uso constante del teclado, el celular y el trabajo manual tensan los tendones desde el codo hasta la punta de los dedos. Esta tensión silenciosa puede generar inflamación a largo plazo.',
                    recommendation: 'Manicura Oasik + Masaje Reflexológico de Manos',
                    whatsapp_base: 'Hola Oasik, mis manos y brazos se sienten muy cansados por el trabajo. Me gustaría agendar una Manicura que incluya masaje de manos.'
                },
                {
                    id: 'renovacion_unas',
                    label: 'Uñas opacas, retiro de material previo o deseo de un nuevo diseño',
                    why: 'Las uñas crecen y los diseños cumplen su ciclo. Una correcta limpieza, retiro profesional de acrílico o gel y un diseño fresco renuevan no solo tus manos, sino tu actitud hacia el día a día.',
                    recommendation: 'Diseño de Uñas (Acrílico / Gel) + Cuidado de Cutícula',
                    whatsapp_base: 'Hola Oasik, quiero renovar el diseño de mis uñas y darles un cuidado profesional. Me gustaría agendar una cita de Manicura/Diseño.'
                }
            ]
        },
        pies_piernas: {
            id: 'pies_piernas',
            title: 'Piernas y Pies',
            icon: '👣',
            description: 'Tus raíces. Aquellos que soportan todo tu peso.',
            symptoms: [
                {
                    id: 'pies_pesados',
                    label: 'Pesadez, hinchazón y mala circulación',
                    why: 'La gravedad hace que los fluidos se acumulen en tus extremidades inferiores. Si pasas mucho tiempo en una sola postura, el retorno venoso disminuye, creando esa sensación de cargar "bloques de plomo".',
                    recommendation: 'Masaje de Drenaje Linfático / Reflexología Podal',
                    whatsapp_base: 'Hola Oasik, siento mis piernas y pies muy pesados e hinchados. Quisiera agendar un masaje para mejorar mi circulación.'
                },
                {
                    id: 'pies_asparos',
                    label: 'Callosidades, resequedad extrema y uñas descuidadas',
                    why: 'Los pies sufren fricción constante con el calzado. La piel se engrosa como mecanismo de defensa, creando callosidades. Es un área que solemos olvidar hasta que duele o incomoda.',
                    recommendation: 'Pedicura Spa Renovadora Integral',
                    whatsapp_base: 'Hola Oasik, mis pies necesitan cuidado profundo, exfoliación y cariño. Me encantaría agendar una Pedicura Spa.'
                }
            ]
        }
    };

    let state = {
        step: 1,
        zone: null,
        symptom: null,
        aroma: null
    };

    const initStyles = () => {
        if(document.getElementById('oasik-triage-styles')) return;
        const style = document.createElement('style');
        style.id = 'oasik-triage-styles';
        style.innerHTML = `
            #inicio_mapa_cuerpo {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                width: 100%;
                background: linear-gradient(145deg, rgba(17,18,22,1) 0%, rgba(10,10,12,1) 100%);
                color: #e0e0e0;
                padding: 40px 20px;
                box-sizing: border-box;
            }
            .triage-wrapper {
                max-width: 900px;
                margin: 0 auto;
                background: rgba(255,255,255,0.02);
                border: 1px solid rgba(212, 175, 55, 0.15);
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                position: relative;
                min-height: 400px;
            }
            .t-header {
                text-align: center;
                margin-bottom: 30px;
                animation: tFadeIn 0.6s ease;
            }
            .t-header h2 {
                color: #d4af37;
                font-size: 2.2rem;
                margin: 0 0 10px 0;
                font-weight: 300;
                letter-spacing: 2px;
            }
            .t-header p {
                font-size: 1.1rem;
                color: #aaa;
                margin: 0;
            }
            .t-step {
                display: none;
                animation: tSlideUp 0.5s ease forwards;
            }
            .t-step.active {
                display: block;
            }
            .t-grid-zones {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 20px;
            }
            .t-card {
                background: rgba(0,0,0,0.4);
                border: 1px solid rgba(212, 175, 55, 0.1);
                border-radius: 15px;
                padding: 30px 20px;
                text-align: center;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                color: #fff;
            }
            .t-card:hover {
                background: rgba(212, 175, 55, 0.08);
                border-color: #d4af37;
                transform: translateY(-8px);
                box-shadow: 0 10px 20px rgba(212, 175, 55, 0.1);
            }
            .t-card .icon {
                font-size: 3.5rem;
                display: block;
                margin-bottom: 15px;
            }
            .t-card .title {
                font-size: 1.2rem;
                font-weight: 500;
                letter-spacing: 1px;
            }
            .t-list-symptoms {
                display: flex;
                flex-direction: column;
                gap: 15px;
                max-width: 700px;
                margin: 0 auto;
            }
            .t-symptom-btn {
                background: rgba(0,0,0,0.4);
                border: 1px solid rgba(255,255,255,0.05);
                padding: 20px;
                border-radius: 12px;
                text-align: left;
                color: #e0e0e0;
                font-size: 1.15rem;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .t-symptom-btn:hover {
                background: rgba(212, 175, 55, 0.1);
                border-color: rgba(212, 175, 55, 0.5);
                color: #fff;
            }
            .t-symptom-btn::after {
                content: '→';
                color: #d4af37;
                font-size: 1.5rem;
                opacity: 0;
                transform: translateX(-10px);
                transition: all 0.3s;
            }
            .t-symptom-btn:hover::after {
                opacity: 1;
                transform: translateX(0);
            }
            
            .t-aroma-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }
            .t-aroma-card {
                background: rgba(0,0,0,0.3);
                border: 1px solid rgba(255,255,255,0.1);
                padding: 15px;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s;
                text-align: center;
            }
            .t-aroma-card.selected {
                background: rgba(212, 175, 55, 0.2);
                border-color: #d4af37;
            }
            .t-aroma-card h4 {
                color: #fff;
                margin: 0 0 5px 0;
                font-size: 1rem;
            }
            .t-aroma-card p {
                color: #aaa;
                font-size: 0.85rem;
                margin: 0;
            }

            .t-result-card {
                background: linear-gradient(180deg, rgba(212, 175, 55, 0.05) 0%, rgba(0,0,0,0) 100%);
                border-top: 2px solid #d4af37;
                padding: 30px;
                border-radius: 15px;
                text-align: center;
                max-width: 700px;
                margin: 0 auto;
            }
            .t-result-card h3 {
                color: #d4af37;
                font-size: 1.8rem;
                margin: 0 0 20px 0;
                font-weight: 300;
            }
            .t-result-why {
                font-size: 1.2rem;
                line-height: 1.7;
                color: #ccc;
                margin-bottom: 30px;
                font-style: italic;
                position: relative;
            }
            .t-result-why::before, .t-result-why::after {
                content: '"';
                color: rgba(212, 175, 55, 0.3);
                font-size: 2rem;
                line-height: 0;
                position: relative;
                top: 10px;
            }
            .t-recomm-box {
                background: rgba(0,0,0,0.5);
                padding: 20px;
                border-radius: 12px;
                margin-bottom: 30px;
                border: 1px solid rgba(212, 175, 55, 0.2);
            }
            .t-recomm-box strong {
                color: #888;
                display: block;
                margin-bottom: 10px;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            .t-recomm-box span {
                color: #fff;
                font-size: 1.4rem;
                font-weight: 400;
            }
            .t-wa-btn {
                display: inline-flex;
                align-items: center;
                gap: 12px;
                background: #25D366;
                color: #fff;
                text-decoration: none;
                padding: 15px 35px;
                border-radius: 40px;
                font-size: 1.2rem;
                font-weight: bold;
                transition: all 0.3s;
                border: none;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(37, 211, 102, 0.2);
            }
            .t-wa-btn:hover {
                background: #1ebc59;
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
            }
            .t-back-btn {
                background: transparent;
                border: none;
                color: #888;
                cursor: pointer;
                font-size: 1rem;
                margin-bottom: 20px;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                transition: color 0.3s;
                padding: 0;
            }
            .t-back-btn:hover {
                color: #d4af37;
            }
            .t-disclaimer {
                margin-top: 40px;
                padding: 20px;
                background: rgba(0,0,0,0.3);
                border-left: 4px solid #555;
                font-size: 0.9rem;
                line-height: 1.6;
                color: #777;
                border-radius: 0 10px 10px 0;
                text-align: justify;
            }
            .t-disclaimer strong {
                color: #aaa;
            }
            .t-action-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 30px;
                max-width: 700px;
                margin-left: auto;
                margin-right: auto;
            }
            .t-next-btn {
                background: #d4af37;
                color: #000;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
                opacity: 0.5;
                pointer-events: none;
            }
            .t-next-btn.active {
                opacity: 1;
                pointer-events: auto;
            }
            .t-next-btn:hover {
                background: #f0c94a;
                transform: scale(1.05);
            }

            @keyframes tSlideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes tFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @media (max-width: 600px) {
                .triage-wrapper { padding: 20px; }
                .t-header h2 { font-size: 1.8rem; }
                .t-action-row { flex-direction: column; gap: 15px; }
            }
        `;
        document.head.appendChild(style);
    };

    const renderHTML = () => {
        const container = document.getElementById('inicio_mapa_cuerpo');
        if (!container) return;

        let html = `<div class="triage-wrapper">`;

        // STEP 1: Zonas
        html += `
            <div class="t-step ${state.step === 1 ? 'active' : ''}">
                <div class="t-header">
                    <h2>Diagnóstico Sensorial Oasik</h2>
                    <p>Selecciona la zona donde sientes mayor tensión, cansancio o malestar hoy.</p>
                </div>
                <div class="t-grid-zones">
        `;
        for (const [key, data] of Object.entries(triageData)) {
            html += `
                <div class="t-card" onclick="window.InicioMapaCuerpoAPI.setZone('${key}')">
                    <span class="icon">${data.icon}</span>
                    <span class="title">${data.title}</span>
                </div>
            `;
        }
        html += `</div></div>`;

        // STEP 2: Síntomas
        if (state.zone) {
            const zone = triageData[state.zone];
            html += `
                <div class="t-step ${state.step === 2 ? 'active' : ''}">
                    <button class="t-back-btn" onclick="window.InicioMapaCuerpoAPI.goBack(1)">← Cambiar de Zona</button>
                    <div class="t-header">
                        <h2>${zone.icon} ${zone.title}</h2>
                        <p>¿Qué afirmación describe mejor tu sensación actual?</p>
                    </div>
                    <div class="t-list-symptoms">
            `;
            zone.symptoms.forEach((symp, index) => {
                html += `
                    <button class="t-symptom-btn" onclick="window.InicioMapaCuerpoAPI.setSymptom(${index})">
                        ${symp.label}
                    </button>
                `;
            });
            html += `</div></div>`;
        }

        // STEP 3: Aromaterapia (Extraer preferencia)
        if (state.zone && state.symptom !== null) {
            html += `
                <div class="t-step ${state.step === 3 ? 'active' : ''}">
                    <button class="t-back-btn" onclick="window.InicioMapaCuerpoAPI.goBack(2)">← Cambiar Síntoma</button>
                    <div class="t-header">
                        <h2>Elige tu Atmósfera</h2>
                        <p>Personaliza tu experiencia seleccionando un aceite esencial para tu sesión.</p>
                    </div>
                    <div class="t-aroma-grid">
            `;
            aromatherapyOptions.forEach(aroma => {
                const isSelected = state.aroma === aroma.name ? 'selected' : '';
                html += `
                    <div class="t-aroma-card ${isSelected}" onclick="window.InicioMapaCuerpoAPI.setAroma('${aroma.name}')">
                        <h4>${aroma.name}</h4>
                        <p>${aroma.desc}</p>
                    </div>
                `;
            });
            html += `
                    </div>
                    <div class="t-action-row">
                        <span></span>
                        <button class="t-next-btn ${state.aroma ? 'active' : ''}" onclick="window.InicioMapaCuerpoAPI.finalize()">Ver mi Ritual Sugerido →</button>
                    </div>
                </div>
            `;
        }

        // STEP 4: Resultado y WhatsApp
        if (state.step === 4) {
            const data = triageData[state.zone].symptoms[state.symptom];
            let finalMsg = data.whatsapp_base;
            if (state.aroma && state.aroma !== 'Sin Aroma') {
                finalMsg += ` Además, me encantaría incluir la aromaterapia de ${state.aroma}.`;
            } else if (state.aroma === 'Sin Aroma') {
                finalMsg += ` Prefiero mi sesión sin aromaterapia, por favor.`;
            }
            
            const encodedMsg = encodeURIComponent(finalMsg);
            const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

            html += `
                <div class="t-step active">
                    <button class="t-back-btn" onclick="window.InicioMapaCuerpoAPI.goBack(3)">← Modificar Aromaterapia</button>
                    <div class="t-result-card">
                        <h3>Descubre el porqué...</h3>
                        <p class="t-result-why">${data.why}</p>
                        
                        <div class="t-recomm-box">
                            <strong>Ritual Oasik Sugerido para ti:</strong>
                            <span>${data.recommendation}</span>
                            ${state.aroma ? `<div style="margin-top:10px; font-size:0.9rem; color:#d4af37;">Atmósfera seleccionada: ${state.aroma}</div>` : ''}
                        </div>

                        <a href="${waLink}" target="_blank" class="t-wa-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                            </svg>
                            Agendar mi Ritual por WhatsApp
                        </a>
                    </div>
                    
                    <div class="t-disclaimer">
                        <strong>Aclaración Importante sobre tu Salud:</strong><br>
                        En Oasik somos especialistas dedicados al bienestar integral, la relajación profunda y el cuidado estético profesional (Manicura, Pedicura, Masajes). 
                        <strong>No somos médicos, fisioterapeutas ni podólogos.</strong> 
                        Nuestros servicios están diseñados para aliviar la tensión diaria, embellecer y relajar. Si presentas dolor crónico, lesiones agudas, infecciones o problemas estructurales, te instamos a consultar primero con un especialista de la salud calificado.
                    </div>
                </div>
            `;
        }

        html += `</div>`;
        container.innerHTML = html;
    };

    window.InicioMapaCuerpoAPI = {
        setZone: (z) => { state.zone = z; state.step = 2; renderHTML(); },
        setSymptom: (s) => { state.symptom = s; state.step = 3; renderHTML(); },
        setAroma: (a) => { state.aroma = a; renderHTML(); },
        finalize: () => { if(state.aroma) { state.step = 4; renderHTML(); } },
        goBack: (step) => { 
            state.step = step; 
            if(step === 1) { state.zone = null; state.symptom = null; state.aroma = null; }
            if(step === 2) { state.symptom = null; state.aroma = null; }
            if(step === 3) { state.aroma = null; }
            renderHTML(); 
        }
    };

    return {
        init: () => {
            initStyles();
            renderHTML();
        }
    };
})();

// Autoejecutar si el contenedor existe
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('inicio_mapa_cuerpo')) {
        InicioMapaCuerpo.init();
    }
});
