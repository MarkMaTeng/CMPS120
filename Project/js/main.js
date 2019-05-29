
var catFinded = 1;
var scorebar;
var inOven = false;
var inPipe = false;
var inBanana = false;
var inStair = false;
var inPhone =false;
var itemDistance = 0;

var cupcakecatpicked = false;
var pipecatpicked = false;
var bananacatpicked = false;
var fishbowlpicked = false;
var lamppicked = false;
var steamcatpicked = false;
var staircatpicked = false;
var longcatpicked = false;
var havePipeCat = false;
var shadowcatpicked = false;

var fishbowling = false;
var lamping = false;

var fishbowlPosition;
var lampPosition;


var MainMenu = function(game) {};
MainMenu.prototype = {
	init: function() {
		this.level = 0; 	// tracks the player's level
		this.life = 3;		// tracks the player's life
	},
	preload: function() {
		// set load path and load assets
		game.load.audio('bgm', 'assets/audio/bgm.wav' );
		game.load.audio('appear', 'assets/audio/appear.wav' );
		game.load.audio('Meow1', 'assets/audio/catMeow.mp3')
		game.load.audio('closeCloset', 'assets/audio/DoorClose.mp3');
		game.load.audio('openCloset', 'assets/audio/DoorOpen.mp3');
		game.load.audio('lampSound', 'assets/audio/openLamp.mp3');
		game.load.audio('ovenSound', 'assets/audio/openOven.wav');
		game.load.audio('stairCatSound', 'assets/audio/stairCat.mp3');
		this.load.path = 'assets/img/';
		this.load.atlas('atlas', 'atlassprites.png', 'atlassprites.json');
		this.load.image('arrowKey', 'arrowKey.png');
		this.load.image('background', 'project/background.png');
		this.load.image('title', 'project/title.png');
		this.load.image('startbutton', 'project/oventrigger.png' );
		this.load.image('firstcat', 'project/cat.png' );
		this.load.image('openoven', 'project/openoven.png');
		this.load.atlas('pipecat', 'project/pipecat.png', 'project/pipecat.json');
		this.load.atlas('scorebar', 'project/scorebar.png', 'project/scorebar.json');
		this.load.image('cupcakecat', 'project/cupcakecat.png');
		this.load.image('oventrigger', 'project/oventrigger.png');
		this.load.image('pipe', 'project/pipe.png');
		this.load.image('trigger', 'project/oventrigger.png' );//oventrigger.png
		this.load.image('back', 'project/back.png');
		this.load.image('banana', 'project/banana.png');
		this.load.image('bananacat', 'project/bananacat.png');
		this.load.image('lamp', 'project/lamp.png');
		this.load.image('lampcabinet', 'project/cat.png');
		this.load.image('fishbowl', 'project/fishbowl.png');
		this.load.image('fishbowlcabinet', 'project/fishbowlcabinet.png');
		this.load.image('fishbowlcat', 'project/fishbowlcat.png');
		this.load.image('lampcabinet', 'project/cat.png');
		this.load.image('steamcat', 'project/steamcat.png');
		this.load.image('itembar', 'platform.png');
		this.load.image('stair', 'project/steps.png');
		this.load.image('lyingcat', 'project/lyingcat.png');
		this.load.atlas('staircat', 'project/stairStep.png', 'project/stairStep.json');
		this.load.image('staircatImage', 'project/step1.PNG');
		this.load.image('phone', 'project/cphone.png');
		this.load.image('pano', 'project/panoMode.png');
		this.load.image('longcatphoto', 'project/longCatPhoto.jpg');
		this.load.image('longcat', 'project/longcatSprite.png');
		this.load.image('shadowcat', 'project/shadowCat.PNG');
		this.load.image('socket', 'project/socket.png');
		this.load.image('lampopen', 'project/lampOpen.png');
		this.load.image('creamcupcake', 'project/creamcupcake.png');
	},
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.startSound = game.add.audio('appear');
		this.title = this.add.sprite(0, 0, 'title');
		this.title.width = 950;
		this.title.height = 620;
		this.startbutton = this.add.button(440, 565, 'startbutton', clickStart, this, 0, 0, 0 ); // 420, 350
		
		

		this.mainMenuCat = this.add.sprite(420, 420, 'firstcat');
		this.mainMenuCat.anchor.set(0.5, 0.5);
		this.physics.arcade.enable(this.mainMenuCat);
		this.mainMenuCat.body.velocity.x = -200;
	},
	update: function() {
		if(this.mainMenuCat.x <= 50){
			this.mainMenuCat.body.velocity.x = 200;
			
		}
		if(this.mainMenuCat.x >= 900){
			this.mainMenuCat.body.velocity.x = -200;
			
		}
		
	}
}



