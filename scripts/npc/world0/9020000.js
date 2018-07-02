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
	Lakelis - Victoria Road: Kerning City (103000000)
-- By ---------------------------------------------------------------------------------------------
	Stereo
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

var status;
var minLevel = 21;
var maxLevel = 200;
var minPlayers = 1;
var maxPlayers = 6;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (cm.getParty() == null) { // No Party
            cm.sendOk("#e#b<組隊任務 : 第一次同行>\r\n\r\n#n#k要不要和隊伍的夥伴們一起挑戰任務? 在這你會遭遇到一些不靠良好團隊合作就無法解決的障礙。 如果想要試試看的話，就請你們的#b隊長#k來和我談話。");
            cm.dispose();
        } else if (!cm.isLeader()) { // Not Party Leader
            cm.sendOk("如果想要試試看的話，就請你們的#b隊長#k來和我談話。");
            cm.dispose();
        } else {
            cm.sendNext("你就是隊長嗎?第一次同行祝你們幸運!");
        }
    } else if(status == 1) {
		var party = cm.getParty().getMembers();
		var inMap = cm.partyMembersInMap();
		var levelValid = 0;
		for (var i = 0; i < party.size(); i++) {
			if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel)
				levelValid++;
		}
		if (inMap < minPlayers || inMap > maxPlayers) {
			cm.sendOk("你的隊伍合格人數不足#r" + minPlayers + "人#k 請確認你的隊伍中所有人都符合參加的資格");
			cm.dispose();
		} else if (levelValid != inMap) {
			cm.sendOk("請確認你的隊伍中所有人都符合參加的資格 這項任務的參加資格 : \r\n等級範圍 "+minLevel+" ~ "+maxLevel+"\r\n#b" + levelValid + "#k 位成員符合資格");
			cm.dispose();
		} else {
			var em = cm.getEventManager("KerningPQ");
			if (em == null) {
				cm.sendOk("目前無法進行此任務");
			} else {
				em.startInstance(cm.getParty(), cm.getPlayer().getMap());
				party = cm.getParty();
				cm.removePartyItems(4001008);
				cm.removePartyItems(4001007);
			}
			/*else if (em.getProperty("KPQOpen").equals("true")) {
				// Begin the PQ.
				em.startInstance(cm.getParty(), cm.getPlayer().getMap());
				party = cm.getParty();
				cm.removePartyItems(4001008);
				cm.removePartyItems(4001007);
				em.setProperty("KPQOpen" , "false");
			} else {
				cm.sendNext("已經有其他隊伍正在挑戰，請稍後再試!");
			}*/
			cm.dispose();
		}
	}
}