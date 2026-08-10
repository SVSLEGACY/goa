document.addEventListener('DOMContentLoaded', () => {
  const hypeBtn = document.getElementById('check-hype-btn');
  const modal = document.getElementById('video-modal');
  const closeBtn = document.getElementById('close-modal');
  const video = document.getElementById('hype-video');

  // Open modal and play video
  hypeBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    video.play();
  });

  // Close modal and pause video
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    video.pause();
    video.currentTime = 0;
  });

  // Close modal if clicking outside the video
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      video.pause();
      video.currentTime = 0;
    }
  });
});
