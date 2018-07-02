/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package deviltea;

import client.MapleCharacter;
import client.inventory.Item;
import client.inventory.ItemFactory;
import client.inventory.MapleInventoryType;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import tools.Pair;

/**
 *
 * @author DevilTea
 */
public class GiftBox {
    
    MapleCharacter owner;
    private List<Pair<Item, MapleInventoryType>> accountGiftItems;
    private List<Pair<Item, MapleInventoryType>> characterGiftItems;
    
    public GiftBox(MapleCharacter owner) {
        this.owner = owner;
        this.accountGiftItems = new ArrayList<>();
        this.characterGiftItems = new ArrayList<>();
    }
    
    public static GiftBox loadFromDB(MapleCharacter owner) {
        GiftBox giftBox = new GiftBox(owner);
        try {
            for (Pair<Item, MapleInventoryType> item : ItemFactory.ACCOUNT_GIFT.loadItems(owner.getAccountID(), false)) {
                giftBox.accountGiftItems.add(item);
            }
            for (Pair<Item, MapleInventoryType> item : ItemFactory.CHARACTER_GIFT.loadItems(owner.getId(), false)) {
                giftBox.characterGiftItems.add(item);
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return giftBox;
    }
    
    public void saveToDB(Connection con) {
        try {
            ItemFactory.ACCOUNT_GIFT.saveItems(accountGiftItems, owner.getAccountID(), con);
            ItemFactory.CHARACTER_GIFT.saveItems(characterGiftItems, owner.getId(), con);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
    
    public void addGiftToList(Item item, boolean isAccountGift) {
        (isAccountGift ? accountGiftItems : characterGiftItems).add(new Pair(item, MapleItemInformationProvider.getInstance().getInventoryType(item.getItemId())));
    }
    
    public void addGift(int itemid, short quantity, boolean isAccountGift) {
        Item item;
        if(MapleItemInformationProvider.getInstance().getInventoryType(itemid) == MapleInventoryType.EQUIP) {
            item = MapleItemInformationProvider.getInstance().getEquipById(itemid);
            for(int i = 0;i < quantity;i++) {
                addGiftToList(item, isAccountGift);
            }
        } else {
            item = new Item(itemid, (short) 0, quantity);
            addGiftToList(item, isAccountGift);
        }
        owner.dropMessage(1, "您收到新的禮物!\r\n\r\n請記得查收!");
    }
    
    public List<Item> getItems(boolean isAccountGift) {
        List<Item> list = new ArrayList<>();
        for(Pair<Item, MapleInventoryType> item : (isAccountGift ? accountGiftItems : characterGiftItems)) {
            list.add(item.getLeft());
        }
        return list;
    }
    
    public boolean takeOut(int index, boolean isAccountGift) {
        Pair<Item, MapleInventoryType> gift = (isAccountGift ? accountGiftItems : characterGiftItems).get(index);
        boolean success = false;
        success = MapleInventoryManipulator.addFromDrop(owner.getClient(), gift.getLeft(), true);
        if(success) (isAccountGift ? accountGiftItems : characterGiftItems).remove(gift);
        return success;
    }
    
    public boolean haveGift() {
        return (!accountGiftItems.isEmpty() || !characterGiftItems.isEmpty());
    }
}
