function start() {
    if(cm.haveItem(4031047)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("你要前往魔法森林嗎?");
        else{
            cm.sendOk("前往魔法森林的飛船已經出發了，請耐心等待下一班次。");
            cm.dispose();
        }
    }else{
        cm.sendOk("再次確認是否持有前往魔法森林的船票!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
	if (mode <= 0) {
		cm.sendOk("如果你改變主意了再來找我就可以了!");
		cm.dispose();
		return;
    }
    cm.gainItem(4031047, -1);
    cm.warp(200000112);
    cm.dispose();
}