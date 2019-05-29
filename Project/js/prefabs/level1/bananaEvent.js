

//香蕉登场
function bananaEvent(){
	if(inOven == false && inPipe == false && inStair == false && inPhone == false ){//判断是否在别的场景
		inBanana = true;
		this.bananatrigger.destroy();
		console.log(inOven, inBanana, inPipe);
		this.banana = this.add.button(250, 0, 'banana', openBanana,this,  0, 0, 0);
		this.banana.width = 600;
		this.banana.height = 600;
		
	}
}
//拨开香蕉
function openBanana(){
	this.banana.destroy();  //删掉香蕉

	this.bananatrigger = game.add.button(835, 2, 'trigger', bananaEvent, this, 0, 0, 0);
	inBanana = false;
	if(bananacatpicked == false){//判断有没有香蕉猫
		this.bananaCatOut = this.add.button(250, 0, 'bananacat', pickBananaCat,this, 0, 0, 0);
		this.bananaCatOut.width = 600;
		this.bananaCatOut.height = 600;
		
	}

}

function pickBananaCat(){
	this.Meow1.play();
	this.bananaCatOut.destroy();
	bananacatpicked = true;
	scoreBarPlus();
}

