/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package deviltea;

import client.MapleCharacter;
import client.MapleClient;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.server.Server;
import net.server.channel.ChannelServer;
import net.server.world.WorldServer;
import tools.DatabaseConnection;
import tools.HexTool;
import tools.MaplePacketCreator;

/**
 *
 * @author DevilTea
 */
public class AutoUnstuck {
    private MapleClient c = null;
    private int step;
    
    public AutoUnstuck(MapleClient c) {
        this.c = c;
        this.step = 0;
    }
    
    public int getStep() {
        return step;
    }
    
    public void setStep(int newStep) {
        step = newStep;
    }
    
    public boolean isLoginIdExist(String loginid) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        boolean bool = false;
        try {
            ps = con.prepareStatement("SELECT id FROM accounts WHERE name = ?");
            ps.setString(1, loginid);
            rs = ps.executeQuery();
            if (rs.next()) {
                bool = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ps != null && !ps.isClosed()) {
                        ps.close();
                }
                if (rs != null && !rs.isClosed()) {
                        rs.close();
                }
            } catch (SQLException e) {
            }
        }
        return bool;
    }
    
    public boolean checkIdPassword(String loginid, String pwd) {
        
        if(!isLoginIdExist(loginid)) return false;
        
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        boolean bool = false;
        
        try {
            ps = con.prepareStatement("SELECT password FROM accounts WHERE name = ?");
            ps.setString(1, loginid);
            rs = ps.executeQuery();
            if (rs.next()) {
                String password = rs.getString("password");
                if(password.equals(pwd) || checkHash(pwd, password)) {
                    bool = true;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ps != null && !ps.isClosed()) {
                        ps.close();
                }
                if (rs != null && !rs.isClosed()) {
                        rs.close();
                }
            } catch (SQLException e) {
            }
        }
        return bool;
    }
    
    public boolean checkHash(String password, String hash) {
        try {
            MessageDigest digester = MessageDigest.getInstance("SHA-1");
            digester.update(password.getBytes("UTF-8"), 0, password.length());
            return(HexTool.toString(digester.digest()).replace(" ", "").toLowerCase().equals(hash));
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            //throw new RuntimeException("Encoding the string failed", e);
            e.printStackTrace();
            return false;
        }
    }
    
    public boolean hasPlayerOnline(String loginid) {
        if(!isLoginIdExist(loginid)) return false;
        
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        int accountId = 0;
        boolean bool = false;
        try {
            ps = con.prepareStatement("SELECT id FROM accounts WHERE name = ?");
            ps.setString(1, loginid);
            rs = ps.executeQuery();
            if (rs.next()) {
                accountId = rs.getInt("id");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ps != null && !ps.isClosed()) {
                        ps.close();
                }
                if (rs != null && !rs.isClosed()) {
                        rs.close();
                }
            } catch (SQLException e) {
            }
        }
        for(WorldServer wd : Server.getInstance().getWorlds()) {
            for(MapleCharacter chr : wd.getPlayerStorage().getAllCharacters()) {
                if(chr.getAccountID() == accountId) {
                    step++;
                    bool = true;
                    break;
                }
            }
        }
        return bool;
    }
    
    public boolean unstuck(String loginid) {
        
        if(!isLoginIdExist(loginid)) return false;
        
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        int accountId = 0;
        boolean bool = false, bool2 = false;
        try {
            ps = con.prepareStatement("SELECT id FROM accounts WHERE name = ?");
            ps.setString(1, loginid);
            rs = ps.executeQuery();
            if (rs.next()) {
                accountId = rs.getInt("id");
            }
            ps = con.prepareStatement("UPDATE accounts SET loggedin = 0 WHERE name = ?");
            ps.setString(1, loginid);
            ps.executeUpdate();
            bool = true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ps != null && !ps.isClosed()) {
                        ps.close();
                }
                if (rs != null && !rs.isClosed()) {
                        rs.close();
                }
            } catch (SQLException e) {
            }
        }
        bool2 = false;
        for(WorldServer ws : Server.getInstance().getWorlds()) {
            for(ChannelServer cs : ws.getChannels()) {
                for(MapleCharacter chr : cs.getPlayerStorage().getAllCharacters()) {
                    if(chr.getAccountID() == accountId) {
                        MapleClient client = chr.getClient();

                        client.getSession().writeAndFlush(MaplePacketCreator.serverNotice(1, "[警告] 帳號被他人登入，3秒後即將斷線"));

                        Thread closeSession = new Thread(new Runnable() {
                            @Override
                            public void run() {
                                try {
                                    Thread.sleep(3000);
                                } catch (InterruptedException ignored) {
                                }
                                cs.removePlayer(chr);
                                ws.removePlayer(chr);
                                client.getSession().close();
                            }
                        });

                        try {
                            closeSession.start();
                            bool2 = true;
                        } catch (Exception ignored) {
                            bool2 = false;
                        }
                        long nowTime = System.currentTimeMillis();
                        while(System.currentTimeMillis() - nowTime < 3000) {
                            //Just wait for 3 seconds lol:D
                        }
                    }
                }
            }
        }
        return bool;
    }
}
