let currentRow;
let gamearray = new Array(4); // Contains the winning colors
let currentColor = "red";

/**
 * Takes a string and capitalized the first letter.
 * @param {String} theString - String to capitalize
 */
function capitalize (theString) {
	return theString.charAt(0).toUpperCase() + theString.slice(1);
}

/**
 * Initiates the game.
 */
function newgame() {
	let element = document.getElementById(capitalize(currentColor));
	let theColor;
	element.className = "selected";
	currentRow = 1;
	document.getElementById(currentRow).style.backgroundImage = "url(arrow.png)";
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

/**
 * Changes the currently selected color/pin
 * @param {String} color - The color to change to
 */
function changeColor(color) {
	let element = document.getElementById(capitalize(currentColor));
	element.className = "";
	currentColor = color;
	element = document.getElementById(capitalize(currentColor));
	element.className = "selected";
	document.getElementById("Background").style.cursor="url(" + color + ".cur) 16 16, auto";
}

/**
 * Places a guess pin on the board
 * @param {Element} square - The board square to place the pin in. 
 */
function colorMe(square) {
	if (square.id.substring(0,1) == currentRow || square.id.substring(0,2) == currentRow) {
		square.childNodes[0].style.backgroundColor = currentColor;
		square.childNodes[0].style.backgroundImage = "radial-gradient(white -50%, " + currentColor + " 60%, black 85%)";
		square.className = "placed-pin";
	}
}

/**
 * Submits and calculates pins for a player guess.
 */
async function guess() {
	let reds = 0;
	let pinplacedi = new Array(false, false, false, false);
	let pinplacedj = new Array(false, false, false, false);
	for (let i = 0; i < 4; i++) {
		if (document.getElementById(currentRow + "." + i).childNodes[0].style.backgroundColor == gamearray[i]) {
			placePin('red');
			pinplacedi[i] = true;
			pinplacedj[i] = true;
			reds++;
		}
	}
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (document.getElementById(currentRow + "." + i).childNodes[0].style.backgroundColor == gamearray[j] && !pinplacedj[j] && !pinplacedi[i]) {
				placePin('white');
				pinplacedi[i] = true;
				pinplacedj[j] = true;
			}
		}
	}
	document.getElementById(currentRow).style.backgroundImage = "";
	currentRow++;
	document.getElementById(currentRow).style.backgroundImage = "url(arrow.png)";
	if (reds == 4) {
		endGame('You Win!');
		return;
	}
	if (currentRow == 11)
		endGame('You Lose :(');
}

/**
 * Places the red and white response pins for the player
 * @param {String} color - Red or white based on the correctness of the guess. 
 */
function placePin(color) {
	for (let i = 0; i < 4; i++) {
		if (document.getElementById("2" + currentRow + "." + i).className != "placed-pin") {
			document.getElementById("2" + currentRow + "." + i).childNodes[0].style.backgroundColor = color;
			document.getElementById("2" + currentRow + "." + i).className = "placed-pin";
			return;
		}
	}
}

/**
 * Ends the game and displays a message prompt to the user.
 * @param {String} message 
 */
async function endGame(message) {
	for (let i = 0; i < 4; i++) {
		document.getElementById("11." + i).childNodes[0].style.backgroundColor = gamearray[i];
		document.getElementById("11." + i).className = "placed-pin";
		document.getElementById("11." + i).childNodes[0].style.backgroundImage = "radial-gradient(white -50%, " + gamearray[i] + " 60%, black 85%)";
	}
	await new Promise(r => setTimeout(r, 100)); 

	let answer = confirm(message + "\nWould you like to play a new game?");
	
	if (answer)
		window.location.reload();
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