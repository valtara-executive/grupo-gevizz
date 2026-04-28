/**
 * ====================================================================================
 * VALTARA — MAPA BIOMECÁNICO 3D V40.0
 * inicio_mapa_cuerpo.js
 * ------------------------------------------------------------------------------------
 * Cuerpo humano 3D construido con primitivas geométricas de Three.js r128.
 * Sin archivos GLTF. Sin imágenes. Peso total del modelo: ~18KB de geometría.
 * 28 zonas interactivas con raycasting preciso, descripciones clínicas y
 * vista de tabla accesible para lectores de pantalla.
 * ====================================================================================
 */
window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_mapa_cuerpo = `
<section aria-labelledby="mapa-titulo" style="padding: 4rem 1rem 2rem; max-width: 900px; margin: 0 auto;">

    <div style="text-align:center; margin-bottom:2.5rem;">
        <div style="display:inline-flex;align-items:center;gap:14px;margin-bottom:1rem;">
            <span style="background:rgba(0,255,255,0.07);border:1px solid rgba(0,255,255,0.2);padding:12px;border-radius:50%;display:flex;">
                <i class="fa-solid fa-person-rays" style="color:var(--valtara-cian-brillante);font-size:2rem;" aria-hidden="true"></i>
            </span>
            <h2 id="mapa-titulo" style="font-family:var(--font-accent);color:var(--valtara-blanco);font-size:2.6rem;margin:0;">
                Mapa Biomecánico
            </h2>
        </div>
        <p style="color:var(--valtara-gris-texto);font-size:1.15rem;line-height:1.8;font-weight:300;max-width:600px;margin:0 auto 1.5rem;">
            Toca una zona del cuerpo para conocer su diagnóstico biomecánico, causas del dolor y el protocolo Valtara recomendado.
        </p>

        <!-- Controles de vista -->
        <div role="group" aria-label="Cambiar vista del mapa" style="display:inline-flex;gap:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:50px;padding:5px;">
            <button id="btn-vista-3d" onclick="ValtaraMapaController.setVista('3d')" style="padding:8px 22px;border-radius:50px;border:none;background:var(--valtara-cian-brillante);color:#000;font-weight:700;font-size:0.85rem;font-family:'Lato',sans-serif;cursor:pointer;" aria-pressed="true">
                Modelo 3D
            </button>
            <button id="btn-vista-tabla" onclick="ValtaraMapaController.setVista('tabla')" style="padding:8px 22px;border-radius:50px;border:none;background:transparent;color:rgba(255,255,255,0.5);font-size:0.85rem;font-family:'Lato',sans-serif;cursor:pointer;" aria-pressed="false">
                Vista accesible
            </button>
        </div>
    </div>

    <!-- ═══════════════ VISTA 3D ═══════════════ -->
    <div id="mapa-3d-wrapper" style="display:grid;grid-template-columns:1fr;gap:2rem;">

        <!-- Canvas Three.js -->
        <div style="position:relative;border-radius:2rem;overflow:hidden;background:rgba(5,5,10,0.7);border:1px solid rgba(0,255,255,0.12);box-shadow:0 2rem 5rem rgba(0,0,0,0.7);">
            <canvas id="body-map-canvas" style="width:100%;display:block;touch-action:none;" aria-label="Modelo 3D del cuerpo humano interactivo. Arrastra para rotar. Toca una zona para ver información." role="img"></canvas>

            <!-- Indicador de zona hover -->
            <div id="mapa-zone-tooltip" style="position:absolute;bottom:18px;left:50%;transform:translateX(-50%);background:rgba(0,255,204,0.12);border:1px solid rgba(0,255,204,0.4);border-radius:30px;padding:8px 20px;font-family:'Lato',sans-serif;font-size:0.85rem;color:var(--valtara-cian-brillante);pointer-events:none;opacity:0;transition:opacity 0.2s ease;white-space:nowrap;">
                Toca una zona
            </div>

            <!-- Hint de rotación -->
            <div id="mapa-rotate-hint" style="position:absolute;top:16px;right:16px;background:rgba(0,0,0,0.5);border-radius:20px;padding:6px 14px;font-family:'Lato',sans-serif;font-size:0.75rem;color:rgba(255,255,255,0.35);pointer-events:none;display:flex;align-items:center;gap:6px;">
                <i class="fa-solid fa-rotate" aria-hidden="true"></i> Arrastra para rotar
            </div>

            <!-- Botón vista frontal/trasera -->
            <div style="position:absolute;top:16px;left:16px;display:flex;flex-direction:column;gap:8px;">
                <button onclick="ValtaraMapaController.setView('front')" title="Vista frontal" style="width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.6);color:rgba(255,255,255,0.5);font-size:0.75rem;cursor:pointer;font-family:'Lato',sans-serif;" aria-label="Vista frontal del cuerpo">F</button>
                <button onclick="ValtaraMapaController.setView('back')" title="Vista trasera" style="width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.6);color:rgba(255,255,255,0.5);font-size:0.75rem;cursor:pointer;font-family:'Lato',sans-serif;" aria-label="Vista trasera del cuerpo">T</button>
                <button onclick="ValtaraMapaController.setView('side')" title="Vista lateral" style="width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.6);color:rgba(255,255,255,0.5);font-size:0.75rem;cursor:pointer;font-family:'Lato',sans-serif;" aria-label="Vista lateral del cuerpo">L</button>
            </div>
        </div>

        <!-- Panel de información de zona -->
        <div id="mapa-zone-info" aria-live="polite" aria-atomic="true" style="background:linear-gradient(135deg,rgba(0,255,255,0.04),rgba(0,0,0,0.75));border:1px solid rgba(0,255,255,0.1);border-radius:2rem;padding:2.5rem;min-height:200px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">
            <i class="fa-solid fa-hand-pointer" style="font-size:3rem;color:rgba(0,255,204,0.3);margin-bottom:1.2rem;" aria-hidden="true"></i>
            <h3 style="font-family:var(--font-accent);font-size:1.8rem;color:var(--valtara-blanco);margin:0 0 0.8rem;">Selecciona una zona</h3>
            <p style="color:var(--valtara-gris-texto);font-size:1rem;line-height:1.7;margin:0;">Toca cualquier parte del cuerpo 3D para ver el diagnóstico biomecánico, las causas del dolor y el protocolo de tratamiento Valtara recomendado.</p>
        </div>
    </div>

    <!-- ═══════════════ VISTA TABLA ACCESIBLE ═══════════════ -->
    <div id="mapa-tabla-wrapper" style="display:none;">
        <div style="overflow-x:auto;border-radius:1.5rem;border:1px solid rgba(0,255,255,0.12);">
            <table style="width:100%;border-collapse:collapse;font-family:'Lato',sans-serif;font-size:0.9rem;" aria-label="Tabla de zonas biomecánicas del cuerpo">
                <thead>
                    <tr style="background:rgba(0,255,204,0.08);">
                        <th scope="col" style="padding:14px 16px;text-align:left;color:var(--valtara-cian-brillante);font-weight:600;border-bottom:1px solid rgba(0,255,255,0.15);">Zona</th>
                        <th scope="col" style="padding:14px 16px;text-align:left;color:var(--valtara-cian-brillante);font-weight:600;border-bottom:1px solid rgba(0,255,255,0.15);">Problema frecuente</th>
                        <th scope="col" style="padding:14px 16px;text-align:left;color:var(--valtara-cian-brillante);font-weight:600;border-bottom:1px solid rgba(0,255,255,0.15);">Protocolo Valtara</th>
                    </tr>
                </thead>
                <tbody id="mapa-tabla-body">
                    <!-- Generado por JS -->
                </tbody>
            </table>
        </div>
    </div>

</section>
`;

