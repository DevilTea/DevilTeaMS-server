var cost = 6000;
var status = 0;

function start() {
    cm.sendYesNo("你好，我是販售前往天空之城火車的售票員。大約每1分鐘會有一班火車，你會需要花費 #b"+cost+" 楓幣#k。你確定要購買 #b#i4031045##t4031045##k?");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 1)
            status++;
        if(mode == 0) {
            cm.sendNext("你一定還有事項要留在這處理，對吧?");
            cm.dispose();
            return;
        }
        if(status == 1) {
            if(cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
            } else
                cm.sendOk("你確定你有 #b"+cost+" 楓幣嗎#k? 如果楓幣足夠的話那就檢查一下背包是不是有足夠的空間。");
            cm.dispose();
        }
    }
}