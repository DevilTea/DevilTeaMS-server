function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你要前往天空之城嗎?");
        } else {
            cm.sendOk("前往天空之城的飛船已經出發了，請耐心等待下一班次。");
            cm.dispose();
        }
    } else {
        cm.sendOk("再次確認是否持有前往天空之城的船票!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("如果你改變主意了再來找我就可以了!");
        cm.dispose();
	return;
    } 
    cm.gainItem(4031045, -1);
    cm.warp(240000111);
    cm.dispose();
}