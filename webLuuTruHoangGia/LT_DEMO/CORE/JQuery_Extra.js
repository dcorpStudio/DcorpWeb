


/*======================================================================================
 Additional part, edited by ME
=======================================================================================*/
//--- Detect IE family & Deal with
$.IE = ($.browser.msie)
$.IE6 = ($.browser.msie && $.browser.version=="6.0")
$.IE7 = ($.browser.msie && $.browser.version=="7.0")
$.SAFARI = /safari/.test( navigator.userAgent.toLowerCase() );	//including safari & chrome
$.OPERA = /opera/.test ( navigator.userAgent.toLowerCase() );	//check if opera

$.IE6_Cover = 0 //-- INFACT, in StrictMode IE6 just make selectbox overlay floatDiv only (Neither Iframe nor Flash(wmode=transparent) over it anymore)
				//-- So, if U decide not to use selectbox (& use a custom control instead, U don't Need to cover IE6)

//--- Solve IE flickering Image
if ($.IE6){  try { document.execCommand("BackgroundImageCache", false, true); } catch(e) {}  }

//-- Solve the OPERA Special scrolling problem with (class="box" or, exactly with css pseudo class :after & :before) (u can test this by scroll a container-div width class="box" +overflow:auto +an oversized content in OPERA )
if ($.OPERA){$(function(){
	$('.box').append('<sup style="display:block; height:0px; width:0px; float:none; clear:both; visibility:hidden;"></sup>')
})}

//---Fast copy Object Position & Size
$.fn.CopyPos = function(obj){ $(this).css({'top':obj.position().top+'px', 'left':obj.position().left+'px'}); return $(this); }
$.fn.CopySize = function(obj){ $(this).fitH(obj.outerHeight()).width(obj.outerWidth()); return $(this); }

//--- pseudo submit - reset button. Fuck IE6 button styling !
$('.submit').live('click',function(){ $(this).parents('form').submit()})
$('.reset').live('click',function(){ $(this).parents('form')[0].reset()})

//-- calculate the diffence between realWidth & outerWidth, realHeight & outerHeight
$.fn.oWidth = function(){ if ($.SAFARI){var Org_Float=$(this).css('float'); $(this).css('float','left'); var Safari_W = $(this).outerWidth(true); $(this).css('float',Org_Float); }; return Safari_W || $(this).outerWidth(true) }
$.fn.iWidth = function(){ if ($.SAFARI){var Org_Float=$(this).css('float'); $(this).css('float','left'); var Safari_W = $(this).innerWidth(true); $(this).css('float',Org_Float); }; return Safari_W || $(this).innerWidth() }
$.fn.coverWidth = function(){ return ($(this).oWidth()) - $(this).width() }
$.fn.coverHeight = function(){return $(this).outerHeight(true)-$(this).height() }

//-- resize an object to fit the container
$.fn.fitW = function(w){ w=w||($(this).first().parent().width()); $(this).width(w-$(this).coverWidth()); return $(this); }
$.fn.fitH = function(h){ h=h||($(this).first().parent().height()); $(this).height(h-$(this).coverHeight()); return $(this); }
$.fn.fitSize = function(parentObj){ parentObj=parentObj||$(this).first().parent(); $(this).fitW(parentObj.width()); $(this).fitH(parentObj.height()); return $(this); }

//--Increase Width & Height
$.fn.increaseH = function(x){ $(this).height($(this).height()+x) }
$.fn.increaseW = function(x){ $(this).width($(this).width()+x) }
$.fn.increaseX = function(x,y){ $(this).css(x, parseInt($(this).css(x)||'0')+y+'px') }

//-- set line-height to a value or equal the height()
$.fn.valignMiddle=function(h){$(this).css('line-height', (h||$(this).height())+'px' ); return $(this) }




//-- Solve the IE so-called : "Selectbox & Falsh Over everything" Problems
//-- this's only lemma for the floatDiv_Model, Do not use this with any other purpose

$.fn.IE_Cover_Div = function(){
	var Obj=$(this); if ($.IE && Obj.length && !Obj.prev(':eq(0)').hasClass("IE_Iframe_Cover_Combo") ){
		Obj.css('display','block');	//Show the obj first to get the correct Width - height & then hide it
		var iframeFix = $('<iframe class="IE_Iframe_Cover_Combo" scrolling="no" marginheight="0" marginwidth="0" frameborder="0" style="height:10px; background:#000; position:absolute; top:0px; left:0px; filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=100); " src="javascript:\'<html></html>\'"></iframe>')
		Obj.before(iframeFix); iframeFix.CopyPos(Obj).CopySize(Obj); Obj.hide(); iframeFix.hide();
	}; return $(this);
}


/******* Support Float-Div toggle
 explanation : use calendar control for example, when u click the calendarIcon, u want the popup-calendar (the floatDiv) to be showed (or toggle)
 when u click the outer body, u want popup-Calendar to be hidden. When u click on the Calendar itself, u want it to still displayin'
 But : when u click any html-element, u click the the body too. The below code help u to deal with both 3 objects: toggleIcon, floatDiv & the Body ***/

/*** There's a way to temporarily prevent htmlClick to hide the floatDiv, that is to set $.temporaryUnhide_floatDiv = 1 ***/

