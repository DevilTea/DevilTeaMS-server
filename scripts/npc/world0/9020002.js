/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Nella - Hidden Street : 1st Accompaniment
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status;

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection){
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    var mapId = cm.getPlayer().getMapId();
    if (mapId == 103000890) {
        if (status == 0) {
            cm.sendNext("下次再見");
        } else {
			cm.getPlayer().changeMap(103000000, "mid00");
            //cm.getPlayer().changeMap(103000000, cm.getClient().getChannelServer().getMapFactory().getMap(103000000).getRandomSpawnpoint());
            cm.removeAll(4001007);
            cm.removeAll(4001008);
            cm.dispose();
        }
    } else {
        if (status == 0) {
            var outText = "只要你一放棄，下次就要從頭開始。  你仍要離開嗎?";
            if (mapId == 103000805) {
                outText = "你要離開了嗎?";
            }
            cm.sendYesNo(outText);
        } else if (mode == 1) {
            var eim = cm.getPlayer().getEventInstance(); // Remove them from the PQ!
            if (eim == null)
                cm.warp(103000890, "mid00"); // Warp player
            else if (cm.isLeader()) {
                //cm.getEventManager("KerningPQ").setProperty("KPQOpen" , "true");
                eim.disbandParty();
            }
            else
                eim.leftParty(cm.getPlayer());
            cm.dispose();
        }
    }
}