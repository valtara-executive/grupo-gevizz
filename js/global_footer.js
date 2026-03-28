window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraModulos.global_footer = `
    <style>
        .footer-action-btn {
            display: flex; align-items: center; justify-content: center; gap: 12px;
            padding: 1.2rem; border-radius: 15px; text-decoration: none; font-size: 1.15rem;
            font-weight: bold; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); width: 100%;
        }
        .btn-maps { background: rgba(0, 255, 255, 0.05); border: 1px solid var(--valtara-cian-brillante); color: var(--valtara-cian-brillante); }
        .btn-maps:hover { background: var(--valtara-cian-brillante); color: var(--valtara-negro-fondo); box-shadow: 0 5px 25px rgba(0,255,255,0.4); transform: translateY(-3px); }
        
        .btn-phone { background: linear-gradient(135deg, var(--valtara-verde-menta), #00cc88); color: var(--valtara-negro-fondo); box-shadow: 0 10px 20px rgba(0,255,170,0.2); }
        .btn-phone:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,255,170,0.5); }
        
        .btn-email { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: var(--valtara-blanco); }
        .btn-email:hover { background: var(--valtara-blanco); color: var(--valtara-negro-fondo); transform: translateY(-3px); box-shadow: 0 5px 20px rgba(255,255,255,0.2); }
        
        .btn-ws-footer { background: rgba(37, 211, 102, 0.1); border: 1px solid var(--valtara-whatsapp); color: var(--valtara-blanco); }
        .btn-ws-footer:hover { background: var(--valtara-whatsapp); color: var(--valtara-negro-fondo); transform: translateY(-3px); box-shadow: 0 5px 25px rgba(37, 211, 102, 0.4); }

        .btn-back-top {
            background: rgba(242, 201, 76, 0.1); border: 1px solid var(--valtara-oro); color: var(--valtara-oro);
            width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-size: 1.5rem; cursor: pointer; transition: 0.3s; margin: 3rem auto 0 auto; outline: none;
        }
        .btn-back-top:hover { background: var(--valtara-oro); color: var(--valtara-negro-fondo); transform: translateY(-8px); box-shadow: 0 10px 30px rgba(242,201,76,0.5); }
    </style>

    <div style="border-top: 1px solid rgba(242, 201, 76, 0.2); margin-bottom: 5rem; padding-top: 5rem; text-align: center;">
        <img src="logo.png" alt="Logotipo oficial de Valtara, hoja dorada de ultra lujo." style="width: 110px; height: auto; margin-bottom: 1.5rem; filter: drop-shadow(0 0 25px rgba(242, 201, 76, 0.4));">
        <h3 style="font-family: var(--font-accent); font-size: 3.5rem; color: var(--valtara-oro); letter-spacing: 0.4rem; margin: 0; text-transform: uppercase;">VALTARA</h3>
        <p style="color: var(--valtara-gris-texto); font-size: 1.2rem; letter-spacing: 0.5rem; text-transform: uppercase; margin-top: 0.5rem; font-weight: 300;">By Grupo Gevizz</p>
        <p style="color: var(--valtara-blanco); font-size: 1.4rem; margin-top: 2rem; font-family: var(--font-accent); font-style: italic;">"El éxito corporativo exige un vehículo biológico inquebrantable."</p>
    </div>

    <div class="footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 4rem; max-width: 1200px; margin: 0 auto; color: var(--valtara-gris-texto); line-height: 2;">
        
        <div class="footer-col">
            <h4 style="font-size: 1.6rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-weight: bold; border-bottom: 2px solid var(--valtara-cian-brillante); padding-bottom: 0.5rem; display: inline-block;">Nuestra Filosofía</h4>
            <p style="font-style: italic; color: var(--valtara-oro-suave); font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: bold; line-height: 1.6;">
                "La cúspide del bienestar biomecánico y la recuperación ejecutiva."
            </p>
            <p style="font-weight: 300; font-size: 1.1rem; text-align: justify;">
                Diseñamos el ecosistema perfecto donde la tecnología de vanguardia abraza la naturaleza humana. Valtara es un santuario diseñado para decodificar el estrés corporativo y optimizar tu vehículo biológico al más alto nivel.
            </p>
        </div>
        
        <div class="footer-col">
            <h4 style="font-size: 1.6rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-weight: bold; border-bottom: 2px solid var(--valtara-verde-menta); padding-bottom: 0.5rem; display: inline-block;">Logística y Contacto</h4>
            <p style="font-size: 1.1rem; color: var(--valtara-gris-texto); margin-bottom: 2rem; line-height: 1.6;">
                <i class="fa-solid fa-map-location-dot" style="color: var(--valtara-verde-menta); margin-right: 10px; font-size: 1.2rem;"></i> Av. Paseo de la Reforma 195, Piso 3.<br>Colonia Cuauhtémoc, CDMX. C.P. 06500
            </p>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <a href="https://maps.app.goo.gl/RkpgEZorn5V1vrGy5" target="_blank" aria-label="Abrir ubicación en Google Maps" class="footer-action-btn btn-maps">
                    <i class="fa-solid fa-location-arrow"></i> Ver en Google Maps
                </a>
                <a href="tel:+523348572070" aria-label="Llamar al número 33 4857 2070" class="footer-action-btn btn-phone">
                    <i class="fa-solid fa-phone"></i> Llamada Ejecutiva
                </a>
                <a href="https://wa.me/5213348572070" target="_blank" aria-label="Abrir chat de WhatsApp" class="footer-action-btn btn-ws-footer">
                    <i class="fa-brands fa-whatsapp" style="font-size: 1.4rem;"></i> Concierge WhatsApp
                </a>
                <a href="mailto:clientes.valtara@gmail.com" aria-label="Enviar correo electrónico a clientes.valtara@gmail.com" class="footer-action-btn btn-email">
                    <i class="fa-solid fa-envelope"></i> Enviar Correo
                </a>
            </div>
        </div>

        <div class="footer-col">
            <h4 style="font-size: 1.6rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-weight: bold; border-bottom: 2px solid var(--valtara-morado-vivo); padding-bottom: 0.5rem; display: inline-block;">Plataforma y Avales</h4>
            <p style="font-size: 1.1rem; font-weight: 300; margin-bottom: 1.2rem;">
                <strong style="color: var(--valtara-morado-vivo); font-size: 1.2rem; letter-spacing: 1px;">SOVEREIGN OS V25.0</strong><br>
                Arquitectura de Aplicación Nativa (PWA), Inteligencia Artificial Cognitiva y Diseño UX construidos de forma propietaria e *In-House* por la Dirección Tecnológica de Grupo Gevizz S.A.S.
            </p>
            <p style="font-size: 1.05rem; font-weight: bold; display: flex; align-items: center; gap: 10px; color: var(--valtara-cian-brillante); background: rgba(0,255,255,0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(0,255,255,0.1);">
                <i class="fa-solid fa-universal-access"></i> Certificación de Accesibilidad Activa.
            </p>
            <p style="margin-top: 1.5rem; font-size: 0.95rem; font-style: italic; color: #777; border-left: 3px solid var(--valtara-oro); padding-left: 15px;">
                * Atención clínica presencial estrictamente bajo valoración y reservación previa confirmada.
            </p>
        </div>
    </div>

    <div style="border-top: 1px solid rgba(255,255,255,0.08); margin-top: 6rem; padding-top: 3.5rem; padding-bottom: 8rem; text-align: center; color: #666; font-size: 1.1rem; letter-spacing: 0.1rem; font-weight: 300; display: flex; flex-direction: column; gap: 1.5rem; position: relative;">
        
        <span style="font-weight: bold; color: #888;">© 2026 GRUPO GEVIZZ S.A.S. TODOS LOS DERECHOS EMPRESARIALES E INTELECTUALES RESERVADOS.</span>
        
        <span style="font-size: 0.95rem; opacity: 0.7; max-width: 900px; margin: 0 auto; line-height: 1.8;">
            Queda estrictamente prohibida, protegida y penada por las leyes de propiedad intelectual la replicación, extracción o distribución parcial o total del código fuente, arquitectura de Inteligencia Artificial, identidad gráfica o modelo logístico de esta plataforma soberana.
        </span>

        <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="btn-back-top" aria-label="Volver al inicio de la página">
            <i class="fa-solid fa-chevron-up"></i>
        </button>

    </div>
`;
