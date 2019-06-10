function stairEvent(){
    if(inOven == false && inBanana == false && inPipe == false && inPhone == false && inStair == false){//判断是否在别的场景
        inStair = true;
        console.log(inOven, inBanana, inPipe, inStair);
        this.stair = this.add.sprite(0, 0, 'stair');
        if(staircatpicked == false){
			this.stairCatImage = this.add.sprite(0, 0, 'staircatImage');
			this.rollstaircat = this.add.button(860, 40, 'trigger', rollingStairCat, this, 0, 0, 0);
			this.rollstaircat.anchor.set(0.5);
			this.rollstaircat.width = 150;
			this.rollstaircat.height = 150;
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
    this.stairCat.animations.add('roll', ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7'], 3, false);
    this.stairCat.animations.play('roll');
    this.pickstaircat = this.add.button(300, 500, 'trigger', pickStairCat, this, 0, 0, 0);
    this.pickstaircat.anchor.set(0.5);
    this.pickstaircat.width = 250;
    this.pickstaircat.height = 300;
    this.backFromStair = this.add.button(0, 0, 'back', stairOut, this, 0, 0, 0);
}
//抓stairCat
function pickStairCat(){
    meow();
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

