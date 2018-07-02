var status = -1;

function start() {
	action(1,0,0);
}

function action(mode, type, selection) {
	
	if(mode == -1) {
		cm.dispose();
	} else if(mode == 1) {
		status++;
		if(status == 0) {
			cm.sendYesNo("你要去西門町啊?");
		} else if(status == 1) {
			cm.warp(742000101, 0);
			cm.dispose();
		}
	} else {
		cm.sendOk("不想去啊...");
		cm.dispose();
		return;
	}
}