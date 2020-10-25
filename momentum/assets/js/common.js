let time = document.querySelector(".time"),
	date = document.querySelector(".date"),
	weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	partsOfDay = document.querySelector(".partsOfDay"),
	name = document.querySelector(".name"),
	focus = document.querySelector(".focus"),
	multiArrRandomNum = [],
	arrRandomNum = [],
	partsOfDayArr = ["night", "morning", "day", "evening"],
	currentHour = (new Date()).getHours();
	leftArr = document.querySelector(".sliderL"),
	rightArr = document.querySelector(".sliderR"),
	counterSlides = currentHour,
	counterPartsOfDay = Math.floor(currentHour/6),
	animation = false;

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getRand (qty) {
	if (arrRandomNum.length < qty) {
		let number = getRandomIntInclusive(1, 6);
		if (arrRandomNum.includes(number)) {
			getRand(qty)
		} else {
			arrRandomNum.push(number);
			getRand(qty)}
	} else { return }
}

while (multiArrRandomNum.length < 4) {
	getRand(6);
	multiArrRandomNum.push(arrRandomNum);
	arrRandomNum = [];
 }



function showTime() {
	let today = new Date(),
	hour = today.getHours(),
	min = today.getMinutes(),
	second = today.getSeconds(),
	dayOfWeek = weekDays[today.getDay()];
	dayOfMonth = today.getDate();
	month = months[today.getMonth()];
	if (hour < 10) {hour = "0" + hour}
	if (second < 10) {second = "0" + second}
	if (min < 10) {min = "0" + min}
	time.innerHTML = `${hour}<span>:</span>${min}<span>:</span>${second}`;
	date.innerHTML = `${dayOfWeek}, ${dayOfMonth} ${month}`;
	if (hour !== currentHour) {
		bgChange();
		currentHour = hour;
	}
	setTimeout(showTime, 1000)
}

//background change
function bgChange () {
	let today = new Date(),
	hour = today.getHours();
	if (hour < 6 ) {
		document.body.style.backgroundImage = `url('assets/images/${partsOfDayArr[0]}_${multiArrRandomNum[0][hour]}.jpg')`;
		partsOfDay.innerText = `${partsOfDayArr[0]} `;
	}
	else if (hour < 12) {
		document.body.style.backgroundImage = `url('assets/images/${partsOfDayArr[1]}_${multiArrRandomNum[1][hour - 6]}.jpg')`;
		partsOfDay.innerText = `${partsOfDayArr[1]} `;
	}
	else if (hour < 18) {
		document.body.style.backgroundImage = `url('assets/images/${partsOfDayArr[2]}_${multiArrRandomNum[2][hour - 12]}.jpg')`;
		partsOfDay.innerText = `${partsOfDayArr[2]} `;
	}
	else {
		document.body.style.backgroundImage = `url('assets/images/${partsOfDayArr[3]}_${multiArrRandomNum[3][hour - 18]}.jpg')`
		partsOfDay.innerText = `${partsOfDayArr[3]} `;
	}
}

function getName () {
	if(localStorage.getItem('name') === null) {
		name.textContent = "[Enter Name]"
	} else {
		name.textContent = localStorage.getItem('name');
	}
}

function getFocus () {
	if(localStorage.getItem('focus') === null) {
		focus.textContent = "[Enter Focus]"
	} else {
		focus.textContent = localStorage.getItem('focus');
	}
}


function setName(e) {
	if(e.type === `keypress`) {
		if((e.which == 13 || e.keyCode == 13) && name.textContent !== "") {
			localStorage.setItem('name', e.target.innerText);
			name.blur();
		} else if ((e.which == 13 || e.keyCode == 13)
					 && name.textContent === ""
					 && localStorage.getItem('name') === null) {
			name.textContent = "[Enter Name]";
			name.blur();
		} else if ((e.which == 13 || e.keyCode == 13)
					 && name.textContent === ""
					 && localStorage.getItem('name') !== null) {
			name.textContent = localStorage.getItem('name');
			name.blur();
		}
	} else {
		localStorage.setItem('name', e.target.innerText);
	}
}


function setFocus(e) {
	if(e.type === `keypress`) {
		if((e.which == 13 || e.keyCode == 13) && focus.textContent !== "") {
			localStorage.setItem('focus', e.target.innerText);
			focus.blur();
		} else if ((e.which == 13 || e.keyCode == 13)
					 && focus.textContent === ""
					 && localStorage.getItem('focus') === null) {
			focus.textContent = "[Enter Focus]";
			focus.blur();
		} else if ((e.which == 13 || e.keyCode == 13)
					 && focus.textContent === ""
					 && localStorage.getItem('focus') !== null) {
			focus.textContent = localStorage.getItem('focus');
			focus.blur();
		}
	} else {
		localStorage.setItem('focus', e.target.innerText);
	}
}




name.addEventListener('keypress', setName)
name.addEventListener('click', function() {
	name.textContent = "";
})
name.addEventListener('blur', function(){
	if (localStorage.getItem('name') === null) {
		name.textContent = "[Enter Name]"
	}	else {name.textContent = localStorage.getItem('name')}
})


focus.addEventListener('keypress', setFocus)
focus.addEventListener('click', function() {
	focus.textContent = "";
})

focus.addEventListener('blur', function(){
	if (localStorage.getItem('focus') === null) {
		focus.textContent = "[Enter Focus]"
	}	else {focus.textContent = localStorage.getItem('focus')}
})



	leftArr.addEventListener('click', function(){
		if (animation === false) {
			counterSlides--;
			if (counterSlides < 0) {
				counterSlides = multiArrRandomNum[0].length - 1;
				counterPartsOfDay--}
			if (counterPartsOfDay < 0) {counterPartsOfDay = 3}
			document.body.style.backgroundImage = `url('assets/images/${partsOfDayArr[counterPartsOfDay]}_${multiArrRandomNum[counterPartsOfDay][counterSlides]}.jpg')`;
			animation = true;
			setTimeout(function(){
			animation = false;
			}, 1500)
		}
	})

	rightArr.addEventListener('click', function(){
		if (animation === false) {
			counterSlides++;
			if (counterSlides > multiArrRandomNum[0].length - 1) {
				counterSlides = 0;
				counterPartsOfDay++;}
			if (counterPartsOfDay > 3) {counterPartsOfDay = 0}
			document.body.style.backgroundImage = `url('assets/images/${partsOfDayArr[counterPartsOfDay]}_${multiArrRandomNum[counterPartsOfDay][counterSlides]}.jpg')`;
			animation = true;
			setTimeout(function(){
			animation = false;
			}, 1500)
		}
	})




showTime()
bgChange()
getName()
getFocus()