/* ============================================================
   CONTROLADOR DEL MAPA BIOMECÁNICO 3D
   Se inicializa cuando la sección de inicio es visible
   ============================================================ */
window.ValtaraMapaController = (function() {

    /* ── 28 ZONAS CON COORDENADAS 3D PRECISAS ──────────────────── */
    const ZONES = [
        {
            id: 'craneo',
            label: 'Cráneo y Cuero Cabelludo',
            pos: [0, 1.82, 0],
            r: 0.22,
            color: 0x00FFCC,
            titulo: 'Cráneo, Cuero Cabelludo y Periostio',
            causa: 'Tensión crónica del músculo occipitofrontal por estrés sostenido, postura de pantalla y bruxismo nocturno. La fascia superficial del cuero cabelludo restringe la microcirculación craneal.',
            protocolo: 'Masaje Neurosedante Craneal con técnica de deslizamiento fascial. Incluido en el Masaje Relajante Neuro-Adaptativo.',
            precio: '$799 – $999 MXN'
        },
        {
            id: 'frente',
            label: 'Frente y Senos Frontales',
            pos: [0, 1.78, 0.2],
            r: 0.14,
            color: 0x00FFCC,
            titulo: 'Frente, Senos Frontales y Músculo Frontal',
            causa: 'Contractura del músculo frontal por expresión facial repetitiva bajo estrés. Los senos frontales reflejan tensión sinusal relacionada con migraña tensional.',
            protocolo: 'Digitopresión frontal y drenaje de senos paranasales. Integrado en Ritual Lomi Lomi Supremo.',
            precio: '$1,199 MXN'
        },
        {
            id: 'mandibula',
            label: 'Mandíbula y ATM',
            pos: [0, 1.62, 0.15],
            r: 0.14,
            color: 0xFFD700,
            titulo: 'Articulación Temporomandibular (ATM) y Masetero',
            causa: 'El nervio trigémino controla los músculos de masticación. Con niveles sostenidos de cortisol ejerces hasta 70 kg de presión nocturna (bruxismo), fracturando el esmalte y comprimiendo el disco articular.',
            protocolo: 'Rehabilitación Facial por Estrés Severo: masaje intraoral del masetero y pterigoideos. Consulta de evaluación gratuita.',
            precio: 'Consulta previa requerida'
        },
        {
            id: 'nuca',
            label: 'Nuca y Occipital',
            pos: [0, 1.7, -0.18],
            r: 0.15,
            color: 0x00FFCC,
            titulo: 'Nuca, Base del Cráneo y Suboccipitales',
            causa: 'Los cuatro músculos suboccipitales conectan la base del cráneo con C1-C2. Su contractura comprime la arteria vertebral y el nervio occipital mayor, causando cefaleas tensionales irradiadas.',
            protocolo: 'Liberación suboccipital por presión sostenida. Incluido en Masaje Deportivo y en el protocolo cervical.',
            precio: '$829 MXN'
        },
        {
            id: 'cervical',
            label: 'Columna Cervical',
            pos: [0, 1.48, 0],
            r: 0.13,
            color: 0xFFD700,
            titulo: 'Vértebras C1-C7 y Disco Intervertebral',
            causa: 'Text Neck: inclinar 60° el cuello viendo el móvil genera 27 kg de presión sobre los discos. Combinado con postura de escritorio comprime los nervios C5-C7 irradiando a hombros y brazos.',
            protocolo: 'Masaje Deportivo y Descompresión Cervical con tracción manual. Corrección postural incluida.',
            precio: '$829 MXN'
        },
        {
            id: 'trapecio_d',
            label: 'Trapecio Derecho',
            pos: [0.38, 1.28, 0],
            r: 0.16,
            color: 0x00FFCC,
            titulo: 'Trapecio Superior Derecho y Músculo Elevador de la Escápula',
            causa: 'El trapecio superior eleva el hombro y gira la cabeza. La tensión crónica por estrés o uso del ratón forma nódulos miofasciales (puntos gatillo) que irradian dolor a la cabeza y brazo.',
            protocolo: 'Liberación de puntos gatillo con presión isquémica y masaje transverso profundo.',
            precio: '$799 – $829 MXN'
        },
        {
            id: 'trapecio_i',
            label: 'Trapecio Izquierdo',
            pos: [-0.38, 1.28, 0],
            r: 0.16,
            color: 0x00FFCC,
            titulo: 'Trapecio Superior Izquierdo y Escalenos',
            causa: 'Similar al lado derecho pero con frecuencia más cargado en zurdos. Los escalenos anterolaterales pueden comprimir el plexo braquial causando síndrome del desfiladero torácico con entumecimiento en el meñique.',
            protocolo: 'Masaje de escalenos y trapecio con técnica neuromuscular. Evaluación de plexo braquial incluida.',
            precio: '$829 MXN'
        },
        {
            id: 'hombro_d',
            label: 'Hombro Derecho',
            pos: [0.55, 1.12, 0],
            r: 0.18,
            color: 0xFFD700,
            titulo: 'Manguito Rotador Derecho (Supraespinoso, Infraespinoso, Subescapular)',
            causa: 'La articulación glenohumeral tiene el mayor rango de movimiento del cuerpo y la menor estabilidad ósea. Trabajo repetitivo sobre hombro o dormir de lado inflama la bursa subacromial y degrada el manguito.',
            protocolo: 'Masaje profundo del manguito rotador más movilización articular pasiva. Incluido en el protocolo deportivo.',
            precio: '$829 MXN'
        },
        {
            id: 'hombro_i',
            label: 'Hombro Izquierdo',
            pos: [-0.55, 1.12, 0],
            r: 0.18,
            color: 0xFFD700,
            titulo: 'Manguito Rotador Izquierdo y Articulación Acromioclavicular',
            causa: 'En el hombro izquierdo el dolor puede tener referencia cardíaca (angina), por lo que siempre realizamos evaluación diferencial. La articulación AC se lesiona frecuentemente en deportistas y ciclistas urbanos.',
            protocolo: 'Evaluación diferencial + masaje del manguito rotador y articulación acromioclavicular.',
            precio: '$829 MXN'
        },
        {
            id: 'pectoral',
            label: 'Pectoral y Esternón',
            pos: [0, 0.95, 0.2],
            r: 0.2,
            color: 0x00FFCC,
            titulo: 'Músculos Pectorales Mayor y Menor + Uniones Costoesternales',
            causa: 'La postura cifótica (espalda encorvada) acorta el pectoral menor, lo que adelanta los hombros y comprime las costillas. Las uniones costoesternales bajo estrés producen costocondritis con dolor similar a un infarto.',
            protocolo: 'Estiramiento miofascial del pectoral y liberación costoesternal. Parte del Masaje Relajante completo.',
            precio: '$999 MXN'
        },
        {
            id: 'dorsal_sup',
            label: 'Espalda Superior',
            pos: [0, 0.9, -0.22],
            r: 0.22,
            color: 0xFFD700,
            titulo: 'Romboides, Serrato Anterior y Región Dorsal T1-T6',
            causa: 'Los romboides (entre los omóplatos) se elongan crónicamente en postura de pantalla, perdiendo tono. El serrato anterior que estabiliza la escápula se inhibe, causando escápula alada y dolor de cuello irradiado.',
            protocolo: 'Técnica de inhibición recíproca: fortalecimiento activo asistido de romboides más masaje de serrato.',
            precio: '$829 MXN'
        },
        {
            id: 'codo_d',
            label: 'Codo Derecho',
            pos: [0.68, 0.62, 0],
            r: 0.12,
            color: 0x00FFCC,
            titulo: 'Epicóndilo Lateral Derecho (Codo de Tenista) y Articulación Humeroradial',
            causa: 'La epicondilitis lateral inflama los extensores de muñeca en su origen. Afecta a quienes usan ratón, practican tenis o realizan trabajo manual repetitivo. El dolor aumenta al cerrar el puño.',
            protocolo: 'Masaje transverso profundo de Cyriax en el epicóndilo más maniobras de deslizamiento neural.',
            precio: '$829 MXN'
        },
        {
            id: 'codo_i',
            label: 'Codo Izquierdo',
            pos: [-0.68, 0.62, 0],
            r: 0.12,
            color: 0x00FFCC,
            titulo: 'Epicóndilo Medial Izquierdo (Codo de Golfista) y Nervio Cubital',
            causa: 'La epitrocleítis medial (epicóndilo medial) afecta a los flexores de muñeca. El nervio cubital pasa por el túnel cubital del codo; su compresión produce entumecimiento del meñique y el anular.',
            protocolo: 'Liberación del nervio cubital más masaje de flexores. Evaluación neurológica básica incluida.',
            precio: '$829 MXN'
        },
        {
            id: 'antebrazo',
            label: 'Antebrazo y Muñeca',
            pos: [0.7, 0.28, 0],
            r: 0.13,
            color: 0x00FFCC,
            titulo: 'Músculos Extensores del Antebrazo y Canal Carpiano',
            causa: 'El Síndrome del Túnel Carpiano comprime el nervio mediano bajo el ligamento transverso del carpo. Afecta al 3-6% de la población, especialmente trabajadores de teclado. Produce hormigueo nocturno en los tres primeros dedos.',
            protocolo: 'Masaje de liberación del retináculo flexor y movilización del carpo. Prevención de cirugía.',
            precio: '$829 MXN'
        },
        {
            id: 'abdomen',
            label: 'Abdomen y Sistema Digestivo',
            pos: [0, 0.45, 0.18],
            r: 0.2,
            color: 0xFFD700,
            titulo: 'Diafragma, Psoas Ilíaco y Sistema Nervioso Entérico',
            causa: 'El eje intestino-cerebro: el 90% de la serotonina se produce en el intestino. El estrés crónico contrae el diafragma y el psoas, bloqueando la respiración profunda y generando síndrome de colon irritable.',
            protocolo: 'Masaje abdominal visceral profundo y liberación del psoas por vía anterior. Técnica de Barral.',
            precio: '$929 MXN'
        },
        {
            id: 'lumbar',
            label: 'Región Lumbar',
            pos: [0, -0.02, -0.22],
            r: 0.22,
            color: 0xFF6B35,
            titulo: 'Vértebras L1-L5, Disco Intervertebral y Cuadrado Lumbar',
            causa: 'Sedentarismo prolongado acorta el psoas y comprime los discos L4-L5 y L5-S1, los más propensos a herniarse. Cada hora sentado aplica 3 veces más presión discal que de pie. El cuadrado lumbar en espasmo bloquea la rotación.',
            protocolo: 'Masaje Tailandés de Descompresión Pasiva: posturas asistidas que crean tracción axial sin carga.',
            precio: '$829 MXN'
        },
        {
            id: 'sacro',
            label: 'Sacro y Cóccix',
            pos: [0, -0.45, -0.2],
            r: 0.14,
            color: 0xFFD700,
            titulo: 'Articulación Sacroilíaca y Cóccix',
            causa: 'La articulación sacroilíaca (SI) es responsable del 15-25% de los dolores lumbares. Su disfunción produce dolor unilateral que se irradia al glúteo y no responde a tratamientos de columna. El cóccix puede fracturarse con caídas sentadas.',
            protocolo: 'Movilización articular de la SI con técnica de músculo energía. Evaluación diferencial lumbar-SI.',
            precio: '$829 MXN'
        },
        {
            id: 'gluteo_d',
            label: 'Glúteo Derecho',
            pos: [0.22, -0.52, -0.18],
            r: 0.17,
            color: 0x00FFCC,
            titulo: 'Glúteo Mayor, Glúteo Medio y Músculo Piriforme Derecho',
            causa: 'El Síndrome del Piriforme comprime el nervio ciático imitando una hernia discal. Frecuente en ciclistas, corredores y sedentarios. El glúteo medio inhibido causa marcha de Trendelenburg y lesiones en rodilla.',
            protocolo: 'Liberación del piriforme con presión digital profunda y estiramiento asistido del glúteo.',
            precio: '$829 MXN'
        },
        {
            id: 'gluteo_i',
            label: 'Glúteo Izquierdo',
            pos: [-0.22, -0.52, -0.18],
            r: 0.17,
            color: 0x00FFCC,
            titulo: 'Glúteo Mayor Izquierdo y Banda Iliotibial',
            causa: 'La banda iliotibial (IT) conecta la cadera con la tibia. Su tensión crónica produce síndrome de la cintilla iliotibial con dolor en la cara lateral de la rodilla, especialmente en corredores y ciclistas.',
            protocolo: 'Masaje de liberación de la IT con codos y antebrazos. Parte del protocolo deportivo de miembros inferiores.',
            precio: '$829 MXN'
        },
        {
            id: 'cadera_d',
            label: 'Cadera Derecha',
            pos: [0.28, -0.42, 0],
            r: 0.16,
            color: 0xFFD700,
            titulo: 'Articulación Coxofemoral Derecha y Flexores de Cadera',
            causa: 'La cadera es la articulación de mayor carga del cuerpo. Sentarse 8+ horas acorta el psoas ilíaco y el recto anterior del cuádriceps, inclinando la pelvis hacia adelante (hiperlordosis) y sobrecargando L4-L5.',
            protocolo: 'Masaje de flexores de cadera y movilización articular con tracción manual. Corrección pélvica incluida.',
            precio: '$829 MXN'
        },
        {
            id: 'cadera_i',
            label: 'Cadera Izquierda',
            pos: [-0.28, -0.42, 0],
            r: 0.16,
            color: 0xFFD700,
            titulo: 'Articulación Coxofemoral Izquierda y Aductores',
            causa: 'Los aductores sobrecargados producen dolor inguinal y limitación de la rotación externa. En embarazo y posparto la articulación sacroilíaca izquierda sufre hiperlaxitud que genera inestabilidad pélvica persistente.',
            protocolo: 'Masaje de aductores con técnica neuromuscular y reeducación de la estabilidad pélvica.',
            precio: '$829 MXN'
        },
        {
            id: 'isquiotibiales',
            label: 'Isquiotibiales',
            pos: [0, -0.88, -0.12],
            r: 0.2,
            color: 0x00FFCC,
            titulo: 'Grupo Isquiotibial: Bíceps Femoral, Semimembranoso y Semitendinoso',
            causa: 'Los isquiotibiales cortos (acortamiento funcional) traccionan hacia abajo la pelvis posterior, aumentando la cifosis lumbar y generando dolor de espalda. Son los músculos más frecuentemente lesionados en deportistas.',
            protocolo: 'Masaje longitudinal profundo de isquiotibiales más estiramiento facilitado por contracción-relajación (PNF).',
            precio: '$829 MXN'
        },
        {
            id: 'rodilla_d',
            label: 'Rodilla Derecha',
            pos: [0.2, -1.18, 0],
            r: 0.14,
            color: 0xFF6B35,
            titulo: 'Articulación de la Rodilla Derecha: Meniscos y Ligamentos',
            causa: 'La rodilla absorbe hasta 7 veces el peso corporal al subir escaleras. La condromalacia rotuliana (cartílago bajo la rótula) produce crujidos y dolor al bajar escaleras. Los meniscos se degeneran sin ejercicio adecuado.',
            protocolo: 'Masaje del cuádriceps para descargar la rótula más movilización pasiva de la articulación femoropatelar.',
            precio: '$829 MXN'
        },
        {
            id: 'rodilla_i',
            label: 'Rodilla Izquierda',
            pos: [-0.2, -1.18, 0],
            r: 0.14,
            color: 0xFF6B35,
            titulo: 'Articulación de la Rodilla Izquierda y Tendón Rotuliano',
            causa: 'La tendinopatía rotuliana (rodilla del saltador) es inflamación del tendón que une la rótula con la tibia. El dolor aumenta al bajar escaleras, sentarse o arrodillarse. Muy frecuente en deportistas de impacto.',
            protocolo: 'Masaje transverso profundo del tendón rotuliano más protocolo excéntrico de fortalecimiento.',
            precio: '$829 MXN'
        },
        {
            id: 'pantorrilla_d',
            label: 'Pantorrilla Derecha',
            pos: [0.18, -1.52, -0.08],
            r: 0.15,
            color: 0x00FFCC,
            titulo: 'Gemelo y Sóleo Derechos: El Segundo Corazón',
            causa: 'Los músculos de la pantorrilla actúan como bomba venosa. Sentado o de pie sin moverse, la sangre se estanca produciendo edema, varices y riesgo de trombosis venosa profunda. En el 80% de las trombosis el origen es la pantorrilla.',
            protocolo: 'Drenaje Linfático Manual + masaje de pantorrilla en dirección centrípeta. Activa la bomba músculo-venosa.',
            precio: '$849 MXN'
        },
        {
            id: 'pantorrilla_i',
            label: 'Pantorrilla Izquierda',
            pos: [-0.18, -1.52, -0.08],
            r: 0.15,
            color: 0x00FFCC,
            titulo: 'Gemelo Izquierdo, Sóleo y Tendón de Aquiles',
            causa: 'La tendinopatía aquílea produce dolor crónico en el talón. El tendón de Aquiles soporta hasta 7 veces el peso corporal al correr y carece de vaina sinovial, lo que dificulta su recuperación sin tratamiento manual.',
            protocolo: 'Masaje transverso profundo del tendón de Aquiles y elongación excéntrica. Protocolo de Alfredson modificado.',
            precio: '$829 MXN'
        },
        {
            id: 'tobillo',
            label: 'Tobillo y Pie',
            pos: [0, -1.88, 0],
            r: 0.16,
            color: 0xFFD700,
            titulo: 'Articulación Tibioastragalina, Fascia Plantar y Arco Plantar',
            causa: 'La fascitis plantar inflama la fascia que soporta el arco del pie. Produce el característico dolor al dar el primer paso mañanero. El pie plano y el pie cavo predisponen a lesiones en cadena ascendente: tobillo, rodilla, cadera y lumbar.',
            protocolo: 'Masaje profundo de la fascia plantar, movilización del tobillo y corrección biomecánica de la marcha.',
            precio: '$829 MXN'
        },
        {
            id: 'linfa',
            label: 'Sistema Linfático',
            pos: [0, 0.2, 0.12],
            r: 0.25,
            color: 0x7B2FBE,
            titulo: 'Red Linfática: Ganglios Axilares, Inguinales y Conducto Torácico',
            causa: 'A diferencia del sistema circulatorio, la linfa no tiene corazón propio: depende exclusivamente del movimiento muscular. Sedentarismo, viajes largos y estrés detienen el flujo, acumulando proteínas inflamatorias, toxinas y exceso hídrico en los tejidos.',
            protocolo: 'Drenaje Linfático Manual método Vodder: movimientos suaves, rítmicos y precisos que vacían los ganglios de proximal a distal.',
            precio: '$849 MXN'
        },
        {
            id: 'dorsal_med',
            label: 'Espalda Media (Dorsales)',
            pos: [0, 0.35, -0.22],
            r: 0.2,
            color: 0xFFD700,
            titulo: 'Región Dorsal Media T6-T12: Erector de la Columna y Multífidos',
            causa: 'El erector de la columna es el músculo postura principal. En cifosis severa se estira crónicamente y pierde eficiencia, mientras los multífidos —los estabilizadores profundos— se atrofian por desuso, perdiendo la protección activa de los discos.',
            protocolo: 'Masaje Ayurveda con aceites termales: técnica de effleurage profundo que reactiva la propiocepción de los multífidos.',
            precio: '$929 MXN'
        }
    ];

    /* ── ESTADO INTERNO ──────────────────────────────────────────── */
    let scene, camera, renderer, bodyGroup, zoneMarkers = [];
    let isDragging = false, prevMouse = {x:0, y:0}, rotY = 0, rotX = 0;
    let hoveredZone = null, selectedZone = null;
    let rafId = null, isInitialized = false, isVisible = false;

    /* ── MATERIALES ──────────────────────────────────────────────── */
    const MAT_BODY = () => new THREE.MeshPhongMaterial({
        color: 0x1a1a2e,
        emissive: 0x050510,
        specular: 0x4444aa,
        shininess: 25,
        transparent: true,
        opacity: 0.92
    });

    const MAT_ZONE = (color) => new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.15,
        transparent: true,
        opacity: 0.0,   // invisible por defecto, solo para raycasting
        depthWrite: false
    });

    const MAT_ZONE_HOVER = (color) => new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.55,
        transparent: true,
        opacity: 0.35,
        depthWrite: false
    });

    const MAT_ZONE_SELECTED = (color) => new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.85,
        transparent: true,
        opacity: 0.55,
        depthWrite: false
    });

    /* ── CONSTRUIR CUERPO CON PRIMITIVAS ─────────────────────────── */
    function buildBody() {
        const g = new THREE.Group();

        const addMesh = (geo, mat, x, y, z, rx, ry, rz) => {
            const m = new THREE.Mesh(geo, mat || MAT_BODY());
            m.position.set(x||0, y||0, z||0);
            if (rx) m.rotation.x = rx;
            if (ry) m.rotation.y = ry;
            if (rz) m.rotation.z = rz;
            m.castShadow = true;
            g.add(m);
            return m;
        };

        // CABEZA
        addMesh(new THREE.SphereGeometry(0.22, 24, 24), null, 0, 1.82, 0);

        // CUELLO
        addMesh(new THREE.CylinderGeometry(0.09, 0.10, 0.22, 16), null, 0, 1.58, 0);

        // CLAVÍCULAS (barra horizontal)
        addMesh(new THREE.CylinderGeometry(0.04, 0.04, 0.80, 12), null, 0, 1.35, 0, 0, 0, Math.PI/2);

        // TORSO SUPERIOR (pecho)
        addMesh(new THREE.CylinderGeometry(0.28, 0.24, 0.42, 20), null, 0, 1.08, 0);

        // TORSO MEDIO (abdomen)
        addMesh(new THREE.CylinderGeometry(0.24, 0.22, 0.38, 20), null, 0, 0.71, 0);

        // TORSO INFERIOR (cintura)
        addMesh(new THREE.CylinderGeometry(0.22, 0.26, 0.32, 20), null, 0, 0.37, 0);

        // PELVIS
        addMesh(new THREE.CylinderGeometry(0.28, 0.26, 0.26, 20), null, 0, 0.07, 0);

        // HOMBRO DERECHO
        addMesh(new THREE.SphereGeometry(0.12, 16, 16), null, 0.42, 1.22, 0);

        // HOMBRO IZQUIERDO
        addMesh(new THREE.SphereGeometry(0.12, 16, 16), null, -0.42, 1.22, 0);

        // BRAZO SUPERIOR DERECHO
        addMesh(new THREE.CylinderGeometry(0.078, 0.068, 0.50, 14), null, 0.58, 0.92, 0, 0, 0, 0.18);

        // BRAZO SUPERIOR IZQUIERDO
        addMesh(new THREE.CylinderGeometry(0.078, 0.068, 0.50, 14), null, -0.58, 0.92, 0, 0, 0, -0.18);

        // CODO DERECHO
        addMesh(new THREE.SphereGeometry(0.072, 14, 14), null, 0.68, 0.62, 0);

        // CODO IZQUIERDO
        addMesh(new THREE.SphereGeometry(0.072, 14, 14), null, -0.68, 0.62, 0);

        // ANTEBRAZO DERECHO
        addMesh(new THREE.CylinderGeometry(0.065, 0.055, 0.44, 14), null, 0.71, 0.34, 0, 0, 0, 0.08);

        // ANTEBRAZO IZQUIERDO
        addMesh(new THREE.CylinderGeometry(0.065, 0.055, 0.44, 14), null, -0.71, 0.34, 0, 0, 0, -0.08);

        // MANO DERECHA
        addMesh(new THREE.BoxGeometry(0.10, 0.14, 0.05), null, 0.73, 0.06, 0);

        // MANO IZQUIERDA
        addMesh(new THREE.BoxGeometry(0.10, 0.14, 0.05), null, -0.73, 0.06, 0);

        // MUSLO DERECHO
        addMesh(new THREE.CylinderGeometry(0.125, 0.105, 0.60, 18), null, 0.20, -0.58, 0, 0, 0, 0.06);

        // MUSLO IZQUIERDO
        addMesh(new THREE.CylinderGeometry(0.125, 0.105, 0.60, 18), null, -0.20, -0.58, 0, 0, 0, -0.06);

        // RODILLA DERECHA
        addMesh(new THREE.SphereGeometry(0.095, 14, 14), null, 0.21, -1.18, 0);

        // RODILLA IZQUIERDA
        addMesh(new THREE.SphereGeometry(0.095, 14, 14), null, -0.21, -1.18, 0);

        // PANTORRILLA DERECHA
        addMesh(new THREE.CylinderGeometry(0.092, 0.072, 0.55, 16), null, 0.19, -1.52, 0, 0, 0, 0.04);

        // PANTORRILLA IZQUIERDA
        addMesh(new THREE.CylinderGeometry(0.092, 0.072, 0.55, 16), null, -0.19, -1.52, 0, 0, 0, -0.04);

        // TOBILLO DERECHO
        addMesh(new THREE.SphereGeometry(0.065, 12, 12), null, 0.19, -1.84, 0);

        // TOBILLO IZQUIERDO
        addMesh(new THREE.SphereGeometry(0.065, 12, 12), null, -0.19, -1.84, 0);

        // PIE DERECHO
        addMesh(new THREE.BoxGeometry(0.12, 0.07, 0.26), null, 0.18, -1.96, 0.06);

        // PIE IZQUIERDO
        addMesh(new THREE.BoxGeometry(0.12, 0.07, 0.26), null, -0.18, -1.96, 0.06);

        return g;
    }

    /* ── CREAR MARCADORES DE ZONAS (invisibles, para raycasting) ─── */
    function buildZoneMarkers() {
        ZONES.forEach(zone => {
            const geo = new THREE.SphereGeometry(zone.r, 12, 12);
            const mat = MAT_ZONE(zone.color);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(...zone.pos);
            mesh.userData = zone;
            mesh.renderOrder = 1;
            bodyGroup.add(mesh);
            zoneMarkers.push(mesh);
        });
    }

    /* ── INICIALIZAR THREE.JS ────────────────────────────────────── */
    function initThree() {
        const canvas = document.getElementById('body-map-canvas');
        if (!canvas) return;

        const W = canvas.parentElement.clientWidth;
        const H = Math.max(420, Math.min(W * 1.2, 560));
        canvas.height = H;

        // Scene
        scene = new THREE.Scene();
        scene.background = null;

        // Camera
        camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 20);
        camera.position.set(0, 0.1, 4.8);

        // Renderer
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.shadowMap.enabled = true;
        renderer.setClearColor(0x000000, 0);

        // Luces
        const ambient = new THREE.AmbientLight(0x223344, 1.8);
        scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0x88ccff, 2.2);
        dirLight.position.set(2, 4, 3);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const rimLight = new THREE.DirectionalLight(0x00ffcc, 0.8);
        rimLight.position.set(-2, 0, -2);
        scene.add(rimLight);

        const bottomLight = new THREE.DirectionalLight(0xFFD700, 0.3);
        bottomLight.position.set(0, -3, 0);
        scene.add(bottomLight);

        // Cuerpo
        bodyGroup = buildBody();
        scene.add(bodyGroup);

        // Zonas
        buildZoneMarkers();

        // Línea de base (suelo sutil)
        const planeGeo = new THREE.PlaneGeometry(1.2, 1.2);
        const planeMat = new THREE.MeshBasicMaterial({
            color: 0x00FFCC, transparent: true, opacity: 0.04, side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -2.05;
        scene.add(plane);

        bindCanvasEvents(canvas);
        isInitialized = true;
        renderLoop();
    }

    /* ── LOOP DE RENDER ──────────────────────────────────────────── */
    let _autoRotate = true;
    function renderLoop() {
        rafId = requestAnimationFrame(renderLoop);
        if (document.visibilityState === 'hidden' || !isVisible) return;

        if (_autoRotate && !isDragging) {
            rotY += 0.003;
        }
        bodyGroup.rotation.y = rotY;
        bodyGroup.rotation.x = Math.max(-0.3, Math.min(0.3, rotX));

        renderer.render(scene, camera);
    }

    /* ── RAYCASTER ───────────────────────────────────────────────── */
    const raycaster = new THREE.Raycaster();
    const mouse2D   = new THREE.Vector2();

    function raycast(clientX, clientY) {
        const canvas  = document.getElementById('body-map-canvas');
        const rect    = canvas.getBoundingClientRect();
        mouse2D.x     = ((clientX - rect.left) / rect.width)  * 2 - 1;
        mouse2D.y     = -((clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse2D, camera);
        return raycaster.intersectObjects(zoneMarkers, false);
    }

    function setHovered(zone) {
        if (hoveredZone === zone) return;
        // Restaurar anterior
        if (hoveredZone && hoveredZone !== selectedZone) {
            hoveredZone.material.opacity = 0;
        }
        hoveredZone = zone;
        if (zone && zone !== selectedZone) {
            zone.material = MAT_ZONE_HOVER(zone.userData.color);
        }
        const tooltip = document.getElementById('mapa-zone-tooltip');
        if (tooltip) {
            tooltip.textContent = zone ? zone.userData.label : '';
            tooltip.style.opacity = zone ? '1' : '0';
        }
        document.getElementById('body-map-canvas').style.cursor = zone ? 'pointer' : 'grab';
    }

    function selectZone(zoneMarker) {
        // Restaurar anterior seleccionado
        if (selectedZone) {
            selectedZone.material = MAT_ZONE(selectedZone.userData.color);
        }
        selectedZone = zoneMarker;
        if (zoneMarker) {
            zoneMarker.material = MAT_ZONE_SELECTED(zoneMarker.userData.color);
            showZoneInfo(zoneMarker.userData);
            _autoRotate = false;
            // Centrar cámara suavemente en la zona
            smoothCameraTo(zoneMarker.position.y);
        }
    }

    function smoothCameraTo(targetY) {
        const startY = camera.position.y - 0.1;
        const diff   = targetY - startY;
        let t = 0;
        const anim = () => {
            t += 0.04;
            if (t >= 1) return;
            camera.position.y = startY + diff * (1 - Math.pow(1 - t, 3));
            requestAnimationFrame(anim);
        };
        anim();
    }

    function showZoneInfo(zone) {
        const panel = document.getElementById('mapa-zone-info');
        if (!panel) return;

        const colorHex = '#' + zone.color.toString(16).padStart(6, '0');

        panel.innerHTML = `
            <div style="text-align:left;width:100%;">
                <div style="display:inline-block;background:${colorHex}22;border:1px solid ${colorHex}55;border-radius:8px;padding:5px 14px;font-size:0.78rem;font-family:'Lato',sans-serif;color:${colorHex};letter-spacing:0.08em;text-transform:uppercase;margin-bottom:1.2rem;">${zone.label}</div>
                <h3 style="font-family:var(--font-accent);font-size:1.6rem;color:var(--valtara-blanco);margin:0 0 1rem;line-height:1.3;">${zone.titulo}</h3>
                <div style="background:rgba(255,255,255,0.03);border-left:3px solid ${colorHex};border-radius:0 8px 8px 0;padding:1rem 1.2rem;margin-bottom:1rem;">
                    <p style="font-size:0.85rem;font-weight:700;color:${colorHex};text-transform:uppercase;letter-spacing:0.08em;margin:0 0 0.5rem;">Causa biomecánica</p>
                    <p style="color:var(--valtara-gris-texto);font-size:0.97rem;line-height:1.75;margin:0;">${zone.causa}</p>
                </div>
                <div style="background:rgba(212,175,55,0.04);border-left:3px solid #D4AF37;border-radius:0 8px 8px 0;padding:1rem 1.2rem;margin-bottom:1rem;">
                    <p style="font-size:0.85rem;font-weight:700;color:#D4AF37;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 0.5rem;">Protocolo Valtara</p>
                    <p style="color:var(--valtara-gris-texto);font-size:0.97rem;line-height:1.75;margin:0;">${zone.protocolo}</p>
                </div>
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-top:0.5rem;">
                    <span style="font-size:0.9rem;color:#D4AF37;font-weight:600;">${zone.precio}</span>
                    <a href="https://wa.me/5213348572070?text=Hola%2C+tengo+un+problema+en+mi+${encodeURIComponent(zone.label).replace(/%20/g,'+')}+y+quiero+información+sobre+el+protocolo+Valtara."
                       target="_blank" rel="noopener noreferrer"
                       style="display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#000;padding:9px 18px;border-radius:30px;text-decoration:none;font-size:0.85rem;font-weight:700;font-family:'Lato',sans-serif;">
                        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Agendar sesión
                    </a>
                </div>
            </div>
        `;
    }

    /* ── EVENTOS DE CANVAS ───────────────────────────────────────── */
    function bindCanvasEvents(canvas) {
        // Mouse
        canvas.addEventListener('mousemove', e => {
            if (isDragging) {
                const dx = e.clientX - prevMouse.x;
                const dy = e.clientY - prevMouse.y;
                rotY += dx * 0.008;
                rotX += dy * 0.006;
                prevMouse = {x: e.clientX, y: e.clientY};
            } else {
                const hits = raycast(e.clientX, e.clientY);
                setHovered(hits.length ? hits[0].object : null);
            }
        });

        canvas.addEventListener('mousedown', e => {
            isDragging = true;
            _autoRotate = false;
            prevMouse = {x: e.clientX, y: e.clientY};
            canvas.style.cursor = 'grabbing';
        });

        canvas.addEventListener('mouseup', e => {
            if (!isDragging) return;
            isDragging = false;
            canvas.style.cursor = 'grab';
        });

        canvas.addEventListener('click', e => {
            const hits = raycast(e.clientX, e.clientY);
            if (hits.length) selectZone(hits[0].object);
        });

        // Touch
        let touchStart = null, touchStartTime = 0;
        canvas.addEventListener('touchstart', e => {
            const t = e.touches[0];
            touchStart = {x: t.clientX, y: t.clientY};
            touchStartTime = Date.now();
            prevMouse = {x: t.clientX, y: t.clientY};
            isDragging = true;
            _autoRotate = false;
        }, {passive: true});

        canvas.addEventListener('touchmove', e => {
            if (!isDragging) return;
            const t = e.touches[0];
            const dx = t.clientX - prevMouse.x;
            const dy = t.clientY - prevMouse.y;
            rotY += dx * 0.008;
            rotX += dy * 0.006;
            prevMouse = {x: t.clientX, y: t.clientY};
        }, {passive: true});

        canvas.addEventListener('touchend', e => {
            isDragging = false;
            if (!touchStart) return;
            const t = e.changedTouches[0];
            const dx = Math.abs(t.clientX - touchStart.x);
            const dy = Math.abs(t.clientY - touchStart.y);
            const dt = Date.now() - touchStartTime;
            // Tap: poca distancia y poco tiempo
            if (dx < 12 && dy < 12 && dt < 300) {
                const hits = raycast(t.clientX, t.clientY);
                if (hits.length) selectZone(hits[0].object);
            }
            touchStart = null;
        }, {passive: true});

        // Resize
        window.addEventListener('resize', () => {
            if (!renderer) return;
            const W = canvas.parentElement.clientWidth;
            const H = Math.max(420, Math.min(W * 1.2, 560));
            camera.aspect = W / H;
            camera.updateProjectionMatrix();
            renderer.setSize(W, H);
            canvas.height = H;
        }, {passive: true});
    }

    /* ── API PÚBLICA ─────────────────────────────────────────────── */
    function setView(side) {
        _autoRotate = false;
        const targets = {
            front: {y: 0,        x: 0},
            back:  {y: Math.PI,  x: 0},
            side:  {y: Math.PI/2, x: 0}
        };
        const t = targets[side] || targets.front;
        let start = {y: rotY % (Math.PI*2), x: rotX};
        let step = 0;
        const anim = () => {
            step += 0.06;
            if (step >= 1) { rotY = t.y; rotX = t.x; return; }
            const ease = 1 - Math.pow(1 - step, 3);
            rotY = start.y + (t.y - start.y) * ease;
            rotX = start.x + (t.x - start.x) * ease;
            requestAnimationFrame(anim);
        };
        anim();
    }

    function setVista(mode) {
        const wrapper3d    = document.getElementById('mapa-3d-wrapper');
        const wrapperTabla = document.getElementById('mapa-tabla-wrapper');
        const btn3d        = document.getElementById('btn-vista-3d');
        const btnTabla     = document.getElementById('btn-vista-tabla');

        if (mode === '3d') {
            wrapper3d.style.display    = 'grid';
            wrapperTabla.style.display = 'none';
            btn3d.style.background     = 'var(--valtara-cian-brillante)';
            btn3d.style.color          = '#000';
            btn3d.style.fontWeight     = '700';
            btnTabla.style.background  = 'transparent';
            btnTabla.style.color       = 'rgba(255,255,255,0.5)';
            btnTabla.style.fontWeight  = '400';
            btn3d.setAttribute('aria-pressed', 'true');
            btnTabla.setAttribute('aria-pressed', 'false');
            isVisible = true;
            if (!isInitialized && window.THREE) initThree();
        } else {
            wrapper3d.style.display    = 'none';
            wrapperTabla.style.display = 'block';
            btn3d.style.background     = 'transparent';
            btn3d.style.color          = 'rgba(255,255,255,0.5)';
            btn3d.style.fontWeight     = '400';
            btnTabla.style.background  = 'var(--valtara-cian-brillante)';
            btnTabla.style.color       = '#000';
            btnTabla.style.fontWeight  = '700';
            btn3d.setAttribute('aria-pressed', 'false');
            btnTabla.setAttribute('aria-pressed', 'true');
            isVisible = false;
            buildTable();
        }
    }

    function buildTable() {
        const tbody = document.getElementById('mapa-tabla-body');
        if (!tbody || tbody.children.length > 0) return;
        ZONES.forEach((zone, i) => {
            const tr = document.createElement('tr');
            tr.style.cssText = `background:${i%2===0 ? 'transparent' : 'rgba(255,255,255,0.02)'};`;
            tr.innerHTML = `
                <td style="padding:12px 16px;color:var(--valtara-blanco);font-weight:500;border-bottom:1px solid rgba(255,255,255,0.04);">${zone.label}</td>
                <td style="padding:12px 16px;color:var(--valtara-gris-texto);font-size:0.88rem;line-height:1.5;border-bottom:1px solid rgba(255,255,255,0.04);">${zone.causa.substring(0,120)}…</td>
                <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.04);">
                    <a href="https://wa.me/5213348572070?text=Hola%2C+quiero+información+sobre+el+protocolo+para+${encodeURIComponent(zone.label).replace(/%20/g,'+')}"
                       target="_blank" rel="noopener noreferrer"
                       style="display:inline-flex;align-items:center;gap:6px;background:#25D366;color:#000;padding:6px 14px;border-radius:20px;text-decoration:none;font-size:0.78rem;font-weight:700;font-family:'Lato',sans-serif;white-space:nowrap;">
                        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Agendar
                    </a>
                </td>`;
            tbody.appendChild(tr);
        });
    }

    /* ── ARRANQUE AUTOMÁTICO ─────────────────────────────────────── */
    // El canvas lo genera constructor_maestro.js DESPUÉS de que este script corre.
    // Por eso usamos un poller que espera hasta encontrarlo en el DOM.

    function loadThreeAndInit() {
        if (isInitialized) return;
        if (!window.THREE) {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            s.crossOrigin = 'anonymous';
            s.onload = () => { initThree(); isVisible = true; };
            document.head.appendChild(s);
        } else {
            initThree();
            isVisible = true;
        }
    }

    // Poller: intenta cada 300ms hasta encontrar el canvas (máx 15s)
    let pollCount = 0;
    const canvasPoller = setInterval(() => {
        pollCount++;
        if (pollCount > 50) { clearInterval(canvasPoller); return; } // 15s timeout

        const canvas = document.getElementById('body-map-canvas');
        if (!canvas) return; // canvas aún no existe, seguir esperando

        clearInterval(canvasPoller);

        // Canvas encontrado — arrancar si la sección de inicio está activa
        const home = document.getElementById('view-home');
        if (home && home.classList.contains('active')) {
            loadThreeAndInit();
        }

        // Observar cambios de clase en view-home para inicializar/pausar
        if (home) {
            new MutationObserver(() => {
                if (home.classList.contains('active')) {
                    isVisible = true;
                    if (!isInitialized) loadThreeAndInit();
                } else {
                    isVisible = false;
                }
            }).observe(home, { attributes: true, attributeFilter: ['class'] });
        }

        // Hook al router: cuando naveguen a home, inicializar
        const _origSync = window._syncBnav;
        window._syncBnav = function(viewId) {
            if (_origSync) _origSync(viewId);
            if (viewId === 'home') {
                isVisible = true;
                if (!isInitialized) loadThreeAndInit();
            } else {
                isVisible = false;
            }
        };

    }, 300);

    return { setView, setVista };

})();
