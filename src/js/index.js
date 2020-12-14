import "../scss/main.scss";

// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

const buttons = document.querySelectorAll(".day1__button--js");

// buttons.addEventListener("click", () => {
// 	buttons.classList.add("day1__button--click");
// });
for (let honk of buttons) {
	honk.addEventListener("click", () => {
		honk.classList.remove("day1__button--click");
		honk.classList.add("day1__button--click");
	});
}

window.addEventListener("keydown", function (e) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  audio.play();
});
