/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100003 Kiriru (To Victoria Island From Ereve)

-------Credits:-------------------------------------------------------------------
	*MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("�ڭn�h���h�Q�Ȯq");
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
			cm.sendNext("�A��o��ƨS������ڡA�n�a...");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			for(var i=0; i < menu.length; i++) {
				var display = "\r\n#L"+i+"##b �ڭn�h���h�Q�Ȯq (1000 ����)#k";
			}			
			cm.sendSimple("�c �S�A�����F... �A�n�q�C�p�����}��O���a���? �p�G�O���ܧA�i���H�F �ڱM����H�q#b�C�p��#k����#b���h�Q�Ȯq#k�A�p�G�A���I���� #b1000#k �����A�ڴN���A�h�C\r\n"+display);
			
		} else if(status == 1) {
			 if(cm.getMeso() < 1000) {
				cm.sendNext("��... �A�T�w�A�� #b1000#k ������? �ڤ]�O�n�ͬ����A�����j�a�X�ӳ��O�n�V�f���Y...");
				cm.dispose();
			} else {
				var em = cm.getEventManager("EreveShip");
				cm.gainMeso(-1000);
				em.setProperty(cm.getPlayer().getName(), "Ereve_VictoriaIsland");
				em.startInstance(cm.getPlayer());
				cm.dispose();
			}
		}
	}
}