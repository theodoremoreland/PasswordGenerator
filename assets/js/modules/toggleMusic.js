const muteButton = document.querySelector("#muteButton");

const toggleMusic = (event) => {
  event.stopPropagation();
  const audioElement = document.querySelector("#music");

  if (audioElement.muted) {
    muteButton.innerHTML = "&#128266;";
  } else {
    muteButton.innerHTML = "&#128263;";
  }

  audioElement.muted = !audioElement.muted;
};

muteButton.addEventListener("click", toggleMusic);
