var status = -1;
var sel;

var destinations = new Array("�]�k�˪L-���h�Q�Ȯq", "���㫰", "�����", "�Z�����", "�Ǧ�F�z", "�C�p��");

function start() {
	var message = "�ѪŤ��������۳\�h�e���@�ɦU�a���x���q�D�A�A�ݭn��ܫe���ت��a���q�D�A�A�n��ܭ��ӥت��a?\r\n";
	for(var i = 0; i < destinations.length; i++){
		message += "\r\n#L" + i + "##b" + destinations[i] + "#l";
	}
	cm.sendSimple(message);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 0){
        sel = selection;
        cm.sendNext("�n��#b#h ##k�ڲ{�b�N�a�A�� #b#m" + (200000110 + (sel * 10)) + "#");
	}else if (status == 1) {
        cm.warp(200000110 + (sel * 10));
        cm.dispose();
    }
}