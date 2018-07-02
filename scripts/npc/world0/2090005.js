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

var menu = new Array("�Z�����","�ѪŤ���","�F�Ĥ۹�","�Z�����");
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
            cm.sendNext("�p�G�A���ܥD�N�F�A�ӧ�ڴN�i�H�F!");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            for(var i=0; i < menu.length; i++) {
                if(cm.getPlayer().getMapId() == 200000141 && i < 1) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" ����)#k";
                } else if(cm.getPlayer().getMapId() == 250000100 && i > 0 && i < 3) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" ����)#k";
                }
            }
            if(cm.getPlayer().getMapId() == 200000141 || cm.getPlayer().getMapId() == 251000000) {
                btwmsg = "#b�ѪŤ���#k �� #b�Z�����#k";
            } else if(cm.getPlayer().getMapId() == 250000100) {
                btwmsg = "#bb�Z�����#k �� #�ѪŤ���#k";
            }
            if(cm.getPlayer().getMapId() == 251000000) {
                cm.sendYesNo("�A�n�A�n���n���իe������Ȧ�? �ڤw�g���L�n�h���A�@�˪��Ȧ�̥h #b"+menu[3]+"#k �A�A�������? ���M��������@��í�w�A���ڥi�H��ֳt�a��F�ت��a�A�u�n�A���� #b"+cost[2]+" ����#k �ڴN���A�L�h");
            } else if(cm.getPlayer().getMapId() == 250000100) {
                cm.sendSimple("�A�n�A�n���n���իe������Ȧ�? �ڪ��D�θ}���|��ڥέ����٭n�x�� �ڤw�g���L�n�h���A�@�˪��Ȧ�̥h #b��L�ϰ�#k �A�A�������? ���ݭn���ܿ�ܧA�n�h���a��\r\n"+display);
            } else {
                cm.sendSimple("�A�n�A�n���n���իe������Ȧ�? �ڤw�g���L�n�h���A�@�˪��Ȧ�̥h #b��L�ϰ�#k �A�A�������? ���ݭn���ܿ�ܧA�n�h���a��\r\n"+display);
            }
        } else if(status == 1) {
            if(selection == 2) {
                cm.sendYesNo("�A�{�b�N�n�e�� #b"+menu[2]+"#k �F��? �p�G�A�� #b"+cost[2]+" ����#k�A�ڲ{�b�N�a�A�L�h");
            } else {
                if(cm.getMeso() < cost[selection]) {
                    cm.sendNext("�A�T�w�A��������������?");
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
                cm.sendNext("�A�T�w�A��������������?");
                cm.dispose();
            } else {
                cm.gainMeso(-cost[2]);
                cm.warp(251000000);
                cm.dispose();
            }
        }
    }
}  