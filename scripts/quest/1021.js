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
        qm.sendNext("�K!���䪺�s�� �L�ӹL��! �ڬO����оɧA�̫ܦh��T��#bù��#k~");
    else if (status == 1)
        qm.sendNextPrev("�A�ݬO�֭n�ڳo�˰�? �~�~�~�~�~�~!\r\�ڦۤv! �ڥu�O�Q���U�@�U�A�̳o�Ƿs��Ӥw~");
    else if (status == 2)
qm.sendAcceptDecline("�ҥH..... ���ڶ}�Ӫ���! ��-��-��-�u~!");
    else if (status == 3) {
        if (qm.c.getPlayer().getHp() >= 50) {
            qm.c.getPlayer().setHp(25);
            qm.c.getPlayer().updateSingleStat(MapleStat.HP, 25);
        }
        if (!qm.haveItem(2010007))
            qm.gainItem(2010007, 1);
            qm.forceStartQuest();
            qm.sendNext("�~��F��? �p�G�A��#bHP#k�ܦ�0���N�V�F�C �{�b�ڵ��A�o�� #rù�Ǫ��ѤG#k�C �Ч⥦�Y�� �A�N�|��_�F ���}�A�����D��������������M��Y���� �b��L�W��#rI��#k ���ӫܮe���a?");
    } else if (status == 4) {
        qm.sendNextPrev("�Ч�Ҧ�#rù�Ǫ��ѤG#k���]�U�h �A�|�o�{���ĭȤj�T�W�ɣ~ �е�HP�ܬ�100%�A�ӻP�ڹ��");
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
            qm.sendNext("�K, �A���ݶ� ��q������ �¤H�ݸ�? �A�T�w�A����#rù�Ǫ��ѤG#k���]�U�h��?");
            qm.dispose();
        } else
            qm.sendNext("�ϥή��ӫ~�u�O���P²��O�A���? �A�i�H�b�k�����]�w#b�ֱ���#k �A�����D��a?�~�~�~�~�~");
    else if (status == 1)
        qm.sendNextPrev("�n�a! �{�b�A�w�g�Ǩ�ܦh�F ���ڽ�A�ӤH���a~ �o�ǧޥ��֩w�|�b�A���ɬ��W�γ���");
    else if (status == 2)
        qm.sendNextPrev("�n�F! �o�ǴN�O�گ�ЧA���Ҧ��F��F�A�O�ɭԭn���A���F �n�n�O���ڧڪ��B��!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
    else if (status == 3) {
        if(qm.isQuestCompleted(1021))
            qm.dropMessage(1,"Unknown Error");
        else if(qm.canHold(2010000) && qm.canHold(2010009)){
            qm.gainExp(10);
            qm.gainItem(2010000, 3);
            qm.gainItem(2010009, 3);
            qm.forceCompleteQuest();
        }else
            qm.dropMessage(1,"�A���I�]���F");
        qm.dispose();
    }
}