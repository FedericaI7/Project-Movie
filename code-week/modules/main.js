import { httpGET } from "./http.js";

const cE = (element) => document.createElement(element);
const listsContainerElGen = (title) => {
  const container = cE("div");
  const titleEl = cE("h3");

  container.className = "lists-container";
  titleEl.textContent = title;

  container.append(titleEl);
  return container;
};

const cardsListElGen = () => {
  const container = cE("div");

  container.className = "cards-list";

  return container;
};

const cardElGen = (imageData) => {
  const imageEl = cE("img");

  imageEl.className = "card-item";
  imageEl.src = `https://image.tmdb.org/t/p/w500${imageData.poster_path}`;
  imageEl.alt = imageData.name;
  imageEl.id = imageData.id;

  return imageEl;
};

const main = cE("main");
main.className = "main";
document.body.appendChild(main);

const createMain = async (endpoint, title) => {
  const data = await httpGET(endpoint);
  const listContainerEl = listsContainerElGen(title);
  const cardsListEl = cardsListElGen();

  data.results.map((film) => cardsListEl.append(cardElGen(film)));
  listContainerEl.append(cardsListEl);

  return listContainerEl;
};

export { createMain };
