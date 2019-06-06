
//鱼缸柜子
function openFishBowlCabinet(){

	if(inOven == false && inPipe == false && inStair == false && lampCabinetOpen == false){
		this.openCloset.play();
		this.closefishbowl = game.add.button(682, 232, 'fishbowlcabinet', closeFishBowlCabinet, this, 0, 0, 0);
		this.closefishbowl.anchor.set(0.5, 0.5);
		this.closefishbowl.width = 300;
		this.closefishbowl.height = 140;
		
		if(fishbowlpicked == false){
			this.fishbowl = game.add.button(640,180, 'fishbowl', pickFishBowl, this, 0, 0, 0);
			this.closefishbowl.anchor.set(0.5, 0.5);
			this.fishbowl.width = 60;
			this.fishbowl.height = 60;
		}
	}
}
//拿起鱼缸
function pickFishBowl(){
	fishbowlpicked = true;
	this.fishbowl.destroy();
	this.fishbowlItem = game.add.button( 130* itemDistance , 640, 'fishbowl', usingFishBowl, this,0, 0, 0);
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
		this.backbar = game.add.button(0, 640, 'trigger', returnFishBowl, this, 0, 0, 0);
		this.backbar.width = 960;
		this.backbar.height = 120;
	}
	
}

//将鱼缸返回至物品栏
function returnFishBowl(){
	fishbowling = false;
	this.movingFishbowl.destroy();
	this.backbar.destroy();
	this.fishbowlItem = game.add.button(130* fishbowlPosition, 640, 'fishbowl', usingFishBowl, this,0, 0, 0);
}

//鱼缸猫出现
function fishbowlCatComing(){
	if(fishbowling == true){
		fishbowling = false;
		this.fishBone.destroy();
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
	meow();
	scoreBarPlus();
	
}