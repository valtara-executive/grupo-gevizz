// Importación de módulos de contenido (Nodos intocables)
import * as Inicio from './inicio_bienvenida.js';
import * as Masajes from './catalogo_masajes.js';
import * as Belleza from './catalogo_belleza.js';
import * as Sonoterapia from './oasis.js';
// ... importar el resto de módulos según sea necesario

export const ConstructorMaestro = {
    
    // Middleware de Traducción: Habla el idioma del JS pero inyecta el diseño de Revista
    traductor: function(contenedor) {
        if (!contenedor) return;

        // Fotos: Aplicar recorte editorial
        contenedor.querySelectorAll('img').forEach(img => img.classList.add('img-cover'));

        // Botones: Alternar colores Tierra/Bosque para elegancia
        contenedor.querySelectorAll('button, a').forEach((btn, i) => {
            if (!btn.classList.contains('nav-item')) {
                btn.classList.add('btn', i % 2 === 0 ? 'btn-bosque' : 'btn-tierra');
            }
        });

        // Listas: Convertir en cuadrículas dinámicas
        contenedor.querySelectorAll('ul, .contenedor-js').forEach(el => {
            el.classList.add('grid-editorial');
            el.style.listStyle = 'none';
        });

        // Artículos: Envolver en Glassmorphism
        contenedor.querySelectorAll('article, section > div').forEach(card => {
            card.classList.add('glass-card');
        });
    },

    // Generador Progresivo de Menú (Cuadrícula)
    generarMenu: function() {
        const sidebar = document.getElementById('sidebar-shell');
        if (!sidebar || sidebar.children.length > 1) return; // Evitar duplicados

        const configMenu = [
            { id: 'view-home', txt: 'Inicio' },
            { id: 'view-catalogo-masajes', txt: 'Masajes' },
            { id: 'view-estudio-manicura', txt: 'Belleza' },
            { id: 'view-sonoterapia', txt: 'Oasis' },
            { id: 'view-ciencia', txt: 'Ciencia' },
            { id: 'view-aura', txt: '⟡ Aura IA' },
            { id: 'view-expediente', txt: 'Expediente' }
        ];

        configMenu.forEach(item => {
            const btn = document.createElement('a');
            btn.className = 'nav-item';
            btn.setAttribute('data-target', item.id);
            btn.href = item.id === 'view-home' ? '/' : `/${item.id.replace('view-', '')}`;
            btn.textContent = item.txt;
            sidebar.appendChild(btn);
        });
    },

    // Orquestador de Inyección
    construir: function(vistaId) {
        this.generarMenu();
        const area = document.getElementById(vistaId);
        
        // Evitar re-inyección si ya hay contenido (optimización PWA)
        if (area.innerHTML.trim() !== "") return;

        // Lógica de inyección por caso (conecta con tus archivos JS)
        switch(vistaId) {
            case 'view-home':
                area.innerHTML = `${Inicio.render()} ${Sonoterapia.renderPreview()}`; 
                break;
            case 'view-catalogo-masajes':
                area.innerHTML = Masajes.obtenerCatalogoCompleto();
                break;
            case 'view-estudio-manicura':
                area.innerHTML = Belleza.renderEstudio();
                break;
            // Añadir casos para Aura, Expediente, Ciencia, etc.
        }

        // APLICAR TRADUCTOR AUTOMÁTICO
        this.traductor(area);
    }
};
