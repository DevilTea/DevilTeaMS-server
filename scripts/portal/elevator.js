function enter(pi) {
	var elevator = pi.getEventManager("Elevator");
	if(elevator == null) {
		pi.getPlayer().dropMessage(6, "電梯停用中...");
	} else if(elevator.getIv().invokeFunction("isMoving")) {
		pi.getPlayer().dropMessage(6, "請稍後再呼叫電梯，電梯正在往" + (elevator.getIv().invokeFunction("getNowPos").equals("uping") ? "玩具城" : "童話村") + "方向移動中...");
	} else if(!elevator.getIv().invokeFunction("isMoving")) {
		if(pi.getMapId() == (elevator.getIv().invokeFunction("getNowPos").equals("up") ? 222020200 : 222020100)) {
            if(!elevator.getIv().invokeFunction("isPreparing")) elevator.getIv().invokeFunction(pi.getMapId() == 222020100 ? "prepareGoUp" : "prepareGoDown");
			pi.warp(pi.getMapId() == 222020100 ? 222020110 : 222020210, 0);
			return true;
		} else {
			pi.getPlayer().dropMessage(6, "請稍後，已呼叫電梯。");
			if(!elevator.getIv().invokeFunction("isPreparing")) elevator.getIv().invokeFunction(pi.getMapId() == 222020100 ? "prepareGoDown" : "prepareGoUp");
		}
	}
	return false;
}