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


	function Control_Multi_XSelectbox(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		//--Ham` lay' value cua Control (De check = JS tai browser)
		this.Get_Func = 'function(){ \n'+
						'	var Q = Get_SelectBox("'+Name.toLowerCase()+'_child_ID"); \n'+
						'	if (Q.value){ return Q.value	\n'+
						'	}else{ \n '+
						'		var P = Get_SelectBox("'+Name.toLowerCase()+'_sub_ID"); \n'+
						'		if (P.value){ return P.value } \n'+
						'		else { return Get_SelectBox("'+Name.toLowerCase()+'_main_ID").value } \n'+
						'	} \n'+
						'}'

		this.Focus_Func =	'function(){	window.location="#'+this.Name+'"	}'


		//-----Intrinsic Data func : Xu ly truong hop khac chi chon main Item am bo quen SubItem
		this.Data_Func = function(x){
			x = parseInt(x)
			if ( isNaN(x) || x <= 0 ){
				x = VBRequest( this.Name + '_sub')
				if ( isNaN(x) || x <= 0 ){
					x = VBRequest( this.Name + '_main')
				}
			}
			return x
		}

		//---Output_function
		this.Output = function(){
					var Sep_Tag = this.Sep_Tag || '\n<br>\n'			///------------------Doan ngan cach giua 2 Select box
					var Name = this.Name.toLowerCase();
					var Width = this.Width || 600
					var Table_Name = this.Table_Name					///---------------------Ten table trong CSDL


					//--------------Manipulate Data ( get the main data - sub data - child data )
					var Main_Data = Sub_Data = Child_Data = 0					
					if (this.Data){
						var Data = this.Data
						if (!isNaN(Data) && Data > 0 ){
							var Root_1 = DB_to_Val('Select Root_Item from ' +Table_Name+' where ID=' + Data )
							if ( String(Root_1)!='' ){
								if ( Root_1 != 0 ){
									var Root_0 = DB_to_Val('Select Root_Item from ' +Table_Name+' where ID=' + (Root_1||0) )
									if( Root_0 != 0 ){
										Main_Data = Root_0;
										Sub_Data = Root_1
										Child_Data = Data
									}else{
										Main_Data = Root_1;
										Sub_Data = Data;
										Child_Data = 0
									}
								}else{
									Main_Data = Data; Sub_Data = Child_Data = 0
								}
							}else{
								Main_Data = Sub_Data = Child_Data = 0
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
									'			S.name = "'+ Name +'_sub";  //S.id = "'+ Name +'_sub_ID";  \n'+
									'		}\n'+
									'		'+Name+'_Multi_Select_Sub_Change( GetTag( Get("'+Name+'_Multi_Selectbox_Container" ) , \'select\' )[0] ) \n'+
									'	}\n'+
									'	function '+Name+'_Multi_Select_Sub_Change(obj){\n'+
									'		var P = Get_SelectBox(obj)\n'+
									'		if (P){\n'+
									'			var K = Get(\''+Name+'_Multi_Selectbox_Child_Container\'); \n'+
									'			K.innerHTML = Get(\''+Name+'_Child_\'+ (P.value||\'\') ).innerHTML; \n'+
									'			var S = GetTag( K , "select" )[0]; \n'+
									'			S.name = "'+ Name +'";  //S.id = "'+ Name +'_child_ID";  \n'+
									'		}\n'+
									'	}\n'+
									'</'+'script>\n'

					var S2 = new Control_Selectbox(Name+'_main'); S2.Width=Width;  S2. Data = Main_Data || 0
					var DB = DB_to_Arr(' Select ID, Menu_Txt from ' + Table_Name + ' where Root_Item=0 Order By Menu_Order' )
					S2.DB = DB; S2.Intro_Text = this.Intro_Text
					S2.Inside_Tag = ' onchange= "'+ Name +'_Multi_Select_Change(this)" ' + (this.Inside_Tag || '')

					Code+= S2.Output() + Sep_Tag
					S2=null

					Code += '<div id="'+Name+'_Multi_Selectbox_Container" style="display:inline">\n'+
							'	<span id="'+Name+'_Multi_Selectbox_Container">\n'+
							'		<select style="width:'+Width+'" name="'+Name+'" id="'+Name+'_sub_ID"></select>\n'+
							'	</span>\n'+
							'</div>\n'

					Code+= Sep_Tag

					Code += '<div id="'+Name+'_Multi_Selectbox_Child_Container" style="display:inline">\n'+
							'	<span id="'+Name+'_Multi_Selectbox_Child_Container">\n'+
							'		<select style="width:'+Width+'" name="'+Name+'" id="'+Name+'_child_ID"></select>\n'+
							'	</span>\n'+
							'</div>\n'


					Code += '<span style="display:none">\n'+
							'		<span id="'+ Name +'_">\n'+
							'			<select style="width:'+Width+'" ><option value=""></option></select>\n'+
							'		</span>\n'+
							'		<span id="'+ Name +'_Child_">\n'+
							'			<select style="width:'+Width+'" ><option value=""></option></select>\n'+
							'		</span>\n'

					for (DB.i=0; DB.i<=DB.ubound(2); DB.i++){
							var S3 = new Control_Selectbox(Name+'_sub'); S3.Width = Width; S3.Data = Sub_Data || 0
							var DBX = DB_to_Arr('Select ID,Menu_Txt from '+Table_Name+' where Root_Item=' +DB.RS('ID')+ ' Order By MENU_Order' )
							S3.DB = DBX
							S3.Intro_Text = this.Sub_Intro_Text
							S3.Inside_Tag = ' onchange= "'+ Name +'_Multi_Select_Sub_Change(this)" ' + ( this.Sub_Inside_Tag || '' )

							Code += '<span style="display:none" id="'+Name+'_'+DB.RS('ID')+'">\n'
							Code += S3.Output();
							Code += '\n</span>\n'

							if (DBX){
								for (DBX.i=0; DBX.i<=DBX.ubound(2); DBX.i++){
									var S4 = new Control_Selectbox(Name+'_child'); S4.Width = Width; S4.Data = Child_Data || 0
									S4.DB = DB_to_Arr('Select ID,Menu_Txt from '+Table_Name+' where Root_Item=' +DBX.RS('ID')+ ' Order By MENU_Order' )
									S4.Intro_Text = this.Child_Intro_Text
									S4.Inside_Tag = this.Child_Inside_Tag || ''

									Code += '<span style="display:none" id="'+Name+'_Child_'+DBX.RS('ID')+'">\n'
									Code += S4.Output();
									Code += '\n</span>\n'
								}
							}
					}

					Code += '</span>\n'
					Code += '<'+'script>  '+Name+'_Multi_Select_Change("'+Name+'_main_ID")  \n'
					Code +=  Name+'_Multi_Select_Sub_Change( GetTag( Get("'+Name+'_Multi_Selectbox_Container" ) , \'select\' )[0] )  </'+'script>'

				return Code
		}
	}
%>




<%
//-----------------------Example Code

/*------------------
	var P = new Control_Multi_XSelectbox('kaka','integer','',1)
	P.Data = Request('kaka')
	P.Width = 220
	P.Table_Name = 'CAR'
	P.Name = 'kaka'
	P.Intro_Text = "------Chọn danh mục------"
	P.Sub_Intro_Text = "-----Chọn hãng xe-------"
	P.Child_Intro_Text = "-----Chọn tên xe-------"
	P.Inside_Tag = ' '
	P.Sub_Inside_Tag = ' '
	P.Sep_Tag = '<br><br>'
------------------*/


%>





