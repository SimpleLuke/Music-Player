const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// Chekc if Playing
let isPlaying = false;

// Play
const playSound = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

// pause
const pauseSound = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

// Play or Pause Event Listener
playBtn.addEventListener("click", () =>
  isPlaying ? pauseSound() : playSound()
);

// Update DOME
const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

// Current Song
let songIndex = 0;
let isSongPlaying = false;

// On Load - Select First Song
loadSong(songs[songIndex]);

const nextSong = () => {
  isSongPlaying = !music.paused;
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  console.dir(music);
  if (isSongPlaying) {
    music.play();
  }
};

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  if (!music.paused) {
    music.play();
  }
};

// Update Progress Bar
const updateProgressBar = (e) => {
  const { duration, currentTime } = e.srcElement;
  const time = (currentTime / duration) * 100;
  progress.style.width = `${time}%`;
  //   Calculate display for duration
  const durationMinutes = Math.floor(duration / 60);
  let durationSecond = Math.floor(duration % 60);
  if (durationSecond < 10) {
    durationSecond = `0${durationSecond}`;
  }
  if (duration) {
    durationEl.textContent = `${durationMinutes}:${durationSecond}`;
  }
  // Calculate display for currentTime
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
};

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
