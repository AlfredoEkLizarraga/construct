function autoplayCarousel() {
  const carouselEl = document.getElementById("carousel");
  const slideContainerEl = carouselEl.querySelector("#slide-container");
  const slides = carouselEl.querySelectorAll(".slide");
  let slideWidth = slides[0].offsetWidth;
  let currentIndex = 0;

  // Variable para controlar el autoplay
  let autoplay;

  // Función para iniciar el autoplay
  const startAutoplay = () => {
    autoplay = setInterval(() => navigate("forward"), 2000);
  };

  // Función para navegar a una posición específica
  const navigate = (direction) => {
    if (direction === "forward") {
      currentIndex++;
      if (currentIndex >= slides.length) {
        currentIndex = 0; // Reinicia al primer slide si llegamos al final
      }
    } else if (direction === "backward") {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = slides.length - 1; // Ir al último slide si estamos al inicio y navegamos hacia atrás
      }
    } else if (typeof direction === "number") {
      currentIndex = direction;
    }

    // Mueve el contenedor al índice actual sin retrasos
    slideContainerEl.scrollTo({
      left: currentIndex * (slideWidth + 10), // Ajuste con el margen de 10px
      behavior: "smooth",
    });
  };

  // Eventos de botones y teclado
  document.querySelector("#back-button").addEventListener("click", () => {
    clearInterval(autoplay);
    navigate("backward");
    startAutoplay();
  });

  document.querySelector("#forward-button").addEventListener("click", () => {
    clearInterval(autoplay);
    navigate("forward");
    startAutoplay();
  });

  document.querySelectorAll(".slide-indicator").forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(autoplay);
      navigate(index);
      startAutoplay();
    });
  });

  // Agrega los eventos del teclado
  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
      clearInterval(autoplay);
      navigate("backward");
      startAutoplay();
    } else if (e.code === "ArrowRight") {
      clearInterval(autoplay);
      navigate("forward");
      startAutoplay();
    }
  });

  // Manejo de cambio de tamaño de ventana
  window.addEventListener("resize", () => {
    slideWidth = slides[0].offsetWidth;
  });

  // Inicio del autoplay
  startAutoplay();

  slideContainerEl.addEventListener("mouseenter", () =>
    clearInterval(autoplay)
  );
  slideContainerEl.addEventListener("mouseleave", startAutoplay);

  // Observador para actualizar indicadores
  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slideIndex = entry.target.dataset.slideindex;
          carouselEl
            .querySelector(".slide-indicator.active")
            .classList.remove("active");
          carouselEl
            .querySelectorAll(".slide-indicator")
            [slideIndex].classList.add("active");
        }
      });
    },
    { root: slideContainerEl, threshold: 0.5 }
  );

  slides.forEach((slide) => {
    slideObserver.observe(slide);
  });
}

autoplayCarousel();
