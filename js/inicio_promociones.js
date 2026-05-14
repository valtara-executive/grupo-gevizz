window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraPromoBook = {

step: 1,

data: {
therapy: null,
aroma: null,
promo: null
},

therapies: {

relajante50: {
nombre: 'Masaje Relajante Neuro Adaptativo',
duracion: '50 Minutos',
precio: 699
},

relajante90: {
nombre: 'Masaje Relajante Neuro Adaptativo',
duracion: '90 Minutos',
precio: 899
},

deportivo: {
nombre: 'Masaje Deportivo & Descompresión',
duracion: '50 Minutos',
precio: 729
},

ayurveda: {
nombre: 'Ayurveda & Aromaterapia',
duracion: '50 Minutos',
precio: 829
},

holistico: {
nombre: 'Masaje Holístico Integrativo',
duracion: '50 Minutos',
precio: 829
},

lomi: {
nombre: 'Ritual Lomi Lomi Supremo',
duracion: 'Premium',
precio: 999
},

esferas: {
nombre: 'Esferas Chinas & Velas',
duracion: '60 Minutos',
precio: 819
},

drenaje: {
nombre: 'Drenaje Linfático Manual',
duracion: '60 Minutos',
precio: 749
},

facial: {
nombre: 'Parálisis Facial',
duracion: '45 Minutos',
precio: 529
},

reductivo: {
nombre: 'Reductivo & Maderoterapia',
duracion: 'Sesión',
precio: 799
}

},

aromas: {

lavanda: {
nombre: 'Lavanda',
extra: 0
},

vainilla: {
nombre: 'Vainilla',
extra: 49
},

rosas: {
nombre: 'Rosas Blancas',
extra: 59
},

menta: {
nombre: 'Menta',
extra: 39
}

},

promos: {

off169: {
nombre: 'Cortesía Inicio de Semana',
tipo: 'fijo',
cantidad: 169
},

off20: {
nombre: '20% OFF Matutino',
tipo: 'porcentaje',
cantidad: 20
}

},

money(value){
return '$' + Number(value).toLocaleString('es-MX') + ' MXN';
},

go(step){

this.step = step;

document.querySelectorAll('.promo-step-book').forEach((el)=>{
el.style.display = 'none';
});

const target = document.getElementById('promo-step-' + step);

if(target){
target.style.display = 'block';
target.scrollIntoView({
behavior:'smooth',
block:'start'
});
}

},

selectTherapy(id){

this.data.therapy = this.therapies[id];

document.getElementById('promo-selected-therapy').innerHTML = `
<strong>${this.data.therapy.nombre}</strong><br>
${this.data.therapy.duracion}<br>
${this.money(this.data.therapy.precio)}
`;

this.go(2);

},

selectAroma(id){

this.data.aroma = this.aromas[id];

document.getElementById('promo-selected-aroma').innerHTML = `
<strong>${this.data.aroma.nombre}</strong><br>
${this.data.aroma.extra > 0
? '+' + this.money(this.data.aroma.extra)
: 'Incluido'}
`;

this.go(3);

},

selectPromo(id){

this.data.promo = this.promos[id];

this.calculate();

this.go(4);

},

calculate(){

const therapy = this.data.therapy || {};
const aroma = this.data.aroma || {};
const promo = this.data.promo || {};

let subtotal = therapy.precio || 0;

subtotal += aroma.extra || 0;

let descuento = 0;

if(promo.tipo === 'fijo'){
descuento = promo.cantidad;
}

if(promo.tipo === 'porcentaje'){
descuento = subtotal * (promo.cantidad / 100);
}

const total = Math.max(subtotal - descuento, 0);

document.getElementById('promo-summary').innerHTML = `

<div class="promo-summary-line">
<span>Terapia</span>
<strong>${therapy.nombre}</strong>
</div>

<div class="promo-summary-line">
<span>Duración</span>
<strong>${therapy.duracion}</strong>
</div>

<div class="promo-summary-line">
<span>Aromaterapia</span>
<strong>${aroma.nombre}</strong>
</div>

<div class="promo-summary-line">
<span>Promoción</span>
<strong>${promo.nombre}</strong>
</div>

<div class="promo-summary-line">
<span>Subtotal</span>
<strong>${this.money(subtotal)}</strong>
</div>

<div class="promo-summary-line">
<span>Descuento</span>
<strong>- ${this.money(descuento)}</strong>
</div>

<div class="promo-summary-total">
${this.money(total)}
</div>

`;

const message = encodeURIComponent(

`Hola, quiero agendar una experiencia Valtara.%0A%0A` +

`🌿 Terapia: ${therapy.nombre}%0A` +
`⏱️ Duración: ${therapy.duracion}%0A` +
`🕯️ Aromaterapia: ${aroma.nombre}%0A` +
`🎁 Promoción: ${promo.nombre}%0A%0A` +

`💰 Total estimado: ${this.money(total)}%0A%0A` +

`Sucursal principal: Reforma 195%0A` +
`Próxima apertura: Metro Eugenia`

);

document.getElementById('promo-wa-btn').href =
'https://wa.me/5213348572070?text=' + message;

}

};

