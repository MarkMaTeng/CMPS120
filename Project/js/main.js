// Teng Ma
// Updated: 4/27/19
// I draw the pig character and the tree.
// After you got 1500 score, there will be a rainbow in the sky.


// define MainMenu state and methods
var inOven = false;
var inPipe = false;
var inBanana = false;


var cupcakecatpicked = false;
var pipecatpicked = false;
var bananacatpicked = false;

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
		this.load.spritesheet('pipecat', 'project/pipecat.png');
		this.load.image('cupcakecat', 'project/cat.png');
		this.load.image('oventrigger', 'project/oventrigger.png');
		this.load.image('pipe', 'project/pipe.png');
		this.load.image('trigger', 'project/oventrigger.png' );
		this.load.image('back', 'project/cat.png');
		this.load.image('banana', 'project/cat.png');
		this.load.image('bananacat', 'project/cat.png');
	},
	create: function() {
		initWordList();

		this.startSound = game.add.audio('appear');
		this.title = this.add.sprite(0, 0, 'title');
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
	this.GRAVITY = 2600;
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

		this.score = 0;

		
		// add bg as tile sprite
		
		this.background = this.add.sprite(0, 0, 'background');
		

		// set up world physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = this.GRAVITY;

		
		// add arrows
		this.upKey = game.add.sprite(64, 32, 'arrowKey');
		this.upKey.anchor.set(0.5);

		// init debug toggle
		this.debug = false;
		this.scoreText = game.add.text(30, 50, 'Score: 0', { fontSize: '32px', fill: '#000' });
		this.game.time.reset();



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
	},
	update: function() {


	    // debug toggle
	    if(this.input.keyboard.justPressed(Phaser.Keyboard.T)) {
	    	this.debug = !this.debug;
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

function collisionTree(pig, tree) {
	// Removes the baddie
	this.bgm.pause();
    game.state.start('GameOver', true, false, this.score);
    
}

function clickStart(){
	this.startSound.play();
	game.state.start('Play', true, false, this.level, this.life);
	
}

function findFirstCat(){
	this.Meow1.play();
	this.firstcatinstru = game.add.text(100, 420, 'you find the cat', { fontSize: '32px', fill: '#000' });
}

function openOven(){

	if(inBanana == false && inPipe == false){//先判断是否在别的场景中以免穿模
		inOven = true;//在烤箱场景
		console.log(inOven, inBanana, inPipe);
		this.openedOven = this.add.button(0, 0, 'openoven', closeOven, this, 0, 0, 0);
		/*this.openedOven.width = 300;
		this.openedOven.height = 200;*/
		if(cupcakecatpicked == false){
			this.cupcakecat = this.add.button(300, 200, 'cupcakecat', pickupcupcakecat, this, 0, 0, 0);
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
	
}
//PIPE场景
function pipeEvent(){
	if(inOven == false && inBanana == false){//判断是否在别的场景
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
		this.pipeCat = this.add.sprite(0, 0, 'pipecat');
		/*this.pipeCat.animations.add('flow', [0, 1, 2], 3, false);
		this.pipeCat.animations.play('flow');*/
		this.pickpipecat = this.add.button(375, 150, 'trigger', pickPipeCat, this, 0, 0, 0);
	}
}
//抓pipecat
function pickPipeCat(){
	this.Meow1.play();
	pipecatpicked = true;
	this.pipeCat.destroy();
	this.pickpipecat.destroy();
}
//退出pipe场景，清空所有
function pipesOut(){
	this.pipe.destroy();
	this.openpipe.destroy();
	this.pipeCat.destroy();
	this.backFromPipe.destroy();
	this.pickpipecat.destroy();
	inPipe = false;//离开pipe场景
}
//香蕉登场
function bananaEvent(){
	if(inOven == false && inPipe == false){//判断是否在别的场景
		inBanana = true;
		console.log(inOven, inBanana, inPipe);
		this.banana = this.add.button(250, 0, 'banana', openBanana,this,  0, 0, 0);
		this.banana.width = 600;
		this.banana.height = 600;
		this.bananaInstruction = game.add.text(250, 280, 'I will be a banana in the future version', { fontSize: '32px', fill: '#282' });
	}
}
//拨开香蕉
function openBanana(){
	this.banana.destroy();  //删掉香蕉
	this.bananaInstruction.destroy();
	inBanana = false;
	if(bananacatpicked == false){//判断有没有香蕉猫
		this.bananaCatOut = this.add.button(250, 0, 'bananacat', pickBananaCat,this, 0, 0, 0);
		this.bananaCatOut.width = 600;
		this.bananaCatOut.height = 600;
		this.bananaInstruction = game.add.text(250, 280, 'I will be the BANANA CAT in the future version', { fontSize: '32px', fill: '#282' });
	}

}

function pickBananaCat(){
	this.Meow1.play();
	this.bananaCatOut.destroy();
	this.bananaInstruction.destroy();
	bananacatpicked = true;
}

// define game, add states, and start Preloader
var game = new Phaser.Game(950, 620, Phaser.AUTO, 'phaser');
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
