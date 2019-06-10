
function bosscat(){
	if(bosscatpicked == false && readingSpaceReport == false && inTelescope == false && readingNotes == false && inMicro == false){
		this.bossChair.destroy();
		this.chairSound.play();
		this.bossChair = game.add.sprite(100, 350, 'chair2');
		this.bossChair.width = 200;
		this.bossChair.height = 250;
		
		this.bossCat = game.add.button(100,360, 'bosscat', pickBossCat, this, 0, 0, 0);
		
		}

}

function pickBossCat(){
	meow();
	bosscatpicked = true;
	this.bossCat.destroy();
	scoreBarPlus();
	
}

