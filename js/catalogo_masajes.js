window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.catalogo_masajes = `

<style>

.vt-therapy-visual{
    width:110px;
    height:110px;
    border-radius:28px;
    position:relative;
    overflow:hidden;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:1.6rem;
    isolation:isolate;
}

.vt-therapy-visual::before{
    content:'';
    position:absolute;
    inset:-30%;
    opacity:.8;
    animation:vtRotate 10s linear infinite;
}

.vt-therapy-visual::after{
    content:'';
    position:absolute;
    width:55%;
    height:55%;
    border-radius:50%;
    background:rgba(255,255,255,.08);
    backdrop-filter:blur(12px);
}

.vt-therapy-icon{
    position:relative;
    z-index:2;
    font-size:2.6rem;
    animation:vtFloat 5s ease-in-out infinite;
}

.vt-relax::before{
    background:
    conic-gradient(
    from 0deg,
    rgba(0,255,224,.8),
    transparent,
    rgba(0,255,224,.15),
    transparent,
    rgba(0,255,224,.7)
    );
}

.vt-sport::before{
    background:
    conic-gradient(
    from 0deg,
    rgba(255,85,85,.9),
    transparent,
    rgba(255,85,85,.2),
    transparent,
    rgba(255,85,85,.9)
    );
}

.vt-ayurveda::before{
    background:
    conic-gradient(
    from 0deg,
    rgba(242,201,76,.9),
    transparent,
    rgba(242,201,76,.2),
    transparent,
    rgba(242,201,76,.8)
    );
}

.vt-lomi::before{
    background:
    conic-gradient(
    from 0deg,
    rgba(255,170,0,.95),
    transparent,
    rgba(255,170,0,.2),
    transparent,
    rgba(255,170,0,.95)
    );
}

.vt-neuro::before{
    background:
    conic-gradient(
    from 0deg,
    rgba(67,97,238,.95),
    transparent,
    rgba(67,97,238,.2),
    transparent,
    rgba(67,97,238,.95)
    );
}

.vt-energy::before{
    background:
    conic-gradient(
    from 0deg,
    rgba(255,255,255,.9),
    transparent,
    rgba(255,255,255,.15),
    transparent,
    rgba(255,255,255,.9)
    );
}

.vt-reductive::before{
    background:
    conic-gradient(
    from 0deg,
    rgba(155,89,255,.95),
    transparent,
    rgba(155,89,255,.2),
    transparent,
    rgba(155,89,255,.95)
    );
}

@keyframes vtRotate{

    from{
        transform:rotate(0deg);
    }

    to{
        transform:rotate(360deg);
    }

}

@keyframes vtFloat{

    0%{
        transform:translateY(0px);
    }

    50%{
        transform:translateY(-8px);
    }

    100%{
        transform:translateY(0px);
    }

}

.vt-premium-badge{
    display:inline-flex;
    align-items:center;
    gap:.6rem;
    padding:.7rem 1.2rem;
    border-radius:999px;
    background:rgba(242,201,76,.08);
    border:1px solid rgba(242,201,76,.18);
    color:var(--valtara-oro);
    font-size:.8rem;
    letter-spacing:.14em;
    text-transform:uppercase;
    margin-bottom:1.4rem;
}

.vt-cta{
    margin-top:1.4rem;
    display:flex;
    gap:1rem;
    flex-wrap:wrap;
}

.vt-note{
    margin-top:1rem;
    padding:1rem;
    border-radius:18px;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.06);
    color:#bbb;
    line-height:1.8;
    font-size:.95rem;
}

</style>

<div style="text-align:center;max-width:1000px;margin:0 auto 5rem auto;">

    <div class="vt-premium-badge">
        <i class="fa-solid fa-crown fa-fade"></i>
        EXPERIENCIAS TERAPÉUTICAS VALTARA
    </div>

    <h2 style="
        font-family:var(--font-accent);
        font-size:clamp(2.8rem,6vw,4.5rem);
        color:var(--valtara-blanco);
        margin-bottom:2rem;
        line-height:1.05;
    " class="reveal">

        Catálogo de Terapias

    </h2>

    <p style="
        color:var(--valtara-gris-texto);
        font-size:1.25rem;
        line-height:1.9;
        max-width:860px;
        margin:auto;
    ">

        Terapias biomecánicas, relajantes y sensoriales diseñadas
        para aliviar tensión física, emocional y mental
        mediante experiencias inmersivas de restauración corporal.

    </p>

</div>

<div class="grid-container">

<!-- RELAJANTE -->

<article class="glass-card zig-zag reveal">

<div class="vt-therapy-visual vt-relax">
    <i class="fa-solid fa-spa vt-therapy-icon"
    style="color:var(--valtara-cian-brillante);"></i>
</div>

<div class="card-content-wrapper">

<h3>
Masaje Relajante Neuro Adaptativo
</h3>

<div class="card-meta-info">

<span class="duracion">
<i class="fa-solid fa-clock"></i>
50 Min / 90 Min
</span>

<span class="precio">
$699 / $899 MXN
</span>

</div>

<p class="marketing-text">

🌙 Diseñado para disminuir ansiedad,
estrés acumulado,
sobrecarga emocional
y tensión corporal profunda.

Movimientos fluidos,
presiones suaves
y estimulación sensorial relajante
que ayudan al cuerpo a salir del estado de alerta constante.

</p>

<div class="vt-note">

✨ Ideal para personas con agotamiento mental,
burnout,
fatiga corporativa
o dificultad para desconectar.

</div>

<div class="vt-cta">

<a
href="https://wa.me/5213348572070?text=Hola,%20quiero%20agendar%20el%20Masaje%20Relajante."
target="_blank"
class="btn-agenda-ahora"
style="
background:var(--valtara-cian-brillante);
color:var(--valtara-negro-fondo);
border-color:var(--valtara-cian-brillante);
flex:1;
">

<i class="fa-brands fa-whatsapp fa-beat"></i>
Reservar experiencia

</a>

</div>

</div>
</article>

<!-- DEPORTIVO -->

<article class="glass-card zig-zag reveal">

<div class="vt-therapy-visual vt-sport">
    <i class="fa-solid fa-dumbbell vt-therapy-icon"
    style="color:#ff5555;"></i>
</div>

<div class="card-content-wrapper">

<h3>
Masaje Deportivo & Descompresión
</h3>

<div class="card-meta-info">

<span class="duracion">
<i class="fa-solid fa-clock"></i>
50 Minutos
</span>

<span class="precio">
$729 MXN
</span>

</div>

<p class="marketing-text">

⚡ Terapia profunda enfocada en liberar contracturas,
fatiga muscular,
rigidez
y sobrecarga física acumulada.

Ideal para entrenamiento intenso,
largas jornadas laborales
o tensión muscular persistente.

</p>

<div class="vt-note">

🔥 Incluye técnicas biomecánicas,
presión profunda
y descompresión muscular avanzada.

</div>

<div class="vt-cta">

<a
href="https://wa.me/5213348572070?text=Hola,%20quiero%20agendar%20el%20Masaje%20Deportivo."
target="_blank"
class="btn-agenda-ahora"
style="
background:#ff5555;
color:white;
border-color:#ff5555;
">

<i class="fa-brands fa-whatsapp fa-beat"></i>
Agendar recuperación

</a>

</div>

</div>
</article>

<!-- AYURVEDA -->

<article class="glass-card zig-zag reveal">

<div class="vt-therapy-visual vt-ayurveda">
    <i class="fa-solid fa-leaf vt-therapy-icon"
    style="color:var(--valtara-oro);"></i>
</div>

<div class="card-content-wrapper">

<h3>
Ayurveda & Aromaterapia
</h3>

<div class="card-meta-info">

<span class="duracion">
<i class="fa-solid fa-clock"></i>
50 Minutos
</span>

<span class="precio">
$829 MXN
</span>

</div>

<p class="marketing-text">

🌿 Experiencia sensorial diseñada para relajar mente,
cuerpo
y sistema nervioso mediante aceites tibios,
aromaterapia
y masaje manual profundo.

</p>

<div class="vt-note">

🕯️ Perfecto para ansiedad,
agotamiento emocional
y necesidad de calma profunda.

</div>

<div class="vt-cta">

<a
href="https://wa.me/5213348572070?text=Hola,%20quiero%20Ayurveda%20y%20Aromaterapia."
target="_blank"
class="btn-agenda-ahora"
style="flex:1;">

<i class="fa-brands fa-whatsapp fa-beat"></i>
Reservar experiencia

</a>

</div>

</div>
</article>

<!-- ESFERAS -->

<article class="glass-card zig-zag reveal">

<div class="vt-therapy-visual vt-energy">
    <i class="fa-solid fa-circle-notch vt-therapy-icon"
    style="color:white;"></i>
</div>

<div class="card-content-wrapper">

<h3>
Esferas Chinas & Velas Aromáticas
</h3>

<div class="card-meta-info">

<span class="duracion">
<i class="fa-solid fa-clock"></i>
60 Minutos
</span>

<span class="precio">
$819 MXN
</span>

</div>

<p class="marketing-text">

🔮 Vibración sonora,
luz cálida,
estimulación sensorial
y relajación profunda en una experiencia inmersiva.

</p>

<div class="vt-note">

✨ Especialmente agradable para personas neurodivergentes,
hipersensibilidad sensorial
o estrés elevado.

</div>

<div class="vt-cta">

<a
href="https://wa.me/5213348572070?text=Hola,%20quiero%20Esferas%20Chinas%20y%20Velas."
target="_blank"
class="btn-agenda-ahora"
style="
background:white;
color:black;
border-color:white;
">

<i class="fa-brands fa-whatsapp fa-beat"></i>
Reservar experiencia sensorial

</a>

</div>

</div>
</article>

<!-- REDUCTIVO -->

<article class="glass-card zig-zag reveal">

<div class="vt-therapy-visual vt-reductive">
    <i class="fa-solid fa-child-reaching vt-therapy-icon"
    style="color:#b27fff;"></i>
</div>

<div class="card-content-wrapper">

<h3>
Reductivo & Maderoterapia
</h3>

<div class="card-meta-info">

<span class="duracion">
<i class="fa-solid fa-clock"></i>
Sesión / Paquete
</span>

<span class="precio">
$799 / $5,999 MXN
</span>

</div>

<p class="marketing-text">

✨ Terapia estética corporal enfocada en estimular circulación,
mejorar textura corporal
y complementar objetivos de bienestar físico.

</p>

<div class="vt-note">

🌸 Incluye maderoterapia,
estimulación manual
y geles reductivos especializados.

</div>

<div class="vt-cta">

<a
href="https://wa.me/5213348572070?text=Hola,%20quiero%20información%20de%20Reductivo%20y%20Maderoterapia."
target="_blank"
class="btn-agenda-ahora"
style="
background:#b27fff;
color:white;
border-color:#b27fff;
">

<i class="fa-brands fa-whatsapp fa-beat"></i>
Consultar tratamiento

</a>

</div>

</div>
</article>

<!-- PARÁLISIS -->

<article class="glass-card zig-zag reveal">

<div class="vt-therapy-visual vt-neuro">
    <i class="fa-solid fa-face-smile vt-therapy-icon"
    style="color:#4361EE;"></i>
</div>

<div class="card-content-wrapper">

<h3>
Terapia para Parálisis Facial
</h3>

<div class="card-meta-info">

<span class="duracion">
<i class="fa-solid fa-clock"></i>
45 Minutos
</span>

<span class="precio">
$529 MXN
</span>

</div>

<p class="marketing-text">

⚕️ Estimulación neuromuscular enfocada en recuperación funcional,
movilidad
y relajación muscular facial.

</p>

<div class="vt-note">

🧠 Protocolo adaptado según sensibilidad,
evolución
y necesidades del paciente.

</div>

<div class="vt-cta">

<a
href="https://wa.me/5213348572070?text=Hola,%20quiero%20información%20de%20Parálisis%20Facial."
target="_blank"
class="btn-agenda-ahora"
style="
background:#4361EE;
color:white;
border-color:#4361EE;
">

<i class="fa-brands fa-whatsapp fa-beat"></i>
Consultar valoración

</a>

</div>

</div>
</article>

<!-- SHIATSU -->

<article class="glass-card zig-zag reveal">

<div class="vt-therapy-visual vt-energy">
    <i class="fa-solid fa-chair vt-therapy-icon"
    style="color:white;"></i>
</div>

<div class="card-content-wrapper">

<h3>
Shiatsu en Cama • Complemento
</h3>

<div class="card-meta-info">

<span class="duracion">
<i class="fa-solid fa-clock"></i>
20 Minutos
</span>

<span class="precio">
$199 MXN
</span>

</div>

<p class="marketing-text">

🪷 Complemento relajante enfocado en cuello,
espalda alta,
hombros
y presión estratégica tipo Shiatsu.

</p>

<div class="vt-note">

✨ Disponible para acompañantes
o terapias participantes dentro de Valtara.

</div>

<div class="vt-cta">

<a
href="https://wa.me/5213348572070?text=Hola,%20quiero%20agregar%20Shiatsu%20en%20Cama."
target="_blank"
class="btn-agenda-ahora"
style="
background:white;
color:black;
border-color:white;
">

<i class="fa-brands fa-whatsapp fa-beat"></i>
Agregar complemento

</a>

</div>

</div>
</article>

<!-- LOMI -->

<article class="glass-card zig-zag reveal">

<div class="vt-therapy-visual vt-lomi">
    <i class="fa-solid fa-crown vt-therapy-icon"
    style="color:#ffaa00;"></i>
</div>

<div class="card-content-wrapper">

<h3>
Ritual Lomi Lomi Supremo
</h3>

<div class="card-meta-info">

<span class="duracion">
<i class="fa-solid fa-clock"></i>
Sesión Premium
</span>

<span class="precio">
$999 MXN
</span>

</div>

<p class="marketing-text">

🌊 Experiencia corporal premium inspirada en movimientos hawaianos,
aromaterapia,
fluidez oceánica
y relajación profunda.

</p>

<div class="vt-note">

👑 Ideal para burnout,
agotamiento extremo
y desconexión total.

</div>

<div class="vt-cta">

<a
href="https://wa.me/5213348572070?text=Hola,%20quiero%20reservar%20Lomi%20Lomi."
target="_blank"
class="btn-agenda-ahora"
style="
background:#ffaa00;
color:black;
border-color:#ffaa00;
">

<i class="fa-brands fa-whatsapp fa-beat"></i>
Reservar ritual premium

</a>

</div>

</div>
</article>

<!-- PRÓXIMAMENTE -->

<article
class="glass-card zig-zag reveal"
style="opacity:.82;">

<div class="vt-therapy-visual vt-ayurveda">
    <i class="fa-solid fa-hammer vt-therapy-icon"
    style="color:var(--valtara-oro);"></i>
</div>

<div class="card-content-wrapper">

<h3>
Cámara de Innovación Terapéutica
</h3>

<div class="card-meta-info">

<span class="duracion">
<i class="fa-solid fa-sparkles"></i>
Próximamente
</span>

<span class="precio">
Nuevos rituales
</span>

</div>

<p class="marketing-text">

🚧 Próximamente:
Ritual Geotermal,
Reflexología,
Shiatsu Tradicional,
Craneosacral
y experiencias sensoriales avanzadas.

</p>

<div class="vt-note">

✨ Desarrollados bajo estándares biomecánicos
y sensoriales Valtara.

</div>

<div class="vt-cta">

<a
href="https://wa.me/5213348572070?text=Hola,%20quiero%20entrar%20a%20lista%20de%20espera%20de%20nuevas%20terapias."
target="_blank"
class="btn-agenda-ahora"
style="
background:rgba(242,201,76,.12);
border:1px solid var(--valtara-oro);
color:var(--valtara-oro);
">

<i class="fa-brands fa-whatsapp fa-beat"></i>
Entrar a lista de espera

</a>

</div>

</div>
</article>

</div>

`;
