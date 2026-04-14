// ARMADURA ANTI-FALLOS: Si no existe, lo crea automáticamente.
window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraData = {
    // 1. ENSAMBLAMOS EL LOBBY 
    home: (window.ValtaraModulos.inicio_bienvenida || '') + 
          (window.ValtaraModulos.inicio_refugio || '') + 
          (window.ValtaraModulos.inicio_promociones || '') + 
          (window.ValtaraModulos.inicio_arte_unas || '') + 
          (window.ValtaraModulos.inicio_mapa_cuerpo || '') + 
          (window.ValtaraModulos.inicio_redes_sociales || ''),

    // 2. ENSAMBLAMOS LOS CATÁLOGOS
    restoration: window.ValtaraModulos.catalogo_masajes || '',
    beauty: window.ValtaraModulos.catalogo_belleza || '',

    // 3. ENSAMBLAMOS CIENCIA (Tarjetas de cristal)
    science: (window.ValtaraModulos.ciencia_introduccion || '') + '</div>' + 
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid var(--valtara-cian-brillante);">' + 
             (window.ValtaraModulos.ciencia_neurobiologia || '') + '</div>' +
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid #F72585;">' + 
             (window.ValtaraModulos.ciencia_fascia || '') + '</div>' +
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid #4CC9F0;">' + 
             (window.ValtaraModulos.ciencia_acustica || '') + '</div>' +
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid #ff5555;">' + 
             (window.ValtaraModulos.ciencia_biomecanica || '') + '</div>' +
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid var(--valtara-verde-menta);">' + 
             (window.ValtaraModulos.ciencia_botanica || '') + '</div>' +
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid var(--valtara-cian-brillante);">' + 
             (window.ValtaraModulos.ciencia_inclusion || '') + '</div>' +
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid var(--valtara-morado-vivo);">' + 
             (window.ValtaraModulos.ciencia_referencias || ''),

    // 4. ENSAMBLAMOS LEGAL
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

    renderAll: function() {
        const setHTML = (id, content) => { const el = document.getElementById(id); if(el) el.innerHTML = content; };
        
        setHTML('view-home', this.home);
        setHTML('view-restoration', this.restoration);
        setHTML('view-beauty', this.beauty);
        setHTML('view-science', this.science);
        setHTML('view-legal', this.legal);
        setHTML('view-sonotherapy', this.sonotherapy);
        setHTML('main-footer', this.footer);

        const heroTextObj = document.getElementById('hero-dynamic-text');
        if(heroTextObj) {
            const hour = new Date().getHours();
            let dynText = "";
            if(hour >= 0 && hour < 6) dynText = "El silencio de la madrugada es el refugio de los grandes visionarios. En nuestro santuario, decodificamos esa tensión silenciosa mediante ciencia anatómica profunda.";
            else if(hour >= 6 && hour < 12) dynText = "Un nuevo día corporativo comienza. En nuestro santuario privado, calibramos tu estructura muscular para que conquistes tu jornada con enfoque y vitalidad absoluta.";
            else if(hour >= 12 && hour < 15) dynText = "El mediodía marca el clímax de la exigencia ejecutiva. Haz una pausa estratégica; en Valtara decodificamos esa sobrecarga mediante biomecánica de precisión para devolverte a la cima.";
            else if(hour >= 15 && hour < 19) dynText = "La tarde avanza. No permitas que la armadura del estrés te limite. En nuestro santuario, liberamos las cadenas musculares posteriores para que termines tu día con total ligereza.";
            else if(hour >= 19 && hour < 21) dynText = "El sol desciende sobre Reforma. A través de nuestra ciencia anatómica profunda, disolvemos la adrenalina residual de tu jornada y preparamos tu cuerpo para el merecido descanso.";
            else dynText = "La noche envuelve la ciudad. Es momento de cederle el control a la regeneración. En Valtara, inducimos ondas cerebrales lentas y restauramos tus fibras musculares.";
            heroTextObj.innerHTML = dynText;
        }
        
        if(window.ValtaraAlchemist) setTimeout(() => { window.ValtaraAlchemist.init(); }, 500);
        if(window.OasisEngine) setTimeout(() => { window.OasisEngine.init(); }, 600);
    }
};
