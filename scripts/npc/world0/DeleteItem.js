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
		cm.sendOk("下次再見~");
		cm.dispose();
		return;
	}
	
	if(status == 0) {
		cm.sendSimple("你要刪除哪一類的物品?\r\n\r\n#b#L0#裝備類#l\r\n#L1#消耗類#l\r\n#L2#裝飾類#l\r\n#L3#其他類#l\r\n#L4#特殊類#l");
	} else if(status == 1) {
		var text = "請選擇要刪除的物品\r\n";
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
		cm.sendYesNo("確定要刪除#i" + item.getItemId() + "##b#t" + item.getItemId() + "##k嗎?\r\n#r(注意!是將那一格的物品全部刪除!)");
	} else if(status == 3) {
		cm.sendOk("已經刪除了#i" + item.getItemId() + "##b#t" + item.getItemId() + "##k!");
		MapleInventoryManipulator.removeFromSlot(cm.getClient(), inventoryType, selectedSlot, item.getQuantity(),false);
	} else if(status == 4) {
		cm.sendYesNo("還要繼續刪除物品嗎?");
	} else if(status == 5) {
		status = -1;
		action(1, 0, 0);
	}
}