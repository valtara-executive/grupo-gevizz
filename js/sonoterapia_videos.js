window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraMedia = window.ValtaraMedia || {

    activeContainer: null,

    silenciarTodo: function() {

        document.querySelectorAll('.valtara-youtube-frame').forEach(frame => {

            try {
                frame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } catch(e) {}

        });

    },

    reproducirVideo: function(container, videoId) {

        if(!container) return;

        // Pausar todos los videos anteriores
        this.silenciarTodo();

        // Si ya existe iframe, solo reproducir
        let existingIframe = container.querySelector('iframe');

        if(existingIframe) {

            try {
                existingIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } catch(e) {}

            return;
        }

        // Crear iframe SIN eliminar miniatura
        const iframe = document.createElement('iframe');

        iframe.className = 'valtara-youtube-frame';

        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&playsinline=1`;

        iframe.allow = 'autoplay; encrypted-media';

        iframe.allowFullscreen = true;

        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        iframe.style.zIndex = '4';
        iframe.style.opacity = '1';

        container.appendChild(iframe);

        // Ocultar botón play pero NO la miniatura
        const playButton = container.querySelector('.valtara-play-button');

        if(playButton) {
            playButton.style.opacity = '0';
            playButton.style.pointerEvents = 'none';
        }

        this.activeContainer = container;
    }
};

window.ValtaraCarousels = {
    scroll: function(id, direction) {

        const track = document.getElementById(id);

        if(!track) return;

        const card = track.querySelector('.carousel-card');

        const cardWidth = card ? card.offsetWidth + 40 : 350;

        track.scrollBy({
            left: direction * cardWidth,
            behavior: 'smooth'
        });
    }
};

window.ValtaraModulos.sonoterapia_videos = `

<div style="text-align: center; max-width: 1200px; margin: 0 auto 2rem auto;">

    <h3 style="
        color: var(--valtara-oro);
        font-family: var(--font-accent);
        font-size: 3rem;
        margin-bottom: 1rem;
    ">
        I. Experiencias Visuales
    </h3>

    <p style="
        color: var(--valtara-gris-texto);
        font-size: 1.25rem;
        font-weight: 300;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
    ">
        Meditación Guiada & Descompresión
    </p>

</div>

<div class="carousel-master-container reveal" style="margin-bottom: 6rem;">

    <div id="video-carousel" class="horizontal-carousel">

        ${[
            {
                id:"aBsnQjJ2_Nk",
                title:"Frecuencia de Sanación"
            },
            {
                id:"jpYb4AiMWCs",
                title:"Respiración Consciente"
            },
            {
                id:"IShkpOm63gg",
                title:"Equilibrio Energético"
            },
            {
                id:"22i6SofLVRY",
                title:"Paz Interior"
            },
            {
                id:"g5WC1OMD3NE",
                title:"Descompresión Mental"
            },
            {
                id:"2UseHaw_22Q",
                title:"Ondas Alfa"
            },
            {
                id:"cq2Ef6rvL6g",
                title:"Relajación Profunda"
            },
            {
                id:"59SSSzbGBWY",
                title:"Meditación de Cierre"
            },
            {
                id:"hC8CH0Z3L54",
                title:"Radio Nocturna"
            },
            {
                id:"BYl7v0YsX9g",
                title:"Meditación Guiada"
            },
            {
                id:"C5bHrit6La4",
                title:"Paisaje Sonoro"
            },
            {
                id:"rhrCG0Vtx3g",
                title:"Frecuencia Ambiental"
            }
        ].map(video => `

            <article class="glass-card carousel-card"
                style="
                    padding:1.5rem;
                    border-color:rgba(255,255,255,0.1);
                "
            >

                <div
                    onclick="window.ValtaraMedia.reproducirVideo(this, '${video.id}')"

                    style="
                        position:relative;
                        width:100%;
                        padding-bottom:56.25%;
                        border-radius:1rem;
                        overflow:hidden;
                        margin-bottom:1.5rem;
                        box-shadow:0 10px 20px rgba(0,0,0,0.5);
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
                            opacity:0.6;
                            transition:0.3s;
                            z-index:1;
                        "

                        onmouseover="this.style.opacity=1"
                        onmouseout="this.style.opacity=0.6"
                    >

                    <div style="
                        position:absolute;
                        inset:0;
                        background:linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.05));
                        z-index:2;
                    "></div>

                    <div class="valtara-play-button"

                        style="
                            position:absolute;
                            top:50%;
                            left:50%;
                            transform:translate(-50%, -50%);
                            z-index:5;
                            transition:.3s;
                            pointer-events:none;
                        "
                    >

                        <i class="fa-solid fa-play"

                            style="
                                font-size:4rem;
                                color:var(--valtara-blanco);
                                text-shadow:0 0 25px rgba(0,255,255,0.8);
                            "
                        ></i>

                    </div>

                </div>

                <h4 style="
                    color:var(--valtara-blanco);
                    font-size:1.4rem;
                    margin-bottom:0.5rem;
                    font-family:var(--font-accent);
                ">
                    ${video.title}
                </h4>

                <p style="
                    color:#888;
                    font-size:0.95rem;
                    display:flex;
                    align-items:center;
                    gap:8px;
                ">
                    <i class="fa-brands fa-youtube"
                       style="
                            color:#ff0000;
                            font-size:1.2rem;
                       ">
                    </i>

                    Créditos al creador original
                </p>

            </article>

        `).join('')}

    </div>

    <div class="carousel-navigation">

        <button
            aria-label="Ver video anterior"
            class="carousel-btn"
            onclick="window.ValtaraCarousels.scroll('video-carousel', -1)"
        >
            <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div
            class="carousel-indicator"
            id="indicator-video"
            aria-live="polite"
        >
            Experiencias inmersivas
        </div>

        <button
            aria-label="Ver siguiente video"
            class="carousel-btn"
            onclick="window.ValtaraCarousels.scroll('video-carousel', 1)"
        >
            <i class="fa-solid fa-chevron-right"></i>
        </button>

    </div>

</div>
`;
