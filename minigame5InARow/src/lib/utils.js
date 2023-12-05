function _log(s) {
   if (cc.sys.isNative) return;
   console.log(s);
}


function isVisible(node) {
   var safeCount = 100;
   while (node && safeCount--) {
      if (!node.visible) return false;
      node = node.parent;
   };
   return true;
}



function _ccFind(nodePath, parentNode) {
   var nameArr = nodePath.split('/');
   var currentNode = parentNode || Canvas;
   for (var i = 0; i < nameArr.length; i++) {
      var name = nameArr[i];
      var found = false;
      for (var j = 0; j < currentNode.children.length; j++) {
         if (name == currentNode.children[j].name) {
            currentNode = currentNode.children[j];
            found = true;
            break;
         }
      }
      if (!found) return;
   }
   return currentNode;
}



// =======================================================================
// =======================================================================


function bindButton(node, onTouchBegan, onTouchMoved, onTouchEnded, isPropagated) {
   var eventListener = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: !isPropagated,
      // swallowTouches: false,
      onTouchBegan: function (touch, event) {
         if (!isVisible(node)) return false;
         var location = touch.getLocation();
         var target = event.getCurrentTarget();
         var locationInNode = target.convertToNodeSpace(location);
         var s = target.getContentSize();
         var rect = cc.rect(0, 0, s.width, s.height);

         if (cc.rectContainsPoint(rect, locationInNode)) {
            if (onTouchBegan) onTouchBegan(node, location, locationInNode);
            return true;
         }
         return false;
      },

      onTouchMoved: function (touch, event) {
         if (!isVisible(node)) return false;
         var delta = touch.getDelta();
         if (onTouchMoved) onTouchMoved(node, touch.getLocation(), delta);
         return true;
      },

      onTouchEnded: function (touch, event) {
         if (!isVisible(node)) return false;
         var location = touch.getLocation();
         var target = event.getCurrentTarget();
         var locationInNode = target.convertToNodeSpace(location);
         if (onTouchEnded) onTouchEnded(node, touch.getLocation(), locationInNode);
         return true;
      }
   });
   cc.eventManager.addListener(eventListener, node);
   node._evListenerVar = eventListener;
}

function unbindButton(node) {
   cc.eventManager.removeListener(node._evListenerVar, node);
}


function bindButtonBubble(node, onTouchBegan, onTouchMoved, onTouchEnded, isPropagated) {
   bindButton(
      node,
      function (node, location, locationInNode) {
         node.scale *= 1.1;
         if (onTouchBegan) onTouchBegan(node, location, locationInNode);
      },
      function (node, location, delta) {
         if (onTouchMoved) onTouchMoved(node, location, delta);
      },
      function (node, location) {
         node.scale /= 1.1;
         if (onTouchEnded) onTouchEnded(node, location);
      },
      isPropagated
   );
}


function bindDoubleTap(node, callback) {
   var interval = 300;  // milliseconds
   var lastMs = 0;
   bindButton(node, null, null, function (node, location, locationInNode) {
      var ms = (new Date).getTime();
      // _log('ms(' + ms + ') - lastMs(' + lastMs + ')  = (' + (ms - lastMs) + ')> interval')
      if (ms - lastMs > interval) return lastMs = ms;
      lastMs = 0;
      callback(locationInNode);
   });
}


// ==============================================================
// ==============================================================

