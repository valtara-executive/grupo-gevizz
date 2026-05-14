// Archivo completo generado para Valtara
// Reemplaza completamente inicio_promociones.js

(function (global) {
  'use strict';

  const WHATSAPP_NUMBER = '523348572070';

  const PROMO_169 = {
    id: 'promo169',
    title: 'Inicia tu semana más ligero',
    subtitle: 'Valtara aporta $169 MXN de cortesía hacia tu experiencia terapéutica.',
    days: ['Monday', 'Tuesday'],
    startsAt: 13,
    discount: 169,
    limitText: 'Válido para las primeras 10 sesiones de la semana.',
    notCombinable: true
  };

  const PROMO_20 = {
    id: 'promo20',
    title: '20% de cortesía matutina',
    subtitle: 'Algunas pausas funcionan mejor cuando el día apenas comienza.',
    days: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    untilHour: 13,
    percent: 20,
    notCombinable: true
  };

  const AROMAS = [
    'Lavanda',
    'Vainilla',
    'Menta',
    'Eucalipto',
    'Frutos Rojos',
    'Neutra'
  ];

  const TERAPIAS = [
    {
      id: 'relajante60',
      nombre: 'Terapia Relajante',
      duracion: '60 minutos',
      categoria: 'Relajación',
      precio: 799,
      descripcion: 'Experiencia enfocada en descanso profundo y regulación del estrés.'
    },
    {
      id: 'relajante90',
      nombre: 'Terapia Relajante Premium',
      duracion: '90 minutos',
      categoria: 'Relajación',
      precio: 1099,
      descripcion: 'Sesión prolongada para liberar tensión física y emocional.'
    },
    {
      id: 'deportiva60',
      nombre: 'Masaje Deportivo',
      duracion: '60 minutos',
      categoria: 'Recuperación',
      precio: 899,
      descripcion: 'Descarga muscular enfocada en recuperación física y movilidad.'
    },
    {
      id: 'descontracturante',
      nombre: 'Terapia Descontracturante',
      duracion: '60 minutos',
      categoria: 'Liberación muscular',
      precio: 999,
      descripcion: 'Ideal para contracturas, rigidez y acumulación de tensión.'
    },
    {
      id: 'cervical',
      nombre: 'Liberación Cervical',
      duracion: '45 minutos',
      categoria: 'Cuello y hombros',
      precio: 699,
      descripcion: 'Alivio enfocado en cuello, hombros y base del cráneo.'
    }
  ];

  const FRASES = [
    'Tu cuerpo no debería acostumbrarse al cansancio.',
    'Hay tensiones que el descanso normal ya no libera.',
    'El bienestar también es una decisión.',
    'Tu cuerpo merece algo más que sobrevivir la semana.',
    'Haz una pausa antes de que el cuerpo la exija.'
  ];

  function randomPhrase() {
    return FRASES[Math.floor(Math.random() * FRASES.length)];
  }

  function getName() {
    try {
      const saved = localStorage.getItem('valtara_user_name');
      if (saved) return saved;
    } catch (e) {}
    return 'Paciente';
  }

  const state = {
    terapia: TERAPIAS[0],
    aroma: 'Lavanda',
    promo: 'promo169'
  };

  function currency(value) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  }

  function calculate() {
    const subtotal = state.terapia.precio;
    let descuento = 0;
    let label = '';

    if (state.promo === 'promo169') {
      descuento = 169;
      label = 'Cortesía Valtara';
    }

    if (state.promo === 'promo20') {
      descuento = subtotal * 0.20;
      label = '20% matutino';
    }

    const total = Math.max(subtotal - descuento, 0);

    return {
      subtotal,
      descuento,
      total,
      label
    };
  }

  function createWhatsAppMessage() {
    const totals = calculate();

    return encodeURIComponent(
      `Hola, soy ${getName()}.\n\n` +
      `Me interesa la experiencia ${state.terapia.nombre}.\n` +
      `Duración: ${state.terapia.duracion}.\n` +
      `Aromaterapia: ${state.aroma}.\n` +
      `Promoción elegida: ${totals.label}.\n\n` +
      `Subtotal: ${currency(totals.subtotal)}\n` +
      `Beneficio aplicado: -${currency(totals.descuento)}\n` +
      `Total estimado: ${currency(totals.total)}\n\n` +
      `Sucursal principal: Reforma 195\n` +
      `Próxima apertura: cerca de Metro Eugenia.\n\n` +
      `Me gustaría consultar disponibilidad.`
    );
  }

  function renderPromos() {
    const totals = calculate();

    return `
      <section class="valtara-promos-shell">
        <div class="vp-hero glass-card">
          <div>
            <span class="vp-badge">VALTARA EXPERIENCIAS</span>
            <h2>${randomPhrase()}</h2>
            <p>
              Terapias diseñadas para aliviar tensión física, mental y emocional
              en una experiencia elegante, personalizada y profundamente relajante.
            </p>
          </div>
        </div>

        <div class="vp-grid-promos">
          <article class="vp-card promo169 ${state.promo === 'promo169' ? 'active' : ''}" data-promo="promo169">
            <span class="vp-tag">Lunes y martes</span>
            <h3>${PROMO_169.title}</h3>
            <p>${PROMO_169.subtitle}</p>
            <small>${PROMO_169.limitText}</small>
          </article>

          <article class="vp-card promo20 ${state.promo === 'promo20' ? 'active' : ''}" data-promo="promo20">
            <span class="vp-tag">Jueves a domingo</span>
            <h3>${PROMO_20.title}</h3>
            <p>${PROMO_20.subtitle}</p>
            <small>Disponible hasta la 1:00 PM.</small>
          </article>
        </div>

        <div class="vp-selector glass-card">
          <div class="vp-field">
            <label>Terapia</label>
            <select id="vp-terapia-select">
              ${TERAPIAS.map(t => `
                <option value="${t.id}" ${state.terapia.id === t.id ? 'selected' : ''}>
                  ${t.nombre} — ${t.duracion} — ${currency(t.precio)}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="vp-field">
            <label>Aromaterapia</label>
            <select id="vp-aroma-select">
              ${AROMAS.map(a => `
                <option value="${a}" ${state.aroma === a ? 'selected' : ''}>${a}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="vp-summary glass-card">
          <h3>Resumen estimado</h3>

          <div class="vp-line">
            <span>Subtotal</span>
            <strong>${currency(totals.subtotal)}</strong>
          </div>

          <div class="vp-line benefit">
            <span>${totals.label}</span>
            <strong>-${currency(totals.descuento)}</strong>
          </div>

          <div class="vp-line total">
            <span>Total estimado</span>
            <strong>${currency(totals.total)}</strong>
          </div>

          <div class="vp-experience-note">
            <strong>Experiencia nocturna:</strong>
            Después de las 7:00 PM algunas experiencias incluyen una cortesía
            de té de frutos rojos.
          </div>

          <a
            class="vp-whatsapp-btn"
            href="https://wa.me/${WHATSAPP_NUMBER}?text=${createWhatsAppMessage()}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Continuar por WhatsApp
          </a>
        </div>

        <div class="vp-raffle glass-card">
          <span class="vp-tag gold">SORTEO MENSUAL</span>
          <h3>Cada mes regalamos experiencias completas</h3>
          <p>
            Participa para ganar una terapia relajante o deportiva
            totalmente de cortesía.
          </p>

          <a
            class="vp-secondary-btn"
            href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, me gustaría participar en el sorteo mensual de Valtara.')}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Participar
          </a>
        </div>

        <div class="vp-terms glass-card">
          <h4>Términos y condiciones</h4>
          <ul>
            <li>Las cortesías no son acumulables entre sí.</li>
            <li>Promociones sujetas a disponibilidad.</li>
            <li>La cortesía de $169 MXN aplica lunes y martes después de la 1 PM para las primeras 10 sesiones.</li>
            <li>El 20% matutino aplica jueves a domingo hasta la 1 PM.</li>
            <li>Beneficios válidos en Reforma 195.</li>
            <li>Próxima apertura cerca de Metro Eugenia.</li>
          </ul>
        </div>
      </section>
    `;
  }

  function render() {
    const container = document.getElementById('inicio_promociones');
    if (!container) return;

    container.innerHTML = renderPromos();

    document.querySelectorAll('.vp-card').forEach(card => {
      card.addEventListener('click', () => {
        state.promo = card.dataset.promo;
        render();
      });
    });

    document.getElementById('vp-terapia-select')?.addEventListener('change', e => {
      state.terapia = TERAPIAS.find(t => t.id === e.target.value) || TERAPIAS[0];
      render();
    });

    document.getElementById('vp-aroma-select')?.addEventListener('change', e => {
      state.aroma = e.target.value;
      render();
    });
  }

  function injectStyles() {
    if (document.getElementById('vp-styles')) return;

    const style = document.createElement('style');
    style.id = 'vp-styles';
    style.textContent = `
      .valtara-promos-shell {
        display: grid;
        gap: 1.2rem;
        max-width: 1180px;
        margin: 0 auto;
      }

      .glass-card {
        background: rgba(255,255,255,.03);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 28px;
        padding: 1.3rem;
        box-shadow: 0 18px 40px rgba(0,0,0,.25);
      }

      .vp-hero h2,
      .vp-card h3,
      .vp-summary h3,
      .vp-raffle h3 {
        color: #fff;
      }

      .vp-grid-promos {
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(260px,1fr));
        gap: 1rem;
      }

      .vp-card {
        cursor: pointer;
        transition: .2s ease;
      }

      .vp-card.active {
        border-color: #f2c94c;
        transform: translateY(-2px);
      }

      .vp-tag {
        display: inline-flex;
        padding: .35rem .7rem;
        border-radius: 999px;
        background: rgba(0,255,224,.12);
        color: #00ffe0;
        font-size: .75rem;
      }

      .vp-tag.gold {
        background: rgba(242,201,76,.12);
        color: #f2c94c;
      }

      .vp-selector {
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
        gap: 1rem;
      }

      .vp-field {
        display: grid;
        gap: .5rem;
      }

      .vp-field label {
        color: #fff;
      }

      .vp-field select {
        background: rgba(255,255,255,.05);
        color: #fff;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 14px;
        padding: .9rem;
      }

      .vp-line {
        display: flex;
        justify-content: space-between;
        margin: .75rem 0;
        color: #fff;
      }

      .vp-line.total {
        font-size: 1.15rem;
      }

      .vp-whatsapp-btn,
      .vp-secondary-btn {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 1rem;
        border-radius: 999px;
        text-decoration: none;
        font-weight: 700;
        margin-top: 1rem;
      }

      .vp-whatsapp-btn {
        background: linear-gradient(135deg,#22c55e,#00b36a);
        color: white;
      }

      .vp-secondary-btn {
        background: rgba(255,255,255,.06);
        color: white;
      }

      .vp-terms ul {
        margin: 1rem 0 0;
        padding-left: 1rem;
        color: #bbb;
        line-height: 1.7;
      }

      @media(max-width:720px){
        .glass-card {
          border-radius: 22px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function init() {
    injectStyles();
    render();
  }

  global.ValtaraModulos = global.ValtaraModulos || {};
  global.ValtaraModulos.inicio_promociones = '<section id="inicio_promociones"></section>';

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(init, 100);
  });

})(window);
