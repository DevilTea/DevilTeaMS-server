importPackage(Packages.tools);

var returnTo = new Array(200000141, 250000100);
var rideTo = new Array(250000100, 200000141);
var birdRide = new Array(200090300, 200090310);
var timeOnRide = 30; //Seconds

function init() {
}

function setup() {
	var eim = em.newInstance("Hak_" + em.getInstances().size());
	return eim;
}

function playerEntry(eim, player) {
	var myRide;
	if (player.getMapId() == returnTo[0]) {
		myRide = 0;
	} else {
		myRide = 1;
	}
	eim.setVariable("docked", eim.getEm().getChannelServer().getMapFactory().getMap(rideTo[myRide]));
    eim.setVariable("onRide", eim.getMapFactory().getMap(birdRide[myRide]));
    player.changeMap(eim.getVariable("onRide"), eim.getVariable("onRide").getPortal(0));
    player.getClient().getSession().write(MaplePacketCreator.getClock(timeOnRide));
    eim.schedule("timeOut", timeOnRide * 1000);
}

function timeOut(eim) {
	eim.unregisterAllPlayers();
	eim.getVariable("onRide").warpEveryone(eim.getVariable("docked").getId());
	eim.dispose();
}

function dispose() {
}

function cancelSchedule() {
}

function playerDisconnected(eim, player) {
	eim.dispose();
}