window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraCarousels = {
    scroll: function(id, direction) {
        const track = document.getElementById(id);
        if(!track) return;
        const card = track.querySelector('.carousel-card');
        const cardWidth = card ? card.offsetWidth + 40 : 350; 
        track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    }
};

window.ValtaraModulos.sonoterapia_videos = `
    <div style="text-align: center; max-width: 1200px; margin: 0 auto 2rem auto;">
        <h3 style="color: var(--valtara-oro); font-family: var(--font-accent); font-size: 3rem; margin-bottom: 1rem;">I. Experiencias Visuales</h3>
        <p style="color: var(--valtara-gris-texto); font-size: 1.25rem; font-weight: 300; letter-spacing: 0.1rem; text-transform: uppercase;">Meditación Guiada & Descompresión</p>
    </div>
    
    <div class="carousel-master-container reveal" style="margin-bottom: 6rem;">
        
        <div id="video-carousel" class="horizontal-carousel">
            
            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5); cursor: pointer; background: #000;" 
                     onclick="this.innerHTML='<iframe src=\\'https://www.youtube.com/embed/aBsnQjJ2_Nk?autoplay=1\\' style=\\'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;\\' allowfullscreen allow=\\'autoplay\\'></iframe>'">
                    <img loading="lazy" src="https://img.youtube.com/vi/aBsnQjJ2_Nk/hqdefault.jpg" alt="Frecuencia de Sanación" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6">
                    <i class="fa-solid fa-play" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 4rem; color: var(--valtara-blanco); text-shadow: 0 0 25px rgba(0, 255, 255, 0.8); pointer-events: none;"></i>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Frecuencia de Sanación</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5); cursor: pointer; background: #000;" 
                     onclick="this.innerHTML='<iframe src=\\'https://www.youtube.com/embed/jpYb4AiMWCs?autoplay=1\\' style=\\'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;\\' allowfullscreen allow=\\'autoplay\\'></iframe>'">
                    <img loading="lazy" src="https://img.youtube.com/vi/jpYb4AiMWCs/hqdefault.jpg" alt="Respiración Consciente" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6">
                    <i class="fa-solid fa-play" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 4rem; color: var(--valtara-blanco); text-shadow: 0 0 25px rgba(0, 255, 255, 0.8); pointer-events: none;"></i>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Respiración Consciente</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5); cursor: pointer; background: #000;" 
                     onclick="this.innerHTML='<iframe src=\\'https://www.youtube.com/embed/IShkpOm63gg?autoplay=1\\' style=\\'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;\\' allowfullscreen allow=\\'autoplay\\'></iframe>'">
                    <img loading="lazy" src="https://img.youtube.com/vi/IShkpOm63gg/hqdefault.jpg" alt="Equilibrio Energético" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6">
                    <i class="fa-solid fa-play" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 4rem; color: var(--valtara-blanco); text-shadow: 0 0 25px rgba(0, 255, 255, 0.8); pointer-events: none;"></i>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Equilibrio Energético</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5); cursor: pointer; background: #000;" 
                     onclick="this.innerHTML='<iframe src=\\'https://www.youtube.com/embed/22i6SofLVRY?autoplay=1\\' style=\\'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;\\' allowfullscreen allow=\\'autoplay\\'></iframe>'">
                    <img loading="lazy" src="https://img.youtube.com/vi/22i6SofLVRY/hqdefault.jpg" alt="Paz Interior" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6">
                    <i class="fa-solid fa-play" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 4rem; color: var(--valtara-blanco); text-shadow: 0 0 25px rgba(0, 255, 255, 0.8); pointer-events: none;"></i>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Paz Interior</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5); cursor: pointer; background: #000;" 
                     onclick="this.innerHTML='<iframe src=\\'https://www.youtube.com/embed/g5WC1OMD3NE?autoplay=1\\' style=\\'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;\\' allowfullscreen allow=\\'autoplay\\'></iframe>'">
                    <img loading="lazy" src="https://img.youtube.com/vi/g5WC1OMD3NE/hqdefault.jpg" alt="Descompresión Mental" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6">
                    <i class="fa-solid fa-play" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 4rem; color: var(--valtara-blanco); text-shadow: 0 0 25px rgba(0, 255, 255, 0.8); pointer-events: none;"></i>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Descompresión Mental</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5); cursor: pointer; background: #000;" 
                     onclick="this.innerHTML='<iframe src=\\'https://www.youtube.com/embed/2UseHaw_22Q?autoplay=1\\' style=\\'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;\\' allowfullscreen allow=\\'autoplay\\'></iframe>'">
                    <img loading="lazy" src="https://img.youtube.com/vi/2UseHaw_22Q/hqdefault.jpg" alt="Ondas Alfa" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6">
                    <i class="fa-solid fa-play" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 4rem; color: var(--valtara-blanco); text-shadow: 0 0 25px rgba(0, 255, 255, 0.8); pointer-events: none;"></i>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Ondas Alfa</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5); cursor: pointer; background: #000;" 
                     onclick="this.innerHTML='<iframe src=\\'https://www.youtube.com/embed/cq2Ef6rvL6g?autoplay=1\\' style=\\'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;\\' allowfullscreen allow=\\'autoplay\\'></iframe>'">
                    <img loading="lazy" src="https://img.youtube.com/vi/cq2Ef6rvL6g/hqdefault.jpg" alt="Relajación Profunda" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6">
                    <i class="fa-solid fa-play" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 4rem; color: var(--valtara-blanco); text-shadow: 0 0 25px rgba(0, 255, 255, 0.8); pointer-events: none;"></i>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Relajación Profunda</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5); cursor: pointer; background: #000;" 
                     onclick="this.innerHTML='<iframe src=\\'https://www.youtube.com/embed/59SSSzbGBWY?autoplay=1\\' style=\\'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;\\' allowfullscreen allow=\\'autoplay\\'></iframe>'">
                    <img loading="lazy" src="https://img.youtube.com/vi/59SSSzbGBWY/hqdefault.jpg" alt="Meditación de Cierre" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.6">
                    <i class="fa-solid fa-play" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 4rem; color: var(--valtara-blanco); text-shadow: 0 0 25px rgba(0, 255, 255, 0.8); pointer-events: none;"></i>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Meditación de Cierre</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>
        </div>

        <div class="carousel-navigation">
            <button aria-label="Ver video anterior" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('video-carousel', -1)"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="carousel-indicator" id="indicator-video" aria-live="polite">1 de 8</div>
            <button aria-label="Ver siguiente video" class="carousel-btn" onclick="window.ValtaraCarousels.scroll('video-carousel', 1)"><i class="fa-solid fa-chevron-right"></i></button>
        </div>

    </div>
`;
