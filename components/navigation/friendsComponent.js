import { friendsData } from "../../lib/friends.js";

export function renderFriendsComponent(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Контейнер с id "${containerId}" не найден`);
    return;
  }

  const friendsCopy = [...friendsData];

  console.log(friendsCopy[0].iconSrc);

  const friendsContainer = document.createElement("div");
  friendsContainer.className = "friends-container";
  friendsContainer.style.backgroundImage = `url(../../assets/images/friends/friendsBlockBack.png)`;
  friendsContainer.style.backgroundRepeat = "no-repeat";
  friendsContainer.style.display = "flex";
  friendsContainer.style.alignItems = "center";
  friendsContainer.style.width = "536px";
  friendsContainer.style.height = "63px";

  const leftArrow = document.createElement("div");
  leftArrow.style.backgroundImage =
    "url(../../assets/images/buttons/arrowLeftBtn.png)";
  leftArrow.style.cursor = "pointer";
  leftArrow.style.marginLeft = "10px";
  leftArrow.style.width = "17px";
  leftArrow.style.height = "30px";
  leftArrow.style.backgroundRepeat = "no-repeat";
  leftArrow.onclick = () => moveFriends(-1);

  const friendsGrid = document.createElement("div");
  friendsGrid.className = "friends-grid";
  friendsGrid.style.display = "flex";
  friendsGrid.style.alignItems = "flex-end";
  friendsGrid.style.overflowX = "auto";
  friendsGrid.style.width = "100%";

  function renderFriends() {
    friendsGrid.innerHTML = "";
    friendsCopy.slice(0).forEach((friendData, index) => {
      const friendBlock = document.createElement("div");
      friendBlock.className = "friend-block";
      friendBlock.style.backgroundImage = `url(${friendData.iconBackSrc})`;
      friendBlock.style.width = "50px";
      friendBlock.style.height = "51px";
      friendBlock.style.display = "flex";
      friendBlock.style.marginLeft = "10px";
      friendBlock.style.flexDirection = "column";
      friendBlock.style.alignItems = "center";
      friendBlock.style.backgroundRepeat = "no-repeat";
      friendBlock.style.position = "relative";

      if (friendData.iconSrc) {
        const friendIcon = document.createElement("div");
        friendIcon.style.backgroundImage = `url(${friendData.iconSrc})`;
        friendIcon.setAttribute("data-id", friendData.id);
        friendIcon.style.width = "28px";
        friendIcon.style.height = "38px";
        friendIcon.style.position = "absolute";
        friendIcon.style.left = "50%";
        friendIcon.style.bottom = "2px";
        friendIcon.style.transform = "translateX(-50%)";
        friendBlock.appendChild(friendIcon);

        if (index === 0) {
          const plusIcon = document.createElement("div");
          plusIcon.style.backgroundImage =
            "url(../../assets/images/friends/plus.png)";
          plusIcon.style.width = "34px";
          plusIcon.style.height = "35px";
          plusIcon.style.position = "absolute";
          plusIcon.style.right = "-17px";
          plusIcon.style.top = "-20px";
          friendIcon.appendChild(plusIcon);
        }
      }

      friendsGrid.appendChild(friendBlock);
    });
  }

  const rightArrow = document.createElement("div");
  rightArrow.style.backgroundImage =
    "url(../../assets/images/buttons/arrowRightBtn.png)";
  rightArrow.style.cursor = "pointer";
  rightArrow.style.marginLeft = "6px";
  rightArrow.style.marginRight = "11px";
  rightArrow.style.width = "17px";
  rightArrow.style.height = "30px";
  rightArrow.style.backgroundRepeat = "no-repeat";
  rightArrow.onclick = () => moveFriends(1);

  friendsContainer.appendChild(leftArrow);
  friendsContainer.appendChild(friendsGrid);
  friendsContainer.appendChild(rightArrow);

  container.appendChild(friendsContainer);

  function moveFriends(direction) {
    const nonEmptyCount = friendsCopy.filter(
      (friend) => friend.iconSrc !== ""
    ).length;

    if (direction === 1) {
      const firstNonEmptyIndex = friendsCopy.findIndex(
        (friend) => friend.iconSrc !== ""
      );
      const firstEmptyIndex = friendsCopy.findIndex(
        (friend, index) => friend.iconSrc === "" && index > firstNonEmptyIndex
      );

      if (firstNonEmptyIndex !== -1) {
        friendsCopy[firstNonEmptyIndex].iconSrc = "";
      }

      if (firstEmptyIndex !== -1) {
        friendsCopy[firstEmptyIndex].iconSrc =
          "../../assets/images/friends/friendIcon.png";
      }
    } else if (direction === -1) {
      const firstNonEmptyIndex = friendsCopy
        .slice()
        .reverse()
        .findIndex((friend) => friend.iconSrc !== "");
      const firstEmptyIndex = friendsCopy
        .slice()
        .reverse()
        .findIndex(
          (friend, index) => friend.iconSrc === "" && index > firstNonEmptyIndex
        );

      if (firstNonEmptyIndex !== -1) {
        const actualNonEmptyIndex = friendsCopy.length - 1 - firstNonEmptyIndex;
        friendsCopy[actualNonEmptyIndex].iconSrc = "";
      }
      if (firstEmptyIndex !== -1) {
        const actualEmptyIndex = friendsCopy.length - 1 - firstEmptyIndex;
        friendsCopy[actualEmptyIndex].iconSrc =
          "../../assets/images/friends/friendIcon.png";
      }
    }

    renderFriends();
  }

  renderFriends();
}
