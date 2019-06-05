function readNotes(){
	if(readingSpaceReport == false && inTelescope == false && readingNotes == false){
		this.notes = game.add.button(-500, -150, 'notes', closeNotes, this, 0, 0, 0);
		
	}
	
}

function closeNotes(){
	this.notes.destroy();
	readingNotes = false;
	
}