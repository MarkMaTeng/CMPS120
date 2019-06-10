
function pencilEvent(){
	if(pencilcatpicked == false && readingSpaceReport == false && inTelescope == false && readingNotes == false && inMicro == false){
		pencilcatpicked = true;
		this.pencil.destroy();
		this.pencilSound.play();
		this.pencilCat = game.add.button(560, 210, 'pencil2', pickPencilCat, this, 0, 0, 0);
		}

}

function pickPencilCat(){
	pencilcatpicked = true;
	this.pencilCat.destroy();
	meow();
	scoreBarPlus();
	
}