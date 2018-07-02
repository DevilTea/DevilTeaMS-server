/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
@	Author : Raz
@
@	NPC = Orange Balloon
@	Map = Hidden-Street <Stage 2>
@	NPC MapId = 922010200
@	Function = LPQ - 2nd Stage
@
*/

importPackage(Packages.tools);

var status = 0;
var party;
var preamble;
var gaveItems;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();//ExitChat
    }else if (mode == 0){
        cm.dispose();//No
    }else{		    //Regular Talk
        if (mode == 1)
            status++;
        else
            status--;
        var eim = cm.getPlayer().getEventInstance();
        var nthtext = "2nd";
        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            gaveItems = eim.getProperty("leader" + nthtext + "gaveItems");
            if (preamble == null) {
                cm.sendNext("�A�̦n�A�w��Ө�ĤG���A�����}�a�ϤW���c�l�û`��15�i#i4001022##b#t4001022##k��A�Ѷ����ӻP�ڹ�ܡC");
                eim.setProperty("leader" + nthtext + "preamble","done");
                cm.dispose();
            }else{
                if(!isLeader()){
                    if(gaveItems == null){
                        cm.sendOk("�ж����ӻP�ڹ�ܡC");
                        cm.dispose();
                    }else{
                        cm.sendOk("�ǰe���w�g�}�ҡA�л��֫e���U�@���d!");
                        cm.dispose();
                    }
                }else{
                    if(gaveItems == null){
                        if(cm.getPlayer().getMap().getCharacters().size() != eim.getPlayers().size()) {
							cm.sendOk("�е��ݩҦ��������^��o�̡C");
							cm.dispose();
                        } else if(cm.itemQuantity(4001022) >= 15 || cm.getPlayer().isGM()){
                            cm.sendOk("�ܦn! �A�̦��\�`���F 15�i#b#t4001022##k!");
                        }else{
                            cm.sendOk("�A���٨S�`���� 15�i#b#t4001022##k��!");
                            cm.dispose();
                        }
                    }else{
                        cm.sendOk("�ǰe���w�g�}�ҡA�л��֫e���U�@���d!");
                        cm.dispose();
                    }
                }
            }
        }else if (status == 1){
			cm.sendOk("�ǰe���w�g�}�ҡA�л��֫e���U�@���d!");
			var map = eim.getMapInstance(cm.getPlayer().getMapId());
			map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
			map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
			map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));
			
			cm.removeAll(4001022);
            cm.givePartyExp("LudiPQ2nd");
            eim.setProperty("2stageclear","true");
            eim.setProperty("leader" + nthtext + "gaveItems","done");
            cm.dispose();
        }
    }
}


function isLeader(){
    if(cm.getParty() == null)
        return false;
    else
        return cm.isLeader();
}