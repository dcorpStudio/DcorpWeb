var layouts = {};
var cellGrid;

function bindUIButtons() {

   bindButtonBubble(_ccFind('layerHome/btnPlay'), null, null, function (node) {
      gameOnPlay();
      node.visible = false;
   });

   bindButtonBubble(_ccFind('layerHome/btnNewGame'), null, null, gameOnNewGame);
   bindButtonBubble(_ccFind('layerHome/btnReset'), null, null, resetWinCount);

   bindButtonBubble(_ccFind('score/btnPause.fw'), null, null, gameOnPause);

   bindButtonBubble(_ccFind('layerPause/btnResume'), null, null, gameOnResume);
   bindButtonBubble(_ccFind('layerPause/btnNewGame'), null, null, gameOnNewGame);
   bindButtonBubble(_ccFind('layerPause/btnReset'), null, null, resetWinCount);
}

function initNagScreen() {
   bindButton(_ccFind('layerHome/nagscreen'), null, null, null);
   bindButton(_ccFind('layerPause/nagscreen'), null, null, null);
}

function initLayout() {
   layouts.home = _ccFind('layerHome');
   layouts.winPanel = _ccFind('win_panel', layouts.home);
   layouts.winPanel.visible = false;

   layouts.pause = _ccFind('layerPause');
   layouts.pause.visible = false;

   layouts.tut = _ccFind('layerTut');
   layouts.tut.visible = false;

   cellGrid = _ccFind('grid');
   bindUIButtons();
   initNagScreen();
}

function showHome() {
   layouts.home.visible = true;
   _ccFind('layerHome/win_panel').visible = false;
}

function showWin(winPlayer) {
   showHome();
   _ccFind('layerHome/win_panel').visible = true;
   _ccFind('layerHome/win_panel/winlabel').setString('WINNER: PLAYER ' + winPlayer);
}

function hideHome() {
   layouts.home.visible = false;
}



function showTut() {
   layouts.tut.visible = true;
   var hand = _ccFind('layerTut/iconHand');
   hand.runAction(
      cc.sequence(
         cc.delayTime(0.5),
         cc.scaleTo(0.1, 0.8),
         cc.scaleTo(0.1, 1),
         cc.scaleTo(0.1, 0.8),
         cc.scaleTo(0.1, 1),
         cc.delayTime(1.5)
      ).repeatForever()
   );
}


function hideTut() {
   if (layouts.tut.visible) gameOnPlay();
   layouts.tut.visible = false;
}


function showPause() {
   layouts.pause.visible = true;
}


function hidePause() {
   layouts.pause.visible = false;
}
