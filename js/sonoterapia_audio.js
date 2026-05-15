/* =========================================================
   VALTARA EXECUTIVE — SONOTERAPIA EXPANDIDA
   EXPANSIÓN MASIVA COMPLETA
========================================================= */

window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraAudioPlaylists = window.ValtaraAudioPlaylists || {};
window.ValtaraAudioEngine = window.ValtaraAudioEngine || {};

/* =========================================================
   HTML PRINCIPAL
========================================================= */

window.ValtaraModulos.sonoterapia_audio = `

<div style="text-align:center;max-width:1200px;margin:4rem auto 2rem auto;">
    <h3 style="
        color:var(--valtara-cian-brillante);
        font-family:var(--font-accent);
        font-size:3rem;
        margin-bottom:1rem;
    ">
        II. Frecuencias Acústicas
    </h3>

    <p style="
        color:var(--valtara-gris-texto);
        font-size:1.25rem;
        font-weight:300;
        letter-spacing:.1rem;
        text-transform:uppercase;
    ">
        Curaduría de Audio Botánico de Valtara
    </p>
</div>

<div class="glass-card reveal"
style="
    padding:4rem;
    max-width:1000px;
    margin:0 auto 5rem auto;
    border-color:var(--valtara-cian-brillante);
    background:rgba(0,0,0,.7);
    box-shadow:0 2rem 6rem rgba(0,255,255,.15);
">

    <div id="oasis-now-playing"
    style="
        text-align:center;
        color:var(--valtara-cian-brillante);
        font-size:1.8rem;
        font-family:var(--font-accent);
        margin-bottom:1rem;
        min-height:2.5rem;
        letter-spacing:1px;
    ">
        Selecciona una pista botánica para comenzar
    </div>

    <div id="valtara-next-track"
    style="
        text-align:center;
        color:rgba(255,255,255,.6);
        margin-bottom:2rem;
        font-size:.95rem;
        letter-spacing:.05rem;
    ">
        Radio Valtara lista
    </div>

    <div class="canvas-audio-wrapper"
    style="
        margin-bottom:2.5rem;
        border-radius:1.5rem;
        overflow:hidden;
        border:1px solid rgba(0,255,255,.2);
        background:radial-gradient(circle,
        rgba(0,255,255,.05) 0%,
        rgba(0,0,0,.9) 100%);
    ">
        <canvas id="oasis-visualizer"
        style="
            height:180px;
            width:100%;
            display:block;
        "></canvas>
    </div>

    <div class="oasis-player-controls"
    style="
        background:rgba(255,255,255,.03);
        padding:2.5rem;
        border-radius:1.5rem;
        border:1px solid rgba(0,255,255,.2);
        box-shadow:inset 0 0 2rem rgba(0,0,0,.5);
    ">

        <div style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:1.5rem;
            margin-bottom:2.5rem;
            color:var(--valtara-gris-texto);
            font-size:1.2rem;
        ">

            <span id="oasis-time-current"
            style="
                font-family:monospace;
                font-weight:bold;
            ">
                0:00
            </span>

            <input type="range"
            id="oasis-progress-bar"
            value="0"
            min="0"
            max="100"
            style="
                flex:1;
                accent-color:var(--valtara-cian-brillante);
                cursor:pointer;
                height:8px;
                border-radius:4px;
            ">

            <span id="oasis-time-total"
            style="
                font-family:monospace;
                font-weight:bold;
            ">
                0:00
            </span>

        </div>

        <div style="
            display:flex;
            align-items:center;
            justify-content:center;
            gap:2rem;
            flex-wrap:wrap;
        ">

            <button id="btn-prev-track"
            class="carousel-btn"
            style="width:70px;height:70px;">
                <i class="fa-solid fa-backward-step"></i>
            </button>

            <button class="master-play-btn"
            id="btn-master-play"
            style="
                margin:0;
                width:90px;
                height:90px;
                font-size:2.5rem;
                flex-shrink:0;
            ">
                <i class="fa-solid fa-play"></i>
            </button>

            <button id="btn-next-track"
            class="carousel-btn"
            style="width:70px;height:70px;">
                <i class="fa-solid fa-forward-step"></i>
            </button>

        </div>

        <div style="
            display:flex;
            align-items:center;
            justify-content:center;
            gap:1.2rem;
            color:var(--valtara-oro-suave);
            font-size:1.4rem;
            margin-top:2rem;
        ">

            <i class="fa-solid fa-volume-low"></i>

            <input type="range"
            id="oasis-volume-slider"
            min="0"
            max="1"
            step="0.01"
            value="0.7"
            style="
                width:220px;
                accent-color:var(--valtara-oro);
                cursor:pointer;
                height:6px;
            ">

            <i class="fa-solid fa-volume-high"></i>

        </div>

    </div>

</div>

<!-- MICRO DOSIS -->

<div style="
    max-width:1200px;
    margin:0 auto 1.5rem auto;
    padding-left:2rem;
    border-left:5px solid var(--valtara-verde-menta);
">

    <h4 style="
        color:var(--valtara-verde-menta);
        font-size:2rem;
        font-family:var(--font-accent);
        margin:0;
    ">
        Micro-Dosis Botánicas
    </h4>

    <p style="
        color:#aaa;
        font-size:1.1rem;
        margin:0;
    ">
        Frecuencias para reinicios cognitivos rápidos.
    </p>

</div>

<div class="carousel-master-container reveal"
style="margin-bottom:5rem;">

    <div id="audio-carousel-short"
    class="horizontal-carousel"></div>

</div>

<!-- INMERSIÓN -->

<div style="
    max-width:1200px;
    margin:0 auto 1.5rem auto;
    padding-left:2rem;
    border-left:5px solid var(--valtara-morado-vivo);
">

    <h4 style="
        color:#E58CFF;
        font-size:2rem;
        font-family:var(--font-accent);
        margin:0;
    ">
        Inmersión Profunda
    </h4>

    <p style="
        color:#aaa;
        font-size:1.1rem;
        margin:0;
    ">
        Catálogo Acústico Extendido.
    </p>

</div>

<div class="carousel-master-container reveal"
style="margin-bottom:5rem;">

    <div id="audio-carousel-long"
    class="horizontal-carousel"></div>

</div>

<!-- RADIO -->

<div style="
    max-width:1200px;
    margin:0 auto 1.5rem auto;
    padding-left:2rem;
    border-left:5px solid var(--valtara-oro);
">

    <h4 style="
        color:var(--valtara-oro);
        font-size:2rem;
        font-family:var(--font-accent);
        margin:0;
    ">
        Radio Valtara
    </h4>

    <p style="
        color:#aaa;
        font-size:1.1rem;
        margin:0;
    ">
        Transmisión continua inmersiva.
    </p>

</div>

<div class="carousel-master-container reveal"
style="margin-bottom:6rem;">

    <div id="audio-carousel-radio"
    class="horizontal-carousel"></div>

</div>

`;

