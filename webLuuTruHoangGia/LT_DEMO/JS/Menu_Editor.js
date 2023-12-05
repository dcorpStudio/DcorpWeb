	function hide_menu_editor_bar(cancel_cmd){
		var F=$('#menu_editor_bar').hide(); var U=F.data('my_menu').unMask(); var A=F.data('my_item'); var B=F.data('new_item'); 
		$.menu_editor_callback=null; F.data('new_item',0).data('my_item',0); U.trigger('backup',cancel_cmd);
		$('._add,._add_next,._del',F).fadeTo(0,1); $('ul:empty',U).hide(); if($.IE){U.removeClass('menu_editor_a_faded')};
	}

	//-- render MenuEditor code
	var ME_Tem = '<li rel="@id/" alt="@root_item/"><i></i><a href="#me">@menu_txt/</a><ul rel="@id/"></ul></li>'
	function menu_editor_htmlrender(Data,C,tblName,lang_suffix){	//-- C = Container
		lang_suffix = lang_suffix || ''
		var Code = JRender(Data,ME_Tem,'@menu_txt/=@menu_txt'+lang_suffix+'/||"_______"')
		C.append( '<a class="menu_editor_root">All<b></b></a><ul class="menu_editor box" rel="0" name="'+tblName+'">'+Code+'</ul>' )
		$('li',C).each(function(){ $(this).appendTo(C.find('ul[rel="'+ $(this).attr('alt') +'"]:first')) })
		$('.menu_editor',C).clone().appendTo(C).removeClass('menu_editor').addClass('menu_editor_backup').hide()
		$('.menu_editor ul:empty',C).hide();
	}

	function menu_editor_bar_init(lang_suffix){
		if ($('#menu_editor_bar').length){ return }
		var Code =	'<div id="menu_editor_bar"><form onSubmit="return menu_editor_exec(\'_modify\',\''+ lang_suffix +'\')">'+
					'	<input name="menu_editor_input">'+
					'	<a href="#me" class="_up" style="background-image:url(JS/Menu_Editor/Up.gif);" title="Lên"></a>'+
					'	<a href="#me" class="_down" style="background-image:url(JS/Menu_Editor/Down.gif);" title="Xuống"></a>'+
					'	<a href="#me" class="_add" style="background-image:url(JS/Menu_Editor/Add.gif);" title="Thêm mục con"></a>'+
					'	<a href="#me" class="_add_next" style="background-image:url(JS/Menu_Editor/Add_next.gif);" title="Thêm mục cùng cấp"></a>'+
					'	<a href="#me" class="_del" style="background-image:url(JS/Menu_Editor/Del.gif);" title="Xóa"></a>'+
					'	<b onClick="menu_editor_exec(\'_modify\',\''+ lang_suffix +'\')">OK</b><b onClick="hide_menu_editor_bar(1)">Cancel</b>'+
					'</form></div>'
		$('body').append(Code)
	}


	function menu_editor_initialize(lvLimit, notDel_List,lang_suffix){$('.menu_editor').each(function(){
		menu_editor_bar_init(lang_suffix); var F=$('#menu_editor_bar'); var U=$(this); U.data('lvLimit',lvLimit).data('notDel_List',notDel_List)

		U.bind('backup',function(e,x){ e.stopPropagation();
			if (x){ $(this).html('').append($(this).siblings('.menu_editor_backup:first').clone().children())
			}else{ $(this).clone().children().appendTo($(this).siblings('.menu_editor_backup:first').html('')) }
		})

		//-- the expand - collapse icon
		U.delegate('i', 'click', function(){ var X=$(this).siblings('ul:not(:empty)'); if(X.length){ $(this).toggleClass('menu_editor_plus'); X.toggle(); U.trigger('backup'); }   })

		//-- show - hide the editor-floating-form
		U.delegate('a', 'click', function(e){
			e.stopPropagation(); var A=$(this); F.show().CopyPos_Offset(A).data('my_menu',U)
			F.data('my_item',A.parent()); $('input',F).val(A.text()).focus();
			U.Mask(0.5); if($.IE && !$.IE6){ U.addClass('menu_editor_a_faded') }
		})

		//--- the root node (ALL) add button
		$('.menu_editor_root b').click(function(){
			var A=$(this).parent().next('ul').append(ME_Tem).find('>li:last a:first').trigger('click')
			$('#menu_editor_bar').data('new_item',A.parent().attr('rel','x')).find('input').val('');
		})


		//-- function for the floating form button
		F.delegate('a','click',function(e){
			e.stopPropagation(); var x=$(this).attr('class'); var U=F.data('my_menu'); var B=F.data('new_item'); var A=F.data('my_item'); var I=$('input',F)
			switch(x){
				case '_up': A=B||A; A.insertBefore(A.prev()); F.CopyPos_Offset($('a',A)); break;
				case '_down': A=B||A; A.insertAfter(A.next()); F.CopyPos_Offset($('a',A)); break;
				case '_del':
					var x=U.data('notDel_List'); var ID=A.attr('rel');
					if ((','+x+',').indexOf(','+ID+',')>=0){ alert('Bạn không được phép xóa mục này'); return; }
					if (!B && confirm('Bạn chắc chắn muốn xóa mục này và toàn bộ các mục con ?')){
						menu_editor_exec('_del')
					}; break;
				case '_add':
					if (!B){
						if (U.data('lvLimit')){ var lv = A.parentsUntil('.menu_editor','ul').length; if (lv+2 > U.data('lvLimit')){return} }
						$('ul:first',A).show().append(ME_Tem); var B=$('ul:first li:last',A); F.data('new_item',B);
						$('a:first',A).text(I.val()); F.CopyPos_Offset(B.find('a')); I.val('').focus(); $('._add,._add_next,._del',F).fadeTo(0,0.5);
					} break;
				case '_add_next':
					if (!B){
						A.after(ME_Tem); var B=A.next(); F.data('new_item',B);
						$('a',A).text(I.val()); F.CopyPos_Offset(B.find('a')); I.val('').focus(); $('._add,._add_next,._del',F).fadeTo(0,0.5);
					} break;
			}
		})

		//--collapse all the child menu
		//$('.menu_editor li[alt!="0"]').parent().hide()
		//$('.menu_editor i').addClass('menu_editor_plus')
	})}



	//---function to execute the command in reality
	function menu_editor_exec(act,lang_suffix){
		if( $('#menu_editor_bar input').val()=='' ){ alert('Vui lòng điền tiêu đề cho danh mục!'); return false; }
		var F=$('#menu_editor_bar').hide(); var U=F.data('my_menu').Processing_Mask(); var A=F.data('my_item');
		var B=F.data('new_item'); (B||A).find('a:first').text($('input',F).val());
		var url = 'SVA.asp?act=menu_editor&tblName='+ U.attr('name') +'&';
		var callBackFunc = function(data){U.Processing_Done(); if(data.indexOf('success:')==0){
//alert(data);
			($.menu_editor_callback||parseInt)(data); hide_menu_editor_bar();
		}}

		//------------------
		if (act=='_del'){
			$.menu_editor_callback = function(x){A.remove()}
			$.post(url+'me_act=_del&xid='+A.attr('rel'), callBackFunc);
//alert( url+'me_act=_del&xid='+A.attr('rel') )
			}else if(act=='_modify'){
			$.menu_editor_callback = function(x){if(B){
				var new_id=x.substring(8,x.length); var parent_id=B.parent().attr('rel')
				B.attr({alt:parent_id, rel:new_id}).find('ul').attr('rel',new_id)
			}}

			var encode_amp=function(x){ return x.replace(/\&/g,'%26') }
			var Param = 'xid='+A.attr('rel')+'&xmenu_order='+A.prevAll().length+'&xmenu_txt='+ encode_amp(A.find('a:first').text())
			if(B){ Param+='&root_item='+B.parent().attr('rel') +'&menu_txt='+ encode_amp(B.find('a').text()) +'&menu_order='+ B.prevAll().length }
// alert(url+'me_act=_modify&'+Param)
			$.post(url+'me_act=_modify&lang_suffix='+(lang_suffix||'')+'&'+Param, callBackFunc )
		}
		return false;
	}


