var status = 0;
var cost = 5000;

function start() {
    cm.sendYesNo("�A�n�A�ڬO�c�⭸���ѪŤ�������Ⲽ���C�j���C3�����|���@�Z����A�A�|�ݭn��O #b"+cost+" ����#k�C�A�T�w�n�ʶR #b#i4031045##t4031045##k?");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 0) {
            cm.sendNext("�A�@�w�٦��ƶ��n�d�b�o�B�z�A��a?");
            cm.dispose();
            return;
        }
        status++;
        if(status == 1) {
            if (cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
                cm.dispose();
            } else {
                cm.sendOk("�A�T�w�A�� #b"+cost+" ������#k? �p�G�����������ܨ��N�ˬd�@�U�I�]�O���O���������Ŷ��C");
                cm.dispose();
            }
        }
    }
}
