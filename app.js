/**
 * ====================================================================================
 * MÓDULO 18: CORE JAVASCRIPT SYSTEM V 9.2 SOVEREIGN
 * ====================================================================================
 */

/**
 * MOTOR CENTRAL DE INTERFAZ Y EXPERIENCIA DE USUARIO (UX Engine)
 */
var UXEngine = {
    init: function() {
        var el = document.querySelectorAll('.reveal, .glass-card, .calendar-integration-box');
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if(entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0) scale(1)";
                    entry.target.style.filter = "blur(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

        for(var i=0; i<el.length; i++) {
            el[i].style.opacity = "0";
            el[i].style.transform = "translateY(40px) scale(0.98)";
            el[i].style.filter = "blur(8px)";
            el[i].style.transition = "all 0.9s cubic-bezier(0.19, 1, 0.22, 1)";
            observer.observe(el[i]);
        }
        
        var headerBtn = document.getElementById('header-logo-btn');
        window.addEventListener('scroll', function() {
            if(window.scrollY > 80) {
                if(headerBtn) headerBtn.classList.add('text-fade-out');
                var header = document.querySelector('.system-header');
                if(header) header.style.background = "rgba(4,4,6,0.98)";
            } else {
                if(headerBtn) headerBtn.classList.remove('text-fade-out');
                var header = document.querySelector('.system-header');
                if(header) header.style.background = "rgba(6,6,10,0.85)";
            }
        });
    },
    showToast: function(msg) {
        var c = document.getElementById('toast-container');
        if(!c) return;
        var t = document.createElement('div');
        t.className = 'toast';
        t.innerHTML = '<i class="fa-solid fa-circle-info"></i><span>' + msg + '</span>';
        c.appendChild(t);
        A11yEngine.announce(msg);
        setTimeout(function() { if(t.parentNode) t.parentNode.removeChild(t); }, 6000);
    }
};

/**
 * ENRUTADOR VIRTUAL SPA (Single Page Application Router)
 */
