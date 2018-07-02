var status = -1;
var map = 910060000;
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
		/*if (cm.isQuestActive(22515) || cm.isQuestActive(22516) || cm.isQuestActive(22517) || cm.isQuestActive(22518)) {
			cm.sendYesNo("Would you like to go in the special Spore Training Center?");
			status = 1;
		}*/
		var selStr = "你要進入修煉場嗎?";
		for (var i = 0; i < num; i++) {
		selStr += "\r\n#b#L" + i + "#弓箭手修煉場 " + i + " (" + cm.getPlayerCount(map + i) + "/" + maxp + ")#l#k";
		}
		cm.sendSimple(selStr);
    } else if (status == 1) {
		if (selection < 0 || selection >= num) {
			cm.dispose();
		} else if (cm.getPlayerCount(map + selection) >= maxp) {
			cm.sendNext("這個修煉場的人數已滿");
			status = -1;
		} else {
			cm.warp(map + selection, 0);
			cm.dispose();
		}
    } else if (status == 2) {
		cm.warp(910060100,0);
		cm.dispose();
    }
}