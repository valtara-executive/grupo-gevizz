/**
 * ====================================================================================
 * MÓDULO: SECCIÓN INICIO - ART & NAILS (BANNER DINÁMICO V4.0 PRO)
 * Novedades: Diseño Editorial, Accesibilidad AAA inyectada, Teaser Dinámico.
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

(function() {
    // 1. POOL DE EXHIBICIÓN DINÁMICA CON DICCIONARIO DE ACCESIBILIDAD INTEGRADO
    // Seleccionamos 6 obras maestras (1 de cada categoría) con tus descripciones exactas.
    const featuredPool = [
        { 
            path: '/gallery/ext1.jpg', 
            teaser: 'Poder en Rojo Vino',
            alt: 'Fotografía de primer plano que muestra una manicura de uñas largas con una forma puntiaguda estilo "stiletto". Las uñas lucen un esmalte de gel en un tono rojo vino o burdeos profundo, con un acabado extremadamente brillante que refleja la luz. Las manos están relajadas y entrelazadas sobre una superficie de piel sintética blanca muy suave.'
        },
        { 
            path: '/gallery/gel2.jpg', 
            teaser: 'Magnetismo Ojo de Gato',
            alt: 'Imagen que destaca un diseño de uñas ovaladas utilizando la técnica magnética "ojo de gato". Una mano luce un tono ámbar dorado mientras que la otra muestra un verde limón eléctrico; ambas tienen esa característica línea de luz que parece moverse bajo la superficie sobre una alfombra de pelo blanco.'
        },
        { 
            path: '/gallery/r3.jpg', 
            teaser: 'Romance en Encaje Negro',
            alt: 'Fotografía cenital de dos manos sobre terciopelo azul oscuro. Uñas pintadas con esmalte de gel color borgoña rico y brillante. Las uñas de los dedos anulares y pulgares presentan un diseño de encaje negro delicado pintado a mano sobre una base nude.'
        },
        { 
            path: '/gallery/dis9.jpg', 
            teaser: 'Arte Monarca 3D',
            alt: 'Manicura de alto impacto inspirada en la naturaleza. El diseño recrea las alas de una mariposa monarca, utilizando una base de purpurina plateada y lavanda holográfica, con delicadas líneas negras que forman las celdas de las alas rematadas con puntos blancos.'
        },
        { 
            path: '/gallery/ped3.jpg', 
            teaser: 'Sofisticación Magnética',
            alt: 'Vista lateral de una pedicura con diseño sofisticado de efecto "ojo de gato". El esmalte base es negro, pero presenta una banda de luz verde esmeralda que atraviesa cada uña, creando un efecto de profundidad y movimiento sobre una toalla blanca.'
        },
        { 
            path: '/gallery/l5.jpg', 
            teaser: 'Brillo Bronce Atemporal',
            alt: 'Fotografía que muestra a una persona con una manicura de impacto en color bronce metálico o dorado viejo. Las uñas son cortas y redondeadas, cubiertas con una laca de acabado metalizado que refleja la luz de forma uniforme.'
        }
    ];
    
    // Algoritmo de Selección Aleatoria (Ruleta Rusa de Arte)
    const selected = featuredPool[Math.floor(Math.random() * featuredPool.length)];

    // 2. INYECCIÓN DEL HTML Y CSS ENCAPSULADO
    window.ValtaraModulos.inicio_arte_unas = `
    <style>
        /* Animaciones en cascada para dar fluidez de entrada */
        @keyframes floatUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .stagger-1 { animation: floatUp 0.8s ease forwards 0.2s; opacity: 0; }
        .stagger-2 { animation: floatUp 0.8s ease forwards 0.4s; opacity: 0; }
        .stagger-3 { animation: floatUp 0.8s ease forwards 0.6s; opacity: 0; }
        
        .art-nails-banner {
            margin: 6rem auto;
            background: linear-gradient(145deg, rgba(15, 15, 20, 0.95), rgba(5, 5, 8, 1));
            border: 1px solid rgba(212, 175, 55, 0.2);
            border-radius: 2rem;
            max-width: 1250px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(225, 48, 108, 0.05);
            display: grid;
            grid-template-columns: 1.1fr 1fr; /* Proporción asimétrica de revista */
        }
        
        /* Ajuste móvil */
        @media (max-width: 900px) {
            .art-nails-banner { grid-template-columns: 1fr; }
            .an-image-col { min-height: 400px; }
        }

        /* Título metalizado */
        .an-title-glow {
            background: linear-gradient(to right, #E1306C, #FFB6C1, #D4AF37);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 4.5rem;
            margin-bottom: 0.5rem;
            font-family: var(--font-accent, serif);
            line-height: 1.1;
        }

        /* Botón de Galería con brillo */
        .btn-go-gallery {
            background: linear-gradient(90deg, rgba(212,175,55,0.1), rgba(212,175,55,0.02));
            border: 1px solid var(--valtara-oro);
            color: var(--valtara-oro);
            padding: 1.2rem 3rem;
            font-size: 1.15rem;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.4s ease;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
        }
        .btn-go-gallery:hover {
            background: var(--valtara-oro);
            color: #000;
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
            transform: translateY(-3px);
        }
    </style>

    <div class="art-nails-banner reveal">
        
        <!-- ========================================== -->
        <!-- COLUMNA A: IMAGEN DE IMPACTO (LADO IZQUIERDO) -->
        <!-- ========================================== -->
        <div class="an-image-col" style="position: relative; overflow: hidden; background: #000;">
            <img src="${selected.path}" 
                 alt="${selected.alt}" 
                 title="Sugerencia del día: ${selected.teaser}"
                 style="width: 100%; height: 100%; object-fit: cover; filter: contrast(1.1) brightness(0.85); transition: transform 12s linear; transform-origin: center;" 
                 onmouseover="this.style.transform='scale(1.08)'" 
                 onmouseout="this.style.transform='scale(1)'"
                 onerror="this.src='/logo.png'; this.style.objectFit='contain'; this.style.padding='5rem'; this.style.opacity='0.2';">
            
            <!-- Sombra de Viñeta Cinematográfica -->
            <div style="position: absolute; inset: 0; background: inset 0 0 100px rgba(0,0,0,0.8); box-shadow: inset -20px 0 50px rgba(0,0,0,0.9); pointer-events: none;"></div>
            
            <!-- Etiqueta Teaser Dinámica (Flotante estilo Glassmorphism) -->
            <div style="position: absolute; bottom: 30px; left: 30px; right: 30px; background: rgba(10, 10, 15, 0.65); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.1); border-left: 4px solid var(--valtara-oro); padding: 1.5rem; border-radius: 1rem;">
                <span style="color: var(--valtara-oro); font-size: 0.8rem; letter-spacing: 3px; text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 5px;"><i class="fa-solid fa-sparkles"></i> Sugerencia del Día</span>
                <p style="color: #fff; margin: 0; font-size: 1.3rem; font-family: var(--font-accent, serif); font-style: italic;">"${selected.teaser}"</p>
            </div>
        </div>

        <!-- ========================================== -->
        <!-- COLUMNA B: CONTENIDO EJECUTIVO (LADO DERECHO) -->
        <!-- ========================================== -->
        <div style="padding: 5rem 4rem; display: flex; flex-direction: column; justify-content: center; position: relative;">
            
            <!-- Resplandor de fondo -->
            <div style="position: absolute; top: -100px; right: -100px; width: 300px; height: 300px; background: #E1306C; border-radius: 50%; opacity: 0.08; filter: blur(70px); pointer-events: none;"></div>
            
            <div class="stagger-1" style="margin-bottom: 2rem;">
                <span style="background: rgba(225, 48, 108, 0.1); color: #FFB6C1; padding: 0.6rem 1.8rem; border-radius: 30px; font-weight: 800; font-size: 0.85rem; border: 1px solid rgba(225, 48, 108, 0.3); text-transform: uppercase; letter-spacing: 2px;">
                    <i class="fa-solid fa-crown" style="margin-right: 5px;"></i> Valtara Beauty Partner
                </span>
            </div>
            
            <h3 class="an-title-glow stagger-1">Art & Nails</h3>
            <p class="stagger-2" style="color: var(--valtara-blanco); font-size: 1.5rem; font-weight: 300; margin-bottom: 2rem; letter-spacing: 1px;">El Santuario de la Estética Integral</p>
            
            <p class="stagger-2" style="color: var(--valtara-gris-texto); font-size: 1.15rem; margin-bottom: 3rem; line-height: 1.9; font-weight: 300;">
                Tu imagen es tu firma ejecutiva. Más allá de la biomecánica, completamos tu experiencia con nuestra división especializada en estética. Manicura de autor, laca tradicional, sistemas de protección Rubber y pedicura spa diseñados para la perfección.
            </p>

            <!-- EL BOTÓN PRINCIPAL (Reductor de fricción hacia la Galería) -->
            <div class="stagger-3" style="margin-bottom: 3.5rem;">
                <button onclick="Router.navigate('beauty')" class="btn-go-gallery" aria-label="Abrir el catálogo completo de diseños de uñas">
                    Explorar la Bóveda Visual <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>

            <!-- Línea separadora sutil -->
            <hr style="border: 0; height: 1px; background: linear-gradient(90deg, rgba(212,175,55,0.3), transparent); margin-bottom: 2rem;">

            <!-- FOOTER INTERNO DE LA TARJETA (Los Enlaces Vitales) -->
            <div class="stagger-3">
                <p style="color: #666; font-style: italic; font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.5;">
                    * Gestión y cotización directa con nuestra Master Socia en sus canales oficiales.
                </p>
                
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="https://wa.me/525525248816" target="_blank" aria-label="Reservar cita por WhatsApp" style="text-decoration: none; background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.5); color: #25D366; font-weight: 700; padding: 0.8rem 1.8rem; border-radius: 8px; font-size: 1rem; display: flex; align-items: center; gap: 8px; transition: 0.3s;" onmouseover="this.style.background='#25D366'; this.style.color='#000';" onmouseout="this.style.background='rgba(37, 211, 102, 0.1)'; this.style.color='#25D366';">
                        <i class="fa-brands fa-whatsapp" style="font-size: 1.3rem;"></i> 55 2524 8816
                    </a>
                    <a href="https://www.instagram.com/art.nails02" target="_blank" aria-label="Ver perfil de Instagram" style="text-decoration: none; background: rgba(225, 48, 108, 0.1); border: 1px solid rgba(225, 48, 108, 0.5); color: #FFB6C1; font-weight: 700; padding: 0.8rem 1.8rem; border-radius: 8px; font-size: 1rem; display: flex; align-items: center; gap: 8px; transition: 0.3s;" onmouseover="this.style.background='#E1306C'; this.style.color='#fff';" onmouseout="this.style.background='rgba(225, 48, 108, 0.1)'; this.style.color='#FFB6C1';">
                        <i class="fa-brands fa-instagram" style="font-size: 1.3rem;"></i> Instagram
                    </a>
                </div>
            </div>
            
        </div>
    </div>
    `;
})();
