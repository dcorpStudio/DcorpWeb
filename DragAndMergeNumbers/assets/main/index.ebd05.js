window.__require=function o(t,i,e){function n(r,s){if(!i[r]){if(!t[r]){var a=r.split("/");if(a=a[a.length-1],!t[a]){var h="function"==typeof __require&&__require;if(!s&&h)return h(a,!0);if(c)return c(a,!0);throw new Error("Cannot find module '"+r+"'")}r=a}var l=i[r]={exports:{}};t[r][0].call(l.exports,function(o){return n(t[r][1][o]||o)},l,l.exports,o,t,i,e)}return i[r].exports}for(var c="function"==typeof __require&&__require,r=0;r<e.length;r++)n(e[r]);return n}({config:[function(o,t){"use strict";var i,e;cc._RF.push(t,"867c5YCGjJK16E84CaFreXI","config"),window._config=(e=i=function(){function o(){}return o.getPosSquare=function(o,t){var i=_config.X_GRID+o*(_config.WID_SQUARE+_config.X_DEL),e=_config.Y_GRID+t*(_config.HEI_SQUARE+_config.Y_DEL);return cc.v2(i,e)},o.getColorTextByNum=function(o){switch(o){case 1:return _config.colorT1;case 2:return _config.colorT2;case 3:return _config.colorT3;case 4:return _config.colorT4;case 5:return _config.colorT5;case 6:return _config.colorT6;case 7:return _config.colorT7;case 8:return _config.colorT8;case 9:return _config.colorT9;case 10:return _config.colorT10;case 11:return _config.colorT11;case 12:return _config.colorT12;case 13:return _config.colorT13;case 14:return _config.colorT14;case 15:return _config.colorT15;case 16:return _config.colorT16;case 17:return _config.colorT17;case 18:return _config.colorT18;case 19:return _config.colorT19;case 20:return _config.colorT20}return cc.color(0,0,0)},o.getColorByNum=function(o){switch(o){case 1:return _config.color1;case 2:return _config.color2;case 3:return _config.color3;case 4:return _config.color4;case 5:return _config.color5;case 6:return _config.color6;case 7:return _config.color7;case 8:return _config.color8;case 9:return _config.color9;case 10:return _config.color10;case 11:return _config.color11;case 12:return _config.color12;case 13:return _config.color13;case 14:return _config.color14;case 15:return _config.color15;case 16:return _config.color16;case 17:return _config.color17;case 18:return _config.color18;case 19:return _config.color19;case 20:return _config.color20}return cc.color(0,0,0)},o.randomNumber=function(o,t){return Math.floor(o+t*Math.random())},o}(),i.isTest=!1,i.SoundOn=!0,i.MusicOn=!0,i.isFriend=!0,i.colorOn=cc.color(110,253,253),i.colorOff=cc.color(87,105,122),i.X_GRID=-264,i.Y_GRID=-465,i.X_DEL=15,i.Y_DEL=15,i.WID_SQUARE=90,i.HEI_SQUARE=90,i.DEL_MERGE=50,i.TIMER=15,i.LEFT=1,i.RIGHT=2,i.TOP=3,i.BOTTOM=4,i.V_MOVE=500,i.V_DOWN=2e3,i.Y_DIS=20,i.color1=cc.color(95,198,241),i.color2=cc.color(190,217,82),i.color3=cc.color(217,108,177),i.color4=cc.color(217,132,132),i.color5=cc.color(72,209,144),i.color6=cc.color(132,138,217),i.color7=cc.color(217,211,102),i.color8=cc.color(179,112,229),i.color9=cc.color(224,137,65),i.color10=cc.color(241,238,226),i.color11=cc.color(153,43,217),i.color12=cc.color(126,217,93),i.color13=cc.color(217,54,114),i.color14=cc.color(71,140,203),i.color15=cc.color(222,175,33),i.color16=cc.color(207,47,219),i.color17=cc.color(26,179,88),i.color18=cc.color(228,215,145),i.color19=cc.color(161,196,226),i.color20=cc.color(230,107,29),i.colorT1=cc.color(9,69,87),i.colorT2=cc.color(80,101,1),i.colorT3=cc.color(94,10,22),i.colorT4=cc.color(105,40,1),i.colorT5=cc.color(0,99,65),i.colorT6=cc.color(74,32,159),i.colorT7=cc.color(119,76,58),i.colorT8=cc.color(241,241,241),i.colorT9=cc.color(102,33,5),i.colorT10=cc.color(90,50,20),i.colorT11=cc.color(241,241,241),i.colorT12=cc.color(10,94,19),i.colorT13=cc.color(241,241,241),i.colorT14=cc.color(241,241,241),i.colorT15=cc.color(102,63,8),i.colorT16=cc.color(241,241,241),i.colorT17=cc.color(241,241,241),i.colorT18=cc.color(110,71,32),i.colorT19=cc.color(58,75,165),i.colorT20=cc.color(241,241,241),e),cc._RF.pop()},{}],grContinue:[function(o,t){"use strict";cc._RF.push(t,"04572lUWc5Og7DMetNKzq04","grContinue"),cc.Class({extends:cc.Component,properties:{},initScene:function(o){this.scene=o},show:function(){this.node.active=!0},hide:function(){this.node.active=!1},onBtnNo:function(){this.scene.showGrGameOver()}}),cc._RF.pop()},{}],grGameOver:[function(o,t){"use strict";cc._RF.push(t,"fe096bqTxhNC5NzryLkCTYD","grGameOver"),cc.Class({extends:cc.Component,properties:{lblFriend:cc.Node,lblGlobal:cc.Node},initScene:function(o){this.scene=o},show:function(){this.node.active=!0,_config.isFriend?(this.lblFriend.color=_config.colorOn,this.lblGlobal.color=_config.colorOff):(this.lblFriend.color=_config.colorOff,this.lblGlobal.color=_config.colorOn)},hide:function(){this.node.active=!1},onBtnFriend:function(){_config.isFriend=!0,_config.isFriend?(this.lblFriend.color=_config.colorOn,this.lblGlobal.color=_config.colorOff):(this.lblFriend.color=_config.colorOff,this.lblGlobal.color=_config.colorOn)},onBtnGlobal:function(){_config.isFriend=!1,_config.isFriend?(this.lblFriend.color=_config.colorOn,this.lblGlobal.color=_config.colorOff):(this.lblFriend.color=_config.colorOff,this.lblGlobal.color=_config.colorOn)},onBtnReplay:function(){this.scene.showGrGamePlay()}}),cc._RF.pop()},{}],grGamePlay:[function(o,t){"use strict";cc._RF.push(t,"c23f5AnRNhDUqK0lMmLYGia","grGamePlay"),cc.Class({extends:cc.Component,properties:{grid:cc.Node,progressTimer:cc.ProgressBar,squarePool:{default:[],type:cc.Node},listSquare:{default:[],type:cc.Node},maxNum:0,isPause:!1,isCheckAddRow:!1,timer:0,squareFab:{default:[],type:cc.Prefab},cellgrid:cc.Prefab},initScene:function(o){this.scene=o,this.init()},init:function(){for(var o=0;o<48;o++){var t=cc.instantiate(this.cellgrid);this.grid.addChild(t)}this.squarePool=[]},show:function(){this.node.active=!0,this.initNewGame()},hide:function(){this.node.active=!1},onBtnPause:function(){this.scene.showGrPause()},getSquare:function(o){for(var t=0;t<this.squarePool.length;t++){var i=this.squarePool[t],e=i.getComponent("square");if(!i.active&&e.num==o)return i}var n=cc.instantiate(this.squareFab[o-1]),c=n.getComponent("square");return c.initScene(this),c.setNum(o),this.node.addChild(n),n.active=!1,this.squarePool.push(n),n},clearGame:function(){for(var o=0;o<this.listSquare.length;o++){var t=this.listSquare[o],i=t.getComponent("square");t.active=!1,i.imgJoint.active=!1;var e=t.getComponent(cc.WeldJoint);e&&e.destroy(),i.jointList=[]}this.listSquare=[],this.isPause=!1,this.isCheckAddRow=!1,this.timer=_config.TIMER,this.updateTimer()},checkAddRow:function(){for(var o=0;o<this.listSquare.length-1;o++)for(var t=this.listSquare[o].getComponent("square"),i=o+1;i<this.listSquare.length;i++){var e=this.listSquare[i].getComponent("square");if(t.num==e.num)return!1}return!0},setRandomJoint:function(o,t){var i=_config.randomNumber(1,t),e=o.getComponent("square"),n=e.col,c=e.row;if(!(e.jointList.length>0))switch(i){case 1:var r=this.getSquareByRowCol(n,c+1);if(null!=r){if(r.getComponent("square").jointList.length>0)return;this.join2Square(o,r,_config.TOP)}break;case 2:var s=this.getSquareByRowCol(n+1,c);if(null!=s){if(s.getComponent("square").jointList.length>0)return;this.join2Square(o,s,_config.RIGHT)}break;case 3:var a=this.getSquareByRowCol(n+1,c),h=this.getSquareByRowCol(n,c+1);if(null!=a&&null!=h){var l=a.getComponent("square"),u=h.getComponent("square");if(l.jointList.length>0||u.jointList.length>0)return;this.join2Square(a,o,_config.LEFT),this.join2Square(h,o,_config.BOTTOM)}break;case 4:var g=this.getSquareByRowCol(n+1,c),d=this.getSquareByRowCol(n+1,c+1);if(null!=g&&null!=d){var f=g.getComponent("square"),m=d.getComponent("square");if(f.jointList.length>0||m.jointList.length>0)return;this.join2Square(o,g,_config.RIGHT),this.join2Square(d,g,_config.BOTTOM)}break;case 5:var v=this.getSquareByRowCol(n+1,c),p=this.getSquareByRowCol(n+2,c);if(null!=v&&null!=p){var _=v.getComponent("square"),y=p.getComponent("square");if(_.jointList.length>0||y.jointList.length>0)return;this.join2Square(o,v,_config.RIGHT),this.join2Square(p,v,_config.LEFT)}}},initRandomTest:function(){this.listSquare=[];for(var o=0;o<20;o++){var t=Math.floor(1+3*Math.random()),i=this.getSquare(t);i.active=!0,this.listSquare.push(i);var e=i.getComponent("square"),n=Math.floor(o/6),c=o-6*n;e.row=n,e.col=c;var r=_config.getPosSquare(c,n);i.setPosition(r.x,r.y)}for(var s=0;s<this.listSquare.length;s++){var a=this.listSquare[s];this.setRandomJoint(a)}},setJointGroup:function(o,t){for(var i=0;i<this.listSquare.length;i++){var e=this.listSquare[i],n=e.getComponent("square");e==o?n.checkInJoint(t)||n.addJoint(t):e==t&&(n.checkInJoint(o)||n.addJoint(o))}for(var c=0;c<this.listSquare.length;c++){var r=this.listSquare[c].getComponent("square");if(r.checkInJoint(o))for(var s=o.getComponent("square"),a=0;a<s.jointList.length;a++){var h=s.jointList[a];r.checkInJoint(h)||r.addJoint(h)}if(r.checkInJoint(t))for(var l=t.getComponent("square"),u=0;u<l.jointList.length;u++){var g=l.jointList[u];r.checkInJoint(g)||r.addJoint(g)}}},join2Square:function(o,t,i){var e=o.getComponent("square"),n=t.getComponent("square"),c=cc.v2(0,0);switch(i){case _config.LEFT:c=cc.v2(-105,0);break;case _config.RIGHT:c=cc.v2(105,0);break;case _config.TOP:c=cc.v2(0,105);break;case _config.BOTTOM:c=cc.v2(0,-105)}var r=n.rigidBody;console.log("222222222222 - addComponent(cc.WeldJoint)");var s=o.addComponent(cc.WeldJoint);s.connectedBody=r,s.dampingRatio=.3,s.frequency=1,s.anchor.x=c.x,s.anchor.y=c.y,e.setImgJoint(t,i),this.setJointGroup(o,t)},delSquare:function(o){this.listSquare[o].active=!1,this.listSquare.splice(o,1)},initNewSquare:function(o,t){var i=this.listSquare[o].getComponent("square"),e=i.row,n=i.col,c=_config.getPosSquare(n,e);this.delSquare(o);var r=this.getSquare(t),s=r.getComponent("square");s.row=e,s.col=n,r.active=!0,this.listSquare.push(r),r.setPosition(c.x,c.y),t>this.maxNum&&(this.maxNum=t)},initRandom5:function(){this.listSquare=[];for(var o=0;o<12;o++){var t=Math.floor(1+3*Math.random()),i=this.getSquare(t);i.active=!0,this.listSquare.push(i);var e=i.getComponent("square"),n=Math.floor(o/6),c=o-6*n;e.row=n,e.col=c;var r=_config.getPosSquare(c,n);i.setPosition(r.x,r.y)}var s=Math.floor(12*Math.random());this.initNewSquare(s,5)},initNewGame:function(){this.clearGame(),this.maxNum=5,this.initRandom5()},checkAllMoveDown:function(){for(var o=0;o<this.listSquare.length;o++){var t=this.listSquare[o].getComponent("square");if(!t.isTouching&&!t.isMovingDown&&t.row>0&&t.checkCanMoveDown()){for(var i=0;i<this.listSquare.length;i++)this.listSquare[i].getComponent("square");t.setMoveDown()}}},getSquareByRowColMerge:function(o,t){for(var i=0;i<this.listSquare.length;i++){var e=this.listSquare[i],n=e.getComponent("square");if(n.row==t&&n.col==o){if(n.isTouching||n.isMovingDown)continue;return e}}return null},getSquareByRowCol:function(o,t){for(var i=0;i<this.listSquare.length;i++){var e=this.listSquare[i],n=e.getComponent("square");if(n.row==t&&n.col==o)return e}return null},getIndex:function(o){for(var t=0;t<this.listSquare.length;t++)if(this.listSquare[t]==o)return t;return-1},getLastSquare:function(){return 0==this.listSquare.length?null:this.listSquare[this.listSquare.length-1]},checkMergeDown:function(o){var t=o.getComponent("square"),i=this.getSquareByRowCol(t.col,t.row-1);if(null!=i){var e=i.getComponent("square");if(t.num==e.num)return void t.setMoveDown()}var n=this.getSquareByRowCol(t.col,t.row+1);if(null!=n){var c=n.getComponent("square");t.num==c.num&&c.setMoveDown()}},merge2Square:function(o,t){var i=o.getComponent("square"),e=t.getComponent("square");i.reset(e.col,e.row),e.reset(e.col,e.row);var n=this.getIndex(o);-1!=n&&this.delSquare(n);var c=this.getIndex(t);this.initNewSquare(c,e.num+1),this.checkAllMoveDown(),null!=this.getLastSquare()&&this.checkMergeDown(this.getLastSquare())},checkMerge:function(o){for(var t=0;t<this.listSquare.length;t++){var i=this.listSquare[t];if(i!=o){var e=o.getComponent("square"),n=i.getComponent("square");if(e.num==n.num&&(o.x-i.x)*(o.x-i.x)+(o.y-i.y)*(o.y-i.y)<_config.DEL_MERGE*_config.DEL_MERGE){this.merge2Square(o,i);break}}}},checkMoveDown:function(){},updateTimer:function(){this.progressTimer.progress=this.timer/_config.TIMER},checkProcessing:function(){for(var o=0;o<this.listSquare.length;o++){var t=this.listSquare[o].getComponent("square");if(t.isTouching||t.isMovingDown)return!0}return!1},checkEndgame:function(){for(var o=0;o<this.listSquare.length;o++)if(7==this.listSquare[o].getComponent("square").row)return!0},moveUpAll:function(){for(var o=0;o<this.listSquare.length;o++){var t=this.listSquare[o],i=t.getComponent("square"),e=i.row,n=i.col;i.row=e+1,i.col=n;var c=_config.getPosSquare(i.col,i.row);t.setPosition(c.x,c.y),t.active=!0}},gameOver:function(){this.scene.showGrGameOver()},addRow:function(){if(this.checkEndgame())this.gameOver();else{this.isCheckAddRow=!1,this.timer=_config.TIMER;for(var o=0;o<6;o++){var t=Math.floor(1+(this.maxNum-2)*Math.random()),i=this.getSquare(t);i.active=!0,this.listSquare.push(i);var e=i.getComponent("square"),n=o;e.row=-1,e.col=n;var c=_config.getPosSquare(n,-1);i.setPosition(c.x,c.y)}for(var r=this.listSquare.length-6;r<this.listSquare.length;r++){var s=this.listSquare[r];this.maxNum>=10&&this.maxNum<15?this.setRandomJoint(s,2):this.maxNum>=15&&this.setRandomJoint(s,5)}this.moveUpAll()}},update:function(o){this.isPause||(this.timer>0&&(this.timer-=o,this.updateTimer(),this.checkAddRow()&&(this.timer=0,this.isCheckAddRow=!0),this.timer<0&&(this.timer=0,this.isCheckAddRow=!0)),this.isCheckAddRow&&(this.checkProcessing()||this.addRow()))}}),cc._RF.pop()},{}],grHeightNum:[function(o,t){"use strict";cc._RF.push(t,"cfe74tQ/+BNopPGxfFmU3ZX","grHeightNum"),cc.Class({extends:cc.Component,properties:{},initScene:function(o){this.scene=o},show:function(){this.node.active=!0},hide:function(){this.node.active=!1},onBtnContinue:function(){this.scene.hideGrHeightNum()}}),cc._RF.pop()},{}],grHome:[function(o,t){"use strict";cc._RF.push(t,"9b3ffXn3gxKzrW3gte8tIa/","grHome"),cc.Class({extends:cc.Component,properties:{imgSelect:cc.Node},initScene:function(o){this.scene=o},show:function(){this.node.active=!0,this.imgSelect.setPosition(-150,-90)},hide:function(){this.node.active=!1},onBtn5:function(){this.imgSelect.setPosition(-150,-90)},onBtn10:function(){this.imgSelect.setPosition(0,-90)},onBtn15:function(){this.imgSelect.setPosition(150,-90)},onBtnLeaderBoard:function(){this.scene.showGrLeaderBoard()},onBtnGamePlay:function(){this.scene.showGrGamePlay()}}),cc._RF.pop()},{}],grLeaderBoard:[function(o,t){"use strict";cc._RF.push(t,"780ad9rEwxB2YECyxh891Mh","grLeaderBoard"),cc.Class({extends:cc.Component,properties:{lblFriend:cc.Node,lblGlobal:cc.Node},initScene:function(o){this.scene=o},show:function(){this.node.active=!0,_config.isFriend?(this.lblFriend.color=_config.colorOn,this.lblGlobal.color=_config.colorOff):(this.lblFriend.color=_config.colorOff,this.lblGlobal.color=_config.colorOn)},hide:function(){this.node.active=!1},onBtnFriend:function(){_config.isFriend=!0,_config.isFriend?(this.lblFriend.color=_config.colorOn,this.lblGlobal.color=_config.colorOff):(this.lblFriend.color=_config.colorOff,this.lblGlobal.color=_config.colorOn)},onBtnGlobal:function(){_config.isFriend=!1,_config.isFriend?(this.lblFriend.color=_config.colorOn,this.lblGlobal.color=_config.colorOff):(this.lblFriend.color=_config.colorOff,this.lblGlobal.color=_config.colorOn)},onBtnClose:function(){this.scene.showGrHome()}}),cc._RF.pop()},{}],grLoading:[function(o,t){"use strict";cc._RF.push(t,"4f9cfAUjEVPbbQLYqSHcKba","grLoading"),cc.Class({extends:cc.Component,properties:{ani:cc.Node},start:function(){this.ani.getComponent(cc.Animation).play("loading")},initScene:function(o){this.scene=o,this.scene.loadingResouce()},show:function(){this.node.active=!0},hide:function(){this.node.active=!1}}),cc._RF.pop()},{}],grPause:[function(o,t){"use strict";cc._RF.push(t,"4a80fik3FdCILcxpUbrOc4o","grPause"),cc.Class({extends:cc.Component,properties:{imgSoundOn:cc.Node,imgMusicOn:cc.Node},initScene:function(o){this.scene=o},show:function(){this.node.active=!0,_config.SoundOn?this.imgSoundOn.active=!0:this.imgSoundOn.active=!1,_config.MusicOn?this.imgMusicOn.active=!0:this.imgMusicOn.active=!1},onBtnSound:function(){_config.SoundOn=!_config.SoundOn,_config.SoundOn?this.imgSoundOn.active=!0:this.imgSoundOn.active=!1},onBtnMusic:function(){_config.MusicOn=!_config.MusicOn,_config.MusicOn?this.imgMusicOn.active=!0:this.imgMusicOn.active=!1},hide:function(){this.node.active=!1},onBtnClose:function(){this.scene.hideGrPause()},onBtnHome:function(){this.scene.showGrHome()},onBtnReplay:function(){this.scene.showGrGamePlay()}}),cc._RF.pop()},{}],main:[function(o,t){"use strict";cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","main"),cc.Class({extends:cc.Component,properties:{grLoading:{default:null,type:cc.Node},grHome:{default:null,type:cc.Node},grLeaderBoard:{default:null,type:cc.Node},grGamePlay:{default:null,type:cc.Node},grPause:{default:null,type:cc.Node},grContinue:{default:null,type:cc.Node},grGameOver:{default:null,type:cc.Node},grHeightNum:{default:null,type:cc.Node}},onLoad:function(){var o=this;cc.loader.loadRes("grLoading",cc.Prefab,function(t,i){t||(o.grLoading=cc.instantiate(i),o.node.addChild(o.grLoading),o.grLoading.getComponent("grLoading").initScene(o),_config.isTest||(document.getElementById("splashLogin").style.display="none"))})},loadingResouce:function(){var o=this;cc.loader.loadRes("grHome",cc.Prefab,function(t,i){t||(o.grHome=cc.instantiate(i),o.node.addChild(o.grHome),o.grHome.active=!1,o.grHome.getComponent("grHome").initScene(o),o.checkShowHome())}),cc.loader.loadRes("grGamePlay",cc.Prefab,function(t,i){t||(o.grGamePlay=cc.instantiate(i),o.node.addChild(o.grGamePlay),o.grGamePlay.active=!1,o.grGamePlay.getComponent("grGamePlay").initScene(o),o.checkShowHome())}),cc.loader.loadRes("grLeaderBoard",cc.Prefab,function(t,i){t||(o.grLeaderBoard=cc.instantiate(i),o.node.addChild(o.grLeaderBoard),o.grLeaderBoard.active=!1,o.grLeaderBoard.getComponent("grLeaderBoard").initScene(o),o.checkShowHome())}),cc.loader.loadRes("grGameOver",cc.Prefab,function(t,i){t||(o.grGameOver=cc.instantiate(i),o.node.addChild(o.grGameOver),o.grGameOver.active=!1,o.grGameOver.getComponent("grGameOver").initScene(o),o.checkShowHome())}),cc.loader.loadRes("grPause",cc.Prefab,function(t,i){t||(o.grPause=cc.instantiate(i),o.node.addChild(o.grPause),o.grPause.zIndex=100,o.grPause.active=!1,o.grPause.getComponent("grPause").initScene(o),o.checkShowHome())}),cc.loader.loadRes("grContinue",cc.Prefab,function(t,i){t||(o.grContinue=cc.instantiate(i),o.node.addChild(o.grContinue),o.grContinue.zIndex=100,o.grContinue.active=!1,o.grContinue.getComponent("grContinue").initScene(o),o.checkShowHome())}),cc.loader.loadRes("grHeightNum",cc.Prefab,function(t,i){t||(o.grHeightNum=cc.instantiate(i),o.node.addChild(o.grHeightNum),o.grHeightNum.zIndex=100,o.grHeightNum.active=!1,o.grHeightNum.getComponent("grHeightNum").initScene(o),o.checkShowHome())})},checkShowHome:function(){null!=this.grHome&&null!=this.grLeaderBoard&&null!=this.grGamePlay&&null!=this.grPause&&null!=this.grContinue&&null!=this.grGameOver&&null!=this.grHeightNum&&(this.hideGrLoading(),this.initPhysics(),this.showGrHome())},initPhysics:function(){cc.director.getPhysicsManager().enabled=!0,cc.director.getPhysicsManager().enabledAccumulator=!0,cc.director.getPhysicsManager().gravity=cc.v2(0,0)},pausePhysics:function(){cc.director.getPhysicsManager().enabled=!1,cc.director.getPhysicsManager().enabledAccumulator=!1},resumePhysics:function(){cc.director.getPhysicsManager().enabled=!0,cc.director.getPhysicsManager().enabledAccumulator=!0},hideAll:function(){null!=this.grHome&&this.hideGrHome(),null!=this.grLeaderBoard&&this.hideGrLeaderBoard(),null!=this.grLoading&&this.hideGrLoading(),null!=this.grGamePlay&&this.hideGrGamePlay(),null!=this.grPause&&this.hideGrPause(),null!=this.grContinue&&this.hideGrContinue(),null!=this.grGameOver&&this.hideGrGameOver(),null!=this.grHeightNum&&this.hideGrHeightNum()},showGrHeightNum:function(){null!=this.grHeightNum&&this.grHeightNum.getComponent("grHeightNum").show()},hideGrHeightNum:function(){null!=this.grHeightNum&&this.grHeightNum.getComponent("grHeightNum").hide()},showGrContinue:function(){null!=this.grContinue&&this.grContinue.getComponent("grContinue").show()},hideGrContinue:function(){null!=this.grContinue&&this.grContinue.getComponent("grContinue").hide()},showGrGameOver:function(){this.hideAll(),null!=this.grGameOver&&this.grGameOver.getComponent("grGameOver").show()},hideGrGameOver:function(){null!=this.grGameOver&&this.grGameOver.getComponent("grGameOver").hide()},showGrLeaderBoard:function(){this.hideAll(),null!=this.grLeaderBoard&&this.grLeaderBoard.getComponent("grLeaderBoard").show()},hideGrLeaderBoard:function(){null!=this.grLeaderBoard&&this.grLeaderBoard.getComponent("grLeaderBoard").hide()},showGrHome:function(){this.hideAll(),null!=this.grHome&&this.grHome.getComponent("grHome").show()},hideGrHome:function(){null!=this.grHome&&this.grHome.getComponent("grHome").hide()},showGrPause:function(){null!=this.grPause&&this.grPause.getComponent("grPause").show()},hideGrPause:function(){null!=this.grPause&&this.grPause.getComponent("grPause").hide()},hideGrLoading:function(){null!=this.grLoading&&this.grLoading.getComponent("grLoading").hide()},showGrGamePlay:function(){this.hideAll(),null!=this.grGamePlay&&this.grGamePlay.getComponent("grGamePlay").show()},hideGrGamePlay:function(){null!=this.grGamePlay&&this.grGamePlay.getComponent("grGamePlay").hide()},update:function(){}}),cc._RF.pop()},{}],sqmove:[function(o,t){"use strict";cc._RF.push(t,"ab84cS4/KBD+5GXH4h1doue","sqmove"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.rigidBody=this.getComponent(cc.RigidBody),this.rigidBody.type=cc.RigidBodyType.Static,this.rigidBody.gravityScale=0,this.rigidBody.linearDamping=0,this.rigidBody.angularDamping=0,this.rigidBody.linearVelocity=cc.v2(0,0),this.rigidBody.angularVelocity=0,this.rigidBody.bullet=!1,this.rigidBody.active=!0,this.setTouchSquare()},setTouchSquare:function(){this.node.on(cc.Node.EventType.TOUCH_START,function(){},this),this.node.on(cc.Node.EventType.TOUCH_MOVE,function(o){this.touchX=o.touch.getLocationInView().x-cc.winSize.width/2,this.touchY=-(o.touch.getLocationInView().y-cc.winSize.height/2),this.node.setPosition(this.touchX,this.touchY)},this),this.node.on(cc.Node.EventType.TOUCH_END,function(){},this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(){},this)}}),cc._RF.pop()},{}],square:[function(o,t){"use strict";cc._RF.push(t,"e65b4/s4YJGz4htnzLv1VRU","square"),cc.Class({extends:cc.Component,properties:{x0:0,y0:0,xStop:0,yStop:0,delX:0,delY:0,vx:0,vy:0,del0:0,TOP:cc.Node,lbl:cc.Label,imgJoint:cc.Node,mover:cc.Node,num:0,jointList:{default:[],type:cc.Node}},onLoad:function(){this.rigidBody=this.getComponent(cc.RigidBody),this.rigidBody.type=cc.RigidBodyType.Static,this.rigidBody.gravityScale=0,this.rigidBody.linearDamping=0,this.rigidBody.angularDamping=0,this.rigidBody.linearVelocity=cc.v2(0,0),this.rigidBody.angularVelocity=0,this.rigidBody.bullet=!0,this.rigidBody.active=!0,this.physics=this.getComponent(cc.PhysicsPolygonCollider),this.physics.density=0,this.physics.sensor=!1,this.physics.friction=0,this.physics.restitution=0,this.setStartSquare(),this.setTouchSquare()},startMoveJoint:function(){this.rigidBody.type=cc.RigidBodyType.Dynamic;for(var o=0;o<this.jointList.length;o++)this.jointList[o].getComponent("square").rigidBody.type=cc.RigidBodyType.Dynamic},stopMoveJoint:function(){this.joint&&this.joint.destroy(),this.rigidBody.type=cc.RigidBodyType.Static;for(var o=0;o<this.jointList.length;o++)this.jointList[o].getComponent("square").rigidBody.type=cc.RigidBodyType.Static},setStartSquare:function(){this.TOP.on(cc.Node.EventType.TOUCH_START,function(){this.scene.checkProcessing()||(this.startMoveJoint(),this.isTouching=!0)},this)},checkCanMoveTo:function(){return!1},setPlayerMove:function(o,t,i,e){this.x0=this.node.x,this.y0=this.node.y,this.xStop=this.node.x+i,this.yStop=this.node.y+e,this.delX=i,this.delY=e,this.vx=o,this.vy=t,this.del0=i*i+e*e,this.rigidBody.linearVelocity=cc.v2(o,t)},setTouchStartControl:function(){var o,t,i=this.touchX-this.node.x,e=this.touchY-this.node.y,n=Math.sqrt(i*i+e*e)/_config.V_MOVE;n<.01&&(n=.01),o=i/n,t=e/n,this.setPlayerMove(o,t,i,e)},setTouchMoveControl:function(){var o=this.touchX-this.node.x,t=this.touchY-this.node.y,i=(new Date).getTime(),e=0,n=0,c=i-this.timeStart1;c<15&&(c=15),0!=this.timeStart1&&(e=1e3*o/c,n=1e3*t/c),this.timeStart1=i,this.setPlayerMove(e,n,o,t)},setTouchSquare:function(){this.node.on(cc.Node.EventType.TOUCH_START,function(o){this.touchX=o.touch.getLocationInView().x-cc.winSize.width/2,this.touchY=-(o.touch.getLocationInView().y-cc.winSize.height/2),this.setTouchStartControl()},this),this.node.on(cc.Node.EventType.TOUCH_MOVE,function(o){this.touchX=o.touch.getLocationInView().x-cc.winSize.width/2,this.touchY=-(o.touch.getLocationInView().y-cc.winSize.height/2),this.setTouchMoveControl()},this),this.node.on(cc.Node.EventType.TOUCH_END,function(){this.setEndTouch()},this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(){this.setEndTouch()},this)},setColRowJoint:function(o,t){if(0!=o||0!=t){this.col+=o,this.row+=t;for(var i=0;i<this.jointList.length;i++){var e=this.jointList[i].getComponent("square");e.col+=o,e.row+=t}}},traceTest:function(){if(0!=this.jointList.length){cc.log("target ================ "+this.num),cc.log("col == "+this.col),cc.log("row == "+this.row);for(var o=0;o<this.jointList.length;o++){var t=this.jointList[o].getComponent("square");cc.log("num ======= "+t.num),cc.log("col == "+t.col),cc.log("row == "+t.row)}}},setPosJoint:function(){var o=_config.getPosSquare(this.col,this.row);this.node.setPosition(o.x,o.y);for(var t=0;t<this.jointList.length;t++){var i=this.jointList[t],e=i.getComponent("square"),n=_config.getPosSquare(e.col,e.row);i.setPosition(n.x,n.y)}},setEndTouch:function(){if(this.isTouching){this.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0),this.stopMoveJoint();var o=Math.round((this.node.x-_config.X_GRID)/(_config.WID_SQUARE+_config.X_DEL)),t=Math.round((this.node.y-_config.Y_GRID)/(_config.HEI_SQUARE+_config.Y_DEL)),i=this.scene.getSquareByRowCol(o,t);if(i!=this.node&&null!=i&&i.getComponent("square").num==this.num)return void this.scene.merge2Square(this.node,i);this.setColRowJoint(o-this.col,t-this.row),this.setPosJoint(),this.scene.checkAllMoveDown(),this.setMoveDown(),this.isTouching=!1,this.timeStart1=0}},setMoveDown:function(){if(this.isMovingDown=!0,this.isTouching)for(var o=0;o<this.jointList.length;o++)this.jointList[o].getComponent("square").setMoveDown()},initScene:function(o){this.scene=o},checkInJoint:function(o){if(o==this.node)return!0;for(var t=0;t<this.jointList.length;t++)if(this.jointList[t]==o)return!0;return!1},addJoint:function(o){this.jointList.push(o)},setImgJoint:function(o,t){if(-1!=t)switch(this.imgJoint.active=!0,t){case _config.LEFT:this.imgJoint.setScale(16,35),this.imgJoint.setPosition(-52,0);break;case _config.RIGHT:this.imgJoint.setScale(16,35),this.imgJoint.setPosition(52,0);break;case _config.TOP:this.imgJoint.setScale(35,16),this.imgJoint.setPosition(0,52);break;case _config.BOTTOM:this.imgJoint.setScale(35,16),this.imgJoint.setPosition(0,-52)}},reset:function(o,t){this.setColRowJoint(o-this.col,t-this.row),this.setPosJoint();for(var i=0;i<this.jointList.length;i++){var e=this.jointList[i];if(e!=this.node){var n=e.getComponent("square"),c=e.getComponent(cc.WeldJoint);c&&c.connectedBody==this.rigidBody&&(n.imgJoint.active=!1,c.destroy());for(var r=0;r<n.jointList.length;r++)n.jointList[r]==this.node&&n.jointList.splice(r,1)}}this.imgJoint.active=!1,this.jointList=[];var s=this.node.getComponent(cc.WeldJoint);s&&s.destroy(),this.rigidBody.type=cc.RigidBodyType.Static,this.rigidBody.linearVelocity=cc.v2(0,0),this.isMovingDown=!1,this.isTouching=!1},setNum:function(o){this.num=o,this.lbl.string=o+"";var t=_config.getColorTextByNum(o);this.lbl.node.color=t;var i=_config.getColorByNum(o);this.node.color=i},onBeginContact:function(){},onEndContact:function(){},checkCanMoveDown:function(){if(0==this.row)return!1;if(null!=this.scene.getSquareByRowCol(this.col,this.row-1))return!1;if(this.isTouching)return!1;for(var o=0;o<this.jointList.length;o++){var t=this.jointList[o].getComponent("square");if(t.isTouching)return!1;var i=t.col,e=t.row;if(0==e)return!1;if(null!=this.scene.getSquareByRowCol(i,e-1)&&!this.checkInJoint(this.scene.getSquareByRowCol(i,e-1)))return!1}return!0},setMoveDownEnd:function(){var o=this;if(this.isMovingDown){this.rigidBody.linearVelocity=cc.v2(0,0);var t=Math.round((this.node.x-_config.X_GRID)/(_config.WID_SQUARE+_config.X_DEL)),i=Math.round((this.node.y-_config.Y_GRID)/(_config.HEI_SQUARE+_config.Y_DEL));setTimeout(function(){o.setColRowJoint(t-o.col,i-o.row),o.setPosJoint(),o.scene.checkAllMoveDown(),o.resetDownJoin()},1)}},resetDownJoin:function(){this.isMovingDown=!1,this.rigidBody.type=cc.RigidBodyType.Static;for(var o=0;o<this.jointList.length;o++){var t=this.jointList[o].getComponent("square");t.isMovingDown=!1,t.rigidBody.type=cc.RigidBodyType.Static}},checkEndMoveDown:function(){var o=Math.round((this.node.x-_config.X_GRID)/(_config.WID_SQUARE+_config.X_DEL)),t=Math.round((this.node.y-_config.Y_GRID)/(_config.HEI_SQUARE+_config.Y_DEL)),i=this.scene.getSquareByRowColMerge(o,t);if(null==i||i.getComponent("square").num!=this.num){if(0==t)return this.setColRowJoint(o-this.col,t-this.row),this.setPosJoint(),this.scene.checkAllMoveDown(),void this.resetDownJoin();var e=this.scene.getSquareByRowCol(o,t-1);if(null!=e){if(this.checkInJoint(e))return;e.getComponent("square").num!=this.num&&(this.setColRowJoint(o-this.col,t-this.row),this.setPosJoint(),this.scene.checkAllMoveDown(),this.resetDownJoin())}}else this.scene.merge2Square(this.node,i)},CheckUpdateColRow:function(){var o=Math.round((this.node.y-_config.Y_GRID)/(_config.HEI_SQUARE+_config.Y_DEL)),t=Math.round((this.node.x-_config.X_GRID)/(_config.WID_SQUARE+_config.X_DEL));if(t!=this.col||o!=this.row){var i=this.node.x,e=_config.X_GRID+t*(_config.WID_SQUARE+_config.X_DEL),n=this.col;Math.abs(i-e)<=10&&(n=t),this.setColRowJoint(n-this.col,o-this.row),this.scene.checkAllMoveDown()}},checkMerge:function(){this.scene.checkMerge(this.node);for(var o=0;o<this.jointList.length;o++){var t=this.jointList[o];this.scene.checkMerge(t)}},update:function(){this.scene.isPause||(this.isTouching&&((this.x0-this.node.x)*(this.x0-this.node.x)+(this.y0-this.node.y)*(this.y0-this.node.y)>=this.del0-50&&(this.rigidBody.linearVelocity=cc.v2(0,0),this.vx=0,this.vy=0),this.CheckUpdateColRow(),this.checkMerge()),this.isMovingDown&&(this.node.y-=_config.Y_DIS,this.CheckUpdateColRow(),this.checkEndMoveDown()))}}),cc._RF.pop()},{}],use_reversed_rotateTo:[function(o,t){"use strict";cc._RF.push(t,"78e91XprnlD1LNW19N2El3j","use_reversed_rotateTo"),cc.RotateTo._reverse=!0,cc._RF.pop()},{}]},{},["config","grContinue","grGameOver","grGamePlay","grHeightNum","grHome","grLeaderBoard","grLoading","grPause","main","sqmove","square","use_reversed_rotateTo"]);