// ====================================================================================
// BLOQUE 4: CONSTRUCTOR MAESTRO V41 (ARQUITECTURA SOBERANA & PURIFICACIÓN VISUAL)
// Ensambla la PWA y destruye dinámicamente la opacidad heredada (Anti-Black Screens)
// ====================================================================================

// ARMADURA ANTI-FALLOS: Si no existe, lo crea automáticamente.
window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraData = {
    // 1. ENSAMBLAMOS EL LOBBY (El Santuario Principal)
    home: (window.ValtaraModulos.inicio_bienvenida || '') + 
          (window.ValtaraModulos.inicio_refugio || '') + 
          (window.ValtaraModulos.inicio_promociones || '') + 
          (window.ValtaraModulos.inicio_arte_unas || '') + 
          (window.ValtaraModulos.inicio_mapa_cuerpo || '') + 
          (window.ValtaraModulos.inicio_redes_sociales || ''),

    // 2. ENSAMBLAMOS LOS CATÁLOGOS (Masoterapia y Estética)
    restoration: window.ValtaraModulos.catalogo_masajes || '',
    beauty: window.ValtaraModulos.catalogo_belleza || '',

    // 3. ENSAMBLAMOS CIENCIA (Matriz de Cristal Soberana)
    science: (window.ValtaraModulos.ciencia_introduccion || '') + '</div>' + 
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
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 3px solid var(--valtara-morado-vivo);">' + 
             (window.ValtaraModulos.ciencia_referencias || ''),

    // 4. ENSAMBLAMOS LEGAL Y MANIFIESTO
    legal: '<div style="max-width: 1100px; margin: 0 auto;">' + 
           (window.ValtaraModulos.legal_historia || '') +
           (window.ValtaraModulos.legal_manifiesto || '') +
           (window.ValtaraModulos.legal_transparencia || '') +
           (window.ValtaraModulos.legal_preguntas || '') + 
           '</div>' + 
           (window.ValtaraModulos.modal_terminos || '') + 
           (window.ValtaraModulos.modal_whitepaper || ''),

    // 5. ENSAMBLAMOS SONOTERAPIA
    sonotherapy: (window.ValtaraModulos.sonoterapia_introduccion || '') +
                 (window.ValtaraModulos.sonoterapia_videos || '') +
                 (window.ValtaraModulos.sonoterapia_audio || ''),

    // 6. FOOTER GLOBAL
    footer: window.ValtaraModulos.global_footer || '',

    // ====================================================================================
    // PROTOCOLO DE PURIFICACIÓN (ELIMINA LOS MUROS NEGROS DEL CÓDIGO HEREDADO)
    // ====================================================================================
    purificarVistas: function() {
        // Verifica si el purificador ya fue inyectado para no duplicar código
        if(document.getElementById('purificador-imperial')) return;

        console.log("[VALTARA V41] Iniciando Protocolo de Transparencia: Destruyendo muros opacos...");

        const style = document.createElement('style');
        style.id = 'purificador-imperial';
        // Aquí forzamos la transparencia en todas las clases antiguas que usaban fondos negros
        style.innerHTML = `
            /* PURGA DE OPACIDAD: Permite que las pirámides y los astros sean visibles */
            .hero-view, 
            .section-container, 
            .body-map-container, 
            .zone-info,
            .tarjeta-oscura,
            .catalogo-seccion,
            article,
            .black-bg,
            [style*="background: #050508"],
            [style*="background-color: #050508"],
            [style*="background: black"] {
                background: transparent !important;
                background-color: transparent !important;
            }
            /* Suavizamos los contenedores antiguos que no eran glass-cards */
            .legacy-container {
                background: rgba(10, 10, 15, 0.4) !important;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
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
        
        // 1. INYECTAR HTML
        setHTML('view-home', this.home);
        setHTML('view-restoration', this.restoration);
        setHTML('view-beauty', this.beauty);
        setHTML('view-science', this.science);
        setHTML('view-legal', this.legal);
        setHTML('view-sonotherapy', this.sonotherapy);
        setHTML('main-footer', this.footer);

        // 2. EJECUTAR PURIFICACIÓN VISUAL (Romper la oscuridad heredada)
        this.purificarVistas();

        // 3. TEXTO DINÁMICO DEL HERO (Adaptativo al reloj biológico)
        const heroTextObj = document.getElementById('hero-dynamic-text');
        if(heroTextObj) {
            const hour = new Date().getHours();
            let dynText = "";
            if(hour >= 0 && hour < 6) {
                dynText = "El silencio de la madrugada es el refugio de los visionarios. Decodificamos esa tensión silenciosa mediante biomecánica de precisión y herencia ancestral.";
            }
            else if(hour >= 6 && hour < 12) {
                dynText = "Un nuevo día de alto rendimiento comienza. En nuestro santuario, calibramos tu estructura muscular para que conquistes tu jornada con enfoque y vitalidad absoluta.";
            }
            else if(hour >= 12 && hour < 15) {
                dynText = "El mediodía marca el clímax de la exigencia ejecutiva. Haz una pausa estratégica; disolvemos el Burnout y te devolvemos a la cima.";
            }
            else if(hour >= 15 && hour < 19) {
                dynText = "La tarde avanza. No permitas que la armadura del estrés te límite. Liberamos las cadenas musculares posteriores para que termines tu día con total ligereza.";
            }
            else if(hour >= 19 && hour < 21) {
                dynText = "El sol desciende sobre la ciudad. A través de nuestra ciencia anatómica, disolvemos la adrenalina residual y preparamos tu cuerpo para la restauración.";
            }
            else {
                dynText = "La noche envuelve el santuario. Es momento de cederle el control a la regeneración celular. Inducimos ondas cerebrales lentas y restauramos tu esencia.";
            }
            heroTextObj.innerHTML = dynText;
        }
        
        // 4. INICIALIZAR MOTORES AUXILIARES
        if(window.ValtaraAlchemist) setTimeout(() => { window.ValtaraAlchemist.init(); }, 500);
        if(window.OasisEngine) setTimeout(() => { window.OasisEngine.init(); }, 600);
    }
};
