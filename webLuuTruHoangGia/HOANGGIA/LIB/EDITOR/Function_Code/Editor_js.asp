
<script language="javascript">

//___________________________________________CAC BIEN HO TRO________________________________//
//////////////////////////////////////////////////////////////////////////////////////////////
	var Editor_Passed_Value = '';	var Editor_Extra_Passed_Value = '';
	var Editor_Waiting_Func = '';	var Editor_Extra_Waiting_Func = '';



//__________________________________________________________________________________________//
//////////////////////////////////////////////////////////////////////////////////////////////
//--- Ham`Phuc vu cho Editor

	//---Thiet lap 1 iframe lam` 1 editor
	function Editor_Set_Iframe(EName){
		var P_Window = eval( 'Get("' +EName+ '").contentWindow' );	var P = P_Window.document;
		eval( EName+ '_editor_Window = P_Window' );		eval( EName+ '_editor = P');
		P.designMode='On';		P.open();
		P.write('<html><head><style></style></head><body style="font:12px Arial;margin:10px; color:#000;" bgcolor="#ffffff">' +eval('Get("'+EName+'_ID").value')+ '</body></html>');
		P.close();	}


	//----------Lam` hieu ung' di chuot len nut' chuc nang thi` doi hinh` nen`
	function editor_cell_effect(obj){	var P = obj.getElementsByTagName('td');
		for (var i=0;i<P.length;i++){
			if (P[i].className=='but_cell'){
				P[i].onmouseover = function(){this.style.backgroundImage="url('<%=Global_Var("Editor_Img_Path")%>/Editor_Pro_Img/bg.gif')";
												this.style.backgroundRepeat='no-repeat'; this.backgroundPosition='center';}
				P[i].onmouseout = function(){this.style.backgroundImage='';}	}
		obj.onmouseover=null;	}	}


	//----------Ham` bung ra cua so Upload anh
	function Open_Upload(Mode){	window.open ('<%=Global_Var("Editor_Img_Path")%>/Function_Code/insert_pic.asp?Mode='+Mode,'upload_image','toolbar=0,location=0,status=1,menubar=0,scrollbars=0,width=400,height=200' ) }

	//----------Simple function, Consist : Font face - size - color - backColor
	function Editor_Fontface(EName,obj){	var T = obj.options[obj.selectedIndex]; var D=eval(EName+'_doFormat'); D('fontName', (T.value=="intro")?"Arial":T.text )	}
	function Editor_Fontsize(EName,obj){	var T = obj.options[obj.selectedIndex]; var D=eval(EName+'_doFormat'); D('fontsize', (T.value=="intro")?"3":T.text )	}

	function Editor_Font_Color(EName,obj){	if (obj){	if (IE){  eval(EName+'_editor.body.focus()'); eval(EName+ '_Range = ' +EName+ '_editor.selection.createRange()') };
		Editor_Waiting_Func = function(){ if (IE){ eval(EName +'_Range.select()') }; var K=eval(EName+'_doFormat'); K("foreColor", Editor_Passed_Value) };
		var P = getPageCoords(obj);	Color_Palette( P.x , P.y+P.h ); }	}

	function Editor_Back_Color(EName,obj){	if (obj){	if (IE){eval(EName+'_editor.body.focus()');  eval(EName+ '_Range = ' +EName+ '_editor.selection.createRange()') }
		Editor_Waiting_Func = function(){  if (IE){ eval(EName +'_Range.select()') }; var K=eval(EName+'_doFormat'); K( IE?"backColor":"hiliteColor" , Editor_Passed_Value)} ;
		var P = getPageCoords(obj);	Color_Palette( P.x , P.y+P.h );	}	}


	//----------Insert Link
	function Editor_Link(EName, obj){
			if (obj){	var P= getPageCoords(obj); 	if (IE){ eval(EName+ '_Range = ' +EName+ '_editor.selection.createRange()') }
			Editor_Waiting_Func = Editor_Insert_Link
			var Code = '<form onsubmit="Editor_Waiting_Func(\''+EName+'\'); return false;"> &#272;&#7883;a ch&#7881; li&#234;n k&#7871;t : <br> <input id="Editor_Link_URL" style="width:300" value="http://"> <br>'+
						'<input type="submit" value="Ch&#232;n li&#234;n k&#7871;t"> <input type="button" value="Cancel" onclick="EMsg_Close()"> </form>'
			EMsg(Code, P.x-300 , P.y+100 , 350);	}	}
	function Editor_Insert_Link(EName){	if (IE){ eval(EName +'_Range.select()') };	EMsg_Close();
			var K=eval(EName +'_doFormat'); K("createLink" , Get("Editor_Link_URL").value);	}


	//----Insert Horizontal line
	function Editor_Hr(EName,obj){
			if (obj){	var P= getPageCoords(obj); 	if (IE){ eval(EName+'_editor.body.focus()'); eval(EName+ '_Range = ' +EName+ '_editor.selection.createRange()') }
			Editor_Extra_Waiting_Func = Editor_Hr_Insert
			var Code = '&#272;&#7897; d&#224;y :&nbsp;&nbsp;&nbsp; <select style="width:100" id="Editor_Hr_Size"> <option></option> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option>	</select>\n'+
						'<br>Chi&#7873;u d&#224;i : <select style="width:100" id="Editor_Hr_Width">	<option>100%</option> <option>90%</option> <option>80%</option> <option>70%</option> <option>60%</option> <option>50%</option>	</select> \n'+
						'<br>M&#224;u s&#7855;c :&nbsp; <input style="width:100" id="Editor_Hr_Color" onclick="hr_color_pick(this)">\n'+
						'<br><input type=button value="OK" onclick="Editor_Extra_Waiting_Func(\''+EName+'\')"> <input type="button" value="Cancel" onclick="EMsg_Close();">'
			EMsg(Code, P.x-350 , P.y+80 , 200);	}	}
	function hr_color_pick(obj){var P = getPageCoords(obj); Editor_Waiting_Func =function(){Get("Editor_Hr_Color").style.background=Editor_Passed_Value}; Color_Palette( P.x, P.y+P.h); }
	function Editor_Hr_Insert(EName){ if (IE){ eval(EName+ '_Range.select()') }; EMsg_Close(); var size=Get_SelectBox('Editor_Hr_Size').text;var width=Get_SelectBox('Editor_Hr_Width').text;var color=Get('Editor_Hr_Color').style.background;
			if (!IE){ color = '#' + new String(color.match( /\d+\D+\d+\D+\d+/i )).RGBtoHEX() }
			var Pre_Code = '<hr color="'+color+'" size='+size+' width='+width+' />'
			if (IE){ var E=eval(EName+'_editor'); E.body.focus(); E.selection.createRange().pasteHTML(Pre_Code) }else{ var K=eval(EName+ '_doFormat'); K('insertHTML',Pre_Code) }	}




	//----Insert Table__________________________________________________________________________
	function Editor_Table(EName,obj){
			if (obj){	var P= getPageCoords(obj); 	if (IE){  eval(EName+'_editor.body.focus()'); eval(EName+ '_Range = ' +EName+ '_editor.selection.createRange()') }
			Editor_Extra_Waiting_Func = Editor_Table_Insert

			var Code =	'	<table width=100% border="0" cellspacing="0" cellpadding="0"><tr><td>Chi&#7873;u r&#7897;ng b&#7843;ng:</td><td><input id="Editor_Table_Width" style="width:145;text-align:right" value=100>'+
						'	<select id="Editor_Table_Unit" style="width:50"><option>%</option><option>px</option></select> </td></tr>'+
						'	<tr><td>S&#7889; c&#7897;t :</td><td>	<input id="Editor_Table_Cols" style="width:200" value=2>\n'+
						'	</td></tr><tr><td>S&#7889; d&#242;ng :</td><td> <input id="Editor_Table_Rows" style="width:200" value=2>\n'+
						'	</td></tr><tr><td>Ki&#7875;u vi&#7873;n:</td><td> <select id="Editor_Table_Border_Style" style="width:200"> <option value="">Vi&#7873;n n&#7893;i</option>	<option value="solid">Vi&#7873;n ch&#236;m</option>	<option value="double">Vi&#7873;n &#273;&#244;i</option>  <option value="dotted">Vi&#7873;n ch&#7845;m ch&#7845;m</option>	</select>\n'+
						'	</td></tr><tr><td>&#272;&#7897; d&#224;y vi&#7873;n: </td><td> <input id="Editor_Table_Border_Size" style="width:200" value=1>\n'+
						'	</td></tr><tr><td>M&#224;u vi&#7873;n:</td><td> <input id="Editor_Table_Border_Color" style="width:200" onclick="table_color_pick(this,\'Border\')" name="T4" size="20">\n'+
						'	</td></tr><tr><td>M&#224;u n&#7873;n:</td><td>	<input id="Editor_Table_Bg_Color" style="width:200;backgroundColor:#ffffff" onclick="table_color_pick(this,\'Bg\')">\n'+
						'	</td></tr><tr><td colspan="2"></td></tr><tr><td colspan="2" align=center>	<input type="button" value="Ch&#232;n b&#7843;ng" onclick="Editor_Extra_Waiting_Func(\''+EName+'\')">\n'+
						'	<input type="button" value="Cancel" onclick="EMsg_Close()">	</td></tr></table>'
			EMsg(Code, P.x-400 , P.y+80 , 370);	}	}
	function table_color_pick(obj,item){var P = getPageCoords(obj); Editor_Waiting_Func =function(){Get("Editor_Table_"+item+"_Color").style.background=Editor_Passed_Value}; Color_Palette( P.x, P.y+P.h); }
	function Editor_Table_Insert(EName){	if (IE){ eval(EName+ '_Range.select()') }; EMsg_Close(); var Cols=Get('Editor_Table_Cols').value;var Rows=Get('Editor_Table_Rows').value;

			var Width = Get('Editor_Table_Width').value + Get_SelectBox('Editor_Table_Unit').text;
			var Border_Style = Get_SelectBox('Editor_Table_Border_Style').value; var Border_Size = Get('Editor_Table_Border_Size').value; 
			var Border_Color = Get('Editor_Table_Border_Color').style.backgroundColor; var Bg_Color = Get('Editor_Table_Bg_Color').style.backgroundColor;
			if (!IE){ Bg_Color = Bg_Color?FFColor(Bg_Color):'';	Border_Color = (Border_Color)?FFColor(Border_Color):''	}

			Border_Size = (isNaN(Border_Size))?'1':Border_Size;	Bg_Color = ' bgColor="'+Bg_Color+'"'; Border_Style = (Border_Style)?('border-style:'+Border_Style+';'):''; var XBorder_Color= (Border_Color)?('border-color:'+Border_Color+';'):'';
			Style = ' style="'+ ((Border_Style!='')?'border-collapse:collapse;':'')  + 'border-width:'+Border_Size+';' + Border_Style + XBorder_Color+ '"'
			Border_Size = (isNaN(Border_Size))?'':('border='+Border_Size);	Border_Color = (Border_Color=='')?'':('borderColor="'+Border_Color+'"')
			var Pre_Code = '<table width='+Width+' '+Border_Size+' '+ Border_Color +' ' +Bg_Color+ ' ' + Style +' >\n';
			Cols = (isNaN(Cols))?'2':Cols;	Rows = (isNaN(Rows))?'2':Rows;
			for (var i=0;i<Rows;i++){	Pre_Code += '<tr>\n';
				for (var j=0;j<Cols;j++){	Pre_Code += '<td>&nbsp;</td>\n'	}
				Pre_Code += '</tr>\n'};
			Pre_Code += '</table>'
			if (IE){ var E=eval(EName+'_editor'); E.body.focus(); E.selection.createRange().pasteHTML(Pre_Code) }else{ var K=eval(EName+ '_doFormat'); K('insertHTML',Pre_Code) }	}




	//----Insert picture___________________________________________________________________________
	function Editor_Image(EName,obj){
			if (obj){	var P= getPageCoords(obj); 	if (IE){  eval(EName+'_editor.body.focus()'); eval(EName+ '_Range = ' +EName+ '_editor.selection.createRange()') }
			Editor_Extra_Waiting_Func = Editor_Img_Insert
			var Code =	'<table border="0" width="500" id="Editor_Image_Table"><tr><td height="140" bgcolor="#EEEEEE">\n'+	'<input type=hidden id="Editor_Img_Src" value="Editor_Pro_Img/noImage.jpg">' +
						'<table border="0" width="100%" id="table2" height="100%" cellspacing="1"><tr><td colspan="4" bgcolor="#FFFFFF" height="40">\n'+
						'		<p align="left">&nbsp;<input type="button" value="Ch&#7885;n file &#7843;nh" onclick="Open_Upload(\'editor\')"></td></tr>	<tr><td valign="top" colspan="4" height="3" bgcolor="#3366AA"></td></tr>\n'+
						'	<tr><td valign="top">Chi&#7873;u r&#7897;ng</td><td valign="top"><input id="Editor_Img_Width" style="width:80"></td>\n'+
						'		<td valign="top">C&#259;n l&#7873;</td><td valign="top"><select size="1" id="Editor_Img_Align" style="width:80">\n'+
						'		<option value=""></option><option value="left">Tr&#225;i</option><option value="right">Ph&#7843;i</option><option value="center">Gi&#7919;a</option></select></td>\n'+
						'	</tr><tr><td valign="top">Chi&#7873;u cao</td><td valign="top"><input id="Editor_Img_Height" style="width:80"></td>\n'+
						'		<td valign="top">M&#224;u vi&#7873;n</td><td valign="top"><input id="Editor_Img_Border_Color" style="width:80" onclick="Editor_Img_Color_Pick(this)"></td></tr>\n'+
						'	<tr><td valign="top">&#272;&#7897; d&#224;y vi&#7873;n</td><td valign="top"><select id="Editor_Img_Border_Size" size="1" style="width:80">\n'+
						'		<option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option> </select></td>\n'+
						'		<td valign="top">&nbsp;</td><td valign="top">&nbsp;</td></tr></table></td>		<td width="150"><p align="center"><img src="<%=Global_Var("Editor_Img_Path")%>/Editor_Pro_Img/noImage.jpg" id="Editor_Img_Preview"></td></tr>\n'+
						'<tr><td colspan="2" height="40"><p align="center">			<input type="button" value="Xem tr&#432;&#7899;c" onclick="Editor_Img_Redraw_Preview();">&nbsp;\n'+
						'		<input type="button" value="Ch&#232;n &#7843;nh" onclick="Editor_Extra_Waiting_Func(\''+EName+'\');EMsg_Close();">&nbsp; <input type="button" value="Cancel" onclick="EMsg_Close()">&nbsp;</td></tr></table>\n'

			EMsg(Code, P.x-500 , P.y+50 , 520);		Editor_Img_Init('<%=Global_Var("Editor_Img_Path")%>/Editor_Pro_Img/noImage.jpg', 115, 107);	}
	function Editor_Img_Init(src, w, h){	var P = Get('Editor_Img_Preview');	var	Q=Get('Editor_Img_Src');
		P.src=src; Q.value=src;	Editor_Img_Dimension(w,h);	Q.style.width=w; Q.style.height=h;	}

	function Editor_Img_Insert(EName){	var K = new Editor_Img_Get();	K.W = !K.W?'':(' width="'+K.W+'" ');	K.H = !K.H?'':(' height="' + K.H +'" ');
			K.Align= !K.Align?'':(' align="' + K.Align +'" '); K.B_Size = (parseInt(K.B_Size)>0)?(' border="'+K.B_Size+'" '):'';
			if (K.B_Color && !IE && parseInt(K.B_Size)>0){	K.B_Color=FFColor(K.B_Color);	};	K.B_Color = (K.B_Color)?'border-color:'+K.B_Color+';' :'';
			var Pre_Code = '<img src="'+K.Src+'" ' + K.W + K.H + K.Align + K.B_Size + ' style="' + K.B_Color + '"' + '/>'
			if (IE){ var E=eval(EName+'_editor'); E.body.focus(); E.selection.createRange().pasteHTML(Pre_Code) }else{ var C=eval(EName+ '_doFormat'); C('insertHTML',Pre_Code) }	}	}

	function Editor_Img_Dimension(w,h,Mode){	var P = Get('Editor_Img_Preview');	var Q=Get('Editor_Img_Src');	var lim = 130;  w=Math.abs(parseInt(Number(w))) ; h=Math.abs(parseInt(Number(h)));
			//---Neu kich thuoc = 0
			var Original_Ratio = parseInt(Q.style.width) / parseInt(Q.style.height);	if (w==0&&h==0){w=parseInt(Q.style.width);h=parseInt(Q.style.height) }
			if (w==0 && h>0){w = parseInt(h*Original_Ratio) };	if (w>0 && h==0){ h = parseInt(w/Original_Ratio) };
			//----Neu kich thuoc lon hon o chua'
			if (Mode==1){ var W=w/lim; var H = h/lim;	if (W>1 || H>1){	if (W>H){w=lim ;h/=W}else{h=lim; w/=H}	}	}
			P.width=w;	P.height = h;	}

	function Editor_Img_Get(){	//Get all Image Parameter
		this.Src = Get('Editor_Img_Src').value;	this.W = Get('Editor_Img_Width').value;	this.H = Get('Editor_Img_Height').value;
		this.Align = Get_SelectBox('Editor_Img_Align').value; this.B_Color = Get('Editor_Img_Border_Color').style.backgroundColor;
		this.B_Size = Get_SelectBox('Editor_Img_Border_Size').text;	}

	function Editor_Img_Redraw_Preview(){
			var K = new Editor_Img_Get();	var P=Get('Editor_Img_Preview');	P.src=K.Src;	P.border=K.B_Size;		P.style.borderColor = K.B_Color;
			Editor_Img_Dimension(K.W , K.H , 1);		}
	function Editor_Img_Color_Pick(obj){	var P = getPageCoords(obj); Editor_Waiting_Func =function(){Get("Editor_Img_Border_Color").style.background=Editor_Passed_Value}; Color_Palette( P.x, P.y+P.h);}



</script>

