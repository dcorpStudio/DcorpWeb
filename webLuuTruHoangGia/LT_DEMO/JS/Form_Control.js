//--- this file defines common form control. It's a part of DBOM Auto Form

//========================================================================
//================= THE FORMCONTROL OBJECT ===============================
//========================================================================

var FControl = {


	//-- textbox
	textbox	: function(name,data){	return $('<input type="text" name="'+name+'">').val(data)	}

	//-- textarea
	,textarea : function(name,data){ return $('<textarea type="text" name="'+name+'"></textarea>').val(data) }

	//-- selectbox
	,selectbox : function(name,data,DB,intro){
		var code = '<select name="'+name+'"><option value="">'+(intro||'')+'</option>'
		if (DB){for(var i=0;i<DB.length;i++){ code+='<option value="'+DB[i][0]+'">'+DB[i][1]+'</option>' }}
		return $(code+'</select>').val(data)
	}


	//-- passbox
	,passbox : function(name,data){
		var code='<div class="passbox"><u>Mật khẩu</u><input type="password"><u>Gõ lại mật khẩu</u><input type="password"><input type="hidden" name="'+name+'"></div>'
		var P=$(code); P.find('input').val(data); $('input:lt(2)',P).bind('blur keyup change mouseup',function(){
			var A=$(this); if(A.val()==A.siblings('input:password').first().val()){
				A.siblings('input[name="'+name+'"]:first').val(A.val())
			}else{  A.siblings('input[name="'+name+'"]:first').val('');  }
		})
		return P;
	}

}






//========================================================================
//================= F-CONTROL HTMLBOX ====================================
//========================================================================

//--- execCommand helper
function htmlbox_exec(cmd,param){
	var Win=$.htmlbox_Win; Win.focus(); var Doc=Win.document;
	if(Doc.queryCommandEnabled(cmd)){  Doc.execCommand(cmd,false,param) }
}

//-- the dialog for some htmlbox function
function htmlbox_dialog(content,editorObj, width, left, top){
	if(!$('#htmlbox_dialog').length){ $('body').append('<div style="position:absolute; width:'+(width||400)+'px; z-index:100; background:#555; float:left;" class="box" id="htmlbox_dialog">'+
		'<a style="display:block;float:right; color:#fff; margin:2px; margin-right:5px; *margin-right:10px font-size:13px;" href="#close" onclick="$(this).parent().hide()">x</a>'+
		'<div style="font-size:0px; clear:both; width:"100%;"></div><div style="background:#fff; color:#000; margin:2px;padding:10px; position:relative;" class="box dialog_content"></div></div>')
	}
	var X=$('#htmlbox_dialog'); $('div.dialog_content:last',X).html(content); var P=editorObj.offset()
	X.show().css({ top: P.top+(top||70)+'px' , left: (left || P.left+parseInt((editorObj.oWidth()-X.oWidth())/2))+'px' });
}


//-- BIND SPECIAL EVENT (WHICH REQUIRES DIALOG BOX)
$('#htmlbox_dialog .block_but').live('click',function(e){
	e.stopPropagation(); $('#htmlbox_dialog').hide(); if($.IE){ $.htmlbox_textrange.select(); }

	//-- create Link
	if ($(this).is('._createLink_But')){htmlbox_exec('createLink', $(this).prevAll('input:last').val()) }

	//-- hr
	//-- table
	//-- image
	if ($(this).is('._imageUpload_But')){
		var img=$('#htmlbox_dialog .filebox img').attr('src');
		var margin = $('#htmlbox_dialog .img_margin').val();
		var align = $('#htmlbox_dialog .img_align').val();
		var code = '<img src="'+img+'" style="margin:'+margin+'; margin-top:0px; width:120px; float:'+align+';">'
		var Win=$.htmlbox_Win; Win.focus(); var Doc=Win.document;
		if ($.IE){
			Doc.body.focus(); Doc.selection.createRange().pasteHTML(code)
		}else{
			htmlbox_exec('insertHTML',code)
		}
	}

})


