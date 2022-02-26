const video = document.querySelector('video');
const toggleButton = document.querySelector('.player__button.toggle');
const progress = document.querySelector('.progress__filled');
const totalProgress = document.querySelector('.progress');
const volume = document.getElementsByName('volume')[0];
const playbackRate = document.getElementsByName('playbackRate')[0];
const skipButtons = document.querySelectorAll('.player__button');

let isMouseDown = false;

function handleTogglePlay() {
  if (video.paused) {
    video.play();
    toggleButton.innerText = '❚❚';
  } else {
    video.pause();
    toggleButton.innerText = '►';
  }
}

function handleProgress() {
  progress.style.flexBasis = Math.round((video.currentTime * 100) / video.duration) + '%';
}

function handleVolume(e) {
  video.volume = e.target.value;
}

function handlePlaybackRate(e) {
  video.playbackRate = e.target.value;
}

function handleClickProgress(e) {
  if (!isMouseDown) return;
  const progressLength = totalProgress.clientWidth;
  const clickedTime = (video.duration * e.layerX) / progressLength;
  video.currentTime = clickedTime;
}

function handleSkip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

video.addEventListener('click', handleTogglePlay);
video.addEventListener('timeupdate', handleProgress);

toggleButton.addEventListener('click', handleTogglePlay);

volume.addEventListener('input', handleVolume);
playbackRate.addEventListener('input', handlePlaybackRate);

skipButtons.forEach((button) => button.addEventListener('click', handleSkip));

totalProgress.addEventListener('mousedown', () => (isMouseDown = true));
totalProgress.addEventListener('mousemove', handleClickProgress);
totalProgress.addEventListener('mouseup', () => (isMouseDown = false));
