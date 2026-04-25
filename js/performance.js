/**
 * ====================================================================================
 * VALTARA PERFORMANCE ENGINE V40.0
 * ------------------------------------------------------------------------------------
 * Resuelve los 5 cuellos de botella de temperatura y GPU:
 *
 * 1. CANVAS ÚNICO reemplaza los 5 orbs CSS con blur individual
 *    → De 5 capas GPU a 1 sola capa composited
 *    → Reducción estimada: 60-75% de carga GPU en el fondo animado
 *
 * 2. CALIDAD ADAPTATIVA basada en FPS real medido en tiempo de ejecución
 *    → HIGH (60fps+): Canvas completo, 5 orbs, movimiento fluido
 *    → MEDIUM (45-59fps): 3 orbs, radio reducido, sin mix-blend
 *    → ECO (<45fps o batería baja): Canvas estático, animaciones desactivadas
 *
 * 3. BATTERY API: Modo Eco automático al bajar del 20% de batería
 *
 * 4. SPRING ANIMATIONS: Easing con física de resorte para elementos interactivos
 *    → Más naturales y vívidas que cubic-bezier estático
 *
 * 5. REVEAL SYSTEM: IntersectionObserver para animaciones de entrada en secciones
 *    → Las animaciones solo corren cuando el elemento es visible
 *    → Elimina repaints en secciones fuera de pantalla
 *
 * Archivo: js/performance.js
 * Ubicación: carpeta js/
 * Agregar en index.html antes de </body>:
 *   <script src="js/performance.js?v=40.0.0" defer></script>
 * ====================================================================================
 */

