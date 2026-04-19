/**
 * ====================================================================================
 * BLOQUE 4: CONSTRUCTOR MAESTRO V44.0 (ARQUITECTURA DE HACIENDA Y PURIFICACIÓN)
 * Ensambla la PWA, inyecta las Placas Imperiales (Encabezados) y blinda el Menú.
 * ====================================================================================
 */

// ARMADURA ANTI-FALLOS: Si no existe, lo crea automáticamente.
window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraData = {
    
    // ================================================================================
    // GENERADOR DE PLACAS IMPERIALES (ENCABEZADOS DE CATEGORÍA)
    // ================================================================================
    crearPlaca: function(icono, titulo, subtitulo) {
        return `
        <div class="imperial-plaque">
            <i class="fa-solid ${icono} plaque-icon"></i>
            <div>
                <h2>${titulo}</h2>
                <p class="plaque-subtitle">${subtitulo}</p>
            </div>
        </div>`;
    },

    // ================================================================================
    // ENSAMBLAJE DE VISTAS (Inyectando los nuevos encabezados)
    // ================================================================================
    
    // 1. EL LOBBY PRINCIPAL (Santuario)
    get home() {
        return (window.ValtaraModulos.inicio_bienvenida || '') + 
               (window.ValtaraModulos.inicio_refugio || '') + 
               (window.ValtaraModulos.inicio_promociones || '') + 
               (window.ValtaraModulos.inicio_arte_unas || '') + 
               (window.ValtaraModulos.inicio_mapa_cuerpo || '') + 
               (window.ValtaraModulos.inicio_redes_sociales || '');
    },

    // 2. CATÁLOGO DE MASOTERAPIA
    get restoration() {
        return this.crearPlaca('fa-spa', 'Masoterapia', 'Restauración Biomecánica') + 
               (window.ValtaraModulos.catalogo_masajes || '');
    },

    // 3. CATÁLOGO DE BELLEZA (Art & Nails)
    get beauty() {
        return this.crearPlaca('fa-wand-magic-sparkles', 'Art & Nails', 'Estudio de Belleza Integral') + 
               (window.ValtaraModulos.catalogo_belleza || '');
    },

    // 4. SONOTERAPIA
    get sonotherapy() {
        return this.crearPlaca('fa-water', 'Sonoterapia', 'Inmersión Acústica y Ondas Alfa') + 
               (window.ValtaraModulos.sonoterapia_introduccion || '') +
               (window.ValtaraModulos.sonoterapia_videos || '') +
               (window.ValtaraModulos.sonoterapia_audio || '');
    },

    // 5. CIENCIA (Matriz de Cristal Soberana)
    get science() {
        return this.crearPlaca('fa-dna', 'Ciencia Aplicada', 'Nuestra Matriz Biomecánica') + 
               (window.ValtaraModulos.ciencia_introduccion || '') + '</div>' + 
               '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 3px solid var(--valtara-oro-brillante);">' + 
               (window.ValtaraModulos.ciencia_neurobiologia || '') + '</div>' +
               '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 3px solid var(--v-rosa-mexicano);">' + 
               (window.ValtaraModulos.ciencia_fascia || '') + '</div>' +
               '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 3px solid var(--v-azul-talavera);">' + 
               (window.ValtaraModulos.ciencia_acustica || '') + '</div>' +
               '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 3px solid var(--v-ambar-sagrado);">' + 
               (window.ValtaraModulos.ciencia_biomecanica || '') + '</div>' +
               '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 3px solid var(--v-verde-quetzal);">' + 
               (window.ValtaraModulos.ciencia_botanica || '') + '</div>' +
               '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 3px solid var(--valtara-cian-brillante);">' + 
               (window.ValtaraModulos.ciencia_inclusion || '') + '</div>' +
               '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 3px solid var(--v-amatista);">' + 
               (window.ValtaraModulos.ciencia_referencias || '');
    },

    // 6. LEGAL Y MANIFIESTO
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

    // 7. FOOTER GLOBAL
    get footer() {
        return window.ValtaraModulos.global_footer || '';
    },

    // ====================================================================================
    // PROTOCOLO DE PURIFICACIÓN (REPARACIÓN DEL MENÚ Y ELIMINACIÓN DE MUROS)
    // ====================================================================================
    purificarVistas: function() {
        if(document.getElementById('purificador-imperial')) return;
        console.log("[VALTARA V44] Iniciando Protocolo de Escudos: Blindando menús y purificando fondos...");

        const style = document.createElement('style');
        style.id = 'purificador-imperial';
        style.innerHTML = `
            /* 1. PURGA DE OPACIDAD HEREDADA (Para que las tarjetas de cristal dominen) */
            .hero-view, .section-container, .body-map-container, .zone-info,
            .tarjeta-oscura, .catalogo-seccion, article, .black-bg,
            [style*="background: #050508"], [style*="background-color: #050508"], [style*="background: black"] {
                background: transparent !important;
                background-color: transparent !important;
                box-shadow: none !important;
            }
            
            /* 2. BLINDAJE DEL MENÚ LATERAL (Reparación de la transparencia indeseada) */
            .side-menu {
                background: rgba(7, 7, 12, 0.98) !important;
                backdrop-filter: blur(35px) !important;
                -webkit-backdrop-filter: blur(35px) !important;
                border-left: 2px solid var(--ambient-primary, var(--valtara-oro-brillante)) !important;
            }

            /* 3. ESTÉTICA DE LOS SUBTÍTULOS DE PLACA (Hacienda Imperial) */
            .plaque-subtitle {
                color: var(--ambient-primary, var(--valtara-oro-brillante)) !important;
                font-size: 1.1rem !important;
                margin: 0 !important;
                letter-spacing: 3px !important;
                text-transform: uppercase !important;
                font-weight: 900 !important;
                text-shadow: 0 2px 5px rgba(0,0,0,0.8);
            }
            
            /* 4. OCULTAR EL FOOTER EN VISTAS DE PANTALLA COMPLETA (Aura y Bóveda) */
            body:has(#view-aura.active) #main-footer,
            body:has(#view-user-vault.active) #main-footer {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    },

    // ====================================================================================
    // MOTOR PRINCIPAL DE RENDERIZADO
    // ====================================================================================
    renderAll: function() {
        const setHTML = (id, content) => { 
            const el = document.getElementById(id); 
            if(el) el.innerHTML = content; 
        };
        
        // 1. INYECTAR HTML Y PLACAS
        setHTML('view-home', this.home);
        setHTML('view-restoration', this.restoration);
        setHTML('view-beauty', this.beauty);
        setHTML('view-science', this.science);
        setHTML('view-legal', this.legal);
        setHTML('view-sonotherapy', this.sonotherapy);
        setHTML('main-footer', this.footer);

        // 2. EJECUTAR PURIFICACIÓN Y BLINDAJE
        this.purificarVistas();

        // 3. TEXTO DINÁMICO DEL HERO (Saludo Biológico Premium)
        const heroTextObj = document.getElementById('hero-dynamic-text');
        if(heroTextObj) {
            const hour = new Date().getHours();
            
            // Intenta extraer el nombre del paciente si ya está cargado en el UserEngine (V43+)
            let nombrePaciente = "ejecutivo";
            try {
                const storedProfile = JSON.parse(localStorage.getItem('valtara_sovereign_profile'));
                if (storedProfile && storedProfile.name && storedProfile.name !== 'Invitado VIP') {
                    nombrePaciente = storedProfile.name;
                }
            } catch(e) {}

            let dynText = "";
            if(hour >= 0 && hour < 6) {
                dynText = `El silencio de la madrugada es el refugio de los visionarios, ${nombrePaciente}. Decodificamos la tensión silenciosa de tu jornada mediante biomecánica de precisión.`;
            }
            else if(hour >= 6 && hour < 12) {
                dynText = `Un nuevo día de alto rendimiento comienza, ${nombrePaciente}. En nuestro santuario, calibramos tu estructura muscular para que conquistes tu agenda con vitalidad absoluta.`;
            }
            else if(hour >= 12 && hour < 15) {
                dynText = `El mediodía marca el clímax de la exigencia ejecutiva. Haz una pausa estratégica, ${nombrePaciente}; disolvemos el Burnout y te devolvemos a la cima.`;
            }
            else if(hour >= 15 && hour < 19) {
                dynText = `La tarde avanza. No permitas que la armadura del estrés te límite, ${nombrePaciente}. Liberamos tus cadenas musculares para que termines el día con total ligereza.`;
            }
            else if(hour >= 19 && hour < 21) {
                dynText = `El sol desciende sobre la ciudad, ${nombrePaciente}. A través de nuestra ciencia anatómica, disolvemos la adrenalina residual y preparamos tu cuerpo para la restauración.`;
            }
            else {
                dynText = `La noche envuelve el santuario. Es momento de cederle el control a la regeneración celular, ${nombrePaciente}. Inducimos ondas cerebrales lentas y restauramos tu esencia.`;
            }
            heroTextObj.innerHTML = dynText;
        }
        
        // 4. INICIALIZAR MOTORES AUXILIARES
        if(window.ValtaraAlchemist) setTimeout(() => { window.ValtaraAlchemist.init(); }, 500);
        if(window.OasisEngine) setTimeout(() => { window.OasisEngine.init(); }, 600);
    }
};
