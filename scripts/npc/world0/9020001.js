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
var questions = Array("���� : �@��ɷQ�����C�h�A���Żݭn�F��h�֥H�W?",
    "���� : �@��ɷQ�����C�h�A�O�q�ݭn�F��h�֥H�W?",
    "���� : �@��ɷQ�����k�v�A���O�ݭn�F��h�֥H�W?",
    "���� : �@��ɷQ�����}�b��A�ӱ��ݭn�F��h�֥H�W?",
    "���� : �@��ɷQ�����s��A���B�ݭn�F��h�֥H�W?",
    "���� : ���ŭn�b�h�֥H�W�~��i��G��?",
	"���� : �@��ɷQ�����k�v�A���Żݭn�F��h�֥H�W?");
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
				cm.sendNext("�A�n! �w��Ө�Ĥ@��! ���S�ݨ쨭�Ǫ��Ǫ�? ��A��L�̮����ɷ|����#b#i4001007##t4001007##k�C �Ҧ����F�����H�~�������������n�P�ڹ�ܡA�����ڪ����ݡA�B�������T�ƶq��#b#i4001007##t4001007##k�C�֯൹�ڥ��T�ƶq��#b#i4001007##t4001007##k�A�ڴN�|���L#b#i4001008##t4001008##k�C�u�n�������F�����H�~������������#b#i4001008##t4001008##k�M��浹�����A�����A�浹��#b#i4001008##t4001008##k�N�|�q�L�o���F�C�V�ֳq�L�o���N���V�h�ɶ��D�Ա��U�Ӫ����d! �ҥH�ګ�ĳ�A�̭n�ԷV�B�ֳt��ʡA����A���A�̩��B!");
                eim.setProperty("leader1stpreamble","done");
				cm.dispose();
            } else {
                var complete = eim.getProperty(curMap + "stageclear");
                if (complete != null) {
                    cm.sendNext("�ǰe���w�}�ҡA�кɧ֫e���U�i�a��!");
                    cm.dispose();
                } else {
                    var numpasses = party.size() - 1; // All the players in the party need to get a pass besides the leader.
                    var strpasses = "#b" + numpasses + "�i#i4001008##t4001008##k";
                    if (!cm.haveItem(4001008, numpasses)) {
                        cm.sendNext("���n�N��A�A�٤֤F�X�i#b#i4001008##t4001008##k�C�A�����浹�ڥ��T�ƶq��#b#i4001008##t4001008##k�A�ƶq��#r�����`�H�� - �����H��#k�A" + strpasses + "�C �q���A���٦�ѨM���D����o#b#i4001008##t4001008##k�å��ٵ��A");
                        cm.dispose();
                    } else {
                        cm.sendNext("�A���\�����F " + strpasses + "! ���߳q�L�Ĥ@��!�ڱN�|���A�̶}�ҫe���U�@�����ǰe���C���ȬO���ɶ�����A�ҥH�Чⴤ�ɶ��A���A�̩��B!");
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
                    cm.sendNext("�b�o�A�ݭn���Ѧa�ϤW���Ǫ�����o#b#i4001007##t4001007##k�åB�H�������ƶq�Ӧ^������!");
                } else { // Otherwise, check for stage completed
                    var complete = eim.getProperty(curMap + "stageclear");
                    if (complete != null) { // Strage completed
                        cm.sendNext("�ǰe���w�}�ҡA�кɧ֫e���U�i�a��!");
                        cm.dispose();
                    } else {
                        // Reply to player correct/incorrect response to the question they have been asked
                        var qstring = "member1st" + cm.getPlayer().getId();
						var qcompletestr = "member1stcom" + cm.getPlayer().getId();
                        var numcoupons = qanswers[parseInt(eim.getProperty(qstring))];
                        var qcorr = cm.itemQuantity(4001007);
						if(eim.getProperty(qcompletestr) != null) {
							cm.sendNext("���§A�N#b#i4001007##t4001007##k�a�ӵ��ڡC\r\n�бN��o��#b#i4001008##t4001008##k�浹�����A���ݤU�@���q�����");
							cm.dispose();
						} else if (numcoupons == qcorr) {
                            cm.sendNext("���T�ѵ�! �o�O���A��#b#i4001008##t4001008##k\r\n�бN��o��#b#i4001008##t4001008##k�浹�����C");
                            cm.gainItem(4001007, -numcoupons);
                            cm.gainItem(4001008, 1);
							eim.setProperty(qcompletestr, "done");
							cm.dispose();
                        } else
                            cm.sendNext("���n�N��A�A�����F!\r\n�нT�{�b�I�]����#b#i4001007##t4001007##k�ƶq�O�_���T!");
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
                    cm.sendNext("�{�b�}�ҫe�����y�a�Ϫ��ǰe���C���y�a�Ϥ����Ǫ���@�몺�Ǫ��٭n�e�������A�A�̥i�H�b���y�a�Ϥ��B�γѾl�ɶ����ǡA��M�A�]�i�H���~�z�LNPC�����}�C�`���A���߳q�L�Ҧ����d�A�Цh�O��...");
                    party = eim.getPlayers();
                    cm.gainItem(4001008, -10);
                    clear(5, eim, cm);
					cm.givePartyExp("KerningPQFinal");
                    cm.dispose();
                } else { // Not done yet
                    cm.sendNext("�A�̦n�A�w��Ө�̫�@���A�b�a�ϥ|�P�i�H�o�{��@�ǩǪ��H��BOSS�A�⥦�̥������������Ҧ���#b#i4001008##t4001008##k�����浹������ж����P�ڽ͸ܡA�o�ǩǪ��γ\�A�ܼ��x�A�����̤�A�ҷQ�o�٭n�j�j�A�ҥH�Цh�[�`�N�A����A���֤@�����B!\r\n�̫�!�зF�����Ǻ���F�a!");
                }
                cm.dispose();
            } else { // Members
                cm.sendNext("�A�̦n�A�w��Ө�̫�@���A�b�a�ϥ|�P�i�H�o�{��@�ǩǪ��H��BOSS�A�⥦�̥������������Ҧ���#b#i4001008##t4001008##k�����浹������ж����P�ڽ͸ܡA�o�ǩǪ��γ\�A�ܼ��x�A�����̤�A�ҷQ�o�٭n�j�j�A�ҥH�Цh�[�`�N�A����A���֤@�����B!\r\n�̫�!�зF�����Ǻ���F�a!");
                cm.dispose();
            }
        } else { // Give rewards and warp to bonus
            if (status == 0) {
                cm.sendNext("�ӼF�`�F!�A�q�L�F�Ҧ����d�Ө�F�o�̡A�o�O�A�̦]�X���{���ػP��§���A������e�нT�{�I�]�O�_�٦����C\r\n#b�p�G�S���Ŷ��N����N�����H���v!#k");
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
        nthobj = "�ý�";
		nthquantifier = "��";
        nthverb = "��";
        nthpos = "������m�ӧC";
        curArray = stage2Rects;
        curCombo = stage2combos;
        objset = [0,0,0,0];
    } else if (curMap == 3) {
        nthtext = "3";
        nthobj = "���x";
		nthquantifier = "��";
        nthverb = "��";
        nthpos = "���o�Ӿa����t";
        curArray = stage3Rects;
        curCombo = stage3combos;
        objset = [0,0,0,0,0];
    } else if (curMap == 4) {
        nthtext = "4";
        nthobj = "��l";
		nthquantifier = "��";
        nthverb = "��";
        nthpos = "���o�Ӿa����t";
        curArray = stage4Rects;
        curCombo = stage4combos;
        objset = [0,0,0,0,0,0];
    }
    if (isLeader()) { // Check if player is leader
        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            if (preamble == null) { // first time talking.
                cm.sendNext("�A�̦n�A�w��Ө��" + nthtext + "���A�b�ڮ���A�̷|�ݨ�@��#b" + nthobj + "#k �b�o��#b" + nthobj + "#k��#b��3" + nthquantifier + "�O��q���U�@�����ǰe���۳s#k�A�A�̭n���쪺�N�O#b3�춤����X���T��" + nthobj + "�åB" + nthverb + "�W�h#k#r���O�p�G�A" + nthpos + "���ܥi�ण�|�C�J�p��A�ҥH�кɶq�ݦb" + nthobj + "��������m�C#k �ӥB�u�঳�T�Ӷ�������b" + nthobj + "�W�C �u�n�L�̥��b" + nthverb + "�b�W���A�����N#b�P�ڽ͸ܽT�{���ץ��T�P�_#k. �{�b�Хh�s��X���T��" + nthobj + "��" + nthverb + "�W�h�a!");
                eim.setProperty("leader" + nthtext + "preamble","done");
                var sequenceNum = Math.floor(Math.random() * curCombo.length);
                eim.setProperty("stage" + nthtext + "combo", sequenceNum.toString());
                cm.dispose();
            } else {
				if(cm.getPlayer().getMap().getCharacters().size() != eim.getPlayerCount()) {
					cm.sendOk("�нT�{������Ҧ��������b�o��~���~��!");
					cm.dispose();
					return;
				}
                var complete = eim.getProperty(curMap + "stageclear");
                if (complete != null) {
                    cm.sendNext("�ǰe���w�}�ҡA�кɧ֫e���U�i�a��!");
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
							cm.sendOk("#b" + correctCount + " #k�춤���b���T����m�W");
                            cm.dispose();
                        }
                    } else {
                        cm.sendNext("�ݰ_�ӧA�٨S��쥿�T��3" + nthquantifier + nthobj + "! �Цh�h���դ��P��" + nthobj + "�զX! �u��3�춤�����\" + nthverb + "�b" + nthobj + "�W���A�ӥB�p�G" + nthpos + "�i�ण�Q�C�J�p��A�лʰO�b�ߡA�~��[�o�a!");
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
            cm.sendNext("�ǰe���w�}�ҡA�кɧ֫e���U�i�a��!");
        } else {
            cm.sendNext("�ж����ӻP�ڹ��");
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