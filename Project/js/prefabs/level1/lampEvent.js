
//台灯柜子
function openLampCabinet(){
	this.openCloset.play();
	if(inOven == false && inPipe == false && inStair == false){
	this.closelampcabinet = game.add.button(750, 220, 'lampcabinet', closeLampCabinet, this, 0, 0, 0);
	this.closelampcabinet.width = 75;
	this.closelampcabinet.height = 75;
	
	if(lamppicked == false){
		this.lamp = game.add.button(800, 220, 'lamp', pickLamp, this, 0, 0, 0);
		this.lamp.width = 50;
		this.lamp.height = 50;
		}	
	}
}
//拿起台灯
function pickLamp(){
	lamppicked = true;
	this.lamp.destroy();
	this.lampItem = game.add.button(200 + 100* itemDistance, 530, 'lamp', usingLamp, this, 0, 0, 0);
	this.lampItem.width = 120;
	this.lampItem.height = 120;
	lampPosition = itemDistance;
	itemDistance ++;
}

//关上台灯柜子
function closeLampCabinet(){
	this.closeCloset.play();
	this.closelampcabinet.destroy();
	this.lamp.destroy();
}

//点击道具台灯
function usingLamp(){
	if(fishbowling == false){
		this.lampItem.destroy();
		this.movingLamp = this.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, 'lamp');
		this.movingLamp.width = 120;
		this.movingLamp.height = 120;
		this.movingLamp.anchor.set(0.5);
		this.physics.arcade.enable(this.movingLamp);
		lamping = true;
		
		this.backbar = game.add.button(200, 580, 'trigger', returnLamp, this, 0, 0, 0);
		this.backbar.width = 600;
		this.backbar.height = 120;
	}
}
//返回台灯至物品栏
function returnLamp(){
	lamping = false;
	this.movingLamp.destroy();
	this.backbar.destroy();
	this.lampItem = game.add.button(200  + 100* lampPosition, 530, 'lamp', usingLamp, this,0, 0, 0);
	this.lampItem.width = 120;
	this.lampItem.height = 120;
}





function findFirstCat(){
	if(shadowcatpicked == true){
		this.Meow1.play();
		scoreBarPlus();
		this.firstCat.destroy();
	}
	//this.firstcatinstru = game.add.text(100, 420, 'you find the cat', { fontSize: '32px', fill: '#000' });
}
//打开台灯
function turnOnLamp(){
	if(lamping == true){
		lamping = false
		this.lampSound.play();
		this.socket.destroy();
		this.movingLamp.destroy();

		this.lampSwitch = game.add.button(-20, 470, 'lampopen', turnOffLamp,this, 0, 0, 0);
		this.lampSwitch.width = 300;
		this.lampSwitch.height = 150;
		if(shadowcatpicked == false){
			this.shadowCat = game.add.button(160, 440, 'shadowcat', pickshadowCat, this, 0, 0, 0);
			this.shadowCat.width = 300;
			this.shadowCat.height = 150;
		}
		this.backbar.destroy();
	}
}

function turnOffLamp(){
	this.lampSwitch.destroy();
	if(shadowcatpicked == false){	
		this.shadowCat.destroy();
	}
	this.lampItem = game.add.button(200  + 100* lampPosition, 530, 'lamp', usingLamp, this,0, 0, 0);
	this.lampItem.width = 120;
	this.lampItem.height = 120;
	this.socket = game.add.button(20, 560, 'socket', turnOnLamp, this, 0,0,0);
    this.socket.width = 30;
    this.socket.height = 30;
}


function pickshadowCat(){
	if(shadowcatpicked == false){
		this.shadowCat.destroy();
		shadowcatpicked = true;
		this.Meow1.play();
		scoreBarPlus();
		
	}
	
}