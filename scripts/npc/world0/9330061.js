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
			cm.sendYesNo("�A�n�h�x�_101��?");
		} else if(status == 1) {
			cm.warp(742000104, 3);
			cm.dispose();
		}
	} else {
		cm.sendOk("���Q�h��...");
		cm.dispose();
		return;
	}
}