/**
 * @author: Eric
 * @npc: Sgt. Anderson
 * @maps: Ludibrium PQ Maps
 * @func: Ludi PQ (Warps you out)
*/

var status = -1;

function start() {
    if (cm.getMapId() != 922010000 && cm.getMapId() != 922010800) {
		cm.sendYesNo("���}��U���N�n���Y�}�l�o�A�A�T�w�n���}��?");
    } else if (cm.getMapId() == 922010800) {
		cm.sendSimple("�A�ݭn������?#b\r\n#L0#�ڻݭn#t4001454##l\r\n#L1#�ڷQ�q�o�����}#l#k");
	} else {
		cm.removeAll(4001022); // pass of dimension
	    cm.removeAll(4001023);
		cm.removeAll(4001454); // platform puppet
		cm.warp(221024500, 0);
		cm.dispose();
    }
}

function action(mode, type, selection) {
	if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
	if (status == 0) {
		if (cm.getMapId() == 922010800) {
			if (selection == 0) {
				cm.sendNext("���A�@��#i4001454##t4001454#");
				cm.gainItem(4001454, 1);
				cm.dispose();
			} else {
				cm.sendYesNo("���}��U���N�n���Y�}�l�o�A�A�T�w�n���}��?");
			}
		} else {
			var eim = cm.getPlayer().getEventInstance();
			if(eim != null) {
				eim.removePlayer(cm.getPlayer());
			} else {
				cm.warp(922010000, 0);
			}
			cm.dispose();
		}
	} else if (status == 1) {
		var eim = cm.getPlayer().getEventInstance();
		if(eim != null) {
			eim.removePlayer(cm.getPlayer());
		} else {
			cm.warp(922010000, 0);
		}
		cm.dispose();
	}
}