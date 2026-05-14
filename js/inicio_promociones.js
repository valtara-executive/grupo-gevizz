window.ValtaraModulos = window.ValtaraModulos || {};

const VT_PROMO = (() => {
  const WHATSAPP_NUMBER = '5213348572070';

  const therapies = [
    { id: 'relajante50', name: 'Masaje Relajante Neuro Adaptativo', duration: '50 Minutos', price: 699, accent: '#00ffe0', icon: 'fa-spa', desc: 'Relajación profunda para disminuir ansiedad, estrés físico y agotamiento emocional. Movimientos fluidos, ritmos lentos y una sensación de descanso real para el sistema nervioso.' },
    { id: 'relajante90', name: 'Masaje Relajante Neuro Adaptativo', duration: '90 Minutos', price: 899, accent: '#6ee7ff', icon: 'fa-moon', desc: 'Versión extendida para quienes necesitan más tiempo de contención, silencio corporal y restauración profunda. Ideal para burnout y sobrecarga mental.' },
    { id: 'deportivo', name: 'Masaje Deportivo & Descompresión', duration: '50 Minutos', price: 729, accent: '#ff5555', icon: 'fa-dumbbell', desc: 'Liberación muscular profunda para contracturas, sobrecarga física y rigidez acumulada por entrenamiento, trabajo repetitivo o tensión sostenida.' },
    { id: 'tailandes', name: 'Masaje Tailandés · Yoga Pasivo', duration: '50 Minutos', price: 729, accent: '#4cc9f0', icon: 'fa-person-praying', desc: 'Estiramientos asistidos y presión estratégica para recuperar movilidad, aflojar cadenas musculares y disminuir sensación de cuerpo pesado.' },
    { id: 'ayurveda', name: 'Ayurveda & Aromaterapia', duration: '50 Minutos', price: 829, accent: '#F2C94C', icon: 'fa-leaf', desc: 'Aceites tibios, aromas botánicos y maniobras calmantes para ansiedad, fatiga emocional y necesidad de reconectar con el cuerpo.' },
    { id: 'holistico', name: 'Masaje Holístico Integrativo', duration: '50 Minutos', price: 829, accent: '#FFD700', icon: 'fa-yin-yang', desc: 'Experiencia enfocada en equilibrio físico y emocional, con presión media y una intención profunda de armonizar cuerpo, respiración y mente.' },
    { id: 'lomi', name: 'Ritual Lomi Lomi Supremo', duration: 'Sesión Premium', price: 999, accent: '#ffaa00', icon: 'fa-water', desc: 'Un ritual inmersivo inspirado en el oleaje hawaiano. Movimientos continuos, fluidez sensorial y una sensación de desconexión total del estrés.' },
    { id: 'esferas', name: 'Esferas Chinas & Velas Aromáticas', duration: '60 Minutos', price: 819, accent: '#ffffff', icon: 'fa-circle-notch', desc: 'Vibración sonora, luz cálida y una atmósfera de calma diseñada para regular el ritmo interno y relajar profundamente el sistema nervioso.' },
    { id: 'facial', name: 'Terapia para Parálisis Facial', duration: '45 Minutos', price: 529, accent: '#4361EE', icon: 'fa-face-smile', desc: 'Estimulación neuromuscular enfocada en recuperación funcional, relajación de compensaciones y apoyo al retorno de movilidad facial.' },
    { id: 'drenaje', name: 'Drenaje Linfático Manual', duration: '60 Minutos', price: 749, accent: '#d6d6d6', icon: 'fa-droplet', desc: 'Movilización suave para sensación de ligereza, apoyo al retorno de líquidos y una experiencia corporal delicada y respetuosa.' },
    { id: 'reductivo', name: 'Reductivo & Maderoterapia', duration: 'Sesión / Paquete', price: 799, accent: '#b27fff', icon: 'fa-child-reaching', desc: 'Protocolos corporales de estética manual con geles especializados y maderoterapia para acompañar objetivos de bienestar corporal.' },
    { id: 'shiatsu', name: 'Shiatsu en Cama · Complemento', duration: '20 Minutos', price: 199, accent: '#ffffff', icon: 'fa-chair', desc: 'Complemento ideal para acompañantes o como extensión en terapias elegibles. Presión estratégica en cuello, hombros y espalda alta.' }
  ];

  const aromas = [
    { name: 'Lavanda', extra: 0, note: 'Relajación profunda' },
    { name: 'Vainilla', extra: 49, note: 'Calidez y suavidad' },
    { name: 'Menta', extra: 39, note: 'Sensación fresca' },
    { name: 'Eucalipto', extra: 39, note: 'Respiración despejada' },
    { name: 'Rosas Blancas', extra: 59, note: 'Experiencia premium' }
  ];

  const promos = {
    fixed: { id: 'off169', name: '$169 de cortesía', value: 169, detail: 'Lunes y martes, primeras 10 sesiones después de la 1 PM.' },
    percent: { id: 'off20', name: '20% OFF matutino', value: 20, detail: 'Jueves a domingo antes de las 2 PM.' }
  };

  const money = (n) => `$${Number(n).toLocaleString('es-MX')} MXN`;
  const waLink = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  function buildMessage(therapy, aroma, promo, subtotal, discount, total) {
    return [
      'Hola, quiero agendar una experiencia Valtara.',
      '',
      `Terapia: ${therapy.name}`,
      `Duración: ${therapy.duration}`,
      `Aromaterapia: ${aroma.name}`,
      `Promoción: ${promo ? promo.name : 'Sin promoción'}`,
      `Subtotal: ${money(subtotal)}`,
      `Descuento: ${money(discount)}`,
      `Total estimado: ${money(total)}`,
      '',
      'Sucursal principal: Reforma 195',
      'Próxima apertura: cerca de Metro Eugenia.'
    ].join('\n');
  }

  function totals(therapy, aroma, promo) {
    const subtotal = therapy.price + aroma.extra;
    let discount = 0;
    if (promo) {
      if (promo.id === 'off169') discount = promo.value;
      if (promo.id === 'off20') discount = Math.round(subtotal * (promo.value / 100));
    }
    const total = Math.max(subtotal - discount, 0);
    return { subtotal, discount, total };
  }

  function aromaCards(therapy) {
    return aromas.map((aroma) => {
      const noPromo = totals(therapy, aroma, null);
      const fixed = totals(therapy, aroma, promos.fixed);
      const percent = totals(therapy, aroma, promos.percent);

      return `
        <article class="promo-aroma-card">
          <div class="promo-aroma-head">
            <strong>${aroma.name}</strong>
            <span>${aroma.note}</span>
          </div>
          <p class="promo-aroma-text">
            ${aroma.extra === 0 ? 'Incluida en la experiencia' : `Complemento opcional por ${money(aroma.extra)}`}
          </p>
          <div class="promo-actions-row">
            <a href="${waLink(buildMessage(therapy, aroma, null, noPromo.subtotal, 0, noPromo.total))}" target="_blank" rel="noopener noreferrer" class="promo-wa-btn alt">
              <i class="fa-brands fa-whatsapp"></i>
              Sin promoción · ${money(noPromo.total)}
            </a>
            <a href="${waLink(buildMessage(therapy, aroma, promos.fixed, fixed.subtotal, fixed.discount, fixed.total))}" target="_blank" rel="noopener noreferrer" class="promo-wa-btn">
              <i class="fa-brands fa-whatsapp"></i>
              ${promos.fixed.name} · ${money(fixed.total)}
            </a>
            <a href="${waLink(buildMessage(therapy, aroma, promos.percent, percent.subtotal, percent.discount, percent.total))}" target="_blank" rel="noopener noreferrer" class="promo-wa-btn gold">
              <i class="fa-brands fa-whatsapp"></i>
              ${promos.percent.name} · ${money(percent.total)}
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  function chapter(therapy) {
    return `
      <details class="promo-chapter glass-card">
        <summary class="promo-summary-card">
          <div class="promo-visual" style="--accent:${therapy.accent}">
            <i class="fa-solid ${therapy.icon} promo-visual-icon"></i>
          </div>
          <div class="promo-summary-copy">
            <p class="promo-step-label">Paso 1 · Elige tu terapia</p>
            <h3>${therapy.name}</h3>
            <p class="promo-duration"><i class="fa-solid fa-clock"></i> ${therapy.duration}</p>
            <p class="promo-desc">${therapy.desc}</p>
            <div class="promo-price-line">${money(therapy.price)}</div>
          </div>
        </summary>
        <div class="promo-chapter-body">
          <div class="promo-booknote">
            <span class="promo-note-badge">Paso 2 · Aromaterapia</span>
            <p>Elige el aroma que mejor acompañe tu sesión. Cada tarjeta incluye el enlace directo a WhatsApp con el total calculado.</p>
          </div>
          <div class="promo-aroma-grid">${aromaCards(therapy)}</div>
          <div class="promo-booknote promo-booknote-soft">
            <span class="promo-note-badge">Paso 3 · Promociones</span>
            <p><strong>${promos.fixed.name}</strong> válido lunes y martes, primeras 10 sesiones después de la 1 PM. <strong>${promos.percent.name}</strong> válido jueves a domingo antes de las 2 PM. No son acumulables.</p>
            <p>Después de las 7 PM algunas experiencias incluyen té de frutos rojos de cortesía.</p>
          </div>
          <a class="promo-back-link" href="#inicio_promociones_top">← Volver al inicio</a>
        </div>
      </details>
    `;
  }

  return `
<section class="vt-promo-shell" id="inicio_promociones_top">
  <style>
    .vt-promo-shell { max-width: 1200px; margin: 0 auto; padding: 2rem 1rem 5rem; box-sizing: border-box; }
    .vt-promo-hero { padding: 2rem; border-radius: 32px; background: radial-gradient(circle at top right, rgba(242,201,76,.12), transparent 30%), radial-gradient(circle at bottom left, rgba(0,255,224,.10), transparent 28%), rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 20px 45px rgba(0,0,0,.22); margin-bottom: 1.4rem; }
    .vt-promo-kicker { display: inline-flex; align-items: center; gap: .55rem; padding: .45rem .85rem; border-radius: 999px; border: 1px solid rgba(242,201,76,.18); background: rgba(242,201,76,.08); color: var(--valtara-oro); letter-spacing: .16em; text-transform: uppercase; font-size: .75rem; margin-bottom: 1rem; }
    .vt-promo-hero h2 { margin: 0; color: var(--valtara-blanco); font-family: var(--font-accent); font-size: clamp(2.2rem, 5vw, 4rem); line-height: 1.05; }
    .vt-promo-hero p { margin: 1rem 0 0; color: var(--valtara-gris-texto); line-height: 1.85; font-size: 1.05rem; max-width: 880px; }
    .vt-promo-board { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: .9rem; margin-bottom: 1.4rem; }
    .vt-board-chip { padding: 1rem 1.1rem; border-radius: 22px; background: rgba(255,255,255,.035); border: 1px solid rgba(255,255,255,.08); color: #ddd; line-height: 1.65; box-shadow: 0 16px 34px rgba(0,0,0,.15); }
    .vt-board-chip strong { display: block; color: var(--valtara-blanco); margin-bottom: .35rem; }
    .vt-board-chip .chip-icon { display: inline-grid; place-items: center; width: 44px; height: 44px; border-radius: 16px; margin-bottom: .8rem; background: rgba(255,255,255,.05); color: var(--valtara-oro); }
    .vt-book { display: grid; gap: 1rem; }
    .glass-card { border-radius: 30px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); box-shadow: 0 18px 42px rgba(0,0,0,.22); overflow: hidden; }
    details.promo-chapter { transition: transform .25s ease, border-color .25s ease; }
    details.promo-chapter[open] { border-color: rgba(242,201,76,.22); }
    .promo-summary-card { display: grid; grid-template-columns: 110px 1fr; gap: 1rem; align-items: center; list-style: none; cursor: pointer; padding: 1.25rem; position: relative; }
    .promo-summary-card::-webkit-details-marker { display: none; }
    .promo-summary-card::after { content: "Abrir"; position: absolute; top: 1rem; right: 1rem; font-size: .72rem; letter-spacing: .18em; text-transform: uppercase; color: var(--valtara-gris-texto); opacity: .7; }
    details[open] .promo-summary-card::after { content: "Cerrado"; color: var(--valtara-oro); }
    .promo-visual { width: 110px; height: 110px; border-radius: 28px; display: grid; place-items: center; position: relative; overflow: hidden; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); box-shadow: inset 0 0 0 1px rgba(255,255,255,.03); }
    .promo-visual::before { content: ""; position: absolute; inset: -35%; background: conic-gradient(from 0deg, var(--accent), transparent, rgba(255,255,255,.05), transparent, var(--accent)); animation: vt-spin 10s linear infinite; opacity: .95; }
    .promo-visual::after { content: ""; position: absolute; width: 56%; height: 56%; border-radius: 50%; background: rgba(255,255,255,.09); backdrop-filter: blur(10px); }
    .promo-visual-icon { position: relative; z-index: 2; font-size: 2.5rem; color: var(--accent); animation: vt-float 5.5s ease-in-out infinite; filter: drop-shadow(0 0 16px rgba(255,255,255,.12)); }
    @keyframes vt-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes vt-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .promo-summary-copy h3 { margin: .2rem 0 .6rem; color: var(--valtara-blanco); font-size: clamp(1.2rem, 2.6vw, 1.65rem); }
    .promo-step-label { margin: 0 0 .35rem; letter-spacing: .22em; text-transform: uppercase; color: var(--valtara-cian-brillante); font-size: .72rem; }
    .promo-duration { margin: 0 0 .9rem; color: var(--valtara-oro); font-size: .92rem; }
    .promo-desc { margin: 0; color: var(--valtara-gris-texto); line-height: 1.8; max-width: 940px; }
    .promo-price-line { margin-top: 1rem; display: inline-flex; align-items: center; padding: .55rem .9rem; border-radius: 999px; background: rgba(242,201,76,.10); color: var(--valtara-oro); font-weight: 800; }
    .promo-chapter-body { padding: 0 1.25rem 1.25rem; border-top: 1px solid rgba(255,255,255,.07); }
    .promo-booknote { margin: 1rem 0 1.1rem; padding: 1rem 1.1rem; border-radius: 22px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); color: #d5d5d5; line-height: 1.8; }
    .promo-booknote-soft { background: rgba(242,201,76,.05); border-color: rgba(242,201,76,.12); }
    .promo-note-badge { display: inline-flex; align-items: center; gap: .4rem; padding: .32rem .7rem; border-radius: 999px; background: rgba(0,255,224,.08); border: 1px solid rgba(0,255,224,.15); color: var(--valtara-cian-brillante); font-size: .74rem; letter-spacing: .16em; text-transform: uppercase; margin-bottom: .7rem; }
    .promo-aroma-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: .9rem; }
    .promo-aroma-card { padding: 1rem; border-radius: 24px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 16px 34px rgba(0,0,0,.12); display: grid; gap: .75rem; }
    .promo-aroma-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
    .promo-aroma-head strong { color: var(--valtara-blanco); font-size: 1.02rem; }
    .promo-aroma-head span { color: var(--valtara-cian-brillante); font-size: .84rem; text-align: right; }
    .promo-aroma-text { margin: 0; color: var(--valtara-gris-texto); line-height: 1.75; }
    .promo-actions-row { display: grid; grid-template-columns: 1fr; gap: .6rem; margin-top: .2rem; }
    .promo-wa-btn { display: inline-flex; align-items: center; justify-content: center; gap: .6rem; padding: .9rem 1rem; border-radius: 999px; text-decoration: none; background: linear-gradient(135deg, #22c55e, #00b36a); color: white; font-weight: 800; border: 1px solid rgba(34,197,94,.15); box-shadow: 0 12px 26px rgba(34,197,94,.16); transition: transform .18s ease, filter .18s ease; }
    .promo-wa-btn:hover { transform: translateY(-2px); filter: brightness(1.04); }
    .promo-wa-btn.alt { background: rgba(255,255,255,.05); color: white; border-color: rgba(255,255,255,.08); }
    .promo-wa-btn.gold { background: linear-gradient(135deg, #f2c94c, #d9a93a); color: #1a1300; border-color: rgba(242,201,76,.2); }
    .promo-back-link { display: inline-flex; align-items: center; gap: .4rem; margin: .4rem 0 0; color: var(--valtara-oro); text-decoration: none; font-weight: 800; }
    .promo-back-link:hover { text-decoration: underline; }
    @media (max-width: 720px) { .vt-promo-hero, .promo-summary-card, .promo-chapter-body { padding-left: .9rem; padding-right: .9rem; } .promo-summary-card { grid-template-columns: 1fr; } .promo-visual { width: 92px; height: 92px; } .promo-summary-card::after { position: static; margin-bottom: .25rem; justify-self: start; } }
  </style>

  <section class="vt-promo-hero">
    <div class="vt-promo-kicker"><i class="fa-solid fa-book-open fa-fade"></i> Promociones inteligentes</div>
    <h2>Elige terapia, aroma y cortesía en un solo recorrido</h2>
    <p>
      Una experiencia tipo libro para que cada paciente avance paso a paso:
      primero la terapia, después la aromaterapia y al final la promoción adecuada.
      Todo con enlaces directos a WhatsApp, precios oficiales y un diseño estable en móvil.
    </p>
  </section>

  <div class="vt-promo-board">
    <div class="vt-board-chip"><div class="chip-icon"><i class="fa-solid fa-gift"></i></div><strong>Cortesía $169</strong>Lunes y martes, primeras 10 sesiones después de la 1 PM.</div>
    <div class="vt-board-chip"><div class="chip-icon"><i class="fa-solid fa-sun"></i></div><strong>20% matutino</strong>Jueves a domingo antes de las 2 PM.</div>
    <div class="vt-board-chip"><div class="chip-icon"><i class="fa-solid fa-mug-hot"></i></div><strong>Té nocturno</strong>Algunas experiencias incluyen frutos rojos después de las 7 PM.</div>
    <div class="vt-board-chip"><div class="chip-icon"><i class="fa-solid fa-map-location-dot"></i></div><strong>Ubicaciones</strong>Reforma 195 y próxima apertura cerca de Metro Eugenia.</div>
  </div>

  <div class="vt-book">
    ${therapies.map(chapter).join('')}
  </div>
</section>
`;
})();

window.ValtaraModulos.inicio_promociones = VT_PROMO;
