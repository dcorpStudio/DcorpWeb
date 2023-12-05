// -- CUSTOM SCROLLBAR

/**** Important note:
	- The Div to be armed scrollBars must be inside a "position:relative" DIV CONTAINER


	- Some parameters : Option has object format {} with properties:
		style		=	1 or 2, default = 1 (traditional scrollbar); 2 = Just a line & a scroller, no arrow button
		expandContainer = 0 or 1 (default : 0). Keep the container's size original or add an extra 17px amount to the container's Width or Height (to place the scrollbar)
		arrow 		=	Style for arrow (2 Tops arrow Button). Input format is CSS String Ex :  "width:100px; color:'#fc0;"...}
		scroller	=	css for scroller (the item that we drag around to navigate content)
		bg			=	css for scrolling background...
		middle_line	=	css for the middle line ( style=2 only )

		hide_arrow	=	when style=2, hide 2 arrow or not? (default=0)
		side = 'VScroll' || 'HSCroll' - this is in case u wanna apply 1 scrollbar only (event 2 sides are overflow - if apply VScroll & HScroll separately, they'll overlap the other)

		arrowV = speecial style for VScroll arrow
		arrowH = speecial style for HScroll arrow
		scrollerV = speecial style for VScroll scroller
		scrollerH = speecial style for HScroll scroller
		bgV = speecial style for VScroll background
		bgH = speecial style for HScroll background

		round = 1 || 0  scroller is rounded or not (note : scroller may display weird in IE if we define it's border
*/


/** EXAMPLE OF USING IT


<div style="position:relative;" class="clear_">
<div style="float:left; padding:10px;" class="box">
	<div id="xCONTAINER" style="position:relative; width:301px; height:260px; overflow:auto; border:50px solid #c00;" class="box">
	<div style=" width:590px; height:300px; margin:0px; line-height:1.8; text-align:justify; padding-right:1px;" id="Real_Container">
		New quad-core Intel Core i5 processors are standard on the new iMac. Choose a 21.5-inch iMac with a 2.5GHz or 2.7GHz quad-core Intel Core i5. Or expand your view with a 27-inch iMac featuring a 2.7GHz or 3.1GHz quad-core Intel Core i5. You can even configure iMac with the fastest quad-core processor available — the Intel Core i7. All models use Intel’s recently refined chipsets. That means the new iMac performs nearly twice as fast as the previous generation,1 adding a new dimension of speed to everything you do. And since Mac OS X is designed to take advantage of each core, it captures every last bit of performance from the processor.
		Turbo Boost 2.0. <br />	 2.5GHz or 2.7GHz quad-core Intel Core i5. Or expand your view with a 27-inch iMac featuring a 2.7GHz or 3.1GHz quad-core Intel Core i5. You can even configure iMac with the fastest quad-core processor available — the Intel Core i7. All models use Intel’s recently refined chipsets. That means the new iMac performs nearly twice as fast as the previous generation,1 adding a new dimension of speed to everything you do. And since Mac OS X is designed to take advantage of each core, it captures every last bit of performance from the processor.
		Turbo Boost 2.0. <br />
	</div>
	</div>
	</div>
</div>
<div style="position:relative;" class="clear_">

<div style="width:200px; height:30px; background:#fce;" id="annoying"></div>

<script>
	$(function(){
		var Opt = {
			expandContainer	:	1,
			side			:	'VScroll',
			style			:	2,
			hide_arrow		:	1,
			arrow			:	'border:1px solid #ddd;',
			scroller		:	'width:16px; height:16px; xfont-size:0px;',
			bg				:	'background:#fff;',
			round			:	0,
			_fixedHeight	:	168,
			_fixedWidth		:	168
		}


		$('#xCONTAINER').customScroll(Opt)

		$('#annoying').click(function(){
			$('#Real_Container').html( $('#Real_Container').html()+$('#Real_Container').html())
			$('#xCONTAINER').customScroll( Opt )
		})

	})
</script>


**/


