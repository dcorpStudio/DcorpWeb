<%//---Uses for FrontPage Only
if (0){%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<%}%>


<%

//----------------------------Control Multi Selectbox:
//----------Dung` de tao ra 1 Control co 2 Selectbox, tao thanh` 2 tang`.
//----------Su dung de chon nhieu` lop data co dang MENU.
//----------CSDL chuan? phai la` 1 Table co' cau truc :  ID, Root_Item, Menu_Txt, Menu_Order
//----------Du~ lieu dau` vao :  Table_Name, Intro_Text, Sub_Intro_Text, Inside_Tag, Sub_Inside_Tag, Sep_Tag, Data
//----------******Luu y : Truong hop ng` dung` chi chon item o main_selectbox  ma` ko chon o sub_selectbox, 
					//thi` du~ lieu se tu dong dc lay' bang cach Request('Name_main')


	function Control_Multi_Selectbox(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		//--Ham` lay' value cua Control (De check = JS tai browser)
		this.Get_Func = 'function(){var P = Get_SelectBox("'+Name.toLowerCase()+'_sub_ID"); \n'+
						'	if (P.value){ return P.value } \n'+
						'	else { return Get_SelectBox("'+Name.toLowerCase()+'_main_ID").value } \n'+
						'}'

		this.Focus_Func =	'function(){	window.location="#'+this.Name+'"	}'


		//-----Intrinsic Data func : Xu ly truong hop khac chi chon main Item am bo quen SubItem
		this.Data_Func = function(x){
			if (String(x)=='' || String(x)=='undefined'){
				return VBRequest( this.Name + '_main')
			}else{ return x }
		}

		//---Output_function
		this.Output = function(){
					var Sep_Tag = this.Sep_Tag || '\n<br>\n'			///------------------Doan ngan cach giua 2 Select box
					var Name = this.Name.toLowerCase();
					var Width = this.Width || 600
					var Table_Name = this.Table_Name					///---------------------Ten table trong CSDL

					//--------------Manipulate Data
					if (this.Data){
						var Data = parseInt(this.Data);
						if (isNaN(Data)){ Data = Request( Name + '_main') }
						if (!isNaN(Data)){
							var Data_Level = DB_to_Val('Select ID from ' +Table_Name+' where ID=' + Data + ' and Root_Item = 0 ')
							if ( Data_Level != Data ){
								var Sub_Data = Data
								Data = DB_to_Val('Select Root_Item from ' +Table_Name+' where ID=' + Data )
							}
						}
					}

					///-------------------GEN CODE
					var Code = 		'<a name="'+Name+'">\n' +
									'<'+'script>\n'+
									'	function '+Name+'_Multi_Select_Change(obj){\n'+
									'		var P = Get_SelectBox(obj)\n'+
									'		if (P){\n'+
									'			var K = Get(\''+Name+'_Multi_Selectbox_Container\'); \n'+
									'			K.innerHTML = Get(\''+Name+'_\'+ (P.value||\'\') ).innerHTML; \n'+
									'			var S = GetTag( K , "select" )[0]; \n'+
									'			S.name = "'+ Name +'";  //S.id = "'+ Name +'_sub_ID";  \n'+
									'		}\n'+
									'	}\n'+
									'</'+'script>\n'

					var S2 = new Control_Selectbox(Name+'_main'); S2.Width=Width;  S2. Data = Data || 0
					var DB = DB_to_Arr(' Select ID, Menu_Txt from ' +this.Table_Name+ ' where Root_Item=0 Order By Menu_Order' )
					S2.DB = DB; S2.Intro_Text = this.Intro_Text
					S2.Inside_Tag = ' onchange= "'+ Name +'_Multi_Select_Change(this)" ' + (this.Inside_Tag || '')

					Code+= S2.Output() + Sep_Tag
					S2=null

					Code += '<div id="'+Name+'_Multi_Selectbox_Container" style="display:inline">\n'+
							'	<span id="'+Name+'_Multi_Selectbox_Container">\n'+
							'		<select style="width:'+Width+'" name="'+Name+'" id="'+Name+'_sub_ID"></select>\n'+
							'	</span>\n'+
							'</div>\n'

					Code += '<span style="display:none">\n'+
							'		<span id="'+ Name +'_">\n'+
							'			<select style="width:'+Width+'" ><option value=""></option></select>\n'+
							'		</span>\n'

					for (DB.i=0; DB.i<=DB.ubound(2); DB.i++){
							var S3 = new Control_Selectbox(Name+'_sub'); S3.Width = Width; S3.Data = Sub_Data || 0
							S3.DB = DB_to_Arr('Select ID,Menu_Txt from '+Table_Name+' where Root_Item=' +DB.RS('ID')+ ' Order By MENU_Order' )
							S3.Intro_Text = this.Sub_Intro_Text
							S3.Inside_Tag = this.Sub_Inside_Tag || ''

							Code += '<span style="display:none" id="'+Name+'_'+DB.RS('ID')+'">\n'
							Code += S3.Output();
							Code += '\n</span>\n'
					}
					Code += '</span>\n'
					Code += '<'+'script>  '+Name+'_Multi_Select_Change("'+Name+'_main_ID")  </'+'script>'

				return Code
		}
	}
%>




<%
//-----------------------Example Code

/*------------------
	var P = new Control_Multi_Selectbox('kaka','integer','',1)
	P.Data = Request('kaka')
	P.Width = 220
	P.Table_Name = 'CAR'
	P.Name = 'kaka'
	P.Intro_Text = "-----Chọn hãng xe-------"
	P.Sub_Intro_Text = "-----Chọn tên xe-------"
	P.Inside_Tag = ' '
	P.Sub_Inside_Tag = ' '
	P.Sep_Tag = '<br><br>'
------------------*/
%>



