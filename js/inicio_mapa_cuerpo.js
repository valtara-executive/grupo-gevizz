/**
 * VALTARA — MAPA BIOMECÁNICO INTERACTIVO V41.0
 * Módulo autocontenido: Template + Controller + Datos Clínicos
 * Archivo: js/inicio_mapa_cuerpo.js
 * 
 * ✅ Sin dependencias externas
 * ✅ Auto-inicialización segura
 * ✅ 28 zonas con protocolos clínicos completos
 * ✅ Accesibilidad prioritaria (WCAG 2.1 AA + alto contraste)
 * ✅ Optimizado para móviles y condiciones visuales
 */

(function(global) {
  'use strict';

  // ========================================
  // 🗃️ DATOS CLÍNICOS COMPLETOS - 28 ZONAS
  // ========================================
  const ZONAS_CLINICAS = {
    // ===== VISTA FRONTAL =====
    craneo: {
      titulo: 'Cráneo y cuero cabelludo',
      diagnostico: 'Tensión en músculos epicráneos, fascia temporal y suturas craneales.',
      causas: ['Estrés crónico ejecutivo', 'Bruxismo nocturno', 'Postura cervical anteriorizada', 'Deshidratación tisular'],
      protocolo: 'Liberación miofascial craneal + drenaje linfático suboccipital + neuromodulación vagal (25 min)',
      contraindicaciones: ['Traumatismo craneal reciente', 'Hipertensión intracraneal no controlada'],
      frecuencia: 'Semanal x 4 sesiones, luego mensual',
      color: '#00ffe0',
      icono: 'fa-brain'
    },
    mandibula: {
      titulo: 'Mandíbula y ATM',
      diagnostico: 'Disfunción temporomandibular con sobrecarga de maseteros y pterigoideos.',
      causas: ['Apriete dental por estrés', 'Oclusión desbalanceada', 'Postura de cabeza adelantada', 'Respiración bucal'],
      protocolo: 'Terapia neuromuscular mandibular + liberación de pterigoideos + educación postural (30 min)',
      contraindicaciones: ['Fractura mandibular reciente', 'Artritis reumatoide activa en ATM'],
      frecuencia: '2x/semana x 2 semanas, luego mantenimiento quincenal',
      color: '#ffd700',
      icono: 'fa-tooth'
    },
    cervical: {
      titulo: 'Columna cervical',
      diagnostico: 'Hipertonía de trapecio superior, elevador de escápula y suboccipitales.',
      causas: ['Uso prolongado de dispositivos', 'Estrés laboral crónico', 'Colchón inadecuado', 'Desequilibrio escapular'],
      protocolo: 'Movilización neural cervical + liberación de suboccipitales + reeducación escapular (35 min)',
      contraindicaciones: ['Inestabilidad cervical', 'Síndrome de arteria vertebral'],
      frecuencia: 'Semanal x 6 sesiones, evaluación mensual',
      color: '#ffd700',
      icono: 'fa-necktie'
    },    hombro_d: {
      titulo: 'Hombro derecho',
      diagnostico: 'Síndrome de pinzamiento subacromial con tendinopatía del supraespinoso.',
      causas: ['Movimientos repetitivos de elevación', 'Desequilibrio rotador', 'Postura cifótica', 'Sobrecarga ejecutiva'],
      protocolo: 'Liberación de manguito rotador + movilización glenohumeral + ejercicios excéntricos (40 min)',
      contraindicaciones: ['Rotura completa de manguito', 'Luxación recurrente'],
      frecuencia: '2x/semana x 3 semanas, luego funcional',
      color: '#ffd700',
      icono: 'fa-person-dress'
    },
    hombro_i: {
      titulo: 'Hombro izquierdo',
      diagnostico: 'Capsulitis adhesiva inicial con restricción de rotación externa.',
      causas: ['Inmovilización prolongada', 'Diabetes no controlada', 'Traumatismo leve repetitivo', 'Estrés emocional'],
      protocolo: 'Movilización pasiva progresiva + liberación capsular + termoterapia profunda (35 min)',
      contraindicaciones: ['Fractura de húmero proximal', 'Infección articular'],
      frecuencia: '3x/semana x 2 semanas, luego diario en casa',
      color: '#ffd700',
      icono: 'fa-person-dress'
    },
    pectoral: {
      titulo: 'Pectoral y esternón',
      diagnostico: 'Acortamiento de pectoral menor con compresión neurovascular del desfiladero torácico.',
      causas: ['Postura de hombros protraídos', 'Respiración apical crónica', 'Entrenamiento desbalanceado', 'Estrés'],
      protocolo: 'Liberación de pectoral menor + reeducación diafragmática + estiramientos neurales (30 min)',
      contraindicaciones: ['Síndrome de salida torácica severo', 'Patología cardíaca no evaluada'],
      frecuencia: 'Semanal x 4 sesiones + rutina domiciliaria',
      color: '#00ffe0',
      icono: 'fa-heart-pulse'
    },
    trapecio_d: {
      titulo: 'Trapecio derecho',
      diagnostico: 'Puntos gatillo activos en trapecio superior con dolor referido temporal.',
      causas: ['Sostener teléfono con hombro', 'Estrés laboral agudo', 'Mala ergonomía de escritorio', 'Ansiedad'],
      protocolo: 'Isquemia sostenida de puntos gatillo + estiramiento neuromuscular + educación postural (25 min)',
      contraindicaciones: ['Lesión aguda de cuello', 'Migraña con aura activa'],
      frecuencia: 'Según necesidad + técnicas de auto-liberación',
      color: '#00ffe0',
      icono: 'fa-person-cane'
    },
    trapecio_i: {
      titulo: 'Trapecio izquierdo',
      diagnostico: 'Hipertonía compensatoria por asimetría escapular y patrón respiratorio alterado.',
      causas: ['Uso dominante del lado derecho', 'Escoliosis funcional', 'Respiración paradójica', 'Fatiga crónica'],
      protocolo: 'Balance muscular escapular + reentrenamiento diafragmático + liberación fascial (30 min)',
      contraindicaciones: ['Escoliosis estructural severa', 'Patología pulmonar restrictiva'],
      frecuencia: 'Quincenal + ejercicios de simetría diaria',
      color: '#00ffe0',
      icono: 'fa-person-cane'
    },    abdomen: {
      titulo: 'Abdomen y diafragma',
      diagnostico: 'Restricción fascial abdominal con disfunción del mecanismo respiratorio-cinetico.',
      causas: ['Cirugías previas', 'Estrés crónico (cortisol)', 'Sedentarismo ejecutivo', 'Alimentación inflamatoria'],
      protocolo: 'Liberación miofascial abdominal + movilización diafragmática + integración respiratoria (40 min)',
      contraindicaciones: ['Hernia abdominal no reparada', 'Embarazo de alto riesgo'],
      frecuencia: 'Mensual + práctica diaria de respiración',
      color: '#ffd700',
      icono: 'fa-lungs'
    },
    codo_d: {
      titulo: 'Codo derecho',
      diagnostico: 'Epicondilitis lateral (codo de tenista) por sobrecarga de extensores.',
      causas: ['Uso repetitivo de mouse/teclado', 'Técnica deportiva incorrecta', 'Falta de pausas activas'],
      protocolo: 'Masaje transverso profundo + movilización neural radial + ejercicios excéntricos (30 min)',
      contraindicaciones: ['Fractura reciente de epicóndilo', 'Neuropatía radial compresiva'],
      frecuencia: '2x/semana x 3 semanas + ergonomía laboral',
      color: '#ff6b35',
      icono: 'fa-hand'
    },
    codo_i: {
      titulo: 'Codo izquierdo',
      diagnostico: 'Epitrocleitis medial con irritación del nervio cubital en túnel cubital.',
      causas: ['Apoyo prolongado en codo', 'Movimientos de pronación repetitivos', 'Postura de sueño inadecuada'],
      protocolo: 'Liberación de flexores + movilización neural cubital + protección nocturna (30 min)',
      contraindicaciones: ['Luxación de codo reciente', 'Síndrome de túnel cubital severo'],
      frecuencia: 'Semanal x 4 sesiones + ajuste ergonómico',
      color: '#ff6b35',
      icono: 'fa-hand'
    },
    antebrazo: {
      titulo: 'Antebrazo y muñeca',
      diagnostico: 'Síndrome de sobreuso de flexo-extensores con riesgo de tendinopatía.',
      causas: ['Tecleo prolongado', 'Uso de dispositivos móviles', 'Falta de estiramientos', 'Deshidratación'],
      protocolo: 'Liberación de compartimentos + movilización de muñeca + educación en pausas activas (25 min)',
      contraindicaciones: ['Síndrome de túnel carpiano confirmado', 'Fractura de Colles reciente'],
      frecuencia: 'Quincenal + rutina de 5 min cada 2 horas de trabajo',
      color: '#00ffe0',
      icono: 'fa-hand-fist'
    },
    cadera_d: {
      titulo: 'Cadera derecha',
      diagnostico: 'Pinzamiento femoroacetabular funcional con restricción de rotación interna.',
      causas: ['Sedentarismo prolongado', 'Desequilibrio de glúteos', 'Patrones de marcha alterados', 'Calzado inadecuado'],
      protocolo: 'Movilización de cadera + liberación de psoas-ilíaco + reeducación de marcha (40 min)',
      contraindicaciones: ['Artrosis avanzada de cadera', 'Prótesis no consolidada'],
      frecuencia: 'Semanal x 6 sesiones + programa de fortalecimiento',
      color: '#ffd700',
      icono: 'fa-person-walking'
    },    cadera_i: {
      titulo: 'Cadera izquierda',
      diagnostico: 'Síndrome del piramidal con compresión del nervio ciático a nivel pélvico.',
      causas: ['Sentarse sobre billetera', 'Asimetría pélvica funcional', 'Sobrecarga en deporte unilateral'],
      protocolo: 'Liberación de piramidal + movilización neural ciática + corrección postural pélvica (35 min)',
      contraindicaciones: ['Hernia discal lumbar con déficit motor', 'Tumor pélvico'],
      frecuencia: '2x/semana x 2 semanas + estiramientos diarios',
      color: '#ffd700',
      icono: 'fa-person-walking'
    },
    linfa: {
      titulo: 'Sistema linfático',
      diagnostico: 'Estasis linfática funcional con acumulación de metabolitos en tejidos blandos.',
      causas: ['Sedentarismo', 'Deshidratación crónica', 'Estrés oxidativo', 'Alimentación proinflamatoria'],
      protocolo: 'Drenaje linfático manual especializado + educación en hidratación + movimiento consciente (45 min)',
      contraindicaciones: ['Infección aguda', 'Trombosis venosa profunda', 'Insuficiencia cardíaca descompensada'],
      frecuencia: 'Semanal x 4 sesiones + mantenimiento mensual',
      color: '#b27fff',
      icono: 'fa-droplet'
    },
    isquiotibiales: {
      titulo: 'Muslos e isquiotibiales',
      diagnostico: 'Acortamiento de isquiotibiales con tensión en inserción isquiática.',
      causas: ['Sedentarismo con flexión de cadera', 'Entrenamiento sin estiramiento', 'Calzado con tacón'],
      protocolo: 'Liberación de isquiotibiales + movilización neural ciática + estiramientos neurodinámicos (35 min)',
      contraindicaciones: ['Desgarro muscular agudo', 'Ciática por hernia discal activa'],
      frecuencia: 'Semanal + rutina domiciliaria de 10 min/día',
      color: '#00ffe0',
      icono: 'fa-person-running'
    },
    rodilla_d: {
      titulo: 'Rodilla derecha',
      diagnostico: 'Síndrome femororrotuliano con maltracking rotuliano por debilidad de VMO.',
      causas: ['Desequilibrio de cuádriceps', 'Pronación excesiva de pie', 'Cambios bruscos de actividad'],
      protocolo: 'Liberación de banda iliotibial + movilización rotuliana + fortalecimiento selectivo de VMO (40 min)',
      contraindicaciones: ['Lesión de ligamento cruzado reciente', 'Artrosis grado IV'],
      frecuencia: '2x/semana x 4 semanas + programa de fortalecimiento',
      color: '#ff6b35',
      icono: 'fa-person-walking-luggage'
    },
    rodilla_i: {
      titulo: 'Rodilla izquierda',
      diagnostico: 'Tendinopatía rotuliana con degeneración mucóide del tendón.',
      causas: ['Saltos repetitivos', 'Cambios de dirección bruscos', 'Falta de calentamiento adecuado'],
      protocolo: 'Masaje de fricción transverso + movilización de rótula + ejercicios excéntricos progresivos (35 min)',
      contraindicaciones: ['Rotura completa del tendón', 'Infección articular'],
      frecuencia: '2x/semana x 3 semanas + carga progresiva',
      color: '#ff6b35',
      icono: 'fa-person-walking-luggage'
    },    pantorrilla_d: {
      titulo: 'Pantorrilla derecha',
      diagnostico: 'Contractura de gemelos con restricción de dorsiflexión de tobillo.',
      causas: ['Uso prolongado de tacón', 'Sedentarismo con pie en flexión plantar', 'Deshidratación muscular'],
      protocolo: 'Liberación de gemelos y sóleo + movilización de tobillo + estiramientos neurales (30 min)',
      contraindicaciones: ['Trombosis venosa profunda', 'Rotura de Aquiles reciente'],
      frecuencia: 'Semanal + estiramientos diarios post-ejercicio',
      color: '#00ffe0',
      icono: 'fa-person-walking-arrow-loop-left'
    },
    tobillo: {
      titulo: 'Tobillo y pie',
      diagnostico: 'Restricción de movilidad subtalar con alteración del patrón de marcha.',
      causas: ['Calzado restrictivo', 'Falta de trabajo propioceptivo', 'Secuelas de esguinces mal tratados'],
      protocolo: 'Movilización articular de tobillo + liberación fascial plantar + reeducación propioceptiva (35 min)',
      contraindicaciones: ['Fractura no consolidada', 'Úlcera diabética activa'],
      frecuencia: 'Quincenal + ejercicios de propiocepción en casa',
      color: '#ffd700',
      icono: 'fa-person-walking-arrow-right'
    },

    // ===== VISTA TRASERA =====
    nuca: {
      titulo: 'Nuca y región occipital',
      diagnostico: 'Tensión de músculos suboccipitales con dolor referido a región frontal.',
      causas: ['Postura de cabeza adelantada', 'Estrés visual por pantallas', 'Bruxismo', 'Mala almohada'],
      protocolo: 'Liberación de suboccipitales + movilización de atlas + educación postural cervical (25 min)',
      contraindicaciones: ['Inestabilidad craneocervical', 'Migraña con aura activa'],
      frecuencia: 'Según necesidad + ajustes ergonómicos de estación de trabajo',
      color: '#00ffe0',
      icono: 'fa-head-side-mask'
    },
    dorsal_sup: {
      titulo: 'Espalda alta y romboides',
      diagnostico: 'Hipertonía de romboides y trapecio medio con escápulas aladas funcionales.',
      causas: ['Postura cifótica prolongada', 'Debilidad de serrato anterior', 'Estrés emocional crónico'],
      protocolo: 'Liberación miofascial dorsal + activación de serrato + reeducación escapular (35 min)',
      contraindicaciones: ['Escoliosis estructural dolorosa', 'Fractura vertebral reciente'],
      frecuencia: 'Semanal x 4 sesiones + ejercicios posturales diarios',
      color: '#ffd700',
      icono: 'fa-person-dress-burst'
    },
    dorsal_med: {
      titulo: 'Espalda media y dorsales',
      diagnostico: 'Restricción fascial torácica con limitación de rotación espinal.',
      causas: ['Sedentarismo en rotación', 'Patrones respiratorios alterados', 'Estrés crónico'],
      protocolo: 'Liberación de fascia toracolumbar + movilización rotacional + integración respiratoria (40 min)',
      contraindicaciones: ['Espondilolistesis inestable', 'Patología pulmonar restrictiva'],
      frecuencia: 'Quincenal + movilidad torácica diaria',
      color: '#ffd700',      icono: 'fa-person-dress-burst'
    },
    lumbar: {
      titulo: 'Región lumbar y cuadrado lumbar',
      diagnostico: 'Síndrome de dolor miofascial lumbar con puntos gatillo en cuadrado lumbar.',
      causas: ['Sedentarismo con flexión lumbar', 'Levantamiento inadecuado de cargas', 'Estrés emocional'],
      protocolo: 'Liberación de cuadrado lumbar + movilización lumbar + educación en mecánica corporal (40 min)',
      contraindicaciones: ['Hernia discal con déficit neurológico', 'Espondilolistesis grado III+'],
      frecuencia: 'Semanal x 6 sesiones + programa de estabilización lumbar',
      color: '#ff6b35',
      icono: 'fa-person-cane'
    },
    sacro: {
      titulo: 'Sacro y articulación sacroilíaca',
      diagnostico: 'Disfunción de articulación sacroilíaca con dolor referido a glúteo y muslo.',
      causas: ['Asimetría pélvica funcional', 'Embarazo/postparto', 'Traumatismo leve repetitivo'],
      protocolo: 'Movilización de sacroilíaca + liberación de ligamentos sacros + estabilización pélvica (35 min)',
      contraindicaciones: ['Espondiloartropatía inflamatoria activa', 'Fractura de sacro'],
      frecuencia: '2x/semana x 2 semanas + ejercicios de estabilización',
      color: '#ffd700',
      icono: 'fa-person-pregnant'
    },
    gluteo_d: {
      titulo: 'Glúteo derecho y piramidal',
      diagnostico: 'Síndrome del piramidal con compresión del nervio ciático a nivel infrapiramidal.',
      causas: ['Sentarse prolongado', 'Asimetría de marcha', 'Sobrecarga en deporte unilateral'],
      protocolo: 'Liberación profunda de piramidal + movilización neural ciática + corrección de patrones (40 min)',
      contraindicaciones: ['Hernia discal lumbar con déficit motor', 'Tumor pélvico'],
      frecuencia: 'Semanal x 4 sesiones + estiramientos de piramidal diarios',
      color: '#00ffe0',
      icono: 'fa-person-walking'
    },
    gluteo_i: {
      titulo: 'Glúteo izquierdo y medio glúteo',
      diagnostico: 'Debilidad de glúteo medio con Trendelenburg funcional y sobrecarga lumbar.',
      causas: ['Sedentarismo', 'Patrones de marcha alterados', 'Falta de trabajo de cadera en entrenamiento'],
      protocolo: 'Activación de glúteo medio + liberación de TFL + reeducación de marcha (35 min)',
      contraindicaciones: ['Artrosis avanzada de cadera', 'Lesión de nervio ciático'],
      frecuencia: '2x/semana x 3 semanas + rutina de activación diaria',
      color: '#00ffe0',
      icono: 'fa-person-walking'
    },
    pantorrilla_i: {
      titulo: 'Pantorrilla izquierda y sóleo',
      diagnostico: 'Contractura de sóleo con restricción de dorsiflexión en cadena cinética cerrada.',
      causas: ['Calzado inadecuado', 'Sedentarismo con pie en flexión plantar', 'Desequilibrio bilateral'],
      protocolo: 'Liberación profunda de sóleo + movilización de tobillo + integración en cadena cinética (30 min)',
      contraindicaciones: ['Trombosis venosa profunda', 'Rotura de Aquiles reciente'],
      frecuencia: 'Semanal + estiramientos post-actividad',
      color: '#00ffe0',      icono: 'fa-person-walking-arrow-loop-left'
    }
  };

  // ========================================
  // 🎨 TEMPLATE HTML OPTIMIZADO
  // ========================================
  const MAPA_TEMPLATE = `
<section aria-labelledby="mapa-titulo" class="mapa-container">
  <div class="mapa-header">
    <div style="display:inline-flex;align-items:center;gap:14px;margin-bottom:1rem;">
      <span style="background:rgba(0,255,255,0.07);border:1px solid rgba(0,255,255,0.2);padding:12px;border-radius:50%;display:flex;">
        <i class="fa-solid fa-person-rays" style="color:var(--valtara-cian-brillante, #00ffe0);font-size:2rem;" aria-hidden="true"></i>
      </span>
      <h2 id="mapa-titulo" style="font-family:var(--font-accent, 'Lato', sans-serif);color:var(--valtara-blanco, #fff);font-size:2.6rem;margin:0;">Mapa Biomecánico</h2>
    </div>
    <p style="color:var(--valtara-gris-texto, #aaa);font-size:1.1rem;line-height:1.8;font-weight:300;max-width:600px;margin:0 auto 1.5rem;">
      Selecciona una zona del cuerpo para conocer su diagnóstico biomecánico y el protocolo Valtara recomendado.
    </p>
    <div role="group" aria-label="Cambiar vista" class="mapa-vista-toggle">
      <button id="btn-vista-3d" class="mapa-vista-btn" aria-pressed="true">Mapa Corporal</button>
      <button id="btn-vista-tabla" class="mapa-vista-btn" aria-pressed="false">Vista accesible</button>
    </div>
  </div>

  <div id="mapa-3d-wrapper" style="display:grid;gap:2rem;">
    <div class="mapa-svg-wrapper">
      <!-- Controles de vista -->
      <div style="position:absolute;top:16px;left:16px;z-index:10;display:flex;flex-direction:column;gap:8px;">
        <button id="btn-front" class="mapa-view-btn mapa-view-btn--active" aria-label="Vista frontal">Frontal</button>
        <button id="btn-back" class="mapa-view-btn" aria-label="Vista trasera">Trasera</button>
      </div>

      <!-- SVG Frontal -->
      <svg id="body-svg-front" class="mapa-svg-view" viewBox="0 0 340 680" xmlns="http://www.w3.org/2000/svg" aria-label="Mapa biomecánico corporal frontal" role="img">
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stop-color="#1e2a3a"/><stop offset="100%" stop-color="#0a0e18"/>
          </radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="shadowDrop"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="rgba(0,0,0,0.6)"/></filter>
        </defs>
        <ellipse cx="170" cy="665" rx="55" ry="10" fill="rgba(0,0,0,0.4)"/>
        <ellipse cx="170" cy="58" rx="44" ry="50" fill="url(#bodyGrad)" stroke="rgba(0,200,180,0.25)" stroke-width="1.5" filter="url(#shadowDrop)"/>
        <rect x="153" y="104" width="34" height="35" rx="8" fill="#111827" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <path d="M100,130 Q135,122 153,126 M187,126 Q205,122 240,130" stroke="rgba(100,150,200,0.3)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M100,130 L90,280 Q90,300 110,310 L170,318 L230,310 Q250,300 250,280 L240,130 Q205,122 187,126 L153,126 Q135,122 100,130Z" fill="#0f1825" stroke="rgba(0,200,180,0.2)" stroke-width="1.5"/>
        <ellipse cx="145" cy="185" rx="28" ry="22" fill="#141f2e" opacity="0.7"/><ellipse cx="195" cy="185" rx="28" ry="22" fill="#141f2e" opacity="0.7"/>
        <rect x="130" y="230" width="80" height="60" rx="10" fill="#111827" opacity="0.5"/>
        <path d="M110,310 Q135,325 170,328 Q205,325 230,310 L235,360 Q210,370 170,372 Q130,370 105,360Z" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>        <path d="M105,360 L100,395 Q100,415 125,420 L170,422 L215,420 Q240,415 240,395 L235,360 Q210,370 170,372 Q130,370 105,360Z" fill="#0d1620" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
        <path d="M100,130 L72,140 L60,220 Q58,240 65,250 L75,290 Q80,305 85,310 L90,280 L100,130Z" fill="#0f1825" stroke="rgba(0,200,180,0.18)" stroke-width="1.5"/>
        <ellipse cx="68" cy="240" rx="14" ry="8" fill="#111827" opacity="0.6"/>
        <path d="M65,250 L55,330 Q52,345 58,355 L72,360 L85,310 L75,290 L65,250Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
        <ellipse cx="62" cy="368" rx="16" ry="20" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <path d="M240,130 L268,140 L280,220 Q282,240 275,250 L265,290 Q260,305 255,310 L250,280 L240,130Z" fill="#0f1825" stroke="rgba(0,200,180,0.18)" stroke-width="1.5"/>
        <ellipse cx="272" cy="240" rx="14" ry="8" fill="#111827" opacity="0.6"/>
        <path d="M275,250 L285,330 Q288,345 282,355 L268,360 L255,310 L265,290 L275,250Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
        <ellipse cx="278" cy="368" rx="16" ry="20" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <path d="M125,420 L112,540 Q110,558 120,565 L148,568 L158,420 L125,420Z" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <ellipse cx="134" cy="570" rx="20" ry="16" fill="#111827" stroke="rgba(0,200,180,0.2)" stroke-width="1"/>
        <path d="M114,586 L118,650 Q120,665 130,668 L148,668 L152,586 L134,586Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
        <ellipse cx="135" cy="670" rx="22" ry="10" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <path d="M215,420 L228,540 Q230,558 220,565 L192,568 L182,420 L215,420Z" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <ellipse cx="206" cy="570" rx="20" ry="16" fill="#111827" stroke="rgba(0,200,180,0.2)" stroke-width="1"/>
        <path d="M226,586 L222,650 Q220,665 210,668 L192,668 L188,586 L206,586Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
        <ellipse cx="205" cy="670" rx="22" ry="10" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        
        <!-- ZONAS FRONTALES INTERACTIVAS -->
        ${renderZonasFrontales()}
      </svg>

      <!-- SVG Trasero (lazy load) -->
      <svg id="body-svg-back" class="mapa-svg-view" hidden viewBox="0 0 340 680" xmlns="http://www.w3.org/2000/svg" aria-label="Mapa biomecánico corporal trasero" role="img">
        <defs>
          <radialGradient id="bodyGrad2" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#1e2a3a"/><stop offset="100%" stop-color="#0a0e18"/></radialGradient>
          <filter id="glow2"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <ellipse cx="170" cy="665" rx="55" ry="10" fill="rgba(0,0,0,0.4)"/>
        <ellipse cx="170" cy="58" rx="44" ry="50" fill="url(#bodyGrad2)" stroke="rgba(0,200,180,0.25)" stroke-width="1.5"/>
        <rect x="153" y="104" width="34" height="35" rx="8" fill="#111827" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <path d="M100,130 L90,280 Q90,300 110,310 L170,318 L230,310 Q250,300 250,280 L240,130 Q205,122 187,126 L153,126 Q135,122 100,130Z" fill="#0f1825" stroke="rgba(0,200,180,0.2)" stroke-width="1.5"/>
        <path d="M110,310 Q135,325 170,328 Q205,325 230,310 L235,360 Q210,370 170,372 Q130,370 105,360Z" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <path d="M105,360 L100,395 Q100,415 125,420 L170,422 L215,420 Q240,415 240,395 L235,360 Q210,370 170,372 Q130,370 105,360Z" fill="#0d1620" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
        <path d="M100,130 L72,140 L60,220 Q58,240 65,250 L75,290 Q80,305 85,310 L90,280 L100,130Z" fill="#0f1825" stroke="rgba(0,200,180,0.18)" stroke-width="1.5"/>
        <path d="M65,250 L55,330 Q52,345 58,355 L72,360 L85,310 L75,290 L65,250Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
        <ellipse cx="62" cy="368" rx="16" ry="20" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <path d="M240,130 L268,140 L280,220 Q282,240 275,250 L265,290 Q260,305 255,310 L250,280 L240,130Z" fill="#0f1825" stroke="rgba(0,200,180,0.18)" stroke-width="1.5"/>
        <path d="M275,250 L285,330 Q288,345 282,355 L268,360 L255,310 L265,290 L275,250Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
        <ellipse cx="278" cy="368" rx="16" ry="20" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <path d="M125,420 L112,540 Q110,558 120,565 L148,568 L158,420 L125,420Z" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <ellipse cx="134" cy="570" rx="20" ry="16" fill="#111827" stroke="rgba(0,200,180,0.2)" stroke-width="1"/>
        <path d="M114,586 L118,650 Q120,665 130,668 L148,668 L152,586 L134,586Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
        <ellipse cx="135" cy="670" rx="22" ry="10" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <path d="M215,420 L228,540 Q230,558 220,565 L192,568 L182,420 L215,420Z" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        <ellipse cx="206" cy="570" rx="20" ry="16" fill="#111827" stroke="rgba(0,200,180,0.2)" stroke-width="1"/>
        <path d="M226,586 L222,650 Q220,665 210,668 L192,668 L188,586 L206,586Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
        <ellipse cx="205" cy="670" rx="22" ry="10" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
        
        <!-- ZONAS TRASERAS INTERACTIVAS -->        ${renderZonasTraseras()}
      </svg>
    </div>

    <!-- Panel de información -->
    <div id="mapa-zone-info" class="mapa-info-panel" aria-live="polite" aria-atomic="true">
      <i class="fa-solid fa-hand-pointer" style="font-size:3rem;color:rgba(0,255,204,0.3);margin-bottom:1.2rem;" aria-hidden="true"></i>
      <h3 style="font-family:var(--font-accent, 'Lato', sans-serif);font-size:1.8rem;color:var(--valtara-blanco, #fff);margin:0 0 0.8rem;">Selecciona una zona</h3>
      <p style="color:var(--valtara-gris-texto, #aaa);font-size:1rem;line-height:1.7;margin:0;">Toca cualquier punto del mapa corporal para ver el diagnóstico biomecánico, causas del dolor y el protocolo de tratamiento Valtara.</p>
    </div>
  </div>

  <!-- Vista tabla accesible -->
  <div id="mapa-tabla-wrapper" style="display:none;">
    <div style="overflow-x:auto;border-radius:1.5rem;border:1px solid rgba(0,255,255,0.12);">
      <table style="width:100%;border-collapse:collapse;font-family:'Lato',sans-serif;font-size:0.9rem;" aria-label="Tabla de zonas biomecánicas">
        <thead>
          <tr style="background:rgba(0,255,204,0.08);">
            <th scope="col" style="padding:14px 16px;text-align:left;color:var(--valtara-cian-brillante, #00ffe0);font-weight:600;border-bottom:1px solid rgba(0,255,255,0.15);">Zona</th>
            <th scope="col" style="padding:14px 16px;text-align:left;color:var(--valtara-cian-brillante, #00ffe0);font-weight:600;border-bottom:1px solid rgba(0,255,255,0.15);">Protocolo</th>
            <th scope="col" style="padding:14px 16px;text-align:left;color:var(--valtara-cian-brillante, #00ffe0);font-weight:600;border-bottom:1px solid rgba(0,255,255,0.15);">Agendar</th>
          </tr>
        </thead>
        <tbody id="mapa-tabla-body"></tbody>
      </table>
    </div>
  </div>
</section>
  `;

  // ========================================
  // 🔧 FUNCIONES AUXILIARES DE RENDERIZADO
  // ========================================
  function renderZonaHit(id, cx, cy, label, color, offsetText = 0, anchor = 'start') {
    const isFront = ['craneo','mandibula','cervical','hombro_d','hombro_i','pectoral','trapecio_d','trapecio_i','abdomen','codo_d','codo_i','antebrazo','cadera_d','cadera_i','linfa','isquiotibiales','rodilla_d','rodilla_i','pantorrilla_d','tobillo'].includes(id);
    const filterId = isFront ? 'glow' : 'glow2';
    const textX = anchor === 'end' ? cx - 40 : cx + 40;
    return `
      <g class="zona-hit" data-id="${id}" tabindex="0" role="button" aria-label="${ZONAS_CLINICAS[id]?.titulo || label}" style="cursor:pointer;">
        <circle cx="${cx}" cy="${cy}" r="35" fill="transparent"/>
        <circle cx="${cx}" cy="${cy}" r="7" fill="${color}99" stroke="${color}" stroke-width="1.5" filter="url(#${filterId})" class="zona-dot"/>
        <text x="${textX}" y="${cy + 4}" font-family="Lato,sans-serif" font-size="11" fill="${color}cc" class="zona-label" text-anchor="${anchor}">${label}</text>
      </g>`;
  }

  function renderZonasFrontales() {
    return [
      renderZonaHit('craneo', 170, 40, 'Cráneo', '#00ffe0', 0, 'start'),
      renderZonaHit('mandibula', 170, 100, 'Mandíbula', '#ffd700', 0, 'start'),
      renderZonaHit('cervical', 170, 122, 'Cervical', '#ffd700', -60, 'end'),      renderZonaHit('hombro_d', 88, 150, 'Hombro D', '#ffd700', -56, 'end'),
      renderZonaHit('hombro_i', 252, 150, 'Hombro I', '#ffd700', 0, 'start'),
      renderZonaHit('pectoral', 170, 180, 'Pectoral', '#00ffe0', 0, 'start'),
      renderZonaHit('trapecio_d', 72, 200, 'Trapecio D', '#00ffe0', -58, 'end'),
      renderZonaHit('trapecio_i', 268, 200, 'Trapecio I', '#00ffe0', 0, 'start'),
      renderZonaHit('abdomen', 170, 255, 'Abdomen', '#ffd700', -60, 'end'),
      renderZonaHit('codo_d', 64, 252, 'Codo D', '#ff6b35', -54, 'end'),
      renderZonaHit('codo_i', 276, 252, 'Codo I', '#ff6b35', 0, 'start'),
      renderZonaHit('antebrazo', 60, 310, 'Antebrazo', '#00ffe0', -50, 'end'),
      renderZonaHit('cadera_d', 118, 385, 'Cadera D', '#ffd700', -58, 'end'),
      renderZonaHit('cadera_i', 222, 385, 'Cadera I', '#ffd700', 0, 'start'),
      renderZonaHit('linfa', 170, 340, 'Linfático', '#b27fff', 0, 'start'),
      renderZonaHit('isquiotibiales', 130, 490, 'Muslos', '#00ffe0', -64, 'end'),
      renderZonaHit('rodilla_d', 134, 568, 'Rodilla D', '#ff6b35', -66, 'end'),
      renderZonaHit('rodilla_i', 206, 568, 'Rodilla I', '#ff6b35', 0, 'start'),
      renderZonaHit('pantorrilla_d', 131, 625, 'Pantorrilla D', '#00ffe0', -65, 'end'),
      renderZonaHit('tobillo', 170, 662, 'Tobillo / Pie', '#ffd700', 0, 'start')
    ].join('');
  }

  function renderZonasTraseras() {
    return [
      renderZonaHit('nuca', 170, 108, 'Nuca', '#00ffe0', 0, 'start'),
      renderZonaHit('dorsal_sup', 170, 175, 'Espalda Alta', '#ffd700', -60, 'end'),
      renderZonaHit('dorsal_med', 170, 255, 'Espalda Media', '#ffd700', 0, 'start'),
      renderZonaHit('lumbar', 170, 318, 'Lumbar', '#ff6b35', -60, 'end'),
      renderZonaHit('sacro', 170, 368, 'Sacro', '#ffd700', 0, 'start'),
      renderZonaHit('gluteo_d', 128, 395, 'Glúteo D', '#00ffe0', -62, 'end'),
      renderZonaHit('gluteo_i', 212, 395, 'Glúteo I', '#00ffe0', 0, 'start'),
      renderZonaHit('pantorrilla_i', 209, 625, 'Pantorrilla I', '#00ffe0', 0, 'start')
    ].join('');
  }

  // ========================================
  // 🎮 CONTROLADOR PRINCIPAL
  // ========================================
  const ValtaraMapaController = {
    estado: {
      vista: 'mapa',
      cuerpo: 'front',
      zonaActiva: null,
      inicializado: false
    },

    init: function() {
      if (this.estado.inicializado) return;
      
      // Esperar a que el template esté en el DOM
      const wrapper = document.getElementById('mapa-3d-wrapper');
      if (!wrapper) {        console.warn('⚠️ Mapa: contenedor no encontrado, reintentando en 100ms...');
        setTimeout(() => this.init(), 100);
        return;
      }

      this.setupStyles();
      this.setupEventListeners();
      this.optimizeForAccessibility();
      this.estado.inicializado = true;
      console.log('✅ Mapa biomecánico Valtara inicializado');
    },

    setupStyles: function() {
      // Inyectar estilos críticos si no existen
      if (!document.getElementById('mapa-estilos-criticos')) {
        const style = document.createElement('style');
        style.id = 'mapa-estilos-criticos';
        style.textContent = `
          .mapa-container{padding:4rem 1rem 2rem;max-width:900px;margin:0 auto}
          .mapa-header{text-align:center;margin-bottom:2.5rem}
          .mapa-vista-toggle{display:inline-flex;gap:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:50px;padding:5px}
          .mapa-vista-btn{padding:8px 22px;border-radius:50px;border:none;background:transparent;color:rgba(255,255,255,0.5);font-size:0.85rem;font-family:'Lato',sans-serif;cursor:pointer;transition:all 0.2s ease}
          .mapa-vista-btn[aria-pressed="true"]{background:var(--valtara-cian-brillante, #00ffe0);color:#000;font-weight:700}
          .mapa-svg-wrapper{position:relative;border-radius:2rem;overflow:hidden;background:linear-gradient(180deg,rgba(0,8,20,0.9),rgba(5,5,10,0.95));border:1px solid rgba(0,255,204,0.15);box-shadow:0 2rem 5rem rgba(0,0,0,0.7)}
          .mapa-svg-view{width:100%;max-height:560px;display:block}
          .mapa-svg-view[hidden]{display:none}
          .zona-hit{cursor:pointer;transition:opacity 0.2s ease}
          .zona-hit:focus{outline:2px solid var(--valtara-cian-brillante, #00ffe0);outline-offset:2px}
          .zona-dot{transition:r 0.2s ease, fill 0.2s ease}
          .zona-hit:hover .zona-dot,.zona-hit:focus .zona-dot{r:9;fill:var(--valtara-cian-brillante, #00ffe0)}
          .zona-label{pointer-events:none;user-select:none;transition:opacity 0.2s ease}
          .mapa-info-panel{background:linear-gradient(135deg,rgba(0,255,255,0.04),rgba(0,0,0,0.75));border:1px solid rgba(0,255,255,0.1);border-radius:2rem;padding:2.5rem;min-height:200px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
          .mapa-view-btn{padding:8px 14px;border-radius:20px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:rgba(255,255,255,0.4);font-size:0.75rem;font-family:'Lato',sans-serif;cursor:pointer;font-weight:700;transition:all 0.2s ease}
          .mapa-view-btn--active{background:rgba(0,255,204,0.15);color:var(--valtara-cian-brillante, #00ffe0);border-color:rgba(0,255,204,0.4)}
          @media(max-width:768px),(prefers-reduced-motion:reduce){.zona-dot{filter:none!important}.mapa-svg-wrapper{box-shadow:none}}
        `;
        document.head.appendChild(style);
      }
    },

    setupEventListeners: function() {
      // Toggle vista mapa/tabla
      const btnMapa = document.getElementById('btn-vista-3d');
      const btnTabla = document.getElementById('btn-vista-tabla');
      if (btnMapa) btnMapa.onclick = () => this.cambiarVista('mapa');
      if (btnTabla) btnTabla.onclick = () => this.cambiarVista('tabla');

      // Toggle frontal/trasera
      const btnFront = document.getElementById('btn-front');
      const btnBack = document.getElementById('btn-back');      if (btnFront) btnFront.onclick = () => this.cambiarVistaCuerpo('front');
      if (btnBack) btnBack.onclick = () => this.cambiarVistaCuerpo('back');

      // Delegación de eventos para zonas (más eficiente)
      const wrapper = document.getElementById('mapa-3d-wrapper');
      if (wrapper) {
        wrapper.addEventListener('click', (e) => {
          const zona = e.target.closest('.zona-hit');
          if (zona) this.activarZona(zona.dataset.id);
        });
        wrapper.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            const zona = e.target.closest('.zona-hit');
            if (zona) { e.preventDefault(); this.activarZona(zona.dataset.id); }
          }
        });
      }
    },

    optimizeForAccessibility: function() {
      // Detectar preferencias de accesibilidad del usuario
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const highContrast = window.matchMedia('(prefers-contrast: more)').matches;
      
      if (reduceMotion) {
        document.querySelectorAll('.zona-dot').forEach(el => {
          el.style.transition = 'none';
        });
      }
      
      if (highContrast) {
        document.querySelectorAll('.zona-label').forEach(el => {
          el.style.fontWeight = '600';
          el.style.textShadow = '0 0 2px #000';
        });
      }
    },

    cambiarVista: function(vista) {
      this.estado.vista = vista;
      
      // Actualizar UI
      ['btn-vista-3d', 'btn-vista-tabla'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.setAttribute('aria-pressed', 'false');
      });
      document.getElementById(vista === 'mapa' ? 'btn-vista-3d' : 'btn-vista-tabla')
        ?.setAttribute('aria-pressed', 'true');
      
      // Mostrar/ocultar contenedores      const wrapperMapa = document.getElementById('mapa-3d-wrapper');
      const wrapperTabla = document.getElementById('mapa-tabla-wrapper');
      if (wrapperMapa) wrapperMapa.style.display = vista === 'mapa' ? 'grid' : 'none';
      if (wrapperTabla) wrapperTabla.style.display = vista === 'tabla' ? 'block' : 'none';
      
      if (vista === 'tabla') this.renderizarTabla();
    },

    cambiarVistaCuerpo: function(vista) {
      if (this.estado.cuerpo === vista) return;
      this.estado.cuerpo = vista;
      
      // Actualizar SVGs
      const svgFront = document.getElementById('body-svg-front');
      const svgBack = document.getElementById('body-svg-back');
      if (svgFront) svgFront.hidden = (vista !== 'front');
      if (svgBack) {
        svgBack.hidden = (vista !== 'back');
        // Lazy load de vista trasera si es la primera vez
        if (vista === 'back' && !svgBack.dataset.loaded) {
          this.prepararVistaTrasera();
          svgBack.dataset.loaded = 'true';
        }
      }
      
      // Actualizar botones
      ['btn-front', 'btn-back'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.remove('mapa-view-btn--active');
      });
      document.getElementById(vista === 'front' ? 'btn-front' : 'btn-back')
        ?.classList.add('mapa-view-btn--active');
    },

    prepararVistaTrasera: function() {
      // Optimizar para móvil: desactivar filtros pesados
      if (window.matchMedia('(max-width: 768px)').matches) {
        const svgBack = document.getElementById('body-svg-back');
        if (svgBack) {
          svgBack.querySelectorAll('filter').forEach(f => f.remove());
          svgBack.querySelectorAll('.zona-dot').forEach(dot => {
            dot.setAttribute('filter', 'none');
          });
        }
      }
    },

    activarZona: function(zonaId) {
      const datos = ZONAS_CLINICAS[zonaId];
      if (!datos) {        console.warn(`⚠️ Zona no encontrada: ${zonaId}`);
        return;
      }
      
      this.estado.zonaActiva = zonaId;
      
      // Actualizar panel de información con animación suave
      const panel = document.getElementById('mapa-zone-info');
      if (panel) {
        panel.style.opacity = '0';
        panel.style.transition = 'opacity 0.15s ease';
        
        setTimeout(() => {
          panel.innerHTML = `
            <div style="width:60px;height:4px;background:${datos.color};border-radius:2px;margin:0 auto 1.5rem;"></div>
            <h3 style="font-family:var(--font-accent, 'Lato', sans-serif);font-size:1.8rem;color:var(--valtara-blanco, #fff);margin:0 0 1rem;">
              <i class="fa-solid ${datos.icono || 'fa-circle-info'}" style="margin-right:8px;color:${datos.color}" aria-hidden="true"></i>
              ${datos.titulo}
            </h3>
            <p style="color:var(--valtara-gris-texto, #aaa);font-size:1.05rem;line-height:1.7;margin:0 0 1.5rem;">
              <strong style="color:${datos.color};">Diagnóstico:</strong> ${datos.diagnostico}
            </p>
            <div style="text-align:left;width:100%;max-width:500px;margin:0 auto 1.5rem;">
              <p style="color:var(--valtara-gris-texto, #aaa);margin:0 0 0.5rem;"><strong>Causas comunes:</strong></p>
              <ul style="color:var(--valtara-gris-texto, #aaa);padding-left:1.5rem;margin:0;">
                ${datos.causas.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
            <div style="background:rgba(0,255,204,0.08);border:1px solid rgba(0,255,204,0.2);border-radius:1rem;padding:1rem;margin:0 auto 1.5rem;max-width:500px;">
              <p style="color:var(--valtara-cian-brillante, #00ffe0);margin:0;font-weight:600;">🎯 Protocolo Valtara:</p>
              <p style="color:var(--valtara-blanco, #fff);margin:0.5rem 0 0;font-size:0.95rem;">${datos.protocolo}</p>
            </div>
            <button id="btn-agendar-zona" style="background:var(--valtara-cian-brillante, #00ffe0);color:#000;border:none;padding:12px 32px;border-radius:50px;font-weight:700;font-family:'Lato',sans-serif;cursor:pointer;font-size:0.95rem;transition:transform 0.2s ease;">
              Agendar evaluación
            </button>
          `;
          panel.style.opacity = '1';
          
          // Listener para botón de agendar
          document.getElementById('btn-agendar-zona')?.addEventListener('click', () => {
            this.agendarSesion(zonaId, datos);
          });
        }, 150);
      }
      
      // Feedback visual en la zona seleccionada
      document.querySelectorAll('.zona-dot').forEach(dot => {
        if (dot.dataset.originalR) dot.setAttribute('r', dot.dataset.originalR);
      });
      const dotActivo = document.querySelector(`.zona-hit[data-id="${zonaId}"] .zona-dot`);      if (dotActivo) {
        dotActivo.dataset.originalR = dotActivo.getAttribute('r');
        dotActivo.setAttribute('r', '10');
        dotActivo.setAttribute('fill', datos.color);
      }
    },

    renderizarTabla: function() {
      const tbody = document.getElementById('mapa-tabla-body');
      if (!tbody) return;
      
      // Renderizado por lotes para no bloquear el hilo principal
      const zonas = Object.entries(ZONAS_CLINICAS);
      let index = 0;
      
      const renderLote = () => {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 5 && index < zonas.length; i++, index++) {
          const [id, datos] = zonas[index];
          const tr = document.createElement('tr');
          tr.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
          tr.innerHTML = `
            <td style="padding:14px 16px;color:var(--valtara-blanco, #fff);">${datos.titulo}</td>
            <td style="padding:14px 16px;color:var(--valtara-gris-texto, #aaa);">${datos.protocolo.split('(')[0].trim()}</td>
            <td style="padding:14px 16px;">
              <button class="btn-agendar-tabla" data-zona="${id}" style="background:rgba(0,255,204,0.15);color:var(--valtara-cian-brillante, #00ffe0);border:1px solid rgba(0,255,204,0.4);padding:6px 16px;border-radius:20px;font-size:0.8rem;cursor:pointer;">
                Agendar
              </button>
            </td>
          `;
          fragment.appendChild(tr);
        }
        tbody.appendChild(fragment);
        
        if (index < zonas.length) {
          requestAnimationFrame(renderLote);
        }
      };
      
      tbody.innerHTML = '';
      renderLote();
      
      // Delegar eventos de agendar en tabla
      tbody.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-agendar-tabla');
        if (btn) {
          const zonaId = btn.dataset.zona;
          const datos = ZONAS_CLINICAS[zonaId];
          if (datos) this.agendarSesion(zonaId, datos);
        }      });
    },

    agendarSesion: function(zonaId, datos) {
      // Integración con Aura AI o sistema de reservas
      if (typeof window.ValtaraAura !== 'undefined' && window.ValtaraAura.agendar) {
        window.ValtaraAura.agendar({
          zona: zonaId,
          titulo: datos.titulo,
          protocolo: datos.protocolo,
          origen: 'mapa_biomecanico'
        });
      } else if (typeof window.ValtaraReservas !== 'undefined' && window.ValtaraReservas.abrirModal) {
        window.ValtaraReservas.abrirModal({
          zona: zonaId,
          titulo: datos.titulo,
          protocolo: datos.protocolo
        });
      } else {
        // Fallback: redirigir con parámetros UTM
        const url = new URL('/agendar', window.location.origin);
        url.searchParams.set('zona', zonaId);
        url.searchParams.set('utm_source', 'mapa_biomecanico');
        url.searchParams.set('utm_medium', 'interactivo');
        window.location.href = url.toString();
      }
    }
  };

  // ========================================
  // 📦 EXPORTAR MÓDULO
  // ========================================
  // 1. Exportar template HTML (compatibilidad con estructura actual)
  global.ValtaraModulos = global.ValtaraModulos || {};
  global.ValtaraModulos.inicio_mapa_cuerpo = MAPA_TEMPLATE;

  // 2. Exportar controlador para uso externo si es necesario
  global.ValtaraMapaController = ValtaraMapaController;

  // 3. Auto-inicialización segura cuando el DOM esté listo
  function autoInit() {
    // Buscar contenedor donde se haya inyectado el template
    if (document.getElementById('mapa-3d-wrapper')) {
      ValtaraMapaController.init();
    } else {
      // Escuchar por si el template se inyecta dinámicamente
      const observer = new MutationObserver((mutations, obs) => {
        if (document.getElementById('mapa-3d-wrapper')) {
          ValtaraMapaController.init();
          obs.disconnect();        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      // Timeout de seguridad
      setTimeout(() => {
        if (document.getElementById('mapa-3d-wrapper')) {
          ValtaraMapaController.init();
        }
        observer.disconnect();
      }, 3000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    // Pequeño delay para asegurar que el template esté inyectado
    setTimeout(autoInit, 50);
  }

})(window);
