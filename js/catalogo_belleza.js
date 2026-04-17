/**
 * ====================================================================================
 * MÓDULO VISTA: CATÁLOGO DE BELLEZA (ART & NAILS GALLERY) V2.0
 * Arquitectura: Single Page Application (SPA) Component
 * Motor: Masonry Layout Dinámico (Adaptativo Vertical/Horizontal sin recortes)
 * Corrección de Enrutamiento: Rutas Absolutas (Absolute Paths) para PWA Clean URLs.
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

/**
 * ------------------------------------------------------------------------------------
 * 1. BASE DE DATOS LOCAL (DICCIONARIO DE CATEGORÍAS)
 * Aquí residen las 6 categorías maestras de la división de Manicuría.
 * El prefijo (prefix) dictamina cómo buscará el archivo en la carpeta /gallery/.
 * ------------------------------------------------------------------------------------
 */
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

/**
 * ------------------------------------------------------------------------------------
 * 2. MOTOR DE RENDERIZADO (INYECCIÓN DE ESTILOS Y ESTRUCTURA)
 * Este bloque contiene el CSS encapsulado que genera el Mosaico Inteligente.
 * Se utiliza 'column-count' en lugar de 'grid' para respetar la orientación 
 * de las fotografías (verticales vs horizontales) sin realizar recortes forzados.
 * ------------------------------------------------------------------------------------
 */
let htmlCatalogoBelleza = `
    <style>
        /* --- ENCABEZADOS Y TIPOGRAFÍA --- */
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
        
        /* --- ESTRUCTURA DE CATEGORÍAS --- */
        .category-section { 
            margin-bottom: 7rem; 
        }
        .category-header { 
            margin-bottom: 3rem; 
            border-bottom: 1px solid rgba(212, 175, 55, 0.2); 
            padding-bottom: 1.5rem; 
            text-align: left;
        }
        .category-title { 
            color: var(--valtara-oro, #D4AF37); 
            font-size: 2.8rem; 
            font-family: var(--font-accent, serif); 
            letter-spacing: 1px; 
            margin: 0; 
        }
        .category-subtitle { 
            color: var(--valtara-blanco, #fff); 
            font-size: 1.3rem; 
            font-weight: 300; 
            font-style: italic; 
            margin-top: 0.5rem; 
            opacity: 0.8; 
        }
        
        /* --- MAGIA DEL MOSAICO (MASONRY LAYOUT) --- */
        /* Responsividad: 3 columnas en PC, 2 en Tablet, 1 en Móvil */
        .gallery-masonry {
            column-count: 3;
            column-gap: 2rem;
            width: 100%;
        }
        @media (max-width: 1024px) { .gallery-masonry { column-count: 2; column-gap: 1.5rem;} }
        @media (max-width: 600px) { .gallery-masonry { column-count: 1; column-gap: 0;} }
        
        /* --- EL MARCO ADAPTATIVO FLOTANTE DE ULTRA-LUJO --- */
        .gallery-item {
            break-inside: avoid; /* Mandato estricto: no partir imágenes entre columnas */
            margin-bottom: 2rem;
            border-radius: 12px;
            overflow: hidden;
            background-color: #0a0a0a;
            border: 1px solid rgba(212, 175, 55, 0.2); /* Borde oro champaña muy sutil */
            box-shadow: 0 15px 35px rgba(0,0,0,0.6);
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease, border-color 0.4s ease;
            position: relative;
            cursor: pointer;
        }
        
        /* Efecto Hover: Elevación y destello dorado */
        .gallery-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(212, 175, 55, 0.15);
            border-color: rgba(212, 175, 55, 0.8);
        }
        
        /* --- EL SECRETO ANTI-RECORTE --- */
        .gallery-item img {
            width: 100%;
            height: auto; /* Mantiene la proporción matemática original intacta */
            display: block;
            transition: opacity 0.4s ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        /* Efecto Zoom Interior Premium */
        .gallery-item:hover img {
            transform: scale(1.04); 
        }

        /* --- DEGRADADO INFERIOR Y ETIQUETA DE CÓDIGO --- */
        .gallery-overlay {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
            padding: 3rem 1.5rem 1.5rem;
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none; /* Permite que los clics traspasen a la imagen si es necesario */
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }
        .overlay-text {
            color: var(--valtara-blanco, #fff);
            font-size: 0.95rem;
            font-weight: 500;
            letter-spacing: 2px;
            font-family: var(--font-base, sans-serif);
            border-bottom: 1px solid var(--valtara-oro, #D4AF37);
            padding-bottom: 4px;
        }
        .overlay-icon {
            color: var(--valtara-oro, #D4AF37);
            font-size: 1.2rem;
        }
    </style>
    
    <!-- CONTENEDOR PRINCIPAL DEL MÓDULO -->
    <div style="max-width: 1250px; margin: 0 auto; padding: 2rem;">
        
        <!-- CABECERA DE LA GALERÍA -->
        <div class="art-nails-header">
            <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 4rem; color: var(--valtara-oro, #D4AF37); margin-bottom: 2rem;"></i>
            <h2 class="art-nails-title">Art & Nails Gallery</h2>
            <p class="art-nails-desc">Explora el santuario de estética avanzada dirigido por nuestra Master Manicurista. Cada pieza visual es una demostración de arquitectura, simetría y precisión en miniatura para líderes que exigen perfección hasta en el más mínimo detalle.</p>
        </div>
`;

