import { renderFriendsComponent } from "./friendsComponent.js";

export function renderNavigationComponent(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Контейнер с id "${containerId}" не найден`);
    return;
  }

  container.style.marginBottom = "18px";
  container.style.display = "flex";
  container.style.marginLeft = '3px'
  container.style.gap = '4px'
  container.style.alignItems = "center";

  const friendsContainer = document.createElement("div");
  friendsContainer.id = "friends-component";
  container.appendChild(friendsContainer);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-container";
  buttonsContainer.style.display = "flex";
  buttonsContainer.style.gap = "8px";

  const chatButton = document.createElement("div");
  chatButton.style.backgroundImage = `url(../../assets/images/buttons/chatBtnDark.png)`;
  chatButton.style.width = "68px";
  chatButton.style.height = "63px";

  const universityButton = document.createElement("div");
  universityButton.id = 'university-btn'
  universityButton.style.backgroundImage = `url(../../assets/images/buttons/universityBtn.png)`;
  universityButton.style.width = "205px";
  universityButton.style.height = "65px";

  const mailButton = document.createElement("div");
  mailButton.style.backgroundImage = `url(../../assets/images/buttons/mailBtn.png)`;
  mailButton.style.width = "68px";
  mailButton.style.height = "64px";

  const leaderboardButton = document.createElement("div");
  leaderboardButton.id = 'leaderboard-btn'
  leaderboardButton.style.backgroundImage = `url(../../assets/images/buttons/leaderboardBtn.png)`;
  leaderboardButton.style.width = "66px";
  leaderboardButton.style.height = "61px";

  const buttons = [chatButton, universityButton, mailButton, leaderboardButton];
  buttons.forEach((button) => buttonsContainer.appendChild(button));
  container.appendChild(buttonsContainer);

  renderFriendsComponent("friends-component");
}
