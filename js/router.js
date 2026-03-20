// js/router.js - Controlador de Navegación
const Router = {
    navigate: function(targetId) {
        // Ocultar todas las secciones
        document.querySelectorAll('.view-section').forEach(sec => {
            sec.classList.remove('active');
            setTimeout(() => { sec.style.display = 'none'; }, 300);
        });
        
        // Mostrar la sección destino
        const target = document.getElementById('view-' + targetId);
        if(target) {
            setTimeout(() => {
                target.style.display = 'block';
                void target.offsetWidth; // Forzar renderizado
                target.classList.add('active');
                window.scrollTo({top: 0, behavior: 'smooth'}); // Subir la pantalla suavemente
            }, 310);
        }
    },
    init: function() {
        // Al entrar a la web, cargar el inicio por defecto
        this.navigate('home');
        
        // Conectar los botones del menú lateral
        document.querySelectorAll('[data-target]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.navigate(e.currentTarget.getAttribute('data-target'));
                // Cerrar el menú al hacer clic
                const closeBtn = document.getElementById('menu-close-btn');
                if(closeBtn) closeBtn.click();
            });
        });
    }
};
window.addEventListener('DOMContentLoaded', () => { setTimeout(() => Router.init(), 100); });
