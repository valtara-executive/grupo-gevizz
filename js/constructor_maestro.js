window.ValtaraData = {
    // 1. ENSAMBLAMOS EL LOBBY
    home: window.ValtaraModulos.inicio_bienvenida + 
          window.ValtaraModulos.inicio_promociones + 
          window.ValtaraModulos.inicio_arte_unas + 
          window.ValtaraModulos.inicio_mapa_cuerpo + 
          window.ValtaraModulos.inicio_redes_sociales,

    // 2. ENSAMBLAMOS LOS CATÁLOGOS (Masajes y Unicornio Morado)
    restoration: window.ValtaraModulos.catalogo_masajes,
    beauty: window.ValtaraModulos.catalogo_belleza,

    // 3. ENSAMBLAMOS CIENCIA
    science: window.ValtaraModulos.ciencia_introduccion +
             window.ValtaraModulos.ciencia_neurobiologia +
             window.ValtaraModulos.ciencia_fascia +
             window.ValtaraModulos.ciencia_acustica +
             window.ValtaraModulos.ciencia_biomecanica +
             window.ValtaraModulos.ciencia_botanica +
             window.ValtaraModulos.ciencia_inclusion +
             window.ValtaraModulos.ciencia_referencias,

    // 4. ENSAMBLAMOS LEGAL
    legal: window.ValtaraModulos.legal_historia +
           window.ValtaraModulos.legal_manifiesto +
           window.ValtaraModulos.legal_transparencia +
           window.ValtaraModulos.legal_preguntas + 
           window.ValtaraModulos.modal_terminos + 
           window.ValtaraModulos.modal_whitepaper,

    // 5. FOOTER GLOBAL
    footer: window.ValtaraModulos.global_footer,

    renderAll: function() {
        const homeDiv = document.getElementById('view-home');
        if(homeDiv) {
            homeDiv.innerHTML = this.home;
            // Rutina de texto dinámico de inicio
            const heroTextObj = document.getElementById('hero-dynamic-text');
            if(heroTextObj) {
                const hour = new Date().getHours();
                let dynText = "";
                if(hour >= 0 && hour < 6) dynText = "El silencio de la madrugada es el refugio de los grandes visionarios...";
                else if(hour >= 6 && hour < 12) dynText = "Un nuevo día corporativo comienza...";
                else if(hour >= 12 && hour < 15) dynText = "El mediodía marca el clímax de la exigencia ejecutiva...";
                else if(hour >= 15 && hour < 19) dynText = "La tarde avanza y el peso de las decisiones se acumula...";
                else if(hour >= 19 && hour < 21) dynText = "El sol desciende sobre Reforma...";
                else dynText = "La noche envuelve la ciudad y tu mente exige tregua...";
                heroTextObj.innerHTML = dynText;
            }
        }
        
        const restDiv = document.getElementById('view-restoration');
        if(restDiv) restDiv.innerHTML = this.restoration;

        // NUEVA VISTA PARA MANICURA
        const beautyDiv = document.getElementById('view-beauty');
        if(beautyDiv) beautyDiv.innerHTML = this.beauty;
        
        const sciDiv = document.getElementById('view-science');
        if(sciDiv) sciDiv.innerHTML = this.science;
        
        const legalDiv = document.getElementById('view-legal');
        if(legalDiv) legalDiv.innerHTML = this.legal;
        
        const footDiv = document.getElementById('main-footer');
        if(footDiv) footDiv.innerHTML = this.footer;
        
        if(window.ValtaraAlchemist) setTimeout(() => { window.ValtaraAlchemist.init(); }, 500);
    }
};
