var isGamePlaying = false;
var isPause = false;
var isPlayer1Turn = true;
var isLastGamePlayer1First = false;
var lastWinPlayer = 1;

var usedGridCells = {};

var GRID_CELL_WIDTH = 19;
var GRID_CELL_HEIGHT = 15;
var GRID_WIDTH = 788;
var GRID_HEIGHT = 621;
var CELL_SIZE = 41.35;

function initGame() {
   initGrid();
   resetPlayerTurn();
   resetMoveCount();
   resetWinCount();
   resetTimer();
}



// ============================================
// ============================================


function initGrid() {
   // hightlight the cell
   bindButton(
      _ccFind('gridTouchPadHightlight'),
      function (node, location, locationInNode) {
         if (!isGamePlaying) {
            showWin(lastWinPlayer);
            return;
         }
         var cellCoords = touchToCellCoordinate(locationInNode);
         if (!cellCoords) return;
         var cellName = cellCoords.x + '_' + cellCoords.y;
         if (usedGridCells[cellName]) return;
         highlightCell(touchToCellPos(locationInNode));
      },
      null,
      hideHightlight,
      true
   );


   bindDoubleTap(_ccFind('gridTouchPad'), function (pos) {
      // _log('bindDoubleTap callback callleddddd ! pos=' + pos.x + ',' + pos.y);
      if (!isGamePlaying) return;
      if (!touchToCellCoordinate(pos)) return;
      hideTut();
      onGamePlayerMove(pos);
   });
}



// --------------
// --------------


function onGamePlayerMove(pos) {
   var correctPos = touchToCellPos(pos)
   var cellCoords = touchToCellCoordinate(pos);
   if (!cellCoords) return;
   var cellName = cellCoords.x + '_' + cellCoords.y;
   // _log('cellName=' + cellName);
   if (usedGridCells[cellName]) return;
   usedGridCells[cellName] = (isPlayer1Turn ? 1 : 2);

   onMove(correctPos, isPlayer1Turn);

   var result = checkGameDone(isPlayer1Turn);
   if (!result) {
      updateMoveCount();
      isPlayer1Turn = !isPlayer1Turn;
      setPlayerTurnTimer();
      showPlayerTurn();
   }
}

function onMove(cellPos, isX) {
   var sampleSpr = isX ? res["x.fw"] : res["o.fw"];
   var node = new cc.Sprite(sampleSpr);
   cellGrid.addChild(node);
   node.setPosition(cellPos.x, cellPos.y);
}


// @@@@@ ========================================================================
// @@@@@ ========================================================================

// --------------- pattern
var checkWinPatternStrArr = [
   '1.2.3.4.5', '6.7.8.9.10', '11.12.13.14.15', '16.17.18.19.20', '21.22.23.24.25',
   '1.6.11.16.21', '2.7.12.17.22', '3.8.13.18.23', '4.9.14.19.24', '5.10.15.20.25',
   '1.7.13.19.25', '5.9.13.17.21'
];
var checkWinPatternArr = [];
for (var patternIndex in checkWinPatternStrArr) {
   var tmpArr = checkWinPatternStrArr[patternIndex].split('.');
   for (var i in tmpArr) tmpArr[i] = parseInt(tmpArr[i]);
   checkWinPatternArr.push(tmpArr)
}

// -----------------logic
function checkGameDone(isPlayer1) {
   var cellValue = (isPlayer1 ? 1 : 2);
   var subUsedCells = {};
   for (var cellName in usedGridCells) {
      if (usedGridCells[cellName] == cellValue) subUsedCells[cellName] = true;
   }

   var matchingCellArr = null;
   for (var y = 0; y <= GRID_CELL_HEIGHT - 5; y++) {
      for (var x = 0; x <= GRID_CELL_WIDTH - 5; x++) {
         matchingCellArr = checkMatrix(subUsedCells, x, y);
         if (matchingCellArr) break;
      }
      if (matchingCellArr) break;
   }
   _log('matchingCellArr = ' + JSON.stringify(matchingCellArr));
   if (!matchingCellArr) return;

   hightlightWinRow(matchingCellArr);
   lastWinPlayer = isPlayer1 ? 1 : 2;
   onWinDetected();
   updateWinCount();
   resetPlayerTurn();
   return true;
}

