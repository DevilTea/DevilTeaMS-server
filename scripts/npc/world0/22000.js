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
cm.sendYesNo("�f���o����i�H�e����j�����a�C��O #e150 ����#n, �ڷ|�a�A�h #b���h�Q�Ȯq#k ���O�u�n�A���}�F�N�^�����o~ ���� �n�h��?");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0 && type != 1)
            status -= 2;
        else if(type == 1 || (mode == -1 && type != 1)){
            if(mode == 0)
                cm.sendOk("�c... �ڲq�A�b�o�٦��ƭn�B�z?");
            cm.dispose();
            return;
        }
    }
    if (status == 1) {
        if (cm.haveItem(4031801))
            cm.sendNext("�n�� �{�b����150 ����... ���O����?�ݨӧA�A�N�O���d�����˪��_�I�̰�! �A�Ӧ��I�i�D�ڪ�~�ݨӧA�ƭI�����ݪ��_�I�a�O�A���ڴN�����A���F �n�n�[�o�a!!!");
        else
            cm.sendNext("ı�o�o�̫ܵL���? ��... ������ #e150 ����#n...");
    } else if (status == 2) {
        if (cm.haveItem(4031801))
            cm.sendNextPrev("�]���A�Q���˩ҥH�K�O~~!");
        else
        if (cm.getLevel() > 6) {
            if (cm.getMeso() < 150) {
                cm.sendOk("�A�L������ڻ��A�S�� 150 ����?�C��?...");
                cm.dispose();
            } else
                cm.sendNext("��! #e150#n ���� ���F! ���o~#b���h�Q�Ȯq#k!");
        } else {
		cm.sendOk("���ڬݬ�... ��ı�o�A�٬O�ӵ�G�K �A�ܤ֭n200���~�����}��");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801))
            cm.gainItem(4031801, -1);
        cm.warp(2010000);
        cm.dispose();
    }
}