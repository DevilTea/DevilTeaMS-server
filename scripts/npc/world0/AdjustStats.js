//���~���

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
		cm.sendOk("�U���A��");
		cm.dispose();
		return;
	}
	
	if(status == 0) {
		cm.sendSimple("�аݧA�n���O�ȶi���ؾާ@?#b\r\n\r\n#L0#���m#l\r\n#L1#���t#l");
	} else if(status == 1) {
		sel = selection;
		if(sel == 0) {
			cm.sendYesNo(getNowInfo() + "\r\n\r\n" + getResetInfo() + "\r\n\r\n#r#e�T�w���m?");
		} else if(sel ==1) {
			status = 11;
			cm.sendSimple(getNowInfo() + "\r\n\r\n�A�n�p����t?\r\n\r\n#b#L0#�O�q#l\r\n#b#L1#�ӱ�#l\r\n#b#L2#���O#l\r\n#b#L3#���B#l");
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
		cm.sendNext("#r#e���m����!\r\n\r\n" + getNowInfo());
	} else if(status == 12) {
		sel = selection;
		var text = "�A�n�b#b";
		switch(sel) {
			case 0:
				text += "�O�q";
				break;
			case 1:
				text += "�ӱ�";
				break;
			case 2:
				text += "���O";
				break;
			case 3:
				text += "���B";
				break;
		}
		text += "#k���t�h�֯�O�ȩO?\r\n#b(�п�J #r1 ~ " + nowAp + " #b���Ʀr)";
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
			cm.sendNext("#r#e���t����!\r\n\r\n" + getNowInfo());
		} else {
			if(nowAp != 0)
				cm.sendNext("�п�J #r1 ~ " + nowAp + " #k���Ʀr");
			else
				cm.sendNext("�A�S����O�ȥi�H�i����t");
		}
	} else if(status == 14 || status == 3) {
		status = -1;
		cm.sendYesNo("�z�n�A�����O�ȶi��ާ@��?");
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
	var info = "#e#b�ثe��O�� : \r\n\r\n#n#k�O�q : #b" + nowStr + "#k\r\n\r\n�ӱ� : #b" + nowDex + "#k\r\n\r\n���O : #b" + nowInt + "#k\r\n\r\n���B : #b" + nowLuk + "#k\r\n\r\n�Ѿl��O�� : #b" + nowAp + "#k";
	return info;
}

function getResetInfo() {
	var newAp = nowAp + nowStr + nowDex + nowInt + nowLuk - 16;
	var info = "#e#b���m���O�� : \r\n\r\n#n#k�O�q : #b4#k\r\n\r\n�ӱ� : #b4#k\r\n\r\n���O : #b4#k\r\n\r\n���B : #b4#k\r\n\r\n�Ѿl��O�� : #b" + newAp + "#k";
	return info;
}