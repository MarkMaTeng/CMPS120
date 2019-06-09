


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
		game.load.audio('Meow1', 'assets/audio/meow1.mp3')
		game.load.audio('Meow2', 'assets/audio/meow2.mp3')
		game.load.audio('Meow3', 'assets/audio/meow3.mp3')
		game.load.audio('closeCloset', 'assets/audio/DoorClose.mp3');
		game.load.audio('openCloset', 'assets/audio/DoorOpen.mp3');
		game.load.audio('lampSound', 'assets/audio/openLamp.mp3');
		game.load.audio('ovenSound', 'assets/audio/openOven.wav');
		game.load.audio('stairCatSound', 'assets/audio/stairCat.mp3');
		this.load.path = 'assets/img/';


		////////////////////////
		// Beginning img assets //
		////////////////////////
		this.load.image('title', 'title.png');
		this.load.image('intro', 'intro.png');


		////////////////////////
		// Level 1 img assets //
		////////////////////////
		this.load.image('arrowKey', 'level1/arrowKey.png');
		this.load.image('background1', 'level1/background.png');
		this.load.image('startbutton', 'level1/oventrigger.png' );
		this.load.image('firstcat', 'level1/cat.png' );
		this.load.atlas('scorebar', 'level1/scorebar.png', 'level1/scorebar.json');


		// pipe cat //
		this.load.atlas('pipecat', 'level1/pipecat.png', 'level1/pipecat.json');
		this.load.image('pipe', 'level1/pipe.png');

		// banana cat //
		this.load.image('banana', 'level1/banana.png');
		this.load.image('bananacat', 'level1/bananacat.png');

		// cupcake cat //
		this.load.image('openoven', 'level1/openoven.png');
		this.load.image('creamcupcake', 'level1/creamcupcake.png');
		this.load.image('cupcakecat', 'level1/cupcakecat.png');
		this.load.image('cupcake', 'level1/cupcake.png');
		this.load.image('oventrigger', 'level1/oventrigger.png');
		this.load.image('trigger', 'level1/oventrigger.png' );//oventrigger.png
		this.load.image('back', 'level1/back.png');
		

		// lamp cat //
		this.load.image('lamp', 'level1/lamp.png');
		this.load.image('shadowcat', 'level1/shadowCat.PNG');
		this.load.image('socket', 'level1/socket.png');
		this.load.image('lampopen', 'level1/lampOpen.png');

		// fishbowl cat //
		this.load.image('fishbowl', 'level1/fishbowl.png');
		this.load.image('fishbowlcabinet', 'level1/fishbowlcabinet.png');
		this.load.image('fishbowlcat', 'level1/fishbowlcat.png');
		this.load.image('lampcabinet', 'level1/lampCabinet.png');

		// steam cat //
		this.load.image('steamcat', 'level1/steamcat.png');
		
		// stair cat //
		this.load.image('stair', 'level1/steps.png');
		this.load.image('lyingcat', 'level1/lyingcat.png');
		this.load.atlas('staircat', 'level1/stairStep.png', 'level1/stairStep.json');
		this.load.image('staircatImage', 'level1/step1.PNG');

		// long cat
		this.load.image('phone', 'level1/phone.png');
		this.load.image('nophone', 'level1/nophone.png');
		this.load.image('pano', 'level1/panoMode.png');
		this.load.image('longcatphoto', 'level1/longCatPhoto.png');
		this.load.image('longcat', 'level1/longcatSprite.png');
		
		
		this.load.image('sinkcloset', 'level1/sinkcloset.png');
		this.load.image('upcloset', 'level1/upCloset.png');
		this.load.image('fishbone', 'level1/fishBone.png');
		
		////////////////////////
		// Level 2 img assets //
		////////////////////////
		this.load.image('background2', 'level2/bg.png');
		this.load.image('crowcat', 'level2/crowCat.png');
		this.load.image('crow1', 'level2/crow1.png');
		this.load.image('crow2', 'level2/crow2.png');
		this.load.image('bosscat', 'level2/bossCat.png');
		this.load.image('chair1', 'level2/chair1.png');
		this.load.image('chair2', 'level2/chair2.png');
		this.load.image('reportonspace', 'level2/reportOnSpace.png');
		this.load.atlas('space', 'level2/space.png', 'level2/space.json');
		this.load.image('plus', 'level2/plus.png');
		this.load.image('minus', 'level2/minus.png');
		this.load.image('notes', 'level2/notesOnComputer.png');
	},
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.startSound = game.add.audio('appear');
		this.title = this.add.sprite(0, 0, 'title');
		this.title.width = 960;
		this.title.height = 750;
		this.startbutton = this.add.button(440, 570, 'startbutton', clickStart, this, 0, 0, 0 ); 
		
		
	},
	update: function() {
		
	}
}