// Play state
var Play = function() {
	// define constants
	this.HALFSCALE = 0.5;
	this.MAX_X_VELOCITY = 500;	// measured in pixels/second
	this.MAX_Y_VELOCITY = 5000;
	this.ACCELERATION = 1500;
	this.DRAG = 600;			// note that DRAG < ACCELERATION (to create sliding)
	//this.GRAVITY = 2600;
	this.JUMP_SPEED = -700;	// negative y-values jump up
};
Play.prototype = {
	create: function() {
		// background color
		game.stage.backgroundColor = "#223344";
		
		// add bgm
		this.bgm = game.add.audio('bgm');
		this.bgm.loop = true;
		this.bgm.volume = 0.25;
		this.appear = game.add.audio('appear');
		this.Meow1 = game.add.audio('Meow1');
		this.closeCloset = game.add.audio('closeCloset');
		this.openCloset = game.add.audio('openCloset');
		this.lampSound = game.add.audio('lampSound');
		this.ovenSound = game.add.audio('ovenSound');
		this.stairCatSound = game.add.audio('stairCatSound');
		this.bgm.play();


		
		// add bg as tile sprite
		
		this.background = this.add.sprite(0, 0, 'background');
		this.itembar = this.add.sprite(200, 580, 'itembar');
		this.itembar.width = 600;
		this.itembar.height = 120;

		// set up world physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//game.physics.arcade.gravity.y = this.GRAVITY;
		
		
		/*this.itemInUse = game.add.group();
		this.physics.arcade.enable(this.itemInUse);*/

		
		// add arrows
		this.upKey = game.add.sprite(64, 32, 'arrowKey');
		this.upKey.anchor.set(0.5);

		
		scorebar = game.add.sprite(850, 100, 'scorebar', '1');

		this.fishbowlCabinet = game.add.button(610, 150, 'trigger', openFishBowlCabinet, this, 0, 0, 0);
		this.fishbowlCabinet.width = 150;
		this.fishbowlCabinet.height = 120;
		
		this.stairtrigger = game.add.button(130,120, 'lyingcat', stairEvent, this, 0, 0, 0);
		this.stairtrigger.anchor.set(0.5);
		this.stairtrigger.width = 80;
		this.stairtrigger.height = 80;

		this.lampCabinet = game.add.button(750, 220, 'trigger', openLampCabinet, this, 0, 0, 0);
		this.lampCabinet.width = 75;
		this.lampCabinet.height = 75;
		
		this.steamPot = game.add.button(560, 150, 'trigger', steamcat, this, 0, 0, 0);
		this.steamPot.width = 30;
		this.steamPot.height = 30;

		this.phone = game.add.button(560, 350, 'phone', phoneEvent, this, 0, 0, 0);
		this.phone.width = 30;
		this.phone.height = 40;
		
		
		//ovencat
		this.oventrigger = game.add.button(450, 200, 'oventrigger', openOven, this, 0, 0, 0);
		
		//pipecat
		this.pipetrigger = game.add.button(375, 78, 'trigger', pipeEvent, this, 0, 0, 0);
		this.pipetrigger.width = 50;
		this.pipetrigger.height = 75;
		
		//bananacat
		this.bananatrigger = game.add.button(835, 2, 'trigger', bananaEvent, this, 0, 0, 0);
		this.bananatrigger.width = 50;
		this.bananatrigger.height = 50;
		
		this.fishbowlCatTrigger = game.add.button(220, 0, 'trigger', fishbowlCatComing, this, 0, 0, 0);
		
		//shadow and first cat
		this.firstCat = game.add.button(150, 480, 'firstcat', findFirstCat, this, 0, 0, 0);
		this.socket = game.add.button(20, 560, 'socket', turnOnLamp, this, 0,0,0);
        this.socket.width = 30;
        this.socket.height = 30;
        
		
	},
	update: function() {
		
		//鱼缸跟随鼠标
		if(fishbowling == true){
			this.physics.arcade.moveToPointer(this.movingFishbowl, 3000);
			if(Phaser.Rectangle.contains(this.movingFishbowl.body, this.input.x, this.input.y)){
				this.movingFishbowl.body.velocity.setTo(0, 0);
			}
			
		
		}

    	//台灯跟随鼠标
		if(lamping == true){
			this.physics.arcade.moveToPointer(this.movingLamp, 3000);
			if(Phaser.Rectangle.contains(this.movingLamp.body, this.input.x, this.input.y)){
				this.movingLamp.body.velocity.setTo(0, 0);
			}	
			
		}
	
	
	
	},
	
};

