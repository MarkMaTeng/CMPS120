var catFinded = 1;
var scorebar;
var spacePosition = 1;

//level 1
var lampCabinetOpen = false;
var inOven = false;
var inPipe = false;
var inBanana = false;
var inStair = false;
var inPhone =false;
var pipeAlreadyout = false;

//level 2
var readingSpaceReport = false;
var readingNotes = false;
var inTelescope = false;
var inTree = false;
var inMicro = false;


var itemDistance = 0;


//level 1
var cupcakecatpicked = false;
var pipecatpicked = false;
var bananacatpicked = false;
var fishbowlpicked = false;
var lamppicked = false;
var steamcatpicked = false;
var staircatpicked = false;
var longcatpicked = false;
var shadowcatpicked = false;

var havePipeCat = false;
var haveLongCat = false;


//level 2
var crowcatpicked = false;
var bosscatpicked = false;
var blackholecatpicked = false;
var spacecatpicked = false;
var blackholecatexist = false;
var spacecatexist = false;
var microcatpicked = false;

var tComplete = false;
var cComplete = false;

var fishbowling = false;
var lamping = false;
var bactoriaing = false;
var teaing = false;
var co3ing = false;
var so4ing = false;

var fishbowlPosition;
var lampPosition;
var teaPosition;
var co3Position;
var so4Position;
var bactoriaPosition;
var bgm;

function restart(){
	game.state.start('MainMenu', true, false);
	 catFinded = 1;
 scorebar;
 spacePosition = 1;

//level 1
 lampCabinetOpen = false;
 inOven = false;
 inPipe = false;
 inBanana = false;
 inStair = false;
 inPhone =false;
 pipeAlreadyout = false;

//level 2
 readingSpaceReport = false;
 readingNotes = false;
 inTelescope = false;
 inTree = false;
 inMicro = false;


 itemDistance = 0;


//level 1
 cupcakecatpicked = false;
 pipecatpicked = false;
 bananacatpicked = false;
 fishbowlpicked = false;
 lamppicked = false;
 steamcatpicked = false;
 staircatpicked = false;
 longcatpicked = false;
 shadowcatpicked = false;

 havePipeCat = false;
 haveLongCat = false;


//level 2
 crowcatpicked = false;
 bosscatpicked = false;
 blackholecatpicked = false;
 spacecatpicked = false;
 blackholecatexist = false;
 spacecatexist = false;
 microcatpicked = false;

 tComplete = false;
 cComplete = false;

 fishbowling = false;
 lamping = false;
 bactoriaing = false;
 teaing = false;
 co3ing = false;
 so4ing = false;
 bgm.stop();
 game.sound.mute = false;
}