import { data } from "../../lib/data.js";

export function renderLeaderboardComponent(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Контейнер с id "${containerId}" не найден`);
    return;
  }

  container.style.width = "980px";
  container.style.height = "630px";
  container.style.backgroundImage =
    "url(../../assets/images/leaderboardModal/blackout.png)";
container.style.position = 'absolute'
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.color = "white";

  const leaderboard = document.createElement("div");
  leaderboard.style.width = "523px";
  leaderboard.style.height = "455px";
  leaderboard.style.position = "relative";
  leaderboard.style.backgroundImage =
    "url(../../assets/images/leaderboardModal/ratingMainBack.png)";
  leaderboard.style.opacity = "0"; 
  leaderboard.style.transform = "translateY(-20px)"; 
  leaderboard.style.transition = "opacity 0.5s ease, transform 0.5s ease"; 
  container.appendChild(leaderboard);


  setTimeout(() => {
    leaderboard.style.opacity = "1"; 
    leaderboard.style.transform = "translateY(0)"; 
  }, 0);

  const title = document.createElement("h2");
  title.innerText = "Рейтинг игроков";
  title.style.backgroundImage =
    "url(../../assets/images/leaderboardModal/ratingTitleBack.png)";
  title.style.textAlign = "center";
  title.style.position = "absolute";
  title.style.top = "-20px";
  title.style.left = "135px";
  title.style.width = "264px";
  title.style.height = "33px";
  leaderboard.appendChild(title);

  const closeButton = document.createElement("div");
  closeButton.style.backgroundImage =
    "url(../../assets/images/leaderboardModal/closeBtn.png)";
  closeButton.style.position = "absolute";
  closeButton.style.width = "26px";
  closeButton.style.height = "26px";
  closeButton.style.top = "14px";
  closeButton.style.left = "480px";
  closeButton.style.cursor = "pointer";
  closeButton.onclick = () => {
    leaderboard.style.opacity = "0"; 
    leaderboard.style.transform = "translateY(-20px)"; 
    setTimeout(() => {
      container.style.display = "none"; 
    }, 500); 
  };
  leaderboard.appendChild(closeButton);

  const leadersContainer = document.createElement("div");
  leadersContainer.style.backgroundImage =
    "url(../../assets/images/leaderboardModal/ratingBoardBack.png)";
  leadersContainer.style.position = "absolute";
  leadersContainer.style.width = "464px";
  leadersContainer.style.height = "260px";
  leadersContainer.style.top = "94px";
  leadersContainer.style.left = "29px";
  leadersContainer.style.display = "flex";
  leadersContainer.style.flexDirection = "column";
  leadersContainer.style.justifyContent = "flex-start";
  leadersContainer.style.gap = "7px";
  leadersContainer.style.overflowY = "auto";
  leadersContainer.style.padding = "30px";
  leadersContainer.style.backgroundRepeat = "no-repeat";
  leaderboard.appendChild(leadersContainer);

  const header = document.createElement("div");
  header.style.backgroundImage =
    "url(../../assets/images/leaderboardModal/ratingBoardTitleBack.png)";
  header.style.width = "403px";
  header.style.height = "29px";
  header.style.textAlign = "center";
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.fontWeight = "bold";
  header.style.padding = "9px";
  header.style.backgroundRepeat = "no-repeat";
  leadersContainer.appendChild(header);

  const placeHeader = document.createElement("div");
  placeHeader.innerText = "Место";
  placeHeader.style.width = "66px";
  header.appendChild(placeHeader);

  const nameHeader = document.createElement("div");
  nameHeader.innerText = "Имя Фамилия";
  nameHeader.style.width = "230px";
  header.appendChild(nameHeader);

  const pointsHeader = document.createElement("div");
  pointsHeader.innerText = "Опыт";
  pointsHeader.style.width = "75px";
  pointsHeader.style.marginRight = "31px";
  header.appendChild(pointsHeader);

  if (data.rating && Array.isArray(data.rating)) {
    const friendsSet = new Set(data.friends.map(friend => `${friend.name} ${friend.lastName}`)); 

    const leadersList = data.rating.map((leader, index) => {
      const leaderItem = document.createElement("div");
      leaderItem.style.display = "flex";
      leaderItem.style.justifyContent = "space-between";
      leaderItem.style.width = '380px'
      leaderItem.style.padding = "10px";
      leaderItem.style.borderBottom = "1px solid #ccc";

      if (friendsSet.has(`${leader.name} ${leader.lastName}`)) {
        leaderItem.style.backgroundColor = "rgba(255, 255, 0, 0.3)"; 
      }

      const place = document.createElement("div");
      place.innerText = index + 1;
      leaderItem.appendChild(place);

      const name = document.createElement("div");
      name.innerText = `${leader.name} ${leader.lastName}`;
      leaderItem.appendChild(name);

      const points = document.createElement("div");
      points.innerText = leader.points;
      leaderItem.appendChild(points);

      return leaderItem;
    });

    leadersList.forEach((item) => leadersContainer.appendChild(item));
  } else {
    const noDataMessage = document.createElement("div");
    noDataMessage.innerText = "Нет данных для отображения.";
    noDataMessage.style.textAlign = "center";
    noDataMessage.style.padding = "20px";
    leadersContainer.appendChild(noDataMessage);
  }
}