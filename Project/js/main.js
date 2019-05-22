
var catFinded = 1;
var scorebar;
var inOven = false;
var inPipe = false;
var inBanana = false;
var inStair = false;
var itemDistance = 0;

var cupcakecatpicked = false;
var pipecatpicked = false;
var bananacatpicked = false;
var fishbowlpicked = false;
var lamppicked = false;
var steamcatpicked = false;
var staircatpicked = false;


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
		game.load.audio('bgm', 'assets/audio/bgm.mp3' );
		game.load.audio('appear', 'assets/audio/appear.wav' );
		game.load.audio('Meow1', 'assets/audio/catMeow.mp3')
		this.load.path = 'assets/img/';
		this.load.atlas('atlas', 'atlassprites.png', 'atlassprites.json');
		this.load.image('arrowKey', 'arrowKey.png');
		this.load.image('background', 'project/background.png');
		this.load.image('title', 'project/title.png');
		this.load.image('startbutton', 'project/cat.png' );
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
		this.load.image('iphone', 'project/cat.png');
		this.load.image('lampcabinet', 'project/cat.png');
		this.load.image('steamcat', 'project/steamcat.png');
		this.load.image('itembar', 'platform.png');
		this.load.image('stair', 'project/steps.png');
		this.load.atlas('staircat', 'project/stairStep.png', 'project/stairStep.json');
	},
	create: function() {
		initWordList();

		this.startSound = game.add.audio('appear');
		this.title = this.add.sprite(0, 0, 'title');
		this.title.width = 950;
		this.title.height = 620;
		this.startbutton = this.add.button(420, 380, 'startbutton', clickStart, this, 0, 0, 0 );
	},
	update: function() {

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

		// init debug toggle
		this.debug = false;
		this.scoreText = game.add.text(30, 50, 'Score: 0', { fontSize: '32px', fill: '#000' });
		this.game.time.reset();

		scorebar = game.add.sprite(50, 100, 'scorebar', '1');

		this.fishbowlCabinet = game.add.button(610, 150, 'trigger', openFishBowlCabinet, this, 0, 0, 0);
		this.fishbowlCabinet.width = 150;
		this.fishbowlCabinet.height = 120;
		
		this.stairtrigger = game.add.button(0,300, 'trigger', stairEvent, this, 0, 0, 0);
		this.stairtrigger.anchor.set(0.5);
		this.stairtrigger.width = 350;
		this.stairtrigger.height = 600;

		this.lampCabinet = game.add.button(750, 220, 'trigger', openLampCabinet, this, 0, 0, 0);
		this.lampCabinet.width = 75;
		this.lampCabinet.height = 75;
		
		this.steamPot = game.add.button(560, 150, 'trigger', steamcat, this, 0, 0, 0);
		this.steamPot.width = 30;
		this.steamPot.height = 30;
		
		this.firstCat = game.add.button(100, 420, 'firstcat', findFirstCat, this, 0, 0, 0);
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
	render: function() {

		game.debug.text('Press \'T\' to toggle debug text', 32, game.height - 17);	
	}
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









// this is simply here to avoid running out of words
function initWordList() {
	wordList = {};
	wordList = {
		adjectives: ['nervous', 'oceanic', 'fuzzy', 'sore', 'untidy', 'flowery', 'muddled', 'hellish', 'overwrought', 'abrupt', 'quixotic', 'grumpy', 'enormous', 'capable', 'roomy', 'tender', 'spiky', 'magenta', 'cute', 'dusty', 'hot', 'exultant', 'massive', 'lush', 'aromatic', 'solid', 'wrathful', 'dull', 'grey', 'likeable', 'narrow'],
		nouns: ['fire', 'hydrant', 'spoon', 'frog', 'leg', 'person', 'baseball', 'ghost', 'ocean', 'stranger', 'bulb', 'string', 'government', 'bed', 'giraffe', 'smell', 'oven', 'vegetable', 'snail', 'parcel', 'wax', 'seashore', 'harmony', 'pie', 'crowd', 'toothbrush', 'sink', 'trees', 'cemetery', 'earth', 'sky', 'giants', 'apparatus', 'ladybug', 'machine', 'rabbits', 'hill', 'notebook', 'cabbage', 'car', 'trousers', 'bee'],
		verbs: ['excused', 'carved', 'offended', 'sailed', 'destroyed', 'poured', 'disarmed', 'borrowed', 'expanded', 'burned', 'decorated', 'invented', 'recorded', 'boiled', 'crossed', 'squeezed', 'filmed', 'juggled', 'scratched', 'popped', 'milked', 'pined for', 'prayed for', 'painted', 'annoyed', 'delayed', 'supported', 'challenged'],
		adverbs: ['fondly', 'sweetly', 'reluctantly', 'fatally', 'knowingly', 'greedily', 'rapidly', 'blissfully', 'successfully', 'politely', 'elegantly', 'youthfully', 'zestfully', 'busily', 'delightfully', 'gleefully', 'generously', 'helplessly', 'sheepishly', 'calmly', 'honestly', 'daintily', 'keenly', 'mostly', 'hungrily', 'shakily', 'worriedly', 'urgently', 'queasily', 'unnaturally', 'unexpectedly']
	};
}

// this function adapted from Anatoliy's answer here:
// https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomHexColor() {
	let letters = '0123456789ABCDEF';
	let hexColor = '#';
	for(let i = 0; i < 6; i++) {
		hexColor += letters[Math.floor(Math.random()*16)];
	}
	return hexColor;
}

