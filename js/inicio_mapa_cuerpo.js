/**
 * Oasik - Triaje de Bienestar y Cascada de Información (Reemplazo del Mapa 3D)
 * Este archivo genera una experiencia interactiva para guiar al paciente
 * hacia el servicio ideal (Masajes, Manicura, Pedicura) basándose en cómo se siente.
 */

const InicioMapaCuerpo = (function() {
    // Configuración del número de WhatsApp (Cámbialo por el tuyo)
    const WHATSAPP_NUMBER = "521234567890"; 

    // Datos de la cascada de información (Triaje)
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
                    recommendation: 'Masaje de Relación Profunda o Terapia de Sonido',
                    whatsapp: 'Hola Oasik, siento mucha tensión y rigidez en mi cuello/hombros por el estrés. Me gustaría agendar un masaje relajante para liberar esta carga.'
                },
                {
                    id: 'dolor_cabeza',
                    label: 'Pesadez mental y dolores de cabeza tensionales',
                    why: 'La falta de pausas mentales y la contracción muscular constante en el cuello restringen el flujo de oxígeno a tu cabeza. Tu cuerpo te está pidiendo a gritos que pauses el ruido externo.',
                    recommendation: 'Masaje Craneofacial + Aromaterapia',
                    whatsapp: 'Hola Oasik, últimamente tengo pesadez mental y dolores tensionales. Quisiera información sobre un masaje craneofacial para aliviarme.'
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
                    whatsapp: 'Hola Oasik, tengo nudos y contracturas fuertes en la espalda. Necesito agendar un masaje descontracturante, por favor.'
                },
                {
                    id: 'fatiga_lumbar',
                    label: 'Fatiga o cansancio en la espalda baja',
                    why: 'Pasar mucho tiempo sentada o de pie afecta el centro de gravedad de tu cuerpo. La zona lumbar compensa esta falta de equilibrio, sobrecargándose y generando esa sensación de quemazón o fatiga.',
                    recommendation: 'Masaje de Tejido Profundo enfocado en zona Lumbar',
                    whatsapp: 'Hola Oasik, siento mucha fatiga y cansancio en mi espalda baja. Me gustaría agendar una sesión para liberar esta zona.'
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
                    recommendation: 'Manicura Spa con Hidratación Profunda',
                    whatsapp: 'Hola Oasik, mis manos y uñas necesitan un respiro y mucha hidratación. Quisiera agendar una Manicura Spa.'
                },
                {
                    id: 'tension_brazos',
                    label: 'Tensión en antebrazos y manos cansadas',
                    why: 'El uso constante del teclado, el celular y el trabajo manual tensan los tendones desde el codo hasta la punta de los dedos. Esta tensión silenciosa puede generar inflamación a largo plazo.',
                    recommendation: 'Manicura Oasik + Masaje Reflexológico de Manos',
                    whatsapp: 'Hola Oasik, mis manos y brazos se sienten muy cansados por el trabajo. Me gustaría agendar una Manicura que incluya masaje de manos.'
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
                    recommendation: 'Masaje de Drenaje / Reflexología Podal',
                    whatsapp: 'Hola Oasik, siento mis piernas y pies muy pesados e hinchados. Quisiera agendar un masaje para mejorar mi circulación.'
                },
                {
                    id: 'pies_asparos',
                    label: 'Callosidades, resequedad extrema y uñas descuidadas',
                    why: 'Los pies sufren fricción constante con el calzado. La piel se engrosa como mecanismo de defensa, creando callosidades. Es un área que solemos olvidar hasta que duele o incomoda.',
                    recommendation: 'Pedicura Spa Renovadora',
                    whatsapp: 'Hola Oasik, mis pies necesitan cuidado profundo, exfoliación y cariño. Me encantaría agendar una Pedicura Spa.'
                }
            ]
        }
    };

    // Estado de la aplicación
    let currentStep = 1;
    let selectedZone = null;
    let selectedSymptom = null;

    // Estilos CSS integrados
    const injectStyles = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .triage-container {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem;
                background: linear-gradient(145deg, #1a1c23 0%, #111216 100%);
                color: #e0e0e0;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                overflow: hidden;
                position: relative;
            }
            .triage-header {
                text-align: center;
                margin-bottom: 2rem;
            }
            .triage-header h2 {
                color: #d4af37; /* Dorado Oasik */
                font-size: 2rem;
                margin-bottom: 0.5rem;
                font-weight: 300;
                letter-spacing: 1px;
            }
            .triage-header p {
                font-size: 1rem;
                color: #a0a0a0;
            }
            .triage-step {
                display: none;
                animation: fadeInSlideUp 0.5s ease forwards;
            }
            .triage-step.active {
                display: block;
            }
            .grid-zones {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
            }
            .card-btn {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-radius: 15px;
                padding: 2rem 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
                color: #fff;
            }
            .card-btn:hover {
                background: rgba(212, 175, 55, 0.1);
                border-color: #d4af37;
                transform: translateY(-5px);
            }
            .card-btn .icon {
                font-size: 3rem;
                margin-bottom: 1rem;
                display: block;
            }
            .card-btn .title {
                font-size: 1.1rem;
                font-weight: 500;
            }
            .list-symptoms {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .symptom-btn {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 1.5rem;
                border-radius: 10px;
                text-align: left;
                color: #fff;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .symptom-btn:hover {
                background: rgba(212, 175, 55, 0.15);
                border-color: #d4af37;
            }
            .symptom-btn::after {
                content: '→';
                color: #d4af37;
                font-size: 1.5rem;
            }
            .result-card {
                background: rgba(212, 175, 55, 0.05);
                border: 1px solid rgba(212, 175, 55, 0.3);
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
            }
            .result-card h3 {
                color: #d4af37;
                font-size: 1.5rem;
                margin-bottom: 1.5rem;
            }
            .result-why {
                font-size: 1.1rem;
                line-height: 1.6;
                color: #ccc;
                margin-bottom: 2rem;
                font-style: italic;
            }
            .result-recomm {
                background: rgba(0,0,0,0.3);
                padding: 1.5rem;
                border-radius: 10px;
                margin-bottom: 2rem;
            }
            .result-recomm strong {
                color: #fff;
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            .result-recomm span {
                color: #d4af37;
                font-size: 1.3rem;
                font-weight: bold;
            }
            .whatsapp-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                background: #25D366;
                color: #fff;
                text-decoration: none;
                padding: 1rem 2.5rem;
                border-radius: 30px;
                font-size: 1.2rem;
                font-weight: bold;
                transition: all 0.3s;
                border: none;
                cursor: pointer;
            }
            .whatsapp-btn:hover {
                background: #1ebc59;
                transform: scale(1.05);
                box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
            }
            .back-btn {
                background: transparent;
                border: none;
                color: #a0a0a0;
                cursor: pointer;
                font-size: 1rem;
                margin-bottom: 1.5rem;
                display: inline-flex;
                align-items: center;
                gap: 5px;
                transition: color 0.3s;
            }
            .back-btn:hover {
                color: #d4af37;
            }
            .disclaimer-box {
                margin-top: 3rem;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.02);
                border-left: 3px solid #555;
                font-size: 0.85rem;
                line-height: 1.5;
                color: #888;
                border-radius: 0 10px 10px 0;
            }
            .disclaimer-box strong {
                color: #a0a0a0;
            }
            @keyframes fadeInSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    };

    // Constructores de HTML para cada paso
    const buildStep1 = () => {
        let html = `
            <div class="triage-step ${currentStep === 1 ? 'active' : ''}" id="step-1">
                <div class="triage-header">
                    <h2>Escucha a tu cuerpo</h2>
                    <p>¿En qué zona sientes mayor tensión, cansancio o malestar el día de hoy?</p>
                </div>
                <div class="grid-zones">
        `;
        for (const [key, data] of Object.entries(triageData)) {
            html += `
                <button class="card-btn" onclick="InicioMapaCuerpo.selectZone('${key}')">
                    <span class="icon">${data.icon}</span>
                    <span class="title">${data.title}</span>
                </button>
            `;
        }
        html += `</div></div>`;
        return html;
    };

    const buildStep2 = () => {
        if (!selectedZone) return '';
        const zone = triageData[selectedZone];
        let html = `
            <div class="triage-step ${currentStep === 2 ? 'active' : ''}" id="step-2">
                <button class="back-btn" onclick="InicioMapaCuerpo.goBack(1)">← Volver a zonas</button>
                <div class="triage-header">
                    <h2>${zone.icon} ${zone.title}</h2>
                    <p>Selecciona la afirmación que mejor describa cómo te sientes:</p>
                </div>
                <div class="list-symptoms">
        `;
        zone.symptoms.forEach((symptom, index) => {
            html += `
                <button class="symptom-btn" onclick="InicioMapaCuerpo.selectSymptom(${index})">
                    ${symptom.label}
                </button>
            `;
        });
        html += `</div></div>`;
        return html;
    };

    const buildStep3 = () => {
        if (!selectedZone || selectedSymptom === null) return '';
        const data = triageData[selectedZone].symptoms[selectedSymptom];
        
        // Codificar mensaje para URL de WhatsApp
        const encodedMsg = encodeURIComponent(data.whatsapp);
        const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

        return `
            <div class="triage-step ${currentStep === 3 ? 'active' : ''}" id="step-3">
                <button class="back-btn" onclick="InicioMapaCuerpo.goBack(2)">← Cambiar selección</button>
                
                <div class="result-card">
                    <h3>Descubre el porqué...</h3>
                    <p class="result-why">"${data.why}"</p>
                    
                    <div class="result-recomm">
                        <strong>Nuestra recomendación para ti:</strong>
                        <span>${data.recommendation}</span>
                    </div>

                    <a href="${waLink}" target="_blank" class="whatsapp-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        Agendar por WhatsApp
                    </a>
                </div>
                
                ${buildDisclaimer()}
            </div>
        `;
    };

    const buildDisclaimer = () => {
        return `
            <div class="disclaimer-box">
                <strong>Aclaración Importante sobre tu Salud:</strong><br>
                En Oasik somos especialistas dedicados al bienestar integral, la relajación profunda y el cuidado estético profesional (Manicura, Pedicura, Masajes). 
                <strong>No somos médicos, fisioterapeutas ni podólogos.</strong> 
                Nuestros servicios están diseñados para aliviar la tensión diaria, embellecer y relajar. Si presentas dolor crónico, lesiones agudas, infecciones o problemas estructurales, te instamos a consultar primero con un especialista de la salud calificado.
            </div>
        `;
    };

    const render = () => {
        const container = document.getElementById('oasik-triage-container');
        if (!container) {
            console.error('Contenedor #oasik-triage-container no encontrado.');
            return;
        }
        container.innerHTML = `
            <div class="triage-container">
                ${buildStep1()}
                ${buildStep2()}
                ${buildStep3()}
            </div>
        `;
    };

    // API pública
    return {
        init: function(containerId) {
            // Se asegura de que el contenedor exista o lo crea en el body
            let container = document.getElementById(containerId);
            if (!container) {
                container = document.createElement('div');
                container.id = 'oasik-triage-container';
                document.body.appendChild(container);
            } else {
                container.id = 'oasik-triage-container';
            }
            injectStyles();
            render();
        },
        selectZone: function(zoneKey) {
            selectedZone = zoneKey;
            currentStep = 2;
            render();
        },
        selectSymptom: function(symptomIndex) {
            selectedSymptom = symptomIndex;
            currentStep = 3;
            render();
        },
        goBack: function(step) {
            currentStep = step;
            if (step === 1) {
                selectedZone = null;
                selectedSymptom = null;
            } else if (step === 2) {
                selectedSymptom = null;
            }
            render();
        }
    };
})();

// Exportar para uso modular o ejecutar directamente si es en script tag
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = InicioMapaCuerpo;
} else {
    window.InicioMapaCuerpo = InicioMapaCuerpo;
      }
