importPackage(Packages.client);
var status = -1;
var jobid;
var sel;

function start() {
	action(1,0,0);
}

function action(mode, type, selection) {
	var player = cm.getPlayer();
	var level = player.getLevel();
	var nowjob = player.getJob().getId();
	var jrace = player.getJobType();
	var jtype = (player.getJob().getId() % 1000) / 100;
	var txt = "";
	var checkJob0 = (nowjob % 1000 == 0) && level >= 10;
	var checkJob1 = (nowjob % 1000 != 0 && nowjob / 100 != 0 && nowjob % 100 == 0) && level >= 30;
	var checkJob2 = (nowjob % 10 == 0 && (nowjob % 100) / 10 != 0) && level >= 70;
	var checkJob3 = (nowjob % 10 == 1) && level >= 120;
	var checkJob4 = (nowjob % 10 == 2);
	if(mode == -1) {
		cm.dispose();
	} else if(mode == 1) {
		status++;
		if(status == 0) {
			if(checkJob0) {//轉1
				cm.sendYesNo("哈囉!!!#b#h ##k我們又見面了!你要選擇職業的第一階段了嗎?");
			} else if(checkJob1) {//1轉2
				cm.sendYesNo("哈囉!!!#b#h ##k我們又見面了!你要選擇職業的第二階段了嗎?");
			} else if(checkJob2) {//2轉3
				cm.sendYesNo("哈囉!!!#b#h ##k我們又見面了!你要選擇職業的第三階段了嗎?");
			} else if(checkJob3) {//3轉4
				if(jrace == 1) {
					cm.sendOk("你已經完成所有轉職囉!");
					cm.dispose();
				} else {
				cm.sendOk("目前尚未開放4轉");
					cm.dispose();
				}
			} else if(checkJob4) {
				cm.sendOk("你已經完成所有轉職囉!");
				cm.dispose();
			} else {
				cm.sendOk("好久不見!#b#h #~!");
				cm.dispose();
			}
		} else if(status == 1) {
			if(checkJob0) {
				if(jrace != 2) {
					switch(jrace) {
						case 0:
							txt = "\r\n#b#L1#劍士\r\n#L2#法師\r\n#L3#弓箭手\r\n#L4#盜賊\r\n#L5#海盜";
							break;
						case 1:
							txt = "\r\n#b#L110#聖魂劍士\r\n#L120#烈焰巫師\r\n#L130#破風使者\r\n#L140#暗夜行者\r\n#L150#閃雷悍將";
							break;
					}
					cm.sendSimple("從底下選一個你喜歡的職業吧!\r\n" + txt);
				} else {
					cm.sendYesNo("確定轉職?");
				}
			} else if(checkJob1) {
				if (jrace == 0) {
					switch(jtype) {
						case 1:
							txt = "\r\n#b#L11#狂戰士\r\n#L12#見習騎士\r\n#L13#槍騎兵";
							break;
						case 2:
							txt = "\r\n#b#L21#巫師（火、毒）\r\n#L22#巫師（冰、雷）\r\n#L23#僧侶";
							break;
						case 3:
							txt = "\r\n#b#L31#獵人\r\n#L32#弩弓手";
							break;
						case 4:
							txt = "\r\n#b#L41#刺客\r\n#L42#俠盜";
							break;
						case 5:
							txt = "\r\n#b#L51#打手\r\n#L52#槍手";
							break;
					}
					cm.sendSimple("從底下選一個你喜歡的職業吧\r\n" + txt);
				} else {
					cm.sendYesNo("你準備好要成為更加強大了嗎?");
				}
			} else if(checkJob2) {
				cm.sendYesNo("你準備好變得更強大了嗎??");
			} else if(checkJob3) {
				cm.dispose();
			} else {
				cm.sendOk("錯誤!");
				cm.dispose();
			}
		} else if(status == 2) {
			sel = selection;
			if(checkJob0) {
				if(jrace != 2) {
					switch(sel) {
						case 1:
							jobid = 100;
							break;
						case 2:
							jobid = 200;
							break;
						case 3:
							jobid = 300;
							break;
						case 4:
							jobid = 400;
							break;
						case 5:
							jobid = 500;
							break;
						case 110:
							jobid = 1100;
							break;
						case 120:
							jobid = 1200;
							break;
						case 130:
							jobid = 1300;
							break;
						case 140:
							jobid = 1400;
							break;
						case 150:
							jobid = 1500;
							break;
					}
					cm.sendYesNo("你選了#b"+player.getJobName(jobid)+"#k啊!\r\n\r\n之後不能再改囉!確定了嗎?")
				} else {
					jobid = 2100;
					player.changeJobById(jobid);
					cm.sendOk("轉職完成!要變得更強喔^O^");
					cm.dispose();
				}
			} else if(checkJob1) {
				if(jrace == 0) {
					switch(sel) {
						case 11:
							jobid = 110;
							break;
						case 12:
							jobid = 120;
							break;
						case 13:
							jobid = 130;
							break;
						case 21:
							jobid = 210;
							break;
						case 22:
							jobid = 220;
							break;
						case 23:
							jobid = 230;
							break;
						case 31:
							jobid = 310;
							break;
						case 32:
							jobid = 320;
							break;
						case 41:
							jobid = 410;
							break;
						case 42:
							jobid = 420;
							break;
						case 51:
							jobid = 510;
							break;
						case 52:
							jobid = 520;
							break;
					}
					cm.sendYesNo("你選了#b"+player.getJobName(jobid)+"#k啊!\r\n\r\n之後不能再改囉!確定了嗎?")
				} else {
					jobid = nowjob + 10;
					cm.teachSkillsByJob(player, jobid, 0, -1);
					player.changeJobById(jobid);
					cm.sendOk("轉職完成!要變得更強喔^O^");
					cm.dispose();
				}
			} else if(checkJob2) {
				jobid = nowjob + 1;
				if(jrace == 2)cm.teachSkillsByJob(player, jobid, 0, -1);
				player.changeJobById(jobid);
				cm.sendOk("轉職完成!要變得更強喔^O^");
				cm.dispose();
			}
		} else if(status == 3) {
			if(checkJob0 || checkJob1) {
				player.changeJob(MapleJob.getById(jobid));
				cm.sendOk("轉職完成!要變得更強喔^O^");
				cm.dispose();
			}
		}
	} else {
		cm.dispose();
		return;
	}
}