var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == 1) {
		status += 1;
	} else {
		cm.dispose();
		return;
	}
	
	if(status == 0) {
		
	}
}