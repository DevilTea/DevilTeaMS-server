/*
���ܾv�� cm.openNpc(1012117);
�����y�� cm.openNpc(9201148);
��O�վ� cm.openNpc(9010000, "AdjustStats");
*/

var status = -1;
var sel_0;
var sel_1;
var row1 = "#b#e#L10#������N#l\t\t\t\t\t#L11#�ڪ��ܮw#l";
var row2 = "#b#e#L20#���ܾv��#l\t\t\t\t\t#L21#�����y��#l";
var row3 = "#b#e#L30#�D��I��#l\t\t\t\t\t#L31#�ƥ��ǰe#l";
var row4 = "#b#e#L40#�g��Ȧ�#l\t\t\t\t\t#L41#�����ʳf#l";
var row5 = "#b#e#L50#��O�վ�#l\t\t\t\t\t#L51#�֦b�u�W#l";
var row6 = "#b#e#L60#�q�ۧM��#l\t\t\t\t\t#L61#�˳Ʊj��#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == 1) {
		status += 1;
	} else {
		cm.sendOk("�Ʊ�i�H���W�z����!")
		cm.dispose();
		return;
	}
	
	if(status == 0) {
		cm.sendSimple("�˷R��#b#h ##k�z�n! �аݱz�ݭn�����Ǭƻ򦣩O?\r\n\r\n\t\t\t"+row1+"\r\n\r\n\t\t\t"+row2+"\r\n\r\n\t\t\t"+row3+"\r\n\r\n\t\t\t"+row4+"\r\n\r\n\t\t\t"+row5+"\r\n\r\n\t\t\t"+row6);
	} else if(status == 1) {
		sel_0 = selection;
		switch(sel_0) {
			case 10:
				cm.sendOk("�|���}��");
				cm.dispose();
				break;
			case 11:
				cm.getPlayer().getStorage().sendStorage(cm.getClient(), 9010000);
				cm.dispose();
				break;
			case 20:
				cm.dispose();
				cm.openNpc(1012117);
				break;
			case 21:
				cm.dispose();
				cm.openNpc(9201148);
				break;
			case 30:
				cm.sendOk("�|���}��");
				cm.dispose();
				break;
			case 31:
				cm.sendOk("�|���}��");
				cm.dispose();
				break;
			case 40:
				cm.sendOk("�|���}��");
				cm.dispose();
				//cm.openNpc(9010000, "ExpBank");
				break;
			case 41:
				cm.sendOk("�|���}��");
				cm.dispose();
				break;
			case 50:
				//cm.sendOk("�|���}��");
				cm.dispose();
				cm.openNpc(9010000, "AdjustStats");
				break;
			case 51:
				//cm.sendOk("�ثe�b�u�W����#b\r\n"+cm.getOnlineCharName());
				cm.sendOk("�|���}��");
				cm.dispose();
				break;
			case 60:
				cm.sendOk("�|���}��");
				cm.dispose();
				break;
			case 61:
				cm.sendOk("�|���}��");
				cm.dispose();
				break;
		}
	} else if(status == 2) {
		sel_1 = selection;
	}
}