//-- iframe editable setting & initialize
$(window).load(function(){
	$('.htmlbox iframe').each(function(){
		var data = $(this).next('input').val();
		var init_page='<html><body style="font:12px Arial; margin:10px; color:#fff;">'+data+'</body></html>'
		var P=$(this).get(0).contentWindow.document; P.designMode='on'; P.open(); P.write(init_page); P.close();
		$($(this).get(0).contentWindow).blur(function(){ $(this.frameElement).next('input').val(  this.document.body.innerHTML  ) })
	})
})




//-- htmlbox
FControl.htmlbox = function(name,data, height){

	//-- the well-formed code (use this when constructing control)
	var Code =	'<div class="htmlbox" style="width:600px; background:#eee;">'+
				'	<div class="box">'+
				'		<a class="e bold"></a>					<a class="e underline"></a>				<a class="e italic"></a>		<a class="e strikethrough"></a>'+
				'		<a class="e superscript"></a>			<a class="e subscript"></a>				<a class="e justifyleft"></a>	<a class="e justifyright"></a>'+
				'		<a class="e justifycenter"></a>			<a class="e justifyfull"></a>			<a class="e indent"></a>		<a class="e outdent"></a>'+
				'		<a class="e insertUnOrderedlist"></a>	<a class="e insertOrderedlist"></a>		<a class="f createLink"></a>	<a class="f Hr"></a>'+
				'		<a class="f Table"></a>					<a class="e unlink"></a>				<a class="s fontFace"></a>		<a class="s fontSize"></a>'+
				'		<a class="f fontColor"></a>				<a class="f bgColor"></a>				<a class="e delete"></a>		<a class="e selectall"></a>'+
				'		<a class="e removeFormat"></a>			<a class="e undo"></a>					<a class="e redo"></a>			<a class="e copy"></a>'+
				'		<a class="e cut"></a>					<a class="e paste"></a>					<a class="f Image"></a>'+
				'	</div>'+
				'	<iframe frameborder="0" style="height:'+(height||200)+'px;"></iframe><input type="hidden" name="'+name+'">'


	//-- the minimized code
	var Code = '<div class="htmlbox" style="width:600px; background:#eee;"><div class="box"><a class="e bold" href="#htmlbox" title="bold"><img src="JS/Control_IMG/bold.gif"></a><a class="e underline" href="#htmlbox" title="underline"><img src="JS/Control_IMG/underline.gif"></a><a class="e italic" href="#htmlbox" title="italic"><img src="JS/Control_IMG/italic.gif"></a><a class="e strikethrough" href="#htmlbox" title="strikethrough"><img src="JS/Control_IMG/strikethrough.gif"></a><a class="e superscript" href="#htmlbox" title="superscript"><img src="JS/Control_IMG/superscript.gif"></a><a class="e subscript" href="#htmlbox" title="subscript"><img src="JS/Control_IMG/subscript.gif"></a><a class="e justifyleft" href="#htmlbox" title="justifyleft"><img src="JS/Control_IMG/justifyleft.gif"></a><a class="e justifyright" href="#htmlbox" title="justifyright"><img src="JS/Control_IMG/justifyright.gif"></a><a class="e justifycenter" href="#htmlbox" title="justifycenter"><img src="JS/Control_IMG/justifycenter.gif"></a><a class="e justifyfull" href="#htmlbox" title="justifyfull"><img src="JS/Control_IMG/justifyfull.gif"></a><a class="e indent" href="#htmlbox" title="indent"><img src="JS/Control_IMG/indent.gif"></a><a class="e outdent" href="#htmlbox" title="outdent"><img src="JS/Control_IMG/outdent.gif"></a><a class="e insertUnOrderedlist" href="#htmlbox" title="insertUnOrderedlist"><img src="JS/Control_IMG/insertUnOrderedlist.gif"></a><a class="e insertOrderedlist" href="#htmlbox" title="insertOrderedlist"><img src="JS/Control_IMG/insertOrderedlist.gif"></a><a class="f createLink" href="#htmlbox" title="createLink"><img src="JS/Control_IMG/createLink.gif"></a><a class="f Hr" href="#htmlbox" title="Hr"><img src="JS/Control_IMG/Hr.gif"></a><a class="f Table" href="#htmlbox" title="Table"><img src="JS/Control_IMG/Table.gif"></a><a class="e unlink" href="#htmlbox" title="unlink"><img src="JS/Control_IMG/unlink.gif"></a><select name="fontface_combo" style="width: 100px; "><option value="">Font chữ</option><option value="Arial">Arial</option><option value="Tahoma">Tahoma</option><option value="Verdana">Verdana</option><option value="Courier">Courier</option><option value="Times New Roman">Times New</option></select><select name="fontsize_combo" style="width: 80px; "><option value="">Cỡ chữ</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option></select><a class="f fontColor" href="#htmlbox" title="fontColor"><img src="JS/Control_IMG/fontColor.gif"></a><a class="f bgColor" href="#htmlbox" title="bgColor"><img src="JS/Control_IMG/bgColor.gif"></a><a class="e delete" href="#htmlbox" title="delete"><img src="JS/Control_IMG/delete.gif"></a><a class="e selectall" href="#htmlbox" title="selectall"><img src="JS/Control_IMG/selectall.gif"></a><a class="e removeFormat" href="#htmlbox" title="removeFormat"><img src="JS/Control_IMG/removeFormat.gif"></a><a class="e undo" href="#htmlbox" title="undo"><img src="JS/Control_IMG/undo.gif"></a><a class="e redo" href="#htmlbox" title="redo"><img src="JS/Control_IMG/redo.gif"></a><a class="e copy" href="#htmlbox" title="copy"><img src="JS/Control_IMG/copy.gif"></a><a class="e cut" href="#htmlbox" title="cut"><img src="JS/Control_IMG/cut.gif"></a><a class="e paste" href="#htmlbox" title="paste"><img src="JS/Control_IMG/paste.gif"></a><a class="f Image" href="#htmlbox" title="Image"><img src="JS/Control_IMG/Image.gif"></a></div><iframe frameborder="0" style="height:'+(height||200)+'px;"></iframe><input type="hidden" name="'+name+'">'


		Code+=	'	<!-- create Link -->'+
				'	<div style="display:none; color:#000;" class="_createLink">'+
				'		<label style="color:#000;">Địa chỉ liên kết</label> : <br> <input style="width:360px; margin:5px 0px 5px 0px; background:#fff; color:#000;" value="http://"><br>'+
				'		<b class="block_but _createLink_But"> Chèn liên kết </b>'+
				'	</div>'+
				'	<!-- Hr -->'+
				'	<!-- Table -->'+

				'	<!-- Image -->'+
				'	<div style="display:none;" class="_imageUpload">'+
				'		<span class="CFile" style="float:left; display:block;"></span>'+
				'		&nbsp; <table style="position:absolute; left:138px; top:50px; width:150px; height:60px; color:#000;">'+
				'			<tr><td style="width:50px;">Căn lề  </td><td> <select style="width:96px; background:#fff; color:#000;" class="img_align"><option value="left">Trái</option><option value="right">Phải</option><option value="none">Không căn</option></select> </td></tr>  '+
				'			<tr><td height=10></td></tr> <tr><td>Cách lề &nbsp; </td><td> <input class="img_margin" style="width:90px; background:#fff; color:#000;" value=10></td></tr>	'+
				'		</table>'+
				'		<hr style="clear:both; background:#ccc; color:#ccc;" />'+
				'		<b class="block_but _imageUpload_But" style="width:120px;"> Chèn hình ảnh </b>'+
				'	</div>'+
				'</div>'
	var X = $(Code)//.appendTo($('body'));

	//-- prepare the button control (Use with constructive Code, not the minimized code)
	if(Code.indexOf('bold.gif')<0){
		//--button decoration add image to button
		$('a',X).attr('href','#htmlbox').each(function(){
			$(this).attr('title',t).not('.s').append('<img src="JS/Control_IMG/'+t+'.gif">')
		})

		//-- font face & font size selectbox
		var fontArr = [['Arial','Arial'],['Tahoma','Tahoma'],['Verdana','Verdana'],['Courier','Courier'],['Times New Roman','Times New']]
		var S1=FControl.selectbox('fontface_combo','',fontArr,'Font chữ').width(100)
		$('.s.fontFace',X).after(S1).remove();
	
		var fontSizeArr = [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]]
		var S2=FControl.selectbox('fontsize_combo','',fontSizeArr,'Cỡ chữ').width(80)
		$('.s.fontSize',X).after(S2).remove()
	}


	//-- simple-exec binding
	var setWinFrame = function(){ $.htmlbox_Win=$('iframe',X).get(0).contentWindow; }

	$('a',X).click(function(){
		setWinFrame(); if (!$.IE){return}; var Doc=$.htmlbox_Win.document;
		Doc.body.focus(); $.htmlbox_textrange = Doc.selection.createRange()
	}).filter('.e').click(function(){
		var A=$(this); var t=A.attr('class').split(' ').slice(-1)
		$.htmlbox_Win=$(this).parent().next('iframe').get(0).contentWindow; htmlbox_exec(t,null)
	})

	$('select[name="fontface_combo"]',X).change(function(){ setWinFrame(); htmlbox_exec('fontName',$(this).val()) })
	$('select[name="fontsize_combo"]',X).change(function(){ setWinFrame(); htmlbox_exec('fontSize',$(this).val()) })


	//-- layouted function =============================
	//-- create Link
	$('.f.createLink',X).click(function(){
		htmlbox_dialog( $('._createLink',X).html(), X )
	})

	//-- horizontal line
	//-- Table
	//-- Image
	$('.f.Image',X).click(function(){
		htmlbox_dialog( $('._imageUpload',X).html(), X, 400 )
		var FImg = FControl.filebox(name+'_html_img'); $('form',FImg).attr('action','SVA.asp?act=htmlbox_upload');
		$('#htmlbox_dialog .CFile:first').append(FImg); filebox_init_frame(FImg);
	})


	//-- fontColor
	$('.f.fontColor',X).colorPicker(function(x){
		if($.IE){ $.htmlbox_textrange.select() }; htmlbox_exec('foreColor',x)
	})

	//-- bgColor
	$('.f.bgColor',X).colorPicker(function(x){
		if($.IE){ $.htmlbox_textrange.select() }; htmlbox_exec( $.IE?"backColor":"hiliteColor" ,x)
	})

	//-- fill data for hidden input & bind event iframe onblur:
	$('input[name="'+name+'"]',X).val(data); return X;
}









