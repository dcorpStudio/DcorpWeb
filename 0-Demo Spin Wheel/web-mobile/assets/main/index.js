window.__require=function t(e,o,n){function c(i,a){if(!o[i]){if(!e[i]){var f=i.split("/");if(f=f[f.length-1],!e[f]){var p="function"==typeof __require&&__require;if(!a&&p)return p(f,!0);if(r)return r(f,!0);throw new Error("Cannot find module '"+i+"'")}i=f}var l=o[i]={exports:{}};e[i][0].call(l.exports,function(t){return c(e[i][1][t]||t)},l,l.exports,t,e,o,n)}return o[i].exports}for(var r="function"==typeof __require&&__require,i=0;i<n.length;i++)c(n[i]);return c}({arrow_comp:[function(t,e,o){"use strict";cc._RF.push(e,"c985aEB3LdPsJy6uRQ8aGp6","arrow_comp");var n,c=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__decorate||function(t,e,o,n){var c,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(c=t[a])&&(i=(r<3?c(i):r>3?c(e,o,i):c(e,o))||i);return r>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,a=i.ccclass,f=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return c(e,t),e.prototype.onCollisionEnter=function(t){var e=t.node.getComponent(cc.Label);e&&(cc.find("Canvas/label_result").getComponent(cc.Label).string=e.string)},r([a],e)}(cc.Component));o.default=f,cc._RF.pop()},{}],canvas_init:[function(t,e,o){"use strict";cc._RF.push(e,"fd171eL4bNLV7xq9u/phCcB","canvas_init");var n,c=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__decorate||function(t,e,o,n){var c,r=arguments.length,i=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(c=t[a])&&(i=(r<3?c(i):r>3?c(e,o,i):c(e,o))||i);return r>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,a=i.ccclass,f=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return c(e,t),e.prototype.onLoad=function(){console.log("window._WHEEL_DATA_ARR = ",window._WHEEL_DATA_ARR);var t=window._WHEEL_DATA_ARR||[["Naomi1","#ffcc00"],["Naomi2","#ffffcc"],["Naomi3","#336699"],["Naomi4","#ff0000"],["Naomi5","#ffccee"],["Naomi6","#ffcc00"],["Naomi7","#ffffcc"],["Naomi8","#336699"],["Naomi9","#ff0000"],["Naomi10","#ffccee"]],e=cc.find("Canvas/circle"),o=cc.find("Canvas/sample_slice"),n=function(t,n,c){var r=cc.instantiate(o);e.addChild(r),r.getComponent(cc.Sprite).fillRange=t,r.color=cc.color(c);var i=cc.find("label",r);return i.getComponent(cc.Label).string=n,i.angle=360*t/2,r.setPosition(0,0),r};(function(t){var e=1/t.length;t.map(function(t,o){var c=t[0],r=t[1];n(e,c,r).angle=360*e*o})})(t);var c=cc.director.getPhysicsManager();c.enabled=!0,c.gravity=cc.Vec2.ZERO,cc.director.getCollisionManager().enabled=!0,cc.find("Canvas/btn_spin").on("touchend",function(){e.getComponent(cc.RigidBody).awake||(e.getComponent(cc.RigidBody).angularVelocity=1200)})},e.prototype.update=function(){var t=cc.find("Canvas/circle");cc.find("Canvas/btn_spin").color=cc.color(t.getComponent(cc.RigidBody).awake?"#555555":"#00A80D")},r([a],e)}(cc.Component));o.default=f,cc._RF.pop()},{}]},{},["arrow_comp","canvas_init"]);