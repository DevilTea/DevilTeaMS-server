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
		cm.sendSimple("#e<組隊任務 : 時空的裂縫>#n\r\n\r\n你不能再上去了，上面有著非常危險的怪物。 你想試試與隊員合作完成任務嗎? 如果要的話請你們的#b隊長#k與我談話。 #b\r\n#L0#我想要參加組隊任務\r\n#L1#我想尋找組隊隊員\r\n#L2#我想兌換#t1022073#\r\n#L3#我想知道更多細節");
	} else if (status == 1) {
		if (selection == 0) {
			if (cm.getParty() == null) {
				cm.sendOk("你需要組隊才能參加組隊任務。");
				cm.dispose();
				return;
			} else if (!cm.getPlayer().isGM() && (cm.getParty().getMembers().size() < minPartySize || !cm.isLeader())) {
				cm.sendOk("隊伍中人數至少需要3人。");
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
						cm.sendOk("這個副本目前不開放。");
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
					cm.sendYesNo("隊伍中人數至少需要3人，且須滿足參加資格等級範圍 #b" + minLevel + "等 ~ " + maxLevel + "#k。");
				}
			}
		} else if (selection == 1) {
			cm.sendOk("試試看用廣播或問問朋友要不要加入你!");
			cm.dispose();
		} else if (selection == 2) { // todo
			cm.sendNext("I am offering 1 #i1022073:# #bBroken Glasses#k for every 20 times you help me. If you help me #b" + brokenGlassesCount + " more times, you can receive Broken Glasses.#k");
			cm.dispose();
		} else {
			cm.sendOk("#e<組隊任務 : 時空的裂縫>#n\r\n在 #b#m220000000#!#k 出現了時空裂縫! 我們迫切需要可以打敗入侵怪物的勇敢冒險家。 請與可靠的夥伴組成隊伍，幫忙拯救 #m220000000#! 你需要透過消滅怪物與解決問題來通過數道關卡，並且擊敗#r#o9300012##k。\r\n - #e等級範圍#n: " + minLevel + " ~ " + maxLevel + " #r(推薦等級: 60 ~ 69)#k\r\n - #e時間限制#n: 60 分鐘\r\n - #e隊伍人數限制#n: " + minPartySize + " ~ " + maxPartySize + "人\r\n - #e任務獎勵#n: #i1022073:##t1022073# #b(完成組隊任務20次)#k\r\n                      各種消耗、其他、裝備類物品");
			cm.dispose();
		}
	} else if (status == 2) {
		if (mode > 0) {
			//cm.findParty();
		}
		cm.dispose();
	}
}