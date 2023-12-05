


/*======================================================================================
 Additional part, edited by ME
=======================================================================================*/
//--- Detect IE family & Deal with
$.IE = ($.browser.msie)
$.IE6 = ($.browser.msie && $.browser.version=="6.0")
$.IE7 = ($.browser.msie && $.browser.version=="7.0")
$.IE8 = ($.browser.msie && $.browser.version=="8.0")
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
$.fn.CopyPos_Offset = function(obj){ $(this).css({'top':obj.offset().top+'px', 'left':obj.offset().left+'px'}); return $(this); }
$.fn.CopySize = function(obj){ $(this).fitH(obj.oHeight()).width(obj.oWidth()); return $(this); }

//--- pseudo submit - reset button. Fuck IE6 button styling !
$('.submit').live('click',function(){ $(this).parents('form').submit()})
$('.reset').live('click',function(){ if(confirm('Bạn muốn xóa hết các thông tin đã điền ?')){ var F=$(this).parents('form:first'); if(F[0]) F[0].reset() }})

//-- calculate the diffence between realWidth & outerWidth, realHeight & outerHeight
$.fn.oHeight = function(){ return $(this).outerHeight(true) }
$.fn.oWidth = function(){ if ($.SAFARI){var Org_Float=$(this).css('float'); $(this).css('float','left'); var Safari_W = $(this).outerWidth(true); $(this).css('float',Org_Float); }; return Safari_W || $(this).outerWidth(true) }
$.fn.iWidth = function(){ if ($.SAFARI){var Org_Float=$(this).css('float'); $(this).css('float','left'); var Safari_W = $(this).innerWidth(true); $(this).css('float',Org_Float); }; return Safari_W || $(this).innerWidth() }
$.fn.coverWidth = function(){ return ($(this).oWidth()) - $(this).width() }
$.fn.coverHeight = function(){return $(this).outerHeight(true)-$(this).height() }

//-- calculate the total height of some object
$.fn.totalH = function(){ var h=0; $(this).each(function(){ h+= $(this).oHeight(true) }); return h; }
$.fn.totalW = function(){ var h=0; $(this).each(function(){ h+= $(this).oWidth(true) }); return h; }

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
			$(this)[$(this).data('hideFunc')]($(this).data('duration'),$(this).data('callBackFunc'))
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



//-- help input with value as intro text
$.fn.value_as_intro = function(){
	$(this).each(function(){
		$(this).data('saved_intro',$(this).val());
		$(this).click(function(){ if ($(this).data('saved_intro')==$(this).val()){ $(this).val('') } })
		.blur(function(){ if ($(this).val()==''){$(this).val( $(this).data('saved_intro') )}  })
	})
	return $(this);
}



//-- Capitalize first letter of word or phrase
function Capital(x){ return x.replace(/^(.)/, function(a,b){return b.toUpperCase()} ) }



//-- the useful dialogbox
function JDialog(content,Obj, width, left, top){
	if(!$('#JDialog').length){ $('body').append('<div style="position:absolute; width:'+(width||400)+'px; z-index:100; background:#555; float:left;" class="box" id="JDialog">'+
		'<a style="display:block;float:right; color:#fff; margin:2px; margin-right:5px; font-size:13px;" href="#close" onclick="$(this).parent().hide()">x</a>'+
		'<div style="font-size:0px; clear:both; width:"100%;"></div><div style="background:#fff; margin:2px;padding:10px; color:#000;" class="box"></div></div>')}
	var X=$('#JDialog'); $('div:last',X).html(content); var P=Obj.offset()
	X.show().css({ top: P.top+(top||70)+'px' , left: P.left+ (left || parseInt((Obj.oWidth()-X.oWidth())/2))+'px' });
	$('#JDialog .block_but').live('click',function(){ $('#JDialog').hide() })
}



//=======================
//----Color picker Plugin

