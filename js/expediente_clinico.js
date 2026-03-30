/* ====================================================================================
   MOTOR VISUAL VALTARA V 10.0 | FIX RENDERIZADO MÓVIL
   ==================================================================================== */
:root { 
    --oro: #F2C94C; --oro-suave: #FCEABB; 
    --negro: #040406; --negro-profundo: #010102; --negro-modal: rgba(12,12,16,0.98);
    --blanco: #ffffff; --gris-texto: #dcdce6; 
    --verde-ws: #00E676; --cian-fluor: #4CC9F0; --magenta-neon: #F72585; --purpura-aura: #B200FF;
    
    --menu-bg-gradient: linear-gradient(180deg, rgba(8,8,18,0.98) 0%, rgba(2,2,4,0.98) 100%);
    --cristal-fondo: rgba(15, 15, 22, 0.65); 
    --cristal-borde: rgba(242, 201, 76, 0.25); 

    --font-main: 'Lato', sans-serif;
    --font-accent: 'Playfair Display', serif;
    --nav-height: 5rem;
    --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; }
body { background-color: var(--negro); color: var(--blanco); font-family: var(--font-main); overflow-x: hidden; line-height: 1.6; }

/* CABECERA */
.system-header { 
    position: fixed; top: 0; left: 0; width: 100%; height: var(--nav-height); 
    z-index: 2000; display: flex; justify-content: space-between; align-items: center; 
    background: rgba(6,6,10,0.9); border-bottom: 1px solid var(--cristal-borde); 
    padding: 0 2rem; backdrop-filter: blur(1rem);
}
.header-logo { color: var(--oro); font-size: 1.5rem; letter-spacing: 0.2rem; font-family: var(--font-accent); text-transform: uppercase; background:none; border:none; cursor:pointer;}
.menu-toggle-btn { background: rgba(255,255,255,0.05); border: 1px solid var(--oro); color: var(--blanco); padding: 0.6rem 1.5rem; border-radius: 2rem; cursor:pointer; }

/* MENÚ LATERAL */
#side-menu-overlay {
    position: fixed; top: 0; right: -100%; width: 100vw; max-width: 400px; height: 100vh;
    background: var(--menu-bg-gradient); z-index: 3000; transition: right 0.5s ease;
    overflow-y: auto; padding: 2rem; border-left: 1px solid var(--oro);
}
#side-menu-overlay.open { right: 0; }
.close-menu-btn { background: transparent; color: white; border: 1px solid white; font-size: 2rem; padding: 0.5rem 1rem; border-radius: 50%; cursor: pointer; float: right; margin-bottom: 2rem;}
.side-nav-grid { display: flex; flex-direction: column; gap: 1rem; clear: both;}
.menu-link { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 1.5rem; border-radius: 1rem; text-align: left; cursor: pointer; display: flex; flex-direction: column; gap: 0.5rem;}
.menu-link i { font-size: 1.5rem; color: var(--oro);}
.side-nav-desc { font-size: 0.9rem; color: #aaa; }

/* GRID FIX (ESTO ARREGLA EL PROBLEMA DEL AMONTONAMIENTO) */
.content-wrapper { max-width: 1200px; margin: 0 auto; padding: 6rem 1rem 2rem 1rem; }
.grid-gemela, .grid-triple { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); width: 100%; margin-top: 2rem;}

/* HERO Y CARDS */
.hero-view { text-align: center; padding: 4rem 1rem; }
.hero-view h1 { font-size: 3.5rem; color: var(--blanco); font-family: var(--font-accent); letter-spacing: 0.2rem;}
.hero-slogan { color: var(--oro); font-size: 1.5rem; font-style: italic; margin-bottom: 2rem;}
.view-title { text-align: center; font-size: 2.5rem; color: var(--blanco); margin-bottom: 1rem; font-family: var(--font-accent);}
.view-subtitle { text-align: center; color: var(--gris-texto); margin-bottom: 3rem;}

