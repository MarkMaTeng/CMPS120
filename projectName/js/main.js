// Teng Ma
// Updated: 4/27/19
// I draw the pig character and the tree.
// After you got 1500 score, there will be a rainbow in the sky.


// define MainMenu state and methods
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
		this.load.image('talltrees', 'talltrees.png');
		this.load.image('rainbow', 'rainbow.png');
		this.load.image('background', 'project/background.png');
		this.load.image('title', 'project/title.png');
		this.load.image('startbutton', 'project/cat.png' );
		this.load.image('firstcat', 'project/cat.png' );
		
	},
	create: function() {
		initWordList();
		// change bg color
		//game.stage.backgroundColor = getRandomHexColor();

		//printMessages('Endless Runner', 'Press SPACEBAR to begin');
		this.startSound = game.add.audio('appear');
		this.title = this.add.sprite(0, 0, 'title');
		this.startbutton = this.add.button(420, 380, 'startbutton', clickStart, this, 0, 0, 0 );
	},
	update: function() {
		// main menu logic
		/*if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			// pass this.level to next state
			// .start(key, clearWorld, clearCache, parameter)
			game.state.start('Play', true, false, this.level, this.life);
		}*/
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
		//this.talltrees = this.add.tileSprite(0,0, game.width, game.height, 'talltrees');
		this.background = this.add.sprite(0, 0, 'background');
		

		// set up world physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = this.GRAVITY;

		// set up our.pig sprite
		this.pig = this.add.sprite(120, this.game.height-70, 'atlas', 'pig1');
		this.pig.anchor.set(0.5);
		this.pig.scale.setTo(0.75);

		// set up.pig physics
		game.physics.enable(this.pig, Phaser.Physics.ARCADE);
		this.pig.body.collideWorldBounds = true;
		// cap the.pig's max velocity (x, y)
		// make sure you don't set your jump velocity higher than max y velocity,
		// otherwise you'll never exceed that threshold
		this.pig.body.maxVelocity.x = this.MAX_X_VELOCITY;
		this.pig.body.maxVelocity.y = this.MAX_Y_VELOCITY;
		// add drag to slow the physics body while not accelerating
		this.pig.body.drag.setTo(this.DRAG, 0);
		// set up.pig animations
		// .add('key', [frames], frameRate, loop)
		// .generateFrameNames('prefix', start, stop, 'suffix', zeroPad) -> returns array
		// this handles atlas names in format: walk0001 - walk0011
		this.pig.animations.add('walk', Phaser.Animation.generateFrameNames('pig', 1, 4, '', 1), 12, true);
		this.pig.animations.add('jump', ['pig2'], 30, false);
		this.pig.z = 1;


		// set up treea physics
		this.treea = this.add.sprite(this.game.width, this.game.height-300, 'atlas', 'tree');
		this.treea.anchor.set(0.5);
		this.treea.scale.setTo(game.rnd.integerInRange(1, 2), game.rnd.integerInRange(1, 2));
		game.physics.enable(this.treea, Phaser.Physics.ARCADE);
		this.treea.body.drag.setTo(this.DRAG, 0);
    	this.treea.enableBody = true;	
    	//this.tree.body.collideWorldBounds = true;

    	// set up treeb physics
		this.treeb = this.add.sprite(this.game.width-300, this.game.height-300, 'atlas', 'tree');
		this.treeb.anchor.set(0.5);
		this.treeb.scale.setTo(game.rnd.integerInRange(1, 2), game.rnd.integerInRange(1, 2));
		game.physics.enable(this.treeb, Phaser.Physics.ARCADE);
		this.treeb.body.drag.setTo(this.DRAG, 0);
    	this.treeb.enableBody = true;	

		// set up ground
		this.ground = game.add.group();
		for(let i = 0; i < game.width; i += 35) {
			var groundTile = game.add.sprite(i, game.height - 35, 'atlas', 'tile');
			groundTile.scale.setTo(this.HALFSCALE);
			game.physics.enable(groundTile, Phaser.Physics.ARCADE);
			groundTile.body.immovable = true;
			groundTile.body.allowGravity = false;
			this.ground.add(groundTile);
		}

		// add arrows
		this.upKey = game.add.sprite(64, 32, 'arrowKey');
		this.upKey.anchor.set(0.5);

		// init debug toggle
		this.debug = false;
		this.scoreText = game.add.text(30, 50, 'Score: 0', { fontSize: '32px', fill: '#000' });
		this.game.time.reset();

		// add rainbow
		this.rainbow = game.add.image(this.game.world.centerX, this.game.world.centerY-100, 'rainbow');
		this.rainbow.width = 400;
		this.rainbow.height = 300;
		this.rainbow.anchor.set(0.5);
		this.rainbow.alpha = 0; 
		this.rainbow.z = 0;

		this.firstCat = game.add.button(100, 420, 'firstcat', findFirstCat, this, 0, 0, 0);

	},
	update: function() {
		// check collisions
		this.game.physics.arcade.collide(this.pig, this.ground);
		this.game.physics.arcade.collide(this.treea, this.ground);
		this.game.physics.arcade.collide(this.treeb, this.ground);

		// update tileSprite background (tweak for more "speed")
		//this.talltrees.tilePosition.x -= 4;

		// update score
		this.score = this.game.math.roundAwayFromZero(this.game.time.totalElapsedSeconds() * 100);
		//this.scoreText = game.add.text(30, 50, 'Score: ' + this.game.time.totalElapsedSeconds(), { fontSize: '32px', fill: '#000' });
		this.scoreText.text = 'Score: ' + this.score;
		//this.score = Phaser.timer.second;

		// add rainbow when score is 1500 or higher
		if(this.score == 1500){
			this.rainbow.alpha = 0.5;
			this.appear.play();
		}

		// update trees movement
		this.treea.x -=4;
		this.treeb.x -=4;

		// respawn treea
		if(this.treea.x <= -20){
			this.treea.kill();
			this.treea= this.add.sprite(this.game.width, this.game.height-300, 'atlas', 'tree');
			this.treea.anchor.set(0.5);
			this.treea.scale.setTo(game.rnd.integerInRange(1, 2), game.rnd.integerInRange(1, 2));
			game.physics.enable(this.treea, Phaser.Physics.ARCADE);
			this.treea.body.drag.setTo(this.DRAG, 0);
   			this.treea.enableBody = true;	
		}

		// respawn treeb
		if(this.treeb.x <= -20){
			this.treeb.kill();
			this.treeb= this.add.sprite(this.game.width, this.game.height-300, 'atlas', 'tree');
			this.treeb.anchor.set(0.5);
			this.treeb.scale.setTo(game.rnd.integerInRange(1, 2), game.rnd.integerInRange(1, 2));
			game.physics.enable(this.treeb, Phaser.Physics.ARCADE);
			this.treeb.body.drag.setTo(this.DRAG, 0);
   			this.treeb.enableBody = true;	
		}

		game.physics.arcade.overlap(this.pig, this.treea, collisionTree, null, this);
		game.physics.arcade.overlap(this.pig, this.treeb, collisionTree, null, this);

		// let's run...endlessly! 🏃‍♂️
		this.pig.animations.play('walk');

		// check if.pig is grounded
	    this.isGrounded = this.pig.body.touching.down;
	    // if so, we have jumps to spare
	    // change this.jumps to create double, triple, etc. jumps 🤾‍♀️
	    if(this.isGrounded) {
	    	this.jumps = 2;
	    	this.jumping = false;
	    } else {
	    	this.pig.animations.play('jump');
	    }
	    // allow steady velocity change up to a certain key down duration
	    if(this.jumps > 0 && this.input.keyboard.downDuration(Phaser.Keyboard.UP, 150)) {
	        this.pig.body.velocity.y = this.JUMP_SPEED;
	        this.jumping = true;
	        this.upKey.tint = 0xFACADE;
	    } else {
	    	this.upKey.tint = 0xFFFFFF;
	    }
	    // finally, letting go of the UP key subtracts a jump
	    if(this.jumping && this.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }

	    // debug toggle
	    if(this.input.keyboard.justPressed(Phaser.Keyboard.T)) {
	    	this.debug = !this.debug;
	    }
	},
	render: function() {
		if(this.debug) {
			game.debug.bodyInfo(this.pig, 32, 128, 'white');
			game.debug.body(this.pig);
			game.debug.body(this.treea);
			game.debug.body(this.treeb);
			game.debug.text('Jumps left: '+this.jumps, 32, 232, 'orange');
			game.debug.text('Jumping: '+this.jumping, 32, 248, 'orange');
		}
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


// define game, add states, and start Preloader
var game = new Phaser.Game(950, 620, Phaser.AUTO, 'phaser');
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