// Intro state
var Intro = function(game) {};
Intro.prototype = {
	init: function(score) {

		this.Meow1 = game.add.audio('Meow1');
		this.Meow2 = game.add.audio('Meow2');
		this.Meow3 = game.add.audio('Meow3');
	},
	create: function() {

		this.background = this.add.sprite(0, 0, 'intro');

		this.startbutton = this.add.button(720, 450, 'startbutton', goLevel1, this, 0, 0, 0 ); 
		this.startbutton.width = 200;
		this.startbutton.height = 150;

	},
	update: function() {
		
	}
}

// Level1 state
var Level1 = function() {};
Level1.prototype = {
	create: function() {
		// background color
		game.stage.backgroundColor = "#223344";
		
		// add bgm
		this.bgm = game.add.audio('bgm');
		this.bgm.loop = true;
		this.bgm.volume = 0.25;
		this.appear = game.add.audio('appear');
		this.Meow1 = game.add.audio('Meow1');
		this.Meow2 = game.add.audio('Meow2');
		this.Meow3 = game.add.audio('Meow3');
		this.closeCloset = game.add.audio('closeCloset');
		this.openCloset = game.add.audio('openCloset');
		this.lampSound = game.add.audio('lampSound');
		this.ovenSound = game.add.audio('ovenSound');
		this.stairCatSound = game.add.audio('stairCatSound');
		this.bgm.play();

		// add bg as tile sprite
		
		this.background = this.add.sprite(0, 0, 'background1');
		/*this.itembar = this.add.sprite(200, 580, 'itembar');
		this.itembar.width = 600;
		this.itembar.height = 120;*/

		// set up world physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//game.physics.arcade.gravity.y = this.GRAVITY;
		
		
		/*this.itemInUse = game.add.group();
		this.physics.arcade.enable(this.itemInUse);*/

		
		// add arrows
		this.upKey = game.add.button(64, 32, 'arrowKey', goLevel2, this, 0, 0, 0);
		this.upKey.anchor.set(0.5);

		
		scorebar = game.add.sprite(0, 0, 'scorebar', '1');


		this.fishbowlCabinet = game.add.button(610, 150, 'trigger', openFishBowlCabinet, this, 0, 0, 0);
		this.fishbowlCabinet.width = 150;
		this.fishbowlCabinet.height = 120;
		
		this.stairtrigger = game.add.button(130,120, 'lyingcat', stairEvent, this, 0, 0, 0);
		this.stairtrigger.anchor.set(0.5);
		this.stairtrigger.width = 80;
		this.stairtrigger.height = 80;

		this.lampCabinet = game.add.button(750, 200, 'trigger', openLampCabinet, this, 0, 0, 0);
		this.lampCabinet.width = 75;
		this.lampCabinet.height = 75;
		
		this.steamPot = game.add.button(560, 150, 'trigger', steamcat, this, 0, 0, 0);
		this.steamPot.width = 30;
		this.steamPot.height = 30;

		this.phone = game.add.button(580, 280, 'phone', phoneEvent, this, 0, 0, 0);
		
		
		
		//ovencat
		this.oventrigger = game.add.button(450, 200, 'oventrigger', ovenEvent, this, 0, 0, 0);
		
		//pipecat
		this.pipetrigger = game.add.button(375, 78, 'trigger', pipeEvent, this, 0, 0, 0);
		this.pipetrigger.width = 50;
		this.pipetrigger.height = 75;
		
		//bananacat
		this.bananatrigger = game.add.button(835, 5, 'trigger', bananaEvent, this, 0, 0, 0);
		this.bananatrigger.width = 50;
		this.bananatrigger.height = 50;
		
		this.fishBone = this.add.sprite(210, 30, 'fishbone');
		this.fishbowlCatTrigger = game.add.button(220, 0, 'trigger', fishbowlCatComing, this, 0, 0, 0);
		
		//shadow and first cat
		this.firstCat = game.add.button(160, 420, 'firstcat', findFirstCat, this, 0, 0, 0);
		

		this.socket = game.add.button(20, 560, 'socket', turnOnLamp, this, 0,0,0);
        this.socket.width = 30;
        this.socket.height = 30;
        
		this.sinkCloset = game.add.button(350, 200, 'trigger', openSinkCloset, this, 0, 0, 0);
		this.sinkCloset.width = 100;
		this.sinkCloset.height = 80;
		
		this.upCloset = game.add.button(600, 0, 'trigger', openUpCloset, this, 0, 0, 0);
		this.upCloset.width = 150;
		this.upCloset.height = 80;
		
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

// define level2 state and methods
var Level2 = function(game) {};
Level2.prototype = {
	init: function(score) {
		this.score = score;
		this.Meow1 = game.add.audio('Meow1');
		this.Meow2 = game.add.audio('Meow2');
		this.Meow3 = game.add.audio('Meow3');
	},
	create: function() {

		this.background = this.add.sprite(0, 0, 'background2');
		//this.background.anchor.set(0.5,0.5);
		this.background.width = 960;
		this.background.height = 620;

		scorebar = game.add.sprite(0, 0, 'scorebar', '1');

		catFinded = 1;


		this.bossChair = game.add.button(100, 350, 'chair1', bosscat, this, 0, 0, 0);
		this.bossChair.width = 200;
		this.bossChair.height = 250;

		this.tree = game.add.button(540, 100, 'crow1', crowcat, this, 0, 0, 0);
		this.tree.width = 300;
		this.tree.height = 75;

		this.reportOnSpace = game.add.button(520, 250, 'trigger', readReportOnSpace, this, 0, 0, 0);
		this.reportOnComputer = game.add.button(870, 250, 'trigger', readNotes, this, 0, 0, 0);
		this.reportOnComputer.width = 35;
		this.reportOnComputer.height = 40;
		
		this.telescope = game.add.button(235, 190, 'trigger', watchingBlackhole, this, 0, 0, 0);
		this.telescope.width = 75;
		this.telescope.height = 50;
	},
	update: function() {
		
	}
}

// define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
	init: function(score) {
		this.score = score;
	},
	create: function() {

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
	game.state.start('Intro', true, false);
	
}

function goLevel1(){
	game.state.start('Level1', true, false);
	
}

function goLevel2(){
	game.state.start('Level2', true, false);
}

//分数条进度
function scoreBarPlus(){	
	catFinded ++;
	console.log(catFinded);

	var scoreBarFrame = catFinded.toString();
	scorebar.frameName = scoreBarFrame;
}

function meow(){
	this.Meow1 = game.add.audio('Meow1');
	this.Meow2 = game.add.audio('Meow2');
	this.Meow3 = game.add.audio('Meow3');
	switch(this.game.rnd.integerInRange(1, 3)){
        case 1:
            this.Meow1.play();
            break;
        case 2:
            this.Meow2.play();
            break;
        case 3:
            this.Meow3.play();
            break;
    }
}


// define game, add states, and start Preloader
var game = new Phaser.Game(960, 750, Phaser.AUTO, 'phaser');//950, 620
game.state.add('MainMenu', MainMenu);
game.state.add('Intro', Intro);
game.state.add('Level1', Level1);
game.state.add('Level2', Level2);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
