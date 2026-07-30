// Hero swiper
const heroSwiperElement = document.querySelector(".hero .swiper");

if (heroSwiperElement) {
  new Swiper(".hero .swiper", {
    direction: "horizontal",
    loop: true,

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    navigation: {
      nextEl: ".hero-arrow--next",
      prevEl: ".hero-arrow--prev",
    },
  });
}

// Solutions swiper only mobile
let solutionsSwiper = null;

function initSolutionsSwiper() {
  const isMobile = window.matchMedia("(max-width: 740px)").matches;
  const swiperEl = document.querySelector(".solutions-swiper");

  if (!swiperEl) return;

  if (isMobile && !solutionsSwiper) {
    solutionsSwiper = new Swiper(".solutions-swiper", {
      slidesPerView: 1,
      spaceBetween: 12,
      grabCursor: true,
      simulateTouch: true,

      pagination: {
        el: ".solutions-pagination",
        clickable: true,
      },
    });
  }

  if (!isMobile && solutionsSwiper) {
    solutionsSwiper.destroy(true, true);
    solutionsSwiper = null;
  }
}

initSolutionsSwiper();
window.addEventListener("resize", initSolutionsSwiper);

// Blog swiper only mobile
let blogSwiper = null;

function initBlogSwiper() {
  const isMobile = window.matchMedia("(max-width: 800px)").matches;
  const swiperEl = document.querySelector(".blog-mobile-swiper");

  if (!swiperEl) return;

  if (isMobile && !blogSwiper) {
    blogSwiper = new Swiper(".blog-mobile-swiper", {
      slidesPerView: 1,
      spaceBetween: 12,
      grabCursor: true,
      simulateTouch: true,

      pagination: {
        el: ".blog-mobile-pagination",
        clickable: true,
      },
    });
  }

  if (!isMobile && blogSwiper) {
    blogSwiper.destroy(true, true);
    blogSwiper = null;
  }
}

initBlogSwiper();
window.addEventListener("resize", initBlogSwiper);

// FAQ accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-item__head");

  if (!button) return;

  button.addEventListener("click", () => {
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("is-open");
      }
    });

    item.classList.toggle("is-open");
  });
});

// Flagship tabs
const flagshipSection = document.querySelector(".flagship");

if (flagshipSection) {
  const flagshipTabs = flagshipSection.querySelectorAll(
    "[data-flagship-tab]"
  );

  const flagshipPanels = flagshipSection.querySelectorAll(
    "[data-flagship-panel]"
  );

  flagshipTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const activeIndex = tab.dataset.flagshipTab;

      flagshipTabs.forEach((item) => {
        const isActive =
          item.dataset.flagshipTab === activeIndex;

        item.classList.toggle("is-active", isActive);
        item.setAttribute(
          "aria-selected",
          String(isActive)
        );
      });

      flagshipPanels.forEach((panel) => {
        const isActive =
          panel.dataset.flagshipPanel === activeIndex;

        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    });
  });
}

// Client interviews
const interviewsSection = document.querySelector(".interviews");

if (interviewsSection) {
  const slides = Array.from(
    interviewsSection.querySelectorAll("[data-interview-slide]")
  );

  const thumbs = Array.from(
    interviewsSection.querySelectorAll("[data-interview-thumb]")
  );

  const prevButton = interviewsSection.querySelector(
    "[data-interview-prev]"
  );

  const nextButton = interviewsSection.querySelector(
    "[data-interview-next]"
  );

  let activeIndex = 0;

  const showInterview = (index) => {
    if (!slides.length) return;

    activeIndex = Math.max(
      0,
      Math.min(index, slides.length - 1)
    );

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;

      slide.classList.toggle("is-active", isActive);
      slide.hidden = !isActive;
    });

    thumbs.forEach((thumb, thumbIndex) => {
      const isActive = thumbIndex === activeIndex;

      thumb.classList.toggle("is-active", isActive);
      thumb.setAttribute("aria-pressed", String(isActive));
    });

    prevButton?.classList.toggle(
      "is-edge",
      activeIndex === 0
    );

    nextButton?.classList.toggle(
      "is-edge",
      activeIndex === slides.length - 1
    );
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      showInterview(index);
    });
  });

  prevButton?.addEventListener("click", () => {
    if (activeIndex > 0) {
      showInterview(activeIndex - 1);
    }
  });

  nextButton?.addEventListener("click", () => {
    if (activeIndex < slides.length - 1) {
      showInterview(activeIndex + 1);
    }
  });

  interviewsSection
    .querySelectorAll("[data-interview-video]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const videoUrl = button.dataset.interviewVideo;

        if (!videoUrl) return;

        window.open(
          videoUrl,
          "_blank",
          "noopener,noreferrer"
        );
      });
    });

  showInterview(0);
}