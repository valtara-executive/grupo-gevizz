/**
 * ====================================================================================
 * MÓDULO VISTA: CATÁLOGO DE BELLEZA (ART & NAILS GALLERY) V3.0 (ACCESIBILIDAD AAA)
 * Arquitectura: Single Page Application (SPA) Component
 * Motor: Masonry Layout Dinámico (Adaptativo Vertical/Horizontal sin recortes)
 * Integración: Diccionario Semántico para Lectores de Pantalla (Alt Text Exhaustivo)
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
 * 2. DICCIONARIO SEMÁNTICO DE ACCESIBILIDAD (ALT TEXT)
 * ------------------------------------------------------------------------------------
 */
const nailDescriptions = {
    // CATEGORÍA 1: Extensiones
    "ext1": "Fotografía de primer plano que muestra una manicura de uñas largas con una forma puntiaguda estilo 'stiletto'. Las uñas lucen un esmalte de gel en un tono rojo vino o burdeos profundo, con un acabado extremadamente brillante que refleja la luz. Las manos están relajadas y entrelazadas sobre una superficie de piel sintética blanca muy suave y acolchada, lo que resalta la intensidad del color rojo contra el fondo claro.",
    "ext2": "Imagen de primer plano de unas manos con uñas de longitud considerable y forma ovalada. El diseño consiste en un esmalte sólido de color fucsia encendido con un brillo espejo. Las manos descansan sobre una base de textura peluda de color blanco puro. Al fondo de la imagen, de manera muy sutil y desenfocada, se percibe el entorno del salón y la parte superior del rostro de una persona, manteniendo el protagonismo en el vibrante color rosa de las uñas.",
    "ext3": "Descripción de una manicura artística en uñas largas y afiladas. El diseño es una combinación elegante: algunas uñas están pintadas en negro sólido brillante, mientras que otras muestran un diseño de 'glitter' plateado que nace desde la punta y se desvanece hacia la base (efecto ombré) sobre una base de color natural o 'nude'. Las manos resaltan sobre el fondo oscuro de una prenda de ropa negra, lo que hace que los destellos plateados de la purpurina cobren más vida.",
    "ext4": "Primer plano lateral de una mano con uñas muy largas y puntiagudas. Se aprecia un diseño sofisticado de efecto magnético u 'ojo de gato' que crea una banda de luz blanca sobre una base de color perla y rosa suave. El efecto visual simula la profundidad de una piedra preciosa. La persona luce anillos plateados y se observa un fondo neutro con herramientas de trabajo de manicura desenfocadas, dando un aspecto profesional y detallado.",
    "ext5": "Esta imagen presenta el mismo diseño que el archivo ext3.jpg: una manicura en uñas largas tipo 'stiletto' que alterna el color negro azabache brillante con un degradado de purpurina plateada sobre una base translúcida. La posición de las manos sobre el pecho, apoyadas en una tela negra, enfatiza el contraste entre el brillo del esmalte y la textura de la ropa.",
    
    // CATEGORÍA 2: Gel Semipermanente
    "gel1": "Fotografía de una manicura más natural en uñas cortas de forma cuadrada con bordes suaves. El color principal es un marrón chocolate cálido y brillante. Como detalle especial, la uña del dedo anular de cada mano funciona como acento, estando completamente cubierta de una purpurina densa en tonos dorados y plateados. Las manos reposan sobre una mesa de madera de tono cálido bajo una iluminación que resalta la textura del esmalte.",
    "gel2": "Imagen que destaca un diseño de uñas ovaladas de longitud media utilizando la técnica magnética 'ojo de gato'. Una mano luce un tono ámbar dorado mientras que la otra muestra un verde limón eléctrico; ambas tienen esa característica línea de luz que parece moverse bajo la superficie. Las manos están posadas sobre una alfombra de pelo largo blanco, creando un ambiente de lujo y suavidad que contrasta con los colores metálicos.",
    "gel3": "Primer plano de una manicura clásica en uñas cortas y redondeadas. El esmalte es de un color rosa viejo o malva, un tono sobrio y elegante con acabado de alto brillo. En la mano izquierda se aprecia un anillo de plata con grabados detallados. El fondo consiste en una textura de piel sintética blanca que aporta mucha luz a la fotografía, destacando la limpieza y precisión del trabajo en las cutículas.",
    "gel4": "Primer plano lateral de una mano con una manicura de uñas cortas y naturales de forma almendrada. El esmalte es de un color rosa pastel suave, casi traslúcido, con un acabado mate aterciopelado. La mano descansa sobre una tela de punto texturizada de color beige, y la iluminación suave de la tarde resalta la limpieza de la manicura y la delicadeza del tono.",
    "gel5": "Fotografía cenital de dos manos sobre una alfombra de pelo largo blanco. Las uñas tienen una longitud media y forma de ataúd (coffin). Están pintadas con un esmalte de gel de color azul medianoche profundo, con un acabado brillante. Como acento, las uñas de los dedos anulares y pulgares están decoradas con un diseño de constelaciones doradas y diminutas estrellas blancas, añadiendo un toque artístico al diseño.",
    "gel6": "Primer plano oblicuo de una mano con uñas largas y afiladas estilo 'stiletto'. El diseño es audaz: una base de color lavanda pastel con un acabado holográfico que refleja destellos arcoíris bajo la luz. Las puntas tienen una manicura francesa moderna en negro brillante, creando un contraste llamativo. La mano lleva un anillo plateado minimalista y el fondo es una superficie de mármol gris.",
    "gel7": "Imagen enfocada en una mano con uñas cortas y cuadradas. El color principal es un rojo escarlata vibrante con un acabado brillante. En las uñas de los dedos medio y anular, se ha creado un diseño de arte de uñas: una base de color nude con pequeñas flores pintadas a mano en blanco, rojo y verde, añadiendo un toque fresco y floral. La mano descansa sobre una mesa de madera clara.",
    "gel8": "Primer plano de dos manos con una manicura de uñas largas y ovaladas. El esmalte es de un tono gris taupe elegante y sofisticado con un acabado mate. La mano derecha lleva un anillo de plata intrincado en el dedo índice. El fondo es difuso pero se percibe un salón de manicura con detalles en tonos tierra, creando un ambiente acogedor.",
    
    // CATEGORÍA 3: Rubber y Sistemas de Protección
    "r1": "Fotografía de primer plano de una mano con uñas de longitud media y forma de almendra. El diseño es una manicura francesa clásica con una base rosa nude y puntas blancas limpias, pero con un toque moderno: una fina línea dorada metálica bordea la sonrisa de la manicura francesa. La mano descansa sobre una superficie de piel sintética negra, resaltando la elegancia del diseño.",
    "r2": "Primer plano lateral de una mano con uñas cortas y cuadradas. El esmalte es de un tono verde esmeralda profundo con un acabado brillante. Como detalle de acento, las uñas de los dedos índice y anular están decoradas con un diseño geométrico sutil en líneas doradas y blancas sobre una base transparente. La mano lleva varios anillos apilables de plata minimalistas.",
    "r3": "Fotografía cenital de dos manos sobre una superficie de terciopelo azul oscuro. Las uñas tienen una longitud media y forma de ataúd. Están pintadas con un esmalte de gel de color borgoña rico con un acabado brillante. Las uñas de los dedos anulares y pulgares presentan un diseño de encaje negro delicado pintado a mano sobre una base nude, añadiendo un toque romántico y detallado.",
    "r4": "Primer plano oblicuo de una mano con uñas largas y afiladas estilo 'stiletto'. El diseño es llamativo: una base de color negro azabache con un efecto de degradado (ombré) de purpurina plateada gruesa que se extiende desde la base hasta la punta. La mano lleva un anillo de plata llamativo con una piedra negra grande. El fondo es oscuro y desenfocado, manteniendo el foco en el brillo del diseño.",
    "r5": "Fotografía de primer plano que muestra una manicura de uñas cortas y cuadradas con un diseño coordinado en tonos tierra. Se alternan uñas en color café rojizo sólido, un tono beige crema y uñas de acento con un efecto de mármol suave en tonos rosados y blancos. Las manos están posicionadas una sobre otra, destacando el acabado de alto brillo y la armonía de la paleta de colores otoñales.",
    "r6": "Imagen detallada de una manicura en uñas cortas y redondeadas con un efecto 'egg shell' o cáscara de huevo. La base es un esmalte rosa pastel suave cubierto con pequeñas motas negras irregulares que simulan una textura orgánica. Las manos descansan sobre un fondo urbano desenfocado, lo que permite que el diseño delicado y moderno de las uñas sea el protagonista absoluto.",
    "r7": "Vista de cerca de una manicura vibrante y juvenil en uñas cortas. El diseño combina uñas de color turquesa sólido con uñas de base nude decoradas con grandes puntos de purpurina (confeti) en tonos lila, blanco y verde menta concentrados cerca de la cutícula. La iluminación es clara y directa, resaltando la limpieza del trabajo y el contraste alegre de los colores sobre una mesa de manicura.",
    
    // CATEGORÍA 4: Diseños y Decoraciones
    "dis1": "Descripción de un diseño de arte de uñas altamente detallado y complejo sobre uñas largas con forma stiletto. La temática es una mezcla de estética anime y juegos de azar; incluye uñas con patrones de damero (ajedrez) en blanco y negro, ilustraciones de personajes de anime con trazos finos, y motivos de naipes como corazones y picas. Las manos se cruzan sobre un fondo de purpurina negra brillante que acentúa el estilo maximalista y artístico del diseño.",
    "dis2": "Fotografía que muestra una manicura romántica y detallada en uñas de forma ovalada. La base es un esmalte plateado holográfico con mucho destello, complementado con una manicura francesa en color rojo cereza profundo. El diseño se eleva con pequeños corazones rosados y puntos blancos distribuidos artísticamente. Las manos reposan sobre una textura blanca de pelo largo, creando una composición suave y femenina.",
    "dis3": "Primer plano de una manicura con temática de 'coquette' sobre una base de efecto ojo de gato plateado. El diseño presenta trazos finos de color rojo metálico que forman lazos y cintas delicadas en cada uña. La luz se refleja en el pigmento magnético de la base, dando una sensación de movimiento y profundidad, mientras que los detalles rojos aportan un contraste elegante y sofisticado sobre el fondo oscuro.",
    "dis4": "Imagen de una manicura con diseño 'cow print' o estampado de vaca sobre uñas largas de forma almendrada. La base es un color blanco hueso mate con manchas negras irregulares distribuidas por toda la superficie. La mano se muestra en una pose relajada con el pulgar hacia arriba, destacando la tendencia minimalista y moderna de este tipo de 'animal print' en un entorno de iluminación cálida.",
    "dis5": "Vista detallada de una manicura mística y celestial en uñas de forma almendrada. Presenta un degradado (ombré) que va de un tono piel natural en la base hacia un lavanda suave en las puntas. Las uñas de acento están decoradas con delicadas estrellas doradas y puntos que simulan constelaciones. La mano luce un anillo de oro labrado, reforzando la estética mágica y elegante del conjunto.",
    "dis6": "Descripción de un diseño de uñas vanguardista inspirado en reptiles o dragones sobre uñas ovaladas. El diseño utiliza una base púrpura metálica con una textura de 'piel de serpiente' en relieve. El detalle principal son los ojos de reptil realistas pintados en color verde esmeralda con pupilas verticales negras. Es un trabajo de arte 3D muy detallado que resalta sobre el tono de piel, ideal para un look audaz y temático.",
    "dis7": "Fotografía de una manicura artística que juega con el espacio negativo en uñas ovaladas. Combina uñas de color azul petróleo sólido con diseños de manicura francesa asimétrica y líneas onduladas de estilo 'swirl' en el mismo tono azul sobre una base nude. El acabado es muy brillante y la composición visual es dinámica y moderna, destacando sobre un fondo oscuro desenfocado.",
    "dis8": "Fotografía detallada de una manicura lúdica y artística en uñas de forma ovalada con base blanca sólida. El diseño presenta ilustraciones de estilo 'doodle' o dibujo a mano alzada con temática felina: se observan gatos negros con rayas, esqueletos de pescado (espinas), siluetas de peces en rojo y pequeños marcos con rostros de gatos. Los dibujos están acompañados de pequeñas estrellas multicolores, creando un conjunto vibrante y divertido sobre un fondo de ropa con estampados florales.",
    "dis9": "Descripción de una manicura de alto impacto visual inspirada en la naturaleza sobre uñas largas de forma almendrada. El diseño recrea las alas de una mariposa monarca, utilizando una base de purpurina plateada y lavanda holográfica. Sobre esta base, se han trazado delicadas líneas negras que forman las celdas de las alas, rematadas con pequeños puntos blancos en los bordes. Las manos se muestran al aire libre, con la luz del sol resaltando el brillo del esmalte y un anillo plateado con una piedra amatista.",
    "dis10": "Imagen de una manicura delicada y botánica en uñas naturales cortas y cuadradas. La base es un esmalte de color azul marino profundo y brillante que actúa como lienzo para un jardín de micro-flores pintadas a mano. El diseño incluye pétalos en tonos amarillos, rosas y blancos con pequeños tallos verdes, distribuidos de forma orgánica en cada uña. La mano luce un anillo ancho de color negro mate, creando un contraste moderno con el diseño floral clásico.",
    "dis11": "Primer plano de una manicura colorida y dinámica en uñas ovaladas. Sobre una base nude translúcida, se han pintado líneas onduladas que forman un arcoíris con los colores rojo, naranja, amarillo y azul. El diseño se complementa con pequeñas estrellas blancas de cuatro puntas (destellos) distribuidas a lo largo de las ondas. La mano posa sobre una tela de color púrpura intenso, lo que hace que los colores del arcoíris resalten significativamente.",
    "dis12": "Vista detallada de una manicura con efecto de mármol o 'fuego líquido' en uñas largas con forma de almendra. El diseño utiliza una técnica de mezcla de colores (marmoleado) que combina tonos azul cielo, rosa pastel y blanco, creando patrones fluidos y abstractos sobre una base nude. El diseño se aplica de forma asimétrica, cubriendo a veces toda la uña y otras veces solo las puntas. Las manos sostienen un fondo con patrones gráficos en blanco y negro, acentuando la suavidad de los colores pastel.",
    
    // CATEGORÍA 5: Pedicura Perfecta
    "ped1": "Fotografía de primer plano de una pedicura en un pie derecho. Las uñas están cortadas de forma cuadrada con bordes suavemente redondeados y lucen un esmalte de gel en color verde bosque profundo con un acabado de alto brillo. En el segundo dedo se aprecia un anillo triple de plata que añade un toque decorativo. El pie descansa sobre una superficie textil protectora de color azul claro, resaltando la limpieza y uniformidad del esmalte.",
    "ped2": "Imagen detallada de una pedicura en un pie izquierdo, mostrando el mismo diseño que el archivo anterior: un esmalte sólido en tono verde oscuro brillante. La aplicación es precisa, cubriendo perfectamente la placa de la uña hasta la cutícula. Se observa un anillo sencillo de plata en el tercer dedo. La iluminación es cenital y clara, permitiendo apreciar la textura de la piel y el acabado liso del gel sobre el fondo azul claro.",
    "ped3": "Vista lateral de una pedicura con un diseño sofisticado de efecto 'ojo de gato' o magnético. El esmalte base es negro, pero presenta una banda de luz verde esmeralda que atraviesa cada uña, creando un efecto de profundidad y movimiento. El pie está posado sobre una toalla blanca acolchada, lo que ayuda a que los destellos metálicos del esmalte resalten bajo la luz directa del salón.",
    "ped4": "Primer plano de una pedicura técnica que utiliza pigmentos magnéticos sobre una base oscura. Se aprecia claramente cómo la línea de luz verde se desplaza según el ángulo, simulando la apariencia de una piedra preciosa. La piel del pie luce hidratada y las cutículas están perfectamente trabajadas. El fondo de toalla blanca proporciona un contraste limpio que enfatiza el brillo del diseño 'ojo de gato'.",
    "ped5": "Fotografía de una pedicura completa en ambos pies, presentados dentro de unas sandalias de tipo 'chanclas' con un patrón decorativo de abanicos en azul, amarillo y rosa. Las uñas de los pies están pintadas con un esmalte de gel de color azul turquesa vibrante y sólido. El acabado es brillante y uniforme, ideal para un estilo veraniego y fresco. Los pies descansan sobre una superficie de mármol claro.",
    "ped6": "Vista superior de una pedicura en ambos pies, calzando sandalias de lujo de color beige con un logotipo dorado prominente. Las uñas presentan un esmalte de gel en color rosa neón o fucsia intenso, con un acabado muy brillante que destaca sobre el tono de la piel y el calzado. El diseño es moderno y llamativo, complementado por el detalle de los pantalones de mezclilla deshilachados que se asoman en los bordes.",
    "ped7": "Imagen de una pedicura artística en ambos pies, posicionados uno sobre otro sobre una alfombra de pelo largo blanco. El diseño alterna uñas pintadas en un suave color lila o lavanda sólido con uñas de acento cubiertas de purpurina plateada fina. La iluminación suave y el fondo texturizado crean una atmósfera de relajación y cuidado personal, resaltando la delicadeza de los tonos elegidos.",
    
    // CATEGORÍA 6: Laca Tradicional
    "l1": "Fotografía de primer plano que muestra una manicura de uñas cortas y naturales con forma cuadrada. El diseño destaca por un esmalte de laca en color blanco puro sólido, con un acabado brillante y una cobertura totalmente opaca. Las manos están posicionadas una sobre otra, resaltando la limpieza de la aplicación en los bordes y la frescura del tono blanco contra el fondo neutro.",
    "l2": "Imagen detallada de una mano con uñas cortas pintadas con laca blanca brillante. La aplicación es uniforme y resalta la forma natural de la uña. El enfoque permite apreciar la textura de la piel y la precisión en la zona de la cutícula, brindando una apariencia pulcra y minimalista. Se observa un fondo suave de toalla blanca que complementa la estética de limpieza del diseño.",
    "l3": "Vista de dos manos descansando sobre un cojín de apoyo para manicura con estampados florales sutiles. Las uñas, de longitud corta y forma redondeada, están esmaltadas con una laca de color gris lavanda o 'taupe' suave. El acabado es cremoso y brillante, ideal para un estilo elegante y discreto. La persona viste una prenda tejida en tono coral, lo que genera un contraste cálido con el tono frío de las uñas.",
    "l4": "Primer plano de una manicura que combina dos tonos de laca. Se alternan uñas en color gris azulado medio con uñas en blanco sólido brillante. Las uñas son cortas y de forma natural, mostrando una aplicación suave y bien nivelada. La iluminación resalta los puntos de brillo sobre el esmalte, enfatizando un diseño sencillo pero moderno para el uso diario.",
    "l5": "Fotografía que muestra a una persona con una manicura de impacto en color bronce metálico o dorado viejo. Las uñas son cortas y redondeadas, cubiertas con una laca de acabado metalizado que refleja la luz de forma uniforme. Al fondo, se observa de manera desenfocada a la persona con gafas y una prenda de rayas, manteniendo el protagonismo en el brillo sofisticado de las manos."
};

