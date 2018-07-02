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

function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Genie");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("�A�n�e���ѪŤ�����?");
        } else {
            cm.sendOk("�e���ѪŤ��������O���F�w�g�X�o�F�A�Э@�ߵ��ݤU�@�Z���C");
            cm.dispose();
        }
    } else {
        cm.sendOk("�A���T�{�O�_�����e���ѪŤ������!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�p�G�A���ܥD�N�F�A�ӧ�ڴN�i�H�F!");
        cm.dispose();
	return;
    } 
    cm.gainItem(4031045, -1);
    cm.warp(260000110);
    cm.dispose();
}