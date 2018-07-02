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
package net;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Random;

import net.server.Server;
import tools.FilePrinter;
import tools.MapleAESOFB;
import tools.MapleLogger;
import tools.MaplePacketCreator;
import tools.data.input.ByteArrayByteStream;
import tools.data.input.GenericSeekableLittleEndianAccessor;
import tools.data.input.SeekableLittleEndianAccessor;
import client.MapleClient;
import constants.ServerConstants;

public class MapleServerHandler extends ChannelInboundHandlerAdapter {

    private PacketProcessor processor;
    private int world = -1, channel = -1;
    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");
    
    public MapleServerHandler() {
        this.processor = PacketProcessor.getProcessor(-1, -1);
    }

    public MapleServerHandler(int world, int channel) {
        this.processor = PacketProcessor.getProcessor(world, channel);
        this.world = world;
        this.channel = channel;
    }


    @Override
    public void channelActive(ChannelHandlerContext ctx) {
        if (!Server.getInstance().isOnline()) {
        	ctx.channel().close();
            return;
        }
        if (channel > -1 && world > -1) {
            if (Server.getInstance().getChannel(world, channel) == null) {
            	ctx.channel().close();
                return;
            }
        } else {
            FilePrinter.print(FilePrinter.SESSION, "IoSession with " + ctx.channel().remoteAddress() + " opened on " + sdf.format(Calendar.getInstance().getTime()), false);
        }

        byte key[] = {0x13, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00, (byte) 0xB4, 0x00, 0x00, 0x00, 0x1B, 0x00, 0x00, 0x00, 0x0F, 0x00, 0x00, 0x00, 0x33, 0x00, 0x00, 0x00, 0x52, 0x00, 0x00, 0x00};
        byte ivRecv[] = {70, 114, 122, 82};
        byte ivSend[] = {82, 48, 120, 115};
        ivRecv[3] = (byte) (Math.random() * 255);
        ivSend[3] = (byte) (Math.random() * 255);
        MapleAESOFB sendCypher = new MapleAESOFB(key, ivSend, (short) (0xFFFF - ServerConstants.VERSION));
        MapleAESOFB recvCypher = new MapleAESOFB(key, ivRecv, ServerConstants.VERSION);
        MapleClient client = new MapleClient(sendCypher, recvCypher, ctx.channel());
        client.setWorld(world);
        client.setChannel(channel);
        Random r = new Random();
        client.setSessionId(r.nextLong()); // Generates a random session id.
        ctx.channel().writeAndFlush(MaplePacketCreator.getHello(ServerConstants.VERSION, ivSend, ivRecv));
        ctx.channel().attr(MapleClient.CLIENT_KEY).set(client);
    }
	
    @Override
    public void channelInactive(ChannelHandlerContext ctx) {
        MapleClient client = (MapleClient) ctx.channel().attr(MapleClient.CLIENT_KEY).get();
        if (client != null) {
            try {
                boolean inCashShop = false;
                if (client.getPlayer() != null) {
                    client.getPlayer().saveToDB();
                    inCashShop = client.getPlayer().getCashShop().isOpened();
                }
                client.disconnect(false, inCashShop);
            } catch (Throwable t) {
                FilePrinter.printError(FilePrinter.ACCOUNT_STUCK, t);
            } finally {
            	ctx.channel().close();
                ctx.channel().attr(MapleClient.CLIENT_KEY).set(null);      
                //client.empty();
            }
        }
    }
	
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object message) { // handles the object which a current connection has sent to the server
        byte[] content = (byte[]) message;
        SeekableLittleEndianAccessor slea = new GenericSeekableLittleEndianAccessor(new ByteArrayByteStream(content));
        short packetId = slea.readShort();
        MapleClient client = ctx.channel().attr(MapleClient.CLIENT_KEY).get();
        final MaplePacketHandler packetHandler = processor.getHandler(packetId);
        if (packetHandler != null && packetHandler.validateState(client)) {
            try {
            	MapleLogger.logRecv(client, packetId, message);
                packetHandler.handlePacket(slea, client);
            } catch (final Throwable t) {
                FilePrinter.printError(FilePrinter.PACKET_HANDLER + packetHandler.getClass().getName() + ".txt", t, "Error for " + (client.getPlayer() == null ? "" : "player ; " + client.getPlayer() + " on map ; " + client.getPlayer().getMapId() + " - ") + "account ; " + client.getAccountName() + "\r\n" + slea.toString());
                //client.announce(MaplePacketCreator.enableActions());//bugs sometimes
            }
        }
    }
	
    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        MapleClient client = (MapleClient) ctx.channel().attr(MapleClient.CLIENT_KEY).get();
        if (client != null) {
            client.sendPing();
        }
    }
	 
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
    	if (cause instanceof IOException || cause instanceof ClassCastException) {
            return;
        }
        MapleClient mc = ctx.channel().attr(MapleClient.CLIENT_KEY).get();
        if (mc != null && mc.getPlayer() != null) {
            FilePrinter.printError(FilePrinter.EXCEPTION_CAUGHT, cause, "Exception caught by: " + mc.getPlayer());
        }
    }
}