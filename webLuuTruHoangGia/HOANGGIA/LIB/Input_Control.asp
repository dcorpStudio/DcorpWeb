<%Response.Buffer = true%>

<%
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// DATA TYPE Object

	//--- Data Type Object la` Class ho tro cho Control. No' chua' 1 Object, luu lai 2 ham` kiem tra kieu du lieu (1 Server Function , 1 Client(JavaScript) function)
	//---Nguyen tac cua ham` la : No' se convert du lieu dau vao` thanh` kieu DL chuan, neu' ko thanh` cong, no' tra ve` False (luu y' : khi kiem tra phai dung operator  === false)
	//---Neu' co them tham so' Method=1 thi` no' se Convert Data sang kieu du lieu de co the so sanh voi' Max_Val & Min_Val.
	function Control_Data_Type(){
		this.A = new Object;

		//----Ham` them kieu du lieu tu ben ngoai`
		this.Add = function( Data_Type_Name , Server_Func , Client_Func ){
					this.A[Clean(Data_Type_Name)] = new Array(Server_Func , Client_Func ) }

		//----1 so kieu du lieu co ban co san (instrinsic dataType)
		var Float_Server = function(x){ x=parseFloat(x); return (isNaN(x))?false:x; }
		var Float_Client = 'function(x){ x=parseFloat(x); return (isNaN(x))?false:x; }'
		this.Add( 'Float' , Float_Server , Float_Client)

		var Int_Server = function(x){ x=parseInt(x); return (isNaN(x))? false:x; }
		var Int_Client = 'function(x){ x=parseInt(x); return (isNaN(x))? false:x; }'
		this.Add( 'integer' , Int_Server , Int_Client )

		var Txt_Server = function(x,Method){ return (Method==1)? Txt_Len(x) : x; }
		var Txt_Client = 'function(x,Method){ return (Method==1)? x.length : x; }'
		this.Add( 'Text', Txt_Server , Txt_Client )

		var Email_Server = function(x,Method){ var re = /^[A-Za-z0-9._-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/i
									if (Method==1){return Txt_Len(x)}else{ return (re.test(x))?x:false;}	}
		var Email_Client = 'function(x,Method){ var re = /^[A-Za-z0-9._-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/i\n\t\t\
									if (Method==1){return x.length}else{ return (re.test(x))?x:false;}	}'
		this.Add('email' , Email_Server , Email_Client)

		var Date_Server =  function(x){ var re = /^\d{1,2}[-:/]\d{1,2}[-:/]\d{4}$/;	return (re.test(x))?x:false;	}
		var Date_Client = 'function(x){ var re = /^\d{1,2}[-:/]\d{1,2}[-:/]\d{4}$/;	return (re.test(x))?x:false;	}'
		this.Add('date' , Date_Server , Date_Client)
	}


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// CONTROL  FAMILY
	//--Code cua Control phai' co' truong` Data de chua du lieu cua Control, phai co' ID de truy xuat qua JS function. Phai co thuoc tinh Output la` 1 ham` 

	//_____________________________________________________________________________________
	//--------------NATIVE  INPUT_CONTROL--------------------------------------------------------------------------------------------------
	function Input_Control(Name, Data_Type , Data_Field, Max_Val, Min_Val){
		//--Nhan Param
		this.Name=Clean(Name); this.Data_Type=Data_Type?Clean(Data_Type):'text'; this.Data_Field=Data_Field?Clean(Data_Field):this.Name;
		this.Max_Val = (Max_Val=='')?null:Max_Val; this.Min_Val = (Min_Val=='')?null:Min_Val;
		this.ID = this.Name+'_ID'; this.Inside_Tag=' ';
		this.Width=600;

		//----Condition_Arr chua' cac thong tin :  Server_Function / Client_Function / Err_Msg. Neu' Condition_Arr[i] = null --> bo qua
		//----Vi tri so' 0,1,2 danh` cho cac ham` : Data_Type_check / Max_Val_Check / Min_Val_Check
		var DT = (new Control_Data_Type).A[this.Data_Type]
		//-----Data Type check Array
		var DataType_Arr = Array(DT[0], DT[1], 'Wrong Data Type !');

		//-----Outmax check Array
		if (this.Max_Val){	eval('var Max_Server_Func = function(x){ return ( DT[0](x,1)>'+this.Max_Val+')?false:x };')
			var Max_Client_Func = 'function(x){ return (DT_'+this.Data_Type+'(x,1)>'+this.Max_Val+')?false:x };'
			var Max_Arr = Array (Max_Server_Func , Max_Client_Func , 'Outmax error !') }else{var Max_Arr = false}

		//-----Outmin check Array
		if (this.Min_Val){	eval('var Min_Server_Func = function(x){ return ( DT[0](x,1)<'+this.Min_Val+')?false:x };')
			var Min_Client_Func = 'function(x){ return (DT_'+this.Data_Type+'(x,1)<'+this.Min_Val+')?false:x };'
			var Min_Arr = Array (Min_Server_Func , Min_Client_Func , 'OutMin error !');		}else{var Min_Arr=false}

		this.Condition_Arr = new Array( DataType_Arr  ,  Max_Arr , Min_Arr )

		this.Add_Condition = function( Server_Func , Client_Func , Err_Msg ){
									this.Condition_Arr.push( new Array(Server_Func , Client_Func , Err_Msg) )	}

		this.Set_Err = function(Err_Num,Err_Msg){ if (Clean(Err_Num)=='all'){this.Condition_Arr['All']=Err_Msg}
												  else{this.Condition_Arr[Err_Num][2]=Err_Msg;} }
	}


	//-----------------------------TEXTBOX  CONTROL_____________________________________________________
	function Control_Textbox(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		//---Output_function
		this.Output = function(){ if (this.Style===undefined){	this.Style = ' style="width:'+this.Width+'px;border:1px solid #336699;" ' }
					return '<input type="' + (this.Type || 'text') + '" name="'+this.Name+'" ID="'+this.ID+'" '+this.Style+' '+this.Inside_Tag+' value="'+Convert(this.Data)+'" >\n'	}
	}



	//----the lemma function for captcha control
	function Code_2_Captcha(Code , Task){
		Code = String( MD5( Clean(Code) ) );
		Task = String( MD5( Clean(Task) ) );
		Code = Code.substr(1,2) + Code.substr(5,2) + Code.substr(12,3);
		return MD5( Code + Task );
	}

	//-----------------------------CAPTCHA  CONTROL (SECURITY IMAGE)_____________________________________________________
	function Control_Captcha(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		//--------Check against Session
		this.Set_Session_Name = function(S_Name){
			this.Session_Name = S_Name
			eval( 'var Server_Func = function(x){ return ( x != Session("' +this.Session_Name+ '") )?false:x };' )
			this.Add_Condition( Server_Func , 'function(x){return true}' , 'M&#227; an to&#224;n kh&#244;ng ch&#237;nh x&#225;c' )
		}

		//---Output_function
		this.Output = function(){
					if (!this.Session_Name){this.Session_Name='captcha_code'}

					//------This part generate the random code to send to captcha_image.aspx & store in the DB
					var captcha_length = 4;															//---The length of the captcha

					var code = String( MD5( Math.random() ) );		//---The original code to send to aspx page

					var task = this.Session_Name;
					var captcha = Code_2_Captcha( code, task ).substring(0 , captcha_length);
					Session(this.Session_Name) = captcha;

					//------This part generate the out put HTML code
					if (this.Style===undefined){	this.Style = ' style="width:'+(this.Width-140)+'px; height:22px;" ' }
					return '<table width='+this.Width+'><tr><td valign=top> <input type="' + (this.Type || 'text') + '" name="'+this.Name+'" ID="'+this.ID+'" '+this.Style+' '+this.Inside_Tag+' value="" >\n'+
							' </td> <td valign=top> <img src="'+ Global_Var('site_path') +'/lib/captcha_image.aspx?Task=' +this.Session_Name+ '&Code='+code+'" id="Captcha_Img_'+this.Name+'">\n'+
							' </td></tr></table>'	}
	}




	//-----------------------------TEXTAREA CONTROL_____________________________________________________
	function Control_Textarea(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		this.Height = 120			//--Default Height
		//----Output function
		this.Output = function(){ if (this.Style===undefined){	this.Style = ' style="width:'+this.Width+'px;height:'+this.Height+';font:12/16px Verdana;border:1px solid #336699;" ' }
		return '<textarea name="'+this.Name+'" ID="'+this.ID+'" '+this.Style+' '+this.Inside_Tag+' >'+Convert(this.Data)+'</textarea>\n'
		}
	}

	//-----------------------------SELECT BOX CONTROL_____________________________________________________
	function Control_Selectbox(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		//--Ham` lay' value cua Control
		this.Get_Func = 'function(){var P = Get("'+this.ID+'");	return P.options[P.selectedIndex].value; }'
		this.Body='';	this.Intro_Text = ' '

		//=============Output function
		this.Output = function(){
			var myItem = this.DB
			//------Tao Body cho Select box. Chu' y':  DB cua Select box luon la` Array co' field 1 la` Value, field 2 la` Label cua Option
			if (myItem!=null){ this.Body='';	if (myItem.constructor==VBArray){
				for (var i=0;i<=myItem.ubound(2);i++){	if (Clean(this.Data)==Clean(myItem.getItem(0,i))){var selected=' selected '}else{var selected=''}
					this.Body+='<option value="'+Convert(myItem.getItem(0,i))+'" '+selected+'>'+Convert(myItem.getItem(1,i))+'</option>\n'	}
			}else{
				for (var i=0;i<myItem.length;i++){	if (Clean(this.Data)==Clean(myItem[i][0])){var selected=' selected '}else{var selected=''}
					this.Body+='<option value="'+Convert(myItem[i][0])+'" '+selected+'>'+Convert(myItem[i][1])+'</option>\n'	}
			}		}

			//-------Cac thuoc tinh co ban
			if (this.Style===undefined){	this.Style = ' style="width:'+this.Width+'px; border:1px solid;" ' }
			if (this.Intro_Text!=null){this.Body='<option value="">'+Convert(this.Intro_Text)+'</option>\n'+this.Body}
			return '<select name="'+this.Name+'" ID="'+this.ID+'" '+this.Style+' '+this.Inside_Tag+' >\n'+this.Body+'</select>\n'
		}	}



	//--CHECKBOX CONTROL :  input Data la` 1 String chua' cac Value phan cach nhau boi dau' phay (comma) ","_____________________________
	function Control_Checkbox(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		//----Ham` lay' value hien thoi`
		this.Get_Func = 'function(){ var Num=Get("'+this.Name+'_Check_Num").value;\n'+
						'\t\t var Result="";\n\t\t for (var i=0;i<parseInt(Num);i++){	var P=Get("'+this.Name+'_ID"+i);\n'+
						'\t\t\t if(P.checked){Result+=P.value+","}	};\n \t\t return "," + Result;	}'
		this.Focus_Func =	'function(){	window.location="#'+this.Name+'"	}'
		this.Body=''

		//=======Output function
		this.Output = function(){
			var myItem = this.DB
			//-----Create Check box Body (chu y : DB phai co cau truc la :  Array( Value , Label )
			if (myItem!=null){	var D = ','+Clean(this.Data).replace(/ /gi , '')+',';
				var Total_Item = eval(	myItem.push?'myItem.length':'myItem.ubound(2)+1'	)
				this.Body =	'<input type=hidden id="'+this.Name+'_Check_Num" value="'+Total_Item+'">\n <a name="#'+this.Name+'"></a>\n\t\t'
				if (myItem.constructor==VBArray){
					for (var i=0;i<=myItem.ubound(2);i++){ if (D.indexOf(','+Clean(myItem.getItem(0,i))+',')>-1){var selected=' checked '}else{var selected=''}
						this.Body+='<input type="checkbox" name="'+this.Name+'" ID="'+this.ID+i+'" value="'+Convert(myItem.getItem(0,i))+'" '+selected+'>'+Convert(myItem.getItem(1,i))+'<br>\n'	}
				}else{
					for (var i=0;i<myItem.length;i++){	if (D.indexOf(','+Clean(myItem[i][0])+',')>-1){var selected=' checked '}else{var selected=''}
						this.Body+='<input type="checkbox" name="'+this.Name+'" ID="'+this.ID+i+'" value="'+Convert(myItem[i][0])+'" '+selected+'>'+Convert(myItem[i][1])+'<br>\n'	}
			}		}

			//----Style
			if (this.Style===undefined){	this.Style = ' style="width:'+this.Width+'px;font:12/16px Verdana;border:1px solid #336699;" ' }
			return this.Body;
		}
	}


	//-----------------------------NSELECTBOX CONTROL :  Select box nhieu` tang` gop chung lam` 1 ______________________________________________
	function Control_NSelectbox(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		//--Ham` lay' value cua Control
		this.Get_Func = 'function(){var P = Get("'+this.ID+'");	return P.options[P.selectedIndex].value; }'

		//--Cac thuoc tinh mac dinh:
		this.Sep_Arr = new Array('','&nbsp;&nbsp;&nbsp; -','&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')		//---------Ki tu them dang truoc cac Item trong Select box theo cap'
		this.Root_Char = '0'	//---Ki tu dung` de bieu tuong cho Item cap 0 trong Menu

		//===========Output function
		this.Output = function(){
			var myItem = this.DB;
			//-----Xay dung Body-----Cau truc DB Item phai theo thu tu :   ID - ParentID - MENU_TXT
			if (myItem!=null){
				if (myItem.constructor==VBArray){myItem=myItem.toNormalArray()};

				//-------Enable_Item list : Add 2 comma to start & end
				if (this.Enable_Item){this.Enable_Item = ","+this.Enable_Item+","}

				//----------------------------Lap qua mang myItem de xay dung Structure--Moi~ Item se co' ki hieu :  @i/ , moi~ Parent Extend for replace se co dang :  #ID/
				this.Body = '#'+this.Root_Char+'/'; var This_Parent=','+this.Root_Char+','; Next_Parent=','; var This_Level = 0; var A=myItem; var j=0;
				while (j<A.length){		var Next_Generation_Exist = false		//---Neu' ton` tai the he ke tiep , neu ko thi` break;
					for (var i=0;i<A.length;i++){
						if (This_Parent.indexOf(','+A[i][1]+',')>-1){	j+=1; Next_Generation_Exist = true;
							this.Body = this.Body.replace( '#'+A[i][1]+'/' , '@'+i+'/ #'+A[i][0]+'/ #'+A[i][1]+'/' )
							Next_Parent+=A[i][0]+','; A[i].push(This_Level);

							//-----Selected Item
							if (Clean(A[i][0])==Clean(this.Data)){var selected=' selected '}else{var selected=''}

							if (this.Sep_Arr[This_Level]==null){this.Sep_Arr[This_Level]='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+this.Sep_Arr[This_Level-1]}			//---Neu' Sep_Arr ko du den' level hien tai, tu tao them 1 element cho Level hien tai
							A[i].Code = '\t\t\t<option value="'+Convert(A[i][0])+'" '+selected+' >'+this.Sep_Arr[This_Level]+Convert(A[i][2])+'</option>\n'	}
							if (This_Level==0){A[i].Code = '\t\t\t<option value=""></option>\n'+A[i].Code}			//Chen` Blank Option vao` dau` Option cap' 0
					};	if (!Next_Generation_Exist){break;};
					This_Parent=Next_Parent; Next_Parent=','; This_Level+=1;	}

				this.Body = this.Body.replace( /#\w+?\//gi , '' )
				this.Body = this.Body.replace( /@(\w+?)\//gi , '"+A\[$1\].Code+"' )
				this.Body = eval('"'+this.Body+'"') + '\n<option value=""></option>\n'
			}

			//----1 so thuoc tinh dinh dang
			if (this.Style===undefined){	this.Style = ' style="width:'+this.Width+'px;font:12/16px Verdana;border:1px solid #336699;" ' }
			if (this.Intro_Text!=null){this.Body='<option value="">'+Convert(this.Intro_Text)+'</option>\n'+this.Body}
			return '<select name="'+this.Name+'" ID="'+this.ID+'" '+this.Style+' '+this.Inside_Tag+' >\n'+this.Body+'</select>\n'
		}	}











	//-----------------------------3 Tiers SELECTBOX CONTROL :  Select box nhieu` tang` gop chung lam` 1 ______________________________________________
	function Control_3Selectbox(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		//--Ham` lay' value cua Control
		this.Get_Func = 'function(){var P = Get("'+this.ID+'");	return P.options[P.selectedIndex].value; }'

		//--Cac thuoc tinh mac dinh:
		this.Sep_Arr = new Array('','&nbsp;&nbsp;&nbsp;|__')		//---------Ki tu them dang truoc cac Item trong Select box theo cap'
		this.Root_Char = '0'	//---Ki tu dung` de bieu tuong cho Item cap 0 trong Menu

		//===========Output function
		this.Output = function(){
			var myItem = this.DB;
			//-----Xay dung Body-----Cau truc DB Item phai theo thu tu :   ID - ParentID - MENU_TXT
			if (myItem!=null){
				if (myItem.constructor==VBArray){myItem=myItem.toNormalArray()};

				//-------Enable_Item list : Add 2 comma to start & end
				if (this.Enable_Item){this.Enable_Item = ","+this.Enable_Item+","}

				//----------------------------Lap qua mang myItem de xay dung Structure--Moi~ Item se co' ki hieu :  @i/ , moi~ Parent Extend for replace se co dang :  #ID/
				this.Body = '#'+this.Root_Char+'/'; var This_Parent=','+this.Root_Char+','; Next_Parent=','; var This_Level = 0; var A=myItem; var j=0;
				while (j<A.length){		var Next_Generation_Exist = false		//---Neu' ton` tai the he ke tiep , neu ko thi` break;
					for (var i=0;i<A.length;i++){
						if (This_Parent.indexOf(','+A[i][1]+',')>-1){	j+=1; Next_Generation_Exist = true;
							this.Body = this.Body.replace( '#'+A[i][1]+'/' , '@'+i+'/ #'+A[i][0]+'/ #'+A[i][1]+'/' )
							Next_Parent+=A[i][0]+','; A[i].push(This_Level);

							//-----Selected Item
							if (Clean(A[i][0])==Clean(this.Data)){var selected=' selected '}else{var selected=''}

							if (this.Sep_Arr[This_Level]==null){this.Sep_Arr[This_Level]='&nbsp;&nbsp;&nbsp;'+this.Sep_Arr[This_Level-1]}			//---Neu' Sep_Arr ko du den' level hien tai, tu tao them 1 element cho Level hien tai
							A[i].Code = '\t\t\t<option value="'+Convert(A[i][0])+'" '+selected+' >'+this.Sep_Arr[This_Level]+Convert(A[i][2])+'</option>\n'	}

							if (This_Level==0){A[i].Code = '\t\t\t <option value=""></option> <optgroup label="' + this.Sep_Arr[This_Level]+Convert(A[i][2]) + '">' }			//Chen` Blank Option vao` dau` Option cap' 0
							//if (This_Level==1){A[i].Code = '\t\t\t <option value="" style="height:3"></option>' + A[i].Code }			//Chen` Blank Option vao` dau` Option cap' 1

					};	if (!Next_Generation_Exist){break;};
					This_Parent=Next_Parent; Next_Parent=','; This_Level+=1;	}

				this.Body = this.Body.replace( /#\w+?\//gi , '' )
				this.Body = this.Body.replace( /@(\w+?)\//gi , '"+A\[$1\].Code+"' )
				this.Body = eval('"'+this.Body+'"') + '\n<option value=""></option>\n'
			}

			//----1 so thuoc tinh dinh dang
			if (this.Style===undefined){	this.Style = ' style="width:'+this.Width+'px;font:12/16px Verdana;border:1px solid #336699;" ' }
			if (this.Intro_Text!=null){this.Body='<option value="">'+Convert(this.Intro_Text)+'</option>\n'+this.Body}
			return '<select name="'+this.Name+'" ID="'+this.ID+'" '+this.Style+' '+this.Inside_Tag+' >\n'+this.Body+'</select>\n'
		}	}





	//-----------------------------CONTROL MULTI SELECTBOX ________________________________________________________________
	//_____________________________________________________________________________________
	%><!--#include file="Control_Multi_Selectbox.asp"--><%


	//-----------------------------CONTROL CALENDAR ________________________________________________________________
	//_____________________________________________________________________________________
	%><!--#include file="Control_Calendar.asp"--><%


	//-----------------------------CONTROL MULTI X SELECTBOX ________________________________________________________________
	//_____________________________________________________________________________________
	%><!--#include file="Control_Multi_XSelectbox.asp"--><%



	//-----------------------------CALENDAR CONTROL ________________________________________________________________
	//_____________________________________________________________________________________
	%><!--#include file="Control_Calendar.asp"--><%



	//-----------------------------MATRIX CONTROL ________________________________________________________________
	//_____________________________________________________________________________________
	%><!--#include file="Control_Matrix.asp"--><%



	//-----------------------------EDITOR CONTROL ________________________________________________________________
	//_____________________________________________________________________________________
	%><!--#include file="Control_Editor.asp"--><%



	//-----------------------------FILEBOX CONTROL ________________________________________________________________
	//_____________________________________________________________________________________
	%><!--#include file="Control_FileBox.asp"--><%



	//-----------------------------NIMAGE CONTROL ________________________________________________________________
	//_____________________________________________________________________________________
	%><!--#include file="Control_NImage.asp"--><%


	//-----------------------------PCOLOR CONTROL ________________________________________________________________
	//_____________________________________________________________________________________
	%><!--#include file="Control_PColor.asp"--><%


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// CONTROL COLLECTION Object

	//----Control Collection se chi dun`g de insert & Update , ko dun`g delete. No' se co' 1 Hidden field, chua' 1 ma  so' nam trong Session.
	//Moi~ khi thao tac du lieu, no se Request &  kiem tra trung` khop thi` moi thuc thi lenh (insert hoac update). Hidden field nay` se thay the cho "isPostBack".

	function Control_Collection (Mode, Control_Arr){
		this.Name = 'Product'; this.Mode=Clean(Mode)
		this.Control_Arr = Control_Arr || new Array;  this.Width = 600;

		//---Specify the global error format for whole project
		this.Global_Err_Format = '<b><font color=#990000>xxx</font></b>'

		this.Err_Format = '<b><font color=#990000>xxx</font></b>'
		this.Add = function(Ctl){ this.Control_Arr.push(Ctl) }

		//---Cac thong bao' mac dinh
		this.insert_done = 'Inserted successfully!';	this.insert_failed = 'Unable to insert data. Error occured.'
		this.update_done = 'Updated successfully!';	this.update_failed = 'Unable to update. Error occured'
		this.task_done = 'Task is done successfully!'; this.task_failed = 'Task failed. Error occured' 

		//---Tao ra isPostBack Security Code bang` ham` S_Code :  1 cai' gan' vao` Session(), 1 cai' gan' vao` Input Hidden isPostBack
		if (Request.Form(this.Name+'_isPostBack')==Session(this.Name+'_form_isPostBack')){this.isPostBack=true}else{this.isPostBack=false}
		this.isPostBack_Code = S_Code();  Session(this.Name+'_form_isPostBack') = this.isPostBack_Code;

		//---Luu lai trang luc moi mo de khi cancel thi` redirect tro lai
		var Refer = VBRefer();
		if (Refer){
			if (Refer.indexOf((new thisPage_URL).Page) > -1){	this.Refer_Page = VBSession(this.Name + '_Refer_Page') || 'index.asp'
			}else{	Session(this.Name + '_Refer_Page') = this.Refer_Page = Refer	}
		}else{	this.Refer_Page = 'index.asp'	}

		//----Doi tuong de truy xuat cac Control theo ten
		this.Control_Index = new Object

		//------Status message cho Form
		this.status = VBSession(this.Name+'_Status_Msg')||''; Session(this.Name+'_Status_Msg') = '';

		//------Attach JS function vao` su kien form onsubmit bang` cac hthem vao` ham` Big_Check_Form()
		this.Addition_JS = {Before:new Array , After:new Array};		//Before : them truoc' khi kiem tra -- After: them ngay sau khi kiem tra & truoc lenh "return this.Valid"
		this.Attach_JS = function(JS_Code , pos){ this.Addition_JS[pos?'After':'Before'].push(JS_Code) }

		//____________________________________________________________________________________________________________________________________
		//-------Thuc thi 1 so' tac vu truoc khi tao Output hoac Lam` viec voi DB :   Bom du lieu cho Data (tuy` Mode, tu` DB hoac Request)
		//--------Kiem tra du lieu hop le, tao. ra cac Err_Msg cho cac Control co du lieu ko hop le.
		this.Run = function(){  this.Valid = true;	var K = this.Control_Arr;

			//-----Tao ra 1 doan Code chua cac JavaScript function de check form & cac thu tuc khac===
			this.JS_Code = Control_JS_Code(this.Name,this.Control_Arr, (this.Global_Err_Format || this.Err_Format) , this.Addition_JS )

			//-----Tao ra form code
			this.Form_Code = '<form method="post" action="'+(this.Action||(new thisPage_URL).URL)+'" onsubmit="return '+this.Name+'_Big_Check_Form();">'+
							 '\n<input type="hidden" name="'+this.Name+'_isPostBack" value="'+this.isPostBack_Code+'">\n'

			//---Neu la` Update & ko phai isPostBack, tao 1 DB.
			if (!this.isPostBack && this.Mode=='update'){
				if (!this.Conn){this.Conn = Conn_Obj()}
				this.DB = DB_to_Arr(this.SQL,this.Conn)
				if (!this.DB){Response.Redirect( this.Ref_Page||'index.asp' )}
			}

			for (var i=0;i<K.length;i++){	var C = K[i];	this.Control_Index[C.Name] = C;

				//-----Thay doi Data_Field neu' thiet lap cho Language 1 gia tri
				if (this.Lang && this.Lang_Field){
					this.Lang_Field = ','+Clean(this.Lang_Field.replace(/\s/g , ''))+','
					if (this.Lang_Field.indexOf(','+K[i].Data_Field+',')>-1 ){
								K[i].Data_Field = this.Lang+'_'+K[i].Data_Field	}	}

				Session(C.Name+'_Err_Msg') = ''			//-----Xoa het cac thong bao loi~

				//-----Kiem tra isPostBack de bom & kiem tra du lieu
				if (!this.isPostBack){
					if (this.Mode=='update'){ C.Data = this.DB.RS(C.Data_Field) }
					if (this.Mode=='insert'){ if (!C.Data){C.Data=new String('') } }
				}else{
					//------Neu' dung la isPostback : kiem tra du lieu & thuc thi ham`
					C.Data = XRequest(C.Name);

					//-----Neu Control co ham` tu xu ly du~ lieu, thuc thi ham nay` & gan gia tri cua ham` cho Data cua Control
					if (C.Data_Func){ C.Data = C.Data_Func( C.Data ); }

					for (var j=0;j<C.Condition_Arr.length;j++){ var Func_Arr = C.Condition_Arr[j];
						if (Func_Arr){
							if(Func_Arr[0](C.Data)===false){  this.Valid = false;
								if (!C.Condition_Arr['All']){ Session(C.Name+'_Err_Msg')+='\n'+Func_Arr[2]; }
								else{ Session(C.Name+'_Err_Msg') = C.Condition_Arr['All'];}
							}else{
								//---Neu' Kiem tra du lieu chuan, thi` convert cac' Data kieu Int & Float sang dang tuong ung
								if (C.Data_Type == 'integer'){	C.Data = parseInt(C.Data) }
								if (C.Data_Type == 'float'){	C.Data = parseFloat(C.Data) }
							}
						}
					}
				}
				//-----Neu' co' width chung, gan' cho tat cac cac Control
				if (this.Width){ C.Width = C.XWidth || this.Width}
			}

			//-----Gan' Status Message cho Form thong qua session
			if (this.isPostBack){  Session(this.Name+'_Status_Msg') =	this.status = this.Valid?
										eval('this.'+this.Mode+'_done'):eval('this.'+this.Mode+'_failed')	}

			//-----Thuc thi cac ham`Insert/Update vao` CSDL neu' la` isPostBack===
			if (this.isPostBack && this.Valid){
				if (this.Mode=='insert'){
					DB_Insert(this.SQL , this.Control_Arr, this.Conn)
					//---execute a function if insert/update/task was done
					if (this.Insert_Success_Func){ this.Insert_Success_Func(this.Control_Arr) }
				}
				if (this.Mode=='update'){ DB_Update(this.SQL ,'', this.Control_Arr , this.Conn) }
				if (this.Mode=='task'){ this.Task_Func(this.Control_Arr) }

				Response.Redirect((new thisPage_URL).URL)
			}
		}




		//_____________________________________________________________________________________________________________________
		//--Ham` xuat ra output & err_span cua Control dua vao` ten Control
		this.Control = function(Name){	return this.Control_Index[Name.toLowerCase()].Output();	}
		this.Err_Span = function(Name){	Name=Name.toLowerCase();
				if (this.Control_Index[Name]){
				if (Session(Name+"_Err_Msg")){	var Alert_Content = (this.Global_Err_Format || this.Err_Format).replace('xxx' , Session(Name+"_Err_Msg")); }
				else	{	var Alert_Content=''; }
				return '<span id="'+Name+'_Err_Span">'+Alert_Content+'</span>'		} }


		//----------------------------Ham` xuat ra cac Control & Err_Span theo dung thu tu. Tham so' la` 1 Array chua; cac Intro text
		this.Output = function(Intro_Arr){
			var Code = '<'+'!--------------------'+this.Name+' Form Code--------------------------------------'+'>\n'+
						this.JS_Code+'\n'+ this.Form_Code +'\n';
			for (var i=0;i<this.Control_Arr.length;i++){
				if (Intro_Arr){	Code+= Intro_Arr[i] + '\n'	}
				Code += this.Err_Span(this.Control_Arr[i].Name) +'<br>\n'
				Code += this.Control_Arr[i].Output()+'\n';
			}

			Code +='\n<br><br><input type="submit" value="OK" class="Form_Button" style="width:100;height:24;"> &nbsp; '
//			Code +='\n<input type="button" value="Cancel" class="Form_Button" style="width:100;height:24;" onclick="window.location=\''+this.Refer_Page+'\'">'
			Code +='\n<input type="button" value="Cancel" class="Form_Button" style="width:100;height:24;" onclick="history.back(-1)">'
			Code +='\n</form>\n'
			Code +='<'+'!-------------------------//form code------------------------------------------------'+'>\n'
			return Code;	}
	}

%>



