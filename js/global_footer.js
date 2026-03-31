/**
 * ====================================================================================
 * MÓDULO: GLOBAL FOOTER (EL MANIFIESTO VALTARA)
 * Versión: Sovereign OS V38.0
 * Descripción: Cierre monumental, Muro de Certificaciones Explicadas, Botón de 
 * Expediente Seguro, y Aviso Legal Blindado de Grupo Gevizz S.A.S.
 * ====================================================================================
 */

window.ValtaraModulos = window.ValtaraModulos || {};
window.ValtaraModulos.global_footer = `
    <style>
        /* ===================================================================== */
        /* DINÁMICAS DE ANIMACIÓN Y COLORIMETRÍA DE ULTRA-LUJO                   */
        /* ===================================================================== */
        .footer-action-btn {
            display: flex; align-items: center; justify-content: center; gap: 15px;
            padding: 1.4rem; border-radius: 16px; text-decoration: none; font-size: 1.15rem;
            font-weight: 900; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); width: 100%;
            position: relative; overflow: hidden; z-index: 1; letter-spacing: 0.5px;
        }
        
        .btn-maps { background: rgba(0, 255, 255, 0.05); border: 1px solid rgba(0,255,255,0.4); color: var(--valtara-cian-brillante); box-shadow: inset 0 0 15px rgba(0,255,255,0.05); }
        .btn-maps:hover { background: var(--valtara-cian-brillante); color: var(--valtara-negro-fondo); box-shadow: 0 10px 30px rgba(0,255,255,0.4); transform: translateY(-5px); }
        
        .btn-phone { background: linear-gradient(135deg, #00b09b, #00cc88); color: var(--valtara-negro-fondo); box-shadow: 0 10px 25px rgba(0,255,170,0.2); border: none;}
        .btn-phone:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,255,170,0.5); }
        
        .btn-email { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.2); color: var(--valtara-blanco); }
        .btn-email:hover { background: var(--valtara-blanco); color: var(--valtara-negro-fondo); transform: translateY(-5px); box-shadow: 0 10px 30px rgba(255,255,255,0.2); }
        
        .btn-ws-footer { background: rgba(37, 211, 102, 0.08); border: 1px solid rgba(37, 211, 102, 0.5); color: var(--valtara-blanco); }
        .btn-ws-footer:hover { background: var(--valtara-whatsapp); color: var(--valtara-negro-fondo); transform: translateY(-5px); box-shadow: 0 10px 35px rgba(37, 211, 102, 0.4); border-color: transparent;}

        .btn-back-top {
            background: rgba(242, 201, 76, 0.05); border: 2px solid var(--valtara-oro); color: var(--valtara-oro);
            width: 75px; height: 75px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-size: 2rem; cursor: pointer; transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); margin: 4rem auto 0 auto; outline: none;
            box-shadow: 0 0 25px rgba(242,201,76,0.15); position: relative; z-index: 10;
        }
        .btn-back-top:hover { background: var(--valtara-oro); color: var(--valtara-negro-fondo); transform: translateY(-12px); box-shadow: 0 20px 50px rgba(242,201,76,0.5); }

        /* ===================================================================== */
        /* BANNER PROMOCIONAL DEL EXPEDIENTE SOBERANO                            */
        /* ===================================================================== */
        .footer-expediente-promo {
            background: linear-gradient(145deg, rgba(20,20,25,0.98), rgba(10,10,15,0.98));
            border: 1px solid rgba(242,201,76,0.3); border-radius: 30px; padding: 50px 30px;
            max-width: 1100px; margin: 0 auto 6rem auto; text-align: center;
            box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(242,201,76,0.05);
            position: relative; overflow: hidden;
        }
        .footer-expediente-promo::before {
            content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(242,201,76,0.08) 0%, transparent 50%);
            z-index: 0; pointer-events: none; animation: pulseGlow 8s infinite alternate;
        }
        .btn-expediente-mega {
            background: linear-gradient(135deg, #F2C94C, #F2994A); color: #050508;
            padding: 20px 45px; border-radius: 18px; font-weight: 900; font-size: 1.3rem;
            text-transform: uppercase; letter-spacing: 2px; border: none; cursor: pointer;
            transition: 0.4s; display: inline-flex; align-items: center; gap: 18px;
            box-shadow: 0 15px 40px rgba(242,201,76,0.3); position: relative; z-index: 1;
        }
        .btn-expediente-mega:hover { transform: translateY(-6px); box-shadow: 0 25px 50px rgba(242,201,76,0.6); }

        /* ===================================================================== */
        /* TARJETAS DE CERTIFICACIÓN EXPLICADAS                                  */
        /* ===================================================================== */
        .cert-card-detailed {
            background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px; padding: 20px; text-align: left; transition: 0.3s;
            display: flex; flex-direction: column; gap: 10px;
        }
        .cert-card-detailed:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.2); transform: translateY(-3px); }
        .cert-icon-title { display: flex; align-items: center; gap: 12px; font-size: 1.1rem; font-weight: 900; color: #fff; }
        .cert-desc { font-size: 0.95rem; color: #aaa; line-height: 1.6; margin: 0; font-weight: 300; }

        @keyframes pulseGlow { 0% { opacity: 0.5; } 100% { opacity: 1; } }
    </style>

    <div style="border-top: 1px solid rgba(242, 201, 76, 0.2); margin-bottom: 6rem; padding-top: 7rem; text-align: center; position: relative;">
        <img src="logo.png" alt="Logotipo Oficial de Valtara." aria-hidden="true" style="width: 140px; height: auto; margin-bottom: 2rem; filter: drop-shadow(0 0 40px rgba(242, 201, 76, 0.4));">
        
        <h3 aria-label="Valtara by Grupo Gevizz" style="font-family: var(--font-accent); font-size: 4.5rem; color: var(--valtara-oro); letter-spacing: 0.6rem; margin: 0; text-transform: uppercase; text-shadow: 0 10px 30px rgba(242,201,76,0.2);">VALTARA</h3>
        <p style="color: #bbb; font-size: 1.4rem; letter-spacing: 0.8rem; text-transform: uppercase; margin-top: 1rem; font-weight: 900;">By Grupo Gevizz</p>
        
        <div style="max-width: 900px; margin: 3.5rem auto 0 auto; padding: 0 20px;">
            <p style="color: var(--valtara-blanco); font-size: 1.7rem; font-family: var(--font-accent); font-style: italic; font-weight: 400; line-height: 1.6; margin-bottom: 1.5rem; text-shadow: 0 2px 10px rgba(255,255,255,0.1);">
                "Comenzó como un trazo en papel, un boceto de un santuario. Hoy, es un rascacielos tecnológico imparable."
            </p>
            <p style="color: var(--valtara-gris-texto); font-size: 1.15rem; font-weight: 300; line-height: 1.8; text-align: justify; text-align-last: center;">
                En Valtara demostramos que la frialdad del código puede tener alma. No somos solo un centro de recuperación biomecánica; somos una firma de tecnología enfocada en el cuerpo humano. <strong>Más que innovación, es empatía digital.</strong> Un ecosistema construido línea a línea para comprenderte, proteger tus datos y restaurar tu bienestar ejecutivo al más alto nivel.
            </p>
        </div>
    </div>

    <div class="footer-expediente-promo">
        <i class="fa-solid fa-laptop-medical" aria-hidden="true" style="font-size: 4.5rem; color: var(--valtara-cian-brillante); margin-bottom: 25px; filter: drop-shadow(0 0 25px rgba(0,255,255,0.4)); position: relative; z-index: 1;"></i>
        <h4 style="color: white; font-family: var(--font-accent); font-size: 2.8rem; margin-top: 0; margin-bottom: 15px; position: relative; z-index: 1; letter-spacing: 1px;">Tu Dossier Biomecánico</h4>
        <p style="color: #ccc; font-size: 1.25rem; line-height: 1.7; max-width: 800px; margin: 0 auto 35px auto; font-weight: 300; position: relative; z-index: 1;">
            Privacidad matemática de extremo a extremo. Gestiona tu perfil, documenta tus avances con nuestro escáner vectorial y genera tu PDF oficial en Modo Oscuro directamente desde la bóveda de tu dispositivo. Sin intermediarios.
        </p>
        
        <button class="btn-expediente-mega" onclick="if(window.ExpedienteEngine && typeof window.ExpedienteEngine.openOverlay === 'function') { window.ExpedienteEngine.openOverlay(); } else { document.getElementById('main-nav').classList.add('open'); }" aria-label="Abrir plataforma de historia clínica">
            <i class="fa-solid fa-fingerprint" aria-hidden="true"></i> Consultar Mi Expediente
        </button>
    </div>

    <div class="footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 5rem; max-width: 1400px; margin: 0 auto; padding: 0 30px;">
        
        <div class="footer-col">
            <h4 style="font-size: 1.8rem; color: var(--valtara-blanco); margin-bottom: 2rem; font-weight: 900; border-bottom: 3px solid var(--valtara-verde-menta); padding-bottom: 0.8rem; display: inline-block;">Santuario Físico</h4>
            
            <div style="background: rgba(255,255,255,0.02); padding: 25px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 2.5rem;">
                <p style="font-size: 1.2rem; color: #eee; margin-bottom: 0; line-height: 1.6; display: flex; align-items: flex-start; gap: 15px;">
                    <i class="fa-solid fa-building-shield" style="color: var(--valtara-verde-menta); font-size: 1.6rem; margin-top: 5px;"></i> 
                    <span>
                        <strong style="color: white; font-size: 1.3rem;">Paseo de la Reforma 195</strong><br>
                        <span style="color: #aaa; font-weight: 300; font-size: 1.1rem;">Piso 3, Colonia Cuauhtémoc.<br>CDMX. Código Postal 06500</span>
                    </span>
                </p>
            </div>

            <h4 style="font-size: 1.8rem; color: var(--valtara-blanco); margin-bottom: 1.5rem; font-weight: 900; border-bottom: 3px solid #9b51e0; padding-bottom: 0.8rem; display: inline-block;">Conexión Segura</h4>
            <div style="display: flex; flex-direction: column; gap: 1.2rem;">
                <a href="https://maps.app.goo.gl/RkpgEZorn5V1vrGy5" target="_blank" aria-label="Navegar en Google Maps" class="footer-action-btn btn-maps">
                    <i class="fa-solid fa-location-arrow" aria-hidden="true"></i> Iniciar Navegación
                </a>
                <a href="tel:+523348572070" aria-label="Llamar al Concierge 33 4857 2070" class="footer-action-btn btn-phone">
                    <i class="fa-solid fa-phone" aria-hidden="true"></i> Línea Ejecutiva
                </a>
                <a href="https://wa.me/5213348572070" target="_blank" aria-label="Abrir canal de WhatsApp seguro" class="footer-action-btn btn-ws-footer">
                    <i class="fa-brands fa-whatsapp" aria-hidden="true" style="font-size: 1.5rem;"></i> WhatsApp Cifrado
                </a>
                <a href="mailto:clientes.valtara@gmail.com" aria-label="Redactar correo a clientes.valtara@gmail.com" class="footer-action-btn btn-email">
                    <i class="fa-solid fa-envelope-open-text" aria-hidden="true"></i> Correo Electrónico
                </a>
            </div>
        </div>

        <div class="footer-col" style="grid-column: span 2;">
            <h4 style="font-size: 1.8rem; color: var(--valtara-blanco); margin-bottom: 2rem; font-weight: 900; border-bottom: 3px solid var(--valtara-oro); padding-bottom: 0.8rem; display: inline-block;">Ingeniería de la Plataforma</h4>
            
            <div style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), transparent); border: 1px solid rgba(212, 175, 55, 0.4); padding: 30px; border-radius: 20px; margin-bottom: 30px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -20px; right: -20px; opacity: 0.05; transform: scale(3); pointer-events: none;">
                    <i class="fa-solid fa-microchip"></i>
                </div>
                <strong style="color: var(--valtara-oro); font-size: 1.6rem; letter-spacing: 3px; font-family: var(--font-accent); display:block; margin-bottom:15px; position: relative; z-index: 1;">SOVEREIGN OS V38.0</strong>
                <p style="font-size: 1.1rem; font-weight: 300; color: #ddd; margin:0; line-height:1.7; position: relative; z-index: 1; text-align: justify;">
                    Un ecosistema digital programado desde cero. Integramos una Arquitectura de Aplicación Nativa (PWA), motores de Inteligencia Artificial Cognitiva, renderizado vectorial matemático (jsPDF) y normativas mundiales de Diseño UX/UI, construidos de forma propietaria e <em>In-House</em> por la Dirección Tecnológica de Grupo Gevizz S.A.S.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                
                <div class="cert-card-detailed">
                    <div class="cert-icon-title">
                        <i class="fa-solid fa-universal-access" style="color: var(--valtara-cian-brillante);"></i>
                        <span>A11y WCAG 2.1 & ARIA</span>
                    </div>
                    <p class="cert-desc">Garantizamos una experiencia sin barreras. Programación semántica avanzada para lectores de pantalla, alto contraste y modos de firma inclusivos.</p>
                </div>

                <div class="cert-card-detailed">
                    <div class="cert-icon-title">
                        <i class="fa-solid fa-shield-halved" style="color: var(--valtara-verde-menta);"></i>
                        <span>Cifrado SHA-256</span>
                    </div>
                    <p class="cert-desc">Aplicamos un hash criptográfico temporal a cada expediente generado. La información médica nunca abandona la memoria física de su dispositivo móvil.</p>
                </div>

                <div class="cert-card-detailed">
                    <div class="cert-icon-title">
                        <i class="fa-solid fa-file-contract" style="color: #ff5555;"></i>
                        <span>Cumplimiento Ley ARCO</span>
                    </div>
                    <p class="cert-desc">Manejo de datos sensibles alineado a la NOM-004-SSA3-2012 y la Ley Federal de Protección de Datos en Posesión de Particulares de México.</p>
                </div>

                <div class="cert-card-detailed">
                    <div class="cert-icon-title">
                        <i class="fa-solid fa-user-doctor" style="color: var(--valtara-oro);"></i>
                        <span>Aval Institucional</span>
                    </div>
                    <p class="cert-desc">Terapeuta Titular certificado ante la S.E.P. (RVOE 17FT061), RENATED (A-54878) y evaluado bajo la Norma de Competencia Laboral (NTCL).</p>
                </div>

            </div>
            
            <div style="margin-top: 30px; font-size: 1.05rem; font-style: italic; color: #888; border-left: 4px solid var(--valtara-oro); padding-left: 20px; background: rgba(255,255,255,0.02); padding-top: 15px; padding-bottom: 15px; border-radius: 0 10px 10px 0;">
                <i class="fa-solid fa-circle-exclamation" style="color: var(--valtara-oro); margin-right: 10px;"></i>
                Atención clínica presencial estrictamente bajo valoración y reservación previa confirmada.
            </div>

        </div>
    </div>

    <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 7rem; padding-top: 5rem; padding-bottom: 8rem; text-align: center; display: flex; flex-direction: column; gap: 2.5rem; position: relative; background: linear-gradient(0deg, rgba(5,5,10,1) 0%, transparent 100%);">
        
        <h2 style="font-weight: 900; color: #fff; font-size: 1.4rem; letter-spacing: 3px; margin: 0; font-family: var(--font-accent);">
            © 2026 GRUPO GEVIZZ S.A.S.
        </h2>
        <h3 style="font-weight: bold; color: var(--valtara-oro); font-size: 1.1rem; letter-spacing: 2px; margin: -15px 0 0 0; text-transform: uppercase;">
            Todos los Derechos Empresariales e Intelectuales Reservados.
        </h3>
        
        <div style="max-width: 1100px; margin: 0 auto; background: rgba(0,0,0,0.6); padding: 35px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <p style="font-size: 1.1rem; color: #ccc; line-height: 1.8; margin: 0; font-weight: 300; text-align: justify; text-align-last: center;">
                <strong style="color: white;">PROPIEDAD CÓDIGO FUENTE:</strong> Queda terminantemente prohibida, protegida y severamente penada por las leyes internacionales y nacionales de propiedad intelectual la replicación, clonación, ingeniería inversa, extracción o distribución (parcial o total) del código fuente, la arquitectura de Inteligencia Artificial, los motores de renderizado PDF matemático, la topografía SVG, la identidad gráfica, la paleta cromática o el modelo logístico de esta plataforma soberana. Cualquier intento de vulneración será auditado y procesado legalmente.
            </p>
        </div>

        <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="btn-back-top" aria-label="Desplazar la pantalla hasta el inicio de la página">
            <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>
        </button>

        <div style="margin-top: 4rem; opacity: 0.3; transition: opacity 0.5s; cursor: default;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.3">
            <p style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 0.95rem; color: #888; max-width: 600px; margin: 0 auto; line-height: 1.6;">
                Para ti, que has llegado hasta el final de este abismo de código:<br>
                Detrás de cada línea programada, de cada etiqueta accesible y de cada píxel de oro, hay un objetivo irrenunciable: dignificar la salud humana a través de la tecnología. Gracias por ser parte de este santuario.
                <br><br>— La Dirección.
            </p>
        </div>

    </div>
`;
