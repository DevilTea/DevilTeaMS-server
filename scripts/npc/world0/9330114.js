importPackage(Packages.tools);
importPackage(Packages.server);
importPackage(Packages.constants);
importPackage(Packages.client.inventory);

var enable = false;
var status = -1;
var costItemId = 5220000;
var costItemQuantity = 1;
var gachaponName = "�}�b����J��";
var broadcastItem = [];//���|�s�������~ID
var gachaponList = 
[
	//new GachaponItem(���~ID, �ƶq, �v��)
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
		cm.sendOk("#b" + gachaponName + " #k�|���}��");
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
		var txt = "#e#b-[��J�����e����]-#n :\r\n\r\n";
		for(var i = 0;i < gachaponList.length;i++) {
			txt += "\t#e#r[" + getChance(gachaponList[i].weight) + "%]\r\n\t\t\t#i" + gachaponList[i].itemId + "##n#b#t" + gachaponList[i].itemId + "#\r\n\r\n";
		}
		cm.sendNext(txt);
	} else if(status == 1) {
		if(cm.haveItem(costItemId, costItemQuantity)) {
			cm.sendYesNo("�A���W�������� #b#i" + costItemId + "##t" + costItemId + "# #k�A�n�ϥ�#b" +gachaponName + "#k��J��?");
		} else {
			cm.sendOk("�A���W�S�������� #b#i" + costItemId + "##t" + costItemId + "#");
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
				cm.getClient().getWorldServer().broadcastPacket(MaplePacketCreator.gachaponMessage("���� " + cm.getPlayer().getName() + " �q -" + gachaponName + "- ���F", item, " �j�a�@�_���ߥL!"));
			}
			MapleInventoryManipulator.addFromDrop(cm.getClient(), item, true);
			cm.gainItem(costItemId, -1);
			cm.sendOk("�q #b" + gachaponName + "#k ���F #b#i" + item.getItemId() + "##t" + item.getItemId() + "#");
		} else {
			cm.sendOk("���ˬd�I�]�Ŷ��O�_�C�������ܤ֤@��Ŷ�!")
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