window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  all_modules: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "729f19Hu2ZJ9ZSyZWzvBjRv", "all_modules");
    "use strict";
    var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
      void 0 === k2 && (k2 = k);
      Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
          return m[k];
        }
      });
    } : function(o, m, k, k2) {
      void 0 === k2 && (k2 = k);
      o[k2] = m[k];
    });
    var __exportStar = this && this.__exportStar || function(m, exports) {
      for (var p in m) "default" === p || Object.prototype.hasOwnProperty.call(exports, p) || __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.types = void 0;
    __exportStar(require("../services/utils/utils_common"), exports);
    __exportStar(require("../services/utils/utils_data"), exports);
    __exportStar(require("../services/utils/utils_ui"), exports);
    __exportStar(require("../services/utils/utils_anim_fx"), exports);
    exports.types = require("./system_types");
    __exportStar(require("../services/audio/audio"), exports);
    __exportStar(require("../system/app_events"), exports);
    __exportStar(require("../system/login"), exports);
    __exportStar(require("../core-game/graphic_lib"), exports);
    __exportStar(require("../core-game/level_manager"), exports);
    __exportStar(require("../system/resources_manager"), exports);
    __exportStar(require("../core-game/control"), exports);
    __exportStar(require("../core-game/map_visual"), exports);
    __exportStar(require("../core-game/core_game"), exports);
    __exportStar(require("../core-game/game_flow"), exports);
    __exportStar(require("../core-game/user_model"), exports);
    __exportStar(require("../system/configurations/config_anim_fx"), exports);
    __exportStar(require("../core-game/ui-gameplay/core_ui"), exports);
    __exportStar(require("../core-game/ui-gameplay/core_fx"), exports);
    __exportStar(require("../features/settings/settings_view"), exports);
    __exportStar(require("../system/localizations/localize"), exports);
    cc._RF.pop();
  }, {
    "../core-game/control": "control",
    "../core-game/core_game": "core_game",
    "../core-game/game_flow": "game_flow",
    "../core-game/graphic_lib": "graphic_lib",
    "../core-game/level_manager": "level_manager",
    "../core-game/map_visual": "map_visual",
    "../core-game/ui-gameplay/core_fx": "core_fx",
    "../core-game/ui-gameplay/core_ui": "core_ui",
    "../core-game/user_model": "user_model",
    "../features/settings/settings_view": "settings_view",
    "../services/audio/audio": "audio",
    "../services/utils/utils_anim_fx": "utils_anim_fx",
    "../services/utils/utils_common": "utils_common",
    "../services/utils/utils_data": "utils_data",
    "../services/utils/utils_ui": "utils_ui",
    "../system/app_events": "app_events",
    "../system/configurations/config_anim_fx": "config_anim_fx",
    "../system/localizations/localize": "localize",
    "../system/login": "login",
    "../system/resources_manager": "resources_manager",
    "./system_types": "system_types"
  } ],
  anim_event_comp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1bc47EZZkFF8rbV7uAlH4ia", "anim_event_comp");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const _G = require("../system/all_modules");
    const _ = _G._;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AnimEventComp = class AnimEventComp extends cc.Component {
      playFXLevelUp() {
        _G.planeUnlock.playFXLevelUp();
      }
      playFXCelebrate() {
        _G.planeUnlock.playFXCelebrate();
      }
      playFxUFOSucksCoinsUp() {
        _G.ufoView.playFxCoinCollect();
      }
    };
    AnimEventComp = __decorate([ ccclass ], AnimEventComp);
    exports.default = AnimEventComp;
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  app_events: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "52c68VZ3tVDqZkl4VYVp838", "app_events");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.appEvents = void 0;
    const _G = require("../system/all_modules");
    const _ = _G._;
    exports.appEvents = {
      isAppHidden: false,
      onAppShowCallbackArr: [],
      onAppHideCallbackArr: [],
      onAppShow() {
        this.isAppHidden = false;
        this.onAppShowCallbackArr.map(f => f());
      },
      addAppShowCallback(f) {
        this.onAppShowCallbackArr.push(f);
      },
      onAppHide() {
        this.isAppHidden = true;
        this.onAppHideCallbackArr.map(f => f());
      },
      addAppHideCallback(f) {
        this.onAppHideCallbackArr.push(f);
      }
    };
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  audio: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "272e5CwR4dAUYlvs84u9gnx", "audio");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.audio = void 0;
    const _G = require("../../system/all_modules");
    const _ = _G._;
    exports.audio = {
      audioList: {},
      playingIdList: {},
      isSoundOff: true,
      isMusicOff: true,
      init() {
        _G.login.addLoginDataFields("isMusicOff", "isSoundOff");
        _G.login.addCallback(data => {
          this.isMusicOff = data.isMusicOff;
          this.isSoundOff = data.isSoundOff;
          _G.coreUI.updateSoundIcon();
        });
        _.setTimeout(() => this.loadAudioFiles(), 1e3);
      },
      toggleSound() {
        this.isSoundOff = !this.isSoundOff;
        _G.utilsData.save({
          isSoundOff: this.isSoundOff
        });
        this.isSoundOff && this.stopBgMusic();
      },
      loadAudioFiles() {
        cc.resources.loadDir("audios", cc.AudioClip, (err, res) => {
          if (err) return _.log(err);
          for (let clip of res) this.audioList[clip.name] = clip;
        });
      },
      playSound(name, volume = 1) {
        if (this.isSoundOff || !this.audioList[name]) return;
        try {
          this.playingIdList[name] = cc.audioEngine.play(this.audioList[name], false, volume);
        } catch (e) {}
      },
      stopSound(name) {
        this.playingIdList[name] && cc.audioEngine.stopEffect(this.playingIdList[name]);
      },
      playBgMusic(volume = 1) {
        if (this.isMusicOff) return;
        if (cc.audioEngine.isMusicPlaying()) return;
        try {
          this.playingIdList["bg_music"] = cc.audioEngine.playMusic(this.audioList["bg_music"], true);
          cc.audioEngine.setMusicVolume(volume);
        } catch (e) {
          _.log("playMusic err ", e);
        }
      },
      stopBgMusic() {
        cc.audioEngine.isMusicPlaying() && cc.audioEngine.stopMusic();
      },
      playSoundClickButton() {
        if (this.isSoundOff) return;
        this.playSound("button_click", 1);
      }
    };
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules"
  } ],
  config_anim_fx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c32cdMd/oBASIHmkQeG3U5M", "config_anim_fx");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.configAnimFx = void 0;
    const _G = require("../../system/all_modules");
    const _ = _G._;
    exports.configAnimFx = {
      defaultParticleFlyA2BConfigs: {
        numberOfNode: 15,
        delayStartTime: .02,
        flyDuration: .6,
        randomBezierPointRange: {
          x: 300,
          y: 300
        }
      },
      questKeysFlyA2BConfigs: {
        numberOfNode: 8,
        delayStartTime: .05,
        flyDuration: .6,
        randomBezierPointRange: {
          x: 100,
          y: 50
        }
      }
    };
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules"
  } ],
  control: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "04bc3FI6gxPtqvezu3kr8M+", "control");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.control = void 0;
    const _G = require("../system/all_modules");
    const _ = _G._;
    exports.control = {
      draggableRect: null,
      grandTileGroup: [],
      init() {
        cc.find("Canvas/nag_screen").on("touchend", event => {
          _.log("------- Canvas on touchend >> event = ", event);
        });
        this.setUpMultiTilesSelection();
        this.setUpDraggableArea();
        window.onresize = () => _.setTimeout(() => this.setUpDraggableArea(), 200);
      },
      setUpMultiTilesSelection() {
        const selectionPad = cc.find("Canvas/play_area/selection_pad");
        const selectionHighlight = cc.find("Canvas/play_area/selection-highlight");
        selectionHighlight.width = selectionHighlight.height = 0;
        if (cc.sys.isMobile) return;
        let startPos;
        _G.utilsUI.singleTouchSet(selectionPad, pos => {
          startPos = pos;
          this.grandTileGroup = [];
          _.setGlobalPos(selectionHighlight, pos);
        }, pos => {
          const diffVec = pos.sub(startPos);
          selectionHighlight.width = _.abs(diffVec.x);
          selectionHighlight.height = _.abs(diffVec.y);
          selectionHighlight.scaleX = _.sign(diffVec.x);
          selectionHighlight.scaleY = -_.sign(diffVec.y);
        }, pos => {
          const selectGRect = selectionHighlight.getBoundingBoxToWorld();
          const groupLinkArr = [];
          _G.mapVisual.getTileArr().map(tileNode => {
            const tileGPos = _.getGlobalPosition(tileNode);
            const tileRect = new cc.Rect(tileGPos.x, tileGPos.y, tileNode.width, tileNode.height);
            if (!tileRect.intersects(selectGRect)) return _G.mapVisual.tileHighlightOff(tileNode);
            _.addUniqueElemToArr(groupLinkArr, tileNode.linkedGroup);
          });
          groupLinkArr.map(group => {
            group.map(node => {
              _G.mapVisual.tileHighlightOn(node);
              this.grandTileGroup.push(node);
            });
          });
          selectionHighlight.width = selectionHighlight.height = 0;
        });
      },
      hightlightOffAllTiles() {
        this.grandTileGroup.map(tileNode => {
          tileNode.linkedGroup.map(node => {
            _G.mapVisual.tileHighlightOff(node);
          });
        });
        this.grandTileGroup = [];
      },
      setUpDraggableArea() {
        const dragAreaNode = cc.find("Canvas/play_area/draggable_area");
        dragAreaNode.width = cc.winSize.width - 20;
        this.draggableRect = dragAreaNode.getBoundingBoxToWorld();
        _G.coreGame.rearrangeTilesToFitViewPort();
      },
      initTileControl(tappedTileNode) {
        let selectedTileArr;
        _G.utilsUI.singleTouchSet(tappedTileNode, pos => {
          if (_G.gameFlow.isWin) return;
          selectedTileArr = tappedTileNode.isHighlighted ? this.grandTileGroup : tappedTileNode.linkedGroup;
          selectedTileArr.map(node => {
            node.posDiff = _.getGlobalPosition(node).sub(pos);
            _G.mapVisual.tileUp(node);
            const myPos = pos.add(node.posDiff);
            _.setGlobalPos(node, myPos);
            _.setGlobalPos(node.shadowNode, myPos);
          });
        }, pos => {
          window["_IS_GAME_USING_TOUCHMOVES"] = true;
          if (_G.gameFlow.isWin) return;
          selectedTileArr.map(node => {
            const myPos = pos.add(node.posDiff);
            _.setGlobalPos(node, myPos);
            node.shadowNode.active && _.setGlobalPos(node.shadowNode, myPos);
          });
        }, pos => {
          if (_G.gameFlow.isWin) return;
          window["_IS_GAME_USING_TOUCHMOVES"] = false;
          selectedTileArr.map(node => {
            _G.mapVisual.tileDown(node);
            _G.coreGame.onTileDrop(node);
          });
          const adjustedTileGroup = [];
          selectedTileArr.map(myTileNode => {
            if (adjustedTileGroup.includes(myTileNode.linkedGroup)) return;
            this.adjustTileGroupToFitDraggableArea(myTileNode);
            adjustedTileGroup.push(myTileNode.linkedGroup);
          });
          this.hightlightOffAllTiles();
          _G.gameFlow.captureGameSnapShot();
        });
      },
      adjustTileGroupToFitDraggableArea(tileNode) {
        const centerVec = this.draggableRect.center;
        const linkedGroup = tileNode.linkedGroup;
        const hasSomeValidTile = linkedGroup.some(myNode => {
          const tileGPos = myNode.gPos = _.getGlobalPosition(myNode).add(cc.v2(myNode.width / 2, myNode.height / 2));
          myNode.posDiff = tileGPos.sub(centerVec);
          myNode.distanceToCenter = myNode.posDiff.mag();
          return this.draggableRect.contains(tileGPos);
        });
        if (hasSomeValidTile) return;
        const minDistance = _.min(...linkedGroup.map(node => node.distanceToCenter));
        const leastHiddenTile = linkedGroup.find(node => node.distanceToCenter == minDistance);
        const posDiff = leastHiddenTile.posDiff;
        const correctPosDiff = posDiff.clone();
        _.abs(posDiff.x) > this.draggableRect.width / 2 && (correctPosDiff.x = _.sign(posDiff.x) * this.draggableRect.width / 2);
        _.abs(posDiff.y) > this.draggableRect.height / 2 && (correctPosDiff.y = _.sign(posDiff.y) * this.draggableRect.height / 2);
        const moveVec = centerVec.add(correctPosDiff).sub(leastHiddenTile.gPos);
        linkedGroup.map(node => {
          node.position = node.position.add(moveVec);
        });
      }
    };
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  core_fx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "96b33MmBstOOJJJhp7kz4/e", "core_fx");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.coreFX = void 0;
    const _G = require("../../system/all_modules");
    const _ = _G._;
    exports.coreFX = {
      fxContainer: null,
      coinSampleNode: null,
      gemSampleNode: null,
      init() {
        this.coinSampleNode = cc.find("Canvas/sample_nodes/icon_coin");
        this.gemSampleNode = cc.find("Canvas/sample_nodes/icon_gem");
        this.fxContainer = cc.find("Canvas/fx_container");
        this.fxContainer.zIndex = 1e3;
      },
      onWin() {
        const confetti = cc.find("Canvas/fx_container/fx_confetti");
        confetti.active = true;
        _.setTimeout(() => this.clearWin(), 6e3);
      },
      clearWin() {
        const confetti = cc.find("Canvas/fx_container/fx_confetti");
        confetti.active = false;
      },
      animClaimCurrency(sampleNode, sourceFlyNode, destFlyNode, balanceLabelNode, oldAmount, addedAmount, delayTime = 0) {
        _.setTimeout(() => {
          _G.utilsAnimFx.particlesFlyFromA2B(sampleNode, sourceFlyNode, destFlyNode);
          _G.utilsAnimFx.playIncreasingNumberLabel(balanceLabelNode, oldAmount, addedAmount, 15, .7, .4);
        }, 1e3 * delayTime);
      },
      animClaimCoin(sourceFlyNode, destFlyNode, balanceLabelNode, addedAmount, delayTime = 0) {
        this.animClaimCurrency(this.coinSampleNode, sourceFlyNode, destFlyNode, balanceLabelNode, _G.userModel.cash - addedAmount, addedAmount, delayTime);
        _.setTimeout(() => _G.coreUI.updateAllCashLabels(), 3e3 + 1e3 * delayTime);
        _.setTimeout(() => _G.audio.playSound("money_collect"), 600 + 1e3 * delayTime);
      },
      animClaimGem(sourceFlyNode, destFlyNode, balanceLabelNode, addedAmount, delayTime = 0) {
        this.animClaimCurrency(this.gemSampleNode, sourceFlyNode, destFlyNode, balanceLabelNode, _G.userModel.gems - addedAmount, addedAmount, delayTime);
        _.setTimeout(() => _G.coreUI.updateAllGemLabels(), 3e3 + 1e3 * delayTime);
      },
      animateSellPlane(planeNode) {
        _G.utilsAnimFx.playNodeAnim(planeNode, "plane_sell");
        _G.utilsAnimFx.replayParticle(cc.find("fx_sell_smoke", planeNode));
        _G.utilsAnimFx.replayParticle(cc.find("fx_coins_splash_sell", planeNode));
      },
      xpFlyFromPlaneToBalance(planeNode) {
        let xpNode = _G.slotView.getXPNode();
        planeNode.parent.addChild(xpNode);
        xpNode.setPosition(0, 0);
        _G.utilsAnimFx.replayParticle(xpNode);
        const gPosDiff = _.getGlobalPosDiff(planeNode, cc.find("Canvas/HUD_top/player_level/icon_level"));
        let bezier = [ cc.Vec2.ZERO, gPosDiff.add(cc.v2(0, -300)), gPosDiff ];
        xpNode.runAction(cc.sequence(cc.bezierTo(.75, bezier), cc.callFunc(() => _G.playgroundUI.updateXPMeter()), cc.delayTime(.5), cc.callFunc(() => _G.slotView.putXPNode(xpNode))));
      },
      nodeAttractingParticles(sampleNode, appearAreaRect, targetNode, fxContainer, settings = {
        flyTime: .6,
        partCount: 20,
        startFadeInTime: .1,
        endFadeOutTime: .5,
        delayUnit: .03,
        offset: cc.Vec2.ZERO
      }) {
        const {delayUnit: delayUnit, flyTime: flyTime, partCount: partCount, startFadeInTime: startFadeInTime, endFadeOutTime: endFadeOutTime, offset: offset} = settings;
        const getRandomAppearPos = () => {
          const randomDeltaPos = _G.utilsAnimFx.getRandomPointInRage({
            x: appearAreaRect.width / 2,
            y: appearAreaRect.height / 2
          });
          const result = cc.v2(appearAreaRect.x + randomDeltaPos.x, appearAreaRect.y + randomDeltaPos.y);
          return result;
        };
        for (let i = 0; i < partCount; i++) _.setTimeout(() => {
          const newNode = _.copyNode(sampleNode, fxContainer || this.fxContainer);
          _.setTimeout(() => newNode.removeFromParent(), 1e3 * flyTime);
          _.setGlobalPos(newNode, getRandomAppearPos());
          const startTime = _.getMsPassedUTC();
          const startDistance = _.getGlobalPosDiff(newNode, targetNode).mag();
          newNode.opacity = 0;
          cc.tween(newNode).to(startFadeInTime, {
            opacity: 255
          }).delay(flyTime - startFadeInTime - endFadeOutTime).to(endFadeOutTime, {
            opacity: 0
          }).start();
          const intervalVar = _.setInterval(() => {
            if (!newNode || !newNode.parent) return _.clearInterval(intervalVar);
            const completionRatio = (_.getMsPassedUTC() - startTime) / (1e3 * flyTime);
            const expectedDistance = _.abs(1 - completionRatio) * startDistance;
            const currentPosDiffVec = _.getGlobalPosDiff(newNode, targetNode);
            const expectedPosDiff = currentPosDiffVec.mul(expectedDistance / currentPosDiffVec.mag());
            const expectedGPos = _.getGlobalPosition(targetNode).add(offset).sub(expectedPosDiff);
            _.setGlobalPos(newNode, expectedGPos);
          }, 10);
        }, delayUnit * i * 1e3);
      }
    };
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules"
  } ],
  core_game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d18c9K5CotOQ5HAybABZAy2", "core_game");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.coreGame = void 0;
    const _G = require("../system/all_modules");
    const _ = _G._;
    const AUTO_CONNECT_RANGE = .25;
    exports.coreGame = {
      currentLevelInfo: null,
      currentAutoConnectRange: 0,
      currentTimePassed: 0,
      init() {
        const collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        this.startTimerInterval();
      },
      startTimerInterval() {
        setInterval(() => {
          if (_G.gameFlow.isWin || _G.gameFlow.isPaused) return;
          this.currentTimePassed++;
          _G.coreUI.updateCurrentTimePassed(this.currentTimePassed);
        }, 1e3);
      },
      startGame(levelInfo, callback) {
        levelInfo = levelInfo || this.currentLevelInfo;
        this.currentLevelInfo = levelInfo;
        this.currentTimePassed = 0;
        _G.mapVisual.renderMap(levelInfo, () => {
          this.currentAutoConnectRange = AUTO_CONNECT_RANGE * _G.mapVisual.currentTileSize;
          _G.mapVisual.getTileArr().map(tileNode => {
            tileNode.linkedGroup = [ tileNode ];
            tileNode.collidingTileArr = [];
          });
          this.shuffleTiles();
          _G.coreUI.updateProgressBar(0);
          callback && callback();
        });
      },
      shuffleTiles() {
        const gridContainer = _G.mapVisual.gridContainer;
        const screenW2 = cc.winSize.width / 2;
        const screenH2 = cc.winSize.height / 2 - 90;
        const borderPadding = 1.5 * _G.mapVisual.currentTileSize;
        const adjustGap = _G.mapVisual.currentTileSize / 2;
        gridContainer.children.map(tileNode => {
          const randomX = (_.random() > .5 ? 1 : -1) * gridContainer.width * .7 * (.2 + _.random());
          const randomY = (_.random() > .5 ? 1 : -1) * gridContainer.height * .7 * (.2 + _.random());
          tileNode.x = -adjustGap + _.setInRange(randomX, screenW2 - borderPadding, -screenW2 + borderPadding) + gridContainer.width / 2;
          tileNode.y = -adjustGap + _.setInRange(randomY, screenH2 - borderPadding, -screenH2 + borderPadding) + gridContainer.height / 2;
        });
      },
      onTileDrop(tileNode) {
        tileNode.collidingTileArr.map(collidedNode => {
          if (tileNode.linkedGroup.includes(collidedNode)) return;
          this.checkConnectTile(tileNode, collidedNode);
        });
      },
      checkConnectTile(tileNode, collidedNode) {
        const cellPos1 = tileNode.cellPos, cellPos2 = collidedNode.cellPos;
        const isConnectX = cellPos1.y == cellPos2.y && 1 == _.abs(cellPos1.x - cellPos2.x);
        const isConnectY = cellPos1.x == cellPos2.x && 1 == _.abs(cellPos1.y - cellPos2.y);
        if (!isConnectX && !isConnectY) return;
        const connectAxis = isConnectX ? "x" : "y";
        const connectDimension = isConnectX ? "width" : "height";
        const highNode = cellPos1[connectAxis] > cellPos2[connectAxis] ? tileNode : collidedNode;
        const lowNode = highNode == tileNode ? collidedNode : tileNode;
        const highConnectPos = highNode.connectPos = _.getGlobalPosition(highNode).add(cc.v2(highNode.width / 2, highNode.height / 2));
        const lowConnectPos = lowNode.connectPos = _.getGlobalPosition(lowNode).add(cc.v2(lowNode.width / 2, lowNode.height / 2));
        highConnectPos[connectAxis] -= highNode[connectDimension] / 2;
        lowConnectPos[connectAxis] += lowNode[connectDimension] / 2;
        const distance = highConnectPos.sub(lowConnectPos).mag();
        if (distance > this.currentAutoConnectRange) return;
        _G.audio.playSound("tile-connect");
        const mainLinkedGroup = tileNode.linkedGroup;
        const subLinkedGroup = collidedNode.linkedGroup;
        const posDiff = tileNode.connectPos.sub(collidedNode.connectPos);
        subLinkedGroup.map(node => {
          mainLinkedGroup.push(node);
          node.linkedGroup = mainLinkedGroup;
          node.position = node.position.add(posDiff);
          _G.mapVisual.tileUp(node);
          _G.mapVisual.tileDown(node);
        });
        _.setTimeout(() => {
          mainLinkedGroup.map(node => mainLinkedGroup.map(otherNode => _.removeArrayItem(node.collidingTileArr, otherNode)));
        });
        mainLinkedGroup.length == _G.mapVisual.currentTileCount && setTimeout(() => _G.gameFlow.onWin());
        this.updateGameCompletionProgress();
      },
      updateGameCompletionProgress() {
        const tileArr = _G.mapVisual.getTileArr();
        const connectedTilesCount = tileArr.filter(tile => tile.linkedGroup.length > 1).length;
        _G.coreUI.updateProgressBar(connectedTilesCount / tileArr.length);
      },
      isTileSurroundedShadow(tileNode) {
        const tileCellPos = tileNode.cellPos;
        const expectedCellPosArr = [ tileCellPos.clone().add(cc.v2(1, 0)), tileCellPos.clone().add(cc.v2(0, -1)), tileCellPos.clone().add(cc.v2(1, -1)) ];
        return expectedCellPosArr.every(xCellPos => tileNode.linkedGroup.find(node => xCellPos.equals(node.cellPos)));
      },
      rearrangeTilesToFitViewPort() {
        const linkGroupArr = [];
        _G.mapVisual.getTileArr().map(node => {
          _.addUniqueElemToArr(linkGroupArr, node.linkedGroup);
        });
        linkGroupArr.map(tileArr => {
          const gPosArr = tileArr.map(node => _.getGlobalPosition(node).add(cc.v2(node.width / 2, node.height / 2)));
          const maxX = _.max(...gPosArr.map(pos => pos.x));
          const maxY = _.max(...gPosArr.map(pos => pos.y));
          const minX = _.min(...gPosArr.map(pos => pos.x));
          const minY = _.min(...gPosArr.map(pos => pos.y));
          const moveVec = cc.v2(0, 0);
          const draggableRect = _G.control.draggableRect;
          maxX > draggableRect.xMax && (moveVec.x = draggableRect.xMax - maxX);
          maxY > draggableRect.yMax && (moveVec.y = draggableRect.yMax - maxY);
          minX < draggableRect.xMin && (moveVec.x = draggableRect.xMin - minX);
          minY < draggableRect.yMin && (moveVec.y = draggableRect.yMin - minY);
          tileArr.map(node => node.position = node.position.add(moveVec));
        });
      }
    };
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  core_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a59c4C/ggZGrKeFH6MLR8QV", "core_ui");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.coreUI = void 0;
    const _G = require("../../system/all_modules");
    const _ = _G._;
    exports.coreUI = {
      allLayoutPathArr: [],
      selectingGameParams: {
        gridCellWidth: 3,
        gridCellHeight: 2,
        inputPicture: ""
      },
      bgColorArr: [ "#D3D3D3", "#808080", "#90EE90", "#20B2AA", "#E0FFFF", "#4682B4", "#FFEBCD", "#C78585" ],
      init() {
        cc.find("Canvas/nag_screen").zIndex = 999;
        _G.resources.addInitCallback(() => {
          this.renderPictureScrollView();
          this.renderPictureScrollViewWin();
        });
        this.renderButtonGameSize();
        this.renderButtonGame();
        this.renderButtonPreview();
        this.renderButtonBgColor();
        _G.utilsUI.makeButton("Canvas/header/timer_bar", () => _G.gameFlow.onPause());
        _G.utilsUI.makeButton("Canvas/layer_pause/btn_resume", () => _G.gameFlow.onResume());
        _G.utilsUI.makeButton("Canvas/layer_pause/btn_replay", () => _G.gameFlow.newGame());
        _G.utilsUI.makeButton("Canvas/layer_win/dialog/btn_replay", () => _G.gameFlow.newGame());
        _G.utilsUI.makeButton("Canvas/btn_full_screen", () => {
          const isFullScreen = cc.screen["fullScreen"]();
          isFullScreen ? cc.screen["exitFullScreen"]() : cc.screen["requestFullScreen"]();
        });
        _.setInterval(() => {
          const isFullScreen = cc.screen["fullScreen"]();
          cc.find("Canvas/btn_full_screen/btn_full_screen").active = !isFullScreen;
          cc.find("Canvas/btn_full_screen/btn_exit_full_screen").active = isFullScreen;
        }, 200);
        _G.utilsUI.makeButton("Canvas/btn_sound", () => {
          _G.audio.toggleSound();
          this.updateSoundIcon();
        });
      },
      updateSoundIcon() {
        const soundIcon = cc.find("Canvas/btn_sound/icon");
        soundIcon.getComponent(cc.Sprite).fillRange = _G.audio.isSoundOff ? .5 : 1;
      },
      renderButtonGame() {
        const btn = cc.find("Canvas/header/btn_new_game");
        const container = cc.find("Canvas/game_menu_container");
        const bigBG = cc.find("Canvas/game_menu_container/bg/bg_block_input");
        const btnClose = cc.find("Canvas/game_menu_container/btn_close");
        container.active = false;
        _G.utilsUI.makeButton(bigBG, () => container.active = false, true);
        _G.utilsUI.makeButton(btnClose, () => container.active = false, true);
        _G.utilsUI.makeButton(btn, () => {
          container.active = true;
          const currentLevelInfo = _G.coreGame.currentLevelInfo;
          setTimeout(() => this.scrollToPic(currentLevelInfo.inputPicture, true), 100);
          this.setMapSizeSelectorLabel(currentLevelInfo.gridCellWidth, currentLevelInfo.gridCellHeight);
          this.selectingGameParams.gridCellWidth = currentLevelInfo.gridCellWidth;
          this.selectingGameParams.gridCellHeight = currentLevelInfo.gridCellHeight;
          this.selectingGameParams.inputPicture = currentLevelInfo.inputPicture;
        }, true);
        _G.utilsUI.makeButton("Canvas/game_menu_container/btn_play", () => {
          const levelInfo = _G.coreGame.currentLevelInfo;
          Object.assign(levelInfo, this.selectingGameParams);
          const isPlayUniqueUrl = _G.gameFlow.checkPlayUniqueUrl(levelInfo.inputPicture, this.selectingGameParams.gridCellWidth, this.selectingGameParams.gridCellHeight);
          if (isPlayUniqueUrl) return;
          container.active = false;
          setTimeout(() => {
            _G.gameFlow.newGame();
          });
        });
      },
      renderButtonPreview() {
        const btn = cc.find("Canvas/header/btn_preview");
        const btnFull = cc.find("Canvas/header/btn_preview/drop_list_container/row/icon-full-preview");
        const btnOpaque = cc.find("Canvas/header/btn_preview/drop_list_container/row/icon-opaque-preview");
        const iconOpaqueCheck = cc.find("Canvas/header/btn_preview/drop_list_container/row/icon-opaque-preview/icon-done");
        const opaquePicture = _G.mapVisual.opaquePhotoNode;
        const subContainer = cc.find("Canvas/header/btn_preview/drop_list_container");
        const subBigBG = cc.find("Canvas/header/btn_preview/drop_list_container/bg/bg_block_input");
        _G.utilsUI.makeButton(subBigBG, () => subContainer.active = false, true);
        const container = cc.find("Canvas/header/picture_preview");
        const bigBG = cc.find("Canvas/header/picture_preview/bg_block_input");
        _G.utilsUI.makeButton(bigBG, () => container.active = false, true);
        _G.utilsUI.makeButton(btn, () => {
          if (_G.gameFlow.isWin) return;
          subContainer.active = true;
        }, true);
        _G.utilsUI.makeButton(btnFull, () => {
          if (_G.gameFlow.isWin) return;
          container.active = true;
          subContainer.active = false;
        }, true);
        _G.utilsUI.makeButton(btnOpaque, () => {
          if (_G.gameFlow.isWin) return;
          opaquePicture.active = !opaquePicture.active;
          iconOpaqueCheck.active = !iconOpaqueCheck.active;
        }, true);
      },
      renderButtonBgColor() {
        const btn = cc.find("Canvas/header/btn_bg_color");
        const container = cc.find("Canvas/bg_color_container");
        const rowContainer = cc.find("Canvas/bg_color_container/color-list");
        const sampleRow = cc.find("Canvas/bg_color_container/sample_row");
        const bigBg = cc.find("Canvas/bg_color_container/bg/bg_block_input");
        _G.utilsUI.makeButton(bigBg, () => container.active = false, true);
        _G.utilsUI.makeButton(btn, () => {
          container.active = true;
        }, true);
        this.bgColorArr.map(color => {
          const newRow = _.copyNode(sampleRow, rowContainer);
          newRow.color = cc.color(color);
          newRow.active = true;
          _G.utilsUI.makeButton(newRow, () => {
            container.active = false;
            this.setBgColor(color);
          }, true);
        });
        const savedBgColor = _G.utilsData.load([ "bgColor" ], data => {
          this.setBgColor(data.bgColor || this.bgColorArr[0]);
        });
      },
      setBgColor(color) {
        const colorObj = cc.color(color);
        cc.find("Canvas/header/btn_bg_color/bg-selected").color = colorObj;
        cc.find("Canvas/bg/main_bg").color = colorObj;
        _G.utilsData.save({
          bgColor: color
        });
      },
      scrollToPic: null,
      renderPictureScrollView() {
        const btnPictureName = cc.find("Canvas/game_menu_container/btn_select_picture");
        const scrollViewComp = cc.find("Canvas/game_menu_container/image_scroll_view").getComponent(cc.ScrollView);
        const container = cc.find("Canvas/game_menu_container/image_scroll_view/view/content");
        const sampleItem = cc.find("Canvas/game_menu_container/image_scroll_view/view/sample_item");
        const labelCompPicName = cc.find("Canvas/game_menu_container/btn_select_picture/label_current_picture").getComponent(cc.Label);
        const labelCompPicDesc = cc.find("Canvas/game_menu_container/pic_desc").getComponent(cc.Label);
        const labelCompMapSize = cc.find("Canvas/game_menu_container/btn_select_map_size/label_current_size").getComponent(cc.Label);
        const getScrollItemByName = picName => container.children.find(node => node.picName == picName);
        const unFocusPicture = item => {
          cc.find("focus-bg", item).active = false;
          cc.find("photo", item).color = cc.color("#cccccc");
        };
        const focusPicture = (picId, isAutoFocus) => {
          container.children.map(node => unFocusPicture(node));
          const picNode = getScrollItemByName(picId);
          if (!picNode) return;
          cc.find("photo", picNode).color = cc.color("#ffffff");
          cc.find("focus-bg", picNode).active = true;
          this.selectingGameParams.inputPicture = picId;
          this.selectingGameParams.gridCellWidth = picNode.metaData.width;
          this.selectingGameParams.gridCellHeight = picNode.metaData.height;
          labelCompPicName.string = _.trimStr(picNode.metaData.name, 21, "...");
          labelCompPicDesc.string = picNode.metaData.description;
          labelCompMapSize.string = picNode.metaData.width * picNode.metaData.height + "";
          if (isAutoFocus) {
            const levelInfo = _G.coreGame.currentLevelInfo;
            labelCompMapSize.string = levelInfo.gridCellWidth * levelInfo.gridCellHeight + "";
          }
        };
        this.scrollToPic = (picName, isAutoFocus) => {
          if (!picName) return;
          const index = container.children.findIndex(node => node.picName == picName);
          scrollViewComp.stopAutoScroll();
          scrollViewComp.scrollToOffset(cc.v2(sampleItem.width * (index - .6), 0), .1);
          focusPicture(picName, isAutoFocus);
        };
        _G.utilsUI.makeButton(btnPictureName, () => {
          const picName = this.selectingGameParams.inputPicture;
          this.scrollToPic(picName);
        }, true);
        _G.resources.getInputPicrures().map(picNode => {
          const newItem = _.copyNode(sampleItem, container);
          newItem.picName = picNode.name;
          newItem.metaData = picNode.metaData;
          newItem.active = true;
          cc.find("photo", newItem).getComponent(cc.Sprite).spriteFrame = picNode.getComponent(cc.Sprite).spriteFrame;
          cc.find("label_pic_name", newItem).getComponent(cc.Label).string = _.trimStr(newItem.metaData.name, 20, "...");
          cc.find("label_pieces", newItem).getComponent(cc.Label).string = newItem.metaData.width * newItem.metaData.height + "";
          unFocusPicture(newItem);
          _G.utilsUI.makeButton(newItem, () => focusPicture(picNode.name), true);
        });
      },
      scrollToPicInWin: null,
      renderPictureScrollViewWin() {
        const scrollViewNode = cc.find("Canvas/layer_win/dialog/image_scroll_view");
        const scrollViewComp = scrollViewNode.getComponent(cc.ScrollView);
        const container = cc.find("Canvas/layer_win/dialog/image_scroll_view/view/content");
        const sampleItem = cc.find("Canvas/layer_win/dialog/image_scroll_view/view/sample_item");
        const btnToggle = cc.find("Canvas/layer_win/dialog/btn_toggle_scroll_view");
        const getScrollItemByName = picName => container.children.find(node => node.picName == picName);
        const unFocusPicture = item => {
          cc.find("focus-bg", item).active = false;
          cc.find("photo", item).color = cc.color("#cccccc");
        };
        const focusPicture = picName => {
          container.children.map(node => unFocusPicture(node));
          const picNode = getScrollItemByName(picName);
          if (!picNode) return;
          cc.find("photo", picNode).color = cc.color("#ffffff");
          cc.find("focus-bg", picNode).active = true;
        };
        this.scrollToPicInWin = picName => {
          if (!picName) return;
          const index = container.children.findIndex(node => node.picName == picName);
          scrollViewComp.stopAutoScroll();
          scrollViewComp.scrollToOffset(cc.v2(sampleItem.width * (index - .6), 0), .1);
          focusPicture(picName);
        };
        _G.resources.getInputPicrures().map(picNode => {
          const newItem = _.copyNode(sampleItem, container);
          newItem.picName = picNode.name;
          newItem.metaData = picNode.metaData;
          newItem.active = true;
          cc.find("photo", newItem).getComponent(cc.Sprite).spriteFrame = picNode.getComponent(cc.Sprite).spriteFrame;
          cc.find("label_pic_name", newItem).getComponent(cc.Label).string = _.trimStr(newItem.metaData.name, 14, "...");
          cc.find("label_pieces", newItem).getComponent(cc.Label).string = newItem.metaData.width * newItem.metaData.height + "";
          unFocusPicture(newItem);
          _G.utilsUI.makeButton(newItem, () => {
            const isPlayUniqueUrl = _G.gameFlow.checkPlayUniqueUrl(picNode.name, newItem.metaData.width, newItem.metaData.height);
            if (isPlayUniqueUrl) return;
            focusPicture(picNode.name);
            const levelInfo = {
              inputPicture: picNode.name,
              gridCellWidth: newItem.metaData.width,
              gridCellHeight: newItem.metaData.height
            };
            _G.gameFlow.newGame(levelInfo);
          }, true);
        });
        const btnToggleWidgetComp = btnToggle.getComponent(cc.Widget);
        _G.utilsUI.makeButton(btnToggle, () => {
          btnToggleWidgetComp.top += (scrollViewNode.active ? 1 : -1) * scrollViewNode.height;
          btnToggleWidgetComp.updateAlignment();
          cc.find("icon_down", btnToggle).active = !scrollViewNode.active;
          cc.find("icon_up", btnToggle).active = scrollViewNode.active;
          scrollViewNode.active = !scrollViewNode.active;
        }, true);
      },
      showWinScrollView() {
        const scrollViewNode = cc.find("Canvas/layer_win/dialog/image_scroll_view");
        const btnToggle = cc.find("Canvas/layer_win/dialog/btn_toggle_scroll_view");
        scrollViewNode.opacity = btnToggle.opacity = 0;
        setTimeout(() => {
          cc.tween(scrollViewNode).to(.5, {
            opacity: 255
          }).start();
          cc.tween(btnToggle).to(.5, {
            opacity: 255
          }).start();
          this.scrollToPicInWin(_G.coreGame.currentLevelInfo.inputPicture);
        }, 1500);
      },
      setMapSizeSelectorLabel(gridW, gridH) {
        const labelMapSize = cc.find("Canvas/game_menu_container/btn_select_map_size/label_current_size");
        labelMapSize.getComponent(cc.Label).string = `${gridW * gridH}`;
      },
      renderButtonGameSize() {
        const btnSelectMapSize = cc.find("Canvas/game_menu_container/btn_select_map_size");
        const container = cc.find("Canvas/game_menu_container/btn_select_map_size/drop_list_container");
        const sampleRow = cc.find("Canvas/game_menu_container/btn_select_map_size/drop_list_container/sample_row");
        const bigBG = cc.find("Canvas/game_menu_container/btn_select_map_size/drop_list_container/bg/bg_block_input");
        _G.utilsUI.makeButton(btnSelectMapSize, () => container.active = true, true);
        _G.utilsUI.makeButton(bigBG, () => container.active = false, true);
        const gameSizeArr = _G.gameFlow.availableGameSizeArr;
        gameSizeArr.map(sizeStr => {
          const tmpArr = sizeStr.split("x");
          const w = parseInt(tmpArr[0]), h = parseInt(tmpArr[1]);
          const newRow = _.copyNode(sampleRow, container);
          cc.find("label", newRow).getComponent(cc.Label).string = w * h + "";
          newRow.active = true;
          _G.utilsUI.makeButton(newRow, () => {
            container.active = false;
            this.setMapSizeSelectorLabel(w, h);
            this.selectingGameParams.gridCellWidth = w;
            this.selectingGameParams.gridCellHeight = h;
          }, true);
        });
      },
      updateProgressBar(percent) {
        const progressBar = cc.find("Canvas/header/picture_progress/progress");
        const progressLabel = cc.find("Canvas/header/picture_progress/label");
        progressBar.opacity = 255;
        progressBar.orgW = progressBar.orgW || progressBar.width;
        progressBar.width = progressBar.orgW * percent;
        progressLabel.getComponent(cc.Label).string = _.floor(100 * percent) + "%";
      },
      updateBestTime(newBestTimeInSeconds) {
        cc.find("Canvas/header/best_timer_bar/label_timer").getComponent(cc.Label).string = _.formatTime(newBestTimeInSeconds);
      },
      updateCurrentTimePassed(time) {
        const timerLabel = cc.find("Canvas/header/timer_bar/label_timer");
        _G.utilsUI.fillLabel(timerLabel, _.formatTime(time));
      },
      showNagScreen(timeout) {
        cc.find("Canvas/nag_screen").active = true;
        timeout && _.setTimeout(() => this.hideNagScreen(), 1e3 * timeout);
      },
      hideNagScreen() {
        cc.find("Canvas/nag_screen").active = false;
      },
      showLoading(timeout) {
        cc.find("Canvas/layer_loading").active = true;
        timeout && _.setTimeout(() => this.hideLoading(), 1e3 * timeout);
      },
      hideLoading() {
        cc.find("Canvas/layer_loading").active = false;
      },
      allLayoutsOffCallbackArr: [],
      isRunningLayoutOffCheck: null,
      isAllLayoutsOff() {
        return this.allLayoutPathArr.every(layoutPath => !cc.find(layoutPath) || !cc.find(layoutPath).active);
      },
      addCallbackAllLayoutsOff(callback) {
        this.allLayoutsOffCallbackArr.push(callback);
        this.isRunningLayoutOffCheck || (this.isRunningLayoutOffCheck = _.waitToRun(() => {
          this.allLayoutsOffCallbackArr.map(callbackFunc => {
            _.removeArrayItem(this.allLayoutsOffCallbackArr, callbackFunc);
            callbackFunc();
            this.isRunningLayoutOffCheck = null;
          });
        }, "isAllLayoutsOff()", this, .3));
      },
      pendingPopupArr: [],
      isShowingPopup: false,
      popupNameArr: [],
      showLayout(layoutNodeName, onShowCallback, onShowAnimName) {
        let layoutNode = cc.find(`Canvas/${layoutNodeName}`);
        layoutNode.active = false;
        this.popupNameArr.includes(layoutNodeName) && this.isShowingPopup ? this.pendingPopupArr.push({
          layoutNode: layoutNode,
          onShowCallback: onShowCallback
        }) : this.doShowLayout(layoutNode, onShowCallback, onShowAnimName);
        return layoutNode;
      },
      doShowLayout(layoutNode, onShowCallback, onShowAnimName) {
        this.isShowingPopup = this.popupNameArr.includes(layoutNode.name);
        layoutNode.active = true;
        _G.utilsAnimFx.playNodeAnim(layoutNode, onShowAnimName, 1, true);
        onShowCallback && onShowCallback(layoutNode);
      },
      hideLayout(closedlayoutNode) {
        _.isString(closedlayoutNode) && (closedlayoutNode = cc.find(`Canvas/${closedlayoutNode}`));
        closedlayoutNode.active = false;
        if (!this.popupNameArr.includes(closedlayoutNode.name)) return;
        this.isShowingPopup = false;
        const nextPopupInfo = this.pendingPopupArr.shift();
        if (!nextPopupInfo) return;
        this.doShowLayout(nextPopupInfo.layoutNode, nextPopupInfo.onShowCallback);
      }
    };
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules"
  } ],
  en_US: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dd1f2WqfNRLr4YxR6nNnY4L", "en_US");
    "use strict";
    const _G = require("../../../system/all_modules");
    const _ = _G._;
    module.exports = {
      common_label_button_close: "Fermer",
      common_label_share: "Partager",
      common_label_plane_detail_speed: "Vitesse",
      common_label_earnings: "Gains",
      common_label_button_collect: "R\xe9cup\xe9rer",
      common_label_button_free: "Gratuit",
      label_home_button_quest: "Qu\xeate",
      label_home_recycle_bin_sell: "Vendre",
      label_home_button_leaderboard: "Classement",
      label_home_button_buy_using_coin: "pi\xe8ces de monnaie",
      label_home_earning_per_second: x => `${x}/sec.`,
      label_settings_header: "Param\xe8tres",
      label_settings_sound: "Son",
      label_settings_music: "Musique",
      label_settings_text_on: "Activ\xe9(e)",
      label_settings_text_off: "D\xe9sactiv\xe9(e)",
      label_settings_text_language: "Langue",
      label_quest_layout_header: "D\xe9fi",
      label_quest_layout_tab_quest: "Qu\xeate",
      label_quest_layout_tab_achievement: "Succ\xe8s",
      label_quest_layout_reset_intro: "Les qu\xeates se r\xe9initialisent dans\xa0:",
      label_quest_intro_login: "Connectez-vous aujourd'hui",
      label_quest_intro_merge: x => `Fusionner ${x}\xa0avions`,
      label_quest_intro_watch_video: x => `Regarder ${x}\xa0vid\xe9os`,
      label_quest_intro_invite_friends: x => `Inviter ${x}\xa0fois des amis`,
      label_quest_intro_speed_up: x => `Acc\xe9l\xe9rer ${x}\xa0fois`,
      label_quest_txt_rewards: "R\xe9compenses",
      label_achievement_intro_merge: ({mergeTime: mergeTime, extraRequirements: {planeLevel: planeLevel}}) => `Fusionnez pour cr\xe9er ${mergeTime}\xa0avions de niveau\xa0${planeLevel}`,
      label_ufo_reward_header: "BONUS D'OVNI\xa0!",
      label_ufo_reward_time_intro: x => `Dans\xa0${x}\xa0secondes`,
      label_unlock_feature_intro_quests: "Fonctionnalit\xe9 de qu\xeates d\xe9verrouill\xe9e\xa0!",
      label_unlock_feature_intro_leaderboard: "Fonctionnalit\xe9 de tableau des scores d\xe9verrouill\xe9e\xa0!",
      label_daily_bonus_header: "Bonus de retour quotidien",
      label_daily_bonus_reset_note: "R\xe9initialisation quotidienne \xe0 11\xa0h\xa059 (Heure du Pacifique)",
      label_daily_bonus_day_name: x => `Jour\xa0${x}`,
      label_daily_bonus_x2btn_up_1_level: "+1\xa0niveau\nd'avion",
      label_daily_bonus_x2btn_double: "Doubles\nr\xe9compenses",
      label_leaderboard_header: "Tableau des scores",
      label_leaderboard_top_50: x => `TOP\xa0${x}`,
      label_leaderboard_tab_global: "Global",
      label_leaderboard_tab_friends: "Amis",
      label_leaderboard_no_friend: "Aucun ami trouv\xe9",
      label_leadeboard_button_invite: "Inviter des amis",
      label_speedup_header: "Plus vite\xa0!",
      label_speedup_time_intro: "Vitesse x2",
      label_speedup_intro_add_time: secondNumber => `Ajouter encore ${secondNumber}\xa0secondes`,
      label_levelup_header: "Niveau sup\xe9rieur\xa0!",
      label_levelup_unlocked_intro: "Vous avez d\xe9verrouill\xe9",
      label_planeunlock_header: () => "D\xe9verrouill\xe9".toUpperCase(),
      label_planeunlock_next_plane: "Suivant",
      label_store_header: () => "Magasin",
      label_store_plane_btn_buy_locked: x => `D\xe9verrouiller l'avion\xa0${x}`,
      label_offline_rewards_header: "R\xe9compenses hors-ligne",
      label_offline_rewards_profits_x2: "Profits x2",
      label_offline_rewards_profits_x3: "Profits x3",
      label_offline_rewards_time_lapsed: x => {
        if (x != _G.configOfflineEarnings.maxOfflineTimeText) return `Les gains hors-ligne ont atteint le maximum de ${x}\xa0heures`;
        return `Les gains hors ligne ont atteint le maximum de ${_G.configOfflineEarnings.maxOfflineTimeInHours} heures`;
      },
      label_tutorial_tap_to_continue: "Touchez pour continuer",
      label_tutorial_guide: textCode => ({
        welcome_msg: "Bonjour capitaine\xa0! Commen\xe7ons un nouvel empire a\xe9rien d\xe8s aujourd'hui\xa0!",
        tutorial_end: "Bon travail\xa0! Gagnez des pi\xe8ces de monnaie pour d\xe9bloquer les avions des niveaux sup\xe9rieurs, capitaine\xa0!"
      })[textCode],
      label_dialog_small_message: msgCode => ({
        no_cash: "Argent comptant insuffisant",
        no_gem: "Gemmes insuffisantes",
        no_spot: "Plus aucun espace de stationnement",
        no_track: "Plus de place sur l'avion",
        invite_sent: "Une invitation a \xe9t\xe9\nenvoy\xe9e \xe0 vos amis"
      })[msgCode],
      label_dialog_option_message: msgCode => ({
        intro_subscribe_bot: "Abonnez-vous pour recevoir un cadeau de d\xe9marrage dans la bo\xeete \xe0 messages\xa0!",
        intro_create_shortcut: "Cr\xe9ez un raccourci pour revenir jouer plus facilement\xa0!"
      })[msgCode],
      label_dialog_option_btn_confirm: "D'accord\xa0!",
      label_dialog_option_btn_cancel: "peut-\xeatre plus tard",
      fb_invite_message_text: playerName => `${playerName} veut vous affronter lors d'une course\xa0!`,
      fb_invite_message_cta: "JOUER",
      fb_invite_message_image_txt_challenge: "D\xe9fi",
      fb_share_levelup_image_text: ({playerName: playerName, level: level}) => `${playerName} a atteint le niv.\xa0${level}\xa0!`,
      fb_share_unlock_plane_image_text: ({playerName: playerName, planeLevel: planeLevel}) => `${playerName} a d\xe9verrouill\xe9 l'avion\xa0${planeLevel}\xa0!`,
      fb_share_unlock_plane_image_text_top: "Avion d\xe9verrouill\xe9\xa0!"
    };
    cc._RF.pop();
  }, {
    "../../../system/all_modules": "all_modules"
  } ],
  es_ES: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25a77jAOblFdowbqdhP1tct", "es_ES");
    "use strict";
    const _G = require("../../../system/all_modules");
    const _ = _G._;
    module.exports = {
      common_label_button_close: "Cerrar",
      common_label_share: "Compartir",
      common_label_plane_detail_speed: "Velocidad",
      common_label_earnings: "Ganancias",
      common_label_button_collect: "Recoger",
      common_label_button_free: "Gratis",
      label_home_button_quest: "Misiones",
      label_home_recycle_bin_sell: "Vender",
      label_home_button_leaderboard: "Ranking",
      label_home_button_buy_using_coin: "monedas",
      label_home_earning_per_second: x => `${x}/s`,
      label_settings_header: "Ajustes",
      label_settings_sound: "Sonido",
      label_settings_music: "M\xfasica",
      label_settings_text_on: "S\xed",
      label_settings_text_off: "No",
      label_settings_text_language: "Idioma",
      label_quest_layout_header: "Desaf\xedo",
      label_quest_layout_tab_quest: "Misi\xf3n",
      label_quest_layout_tab_achievement: "Logro",
      label_quest_layout_reset_intro: "La misi\xf3n se reinicia en:",
      label_quest_intro_login: "Con\xe9ctate hoy",
      label_quest_intro_merge: x => `Fusiona ${x} aviones`,
      label_quest_intro_watch_video: x => `Mira ${x} v\xeddeos`,
      label_quest_intro_invite_friends: x => `Invita amigos ${x} veces`,
      label_quest_intro_speed_up: x => `Acelera ${x} veces`,
      label_quest_txt_rewards: "Recompensas",
      label_achievement_intro_merge: ({mergeTime: mergeTime, extraRequirements: {planeLevel: planeLevel}}) => `Fusiona para crear ${mergeTime} aviones de nivel ${planeLevel}`,
      label_ufo_reward_header: "\xa1BONIFICACI\xd3N DE OVNI!",
      label_ufo_reward_time_intro: x => `En ${x} segundos`,
      label_unlock_feature_intro_quests: "\xa1Misiones destacadas desbloqueadas!",
      label_unlock_feature_intro_leaderboard: "\xa1Marcador destacado desbloqueado!",
      label_daily_bonus_header: "Bonificaci\xf3n de devoluci\xf3n diaria",
      label_daily_bonus_reset_note: "Se reinicia a las 11:59 cada d\xeda",
      label_daily_bonus_day_name: x => `D\xeda ${x}`,
      label_daily_bonus_x2btn_up_1_level: "+1 nivel\nde avi\xf3n",
      label_daily_bonus_x2btn_double: "Recompensas\ndobles",
      label_leaderboard_header: "Marcador",
      label_leaderboard_top_50: x => `${x} MEJORES`,
      label_leaderboard_tab_global: "Global",
      label_leaderboard_tab_friends: "Amigos",
      label_leaderboard_no_friend: "No se ha encontrado amigo",
      label_leadeboard_button_invite: "Invitar amigos",
      label_speedup_header: "\xa1Acelera!",
      label_speedup_time_intro: "Velocidad x2",
      label_speedup_intro_add_time: secondNumber => `A\xf1ade otros ${secondNumber} segundos!`,
      label_levelup_header: "\xa1Sube de nivel!",
      label_levelup_unlocked_intro: "Has desbloqueado",
      label_planeunlock_header: () => "Desbloquear".toUpperCase(),
      label_planeunlock_next_plane: "Siguiente",
      label_store_header: () => "Tienda",
      label_store_plane_btn_buy_locked: x => `Desbloquear avi\xf3n ${x}`,
      label_offline_rewards_header: "Recompensas offline",
      label_offline_rewards_profits_x2: "Beneficios x2",
      label_offline_rewards_profits_x3: "Beneficios x3",
      label_offline_rewards_time_lapsed: x => {
        if (x != _G.configOfflineEarnings.maxOfflineTimeText) return `Las ganancias online han alcanzado el m\xe1ximo de ${x} horas`;
        return `Los ingresos sin conexi\xf3n alcanzaron el m\xe1ximo de ${_G.configOfflineEarnings.maxOfflineTimeInHours} horas`;
      },
      label_tutorial_tap_to_continue: "Toca para continuar",
      label_tutorial_guide: textCode => ({
        welcome_msg: "\xa1Bienvenido, Capit\xe1n! \xa1Comencemos un nuevo imperio de l\xedneas a\xe9reas hoy!",
        tutorial_end: "\xa1Buen trabajo! \xa1Gana monedas para desbloquear los aviones de nivel alto, capit\xe1n!"
      })[textCode],
      label_dialog_small_message: msgCode => ({
        no_cash: "No hay suficiente dinero",
        no_gem: "Gemas insuficientes",
        no_spot: "No hay m\xe1s sitios de parking",
        no_track: "No hay espacio en la aerol\xednea",
        invite_sent: "Se ha enviado una\ninvitaci\xf3n a tus amigos"
      })[msgCode],
      label_dialog_option_message: msgCode => ({
        intro_subscribe_bot: "\xa1Suscr\xedbete para recibir un regalo de inicio en el buz\xf3n!",
        intro_create_shortcut: "\xa1Crea un atajo para volver a jugar m\xe1s f\xe1cil!"
      })[msgCode],
      label_dialog_option_btn_confirm: "\xa1Claro!",
      label_dialog_option_btn_cancel: "tal vez m\xe1s tarde",
      fb_invite_message_text: playerName => `\xa1${playerName} te desaf\xeda a una carrera!`,
      fb_invite_message_cta: "JUGAR",
      fb_invite_message_image_txt_challenge: "Desafiar",
      fb_share_levelup_image_text: ({playerName: playerName, level: level}) => `\xa1${playerName} ha alcanzado el nv. ${level}!`,
      fb_share_unlock_plane_image_text: ({playerName: playerName, planeLevel: planeLevel}) => `\xa1${playerName} ha desbloqueado el avi\xf3n ${planeLevel}!`,
      fb_share_unlock_plane_image_text_top: "\xa1Avi\xf3n desbloqueado!"
    };
    cc._RF.pop();
  }, {
    "../../../system/all_modules": "all_modules"
  } ],
  free_button_comp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "64398ru1J5Fi4AdS3n3ocH+", "free_button_comp");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const _G = require("../../system/all_modules");
    const _ = _G._;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let freeButtonComp = class freeButtonComp extends cc.Component {
      freeHandler(e) {
        e.target.freeButtonHandlerFunc && e.target.freeButtonHandlerFunc(e.target);
      }
    };
    freeButtonComp = __decorate([ ccclass ], freeButtonComp);
    exports.default = freeButtonComp;
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules"
  } ],
  game_flow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "05146yXT4ZKObC2KzM1/VhA", "game_flow");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.gameFlow = void 0;
    const _G = require("../system/all_modules");
    const _ = _G._;
    exports.gameFlow = {
      initUniqueUrlParam: "",
      availableGameSizeArr: [ "3x4", "6x4", "9x6", "12x8", "15x10", "18x12", "21x14" ],
      isWin: false,
      isPaused: false,
      bestTimeSaved: {},
      isLocalhost: () => false,
      parseUniqueUrl() {
        const sanitizedUrl = window.location.toString().replace(/\?.*$/, "").replace(/\/$/, "");
        const levelInfo = _G.levelManager.getLevelInfoByUniqueUrl(sanitizedUrl);
        if (!levelInfo) return;
        const gridSizeStr = new URL(location.href).searchParams.get("size");
        if (gridSizeStr) {
          const [width, height] = gridSizeStr.split("x").map(Number);
          return Object.assign(Object.assign({}, levelInfo), {
            width: width,
            height: height
          });
        }
        return levelInfo;
      },
      checkPlayUniqueUrl(inputPicture, gridWidth, gridHeight) {
        if (this.isLocalhost()) return;
        const newUniqueUrl = _G.levelManager.inputPictureToUniqueUrl(inputPicture);
        if (!newUniqueUrl) return;
        const paramStr = `?size=${gridWidth}x${gridHeight}`;
        let finalUrl = newUniqueUrl.replace(/\?size=.*$/, "") + paramStr;
        window["isUsingHistoryPushState"] && history.pushState ? window.history.pushState({
          path: finalUrl
        }, "", finalUrl) : location.href = finalUrl;
      },
      init() {
        _G.resources.addInitCallback(() => {
          _G.utilsData.load([ "bestTimeSaved", "lastGameTimePassed", "lastGameStates" ], data => {
            this.bestTimeSaved = data.bestTimeSaved || {};
            const picNameArr = _G.resources.getPictureNameArr();
            const puzzleInfo = this.parseUniqueUrl();
            if (puzzleInfo) {
              const levelInfo = {
                inputPicture: _G.levelManager.picInfoToPicName(puzzleInfo.id),
                gridCellWidth: puzzleInfo.width,
                gridCellHeight: puzzleInfo.height
              };
              this.newGame(levelInfo);
            } else if (data.lastGameStates && data.lastGameStates.levelInfo && picNameArr.includes(data.lastGameStates.levelInfo.inputPicture)) this.restoreSavedGame(data.lastGameStates, data.lastGameTimePassed || 0); else {
              const levelInfo = {
                inputPicture: picNameArr[0],
                gridCellWidth: 3,
                gridCellHeight: 4
              };
              this.newGame(levelInfo);
            }
            this.initGameTimePassedSaving();
          });
        });
      },
      newGame(levelInfo, callback) {
        _G.mapVisual.gridContainer.opacity = 1;
        _G.coreUI.showLoading();
        this.isWin = false;
        this.isPaused = false;
        levelInfo = levelInfo || _G.coreGame.currentLevelInfo;
        _G.coreFX.clearWin();
        _G.coreGame.startGame(levelInfo, () => {
          const bestSavedTimeThisGame = this.bestTimeSaved[this.getGameParamsEntryName(levelInfo)];
          _G.coreUI.updateBestTime(bestSavedTimeThisGame || 0);
          _G.coreUI.hideLayout("layer_win");
          _G.mapVisual.finalPhotoNode.active = false;
          let delayTime = 0;
          callback ? delayTime = callback() || 0 : this.captureGameSnapShot();
          setTimeout(() => {
            _G.coreUI.hideLoading();
            this.onResume();
          }, 1e3 * delayTime);
        });
      },
      onWin() {
        _G.coreUI.showWinScrollView();
        _G.coreUI.showLayout("layer_win");
        this.isWin = true;
        this.checkSaveBestTime();
        _G.audio.playSound("win");
        const bottomLeftTile = _G.mapVisual.bottomLeftTile;
        const moveVec = bottomLeftTile.position.mul(-1);
        _G.coreUI.showNagScreen();
        bottomLeftTile.linkedGroup.map(node => {
          cc.tween(node).by(.5, {
            position: moveVec
          }).call(() => {
            _G.mapVisual.finalPhotoNode.active = true;
            _G.coreFX.onWin();
            _G.coreUI.hideNagScreen();
          }).start();
        });
        this.captureGameSnapShot(true);
      },
      checkSaveBestTime() {
        const levelInfo = _G.coreGame.currentLevelInfo;
        const timeEntryName = this.getGameParamsEntryName(levelInfo);
        const bestTimeSavedThisGame = this.bestTimeSaved[timeEntryName] || 99999;
        const timeThisGame = _G.coreGame.currentTimePassed;
        if (timeThisGame < bestTimeSavedThisGame) {
          this.bestTimeSaved[timeEntryName] = timeThisGame;
          _G.utilsData.save({
            bestTimeSaved: this.bestTimeSaved
          });
          _G.coreUI.updateBestTime(timeThisGame);
        }
      },
      getGameParamsEntryName: levelInfo => levelInfo.gridCellWidth + "x" + levelInfo.gridCellHeight + "_" + levelInfo.inputPicture,
      onPause() {
        if (this.isWin) return;
        this.isPaused = true;
        _G.mapVisual.gridContainer.opacity = 0;
        _G.coreUI.showLayout("layer_pause");
        _G.mapVisual.opaquePhotoNode.scale = 0;
      },
      onResume() {
        this.isPaused = false;
        _G.mapVisual.gridContainer.opacity = 255;
        _G.coreUI.hideLayout("layer_pause");
        _G.mapVisual.opaquePhotoNode.scale = 1;
      },
      currentGameState: {},
      initGameTimePassedSaving() {
        _.setInterval(() => {
          const timePassed = this.isWin ? 0 : _G.coreGame.currentTimePassed;
          _G.utilsData.save({
            lastGameTimePassed: timePassed
          });
        }, 1e3);
      },
      captureGameSnapShot(isOnWin = false) {
        if (isOnWin) return _G.utilsData.save({
          lastGameStates: null
        });
        let linkedGroupArr = [];
        const tileArr = _G.mapVisual.getTileArr();
        tileArr.map(node => {
          _.addUniqueElemToArr(linkedGroupArr, node.linkedGroup);
        });
        linkedGroupArr = linkedGroupArr.map(linkedGroup => linkedGroup.map(node => node.cellPos.x + "_" + node.cellPos.y));
        const tilePosList = {};
        tileArr.map(tileNode => {
          const tileName = tileNode.cellPos.x + "_" + tileNode.cellPos.y;
          tilePosList[tileName] = {
            x: tileNode.x.toFixed(3),
            y: tileNode.y.toFixed(3)
          };
        });
        this.currentGameState = {
          levelInfo: _G.coreGame.currentLevelInfo,
          linkedGroupArr: linkedGroupArr,
          tilePosList: tilePosList
        };
        _G.utilsData.save({
          lastGameStates: this.currentGameState
        });
      },
      restoreSavedGame(lastGameStates, lastGameTimePassed) {
        const {levelInfo: levelInfo, linkedGroupArr: linkedGroupArr, tilePosList: tilePosList} = lastGameStates;
        if (!levelInfo || !linkedGroupArr || !tilePosList) return;
        this.newGame(levelInfo, () => {
          const delayTime = .1;
          setTimeout(() => {
            const tileNodeArr = _G.mapVisual.getTileArr();
            _G.coreGame.currentTimePassed = lastGameTimePassed;
            tileNodeArr.map(tileNode => {
              const tileName = tileNode.cellPos.x + "_" + tileNode.cellPos.y;
              linkedGroupArr.some(linkedGroup => {
                const tileIndex = linkedGroup.indexOf(tileName);
                if (-1 == tileIndex) return false;
                tileNode.linkedGroup = linkedGroup;
                linkedGroup[tileIndex] = tileNode;
                return true;
              });
            });
            _G.coreGame.updateGameCompletionProgress();
            linkedGroupArr.map(linkedGroup => {
              linkedGroup.map(tileNode => {
                const tileName = tileNode.cellPos.x + "_" + tileNode.cellPos.y;
                tileNode.setPosition(tilePosList[tileName].x, tilePosList[tileName].y);
              });
              _G.control.adjustTileGroupToFitDraggableArea(linkedGroup[0]);
            });
          }, 1e3 * delayTime);
          return delayTime + .1;
        });
      }
    };
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  graphic_lib: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36d2c9WBElAd7dhY4oxoUwP", "graphic_lib");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.graphicLib = void 0;
    const _G = require("../system/all_modules");
    const _ = _G._;
    exports.graphicLib = {
      webGLObj: null,
      isWebGLBusy: false,
      webGLQueue: [],
      init() {
        const canvas = document.createElement("canvas");
        this.webGLObj = canvas.getContext("webgl");
      },
      spriteFrameToPixelArr(spriteFrame, callback, isCalledFromQueue = false) {
        if (this.isWebGLBusy) return this.webGLQueue.push(() => this.spriteFrameToPixelArr(spriteFrame, callback, true));
        this.isWebGLBusy = true;
        const finalCallback = () => {
          this.isWebGLBusy = false;
          isCalledFromQueue && this.webGLQueue.shift();
          this.webGLQueue.length && setTimeout(() => this.webGLQueue[0] && this.webGLQueue[0]());
        };
        spriteFrame.getTexture().nativeUrl || _.log(`nativeUrl = null - spriteFrame=${spriteFrame.name || spriteFrame._name} `);
        if (!spriteFrame.getTexture().nativeUrl) return finalCallback();
        const image = new Image();
        const gl = this.webGLObj;
        image.onload = function() {
          gl.clear(gl.DEPTH_BUFFER_BIT);
          var texture = gl.createTexture();
          const imgW = this.width, imgH = this.height;
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          var framebuffer = gl.createFramebuffer();
          gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
          var data = new Uint8Array(imgW * imgH * 4);
          gl.readPixels(0, 0, imgW, imgH, gl.RGBA, gl.UNSIGNED_BYTE, data);
          gl.deleteFramebuffer(framebuffer);
          callback && callback(data, imgW, imgH);
          finalCallback();
        };
        image.src = spriteFrame.getTexture().nativeUrl;
      },
      cropImageDataFromUInt8Arr(pixelUInt8Arr, orgW, startX, startY, cropW, cropH) {
        const orgH = pixelUInt8Arr.length / 4 / orgW;
        [startX, startY, cropW, cropH] = [ _.round(startX), _.round(startY), _.round(cropW), _.round(cropH) ];
        const croppedData = new Uint8Array(cropW * cropH * 4);
        for (let y = 0; y < cropH; y++) for (let x = 0; x < cropW; x++) {
          const rowIndex = y + startY;
          const colIndex = x + startX;
          const isValidPix = rowIndex >= 0 && rowIndex < orgH && colIndex >= 0 && colIndex < orgW;
          for (let i = 0; i < 4; i++) croppedData[4 * (y * cropW + x) + i] = isValidPix ? pixelUInt8Arr[4 * (rowIndex * orgW + colIndex) + i] : 0;
        }
        return croppedData;
      },
      pixelArrToSpriteFrameGrid(pixelUInt8Arr, imgW, imgH, gridWidth, gridHeight, offsetWidth, offsetHeight, callback) {
        const spriteFrameArr = [];
        const cellPixelW = imgW / gridWidth;
        const cellPixelH = imgH / gridHeight;
        for (let y = 0; y < gridHeight; y++) {
          spriteFrameArr[y] = [];
          for (let x = 0; x < gridWidth; x++) {
            const croppedSize = {
              x: x * cellPixelW + offsetWidth,
              y: y * cellPixelH + offsetHeight,
              w: cellPixelW - 2 * offsetWidth,
              h: cellPixelH - 2 * offsetHeight
            };
            const croppedData = this.cropImageDataFromUInt8Arr(pixelUInt8Arr, imgW, croppedSize.x, croppedSize.y, croppedSize.w, croppedSize.h);
            const croppedRenderTexture = new cc.Texture2D();
            croppedRenderTexture.setFlipY(true);
            croppedRenderTexture.setPremultiplyAlpha(true);
            croppedRenderTexture.initWithData(croppedData, cc.Texture2D.PixelFormat.RGBA8888, _.round(croppedSize.w), _.round(croppedSize.h));
            spriteFrameArr[y][x] = new cc.SpriteFrame(croppedRenderTexture);
          }
        }
        return spriteFrameArr;
      },
      spriteFrameToSpriteFrameGrid(spriteFrame, fitSize, gridWidth, gridHeight, offsetWidth, offsetHeight, callback) {
        const orgSize = spriteFrame.getOriginalSize();
        this.spriteFrameToPixelArr(spriteFrame, resultPixelArr => {
          const [fitOrgImgW, fitOrgImgH] = [ fitSize.width, fitSize.height ];
          let pixelUInt8Arr = resultPixelArr;
          orgSize.width != fitSize.width && (pixelUInt8Arr = this.resizePictureByPixelArr(resultPixelArr, orgSize, fitSize));
          const spriteFrameArr = [];
          const cellPixelW = fitOrgImgW / gridWidth;
          const cellPixelH = fitOrgImgH / gridHeight;
          for (let y = 0; y < gridHeight; y++) {
            spriteFrameArr[y] = [];
            for (let x = 0; x < gridWidth; x++) {
              const croppedSize = {
                x: x * cellPixelW + offsetWidth,
                y: y * cellPixelH + offsetHeight,
                w: cellPixelW - 2 * offsetWidth,
                h: cellPixelH - 2 * offsetHeight
              };
              const croppedData = this.cropImageDataFromUInt8Arr(pixelUInt8Arr, fitOrgImgW, croppedSize.x, croppedSize.y, croppedSize.w, croppedSize.h);
              const croppedRenderTexture = new cc.Texture2D();
              croppedRenderTexture.setFlipY(true);
              croppedRenderTexture.setPremultiplyAlpha(true);
              croppedRenderTexture.initWithData(croppedData, cc.Texture2D.PixelFormat.RGBA8888, _.round(croppedSize.w), _.round(croppedSize.h));
              spriteFrameArr[y][x] = new cc.SpriteFrame(croppedRenderTexture);
            }
          }
          callback && callback(spriteFrameArr);
        });
      },
      pixelArrToSpriteFrame(pixelUInt8Arr, width, height) {
        const texture = new cc.Texture2D();
        texture.setFlipY(true);
        texture.setPremultiplyAlpha(true);
        texture.initWithData(pixelUInt8Arr, cc.Texture2D.PixelFormat.RGBA8888, width, height);
        return new cc.SpriteFrame(texture);
      },
      resizePictureByPixelArr(orgPixelArr, orgSize, fitSize) {
        _.log(`fitSize = ${fitSize.width}/${fitSize.height} .... orgSize=${orgSize.width}/${orgSize.height}`);
        const scale = fitSize.width / orgSize.width;
        const newPixelArr = new Uint8Array(fitSize.width * fitSize.height * 4);
        for (let y = 0; y < fitSize.height; y++) for (let x = 0; x < fitSize.width; x++) {
          const orgX = _.floor(x / scale);
          const orgY = _.floor(y / scale);
          const newPixelIndex = 4 * (fitSize.width * y + x);
          const orgPixelIndex = 4 * (orgSize.width * orgY + orgX);
          [ 0, 1, 2, 3 ].map(subIndex => {
            newPixelArr[newPixelIndex + subIndex] = orgPixelArr[orgPixelIndex + subIndex];
          });
        }
        return newPixelArr;
      }
    };
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  level_manager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f698aycMHlEgYRVAw1Z3skG", "level_manager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.levelManager = void 0;
    const _G = require("../system/all_modules");
    const _ = _G._;
    exports.levelManager = {
      puzzleInfoArr: [],
      init() {
        _G.coreUI.showLoading();
        let puzzleInfoArr = window._EXTERNAL_DATA;
        if (!puzzleInfoArr) {
          const pictureContainer = cc.find("Canvas/sprite_frames_store/input_pictures");
          puzzleInfoArr = pictureContainer.children.map((picNode, index) => {
            const data = {
              id: index,
              name: picNode.name,
              imageUrl: picNode.getComponent(cc.Sprite).spriteFrame.getTexture().nativeUrl,
              url: "",
              description: `Desc ${picNode.name}`,
              width: 6,
              height: 4
            };
            return data;
          });
        }
        this.puzzleInfoArr = puzzleInfoArr;
        _G.resources.initData(puzzleInfoArr);
      },
      getLevelInfoByUniqueUrl(uniqueUrl) {
        return this.puzzleInfoArr.find(leveInfo => leveInfo.url == uniqueUrl || leveInfo.url == uniqueUrl + "/");
      },
      picInfoToPicName: id => "puzzle_" + id,
      inputPictureToUniqueUrl(picName) {
        const puzzleInfo = this.puzzleInfoArr.find(puzzleInfo => puzzleInfo.id + "" == picName.replace("puzzle_", ""));
        return puzzleInfo ? puzzleInfo.url : "";
      }
    };
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  localize: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "759c03/vpNFWJHCyl2aAMRO", "localize");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.localize = void 0;
    const _G = require("../../system/all_modules");
    const _ = _G._;
    const toCorrectLangCode = {
      en: "en_US",
      pt_BR: "pt_PT",
      "pt-PT": "pt_PT",
      fr_CA: "fr_FR",
      ar: "ar_AR",
      de: "de_DE",
      es: "es_ES",
      es_LA: "es_ES",
      es_MX: "es_ES",
      "zh-CN": "zh_CN",
      "zh-TW": "zh_TW",
      fr: "fr_FR",
      id: "id_ID",
      ru: "ru_RU",
      th: "th_TH",
      tr: "tr_TR",
      vi: "vi_VN"
    };
    const subscribedNodePath = {};
    exports.localize = {
      supportedLanguageArr: [ {
        code: "en_US",
        name: "English"
      }, {
        code: "fr_FR",
        name: "Fran\xe7ais"
      } ],
      currentLanguageCode: "en_US",
      defaultLanguageObject: require("en_US"),
      currentLanguageObject: null,
      languageChangeCallbackArr: [],
      initCallbackArr: [],
      isInitialized: false,
      init() {
        this.currentLanguageObject = this.defaultLanguageObject;
        _G.login.addLoginDataFields("userLanguageCode");
        _G.login.addCallback(data => {
          this.isInitialized = true;
          const fbLangCode = window.FBInstant ? FBInstant.getLocale() : null;
          this.onLanguageChanges(data.userLanguageCode || fbLangCode, true);
        });
      },
      onLanguageChanges(langCode, isInit = false) {
        langCode = toCorrectLangCode[langCode] || langCode;
        if (!isInit && (!langCode || this.currentLanguageCode == langCode)) return;
        try {
          langCode = langCode || this.currentLanguageCode;
          this.currentLanguageObject = require(langCode);
          this.currentLanguageCode = langCode;
          _G.utilsData.save({
            userLanguageCode: this.currentLanguageCode
          });
        } catch (e) {}
        isInit ? this.initCallbackArr.map(func => func()) : this.languageChangeCallbackArr.map(func => func(langCode));
      },
      subscribeTranslate(containerNode) {
        const path = _.getNodePath(containerNode);
        const translateFunc = () => this.translateContainer(containerNode);
        if (!subscribedNodePath[path]) {
          this.initCallbackArr.push(translateFunc);
          this.languageChangeCallbackArr.push(translateFunc);
        }
        this.isInitialized && translateFunc();
      },
      addInitCallback(f) {
        if (this.isInitialized) return f();
        this.initCallbackArr.push(f);
      },
      translateContainer(containerNode) {
        if (!containerNode) return;
        containerNode.getComponentsInChildren(cc.Label).map(labelComp => this.translateSingleLabel(labelComp.node));
      },
      translateSingleLabel(labelNode, localizeData) {
        const translateGuide = this.currentLanguageObject[labelNode.name] || this.defaultLanguageObject[labelNode.name];
        if (!translateGuide) return;
        labelNode.localizeData = localizeData || labelNode.localizeData;
        let text2Fill = translateGuide;
        "function" == typeof translateGuide && (text2Fill = translateGuide(labelNode.localizeData));
        _G.utilsUI.fillLabel(labelNode, text2Fill);
      },
      translate(textCode, localizeData) {
        const translateGuide = this.currentLanguageObject[textCode] || this.defaultLanguageObject[textCode];
        if (!translateGuide) return textCode;
        let textResult = translateGuide;
        "function" == typeof translateGuide && (textResult = translateGuide(localizeData));
        return textResult;
      }
    };
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules",
    en_US: "en_US"
  } ],
  login: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a5deR8LDtAEp7UiLY2ZoZe", "login");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.login = void 0;
    const _G = require("./all_modules");
    const _ = _G._;
    const dataFieldArr = [ "IsOldUser" ];
    const callbackArr = [];
    exports.login = {
      loginData: null,
      entryPointData: null,
      init() {
        this.entryPointData = _G.utilsData.getEntryPointData();
        setTimeout(() => this.loadUserData());
      },
      loadUserData() {
        _G.utilsData.load(dataFieldArr, data => {
          this.loginData = data;
          data.isNewUser = !data.IsOldUser;
          _G.utilsData.save({
            IsOldUser: true
          });
          callbackArr.map(func => func(data));
        });
      },
      addLoginDataFields(...args) {
        args.map(fieldName => _.addUniqueElemToArr(dataFieldArr, fieldName));
      },
      addCallback(callbackFunc) {
        this.loginData ? callbackFunc(this.loginData) : callbackArr.push(callbackFunc);
      }
    };
    cc._RF.pop();
  }, {
    "./all_modules": "all_modules"
  } ],
  map_visual: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eb4b9bQas1GAohj4mQd2i4Q", "map_visual");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.mapVisual = void 0;
    const _G = require("../system/all_modules");
    const _ = _G._;
    const maskTileInfo = {
      tileBaseWidth: 212,
      tileBaseHeight: 208,
      maskUniformRealSize: 400
    };
    const TILE_COLLIDER_EXPAND_RATIO = .3;
    exports.mapVisual = {
      availablePictureSize: {
        width: 0,
        height: 0
      },
      currentPictureFitSize: {
        width: 0,
        height: 0
      },
      gridContainer: null,
      bottomLeftTile: null,
      previewPhotoNode: null,
      opaquePhotoNode: null,
      finalPhotoNode: null,
      currentTileSize: 0,
      currentTileCount: 0,
      getTileArr() {
        this.gridContainer = cc.find("Canvas/play_area/grid");
        return this.gridContainer.children.filter(child => "tile_cell" == child.name);
      },
      init() {
        this.gridContainer = cc.find("Canvas/play_area/grid");
        this.previewPhotoNode = cc.find("Canvas/header/picture_preview/photo");
        this.opaquePhotoNode = cc.find("Canvas/play_area/opaque_photo");
        this.finalPhotoNode = cc.find("Canvas/play_area/final_photo");
        this.availablePictureSize = this.getFinalPictureSize();
      },
      getFinalPictureSize() {
        const availablePicSize = cc.find("Canvas/available_pic_size");
        const fitSize = {
          width: availablePicSize.width,
          height: availablePicSize.height
        };
        return fitSize;
      },
      getPictureFitSize(sizeObj) {
        const {width: width, height: height} = sizeObj;
        const wRatio = this.availablePictureSize.width / width;
        const hRatio = this.availablePictureSize.height / height;
        const minRatio = _.min(wRatio, hRatio, 1);
        return {
          width: _.floor(width * minRatio),
          height: _.floor(height * minRatio)
        };
      },
      renderMap(gridParams, callback) {
        const {inputPicture: inputPicture, gridCellWidth: gridCellWidth, gridCellHeight: gridCellHeight} = gridParams;
        const pictureSprite = _G.resources.getInputPictureSpriteByName(inputPicture);
        const pictureTextureSize = pictureSprite.getOriginalSize();
        const fitSize = this.currentPictureFitSize = this.getPictureFitSize(pictureTextureSize);
        Object.assign(pictureTextureSize, fitSize);
        const gridPixelWidth = pictureTextureSize.width;
        const gridPixelHeight = pictureTextureSize.height;
        const formalCellSize = {
          w: gridPixelWidth / gridCellWidth,
          h: gridPixelHeight / gridCellHeight
        };
        const formalCellScale = cc.v2(formalCellSize.w / maskTileInfo.tileBaseWidth, formalCellSize.h / maskTileInfo.tileBaseHeight);
        const offsetWidth = _.round(-formalCellScale.x * (maskTileInfo.maskUniformRealSize - maskTileInfo.tileBaseWidth) / 2);
        const offsetHeight = _.round(-formalCellScale.y * (maskTileInfo.maskUniformRealSize - maskTileInfo.tileBaseHeight) / 2);
        const hightlightW = formalCellSize.w;
        Object.assign(gridParams, {
          formalCellSize: formalCellSize,
          formalCellScale: formalCellScale,
          offsetWidth: offsetWidth,
          offsetHeight: offsetHeight
        });
        const sampleTile = cc.find("Canvas/sample_nodes/tile_cell");
        this.gridContainer.width = gridPixelWidth;
        this.gridContainer.height = gridPixelHeight;
        this.gridContainer.removeAllChildren(true);
        _G.graphicLib.spriteFrameToSpriteFrameGrid(pictureSprite, fitSize, gridCellWidth, gridCellHeight, offsetWidth, offsetHeight, (sFrameGrid, imgW, imgH) => {
          sFrameGrid.some((rowArr, y) => {
            rowArr.map((slicedSFrame, x) => {
              const newTile = _.copyNode(sampleTile, this.gridContainer);
              newTile.cellPos = cc.v2(x, y);
              x || y || (this.bottomLeftTile = newTile);
              newTile.width = formalCellSize.w;
              newTile.height = formalCellSize.h;
              newTile.setPosition(x * formalCellSize.w, y * formalCellSize.h);
              _G.control.initTileControl(newTile);
              const tileGraphicNode = cc.find("tile_graphic", newTile);
              tileGraphicNode.setPosition(offsetWidth, offsetHeight);
              tileGraphicNode.getComponent(cc.Sprite).spriteFrame = slicedSFrame;
              const maskTileName = this.cellPosToMaskTileName(x, y, gridCellWidth, gridCellHeight);
              const maskTexture = _G.resources.getMaskTileTextureByName(maskTileName);
              const alphaMaskComp = tileGraphicNode.getComponent("shader_alpha_mask");
              alphaMaskComp.updateRender(maskTexture);
              const tileShadowNode = _.copyNode(_G.resources.getTileShadowNodeByName(maskTileName), this.gridContainer);
              _.setGlobalPosToNode(tileShadowNode, newTile);
              tileShadowNode.scaleX = formalCellScale.x;
              tileShadowNode.scaleY = formalCellScale.y;
              tileShadowNode.anchorX = .16;
              tileShadowNode.anchorY = .25;
              newTile.shadowNode = tileShadowNode;
              const tileHightlightNode = _.copyNode(_G.resources.getTileHighlightNodeByName(maskTileName), newTile);
              tileHightlightNode.scaleX = formalCellScale.x;
              tileHightlightNode.scaleY = formalCellScale.y;
              tileHightlightNode.setPosition(0, 0);
              tileHightlightNode.anchorX = .2067;
              tileHightlightNode.anchorY = .212;
              tileHightlightNode.active = false;
              tileHightlightNode.name = "highlight";
              const colliderComp = newTile.getComponent(cc.BoxCollider);
              colliderComp.offset.x = newTile.width / 2;
              colliderComp.offset.y = newTile.height / 2;
              colliderComp.size.width = newTile.width + TILE_COLLIDER_EXPAND_RATIO * formalCellSize.w * 2;
              colliderComp.size.height = newTile.height + TILE_COLLIDER_EXPAND_RATIO * formalCellSize.h * 2;
              this.tileDown(newTile);
            });
          });
          callback && callback();
        });
        this.currentTileCount = gridCellWidth * gridCellHeight;
        this.currentTileSize = (formalCellSize.w + formalCellSize.h) / 2;
        const picSprite = _G.resources.getInputPictureSpriteByName(inputPicture);
        [ this.previewPhotoNode, this.opaquePhotoNode, this.finalPhotoNode ].map(node => {
          node.getComponent(cc.Sprite).spriteFrame = picSprite;
          Object.assign(node, this.currentPictureFitSize);
        });
      },
      cellPosToMaskTileName(x, y, gridCellWidth, gridCellHeight) {
        const realY = gridCellHeight - y - 1;
        let maskTileName = "tile-inner1";
        0 == realY ? maskTileName = 0 == x ? "tile-corner-top-left" : x == gridCellWidth - 1 ? "tile-corner-top-right-" + (gridCellWidth % 2 == 1 ? "odd" : "even") : "tile-border-top" + (x % 2 == 1 ? "1" : "2") : realY == gridCellHeight - 1 ? maskTileName = 0 == x ? "tile-corner-bottom-left-" + (gridCellHeight % 2 == 1 ? "odd" : "even") : x == gridCellWidth - 1 ? "tile-corner-bottom-right-" + ((gridCellWidth + gridCellHeight) % 2 == 1 ? "odd" : "even") : "tile-border-bottom" + ((x + gridCellHeight) % 2 == 1 ? "1" : "2") : 0 == x ? maskTileName = "tile-border-left" + (realY % 2 == 1 ? "1" : "2") : x == gridCellWidth - 1 ? maskTileName = "tile-border-right" + ((realY + gridCellWidth) % 2 == 1 ? "1" : "2") : (x + realY) % 2 == 1 && (maskTileName = "tile-inner2");
        return maskTileName;
      },
      tileUp(tileNode) {
        tileNode.isUp = true;
        tileNode.zIndex = 100;
        tileNode.shadowNode.zIndex = 50;
        if (_G.coreGame.isTileSurroundedShadow(tileNode)) return;
        tileNode.shadowNode.active = true;
      },
      tileDown(tileNode) {
        tileNode.isUp = false;
        tileNode.zIndex = 1;
        tileNode.shadowNode.active = false;
      },
      tileHighlightOn(tileNode) {
        tileNode.isHighlighted = true;
        cc.find("highlight", tileNode).active = true;
      },
      tileHighlightOff(tileNode) {
        tileNode.isHighlighted = false;
        cc.find("highlight", tileNode).active = false;
      }
    };
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  project_init_comp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "627802AmqJKc6KbJDmiTk8k", "project_init_comp");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const _G = require("../system/all_modules");
    const _ = _G._;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ProjectInitComp = class ProjectInitComp extends cc.Component {
      constructor() {
        super(...arguments);
        this.futuraBoldFont = null;
        this.futuraMedFont = null;
      }
      start() {
        window["_G"] = _G;
      }
      onLoad() {
        cc.game.on(cc.game.EVENT_SHOW, () => _G.appEvents.onAppShow());
        cc.game.on(cc.game.EVENT_HIDE, () => _G.appEvents.onAppHide());
        _.setTimeout(() => {
          const loadingBg = document.getElementById("htmlLoadingBackground");
          loadingBg && (loadingBg.style.display = "none");
        }, 500);
        cc.director.getCollisionManager().enabled = true;
        for (let moduleName in _G) _G[moduleName].init && _G[moduleName].init();
      }
    };
    __decorate([ property(cc.Font) ], ProjectInitComp.prototype, "futuraBoldFont", void 0);
    __decorate([ property(cc.Font) ], ProjectInitComp.prototype, "futuraMedFont", void 0);
    ProjectInitComp = __decorate([ ccclass ], ProjectInitComp);
    exports.default = ProjectInitComp;
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  resources_manager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fb726ZRtJVHN7gVyH2InXHZ", "resources_manager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.resources = void 0;
    const _G = require("../system/all_modules");
    const _ = _G._;
    exports.resources = {
      pictureContainer: null,
      maskTilePixelArrList: {},
      isReady: false,
      textureQueueCount: 0,
      extPictureQueueCount: 0,
      callbackArr: [],
      addInitCallback(f) {
        if (this.isReady) return f();
        this.callbackArr.push(f);
      },
      initData(puzzleInfoArr) {
        this.pictureContainer = cc.find("Canvas/sprite_frames_store/input_pictures");
        this.handleExternalPictures(puzzleInfoArr);
      },
      getInputPicrures() {
        return this.pictureContainer.children;
      },
      handleExternalPictures(puzzleInfoArr) {
        this.pictureContainer.removeAllChildren();
        const nodeBuffer = [];
        this.extPictureQueueCount = puzzleInfoArr.length;
        puzzleInfoArr.map((puzzleData, index) => {
          const {id: id, name: name, imageUrl: imageUrl, url: url, description: description, width: width, height: height} = puzzleData;
          cc.assetManager.loadRemote(imageUrl, cc.SpriteFrame, (e, sFrame) => {
            if (e) return _.log(">> error loading external data ", e);
            const newNode = new cc.Node();
            nodeBuffer[index] = newNode;
            newNode.name = _G.levelManager.picInfoToPicName(id);
            newNode.metaData = puzzleData;
            const sprComp = newNode.addComponent(cc.Sprite);
            sprComp.spriteFrame = new cc.SpriteFrame(sFrame);
            this.extPictureQueueCount--;
          });
        });
        _.waitToRun(() => {
          nodeBuffer.map(newNode => {
            this.pictureContainer.addChild(newNode);
            _.setTimeout(() => {
              Object.assign(newNode, _G.mapVisual.getPictureFitSize(newNode));
            });
          });
          this.prepareMaskTiles();
        }, "!extPictureQueueCount", this);
      },
      preprocessInputPicture(pixelArr, width, height) {
        const fitSize = _G.mapVisual.getPictureFitSize({
          width: width,
          height: height
        });
      },
      prepareMaskTiles() {
        cc.find("Canvas/sprite_frames_store").active = false;
        const maskTileArr = cc.find("Canvas/sprite_frames_store/mask_tiles").children;
        this.textureQueueCount = maskTileArr.length;
        maskTileArr.map(node => {
          const sFrame = node.getComponent(cc.Sprite).spriteFrame;
          _G.graphicLib.spriteFrameToPixelArr(sFrame, data => {
            this.maskTilePixelArrList[node.name] = {
              data: data,
              width: node.width,
              height: node.height
            };
            this.textureQueueCount--;
          });
        });
        _.waitToRun(() => {
          this.isReady = true;
          this.callbackArr.map(f => f());
        }, "!textureQueueCount", this);
      },
      getMaskTileTextureByName(tileName) {
        const textureInfo = this.maskTilePixelArrList[tileName];
        if (!textureInfo) return _.log(`texture "${tileName}" is not ready !!!`);
        return _G.graphicLib.pixelArrToSpriteFrame(textureInfo.data, textureInfo.width, textureInfo.height);
      },
      getInputPictureSpriteByName(pictureName) {
        const pictureNode = cc.find(`Canvas/sprite_frames_store/input_pictures/${pictureName}`);
        return pictureNode.getComponent(cc.Sprite).spriteFrame;
      },
      getTileShadowNodeByName: tileName => cc.find(`Canvas/sprite_frames_store/mask_tile_shadows/${tileName}`),
      getTileHighlightNodeByName: tileName => cc.find(`Canvas/sprite_frames_store/mask_tile_highlights/${tileName}`),
      getPictureNameArr() {
        return this.pictureContainer.children.map(node => node.name);
      }
    };
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  scrollview_row_comp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a6f7bmbU5xOS5H0MvLFtOuA", "scrollview_row_comp");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const _G = require("../../system/all_modules");
    const _ = _G._;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let freeButtonComp = class freeButtonComp extends cc.Component {
      onLoad() {
        this.node.opacity = 255;
      }
      onCollisionEnter(other, self) {
        self.node.opacity = 255;
      }
      onCollisionExit(other, self) {
        self.node.opacity = 0;
      }
    };
    freeButtonComp = __decorate([ ccclass ], freeButtonComp);
    exports.default = freeButtonComp;
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules"
  } ],
  settings_view: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7a0aaluD6NMPLK9qKx2YYi7", "settings_view");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.settingsView = void 0;
    const _G = require("../../system/all_modules");
    const _ = _G._;
    exports.settingsView = {
      node: null,
      init() {
        return;
      },
      bindButtonHandlers() {
        _G.utilsUI.makeButton("Canvas/HUD_top/player_level/button_settings", () => {
          this.node.active = true;
        });
        _G.utilsUI.makeButton(cc.find("root/btn_close", this.node), () => {
          this.node.active = false;
        });
      },
      renderLanguageButtons() {
        const containerNode = cc.find("root/ScrollView/mask/content", this.node);
        const sampleNode = cc.find("Canvas/sample_nodes/settings_language_button");
        const existingNodeArr = containerNode.children;
        _G.localize.supportedLanguageArr.map(({code: code, name: name}, index) => {
          const newBtnNode = existingNodeArr[index] || _.copyNode(sampleNode, containerNode);
          _G.utilsUI.fillChildLabelByPath(newBtnNode, "label_language_name", name);
          cc.find("selected_cover", newBtnNode).active = _G.localize.currentLanguageCode === code;
          if (!newBtnNode.isBoundHandler) {
            newBtnNode.isBoundHandler = true;
            _G.utilsUI.makeButton(newBtnNode, () => {
              _G.localize.onLanguageChanges(code);
              this.renderLanguageButtons();
            });
          }
        });
      },
      bindSoundButtonHandlers() {
        _G.utilsUI.makeButton("Canvas/settings_layout/root/btn_music_off", () => {
          _G.audio.isMusicOff = false;
          _G.audio.playBgMusic();
          this.renderAllSoundButtons();
          _G.utilsData.save({
            isMusicOff: false
          });
        });
        _G.utilsUI.makeButton("Canvas/settings_layout/root/btn_music_on", () => {
          _G.audio.isMusicOff = true;
          _G.audio.stopBgMusic();
          this.renderAllSoundButtons();
          _G.utilsData.save({
            isMusicOff: true
          });
        });
        _G.utilsUI.makeButton("Canvas/settings_layout/root/btn_sound_off", () => {
          _G.audio.isSoundOff = false;
          this.renderAllSoundButtons();
          _G.utilsData.save({
            isSoundOff: false
          });
        });
        _G.utilsUI.makeButton("Canvas/settings_layout/root/btn_sound_on", () => {
          _G.audio.isSoundOff = true;
          this.renderAllSoundButtons();
          _G.utilsData.save({
            isSoundOff: true
          });
        });
      },
      renderAllSoundButtons() {
        cc.find("root/btn_music_off", this.node).active = _G.audio.isMusicOff;
        cc.find("root/btn_sound_off", this.node).active = _G.audio.isSoundOff;
        cc.find("root/btn_music_on", this.node).active = !_G.audio.isMusicOff;
        cc.find("root/btn_sound_on", this.node).active = !_G.audio.isSoundOff;
      }
    };
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules"
  } ],
  shader_alpha_mask: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "daff6JBCl9PXo0HpdCEujAL", "shader_alpha_mask");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const _G = require("../../script/system/all_modules");
    const _ = _G._;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GuideShader = class GuideShader extends cc.Component {
      constructor() {
        super(...arguments);
        this.maskTexture = null;
      }
      updateRender(texture) {
        this.maskTexture = texture;
        const material = this.node.getComponent(cc.Sprite).getMaterial(0);
        material.setProperty("texture_mask", this.maskTexture.getTexture());
        const renderComp = this.node.getComponent(cc.RenderComponent) || this.node.addComponent(cc.RenderComponent);
        renderComp.setMaterial(0, material);
      }
    };
    __decorate([ property(cc.SpriteFrame) ], GuideShader.prototype, "maskTexture", void 0);
    GuideShader = __decorate([ ccclass ], GuideShader);
    exports.default = GuideShader;
    cc._RF.pop();
  }, {
    "../../script/system/all_modules": "all_modules"
  } ],
  shader_shadow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4c344V5+cNLVaGXfe+IIJIZ", "shader_shadow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const _G = require("../../script/system/all_modules");
    const _ = _G._;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ShaderShadow = class ShaderShadow extends cc.Component {
      constructor() {
        super(...arguments);
        this.mainTexture = null;
      }
      updateRender(texture) {
        this.mainTexture = texture;
        const material = this.node.getComponent(cc.Sprite).getMaterial(0);
        material.setProperty("main_texture", this.mainTexture.getTexture());
        const renderComp = this.node.getComponent(cc.RenderComponent) || this.node.addComponent(cc.RenderComponent);
        renderComp.setMaterial(0, material);
      }
    };
    __decorate([ property(cc.SpriteFrame) ], ShaderShadow.prototype, "mainTexture", void 0);
    ShaderShadow = __decorate([ ccclass ], ShaderShadow);
    exports.default = ShaderShadow;
    cc._RF.pop();
  }, {
    "../../script/system/all_modules": "all_modules"
  } ],
  system_types: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9a378sc4D1PKauhxf7mEMi/", "system_types");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AchievementEntry = exports.achievementTask = exports.achievementReward = exports.QuestEntry = exports.chestReward = exports.questReward = exports.questTask = exports.rewardDaily = void 0;
    const _G = require("./all_modules");
    const _ = _G._;
    var rewardDaily;
    (function(rewardDaily) {
      rewardDaily["Cash"] = "Cash";
      rewardDaily["CashTime"] = "CashTime";
      rewardDaily["Gem"] = "Gem";
      rewardDaily["SpeedUp"] = "SpeedUp";
      rewardDaily["Plane"] = "Plane";
    })(rewardDaily = exports.rewardDaily || (exports.rewardDaily = {}));
    var questTask;
    (function(questTask) {
      questTask["Login"] = "Login";
      questTask["MergePlane"] = "MergePlane";
      questTask["WatchVideo"] = "WatchVideo";
      questTask["InviteFriends"] = "InviteFriends";
      questTask["SpeedUp"] = "SpeedUp";
    })(questTask = exports.questTask || (exports.questTask = {}));
    var questReward;
    (function(questReward) {
      questReward["Cash"] = "Cash";
      questReward["Gem"] = "Gem";
      questReward["CashTime"] = "CashTime";
    })(questReward = exports.questReward || (exports.questReward = {}));
    var chestReward;
    (function(chestReward) {
      chestReward["Cash"] = "Cash";
      chestReward["Gem"] = "Gem";
      chestReward["Plane"] = "Plane";
      chestReward["CashTime"] = "CashTime";
    })(chestReward = exports.chestReward || (exports.chestReward = {}));
    class QuestEntry {
      constructor(param) {
        this.uuid = _.getNewUuid();
        Object.assign(this, param);
      }
    }
    exports.QuestEntry = QuestEntry;
    var achievementReward;
    (function(achievementReward) {
      achievementReward["Gem"] = "Gem";
    })(achievementReward = exports.achievementReward || (exports.achievementReward = {}));
    var achievementTask;
    (function(achievementTask) {
      achievementTask["MergePlane"] = "MergePlane";
    })(achievementTask = exports.achievementTask || (exports.achievementTask = {}));
    class AchievementEntry {
      constructor(param) {
        this.uuid = _.getNewUuid();
        Object.assign(this, param);
      }
    }
    exports.AchievementEntry = AchievementEntry;
    cc._RF.pop();
  }, {
    "./all_modules": "all_modules"
  } ],
  tile_comp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd13a1nRSxO9oG48AZjd269", "tile_comp");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const _G = require("../system/all_modules");
    const _ = _G._;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TileComp = class TileComp extends cc.Component {
      onCollisionEnter(other, self) {
        const [thisNode, otherNode] = [ self.node, other.node ];
        thisNode.collidingTileArr.push(otherNode);
      }
      onCollisionExit(other, self) {
        const [thisNode, otherNode] = [ self.node, other.node ];
        _.removeArrayItem(thisNode.collidingTileArr, otherNode);
      }
    };
    TileComp = __decorate([ ccclass ], TileComp);
    exports.default = TileComp;
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  user_model: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd000qpQJRCKZjwxlsdTXBW", "user_model");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.userModel = void 0;
    const _G = require("../system/all_modules");
    const _ = _G._;
    const currentTime = new Date();
    let currentMonthNumber = currentTime.getMonth() + 1;
    currentMonthNumber < 10 && (currentMonthNumber = "0" + currentMonthNumber);
    exports.userModel = {
      lastDataSaveTimeUTC: 0,
      dataFieldNameArr: [ "lastDataSaveTimeUTC" ],
      speedUpStartTimeUTC: 0,
      speedupDuration: 0,
      initCallbackArr: [],
      isInitialized: false,
      rewardedPlaneArr: [],
      init() {
        _G.login.addLoginDataFields(...this.dataFieldNameArr);
      },
      addInitCallback(func) {
        this.isInitialized ? func(_G.login.loginData) : this.initCallbackArr.push(func);
      },
      save() {
        const dataObject = {};
        this.dataFieldNameArr.map(fieldName => dataObject[fieldName] = this[fieldName]);
        dataObject["lastDataSaveTimeUTC"] = this.lastDataSaveTimeUTC = _.round(_.getMsPassedUTC() / 1e3);
        _G.utilsData.save(dataObject);
      }
    };
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules"
  } ],
  utils_anim_fx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25b45wNZcZF7Jc+YiGRe0VU", "utils_anim_fx");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.utilsAnimFx = void 0;
    const _G = require("../../system/all_modules");
    const _ = _G._;
    exports.utilsAnimFx = {
      fxNodePool: {},
      init() {},
      replayParticle(node) {
        if (!node || !node.getComponent(cc.ParticleSystem)) return;
        node.active = true;
        node.getComponent(cc.ParticleSystem).resetSystem();
      },
      playNodeAnim(node, clipName, repeatTime, isKeepPreviousClip = false, callback) {
        const animComp = node.getComponent(cc.Animation);
        if (!node.activeInHierarchy || !animComp) return;
        clipName = clipName || (animComp.defaultClip ? animComp.defaultClip.name : "");
        if (!clipName) return;
        const animState = animComp[isKeepPreviousClip ? "playAdditive" : "play"](clipName);
        if (!animState) return;
        animState.repeatCount = (-1 == repeatTime ? Infinity : repeatTime) || 1;
        callback && animComp.on("finished", () => {
          animComp.off("finished");
          callback();
        });
        return animState;
      },
      playNodeAnimAsSoonAsNodeActive(node, clipName, repeatTime = 1, isKeepPreviousClip = true) {
        const varName = "waitInterval2PlayAnimWhenActive";
        node[varName] = _.waitToRun(() => {
          node[varName] && clearInterval(node[varName]);
          this.playNodeAnim(node, clipName, repeatTime, isKeepPreviousClip);
        }, "activeInHierarchy", node);
      },
      playNodeAnimArr(node, orgClipNameArr, isKeepPreviousClip = false, callback) {
        if (!node.activeInHierarchy) return;
        const animComp = node.getComponent(cc.Animation);
        if (!node.activeInHierarchy || !animComp) return;
        const clipNameArr = [ ...orgClipNameArr ];
        animComp.on("finished", () => {
          if (clipNameArr.length) this.playNodeAnim(node, clipNameArr.shift(), 1, isKeepPreviousClip); else {
            animComp.off("finished");
            callback && callback();
          }
        });
        this.playNodeAnim(node, clipNameArr.shift(), 1, isKeepPreviousClip);
      },
      stopAllNodeAnims(node) {
        const animComp = node.getComponent(cc.Animation);
        if (!animComp) return;
        animComp.stop();
        animComp.off("finished");
      },
      stopAnimAtFrame0(node, clipName) {
        const animComp = node.getComponent(cc.Animation);
        animComp.play("ufo_ring_fx");
        _.setTimeout(() => {
          animComp.setCurrentTime(0);
          this.stopAllNodeAnims(node);
        });
      },
      playIncreasingNumberLabel(labelNode, oldNumber, addedAmount, updateCount = 5, duration = .5, delayStartTime = 0, template = "xxx") {
        const labelComp = labelNode.getComponent(cc.Label);
        const incrementAmount = addedAmount / updateCount;
        const updateDelay = duration / updateCount;
        cc.tween(labelNode).delay(delayStartTime).repeat(updateCount, cc.tween().call(() => {
          oldNumber += incrementAmount;
          const currentNumberStr = _.formatMoney(_.round(oldNumber));
          labelComp.string = template.replace(/xxx/g, currentNumberStr);
        }).delay(updateDelay)).start();
      },
      getNewFxNode(sampleNode, fxContainer) {
        sampleNode.nodePoolId || (sampleNode.nodePoolId = _.getNewUuid());
        this.fxNodePool[sampleNode.nodePoolId] || (this.fxNodePool[sampleNode.nodePoolId] = []);
        const newNode = this.fxNodePool[sampleNode.nodePoolId].pop() || _.copyNode(sampleNode);
        newNode.nodePoolId = sampleNode.nodePoolId;
        newNode.parent = fxContainer || _G.coreFX.fxContainer;
        return newNode;
      },
      saveFxNodeToPool(node) {
        node.stopAllActions();
        node.active = false;
        this.fxNodePool[node.nodePoolId].unshift(node);
      },
      particlesFlyFromA2B(sampleNode, nodeA, nodeB, animConfig, fxContainer) {
        const {numberOfNode: numberOfNode, flyDuration: flyDuration, delayStartTime: delayStartTime, randomBezierPointRange: randomBezierPointRange} = animConfig || _G.configAnimFx.defaultParticleFlyA2BConfigs;
        const posDiffVec2 = _.getGlobalPosDiff(nodeA, nodeB);
        for (let i = 0; i < numberOfNode; i++) {
          const newNode = this.getNewFxNode(sampleNode, fxContainer);
          newNode.active = true;
          _.setGlobalPosToNode(newNode, nodeA);
          const bezierP1 = this.getRandomPointInRage(randomBezierPointRange);
          const bezierP2 = this.getRandomPointInRage(randomBezierPointRange);
          cc.tween(newNode).delay(i * delayStartTime).bezierBy(flyDuration, bezierP1, bezierP2, posDiffVec2).call(() => {
            this.saveFxNodeToPool(newNode);
          }).start();
        }
      },
      getRandomPointInRage: pointRange => cc.v2(_.randomNumber(2 * pointRange.x) - pointRange.x, _.randomNumber(2 * pointRange.y) - pointRange.y),
      nodeFlyFromAtoB(node, targetNode, duration = .3, callback) {
        const diffVec = _.getGlobalPosDiff(node, targetNode);
        cc.tween(node).by(duration, {
          position: diffVec
        }).call(() => callback && callback()).start();
      }
    };
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules"
  } ],
  utils_common: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c6a38LFRNHfqlBBkLI3s1j", "utils_common");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports._ = void 0;
    let uuidIndex = 1e5;
    const utils_time_1 = require("./utils_time");
    exports._ = Object.assign(Object.assign({
      NO_CONSOLE_LOG: false,
      isANDROID: cc.sys.os == cc.sys.OS_ANDROID,
      isIOS: cc.sys.os == cc.sys.OS_IOS,
      max: Math.max,
      min: Math.min,
      round: Math.round,
      floor: Math.floor,
      ceil: Math.ceil,
      sign: Math.sign,
      abs: Math.abs,
      pow: Math.pow,
      random: Math.random,
      sqrt: Math.sqrt,
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      atan: Math.atan,
      atan2: Math.atan2,
      log10: Math.log10,
      PI: Math.PI,
      setInRange: (val, max, min) => exports._.max(exports._.min(val, max), min),
      randomArrItem(arr, isRemoveItem = false) {
        const iRandom = Math.floor(Math.random() * arr.length);
        return isRemoveItem ? arr.splice(iRandom, 1)[0] : arr[iRandom];
      },
      isString: x => "string" === typeof x,
      isFunction: functionToCheck => functionToCheck && "[object Function]" === {}.toString.call(functionToCheck),
      log(...args) {
        if (!this.NO_CONSOLE_LOG) try {
          console.log(...args);
        } catch (e) {}
      },
      trimStr(inputStr, length, paddingText = "") {
        if (inputStr.length <= length) return inputStr;
        return inputStr.substring(0, length) + paddingText;
      },
      getNewUuid: () => uuidIndex++,
      removeArrayItem(arr, item) {
        const index = arr.indexOf(item);
        -1 != index && arr.splice(index, 1);
      },
      addUniqueElemToArr(arr, item) {
        if (arr.includes(item)) return;
        arr.push(item);
      },
      randomNumber: maxValue => exports._.floor(exports._.random() * maxValue),
      getGlobalPosition: node => node.convertToWorldSpaceAR(cc.Vec2.ZERO),
      getGlobalPosDiff(node1, node2) {
        return this.getGlobalPosition(node2).sub(this.getGlobalPosition(node1));
      },
      setGlobalPosToNode(nodeToSet, targetNode) {
        const targetGPos = this.getGlobalPosition(targetNode);
        const localPos = nodeToSet.parent.convertToNodeSpaceAR(targetGPos);
        nodeToSet.setPosition(localPos);
      },
      setGlobalPos(nodeToSet, targetGPos) {
        const localPos = nodeToSet.parent.convertToNodeSpaceAR(targetGPos);
        nodeToSet.setPosition(localPos);
      },
      moveToNewParentKeepPosition(node, newParentNode) {
        const curNodePos = newParentNode.convertToNodeSpaceAR(this.getGlobalPosition(node));
        node.parent = newParentNode;
        node.setPosition(curNodePos);
      },
      isGlobalOverlapping: (node1, node2) => cc.Intersection.rectRect(node1.getBoundingBoxToWorld(), node2.getBoundingBoxToWorld()),
      copyNode(sourceNode, targetParent) {
        const newNode = cc.instantiate(sourceNode);
        targetParent && (newNode.parent = targetParent);
        return newNode;
      },
      getNodePath(node) {
        let pathArr = [ node.name ];
        let parent = node.parent;
        let safeCount = 0;
        while (parent && safeCount++ < 50) {
          if (!parent.parent) break;
          pathArr.push(parent.name);
          parent = parent.parent;
        }
        return pathArr.reverse().join("/");
      }
    }, utils_time_1.default), {
      radianToDegrees: radian => 180 * radian / Math.PI,
      degreesToRadian: degrees => degrees * Math.PI / 180,
      formatTime(timeInSec) {
        let hours = exports._.floor(timeInSec / 3600);
        let mins = exports._.floor(timeInSec % 3600 / 60);
        let secs = timeInSec % 3600 % 60;
        hours < 10 && (hours = "0" + hours);
        mins < 10 && (mins = "0" + mins);
        secs < 10 && (secs = "0" + secs);
        return ("00" == hours ? "" : hours + ":") + mins + ":" + secs;
      },
      formatMoney(cash) {
        let digits = exports._.floor(Math.log10(cash)) + 1;
        if (digits <= 6) return cash.toLocaleString();
        let suffixes = [ "K", "M", "B", "T" ];
        let chunks = exports._.floor((digits - 1) / 3);
        let startingChar = "a";
        let suffix;
        suffix = chunks - 2 <= 3 ? suffixes[chunks - 2] : String.fromCharCode((chunks - 6) / 26 + startingChar.charCodeAt(0)) + String.fromCharCode((chunks - 6) % 26 + startingChar.charCodeAt(0));
        let truncatedCash = exports._.round(cash / exports._.pow(10, 3 * (chunks - 1)));
        return truncatedCash.toLocaleString() + suffix;
      },
      paddNumberToFitDigitLength(orgNumber, digitLength) {
        const numStr = "" + orgNumber;
        const missedLength = digitLength - numStr.length;
        if (missedLength <= 0) return orgNumber;
        return "0".repeat(missedLength) + numStr;
      }
    });
    cc._RF.pop();
  }, {
    "./utils_time": "utils_time"
  } ],
  utils_data: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "769b1HrFnpEkJKKpSJ/BVzB", "utils_data");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.utilsData = void 0;
    const _G = require("../../system/all_modules");
    const _ = _G._;
    exports.utilsData = {
      save(dataObject, callback) {
        if (window.FBInstant) FBInstant.player.setDataAsync(dataObject).then(() => {
          callback && callback();
        }, e => console.warn(" utils_data >> save >> failed ", e)).catch(e => console.warn(" utils_data >> save >> failed (catch) ", e)); else {
          for (let key in dataObject) localStorage.setItem(key, JSON.stringify(dataObject[key]));
          setTimeout(() => {
            callback && callback();
          }, 300);
        }
      },
      load(keyArr, callback) {
        if (window.FBInstant) FBInstant.player.getDataAsync(keyArr).then(data => {
          callback && callback(data);
        }); else {
          const dataObj = {};
          keyArr.map(key => {
            if (null === localStorage.getItem(key)) return;
            try {
              dataObj[key] = JSON.parse(localStorage.getItem(key));
            } catch (e) {
              console.warn(` utilsData.load() >> Error  data key = ${key} `, e);
            }
          });
          callback && setTimeout(() => callback(dataObj), 100);
        }
      },
      getEntryPointData: () => window.FBInstant && FBInstant.getEntryPointData() || {}
    };
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules"
  } ],
  utils_time: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "233be6H/0VKNYjn2mjsWkCF", "utils_time");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const _G = require("../../system/all_modules");
    const _ = _G._;
    let timerUuidIndex = 1e5;
    exports.default = {
      getMsPassedUTC: () => new Date().getTime(),
      getMsPassedPT() {
        const pacificTimeOffset = this.getPacificTimeOffset();
        const msPassedInPTNow = this.getMsPassedUTC() + 60 * pacificTimeOffset * 60 * 1e3;
        return msPassedInPTNow;
      },
      getTimePT(dateObj = new Date()) {
        const pacificTimeOffset = this.getPacificTimeOffset(dateObj);
        const utcHour = dateObj.getHours() + dateObj.getTimezoneOffset() / 60;
        dateObj.setHours(utcHour + pacificTimeOffset);
        return dateObj;
      },
      isSameDate: (dateObj1, dateObj2) => dateObj1.getFullYear() == dateObj2.getFullYear() && dateObj1.getMonth() == dateObj2.getMonth() && dateObj1.getDate() == dateObj2.getDate(),
      getTotalMsToMidnightPT() {
        const msOf1Day = 864e5;
        const nowPT = this.getMsPassedPT();
        const msToMidNight = msOf1Day - nowPT % msOf1Day;
        return msToMidNight;
      },
      getDSTStartEndDate(dateObj) {
        const currentDate = dateObj || new Date();
        const currentYear = currentDate.getFullYear();
        const firstOfMarch = new Date(currentYear, 2, 1);
        const daysUntilFirstSundayInMarch = (7 - firstOfMarch.getDay()) % 7;
        const secondSundayInMarch = firstOfMarch.getDate() + daysUntilFirstSundayInMarch + 7;
        const dstStartDate = new Date(currentYear, 2, secondSundayInMarch);
        const firstOfNovember = new Date(currentYear, 10, 1);
        const daysUntilFirstSundayInNov = (7 - firstOfNovember.getDay()) % 7;
        const firstSundayInNovember = firstOfNovember.getDate() + daysUntilFirstSundayInNov;
        const dstEndDate = new Date(currentYear, 10, firstSundayInNovember);
        return [ dstStartDate, dstEndDate ];
      },
      getPacificTimeOffset(paramDate) {
        const dateObj = paramDate || new Date();
        const [startDST, endDST] = this.getDSTStartEndDate();
        const isDSTActive = dateObj > startDST && dateObj < endDST;
        const pacificTimeOffset = isDSTActive ? -7 : -8;
        return pacificTimeOffset;
      },
      getMonthName(dateObj) {
        dateObj = dateObj || new Date();
        const monthNameArr = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        return monthNameArr[dateObj.getMonth()];
      },
      setTimeout(callback, timeInMillisecond = 0) {
        const target = {
          _id: timerUuidIndex++,
          __instanceId: timerUuidIndex,
          callback: null
        };
        target.callback = () => {
          callback(target);
        };
        cc.director.getScheduler().schedule(target.callback, target, timeInMillisecond / 1e3, 0, 0, false);
        return target;
      },
      clearTimeout(target) {
        if (!target || !target._id || !target.callback) return;
        cc.director.getScheduler().unschedule(target.callback, target);
      },
      setInterval(callback, timeInMillisecond = 0) {
        const target = {
          _id: timerUuidIndex++,
          __instanceId: timerUuidIndex,
          callback: null
        };
        target.callback = () => {
          callback(target);
        };
        cc.director.getScheduler().schedule(target.callback, target, timeInMillisecond / 1e3, cc.macro.REPEAT_FOREVER, 0, false);
        return target;
      },
      clearInterval(target) {
        if (!target || !target._id || !target.callback) return;
        cc.director.getScheduler().unschedule(target.callback, target);
      },
      secondsToTimeCountdown(secondsCount = 0) {
        if (secondsCount <= 0) return "00:00";
        let days = Math.floor(secondsCount / 86400);
        let hours = Math.floor(secondsCount % 86400 / 3600);
        let minutes = Math.floor(secondsCount % 3600 / 60);
        let seconds = secondsCount % 60;
        if (days > 2) return days + " days";
        if (1 == days) return "1 day";
        let ret = "";
        hours >= 10 ? ret = hours + ":" : hours > 0 && (ret = "0" + hours + ":");
        ret += minutes >= 10 ? minutes + ":" : "0" + minutes + ":";
        ret += seconds >= 10 ? seconds : "0" + seconds;
        return ret;
      },
      waitToRun(callback, propertyName, mainObject = window, interval = .1, maxTimeWait, timeoutCallback) {
        let isRunSuccess = false;
        const isReversed = propertyName.startsWith("!");
        const isFunction = propertyName.endsWith("()");
        propertyName = propertyName.replace("!", "").replace("()", "");
        const func = isFunction ? () => mainObject[propertyName]() : null;
        const waitInterval = setInterval(() => {
          if (isReversed) {
            if (isFunction) {
              if (func()) return;
            } else if (mainObject[propertyName]) return;
          } else if (isFunction) {
            if (!func()) return;
          } else if (!mainObject[propertyName]) return;
          clearInterval(waitInterval);
          isRunSuccess = true;
          callback(mainObject[propertyName]);
        }, 1e3 * interval);
        maxTimeWait && this.setTimeout(() => {
          clearInterval(waitInterval);
          timeoutCallback && !isRunSuccess && timeoutCallback();
        }, 1e3 * maxTimeWait);
        return waitInterval;
      }
    };
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules"
  } ],
  utils_ui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b08e1le7AhElZTc77BxLM+1", "utils_ui");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.utilsUI = void 0;
    const _G = require("../../system/all_modules");
    const _ = _G._;
    exports.utilsUI = {
      fillLabel(labelNode, text) {
        labelNode.getComponent(cc.Label).string = text;
      },
      fillChildLabelByPath(node, path, text) {
        const labelNode = cc.find(path, node);
        if (!labelNode) return;
        labelNode.getComponent(cc.Label).string = text;
      },
      showOnlyChildNodeWithNameAs(parentNode, childNodeName) {
        let retChildNode;
        parentNode.children.map(childNode => {
          childNode.active = childNode.name == childNodeName;
          childNode.active && (retChildNode = childNode);
        });
        return retChildNode;
      },
      setLabelCountDownTimer(labelNode, targetUTC, timeoutCallback) {
        "string" === typeof labelNode && (labelNode = cc.find(labelNode));
        labelNode.countDownTimerVar && clearInterval(labelNode.countDownTimerVar);
        const timerFunc = () => {
          if (!labelNode.parent) return clearInterval(labelNode.countDownTimerVar);
          const timeDiff = targetUTC - _.getMsPassedUTC();
          const timeDiffStr = _.secondsToTimeCountdown(_.floor(timeDiff / 1e3));
          _G.utilsUI.fillLabel(labelNode, timeDiffStr);
          if (timeDiff <= 0) {
            clearInterval(labelNode.countDownTimerVar);
            timeoutCallback && timeoutCallback();
          }
        };
        labelNode.countDownTimerVar = setInterval(timerFunc, 500);
        timerFunc();
      },
      setNodeSprite(node, spriteFrame) {
        if (!node || !node.getComponent(cc.Sprite)) return;
        node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      },
      setNodeSpriteFromUrl(node, url, callback, isSkipImageExisted = false) {
        if (!node || !node.getComponent(cc.Sprite)) return;
        if (isSkipImageExisted && node.getComponent(cc.Sprite).spriteFrame) return;
        cc.assetManager.loadRemote(url, (error, texture) => {
          error || this.setNodeSprite(node, new cc.SpriteFrame(texture));
          return callback && callback();
        });
      },
      setNodeSpriteFillRange(node, fillRange) {
        if (!node || !node.getComponent(cc.Sprite)) return;
        node.getComponent(cc.Sprite).fillRange = fillRange;
      },
      makeButton(node, handlerFunc, isNotBubble = false, isNotPlaySound = false) {
        const myNode = _.isString(node) ? cc.find(node) : node;
        _.setTimeout(() => {
          if (myNode.getComponent("free_button_comp")) return;
          myNode.addComponent("free_button_comp");
          const butComp = myNode.addComponent(cc.Button);
          butComp.transition = isNotBubble ? null : cc.Button.Transition.SCALE;
          const eventHandler = new cc.Component.EventHandler();
          eventHandler.target = myNode;
          eventHandler.component = "free_button_comp";
          eventHandler.handler = "freeHandler";
          butComp.clickEvents.push(eventHandler);
          myNode.freeButtonHandlerFunc = () => {
            handlerFunc();
            isNotPlaySound || _G.audio.playSoundClickButton();
          };
        });
      },
      singleTouchSet(node, touchStartFunc, touchMoveFunc, touchEndFunc) {
        const callFuncWithEvent = (func, event) => {
          const pos = event.touch.getLocation();
          func(pos, event);
        };
        node.on("touchstart", event => {
          if (node._customTouchId) return;
          node._customTouchId = event.touch._id + 1;
          touchStartFunc && callFuncWithEvent(touchStartFunc, event);
        });
        touchMoveFunc && node.on("touchmove", event => {
          var tID = event.touch._id + 1;
          if (tID != node._customTouchId) return;
          touchMoveFunc && callFuncWithEvent(touchMoveFunc, event);
        });
        var touchDestroy = event => {
          var tID = event.touch._id + 1;
          if (tID != node._customTouchId) return;
          node._customTouchId = null;
          touchEndFunc && callFuncWithEvent(touchEndFunc, event);
        };
        node.on("touchend", touchDestroy);
        node.on("touchcancel", touchDestroy);
      },
      makeDraggable(node) {
        let posDiff;
        _G.utilsUI.singleTouchSet(node, pos => {
          posDiff = _.getGlobalPosition(node).sub(pos);
        }, pos => {
          _.setGlobalPos(node, pos.add(posDiff));
        }, pos => {});
      },
      fixScrollViewPerformance(layoutNode, contentNode, viewportRowNumber = 4) {
        if (!contentNode.rowVisibleCollider) {
          contentNode.rowVisibleCollider = true;
          const parentMask = contentNode.parent;
          const newRowCollider = contentNode.rowVisibleCollider = new cc.Node("scrollview_item_display_area");
          newRowCollider.group = "scrollview";
          this.addSimpleBoxColliderComp(newRowCollider, parentMask);
          newRowCollider.parent = parentMask;
          layoutNode.on("active-in-hierarchy-changed", () => {
            layoutNode.active ? _.setTimeout(() => {
              contentNode.children.map((childNode, index) => {
                childNode.active = true;
                childNode.opacity = index < viewportRowNumber ? 255 : 0;
              });
            }, 500) : contentNode.children.map((childNode, index) => {
              childNode.active = index < viewportRowNumber;
            });
          });
        }
        contentNode.children.map((childNode, index) => {
          if (!childNode.getComponent("scrollview_row_comp")) {
            childNode.addComponent("scrollview_row_comp");
            this.addSimpleBoxColliderComp(childNode);
            childNode.group = "scrollview";
          }
          childNode.active = !!layoutNode.active || index < viewportRowNumber;
        });
      },
      addSimpleBoxColliderComp(node, parentNode) {
        parentNode = parentNode || node;
        const boxColliderComp = node.addComponent(cc.BoxCollider);
        boxColliderComp.size.width = parentNode.width;
        boxColliderComp.size.height = parentNode.height;
        boxColliderComp.offset.x = parentNode.width * (.5 - parentNode.anchorX);
        boxColliderComp.offset.y = parentNode.width * (.5 - parentNode.anchorY);
      }
    };
    cc._RF.pop();
  }, {
    "../../system/all_modules": "all_modules"
  } ]
}, {}, [ "control", "core_game", "game_flow", "graphic_lib", "level_manager", "map_visual", "shader_alpha_mask", "shader_shadow", "tile_comp", "core_fx", "core_ui", "user_model", "settings_view", "audio", "free_button_comp", "scrollview_row_comp", "utils_anim_fx", "utils_common", "utils_data", "utils_time", "utils_ui", "all_modules", "anim_event_comp", "app_events", "config_anim_fx", "en_US", "es_ES", "localize", "login", "project_init_comp", "resources_manager", "system_types" ]);