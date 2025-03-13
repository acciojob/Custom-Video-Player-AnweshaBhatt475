// Select necessary DOM elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer'); // Video element
const progress = player.querySelector('.progress'); // Progress bar container
const progressBar = player.querySelector('.progress__filled'); // Actual progress bar
const toggle = player.querySelector('.toggle'); // Play/Pause button
const skipButtons = player.querySelectorAll('[data-skip]'); // Skip buttons
const ranges = player.querySelectorAll('.player__slider'); // Volume and playback speed sliders

// Function to toggle play/pause
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Update the play/pause button icon
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Skip forward or backward based on button data
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle volume and playback speed sliders
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update progress bar as the video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub (jump to specific point in the video)
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners for video player controls
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

let mousedown = false; // To detect mouse dragging on progress bar
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
