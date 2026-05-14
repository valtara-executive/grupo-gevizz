/**
 * OASIK / VALTARA — MÓDULO: DIAGNÓSTICO SENSORIAL (MAPA DEL CUERPO) V3.0
 * Archivo: js/inicio_mapa_cuerpo.js
 *
 * CORRECCIONES v3.0:
 *  ✅ Exporta placeholder a window.ValtaraModulos.inicio_mapa_cuerpo (fix crítico)
 *  ✅ MutationObserver para inicializar cuando el constructor inyecte el div
 *  ✅ Nombre de paciente desde localStorage (valtara_user_name)
 *  ✅ Banner WhatsApp personalizado con nombre y mensaje específico por condición
 *  ✅ 8 zonas / condiciones expandidas (antes 4)
 *  ✅ Número WhatsApp oficial: 523348572070
 */

(function (global) {
    'use strict';

    // ─────────────────────────────────────────────────────────────────────────
    // 1. REGISTRO EN ValtaraModulos (CRÍTICO — sin esto el div nunca existe)
    // ─────────────────────────────────────────────────────────────────────────
    global.ValtaraModulos = global.ValtaraModulos || {};
    global.ValtaraModulos.inicio_mapa_cuerpo = `
        <div id="inicio_mapa_cuerpo" role="region" aria-label="Diagnóstico Sensorial Oasik"></div>
    `;

    // ─────────────────────────────────────────────────────────────────────────
    // 2. CONFIGURACIÓN GLOBAL
    // ─────────────────────────────────────────────────────────────────────────
    const WHATSAPP_NUMBER = '523348572070';

    function getPatientName() {
        try {
            const stored = localStorage.getItem('valtara_sovereign_profile');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.name && parsed.name !== 'Invitado') return parsed.name;
            }
            const simple = localStorage.getItem('valtara_user_name');
            if (simple && simple !== 'Invitado') return simple;
        } catch (e) { /* silent */ }
        return null;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 3. OPCIONES DE AROMATERAPIA
    // ─────────────────────────────────────────────────────────────────────────
    const aromatherapyOptions = [
        { id: 'lavanda',    name: 'Lavanda (Calma Profunda)',    desc: 'Ideal para insomnio, ansiedad y estrés agudo.' },
        { id: 'eucalipto',  name: 'Eucalipto (Respiración Libre)', desc: 'Despeja la mente y las vías respiratorias.' },
        { id: 'citricos',   name: 'Cítricos (Energía Vital)',    desc: 'Revitaliza y eleva el estado de ánimo.' },
        { id: 'romero',     name: 'Romero (Claridad Mental)',    desc: 'Mejora la concentración y alivia la fatiga muscular.' },
        { id: 'bergamota',  name: 'Bergamota (Equilibrio)',      desc: 'Regula el sistema nervioso y reduce la irritabilidad.' },
        { id: 'menta',      name: 'Menta (Foco y Alivio)',       desc: 'Alivia la pesadez y activa la circulación.' },
        { id: 'sin_aroma',  name: 'Sin Aroma',                   desc: 'Prefiero una experiencia neutra.' }
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // 4. BASE DE DATOS DE ZONAS / CONDICIONES
    // ─────────────────────────────────────────────────────────────────────────
    const triageData = {

        cabeza_cuello: {
            id: 'cabeza_cuello',
            title: 'Cabeza, Cuello y Hombros',
            icon: '💆‍♀️',
            description: 'El centro de tus pensamientos y la carga del día a día.',
            symptoms: [
                {
                    id: 'tension_alta',
                    label: 'Tensión rígida y rigidez constante en cuello/hombros',
                    why: 'El estrés sostenido y las horas frente a pantallas acumulan tensión directamente en tus trapecios y la base del cráneo. Tu cuerpo construye una "armadura muscular" como respuesta de protección ante el agotamiento mental crónico.',
                    recommendation: 'Masaje de Relajación Profunda + Sonoterapia',
                    terapia_clave: 'masaje relajante y Sonoterapia',
                    whatsapp_base: 'Hola Oasik, siento mucha tensión y rigidez en mi cuello y hombros por el estrés acumulado. Me gustaría agendar una sesión de masaje relajante para liberar esta carga.'
                },
                {
                    id: 'dolor_cabeza',
                    label: 'Migraña tensional, pesadez mental y dolores de cabeza recurrentes',
                    why: 'La contracción muscular constante en el cuello y la base del cráneo restringe el flujo sanguíneo y linfático hacia la cabeza. Combinado con la tensión ocular de pantallas, genera esa presión opresiva característica.',
                    recommendation: 'Masaje Craneofacial + Aromaterapia con Lavanda o Menta',
                    terapia_clave: 'Masaje Craneofacial',
                    whatsapp_base: 'Hola Oasik, sufro de dolores de cabeza tensionales y pesadez mental con frecuencia. Quisiera información sobre el masaje craneofacial y sus beneficios.'
                },
                {
                    id: 'insomnio',
                    label: 'Insomnio, mente acelerada y dificultad para descansar',
                    why: 'El sistema nervioso simpático (modo "alerta") se queda activo incluso de noche. La tensión muscular en cuello y hombros mantiene señales de alarma corporales que impiden la transición hacia el sueño profundo.',
                    recommendation: 'Sonoterapia Reparadora + Masaje de Relajación con Lavanda',
                    terapia_clave: 'Sonoterapia y masaje nocturno',
                    whatsapp_base: 'Hola Oasik, tengo problemas de insomnio y mi mente no para. Me gustaría explorar la Sonoterapia y un masaje relajante para recuperar mi descanso.'
                }
            ]
        },

        espalda: {
            id: 'espalda',
            title: 'Espalda (Alta, Media y Baja)',
            icon: '🧘‍♀️',
            description: 'El pilar que sostiene tu estructura, tus emociones y tu historia.',
            symptoms: [
                {
                    id: 'nudos',
                    label: 'Nudos, contracturas y dolor punzante en espalda alta/media',
                    why: 'Los nódulos miofasciales (conocidos como "nudos") son fibras musculares atrapadas en contracción permanente. Se forman por malas posturas sostenidas, cargas físicas repetitivas y también por tensión emocional no procesada que el cuerpo "guarda" en los músculos.',
                    recommendation: 'Masaje Descontracturante de Tejido Profundo',
                    terapia_clave: 'Masaje Descontracturante',
                    whatsapp_base: 'Hola Oasik, tengo contracturas y nudos muy marcados en la espalda. Necesito un masaje descontracturante de tejido profundo para liberarme.'
                },
                {
                    id: 'fatiga_lumbar',
                    label: 'Fatiga, cansancio y quemazón en la zona lumbar (espalda baja)',
                    why: 'La zona lumbar es el centro de gravedad de tu cuerpo. Pasar horas sentado o de pie desequilibra los flexores de cadera y debilita el core, obligando a los músculos lumbares a trabajar el doble para mantenerte en pie. Esa sobrecarga genera la sensación de quemazón y pesadez.',
                    recommendation: 'Masaje Lumbar de Tejido Profundo + Calor Terapéutico',
                    terapia_clave: 'Masaje Lumbar Profundo',
                    whatsapp_base: 'Hola Oasik, siento mucha fatiga y tensión en mi espalda baja. Me gustaría agendar una sesión de masaje lumbar profundo para recuperar esta zona.'
                },
                {
                    id: 'postura',
                    label: 'Desequilibrio postural, cifosis o sensación de carga pesada en la espalda',
                    why: 'El trabajo sedentario y el uso excesivo de dispositivos inclina el cuerpo hacia adelante, creando un patrón de "cabeza adelantada" y hombros caídos. La fascia (tejido conectivo) se adapta a esta postura desfavorable, haciendo que el cuerpo sienta ese peso constante.',
                    recommendation: 'Masaje Miofascial + Sesión de Corrección Postural',
                    terapia_clave: 'Masaje Miofascial y corrección postural',
                    whatsapp_base: 'Hola Oasik, noto que mi postura se ha deteriorado y siento una carga constante en la espalda. Me gustaría conocer sus terapias de corrección postural y liberación miofascial.'
                }
            ]
        },

        sistema_nervioso: {
            id: 'sistema_nervioso',
            title: 'Sistema Nervioso y Estrés Mental',
            icon: '🧠',
            description: 'Tu sistema de alerta trabaja demasiado. Es hora de darle permiso de pausar.',
            symptoms: [
                {
                    id: 'ansiedad',
                    label: 'Ansiedad, nerviosismo constante o sensación de "hiperalerta"',
                    why: 'El sistema nervioso en estado de ansiedad libera cortisol y adrenalina de forma crónica, lo que tensiona todo el cuerpo: mandíbula, diafragma, manos y pies. El trabajo manual en masoterapia activa el nervio vago, la vía directa para salir del modo alerta y entrar en calma.',
                    recommendation: 'Sonoterapia + Masaje Holístico de Integración',
                    terapia_clave: 'Sonoterapia y masaje holístico',
                    whatsapp_base: 'Hola Oasik, vivo con ansiedad y un estado constante de alerta. Quisiera saber cómo la Sonoterapia y el masaje pueden ayudarme a regular mi sistema nervioso.'
                },
                {
                    id: 'burnout',
                    label: 'Burnout, agotamiento emocional o sensación de estar "vaciado"',
                    why: 'El burnout no es solo cansancio: es un agotamiento profundo de los recursos adaptativos del cuerpo. Las reservas de serotonina y dopamina se deplecionan, los músculos cargan la fatiga de semanas o meses. El cuerpo necesita un ritual de recarga, no solo un descanso pasivo.',
                    recommendation: 'Ritual de Bienestar Integral (Masaje + Sonoterapia + Aromaterapia)',
                    terapia_clave: 'Ritual de Bienestar Integral',
                    whatsapp_base: 'Hola Oasik, siento que he llegado al límite con el burnout. Necesito un ritual completo de recarga, quiero conocer sus opciones de bienestar integral.'
                },
                {
                    id: 'fatiga_cronica',
                    label: 'Fatiga crónica, falta de energía y niebla mental',
                    why: 'La fatiga crónica refleja una desincronización entre el sistema nervioso central y el cuerpo físico. El músculo no recibe señales de recuperación eficientes y el cerebro permanece en modo "bajo rendimiento". La estimulación sensorial regulada (tacto + sonido + aroma) resetea este ciclo.',
                    recommendation: 'Masaje Energizante + Aromaterapia con Cítricos o Romero',
                    terapia_clave: 'Masaje Energizante',
                    whatsapp_base: 'Hola Oasik, tengo fatiga crónica y me cuesta mucho recuperar energía. Me gustaría explorar sus terapias para revitalizar mi cuerpo y mente.'
                }
            ]
        },

        sistema_digestivo: {
            id: 'sistema_digestivo',
            title: 'Sistema Digestivo y Abdomen',
            icon: '🌿',
            description: 'El "segundo cerebro". El estrés vive también aquí.',
            symptoms: [
                {
                    id: 'tension_abdominal',
                    label: 'Tensión abdominal, hinchazón o estreñimiento relacionado con estrés',
                    why: 'El intestino y el cerebro están directamente conectados por el eje gut-brain. Cuando el estrés activa el sistema nervioso simpático, el sistema digestivo se "apaga" parcialmente: la motilidad se reduce, el diafragma se tensa y los gases se acumulan. No es solo digestivo, es neurológico.',
                    recommendation: 'Masaje Abdominal Terapéutico + Reflexología',
                    terapia_clave: 'Masaje Abdominal Terapéutico',
                    whatsapp_base: 'Hola Oasik, tengo mucha tensión abdominal y problemas digestivos relacionados con el estrés. Quisiera información sobre el masaje abdominal terapéutico.'
                },
                {
                    id: 'retencion',
                    label: 'Retención de líquidos, inflamación corporal y sensación de pesadez generalizada',
                    why: 'El sistema linfático, a diferencia del circulatorio, no tiene bomba propia: necesita el movimiento muscular para circular. La vida sedentaria y el estrés crónico frenan el drenaje linfático, acumulando líquidos intersticiales que generan esa sensación de "globo" o pesadez en todo el cuerpo.',
                    recommendation: 'Drenaje Linfático Manual + Masaje de Activación Circulatoria',
                    terapia_clave: 'Drenaje Linfático Manual',
                    whatsapp_base: 'Hola Oasik, tengo retención de líquidos e inflamación notoria. Me gustaría agendar un drenaje linfático para activar mi circulación y sentirme más liviana.'
                }
            ]
        },

        manos_brazos: {
            id: 'manos_brazos',
            title: 'Manos y Brazos',
            icon: '💅',
            description: 'Tus herramientas de conexión, creación y expresión diaria.',
            symptoms: [
                {
                    id: 'manos_secas',
                    label: 'Resequedad extrema, cutículas dañadas o uñas frágiles',
                    why: 'Las manos son las más expuestas a químicos, agua, clima y fricción. La pérdida de aceites naturales y la deshidratación profunda generan fragilidad. El cuidado profesional no es estético: es restaurar la barrera protectora natural de tu piel.',
                    recommendation: 'Manicura Spa con Hidratación Profunda (Gelish / Acrílico opcional)',
                    terapia_clave: 'Manicura Spa con hidratación profunda',
                    whatsapp_base: 'Hola Oasik, mis manos y uñas necesitan un cuidado intensivo y mucha hidratación. Me gustaría agendar una Manicura Spa.'
                },
                {
                    id: 'tension_brazos',
                    label: 'Tensión en antebrazos, codo de tenista o manos cansadas por trabajo repetitivo',
                    why: 'El uso constante de teclado, mouse y celular genera microinflamaciones en los tendones del antebrazo (síndrome del túnel carpiano leve, epicondilitis). La tensión parte desde los codos y viaja hasta los dedos, generando esa sensación de "brazos apretados".',
                    recommendation: 'Masaje Reflexológico de Manos + Manicura Oasik',
                    terapia_clave: 'Masaje reflexológico de manos',
                    whatsapp_base: 'Hola Oasik, mis antebrazos y manos están muy tensos por el trabajo. Me gustaría una sesión de masaje reflexológico de manos con manicura incluida.'
                },
                {
                    id: 'renovacion_unas',
                    label: 'Uñas con material previo, diseño desgastado o deseo de renovación estética',
                    why: 'Las uñas cumplen ciclos naturales. El retiro incorrecto de acrílico o gel puede dañar la lámina ungueal. Un proceso profesional de limpieza y rediseño no solo embellece: protege y fortalece la uña natural, devolviendo su vitalidad.',
                    recommendation: 'Diseño Artístico de Uñas (Acrílico / Gel) + Cuidado de Cutícula',
                    terapia_clave: 'Diseño artístico de uñas',
                    whatsapp_base: 'Hola Oasik, quiero renovar el diseño de mis uñas con un retiro profesional y un nuevo diseño. Me gustaría agendar una cita de Manicura / Diseño.'
                }
            ]
        },

        pies_piernas: {
            id: 'pies_piernas',
            title: 'Piernas y Pies',
            icon: '👣',
            description: 'Tus raíces. Los que soportan tu peso y te llevan por el mundo.',
            symptoms: [
                {
                    id: 'pies_pesados',
                    label: 'Pesadez, hinchazón, sensación de "piernas de plomo" o mala circulación',
                    why: 'La gravedad trabaja en contra del retorno venoso. Pasar horas de pie o sentado reduce la eficiencia de las válvulas venosas, permitiendo que la sangre se "estanque" en las extremidades. El resultado: esa sensación de cargar bloques en las piernas que empeora al final del día.',
                    recommendation: 'Masaje de Drenaje Linfático + Reflexología Podal',
                    terapia_clave: 'Drenaje linfático y reflexología podal',
                    whatsapp_base: 'Hola Oasik, mis piernas y pies se sienten muy pesados e hinchados. Quisiera agendar un masaje de drenaje linfático para mejorar mi circulación.'
                },
                {
                    id: 'pies_asperos',
                    label: 'Callosidades, resequedad severa, talones agrietados o uñas descuidadas',
                    why: 'Los pies soportan el 100% del peso corporal durante horas. La fricción continua con el calzado genera hiperqueratosis (engrosamiento de piel) como mecanismo de defensa. Esta piel endurecida, si no se trata, genera fisuras dolorosas y puede afectar la marcha.',
                    recommendation: 'Pedicura Spa Renovadora Integral con Exfoliación y Nutrición',
                    terapia_clave: 'Pedicura Spa integral',
                    whatsapp_base: 'Hola Oasik, mis pies necesitan atención profunda: exfoliación, hidratación y cuidado de uñas. Me gustaría agendar una Pedicura Spa completa.'
                },
                {
                    id: 'calambres',
                    label: 'Calambres nocturnos, contracturas en gemelos o tensión en pantorrillas',
                    why: 'Los calambres nocturnos ocurren cuando el músculo, deshidratado o con desequilibrio de electrolitos, se contrae involuntariamente. La tensión acumulada en gemelos y sóleo durante el día se "descarga" durante la noche. El masaje profundo en estas zonas regulariza el umbral de excitabilidad muscular.',
                    recommendation: 'Masaje de Tejido Profundo en Piernas + Reflexología de Puntos de Alivio',
                    terapia_clave: 'Masaje profundo de piernas y reflexología',
                    whatsapp_base: 'Hola Oasik, sufro calambres nocturnos y tensión frecuente en las pantorrillas. Quisiera agendar un masaje de tejido profundo en piernas.'
                }
            ]
        },

        emociones_energia: {
            id: 'emociones_energia',
            title: 'Emociones y Bienestar Energético',
            icon: '🌊',
            description: 'Lo que sientes en el alma, el cuerpo lo carga. Aquí encontramos la raíz.',
            symptoms: [
                {
                    id: 'bajo_animo',
                    label: 'Bajo estado de ánimo, tristeza silenciosa o falta de motivación',
                    why: 'El cuerpo y las emociones son indisolubles. La tristeza y el desgaste emocional se manifiestan físicamente en el pecho contraído, la postura encorvada y el flujo energético reducido. La masoterapia activa la liberación de serotonina y oxitocina, neurotransmisores que literalmente "mejoran el ánimo".',
                    recommendation: 'Masaje Sueco Relajante + Sonoterapia con Frecuencias de Bienestar',
                    terapia_clave: 'Masaje Sueco y Sonoterapia',
                    whatsapp_base: 'Hola Oasik, he estado con un estado de ánimo muy bajo y me gustaría usar la terapia como apoyo. Quisiera saber qué sesiones pueden ayudarme emocionalmente.'
                },
                {
                    id: 'dispersion',
                    label: 'Dispersión mental, incapacidad para concentrarse o "niebla cerebral"',
                    why: 'La corteza prefrontal (área de concentración y decisiones) se ve afectada directamente por los niveles de cortisol elevados. El cuerpo, al sentirse en alerta constante, prioriza la supervivencia sobre el pensamiento analítico. El masaje y la aromaterapia regulan el cortisol y devuelven claridad al sistema.',
                    recommendation: 'Aromaterapia con Romero o Bergamota + Masaje Cráneo-Cervical',
                    terapia_clave: 'Aromaterapia y masaje cráneo-cervical',
                    whatsapp_base: 'Hola Oasik, tengo mucha niebla mental y dificultad para concentrarme. Me gustaría una sesión de aromaterapia y masaje para recuperar claridad y enfoque.'
                },
                {
                    id: 'desconexion',
                    label: 'Sensación de desconexión corporal, "piloto automático" o entumecimiento emocional',
                    why: 'La disociación leve (desconexión mente-cuerpo) es una respuesta natural ante el estrés crónico o el trauma acumulado. El cuerpo "apaga" la sensación para protegerse. El toque consciente y el trabajo sensorial en masoterapia reestablecen la comunicación cuerpo-mente de forma segura y gradual.',
                    recommendation: 'Masaje de Integración Sensorial + Sonoterapia con Cuencos Tibetanos',
                    terapia_clave: 'Masaje de integración sensorial',
                    whatsapp_base: 'Hola Oasik, siento que vivo en piloto automático y desconectado de mi cuerpo. Quisiera explorar las terapias de integración sensorial y sonoterapia.'
                }
            ]
        },

        deportistas: {
            id: 'deportistas',
            title: 'Recuperación Deportiva y Física',
            icon: '🏃‍♀️',
            description: 'El cuerpo activo también necesita restauración. La recuperación ES el entrenamiento.',
            symptoms: [
                {
                    id: 'agujetas',
                    label: 'Dolor muscular post-ejercicio intenso (DOMS) o recuperación lenta',
                    why: 'Las agujetas son micro-roturas musculares acompañadas de inflamación localizada. Sin un protocolo de recuperación activo, el proceso natural de reparación es más lento y puede limitar tu siguiente entrenamiento. El masaje deportivo acelera el drenaje de metabolitos y facilita la síntesis de colágeno.',
                    recommendation: 'Masaje Deportivo de Recuperación + Drenaje Linfático Post-Esfuerzo',
                    terapia_clave: 'Masaje deportivo de recuperación',
                    whatsapp_base: 'Hola Oasik, tuve un entrenamiento intenso y necesito recuperación muscular eficiente. Me gustaría agendar un masaje deportivo post-esfuerzo.'
                },
                {
                    id: 'lesion_leve',
                    label: 'Lesión muscular leve, esguince en recuperación o zona sobreentrenada',
                    why: 'Las lesiones leves (distensiones, sobrecargas, fascitis incipiente) responden excelentemente al trabajo manual en etapas subagudas. El masaje dirigido rompe adherencias de tejido cicatricial, mejora la vascularización local y acelera la vuelta a la funcionalidad completa.',
                    recommendation: 'Masaje de Tejido Profundo Focalizado + Liberación Miofascial',
                    terapia_clave: 'Masaje de tejido profundo y liberación miofascial',
                    whatsapp_base: 'Hola Oasik, tengo una zona muscular lesionada en recuperación. Quisiera agendar un masaje terapéutico focalizado para acelerar mi recuperación.'
                }
            ]
        }

    };

    // ─────────────────────────────────────────────────────────────────────────
    // 5. ESTADO REACTIVO
    // ─────────────────────────────────────────────────────────────────────────
    let state = {
        step: 1,
        zone: null,
        symptom: null,
        aroma: null
    };

    // ─────────────────────────────────────────────────────────────────────────
    // 6. ESTILOS
    // ─────────────────────────────────────────────────────────────────────────
    function initStyles() {
        if (document.getElementById('oasik-triage-styles')) return;
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
                max-width: 960px;
                margin: 0 auto;
                background: rgba(255,255,255,0.02);
                border: 1px solid rgba(212,175,55,0.15);
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                position: relative;
                min-height: 400px;
            }
            .t-header { text-align: center; margin-bottom: 30px; animation: tFadeIn 0.6s ease; }
            .t-header h2 { color: #d4af37; font-size: 2rem; margin: 0 0 8px; font-weight: 300; letter-spacing: 2px; }
            .t-header p { font-size: 1.05rem; color: #aaa; margin: 0; }
            .t-header .t-greeting { font-size: 1.2rem; color: #d4af37; margin-bottom: 8px; font-weight: 500; }

            .t-step { display: none; animation: tSlideUp 0.5s ease forwards; }
            .t-step.active { display: block; }

            .t-grid-zones {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 16px;
            }
            .t-card {
                background: rgba(0,0,0,0.4);
                border: 1px solid rgba(212,175,55,0.1);
                border-radius: 15px;
                padding: 28px 16px;
                text-align: center;
                cursor: pointer;
                transition: all 0.35s cubic-bezier(0.175,0.885,0.32,1.275);
                color: #fff;
            }
            .t-card:hover {
                background: rgba(212,175,55,0.08);
                border-color: #d4af37;
                transform: translateY(-7px);
                box-shadow: 0 10px 24px rgba(212,175,55,0.12);
            }
            .t-card:focus { outline: 2px solid #d4af37; }
            .t-card .icon { font-size: 3rem; display: block; margin-bottom: 12px; }
            .t-card .title { font-size: 1.05rem; font-weight: 500; letter-spacing: 0.5px; line-height: 1.3; }

            .t-list-symptoms { display: flex; flex-direction: column; gap: 14px; max-width: 720px; margin: 0 auto; }
            .t-symptom-btn {
                background: rgba(0,0,0,0.4);
                border: 1px solid rgba(255,255,255,0.06);
                padding: 18px 20px;
                border-radius: 12px;
                text-align: left;
                color: #e0e0e0;
                font-size: 1.05rem;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
            }
            .t-symptom-btn:hover {
                background: rgba(212,175,55,0.1);
                border-color: rgba(212,175,55,0.5);
                color: #fff;
            }
            .t-symptom-btn::after { content: '→'; color: #d4af37; font-size: 1.4rem; opacity: 0; transform: translateX(-10px); transition: all 0.3s; flex-shrink: 0; }
            .t-symptom-btn:hover::after { opacity: 1; transform: translateX(0); }

            .t-aroma-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-top: 20px; }
            .t-aroma-card {
                background: rgba(0,0,0,0.3);
                border: 1px solid rgba(255,255,255,0.1);
                padding: 15px;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s;
                text-align: center;
            }
            .t-aroma-card:hover, .t-aroma-card.selected {
                background: rgba(212,175,55,0.18);
                border-color: #d4af37;
            }
            .t-aroma-card h4 { color: #fff; margin: 0 0 5px; font-size: 0.95rem; }
            .t-aroma-card p { color: #aaa; font-size: 0.82rem; margin: 0; line-height: 1.4; }

            .t-result-card {
                background: linear-gradient(180deg, rgba(212,175,55,0.06) 0%, rgba(0,0,0,0) 100%);
                border-top: 2px solid #d4af37;
                padding: 30px;
                border-radius: 15px;
                text-align: center;
                max-width: 720px;
                margin: 0 auto;
            }
            .t-result-card h3 { color: #d4af37; font-size: 1.7rem; margin: 0 0 18px; font-weight: 300; }
            .t-result-why {
                font-size: 1.1rem;
                line-height: 1.8;
                color: #ccc;
                margin-bottom: 28px;
                font-style: italic;
                padding: 0 10px;
                border-left: 3px solid rgba(212,175,55,0.3);
                text-align: left;
            }
            .t-recomm-box {
                background: rgba(0,0,0,0.5);
                padding: 20px;
                border-radius: 12px;
                margin-bottom: 28px;
                border: 1px solid rgba(212,175,55,0.2);
            }
            .t-recomm-box strong { color: #888; display: block; margin-bottom: 8px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; }
            .t-recomm-box span { color: #fff; font-size: 1.3rem; font-weight: 400; }
            .t-recomm-aroma { margin-top: 10px; font-size: 0.9rem; color: #d4af37; }

            /* ── BANNER WHATSAPP PERSONALIZADO ── */
            .t-wa-banner {
                background: linear-gradient(135deg, #0d3320 0%, #0a2018 100%);
                border: 1px solid rgba(37,211,102,0.3);
                border-radius: 16px;
                padding: 24px;
                margin-bottom: 20px;
                text-align: center;
            }
            .t-wa-banner .banner-titulo {
                color: #25D366;
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-weight: 700;
                margin-bottom: 6px;
            }
            .t-wa-banner .banner-nombre {
                color: #fff;
                font-size: 1.4rem;
                font-weight: 600;
                margin-bottom: 8px;
            }
            .t-wa-banner .banner-desc {
                color: rgba(255,255,255,0.7);
                font-size: 0.95rem;
                margin-bottom: 18px;
                line-height: 1.5;
            }
            .t-wa-btn {
                display: inline-flex;
                align-items: center;
                gap: 12px;
                background: #25D366;
                color: #fff;
                text-decoration: none;
                padding: 14px 32px;
                border-radius: 40px;
                font-size: 1.1rem;
                font-weight: bold;
                transition: all 0.3s;
                border: none;
                cursor: pointer;
                box-shadow: 0 5px 20px rgba(37,211,102,0.25);
            }
            .t-wa-btn:hover {
                background: #1ebc59;
                transform: translateY(-3px);
                box-shadow: 0 8px 28px rgba(37,211,102,0.4);
            }

            .t-back-btn {
                background: transparent;
                border: none;
                color: #888;
                cursor: pointer;
                font-size: 0.95rem;
                margin-bottom: 20px;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition: color 0.3s;
                padding: 0;
            }
            .t-back-btn:hover { color: #d4af37; }

            .t-disclaimer {
                margin-top: 36px;
                padding: 18px 20px;
                background: rgba(0,0,0,0.3);
                border-left: 4px solid #555;
                font-size: 0.87rem;
                line-height: 1.65;
                color: #777;
                border-radius: 0 10px 10px 0;
                text-align: left;
            }
            .t-disclaimer strong { color: #aaa; }

            .t-action-row {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: 28px;
                max-width: 720px;
                margin-left: auto;
                margin-right: auto;
            }
            .t-next-btn {
                background: #d4af37;
                color: #000;
                border: none;
                padding: 12px 28px;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
                opacity: 0.45;
                pointer-events: none;
                font-size: 1rem;
            }
            .t-next-btn.active { opacity: 1; pointer-events: auto; }
            .t-next-btn:hover { background: #f0c94a; transform: scale(1.04); }

            @keyframes tSlideUp {
                from { opacity: 0; transform: translateY(28px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes tFadeIn {
                from { opacity: 0; } to { opacity: 1; }
            }
            @media (max-width: 600px) {
                .triage-wrapper { padding: 20px; }
                .t-header h2 { font-size: 1.7rem; }
                .t-grid-zones { grid-template-columns: repeat(2, 1fr); }
                .t-action-row { justify-content: center; }
            }
        `;
        document.head.appendChild(style);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 7. RENDER PRINCIPAL
    // ─────────────────────────────────────────────────────────────────────────
    function renderHTML() {
        const container = document.getElementById('inicio_mapa_cuerpo');
        if (!container) return;

        const patientName = getPatientName();
        const greeting = patientName
            ? `<p class="t-greeting">Hola, <strong>${patientName}</strong> 👋</p>`
            : '';

        let html = `<div class="triage-wrapper">`;

        // ── PASO 1: Selección de Zona ──────────────────────────────────────
        html += `
            <div class="t-step ${state.step === 1 ? 'active' : ''}">
                <div class="t-header">
                    ${greeting}
                    <h2>¿Qué siente tu cuerpo hoy?</h2>
                    <p>Selecciona la zona donde sientes mayor tensión, cansancio o malestar.</p>
                </div>
                <div class="t-grid-zones">
        `;
        for (const [key, data] of Object.entries(triageData)) {
            html += `
                <div class="t-card" role="button" tabindex="0"
                     onclick="window.InicioMapaCuerpoAPI.setZone('${key}')"
                     onkeydown="if(event.key==='Enter'||event.key===' ')window.InicioMapaCuerpoAPI.setZone('${key}')">
                    <span class="icon">${data.icon}</span>
                    <span class="title">${data.title}</span>
                </div>
            `;
        }
        html += `</div></div>`;

        // ── PASO 2: Síntomas ──────────────────────────────────────────────
        if (state.zone) {
            const zone = triageData[state.zone];
            html += `
                <div class="t-step ${state.step === 2 ? 'active' : ''}">
                    <button class="t-back-btn" onclick="window.InicioMapaCuerpoAPI.goBack(1)">← Cambiar Zona</button>
                    <div class="t-header">
                        <h2>${zone.icon} ${zone.title}</h2>
                        <p>¿Cuál de estas afirmaciones describe mejor lo que sientes?</p>
                    </div>
                    <div class="t-list-symptoms">
            `;
            zone.symptoms.forEach((symp, idx) => {
                html += `
                    <button class="t-symptom-btn" onclick="window.InicioMapaCuerpoAPI.setSymptom(${idx})">
                        <span>${symp.label}</span>
                    </button>
                `;
            });
            html += `</div></div>`;
        }

        // ── PASO 3: Aromaterapia ──────────────────────────────────────────
        if (state.zone && state.symptom !== null) {
            html += `
                <div class="t-step ${state.step === 3 ? 'active' : ''}">
                    <button class="t-back-btn" onclick="window.InicioMapaCuerpoAPI.goBack(2)">← Cambiar Síntoma</button>
                    <div class="t-header">
                        <h2>Elige tu Atmósfera</h2>
                        <p>Personaliza tu experiencia con un aceite esencial. ¿Cuál te llama más hoy?</p>
                    </div>
                    <div class="t-aroma-grid">
            `;
            aromatherapyOptions.forEach(aroma => {
                const sel = state.aroma === aroma.name ? 'selected' : '';
                html += `
                    <div class="t-aroma-card ${sel}" role="button" tabindex="0"
                         onclick="window.InicioMapaCuerpoAPI.setAroma('${aroma.name}')"
                         onkeydown="if(event.key==='Enter'||event.key===' ')window.InicioMapaCuerpoAPI.setAroma('${aroma.name}')">
                        <h4>${aroma.name}</h4>
                        <p>${aroma.desc}</p>
                    </div>
                `;
            });
            html += `
                    </div>
                    <div class="t-action-row">
                        <button class="t-next-btn ${state.aroma ? 'active' : ''}"
                                onclick="window.InicioMapaCuerpoAPI.finalize()">
                            Ver mi Ritual Sugerido →
                        </button>
                    </div>
                </div>
            `;
        }

        // ── PASO 4: Resultado + Banner WhatsApp Personalizado ─────────────
        if (state.step === 4) {
            const zone = triageData[state.zone];
            const data = zone.symptoms[state.symptom];
            const patName = getPatientName();

            // Construir mensaje de WhatsApp personalizado
            let finalMsg = data.whatsapp_base;
            if (patName) {
                // Reemplazar "Hola Oasik" por "Hola Oasik, soy [Nombre]"
                finalMsg = finalMsg.replace('Hola Oasik,', `Hola Oasik, soy ${patName} y`);
            }
            if (state.aroma && state.aroma !== 'Sin Aroma') {
                finalMsg += ` Me gustaría incluir aromaterapia de ${state.aroma}.`;
            } else if (state.aroma === 'Sin Aroma') {
                finalMsg += ` Prefiero la sesión sin aromaterapia.`;
            }

            const encodedMsg = encodeURIComponent(finalMsg);
            const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

            // Nombre para el banner
            const bannerNombre = patName ? `Tu ritual está listo, <strong>${patName}</strong>` : 'Tu ritual personalizado está listo';
            const bannerDesc = `Te conectamos con nuestro equipo para agendar <strong>${data.terapia_clave}</strong>.`;

            html += `
                <div class="t-step active">
                    <button class="t-back-btn" onclick="window.InicioMapaCuerpoAPI.goBack(3)">← Cambiar Aromaterapia</button>
                    <div class="t-result-card">
                        <h3>¿Por qué sientes esto?</h3>
                        <p class="t-result-why">${data.why}</p>

                        <div class="t-recomm-box">
                            <strong>Ritual Oasik Sugerido para ti</strong>
                            <span>${data.recommendation}</span>
                            ${state.aroma ? `<div class="t-recomm-aroma">🌿 Atmósfera seleccionada: ${state.aroma}</div>` : ''}
                        </div>

                        <!-- BANNER WHATSAPP PERSONALIZADO -->
                        <div class="t-wa-banner">
                            <p class="banner-titulo">📲 Tu enlace de contacto directo</p>
                            <p class="banner-nombre">${bannerNombre}</p>
                            <p class="banner-desc">${bannerDesc}<br>
                               Haz clic y tu mensaje llega precargado con todos los detalles.
                            </p>
                            <a href="${waLink}" target="_blank" rel="noopener" class="t-wa-btn">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                </svg>
                                Agendar mi Ritual por WhatsApp
                            </a>
                        </div>

                        <div class="t-disclaimer">
                            <strong>Aclaración importante sobre tu salud:</strong><br>
                            En Oasik somos especialistas en bienestar integral, relajación profunda y cuidado estético profesional (Masajes, Manicura, Pedicura, Sonoterapia).
                            <strong>No somos médicos, fisioterapeutas ni podólogos.</strong>
                            Nuestros servicios están diseñados para aliviar la tensión diaria y acompañar tu bienestar.
                            Si presentas dolor crónico, lesiones agudas, infecciones o problemas estructurales, consulta primero con un especialista de salud calificado.
                        </div>
                    </div>
                </div>
            `;
        }

        html += `</div>`;
        container.innerHTML = html;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 8. API GLOBAL (usada por los onclick inline del HTML renderizado)
    // ─────────────────────────────────────────────────────────────────────────
    global.InicioMapaCuerpoAPI = {
        setZone: function (z) { state.zone = z; state.step = 2; state.symptom = null; state.aroma = null; renderHTML(); },
        setSymptom: function (s) { state.symptom = s; state.step = 3; state.aroma = null; renderHTML(); },
        setAroma: function (a) { state.aroma = a; renderHTML(); },
        finalize: function () { if (state.aroma) { state.step = 4; renderHTML(); } },
        goBack: function (step) {
            state.step = step;
            if (step === 1) { state.zone = null; state.symptom = null; state.aroma = null; }
            if (step === 2) { state.symptom = null; state.aroma = null; }
            if (step === 3) { state.aroma = null; }
            renderHTML();
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // 9. INICIALIZACIÓN — espera al div inyectado por constructor_maestro.js
    // ─────────────────────────────────────────────────────────────────────────
    function tryInit() {
        const container = document.getElementById('inicio_mapa_cuerpo');
        if (container) {
            initStyles();
            renderHTML();
            return true;
        }
        return false;
    }

    function autoInit() {
        if (tryInit()) return;

        // El div lo crea constructor_maestro → esperamos que aparezca
        const observer = new MutationObserver(function (_, obs) {
            if (tryInit()) obs.disconnect();
        });
        observer.observe(document.body || document.documentElement, { childList: true, subtree: true });

        // Fallback de seguridad
        setTimeout(function () {
            tryInit();
            observer.disconnect();
        }, 4000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        setTimeout(autoInit, 50);
    }

})(window);
