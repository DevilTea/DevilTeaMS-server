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

/* Regular Cab */

var status = 0;
var maps = [104000000, 102000000, 101000000, 103000000, 120000000];
var cost = [800, 1200, 1000, 1000, 800];
var selectedMap = -1;

function start() {
    cm.sendNext("���o!�ڬO#b���h�Q�Ȯq#k���p�{��!�A�Q�h���̩O?");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("�٦��Ʊ��n�B�z��?�S���Y�n�f�p�{�����ܦb�ӧ�ڧa!");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            var selStr = "";
            if (cm.getJobId() == 0)
                selStr += "�ڭ̹���ߪ̦��W���u�f������!";
            selStr += "��ܧA���ت��a#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + " ����)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("�A�n�e��#b#m" + maps[selection] + "##k�F��? �����|��O#b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + " ����#k.");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getMeso() < (cm.getJobId() == 0 ? cost[selectedMap] / 10 : cost[selectedMap])) {
                cm.sendNext("�A���W������������!");
                cm.dispose();
                return;
            }
			cm.getPlayer().gainMeso(-(cm.getJobId() == 0 ? cost[selectedMap] / 10 : cost[selectedMap]), true, false, true);
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}