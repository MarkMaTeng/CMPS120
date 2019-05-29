//手机场景
function phoneEvent(){
	if(inOven == false && inBanana == false && inPipe == false && inStair == false){//判断是否在别的场景
		inPhone = true;
		console.log(inOven, inBanana, inPipe, inStair, inPhone);
		if(longcatpicked == false){
		this.catbackground = this.add.sprite(-600, 0, 'longcatphoto');
		}
		this.phone = this.add.sprite(0, 0, 'pano');
		if(this.catbackground.x < 100)
		{
			this.leftKey = this.add.button(315, 595, 'arrowKey', moveLeft,this,  0, 0, 0);
			//this.leftKey = this.add.sprite(480, 500, 'arrowKey');
			this.leftKey.anchor.set(0.5);
			this.leftKey.rotation = Math.PI/2*3;
			this.game.inputEnabled = true;
			//this.game.input.onHold.add(moveLeft, this);	
		}
		}
		this.backFromPhone = this.add.button(0, 0, 'back', phoneOut, this, 0, 0, 0);
	
}
//左移
function moveLeft(){
	this.catbackground.x += 140;
	if(this.catbackground.x >= 100)
		{
			this.leftKey.destroy();
		}
}

//退出phone场景，清空所有,出现长猫
function phoneOut(){
	inphone = false;//离开stair场景
	if(this.catbackground.x >= 100 && longcatpicked == false)
	{
		this.longcat = this.add.button(450,350, 'longcat', picklongCat, this, 0, 0, 0);
		this.longcat.anchor.set(0.5);
		this.longcat.width = 300;
		this.longcat.height = 100;

	}
	this.leftKey.destroy();
	this.catbackground.destroy();
	this.phone.destroy();
	this.backFromPhone.destroy();
	inPhone = false;
	
}

//抓长猫
function picklongCat(){
	this.Meow1.play();
	longcatpicked = true;
	this.longcat.destroy();
	scoreBarPlus();
}