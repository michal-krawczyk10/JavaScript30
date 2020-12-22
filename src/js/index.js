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

//DAY 3

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
// DAY 4 ARRAY CARDIO
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
//   array.prototype.filter()
// 1. the list of inventors for those who were born in 1500's
//filter can tak 10 things and return 2, or any

const day4p1 = document.querySelector(".day4__p1--js");
const bornIn1500s = inventors.filter((inventor) => {
	if (inventor.year >= 1500 && inventor.year <= 1599) {
		return true;
	}
});
// //destructuring objects nested in array, with pulling it into new unique variable, usable later, but annoying to use in this case as lot of manual code lines needed later, so I greyed it, to remember the method
// const [
// 	{ first: newFirst, last: newLast, year: newYear, passed: newPassed },
// 	{ first: d4p1BFirst, last: d4p1BLast, year: d4p1BYear, passed: d4p1BPassed },
// ] = bornIn1500s;

// better to do it this way: loop using forEach with destructuring objects of array
bornIn1500s.forEach((arrayItem) => {
	const { first, last, year, passed } = arrayItem;
	day4p1.innerHTML += `<p>${first} ${last} lived from ${year} to ${passed}</p>`; // innerHTML +=, makes all added, not only one;
});

//array.prototype.map()
//2. give us and array of the inventors first and last names

//map takes inner array, do something to it and returns new array of the same lenght; takes 10 returns 10;

const fullInventorNames = inventors.map(
	(inventor) => ` ${inventor.first} ${inventor.last}`
);

const day4p2 = document.querySelector(".day4__p2--js");
day4p2.innerHTML = fullInventorNames;

//array.prototype.sort
//3 sort the inventors by birthdate, oldest to youngest
// sort get two items and check is 'a' bigger then 'b' and puts bigger on top
const orderedInventors = inventors.sort(function (a, b) {
	if (a.year > b.year) {
		return 1;
	} else {
		return -1;
	}
});

const day4p3 = document.querySelector(".day4__p3--js");

orderedInventors.forEach((arrayItem) => {
	const { first, last, year, passed } = arrayItem;
	day4p3.innerHTML += `<p>${first} ${last} was born in ${year}</p>`;
});

// array.prototype.reduce
// 4 how many years did all inventors live
// reduce is another loop, makes total amount out of checked array values

const totalYears = inventors.reduce((total, inventor) => {
	return total + (inventor.passed - inventor.year);
}, 0); // 0 at the end is important using reduce, as total is undefined during first loop; if we put other value here, it will be added
const day4p4 = document.querySelector(".day4__p4--js");

day4p4.innerHTML = totalYears;

// 5
