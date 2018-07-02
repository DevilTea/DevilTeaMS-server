/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package deviltea;

import client.MapleCharacter;
import client.MapleClient;
import java.nio.charset.Charset;
import java.util.Scanner;
import net.server.Server;
import net.server.channel.ChannelServer;
import net.server.world.WorldServer;
import tools.MaplePacketCreator;

/**
 *
 * @author DevilTea
 */
public class Console {
    private static Thread thread = null;
    private static Scanner scanner = new Scanner(System.in);
    private static boolean enable = false;
    
    public static void start() {
        Console.enable = true;
        Console.thread = new Thread(new Runnable() {
            
            @Override
            public void run() {
                System.out.println("請輸入指令 : ");
                while(Console.enable) {
                    Console.inputCommand(scanner.nextLine().split(" "));
                }
            }
            
        });
        Console.thread.start();
    }
    
    public static void stop() {
        try {
            Console.enable = false;
            Console.thread.interrupt();
            Console.scanner.close();
            Console.thread = new Thread(Server.getInstance().shutdown(false));
            Console.thread.start();
        } catch(Exception e) {
            System.out.println("Error");
        }
    }
    
    public static void inputCommand(String[] cmd) {
        try {
            switch(cmd[0]) {
                case "help":
                    System.out.println("====修改世界經驗倍率 worldexprate int世界 int倍率");
                    System.out.println("====修改世界掉寶倍率 worlddroprate int世界 int倍率");
                    System.out.println("====修改世界楓幣倍率 worldmesorate int世界 int倍率");
                    System.out.println("====修改世界怪物數量倍率 worldmobspawnrate int世界 int倍率");
                    System.out.println("====世界重新載入Event腳本 worldreloadevent int世界");
                    System.out.println("====所有角色踢下線 dcall");
                    System.out.println("====角色踢下線 dc 名字");
                    System.out.println("====所有角色儲存資料 save");
                    System.out.println("====全伺服器訊息 servermsg 訊息");
                    System.out.println("====世界訊息 worldmsg int世界 訊息");
                    System.out.println("====是否可以登入 canlogin true/false");
                    System.out.println("====關閉伺服器 stop");
                    break;
                case "worldexprate":
                    if(cmd.length > 1)
                        Server.getInstance().getWorld(Integer.parseInt(cmd[1])).setExpRate(Integer.parseInt(cmd[2]));
                    else System.out.println("指令輸入錯誤 !");
                    break;
                case "worlddroprate":
                    if(cmd.length > 1)
                        Server.getInstance().getWorld(Integer.parseInt(cmd[1])).setDropRate(Integer.parseInt(cmd[2]));
                    else System.out.println("指令輸入錯誤 !");
                    break;
                case "worldmesorate":
                    if(cmd.length > 1)
                        Server.getInstance().getWorld(Integer.parseInt(cmd[1])).setMesoRate(Integer.parseInt(cmd[2]));
                    else System.out.println("指令輸入錯誤 !");
                    break;
                case "worldmobspawnrate":
                    if(cmd.length > 1)
                        Server.getInstance().getWorld(Integer.parseInt(cmd[1])).setMobSpawnRate(Integer.parseInt(cmd[2]));
                    else System.out.println("指令輸入錯誤 !");
                    break;
                case "worldreloadevent":
                    if(cmd.length > 1) {
                        for(ChannelServer ch : Server.getInstance().getWorld(Integer.parseInt(cmd[1])).getChannels()) {
                            ch.reloadEventScriptManager();
                        }
                        System.out.println("Event腳本重新載入 !");
                    }
                    else System.out.println("指令輸入錯誤 !");
                    break;
                case "dcall":
                    for(WorldServer wd : Server.getInstance().getWorlds()) {
                        for (MapleCharacter player : wd.getPlayerStorage().getAllCharacters()) {
                            if (!player.isGM()){
                                    player.getClient().disconnect(true, Server.getInstance().getPlayerByName(cmd[1]).getCashShop().isOpened());
                            }
                        }
                    }
                    System.out.println("強制 GM 外所有角色下線");
                    break;
                case "dc":
                    if(cmd.length > 1) {
                        if(Server.getInstance().getPlayerByName(cmd[1]) != null) {
                            MapleClient mc = Server.getInstance().getPlayerByName(cmd[1]).getClient();
                            mc.disconnect(false, Server.getInstance().getPlayerByName(cmd[1]).getCashShop().isOpened());
                            System.out.println("強制 " + cmd[1] + "下線");
                        }
                    } else System.out.println("指令輸入錯誤 !");
                    break;
                case "save":
                    for (WorldServer world : Server.getInstance().getWorlds()) {
                        for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
                                chr.saveToDB();
                        }
                    }
                    System.out.println("儲存所有角色完成 !");
                    break;
                case "servermsg":
                    if(cmd.length > 1) {
                        String servermsg = "[伺服器訊息]";
                        for(int i=1;i<cmd.length;i++) servermsg += (" " + cmd[i]);
                        Server.getInstance().broadcastMessage(MaplePacketCreator.sendYellowTip(servermsg));
                    } else System.out.println("指令輸入錯誤 !");
                    break;
                case "worldmsg":
                    if(cmd.length > 2) {
                        String worldmsg = "[世界訊息]";
                        for(int i=2;i<cmd.length;i++) worldmsg += (" " + cmd[i]);
                        for (ChannelServer ch : Server.getInstance().getChannelsFromWorld(Integer.parseInt(cmd[1]))) {
                            ch.broadcastPacket(MaplePacketCreator.sendYellowTip(worldmsg));
                        }
                    } else System.out.println("指令輸入錯誤 !");
                    break;
                case "canlogin":
                    Server.getInstance().setCanLogin(Boolean.parseBoolean(cmd[1]));
                    System.out.println((Server.getInstance().canLogin() ? "開放" : "停止") + "登入伺服器功能!");
                    break;
                case "stop":
                    Console.stop();
                    break;
                default:
                    if(!cmd[0].isEmpty()) System.out.println("未知的指令 !");
                    break;
            }
        } catch(Exception e) {
            System.out.println("哪裡錯了?!");
        }
    }
}