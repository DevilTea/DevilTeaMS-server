/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100007 Kiriru (Victoria Island Station to Ereve)

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
			cm.sendNext("你對這件事沒有興趣啊，好吧...");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			for(var i=0; i < menu.length; i++) {
				var display = "\r\n#L"+i+"##b 我要去耶雷弗 (1000 楓幣)#k";
			}			
			cm.sendSimple("呃... 所以... 嗯... 你想要離開維多利亞島去別的區域? 你可以搭這艘船去 #b耶雷弗#k。在那裡，你會看到明亮的陽光照在葉子上，並感受到溫柔的微風。 那裡也是神獸和西格諾斯女皇的所在處。 你要去耶雷弗嗎? 時間的話大概要#b30秒左右#k然後你需要支付 #b1000#k 楓幣\r\n"+display);
			
		} else if(status == 1) {
			if(cm.getMeso() < 1000) {
				cm.sendNext("嗯... 你確定你有 #b1000#k 楓幣嗎? 我也是要生活的，畢竟大家出來都是要混口飯吃...");
				cm.dispose();
			} else {
				var em = cm.getEventManager("EreveShip");
				cm.gainMeso(-1000);
				em.setProperty(cm.getPlayer().getName(), "VictoriaIsland_Ereve");
				em.startInstance(cm.getPlayer());
				cm.dispose();
			}
		}
	}
}