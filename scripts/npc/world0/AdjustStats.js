//極品綠茶

importPackage(Packages.client);

var status = -1;
var player;
var nowStr;
var nowDex;
var nowInt;
var nowLuk;
var nowAp;
var sel;



function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	
	player = cm.getPlayer();
	init();
    if(mode == 1) {
		status += 1;
	} else {
		cm.sendOk("下次再見");
		cm.dispose();
		return;
	}
	
	if(status == 0) {
		cm.sendSimple("請問你要對能力值進行何種操作?#b\r\n\r\n#L0#重置#l\r\n#L1#分配#l");
	} else if(status == 1) {
		sel = selection;
		if(sel == 0) {
			cm.sendYesNo(getNowInfo() + "\r\n\r\n" + getResetInfo() + "\r\n\r\n#r#e確定重置?");
		} else if(sel ==1) {
			status = 11;
			cm.sendSimple(getNowInfo() + "\r\n\r\n你要如何分配?\r\n\r\n#b#L0#力量#l\r\n#b#L1#敏捷#l\r\n#b#L2#智力#l\r\n#b#L3#幸運#l");
		}
	} else if(status == 2) {
		var points = nowAp + nowStr + nowDex + nowInt + nowLuk - 16;
		player.setStr(4);
		player.setDex(4);
		player.setInt(4);
		player.setLuk(4);
		player.setRemainingAp(points);
		player.updateSingleStat(MapleStat.STR, 4);
		player.updateSingleStat(MapleStat.DEX, 4);
		player.updateSingleStat(MapleStat.INT, 4);
		player.updateSingleStat(MapleStat.LUK, 4);
		player.updateSingleStat(MapleStat.AVAILABLEAP, points);
		init();
		cm.sendNext("#r#e重置完成!\r\n\r\n" + getNowInfo());
	} else if(status == 12) {
		sel = selection;
		var text = "你要在#b";
		switch(sel) {
			case 0:
				text += "力量";
				break;
			case 1:
				text += "敏捷";
				break;
			case 2:
				text += "智力";
				break;
			case 3:
				text += "幸運";
				break;
		}
		text += "#k分配多少能力值呢?\r\n#b(請輸入 #r1 ~ " + nowAp + " #b的數字)";
		cm.sendGetText(text);
	} else if(status == 13) {
		var num = parseInt(cm.getText());
		if(1 <=num && num <= nowAp) {
			switch(sel) {
				case 0:
					player.setStr(nowStr + num);
					player.updateSingleStat(MapleStat.STR, nowStr + num);
					break;
				case 1:
					player.setDex(nowDex + num);
					player.updateSingleStat(MapleStat.DEX, nowDex + num);
					break;
				case 2:
					player.setInt(nowInt + num);
					player.updateSingleStat(MapleStat.INT, nowInt + num);
					break;
				case 3:
					player.setLuk(nowLuk + num);
					player.updateSingleStat(MapleStat.LUK, nowLuk + num);
					break;
			}
			player.setRemainingAp(nowAp - num);
			player.updateSingleStat(MapleStat.AVAILABLEAP, nowAp - num);
			init();
			cm.sendNext("#r#e分配完畢!\r\n\r\n" + getNowInfo());
		} else {
			if(nowAp != 0)
				cm.sendNext("請輸入 #r1 ~ " + nowAp + " #k的數字");
			else
				cm.sendNext("你沒有能力值可以進行分配");
		}
	} else if(status == 14 || status == 3) {
		status = -1;
		cm.sendYesNo("您要再次對能力值進行操作嗎?");
	}
}

function init() {
	nowStr = player.getStr();
	nowDex = player.getDex();
	nowInt = player.getInt();
	nowLuk = player.getLuk();
	nowAp = player.getRemainingAp();
}

function getNowInfo() {
	var info = "#e#b目前能力值 : \r\n\r\n#n#k力量 : #b" + nowStr + "#k\r\n\r\n敏捷 : #b" + nowDex + "#k\r\n\r\n智力 : #b" + nowInt + "#k\r\n\r\n幸運 : #b" + nowLuk + "#k\r\n\r\n剩餘能力值 : #b" + nowAp + "#k";
	return info;
}

function getResetInfo() {
	var newAp = nowAp + nowStr + nowDex + nowInt + nowLuk - 16;
	var info = "#e#b重置後能力值 : \r\n\r\n#n#k力量 : #b4#k\r\n\r\n敏捷 : #b4#k\r\n\r\n智力 : #b4#k\r\n\r\n幸運 : #b4#k\r\n\r\n剩餘能力值 : #b" + newAp + "#k";
	return info;
}