//========================================================================
//================= F-CONTROL FILEBOX ====================================
//========================================================================


//-- get the iframe window
function iframeDoc(X){ var frame=X.get(0); return frame.contentDocument || frame.contentWindow.document }

//-- generate the appropriate image to display when file uploaded
function filebox_previewimg(x){
	if (!x || x==''){ return 'JS/Control_IMG/NoImage.jpg' }
	var ext = x.substring(x.lastIndexOf('.')+1, x.length); ext = ','+ext.toLowerCase()+','
	if (',jpg,bmp,png,gif,'.indexOf(ext) >= 0 ){ return x } //--Image
	if (',mp3,wav,flv,wmv,'.indexOf(ext) >= 0 ){ return 'JS/Control_IMG/Media.jpg' }
	if (',doc,docx,xls,xlsx,txt,txtx,pdf,ppt,pptx,'.indexOf(ext) >= 0 ){ return 'JS/Control_IMG/Doc.jpg' }
}



FControl.filebox = function (name,data,original_filename,extList,fileSize){
	var noImage = 'JS/Control_IMG/noImage.jpg'; var noFileName = '......................................'
	var Code =	'<div class="box filebox" rel="'+name+'">'+
				'	<img src="'+(filebox_previewimg(data)||noImage)+'" />'+
				'	<span style="position:relative;"> <font style="font-weight:bold; color:#093; position:relative; top:2px; font-size:17px;">+</font> Chọn file '+
				'		<form method="post" action="SVA.asp?act=upload&maxsize='+fileSize+'" enctype="multipart/form-data" target="filebox_uploadframe_'+name+'">'+
				'			<input name="F" type="file" value="" onchange="$(this).parent().submit()"/>'+
				'		</form>'+
				'	</span>'+
				'	<span class="remove_file" style="margin-left:10px;"><font>x</font> Hủy file </span>'+
				'	<input type="hidden" name="'+name+'">'+
				'	'+($.IE?'':'<div style="clear:both;"></div>')+'<label style="clear:both;">'+(original_filename||noFileName)+'</label>'+
				'	<iframe frameborder=0 style="width:0px;height:0px;" name="filebox_uploadframe_'+name+'" src="about:blank"></iframe>'+
				'</div>'

	var X=$(Code); X.data('extList',extList); X.data('fileSize',fileSize); $('input[name="'+name+'"]',X).val(data);
	$('.remove_file',X).click(function(){
		if (!confirm('Bạn chắc chắn muốn hủy file ?')){ return }
		X.find('img').attr('src',noImage); X.find('label').text(noFileName); X.find('input[name="'+name+'"]').val('');
	})
	if ($.IE7){ // -- IE7 bug : fire the onchange event twice when user choose file
		$('input:file',X).attr('onchange','').click(function(){ $(this).one('change',function(){$('form',X).submit()}) })
	}
	return X;
}



