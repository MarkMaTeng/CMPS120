function openSinkCloset(){
	if(inOven == false && inBanana == false && inPipe == false && inPhone == false && inStair == false){
		this.sinkCloset.destroy();
		this.openedPipeCloset = game.add.button(275, 185, 'sinkcloset', closeSinkCloset, this, 0, 0, 0);
		this.openCloset.play();
	}
	
}

function closeSinkCloset(){
	if(inOven == false && inBanana == false && inPipe == false && inPhone == false && inStair == false){
		this.openedPipeCloset.destroy();
		this.closeCloset.play();
		this.sinkCloset = game.add.button(350, 200, 'trigger', openSinkCloset, this, 0, 0, 0);
		this.sinkCloset.width = 100;
		this.sinkCloset.height = 80;
	}
}

function openUpCloset(){
	if(inOven == false && inBanana == false && inPipe == false && inPhone == false && inStair == false){
		this.upCloset.destroy();
		this.openedUpCloset = game.add.button(550, -13, 'upcloset', closeUpCloset, this, 0, 0, 0);
		this.openCloset.play();
	}
}

function closeUpCloset(){
	if(inOven == false && inBanana == false && inPipe == false && inPhone == false && inStair == false){
		this.openedUpCloset.destroy();
		this.closeCloset.play();
		this.upCloset = game.add.button(600, 0, 'trigger', openUpCloset, this, 0, 0, 0);
		this.upCloset.width = 150;
		this.upCloset.height = 80;
	}
}