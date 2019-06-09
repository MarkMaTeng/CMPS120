//手机场景
function phoneEvent(){
	if(inOven == false && inBanana == false && inPipe == false && inStair == false && inPhone == false){//判断是否在别的场景
		inPhone = true;
		console.log(inOven, inBanana, inPipe, inStair, inPhone);
		if(longcatpicked == false){
		this.catbackground = this.add.sprite(-1300, 0, 'longcatphoto');
		}
		this.pano = this.add.sprite(0, 0, 'pano');
		if(this.catbackground.x < 100)
		{
			this.leftKey = this.add.button(315, 595, 'arrowKey', moveLeft,this,  0, 0, 0);
			//this.leftKey = this.add.sprite(480, 500, 'arrowKey');
			this.leftKey.anchor.set(0.5);
			this.leftKey.rotation = Math.PI/2*3;
			this.game.inputEnabled = true;
			//this.game.input.onHold.add(moveLeft, this);	
		}
		this.backFromPhone = this.add.button(0, 0, 'back', phoneOut, this, 0, 0, 0);
		}
	
}
//左移
function moveLeft(){
	this.catbackground.x += 300;
	if(this.catbackground.x >= -200)
		{
			this.leftKey.destroy();
		}
}

//退出phone场景，清空所有,出现长猫
function phoneOut(){
	inphone = false;//离开stair场景
	if(this.catbackground.x >= -200 && longcatpicked == false){
		haveLongCat = true;
		this.longcat = this.add.button(600,535, 'longcat', picklongCat, this, 0, 0, 0);
		this.longcat.anchor.set(0.5);
		this.longcat.width = 750;
		this.longcat.height = 210;
	}
	if(haveLongCat == true){
		this.phone.destroy();
		this.nophone = game.add.sprite(650, 300, 'nophone');
	}
	

	this.leftKey.destroy();
	this.catbackground.destroy();
	this.pano.destroy();
	this.backFromPhone.destroy();
	inPhone = false;
	
}

//抓长猫
function picklongCat(){
	meow();
	longcatpicked = true;
	this.longcat.destroy();
	scoreBarPlus();
}