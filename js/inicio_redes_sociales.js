/**
 * VALTARA — MÓDULO DE INSPIRACIÓN SOCIAL V2.0
 * Módulo: js/inicio_redes.js
 * 
 * ✅ 100+ frases inspiradoras que cambian aleatoriamente
 * ✅ Preguntas dinámicas con 3 opciones que se randomizan en cada carga
 * ✅ Diseño elegante, accesible y coherente con marca Valtara
 * ✅ Integración con WhatsApp para compartir reflexiones
 * ✅ Exporta a window.ValtaraModulos.inicio_redes (compatibilidad total)
 */

(function(global) {
  'use strict';

  // ========================================
  // 💫 BANCO DE 100+ FRASES INSPIRADORAS
  // ========================================
  const FRASES_INSPIRADORAS = [
    "Cada respiración consciente es un acto de amor hacia ti mismo.",
    "El cuerpo guarda la memoria; la masoterapia ayuda a liberarla.",
    "No se trata de eliminar el dolor, sino de entender su mensaje.",
    "Tu bienestar es un proceso, no un destino.",
    "La calma no es la ausencia de caos, sino la paz en medio de él.",
    "Escuchar al cuerpo es el primer paso para sanar.",
    "Pequeños cambios generan grandes transformaciones.",
    "El autocuidado no es egoísmo, es supervivencia consciente.",
    "Tu cuerpo merece la misma atención que le das a tus metas.",
    "La tensión es una carta; la masoterapia, su traducción.",
    "Respirar profundo ya es un acto de valentía.",
    "No necesitas ser perfecto para merecer cuidado.",
    "Cada sesión es un diálogo entre tus manos y tu bienestar.",
    "La paciencia contigo mismo es la mayor terapia.",
    "El descanso no es un lujo, es una necesidad biológica.",
    "Tu valor no depende de tu productividad.",
    "Sanar no es lineal; permite los altibajos.",
    "El cuerpo habla en símbolos; aprende su idioma.",
    "La suavidad también es fuerza.",
    "Cuidarte es revolucionario en un mundo que exige agotamiento.",
    "No pospongas tu paz para un 'después' que no existe.",
    "La masoterapia no cura enfermedades; acompaña procesos.",
    "Tu ritmo es válido, aunque sea diferente al de otros.",
    "El silencio interior es el mejor aliado del cuerpo.",
    "Cada músculo relajado es una oración de gratitud.",
    "No necesitas justificar tu necesidad de descanso.",
    "La atención plena transforma el dolor en información.",
    "Tu cuerpo es tu hogar; trátalo con respeto.",
    "La consistencia suave vence a la intensidad esporádica.",
    "Permitir es el primer paso para soltar.",
    "El bienestar se construye en momentos, no en milagros.",
    "No compares tu proceso con el de nadie más.",    "La masoterapia es un abrazo que el cuerpo recuerda.",
    "Tu sensibilidad es un superpoder, no una debilidad.",
    "Cuidar de ti no espera a que 'termines' de cuidar a otros.",
    "La respiración es el puente entre mente y cuerpo.",
    "No necesitas 'arreglarte'; necesitas escucharte.",
    "El autocuidado es un acto de resistencia cotidiana.",
    "Tu cuerpo sabe sanar; solo necesita condiciones para hacerlo.",
    "La paciencia es amor en cámara lenta.",
    "Cada sesión es una inversión en tu futuro yo.",
    "No subestimes el poder de una pausa consciente.",
    "La masoterapia no es un gasto, es un regalo a tu sistema nervioso.",
    "Tu bienestar es la base desde la que construyes todo lo demás.",
    "El cuerpo no miente; aprende a leer sus señales.",
    "La suavidad contigo mismo abre puertas que la fuerza cierra.",
    "No necesitas más fuerza; necesitas más permiso para sentir.",
    "Cada respiración es una oportunidad para empezar de nuevo.",
    "El descanso activo también es progreso.",
    "Tu valor es inherente, no condicional.",
    "La masoterapia es lenguaje sin palabras.",
    "Permitir el descanso es permitir la vida.",
    "No pospongas tu paz para cuando 'todo esté bajo control'.",
    "El cuerpo agradece la intención, no la perfección.",
    "Tu proceso merece celebración, no crítica.",
    "La atención es la forma más pura de cuidado.",
    "No necesitas 'merecer' el descanso; ya lo mereces por existir.",
    "Cada momento de consciencia corporal es un acto de libertad.",
    "La masoterapia no borra el estrés; te enseña a navegarlo.",
    "Tu cuerpo es sabio; confía en su inteligencia.",
    "El autocuidado no es un evento, es una práctica diaria.",
    "No necesitas cambiar tu cuerpo para amarlo.",
    "La paciencia es la compañera de toda transformación real.",
    "Cuidar de ti no es egoísmo; es responsabilidad.",
    "El silencio del cuerpo a veces grita más que las palabras.",
    "Tu bienestar no compite con el de nadie más.",
    "La masoterapia es un recordatorio: mereces ser cuidado.",
    "No necesitas justificar tu necesidad de pausa.",
    "El cuerpo guarda historias; la masoterapia ayuda a reescribirlas.",
    "La suavidad es la forma más valiente de fortaleza.",
    "Tu ritmo es perfecto para ti, aunque otros no lo entiendan.",
    "Cada sesión es un acto de fe en tu capacidad de sanar.",
    "No pospongas tu paz para un 'momento ideal' que no llega.",
    "El descanso no es rendición; es estrategia de vida.",
    "Tu cuerpo no es un problema a resolver; es un aliado a escuchar.",
    "La masoterapia no cura; acompaña, sostiene, facilita.",
    "No necesitas más disciplina; necesitas más compasión.",
    "El autocuidado es la base desde la que cuidas a otros.",
    "Tu valor no fluctúa con tu nivel de energía.",
    "La atención plena transforma el malestar en mensaje.",
    "Cuidar de ti no espera a que 'se calme todo'.",
    "El cuerpo responde a la intención amorosa, no a la exigencia.",    "No necesitas 'arreglar' tu cuerpo; necesitas habitarlo.",
    "La paciencia contigo mismo es la mayor revolución.",
    "Tu bienestar es un derecho, no un privilegio.",
    "La masoterapia es un diálogo silencioso entre tú y tu cuerpo.",
    "No subestimes el poder de una mano que escucha.",
    "El descanso es el suelo donde crece la transformación.",
    "Tu cuerpo merece la misma urgencia que tus obligaciones.",
    "La masoterapia no elimina el estrés; te da herramientas para gestionarlo.",
    "No necesitas más fuerza de voluntad; necesitas más permiso para sentir.",
    "Cada respiración consciente es un ancla en la tormenta.",
    "El autocuidado no es un lujo; es una necesidad humana.",
    "Tu cuerpo no es un obstáculo; es tu vehículo de experiencia.",
    "La suavidad contigo mismo abre caminos que la rigidez cierra.",
    "No pospongas tu paz para cuando 'tengas tiempo'.",
    "El cuerpo agradece la constancia suave más que la intensidad esporádica.",
    "Tu proceso de bienestar es único; honra su ritmo.",
    "La masoterapia es un recordatorio: estás aquí, y eso ya es suficiente.",
    "No necesitas justificar tu necesidad de cuidado; ya es válida.",
    "El descanso activo también construye resiliencia.",
    "Tu valor es inherente; no depende de tu estado físico.",
    "La atención es el primer acto de amor hacia tu cuerpo.",
    "Cuidar de ti no es egoísmo; es la base para cuidar a otros.",
    "El cuerpo habla en sensaciones; la masoterapia ayuda a traducirlas.",
    "No necesitas cambiar para merecer cuidado; ya lo mereces.",
    "La paciencia es amor aplicado al tiempo.",
    "Tu bienestar no es un destino; es una práctica diaria.",
    "La masoterapia no cura enfermedades; crea condiciones para que el cuerpo sane.",
    "No necesitas más presión; necesitas más espacio para sentir.",
    "Cada momento de consciencia corporal es un acto de libertad.",
    "El autocuidado es la forma más profunda de autoconocimiento.",
    "Tu cuerpo es tu primer hogar; trátalo con la ternura que merece."
  ];

  // ========================================
  // ❓ BANCO DE PREGUNTAS DINÁMICAS
  // ========================================
  const PREGUNTAS_DINAMICAS = [
    {
      pregunta: "¿Cómo te sientes hoy en tu cuerpo?",
      opciones: [
        { texto: "Con tensión acumulada", valor: "tension", color: "#ff6b35" },
        { texto: "Con energía equilibrada", valor: "equilibrio", color: "#00ffe0" },
        { texto: "Con necesidad de pausa", valor: "pausa", color: "#b27fff" }
      ]
    },
    {
      pregunta: "¿Qué necesita tu cuerpo en este momento?",
      opciones: [
        { texto: "Movimiento suave", valor: "movimiento", color: "#00ffe0" },
        { texto: "Descanso profundo", valor: "descanso", color: "#b27fff" },        { texto: "Liberación de tensión", valor: "liberacion", color: "#ff6b35" }
      ]
    },
    {
      pregunta: "¿En qué zona sientes más conexión hoy?",
      opciones: [
        { texto: "Cabeza y cuello", valor: "cabeza", color: "#ffd700" },
        { texto: "Espalda y core", valor: "espalda", color: "#00ffe0" },
        { texto: "Piernas y pies", valor: "piernas", color: "#ff6b35" }
      ]
    },
    {
      pregunta: "¿Qué emoción está habitando tu cuerpo ahora?",
      opciones: [
        { texto: "Calma y presencia", valor: "calma", color: "#00ffe0" },
        { texto: "Inquietud o ansiedad", valor: "inquietud", color: "#ff6b35" },
        { texto: "Cansancio o agotamiento", valor: "cansancio", color: "#b27fff" }
      ]
    },
    {
      pregunta: "¿Qué pequeño gesto de cuidado puedes ofrecerte hoy?",
      opciones: [
        { texto: "5 minutos de respiración consciente", valor: "respiracion", color: "#00ffe0" },
        { texto: "Un estiramiento suave", valor: "estiramiento", color: "#ffd700" },
        { texto: "Permiso para descansar sin culpa", valor: "permiso", color: "#b27fff" }
      ]
    },
    {
      pregunta: "¿Qué mensaje crees que tu cuerpo quiere compartirte?",
      opciones: [
        { texto: "Necesito más pausa", valor: "pausa", color: "#b27fff" },
        { texto: "Estoy listo para soltar", valor: "soltar", color: "#00ffe0" },
        { texto: "Merezco ser cuidado", valor: "cuidado", color: "#ffd700" }
      ]
    },
    {
      pregunta: "¿Cómo describirías tu nivel de energía corporal hoy?",
      opciones: [
        { texto: "Fluyendo con facilidad", valor: "flujo", color: "#00ffe0" },
        { texto: "Estancado o pesado", valor: "estancado", color: "#ff6b35" },
        { texto: "En transición o cambio", valor: "transicion", color: "#b27fff" }
      ]
    },
    {
      pregunta: "¿Qué parte de tu cuerpo te pide más atención hoy?",
      opciones: [
        { texto: "Hombros y cuello", valor: "hombros", color: "#ffd700" },
        { texto: "Espalda baja", valor: "lumbar", color: "#ff6b35" },
        { texto: "Piernas y pies", valor: "piernas", color: "#00ffe0" }
      ]    },
    {
      pregunta: "¿Qué necesitas recordar sobre tu bienestar hoy?",
      opciones: [
        { texto: "Mi ritmo es válido", valor: "ritmo", color: "#b27fff" },
        { texto: "Merezco cuidado sin condiciones", valor: "merecimiento", color: "#00ffe0" },
        { texto: "El progreso no es lineal", valor: "progreso", color: "#ffd700" }
      ]
    },
    {
      pregunta: "¿Qué pequeña victoria corporal puedes celebrar hoy?",
      opciones: [
        { texto: "Respiré más profundo que ayer", valor: "respiracion", color: "#00ffe0" },
        { texto: "Escuché una señal de mi cuerpo", valor: "escucha", color: "#ffd700" },
        { texto: "Me permití una pausa sin culpa", valor: "pausa", color: "#b27fff" }
      ]
    }
  ];

  // ========================================
  // 🎨 TEMPLATE HTML - INSPIRACIÓN SOCIAL
  // ========================================
  const REDES_TEMPLATE = `
<section aria-labelledby="redes-titulo" class="redes-container">
  <div class="redes-header">
    <div style="display:inline-flex;align-items:center;gap:14px;margin-bottom:1rem;">
      <span style="background:rgba(178,127,255,0.15);border:1px solid rgba(178,127,255,0.3);padding:12px;border-radius:50%;display:flex;">
        <i class="fa-solid fa-seedling" style="color:var(--valtara-morado, #b27fff);font-size:2rem;" aria-hidden="true"></i>
      </span>
      <h2 id="redes-titulo" style="font-family:var(--font-accent, 'Lato', sans-serif);color:var(--valtara-blanco, #fff);font-size:2.2rem;margin:0;">Espacio de Reflexión</h2>
    </div>
    <p style="color:var(--valtara-gris-texto, #aaa);font-size:1.05rem;line-height:1.7;max-width:650px;margin:0 auto;">
      Palabras para acompañar tu proceso. Cada visita trae una nueva reflexión.
    </p>
  </div>

  <!-- Frase inspiradora aleatoria -->
  <div class="redes-frase-card" role="article" aria-live="polite">
    <blockquote style="font-family:var(--font-accent, 'Lato', sans-serif);font-size:1.4rem;color:var(--valtara-blanco, #fff);line-height:1.6;margin:0 0 1.5rem;font-style:italic;text-align:center;">
      "${FRASE_ACTUAL}"
    </blockquote>
    <div style="text-align:center;">
      <button id="redes-compartir-frase" class="redes-compartir-btn" aria-label="Compartir esta frase por WhatsApp">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
        Compartir reflexión
      </button>
      <p style="color:var(--valtara-gris-texto);font-size:0.85rem;margin-top:0.5rem;">
        Actualiza la página para descubrir una nueva frase ✨
      </p>
    </div>  </div>

  <!-- Pregunta dinámica con opciones -->
  <div class="redes-pregunta-card">
    <h3 id="redes-pregunta-texto" style="font-family:var(--font-accent);color:var(--valtara-blanco);font-size:1.3rem;margin:0 0 1.25rem;text-align:center;">
      ${PREGUNTA_ACTUAL.pregunta}
    </h3>
    <div id="redes-opciones-container" class="redes-opciones-grid" role="radiogroup" aria-label="Selecciona una opción">
      ${renderOpcionesDinamicas(PREGUNTA_ACTUAL.opciones)}
    </div>
    
    <div id="redes-respuesta-feedback" class="redes-feedback" hidden>
      <p style="color:var(--valtara-blanco);font-size:1.05rem;line-height:1.6;margin:0;"></p>
      <button id="redes-whatsapp-respuesta" class="redes-whatsapp-btn" style="margin-top:1rem;">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
        Compartir mi reflexión
      </button>
    </div>
  </div>

  <!-- Disclaimer médico -->
  <div style="background:rgba(255,107,53,0.12);border-left:4px solid #ff6b35;padding:1rem 1.25rem;border-radius:0 1rem 1rem 0;margin:2rem 0;font-size:0.9rem;">
    <p style="color:var(--valtara-gris-texto, #aaa);margin:0;line-height:1.6;">
      <strong style="color:#ff6b35;display:block;margin-bottom:0.25rem;">⚠️ Recordatorio:</strong>
      Valtara es un centro de <strong>masoterapia manual y bienestar</strong>. 
      No somos médicos, no somos podólogos, no diagnosticamos enfermedades. 
      Nuestras sesiones son complementarias a tratamientos médicos.
    </p>
  </div>
</section>
  `;

  // ========================================
  // 🔧 FUNCIONES AUXILIARES
  // ========================================
  // Seleccionar frase aleatoria (se ejecuta al cargar el módulo)
  const FRASE_ACTUAL = FRASES_INSPIRADORAS[Math.floor(Math.random() * FRASES_INSPIRADORAS.length)];
  
  // Seleccionar y barajar pregunta dinámica
  const PREGUNTA_ACTUAL = (() => {
    const preguntaBase = PREGUNTAS_DINAMICAS[Math.floor(Math.random() * PREGUNTAS_DINAMICAS.length)];
    // Barajar opciones para que cambien en cada carga
    const opcionesBarajadas = [...preguntaBase.opciones].sort(() => Math.random() - 0.5);
    return { ...preguntaBase, opciones: opcionesBarajadas };
  })();

  function renderOpcionesDinamicas(opciones) {
    return opciones.map((op, idx) => `
      <button class="redes-opcion-btn" 
              data-valor="${op.valor}"               data-color="${op.color}"
              role="radio"
              aria-checked="false"
              style="background:rgba(255,255,255,0.04);border:2px solid ${op.color}40;border-radius:1rem;padding:1rem 1.25rem;text-align:center;cursor:pointer;transition:all 0.2s ease;color:var(--valtara-blanco, #fff);font-size:0.95rem;line-height:1.5;min-height:64px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;">
        <span style="width:28px;height:28px;border-radius:50%;border:2px solid ${op.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span style="width:14px;height:14px;border-radius:50%;background:${op.color};opacity:0;transition:opacity 0.2s ease;" class="opcion-check-redes"></span>
        </span>
        <span>${op.texto}</span>
      </button>
    `).join('');
  }

  function getFeedbackRespuesta(valor, pregunta) {
    const feedbacks = {
      tension: "Reconocer la tensión es el primer paso para liberarla. Una sesión de masoterapia puede ayudarte a soltar lo que el cuerpo guarda. 💙",
      equilibrio: "Celebrar los momentos de equilibrio es fundamental. Mantén esos hábitos que te hacen sentir bien. ✨",
      pausa: "Permiso concedido: descansar no es rendirse, es recargar. Tu cuerpo te lo agradecerá. 🌿",
      movimiento: "El movimiento suave es medicina. Escucha lo que tu cuerpo pide y honra su ritmo. 🔄",
      descanso: "El descanso profundo es activo: es cuando el cuerpo se repara. Permítete pausas sin culpa. 😴",
      liberacion: "Soltar no es perder; es hacer espacio para lo nuevo. Tu cuerpo sabe cómo hacerlo. 🕊️",
      cabeza: "La cabeza y el cuello guardan mucho estrés. Una liberación suave puede traer claridad mental. 🧠",
      espalda: "La espalda sostiene tus cargas. Cuidarla es cuidar tu capacidad de avanzar. 💪",
      piernas: "Las piernas te llevan por la vida. Honrarlas con cuidado es honrar tu camino. 👣",
      calma: "La calma es un músculo que se entrena. Cada respiración consciente la fortalece. 🧘",
      inquietud: "La inquietud es energía que busca dirección. Canalizarla con movimiento suave ayuda. 🌊",
      cansancio: "El cansancio es una señal, no un fracaso. Escucharla es el primer acto de autocuidado. 🔋",
      respiracion: "Respirar consciente ya es terapia. Cada inhalación es un regalo a tu sistema nervioso. 🌬️",
      estiramiento: "Estirar es dialogar con tu cuerpo. Pequeños gestos generan grandes cambios. 🤲",
      permiso: "El permiso más revolucionario: cuidarte sin justificativos. Ya eres suficiente. 💜",
      flujo: "Cuando fluyes, el bienestar llega. Confía en tu ritmo natural. 🌊",
      estancado: "Lo estancado solo pide movimiento suave. Un pequeño cambio inicia la transformación. 🔄",
      transicion: "Los momentos de transición son sagrados. Permítete no tener todas las respuestas. 🦋",
      hombros: "Los hombros cargan lo que el corazón no suelta. Liberarlos es liberar emociones. 💫",
      lumbar: "La zona lumbar sostiene tu centro. Cuidarla es fortalecer tu base. 🏔️",
      ritmo: "Tu ritmo es perfecto para ti. No necesitas acelerar para valer. ⏳",
      merecimiento: "Mereces cuidado por el simple hecho de existir. Sin condiciones. ❤️",
      progreso: "El progreso no es lineal. Cada paso, por pequeño, cuenta. 🌱",
      escucha: "Escuchar al cuerpo es el acto más profundo de amor propio. 🎧"
    };
    return feedbacks[valor] || "Gracias por escuchar a tu cuerpo. Cada señal es una invitación a cuidarte. 💙";
  }

  // ========================================
  // 🎮 CONTROLADOR PRINCIPAL
  // ========================================
  const RedesController = {
    estado: {
      respuestaSeleccionada: null
    },
    init: function() {
      if (document.getElementById('redes-titulo')) {
        this.setupEventListeners();
        this.setupAccessibility();
        this.setupCompartirFrase();
        console.log('✅ Módulo de inspiración social inicializado');
      } else {
        setTimeout(() => this.init(), 100);
      }
    },

    setupAccessibility: function() {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        document.querySelectorAll('.redes-opcion-btn, .redes-compartir-btn').forEach(btn => {
          btn.style.transition = 'none';
        });
      }
      
      const highContrast = window.matchMedia('(prefers-contrast: more)').matches;
      if (highContrast) {
        document.querySelectorAll('.redes-opcion-btn').forEach(btn => {
          btn.style.fontWeight = '600';
          btn.style.borderWidth = '3px';
        });
      }
    },

    setupCompartirFrase: function() {
      document.getElementById('redes-compartir-frase')?.addEventListener('click', () => {
        const texto = encodeURIComponent(`✨ "${FRASE_ACTUAL}"\n\nReflexión del día de Valtara — Masoterapia Manual y Bienestar\n🌐 https://valtara.mx`);
        const telefono = '5215512345678'; // Reemplaza con tu número
        window.open(`https://wa.me/${telefono}?text=${texto}`, '_blank', 'noopener');
      });
    },

    setupEventListeners: function() {
      // Selección de opción en pregunta dinámica
      document.querySelectorAll('.redes-opcion-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const valor = e.currentTarget.dataset.valor;
          const color = e.currentTarget.dataset.color;
          this.seleccionarRespuesta(valor, color);
        });
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const valor = e.currentTarget.dataset.valor;
            const color = e.currentTarget.dataset.color;
            this.seleccionarRespuesta(valor, color);          }
        });
      });

      // Compartir respuesta por WhatsApp
      document.getElementById('redes-whatsapp-respuesta')?.addEventListener('click', () => {
        if (!this.estado.respuestaSeleccionada) return;
        
        const { valor, texto, feedback } = this.estado.respuestaSeleccionada;
        const pregunta = PREGUNTA_ACTUAL.pregunta;
        
        const mensaje = encodeURIComponent(
          `💭 Reflexión Valtara\n\n` +
          `Pregunta: ${pregunta}\n` +
          `Mi respuesta: ${texto}\n\n` +
          `💡 ${feedback}\n\n` +
          `— Valtara: Masoterapia Manual y Bienestar\n` +
          `🌐 https://valtara.mx\n` +
          `⚠️ No somos médicos. Sesiones complementarias a tratamientos.`
        );
        
        const telefono = '5215512345678'; // Reemplaza con tu número
        window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank', 'noopener');
      });
    },

    seleccionarRespuesta: function(valor, color) {
      this.estado.respuestaSeleccionada = {
        valor,
        texto: PREGUNTA_ACTUAL.opciones.find(o => o.valor === valor)?.texto,
        feedback: getFeedbackRespuesta(valor, PREGUNTA_ACTUAL.pregunta)
      };

      // Feedback visual inmediato
      document.querySelectorAll('.opcion-check-redes').forEach(c => c.style.opacity = '0');
      document.querySelector(`.redes-opcion-btn[data-valor="${valor}"] .opcion-check-redes`).style.opacity = '1';
      
      // Resaltar botón seleccionado
      document.querySelectorAll('.redes-opcion-btn').forEach(btn => {
        btn.style.borderColor = btn.dataset.color + '40';
        btn.style.background = 'rgba(255,255,255,0.04)';
      });
      const btnSeleccionado = document.querySelector(`.redes-opcion-btn[data-valor="${valor}"]`);
      if (btnSeleccionado) {
        btnSeleccionado.style.borderColor = color;
        btnSeleccionado.style.background = color + '15';
      }

      // Mostrar feedback
      const feedbackContainer = document.getElementById('redes-respuesta-feedback');      const feedbackTexto = feedbackContainer.querySelector('p');
      if (feedbackTexto) {
        feedbackTexto.textContent = this.estado.respuestaSeleccionada.feedback;
        feedbackContainer.hidden = false;
        feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  // ========================================
  // 📦 EXPORTAR MÓDULO
  // ========================================
  global.ValtaraModulos = global.ValtaraModulos || {};
  global.ValtaraModulos.inicio_redes = REDES_TEMPLATE;
  global.ValtaraRedesController = RedesController;

  // Auto-inicialización
  function autoInit() {
    if (document.getElementById('redes-titulo')) {
      RedesController.init();
    } else {
      const observer = new MutationObserver((mutations, obs) => {
        if (document.getElementById('redes-titulo')) {
          RedesController.init();
          obs.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        if (document.getElementById('redes-titulo')) RedesController.init();
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
