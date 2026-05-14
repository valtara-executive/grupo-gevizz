window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraMedia = {

    silenciarTodo: function () {

        document.querySelectorAll('.valtara-video-trigger iframe').forEach(frame => {

            try {
                frame.src = '';
            } catch(e) {}

        });

    }
};

window.ValtaraCarousels = {

    scroll: function(id, direction) {

        const track = document.getElementById(id);

        if(!track) return;

        const card = track.querySelector('.carousel-card');

        const cardWidth = card ? card.offsetWidth + 32 : 350;

        track.scrollBy({
            left: direction * cardWidth,
            behavior: 'smooth'
        });
    }
};

window.ValtaraModulos.sonoterapia_videos = `

<div style="max-width:1300px;margin:0 auto 4rem auto;">

    <div style="
        text-align:center;
        max-width:900px;
        margin:0 auto 3rem auto;
    ">

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
            font-size:1.1rem;
            line-height:1.9;
            font-weight:300;
            letter-spacing:.05rem;
        ">
            Meditaciones guiadas, paisajes ambientales, frecuencias relajantes
            y experiencias contemplativas diseñadas para descanso mental,
            ansiedad, burnout y restauración emocional.
        </p>

    </div>

    <div class="carousel-master-container reveal">

        <div
            id="video-carousel"
            class="horizontal-carousel"

            style="
                display:flex;
                gap:24px;
                overflow-x:auto;
                scroll-behavior:smooth;
                padding:1rem .3rem 2rem .3rem;
            "
        >

            ${[
                {
                    id:"aBsnQjJ2_Nk",
                    title:"Frecuencia de Sanación",
                    desc:"Ondas suaves para desacelerar pensamientos y entrar en calma profunda."
                },
                {
                    id:"jpYb4AiMWCs",
                    title:"Respiración Consciente",
                    desc:"Meditación enfocada en respiración lenta y regulación emocional."
                },
                {
                    id:"IShkpOm63gg",
                    title:"Equilibrio Energético",
                    desc:"Experiencia contemplativa para reconectar cuerpo y mente."
                },
                {
                    id:"22i6SofLVRY",
                    title:"Paz Interior",
                    desc:"Paisaje sonoro ideal para descanso y relajación nocturna."
                },
                {
                    id:"g5WC1OMD3NE",
                    title:"Descompresión Mental",
                    desc:"Atmósfera auditiva para disminuir saturación emocional."
                },
                {
                    id:"2UseHaw_22Q",
                    title:"Ondas Alfa",
                    desc:"Frecuencias suaves diseñadas para relajación profunda."
                },
                {
                    id:"cq2Ef6rvL6g",
                    title:"Relajación Profunda",
                    desc:"Experiencia inmersiva enfocada en serenidad total."
                },
                {
                    id:"59SSSzbGBWY",
                    title:"Meditación de Cierre",
                    desc:"Ideal para terminar el día con una sensación de paz."
                },
                {
                    id:"hC8CH0Z3L54",
                    title:"Radio Nocturna",
                    desc:"Ambiente cálido para introspección y descanso."
                },
                {
                    id:"BYl7v0YsX9g",
                    title:"Meditación Guiada",
                    desc:"Experiencia enfocada en liberar tensión acumulada."
                },
                {
                    id:"C5bHrit6La4",
                    title:"Paisaje Sonoro",
                    desc:"Entorno auditivo inmersivo para ansiedad y calma."
                },
                {
                    id:"rhrCG0Vtx3g",
                    title:"Frecuencia Ambiental",
                    desc:"Experiencia contemplativa para respiración consciente."
                }

            ].map(video => `

                <article class="glass-card carousel-card"

                    style="
                        min-width:340px;
                        max-width:340px;
                        flex-shrink:0;
                        border-radius:28px;
                        overflow:hidden;
                        background:rgba(255,255,255,.03);
                        border:1px solid rgba(255,255,255,.08);
                        backdrop-filter:blur(14px);
                        box-shadow:0 15px 40px rgba(0,0,0,.35);
                        padding:1rem;
                    "
                >

                    <div

                        class="valtara-video-trigger"
                        data-video="${video.id}"

                        style="
                            position:relative;
                            width:100%;
                            padding-bottom:56.25%;
                            border-radius:22px;
                            overflow:hidden;
                            margin-bottom:1.3rem;
                            box-shadow:0 10px 25px rgba(0,0,0,.45);
                            cursor:pointer;
                            background:#000;
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
                                opacity:.78;
                                transition:.35s;
                            "

                            onmouseover="this.style.opacity=1"
                            onmouseout="this.style.opacity=.78"
                        >

                        <div style="
                            position:absolute;
                            inset:0;
                            background:linear-gradient(
                                to top,
                                rgba(0,0,0,.58),
                                rgba(0,0,0,.12)
                            );
                        "></div>

                        <div style="
                            position:absolute;
                            top:50%;
                            left:50%;
                            transform:translate(-50%,-50%);
                            width:86px;
                            height:86px;
                            border-radius:50%;
                            background:rgba(255,255,255,.08);
                            border:1px solid rgba(255,255,255,.15);
                            backdrop-filter:blur(12px);
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            box-shadow:0 0 35px rgba(0,255,255,.15);
                            pointer-events:none;
                        ">

                            <i class="fa-solid fa-play"

                                style="
                                    font-size:2rem;
                                    color:white;
                                    margin-left:5px;
                                    text-shadow:0 0 30px rgba(0,255,255,.8);
                                "
                            ></i>

                        </div>

                    </div>

                    <h4 style="
                        color:white;
                        font-size:1.35rem;
                        margin-bottom:.8rem;
                        font-family:var(--font-accent);
                        line-height:1.4;
                    ">
                        ${video.title}
                    </h4>

                    <p style="
                        color:var(--valtara-gris-texto);
                        line-height:1.8;
                        font-size:.96rem;
                        margin-bottom:1rem;
                    ">
                        ${video.desc}
                    </p>

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:10px;
                    ">

                        <span style="
                            color:rgba(255,255,255,.4);
                            font-size:.78rem;
                            letter-spacing:.08rem;
                            text-transform:uppercase;
                        ">
                            Experiencia inmersiva
                        </span>

                        <span style="
                            color:var(--valtara-cian-brillante);
                            font-size:.9rem;
                            font-weight:700;
                        ">
                            ▶ Reproducir
                        </span>

                    </div>

                </article>

            `).join('')}

        </div>

        <div class="carousel-navigation"

            style="
                display:flex;
                justify-content:center;
                align-items:center;
                gap:18px;
                margin-top:1.4rem;
            "
        >

            <button

                aria-label="Anterior"

                class="carousel-btn"

                onclick="window.ValtaraCarousels.scroll('video-carousel', -1)"

                style="
                    width:56px;
                    height:56px;
                    border-radius:50%;
                    border:1px solid rgba(255,255,255,.12);
                    background:rgba(255,255,255,.04);
                    color:white;
                    cursor:pointer;
                    backdrop-filter:blur(10px);
                "
            >
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <button

                aria-label="Siguiente"

                class="carousel-btn"

                onclick="window.ValtaraCarousels.scroll('video-carousel', 1)"

                style="
                    width:56px;
                    height:56px;
                    border-radius:50%;
                    border:1px solid rgba(255,255,255,.12);
                    background:rgba(255,255,255,.04);
                    color:white;
                    cursor:pointer;
                    backdrop-filter:blur(10px);
                "
            >
                <i class="fa-solid fa-chevron-right"></i>
            </button>

        </div>

    </div>

</div>
`;

setTimeout(() => {

    document.querySelectorAll('.valtara-video-trigger').forEach(trigger => {

        if(trigger.dataset.listenerAttached) return;

        trigger.dataset.listenerAttached = 'true';

        trigger.addEventListener('click', function() {

            const videoId = this.dataset.video;

            if(window.ValtaraMedia)
                window.ValtaraMedia.silenciarTodo();

            this.innerHTML = `
                <iframe
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1"
                    style="
                        position:absolute;
                        top:0;
                        left:0;
                        width:100%;
                        height:100%;
                        border:0;
                        z-index:20;
                    "
                    allow="autoplay; encrypted-media"
                    allowfullscreen>
                </iframe>
            `;

        });

    });

}, 700);
