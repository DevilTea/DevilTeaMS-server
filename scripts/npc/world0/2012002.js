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

/**
 * @Author: Moogra
 * @NPC ID: 2012002
 * @NPC   : Erin (On Orbis Boat )
 */

var status = 0;

function start() {
    cm.sendYesNo("�A�Q�n�q����W�U�h��?");
}

function action(mode, type, selection) {
    if (status == 0) {
        cm.sendYesNo("�A�Q�n�q����W�U�h��?");
        status++;
    } else {
        if (mode < 1) {
            cm.dispose();
        } else {
            if (status == 1) {
                cm.sendNext ("�n���A�U���A���Цh�O���C");
                status++;
            } else if (status == 2) {
                cm.warp(200000111, 0);// back to orbis
                cm.dispose();
            }
        }
    }
}
