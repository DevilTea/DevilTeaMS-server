/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100004 Kiru (To Orbis)

-------Credits:-------------------------------------------------------------------
	*MapleSanta 
----------------------------------------------------------------------------------
**/
var menu = new Array("Orbis");
var method;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        } else if (mode == 0) {
            cm.sendNext("好吧，如果你改變想法了再來找我吧。");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            for (var i = 0; i < menu.length; i++) {
                var display = "\r\n#L" + i + "##b 我要去天空之城 (1000 楓幣)#k";
            }
            cm.sendSimple("嗯... 今天的風很適合出航。 你想要從耶雷弗離開前往別的地方嗎? 這艘船專門航向#b天空之城#k在耶雷弗的事物都處理完了嗎? 如果你要前往 #b天空之城#k 我可以帶你去，你要去嗎?\r\n" + display);

        } else if (status == 1) {
            if (cm.getMeso() < 1000) {
                cm.sendNext("嗯... 你確定你有 #b1000#k 楓幣嗎? 我也是要生活的，畢竟大家出來都是要混口飯吃...");
                cm.dispose();
            } else {
                var em = cm.getEventManager("EreveShip");
				cm.gainMeso(-1000);
				em.setProperty(cm.getPlayer().getName(), "Ereve_Orbis");
				em.startInstance(cm.getPlayer());
				cm.dispose();
            }
        }
    }
}