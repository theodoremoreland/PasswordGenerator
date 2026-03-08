const bodyElement = document.querySelector("body");

const playMusic = (event) => {
  event.stopPropagation();

  const audioElement = document.querySelector("#music");

  if (audioElement.muted) {
    audioElement.volume = 0.025;
    audioElement.muted = false;
  }
};

bodyElement.addEventListener("click", playMusic);
