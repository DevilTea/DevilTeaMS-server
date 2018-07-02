importPackage(Packages.tools);
importPackage(Packages.server);
importPackage(Packages.constants);
importPackage(Packages.client.inventory);

var enable = false;
var status = -1;
var costItemId = 5220000;
var costItemQuantity = 1;
var gachaponName = "法師轉蛋機";
var broadcastItem = [];//抽到會廣播的物品ID
var gachaponList = 
[
	//new GachaponItem(物品ID, 數量, 權重)
];

function GachaponItem(itemId, quantity, weight) {
	this.itemId = itemId;
	this.quantity = quantity;
	this.weight = weight;
}

function start() {
    if(enable) {
		action(1, 0, 0);
	} else {
		cm.sendOk("#b" + gachaponName + " #k尚未開放");
		cm.dispose();
	}
}

function action(mode, type, selection) {
    if(mode == 1) {
		status += 1;
	} else {
		cm.dispose();
		return;
	}
	if(status == 0) {
		var txt = "#e#b-[轉蛋物內容介紹]-#n :\r\n\r\n";
		for(var i = 0;i < gachaponList.length;i++) {
			txt += "\t#e#r[" + getChance(gachaponList[i].weight) + "%]\r\n\t\t\t#i" + gachaponList[i].itemId + "##n#b#t" + gachaponList[i].itemId + "#\r\n\r\n";
		}
		cm.sendNext(txt);
	} else if(status == 1) {
		if(cm.haveItem(costItemId, costItemQuantity)) {
			cm.sendYesNo("你身上有足夠的 #b#i" + costItemId + "##t" + costItemId + "# #k你要使用#b" +gachaponName + "#k轉蛋嗎?");
		} else {
			cm.sendOk("你身上沒有足夠的 #b#i" + costItemId + "##t" + costItemId + "#");
			cm.dispose();
		}
	} else if(status == 2) {
		if(cm.canHold()) {
			var getGachapon = getGachaponResult(gachaponList);
			var ii = MapleItemInformationProvider.getInstance();
			var item;
			if (ItemConstants.getInventoryType(getGachapon.itemId) == MapleInventoryType.EQUIP) {
				item = ii.randomizeStats(ii.getEquipById(getGachapon.itemId));
			} else {
				item = new Item(getGachapon.itemId, 0, getGachapon.quantity);
			}
			if(isNeededBroadcast(getGachapon.itemId)) {
				cm.getClient().getWorldServer().broadcastPacket(MaplePacketCreator.gachaponMessage("恭喜 " + cm.getPlayer().getName() + " 從 -" + gachaponName + "- 抽到了", item, " 大家一起恭喜他!"));
			}
			MapleInventoryManipulator.addFromDrop(cm.getClient(), item, true);
			cm.gainItem(costItemId, -1);
			cm.sendOk("從 #b" + gachaponName + "#k 抽到了 #b#i" + item.getItemId() + "##t" + item.getItemId() + "#");
		} else {
			cm.sendOk("請檢查背包空間是否每類都有至少一格空間!")
		}
		cm.dispose();
	}
}

function getGachaponResult(list) {
	var copyList = new Array();
	copyList = copyList.concat(list);
	while(true) {
		var totalWeight = 0;
		var probability = 0;
		var precision = 0;
		var tryingGet;
		for(var i = 0;i < copyList.length;i++) {
			totalWeight += copyList[i].weight;
		}
		tryingGet = copyList[(random(1, copyList.length) - 1)];
		probability = tryingGet.weight / totalWeight;
		precision = Math.pow(10, Math.ceil(Math.log(totalWeight) / Math.log(10)));
		if(random(1, precision) > (precision - probability * precision)) break;
		copyList.splice(copyList.indexOf(tryingGet), 1);
	}
	return tryingGet;
}

function getChance(weight) {
	var totalWeight = 0;
	for(var i = 0;i < gachaponList.length;i++) {
		totalWeight += gachaponList[i].weight;
	}
	return (Math.floor(weight * 1000 / totalWeight) / 10);
}

function random(min, max) {
	return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function isNeededBroadcast(id) {
	for(var i = 0;i < broadcastItem.length;i++) {
		if(id == broadcastItem[i]) return true;
	}
	return false;
}