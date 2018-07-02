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
package client.inventory;

import client.MapleClient;
import constants.ExpTable;
import constants.ItemConstants;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import server.MapleItemInformationProvider;
import tools.MaplePacketCreator;
import tools.Pair;

public class Equip extends Item {

    public static enum ScrollResult {

        FAIL(0), SUCCESS(1), CURSE(2);
        private int value = -1;

        private ScrollResult(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }
    private byte upgradeSlots;
    private byte level, flag, itemLevel;
    private short str, dex, _int, luk, hp, mp, watk, matk, wdef, mdef, acc, avoid, hands, speed, jump, vicious;
    private float itemExp;
    private int ringid = -1;
    private boolean wear = false;

    public Equip(int id, short position) {
        super(id, position, (short) 1);
        this.itemExp = 0;
        this.itemLevel = 1;
    }

    public Equip(int id, short position, int slots) {
        super(id, position, (short) 1);
        this.upgradeSlots = (byte) slots;
        this.itemExp = 0;
        this.itemLevel = 1;
    }

    @Override
    public Item copy() {
        Equip ret = new Equip(getItemId(), getPosition(), getUpgradeSlots());
        ret.str = str;
        ret.dex = dex;
        ret._int = _int;
        ret.luk = luk;
        ret.hp = hp;
        ret.mp = mp;
        ret.matk = matk;
        ret.mdef = mdef;
        ret.watk = watk;
        ret.wdef = wdef;
        ret.acc = acc;
        ret.avoid = avoid;
        ret.hands = hands;
        ret.speed = speed;
        ret.jump = jump;
        ret.flag = flag;
        ret.vicious = vicious;
        ret.upgradeSlots = upgradeSlots;
        ret.itemLevel = itemLevel;
        ret.itemExp = itemExp;
        ret.level = level;
        ret.log = new LinkedList<>(log);
        ret.setOwner(getOwner());
        ret.setQuantity(getQuantity());
        ret.setExpiration(getExpiration());
        ret.setGiftFrom(getGiftFrom());
        return ret;
    }

    @Override
    public byte getFlag() {
        return flag;
    }

    @Override
    public byte getType() {
        return 1;
    }

    public byte getUpgradeSlots() {
        return upgradeSlots;
    }

    public short getStr() {
        return str;
    }

    public short getDex() {
        return dex;
    }

    public short getInt() {
        return _int;
    }

    public short getLuk() {
        return luk;
    }

    public short getHp() {
        return hp;
    }

    public short getMp() {
        return mp;
    }

    public short getWatk() {
        return watk;
    }

    public short getMatk() {
        return matk;
    }

    public short getWdef() {
        return wdef;
    }

    public short getMdef() {
        return mdef;
    }

    public short getAcc() {
        return acc;
    }

    public short getAvoid() {
        return avoid;
    }

    public short getHands() {
        return hands;
    }

    public short getSpeed() {
        return speed;
    }

    public short getJump() {
        return jump;
    }

    public short getVicious() {
        return vicious;
    }

    @Override
    public void setFlag(byte flag) {
        this.flag = flag;
    }

    public void setStr(short str) {
        this.str = str;
    }

    public void setDex(short dex) {
        this.dex = dex;
    }

    public void setInt(short _int) {
        this._int = _int;
    }

    public void setLuk(short luk) {
        this.luk = luk;
    }

    public void setHp(short hp) {
        this.hp = hp;
    }

    public void setMp(short mp) {
        this.mp = mp;
    }

    public void setWatk(short watk) {
        this.watk = watk;
    }

    public void setMatk(short matk) {
        this.matk = matk;
    }

    public void setWdef(short wdef) {
        this.wdef = wdef;
    }

    public void setMdef(short mdef) {
        this.mdef = mdef;
    }

    public void setAcc(short acc) {
        this.acc = acc;
    }

    public void setAvoid(short avoid) {
        this.avoid = avoid;
    }

    public void setHands(short hands) {
        this.hands = hands;
    }

    public void setSpeed(short speed) {
        this.speed = speed;
    }

