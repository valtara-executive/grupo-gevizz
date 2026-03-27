window.ValtaraModulos = window.ValtaraModulos || {};

// Mini-motor inyectado para controlar todos los carruseles (Videos y Audios)
window.ValtaraCarousels = {
    scroll: function(id, direction) {
        const track = document.getElementById(id);
        if(!track) return;
        // Calcula el ancho exacto de la tarjeta más el espacio (gap)
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
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
                    <iframe src="https://www.youtube.com/embed/aBsnQjJ2_Nk" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Frecuencia de Sanación</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
                    <iframe src="https://www.youtube.com/embed/jpYb4AiMWCs" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Respiración Consciente</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
                    <iframe src="https://www.youtube.com/embed/IShkpOm63gg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Equilibrio Energético</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
                    <iframe src="https://www.youtube.com/embed/22i6SofLVRY" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Paz Interior</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
                    <iframe src="https://www.youtube.com/embed/g5WC1OMD3NE" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Descompresión Mental</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
                    <iframe src="https://www.youtube.com/embed/2UseHaw_22Q" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Ondas Alfa</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
                    <iframe src="https://www.youtube.com/embed/cq2Ef6rvL6g" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                </div>
                <h4 style="color: var(--valtara-blanco); font-size: 1.4rem; margin-bottom: 0.5rem; font-family: var(--font-accent);">Relajación Profunda</h4>
                <p style="color: #888; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;"><i class="fa-brands fa-youtube" style="color: #ff0000; font-size: 1.2rem;"></i> Créditos al creador original</p>
            </article>

            <article class="glass-card carousel-card" style="padding: 1.5rem; border-color: rgba(255,255,255,0.1);">
                <div style="position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 1rem; overflow: hidden; margin-bottom: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
                    <iframe src="https://www.youtube.com/embed/59SSSzbGBWY" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
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