/**
 * ------------------------------------------------------------------------------------
 * 3. GENERADOR DE BUCLE (ALGORITMO INYECTOR DE IMÁGENES)
 * Este loop recorre las 6 categorías y genera las 43 imágenes matemáticamente.
 * CORRECCIÓN CRÍTICA: Se implementó la RUTA ABSOLUTA (/) para evitar fallos 404
 * causados por el enrutamiento de URLs limpias (Clean URLs).
 * ------------------------------------------------------------------------------------
 */
nailCategories.forEach(cat => {
    
    // Inyección de la cabecera de la categoría actual
    htmlCatalogoBelleza += `
        <section class="category-section" aria-label="${cat.title}">
            <div class="category-header">
                <h3 class="category-title">${cat.title}</h3>
                <p class="category-subtitle">${cat.subtitle}</p>
            </div>
            <div class="gallery-masonry">
    `;
    
    // Bucle interno para generar las fotografías de la categoría actual
    for(let i = 1; i <= cat.count; i++) {
        const fileName = `${cat.prefix}${i}.jpg`;
        
        // [RESOLUCIÓN DEL BUG]: La diagonal inicial '/' le dice al navegador que 
        // vaya a la raíz del dominio (valtaraexecutive.com) sin importar en qué URL estemos.
        const imagePath = `/gallery/${fileName}`; 
        
        // Placeholder dinámico para accesibilidad. 
        // (Será reemplazado o enriquecido cuando tengamos tu mapa de descripciones).
        const altTextPlaceholder = `Fotografía de manicuría: ${cat.title} - Diseño número ${i}`; 
        
        htmlCatalogoBelleza += `
                <div class="gallery-item" tabindex="0" role="img" aria-label="${altTextPlaceholder}">
                    <!-- 
                      loading="lazy": Salva el ancho de banda del usuario cargando solo lo visible.
                      onerror: Si una foto no subió bien, muestra el logo con ruta ABSOLUTA (/logo.png).
                    -->
                    <img src="${imagePath}" 
                         alt="${altTextPlaceholder}" 
                         loading="lazy" 
                         onerror="this.src='/logo.png'; this.style.objectFit='contain'; this.style.padding='4rem'; this.style.opacity='0.15';">
                    
                    <!-- Capa visual de interacción (Hover) -->
                    <div class="gallery-overlay">
                        <span class="overlay-text">COD: ${fileName.toUpperCase()}</span>
                        <i class="fa-solid fa-gem overlay-icon"></i>
                    </div>
                </div>
        `;
    }
    
    // Cierre de la cuadrícula Masonry y de la Sección
    htmlCatalogoBelleza += `
            </div>
        </section>
    `;
});

// Cierre del contenedor principal
htmlCatalogoBelleza += `</div>`;

// ------------------------------------------------------------------------------------
// 4. ASIGNACIÓN GLOBAL
// Se inyecta todo el código compilado en el objeto global de módulos de Valtara.
// ------------------------------------------------------------------------------------
window.ValtaraModulos.catalogo_belleza = htmlCatalogoBelleza;
