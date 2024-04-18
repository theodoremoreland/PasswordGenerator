const muteButtonn = document.querySelector("#muteButton");

const toggleMusic = (event) => {
  event.stopPropagation();
  const audioElement = document.querySelector("#music");

  if (audioElement.muted) {
    muteButtonn.innerHTML = "&#128266;";
  } else {
    muteButtonn.innerHTML = "&#128263;";
  }

  audioElement.muted = !audioElement.muted;
};

muteButtonn.addEventListener("click", toggleMusic);
