
<%if (!No_JS_File_In_Control){%>
	<!--#Include file="Editor/Function_Code/Editor_JS.asp"-->
<%}%>

<%

//-------Editor Control :
//----Yeu cau` : Can` 1 bo. cac file nam` trong folder /lib/editor/...
//--Khi chay can` 1 file JavaScript :  /Lib/JS/Common.js    &   1 file ASP :   Lib/Editor/Editor_Js.asp
//--Can` 1 duong` dan~ den' thu muc chua' anh cua cac nut bam'  :   Global_Var("Editor_Img_Path")	----(Co the sua trong Class cua Editor)
//--Can` 1 duong dan den thu muc chua' anh Upload :  Global_Var("Img_Path") ---- (Co the sua trong file /lib/Editor/Doup.asp)
//===========================Kich thuoc cua Editor :
//---Chieu` cao (Height) co' the nhan bat ki` gia tri nao`
//---Chieu` rong : nho nhat la` 400, ko co' gioi han lon' nhat //---Chieu` rong chuan la` 600.

//------Viet doan code JavaScript co su can thiep cua ASP
//Server.Execute( Global_Var("Editor_Img_Path")+'/')


function Control_Editor(Name, Data_Type , Data_Field, Max_val, Min_Val){

	//---Ke thua cac  thuoc tinh cua Input_Control
	var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
	for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

	//---Ham` lay gia tri HTML cua Editor
	this.Get_Func = 'function(){	var P= IE? Get("'+this.Name+'").contentWindow.document.body.innerHTML :  Get("'+this.Name+'").contentDocument.documentElement.getElementsByTagName("body")[0].innerHTML'+
					'\n\t\tGet("'+this.Name+'_ID").value=P;	return P;	}'
	//---Ham` focus rieng
	this.Focus_Func = 'function(){	window.location="#'+this.Name+'";	}'
	//---Ham` attach vao` su kien form submit
	this.Attach_Func = 'function(){Get("'+this.Name+'_ID").value = IE? Get("'+this.Name+'").contentWindow.document.body.innerHTML :  Get("'+this.Name+'").contentDocument.documentElement.getElementsByTagName("body")[0].innerHTML; }'

	this.Output = function(){
		Name = Clean(Name);
		this.Height = this.Height||'240';	this.Width = this.Width||600;
		this.Data = Server.HTMLEncode(this.Data);
		var Editor_Img_Path = Global_Var('Editor_Img_Path')

		//----Tinh toan width cua 2 select box (font face & font size) de phu hop voi width cua editor
		FontFace_Width = 135; FontSize_Width = 89;
		if (this.Width < 600){FontFace_Width = parseInt(135*this.Width/600); FontSize_Width = parseInt(89*this.Width/600)}

		var Code =	'<'+'!--------------------------------------Control / Editor_Code-------------------------------------------'+'>\n'+
					'	<a name="#'	+Name+	'"></a>\n'+
					'	<style>	.but_cell {cursor:hand;background-color:#eeeeee;width:32;height:27;text-align:center} </style>\n'+
					'	<table width="'+this.Width+'" cellpadding=0 cellspacing=0>\n'+
					'		<tr>\n'+
					'			<td width="100%">\n'+
					'			<table width="100%" cellpadding=0 cellspacing=0 onmouseover="editor_cell_effect(this)" borderColor=#336699 style=\'border:1px solid #336699; border-collapse:collapse\'>\n'+
					'				<tr>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'bold\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/bold.gif" width="21" height="20"	title="In &#273;&#7853;m"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'underline\');"> <img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/underline.gif" width="21" height="20"	title="G&#7841;ch ch&#226;n"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'italic\');"> <img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/italic.gif" width="21" height="20"	title="In nghi&#234;ng"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'strikethrough\');"> <img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/strikethrough.gif" width="21" height="20"	title="G&#7841;ch ngang ch&#7919;"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'superscript\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/superscript.gif" width="21" height="20"	title="Vi&#7871;t tr&#234;n"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'subscript\');"> <img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/subscript.gif" width="21" height="20"	title="Vi&#7871;t d&#432;&#7899;i"></td>\n'+
					'					<td width=1 valign=top bgcolor=#666666></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'justifyleft\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/justifyleft.gif" width="21" height="20"	title="C&#259;n l&#7873; tr&#225;i"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'justifyright\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/justifyright.gif" width="21" height="20"	title="C&#259;n l&#7873; ph&#7843;i"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'justifycenter\');"> <img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/justifycenter.gif" width="21" height="20"	title="C&#259;n l&#7873; gi&#7919;a"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'justifyfull\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/justifyfull.gif" width="21" height="20"	title="C&#259;n l&#7873; 2 b&#234;n"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'indent\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/indent.gif" width="21" height="20"	title="L&#249;i v&#224;o"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'outdent\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/outdent.gif" width="21" height="20"	title="R&#250;t ra"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'insertUnOrderedlist\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/bulletedlist.gif" width="21" height="20"	title="Li&#7879;t k&#234; kh&#244;ng th&#7913; t&#7921; "></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'insertOrderedlist\');">  <img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/numberedlist.gif" width="21" height="20"	title="Li&#7879;t k&#234; theo th&#7913; t&#7921; "></td>\n'+
					'					<td width=1 valign=top bgcolor=#666666></td>\n'+
					'					<td class="but_cell" onclick="Editor_Link(\''  +Name+  '\',this);"> <img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/createlink.gif" width="21" height="20"	title="T&#7841;o link"></td>\n'+
					'					<td class="but_cell" onclick="Editor_Hr(\''  +Name+  '\',this);">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/insertrule.gif" width="21" height="20"	title="Ch&#232;n thanh ngang"></td>\n'+
					'					<td class="but_cell" onclick="Editor_Table(\''  +Name+  '\',this);">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/inserttable.gif" width="21" height="20" 	title="Ch&#232;n B&#7843;ng"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'unlink\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/unlink.gif" width="21" height="20" 	title="H&#7911;y li&#234;n k&#7871;t"></td>\n'+
					'					<td bgcolor="#EEEEEE">&nbsp;</td>	</tr>	</table>\n'+
					'			<table width="100%" cellpadding=0 onmouseover="editor_cell_effect(this)" borderColor=#336699 style=\'border:1px solid #336699; border-collapse:collapse\'>\n'+
					'				<tr><td style="width:132" align=center bgcolor="#eeeeee">\n'+
					'							<select style="width: '+FontFace_Width+'; height: 21;font:10pt Arial" onchange="Editor_Fontface(\''  +Name+  '\',this);">\n'+
					'								<option value="intro">Font ch&#7919;</option>		<option>Arial</option>		<option> Times New Roman</option>	<option>Verdana</option>	<option>Tahoma</option>	</select></td>\n'+
					'					<td  style="width:75" align=center bgcolor="#eeeeee">\n'+
					'								<select style="width: '+FontSize_Width+'; height: 21;font:10pt Arial" onchange="Editor_Fontsize(\''  +Name+  '\',this);">\n'+
					'									<option value="intro">C&#7905; ch&#7919;</option>	<option>1</option>	<option>2</option>	<option>3</option>	<option>4</option>	<option>5</option>	<option>6</option>	<option>7</option>	</select></td>\n'+
					'					<td class="but_cell" onclick="Editor_Font_Color(\''  +Name+  '\',this);">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/fontforecolorpicker.gif" width="21" height="20" title="M&#224;u ch&#7919;"></td>\n'+
					'					<td class="but_cell"  onclick="Editor_Back_Color(\''  +Name+  '\',this);"> <img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/fontbackcolorpicker.gif" width="21" height="20" 	title="M&#224;u n&#7873;n ch&#7919; (Highlight)"></td>\n'+
					'					<td width=1 valign=top bgcolor=#666666></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'delete\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/clear.gif" width="21" height="20" 	title="X&#243;a"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'selectall\');"> <img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/selectall.gif" width="21" height="20" 	title="B&#244;i &#273;en to&#224;n b&#7897;"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'removeFormat\');"> <img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/removeformat.gif" width="21" height="20" 	title="B&#7887; h&#7871;t c&#225;c &#273;&#7883;nh d&#7841;ng (in &#273;&#7853;m, in nghi&#234;ng...)"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'undo\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/undo.gif" width="21" height="20" 	title="H&#7911;y b&#7887; thao t&#225;c v&#7915;a l&#224;m"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'redo\');"> 	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/redo.gif" width="21" height="20" 	title="Kh&#244;i ph&#7909;c thao t&#225;c v&#7915;a l&#224;m"></td>\n'+
					'					<td width=1 valign=top bgcolor=#666666></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'copy\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/copy.gif" width="21" height="20" 	title="Ch&#233;p (Copy)"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'cut\');">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/cut.gif" width="21" height="20"		title="C&#7855;t (Cut)"></td>\n'+
					'					<td class="but_cell" onclick="'  +Name+  '_doFormat(\'paste\');"> <img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/paste.gif" width="21" height="20" 	title="D&#225;n (Paste)"></td>\n'+
					'					<td class="but_cell" onclick="Editor_Image(\''  +Name+  '\',this);">	<img border="0" src="'  +Editor_Img_Path+  '/Editor_Pro_Img/post_button_image_upload.gif" width="18" height="18" 	title="Ch&#232;n h&#236;nh &#7843;nh"></td>\n'+
					'					<td bgcolor="#EEEEEE">&nbsp;</td>	</tr>	</table>	</td>	</tr>\n'+
					'	<tr><td width="100%">\n\n'+
					'		<iframe id="'  +Name+  '" width=100% style="background-Color:#ffffff;width:100%;border:1px solid #336699; height:'+this.Height+'px;overflow:auto" marginwidth="0" marginheight="0"></iframe>\n'+
					'		<input type="hidden" id="'+Name+'_ID" Name="'+Name+'" value="'+this.Data+'">'+
					'	</td></tr><tr><td>&nbsp;</td></tr></table>\n\n'+
					'	<'+'script type="text/javascript">\n\n'+
					'		//-----Cai` dat Editor\n'+
					'		var '  +Name+  '_editor=null;	var '  +Name+  '_editor_Window=null;\n'+
					'		Editor_Set_Iframe(\''  +Name+  '\');\n'+
					'		//---Luu lai cac range ma` user da select\n'+
					'		var '  +Name+  '_Range = null;\n'+
					'		//---Ham` doFormat : thuc thi tat ca cac ham` format don gian\n'+
					'		function '  +Name+  '_doFormat(a,b){	    '  +Name+  '_editor_Window.focus();\n'+
					'			if('  +Name+  '_editor.queryCommandEnabled(a)){	    if(!b){b=null;};   '  +Name+  '_editor.execCommand(a,false,b); }	}\n\n'+
					'	<'+'/script>\n'+
					'\n<'+'!---////-------------------------------Control / Editor_Code-------------------------------------------'+'>\n'
			return Code;	}

}

%>


