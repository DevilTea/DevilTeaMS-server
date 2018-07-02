/*
改變髮型 cm.openNpc(1012117);
改變臉型 cm.openNpc(9201148);
能力調整 cm.openNpc(9010000, "AdjustStats");
*/

var status = -1;
var sel_0;
var sel_1;
var row1 = "#b#e#L10#鬼娃恰吉#l\t\t\t\t\t#L11#我的倉庫#l";
var row2 = "#b#e#L20#改變髮型#l\t\t\t\t\t#L21#改變臉型#l";
var row3 = "#b#e#L30#道具兌換#l\t\t\t\t\t#L31#副本傳送#l";
var row4 = "#b#e#L40#經驗銀行#l\t\t\t\t\t#L41#楓葉百貨#l";
var row5 = "#b#e#L50#能力調整#l\t\t\t\t\t#L51#誰在線上#l";
var row6 = "#b#e#L60#礦石冶煉#l\t\t\t\t\t#L61#裝備強化#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == 1) {
		status += 1;
	} else {
		cm.sendOk("希望可以幫上您的忙!")
		cm.dispose();
		return;
	}
	
	if(status == 0) {
		cm.sendSimple("親愛的#b#h ##k您好! 請問您需要我幫些甚麼忙呢?\r\n\r\n\t\t\t"+row1+"\r\n\r\n\t\t\t"+row2+"\r\n\r\n\t\t\t"+row3+"\r\n\r\n\t\t\t"+row4+"\r\n\r\n\t\t\t"+row5+"\r\n\r\n\t\t\t"+row6);
	} else if(status == 1) {
		sel_0 = selection;
		switch(sel_0) {
			case 10:
				cm.sendOk("尚未開放");
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
				cm.sendOk("尚未開放");
				cm.dispose();
				break;
			case 31:
				cm.sendOk("尚未開放");
				cm.dispose();
				break;
			case 40:
				cm.sendOk("尚未開放");
				cm.dispose();
				//cm.openNpc(9010000, "ExpBank");
				break;
			case 41:
				cm.sendOk("尚未開放");
				cm.dispose();
				break;
			case 50:
				//cm.sendOk("尚未開放");
				cm.dispose();
				cm.openNpc(9010000, "AdjustStats");
				break;
			case 51:
				//cm.sendOk("目前在線上的有#b\r\n"+cm.getOnlineCharName());
				cm.sendOk("尚未開放");
				cm.dispose();
				break;
			case 60:
				cm.sendOk("尚未開放");
				cm.dispose();
				break;
			case 61:
				cm.sendOk("尚未開放");
				cm.dispose();
				break;
		}
	} else if(status == 2) {
		sel_1 = selection;
	}
}