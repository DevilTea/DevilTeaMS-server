var status = -1;
var map = 910310000;
var num = 5;
var maxp = 5;

function start() {
	action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1) {
		status++;
    } else {
		if (status <= 1) {
			cm.safeDispose();
			return;
		}
		status--;
    }
    if (status == 0) {
		var selStr = "�A�n�i�J�׷ҳ���?";
		for (var i = 0; i < num; i++) {
			selStr += "\r\n#b#L" + i + "#�s��׷ҳ� " + i + " (" + cm.getPlayerCount(map + i) + "/" + maxp + ")#l#k";
		}
		cm.sendSimple(selStr);
    } else if (status == 1) {
		if (selection < 0 || selection >= num) {
			cm.dispose();
		} else if (cm.getPlayerCount(map + selection) >= maxp) {
			cm.sendNext("�o�ӭ׷ҳ����H�Ƥw��");
			status = -1;
		} else {
			cm.warp(map + selection, 0);
			cm.dispose();
		}
    }
}