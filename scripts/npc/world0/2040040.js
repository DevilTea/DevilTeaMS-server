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
@	Author : Raz
@
@	NPC = Green Balloon
@	Map = Hidden-Street <Stage 5>
@	NPC MapId = 922010500
@	Function = LPQ - 5th Stage
@
 */
 
importPackage(Packages.tools);
 
var status = 0;
var party;
var preamble;
var gaveItems;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

        
    if (mode == -1) {
        cm.dispose();//ExitChat
    }else if (mode == 0){
        cm.dispose();//No
    }else{		    //Regular Talk
        if (mode == 1)
            status++;
        else
            status--;
        var eim = cm.getPlayer().getEventInstance(); 
        var nthtext = "5th";


        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            gaveItems = eim.getProperty("leader" + nthtext + "gaveItems");
            if (preamble == null) {
                cm.sendNext("你們好，歡迎來到第五關，這張地圖有6個傳送門分別前往6張不同地圖，擊破每張地圖內的所有箱子蒐集#b#t4001022##k，其中有些怪物是無敵的、有箱子的位置非常的高。我希望你們能好好的分工合作，帶回24張#b#t4001022##k後由隊長來與我對話。");//not 24!
                eim.setProperty("leader" + nthtext + "preamble","done");
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
		}else{
                    if(gaveItems == null){
                        if(cm.getPlayer().getMap().getCharacters().size() != eim.getPlayers().size()) {
							cm.sendOk("請等待所有隊員都回到這裡。");
							cm.dispose();
                        } else if(cm.itemQuantity(4001022) >= 24 || cm.getPlayer().isGM()){
                            cm.sendOk("很好! 你們成功蒐集了 24張#b#t4001022##k!");
                        }else{
                            cm.sendOk("你們還沒蒐集完 24張#b#t4001022##k喔!");
                            cm.dispose();
                        }
                    }else{
                        cm.sendOk("傳送門已經開啟，請趕快前往下一關卡!");
                        cm.dispose();
                    }
		}}
        }else if (status == 1){
			cm.sendOk("傳送門已經開啟，請趕快前往下一關卡!");
            
			var map = eim.getMapInstance(cm.getPlayer().getMapId());
			map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
			map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
			map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));
			
            cm.removeAll(4001022);
            cm.givePartyExp("LudiPQ5th");
            eim.setProperty("5stageclear","true");
            eim.setProperty("leader" + nthtext + "gaveItems","done");
            cm.dispose();
        }            
    }
}
     
     
function isLeader(){
    if(cm.getParty() == null){
        return false;
    }else{
        return cm.isLeader();
    }
}