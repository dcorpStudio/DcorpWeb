window.__require=function e(t,r,o){function n(i,u){if(!r[i]){if(!t[i]){var l=i.split("/");if(l=l[l.length-1],!t[l]){var f="function"==typeof __require&&__require;if(!u&&f)return f(l,!0);if(c)return c(l,!0);throw new Error("Cannot find module '"+i+"'")}i=l}var a=r[i]={exports:{}};t[i][0].call(a.exports,function(e){return n(t[i][1][e]||e)},a,a.exports,e,t,r,o)}return r[i].exports}for(var c="function"==typeof __require&&__require,i=0;i<o.length;i++)n(o[i]);return n}({Helloworld:[function(e,t,r){"use strict";cc._RF.push(t,"e1b90/rohdEk4SdmmEZANaD","Helloworld");var o,n=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),c=this&&this.__decorate||function(e,t,r,o){var n,c=arguments.length,i=c<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,o);else for(var u=e.length-1;u>=0;u--)(n=e[u])&&(i=(c<3?n(i):c>3?n(t,r,i):n(t,r))||i);return c>3&&i&&Object.defineProperty(t,r,i),i};Object.defineProperty(r,"__esModule",{value:!0});var i=cc._decorator,u=i.ccclass,l=(i.property,0),f=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.start=function(){cc.find("Canvas/RootNode/Cube"),l=setInterval(function(){},10)},t.prototype.update=function(){if(window._3dModelAngle){clearInterval(l);var e=cc.find("Canvas/RootNode/Cube"),t=new cc.Quat;cc.Quat.fromEuler(t,e.eulerAngles.x,window._3dModelAngle,e.eulerAngles.z),e.setRotation(t.x,t.y,t.z,t.w)}},c([u],t)}(cc.Component);r.default=f,cc._RF.pop()},{}]},{},["Helloworld"]);