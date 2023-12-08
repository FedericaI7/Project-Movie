import { httpGET } from "./http.js";

const cE = (element) => document.createElement(element);

const containerNavGen = () => {
  const containerNav = cE("div");
  containerNav.className = "container--nav";

  return containerNav;
};

const navbarLeftGen = (payoff) => {
  const navLeft = cE("div");
  const aLink = cE("a");
  const imgEl = cE("img");
  const pEl = cE("p");

  navLeft.className = "nav-left";
  aLink.href = "#";
  imgEl.src = "./logo/logoipsum-283.svg";
  imgEl.alt = "logo";
  pEl.textContent = payoff; //payoff

  navLeft.append(aLink, pEl);
  aLink.appendChild(imgEl);

  return navLeft;
};

const navbarRightGen = () => {
  const navRight = cE("div");

  navRight.className = "nav-right";

  return navRight;
};

const navbarUlGen = () => {
  const ulEl = cE("ul");
  ulEl.className = "nav-ul";

  return ulEl;
};

const navbarLiGen = () => {
  const liEl = cE("li");

  return liEl;
};

const selectGen = (selectName) => {
  const selectEl = cE("select");
  const defaultOption = cE("option");

  selectEl.name = selectName;
  selectEl.id = selectName;
  selectEl.className = selectName;

  defaultOption.value = "movie";
  defaultOption.textContent = selectName;

  selectEl.appendChild(defaultOption);

  return selectEl;
};

const listNavGen = (textlink) => {
  const firstLi = cE("li");
  const aLink = cE("a");
  const inputEl = cE("input");
  const secondLi = cE("li");
  const iSearch = cE("i");
  const thirdLi = cE("li");
  const iUser = cE("i");

  aLink.href = "#";
  aLink.textContent = textlink; //textlink
  inputEl.className = "inputBox";
  inputEl.setAttribute("type", "text");
  iSearch.className = "bi bi-search";
  iUser.className = "bi bi-person-circle";

  firstLi.appendChild(aLink);
  secondLi.appendChild(iSearch);
  thirdLi.appendChild(iUser);

  return [firstLi, inputEl, secondLi, thirdLi];
};

const navEl = cE("nav");
navEl.className = "navbar";
document.body.appendChild(navEl);

const createNav = async (endpoint, payoff, selectName, textlink) => {
  const containerNavGenEl = containerNavGen();
  const navbarLeftGenEl = navbarLeftGen(payoff);
  const navbarRightGenEl = navbarRightGen();
  const navbarUlGenEl = navbarUlGen();
  const navbarLiGenEl = navbarLiGen();
  const selectGenEl = selectGen(selectName);
  const listNavGenEl = listNavGen(textlink);

  const data = await httpGET(endpoint);
  data.genres.map((genre) => {
    const optionEl = cE("option");
    optionEl.value = genre.name;
    optionEl.id = genre.id;
    optionEl.textContent = genre.name;

    selectGenEl.appendChild(optionEl);
  });

  containerNavGenEl.append(navbarLeftGenEl, navbarRightGenEl);
  navbarRightGenEl.appendChild(navbarUlGenEl, navbarLiGenEl);
  navbarUlGenEl.append(navbarLiGenEl, ...listNavGenEl);
  navbarLiGenEl.appendChild(selectGenEl);

  return containerNavGenEl;
};

//Search

export { createNav };
