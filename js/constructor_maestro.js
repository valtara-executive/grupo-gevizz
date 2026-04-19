/**
 * ====================================================================================
 * BLOQUE 4: CONSTRUCTOR MAESTRO V54.0 (RENDERIZADO AUTÓNOMO Y PLACAS IMPERIALES)
 * ------------------------------------------------------------------------------------
 * Arquitectura anti-colapso. Este motor se ejecuta a sí mismo. Ya no depende de 
 * otros archivos JS para inyectar el contenido, garantizando que Valtara nunca 
 * se quede con la pantalla en blanco (Cero Efecto Dominó).
 * ====================================================================================
 */

// ARMADURA ANTI-FALLOS: Si los módulos aún no cargan, preparamos el objeto.
window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraData = {
    
    // ================================================================================
    // GENERADOR DE PLACAS IMPERIALES (ENCABEZADOS DE SECCIÓN)
    // Inyecta estilos en línea para garantizar que siempre se vean de ultra-lujo
    // ================================================================================
    crearPlaca: function(icono, titulo, subtitulo) {
        return `
        <div class="imperial-plaque" style="text-align: center; margin-bottom: 4rem; padding-top: 1rem;">
            <i class="fa-solid ${icono}" style="font-size: 3.5rem; color: var(--ambient-primary, #D4AF37); margin-bottom: 1.5rem; filter: drop-shadow(0 0 15px rgba(255,255,255,0.1));"></i>
            <h2 style="font-family: var(--font-accent, serif); font-size: 3rem; margin-bottom: 0.5rem; color: var(--valtara-blanco, #fff); text-shadow: 0 4px 15px rgba(0,0,0,0.8);">${titulo}</h2>
            <p style="color: var(--ambient-primary, #D4AF37); font-size: 1.15rem; text-transform: uppercase; letter-spacing: 0.25rem; font-weight: 900; margin:0;">${subtitulo}</p>
        </div>`;
    },

    // ================================================================================
    // ENSAMBLAJE DE VISTAS (Fusión Segura de Módulos)
    // ================================================================================
    
    get home() {
        return (window.ValtaraModulos.inicio_bienvenida || '') + 
               (window.ValtaraModulos.inicio_refugio || '') + 
               (window.ValtaraModulos.inicio_promociones || '') + 
               (window.ValtaraModulos.inicio_arte_unas || '') + 
               (window.ValtaraModulos.inicio_mapa_cuerpo || '') + 
               (window.ValtaraModulos.inicio_redes_sociales || '');
    },

    get restoration() {
        return this.crearPlaca('fa-spa', 'Masoterapia', 'Restauración Biomecánica') + 
               (window.ValtaraModulos.catalogo_masajes || '');
    },

    get beauty() {
        return this.crearPlaca('fa-wand-magic-sparkles', 'Art & Nails', 'Estudio de Belleza Integral') + 
               (window.ValtaraModulos.catalogo_belleza || '');
    },

    get sonotherapy() {
        return this.crearPlaca('fa-water', 'Sonoterapia', 'Inmersión Acústica y Ondas Alfa') + 
               (window.ValtaraModulos.sonoterapia_introduccion || '') +
               (window.ValtaraModulos.sonoterapia_videos || '') +
               (window.ValtaraModulos.sonoterapia_audio || '');
    },

    get science() {
        return this.crearPlaca('fa-dna', 'Ciencia Aplicada', 'Nuestra Matriz Biomecánica') + 
               (window.ValtaraModulos.ciencia_introduccion || '') + 
               (window.ValtaraModulos.ciencia_neurobiologia || '') + 
               (window.ValtaraModulos.ciencia_fascia || '') + 
               (window.ValtaraModulos.ciencia_acustica || '') + 
               (window.ValtaraModulos.ciencia_biomecanica || '') + 
               (window.ValtaraModulos.ciencia_botanica || '') + 
               (window.ValtaraModulos.ciencia_inclusion || '') + 
               (window.ValtaraModulos.ciencia_referencias || '');
    },

    get legal() {
        return this.crearPlaca('fa-shield-halved', 'Manifiesto', 'Transparencia Corporativa') + 
               '<div style="max-width: 1100px; margin: 0 auto;">' + 
               (window.ValtaraModulos.legal_historia || '') +
               (window.ValtaraModulos.legal_manifiesto || '') +
               (window.ValtaraModulos.legal_transparencia || '') +
               (window.ValtaraModulos.legal_preguntas || '') + 
               '</div>' + 
               // Inyección de los Modales ocultos para que abran al dar clic en botones legales
               (window.ValtaraModulos.modal_terminos || '') + 
               (window.ValtaraModulos.modal_whitepaper || '');
    },

    get footer() {
        return window.ValtaraModulos.global_footer || '';
    },

    // ====================================================================================
    // PROTOCOLO DE PURIFICACIÓN (LIMPIEZA DE CÓDIGO HEREDADO)
    // Elimina los fondos negros fijos antiguos para que la nueva transparencia Grid funcione
    // ====================================================================================
    purificarVistas: function() {
        if(document.getElementById('purificador-imperial')) return;
        
        const style = document.createElement('style');
        style.id = 'purificador-imperial';
        style.innerHTML = `
            /* PURGA DE FONDOS VIEJOS PARA QUE RESALTE EL PAISAJE DEL MAIN.CSS */
            .hero-view, .section-container, .body-map-container, .zone-info,
            .tarjeta-oscura, .catalogo-seccion, article, .black-bg,
            [style*="background: #050508"], [style*="background-color: #050508"], [style*="background: black"] {
                background: transparent !important;
                background-color: transparent !important;
                box-shadow: none !important;
            }
            
            /* Ajuste extra de purificación para imágenes sin fondo */
            .img-fluid, .img-hero {
                background: transparent !important;
            }
        `;
        document.head.appendChild(style);
        console.log("🛡️ [VALTARA BUILDER] Protocolo de Purificación de Estilos activado.");
    },

    // ====================================================================================
    // SALUDO BIOLÓGICO INTELIGENTE
    // ====================================================================================
    actualizarSaludo: function() {
        const heroTextObj = document.getElementById('hero-dynamic-text');
        if(!heroTextObj) return;

        try {
            const hour = new Date().getHours();
            let nombrePaciente = "ejecutivo";
            
            // Intenta extraer la memoria de User.js o Aura.js silenciosamente
            const storedProfile = localStorage.getItem('valtara_sovereign_profile');
            if (storedProfile) {
                const parsedData = JSON.parse(storedProfile);
                if (parsedData.name && parsedData.name !== 'Invitado VIP') {
                    nombrePaciente = parsedData.name;
                }
            }

            let dynText = "";
            if(hour >= 0 && hour < 6) {
                dynText = `El silencio de la madrugada es el refugio de los visionarios, ${nombrePaciente}. Decodificamos la tensión de tu jornada mediante biomecánica de precisión.`;
            }
            else if(hour >= 6 && hour < 12) {
                dynText = `Un nuevo día de alto rendimiento comienza, ${nombrePaciente}. Calibramos tu estructura muscular para que conquistes tu agenda con vitalidad absoluta.`;
            }
            else if(hour >= 12 && hour < 15) {
                dynText = `El mediodía marca el clímax de la exigencia ejecutiva. Haz una pausa estratégica, ${nombrePaciente}; disolvemos el Burnout y te devolvemos a la cima.`;
            }
            else if(hour >= 15 && hour < 19) {
                dynText = `La tarde avanza. No permitas que la armadura del estrés limite tu potencial, ${nombrePaciente}. Liberamos tus cadenas musculares para la ligereza total.`;
            }
            else if(hour >= 19 && hour < 21) {
                dynText = `El sol desciende sobre la ciudad, ${nombrePaciente}. Disolvemos la adrenalina residual y preparamos tu cuerpo para la restauración nocturna.`;
            }
            else {
                dynText = `La noche envuelve el santuario. Es momento de cederle el control a la regeneración celular, ${nombrePaciente}. Inducimos ondas alfa y restauramos tu esencia.`;
            }
            heroTextObj.innerHTML = dynText;
        } catch(e) {
            // Si algo falla, un mensaje por defecto ultra-elegante
            heroTextObj.innerHTML = "El rigor de la biomecánica clínica combinado con la relajación absoluta de un spa de ultra-lujo.";
        }
    },

    // ====================================================================================
    // MOTOR DE RENDERIZADO (INYECCIÓN DE CÓDIGO DURO AL HTML)
    // ====================================================================================
    renderAll: function() {
        console.log("🏗️ [VALTARA BUILDER] Ensamblando arquitectura modular...");

        const setHTML = (id, content) => { 
            const el = document.getElementById(id); 
            if(el) {
                el.innerHTML = content; 
            } else {
                console.warn(`⚠️ [VALTARA BUILDER] Contenedor '${id}' no encontrado en el DOM.`);
            }
        };
        
        try {
            // 1. INYECTAR MÓDULOS EN SUS SECCIONES
            setHTML('view-home', this.home);
            setHTML('view-restoration', this.restoration);
            setHTML('view-beauty', this.beauty);
            setHTML('view-science', this.science);
            setHTML('view-legal', this.legal);
            setHTML('view-sonotherapy', this.sonotherapy);
            setHTML('main-footer', this.footer);

            // 2. PURIFICAR CSS VIEJO
            this.purificarVistas();

            // 3. APLICAR SALUDO PERSONALIZADO
            this.actualizarSaludo();

            // 4. RETIRAR PANTALLA DE CARGA (Libera la vista al usuario)
            document.body.classList.remove('system-loading');
            
            console.log("✅ [VALTARA BUILDER] Ensamblaje exitoso. Ecosistema listo.");
            
        } catch (error) {
            console.error("🔴 [VALTARA BUILDER] Fallo crítico durante el ensamblaje:", error);
            // Escudo de emergencia: Mostrar al menos el contenedor principal
            document.body.classList.remove('system-loading');
        }
    }
};

// ====================================================================================
// AUTONOMÍA ABSOLUTA: SE EJECUTA A SÍ MISMO SIN ESPERAR AL CORE.JS
// ====================================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Un pequeñísimo respiro de 100ms para asegurar que los módulos de contenido (archivos .js)
    // se hayan descargado de la red antes de intentar pegarlos en el HTML.
    setTimeout(() => {
        ValtaraData.renderAll();
    }, 100);
});
