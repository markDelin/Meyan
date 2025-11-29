document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const greetingPopup = document.getElementById("greetingPopup");
  const confirmationPopup = document.getElementById("confirmationPopup");
  const mainContent = document.getElementById("mainContent");
  const enterButton = document.getElementById("enterButton");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");
  const bgMusic = document.getElementById("bgMusic");
  const musicControl = document.getElementById("musicControl");
  const progressBar = document.getElementById("progressBar");
  const slideNumber = document.getElementById("slideNumber");
  const floatingElements = document.getElementById("floatingElements");
  const confettiContainer = document.getElementById("confettiContainer");
  const slideContainer = document.querySelector(".slide-container");

  // State
  let isPlaying = false;
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let floatingElementsInterval;

  // Floating shapes
  const floatingShapes = [
    "❤️",
    "✨",
    "🎀",
    "🎂",
    "🎈",
    "🌸",
    "💫",
    "🥳",
    "🎉",
    "💖",
  ];

  // Audio setup
  bgMusic.volume = 0.4;

  // Event Listeners
  enterButton.addEventListener("click", () => {
    confirmationPopup.classList.add("active");
  });

  confirmYes.addEventListener("click", () => {
    confirmationPopup.classList.remove("active");
    startExperience();
  });

  confirmNo.addEventListener("click", () => {
    confirmationPopup.classList.remove("active");
    alert(
      "This letter is specially made for May Anne. Please exit if that's not you."
    );
  });

  musicControl.addEventListener("click", toggleMusic);

  document.getElementById("prevBtn").addEventListener("click", prevSlide);
  document.getElementById("nextBtn").addEventListener("click", nextSlide);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  // Touch Navigation
  let touchStartX = 0;
  let touchEndX = 0;

  slideContainer.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  slideContainer.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) nextSlide();
    if (touchEndX > touchStartX + threshold) prevSlide();
  }

  // Core Functions
  function startExperience() {
    createConfetti(50);

    // Try to play music
    bgMusic
      .play()
      .then(() => {
        isPlaying = true;
        updateMusicIcon();
      })
      .catch((err) => {
        console.log("Autoplay prevented:", err);
        isPlaying = false;
        updateMusicIcon();
      });

    // Transition
    greetingPopup.style.opacity = "0";
    setTimeout(() => {
      greetingPopup.style.display = "none";
      mainContent.style.display = "block";
      mainContent.style.opacity = "0";

      // Fade in main content
      requestAnimationFrame(() => {
        mainContent.style.transition = "opacity 1s ease";
        mainContent.style.opacity = "1";
      });

      createFloatingElements();
    }, 1000);
  }

  function toggleMusic() {
    if (isPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
    isPlaying = !isPlaying;
    updateMusicIcon();
  }

  function updateMusicIcon() {
    musicControl.textContent = isPlaying ? "🎵" : "🔇";
    musicControl.style.opacity = isPlaying ? "1" : "0.7";
  }

  function showSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;

    // Update UI
    progressBar.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
    slideNumber.textContent = `${currentSlide + 1} / ${totalSlides}`;

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
        // Reset animations
        const animatedElements = slide.querySelectorAll("h1, p");
        animatedElements.forEach((el) => {
          el.style.animation = "none";
          el.offsetHeight; /* trigger reflow */
          el.style.animation = null;
        });
      } else {
        slide.classList.remove("active");
      }
    });

    // Special effect for last slide
    if (index === totalSlides - 1) {
      createConfetti(30);
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Visual Effects
  function createFloatingElements() {
    if (floatingElementsInterval) clearInterval(floatingElementsInterval);

    function spawn() {
      if (document.hidden) return;

      const el = document.createElement("div");
      el.className = "floating-element";
      el.textContent =
        floatingShapes[Math.floor(Math.random() * floatingShapes.length)];
      el.style.left = Math.random() * 100 + "vw";
      el.style.fontSize = Math.random() * 20 + 10 + "px";
      el.style.animationDuration = Math.random() * 10 + 10 + "s";

      floatingElements.appendChild(el);

      setTimeout(() => el.remove(), 20000);
    }

    // Initial batch
    for (let i = 0; i < 15; i++) setTimeout(spawn, i * 200);

    // Continuous
    floatingElementsInterval = setInterval(spawn, 800);
  }

  function createConfetti(amount) {
    confettiContainer.style.display = "block";

    for (let i = 0; i < amount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
      confetti.style.animationDelay = Math.random() * 2 + "s";
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      confettiContainer.innerHTML = "";
      confettiContainer.style.display = "none";
    }, 5000);
  }

  // Initialize
  showSlide(0);
});
