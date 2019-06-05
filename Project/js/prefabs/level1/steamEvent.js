
function steamcat(){
	if(steamcatpicked == false && inOven == false && inPipe == false && inStair == false){
		steamcatpicked = true;
		this.steamPot = game.add.button(500, 0, 'steamcat', pickSteamCat, this, 0, 0, 0);
		this.steamPot.width = 150;
		this.steamPot.height = 150;
		}

}

function pickSteamCat(){

	this.steamPot.destroy();
	this.Meow1.play();
	scoreBarPlus();
	
}