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
importPackage(Packages.tools);

var fromMap = new Array(222020200, 222020100);
var elevatorMap = new Array(222020210, 222020110);
var movingElevatorMap = new Array(222020211, 222020111);
var toMap = new Array(222020100, 222020200);
var preparing;
var moving;
var nowPos;


function init() {
    scheduleNew();
}

function scheduleNew() {
	preparing = false;
	moving = false;
	nowPos = "up";
	em.getChannelServer().getMapFactory().getMap(fromMap[0]).resetReactors();
    em.getChannelServer().getMapFactory().getMap(toMap[0]).setReactorState();
}

function cancelSchedule() { 
}

function prepareGoDown() {
	em.getChannelServer().getMapFactory().getMap(fromMap[0]).broadcastMessage(MaplePacketCreator.serverNotice(6, "電梯 5 秒後即將往童話村方向移動"));
	em.getChannelServer().getMapFactory().getMap(elevatorMap[0]).broadcastMessage(MaplePacketCreator.serverNotice(6, "電梯 5 秒後即將往童話村方向移動"));
	preparing = true;
	em.schedule("goDown", 5000);
}

function isPreparing() {
	return preparing;
}

function setPreparing(bool) {
	preparing = bool;
}

function isMoving() {
	return moving;
}

function setMoving(bool) {
	moving = bool;
}

function getNowPos() {
	return nowPos;
}

function setNowPos(pos) {
	nowPos = pos;
}

function goDown() {
	em.getChannelServer().getMapFactory().getMap(fromMap[0]).broadcastMessage(MaplePacketCreator.serverNotice(6, "電梯門關閉..."));
	em.getChannelServer().getMapFactory().getMap(toMap[0]).broadcastMessage(MaplePacketCreator.serverNotice(6, "電梯正在前往本樓層..."));
	em.getChannelServer().getMapFactory().getMap(elevatorMap[0]).warpEveryone(movingElevatorMap[0]);
	preparing = false;
    moving = true;
    nowPos = "downing";
    em.schedule("arrivedDown", 10000);
    em.getChannelServer().getMapFactory().getMap(fromMap[0]).setReactorState();
    em.getChannelServer().getMapFactory().getMap(toMap[0]).setReactorState();
}

function arrivedDown() {
	em.getChannelServer().getMapFactory().getMap(toMap[0]).broadcastMessage(MaplePacketCreator.serverNotice(6, "電梯門開啟..."));
	em.getChannelServer().getMapFactory().getMap(toMap[0]).resetReactors();
    em.getChannelServer().getMapFactory().getMap(movingElevatorMap[0]).warpEveryone(toMap[0]);
    moving = false;
	nowPos = "down";
}

function prepareGoUp() {
	em.getChannelServer().getMapFactory().getMap(fromMap[1]).broadcastMessage(MaplePacketCreator.serverNotice(6, "電梯 5 秒後即將往玩具城方向移動"));
	em.getChannelServer().getMapFactory().getMap(elevatorMap[1]).broadcastMessage(MaplePacketCreator.serverNotice(6, "電梯 5 秒後即將往玩具城方向移動"));
	preparing = true;
	em.schedule("goUp", 5000);
}

function goUp() {
	em.getChannelServer().getMapFactory().getMap(fromMap[1]).broadcastMessage(MaplePacketCreator.serverNotice(6, "電梯門關閉..."));
	em.getChannelServer().getMapFactory().getMap(toMap[1]).broadcastMessage(MaplePacketCreator.serverNotice(6, "電梯正在前往本樓層..."));
	em.getChannelServer().getMapFactory().getMap(elevatorMap[1]).warpEveryone(movingElevatorMap[1]);
	preparing = false;
    moving = true;
    nowPos = "uping";
    em.schedule("arrivedUp", 10000);
    em.getChannelServer().getMapFactory().getMap(fromMap[1]).setReactorState();
    em.getChannelServer().getMapFactory().getMap(toMap[1]).setReactorState();
}

function arrivedUp() {
	em.getChannelServer().getMapFactory().getMap(toMap[1]).broadcastMessage(MaplePacketCreator.serverNotice(6, "電梯門開啟..."));
	em.getChannelServer().getMapFactory().getMap(toMap[1]).resetReactors();
    em.getChannelServer().getMapFactory().getMap(movingElevatorMap[1]).warpEveryone(toMap[1]);
    moving = false;
	nowPos = "up";
}