// define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
	init: function(score) {
		this.score = score;
	},
	create: function() {
		game.stage.backgroundColor = getRandomHexColor();
		
		printMessages('Game Over, Your Score is ' + this.score + '.', 'Press SPACEBAR to restart');
	},
	update: function() {
		// GameOver logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
	}
}



function clickStart(){
	this.startSound.play();
	game.state.start('Play', true, false, this.level, this.life);
	
}

//分数条进度
function scoreBarPlus(){	
	catFinded ++;
	console.log(catFinded);
	var scoreBarFrame = catFinded.toString();
	scorebar.frameName = scoreBarFrame;
}

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

function steamcat(){
	if(steamcatpicked == false){
		steamcatpicked = true;
		this.steamPot = game.add.button(500, 0, 'steamcat', pickSteamlCat, this, 0, 0, 0);
		this.steamPot.width = 150;
		this.steamPot.height = 150;
		}

}

function pickSteamlCat(){

	this.steamPot.destroy();
	this.Meow1.play();
	scoreBarPlus();
	
}


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



//打开烤箱
function openOven(){

	if(inBanana == false && inPipe == false && inStair == false && inPhone == false){//先判断是否在别的场景中以免穿模
		inOven = true;//在烤箱场景
		console.log(inOven, inBanana, inPipe);
		this.ovenSound.play();
		this.openedOven = this.add.button(0, 0, 'openoven', closeOven, this, 0, 0, 0);
		/*this.openedOven.width = 300;
		this.openedOven.height = 200;*/
		if(cupcakecatpicked == false){
			this.cream = game.add.button(350, 200, 'trigger', creamOut, this, 0, 0, 0);
			this.cupcakecat = game.add.sprite(350, 200, 'creamcupcake');
			this.cupcakecat.width = 180;
			this.cupcakecat.height = 220;
			this.cream.width = 180;
			this.cream.height = 180;
			console.log(cupcakecatpicked);
		}
	}
	
}

function creamOut(){
	this.cream.destroy();
	this.cupcakecat.destroy();
	this.cupcakecat = game.add.button(350, 220, 'cupcakecat', pickupcupcakecat, this,0, 0, 0 );
	this.cupcakecat.width = 180;
	this.cupcakecat.height = 210;
	
}

function closeOven(){
	this.openedOven.destroy();
	this.cupcakecat.destroy();
	this.cream.destroy();

	inOven = false;//离开烤箱场景
}

