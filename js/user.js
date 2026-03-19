/**
 * ====================================================================================
 * BLOQUE 8: GESTOR DE IDENTIDAD (USER ENGINE)
 * Controla el Avatar, las Cookies LFPDPPP, y los saludos / cortesías dinámicas por hora.
 * ====================================================================================
 */

const UserEngine = {
    userName: 'Apreciable visitante', // Nombre por defecto
    
    init: function() {
        this.loadIdentity();
        this.bindEvents();
        
        // Esperamos a que CoreEngine inyecte el HTML (0.2s) para sobreescribir los textos
        setTimeout(() => {
            this.updateDynamicContent();
        }, 200);
    },

    loadIdentity: function() {
        const savedName = localStorage.getItem('valtara_identity');
        
        if (savedName) {
            this.userName = savedName;
            this.updateAvatar();
        } else {
            // Si es un visitante nuevo, abrimos la ventana del Avatar automáticamente
            setTimeout(() => {
                const userModal = document.getElementById('user-modal');
                if(userModal && !userModal.open) {
                    userModal.showModal();
                    if(window.A11yEngine) {
                        A11yEngine.announce("Bienvenido al Santuario. Por favor, escriba su nombre o título para personalizar su expediente clínico.");
                    }
                }
            }, 1500);
        }
    },

    updateAvatar: function() {
        const headerNameSpan = document.getElementById('header-user-name');
        if (headerNameSpan) {
            headerNameSpan.textContent = this.userName;
        }
    },

    bindEvents: function() {
        const saveBtn = document.getElementById('save-name-btn');
        const nameInput = document.getElementById('user-name-input');
        
        if (saveBtn && nameInput) {
            saveBtn.addEventListener('click', () => {
                const newName = nameInput.value.trim();
                if (newName) {
                    this.userName = newName;
                    localStorage.setItem('valtara_identity', this.userName); // Cookie segura local
                    
                    this.updateAvatar();
                    this.updateDynamicContent();
                    
                    // Cerrar el Modal
                    const dialog = document.getElementById('user-modal');
                    if(dialog && dialog.open) {
                        dialog.close();
                        document.body.style.overflow = 'auto';
                    }
                    
                    if(window.A11yEngine) {
                        A11yEngine.announce(`Identidad actualizada. Es un honor recibirle, ${this.userName}.`);
                    }
                }
            });
            
            // Permitir guardar con la tecla Enter
            nameInput.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') saveBtn.click();
            });
        }
    },

    updateDynamicContent: function() {
        const hour = new Date().getHours();
        let greeting = "Buenas noches";
        let cortesia = "Ritual del Ocaso (Post 7PM): Culmine con degustación de Té Orgánico de Frutos Rojos.";

        // Lógica de Tiempos
        if (hour >= 4 && hour < 12) {
            greeting = "Buenos días";
            cortesia = "Cortesía Matutina (9AM-12PM): 20% de privilegio corporativo en Masaje Deportivo.";
        } else if (hour >= 12 && hour < 19) {
            greeting = "Buenas tardes";
            cortesia = "Privilegio Corporativo: Análisis Postural y Biomecánico en cortesía.";
        }

        // 1. Reemplazamos el título principal con un saludo súper elegante
        const heroTitle = document.querySelector('.hero-view h1');
        if (heroTitle) {
            // Lo cambiamos de 'VALTARA' a 'Buenos días, [Nombre]' pero en tamaño elegante
            heroTitle.style.fontSize = '3.5rem';
            heroTitle.style.letterSpacing = '0.5rem';
            heroTitle.style.textTransform = 'none'; // Para que respete mayúsculas/minúsculas
            heroTitle.innerHTML = `${greeting}, <br><span style="color: var(--valtara-oro);">${this.userName}.</span>`;
        }

        // 2. Inyectamos la cortesía correspondiente a la hora
        const cortesiaDiv = document.getElementById('cortesia-dinamica');
        if (cortesiaDiv) {
            cortesiaDiv.innerHTML = `<i class="fa-solid fa-gem" style="font-size: 1.5rem;" aria-hidden="true"></i> ${cortesia}`;
        }
    }
};

// Iniciar Motor de Identidad
window.addEventListener('DOMContentLoaded', () => UserEngine.init());
