/**
 * ====================================================================================
 * MÓDULO: SECCIÓN DE RETENCIÓN Y LEALTAD (Sustituye a "El Refugio del Arquitecto")
 * Versión: Sovereign OS V38.1
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraModulos.inicio_refugio = `
    <div style="max-width: 950px; margin: 2rem auto 6rem auto; padding: 0 2rem;">
        <article class="glass-card reveal" style="border-color: rgba(242, 201, 76, 0.4); background: linear-gradient(180deg, rgba(20,15,10,0.8) 0%, rgba(5,5,10,0.95) 100%); padding: 4rem 3rem; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 0 40px rgba(242, 201, 76, 0.05); border-radius: 24px; position: relative; overflow: hidden;">
            
            <div style="position: absolute; top: -50px; left: 50%; transform: translateX(-50%); width: 200px; height: 200px; background: radial-gradient(circle, rgba(242,201,76,0.15) 0%, transparent 70%); pointer-events: none;"></div>

            <div style="display: inline-block; padding: 12px 25px; background: rgba(242, 201, 76, 0.1); border: 1px solid var(--valtara-oro); border-radius: 50px; margin-bottom: 2.5rem; position: relative; z-index: 1;">
                <span style="color: var(--valtara-oro); font-weight: 900; letter-spacing: 2px; font-size: 0.85rem; text-transform: uppercase;"><i class="fa-solid fa-crown" style="margin-right: 8px;"></i> Beneficio Exclusivo</span>
            </div>
            
            <h3 style="font-family: var(--font-accent); font-size: 2.6rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-weight: 400; letter-spacing: 1px; position: relative; z-index: 1;">
                Comparta la Experiencia <span style="color: var(--valtara-oro);">Valtara</span>
            </h3>
            
            <p style="font-size: 1.25rem; color: var(--valtara-gris-texto); line-height: 1.8; margin-bottom: 3.5rem; font-weight: 300; max-width: 700px; margin-left: auto; margin-right: auto; position: relative; z-index: 1;">
                El bienestar ejecutivo se potencia cuando se comparte. Al agendar su <strong>segunda cita</strong> de restauración, incluimos una <strong style="color: white;">Chocolaterapia Facial de regalo</strong> para su acompañante. Dé a su persona favorita el detalle que merece.
            </p>
            
            <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; position: relative; z-index: 1;">
                <a href="https://wa.me/5213348572070?text=Hola,%20me%20gustaría%20agendar%20mi%20segunda%20cita%20y%20reclamar%20el%20beneficio%20de%20la%20Chocolaterapia%20de%20regalo." target="_blank" style="background: linear-gradient(135deg, #F2C94C, #F2994A); color: #050508; padding: 16px 35px; border-radius: 14px; font-weight: 900; text-decoration: none; font-size: 1.1rem; transition: transform 0.3s, box-shadow 0.3s; display: flex; align-items: center; gap: 12px; box-shadow: 0 10px 30px rgba(242,201,76,0.3);">
                    <i class="fa-brands fa-whatsapp" style="font-size: 1.3rem;"></i> Reservar y Reclamar
                </a>
                
                <button onclick="if(window.Router) { window.Router.navigate('restoration'); } else { document.getElementById('view-home').classList.remove('active'); document.getElementById('view-restoration').classList.add('active'); window.scrollTo(0,0); }" style="background: rgba(255,255,255,0.03); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 16px 35px; border-radius: 14px; font-weight: bold; cursor: pointer; font-size: 1.1rem; transition: background 0.3s, transform 0.3s; display: flex; align-items: center; gap: 12px;" onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='translateY(-3px)';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.transform='translateY(0)';">
                    <i class="fa-solid fa-book-open"></i> Explorar Terapias
                </button>
            </div>

        </article>
    </div>
`;
