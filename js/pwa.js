/**
 * ====================================================================================
 * BLOQUE 9: PWA & CONCIERGE ENGINE V23.1 (DISEÑO BULLETPROOF)
 * Instalación de la App Nativa y Motor de Notificaciones Contextuales.
 * ====================================================================================
 */

const ConciergeEngine = {
    deferredPrompt: null,
    
    messages: {
        morning: [
            "Un nuevo día corporativo inicia. Tómate 2 minutos para calibrar tu postura antes de tu primera junta.",
            "El éxito exige enfoque. Escucha una Frecuencia Acústica antes de encender motores.",
            "Tu estructura es tu mayor activo. ¿Listo para conquistar la agenda de hoy?",
            "Alineación biomecánica requerida. Respira profundo antes de tu primer desafío.",
            "La claridad mental nace del cuerpo. Inicia tu jornada con 30 segundos de sonoterapia.",
            "Proyecta autoridad. Una postura libre de tensión es tu mejor presentación hoy."
        ],
        midday: [
            "Llevas horas frente al monitor. El Síndrome Text-Neck está comprimiendo tus cervicales. Haz una pausa.",
            "Tu cerebro necesita oxígeno. Escucha 30 segundos de sonoterapia para un reinicio rápido.",
            "Pausa estratégica. El estrés de la mañana se ha acumulado en tus trapecios.",
            "Alerta de fatiga visual y postural. Aléjate de la pantalla y estira tu zona lumbar.",
            "El pico de estrés ha llegado. Usa nuestro Triaje Biomecánico para liberar tensión.",
            "No dejes que el 'burnout' te alcance. Una micro-dosis botánica restaurará tu enfoque."
        ],
        evening: [
            "La jornada terminó, pero el estrés sigue en tu tejido conectivo. ¿Agendamos tu descompresión?",
            "Disuelve la adrenalina residual. Visita nuestro catálogo y prepárate para un descanso profundo.",
            "Apaga los motores cognitivos. Tu cuerpo exige una transición hacia el reposo.",
            "El desgaste de hoy no debe ser la fatiga de mañana. Revisa nuestras opciones de terapia.",
            "Hora de soltar la armadura. Entra al santuario para inducir ondas cerebrales lentas.",
            "Cierre de jornada corporativa. Mereces un resuello. Explora nuestras inmersiones acústicas."
        ]
    },

    init: function() {
        this.bindInstallPrompt();
        this.registerServiceWorker();
        
        setTimeout(() => {
            this.checkNotificationStatus();
        }, 5000);
    },

    bindInstallPrompt: function() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            const installBtn = document.getElementById('btn-install-app');
            if(installBtn) installBtn.style.display = 'flex';
        });

        const installBtn = document.getElementById('btn-install-app');
        if(installBtn) {
            installBtn.addEventListener('click', async () => {
                if (this.deferredPrompt) {
                    this.deferredPrompt.prompt();
                    const { outcome } = await this.deferredPrompt.userChoice;
                    if (outcome === 'accepted') {
                        installBtn.style.display = 'none';
                    }
                    this.deferredPrompt = null;
                }
            });
        }
    },

    registerServiceWorker: function() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js').then((reg) => {
                    this.evaluateTimeForNotification(reg);
                }).catch(err => console.error('Fallo en el blindaje SW:', err));
            });
        }
    },

    checkNotificationStatus: function() {
        if (!("Notification" in window)) return;
        if (Notification.permission === "default") {
            this.showElegantPermissionModal();
        }
    },

    showElegantPermissionModal: function() {
        if(document.getElementById('concierge-modal')) return;
        
        const div = document.createElement('div');
        div.id = 'concierge-modal';
        
        // CSS BULLETPROOF: Centrado exacto, elástico y con transición suave desde abajo
        div.style.cssText = "position: fixed; bottom: -150px; opacity: 0; left: 0; right: 0; margin: 0 auto; width: 90%; max-width: 420px; background: rgba(10, 10, 15, 0.98); border: 1px solid var(--valtara-oro); border-radius: 1.5rem; padding: 2rem; z-index: 999999; box-shadow: 0 2rem 5rem rgba(0,0,0,0.9); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); text-align: center; display: flex; flex-direction: column; align-items: center; transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);";
        
        div.innerHTML = `
            <i class="fa-solid fa-bell" style="color: var(--valtara-oro); font-size: 2.5rem; margin-bottom: 1rem;"></i>
            <h4 style="color: var(--valtara-blanco); font-family: var(--font-accent); font-size: 1.6rem; margin-bottom: 0.5rem;">Concierge Valtara</h4>
            <p style="color: var(--valtara-gris-texto); font-size: 1.1rem; margin-bottom: 1.8rem; line-height: 1.5;">¿Permites que nuestro sistema te envíe 3 recordatorios biomecánicos al día para cuidar de tu postura y nivel de estrés?</p>
            <div style="display: flex; gap: 1rem; justify-content: center; width: 100%; flex-wrap: wrap;">
                <button id="btn-deny-notif" style="background: rgba(255,255,255,0.05); border: 1px solid #ff5555; color: #ff5555; padding: 0.8rem 1.5rem; border-radius: 2rem; font-size: 1.1rem; cursor: pointer; flex: 1; min-width: 120px;">Ahora no</button>
                <button id="btn-allow-notif" style="background: var(--valtara-cian-brillante); border: none; color: var(--valtara-negro-fondo); padding: 0.8rem 1.5rem; border-radius: 2rem; font-size: 1.1rem; font-weight: 900; cursor: pointer; flex: 1; min-width: 120px; box-shadow: 0 0.5rem 1.5rem rgba(0,255,255,0.3);">Activar</button>
            </div>
        `;
        
        document.body.appendChild(div);

        // Dispara la animación de entrada
        setTimeout(() => {
            div.style.bottom = "20px";
            div.style.opacity = "1";
        }, 100);

        // Cierre suave si rechaza
        document.getElementById('btn-deny-notif').addEventListener('click', () => {
            div.style.bottom = "-150px";
            div.style.opacity = "0";
            setTimeout(() => div.remove(), 600);
        });

        // Cierre suave y petición si acepta
        document.getElementById('btn-allow-notif').addEventListener('click', () => {
            div.style.bottom = "-150px";
            div.style.opacity = "0";
            setTimeout(() => div.remove(), 600);
            
            Notification.requestPermission().then(permission => {
                if(permission === 'granted') {
                    navigator.serviceWorker.ready.then(reg => this.evaluateTimeForNotification(reg));
                }
            });
        });
    },

    evaluateTimeForNotification: function(swRegistration) {
        if (Notification.permission !== "granted") return;

        const hour = new Date().getHours();
        const dateString = new Date().toLocaleDateString();
        let slot = null;

        if (hour >= 7 && hour < 10) slot = 'morning';
        else if (hour >= 13 && hour < 16) slot = 'midday';
        else if (hour >= 19 && hour < 22) slot = 'evening';

        if (!slot) return; 

        const memoryKey = `valtara_notif_${dateString}_${slot}`;
        if (localStorage.getItem(memoryKey)) return; 

        const msgArray = this.messages[slot];
        const randomMsg = msgArray[Math.floor(Math.random() * msgArray.length)];

        swRegistration.showNotification('Valtara Executive Therapy', {
            body: randomMsg,
            icon: 'logo.png',
            badge: 'logo.png',
            vibrate: [200, 100, 200],
            data: { url: './index.html' }, 
            requireInteraction: false
        });

        localStorage.setItem(memoryKey, "sent");
    }
};

window.addEventListener('DOMContentLoaded', () => { ConciergeEngine.init(); });
