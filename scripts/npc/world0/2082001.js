function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("�A�n�e���ѪŤ�����?");
        } else {
            cm.sendOk("�e���ѪŤ���������w�g�X�o�F�A�Э@�ߵ��ݤU�@�Z���C");
            cm.dispose();
        }
    } else {
        cm.sendOk("�A���T�{�O�_�����e���ѪŤ������!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�p�G�A���ܥD�N�F�A�ӧ�ڴN�i�H�F!");
        cm.dispose();
	return;
    } 
    cm.gainItem(4031045, -1);
    cm.warp(240000111);
    cm.dispose();
}