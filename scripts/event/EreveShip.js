importPackage(Packages.tools);

//0 Victoria Island->Ereve ; 1 Ereve->Victoria Island ; 2 Orbis->Ereve ; 3 Ereve->Orbis
var fromMap = new Array(101000400, 130000210, 200000161, 130000210);
var rideMap = new Array(200090030, 200090031, 200090020, 200090021);
var toMap = new Array(130000210, 101000400, 130000210, 200000161);
var timeOnRide = 30; //Seconds

function init() {
}

function setup() {
	var eim = em.newInstance("EreveShip_" + em.getInstances().size());
	return eim;
}

function playerEntry(eim, player) {
	var mode;
	var myAction = em.getProperty(player.getName());
	if(myAction == "VictoriaIsland_Ereve") {
		mode = 0;
	} else if(myAction == "Ereve_VictoriaIsland") {
		mode = 1;
	} else if(myAction == "Orbis_Ereve") {
		mode = 2;
	} else if(myAction == "Ereve_Orbis") {
		mode = 3;
	}
	eim.setVariable("docked", eim.getEm().getChannelServer().getMapFactory().getMap(toMap[mode]));
    eim.setVariable("onRide", eim.getMapFactory().getMap(rideMap[mode]));
    player.changeMap(eim.getVariable("onRide"), eim.getVariable("onRide").getPortal(0));
    player.getClient().getSession().write(MaplePacketCreator.getClock(timeOnRide));
    eim.schedule("timeOut", timeOnRide * 1000);
}

function timeOut(eim) {
	eim.unregisterAllPlayers()
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