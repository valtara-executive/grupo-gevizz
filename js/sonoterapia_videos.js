window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraMedia = window.ValtaraMedia || {

    currentPlayer: null,

    silenciarTodo: function () {

        try {

            document.querySelectorAll('audio').forEach(audio => {
                audio.pause();
            });

            document.querySelectorAll('.valtara-video-active').forEach(container => {

                const videoId = container.getAttribute('data-video');

                container.innerHTML = `
                    <img loading="lazy"
                        src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg"
                        style="
                            position:absolute;
                            top:0;
                            left:0;
                            width:100%;
                            height:100%;
                            object-fit:cover;
                            opacity:.88;
                        "
                    />

                    <div style="
                        position:absolute;
                        inset:0;
                        background:linear-gradient(to top, rgba(0,0,0,.65), rgba(0,0,0,.15));
                    "></div>

                    <div style="
                        position:absolute;
                        top:50%;
                        left:50%;
                        transform:translate(-50%,-50%);
                        width:72px;
                        height:72px;
                        border-radius:50%;
                        background:rgba(255,255,255,.08);
                        border:1px solid rgba(255,255,255,.15);
                        backdrop-filter: blur(10px);
                        display:flex;
                        align-items:center;
                        justify-content:center;
                    ">
                        <i class="fa-solid fa-play"
                           style="
                                color:white;
                                font-size:1.7rem;
                                margin-left:4px;
                                text-shadow:0 0 25px rgba(0,255,255,.6);
                           ">
                        </i>
                    </div>
                `;

                container.classList.remove('valtara-video-active');

            });

        } catch(e) {
            console.log(e);
        }
    },

    reproducirVideo: function(elemento, videoId) {

        if(!elemento) return;

        this.silenciarTodo();

        elemento.classList.add('valtara-video-active');

        elemento.innerHTML = `
            <iframe
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                style="
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    height:100%;
                    border:0;
                "
                allow="autoplay; encrypted-media"
                allowfullscreen>
            </iframe>
        `;
    }
};

window.ValtaraCarousels = {
    scroll: function(id, direction) {

        const track = document.getElementById(id);

        if(!track) return;

        const card = track.querySelector('.carousel-card');

        const cardWidth = card ? card.offsetWidth + 24 : 340;

        track.scrollBy({
            left: direction * cardWidth,
            behavior: 'smooth'
        });
    }
};