function pickupcupcakecat(){
	this.Meow1.play();
	cupcakecatpicked = true;
	this.cupcakecat.destroy();
	scoreBarPlus();
	
}
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
	if(pipecatpicked == false){
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
	this.Meow1.play();
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

//楼梯场景
function stairEvent(){
	if(inOven == false && inBanana == false && inPipe == false && inPhone == false){//判断是否在别的场景
		inStair = true;
        console.log(inOven, inBanana, inPipe, inStair);
		this.stair = this.add.sprite(0, 0, 'stair');
		if(staircatpicked == false){
		this.stairCatImage = this.add.sprite(0, 0, 'staircatImage');
		this.rollstaircat = this.add.button(700, 100, 'trigger', rollingStairCat, this, 0, 0, 0);
		this.rollstaircat.anchor.set(0.5);
		this.rollstaircat.width = 250;
		this.rollstaircat.height = 300;
		}
        this.backFromStair = this.add.button(0, 0, 'back', stairOut, this, 0, 0, 0);
	}
}
//点击滚动楼梯猫
function rollingStairCat(){
	this.stairCatSound.play();
	this.stairCatImage.destroy();
	this.rollstaircat.destroy();
	this.backFromStair.destroy();
	this.stairCat = this.add.sprite(0, 0, 'staircat', 'step1');
	this.stairCat.animations.add('roll', ['step1', 'step2', 'step3', 'step4'], 2, false);
	this.stairCat.animations.play('roll');
	this.pickstaircat = this.add.button(300, 500, 'trigger', pickStairCat, this, 0, 0, 0);
	this.pickstaircat.anchor.set(0.5);
	this.pickstaircat.width = 250;
	this.pickstaircat.height = 300;
	this.backFromStair = this.add.button(0, 0, 'back', stairOut, this, 0, 0, 0);
}
//抓stairCat
function pickStairCat(){
	this.Meow1.play();
	staircatpicked = true;
	this.stairCat.destroy();
	this.pickstaircat.destroy();
	this.stairtrigger.destroy();
	scoreBarPlus();
}
//退出stair场景，清空所有
function stairOut(){
	this.stair.destroy();
	this.stairCatImage.destroy();
    this.rollstaircat.destroy();
	this.backFromStair.destroy();
	inStair = false;//离开stair场景
}

//手机场景
function phoneEvent(){
	if(inOven == false && inBanana == false && inPipe == false && inStair == false){//判断是否在别的场景
		inPhone = true;
		console.log(inOven, inBanana, inPipe, inStair, inPhone);
		if(longcatpicked == false){
		this.catbackground = this.add.sprite(-600, 0, 'longcatphoto');
		}
		this.phone = this.add.sprite(0, 0, 'pano');
		if(this.catbackground.x < 100)
		{
			this.leftKey = this.add.button(315, 595, 'arrowKey', moveLeft,this,  0, 0, 0);
			//this.leftKey = this.add.sprite(480, 500, 'arrowKey');
			this.leftKey.anchor.set(0.5);
			this.leftKey.rotation = Math.PI/2*3;
			this.game.inputEnabled = true;
			//this.game.input.onHold.add(moveLeft, this);	
		}
		}
		this.backFromPhone = this.add.button(0, 0, 'back', phoneOut, this, 0, 0, 0);
	
}
//左移
function moveLeft(){
	this.catbackground.x += 140;
	if(this.catbackground.x >= 100)
		{
			this.leftKey.destroy();
		}
}

//退出phone场景，清空所有,出现长猫
function phoneOut(){
	inphone = false;//离开stair场景
	if(this.catbackground.x >= 100 && longcatpicked == false)
	{
		this.longcat = this.add.button(450,350, 'longcat', picklongCat, this, 0, 0, 0);
		this.longcat.anchor.set(0.5);
		this.longcat.width = 300;
		this.longcat.height = 100;

	}
	this.leftKey.destroy();
	this.catbackground.destroy();
	this.phone.destroy();
	this.backFromPhone.destroy();
	inPhone = false;
	
}

//抓长猫
function picklongCat(){
	this.Meow1.play();
	longcatpicked = true;
	this.longcat.destroy();
	scoreBarPlus();
}

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






// define game, add states, and start Preloader
var game = new Phaser.Game(950, 620, Phaser.AUTO, 'phaser');//950, 620
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
