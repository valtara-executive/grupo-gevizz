window.ValtaraModulos = window.ValtaraModulos || {};

const ValtaraData = {
    renderView: function(id, ...modules) {
        const container = document.getElementById(id);
        if (container) {
            // Une los módulos de JS y los inyecta. Si uno falta, pone un string vacío.
            container.innerHTML = modules.map(m => window.ValtaraModulos[m] || '').join('');
        } else {
            console.warn(`[Constructor] Contenedor ${id} no encontrado.`);
        }
    },

    init: function() {
        console.log("🏗️ Ensamblando el imperio Valtara...");
        
        // 1. INICIO (Aquí van las promociones, aseguradas en orden)
        this.renderView('view-home', 
            'inicio_bienvenida', 
            'inicio_refugio', 
            'inicio_promociones', // ¡Promociones garantizadas aquí!
            'inicio_arte_unas', 
            'inicio_mapa_cuerpo', 
            'inicio_redes_sociales'
        );

        // 2. CATÁLOGOS
        this.renderView('view-restoration', 'catalogo_masajes');
        this.renderView('view-beauty', 'catalogo_belleza');

        // 3. EXPERIENCIA Y CIENCIA
        this.renderView('view-sonotherapy', 'sonoterapia_introduccion', 'sonoterapia_videos', 'sonoterapia_audio');
        this.renderView('view-science', 'ciencia_introduccion', 'ciencia_neurobiologia', 'ciencia_fascia', 'ciencia_biomecanica', 'ciencia_referencias');
        
        // 4. LEGAL
        this.renderView('view-legal', 'legal_historia', 'legal_manifiesto', 'legal_transparencia', 'legal_preguntas', 'modal_terminos', 'modal_whitepaper');
        
        // 5. BÓVEDA DEL PACIENTE Y AURA AI (Inyección de módulos de usuario)
        // El HTML base V40 debe tener <section id="view-user-vault" class="view-section"></section>
        this.renderView('view-user-vault', 'user_vault_template'); // Si tienes un template JS para la bóveda
        
        // 6. FOOTER GLOBAL
        this.renderView('main-footer', 'global_footer');

        // ============================================================
        // LIBERACIÓN FÍSICA: Levantar la cortina y reactivar el scroll
        // ============================================================
        setTimeout(() => {
            document.body.classList.remove('system-loading');
            document.body.style.overflow = '';
        }, 150);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => ValtaraData.init(), 100);
});