const ValtaraPerformance = {

    // ── Estado del motor ───────────────────────────────────────────
    quality: 'HIGH',           // HIGH | MEDIUM | ECO
    fps: 60,
    fpsHistory: [],
    lastFrameTime: 0,
    rafId: null,
    isVisible: true,
    batteryLevel: 1,
    isCharging: true,

    // ── Canvas ─────────────────────────────────────────────────────
    canvas: null,
    ctx: null,
    orbs: [],
    time: 0,

    // ── Configuración por calidad ──────────────────────────────────
    qualityConfig: {
        // mixBlend:false en todos — 'screen' solapaba orbs y los hacía cegadores
        HIGH:   { orbCount: 5, blurAmount: 120, opacity: 0.38, speed: 0.0004, mixBlend: false },
        MEDIUM: { orbCount: 3, blurAmount: 80,  opacity: 0.28, speed: 0.0003, mixBlend: false },
        ECO:    { orbCount: 0, blurAmount: 0,   opacity: 0,    speed: 0,      mixBlend: false }
    },

    // ── Colores de los orbs (espejo de las variables CSS) ──────────
    orbColors: [
        { h: 290, s: 80, l: 45 },  // morado vivo
        { h: 160, s: 70, l: 50 },  // verde menta / cian
        { h: 45,  s: 85, l: 55 },  // dorado arena
        { h: 185, s: 90, l: 50 },  // cian brillante
        { h: 320, s: 75, l: 40 }   // magenta profundo
    ],

    // ================================================================================
    // 1. INICIALIZACIÓN
    // ================================================================================
    init: function() {
        console.log('⚡ [PERFORMANCE V40.0] Iniciando motor de rendimiento...');

        this.overrideCSSBottlenecks();
        this.initCanvas();
        this.initOrbs();
        this.startFPSMonitor();
        this.initBatteryAPI();
        this.initVisibilityObserver();
        this.initRevealSystem();
        this.initSpringAnimations();
        this.startLoop();

        console.log('✅ [PERFORMANCE] Motor activo. Calidad inicial: HIGH');
    },

    // ================================================================================
    // 2. ANULAR LOS CUELLOS DE BOTELLA CSS — inyectado inline, sin tocar main.css
    // ================================================================================
    overrideCSSBottlenecks: function() {
        if (document.getElementById('valtara-perf-overrides')) return;

        const style = document.createElement('style');
        style.id = 'valtara-perf-overrides';
        style.textContent = `
            /*
             * ── Orbs CSS: ocultamos los originales ────────────────────────────
             * El canvas los reemplaza. Dejamos el DOM intacto para no romper
             * referencias existentes.
             */
            .orb {
                display: none !important;
            }

            /*
             * ── glass-overlay: quitamos el backdrop-filter ───────────────────
             * Era el culpable #2. El canvas ya provee la difuminación visual.
             * Mantenemos el gradiente oscuro para profundidad.
             */
            .glass-overlay {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: radial-gradient(ellipse at center,
                    transparent 0%,
                    rgba(5, 5, 10, 0.25) 60%,
                    rgba(5, 5, 10, 0.55) 100%
                ) !important;
            }

            /*
             * ── fadeInView: eliminamos el blur de transición ─────────────────
             * filter:blur() en animaciones = repaint completo en cada frame.
             * Lo reemplazamos con solo opacity + translate (compositor-friendly).
             */
            @keyframes fadeInView {
                from { opacity: 0; transform: translateY(20px); }
                to   { opacity: 1; transform: translateY(0);    }
            }

            /*
             * ── Mensajes de chat: quitamos backdrop-filter ───────────────────
             * Cada burbuja de Aura generaba una capa GPU nueva.
             * Usamos un fondo sólido semitransparente que se ve igual.
             */
            .msg.bot {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: linear-gradient(135deg,
                    rgba(0, 30, 30, 0.95),
                    rgba(0, 0, 0, 0.90)
                ) !important;
            }
            .msg.user {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: linear-gradient(135deg,
                    rgba(30, 25, 0, 0.95),
                    rgba(0, 0, 0, 0.90)
                ) !important;
            }

            /*
             * ── will-change: solo en elementos que realmente animan ───────────
             * will-change permanente desperdicia VRAM.
             */
            .bnav-btn,
            .nav-item,
            .msg,
            .a11y-card-btn {
                will-change: auto !important;
            }
            .bnav-btn:hover,
            .nav-item:hover,
            .a11y-card-btn:hover {
                will-change: transform !important;
            }

            /*
             * ── Modo ECO: clase que aplica el motor automáticamente ───────────
             */
            html.valtara-eco .ambient-engine { display: none !important; }
            html.valtara-eco .system-header  { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; background: rgba(5, 5, 10, 0.97) !important; }
            html.valtara-eco .side-menu      { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; background: rgba(5, 5, 10, 0.99) !important; }
            html.valtara-eco .modal-dialog::backdrop { backdrop-filter: none !important; }

            /*
             * ── Indicador de calidad (badge discreto en el menú) ─────────────
             */
            #perf-quality-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                font-size: 0.75rem;
                color: var(--valtara-cian-brillante, #00FFCC);
                opacity: 0.6;
                padding: 4px 10px;
                border: 1px solid rgba(0,255,204,0.2);
                border-radius: 20px;
                margin-top: 1rem;
                font-family: 'Lato', sans-serif;
            }
            #perf-quality-badge.eco   { color: #FFB347; border-color: rgba(255,179,71,0.2); }
            #perf-quality-badge.high  { color: #00FFCC; border-color: rgba(0,255,204,0.2); }

            /*
             * ── Reveal System: animaciones de entrada por scroll ─────────────
             */
            .v-reveal {
                opacity: 0;
                transform: translateY(32px);
                transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .v-reveal.v-reveal--visible {
                opacity: 1;
                transform: translateY(0);
            }
            .v-reveal[data-delay="1"] { transition-delay: 0.08s; }
            .v-reveal[data-delay="2"] { transition-delay: 0.16s; }
            .v-reveal[data-delay="3"] { transition-delay: 0.24s; }
            .v-reveal[data-delay="4"] { transition-delay: 0.32s; }
            .v-reveal[data-delay="5"] { transition-delay: 0.40s; }
        `;
        document.head.appendChild(style);
    },

    // ================================================================================
    // 3. CANVAS — Reemplaza los 5 orbs CSS
    // ================================================================================
    initCanvas: function() {
        const ambientBg = document.getElementById('ambient-bg');
        if (!ambientBg) return;

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'valtara-orb-canvas';
        this.canvas.setAttribute('aria-hidden', 'true');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 0;
            pointer-events: none;
        `;

        ambientBg.insertBefore(this.canvas, ambientBg.firstChild);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        window.addEventListener('resize', () => this.resizeCanvas(), { passive: true });
    },

    resizeCanvas: function() {
        if (!this.canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // Máx 2x para evitar sobrecargar
        this.canvas.width  = window.innerWidth  * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width  = window.innerWidth  + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        if (this.ctx) this.ctx.scale(dpr, dpr);
    },

    // ================================================================================
    // 4. ORBS — Física de movimiento orgánico (sin CSS, sin repaint)
    // ================================================================================
    initOrbs: function() {
        this.orbs = this.orbColors.map((color, i) => ({
            color,
            // Posición inicial distribuida estratégicamente
            x:    (i % 3 === 0 ? 0.15 : i % 3 === 1 ? 0.5 : 0.85) * window.innerWidth,
            y:    (Math.floor(i / 3) === 0 ? 0.2 : 0.75) * window.innerHeight,
            // Velocidad y dirección de movimiento (única por orb)
            vx:   (Math.random() - 0.5) * 0.4,
            vy:   (Math.random() - 0.5) * 0.4,
            // Radio base (proporcional a la pantalla)
            radius: Math.min(window.innerWidth, window.innerHeight) * (0.28 + Math.random() * 0.12),
            // Fase de tiempo para movimiento sinusoidal (offset único)
            phase: (i / 5) * Math.PI * 2,
            // Parámetros de movimiento Lissajous (movimiento orgánico sin repetición)
            freqX: 0.23 + i * 0.07,
            freqY: 0.19 + i * 0.05,
            ampX:  window.innerWidth  * (0.12 + Math.random() * 0.08),
            ampY:  window.innerHeight * (0.10 + Math.random() * 0.07),
            // Centro de órbita
            centerX: (0.15 + (i / 4) * 0.7) * window.innerWidth,
            centerY: (0.2  + (i % 3) / 2.5) * window.innerHeight,
        }));
    },

    // ================================================================================
    // 5. LOOP PRINCIPAL DE ANIMACIÓN
    // ================================================================================
    startLoop: function() {
        const loop = (timestamp) => {
            this.rafId = requestAnimationFrame(loop);

            // Medir FPS
            if (this.lastFrameTime) {
                const delta = timestamp - this.lastFrameTime;
                const instantFPS = 1000 / delta;
                this.fpsHistory.push(instantFPS);
                if (this.fpsHistory.length > 30) this.fpsHistory.shift();
            }
            this.lastFrameTime = timestamp;

            // No renderizar si la pestaña no está visible o calidad ECO
            if (!this.isVisible || this.quality === 'ECO') return;

            const config = this.qualityConfig[this.quality];
            this.time += config.speed * 16; // ~16ms por frame a 60fps

            this.drawFrame(config);
        };
        this.rafId = requestAnimationFrame(loop);
    },

    // ================================================================================
    // 6. RENDERIZADO DEL FRAME — Un solo draw call composited
    // ================================================================================
    drawFrame: function(config) {
        if (!this.ctx || !this.canvas) return;

        const W = window.innerWidth;
        const H = window.innerHeight;

        // Limpiar con fade (trail effect sutil sin repaint completo)
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.fillStyle = 'rgba(5, 5, 10, 0.72)';
        this.ctx.fillRect(0, 0, W, H);

        // Modo de compositing para efecto luminoso (solo en HIGH)
        this.ctx.globalCompositeOperation = 'source-over'; // screen eliminado: acumulaba brillo

        const activeOrbs = this.orbs.slice(0, config.orbCount);

        activeOrbs.forEach((orb, i) => {
            // Posición con movimiento Lissajous (orgánico, nunca se repite exactamente)
            const x = orb.centerX + Math.sin(this.time * orb.freqX + orb.phase) * orb.ampX;
            const y = orb.centerY + Math.cos(this.time * orb.freqY + orb.phase * 0.7) * orb.ampY;

            // Pulso de opacidad (respiración)
            const breathe = 0.5 + 0.5 * Math.sin(this.time * 2.1 + orb.phase);
            const opacity  = config.opacity * (0.65 + breathe * 0.35);

            // Radio con micro-pulso
            const radius = orb.radius * (0.92 + breathe * 0.08);

            // Gradiente radial (sustituto eficiente del CSS blur)
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
            const { h, s, l } = orb.color;

            gradient.addColorStop(0,   `hsla(${h}, ${s}%, ${Math.min(l + 4, 65)}%, ${opacity})`);
            gradient.addColorStop(0.30, `hsla(${h}, ${s}%, ${l - 5}%, ${opacity * 0.45})`);
            gradient.addColorStop(0.60, `hsla(${h}, ${s}%, ${l - 12}%, ${opacity * 0.12})`);
            gradient.addColorStop(1,   `hsla(${h}, ${s}%, ${l - 20}%, 0)`);

            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });

        // Overlay oscuro en los bordes para profundidad (vignette)
        this.ctx.globalCompositeOperation = 'source-over';
        const vignette = this.ctx.createRadialGradient(W/2, H/2, H * 0.25, W/2, H/2, H * 0.85);
        vignette.addColorStop(0, 'rgba(5, 5, 10, 0)');
        vignette.addColorStop(1, 'rgba(5, 5, 10, 0.80)');
        this.ctx.fillStyle = vignette;
        this.ctx.fillRect(0, 0, W, H);
    },

    // ================================================================================
    // 7. MONITOR DE FPS — Adapta la calidad en tiempo real
    // ================================================================================
    startFPSMonitor: function() {
        setInterval(() => {
            if (this.fpsHistory.length < 10) return;

            // Promedio de los últimos 30 frames
            this.fps = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;

            let targetQuality = 'HIGH';
            if (this.fps < 45 || (!this.isCharging && this.batteryLevel < 0.20)) {
                targetQuality = 'ECO';
            } else if (this.fps < 55) {
                targetQuality = 'MEDIUM';
            }

            if (targetQuality !== this.quality) {
                this.setQuality(targetQuality);
            }

            this.updateQualityBadge();
        }, 3000); // Evaluar cada 3 segundos
    },

    setQuality: function(level) {
        this.quality = level;
        const html = document.documentElement;

        if (level === 'ECO') {
            html.classList.add('valtara-eco');
            console.log('🌿 [PERFORMANCE] Modo ECO activado — temperatura alta o batería baja');
        } else {
            html.classList.remove('valtara-eco');
        }

        // Ajustar canvas según la nueva calidad
        if (level === 'ECO' && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },

    updateQualityBadge: function() {
        let badge = document.getElementById('perf-quality-badge');
        if (!badge) {
            // Insertar el badge discretamente al final del panel "Más"
            const footer = document.getElementById('main-footer');
            if (footer) {
                badge = document.createElement('div');
                badge.id = 'perf-quality-badge';
                footer.parentElement.appendChild(badge);
            }
        }
        if (!badge) return;

        const icons = { HIGH: '◉', MEDIUM: '◎', ECO: '○' };
        const labels = { HIGH: `${Math.round(this.fps)}fps · Ultra`, MEDIUM: `${Math.round(this.fps)}fps · Balanceado`, ECO: 'Modo Eco' };
        badge.textContent = `${icons[this.quality]} ${labels[this.quality]}`;
        badge.className = '';
        badge.classList.add(this.quality === 'ECO' ? 'eco' : 'high');
    },

    // ================================================================================
    // 8. BATTERY API — Eco automático en batería baja
    // ================================================================================
    initBatteryAPI: function() {
        if (!navigator.getBattery) return;

        navigator.getBattery().then(battery => {
            this.batteryLevel  = battery.level;
            this.isCharging    = battery.charging;

            battery.addEventListener('levelchange', () => {
                this.batteryLevel = battery.level;
                if (battery.level < 0.20 && !battery.charging && this.quality !== 'ECO') {
                    this.setQuality('ECO');
                    console.log('🔋 [PERFORMANCE] Batería < 20% — Modo Eco activado');
                }
            });

            battery.addEventListener('chargingchange', () => {
                this.isCharging = battery.charging;
                if (battery.charging && this.quality === 'ECO') {
                    // Al conectar el cargador, volver a HIGH después de 5s
                    setTimeout(() => this.setQuality('HIGH'), 5000);
                }
            });
        }).catch(() => {});
    },

    // ================================================================================
    // 9. VISIBILITY OBSERVER — Pausa el canvas cuando la pestaña no es visible
    // ================================================================================
    initVisibilityObserver: function() {
        document.addEventListener('visibilitychange', () => {
            this.isVisible = document.visibilityState === 'visible';
            if (this.isVisible) {
                this.lastFrameTime = 0; // Resetear medición de FPS
            }
        });
    },

    // ================================================================================
    // 10. REVEAL SYSTEM — Animaciones de entrada al hacer scroll
    // ================================================================================
    initRevealSystem: function() {
        // Añadir clase v-reveal a elementos de contenido dentro de secciones
        // El constructor_maestro los genera dinámicamente, así que esperamos un tick
        setTimeout(() => {
            this.applyRevealClasses();
            this.startRevealObserver();
        }, 800);

        // También aplicar cuando el router cambia de vista
        window.addEventListener('popstate', () => {
            setTimeout(() => {
                this.applyRevealClasses();
                this.startRevealObserver();
            }, 100);
        });

        // Hook al router sin modificarlo: observar cambios de clase 'active' en secciones
        document.querySelectorAll('.view-section').forEach(section => {
            new MutationObserver(() => {
                if (section.classList.contains('active')) {
                    setTimeout(() => {
                        this.applyRevealClasses(section);
                        this.startRevealObserver();
                    }, 50);
                }
            }).observe(section, { attributes: true, attributeFilter: ['class'] });
        });
    },

    applyRevealClasses: function(scope) {
        const root = scope || document;
        const selectors = [
            '.glass-card',
            '.promo-card',
            '.carousel-card',
            '.price-tag',
            'h2:not(.no-reveal)',
            'h3:not(.no-reveal)',
            '.section-hero',
            '.track-btn',
            '.science-block',
            '.faq-item'
        ];

        let delay = 0;
        root.querySelectorAll(selectors.join(', ')).forEach(el => {
            if (!el.classList.contains('v-reveal')) {
                el.classList.add('v-reveal');
                // Stagger escalonado (máx 5 para no esperar demasiado)
                el.setAttribute('data-delay', String(Math.min(delay % 6, 5)));
                delay++;
            }
        });
    },

    startRevealObserver: function() {
        if (this.revealObserver) this.revealObserver.disconnect();

        this.revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('v-reveal--visible');
                    // Una vez revelado, dejar de observar (optimización)
                    this.revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.v-reveal:not(.v-reveal--visible)').forEach(el => {
            this.revealObserver.observe(el);
        });
    },

    // ================================================================================
    // 11. SPRING ANIMATIONS — Respuesta física a interacciones táctiles
    // ================================================================================
    initSpringAnimations: function() {
        // Inyectar CSS de spring physics
        if (document.getElementById('valtara-spring-styles')) return;

        const style = document.createElement('style');
        style.id = 'valtara-spring-styles';
        style.textContent = `
            /*
             * Easing con sobreimpulso (spring) para interacciones táctiles
             * Se aplica SOLO a elementos interactivos al presionar/soltar
             * cubic-bezier(0.34, 1.56, 0.64, 1) = overshoot de ~15%
             */
            .spring-active {
                transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
                transform: scale(0.94) !important;
            }
            .spring-release {
                transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
                transform: scale(1) !important;
            }

            /*
             * Efecto de brillo en cards al tap (sin JS adicional)
             */
            .glass-card:active,
            .promo-card:active,
            .carousel-card:active {
                transform: scale(0.97) !important;
                transition: transform 0.15s ease !important;
            }

            /*
             * Ripple táctil en botones de navegación inferior
             */
            .bnav-btn {
                overflow: hidden;
                position: relative;
            }
            .bnav-ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(242, 201, 76, 0.25);
                transform: scale(0);
                animation: bnav-ripple-anim 0.45s ease-out forwards;
                pointer-events: none;
            }
            @keyframes bnav-ripple-anim {
                to { transform: scale(3.5); opacity: 0; }
            }

            /*
             * Glow pulse en el logo al cargar
             */
            @keyframes logoEntrance {
                0%   { filter: drop-shadow(0 0 0px rgba(212,175,55,0)); opacity: 0; transform: scale(0.85); }
                60%  { filter: drop-shadow(0 0 20px rgba(212,175,55,0.9)); opacity: 1; transform: scale(1.05); }
                100% { filter: drop-shadow(0 0 8px rgba(212,175,55,0.4)); opacity: 1; transform: scale(1); }
            }
            .logo-img {
                animation: logoEntrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) both !important;
            }

            /*
             * Transición de sección: entrada más elegante
             */
            @keyframes fadeInView {
                from { opacity: 0; transform: translateY(18px) scale(0.995); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
            }

            /*
             * Pulso dorado en el botón de barra inferior activo
             */
            .bnav-btn.bnav-active i {
                animation: iconPulse 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }
            @keyframes iconPulse {
                from { transform: scale(0.7); }
                to   { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        // Efecto ripple en los botones de la barra inferior
        document.querySelectorAll('.bnav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                ripple.className = 'bnav-ripple';
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width  = ripple.style.height = size + 'px';
                ripple.style.left   = (e.clientX - rect.left  - size / 2) + 'px';
                ripple.style.top    = (e.clientY - rect.top   - size / 2) + 'px';
                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 500);
            }, { passive: true });
        });

        // Spring press en cards al tocar
        document.addEventListener('touchstart', (e) => {
            const card = e.target.closest('.glass-card, .carousel-card, .promo-card, .aura-suggestion-card');
            if (card) card.classList.add('spring-active');
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            document.querySelectorAll('.spring-active').forEach(el => {
                el.classList.remove('spring-active');
                el.classList.add('spring-release');
                setTimeout(() => el.classList.remove('spring-release'), 500);
            });
        }, { passive: true });
    }
};

// Arrancar el motor de rendimiento
document.addEventListener('DOMContentLoaded', () => ValtaraPerformance.init());
