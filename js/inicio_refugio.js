/* =====================================================================================
   FIX DEFINITIVO — BOTÓN "COMENCEMOS MI EXPERIENCIA"
   =====================================================================================

   REEMPLAZA EXCLUSIVAMENTE ESTE BLOQUE:

   <script>
      ...
   </script>

   POR ESTE NUEVO BLOQUE COMPLETO.
   NO MODIFIQUES NADA MÁS.
===================================================================================== */

<script>

(function(){

    function iniciarCotizadorValtara(){

        var openBtn = document.getElementById('vt-open-cotizador');
        var box = document.getElementById('vt-cotizador-box');

        // =========================
        // APERTURA DEL COTIZADOR
        // =========================

        if(openBtn && box){

            openBtn.onclick = function(){

                if(box.style.display === 'block'){

                    box.scrollIntoView({
                        behavior:'smooth',
                        block:'start'
                    });

                    return;
                }

                box.style.display = 'block';

                box.style.opacity = '0';
                box.style.transform = 'translateY(30px)';

                setTimeout(function(){

                    box.style.transition =
                        'opacity .5s ease, transform .5s ease';

                    box.style.opacity = '1';
                    box.style.transform = 'translateY(0)';

                },50);

                setTimeout(function(){

                    box.scrollIntoView({
                        behavior:'smooth',
                        block:'start'
                    });

                },150);

            };

        }

        // =========================
        // ELEMENTOS
        // =========================

        var therapy = document.getElementById('vt-therapy');
        var aroma = document.getElementById('vt-aroma');

        if(!therapy || !aroma){
            return;
        }

        // =========================
        // DESCRIPCIONES
        // =========================

        var descriptions = {

            '699':'Relajación profunda diseñada para disminuir ansiedad, tensión física y agotamiento emocional.',

            '899':'Una experiencia extendida para desconectar completamente del estrés acumulado.',

            '729':'Liberación muscular profunda ideal para contracturas y cansancio físico.',

            '730':'Movilidad, flexibilidad y estiramientos asistidos para reiniciar tu cuerpo.',

            '829':'Aceites tibios, aromas botánicos y relajación emocional profunda.',

            '830':'Equilibrio físico y emocional mediante técnicas integrativas premium.',

            '999':'El ritual más inmersivo y sensorial de toda la experiencia Valtara.',

            '819':'Armonización sonora y visual mediante esferas y luz cálida.',

            '529':'Estimulación neuromuscular facial enfocada en relajación y rehabilitación.',

            '749':'Movimientos suaves para sensación de ligereza corporal.',

            '799':'Maderoterapia y protocolos corporales especializados.'

        };

        // =========================
        // MONEY FORMAT
        // =========================

        function money(v){

            return '$' + Number(v).toLocaleString('es-MX') + ' MXN';

        }

        // =========================
        // MOTOR DINÁMICO
        // =========================

        function updatePromo(){

            var subtotal = Number(therapy.value);

            var realPrice = subtotal;

            // evitar conflicto ids repetidos
            if(subtotal === 730){
                realPrice = 729;
            }

            if(subtotal === 830){
                realPrice = 829;
            }

            var now = new Date();

            var day = now.getDay();
            var hour = now.getHours();

            var promoName = 'Sin promoción vigente';
            var discount = 0;

            // LUNES Y MARTES
            if((day === 1 || day === 2) && hour >= 13){

                promoName = '$169 de cortesía';
                discount = 169;

            }

            // JUEVES A DOMINGO
            else if(
                (day === 4 || day === 5 || day === 6 || day === 0)
                && hour < 14
            ){

                promoName = '20% OFF Matutino';
                discount = Math.round(realPrice * 0.20);

            }

            var total = realPrice - discount;

            // =========================
            // RENDER
            // =========================

            var subtotalEl = document.getElementById('vt-subtotal');
            var promoEl = document.getElementById('vt-promo-name');
            var discountEl = document.getElementById('vt-discount');
            var totalEl = document.getElementById('vt-total');
            var descEl = document.getElementById('vt-description');

            if(subtotalEl){
                subtotalEl.innerHTML = money(realPrice);
            }

            if(promoEl){
                promoEl.innerHTML = promoName;
            }

            if(discountEl){
                discountEl.innerHTML = '-' + money(discount);
            }

            if(totalEl){
                totalEl.innerHTML = money(total);
            }

            if(descEl){
                descEl.innerHTML = descriptions[String(subtotal)];
            }

            // =========================
            // WHATSAPP
            // =========================

            var message =
                'Hola, quiero reservar una experiencia Valtara.%0A%0A' +
                '✨ Terapia: ' +
                therapy.options[therapy.selectedIndex].text + '%0A' +

                '🌿 Aromaterapia: ' +
                aroma.value + '%0A' +

                '🎁 Promoción: ' +
                promoName + '%0A' +

                '💰 Total estimado: ' +
                money(total);

            var wa = document.getElementById('vt-wa');

            if(wa){

                wa.href =
                    'https://wa.me/5213348572070?text=' + message;

            }

        }

        // =========================
        // EVENTOS
        // =========================

        therapy.onchange = updatePromo;
        aroma.onchange = updatePromo;

        // =========================
        // INIT
        // =========================

        updatePromo();

    }

    // =====================================================
    // ESPERAR A QUE EL DOM REALMENTE EXISTA
    // =====================================================

    if(document.readyState === 'loading'){

        document.addEventListener(
            'DOMContentLoaded',
            iniciarCotizadorValtara
        );

    } else {

        setTimeout(iniciarCotizadorValtara, 300);

    }

})();

</script>
