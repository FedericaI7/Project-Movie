import { httpGET } from "./modules/http.js";
import { createNav } from "./modules/navbar.js";
import { createSectionHero } from "./modules/hero.js";
import { createMain } from "./modules/main.js";
import { modalGen } from "./modules/modal.js";

let mainEl = document.querySelector(".main");
let navEl = document.querySelector(".navbar");
let inputEl = document.querySelector(".inputBox");
const cE = (element) => document.createElement(element);

let divContainerResults = cE("div");
divContainerResults.className = "container-results";

//endpoint, payoff, name-menu-drop, textLink
createNav("/genre/movie/list", "MOVIE FOR YOU", "MOVIE", "REVIEWS").then(
  (el) => {
    navEl.append(el);
    let inputEl = document.querySelector(".inputBox");
    let searchEl = document.querySelector(".bi-search");
    let userEl = document.querySelector(".bi-person-circle");
    searchEl.addEventListener("click", () => {
      inputEl.value = "";
      if (inputEl.style.display == "none") {
        inputEl.style.display = "block";
        inputEl.addEventListener("input", async () => {
          if (inputEl.value != "") {
            const searchAPI = await httpGET(
              `/search/movie?query=${inputEl.value}&include_adult=false&language=en-US&page=1`
            );

            if (divContainerResults) {
              divContainerResults.remove();
            }

            divContainerResults = containResults(searchAPI);
          } else {
            // Se il campo di input è vuoto, rimuovi l'elemento container
            if (divContainerResults) {
              divContainerResults.remove();
              // divContainerResults = null; // reimposta la variabile a null
            }
          }
        });
        searchEl.style.color = "#2a0a81";
      } else {
        inputEl.style.display = "none";
        searchEl.style.color = "#d4cbcb";
        divContainerResults.remove();
      }
    });
  }
);

let containResults = (x) => {
  const apiArr = x.results.slice(0, 5);
  let arr = [];
  arr.push(apiArr);
  console.log(apiArr);

  apiArr.map((el) => {
    const divEl = cE("div");
    divEl.textContent = el.title;
    divEl.className = "result";
    divContainerResults.appendChild(divEl);
    divEl.margintTop = "30px";
    divEl.style.backgroundColor = "white";
    divEl.style.paddingTop = "10px";
  });

  apiArr.map((el) => console.log(el.title));

  navEl.appendChild(divContainerResults);
  return divContainerResults;
};

createSectionHero();

Promise.all([
  createMain("/movie/popular", "Movies - Popular"),
  createMain("/movie/top_rated", "Movies - Top Rated"),
]).then((elements) =>
  elements.map((el) => {
    mainEl.append(el);

    el.addEventListener("click", (event) => {
      if (event.target.nodeName === "IMG") {
        httpGET(`/movie/${event.target.id}`).then((data) => {
          const movieModalEl = modalGen(data, "WATCH TRAILER");
          const movieModalBtnEL = movieModalEl.querySelector(".close");

          document.body.append(movieModalEl);

          movieModalBtnEL.addEventListener("click", () =>
            movieModalEl.remove()
          );
        });
      }
    });
  })
);
