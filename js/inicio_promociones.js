window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraPromociones = window.ValtaraPromociones || {
  state: {
    therapyId: 'relajante50',
    aromaName: 'Lavanda',
    promoId: 'off169'
  },

  mainAddress: 'Reforma 195',
  nextOpening: 'cerca de Metro Eugenia',
  contactDisplay: '33 4857 2070',
  whatsappNumber: '5213348572070',

  therapies: [
    {
      id: 'relajante50',
      name: 'Masaje Relajante Neuro Adaptativo',
      duration: '50 Minutos',
      price: 699,
      icon: 'fa-spa',
      color: '#00ffe0',
      desc: 'Relajación profunda para disminuir ansiedad, estrés físico y agotamiento emocional. Movimientos fluidos, ritmos lentos y una sensación de descanso real para el sistema nervioso. Ideal para bajar revoluciones internas sin perder la sensación de cuidado clínico y premium.'
    },
    {
      id: 'relajante90',
      name: 'Masaje Relajante Neuro Adaptativo',
      duration: '90 Minutos',
      price: 899,
      icon: 'fa-moon',
      color: '#6ee7ff',
      desc: 'Versión extendida para quienes necesitan más tiempo de contención, silencio corporal y restauración profunda. Muy útil cuando el cansancio viene acompañado de sobrecarga mental, insomnio o una sensación de cuerpo acelerado.'
    },
    {
      id: 'deportivo',
      name: 'Masaje Deportivo & Descompresión',
      duration: '50 Minutos',
      price: 729,
      icon: 'fa-dumbbell',
      color: '#ff5555',
      desc: 'Liberación muscular profunda para contracturas, sobrecarga física y rigidez acumulada por entrenamiento, trabajo repetitivo o tensión sostenida. Busca devolver movilidad, descargar tejido y recuperar sensación de potencia corporal.'
    },
    {
      id: 'tailandes',
      name: 'Masaje Tailandés · Yoga Pasivo',
      duration: '50 Minutos',
      price: 729,
      icon: 'fa-person-praying',
      color: '#4cc9f0',
      desc: 'Estiramientos asistidos y presión estratégica para recuperar movilidad, aflojar cadenas musculares y disminuir sensación de cuerpo pesado. Muy útil cuando el cuerpo se siente cerrado, rígido o con poca amplitud de movimiento.'
    },
    {
      id: 'ayurveda',
      name: 'Ayurveda & Aromaterapia',
      duration: '50 Minutos',
      price: 829,
      icon: 'fa-leaf',
      color: '#F2C94C',
      desc: 'Aceites tibios, aromas botánicos y maniobras calmantes para ansiedad, fatiga emocional y necesidad de reconectar con el cuerpo. La sesión está diseñada para inducir serenidad, suavidad y una sensación envolvente de bienestar.'
    },
    {
      id: 'holistico',
      name: 'Masaje Holístico Integrativo',
      duration: '50 Minutos',
      price: 829,
      icon: 'fa-yin-yang',
      color: '#FFD700',
      desc: 'Experiencia enfocada en equilibrio físico y emocional, con presión media y una intención profunda de armonizar cuerpo, respiración y mente. Puede sentirse especialmente valioso cuando la tensión ya no es solo muscular, sino también emocional.'
    },
    {
      id: 'lomi',
      name: 'Ritual Lomi Lomi Supremo',
      duration: 'Sesión Premium',
      price: 999,
      icon: 'fa-water',
      color: '#ffaa00',
      desc: 'Ritual inmersivo inspirado en el oleaje hawaiano. Movimientos continuos, fluidez sensorial y una sensación de desconexión total del estrés. Es una experiencia premium para quienes buscan un descanso más ceremonial y profundo.'
    },
    {
      id: 'esferas',
      name: 'Esferas Chinas & Velas Aromáticas',
      duration: '60 Minutos',
      price: 819,
      icon: 'fa-circle-notch',
      color: '#ffffff',
      desc: 'Vibración sonora, luz cálida y una atmósfera de calma diseñada para regular el ritmo interno y relajar profundamente el sistema nervioso. Ideal para sensibilidad sensorial, agotamiento mental o deseo de una experiencia más contemplativa.'
    },
    {
      id: 'facial',
      name: 'Terapia para Parálisis Facial',
      duration: '45 Minutos',
      price: 529,
      icon: 'fa-face-smile',
      color: '#4361EE',
      desc: 'Estimulación neuromuscular enfocada en recuperación funcional, relajación de compensaciones y apoyo al retorno de movilidad facial. La intención es acompañar la recuperación con precisión, delicadeza y respeto al ritmo del paciente.'
    },
    {
      id: 'drenaje',
      name: 'Drenaje Linfático Manual',
      duration: '60 Minutos',
      price: 749,
      icon: 'fa-droplet',
      color: '#d6d6d6',
      desc: 'Movilización suave para sensación de ligereza, apoyo al retorno de líquidos y una experiencia corporal delicada y respetuosa. Es una propuesta ideal cuando el cuerpo pide menos fuerza y más fluidez.'
    },
    {
      id: 'reductivo',
      name: 'Reductivo & Maderoterapia',
      duration: 'Sesión / Paquete',
      price: 799,
      icon: 'fa-child-reaching',
      color: '#b27fff',
      desc: 'Protocolos corporales de estética manual con geles especializados y maderoterapia para acompañar objetivos de bienestar corporal. Busca un trabajo localizado, firme y orientado a resultados visibles con una estética premium.'
    },
    {
      id: 'shiatsu',
      name: 'Shiatsu en Cama · Complemento',
      duration: '20 Minutos',
      price: 199,
      icon: 'fa-chair',
      color: '#ffffff',
      desc: 'Complemento ideal para acompañantes o como extensión en terapias elegibles. Presión estratégica en cuello, hombros y espalda alta para sumar un cierre relajante, breve y muy útil dentro de una sesión principal.'
    }
  ],

  aromas: [
    { name: 'Lavanda', note: 'Relajación profunda' },
    { name: 'Vainilla', note: 'Calidez y suavidad' },
    { name: 'Menta', note: 'Sensación fresca' },
    { name: 'Eucalipto', note: 'Respiración despejada' },
    { name: 'Rosas Blancas', note: 'Experiencia premium' },
    { name: 'Frutos Rojos', note: 'Dulce y envolvente' },
    { name: 'Cítricos Suaves', note: 'Energía ligera' },
    { name: 'Jazmín', note: 'Florece la calma' },
    { name: 'Naranja Dulce', note: 'Alegría y luminosidad' },
    { name: 'Sándalo', note: 'Tierra y profundidad' },
    { name: 'Té Blanco', note: 'Delicadeza serena' },
    { name: 'Romero', note: 'Claridad mental' },
    { name: 'Cacao', note: 'Calidez envolvente' },
    { name: 'Coco', note: 'Ligereza tropical' },
    { name: 'Flor de Azahar', note: 'Dulzura tranquila' },
    { name: 'Neutra', note: 'Sin aroma añadido' }
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
      'Aromaterapia: ' + r.aroma.name + ' (incluida sin costo extra)',
      'Promoción: ' + (r.promo ? r.promo.name : 'Sin promoción'),
      '',
      'Subtotal: ' + this.money(r.subtotal),
      'Descuento: ' + this.money(r.discount),
      'Total estimado: ' + this.money(r.total),
      '',
      'Sucursal principal: ' + this.mainAddress,
      'Próxima apertura: ' + this.nextOpening + '.',
      'Contacto oficial: ' + this.contactDisplay
    ].join('\n');
  },

  waHref() {
    return 'https://wa.me/' + this.whatsappNumber + '?text=' + encodeURIComponent(this.buildMessage());
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
  },

  go(step) {
    const steps = ['vtp-step-1', 'vtp-step-2', 'vtp-step-3', 'vtp-step-4'];
    steps.forEach((id, index) => {
      const el = document.getElementById(id);
      if (el) el.hidden = index + 1 !== step;
    });

    const current = document.getElementById('vtp-step-' + step);
    if (current) {
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
  }
};

