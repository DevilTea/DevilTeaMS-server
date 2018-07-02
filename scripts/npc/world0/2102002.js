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
var cost = 6000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1) {
        cm.dispose();
    } else {
        if(mode == 1) {
            status++;
        }
        if(mode == 0) {
            cm.sendNext("�A�@�w�٦��ƶ��n�d�b�o�B�z�A��a?");
            cm.dispose();
            return;
        }
        if(status == 0) {
            cm.sendYesNo("�A�n�A�ڬO�c�⭸���ѪŤ�������Ⲽ���C �j���C1�����|���@�Z����A�A�|�ݭn��O #b"+cost+" ����#k�C�A�T�w�n�ʶR #b#i4031045##t4031045##k��?");
        } else if(status == 1) {
            if(cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
            } else {
                cm.sendOk("�A�T�w�A�� #b"+cost+" ������#k? �p�G�����������ܨ��N�ˬd�@�U�I�]�O���O���������Ŷ��C");
            }
            cm.dispose();
        }
    }
}
