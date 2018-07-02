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
@	Author : Twdtwd
@
@	NPC = Violet Balloon
@	Map = Hidden-Street <Crack on the Wall>
@	NPC MapId = 922010900
@	Function = LPQ - Last Stage
@
@	Description: Used after the boss is killed to trigger the bonus stage.
*/

importPackage(Packages.tools);

var status = 0;
var party;
var preamble;
var gaveItems;
var nthtext = "last";

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
        
        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            gaveItems = eim.getProperty("leader" + nthtext + "gaveItems");
            if (preamble == null) {
                cm.sendOk("�A�̦n�A�w��Ө�̫�@���A�����W�誺�¦�o�����|Ĳ�o�����l��X�y���ɪŵ��_�������A�����U�ڭ̮������A�è��o#i4001023##b#t4001023##k�Ѷ�����I����!");
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
                } else if(gaveItems == null){
                    cm.sendSimple("���F?\r\n#L0#�ڱa�ӧA����#b#t4001023##k�F!#l\r\n"); // #L1#There's something wrong here.#l
                } else {
					cm.dispose();
				}
            }
        }else if(status == 1){
            if (selection == 0) {
                if(cm.itemQuantity(4001023) >= 1) {
                    cm.sendOk("�Ӧn�F!�A�̦��\����#b#t4001023##k�F!");
                }else{
                    cm.sendOk("�A�٨S����#b#t4001023##k��?");
                    cm.dispose();
                }
            }
        } else if(status == 2) {
			var map = eim.getMapInstance(cm.getPlayer().getMapId());
			map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
			map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
			cm.removeAll(4001023);
            cm.givePartyExp("LudiPQLast");
            eim.setProperty("9stageclear","true");
            eim.setProperty("leader" + nthtext + "gaveItems","done");
			cm.sendOk("�u���ӷP�§A�̤F! ���U�ӬO���y�ɶ��A�{�b�ڴN��A�̰e�h���y�a�ϧa!")
		} else if(status == 3){
			eim.schedule("startBonus", 1000);
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