$.fn.addScrollBar = function(Option){
	//---SOME CONFIGURATIONS
	var bgClick_moveAmount = 200 //---content scrollAmount when user click scroller background
	var mouseWheel_moveAmount = 30	//--content scrollAmount when user click scrollMouseWheel on content area
	var arrow_moveAmount = 50 //--content scrollAmount when user click arrow button

	var _VH = Option.side=='HScroll'?1:0; var _vh=_VH?'H':'V'; var s2=(Option.style==2)
	//-- basic options
	Option = dcorp_ObjectClone(Option);
	Option.arrow = (s2?"visibility:hidden;":"")+"width:15px; height:15px; background:#fff; border:1px solid #fff; text-align:center; font-size:12px; color:#ccc; cursor:default; "+ (Option['arrow'+_vh]||Option.arrow||'') +"; padding:0px; margin:0px; position:static; float:left; overflow:hidden;"
	Option.scroller = "background:"+(s2?"#ddd":"#f5f5f5")+"; width:"+(s2?"17":"15")+"px; height:"+(s2?"17":"15")+"px; text-align:center; color:"+(s2?"#999":"#ccc")+"; border:"+(s2?"0":"1")+"px solid #ccc; cursor:default;"+ (Option['scroller'+_vh]||Option.scroller||'') +"; overflow:hidden; padding:0px; margin:0px; position:absolute; top:0px; left:0px; float:left; z-index:1;"
	Option.bg = "background:"+(s2?"none":"#fff")+"; height:17px; width:17px; "+ (Option['bg'+_vh]||Option.bg||'') +"; float:left; padding:0px; margin:0px; position:relative; overflow:hidden; border:0px; top:0px; left:0px;"

	var D=$(this).css('overflow','hidden'); D.css('position', D.css('position')||'relative');
	var P=D.position();	//{top:D.get(0).offsetTop , left:D.get(0).offsetLeft }
	var clientH=D.get(0).clientHeight; var scrollH=D.get(0).scrollHeight;
	var clientW=D.get(0).clientWidth; var scrollW=D.get(0).scrollWidth;

	var X = $(	'<div class="box" style="float:left; background:none; position:absolute; width:17px; height:17px; padding:0px; margin:0px; overflow:hidden; border:0px; z-index:20;">\n'+
				'	<div style="'+Option.arrow+'"> '+ (_VH?"◄":"▲") +'</div>\n'+
				'	<div style="'+Option.bg+'">\n'+
				'		<div class="dcorp_custom_scrollbar" style="letter-spacing:1px; font-size:'+(_VH?10:16)+'px;'+Option.scroller+'"> '+ (_VH?"lll":"≡") +' </div>\n'+
				'		<span style="background:#aaa; display:block; visibility:'+(s2?'visible':'hidden')+'; border:none; width:'+(_VH?'100%':'1px')+'; height:'+(_VH?'1px':'100%')+'; top:'+(_VH?7:0)+'px; left:'+(_VH?0:7)+'px;'+(Option.middle_line||'')+'; position:absolute; padding:0px; margin:0px; font-size:0px; _background:none; _border-top:1px solid #999; _border-left:1px solid #999;"></span>\n'+
				'	</div>\n'+
				'	<div style="'+Option.arrow+'"> '+ (_VH?"►":"▼") +' </div>\n'+
				'</div>\n'	)

	$('div,span',X).mousedown(function(e){ e.stopPropagation() })
	var A = X.children('div'); var But1=A.eq(0); var But2=A.eq(2); var BG = A.eq(1); var Scroller = $('div:first',BG); var ML = $('span:first',X)
	X.children().disableSelection(); if (Option.hide_arrow){But1.hide(); But2.hide()}
	Scroller.draggable({ containment:'parent', scroll:false }).mousedown(function(e){ e.stopPropagation(); Scroller.isMouseDown=1; $.temporaryUnhide_floatDiv=1; })
	.hover( function(){Scroller.isMouseOver=1} , function(){Scroller.isMouseOver=0} );
	$('html').mouseup(function(){ Scroller.isMouseDown=0; }).mousedown(function(){ $.temporaryUnhide_floatDiv=null; });

	X.insertAfter($(this));

	//--- Horizontal Scroller-Bar
	if (Option.side == 'HScroll'){
		var _xSize = Option._hHeight; X.height(_xSize); if (s2){ ML.css('top', Math.floor(_xSize/2)+'px') }
		But1.outerHeight(_xSize).valignMiddle(); But2.outerHeight(_xSize).valignMiddle(); BG.height(_xSize);

		X.css('top', P.top +D.xBorder('top') +clientH-_xSize +'px').css('left',P.left + D.xBorder('left') ).fitW(Option.fixedWidth || clientW-(Option.bothSide?Option._vWidth:0)) //-- _vWidth = thickness of Vertical ScrollBar scrollbar
		Scroller.parent().fitW( X.width() -(But1.is(':visible')?But1.oWidth():0) -(But2.is(':visible')?But2.oWidth():0) )
		Scroller.width( Math.max( 20, Math.min(1, clientW/scrollW)*Scroller.parent().width()-1 ) ).valignMiddle()
		Scroller.bind('drag',function(){
			D.scrollLeft( Math.ceil((scrollW-clientW)*(Scroller.offset().left-Scroller.parent().offset().left)/
						(Scroller.parent().width() -Scroller.oWidth())) )
		})
		D.scroll(function(){if (!Scroller.isMouseDown){	Scroller.css('left', D.scrollLeft()*(Scroller.parent().width() -Scroller.oWidth())/(scrollW -clientW) +'px')} })
		BG.click(function(e){ e.stopPropagation(); if (!Scroller.isMouseOver){
			var t=D.scrollLeft(); var direction = (e.pageX > Scroller.offset().left )?1:-1
			D.scrollLeft( t+ bgClick_moveAmount*direction )
		}})
		But1.click(function(e){ e.stopPropagation(); var t=D.scrollLeft(); D.scrollLeft(t-arrow_moveAmount); })
		But2.click(function(e){ e.stopPropagation(); var t=D.scrollLeft(); D.scrollLeft(t+arrow_moveAmount); })
		Scroller.css('left', D.scrollLeft()*(Scroller.parent().width() -Scroller.outerWidth(true))/(scrollW -clientW) +'px')
		D.data('HScroll',X);
	}

	//--- Vertical Scroller-Bar
	if (Option.side == 'VScroll'){
		var _xSize =  Option._vWidth; X.width(_xSize); if (s2){ ML.css('left', Math.floor(_xSize/2)+'px') }
		Scroller.valignMiddle(); But1.outerWidth(_xSize); But2.outerWidth(_xSize); BG.width(_xSize);

		X.css('left', P.left +D.xBorder('left') +clientW-_xSize +'px' ).css('top', P.top +D.xBorder('top') +'px').fitH(Option.fixedHeight || clientH-(Option.bothSide?Option._hHeight:0)) //-- _hHeight = thickness of Horizontal scrollbar
		Scroller.parent().fitH( X.height() -(But1.is(':visible')?But1.outerHeight(true):0) -(But2.is(':visible')?But2.outerHeight(true):0) )
		Scroller.height( Math.max( 20, Math.min(1,clientH/scrollH)*Scroller.parent().height()-1 ) ).valignMiddle();
		Scroller.bind('drag',function(){
			D.scrollTop( Math.ceil((scrollH-clientH)*(Scroller.offset().top-Scroller.parent().offset().top)/
						(Scroller.parent().height() -Scroller.outerHeight(true))) )
		})
		//-- extra part for mouse wheel
		D.scroll(function(){if (!Scroller.isMouseDown){	Scroller.css('top', D.scrollTop()*(Scroller.parent().height() -Scroller.outerHeight(true))/(scrollH -clientH) +'px')} })
		D.bind('mousewheel', function(e,delta){ e.preventDefault(); D.scrollTop( D.scrollTop() -delta*mouseWheel_moveAmount ) })
		BG.click(function(e){ e.stopPropagation(); if (!Scroller.isMouseOver){
			var t=D.scrollTop(); var direction = (e.pageY > Scroller.offset().top )?1:-1
			D.scrollTop( t+200*direction )
		}})
		But1.click(function(e){ e.stopPropagation(); var t=D.scrollTop(); D.scrollTop(t-arrow_moveAmount); })
		But2.click(function(e){ e.stopPropagation(); var t=D.scrollTop(); D.scrollTop(t+arrow_moveAmount); })
		Scroller.css('top', D.scrollTop()*(Scroller.parent().height() -Scroller.outerHeight(true))/(scrollH -clientH) +'px')
		D.data('VScroll',X);
	}

	if (Option.round){
		if ($.IE6){alert('xxx')
			var _w = Scroller.outerWidth(true); if (Option.side=="HScroll" && _w%2==1){ Scroller.outerWidth(_w-1) }
			var _h = Scroller.outerHeight(true); if (Option.side=="VScroll" && _h%2==1){ Scroller.outerHeight(_h-1) }
		}
		Scroller.corner()
	}

	//-- advanced options for binding effect
	Option.arrow_over = Option['arrow_over'+_vh] || Option.arrow_over || {background:'#f5f5f5', color:'#aaa', border:'1px solid #ddd'}
	Option.arrow_down = Option['arrow_down'+_vh] || Option.arrow_down || {background:'#e5e5e5', color:'#999', border:'1px solid #ddd'}

	Option.scroller_over = Option['scroller_over'+_vh] || Option.scroller_over || s2?{background:'#e5e5e5', color:'#aaa;'}:{background:'#fff', color:'#aaa;'}
	Option.scroller_down = Option['scroller_down'+_vh] || Option.scroller_down || s2?{background:'#ccc', color:'#aaa;'}:{background:'#efefef', color:'#666;'}

	$('div:first,div:last',X).hover(function(){ $(this).temCSS(Option.arrow_over) }, function(){ $(this).restoreCSS() })
	.mousedown(function(){ $(this).temCSS(Option.arrow_down) }).mouseup(function(){ $(this).restoreCSS().trigger('mouseover') })
	Scroller.hover(function(){ $(this).temCSS(Option.scroller_over) }, function(){ if (!$(this).hasClass('dcorp_scroller_down')) $(this).restoreCSS() })
	.mousedown(function(){ $(this).addClass('dcorp_scroller_down').temCSS(Option.scroller_down) })
	$('html').mouseup(function(){ $('.dcorp_scroller_down').removeClass('dcorp_scroller_down').restoreCSS() })
}

