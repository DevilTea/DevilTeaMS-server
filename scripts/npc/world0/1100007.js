/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100007 Kiriru (Victoria Island Station to Ereve)

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
			cm.sendNext("�A��o��ƨS������ڡA�n�a...");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			for(var i=0; i < menu.length; i++) {
				var display = "\r\n#L"+i+"##b �ڭn�h�C�p�� (1000 ����)#k";
			}			
			cm.sendSimple("�c... �ҥH... ��... �A�Q�n���}���h�Q�Ȯq�h�O���ϰ�? �A�i�H�f�o����h #b�C�p��#k�C�b���̡A�A�|�ݨ���G�������Ӧb���l�W�A�÷P����ŬX���L���C ���̤]�O���~�M���մ��k�Ӫ��Ҧb�B�C �A�n�h�C�p����? �ɶ����ܤj���n#b30���k#k�M��A�ݭn��I #b1000#k ����\r\n"+display);
			
		} else if(status == 1) {
			if(cm.getMeso() < 1000) {
				cm.sendNext("��... �A�T�w�A�� #b1000#k ������? �ڤ]�O�n�ͬ����A�����j�a�X�ӳ��O�n�V�f���Y...");
				cm.dispose();
			} else {
				var em = cm.getEventManager("EreveShip");
				cm.gainMeso(-1000);
				em.setProperty(cm.getPlayer().getName(), "VictoriaIsland_Ereve");
				em.startInstance(cm.getPlayer());
				cm.dispose();
			}
		}
	}
}