function checkMatrix(subUsedCells, startX, startY) {
   var flatArr = [];
   for (var y = 0; y < 5; y++) {
      for (var x = 0; x < 5; x++) {
         var cellName = (startX + x) + '_' + (startY + y);
         flatArr.push({ x: x, y: y, value: (subUsedCells[cellName] ? 1 : 0) });
      }
   }

   var isFinalMatching = null;
   var matchingCellArr = [];
   for (var patternIndex in checkWinPatternArr) {
      var patternMatchArr = checkWinPatternArr[patternIndex];
      var isMatching = true;
      for (var i = 0; i < patternMatchArr.length; i++) {
         var flatArrIndex = patternMatchArr[i] - 1;
         var flatItem = flatArr[flatArrIndex]
         matchingCellArr[i] = { x: flatItem.x + startX, y: flatItem.y + startY };
         if (!flatItem.value) { isMatching = false; break; }
      }
      if (isMatching) { isFinalMatching = true; break; }
   }
   if (isFinalMatching) return matchingCellArr;
}


// @@@@@ ========================================================================
// @@@@@ ========================================================================



function touchToCellCoordinate(touchPos) {
   var x = touchPos.x;
   var y = touchPos.y;
   var cellX = Math.floor(x / CELL_SIZE) - GRID_CELL_WIDTH / 2;
   var cellY = Math.floor(y / CELL_SIZE) - GRID_CELL_HEIGHT / 2;
   var coord = { x: cellX + GRID_CELL_WIDTH / 2, y: cellY + GRID_CELL_HEIGHT / 2 };
   if (coord.x > GRID_CELL_WIDTH - 1 || coord.y > GRID_CELL_HEIGHT - 1) return;
   return coord;
}

function touchToCellPos(touchPos) {
   var x = touchPos.x;
   var y = touchPos.y;
   var cellX = Math.floor(x / CELL_SIZE) - GRID_CELL_WIDTH / 2;
   var cellY = Math.floor(y / CELL_SIZE) - GRID_CELL_HEIGHT / 2;
   return {
      x: (cellX + 0.5) * CELL_SIZE,
      y: (cellY + 0.5) * CELL_SIZE
   }
}


// --------------------
// --------------------


function highlightCell(cellPos) {
   var node = _ccFind('hightlightLayer/cell_highlight');
   node.setPosition(cellPos.x, cellPos.y);
   // _log('highlightCell cellPos = ' + cellPos.x + ',' + cellPos.y);
}

function hideHightlight() {
   _ccFind('hightlightLayer/cell_highlight').y = 9999;
}


function hightlightWinRow(matchingCellArr) {
   var centerPos = matchingCellArr[2];
   var direction = matchingCellArr[3].x == centerPos.x ? 'vert' : (matchingCellArr[3].y == centerPos.y ? 'horz' : 'diagonal');
   var isDiagonal = (direction == 'diagonal');
   var isDiagonalTopLeft = (matchingCellArr[3].x < centerPos.x)
   var node = _ccFind('hightlightLayer/' + (isDiagonal ? 'win_row_diagonal' : 'win_row'));
   node.setPosition(
      (centerPos.x + 0.5) * CELL_SIZE - GRID_WIDTH / 2,
      (centerPos.y + 0.5) * CELL_SIZE - GRID_HEIGHT / 2
   );
   if (!isDiagonal) node.rotation = (direction == 'horz' ? 0 : 90);
   else node.rotation = (isDiagonalTopLeft ? 0 : 90);
}


function hideHightlightWinRow() {
   _ccFind('hightlightLayer/win_row_diagonal').y = 9999;
   _ccFind('hightlightLayer/win_row').y = 9999;
}






// ============================================
// ============================================


function gameOnTimeout() {
   isPlayer1Turn = !isPlayer1Turn;
   lastWinPlayer = (isPlayer1Turn ? 1 : 2);

   onWinDetected();
   updateWinCount();
   resetPlayerTurn();
}


function gameOnPlay() {
   isGamePlaying = true;
   isPause = false;

   hideHome();
   if (!isTutShown) {
      isTutShown = true;
      return showTut();
   }

   // clear map
   usedGridCells = {};
   cellGrid.removeAllChildren();
   hideHightlightWinRow();

   // handle player turn
   showPlayerTurn();
   resetMoveCount();
   resetTimer();

   _log('gameOnPlay');
}


function gameOnPause() {
   if (!isGamePlaying || isPause) return;
   isPause = true;
   showPause();
   _log('gameOnPause');
}

function gameOnResume() {
   isPause = false;
   hidePause();
   _log('gameOnResume');
}

function gameOnNewGame() {
   hidePause();
   gameOnPlay();
   _log('gameOnNewGame');
}

function onWinDetected() {
   isGamePlaying = false;
}

