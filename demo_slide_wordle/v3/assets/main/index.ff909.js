window.__require=function e(t,n,o){function i(a,c){if(!n[a]){if(!t[a]){var l=a.split("/");if(l=l[l.length-1],!t[l]){var s="function"==typeof __require&&__require;if(!c&&s)return s(l,!0);if(r)return r(l,!0);throw new Error("Cannot find module '"+a+"'")}a=l}var u=n[a]={exports:{}};t[a][0].call(u.exports,function(e){return i(t[a][1][e]||e)},u,u.exports,e,t,n,o)}return n[a].exports}for(var r="function"==typeof __require&&__require,a=0;a<o.length;a++)i(o[a]);return i}({all_modules:[function(e,t,n){"use strict";cc._RF.push(t,"090e8xDLQRAgKX2HKPophnx","all_modules");var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),i=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||o(t,e,n)};Object.defineProperty(n,"__esModule",{value:!0}),i(e("../services/utils/utils_common"),n),i(e("./configurations/config_game"),n),i(e("../services/utils/utils_data"),n),i(e("../services/utils/utils_ui"),n),i(e("../services/utils/utils_anim_fx"),n),i(e("../services/audio"),n),i(e("../system/app_events"),n),i(e("../system/ui-fx/core_fx"),n),i(e("../system/ui-fx/core_ui"),n),i(e("../core-game/settings"),n),i(e("../core-game/game_mechanic"),n),i(e("../core-game/map_visual"),n),i(e("../core-game/tutorial"),n),i(e("../core-game/game_flow"),n),i(e("../core-game/level_generator"),n),i(e("../control/control"),n),cc._RF.pop()},{"../control/control":"control","../core-game/game_flow":"game_flow","../core-game/game_mechanic":"game_mechanic","../core-game/level_generator":"level_generator","../core-game/map_visual":"map_visual","../core-game/settings":"settings","../core-game/tutorial":"tutorial","../services/audio":"audio","../services/utils/utils_anim_fx":"utils_anim_fx","../services/utils/utils_common":"utils_common","../services/utils/utils_data":"utils_data","../services/utils/utils_ui":"utils_ui","../system/app_events":"app_events","../system/ui-fx/core_fx":"core_fx","../system/ui-fx/core_ui":"core_ui","./configurations/config_game":"config_game"}],app_events:[function(e,t,n){"use strict";cc._RF.push(t,"10990IZBkRJQLreM2+T4aIH","app_events"),Object.defineProperty(n,"__esModule",{value:!0}),n.appEvents=void 0;var o=e("../system/all_modules");o._,o.$,n.appEvents={isAppHidden:!1,onAppShowCallbackArr:[],onAppHideCallbackArr:[],onAppShow:function(){this.isAppHidden=!1,this.onAppShowCallbackArr.map(function(e){return e()})},addAppShowCallback:function(e){this.onAppShowCallbackArr.push(e)},onAppHide:function(){this.isAppHidden=!0,this.onAppHideCallbackArr.map(function(e){return e()})},addAppHideCallback:function(e){this.onAppHideCallbackArr.push(e)}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],audio:[function(e,t,n){"use strict";cc._RF.push(t,"57d370T3gNMWJXIo0x1feW9","audio"),Object.defineProperty(n,"__esModule",{value:!0}),n.audio=void 0;var o=e("../system/all_modules"),i=o._;o.$,n.audio={audioList:{},playingIdList:{},currentStreakSoundIndex:0,lastStreakTime:0,init:function(){},loadAudioFiles:function(){var e=this;cc.resources.loadDir("audios",cc.AudioClip,function(t,n){if(t)return i.log(t);for(var r=0,a=n;r<a.length;r++){var c=a[r];e.audioList[c.name]=c}i.waitToRun(function(){return e.playBgMusic()},"isInitialized",o.settings)})},playSound:function(e,t){if(void 0===t&&(t=1),o.settings.sound&&this.audioList[e])try{this.playingIdList[e]=cc.audioEngine.play(this.audioList[e],!1,t)}catch(n){}},stopSound:function(e){this.playingIdList[e]&&cc.audioEngine.stopEffect(this.playingIdList[e])},playBgMusic:function(e){if(void 0===e&&(e=1),o.settings.music&&!cc.audioEngine.isMusicPlaying())try{this.playingIdList.bg_music=cc.audioEngine.playMusic(this.audioList.bg_music,!0),cc.audioEngine.setMusicVolume(e)}catch(t){i.log("playMusic err ",t)}},stopBgMusic:function(){cc.audioEngine.isMusicPlaying()&&cc.audioEngine.stopMusic()},playSoundClickButton:function(){o.settings.sound&&this.playSound("button_click",1)}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],bind_button_handlers:[function(e,t,n){"use strict";cc._RF.push(t,"9c123Lu5L1HWKu7kgQRu2Dk","bind_button_handlers"),Object.defineProperty(n,"__esModule",{value:!0}),n.bindButtonHandlers=void 0;var o=e("../../system/all_modules");o._,n.bindButtonHandlers={run:function(){o.utilsUI.makeButton(cc.find("Canvas/play_area/btn_replay"),function(){o.gameMechanic.replay()}),o.utilsUI.makeButton(cc.find("Canvas/play_area/btn_report_bug"),function(){o.gameMechanic.deviceLogGridState(),cc.find("Canvas/play_area/popup_grid_state").active=!0}),o.utilsUI.makeButton(cc.find("Canvas/play_area/popup_grid_state/bg"),function(){cc.find("Canvas/play_area/popup_grid_state").active=!1})}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}],config_game:[function(e,t,n){"use strict";cc._RF.push(t,"e2516totLFCXanAqceflU53","config_game"),Object.defineProperty(n,"__esModule",{value:!0}),n.configGame=void 0;var o=e("../all_modules");o._,o.$,n.configGame={},cc._RF.pop()},{"../all_modules":"all_modules"}],control:[function(e,t,n){"use strict";cc._RF.push(t,"1ddf8FW8cNGapuroxBoKhVq","control"),Object.defineProperty(n,"__esModule",{value:!0}),n.control=void 0;var o=e("../system/all_modules");o._,o.$,n.control={selectedCellNode:null,init:function(){},bindCellTap:function(e){e.on("touchstart",function(){e.isEmpty||o.gameMechanic.onCellTap(e)})}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],core_fx:[function(e,t,n){"use strict";cc._RF.push(t,"58583JUlBRDj43pXro2UfkX","core_fx"),Object.defineProperty(n,"__esModule",{value:!0}),n.coreFX=void 0;var o=e("../../system/all_modules");o._,o.$,n.coreFX={fxContainer:null,init:function(){}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}],core_ui:[function(e,t,n){"use strict";cc._RF.push(t,"b15554JuJ1HfrbLWDvHND0f","core_ui"),Object.defineProperty(n,"__esModule",{value:!0}),n.coreUI=void 0;var o=e("../../system/all_modules"),i=o._,r=e("./bind_button_handlers");n.coreUI={alertOKCallback:null,init:function(){r.bindButtonHandlers.run()},adjustUI:function(){cc.winSize.width/cc.winSize.height>.5625&&(cc.find("Canvas").getComponent(cc.Canvas).fitWidth=!1,cc.find("Canvas").getComponent(cc.Canvas).fitHeight=!0),["Canvas/play_area","Canvas/bg","Canvas/control_layer","Canvas/layout_win","Canvas/layout_settings","Canvas/fx_container","Canvas/nag_screen","Canvas/layout_fixed_header","Canvas/layout_tutorial"].map(function(e){cc.find(e).height=cc.winSize.height})},showLayout:function(e){(i.isString(e)?cc.find("Canvas/"+e):e).active=!0},hideLayout:function(e){(i.isString(e)?cc.find("Canvas/"+e):e).active=!1},showAlert:function(e,t){this.showLayout("layer_alert"),o.utilsUI.fillLabel(cc.find("Canvas/layer_alert/bg_msg/label_msg"),e),this.alertOKCallback=t},hideLoadingTimer:null,showLoading:function(){var e=this;this.showLayout("layer_loading"),this.hideLoadingTimer&&clearTimeout(this.hideLoadingTimer),this.hideLoadingTimer=setTimeout(function(){return e.hideLoading()},1e4)},hideLoading:function(){this.hideLayout("layer_loading"),this.hideLoadingTimer&&clearTimeout(this.hideLoadingTimer)},showNagScreen:function(e){var t=this;cc.find("Canvas/nag_screen").active=!0,e&&i.setTimeout(function(){return t.hideNagScreen()},1e3*e)},hideNagScreen:function(){cc.find("Canvas/nag_screen").active=!1},updateUserStats:function(e){void 0===e&&(e=!1)}},cc._RF.pop()},{"../../system/all_modules":"all_modules","./bind_button_handlers":"bind_button_handlers"}],free_button_comp:[function(e,t,n){"use strict";cc._RF.push(t,"ee307OeX0lMvqRwlJoeXArM","free_button_comp");var o,i=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),r=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a};Object.defineProperty(n,"__esModule",{value:!0});var a=e("../../system/all_modules"),c=(a._,a.$,cc._decorator),l=c.ccclass,s=(c.property,function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.prototype.freeHandler=function(e){e.target.freeButtonHandlerFunc&&e.target.freeButtonHandlerFunc(e.target)},r([l],t)}(cc.Component));n.default=s,cc._RF.pop()},{"../../system/all_modules":"all_modules"}],game_flow:[function(e,t,n){"use strict";cc._RF.push(t,"133e2EyA7BEH6xD94DPj2u1","game_flow"),Object.defineProperty(n,"__esModule",{value:!0}),n.gameFlow=void 0;var o=e("../system/all_modules");o._,o.$,n.gameFlow={init:function(){this.parseURL()},parseURL:function(){var e=window.location.search,t=new URLSearchParams(e),n=t.get("admin-level-generator");if(cc.find("Canvas/level_generator").active=!!n,n)return o.levelGen.start();var i={};["gridWidth","gridHeight","letterString","correctWordList"].map(function(e){i[e]=t.get(e)}),i.correctWordArr=atob(i.correctWordList).split(","),o.gameMechanic.startGame(i)}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],game_mechanic:[function(e,t,n){"use strict";cc._RF.push(t,"438ea0dqARKwKWtyk/Ae8uA","game_mechanic"),Object.defineProperty(n,"__esModule",{value:!0}),n.gameMechanic=void 0;var o=e("../system/all_modules"),i=o._;o.$,n.gameMechanic={emptyCellNode:null,correctWordArr:null,currentLevelInfo:null,isWin:!1,startTimeMs:0,init:function(){this.startTimer()},startTimer:function(){var e=this,t=cc.find("Canvas/play_area/label_timer");i.setInterval(function(){if(!e.isWin){var n=i.floor((performance.now()-e.startTimeMs)/1e3);o.utilsUI.fillLabel(t,i.secondsToTimeCountdown(n))}},100)},startGame:function(e){var t=this;this.currentLevelInfo=e,this.startTimeMs=performance.now(),this.isWin=!1,this.correctWordArr=e.correctWordArr,o.mapVisual.renderLevel(e),o.mapVisual.elemContainerNode.children.map(function(e){return t.checkAndColorCellNode(e)})},replay:function(){this.startGame(this.currentLevelInfo)},onWin:function(){cc.find("Canvas/play_area/label_congrat").active=!0,this.isWin=!0},checkWin:function(){var e=this;this.isWin=o.mapVisual.elemContainerNode.children.every(function(t){return t.isEmpty?0==t.cellPos.y&&t.cellPos.x==e.currentLevelInfo.gridWidth-1:e.checkAndColorCellNode(t)}),this.isWin&&this.onWin()},onCellTap:function(e){this.isWin||this.isSwappingCell||1==e.cellPos.sub(this.emptyCellNode.cellPos).mag()&&this.swapCell(e,this.emptyCellNode)},isSwappingCell:!1,swapCell:function(e,t){var n,o=this;this.isSwappingCell=!0,n=[t.cellPos,e.cellPos],e.cellPos=n[0],t.cellPos=n[1];var i=e.position,r=t.position;e.stopAllActions(),t.stopAllActions(),cc.tween(e).to(.1,{position:r}).start(),cc.tween(t).to(.1,{position:i}).call(function(){return o.isSwappingCell=!1}).call(function(){return o.checkAllCellsValid()}).start(),this.checkAndColorCellNode(e),this.checkAndColorCellNode(t),this.checkWin()},checkAndColorCellNode:function(e){if(!e.isEmpty){var t=e.letter,n=e.cellPos,o=this.correctWordArr[this.currentLevelInfo.gridHeight-1-n.y];o||i.log("rowWord=undefined // index = "+(this.currentLevelInfo.gridHeight-1-n.y)+" // this.correctWordArr="+this.correctWordArr.join(" # ")+" ");var r=o.includes(t),a=this.correctWordArr.some(function(e){return e.substr(n.x,1)==t}),c=r&&a&&o.substr(n.x,1)==t,l=c?cc.Color.GREEN:r||a?cc.Color.YELLOW:cc.color("#A0A0A0");return cc.find("bg",e).color=l,c}},checkAllCellsValid:function(){var e=this,t="",n=o.mapVisual.elemContainerNode.children;if(n.map(function(i){var r=o.mapVisual.getCellPos(i.cellPos.x,i.cellPos.y);i.position.equals(r)||(t+="\nwrongCellPos! "+e.getCellInfo(i));var a=n.find(function(e){return e!=i&&e.cellPos.equals(i.cellPos)});a&&(t+="\nduplicatedCellNode! \n \t\t cell1 = "+e.getCellInfo(i)+"\n \t\t cell2 = "+e.getCellInfo(a))}),""!=t){var i=cc.find("Canvas/play_area/btn_report_bug/alert");i.stopAllActions(),cc.tween(i).repeatForever(cc.tween().to(.2,{opacity:255}).to(.2,{opacity:0})).start()}return t},deviceLogGridState:function(){var e=this,t=cc.find("Canvas/play_area/popup_grid_state/input_grid_log").getComponent(cc.EditBox);t.string="isSwappngCell = "+this.isSwappingCell+" \n",t.string+=" ---------------------------\n checkAllCellsValid = "+this.checkAllCellsValid()+" \n",t.string+=" ---------------------------\n gridState = \n",o.mapVisual.elemContainerNode.children.map(function(n){t.string+=e.getCellInfo(n)})},getCellInfo:function(e){return"cellPos= "+e.cellPos+" // realPos="+e.position+" // letter="+e.letter+" // isEmpty="+!!e.isEmpty+"\n"}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],level_generator:[function(e,t,n){"use strict";cc._RF.push(t,"636b8ZJ0IZIZYGTKI/V7MPf","level_generator"),Object.defineProperty(n,"__esModule",{value:!0}),n.levelGen=void 0;var o=e("../system/all_modules"),i=o._;o.$,n.levelGen={gridNode:null,start:function(){this.gridNode=cc.find("Canvas/level_generator/grid"),this.gridNode.parent.active=!0,this.bindButtons(),this.formToGrid()},bindButtons:function(){var e=this;o.utilsUI.makeButton(cc.find("Canvas/level_generator/btn_suffle"),function(){return e.shuffleGrid()}),o.utilsUI.makeButton(cc.find("Canvas/level_generator/btn_get_link"),function(){return e.getLink()}),o.utilsUI.makeButton(cc.find("Canvas/level_generator/popup_link/bg"),function(){cc.find("Canvas/level_generator/popup_link").active=!1});var t=cc.find("Canvas/level_generator/form");o.utilsUI.makeButton(cc.find("btn_test_input",t),function(){return e.formToGrid()})},formToGrid:function(){for(var e=cc.find("Canvas/level_generator/form"),t=function(t){return cc.find(t,e).getComponent(cc.EditBox).string.trim()},n=parseInt(t("input_column"))||3,i=parseInt(t("input_row"))||3,r=t("input_correct_words").replace(/[^A-Za-z@]/g,"").match(new RegExp(".{1,"+n+"}","g")),a=100;a--&&r.length<i;)r.push("");r[r.length-1]+="@";var c=r.join("").toUpperCase(),l={gridWidth:n,gridHeight:i,correctWordArr:r,letterString:c};if(c.length!==n*i)return alert("Error!\n         Word list letter count ("+(c.length-1)+") not match grid size ("+n+"x"+i+" - 1)");o.mapVisual.renderLevel(l,this.gridNode),o.gameMechanic.startGame(l),this.gridNode.children.map(function(e){return o.gameMechanic.checkAndColorCellNode(e)})},shuffleGrid:function(){for(var e,t=o.gameMechanic.currentLevelInfo,n=t.correctWordArr.slice(0).reverse().map(function(e){return e.split("")}),r=cc.v2(t.gridWidth-1,0),a=[cc.v2(1,0),cc.v2(-1,0),cc.v2(0,1),cc.v2(0,-1)],c=0;c<700;c++){var l=a.map(function(e){return e.add(r)}).filter(function(e){return e.x>=0&&e.x<t.gridWidth&&e.y>=0&&e.y<t.gridHeight}),s=i.randomArrItem(l);e=[n[r.y][r.x],n[s.y][s.x]],n[s.y][s.x]=e[0],n[r.y][r.x]=e[1],r.set(s)}t.letterString=n.reverse().map(function(e){return e.join("")}).join("").toUpperCase(),o.mapVisual.renderLevel(t,this.gridNode),o.gameMechanic.startGame(t),this.gridNode.children.map(function(e){return o.gameMechanic.checkAndColorCellNode(e)})},getLink:function(){var e=location.protocol+"//"+location.host+location.pathname,t=o.gameMechanic.currentLevelInfo,n=e+"?gridWidth="+t.gridWidth+"&gridHeight="+t.gridHeight+"&correctWordList="+btoa(t.correctWordArr.join(","))+"&letterString="+t.letterString,i=cc.find("Canvas/level_generator/popup_link");cc.find("input_link",i).getComponent(cc.EditBox).string=n,i.active=!0}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],map_visual:[function(e,t,n){"use strict";cc._RF.push(t,"8e0baH2ZLtGQb52+gG4oZRe","map_visual"),Object.defineProperty(n,"__esModule",{value:!0}),n.mapVisual=void 0;var o=e("../system/all_modules"),i=o._;o.$,n.mapVisual={elemContainerNode:null,cellSize:100,containerWidth:660,containerHeight:660,griCelldHeight:0,init:function(){this.elemContainerNode=cc.find("Canvas/play_area/grid"),this.containerWidth=this.elemContainerNode.width},clearMap:function(e){(e||this.elemContainerNode).removeAllChildren(!0)},renderLevel:function(e,t){this.renderGrid(e,t);var n=cc.find("Canvas/play_area/label_congrat");o.utilsUI.fillLabel(cc.find("label_word_of_the_day",n),e.correctWordArr[e.correctWordArr.length-1]),n.active=!1;var i=(t||this.elemContainerNode).children,r=e.letterString,a=(e.correctWordArr,r.split(""));i.map(function(e){t||o.control.bindCellTap(e);var n=a.shift()||"";o.utilsUI.fillLabel(cc.find("label",e),n),"@"==n&&(cc.find("label",e).active=!1),e.letter=n});var c=e.correctWordArr[e.correctWordArr.length-1].split("").pop(),l=o.gameMechanic.emptyCellNode=i.find(function(e){return e.letter==c});cc.find("bg",l).color=cc.Color.WHITE,l.zIndex=-1,l.isEmpty=!0},renderGrid:function(e,t){this.clearMap(t);var n=e.gridWidth,o=e.gridHeight;this.griCelldHeight=o;var r=cc.find("Canvas/sample_nodes/tile");this.cellSize=this.containerWidth/n,this.containerHeight=this.elemContainerNode.height=this.cellSize*o;for(var a=this.cellSize/r.width,c=o-1;c>-1;c--)for(var l=0;l<n;l++){var s=i.copyNode(r,t||this.elemContainerNode);s.cellPos=cc.v2(l,c),s.setPosition(this.getCellPos(l,c)),s.scale=a}},getCellPos:function(e,t){return cc.v2(e,t).mul(this.cellSize).add(cc.v2(this.cellSize/2-this.containerWidth/2,this.cellSize/2-this.containerHeight/2))}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],project_init_comp:[function(e,t,n){"use strict";cc._RF.push(t,"6a573g+HCdKnYr0iab16Em0","project_init_comp");var o,i=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),r=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a};Object.defineProperty(n,"__esModule",{value:!0});var a=e("../system/all_modules"),c=(a._,a.$,cc._decorator),l=c.ccclass,s=(c.property,function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.prototype.start=function(){window._G=a},t.prototype.onLoad=function(){for(var e in cc.game.on(cc.game.EVENT_SHOW,function(){return a.appEvents.onAppShow()}),cc.game.on(cc.game.EVENT_HIDE,function(){return a.appEvents.onAppHide()}),a)a[e].init&&a[e].init()},r([l],t)}(cc.Component));n.default=s,cc._RF.pop()},{"../system/all_modules":"all_modules"}],settings:[function(e,t,n){"use strict";cc._RF.push(t,"47b954QQ/RNPrn+v8nMvQ+H","settings"),Object.defineProperty(n,"__esModule",{value:!0}),n.settings=void 0;var o=e("../system/all_modules");o._,o.$,n.settings={node:null,sound:!0,music:!0,isInitialized:!1,init:function(){},bindSwitcherButtonHandlers:function(){var e=this;[cc.find("switcher_sound",this.entryContainerNode),cc.find("switcher_music",this.entryContainerNode)].map(function(t){o.utilsUI.makeButton(t,function(){var n=t.name.replace("switcher_","");e.setEntryValue(n,!e[n])})})},setEntryValue:function(e,t){this[e]=t,this.setSwitcherOnOff(e,t),"music"==e&&(t?o.audio.playBgMusic():o.audio.stopBgMusic())},setSwitcherOnOff:function(e,t){var n=cc.find("switcher_"+e,this.entryContainerNode);n&&o.utilsUI.showOnlyChildNodeWithNameAs(n,t?"on":"off")}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],tutorial:[function(e,t,n){"use strict";cc._RF.push(t,"9fa024zMbVB+Lq+UeHKKCS8","tutorial"),Object.defineProperty(n,"__esModule",{value:!0}),n.tutorial=void 0;var o=e("../system/all_modules");o._,o.$,n.tutorial={node:null,isShowingTut:!1,currentStep:0,init:function(){},start:function(){this.isShowingTut=!0,this.currentStep=1},onBtnContinue:function(){}},cc._RF.pop()},{"../system/all_modules":"all_modules"}],utils_anim_fx:[function(e,t,n){"use strict";cc._RF.push(t,"e273ec92dRLKKGQF99UI9/D","utils_anim_fx");var o=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var o=Array(e),i=0;for(t=0;t<n;t++)for(var r=arguments[t],a=0,c=r.length;a<c;a++,i++)o[i]=r[a];return o};Object.defineProperty(n,"__esModule",{value:!0}),n.utilsAnimFx=void 0;var i=e("../../system/all_modules"),r=i._;n.utilsAnimFx={fxNodePool:{},init:function(){},replayParticle:function(e){e&&e.getComponent(cc.ParticleSystem)&&(e.active=!0,e.getComponent(cc.ParticleSystem).resetSystem())},playNodeAnim:function(e,t,n,o,i){void 0===o&&(o=!1);var r=e.getComponent(cc.Animation);if(e.activeInHierarchy&&r&&(t=t||(r.defaultClip?r.defaultClip.name:""))){var a=r[o?"playAdditive":"play"](t);if(a)return a.repeatCount=(-1==n?1/0:n)||1,i&&r.on("finished",function(){r.off("finished"),i()}),a}},playNodeAnimAsSoonAsNodeActive:function(e,t,n,o){var i=this;void 0===n&&(n=1),void 0===o&&(o=!0);var a="waitInterval2PlayAnimWhenActive";e[a]=r.waitToRun(function(){e[a]&&clearInterval(e[a]),i.playNodeAnim(e,t,n,o)},"activeInHierarchy",e)},playNodeAnimArr:function(e,t,n,i){var r=this;if(void 0===n&&(n=!1),e.activeInHierarchy){var a=e.getComponent(cc.Animation);if(e.activeInHierarchy&&a){var c=o(t);a.on("finished",function(){c.length?r.playNodeAnim(e,c.shift(),1,n):(a.off("finished"),i&&i())}),this.playNodeAnim(e,c.shift(),1,n)}}},stopAllNodeAnims:function(e){var t=e.getComponent(cc.Animation);t&&(t.stop(),t.off("finished"))},stopAnimAtFrame0:function(e){var t=this,n=e.getComponent(cc.Animation);n.play("ufo_ring_fx"),r.setTimeout(function(){n.setCurrentTime(0),t.stopAllNodeAnims(e)})},playIncreasingNumberLabel:function(e,t,n,o,i,a,c){void 0===o&&(o=5),void 0===i&&(i=.5),void 0===a&&(a=0),void 0===c&&(c="xxx");var l=e.getComponent(cc.Label),s=n/o,u=i/o;cc.tween(e).delay(a).repeat(o,cc.tween().call(function(){t+=s;var e=r.formatMoney(r.round(t));l.string=c.replace(/xxx/g,e)}).delay(u)).start()},getNewFxNode:function(e,t){e.nodePoolId||(e.nodePoolId=r.getNewUuid()),this.fxNodePool[e.nodePoolId]||(this.fxNodePool[e.nodePoolId]=[]);var n=this.fxNodePool[e.nodePoolId].pop()||r.copyNode(e);return n.nodePoolId=e.nodePoolId,n.parent=t||i.coreFX.fxContainer,n},saveFxNodeToPool:function(e){e.stopAllActions(),e.active=!1,this.fxNodePool[e.nodePoolId].unshift(e)},particlesFlyFromA2B:function(e,t,n,o,i){for(var a=this,c=o||{numberOfNode:20,delayStartTime:.05,flyDuration:1,randomBezierPointRange:{x:200,y:200}},l=c.numberOfNode,s=c.flyDuration,u=c.delayStartTime,d=c.randomBezierPointRange,f=r.getGlobalPosDiff(t,n),p=function(n){var o=m.getNewFxNode(e,i);o.active=!0,o.opacity=255,r.setGlobalPosToNode(o,t);var c=m.getRandomPointInRage(d),l=m.getRandomPointInRage(d);cc.tween(o).delay(n*u).bezierBy(s,c,l,f).call(function(){a.saveFxNodeToPool(o)}).start()},m=this,_=0;_<l;_++)p(_)},getRandomPointInRage:function(e){return cc.v2(r.randomNumber(2*e.x)-e.x,r.randomNumber(2*e.y)-e.y)},nodeFlyFromAtoB:function(e,t,n,o){void 0===n&&(n=.3);var i=r.getGlobalPosDiff(e,t);cc.tween(e).by(n,{position:i}).call(function(){return o&&o()}).start()},captureNodeToTexture:function(e){e.activeInHierarchy||(e.active=!0);var t=new cc.Node;e.addChild(t);var n=t.addComponent(cc.Camera),o=new cc.RenderTexture,i=cc.game._renderContext;o.initWithSize(e.width,e.height,i.STENCIL_INDEX8),n.targetTexture=o,n.zoomRatio=1.3,n.backgroundColor=cc.Color.WHITE,n.clearFlags=cc.Camera.ClearFlags.DEPTH|cc.Camera.ClearFlags.STENCIL|cc.Camera.ClearFlags.COLOR;var r=o.width,a=o.height,c=document.createElement("canvas");c.width=r,c.height=a;var l=c.getContext("2d");n.render(e);for(var s=o.readPixels(),u=4*r,d=0;d<a;d++){var f=a-1-d,p=new Uint8ClampedArray(s.buffer,f*r*4,u),m=new ImageData(p,r,1);l.putImageData(m,0,d)}var _=c.toDataURL("image/jpeg");return setTimeout(function(){e.active=!1,t.removeFromParent()},1e3),_}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}],utils_common:[function(e,t,n){"use strict";cc._RF.push(t,"38328hs45lM85Ud0D0XUutA","utils_common");var o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},i=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var o=Array(e),i=0;for(t=0;t<n;t++)for(var r=arguments[t],a=0,c=r.length;a<c;a++,i++)o[i]=r[a];return o};Object.defineProperty(n,"__esModule",{value:!0}),n._=n.$=void 0;var r=e("../../system/all_modules"),a=e("./utils_time"),c=e("./utils_coordinate"),l=1e5;n.$=function(e,t){void 0===t&&(t=0),n._.$callCount=(n._.$callCount||0)+1,e.name!=r.types.elem.card&&(t=0);var o=e["props_"+t]||{};return e["props_"+t]=o},n.$.clean=function(e,t){void 0===t&&(t=0),0!=t&&delete e["props_"+t]},n._=o(o({NO_CONSOLE_LOG:!1,isANDROID:cc.sys.os==cc.sys.OS_ANDROID,isIOS:cc.sys.os==cc.sys.OS_IOS,max:Math.max,min:Math.min,round:Math.round,floor:Math.floor,ceil:Math.ceil,sign:Math.sign,abs:Math.abs,pow:Math.pow,random:Math.random,sqrt:Math.sqrt,sin:Math.sin,cos:Math.cos,tan:Math.tan,atan:Math.atan,atan2:Math.atan2,log10:Math.log10,PI:Math.PI,randomArrItem:function(e,t){void 0===t&&(t=!1);var n=Math.floor(Math.random()*e.length);return t?e.splice(n,1)[0]:e[n]},isString:function(e){return"string"==typeof e},isFunction:function(e){return e&&"[object Function]"==={}.toString.call(e)},log:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];if(!this.NO_CONSOLE_LOG)try{console.log.apply(console,e)}catch(n){}},getNewUuid:function(){return l++},removeArrayItem:function(e,t){var n=e.indexOf(t);-1!=n&&e.splice(n,1)},addUniqueElemToArr:function(e,t){e.includes(t)||e.push(t)},randomNumber:function(e){return n._.floor(n._.random()*e)},shuffleArray:function(e,t){var n=this;void 0===t&&(t=!1);var o=t?i(e):e;return o.sort(function(){return n.random()>.5?1:-1}),o},directionVec2:function(){return{top:cc.v2(0,1),bottom:cc.v2(0,-1),left:cc.v2(-1,0),right:cc.v2(1,0)}},reservedDir:function(e){return{top:"bottom",bottom:"top",left:"right",right:"left"}[e]},getGlobalPos:function(e){return e.convertToWorldSpaceAR(cc.Vec2.ZERO)},getGlobalPosDiff:function(e,t){return this.getGlobalPos(t).sub(this.getGlobalPos(e))},setGlobalPosToNode:function(e,t){var n=this.getGlobalPos(t),o=e.parent.convertToNodeSpaceAR(n);e.setPosition(o)},setGlobalPos:function(e,t){var n=e.parent.convertToNodeSpaceAR(t);e.setPosition(n)},moveToNewParentKeepPosition:function(e,t){var n=t.convertToNodeSpaceAR(this.getGlobalPos(e));e.parent=t,e.setPosition(n)},isGlobalOverlapping:function(e,t){return cc.Intersection.rectRect(e.getBoundingBoxToWorld(),t.getBoundingBoxToWorld())},getBezierPointFunc:function(e){return function(t){for(var n=e;n.length>1;n=r)for(var o,i=0,r=[];i<n.length-1;i++)for(r[i]=[],o=0;o<n[i].length;o++)r[i][o]=n[i][o]*(1-t)+n[i+1][o]*t;return n[0]}},copyNode:function(e,t){var n=cc.instantiate(e);return t&&(n.parent=t),n},setOrgProp:function(e,t){var n=this,o=["x","y","width","height","opacity"];if(t&&this.addUniqueElemToArr(o,t),o.map(function(t){var o="org"+n.capitalize(t);e[o]=e.hasOwnProperty(o)?e[o]:e[t]}),t)return e["org"+this.capitalize(t)]},getNodePath:function(e){for(var t=[e.name],n=e.parent,o=0;n&&o++<50&&n.parent;)t.push(n.name),n=n.parent;return t.reverse().join("/")},nodeConnect2Points:function(e,t,o){var i=o.sub(t);e.height=i.mag(),e.setPosition(t.add(i.mul(.5))),e.angle=90+n._.radianToDegrees(n._.atan2(i.y,i.x))},getNodeDistance:function(e,t){return this.getGlobalPosDiff(e,t).mag()},radianToDegrees:function(e){return 180*e/Math.PI},degreesToRadian:function(e){return e*Math.PI/180},vec2ToAngle:function(e){return n._.radianToDegrees(n._.atan2(e.y,e.x))},formatTime:function(e){var t=n._.floor(e/3600),o=n._.floor(e%3600/60),i=e%3600%60;return t<10&&(t="0"+t),o<10&&(o="0"+o),i<10&&(i="0"+i),t+":"+o+":"+i},formatMoney:function(e){var t=n._.floor(Math.log10(e))+1;if(t<=6)return e.toLocaleString();var o,i=n._.floor((t-1)/3);return o=i-2<=3?["K","M","B","T"][i-2]:String.fromCharCode((i-6)/26+"a".charCodeAt(0))+String.fromCharCode((i-6)%26+"a".charCodeAt(0)),n._.round(e/n._.pow(10,3*(i-1))).toLocaleString()+o},capitalize:function(e){var t=i(e);return t[0]=t[0].toUpperCase(),t.join("")},getInRange:function(e,t,o){return n._.min(n._.max(e,t),o)}},a.default),c.default),cc._RF.pop()},{"../../system/all_modules":"all_modules","./utils_coordinate":"utils_coordinate","./utils_time":"utils_time"}],utils_coordinate:[function(e,t,n){"use strict";cc._RF.push(t,"5df86zHog5HcqIKMKzmLV+k","utils_coordinate"),Object.defineProperty(n,"__esModule",{value:!0}),e("../../system/all_modules").$;var o=e("./utils_common");n.default={isVecHorz:function(e){return o._.abs(e.x)>o._.abs(e.y)},getPointRanges:function(e){var t=99999999,n=99999999,i=-99999999,r=-99999999;return e.map(function(e){t=o._.min(t,e.x),n=o._.min(n,e.y),i=o._.max(i,e.x),r=o._.max(r,e.y)}),{minX:t,minY:n,maxX:i,maxY:r}},distance2polygon:function(e,t){function n(e,t,n){var o,i,r=e.x,a=e.y,c=t.x,l=t.y,s=n.x,u=n.y,d=s-c,f=u-l,p=d*d+f*f,m=-1;0!=p&&(m=((r-c)*d+(a-l)*f)/p),m<0?(o=c,i=l):m>1?(o=s,i=u):(o=c+m*d,i=l+m*f);var _=r-o,h=a-i;return Math.sqrt(_*_+h*h)}return t.map(function(o,i){var r=t[i+1]||t[0];return n(e,o,r)}).sort(function(e,t){return e>t?1:-1})[0]}},cc._RF.pop()},{"../../system/all_modules":"all_modules","./utils_common":"utils_common"}],utils_data:[function(e,t,n){"use strict";cc._RF.push(t,"55e17+IhfZAOKUumwaKfgIH","utils_data"),Object.defineProperty(n,"__esModule",{value:!0}),n.utilsData=void 0;var o=e("../../system/all_modules");o._,o.$,n.utilsData={save:function(e,t){for(var n in e)localStorage.setItem(n,JSON.stringify(e[n]));setTimeout(function(){t&&t()},300)},load:function(e,t){var n={};e.map(function(e){if(null!==localStorage.getItem(e))try{n[e]=JSON.parse(localStorage.getItem(e))}catch(t){console.warn(" utilsData.load() >> Error  data key = "+e+" ",t)}}),t&&setTimeout(function(){return t(n)},100)}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}],utils_time:[function(e,t,n){"use strict";cc._RF.push(t,"f9b241Zt2BFFa5XMWEu3uey","utils_time"),Object.defineProperty(n,"__esModule",{value:!0}),e("../../system/all_modules").$;var o=1e5;n.default={getMsPassedUTC:function(){return(new Date).getTime()},getMsPassedPT:function(){var e=this.getPacificTimeOffset();return this.getMsPassedUTC()+36e5*e},getTimePT:function(e){void 0===e&&(e=new Date);var t=this.getPacificTimeOffset(e),n=e.getHours()+e.getTimezoneOffset()/60;return e.setHours(n+t),e},isSameDate:function(e,t){return e.getFullYear()==t.getFullYear()&&e.getMonth()==t.getMonth()&&e.getDate()==t.getDate()},getTotalMsToMidnightPT:function(){return 864e5-this.getMsPassedPT()%864e5},getDSTStartEndDate:function(e){var t=(e||new Date).getFullYear(),n=new Date(t,2,1),o=(7-n.getDay())%7,i=n.getDate()+o+7,r=new Date(t,2,i),a=new Date(t,10,1),c=(7-a.getDay())%7,l=a.getDate()+c;return[r,new Date(t,10,l)]},getPacificTimeOffset:function(e){var t=e||new Date,n=this.getDSTStartEndDate(),o=n[0],i=n[1];return t>o&&t<i?-7:-8},setTimeout:function(e,t){void 0===t&&(t=0);var n={_id:o++,__instanceId:o,callback:null};return n.callback=function(){e(n)},cc.director.getScheduler().schedule(n.callback,n,t/1e3,0,0,!1),n},clearTimeout:function(e){e&&e._id&&e.callback&&cc.director.getScheduler().unschedule(e.callback,e)},setInterval:function(e,t){void 0===t&&(t=0);var n={_id:o++,__instanceId:o,callback:null};return n.callback=function(){e(n)},cc.director.getScheduler().schedule(n.callback,n,t/1e3,cc.macro.REPEAT_FOREVER,0,!1),n},clearInterval:function(e){e&&e._id&&e.callback&&cc.director.getScheduler().unschedule(e.callback,e)},addPseudoUpdateFunc:function(e){var t=this,n=this.getMsPassedUTC();return this.setInterval(function(){var o=t.getMsPassedUTC(),i=o-n;n=o,e(i)},.01)},secondsToTimeCountdown:function(e){if(void 0===e&&(e=0),e<=0)return"0:00";var t=Math.floor(e/86400),n=Math.floor(e%86400/3600),o=Math.floor(e%3600/60),i=e%60;if(t>2)return t+" days";if(1==t)return"1 day";var r="";return n>0&&(r=n+":"),(r+=o+":")+(i>=10?i:"0"+i)},waitToRun:function(e,t,n,o,i,r){void 0===n&&(n=window),void 0===o&&(o=.1);var a=!1,c=t.startsWith("!"),l=t.endsWith("()");t=t.replace("!","").replace("()","");var s,u=l?function(){return n[t]()}:null,d=function(){if(c){if(l){if(u())return}else if(n[t])return}else if(l){if(!u())return}else if(!n[t])return;return clearInterval(s),a=!0,e(n[t]),!0};return d()?s:(s=setInterval(d,1e3*o),i&&this.setTimeout(function(){clearInterval(s),r&&!a&&r()},1e3*i),s)}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}],utils_ui:[function(e,t,n){"use strict";cc._RF.push(t,"fac22cBTNdDypWs3FUVCI/a","utils_ui"),Object.defineProperty(n,"__esModule",{value:!0}),n.utilsUI=void 0;var o=e("../../system/all_modules"),i=o._,r=(o.$,{touchstart:[],touchmove:[],touchend:[]});n.utilsUI={init:function(){},fillLabel:function(e,t){(e.getComponent(cc.Label)||e.getComponent(cc.RichText)).string=t},fillChildLabelByPath:function(e,t,n){var o=cc.find(t,e);o&&this.fillLabel(o,n)},showOnlyChildNodeWithNameAs:function(e,t,n){var o;return void 0===n&&(n=!1),e.children.map(function(e){var i=e.name==t;i&&(o=e),e.active=i,n&&(e.opacity=i?255:0)}),o},setLabelCountDownTimer:function(e,t,n){"string"==typeof e&&(e=cc.find(e)),e.countDownTimerVar&&clearInterval(e.countDownTimerVar);var r=function(){if(!e.parent)return clearInterval(e.countDownTimerVar);var r=t-i.getMsPassedUTC(),a=i.secondsToTimeCountdown(i.floor(r/1e3));o.utilsUI.fillLabel(e,a),r<=0&&(clearInterval(e.countDownTimerVar),n&&n())};e.countDownTimerVar=setInterval(r,500),r()},setNodeSprite:function(e,t){e&&e.getComponent(cc.Sprite)&&(e.getComponent(cc.Sprite).spriteFrame=t)},setNodeSpriteFromUrl:function(e,t,n){var o=this;e&&e.getComponent(cc.Sprite)&&cc.assetManager.loadRemote(t,function(t,i){return t||o.setNodeSprite(e,new cc.SpriteFrame(i)),n&&n(i)})},setNodeSpriteFillRange:function(e,t){e&&e.getComponent(cc.Sprite)&&(e.getComponent(cc.Sprite).fillRange=t)},makeButton:function(e,t,n,a){var c=i.isString(e)?cc.find(e):e;i.setTimeout(function(){c||i.log("undefined node path = "+e),c.getComponent("free_button_comp")||c.addComponent("free_button_comp");var l=c.addComponent(cc.Button);l.transition=n?cc.Button.Transition.SCALE:null,l.zoomScale=e.buttonCompZoomScale||1.2;var s=new cc.Component.EventHandler;s.target=c,s.component="free_button_comp",s.handler="freeHandler",l.clickEvents.push(s),c.freeButtonHandlerFunc=function(){t(),a||o.audio.playSound("button_click"),r.touchstart.map(function(e){return e()})}})},makeBubbleButton:function(e,t){return this.makeButton(e,t,!0)},singleTouchSet:function(e,t,n,o){var i=function(e,t,n){e(t.touch.getLocation(),t,n)};e.on("touchstart",function(n){e._customTouchId||(e._customTouchId=n.touch._id+1,t&&i(t,n,e._customTouchId))}),n&&e.on("touchmove",function(t){var o=t.touch._id+1;o==e._customTouchId&&n&&i(n,t,o)});var r=function(t){var n=t.touch._id+1;n==e._customTouchId&&(e._customTouchId=null,o&&i(o,t,n))};e.on("touchend",r),e.on("touchcancel",r)},bindCanvasTouchHandler:function(){var e=cc.find("Canvas");this.singleTouchSet(e,function(e){r.touchstart.map(function(t){return t(e)})},function(e){r.touchmove.map(function(t){return t(e)})},function(e){r.touchend.map(function(t){return t(e)})})},addCanvasTouchHandler:function(e,t){var n=r[e];n&&n.push(t)}},cc._RF.pop()},{"../../system/all_modules":"all_modules"}]},{},["control","game_flow","game_mechanic","level_generator","map_visual","settings","tutorial","audio","free_button_comp","utils_anim_fx","utils_common","utils_coordinate","utils_data","utils_time","utils_ui","all_modules","app_events","config_game","project_init_comp","bind_button_handlers","core_fx","core_ui"]);