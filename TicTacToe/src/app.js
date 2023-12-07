// some globalvars
var Canvas;
var isTutShown = false;


var HelloWorldLayer = cc.Layer.extend({
   sprite: null,
   ctor: function () {
      this._super();
      var winSize = cc.winSize;
      var w2 = winSize.width / 2;
      var h2 = winSize.height / 2;
      Canvas = this;


      // =========================================
      // INITIALIZE NODES IN SCENE 
      // =========================================


      function renderElement(elemInfo, parentNode) {
         var elemComponents = elemInfo.node.components;
         var objType = 'Node';
         if (elemComponents.Sprite) objType = 'Sprite';
         if (elemComponents.Label) objType = 'Label';

         // -----------------
         // -----------------
         var elemNode;
         var size = elemInfo.node.size;

         if (objType == 'Node') {
            elemNode = new cc.Node();
         }

         else if (objType == 'Sprite') {
            var sprComp = elemComponents.Sprite;
            var spriteFrame = sprComp.spriteFrameName || '';

            var tmpArr = spriteFrame.split('/');
            spriteFrame = tmpArr[tmpArr.length - 1].replace('.png', '');
            // _log('namex ' + elemInfo.node.name + ' // spriteFrameName = ' + sprComp.spriteFrameName + '//  spriteFrame = ' + spriteFrame);

            var spriteType = sprComp.spriteType;


            if (spriteType == 'Simple') {
               elemNode = new cc.Scale9Sprite(res[spriteFrame]);
            }
            else if (spriteType == 'Sliced') {
               elemNode = new cc.Scale9Sprite(res[spriteFrame]);
               var insets = sprComp.spriteInsets;
               elemNode.setInsetTop(insets.top);
               elemNode.setInsetBottom(insets.bottom);
               elemNode.setInsetLeft(insets.left);
               elemNode.setInsetRight(insets.right);
            }

            else {
               elemNode = new cc.Sprite(res[spriteFrame]);
               elemNode.setTextureRect(cc.rect(0, 0, size.w, size.h));

               if (spriteType == 'Tiled') {
                  elemNode.getTexture().setTexParameters(cc.LINEAR, cc.LINEAR, cc.REPEAT, cc.REPEAT);
               }

               if (spriteType == 'Filled') {
                  if (sprComp.fillType == 'Horizontal') {
                     var fillStart = sprComp.fillStart * size.w;
                     var fillRange = sprComp.fillRange * size.w;
                     elemNode.setTextureRect(cc.rect(fillStart, 0, fillRange, size.h));
                  }
                  else if (sprComp.fillType == 'Vertical') {
                     var fillStart = sprComp.fillStart * size.h;
                     var fillRange = sprComp.fillRange * size.h;
                     elemNode.setTextureRect(cc.rect(0, fillStart, size.w, fillRange));
                  }
               }
            }
         }

         else if (objType == 'Label') {
            var fontComp = elemComponents.Label;
            var font = fontComp.fontName;
            if (font.indexOf('/') != -1) {
               var tmpArr = font.split('/');
               var tmpArr1 = tmpArr[tmpArr.length - 1].split('.');
               tmpArr1.pop();
               font = tmpArr1.join('.');
            }

            if (fontComp.fontType == 'System') {
               elemNode = new cc.LabelTTF(fontComp.string, font, fontComp.fontSize);
            } else if (fontComp.fontType == 'TTF') {
               font = cc.sys.isNative ? res[font] : font;
               // _log('font = ' + font + ' // fontComp.fontType = ' + fontComp.fontType);
               elemNode = new cc.LabelTTF(fontComp.string, font, fontComp.fontSize, cc.size(size.w + 30, 0), cc.TEXT_ALIGNMENT_CENTER);
            } else {
               elemNode = new cc.LabelBMFont(fontComp.string, res[font]);
            }
         }

         // -----------------
         // -----------------

         elemNode.name = elemInfo.node.name;
         parentNode.addChild(elemNode);
         elemNode.setCascadeOpacityEnabled(true);

         var color = elemInfo.node.color;
         if (color) elemNode.color = cc.color(color.r, color.g, color.b);

         var pos = elemInfo.node.position;
         // var anchorPoint = elemInfo.node.anchorPoint;
         var paddingX = (parentNode == Canvas) ? w2 : 0;
         var paddingY = (parentNode == Canvas) ? h2 : 0;
         // _log('size=' + size.w + ',' + size.h + ' - elemNode.width=' + elemNode.width + ' - elemNode.height=' + elemNode.height);
         elemNode.attr({
            scaleX: elemInfo.node.scale.x,
            scaleY: elemInfo.node.scale.y,
            width: size.w,
            height: size.h,
            x: pos.x + paddingX,
            y: pos.y + paddingY,
            // anchorX: anchorPoint.x,
            // anchorY: anchorPoint.y,
            rotation: elemInfo.node.rotation,
            opacity: elemInfo.node.opacity,
         });


         // render child elements
         for (var elemIndex in elemInfo.children) renderElement(elemInfo.children[elemIndex], elemNode);

      }


      function renderScene() {
         var elemArr = sceneJson.root.children[0].children;
         for (var elemIndex in elemArr) {
            var elemInfo = elemArr[elemIndex];
            if (!elemInfo.node.name == 'Main Camera') continue;
            renderElement(elemInfo, Canvas);
            // _log(elemInfo);
         }
      }


      try {
         renderScene();
         initLayout();
         initGame();

      } catch (e) {
         cc.log('cocos errrrooorrrrrrrrrrr ');
         cc.log(e);
      }

      // =========================================
      // =========================================
      // =========================================


      return true;
   }
});


var HelloWorldScene = cc.Scene.extend({
   onEnter: function () {
      this._super();
      var layer = new HelloWorldLayer();
      this.addChild(layer);
   }
});
