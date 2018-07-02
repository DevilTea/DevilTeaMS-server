var ticket = new Array(4031047, 4031074, 4031331, 4031576);
var cost = new Array(5000, 6000, 30000, 6000);
var mapNames = new Array("魔法森林-維多利亞島", "玩具城", "神木村", "納西沙漠");
var mapName2 = new Array("Ellinia of Victoria Island", "Ludibrium", "Leafre of Minar Forest", "Nihal Desert");
var select;
var status = 0;

function start() {
    var where = "你好，我是販售前往各地的交通工具的售票員，你要購買前往何處的票券?";
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
            cm.sendYesNo("前往 #b" + mapNames[select] + "#k 的班次為約每 " + (select == 0 ? 3 : 1) + " 分鐘一班，將會花費你 #b"+cost[select]+" 楓幣#k。你確定要購買 #b#i"+ticket[select]+"##t"+ticket[select]+"##k嗎?");
        } else if(status == 2) {
            if (cm.getMeso() < cost[select] || !cm.canHold(ticket[select]))
                cm.sendOk("你確定你有 #b"+cost[select]+" 楓幣嗎#k? 如果楓幣足夠的話那就檢查一下背包是不是有足夠的空間。");
            else {
                cm.gainMeso(-cost[select]);
                cm.gainItem(ticket[select],1);
            }
            cm.dispose();
        }
    }
}
