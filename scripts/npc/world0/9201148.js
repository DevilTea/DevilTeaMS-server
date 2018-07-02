var status = -1;
var sel;
var mface = Array(20024,20025,20026,20027,20028,20029,20030,20031,20032,20033,20035,20036,20037,20038,20040,20043,20044,20045,20046,20047,20048,20049,20050,20051,20052,20053,20054,20055,20056,20057,20058,20059,20060,20061,20062,20063,20064,20065,20066,20067,20068,20069,20070,20073,20074,20075,20076,20077,20078,20080,20081,20082,20083,20084,20085,20086,20087,20088,20089,20090,20091,20092,20093,20094,20095,20096,20097,20098,20099);
var fface = Array(21023,21024,21025,21026,21027,21028,21029,21030,21031,21033,21034,21035,21036,21038,21041,21042,21043,21044,21045,21046,21047,21048,21049,21050,21051,21052,21053,21054,21055,21057,21058,21059,21060,21061,21062,21063,21064,21065,21068,21069,21070,21071,21072,21073,21074,21075,21076,21077,21078,21079,21080,21081,21082,21083,21084,21085,21086,21087,21088,21089,21090,21091,21092,21093,21094,21095,21096,21097,21098,21099);
var facenew = Array();
var colors = Array();
var skin = Array(0, 1, 2, 3, 4);

function start() {
	action(1,0,0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
	} else if(mode == 1) {
		status++;
		if(status == 0) {
			cm.sendSimple("我是整形界裡的藝術家#k我可以把你的臉變得充滿藝術氣息唷~<3\r\n\r\n#L2##b眼型#l\r\n#L3##b眼色#l\r\n#L4##b膚色#l");
		} else if(status == 1) {
			sel = selection;
			if(selection == 2) {
				facenew = Array();
				if(cm.getPlayer().getGender() == 0) {
					for(var i = 0; i < mface.length; i++) {
						facenew.push(mface[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
					}
				} else if(cm.getPlayer().getGender() == 1) {
					for(var i = 0; i < fface.length; i++) {
						facenew.push(fface[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
					}
				}
				cm.sendStyle("選一個喜歡的吧!", facenew);
			} else if(selection == 3) {
				if(cm.getPlayer().getGender() == 0)
					var current = cm.getPlayer().getFace() % 100 + 20000;
				else if(cm.getPlayer().getGender() == 1)
					var current = cm.getPlayer().getFace() % 100 + 21000;
				colors = Array();
				colors = Array(current , current + 100, current + 200, current + 300, current +400, current + 500, current + 600, current + 700);
				cm.sendStyle("選一個喜歡的吧!", colors);
			} else if(selection == 4) {
				cm.sendStyle("選一個喜歡的吧!",skin)
			}
		} else if(status == 2) {
			if(sel == 2) {
				cm.setFace(facenew[selection]);
			} else if(sel == 3) {
				cm.setFace(colors[selection]);
			} else if(sel == 4) {
				cm.setSkin(skin[selection]);
			}
			cm.sendOk("完成囉~");
			cm.dispose();
		}
	} else {
		cm.sendOk("有需要再來唷<3");
		cm.dispose();
		return;
	}
}