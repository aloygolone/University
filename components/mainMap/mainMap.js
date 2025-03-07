import { checkpointsData } from "../../lib/checkpoints.js";
import { renderNavigationComponent } from "../navigation/navigationComponent.js";
import { renderPathComponent } from "../path/path.js";

let currentStep = 0;

export function renderMainMap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Контейнер с id "${containerId}" не найден`);
    return;
  }

  container.style.width = "980px";
  container.style.height = "630px";
  container.style.position = "relative";

  const pathContainer = document.createElement("div");
  pathContainer.id = "path-container";
  pathContainer.style.zIndex = 9;
  container.appendChild(pathContainer);

  const navigationContainer = document.createElement("div");
  navigationContainer.id = "navigation-container";
  navigationContainer.style.position = "absolute";
  navigationContainer.style.bottom = "0";
  navigationContainer.style.zIndex = 70;
  container.appendChild(navigationContainer);

  const firstCheckpoint = document.createElement("div");
  firstCheckpoint.style.backgroundImage =
    "url(../../assets/images/mainBack/firstCheckpointBtn.png)";
  firstCheckpoint.style.left = "427px";
  firstCheckpoint.style.top = "493px";
  firstCheckpoint.style.zIndex = 11;
  firstCheckpoint.style.position = "absolute";
  firstCheckpoint.style.width = "36px";
  firstCheckpoint.style.height = "26px";

  const firstCheckpointTxt = document.createElement("div");
  firstCheckpointTxt.style.backgroundImage = `url(../../assets/images/mainBack/firstCheckpointTxt.png)`;
  firstCheckpointTxt.style.left = "425px";
  firstCheckpointTxt.style.top = "503px";
  firstCheckpointTxt.style.zIndex = 5;
  firstCheckpointTxt.style.position = "absolute";
  firstCheckpointTxt.style.width = "68px";
  firstCheckpointTxt.style.height = "40px";

  const lastCheckpoint = document.createElement("div");
  lastCheckpoint.style.backgroundImage = `url(../../assets/images/mainBack/lastCheckpointBtn.png)`;
  lastCheckpoint.style.left = "865px";
  lastCheckpoint.style.top = "158px";
  lastCheckpoint.style.zIndex = 10;
  lastCheckpoint.style.position = "absolute";
  lastCheckpoint.style.width = "44px";
  lastCheckpoint.style.height = "34px";
  lastCheckpoint.style.backgroundRepeat = "no-repeat";

  const lastCheckpointTxt = document.createElement("div");
  lastCheckpointTxt.style.backgroundImage = `url(../../assets/images/mainBack/lastCheckpointTxt.png)`;
  lastCheckpointTxt.style.left = "862px";
  lastCheckpointTxt.style.top = "148px";
  lastCheckpointTxt.style.zIndex = 6;
  lastCheckpointTxt.style.position = "absolute";
  lastCheckpointTxt.style.width = "105px";
  lastCheckpointTxt.style.height = "58px";

  const studentWoman = document.createElement("div");
  studentWoman.className = "student-woman";
  studentWoman.style.backgroundImage = `url(../../assets/images/persons/studentWoman.png)`;
  studentWoman.style.position = "absolute";
  studentWoman.style.left = "434px";
  studentWoman.style.top = "438px";
  studentWoman.style.zIndex = 100;
  studentWoman.style.width = "21px";
  studentWoman.style.height = "69px";

  const flower = document.createElement("div");
  flower.style.backgroundImage = "url(../../assets/images/mainBack/flower.png)";
  flower.className = "flower";
  flower.style.left = "355px";
  flower.style.top = "475px";
  flower.style.zIndex = 8;
  flower.style.position = "absolute";
  flower.style.width = "55px";
  flower.style.height = "69px";

  const stairs = document.createElement("div");
  stairs.style.backgroundImage = `url(../../assets/images/mainBack/stairs.png)`;
  stairs.className = "stairs";
  stairs.style.left = "378px";
  stairs.style.top = "459px";
  stairs.style.zIndex = 4;
  stairs.style.position = "absolute";
  stairs.style.width = "60px";
  stairs.style.height = "50px";

  const furniture = document.createElement("div");
  furniture.style.backgroundImage = `url(../../assets/images/mainBack/furniture.png)`;
  furniture.className = "furniture";
  furniture.style.zIndex = 3;
  furniture.style.position = "absolute";
  furniture.style.left = "0px";
  furniture.style.top = "0px";
  furniture.style.width = "980px";
  furniture.style.height = "605px";

  const background = document.createElement("div");
  background.style.backgroundImage = `url(../../assets/images/mainBack/mainBack.png)`;
  background.className = "backMain";
  background.style.position = "absolute";
  background.style.zIndex = 2;
  background.style.left = "0px";
  background.style.top = "0px";
  background.style.width = "980px";
  background.style.height = "630px";

  const mainBack = [
    studentWoman,
    firstCheckpoint,
    firstCheckpointTxt,
    lastCheckpoint,
    lastCheckpointTxt,
    flower,
    stairs,
    furniture,
    background,
  ];

  mainBack.forEach((backElement) => container.appendChild(backElement));

  renderPathComponent("path-container");
  renderNavigationComponent("navigation-container");

  function moveStudentWoman() {
    if (currentStep < checkpointsData.length) {
      const { left, top } = checkpointsData[currentStep];
      const targetLeft = parseInt(left);
      const targetTop = parseInt(top) - parseInt(studentWoman.style.height);
  
      const startLeft = parseInt(studentWoman.style.left);
      const startTop = parseInt(studentWoman.style.top);
  
      const steps = 60; 
      let stepCount = 0;

      function animate() {
        stepCount++;
        const progress = stepCount / steps;
  

        const currentLeft = startLeft + (targetLeft - startLeft) * progress;
        const currentTop = startTop + (targetTop - startTop) * progress;
  
        studentWoman.style.left = `${currentLeft}px`;
        studentWoman.style.top = `${currentTop}px`;
  

        if (stepCount < steps) {
          requestAnimationFrame(animate);
        } else {
          currentStep++; 
          console.log("Кнопка нажата!");
        }
      }

      requestAnimationFrame(animate);
    } else {
      console.log("Достигнута конечная точка");
    }
  }

  const universityButton = document.getElementById("university-btn");
  if (universityButton) {
    universityButton.addEventListener("click", function () {
      moveStudentWoman();
    });
  }
}
