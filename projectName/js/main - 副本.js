var game = new Phaser.Game(600, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/img/sky.png');
    game.load.image('ground', 'assets/img/platform.png');
    game.load.image('star', 'assets/img/star.png');
    game.load.image('diamond', 'assets/img/diamond.png');
    game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
    game.load.spritesheet('baddie', 'assets/img/baddie.png', 32, 32);
}

var player;
var platforms;
var cursors;
var baddiea;
var baddieb;

var stars;
var diamonds;
var score = 0;
var scoreText;


function create() {

    //Enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Add a background
    game.add.sprite(0, 0, 'sky');

    //Create a platform group
    platforms = game.add.group();
    platforms.enableBody = true;		//Enable physics platform group

    //Create a ground
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);			//Set the scale of the ground
    ground.body.immovable = true;		//Set the ground immovable

    //Create four ledges
    var ledge = platforms.create(400, 300, 'ground');
    ledge.body.immovable = true;
    
    ledge = platforms.create(-150, 450, 'ground');
    ledge.body.immovable = true;
    
    ledge = platforms.create(350, 550, 'ground');
    ledge.body.immovable = true;
    
    ledge = platforms.create(-250, 200, 'ground');
    ledge.body.immovable = true;

    //Create the player and baddies
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    baddiea = game.add.sprite(32, game.world.width - 500, 'baddie');
    baddieb = game.add.sprite(500, game.world.height - 300, 'baddie');

    //Enable physics on player and baddies
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(baddiea);
    game.physics.arcade.enable(baddieb);

    //Set physics properties for player and baddies
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    baddiea.body.gravity.y = 300;
    baddieb.body.gravity.y = 300;

    
    //Add animation for player and baddies
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    baddiea.animations.add('left',[0,1],10,true);
    baddieb.animations.add('right',[2,3],10,true);


    //Create star group
    stars = game.add.group();
    stars.enableBody = true;				//Enable physic for star group

    // Create 12 stars evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside the star group
        var star = stars.create(i * 70, 0, 'star');

        //  Set physics properties for stars
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

	//Create diamond group
    diamonds = game.add.group(); 			//Enable physic for diamonnd group
    diamonds.enableBody = true;
   
    //Create diamond inside the diamond group with random position
    var positionX = game.rnd.integerInRange(0, 500);
    var positionY = game.rnd.integerInRange(100, 600);
    var diamond = diamonds.create(positionX, positionY, 'diamond');

    //Add a score board
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //Set player control
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    //Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(baddiea, platforms);
    game.physics.arcade.collide(baddieb, platforms);

    //Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
    game.physics.arcade.overlap(player, baddiea, npc, null, this);
    game.physics.arcade.overlap(player, baddieb, npc, null, this);

    //Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        player.animations.stop();

        player.frame = 4;
    }
    
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }
    
    // Set baddies direction
    baddiea.animations.play('left')
    baddieb.animations.play('right')
}

function collectStar (player, star) {    
    // Removes the star
    star.kill();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}
function collectDiamond (player, diamond) {
    // Removes the diamond
    diamond.kill();
    //  Add and update the score
    score += 50;
    scoreText.text = 'Score: ' + score;

}

function npc (player, baddie) {
    // Removes the baddie
    baddie.kill();
    //  Substrate and update the score
    score -= 25;
    scoreText.text = 'Score: ' + score;

}

// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
    init: function() {
        this.level = 1;
    },
    preload: function() {
        console.log('MainMenu: preload');
    },
    crete: function() {
        console.log('MainMenu: create');
        game.stage.backgroundColor = "#facade";
    },
    update: function() {
        // main menu logic
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            // pass this.level to next state
            // .start(key,clearWorld, clearCache, parameter)
            game.state.start('Play', true, false, this.level);
        }
    }
}

// define Play state and methods
var MainMenu = function(game) {};
Play.prototype = {
    preload: function() {
        console.log('Play: preload');
    },
    crete: function() {
        console.log('Play: create');
        game.stage.backgroundColor = "#ccddaa";
    },
    update: function() {
        // Play logic
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('GameOver');
    }
}

// define GameOver state and methods
var MainMenu = function(game) {};
GameOver.prototype = {
    preload: function() {
        console.log('GameOver: preload');
    },
    crete: function() {
        console.log('GameOver: create');
        game.stage.backgroundColor = "#bb11ee";
    },
    update: function() {
        // GameOver logic
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('MainMenu');
    }
}


// add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');