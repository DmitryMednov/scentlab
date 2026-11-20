const video = document.querySelector(".hero__video");
const toggle = document.querySelector(".media-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setToggleState(isPaused) {
  toggle.setAttribute("aria-pressed", String(isPaused));
  toggle.setAttribute(
    "aria-label",
    isPaused ? "Play background video" : "Pause background video",
  );
}

function pauseForReducedMotion() {
  if (reducedMotion.matches) {
    video.pause();
    setToggleState(true);
  }
}

toggle.addEventListener("click", () => {
  if (video.paused) {
    video.play().then(() => setToggleState(false)).catch(() => setToggleState(true));
    return;
  }

  video.pause();
  setToggleState(true);
});

video.addEventListener("play", () => setToggleState(false));
video.addEventListener("pause", () => setToggleState(true));
video.addEventListener("error", () => {
  video.hidden = true;
  setToggleState(true);
  toggle.disabled = true;
  toggle.setAttribute("aria-label", "Background video unavailable");
});

reducedMotion.addEventListener?.("change", pauseForReducedMotion);
pauseForReducedMotion();
