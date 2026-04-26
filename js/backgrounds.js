/**
 * ====================================================================================
 * VALTARA BACKGROUNDS ENGINE V40.0 — FONDOS ANIMADOS TEMÁTICOS
 * ------------------------------------------------------------------------------------
 * Fondos animados dibujados con Canvas 2D. Sin imágenes externas.
 * El usuario elige el fondo desde el panel "Más" → "Aprecia nuestro fondo".
 * La preferencia se guarda y se restaura en cada visita.
 *
 * Escenas disponibles:
 *   orbs       — Orbes de color (fondo original)
 *   saludo     — Dos siluetas saludándose
 *   masaje     — Terapeuta y paciente en sesión
 *   loto       — Flor de loto abriendo pétalos
 *   difusor    — Difusor con vapor aromático
 *   corazon    — Corazón que late
 *   texto      — "Tu momento · Tu armonía" animado
 *
 * Archivo: js/backgrounds.js — carpeta js/
 * Línea en index.html antes de </body>:
 *   <script src="js/backgrounds.js?v=40.0.0" defer></script>
 * ====================================================================================
 */

const ValtaraBackgrounds = {

    current: 'orbs',
    canvas: null,
    ctx: null,
    rafId: null,
    time: 0,
    STORAGE_KEY: 'valtara_bg_theme',

    scenes: {
        orbs:     { label: 'Orbes',              icon: '✦' },
        loto:     { label: 'Flor de Loto',       icon: '🪷' },
        masaje:   { label: 'Sesión de Masaje',   icon: '🤲' },
        saludo:   { label: 'Bienvenida',         icon: '🙏' },
        difusor:  { label: 'Difusor Aromático',  icon: '💧' },
        corazon:  { label: 'Latido',             icon: '♡'  },
        texto:    { label: 'Tu Momento',         icon: '✧'  },
    },

    // ── PALETA VALTARA ───────────────────────────────────────────────
    gold:   '#D4AF37',
    cyan:   '#00FFCC',
    purple: '#7B2FBE',
    bg:     '#050508',

    // ── INICIO ──────────────────────────────────────────────────────
    init: function() {
        this.createCanvas();
        this.injectSelectorStyles();
        this.injectMenuButton();
        this.loadPreference();
        this.applyTheme(this.current);
        console.log('[BACKGROUNDS V40.0] Motor de fondos activo.');
    },

    // ── CANVAS PROPIO (sobre los orbs) ───────────────────────────────
    createCanvas: function() {
        const bg = document.getElementById('ambient-bg');
        if (!bg) return;

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'valtara-bg-canvas';
        this.canvas.setAttribute('aria-hidden', 'true');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 1;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.8s ease;
        `;
        bg.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize(), { passive: true });
    },

    resize: function() {
        if (!this.canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width  = window.innerWidth  * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width  = window.innerWidth  + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        if (this.ctx) { this.ctx.setTransform(1,0,0,1,0,0); this.ctx.scale(dpr, dpr); }
    },

    // ── APLICAR TEMA ─────────────────────────────────────────────────
    applyTheme: function(name) {
        this.current = name;
        this.savePreference();

        // Cancelar loop anterior
        if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
        this.time = 0;

        if (name === 'orbs') {
            // Mostrar canvas de orbs (performance.js), ocultar el nuestro
            this.canvas.style.opacity = '0';
            const orbCanvas = document.getElementById('valtara-orb-canvas');
            if (orbCanvas) orbCanvas.style.opacity = '1';
        } else {
            // Ocultar canvas de orbs, mostrar el nuestro
            const orbCanvas = document.getElementById('valtara-orb-canvas');
            if (orbCanvas) orbCanvas.style.opacity = '0';
            setTimeout(() => { this.canvas.style.opacity = '1'; }, 100);
            this.startLoop(name);
        }

        // Actualizar estado visual de los botones del selector
        document.querySelectorAll('.bg-scene-btn').forEach(btn => {
            const active = btn.getAttribute('data-scene') === name;
            btn.style.borderColor  = active ? this.gold : 'rgba(255,255,255,0.12)';
            btn.style.background   = active ? `rgba(212,175,55,0.12)` : 'rgba(255,255,255,0.04)';
        });
    },

    // ── LOOP PRINCIPAL ────────────────────────────────────────────────
    // Frame skip durante scroll → menos carga térmica
    _scrolling: false,
    _scrollTimer: null,

    startLoop: function(name) {
        // Detectar scroll activo para bajar frame rate
        window.addEventListener('scroll', () => {
            this._scrolling = true;
            clearTimeout(this._scrollTimer);
            this._scrollTimer = setTimeout(() => { this._scrolling = false; }, 180);
        }, { passive: true });

        let frameSkip = 0;
        const draw = () => {
            this.rafId = requestAnimationFrame(draw);

            // Pausa si la pestaña no es visible
            if (document.visibilityState === 'hidden') return;

            // Durante scroll: saltar 2 de cada 3 frames (mantiene fluidez sin sobrecalentar)
            if (this._scrolling) {
                frameSkip = (frameSkip + 1) % 3;
                if (frameSkip !== 0) return;
            }

            this.time += 0.012;
            this.clearCanvas();
            const fn = this['draw_' + name];
            if (fn) fn.call(this);
        };
        draw();
    },

    clearCanvas: function() {
        const W = window.innerWidth, H = window.innerHeight;
        this.ctx.clearRect(0, 0, W, H);
        // Fondo base semitransparente para que se integre con el #050508 del body
        this.ctx.fillStyle = 'rgba(5, 5, 10, 0.82)';
        this.ctx.fillRect(0, 0, W, H);
    },

    // ════════════════════════════════════════════════════════════════
    // ESCENA 1 — FLOR DE LOTO
    // ════════════════════════════════════════════════════════════════
    draw_loto: function() {
        const W = window.innerWidth, H = window.innerHeight;
        const cx = W / 2, cy = H * 0.52;
        const t = this.time;
        const R = Math.min(W, H) * 0.28;
        const petalCount = 8;
        const breathe = 0.92 + 0.08 * Math.sin(t * 0.8);

        this.ctx.save();
        this.ctx.translate(cx, cy);

        // Glow dorado de fondo
        const glow = this.ctx.createRadialGradient(0, 0, 0, 0, 0, R * 1.4);
        glow.addColorStop(0, 'rgba(212,175,55,0.18)');
        glow.addColorStop(0.5, 'rgba(178,0,255,0.06)');
        glow.addColorStop(1, 'transparent');
        this.ctx.fillStyle = glow;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, R * 1.4, 0, Math.PI * 2);
        this.ctx.fill();

        // Pétalos (dos capas)
        for (let layer = 0; layer < 2; layer++) {
            const layerR  = R * (layer === 0 ? 0.75 : 1) * breathe;
            const offset  = layer === 0 ? Math.PI / petalCount : 0;
            const opacity = layer === 0 ? 0.55 : 0.80;
            const openAngle = Math.PI * (0.28 + 0.12 * Math.sin(t * 0.5 + layer));

            for (let i = 0; i < petalCount; i++) {
                const angle = (i / petalCount) * Math.PI * 2 + offset;
                const px = Math.cos(angle) * layerR * 0.5;
                const py = Math.sin(angle) * layerR * 0.5;

                this.ctx.save();
                this.ctx.rotate(angle);

                // Gradiente del pétalo: punta dorada, base cian
                const pg = this.ctx.createLinearGradient(0, 0, 0, -layerR);
                pg.addColorStop(0, `rgba(0,255,204,${opacity * 0.9})`);
                pg.addColorStop(0.5, `rgba(212,175,55,${opacity})`);
                pg.addColorStop(1, `rgba(212,175,55,${opacity * 0.3})`);

                this.ctx.beginPath();
                this.ctx.moveTo(0, 0);
                this.ctx.bezierCurveTo(
                    layerR * Math.sin(openAngle), -layerR * 0.3,
                    layerR * Math.sin(openAngle), -layerR * 0.75,
                    0, -layerR
                );
                this.ctx.bezierCurveTo(
                    -layerR * Math.sin(openAngle), -layerR * 0.75,
                    -layerR * Math.sin(openAngle), -layerR * 0.3,
                    0, 0
                );
                this.ctx.fillStyle = pg;
                this.ctx.fill();
                this.ctx.restore();
            }
        }

        // Centro dorado
        const cg = this.ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.18);
        cg.addColorStop(0, 'rgba(255,235,120,0.95)');
        cg.addColorStop(1, 'rgba(212,175,55,0.2)');
        this.ctx.beginPath();
        this.ctx.arc(0, 0, R * 0.18, 0, Math.PI * 2);
        this.ctx.fillStyle = cg;
        this.ctx.fill();

        this.ctx.restore();

        // Texto "Valtara" debajo
        this.ctx.fillStyle = `rgba(212,175,55,${0.35 + 0.15 * Math.sin(t * 0.6)})`;
        this.ctx.font = `300 ${Math.min(W * 0.04, 18)}px Lato, sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.letterSpacing = '0.3em';
        this.ctx.fillText('VALTARA EXECUTIVE', cx, cy + R * 1.35);
    },

    // ════════════════════════════════════════════════════════════════
    // ESCENA 2 — SESIÓN DE MASAJE
    // ════════════════════════════════════════════════════════════════
    draw_masaje: function() {
        const W = window.innerWidth, H = window.innerHeight;
        const t = this.time;
        const scale = Math.min(W, H) / 420;
        const cx = W / 2, cy = H * 0.5;

        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.scale(scale, scale);

        // Glow de fondo suave
        const glow = this.ctx.createRadialGradient(0, 0, 0, 0, 0, 220);
        glow.addColorStop(0, 'rgba(123,47,190,0.14)');
        glow.addColorStop(0.6, 'rgba(0,255,204,0.05)');
        glow.addColorStop(1, 'transparent');
        this.ctx.fillStyle = glow;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 220, 0, Math.PI * 2);
        this.ctx.fill();

        // Camilla / superficie
        this.ctx.fillStyle = 'rgba(212,175,55,0.12)';
        this.ctx.beginPath();
        this.ctx.roundRect(-120, 30, 240, 28, 10);
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(212,175,55,0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // PACIENTE (silueta recostada)
        const pacienteAlpha = 0.65;
        this.ctx.fillStyle = `rgba(212,175,55,${pacienteAlpha})`;

        // Cuerpo
        this.ctx.beginPath();
        this.ctx.ellipse(-10, 20, 95, 14, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Cabeza
        this.ctx.beginPath();
        this.ctx.arc(95, 18, 16, 0, Math.PI * 2);
        this.ctx.fill();

        // Piernas
        this.ctx.beginPath();
        this.ctx.ellipse(-100, 22, 30, 10, -0.15, 0, Math.PI * 2);
        this.ctx.fill();

        // TERAPEUTA (silueta de pie, inclinada)
        const terapeutaAlpha = 0.75;
        this.ctx.fillStyle = `rgba(0,255,204,${terapeutaAlpha})`;

        // Cuerpo del terapeuta
        this.ctx.beginPath();
        this.ctx.ellipse(-5, -40, 22, 50, 0.25, 0, Math.PI * 2);
        this.ctx.fill();

        // Cabeza
        this.ctx.beginPath();
        this.ctx.arc(8, -92, 18, 0, Math.PI * 2);
        this.ctx.fill();

        // Brazo izquierdo (aplicando masaje)
        const armSwing = Math.sin(t * 1.2) * 8;
        this.ctx.beginPath();
        this.ctx.moveTo(-10, -30);
        this.ctx.bezierCurveTo(-40, -10 + armSwing, -60, 5, -50, 12 + armSwing * 0.5);
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = `rgba(0,255,204,${terapeutaAlpha})`;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();

        // Brazo derecho
        this.ctx.beginPath();
        this.ctx.moveTo(10, -30);
        this.ctx.bezierCurveTo(30, -12 - armSwing, 40, 5, 28, 12 - armSwing * 0.5);
        this.ctx.lineWidth = 10;
        this.ctx.stroke();

        // Manos (pequeños círculos)
        this.ctx.fillStyle = `rgba(0,255,204,0.9)`;
        this.ctx.beginPath();
        this.ctx.arc(-50, 12 + armSwing * 0.5, 7, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(28, 12 - armSwing * 0.5, 7, 0, Math.PI * 2);
        this.ctx.fill();

        // Ondas de energía (círculos que emanan)
        for (let i = 0; i < 3; i++) {
            const waveT = (t * 0.8 + i * 0.6) % 2;
            const waveR = waveT * 60;
            const waveAlpha = (1 - waveT * 0.5) * 0.25;
            this.ctx.beginPath();
            this.ctx.arc(-12, 14, waveR, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(212,175,55,${waveAlpha})`;
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();
        }

        this.ctx.restore();

        // Texto
        this.ctx.fillStyle = `rgba(212,175,55,${0.40 + 0.12 * Math.sin(t * 0.5)})`;
        this.ctx.font = `300 ${Math.min(W * 0.038, 16)}px Lato, sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText('RESTAURACIÓN BIOMECÁNICA', cx, H * 0.5 + 130 * scale);
    },

    // ════════════════════════════════════════════════════════════════
    // ESCENA 3 — BIENVENIDA (dos siluetas saludándose)
    // ════════════════════════════════════════════════════════════════
    draw_saludo: function() {
        const W = window.innerWidth, H = window.innerHeight;
        const t = this.time;
        const scale = Math.min(W, H) / 400;
        const cx = W / 2, cy = H * 0.48;

        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.scale(scale, scale);

        // Glow central
        const glow = this.ctx.createRadialGradient(0, 0, 0, 0, 0, 180);
        glow.addColorStop(0, 'rgba(212,175,55,0.12)');
        glow.addColorStop(1, 'transparent');
        this.ctx.fillStyle = glow;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 180, 0, Math.PI * 2);
        this.ctx.fill();

        const drawPerson = (x, dir, color, armAngle) => {
            this.ctx.fillStyle = color;
            this.ctx.strokeStyle = color;

            // Cuerpo
            this.ctx.beginPath();
            this.ctx.ellipse(x, 30, 16, 45, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Cabeza
            this.ctx.beginPath();
            this.ctx.arc(x, -28, 20, 0, Math.PI * 2);
            this.ctx.fill();

            // Piernas
            this.ctx.beginPath();
            this.ctx.moveTo(x - 8, 70);
            this.ctx.lineTo(x - 12, 110);
            this.ctx.moveTo(x + 8, 70);
            this.ctx.lineTo(x + 12, 110);
            this.ctx.lineWidth = 12;
            this.ctx.lineCap = 'round';
            this.ctx.stroke();

            // Brazo extendido hacia el centro
            const handX = x + dir * (60 + Math.sin(armAngle) * 8);
            const handY = 10 + Math.cos(armAngle * 0.5) * 5;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 10);
            this.ctx.bezierCurveTo(x + dir * 30, 0, x + dir * 50, handY, handX, handY);
            this.ctx.lineWidth = 11;
            this.ctx.stroke();

            // Mano
            this.ctx.beginPath();
            this.ctx.arc(handX, handY, 8, 0, Math.PI * 2);
            this.ctx.fill();

            // Brazo al lado
            this.ctx.beginPath();
            this.ctx.moveTo(x, 10);
            this.ctx.bezierCurveTo(x - dir * 25, 20, x - dir * 35, 50, x - dir * 30, 65);
            this.ctx.lineWidth = 11;
            this.ctx.stroke();
        };

        // Partícula de encuentro (manos)
        const handMeet = Math.sin(t * 0.7) * 10;
        for (let i = 0; i < 4; i++) {
            const sparkT = (t * 1.5 + i * 1.1) % Math.PI * 2;
            const sparkAlpha = Math.max(0, Math.sin(sparkT) * 0.6);
            const sparkR = Math.sin(sparkT) * 18;
            const sparkAngle = (i / 4) * Math.PI * 2 + t;
            this.ctx.beginPath();
            this.ctx.arc(Math.cos(sparkAngle) * sparkR, 10 + Math.sin(sparkAngle) * sparkR, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(212,175,55,${sparkAlpha})`;
            this.ctx.fill();
        }

        drawPerson(-70, 1, `rgba(0,255,204,0.78)`, t * 0.8);
        drawPerson(70, -1, `rgba(212,175,55,0.78)`, t * 0.8 + 0.3);

        // Línea de energía entre manos
        this.ctx.beginPath();
        this.ctx.moveTo(-10 + handMeet, 10);
        this.ctx.lineTo(10 - handMeet, 10);
        this.ctx.strokeStyle = `rgba(255,255,200,${0.5 + 0.5 * Math.sin(t * 2)})`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.restore();

        this.ctx.fillStyle = `rgba(212,175,55,${0.38 + 0.12 * Math.sin(t * 0.6)})`;
        this.ctx.font = `300 ${Math.min(W * 0.038, 16)}px Lato, sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText('BIENVENIDO A VALTARA', cx, H * 0.48 + 125 * scale);
    },

    // ════════════════════════════════════════════════════════════════
    // ESCENA 4 — DIFUSOR AROMÁTICO
    // ════════════════════════════════════════════════════════════════
    draw_difusor: function() {
        const W = window.innerWidth, H = window.innerHeight;
        const t = this.time;
        const cx = W / 2, cy = H * 0.56;
        const scale = Math.min(W, H) / 440;

        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.scale(scale, scale);

        // Glow base
        const glow = this.ctx.createRadialGradient(0, 20, 0, 0, 20, 160);
        glow.addColorStop(0, 'rgba(0,255,204,0.12)');
        glow.addColorStop(0.5, 'rgba(123,47,190,0.06)');
        glow.addColorStop(1, 'transparent');
        this.ctx.fillStyle = glow;
        this.ctx.beginPath();
        this.ctx.arc(0, 20, 160, 0, Math.PI * 2);
        this.ctx.fill();

        // Base del difusor
        this.ctx.fillStyle = 'rgba(212,175,55,0.15)';
        this.ctx.beginPath();
        this.ctx.ellipse(0, 95, 55, 12, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Cuerpo del difusor (forma de gota)
        const dg = this.ctx.createLinearGradient(0, -60, 0, 100);
        dg.addColorStop(0, 'rgba(0,255,204,0.55)');
        dg.addColorStop(0.5, 'rgba(123,47,190,0.45)');
        dg.addColorStop(1, 'rgba(212,175,55,0.30)');

        this.ctx.beginPath();
        this.ctx.moveTo(0, -60);
        this.ctx.bezierCurveTo(50, -20, 55, 30, 50, 70);
        this.ctx.bezierCurveTo(45, 92, -45, 92, -50, 70);
        this.ctx.bezierCurveTo(-55, 30, -50, -20, 0, -60);
        this.ctx.fillStyle = dg;
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(0,255,204,0.35)';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();

        // Brillo lateral
        const shine = this.ctx.createLinearGradient(-30, 0, 10, 0);
        shine.addColorStop(0, 'rgba(255,255,255,0.0)');
        shine.addColorStop(0.5, 'rgba(255,255,255,0.15)');
        shine.addColorStop(1, 'rgba(255,255,255,0.0)');
        this.ctx.beginPath();
        this.ctx.ellipse(-18, 10, 12, 40, -0.3, 0, Math.PI * 2);
        this.ctx.fillStyle = shine;
        this.ctx.fill();

        // Vapores que ascienden (3 hilos serpenteantes)
        for (let v = 0; v < 3; v++) {
            const vOffset = v * 18 - 18;
            const vPhase  = t * 0.9 + v * 1.1;
            const vAlpha  = 0.45 + 0.2 * Math.sin(t + v);

            this.ctx.beginPath();
            this.ctx.moveTo(vOffset, -65);

            for (let y = 0; y >= -120; y -= 15) {
                const x = vOffset + Math.sin(vPhase + y * 0.04) * (14 + v * 5);
                this.ctx.lineTo(x, -65 + y);
            }

            this.ctx.strokeStyle = `rgba(0,255,204,${vAlpha})`;
            this.ctx.lineWidth   = 2.5 - v * 0.5;
            this.ctx.lineCap     = 'round';
            this.ctx.lineJoin    = 'round';
            this.ctx.stroke();

            // Gota en la punta del vapor
            const tipY = -65 - 120 + Math.sin(t * 1.2 + v) * 10;
            const tipX = vOffset + Math.sin(vPhase + 8) * (14 + v * 5);
            this.ctx.beginPath();
            this.ctx.arc(tipX, tipY, 4 - v * 0.5, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0,255,204,${vAlpha * 0.8})`;
            this.ctx.fill();
        }

        // Luz interior pulsante
        const pulse = 0.2 + 0.15 * Math.sin(t * 1.4);
        const innerGlow = this.ctx.createRadialGradient(0, 20, 0, 0, 20, 40);
        innerGlow.addColorStop(0, `rgba(255,255,255,${pulse})`);
        innerGlow.addColorStop(1, 'transparent');
        this.ctx.fillStyle = innerGlow;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 20, 40, 50, 0, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();

        this.ctx.fillStyle = `rgba(212,175,55,${0.38 + 0.12 * Math.sin(t * 0.5)})`;
        this.ctx.font = `300 ${Math.min(W * 0.038, 16)}px Lato, sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText('AROMATERAPIA CLÍNICA', cx, H * 0.56 + 130 * scale);
    },

    // ════════════════════════════════════════════════════════════════
    // ESCENA 5 — CORAZÓN QUE LATE
    // ════════════════════════════════════════════════════════════════
    draw_corazon: function() {
        const W = window.innerWidth, H = window.innerHeight;
        const t = this.time;
        const cx = W / 2, cy = H * 0.5;

        // Pulso tipo latido (dos picos rápidos, luego pausa)
        const phase = t % (Math.PI * 2);
        let beat = 0;
        if (phase < 0.4)       beat = Math.sin(phase * Math.PI / 0.4);
        else if (phase < 0.9)  beat = Math.sin((phase - 0.4) * Math.PI / 0.5) * 0.7;
        const scale = (Math.min(W, H) / 420) * (1 + beat * 0.12);

        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.scale(scale, scale);

        const R = 90;

        // Glow exterior que pulsa
        const glowR = R * (1.5 + beat * 0.4);
        const glowOuter = this.ctx.createRadialGradient(0, 0, 0, 0, 0, glowR);
        glowOuter.addColorStop(0, `rgba(212,175,55,${0.12 + beat * 0.10})`);
        glowOuter.addColorStop(0.5, `rgba(178,0,255,${0.06 + beat * 0.04})`);
        glowOuter.addColorStop(1, 'transparent');
        this.ctx.fillStyle = glowOuter;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, glowR, 0, Math.PI * 2);
        this.ctx.fill();

        // Corazón con path bezier
        const drawHeart = (size, alpha, fillColor) => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, size * 0.35);
            this.ctx.bezierCurveTo(-size, -size * 0.1, -size * 1.1, -size * 0.6, 0, -size * 0.35);
            this.ctx.bezierCurveTo(size * 1.1, -size * 0.6, size, -size * 0.1, 0, size * 0.35);
            this.ctx.fillStyle = fillColor.replace('ALPHA', String(alpha));
            this.ctx.fill();
        };

        // Sombra
        drawHeart(R * 1.05, 0.18, 'rgba(0,0,0,ALPHA)');

        // Corazón principal con gradiente
        const hg = this.ctx.createLinearGradient(0, -R * 0.6, 0, R * 0.4);
        hg.addColorStop(0, `rgba(255,200,80,${0.85 + beat * 0.1})`);
        hg.addColorStop(0.4, `rgba(212,175,55,${0.75 + beat * 0.1})`);
        hg.addColorStop(1, `rgba(178,120,20,${0.55})`);

        this.ctx.beginPath();
        this.ctx.moveTo(0, R * 0.35);
        this.ctx.bezierCurveTo(-R, -R * 0.1, -R * 1.1, -R * 0.6, 0, -R * 0.35);
        this.ctx.bezierCurveTo(R * 1.1, -R * 0.6, R, -R * 0.1, 0, R * 0.35);
        this.ctx.fillStyle = hg;
        this.ctx.fill();

        // Brillo interior
        this.ctx.beginPath();
        this.ctx.ellipse(-R * 0.3, -R * 0.25, R * 0.2, R * 0.35, -0.5, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255,255,220,${0.18 + beat * 0.08})`;
        this.ctx.fill();

        // Líneas de pulso que emanan (ondas)
        for (let i = 0; i < 4; i++) {
            const waveAge = ((t * 0.8 + i * 0.5) % 2.5) / 2.5;
            const waveR   = waveAge * R * 2.5;
            const waveA   = (1 - waveAge) * 0.22;
            if (waveA > 0.01) {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, waveR, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(212,175,55,${waveA})`;
                this.ctx.lineWidth = 1.5;
                this.ctx.stroke();
            }
        }

        this.ctx.restore();

        // Texto
        const textAlpha = 0.38 + 0.12 * Math.sin(t * 0.5);
        this.ctx.fillStyle = `rgba(212,175,55,${textAlpha})`;
        this.ctx.font = `300 ${Math.min(W * 0.038, 16)}px Lato, sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText('BIENESTAR CON ALMA', cx, cy + 135);
    },

    // ════════════════════════════════════════════════════════════════
    // ESCENA 6 — TEXTO ANIMADO
    // ════════════════════════════════════════════════════════════════
    draw_texto: function() {
        const W = window.innerWidth, H = window.innerHeight;
        const t = this.time;

        // Ciclos de 5 frases
        const frases = [
            'Tu Momento',
            'Tu Armonía',
            'Tu Bienestar',
            'Tu Descanso',
            'Valtara'
        ];
        const cycleDuration = 3.5;
        const totalDuration = frases.length * cycleDuration;
        const cycleT = t % totalDuration;
        const fraseIdx = Math.floor(cycleT / cycleDuration);
        const fraseT   = (cycleT % cycleDuration) / cycleDuration;

        // Fade in/out suave
        let alpha;
        if (fraseT < 0.15)       alpha = fraseT / 0.15;
        else if (fraseT > 0.78)  alpha = (1 - fraseT) / 0.22;
        else                     alpha = 1;
        alpha = Math.max(0, Math.min(1, alpha));

        // Partículas flotantes de fondo
        const particleCount = 18;
        for (let i = 0; i < particleCount; i++) {
            const px = (Math.sin(t * 0.3 + i * 2.4) * 0.5 + 0.5) * W;
            const py = ((t * 0.015 + i * 0.055) % 1) * H;
            const pr = 1.5 + Math.sin(t + i) * 1;
            const pa = (0.08 + 0.08 * Math.sin(t * 0.8 + i)) * alpha;
            this.ctx.beginPath();
            this.ctx.arc(px, py, pr, 0, Math.PI * 2);
            this.ctx.fillStyle = i % 2 === 0
                ? `rgba(212,175,55,${pa})`
                : `rgba(0,255,204,${pa * 0.7})`;
            this.ctx.fill();
        }

        // Separador decorativo
        const lineW = Math.min(W * 0.25, 100) * alpha;
        this.ctx.strokeStyle = `rgba(212,175,55,${0.45 * alpha})`;
        this.ctx.lineWidth = 0.8;
        this.ctx.beginPath();
        this.ctx.moveTo(W/2 - lineW, H * 0.42);
        this.ctx.lineTo(W/2 + lineW, H * 0.42);
        this.ctx.stroke();

        // Texto principal
        const fontSize = Math.min(W * 0.10, 48);
        this.ctx.font = `400 ${fontSize}px 'Playfair Display', Georgia, serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Sombra dorada
        this.ctx.shadowColor = `rgba(212,175,55,${0.5 * alpha})`;
        this.ctx.shadowBlur  = 30;

        const gradient = this.ctx.createLinearGradient(W/2 - 150, 0, W/2 + 150, 0);
        gradient.addColorStop(0,   `rgba(255,230,100,${alpha})`);
        gradient.addColorStop(0.5, `rgba(212,175,55,${alpha})`);
        gradient.addColorStop(1,   `rgba(255,200,60,${alpha})`);

        this.ctx.fillStyle = gradient;
        this.ctx.fillText(frases[fraseIdx] || '', W/2, H * 0.48);
        this.ctx.shadowBlur = 0;

        // Subtexto
        const subSize = Math.min(W * 0.036, 15);
        this.ctx.font = `300 ${subSize}px Lato, sans-serif`;
        this.ctx.fillStyle = `rgba(255,255,255,${0.25 * alpha})`;
        this.ctx.letterSpacing = '0.3em';
        this.ctx.fillText('VALTARA EXECUTIVE THERAPY', W/2, H * 0.48 + fontSize * 1.4);

        // Separador inferior
        this.ctx.strokeStyle = `rgba(212,175,55,${0.35 * alpha})`;
        this.ctx.beginPath();
        this.ctx.moveTo(W/2 - lineW * 0.6, H * 0.48 + fontSize * 2.1);
        this.ctx.lineTo(W/2 + lineW * 0.6, H * 0.48 + fontSize * 2.1);
        this.ctx.stroke();
    },

    // ════════════════════════════════════════════════════════════════
    // SELECTOR DE FONDOS
    // ════════════════════════════════════════════════════════════════
    injectSelectorStyles: function() {
        if (document.getElementById('valtara-bg-styles')) return;
        const s = document.createElement('style');
        s.id = 'valtara-bg-styles';
        s.textContent = `
            #bg-selector-sheet {
                position: fixed;
                bottom: 0; left: 0; right: 0;
                z-index: 19000;
                background: rgba(8, 8, 14, 0.97);
                border-top: 1px solid rgba(212,175,55,0.3);
                border-radius: 24px 24px 0 0;
                padding: 20px 16px calc(80px + env(safe-area-inset-bottom,0px));
                transform: translateY(100%);
                transition: transform 0.42s cubic-bezier(0.34,1.56,0.64,1);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
            }
            #bg-selector-sheet.open { transform: translateY(0); }
            #bg-selector-sheet h3 {
                font-size: 1rem;
                font-weight: 400;
                color: rgba(255,255,255,0.55);
                text-align: center;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                font-family: 'Lato', sans-serif;
                margin: 0 0 18px;
            }
            #bg-selector-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
            }
            .bg-scene-btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 6px;
                padding: 12px 6px;
                border: 1px solid rgba(255,255,255,0.12);
                border-radius: 14px;
                background: rgba(255,255,255,0.04);
                cursor: pointer;
                transition: border-color 0.2s ease, background 0.2s ease;
                -webkit-tap-highlight-color: transparent;
            }
            .bg-scene-btn:active { transform: scale(0.94) !important; }
            .bg-scene-icon {
                font-size: 1.5rem;
                line-height: 1;
            }
            .bg-scene-label {
                font-size: 0.65rem;
                color: rgba(255,255,255,0.5);
                font-family: 'Lato', sans-serif;
                text-align: center;
                line-height: 1.3;
            }
            #bg-close-btn {
                display: block;
                width: 40px;
                height: 4px;
                background: rgba(255,255,255,0.2);
                border-radius: 2px;
                margin: 0 auto 16px;
                border: none;
                cursor: pointer;
            }
            #bg-overlay {
                position: fixed;
                inset: 0;
                z-index: 18999;
                background: transparent;
                display: none;
                touch-action: none; /* captura el toque pero no bloquea el JS scroll */
            }
            #bg-overlay.open { display: block; }
        `;
        document.head.appendChild(s);
    },

    injectMenuButton: function() {
        // Inyectar botón en el panel "Más" → sección "Más secciones"
        const secList = document.querySelector('[aria-labelledby="nav-sec-label"]');
        if (!secList) return;

        const li = document.createElement('li');
        li.setAttribute('role', 'none');
        li.innerHTML = `<button role="menuitem" class="nav-item" id="btn-bg-selector" type="button">
            <i aria-hidden="true" class="fa-solid fa-wand-sparkles"></i>
            <span>Aprecia nuestro fondo</span>
        </button>`;
        secList.appendChild(li);

        document.getElementById('btn-bg-selector').addEventListener('click', () => {
            // Cerrar el menú lateral
            const nav = document.getElementById('main-nav');
            if (nav) {
                nav.classList.remove('open');
                if (window.CoreEngine) CoreEngine.unlockBodyScroll();
            }
            setTimeout(() => this.openSelector(), 300);
        });

        // Crear el sheet del selector
        this.createSelectorSheet();
    },

    createSelectorSheet: function() {
        // Overlay
        const overlay = document.createElement('div');
        overlay.id = 'bg-overlay';
        overlay.addEventListener('click', () => this.closeSelector());
        document.body.appendChild(overlay);

        // Sheet
        const sheet = document.createElement('div');
        sheet.id = 'bg-selector-sheet';
        sheet.setAttribute('role', 'dialog');
        sheet.setAttribute('aria-label', 'Seleccionar fondo animado');

        const closeBar = document.createElement('button');
        closeBar.id = 'bg-close-btn';
        closeBar.setAttribute('aria-label', 'Cerrar selector de fondos');
        closeBar.addEventListener('click', () => this.closeSelector());

        const title = document.createElement('h3');
        title.textContent = 'Elige tu fondo';

        const grid = document.createElement('div');
        grid.id = 'bg-selector-grid';

        Object.entries(this.scenes).forEach(([key, scene]) => {
            const btn = document.createElement('button');
            btn.className = 'bg-scene-btn';
            btn.setAttribute('data-scene', key);
            btn.setAttribute('aria-label', `Fondo: ${scene.label}`);
            btn.innerHTML = `
                <span class="bg-scene-icon" aria-hidden="true">${scene.icon}</span>
                <span class="bg-scene-label">${scene.label}</span>
            `;
            btn.addEventListener('click', () => {
                this.applyTheme(key);
                if (window.A11yEngine) A11yEngine.announce(`Fondo cambiado a ${scene.label}`);
            });
            grid.appendChild(btn);
        });

        sheet.appendChild(closeBar);
        sheet.appendChild(title);
        sheet.appendChild(grid);
        document.body.appendChild(sheet);

        // Marcar el activo inicial
        setTimeout(() => this.applyTheme(this.current), 100);
    },

    openSelector: function() {
        document.getElementById('bg-selector-sheet')?.classList.add('open');
        document.getElementById('bg-overlay')?.classList.add('open');
        // Guardar posición actual del scroll y bloquear solo el body (no el canvas)
        this._scrollY = window.scrollY;
        document.body.style.overflow = 'hidden';
    },

    closeSelector: function() {
        document.getElementById('bg-selector-sheet')?.classList.remove('open');
        document.getElementById('bg-overlay')?.classList.remove('open');
        // Liberar scroll siempre — evita el bloqueo residual
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.documentElement.style.overflow = '';
        document.body.classList.remove('scroll-locked');
    },

    // ── PERSISTENCIA ─────────────────────────────────────────────────
    savePreference: function() {
        try { localStorage.setItem(this.STORAGE_KEY, this.current); } catch(e) {}
    },

    loadPreference: function() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved && this.scenes[saved]) this.current = saved;
        } catch(e) {}
    }
};

document.addEventListener('DOMContentLoaded', () => ValtaraBackgrounds.init());
