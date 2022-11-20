import style from "./index.module.css";

export const controls = document.createElement("div");

controls.innerHTML = /* html */ `
  <p>Game speed: <span id="showGameSpeed">2</span></p>
  <input type="range" min="0" max="20" value="2" class="${style.slider}" id="slider" />
`;