    public void setJump(short jump) {
        this.jump = jump;
    }

    public void setVicious(short vicious) {
        this.vicious = vicious;
    }

    public void setUpgradeSlots(byte upgradeSlots) {
        this.upgradeSlots = upgradeSlots;
    }

    public byte getLevel() {
        return level;
    }

    public void setLevel(byte level) {
        this.level = level;
    }
    //Original
    /*public void gainLevel(MapleClient c) {
        List<Pair<String, Integer>> stats = MapleItemInformationProvider.getInstance().getItemLevelupStats(getItemId(), itemLevel);
        for (Pair<String, Integer> stat : stats) {
            switch (stat.getLeft()) {
                case "incDEX":
                    dex += stat.getRight();
                    break;
                case "incSTR":
                    str += stat.getRight();
                    break;
                case "incINT":
                    _int += stat.getRight();
                    break;
                case "incLUK":
                    luk += stat.getRight();
                    break;
                case "incMHP":
                    hp += stat.getRight();
                    break;
                case "incMMP":
                    mp += stat.getRight();
                    break;
                case "incPAD":
                    watk += stat.getRight();
                    break;
                case "incMAD":
                    matk += stat.getRight();
                    break;
                case "incPDD":
                    wdef += stat.getRight();
                    break;
                case "incMDD":
                    mdef += stat.getRight();
                    break;
                case "incEVA":
                    avoid += stat.getRight();
                    break;
                case "incACC":
                    acc += stat.getRight();
                    break;
                case "incSpeed":
                    speed += stat.getRight();
                    break;
                case "incJump":
                    jump += stat.getRight();
                    break;
            }
        }
        this.itemLevel++;
        c.announce(MaplePacketCreator.showEquipmentLevelUp());
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showForeignEffect(c.getPlayer().getId(), 15));
        c.getPlayer().forceUpdateItem(this);
    }

    public void gainItemExp(MapleClient c, int gain) {
        List<Pair<String, Integer>> stats = MapleItemInformationProvider.getInstance().getItemLevelupStats(getItemId(), itemLevel);
        int expneeded = 0;
        for (Pair<String, Integer> stat : stats) {
            if(stat.getLeft().equals("exp")) expneeded = stat.getRight();
        }
        if(expneeded != 0) {
            float modifier = 364 / expneeded;
            float exp = (expneeded / (1000000 * modifier * modifier)) * gain;
            itemExp += exp;
            if (itemExp >= 364) {
                itemExp = (itemExp - 364);
                gainLevel(c);
            } else {
                c.getPlayer().forceUpdateItem(this);
            }
        }
    }*/

    //DevilTea lol:D
    public void gainItemExp(MapleClient c, int gain) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        int expneeded = ExpTable.getEquipExpNeededForLevel(getItemLevel()) ;
        int reqLevel = ii.getEquipStats(this.getItemId()).get("reqLevel");
        float exp = reqLevel == 0 ? gain : (gain / reqLevel);
        itemExp += Math.min(exp, 1000);
        if (itemExp >= expneeded) {
            while(itemExp >= expneeded) {
                itemExp -= expneeded;
                gainLevel(c);
                expneeded = ExpTable.getEquipExpNeededForLevel(getItemLevel()) ;
            }
        } else {
            c.getPlayer().forceUpdateItem(this);
        }
    }
    
