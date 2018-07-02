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
package net.server.channel;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.WriteLock;

import net.server.PlayerStorage;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;

import net.netty.ServerConnection;
import provider.MapleDataProviderFactory;
import scripting.event.EventScriptManager;
import server.TimerManager;
import server.events.gm.MapleEvent;
import server.expeditions.MapleExpedition;
import server.expeditions.MapleExpeditionType;
import server.maps.HiredMerchant;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import tools.MaplePacketCreator;
import client.MapleCharacter;
import constants.ServerConstants;

public final class ChannelServer {

    private ServerConnection init;
    private int port = 7575;
    private PlayerStorage players = new PlayerStorage();
    private int world, channel;
    private String ip, serverMessage;
    private MapleMapFactory mapFactory;
    private EventScriptManager eventSM;
    private Map<Integer, HiredMerchant> hiredMerchants = new HashMap<>();
    private final Map<Integer, Integer> storedVars = new HashMap<>();
    private ReentrantReadWriteLock merchant_lock = new ReentrantReadWriteLock(true);
    private List<MapleExpedition> expeditions = new ArrayList<>();
    private List<MapleExpeditionType> expedType = new ArrayList<>();
    private MapleEvent event;
    private boolean finishedShutdown = false;
    
    public ChannelServer(final int world, final int channel) {
        this.world = world;
        this.channel = channel;
        this.mapFactory = new MapleMapFactory(MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Map.wz")), MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/String.wz")), world, channel);
        try {
            eventSM = new EventScriptManager(this, getEvents());
            port = 7575 + this.channel - 1;
            port += (world * 100);
            ip = ServerConstants.HOST + ":" + port;
            TimerManager.getInstance().register(new respawnMaps(), 1000);
            for (MapleExpeditionType exped : MapleExpeditionType.values()) {
            	expedType.add(exped);
            }
            eventSM.init();
            
            init = new ServerConnection(port, world, channel);
            init.run();
            System.out.println("    [頻道 " + getId() + "]: Listening on port " + port);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public void reloadEventScriptManager(){
    	eventSM.cancel();
    	eventSM = null;
    	eventSM = new EventScriptManager(this, getEvents());
    	eventSM.init();
    }

    public final void shutdown() {
        try {
            //System.out.println("關閉 世界 " + world + " 的 頻道 " + channel);
            
            closeAllMerchants();
            players.disconnectAll();
            init.close();
            
            finishedShutdown = true;
            //System.out.println("[關閉成功] 世界 " + world + " 的 頻道 " + channel + "\r\n");          
        } catch (Exception e) {
            System.err.println("[關閉失敗] 世界 " + world + " 的 頻道 " + channel + "\r\n" + e);
        }
    }

    public void closeAllMerchants() {
        WriteLock wlock = merchant_lock.writeLock();
        wlock.lock();
        try {
            final Iterator<HiredMerchant> hmit = hiredMerchants.values().iterator();
            while (hmit.hasNext()) {
                hmit.next().forceClose();
                hmit.remove();
            }
        } catch (Exception e) {
			e.printStackTrace();
        } finally {
            wlock.unlock();
        }
    }
    
    public MapleMapFactory getMapFactory() {
        return mapFactory;
    }

    public int getWorld() {
        return world;
    }

    public void addPlayer(MapleCharacter chr) {
        players.addPlayer(chr);
        chr.announce(MaplePacketCreator.serverMessage(serverMessage));
    }

    public PlayerStorage getPlayerStorage() {
        return players;
    }

    public void removePlayer(MapleCharacter chr) {
        players.removePlayer(chr.getId());
    }

    public int getConnectedClients() {
        return players.getAllCharacters().size();
    }

    public void broadcastPacket(final byte[] data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            chr.announce(data);
        }
    }
    
    public final int getId() {
        return channel;
    }

    public String getIP() {
        return ip;
    }

    public MapleEvent getEvent() {
        return event;
    }

    public void setEvent(MapleEvent event) {
        this.event = event;
    }

    public EventScriptManager getEventSM() {
        return eventSM;
    }

    public void broadcastGMPacket(final byte[] data) {
        for (MapleCharacter chr : players.getAllCharacters()) {
            if (chr.isGM()) {
                chr.announce(data);
            }
        }
    }

    public List<MapleCharacter> getPartyMembers(MapleParty party) {
        List<MapleCharacter> partym = new ArrayList<>(8);
        for (MaplePartyCharacter partychar : party.getMembers()) {
            if (partychar.getChannel() == getId()) {
                MapleCharacter chr = getPlayerStorage().getCharacterByName(partychar.getName());
                if (chr != null) {
                    partym.add(chr);
                }
            }
        }
        return partym;
    }
        
    public class respawnMaps implements Runnable {
        @Override
        public void run() {
            for (Entry<Integer, MapleMap> map : mapFactory.getMaps().entrySet()) {
                if(map.getValue().getRespawnCount() != 0 && map.getValue().getRespawnCount() % map.getValue().getRespawnPeriod() == 0) {
                    map.getValue().respawn();
                    map.getValue().setRespawnCount(0);
                }
                map.getValue().setRespawnCount(map.getValue().getRespawnCount() + 1);
            }
            
        }
    }

    public Map<Integer, HiredMerchant> getHiredMerchants() {
        return hiredMerchants;
    }

    public void addHiredMerchant(int chrid, HiredMerchant hm) {
        WriteLock wlock = merchant_lock.writeLock();
        wlock.lock();
        try {
            hiredMerchants.put(chrid, hm);
        } finally {
            wlock.unlock();
        }
    }

    public void removeHiredMerchant(int chrid) {
        WriteLock wlock = merchant_lock.writeLock();
        wlock.lock();
        try {        
            hiredMerchants.remove(chrid);
        } finally {
            wlock.unlock();
        }
        }

    public int[] multiBuddyFind(int charIdFrom, int[] characterIds) {
        List<Integer> ret = new ArrayList<>(characterIds.length);
        PlayerStorage playerStorage = getPlayerStorage();
        for (int characterId : characterIds) {
            MapleCharacter chr = playerStorage.getCharacterById(characterId);
            if (chr != null) {
                if (chr.getBuddylist().containsVisible(charIdFrom)) {
                    ret.add(characterId);
                }
            }
        }
        int[] retArr = new int[ret.size()];
        int pos = 0;
        for (Integer i : ret) {
            retArr[pos++] = i.intValue();
        }
        return retArr;
    }
    
    public List<MapleExpedition> getExpeditions() {
    	return expeditions;
    }
    
    public boolean isConnected(String name) {
        return getPlayerStorage().getCharacterByName(name) != null;
    }
    
    public boolean finishedShutdown() {
        return finishedShutdown;
    }
    
    public void setServerMessage(String message) {
        this.serverMessage = message;
        broadcastPacket(MaplePacketCreator.serverMessage(message));
    }
    
    private static String [] getEvents(){
    	List<String> events = new ArrayList<String>();
    	for (File file : new File("scripts/event").listFiles()){
    		events.add(file.getName().substring(0, file.getName().length() - 3));
    	}
    	return events.toArray(new String[0]);
    }
	
	public int getStoredVar(int key) {
		if(storedVars.containsKey(key))
            return storedVars.get(key);
        return 0;
    }
    
    public void setStoredVar(int key, int val) {
        this.storedVars.put(key, val);
    }
}