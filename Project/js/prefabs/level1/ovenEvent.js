
//打开烤箱
function ovenEvent(){

	if(inBanana == false && inPipe == false && inStair == false && inPhone == false){//先判断是否在别的场景中以免穿模
		inOven = true;//在烤箱场景
		console.log(inOven, inBanana, inPipe);
		this.ovenSound.play();
		this.openedOven = this.add.button(0, 0, 'openoven', closeOven, this, 0, 0, 0);
		/*this.openedOven.width = 300;
		this.openedOven.height = 200;*/
		if(cupcakecatpicked == false){
			this.cream = game.add.button(350, 200, 'trigger', creamOut, this, 0, 0, 0);
			this.cupcakecat = game.add.sprite(350, 200, 'creamcupcake');
			this.cupcakecat.width = 180;
			this.cupcakecat.height = 220;
			this.cream.width = 180;
			this.cream.height = 180;
			console.log(cupcakecatpicked);
		}
	}
	
}

function creamOut(){
	this.cream.destroy();
	this.cupcakecat.destroy();
	this.cupcakecat = game.add.button(350, 220, 'cupcakecat', pickupcupcakecat, this,0, 0, 0 );
	this.cupcakecat.width = 180;
	this.cupcakecat.height = 210;
	
}

function closeOven(){
	this.openedOven.destroy();
	this.cupcakecat.destroy();
	this.cream.destroy();

	inOven = false;//离开烤箱场景
}

function pickupcupcakecat(){
	meow();
	cupcakecatpicked = true;
	this.cupcakecat.destroy();
	scoreBarPlus();
	
}
