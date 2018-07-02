/*/*
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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Cloto - Hidden Street : 1st Accompaniment
-- By ---------------------------------------------------------------------------------------------
	Stereo
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Second Version by Moogra
	1.0 - First Version by Stereo
---------------------------------------------------------------------------------------------------
**/

importPackage(Packages.tools);
importPackage(java.awt);

var status;
var curMap;
var questions = Array("提問 : 一轉時想成為劍士，等級需要達到多少以上?",
    "提問 : 一轉時想成為劍士，力量需要達到多少以上?",
    "提問 : 一轉時想成為法師，智力需要達到多少以上?",
    "提問 : 一轉時想成為弓箭手，敏捷需要達到多少以上?",
    "提問 : 一轉時想成為盜賊，幸運需要達到多少以上?",
    "提問 : 等級要在多少以上才能進行二轉?",
	"提問 : 一轉時想成為法師，等級需要達到多少以上?");
var qanswers = Array(10, 35, 20, 25, 25, 30, 8);
var party;
var preamble; // we dont even need this mother fucker ! --
var stage2Rects = Array(new Rectangle(-755,-132,4,218),new Rectangle(-721,-340,4,166),new Rectangle(-586,-326,4,150),new Rectangle(-483,-181,4,222));
var stage3Rects = Array(new Rectangle(608,-180,140,50),new Rectangle(791,-117,140,45),
    new Rectangle(958,-180,140,50),new Rectangle(876,-238,140,45),
    new Rectangle(702,-238,140,45));
var stage4Rects = Array(new Rectangle(910,-236,35,5),new Rectangle(877,-184,35,5),
    new Rectangle(946,-184,35,5),new Rectangle(845,-132,35,5),
    new Rectangle(910,-132,35,5),new Rectangle(981,-132,35,5));
var stage2combos = Array(Array(0,1,1,1),Array(1,0,1,1),Array(1,1,0,1),Array(1,1,1,0));
var stage3combos = Array(Array(0,0,1,1,1),Array(0,1,0,1,1),Array(0,1,1,0,1),
    Array(0,1,1,1,0),Array(1,0,0,1,1),Array(1,0,1,0,1),
    Array(1,0,1,1,0),Array(1,1,0,0,1),Array(1,1,0,1,0),
    Array(1,1,1,0,0));
var stage4combos = Array(Array(0,0,0,1,1,1),Array(0,0,1,0,1,1),Array(0,0,1,1,0,1),
    Array(0,0,1,1,1,0),Array(0,1,0,0,1,1),Array(0,1,0,1,0,1),
    Array(0,1,0,1,1,0),Array(0,1,1,0,0,1),Array(0,1,1,0,1,0),
    Array(0,1,1,1,0,0),Array(1,0,0,0,1,1),Array(1,0,0,1,0,1),
    Array(1,0,0,1,1,0),Array(1,0,1,0,0,1),Array(1,0,1,0,1,0),
    Array(1,0,1,1,0,0),Array(1,1,0,0,0,1),Array(1,1,0,0,1,0),
    Array(1,1,0,1,0,0),Array(1,1,1,0,0,0));	
var eye = 9300002;
var necki = 9300000;
var slime = 9300003;
var monsterIds = Array(eye, eye, eye, necki, necki, necki, necki, necki, necki, slime);
var prizeIdScroll = Array(2040502, 2040505,// Overall DEX and DEF
    2040802,// Gloves for DEX
    2040002, 2040402, 2040602);// Helmet, Topwear and Bottomwear for DEF
var prizeIdUse = Array(2000001, 2000002, 2000003, 2000006,// Orange, White and Blue Potions and Mana Elixir
    2000004, 2022000, 2022003);// Elixir, Pure Water and Unagi
var prizeQtyUse = Array(80, 80, 80, 50, 5, 15, 15);
var prizeIdEquip = Array(1032004, 1032005, 1032009,// Level 20-25 Earrings
    1032006, 1032007, 1032010,// Level 30 Earrings
    1032002,// Level 35 Earring
    1002026, 1002089, 1002090);// Bamboo Hats
var prizeIdEtc = Array(4010000, 4010001, 4010002, 4010003,// Mineral Ores
    4010004, 4010005, 4010006,// Mineral Ores
    4020000, 4020001, 4020002, 4020003,// Jewel Ores
    4020004, 4020005, 4020006,// Jewel Ores
    4020007, 4020008, 4003000);	// Diamond and Black Crystal Ores and Screws
