/**
 * VALTARA — MAPA BIOMECÁNICO INTERACTIVO V40.1
 * SVG puro — sin dependencias externas, render instantáneo
 * 28 zonas con descripciones clínicas completas
 * inicio_mapa_cuerpo.js — carpeta js/
 */
window.ValtaraModulos = window.ValtaraModulos || {};

window.ValtaraModulos.inicio_mapa_cuerpo = `
<section aria-labelledby="mapa-titulo" style="padding:4rem 1rem 2rem;max-width:900px;margin:0 auto;">

<div style="text-align:center;margin-bottom:2.5rem;">
    <div style="display:inline-flex;align-items:center;gap:14px;margin-bottom:1rem;">
        <span style="background:rgba(0,255,255,0.07);border:1px solid rgba(0,255,255,0.2);padding:12px;border-radius:50%;display:flex;">
            <i class="fa-solid fa-person-rays" style="color:var(--valtara-cian-brillante);font-size:2rem;" aria-hidden="true"></i>
        </span>
        <h2 id="mapa-titulo" style="font-family:var(--font-accent);color:var(--valtara-blanco);font-size:2.6rem;margin:0;">Mapa Biomecánico</h2>
    </div>
    <p style="color:var(--valtara-gris-texto);font-size:1.1rem;line-height:1.8;font-weight:300;max-width:600px;margin:0 auto 1.5rem;">
        Selecciona una zona del cuerpo para conocer su diagnóstico biomecánico y el protocolo Valtara recomendado.
    </p>
    <div role="group" aria-label="Cambiar vista" style="display:inline-flex;gap:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:50px;padding:5px;">
        <button id="btn-vista-3d" onclick="ValtaraMapaController.setVista('mapa')"
            style="padding:8px 22px;border-radius:50px;border:none;background:var(--valtara-cian-brillante);color:#000;font-weight:700;font-size:0.85rem;font-family:'Lato',sans-serif;cursor:pointer;" aria-pressed="true">
            Mapa Corporal
        </button>
        <button id="btn-vista-tabla" onclick="ValtaraMapaController.setVista('tabla')"
            style="padding:8px 22px;border-radius:50px;border:none;background:transparent;color:rgba(255,255,255,0.5);font-size:0.85rem;font-family:'Lato',sans-serif;cursor:pointer;" aria-pressed="false">
            Vista accesible
        </button>
    </div>
</div>

<div id="mapa-3d-wrapper" style="display:grid;gap:2rem;">
    <div style="position:relative;border-radius:2rem;overflow:hidden;background:linear-gradient(180deg,rgba(0,8,20,0.9),rgba(5,5,10,0.95));border:1px solid rgba(0,255,204,0.15);box-shadow:0 2rem 5rem rgba(0,0,0,0.7);">

        <!-- Vista frontal/trasera -->
        <div style="position:absolute;top:16px;left:16px;z-index:10;display:flex;flex-direction:column;gap:8px;">
            <button id="btn-front" onclick="ValtaraMapaController.setView('front')"
                style="padding:8px 14px;border-radius:20px;border:1px solid rgba(0,255,204,0.4);background:rgba(0,255,204,0.15);color:var(--valtara-cian-brillante);font-size:0.75rem;font-family:'Lato',sans-serif;cursor:pointer;font-weight:700;" aria-label="Vista frontal">
                Frontal
            </button>
            <button id="btn-back" onclick="ValtaraMapaController.setView('back')"
                style="padding:8px 14px;border-radius:20px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:rgba(255,255,255,0.4);font-size:0.75rem;font-family:'Lato',sans-serif;cursor:pointer;" aria-label="Vista trasera">
                Trasera
            </button>
        </div>

        <!-- SVG del cuerpo frontal -->
        <svg id="body-svg-front" viewBox="0 0 340 680" xmlns="http://www.w3.org/2000/svg"
             style="width:100%;max-height:560px;display:block;"
             aria-label="Mapa biomecánico corporal frontal" role="img">
            <defs>
                <radialGradient id="bodyGrad" cx="50%" cy="40%" r="55%">
                    <stop offset="0%" stop-color="#1e2a3a"/>
                    <stop offset="100%" stop-color="#0a0e18"/>
                </radialGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="shadowDrop">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="rgba(0,0,0,0.6)"/>
                </filter>
            </defs>

            <!-- Sombra del cuerpo -->
            <ellipse cx="170" cy="665" rx="55" ry="10" fill="rgba(0,0,0,0.4)"/>

            <!-- CUERPO: silueta base con gradiente 3D -->
            <!-- Cabeza -->
            <ellipse cx="170" cy="58" rx="44" ry="50" fill="url(#bodyGrad)" stroke="rgba(0,200,180,0.25)" stroke-width="1.5" filter="url(#shadowDrop)"/>
            <!-- Cuello -->
            <rect x="153" y="104" width="34" height="35" rx="8" fill="#111827" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
            <!-- Clavículas -->
            <path d="M100,130 Q135,122 153,126 M187,126 Q205,122 240,130" stroke="rgba(100,150,200,0.3)" stroke-width="3" fill="none" stroke-linecap="round"/>
            <!-- Torso -->
            <path d="M100,130 L90,280 Q90,300 110,310 L170,318 L230,310 Q250,300 250,280 L240,130 Q205,122 187,126 L153,126 Q135,122 100,130Z"
                  fill="#0f1825" stroke="rgba(0,200,180,0.2)" stroke-width="1.5"/>
            <!-- Pecho detalle -->
            <ellipse cx="145" cy="185" rx="28" ry="22" fill="#141f2e" opacity="0.7"/>
            <ellipse cx="195" cy="185" rx="28" ry="22" fill="#141f2e" opacity="0.7"/>
            <!-- Abdomen -->
            <rect x="130" y="230" width="80" height="60" rx="10" fill="#111827" opacity="0.5"/>
            <!-- Cintura -->
            <path d="M110,310 Q135,325 170,328 Q205,325 230,310 L235,360 Q210,370 170,372 Q130,370 105,360Z"
                  fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
            <!-- Pelvis -->
            <path d="M105,360 L100,395 Q100,415 125,420 L170,422 L215,420 Q240,415 240,395 L235,360 Q210,370 170,372 Q130,370 105,360Z"
                  fill="#0d1620" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>

            <!-- Brazo derecho (izquierda en pantalla) -->
            <path d="M100,130 L72,140 L60,220 Q58,240 65,250 L75,290 Q80,305 85,310 L90,280 L100,130Z"
                  fill="#0f1825" stroke="rgba(0,200,180,0.18)" stroke-width="1.5"/>
            <ellipse cx="68" cy="240" rx="14" ry="8" fill="#111827" opacity="0.6"/>
            <!-- Antebrazo derecho -->
            <path d="M65,250 L55,330 Q52,345 58,355 L72,360 L85,310 L75,290 L65,250Z"
                  fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
            <!-- Mano derecha -->
            <ellipse cx="62" cy="368" rx="16" ry="20" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>

            <!-- Brazo izquierdo (derecha en pantalla) -->
            <path d="M240,130 L268,140 L280,220 Q282,240 275,250 L265,290 Q260,305 255,310 L250,280 L240,130Z"
                  fill="#0f1825" stroke="rgba(0,200,180,0.18)" stroke-width="1.5"/>
            <ellipse cx="272" cy="240" rx="14" ry="8" fill="#111827" opacity="0.6"/>
            <!-- Antebrazo izquierdo -->
            <path d="M275,250 L285,330 Q288,345 282,355 L268,360 L255,310 L265,290 L275,250Z"
                  fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
            <!-- Mano izquierda -->
            <ellipse cx="278" cy="368" rx="16" ry="20" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>

            <!-- Muslo derecho -->
            <path d="M125,420 L112,540 Q110,558 120,565 L148,568 L158,420 L125,420Z"
                  fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
            <!-- Rodilla derecha -->
            <ellipse cx="134" cy="570" rx="20" ry="16" fill="#111827" stroke="rgba(0,200,180,0.2)" stroke-width="1"/>
            <!-- Pantorrilla derecha -->
            <path d="M114,586 L118,650 Q120,665 130,668 L148,668 L152,586 L134,586Z"
                  fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
            <!-- Pie derecho -->
            <ellipse cx="135" cy="670" rx="22" ry="10" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>

            <!-- Muslo izquierdo -->
            <path d="M215,420 L228,540 Q230,558 220,565 L192,568 L182,420 L215,420Z"
                  fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
            <!-- Rodilla izquierda -->
            <ellipse cx="206" cy="570" rx="20" ry="16" fill="#111827" stroke="rgba(0,200,180,0.2)" stroke-width="1"/>
            <!-- Pantorrilla izquierda -->
            <path d="M226,586 L222,650 Q220,665 210,668 L192,668 L188,586 L206,586Z"
                  fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
            <!-- Pie izquierdo -->
            <ellipse cx="205" cy="670" rx="22" ry="10" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>

            <!-- ══════════ ZONAS INTERACTIVAS FRONTALES ══════════ -->
            <!-- Cada zona: círculo invisible grande para tap + círculo visible pequeño como indicador -->

            <!-- Cráneo/Cabeza -->
            <g class="zona-hit" data-id="craneo" tabindex="0" role="button" aria-label="Cráneo y cuero cabelludo" style="cursor:pointer;">
                <ellipse cx="170" cy="52" rx="44" ry="50" fill="transparent"/>
                <circle cx="170" cy="40" r="7" fill="rgba(0,255,204,0.6)" stroke="rgba(0,255,204,0.9)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="224" y="44" font-family="Lato,sans-serif" font-size="11" fill="rgba(0,255,204,0.8)" class="zona-label">Cráneo</text>
            </g>

            <!-- Mandíbula -->
            <g class="zona-hit" data-id="mandibula" tabindex="0" role="button" aria-label="Mandíbula y ATM" style="cursor:pointer;">
                <ellipse cx="170" cy="100" rx="35" ry="18" fill="transparent"/>
                <circle cx="170" cy="100" r="6" fill="rgba(255,215,0,0.7)" stroke="rgba(255,215,0,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="210" y="103" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,215,0,0.8)" class="zona-label">Mandíbula</text>
            </g>

            <!-- Cuello -->
            <g class="zona-hit" data-id="cervical" tabindex="0" role="button" aria-label="Columna cervical" style="cursor:pointer;">
                <rect x="148" y="104" width="44" height="35" rx="8" fill="transparent"/>
                <circle cx="170" cy="122" r="6" fill="rgba(255,215,0,0.7)" stroke="rgba(255,215,0,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="110" y="125" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,215,0,0.8)" class="zona-label" text-anchor="end">Cervical</text>
            </g>

            <!-- Hombro derecho -->
            <g class="zona-hit" data-id="hombro_d" tabindex="0" role="button" aria-label="Hombro derecho" style="cursor:pointer;">
                <ellipse cx="88" cy="152" rx="28" ry="24" fill="transparent"/>
                <circle cx="88" cy="150" r="7" fill="rgba(255,215,0,0.7)" stroke="rgba(255,215,0,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="32" y="153" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,215,0,0.8)" class="zona-label">Hombro D</text>
            </g>

            <!-- Hombro izquierdo -->
            <g class="zona-hit" data-id="hombro_i" tabindex="0" role="button" aria-label="Hombro izquierdo" style="cursor:pointer;">
                <ellipse cx="252" cy="152" rx="28" ry="24" fill="transparent"/>
                <circle cx="252" cy="150" r="7" fill="rgba(255,215,0,0.7)" stroke="rgba(255,215,0,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="265" y="153" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,215,0,0.8)" class="zona-label">Hombro I</text>
            </g>

            <!-- Pectoral -->
            <g class="zona-hit" data-id="pectoral" tabindex="0" role="button" aria-label="Pectoral y esternón" style="cursor:pointer;">
                <ellipse cx="170" cy="185" rx="55" ry="35" fill="transparent"/>
                <circle cx="170" cy="180" r="7" fill="rgba(0,255,204,0.6)" stroke="rgba(0,255,204,0.9)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="215" y="183" font-family="Lato,sans-serif" font-size="11" fill="rgba(0,255,204,0.8)" class="zona-label">Pectoral</text>
            </g>

            <!-- Brazo superior derecho -->
            <g class="zona-hit" data-id="trapecio_d" tabindex="0" role="button" aria-label="Trapecio derecho" style="cursor:pointer;">
                <ellipse cx="72" cy="200" rx="20" ry="30" fill="transparent"/>
                <circle cx="72" cy="200" r="6" fill="rgba(0,255,204,0.6)" stroke="rgba(0,255,204,0.9)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="14" y="203" font-family="Lato,sans-serif" font-size="11" fill="rgba(0,255,204,0.8)" class="zona-label">Trapecio D</text>
            </g>

            <!-- Brazo superior izquierdo -->
            <g class="zona-hit" data-id="trapecio_i" tabindex="0" role="button" aria-label="Trapecio izquierdo" style="cursor:pointer;">
                <ellipse cx="268" cy="200" rx="20" ry="30" fill="transparent"/>
                <circle cx="268" cy="200" r="6" fill="rgba(0,255,204,0.6)" stroke="rgba(0,255,204,0.9)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="280" y="203" font-family="Lato,sans-serif" font-size="11" fill="rgba(0,255,204,0.8)" class="zona-label">Trapecio I</text>
            </g>

            <!-- Abdomen -->
            <g class="zona-hit" data-id="abdomen" tabindex="0" role="button" aria-label="Abdomen" style="cursor:pointer;">
                <ellipse cx="170" cy="255" rx="45" ry="35" fill="transparent"/>
                <circle cx="170" cy="255" r="7" fill="rgba(255,215,0,0.7)" stroke="rgba(255,215,0,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="110" y="258" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,215,0,0.8)" class="zona-label" text-anchor="end">Abdomen</text>
            </g>

            <!-- Codo derecho -->
            <g class="zona-hit" data-id="codo_d" tabindex="0" role="button" aria-label="Codo derecho" style="cursor:pointer;">
                <ellipse cx="66" cy="250" rx="18" ry="16" fill="transparent"/>
                <circle cx="64" cy="252" r="6" fill="rgba(255,107,53,0.8)" stroke="rgba(255,107,53,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="10" y="255" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,107,53,0.9)" class="zona-label">Codo D</text>
            </g>

            <!-- Codo izquierdo -->
            <g class="zona-hit" data-id="codo_i" tabindex="0" role="button" aria-label="Codo izquierdo" style="cursor:pointer;">
                <ellipse cx="274" cy="250" rx="18" ry="16" fill="transparent"/>
                <circle cx="276" cy="252" r="6" fill="rgba(255,107,53,0.8)" stroke="rgba(255,107,53,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="288" y="255" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,107,53,0.9)" class="zona-label">Codo I</text>
            </g>

            <!-- Antebrazo derecho -->
            <g class="zona-hit" data-id="antebrazo" tabindex="0" role="button" aria-label="Antebrazo y muñeca" style="cursor:pointer;">
                <ellipse cx="62" cy="305" rx="16" ry="28" fill="transparent"/>
                <circle cx="60" cy="310" r="5" fill="rgba(0,255,204,0.6)" stroke="rgba(0,255,204,0.9)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="10" y="313" font-family="Lato,sans-serif" font-size="10" fill="rgba(0,255,204,0.7)" class="zona-label">Antebrazo</text>
            </g>

            <!-- Cadera derecha -->
            <g class="zona-hit" data-id="cadera_d" tabindex="0" role="button" aria-label="Cadera derecha" style="cursor:pointer;">
                <ellipse cx="120" cy="385" rx="28" ry="25" fill="transparent"/>
                <circle cx="118" cy="385" r="7" fill="rgba(255,215,0,0.7)" stroke="rgba(255,215,0,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="60" y="388" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,215,0,0.8)" class="zona-label">Cadera D</text>
            </g>

            <!-- Cadera izquierda -->
            <g class="zona-hit" data-id="cadera_i" tabindex="0" role="button" aria-label="Cadera izquierda" style="cursor:pointer;">
                <ellipse cx="220" cy="385" rx="28" ry="25" fill="transparent"/>
                <circle cx="222" cy="385" r="7" fill="rgba(255,215,0,0.7)" stroke="rgba(255,215,0,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="234" y="388" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,215,0,0.8)" class="zona-label">Cadera I</text>
            </g>

            <!-- Linfa / sistema linfático -->
            <g class="zona-hit" data-id="linfa" tabindex="0" role="button" aria-label="Sistema linfático" style="cursor:pointer;">
                <ellipse cx="170" cy="340" rx="40" ry="28" fill="transparent"/>
                <circle cx="170" cy="340" r="7" fill="rgba(178,127,255,0.7)" stroke="rgba(178,127,255,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="215" y="343" font-family="Lato,sans-serif" font-size="11" fill="rgba(178,127,255,0.8)" class="zona-label">Linfático</text>
            </g>

            <!-- Muslo derecho -->
            <g class="zona-hit" data-id="isquiotibiales" tabindex="0" role="button" aria-label="Isquiotibiales y muslos" style="cursor:pointer;">
                <ellipse cx="130" cy="490" rx="28" ry="45" fill="transparent"/>
                <circle cx="130" cy="490" r="6" fill="rgba(0,255,204,0.6)" stroke="rgba(0,255,204,0.9)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="66" y="493" font-family="Lato,sans-serif" font-size="11" fill="rgba(0,255,204,0.7)" class="zona-label">Muslos</text>
            </g>

            <!-- Rodilla derecha -->
            <g class="zona-hit" data-id="rodilla_d" tabindex="0" role="button" aria-label="Rodilla derecha" style="cursor:pointer;">
                <ellipse cx="134" cy="570" rx="22" ry="18" fill="transparent"/>
                <circle cx="134" cy="568" r="7" fill="rgba(255,107,53,0.8)" stroke="rgba(255,107,53,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="68" y="571" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,107,53,0.9)" class="zona-label">Rodilla D</text>
            </g>

            <!-- Rodilla izquierda -->
            <g class="zona-hit" data-id="rodilla_i" tabindex="0" role="button" aria-label="Rodilla izquierda" style="cursor:pointer;">
                <ellipse cx="206" cy="570" rx="22" ry="18" fill="transparent"/>
                <circle cx="206" cy="568" r="7" fill="rgba(255,107,53,0.8)" stroke="rgba(255,107,53,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="220" y="571" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,107,53,0.9)" class="zona-label">Rodilla I</text>
            </g>

            <!-- Pantorrilla derecha -->
            <g class="zona-hit" data-id="pantorrilla_d" tabindex="0" role="button" aria-label="Pantorrilla derecha" style="cursor:pointer;">
                <ellipse cx="131" cy="625" rx="20" ry="32" fill="transparent"/>
                <circle cx="131" cy="625" r="6" fill="rgba(0,255,204,0.6)" stroke="rgba(0,255,204,0.9)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="66" y="628" font-family="Lato,sans-serif" font-size="11" fill="rgba(0,255,204,0.7)" class="zona-label">Pantorrilla D</text>
            </g>

            <!-- Tobillo/Pie -->
            <g class="zona-hit" data-id="tobillo" tabindex="0" role="button" aria-label="Tobillo y pie" style="cursor:pointer;">
                <ellipse cx="170" cy="665" rx="50" ry="18" fill="transparent"/>
                <circle cx="170" cy="662" r="7" fill="rgba(255,215,0,0.7)" stroke="rgba(255,215,0,1)" stroke-width="1.5" filter="url(#glow)" class="zona-dot"/>
                <text x="215" y="665" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,215,0,0.8)" class="zona-label">Tobillo / Pie</text>
            </g>
        </svg>

        <!-- SVG trasera (oculta por defecto) -->
        <svg id="body-svg-back" viewBox="0 0 340 680" xmlns="http://www.w3.org/2000/svg"
             style="width:100%;max-height:560px;display:none;"
             aria-label="Mapa biomecánico corporal trasero" role="img">
            <defs>
                <radialGradient id="bodyGrad2" cx="50%" cy="40%" r="55%">
                    <stop offset="0%" stop-color="#1e2a3a"/>
                    <stop offset="100%" stop-color="#0a0e18"/>
                </radialGradient>
                <filter id="glow2"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <ellipse cx="170" cy="665" rx="55" ry="10" fill="rgba(0,0,0,0.4)"/>
            <!-- Misma silueta vista trasera -->
            <ellipse cx="170" cy="58" rx="44" ry="50" fill="url(#bodyGrad2)" stroke="rgba(0,200,180,0.25)" stroke-width="1.5"/>
            <rect x="153" y="104" width="34" height="35" rx="8" fill="#111827" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
            <path d="M100,130 L90,280 Q90,300 110,310 L170,318 L230,310 Q250,300 250,280 L240,130 Q205,122 187,126 L153,126 Q135,122 100,130Z" fill="#0f1825" stroke="rgba(0,200,180,0.2)" stroke-width="1.5"/>
            <path d="M110,310 Q135,325 170,328 Q205,325 230,310 L235,360 Q210,370 170,372 Q130,370 105,360Z" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
            <path d="M105,360 L100,395 Q100,415 125,420 L170,422 L215,420 Q240,415 240,395 L235,360 Q210,370 170,372 Q130,370 105,360Z" fill="#0d1620" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
            <path d="M100,130 L72,140 L60,220 Q58,240 65,250 L75,290 Q80,305 85,310 L90,280 L100,130Z" fill="#0f1825" stroke="rgba(0,200,180,0.18)" stroke-width="1.5"/>
            <path d="M65,250 L55,330 Q52,345 58,355 L72,360 L85,310 L75,290 L65,250Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
            <ellipse cx="62" cy="368" rx="16" ry="20" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
            <path d="M240,130 L268,140 L280,220 Q282,240 275,250 L265,290 Q260,305 255,310 L250,280 L240,130Z" fill="#0f1825" stroke="rgba(0,200,180,0.18)" stroke-width="1.5"/>
            <path d="M275,250 L285,330 Q288,345 282,355 L268,360 L255,310 L265,290 L275,250Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
            <ellipse cx="278" cy="368" rx="16" ry="20" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
            <path d="M125,420 L112,540 Q110,558 120,565 L148,568 L158,420 L125,420Z" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
            <ellipse cx="134" cy="570" rx="20" ry="16" fill="#111827" stroke="rgba(0,200,180,0.2)" stroke-width="1"/>
            <path d="M114,586 L118,650 Q120,665 130,668 L148,668 L152,586 L134,586Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
            <ellipse cx="135" cy="670" rx="22" ry="10" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
            <path d="M215,420 L228,540 Q230,558 220,565 L192,568 L182,420 L215,420Z" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>
            <ellipse cx="206" cy="570" rx="20" ry="16" fill="#111827" stroke="rgba(0,200,180,0.2)" stroke-width="1"/>
            <path d="M226,586 L222,650 Q220,665 210,668 L192,668 L188,586 L206,586Z" fill="#0f1825" stroke="rgba(0,200,180,0.12)" stroke-width="1"/>
            <ellipse cx="205" cy="670" rx="22" ry="10" fill="#0f1825" stroke="rgba(0,200,180,0.15)" stroke-width="1"/>

            <!-- ZONAS TRASERAS -->
            <g class="zona-hit" data-id="nuca" tabindex="0" role="button" aria-label="Nuca y occipital" style="cursor:pointer;">
                <ellipse cx="170" cy="104" rx="40" ry="20" fill="transparent"/>
                <circle cx="170" cy="108" r="6" fill="rgba(0,255,204,0.6)" stroke="rgba(0,255,204,0.9)" stroke-width="1.5" filter="url(#glow2)" class="zona-dot"/>
                <text x="215" y="111" font-family="Lato,sans-serif" font-size="11" fill="rgba(0,255,204,0.8)" class="zona-label">Nuca</text>
            </g>
            <g class="zona-hit" data-id="dorsal_sup" tabindex="0" role="button" aria-label="Espalda superior" style="cursor:pointer;">
                <ellipse cx="170" cy="180" rx="55" ry="35" fill="transparent"/>
                <circle cx="170" cy="175" r="7" fill="rgba(255,215,0,0.7)" stroke="rgba(255,215,0,1)" stroke-width="1.5" filter="url(#glow2)" class="zona-dot"/>
                <text x="110" y="178" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,215,0,0.8)" class="zona-label" text-anchor="end">Espalda Alta</text>
            </g>
            <g class="zona-hit" data-id="dorsal_med" tabindex="0" role="button" aria-label="Espalda media" style="cursor:pointer;">
                <ellipse cx="170" cy="255" rx="50" ry="35" fill="transparent"/>
                <circle cx="170" cy="255" r="7" fill="rgba(255,215,0,0.7)" stroke="rgba(255,215,0,1)" stroke-width="1.5" filter="url(#glow2)" class="zona-dot"/>
                <text x="230" y="258" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,215,0,0.8)" class="zona-label">Espalda Media</text>
            </g>
            <g class="zona-hit" data-id="lumbar" tabindex="0" role="button" aria-label="Región lumbar" style="cursor:pointer;">
                <ellipse cx="170" cy="320" rx="50" ry="30" fill="transparent"/>
                <circle cx="170" cy="318" r="8" fill="rgba(255,107,53,0.8)" stroke="rgba(255,107,53,1)" stroke-width="2" filter="url(#glow2)" class="zona-dot"/>
                <text x="110" y="321" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,107,53,0.9)" class="zona-label" text-anchor="end">Lumbar</text>
            </g>
            <g class="zona-hit" data-id="sacro" tabindex="0" role="button" aria-label="Sacro y cóccix" style="cursor:pointer;">
                <ellipse cx="170" cy="368" rx="35" ry="22" fill="transparent"/>
                <circle cx="170" cy="368" r="7" fill="rgba(255,215,0,0.7)" stroke="rgba(255,215,0,1)" stroke-width="1.5" filter="url(#glow2)" class="zona-dot"/>
                <text x="215" y="371" font-family="Lato,sans-serif" font-size="11" fill="rgba(255,215,0,0.8)" class="zona-label">Sacro</text>
            </g>
            <g class="zona-hit" data-id="gluteo_d" tabindex="0" role="button" aria-label="Glúteo derecho" style="cursor:pointer;">
                <ellipse cx="130" cy="395" rx="28" ry="26" fill="transparent"/>
                <circle cx="128" cy="395" r="7" fill="rgba(0,255,204,0.6)" stroke="rgba(0,255,204,0.9)" stroke-width="1.5" filter="url(#glow2)" class="zona-dot"/>
                <text x="66" y="398" font-family="Lato,sans-serif" font-size="11" fill="rgba(0,255,204,0.7)" class="zona-label">Glúteo D</text>
            </g>
            <g class="zona-hit" data-id="gluteo_i" tabindex="0" role="button" aria-label="Glúteo izquierdo" style="cursor:pointer;">
                <ellipse cx="210" cy="395" rx="28" ry="26" fill="transparent"/>
                <circle cx="212" cy="395" r="7" fill="rgba(0,255,204,0.6)" stroke="rgba(0,255,204,0.9)" stroke-width="1.5" filter="url(#glow2)" class="zona-dot"/>
                <text x="225" y="398" font-family="Lato,sans-serif" font-size="11" fill="rgba(0,255,204,0.7)" class="zona-label">Glúteo I</text>
            </g>
            <g class="zona-hit" data-id="pantorrilla_i" tabindex="0" role="button" aria-label="Pantorrilla izquierda" style="cursor:pointer;">
                <ellipse cx="209" cy="625" rx="20" ry="32" fill="transparent"/>
                <circle cx="209" cy="625" r="6" fill="rgba(0,255,204,0.6)" stroke="rgba(0,255,204,0.9)" stroke-width="1.5" filter="url(#glow2)" class="zona-dot"/>
                <text x="222" y="628" font-family="Lato,sans-serif" font-size="11" fill="rgba(0,255,204,0.7)" class="zona-label">Pantorrilla I</text>
            </g>
        </svg>
    </div>

    <!-- Panel de información -->
    <div id="mapa-zone-info" aria-live="polite" aria-atomic="true"
         style="background:linear-gradient(135deg,rgba(0,255,255,0.04),rgba(0,0,0,0.75));border:1px solid rgba(0,255,255,0.1);border-radius:2rem;padding:2.5rem;min-height:200px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">
        <i class="fa-solid fa-hand-pointer" style="font-size:3rem;color:rgba(0,255,204,0.3);margin-bottom:1.2rem;" aria-hidden="true"></i>
        <h3 style="font-family:var(--font-accent);font-size:1.8rem;color:var(--valtara-blanco);margin:0 0 0.8rem;">Selecciona una zona</h3>
        <p style="color:var(--valtara-gris-texto);font-size:1rem;line-height:1.7;margin:0;">Toca cualquier punto del mapa corporal para ver el diagnóstico biomecánico, causas del dolor y el protocolo de tratamiento Valtara.</p>
    </div>
</div>

<!-- Vista tabla accesible -->
<div id="mapa-tabla-wrapper" style="display:none;">
    <div style="overflow-x:auto;border-radius:1.5rem;border:1px solid rgba(0,255,255,0.12);">
        <table style="width:100%;border-collapse:collapse;font-family:'Lato',sans-serif;font-size:0.9rem;" aria-label="Tabla de zonas biomecánicas">
            <thead>
                <tr style="background:rgba(0,255,204,0.08);">
                    <th scope="col" style="padding:14px 16px;text-align:left;color:var(--valtara-cian-brillante);font-weight:600;border-bottom:1px solid rgba(0,255,255,0.15);">Zona</th>
                    <th scope="col" style="padding:14px 16px;text-align:left;color:var(--valtara-cian-brillante);font-weight:600;border-bottom:1px solid rgba(0,255,255,0.15);">Protocolo</th>
                    <th scope="col" style="padding:14px 16px;text-align:left;color:var(--valtara-cian-brillante);font-weight:600;border-bottom:1px solid rgba(0,255,255,0.15);">Agendar</th>
                </tr>
            </thead>
            <tbody id="mapa-tabla-body"></tbody>
        </table>
    </div>
</div>

</section>
`;
