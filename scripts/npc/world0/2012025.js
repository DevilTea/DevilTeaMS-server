function start() {
    if(cm.haveItem(4031576)){
        var em = cm.getEventManager("Genie");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("�A�n�e���Ǧ�F�z��?");
        } else {
            cm.sendOk("�e���Ǧ�F�z�����O���F�w�g�X�o�F�A�Э@�ߵ��ݤU�@�Z���C");
            cm.dispose();
        }
    } else {
        cm.sendOk("�A���T�{�O�_�����e���Ǧ�F�z���!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�p�G�A���ܥD�N�F�A�ӧ�ڴN�i�H�F!");
        cm.dispose();
	return;
    } 
    cm.gainItem(4031576, -1);
    cm.warp(200000152);
    cm.dispose();
}