/**
 * ====================================================================================
 * BLOQUE 4: CONSTRUCTOR MAESTRO V63.0 (ENSAMBLAJE SEGURO Y LIBERACIÓN DE SCROLL)
 * ------------------------------------------------------------------------------------
 * Lee los módulos de contenido (JavaScript) y los inyecta en el esqueleto HTML.
 * Al finalizar, destruye los bloqueos de carga para permitir el scroll natural.
 * ====================================================================================
 */

// Aseguramos que el objeto global exista para no causar errores si un módulo tarda en cargar
window.ValtaraModulos = window.ValtaraModulos || {};

const ValtaraData = {
    
    // Función auxiliar para inyectar múltiples módulos en un solo contenedor
    renderView: function(id, ...modules) {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = modules.map(m => window.ValtaraModulos[m] || '').join('');
        } else {
            console.warn(`⚠️ [Constructor] Contenedor '${id}' no encontrado en el HTML.`);
        }
    },

    // Generador de Títulos de Lujo (Placas Imperiales)
    crearPlaca: function(icono, titulo, subtitulo) {
        return `
        <div class="imperial-plaque">
            <i class="fa-solid ${icono}"></i>
            <h2>${titulo}</h2>
            <p>${subtitulo}</p>
        </div>`;
    },

    // El Saludo Inteligente
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

    // MOTOR PRINCIPAL DE ENSAMBLAJE
    init: function() {
        console.log("🏗️ [VALTARA BUILDER] Iniciando ensamblaje de la clínica...");
        
        try {
            // 1. INICIO (El Santuario)
            this.renderView('view-home', 
                'inicio_bienvenida', 'inicio_refugio', 'inicio_promociones', 
                'inicio_arte_unas', 'inicio_mapa_cuerpo', 'inicio_redes_sociales'
            );

            // 2. MASAJES (Inyectando la Placa Imperial + El Catálogo)
            const restContainer = document.getElementById('view-restoration');
            if(restContainer) {
                restContainer.innerHTML = this.crearPlaca('fa-spa', 'Masoterapia', 'Restauración Biomecánica') + 
                                          (window.ValtaraModulos.catalogo_masajes || '');
            }

            // 3. UÑAS (Art & Nails)
            const beautyContainer = document.getElementById('view-beauty');
            if(beautyContainer) {
                beautyContainer.innerHTML = this.crearPlaca('fa-wand-magic-sparkles', 'Art & Nails', 'Estudio de Belleza Integral') + 
                                            (window.ValtaraModulos.catalogo_belleza || '');
            }

            // 4. SONOTERAPIA
            const sonoContainer = document.getElementById('view-sonotherapy');
            if(sonoContainer) {
                sonoContainer.innerHTML = this.crearPlaca('fa-water', 'Sonoterapia', 'Inmersión Acústica y Ondas Alfa') + 
                                          (window.ValtaraModulos.sonoterapia_introduccion || '') +
                                          (window.ValtaraModulos.sonoterapia_videos || '') +
                                          (window.ValtaraModulos.sonoterapia_audio || '');
            }

            // 5. CIENCIA APLICADA
            const cienciaContainer = document.getElementById('view-science');
            if(cienciaContainer) {
                cienciaContainer.innerHTML = this.crearPlaca('fa-dna', 'Ciencia Aplicada', 'Nuestra Matriz Biomecánica') + 
                                             (window.ValtaraModulos.ciencia_introduccion || '') + 
                                             (window.ValtaraModulos.ciencia_neurobiologia || '') + 
                                             (window.ValtaraModulos.ciencia_fascia || '') + 
                                             (window.ValtaraModulos.ciencia_acustica || '') + 
                                             (window.ValtaraModulos.ciencia_biomecanica || '') + 
                                             (window.ValtaraModulos.ciencia_botanica || '') + 
                                             (window.ValtaraModulos.ciencia_inclusion || '') + 
                                             (window.ValtaraModulos.ciencia_referencias || '');
            }

            // 6. MANIFIESTO LEGAL Y MODALES
            const legalContainer = document.getElementById('view-legal');
            if(legalContainer) {
                legalContainer.innerHTML = this.crearPlaca('fa-shield-halved', 'Manifiesto', 'Transparencia Corporativa') + 
                                           '<div style="max-width: 1100px; margin: 0 auto;">' + 
                                           (window.ValtaraModulos.legal_historia || '') +
                                           (window.ValtaraModulos.legal_manifiesto || '') +
                                           (window.ValtaraModulos.legal_transparencia || '') +
                                           (window.ValtaraModulos.legal_preguntas || '') + 
                                           '</div>' + 
                                           (window.ValtaraModulos.modal_terminos || '') + 
                                           (window.ValtaraModulos.modal_whitepaper || '');
            }

            // 7. PIE DE PÁGINA (FOOTER)
            this.renderView('main-footer', 'global_footer');

            // 8. EJECUTAR EL SALUDO
            this.actualizarSaludo();

        } catch(error) {
            console.error("🔴 [VALTARA BUILDER] Error durante la inyección de módulos:", error);
        } finally {
            // ========================================================================
            // PASO CRÍTICO DE SUPERVIVENCIA: LIBERAR EL SCROLL
            // (Esto se ejecuta SIEMPRE, incluso si hubo un error arriba)
            // ========================================================================
            document.body.classList.remove('system-loading');
            document.body.style.overflow = ''; 
            document.documentElement.style.overflow = '';
            console.log("🔓 [VALTARA BUILDER] Ensamblaje finalizado. Scroll liberado.");
        }
    }
};

// AUTO-ARRANQUE AUTÓNOMO
document.addEventListener('DOMContentLoaded', () => {
    // Le damos a la red 150 milisegundos de ventaja para terminar de descargar 
    // tus archivos pesados antes de intentar pegarlos.
    setTimeout(() => { 
        ValtaraData.init(); 
    }, 150);
});
