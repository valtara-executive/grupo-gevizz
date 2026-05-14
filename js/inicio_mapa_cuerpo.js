/**
 * VALTARA — MÓDULO DE INSPIRACIÓN SOCIAL Y BIENESTAR
 *
 * - Más de 150 frases generadas a partir de bancos temáticos
 * - Preguntas dinámicas sobre estado de ánimo y bienestar
 * - Respuestas con recomendaciones cotidianas y suaves
 * - Personalización con el nombre guardado del paciente
 * - Compartir por WhatsApp con el número oficial
 */

(function (global) {
  'use strict';

  const WHATSAPP_NUMBER = '523348572070';
  const PHONEBOOK_KEYS = ['valtara_user_name', 'valtara_sovereign_profile'];

  const FRASE_RAICES = [
    'La respiración consciente',
    'La pausa breve',
    'El descanso sin culpa',
    'La escucha corporal',
    'La suavidad contigo mismo',
    'El silencio interior',
    'La atención plena',
    'El autocuidado diario',
    'La paciencia amorosa',
    'El movimiento suave',
    'La hidratación constante',
    'La postura amable',
    'La calma sostenida',
    'La gratitud cotidiana',
    'La recuperación real',
    'La presencia honesta'
  ];

  const FRASE_CIERRES = [
    'te devuelve al centro.',
    'baja el ruido interno.',
    'ordena la tensión acumulada.',
    'recuerda que también mereces cuidado.',
    'abre espacio para respirar mejor.',
    'ayuda a soltar lo que pesa.',
    'hace que el cuerpo se sienta acompañado.',
    'cambia el ritmo del día con delicadeza.',
    'puede ser el inicio de una mejora real.',
    'te ayuda a regresar a ti.'
  ];

  const SOLUCIONES_ESPACIOS = [
    'Haz una pausa de tres minutos y deja caer los hombros.',
    'Bebe agua despacio y siente cómo cambia tu respiración.',
    'Camina unos pasos con atención en tus pies.',
    'Mueve el cuello sin exigirle amplitud.',
    'Apaga la pantalla unos instantes y mira lejos.',
    'Relaja la mandíbula y separa un poco los dientes.',
    'Cierra los ojos y cuenta cinco respiraciones suaves.',
    'Estira brazos y manos como si despertaras el cuerpo.',
    'Baja el ritmo de tu conversación interna.',
    'Toma una inhalación lenta y una exhalación todavía más lenta.',
    'Permite que tu cuerpo descanse sin sentir que estás fallando.',
    'Haz una pausa antes de responder un mensaje o una llamada.',
    'Busca una postura más cómoda y sostén ese alivio unos minutos.',
    'Date permiso de pedir apoyo en lugar de cargar todo en silencio.',
    'Regresa al presente con una sola cosa a la vez.'
  ];

  const CONTEXTOS_DIARIOS = [
    'cuando notes tensión en hombros o cuello',
    'si sientes cansancio emocional al final del día',
    'si llevas horas frente a la pantalla',
    'cuando el cuerpo te pida bajar el ritmo',
    'si te descubres respirando de forma superficial',
    'cuando sientas la mente muy llena',
    'si el sueño no está siendo reparador',
    'cuando la postura ya no se sienta cómoda',
    'si te cuesta concentrarte por el agotamiento',
    'cuando necesites una transición más amable entre tareas',
    'si la prisa está empujando tu día',
    'cuando quieras cuidarte sin complicarte'
  ];

  function cruzarBancos(base, contextos) {
    const salida = [];
    base.forEach((accion, index) => {
      contextos.forEach((contexto, cIndex) => {
        salida.push(`${accion} ${contexto}.`);
      });
    });
    return salida;
  }

  const FRASES_INSPIRADORAS = (() => {
    const frases = [];
    for (const raiz of FRASE_RAICES) {
      for (const cierre of FRASE_CIERRES) {
        frases.push(`${raiz} ${cierre}`);
      }
    }
    return frases;
  })();

  const SOLUCIONES_BIENESTAR = cruzarBancos(SOLUCIONES_ESPACIOS, CONTEXTOS_DIARIOS);

  const PREGUNTAS_DINAMICAS = [
    {
      pregunta: '¿Cómo te sientes el día de hoy?',
      opciones: [
        { texto: 'Con calma y claridad', valor: 'calma', color: '#00ffe0' },
        { texto: 'Con tensión acumulada', valor: 'tension', color: '#ff6b35' },
        { texto: 'Con necesidad de pausa', valor: 'pausa', color: '#b27fff' }
      ]
    },
    {
      pregunta: '¿Qué necesita tu cuerpo en este momento?',
      opciones: [
        { texto: 'Respirar más lento', valor: 'respiracion', color: '#00ffe0' },
        { texto: 'Descansar sin culpa', valor: 'descanso', color: '#b27fff' },
        { texto: 'Moverse con suavidad', valor: 'movimiento', color: '#ffd700' }
      ]
    },
    {
      pregunta: '¿Qué emoción está tocando tu cuerpo hoy?',
      opciones: [
        { texto: 'Ansiedad o inquietud', valor: 'inquietud', color: '#ff6b35' },
        { texto: 'Cansancio o pesadez', valor: 'cansancio', color: '#b27fff' },
        { texto: 'Equilibrio y serenidad', valor: 'equilibrio', color: '#00ffe0' }
      ]
    },
    {
      pregunta: '¿En qué zona sientes más carga actualmente?',
      opciones: [
        { texto: 'Cabeza y cuello', valor: 'cabeza', color: '#ffd700' },
        { texto: 'Espalda y zona lumbar', valor: 'espalda', color: '#00ffe0' },
        { texto: 'Piernas y pies', valor: 'piernas', color: '#ff6b35' }
      ]
    },
    {
      pregunta: '¿Qué pequeño gesto puedes regalarte hoy?',
      opciones: [
        { texto: 'Tomar agua lentamente', valor: 'hidratacion', color: '#00ffe0' },
        { texto: 'Estirar cuello y hombros', valor: 'estiramiento', color: '#ffd700' },
        { texto: 'Cerrar los ojos unos segundos', valor: 'pausa', color: '#b27fff' }
      ]
    },
    {
      pregunta: '¿Qué mensaje te gustaría escuchar de tu cuerpo?',
      opciones: [
        { texto: 'Ya puedes bajar el ritmo', valor: 'ritmo', color: '#00ffe0' },
        { texto: 'Mereces cuidado', valor: 'merecimiento', color: '#ffd700' },
        { texto: 'Todo irá soltándose', valor: 'soltar', color: '#b27fff' }
      ]
    }
  ];

  const RESPUESTAS_POR_VALOR = {
    calma: [
      'Conservar la calma también es una forma de entrenar al sistema nervioso para sentirse seguro.',
      'Tu serenidad merece espacio; protégela con descansos breves y respiraciones lentas.',
      'La calma no es pasividad: es una base estable para tomar mejores decisiones.'
    ],
    tension: [
      'Reconocer la tensión ya abre una puerta para liberarla con apoyo, pausa y una sesión de masoterapia.',
      'Tu cuerpo puede estar pidiendo alivio antes de que el cansancio se vuelva más fuerte.',
      'Cuando la tensión aparece, el primer paso es bajar la exigencia y volver al cuerpo.'
    ],
    pausa: [
      'Pedir una pausa no es rendirse; es darle al cuerpo una oportunidad real de recuperarse.',
      'Descansar sin culpa cambia la forma en la que tu energía se organiza durante el día.',
      'Tu necesidad de pausa es válida incluso si el mundo va más rápido que tú.'
    ],
    respiracion: [
      'Respirar profundo puede cambiar la forma en que tu cuerpo tolera el estrés del día.',
      'Una exhalación lenta le recuerda al sistema nervioso que puede aflojar la guardia.',
      'La respiración consciente es un gesto pequeño con un efecto enorme en tu bienestar.'
    ],
    descanso: [
      'El descanso profundo también es una tarea importante: reparar, integrar y seguir.',
      'Dormir o descansar mejor suele empezar por permitirte bajar la demanda mental.',
      'El cuerpo se regenera mejor cuando no está peleando con la culpa por detenerse.'
    ],
    movimiento: [
      'El movimiento suave es una llave amable para destrabar tensión acumulada sin forzar el cuerpo.',
      'Moverte con calma puede ayudar a que tu energía vuelva a circular con más libertad.',
      'A veces el alivio empieza con un estiramiento pequeño y sostenido.'
    ],
    inquietud: [
      'La inquietud puede encontrar salida cuando la acompaña una rutina más lenta y predecible.',
      'No tienes que pelear con la ansiedad: también puedes responderle con contención y orden.',
      'Tu inquietud merece un espacio seguro para desactivarse.'
    ],
    cansancio: [
      'El cansancio no es flojera; es información. Escucharlo a tiempo evita que se vuelva demasiado pesado.',
      'Cuando la energía baja, conviene simplificar el día y sostener lo esencial.',
      'Tu cuerpo te está pidiendo una pausa antes de seguir exigiéndose.'
    ],
    equilibrio: [
      'Los días de equilibrio también son importantes; cuidar ese estado ayuda a sostenerlo más tiempo.',
      'Tu bienestar crece cuando aprendes a reconocer lo que sí te está haciendo bien.',
      'La estabilidad también se nutre con rutinas suaves y constantes.'
    ],
    cabeza: [
      'La cabeza y el cuello suelen cargar demasiadas tareas al mismo tiempo; liberar esa zona puede cambiar mucho.',
      'La tensión en cuello y cabeza suele responder bien a pausas, descanso y terapia manual suave.',
      'Cuando la mente se satura, el cuerpo suele pedir alivio en la parte alta.'
    ],
    espalda: [
      'La espalda sostiene más de lo que se ve; darle atención también es una forma de alivio emocional.',
      'Un tratamiento enfocado en espalda puede ayudar a soltar posturas y cargas acumuladas.',
      'Tu centro necesita espacio para sostenerte mejor.'
    ],
    piernas: [
      'Piernas y pies trabajan sin descanso; liberarlos mejora la sensación general de carga.',
      'La pesadez baja también merece atención manual, hidratación y descanso apropiado.',
      'Tus raíces necesitan el mismo cuidado que das al resto de tu cuerpo.'
    ],
    hidratacion: [
      'Beber agua despacio también le recuerda al cuerpo que puede regularse mejor.',
      'La hidratación ayuda más cuando se acompaña de pausas y respiración tranquila.',
      'Tu cuerpo agradece la hidratación constante, no solo la urgencia.'
    ],
    estiramiento: [
      'Un estiramiento suave puede ser suficiente para que el cuerpo suelte parte de la carga del día.',
      'Estirar con calma evita que la tensión se quede atrapada más tiempo.',
      'Mover la zona que más se queja también es una forma de escucharte.'
    ],
    ritmo: [
      'Bajar el ritmo a tiempo suele ser más inteligente que esperar al agotamiento.',
      'Tu ritmo merece respeto aunque no se vea igual al de los demás.',
      'El bienestar también se construye cuando eliges no correr todo el tiempo.'
    ],
    merecimiento: [
      'Mereces cuidado sin tener que ganártelo; tu bienestar ya importa por sí mismo.',
      'El descanso no se pide por permiso: se reconoce como una necesidad real.',
      'Cuidarte también es una forma de decirte que importas.'
    ],
    soltar: [
      'Soltar suele empezar con una pausa segura, una exhalación lenta y una atención más amable.',
      'Tu cuerpo puede aprender a aflojar cuando deja de sentir que todo depende de él.',
      'Cada vez que sueltas un poco, haces espacio para sentirte mejor.'
    ]
  };

  function getStoredName() {
    try {
      const direct = localStorage.getItem('valtara_user_name');
      if (direct && direct.trim()) return direct.trim();
      const profile = localStorage.getItem('valtara_sovereign_profile');
      if (profile) {
        const parsed = JSON.parse(profile);
        if (parsed && parsed.name && String(parsed.name).trim()) return String(parsed.name).trim();
      }
    } catch (e) {
      // silencioso: si falla localStorage, se usa el fallback
    }
    const input = document.getElementById('welcome-name-input');
    if (input && input.value && input.value.trim()) return input.value.trim();
    return 'Paciente';
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function getBankedSolutions(seedValue, total = 4) {
    const seed = SOLUCIONES_BIENESTAR.filter((_, idx) => idx % 5 === (seedValue.length % 5));
    const merged = [...seed, ...SOLUCIONES_BIENESTAR];
    const unique = [...new Set(merged)];
    const shuffled = unique.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, total);
  }

  function buildQuestionOptions(opciones) {
    return opciones.map((op) => `
      <button type="button" class="redes-opcion-btn" data-valor="${op.valor}" data-color="${op.color}" role="radio" aria-checked="false">
        <span class="redes-opcion-dot" aria-hidden="true"><span class="opcion-check-redes"></span></span>
        <span class="redes-opcion-texto">${op.texto}</span>
      </button>
    `).join('');
  }

  function buildPhraseBank() {
    const frases = [];
    for (const raiz of FRASE_RAICES) {
      for (const cierre of FRASE_CIERRES) {
        frases.push(`${raiz} ${cierre}`);
      }
    }
    return frases;
  }

  function buildSolutionsMarkup(items) {
    return items.map((item) => `
      <article class="redes-solucion-chip">
        <span class="redes-solucion-index">•</span>
        <p>${item}</p>
      </article>
    `).join('');
  }

  const FRASES_INSPIRADORAS_BANCO = buildPhraseBank();

  const REDES_TEMPLATE = `
<section aria-labelledby="redes-titulo" class="redes-container">
  <div class="redes-header">
    <div class="redes-banner-personalizado">
      <span class="redes-banner-badge"><i class="fa-solid fa-seedling" aria-hidden="true"></i></span>
      <div>
        <p class="redes-bienvenida">Bienvenido, <strong>${getStoredName()}</strong></p>
        <h2 id="redes-titulo">Espacio de Reflexión</h2>
      </div>
    </div>
    <p class="redes-subtitulo">
      Palabras suaves para acompañar tu proceso. Cada visita trae una nueva frase, una nueva pregunta y una nueva forma de cuidarte.
    </p>
  </div>

  <div class="redes-frase-card" role="article" aria-live="polite">
    <blockquote class="redes-frase-texto">"${pick(FRASES_INSPIRADORAS_BANCO)}"</blockquote>
    <div class="redes-acciones-frase">
      <button id="redes-compartir-frase" class="redes-compartir-btn" type="button" aria-label="Compartir esta frase por WhatsApp">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
        Compartir reflexión
      </button>
      <p class="redes-frase-ayuda">Actualiza la página para descubrir otra frase.</p>
    </div>
  </div>

  <div class="redes-pregunta-card">
    <div class="redes-pregunta-encabezado">
      <p class="redes-mini-etiqueta">Pregunta del momento</p>
      <h3 id="redes-pregunta-texto">${PREGUNTAS_DINAMICAS[0].pregunta}</h3>
    </div>
    <div id="redes-opciones-container" class="redes-opciones-grid" role="radiogroup" aria-label="Selecciona una opción">
      ${buildQuestionOptions(PREGUNTAS_DINAMICAS[0].opciones)}
    </div>

    <div id="redes-respuesta-feedback" class="redes-feedback" hidden>
      <p class="redes-feedback-texto"></p>
      <div class="redes-soluciones-wrap">
        <p class="redes-mini-etiqueta">Ejemplos para tu día</p>
        <div id="redes-soluciones-container" class="redes-soluciones-grid"></div>
      </div>
      <button id="redes-whatsapp-respuesta" class="redes-whatsapp-btn" type="button">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
        Compartir mi reflexión
      </button>
    </div>
  </div>

  <div class="redes-banner-wa glass-card">
    <div>
      <p class="redes-mini-etiqueta">WhatsApp personalizado</p>
      <h3>Mensaje listo con tu nombre y tu respuesta</h3>
      <p>El contacto oficial de atención es <strong>+52 33 4857 2070</strong>. Tu selección se transforma en un mensaje claro y directo para continuar la conversación.</p>
    </div>
    <div class="redes-banner-wa-pill">
      <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
      <span>${getStoredName()}</span>
    </div>
  </div>

  <div class="redes-disclaimer">
    <strong>Recordatorio:</strong> Valtara es un espacio de masoterapia manual y bienestar. No sustituye atención médica ni diagnóstica.
  </div>
</section>
  `;

  function getFeedbackRespuesta(valor) {
    const opciones = RESPUESTAS_POR_VALOR[valor] || [
      'Escuchar tu cuerpo con calma ya es una forma de cuidarte.',
      'Tu bienestar mejora cuando permites pausas pequeñas y constantes.',
      'Cada señal corporal también puede ser una invitación a descansar.'
    ];
    return pick(opciones);
  }

  function injectStyles() {
    if (document.getElementById('redes-dinamicas-estilos')) return;
    const style = document.createElement('style');
    style.id = 'redes-dinamicas-estilos';
    style.textContent = `
      .redes-container {
        max-width: 1180px;
        margin: 0 auto;
        padding: 1rem 0 2rem;
      }

      .redes-header {
        margin-bottom: 1.3rem;
        text-align: center;
      }

      .redes-banner-personalizado {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.2rem;
        border: 1px solid rgba(178,127,255,.18);
        background: rgba(255,255,255,.03);
        border-radius: 1.5rem;
        box-shadow: 0 18px 40px rgba(0,0,0,.2);
      }

      .redes-banner-badge {
        width: 56px;
        height: 56px;
        display: grid;
        place-items: center;
        border-radius: 18px;
        background: rgba(0,255,224,.12);
        color: var(--valtara-cian-brillante, #00ffe0);
        font-size: 1.4rem;
      }

      .redes-bienvenida {
        margin: 0 0 .2rem;
        color: var(--valtara-gris-texto, #aaa);
        font-size: .95rem;
      }

      #redes-titulo {
        margin: 0;
        font-family: var(--font-accent, 'Lato', sans-serif);
        color: var(--valtara-blanco, #fff);
        font-size: clamp(2rem, 4vw, 2.8rem);
      }

      .redes-subtitulo {
        max-width: 760px;
        margin: 1rem auto 0;
        color: var(--valtara-gris-texto, #aaa);
        line-height: 1.8;
        font-size: 1rem;
      }

      .redes-frase-card,
      .redes-pregunta-card,
      .redes-banner-wa,
      .redes-disclaimer {
        margin-top: 1.25rem;
        border-radius: 1.6rem;
        border: 1px solid rgba(255,255,255,.08);
        background: rgba(255,255,255,.03);
        box-shadow: 0 18px 45px rgba(0,0,0,.22);
      }

      .redes-frase-card {
        padding: 1.4rem 1.2rem 1.5rem;
        text-align: center;
      }

      .redes-frase-texto {
        margin: 0 auto 1rem;
        max-width: 900px;
        font-family: var(--font-accent, 'Lato', sans-serif);
        color: var(--valtara-blanco, #fff);
        font-size: clamp(1.2rem, 2.2vw, 1.55rem);
        line-height: 1.7;
        font-style: italic;
      }

      .redes-acciones-frase {
        display: grid;
        justify-items: center;
        gap: .65rem;
      }

      .redes-compartir-btn,
      .redes-whatsapp-btn,
      .redes-opcion-btn {
        border: 0;
        cursor: pointer;
      }

      .redes-compartir-btn,
      .redes-whatsapp-btn {
        display: inline-flex;
        align-items: center;
        gap: .65rem;
        padding: .95rem 1.25rem;
        border-radius: 999px;
        background: linear-gradient(135deg, #22c55e, #00b36a);
        color: #fff;
        font-weight: 700;
        box-shadow: 0 12px 28px rgba(34,197,94,.18);
      }

      .redes-frase-ayuda {
        margin: 0;
        color: var(--valtara-gris-texto, #aaa);
        font-size: .9rem;
      }

      .redes-pregunta-card {
        padding: 1.45rem;
      }

      .redes-pregunta-encabezado {
        text-align: center;
        margin-bottom: 1rem;
      }

      .redes-mini-etiqueta {
        margin: 0 0 .4rem;
        color: var(--valtara-cian-brillante, #00ffe0);
        letter-spacing: .24em;
        text-transform: uppercase;
        font-size: .72rem;
      }

      #redes-pregunta-texto {
        margin: 0;
        font-family: var(--font-accent, 'Lato', sans-serif);
        color: var(--valtara-blanco, #fff);
        font-size: clamp(1.15rem, 2vw, 1.45rem);
      }

      .redes-opciones-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: .9rem;
      }

      .redes-opcion-btn {
        min-height: 76px;
        padding: 1rem 1rem;
        border-radius: 1.1rem;
        display: flex;
        align-items: center;
        gap: .9rem;
        text-align: left;
        color: var(--valtara-blanco, #fff);
        background: rgba(255,255,255,.04);
        border: 2px solid rgba(255,255,255,.09);
        transition: transform .18s ease, border-color .18s ease, background .18s ease;
      }

      .redes-opcion-btn:hover {
        transform: translateY(-2px);
      }

      .redes-opcion-dot {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid currentColor;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
      }

      .opcion-check-redes {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: currentColor;
        opacity: 0;
        transition: opacity .18s ease;
      }

      .redes-opcion-texto {
        font-size: .96rem;
        line-height: 1.4;
      }

      .redes-feedback {
        margin-top: 1.1rem;
        padding: 1rem;
        border-radius: 1.2rem;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.08);
      }

      .redes-feedback-texto {
        margin: 0;
        color: var(--valtara-blanco, #fff);
        line-height: 1.8;
        font-size: 1.02rem;
      }

      .redes-soluciones-wrap {
        margin-top: 1rem;
      }

      .redes-soluciones-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: .75rem;
        margin-top: .75rem;
      }

      .redes-solucion-chip {
        display: flex;
        align-items: flex-start;
        gap: .75rem;
        padding: .9rem 1rem;
        border-radius: 1rem;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.08);
      }

      .redes-solucion-index {
        color: var(--valtara-cian-brillante, #00ffe0);
        font-size: 1.2rem;
        line-height: 1;
        margin-top: .08rem;
      }

      .redes-solucion-chip p {
        margin: 0;
        color: var(--valtara-gris-texto, #cfcfcf);
        line-height: 1.6;
        font-size: .95rem;
      }

      .redes-banner-wa {
        margin-top: 1.25rem;
        padding: 1.2rem 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }

      .redes-banner-wa h3 {
        margin: 0 0 .4rem;
        color: var(--valtara-blanco, #fff);
        font-size: 1.3rem;
      }

      .redes-banner-wa p {
        margin: 0;
        color: var(--valtara-gris-texto, #aaa);
        line-height: 1.7;
      }

      .redes-banner-wa-pill {
        display: inline-flex;
        align-items: center;
        gap: .65rem;
        padding: .85rem 1rem;
        border-radius: 999px;
        background: rgba(34,197,94,.14);
        color: #d7ffe8;
        white-space: nowrap;
        border: 1px solid rgba(34,197,94,.18);
      }

      .redes-disclaimer {
        margin-top: 1.25rem;
        padding: 1rem 1.15rem;
        color: var(--valtara-gris-texto, #aaa);
        line-height: 1.7;
      }

      @media (max-width: 720px) {
        .redes-banner-wa {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function renderSelectedQuestion(question) {
    const preguntaEl = document.getElementById('redes-pregunta-texto');
    const opcionesEl = document.getElementById('redes-opciones-container');
    if (preguntaEl) preguntaEl.textContent = question.pregunta;
    if (opcionesEl) {
      opcionesEl.innerHTML = buildQuestionOptions(question.opciones);
    }
  }

  const RedesController = {
    estado: {
      respuestaSeleccionada: null,
      question: null,
      frase: null
    },

    init() {
      if (!document.getElementById('redes-titulo')) {
        setTimeout(() => this.init(), 80);
        return;
      }
      this.estado.frase = pick(FRASES_INSPIRADORAS_BANCO);
      this.estado.question = (() => {
        const base = PREGUNTAS_DINAMICAS[Math.floor(Math.random() * PREGUNTAS_DINAMICAS.length)];
        const opciones = [...base.opciones].sort(() => Math.random() - 0.5);
        return { ...base, opciones };
      })();
      this.applyDynamicContent();
      this.setupEventListeners();
      this.setupCompartirFrase();
      this.setupAccessibility();
    },

    applyDynamicContent() {
      const fraseNode = document.querySelector('.redes-frase-texto');
      if (fraseNode) fraseNode.textContent = `"${this.estado.frase}"`;
      renderSelectedQuestion(this.estado.question);
      const nombre = getStoredName();
      const bienvenida = document.querySelector('.redes-bienvenida strong');
      if (bienvenida) bienvenida.textContent = nombre;
      const pill = document.querySelector('.redes-banner-wa-pill span');
      if (pill) pill.textContent = nombre;
    },

    setupAccessibility() {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        document.querySelectorAll('.redes-opcion-btn, .redes-compartir-btn, .redes-whatsapp-btn').forEach((btn) => {
          btn.style.transition = 'none';
        });
      }

      const highContrast = window.matchMedia('(prefers-contrast: more)').matches;
      if (highContrast) {
        document.querySelectorAll('.redes-opcion-btn').forEach((btn) => {
          btn.style.borderWidth = '3px';
          btn.style.fontWeight = '600';
        });
      }
    },

    setupCompartirFrase() {
      document.getElementById('redes-compartir-frase')?.addEventListener('click', () => {
        const nombre = getStoredName();
        const texto = encodeURIComponent(
          `✨ ${this.estado.frase}\n\n${nombre} encontró esta reflexión en Valtara.\n🌿 Masoterapia manual y bienestar\n📞 +52 33 4857 2070`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, '_blank', 'noopener');
      });
    },

    setupEventListeners() {
      document.querySelectorAll('.redes-opcion-btn').forEach((btn) => {
        btn.addEventListener('click', (event) => {
          const { valor, color } = event.currentTarget.dataset;
          this.seleccionarRespuesta(valor, color);
        });
        btn.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const { valor, color } = event.currentTarget.dataset;
            this.seleccionarRespuesta(valor, color);
          }
        });
      });

      document.getElementById('redes-whatsapp-respuesta')?.addEventListener('click', () => {
        if (!this.estado.respuestaSeleccionada) return;
        const nombre = getStoredName();
        const { texto, feedback } = this.estado.respuestaSeleccionada;
        const pregunta = this.estado.question?.pregunta || '¿Cómo te sientes el día de hoy?';
        const soluciones = this.estado.respuestaSeleccionada.soluciones || [];
        const mensaje = encodeURIComponent(
          `💭 Reflexión Valtara\n\n` +
          `Paciente: ${nombre}\n` +
          `Pregunta: ${pregunta}\n` +
          `Mi respuesta: ${texto}\n\n` +
          `💡 ${feedback}\n` +
          `${soluciones.length ? `\nSugerencias:\n- ${soluciones.join('\n- ')}` : ''}\n\n` +
          `— Valtara: masoterapia manual y bienestar\n` +
          `📞 +52 33 4857 2070`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, '_blank', 'noopener');
      });
    },

    seleccionarRespuesta(valor, color) {
      const pregunta = this.estado.question;
      const opciones = pregunta?.opciones || [];
      const seleccion = opciones.find((o) => o.valor === valor);
      const feedback = getFeedbackRespuesta(valor);
      const soluciones = getBankedSolutions(valor, 4);

      this.estado.respuestaSeleccionada = {
        valor,
        texto: seleccion ? seleccion.texto : valor,
        feedback,
        soluciones
      };

      document.querySelectorAll('.opcion-check-redes').forEach((check) => {
        check.style.opacity = '0';
      });
      document.querySelectorAll('.redes-opcion-btn').forEach((btn) => {
        btn.style.borderColor = 'rgba(255,255,255,.09)';
        btn.style.background = 'rgba(255,255,255,.04)';
      });

      const btnSeleccionado = document.querySelector(`.redes-opcion-btn[data-valor="${valor}"]`);
      if (btnSeleccionado) {
        btnSeleccionado.style.borderColor = color || '#00ffe0';
        btnSeleccionado.style.background = `${color || '#00ffe0'}15`;
        const check = btnSeleccionado.querySelector('.opcion-check-redes');
        if (check) check.style.opacity = '1';
      }

      const feedbackContainer = document.getElementById('redes-respuesta-feedback');
      const feedbackTexto = feedbackContainer?.querySelector('.redes-feedback-texto');
      const solucionesContainer = document.getElementById('redes-soluciones-container');
      if (feedbackTexto && feedbackContainer && solucionesContainer) {
        feedbackTexto.textContent = feedback;
        solucionesContainer.innerHTML = buildSolutionsMarkup(soluciones);
        feedbackContainer.hidden = false;
        feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  global.ValtaraModulos = global.ValtaraModulos || {};
  global.ValtaraModulos.inicio_redes_sociales = REDES_TEMPLATE;
  global.ValtaraModulos.inicio_redes = REDES_TEMPLATE;
  global.ValtaraRedesController = RedesController;

  function autoInit() {
    if (document.getElementById('redes-titulo')) {
      RedesController.init();
      return;
    }
    const observer = new MutationObserver((_, obs) => {
      if (document.getElementById('redes-titulo')) {
        RedesController.init();
        obs.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    setTimeout(autoInit, 50);
  }
})(window);