    public void gainLevel(MapleClient c) {
        if(this.dex > 0) this.dex = (short) Math.min(Short.MAX_VALUE, this.dex + ((Math.floor(Math.random()) * 2) + 2));
        if(this.str > 0) this.str = (short) Math.min(Short.MAX_VALUE, this.str + ((Math.floor(Math.random()) * 2) + 2));
        if(this.luk > 0) this.luk = (short) Math.min(Short.MAX_VALUE, this.luk + ((Math.floor(Math.random()) * 2) + 2));
        if(this._int > 0) this._int = (short) Math.min(Short.MAX_VALUE, this._int + ((Math.floor(Math.random()) * 2) + 2));
        if(this.hp > 0 || Math.random() > 0.9) this.hp = (short) Math.min(Short.MAX_VALUE, this.hp + ((Math.floor(Math.random()) * 6) + 5));
        if(this.mp > 0 || Math.random() > 0.9) this.mp = (short) Math.min(Short.MAX_VALUE, this.mp + ((Math.floor(Math.random()) * 6) + 5));
        if(this.watk > 0) this.watk = (short) Math.min(Short.MAX_VALUE, this.watk + ((Math.floor(Math.random()) * 2) + 1));
        if(this.matk > 0) this.matk = (short) Math.min(Short.MAX_VALUE, this.matk + ((Math.floor(Math.random()) * 2) + 1));
        if(this.wdef > 0) this.wdef = (short) Math.min(Short.MAX_VALUE, this.wdef + ((Math.floor(Math.random()) * 2) + 1));
        if(this.mdef > 0) this.mdef = (short) Math.min(Short.MAX_VALUE, this.mdef + ((Math.floor(Math.random()) * 2) + 1));
        if(this.avoid > 0) this.avoid = (short) Math.min(Short.MAX_VALUE, this.avoid + ((Math.floor(Math.random()) * 2) + 1));
        if(this.acc > 0) this.acc = (short) Math.min(Short.MAX_VALUE, this.acc + ((Math.floor(Math.random()) * 2) + 1));
        if(this.speed > 0) this.speed = (short) Math.min(Short.MAX_VALUE, this.speed + ((Math.floor(Math.random()) * 2)));
        if(this.jump > 0) this.jump = (short) Math.min(Short.MAX_VALUE, this.jump + ((Math.floor(Math.random()) * 2)));
        
        this.itemLevel++;
        c.announce(MaplePacketCreator.showEquipmentLevelUp());
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showForeignEffect(c.getPlayer().getId(), 15));
        c.getPlayer().forceUpdateItem(this);
    }
    
    public int getItemExp() {
        return (int) itemExp;
    }

    public void setItemExp(int exp) {
        this.itemExp = exp;
    }

    public void setItemLevel(byte level) {
        this.itemLevel = level;
    }

    @Override
    public void setQuantity(short quantity) {
        if (quantity < 0 || quantity > 1) {
            throw new RuntimeException("Setting the quantity to " + quantity + " on an equip (itemid: " + getItemId() + ")");
        }
        super.setQuantity(quantity);
    }

    public void setUpgradeSlots(int i) {
        this.upgradeSlots = (byte) i;
    }

    public void setVicious(int i) {
        this.vicious = (short) i;
    }

    public int getRingId() {
        return ringid;
    }

    public void setRingId(int id) {
        this.ringid = id;
    }

    public boolean isWearing() {
        return wear;
    }

    public void wear(boolean yes) {
        wear = yes;
    }

    public byte getItemLevel() {
        return itemLevel;
    }
    
    public void resetToDefault(MapleClient c, boolean resetTradable) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Map<String, Integer> stats = ii.getEquipStats(getItemId());
        if (stats != null) {
            for (Map.Entry<String, Integer> stat : stats.entrySet()) {
                if (stat.getKey().equals("STR")) {
                    this.setStr((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("DEX")) {
                    this.setDex((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("INT")) {
                    this.setInt((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("LUK")) {
                    this.setLuk((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("PAD")) {
                    this.setWatk((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("PDD")) {
                    this.setWdef((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("MAD")) {
                    this.setMatk((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("MDD")) {
                    this.setMdef((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("ACC")) {
                    this.setAcc((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("EVA")) {
                    this.setAvoid((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("Speed")) {
                    this.setSpeed((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("Jump")) {
                    this.setJump((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("MHP")) {
                    this.setHp((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("MMP")) {
                    this.setMp((short) stat.getValue().intValue());
                } else if (stat.getKey().equals("tuc")) {
                    this.setUpgradeSlots((byte) stat.getValue().intValue());
                }
            }
            if(resetTradable && ii.isUntradeableOnEquip(getItemId())) this.setFlag((byte) 0);
        }
        c.getPlayer().forceUpdateItem(this);
    }
}