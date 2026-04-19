/**
 * ====================================================================================
 * BLOQUE 4: CONSTRUCTOR MAESTRO V58.0 (RENDERIZADO AUTÓNOMO Y BLINDAJE)
 * ------------------------------------------------------------------------------------
 * Ensamblador de módulos. Su purificador ahora es quirúrgico: respeta el menú
 * lateral y las ventanas emergentes para evitar colapsos de transparencia.
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraData = {
    
    crearPlaca: function(icono, titulo, subtitulo) {
        return `
        <div class="imperial-plaque" style="text-align: center; margin-bottom: 4rem; padding-top: 1rem;">
            <i class="fa-solid ${icono}" style="font-size: 3.5rem; color: var(--ambient-primary, #D4AF37); margin-bottom: 1.5rem; filter: drop-shadow(0 0 15px rgba(255,255,255,0.1));"></i>
            <h2 style="font-family: var(--font-accent, serif); font-size: 3rem; margin-bottom: 0.5rem; color: var(--valtara-blanco, #fff); text-shadow: 0 4px 15px rgba(0,0,0,0.8);">${titulo}</h2>
            <p style="color: var(--ambient-primary, #D4AF37); font-size: 1.15rem; text-transform: uppercase; letter-spacing: 0.25rem; font-weight: 900; margin:0;">${subtitulo}</p>
        </div>`;
    },
    
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
               (window.ValtaraModulos.modal_terminos || '') + 
               (window.ValtaraModulos.modal_whitepaper || '');
    },

    get footer() {
        return window.ValtaraModulos.global_footer || '';
    },

    // ====================================================================================
    // EL PURIFICADOR QUIRÚRGICO (Respeta Modales y Menús)
    // ====================================================================================
    purificarVistas: function() {
        if(document.getElementById('purificador-imperial')) return;
        
        const style = document.createElement('style');
        style.id = 'purificador-imperial';
        style.innerHTML = `
            /* SOLO borramos el fondo negro de los contenedores que están DENTRO de <main>.
               Esto protege al <nav> (Menú Lateral) y a los <dialog> (Ventanas Emergentes) 
               garantizando que sus colores oscuros sólidos no sean destruidos. */
            
            main .hero-view, 
            main .section-container, 
            main .body-map-container, 
            main .zone-info,
            main .tarjeta-oscura, 
            main .catalogo-seccion, 
            main article, 
            main .black-bg,
            main [style*="background: #050508"], 
            main [style*="background-color: #050508"], 
            main [style*="background: black"] {
                background: transparent !important;
                background-color: transparent !important;
                box-shadow: none !important;
            }
            
            main .img-fluid, main .img-hero {
                background: transparent !important;
            }
        `;
        document.head.appendChild(style);
        console.log("🛡️ [VALTARA BUILDER] Purificación quirúrgica activada. Modales protegidos.");
    },

    actualizarSaludo: function() {
        const heroTextObj = document.getElementById('hero-dynamic-text');
        if(!heroTextObj) return;

        try {
            const hour = new Date().getHours();
            let nombrePaciente = "ejecutivo";
            
            const storedProfile = localStorage.getItem('valtara_sovereign_profile');
            if (storedProfile) {
                const parsedData = JSON.parse(storedProfile);
                if (parsedData.name && parsedData.name !== 'Invitado VIP') {
                    nombrePaciente = parsedData.name;
                }
            }

            let dynText = "";
            if(hour >= 0 && hour < 6) dynText = `El silencio de la madrugada es el refugio de los visionarios, ${nombrePaciente}. Decodificamos la tensión de tu jornada mediante biomecánica de precisión.`;
            else if(hour >= 6 && hour < 12) dynText = `Un nuevo día de alto rendimiento comienza, ${nombrePaciente}. Calibramos tu estructura muscular para que conquistes tu agenda con vitalidad absoluta.`;
            else if(hour >= 12 && hour < 15) dynText = `El mediodía marca el clímax de la exigencia ejecutiva. Haz una pausa estratégica, ${nombrePaciente}; disolvemos el Burnout y te devolvemos a la cima.`;
            else if(hour >= 15 && hour < 19) dynText = `La tarde avanza. No permitas que la armadura del estrés limite tu potencial, ${nombrePaciente}. Liberamos tus cadenas musculares para la ligereza total.`;
            else if(hour >= 19 && hour < 21) dynText = `El sol desciende sobre la ciudad, ${nombrePaciente}. Disolvemos la adrenalina residual y preparamos tu cuerpo para la restauración nocturna.`;
            else dynText = `La noche envuelve el santuario. Es momento de cederle el control a la regeneración celular, ${nombrePaciente}. Inducimos ondas alfa y restauramos tu esencia.`;
            
            heroTextObj.innerHTML = dynText;
        } catch(e) {
            heroTextObj.innerHTML = "El rigor de la biomecánica clínica combinado con la relajación absoluta de un spa de ultra-lujo.";
        }
    },

    renderAll: function() {
        console.log("🏗️ [VALTARA BUILDER] Ensamblando arquitectura modular...");

        const setHTML = (id, content) => { 
            const el = document.getElementById(id); 
            if(el) el.innerHTML = content; 
        };
        
        try {
            setHTML('view-home', this.home);
            setHTML('view-restoration', this.restoration);
            setHTML('view-beauty', this.beauty);
            setHTML('view-science', this.science);
            setHTML('view-legal', this.legal);
            setHTML('view-sonotherapy', this.sonotherapy);
            setHTML('main-footer', this.footer);

            this.purificarVistas();
            this.actualizarSaludo();

            document.body.classList.remove('system-loading');
            console.log("✅ [VALTARA BUILDER] Ensamblaje exitoso.");
            
        } catch (error) {
            console.error("🔴 [VALTARA BUILDER] Fallo durante el ensamblaje:", error);
            document.body.classList.remove('system-loading');
        }
    }
};

// AUTO-ARRANQUE
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { ValtaraData.renderAll(); }, 100);
});
