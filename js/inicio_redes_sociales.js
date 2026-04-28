/**
 * VALTARA — ZONA DE BIENESTAR INTERACTIVO
 * 4 widgets: respiración guiada, ritual por hora,
 * termómetro de estrés y recomendador de aromaterapia.
 * inicio_redes_sociales.js — carpeta js/
 */
window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_redes_sociales = `
<div class="reveal" style="margin-top:6rem;">
<div style="text-align:center;margin-bottom:2.5rem;">
    <p style="font-size:0.78rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--valtara-cian-brillante);margin:0 0 0.8rem;">Tu momento · Ahora mismo</p>
    <h3 style="font-family:var(--font-accent);font-size:2.4rem;color:var(--valtara-blanco);margin:0;font-weight:400;">Zona de Bienestar</h3>
</div>

<div id="widget-respiracion" style="background:linear-gradient(135deg,rgba(0,255,204,0.04),rgba(5,5,10,0.88));border:1px solid rgba(0,255,204,0.14);border-radius:2rem;padding:3rem 2rem;text-align:center;margin-bottom:1.5rem;">
    <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(0,255,204,0.6);margin:0 0 0.8rem;">Ejercicio de respiración</p>
    <h4 style="font-family:var(--font-accent);font-size:1.8rem;color:var(--valtara-blanco);margin:0 0 2rem;font-weight:400;">Técnica 4-4-6 · Desactivación del cortisol</h4>
    <div style="position:relative;display:inline-flex;align-items:center;justify-content:center;margin-bottom:2rem;cursor:pointer;" id="breath-circle-wrapper" role="button" aria-label="Iniciar ejercicio de respiración" tabindex="0">
        <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true" style="position:absolute;">
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0,255,204,0.08)" stroke-width="2"/>
            <circle id="breath-ring-progress" cx="100" cy="100" r="90" fill="none" stroke="rgba(0,255,204,0.5)" stroke-width="2.5" stroke-dasharray="565" stroke-dashoffset="565" transform="rotate(-90 100 100)" style="transition:stroke-dashoffset 0.1s linear;"/>
        </svg>
        <div id="breath-circle" style="width:130px;height:130px;border-radius:50%;background:radial-gradient(circle,rgba(0,255,204,0.18) 0%,rgba(0,0,0,0) 70%);border:1.5px solid rgba(0,255,204,0.3);display:flex;flex-direction:column;align-items:center;justify-content:center;transition:transform 4s ease-in-out,border-color 0.5s ease;position:relative;z-index:1;">
            <i class="fa-solid fa-wind" style="font-size:2rem;color:var(--valtara-cian-brillante);margin-bottom:0.4rem;" aria-hidden="true"></i>
            <span id="breath-label" style="font-size:0.78rem;font-family:'Lato',sans-serif;color:rgba(255,255,255,0.6);letter-spacing:0.08em;text-transform:uppercase;">Toca para iniciar</span>
        </div>
    </div>
    <div style="display:flex;justify-content:center;gap:2rem;margin-bottom:2rem;" aria-hidden="true">
        <div style="text-align:center;"><div style="font-size:1.4rem;font-weight:700;color:var(--valtara-cian-brillante);font-family:var(--font-accent);" id="breath-count">-</div><div style="font-size:0.7rem;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;">Ciclo</div></div>
        <div style="text-align:center;"><div style="font-size:1.4rem;font-weight:700;color:var(--valtara-oro);font-family:var(--font-accent);" id="breath-timer">-</div><div style="font-size:0.7rem;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;">Segundos</div></div>
    </div>
    <p id="breath-benefit" style="color:rgba(255,255,255,0.35);font-size:0.88rem;line-height:1.7;max-width:380px;margin:0 auto;">La técnica 4-4-6 activa el nervio vago y reduce el cortisol sérico en menos de 3 minutos.</p>
</div>

<div id="widget-ritual" style="background:linear-gradient(135deg,rgba(212,175,55,0.05),rgba(5,5,10,0.88));border:1px solid rgba(212,175,55,0.14);border-radius:2rem;padding:3rem 2rem;margin-bottom:1.5rem;">
    <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(212,175,55,0.6);margin:0 0 0.8rem;text-align:center;">Ritual del momento</p>
    <h4 style="font-family:var(--font-accent);font-size:1.8rem;color:var(--valtara-blanco);margin:0 0 2rem;font-weight:400;text-align:center;" id="ritual-titulo">Cargando...</h4>
    <div style="display:grid;grid-template-columns:auto 1fr;gap:1.5rem;align-items:start;background:rgba(255,255,255,0.03);border-radius:1.2rem;padding:1.5rem;">
        <div style="width:52px;height:52px;border-radius:50%;border:1.5px solid rgba(212,175,55,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;background:rgba(212,175,55,0.07);">
            <i id="ritual-icono" class="fa-solid fa-sun" style="font-size:1.5rem;color:var(--valtara-oro);" aria-hidden="true"></i>
        </div>
        <div>
            <p id="ritual-descripcion" style="color:var(--valtara-gris-texto);font-size:1rem;line-height:1.75;margin:0 0 1rem;"></p>
            <div id="ritual-pasos" style="display:flex;flex-direction:column;gap:0.6rem;"></div>
        </div>
    </div>
    <div style="text-align:center;margin-top:1.8rem;">
        <a id="ritual-wa-btn" href="https://wa.me/5213348572070" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:10px;background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.35);color:var(--valtara-oro);padding:10px 22px;border-radius:30px;text-decoration:none;font-size:0.88rem;font-weight:600;font-family:'Lato',sans-serif;">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Profundizar con un especialista
        </a>
    </div>
</div>

<div id="widget-estres" style="background:linear-gradient(135deg,rgba(123,47,190,0.05),rgba(5,5,10,0.88));border:1px solid rgba(123,47,190,0.18);border-radius:2rem;padding:3rem 2rem;margin-bottom:1.5rem;">
    <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(178,127,255,0.7);margin:0 0 0.8rem;text-align:center;">Termómetro de estrés</p>
    <h4 style="font-family:var(--font-accent);font-size:1.8rem;color:var(--valtara-blanco);margin:0 0 0.6rem;font-weight:400;text-align:center;">Cuánto estrés llevas hoy</h4>
    <p style="color:rgba(255,255,255,0.35);font-size:0.85rem;text-align:center;margin:0 0 2.5rem;">Desliza para calibrar tu nivel de tensión muscular actual.</p>
    <div style="padding:0 1rem;margin-bottom:1.5rem;">
        <input type="range" id="estres-slider" min="1" max="10" value="5" aria-label="Nivel de estrés del 1 al 10" style="width:100%;height:6px;border-radius:3px;-webkit-appearance:none;appearance:none;background:linear-gradient(90deg,#00FFCC 0%,#FFD700 50%,#FF6B35 100%);cursor:pointer;outline:none;">
    </div>
    <div style="text-align:center;margin-bottom:2rem;">
        <div id="estres-nivel-num" style="font-family:var(--font-accent);font-size:3.5rem;font-weight:600;line-height:1;color:#B97FFF;">5</div>
        <div id="estres-nivel-label" style="font-size:0.85rem;color:rgba(255,255,255,0.45);margin-top:0.4rem;text-transform:uppercase;letter-spacing:0.1em;">Tensión moderada</div>
    </div>
    <div id="estres-resultado" style="background:rgba(123,47,190,0.08);border:1px solid rgba(123,47,190,0.2);border-radius:1.2rem;padding:1.5rem;text-align:left;margin-bottom:1.8rem;">
        <p style="font-size:0.78rem;font-weight:700;color:#B97FFF;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 0.6rem;">Análisis biomecánico</p>
        <p id="estres-analisis" style="color:var(--valtara-gris-texto);font-size:0.95rem;line-height:1.75;margin:0 0 1rem;"></p>
        <p style="font-size:0.78rem;font-weight:700;color:var(--valtara-oro);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 0.6rem;">Protocolo sugerido</p>
        <p id="estres-protocolo" style="color:var(--valtara-gris-texto);font-size:0.95rem;line-height:1.75;margin:0;"></p>
    </div>
    <div style="text-align:center;">
        <a id="estres-wa-btn" href="https://wa.me/5213348572070" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#000;padding:11px 24px;border-radius:30px;text-decoration:none;font-size:0.9rem;font-weight:700;font-family:'Lato',sans-serif;box-shadow:0 6px 20px rgba(37,211,102,0.3);">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> <span id="estres-wa-texto">Reservar sesión ahora</span>
        </a>
    </div>
</div>

<div id="widget-aroma" style="background:linear-gradient(135deg,rgba(255,107,53,0.04),rgba(5,5,10,0.88));border:1px solid rgba(255,107,53,0.14);border-radius:2rem;padding:3rem 2rem;">
    <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,159,122,0.7);margin:0 0 0.8rem;text-align:center;">Aromaterapia clínica</p>
    <h4 style="font-family:var(--font-accent);font-size:1.8rem;color:var(--valtara-blanco);margin:0 0 0.6rem;font-weight:400;text-align:center;">Qué necesita tu sistema nervioso</h4>
    <p style="color:rgba(255,255,255,0.35);font-size:0.85rem;text-align:center;margin:0 0 2rem;">Elige tu estado predominante ahora mismo.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:2rem;" role="radiogroup" aria-label="Estado emocional actual">
        <button class="aroma-opt" data-aroma="tension" style="padding:1.1rem 0.8rem;border-radius:1rem;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:0.6rem;" aria-pressed="false"><span style="font-size:1.6rem;" aria-hidden="true">&#128544;</span><span style="font-size:0.82rem;color:rgba(255,255,255,0.6);font-family:'Lato',sans-serif;text-align:center;line-height:1.3;">Tensión y sobrecarga</span></button>
        <button class="aroma-opt" data-aroma="agotamiento" style="padding:1.1rem 0.8rem;border-radius:1rem;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:0.6rem;" aria-pressed="false"><span style="font-size:1.6rem;" aria-hidden="true">&#128558;</span><span style="font-size:0.82rem;color:rgba(255,255,255,0.6);font-family:'Lato',sans-serif;text-align:center;line-height:1.3;">Agotamiento profundo</span></button>
        <button class="aroma-opt" data-aroma="ansiedad" style="padding:1.1rem 0.8rem;border-radius:1rem;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:0.6rem;" aria-pressed="false"><span style="font-size:1.6rem;" aria-hidden="true">&#128560;</span><span style="font-size:0.82rem;color:rgba(255,255,255,0.6);font-family:'Lato',sans-serif;text-align:center;line-height:1.3;">Ansiedad y mente acelerada</span></button>
        <button class="aroma-opt" data-aroma="restauracion" style="padding:1.1rem 0.8rem;border-radius:1rem;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:0.6rem;" aria-pressed="false"><span style="font-size:1.6rem;" aria-hidden="true">&#127807;</span><span style="font-size:0.82rem;color:rgba(255,255,255,0.6);font-family:'Lato',sans-serif;text-align:center;line-height:1.3;">Quiero restauración total</span></button>
    </div>
    <div id="aroma-resultado" style="display:none;background:rgba(255,107,53,0.06);border:1px solid rgba(255,107,53,0.2);border-radius:1.2rem;padding:1.5rem;margin-bottom:1.5rem;text-align:left;">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:1rem;">
            <div id="aroma-icono-res" style="font-size:2.2rem;">&#127800;</div>
            <div><p style="font-size:0.75rem;font-weight:700;color:#FF9F7A;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 0.3rem;">Formula recomendada</p><p id="aroma-nombre" style="font-family:var(--font-accent);font-size:1.3rem;color:var(--valtara-blanco);margin:0;"></p></div>
        </div>
        <p id="aroma-descripcion" style="color:var(--valtara-gris-texto);font-size:0.93rem;line-height:1.75;margin:0 0 1rem;"></p>
        <p style="font-size:0.78rem;font-weight:700;color:var(--valtara-oro);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 0.5rem;">Se aplica en:</p>
        <p id="aroma-servicio" style="color:var(--valtara-gris-texto);font-size:0.93rem;line-height:1.75;margin:0;"></p>
    </div>
    <div id="aroma-cta" style="text-align:center;display:none;">
        <a id="aroma-wa-btn" href="https://wa.me/5213348572070" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#000;padding:11px 24px;border-radius:30px;text-decoration:none;font-size:0.9rem;font-weight:700;font-family:'Lato',sans-serif;box-shadow:0 6px 20px rgba(37,211,102,0.3);">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> <span id="aroma-wa-texto">Incluir en mi sesion</span>
        </a>
    </div>
</div>
</div>

<script>
(function() {
var PHASES=[{label:'Inhala',duration:4,scale:'1.28',bc:'rgba(0,255,204,0.8)'},{label:'Reten',duration:4,scale:'1.28',bc:'rgba(212,175,55,0.8)'},{label:'Exhala',duration:6,scale:'1.0',bc:'rgba(0,255,204,0.3)'}];
var running=false,pidx=0,cycle=0,tickIv=null,CYCLES=5,C=565;
function startBreath(){if(running)return;running=true;pidx=0;cycle=0;var b=document.getElementById('breath-benefit');if(b)b.textContent='Sigue el ritmo. Inhala por la nariz, exhala por la boca.';runPhase();}
function runPhase(){if(cycle>=CYCLES){endBreath();return;}var p=PHASES[pidx],circ=document.getElementById('breath-circle'),lbl=document.getElementById('breath-label'),cnt=document.getElementById('breath-count'),tmr=document.getElementById('breath-timer'),prg=document.getElementById('breath-ring-progress');
if(circ){circ.style.transform='scale('+p.scale+')';circ.style.borderColor=p.bc;}if(lbl)lbl.textContent=p.label;if(cnt)cnt.textContent=(cycle+1)+' / '+CYCLES;
var elapsed=0;clearInterval(tickIv);tickIv=setInterval(function(){elapsed++;var rem=p.duration-elapsed;if(tmr)tmr.textContent=rem;if(prg)prg.style.strokeDashoffset=C*(1-elapsed/p.duration);if(elapsed>=p.duration){clearInterval(tickIv);pidx++;if(pidx>=PHASES.length){pidx=0;cycle++;}runPhase();}},1000);}
function endBreath(){running=false;var circ=document.getElementById('breath-circle'),lbl=document.getElementById('breath-label'),prg=document.getElementById('breath-ring-progress'),b=document.getElementById('breath-benefit');
if(circ){circ.style.transform='scale(1)';circ.style.borderColor='rgba(0,255,204,0.3)';}if(lbl)lbl.textContent='Completado!';if(prg)prg.style.strokeDashoffset='0';if(b)b.textContent='Excelente. Tu cortisol ha comenzado a bajar. Agenda una sesion para restauracion completa.';}
var p1=setInterval(function(){var w=document.getElementById('breath-circle-wrapper');if(!w)return;clearInterval(p1);w.addEventListener('click',startBreath);w.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')startBreath();});},300);

var RITUALES={manana:{titulo:'Ritual de Activacion Matutina',icono:'fa-sun',desc:'Las primeras 2 horas del dia determinan el tono neuromuscular. Este protocolo activa la corteza prefrontal y prepara los musculos posturales.',pasos:['30 seg · Rotaciones lentas de cuello: 5 hacia cada lado','45 seg · Retraccion escapular: hombros atras y abajo','60 seg · Respiracion diafragmatica: mano en el abdomen','30 seg · Estiramiento lateral del cuello'],wa:'Hola%2C+me+interesa+el+protocolo+de+activacion+matutina+de+Valtara.'},tarde:{titulo:'Descompresion de Mediodía Ejecutivo',icono:'fa-briefcase',desc:'Despues de 4+ horas frente a pantalla, el psoas y los flexores cervicales estan bajo presion constante. Este ritual interrumpe el ciclo de tension.',pasos:['60 seg · Torso hacia adelante, brazos colgando','45 seg · Masajea la base del craneo con pulgares','30 seg · Ojos cerrados, presion suave en parpados','60 seg · Camina descalzo si es posible'],wa:'Hola%2C+quiero+el+protocolo+de+descompresion+ejecutiva+de+Valtara.'},noche:{titulo:'Protocolo de Descarga Nocturna',icono:'fa-moon',desc:'La tension diurna migra al sistema nervioso autonomo. Este ritual activa el nervio vago y prepara el cuerpo para la reparacion muscular nocturna.',pasos:['2 min · Postura del nino en el piso','90 seg · Masaje de pantorrillas de abajo hacia arriba','60 seg · Tecnica 4-7-8: inhala 4, reten 7, exhala 8','30 seg · Masaje suave de la mandibula con nudillos'],wa:'Hola%2C+quiero+el+protocolo+de+descarga+nocturna+de+Valtara.'},madrugada:{titulo:'Protocolo de Regulacion Nocturna',icono:'fa-star-and-crescent',desc:'Si estas despierto ahora, tu sistema nervioso simpatico esta activo cuando deberia estar en recuperacion. Senal de estres cronico no procesado.',pasos:['3 min · Body scan de pies a cabeza','60 seg · Abraza tus rodillas al pecho','2 min · Respiracion cuadrada: 4-4-4-4','Considera: el insomnio cronico tiene correlato con tension lumbar'],wa:'Hola%2C+tengo+dificultad+para+dormir+y+quiero+informacion+sobre+el+protocolo+Valtara.'}};
var p2=setInterval(function(){var t=document.getElementById('ritual-titulo');if(!t)return;clearInterval(p2);
var h=new Date().getHours(),r;
if(h>=5&&h<=11)r=RITUALES.manana;else if(h>=12&&h<=17)r=RITUALES.tarde;else if(h>=18&&h<=23)r=RITUALES.noche;else r=RITUALES.madrugada;
t.textContent=r.titulo;var ic=document.getElementById('ritual-icono');if(ic)ic.className='fa-solid '+r.icono;
var d=document.getElementById('ritual-descripcion');if(d)d.textContent=r.desc;
var ps=document.getElementById('ritual-pasos');if(ps)ps.innerHTML=r.pasos.map(function(p){return'<div style="display:flex;gap:10px;font-size:0.88rem;color:rgba(255,255,255,0.55);line-height:1.55;"><span style="color:var(--valtara-oro);">›</span><span>'+p+'</span></div>';}).join('');
var wa=document.getElementById('ritual-wa-btn');if(wa)wa.href='https://wa.me/5213348572070?text='+r.wa;},300);

var ED={1:{label:'Muy relajado',color:'#00FFCC',an:'Sistema parasimpatico activo. Ideal para sesiones preventivas y aromaterapia profunda.',pr:'Masaje Relajante 90 min · Ritual Lomi Lomi Supremo',wa:'Hola%2C+estoy+tranquilo+y+quiero+una+sesion+preventiva+en+Valtara.'},2:{label:'Tranquilo',color:'#00FFCC',an:'Baja tension muscular. Momento perfecto para trabajo corporal preventivo.',pr:'Masaje Ayurveda · Drenaje Linfatico Manual',wa:'Hola%2C+quiero+un+protocolo+preventivo+de+bienestar.'},3:{label:'Ligera tension',color:'#7AE8B0',an:'Tension incipiente en trapecios. Buen momento para intervenir antes de que formen nodulos.',pr:'Masaje Relajante 50 min · Liberacion miofascial',wa:'Hola%2C+tengo+ligera+tension+y+quiero+una+sesion+preventiva.'},4:{label:'Estres leve',color:'#A8D860',an:'Escalenos y suboccipitales acortandose. Patron tipico de 3-4 dias de trabajo intensivo.',pr:'Masaje Deportivo y Descompresion · Liberacion cervical',wa:'Hola%2C+tengo+estres+leve+y+tension+cervical.'},5:{label:'Tension moderada',color:'#FFD700',an:'Sistema nervioso simpatico parcialmente activado. El cortisol esta afectando el sueno y la digestion.',pr:'Masaje Relajante 90 min · Desactivacion del nervio vago',wa:'Hola%2C+tengo+tension+moderada+y+quiero+informacion.'},6:{label:'Carga alta',color:'#FFB347',an:'Contracturas activas en trapecios y cuadrado lumbar. Riesgo de cefalea en 24-48h.',pr:'Masaje Deportivo · Liberacion del psoas · Puntos gatillo',wa:'Hola%2C+tengo+carga+muscular+alta+y+dolor.+Pueden+atenderme%3F'},7:{label:'Estres severo',color:'#FF9F7A',an:'Tension miofascial generalizada. Posible bruxismo nocturno. Rango de movimiento reducido.',pr:'Masaje Neuro-Adaptativo 90 min · Puntos gatillo activos',wa:'Hola%2C+tengo+estres+severo+y+necesito+una+sesion+urgente.'},8:{label:'Cuerpo al limite',color:'#FF6B35',an:'Burnout fisico incipiente. Sistema nervioso no logra alternar entre simpatico y parasimpatico.',pr:'Ritual Lomi Lomi · Sonoterapia · Programa de 3 sesiones',wa:'Hola%2C+mi+cuerpo+esta+al+limite.+Necesito+un+protocolo+intensivo.'},9:{label:'Crisis muscular',color:'#E8445A',an:'Senales de alarma: posible contractura de esternocleidomastoideo o compresion de L4-L5.',pr:'Evaluacion biomedica + Masaje de descompresion de emergencia',wa:'Hola%2C+estoy+en+crisis+de+dolor+muscular+intenso.+Atiendenme%3F'},10:{label:'Emergencia tensional',color:'#FF1744',an:'Estado de tension maxima. Riesgo de torticolis o crisis lumbar aguda.',pr:'Atencion prioritaria · Cita ese mismo dia',wa:'Hola%2C+tengo+dolor+extremo+y+necesito+atencion+urgente+hoy.'}};
var p3=setInterval(function(){var sl=document.getElementById('estres-slider');if(!sl)return;clearInterval(p3);
function upd(v){var d=ED[v]||ED[5];var n=document.getElementById('estres-nivel-num'),l=document.getElementById('estres-nivel-label'),a=document.getElementById('estres-analisis'),pr=document.getElementById('estres-protocolo'),wb=document.getElementById('estres-wa-btn'),wt=document.getElementById('estres-wa-texto');
if(n){n.textContent=v;n.style.color=d.color;}if(l)l.textContent=d.label;if(a)a.textContent=d.an;if(pr)pr.textContent=d.pr;if(wb)wb.href='https://wa.me/5213348572070?text='+d.wa;if(wt)wt.textContent=v>=7?'Solicitar atencion urgente':'Reservar sesion ahora';}
sl.addEventListener('input',function(e){upd(parseInt(e.target.value));});upd(5);},300);

var AROMAS={tension:{ic:'&#127807;',nm:'Lavanda & Eucalipto Clinico',ds:'El linalool de la lavanda inhibe los receptores de acetilcolina reduciendo la hipertonia muscular. El eucalipto activa los receptores TRPM8 creando apertura toracica y liberacion del trapecio.',sv:'Masaje Deportivo y Descompresion · Masaje Relajante Neuro-Adaptativo',wa:'Hola%2C+me+interesa+el+protocolo+con+lavanda+y+eucalipto.'},agotamiento:{ic:'&#127818;',nm:'Naranja Dulce & Romero Camphor',ds:'El d-limoneno de la naranja eleva la serotonina sin sobreestimular. El romero camphor activa la circulacion periferica y restaura el tono muscular en tejidos fatigados cronicamente.',sv:'Masaje Ayurveda & Aromaterapia · Ritual Lomi Lomi Supremo',wa:'Hola%2C+me+interesa+el+protocolo+con+naranja+dulce+y+romero.'},ansiedad:{ic:'&#127800;',nm:'Ylang-Ylang & Vetiver de Haiti',ds:'El acetato de geraniol del ylang-ylang reduce la frecuencia cardiaca y la presion arterial. El vetiver actua sobre receptores GABA-A con efecto ansiolitico sin efectos secundarios.',sv:'Sonoterapia Inmersiva · Drenaje Linfatico Manual · Masaje Neuro-Adaptativo',wa:'Hola%2C+me+interesa+el+protocolo+con+ylang-ylang+y+vetiver.'},restauracion:{ic:'&#127773;',nm:'Sandalo & Incienso Boswellia',ds:'El santalol del sandalo activa los receptores de oxitocina induciendo bienestar profundo. La boswellia inhibe la inflamacion de bajo grado cronica, el enemigo silencioso del ejecutivo moderno.',sv:'Ritual Lomi Lomi Supremo · Masaje Ayurveda 90 min · Sonoterapia',wa:'Hola%2C+quiero+restauracion+total.+Me+interesa+el+protocolo+con+sandalo+e+incienso.'}};
var p4=setInterval(function(){var bs=document.querySelectorAll('.aroma-opt');if(!bs.length)return;clearInterval(p4);
bs.forEach(function(b){b.addEventListener('click',function(){var k=b.getAttribute('data-aroma'),d=AROMAS[k];if(!d)return;
bs.forEach(function(x){x.style.borderColor='rgba(255,255,255,0.1)';x.style.background='rgba(255,255,255,0.03)';x.setAttribute('aria-pressed','false');});
b.style.borderColor='rgba(255,107,53,0.55)';b.style.background='rgba(255,107,53,0.10)';b.setAttribute('aria-pressed','true');
var ri=document.getElementById('aroma-icono-res'),rn=document.getElementById('aroma-nombre'),rd=document.getElementById('aroma-descripcion'),rs=document.getElementById('aroma-servicio'),rr=document.getElementById('aroma-resultado'),rc=document.getElementById('aroma-cta'),rb=document.getElementById('aroma-wa-btn'),rt=document.getElementById('aroma-wa-texto');
if(ri)ri.innerHTML=d.ic;if(rn)rn.textContent=d.nm;if(rd)rd.textContent=d.ds;if(rs)rs.textContent=d.sv;if(rb)rb.href='https://wa.me/5213348572070?text='+d.wa;if(rt)rt.textContent='Incluir en mi sesion';if(rr)rr.style.display='block';if(rc)rc.style.display='block';});});},300);
})();
</script>
`
;
