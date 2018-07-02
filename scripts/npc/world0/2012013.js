function start() {
    if(cm.haveItem(4031074)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你要前往玩具城嗎?");
        } else {
            cm.sendOk("前往玩具城的火車已經出發了，請耐心等待下一班次。");
            cm.dispose();
        }
    } else {
        cm.sendOk("再次確認是否持有前往玩具城的船車!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
		cm.sendOk("如果你改變主意了再來找我就可以了!");
        cm.dispose();
		return;
    } 
    cm.gainItem(4031074, -1);
    cm.warp(200000122);
    cm.dispose();
}