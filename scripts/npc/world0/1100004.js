/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100004 Kiru (To Orbis)

-------Credits:-------------------------------------------------------------------
	*MapleSanta 
----------------------------------------------------------------------------------
**/
var menu = new Array("Orbis");
var method;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        } else if (mode == 0) {
            cm.sendNext("�n�a�A�p�G�A���ܷQ�k�F�A�ӧ�ڧa�C");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            for (var i = 0; i < menu.length; i++) {
                var display = "\r\n#L" + i + "##b �ڭn�h�ѪŤ��� (1000 ����)#k";
            }
            cm.sendSimple("��... ���Ѫ����ܾA�X�X��C �A�Q�n�q�C�p�����}�e���O���a���? �o����M����V#b�ѪŤ���#k�b�C�p�����ƪ����B�z���F��? �p�G�A�n�e�� #b�ѪŤ���#k �ڥi�H�a�A�h�A�A�n�h��?\r\n" + display);

        } else if (status == 1) {
            if (cm.getMeso() < 1000) {
                cm.sendNext("��... �A�T�w�A�� #b1000#k ������? �ڤ]�O�n�ͬ����A�����j�a�X�ӳ��O�n�V�f���Y...");
                cm.dispose();
            } else {
                var em = cm.getEventManager("EreveShip");
				cm.gainMeso(-1000);
				em.setProperty(cm.getPlayer().getName(), "Ereve_Orbis");
				em.startInstance(cm.getPlayer());
				cm.dispose();
            }
        }
    }
}