window.ValtaraModulos.inicio_promociones = `

<style>

.promo-book-wrapper{
max-width:1200px;
margin:auto;
padding:2rem 1rem 5rem;
}

.promo-book-header{
text-align:center;
margin-bottom:3rem;
}

.promo-book-header h2{
font-family:var(--font-accent);
font-size:clamp(2.8rem,6vw,4.5rem);
color:white;
margin-bottom:1rem;
}

.promo-book-header p{
max-width:850px;
margin:auto;
line-height:1.9;
color:#b6b6b6;
font-size:1.1rem;
}

.promo-book{
padding:2rem;
border-radius:36px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
backdrop-filter:blur(12px);
}

.promo-step-book{
animation:promoFade .35s ease;
}

@keyframes promoFade{

from{
opacity:0;
transform:translateY(20px);
}

to{
opacity:1;
transform:none;
}

}

.promo-step-book h3{
font-size:2rem;
color:white;
margin-bottom:2rem;
}

.promo-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
gap:1.2rem;
}

.promo-card{
position:relative;
overflow:hidden;
padding:1.5rem;
border-radius:28px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
cursor:pointer;
transition:.25s ease;
}

.promo-card:hover{
transform:translateY(-6px);
border-color:rgba(255,255,255,.18);
}

.promo-card::before{
content:'';
position:absolute;
width:180px;
height:180px;
border-radius:50%;
background:var(--card-color);
filter:blur(70px);
opacity:.12;
top:-50px;
right:-50px;
}

.promo-icon{
position:relative;
z-index:2;
width:90px;
height:90px;
border-radius:24px;
display:flex;
align-items:center;
justify-content:center;
background:rgba(255,255,255,.04);
border:1px solid rgba(255,255,255,.08);
margin-bottom:1.3rem;
}

.promo-icon i{
font-size:2.5rem;
color:var(--card-color);
animation:promoFloat 5s ease-in-out infinite;
}

@keyframes promoFloat{

0%{
transform:translateY(0px);
}

50%{
transform:translateY(-10px);
}

100%{
transform:translateY(0px);
}

}

.promo-card h4{
color:white;
font-size:1.15rem;
margin-bottom:.8rem;
}

.promo-card p{
line-height:1.8;
font-size:.95rem;
color:#b8b8b8;
}

.promo-price{
margin-top:1.3rem;
font-size:1.4rem;
font-weight:800;
color:var(--valtara-oro);
}

.promo-actions{
margin-top:2rem;
display:flex;
justify-content:space-between;
gap:1rem;
flex-wrap:wrap;
}

.promo-btn{
padding:1rem 1.5rem;
border:none;
border-radius:999px;
font-weight:700;
cursor:pointer;
}

.promo-btn-back{
background:rgba(255,255,255,.06);
color:white;
}

.promo-btn-next{
background:var(--valtara-oro);
color:black;
}

.promo-selected-box{
margin-top:1.4rem;
padding:1.3rem;
border-radius:20px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
color:#d8d8d8;
line-height:1.8;
}

.promo-summary-box{
padding:2rem;
border-radius:30px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
}

.promo-summary-line{
display:flex;
justify-content:space-between;
gap:1rem;
padding:1rem 0;
border-bottom:1px solid rgba(255,255,255,.08);
color:#d8d8d8;
}

.promo-summary-total{
margin-top:2rem;
font-size:2rem;
font-weight:900;
color:var(--valtara-oro);
text-align:right;
}

.promo-wa{
margin-top:2rem;
display:block;
text-align:center;
padding:1.2rem;
border-radius:999px;
background:#25D366;
color:white;
font-weight:800;
text-decoration:none;
}

.promo-note{
margin-top:2rem;
padding:1.5rem;
border-radius:24px;
background:rgba(242,201,76,.05);
border:1px solid rgba(242,201,76,.14);
color:#cfcfcf;
line-height:1.9;
}

</style>

<section class="promo-book-wrapper">

<div class="promo-book-header">

<h2>
Promociones Inteligentes
</h2>

<p>

Personaliza tu experiencia,
elige tu terapia,
agrega aromaterapia
y obtén promociones exclusivas válidas
en Reforma 195 y próxima apertura cerca de Metro Eugenia.

</p>

</div>

<div class="promo-book">

<!-- STEP 1 -->

<div
class="promo-step-book"
id="promo-step-1">

<h3>
1. Elige tu terapia
</h3>

<div class="promo-grid">

<!-- RELAJANTE -->

<div
class="promo-card"
style="--card-color:#00ffe0;"
onclick="ValtaraPromoBook.selectTherapy('relajante50')">

<div class="promo-icon">
<i class="fa-solid fa-spa"></i>
</div>

<h4>
Masaje Relajante
</h4>

<p>

Relajación profunda,
estrés,
ansiedad
y descanso corporal.

</p>

<div class="promo-price">
$699 MXN
</div>

</div>

<!-- DEPORTIVO -->

<div
class="promo-card"
style="--card-color:#ff5555;"
onclick="ValtaraPromoBook.selectTherapy('deportivo')">

<div class="promo-icon">
<i class="fa-solid fa-dumbbell"></i>
</div>

<h4>
Masaje Deportivo
</h4>

<p>

Liberación muscular profunda
y descompresión biomecánica.

</p>

<div class="promo-price">
$729 MXN
</div>

</div>

<!-- AYURVEDA -->

<div
class="promo-card"
style="--card-color:#F2C94C;"
onclick="ValtaraPromoBook.selectTherapy('ayurveda')">

<div class="promo-icon">
<i class="fa-solid fa-leaf"></i>
</div>

<h4>
Ayurveda
</h4>

<p>

Aceites tibios,
aromaterapia
y relajación emocional.

</p>

<div class="promo-price">
$829 MXN
</div>

</div>

<!-- LOMI -->

<div
class="promo-card"
style="--card-color:#ffaa00;"
onclick="ValtaraPromoBook.selectTherapy('lomi')">

<div class="promo-icon">
<i class="fa-solid fa-water"></i>
</div>

<h4>
Lomi Lomi Supremo
</h4>

<p>

Experiencia premium hawaiana
de relajación profunda.

</p>

<div class="promo-price">
$999 MXN
</div>

</div>

</div>

</div>

<!-- STEP 2 -->

<div
class="promo-step-book"
id="promo-step-2"
style="display:none;">

<h3>
2. Aromaterapia
</h3>

<div
class="promo-selected-box"
id="promo-selected-therapy">
</div>

<div
class="promo-grid"
style="margin-top:2rem;">

<div
class="promo-card"
style="--card-color:#b27fff;"
onclick="ValtaraPromoBook.selectAroma('lavanda')">

<div class="promo-icon">
<i class="fa-solid fa-spa"></i>
</div>

<h4>
Lavanda
</h4>

<p>
Relajación profunda.
</p>

<div class="promo-price">
Incluido
</div>

</div>

<div
class="promo-card"
style="--card-color:#ffb6c1;"
onclick="ValtaraPromoBook.selectAroma('vainilla')">

<div class="promo-icon">
<i class="fa-solid fa-candle-holder"></i>
</div>

<h4>
Vainilla
</h4>

<p>
Sensación cálida y suave.
</p>

<div class="promo-price">
+$49 MXN
</div>

</div>

<div
class="promo-card"
style="--card-color:#ffffff;"
onclick="ValtaraPromoBook.selectAroma('rosas')">

<div class="promo-icon">
<i class="fa-solid fa-heart"></i>
</div>

<h4>
Rosas Blancas
</h4>

<p>
Experiencia premium romántica.
</p>

<div class="promo-price">
+$59 MXN
</div>

</div>

</div>

<div class="promo-actions">

<button
class="promo-btn promo-btn-back"
onclick="ValtaraPromoBook.go(1)">

← Regresar

</button>

</div>

</div>

<!-- STEP 3 -->

<div
class="promo-step-book"
id="promo-step-3"
style="display:none;">

<h3>
3. Promoción
</h3>

<div
class="promo-selected-box"
id="promo-selected-aroma">
</div>

<div
class="promo-grid"
style="margin-top:2rem;">

<div
class="promo-card"
style="--card-color:#F2C94C;"
onclick="ValtaraPromoBook.selectPromo('off169')">

<div class="promo-icon">
<i class="fa-solid fa-gift"></i>
</div>

<h4>
$169 de Cortesía
</h4>

<p>

Válido lunes y martes.
Primeras 10 sesiones
después de la 1 PM.

</p>

<div class="promo-price">
- $169 MXN
</div>

</div>

<div
class="promo-card"
style="--card-color:#00ffe0;"
onclick="ValtaraPromoBook.selectPromo('off20')">

<div class="promo-icon">
<i class="fa-solid fa-sun"></i>
</div>

<h4>
20% OFF Matutino
</h4>

<p>

Jueves a domingo
antes de las 2 PM.

</p>

<div class="promo-price">
20% OFF
</div>

</div>

</div>

<div class="promo-note">

<strong>Términos:</strong><br><br>

💎 Promociones no acumulables.<br><br>

☀️ Después de las 7 PM algunas terapias incluyen té de frutos rojos de cortesía.<br><br>

📍 Sede principal: Reforma 195.<br><br>

✨ Próxima apertura: Metro Eugenia.

</div>

<div class="promo-actions">

<button
class="promo-btn promo-btn-back"
onclick="ValtaraPromoBook.go(2)">

← Regresar

</button>

</div>

</div>

<!-- STEP 4 -->

<div
class="promo-step-book"
id="promo-step-4"
style="display:none;">

<h3>
4. Resumen
</h3>

<div
class="promo-summary-box"
id="promo-summary">
</div>

<a
id="promo-wa-btn"
class="promo-wa"
target="_blank">

<i class="fa-brands fa-whatsapp"></i>
Continuar por WhatsApp

</a>

<div class="promo-actions">

<button
class="promo-btn promo-btn-back"
onclick="ValtaraPromoBook.go(3)">

← Regresar

</button>

</div>

</div>

</div>

</section>

`;
