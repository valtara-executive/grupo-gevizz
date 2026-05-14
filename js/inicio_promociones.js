/**
 * ====================================================================================
 * MÓDULO: INICIO PROMOCIONES (Campaña 2026)
 * Arquitectura SPA - V42.0 (Ultra-Lujo, Accesibilidad y Delegación de Eventos)
 * ====================================================================================
 */

// 1. BLINDAJE DEL OBJETO GLOBAL
window.ValtaraModulos = window.ValtaraModulos || {};

// 2. INYECCIÓN DEL HTML AL CONSTRUCTOR MAESTRO
window.ValtaraModulos.inicio_promociones = `
    <section id="promo-section" class="promo-container" style="padding: 6rem 1.5rem; background: linear-gradient(180deg, #070712 0%, #0a0a14 100%); position: relative; overflow: hidden;">
        
        <div style="position: absolute; top: -50px; right: -50px; width: 250px; height: 250px; background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%); filter: blur(40px); pointer-events: none;"></div>
        <div style="position: absolute; bottom: -50px; left: -50px; width: 250px; height: 250px; background: radial-gradient(circle, rgba(0,255,204,0.05) 0%, transparent 70%); filter: blur(40px); pointer-events: none;"></div>

        <div style="max-width: 1100px; margin: 0 auto; position: relative; z-index: 2;">
            <div style="text-align: center; margin-bottom: 4rem;">
                <span style="color: var(--valtara-oro); font-size: 0.95rem; letter-spacing: 4px; text-transform: uppercase; font-weight: 900;"><i class="fa-solid fa-crown" aria-hidden="true"></i> Privilegios Ejecutivos</span>
                <h2 style="font-size: 3rem; font-family: var(--font-accent); color: #fff; margin: 1rem 0;">Campaña de Restauración</h2>
                <p style="color: #aaa; font-size: 1.15rem; max-width: 600px; margin: 0 auto; line-height: 1.6;">Inversiones exclusivas diseñadas para disolver el burnout y elevar su presencia corporativa.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem;">
                
                <article class="glass-card promo-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(212,175,55,0.2); border-radius: 20px; padding: 3rem 2.5rem; position: relative; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <div style="position: absolute; top: -16px; left: 25px; background: linear-gradient(135deg, #D4AF37, #AA8529); color: #000; padding: 0.5rem 1.8rem; border-radius: 20px; font-weight: 900; font-size: 0.85rem; letter-spacing: 1px; box-shadow: 0 5px 15px rgba(212,175,55,0.4);">CÓDIGO: 2026 CONTIGO</div>
                    <i class="fa-solid fa-hands-holding-circle" style="font-size: 3.5rem; color: #D4AF37; margin-bottom: 1.5rem;" aria-hidden="true"></i>
                    <h3 style="color: white; font-family: var(--font-accent); font-size: 2rem; margin-bottom: 1rem;">Descompresión Lomi Lomi</h3>
                    <p style="color: #ccc; font-size: 1.05rem; margin-bottom: 2rem; line-height: 1.6;">Liberación fascial profunda. El protocolo ideal para neutralizar el estrés crónico y la tensión lumbar.</p>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem;">
                        <div>
                            <span class="sr-only">Precio original:</span>
                            <span style="text-decoration: line-through; color: #666; font-size: 0.95rem;">$1,500 MXN</span><br>
                            <span class="sr-only">Precio de promoción:</span>
                            <span style="color: #D4AF37; font-size: 2.2rem; font-weight: 900; line-height: 1;">$1,200 <small style="font-size:0.9rem; font-weight: 600;">MXN</small></span>
                        </div>
                        <button class="promo-action-btn" data-target="restoration" aria-label="Reservar Descompresión Lomi Lomi" style="background: rgba(212,175,55,0.1); color: #D4AF37; border: 1px solid #D4AF37; padding: 0.8rem 1.8rem; border-radius: 30px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: 0.3s;"><i class="fa-solid fa-calendar-check" aria-hidden="true"></i> Reservar</button>
                    </div>
                </article>

                <article class="glass-card promo-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(224,26,89,0.2); border-radius: 20px; padding: 3rem 2.5rem; position: relative; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <div style="position: absolute; top: -16px; left: 25px; background: linear-gradient(135deg, #E01A59, #B01040); color: #fff; padding: 0.5rem 1.8rem; border-radius: 20px; font-weight: 900; font-size: 0.85rem; letter-spacing: 1px; box-shadow: 0 5px 15px rgba(224,26,89,0.4);">TENDENCIA</div>
                    <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 3.5rem; color: #E01A59; margin-bottom: 1.5rem;" aria-hidden="true"></i>
                    <h3 style="color: white; font-family: var(--font-accent); font-size: 2rem; margin-bottom: 1rem;">Sistema Rubber Base</h3>
                    <p style="color: #ccc; font-size: 1.05rem; margin-bottom: 2rem; line-height: 1.6;">Nivelación estructural con asepsia clínica. Garantiza una presentación impecable en sus reuniones.</p>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem;">
                        <div>
                            <span class="sr-only">Precio original:</span>
                            <span style="text-decoration: line-through; color: #666; font-size: 0.95rem;">$1,100 MXN</span><br>
                            <span class="sr-only">Precio de promoción:</span>
                            <span style="color: #E01A59; font-size: 2.2rem; font-weight: 900; line-height: 1;">$850 <small style="font-size:0.9rem; font-weight: 600;">MXN</small></span>
                        </div>
                        <button class="promo-action-btn" data-target="beauty" aria-label="Reservar Sistema Rubber Base" style="background: rgba(224,26,89,0.1); color: #E01A59; border: 1px solid #E01A59; padding: 0.8rem 1.8rem; border-radius: 30px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: 0.3s;"><i class="fa-solid fa-calendar-check" aria-hidden="true"></i> Reservar</button>
                    </div>
                </article>

            </div>
        </div>
    </section>
`;

// 3. MOTOR LÓGICO Y SENSORIAL (Delegación de Eventos)
window.ValtaraPromocionesEngine = {
    init: function() {
        console.log("💎 [PROMO ENGINE V42] Módulo de campañas inicializado y anclado.");
        this.bindDelegatedEvents();
    },

    bindDelegatedEvents: function() {
        // Escuchamos los clics a nivel global para que no importe cuándo se renderizó el HTML
        document.body.addEventListener('click', (e) => {
            const btn = e.target.closest('.promo-action-btn');
            if (btn) {
                // Interacción Sensorial (Si el motor de sonido/vibración de Aura está activo)
                if(window.AuraSensory && typeof window.AuraSensory.playSend === 'function') {
                    window.AuraSensory.playSend();
                } else if (navigator.vibrate) {
                    navigator.vibrate(15); // Fallback háptico
                }

                // Navegación conectada al Enrutador Central (Router)
                const target = btn.getAttribute('data-target');
                if (target && window.Router && typeof window.Router.navigate === 'function') {
                    window.Router.navigate(target);
                }
            }
        });
        
        // Animaciones 3D sutiles (Delegadas para eficiencia)
        document.body.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.promo-card');
            if(card) {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.8)';
            }
        });
        
        document.body.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.promo-card');
            if(card) {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            }
        });
    }
};

// 4. AUTO-ARRANQUE A PRUEBA DE FALLOS
// Esperamos una fracción de segundo para asegurar que el constructor maestro haya hecho su trabajo.
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.ValtaraPromocionesEngine.init();
    }, 400); 
});