var AppRouter = {
    navigate: function(viewId, triggerBtn) {
        var views = document.querySelectorAll('.view-container');
        for(var i=0; i<views.length; i++) { views[i].classList.remove('active'); }
        
        var target = document.getElementById(viewId);
        if(target) target.classList.add('active');

        var links = document.querySelectorAll('.menu-link');
        for(var j=0; j<links.length; j++) { links[j].style.borderColor = ""; }
        
        if(triggerBtn && triggerBtn.classList.contains('menu-link')) {
            triggerBtn.style.borderColor = "var(--blanco)";
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        var overlay = document.getElementById('side-menu-overlay');
        if(overlay && overlay.classList.contains('open')) {
            overlay.classList.remove('open');
        }
        
        var title = target ? target.getAttribute('aria-label') : "Inicio";
        A11yEngine.announce("Sección cargada: " + title);
        UXEngine.init();
    }
};

/**
 * SISTEMA DE ACCESIBILIDAD 2.0 (A11Y Engine)
 */
var A11yEngine = {
    fontSize: 15,
    init: function() {
        var storedSize = localStorage.getItem('valtara_font_size');
        if(storedSize) {
            this.fontSize = parseInt(storedSize);
            document.documentElement.style.fontSize = this.fontSize + 'px';
        }
        
        var modes = ['high-contrast', 'invert-colors', 'dyslexia-font', 'text-spacing', 'reading-guide-active', 'focus-mask-active', 'clinical-reading-mode', 'reduced-motion'];
        for(var i=0; i<modes.length; i++) {
            if(localStorage.getItem('valtara_' + modes[i]) === 'true') {
                document.body.classList.add(modes[i]);
                var btn = document.getElementById('btn-' + modes[i].substring(0,3));
                if(btn) btn.classList.add('active-mode');
            }
        }
        
        document.addEventListener('mousemove', function(e) {
            if(document.body.classList.contains('reading-guide-active')) {
                var rg = document.getElementById('reading-guide');
                if(rg) rg.style.top = (e.clientY + 25) + 'px';
            }
            if(document.body.classList.contains('focus-mask-active')) {
                var topM = document.getElementById('focus-mask-top');
                var botM = document.getElementById('focus-mask-bottom');
                var gap = 180;
                if(topM && botM) {
                    topM.style.height = (e.clientY - gap/2) + 'px';
                    botM.style.top = (e.clientY + gap/2) + 'px';
                    botM.style.height = (window.innerHeight - e.clientY - gap/2) + 'px';
                }
            }
        });
    },
    adjustText: function(dir) {
        this.fontSize += (dir * 1);
        if(this.fontSize < 12) this.fontSize = 12;
        if(this.fontSize > 22) this.fontSize = 22;
        document.documentElement.style.fontSize = this.fontSize + 'px';
        localStorage.setItem('valtara_font_size', this.fontSize);
        UXEngine.showToast("Zoom de texto ajustado al " + Math.round((this.fontSize/15)*100) + "%");
    },
    toggleClass: function(cls, btnId, msg) {
        var isActive = document.body.classList.toggle(cls);
        localStorage.setItem('valtara_' + cls, isActive);
        var btn = document.getElementById(btnId);
        if(btn) btn.classList.toggle('active-mode');
        if(msg) this.announce(msg + (isActive ? " Activado" : " Desactivado"));
        UXEngine.showToast(msg + (isActive ? " ON" : " OFF"));
    },
    announce: function(msg) {
        var lr = document.getElementById('a11y-live-region');
        if(lr) {
            lr.textContent = '';
            setTimeout(function() { lr.textContent = msg; }, 100);
        }
    }
};

/**
 * MOTOR DE AUDIO OASIS 9.2 (Síntesis de Frecuencias Solfeggio)
 */
var OasisEngine = {
    ctx: null, mainOsc: null, subOsc: null, lfo: null, panner: null,
    isPlaying: false, currentFreq: 432, visualizerId: null,
    tracks: [
        { id: 1, name: "Sanación Celular y Fascial", freq: 432, icon: "fa-dna" },
        { id: 2, name: "Sincronización Cerebral TDAH", freq: 528, icon: "fa-brain" },
        { id: 3, name: "Reparación DNA (Solfeggio Puro)", freq: 396, icon: "fa-seedling" }
    ],
    init: function() {
        var c = document.getElementById('audio-tracks-container');
        if(!c) return;
        var html = "";
        for(var i=0; i<this.tracks.length; i++) {
            var t = this.tracks[i];
            html += '<button class="audio-track-btn hover-sound" id="track-'+t.id+'" onclick="OasisEngine.loadTrack('+t.freq+', '+t.id+', \''+t.name+'\')"><i class="fa-solid '+t.icon+'"></i> '+t.name+'</button>';
        }
        c.innerHTML = html;
    },
    initAudioContext: function() {
        if(!this.ctx) {
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if(this.ctx.state === 'suspended') this.ctx.resume();
    },
    loadTrack: function(freq, id, name) {
        this.currentFreq = freq;
        var btns = document.querySelectorAll('.audio-track-btn');
        for(var i=0; i<btns.length; i++) { btns[i].classList.remove('playing'); }
        var tb = document.getElementById('track-'+id);
        if(tb) tb.classList.add('playing');
        var statusText = document.getElementById('audio-status-text');
        if(statusText) statusText.textContent = "Sintetizando: " + name + " (" + freq + "Hz)";
        if(!this.isPlaying) this.togglePlay();
        else this.startSynthesis(freq);
        A11yEngine.announce("Reproduciendo pista de sanación: " + name);
    },
    togglePlay: function() {
        this.initAudioContext();
        var icon = document.getElementById('play-icon');
        var btn = document.getElementById('master-play');
        
        if(this.isPlaying) {
            this.stopSynthesis();
            if(icon) icon.className = "fa-solid fa-play";
            if(btn) btn.style.background = "var(--cian-fluor)";
            var statusText = document.getElementById('audio-status-text');
            if(statusText) statusText.textContent = "Atmósfera Pausada";
        } else {
            this.startSynthesis(this.currentFreq);
            if(icon) icon.className = "fa-solid fa-pause";
            if(btn) btn.style.background = "var(--blanco)";
            var activeTrack = document.querySelector('.audio-track-btn.playing');
            if(!activeTrack) this.loadTrack(432, 1, "Sanación Celular");
        }
        this.isPlaying = !this.isPlaying;
    },
    startSynthesis: function(freq) {
        if(this.mainOsc) this.stopSynthesis();
        
        var masterGain = this.ctx.createGain();
        masterGain.gain.value = 0.15;
        masterGain.connect(this.ctx.destination);
        
        this.panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : this.ctx.createGain();
        this.panner.connect(masterGain);
        
        this.mainOsc = this.ctx.createOscillator();
        this.mainOsc.type = 'sine';
        this.mainOsc.frequency.value = freq;
        this.mainOsc.connect(this.panner);
        
        this.subOsc = this.ctx.createOscillator();
        this.subOsc.type = 'triangle';
        this.subOsc.frequency.value = freq / 2;
        var subGain = this.ctx.createGain();
        subGain.gain.value = 0.5;
        this.subOsc.connect(subGain);
        subGain.connect(this.panner);
        
        this.lfo = this.ctx.createOscillator();
        this.lfo.type = 'sine';
        this.lfo.frequency.value = 0.1; 
        var lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 0.8; 
        this.lfo.connect(lfoGain);
        if(this.panner.pan) lfoGain.connect(this.panner.pan);
        
        this.mainOsc.start();
        this.subOsc.start();
        this.lfo.start();
        
        this.drawVisualizer();
    },
    stopSynthesis: function() {
        if(this.mainOsc) { this.mainOsc.stop(); this.mainOsc.disconnect(); }
        if(this.subOsc) { this.subOsc.stop(); this.subOsc.disconnect(); }
        if(this.lfo) { this.lfo.stop(); this.lfo.disconnect(); }
        cancelAnimationFrame(this.visualizerId);
    },
    drawVisualizer: function() {
        var canvas = document.getElementById('audio-canvas');
        if(!canvas) return;
        var ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        var width = canvas.width, height = canvas.height;
        var time = 0;
        
        function render() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, width, height);
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(76, 201, 240, 0.8)';
            
            var amp = height / 3;
            for(var x = 0; x < width; x++) {
                var y = height/2 + Math.sin(x * 0.02 + time) * amp * Math.cos(time*0.5);
                if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
            }
            ctx.stroke();
            time += 0.05;
            OasisEngine.visualizerId = requestAnimationFrame(render);
        }
        render();
    }
};

