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
@	NPC = Sky-Blue Balloon
@	Map = Hidden-Street <Stage 7>
@	NPC MapId = 922010700
@	Function = LPQ - 7 Stage
@
@	Description: You need a ranged person here. The ranged person must kill the three Ratz, and they'll trigger something. What's next is for you to find out! Get me 3 passes!
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
        cm.dispose();
    }else if (mode == 0){
        cm.dispose();
    }else{
        if (mode == 1)
            status++;
        else
            status--;
        var eim = cm.getPlayer().getEventInstance();
        var nthtext = "7th";
        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            gaveItems = eim.getProperty("leader" + nthtext + "gaveItems");
            if (preamble == null) {
                cm.sendOk("�A�̦n�A�w��Ө�ĤC���A�o���ݭn�ܤ֤@�컷�Z���������_�I�̡A�o�ǻ��Z���������_�I�a�ݭn�����b�ﭱ���x���Ǫ��A�������N�|Ĳ�o�@�Ǿ����C�|�o�ͤ���Ʊ��n�A�̦ۤv�h�M��F! �`��3�i#b#t4001022#��Ѷ����ӻP�ڹ��!");
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
                } else {
					if(gaveItems == null){
						cm.sendSimple("���F?\r\n#L0#�ڱa�ӧA����#b#t4001022##k�F"); // #L1#There's something wrong here.#l
					} else {
						cm.sendOk("�ǰe���w�g�}�ҡA�л��֫e���U�@���d!");
						cm.dispose();
					}
				}
            }
        }else if (status == 1) {
            if (selection == 0) {
                if(cm.getPlayer().getMap().getCharacters().size() != eim.getPlayers().size()) {
					cm.sendOk("�е��ݩҦ��������^��o�̡C");
					cm.dispose();
                } else if(cm.itemQuantity(4001022) >= 3 || cm.getPlayer().isGM()) {
                    cm.sendOk("�ܦn! �A�̦��\�`���F 3�i#b#t4001022##k!");
                } else {
                    cm.sendOk("�A���٨S�`���� 3�i#b#t4001022##k��!");
                    cm.dispose();
                }
            }/* else if (selection == 1) {
                if (cm.mapMobCount()==0) {
                    cm.sendOk("Good job! You've killed all the Rombards!");
                }else{
                    cm.sendOk("What are you talking about? Kill those Rombards!");
                    cm.dispose();
                }
            }*/
        }else if (status == 2){
            cm.sendOk("�ǰe���w�g�}�ҡA�л��֫e���U�@���d!");
			
			var map = eim.getMapInstance(cm.getPlayer().getMapId());
			map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
			map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
			map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));
			
            cm.removeAll(4001022);
            cm.givePartyExp("LudiPQ7th");
            eim.setProperty("7stageclear","true");
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