window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_promociones = `
<section class="valtara-promociones-wrapper">

  <style>
    .valtara-promociones-wrapper{
      width:100%;
      max-width:1200px;
      margin:0 auto;
      padding:1rem;
      display:grid;
      gap:1.2rem;
      box-sizing:border-box;
    }

    .vp-glass{
      background:rgba(255,255,255,.03);
      border:1px solid rgba(255,255,255,.08);
      border-radius:28px;
      padding:1.4rem;
      box-shadow:0 18px 45px rgba(0,0,0,.28);
      backdrop-filter:blur(18px);
    }

    .vp-hero{
      position:relative;
      overflow:hidden;
      background:
      radial-gradient(circle at top right, rgba(0,255,224,.12), transparent 35%),
      radial-gradient(circle at bottom left, rgba(242,201,76,.12), transparent 35%),
      rgba(255,255,255,.03);
    }

    .vp-badge{
      display:inline-flex;
      align-items:center;
      gap:.5rem;
      padding:.45rem .9rem;
      border-radius:999px;
      background:rgba(0,255,224,.12);
      color:#00ffe0;
      font-size:.76rem;
      letter-spacing:.14em;
      text-transform:uppercase;
      margin-bottom:1rem;
    }

    .vp-hero h2{
      margin:0;
      color:#fff;
      font-size:clamp(2rem,5vw,3.5rem);
      line-height:1.1;
      font-family:'Lato',sans-serif;
    }

    .vp-hero p{
      color:#bdbdbd;
      line-height:1.8;
      margin-top:1rem;
      max-width:760px;
    }

    .vp-grid{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
      gap:1rem;
    }

    .vp-card{
      cursor:pointer;
      transition:.25s ease;
      position:relative;
      overflow:hidden;
    }

    .vp-card:hover{
      transform:translateY(-4px);
      border-color:rgba(242,201,76,.25);
    }

    .vp-card.active{
      border-color:#f2c94c;
      box-shadow:0 0 0 1px rgba(242,201,76,.2);
    }

    .vp-card h3{
      color:#fff;
      margin:.7rem 0;
      font-size:1.4rem;
    }

    .vp-card p{
      color:#bcbcbc;
      line-height:1.7;
    }

    .vp-tag{
      display:inline-flex;
      padding:.4rem .8rem;
      border-radius:999px;
      background:rgba(255,255,255,.06);
      color:#f2c94c;
      font-size:.78rem;
      margin-bottom:.7rem;
    }

    .vp-selector{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
      gap:1rem;
    }

    .vp-field{
      display:grid;
      gap:.5rem;
    }

    .vp-field label{
      color:#fff;
      font-size:.95rem;
    }

    .vp-field select{
      width:100%;
      border:none;
      outline:none;
      background:rgba(255,255,255,.05);
      border:1px solid rgba(255,255,255,.08);
      color:#fff;
      padding:1rem;
      border-radius:16px;
      font-size:1rem;
    }

    .vp-field option{
      background:#121212;
      color:#fff;
    }

    .vp-summary h3{
      margin-top:0;
      color:#fff;
      font-size:1.5rem;
    }

    .vp-line{
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:.9rem 0;
      border-bottom:1px solid rgba(255,255,255,.06);
      color:#fff;
    }

    .vp-line:last-child{
      border-bottom:none;
    }

    .vp-line.total{
      font-size:1.15rem;
      font-weight:700;
      color:#f2c94c;
    }

    .vp-note{
      margin-top:1rem;
      padding:1rem;
      border-radius:18px;
      background:rgba(255,255,255,.04);
      color:#bcbcbc;
      line-height:1.7;
    }

    .vp-whatsapp{
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      gap:.7rem;
      text-decoration:none;
      margin-top:1.2rem;
      padding:1rem;
      border-radius:999px;
      background:linear-gradient(135deg,#22c55e,#00b36a);
      color:white;
      font-weight:700;
      transition:.2s ease;
      box-sizing:border-box;
    }

    .vp-whatsapp:hover{
      transform:translateY(-2px);
    }

    .vp-raffle h3{
      color:#fff;
      margin-top:.5rem;
    }

    .vp-raffle p{
      color:#bdbdbd;
      line-height:1.8;
    }

    .vp-secondary{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      margin-top:1rem;
      width:100%;
      padding:1rem;
      border-radius:999px;
      background:rgba(255,255,255,.06);
      color:#fff;
      text-decoration:none;
      font-weight:700;
      box-sizing:border-box;
    }

    .vp-terms h4{
      margin-top:0;
      color:#fff;
    }

    .vp-terms ul{
      margin:0;
      padding-left:1rem;
      color:#bdbdbd;
      line-height:1.8;
    }

    .vp-night{
      border-left:3px solid #f2c94c;
    }

    @media(max-width:720px){

      .vp-glass{
        border-radius:22px;
      }

      .vp-hero h2{
        font-size:2rem;
      }

    }
  </style>

  <div class="vp-glass vp-hero">
    <span class="vp-badge">VALTARA EXPERIENCIAS</span>

    <h2 id="vp-random-title">
      Tu cuerpo no debería acostumbrarse al cansancio.
    </h2>

    <p>
      Experiencias terapéuticas diseñadas para aliviar tensión física,
      emocional y mental en un entorno elegante, inmersivo y profundamente relajante.
    </p>
  </div>

  <div class="vp-grid">

    <article class="vp-card vp-glass active" data-promo="169">
      <span class="vp-tag">Lunes y martes • Después de la 1 PM</span>

      <h3>
        Inicia tu semana más ligero
      </h3>

      <p>
        Valtara aporta $169 MXN de cortesía hacia tu experiencia terapéutica
        para ayudarte a comenzar la semana con una sensación más ligera y renovada.
      </p>

      <small style="color:#888;">
        Válido para las primeras 10 sesiones de la semana.
      </small>
    </article>

    <article class="vp-card vp-glass" data-promo="20">
      <span class="vp-tag">Jueves a domingo • Hasta la 1 PM</span>

      <h3>
        20% de cortesía matutina
      </h3>

      <p>
        Algunas pausas funcionan mejor cuando el día apenas comienza.
        Disfruta una experiencia terapéutica con un beneficio especial del 20%.
      </p>

      <small style="color:#888;">
        No acumulable con otras cortesías activas.
      </small>
    </article>

  </div>

  <div class="vp-selector vp-glass">

    <div class="vp-field">
      <label>
        Selecciona tu terapia
      </label>

      <select id="vp-terapia">
        <option value="699">Liberación Cervical — 45 min — $699 MXN</option>
        <option value="799">Terapia Relajante — 60 min — $799 MXN</option>
        <option value="899">Masaje Deportivo — 60 min — $899 MXN</option>
        <option value="999">Terapia Descontracturante — 60 min — $999 MXN</option>
        <option value="1099">Terapia Relajante Premium — 90 min — $1099 MXN</option>
      </select>
    </div>

    <div class="vp-field">
      <label>
        Aromaterapia
      </label>

      <select id="vp-aroma">
        <option>Lavanda</option>
        <option>Vainilla</option>
        <option>Menta</option>
        <option>Eucalipto</option>
        <option>Frutos Rojos</option>
        <option>Neutra</option>
      </select>
    </div>

  </div>

  <div class="vp-summary vp-glass">

    <h3>
      Resumen estimado
    </h3>

    <div class="vp-line">
      <span>Subtotal</span>
      <strong id="vp-subtotal">$699 MXN</strong>
    </div>

    <div class="vp-line">
      <span id="vp-benefit-label">Cortesía Valtara</span>
      <strong id="vp-benefit">-$169 MXN</strong>
    </div>

    <div class="vp-line total">
      <span>Total estimado</span>
      <strong id="vp-total">$530 MXN</strong>
    </div>

    <div class="vp-note vp-night">
      <strong style="color:#fff;">
        Experiencia nocturna Valtara
      </strong>

      <br><br>

      Después de las 7:00 PM algunas experiencias incluyen una cortesía
      de té de frutos rojos para extender la sensación de bienestar y relajación.
    </div>

    <a
      id="vp-whatsapp-btn"
      class="vp-whatsapp"
      target="_blank"
      href="#"
    >
      Continuar por WhatsApp
    </a>

  </div>

  <div class="vp-raffle vp-glass">

    <span class="vp-tag">
      SORTEO MENSUAL
    </span>

    <h3>
      Cada mes regalamos experiencias completas
    </h3>

    <p>
      Participa para ganar una terapia relajante o deportiva totalmente de cortesía.
    </p>

    <a
      class="vp-secondary"
      target="_blank"
      href="https://wa.me/523348572070?text=Hola,%20me%20gustaría%20participar%20en%20el%20sorteo%20mensual%20de%20Valtara."
    >
      Participar
    </a>

  </div>

  <div class="vp-terms vp-glass">

    <h4>
      Términos y condiciones
    </h4>

    <ul>
      <li>Las cortesías no son acumulables entre sí.</li>
      <li>Promociones sujetas a disponibilidad semanal.</li>
      <li>La cortesía de $169 MXN aplica lunes y martes después de la 1 PM.</li>
      <li>Beneficio válido para las primeras 10 sesiones de la semana.</li>
      <li>El 20% matutino aplica jueves a domingo hasta la 1 PM.</li>
      <li>Beneficios válidos en Reforma 195.</li>
      <li>Próxima apertura cerca de Metro Eugenia.</li>
    </ul>

  </div>

</section>

<script>

(function(){

  const frases = [
    'Tu cuerpo no debería acostumbrarse al cansancio.',
    'Hay tensiones que el descanso normal ya no libera.',
    'Haz una pausa antes de que el cuerpo la exija.',
    'El bienestar también puede sentirse elegante.',
    'Una experiencia terapéutica puede cambiar tu semana.'
  ];

  const title = document.getElementById('vp-random-title');

  if(title){
    title.textContent =
      frases[Math.floor(Math.random() * frases.length)];
  }

  const cards = document.querySelectorAll('.vp-card');

  const terapiaSelect = document.getElementById('vp-terapia');

  const aromaSelect = document.getElementById('vp-aroma');

  const subtotalEl = document.getElementById('vp-subtotal');

  const benefitEl = document.getElementById('vp-benefit');

  const totalEl = document.getElementById('vp-total');

  const benefitLabel = document.getElementById('vp-benefit-label');

  const whatsappBtn = document.getElementById('vp-whatsapp-btn');

  let promo = '169';

  function currency(value){
    return '$' + value.toFixed(0) + ' MXN';
  }

  function update(){

    const subtotal =
      Number(terapiaSelect.value);

    let descuento = 169;

    if(promo === '20'){
      descuento = subtotal * 0.20;
      benefitLabel.textContent =
      '20% matutino';
    }else{
      benefitLabel.textContent =
      'Cortesía Valtara';
    }

    const total =
      subtotal - descuento;

    subtotalEl.textContent =
      currency(subtotal);

    benefitEl.textContent =
      '-'+currency(descuento);

    totalEl.textContent =
      currency(total);

    const terapiaTexto =
      terapiaSelect.options[
        terapiaSelect.selectedIndex
      ].text;

    const aroma =
      aromaSelect.value;

    const promoTexto =
      promo === '20'
      ? '20% matutino'
      : '$169 MXN de cortesía';

    const mensaje =
      encodeURIComponent(
        'Hola, me interesa una experiencia terapéutica en Valtara.\\n\\n' +
        'Terapia: ' + terapiaTexto + '\\n' +
        'Aromaterapia: ' + aroma + '\\n' +
        'Promoción seleccionada: ' + promoTexto + '\\n\\n' +
        'Subtotal: ' + currency(subtotal) + '\\n' +
        'Beneficio aplicado: -' + currency(descuento) + '\\n' +
        'Total estimado: ' + currency(total) + '\\n\\n' +
        'Sucursal principal: Reforma 195\\n' +
        'Próxima apertura: cerca de Metro Eugenia.\\n\\n' +
        'Me gustaría consultar disponibilidad.'
      );

    whatsappBtn.href =
      'https://wa.me/523348572070?text=' +
      mensaje;
  }

  cards.forEach(card => {

    card.addEventListener('click', () => {

      cards.forEach(c =>
        c.classList.remove('active')
      );

      card.classList.add('active');

      promo =
        card.dataset.promo;

      update();

    });

  });

  terapiaSelect.addEventListener(
    'change',
    update
  );

  aromaSelect.addEventListener(
    'change',
    update
  );

  update();

})();

</script>
`;