window.ValtaraModulos.sonoterapia_videos = `

<div style="max-width:1300px;margin:0 auto 3rem auto;">

    <div style="text-align:center;margin-bottom:2.5rem;">

        <h3 style="
            color:var(--valtara-oro);
            font-family:var(--font-accent);
            font-size:3rem;
            margin-bottom:1rem;
        ">
            Experiencias Sonoras & Visuales
        </h3>

        <p style="
            color:var(--valtara-gris-texto);
            font-size:1.05rem;
            line-height:1.9;
            max-width:850px;
            margin:auto;
        ">
            Curaduría inmersiva de meditaciones guiadas, frecuencias ambientales,
            paisajes sonoros y experiencias contemplativas diseñadas para ansiedad,
            burnout, descanso mental y restauración emocional.
        </p>

    </div>

    <div class="carousel-master-container reveal">

        <div id="video-carousel" class="horizontal-carousel" style="
            display:flex;
            gap:24px;
            overflow-x:auto;
            scroll-behavior:smooth;
            padding:1rem 0 1.5rem 0;
        ">

            ${[
                {
                    id:"aBsnQjJ2_Nk",
                    title:"Frecuencia de Restauración Interna",
                    desc:"Ondas suaves para bajar revoluciones mentales y entrar en calma."
                },
                {
                    id:"jpYb4AiMWCs",
                    title:"Respiración Consciente & Silencio",
                    desc:"Meditación enfocada en respiración lenta y regulación emocional."
                },
                {
                    id:"IShkpOm63gg",
                    title:"Equilibrio Energético Profundo",
                    desc:"Ambiente contemplativo para reconectar con el cuerpo."
                },
                {
                    id:"22i6SofLVRY",
                    title:"Paz Interior Nocturna",
                    desc:"Paisaje sonoro relajante para ansiedad y descanso."
                },
                {
                    id:"g5WC1OMD3NE",
                    title:"Descompresión Mental Ejecutiva",
                    desc:"Sonidos ambientales para apagar el exceso de pensamientos."
                },
                {
                    id:"2UseHaw_22Q",
                    title:"Ondas Alfa & Relajación",
                    desc:"Frecuencias suaves para sesiones de descanso profundo."
                },
                {
                    id:"cq2Ef6rvL6g",
                    title:"Ritual Sonoro de Calma",
                    desc:"Experiencia inmersiva para bajar tensión emocional."
                },
                {
                    id:"59SSSzbGBWY",
                    title:"Meditación de Cierre Nocturno",
                    desc:"Ideal para terminar el día con serenidad."
                },
                {
                    id:"hC8CH0Z3L54",
                    title:"Radio Nocturna de Restauración",
                    desc:"Atmósfera cálida para noches de introspección y descanso."
                },
                {
                    id:"BYl7v0YsX9g",
                    title:"Meditación Guiada de Soltar",
                    desc:"Experiencia enfocada en liberar tensión acumulada."
                },
                {
                    id:"C5bHrit6La4",
                    title:"Paisaje Sonoro para Ansiedad",
                    desc:"Ambiente contemplativo para desacelerar la mente."
                },
                {
                    id:"rhrCG0Vtx3g",
                    title:"Frecuencia Ambiental de Calma",
                    desc:"Entorno inmersivo para respiración y descanso mental."
                }
            ].map(video => `

                <article class="glass-card carousel-card"
                    style="
                        min-width:320px;
                        max-width:320px;
                        border-radius:26px;
                        overflow:hidden;
                        background:rgba(255,255,255,.03);
                        border:1px solid rgba(255,255,255,.08);
                        box-shadow:0 10px 30px rgba(0,0,0,.35);
                        backdrop-filter:blur(12px);
                        padding:1rem;
                        flex-shrink:0;
                    "
                >

                    <div
                        class="valtara-video-container"
                        data-video="${video.id}"
                        onclick="window.ValtaraMedia.reproducirVideo(event.currentTarget, '${video.id}')"
                        style="
                            position:relative;
                            width:100%;
                            padding-bottom:56.25%;
                            border-radius:20px;
                            overflow:hidden;
                            cursor:pointer;
                            background:#000;
                            margin-bottom:1.2rem;
                        "
                    >

                        <img
                            loading="lazy"
                            src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg"
                            alt="${video.title}"
                            style="
                                position:absolute;
                                top:0;
                                left:0;
                                width:100%;
                                height:100%;
                                object-fit:cover;
                                opacity:.88;
                                transition:.4s;
                            "
                        >

                        <div style="
                            position:absolute;
                            inset:0;
                            background:linear-gradient(to top, rgba(0,0,0,.65), rgba(0,0,0,.15));
                        "></div>

                        <div style="
                            position:absolute;
                            top:50%;
                            left:50%;
                            transform:translate(-50%,-50%);
                            width:72px;
                            height:72px;
                            border-radius:50%;
                            background:rgba(255,255,255,.08);
                            border:1px solid rgba(255,255,255,.15);
                            backdrop-filter: blur(10px);
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            box-shadow:0 0 30px rgba(0,255,255,.18);
                        ">
                            <i class="fa-solid fa-play"
                               style="
                                    color:white;
                                    font-size:1.7rem;
                                    margin-left:4px;
                                    text-shadow:0 0 25px rgba(0,255,255,.6);
                               ">
                            </i>
                        </div>

                    </div>

                    <h4 style="
                        color:white;
                        font-size:1.25rem;
                        margin-bottom:.7rem;
                        font-family:var(--font-accent);
                        line-height:1.4;
                    ">
                        ${video.title}
                    </h4>

                    <p style="
                        color:var(--valtara-gris-texto);
                        line-height:1.8;
                        font-size:.96rem;
                        margin-bottom:1.2rem;
                    ">
                        ${video.desc}
                    </p>

                    <div style="
                        display:flex;
                        align-items:center;
                        justify-content:space-between;
                        gap:10px;
                    ">

                        <span style="
                            color:rgba(255,255,255,.45);
                            font-size:.8rem;
                            letter-spacing:.08rem;
                            text-transform:uppercase;
                        ">
                            Experiencia inmersiva
                        </span>

                        <span style="
                            color:var(--valtara-cian-brillante);
                            font-size:.85rem;
                            font-weight:700;
                        ">
                            ▶ Reproducir
                        </span>

                    </div>

                </article>

            `).join('')}

        </div>

        <div class="carousel-navigation" style="
            display:flex;
            justify-content:center;
            align-items:center;
            gap:18px;
            margin-top:1.5rem;
        ">

            <button
                aria-label="Anterior"
                class="carousel-btn"
                onclick="window.ValtaraCarousels.scroll('video-carousel', -1)"
                style="
                    width:52px;
                    height:52px;
                    border-radius:50%;
                    border:1px solid rgba(255,255,255,.1);
                    background:rgba(255,255,255,.04);
                    color:white;
                    cursor:pointer;
                "
            >
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <button
                aria-label="Siguiente"
                class="carousel-btn"
                onclick="window.ValtaraCarousels.scroll('video-carousel', 1)"
                style="
                    width:52px;
                    height:52px;
                    border-radius:50%;
                    border:1px solid rgba(255,255,255,.1);
                    background:rgba(255,255,255,.04);
                    color:white;
                    cursor:pointer;
                "
            >
                <i class="fa-solid fa-chevron-right"></i>
            </button>

        </div>

    </div>

</div>
`;
