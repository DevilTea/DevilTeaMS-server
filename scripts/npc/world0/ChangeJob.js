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
			if(checkJob0) {//��1
				cm.sendYesNo("���o!!!#b#h ##k�ڭ̤S�����F!�A�n���¾�~���Ĥ@���q�F��?");
			} else if(checkJob1) {//1��2
				cm.sendYesNo("���o!!!#b#h ##k�ڭ̤S�����F!�A�n���¾�~���ĤG���q�F��?");
			} else if(checkJob2) {//2��3
				cm.sendYesNo("���o!!!#b#h ##k�ڭ̤S�����F!�A�n���¾�~���ĤT���q�F��?");
			} else if(checkJob3) {//3��4
				if(jrace == 1) {
					cm.sendOk("�A�w�g�����Ҧ���¾�o!");
					cm.dispose();
				} else {
				cm.sendOk("�ثe�|���}��4��");
					cm.dispose();
				}
			} else if(checkJob4) {
				cm.sendOk("�A�w�g�����Ҧ���¾�o!");
				cm.dispose();
			} else {
				cm.sendOk("�n�[����!#b#h #~!");
				cm.dispose();
			}
		} else if(status == 1) {
			if(checkJob0) {
				if(jrace != 2) {
					switch(jrace) {
						case 0:
							txt = "\r\n#b#L1#�C�h\r\n#L2#�k�v\r\n#L3#�}�b��\r\n#L4#�s��\r\n#L5#���s";
							break;
						case 1:
							txt = "\r\n#b#L110#�t��C�h\r\n#L120#�P�K�Ův\r\n#L130#�}���Ϫ�\r\n#L140#�t�]���\r\n#L150#�{�p���N";
							break;
					}
					cm.sendSimple("�q���U��@�ӧA���w��¾�~�a!\r\n" + txt);
				} else {
					cm.sendYesNo("�T�w��¾?");
				}
			} else if(checkJob1) {
				if (jrace == 0) {
					switch(jtype) {
						case 1:
							txt = "\r\n#b#L11#�g�Ԥh\r\n#L12#�����M�h\r\n#L13#�j�M�L";
							break;
						case 2:
							txt = "\r\n#b#L21#�Ův�]���B�r�^\r\n#L22#�Ův�]�B�B�p�^\r\n#L23#���Q";
							break;
						case 3:
							txt = "\r\n#b#L31#�y�H\r\n#L32#���}��";
							break;
						case 4:
							txt = "\r\n#b#L41#���\r\n#L42#�L�s";
							break;
						case 5:
							txt = "\r\n#b#L51#����\r\n#L52#�j��";
							break;
					}
					cm.sendSimple("�q���U��@�ӧA���w��¾�~�a\r\n" + txt);
				} else {
					cm.sendYesNo("�A�ǳƦn�n������[�j�j�F��?");
				}
			} else if(checkJob2) {
				cm.sendYesNo("�A�ǳƦn�ܱo��j�j�F��??");
			} else if(checkJob3) {
				cm.dispose();
			} else {
				cm.sendOk("���~!");
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
					cm.sendYesNo("�A��F#b"+player.getJobName(jobid)+"#k��!\r\n\r\n���ᤣ��A���o!�T�w�F��?")
				} else {
					jobid = 2100;
					player.changeJobById(jobid);
					cm.sendOk("��¾����!�n�ܱo��j��^O^");
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
					cm.sendYesNo("�A��F#b"+player.getJobName(jobid)+"#k��!\r\n\r\n���ᤣ��A���o!�T�w�F��?")
				} else {
					jobid = nowjob + 10;
					cm.teachSkillsByJob(player, jobid, 0, -1);
					player.changeJobById(jobid);
					cm.sendOk("��¾����!�n�ܱo��j��^O^");
					cm.dispose();
				}
			} else if(checkJob2) {
				jobid = nowjob + 1;
				if(jrace == 2)cm.teachSkillsByJob(player, jobid, 0, -1);
				player.changeJobById(jobid);
				cm.sendOk("��¾����!�n�ܱo��j��^O^");
				cm.dispose();
			}
		} else if(status == 3) {
			if(checkJob0 || checkJob1) {
				player.changeJob(MapleJob.getById(jobid));
				cm.sendOk("��¾����!�n�ܱo��j��^O^");
				cm.dispose();
			}
		}
	} else {
		cm.dispose();
		return;
	}
}