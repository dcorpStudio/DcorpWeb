<%Response.ContentType="text/javascript"%>

//--- Detect IE family & Deal with
$.IE = ($.browser.msie)
$.IE6 = ($.browser.msie && $.browser.version=="6.0")

//--- Solve IE flickering Image
if ($.IE6){  try { document.execCommand("BackgroundImageCache", false, true); } catch(e) {}  }

//---Fast copy Object Position & Size
$.fn.CopyPos = function(obj){ $(this).css({'top':obj.offset().top, 'left':obj.offset().left}); return $(this); }
$.fn.CopySize = function(obj){ $(this).css({'height':obj.height()+'px', 'width':obj.width()+'px'}); return $(this); }

//---Return object's own html code
$.fn.outerHTML = function(){ return $('<div>').append( this.eq(0).clone() ).html() };


//---Solve the IE so-called : "Selectbox & Falsh Over everything" Problems
//----NOTE: This Function is Just Tested & Used for The D_MENU. Untested for Other purposes
$.fn.IE_Cover_Combo = function(){
	var Obj = $(this);
	if ($.IE && Obj.length && !Obj.children(".IE_Iframe_Cover_Combo").length ){
		var iframeFix = $('#IE_Iframe_Cover_Combo')
		Obj.css('display','block');	//Show the obj first to get the correct Width - height & then hide it
		var iframeFix = $('<iframe class="IE_Iframe_Cover_Combo" scrolling="no" marginheight="0" marginwidth="0" frameborder="0" style="background:#000; position:absolute; top:0px; left:0px; filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0); " src="javascript:\'<html></html>\'"></iframe>')
		iframeFix.CopySize( Obj )
		Obj.prepend(iframeFix)
		Obj.hide();
	}
	return $(this);
}


//----Cover the div with trans colored background image (for with damn IE6 only)
$.fn.IE6_Cover_TransBG = function(myColor, myOpacity){
	var Obj = $(this)
	if ($.IE6 && Obj.length && !Obj.children(".IE6_Cover_TransBG").length ){
		Obj.css('display','block');	//Show the obj first to get the correct Width - height & then hide it
		var myHero = '<div class="IE6_Cover_TransBG" style="display:block; position:absolute; top:0px; left:0px; background:'+myColor+
						'; opacity:'+myOpacity+';filter:alpha(opacity='+ 100*myOpacity +'); width:'+ Obj.width() +'; height:'+ Obj.height() +'; "></div>'
		Obj.hide();
		Obj.prepend(myHero);
	}
	return Obj;
}




