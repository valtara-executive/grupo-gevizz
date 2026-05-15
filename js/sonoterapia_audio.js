/* =========================================================
   VALTARA AUDIO ENGINE — FIX DEFINITIVO SPA/PWA
========================================================= */

window.ValtaraAudioEngine = window.ValtaraAudioEngine || {

    audio: new Audio(),
    currentPlaylist: [],
    currentIndex: 0,
    currentType: null,

    init: function() {

        this.audio.volume = 0.7;

        this.audio.addEventListener('ended', () => {

            this.nextTrack();

        });

        this.audio.addEventListener('timeupdate', () => {

            const progress =
                document.getElementById('oasis-progress-bar');

            const current =
                document.getElementById('oasis-time-current');

            const total =
                document.getElementById('oasis-time-total');

            if(!progress || !current || !total) return;

            if(this.audio.duration){

                progress.value =
                    (this.audio.currentTime /
                    this.audio.duration) * 100;

                current.innerText =
                    this.formatTime(this.audio.currentTime);

                total.innerText =
                    this.formatTime(this.audio.duration);
            }

        });

        const progress =
            document.getElementById('oasis-progress-bar');

        if(progress){

            progress.addEventListener('input', (e) => {

                if(this.audio.duration){

                    this.audio.currentTime =
                        (e.target.value / 100) *
                        this.audio.duration;

                }

            });

        }

        const volume =
            document.getElementById('oasis-volume-slider');

        if(volume){

            volume.addEventListener('input', (e) => {

                this.audio.volume = e.target.value;

            });

        }

        const playBtn =
            document.getElementById('btn-master-play');

        if(playBtn){

            playBtn.onclick = () => {

                if(!this.audio.src){

                    if(window.ValtaraAudioPlaylists.radio.length){

                        this.playTrack('radio', 0);

                    }

                    return;
                }

                if(this.audio.paused){

                    this.audio.play();

                    playBtn.innerHTML =
                        '<i class="fa-solid fa-pause"></i>';

                } else {

                    this.audio.pause();

                    playBtn.innerHTML =
                        '<i class="fa-solid fa-play"></i>';

                }

            };

        }

        const nextBtn =
            document.getElementById('btn-next-track');

        if(nextBtn){

            nextBtn.onclick = () => {

                this.nextTrack();

            };

        }

        const prevBtn =
            document.getElementById('btn-prev-track');

        if(prevBtn){

            prevBtn.onclick = () => {

                this.prevTrack();

            };

        }

    },

    playTrack: async function(type, index) {

        if(!window.ValtaraAudioPlaylists[type]) return;

        this.currentPlaylist =
            window.ValtaraAudioPlaylists[type];

        this.currentIndex = index;
        this.currentType = type;

        const track =
            this.currentPlaylist[index];

        if(!track) return;

        try {

            /* =================================================
               FIX DEFINITIVO DE RUTAS SPA/PWA
            ================================================= */

            this.audio.pause();

            this.audio.src =
                './audio/' + track.file;

            this.audio.load();

            await this.audio.play();

            const playBtn =
                document.getElementById('btn-master-play');

            if(playBtn){

                playBtn.innerHTML =
                    '<i class="fa-solid fa-pause"></i>';

            }

            const nowPlaying =
                document.getElementById('oasis-now-playing');

            if(nowPlaying){

                nowPlaying.innerHTML = `
                    <div>${track.title}</div>

                    <div style="
                        font-size:.85rem;
                        opacity:.65;
                        margin-top:.5rem;
                        letter-spacing:.08rem;
                        text-transform:uppercase;
                    ">
                        ${track.category}
                    </div>
                `;
            }

            const nextIndex =
                index + 1 >= this.currentPlaylist.length
                ? 0
                : index + 1;

            const nextTrack =
                this.currentPlaylist[nextIndex];

            const nextBox =
                document.getElementById('valtara-next-track');

            if(nextBox && nextTrack){

                nextBox.innerHTML = `
                    A continuación:
                    <span style="
                        color:var(--valtara-oro);
                        font-weight:700;
                    ">
                        ${nextTrack.title}
                    </span>
                `;
            }

        } catch(error){

            console.log(
                'VALTARA AUDIO ERROR:',
                error
            );

        }

    },

    nextTrack: function() {

        if(!this.currentPlaylist.length) return;

        let next =
            this.currentIndex + 1;

        if(next >= this.currentPlaylist.length){

            next = 0;

        }

        this.playTrack(
            this.currentType,
            next
        );

    },

    prevTrack: function() {

        if(!this.currentPlaylist.length) return;

        let prev =
            this.currentIndex - 1;

        if(prev < 0){

            prev =
                this.currentPlaylist.length - 1;

        }

        this.playTrack(
            this.currentType,
            prev
        );

    },

    formatTime: function(seconds){

        if(isNaN(seconds)) return '0:00';

        const mins =
            Math.floor(seconds / 60);

        const secs =
            Math.floor(seconds % 60)
            .toString()
            .padStart(2,'0');

        return mins + ':' + secs;

    }

};

/* =========================================================
   PLAYLISTS
========================================================= */

window.ValtaraAudioPlaylists =
window.ValtaraAudioPlaylists || {};

window.ValtaraAudioPlaylists.radio = [

{
title:'Nuestra Catedral',
file:'nuestra_catedral.mp3',
category:'Radio Valtara'
},

{
title:'Steam From The Porcelain',
file:'steam_from_the_porcelain.mp3',
category:'Radio Valtara'
},

{
title:'Donde El Alma Descansa',
file:'donde_el_alma_descansa.mp3',
category:'Radio Valtara'
},

{
title:'Un Respiro En El Andar',
file:'un_respiro_en_el_andar.mp3',
category:'Radio Valtara'
},

{
title:'Un Puerto Donde Descansar',
file:'un_puerto_donde_descansar.mp3',
category:'Radio Valtara'
},

{
title:'Refugio Entre Ramas',
file:'refugio_entre_ramas.mp3',
category:'Radio Valtara'
},

{
title:'Donde La Piedra Se Rinde',
file:'donde_la_piedra_se_rinde.mp3',
category:'Radio Valtara'
},

{
title:'The Willow And The Stone',
file:'the_willow_and_the_stone.mp3',
category:'Radio Valtara'
},

{
title:'Blue Inked Islands',
file:'blue-inked_islands.mp3',
category:'Radio Valtara'
},

{
title:'The Slow Rotation I',
file:'the_slow_rotation (1).mp3',
category:'Radio Valtara'
},

{
title:'The Slow Rotation',
file:'the_slow_rotation.mp3',
category:'Radio Valtara'
},

{
title:'Where Pulse And Pasture Meet',
file:'where_pulse_and_pasture_meet.mp3',
category:'Radio Valtara'
},

{
title:'Midnight Architecture',
file:'midnight_architecture.mp3',
category:'Radio Valtara'
},

{
title:'Cristal y Sal',
file:'cristal_y_sal.mp3',
category:'Radio Valtara'
},

{
title:'The Quiet Pulse',
file:'the_quiet_pulse.mp3',
category:'Radio Valtara'
}

];

/* =========================================================
   INICIALIZAR
========================================================= */

setTimeout(() => {

    window.ValtaraAudioEngine.init();

}, 500);
