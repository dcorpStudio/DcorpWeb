
<%if (!No_JS_File_In_Control){%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<!--#Include file="PColor/PColor_JS.asp"-->
<%}%>

<%
	//-----Control_PColor : Object de chon nhieu` mau` cho cung` Product. Moi~ mau` co' 1 anh dai dien
	//---Data se co' dang : 
	/*		#336699*HOME/Uplaod/Image/aaaaaa.jpg
			#33cc33*Home/Upload/Image/bbbbbb.jpg
			........
	*/
	function Control_PColor(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		//----Lay' du lieu
		this.Get_Func = 'function(){ var Q=Get("'+this.Name+'_PColor_Div"); var P = GetTag(Q,"div"); var Code=""; \n'+
						'\t\t if (P){for (var i=0;i<P.length;i++){\n'+
						'\t\t\tvar PColor_Bg = P[i].style.backgroundColor; if (!IE){PColor_Bg = FFColor(PColor_Bg)}; \n'+
						'\t\t\t Code += PColor_Bg + "*" + GetTag(P[i],"input")[0].value + "\\'+'n" '+
						'\n\t\t\t} \n\t\t}\n\t\treturn Code.substring(0,Code.length); \n\t} '

		//---Ham` focus rieng
		this.Focus_Func = 'function(){ window.location="#'+this.Name+'_PColor" }'

		//--Attach function
		this.Attach_Func = 'function(){ var A = '+this.Get_Func+' \n Get("'+this.ID+'").value=A();}'

		this.Output = function(){
			var Name = this.Name;
			if (this.Data && this.Data !=''){
				this.Data = this.Data.replace( /^\s+(.*?)\s+$/g , '$1' )
				var Color_Arr = this.Data.split('\n'); var Data_Code ='';

				for (var i=0;i<Color_Arr.length;i++){
					if (Color_Arr[i].length>6){
						var PColor = Color_Arr[i].substring(0,7);  var PImage = Color_Arr[i].substring(8,Color_Arr[i].length-1)
						//-----Calculate : 5 color per row
						switch (i%5){
							case 0:f='<tr>';l='';break;
							case 4:f='';l='</tr>';break;
							default:f='';l='';break
						}
						if (i==(Color_Arr.length-2)){l='</tr>'}


						//-----If Multi-Color or NAtural_Color then display an Image
						switch (PColor){
							case '#123456' : var Multi_Color = '<img src="' + Global_Var('PColor_Path') +
								'/PColor_Editor/Multi-Color.jpg" style="width:100%;height:100%" title="Nhiều màu sắc">'
								break;
							case '#234567' : var Multi_Color = '<img src="' + Global_Var('PColor_Path') +
								'/PColor_Editor/Natural_Color.jpg" style="width:100%;height:100%" title="Màu tự nhiên" align=center>'
								break;
							default: Multi_Color = '';break;
						}


						Data_Code+=	f+'<td width=0 align=center><div class="Pcolor_X" style="background-color:'+PColor+'" '+
							' onclick="PColor_Edit(this,\''+Name+'\')">'+ Multi_Color +
							'<input type="hidden" value="'+PImage+'"></div></td>\n' + l
					}
				}
			}else{ var Data_Code = '' }

			var Code =	'<a name="#'+Name+'_PColor"></a>\n'+
						'<table style="border:1px solid #336699;" cellpadding=0 cellspacing=0><tr><td id="'+Name+'_Color">\n'+
						'	<table cellpadding=5 cellspacing=0 border=0>\n'+
						'		<tr><td valign=top width=160>\n'+
						'				<'+'!--Color list--'+'>\n'+
						'				<div id="'+Name+'_PColor_Div">\n'+
						'					<table cellpadding=5 cellspacing=5 border=0>\n'+
						'						\n'+ Data_Code +
						'							<'+'!--Waiting--'+'>\n'+
						'						\n'+
						'					</table>\n'+
						'				</div>\n'+
						'				<'+'!--//Color list--'+'>\n'+
						'				<a href="#PColor" class="black_link" onclick="PColor_Add(\''+Name+'\')">\n'+
						'				<img title="th&#234;m m&#224;u" alt="th&#234;m m&#224;u" border="0" src="'+Global_Var('PColor_Path')+'/PColor_Editor/Add.gif"> Th&#234;m m&#224;u</a>\n'+
						'		</td><td valign=top>\n'+
						'				<'+'!--//Image--'+'>\n'+
						'					<table cellpadding=5 cellspacing=5 border=0 width=100% >\n'+
						'						<tr><td valign=top width="100">\n'+
						'								<img id="'+Name+'_PColor_Image" border="1" src="'+Global_Var('PColor_Path')+'/PColor_Editor/noImage.jpg" width="128" height="120">\n'+
						'						</td><td valign=top>\n'+
						'								<input type=button value="Ch&#7885;n &#7843;nh kh&#225;c" class="PColor_Button" onclick="PColor_Change_Image(\''+Name+'\')"><br><br>\n'+
						'								<input type=button value="Ch&#7885;n m&#224;u kh&#225;c" class="PColor_Button" onclick="PColor_Change_Color(\''+Name+'\',this)"><br><br>\n'+
						'								<input type=button value="Nhiều màu ??" class="PColor_Button" onclick="Multi_Color(\''+Name+'\')" title="Sản phẩm có nhiều màu sắc"><br><br>\n'+
						'								<input type=button value="Màu tự nhiên ??" class="PColor_Button" onclick="Natural_Color(\''+Name+'\')" title="Sản phẩm có nhiều màu sắc"><br><br>\n'+
						'								<input type=button value="X&#243;a m&#224;u" class="PColor_Button" onclick="PColor_Del(\''+Name+'\')"><br>\n'+
						'						</td></tr></table>\n'+
						'				<'+'!--//Image--'+'>\n'+
						'	</td></tr></table>\n'+
						'</td></tr></table>\n'+
						'\n<input name="'+this.Name+'" type=hidden id="'+this.ID+'">\n\n'+
						'<'+'script>\n'+
						'	//---Cai` dat mau` dau` tien\n'+
						'	var P = document.getElementById(\''+Name+'_PColor_Div\').getElementsByTagName(\'div\');\n'+
						'	if (P.length>0){ PColor_Edit(P[0],\''+Name+'\') }\n'+
						'</'+'script>'

			return Code;
		}
	}

%>


