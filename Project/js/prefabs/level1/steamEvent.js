
function steamcat(){
	if(steamcatpicked == false){
		steamcatpicked = true;
		this.steamPot = game.add.button(500, 0, 'steamcat', pickSteamlCat, this, 0, 0, 0);
		this.steamPot.width = 150;
		this.steamPot.height = 150;
		}

}

function pickSteamlCat(){

	this.steamPot.destroy();
	this.Meow1.play();
	scoreBarPlus();
	
}