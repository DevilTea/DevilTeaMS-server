function start() {
    if(cm.haveItem(4031047)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("�A�n�e���]�k�˪L��?");
        else{
            cm.sendOk("�e���]�k�˪L������w�g�X�o�F�A�Э@�ߵ��ݤU�@�Z���C");
            cm.dispose();
        }
    }else{
        cm.sendOk("�A���T�{�O�_�����e���]�k�˪L���!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
	if (mode <= 0) {
		cm.sendOk("�p�G�A���ܥD�N�F�A�ӧ�ڴN�i�H�F!");
		cm.dispose();
		return;
    }
    cm.gainItem(4031047, -1);
    cm.warp(200000112);
    cm.dispose();
}