/**
 * MOTOR DE INTELIGENCIA ARTIFICIAL AURA (Triaje y Chat)
 */
var AuraAI = {
    logicNodes: {
        "start": {
            msg: "Saludos. Soy **Aura AI (Sovereign 9.2)**, el sistema de triaje clínico automatizado de Valtara. Mi arquitectura evalúa su sintomatología biomecánica para recomendarle la intervención exacta. ¿Qué factor primario limita su rendimiento hoy?",
            chips: ["Tensión en Espalda Alta (Trapecio)", "Fatiga Mental y Estrés (Burnout)", "Dolor Lumbar y Piernas Pesadas", "Bruxismo o Tensión Mandibular"]
        },
        "Tensión en Espalda Alta (Trapecio)": {
            msg: "El trapecio absorbe el impacto directo del estrés postural frente al ordenador. Recomendamos encarecidamente la intervención nivel I: **Masaje Deportivo y Descompresión Miofascial**. ¿Desea que lo enlace con el Concierge humano para agendar?",
            chips: ["Sí, contactar Concierge en WhatsApp", "Volver al inicio"]
        },
        "Fatiga Mental y Estrés (Burnout)": {
            msg: "Identifico signos de saturación neuroquímica. Su cuerpo requiere activar el sistema parasimpático de inmediato. Sugiero el **Ritual Lomi Lomi Supremo** (Nivel III) o el **Holístico Integrativo** (Nivel IV). ¿Desea asegurar su espacio de sanación?",
            chips: ["Sí, contactar Concierge en WhatsApp", "Volver al inicio"]
        },
        "Dolor Lumbar y Piernas Pesadas": {
            msg: "La compresión discal y el estancamiento linfático son comunes tras vuelos largos o sedentarismo excesivo. El protocolo ideal es el **Masaje Deportivo (Nivel I)** con enfoque lumbar, o el **Drenaje Linfático**. ¿Desea proceder con la reserva?",
            chips: ["Sí, contactar Concierge en WhatsApp", "Volver al inicio"]
        },
        "Bruxismo o Tensión Mandibular": {
            msg: "El estrés somatizado severo suele descargarse en la mandíbula durante el sueño profundo. Sugiero el protocolo expreso de **Rehabilitación Facial por Bruxismo**. Es una intervención rápida y altamente efectiva. ¿Conecto con el humano encargado?",
            chips: ["Sí, contactar Concierge en WhatsApp", "Volver al inicio"]
        },
        "Sí, contactar Concierge en WhatsApp": {
            msg: "Transfiriendo los datos de su triaje al Concierge humano... Se abrirá WhatsApp en un instante para que un ejecutivo finalice su reserva de forma segura.",
            chips: [], action: "whatsapp"
        },
        "Volver al inicio": {
            msg: "El sistema ha sido reiniciado. ¿En qué otro aspecto estructural puedo asistirle?",
            chips: ["Tensión en Espalda Alta (Trapecio)", "Fatiga Mental y Estrés (Burnout)", "Dolor Lumbar y Piernas Pesadas", "Bruxismo o Tensión Mandibular"]
        },
        "default": {
            msg: "Mi red neuronal aún está aprendiendo ese parámetro específico, pero le aseguro que nuestros terapeutas humanos tienen la respuesta exacta. Recomiendo una valoración presencial.",
            chips: ["Tensión en Espalda Alta (Trapecio)", "Volver al inicio", "Sí, contactar Concierge en WhatsApp"]
        }
    },
    init: function() {
        var btnSend = document.getElementById('aura-btn-send');
        var input = document.getElementById('aura-input-text');
        if(btnSend && input) {
            btnSend.onclick = function() { AuraAI.handleInput(input.value); input.value = ''; };
            input.onkeypress = function(e) { if(e.key === 'Enter') { AuraAI.handleInput(input.value); input.value = ''; } };
        }
        this.sendBotMsg(this.logicNodes["start"].msg, this.logicNodes["start"].chips);
    },
    toggle: function() {
        var m = document.getElementById('aura-modal');
        var b = document.getElementById('aura-toggle');
        if(m && b) {
            var isOpen = m.classList.toggle('active');
            b.setAttribute('aria-expanded', isOpen);
            if(isOpen) {
                var input = document.getElementById('aura-input-text');
                if(input) setTimeout(function(){ input.focus(); }, 300);
                A11yEngine.announce("Ventana del Asistente IA Aura abierta");
            }
        }
    },
    handleInput: function(text) {
        if(!text || text.trim() === '') return;
        this.appendMsg(text, 'user');
        var node = this.logicNodes[text] || this.logicNodes["default"];
        this.showTyping();
        
        setTimeout(function() {
            AuraAI.hideTyping();
            AuraAI.sendBotMsg(node.msg, node.chips);
            if(node.action === "whatsapp") {
                setTimeout(function(){
                    window.open("https://wa.me/5213348572070?text=Hola,%20Concierge.%20Acabo%20de%20utilizar%20la%20IA%20de%20triaje%20y%20deseo%20confirmar%20una%20reserva%20para%20una%20terapia.", "_blank");
                }, 2000);
            }
        }, 1200);
    },
    processDirect: function(query) {
        var textMap = {
            "Iniciar Evaluación Clínica": "start",
            "Agendar Deportivo": "Tensión en Espalda Alta (Trapecio)",
            "Agendar Reductivo": "default",
            "Agendar Lomi Lomi": "Fatiga Mental y Estrés (Burnout)",
            "Agendar Holistico": "Fatiga Mental y Estrés (Burnout)"
        };
        var mapped = textMap[query] || "start";
        this.appendMsg("Evaluando protocolo: " + query, 'user');
        this.showTyping();
        setTimeout(function() {
            AuraAI.hideTyping();
            var node = AuraAI.logicNodes[mapped] || AuraAI.logicNodes["default"];
            AuraAI.sendBotMsg(node.msg, node.chips);
        }, 1000);
    },
    sendBotMsg: function(msg, chips) {
        this.appendMsg(msg, 'bot');
        this.renderChips(chips);
    },
    appendMsg: function(txt, sender) {
        var log = document.getElementById('aura-chat-log');
        if(!log) return;
        var formatted = txt.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        var d = document.createElement('div');
        d.className = 'msg ' + sender;
        d.innerHTML = formatted;
        var typingIndicator = document.getElementById('aura-typing');
        if (typingIndicator) {
            log.insertBefore(d, typingIndicator);
        } else {
            log.appendChild(d);
        }
        log.scrollTop = log.scrollHeight;
        if(sender === 'bot') A11yEngine.announce("Mensaje del asistente: " + txt);
    },
    showTyping: function() { var t = document.getElementById('aura-typing'); if(t) t.classList.add('active'); },
    hideTyping: function() { var t = document.getElementById('aura-typing'); if(t) t.classList.remove('active'); },
    renderChips: function(chips) {
        var c = document.getElementById('aura-chips');
        if(!c) return;
        c.innerHTML = '';
        if(!chips || chips.length === 0) { c.style.height = '0'; c.style.padding = '0'; return; }
        c.style.height = 'auto'; c.style.padding = '2rem 3rem';
        for(var i=0; i<chips.length; i++) {
            var b = document.createElement('button');
            b.className = 'aura-chip' + (chips[i].includes('WhatsApp') ? ' special-chip' : '');
            b.textContent = chips[i];
            b.onclick = (function(text) { return function() { AuraAI.handleInput(text); }; })(chips[i]);
            c.appendChild(b);
        }
    }
};

