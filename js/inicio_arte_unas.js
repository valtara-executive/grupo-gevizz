/**
 * ====================================================================================
 * MÓDULO: SECCIÓN INICIO - ART & NAILS (BANNER DINÁMICO V3.0)
 * Novedades: Imagen destacada aleatoria, Botón de Galería y Optimización UX.
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

(function() {
    // 1. LÓGICA DE SELECCIÓN DINÁMICA (Elegimos una imagen de impacto al azar)
    const featuredPool = [
        { path: '/gallery/ext1.jpg', label: 'Arquitectura en Extensiones' },
        { path: '/gallery/gel5.jpg', label: 'Esmaltado Gel Semipermanente de Alta Gama' },
        { path: '/gallery/r3.jpg', label: 'Blindaje y Protección Rubber' },
        { path: '/gallery/dis12.jpg', label: 'Arte y Diseño a Mano Alzada' },
        { path: '/gallery/ped2.jpg', label: 'Estética Podológica de Lujo' }
    ];
    
    const selected = featuredPool[Math.floor(Math.random() * featuredPool.length)];

    window.ValtaraModulos.inicio_arte_unas = `
    <div class="reveal" style="margin-top: 5rem; margin-bottom: 5rem; background: linear-gradient(145deg, rgba(225, 48, 108, 0.15), rgba(5,5,10,0.98)); border: 1px solid rgba(225, 48, 108, 0.4); border-radius: 2.5rem; max-width: 1250px; margin-left: auto; margin-right: auto; position: relative; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.5);">
        
        <div style="position: absolute; top: -50px; right: -50px; width: 250px; height: 250px; background: #E1306C; border-radius: 50%; opacity: 0.1; filter: blur(60px);"></div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 0; align-items: stretch; position: relative; z-index: 2;">
            
            <div style="position: relative; min-height: 400px; overflow: hidden; border-right: 1px solid rgba(225, 48, 108, 0.2);">
                <img src="${selected.path}" alt="${selected.label}" style="width: 100%; height: 100%; object-fit: cover; filter: contrast(1.1) brightness(0.9); transition: transform 10s alternate infinite ease-in-out;" class="featured-banner-img">
                <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(10,10,15,1), transparent); padding: 2rem; text-align: left;">
                    <span style="color: var(--valtara-oro); font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">Exhibición Actual</span>
                    <p style="color: #fff; margin: 0; font-size: 1.1rem; font-style: italic; opacity: 0.8;">${selected.label}</p>
                </div>
            </div>

            <div style="padding: 4.5rem 3.5rem; display: flex; flex-direction: column; justify-content: center;">
                <div style="margin-bottom: 2rem;">
                    <span style="background: rgba(225, 48, 108, 0.2); color: #FFB6C1; padding: 0.5rem 1.5rem; border-radius: 30px; font-weight: 800; font-size: 0.9rem; border: 1px solid rgba(225, 48, 108, 0.3); text-transform: uppercase; letter-spacing: 1px;">
                        <i class="fa-solid fa-crown"></i> Beauty Partner
                    </span>
                </div>
                
                <h3 style="color: #E1306C; font-size: 4rem; margin-bottom: 1rem; font-family: var(--font-accent); line-height: 1.1;">Art & Nails</h3>
                <p style="color: var(--valtara-blanco); font-size: 1.6rem; font-weight: 400; margin-bottom: 1.5rem; letter-spacing: 0.5px; font-family: var(--font-accent);">El Santuario de la Estética Integral</p>
                
                <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; margin-bottom: 2.5rem; line-height: 1.9; font-weight: 300; max-width: 500px;">
                    Completamos tu experiencia ejecutiva a través de nuestra división experta en belleza. Disfruta de un servicio de excelencia y precisión enfocado en la higiene superior de tus manos y pies.
                </p>

                <button onclick="Router.navigate('beauty')" class="btn-primary" style="width: fit-content; background: transparent; border: 1px solid var(--valtara-oro); color: var(--valtara-oro); padding: 1rem 2.5rem; font-size: 1.1rem; border-radius: 12px; cursor: pointer; transition: all 0.3s ease; margin-bottom: 3rem;" 
                        onmouseover="this.style.background='rgba(212,175,55,0.1)'" 
                        onmouseout="this.style.background='transparent'">
                    <i class="fa-solid fa-images"></i> Explorar Galería Completa
                </button>

                <div style="background: rgba(255,255,255,0.03); padding: 2rem; border-radius: 1.5rem; border-left: 4px solid #E1306C;">
                    <ul style="list-style: none; padding: 0; margin: 0; color: var(--valtara-blanco); font-size: 1.1rem; line-height: 2.2;">
                        <li><i class="fa-solid fa-check" style="color: #E1306C; margin-right: 12px;"></i> <strong>Manicure de Alta Gama</strong></li>
                        <li><i class="fa-solid fa-check" style="color: #E1306C; margin-right: 12px;"></i> <strong>Pedicure Estético de Lujo</strong></li>
                        <li><i class="fa-solid fa-check" style="color: #E1306C; margin-right: 12px;"></i> <strong>Nail Art Design Personalizado</strong></li>
                    </ul>
                </div>
            </div>
        </div>

        <div style="margin-top: 0; background: rgba(0,0,0,0.4); padding: 3rem; text-align: center; border-top: 1px solid rgba(225, 48, 108, 0.2);">
            <p style="color: #888; font-style: italic; font-size: 1rem; margin-bottom: 2rem; max-width: 800px; margin-left: auto; margin-right: auto;">
                * Servicio estético independiente a la clínica biomecánica. Gestión directa con nuestra Master Manicurista Socia.
            </p>
            
            <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
                <a href="https://wa.me/525525248816" target="_blank" style="text-decoration: none; background: #25D366; color: #000; font-weight: 900; padding: 1.2rem 2.5rem; border-radius: 50px; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 20px rgba(37,211,102,0.2);">
                    <i class="fa-brands fa-whatsapp" style="font-size: 1.5rem;"></i> Reservar: 55 2524 8816
                </a>
                <a href="https://www.instagram.com/art.nails02" target="_blank" style="text-decoration: none; background: linear-gradient(45deg, #f09433, #dc2743, #bc1888); color: #fff; font-weight: 700; padding: 1.2rem 2.5rem; border-radius: 50px; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 20px rgba(225,48,108,0.2);">
                    <i class="fa-brands fa-instagram" style="font-size: 1.5rem;"></i> Instagram Oficial
                </a>
            </div>
        </div>
    </div>
    `;
})();