//-- return an HTML color table with previewCell
function JColor_Palette(){

	$(function(){ $('head').append('<style> '+
		'div.JColor_Palette a{ width:'+($.IE?'11px':'10px')+';height:'+($.IE?'13px':'12px')+'; } '+
		'div.JColor_Palette span{float:left; width:'+($.IE?72:68)+'px;}'+
		'div.JColor_Palette {background:#fff; border:1px solid #fff; width:'+($.IE?216:204)+'px; position:absolute; z-index;130; display:none;}'+
	' </style>\n')})
	$(function(){  var X=$('.JColor_Palette a').height($.IE?13:12).not('.colorPicker_Preview').width($.IE?11:10)  })

	//============================USE GENERATED CODE INSTEAD OF GENERATING THE CODE EACH TIME

	var Code = '<div class="box JColor_Palette"><span class="box"><a href="#color" style="background:#000000"></a><a href="#color" style="background:#000033"></a><a href="#color" style="background:#000066"></a><a href="#color" style="background:#000099"></a><a href="#color" style="background:#0000cc"></a><a href="#color" style="background:#0000ff"></a><a href="#color" style="background:#003300"></a><a href="#color" style="background:#003333"></a><a href="#color" style="background:#003366"></a><a href="#color" style="background:#003399"></a><a href="#color" style="background:#0033cc"></a><a href="#color" style="background:#0033ff"></a><a href="#color" style="background:#006600"></a><a href="#color" style="background:#006633"></a><a href="#color" style="background:#006666"></a><a href="#color" style="background:#006699"></a><a href="#color" style="background:#0066cc"></a><a href="#color" style="background:#0066ff"></a><a href="#color" style="background:#009900"></a><a href="#color" style="background:#009933"></a><a href="#color" style="background:#009966"></a><a href="#color" style="background:#009999"></a><a href="#color" style="background:#0099cc"></a><a href="#color" style="background:#0099ff"></a><a href="#color" style="background:#00cc00"></a><a href="#color" style="background:#00cc33"></a><a href="#color" style="background:#00cc66"></a><a href="#color" style="background:#00cc99"></a><a href="#color" style="background:#00cccc"></a><a href="#color" style="background:#00ccff"></a><a href="#color" style="background:#00ff00"></a><a href="#color" style="background:#00ff33"></a><a href="#color" style="background:#00ff66"></a><a href="#color" style="background:#00ff99"></a><a href="#color" style="background:#00ffcc"></a><a href="#color" style="background:#00ffff"></a><div style="clear:both;"></div></span><span class="box"><a href="#color" style="background:#330000"></a><a href="#color" style="background:#330033"></a><a href="#color" style="background:#330066"></a><a href="#color" style="background:#330099"></a><a href="#color" style="background:#3300cc"></a><a href="#color" style="background:#3300ff"></a><a href="#color" style="background:#333300"></a><a href="#color" style="background:#333333"></a><a href="#color" style="background:#333366"></a><a href="#color" style="background:#333399"></a><a href="#color" style="background:#3333cc"></a><a href="#color" style="background:#3333ff"></a><a href="#color" style="background:#336600"></a><a href="#color" style="background:#336633"></a><a href="#color" style="background:#336666"></a><a href="#color" style="background:#336699"></a><a href="#color" style="background:#3366cc"></a><a href="#color" style="background:#3366ff"></a><a href="#color" style="background:#339900"></a><a href="#color" style="background:#339933"></a><a href="#color" style="background:#339966"></a><a href="#color" style="background:#339999"></a><a href="#color" style="background:#3399cc"></a><a href="#color" style="background:#3399ff"></a><a href="#color" style="background:#33cc00"></a><a href="#color" style="background:#33cc33"></a><a href="#color" style="background:#33cc66"></a><a href="#color" style="background:#33cc99"></a><a href="#color" style="background:#33cccc"></a><a href="#color" style="background:#33ccff"></a><a href="#color" style="background:#33ff00"></a><a href="#color" style="background:#33ff33"></a><a href="#color" style="background:#33ff66"></a><a href="#color" style="background:#33ff99"></a><a href="#color" style="background:#33ffcc"></a><a href="#color" style="background:#33ffff"></a><div style="clear:both;"></div></span><span class="box"><a href="#color" style="background:#660000"></a><a href="#color" style="background:#660033"></a><a href="#color" style="background:#660066"></a><a href="#color" style="background:#660099"></a><a href="#color" style="background:#6600cc"></a><a href="#color" style="background:#6600ff"></a><a href="#color" style="background:#663300"></a><a href="#color" style="background:#663333"></a><a href="#color" style="background:#663366"></a><a href="#color" style="background:#663399"></a><a href="#color" style="background:#6633cc"></a><a href="#color" style="background:#6633ff"></a><a href="#color" style="background:#666600"></a><a href="#color" style="background:#666633"></a><a href="#color" style="background:#666666"></a><a href="#color" style="background:#666699"></a><a href="#color" style="background:#6666cc"></a><a href="#color" style="background:#6666ff"></a><a href="#color" style="background:#669900"></a><a href="#color" style="background:#669933"></a><a href="#color" style="background:#669966"></a><a href="#color" style="background:#669999"></a><a href="#color" style="background:#6699cc"></a><a href="#color" style="background:#6699ff"></a><a href="#color" style="background:#66cc00"></a><a href="#color" style="background:#66cc33"></a><a href="#color" style="background:#66cc66"></a><a href="#color" style="background:#66cc99"></a><a href="#color" style="background:#66cccc"></a><a href="#color" style="background:#66ccff"></a><a href="#color" style="background:#66ff00"></a><a href="#color" style="background:#66ff33"></a><a href="#color" style="background:#66ff66"></a><a href="#color" style="background:#66ff99"></a><a href="#color" style="background:#66ffcc"></a><a href="#color" style="background:#66ffff"></a><div style="clear:both;"></div></span><span class="box"><a href="#color" style="background:#990000"></a><a href="#color" style="background:#990033"></a><a href="#color" style="background:#990066"></a><a href="#color" style="background:#990099"></a><a href="#color" style="background:#9900cc"></a><a href="#color" style="background:#9900ff"></a><a href="#color" style="background:#993300"></a><a href="#color" style="background:#993333"></a><a href="#color" style="background:#993366"></a><a href="#color" style="background:#993399"></a><a href="#color" style="background:#9933cc"></a><a href="#color" style="background:#9933ff"></a><a href="#color" style="background:#996600"></a><a href="#color" style="background:#996633"></a><a href="#color" style="background:#996666"></a><a href="#color" style="background:#996699"></a><a href="#color" style="background:#9966cc"></a><a href="#color" style="background:#9966ff"></a><a href="#color" style="background:#999900"></a><a href="#color" style="background:#999933"></a><a href="#color" style="background:#999966"></a><a href="#color" style="background:#999999"></a><a href="#color" style="background:#9999cc"></a><a href="#color" style="background:#9999ff"></a><a href="#color" style="background:#99cc00"></a><a href="#color" style="background:#99cc33"></a><a href="#color" style="background:#99cc66"></a><a href="#color" style="background:#99cc99"></a><a href="#color" style="background:#99cccc"></a><a href="#color" style="background:#99ccff"></a><a href="#color" style="background:#99ff00"></a><a href="#color" style="background:#99ff33"></a><a href="#color" style="background:#99ff66"></a><a href="#color" style="background:#99ff99"></a><a href="#color" style="background:#99ffcc"></a><a href="#color" style="background:#99ffff"></a><div style="clear:both;"></div></span><span class="box"><a href="#color" style="background:#cc0000"></a><a href="#color" style="background:#cc0033"></a><a href="#color" style="background:#cc0066"></a><a href="#color" style="background:#cc0099"></a><a href="#color" style="background:#cc00cc"></a><a href="#color" style="background:#cc00ff"></a><a href="#color" style="background:#cc3300"></a><a href="#color" style="background:#cc3333"></a><a href="#color" style="background:#cc3366"></a><a href="#color" style="background:#cc3399"></a><a href="#color" style="background:#cc33cc"></a><a href="#color" style="background:#cc33ff"></a><a href="#color" style="background:#cc6600"></a><a href="#color" style="background:#cc6633"></a><a href="#color" style="background:#cc6666"></a><a href="#color" style="background:#cc6699"></a><a href="#color" style="background:#cc66cc"></a><a href="#color" style="background:#cc66ff"></a><a href="#color" style="background:#cc9900"></a><a href="#color" style="background:#cc9933"></a><a href="#color" style="background:#cc9966"></a><a href="#color" style="background:#cc9999"></a><a href="#color" style="background:#cc99cc"></a><a href="#color" style="background:#cc99ff"></a><a href="#color" style="background:#cccc00"></a><a href="#color" style="background:#cccc33"></a><a href="#color" style="background:#cccc66"></a><a href="#color" style="background:#cccc99"></a><a href="#color" style="background:#cccccc"></a><a href="#color" style="background:#ccccff"></a><a href="#color" style="background:#ccff00"></a><a href="#color" style="background:#ccff33"></a><a href="#color" style="background:#ccff66"></a><a href="#color" style="background:#ccff99"></a><a href="#color" style="background:#ccffcc"></a><a href="#color" style="background:#ccffff"></a><div style="clear:both;"></div></span><span class="box"><a href="#color" style="background:#ff0000"></a><a href="#color" style="background:#ff0033"></a><a href="#color" style="background:#ff0066"></a><a href="#color" style="background:#ff0099"></a><a href="#color" style="background:#ff00cc"></a><a href="#color" style="background:#ff00ff"></a><a href="#color" style="background:#ff3300"></a><a href="#color" style="background:#ff3333"></a><a href="#color" style="background:#ff3366"></a><a href="#color" style="background:#ff3399"></a><a href="#color" style="background:#ff33cc"></a><a href="#color" style="background:#ff33ff"></a><a href="#color" style="background:#ff6600"></a><a href="#color" style="background:#ff6633"></a><a href="#color" style="background:#ff6666"></a><a href="#color" style="background:#ff6699"></a><a href="#color" style="background:#ff66cc"></a><a href="#color" style="background:#ff66ff"></a><a href="#color" style="background:#ff9900"></a><a href="#color" style="background:#ff9933"></a><a href="#color" style="background:#ff9966"></a><a href="#color" style="background:#ff9999"></a><a href="#color" style="background:#ff99cc"></a><a href="#color" style="background:#ff99ff"></a><a href="#color" style="background:#ffcc00"></a><a href="#color" style="background:#ffcc33"></a><a href="#color" style="background:#ffcc66"></a><a href="#color" style="background:#ffcc99"></a><a href="#color" style="background:#ffcccc"></a><a href="#color" style="background:#ffccff"></a><a href="#color" style="background:#ffff00"></a><a href="#color" style="background:#ffff33"></a><a href="#color" style="background:#ffff66"></a><a href="#color" style="background:#ffff99"></a><a href="#color" style="background:#ffffcc"></a><a href="#color" style="background:#ffffff"></a><div style="clear:both;"></div></span><div style="clear:both;"></div><a href="#color" style="background:#000000"></a><a href="#color" style="background:#444444"></a><a href="#color" style="background:#666666"></a><a href="#color" style="background:#888888"></a><a href="#color" style="background:#999999"></a><a href="#color" style="background:#aaaaaa"></a><a href="#color" style="background:#bbbbbb"></a><a href="#color" style="background:#cccccc"></a><a href="#color" style="background:#dddddd"></a><a href="#color" style="background:#eeeeee"></a><a href="#color" style="background:#ffffff"></a><a href="#color" class="colorPicker_Preview" style="background: none repeat scroll 0% 0% rgb(255, 255, 255); width: 80px; border: 1px solid rgb(0, 0, 0); height: 13px;"></a><div style="clear:both;"></div></div>'
	//--styling & mouseOVer effect
	var X=$(Code); $('a',X).attr('href','#color').last().css({width:'80px', border:'1px solid #000', height:'13px'})
	.end().mouseover(function(){ $('.colorPicker_Preview').css('backgroundColor',$(this).css('backgroundColor')); })
	if ($.IE){ $('div',X).remove() }; return X;

	//=======================================================================================



	var Code = '<div class="box JColor_Palette">'
	var sep=$.IE?'':'<div style="clear:both;"></div>'

	//------Tao Bang 216 mau`
	var U=['00','33','66','99','cc','ff']; var L=U.length;
	for (var i=0;i<L;i++){	for (var j=0;j<L;j++){	for (var k=0;k<L;k++){
		var iCount = i*L*L + j*L + k;
		if(iCount%36==0){ Code+='<span class="box">' }
		Code+= '<a style="background:#'+U[i]+U[j]+U[k]+'"></a>'
		if(iCount%36==35){ Code+=sep+'</span>' }
	}}}
	Code+=sep

	//------Tao 1 dai mau` GrayScale + Preview Cell
	var U=['00','44','66','88','99','aa','bb','cc','dd','ee','ff']
	for(var i=0;i<U.length;i++){  Code+= '<a style="background:#'+U[i]+U[i]+U[i]+'; margin:0px;"></a>'	}

	Code+= '<a class="colorPicker_Preview" style="background:#fff;"></a>'+sep+'</div>'

	//--styling & mouseOVer effect
	var X=$(Code); $('a',X).attr('href','#color').last().css({width:'80px', border:'1px solid #000', height:'13px'})
	.end().mouseover(function(){ $('.colorPicker_Preview').css('backgroundColor',$(this).css('backgroundColor')); })

	return X;
}


