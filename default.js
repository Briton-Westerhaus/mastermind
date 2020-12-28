let currentrow;
let gamearray = new Array(4);

function newgame() {
	let element = document.getElementById("currentcolor");
	let theColor;
	element.style.backgroundColor = 'red';
	currentrow = 1;
	document.getElementById(currentrow).style.backgroundImage = "url(arrow.png)";
	for (let i = 0; i < 4; i++) {
		theColor = Math.round(5 * Math.random());
		switch (theColor) {
			case 0:
				gamearray[i] = "red";
				break;

			case 1:
				gamearray[i] = "blue";
				break;

			case 2:
				gamearray[i] = "green";
				break;

			case 3:
				gamearray[i] = "white";
				break;

			case 4:
				gamearray[i] = "yellow";
				break;

			case 5:
				gamearray[i] = "orange";
				break;

			default:
				break;
		}
	}
}

function changeColor(color) {
	let element = document.getElementById("currentcolor");
	element.style.backgroundColor = color;
	document.getElementById("Background").style.cursor="url(" + color + ".cur) 16 16, auto";
}

function colorme(thisone) {
	if (thisone.id.substring(0,1) == currentrow || thisone.id.substring(0,2) == currentrow)
		thisone.childNodes[0].style.backgroundColor = document.getElementById("currentcolor").style.backgroundColor;
		thisone.className = "placed-pin";
}

function guess() {
	let reds = 0;
	let pinplacedi = new Array(false, false, false, false);
	let pinplacedj = new Array(false, false, false, false);
	for (let i = 0; i < 4; i++) {
		if (document.getElementById(currentrow + "." + i).childNodes[0].style.backgroundColor == gamearray[i]) {
			placepin('red');
			pinplacedi[i] = true;
			pinplacedj[i] = true;
			reds++;
		}
	}
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (document.getElementById(currentrow + "." + i).childNodes[0].style.backgroundColor == gamearray[j] && !pinplacedj[j] && !pinplacedi[i]) {
				placepin('white');
				pinplacedi[i] = true;
				pinplacedj[j] = true;
			}
		}
	}
	document.getElementById(currentrow).style.backgroundImage = "";
	currentrow++;
	document.getElementById(currentrow).style.backgroundImage = "url(arrow.png)";
	if (reds == 4) {
		endofgame('You Win!');
		return;
	}
	if (currentrow == 11)
		endofgame('You Lose :(');
}

function placepin(color) {
	for (let i = 0; i < 4; i++) {
		if (document.getElementById("2" + currentrow + "." + i).style.backgroundColor != 'red' && document.getElementById("2" + currentrow + "." + i).style.backgroundColor != 'white') {
			document.getElementById("2" + currentrow + "." + i).style.backgroundColor = color;
			return;
		}
	}
}

function endofgame(message) {
	for (let i = 0; i < 4; i++) {
		document.getElementById("11." + i).style.backgroundColor = gamearray[i];
	}
	let answer = confirm(message + "\nWould you like to play a new game?");
	
	if (answer)
		window.location.reload(false);
}

/**
 * Shows the help modal.
 */
function showModal() {
    document.getElementById("ModalContainer").style.display = "block";  
}

/**
 * Hides the help modal.
 */
function hideModal() {
    document.getElementById("ModalContainer").style.display = "None";
}