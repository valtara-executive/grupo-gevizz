window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraPromoBook = window.ValtaraPromoBook || {
  state: {
    therapyId: 'relajante50',
    aromaName: 'Lavanda',
    promoId: 'off169'
  },

  therapies: [
    {
      id: 'relajante50',
      name: 'Masaje Relajante Neuro Adaptativo',
      duration: '50 Minutos',
      price: 699,
      icon: 'fa-spa',
      color: '#00ffe0',
      desc: 'Relajación profunda para disminuir ansiedad, estrés físico y agotamiento emocional. Movimientos fluidos, ritmos lentos y una sensación de descanso real para el sistema nervioso.'
    },
    {
      id: 'relajante90',
      name: 'Masaje Relajante Neuro Adaptativo',
      duration: '90 Minutos',
      price: 899,
      icon: 'fa-moon',
      color: '#6ee7ff',
      desc: 'Versión extendida para quienes necesitan más tiempo de contención, silencio corporal y restauración profunda. Ideal para burnout y sobrecarga mental.'
    },
    {
      id: 'deportivo',
      name: 'Masaje Deportivo & Descompresión',
      duration: '50 Minutos',
      price: 729,
      icon: 'fa-dumbbell',
      color: '#ff5555',
      desc: 'Liberación muscular profunda para contracturas, sobrecarga física y rigidez acumulada por entrenamiento, trabajo repetitivo o tensión sostenida.'
    },
    {
      id: 'tailandes',
      name: 'Masaje Tailandés · Yoga Pasivo',
      duration: '50 Minutos',
      price: 729,
      icon: 'fa-person-praying',
      color: '#4cc9f0',
      desc: 'Estiramientos asistidos y presión estratégica para recuperar movilidad, aflojar cadenas musculares y disminuir sensación de cuerpo pesado.'
    },
    {
      id: 'ayurveda',
      name: 'Ayurveda & Aromaterapia',
      duration: '50 Minutos',
      price: 829,
      icon: 'fa-leaf',
      color: '#F2C94C',
      desc: 'Aceites tibios, aromas botánicos y maniobras calmantes para ansiedad, fatiga emocional y necesidad de reconectar con el cuerpo.'
    },
    {
      id: 'holistico',
      name: 'Masaje Holístico Integrativo',
      duration: '50 Minutos',
      price: 829,
      icon: 'fa-yin-yang',
      color: '#FFD700',
      desc: 'Experiencia enfocada en equilibrio físico y emocional, con presión media y una intención profunda de armonizar cuerpo, respiración y mente.'
    },
    {
      id: 'lomi',
      name: 'Ritual Lomi Lomi Supremo',
      duration: 'Sesión Premium',
      price: 999,
      icon: 'fa-water',
      color: '#ffaa00',
      desc: 'Ritual inmersivo inspirado en el oleaje hawaiano. Movimientos continuos, fluidez sensorial y una sensación de desconexión total del estrés.'
    },
    {
      id: 'esferas',
      name: 'Esferas Chinas & Velas Aromáticas',
      duration: '60 Minutos',
      price: 819,
      icon: 'fa-circle-notch',
      color: '#ffffff',
      desc: 'Vibración sonora, luz cálida y una atmósfera de calma diseñada para regular el ritmo interno y relajar profundamente el sistema nervioso.'
    },
    {
      id: 'facial',
      name: 'Terapia para Parálisis Facial',
      duration: '45 Minutos',
      price: 529,
      icon: 'fa-face-smile',
      color: '#4361EE',
      desc: 'Estimulación neuromuscular enfocada en recuperación funcional, relajación de compensaciones y apoyo al retorno de movilidad facial.'
    },
    {
      id: 'drenaje',
      name: 'Drenaje Linfático Manual',
      duration: '60 Minutos',
      price: 749,
      icon: 'fa-droplet',
      color: '#d6d6d6',
      desc: 'Movilización suave para sensación de ligereza, apoyo al retorno de líquidos y una experiencia corporal delicada y respetuosa.'
    },
    {
      id: 'reductivo',
      name: 'Reductivo & Maderoterapia',
      duration: 'Sesión / Paquete',
      price: 799,
      icon: 'fa-child-reaching',
      color: '#b27fff',
      desc: 'Protocolos corporales de estética manual con geles especializados y maderoterapia para acompañar objetivos de bienestar corporal.'
    },
    {
      id: 'shiatsu',
      name: 'Shiatsu en Cama · Complemento',
      duration: '20 Minutos',
      price: 199,
      icon: 'fa-chair',
      color: '#ffffff',
      desc: 'Complemento ideal para acompañantes o como extensión en terapias elegibles. Presión estratégica en cuello, hombros y espalda alta.'
    }
  ],

  aromas: [
    { name: 'Lavanda', extra: 0, note: 'Relajación profunda' },
    { name: 'Vainilla', extra: 0, note: 'Calidez y suavidad' },
    { name: 'Menta', extra: 0, note: 'Sensación fresca' },
    { name: 'Eucalipto', extra: 0, note: 'Respiración despejada' },
    { name: 'Rosas Blancas', extra: 0, note: 'Experiencia premium' },
    { name: 'Frutos Rojos', extra: 0, note: 'Dulce y envolvente' },
    { name: 'Cítricos Suaves', extra: 0, note: 'Energía ligera' },
    { name: 'Jazmín', extra: 0, note: 'Florece la calma' },
    { name: 'Naranja Dulce', extra: 0, note: 'Alegría y luminosidad' },
    { name: 'Sándalo', extra: 0, note: 'Tierra y profundidad' },
    { name: 'Té Blanco', extra: 0, note: 'Delicadeza serena' },
    { name: 'Romero', extra: 0, note: 'Claridad mental' },
    { name: 'Cacao', extra: 0, note: 'Calidez envolvente' },
    { name: 'Coco', extra: 0, note: 'Ligereza tropical' },
    { name: 'Flor de Azahar', extra: 0, note: 'Dulzura tranquila' },
    { name: 'Neutra', extra: 0, note: 'Sin aroma añadido' }
  ],

  promos: [
    {
      id: 'off169',
      name: '$169 de cortesía',
      detail: 'Lunes y martes, primeras 10 sesiones después de la 1 PM.',
      value: 169,
      type: 'fixed'
    },
    {
      id: 'off20',
      name: '20% OFF matutino',
      detail: 'Jueves a domingo antes de las 2 PM.',
      value: 20,
      type: 'percent'
    }
  ],

  money(value) {
    return '$' + Number(value).toLocaleString('es-MX') + ' MXN';
  },

  getTherapy(id) {
    return this.therapies.find((t) => t.id === id) || this.therapies[0];
  },

  getAroma(name) {
    return this.aromas.find((a) => a.name === name) || this.aromas[0];
  },

  getPromo(id) {
    return this.promos.find((p) => p.id === id) || null;
  },

  calc() {
    const therapy = this.getTherapy(this.state.therapyId);
    const aroma = this.getAroma(this.state.aromaName);
    const promo = this.getPromo(this.state.promoId);

    const subtotal = therapy.price;
    let discount = 0;

    if (promo) {
      discount = promo.type === 'fixed'
        ? promo.value
        : Math.round(subtotal * (promo.value / 100));
    }

    const total = Math.max(subtotal - discount, 0);
    return { therapy, aroma, promo, subtotal, discount, total };
  },

  buildMessage() {
    const r = this.calc();
    return [
      'Hola, quiero agendar una experiencia Valtara.',
      '',
      'Terapia: ' + r.therapy.name,
      'Duración: ' + r.therapy.duration,
      'Aromaterapia: ' + r.aroma.name,
      'Promoción: ' + (r.promo ? r.promo.name : 'Sin promoción'),
      '',
      'Subtotal: ' + this.money(r.subtotal),
      'Descuento: ' + this.money(r.discount),
      'Total estimado: ' + this.money(r.total),
      '',
      'Sucursal principal: Reforma 195',
      'Próxima apertura: cerca de Metro Eugenia.',
      'Contacto oficial: 33 4857 2070'
    ].join('\n');
  },

  waHref() {
    return 'https://wa.me/5213348572070?text=' + encodeURIComponent(this.buildMessage());
  },

  go(step) {
    document.querySelectorAll('.vtp-step').forEach((el) => {
      el.hidden = true;
    });

    const current = document.getElementById('vtp-step-' + step);
    if (current) {
      current.hidden = false;
      current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  selectTherapy(id) {
    this.state.therapyId = id;
    this.state.aromaName = 'Lavanda';
    this.state.promoId = 'off169';
    this.renderSelection();
    this.renderSummary();
    this.go(2);
  },

  selectAroma(name) {
    this.state.aromaName = name;
    this.renderSelection();
    this.renderSummary();
    this.go(3);
  },

  selectPromo(id) {
    this.state.promoId = id;
    this.renderSummary();
    this.go(4);
  },

  renderSelection() {
    const r = this.calc();
    const therapyBox = document.getElementById('vtp-selected-therapy');
    const aromaBox = document.getElementById('vtp-selected-aroma');

    if (therapyBox) {
      therapyBox.innerHTML = `
        <div class="vtp-selected-chip">
          <strong>${r.therapy.name}</strong>
          <span>${r.therapy.duration}</span>
          <span>${this.money(r.therapy.price)}</span>
        </div>
        <p>${r.therapy.desc}</p>
      `;
    }

    if (aromaBox) {
      aromaBox.innerHTML = `
        <div class="vtp-selected-chip">
          <strong>${r.aroma.name}</strong>
          <span>${r.aroma.note}</span>
          <span style="color:var(--valtara-cian-brillante)">Incluida sin costo extra</span>
        </div>
      `;
    }
  },

  renderSummary() {
    const r = this.calc();
    const summary = document.getElementById('vtp-summary');
    if (!summary) return;

    summary.innerHTML = `
      <div class="vtp-line"><span>Terapia</span><strong>${r.therapy.name}</strong></div>
      <div class="vtp-line"><span>Duración</span><strong>${r.therapy.duration}</strong></div>
      <div class="vtp-line"><span>Aromaterapia</span><strong>${r.aroma.name} · <em style="font-weight:400;color:var(--valtara-cian-brillante)">Incluida</em></strong></div>
      <div class="vtp-line"><span>Promoción</span><strong>${r.promo ? r.promo.name : 'Sin promoción'}</strong></div>
      <div class="vtp-line"><span>Subtotal</span><strong>${this.money(r.subtotal)}</strong></div>
      <div class="vtp-line"><span>Descuento</span><strong>− ${Number(r.discount).toLocaleString('es-MX')} MXN</strong></div>
      <div class="vtp-total">${this.money(r.total)}</div>
    `;

    const link = document.getElementById('vtp-whatsapp');
    if (link) link.href = this.waHref();
  }
};

window.ValtaraModulos.inicio_promociones = (() => {
  const book = window.ValtaraPromoBook;

  const therapies_html = book.therapies.map((t) => `
    <button class="vtp-choice" type="button"
            style="--accent:${t.color}"
            onclick="window.ValtaraPromoBook.selectTherapy('${t.id}')">
      <div class="vtp-choice-visual">
        <i class="fa-solid ${t.icon}"></i>
      </div>
      <strong>${t.name}</strong>
      <span>${t.duration}</span>
      <span style="color:var(--valtara-oro);font-weight:800">${book.money(t.price)}</span>
      <span>${t.desc}</span>
    </button>
  `).join('');

  const aromas_html = book.aromas.map((a) => `
    <button class="vtp-choice" type="button"
            onclick="window.ValtaraPromoBook.selectAroma('${a.name}')">
      <div class="vtp-choice-visual">
        <i class="fa-solid fa-wind"></i>
      </div>
      <strong>${a.name}</strong>
      <span>${a.note}</span>
      <span style="color:var(--valtara-cian-brillante);font-size:.85rem">Sin costo adicional</span>
    </button>
  `).join('');

  const promos_html = book.promos.map((p) => `
    <button class="vtp-choice" type="button"
            onclick="window.ValtaraPromoBook.selectPromo('${p.id}')">
      <div class="vtp-choice-visual">
        <i class="fa-solid fa-tag"></i>
      </div>
      <strong>${p.name}</strong>
      <span>${p.detail}</span>
    </button>
  `).join('');

  return `
<section class="vtp-shell" id="inicio_promociones_top">
  <style>
    .vtp-shell {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem 5rem;
      box-sizing: border-box;
    }
    .vtp-hero {
      padding: 2rem;
      border-radius: 32px;
      background:
        radial-gradient(circle at top right,  rgba(242,201,76,.12), transparent 30%),
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
      max-width: 880px;
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
    .vtp-step {
      border-radius: 30px;
      border: 1px solid rgba(255,255,255,.08);
      background: rgba(255,255,255,.03);
      box-shadow: 0 18px 42px rgba(0,0,0,.22);
      overflow: hidden;
      animation: vtpFade .35s ease;
    }
    @keyframes vtpFade {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .vtp-step-head {
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 1rem;
      align-items: center;
      padding: 1.25rem;
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
    .vtp-visual::after {
      content: '';
      position: absolute;
      width: 56%;
      height: 56%;
      border-radius: 50%;
      background: rgba(255,255,255,.09);
      backdrop-filter: blur(10px);
    }
    .vtp-visual i {
      position: relative;
      z-index: 2;
      font-size: 2.5rem;
      color: var(--accent);
      animation: vtpFloat 5.5s ease-in-out infinite;
      filter: drop-shadow(0 0 16px rgba(255,255,255,.12));
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
    .vtp-step-head h3 {
      margin: .2rem 0 .6rem;
      color: var(--valtara-blanco);
      font-size: clamp(1.2rem, 2.6vw, 1.65rem);
    }
    .vtp-desc { margin: 0; color: var(--valtara-gris-texto); line-height: 1.8; }
    .vtp-step-body {
      padding: 0 1.25rem 1.25rem;
      border-top: 1px solid rgba(255,255,255,.07);
    }
    .vtp-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: .9rem;
      padding-top: 1rem;
    }
    .vtp-choice {
      padding: 1rem;
      border-radius: 24px;
      background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.08);
      box-shadow: 0 16px 34px rgba(0,0,0,.12);
      display: grid;
      gap: .75rem;
      cursor: pointer;
      text-align: left;
      width: 100%;
      color: inherit;
      transition: transform .18s ease, border-color .18s ease, filter .18s ease;
    }
    .vtp-choice:hover {
      transform: translateY(-2px);
      filter: brightness(1.03);
      border-color: rgba(242,201,76,.20);
    }
    .vtp-choice-visual {
      width: 54px;
      height: 54px;
      border-radius: 18px;
      display: inline-grid;
      place-items: center;
      background: rgba(255,255,255,.05);
      color: var(--accent, var(--valtara-oro));
      border: 1px solid rgba(255,255,255,.08);
      font-size: 1.2rem;
    }
    .vtp-choice strong { color: var(--valtara-blanco); font-size: 1.02rem; }
    .vtp-choice span { color: var(--valtara-gris-texto); line-height: 1.7; font-size: .95rem; }
    .vtp-note {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 20px;
      background: rgba(242,201,76,.05);
      border: 1px solid rgba(242,201,76,.14);
      color: #cfcfcf;
      line-height: 1.9;
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
    .vtp-selected-chip {
      display: flex;
      gap: .55rem;
      flex-wrap: wrap;
      margin-bottom: .7rem;
    }
    .vtp-selected-chip strong { color: var(--valtara-blanco); }
    .vtp-selected-chip span { color: var(--valtara-cian-brillante); }
    .vtp-line {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      padding: .8rem 0;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .vtp-line:last-child { border-bottom: none; }
    .vtp-total {
      margin-top: 1.2rem;
      font-size: 1.8rem;
      font-weight: 900;
      color: var(--valtara-oro);
      text-align: right;
    }
    .vtp-actions {
      display: flex;
      flex-wrap: wrap;
      gap: .7rem;
      margin-top: 1rem;
    }
    .vtp-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: .55rem;
      padding: .9rem 1.05rem;
      border-radius: 999px;
      border: 0;
      text-decoration: none;
      font-weight: 800;
      cursor: pointer;
    }
    .vtp-btn.back { background: rgba(255,255,255,.06); color: white; }
    .vtp-btn.primary { background: linear-gradient(135deg,#22c55e,#00b36a); color: white; }
    .vtp-avail {
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
    @media (max-width: 720px) {
      .vtp-hero, .vtp-step-head, .vtp-step-body { padding-left: .9rem; padding-right: .9rem; }
      .vtp-step-head { grid-template-columns: 1fr; }
      .vtp-visual { width: 92px; height: 92px; }
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
    <div class="vtp-chip"><strong><i class="fa-solid fa-mug-hot"></i> Té nocturno</strong>Algunas experiencias incluyen frutos rojos después de las 7 PM.</div>
    <div class="vtp-chip"><strong><i class="fa-solid fa-map-location-dot"></i> Ubicaciones</strong>Reforma 195 · Próxima apertura cerca de Metro Eugenia.</div>
    <div class="vtp-chip"><strong><i class="fa-brands fa-whatsapp"></i> Contacto oficial</strong>33 4857 2070</div>
  </div>

  <div class="vtp-book">

    <section class="vtp-step" id="vtp-step-1">
      <div class="vtp-step-head">
        <div class="vtp-visual" style="--accent:#f2c94c">
          <i class="fa-solid fa-spa"></i>
        </div>
        <div>
          <p class="vtp-step-label">Paso 1 · Elige tu terapia</p>
          <h3>Selecciona la experiencia que mejor te acompañe</h3>
          <p class="vtp-desc">Las terapias están organizadas con precios oficiales y descripciones amplias para ayudarte a elegir con claridad.</p>
        </div>
      </div>
      <div class="vtp-step-body">
        <div class="vtp-grid">
          ${therapies_html}
        </div>
        <div class="vtp-note">
          <strong>Nota clínica:</strong> si una molestia es intensa, reciente o se acompaña de fiebre, inflamación importante o lesión, conviene primero una valoración profesional.
        </div>
      </div>
    </section>

    <section class="vtp-step" id="vtp-step-2" hidden>
      <div class="vtp-step-head">
        <div class="vtp-visual" style="--accent:#00ffe0">
          <i class="fa-solid fa-wind"></i>
        </div>
        <div>
          <p class="vtp-step-label">Paso 2 · Aromaterapia</p>
          <h3>Elige el aroma que acompañará tu sesión</h3>
          <p class="vtp-desc">Todas las aromaterapias están incluidas sin costo adicional. Es una personalización sensorial de tu experiencia.</p>
        </div>
      </div>
      <div class="vtp-step-body">
        <div id="vtp-selected-therapy" class="vtp-summary-box"></div>
        <p class="vtp-avail"><i class="fa-solid fa-circle-info"></i> Sujeto a disponibilidad</p>
        <div class="vtp-grid">
          ${aromas_html}
        </div>
        <div class="vtp-actions">
          <button class="vtp-btn back" type="button" onclick="window.ValtaraPromoBook.go(1)">
            <i class="fa-solid fa-arrow-left"></i> Regresar
          </button>
        </div>
      </div>
    </section>

    <section class="vtp-step" id="vtp-step-3" hidden>
      <div class="vtp-step-head">
        <div class="vtp-visual" style="--accent:#b27fff">
          <i class="fa-solid fa-gift"></i>
        </div>
        <div>
          <p class="vtp-step-label">Paso 3 · Promoción</p>
          <h3>Selecciona la cortesía vigente</h3>
          <p class="vtp-desc">Las promociones no son acumulables entre sí. Puedes elegir la cortesía de inicio de semana o el beneficio matutino.</p>
        </div>
      </div>
      <div class="vtp-step-body">
        <div id="vtp-selected-aroma" class="vtp-summary-box"></div>
        <div class="vtp-grid">
          ${promos_html}
        </div>
        <div class="vtp-note">
          <strong>Términos:</strong> la cortesía de $169 MXN aplica lunes y martes, primeras 10 sesiones después de la 1 PM. El 20% matutino aplica jueves a domingo antes de las 2 PM. No son acumulables. Después de las 7 PM algunas experiencias incluyen té de frutos rojos. Aromaterapias sujetas a disponibilidad.
        </div>
        <div class="vtp-actions">
          <button class="vtp-btn back" type="button" onclick="window.ValtaraPromoBook.go(2)">
            <i class="fa-solid fa-arrow-left"></i> Regresar
          </button>
        </div>
      </div>
    </section>

    <section class="vtp-step" id="vtp-step-4" hidden>
      <div class="vtp-step-head">
        <div class="vtp-visual" style="--accent:#f2c94c">
          <i class="fa-solid fa-clipboard-check"></i>
        </div>
        <div>
          <p class="vtp-step-label">Paso 4 · Resumen</p>
          <h3>Confirma tu experiencia y continúa por WhatsApp</h3>
          <p class="vtp-desc">Aquí verás el subtotal, el descuento y el total estimado calculado con la terapia, el aroma y la promoción elegida. El contacto oficial es <strong>33 4857 2070</strong>.</p>
        </div>
      </div>
      <div class="vtp-step-body">
        <div id="vtp-summary" class="vtp-summary-box"></div>
        <div class="vtp-actions">
          <a id="vtp-whatsapp" class="vtp-btn primary" target="_blank" rel="noopener noreferrer" href="#">
            <i class="fa-brands fa-whatsapp"></i> Continuar por WhatsApp · 33 4857 2070
          </a>
          <button class="vtp-btn back" type="button" onclick="window.ValtaraPromoBook.go(3)">
            <i class="fa-solid fa-arrow-left"></i> Regresar
          </button>
        </div>
      </div>
    </section>

  </div>
</section>
`;
})();
