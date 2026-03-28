/**
 * ====================================================================================
 * BLOQUE 9: PWA & CONCIERGE ENGINE V23.0
 * Instalación de la App Nativa y Motor de Notificaciones Contextuales.
 * ====================================================================================
 */

const ConciergeEngine = {
    deferredPrompt: null,
    
    // Las 18 Variaciones de Mensajes
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
        
        // Retrasamos la solicitud de notificaciones 5 segundos para no ser invasivos
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
                    console.log('Escudo ServiceWorker V24 activo.', reg.scope);
                    // Comprobamos si debemos lanzar un mensaje ahora mismo
                    this.evaluateTimeForNotification(reg);
                }).catch(err => console.error('Fallo en el blindaje SW:', err));
            });
        }
    },

    // ==========================================
    // LÓGICA DE NOTIFICACIONES
    // ==========================================
    checkNotificationStatus: function() {
        if (!("Notification" in window)) return;
        
        if (Notification.permission === "default") {
            this.showElegantPermissionModal();
        }
    },

    showElegantPermissionModal: function() {
        // No mostramos el feo cuadro del navegador, creamos uno de ultra-lujo primero
        if(document.getElementById('concierge-modal')) return;
        
        const div = document.createElement('div');
        div.id = 'concierge-modal';
        div.style.cssText = "position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 400px; background: rgba(5,5,10,0.95); border: 1px solid var(--valtara-oro); border-radius: 15px; padding: 20px; z-index: 99999; box-shadow: 0 10px 30px rgba(0,0,0,0.8); backdrop-filter: blur(20px); text-align: center; animation: slideInMsg 0.5s ease forwards;";
        
        div.innerHTML = `
            <i class="fa-solid fa-bell" style="color: var(--valtara-oro); font-size: 2rem; margin-bottom: 15px;"></i>
            <h4 style="color: white; font-family: var(--font-accent); font-size: 1.4rem; margin-bottom: 10px;">Concierge Valtara</h4>
            <p style="color: #aaa; font-size: 1rem; margin-bottom: 20px;">¿Permites que nuestro sistema te envíe 3 recordatorios biomecánicos al día para cuidar de tu postura y nivel de estrés?</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="btn-deny-notif" style="background: transparent; border: 1px solid #ff5555; color: #ff5555; padding: 10px 20px; border-radius: 20px; cursor: pointer;">Ahora no</button>
                <button id="btn-allow-notif" style="background: var(--valtara-cian-brillante); border: none; color: black; padding: 10px 20px; border-radius: 20px; font-weight: bold; cursor: pointer; box-shadow: 0 5px 15px rgba(0,255,255,0.3);">Activar</button>
            </div>
        `;
        
        document.body.appendChild(div);

        document.getElementById('btn-deny-notif').addEventListener('click', () => div.remove());
        document.getElementById('btn-allow-notif').addEventListener('click', () => {
            div.remove();
            // AHORA SÍ, pedimos el permiso real al navegador
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

        if (!slot) return; // No estamos en horario de notificaciones

        // Verificamos si ya le enviamos la de este horario el día de hoy
        const memoryKey = `valtara_notif_${dateString}_${slot}`;
        if (localStorage.getItem(memoryKey)) return; // Ya se envió

        // Elegimos un mensaje al azar de ese horario
        const msgArray = this.messages[slot];
        const randomMsg = msgArray[Math.floor(Math.random() * msgArray.length)];

        // Mostramos la Notificación Nativa del Celular
        swRegistration.showNotification('Valtara Executive Therapy', {
            body: randomMsg,
            icon: 'logo.png', // El icono de tu app
            badge: 'logo.png',
            vibrate: [200, 100, 200],
            data: { url: './index.html' }, // A donde lo lleva al hacer clic
            requireInteraction: false
        });

        // Guardamos en memoria para no spamearlo el resto del turno
        localStorage.setItem(memoryKey, "sent");
    }
};

window.addEventListener('DOMContentLoaded', () => { ConciergeEngine.init(); });