$.fn.customScroll = function(Option){	Option = Option || {}

	var D=$(this).css('overflow','hidden'); var C=$(':first',D); D.parent().css('position','relative');
	var clientH=D.get(0).clientHeight; var scrollH=D.get(0).scrollHeight;
	var clientW=D.get(0).clientWidth; var scrollW=D.get(0).scrollWidth; var x = Option.expandContainer; Option.bothSide=0
	var VScroll = clientH < scrollH; var HScroll = clientW < scrollW;

	//--remove the old scrollbar :
	var oV = D.data('VScroll'); var oH = D.data('HScroll'); (oV||$('')).remove(); (oH||$('')).remove(); (D.data('cornerScroll')||$('')).remove();
	var expand = D.data('customScroll_expand');
	if (expand){
		if (oV){ if (expand) D.increaseW(-D.data('_vWidth')); C.increaseX('padding-right',-expand.W); D.data('VScroll',null)}
		if (oH){ if (expand) D.increaseH(-D.data('_hHeight')); C.increaseX('padding-bottom',-expand.H); D.data('HScroll',null)}
	}

	//-- precalculate the size of Scroller (if not original 17px)
	var s2=(Option.style==2); 
	var _vW = $('<div style="border:1px solid #ccc; width:'+(s2?17:15)+'px;'+(Option.scrollerV||Option.scroller)+';"></div>'); _vW.appendTo( ($.IE6||$.IE7)?$('body'):$('html')); var _vWidth=_vW.outerWidth(true); _vW.remove();
	var _hH = $('<div style="border:1px solid #ccc; height:'+(s2?17:15)+'px;'+(Option.scrollerH||Option.scroller)+';"></div>'); _hH.appendTo( ($.IE6||$.IE7)?$('body'):$('html')); var _hHeight=_hH.outerHeight(true); _hH.remove();
	Option._vWidth = _vWidth; Option._hHeight = _hHeight; D.data('_vWidth',_vWidth).data('_hHeight',_hHeight);

	//-- prepare for bothSize
	var _2side = Option.side?0:1;
	Option.bothSide = _2side && VScroll && HScroll
	if (Option.bothSide){
		C.increaseX('padding-right',_vWidth); C.increaseX('padding-bottom',_hHeight);
		if(x){ D.increaseW(_vWidth); D.increaseH(_hHeight); };
	}

	if (VScroll){ if (_2side || Option.side=='VScroll'){
		Option.side='VScroll';
		if (!Option.bothSide){
			C.increaseX('padding-right',_vWidth);
			if(x) D.increaseW(_vWidth);
		}
		D.addScrollBar(Option);
	}}

	if (HScroll){ if (_2side || Option.side=='HScroll'){
		Option.side='HScroll';
		if (!Option.bothSide){
			C.increaseX('padding-bottom',_hHeight);
			if(x) D.increaseH(_hHeight);
		}
		D.addScrollBar(Option);
	}}
	D.data('customScroll_expand' ,Option.expandContainer )

	if(Option.bothSide){
		var P=D.position(); //{top:D.get(0).offsetTop , left:D.get(0).offsetLeft };
		var XTop=P.top+clientH+D.xBorder('top')-(x?0:_hHeight);  var XLeft=P.left+clientW+D.xBorder('left')-(x?0:_vWidth); 
		var Corner = $('<div style="text-align:center; font:14px arial; line-height:14px; background:#fff; color:#ccc; cursor:default; border:1px solid #ccc;'+(Option.corner||'')+'; position:absolute; float:none;">≡</div>')
		D.after(Corner); D.data('cornerScroll',Corner); Corner.css({top:XTop+'px' ,left:XLeft+'px'}).fitW(_vWidth).fitH(_hHeight).valignMiddle().disableSelection()
	}

	return $(this)
}



