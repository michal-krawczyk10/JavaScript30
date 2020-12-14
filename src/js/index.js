import "../scss/main.scss";

// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

const buttons = document.querySelectorAll(".day1__button--js");

// buttons.addEventListener("click", () => {
// 	buttons.classList.add("day1__button--click");
// });

function playSound(e) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	if (!audio) return; //stops the function
	audio.currentTime = 0;
	audio.play();
	const button = document.querySelector(`li[data-key="${e.keyCode}"]`);
	button.classList.add("day1__button--click");
}

window.addEventListener("keydown", playSound);

for (let button of buttons) {
	button.addEventListener("transitionend", () => {
		button.classList.remove("day1__button--click");
	});
}
