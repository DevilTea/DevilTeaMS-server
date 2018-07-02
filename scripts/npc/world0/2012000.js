var ticket = new Array(4031047, 4031074, 4031331, 4031576);
var cost = new Array(5000, 6000, 30000, 6000);
var mapNames = new Array("�]�k�˪L-���h�Q�Ȯq", "���㫰", "�����", "�Ǧ�F�z");
var mapName2 = new Array("Ellinia of Victoria Island", "Ludibrium", "Leafre of Minar Forest", "Nihal Desert");
var select;
var status = 0;

function start() {
    var where = "�A�n�A�ڬO�c��e���U�a����q�u�㪺�Ⲽ���A�A�n�ʶR�e����B������?";
    for (var i = 0; i < ticket.length; i++)
        where += "\r\n#L" + i + "##b" + mapNames[i] + "#k#l";
    cm.sendSimple(where);
}

function action(mode, type, selection) {
    if(mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            select = selection;
            cm.sendYesNo("�e�� #b" + mapNames[select] + "#k ���Z�������C " + (select == 0 ? 3 : 1) + " �����@�Z�A�N�|��O�A #b"+cost[select]+" ����#k�C�A�T�w�n�ʶR #b#i"+ticket[select]+"##t"+ticket[select]+"##k��?");
        } else if(status == 2) {
            if (cm.getMeso() < cost[select] || !cm.canHold(ticket[select]))
                cm.sendOk("�A�T�w�A�� #b"+cost[select]+" ������#k? �p�G�����������ܨ��N�ˬd�@�U�I�]�O���O���������Ŷ��C");
            else {
                cm.gainMeso(-cost[select]);
                cm.gainItem(ticket[select],1);
            }
            cm.dispose();
        }
    }
}
