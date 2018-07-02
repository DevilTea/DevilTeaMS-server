function start() {
cm.sendSimple("如果你有翅膀，我確定你能去到那。 如果你想要飛過比鋒利的風，那麼你也需要堅硬的鱗片。 我是唯一一個剩下來知曉方法的人... 如果你要去那，我有一個辦法。無論你原來是什麼，此刻你將成為 #b龍#k...\r\n #L0##b我想成為一條龍!#k#l");
}

function action(m, t, s) {
   if (m > 0){
      cm.useItem(2210016);
      cm.warp(200090500, 0);
   }
   cm.dispose();
}  