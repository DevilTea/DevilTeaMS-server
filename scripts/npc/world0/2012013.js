function start() {
    if(cm.haveItem(4031074)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("�A�n�e�����㫰��?");
        } else {
            cm.sendOk("�e�����㫰�������w�g�X�o�F�A�Э@�ߵ��ݤU�@�Z���C");
            cm.dispose();
        }
    } else {
        cm.sendOk("�A���T�{�O�_�����e�����㫰���!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
		cm.sendOk("�p�G�A���ܥD�N�F�A�ӧ�ڴN�i�H�F!");
        cm.dispose();
		return;
    } 
    cm.gainItem(4031074, -1);
    cm.warp(200000122);
    cm.dispose();
}