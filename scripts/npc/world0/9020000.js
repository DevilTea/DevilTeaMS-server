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
            cm.sendOk("#e#b<�ն����� : �Ĥ@���P��>\r\n\r\n#n#k�n���n�M����٦�̤@�_�D�ԥ���? �b�o�A�|�D�J��@�Ǥ��a�}�n�ζ��X�@�N�L�k�ѨM����ê�C �p�G�Q�n�ոլݪ��ܡA�N�ЧA�̪�#b����#k�өM�ڽ͸ܡC");
            cm.dispose();
        } else if (!cm.isLeader()) { // Not Party Leader
            cm.sendOk("�p�G�Q�n�ոլݪ��ܡA�N�ЧA�̪�#b����#k�өM�ڽ͸ܡC");
            cm.dispose();
        } else {
            cm.sendNext("�A�N�O������?�Ĥ@���P�毬�A�̩��B!");
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
			cm.sendOk("�A������X��H�Ƥ���#r" + minPlayers + "�H#k �нT�{�A������Ҧ��H���ŦX�ѥ[�����");
			cm.dispose();
		} else if (levelValid != inMap) {
			cm.sendOk("�нT�{�A������Ҧ��H���ŦX�ѥ[����� �o�����Ȫ��ѥ[��� : \r\n���Žd�� "+minLevel+" ~ "+maxLevel+"\r\n#b" + levelValid + "#k �즨���ŦX���");
			cm.dispose();
		} else {
			var em = cm.getEventManager("KerningPQ");
			if (em == null) {
				cm.sendOk("�ثe�L�k�i�榹����");
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
				cm.sendNext("�w�g����L����b�D�ԡA�еy��A��!");
			}*/
			cm.dispose();
		}
	}
}