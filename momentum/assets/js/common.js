let time = document.querySelector(".time"),
	date = document.querySelector(".date"),
	weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	greeting = document.querySelector(".greeting"),
	name = document.querySelector(".name"),
	focus = document.querySelector(".focus");

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
	setTimeout(	showTime, 1000)
}

//background change
function bgChange () {
	let today = new Date(),
	hour = today.getHours();
	if (hour < 6 ) {
		document.body.style.backgroundImage = "url('assets/images/night_1.jpg')"
	}
	else if (hour < 12) {
		document.body.style.backgroundImage = "url('assets/images/evening_1.jpg')"
	}
	else if (hour < 17) {
		document.body.style.backgroundImage = "url('assets/images/day_1.jpg')"
	}
	else {
		document.body.style.backgroundImage = "url('assets/images/evening_1.jpg')"
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




showTime()
bgChange()
getName()
getFocus()