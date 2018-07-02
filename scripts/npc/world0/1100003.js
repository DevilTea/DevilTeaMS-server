/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100003 Kiriru (To Victoria Island From Ereve)

-------Credits:-------------------------------------------------------------------
	*MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("我要去維多利亞島");
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
				var display = "\r\n#L"+i+"##b 我要去維多利亞島 (1000 楓幣)#k";
			}			
			cm.sendSimple("呃 又再見面了... 你要從耶雷弗離開到別的地方嗎? 如果是的話你可找對人了 我專門把人從#b耶雷弗#k載到#b維多利亞島#k，如果你能支付給我 #b1000#k 楓幣，我就載你去。\r\n"+display);
			
		} else if(status == 1) {
			 if(cm.getMeso() < 1000) {
				cm.sendNext("嗯... 你確定你有 #b1000#k 楓幣嗎? 我也是要生活的，畢竟大家出來都是要混口飯吃...");
				cm.dispose();
			} else {
				var em = cm.getEventManager("EreveShip");
				cm.gainMeso(-1000);
				em.setProperty(cm.getPlayer().getName(), "Ereve_VictoriaIsland");
				em.startInstance(cm.getPlayer());
				cm.dispose();
			}
		}
	}
}