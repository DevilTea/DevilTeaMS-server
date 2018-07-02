function start() {
    if(cm.haveItem(4031576)){
        var em = cm.getEventManager("Genie");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你要前往納西沙漠嗎?");
        } else {
            cm.sendOk("前往納西沙漠的神燈精靈已經出發了，請耐心等待下一班次。");
            cm.dispose();
        }
    } else {
        cm.sendOk("再次確認是否持有前往納西沙漠的船票!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("如果你改變主意了再來找我就可以了!");
        cm.dispose();
	return;
    } 
    cm.gainItem(4031576, -1);
    cm.warp(200000152);
    cm.dispose();
}