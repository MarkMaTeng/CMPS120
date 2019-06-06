//PIPE场景
function pipeEvent(){
	if(inOven == false && inBanana == false && inStair == false && inPhone == false){//判断是否在别的场景
		inPipe = true;
		console.log(inOven, inBanana, inPipe);
		this.pipe = this.add.sprite(0, 0, 'pipe');
		this.openpipe = this.add.button(350, 0, 'trigger',  pipeCatOut, this, 0, 0, 0);
		this.openpipe.width = 800;
		this.openpipe.height = 800;
		this.backFromPipe = this.add.button(0, 0, 'back', pipesOut, this, 0, 0, 0);
	}
}
//打开水龙头
function pipeCatOut(){
	this.openpipe.destroy();
	if(pipecatpicked == false && pipeAlreadyout == false){
		pipeAlreadyout == true;
		this.pipeCat = this.add.sprite(0, 0, 'pipecat', 'pipecat1');
		this.pipeCat.animations.add('flow', ['pipecat1', 'pipecat2', 'pipecat3'], 2, false);
		this.pipeCat.animations.play('flow');
		havePipeCat = true;
		this.pickpipecat = this.add.button(375, 150, 'trigger', pickPipeCat, this, 0, 0, 0);
		this.pickpipecat.width = 150;
		this.pickpipecat.height = 600;
	}
}
//抓pipecat
function pickPipeCat(){
	meow();
	pipecatpicked = true;
	this.pipeCat.destroy();
	this.pickpipecat.destroy();
	scoreBarPlus();
}
//退出pipe场景，清空所有
function pipesOut(){
	this.pipe.destroy();
	this.openpipe.destroy();
	this.backFromPipe.destroy();
	if(havePipeCat == true){
		this.pipeCat.destroy();////////这里要修改修复BUG
		havePipeCat = false;
		this.pickpipecat.destroy();
	}
	
	inPipe = false;//离开pipe场景
}
