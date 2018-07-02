/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100008 Kiru (Orbis Station)

-------Credits:-------------------------------------------------------------------
	*MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Ereve");
var method;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		if(mode == 0 && status == 0) {
			cm.dispose();
			return;
		} else if(mode == 0) {
			cm.sendNext("好吧，如果你改變想法了再來找我吧。");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			for(var i=0; i < menu.length; i++) {
				var display = "\r\n#L"+i+"##b 我要去耶雷弗 (1000 楓幣)#k";
			}			
			cm.sendSimple("這艘船將朝向#b耶雷弗#k，你會發現深紅色的葉子在陽光下，輕柔的微風滑過了溪流，還有西格諾斯女皇。 如果你對加入皇家騎士團有興趣的話，絕對要去參觀一下。 你有興趣要到耶雷弗看看嗎? 此趟旅程將要花費 #b1000#k 楓幣\r\n"+display);
			
		} else if(status == 1) {
			if(cm.getMeso() < 1000) {
				cm.sendNext("嗯... 你確定你有 #b1000#k 楓幣嗎? 我也是要生活的，畢竟大家出來都是要混口飯吃...");
				cm.dispose();
			} else {
				var em = cm.getEventManager("EreveShip");
				cm.gainMeso(-1000);
				em.setProperty(cm.getPlayer().getName(), "Orbis_Ereve");
				em.startInstance(cm.getPlayer());
				cm.dispose();
			}
		}
	}
}