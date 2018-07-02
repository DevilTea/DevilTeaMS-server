importPackage(Packages.server);
importPackage(Packages.client.inventory);

var status = -1;
var inventoryType;
var selectedSlot;
var inventory;
var item;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == 1) {
		status += 1;
	} else {
		cm.sendOk("�U���A��~");
		cm.dispose();
		return;
	}
	
	if(status == 0) {
		cm.sendSimple("�A�n�R�����@�������~?\r\n\r\n#b#L0#�˳���#l\r\n#L1#������#l\r\n#L2#�˹���#l\r\n#L3#��L��#l\r\n#L4#�S����#l");
	} else if(status == 1) {
		var text = "�п�ܭn�R�������~\r\n";
		switch(selection) {
			case 0:
				text += cm.getEquipList(true);
				inventoryType = MapleInventoryType.EQUIP;
				break;
			case 1:
				text += cm.getUseList();
				inventoryType = MapleInventoryType.USE;
				break;
			case 2:
				text += cm.getSetupList();
				inventoryType = MapleInventoryType.SETUP;
				break;
			case 3:
				text += cm.getEtcList();
				inventoryType = MapleInventoryType.ETC;
				break;
			case 4:
				text += cm.getCashList();
				inventoryType = MapleInventoryType.CASH;
				break;
		}
		inventory = cm.getPlayer().getInventory(inventoryType);
		cm.sendSimple(text);
	} else if(status == 2) {
		selectedSlot = selection;
		item = inventory.getItem(selectedSlot);
		cm.sendYesNo("�T�w�n�R��#i" + item.getItemId() + "##b#t" + item.getItemId() + "##k��?\r\n#r(�`�N!�O�N���@�檺���~�����R��!)");
	} else if(status == 3) {
		cm.sendOk("�w�g�R���F#i" + item.getItemId() + "##b#t" + item.getItemId() + "##k!");
		MapleInventoryManipulator.removeFromSlot(cm.getClient(), inventoryType, selectedSlot, item.getQuantity(),false);
	} else if(status == 4) {
		cm.sendYesNo("�٭n�~��R�����~��?");
	} else if(status == 5) {
		status = -1;
		action(1, 0, 0);
	}
}