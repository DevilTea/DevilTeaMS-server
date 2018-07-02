var status = -1;
var sel;

var destinations = new Array("魔法森林-維多利亞島", "玩具城", "神木村", "武陵桃園", "納西沙漠", "耶雷弗");

function start() {
	var message = "天空之城站有著許多前往世界各地站台的通道，你需要選擇前往目的地的通道，你要選擇哪個目的地?\r\n";
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
        cm.sendNext("好的#b#h ##k我現在就帶你到 #b#m" + (200000110 + (sel * 10)) + "#");
	}else if (status == 1) {
        cm.warp(200000110 + (sel * 10));
        cm.dispose();
    }
}