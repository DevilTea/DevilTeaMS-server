/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package deviltea;

import client.MapleCharacter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import tools.DatabaseConnection;

/**
 *
 * @author DevilTeaNB
 */
public class TaskRecord {
    
    public static final int TASK_FOR_ACCOUNT = 0;
    public static final int TASK_FOR_CHARACTER = 1;
    
    private int aid = -1, cid = -1;
    private boolean byAid = true, byCid = true;
    
    public TaskRecord(int aid, int cid, int mode) {
        this.aid = aid;
        this.cid = cid;
        if(mode == TASK_FOR_ACCOUNT) {
            byAid = true;
            byCid = false;
        } else if(mode == TASK_FOR_CHARACTER) {
            byAid = true;
            byCid = true;
        }
    }
    
    public static TaskRecord getInstance(int aid, int cid, int mode) {
        return (new TaskRecord(aid, cid, mode));
    }
    
    public boolean recordTask(String taskname, long recordTime, int recordCount) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps;
        try {
            if(!isTaskRecordExist(taskname)) {
                ps = con.prepareStatement("INSERT INTO taskrecord (accid, characterid, taskname, recordtime, recordcount) VALUES (?, ?, ?, ?, ?)");
                ps.setInt(1, byAid ? this.aid : -1);
                ps.setInt(2, byCid ? this.cid : -1);
                ps.setString(3, taskname);
                ps.setLong(4, recordTime);
                ps.setInt(5, recordCount);
                ps.executeUpdate();
            } else {
                String sql = "UPDATE taskrecord SET recordtime = ?, recordcount = ? WHERE taskname = ?";
                sql += " AND accid = " + (byAid ? this.aid : -1);
                sql += " AND characterid = " + (byAid ? this.cid : -1);
                ps = con.prepareStatement(sql);
                ps.setLong(1, recordTime);
                ps.setInt(2, recordCount);
                ps.setString(3, taskname);
                ps.executeUpdate();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }
    
    public boolean deleteTaskRecord(String taskname) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps;
        try {
            String sql = "DELETE FROM taskrecord WHERE taskname = ?";
            sql += " AND accid = " + (byAid ? this.aid : -1);
            sql += " AND characterid = " + (byAid ? this.cid : -1);
            ps = con.prepareStatement(sql);
            ps.setString(1, taskname);
            ps.executeUpdate();
        } catch (SQLException ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }
    
    public boolean isTaskRecordExist(String taskname) {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps;
        ResultSet rs;
        try {
            String sql = "SELECT * FROM taskrecord WHERE taskname = ?";
            sql += " AND accid = " + (byAid ? this.aid : -1);
            sql += " AND characterid = " + (byAid ? this.cid : -1);
            ps = con.prepareStatement(sql);
            ps.setString(1, taskname);
            rs = ps.executeQuery();
            if(rs.next()) {
                return true;
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
            return false;
        }
        return false;
    }
    
    public long getRecordTime(String taskname) {
        long time = -1;
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps;
        ResultSet rs;
        try {
            String sql = "SELECT recordtime FROM taskrecord WHERE taskname = ?";
            sql += " AND accid = " + (byAid ? this.aid : -1);
            sql += " AND characterid = " + (byAid ? this.cid : -1);
            ps = con.prepareStatement(sql);
            ps.setString(1, taskname);
            rs = ps.executeQuery();
            if(rs.next()) {
                time = rs.getLong("recordtime");
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return time;
    }
    
    public int getRecordCount(String taskname) {
        int count = 0;
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps;
        ResultSet rs;
        try {
            String sql = "SELECT recordcount FROM taskrecord WHERE taskname = ?";
            sql += " AND accid = " + (byAid ? this.aid : -1);
            sql += " AND characterid = " + (byAid ? this.cid : -1);
            ps = con.prepareStatement(sql);
            ps.setString(1, taskname);
            rs = ps.executeQuery();
            if(rs.next()) {
                count = rs.getInt("recordcount");
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return count;
    }
    
    public boolean checkCount(String taskname, int limitCount) {
        int recordCount = this.getRecordCount(taskname);
        if(recordCount < limitCount) return true;
        else return false;
    }
    
    public boolean checkTimeByDay(String taskname, int limitDay) {
        long nowDay = (long) Math.ceil(((new Date()).getTime()) / (double) (24 * 60 * 60 * 1000));
        long recordDay = (long) Math.ceil((getRecordTime(taskname)) / (double) (24 * 60 * 60 * 1000));
        if((nowDay - recordDay) > limitDay) return true;
        else return false;
    }
    
    public boolean checkTimeByHour(String taskname, int limitHour) {
        if((((new Date()).getTime()) - (getRecordTime(taskname))) > (long) limitHour * (60 * 60 * 1000)) return true;
        else return false;
    }
    
    public boolean checkTimeByMinute(String taskname, int limitMinute) {
        if((((new Date()).getTime()) - (getRecordTime(taskname))) > (long) limitMinute * (60 * 1000)) return true;
        else return false;
    }
    
    public boolean checkTimeBySecond(String taskname, int limitSecond) {
        if((((new Date()).getTime()) - (getRecordTime(taskname))) > (long) limitSecond * (1000)) return true;
        else return false;
    }
}
