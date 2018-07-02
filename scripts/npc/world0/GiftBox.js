var status = -1;
var giftbox;

function start() {
	giftbox = cm.getPlayer().getGiftBox();
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
		if(giftbox.haveGift()) {
			var list;
			var txt = "";
			list = giftbox.getItems(true);
			if(list.length > 0){
				txt += "#e#k<�b��§��> :#n\r\n\r\n";
				for(var i = 0;i < list.length;i++) {
					var item = list.get(i);
					if(i != 0) txt +="\r\n"
					txt += "#L" + -(i + 10) + "##i" + item.getItemId() + ":##b#t" + item.getItemId() + "##l";
				}
			}
			list = giftbox.getItems(false);
			if(list.length > 0){
				txt += "\r\n\r\n#e#k<����§��> :#n\r\n\r\n";
				for(var i = 0;i < list.length;i++) {
					var item = list.get(i);
					if(i != 0) txt +="\r\n"
					txt += "#L" + (i + 10) + "##i" + item.getItemId() + ":##b#t" + item.getItemId() + "##l";
				}
			}
			cm.sendSimple(txt);
		} else {
			cm.sendOk("�ثe�S���i�H�����§��!");
			cm.dispose();
		}
	} else if(status == 1) {
		status = -1;
		var isAccountGift = (selection < 0);
		var sel = Math.abs(selection) - 10;
		if(giftbox.takeOut(sel, isAccountGift)) {
			cm.sendNext("������\!#b(��^§���M��)");
		} else {
			cm.sendOk("�������!���ˬd�I�]�Ŷ��O�_�����A�Ϊ̦��D��O�_���M�ݹD��!");
			cm.dispose();
		}
	}
}