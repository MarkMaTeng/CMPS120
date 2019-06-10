function crowcat(){
	if(crowcatpicked == false && readingSpaceReport == false && inTelescope == false && readingNotes == false && inMicro == false){
		this.tree.destroy();
		this.birdSound.play();
		this.tree = game.add.sprite(570, 60, 'crow2');
		this.tree.width = 500;
		this.tree.height = 125;

		this.crowCat = game.add.button(670, 120, 'crowcat', pickCrowCat, this, 0, 0, 0);
		this.crowCat.width = 20;
		this.crowCat.height = 50;

		}

}

function pickCrowCat(){
	meow();
	crowcatpicked = true;
	this.crowCat.destroy();
	this.tree.destroy();
	scoreBarPlus();
	
}