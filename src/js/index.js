import "../scss/main.scss";

// uncomment the lines below to enable PWA
import { registerSW } from "./pwa.js";
registerSW();

("use strict");
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
	"Bevan, Aneurin",
	"Beck, Glenn",
	"Ben-Gurion, David",
	"Begin, Menachem",
	"Belloc, Hilaire",
	"Benenson, Peter",
	"Berry, Haile",
	"Bethea, Erin",
	"Benjamin, Walete",
	"Benn, Tony",
	"Bensons, Leana",
	"Bernhard, Sandra",
	"Becker, Carl",
	"Beckett, Samuel",
	"Beddoes, Mick",
	"Beecher, Henry",
	"Beethoven, Ludwig",
	"Bellow, Saul",
	"Benchley, Robert",
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

// 5 sort inventors by years lived
//use sort

const oldestInventors = inventors.sort((a, b) => {
	const oneInventor = a.passed - a.year;
	const nextInventor = b.passed - b.year;
	if (oneInventor > nextInventor) {
		return -1;
	} else {
		return 1;
	}
});

const day4p5 = document.querySelector(".day4__p5--js");

oldestInventors.forEach((arrayItem) => {
	const { first, last, year, passed } = arrayItem;
	day4p5.innerHTML += `<p>${first} ${last} lived ${passed - year} years</p>`;
});

// 6 list of buleards in Paris that contain 'de' in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

//code underneath to bo used in dev tools of page linked above

// const d4Category = document.querySelector('.mw-category');
// const d4Links = [...d4Category.querySelectorAll('a')];

// const de = d4Links.map(link => link.textContent)
// .filter(streetName => streetName.includes('de'));

// 7. sort exercise, using .split
// sort array people alphabetically by first name
const day4p7 = document.querySelector(".day4__p7--js");

const day4Alpha = people.sort((lastOne, nextOne) => {
	const [aLast, aFirst] = lastOne.split(", ");
	const [bLast, bFirst] = nextOne.split(", ");
	return aFirst > bFirst ? 1 : -1; //ternary operator, skrócona wersja (if)

	// split use makes an array spliting by string used
});

day4Alpha.forEach((arrayItem) => {
	const [a, b] = arrayItem.split(", ");
	day4p7.innerHTML += `${b} ${a}, `;
});

// 8. reduce exercise: sum up the instances of each of these in array:
const d4Data = [
	"car",
	"car",
	"truck",
	"truck",
	"bike",
	"walk",
	"car",
	"van",
	"bike",
	"walk",
	"car",
	"van",
	"car",
	"truck",
];
const day4p8 = document.querySelector(".day4__p8--js");

// we start with a blank object, and every time we loop over one, we first see if is a zero there and then increment;
const day4Transport = d4Data.reduce(function (obj, item) {
	if (!obj[item]) {
		obj[item] = 0;
	} //check is there any object, set initial one to 0
	obj[item]++; //increment on each instance
	return obj;
}, {});

let day4json = JSON.stringify(day4Transport);
day4p8.innerHTML = day4json;

// DAY 5

const panels = document.querySelectorAll(".day5__panel");

function toggleOpen() {
	panels.forEach((panel) => {
		panel.classList.remove("open");
	});
	this.classList.toggle("open");
}
function toggleActive(e) {
	if (e.propertyName.includes("flex")) {
		this.classList.toggle("open--active");
	}
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));

panels.forEach((panel) =>
	panel.addEventListener("transitionend", toggleActive)
);

// for (let button of buttons) {
// 	button.addEventListener("transitionend", () => {
// 		button.classList.remove("day1__button--click");
// 	});
// }

//DAY 6

const endpoint =
	"https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = []; //need ampty array to put data into & then fetch

fetch(endpoint) //fetch as an argument uses url we want to ask about smth
	.then((resp) => resp.json()) //answer is amended to .json
	.then((resp) => cities.push(...resp)) //in resp is json with answer. //push adds element into array, use spread to change array into individual arguments
	.catch((error) => console.log("failed to fetch cities list")); //in case of some errors with api, adress etc, usefull

function findMatches(wordToMatch, cities) {
	return cities.filter((place) => {
		//put a variable into regular expression

		const regex = new RegExp(wordToMatch, "gi"); //RegExp is used for matching text with a pattern; uses flags: g - global search, i - ignores upper/lower cases, m - search in many lines
		return place.city.match(regex) || place.state.match(regex); //match method retrieves the result of matching a string against a regular expression
	});
}

function displayMatches() {
	const matchArray = findMatches(this.value, cities); //we have our data
	const html = matchArray
		.map((place) => {
			return `<li class="day6__item"><span>${place.city}, ${place.state}</span><span>${place.population}</span></li>`;
		})
		.join(""); //.join turns from array with multiple items onto one big string
	suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".day6__input");
const suggestions = document.querySelector(".day6__list");

searchInput.addEventListener("change", displayMatches); //works after enter, or click outside
searchInput.addEventListener("keyup", displayMatches); //works after every key pressed
