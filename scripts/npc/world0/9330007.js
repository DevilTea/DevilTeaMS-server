var status = -1;
var sel;

function start() {
	action(1,0,0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
	} else if(mode == 1) {
		status++;
		var map = cm.getPlayer().getMapId();
			if(status == 0) {
				var txt = "�A�n�аݦ�����ݭn�A�Ȫ���?";
				if(map == 103000100) txt += "\r\n\r\n#b#L2#�ڭn�h����m#l";
				cm.sendSimple(txt)
			} else if(status == 1) {
				sel = selection;
				if(sel == 2) {
					cm.warp(740000100);
					cm.dispose();
				}
			}
	} else {
		cm.dispose();
		return;
	}
}