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
@	NPC = Yellow Balloon
@	Map = Hidden-Street <Stage 3>
@	NPC MapId = 922010300
@	Function = LPQ - 3rd Stage
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
    } else if (mode == 0) {
        cm.dispose();//No
    } else {//Regular Talk
        if (mode == 1)
            status++;
        else
            status--;
        var eim = cm.getPlayer().getEventInstance();
        var nthtext = "3rd";
        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            gaveItems = eim.getProperty("leader" + nthtext + "gaveItems");
            if (preamble == null) {
                cm.sendNext("你們好，歡迎來到第三關，請擊破地圖上的箱子並消滅所有怪物來蒐集32張#i4001022##b#t4001022##k後，由隊長來與我對話。");
                eim.setProperty("leader" + nthtext + "preamble","done");
                cm.dispose();
            } else {
                if (!isLeader()) {
                    if (gaveItems == null) {
                        cm.sendOk("請隊長來與我對話。");
                        cm.dispose();
                    } else {
                        cm.sendOk("傳送門已經開啟，請趕快前往下一關卡!");
                        cm.dispose();
                    }
                } else {
                    if (gaveItems == null) {
                        if(cm.getPlayer().getMap().getCharacters().size() != eim.getPlayers().size()) {
							cm.sendOk("請等待所有隊員都回到這裡。");
							cm.dispose();
                        } else if (cm.itemQuantity(4001022) >= 32 || cm.getPlayer().isGM()) {
                            cm.sendOk("很好! 你們成功蒐集了 32張#b#t4001022##k!");
                        } else {
                            cm.sendOk("你們還沒蒐集完 32張#b#t4001022##k喔!");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("傳送門已經開啟，請趕快前往下一關卡!");
                        cm.dispose();
                    }
                }
            }
        } else if (status == 1) {
			cm.sendOk("傳送門已經開啟，請趕快前往下一關卡!");
            
			var map = eim.getMapInstance(cm.getPlayer().getMapId());
			map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
			map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
			map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));
	
			cm.removeAll(4001022);
            cm.givePartyExp("LudiPQ3rd");
            eim.setProperty("3stageclear","true");
            eim.setProperty("leader" + nthtext + "gaveItems","done");
            cm.dispose();
        }
    }
}

function isLeader(){
    if (cm.getParty() == null)
        return false;
    else
        return cm.isLeader();
}