//-- lobby function for filebox_uploader (initilize the iframe with a certain title - and make filboxUploader Overlap the "browse_but" class)
function filebox_init_frame(X){ var F=iframeDoc($('iframe',X)); F.open(); F.write('<title>blank_upload</title>'); F.close(); $['up_title_check_'+X.attr('rel')]=0; }
$(window).load(function(){ $('.filebox').each(function(){ filebox_init_frame($(this)) }) })


//-- initialize the timer for checking stuff
$('.filebox form').live('submit',function(){ 
	var A=$(this).parents('.filebox:first'); var extList=A.data('extList'); var fileSize=A.data('fileSize'); var name = A.attr('rel');

	//-- check extension
	var x=$('input:file',this).val(); var ext = x.substring(x.lastIndexOf('.')+1, x.length); ext = ','+ext.toLowerCase()+','
	if ( extList && extList!='' && (','+extList.replace(/[^a-z0-9]/gi,',')+',').indexOf(ext) < 0 ){
		var err_msg = '<p align="center" style="color:#000;"> Chỉ được phép chọn các file có đuôi '+extList.replace(/[^a-z0-9]/gi,',')+' <br><br> <b class="block_but">OK</b>'
		JDialog(err_msg,A,250,1,1); return false;
	}

	//-- start upload
	$['filebox_frame_'+name] = A.find('iframe'); A.Processing_Mask(); var timeSpan = 300;
	// $['filebox_timer_'+name] = setInterval('filebox_upload_result("'+name+'")' , timeSpan); return true;  //-- commented cause of "server-upload-frame-title"

	//*** added later cause the prob of "server-upload-frame-title"
	$.upload_done_func = function(x){ upload_done_func(name,x) }
})




