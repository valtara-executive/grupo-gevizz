/**
 * VALTARA — TRIAGE INTERACTIVO CORPORAL V2.0
 * Módulo: js/inicio_mapa_cuerpo.js
 * 
 * ✅ Cascada de información progresiva (no mapa 3D)
 * ✅ Selección guiada de zonas con malestar
 * ✅ Mensajes WhatsApp predefinidos con contexto clínico
 * ✅ Disclaimers claros: NO somos médicos, NO somos podólogos
 * ✅ Diseño elegante, accesible y optimizado para retinosis pigmentaria
 * ✅ Exporta a window.ValtaraModulos.inicio_mapa_cuerpo (compatibilidad total)
 */

(function(global) {
  'use strict';

  // ========================================
  // ⚠️ DISCLAIMER MÉDICO - CRÍTICO
  // ========================================
  const DISCLAIMER_MEDICO = `
    <div style="background:rgba(255,107,53,0.12);border-left:4px solid #ff6b35;padding:1rem 1.25rem;border-radius:0 1rem 1rem 0;margin:1.5rem 0;font-size:0.9rem;">
      <p style="color:var(--valtara-gris-texto, #aaa);margin:0;line-height:1.6;">
        <strong style="color:#ff6b35;display:block;margin-bottom:0.25rem;">⚠️ Aviso importante:</strong>
        Valtara es un centro de <strong>masoterapia manual y bienestar</strong>. 
        <strong>No somos médicos, no somos podólogos, no diagnosticamos enfermedades.</strong> 
        Nuestras sesiones son complementarias a tratamientos médicos. 
        Si presentas dolor agudo, inflamación severa o síntomas neurológicos, 
        consulta primero a un profesional de la salud certificado.
      </p>
    </div>
  `;

  // ========================================
  // 🗂️ BASE DE DATOS DE ZONAS CORPORALES
  // ========================================
  const ZONAS_TRIAGE = {
    // ===== CABEZA Y CUELLO =====
    cabeza: {
      id: 'cabeza',
      titulo: 'Cabeza y región craneal',
      icono: 'fa-head-side',
      color: '#00ffe0',
      nivel1: '¿Qué tipo de molestia sientes?',
      opciones1: [
        { id: 'cabeza_tension', texto: 'Presión o tensión en sienes/frente', siguiente: 'cabeza_tension' },
        { id: 'cabeza_mareo', texto: 'Mareo, vértigo o inestabilidad', siguiente: 'cabeza_mareo' },
        { id: 'cabeza_fatiga', texto: 'Pesadez, fatiga mental o niebla', siguiente: 'cabeza_fatiga' }
      ],
      niveles: {
        cabeza_tension: {
          descripcion: 'La tensión craneal suele relacionarse con contracturas en músculos suboccipitales, trapecio superior y fascia temporal.',          causas: ['Estrés ejecutivo crónico', 'Bruxismo nocturno', 'Postura cervical anteriorizada', 'Deshidratación tisular'],
          protocolo: 'Liberación miofascial suboccipital + drenaje linfático craneal + educación postural (25 min)',
          whatsapp: `Hola Valtara 👋 Me interesa una sesión para tensión en cabeza. Entiendo que es masoterapia complementaria, no médica. ¿Me comparten disponibilidad?`
        },
        cabeza_mareo: {
          descripcion: 'Los mareos pueden vincularse a restricciones en la columna cervical alta o desequilibrios del sistema vestibular.',
          causas: ['Hipertonía de suboccipitales', 'Cambios bruscos de postura', 'Fatiga visual por pantallas', 'Ansiedad situacional'],
          protocolo: 'Movilización suave de atlas + integración vestibular + reeducación postural (30 min)',
          whatsapp: `Hola Valtara 👋 Tengo mareos ocasionales y me gustaría explorar sesiones de masoterapia para equilibrio cervical. ¿Qué opciones tienen?`
        },
        cabeza_fatiga: {
          descripcion: 'La fatiga craneal refleja sobrecarga del sistema nervioso y acumulación de metabolitos en tejidos blandos.',
          causas: ['Sueño no reparador', 'Sobrecarga cognitiva', 'Alimentación inflamatoria', 'Estrés oxidativo'],
          protocolo: 'Drenaje linfático craneal + neuromodulación vagal + educación en higiene del sueño (35 min)',
          whatsapp: `Hola Valtara 👋 Siento fatiga mental constante y me gustaría probar una sesión de liberación craneal. ¿Agendo cita?`
        }
      },
      disclaimer: 'Si los mareos son frecuentes, con pérdida de conciencia o visión doble, acude primero a un neurólogo.'
    },

    cuello: {
      id: 'cuello',
      titulo: 'Cuello y columna cervical',
      icono: 'fa-necktie',
      color: '#ffd700',
      nivel1: '¿Dónde localizas la molestia?',
      opciones1: [
        { id: 'cuello_nuca', texto: 'Nuca y base del cráneo', siguiente: 'cuello_nuca' },
        { id: 'cuello_lateral', texto: 'Laterales del cuello (trapecios)', siguiente: 'cuello_lateral' },
        { id: 'cuello_frente', texto: 'Parte frontal (esternocleidomastoideo)', siguiente: 'cuello_frente' }
      ],
      niveles: {
        cuello_nuca: {
          descripcion: 'La tensión suboccipital es una de las causas más frecuentes de cefalea tensional y rigidez matutina.',
          causas: ['Postura de cabeza adelantada', 'Uso prolongado de dispositivos', 'Almohada inadecuada', 'Estrés emocional'],
          protocolo: 'Liberación de suboccipitales + movilización de atlas + educación ergonómica (25 min)',
          whatsapp: `Hola Valtara 👋 Tengo tensión en la nuca que me causa rigidez. Me interesa una sesión de liberación cervical. ¿Disponibilidad?`
        },
        cuello_lateral: {
          descripcion: 'Los trapecios superiores hipersensibles reflejan sobrecarga por estrés y patrones respiratorios alterados.',
          causas: ['Sostener teléfono con hombro', 'Respiración apical crónica', 'Estrés laboral agudo', 'Ansiedad'],
          protocolo: 'Isquemia de puntos gatillo + estiramiento neuromuscular + reeducación diafragmática (30 min)',
          whatsapp: `Hola Valtara 👋 Mis trapecios están muy tensos y me duelen los hombros. ¿Puedo agendar una sesión de liberación?`
        },
        cuello_frente: {
          descripcion: 'El esternocleidomastoideo tenso puede generar sensación de opresión garganta y dificultad para girar la cabeza.',
          causas: ['Respiración bucal crónica', 'Postura de estrés (hombros elevados)', 'Bruxismo', 'Deshidratación'],
          protocolo: 'Liberación suave de ECM + integración respiratoria + educación postural (25 min)',
          whatsapp: `Hola Valtara 👋 Siento opresión en el cuello frontal y dificultad para girar. ¿Ofrecen sesiones para esta zona?`
        }      },
      disclaimer: 'Si hay dolor irradiado a brazos, hormigueo o debilidad muscular, consulta primero a un especialista en columna.'
    },

    // ===== HOMBROS Y BRAZOS =====
    hombros: {
      id: 'hombros',
      titulo: 'Hombros y región escapular',
      icono: 'fa-person-dress',
      color: '#ffd700',
      nivel1: '¿Qué sientes en tus hombros?',
      opciones1: [
        { id: 'hombros_rigidez', texto: 'Rigidez y dificultad para mover', siguiente: 'hombros_rigidez' },
        { id: 'hombros_dolor', texto: 'Dolor al levantar el brazo', siguiente: 'hombros_dolor' },
        { id: 'hombros_cansancio', texto: 'Cansancio constante en la zona', siguiente: 'hombros_cansancio' }
      ],
      niveles: {
        hombros_rigidez: {
          descripcion: 'La rigidez escapular suele indicar acortamiento de pectoral menor y debilidad de serrato anterior.',
          causas: ['Postura cifótica prolongada', 'Entrenamiento desbalanceado', 'Estrés emocional crónico', 'Sedentarismo'],
          protocolo: 'Liberación de pectoral menor + activación de serrato + movilización escapular (35 min)',
          whatsapp: `Hola Valtara 👋 Tengo los hombros rígidos y me cuesta moverlos. ¿Me ayudan con una sesión de liberación escapular?`
        },
        hombros_dolor: {
          descripcion: 'El dolor al elevar el brazo puede relacionarse con pinzamiento subacromial o tendinopatía del supraespinoso.',
          causas: ['Movimientos repetitivos de elevación', 'Desequilibrio de manguito rotador', 'Mala técnica deportiva'],
          protocolo: 'Liberación de manguito rotador + movilización glenohumeral + ejercicios de control motor (40 min)',
          whatsapp: `Hola Valtara 👋 Me duele el hombro al levantar el brazo. ¿Puedo agendar una evaluación de masoterapia para esta zona?`
        },
        hombros_cansancio: {
          descripcion: 'El cansancio escapular refleja sobrecarga compensatoria por debilidad de la core y patrones respiratorios alterados.',
          causas: ['Respiración apical crónica', 'Debilidad de core', 'Estrés laboral', 'Falta de pausas activas'],
          protocolo: 'Reeducación diafragmática + activación de core + liberación miofascial dorsal (35 min)',
          whatsapp: `Hola Valtara 👋 Mis hombros se cansan muy rápido. Me gustaría una sesión para mejorar resistencia y postura. ¿Agendo?`
        }
      },
      disclaimer: 'Si hay chasquidos dolorosos, inestabilidad o pérdida de fuerza, consulta a un traumatólogo antes de iniciar terapia manual.'
    },

    // ===== ESPALDA =====
    espalda: {
      id: 'espalda',
      titulo: 'Espalda y columna torácica',
      icono: 'fa-person-dress-burst',
      color: '#ffd700',
      nivel1: '¿En qué zona de la espalda sientes molestia?',
      opciones1: [
        { id: 'espalda_alta', texto: 'Parte alta (entre escápulas)', siguiente: 'espalda_alta' },
        { id: 'espalda_media', texto: 'Parte media (zona dorsal)', siguiente: 'espalda_media' },
        { id: 'espalda_baja', texto: 'Parte baja (lumbar)', siguiente: 'espalda_baja' }      ],
      niveles: {
        espalda_alta: {
          descripcion: 'La tensión interescapular refleja sobrecarga de romboides y trapecio medio por postura cifótica.',
          causas: ['Uso prolongado de laptop', 'Estrés emocional', 'Debilidad de serrato anterior', 'Respiración superficial'],
          protocolo: 'Liberación de romboides + movilización torácica + reeducación postural (35 min)',
          whatsapp: `Hola Valtara 👋 Tengo tensión entre los omóplatos. ¿Me pueden ayudar con una sesión de liberación dorsal?`
        },
        espalda_media: {
          descripcion: 'La restricción torácica limita la rotación espinal y afecta la mecánica respiratoria.',
          causas: ['Sedentarismo en rotación', 'Patrones respiratorios alterados', 'Estrés crónico', 'Falta de movilidad'],
          protocolo: 'Liberación de fascia toracolumbar + movilización rotacional + integración respiratoria (40 min)',
          whatsapp: `Hola Valtara 👋 Siento rigidez en la espalda media y me cuesta respirar profundo. ¿Agendo sesión de movilidad torácica?`
        },
        espalda_baja: {
          descripcion: 'El dolor lumbar miofascial suele vincularse a puntos gatillo en cuadrado lumbar y sobrecarga por sedentarismo.',
          causas: ['Sentarse prolongado', 'Levantamiento inadecuado de cargas', 'Estrés emocional', 'Debilidad de core'],
          protocolo: 'Liberación de cuadrado lumbar + movilización lumbar + educación en mecánica corporal (40 min)',
          whatsapp: `Hola Valtara 👋 Me duele la zona lumbar después de estar sentado. ¿Puedo agendar una sesión de liberación lumbar?`
        }
      },
      disclaimer: 'Si hay dolor que baja por la pierna, hormigueo o pérdida de sensibilidad, consulta primero a un especialista en columna.'
    },

    // ===== CADERAS Y PIERNAS =====
    caderas: {
      id: 'caderas',
      titulo: 'Caderas y región pélvica',
      icono: 'fa-person-walking',
      color: '#ffd700',
      nivel1: '¿Qué tipo de molestia sientes en caderas?',
      opciones1: [
        { id: 'caderas_rigidez', texto: 'Rigidez al sentarme o levantarme', siguiente: 'caderas_rigidez' },
        { id: 'caderas_dolor', texto: 'Dolor en glúteos o ingle', siguiente: 'caderas_dolor' },
        { id: 'caderas_inestabilidad', texto: 'Sensación de inestabilidad al caminar', siguiente: 'caderas_inestabilidad' }
      ],
      niveles: {
        caderas_rigidez: {
          descripcion: 'La rigidez de cadera refleja acortamiento de psoas-ilíaco y restricción de la cápsula articular.',
          causas: ['Sedentarismo prolongado', 'Postura sentada con flexión de cadera', 'Falta de estiramientos', 'Calzado inadecuado'],
          protocolo: 'Liberación de psoas-ilíaco + movilización de cadera + estiramientos neurodinámicos (40 min)',
          whatsapp: `Hola Valtara 👋 Siento rigidez en caderas al levantarme. ¿Me ayudan con una sesión de movilidad pélvica?`
        },
        caderas_dolor: {
          descripcion: 'El dolor glúteo puede vincularse al síndrome del piramidal con compresión del nervio ciático.',
          causas: ['Sentarse sobre billetera', 'Asimetría pélvica funcional', 'Sobrecarga en deporte unilateral'],
          protocolo: 'Liberación profunda de piramidal + movilización neural ciática + corrección postural (40 min)',
          whatsapp: `Hola Valtara 👋 Me duele el glúteo y a veces siento hormigueo. ¿Puedo agendar una evaluación para síndrome del piramidal?`
        },
        caderas_inestabilidad: {          descripcion: 'La inestabilidad pélvica refleja debilidad de glúteo medio y alteración del patrón de marcha.',
          causas: ['Sedentarismo', 'Patrones de marcha alterados', 'Falta de trabajo propioceptivo', 'Calzado inadecuado'],
          protocolo: 'Activación de glúteo medio + reeducación de marcha + ejercicios de propiocepción (35 min)',
          whatsapp: `Hola Valtara 👋 Siento inestabilidad al caminar. ¿Ofrecen sesiones para mejorar estabilidad de cadera?`
        }
      },
      disclaimer: 'Si hay dolor intenso en ingle, chasquidos dolorosos o bloqueo articular, consulta a un ortopedista antes de iniciar terapia.'
    },

    // ===== RODILLAS Y PIERNAS =====
    rodillas: {
      id: 'rodillas',
      titulo: 'Rodillas y muslos',
      icono: 'fa-person-walking-luggage',
      color: '#ff6b35',
      nivel1: '¿Qué sientes en tus rodillas?',
      opciones1: [
        { id: 'rodillas_dolor_frente', texto: 'Dolor en la parte frontal (rótula)', siguiente: 'rodillas_dolor_frente' },
        { id: 'rodillas_dolor_lateral', texto: 'Dolor en laterales o parte posterior', siguiente: 'rodillas_dolor_lateral' },
        { id: 'rodillas_rigidez', texto: 'Rigidez o dificultad para flexionar', siguiente: 'rodillas_rigidez' }
      ],
      niveles: {
        rodillas_dolor_frente: {
          descripcion: 'El dolor femororrotuliano suele relacionarse con maltracking rotuliano por debilidad de VMO.',
          causas: ['Desequilibrio de cuádriceps', 'Pronación excesiva de pie', 'Cambios bruscos de actividad'],
          protocolo: 'Liberación de banda iliotibial + movilización rotuliana + fortalecimiento selectivo de VMO (40 min)',
          whatsapp: `Hola Valtara 👋 Me duele la rótula al bajar escaleras. ¿Puedo agendar una sesión para rodilla?`
        },
        rodillas_dolor_lateral: {
          descripcion: 'El dolor lateral puede indicar sobrecarga de la banda iliotibial o tendinopatía de bíceps femoral.',
          causas: ['Correr en superficies inclinadas', 'Calzado desgastado', 'Debilidad de glúteo medio'],
          protocolo: 'Liberación de banda iliotibial + movilización de rodilla + corrección de patrones de marcha (35 min)',
          whatsapp: `Hola Valtara 👋 Tengo dolor en el lateral de la rodilla. ¿Me ayudan con una sesión de liberación?`
        },
        rodillas_rigidez: {
          descripcion: 'La rigidez de rodilla refleja acortamiento de isquiotibiales y restricción de la cápsula articular.',
          causas: ['Sedentarismo con flexión prolongada', 'Falta de estiramientos', 'Deshidratación muscular'],
          protocolo: 'Liberación de isquiotibiales + movilización de rodilla + estiramientos neurodinámicos (35 min)',
          whatsapp: `Hola Valtara 👋 Mis rodillas están rígidas y me cuesta flexionarlas. ¿Agendo sesión de movilidad?`
        }
      },
      disclaimer: 'Si hay inflamación aguda, inestabilidad o bloqueo articular, consulta primero a un traumatólogo.'
    },

    // ===== TOBILLOS Y PIES =====
    tobillos: {
      id: 'tobillos',
      titulo: 'Tobillos y pies',
      icono: 'fa-person-walking-arrow-right',
      color: '#ffd700',      nivel1: '¿Qué molestia sientes en pies/tobillos?',
      opciones1: [
        { id: 'tobillos_rigidez', texto: 'Rigidez o dificultad para mover', siguiente: 'tobillos_rigidez' },
        { id: 'tobillos_dolor', texto: 'Dolor al caminar o estar de pie', siguiente: 'tobillos_dolor' },
        { id: 'tobillos_hinchazon', texto: 'Hinchazón o pesadez al final del día', siguiente: 'tobillos_hinchazon' }
      ],
      niveles: {
        tobillos_rigidez: {
          descripcion: 'La rigidez de tobillo limita la dorsiflexión y altera el patrón de marcha en cadena cinética.',
          causas: ['Calzado restrictivo', 'Falta de trabajo propioceptivo', 'Secuelas de esguinces mal tratados'],
          protocolo: 'Movilización articular de tobillo + liberación fascial plantar + reeducación propioceptiva (35 min)',
          whatsapp: `Hola Valtara 👋 Tengo rigidez en tobillos y me cuesta caminar fluido. ¿Ofrecen sesiones para movilidad de pie?`
        },
        tobillos_dolor: {
          descripcion: 'El dolor en pies puede relacionarse con fascitis plantar, sobrecarga de arco o alteraciones de la marcha.',
          causas: ['Calzado inadecuado', 'Sobrepeso', 'Estar de pie prolongado', 'Falta de estiramientos'],
          protocolo: 'Liberación de fascia plantar + movilización de tobillo + educación en calzado (35 min)',
          whatsapp: `Hola Valtara 👋 Me duelen los pies al caminar. ¿Puedo agendar una sesión de liberación plantar?`
        },
        tobillos_hinchazon: {
          descripcion: 'La hinchazón vespertina refleja estasis venosa/linfática por sedentarismo o insuficiencia circulatoria funcional.',
          causas: ['Sedentarismo prolongado', 'Calzado muy ajustado', 'Deshidratación', 'Estrés oxidativo'],
          protocolo: 'Drenaje linfático manual de miembros inferiores + educación en hidratación + movimiento consciente (40 min)',
          whatsapp: `Hola Valtara 👋 Se me hinchan los tobillos al final del día. ¿Me ayudan con drenaje linfático?`
        }
      },
      disclaimer: '⚠️ Importante: No somos podólogos. Si hay heridas, uñas encarnadas, deformidades estructurales o diabetes, consulta primero a un podólogo certificado.'
    },

    // ===== ZONAS ADICIONALES =====
    abdomen: {
      id: 'abdomen',
      titulo: 'Abdomen y diafragma',
      icono: 'fa-lungs',
      color: '#ffd700',
      nivel1: '¿Qué sientes en tu abdomen?',
      opciones1: [
        { id: 'abdomen_tension', texto: 'Tensión o rigidez abdominal', siguiente: 'abdomen_tension' },
        { id: 'abdomen_hinchazon', texto: 'Hinchazón o pesadez digestiva', siguiente: 'abdomen_hinchazon' },
        { id: 'abdomen_respiracion', texto: 'Dificultad para respirar profundo', siguiente: 'abdomen_respiracion' }
      ],
      niveles: {
        abdomen_tension: {
          descripcion: 'La tensión abdominal refleja restricción fascial y disfunción del mecanismo respiratorio-cinético.',
          causas: ['Cirugías previas', 'Estrés crónico (cortisol)', 'Sedentarismo ejecutivo', 'Alimentación inflamatoria'],
          protocolo: 'Liberación miofascial abdominal + movilización diafragmática + integración respiratoria (40 min)',
          whatsapp: `Hola Valtara 👋 Siento tensión en el abdomen que me limita. ¿Puedo agendar una sesión de liberación abdominal?`
        },
        abdomen_hinchazon: {
          descripcion: 'La hinchazón abdominal funcional puede vincularse a disbiosis, estrés o alteración del tránsito.',          causas: ['Alimentación proinflamatoria', 'Estrés crónico', 'Sedentarismo', 'Deshidratación'],
          protocolo: 'Masaje abdominal suave + educación en hidratación + integración de hábitos digestivos (35 min)',
          whatsapp: `Hola Valtara 👋 Tengo hinchazón abdominal frecuente. ¿Me ayudan con una sesión de masaje digestivo?`
        },
        abdomen_respiracion: {
          descripcion: 'La dificultad para respirar profundo refleja restricción diafragmática y patrón respiratorio apical.',
          causas: ['Estrés crónico', 'Postura cifótica', 'Sedentarismo', 'Ansiedad situacional'],
          protocolo: 'Reeducación diafragmática + liberación de inserciones diafragmáticas + integración postural (35 min)',
          whatsapp: `Hola Valtara 👋 Me cuesta respirar profundo y siento opresión. ¿Ofrecen sesiones para reeducación respiratoria?`
        }
      },
      disclaimer: 'Si hay dolor abdominal agudo, fiebre, vómito o sangrado, acude inmediatamente a un servicio de urgencias.'
    },

    manos: {
      id: 'manos',
      titulo: 'Manos, muñecas y antebrazos',
      icono: 'fa-hand',
      color: '#ff6b35',
      nivel1: '¿Qué molestia sientes en manos/muñecas?',
      opciones1: [
        { id: 'manos_hormigueo', texto: 'Hormigueo o entumecimiento', siguiente: 'manos_hormigueo' },
        { id: 'manos_dolor', texto: 'Dolor al usar teclado/mouse', siguiente: 'manos_dolor' },
        { id: 'manos_rigidez', texto: 'Rigidez matutina o al finalizar el día', siguiente: 'manos_rigidez' }
      ],
      niveles: {
        manos_hormigueo: {
          descripcion: 'El hormigueo puede indicar compresión neural a nivel de muñeca (túnel carpiano) o codo (túnel cubital).',
          causas: ['Tecleo prolongado', 'Postura inadecuada de muñeca', 'Falta de pausas activas', 'Deshidratación'],
          protocolo: 'Movilización neural + liberación de compartimentos + educación ergonómica (30 min)',
          whatsapp: `Hola Valtara 👋 Tengo hormigueo en manos al trabajar. ¿Puedo agendar una sesión para liberación neural?`
        },
        manos_dolor: {
          descripcion: 'El dolor por sobreuso refleja tendinopatía de flexo-extensores y sobrecarga de compartimentos.',
          causas: ['Uso repetitivo de dispositivos', 'Falta de estiramientos', 'Estrés laboral', 'Deshidratación'],
          protocolo: 'Liberación de antebrazo + movilización de muñeca + educación en pausas activas (25 min)',
          whatsapp: `Hola Valtara 👋 Me duelen las muñecas al trabajar. ¿Me ayudan con una sesión de liberación de antebrazo?`
        },
        manos_rigidez: {
          descripcion: 'La rigidez matutina puede vincularse a acumulación de metabolitos y restricción fascial.',
          causas: ['Sueño con muñecas flexionadas', 'Sedentarismo', 'Alimentación inflamatoria', 'Estrés oxidativo'],
          protocolo: 'Movilización suave de muñeca + drenaje linfático + educación en higiene postural (25 min)',
          whatsapp: `Hola Valtara 👋 Mis manos están rígidas por las mañanas. ¿Agendo sesión de movilidad de muñeca?`
        }
      },
      disclaimer: 'Si hay pérdida de fuerza, atrofia muscular o síntomas nocturnos severos, consulta a un neurólogo o traumatólogo.'
    }
  };

  // ========================================  // 🎨 TEMPLATE HTML - TRIAGE INTERACTIVO
  // ========================================
  const TRIAGE_TEMPLATE = `
<section aria-labelledby="triage-titulo" class="triage-container">
  <div class="triage-header">
    <div style="display:inline-flex;align-items:center;gap:14px;margin-bottom:1rem;">
      <span style="background:rgba(0,255,255,0.07);border:1px solid rgba(0,255,255,0.2);padding:12px;border-radius:50%;display:flex;">
        <i class="fa-solid fa-stethoscope" style="color:var(--valtara-cian-brillante, #00ffe0);font-size:2rem;" aria-hidden="true"></i>
      </span>
      <h2 id="triage-titulo" style="font-family:var(--font-accent, 'Lato', sans-serif);color:var(--valtara-blanco, #fff);font-size:2.2rem;margin:0;">Descubre tu malestar</h2>
    </div>
    <p style="color:var(--valtara-gris-texto, #aaa);font-size:1.05rem;line-height:1.7;max-width:650px;margin:0 auto 1rem;">
      Selecciona la zona donde sientes tensión o molestia y descubre posibles causas + protocolo Valtara recomendado.
    </p>
    <p style="color:var(--valtara-gris-texto, #aaa);font-size:0.9rem;font-style:italic;">
      💡 Las respuestas generan mensajes personalizados para WhatsApp
    </p>
  </div>

  ${DISCLAIMER_MEDICO}

  <!-- Paso 1: Selección de zona corporal -->
  <div id="triage-paso-1" class="triage-step triage-step--active">
    <h3 style="font-family:var(--font-accent);color:var(--valtara-blanco);font-size:1.4rem;margin:0 0 1.5rem;text-align:center;">
      ¿En qué parte de tu cuerpo sientes tensión o malestar?
    </h3>
    <div class="triage-zonas-grid" role="listbox" aria-label="Selecciona una zona corporal">
      ${renderZonasSelector()}
    </div>
  </div>

  <!-- Paso 2: Pregunta específica de la zona -->
  <div id="triage-paso-2" class="triage-step" hidden>
    <button id="triage-back-1" class="triage-back-btn" aria-label="Regresar a selección de zonas">
      <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Regresar
    </button>
    <h3 id="triage-pregunta-2" style="font-family:var(--font-accent);color:var(--valtara-blanco);font-size:1.3rem;margin:0 0 1.5rem;"></h3>
    <div id="triage-opciones-2" class="triage-opciones-grid" role="radiogroup"></div>
  </div>

  <!-- Paso 3: Información detallada + WhatsApp -->
  <div id="triage-paso-3" class="triage-step" hidden>
    <button id="triage-back-2" class="triage-back-btn" aria-label="Regresar a preguntas">
      <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Regresar
    </button>
    
    <div id="triage-resultado" class="triage-resultado">
      <!-- Se llena dinámicamente -->
    </div>
    <div style="text-align:center;margin-top:2rem;">
      <a id="triage-whatsapp-btn" href="#" target="_blank" rel="noopener" 
         style="display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#fff;border:none;padding:14px 32px;border-radius:50px;font-weight:700;font-family:'Lato',sans-serif;cursor:pointer;font-size:1rem;text-decoration:none;transition:transform 0.2s ease;box-shadow:0 4px 14px rgba(37,211,102,0.3);">
        <i class="fa-brands fa-whatsapp" style="font-size:1.3rem;" aria-hidden="true"></i>
        Enviar mensaje por WhatsApp
      </a>
      <p style="color:var(--valtara-gris-texto);font-size:0.85rem;margin-top:0.75rem;">
        Al hacer clic, se abrirá WhatsApp con un mensaje predefinido. Tú decides enviarlo.
      </p>
    </div>
  </div>

  <!-- Estado de carga -->
  <div id="triage-loading" class="triage-loading" hidden>
    <div class="triage-spinner"></div>
    <p>Preparando información...</p>
  </div>
</section>
  `;

  // ========================================
  // 🔧 FUNCIONES AUXILIARES
  // ========================================
  function renderZonasSelector() {
    return Object.values(ZONAS_TRIAGE).map(zona => `
      <button class="triage-zona-btn" 
              data-zona="${zona.id}" 
              role="option"
              aria-label="${zona.titulo}"
              style="background:rgba(0,255,255,0.06);border:1px solid ${zona.color}40;border-radius:1.25rem;padding:1.25rem;text-align:left;cursor:pointer;transition:all 0.2s ease;display:flex;align-items:center;gap:12px;min-height:72px;">
        <span style="width:44px;height:44px;border-radius:50%;background:${zona.color}20;display:flex;align-items:center;justify-content:flex-shrink:0;">
          <i class="fa-solid ${zona.icono}" style="color:${zona.color};font-size:1.1rem;" aria-hidden="true"></i>
        </span>
        <span style="color:var(--valtara-blanco, #fff);font-weight:500;font-size:0.95rem;line-height:1.4;">${zona.titulo}</span>
      </button>
    `).join('');
  }

  function renderOpciones(opciones, colorBase) {
    return opciones.map(op => `
      <button class="triage-opcion-btn" 
              data-siguiente="${op.siguiente}"
              role="radio"
              aria-checked="false"
              style="background:rgba(255,255,255,0.04);border:1px solid ${colorBase}30;border-radius:1rem;padding:1rem 1.25rem;text-align:left;cursor:pointer;transition:all 0.2s ease;color:var(--valtara-blanco, #fff);font-size:0.95rem;line-height:1.5;display:flex;align-items:center;gap:10px;min-height:60px;">
        <span style="width:24px;height:24px;border-radius:50%;border:2px solid ${colorBase};display:flex;align-items:center;justify-content:flex-shrink:0;">
          <span style="width:12px;height:12px;border-radius:50%;background:${colorBase};opacity:0;transition:opacity 0.2s ease;" class="opcion-check"></span>
        </span>
        ${op.texto}
      </button>    `).join('');
  }

  function renderResultado(zonaId, nivelId, datos) {
    return `
      <div style="text-align:center;margin-bottom:1.5rem;">
        <span style="display:inline-flex;width:64px;height:64px;border-radius:50%;background:${datos.color}20;align-items:center;justify-content:center;margin-bottom:1rem;">
          <i class="fa-solid ${ZONAS_TRIAGE[zonaId].icono}" style="color:${datos.color};font-size:1.8rem;" aria-hidden="true"></i>
        </span>
        <h3 style="font-family:var(--font-accent);color:var(--valtara-blanco);font-size:1.5rem;margin:0 0 0.5rem;">${ZONAS_TRIAGE[zonaId].titulo}</h3>
        <p style="color:${datos.color};font-weight:600;font-size:1.05rem;margin:0;">${datos.descripcion}</p>
      </div>

      <div style="background:rgba(255,255,255,0.04);border-radius:1.25rem;padding:1.5rem;margin-bottom:1.25rem;">
        <p style="color:var(--valtara-cian-brillante, #00ffe0);font-weight:600;margin:0 0 0.75rem;display:flex;align-items:center;gap:8px;">
          <i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
          Causas comunes:
        </p>
        <ul style="color:var(--valtara-gris-texto, #aaa);padding-left:1.5rem;margin:0;line-height:1.7;">
          ${datos.causas.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>

      <div style="background:rgba(0,255,204,0.08);border:1px solid rgba(0,255,204,0.2);border-radius:1.25rem;padding:1.5rem;margin-bottom:1.25rem;">
        <p style="color:var(--valtara-cian-brillante, #00ffe0);font-weight:600;margin:0 0 0.75rem;display:flex;align-items:center;gap:8px;">
          <i class="fa-solid fa-sparkles" aria-hidden="true"></i>
          Protocolo Valtara recomendado:
        </p>
        <p style="color:var(--valtara-blanco, #fff);margin:0;line-height:1.6;font-size:1.05rem;">${datos.protocolo}</p>
      </div>

      ${ZONAS_TRIAGE[zonaId].disclaimer ? `
        <div style="background:rgba(255,107,53,0.12);border-left:4px solid #ff6b35;padding:1rem;border-radius:0 1rem 1rem 0;font-size:0.9rem;">
          <p style="color:var(--valtara-gris-texto, #aaa);margin:0;line-height:1.5;">
            <strong style="color:#ff6b35;">Nota:</strong> ${ZONAS_TRIAGE[zonaId].disclaimer}
          </p>
        </div>
      ` : ''}

      ${DISCLAIMER_MEDICO}
    `;
  }

  // ========================================
  // 🎮 CONTROLADOR PRINCIPAL
  // ========================================
  const TriageController = {
    estado: {
      zonaSeleccionada: null,
      nivelActual: null,      datosResultado: null
    },

    init: function() {
      if (document.getElementById('triage-paso-1')) {
        this.setupEventListeners();
        this.setupAccessibility();
        console.log('✅ Triage interactivo inicializado');
      } else {
        setTimeout(() => this.init(), 100);
      }
    },

    setupAccessibility: function() {
      // Optimizaciones para retinosis pigmentaria y accesibilidad
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        document.querySelectorAll('.triage-zona-btn, .triage-opcion-btn').forEach(btn => {
          btn.style.transition = 'none';
        });
      }
      
      // Alto contraste si el usuario lo prefiere
      const highContrast = window.matchMedia('(prefers-contrast: more)').matches;
      if (highContrast) {
        document.querySelectorAll('.triage-opcion-btn').forEach(btn => {
          btn.style.fontWeight = '600';
          btn.style.borderWidth = '2px';
        });
      }
    },

    setupEventListeners: function() {
      // Paso 1: Selección de zona
      document.querySelectorAll('.triage-zona-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const zonaId = e.currentTarget.dataset.zona;
          this.irAPaso2(zonaId);
        });
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const zonaId = e.currentTarget.dataset.zona;
            this.irAPaso2(zonaId);
          }
        });
      });

      // Botones de regreso
      document.getElementById('triage-back-1')?.addEventListener('click', () => this.irAPaso1());      document.getElementById('triage-back-2')?.addEventListener('click', () => this.irAPaso2(this.estado.zonaSeleccionada));

      // Delegación para opciones dinámicas (Paso 2)
      document.getElementById('triage-paso-2')?.addEventListener('click', (e) => {
        const opcion = e.target.closest('.triage-opcion-btn');
        if (opcion) {
          // Feedback visual inmediato
          document.querySelectorAll('.opcion-check').forEach(c => c.style.opacity = '0');
          opcion.querySelector('.opcion-check').style.opacity = '1';
          
          const siguiente = opcion.dataset.siguiente;
          setTimeout(() => this.irAPaso3(siguiente), 200);
        }
      });
    },

    irAPaso2: function(zonaId) {
      const zona = ZONAS_TRIAGE[zonaId];
      if (!zona) return;
      
      this.estado.zonaSeleccionada = zonaId;
      
      // Actualizar UI
      document.getElementById('triage-paso-1').hidden = true;
      document.getElementById('triage-paso-2').hidden = false;
      
      // Llenar pregunta y opciones
      document.getElementById('triage-pregunta-2').textContent = zona.nivel1;
      document.getElementById('triage-opciones-2').innerHTML = renderOpciones(zona.opciones1, zona.color);
      
      // Scroll suave al nuevo paso
      document.getElementById('triage-paso-2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    irAPaso3: function(nivelId) {
      const zona = ZONAS_TRIAGE[this.estado.zonaSeleccionada];
      const datos = zona?.niveles?.[nivelId];
      if (!datos) return;
      
      this.estado.nivelActual = nivelId;
      this.estado.datosResultado = datos;
      
      // Mostrar estado de carga breve
      const paso3 = document.getElementById('triage-paso-3');
      const loading = document.getElementById('triage-loading');
      const resultado = document.getElementById('triage-resultado');
      
      paso3.hidden = true;
      loading.hidden = false;
            setTimeout(() => {
        // Llenar resultado
        resultado.innerHTML = renderResultado(this.estado.zonaSeleccionada, nivelId, datos);
        
        // Configurar botón de WhatsApp
        const whatsappBtn = document.getElementById('triage-whatsapp-btn');
        if (whatsappBtn) {
          const mensaje = encodeURIComponent(datos.whatsapp);
          // Reemplaza con tu número de WhatsApp Business
          const telefono = '5215512345678'; 
          whatsappBtn.href = `https://wa.me/${telefono}?text=${mensaje}`;
        }
        
        // Actualizar UI
        loading.hidden = true;
        document.getElementById('triage-paso-2').hidden = true;
        paso3.hidden = false;
        
        // Scroll suave
        paso3.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Feedback de accesibilidad
        resultado.setAttribute('aria-live', 'polite');
      }, 400);
    },

    irAPaso1: function() {
      this.estado = { zonaSeleccionada: null, nivelActual: null, datosResultado: null };
      document.getElementById('triage-paso-3').hidden = true;
      document.getElementById('triage-paso-2').hidden = true;
      document.getElementById('triage-paso-1').hidden = false;
      document.getElementById('triage-paso-1').scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Resetear checks visuales
      document.querySelectorAll('.opcion-check').forEach(c => c.style.opacity = '0');
    }
  };

  // ========================================
  // 📦 EXPORTAR MÓDULO
  // ========================================
  global.ValtaraModulos = global.ValtaraModulos || {};
  global.ValtaraModulos.inicio_mapa_cuerpo = TRIAGE_TEMPLATE;
  global.ValtaraTriageController = TriageController;

  // Auto-inicialización
  function autoInit() {
    if (document.getElementById('triage-paso-1')) {
      TriageController.init();
    } else {      const observer = new MutationObserver((mutations, obs) => {
        if (document.getElementById('triage-paso-1')) {
          TriageController.init();
          obs.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        if (document.getElementById('triage-paso-1')) TriageController.init();
        observer.disconnect();
      }, 3000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    setTimeout(autoInit, 50);
  }

})(window);
