<%
Session('Current_Download_Slot_Num') = 1;

function Control_FileBox(Name, Data_Type , Data_Field, Max_val, Min_Val){
	//---Ke thua cac  thuoc tinh cua Input_Control
	var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
	for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

	//----Ham` Focus JS
	this.Focus_Func = 'function(){	window.location="#'+this.Name+'"	}'

	this.Output = function(){
		this.Type = this.Type?this.Type:'image'
		var Data = Server.HTMLEncode(this.Data)
		if(Data){  var FileName = '('+ Data.substring( Data.lastIndexOf('/')+1 ,
						Data.lastIndexOf('_') )+ Data.substring( Data.lastIndexOf('.'), Data.length ) +')'}
		else {FileName=''}

		//-----Phuc vu cho Download file trong Filebox
		this.Add_Download_Slot = function(path){ var S=Session('Current_Download_Slot_Num');  Session('Download_Slot_'+ S ) = path; Session('Current_Download_Slot_Num')=S+1; return S; }

		switch (this.Type.toLowerCase()){
			//==============IMAGE=================================//
			case 'image':
				var Preview_Img = Data?Data:(Global_Var('FileBox_Path')+'/Img/noImage.jpg')
				var Code =	'<'+'!--Image Code--'+'>\n'+
							'<'+'script>\n'+
							'	function Img_Open_Upload(FName){ window.open(\'' +Global_Var("FileBox_Path")+ '/insert_pic.asp?Type=Image&FName=\'+FName,\n'+
							'		\'upload_image\',\'toolbar=0,location=0,status=1,menubar=0,scrollbars=0,width=400,height=200\')	}\n'+
							'	function Img_Deny(FName){	if (confirm("Ban muon bo hinh anh?")){	Get(FName+\'_ID\').value=\'\';\n'+
							'		Get(FName+\'_FName_Td\').innerHTML = ""		\n'+
							'		Get(FName+\'_File_Preview\').src = \''  +Global_Var("FileBox_Path")+ '/Img/noImage.jpg\';	} }\n'+
							'<'+'/script>\n'+
							'<table border="0" id="table1" cellspacing="0" cellpadding="0"><tr><td>\n'+
							'	<img style="border:1px solid #444;" src="'+Preview_Img+ '" width="150" id="' +this.Name+ '_File_Preview">\n'+
							'</td><td width=10></td>	<td valign=top>\n'+
							'	<input type=button style="width:120px;height: 25px;" value="Ch&#7885;n &#7843;nh kh&#225;c" onclick="Img_Open_Upload(\'' +this.Name+ '\')"><br>\n'+
							'	<input type=button style="width:120px;height: 25px;" value="B&#7887; &#7843;nh" onclick="Img_Deny(\'' +this.Name+ '\')"></td>\n'+
							'</tr><tr><td id="'+this.Name+'_FName_Td" colspan=10 width="200" style="word-wrap:break-word;">'+FileName+'</td></tr></table>\n'+
							'<input name="' +this.Name+ '" value="'+Data+'" id="' +this.Name+ '_ID" type="hidden">'
				break;


			//==============FLASH=================================//
			case 'flash':
				var D = this.Add_Download_Slot(Data);
				var Preview_Flash = Data?Data:(Global_Var('FileBox_Path')+'/Img/NoFlash.swf')
				var Code =	'<'+'!------------------------------------------Flash Code---------------------------------------------------'+'>\n'+
							'<'+'script>\n'+
							'	function Flash_Open_Upload(FName){ window.open(\'' +Global_Var("FileBox_Path")+ '/insert_pic.asp?Type=Flash&FName=\'+FName,\n'+
							'		\'upload_image\',\'toolbar=0,location=0,status=1,menubar=0,scrollbars=0,width=400,height=200\')	}\n'+
							'	function Flash_Deny(FName){		if (confirm("Ban muon bo Flash?")){	Get(FName+\'_ID\').value=\'\';\n'+
							'		Get(FName+\'_FName_Td\').innerHTML = ""		\n'+
							'		Get(FName+\'_Download_But\').innerHTML = ""		\n'+
							'		Get(FName+\'_Flash_Div\').innerHTML = Make_Flash_Code(\'' +Global_Var('FileBox_Path')+'/Img/NoFlash.swf\',115,107);  }  }\n'+
							'	function Make_Flash_Code(src , w, h){\n'+
							'		return	\'<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" width="\'+w+\'" height="\'+h+\'"><param name="movie" value="\'+src+\'">\\n\'+\n'+
							'				\' <embed src="\'+src+\'" type="application/x-shockwave-flash" width="\'+w+\'" height="\'+h+\'"></object>\\n\';	}\n'+
							'<'+'/script>\n'+
							'<table border="0" id="table1" cellspacing="0" cellpadding="0"><tr><td valign=top>\n'+
							'	<div id="' +this.Name+ '_Flash_Div">\n'+
							'		<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" width="200" height="188"><param  name="movie" value="' +Preview_Flash+ '">\n'+
							'		<embed src="' +Preview_Flash+ '" type="application/x-shockwave-flash" width="160" height="158"></object>\n'+
							'	</div>\n'+
							'</td><td width=10></td>	<td valign=top>\n'+
							'	<input type=button style="width:120;height: 25" value="Ch&#7885;n Flash kh&#225;c" onclick="Flash_Open_Upload(\'' +this.Name+ '\')"><br>\n'+
							'	<input type=button style="width:120;height: 25" value="B&#7887; flash" onclick="Flash_Deny(\'' +this.Name+ '\')"><br>\n'+
							'	<span id="'+this.Name+'_Download_But"></span></td>\n'+
							'</tr><tr><td id="'+this.Name+'_FName_Td" colspan=10 width="200" style="word-wrap:break-word;">'+FileName+'</td></tr></table>\n'+
							'<input name="' +this.Name+ '" value="'+Data+'" id="' +this.Name+ '_ID" type="hidden">'
				break;


			//==============MEDIA=================================//
			case 'media':
				var D = this.Add_Download_Slot(Data);
				var Preview_Media = Data?'/Img/Media.jpg':'/Img/NoMedia.jpg'
				var Code =	'<'+'!------------------------------------------Media Code---------------------------------------------------'+'>\n'+
							'<'+'script>\n'+
							'	function Media_Open_Upload(FName){ window.open(\'' +Global_Var("FileBox_Path")+ '/insert_pic.asp?Type=Media&FName=\'+FName,\n'+
							'		\'upload_image\',\'toolbar=0,location=0,status=1,menubar=0,scrollbars=0,width=400,height=200\')	}\n'+
							'	function Media_Deny(FName){		if (confirm("Ban muon bo Video?")){	Get(FName+\'_ID\').value=\'\';\n'+
							'		Get(FName+\'_FName_Td\').innerHTML = ""		\n'+
							'		Get(FName+\'_Download_But\').innerHTML = ""		\n'+
							'		Get(FName+\'_File_Preview\').src = \'' +Global_Var("FileBox_Path")+ '/Img/NoMedia.jpg\'	}	}\n'+
							'<'+'/script>\n'+
							'\n'+
							'<table border="0" id="table1" cellspacing="0" cellpadding="0"><tr><td valign=top>\n'+
							'	<img border="1" src="' +Global_Var("FileBox_Path")+ Preview_Media + '" width="115" id="' +this.Name+ '_File_Preview">\n'+
							'</td><td width=10></td>	<td valign=top>\n'+
							'	<input type=button style="width:120;height: 25" value="Ch&#7885;n Video kh&#225;c" onclick="Media_Open_Upload(\'' +this.Name+ '\')"><br>\n'+
							'	<input type=button style="width:120;height: 25" value="B&#7887; Video" onclick="Media_Deny(\'' +this.Name+ '\')"><br>\n'+
							'	<span id="'+this.Name+'_Download_But"></span></td>\n'+
							'</tr><tr><td id="'+this.Name+'_FName_Td" colspan=10 width="200" style="word-wrap:break-word;">'+FileName+'</td></tr></table>\n'+
							'<input name="' +this.Name+ '" value="'+Data+'" id="' +this.Name+ '_ID" type="hidden">'
				break;


			//==============DOCUMENT=================================//
			case 'document':
				var D = this.Add_Download_Slot(Data);
				var Preview_Doc = Data?'/Img/Doc.jpg':'/Img/NoDoc.jpg'
				var Code =	'<'+'!------------------------------------------Document Code---------------------------------------------------'+'>\n'+
							'<'+'script>\n'+
							'	function Doc_Open_Upload(FName){ window.open(\'' +Global_Var("FileBox_Path")+ '/insert_pic.asp?Type=Document&FName=\'+FName,\n'+
							'		\'upload_image\',\'toolbar=0,location=0,status=0,menubar=0,scrollbars=0,width=400,height=200\')	}\n'+
							'	function Doc_Deny(FName){ if (confirm("Ban muon bo van ban?")){	Get(FName+\'_ID\').value=\'\';\n'+
							'		Get(FName+\'_FName_Td\').innerHTML = ""		\n'+
							'		Get(FName+\'_Download_But\').innerHTML = ""		\n'+
							'		Get(FName+\'_File_Preview\').src = \'' +Global_Var("FileBox_Path")+ '/Img/NoDoc.jpg\'	}	}\n'+
							'<'+'/script>\n'+
							'<table border="0" id="table1" cellspacing="0" cellpadding="0"><tr><td valign=top>\n'+
							'	<img border="1" src="' +Global_Var("FileBox_Path")+ Preview_Doc + '" width="115" id="' +this.Name+ '_File_Preview">\n'+
							'</td><td width=10></td>	<td valign=top>\n'+
							'	<input type=button style="width:120;height: 25" value="Ch&#7885;n tài liệu kh&#225;c" onclick="Doc_Open_Upload(\'' +this.Name+ '\')"><br>\n'+
							'	<input type=button style="width:120;height: 25" value="B&#7887; tài liệu" onclick="Doc_Deny(\'' +this.Name+ '\')"><br>\n'+
							'	<span id="'+this.Name+'_Download_But"></span></td>\n'+
							'</tr><tr><td id="'+this.Name+'_FName_Td" colspan=10 width="200" style="word-wrap:break-word;">'+FileName+'</td></tr></table>\n'+
							'<input name="' +this.Name+ '" value="' +Data+ '" id="' +this.Name+ '_ID" type="hidden">'
				break;	}
		return '<a name=#'+this.Name+'></a>\n'+Code;
	}
}

%>



