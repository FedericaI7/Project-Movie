import { httpGET } from "./http.js";

const cE = (element) => document.createElement(element);

const sliderContainer = () => {
  const sliderContainer = cE("div");
  sliderContainer.className = "slider";

  return sliderContainer;
};

const slide = (x, btntext) => {
  const slideContainer = cE("div");
  const heroOverlay = cE("div");
  const imgEl = cE("img");
  const heroText = cE("div");
  const h1El = cE("h1");
  const btnLink = cE("a");

  slideContainer.className = "slide active";
  heroOverlay.className = "hero-overlay";
  imgEl.src = `https://image.tmdb.org/t/p/original${x.backdrop_path}`;
  imgEl.alt = x.title;
  heroText.className = "hero-text";
  h1El.textContent = x.title;
  btnLink.href = "#";
  btnLink.textContent = btntext;

  slideContainer.append(heroOverlay, imgEl, heroText);
  heroText.append(h1El, btnLink);

  return slideContainer;
};

const slideNavigation = () => {
  const navigationContainer = cE("div");
  const prevBtn = cE("i");
  const nextBtn = cE("i");

  navigationContainer.className = "navigation";
  prevBtn.className = "bi bi-chevron-compact-left prev-btn";
  nextBtn.className = "bi bi-chevron-compact-right next-btn";

  navigationContainer.append(prevBtn, nextBtn);

  return navigationContainer;
};

const navigationVisibility = () => {
  const navigationVisContainer = cE("div");
  let slideIcon = "";

  for (let i = 0; i < 5; i++) {
    slideIcon = cE("div");
    if (i === 0) {
      slideIcon.className = "slide-icon active";
    } else {
      slideIcon.className = "slide-icon";
    }
    navigationVisContainer.append(slideIcon);
  }

  navigationVisContainer.className = "navigation-visibility";

  return navigationVisContainer;
};

//ASYNC

const section = document.createElement("section");
section.className = "section";
document.body.appendChild(section);

const createSectionHero = async () => {
  const data = await httpGET("/movie/popular");

  const sliderCont = sliderContainer();
  section.appendChild(sliderCont);

  data.results.slice(1, 6).map((movie) => {
    const btnText = "WATCH TRAILER"; // Testo del pulsante
    const movieSlide = slide(movie, btnText);
    sliderCont.appendChild(movieSlide);
  });

  sliderCont.appendChild(slideNavigation());
  sliderCont.appendChild(navigationVisibility());

  const slider = document.querySelector(".slider");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const slides = document.querySelectorAll(".slide");
  const slideIcons = document.querySelectorAll(".slide-icon");
  const numberOfSlides = slides.length;
  let slideNumber = 0;

  //Image slider next button
  nextBtn.addEventListener("click", () => {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
      slideIcon.classList.remove("active");
    });

    slideNumber++;

    if (slideNumber > numberOfSlides - 1) {
      slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
  });

  //Image slider previous button

  prevBtn.addEventListener("click", () => {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
      slideIcon.classList.remove("active");
    });

    slideNumber--;

    if (slideNumber < 0) {
      slideNumber = numberOfSlides - 1;
    }

    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
  });

  let playSlider;

  let repeater = () => {
    playSlider = setInterval(function () {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });
      slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
      });

      slideNumber++;

      if (slideNumber > numberOfSlides - 1) {
        slideNumber = 0;
      }
      slides[slideNumber].classList.add("active");
      slideIcons[slideNumber].classList.add("active");
    }, 4000);
  };

  repeater();

  //stop the image autoplay on mouseover

  slider.addEventListener("mouseover", () => {
    clearInterval(playSlider);
  });

  //start the image slider autoplay again on mouseout

  slider.addEventListener("mouseout", () => {
    repeater();
  });
  return sliderCont;
};

export {
  sliderContainer,
  slide,
  slideNavigation,
  navigationVisibility,
  createSectionHero,
};
