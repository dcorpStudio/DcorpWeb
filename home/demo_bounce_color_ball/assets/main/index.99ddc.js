window.__require=function t(o,e,r){function c(i,a){if(!e[i]){if(!o[i]){var l=i.split("/");if(l=l[l.length-1],!o[l]){var s="function"==typeof __require&&__require;if(!a&&s)return s(l,!0);if(n)return n(l,!0);throw new Error("Cannot find module '"+i+"'")}i=l}var u=e[i]={exports:{}};o[i][0].call(u.exports,function(t){return c(o[i][1][t]||t)},u,u.exports,t,o,e,r)}return e[i].exports}for(var n="function"==typeof __require&&__require,i=0;i<r.length;i++)c(r[i]);return c}({Helloworld:[function(t,o,e){"use strict";cc._RF.push(o,"e1b90/rohdEk4SdmmEZANaD","Helloworld");var r,c=this&&this.__extends||(r=function(t,o){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])})(t,o)},function(t,o){function e(){this.constructor=t}r(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}),n=this&&this.__decorate||function(t,o,e,r){var c,n=arguments.length,i=n<3?o:null===r?r=Object.getOwnPropertyDescriptor(o,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,o,e,r);else for(var a=t.length-1;a>=0;a--)(c=t[a])&&(i=(n<3?c(i):n>3?c(o,e,i):c(o,e))||i);return n>3&&i&&Object.defineProperty(o,e,i),i};Object.defineProperty(e,"__esModule",{value:!0});var i=cc._decorator,a=i.ccclass,l=(i.property,function(t){function o(){var o=null!==t&&t.apply(this,arguments)||this;return o.ballRigidBodyComp=null,o.audioList={},o}return c(o,t),o.prototype.drawCircles=function(){},o.prototype.loadAudios=function(){var t=this;cc.resources.loadDir("audios",cc.AudioClip,function(o,e){if(!o)for(var r=0,c=e;r<c.length;r++){var n=c[r];t.audioList[n.name]=n}})},o.prototype.onLoad=function(){var t=this;this.loadAudios(),cc.game.config.frameRate=60,cc.director.getPhysicsManager().enabled=!0,cc.director.getPhysicsManager().gravity=cc.v2(0,-15);var o=cc.find("Canvas/world/physics-colliders"),e=cc.find("Canvas/world/physical-ball");this.ballRigidBodyComp=e.getComponent(cc.RigidBody),setTimeout(function(){t.ballRigidBodyComp.applyLinearImpulse(cc.v2(0,-1e3),cc.Vec2.ZERO,!0)}),setInterval(function(){var o=2e3*(Math.random()>.5?1:-1);t.ballRigidBodyComp.applyAngularImpulse(o,!0)},500);for(var r=cc.find("Canvas/world/draw-area").getComponent(cc.Graphics),c=function(t,o,c){cc.v2(t,o).mag()>e.width*(p-e.scale)/2||(r.circle(t,o,e.width*e.scale/2),r.lineWidth=Math.min(.03*e.width*e.scale,2),r.strokeColor=a(c),r.stroke(),r.fillColor=cc.color(c),r.fill())},n=function(){return Math.floor(16777215*Math.random()).toString(16)},i=function(t,o,e){var r=cc.color(t),c=cc.color(o);return cc.color(r.r+(c.r-r.r)*e,r.g+(c.g-r.g)*e,r.b+(c.b-r.b)*e)},a=function(t){return i(t,cc.Color.WHITE,.3)},l=[],s=0;s<100;s++)l.push(n());var u=1,p=1.01*o.width/e.width,f=.0015,d=0,y=n(),h=n(),v=e.position.clone();this.drawCircles=function(){if(u>p)return cc.director.getPhysicsManager().enabled=!1,e.active=!1,void(cc.find("Canvas/world/final-black-ball").active=!0);++d%50==0&&(y=h,h=n(),d=0);var t=i(y,h,d/50),o=e.position.sub(v),r=o.normalize(),a=o.mag()/4;if(a<3)c(e.x,e.y,t);else for(var l=0;l<a;l++)v.addSelf(r.mul(4)),c(v.x,v.y,t);v=e.position.clone(),e.scale=u,u+=f,f+=5e-7,u>.3*p&&(f+=10*5e-7),u>.55*p&&(f+=10*5e-7),u>.7*p&&(f+=10*5e-7),u>.9*p&&(f+=10*5e-7)};var _=performance.now();setInterval(function(){var o=performance.now();t.drawCircles((o-_)/1e3),_=o},8)},o.prototype.update=function(){},n([a],o)}(cc.Component));e.default=l,cc._RF.pop()},{}],"ball-collision-comp":[function(t,o,e){"use strict";cc._RF.push(o,"a3359GqaOFPd6nxtcLB8UbP","ball-collision-comp");var r,c=this&&this.__extends||(r=function(t,o){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])})(t,o)},function(t,o){function e(){this.constructor=t}r(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}),n=this&&this.__decorate||function(t,o,e,r){var c,n=arguments.length,i=n<3?o:null===r?r=Object.getOwnPropertyDescriptor(o,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,o,e,r);else for(var a=t.length-1;a>=0;a--)(c=t[a])&&(i=(n<3?c(i):n>3?c(o,e,i):c(o,e))||i);return n>3&&i&&Object.defineProperty(o,e,i),i};Object.defineProperty(e,"__esModule",{value:!0});var i=cc._decorator,a=i.ccclass,l=(i.property,function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return c(o,t),o.prototype.onBeginContact=function(){cc.find("Canvas").getComponent("Helloworld").drawCircles();var t=cc.find("Canvas").getComponent("Helloworld").audioList.button_click;t&&cc.audioEngine.playEffect(t)},n([a],o)}(cc.Component));e.default=l,cc._RF.pop()},{}]},{},["Helloworld","ball-collision-comp"]);