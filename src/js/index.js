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
const handHour = document.querySelector(".day2__hand--hours");
const hands = document.querySelectorAll(".day2__hand");
const digitalClock = document.querySelector(".day2__digital");

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
	handHour.style.transform = `rotate(${hoursDegrees}deg)`;
	digitalClock.innerHTML = `it is ${hours}:${minutes}:${seconds}`;

	for (let stopTrans of hands) {
		if (secondsDegrees == -90 || minutesDegrees == -90 || hoursDegrees == -90) {
			stopTrans.style.transition = "none";
		} else {
			stopTrans.style.transition = "";
		}
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

const inputs = document.querySelectorAll(".day3__input");

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));
inputs.forEach((input) => input.addEventListener("touchmove", handleUpdate));

function handleUpdate() {
	const suffix = this.dataset.sizing || "";
	document.documentElement.style.setProperty(
		`--${this.name}`,
		this.value + suffix
	);
	console.log(this.value + suffix);
}
// day 4
const inventors = [
	{ first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
	{ first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
	{ first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
	{ first: "Marie", last: "Curie", year: 1867, passed: 1934 },
	{ first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
	{ first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
	{ first: "Max", last: "Planck", year: 1858, passed: 1947 },
];
const people = [
	"Beck, Glenn",
	"Becker, Carl",
	"Beckett, Samuel",
	"Beddoes Mick",
	"Beecher, Henry",
	"Beethoven, Ludwig",
	"Begin, Menachem",
	"Belloc, Hilaire",
	"Bellow, Saul",
	"Benchley, Robert",
	"Benenson, Peter",
	"Ben-Gurion, David",
	"Benjamin, Walete",
	"Benn, Tony",
	"Bensons, Leana",
	"Bernhard, Sandra",
	"Berry, Haile",
	"Bethea, Erin",
	"Bevan, Aneurin",
];