window.ValtaraModulos.inicio_promociones = (() => {
  const m = window.ValtaraPromociones;

  const therapiesHtml = m.therapies.map((t) => `
    <button class="vtp-choice" type="button" style="--accent:${t.color}" onclick="window.ValtaraPromociones.selectTherapy('${t.id}')">
      <div class="vtp-choice-visual">
        <i class="fa-solid ${t.icon}"></i>
      </div>
      <strong>${t.name}</strong>
      <span>${t.duration}</span>
      <span style="color:var(--valtara-oro);font-weight:800">${m.money(t.price)}</span>
      <span>${t.desc}</span>
      <span style="color:var(--valtara-cian-brillante);font-size:.8rem;letter-spacing:.12em;text-transform:uppercase">Elegir esta terapia</span>
    </button>
  `).join('');

  const aromasHtml = m.aromas.map((a) => `
    <button class="vtp-choice" type="button" onclick="window.ValtaraPromociones.selectAroma('${a.name}')">
      <div class="vtp-choice-visual">
        <i class="fa-solid fa-wind"></i>
      </div>
      <strong>${a.name}</strong>
      <span>${a.note}</span>
      <span style="color:var(--valtara-cian-brillante);font-size:.85rem">Incluida sin costo extra</span>
      <span style="color:var(--valtara-gris-texto);font-size:.78rem;letter-spacing:.12em;text-transform:uppercase">Sujeto a disponibilidad</span>
    </button>
  `).join('');

  const promosHtml = m.promos.map((p) => `
    <button class="vtp-choice" type="button" onclick="window.ValtaraPromociones.selectPromo('${p.id}')">
      <div class="vtp-choice-visual">
        <i class="fa-solid fa-tag"></i>
      </div>
      <strong>${p.name}</strong>
      <span>${p.detail}</span>
      <span style="color:var(--valtara-oro);font-size:.85rem;letter-spacing:.12em;text-transform:uppercase">Aplicar esta cortesía</span>
    </button>
  `).join('');

  const initial = m.calc();
  const initialTherapy = m.getTherapy(m.state.therapyId);
  const initialAroma = m.getAroma(m.state.aromaName);

  return `
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
      display: inline-flex;
      align-items: center;
      gap: .45rem;
      padding: .9rem 1rem;
      border-radius: 22px;
      background: rgba(255,255,255,.035);
      border: 1px solid rgba(255,255,255,.08);
      color: #ddd;
      line-height: 1.65;
      box-shadow: 0 16px 34px rgba(0,0,0,.15);
    }

    .vtp-chip i { color: var(--valtara-oro); }
    .vtp-chip strong { color: var(--valtara-blanco); }

    .vtp-book {
      display: grid;
      gap: 1rem;
    }

    .vtp-zone,
    .vtp-symptom {
      border-radius: 30px;
      border: 1px solid rgba(255,255,255,.08);
      background: rgba(255,255,255,.03);
      box-shadow: 0 18px 42px rgba(0,0,0,.22);
      overflow: hidden;
    }

    .vtp-zone[open],
    .vtp-symptom[open] {
      border-color: rgba(242,201,76,.20);
    }

    .vtp-zone-summary,
    .vtp-symptom-summary {
      list-style: none;
      cursor: pointer;
      display: grid;
      grid-template-columns: 110px 1fr;
      gap: 1rem;
      align-items: center;
      padding: 1.25rem;
    }

    .vtp-zone-summary::-webkit-details-marker,
    .vtp-symptom-summary::-webkit-details-marker {
      display: none;
    }

    .vtp-zone-icon,
    .vtp-symptom-badge {
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

    .vtp-zone-icon::before,
    .vtp-symptom-badge::before {
      content: '';
      position: absolute;
      inset: -35%;
      background: conic-gradient(from 0deg, var(--accent), transparent, rgba(255,255,255,.05), transparent, var(--accent));
      animation: vtpSpin 10s linear infinite;
      opacity: .95;
    }

    .vtp-zone-icon::after,
    .vtp-symptom-badge::after {
      content: '';
      position: absolute;
      width: 56%;
      height: 56%;
      border-radius: 50%;
      background: rgba(255,255,255,.09);
      backdrop-filter: blur(10px);
    }

    .vtp-zone-icon i,
    .vtp-symptom-badge i {
      position: relative;
      z-index: 2;
      font-size: 2.4rem;
      color: var(--accent, var(--valtara-oro));
      animation: vtpFloat 5.5s ease-in-out infinite;
      filter: drop-shadow(0 0 16px rgba(255,255,255,.12));
    }

    @keyframes vtpSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes vtpFloat {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .vtp-step-label {
      margin: 0 0 .35rem;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: var(--valtara-cian-brillante);
      font-size: .72rem;
    }

    .vtp-zone-copy h3,
    .vtp-symptom-copy h4 {
      margin: .2rem 0 .6rem;
      color: var(--valtara-blanco);
      font-size: clamp(1.2rem, 2.6vw, 1.65rem);
    }

    .vtp-zone-copy p,
    .vtp-symptom-copy p {
      margin: 0;
      color: var(--valtara-gris-texto);
      line-height: 1.8;
    }

    .vtp-zone-body,
    .vtp-symptom-body {
      padding: 0 1.25rem 1.25rem;
      border-top: 1px solid rgba(255,255,255,.07);
    }

    .vtp-zone-chipline {
      display: flex;
      flex-wrap: wrap;
      gap: .6rem;
      padding-top: 1rem;
    }

    .vtp-chipline-gap {
      display: inline-flex;
      align-items: center;
      gap: .6rem;
      flex-wrap: wrap;
    }

    .vtp-chip-small {
      display: inline-flex;
      align-items: center;
      gap: .4rem;
      padding: .32rem .7rem;
      border-radius: 999px;
      background: rgba(0,255,224,.08);
      border: 1px solid rgba(0,255,224,.15);
      color: var(--valtara-cian-brillante);
      font-size: .74rem;
      letter-spacing: .16em;
      text-transform: uppercase;
    }

    .vtp-symptom-grid {
      display: grid;
      gap: .9rem;
      margin-top: 1rem;
    }

    .vtp-info-box,
    .vtp-footer-note,
    .vtp-note,
    .vtp-summary-box {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 20px;
      background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.08);
      color: #d7d7d7;
      line-height: 1.8;
    }

    .vtp-recommend-title {
      margin-top: 1rem;
    }

    .vtp-recommend-title p {
      margin: .5rem 0 0;
      color: var(--valtara-gris-texto);
      line-height: 1.7;
    }

    .vtp-chip {
      display: inline-flex;
      align-items: center;
      gap: .4rem;
      padding: .32rem .7rem;
      border-radius: 999px;
      background: rgba(0,255,224,.08);
      border: 1px solid rgba(0,255,224,.15);
      color: var(--valtara-cian-brillante);
      font-size: .74rem;
      letter-spacing: .16em;
      text-transform: uppercase;
    }

    .vtp-therapy-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: .9rem;
      margin-top: 1rem;
    }

    .vtp-therapy-card {
      padding: 1rem;
      border-radius: 24px;
      background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.08);
      box-shadow: 0 16px 34px rgba(0,0,0,.12);
      display: grid;
      gap: .7rem;
      transition: transform .18s ease, border-color .18s ease, filter .18s ease;
    }

    .vtp-therapy-card:hover {
      transform: translateY(-2px);
      filter: brightness(1.03);
      border-color: rgba(242,201,76,.20);
    }

    .vtp-therapy-top {
      display: flex;
      align-items: center;
      gap: .9rem;
    }

    .vtp-therapy-icon {
      width: 54px;
      height: 54px;
      border-radius: 18px;
      display: grid;
      place-items: center;
      background: rgba(255,255,255,.05);
      color: var(--accent, var(--valtara-oro));
      border: 1px solid rgba(255,255,255,.08);
      font-size: 1.2rem;
      flex: 0 0 auto;
    }

    .vtp-therapy-top strong {
      display: block;
      color: var(--valtara-blanco);
      font-size: 1.01rem;
      line-height: 1.45;
    }

    .vtp-therapy-top span {
      color: var(--valtara-gris-texto);
      font-size: .9rem;
    }

    .vtp-therapy-price {
      margin: 0;
      color: var(--valtara-oro);
      font-weight: 800;
    }

    .vtp-therapy-cta-desc {
      margin: 0;
      color: var(--valtara-gris-texto);
      line-height: 1.7;
      font-size: .94rem;
    }

    .vtp-wa-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: .55rem;
      padding: .9rem 1rem;
      border-radius: 999px;
      border: 0;
      text-decoration: none;
      font-weight: 800;
      cursor: pointer;
      background: linear-gradient(135deg, #22c55e, #00b36a);
      color: white;
      box-shadow: 0 12px 26px rgba(34,197,94,.16);
      transition: transform .18s ease, filter .18s ease;
    }

    .vtp-wa-btn:hover {
      transform: translateY(-2px);
      filter: brightness(1.04);
    }

    .vtp-footer-note {
      background: rgba(242,201,76,.05);
      border-color: rgba(242,201,76,.14);
    }

    .vtp-footer-note strong {
      color: var(--valtara-blanco);
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

    .vtp-total {
      margin-top: 1.2rem;
      font-size: 1.8rem;
      font-weight: 900;
      color: var(--valtara-oro);
      text-align: right;
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
      background: linear-gradient(135deg, #22c55e, #00b36a);
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
      .vtp-hero,
      .vtp-zone-summary,
      .vtp-symptom-summary,
      .vtp-zone-body,
      .vtp-symptom-body {
        padding-left: .9rem;
        padding-right: .9rem;
      }

      .vtp-zone-summary,
      .vtp-symptom-summary {
        grid-template-columns: 1fr;
      }

      .vtp-zone-icon,
      .vtp-symptom-badge {
        width: 92px;
        height: 92px;
      }
    }
  </style>

  <section class="vtp-hero">
    <div class="vtp-kicker"><i class="fa-solid fa-braille"></i> Mapa corporal interactivo</div>
    <h2>Explora tu molestia y encuentra la ruta terapéutica más clara</h2>
    <p>
      Elige la zona donde se concentra la tensión, abre el síntoma que más se parezca a lo que sientes
      y revisa las terapias sugeridas para continuar directamente por WhatsApp.
    </p>
  </section>

  <div class="vtp-board">
    <div class="vtp-chip"><i class="fa-brands fa-whatsapp"></i><strong>Contacto:</strong> ${m.contactDisplay}</div>
    <div class="vtp-chip"><i class="fa-solid fa-map-location-dot"></i><strong>Sede principal:</strong> ${m.mainAddress}</div>
    <div class="vtp-chip"><i class="fa-solid fa-location-arrow"></i><strong>Próxima apertura:</strong> ${m.nextOpening}</div>
    <div class="vtp-chip"><i class="fa-solid fa-circle-info"></i><strong>Ruta guiada:</strong> zona → molestia → terapia</div>
  </div>

  <div class="vtp-book">
    <details class="vtp-zone" open>
      <summary class="vtp-zone-summary">
        <div class="vtp-zone-icon" style="--accent:${zones[0].accent}">
          <i class="fa-solid ${zones[0].icon}"></i>
        </div>
        <div class="vtp-zone-copy">
          <p class="vtp-step-label">Paso 1 · Elige la zona</p>
          <h3>${zones[0].title}</h3>
          <p>${zones[0].intro}</p>
        </div>
      </summary>
      <div class="vtp-zone-body">
        <div class="vtp-zone-chipline">
          <span class="vtp-chip-small"><i class="fa-solid fa-map-marker-alt"></i> ${m.mainAddress}</span>
          <span class="vtp-chip-small"><i class="fa-brands fa-whatsapp"></i> ${m.contactDisplay}</span>
          <span class="vtp-chip-small"><i class="fa-solid fa-circle-info"></i> Sujeto a agenda</span>
        </div>
        <div class="vtp-symptom-grid">
          ${zones[0].symptoms.map((symptom) => `
            <details class="vtp-symptom" open>
              <summary class="vtp-symptom-summary">
                <div class="vtp-symptom-badge" style="--accent:${zones[0].accent}">
                  <i class="fa-solid fa-circle-nodes"></i>
                </div>
                <div class="vtp-symptom-copy">
                  <p class="vtp-step-label">Paso 2 · Identifica la molestia</p>
                  <h4>${symptom.title}</h4>
                  <p>${symptom.why}</p>
                </div>
              </summary>
              <div class="vtp-symptom-body">
                <div class="vtp-info-box">
                  <strong>Cómo lo atendemos</strong>
                  <p>${symptom.how}</p>
                </div>

                <div class="vtp-recommend-title">
                  <span class="vtp-chip"><i class="fa-solid fa-sparkles"></i> Terapias sugeridas</span>
                  <p>Elige una de estas rutas para avanzar directo a WhatsApp.</p>
                </div>

                <div class="vtp-therapy-grid">
                  ${symptom.therapies.map((therapyId) => {
                    const therapy = m.getTherapy(therapyId);
                    const message = [
                      'Hola, quiero agendar una terapia Valtara.',
                      '',
                      `Zona: ${zones[0].title}`,
                      `Molestia: ${symptom.title}`,
                      `Terapia sugerida: ${therapy.name}`,
                      `Duración: ${therapy.duration}`,
                      `Precio: ${m.money(therapy.price)}`,
                      '',
                      `Sucursal principal: ${m.mainAddress}`,
                      `Próxima apertura: ${m.nextOpening}.`,
                      `Contacto oficial: ${m.contactDisplay}`
                    ].join('\n');

                    return `
                      <div class="vtp-therapy-card" style="--accent:${therapy.color}">
                        <div class="vtp-therapy-top">
                          <div class="vtp-therapy-icon">
                            <i class="fa-solid ${therapy.icon}"></i>
                          </div>
                          <div>
                            <strong>${therapy.name}</strong>
                            <span>${therapy.duration}</span>
                          </div>
                        </div>
                        <p class="vtp-therapy-price">${m.money(therapy.price)}</p>
                        <p class="vtp-therapy-cta-desc">${therapy.cta}</p>
                        <a class="vtp-wa-btn" href="${waLink(message)}" target="_blank" rel="noopener noreferrer">
                          <i class="fa-brands fa-whatsapp"></i>
                          Agendar por WhatsApp
                        </a>
                      </div>
                    `;
                  }).join('')}
                </div>

                <div class="vtp-footer-note">
                  <strong>Contacto oficial:</strong> ${m.contactDisplay} · <strong>Sucursal principal:</strong> ${m.mainAddress} · <strong>Próxima apertura:</strong> ${m.nextOpening}
                </div>
              </div>
            </details>
          `).join('')}
        </div>
      </div>
    </details>

    ${zones.slice(1).map((zone) => `
      <details class="vtp-zone">
        <summary class="vtp-zone-summary">
          <div class="vtp-zone-icon" style="--accent:${zone.accent}">
            <i class="fa-solid ${zone.icon}"></i>
          </div>
          <div class="vtp-zone-copy">
            <p class="vtp-step-label">Paso 1 · Elige la zona</p>
            <h3>${zone.title}</h3>
            <p>${zone.intro}</p>
          </div>
        </summary>
        <div class="vtp-zone-body">
          <div class="vtp-zone-chipline">
            <span class="vtp-chip-small"><i class="fa-solid fa-map-marker-alt"></i> ${m.mainAddress}</span>
            <span class="vtp-chip-small"><i class="fa-brands fa-whatsapp"></i> ${m.contactDisplay}</span>
            <span class="vtp-chip-small"><i class="fa-solid fa-circle-info"></i> Sujeto a agenda</span>
          </div>
          <div class="vtp-symptom-grid">
            ${zone.symptoms.map((symptom) => `
              <details class="vtp-symptom" open>
                <summary class="vtp-symptom-summary">
                  <div class="vtp-symptom-badge" style="--accent:${zone.accent}">
                    <i class="fa-solid fa-circle-nodes"></i>
                  </div>
                  <div class="vtp-symptom-copy">
                    <p class="vtp-step-label">Paso 2 · Identifica la molestia</p>
                    <h4>${symptom.title}</h4>
                    <p>${symptom.why}</p>
                  </div>
                </summary>
                <div class="vtp-symptom-body">
                  <div class="vtp-info-box">
                    <strong>Cómo lo atendemos</strong>
                    <p>${symptom.how}</p>
                  </div>

                  <div class="vtp-recommend-title">
                    <span class="vtp-chip"><i class="fa-solid fa-sparkles"></i> Terapias sugeridas</span>
                    <p>Elige una de estas rutas para avanzar directo a WhatsApp.</p>
                  </div>

                  <div class="vtp-therapy-grid">
                    ${symptom.therapies.map((therapyId) => {
                      const therapy = m.getTherapy(therapyId);
                      const message = [
                        'Hola, quiero agendar una terapia Valtara.',
                        '',
                        `Zona: ${zone.title}`,
                        `Molestia: ${symptom.title}`,
                        `Terapia sugerida: ${therapy.name}`,
                        `Duración: ${therapy.duration}`,
                        `Precio: ${m.money(therapy.price)}`,
                        '',
                        `Sucursal principal: ${m.mainAddress}`,
                        `Próxima apertura: ${m.nextOpening}.`,
                        `Contacto oficial: ${m.contactDisplay}`
                      ].join('\n');

                      return `
                        <div class="vtp-therapy-card" style="--accent:${therapy.color}">
                          <div class="vtp-therapy-top">
                            <div class="vtp-therapy-icon">
                              <i class="fa-solid ${therapy.icon}"></i>
                            </div>
                            <div>
                              <strong>${therapy.name}</strong>
                              <span>${therapy.duration}</span>
                            </div>
                          </div>
                          <p class="vtp-therapy-price">${m.money(therapy.price)}</p>
                          <p class="vtp-therapy-cta-desc">${therapy.cta}</p>
                          <a class="vtp-wa-btn" href="${waLink(message)}" target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-whatsapp"></i>
                            Agendar por WhatsApp
                          </a>
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <div class="vtp-footer-note">
                    <strong>Contacto oficial:</strong> ${m.contactDisplay} · <strong>Sucursal principal:</strong> ${m.mainAddress} · <strong>Próxima apertura:</strong> ${m.nextOpening}
                  </div>
                </div>
              </details>
            `).join('')}
          </div>
        </div>
      </details>
    `).join('')}
  </div>
</section>
  `;
})();
