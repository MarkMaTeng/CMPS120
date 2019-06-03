function readReportOnSpace(){
	if(readingSpaceReport == false){
		readingSpaceReport = true;
		this.spaceReport = this.add.button(0, 0, 'reportonspace', finishReadSpaceRepory, this, 0, 0, 0);
	}
}


function finishReadSpaceRepory(){
	this.spaceReport.destroy();
	readingSpaceReport = false;
}