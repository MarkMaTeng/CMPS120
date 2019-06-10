
//打开烤箱
function ovenEvent(){

	if(inBanana == false && inPipe == false && inStair == false && inPhone == false && inOven == false){//先判断是否在别的场景中以免穿模
		inOven = true;//在烤箱场景
		console.log(inOven, inBanana, inPipe);
		this.ovenSound.play();
		this.openedOven = game.add.sprite(0,0, 'openoven');
		this.back = this.add.button(0, 0, 'back', closeOven, this, 0, 0, 0);
		/*this.openedOven.width = 300;
		this.openedOven.height = 200;*/
		if(cupcakecatpicked == false){
			this.cream = game.add.button(310, 220, 'trigger', creamCatOut, this, 0, 0, 0);
			this.cupcakecat = game.add.sprite(310, 220, 'creamcupcake');
			this.cupcakecat.width = 120;
			this.cupcakecat.height = 150;
			console.log(cupcakecatpicked);
		}
		this.cupcake1 = game.add.button(440, 220, 'creamcupcake', creamOut1, this, 0, 0, 0);
			this.cupcake1.width = 120;
			this.cupcake1.height = 150;
			this.cupcake2 = game.add.button(560, 220, 'creamcupcake', creamOut2, this, 0, 0, 0);
			this.cupcake2.width = 120;
			this.cupcake2.height = 150;
			this.cream.width = 130;
			this.cream.height = 150;
	}
	
}

function creamCatOut(){
	this.cream.destroy();
	this.cupcakecat.destroy();
	this.cupcakecat = game.add.button(310, 220, 'cupcakecat', pickupcupcakecat, this,0, 0, 0 );
	this.cupcakecat.width = 120;
	this.cupcakecat.height = 150;
	
}


function creamOut1(){
	this.cupcake1.destroy();
	this.cupcake1 = game.add.sprite(440, 220, 'cupcake');
	this.cupcake1.width = 120;
	this.cupcake1.height = 150;
	
}

function creamOut2(){
	this.cupcake2.destroy();
	this.cupcake2 = game.add.sprite(560, 220, 'cupcake');
	this.cupcake2.width = 120;
	this.cupcake2.height = 150;
	
}

function closeOven(){
	this.back.destroy();
	this.openedOven.destroy();
	this.cupcakecat.destroy();
	this.cupcake1.destroy();
	this.cupcake2.destroy();
	this.cream.destroy();

	inOven = false;//离开烤箱场景
}

function pickupcupcakecat(){
	meow();
	cupcakecatpicked = true;
	this.cupcakecat.destroy();
	scoreBarPlus();
	
}