/**
 * ------------------------------------------------------------------------------------
 * 3. MOTOR DE RENDERIZADO (INYECCIÓN DE ESTILOS Y ESTRUCTURA)
 * ------------------------------------------------------------------------------------
 */
let htmlCatalogoBelleza = `
    <style>
        .art-nails-header { text-align: center; margin-bottom: 5rem; padding-top: 4rem; }
        .art-nails-title { font-family: var(--font-accent, serif); font-size: 4.5rem; color: var(--valtara-blanco, #fff); margin-bottom: 1rem; }
        .art-nails-desc { color: var(--valtara-gris-texto, #aaa); font-size: 1.5rem; max-width: 800px; margin: 0 auto; font-weight: 300; line-height: 1.8; }
        
        .category-container { margin-bottom: 7rem; }
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
            background: linear-gradient(135deg, #111 0%, #050505 100%); 
            min-height: 200px;
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
 * 4. GENERADOR DE BUCLE (CON INYECCIÓN INTELIGENTE DE ACCESIBILIDAD)
 * ------------------------------------------------------------------------------------
 */
nailCategories.forEach(cat => {
    
    htmlCatalogoBelleza += `
        <div class="category-container" aria-label="${cat.title}" role="region">
            <div class="category-header">
                <h3 class="category-title">${cat.title}</h3>
                <p class="category-subtitle">${cat.subtitle}</p>
            </div>
            <div class="gallery-masonry">
    `;
    
    for(let i = 1; i <= cat.count; i++) {
        // Ejemplo: "ext" + "1" = "ext1"
        const fileKey = `${cat.prefix}${i}`; 
        const fileName = `${fileKey}.jpg`;
        const imagePath = `/gallery/${fileName}`; 
        
        // El motor busca en el diccionario. Si por algún motivo no encuentra el texto, pone uno por defecto.
        const altText = nailDescriptions[fileKey] || `Fotografía de diseño de manicuría: ${cat.title} número ${i}.`; 
        
        htmlCatalogoBelleza += `
                <div class="gallery-item" tabindex="0" role="img" aria-label="${altText}">
                    <img src="${imagePath}" 
                         alt="${altText}" 
                         loading="lazy" 
                         onerror="this.src='/logo.png'; this.style.objectFit='contain'; this.style.padding='4rem'; this.style.opacity='0.15';">
                    
                    <div class="gallery-overlay" aria-hidden="true">
                        <span class="overlay-text">COD: ${fileName.toUpperCase()}</span>
                        <i class="fa-solid fa-gem overlay-icon"></i>
                    </div>
                </div>
        `;
    }
    
    htmlCatalogoBelleza += `
            </div>
        </div>
    `;
});

htmlCatalogoBelleza += `</div>`;

window.ValtaraModulos.catalogo_belleza = htmlCatalogoBelleza;
