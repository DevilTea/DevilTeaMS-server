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
package net.server.handlers.login;

import java.util.Calendar;

import net.MaplePacketHandler;
import server.TimerManager;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import client.MapleClient;
import constants.ServerConstants;
import deviltea.AutoRegister;
import deviltea.AutoUnstuck;
import net.server.Server;

public final class LoginPasswordHandler implements MaplePacketHandler {

    @Override
    public boolean validateState(MapleClient c) {
        return !c.isLoggedIn();
    }
    

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
    	
        String login = slea.readMapleAsciiString();
        String pwd = slea.readMapleAsciiString();
        c.setAccountName(login);
        /*=====================================================================================*/
        //AutoRegister
        if(login.toLowerCase().equals("register") && pwd.toLowerCase().equals("register") && ServerConstants.ENABLE_AUTO_REGISTER) {
            c.setAutoRegister(null);
            c.setAutoRegister(new AutoRegister(c));
            c.announce(MaplePacketCreator.getLoginFailed(1));
            c.announce(MaplePacketCreator.serverNotice(6, ":::自動註冊系統:::\r\n請輸入您要註冊的帳號密碼\r\n若要取消請在帳號欄密碼欄密碼欄輸入\r\nCancel"));
            return;
        } else if(c.getAutoRegister() != null) {
            if(login.toLowerCase().equals("cancel")) {
                c.setAutoRegister(null);
                c.announce(MaplePacketCreator.getLoginFailed(1));
                c.announce(MaplePacketCreator.serverNotice(6, ":::自動註冊系統:::\r\n已取消註冊"));
                return;
            }
            if(c.getAutoRegister().getStep() == 0) {//輸入第一次帳密，檢查是否為已存在帳號
                if(!c.getAutoRegister().isLoginIdExist(login)) {
                    c.getAutoRegister().setStep(c.getAutoRegister().getStep() + 1);
                    c.getAutoRegister().fistInput(login, pwd);
                    c.announce(MaplePacketCreator.getLoginFailed(1));
                    c.announce(MaplePacketCreator.serverNotice(6, ":::自動註冊系統:::\r\n請再次輸入您要註冊的帳號密碼\r\n若要取消請在帳號欄密碼欄輸入\r\nCancel"));
                    return;
                } else {
                    c.announce(MaplePacketCreator.getLoginFailed(1));
                    c.announce(MaplePacketCreator.serverNotice(6, ":::自動註冊系統:::\r\n此帳號已存在\r\n請重新輸入您要註冊的帳號密碼\r\n若要取消請在帳號欄密碼欄輸入\r\nCancel"));
                    return;
                }
            } else if(c.getAutoRegister().getStep() == 1) {//再次輸入帳號密碼，檢查無誤後註冊
                if(c.getAutoRegister().checkAgain(login, pwd)) {
                    if(c.getAutoRegister().register(login, pwd)) {
                        c.setAutoRegister(null);
                        c.announce(MaplePacketCreator.getLoginFailed(1));
                        c.announce(MaplePacketCreator.serverNotice(6, ":::自動註冊系統:::\r\n註冊成功\r\n您已經可以使用此帳號密碼登入"));
                        return;
                    } else {
                        c.setAutoRegister(null);
                        c.announce(MaplePacketCreator.getLoginFailed(1));
                        c.announce(MaplePacketCreator.serverNotice(6, ":::自動註冊系統:::\r\n註冊失敗\r\n請再次嘗試註冊"));
                        return;
                    }
                } else {
                    c.announce(MaplePacketCreator.getLoginFailed(1));
                    c.announce(MaplePacketCreator.serverNotice(6, ":::自動註冊系統:::\r\n兩次輸入資料不相同\r\n請重新輸入您要註冊的帳號密碼\r\n若要取消請在帳號密碼欄欄輸入\r\nCancel"));
                    return;
                }
            }
        }
        
        /*=====================================================================================*/
        