$.fn.floatDiv_Model = function(toggleIcon, toggleMethod, duration, callBackFunc ){
	if ($.IE6 && $.IE6_Cover){ $(this).IE_Cover_Div() }

	//-- choose the toggle method
	toggleMethod = toggleMethod || 'toggle'; if($.IE6){toggleMethod='toggle'; duration=0;} //--IE6 toggle effect with duration >=0 all makes the div[overflow:auto] lost it's scrollbar. But in this Project, i used the Custom-scrollbar.
	switch (toggleMethod){
		case 'toggle'	   : var hideFunc='hide'; break;
		case 'slideToggle' : var hideFunc='slideUp'; break;
		case 'fadeToggle'  : var hideFunc='fadeOut'; break;
	}

	//-- we need to change floatDiv's parent's z-index while showing/hiding it
	var org_zIndex = parseInt( $(this).parent().css('z-index') || 1 ); $(this).data('org_zIndex',org_zIndex)

	//-- bind event func
	var X = $(this); X.addClass('dcorp_pleaseHideMe'); X.data('hideFunc',hideFunc).data('duration',duration).data('toggleIcon',toggleIcon).data('callBackFunc',callBackFunc)
	X.hover(function(){ $(this).removeClass('dcorp_pleaseHideMe')}, function(){ if (!toggleIcon.isMouseOver) $(this).addClass('dcorp_pleaseHideMe') })
	$(toggleIcon).hover(function(){ toggleIcon.isMouseOver=1; X.removeClass('dcorp_pleaseHideMe')}, function(){ toggleIcon.isMouseOver=0; X.addClass('dcorp_pleaseHideMe') })
		.click(function(){
			if (!$.temporaryUnhide_floatDiv){
				X.parent().css('z-index', org_zIndex+ (X.is(':visible')?0:1) );
				if($.IE6 && $.IE6_Cover){X.prev(':eq(0)')[X.is(':visible')?'hide':'show']()};
				X[toggleMethod](duration,callBackFunc);
			}
		})
}

$('html').click(function(){
	if (!$.temporaryUnhide_floatDiv){
		$('.dcorp_pleaseHideMe').each(function(){
			$(this)[$(this).data('hideFunc') || 'hide']($(this).data('duration'),$(this).data('callBackFunc'))
			$(this).parent().css('z-index',$(this).data('org_zIndex'))
			if ($.IE6 && $.IE6_Cover){$(this).prev(':eq(0)').hide()} //-- hide iframefix
		})
	}
})


//-- Disable selection for a text object
jQuery.fn.extend({ 
	disableSelection : function() { 
		this.each(function() { 
				this.onselectstart = function() { return false; }; 
				this.unselectable = "on"; 
				jQuery(this).css('-moz-user-select', 'none'); 
		});
	} 
});


//--- some dateTime function

function monthName(x){ return ['January','February','March','April','May','June','July','August','September','October','November','December'][x]}
function toStdDate(x){ return x.getDate()+' '+monthName(x.getMonth())+' '+x.getFullYear() }
function expectDate(x,dfVal){ x=new Date(x); return isNaN(x)?(new Date(dfVal||'')):x }
function dateAdd(d,unit,amount){ var x={s:'Seconds',n:'Minutes',h:'Hours',d:'Date',m:'Month',y:'FullYear'}; d=d['set'+x[unit]](d['get'+x[unit]]()+amount); return new Date(d) }
function dcorp_vdate(x){ x=expectDate(x,dcorp_now); return x.getDate()+'/'+(x.getMonth()+1)+'/'+x.getFullYear() }
function vdate_to_std(x){ if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(x)){return ''}; x=x.split('/'); return x[0]+' '+monthName(x[1]-1)+' '+x[2]  }
var dcorp_now = new Date()


//-- get the parseInt of Border & Padding & Margin
$.fn.xBorder = function(x){ return parseInt($(this).css( 'border-'+(x||'top')+'-width' )) }
$.fn.xPadding = function(x){ return parseInt($(this).css( 'padding-'+(x||'top') )) }


//-- Temporarily chaneg element CSS (& Store original CSSText in data, for ready to Restore )
//-- Note, input for the temCSS() function must be Object {}
$.fn.temCSS = function(a){ var x=$(this); if(!x.data('orgCSS')){x.data('orgCSS',x.attr('style'))}; x.css(a); return $(this) }
$.fn.restoreCSS = function(){ var x=$(this); var t=x.css('top'); var l=x.css('left'); $(this).attr('style' ,$(this).data('orgCSS')||'').css({top:t,left:l}); return $(this) }


//--Clone Object
function dcorp_ObjectClone(x){
	var newObj = (x instanceof Array) ? [] : {};
	for (i in x) {
	if (x[i] && typeof x[i] == "object") {
	  newObj[i] = dcorp_ObjectClone(x[i]);
	} else newObj[i] = x[i]
	} return newObj;
};



//-- calculate the total height of some object
$.fn.totalHeight = function(){ var h=0; $(this).each(function(){ h+= $(this).outerHeight(true) }); return h; }
$.fn.totalWidth = function(){ var h=0; $(this).each(function(){ h+= $(this).outerWidth(true) }); return h; }

// Read a page's GET URL variables and return them as an associative array.
function Request(x){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars[x];
}



//get document's height
$.viewport = function(){
	var viewportwidth;
	var viewportheight;
	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != 'undefined'){
	  viewportwidth = window.innerWidth,
	  viewportheight = window.innerHeight
	}

	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else if (typeof document.documentElement != 'undefined'	 && typeof document.documentElement.clientWidth !=  'undefined' && document.documentElement.clientWidth != 0){
	   viewportwidth = document.documentElement.clientWidth,
	   viewportheight = document.documentElement.clientHeight
	}else{// older versions of IE
	   viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
	   viewportheight = document.getElementsByTagName('body')[0].clientHeight
	}
	return {w:viewportwidth, h:viewportheight}
}


function getPageCoords (element) {
	var coords = {x: 0, y: 0};
	while (element) {
		coords.x += element.offsetLeft;
		coords.y += element.offsetTop;
		element = element.offsetParent;
	}; return coords;
}