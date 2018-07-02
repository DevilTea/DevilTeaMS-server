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
/* Author: Xterminator
	NPC Name: 		Shanks
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
cm.sendYesNo("搭乘這艘船可以前往更大的陸地。花費 #e150 楓幣#n, 我會帶你去 #b維多利亞島#k 但是只要你離開了就回不來囉~ 怎麼樣 要去嗎?");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0 && type != 1)
            status -= 2;
        else if(type == 1 || (mode == -1 && type != 1)){
            if(mode == 0)
                cm.sendOk("呃... 我猜你在這還有事要處理?");
            cm.dispose();
            return;
        }
    }
    if (status == 1) {
        if (cm.haveItem(4031801))
            cm.sendNext("好喔 現在給我150 楓幣... 那是什麼?看來你你就是路卡斯推薦的冒險者啊! 你該早點告訴我的~看來你事背受期待的冒險家呢，那我就不收你錢了 好好加油吧!!!");
        else
            cm.sendNext("覺得這裡很無聊嗎? 來... 先給我 #e150 楓幣#n...");
    } else if (status == 2) {
        if (cm.haveItem(4031801))
            cm.sendNextPrev("因為你被推薦所以免費~~!");
        else
        if (cm.getLevel() > 6) {
            if (cm.getMeso() < 150) {
                cm.sendOk("你他媽的跟我說你沒有 150 楓幣?低能?...");
                cm.dispose();
            } else
                cm.sendNext("棒! #e150#n 楓幣 有了! 走囉~#b維多利亞島#k!");
        } else {
		cm.sendOk("讓我看看... 我覺得你還是個菜逼八 你至少要200等才能離開阿");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801))
            cm.gainItem(4031801, -1);
        cm.warp(2010000);
        cm.dispose();
    }
}