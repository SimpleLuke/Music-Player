const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

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
