function readReportOnSpace(){
	if(readingSpaceReport == false && inTelescope == false && readingNotes == false && inMicro == false){
		readingSpaceReport = true;
		this.noteSound.play();
		this.spaceReport = this.add.button(0, 0, 'reportonspace', finishReadSpaceRepory, this, 0, 0, 0);
	}
}


function finishReadSpaceRepory(){
	this.spaceReport.destroy();
	this.noteSound.play();
	readingSpaceReport = false;
}


function watchingBlackhole(){
	if(readingSpaceReport == false && inTelescope == false && readingNotes == false && inMicro == false){
		inTelescope = true;
		this.space = this.add.sprite(0, 0, 'space', 'space1');
		this.space.width = 960;
		this.space.height = 750;
		this.plus = this.add.button(50, 650, 'plus', spacePlus, this, 0, 0, 0);
		this.minus = this.add.button(840, 670, 'minus', spaceMinus, this, 0, 0, 0);
		this.back = this.add.button(0, 0, 'back', backFromSpace, this, 0, 0, 0);
	}
	
}

function spacePlus(){
	if(spacePosition < 5){		
		spacePosition ++;
		var spaceFrame = 'space' + spacePosition.toString();
		this.space.frameName = spaceFrame;
		if(spacePosition == 2 && blackholecatpicked == false){
			
			this.blackholeCat = this.add.button(180, 75, 'trigger', pickBlackholeCat, this, 0, 0, 0);
			this.blackholeCat.width = 600;
			this.blackholeCat.height = 600;
			blackholecatexist = true;
		}
		
		if(spacePosition == 5 && spacecatpicked == false){
			spacecatpicked = true;
			this.spaceCat = this.add.button(180, 75, 'trigger', pickSpaceCat, this, 0, 0, 0);
			this.spaceCat.width = 600;
			this.spaceCat.height = 600;
			spacecatexist = true;
			console.log(spacecatexist);
		}
		
		
		if(spacePosition == 3 && blackholecatexist == true){
			this.blackholeCat.destroy();
			blackholecatexist = false;
		}
	}
	this.space.width = 960;
	this.space.height = 750;
	console.log(this.space.width);	
	console.log(this.space.height);	
}

function spaceMinus(){
	if(spacePosition > 1){
		spacePosition --;
		var spaceFrame = 'space' + spacePosition.toString();
		this.space.frameName = spaceFrame;
		if(spacePosition == 2 && blackholecatpicked == false){
			this.blackholeCat = this.add.button(180, 75, 'trigger', pickBlackholeCat, this, 0, 0, 0);
			this.blackholeCat.width = 600;
			this.blackholeCat.height = 600;
			blackholecatexist = true;
		}
			
		if( spacePosition == 1 && blackholecatexist == true){
			this.blackholeCat.destroy();
			this.blackholecatexist = false;
		}
		
		if(spacecatexist == true){
			console.log(spacecatexist);
			this.spaceCat.destroy();
			spacecatexist = false;
		}
		
	}
	this.space.width = 960;
	this.space.height = 750;
	console.log(this.space.width);	
	console.log(this.space.height);	
}

function pickBlackholeCat(){
	this.blackholeCat.destroy();
	meow();
	blackholecatpicked = true;
	scoreBarPlus();
	
}

function pickSpaceCat(){
	this.spaceCat.destroy();
	meow();
	spaceCat = true;
	scoreBarPlus();
	
}


function backFromSpace(){
	if(spacecatexist == true){
		this.spaceCat.destroy();
	}
	if(blackholecatexist == true){
		this.blackholeCat.destroy();
	}
	this.space.destroy();
	this.plus.destroy();
	this.minus.destroy();
	this.back.destroy();
	spacePosition = 1
	inTelescope = false
}