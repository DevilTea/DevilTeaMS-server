/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100008 Kiru (Orbis Station)

-------Credits:-------------------------------------------------------------------
	*MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Ereve");
var method;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		if(mode == 0 && status == 0) {
			cm.dispose();
			return;
		} else if(mode == 0) {
			cm.sendNext("�n�a�A�p�G�A���ܷQ�k�F�A�ӧ�ڧa�C");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			for(var i=0; i < menu.length; i++) {
				var display = "\r\n#L"+i+"##b �ڭn�h�C�p�� (1000 ����)#k";
			}			
			cm.sendSimple("�o����N�¦V#b�C�p��#k�A�A�|�o�{�`���⪺���l�b�����U�A���X���L���ƹL�F�ˬy�A�٦����մ��k�ӡC �p�G�A��[�J�Ӯa�M�h�Φ����쪺�ܡA����n�h���[�@�U�C �A������n��C�p���ݬݶ�? ����ȵ{�N�n��O #b1000#k ����\r\n"+display);
			
		} else if(status == 1) {
			if(cm.getMeso() < 1000) {
				cm.sendNext("��... �A�T�w�A�� #b1000#k ������? �ڤ]�O�n�ͬ����A�����j�a�X�ӳ��O�n�V�f���Y...");
				cm.dispose();
			} else {
				var em = cm.getEventManager("EreveShip");
				cm.gainMeso(-1000);
				em.setProperty(cm.getPlayer().getName(), "Orbis_Ereve");
				em.startInstance(cm.getPlayer());
				cm.dispose();
			}
		}
	}
}