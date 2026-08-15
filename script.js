/* =========================================
   FELY ANN C. ABAD
   PERSONAL PORTFOLIO
   AUDIO PLAYER JAVASCRIPT
   ========================================= */


/* =========================
   MOBILE NAVIGATION
   ========================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", function () {

        navbar.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

        if (navbar) {
            navbar.classList.remove("show");
        }

        if (menuBtn) {

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

});


/* =========================
   AUDIO PLAYER
   ========================= */

const audioPlayer =
    document.getElementById("audioPlayer");

const playButton =
    document.getElementById("playBtn");

const prevButton =
    document.getElementById("prevBtn");

const nextButton =
    document.getElementById("nextBtn");

const progressBar =
    document.getElementById("progressBar");

const volumeBar =
    document.getElementById("volumeBar");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const songTitle =
    document.getElementById("songTitle");

const artistName =
    document.getElementById("artistName");

const vinyl =
    document.querySelector(".vinyl");

const songItems =
    document.querySelectorAll(".playlist-item");


/* =========================
   SONG LIST
   ========================= */

const songs = [

    {
        title: "Act My Age",
        artist: "Fely Ann's Playlist",
        file: "media/audio/act-my-age.mp3"
    },

    {
        title: "Love Story",
        artist: "Fely Ann's Playlist",
        file: "media/audio/love-story.mp3"
    },

    {
        title: "Perfect",
        artist: "Fely Ann's Playlist",
        file: "media/audio/perfect.mp3"
    }

];


let currentSong = 0;


/* =========================
   FORMAT TIME
   ========================= */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );

}


/* =========================
   LOAD SONG
   ========================= */

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    if (!audioPlayer) return;

    audioPlayer.src = song.file;

    audioPlayer.load();

    if (songTitle) {
        songTitle.textContent = song.title;
    }

    if (artistName) {
        artistName.textContent = song.artist;
    }

    if (progressBar) {
        progressBar.value = 0;
    }

    if (currentTime) {
        currentTime.textContent = "0:00";
    }

    if (duration) {
        duration.textContent = "0:00";
    }


    /* UPDATE ACTIVE PLAYLIST */

    songItems.forEach(function (item) {

        item.classList.remove("active");

    });


    if (songItems[currentSong]) {

        songItems[currentSong]
            .classList.add("active");

    }

}


/* =========================
   PLAY SONG
   ========================= */

function playSong() {

    if (!audioPlayer) return;

    audioPlayer.play()
        .then(function () {

            if (playButton) {

                playButton.innerHTML =
                    '<i class="fa-solid fa-pause"></i>';

            }

            if (vinyl) {

                vinyl.classList.add("playing");

            }

        })
        .catch(function (error) {

            console.log(
                "Audio could not be played:",
                error
            );

            alert(
                "Hindi ma-play ang music. " +
                "Siguraduhin na tama ang file location."
            );

        });

}


/* =========================
   PAUSE SONG
   ========================= */

function pauseSong() {

    if (!audioPlayer) return;

    audioPlayer.pause();

    if (playButton) {

        playButton.innerHTML =
            '<i class="fa-solid fa-play"></i>';

    }

    if (vinyl) {

        vinyl.classList.remove("playing");

    }

}


/* =========================
   PLAY / PAUSE BUTTON
   ========================= */

if (playButton) {

    playButton.addEventListener(
        "click",
        function () {

            if (audioPlayer.paused) {

                playSong();

            } else {

                pauseSong();

            }

        }
    );

}


/* =========================
   NEXT SONG
   ========================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        function () {

            currentSong++;

            if (currentSong >= songs.length) {

                currentSong = 0;

            }

            loadSong(currentSong);

            playSong();

        }
    );

}


/* =========================
   PREVIOUS SONG
   ========================= */

if (prevButton) {

    prevButton.addEventListener(
        "click",
        function () {

            currentSong--;

            if (currentSong < 0) {

                currentSong =
                    songs.length - 1;

            }

            loadSong(currentSong);

            playSong();

        }
    );

}


/* =========================
   UPDATE PROGRESS
   ========================= */

if (audioPlayer) {

    audioPlayer.addEventListener(
        "timeupdate",
        function () {

            if (audioPlayer.duration) {

                const progress =
                    (audioPlayer.currentTime /
                    audioPlayer.duration) * 100;

                if (progressBar) {

                    progressBar.value =
                        progress;

                }

            }

            if (currentTime) {

                currentTime.textContent =
                    formatTime(
                        audioPlayer.currentTime
                    );

            }

        }
    );

}


/* =========================
   SONG DURATION
   ========================= */

if (audioPlayer) {

    audioPlayer.addEventListener(
        "loadedmetadata",
        function () {

            if (duration) {

                duration.textContent =
                    formatTime(
                        audioPlayer.duration
                    );

            }

        }
    );

}


/* =========================
   PROGRESS BAR
   ========================= */

if (progressBar) {

    progressBar.addEventListener(
        "input",
        function () {

            if (
                audioPlayer &&
                audioPlayer.duration
            ) {

                audioPlayer.currentTime =
                    (progressBar.value / 100) *
                    audioPlayer.duration;

            }

        }
    );

}


/* =========================
   VOLUME
   ========================= */

if (audioPlayer) {

    audioPlayer.volume = 0.7;

}


if (volumeBar) {

    volumeBar.addEventListener(
        "input",
        function () {

            if (audioPlayer) {

                audioPlayer.volume =
                    volumeBar.value;

            }

        }
    );

}


/* =========================
   AUTO NEXT SONG
   ========================= */

if (audioPlayer) {

    audioPlayer.addEventListener(
        "ended",
        function () {

            currentSong++;

            if (currentSong >= songs.length) {

                currentSong = 0;

            }

            loadSong(currentSong);

            playSong();

        }
    );

}


/* =========================
   PLAYLIST BUTTONS
   ========================= */

songItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            const index =
                parseInt(
                    item.dataset.index
                );

            loadSong(index);

            playSong();

        }
    );

});


/* =========================
   INITIAL SONG
   ========================= */

loadSong(0);


/* =========================
   ACTIVE NAVIGATION ON SCROLL
   ========================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener(
    "scroll",
    function () {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 120;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (
                target ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }
);