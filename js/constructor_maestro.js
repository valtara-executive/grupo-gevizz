window.ValtaraData = {
    // 1. ENSAMBLAMOS EL LOBBY (El Refugio del Arquitecto integrado como pilar principal)
    home: window.ValtaraModulos.inicio_bienvenida + 
          window.ValtaraModulos.inicio_refugio + 
          window.ValtaraModulos.inicio_promociones + 
          window.ValtaraModulos.inicio_arte_unas + 
          window.ValtaraModulos.inicio_mapa_cuerpo + 
          window.ValtaraModulos.inicio_redes_sociales,

    // 2. ENSAMBLAMOS LOS CATÁLOGOS (Masajes y Belleza)
    restoration: window.ValtaraModulos.catalogo_masajes,
    beauty: window.ValtaraModulos.catalogo_belleza,

    // 3. ENSAMBLAMOS CIENCIA (Cirugía Estética Aplicada con tarjetas de cristal)
    science: window.ValtaraModulos.ciencia_introduccion + '</div>' + // Cerramos la tarjeta inicial
    
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid var(--valtara-cian-brillante); box-shadow: 0 1rem 4rem rgba(0, 255, 255, 0.1);">' + 
             window.ValtaraModulos.ciencia_neurobiologia + '</div>' +
             
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid #F72585; box-shadow: 0 1rem 4rem rgba(247, 37, 133, 0.1);">' + 
             window.ValtaraModulos.ciencia_fascia + '</div>' +
             
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid #4CC9F0; box-shadow: 0 1rem 4rem rgba(76, 201, 240, 0.1);">' + 
             window.ValtaraModulos.ciencia_acustica + '</div>' +
             
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid #ff5555; box-shadow: 0 1rem 4rem rgba(255, 85, 85, 0.1);">' + 
             window.ValtaraModulos.ciencia_biomecanica + '</div>' +
             
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid var(--valtara-verde-menta); box-shadow: 0 1rem 4rem rgba(0, 255, 170, 0.1);">' + 
             window.ValtaraModulos.ciencia_botanica + '</div>' +
             
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid var(--valtara-cian-brillante); box-shadow: 0 1rem 4rem rgba(0, 255, 255, 0.1);">' + 
             window.ValtaraModulos.ciencia_inclusion + '</div>' +
             
             '<div class="glass-card reveal" style="max-width: 1100px; margin: 0 auto 4rem auto; border-top: 2px solid var(--valtara-morado-vivo); box-shadow: 0 1rem 4rem rgba(178, 0, 255, 0.1);">' + 
             window.ValtaraModulos.ciencia_referencias, // La tarjeta se cierra sola dentro del módulo

    // 4. ENSAMBLAMOS LEGAL
    legal: '<div style="max-width: 1100px; margin: 0 auto;">' + 
           window.ValtaraModulos.legal_historia +
           window.ValtaraModulos.legal_manifiesto +
           window.ValtaraModulos.legal_transparencia +
           window.ValtaraModulos.legal_preguntas + 
           '</div>' + 
           window.ValtaraModulos.modal_terminos + 
           window.ValtaraModulos.modal_whitepaper,

    // 5. ENSAMBLAMOS SONOTERAPIA
    sonotherapy: window.ValtaraModulos.sonoterapia_introduccion +
                 window.ValtaraModulos.sonoterapia_videos +
                 window.ValtaraModulos.sonoterapia_audio,

    // 6. FOOTER GLOBAL
    footer: window.ValtaraModulos.global_footer,

    renderAll: function() {
        const homeDiv = document.getElementById('view-home');
        if(homeDiv) {
            homeDiv.innerHTML = this.home;
            const heroTextObj = document.getElementById('hero-dynamic-text');
            if(heroTextObj) {
                const hour = new Date().getHours();
                let dynText = "";
                if(hour >= 0 && hour < 6) dynText = "El silencio de la madrugada es el refugio de los grandes visionarios. Mientras la ciudad duerme, tu mente sigue creando. En nuestro santuario, decodificamos esa tensión silenciosa mediante ciencia anatómica profunda. Tu sistema nervioso está a punto de reiniciarse.";
                else if(hour >= 6 && hour < 12) dynText = "Un nuevo día corporativo comienza. El éxito exige un vehículo biológico capaz de sostenerlo desde la primera luz del sol. En nuestro santuario privado, calibramos tu estructura muscular para que conquistes tu jornada con enfoque y vitalidad absoluta.";
                else if(hour >= 12 && hour < 15) dynText = "El mediodía marca el clímax de la exigencia ejecutiva. Es el momento preciso donde el estrés comienza a cristalizarse en tu postura. Haz una pausa estratégica; en Valtara decodificamos esa sobrecarga mediante biomecánica de precisión para devolverte a la cima.";
                else if(hour >= 15 && hour < 19) dynText = "La tarde avanza y el peso de las decisiones se acumula en tu tejido conectivo. No permitas que la armadura del estrés te limite. En nuestro santuario en Paseo de la Reforma, liberamos las cadenas musculares posteriores para que termines tu día con total ligereza.";
                else if(hour >= 19 && hour < 21) dynText = "El sol desciende sobre Reforma, marcando el fin de la batalla corporativa. Es hora de hacer la transición. A través de nuestra ciencia anatómica profunda, disolvemos la adrenalina residual de tu jornada y preparamos tu cuerpo para el merecido descanso.";
                else dynText = "La noche envuelve la ciudad y tu mente exige tregua. Es momento de apagar los motores cognitivos y cederle el control a la regeneración. En Valtara, inducimos ondas cerebrales lentas y restauramos tus fibras musculares para asegurar un mañana triunfal.";
                heroTextObj.innerHTML = dynText;
            }
        }
        
        const restDiv = document.getElementById('view-restoration');
        if(restDiv) restDiv.innerHTML = this.restoration;

        const beautyDiv = document.getElementById('view-beauty');
        if(beautyDiv) beautyDiv.innerHTML = this.beauty;
        
        const sciDiv = document.getElementById('view-science');
        if(sciDiv) sciDiv.innerHTML = this.science;
        
        const legalDiv = document.getElementById('view-legal');
        if(legalDiv) legalDiv.innerHTML = this.legal;

        const sonoDiv = document.getElementById('view-sonotherapy');
        if(sonoDiv) sonoDiv.innerHTML = this.sonotherapy;
        
        const footDiv = document.getElementById('main-footer');
        if(footDiv) footDiv.innerHTML = this.footer;
        
        if(window.ValtaraAlchemist) setTimeout(() => { window.ValtaraAlchemist.init(); }, 500);
        // Despertamos la música después de pintar la pared
        if(window.OasisEngine) setTimeout(() => { window.OasisEngine.init(); }, 600);
    }
};