        /*=====================================================================================*/
        //AutoUnstuck
        if(login.toLowerCase().equals("unstuck") && pwd.toLowerCase().equals("unstuck") && ServerConstants.ENABLE_AUTO_UNSTUCK) {
            c.setAutoUnstuck(null);
            c.setAutoUnstuck(new AutoUnstuck(c));
            c.announce(MaplePacketCreator.getLoginFailed(1));
            c.announce(MaplePacketCreator.serverNotice(6, ":::自動解卡系統:::\r\n請輸入您要解卡的帳號密碼\r\n若要取消請在帳號欄密碼欄密碼欄輸入\r\nCancel"));
            return;
        } else if(c.getAutoUnstuck() != null) {
            if(login.toLowerCase().equals("cancel")) {
                c.setAutoUnstuck(null);
                c.announce(MaplePacketCreator.getLoginFailed(1));
                c.announce(MaplePacketCreator.serverNotice(6, ":::自動解卡系統:::\r\n已取消解卡"));
                return;
            }
            if(c.getAutoUnstuck().isLoginIdExist(login)) {
                if(c.getAutoUnstuck().checkIdPassword(login, pwd)) {
                    if(c.getAutoUnstuck().getStep() == 0) {
                        if(!c.getAutoUnstuck().hasPlayerOnline(login)) {
                            if(c.getAutoUnstuck().unstuck(login)) {
                                c.setAutoUnstuck(null);
                                c.announce(MaplePacketCreator.getLoginFailed(1));
                                c.announce(MaplePacketCreator.serverNotice(6, ":::自動解卡系統:::\r\n解卡成功\r\n請重登入遊戲"));
                                return;
                            } else {
                                c.setAutoUnstuck(null);
                                c.announce(MaplePacketCreator.getLoginFailed(1));
                                c.announce(MaplePacketCreator.serverNotice(6, ":::自動解卡系統:::\r\n解卡失敗\r\n請重新進入解卡模式再進行嘗試解卡"));
                                return;
                            }
                        } else {
                            c.announce(MaplePacketCreator.getLoginFailed(1));
                            c.announce(MaplePacketCreator.serverNotice(6, ":::自動解卡系統:::\r\n解卡失敗\r\n已有此帳號角色進入遊戲中\r\n若要強行解卡請再次輸入帳號密碼\r\n若要取消請在帳號欄密碼欄密碼欄輸入\r\nCancel"));
                            return;
                        }
                    } else if(c.getAutoUnstuck().getStep() == 1) {
                        if(c.getAutoUnstuck().unstuck(login)) {
                            c.setAutoUnstuck(null);
                            c.announce(MaplePacketCreator.getLoginFailed(1));
                            c.announce(MaplePacketCreator.serverNotice(6, ":::自動解卡系統:::\r\n解卡成功\r\n請重登入遊戲"));
                            return;
                        } else {
                            c.setAutoUnstuck(null);
                            c.announce(MaplePacketCreator.getLoginFailed(1));
                            c.announce(MaplePacketCreator.serverNotice(6, ":::自動解卡系統:::\r\n解卡失敗\r\n請重新進入解卡模式再進行嘗試解卡"));
                            return;
                        }
                    }
                } else {
                    c.announce(MaplePacketCreator.getLoginFailed(1));
                    c.announce(MaplePacketCreator.serverNotice(6, ":::自動解卡系統:::\r\n此密碼不正確\r\n請再次輸入帳號密碼\r\n若要取消請在帳號欄密碼欄密碼欄輸入\r\nCancel"));
                    return;
                }
            } else {
                c.announce(MaplePacketCreator.getLoginFailed(1));
                c.announce(MaplePacketCreator.serverNotice(6, ":::自動解卡系統:::\r\n此帳號不存在\r\n請再次輸入帳號密碼\r\n若要取消請在帳號欄密碼欄密碼欄輸入\r\nCancel"));
                return;
            }
        }
        
        /*=====================================================================================*/
        
        if(!Server.getInstance().canLogin()) {
            c.announce(MaplePacketCreator.getLoginFailed(1));
            c.announce(MaplePacketCreator.serverNotice(6, "伺服器目前停止開放登入"));
            return;
        }
        
        int loginok = c.login(login, pwd);
        
        if (c.hasBannedIP() || c.hasBannedMac()) {
            c.announce(MaplePacketCreator.getLoginFailed(3));
            return;
        }
        Calendar tempban = c.getTempBanCalendar();
        if (tempban != null) {
            if (tempban.getTimeInMillis() > System.currentTimeMillis()) {
                c.announce(MaplePacketCreator.getTempBan(tempban.getTimeInMillis(), c.getGReason()));
                return;
            }
        }
        
        if (loginok == 3) {
            c.announce(MaplePacketCreator.getPermBan(c.getGReason()));//crashes but idc :D
            return;
        } else if (loginok != 0) {
            if(loginok == 5 && ServerConstants.ENABLE_AUTO_REGISTER) {
                c.announce(MaplePacketCreator.serverNotice(6, "還沒有帳號嗎?\r\n在帳號密碼欄位輸入\r\nRegister\r\n進行註冊吧!"));
            } else if(loginok == 7 && ServerConstants.ENABLE_AUTO_UNSTUCK) {
                c.announce(MaplePacketCreator.serverNotice(6, "明明沒有登入，帳號卻顯示已登入?\r\n在帳號密碼欄位輸入\r\nUnstuck\r\n進行解卡吧!"));
            }
            c.announce(MaplePacketCreator.getLoginFailed(loginok));
            return;
        }
        if (c.finishLogin() == 0) {
            login(c);
        } else {
            c.announce(MaplePacketCreator.getLoginFailed(7));
        }
    }
    
    private static void login(MapleClient c){
        c.announce(MaplePacketCreator.getAuthSuccess(c));//why the fk did I do c.getAccountName()?
        final MapleClient client = c;
        c.setIdleTask(TimerManager.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                client.disconnect(false, false);
            }
        }, 600000));
    }
}
