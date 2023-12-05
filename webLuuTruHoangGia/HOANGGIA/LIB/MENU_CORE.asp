<%//---Uses for FrontPage Only
if (0){%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<%}%>

<%

	//================================================================================================
	//-----MENU_EDITOR : Dua tren cau truc MENU_CORE de xay dung 1 Editor chuan cho Menu N tang` & Menu 1 tang`
	function Menu_Editor(){
		this.Field_Name = 'ID,root_Item,Menu_txt,Link,Menu_Order'
		this.Type = 'multi'
		this.Limit=0

		//-----------------------Xu ly cac thao tac voi' CSDL_______
		//___________________________________________________________
		this.Run = function(){
			if (!this.Conn){ this.Conn = Conn_Obj() }
			var Field_Arr = this.Field_Name.replace(/\s+/g , '').split(',');

			var Mode = VBRequest('menu_command');
			var ID_List = VBRequest('ID_List')
			var Menu_Txt = VBRequest('Menu_txt'); Menu_Txt = Menu_Txt?Menu_Txt.replace( /^\s+(.*?)\s$/g , '$1'):''
			var ID = VBRequest('menu_parent')

			if (Mode && !isNaN(ID)){   Mode = Mode.toLowerCase();
				//------------Xu ly them / sua / xoa item
				var SQL = 'Select * from '+this.Table_Name+' where ID='+ID
				var RS = new ActiveXObject('ADODB.RecordSet');

				switch (Mode){
					case 'delete': var Need_Order = false;
							//-----Delete the item itself
							DB_Delete(this.Table_Name , ID, this.Conn);

							//-----Delete its children Item
							var C_Item = DB_to_Arr1("Select ID from "+this.Table_Name+" where Root_Item = " + ID)
							if (C_Item){

									DB_Delete(this.Table_Name , C_Item.join(",") , this.Conn)

									//-----Delete its Grand Children Item
									var G_Item = DB_to_Arr1("Select ID from "+this.Table_Name+" where Root_Item in (" + C_Item.join(',') + ")" )
									if (G_Item){
										DB_Delete(this.Table_Name , G_Item.join(",") , this.Conn)
									}
							}
							break;
					case 'update': if (Menu_Txt!=''){  RS.Open(SQL,this.Conn,3,3);
										if (!RS.EOF){ RS.Fields(Field_Arr[2]) = Menu_Txt;
												RS.Update(); var Need_Order = true; }  };
									break;

					case 'insert':  if (Menu_Txt!=''){
//Count the time Add New was Execute. TO be sure the command won't be duplicated
var X = parseInt(Session('Item_Add_Count'));
if (isNaN(X)){
										RS.Open(SQL,this.Conn,3,3);
										RS.AddNew();
										RS.Fields(Field_Arr[2]) = Menu_Txt; RS.Fields(Field_Arr[1]) = ID;
										RS.Update(); var Need_Order = true;
										RS.Close(); RS=null;


								//------Phai close Connection de co the lay duoc ID cua Item moi them vao.
								var Conn_Str = this.Conn.ConnectionString;
								this.Conn.Close();
								this.Conn = Conn_Obj(Conn_Str);

								//---Lay ID do' & replace vao` chu~ A trong ID_List
								var New_ID = DB_to_Val('Select top 1 ID from '+this.Table_Name+' Order by ID Desc ')
								ID_List = ID_List.replace('A' , New_ID);
Session('Item_Add_Count')=1
}else{
	//-------------This is Code if the page was load twice & add 2 coincide items instead of 1 !
}
							 }
						break;
				}

				//------------Xu ly thu tu cac Item
				if (Need_Order){
					var ID_Arr = ID_List.split(',');
					if (ID_Arr.length>1){
						for (i=0;i<ID_Arr.length;i++){
							this.Conn.Execute('Update '+this.Table_Name+' set Menu_Order =' + i +' where ID=' + ID_Arr[i])
						}
					}
				}

				Response.Redirect( (new thisPage_URL).Page  )
			}
		}


		//_______________________________________________________________
		//___________________________________________________Tao ra Output
		this.Output = function(){
//R('///////'+Session('Item_Add_Count')); F();
			Session('Item_Add_Count') = 'x'			//----Release Session
			Session('Menu_Editor_Type') = this.Type.toLowerCase()			//---Dung` de truyen Type cua Editor sang cho MENU_JS.asp
			Session('Menu_Editor_Limit') = this.Limit						//---Dung` de truyen Limit level cua Editor sang cho MENU_JS.asp
			Server.Execute(Global_Var('MENU_Editor_Path')+'/NMENU_JS.asp')		//----vi` ko truyen` qua Server.Execute duoc.

			var P= new Menu_Core()
			P.DB = this.DB; P.Field_Name = this.Field_Name;

			P.Tem = '<a class="Menu_Link" onclick="menu_ready_edit(this)" href="#M_@id/" ID="@id/">@Menu_txt/</a>'
			P.Sep_Arr = Array( '<ul class="Menu_UL">\n' , '<li class="Menu_LI"><a href="#MenuABC" onclick="menu_switch_list(this)" class="Menu_link">•></a>\n' , '</li>\n' , '</ul>\n' )
			if (this.Type.toLowerCase() == 'multi'){
				P.Add_Condition('if (This_Level==0){@menu_txt/="<u><b>"+@menu_txt/+"</b></u>"}')   }

			return '<div id="Edit_Menu_Div">\n<li class="Menu_li">•> <a href="#M_0" class="Menu_All" ID="0">\All</a> \
				<a href="#M_0" onclick="Menu_Add(0)"><img title="Thêm" Alt="Thêm" src="'+Global_Var('Menu_Editor_Path')+'/Menu_Editor/Add.gif" border=0></a>'+
				P.Output()+ '\n</li></div>\n'
		}

	}






	//================================================================================================
	//-----MENU_CORE : Lop' doi tuong lam` loi~ cua NMENU. Su dung cong nghe Template Eval de Generate Code.
	//-----Du lieu dau` vao` chuan se la` 1 VBArray co cau truc theo thu tu : ID / root_item / Menu_txt / Link / Order
	//=====Cac tham so' : Sep_Arr (Separators) //  Template // DB //.....

	function Menu_Core(Name){
		this.Field_Name = 'ID,root_Item, Menu_txt,Link,Menu_Order';
		this.Name = Clean(Name)||'Menu';  this.S_Char = '@';
		this.Sep_Arr = Array('<ul>','<li>\n','</li>\n' , '</ul>\n');
		this.Tem = '\\\t<a href="@Link/" ID="@ID/">@Menu_Txt/</a>\\'+'n';
		this.Condition_Arr = new Array;  this.P = new Object	//--1 Object de luu cac bien ngoai lai
		this.Page = (new thisPage_URL).Page;  this.Param_Name = 'cat'

		this.Add_Condition = function(My_Func){this.Condition_Arr.push(My_Func)}

		this.Output = function(){ var DB=this.DB; var P=this.P; var Sep = this.Sep_Arr;
			var G = function(i,j){return DB.getItem(i,j)}	//---Ham` lay du lieu ngan gon tu` DB
			var Field_Arr = this.Field_Name.toLowerCase().replace(/\s+/g , '').split(',')

			//----Loc Sep_Arr de replace n~ doan co' dang :    #123/
			for (var i=0;i<this.Sep_Arr.length;i++){ this.Sep_Arr[i] = this.Sep_Arr[i].replace( /#\d+(\/)/g , '' ) }

			var re = eval( '/'+this.S_Char+'(\\w+?)\\\//g' )
			this.Tem = this.Tem.replace(re, function($1){return $1.toLowerCase()})		//Chuyen cac ten bien trong Tem thanh LowerCase


			var Line_Arr=new Array();		//-----Array chua' cac Item Eval de phong` truong hop trong Data co' S_Char
			var Code ='#0/'; var Counted_Item = 0;
			var This_Parent=',0,'; var Next_Parent = ','; var This_Level=0;
			//------Big Loop
			while (DB && Counted_Item <= DB.ubound(2)){	var Next_Level_Exist = false; var Counted_Parent = ','
				for (var i=0;i<=DB.ubound(2);i++){
					if ( This_Parent.indexOf(','+G(1,i)+',')>-1 ){		//----Neu' root_item cua item nay` co' trong This_Parent

						for (var j in DB.Field_Obj){ P[j] = DB.RS(j,i) }		//------Gan cac gia tri hien thoi` trong DB vao` P
						if (P['link']==''){ P['link'] = this.Page + '?'+ this.Param_Name+'='+P['id'] }	//-------Lam` link
						P['menu_txt'] = Convert(P[Field_Arr[2]]);
						if (P['menu_txt']==''){ P['menu_txt'] = '________' }

						for (var j=0;j<this.Condition_Arr.length;j++){	//---Chay cac Condition
//R(this.Condition_Arr[j].replace(re , ' this.P["$1"] ').C(2)); F()
							eval( this.Condition_Arr[j].replace(re , ' this.P["$1"] ') )		}

						var k =Line_Arr.push( eval( "'" +this.Tem.replace( re , "'+this.P['$1']+'" ) + "'" ) )

						if (Counted_Parent.indexOf(','+G(1,i)+',') < 0){
							var Line = Sep[0] + Sep[1] + "'+Line_Arr["+(k-1)+"]+'" +'#' +G(0,i)+ '/' + Sep[2] + '\n#'+G(1,i)+'/' + Sep[3]
							Counted_Parent += G(1,i) + ','}
						else{ var Line = Sep[1] +  "'+Line_Arr["+(k-1)+"]+'" + '#' +G(0,i)+ '/' + Sep[2] + '\n#'+G(1,i)+'/' }

						Code = Code.replace( '#'+G(1,i)+'/' , Line )
						Next_Parent+= G(0,i) +','
						Counted_Item += 1;
						Next_Level_Exist = true;
					}
				}
				This_Parent = Next_Parent; Next_Parent = ','; This_Level+=1;
				if (!Next_Level_Exist){break;}
			}
			Code = Code.replace( /\n/g , '\\'+'n' )		//-----Loai bo cac dau xuong dong`
			return eval("'"+Code.replace( /#\d+(\/)/g , '')+"'");
		}


		//---Tao 1 Menu_String neu co focus_Item
		this.Menu_String = function(ID , myLink , Link_Class , Sep ){
			var Link = myLink || this.Page;
			Link_Class = Link_Class || ''; Sep = Sep||'/'
			var DB=this.DB; var Code = '';
			var G=function(i,j){return DB.getItem(i,j)};
			var URL = new thisPage_URL( '' , Link )

			while (ID > 0){
				for (var i=0;i<=DB.ubound(2);i++){
					if (G(0,i)==ID){
						Code = '<a href="'+( G(3,i) || URL.Param(this.Param_Name+'='+ID) ) + '" class="'+Link_Class+'">'+G(2,i)+'</a> '+Sep+' \n' + Code
						ID=G(1,i);
					}
				}
			}
			return Code
		}

	}


%>


