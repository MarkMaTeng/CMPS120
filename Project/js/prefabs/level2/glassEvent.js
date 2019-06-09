function pickUpGlass(){
	this.glass.frameName = 'glass2';
	this.pickGlass.destroy();
	this.bactoria = this.add.button(150*itemDistance, 700, 'bactoria', usingBactoria, this, 0, 0, 0);
	this.bactoria.anchor.set(0.5);
	this.bactoria.width = 80;
	this.bactoria.height = 80;
	bactoriaPosition = itemDistance;
	itemDistance ++;
}

function usingBactoria(){
	if(co3ing == false && so4ing == false && teaing == false){
		this.bactoria.destroy();
		this.movingBactoria = this.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, 'bactoria');
		this.movingBactoria.width = 80;
		this.movingBactoria.height = 80;
		this.movingBactoria.anchor.set(0.5);
		this.physics.arcade.enable(this.movingBactoria);
		bactoriaing = true;
		
		this.backbar = game.add.button(0, 640, 'trigger', returnBactoria, this, 0, 0, 0);
		this.backbar.width = 960;
		this.backbar.height = 120;
	}
}

function goToMicro(){
	if(bactoriaing == true && readingSpaceReport == false && inTelescope == false && readingNotes == false){
		inMicro = true;
		bactoriaing = false;
		this.movingBactoria.destroy();
		this.backbar.destroy();
		this.bactoria = game.add.button(130* bactoriaPosition, 640, 'bactoria', usingBactoria, this,0, 0, 0);
		this.bactoria.width = 80;
		this.bactoria.height = 80;

		if(microcatpicked == false){
			this.microWorld = this.add.sprite(0, 0, 'micro', 'micro1');
		}else{
			this.microWorld = this.add.sprite(0, 0, 'micro', 'micro2');
		}
		this.microWorld.width = 960;
		this.microWorld.height = 750;
		this.back = game.add.button(0, 0, 'back', backFromMicro, this, 0, 0, 0);
		if(microcatpicked == false){
			this.microCat = game.add.button(578, 475, 'trigger', pickMicroCat, this, 0, 0, 0);
			this.microCat.width = 20;
			this.microCat.height = 20;
		}
	
	}
	
}

function pickMicroCat(){
	this.microCat.destroy();
	microcatpicked = true;
	this.microWorld.frameName = 'micro2';
	this.Meow1.play();
	scoreBarPlus();
	
}


function returnBactoria(){
	bactoriaing = false;
	this.movingBactoria.destroy();
	this.backbar.destroy();
	this.bactoria = game.add.button(130* bactoriaPosition, 640, 'bactoria', usingBactoria, this,0, 0, 0);
	this.bactoria.width = 80;
	this.bactoria.height = 80;
}

function backFromMicro(){
	this.microWorld.destroy();
	if(microcatpicked == false){
		this.microCat.destroy();
		
	}
	inMicro = false
	this.back.destroy();
}