/* =========================================================
   PLAYLISTS
========================================================= */

window.ValtaraAudioPlaylists.short = [
    {
        title:'Frecuencia 01',
        file:'1.mp3',
        category:'Micro-Dosis'
    },
    {
        title:'Frecuencia 02',
        file:'2.mp3',
        category:'Micro-Dosis'
    },
    {
        title:'Frecuencia 03',
        file:'3.mp3',
        category:'Micro-Dosis'
    }
];

window.ValtaraAudioPlaylists.long = [
    {
        title:'Bajo el Vidrio',
        file:'bajo_el_vidrio.mp3',
        category:'Inmersión'
    }
];

window.ValtaraAudioPlaylists.radio = [

{
title:'Nuestra Catedral',
file:'nuestra_catedral.mp3',
category:'Radio Valtara'
},

{
title:'Steam From The Porcelain',
file:'steam_from_the_porcelain.mp3',
category:'Radio Valtara'
},

{
title:'Donde El Alma Descansa',
file:'donde_el_alma_descansa.mp3',
category:'Radio Valtara'
},

{
title:'Un Respiro En El Andar',
file:'un_respiro_en_el_andar.mp3',
category:'Radio Valtara'
},

{
title:'Un Puerto Donde Descansar',
file:'un_puerto_donde_descansar.mp3',
category:'Radio Valtara'
},

{
title:'Refugio Entre Ramas',
file:'refugio_entre_ramas.mp3',
category:'Radio Valtara'
},

{
title:'Donde La Piedra Se Rinde',
file:'donde_la_piedra_se_rinde.mp3',
category:'Radio Valtara'
},

{
title:'The Willow And The Stone',
file:'the_willow_and_the_stone.mp3',
category:'Radio Valtara'
},

{
title:'Blue Inked Islands',
file:'blue-inked_islands.mp3',
category:'Radio Valtara'
},

{
title:'The Slow Rotation I',
file:'the_slow_rotation (1).mp3',
category:'Radio Valtara'
},

{
title:'The Slow Rotation',
file:'the_slow_rotation.mp3',
category:'Radio Valtara'
},

{
title:'Where Pulse And Pasture Meet',
file:'where_pulse_and_pasture_meet.mp3',
category:'Radio Valtara'
},

{
title:'Midnight Architecture',
file:'midnight_architecture.mp3',
category:'Radio Valtara'
},

{
title:'Cristal y Sal',
file:'cristal_y_sal.mp3',
category:'Radio Valtara'
},

{
title:'The Quiet Pulse',
file:'the_quiet_pulse.mp3',
category:'Radio Valtara'
}

];

/* =========================================================
   MOTOR DE AUDIO
========================================================= */

window.ValtaraAudioEngine.audio =
window.ValtaraAudioEngine.audio || new Audio();

window.ValtaraAudioEngine.currentPlaylist = [];
window.ValtaraAudioEngine.currentIndex = 0;

