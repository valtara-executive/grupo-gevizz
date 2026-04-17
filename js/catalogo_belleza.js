/**
 * ====================================================================================
 * MÓDULO VISTA: CATÁLOGO DE BELLEZA (ART & NAILS GALLERY) V2.2
 * Arquitectura: Single Page Application (SPA) Component
 * Motor: Masonry Layout Dinámico (Adaptativo Vertical/Horizontal sin recortes)
 * FIX CRÍTICO: Evasión de la cascada CSS global (main section {display:none})
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

/**
 * ------------------------------------------------------------------------------------
 * 1. BASE DE DATOS LOCAL (DICCIONARIO DE CATEGORÍAS)
 * ------------------------------------------------------------------------------------
 */
const nailCategories = [
    { id: "ext", title: "Extensiones", subtitle: "Arquitectura de la Mirada: Longitud y Estructura", prefix: "ext", count: 5 },
    { id: "gel", title: "Gel Semipermanente", subtitle: "Brillo Infinito: El Color de la Resistencia", prefix: "gel", count: 8 },
    { id: "rubber", title: "Rubber y Sistemas de Protección", subtitle: "Blindaje de Queratina: Fortaleza Invisible", prefix: "r", count: 7 },
    { id: "disenos", title: "Diseños y Decoraciones", subtitle: "Arte en Miniatura: Detalles a Mano Alzada", prefix: "dis", count: 12 },
    { id: "pedicura", title: "Pedicura Perfecta", subtitle: "El Ritual de la Seda: Estética Podológica", prefix: "ped", count: 7 },
    { id: "laca", title: "Laca Tradicional", subtitle: "Elegancia Atemporal: El Clásico Refinado", prefix: "l", count: 5 }
];

/**
 * ------------------------------------------------------------------------------------
 * 2. MOTOR DE RENDERIZADO (INYECCIÓN DE ESTILOS Y ESTRUCTURA)
 * ------------------------------------------------------------------------------------
 */
let htmlCatalogoBelleza = `
    <style>
        .art-nails-header { text-align: center; margin-bottom: 5rem; padding-top: 4rem; }
        .art-nails-title { font-family: var(--font-accent, serif); font-size: 4.5rem; color: var(--valtara-blanco, #fff); margin-bottom: 1rem; }
        .art-nails-desc { color: var(--valtara-gris-texto, #aaa); font-size: 1.5rem; max-width: 800px; margin: 0 auto; font-weight: 300; line-height: 1.8; }
        
        .category-container { margin-bottom: 7rem; } /* Cambio de nombre de clase para mayor seguridad */
        .category-header { margin-bottom: 3rem; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 1.5rem; text-align: left; }
        .category-title { color: var(--valtara-oro, #D4AF37); font-size: 2.8rem; font-family: var(--font-accent, serif); letter-spacing: 1px; margin: 0; }
        .category-subtitle { color: var(--valtara-blanco, #fff); font-size: 1.3rem; font-weight: 300; font-style: italic; margin-top: 0.5rem; opacity: 0.8; }
        
        .gallery-masonry { column-count: 3; column-gap: 2rem; width: 100%; }
        @media (max-width: 1024px) { .gallery-masonry { column-count: 2; column-gap: 1.5rem;} }
        @media (max-width: 600px) { .gallery-masonry { column-count: 1; column-gap: 0;} }
        
        .gallery-item {
            break-inside: avoid; margin-bottom: 2rem; border-radius: 12px; overflow: hidden;
            background-color: #0a0a0a; border: 1px solid rgba(212, 175, 55, 0.2); 
            box-shadow: 0 15px 35px rgba(0,0,0,0.6);
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease, border-color 0.4s ease;
            position: relative; cursor: pointer;
            /* Forzar renderizado en hardware para evitar parpadeos */
            transform: translateZ(0); 
            will-change: transform;
        }
        
        .gallery-item:hover {
            transform: translateY(-8px) translateZ(0);
            box-shadow: 0 25px 50px rgba(212, 175, 55, 0.15);
            border-color: rgba(212, 175, 55, 0.8);
            z-index: 10;
        }
        
        .gallery-item img {
            width: 100%; height: auto; display: block;
            transition: opacity 0.4s ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
            /* Fondo temporal mientras carga la imagen */
            background: linear-gradient(135deg, #111 0%, #050505 100%); 
            min-height: 200px; /* Evita saltos bruscos en el layout */
        }
        
        .gallery-item:hover img { transform: scale(1.04); }

        .gallery-overlay {
            position: absolute; bottom: 0; left: 0; right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
            padding: 3rem 1.5rem 1.5rem; opacity: 0; transition: opacity 0.4s ease; pointer-events: none; 
            display: flex; justify-content: space-between; align-items: flex-end;
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .overlay-text { color: var(--valtara-blanco, #fff); font-size: 0.95rem; font-weight: 500; letter-spacing: 2px; font-family: var(--font-base, sans-serif); border-bottom: 1px solid var(--valtara-oro, #D4AF37); padding-bottom: 4px; }
        .overlay-icon { color: var(--valtara-oro, #D4AF37); font-size: 1.2rem; }
    </style>
    
    <div style="max-width: 1250px; margin: 0 auto; padding: 2rem;">
        <div class="art-nails-header">
            <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 4rem; color: var(--valtara-oro, #D4AF37); margin-bottom: 2rem;"></i>
            <h2 class="art-nails-title">Art & Nails Gallery</h2>
            <p class="art-nails-desc">Explora el santuario de estética avanzada dirigido por nuestra Master Manicurista. Cada pieza visual es una demostración de arquitectura, simetría y precisión en miniatura para líderes que exigen perfección hasta en el más mínimo detalle.</p>
        </div>
`;

/**
 * ------------------------------------------------------------------------------------
 * 3. GENERADOR DE BUCLE (ALGORITMO INYECTOR DE IMÁGENES)
 * ------------------------------------------------------------------------------------
 */
nailCategories.forEach(cat => {
    
    // EL FIX MAESTRO: Cambiamos <section> por <div class="category-container">
    htmlCatalogoBelleza += `
        <div class="category-container" aria-label="${cat.title}" role="region">
            <div class="category-header">
                <h3 class="category-title">${cat.title}</h3>
                <p class="category-subtitle">${cat.subtitle}</p>
            </div>
            <div class="gallery-masonry">
    `;
    
    for(let i = 1; i <= cat.count; i++) {
        const fileName = `${cat.prefix}${i}.jpg`;
        const imagePath = `/gallery/${fileName}`; 
        const altTextPlaceholder = `Fotografía de manicuría: ${cat.title} - Diseño número ${i}`; 
        
        htmlCatalogoBelleza += `
                <div class="gallery-item" tabindex="0" role="img" aria-label="${altTextPlaceholder}">
                    <img src="${imagePath}" 
                         alt="${altTextPlaceholder}" 
                         loading="lazy" 
                         onerror="this.src='/logo.png'; this.style.objectFit='contain'; this.style.padding='4rem'; this.style.opacity='0.15';">
                    
                    <div class="gallery-overlay">
                        <span class="overlay-text">COD: ${fileName.toUpperCase()}</span>
                        <i class="fa-solid fa-gem overlay-icon"></i>
                    </div>
                </div>
        `;
    }
    
    // Cierre de la cuadrícula Masonry y del Div Contenedor
    htmlCatalogoBelleza += `
            </div>
        </div>
    `;
});

htmlCatalogoBelleza += `</div>`;

window.ValtaraModulos.catalogo_belleza = htmlCatalogoBelleza;
