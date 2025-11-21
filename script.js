let songImage = document.querySelector('.music-card-image img');
let songTitle = document.querySelector('.song_title');
let songArtist = document.querySelector('.song_artist');
let startProgress = document.getElementById('start-progress');
let progress = document.getElementById('progress');
let endProgress = document.getElementById('end-progress');
let shuffle = document.getElementById('shuffle');
let preview = document.getElementById('preview');
let playPause = document.getElementById('play-pause');
let next = document.getElementById('next'); // Variable is named 'next'
let repeat = document.getElementById('repeat');

const songs = [
    {
        title: "FADED",
        artist: "Alan Walker",
        src: "src/Allan_Walker_-_Faded_(mp3.pm).mp3",
        image: "src/faded-image.jpg"
    },
    {
        title: "Alone",
        artist: "Alan Walker",
        src: "src/Alan_Walker_-_Alone.mp3",
        image: "src/alone-image.jpg"
    }
]

let audio = new Audio();
let currentSong = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

function loadSong(index) {
    let song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songImage.src = song.image;

    audio.onloadedmetadata = function () {
        progress.max = audio.duration;
        // FIX 1: Changed 'formatTime' to 'timeFormat' to match your function name below
        endProgress.textContent = timeFormat(audio.duration);
    };
}

function timeFormat(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = "0" + sec;
    if (min < 10) min = "0" + min;
    return `${min}:${sec}`;
}

playPause.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPause.innerHTML = `<i class="fa-solid fa-play"></i>`;
        isPlaying = false;
    } else {
        audio.play();
        playPause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        isPlaying = true;
    }
})

audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime;
    startProgress.textContent = timeFormat(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

next.addEventListener("click", function () {
    if (isShuffle) {
        currentSong = Math.floor(Math.random() * songs.length);
    } else {
        currentSong = (currentSong + 1) % songs.length;
    }
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
    playPause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
});


preview.addEventListener("click", function () {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    isPlaying = true;
    playPause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
});


shuffle.addEventListener("click", function () {
    isShuffle = !isShuffle;
    shuffle.style.color = isShuffle ? "yellow" : "white";
});


repeat.addEventListener("click", function () {
    isRepeat = !isRepeat;
    repeat.style.color = isRepeat ? "yellow" : "white";
});


// Auto Next
audio.addEventListener("ended", function () {
    if (isRepeat) {
        audio.play();
    } else {
        // FIX 2: Changed 'nextBtn' to 'next' because your variable name is 'next'
        next.click(); 
    }
});

// Load First Song
loadSong(currentSong);