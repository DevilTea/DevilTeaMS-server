/**
 * @author: Eric
 * @npc: Red Sign
 * @map: 101st Floor Eos Tower (221024500)
 * @func: Ludi PQ
*/

var status = -1;
var minLevel = 35; // according to Nexon it's 30, but it's actually a 50 requirement.
var maxLevel = 200;
var minPartySize = 3;
var maxPartySize = 6;

var brokenGlassesCount = 0; // code custom quest data is on the todo list

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		//cm.sendNext((cm.getParty() == null ? "Remember that using the Party Search function (Hotkey O) will allow you to find a party anytime, anywhere." : "Send an invite to friends nearby. Remember that using the Party Search function (Hotkey O) will allow you to find a party anytime, anywhere."));
		cm.dispose();
		return;
	}
	if (status == 0) {
		cm.sendSimple("#e<�ն����� : �ɪŪ����_>#n\r\n\r\n�A����A�W�h�F�A�W�����۫D�`�M�I���Ǫ��C �A�Q�ոջP�����X�@�������ȶ�? �p�G�n���ܽЧA�̪�#b����#k�P�ڽ͸ܡC #b\r\n#L0#�ڷQ�n�ѥ[�ն�����\r\n#L1#�ڷQ�M��ն�����\r\n#L2#�ڷQ�I��#t1022073#\r\n#L3#�ڷQ���D��h�Ӹ`");
	} else if (status == 1) {
		if (selection == 0) {
			if (cm.getParty() == null) {
				cm.sendOk("�A�ݭn�ն��~��ѥ[�ն����ȡC");
				cm.dispose();
				return;
			} else if (!cm.getPlayer().isGM() && (cm.getParty().getMembers().size() < minPartySize || !cm.isLeader())) {
				cm.sendOk("����H�Ʀܤֻݭn3�H�C");
				cm.dispose();
				return;
			} else {
				// Check if all party members are within PQ levels
				var party = cm.getParty().getMembers();
				var mapId = cm.getMapId();
				var next = true;
				var levelValid = 0;
				var inMap = 0;
				var it = party.iterator();

				while (it.hasNext()) {
					var cPlayer = it.next();
					if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
						levelValid += 1;
					} else {
						next = false;
					}
					if (cPlayer.getMapId() == mapId) {
						inMap += (cPlayer.getJobId() == 910 ? 6 : 1);
					}
				}
				if (party.size() > maxPartySize || inMap < minPartySize) {
					next = false;
				}
				if(cm.getPlayer().isGM())
					next = true;
				if (next) {
					var em = cm.getEventManager("LudiPQ");
					if (em == null) {
						cm.sendOk("�o�Ӱƥ��ثe���}��C");
					} else {
						em.startInstance(cm.getParty(), cm.getPlayer().getMap());
						cm.removePartyItems(4001022);
						cm.removePartyItems(4001023);
						cm.dispose();
						return;
						/*var prop = em.getProperty("LPQOpen");
						if (prop == null || prop.equals("true")) { 
							em.startInstance(cm.getParty(), cm.getPlayer().getMap());
							cm.removePartyItems(4001022);
							cm.removePartyItems(4001023);
							cm.dispose();
							return;
						} else {
							cm.sendOk("Another party has already entered the #rParty Quest#k in this channel. Please try another channel, or wait for the current party to finish.");
						}*/
					}
				} else {
					cm.sendYesNo("����H�Ʀܤֻݭn3�H�A�B�������ѥ[��浥�Žd�� #b" + minLevel + "�� ~ " + maxLevel + "#k�C");
				}
			}
		} else if (selection == 1) {
			cm.sendOk("�ոլݥμs���ΰݰݪB�ͭn���n�[�J�A!");
			cm.dispose();
		} else if (selection == 2) { // todo
			cm.sendNext("I am offering 1 #i1022073:# #bBroken Glasses#k for every 20 times you help me. If you help me #b" + brokenGlassesCount + " more times, you can receive Broken Glasses.#k");
			cm.dispose();
		} else {
			cm.sendOk("#e<�ն����� : �ɪŪ����_>#n\r\n�b #b#m220000000#!#k �X�{�F�ɪŵ��_! �ڭ̭����ݭn�i�H���ѤJ�I�Ǫ����i���_�I�a�C �лP�i�a���٦�զ�����A�����@�� #m220000000#! �A�ݭn�z�L�����Ǫ��P�ѨM���D�ӳq�L�ƹD���d�A�åB����#r#o9300012##k�C\r\n - #e���Žd��#n: " + minLevel + " ~ " + maxLevel + " #r(���˵���: 60 ~ 69)#k\r\n - #e�ɶ�����#n: 60 ����\r\n - #e����H�ƭ���#n: " + minPartySize + " ~ " + maxPartySize + "�H\r\n - #e���ȼ��y#n: #i1022073:##t1022073# #b(�����ն�����20��)#k\r\n                      �U�خ��ӡB��L�B�˳������~");
			cm.dispose();
		}
	} else if (status == 2) {
		if (mode > 0) {
			//cm.findParty();
		}
		cm.dispose();
	}
}