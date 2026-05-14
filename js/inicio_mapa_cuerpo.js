const InicioMapaCuerpo = (function () {
  const WHATSAPP_NUMBER = '523348572070';

  const storedName = () => {
    try {
      const direct = localStorage.getItem('valtara_user_name');
      if (direct && direct.trim()) return direct.trim();
      const profile = localStorage.getItem('valtara_sovereign_profile');
      if (profile) {
        const parsed = JSON.parse(profile);
        if (parsed?.name && String(parsed.name).trim()) return String(parsed.name).trim();
      }
    } catch (e) {
      // silencioso
    }
    return 'Paciente';
  };

  const EMERGENCY_NOTE = 'Si existe dolor agudo, lesión reciente, fiebre, inflamación importante o síntomas que no encajan con una molestia muscular común, primero acude con un profesional de la salud calificado.';

  const triageData = {
    cabeza_cuello: {
      id: 'cabeza_cuello',
      title: 'Cabeza, Cuello y Mandíbula',
      icon: '🧠',
      intro: 'Cuando la mente se acelera, esta zona suele cargar la tensión más rápido.',
      symptoms: [
        {
          id: 'cefalea_tensional',
          label: 'Dolor de cabeza por tensión o presión en sienes',
          why: 'Suele aparecer cuando el cuello, la mandíbula y la parte alta de la espalda permanecen contraídos por muchas horas. El sistema nervioso recibe demasiada información y el cuerpo responde endureciéndose.',
          how: 'Trabajamos liberación suave de cuello, base del cráneo y hombros, con ritmos lentos para bajar la sobrecarga.',
          therapies: [
            {
              label: 'Terapia relajante',
              benefit: 'Disminuye la sensación de presión y ayuda a aflojar la guardia del cuerpo.',
              message: 'Me gustaría agendar una terapia relajante enfocada en cabeza y cuello.'
            },
            {
              label: 'Masaje deportivo',
              benefit: 'Ayuda cuando además hay carga muscular intensa por postura, ejercicio o esfuerzo repetitivo.',
              message: 'Quisiera una terapia deportiva para liberar la tensión de cabeza, cuello y hombros.'
            }
          ]
        },
        {
          id: 'mandibula_apretada',
          label: 'Mandíbula apretada, rechinamiento o rigidez facial',
          why: 'La mandíbula suele tensarse cuando el estrés no encuentra salida. Esa contracción puede irradiar hacia sienes, oídos, cuello y dientes.',
          how: 'Liberamos la zona de forma respetuosa, sin forzar, buscando que el rostro deje de sostener tanta tensión.',
          therapies: [
            {
              label: 'Terapia relajante',
              benefit: 'Invita al rostro a soltar y permite una sensación general de descanso.',
              message: 'Me gustaría una terapia relajante para mandíbula, rostro y cuello.'
            },
            {
              label: 'Descontracturante suave',
              benefit: 'Es útil cuando la rigidez se siente muy marcada y constante.',
              message: 'Quisiera una terapia descontracturante suave para liberar mandíbula y cuello.'
            }
          ]
        },
        {
          id: 'pesadez_mental',
          label: 'Mente saturada, dificultad para concentrarte o sensación de nube mental',
          why: 'Cuando hay demasiadas tareas, la respiración se vuelve corta y la cabeza trabaja sin pausa. Eso se siente como pesadez, distracción o agotamiento mental.',
          how: 'Buscamos un descenso de ritmo corporal para que la mente deje de sostener todo al mismo tiempo.',
          therapies: [
            {
              label: 'Terapia relajante',
              benefit: 'Favorece una pausa profunda y una mejor regulación del estrés.',
              message: 'Quisiera agendar una terapia relajante para aliviar la saturación mental.'
            },
            {
              label: 'Liberación cervical',
              benefit: 'Enfoca la zona donde la tensión de escritorio y pantalla se acumula más.',
              message: 'Me interesa una liberación cervical para descargar cabeza y cuello.'
            }
          ]
        }
      ]
    },
    espalda_lumbar: {
      id: 'espalda_lumbar',
      title: 'Espalda Alta, Media y Baja',
      icon: '🧘',
      intro: 'La espalda sostiene el peso físico y también una parte importante del esfuerzo emocional.',
      symptoms: [
        {
          id: 'nudos_contracturas',
          label: 'Nudos, contracturas o puntos muy duros al tocar',
          why: 'Los músculos se protegen cuando permanecen en esfuerzo, postura cerrada o estrés prolongado. Esa protección termina sintiéndose como nudos y rigidez.',
          how: 'Aplicamos trabajo profundo y progresivo para ayudar a que el músculo recupere movilidad sin agresión.',
          therapies: [
            {
              label: 'Masaje deportivo',
              benefit: 'Trabaja zonas cargadas por esfuerzo, postura o actividad repetitiva.',
              message: 'Me gustaría una terapia deportiva para contracturas y nudos en la espalda.'
            },
            {
              label: 'Descontracturante profundo',
              benefit: 'Es una excelente opción cuando la rigidez ya limita el movimiento cotidiano.',
              message: 'Quisiera agendar una terapia descontracturante profunda para espalda.'
            }
          ]
        },
        {
          id: 'lumbar_cansada',
          label: 'Cansancio o ardor en la zona lumbar',
          why: 'La zona baja compensa muchas posturas inestables. Si pasas mucho tiempo sentado, parado o cargando peso, la parte lumbar suele resentirse primero.',
          how: 'Liberamos la carga de la zona baja y acompañamos la musculatura para que deje de sostener tanto.',
          therapies: [
            {
              label: 'Masaje deportivo',
              benefit: 'Ayuda a descargar la musculatura de soporte y mejora la sensación de sostén.',
              message: 'Me interesa una terapia deportiva enfocada en zona lumbar.'
            },
            {
              label: 'Terapia relajante',
              benefit: 'Ideal cuando el cansancio lumbar también viene con estrés o agotamiento general.',
              message: 'Quisiera una terapia relajante para aliviar la espalda baja.'
            }
          ]
        },
        {
          id: 'postura_dolor',
          label: 'Dolor por mala postura o muchas horas en el mismo lugar',
          why: 'Cuando la postura se sostiene por demasiado tiempo, ciertos músculos hacen el trabajo de otros y terminan fatigándose.',
          how: 'Buscamos equilibrar la carga de la espalda y devolverle movilidad al tronco.',
          therapies: [
            {
              label: 'Masaje deportivo',
              benefit: 'Ayuda a reactivar la movilidad y a corregir la sensación de rigidez postural.',
              message: 'Me gustaría una terapia deportiva por dolor de postura y rigidez en espalda.'
            },
            {
              label: 'Liberación miofascial',
              benefit: 'Puede ayudar cuando la tensión se siente como una capa que no deja soltar.',
              message: 'Quisiera una liberación miofascial para la espalda y el tronco.'
            }
          ]
        }
      ]
    },
    manos_antebrazos: {
      id: 'manos_antebrazos',
      title: 'Manos y Antebrazos',
      icon: '🤲',
      intro: 'Las manos trabajan, sostienen, escriben y sostienen gran parte del esfuerzo diario.',
      symptoms: [
        {
          id: 'tension_dedos',
          label: 'Dedos cansados, agarre rígido o manos tensas',
          why: 'El uso repetitivo de celular, teclado, herramientas o trabajo manual puede saturar los tendones y generar cansancio en toda la cadena del brazo.',
          how: 'Liberamos el trayecto de mano a antebrazo con maniobras suaves y ordenadas.',
          therapies: [
            {
              label: 'Masaje deportivo',
              benefit: 'Ideal cuando hay sobreuso muscular y agarre constante durante el día.',
              message: 'Me gustaría una terapia deportiva para manos y antebrazos cansados.'
            },
            {
              label: 'Terapia relajante',
              benefit: 'Útil si la tensión de manos viene acompañada de saturación y prisa.',
              message: 'Quisiera una terapia relajante enfocada en manos y brazos.'
            }
          ]
        },
        {
          id: 'brazos_cargados',
          label: 'Brazos pesados o sensación de cansancio al final del día',
          why: 'Cuando el esfuerzo diario no se distribuye bien, los brazos terminan cargando más de lo que deberían.',
          how: 'Destrabamos la musculatura para que el movimiento vuelva a sentirse más ligero.',
          therapies: [
            {
              label: 'Masaje deportivo',
              benefit: 'Ayuda a descargar el trabajo acumulado en la parte superior de los brazos.',
              message: 'Quisiera una terapia deportiva para brazos pesados y cansados.'
            },
            {
              label: 'Terapia relajante',
              benefit: 'Acompaña muy bien cuando el cansancio se mezcla con estrés mental.',
              message: 'Me gustaría una terapia relajante para liberar los brazos.'
            }
          ]
        },
        {
          id: 'mano_rigida',
          label: 'Sensación de rigidez o falta de movilidad fina',
          why: 'La tensión constante reduce la libertad de movimiento de dedos, muñecas y manos.',
          how: 'Se trabaja la movilidad con suavidad para devolverle amplitud a la zona.',
          therapies: [
            {
              label: 'Masaje deportivo',
              benefit: 'Favorece la movilidad funcional cuando la mano ya se siente limitada.',
              message: 'Quisiera una terapia deportiva para recuperar movilidad en las manos.'
            },
            {
              label: 'Liberación suave',
              benefit: 'Ayuda a que la mano deje de sentirse dura y pesada.',
              message: 'Me interesa una liberación suave para manos y muñecas.'
            }
          ]
        }
      ]
    },
    piernas_pies: {
      id: 'piernas_pies',
      title: 'Piernas y Pies',
      icon: '👣',
      intro: 'Son la base del movimiento y suelen resentir la carga acumulada de todo el día.',
      symptoms: [
        {
          id: 'piernas_pesadas',
          label: 'Pesadez, cansancio o sensación de piernas llenas',
          why: 'La circulación y la permanencia en la misma postura pueden hacer que las piernas se sientan más pesadas.',
          how: 'Ayudamos a descargar la zona para que vuelva la sensación de ligereza y descanso.',
          therapies: [
            {
              label: 'Masaje deportivo',
              benefit: 'Ayuda cuando las piernas vienen de actividad, esfuerzo o muchas horas de pie.',
              message: 'Me gustaría una terapia deportiva para piernas pesadas.'
            },
            {
              label: 'Terapia relajante',
              benefit: 'Buena opción si el cansancio de piernas también se mezcla con estrés.',
              message: 'Quisiera una terapia relajante para liberar la pesadez de piernas y pies.'
            }
          ]
        },
        {
          id: 'pies_tensos',
          label: 'Pies tensos, duros o muy castigados por el día',
          why: 'Los pies soportan todo el cuerpo y muchas veces no reciben el cuidado necesario al final de la jornada.',
          how: 'Trabajamos pies y pantorrillas para devolverles descanso y una sensación más amable.',
          therapies: [
            {
              label: 'Terapia relajante',
              benefit: 'Ideal para bajar el agotamiento general desde la base del cuerpo.',
              message: 'Quisiera una terapia relajante para pies y piernas cansadas.'
            },
            {
              label: 'Masaje deportivo',
              benefit: 'Útil cuando los pies cargan mucho esfuerzo físico o actividad continua.',
              message: 'Me gustaría una terapia deportiva para pies y pantorrillas.'
            }
          ]
        },
        {
          id: 'retencion_carga',
          label: 'Sensación de carga, inflamación o falta de descanso en la parte baja',
          why: 'Cuando el cuerpo permanece sin pausa suficiente, la parte baja suele sentirse más limitada y agotada.',
          how: 'La sesión busca aliviar la carga y devolver una sensación de mayor fluidez corporal.',
          therapies: [
            {
              label: 'Masaje deportivo',
              benefit: 'Ayuda a la descarga muscular y al alivio del exceso de esfuerzo.',
              message: 'Quisiera una terapia deportiva para la parte baja del cuerpo.'
            },
            {
              label: 'Terapia relajante',
              benefit: 'Permite una pausa más profunda cuando todo el cuerpo se siente sobrecargado.',
              message: 'Me gustaría una terapia relajante para bajar la sensación de carga.'
            }
          ]
        }
      ]
    },
    estres_sueno: {
      id: 'estres_sueno',
      title: 'Estrés, Sueño y Sistema Nervioso',
      icon: '🌙',
      intro: 'Aquí entra lo que no siempre duele, pero sí se siente profundamente en el cuerpo.',
      symptoms: [
        {
          id: 'insomnio',
          label: 'Dificultad para dormir o sueño poco reparador',
          why: 'Cuando el sistema nervioso sigue en alerta, el descanso no alcanza a consolidarse y el sueño se vuelve ligero o fragmentado.',
          how: 'Bajamos el ritmo corporal para ayudar a que el cuerpo entienda que ya puede descansar.',
          therapies: [
            {
              label: 'Terapia relajante',
              benefit: 'Es la opción más natural cuando el sueño no está descansando como debería.',
              message: 'Me gustaría una terapia relajante porque me cuesta dormir bien.'
            },
            {
              label: 'Masaje deportivo',
              benefit: 'Útil si el insomnio viene acompañado de rigidez física por tensión acumulada.',
              message: 'Quisiera una terapia deportiva para descargar el cuerpo y descansar mejor.'
            }
          ]
        },
        {
          id: 'ansiedad',
          label: 'Sensación de ansiedad, inquietud o dificultad para apagar la mente',
          why: 'La ansiedad suele notarse como respiración corta, cuerpo rígido y mente que no se detiene.',
          how: 'Buscamos una experiencia de contención que ayude al cuerpo a salir del modo alerta.',
          therapies: [
            {
              label: 'Terapia relajante',
              benefit: 'Acompaña la necesidad de calma y regula el ritmo interno con suavidad.',
              message: 'Quisiera una terapia relajante para ansiedad e inquietud.'
            },
            {
              label: 'Liberación cervical',
              benefit: 'Ayuda cuando la ansiedad se manifiesta en cuello, hombros y mandíbula.',
              message: 'Me interesa una liberación cervical para ansiedad y tensión.'
            }
          ]
        },
        {
          id: 'agotamiento',
          label: 'Agotamiento general o sensación de ya no poder con más',
          why: 'El cuerpo puede pedir freno antes de que la mente lo acepte. Cuando el cansancio se acumula, todo se siente más pesado.',
          how: 'Acompañamos la pausa para que el organismo recupere algo de energía y claridad.',
          therapies: [
            {
              label: 'Terapia relajante',
              benefit: 'Permite una pausa profunda y muy amable con tu energía.',
              message: 'Quisiera una terapia relajante porque me siento muy agotado.'
            },
            {
              label: 'Masaje deportivo',
              benefit: 'Cuando el agotamiento viene acompañado de sobreuso físico, ayuda a descargar.',
              message: 'Me gustaría una terapia deportiva para bajar el agotamiento físico.'
            }
          ]
        }
      ]
    },
    cuerpo_total: {
      id: 'cuerpo_total',
      title: 'Cuerpo Completo y Recuperación',
      icon: '🫶',
      intro: 'A veces no es una sola zona: es el cuerpo entero pidiendo un respiro más profundo.',
      symptoms: [
        {
          id: 'tension_general',
          label: 'Tensión repartida en varias zonas del cuerpo',
          why: 'Cuando el estrés se sostiene durante mucho tiempo, varias zonas comienzan a compensar al mismo tiempo.',
          how: 'Se diseña una sesión integral para que el cuerpo tenga un alivio más completo.',
          therapies: [
            {
              label: 'Terapia relajante',
              benefit: 'Ideal para reconectar con una sensación de descanso integral.',
              message: 'Me gustaría una terapia relajante de cuerpo completo.'
            },
            {
              label: 'Masaje deportivo',
              benefit: 'Ayuda cuando la carga se siente física, repetitiva y generalizada.',
              message: 'Quisiera una terapia deportiva de cuerpo completo para liberar tensión.'
            }
          ]
        },
        {
          id: 'recuperacion_activa',
          label: 'Necesito recuperarme después de mucho esfuerzo físico o rutina intensa',
          why: 'Después de periodos de mucha carga, el cuerpo necesita una recuperación guiada para volver a su mejor rango de movimiento.',
          how: 'Combinamos descarga y recuperación para que el organismo no siga trabajando de más.',
          therapies: [
            {
              label: 'Masaje deportivo',
              benefit: 'Pensado para quienes buscan volver a moverse con más soltura.',
              message: 'Me gustaría una terapia deportiva para recuperación muscular.'
            },
            {
              label: 'Terapia relajante',
              benefit: 'Útil si además de esfuerzo físico existe agotamiento emocional.',
              message: 'Quisiera una terapia relajante para recuperación integral.'
            }
          ]
        },
        {
          id: 'pausa_profunda',
          label: 'Solo necesito detenerme y sentirme cuidado',
          why: 'Hay días en los que el cuerpo no pide corrección: pide pausa, contención y descanso.',
          how: 'Creamos una sesión tranquila, lenta y centrada en que salgas más liviano.',
          therapies: [
            {
              label: 'Terapia relajante',
              benefit: 'Es la mejor opción cuando el cuerpo solo pide bajar la intensidad.',
              message: 'Me gustaría una terapia relajante para una pausa profunda.'
            },
            {
              label: 'Descarga suave',
              benefit: 'Ayuda si quieres sentir alivio sin trabajar demasiado profundo.',
              message: 'Quisiera una descarga suave para sentirme cuidado.'
            }
          ]
        }
      ]
    }
  };

  let state = {
    step: 1,
    zone: null,
    symptom: null,
    therapy: null
  };

  const skeleton = `
    <section class="inicio-mapa-cuerpo-shell" aria-label="Mapa corporal de bienestar">
      <div id="inicio_mapa_cuerpo" class="triage-wrapper" aria-live="polite">
        <div class="triage-loading">Preparando tu mapa corporal...</div>
      </div>
    </section>
  `;

  const initStyles = () => {
    if (document.getElementById('oasik-triage-styles')) return;
    const style = document.createElement('style');
    style.id = 'oasik-triage-styles';
    style.textContent = `
      .inicio-mapa-cuerpo-shell {
        padding: 1rem 0 2rem;
      }

      #inicio_mapa_cuerpo {
        width: 100%;
        background: linear-gradient(145deg, rgba(17,18,22,1) 0%, rgba(10,10,12,1) 100%);
        color: #e0e0e0;
        box-sizing: border-box;
      }

      .triage-wrapper {
        max-width: 1080px;
        margin: 0 auto;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(212, 175, 55, 0.12);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 22px 60px rgba(0,0,0,0.45);
        position: relative;
        overflow: hidden;
      }

      .triage-loading {
        min-height: 300px;
        display: grid;
        place-items: center;
        color: var(--valtara-gris-texto, #aaa);
        letter-spacing: .08em;
      }

      .t-hero {
        display: grid;
        grid-template-columns: 1.3fr .9fr;
        gap: 1rem;
        margin-bottom: 1.4rem;
      }

      .t-hero-card,
      .t-step,
      .t-banner,
      .t-disclaimer {
        border-radius: 22px;
        border: 1px solid rgba(255,255,255,.08);
        background: rgba(255,255,255,.03);
        box-shadow: 0 16px 36px rgba(0,0,0,.2);
      }

      .t-hero-card { padding: 1.2rem; }
      .t-banner { padding: 1rem 1.1rem; }

      .t-hero-badge {
        display: inline-flex;
        align-items: center;
        gap: .5rem;
        margin-bottom: .8rem;
        padding: .45rem .8rem;
        border-radius: 999px;
        background: rgba(0,255,224,.08);
        color: var(--valtara-cian-brillante, #00ffe0);
        font-size: .76rem;
        letter-spacing: .16em;
        text-transform: uppercase;
      }

      .t-hero h2 {
        margin: 0;
        color: var(--valtara-blanco, #fff);
        font-family: var(--font-accent, 'Lato', sans-serif);
        font-size: clamp(1.8rem, 3.6vw, 2.9rem);
        line-height: 1.1;
      }

      .t-hero p,
      .t-banner p,
      .t-disclaimer,
      .t-note,
      .t-step p,
      .t-step li {
        color: var(--valtara-gris-texto, #bdbdbd);
        line-height: 1.75;
      }

      .t-name-chip {
        display: inline-flex;
        align-items: center;
        gap: .55rem;
        margin-top: .95rem;
        padding: .7rem .9rem;
        border-radius: 999px;
        background: rgba(242,201,76,.12);
        border: 1px solid rgba(242,201,76,.15);
        color: var(--valtara-oro, #f2c94c);
      }

      .t-quick-stats {
        display: grid;
        gap: .8rem;
      }

      .t-quick-stat {
        padding: 1rem;
        border-radius: 18px;
        background: rgba(255,255,255,.035);
        border: 1px solid rgba(255,255,255,.07);
      }

      .t-quick-stat strong { color: var(--valtara-blanco, #fff); }

      .t-step { display: none; padding: 1rem; margin-top: 1rem; }
      .t-step.active { display: block; animation: tFadeIn .25s ease; }

      .t-header { text-align: center; margin-bottom: 1rem; }
      .t-header h3,
      .t-header h2 {
        margin: 0;
        color: var(--valtara-blanco, #fff);
        font-family: var(--font-accent, 'Lato', sans-serif);
      }

      .t-header p { margin: .35rem auto 0; max-width: 720px; }

      .t-grid-zones,
      .t-list-symptoms,
      .t-therapy-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: .9rem;
      }

      .t-card,
      .t-symptom-btn,
      .t-therapy-card {
        min-height: 82px;
        border-radius: 18px;
        padding: 1rem;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.08);
        color: var(--valtara-blanco, #fff);
        transition: transform .18s ease, border-color .18s ease, background .18s ease;
      }

      .t-card:hover,
      .t-symptom-btn:hover,
      .t-therapy-card:hover {
        transform: translateY(-2px);
        border-color: rgba(242,201,76,.35);
      }

      .t-card {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: .9rem;
      }

      .t-card .icon {
        width: 50px;
        height: 50px;
        border-radius: 16px;
        display: grid;
        place-items: center;
        background: rgba(0,255,224,.08);
        font-size: 1.35rem;
        flex: 0 0 auto;
      }

      .t-card .title { font-weight: 700; line-height: 1.45; }

      .t-symptom-btn,
      .t-therapy-card {
        cursor: pointer;
        text-align: left;
        width: 100%;
      }

      .t-symptom-btn { display: flex; align-items: center; }
      .t-symptom-btn span { display:block; }
      .t-symptom-label { font-weight: 700; color: var(--valtara-blanco, #fff); }
      .t-symptom-sub { margin-top: .35rem; font-size: .92rem; }

      .t-back-btn {
        border: 0;
        background: transparent;
        color: var(--valtara-oro, #f2c94c);
        cursor: pointer;
        font-weight: 700;
        margin-bottom: .9rem;
      }

      .t-therapy-card { display: grid; gap: .55rem; }
      .t-therapy-card strong { font-size: 1.02rem; }
      .t-therapy-card p { margin: 0; }
      .t-therapy-badge {
        display: inline-flex;
        align-items: center;
        gap: .45rem;
        width: fit-content;
        padding: .35rem .65rem;
        border-radius: 999px;
        background: rgba(0,255,224,.08);
        color: var(--valtara-cian-brillante, #00ffe0);
        font-size: .76rem;
      }

      .t-result-card {
        display: grid;
        gap: 1rem;
      }

      .t-result-banner {
        padding: 1rem 1.1rem;
        border-radius: 18px;
        background: linear-gradient(135deg, rgba(0,255,224,.12), rgba(178,127,255,.12));
        border: 1px solid rgba(255,255,255,.08);
      }

      .t-result-banner h3 { margin: 0 0 .45rem; color: var(--valtara-blanco, #fff); }
      .t-result-banner p { margin: 0; }

      .t-result-grid {
        display: grid;
        grid-template-columns: 1.2fr .8fr;
        gap: 1rem;
      }

      .t-info-box,
      .t-recomm-box,
      .t-wa-box {
        padding: 1rem;
        border-radius: 18px;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.08);
      }

      .t-info-box strong,
      .t-recomm-box strong,
      .t-wa-box strong {
        display: block;
        margin-bottom: .35rem;
        color: var(--valtara-blanco, #fff);
      }

      .t-therapy-selected {
        margin-top: .75rem;
        padding: .85rem 1rem;
        border-left: 3px solid var(--valtara-oro, #f2c94c);
        background: rgba(242,201,76,.08);
        color: var(--valtara-blanco, #fff);
        border-radius: 0 14px 14px 0;
      }

      .t-wa-banner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }

      .t-wa-btn {
        display: inline-flex;
        align-items: center;
        gap: .65rem;
        padding: .95rem 1.2rem;
        border-radius: 999px;
        background: linear-gradient(135deg, #22c55e, #00b36a);
        color: #fff;
        font-weight: 800;
        white-space: nowrap;
        text-decoration: none;
      }

      .t-breadcrumb {
        display: flex;
        flex-wrap: wrap;
        gap: .55rem;
        margin: 0 0 1rem;
      }

      .t-breadcrumb span {
        padding: .45rem .75rem;
        border-radius: 999px;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.08);
        color: var(--valtara-gris-texto, #bbb);
        font-size: .86rem;
      }

      .t-disclaimer {
        margin-top: 1rem;
        padding: 1rem 1.1rem;
        border-left: 4px solid #ff6b35;
      }

      .t-note {
        font-size: .92rem;
        margin: 0;
      }

      @keyframes tFadeIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 840px) {
        .t-hero,
        .t-result-grid,
        .t-wa-banner {
          grid-template-columns: 1fr;
          display: grid;
        }
      }

      @media (max-width: 620px) {
        .triage-wrapper { padding: 18px; border-radius: 22px; }
        .t-step { padding: .85rem; }
      }
    `;
    document.head.appendChild(style);
  };

  const getZone = () => triageData[state.zone] || null;
  const getSymptom = () => {
    const zone = getZone();
    if (!zone) return null;
    return zone.symptoms[state.symptom] || null;
  };
  const getTherapy = () => {
    const symptom = getSymptom();
    if (!symptom) return null;
    return symptom.therapies[state.therapy] || null;
  };

  const renderHTML = () => {
    const container = document.getElementById('inicio_mapa_cuerpo');
    if (!container) return;

    const name = storedName();
    const zone = getZone();
    const symptom = getSymptom();
    const therapy = getTherapy();

    let html = `
      <div class="triage-wrapper">
        <div class="t-hero">
          <div class="t-hero-card">
            <span class="t-hero-badge"><i class="fa-solid fa-heart-circle-check"></i> Exploración corporal guiada</span>
            <h2>Tu mapa de alivio, paso a paso</h2>
            <p>Selecciona primero la zona, luego la molestia y finalmente la terapia que mejor se sienta para ti. El mensaje de WhatsApp se preparará con lo que elegiste.</p>
            <div class="t-name-chip"><i class="fa-solid fa-user"></i> ${name}</div>
          </div>
          <div class="t-quick-stats">
            <div class="t-quick-stat"><strong>Contacto oficial</strong><br><span>+52 33 4857 2070</span></div>
            <div class="t-quick-stat"><strong>Objetivo</strong><br><span>Entender el porqué, ver cómo se atiende y elegir tu terapia.</span></div>
          </div>
        </div>
    `;

    html += `
      <div class="t-step ${state.step === 1 ? 'active' : ''}">
        <div class="t-header">
          <h3>1. Elige la zona donde sientes más carga</h3>
          <p>Así podemos llevarte por una cascada clara: zona, síntoma, solución y contacto directo.</p>
        </div>
        <div class="t-grid-zones">
    `;

    Object.values(triageData).forEach((data) => {
      html += `
        <button type="button" class="t-card" onclick="window.InicioMapaCuerpoAPI.setZone('${data.id}')">
          <span class="icon">${data.icon}</span>
          <span class="title">${data.title}</span>
        </button>
      `;
    });
    html += `</div></div>`;

    if (zone) {
      html += `
        <div class="t-step ${state.step === 2 ? 'active' : ''}">
          <button class="t-back-btn" type="button" onclick="window.InicioMapaCuerpoAPI.goBack(1)">← Cambiar zona</button>
          <div class="t-header">
            <h3>2. ${zone.icon} ${zone.title}</h3>
            <p>${zone.intro}</p>
          </div>
          <div class="t-list-symptoms">
      `;
      zone.symptoms.forEach((s, idx) => {
        html += `
          <button type="button" class="t-symptom-btn" onclick="window.InicioMapaCuerpoAPI.setSymptom(${idx})">
            <span>
              <span class="t-symptom-label">${s.label}</span>
              <span class="t-symptom-sub">Lee el motivo y cómo lo atendemos.</span>
            </span>
          </button>
        `;
      });
      html += `</div></div>`;
    }

    if (symptom) {
      html += `
        <div class="t-step ${state.step === 3 ? 'active' : ''}">
          <button class="t-back-btn" type="button" onclick="window.InicioMapaCuerpoAPI.goBack(2)">← Cambiar síntoma</button>
          <div class="t-header">
            <h3>3. Elige tu terapia sugerida</h3>
            <p>${symptom.label}</p>
          </div>
          <div class="t-therapy-grid">
      `;
      symptom.therapies.forEach((t, idx) => {
        html += `
          <button type="button" class="t-therapy-card" onclick="window.InicioMapaCuerpoAPI.setTherapy(${idx})">
            <span class="t-therapy-badge"><i class="fa-solid fa-spa"></i> ${t.label}</span>
            <strong>${t.benefit}</strong>
            <p>${t.message}</p>
          </button>
        `;
      });
      html += `</div></div>`;
    }

    if (therapy && symptom && zone) {
      const waMessage = encodeURIComponent(
        `Hola, soy ${name}.\n\n` +
        `Seleccioné la zona: ${zone.title}.\n` +
        `Molestia principal: ${symptom.label}.\n` +
        `Terapia elegida: ${therapy.label}.\n\n` +
        `${therapy.message}\n\n` +
        `Me interesa agendar y recibir más información.\n` +
        `Contacto oficial: +52 33 4857 2070`
      );
      const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

      html += `
        <div class="t-step active">
          <button class="t-back-btn" type="button" onclick="window.InicioMapaCuerpoAPI.goBack(3)">← Cambiar terapia</button>
          <div class="t-result-card">
            <div class="t-result-banner">
              <h3>Tu banner listo para WhatsApp</h3>
              <p>Ya quedó armado el mensaje con tu nombre, la condición seleccionada y la terapia elegida.</p>
            </div>

            <div class="t-result-grid">
              <div class="t-info-box">
                <strong>Por qué sucede</strong>
                <p>${symptom.why}</p>
                <strong>Cómo lo abordamos</strong>
                <p>${symptom.how}</p>
              </div>

              <div class="t-recomm-box">
                <strong>Terapia seleccionada</strong>
                <div class="t-therapy-selected">
                  <div>${therapy.label}</div>
                  <div style="margin-top:.45rem; color: var(--valtara-gris-texto, #bbb);">${therapy.benefit}</div>
                </div>
                <p class="t-note" style="margin-top: .85rem;">${therapy.message}</p>
              </div>
            </div>

            <div class="t-wa-box t-wa-banner">
              <div>
                <strong>Contacto directo</strong>
                <p style="margin:0;">WhatsApp oficial con mensaje precargado.</p>
              </div>
              <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="t-wa-btn">
                <i class="fa-brands fa-whatsapp"></i>
                Agendar por WhatsApp
              </a>
            </div>

            <div class="t-disclaimer">
              <strong>Aclaración importante:</strong> ${EMERGENCY_NOTE}
            </div>
          </div>
        </div>
      `;
    }

    html += `
        <div class="t-banner">
          <strong style="color: var(--valtara-blanco, #fff); display:block; margin-bottom:.4rem;">Nombre del paciente: ${name}</strong>
          <p class="t-note">Cuando elijas una terapia, aparecerá aquí el banner final con el enlace oficial de WhatsApp y el mensaje listo para enviar.</p>
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  window.InicioMapaCuerpoAPI = {
    setZone(z) {
      state.zone = z;
      state.symptom = null;
      state.therapy = null;
      state.step = 2;
      renderHTML();
    },
    setSymptom(s) {
      state.symptom = s;
      state.therapy = null;
      state.step = 3;
      renderHTML();
    },
    setTherapy(t) {
      state.therapy = t;
      state.step = 4;
      renderHTML();
    },
    goBack(step) {
      state.step = step;
      if (step === 1) {
        state.zone = null;
        state.symptom = null;
        state.therapy = null;
      } else if (step === 2) {
        state.symptom = null;
        state.therapy = null;
      } else if (step === 3) {
        state.therapy = null;
      }
      renderHTML();
    }
  };

  window.ValtaraModulos = window.ValtaraModulos || {};
  window.ValtaraModulos.inicio_mapa_cuerpo = skeleton;

  return {
    init() {
      initStyles();
      renderHTML();
    }
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('inicio_mapa_cuerpo')) {
    InicioMapaCuerpo.init();
  }
});
