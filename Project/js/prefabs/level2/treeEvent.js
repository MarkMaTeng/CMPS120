
function crowcat(){
	if(crowcatpicked == false){
		this.tree.destroy();
		this.tree = game.add.sprite(540, 100, 'crow2');
		this.tree.width = 300;
		this.tree.height = 100;

		this.crowCat = game.add.button(700, 120, 'crowcat', pickCrowCat, this, 0, 0, 0);
		this.crowCat.width = 25;
		this.crowCat.height = 50;
		}

}

function pickCrowCat(){
	this.Meow1.play();
	crowcatpicked = true;
	this.crowCat.destroy();
	scoreBarPlus();
	
}