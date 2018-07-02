importPackage(Packages.net.server);
importPackage(Packages.java.util);
var status = -1;
var player;
function start() {
	player = cm.getPlayer();
	player.dropMessage('你好安安安安安');
	cm.dispose();
}