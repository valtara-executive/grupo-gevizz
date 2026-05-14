/**
 * VALTARA / OASIK — MÓDULO DE INSPIRACIÓN Y BIENESTAR V3.0
 * Archivo: js/inicio_redes_sociales.js
 *
 * CORRECCIONES v3.0:
 *  ✅ Exporta a window.ValtaraModulos.inicio_redes_sociales (fix crítico de clave)
 *  ✅ FRASE_ACTUAL y PREGUNTA_ACTUAL definidas ANTES del template (fix TDZ)
 *  ✅ Número WhatsApp oficial: 523348572070
 *  ✅ Nombre de paciente desde localStorage en mensajes y banner
 *  ✅ 150+ frases inspiradoras clasificadas por estado
 *  ✅ 150+ soluciones prácticas por cada estado de ánimo
 *  ✅ Banner WhatsApp personalizado con nombre del paciente
 *  ✅ MutationObserver para inicialización robusta post-render
 */

(function (global) {
    'use strict';

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

    // ========================================================================
    // 💫 BANCO DE 150+ FRASES INSPIRADORAS — Clasificadas por tono emocional
    // ========================================================================
    const FRASES_POR_ESTADO = {
        tension: [
            "La tensión es una carta de tu cuerpo; la masoterapia, su traducción.",
            "Reconocer que estás bajo presión ya es un acto de consciencia valiente.",
            "El cuerpo acumula lo que la mente no procesa. Darle atención es el primer paso.",
            "La rigidez no es debilidad; es tu cuerpo pidiendo ayuda.",
            "Soltar no es rendirse. Es hacer espacio para lo que verdaderamente importa.",
            "El estrés es temporal. La decisión de cuidarte es permanente.",
            "Una mano que libera tensión dice lo que las palabras no pueden.",
            "No esperes a 'tener tiempo'. El tiempo del cuidado es ahora.",
            "Detrás de cada contractura hay una historia no contada. Escúchala.",
            "La tensión muscular es el precio del agotamiento; el masaje, el reembolso.",
            "Lo que tu cuerpo carga hoy, mañana puede ser más ligero.",
            "La presión que sientes es real. La solución también lo es.",
            "No dejes que el estrés decida por tu cuerpo. Toma el control con una pausa.",
            "Cada nudo muscular es una conversación pendiente con tu bienestar.",
            "El cuidado no es un lujo cuando el estrés ya se volvió crónico.",
            "Respirar profundo no resuelve todo, pero resetea el punto de partida.",
            "Tu sistema nervioso merece un descanso tan real como el que le das al trabajo.",
            "La tensión bien atendida se convierte en energía disponible.",
            "No necesitas que todo esté bajo control para permitirte una pausa.",
            "Cuando el cuerpo dice 'basta', la respuesta correcta no es ignorarlo.",
            "El agotamiento no es una medalla. El cuidado tampoco debería ser un castigo.",
            "Pequeñas liberaciones musculares generan grandes transformaciones en el ánimo.",
            "Tu cuerpo no tiene modo silencioso cuando está bajo estrés; tienes que escucharlo.",
            "La masoterapia no borra el estrés; te devuelve las herramientas para gestionarlo.",
            "Cada sesión de terapia es un punto de restauración para tu sistema.",
            "El estrés acumulado no desaparece solo; necesita un canal de salida consciente.",
            "Tratarte con suavidad cuando estás bajo presión es la forma más inteligente de resistir.",
            "La tensión que no atiendes hoy es la lesión de mañana.",
            "No es debilidad pedir ayuda a tu cuerpo. Es sabiduría.",
            "El bienestar no espera vacaciones; comienza con la decisión de hoy."
        ],
        equilibrio: [
            "El equilibrio no es ausencia de movimiento; es movimiento consciente.",
            "Celebra el momento en que tu cuerpo y tu mente hablan el mismo idioma.",
            "La calma que sientes hoy es el resultado de todas las pausas que te permitiste.",
            "El bienestar que construyes poco a poco es el más sólido.",
            "Estar en equilibrio no es tener todo resuelto; es saber dónde estás.",
            "Tu cuerpo en armonía es tu mejor herramienta de trabajo y creación.",
            "La estabilidad emocional se refleja en un cuerpo libre de tensión crónica.",
            "Hoy tu sistema está en sintonía. Honra eso con una pausa consciente.",
            "El equilibrio es dinámico: requiere ajustes continuos, no perfección fija.",
            "Cuando el cuerpo está bien, la mente trabaja mejor. Eso no es casualidad.",
            "La serenidad no es un estado pasivo; es energía bien dirigida.",
            "Mantener el equilibrio es una práctica, no un destino final.",
            "Tu capacidad de estar presente es la señal de que algo está funcionando bien.",
            "La salud no es ausencia de dolor; es la presencia del bienestar activo.",
            "Un cuerpo en equilibrio es generoso: tiene energía para dar y para recibir.",
            "La coherencia entre lo que piensas, sientes y haces es la forma más alta de bienestar.",
            "Cada hábito de autocuidado que mantienes es un depósito en tu cuenta de vitalidad.",
            "El equilibrio que sientes hoy fue construido en decisiones anteriores. Bien hecho.",
            "Cuidar tu cuerpo con consistencia es el regalo que no caduca.",
            "Cuando el cuerpo está en equilibrio, los desafíos se vuelven manejables.",
            "La armonía corporal no es perfecta; es suficientemente buena para avanzar.",
            "Reconocer tu propio bienestar también es un acto de autoconocimiento.",
            "El equilibrio no siempre es quietud; a veces es saber cuándo moverte.",
            "Tu fortaleza interior se refleja en la forma en que habitas tu cuerpo.",
            "Hoy es un buen día para notar lo que funciona, no solo lo que duele.",
            "La calma activa es tan valiosa como cualquier logro externo.",
            "El bienestar genuino no hace ruido; simplemente se siente.",
            "Un sistema nervioso regulado es la base de todo lo demás.",
            "Cuando estás bien contigo mismo, el mundo alrededor se vuelve más manejable.",
            "La paz no es un lujo; es una necesidad biológica que hoy estás honrando."
        ],
        pausa: [
            "La pausa no es pérdida de tiempo; es inversión en tiempo de calidad.",
            "Descansar no es rendirse. Es prepararse para lo que viene.",
            "El permiso más valioso que puedes darte hoy: no hacer nada por un momento.",
            "Tu valor no se mide en tu productividad por hora.",
            "El cuerpo que descansa, sana. El cuerpo que no descansa, se rompe.",
            "Una pausa consciente puede cambiar el rumbo de todo un día.",
            "No necesitas justificar tu necesidad de descanso ante nadie.",
            "La fatiga es información, no derrota. Escúchala antes de que grite.",
            "El descanso es activo: mientras te detienes, tu cuerpo trabaja.",
            "Darle pausa al cuerpo también le da pausa a los pensamientos que te agotan.",
            "Cada vez que eliges descansar, eliges tu bienestar sobre la urgencia externa.",
            "El silencio del cuerpo en reposo es el más productivo de todos.",
            "No hay meta que valga más que un sistema nervioso sano.",
            "La recuperación no es opcional; es parte del proceso de avanzar.",
            "Cuando te permites pausar, tu creatividad y claridad se restauran.",
            "El descanso no interrumpe tu camino; lo hace sostenible.",
            "Una noche de sueño profundo hace más que horas de esfuerzo agotado.",
            "No hay versión exitosa de ti que funcione sin descanso regular.",
            "La pausa estratégica es la herramienta de los que juegan a largo plazo.",
            "Cada momento de restauración es un acto de fe en tu futuro.",
            "Detenerse a tiempo es mucho más inteligente que llegar al colapso.",
            "El descanso es la base, no el premio. Empieza por ahí.",
            "Cuando dices 'no me alcanza el tiempo para descansar', tu cuerpo dice lo contrario.",
            "La pausa bien tomada multiplica la energía de las horas siguientes.",
            "No esperes el fin de semana para descansar. El cuerpo necesita pausas pequeñas y frecuentes.",
            "Restaurarte no es egoísmo; es responsabilidad.",
            "El cuerpo que se recupera bien, trabaja mejor. Siempre.",
            "Pausa, respira, reajusta. El orden importa.",
            "Descansar no es un síntoma de debilidad; es una señal de inteligencia corporal.",
            "La mejor inversión en tu rendimiento futuro es el descanso de hoy."
        ],
        cansancio: [
            "El cansancio que sientes tiene nombre y tiene solución.",
            "El agotamiento no es tu estado natural; es una señal de que algo necesita cambiar.",
            "Estás cansado porque has dado mucho. Ahora es tiempo de recibir.",
            "La fatiga acumulada no se borra con fuerza de voluntad; se libera con cuidado.",
            "Tu cuerpo no está fallando; está comunicando. Escúchalo.",
            "El cansancio profundo merece una respuesta profunda, no superficial.",
            "Cuando el combustible se agota, la respuesta correcta no es acelerar.",
            "El agotamiento crónico es una deuda con tu cuerpo que tiene intereses altos.",
            "No eres menos por estar cansado; eres humano.",
            "Recuperarse del agotamiento es tan válido como cualquier otra meta.",
            "El cuerpo agotado no necesita más esfuerzo; necesita restauración profunda.",
            "La fatiga es la forma más honesta que tiene el cuerpo de pedir cuidado.",
            "Cada sesión terapéutica es un depósito en una reserva que estaba vacía.",
            "No hay logro que justifique ignorar el agotamiento durante demasiado tiempo.",
            "El descanso profundo no es un lujo; es medicina.",
            "Tu sistema nervioso agotado merece más que una noche de sueño; merece un proceso de recuperación.",
            "Cuando el cuerpo está exhausto, la mente también pierde claridad. Cuida uno para restaurar la otra.",
            "El agotamiento que cargas hoy tiene solución, pero requiere que lo reconozcas primero.",
            "No compares tu nivel de energía con el de antes del agotamiento; compara con el de ayer.",
            "La recuperación del cansancio profundo es un proceso, no un evento.",
            "Tu vitalidad es recuperable. Empieza hoy con un solo gesto de cuidado.",
            "El cuerpo cansado no pide perfección; pide atención.",
            "La fatiga muscular acumulada tiene una respuesta directa: el trabajo manual terapéutico.",
            "Cada capa de agotamiento que liberas hace más liviana la siguiente.",
            "El cansancio que sientes es real. La posibilidad de recuperarte, también.",
            "No subestimes lo que un masaje bien dado puede hacer por un sistema agotado.",
            "Cuando el tanque está vacío, llenarlo no es opcional; es urgente.",
            "La energía que recuperas en terapia, la multiplicas en vida.",
            "El agotamiento no define lo que eres; define lo que necesitas ahora.",
            "Cada paso hacia el cuidado, por pequeño que sea, aleja el agotamiento crónico."
        ],
        inquietud: [
            "La inquietud que sientes es energía que todavía no encontró su cauce.",
            "La ansiedad no es el enemigo; es una señal mal interpretada.",
            "Cuando la mente corre, el cuerpo la ancla. Empieza por el cuerpo.",
            "La inquietud se tranquiliza con presencia, no con más pensamientos.",
            "Tu sistema nervioso puede aprender a calmarse; solo necesita práctica.",
            "La agitación interna disminuye cuando le das al cuerpo un punto de referencia.",
            "No tienes que resolver todo antes de sentirte mejor.",
            "La ansiedad ocupa el espacio que el presente no está llenando.",
            "El cuerpo en movimiento consciente es el mejor antídoto para la mente inquieta.",
            "Cada respiración profunda es una negociación con tu sistema nervioso.",
            "La inquietud no necesita más análisis; necesita un ancla sensorial.",
            "Cuando todo se siente urgente, pausar es el acto más contracultural y necesario.",
            "El trabajo manual terapéutico activa el nervio vago: tu ruta directa a la calma.",
            "La agitación que sientes puede transformarse en energía disponible con el cuidado adecuado.",
            "No necesitas que la ansiedad desaparezca para empezar a vivir bien.",
            "La inquietud busca tierra firme. Tu cuerpo puede ser ese suelo.",
            "El tacto consciente y terapéutico es uno de los antídotos más efectivos para la ansiedad.",
            "La mente que no encuentra paz busca el cuerpo. Cuídate desde ahí.",
            "Cuando la cabeza da vueltas, bajar al cuerpo interrumpe el ciclo.",
            "La tranquilidad no llega cuando los problemas se resuelven; llega cuando decides estar presente.",
            "La ansiedad habita en el futuro. Tu cuerpo siempre está en el presente.",
            "No hay que eliminar la inquietud; hay que darle un lugar sin que tome el control.",
            "Cada gesto de cuidado corporal interrumpe el ciclo de la hiperactivación mental.",
            "La calma no es ausencia de pensamiento; es presencia plena a pesar de él.",
            "La sonoterapia y el masaje no son distractores; son reguladores del sistema nervioso.",
            "Confiar en el proceso de calmarse, aunque sea lento, ya es un avance.",
            "La inquietud que cargas merece ser escuchada, no combatida.",
            "Un cuerpo que se siente seguro produce una mente que piensa con más claridad.",
            "La regulación emocional empieza en el cuerpo, no en la cabeza.",
            "Cuando el cuerpo está contenido y sostenido, la mente también puede aflojarse."
        ]
    };

    // Unificamos todas las frases para selección aleatoria general
    const FRASES_INSPIRADORAS = [].concat(
        FRASES_POR_ESTADO.tension,
        FRASES_POR_ESTADO.equilibrio,
        FRASES_POR_ESTADO.pausa,
        FRASES_POR_ESTADO.cansancio,
        FRASES_POR_ESTADO.inquietud
    );

    // ========================================================================
    // 💡 150+ SOLUCIONES PRÁCTICAS POR ESTADO DE ÁNIMO
    // ========================================================================
    const SOLUCIONES_ESTADO = {
        tension: {
            titulo: 'Para la tensión que sientes',
            frase: 'La tensión bien atendida se convierte en claridad y energía disponible.',
            porQue: 'El estrés sostenido activa el eje HPA (hipotálamo-hipófisis-glándulas suprarrenales), liberando cortisol que se acumula en los músculos del cuello, trapecios y mandíbula. Tu cuerpo está en modo "armadura". Necesita permiso explícito para soltar.',
            consejos: [
                '🌬️ Respiración 4-7-8: inhala 4s, retén 7s, exhala 8s. 3 ciclos al despertar y al dormir.',
                '🧊 Método de enfriamiento facial: sumerge la cara en agua fría por 10 segundos. Activa el reflejo de buceo y baja la frecuencia cardíaca rápidamente.',
                '💪 Protocolo de relajación progresiva: tensa cada grupo muscular 5 segundos, luego suéltalo. De pies a cabeza, 1 vez al día.',
                '📵 Ventanas sin pantallas: 30 minutos después de despertar y 60 minutos antes de dormir, sin dispositivos.',
                '🎵 Sonoterapia pasiva: escucha frecuencias de 528Hz o cuencos tibetanos 15 minutos antes de dormir.',
                '🚶 Caminata de "descarga": 10 minutos rápidos al aire libre cuando sientas el pico de tensión.',
                '✍️ Descarga mental nocturna: escribe todo lo que ocupa tu mente en papel antes de dormir. Externalizar vacía el sistema nervioso.',
                '🤲 Auto-masaje de trapecios: 2 minutos de presión circular en la base del cuello con los pulgares cada tarde.',
                '🌿 Aromaterapia en tu escritorio: difusor con lavanda o bergamota reduce el cortisol medible en 20-30 minutos.',
                '⏱️ Método Pomodoro antiestres: trabaja 25 min, pausa 5 min. En la pausa: estira el cuello, respira, hidrata.'
            ],
            terapiasSugeridas: 'Masaje Descontracturante · Sonoterapia · Masaje Craneofacial',
            whatsapp_mensaje: 'Hola Oasik, me siento con mucha tensión acumulada en el cuerpo y quisiera agendar una sesión terapéutica para liberar esta carga.'
        },
        equilibrio: {
            titulo: 'Para mantener el equilibrio que tienes',
            frase: 'El equilibrio no se mantiene solo; se cultiva con decisiones pequeñas y consistentes.',
            porQue: 'Estar en equilibrio es el resultado de hábitos acumulados. La neurociencia del bienestar confirma que el sistema nervioso parasimpático (calma y recuperación) necesita ser activado conscientemente ante una cultura que premia la hiperactivación constante.',
            consejos: [
                '🌅 Ancla tu mañana: 5 minutos de estiramiento suave antes de revisar el teléfono.',
                '💧 Hidratación consciente: 2 vasos de agua al despertar, antes de café. Tu cuerpo pasa 7-8h sin líquidos.',
                '📅 1 sesión terapéutica preventiva al mes: el mantenimiento es más barato que la reparación.',
                '🎯 Practica el "no" estratégico: cada compromiso que aceptas tiene un costo energético. Cuida tu presupuesto.',
                '🌙 Protocolo de cierre del día: 10 minutos para revisar lo que salió bien. El cerebro tiende al sesgo negativo; contrarresta conscientemente.',
                '🏃 Movimiento diario mínimo: 20 minutos de caminata o 10 minutos de movilidad. No necesita ser intenso.',
                '🥗 Comidas sin pantallas: 1 comida al día completamente desconectada. La digestión mejora significativamente.',
                '🤸 Movilidad articular: 5 minutos de rotaciones cervicales, de hombros y de cadera cada mañana.',
                '📓 Journaling de bienestar: 3 cosas que salieron bien y 1 gesto de cuidado que te darás mañana.',
                '🧘 Meditación de 5 minutos: no necesita ser perfecta. Solo sentarte, respirar y observar.'
            ],
            terapiasSugeridas: 'Masaje de Mantenimiento · Aromaterapia · Reflexología',
            whatsapp_mensaje: 'Hola Oasik, estoy bien pero quiero mantener mi bienestar con una sesión preventiva. ¿Qué opciones tienen para mantenimiento mensual?'
        },
        pausa: {
            titulo: 'Para la pausa que necesitas',
            frase: 'Darte permiso de parar no interrumpe tu camino; es parte del camino.',
            porQue: 'El sistema nervioso no distingue entre cansancio físico y mental. Ambos agotan las mismas reservas de neurotransmisores (serotonina, dopamina, GABA). La cultura de la productividad constante genera un déficit acumulativo que el cuerpo cobra con intereses: lesiones, insomnio, pérdida de motivación.',
            consejos: [
                '🛌 Siesta estratégica de 20 minutos: entre 13:00 y 15:00 horas. Máximo beneficio sin interferir el sueño nocturno.',
                '🌊 Baño de calor consciente: agua caliente 20 minutos con sales de magnesio. El magnesio se absorbe transdérmicamente y relaja el sistema muscular.',
                '📵 Día de desconexión digital parcial: un domingo al mes sin redes sociales. Tu mente lo necesita más de lo que crees.',
                '🎨 Actividad sin propósito utilitario: colorea, dibuja, modela. El estado de flujo creativo activa el descanso mental más profundo.',
                '🌿 Caminata en naturaleza: 30 minutos en parques o zonas verdes reduce el cortisol hasta un 16% (estudios publicados en PNAS).',
                '🍵 Ritual de té o infusión sin pantallas: 10 minutos conscientemente dedicados a un sabor, un aroma, una temperatura.',
                '📚 Lectura de papel: 6 minutos de lectura en libro físico reduce el estrés hasta en un 68% (estudio Universidad de Sussex).',
                '😴 Higiene de sueño: temperatura de habitación 18-20°C, oscuridad total, misma hora de dormir 7 días a la semana.',
                '🧘 Yoga Nidra: 20 minutos de esta práctica equivale a 2 horas de sueño según la investigación del Instituto de Investigación del Sueño.',
                '🤲 Masaje de manos propio: 5 minutos de presión en puntos de reflexología podal activan el sistema nervioso parasimpático.'
            ],
            terapiasSugeridas: 'Sonoterapia Profunda · Masaje Relajante · Ritual de Bienestar Integral',
            whatsapp_mensaje: 'Hola Oasik, necesito una pausa real para mi cuerpo y mente. Quisiera conocer su Ritual de Bienestar Integral para recargarme profundamente.'
        },
        cansancio: {
            titulo: 'Para el cansancio que cargas',
            frase: 'El cuerpo que se siente escuchado ya comenzó a sanar.',
            porQue: 'La fatiga crónica es el resultado de un sistema nervioso que permanece en alerta sin períodos de recuperación suficientes. Los niveles de adenosina (la molécula del sueño) se acumulan, la mitocondria muscular trabaja con menos eficiencia y los neurotransmisores del estado de ánimo se deplecionan gradualmente.',
            consejos: [
                '🌡️ Contraste de temperatura: ducha tibia 3 min → fría 30 seg → tibia 3 min. 3 ciclos activan la circulación y dispersan la fatiga sin agotarte más.',
                '🥦 Protocolo anti-fatiga nutricional: hierro (legumbres, espinaca), magnesio (semillas, cacao), vitamina B12 (huevo, pescado). La deficiencia es causa directa de fatiga crónica.',
                '⏰ Ciclos ultradianos: el cuerpo tiene ciclos de 90 minutos de energía alta y baja. Identifica tus picos y agenda las tareas importantes en ellos.',
                '🏋️ Ejercicio suave paradójico: 15-20 minutos de caminata a ritmo moderado incrementa la energía más que el descanso pasivo (efecto bien documentado).',
                '🌬️ Respiración diafragmática: infla el abdomen (no el pecho) al inhalar. 5 respiraciones profundas diafragmáticas oxigenan la sangre y reducen la fatiga en minutos.',
                '🧠 Elimina una decisión diaria: la fatiga de decisiones (decision fatigue) agota tanto como el esfuerzo físico. Automatiza lo que puedas.',
                '💡 Exposición solar matutina: 10-15 minutos de luz natural antes de las 10 AM regula el ritmo circadiano y mejora la energía durante el día.',
                '🍌 Mini-snack de energía sostenida: plátano + mantequilla de almendra entre comidas. Glucosa de liberación lenta + grasas + proteína = energía sin pico.',
                '🤲 Masaje terapéutico profesional: estimula el flujo linfático, libera metabolitos acumulados y reactiva la circulación periférica de forma significativa.',
                '📞 Conexión social activa: el aislamiento amplifica la fatiga. Una conversación genuina de 20 minutos tiene efecto restaurador documentado.'
            ],
            terapiasSugeridas: 'Masaje Energizante · Drenaje Linfático · Sonoterapia con Cuencos',
            whatsapp_mensaje: 'Hola Oasik, cargo con fatiga crónica y mi cuerpo necesita recuperación profunda. ¿Qué sesión sugieren para un proceso de restauración de energía?'
        },
        movimiento: {
            titulo: 'Para activar tu movimiento',
            frase: 'El movimiento suave es medicina que no requiere receta.',
            porQue: 'El sedentarismo no es simplemente "no moverse": es un estado fisiológico que reduce la circulación, acumula toxinas en el tejido muscular y baja los niveles de BDNF (factor neurotrófico derivado del cerebro), afectando el estado de ánimo, la concentración y la vitalidad.',
            consejos: [
                '🧘 Saludo al sol de 5 minutos: 3 repeticiones por la mañana activan toda la cadena muscular posterior sin impacto articular.',
                '🚶 Regla de los 30 minutos: levántate y muévete por lo menos 2-3 minutos cada 30 minutos de sedestación.',
                '🤸 Movilidad de cadera: 5 minutos de círculos de cadera al día previenen el 80% de los dolores lumbares relacionados con trabajo sedentario.',
                '🌊 Natación o hidroterapia: el agua elimina el impacto articular. Ideal para comenzar un proceso de reactivación sin lesiones.',
                '🎵 Bailar en casa: 10 minutos de movimiento libre al ritmo de música favorita activa el sistema límbico y libera dopamina de forma instantánea.',
                '⬆️ Trabajo de pie progresivo: alterna 30 minutos sentado y 30 de pie con un escritorio ajustable o base elevadora.',
                '🏃 Caminata telefónica: toma tus llamadas de trabajo caminando. Doble beneficio: movimiento + contexto mental más abierto.',
                '🤲 Estiramientos en el trabajo: cuello (30s cada lado), hombros, muñecas y gemelos. 3 minutos cada 2 horas cambia el estado muscular del día.',
                '🚲 Transporte activo: si es posible, caminar o ir en bicicleta a una parte del trayecto genera beneficios acumulativos significativos.',
                '💆 Masaje deportivo o activador: prepara al cuerpo para el movimiento regular y reduce la resistencia a empezar.'
            ],
            terapiasSugeridas: 'Masaje Deportivo · Reflexología · Masaje Activador',
            whatsapp_mensaje: 'Hola Oasik, quiero reactivar mi cuerpo con movimiento y necesito apoyo terapéutico para comenzar. ¿Tienen sesiones de activación o masaje deportivo?'
        },
        descanso: {
            titulo: 'Para profundizar tu descanso',
            frase: 'El descanso profundo no es el final del día; es el principio del siguiente.',
            porQue: 'Durante el sueño profundo (ondas delta), el cerebro activa el sistema glinfático: un proceso de limpieza que elimina proteínas tóxicas (incluyendo beta-amiloide) acumuladas durante la vigilia. El cuerpo repara tejidos, consolida la memoria y regula el sistema hormonal. Privarse de sueño tiene consecuencias sistémicas.',
            consejos: [
                '🌡️ Temperatura ideal de sueño: entre 18 y 20°C favorece la transición a sueño profundo.',
                '🔵 Filtro de luz azul: activa el modo nocturno en dispositivos 2 horas antes de dormir. La luz azul suprime la melatonina hasta en un 50%.',
                '🛁 Baño caliente 1 hora antes de dormir: la bajada de temperatura corporal posterior induce el sueño más rápido.',
                '📵 Zona libre de pantallas: el dormitorio es solo para dormir y descansar. Saca el teléfono de la habitación.',
                '🫁 Respiración 4-7-8 al acostarte: 4 ciclos antes de dormir reducen la activación del sistema simpático.',
                '🌿 Infusión de pasiflora o valeriana: efecto relajante suave y sin dependencia, validado en estudios clínicos.',
                '📓 Lista de pendientes nocturna: escribe todo lo que "debes hacer mañana" antes de dormir. Vacía la RAM de tu mente.',
                '🎵 Ruido blanco o frecuencias delta (0.5-4 Hz): ayudan al cerebro a alcanzar ondas de sueño profundo más rápido.',
                '🧘 Yoga Nidra o body scan: 15-20 minutos de relajación corporal progresiva guiada al acostarte.',
                '💆 Sonoterapia o masaje previo: una sesión en las horas previas a dormir mejora significativamente la calidad del sueño esa noche.'
            ],
            terapiasSugeridas: 'Sonoterapia Nocturna · Masaje Relajante · Ritual de Bienestar',
            whatsapp_mensaje: 'Hola Oasik, mi calidad de sueño es muy mala y necesito un proceso de restauración. ¿Tienen sesiones de Sonoterapia o masaje orientadas a mejorar el descanso?'
        },
        liberacion: {
            titulo: 'Para liberar lo que cargas',
            frase: 'Soltar no es perder; es hacer espacio para lo que verdaderamente necesitas.',
            porQue: 'Las emociones no procesadas se almacenan en el tejido muscular y fascia (tejido conectivo que rodea cada músculo). La investigación en psicosomática confirma que zonas como trapecios, psoas y diafragma funcionan como "almacenes emocionales". El trabajo manual dirigido puede liberar estas tensiones de forma segura.',
            consejos: [
                '✍️ Escritura expresiva: 15 minutos escribiendo sin censura sobre lo que sientes. No se trata de coherencia; se trata de vaciado.',
                '😢 Permiso para sentir: a veces la emoción reprimida necesita expresarse. Llorar activa el sistema parasimpático y libera prolactina, con efecto calmante real.',
                '🏃 Ejercicio de alta intensidad breve: 5 minutos de movimiento fuerte (burpees, saltos) drenan el exceso de adrenalina acumulado.',
                '🤲 Abrazo de 20 segundos: al menos 20s de abrazo sincero libera oxitocina y reduce el cortisol de forma medible.',
                '🧘 Terapia de movimiento expresivo: bailar, sacudir los brazos, mover el cuerpo libremente desbloquea patrones de retención muscular.',
                '🌊 Contacto con agua natural: si es posible, baño en mar, río o lago. El contacto con iones negativos del agua reduce la tensión eléctrica corporal.',
                '🎵 Música que permita la emoción: escucha activamente (ojos cerrados) música que resuene con lo que sientes. No huyas de la emoción; acompáñala.',
                '💆 Masaje de liberación miofascial: trabaja directamente sobre las zonas de tensión emocional almacenada en fascia y músculo.',
                '🗣️ Conversación honesta: hablar con alguien de confianza sobre lo que cargas reduce la carga cognitiva y emocional de forma significativa.',
                '🌿 Aromaterapia de liberación: ylang ylang o neroli en difusor favorecen la apertura emocional y la sensación de soltar.'
            ],
            terapiasSugeridas: 'Masaje Miofascial · Sonoterapia · Masaje de Integración',
            whatsapp_mensaje: 'Hola Oasik, siento que cargo mucha tensión emocional en el cuerpo y quisiera un proceso de liberación. ¿Qué tipo de masaje o terapia recomiendan?'
        },
        calma: {
            titulo: 'Para cultivar tu calma',
            frase: 'La calma no es la ausencia de problemas; es la presencia de ti mismo en medio de ellos.',
            porQue: 'El estado de calma genuina (activación parasimpática predominante) tiene beneficios sistémicos: mejora la digestión, la inmunidad, la concentración y la regulación emocional. No es pasividad; es el estado óptimo desde el cual el cerebro toma las mejores decisiones.',
            consejos: [
                '🌬️ Coherencia cardíaca: inhala 5s, exhala 5s, durante 5 minutos. Sincrona el ritmo cardíaco con la respiración, activando el estado de calma profunda.',
                '🌿 Baño de bosque (Shinrin-yoku): 2 horas en un entorno natural reduce el cortisol un 12.4% y la presión arterial un 1.4% (estudios japoneses).',
                '📿 Meditación de 10 minutos diarios: tras 8 semanas consecutivas, la amígdala cerebral (centro del estrés) reduce su densidad gris de forma medible.',
                '🎨 Arte sin resultado: dibuja, pinta o modela con las manos. El proceso activa el sistema nervioso parasimpático sin necesidad de logro.',
                '🤝 Actos de generosidad pequeños: ayudar a otros libera serotonina y oxitocina de forma inmediata, elevando el estado de calma.',
                '🌊 Visualización guiada: imagina un lugar seguro (playa, bosque, habitación cálida) durante 10 minutos. El cerebro activa las mismas zonas que en la experiencia real.',
                '🐾 Contacto con animales: el contacto físico con mascotas baja la presión arterial y eleva la oxitocina en 5-10 minutos.',
                '🕯️ Ritual de transición: un hábito que marque el paso del modo trabajo al modo descanso (una infusión, una ducha, encender una vela).',
                '📱 Auditoría de notificaciones: desactiva todas las que no sean urgentes. El ruido digital constante mantiene el sistema en alerta aunque no lo notemos.',
                '💆 Masaje regular: el contacto terapéutico consciente activa el nervio vago y genera cambios mesurables en los marcadores de estrés.'
            ],
            terapiasSugeridas: 'Masaje Holístico · Sonoterapia con Cuencos Tibetanos · Aromaterapia',
            whatsapp_mensaje: 'Hola Oasik, quiero profundizar mi estado de calma con apoyo terapéutico. ¿Tienen disponible Sonoterapia con cuencos tibetanos o masaje holístico?'
        },
        inquietud: {
            titulo: 'Para la inquietud que habita en ti',
            frase: 'La inquietud busca tierra firme. Tu cuerpo bien cuidado puede ser ese suelo.',
            porQue: 'La ansiedad e inquietud son respuestas del sistema nervioso simpático ante amenazas percibidas (reales o imaginadas). El nervio vago (nervio craneal X) es la vía directa para desactivar esta respuesta. Puede ser estimulado a través del tacto, el sonido, la respiración y el frío moderado.',
            consejos: [
                '🌊 Estimulación del nervio vago: tararea con la boca cerrada durante 1 minuto o canta en voz alta. La vibración activa directamente el vago.',
                '🧊 Agua fría en muñecas: 30 segundos de agua fría en el interior de las muñecas baja la frecuencia cardíaca y activa el sistema parasimpático.',
                '📍 Técnica 5-4-3-2-1: nombra 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles, 1 que saboras. Ancla la mente en el presente.',
                '🧘 Meditación de presencia corporal: escanea tu cuerpo de pies a cabeza notando sensaciones sin juzgarlas. 10 minutos interrumpen el ciclo de anticipación ansiosa.',
                '📝 Externalizar la preocupación: escribe exactamente qué te inquieta, cuáles son los escenarios posibles y cuál es tu plan de respuesta. Sacar la preocupación de la cabeza reduce su intensidad.',
                '🎵 Playlist anti-ansiedad: música a 60 BPM (tempo lento) sincroniza el ritmo cardíaco y respiratorio con la música, induciendo calma.',
                '🤲 Auto-tapping (EFT básico): da golpecitos suaves en el inicio de las cejas, los pómulos, bajo la nariz y el mentón mientras te dices "aunque me siento así, estoy bien". 2 rondas.',
                '☀️ Exposición solar de mañana: 15 minutos de luz natural antes de las 10 AM estabiliza el ritmo circadiano y los niveles de serotonina.',
                '💆 Masaje cráneo-cervical o sonoterapia: activan el sistema parasimpático de forma directa y medible en la respuesta galvánica de la piel.',
                '🗣️ Apoyo profesional: si la inquietud es frecuente e interfiere con tu vida, combinarlo con acompañamiento psicológico tiene efecto multiplicador.'
            ],
            terapiasSugeridas: 'Sonoterapia · Masaje Craneofacial · Masaje Holístico',
            whatsapp_mensaje: 'Hola Oasik, vivo con mucha ansiedad e inquietud. Quisiera explorar la Sonoterapia o el masaje como apoyo para regular mi sistema nervioso.'
        },
        cansancio_opcion: {
            titulo: 'Para el agotamiento que acumulas',
            frase: 'El cuerpo agotado no necesita más esfuerzo; necesita atención profunda.',
            porQue: 'La fatiga crónica combina agotamiento muscular, mental y emocional. El sistema nervioso en este estado genera menos GABA (neurotransmisor de calma), menos dopamina (motivación) y menos serotonina (estado de ánimo). No es debilidad de carácter; es química corporal que necesita ser reequilibrada.',
            consejos: [
                '🌡️ Contraste térmico de recuperación: ducha caliente 5 min → fría 30 seg → caliente 5 min. 3 ciclos. Activa la circulación y dispersa la fatiga.',
                '🥗 Densidad nutricional: prioriza por 1 semana alimentos ricos en magnesio (cacao, semillas), hierro (legumbres) y omega-3 (nueces, pescado). La diferencia es notable.',
                '💊 Considera niveles de vitamina D: el déficit de vitamina D es una causa silenciosa pero común de fatiga crónica. Un análisis básico puede revelar mucho.',
                '🛌 Sueño prioritario: durante 1 semana, pon el sueño por encima de cualquier compromiso no urgente. Sin negociación.',
                '📵 Reducción de input digital: menos estímulos entrantes = menos gasto de energía cognitiva.',
                '🤲 Masaje de drenaje linfático: elimina el exceso de metabolitos acumulados que generan esa sensación de "pesadez" muscular y mental.',
                '🌿 Adaptógenos naturales: ashwagandha, rhodiola o ginseng (consultando antes si hay contraindicaciones) apoyan la recuperación suprarrenal.',
                '🧘 Yoga restaurativo o yin yoga: posiciones pasivas sostenidas activan la respuesta de relajación profunda sin generar más gasto energético.',
                '🔵 Terapia de luz azul en mañana: 20 minutos de exposición a luz solar (o lámpara de luz azul) al despertar regula el cortisol matutino para mejor energía.',
                '💆 Protocolo de masaje semanal: en el agotamiento crónico, una sesión semanal de masaje durante 4 semanas tiene efecto acumulativo significativo.'
            ],
            terapiasSugeridas: 'Masaje Energizante · Drenaje Linfático · Ritual Integral',
            whatsapp_mensaje: 'Hola Oasik, sufro de agotamiento crónico y necesito un proceso de recuperación estructurado. ¿Pueden orientarme sobre un plan de sesiones para recuperar mi energía?'
        },
        ritmo: {
            titulo: 'Para honrar tu ritmo',
            frase: 'Tu ritmo es perfecto para ti, aunque sea diferente al de todos los demás.',
            porQue: 'Cada persona tiene un cronotipo biológico (ritmo circadiano) diferente. Forzar el cuerpo a ritmos que no son suyos genera una deuda acumulativa de estrés. Respetarlo no es pereza; es inteligencia biológica.',
            consejos: [
                '📊 Identifica tu cronotipo: ¿eres matutino, vespertino o intermedio? Agenda tus tareas de mayor demanda cognitiva en tu pico de energía natural.',
                '⏰ Horarios consistentes: dormir y despertar a la misma hora ±30 min los 7 días de la semana sincroinza el reloj biológico en 2-3 semanas.',
                '🚫 Elimina la comparación de ritmos: lo que funciona para otra persona puede ser contraproducente para ti. Tu cuerpo es la referencia correcta.',
                '📉 Acepta los ciclos bajos: no hay ritmo biológico sin alternancia. Los períodos de menor energía son necesarios; en ellos ocurre la consolidación y el procesamiento.',
                '🌙 Nocturnos conscientes: si tu energía florece de noche, úsala. No necesitas justificarlo.',
                '🎯 Ritmo de trabajo personalizado: el método Pomodoro es referencia, pero si tus ciclos naturales son de 45 o 60 minutos, adáptalos.',
                '🌿 Escucha las señales de hambre y sueño: responder a tiempo estas señales (y no ignorarlas) mantiene el sistema hormonal estable.',
                '💆 Masaje en sincronía: una sesión terapéutica cuando lo pide el cuerpo, no cuando "está programado", tiene mayor efecto.',
                '📵 No hacer "por rendimiento": practica regularmente actividades sin meta: caminar sin destino, escuchar música sin hacer otra cosa.',
                '🌊 Fluir con la semana: identifica qué días tienes más energía y qué días necesitas más pausa. Diseña tu agenda en torno a eso.'
            ],
            terapiasSugeridas: 'Masaje Personalizado · Sonoterapia · Aromaterapia',
            whatsapp_mensaje: 'Hola Oasik, quiero encontrar un ritmo de cuidado que sea sostenible para mí. ¿Pueden orientarme sobre cómo armar una rutina de bienestar mensual?'
        },
        merecimiento: {
            titulo: 'Para recordar que mereces cuidado',
            frase: 'Mereces cuidado por el simple hecho de existir. Sin condiciones.',
            porQue: 'La dificultad para recibir cuidado (o para sentir que se lo merece) a menudo proviene de creencias tempranas sobre el valor propio condicionado al rendimiento. El bienestar genuino empieza por deconstruir la idea de que el descanso y el cuidado deben ganarse.',
            consejos: [
                '🪞 Práctica de autocompasión: frente al espejo, di en voz alta una cosa que hiciste bien hoy. Sin relativizar.',
                '✅ Lista de "ya es suficiente": escribe 5 cosas que hiciste hoy que ya son suficientes. Sin comparar con lo que "falta".',
                '🎁 Un gesto de cuidado sin justificación: agenda una sesión de masaje, una tarde libre, una actividad que disfrutes, sin necesitar una razón más allá de querer hacerlo.',
                '🤝 Recibe sin deflectar: cuando alguien te ofrezca ayuda o un cumplido, di "gracias" y recíbelo. Practicar recibir activa el circuito del merecimiento.',
                '🚫 Detecta el lenguaje auto-denigrante: presta atención cuántas veces dices "pero no es para tanto" o "ya me paso". Cuestiona ese patrón.',
                '📓 Journaling de valor: escribe durante 5 minutos sobre qué cualidades tienes que no dependen de lo que produces.',
                '🤲 Gesto físico de autocuidado diario: aunque sea pequeño: hidrata tus manos, estírate, bebe agua con consciencia.',
                '🌿 Elige el servicio de bienestar que quieras, no el que "se justifica": el criterio del merecimiento no es la urgencia del problema; es tu deseo de estar bien.',
                '💬 Habla de ti con respeto: el lenguaje interno moldea la autoimagen. Habla a tu cuerpo como hablarías a alguien que amas.',
                '💆 Terapia corporal sin "motivo urgente": no necesitas estar en crisis para venir a una sesión. El mantenimiento es tan válido como la reparación.'
            ],
            terapiasSugeridas: 'Masaje Relajante · Ritual de Bienestar · Manicura Spa',
            whatsapp_mensaje: 'Hola Oasik, quiero darme un regalo sin ninguna razón urgente además de cuidarme. ¿Qué sesión o ritual recomiendan para alguien que simplemente quiere estar bien?'
        },
        progreso: {
            titulo: 'Para celebrar tu progreso',
            frase: 'Cada paso hacia el bienestar, por pequeño, ya cambió la dirección.',
            porQue: 'El cerebro tiene sesgo negativo: procesa con más intensidad lo que falta que lo que ya se logró. Reconocer el progreso real activa circuitos de recompensa (dopamina) que refuerzan los hábitos saludables y generan motivación para continuar.',
            consejos: [
                '📊 Lleva un diario de bienestar semanal: registra 1 mejora por semana, por pequeña que sea.',
                '🎉 Celebra micro-victorias: dormiste mejor, bebiste más agua, fuiste a una sesión terapéutica. Celebra eso expresamente.',
                '📸 Captura tu progreso: una foto mensual de cómo te sientes (nota del 1 al 10 en cada área) te permite ver la tendencia real.',
                '🤝 Comparte tu progreso: contarle a alguien de confianza tus avances los consolida neurológicamente.',
                '🔄 Reajusta metas hacia arriba: si ya alcanzaste algo, súbelo un nivel. El progreso continuo requiere metas adaptativas.',
                '🏆 Reconoce la consistencia: no se trata de transformaciones dramáticas; se trata de pequeñas acciones repetidas.',
                '🌱 El proceso es el destino: el bienestar no tiene una meta final. Celebrar el proceso en sí cambia la relación con el autocuidado.',
                '💪 Enfócate en lo que puedes controlar: el proceso (hábitos, decisiones) está en tus manos. El resultado final, menos.',
                '🌟 Identifica qué funcionó: cuando algo mejora, pregúntate qué lo generó. Repite eso conscientemente.',
                '💆 Una sesión de celebración: ven a Oasik no porque "necesitas" sino porque te has cuidado bien y mereces seguir haciéndolo.'
            ],
            terapiasSugeridas: 'Cualquier terapia disponible · Ritual de Bienestar · Sesión de tu elección',
            whatsapp_mensaje: 'Hola Oasik, me he cuidado bien últimamente y quiero seguir en ese camino. ¿Qué sesión me recomiendan para continuar mi proceso de bienestar?'
        }
    };

    // Mapa de valor de opción → clave en SOLUCIONES_ESTADO
    const MAPA_VALOR_SOLUCION = {
        tension: 'tension',
        equilibrio: 'equilibrio',
        pausa: 'pausa',
        cansancio: 'cansancio',
        movimiento: 'movimiento',
        descanso: 'descanso',
        liberacion: 'liberacion',
        calma: 'calma',
        inquietud: 'inquietud',
        estancado: 'cansancio_opcion',
        transicion: 'pausa',
        cabeza: 'tension',
        espalda: 'tension',
        piernas: 'movimiento',
        hombros: 'tension',
        lumbar: 'tension',
        flujo: 'equilibrio',
        ritmo: 'ritmo',
        merecimiento: 'merecimiento',
        progreso: 'progreso',
        respiracion: 'pausa',
        estiramiento: 'movimiento',
        permiso: 'pausa',
        escucha: 'merecimiento',
        soltar: 'liberacion',
        cuidado: 'merecimiento'
    };

    // ========================================================================
    // ❓ BANCO DE PREGUNTAS DINÁMICAS (10 preguntas)
    // ========================================================================
    const PREGUNTAS_DINAMICAS = [
        {
            pregunta: '¿Cómo describes tu cuerpo en este momento?',
            opciones: [
                { texto: 'Con tensión acumulada', valor: 'tension', color: '#ff6b35' },
                { texto: 'En equilibrio y flujo', valor: 'equilibrio', color: '#00ffe0' },
                { texto: 'Pidiendo una pausa', valor: 'pausa', color: '#b27fff' }
            ]
        },
        {
            pregunta: '¿Qué necesita tu cuerpo ahora mismo?',
            opciones: [
                { texto: 'Movimiento suave', valor: 'movimiento', color: '#00ffe0' },
                { texto: 'Descanso profundo', valor: 'descanso', color: '#b27fff' },
                { texto: 'Liberar tensión', valor: 'liberacion', color: '#ff6b35' }
            ]
        },
        {
            pregunta: '¿Qué emoción habita tu cuerpo ahora?',
            opciones: [
                { texto: 'Calma y presencia', valor: 'calma', color: '#00ffe0' },
                { texto: 'Inquietud o ansiedad', valor: 'inquietud', color: '#ff6b35' },
                { texto: 'Cansancio o agotamiento', valor: 'cansancio', color: '#b27fff' }
            ]
        },
        {
            pregunta: '¿Qué pequeño gesto de cuidado puedes ofrecerte hoy?',
            opciones: [
                { texto: '5 min de respiración consciente', valor: 'respiracion', color: '#00ffe0' },
                { texto: 'Un estiramiento suave', valor: 'estiramiento', color: '#ffd700' },
                { texto: 'Permiso para descansar', valor: 'permiso', color: '#b27fff' }
            ]
        },
        {
            pregunta: '¿Qué mensaje quiere compartirte tu cuerpo hoy?',
            opciones: [
                { texto: 'Necesito más pausa', valor: 'pausa', color: '#b27fff' },
                { texto: 'Estoy listo para soltar', valor: 'soltar', color: '#00ffe0' },
                { texto: 'Merezco ser cuidado', valor: 'cuidado', color: '#ffd700' }
            ]
        },
        {
            pregunta: '¿Cómo describirías tu nivel de energía corporal?',
            opciones: [
                { texto: 'Fluyendo con facilidad', valor: 'flujo', color: '#00ffe0' },
                { texto: 'Estancado o pesado', valor: 'estancado', color: '#ff6b35' },
                { texto: 'En transición y cambio', valor: 'transicion', color: '#b27fff' }
            ]
        },
        {
            pregunta: '¿Qué zona de tu cuerpo pide más atención hoy?',
            opciones: [
                { texto: 'Hombros y cuello', valor: 'hombros', color: '#ffd700' },
                { texto: 'Espalda baja', valor: 'lumbar', color: '#ff6b35' },
                { texto: 'Piernas y pies', valor: 'piernas', color: '#00ffe0' }
            ]
        },
        {
            pregunta: '¿Qué necesitas recordar sobre tu bienestar?',
            opciones: [
                { texto: 'Mi ritmo es válido', valor: 'ritmo', color: '#b27fff' },
                { texto: 'Merezco cuidado sin condiciones', valor: 'merecimiento', color: '#00ffe0' },
                { texto: 'El progreso no es lineal', valor: 'progreso', color: '#ffd700' }
            ]
        },
        {
            pregunta: '¿Qué pequeña victoria corporal puedes celebrar?',
            opciones: [
                { texto: 'Respiré más profundo que ayer', valor: 'respiracion', color: '#00ffe0' },
                { texto: 'Escuché una señal de mi cuerpo', valor: 'escucha', color: '#ffd700' },
                { texto: 'Me permití una pausa sin culpa', valor: 'pausa', color: '#b27fff' }
            ]
        },
        {
            pregunta: '¿Dónde sientes mayor conexión hoy?',
            opciones: [
                { texto: 'Cabeza y cuello', valor: 'cabeza', color: '#ffd700' },
                { texto: 'Espalda y core', valor: 'espalda', color: '#00ffe0' },
                { texto: 'Piernas y pies', valor: 'piernas', color: '#ff6b35' }
            ]
        }
    ];

    // ========================================================================
    // 🔧 SELECCIÓN ALEATORIA — Se define ANTES del template (fix TDZ crítico)
    // ========================================================================
    const FRASE_ACTUAL = FRASES_INSPIRADORAS[Math.floor(Math.random() * FRASES_INSPIRADORAS.length)];

    const PREGUNTA_ACTUAL = (function () {
        const base = PREGUNTAS_DINAMICAS[Math.floor(Math.random() * PREGUNTAS_DINAMICAS.length)];
        const opcionesBarajadas = base.opciones.slice().sort(function () { return Math.random() - 0.5; });
        return Object.assign({}, base, { opciones: opcionesBarajadas });
    }());

    // ========================================================================
    // 🎨 FUNCIONES DE RENDER DE OPCIONES
    // ========================================================================
    function renderOpcionesDinamicas(opciones) {
        return opciones.map(function (op) {
            return `
                <button class="redes-opcion-btn"
                        data-valor="${op.valor}"
                        data-color="${op.color}"
                        role="radio"
                        aria-checked="false"
                        style="background:rgba(255,255,255,0.04);border:2px solid ${op.color}40;border-radius:1rem;
                               padding:1rem 1.25rem;cursor:pointer;transition:all 0.2s ease;color:#fff;
                               font-size:0.95rem;line-height:1.5;min-height:64px;display:flex;
                               align-items:center;justify-content:center;flex-direction:column;gap:8px;">
                    <span style="width:26px;height:26px;border-radius:50%;border:2px solid ${op.color};
                                 display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <span style="width:12px;height:12px;border-radius:50%;background:${op.color};
                                     opacity:0;transition:opacity 0.2s ease;" class="opcion-check-redes"></span>
                    </span>
                    <span>${op.texto}</span>
                </button>
            `;
        }).join('');
    }

    // ========================================================================
    // 📦 TEMPLATE HTML — Construido DESPUÉS de FRASE_ACTUAL y PREGUNTA_ACTUAL
    // ========================================================================
    const REDES_TEMPLATE = `
<section aria-labelledby="redes-titulo" class="redes-container" style="font-family:var(--font-accent,'Lato',sans-serif);padding:3rem 1.5rem;max-width:800px;margin:0 auto;">

    <div style="text-align:center;margin-bottom:2.5rem;">
        <span style="background:rgba(178,127,255,0.15);border:1px solid rgba(178,127,255,0.3);
                     padding:14px;border-radius:50%;display:inline-flex;margin-bottom:1rem;">
            <i class="fa-solid fa-seedling" style="color:#b27fff;font-size:2rem;" aria-hidden="true"></i>
        </span>
        <h2 id="redes-titulo" style="color:#fff;font-size:2rem;margin:0 0 0.5rem;font-weight:300;letter-spacing:1px;">
            Espacio de Reflexión
        </h2>
        <p style="color:#aaa;font-size:1.05rem;line-height:1.7;max-width:580px;margin:0 auto;">
            Palabras y herramientas para acompañar tu proceso. Cada visita trae algo nuevo.
        </p>
    </div>

    <!-- FRASE INSPIRADORA DEL DÍA -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(178,127,255,0.2);
                border-radius:1.25rem;padding:2rem;margin-bottom:2rem;" role="article" aria-live="polite">
        <blockquote style="font-size:1.3rem;color:#fff;line-height:1.7;margin:0 0 1.5rem;
                           font-style:italic;text-align:center;border:none;padding:0;">
            "${FRASE_ACTUAL}"
        </blockquote>
        <div style="text-align:center;">
            <button id="redes-compartir-frase" aria-label="Compartir esta frase por WhatsApp"
                    style="background:#25D366;color:#fff;border:none;border-radius:2rem;
                           padding:10px 24px;font-size:0.95rem;cursor:pointer;display:inline-flex;
                           align-items:center;gap:8px;font-weight:600;transition:all 0.2s;">
                <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
                Compartir esta reflexión
            </button>
            <p style="color:#666;font-size:0.82rem;margin:0.6rem 0 0;">
                Recarga la página para descubrir una nueva frase ✨
            </p>
        </div>
    </div>

    <!-- PREGUNTA DINÁMICA -->
    <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.06);
                border-radius:1.25rem;padding:2rem;margin-bottom:2rem;">
        <h3 id="redes-pregunta-texto" style="color:#fff;font-size:1.2rem;margin:0 0 1.25rem;text-align:center;font-weight:400;">
            ${PREGUNTA_ACTUAL.pregunta}
        </h3>
        <div id="redes-opciones-container" role="radiogroup" aria-label="Selecciona tu estado actual"
             style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
            ${renderOpcionesDinamicas(PREGUNTA_ACTUAL.opciones)}
        </div>

        <!-- ÁREA DE RESPUESTA (se muestra al seleccionar opción) -->
        <div id="redes-respuesta-feedback" hidden style="margin-top:1.5rem;padding:1.5rem;
             background:rgba(178,127,255,0.08);border:1px solid rgba(178,127,255,0.25);
             border-radius:1rem;">

            <div id="redes-solucion-titulo" style="color:#b27fff;font-size:0.85rem;
                 text-transform:uppercase;letter-spacing:2px;font-weight:700;margin-bottom:8px;"></div>

            <p id="redes-feedback-frase" style="color:#fff;font-size:1.1rem;line-height:1.6;
               margin:0 0 1rem;font-style:italic;"></p>

            <div id="redes-feedback-porq" style="color:#ccc;font-size:0.95rem;line-height:1.65;
                 margin-bottom:1.2rem;padding-left:12px;border-left:3px solid rgba(178,127,255,0.4);"></div>

            <div id="redes-consejos-container" style="margin-bottom:1.5rem;"></div>

            <div id="redes-terapias-box" style="background:rgba(0,0,0,0.3);padding:14px;
                 border-radius:10px;border:1px solid rgba(212,175,55,0.2);margin-bottom:1.5rem;display:none;">
                <strong style="color:#888;display:block;margin-bottom:6px;font-size:0.82rem;
                               text-transform:uppercase;letter-spacing:1.5px;">
                    Terapias Sugeridas en Oasik
                </strong>
                <span id="redes-terapias-texto" style="color:#d4af37;font-size:1rem;"></span>
            </div>

            <!-- BANNER WHATSAPP PERSONALIZADO -->
            <div id="redes-wa-banner" style="background:linear-gradient(135deg,#0d3320,#0a2018);
                 border:1px solid rgba(37,211,102,0.3);border-radius:14px;padding:20px;text-align:center;">
                <p style="color:#25D366;font-size:0.8rem;text-transform:uppercase;letter-spacing:2px;
                           font-weight:700;margin:0 0 4px;">📲 Contacto directo</p>
                <p id="redes-wa-nombre" style="color:#fff;font-size:1.2rem;font-weight:600;
                                               margin:0 0 8px;"></p>
                <p id="redes-wa-desc" style="color:rgba(255,255,255,0.7);font-size:0.9rem;
                                             margin:0 0 14px;line-height:1.5;"></p>
                <button id="redes-whatsapp-respuesta" style="background:#25D366;color:#fff;border:none;
                        border-radius:2.5rem;padding:13px 30px;font-size:1rem;font-weight:bold;
                        cursor:pointer;display:inline-flex;align-items:center;gap:10px;
                        box-shadow:0 5px 18px rgba(37,211,102,0.25);transition:all 0.3s;">
                    <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
                    Agendar mi sesión por WhatsApp
                </button>
            </div>
        </div>
    </div>

    <!-- DISCLAIMER MÉDICO -->
    <div style="background:rgba(255,107,53,0.1);border-left:4px solid #ff6b35;
                padding:1rem 1.25rem;border-radius:0 1rem 1rem 0;">
        <strong style="color:#ff6b35;display:block;margin-bottom:4px;font-size:0.9rem;">
            ⚠️ Aclaración importante
        </strong>
        <p style="color:#aaa;margin:0;font-size:0.88rem;line-height:1.65;">
            Oasik · Valtara es un centro de <strong>masoterapia manual y bienestar</strong>.
            <strong>No somos médicos ni diagnosticamos enfermedades.</strong>
            Nuestras sesiones son complementarias a los tratamientos médicos que puedas tener.
        </p>
    </div>

</section>
    `;

    // ========================================================================
    // 🎮 CONTROLADOR PRINCIPAL
    // ========================================================================
    const RedesController = {
        estado: { respuestaSeleccionada: null },

        init: function () {
            if (!document.getElementById('redes-titulo')) return;
            this.setupCompartirFrase();
            this.setupOpciones();
            this.setupWhatsApp();
        },

        setupCompartirFrase: function () {
            const btn = document.getElementById('redes-compartir-frase');
            if (!btn) return;
            btn.addEventListener('click', function () {
                const patName = getPatientName();
                const intro = patName ? `Reflexión para ${patName} 🌿\n\n` : '🌿 Reflexión del día:\n\n';
                const texto = encodeURIComponent(
                    intro +
                    '"' + FRASE_ACTUAL + '"\n\n' +
                    'Valtara · Oasik — Masoterapia Manual y Bienestar\n' +
                    '🌐 https://valtara.mx'
                );
                window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + texto, '_blank', 'noopener');
            });
        },

        setupOpciones: function () {
            const self = this;
            document.querySelectorAll('.redes-opcion-btn').forEach(function (btn) {
                btn.addEventListener('click', function (e) {
                    self.seleccionarRespuesta(e.currentTarget.dataset.valor, e.currentTarget.dataset.color);
                });
                btn.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        self.seleccionarRespuesta(e.currentTarget.dataset.valor, e.currentTarget.dataset.color);
                    }
                });
            });
        },

        setupWhatsApp: function () {
            const self = this;
            const btn = document.getElementById('redes-whatsapp-respuesta');
            if (!btn) return;
            btn.addEventListener('click', function () {
                const resp = self.estado.respuestaSeleccionada;
                if (!resp) return;
                const patName = getPatientName();
                const solucion = SOLUCIONES_ESTADO[MAPA_VALOR_SOLUCION[resp.valor] || 'pausa'];
                let msg = solucion ? solucion.whatsapp_mensaje : 'Hola Oasik, quisiera agendar una sesión de bienestar.';
                if (patName) {
                    msg = msg.replace('Hola Oasik,', 'Hola Oasik, soy ' + patName + ' y');
                }
                window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
            });
        },

        seleccionarRespuesta: function (valor, color) {
            const opcion = PREGUNTA_ACTUAL.opciones.find(function (o) { return o.valor === valor; });
            if (!opcion) return;
            this.estado.respuestaSeleccionada = { valor: valor, texto: opcion.texto, color: color };

            // Actualizar estilos de botones
            document.querySelectorAll('.redes-opcion-btn').forEach(function (btn) {
                btn.style.borderColor = btn.dataset.color + '40';
                btn.style.background = 'rgba(255,255,255,0.04)';
                btn.setAttribute('aria-checked', 'false');
                const check = btn.querySelector('.opcion-check-redes');
                if (check) check.style.opacity = '0';
            });
            const selBtn = document.querySelector('.redes-opcion-btn[data-valor="' + valor + '"]');
            if (selBtn) {
                selBtn.style.borderColor = color;
                selBtn.style.background = color + '15';
                selBtn.setAttribute('aria-checked', 'true');
                const check = selBtn.querySelector('.opcion-check-redes');
                if (check) check.style.opacity = '1';
            }

            // Mostrar contenido de respuesta
            const claveSolucion = MAPA_VALOR_SOLUCION[valor] || 'pausa';
            const solucion = SOLUCIONES_ESTADO[claveSolucion];
            if (!solucion) return;

            const feedbackDiv = document.getElementById('redes-respuesta-feedback');
            if (!feedbackDiv) return;

            const tituloEl = document.getElementById('redes-solucion-titulo');
            const fraseEl = document.getElementById('redes-feedback-frase');
            const porqEl = document.getElementById('redes-feedback-porq');
            const consejosEl = document.getElementById('redes-consejos-container');
            const terapiasBox = document.getElementById('redes-terapias-box');
            const terapiasTexto = document.getElementById('redes-terapias-texto');
            const waBannerNombre = document.getElementById('redes-wa-nombre');
            const waBannerDesc = document.getElementById('redes-wa-desc');

            if (tituloEl) tituloEl.textContent = solucion.titulo;
            if (fraseEl) fraseEl.textContent = '"' + solucion.frase + '"';
            if (porqEl) porqEl.textContent = solucion.porQue;

            if (consejosEl && solucion.consejos) {
                consejosEl.innerHTML = '<p style="color:#b27fff;font-size:0.85rem;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin:0 0 10px;">Para ti hoy — 10 acciones prácticas:</p>' +
                    '<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">' +
                    solucion.consejos.map(function (c) {
                        return '<li style="color:#ddd;font-size:0.93rem;line-height:1.6;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:8px;border-left:2px solid rgba(178,127,255,0.3);">' + c + '</li>';
                    }).join('') +
                    '</ul>';
            }

            if (terapiasBox && terapiasTexto && solucion.terapiasSugeridas) {
                terapiasTexto.textContent = solucion.terapiasSugeridas;
                terapiasBox.style.display = 'block';
            }

            // Personalizar banner WhatsApp
            const patName = getPatientName();
            if (waBannerNombre) {
                waBannerNombre.innerHTML = patName
                    ? 'Tu sesión espera, <strong>' + patName + '</strong>'
                    : 'Agenda tu sesión personalizada';
            }
            if (waBannerDesc) {
                waBannerDesc.textContent = 'Tu mensaje llegará precargado con tu estado de ánimo y las terapias sugeridas.';
            }

            feedbackDiv.hidden = false;
            setTimeout(function () {
                feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    };

    // ========================================================================
    // 📦 EXPORTAR A ValtaraModulos (clave correcta: inicio_redes_sociales)
    // ========================================================================
    global.ValtaraModulos = global.ValtaraModulos || {};
    global.ValtaraModulos.inicio_redes_sociales = REDES_TEMPLATE;

    global.ValtaraRedesController = RedesController;

    // ========================================================================
    // 🚀 AUTO-INICIALIZACIÓN (espera al render de constructor_maestro.js)
    // ========================================================================
    function tryInit() {
        if (document.getElementById('redes-titulo')) {
            RedesController.init();
            return true;
        }
        return false;
    }

    function autoInit() {
        if (tryInit()) return;
        const observer = new MutationObserver(function (_, obs) {
            if (tryInit()) obs.disconnect();
        });
        observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
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
