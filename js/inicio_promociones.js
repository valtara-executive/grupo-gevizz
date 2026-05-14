window.ValtaraModulos = window.ValtaraModulos || {};

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '5213348572070';
  const CONTACT_DISPLAY = '33 4857 2070';
  const MAIN_ADDRESS = 'Reforma 195';
  const NEXT_OPENING = 'cerca de Metro Eugenia';

  const therapies = [{"id":"relajante50","name":"Masaje Relajante Neuro Adaptativo","duration":"50 Minutos","price":699,"icon":"fa-spa","color":"#00ffe0","desc":"Relajación profunda para disminuir ansiedad, estrés físico y agotamiento emocional. Movimientos fluidos, ritmos lentos y una sensación de descanso real para el sistema nervioso. Ideal para bajar revoluciones internas sin perder la sensación de cuidado clínico y premium."},{"id":"relajante90","name":"Masaje Relajante Neuro Adaptativo","duration":"90 Minutos","price":899,"icon":"fa-moon","color":"#6ee7ff","desc":"Versión extendida para quienes necesitan más tiempo de contención, silencio corporal y restauración profunda. Muy útil cuando el cansancio viene acompañado de sobrecarga mental, insomnio o una sensación de cuerpo acelerado."},{"id":"deportivo","name":"Masaje Deportivo & Descompresión","duration":"50 Minutos","price":729,"icon":"fa-dumbbell","color":"#ff5555","desc":"Liberación muscular profunda para contracturas, sobrecarga física y rigidez acumulada por entrenamiento, trabajo repetitivo o tensión sostenida. Busca devolver movilidad, descargar tejido y recuperar sensación de potencia corporal."},{"id":"tailandes","name":"Masaje Tailandés · Yoga Pasivo","duration":"50 Minutos","price":729,"icon":"fa-person-praying","color":"#4cc9f0","desc":"Estiramientos asistidos y presión estratégica para recuperar movilidad, aflojar cadenas musculares y disminuir sensación de cuerpo pesado. Muy útil cuando el cuerpo se siente cerrado, rígido o con poca amplitud de movimiento."},{"id":"ayurveda","name":"Ayurveda & Aromaterapia","duration":"50 Minutos","price":829,"icon":"fa-leaf","color":"#F2C94C","desc":"Aceites tibios, aromas botánicos y maniobras calmantes para ansiedad, fatiga emocional y necesidad de reconectar con el cuerpo. La sesión está diseñada para inducir serenidad, suavidad y una sensación envolvente de bienestar."},{"id":"holistico","name":"Masaje Holístico Integrativo","duration":"50 Minutos","price":829,"icon":"fa-yin-yang","color":"#FFD700","desc":"Experiencia enfocada en equilibrio físico y emocional, con presión media y una intención profunda de armonizar cuerpo, respiración y mente. Puede sentirse especialmente valioso cuando la tensión ya no es solo muscular, sino también emocional."},{"id":"lomi","name":"Ritual Lomi Lomi Supremo","duration":"Sesión Premium","price":999,"icon":"fa-water","color":"#ffaa00","desc":"Ritual inmersivo inspirado en el oleaje hawaiano. Movimientos continuos, fluidez sensorial y una sensación de desconexión total del estrés. Es una experiencia premium para quienes buscan un descanso más ceremonial y profundo."},{"id":"esferas","name":"Esferas Chinas & Velas Aromáticas","duration":"60 Minutos","price":819,"icon":"fa-circle-notch","color":"#ffffff","desc":"Vibración sonora, luz cálida y una atmósfera de calma diseñada para regular el ritmo interno y relajar profundamente el sistema nervioso. Ideal para sensibilidad sensorial, agotamiento mental o deseo de una experiencia más contemplativa."},{"id":"facial","name":"Terapia para Parálisis Facial","duration":"45 Minutos","price":529,"icon":"fa-face-smile","color":"#4361EE","desc":"Estimulación neuromuscular enfocada en recuperación funcional, relajación de compensaciones y apoyo al retorno de movilidad facial. La intención es acompañar la recuperación con precisión, delicadeza y respeto al ritmo del paciente."},{"id":"drenaje","name":"Drenaje Linfático Manual","duration":"60 Minutos","price":749,"icon":"fa-droplet","color":"#d6d6d6","desc":"Movilización suave para sensación de ligereza, apoyo al retorno de líquidos y una experiencia corporal delicada y respetuosa. Es una propuesta ideal cuando el cuerpo pide menos fuerza y más fluidez."},{"id":"reductivo","name":"Reductivo & Maderoterapia","duration":"Sesión / Paquete","price":799,"icon":"fa-child-reaching","color":"#b27fff","desc":"Protocolos corporales de estética manual con geles especializados y maderoterapia para acompañar objetivos de bienestar corporal. Busca un trabajo localizado, firme y orientado a resultados visibles con una estética premium."},{"id":"shiatsu","name":"Shiatsu en Cama · Complemento","duration":"20 Minutos","price":199,"icon":"fa-chair","color":"#ffffff","desc":"Complemento ideal para acompañantes o como extensión en terapias elegibles. Presión estratégica en cuello, hombros y espalda alta para sumar un cierre relajante, breve y muy útil dentro de una sesión principal."}];

  const aromas = [{"name":"Lavanda","note":"Relajación profunda"},{"name":"Vainilla","note":"Calidez y suavidad"},{"name":"Menta","note":"Sensación fresca"},{"name":"Eucalipto","note":"Respiración despejada"},{"name":"Rosas Blancas","note":"Experiencia premium"},{"name":"Frutos Rojos","note":"Dulce y envolvente"},{"name":"Cítricos Suaves","note":"Energía ligera"},{"name":"Jazmín","note":"Florece la calma"},{"name":"Naranja Dulce","note":"Alegría y luminosidad"},{"name":"Sándalo","note":"Tierra y profundidad"},{"name":"Té Blanco","note":"Delicadeza serena"},{"name":"Romero","note":"Claridad mental"},{"name":"Cacao","note":"Calidez envolvente"},{"name":"Coco","note":"Ligereza tropical"},{"name":"Flor de Azahar","note":"Dulzura tranquila"},{"name":"Neutra","note":"Sin aroma añadido"}];

  const promos = [{"id":"off169","name":"$169 de cortesía","detail":"Lunes y martes, primeras 10 sesiones después de la 1 PM.","type":"fixed","value":169},{"id":"off20","name":"20% OFF matutino","detail":"Jueves a domingo antes de las 2 PM.","type":"percent","value":20}];

  const money = (value) => '$' + Number(value).toLocaleString('es-MX') + ' MXN';
  const waLink = (text) => 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);

  function buildMessage(therapy, aroma, promo, discount, total) {
    return [
      'Hola, quiero agendar una experiencia Valtara.',
      '',
      'Terapia: ' + therapy.name,
      'Duración: ' + therapy.duration,
      'Aromaterapia: ' + aroma.name + ' (incluida sin costo extra)',
      'Promoción: ' + (promo ? promo.name : 'Sin promoción'),
      '',
      'Subtotal: ' + money(therapy.price),
      'Descuento: ' + money(discount),
      'Total estimado: ' + money(total),
      '',
      'Sucursal principal: ' + MAIN_ADDRESS,
      'Próxima apertura: ' + NEXT_OPENING + '.',
      'Contacto oficial: ' + CONTACT_DISPLAY
    ].join('\n');
  }

  function promoLinks(therapy, aroma) {
    const fixedPromo = promos[0];
    const percentPromo = promos[1];
    const fixedDiscount = fixedPromo.value;
    const percentDiscount = Math.round(therapy.price * (percentPromo.value / 100));
    const fixedTotal = Math.max(therapy.price - fixedDiscount, 0);
    const percentTotal = Math.max(therapy.price - percentDiscount, 0);

    return `
      <div class="vtp-summary-box">
        <div class="vtp-line"><span>Terapia</span><strong>${therapy.name}</strong></div>
        <div class="vtp-line"><span>Duración</span><strong>${therapy.duration}</strong></div>
        <div class="vtp-line"><span>Aromaterapia</span><strong>${aroma.name} · incluida sin costo extra</strong></div>
        <div class="vtp-line"><span>Subtotal</span><strong>${money(therapy.price)}</strong></div>
      </div>

      <div class="vtp-promo-grid">
        <a class="vtp-cta-btn vtp-cta-soft" target="_blank" rel="noopener noreferrer"
           href="${waLink(buildMessage(therapy, aroma, null, 0, therapy.price))}">
          <i class="fa-brands fa-whatsapp"></i>
          Sin promoción · ${money(therapy.price)}
        </a>

        <a class="vtp-cta-btn" target="_blank" rel="noopener noreferrer"
           href="${waLink(buildMessage(therapy, aroma, fixedPromo, fixedDiscount, fixedTotal))}">
          <i class="fa-brands fa-whatsapp"></i>
          ${fixedPromo.name} · ${money(fixedTotal)}
        </a>

        <a class="vtp-cta-btn vtp-cta-gold" target="_blank" rel="noopener noreferrer"
           href="${waLink(buildMessage(therapy, aroma, percentPromo, percentDiscount, percentTotal))}">
          <i class="fa-brands fa-whatsapp"></i>
          ${percentPromo.name} · ${money(percentTotal)}
        </a>
      </div>

      <div class="vtp-note vtp-note-soft">
        <strong>Términos:</strong> la cortesía de ${money(fixedPromo.value)} aplica lunes y martes, primeras 10 sesiones después de la 1 PM. El 20% matutino aplica jueves a domingo antes de las 2 PM. Las promociones no son acumulables. Aromaterapias sujetas a disponibilidad.
      </div>
    `;
  }

  function aromaDetails(therapy) {
    return aromas.map((aroma, index) => `
      <details class="vtp-aroma-accordion"${index === 0 ? ' open' : ''}>
        <summary class="vtp-aroma-summary">
          <div class="vtp-a-visual"><i class="fa-solid fa-wind"></i></div>
          <div>
            <p class="vtp-step-label">Paso 2 · Aromaterapia</p>
            <h4>${aroma.name}</h4>
            <p>${aroma.note} · Sujeto a disponibilidad · incluida sin costo extra</p>
          </div>
        </summary>
        <div class="vtp-aroma-body">
          <p class="vtp-availability">
            <i class="fa-solid fa-circle-info"></i>
            Sujeto a disponibilidad
          </p>

          <div class="vtp-scent-note">
            ${aroma.name === 'Neutra'
              ? 'Si prefieres una experiencia neutra, no se añade aroma adicional y la sesión se mantiene limpia, sobria y silenciosa.'
              : 'El aroma acompaña la sesión como una capa sensorial suave. No cambia el precio y permanece disponible según operación del día.'}
          </div>

          <div class="vtp-mini-summary">
            <div><span>Terapia</span><strong>${therapy.name}</strong></div>
            <div><span>Duración</span><strong>${therapy.duration}</strong></div>
            <div><span>Subtotal base</span><strong>${money(therapy.price)}</strong></div>
          </div>

          ${promoLinks(therapy, aroma)}

          <a class="vtp-backlink" href="#therapy-${therapy.id}">
            ← Regresar a la terapia
          </a>
        </div>
      </details>
    `).join('');
  }

  function therapyChapter(therapy, index) {
    return `
      <details class="vtp-chapter" id="therapy-${therapy.id}"${index === 0 ? ' open' : ''}>
        <summary class="vtp-chapter-summary">
          <div class="vtp-visual" style="--accent:${therapy.color}">
            <i class="fa-solid ${therapy.icon}"></i>
          </div>
          <div class="vtp-chapter-copy">
            <p class="vtp-step-label">Paso 1 · Elige tu terapia</p>
            <h3>${therapy.name}</h3>
            <p class="vtp-duration"><i class="fa-solid fa-clock"></i> ${therapy.duration}</p>
            <p class="vtp-desc">${therapy.desc}</p>
            <div class="vtp-price-line">${money(therapy.price)}</div>
          </div>
        </summary>
        <div class="vtp-chapter-body">
          <div class="vtp-stage-head">
            <span class="vtp-section-kicker"><i class="fa-solid fa-wind"></i> Paso 2 · Aromaterapia</span>
            <h4>Elige tu aroma. Todas las opciones están incluidas.</h4>
            <p>Su disponibilidad puede variar según agenda y operación del día.</p>
          </div>

          <div class="vtp-aroma-grid">
            ${aromaDetails(therapy)}
          </div>

          <div class="vtp-note">
            <strong>Recuerda:</strong> las promociones no son acumulables. La experiencia nocturna puede incluir té de frutos rojos de cortesía a partir de las 7 PM.
          </div>

          <a class="vtp-backlink" href="#inicio_promociones_top">
            ← Volver al inicio
          </a>
        </div>
      </details>
    `;
  }

  window.ValtaraModulos.inicio_promociones = `
  <section class="vtp-shell" id="inicio_promociones_top">
    <style>
      .vtp-shell {
        max-width: 1220px;
        margin: 0 auto;
        padding: 2rem 1rem 5rem;
        box-sizing: border-box;
      }
      .vtp-hero {
        padding: 2rem;
        border-radius: 32px;
        background:
          radial-gradient(circle at top right, rgba(242,201,76,.12), transparent 30%),
          radial-gradient(circle at bottom left, rgba(0,255,224,.10), transparent 28%),
          rgba(255,255,255,.03);
        border: 1px solid rgba(255,255,255,.08);
        box-shadow: 0 20px 45px rgba(0,0,0,.22);
        margin-bottom: 1.4rem;
      }
      .vtp-kicker {
        display: inline-flex;
        align-items: center;
        gap: .55rem;
        padding: .45rem .85rem;
        border-radius: 999px;
        border: 1px solid rgba(242,201,76,.18);
        background: rgba(242,201,76,.08);
        color: var(--valtara-oro);
        letter-spacing: .16em;
        text-transform: uppercase;
        font-size: .75rem;
        margin-bottom: 1rem;
      }
      .vtp-hero h2 {
        margin: 0;
        color: var(--valtara-blanco);
        font-family: var(--font-accent);
        font-size: clamp(2.2rem, 5vw, 4rem);
        line-height: 1.05;
      }
      .vtp-hero p {
        margin: 1rem 0 0;
        color: var(--valtara-gris-texto);
        line-height: 1.85;
        font-size: 1.05rem;
        max-width: 920px;
      }
      .vtp-board {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: .9rem;
        margin-bottom: 1.4rem;
      }
      .vtp-chip {
        padding: 1rem 1.1rem;
        border-radius: 22px;
        background: rgba(255,255,255,.035);
        border: 1px solid rgba(255,255,255,.08);
        color: #ddd;
        line-height: 1.65;
        box-shadow: 0 16px 34px rgba(0,0,0,.15);
      }
      .vtp-chip strong {
        display: block;
        color: var(--valtara-blanco);
        margin-bottom: .35rem;
      }
      .vtp-chip i {
        margin-right: .35rem;
        color: var(--valtara-oro);
      }
      .vtp-book {
        display: grid;
        gap: 1rem;
      }
      .vtp-chapter, .vtp-aroma-accordion {
        border-radius: 30px;
        border: 1px solid rgba(255,255,255,.08);
        background: rgba(255,255,255,.03);
        box-shadow: 0 18px 42px rgba(0,0,0,.22);
        overflow: hidden;
      }
      .vtp-chapter[open], .vtp-aroma-accordion[open] {
        border-color: rgba(242,201,76,.20);
      }
      .vtp-chapter-summary, .vtp-aroma-summary {
        list-style: none;
        cursor: pointer;
        display: grid;
        grid-template-columns: 110px 1fr;
        gap: 1rem;
        align-items: center;
        padding: 1.25rem;
      }
      .vtp-chapter-summary::-webkit-details-marker,
      .vtp-aroma-summary::-webkit-details-marker {
        display: none;
      }
      .vtp-visual {
        width: 110px;
        height: 110px;
        border-radius: 28px;
        display: grid;
        place-items: center;
        position: relative;
        overflow: hidden;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.08);
      }
      .vtp-visual::before {
        content: '';
        position: absolute;
        inset: -35%;
        background: conic-gradient(from 0deg, var(--accent), transparent, rgba(255,255,255,.05), transparent, var(--accent));
        animation: vtpSpin 10s linear infinite;
        opacity: .95;
      }
      .vtp-visual::after, .vtp-a-visual::after {
        content: '';
        position: absolute;
        width: 56%;
        height: 56%;
        border-radius: 50%;
        background: rgba(255,255,255,.09);
        backdrop-filter: blur(10px);
      }
      .vtp-visual i, .vtp-a-visual i {
        position: relative;
        z-index: 2;
        font-size: 2.5rem;
        color: var(--accent, var(--valtara-oro));
        animation: vtpFloat 5.5s ease-in-out infinite;
        filter: drop-shadow(0 0 16px rgba(255,255,255,.12));
      }
      .vtp-a-visual {
        width: 54px;
        height: 54px;
        border-radius: 18px;
        display: grid;
        place-items: center;
        position: relative;
        overflow: hidden;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.08);
        flex: 0 0 auto;
      }
      .vtp-a-visual i {
        font-size: 1.15rem;
      }
      @keyframes vtpSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes vtpFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      .vtp-step-label {
        margin: 0 0 .35rem;
        letter-spacing: .22em;
        text-transform: uppercase;
        color: var(--valtara-cian-brillante);
        font-size: .72rem;
      }
      .vtp-chapter-copy h3, .vtp-aroma-summary h4 {
        margin: .2rem 0 .6rem;
        color: var(--valtara-blanco);
        font-size: clamp(1.2rem, 2.6vw, 1.65rem);
      }
      .vtp-duration {
        margin: 0 0 .9rem;
        color: var(--valtara-oro);
        font-size: .92rem;
      }
      .vtp-desc {
        margin: 0;
        color: var(--valtara-gris-texto);
        line-height: 1.8;
      }
      .vtp-price-line {
        margin-top: 1rem;
        display: inline-flex;
        align-items: center;
        padding: .55rem .9rem;
        border-radius: 999px;
        background: rgba(242,201,76,.10);
        color: var(--valtara-oro);
        font-weight: 800;
      }
      .vtp-chapter-body, .vtp-aroma-body {
        padding: 0 1.25rem 1.25rem;
        border-top: 1px solid rgba(255,255,255,.07);
      }
      .vtp-stage-head {
        padding: 1rem 0 .2rem;
      }
      .vtp-stage-head h4 {
        margin: .2rem 0 .35rem;
        color: var(--valtara-blanco);
        font-size: 1.15rem;
      }
      .vtp-stage-head p {
        margin: 0;
        color: var(--valtara-gris-texto);
        line-height: 1.7;
      }
      .vtp-section-kicker {
        display: inline-flex;
        align-items: center;
        gap: .45rem;
        padding: .32rem .7rem;
        border-radius: 999px;
        background: rgba(0,255,224,.08);
        border: 1px solid rgba(0,255,224,.15);
        color: var(--valtara-cian-brillante);
        font-size: .74rem;
        letter-spacing: .16em;
        text-transform: uppercase;
        margin-bottom: .7rem;
      }
      .vtp-aroma-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: .9rem;
        margin-top: 1rem;
      }
      .vtp-aroma-summary {
        grid-template-columns: 54px 1fr;
        padding: 1rem;
      }
      .vtp-aroma-summary h4 {
        font-size: 1.05rem;
        margin: 0 0 .45rem;
      }
      .vtp-aroma-summary p {
        margin: 0;
        color: var(--valtara-gris-texto);
        line-height: 1.65;
      }
      .vtp-availability {
        display: inline-flex;
        align-items: center;
        gap: .4rem;
        padding: .32rem .7rem;
        border-radius: 999px;
        background: rgba(0,255,224,.06);
        border: 1px solid rgba(0,255,224,.12);
        color: var(--valtara-cian-brillante);
        font-size: .74rem;
        letter-spacing: .14em;
        text-transform: uppercase;
        margin: .8rem 0;
      }
      .vtp-scent-note {
        margin-top: .3rem;
        padding: 1rem;
        border-radius: 20px;
        background: rgba(255,255,255,.03);
        border: 1px solid rgba(255,255,255,.08);
        color: #d7d7d7;
        line-height: 1.8;
      }
      .vtp-summary-box {
        padding: 1rem 1.1rem;
        border-radius: 22px;
        background: rgba(255,255,255,.03);
        border: 1px solid rgba(255,255,255,.08);
        color: #d5d5d5;
        line-height: 1.8;
        margin-top: 1rem;
      }
      .vtp-mini-summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: .8rem;
        margin-top: 1rem;
      }
      .vtp-mini-summary div {
        padding: .8rem .9rem;
        border-radius: 18px;
        border: 1px solid rgba(255,255,255,.08);
        background: rgba(255,255,255,.03);
      }
      .vtp-mini-summary span {
        display: block;
        color: var(--valtara-gris-texto);
        font-size: .82rem;
        margin-bottom: .25rem;
      }
      .vtp-mini-summary strong {
        color: var(--valtara-blanco);
      }
      .vtp-line {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding: .8rem 0;
        border-bottom: 1px solid rgba(255,255,255,.08);
      }
      .vtp-line:last-child {
        border-bottom: none;
      }
      .vtp-promo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: .75rem;
        margin-top: 1rem;
      }
      .vtp-cta-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: .55rem;
        padding: .95rem 1rem;
        border-radius: 999px;
        border: 0;
        text-decoration: none;
        font-weight: 800;
        cursor: pointer;
        background: linear-gradient(135deg,#22c55e,#00b36a);
        color: white;
        box-shadow: 0 12px 26px rgba(34,197,94,.16);
        transition: transform .18s ease, filter .18s ease;
      }
      .vtp-cta-btn:hover {
        transform: translateY(-2px);
        filter: brightness(1.04);
      }
      .vtp-cta-soft {
        background: rgba(255,255,255,.05);
        color: white;
        border: 1px solid rgba(255,255,255,.08);
      }
      .vtp-cta-gold {
        background: linear-gradient(135deg, #f2c94c, #d9a93a);
        color: #1a1300;
      }
      .vtp-note {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 20px;
        background: rgba(242,201,76,.05);
        border: 1px solid rgba(242,201,76,.14);
        color: #cfcfcf;
        line-height: 1.9;
      }
      .vtp-note-soft {
        background: rgba(0,255,224,.05);
        border-color: rgba(0,255,224,.12);
      }
      .vtp-backlink {
        display: inline-flex;
        margin-top: 1rem;
        color: var(--valtara-oro);
        text-decoration: none;
        font-weight: 800;
      }
      .vtp-backlink:hover {
        text-decoration: underline;
      }
      @media (max-width: 720px) {
        .vtp-hero, .vtp-chapter-summary, .vtp-aroma-summary, .vtp-chapter-body, .vtp-aroma-body {
          padding-left: .9rem;
          padding-right: .9rem;
        }
        .vtp-chapter-summary {
          grid-template-columns: 1fr;
        }
        .vtp-aroma-summary {
          grid-template-columns: 1fr;
        }
        .vtp-visual {
          width: 92px;
          height: 92px;
        }
      }
    </style>

    <section class="vtp-hero">
      <div class="vtp-kicker"><i class="fa-solid fa-book-open fa-fade"></i> Promociones vigentes</div>
      <h2>Elige terapia, aroma y cortesía en un solo recorrido</h2>
      <p>
        Una experiencia tipo libro para que cada paciente avance paso a paso:
        primero la terapia, después la aromaterapia y al final la promoción adecuada.
        Todo con enlace directo a WhatsApp, precios oficiales y diseño estable en móvil.
      </p>
    </section>

    <div class="vtp-board">
      <div class="vtp-chip"><strong><i class="fa-solid fa-gift"></i> Cortesía $169</strong>Lunes y martes, primeras 10 sesiones después de la 1 PM.</div>
      <div class="vtp-chip"><strong><i class="fa-solid fa-sun"></i> 20% matutino</strong>Jueves a domingo antes de las 2 PM.</div>
      <div class="vtp-chip"><strong><i class="fa-solid fa-wind"></i> Aromaterapias</strong>Todas sin costo extra · sujeto a disponibilidad.</div>
      <div class="vtp-chip"><strong><i class="fa-solid fa-map-location-dot"></i> Ubicaciones</strong>Reforma 195 · cerca de Metro Eugenia</div>
      <div class="vtp-chip"><strong><i class="fa-brands fa-whatsapp"></i> Contacto oficial</strong>33 4857 2070</div>
    </div>

    <div class="vtp-book">
      ${therapies.map(therapyChapter).join('')}
    </div>
  </section>
  `;
})();
