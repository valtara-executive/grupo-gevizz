/**
 * VALTARA — INICIO PROMOCIONES V5
 * Arquitectura segura compatible con core.js y constructor_maestro.js
 * Render tipo “libro interactivo”
 */

(function (global) {
'use strict';

const WHATSAPP_NUMBER = '5213348572070';

const TERAPIAS = [

{
id:'relajante50',
nombre:'Masaje Relajante Neuro Adaptativo',
duracion:'50 Minutos',
precio:699,
icono:'fa-spa',
color:'#00ffe0',
descripcion:'Relajación profunda para disminuir ansiedad, estrés físico y agotamiento emocional.'
},

{
id:'relajante90',
nombre:'Masaje Relajante Neuro Adaptativo',
duracion:'90 Minutos',
precio:899,
icono:'fa-moon',
color:'#6ee7ff',
descripcion:'Experiencia extendida enfocada en descanso nervioso y restauración corporal integral.'
},

{
id:'deportivo',
nombre:'Masaje Deportivo & Descompresión',
duracion:'50 Minutos',
precio:729,
icono:'fa-dumbbell',
color:'#ff5555',
descripcion:'Liberación muscular profunda para contracturas, sobrecarga física y fatiga muscular.'
},

{
id:'ayurveda',
nombre:'Ayurveda & Aromaterapia',
duracion:'50 Minutos',
precio:829,
icono:'fa-leaf',
color:'#F2C94C',
descripcion:'Aceites tibios y aromas relajantes para ansiedad, tensión y agotamiento emocional.'
},

{
id:'holistico',
nombre:'Masaje Holístico Integrativo',
duracion:'50 Minutos',
precio:829,
icono:'fa-yin-yang',
color:'#ffd700',
descripcion:'Terapia emocional y corporal enfocada en equilibrio físico y mental.'
},

{
id:'lomi',
nombre:'Ritual Lomi Lomi Supremo',
duracion:'Premium',
precio:999,
icono:'fa-water',
color:'#ffaa00',
descripcion:'Experiencia hawaiana inmersiva para desconexión profunda y relajación total.'
},

{
id:'esferas',
nombre:'Esferas Chinas & Velas',
duracion:'60 Minutos',
precio:819,
icono:'fa-circle-notch',
color:'#ffffff',
descripcion:'Estimulación sensorial con vibración sonora, velas cálidas y relajación profunda.'
},

{
id:'drenaje',
nombre:'Drenaje Linfático Manual',
duracion:'60 Minutos',
precio:749,
icono:'fa-droplet',
color:'#d6d6d6',
descripcion:'Movilización suave de líquidos y relajación postural.'
},

{
id:'facial',
nombre:'Parálisis Facial',
duracion:'45 Minutos',
precio:529,
icono:'fa-face-smile',
color:'#4361EE',
descripcion:'Estimulación neuromuscular facial y recuperación funcional.'
},

{
id:'reductivo',
nombre:'Reductivo & Maderoterapia',
duracion:'Sesión',
precio:799,
icono:'fa-child-reaching',
color:'#b27fff',
descripcion:'Estimulación corporal estética con maderoterapia y geles especializados.'
}

];

const AROMAS = [

{
nombre:'Lavanda',
extra:0,
descripcion:'Relajación emocional profunda'
},

{
nombre:'Menta',
extra:39,
descripcion:'Sensación fresca y estimulante'
},

{
nombre:'Eucalipto',
extra:39,
descripcion:'Respiración y sensación despejada'
},

{
nombre:'Vainilla',
extra:49,
descripcion:'Ambiente cálido y relajante'
},

{
nombre:'Rosas Blancas',
extra:59,
descripcion:'Experiencia premium romántica'
}

];

const PROMOCIONES = [

{
id:'lunes169',
nombre:'Cortesía Inicio de Semana',
descripcion:'💎 Lunes y martes. Primeras 10 sesiones después de la 1 PM.',
tipo:'descuento',
monto:169,
dias:['Monday','Tuesday'],
combinable:false
},

{
id:'morning20',
nombre:'20% OFF Matutino',
descripcion:'☀️ Jueves a domingo antes de las 2 PM.',
tipo:'porcentaje',
monto:20,
dias:['Thursday','Friday','Saturday','Sunday'],
combinable:false
}

];

function money(value){
return '$' + value.toLocaleString('es-MX') + ' MXN';
}

function buildTherapies(){

return TERAPIAS.map((t)=>`

<button
class="promo-therapy-card"
data-id="${t.id}">

<div class="promo-card-glow"
style="background:${t.color};"></div>

<div class="promo-icon-wrap">

<i
class="fa-solid ${t.icono} promo-icon"
style="color:${t.color};"></i>

</div>

<div class="promo-card-content">

<h3>${t.nombre}</h3>

<p class="promo-duration">
<i class="fa-solid fa-clock"></i>
${t.duracion}
</p>

<p class="promo-desc">
${t.descripcion}
</p>

<div class="promo-price">
${money(t.precio)}
</div>

</div>

</button>

`).join('');

}

function buildAromas(){

return AROMAS.map((a)=>`

<button
class="promo-mini-card"
data-aroma="${a.nombre}"
data-extra="${a.extra}">

<h4>${a.nombre}</h4>

<p>${a.descripcion}</p>

<span>${a.extra > 0 ? '+' + money(a.extra) : 'Incluido'}</span>

</button>

`).join('');

}

function buildPromos(){

return PROMOCIONES.map((p)=>`

<button
class="promo-mini-card"
data-promo="${p.id}">

<h4>${p.nombre}</h4>

<p>${p.descripcion}</p>

<span>
${p.tipo === 'porcentaje'
? p.monto + '% OFF'
: money(p.monto) + ' OFF'}
</span>

</button>

`).join('');

}

global.ValtaraModulos = global.ValtaraModulos || {};

global.ValtaraModulos.inicio_promociones = `

<style>

.promo-book-wrap{
max-width:1200px;
margin:auto;
padding:2rem 1rem 5rem;
}

.promo-book-header{
text-align:center;
margin-bottom:3rem;
}

.promo-book-header h2{
font-size:clamp(2.5rem,6vw,4.4rem);
font-family:var(--font-accent);
color:white;
margin-bottom:1rem;
}

.promo-book-header p{
max-width:860px;
margin:auto;
line-height:1.9;
font-size:1.1rem;
color:#b8b8b8;
}

.promo-book{
position:relative;
overflow:hidden;
border-radius:36px;
padding:2rem;
background:
linear-gradient(
145deg,
rgba(255,255,255,.04),
rgba(255,255,255,.02)
);

border:1px solid rgba(255,255,255,.08);
backdrop-filter:blur(14px);
min-height:720px;
}

.promo-step{
display:none;
animation:fadeBook .45s ease;
}

.promo-step.active{
display:block;
}

@keyframes fadeBook{

from{
opacity:0;
transform:translateY(20px);
}

to{
opacity:1;
transform:none;
}

}

.promo-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(270px,1fr));
gap:1.2rem;
}

.promo-therapy-card{
position:relative;
overflow:hidden;
border:none;
cursor:pointer;
padding:1.6rem;
border-radius:28px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
text-align:left;
transition:.25s ease;
min-height:300px;
}

.promo-therapy-card:hover{
transform:translateY(-6px);
border-color:rgba(255,255,255,.2);
}

.promo-card-glow{
position:absolute;
inset:auto -20% -40% auto;
width:180px;
height:180px;
filter:blur(60px);
opacity:.16;
border-radius:50%;
}

.promo-icon-wrap{
width:88px;
height:88px;
border-radius:24px;
display:flex;
align-items:center;
justify-content:center;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.06);
margin-bottom:1.2rem;
}

.promo-icon{
font-size:2.3rem;
animation:floatPromo 5s ease-in-out infinite;
}

@keyframes floatPromo{

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

.promo-card-content h3{
color:white;
font-size:1.2rem;
margin-bottom:.8rem;
}

.promo-duration{
color:#d2d2d2;
font-size:.9rem;
margin-bottom:1rem;
}

.promo-desc{
line-height:1.8;
color:#afafaf;
font-size:.96rem;
}

.promo-price{
margin-top:1.4rem;
font-size:1.35rem;
font-weight:800;
color:var(--valtara-oro);
}

.promo-mini-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
gap:1rem;
margin-top:2rem;
}

.promo-mini-card{
padding:1.3rem;
border-radius:22px;
border:1px solid rgba(255,255,255,.08);
background:rgba(255,255,255,.03);
cursor:pointer;
transition:.2s ease;
text-align:left;
}

.promo-mini-card:hover{
transform:translateY(-4px);
}

.promo-mini-card h4{
color:white;
margin-bottom:.7rem;
}

.promo-mini-card p{
color:#afafaf;
line-height:1.7;
font-size:.93rem;
margin-bottom:1rem;
}

.promo-mini-card span{
color:var(--valtara-oro);
font-weight:700;
}

.promo-nav{
display:flex;
justify-content:space-between;
gap:1rem;
margin-top:2rem;
flex-wrap:wrap;
}

.promo-nav button{
border:none;
cursor:pointer;
padding:1rem 1.4rem;
border-radius:999px;
font-weight:700;
}

.promo-back{
background:rgba(255,255,255,.06);
color:white;
}

.promo-next{
background:var(--valtara-oro);
color:black;
}

.promo-summary{
padding:2rem;
border-radius:28px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
}

.promo-summary-line{
display:flex;
justify-content:space-between;
gap:1rem;
padding:.8rem 0;
border-bottom:1px solid rgba(255,255,255,.06);
color:#d6d6d6;
}

.promo-total{
font-size:1.7rem;
font-weight:900;
color:var(--valtara-oro);
margin-top:1.6rem;
text-align:right;
}

.promo-cta{
margin-top:2rem;
display:flex;
flex-wrap:wrap;
gap:1rem;
}

.promo-cta a{
flex:1;
text-align:center;
padding:1.1rem 1.5rem;
border-radius:999px;
text-decoration:none;
font-weight:800;
background:#25D366;
color:white;
}

.promo-note{
margin-top:2rem;
padding:1.3rem;
border-radius:20px;
background:rgba(242,201,76,.06);
border:1px solid rgba(242,201,76,.14);
color:#d4d4d4;
line-height:1.8;
}

</style>

<section class="promo-book-wrap">

<div class="promo-book-header">

<h2>
Promociones Inteligentes
</h2>

<p>

Selecciona tu terapia,
personaliza tu experiencia
y obtén beneficios exclusivos
disponibles en Reforma 195
y próxima apertura cerca de Metro Eugenia.

</p>

</div>

<div class="promo-book">

<!-- STEP 1 -->

<div
class="promo-step active"
id="promo-step-1">

<h3 style="color:white;font-size:2rem;margin-bottom:2rem;">
1. Elige tu terapia
</h3>

<div class="promo-grid">

${buildTherapies()}

</div>

</div>

<!-- STEP 2 -->

<div
class="promo-step"
id="promo-step-2">

<h3 style="color:white;font-size:2rem;">
2. Aromaterapia
</h3>

<p style="color:#aaa;line-height:1.8;">
Complementa tu experiencia sensorial.
</p>

<div class="promo-mini-grid">

${buildAromas()}

</div>

<div class="promo-nav">

<button
class="promo-back"
type="button"
onclick="ValtaraPromoBook.prev()">

← Regresar

</button>

</div>

</div>

<!-- STEP 3 -->

<div
class="promo-step"
id="promo-step-3">

<h3 style="color:white;font-size:2rem;">
3. Promociones disponibles
</h3>

<p style="color:#aaa;line-height:1.8;">
Las promociones no son acumulables entre sí.
</p>

<div class="promo-mini-grid">

${buildPromos()}

</div>

<div class="promo-note">

<strong>Condiciones:</strong><br><br>

💎 Cortesía de $169 válida únicamente lunes y martes
en las primeras 10 sesiones después de la 1 PM.<br><br>

☀️ 20% OFF válido jueves a domingo antes de las 2 PM.<br><br>

🍵 Después de las 7 PM algunas terapias incluyen té de frutos rojos de cortesía.

</div>

<div class="promo-nav">

<button
class="promo-back"
type="button"
onclick="ValtaraPromoBook.prev()">

← Regresar

</button>

</div>

</div>

<!-- STEP 4 -->

<div
class="promo-step"
id="promo-step-4">

<h3 style="color:white;font-size:2rem;margin-bottom:2rem;">
Resumen de tu experiencia
</h3>

<div class="promo-summary">

<div id="promo-summary-content"></div>

<div
class="promo-total"
id="promo-total">
$0 MXN
</div>

<div class="promo-cta">

<a
id="promo-whatsapp-link"
target="_blank"
href="#">

<i class="fa-brands fa-whatsapp"></i>
Continuar por WhatsApp

</a>

</div>

</div>

<div class="promo-nav">

<button
class="promo-back"
type="button"
onclick="ValtaraPromoBook.prev()">

← Regresar

</button>

</div>

</div>

</div>

</section>

`;

const state = {

step:1,
therapy:null,
aroma:null,
promo:null

};

function go(step){

state.step = step;

document.querySelectorAll('.promo-step').forEach((el)=>{
el.classList.remove('active');
});

document
.getElementById('promo-step-' + step)
?.classList.add('active');

}

function calculate(){

if(!state.therapy) return;

let subtotal = state.therapy.precio;

if(state.aroma){
subtotal += state.aroma.extra;
}

let discount = 0;

if(state.promo){

if(state.promo.tipo === 'descuento'){
discount = state.promo.monto;
}

if(state.promo.tipo === 'porcentaje'){
discount = subtotal * (state.promo.monto / 100);
}

}

const total = Math.max(subtotal - discount,0);

const container =
document.getElementById('promo-summary-content');

if(container){

container.innerHTML = `

<div class="promo-summary-line">
<span>Terapia</span>
<strong>${state.therapy.nombre}</strong>
</div>

<div class="promo-summary-line">
<span>Duración</span>
<strong>${state.therapy.duracion}</strong>
</div>

<div class="promo-summary-line">
<span>Aromaterapia</span>
<strong>
${state.aroma
? state.aroma.nombre
: 'Sin aromaterapia'}
</strong>
</div>

<div class="promo-summary-line">
<span>Promoción</span>
<strong>
${state.promo
? state.promo.nombre
: 'Sin promoción'}
</strong>
</div>

<div class="promo-summary-line">
<span>Subtotal</span>
<strong>${money(subtotal)}</strong>
</div>

<div class="promo-summary-line">
<span>Descuento</span>
<strong>-${money(discount)}</strong>
</div>

`;

}

const totalNode =
document.getElementById('promo-total');

if(totalNode){
totalNode.textContent = money(total);
}

const link =
document.getElementById('promo-whatsapp-link');

if(link){

const message = encodeURIComponent(

`Hola, quiero agendar:\n\n` +
`🌿 Terapia: ${state.therapy.nombre}\n` +
`⏱️ Duración: ${state.therapy.duracion}\n` +
`🕯️ Aromaterapia: ${state.aroma ? state.aroma.nombre : 'No'}\n` +
`🎁 Promoción: ${state.promo ? state.promo.nombre : 'Ninguna'}\n\n` +
`💰 Total estimado: ${money(total)}\n\n` +
`Sucursal principal: Reforma 195\n` +
`Próxima apertura: Metro Eugenia`

);

link.href =
'https://wa.me/' +
WHATSAPP_NUMBER +
'?text=' +
message;

}

}

global.ValtaraPromoBook = {

next(){
go(state.step + 1);
},

prev(){
go(state.step - 1);
},

init(){

document.addEventListener('click',(e)=>{

const therapy =
e.target.closest('.promo-therapy-card');

if(therapy){

const id = therapy.dataset.id;

state.therapy =
TERAPIAS.find((t)=>t.id === id);

go(2);

}

const aroma =
e.target.closest('[data-aroma]');

if(aroma){

state.aroma = {

nombre: aroma.dataset.aroma,
extra: Number(aroma.dataset.extra)

};

go(3);

}

const promo =
e.target.closest('[data-promo]');

if(promo){

const id = promo.dataset.promo;

state.promo =
PROMOCIONES.find((p)=>p.id === id);

calculate();

go(4);

}

});

}

};

function autoInit(){

if(document.querySelector('.promo-book')){

global.ValtaraPromoBook.init();

return;

}

setTimeout(autoInit,120);

}

if(document.readyState === 'loading'){

document.addEventListener(
'DOMContentLoaded',
autoInit
);

}else{

setTimeout(autoInit,120);

}

})(window);