//-- check the upload result every certain timespan
function filebox_upload_result(name){
	var x=''; try{ x=iframeDoc($['filebox_frame_'+name]).title }catch(e){ alert(e) }
	if (x!='blank_upload'){
		if ($['up_title_check_'+name]>=3){
			clearInterval($['filebox_timer_'+name]); var A=$('.filebox[rel="'+name+'"]'); A.Processing_Done();
			if (x==''){	//--- FILE IS OVERSIZED
				var err_msg = '<p align="center" style="color:#000;"> File bạn đã chọn có dung lượng vượt quá quy định. Vui lòng chọn file khác <br><br> <b class="block_but">OK</b>'
				JDialog(err_msg,A,250,1,1)

			}else if(x.indexOf('success:')==0){ //--- UPLOAD SUCCESSFULLY

				var F = x.split(':'); $('label',A).text(limitText(F[2],15)); $('input[name="'+name+'"]').val(F[1]);
				$('img',A).attr('src', filebox_previewimg(F[1]) );
			}
			filebox_init_frame( $('.filebox[rel="'+name+'"]') )
		}else{ $['up_title_check_'+name]+=1 }
	}
}


//-- additional function to handle upload task on server
function upload_done_func(name,x){
	var A=$('.filebox[rel="'+name+'"]'); A.Processing_Done();
	var F = x.split(':'); $('label',A).text(limitText(F[2],15)); $('input[name="'+name+'"]').val(F[1]);
	$('img',A).attr('src', filebox_previewimg(F[1]) );
}








