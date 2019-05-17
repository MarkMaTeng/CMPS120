// Teng Ma
// 4/19/19
// Snowstorm.js

function Snowstorm(game, key, frame, scale, rotation) {
    // call to Phaser.Sprite
    // new Sprite(game, x, y, key, frame)
    //Phaser.Sprite.call(this, game, game.rnd.integerInrange(32, game.width-32), game.rnd.integerInrange(32, game.height-32), key, frame);
    Phaser.Sprite.call(this, game, game.rnd.integerInRange(64,game.width-64), game.rnd.integerInRange(64,game.height-61), key, frame);
    // add custom properties
    this.anchor.set(0.5);
    this.scale.x = scale;
    this.scale.y = scale;
    this.rotation = rotation;

    // add physics properties
    game.physics.enable(this);
    this.enableBody = true;

    // semi-transparent
    this.alpha = 0.4;           
    this.physicsBodyType = Phaser.Physics.ARCADE;

    // random positive x/y velocity
    this.body.velocity.y = game.rnd.integerInRange(1, 100);
    this.body.velocity.x = game.rnd.integerInRange(1, 100);
    // random rotation
    this.body.angularVelocity = game.rnd.integerInRange(-180, 180);

}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Snowstorm)
Snowstorm.prototype = Object.create(Phaser.Sprite.prototype);
Snowstorm.prototype.constructor = Snowstorm;

// override Phaser.Sprite update (to spin the object)
Snowstorm.prototype.update = function() {
    // reverse horizontal by pressing the 'R' key
    if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
        this.body.velocity.x = -this.body.velocity.x;
    }


    // It should wrap to the opposite side cleanly 
    // when snow reaches the edge of the screen
    if(this.y >= 720)
    {
        this.y = -10;
    }

    if(this.x >= 640)
    {
        this.x = -10;
    }

    if(this.x <= -40)
    {
        this.x = 610;
    }

}