// pass in an array of words, remove one at random, and optionally capitalize it
// uppercase line from https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
function getRandomWord(list, cap) {
	let word, seed;

	if(list.length > 0) {
		seed = Math.floor(Math.random()*list.length);
		word = list[seed];
		if(cap) { word = word.charAt(0).toUpperCase() + word.slice(1); }
		list.splice(seed, 1);
	} else {
		word = "ERROR"; // not good error handling, but shut up :p
	}
	return word;
}

function printMessages(top_msg, btm_msg) {
	let message = '';
    let style1 = { font: '48px Helvetica', fill: '#FFF', align: "center" };
    let style2 = { font: '22px Helvetica', fill: '#FFF', align: "center" };
	message = game.add.text(50, game.world.centerY, top_msg, style1);
	//message.anchor.set(0.5); // used for centering, but can make text blurry
	message = game.add.text(50, game.world.centerY+64, btm_msg, style2);
	//message.anchor.set(0.5);
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
		this.fishbowlCat = game.add.button(220, 0, 'fishbowlcat', pickFishbowlCat, this, 0, 0, 0);		
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
	this.lampItem = game.add.button(200 + 100* itemDistance, 550, 'lamp', usingLamp, this, 0, 0, 0);
	this.lampItem.width = 120;
	this.lampItem.height = 120;
	lampPosition = itemDistance;
	itemDistance ++;
}

//关上台灯柜子
function closeLampCabinet(){
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
	this.lampItem = game.add.button(200  + 100* lampPosition, 550, 'lamp', usingLamp, this,0, 0, 0);
}





function findFirstCat(){
	this.Meow1.play();
	this.firstcatinstru = game.add.text(100, 420, 'you find the cat', { fontSize: '32px', fill: '#000' });
}

function openOven(){

	if(inBanana == false && inPipe == false && inStair == false){//先判断是否在别的场景中以免穿模
		inOven = true;//在烤箱场景
		console.log(inOven, inBanana, inPipe);
		this.openedOven = this.add.button(0, 0, 'openoven', closeOven, this, 0, 0, 0);
		/*this.openedOven.width = 300;
		this.openedOven.height = 200;*/
		if(cupcakecatpicked == false){
			this.cupcakecat = this.add.button(300, 200, 'cupcakecat', pickupcupcakecat, this, 0, 0, 0);
			this.cupcakecat.width = 200;
			this.cupcakecat.height = 200;
			console.log(cupcakecatpicked);
		}
	}
	
}

function closeOven(){
	this.openedOven.destroy();
	this.cupcakecat.destroy();
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
	if(inOven == false && inBanana == false && inStair == false){//判断是否在别的场景
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
	this.pipeCat.destroy();////////这里要修改修复BUG
	this.pickpipecat.destroy();
	inPipe = false;//离开pipe场景
}

//楼梯场景
function stairEvent(){
	if(inOven == false && inBanana == false && inPipe == false){//判断是否在别的场景
		inStair = true;
		console.log(inOven, inBanana, inPipe, inStair);
		this.stair = this.add.sprite(0, 0, 'stair');
		this.stairCat = this.add.sprite(0, 0, 'staircat', 'step1');
		this.stairCat.animations.add('roll', ['step1', 'step2', 'step3', 'step4'], 2, false);
		this.stairCat.animations.play('roll');
		this.pickstaircat = this.add.button(300, 500, 'trigger', pickStairCat, this, 0, 0, 0);
		this.pickstaircat.anchor.set(0.5);
		this.pickstaircat.width = 250;
		this.pickstaircat.height = 300;
		this.backFromStair = this.add.button(0, 0, 'back', stairOut, this, 0, 0, 0);
	}
}
//抓stairCat
function pickStairCat(){
	this.Meow1.play();
	staircatpicked = true;
	this.stairCat.destroy();
	this.pickstaircat.destroy();
	scoreBarPlus();
}
//退出stair场景，清空所有
function stairOut(){
	this.stair.destroy();
	this.backFromStair.destroy();
	this.stairCat.destroy();////////这里要修改修复BUG
	inStair = false;//离开stair场景
}

//香蕉登场
function bananaEvent(){
	if(inOven == false && inPipe == false && inStair == false ){//判断是否在别的场景
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
