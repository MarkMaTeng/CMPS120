function crowcat(){
	if(crowcatpicked == false && readingSpaceReport == false && inTelescope == false && readingNotes == false && inMicro == false){
		this.tree.destroy();
		this.birdSound.play();
		this.tree = game.add.sprite(500, 20, 'crow2');


		this.crowCat = game.add.button(750, 90, 'crowcat', pickCrowCat, this, 0, 0, 0);
		this.crowCat.width = 30;
		this.crowCat.height = 75;

		}

}

function pickCrowCat(){
	meow();
	crowcatpicked = true;
	this.crowCat.destroy();
	this.tree.destroy();
	scoreBarPlus();
	
}