/**
 * MOTOR DE COOKIES Y LEY FEDERAL (LFPDPPP)
 */
var CookieEngine = {
    checkConsent: function() {
        var b = document.getElementById('cookie-banner');
        if(!b || localStorage.getItem('valtara_cookies_accepted')) return;
        
        setTimeout(function() {
            b.classList.add('show');
            A11yEngine.announce("El aviso legal y de privacidad ha aparecido en la parte inferior de su pantalla.");
        }, 5000);
        
        var btnAccept = document.getElementById('btn-cookie-accept');
        if(btnAccept) {
            btnAccept.addEventListener('click', function() {
                localStorage.setItem('valtara_cookies_accepted', 'true');
                b.classList.remove('show');
                UXEngine.showToast("Sus preferencias han sido guardadas localmente en su dispositivo.");
            });
        }
        
        var btnReject = document.getElementById('btn-cookie-reject');
        if(btnReject) {
            btnReject.addEventListener('click', function() {
                localStorage.setItem('valtara_cookies_accepted', 'false');
                b.classList.remove('show');
                UXEngine.showToast("Protección máxima activada. Solo cookies esenciales en uso.");
            });
        }
    }
};

/**
 * CONTROLADOR MAESTRO DEL SISTEMA (System OS)
 */
var ValtaraSystem = {
    initPreloader: function() {
        var preloader = document.getElementById('os-preloader');
        if (!preloader) return;
        
        setTimeout(function() {
            document.body.classList.add('system-ready');
            A11yEngine.announce("La interfaz del Santuario Valtara ha sido cargada con éxito.");
            setTimeout(function(){ UXEngine.showToast("Bienvenido al Santuario Ejecutivo. Sistema Sovereign 9.2 en línea."); }, 1000);
        }, 5500); 
    },
    bindEvents: function() {
        var menuOpenBtn = document.getElementById('menu-open-btn');
        var sideMenuOverlay = document.getElementById('side-menu-overlay');
        var menuCloseBtn = document.getElementById('menu-close-btn');

        if(menuOpenBtn && sideMenuOverlay) {
            menuOpenBtn.addEventListener('click', function() {
                sideMenuOverlay.classList.add('open');
                this.setAttribute('aria-expanded', 'true');
            });
        }
        if(menuCloseBtn && sideMenuOverlay) {
            menuCloseBtn.addEventListener('click', function() {
                sideMenuOverlay.classList.remove('open');
                if(menuOpenBtn) menuOpenBtn.setAttribute('aria-expanded', 'false');
            });
        }
        
        var links = document.querySelectorAll('.menu-link');
        for(var i=0; i<links.length; i++) {
            links[i].addEventListener('click', function(e) {
                var v = this.getAttribute('data-view');
                if(v) AppRouter.navigate(v, this);
            });
        }
        
        var audioToggle = document.getElementById('audio-toggle');
        var audioModal = document.getElementById('audio-modal');
        var audioClose = document.getElementById('audio-close');

        if(audioToggle && audioModal) {
            audioToggle.addEventListener('click', function(){
                audioModal.classList.toggle('active');
            });
        }
        if(audioClose && audioModal) {
            audioClose.addEventListener('click', function(){
                audioModal.classList.remove('active');
            });
        }
        
        var auraToggle = document.getElementById('aura-toggle');
        var auraClose = document.getElementById('aura-close-btn');
        if(auraToggle) auraToggle.addEventListener('click', function(){ AuraAI.toggle(); });
        if(auraClose) auraClose.addEventListener('click', function(){ AuraAI.toggle(); });
        
        var a11yToggle = document.getElementById('a11y-toggle');
        var a11yMenu = document.getElementById('a11y-menu');
        var a11yClose = document.getElementById('a11y-close-btn');

        if(a11yToggle && a11yMenu) {
            a11yToggle.addEventListener('click', function(){
                a11yMenu.classList.toggle('active');
            });
        }
        if(a11yClose && a11yMenu) {
            a11yClose.addEventListener('click', function(){
                a11yMenu.classList.remove('active');
            });
        }
    },
    boot: function() {
        UXEngine.init();
        A11yEngine.init();
        OasisEngine.init();
        AuraAI.init();
        this.bindEvents();
        CookieEngine.checkConsent();
    }
};

// INICIALIZACIÓN ABSOLUTA DEL SISTEMA OPERATIVO
document.addEventListener('DOMContentLoaded', function() { ValtaraSystem.boot(); });
window.onload = function() { ValtaraSystem.initPreloader(); };
