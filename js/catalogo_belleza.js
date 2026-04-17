/**
 * ====================================================================================
 * MÓDULO VISTA: CATÁLOGO DE BELLEZA (ART & NAILS GALLERY)
 * Motor: Masonry Layout Dinámico (Adaptativo Vertical/Horizontal sin recortes)
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

// 1. DICCIONARIO DE DATOS (Tu Mapa de Sitio exacto)
const nailCategories = [
    { 
        id: "ext", 
        title: "Extensiones", 
        subtitle: "Arquitectura de la Mirada: Longitud y Estructura", 
        prefix: "ext", 
        count: 5 
    },
    { 
        id: "gel", 
        title: "Gel Semipermanente", 
        subtitle: "Brillo Infinito: El Color de la Resistencia", 
        prefix: "gel", 
        count: 8 
    },
    { 
        id: "rubber", 
        title: "Rubber y Sistemas de Protección", 
        subtitle: "Blindaje de Queratina: Fortaleza Invisible", 
        prefix: "r", 
        count: 7 
    },
    { 
        id: "disenos", 
        title: "Diseños y Decoraciones", 
        subtitle: "Arte en Miniatura: Detalles a Mano Alzada", 
        prefix: "dis", 
        count: 12 
    },
    { 
        id: "pedicura", 
        title: "Pedicura Perfecta", 
        subtitle: "El Ritual de la Seda: Estética Podológica", 
        prefix: "ped", 
        count: 7 
    },
    { 
        id: "laca", 
        title: "Laca Tradicional", 
        subtitle: "Elegancia Atemporal: El Clásico Refinado", 
        prefix: "l", 
        count: 5 
    }
];

// 2. MOTOR DE RENDERIZADO (Construcción del HTML y CSS Inyectado)
let htmlCatalogoBelleza = `
    <!-- ESTILOS EXCLUSIVOS DE LA GALERÍA (Scope aislado) -->
    <style>
        .art-nails-header { 
            text-align: center; 
            margin-bottom: 5rem; 
            padding-top: 4rem; 
        }
        .art-nails-title { 
            font-family: var(--font-accent, serif); 
            font-size: 4.5rem; 
            color: var(--valtara-blanco, #fff); 
            margin-bottom: 1rem; 
        }
        .art-nails-desc { 
            color: var(--valtara-gris-texto, #aaa); 
            font-size: 1.5rem; 
            max-width: 800px; 
            margin: 0 auto; 
            font-weight: 300; 
            line-height: 1.8; 
        }
        
        .category-section { 
            margin-bottom: 6rem; 
        }
        .category-header { 
            margin-bottom: 3rem; 
            border-bottom: 1px solid rgba(212, 175, 55, 0.2); 
            padding-bottom: 1.5rem; 
            text-align: left;
        }
        .category-title { 
            color: var(--valtara-oro, #D4AF37); 
            font-size: 2.5rem; 
            font-family: var(--font-accent, serif); 
            letter-spacing: 1px; 
            margin: 0; 
        }
        .category-subtitle { 
            color: var(--valtara-blanco, #fff); 
            font-size: 1.2rem; 
            font-weight: 300; 
            font-style: italic; 
            margin-top: 0.5rem; 
            opacity: 0.8; 
        }
        
        /* MAGIA DEL MOSAICO (MASONRY): Adapta horizontales y verticales sin deformar */
        .gallery-masonry {
            column-count: 3;
            column-gap: 2rem;
            width: 100%;
        }
        @media (max-width: 1024px) { .gallery-masonry { column-count: 2; column-gap: 1.5rem;} }
        @media (max-width: 600px) { .gallery-masonry { column-count: 1; column-gap: 0;} }
        
        /* EL MARCO ADAPTATIVO FLOTANTE */
        .gallery-item {
            break-inside: avoid; /* Evita que una foto se parta a la mitad entre columnas */
            margin-bottom: 2rem;
            border-radius: 12px;
            overflow: hidden;
            background-color: #0a0a0a;
            border: 1px solid rgba(212, 175, 55, 0.3); /* Borde oro suave */
            box-shadow: 0 15px 35px rgba(0,0,0,0.6);
            transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
            position: relative;
        }
        .gallery-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(212, 175, 55, 0.15);
            border-color: rgba(212, 175, 55, 0.9);
        }
        
        /* EL SECRETO ANTI-RECORTE */
        .gallery-item img {
            width: 100%;
            height: auto; /* Mantiene la proporción original matemática */
            display: block;
            transition: opacity 0.4s ease, transform 0.6s ease;
        }
        .gallery-item:hover img {
            transform: scale(1.03); /* Efecto zoom imperceptible y lujoso */
        }

        /* Degradado inferior para el texto */
        .gallery-overlay {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.95), transparent);
            padding: 2.5rem 1.5rem 1.5rem;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }
        .overlay-text {
            color: #fff;
            font-size: 1rem;
            font-weight: 300;
            letter-spacing: 1px;
            font-family: var(--font-base, sans-serif);
        }
    </style>
    
    <!-- CONTENEDOR PRINCIPAL -->
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
        <div class="art-nails-header">
            <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 3.5rem; color: var(--valtara-oro, #D4AF37); margin-bottom: 2rem;"></i>
            <h2 class="art-nails-title">Art & Nails Gallery</h2>
            <p class="art-nails-desc">Explora el santuario de estética avanzada dirigido por nuestra Master Manicurista. Cada pieza visual es una demostración de arquitectura, simetría y precisión en miniatura.</p>
        </div>
`;

// 3. GENERADOR DE BUCLE (El algoritmo inyecta las 43 fotos automáticamente)
nailCategories.forEach(cat => {
    htmlCatalogoBelleza += `
        <section class="category-section" aria-label="${cat.title}">
            <div class="category-header">
                <h3 class="category-title">${cat.title}</h3>
                <p class="category-subtitle">${cat.subtitle}</p>
            </div>
            <div class="gallery-masonry">
    `;
    
    for(let i = 1; i <= cat.count; i++) {
        const fileName = `${cat.prefix}${i}.jpg`;
        const imagePath = `gallery/${fileName}`; // Apunta a tu nueva carpeta 'gallery'
        
        // Placeholder para tu accesibilidad futura. (Ej: "Imagen gel1.jpg")
        const altTextPlaceholder = `${cat.title} - Diseño ${i}`; 
        
        htmlCatalogoBelleza += `
                <div class="gallery-item" tabindex="0">
                    <!-- lazy loading es VITAL para que la página no colapse cargando 43 imágenes de golpe -->
                    <img src="${imagePath}" 
                         alt="${altTextPlaceholder}" 
                         loading="lazy" 
                         onerror="this.src='logo.png'; this.style.objectFit='contain'; this.style.padding='3rem'; this.style.opacity='0.2';">
                    <div class="gallery-overlay">
                        <span class="overlay-text">COD: ${fileName.toUpperCase()}</span>
                    </div>
                </div>
        `;
    }
    
    htmlCatalogoBelleza += `
            </div>
        </section>
    `;
});

htmlCatalogoBelleza += `</div>`;

// Asignar al objeto global
window.ValtaraModulos.catalogo_belleza = htmlCatalogoBelleza;
