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
/*
@	Author : Twdtwd
@
@	NPC = Blue Balloon
@	Map = Hidden-Street <Stage 8>
@	NPC MapId = 922010800
@	Function = LPQ - 8 Stage
@
@	Description: Used to find the combo to unlock the next door. Players stand on 5 different crates to guess the combo.
*/

importPackage(Packages.tools);
importPackage(Packages.server.maps);
var status = 0;
var party;
var preamble;
var gaveItems;
var nthtext = "8th";

function start() {
    status = -1;
    action(1, 0, 0);
}

function generateCombo() {
	var countPicked = 0;
	var positions = Array(0,0,0,0,0,0,0,0,0);
	while(countPicked < 5) {
		var picked = Math.floor(Math.random() * positions.length);
		if(positions[picked] == 1) // Don't let it pick one its already picked.
			continue;
			
		positions[picked] = 1;
		countPicked++;
	}
	
	var returnString = "";
	for(var i = 0; i < positions.length; i++) {
		returnString += positions[i];
		if(i != positions.length - 1)
		returnString += ",";
	}
	
	return returnString;
	
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }else if (mode == 0){
        cm.dispose();
    }else{
        if (mode == 1)
            status++;
        else
            status--;
        var eim = cm.getPlayer().getEventInstance();
        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            gaveItems = eim.getProperty("leader" + nthtext + "gaveItems");
            if (preamble == null) {
                cm.sendOk("你們好，歡迎來到第八關，在這裡你們需要找出正確的5個箱子，然後站上去或者用#i4001454##b#t4001454##k放在箱子上，能夠完成的話串送們就會開啟。");
                eim.setProperty("leader" + nthtext + "preamble","done");
				eim.setProperty("stage" + nthtext + "combo", generateCombo());
                cm.dispose();
            }else{
                if(!isLeader()){
                    if(gaveItems == null){
                        cm.sendOk("請隊長來與我對話。");
                        cm.dispose();
                    }else{
                        cm.sendOk("傳送門已經開啟，請趕快前往下一關卡!");
                        cm.dispose();
                    }
                } else {
					if(gaveItems == null){
						if(cm.getPlayer().getMap().getCharacters().size() != eim.getPlayers().size()) {
							cm.sendOk("請等待所有隊員都回到這裡。");
							cm.dispose();
							return;
						}
						objset = [0,0,0,0,0,0,0,0,0];
						var playersOnCombo = 0;
						var map = cm.getPlayer().getMap();
						for (var i = 0; i < party.size(); i++) {
							for (var y = 0; y < map.getAreas().size(); y++) {
								if (map.getArea(y).contains(party.get(i).getPosition())) {
									playersOnCombo++;
									objset[y] = 1;
									//cm.mapMessage(5, "Player found on " + (y + 1));
									break;
								}
							}
						}
						
						for (var i = 0; i < map.getMapObjects().size(); i++) {
							if(map.getMapObjects().toArray()[i].getType() == MapleMapObjectType.ITEM && map.getMapObjects().toArray()[i].getItemId() == 4001454) {
								for (var y = 0; y < map.getAreas().size(); y++) {
									if (map.getArea(y).contains(map.getMapObjects().toArray()[i].getPosition())) {
										playersOnCombo++;
										objset[y] = 1;
										//cm.mapMessage(5, "Item found on " + (y + 1));
										break;
									}
								}
							}
						}
						
						if (playersOnCombo == 5 || cm.getPlayer().isGM()) {
							var combo = eim.getProperty("stage" + nthtext + "combo").split(',');
							var correctCombo = true;
							var correctCount = 0;
							for (i = 0; i < objset.length; i++)
								if (parseInt(combo[i]) != objset[i]) {
									//cm.mapMessage(5, "Combo failed on " + (i + 1));
									correctCombo = false;
								} else {
									correctCount++;
								}
							if (correctCombo || cm.getPlayer().isGM()) {
								clear(eim, cm);
								cm.dispose();
							} else { // Wrong
								//cm.sendOk(eim.getProperty("stage" + nthtext + "combo"));
								failstage(eim, cm);
								cm.sendOk("有#b" + correctCount + "#k位玩家在正確的位置上。");
								cm.dispose();
							}
						} else {
							cm.sendOk("看來你們還沒找出正確的5個箱子啊，請繼續嘗試不同的箱子組合!");
							cm.dispose();
						}
					} else {
						cm.sendOk("傳送門已經開啟，請趕快前往下一關卡!");
						cm.dispose();
					}
				}					
            }
        }     
    }
}

function clear(eim, cm) {
	cm.sendOk("傳送門已經開啟，請趕快前往下一關卡!");
	
    var map = eim.getMapInstance(cm.getPlayer().getMapId());
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
    map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));
	
	eim.setProperty("8stageclear","true");
	eim.setProperty("leader" + nthtext + "gaveItems","done");
	cm.givePartyExp("LudiPQ8th");
	cm.dispose();
}

function failstage(eim, cm) {
    var map = eim.getMapInstance(cm.getPlayer().getMapId());
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Failed"));
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/wrong_kor"));
}

function isLeader(){
    if(cm.getParty() == null)
        return false;
    else
        return cm.isLeader();
}