window.ValtaraAudioEngine.playTrack = function(type,index){

    const playlist = window.ValtaraAudioPlaylists[type];

    if(!playlist) return;

    this.currentPlaylist = playlist;
    this.currentIndex = index;

    const track = playlist[index];

    if(!track) return;

    this.audio.pause();

    this.audio.src = `audio/${track.file}`;

    this.audio.load();

    this.audio.play();

    document.getElementById('oasis-now-playing').innerHTML = `
        <div>${track.title}</div>
        <div style="
            font-size:.85rem;
            opacity:.6;
            margin-top:.4rem;
            letter-spacing:.08rem;
            text-transform:uppercase;
        ">
            ${track.category}
        </div>
    `;

    const nextIndex =
    index + 1 >= playlist.length ? 0 : index + 1;

    const nextTrack = playlist[nextIndex];

    document.getElementById('valtara-next-track').innerHTML = `
        A continuación:
        <strong style="color:var(--valtara-oro);">
            ${nextTrack.title}
        </strong>
    `;

    document.querySelector('#btn-master-play i')
    .className = 'fa-solid fa-pause';
};

window.ValtaraAudioEngine.nextTrack = function(){

    if(!this.currentPlaylist.length) return;

    let next = this.currentIndex + 1;

    if(next >= this.currentPlaylist.length){
        next = 0;
    }

    const type =
    this.currentPlaylist === window.ValtaraAudioPlaylists.radio
    ? 'radio'
    :
    this.currentPlaylist === window.ValtaraAudioPlaylists.long
    ? 'long'
    : 'short';

    this.playTrack(type,next);
};

window.ValtaraAudioEngine.prevTrack = function(){

    if(!this.currentPlaylist.length) return;

    let prev = this.currentIndex - 1;

    if(prev < 0){
        prev = this.currentPlaylist.length - 1;
    }

    const type =
    this.currentPlaylist === window.ValtaraAudioPlaylists.radio
    ? 'radio'
    :
    this.currentPlaylist === window.ValtaraAudioPlaylists.long
    ? 'long'
    : 'short';

    this.playTrack(type,prev);
};

/* =========================================================
   AUTO NEXT
========================================================= */

window.ValtaraAudioEngine.audio.addEventListener('ended',()=>{

    window.ValtaraAudioEngine.nextTrack();

});

/* =========================================================
   BOTONES
========================================================= */

setTimeout(()=>{

const playBtn =
document.getElementById('btn-master-play');

const nextBtn =
document.getElementById('btn-next-track');

const prevBtn =
document.getElementById('btn-prev-track');

if(playBtn){

playBtn.onclick = () => {

const audio = window.ValtaraAudioEngine.audio;

if(audio.paused){

audio.play();

playBtn.innerHTML =
'<i class="fa-solid fa-pause"></i>';

}else{

audio.pause();

playBtn.innerHTML =
'<i class="fa-solid fa-play"></i>';

}

};

}

if(nextBtn){

nextBtn.onclick = () => {

window.ValtaraAudioEngine.nextTrack();

};

}

if(prevBtn){

prevBtn.onclick = () => {

window.ValtaraAudioEngine.prevTrack();

};

}

},400);

/* =========================================================
   RENDER TARJETAS
========================================================= */

window.ValtaraAudioEngine.renderCards = function(){

const render = (containerId,playlist,type,icon,color) => {

const container = document.getElementById(containerId);

if(!container) return;

container.innerHTML = playlist.map((track,index)=>`

<article
class="glass-card carousel-card"
onclick="window.ValtaraAudioEngine.playTrack('${type}',${index})"
style="
min-width:320px;
max-width:320px;
padding:1.4rem;
border-radius:24px;
cursor:pointer;
background:rgba(255,255,255,.04);
border:1px solid rgba(255,255,255,.08);
backdrop-filter:blur(10px);
transition:.3s;
flex-shrink:0;
overflow:hidden;
">

<div style="
position:relative;
width:100%;
height:190px;
border-radius:20px;
overflow:hidden;
margin-bottom:1.2rem;
background:
radial-gradient(circle at top,
${color},
rgba(0,0,0,.92));
display:flex;
align-items:center;
justify-content:center;
">

<i class="${icon}"
style="
font-size:4rem;
color:white;
text-shadow:0 0 30px rgba(255,255,255,.25);
"></i>

</div>

<h4 style="
color:white;
font-size:1.2rem;
line-height:1.5;
margin-bottom:.9rem;
font-family:var(--font-accent);
">
${track.title}
</h4>

<p style="
color:rgba(255,255,255,.58);
font-size:.92rem;
line-height:1.7;
">
${track.category}
</p>

</article>

`).join('');

};

render(
'audio-carousel-short',
window.ValtaraAudioPlaylists.short,
'short',
'fa-solid fa-leaf',
'rgba(0,255,180,.25)'
);

render(
'audio-carousel-long',
window.ValtaraAudioPlaylists.long,
'long',
'fa-solid fa-water',
'rgba(210,0,255,.25)'
);

render(
'audio-carousel-radio',
window.ValtaraAudioPlaylists.radio,
'radio',
'fa-solid fa-radio',
'rgba(255,210,0,.25)'
);

};

setTimeout(()=>{

window.ValtaraAudioEngine.renderCards();

},300);