$.fn.colorPicker = function(callBackFunc){
	if(!$('#JColor_Picker').length){  $('body').append($('<div id="JColor_Picker"></div>').append(JColor_Palette())) }
	var E = $('#JColor_Picker>div:first').clone(true); E.appendTo($(this)).hide().floatDiv_Model($(this),null,null,null);
	$('a',E).click(function(){ callBackFunc($(this).css('backgroundColor')) }); return $(this)

}


$.fn.Mask = function(opacity,mask_opacity){
	var A=$(this); if(!A.data('mask')){
		var M=$('<div style="position:absolute; display:block; z-index:20; background:#fff; opacity:'+ (mask_opacity || 0.01 )+ '; filter:alpha(opacity=1);"></div>')
		A.after(M).data('mask',M); M.CopyPos(A).CopySize(A);
	}else{ A.data('mask').show() }
	if(opacity && !$.IE){ A.fadeTo(0,opacity) }
	return $(this);
}

$.fn.unMask = function(){ $(this).css('opacity',1).data('mask').hide(); return $(this); }


function eTarget(e) {
	var targ; if (!e) var e = window.event;
	if (e.target){ targ = e.target }else if(e.srcElement){ targ = e.srcElement }
	if (targ.nodeType == 3){ targ = targ.parentNode } //-- safari bug when consider text as a node
	return $(targ)
}



//====== Effect for processing form.
$.fn.Processing_Mask = function(){
	var A=$(this).addClass('box');

	var M=A.next('.JForm_Mask'); if (!M.length){
		A.after(
			'<div style="display:none; background:none; text-align:center; padding:0px; margin:0px;" class="JForm_Mask">'+
			'<img src="IMG/Processing.gif" style="width:33px; height:33px;"><br><font color="#888888"> &nbsp; &nbsp; Đang xử lý... </font></div>'
		)
	}; M=A.next('.JForm_Mask');
	M.show().CopyPos(A).CopySize(A).css('padding-top', M.height()/2 - 88+'px' ); A.hide();
	return $(this)
}

$.fn.Processing_Done = function(){ $(this).show(); $('.JForm_Mask').hide(); return $(this); }




