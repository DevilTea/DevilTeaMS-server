function start() {
    if(cm.haveItem(4031331)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("�A�n�e���������?");
        } else {
            cm.sendOk("�e�������������w�g�X�o�F�A�Э@�ߵ��ݤU�@�Z���C");
            cm.dispose();
        }
    } else {
        cm.sendOk("�A���T�{�O�_�����e����������!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�p�G�A���ܥD�N�F�A�ӧ�ڴN�i�H�F!");
        cm.dispose();
	return;
    } 
    cm.gainItem(4031331, -1);
    cm.warp(200000132);
    cm.dispose();
}