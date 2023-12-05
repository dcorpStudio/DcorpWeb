<!--#include file="VB_Function.asp"-->


<%
//--- fast getting data from table intro
function INTRO(title){ return DB_to_Val("Select Detail from INTRO where title='" + title + "' ") }



//--Check DateTime (Check correct date format : DD/MM/YYYY
function Check_Date(x){
	var re = /^\d{2}\/\d{2}\/\d{4}$/
	if (re.test(x)){
		var A = x.split('/'); var DD = parseInt(A[0]); var MM = A[1]; var YY=parseInt(A[2])
		if (',01,03,05,07,08,10,12,'.indexOf(','+MM+',') > -1 && 0<DD && DD<32 ){ return true }
		if (',04,06,09,11,'.indexOf(','+MM+',') > -1 && 0<DD && DD<31 ){ return true }
		if ( MM=='02' && 0<DD && ((YY-2)%4==0 && DD<30) || ((YY-2)%4==0 && DD<29)){ return true }
	}
	return false;
}


//--function to check mail
function Check_Email(x){
	var re = /^[A-Za-z0-9._-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/i
	return re.test(x)
}

//-----Ham ho tro hien thi quang cao, voi 2 dinh dang la Flash hoac Image
	function Image_or_Flash(file_path, width, height, Inside_Tag){
		//Check the type of file:
		file_path = new String(file_path); if (!file_path || file_path=="undefined"){return ""}
		var l= file_path.length;
		var ext=String(file_path.substr(l-3, 3)).toLowerCase()

		//---Check Width & Height
		if (width){width = " width="+width+" " }
		if (height){height = " height="+height+" " }
		var size = width+height

		//--Display the media file
		switch (ext){
			case 'jpg':
			case 'png':
			case 'bmp':
			case 'gif':
			case 'jpeg':
			case 'tif':
				R( '<img src="' + file_path + '" ' + size +' ' + (Inside_Tag||'') + ' >');
				break;
			case 'swf':
				R('<OBJECT '+
			      'codeBase=http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0 '+
			      size + ' classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 ' + (Inside_Tag||'') +' >'+
					' <PARAM NAME="movie" VALUE="' + file_path + '">'+
					' <PARAM NAME="quality" VALUE="High"> '+
			        '    <embed src="' + file_path + '" quality="High" '+
			      ' pluginspage="http://www.macromedia.com/go/getflashplayer" '+
			      ' type="application/x-shockwave-flash" ' +size+ ' ' +(Inside_Tag||'')+ ' ></embed>'+
				' </OBJECT>');

				break;
		}
	}%>





<%
//---------------------------------------------------------------
//--------------Ham` bien 1 chuoi~ Matrix Data thanh 1 Array;  M_String la` chuoi~ lay tu` CSDL.  I_Num la` so' Item
function Matrix_to_Arr( M_Str , Cols ){
	if (!M_Str || isNaN(Cols)){
		return new Array
	}else{
		var Result_Arr = new Array()
		var M_Arr = String(M_Str).split('\r\n');
		for (var i=0; i<(M_Arr.length/Cols); i++){
			Result_Arr[i] = new Array()
			for (var j=0; j<Cols; j++){
				Result_Arr[i][j] = M_Arr[i*Cols + j]
			}
		}
		return Result_Arr
	}
}


//-----Ham` trich lay 1 Image dau` tien tu` 1 chuoi~ Image
function Single_Image(Img , NoImg){
	Img = String(Img);
	if (Img!=''){
		return Img.match(/^.+(\r||\n)/)[0].replace(/(\r||\n)/g , '')
	}else{
		return (NoImg || '')
	}
}


//---------------Ham` xu ly text cua thanh vien la ket hop cua 2 ham :
//------Convert : (De tranh XSS attack)
//------Extract_News : Gioi han noi dung text
//----Tham so L la do dai` can` trich, T la` string
	function MEM_Text(T,L,X){
		T=new String(T)
		return Convert(Extract_News(T,L,X),1)
	}


//---Ham` cat 1 chuoi~ lien tuc (dang : aaaaaaaaaaaaaaaaaaaaaaaaaaa) thanh nhieu chuoi~ con (aaa aaa aaa aaa aaa)
//---De tranh vo~ cau truc table
//----Tham so Num la` so' ky tu lien nhau toi da cho phep
	function Break_Long_Text(T , Num){
		if (isNaN(Num)){ Num=40 }
		var regex = eval('/(\\S{'+Num+'})(\\S)/')
		while ( regex.test(T) ){
			T = T.replace( regex ,  '$1 $2'  )
		}
		return T
	}


//--------------Ham` ho~ tro tao ra MailBody cho cac don dat hang` cua khach hang` gui cho Admin
//--------------Tham so nhan vao` la` 1 Array chua' cac Control & 1 Array chua' cac doan IntroText
	function Contact_BODY(Control_Arr , Intro_Arr ){
		var C=Control_Arr;

		var Code='<table width=500 cellpadding=10 cellspacing=10 '+
					' style="border:1px solid #cc6600; border-collapse:collapse" border=1 bordeColor="#ffffff">\n '

		for (var i=0;i<C.length;i++){
			Code+=	'<tr><td width=140 style="border-bottom:1px solid #336699" height="25"> ' + Intro_Arr[i] + ' </td> \n' +
					'<td width=320 style="border-bottom:1px solid #336699">' + String(C[i].Data).C(1) + ' </td></tr> \n'
		}
		return Code + '</table>'
	}



//---------Ham` tra ve ten cua cac ngay` trong tuan` = tieng Viet. VD: thu hai, thu ba.... chu nhat
function Day_Name(){
   var d, day, x;
   var x = new Array("Ch&#7911; nh&#7853;t", "Th&#7913; hai", "Th&#7913; ba");
   var x = x.concat("Th&#7913; t&#432;","Th&#7913; n&#259;m", "Th&#7913; s&#225;u");
   var x = x.concat("Th&#7913; b&#7843;y");
   d = new Date();
   day = d.getDay();
   return(x[day]);
}



//--------------Ham` ho~ tro Format gia ban, neu la` text thi` de nguyen, neu la` so' thi` Format thanh` dang : 2.000.000
	function Format_Price(Price){
		var K = isNaN(Price)
		return K? Convert(Price,0): (VBFormat_Money(Price)+',000 vn&#273;')
	}


//--------------Ham` ho tro lay' Image dau tien tu` NImage
//-Param Img se~ la` chuoi~ co dang ' URL1 \n URL2 \n URL3 .....'. Ham` nay` dung` de lay' URL dau` tien
//---Neu' ko lay' dc Image dau` tien (do Image ='') thi` se lay' hin`h mac dinh la` NoImage
	function Get_NImage(Img , NoImage){
		if (Img && Img !=''){
			var Img_Arr = (new String(Img)).split('\n')
			if (Img_Arr[0]!=''){ return Img_Arr[0] }
			else{ return Img_Arr[1] }
		}else{
			return NoImage? NoImage:(Global_Var('Site_Path') + '/Home_Files/NoImage.jpg')
		}
	}


///////////////////////////////////////////////////Cac ham` co ban=========//
//=========================================================================//
	//-----Ham` XRequest(), dung` the giup nhung~ truong` can hien thi gia tri khi Request khong bi bien thanh` undefined
	//-----(Ham` VBrequest khong lam duoc)
		function XRequest(x){
			var T = String( Request(x) )
			return (T=='undefined' || T=='')?new String(''):T
		}

	//----Ham` cat' 1 chuoi~ ra 1 so' ki tu nhat dinh, dung` lam` intro cho ban tin
		function Extract_News( Intro , CharNum , Extra ){
			var K = new String(Intro);
			var P = K.substring(0, CharNum)
			if (K.length>CharNum){ P=P.substring( 0 , P.lastIndexOf(' ')) }
			return  P + ((K.length>CharNum)?(Extra || '...'):'')
		}


	//-----Ham` tao ra ma~ so' random cho trang
		function S_Code(){	return HashEncode(Math.random())	}

	//-----Ham` tat' cua Response.Write
		function R(t){Response.Write(t);}
		function F(){Response.Flush()}
	//-----Tao ra 1 horizontal line & line break
		function hr(){R("<hr>")};
		function br(num){	if (num==undefined){num=1}; for (var i=0;i<num;i++){R("<br>")}	}
	//-----Ham` xuat ra  chrW()
		function ChrW(myNum){
			if (!isNaN(myNum))
				return String.fromCharCode(myNum)}
	//-----Ham` tat ma~ hoa' HTMLEncode. Tham so' mode = 1 --> Replace toan bo chr(13) & chr(10) thanh` "<br>"
		function Convert(t,convert_mode){
			if (!t || String(t)=='' || String(t)=='undefined'){ return String('') }
			else{
				if (t){t=Server.HTMLEncode(t);
					switch (convert_mode){
						case 1 : return t.replace(/\n/g , "<br>")
						case 2 : return t.replace(/\n/g , "<br>").replace(/\t/g , " &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ")
						default : return t
					}
				}
			}
		}

	//-----Ham` dung` Clean text (Neu ko tien dun`g Prototype)
		function Clean(x){return new String(x).Clean(); }
	//-----Ham` cho ra length cua 1 doan text
		function Txt_Len(x){ return (typeof(x)=='string')?x.length:0}


	//==============================Convert ngay` thang sang dinh dang dd/mm/yy
		Date.prototype.VDate = function(sep){
								if (sep==undefined){sep="/"}
								return this.getDate() + sep + (this.getMonth()+1) + sep + this.getYear()   }
		String.prototype.VDate = function(sep){
									if (sep==undefined){sep="/"}
									var d= new Date(this.toString())
									return d.getDate() + sep + (d.getMonth()+1) + sep + d.getYear() }

	//==============================Xay dung cac prototype Trim / Clean cho String Obejct=====//
		String.prototype.Trim = function(){return this.replace(/(^\s+)|(\s+$)/gi , "")}
		String.prototype.LTrim = function(){return this.replace(/(^\s+)/gim , "")}
		String.prototype.RTrim = function(){return this.replace(/(s+$)/gim , "")}
		String.prototype.Clean = function(){return this.replace(/(^\s+)|(\s+$)/gi , "").toLowerCase();}
		String.prototype.Reverse = function(){return this.toString().split('').reverse().join('')}
		String.prototype.o = function(){	return "<span class=\""+this.Class+"\" style=\""+this.Style+"\">"+this.toString+"</span>"	}
		String.prototype.C = function(Mode){ return Convert(this.toString(), Mode ) }


//////////////////////////////////////////////////////////Cac ham` ho tro CSDL==//
/////////////////////////////////////////////////////////////////////////////////
	
	//============================================Cac ham` ho tro ket noi (Connection)_____________________________________________________

	//-----Ham` tao 1 Connection dua vao` Global_Var("Conn_Str") hoac la`ConnStr dua vao`.
		function Conn_Obj(Conn_Str){
			if (!Conn_Str){Conn_Str = Global_Var("Conn_Str");}
			var K = new ActiveXObject("ADODB.Connection");
			K.Open(Conn_Str);	return K;		}

	//-----Ham` tao. MSAccess Connection Object. Tham so' myPath co the la` "Conn_Str" , co the la` "virtual path" hoac "physic path"
		function MDB_Conn(myPath){
			if (myPath.indexOf("=") < 0){
				if (myPath.indexOf(":") < 0){	myPath = Server.Mappath(myPath)		}
				myPath = "PROVIDER=MICROSOFT.JET.OLEDB.4.0;DATA SOURCE=" + myPath	}
			var Conn = new ActiveXObject("ADODB.Connection")
			Conn.open(myPath);		return Conn; }

	//-----Ham` tao SQL 2000 Connection Object (Normal)
		function SQL2k_Conn(DB_Name, User, Pass){
			Conn_Str = "Driver={SQL Server};Server=localhost;Database=" + DB_Name + ";Uid=" + User+ ";Pwd=" + Pass
			var Conn = new ActiveXObject("ADODB.Connection")
			Conn.open(Conn_Str);		return Conn; }

	//-----Ham` tao SQL 2005 Connection Object (Normal)
		function SQL2k5_Conn(DB_Name, User, Pass){
			Conn_Str = "Driver={SQL Native Client};Server=localhost;Database=" + DB_Name + ";Uid=" + User+ ";Pwd=" + Pass + ";"
			var Conn = new ActiveXObject("ADODB.Connection")
			Conn.open(Conn_Str);		return Conn;}


	//=====================================================Cac ham` lay' lieu.==//_____________________________________________________

	//-----Ham` lay' 1 duy nhat du~ lieu & dua vao 1 bien'
		function DB_to_Val(SQL,Conn){
			//if ( String(Session("Single_Connection")) != 'undefined' ){
			//	Session("Single_Connection") += 1
			//}else{ Session("Single_Connection")=1 }

			//--------Tranh viec bao loi~ doi voi MSSQL. Trong cau SQL ko dc phep co dau nhay doi
			SQL = String(SQL).replace(/"/g , "'")

			if (Conn==undefined){ Conn = Conn_Obj(); }
			var RS=new ActiveXObject("ADODB.RecordSet")
//Response.Write(SQL); Response.Flush();
			RS.open(SQL,Conn)
			if (!RS.EOF){ var R = RS.fields(0).value
				if (String(R)=='' || String(R)=='undefined'){ R='' }
			}
			RS.Close(); Conn.Close();
			RS=null; Conn=null;
			return R;
		}


	//-----Ham` lay' 1 row du~ lieu & ghi vao` 1 Array
		function DB_to_Arr1(SQL,Conn){
			//if ( String(Session("Array_Connection")) != 'undefined' ){
			//	Session("Array_Connection") += 1
			//}else{ Session("Array_Connection")=1 }

			//--------Tranh viec bao loi~ doi voi MSSQL. Trong cau SQL ko dc phep co dau nhay doi
			SQL = String(SQL).replace(/"/g , "'")

			if (Conn==undefined){	Conn = Conn_Obj();}
			var RS=new ActiveXObject("ADODB.RecordSet")
			RS.open(SQL,Conn)
			if (!RS.EOF){  var Result_Arr = RS.getRows() }
			RS.Close();Conn.Close();
			RS=null; Conn=null;
			if (Result_Arr != undefined){
				return Result_Arr.toArray();
			}
		}

	//----Ham` lay' du~ lieu & gan' vao` 1 mang VBArray, dong thoi` gan' Field_Arr cho VBArray
	function DB_to_Arr(SQL,Conn){
			//if ( String(Session("Multi_Connection")) != 'undefined' ){
			//	Session("Multi_Connection") += 1
			//}else{ Session("Multi_Connection")=1 }

		//--------Tranh viec bao loi~ doi voi MSSQL. Trong cau SQL ko dc phep co dau nhay doi
		SQL = String(SQL).replace(/"/g , "'")

		if (Conn==undefined){Conn = Conn_Obj();}
		var RS=new ActiveXObject("ADODB.RecordSet")
//R(SQL);F();hr();
		RS.open(SQL,Conn)
		if (!RS.EOF){
			var Result_Arr = new VBArray(RS.GetRows())
			Result_Arr.Field_Arr = new Array;
			Result_Arr.Field_Obj = new Object();

			for (var i=0;i<RS.Fields.Count;i++){
				Result_Arr.Field_Arr.push(RS.Fields(i).Name.toLowerCase())
				Result_Arr.Field_Obj[RS.Fields(i).Name.toLowerCase()]=i	}
		}
		RS.Close();Conn.Close();
		RS=null; Conn=null;
		return Result_Arr
	}


	//================================================Cac ham` thay doi du~ lieu.==//_____________________________________________________

	//----Ham` delete mot. row du~ lieu cho truoc & tra ve` status. Param la` : "Tbl_Name","ID","Connection"
	//ID co the la` 1 chuoi~ cac ID , phan cach nhau boi dau' phay.// Tbl_Name co the la` cau SQL kieu : "Select * from ... where ..."
	function DB_Delete(Tbl_Name , ID_List , Conn){
		var SQL = '';	if (!Conn){	Conn=Conn_Obj(); };
		if (Clean(Tbl_Name).indexOf(' ') > -1){ SQL = Tbl_Name }else{ SQL = 'Select * from '+Tbl_Name+' where ID in ('+ID_List+')' }
		var RS=new ActiveXObject("ADODB.RecordSet");	RS.open(SQL,Conn,3,3);
		if (!RS.EOF){	RS.Delete();	return true;	}else{return false;}
		RS.Close();Conn.Close();
		RS=null; Conn=null;
	}




	//----Ham` Insert 1 record row vao` table. Data se~ phai la` 1 JScript_Array, (Control_Array hoac la` Array thuong`);
	//----Field la` thu tu cac Field tuong ung voi thu tu cua du~ lieu trong Data. Neu' ko co field thi` thu' tu se~ la` thu tu native trong Table
	//----Neu' la` Control_Arr thi` se~ tim` Field tuong ung bang` thuoc tinh Data_Field cua Control
	function DB_Insert(Tbl_Name , Data, Conn , Field_Order ){
		if (!Conn){ Conn=Conn_Obj() };
		if (Clean(Tbl_Name).indexOf(' ')>-1){	var SQL = Tbl_Name;		}else{	var SQL = 'Select * from '+Tbl_Name	}

		var RS = new ActiveXObject('ADODB.RecordSet');	RS.Open(SQL, Conn, 3,3);
		RS.AddNew();

		if (Field_Order){ var Field_Arr = Field_Order.split(',') }
		for (var i=0;i<Data.length;i++){
			//--Kiem tra kieu Data la` Control_Arr hay Arr thuong`
			if (Data[i].Data_Field){
				//------Neu la Control_Arr, neu' thuoc tinh Data_Ignore cua Control la` 'true' (ko lien quan toi DB) thi` bo qua ko cap nhat
				if (!Data[i].Data_Ignore){
					var iField_Name = Data[i].Data_Field;
					var RS_Value = Data[i].Data;
				}else{
					iField_Name = 'This Will Never Appears to be a Field_Name'
				}
			}else{
				var RS_Value = Data[i];
				if (Field_Arr){var iField_Name = Field_Arr[i]}
			}

			if (!iField_Name){var iField_Name = parseInt(new String(i+1)) }

			if (iField_Name!='This Will Never Appears to be a Field_Name'){
				if (RS_Value!=null && RS_Value!=''){
//---R('///' + iField_Name + '////'); F()
					RS.Fields(iField_Name) = RS_Value;	iField_Name='';
				}
			}
		}
		RS.Update();
		RS.Close();Conn.Close();
		RS=null; Conn=null;
	}



	//----Ham` Update 1 record. Data se~ phai la` 1 JScript_Array, (Control_Array hoac la` Array thuong`);
	//----Field la` thu tu cac Field tuong ung voi thu tu cua du~ lieu trong Data. Neu' ko co field thi` thu' tu se~ la` thu tu native trong Table
	//----Neu' la` Control_Arr thi` se~ tim` Field tuong ung bang` thuoc tinh Data_Field cua Control
	function DB_Update(Tbl_Name , ID_List , Data, Conn , Field_Order ){
		if (!Conn){ Conn=Conn_Obj() };
		if (Clean(Tbl_Name).indexOf(' ')>-1){	var SQL = Tbl_Name;		}else{	var SQL = 'Select * from '+Tbl_Name+' where ID in ('+ID_List+')'	}

		var RS = new ActiveXObject('ADODB.RecordSet');	RS.Open(SQL, Conn, 3,3);
		var Data_Exist = false;
		while (!RS.EOF){	Data_Exist = true;
			if (Field_Order){ var Field_Arr = Field_Order.split(',') }
			for (var i=0;i<Data.length;i++){
				//--Kiem tra kieu Data la` Control_Arr hay Arr thuong`
				if (Data[i].Data_Field){
					//------Neu la Control_Arr, neu' thuoc tinh Data_Ignore cua Control la` 'true' (ko lien quan toi DB) thi` bo qua ko cap nhat
					if (!Data[i].Data_Ignore){
						var iField_Name = Data[i].Data_Field;
						var RS_Value = Data[i].Data;
					}else{
						iField_Name = 'This Will Never Appears to be a Field_Name'
					}
				}else{
					var RS_Value = Data[i];
					if (Field_Arr){var iField_Name = Field_Arr[i]}
				}

				if (!iField_Name){var iField_Name = parseInt(new String(i+1)) }

				if (iField_Name!='This Will Never Appears to be a Field_Name'){
					if (RS_Value && RS_Value!=''){
						RS.Fields(iField_Name) = RS_Value ;
					}else{
//R('///' + iField_Name + '////'); F()
						RS.Fields(iField_Name) = Session("This_Will_Never_Appears_to_be_Variable") ;
					}
				}
				iField_Name='';
			}


			RS.Update();
			RS.MoveNext();
		}
		RS.Close();Conn.Close();
		RS=null; Conn=null;
		return Data_Exist;
	}




////////////////////////////////////////////////////////////////////////////////Array Prototype
	//------------Copy  Array
	Array.prototype.Clone = function(){ return this.slice(0);}
%>


