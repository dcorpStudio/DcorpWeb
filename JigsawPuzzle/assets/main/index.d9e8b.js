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
    __exportStar(require("../system/resources_manager"), exports);
    __exportStar(require("../core-game/core_game"), exports);
    __exportStar(require("../core-game/user_model"), exports);
    __exportStar(require("../system/configurations/config_anim_fx"), exports);
    __exportStar(require("../core-game/ui-gameplay/core_ui"), exports);
    __exportStar(require("../core-game/ui-gameplay/core_fx"), exports);
    __exportStar(require("../features/settings/settings_view"), exports);
    __exportStar(require("../system/localizations/localize"), exports);
    cc._RF.pop();
  }, {
    "../core-game/core_game": "core_game",
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
  alpha_mask: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "daff6JBCl9PXo0HpdCEujAL", "alpha_mask");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GuideShader = class GuideShader extends cc.Component {
      constructor() {
        super(...arguments);
        this.maskTexture = null;
      }
      onLoad() {}
      updateRenderMask(gridParams) {
        const {tileBaseWidth: tileBaseWidth, tileBaseHeight: tileBaseHeight, maskUniformRealSize: maskUniformRealSize, gridPixelWidth: gridPixelWidth, gridPixelHeight: gridPixelHeight, gridCellWidth: gridCellWidth, gridCellHeight: gridCellHeight, cellX: cellX, cellY: cellY} = gridParams;
        const material = this.node.getComponent(cc.Sprite).getMaterial(0);
        material.setProperty("texture_mask", this.maskTexture.getTexture());
        const formalCellSize = cc.v2(gridPixelWidth / gridCellWidth, gridPixelHeight / gridCellHeight);
        const formalCellScale = cc.v2(formalCellSize.x / tileBaseWidth, formalCellSize.y / tileBaseHeight);
        const innerMaskOffsetRatioX = .5 * (maskUniformRealSize - tileBaseWidth) * formalCellScale.x / gridPixelWidth;
        const innerMaskOffsetRatioY = .5 * (maskUniformRealSize - tileBaseHeight) * formalCellScale.y / gridPixelHeight;
        const cellOffsetRatioX = formalCellSize.x * cellX / gridPixelWidth;
        const cellOffsetRatioY = formalCellSize.y * cellY / gridPixelHeight;
        material.setProperty("maskRatioX", maskUniformRealSize * formalCellScale.x / gridPixelWidth);
        material.setProperty("maskRatioY", maskUniformRealSize * formalCellScale.y / gridPixelHeight);
        material.setProperty("offsetRatioX", cellOffsetRatioX - innerMaskOffsetRatioX);
        material.setProperty("offsetRatioY", cellOffsetRatioY - innerMaskOffsetRatioY);
        let render = this.node.getComponent(cc.RenderComponent) || this.node.addComponent(cc.RenderComponent);
        render.setMaterial(0, material);
      }
    };
    __decorate([ property(cc.SpriteFrame) ], GuideShader.prototype, "maskTexture", void 0);
    GuideShader = __decorate([ ccclass ], GuideShader);
    exports.default = GuideShader;
    cc._RF.pop();
  }, {} ],
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
        });
        _.setTimeout(() => this.loadAudioFiles(), 1e3);
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
    const gridParams = {
      tileBaseWidth: 212,
      tileBaseHeight: 208,
      maskUniformRealSize: 340,
      gridPixelWidth: 1e3,
      gridPixelHeight: 667,
      gridCellWidth: 21,
      gridCellHeight: 14
    };
    exports.coreGame = {
      init() {
        const gridContainer = cc.find("Canvas/play_area/grid");
        const sampleTile = cc.find("Canvas/sample_nodes/tile_cell");
        const {gridPixelWidth: gridPixelWidth, gridPixelHeight: gridPixelHeight, gridCellWidth: gridCellWidth, gridCellHeight: gridCellHeight} = gridParams;
        gridContainer.width = gridParams.gridPixelWidth;
        gridContainer.height = gridParams.gridPixelHeight;
        const formalCellSize = cc.v2(gridPixelWidth / gridCellWidth, gridPixelHeight / gridCellHeight);
        for (let x = 0; x < gridCellWidth; x++) for (let y = 0; y < gridCellHeight; y++) {
          const newTile = _.copyNode(sampleTile, gridContainer);
          const newTileMask = cc.find("mask_tile_inner", newTile);
          const alphaMaskComp = newTileMask.getComponent("alpha_mask");
          let maskTileName = this.cellPosToMaskTileName(x, y, gridCellWidth, gridCellHeight);
          alphaMaskComp.maskTexture = _G.resources.getMaskTileTextureByName(maskTileName);
          alphaMaskComp.updateRenderMask(Object.assign(Object.assign({}, gridParams), {
            cellX: x,
            cellY: gridParams.gridCellHeight - y - 1
          }));
          newTile.width = formalCellSize.x;
          newTile.height = formalCellSize.y;
          newTile.setPosition(x * formalCellSize.x, y * formalCellSize.y);
          newTileMask.setPosition(gridPixelWidth / 2 - x * formalCellSize.x, gridPixelHeight / 2 - y * formalCellSize.y);
          this.initControlMaskTile(newTile);
        }
      },
      cellPosToMaskTileName(x, y, gridCellWidth, gridCellHeight) {
        const realY = gridCellHeight - y - 1;
        let maskTileName = "tile-inner1";
        0 == realY ? maskTileName = 0 == x ? "tile-corner-top-left" : x == gridCellWidth - 1 ? "tile-corner-top-right-" + (gridCellWidth % 2 == 1 ? "odd" : "even") : "tile-border-top" + (x % 2 == 1 ? "1" : "2") : realY == gridCellHeight - 1 ? maskTileName = 0 == x ? "tile-corner-bottom-left-" + (gridCellHeight % 2 == 1 ? "odd" : "even") : x == gridCellWidth - 1 ? "tile-corner-bottom-right-" + ((gridCellWidth + gridCellHeight) % 2 == 1 ? "odd" : "even") : "tile-border-bottom" + ((x + gridCellHeight) % 2 == 1 ? "1" : "2") : 0 == x ? maskTileName = "tile-border-left" + (realY % 2 == 1 ? "1" : "2") : x == gridCellWidth - 1 ? maskTileName = "tile-border-right" + ((realY + gridCellWidth) % 2 == 1 ? "1" : "2") : (x + realY) % 2 == 1 && (maskTileName = "tile-inner2");
        return maskTileName;
      },
      initControlMaskTile(maskTile) {
        let posDiff;
        _G.utilsUI.singleTouchSet(maskTile, pos => {
          posDiff = _.getGlobalPosition(maskTile).sub(pos);
        }, pos => {
          _.setGlobalPos(maskTile, pos.add(posDiff));
        }, pos => {});
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
      init() {
        cc.find("Canvas/nag_screen").zIndex = 999;
      },
      showNagScreen(timeout) {
        cc.find("Canvas/nag_screen").active = true;
        timeout && _.setTimeout(() => this.hideNagScreen(), 1e3 * timeout);
      },
      hideNagScreen() {
        cc.find("Canvas/nag_screen").active = false;
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
    exports.gameFlow = {};
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
    const project_init_comp_1 = require("../system/project_init_comp");
    exports.resources = {
      futuraBoldFont: null,
      futuraMedFont: null,
      planeSlotFrames: [],
      planeTrackFrames: [],
      init() {
        const projectComp = cc.find("Canvas").getComponent(project_init_comp_1.default);
        this.futuraBoldFont = projectComp.futuraBoldFont;
        this.futuraMedFont = projectComp.futuraMedFont;
      },
      getMaskTileTextureByName: tileName => cc.find(`Canvas/sprite_frames_store/${tileName}`).getComponent(cc.Sprite).spriteFrame
    };
    cc._RF.pop();
  }, {
    "../system/all_modules": "all_modules",
    "../system/project_init_comp": "project_init_comp"
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
        return hours + ":" + mins + ":" + secs;
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
}, {}, [ "alpha_mask", "core_game", "game_flow", "core_fx", "core_ui", "user_model", "settings_view", "audio", "free_button_comp", "scrollview_row_comp", "utils_anim_fx", "utils_common", "utils_data", "utils_time", "utils_ui", "all_modules", "anim_event_comp", "app_events", "config_anim_fx", "en_US", "es_ES", "localize", "login", "project_init_comp", "resources_manager", "system_types" ]);