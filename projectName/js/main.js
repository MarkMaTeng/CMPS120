var game = new Phaser.Game(600, 700, Phaser.AUTO);



// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
    // init: function() {
    //     this.level = 1;
    // },
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
            game.state.start('Play');
        }
    }
}

// define Play state and methods
var Play = function(game) {};
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
var GameOver = function(game) {};
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