/**
-- Odin JavaScript --------------------------------------------------------------------------------
    Hak - Cabin <To Mu Lung>(200000141) / Mu Lung Temple(250000100) / Herb Town(251000000)
-- By ---------------------------------------------------------------------------------------------
    Information
-- Version Info -----------------------------------------------------------------------------------
    1.1 - Text and statement fix [Information]
    1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var menu = new Array("武陵桃園","天空之城","靈藥幻境","武陵桃園");
var cost = new Array(1500,1500,500,1500);
var hak;
var display = "";
var btwmsg;
var method;


function start() {
    status = -1;
    hak = cm.getEventManager("Hak");
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
            cm.sendNext("如果你改變主意了再來找我就可以了!");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            for(var i=0; i < menu.length; i++) {
                if(cm.getPlayer().getMapId() == 200000141 && i < 1) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" 楓幣)#k";
                } else if(cm.getPlayer().getMapId() == 250000100 && i > 0 && i < 3) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" 楓幣)#k";
                }
            }
            if(cm.getPlayer().getMapId() == 200000141 || cm.getPlayer().getMapId() == 251000000) {
                btwmsg = "#b天空之城#k 到 #b武陵桃園#k";
            } else if(cm.getPlayer().getMapId() == 250000100) {
                btwmsg = "#bb武陵桃園#k 到 #天空之城#k";
            }
            if(cm.getPlayer().getMapId() == 251000000) {
                cm.sendYesNo("你好，要不要嘗試前往遠方旅行? 我已經載過好多像你一樣的旅行者去 #b"+menu[3]+"#k ，你有興趣嗎? 雖然不像飛船一樣穩定，但我可以更快速地抵達目的地，只要你給我 #b"+cost[2]+" 楓幣#k 我就載你過去");
            } else if(cm.getPlayer().getMapId() == 250000100) {
                cm.sendSimple("你好，要不要嘗試前往遠方旅行? 我知道用腳走會比我用飛的還要困難 我已經載過好多像你一樣的旅行者去 #b其他區域#k ，你有興趣嗎? 有需要的話選擇你要去的地方\r\n"+display);
            } else {
                cm.sendSimple("你好，要不要嘗試前往遠方旅行? 我已經載過好多像你一樣的旅行者去 #b其他區域#k ，你有興趣嗎? 有需要的話選擇你要去的地方\r\n"+display);
            }
        } else if(status == 1) {
            if(selection == 2) {
                cm.sendYesNo("你現在就要前往 #b"+menu[2]+"#k 了嗎? 如果你有 #b"+cost[2]+" 楓幣#k，我現在就帶你過去");
            } else {
                if(cm.getMeso() < cost[selection]) {
                    cm.sendNext("你確定你有足夠的楓幣嗎?");
                    cm.dispose();
                } else {
                    if(cm.getPlayer().getMapId() == 251000000) {
                        cm.gainMeso(-cost[2]);
                        cm.warp(250000100);
                        cm.dispose();
                    } else {
                        cm.gainMeso(-cost[selection]);
                        //hak.newInstance("Hak");
                        //hak.setProperty("player", cm.getPlayer().getName());
                        hak.startInstance(cm.getPlayer());
                        cm.dispose();
                    }
              }
            }
        } else if(status == 2) {
            if(cm.getMeso() < cost[2]) {
                cm.sendNext("你確定你有足夠的楓幣嗎?");
                cm.dispose();
            } else {
                cm.gainMeso(-cost[2]);
                cm.warp(251000000);
                cm.dispose();
            }
        }
    }
}  