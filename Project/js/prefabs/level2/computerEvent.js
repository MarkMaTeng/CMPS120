function readNotes(){
	if(readingSpaceReport == false && inTelescope == false && readingNotes == false && inMicro == false){
		this.notes = game.add.button(-500, -40+140, 'notes', closeNotes, this, 0, 0, 0);
		this.noteSound.play();
	}
	
}

function closeNotes(){
	this.notes.destroy();
	this.noteSound.play();
	readingNotes = false;
	
}

function pickUpTea(){
	this.tea.destroy();
	this.teaItem = this.add.button(40+140*itemDistance, 660, 'tea', usingTea, this, 0, 0, 0);
	this.teaItem.width = 80;
	this.teaItem.height = 80;
	teaPosition = itemDistance;
	itemDistance ++;
}

function usingTea(){
	if(co3ing == false && bactoriaing == false && so4ing == false)
	this.teaItem.destroy();
	this.movingTea = this.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, 'tea');
	this.movingTea.width = 80;
	this.movingTea.height = 80;
	this.movingTea.anchor.set(0.5);
	this.physics.arcade.enable(this.movingTea);
	teaing = true;
		
	this.backbar = game.add.button(0, 660, 'trigger', returnTea, this, 0, 0, 0);
	this.backbar.width = 960;
	this.backbar.height = 120;
}

function unlockComputer(){
	if(teaing == true){
		teaing = false;
		if(tComplete == false){
			letterT = this.add.sprite(82, 190, 't');
			this.movingTea.destroy();
			
		}else{
			this.movingTea.destroy();
			this.letterC.destroy();
			this.computerCat = this.add.sprite(32, 100, 'firstcat');
		}
		this.backbar.destroy();
		cComplete = true;
	}	
	
	if(co3ing == true){
		co3ing = false
		if(cComplete == false){
			this.letterC = this.add.sprite(32, 190, 'c');
			this.movingCo3.destroy();

			
		}else{
			this.movingCo3.destroy();
			this.letterT.destroy();
			this.computerCat = this.add.sprite(32, 100, 'firstcat');
		}
		this.backbar.destroy();
		tComplete = true;
	}
	
}

function pickCo3(){
	this.co3.destroy();
	this.co3Item = this.add.button(40+140*itemDistance, 660, 'co3', usingCo3, this, 0, 0, 0);
	this.co3Item.width = 80;
	this.co3Item.height = 80;
	co3Position = itemDistance;
	itemDistance ++;
}

function usingCo3(){
	if(so4ing == false && bactoriaing == false && teaing == false){
		this.co3Item.destroy();
		this.movingCo3 = this.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, 'co3');
		this.movingCo3.width = 80;
		this.movingCo3.height = 80;
		this.movingCo3.anchor.set(0.5);
		this.physics.arcade.enable(this.movingCo3);
		co3ing = true;
		this.backbar = game.add.button(0, 660, 'trigger', returnCo3, this, 0, 0, 0);
		this.backbar.width = 960;
		this.backbar.height = 120;
	}
}

function pickSo4(){
	this.so4.destroy();
	this.so4Item = this.add.button(40+140*itemDistance, 660, 'so4', usingSo4, this, 0, 0, 0);
	this.so4Item.width = 80;
	this.so4Item.height = 80;
	so4Position = itemDistance;
	itemDistance ++;
	
}

function usingSo4(){
	if(co3ing == false && bactoriaing == false && teaing == false){
		this.so4Item.destroy();
		this.movingSo4 = this.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, 'so4');
		this.movingSo4.width = 80;
		this.movingSo4.height = 80;
		this.movingSo4.anchor.set(0.5);
		this.physics.arcade.enable(this.movingSo4);
		so4ing = true;
			
		this.backbar = game.add.button(0, 660, 'trigger', returnSo4, this, 0, 0, 0);
		this.backbar.width = 960;
		this.backbar.height = 120;
	}
}




function returnTea(){
	teaing = false;
	this.movingTea.destroy();
	this.backbar.destroy();
	this.teaItem = game.add.button(40+140* teaPosition, 660, 'tea', usingTea, this,0, 0, 0);
	this.teaItem.width = 80;
	this.teaItem.height = 80;
}

function returnCo3(){
	co3ing = false;
	this.movingCo3.destroy();
	this.backbar.destroy();
	this.co3Item = game.add.button(40+140* co3Position, 660, 'co3', usingCo3, this,0, 0, 0);
	this.co3Item.width = 80;
	this.co3Item.height = 80;
}

function returnSo4(){
	so4ing = false;
	this.movingSo4.destroy();
	this.backbar.destroy();
	this.so4Item = game.add.button(40+140* so4Position, 660, 'so4', usingSo4, this,0, 0, 0);
	this.so4Item.width = 80;
	this.so4Item.height = 80;	
	
}

