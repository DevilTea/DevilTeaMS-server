function start() {
    if(cm.haveItem(4031047)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("璶玡┕臸猭此狶盾?");
        else{
            cm.sendOk("玡┕臸猭此狶差竒祇叫瑻み单痁Ω");
            cm.dispose();
        }
    }else{
        cm.sendOk("Ω絋粄琌Τ玡┕臸猭此狶差布!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
	if (mode <= 0) {
		cm.sendOk("狦э跑種ㄓти碞!");
		cm.dispose();
		return;
    }
    cm.gainItem(4031047, -1);
    cm.warp(200000112);
    cm.dispose();
}