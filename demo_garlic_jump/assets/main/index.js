window.__require=function t(e,o,c){function n(r,s){if(!o[r]){if(!e[r]){var a=r.split("/");if(a=a[a.length-1],!e[a]){var p="function"==typeof __require&&__require;if(!s&&p)return p(a,!0);if(i)return i(a,!0);throw new Error("Cannot find module '"+r+"'")}r=a}var l=o[r]={exports:{}};e[r][0].call(l.exports,function(t){return n(e[r][1][t]||t)},l,l.exports,t,e,o,c)}return o[r].exports}for(var i="function"==typeof __require&&__require,r=0;r<c.length;r++)n(c[r]);return n}({Background:[function(t,e,o){"use strict";cc._RF.push(e,"8f2043vCt5Dv4DPmoK3qXnr","Background");var c,n=this&&this.__extends||(c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,c){var n,i=arguments.length,r=i<3?e:null===c?c=Object.getOwnPropertyDescriptor(e,o):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,c);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i<3?n(r):i>3?n(e,o,r):n(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};Object.defineProperty(o,"__esModule",{value:!0});var r=t("./ThemeBg"),s=cc._decorator,a=s.ccclass,p=s.property,l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.galaxy=null,e.moon=null,e.backgrounds=[],e.leftBg=null,e.rightBg=null,e.nodePos=cc.Vec2.ZERO,e.galaxyPos=cc.Vec2.ZERO,e.moonPos=cc.Vec2.ZERO,e.leftBgPos=cc.Vec2.ZERO,e.rightBgPos=cc.Vec2.ZERO,e}return n(e,t),e.prototype.onLoad=function(){this.nodePos=this.node.getPosition(),this.galaxyPos=this.galaxy.getPosition(),this.moonPos=this.moon.getPosition(),this.leftBgPos=this.leftBg.node.getPosition(),this.rightBgPos=this.rightBg.node.getPosition()},e.prototype.MoveDown=function(){this.node.y>-1e3&&(this.node.runAction(cc.moveBy(.4,cc.v2(0,-10))),this.leftBg.node.runAction(cc.moveBy(.4,cc.v2(0,-10))),this.rightBg.node.runAction(cc.moveBy(.4,cc.v2(0,-10))),this.galaxy.runAction(cc.moveBy(.4,cc.v2(0,-1))),this.moon.runAction(cc.moveBy(.4,cc.v2(0,-2))))},e.prototype.ChooseBackground=function(t){this.getComponent(cc.Sprite).spriteFrame=this.backgrounds[t],this.leftBg.ChooseTheme(t),this.rightBg.ChooseTheme(t)},e.prototype.ResetPosition=function(){this.node.setPosition(this.nodePos),this.leftBg.node.setPosition(this.leftBgPos),this.rightBg.node.setPosition(this.rightBgPos),this.galaxy.setPosition(this.galaxyPos),this.moon.setPosition(this.moonPos)},i([p(cc.Node)],e.prototype,"galaxy",void 0),i([p(cc.Node)],e.prototype,"moon",void 0),i([p([cc.SpriteFrame])],e.prototype,"backgrounds",void 0),i([p(r.default)],e.prototype,"leftBg",void 0),i([p(r.default)],e.prototype,"rightBg",void 0),i([a],e)}(cc.Component);o.default=l,cc._RF.pop()},{"./ThemeBg":"ThemeBg"}],Blocks:[function(t,e,o){"use strict";cc._RF.push(e,"6b7e1L1KmZJxqd1AHcaoFCM","Blocks");var c,n=this&&this.__extends||(c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,c){var n,i=arguments.length,r=i<3?e:null===c?c=Object.getOwnPropertyDescriptor(e,o):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,c);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i<3?n(r):i>3?n(e,o,r):n(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};Object.defineProperty(o,"__esModule",{value:!0});var r=t("./Block"),s=t("./Lines"),a=cc._decorator,p=a.ccclass,l=a.property,u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.scroll=null,e.blockPrefabs=[],e._currentBlock=null,e.bonusLabel=null,e.linesPrefab=null,e.doneAudio=null,e.perfectAudio=null,e.blocksWait=[],e.blockComplete=null,e.blockCount=0,e._blockCompleteCount=0,e.time=0,e.timeToNext=0,e.themeId=0,e.isPlay=!1,e.bonus=0,e.bonusStep=0,e.targetLine=0,e.lineNumber=0,e.currentLine=null,e}return n(e,t),Object.defineProperty(e.prototype,"currentBlock",{get:function(){return this._currentBlock},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"blockCompleteCount",{get:function(){return this._blockCompleteCount},enumerable:!1,configurable:!0}),e.prototype.onLoad=function(){},e.prototype.start=function(){},e.prototype.update=function(t){this.isPlay&&this.blocksWait.length<3&&(this.time+=t,this.time>this.timeToNext&&this.blocksWait.push(this.createBlock()))},e.prototype.NextBlock=function(){var t=this._currentBlock.getComponent(r.default);if(t.Stop(),null!=this.blockComplete)if(Math.abs(this._currentBlock.x-this.blockComplete.x)<8){if(this.bonusStep<this.bonus?this.bonusStep++:(this.bonus++,this.bonusStep=0),this._currentBlock.x=this.blockComplete.x,t.PlayEffect(),this.bonusLabel.y=this._currentBlock.y+20,this.bonusLabel.getComponent(cc.Label).string="+"+this.bonus.toString(),this.bonusLabel.getComponent(cc.Animation).play("bonus"),"true"===cc.sys.localStorage.getItem("sound")){var e=.4+1*this.bonus;cc.audioEngine.play(this.perfectAudio,!1,e)}}else this.bonus=0,this.bonusStep=0,"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.doneAudio,!1,.4);return this.blockComplete=this._currentBlock,0===this.blocksWait.length&&this.blocksWait.push(this.createBlock()),this._currentBlock=this.blocksWait.shift(),this._blockCompleteCount++,this._blockCompleteCount>6&&this.scroll.runAction(cc.moveBy(.4,cc.v2(0,-60))),this.lineNumber=this.lineNumber+1+this.bonus,this.lineNumber>=this.targetLine?(this.currentLine.getComponent(s.default).PlayEffect(),this.currentLine=this.createLines()):this.currentLine.y=this.currentLine.y-60*this.bonus,this.bonus},e.prototype.createBlock=function(){var t=cc.instantiate(this.blockPrefabs[this.themeId]);return this.node.addChild(t),t.setPosition(-350,60*this.blockCount),t.getComponent(r.default).InitAndMove(this.blockCount),this.blockCount++,this.time=0,this.timeToNext=1+Math.random()-.01*this.blockCount,this.timeToNext<.6&&(this.timeToNext=.6),t},e.prototype.createLines=function(){this.targetLine+=50;var t=cc.instantiate(this.linesPrefab);return this.node.addChild(t),t.setPosition(0,60*this.targetLine),t},e.prototype.Stop=function(){this.isPlay=!1,this.blocksWait.forEach(function(t){t.getComponent(r.default).Stop()})},e.prototype.Play=function(){this.isPlay=!0,this.blocksWait=[],this.blockComplete=null,this.blockCount=0,this._blockCompleteCount=0,this.time=0,this.timeToNext=0,this.isPlay=!1,this.bonus=0,this.bonusStep=0,this.targetLine=0,this.lineNumber=0,this._currentBlock=this.createBlock(),this.currentLine=this.createLines()},e.prototype.ChooseTheme=function(t){this.themeId=t},e.prototype.RemoveAllBlock=function(){this.node.removeAllChildren(!0)},i([l(cc.Node)],e.prototype,"scroll",void 0),i([l([cc.Prefab])],e.prototype,"blockPrefabs",void 0),i([l(cc.Node)],e.prototype,"_currentBlock",void 0),i([l({visible:!1})],e.prototype,"currentBlock",null),i([l(cc.Node)],e.prototype,"bonusLabel",void 0),i([l(cc.Prefab)],e.prototype,"linesPrefab",void 0),i([l(cc.AudioClip)],e.prototype,"doneAudio",void 0),i([l(cc.AudioClip)],e.prototype,"perfectAudio",void 0),i([l({visible:!1})],e.prototype,"blockCompleteCount",null),i([p],e)}(cc.Component);o.default=u,cc._RF.pop()},{"./Block":"Block","./Lines":"Lines"}],Block:[function(t,e,o){"use strict";cc._RF.push(e,"ca30f0jVUpAOJKhDj4Kt+dJ","Block");var c,n=this&&this.__extends||(c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,c){var n,i=arguments.length,r=i<3?e:null===c?c=Object.getOwnPropertyDescriptor(e,o):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,c);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i<3?n(r):i>3?n(e,o,r):n(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};Object.defineProperty(o,"__esModule",{value:!0});var r,s=cc._decorator,a=s.ccclass,p=s.property;(function(t){t[t.None=0]="None",t[t.Move=1]="Move"})(r||(r={}));var l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.speed=200,e.rangeSpeedRandom=40,e.rateDifficulty=1,e.blockTypes=[],e.effect1=null,e.effect2=null,e.state=r.None,e.direction=0,e.speedMove=0,e}return n(e,t),e.prototype.update=function(t){if(this.state===r.Move){var e=this.speedMove*t;Math.abs(this.node.x)<e?(this.node.x=0,this.state=r.None):this.node.x=this.node.x-this.direction*e}},e.prototype.InitAndMove=function(t){this.speedMove=Math.random()*(this.rangeSpeedRandom+t*this.rateDifficulty)+this.speed,this.speedMove>1e3&&(this.speedMove=1e3),this.direction=Math.random()<.5?-1:1,this.node.x=350*this.direction;var e=Math.floor(Math.random()*this.blockTypes.length);this.getComponent(cc.Sprite).spriteFrame=this.blockTypes[e],this.state=r.Move},e.prototype.Stop=function(){this.state=r.None},e.prototype.GetDirection=function(){return this.direction},e.prototype.PlayEffect=function(){this.effect1.play("effect1"),this.effect2.play("effect2")},i([p([cc.SpriteFrame])],e.prototype,"blockTypes",void 0),i([p(cc.Animation)],e.prototype,"effect1",void 0),i([p(cc.Animation)],e.prototype,"effect2",void 0),i([a],e)}(cc.Component);o.default=l,cc._RF.pop()},{}],Character:[function(t,e,o){"use strict";cc._RF.push(e,"85bba6zKlZHL7rDM9AOl2Ws","Character");var c,n=this&&this.__extends||(c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,c){var n,i=arguments.length,r=i<3?e:null===c?c=Object.getOwnPropertyDescriptor(e,o):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,c);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i<3?n(r):i>3?n(e,o,r):n(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};Object.defineProperty(o,"__esModule",{value:!0});var r,s=t("./Block"),a=t("./Blocks"),p=cc._decorator,l=p.ccclass,u=p.property;(function(t){t[t.Node=0]="Node",t[t.Idle=1]="Idle",t[t.JumpUp=2]="JumpUp",t[t.JumpDown=3]="JumpDown",t[t.Die=4]="Die"})(r||(r={}));var h=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.armatureDisplays=new Array,e.characterDies=new Array,e.initialVelocity=800,e.acceleration=-2200,e.blocksComponent=null,e.jumpAudio=null,e.dieAudio=null,e._callbackEndJump=null,e._callbackDie=null,e.state=r.Node,e.startPosY=0,e.time=0,e.characterId=0,e}var o;return n(e,t),o=e,Object.defineProperty(e.prototype,"callbackEndJump",{set:function(t){this._callbackEndJump=t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"callbackDie",{set:function(t){this._callbackDie=t},enumerable:!1,configurable:!0}),e.prototype.start=function(){this.state=r.Node,this.startPosY=this.node.y},e.prototype.update=function(t){switch(this.state){case r.Idle:var e=this.blocksComponent.currentBlock;Math.abs(e.x)<o.COLLISION_SIZE&&this.die();break;case r.JumpUp:e=this.blocksComponent.currentBlock,this.time+=t;var c=this.initialVelocity*this.time+.5*this.acceleration*this.time*this.time;this.startPosY+c-this.node.y<=0&&(this.state=r.JumpDown,this.armatureDisplays[this.characterId].playAnimation("jump_down",1)),c<60&&Math.abs(e.x)<o.COLLISION_SIZE?this.die():this.node.y=this.startPosY+c;break;case r.JumpDown:e=this.blocksComponent.currentBlock,this.time+=t,(c=this.initialVelocity*this.time+.5*this.acceleration*this.time*this.time)<=60&&Math.abs(e.x)<o.COLLISION_SIZE?this.node.y-this.startPosY>60?this.endJump():this.die():c<=0?this.idle():this.node.y=this.startPosY+c}},e.prototype.Jump=function(){this.state===r.Idle&&(this.time=0,this.armatureDisplays[this.characterId].playAnimation("jump_up",1),this.state=r.JumpUp,"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.jumpAudio,!1,.2))},e.prototype.idle=function(){this.node.y=this.startPosY,this.armatureDisplays[this.characterId].playAnimation("start",0),this.state=r.Idle},e.prototype.die=function(){this.state=r.Die,this.armatureDisplays[this.characterId].node.active=!1,this.characterDies[this.characterId].active=!0,this.blocksComponent.Stop(),1==this.blocksComponent.currentBlock.getComponent(s.default).GetDirection()?this.characterDies[this.characterId].getComponent(cc.Animation).play("die2"):this.characterDies[this.characterId].getComponent(cc.Animation).play("die1"),this._callbackDie(),"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.dieAudio,!1,.2)},e.prototype.endJump=function(){this.startPosY+=60,this.node.y=this.startPosY,this.armatureDisplays[this.characterId].playAnimation("start",0),this.state=r.Idle;var t=this.blocksComponent.NextBlock();this._callbackEndJump(t)},e.prototype.ChooseCharacter=function(t){this.characterId=t},e.prototype.Play=function(){this.node.setPosition(cc.Vec2.ZERO),this.armatureDisplays.forEach(function(t){t.node.active=!1}),this.characterDies.forEach(function(t){t.active=!1}),this.armatureDisplays[this.characterId].node.active=!0,this.startPosY=this.node.y,this.time=0,this.state=r.Idle},e.COLLISION_SIZE=100,i([u([dragonBones.ArmatureDisplay])],e.prototype,"armatureDisplays",void 0),i([u([cc.Node])],e.prototype,"characterDies",void 0),i([u(cc.Float)],e.prototype,"initialVelocity",void 0),i([u(cc.Float)],e.prototype,"acceleration",void 0),i([u(a.default)],e.prototype,"blocksComponent",void 0),i([u(cc.AudioClip)],e.prototype,"jumpAudio",void 0),i([u(cc.AudioClip)],e.prototype,"dieAudio",void 0),i([u],e.prototype,"_callbackEndJump",void 0),i([u],e.prototype,"callbackEndJump",null),i([u],e.prototype,"_callbackDie",void 0),i([u],e.prototype,"callbackDie",null),o=i([l],e)}(cc.Component);o.default=h,cc._RF.pop()},{"./Block":"Block","./Blocks":"Blocks"}],Game:[function(t,e,o){"use strict";cc._RF.push(e,"242c8w6lfNKQpsoxRzeidbE","Game");var c,n=this&&this.__extends||(c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,c){var n,i=arguments.length,r=i<3?e:null===c?c=Object.getOwnPropertyDescriptor(e,o):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,c);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i<3?n(r):i>3?n(e,o,r):n(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};Object.defineProperty(o,"__esModule",{value:!0});var r=t("./Game/Character"),s=t("./Game/Blocks"),a=t("./Game/Background"),p=t("./Game/ThemeBg"),l=t("./Game/SecondChance"),u=cc._decorator,h=u.ccclass,d=u.property,f=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.lblScore=null,e.characterComponent=null,e.scroll=null,e.blocksComponent=null,e.bgComponent=null,e.leftBg=null,e.rightBg=null,e.popup=null,e.score=0,e}return n(e,t),e.prototype.onLoad=function(){"true"===cc.sys.localStorage.getItem("sound")&&this.getComponent(cc.AudioSource).play()},e.prototype.start=function(){this.characterComponent.callbackEndJump=this.onCharacterEndJump.bind(this),this.characterComponent.callbackDie=this.onCharacterDie.bind(this),this.node.on(cc.Node.EventType.TOUCH_START,function(){this.characterComponent.Jump()}.bind(this),this)},e.prototype.onCharacterEndJump=function(t){this.score=this.score+1+t,this.lblScore.string=this.score.toString(),this.bgComponent.MoveDown()},e.prototype.onCharacterDie=function(){var t=480/(60*this.blocksComponent.blockCompleteCount);this.scroll.runAction(cc.spawn(cc.moveTo(1,cc.v2(0,-360)),cc.scaleTo(1,t>1?1:t))),this.node.runAction(cc.sequence(cc.delayTime(2),cc.callFunc(this.showPopup,this)))},e.prototype.showPopup=function(){this.popup.active=!0,this.popup.getComponent(l.default).Start()},e.prototype.SelectCharacter=function(t){this.characterComponent.ChooseCharacter(t)},e.prototype.SelectTheme=function(t){this.blocksComponent.ChooseTheme(t),this.bgComponent.ChooseBackground(t),this.leftBg.ChooseTheme(t),this.rightBg.ChooseTheme(t)},e.prototype.Play=function(){this.score=0,this.lblScore.string=this.score.toString(),this.scroll.setPosition(0,-360),this.scroll.setScale(1),this.blocksComponent.Play(),this.characterComponent.Play()},e.prototype.SoundOn=function(){this.getComponent(cc.AudioSource).play()},e.prototype.SoundOff=function(){this.getComponent(cc.AudioSource).stop()},i([d(cc.Label)],e.prototype,"lblScore",void 0),i([d(r.default)],e.prototype,"characterComponent",void 0),i([d(cc.Node)],e.prototype,"scroll",void 0),i([d(s.default)],e.prototype,"blocksComponent",void 0),i([d(a.default)],e.prototype,"bgComponent",void 0),i([d(p.default)],e.prototype,"leftBg",void 0),i([d(p.default)],e.prototype,"rightBg",void 0),i([d(cc.Node)],e.prototype,"popup",void 0),i([h],e)}(cc.Component);o.default=f,cc._RF.pop()},{"./Game/Background":"Background","./Game/Blocks":"Blocks","./Game/Character":"Character","./Game/SecondChance":"SecondChance","./Game/ThemeBg":"ThemeBg"}],Lines:[function(t,e,o){"use strict";cc._RF.push(e,"ab356BwFWJILYpNUrlJl6S0","Lines");var c,n=this&&this.__extends||(c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,c){var n,i=arguments.length,r=i<3?e:null===c?c=Object.getOwnPropertyDescriptor(e,o):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,c);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i<3?n(r):i>3?n(e,o,r):n(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};Object.defineProperty(o,"__esModule",{value:!0});var r=cc._decorator,s=r.ccclass,a=r.property,p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.lines=[],e}return n(e,t),e.prototype.start=function(){},e.prototype.PlayEffect=function(){for(var t=0;t<this.lines.length;t++)this.lines[t].play("line"+(t+1).toString())},i([a(cc.Animation)],e.prototype,"lines",void 0),i([s],e)}(cc.Component);o.default=p,cc._RF.pop()},{}],Menu:[function(t,e,o){"use strict";cc._RF.push(e,"02880qAK7tNyodIA3NqOHvf","Menu");var c,n=this&&this.__extends||(c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,c){var n,i=arguments.length,r=i<3?e:null===c?c=Object.getOwnPropertyDescriptor(e,o):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,c);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i<3?n(r):i>3?n(e,o,r):n(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};Object.defineProperty(o,"__esModule",{value:!0});var r=t("./Game"),s=t("./Menu/ThemeButton"),a=t("./Game/Character"),p=cc._decorator,l=p.ccclass,u=p.property,h=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.game=null,e.character=null,e.activeBar=null,e.themeButton=null,e.audioClick=null,e.characterId=0,e}return n(e,t),e.prototype.start=function(){this.characterId=0,this.activeBar.x=0,cc.sys.localStorage.setItem("sound",!0)},e.prototype.onPlay=function(){this.game.Play(),"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.audioClick,!1,1),this.node.active=!1},e.prototype.onSelectCharacter=function(t,e){this.characterId=parseInt(e),this.activeBar.x=60*(0==this.characterId?-1:1),this.character.ChooseCharacter(this.characterId),"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.audioClick,!1,1)},e.prototype.onShare=function(){"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.audioClick,!1,1)},e.prototype.onFacebook=function(){"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.audioClick,!1,1)},e.prototype.onRate=function(){"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.audioClick,!1,1)},i([u(r.default)],e.prototype,"game",void 0),i([u(a.default)],e.prototype,"character",void 0),i([u(cc.Node)],e.prototype,"activeBar",void 0),i([u(s.default)],e.prototype,"themeButton",void 0),i([u(cc.AudioClip)],e.prototype,"audioClick",void 0),i([l],e)}(cc.Component);o.default=h,cc._RF.pop()},{"./Game":"Game","./Game/Character":"Character","./Menu/ThemeButton":"ThemeButton"}],SecondChance:[function(t,e,o){"use strict";cc._RF.push(e,"e6806RKtrVOPIJmbwHBSmoV","SecondChance");var c,n=this&&this.__extends||(c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,c){var n,i=arguments.length,r=i<3?e:null===c?c=Object.getOwnPropertyDescriptor(e,o):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,c);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i<3?n(r):i>3?n(e,o,r):n(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};Object.defineProperty(o,"__esModule",{value:!0});var r=t("./Blocks"),s=t("./Background"),a=cc._decorator,p=a.ccclass,l=a.property,u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.menuPopup=null,e.blocks=null,e.background=null,e.labelTime=null,e.progressBar=null,e.audioClick=null,e.time=3,e}return n(e,t),e.prototype.start=function(){},e.prototype.update=function(t){this.time>0&&(this.time-=t,this.time<=0&&(this.time=0,this.close()),this.labelTime.string=Math.ceil(this.time).toString(),this.progressBar.progress=this.time/3)},e.prototype.Start=function(){this.time=3,"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.audioClick,!1,1)},e.prototype.onClose=function(){"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.audioClick,!1,1),this.time=0,this.close()},e.prototype.onRevival=function(){"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.audioClick,!1,1)},e.prototype.close=function(){this.blocks.RemoveAllBlock(),this.background.ResetPosition(),this.menuPopup.active=!0,this.node.active=!1},i([l(cc.Node)],e.prototype,"menuPopup",void 0),i([l(r.default)],e.prototype,"blocks",void 0),i([l(s.default)],e.prototype,"background",void 0),i([l(cc.Label)],e.prototype,"labelTime",void 0),i([l(cc.ProgressBar)],e.prototype,"progressBar",void 0),i([l(cc.AudioClip)],e.prototype,"audioClick",void 0),i([p],e)}(cc.Component);o.default=u,cc._RF.pop()},{"./Background":"Background","./Blocks":"Blocks"}],SoundButton:[function(t,e,o){"use strict";cc._RF.push(e,"06011SJomlHYqg1Uf54OEew","SoundButton");var c,n=this&&this.__extends||(c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,c){var n,i=arguments.length,r=i<3?e:null===c?c=Object.getOwnPropertyDescriptor(e,o):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,c);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i<3?n(r):i>3?n(e,o,r):n(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};Object.defineProperty(o,"__esModule",{value:!0});var r=cc._decorator,s=r.ccclass,a=r.property,p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.soundBackground=null,e.soundOnButton=null,e.soundOffButton=null,e.audioClick=null,e}return n(e,t),e.prototype.onLoad=function(){this.soundOnButton.active=!0,this.soundOffButton.active=!1},e.prototype.onSoundOn=function(){this.soundOnButton.active=!0,this.soundOffButton.active=!1,this.soundBackground.play(),cc.audioEngine.play(this.audioClick,!1,1),cc.sys.localStorage.setItem("sound",!0)},e.prototype.onSoundOff=function(){this.soundOnButton.active=!1,this.soundOffButton.active=!0,this.soundBackground.stop(),cc.sys.localStorage.setItem("sound",!1)},i([a(cc.AudioSource)],e.prototype,"soundBackground",void 0),i([a(cc.Node)],e.prototype,"soundOnButton",void 0),i([a(cc.Node)],e.prototype,"soundOffButton",void 0),i([a(cc.AudioClip)],e.prototype,"audioClick",void 0),i([s],e)}(cc.Component);o.default=p,cc._RF.pop()},{}],ThemeBg:[function(t,e,o){"use strict";cc._RF.push(e,"c074dwCvG5LhLAN9fW0IiLT","ThemeBg");var c,n=this&&this.__extends||(c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,c){var n,i=arguments.length,r=i<3?e:null===c?c=Object.getOwnPropertyDescriptor(e,o):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,c);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i<3?n(r):i>3?n(e,o,r):n(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};Object.defineProperty(o,"__esModule",{value:!0});var r=cc._decorator,s=r.ccclass,a=r.property,p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.themeBgs=[],e}return n(e,t),e.prototype.ChooseTheme=function(t){this.getComponent(cc.Sprite).spriteFrame=this.themeBgs[t]},i([a([cc.SpriteFrame])],e.prototype,"themeBgs",void 0),i([s],e)}(cc.Component);o.default=p,cc._RF.pop()},{}],ThemeButton:[function(t,e,o){"use strict";cc._RF.push(e,"84b346LLFdFspDlpq3UwwyI","ThemeButton");var c,n=this&&this.__extends||(c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,c){var n,i=arguments.length,r=i<3?e:null===c?c=Object.getOwnPropertyDescriptor(e,o):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,c);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(r=(i<3?n(r):i>3?n(e,o,r):n(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};Object.defineProperty(o,"__esModule",{value:!0});var r=t("../Game"),s=cc._decorator,a=s.ccclass,p=s.property,l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.game=null,e.themeButtons=[],e.activeBar=null,e.audioClick=null,e.backgrounds=[],e.themeId=0,e}return n(e,t),e.prototype.start=function(){},e.prototype.onChooseTheme=function(t,e){this.themeId=parseInt(e),this.activeBar.y=70*-this.themeId,this.game.SelectTheme(this.themeId),"true"===cc.sys.localStorage.getItem("sound")&&cc.audioEngine.play(this.audioClick,!1,1)},e.prototype.GetThemeId=function(){return this.themeId},i([p(r.default)],e.prototype,"game",void 0),i([p([cc.Node])],e.prototype,"themeButtons",void 0),i([p(cc.Node)],e.prototype,"activeBar",void 0),i([p(cc.AudioClip)],e.prototype,"audioClick",void 0),i([p([cc.SpriteFrame])],e.prototype,"backgrounds",void 0),i([a],e)}(cc.Component);o.default=l,cc._RF.pop()},{"../Game":"Game"}],"use_v2.0.x_cc.Toggle_event":[function(t,e){"use strict";cc._RF.push(e,"ea1aaWoP45CzKA6oTCM8sAK","use_v2.0.x_cc.Toggle_event"),cc.Toggle&&(cc.Toggle._triggerEventInScript_check=!0),cc._RF.pop()},{}]},{},["Game","Background","Block","Blocks","Character","Lines","SecondChance","ThemeBg","Menu","SoundButton","ThemeButton","use_v2.0.x_cc.Toggle_event"]);