var prizeQtyEtc = Array(15, 15, 15, 15, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 3, 3, 30);
//500, 1000, 2000, 4000, 7500 = default
function start() {
    status = -1;
    curMap = cm.getPlayer().getMapId() - 103000799;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (type == 0 && mode == 0)
        status--;
    else {
        cm.dispose();
        return;
    }
    if (curMap == 1) { // First Stage.
        if (isLeader()) {
            var eim = cm.getPlayer().getEventInstance();
            party = eim.getPlayers();
            preamble = eim.getProperty("leader1stpreamble");
            if (preamble == null) {
				cm.sendNext("你好! 歡迎來到第一關! 有沒看到身旁的怪物? 當你把他們消滅時會掉落#b#i4001007##t4001007##k。 所有除了隊長以外的隊員都必須要與我對話，接受我的提問，且收集正確數量的#b#i4001007##t4001007##k。誰能給我正確數量的#b#i4001007##t4001007##k，我就會給他#b#i4001008##t4001008##k。只要全部除了隊長以外的隊員都拿到#b#i4001008##t4001008##k然後交給隊長，隊長再交給我#b#i4001008##t4001008##k就會通過這關了。越快通過這關就有越多時間挑戰接下來的關卡! 所以我建議你們要謹慎且快速行動，那麼，祝你們幸運!");
                eim.setProperty("leader1stpreamble","done");
				cm.dispose();
            } else {
                var complete = eim.getProperty(curMap + "stageclear");
                if (complete != null) {
                    cm.sendNext("傳送門已開啟，請盡快前往下張地圖!");
                    cm.dispose();
                } else {
                    var numpasses = party.size() - 1; // All the players in the party need to get a pass besides the leader.
                    var strpasses = "#b" + numpasses + "張#i4001008##t4001008##k";
                    if (!cm.haveItem(4001008, numpasses)) {
                        cm.sendNext("不好意思，你還少了幾張#b#i4001008##t4001008##k。你必須交給我正確數量的#b#i4001008##t4001008##k，數量為#r隊伍總人數 - 隊長人數#k，" + strpasses + "。 通知你的夥伴解決問題來獲得#b#i4001008##t4001008##k並交還給你");
                        cm.dispose();
                    } else {
                        cm.sendNext("你成功收集了 " + strpasses + "! 恭喜通過第一關!我將會為你們開啟前往下一關的傳送門。任務是有時間限制的，所以請把握時間，祝你們幸運!");
                        clear(1, eim, cm);
						cm.givePartyExp("KerningPQ1st");
                        cm.gainItem(4001008, -numpasses);
                        cm.dispose();
                    // TODO: Make the shiny thing flash
                    }
                }
            }
        } else { // Not leader
            var eim = cm.getPlayer().getEventInstance();
            pstring = "member1stpreamble" + cm.getPlayer().getId();
            preamble = eim.getProperty(pstring);
            if (status == 0) {
                if (preamble == null) {
                    var qstring = "member1st" + cm.getPlayer().getId();
                    var question = eim.getProperty(qstring);
                    if (question == null) {
                        // Select a random question to ask the player.
                        var questionNum = Math.floor(Math.random() * questions.length);
                        eim.setProperty(qstring, questionNum);
                    }
                    cm.sendNext("在這你需要擊敗地圖上的怪物來獲得#b#i4001007##t4001007##k並且以收集的數量來回答提問!");
                } else { // Otherwise, check for stage completed
                    var complete = eim.getProperty(curMap + "stageclear");
                    if (complete != null) { // Strage completed
                        cm.sendNext("傳送門已開啟，請盡快前往下張地圖!");
                        cm.dispose();
                    } else {
                        // Reply to player correct/incorrect response to the question they have been asked
                        var qstring = "member1st" + cm.getPlayer().getId();
						var qcompletestr = "member1stcom" + cm.getPlayer().getId();
                        var numcoupons = qanswers[parseInt(eim.getProperty(qstring))];
                        var qcorr = cm.itemQuantity(4001007);
						if(eim.getProperty(qcompletestr) != null) {
							cm.sendNext("謝謝你將#b#i4001007##t4001007##k帶來給我。\r\n請將獲得的#b#i4001008##t4001008##k交給隊長，等待下一階段的到來");
							cm.dispose();
						} else if (numcoupons == qcorr) {
                            cm.sendNext("正確解答! 這是給你的#b#i4001008##t4001008##k\r\n請將獲得的#b#i4001008##t4001008##k交給隊長。");
                            cm.gainItem(4001007, -numcoupons);
                            cm.gainItem(4001008, 1);
							eim.setProperty(qcompletestr, "done");
							cm.dispose();
                        } else
                            cm.sendNext("不好意思，你答錯了!\r\n請確認在背包內的#b#i4001007##t4001007##k數量是否正確!");
                    }
                }
            } else if (status == 1) {
                if (preamble == null) {
                    var qstring = "member1st" + cm.getPlayer().getId();
                    var question = parseInt(eim.getProperty(qstring));
                    cm.sendNextPrev(questions[question]);
                } else {
					var qstring = "member1st" + cm.getPlayer().getId();
                    var question = parseInt(eim.getProperty(qstring));
                    cm.sendNextPrev(questions[question]);
                    cm.dispose();
                }
            } else if (status == 2) { // Preamble completed
                eim.setProperty(pstring,"done");
                cm.dispose();
            }
        } // End first map scripts
    }else if (2 <= curMap && 4 >= curMap) {
        new Rectanglestages(cm);
    }else if (curMap == 5) { // Final stage
        var eim = cm.getPlayer().getEventInstance();
        if (eim.getProperty("5stageclear") == null) { //If no
            if (isLeader()) { // Leader
                if (cm.haveItem(4001008, 10)) {
                    // Clear stage
                    cm.sendNext("現在開啟前往獎勵地圖的傳送門。獎勵地圖中的怪物比一般的怪物還要容易消滅，你們可以在獎勵地圖中運用剩餘時間打怪，當然你也可以中途透過NPC來離開。總之，恭喜通過所有關卡，請多保重...");
                    party = eim.getPlayers();
                    cm.gainItem(4001008, -10);
                    clear(5, eim, cm);
					cm.givePartyExp("KerningPQFinal");
                    cm.dispose();
                } else { // Not done yet
                    cm.sendNext("你們好，歡迎來到最後一關，在地圖四周可以發現到一些怪物以及BOSS，把它們全部消滅收集所有的#b#i4001008##t4001008##k集中交給隊長後請隊長與我談話，這些怪物或許你很熟悉，但它們比你所想得還要強大，所以請多加注意，那麼，祝福一切幸運!\r\n最後!請幹掉那些綠水靈吧!");
                }
                cm.dispose();
            } else { // Members
                cm.sendNext("你們好，歡迎來到最後一關，在地圖四周可以發現到一些怪物以及BOSS，把它們全部消滅收集所有的#b#i4001008##t4001008##k集中交給隊長後請隊長與我談話，這些怪物或許你很熟悉，但它們比你所想得還要強大，所以請多加注意，那麼，祝福一切幸運!\r\n最後!請幹掉那些綠水靈吧!");
                cm.dispose();
            }
        } else { // Give rewards and warp to bonus
            if (status == 0) {
                cm.sendNext("太厲害了!你通過了所有關卡來到了這裡，這是你們因出色表現所贈與的禮物，領取之前請確認背包是否還有欄位。\r\n#b如果沒有空間就領取將不予以補償!#k");
            } else if (status == 1) {
                getPrize(eim,cm);
                cm.dispose();
            }
        }
    } else { // No map found
        cm.sendNext("Invalid map, this means the stage is incomplete.");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty(stage + "stageclear", "true");
    var map = eim.getMapInstance(cm.getPlayer().getMapId());
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/clear"));
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Clear"));
    map.broadcastMessage(MaplePacketCreator.environmentChange("gate", 2));
    var mf = eim.getMapFactory();
    map = mf.getMap(103000800 + stage);
    var nextStage = eim.getMapInstance(103000800 + stage);
    var portal = nextStage.getPortal("next00");
    if (portal != null) {
        portal.setScriptName("kpq" + stage);
    }
}

function failstage(eim, cm) {
    var map = eim.getMapInstance(cm.getPlayer().getMapId());
    map.broadcastMessage(MaplePacketCreator.playSound("Party1/Failed"));
    map.broadcastMessage(MaplePacketCreator.showEffect("quest/party/wrong_kor"));
}

function Rectanglestages (cm) {
    var eim = cm.getPlayer().getEventInstance();
    var nthtext;
    var nthobj;
    var nthverb;
    var nthpos;
    var curArray;
    var curCombo;
    var objset;
    if (curMap == 2) {
        nthtext = "2";
        nthobj = "籐蔓";
		nthquantifier = "條";
        nthverb = "爬";
        nthpos = "爬的位置太低";
        curArray = stage2Rects;
        curCombo = stage2combos;
        objset = [0,0,0,0];
    } else if (curMap == 3) {
        nthtext = "3";
        nthobj = "平台";
		nthquantifier = "個";
        nthverb = "站";
        nthpos = "站得太靠近邊緣";
        curArray = stage3Rects;
        curCombo = stage3combos;
        objset = [0,0,0,0,0];
    } else if (curMap == 4) {
        nthtext = "4";
        nthobj = "桶子";
		nthquantifier = "個";
        nthverb = "站";
        nthpos = "站得太靠近邊緣";
        curArray = stage4Rects;
        curCombo = stage4combos;
        objset = [0,0,0,0,0,0];
    }
    if (isLeader()) { // Check if player is leader
        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            if (preamble == null) { // first time talking.
                cm.sendNext("你們好，歡迎來到第" + nthtext + "關，在我旁邊你們會看到一些#b" + nthobj + "#k 在這些#b" + nthobj + "#k裡#b有3" + nthquantifier + "是跟通往下一關的傳送門相連#k，你們要做到的就是#b3位隊員找出正確的" + nthobj + "並且" + nthverb + "上去#k#r但是如果你" + nthpos + "的話可能不會列入計算，所以請盡量待在" + nthobj + "的中間位置。#k 而且只能有三個隊員能夠在" + nthobj + "上。 只要他們正在" + nthverb + "在上面，隊長就#b與我談話確認答案正確與否#k. 現在請去群找出正確的" + nthobj + "來" + nthverb + "上去吧!");
                eim.setProperty("leader" + nthtext + "preamble","done");
                var sequenceNum = Math.floor(Math.random() * curCombo.length);
                eim.setProperty("stage" + nthtext + "combo", sequenceNum.toString());
                cm.dispose();
            } else {
				if(cm.getPlayer().getMap().getCharacters().size() != eim.getPlayerCount()) {
					cm.sendOk("請確認隊伍中的所有成員都在這邊才能繼續!");
					cm.dispose();
					return;
				}
                var complete = eim.getProperty(curMap + "stageclear");
                if (complete != null) {
                    cm.sendNext("傳送門已開啟，請盡快前往下張地圖!");
                    cm.dispose();
                } else { // Check for people on ropes and their positions
                    var playersOnCombo = 0;
                    for (var i = 0; i < party.size(); i++) {
                        for (var y = 0; y < curArray.length; y++) {
                            if (curArray[y].contains(party.get(i).getPosition())) {
                                playersOnCombo++;
                                objset[y] = 1;
                                break;
                            }
                        }
                    }
                    if (playersOnCombo == 3) {
                        var combo = curCombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
                        var correctCombo = true;
						var correctCount = 0;
                        for (i = 0; i < objset.length; i++)
                            if (combo[i] != objset[i]) correctCombo = false;
							else if(combo[i] == objset[i] && combo[i] == 1) correctCount++;
                        if (correctCombo) {
                            clear(curMap, eim, cm);
							cm.givePartyExp("KerningPQ" + nthtext);
                            cm.dispose();
                        } else { // Wrong
                            failstage(eim, cm);
							cm.sendOk("#b" + correctCount + " #k位隊員在正確的位置上");
                            cm.dispose();
                        }
                    } else {
                        cm.sendNext("看起來你還沒找到正確的3" + nthquantifier + nthobj + "! 請多多嘗試不同的" + nthobj + "組合! 只有3位隊員允許" + nthverb + "在" + nthobj + "上面，而且如果" + nthpos + "可能不被列入計算，請銘記在心，繼續加油吧!");
                        cm.dispose();
                    }
                }
            }
        } else {
            var complete = eim.getProperty(curMap + "stageclear");
            if (complete != null) {
                var target = eim.getMapInstance(103000800 + curMap);
                var targetPortal = target.getPortal("st00");
                cm.getPlayer().changeMap(target, targetPortal);
            }
            cm.dispose();
        }
    } else { // Not leader
        var complete = eim.getProperty(curMap.toString() + "stageclear");
        if (complete != null) {
            cm.sendNext("傳送門已開啟，請盡快前往下張地圖!");
        } else {
            cm.sendNext("請隊長來與我對話");
        }
        cm.dispose();
    }
}

function isLeader(){
    if(cm.getParty() == null)
        return false;
    else
        return cm.isLeader();
}

function getPrize(eim,cm) {
    var itemSetSel = Math.random();
    var itemSet;
    var itemSetQty;
    var hasQty = false;
    if (itemSetSel < 0.3)
        itemSet = prizeIdScroll;
    else if (itemSetSel < 0.6)
        itemSet = prizeIdEquip;
    else if (itemSetSel < 0.9) {
        itemSet = prizeIdUse;
        itemSetQty = prizeQtyUse;
        hasQty = true;
    } else {
        itemSet = prizeIdEtc;
        itemSetQty = prizeQtyEtc;
        hasQty = true;
    }
    var sel = Math.floor(Math.random()*itemSet.length);
    var qty = 1;
    if (hasQty)
        qty = itemSetQty[sel];
    cm.gainItem(itemSet[sel], qty, true, true);
    cm.getPlayer().changeMap(eim.getMapInstance(103000805));
}