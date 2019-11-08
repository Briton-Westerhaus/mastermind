var currentrow;
var gamearray = new Array(4);

function newgame()
{
	var element = document.getElementById("currentcolor");
	element.style.backgroundColor = 'red';
	var theColor;
	currentrow = 1;
	document.getElementById(currentrow).style.backgroundImage = "url(media/arrow.bmp)";
	for(var i = 0; i < 4; i++){
		theColor = Math.round(5 * Math.random());
		switch(theColor){
			case(0):
				gamearray[i] = "red";
				break;
			case(1):
				gamearray[i] = "blue";
				break;
			case(2):
				gamearray[i] = "green";
				break;
			case(3):
				gamearray[i] = "white";
				break;
			case(4):
				gamearray[i] = "yellow";
				break;
			case(5):
				gamearray[i] = "orange";
				break;
			default:
				break;
		}
	}
}

function changeColor(color)
{
	var element = document.getElementById("currentcolor");
	element.style.backgroundColor = color;
	document.body.style.cursor="url(" + color + ".cur), auto";
}

function colorme(thisone){
	if(thisone.id.substring(0,1) == currentrow || thisone.id.substring(0,2) == currentrow)
		thisone.style.backgroundColor = document.getElementById("currentcolor").style.backgroundColor;
}

function guess(){
	var reds = 0;
	var pinplacedi = new Array(false, false, false, false);
	var pinplacedj = new Array(false, false, false, false);
	for(var i = 0; i < 4; i++){
		if(document.getElementById(currentrow + "." + i).style.backgroundColor == gamearray[i]){
			placepin('red');
			pinplacedi[i] = true;
			pinplacedj[i] = true;
			reds++;
		}
	}
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(document.getElementById(currentrow + "." + i).style.backgroundColor == gamearray[j] && !pinplacedj[j] && !pinplacedi[i]){
				placepin('white');
				pinplacedi[i] = true;
				pinplacedj[j] = true;
			}
		}
	}
	document.getElementById(currentrow).style.backgroundImage = "";
	currentrow++;
	document.getElementById(currentrow).style.backgroundImage = "url(media/arrow.bmp)";
	if(reds == 4){
		endofgame('You Win!');
		return;
	}
	if(currentrow == 11)
		endofgame('You Lose :(');
}

function placepin(color){
	for(var i = 0; i < 4; i++){
		if(document.getElementById("2" + currentrow + "." + i).style.backgroundColor != 'red' && document.getElementById("2" + currentrow + "." + i).style.backgroundColor != 'white'){
			document.getElementById("2" + currentrow + "." + i).style.backgroundColor = color;
			return;
		}
	}
}

function endofgame(message){
	for(var i = 0; i < 4; i++){
		document.getElementById("11." + i).style.backgroundColor = gamearray[i];
	}
	var answer = confirm(message + "\nWould you like to play a new game?");
	if(answer)
		window.location.reload(false);
}