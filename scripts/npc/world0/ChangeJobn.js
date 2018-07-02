var status = -1;
var selectList;
var player;
var nowJobId;
var newJobId;

function start() {
	player = cm.getPlayer();
	nowJobId = player.getJob().getId();
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == 1) {
		status++;
	} else {
		cm.sendOk("掰掰~");
		cm.dispose();
		return;
	}
	
	if(status == 0) {
		cm.sendNext("你好啊~#b#h ##k又見到你了~");
	} else if(status == 1) {
		if(canChangeJob()) {
			var txt = "我看看...你現在職業是 #b" + cm.getJobName(nowJobId) + " #k你要轉職成甚麼職業呢?\r\n#b";
			selectList = getSelectList(nowJobId);
			for(var i = 0;i < selectList.length;i++) {
				txt += "\r\n#L" + selectList[i] + "#" + cm.getJobName(selectList[i]) + "#l";
			}
			cm.sendSimple(txt);
		} else {
			cm.sendOk("您目前無法轉職喔!");
			cm.dispose();
		}
	} else if(status == 2) {
		newJobId = selection;
		cm.sendYesNo("確定要轉職成為 #r" + cm.getJobName(newJobId) + " #k嗎?");
	} else if(status == 3) {
		cm.getPlayer().changeJobById(newJobId);
		player.teachSkillsByJob(newJobId, 0, -1);
		cm.sendOk("轉職 #r" + cm.getJobName(newJobId) + " #k完畢~!");
		cm.dispose();
	}
}

function getJobStage() {//取得目前幾轉
	if(nowJobId % 1000 == 0) {//初新者
		return 0;
	} else if(nowJobId % 100 == 0) {//1轉
		return 1;
	} else if(nowJobId % 10 == 0) {//2轉
		return 2;
	} else if(nowJobId % 10 == 1) {//3轉
		return 3;
	} else if(nowJobId % 10 == 2) {//4轉
		return 4;
	}
}

function canChangeJob() {
	if((player.getLevel() >= 8 && getJobStage() == 0) || (player.getLevel() >= 30 && getJobStage() == 1) || 
	   (player.getLevel() >= 70 && getJobStage() == 2) || (player.getLevel() >= 120 && getJobStage() == 3)) {
		return true;
	} else {
		return false;
	}
}

function getSelectList(current) {
	var list;
	switch(current) {
		case 0:
			if(player.getLevel() == 10) list = [100, 200, 300, 400, 500];
			else if(player.getLevel() == 8) list = [200];
			break;
		case 100:
			list = [110, 120, 130];
			break;
		case 110:
			list = [111];
			break;
		case 111:
			list = [112];
			break;
		case 120:
			list = [121];
			break;
		case 121:
			list = [122];
			break;
		case 130:
			list = [131];
			break;
		case 131:
			list = [132];
			break;
		case 200:
			list = [210, 220, 230];
			break;
		case 210:
			list = [211];
			break;
		case 211:
			list = [212];
			break;
		case 220:
			list = [221];
			break;
		case 221:
			list = [222];
			break;
		case 230:
			list = [231];
			break;
		case 231:
			list = [232];
			break;
		case 300:
			list = [310, 320];
			break;
		case 310:
			list = [311];
			break;
		case 311:
			list = [312];
			break;
		case 320:
			list = [321];
			break;
		case 321:
			list = [322];
			break;
		case 400:
			list = [410, 420];
			break;
		case 410:
			list = [411];
			break;
		case 411:
			list = [412];
			break;
		case 420:
			list = [421];
			break;
		case 421:
			list = [422];
			break;
		case 500:
			list = [510, 520];
			break;
		case 510:
			list = [511];
			break;
		case 511:
			list = [512];
			break;
		case 520:
			list = [521];
			break;
		case 521:
			list = [522];
			break;
		case 1000:
			list = [1100, 1200, 1300, 1400, 1500];
			break;
		case 1100:
			list = [1110];
			break;
		case 1110:
			list = [1111];
			break;
		case 1200:
			list = [1210];
			break;
		case 1210:
			list = [1211];
			break;
		case 1300:
			list = [1310];
			break;
		case 1310:
			list = [1311];
			break;
		case 1400:
			list = [1410];
			break;
		case 1410:
			list = [1411];
			break;
		case 1500:
			list = [1510];
			break;
		case 1510:
			list = [1511];
			break;
		case 2000:
			list = [2100];
			break;
		case 2100:
			list = [2110];
			break;
		case 2110:
			list = [2111];
			break;
		case 2111:
			list = [2112];
			break;
	}
	return list;
}