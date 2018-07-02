/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package deviltea;

import client.MapleClient;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import tools.DatabaseConnection;
import tools.HexTool;

/**
 *
 * @author DevilTeaNB
 */
public class AutoRegister {
    private MapleClient c = null;
    private int step;
    private String loginidTemp;
    private String passwordTemp;
    
    public AutoRegister(MapleClient c) {
        this.c = c;
        this.step = 0;
    }
    
    public int getStep() {
        return step;
    }
    
    public void setStep(int step) {
        this.step = step;
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
    
    public boolean checkAgain(String loginid, String password) {
        return (loginid.equals(this.loginidTemp) && password.equals(this.passwordTemp));
    }
    
    public void fistInput(String loginid, String password) {
        this.loginidTemp = loginid;
        this.passwordTemp = password;
    }
    
    public boolean register(String loginid, String password) {
        String hash;
        try {
            MessageDigest digester = MessageDigest.getInstance("SHA-1");
            digester.update(password.getBytes("UTF-8"), 0, password.length());
            hash = HexTool.toString(digester.digest()).replace(" ", "").toLowerCase();
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            //throw new RuntimeException("Encoding the string failed", e);
            e.printStackTrace();
            return false;
        }
        
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement("INSERT INTO accounts (name, password, tos) VALUES (?, ?, ?)");
            ps.setString(1, loginid);
            ps.setString(2, hash);
            ps.setInt(3, 1);
            ps.executeUpdate();
        } catch (SQLException e) {
                e.printStackTrace();
                return false;
        } finally {
            try {
                if (ps != null && !ps.isClosed()) {
                    ps.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
                return false;
            }
        }
        return true;
    }
}