.glass-card { 
    background: var(--cristal-fondo); border: 1px solid var(--cristal-borde); 
    border-radius: 1rem; padding: 2rem; display: flex; flex-direction: column;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.5); height: 100%;
}
.card-icon-wrapper { font-size: 3rem; color: var(--oro); text-align: center; margin-bottom: 1rem;}
.glass-card h3 { font-size: 1.5rem; text-align: center; margin-bottom: 1rem; color: var(--blanco);}
.card-meta-info { display: flex; justify-content: space-between; color: var(--cian-fluor); margin-bottom: 1rem; font-weight: bold;}
.marketing-text { flex-grow: 1; margin-bottom: 1.5rem; text-align: justify;}
.btn-agenda-ahora { background: var(--verde-ws); color: var(--negro); padding: 1rem; text-align: center; border-radius: 2rem; font-weight: bold; text-decoration: none; cursor: pointer; border: none;}

/* MODALES Y BOTONES FLOTANTES FIX */
.system-float-left, .system-float-right { position: fixed; z-index: 10000; display: flex; gap: 1rem; bottom: 1rem;}
.system-float-left { left: 1rem; }
.system-float-right { right: 1rem; }
.sys-btn { width: 3.5rem; height: 3.5rem; border-radius: 50%; background: var(--negro-modal); border: 1px solid var(--oro); color: white; font-size: 1.5rem; cursor: pointer; display: flex; justify-content: center; align-items: center;}
.btn-ws { background: var(--verde-ws); color: black; border-color: black;}

#aura-modal, #audio-modal, #a11y-menu {
    position: fixed !important; bottom: 5rem; background: var(--negro-modal); 
    border-radius: 1rem; padding: 1.5rem; border: 1px solid var(--oro);
    width: calc(100vw - 2rem); max-width: 400px; max-height: 70vh; overflow-y: auto;
    opacity: 0; visibility: hidden; transition: 0.3s ease; z-index: 10005;
}
#aura-modal { right: 1rem; }
#audio-modal, #a11y-menu { left: 1rem; }
#aura-modal.active, #audio-modal.active, #a11y-menu.active { opacity: 1; visibility: visible; }

.modal-close-btn { float: right; background: transparent; border: 1px solid white; color: white; border-radius: 50%; width: 2rem; height: 2rem; cursor: pointer;}
.aura-input-area { display: flex; gap: 0.5rem; margin-top: 1rem;}
.aura-input { flex-grow: 1; padding: 0.8rem; border-radius: 2rem; border: 1px solid var(--oro); background: transparent; color: white;}
.aura-send { background: var(--oro); color: black; border: none; border-radius: 50%; width: 3rem; height: 3rem; cursor: pointer;}
.msg { padding: 1rem; border-radius: 1rem; margin-bottom: 1rem; width: 90%;}
.msg.bot { background: rgba(255,255,255,0.1); }
.msg.user { background: rgba(242,201,76,0.2); margin-left: auto; border: 1px solid var(--oro);}

.a11y-grid { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;}
.a11y-option { background: transparent; border: 1px solid white; color: white; padding: 1rem; border-radius: 0.5rem; cursor: pointer; text-align: left;}

/* VISTAS SPA */
.view-container { display: none; opacity: 0; transition: opacity 0.5s ease; }
.view-container.active { display: block; opacity: 1; }

/* TOASTS */
#toast-container { position: fixed; top: 1rem; right: 1rem; z-index: 99999; display: flex; flex-direction: column; gap: 0.5rem;}
.toast { background: var(--verde-ws); color: black; padding: 1rem; border-radius: 0.5rem; font-weight: bold;}

/* ACCESIBILIDAD OVERRIDES */
body.high-contrast { background: black !important; color: white !important; }
body.high-contrast .glass-card, body.high-contrast .menu-link { border: 2px solid yellow !important; background: black !important;}
body.invert-colors { filter: invert(1); background: white; }
