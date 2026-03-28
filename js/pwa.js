let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Evita que el navegador muestre el banner automático intrusivo
    e.preventDefault();
    deferredPrompt = e;
    
    // Encendemos nuestro botón elegante de "Instalar App Valtara" en el menú
    const installBtn = document.getElementById('btn-install-app');
    if(installBtn) {
        installBtn.style.display = 'flex';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const installBtn = document.getElementById('btn-install-app');
    if(installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                // Mostramos el aviso oficial del celular
                deferredPrompt.prompt();
                // Esperamos a que el paciente acepte
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    console.log('Paciente instaló la App Soberana Valtara');
                    installBtn.style.display = 'none'; // Escondemos el botón porque ya se instaló
                }
                deferredPrompt = null;
            }
        });
    }
});

// REGISTRO DEL GUARDIA DE SEGURIDAD (Service Worker corregido para GitHub Pages)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((registration) => {
            console.log('Escudo ServiceWorker activado con éxito.', registration.scope);
        }).catch((error) => {
            console.error('Fallo en el blindaje ServiceWorker:', error);
        });
    });
}
