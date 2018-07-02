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
/* Author: Xterminator (Modified by XxOsirisxX)
	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
*/
importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(type == 1 && mode == 0)
            status -= 2;
        else{
            qm.dispose();
            return;
        }
    }
    if (status == 0)
        qm.sendNext("嘿!那邊的新手 過來過來! 我是能夠教導你們很多資訊的#b羅傑#k~");
    else if (status == 1)
        qm.sendNextPrev("你問是誰要我這樣做? ㄏㄏㄏㄏㄏㄏ!\r\我自己! 我只是想照顧一下你們這些新手而已~");
    else if (status == 2)
qm.sendAcceptDecline("所以..... 讓我開個玩笑! 野-格-炸-彈~!");
    else if (status == 3) {
        if (qm.c.getPlayer().getHp() >= 50) {
            qm.c.getPlayer().setHp(25);
            qm.c.getPlayer().updateSingleStat(MapleStat.HP, 25);
        }
        if (!qm.haveItem(2010007))
            qm.gainItem(2010007, 1);
            qm.forceStartQuest();
            qm.sendNext("嚇到了嗎? 如果你的#bHP#k變成0那就糟了。 現在我給你這個 #r羅傑的老二#k。 請把它吃掉 你就會恢復了 打開你的的道具欄切換到消耗欄然後吃掉它 在鍵盤上的#rI鍵#k 應該很容易吧?");
    } else if (status == 4) {
        qm.sendNextPrev("請把所有#r羅傑的老二#k都吞下去 你會發現興奮值大幅上升ㄏ 請等HP變為100%再來與我對話");
    } else if (status == 5) {
	qm.showInfo("UI/tutorial.img/28");
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(type == 1 && mode == 0)
            status -= 2;
        else{
            qm.dispose();
            return;
        }
    }
    if (status == 0)
        if (qm.c.getPlayer().getHp() < 50) {
            qm.sendNext("嘿, 你眼殘嗎 血量有滿嗎 黑人問號? 你確定你有把#r羅傑的老二#k都吞下去嗎?");
            qm.dispose();
        } else
            qm.sendNext("使用消耗品真是輕鬆簡單呢，對嗎? 你可以在右邊欄位設定#b快捷鍵#k 你不知道對吧?ㄏㄏㄏㄏㄏ");
    else if (status == 1)
        qm.sendNextPrev("好吧! 現在你已經學到很多了 讓我賣你個人情吧~ 這些技巧肯定會在你緊急時派上用場的");
    else if (status == 2)
        qm.sendNextPrev("好了! 這些就是我能教你的所有東西了，是時候要說再見了 好好保重啊我的朋友!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
    else if (status == 3) {
        if(qm.isQuestCompleted(1021))
            qm.dropMessage(1,"Unknown Error");
        else if(qm.canHold(2010000) && qm.canHold(2010009)){
            qm.gainExp(10);
            qm.gainItem(2010000, 3);
            qm.gainItem(2010009, 3);
            qm.forceCompleteQuest();
        }else
            qm.dropMessage(1,"你的背包滿了");
        qm.dispose();
    }
}