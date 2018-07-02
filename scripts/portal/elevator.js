function enter(pi) {
	var elevator = pi.getEventManager("Elevator");
	if(elevator == null) {
		pi.getPlayer().dropMessage(6, "�q�谱�Τ�...");
	} else if(elevator.getIv().invokeFunction("isMoving")) {
		pi.getPlayer().dropMessage(6, "�еy��A�I�s�q��A�q�西�b��" + (elevator.getIv().invokeFunction("getNowPos").equals("uping") ? "���㫰" : "���ܧ�") + "��V���ʤ�...");
	} else if(!elevator.getIv().invokeFunction("isMoving")) {
		if(pi.getMapId() == (elevator.getIv().invokeFunction("getNowPos").equals("up") ? 222020200 : 222020100)) {
            if(!elevator.getIv().invokeFunction("isPreparing")) elevator.getIv().invokeFunction(pi.getMapId() == 222020100 ? "prepareGoUp" : "prepareGoDown");
			pi.warp(pi.getMapId() == 222020100 ? 222020110 : 222020210, 0);
			return true;
		} else {
			pi.getPlayer().dropMessage(6, "�еy��A�w�I�s�q��C");
			if(!elevator.getIv().invokeFunction("isPreparing")) elevator.getIv().invokeFunction(pi.getMapId() == 222020100 ? "prepareGoDown" : "prepareGoUp");
		}
	}
	return false;
}