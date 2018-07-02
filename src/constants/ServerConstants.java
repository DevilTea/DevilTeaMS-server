package constants;

import java.io.FileInputStream;
import java.util.Properties;

public class ServerConstants {

    public static short VERSION = 83;
    public static String[] WORLD_NAMES = {"Scania", "Bera", "Broa", "Windia", "Khaini", "Bellocan", "Mardia", "Kradia", "Yellonde", "Demethos", "Galicia", "El Nido", "Zenith", "Arcenia", "Kastia", "Judis", "Plana", "Kalluna", "Stius", "Croa", "Medere"};
    public static final int MAXIMUM_CONNECTIONS = 500;
// Login Configuration
    public static final int CHANNEL_LOAD = 100;//Players per channel
    public static final long RANKING_INTERVAL = 60 * 60 * 1000;//60 minutes, 3600000
    public static final boolean ENABLE_PIC = true;//needed when delete character. lol:P
    //Event Configuration
    public static final boolean PERFECT_PITCH = false;
    // IP Configuration
    public static String HOST;
    //Database Configuration
    public static String DB_URL = "";
    public static String DB_USER = "";
    public static String DB_PASS = "";
    //Other Configuration
    public static boolean JAVA_8;
    public static boolean SHUTDOWNHOOK;
    //Gameplay Configurations
    public static final boolean ENABLE_AUTO_REGISTER = true;
    public static final boolean ENABLE_AUTO_UNSTUCK = true;
    public static final boolean USE_MTS = true;
    public static final boolean USE_FAMILY_SYSTEM = false;
    public static final boolean USE_DUEY = false;
    public static final boolean USE_ITEM_SORT = true;
    public static final boolean USE_PARTY_SEARCH = false;
    public static final short EQUIP_MAX_LEVEL = 10;
    public static final int MAX_LEVEL = 200;
    //Rates
    public static final int GACHAEXP_RATE = 1;
    public static final int EXP_RATE = 1;
    public static final int MESO_RATE = 1;
    public static final int DROP_RATE = 1;
    public static final int BOSS_DROP_RATE = 2;
    public static final int MOB_SPAWN_RATE = 1;// the rate of mob's quantity in map
    public static final int PARTY_EXPERIENCE_MOD = 1; // change for event stuff
    public static final double PQ_BONUS_EXP_MOD = 0.5;

    public static final long EVENT_END_TIMESTAMP = 1428897600000L;
    static {
        Properties p = new Properties();
        try {
            p.load(new FileInputStream("configuration.ini"));

            //SERVER
            ServerConstants.HOST = p.getProperty("HOST");

            //SQL DATABASE
            ServerConstants.DB_URL = p.getProperty("URL");
            ServerConstants.DB_USER = p.getProperty("DB_USER");
            ServerConstants.DB_PASS = p.getProperty("DB_PASS");

            //OTHER
            ServerConstants.JAVA_8 = p.getProperty("JAVA8").equalsIgnoreCase("TRUE");
            ServerConstants.SHUTDOWNHOOK = p.getProperty("SHUTDOWNHOOK").equalsIgnoreCase("true");
            
        } catch (Exception e) {
            System.out.println("Failed to load configuration.ini.");
            System.exit(0);
        }
    }
}
