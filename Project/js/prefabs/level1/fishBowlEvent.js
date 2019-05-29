
//鱼缸柜子
function openFishBowlCabinet(){
	this.openCloset.play();
	if(inOven == false && inPipe == false && inStair == false){
		this.closefishbowl = game.add.button(490, 320, 'fishbowlcabinet', closeFishBowlCabinet, this, 0, 0, 0);
		this.closefishbowl.anchor.set(0.5, 0.5);
		this.closefishbowl.width = 930;
		this.closefishbowl.height = 650;
		
		if(fishbowlpicked == false){
			this.fishbowl = game.add.button(640,220, 'fishbowl', pickFishBowl, this, 0, 0, 0);
			this.closefishbowl.anchor.set(0.5, 0.5);
			this.fishbowl.width = 30;
			this.fishbowl.height = 30;
		}
	}
}
//拿起鱼缸
function pickFishBowl(){
	fishbowlpicked = true;
	this.fishbowl.destroy();
	this.fishbowlItem = game.add.button(200  + 100* itemDistance , 550, 'fishbowl', usingFishBowl, this,0, 0, 0);
	fishbowlPosition = itemDistance;
	itemDistance ++;
}

//关上鱼缸柜子
function closeFishBowlCabinet(){
	this.closefishbowl.destroy();
	this.fishbowl.destroy();
	this.closeCloset.play();
	
}
//点击道具鱼缸
function usingFishBowl(){
	if(lamping == false){
		this.fishbowlItem.destroy();
		this.movingFishbowl = this.add.sprite(this.input.mousePointer.x, this.input.mousePointer.y, 'fishbowl');
		this.movingFishbowl.anchor.set(0.5, 0.5);
		this.physics.arcade.enable(this.movingFishbowl);
		fishbowling = true;
		
		//var place = itemDistance;
		this.backbar = game.add.button(200, 580, 'trigger', returnFishBowl, this, 0, 0, 0);
		this.backbar.width = 600;
		this.backbar.height = 120;
	}
	
}

//将鱼缸返回至物品栏
function returnFishBowl(){
	fishbowling = false;
	this.movingFishbowl.destroy();
	this.backbar.destroy();
	this.fishbowlItem = game.add.button(200  + 100* fishbowlPosition, 550, 'fishbowl', usingFishBowl, this,0, 0, 0);
}

//鱼缸猫出现
function fishbowlCatComing(){
	if(fishbowling == true){
		fishbowling = false;
		this.fishbowlCatTrigger.destroy();
		this.movingFishbowl.destroy();
		this.backbar.destroy();
		this.fishbowlCat = game.add.button(190, -10, 'fishbowlcat', pickFishbowlCat, this, 0, 0, 0);	
		this.fishbowlCat.width = 154;
		this.fishbowlCat.height = 70;
	}
	
}

//收集鱼缸猫
function pickFishbowlCat(){
	this.fishbowlCat.destroy();
	this.Meow1.play();
	scoreBarPlus();
	
}