
var player1MoveCount = 0;
var player2MoveCount = 0;

var TIME_EACH_MOVE = 45;
var remainingTime = 0;
var countingTimerLabel;

var playerWinCount1 = 0;
var playerWinCount2 = 0;



// ====================================


function resetTimer() {
   remainingTime = TIME_EACH_MOVE;
   countingTimerLabel = null;

   var timeLabel1 = _ccFind('player1/time');
   var timeLabel2 = _ccFind('player2/time');
   var timeoutLabel = _ccFind('labelTimeout');
   timeoutLabel.visible = false;

   timeLabel1.setString('00:' + TIME_EACH_MOVE);
   timeLabel2.setString('00:' + TIME_EACH_MOVE);
}


function setPlayerTurnTimer() {
   remainingTime = TIME_EACH_MOVE;

   var timeLabel1 = _ccFind('player1/time');
   var timeLabel2 = _ccFind('player2/time');
   var freeTimerLabel = isPlayer1Turn ? timeLabel2 : timeLabel1;
   countingTimerLabel = isPlayer1Turn ? timeLabel1 : timeLabel2;

   freeTimerLabel.setString('00:' + TIME_EACH_MOVE);
}

function onTimerTick() {
   if (!isGamePlaying || isPause || !countingTimerLabel) return;
   remainingTime -= 1;
   if (remainingTime >= 0) countingTimerLabel.setString('00:' + remainingTime);
   else {
      var timeoutLabel = _ccFind('labelTimeout');
      timeoutLabel.visible = true;
      timeoutLabel.setString('PLAYER ' + (isPlayer1Turn ? 1 : 2) + ' TIMEOUT !');
      gameOnTimeout();
   }
}

setInterval(onTimerTick, 1000);


// ====================================


function resetWinCount() {
   playerWinCount1 = 0;
   playerWinCount2 = 0;

   var scoreLabel = _ccFind('score/score');
   scoreLabel.setString(playerWinCount1 + '  -  ' + playerWinCount2);
}


function updateWinCount() {
   if (isPlayer1Turn) playerWinCount1++;
   else playerWinCount2++;

   var scoreLabel = _ccFind('score/score');
   scoreLabel.setString(playerWinCount1 + '  -  ' + playerWinCount2);
}


// ====================================

function resetPlayerTurn() {
   var circle1 = _ccFind('red_circle_1');
   var circle2 = _ccFind('red_circle_2');

   var action = cc.sequence(
      cc.fadeTo(0.1, 0),
      cc.delayTime(0.4),
      cc.fadeTo(0.1, 255),
      cc.delayTime(0.4)
   ).repeatForever();

   circle1.stopAllActions();
   circle2.stopAllActions();
   circle1.runAction(action.clone());
   circle2.runAction(action);

   circle1.visible = false;
   circle2.visible = false;
}

function showPlayerTurn() {
   var player = isPlayer1Turn ? 1 : 2
   _ccFind('red_circle_' + player).visible = true;
   _ccFind('red_circle_' + ('12'.replace(player, ''))).visible = false;
}


function resetMoveCount() {
   player1MoveCount = 0;
   player2MoveCount = 0;

   var move1 = _ccFind('player1/move');
   var move2 = _ccFind('player2/move');
   move1.setString('Move: 0');
   move2.setString('Move: 0');
}

function updateMoveCount() {
   if (isPlayer1Turn) player1MoveCount++;
   else player2MoveCount++;

   var move1 = _ccFind('player1/move');
   var move2 = _ccFind('player2/move');
   move1.setString('Move: ' + player1MoveCount);
   move2.setString('Move: ' + player2MoveCount);
}


// ====================================
// timer logic
// ====================================


