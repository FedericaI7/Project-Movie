const cE = (element) => document.createElement(element);

const modalGen = (x, textbtn) => {
  const modalContainer = cE("div");
  const spanEl = cE("span");
  const iEl = cE("i");
  const imgEl = cE("img");
  const scrollContent = cE("div");
  const modalInfo = cE("div");
  const h1El = cE("h1");
  const infoEl = cE("div");
  const pYear = cE("p");
  const pLang = cE("p");
  const pGenre = cE("p");
  const starsEl = cE("div");
  const pDescription = cE("p");
  const btnEl = cE("button");
  const iBtn = cE("i");

  modalContainer.className = "modal-container";
  spanEl.className = "close";
  iEl.className = "i bi-x";
  imgEl.src = `https://image.tmdb.org/t/p/w500${x.poster_path}`; //img
  imgEl.alt = x.title; //alt
  scrollContent.className = "scrollable-content";
  modalInfo.className = "modal-info";
  h1El.textContent = x.title; //titolo
  infoEl.className = "info";
  pYear.className = "year";
  pYear.textContent = x.release_date.split("-")[0]; //anno
  pLang.className = "language";
  pLang.textContent = "Language: " + x.original_language; // lingua
  pGenre.className = "genre";
  // pGenre.textContent = y.name; //genere
  starsEl.className = "Stars";
  starsEl.style.setProperty("--rating", x.vote_average); //
  pDescription.className = "description";
  pDescription.textContent = x.overview;
  btnEl.className = "btn-trailer";
  btnEl.textContent = textbtn; //bottone
  iBtn.className = "bi bi-play-fill";

  modalContainer.append(spanEl, imgEl, scrollContent);
  spanEl.appendChild(iEl);
  scrollContent.appendChild(modalInfo);
  modalInfo.append(h1El, infoEl, starsEl, pDescription, btnEl);
  infoEl.append(pYear, pLang, pGenre);
  btnEl.appendChild(iBtn);

  return modalContainer;
};

export { modalGen };
