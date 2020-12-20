import "../scss/main.scss";

// uncomment the lines below to enable PWA
import { registerSW } from "./pwa.js";
registerSW();

// DAY1 keyboard

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

// button.addEventListener("click", playSound);   ----czemu to nie dziaaaa
// button.onclick = playSound;

for (let button of buttons) {
	button.addEventListener("transitionend", () => {
		button.classList.remove("day1__button--click");
	});
}

// DAY2 CLOCK
const handSecond = document.querySelector(".day2__hand--seconds");
const handMinute = document.querySelector(".day2__hand--minutes");
const handHours = document.querySelector(".day2__hand--hours");
const hands = document.querySelectorAll(".day2__hand");

function setDate() {
	const now = new Date();
	const seconds = now.getSeconds();
	const minutes = now.getMinutes();
	const hours = now.getHours();
	const secondsDegrees = (seconds / 60) * 360 - 90;
	const minutesDegrees = (minutes / 60) * 360 - 90;
	const hoursDegrees = (hours / 12) * 360 - 90 + (minutesDegrees + 90) / 12;
	handSecond.style.transform = `rotate(${secondsDegrees}deg)`;
	handMinute.style.transform = `rotate(${minutesDegrees}deg)`;
	handHours.style.transform = `rotate(${hoursDegrees}deg)`;
	console.log(`it is ${hours}:${minutes}:${seconds}`);
	if (secondsDegrees == -90) {
		handSecond.style.transition = "none";
	} else {
		handSecond.style.transition = "";
	}
}
setInterval(setDate, 1000); //odpala wskazaną funkcje co 1s (1000 ms);

// if (secondsDegrees === 90) {
// 	hands.forEach((hand.style.tranform = `none`));
// } else {
// 	hands.forEach((hand.style.transform = ""));
// }

// function glich() {

// }
