window.__require=function t(e,n,i){function o(a,l){if(!n[a]){if(!e[a]){var c=a.split("/");if(c=c[c.length-1],!e[c]){var s="function"==typeof __require&&__require;if(!l&&s)return s(c,!0);if(r)return r(c,!0);throw new Error("Cannot find module '"+a+"'")}a=c}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){return o(e[a][1][t]||t)},u,u.exports,t,e,n,i)}return n[a].exports}for(var r="function"==typeof __require&&__require,a=0;a<i.length;a++)o(i[a]);return o}({all_modules:[function(t,e,n){"use strict";cc._RF.push(e,"729f19Hu2ZJ9ZSyZWzvBjRv","all_modules");var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),o=this&&this.__exportStar||function(t,e){for(var n in t)"default"===n||Object.prototype.hasOwnProperty.call(e,n)||i(e,t,n)};Object.defineProperty(n,"__esModule",{value:!0}),o(t("../services/utils/utils_common"),n),o(t("../services/utils/utils_data"),n),o(t("../services/utils/utils_ui"),n),o(t("../services/utils/utils_anim_fx"),n),o(t("../services/audio/audio"),n),o(t("../core-game/graphic_lib"),n),o(t("../core-game/core_game"),n),o(t("../core-game/recorder"),n),o(t("../core-game/slow_render"),n),cc._RF.pop()},{"../core-game/core_game":"core_game","../core-game/graphic_lib":"graphic_lib","../core-game/recorder":"recorder","../core-game/slow_render":"slow_render","../services/audio/audio":"audio","../services/utils/utils_anim_fx":"utils_anim_fx","../services/utils/utils_common":"utils_common","../services/utils/utils_data":"utils_data","../services/utils/utils_ui":"utils_ui"}],anim_event_comp:[function(t,e,n){"use strict";cc._RF.push(e,"1bc47EZZkFF8rbV7uAlH4ia","anim_event_comp");var i,o=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__decorate||function(t,e,n,i){var o,r=arguments.length,a=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(a=(r<3?o(a):r>3?o(e,n,a):o(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a};Object.defineProperty(n,"__esModule",{value:!0});var a=t("../system/all_modules"),l=(a._,cc._decorator),c=l.ccclass,s=(l.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.playFXLevelUp=function(){a.planeUnlock.playFXLevelUp()},e.prototype.playFXCelebrate=function(){a.planeUnlock.playFXCelebrate()},e.prototype.playFxUFOSucksCoinsUp=function(){a.ufoView.playFxCoinCollect()},r([c],e)}(cc.Component));n.default=s,cc._RF.pop()},{"../system/all_modules":"all_modules"}],app_events:[function(t,e,n){"use strict";cc._RF.push(e,"60644pxp1FMi6RfOJSUGIf5","app_events"),Object.defineProperty(n,"__esModule",{value:!0}),n.appEvents=void 0,t("../system/all_modules")._,n.appEvents={isAppHidden:!1,onAppShowCallbackArr:[],onAppHideCallbackArr:[],onAppShow:function(){this.isAppHidden=!1,this.onAppShowCallbackArr.map(function(t){return t()})},addAppShowCallback:function(t){this.onAppShowCallbackArr.push(t)},onAppHide:function(){this.isAppHidden=!0,this.onAppHideCallbackArr.map(function(t){return t()})},addAppHideCallback:function(t){this.onAppHideCallbackArr.push(t)}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],audio:[function(t,e,n){"use strict";cc._RF.push(e,"272e5CwR4dAUYlvs84u9gnx","audio"),Object.defineProperty(n,"__esModule",{value:!0}),n.audio=void 0;var i=t("../../system/all_modules")._;n.audio={audioList:{},playingIdList:{},isSoundOff:!0,isMusicOff:!0,init:function(){this.loadAudioFiles()},loadAudioFiles:function(){var t=this;cc.resources.loadDir("audios",cc.AudioClip,function(e,n){if(e)return i.log(e);for(var o=0,r=n;o<r.length;o++){var a=r[o];t.audioList[a.name]=a}})},playSound:function(t,e){if(void 0===e&&(e=1),!this.isSoundOff&&this.audioList[t])try{this.playingIdList[t]=cc.audioEngine.play(this.audioList[t],!1,e)}catch(n){}},stopSound:function(t){this.playingIdList[t]&&cc.audioEngine.stopEffect(this.playingIdList[t])},playBgMusic:function(t){if(void 0===t&&(t=1),!this.isMusicOff&&!cc.audioEngine.isMusicPlaying())try{this.playingIdList.bg_music=cc.audioEngine.playMusic(this.audioList.bg_music,!0),cc.audioEngine.setMusicVolume(t)}catch(e){i.log("playMusic err ",e)}},stopBgMusic:function(){cc.audioEngine.isMusicPlaying()&&cc.audioEngine.stopMusic()},playSoundClickButton:function(){this.isSoundOff||this.playSound("button_click",1)}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}],"ball-collision-comp":[function(t,e,n){"use strict";cc._RF.push(e,"a3359GqaOFPd6nxtcLB8UbP","ball-collision-comp");var i,o=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__decorate||function(t,e,n,i){var o,r=arguments.length,a=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(a=(r<3?o(a):r>3?o(e,n,a):o(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a};Object.defineProperty(n,"__esModule",{value:!0});var a=t("../system/all_modules"),l=(a._,cc._decorator),c=l.ccclass,s=(l.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.onBeginContact=function(){a.audio.playSound("button_click")},r([c],e)}(cc.Component));n.default=s,cc._RF.pop()},{"../system/all_modules":"all_modules"}],config_anim_fx:[function(t,e,n){"use strict";cc._RF.push(e,"c32cdMd/oBASIHmkQeG3U5M","config_anim_fx"),Object.defineProperty(n,"__esModule",{value:!0}),n.configAnimFx=void 0,t("../../system/all_modules")._,n.configAnimFx={defaultParticleFlyA2BConfigs:{numberOfNode:15,delayStartTime:.02,flyDuration:.6,randomBezierPointRange:{x:300,y:300}},questKeysFlyA2BConfigs:{numberOfNode:8,delayStartTime:.05,flyDuration:.6,randomBezierPointRange:{x:100,y:50}}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}],core_game_alternative:[function(t,e,n){"use strict";cc._RF.push(e,"6c5682yCZtLS6iQzHL8IZjH","core_game_alternative"),Object.defineProperty(n,"__esModule",{value:!0}),n.coreGameAlternative=void 0;var i=t("../system/all_modules"),o=i._,r=["#0D0664","#F301F0","#3E0E50","#620B09","#B96426","#CBAD29","#3F8E28"],a=cc.v2(0,-15);o.floor(48),n.coreGameAlternative={physicsManager:null,graphicComp:null,intervalVar:null,mainBall:null,ballRigidBodyComp:null,boundaryContainer:null,maxScale:0,updateCount:0,currentScale:1,currentScaleStep:0,currentColorIndex:4,currentColor:null,nextColor:null,lastBallPos:null,init:function(){var t=this;cc.game.config.frameRate=60,this.physicsManager=cc.director.getPhysicsManager(),this.boundaryContainer=cc.find("Canvas/world/physics-colliders"),this.graphicComp=cc.find("Canvas/world/draw-area").getComponent(cc.Graphics),this.mainBall=cc.find("Canvas/world/physical-ball"),this.ballRigidBodyComp=this.mainBall.getComponent(cc.RigidBody),this.mainBall.active=!1,this.boundaryContainer.children.map(function(t){return t.active=!1}),r.map(function(e,n){return r[n]=t.getLighterColor(e)}),this.bindButtons(),this.startAnim()},startAnim:function(){var t=this;this.physicsManager.enabled=!0,this.physicsManager.gravity=a,this.mainBall.active=!0,this.boundaryContainer.children.map(function(t){return t.active=!0}),this.intervalVar=o.setInterval(function(){return t.updateAnim()}),this.maxScale=.99*this.boundaryContainer.width/this.mainBall.width,this.currentScaleStep=.02/60,this.currentScale=1,this.currentColor=this.getNextColor(),this.nextColor=this.getNextColor(),this.lastBallPos=this.mainBall.position.clone(),o.setTimeout(function(){t.ballRigidBodyComp.applyLinearImpulse(cc.v2(0,-1e3),cc.Vec2.ZERO,!0)}),o.setInterval(function(){t.ballRigidBodyComp.applyAngularImpulse(2e3,!0)},100)},updateAnim:function(t,e){if(this.currentScale>this.maxScale)return this.pauseAnim();i.recorder.saveBallState(this.mainBall.position,this.mainBall.scale),e&&this.mainBall.setPosition(e),t||this.updateBallScale()},updateBallScale:function(){this.mainBall.scale=this.currentScale,this.currentScale+=this.currentScaleStep,this.currentScaleStep+=182e-6/60,this.currentScale>.3*this.maxScale&&(this.currentScaleStep+=182e-6/60*100),this.currentScale>.6*this.maxScale&&(this.currentScaleStep+=91e-5),this.currentScale>.8*this.maxScale&&(this.currentScaleStep+=182e-6/60*1600)},pauseAnim:function(){this.physicsManager.enabled=!1,this.mainBall.active=!1,cc.find("Canvas/world/final-black-ball").active=!0,o.clearInterval(this.intervalVar)},resumeAnim:function(){this.physicsManager.enabled=!0,this.mainBall.active=!0,cc.find("Canvas/world/final-black-ball").active=!1,o.clearInterval(this.intervalVar)},bindButtons:function(){var t=this;i.utilsUI.makeButton("Canvas/btn_start",function(){t.startAnim()}),i.utilsUI.makeButton("Canvas/btn_stop",function(){t.pauseAnim(),cc.find("Canvas/world/final-black-ball").active=!1}),i.utilsUI.makeButton("Canvas/btn_resume",function(){t.resumeAnim()})},drawCircle:function(t,e){var n=t.mag()/(this.mainBall.width*(this.maxScale-this.mainBall.scale)/2);n>1&&t.mulSelf(1/n);var o=this.mainBall.width*this.mainBall.scale/2-4.4;i.graphicLib.drawCircle(this.graphicComp,t.x,t.y,o,6.4,cc.Color.BLACK);var r=this.mainBall.width*this.mainBall.scale/2;i.graphicLib.drawCircle(this.graphicComp,t.x,t.y,r,2,e)},getNextColor:function(){return this.currentColorIndex>=r.length&&(this.currentColorIndex=0),r[this.currentColorIndex++]},getMiddleColor:function(t,e,n){var i=cc.color(t),o=cc.color(e);return cc.color(i.r+(o.r-i.r)*n,i.g+(o.g-i.g)*n,i.b+(o.b-i.b)*n)},getLighterColor:function(t){return this.getMiddleColor(t,cc.Color.WHITE,.2)}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],core_game:[function(t,e,n){"use strict";cc._RF.push(e,"d18c9K5CotOQ5HAybABZAy2","core_game"),Object.defineProperty(n,"__esModule",{value:!0}),n.coreGame=void 0;var i=t("../system/all_modules"),o=i._,r=["#0D0664","#F301F0","#3E0E50","#620B09","#B96426","#CBAD29","#3F8E28"],a=cc.v2(0,-15),l=o.floor(48);n.coreGame={physicsManager:null,graphicComp:null,intervalVar:null,timerIntervalVar:null,mainBall:null,renderNode:null,ballRigidBodyComp:null,boundaryContainer:null,maxScale:0,updateCount:0,currentScale:1,currentScaleStep:0,currentColorIndex:4,currentColor:null,nextColor:null,lastBallPos:null,init:function(){var t=this;cc.game.config.frameRate=60,this.physicsManager=cc.director.getPhysicsManager(),this.boundaryContainer=cc.find("Canvas/world/physics-colliders"),this.graphicComp=cc.find("Canvas/world/draw-area").getComponent(cc.Graphics),this.mainBall=cc.find("Canvas/world/physical-ball"),this.ballRigidBodyComp=this.mainBall.getComponent(cc.RigidBody),this.mainBall.active=!1,this.boundaryContainer.children.map(function(t){return t.active=!1}),this.renderNode=cc.find("Canvas/world/draw-area");var e=this.boundaryContainer.getBoundingBox();this.renderNode.width=e.width,this.renderNode.height=e.height,r.map(function(e,n){return r[n]=t.getLighterColor(e)}),this.bindButtons();var n=performance.now();this.timerIntervalVar=o.setInterval(function(){cc.find("Canvas/label_timer").getComponent(cc.Label).string=o.formatTime(o.floor((performance.now()-n)/1e3))},1e3),this.startAnim()},startAnim:function(){var t=this;this.physicsManager.enabled=!0,this.physicsManager.gravity=a,this.mainBall.active=!0,this.boundaryContainer.children.map(function(t){return t.active=!0}),this.intervalVar=o.setInterval(function(){return t.updateAnim()}),this.maxScale=.99*this.boundaryContainer.getBoundingBox().width/this.mainBall.width,this.currentScaleStep=.01/60,this.currentScale=1,this.currentColor=this.getNextColor(),this.nextColor=this.getNextColor(),this.lastBallPos=this.mainBall.position.clone(),o.setTimeout(function(){t.ballRigidBodyComp.applyLinearImpulse(cc.v2(0,-1e3),cc.Vec2.ZERO,!0)}),o.setInterval(function(){t.ballRigidBodyComp.applyAngularImpulse(2e3,!0)},100),o.setInterval(function(){t.releaseGraphicCache()},200)},releaseGraphicCache:function(){var t=cc.find("Canvas/world/draw-area"),e=cc.find("Canvas/RenderCamera").getComponent(cc.Camera),n=i.graphicLib.screenShot(t,e);cc.find("Canvas/world/render_stage/render-node").getComponent(cc.Sprite).spriteFrame=n,this.graphicComp.clear()},updateAnim:function(t,e){if(this.currentScale>this.maxScale)return this.pauseAnim();this.updateCount++,this.updateCount%l==0&&(this.currentColor=this.nextColor,this.nextColor=this.getNextColor(),this.updateCount=0);var n=this.getMiddleColor(this.currentColor,this.nextColor,this.updateCount/l);e&&this.mainBall.setPosition(e);var i=this.mainBall.position.sub(this.lastBallPos),o=i.normalize(),r=i.mag()/2.2;if(r>1)for(var a=0;a<r;a++)this.lastBallPos.addSelf(o.mul(2.2)),this.drawCircle(this.lastBallPos,n);this.drawCircle(this.mainBall.position,n),this.lastBallPos=this.mainBall.position.clone(),t||this.updateBallScale()},updateBallScale:function(){this.mainBall.scale=this.currentScale,this.currentScale+=this.currentScaleStep,this.currentScaleStep+=7e-7,this.currentScale>.3*this.maxScale&&(this.currentScaleStep+=7e-5),this.currentScale>.6*this.maxScale&&(this.currentScaleStep+=300*7e-7),this.currentScale>.8*this.maxScale&&(this.currentScaleStep+=.00112)},pauseAnim:function(){this.physicsManager.enabled=!1,this.mainBall.active=!1,cc.find("Canvas/world/final-black-ball").active=!0,o.clearInterval(this.intervalVar),o.clearInterval(this.timerIntervalVar)},resumeAnim:function(){this.physicsManager.enabled=!0,this.mainBall.active=!0,cc.find("Canvas/world/final-black-ball").active=!1,o.clearInterval(this.intervalVar)},bindButtons:function(){var t=this;i.utilsUI.makeButton("Canvas/btn_start",function(){t.startAnim()}),i.utilsUI.makeButton("Canvas/btn_stop",function(){t.pauseAnim(),cc.find("Canvas/world/final-black-ball").active=!1}),i.utilsUI.makeButton("Canvas/btn_resume",function(){t.resumeAnim()})},drawCircle:function(t,e){var n=t.mag()/(this.mainBall.width*(this.maxScale-this.mainBall.scale)/2);n>1&&t.mulSelf(1/n);var o=this.mainBall.width*this.mainBall.scale/2-4.4;i.graphicLib.drawCircle(this.graphicComp,t.x,t.y,o,6.7,cc.Color.BLACK);var r=this.mainBall.width*this.mainBall.scale/2;i.graphicLib.drawCircle(this.graphicComp,t.x,t.y,r,2.3,e)},getNextColor:function(){return this.currentColorIndex>=r.length&&(this.currentColorIndex=0),r[this.currentColorIndex++]},getMiddleColor:function(t,e,n){var i=cc.color(t),o=cc.color(e);return cc.color(i.r+(o.r-i.r)*n,i.g+(o.g-i.g)*n,i.b+(o.b-i.b)*n)},getLighterColor:function(t){return this.getMiddleColor(t,cc.Color.WHITE,.2)}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],free_button_comp:[function(t,e,n){"use strict";cc._RF.push(e,"64398ru1J5Fi4AdS3n3ocH+","free_button_comp");var i,o=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__decorate||function(t,e,n,i){var o,r=arguments.length,a=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(a=(r<3?o(a):r>3?o(e,n,a):o(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a};Object.defineProperty(n,"__esModule",{value:!0}),t("../../system/all_modules")._;var a=cc._decorator,l=a.ccclass,c=(a.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.freeHandler=function(t){t.target.freeButtonHandlerFunc&&t.target.freeButtonHandlerFunc(t.target)},r([l],e)}(cc.Component));n.default=c,cc._RF.pop()},{"../../system/all_modules":"all_modules"}],graphic_lib:[function(t,e,n){"use strict";cc._RF.push(e,"36d2c9WBElAd7dhY4oxoUwP","graphic_lib"),Object.defineProperty(n,"__esModule",{value:!0}),n.graphicLib=void 0,t("../system/all_modules")._,n.graphicLib={init:function(){},drawCircle:function(t,e,n,i,o,r,a){t.circle(e,n,i),t.lineWidth=o,t.strokeColor=r||cc.Color.BLACK,t.stroke(),a&&(t.fillColor=a,t.fill())},pixelArrToSpriteFrame:function(t,e,n){var i=new cc.Texture2D;return i.setFlipY(!0),i.setPremultiplyAlpha(!0),i.initWithData(t,cc.Texture2D.PixelFormat.RGBA8888,e,n),new cc.SpriteFrame(i)},screenShot:function(t,e,n){var i=t.getBoundingBoxToWorld(),o=null;o||(o=new cc.RenderTexture).initWithSize(i.width,i.height),e.orthoSize=i.width/2,e.targetTexture=o,e.render(n);var r=o.readPixels();return this.pixelArrToSpriteFrame(r,i.width,i.height)}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],project_init_comp:[function(t,e,n){"use strict";cc._RF.push(e,"627802AmqJKc6KbJDmiTk8k","project_init_comp");var i,o=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__decorate||function(t,e,n,i){var o,r=arguments.length,a=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(a=(r<3?o(a):r>3?o(e,n,a):o(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a};Object.defineProperty(n,"__esModule",{value:!0});var a=t("../system/all_modules"),l=(a._,cc._decorator),c=l.ccclass,s=(l.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.start=function(){window._G=a},e.prototype.onLoad=function(){for(var t in cc.director.getCollisionManager().enabled=!0,a)a[t].init&&a[t].init()},r([c],e)}(cc.Component));n.default=s,cc._RF.pop()},{"../system/all_modules":"all_modules"}],recorder:[function(t,e,n){"use strict";cc._RF.push(e,"5cba4Wss0hJwbUTmU73FhWl","recorder"),Object.defineProperty(n,"__esModule",{value:!0}),n.recorder=void 0;var i=t("../system/all_modules"),o=i._;n.recorder={ballStateArr:[],intervalVar:null,replayBall:null,currentBallStateIndex:0,init:function(){this.replayBall=cc.find("Canvas/world/replay-ball"),this.bindButtons()},saveBallState:function(t,e){this.ballStateArr.push({pos:t,scale:e})},replayBallMovement:function(){var t=this;this.currentBallStateIndex=0,this.replayBall.active=!0,this.intervalVar=o.setInterval(function(){var e=t.ballStateArr[t.currentBallStateIndex];if(!e)return o.clearInterval(t.intervalVar);t.replayBall.setPosition(e.pos),t.replayBall.scale=e.scale,t.currentBallStateIndex++})},bindButtons:function(){var t=this;i.utilsUI.makeButton("Canvas/btn_replay",function(){return t.replayBallMovement()})}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],slow_render:[function(t,e,n){"use strict";cc._RF.push(e,"1d8a4aHq2ZBzYoTNtvKMQyz","slow_render"),Object.defineProperty(n,"__esModule",{value:!0}),n.slowRender=void 0;var i=t("../system/all_modules"),o=i._,r=["#0D0664","#F301F0","#3E0E50","#620B09","#B96426","#CBAD29","#3F8E28"],a=o.floor(48);n.slowRender={graphicComp:null,ballInfo:{width:0,height:0},updateCount:0,currentColorIndex:4,currentColor:null,nextColor:null,lastBallPos:null,init:function(){var t=this;this.graphicComp=cc.find("Canvas/world/draw-area").getComponent(cc.Graphics),this.ballInfo.width=i.recorder.replayBall.width,r.map(function(e,n){return r[n]=t.getLighterColor(e)}),this.bindButtons()},render:function(){var t=this;o.log("slowRender started !!!!!!");var e=i.recorder.ballStateArr;this.lastBallPos=e[0].pos,this.currentColor=this.getNextColor(),this.nextColor=this.getNextColor(),e.map(function(n,r){o.setTimeout(function(){if(t.renderStep(n),r==e.length-1){var o=cc.find("Canvas/world/draw-area"),a=cc.find("Canvas/RenderCamera").getComponent(cc.Camera),l=i.graphicLib.screenShot(o,a);return cc.find("Canvas/world/render_stage/render-node").getComponent(cc.Sprite).spriteFrame=l,void i.coreGameAlternative.graphicComp.clear()}},20*r)})},renderStep:function(t){this.updateCount++,this.updateCount%a==0&&(this.currentColor=this.nextColor,this.nextColor=this.getNextColor(),this.updateCount=0);var e=this.getMiddleColor(this.currentColor,this.nextColor,this.updateCount/a),n=t.pos.sub(this.lastBallPos),i=n.normalize(),o=n.mag()/2.2;if(o>1)for(var r=0;r<o;r++)this.lastBallPos.addSelf(i.mul(2.2)),this.drawCircle(this.lastBallPos,e,t.scale);this.drawCircle(t.pos,e,t.scale),this.lastBallPos=t.pos.clone()},bindButtons:function(){var t=this;i.utilsUI.makeButton("Canvas/btn_slow_render",function(){return t.render()})},drawCircle:function(t,e,n){var o=this.ballInfo.width*n/2-4.4;i.graphicLib.drawCircle(this.graphicComp,t.x,t.y,o,6.4,cc.Color.BLACK);var r=this.ballInfo.width*n/2;i.graphicLib.drawCircle(this.graphicComp,t.x,t.y,r,2,e)},getNextColor:function(){return this.currentColorIndex>=r.length&&(this.currentColorIndex=0),r[this.currentColorIndex++]},getMiddleColor:function(t,e,n){var i=cc.color(t),o=cc.color(e);return cc.color(i.r+(o.r-i.r)*n,i.g+(o.g-i.g)*n,i.b+(o.b-i.b)*n)},getLighterColor:function(t){return this.getMiddleColor(t,cc.Color.WHITE,.2)}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],system_types:[function(t,e,n){"use strict";cc._RF.push(e,"9a378sc4D1PKauhxf7mEMi/","system_types"),Object.defineProperty(n,"__esModule",{value:!0}),n.AchievementEntry=n.achievementTask=n.achievementReward=n.QuestEntry=n.chestReward=n.questReward=n.questTask=n.rewardDaily=void 0;var i=t("./all_modules")._;(function(t){t.Cash="Cash",t.CashTime="CashTime",t.Gem="Gem",t.SpeedUp="SpeedUp",t.Plane="Plane"})(n.rewardDaily||(n.rewardDaily={})),function(t){t.Login="Login",t.MergePlane="MergePlane",t.WatchVideo="WatchVideo",t.InviteFriends="InviteFriends",t.SpeedUp="SpeedUp"}(n.questTask||(n.questTask={})),function(t){t.Cash="Cash",t.Gem="Gem",t.CashTime="CashTime"}(n.questReward||(n.questReward={})),function(t){t.Cash="Cash",t.Gem="Gem",t.Plane="Plane",t.CashTime="CashTime"}(n.chestReward||(n.chestReward={}));n.QuestEntry=function(t){this.uuid=i.getNewUuid(),Object.assign(this,t)},(n.achievementReward||(n.achievementReward={})).Gem="Gem",(n.achievementTask||(n.achievementTask={})).MergePlane="MergePlane";n.AchievementEntry=function(t){this.uuid=i.getNewUuid(),Object.assign(this,t)},cc._RF.pop()},{"./all_modules":"all_modules"}],utils_anim_fx:[function(t,e,n){"use strict";cc._RF.push(e,"25b45wNZcZF7Jc+YiGRe0VU","utils_anim_fx");var i=this&&this.__spreadArrays||function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var i=Array(t),o=0;for(e=0;e<n;e++)for(var r=arguments[e],a=0,l=r.length;a<l;a++,o++)i[o]=r[a];return i};Object.defineProperty(n,"__esModule",{value:!0}),n.utilsAnimFx=void 0;var o=t("../../system/all_modules"),r=o._;n.utilsAnimFx={fxNodePool:{},init:function(){},replayParticle:function(t){t&&t.getComponent(cc.ParticleSystem)&&(t.active=!0,t.getComponent(cc.ParticleSystem).resetSystem())},playNodeAnim:function(t,e,n,i,o){void 0===i&&(i=!1);var r=t.getComponent(cc.Animation);if(t.activeInHierarchy&&r&&(e=e||(r.defaultClip?r.defaultClip.name:""))){var a=r[i?"playAdditive":"play"](e);if(a)return a.repeatCount=(-1==n?1/0:n)||1,o&&r.on("finished",function(){r.off("finished"),o()}),a}},playNodeAnimAsSoonAsNodeActive:function(t,e,n,i){var o=this;void 0===n&&(n=1),void 0===i&&(i=!0);var a="waitInterval2PlayAnimWhenActive";t[a]=r.waitToRun(function(){t[a]&&clearInterval(t[a]),o.playNodeAnim(t,e,n,i)},"activeInHierarchy",t)},playNodeAnimArr:function(t,e,n,o){var r=this;if(void 0===n&&(n=!1),t.activeInHierarchy){var a=t.getComponent(cc.Animation);if(t.activeInHierarchy&&a){var l=i(e);a.on("finished",function(){l.length?r.playNodeAnim(t,l.shift(),1,n):(a.off("finished"),o&&o())}),this.playNodeAnim(t,l.shift(),1,n)}}},stopAllNodeAnims:function(t){var e=t.getComponent(cc.Animation);e&&(e.stop(),e.off("finished"))},stopAnimAtFrame0:function(t){var e=this,n=t.getComponent(cc.Animation);n.play("ufo_ring_fx"),r.setTimeout(function(){n.setCurrentTime(0),e.stopAllNodeAnims(t)})},playIncreasingNumberLabel:function(t,e,n,i,o,a,l){void 0===i&&(i=5),void 0===o&&(o=.5),void 0===a&&(a=0),void 0===l&&(l="xxx");var c=t.getComponent(cc.Label),s=n/i,u=o/i;cc.tween(t).delay(a).repeat(i,cc.tween().call(function(){e+=s;var t=r.formatMoney(r.round(e));c.string=l.replace(/xxx/g,t)}).delay(u)).start()},getNewFxNode:function(t,e){t.nodePoolId||(t.nodePoolId=r.getNewUuid()),this.fxNodePool[t.nodePoolId]||(this.fxNodePool[t.nodePoolId]=[]);var n=this.fxNodePool[t.nodePoolId].pop()||r.copyNode(t);return n.nodePoolId=t.nodePoolId,n.parent=e||o.coreFX.fxContainer,n},saveFxNodeToPool:function(t){t.stopAllActions(),t.active=!1,this.fxNodePool[t.nodePoolId].unshift(t)},particlesFlyFromA2B:function(t,e,n,i,a){for(var l=this,c=i||o.configAnimFx.defaultParticleFlyA2BConfigs,s=c.numberOfNode,u=c.flyDuration,d=c.delayStartTime,p=c.randomBezierPointRange,h=r.getGlobalPosDiff(e,n),f=function(n){var i=m.getNewFxNode(t,a);i.active=!0,r.setGlobalPosToNode(i,e);var o=m.getRandomPointInRage(p),c=m.getRandomPointInRage(p);cc.tween(i).delay(n*d).bezierBy(u,o,c,h).call(function(){l.saveFxNodeToPool(i)}).start()},m=this,_=0;_<s;_++)f(_)},getRandomPointInRage:function(t){return cc.v2(r.randomNumber(2*t.x)-t.x,r.randomNumber(2*t.y)-t.y)},nodeFlyFromAtoB:function(t,e,n,i){void 0===n&&(n=.3);var o=r.getGlobalPosDiff(t,e);cc.tween(t).by(n,{position:o}).call(function(){return i&&i()}).start()}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}],utils_common:[function(t,e,n){"use strict";cc._RF.push(e,"7c6a38LFRNHfqlBBkLI3s1j","utils_common");var i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};Object.defineProperty(n,"__esModule",{value:!0}),n._=void 0;var o=1e5,r=t("./utils_time");n._=i(i({NO_CONSOLE_LOG:!1,isANDROID:cc.sys.os==cc.sys.OS_ANDROID,isIOS:cc.sys.os==cc.sys.OS_IOS,max:Math.max,min:Math.min,round:Math.round,floor:Math.floor,ceil:Math.ceil,sign:Math.sign,abs:Math.abs,pow:Math.pow,random:Math.random,sqrt:Math.sqrt,sin:Math.sin,cos:Math.cos,tan:Math.tan,atan:Math.atan,atan2:Math.atan2,log10:Math.log10,PI:Math.PI,setInRange:function(t,e,i){return n._.max(n._.min(t,e),i)},randomArrItem:function(t,e){void 0===e&&(e=!1);var n=Math.floor(Math.random()*t.length);return e?t.splice(n,1)[0]:t[n]},isString:function(t){return"string"==typeof t},isFunction:function(t){return t&&"[object Function]"==={}.toString.call(t)},log:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(!this.NO_CONSOLE_LOG)try{console.log.apply(console,t)}catch(n){}},trimStr:function(t,e,n){return void 0===n&&(n=""),t.length<=e?t:t.substring(0,e)+n},getNewUuid:function(){return o++},removeArrayItem:function(t,e){var n=t.indexOf(e);-1!=n&&t.splice(n,1)},addUniqueElemToArr:function(t,e){t.includes(e)||t.push(e)},randomNumber:function(t){return n._.floor(n._.random()*t)},getGlobalPosition:function(t){return t.convertToWorldSpaceAR(cc.Vec2.ZERO)},getGlobalPosDiff:function(t,e){return this.getGlobalPosition(e).sub(this.getGlobalPosition(t))},setGlobalPosToNode:function(t,e){var n=this.getGlobalPosition(e),i=t.parent.convertToNodeSpaceAR(n);t.setPosition(i)},setGlobalPos:function(t,e){var n=t.parent.convertToNodeSpaceAR(e);t.setPosition(n)},moveToNewParentKeepPosition:function(t,e){var n=e.convertToNodeSpaceAR(this.getGlobalPosition(t));t.parent=e,t.setPosition(n)},isGlobalOverlapping:function(t,e){return cc.Intersection.rectRect(t.getBoundingBoxToWorld(),e.getBoundingBoxToWorld())},copyNode:function(t,e){var n=cc.instantiate(t);return e&&(n.parent=e),n},getNodePath:function(t){for(var e=[t.name],n=t.parent,i=0;n&&i++<50&&n.parent;)e.push(n.name),n=n.parent;return e.reverse().join("/")}},r.default),{radianToDegrees:function(t){return 180*t/Math.PI},degreesToRadian:function(t){return t*Math.PI/180},formatTime:function(t){var e=n._.floor(t/3600),i=n._.floor(t%3600/60),o=t%3600%60;return e<10&&(e="0"+e),i<10&&(i="0"+i),o<10&&(o="0"+o),("00"==e?"":e+":")+i+":"+o},formatMoney:function(t){var e=n._.floor(Math.log10(t))+1;if(e<=6)return t.toLocaleString();var i,o=n._.floor((e-1)/3);return i=o-2<=3?["K","M","B","T"][o-2]:String.fromCharCode((o-6)/26+"a".charCodeAt(0))+String.fromCharCode((o-6)%26+"a".charCodeAt(0)),n._.round(t/n._.pow(10,3*(o-1))).toLocaleString()+i},paddNumberToFitDigitLength:function(t,e){var n=""+t,i=e-n.length;return i<=0?t:"0".repeat(i)+n}}),cc._RF.pop()},{"./utils_time":"utils_time"}],utils_data:[function(t,e,n){"use strict";cc._RF.push(e,"769b1HrFnpEkJKKpSJ/BVzB","utils_data"),Object.defineProperty(n,"__esModule",{value:!0}),n.utilsData=void 0,t("../../system/all_modules")._,n.utilsData={save:function(t,e){if(window.FBInstant)FBInstant.player.setDataAsync(t).then(function(){e&&e()},function(t){return console.warn(" utils_data >> save >> failed ",t)}).catch(function(t){return console.warn(" utils_data >> save >> failed (catch) ",t)});else{for(var n in t)localStorage.setItem(n,JSON.stringify(t[n]));setTimeout(function(){e&&e()},300)}},load:function(t,e){if(window.FBInstant)FBInstant.player.getDataAsync(t).then(function(t){e&&e(t)});else{var n={};t.map(function(t){if(null!==localStorage.getItem(t))try{n[t]=JSON.parse(localStorage.getItem(t))}catch(e){console.warn(" utilsData.load() >> Error  data key = "+t+" ",e)}}),e&&setTimeout(function(){return e(n)},100)}},getEntryPointData:function(){return window.FBInstant&&FBInstant.getEntryPointData()||{}}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}],utils_time:[function(t,e,n){"use strict";cc._RF.push(e,"233be6H/0VKNYjn2mjsWkCF","utils_time"),Object.defineProperty(n,"__esModule",{value:!0}),t("../../system/all_modules")._;var i=1e5;n.default={getMsPassedUTC:function(){return(new Date).getTime()},getMsPassedPT:function(){var t=this.getPacificTimeOffset();return this.getMsPassedUTC()+36e5*t},getTimePT:function(t){void 0===t&&(t=new Date);var e=this.getPacificTimeOffset(t),n=t.getHours()+t.getTimezoneOffset()/60;return t.setHours(n+e),t},isSameDate:function(t,e){return t.getFullYear()==e.getFullYear()&&t.getMonth()==e.getMonth()&&t.getDate()==e.getDate()},getTotalMsToMidnightPT:function(){return 864e5-this.getMsPassedPT()%864e5},getDSTStartEndDate:function(t){var e=(t||new Date).getFullYear(),n=new Date(e,2,1),i=(7-n.getDay())%7,o=n.getDate()+i+7,r=new Date(e,2,o),a=new Date(e,10,1),l=(7-a.getDay())%7,c=a.getDate()+l;return[r,new Date(e,10,c)]},getPacificTimeOffset:function(t){var e=t||new Date,n=this.getDSTStartEndDate(),i=n[0],o=n[1];return e>i&&e<o?-7:-8},getMonthName:function(t){return["January","February","March","April","May","June","July","August","September","October","November","December"][(t=t||new Date).getMonth()]},setTimeout:function(t,e){void 0===e&&(e=0);var n={_id:i++,__instanceId:i,callback:null};return n.callback=function(){t(n)},cc.director.getScheduler().schedule(n.callback,n,e/1e3,0,0,!1),n},clearTimeout:function(t){t&&t._id&&t.callback&&cc.director.getScheduler().unschedule(t.callback,t)},setInterval:function(t,e){void 0===e&&(e=0);var n={_id:i++,__instanceId:i,callback:null};return n.callback=function(){t(n)},cc.director.getScheduler().schedule(n.callback,n,e/1e3,cc.macro.REPEAT_FOREVER,0,!1),n},clearInterval:function(t){t&&t._id&&t.callback&&cc.director.getScheduler().unschedule(t.callback,t)},secondsToTimeCountdown:function(t){if(void 0===t&&(t=0),t<=0)return"00:00";var e=Math.floor(t/86400),n=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),o=t%60;if(e>2)return e+" days";if(1==e)return"1 day";var r="";return n>=10?r=n+":":n>0&&(r="0"+n+":"),(r+=i>=10?i+":":"0"+i+":")+(o>=10?o:"0"+o)},waitToRun:function(t,e,n,i,o,r){void 0===n&&(n=window),void 0===i&&(i=.1);var a=!1,l=e.startsWith("!"),c=e.endsWith("()");e=e.replace("!","").replace("()","");var s=c?function(){return n[e]()}:null,u=setInterval(function(){if(l){if(c){if(s())return}else if(n[e])return}else if(c){if(!s())return}else if(!n[e])return;clearInterval(u),a=!0,t(n[e])},1e3*i);return o&&this.setTimeout(function(){clearInterval(u),r&&!a&&r()},1e3*o),u}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}],utils_ui:[function(t,e,n){"use strict";cc._RF.push(e,"b08e1le7AhElZTc77BxLM+1","utils_ui"),Object.defineProperty(n,"__esModule",{value:!0}),n.utilsUI=void 0;var i=t("../../system/all_modules"),o=i._;n.utilsUI={fillLabel:function(t,e){t.getComponent(cc.Label).string=e},fillChildLabelByPath:function(t,e,n){var i=cc.find(e,t);i&&(i.getComponent(cc.Label).string=n)},showOnlyChildNodeWithNameAs:function(t,e){var n;return t.children.map(function(t){t.active=t.name==e,t.active&&(n=t)}),n},setLabelCountDownTimer:function(t,e,n){"string"==typeof t&&(t=cc.find(t)),t.countDownTimerVar&&clearInterval(t.countDownTimerVar);var r=function(){if(!t.parent)return clearInterval(t.countDownTimerVar);var r=e-o.getMsPassedUTC(),a=o.secondsToTimeCountdown(o.floor(r/1e3));i.utilsUI.fillLabel(t,a),r<=0&&(clearInterval(t.countDownTimerVar),n&&n())};t.countDownTimerVar=setInterval(r,500),r()},setNodeSprite:function(t,e){t&&t.getComponent(cc.Sprite)&&(t.getComponent(cc.Sprite).spriteFrame=e)},setNodeSpriteFromUrl:function(t,e,n,i){var o=this;void 0===i&&(i=!1),t&&t.getComponent(cc.Sprite)&&(i&&t.getComponent(cc.Sprite).spriteFrame||cc.assetManager.loadRemote(e,function(e,i){return e||o.setNodeSprite(t,new cc.SpriteFrame(i)),n&&n()}))},setNodeSpriteFillRange:function(t,e){t&&t.getComponent(cc.Sprite)&&(t.getComponent(cc.Sprite).fillRange=e)},makeButton:function(t,e,n,r){void 0===n&&(n=!1),void 0===r&&(r=!1);var a=o.isString(t)?cc.find(t):t;o.setTimeout(function(){if(!a.getComponent("free_button_comp")){a.addComponent("free_button_comp");var t=a.addComponent(cc.Button);t.transition=n?null:cc.Button.Transition.SCALE;var o=new cc.Component.EventHandler;o.target=a,o.component="free_button_comp",o.handler="freeHandler",t.clickEvents.push(o),a.freeButtonHandlerFunc=function(){e(),r||i.audio.playSoundClickButton()}}})},singleTouchSet:function(t,e,n,i){var o=function(t,e){t(e.touch.getLocation(),e)};t.on("touchstart",function(n){t._customTouchId||(t._customTouchId=n.touch._id+1,e&&o(e,n))}),n&&t.on("touchmove",function(e){e.touch._id+1==t._customTouchId&&n&&o(n,e)});var r=function(e){e.touch._id+1==t._customTouchId&&(t._customTouchId=null,i&&o(i,e))};t.on("touchend",r),t.on("touchcancel",r)},makeDraggable:function(t){var e;i.utilsUI.singleTouchSet(t,function(n){e=o.getGlobalPosition(t).sub(n)},function(n){o.setGlobalPos(t,n.add(e))},function(){})},fixScrollViewPerformance:function(t,e,n){var i=this;if(void 0===n&&(n=4),!e.rowVisibleCollider){e.rowVisibleCollider=!0;var r=e.parent,a=e.rowVisibleCollider=new cc.Node("scrollview_item_display_area");a.group="scrollview",this.addSimpleBoxColliderComp(a,r),a.parent=r,t.on("active-in-hierarchy-changed",function(){t.active?o.setTimeout(function(){e.children.map(function(t,e){t.active=!0,t.opacity=e<n?255:0})},500):e.children.map(function(t,e){t.active=e<n})})}e.children.map(function(e,o){e.getComponent("scrollview_row_comp")||(e.addComponent("scrollview_row_comp"),i.addSimpleBoxColliderComp(e),e.group="scrollview"),e.active=!!t.active||o<n})},addSimpleBoxColliderComp:function(t,e){e=e||t;var n=t.addComponent(cc.BoxCollider);n.size.width=e.width,n.size.height=e.height,n.offset.x=e.width*(.5-e.anchorX),n.offset.y=e.width*(.5-e.anchorY)}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}]},{},["ball-collision-comp","core_game","core_game_alternative","graphic_lib","recorder","slow_render","audio","free_button_comp","utils_anim_fx","utils_common","utils_data","utils_time","utils_ui","all_modules","anim_event_comp","app_events","config_anim_fx","project_init_comp","system_types"]);