/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package deviltea;

/**
 *
 * @author user
 */
public class JobName {
    public static String getJobName(int jobid) {
        String jname = "無";
        switch(jobid) {
            case 0:
                jname = "初心者";
                break;
            case 100:
                jname = "劍士";
                break;
            case 110:
                jname = "狂戰士";
                break;
            case 111:
                jname = "十字軍";
                break;
            case 112:
                jname = "英雄";
                break;
            case 120:
                jname = "見習騎士";
                break;
            case 121:
                jname = "騎士";
                break;
            case 122:
                jname = "聖騎士";
                break;
            case 130:
                jname = "槍騎兵";
                break;
            case 131:
                jname = "龍騎士";
                break;
            case 132:
                jname = "黑騎士";
                break;
            case 200:
                jname = "法師";
                break;
            case 210:
                jname = "巫師（火、毒）";
                break;
            case 211:
                jname = "魔導士（火、毒）";
                break;
            case 212:
                jname = "大魔導士（火、毒）";
                break;
            case 220:
                jname = "巫師（冰、雷）";
                break;
            case 221:
                jname = "魔導士（冰、雷）";
                break;
            case 222:
                jname = "大魔導士（冰、雷）";
                break;
            case 230:
                jname = "僧侶";
                break;
            case 231:
                jname = "祭司";
                break;
            case 232:
                jname = "主教";
                break;
            case 300:
                jname = "弓箭手";
                break;
            case 310:
                jname = "獵人";
                break;
            case 311:
                jname = "遊俠";
                break;
            case 312:
                jname = "箭神";
                break;
            case 320:
                jname = "弩弓手";
                break;
            case 321:
                jname = "狙擊手";
                break;
            case 322:
                jname = "神射手";
                break;
            case 400:
                jname = "盜賊";
                break;
            case 410:
                jname = "刺客";
                break;
            case 411:
                jname = "暗殺者";
                break;
            case 412:
                jname = "夜使者";
                break;
            case 420:
                jname = "俠盜";
                break;
            case 421:
                jname = "神偷";
                break;
            case 422:
                jname = "暗影神偷";
                break;
            case 500:
                jname = "海盜";
                break;
            case 510:
                jname = "打手";
                break;
            case 511:
                jname = "格鬥家";
                break;
            case 512:
                jname = "拳霸";
                break;
            case 520:
                jname = "槍手";
                break;
            case 521:
                jname = "神槍手";
                break;
            case 522:
                jname = "槍神";
                break;
            case 1000:
                jname = "貴族";
                break;
            case 1100:
                jname = "聖魂劍士I";
                break;
            case 1110:
                jname = "聖魂劍士II";
                break;
            case 1111:
                jname = "聖魂劍士III";
                break;
            case 1112:
                jname = "聖魂劍士IIII";
                break;
            case 1200:
                jname = "烈焰巫師I";
                break;
            case 1210:
                jname = "烈焰巫師II";
                break;
            case 1211:
                jname = "烈焰巫師III";
                break;
            case 1212:
                jname = "烈焰巫師IIII";
                break;
            case 1300:
                jname = "破風使者I";
                break;
            case 1310:
                jname = "破風使者II";
                break;
            case 1311:
                jname = "破風使者III";
                break;
            case 1312:
                jname = "破風使者IIII";
                break;
            case 1400:
                jname = "暗夜行者I";
                break;
            case 1410:
                jname = "暗夜行者II";
                break;
            case 1411:
                jname = "暗夜行者III";
                break;
            case 1412:
                jname = "暗夜行者IIII";
                break;
            case 1500:
                jname = "閃雷悍將I";
                break;
            case 1510:
                jname = "閃雷悍將II";
                break;
            case 1511:
                jname = "閃雷悍將III";
                break;
            case 1512:
                jname = "閃雷悍將IIII";
                break;
            case 2000:
                jname = "傳說";
                break;
            case 2100:
                jname = "狂狼勇士I";
                break;
            case 2110:
                jname = "狂狼勇士II";
                break;
            case 2111:
                jname = "狂狼勇士III";
                break;
            case 2112:
                jname = "狂狼勇士IIII";
                break;
        }
        return jname;
    }
}
