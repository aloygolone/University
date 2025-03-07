import { checkpointsData } from "../../lib/checkpoints.js";

export function renderPathComponent(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Контейнер с id "${containerId}" не найден`);
    return;
  }

  container.style.position = "relative";
  container.style.width = "980px";
  container.style.height = "630px";

  const pathFull = document.createElement("div");
  pathFull.style.backgroundImage = "url(../../assets/images/path/pathFull.png)";
  pathFull.style.position = "absolute";
  pathFull.style.left = "78px";
  pathFull.style.top = "21px";
  pathFull.style.width = "100%";
  pathFull.style.height = "100%";
  pathFull.style.backgroundRepeat = "no-repeat";

  container.appendChild(pathFull);

  checkpointsData.forEach((checkpoint) => {
    const button = document.createElement("div");
    button.id = `checkpoint-${checkpoint.id}`;
    button.style.position = "absolute";
    button.style.left = checkpoint.left;
    button.style.top = checkpoint.top;
    button.style.zIndex = checkpoint.z_index;
    button.style.backgroundRepeat = "no-repeat";

    switch (checkpoint.color) {
      case "gray":
        button.style.backgroundImage =
          "url(../../assets/images/path/grayCheckpoint.png)";
        break;
      case "red":
        button.style.backgroundImage =
          "url(../../assets/images/path/redCheckpoint.png)";
        break;
      case "black":
        button.style.backgroundImage =
          "url(../../assets/images/path/blackCheckpoint.png)";
        break;
      default:
        button.style.backgroundColor = "transparent";
    }
    button.style.width = "25px";
    button.style.height = "17px";
    container.appendChild(button);
  });
}
