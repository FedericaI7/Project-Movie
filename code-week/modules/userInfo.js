const cE = (element) => document.createElement(element);

const createUserInfo = () => {
  const divInfoContainer = cE("div");
  const pAccount = cE("p");
  const pInfo = cE("p");
  const pExit = cE("p");

  divInfoContainer.className = "divInfoContainer";
  pAccount.textContent = "Account";
  pInfo.textContent = "Info";
  pExit.textContent = "Exit";

  divInfoContainer.append(pAccount, pInfo, pExit);

  return divInfoContainer;
};

export { createUserInfo };
