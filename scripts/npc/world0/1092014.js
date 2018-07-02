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

/*
--- JavaScript ---
Natilus' Port Taxi

-- By --
Cody

-- Version --
0.62+
*/

//GMS Maps+Prices
var status = 0;
var maps = Array(104000000, 102000000, 100000000, 103000000, 101000000);
var cost = Array(1000, 1200, 800, 1000, 800);
var selectedMap = -1;

function start() {
    cm.sendNext("哈囉!我是#b維多利亞島#k的計程車!你想去哪裡呢?");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("還有事情要處理嗎?沒關係要搭計程車的話在來找我吧!");
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
                selStr += "我們對於初心者有超級優惠的價格!";
            selStr += "選擇你的目的地#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + " 楓幣)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("你要前往#b#m" + maps[selection] + "##k了嗎? 為此會花費#b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + " 楓幣#k.");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getMeso() < (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection])) {
                cm.sendNext("你身上的楓幣不足唷!");
                cm.dispose();
                return;
            }
			cm.getPlayer().gainMeso(-(cm.getJobId() == 0 ? cost[selectedMap] / 10 : cost[selectedMap]), true, false, true);
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}