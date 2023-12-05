
<%if (!No_JS_File_In_Control){%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<!--#include file="NImage/NImage_JS.asp"-->
<%}%>

<%
	//-----Upload nhieu hinh` anh dai dien cho cung` 1 SP//-----Du lieu luu vao` trong DB se co dang : 
	//  '123.gif <br> 456.gif <br> 789.gif'  --Tuc la` cac duong dan anh cach nhau dau' xuong dong`

	function Control_NImage(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		//--Ham` lay' value cua Control
		this.Get_Func = 'function(){ var K = Get("'+this.Name+'_NImage_Table"); var Q=GetTag(K,"img"); var Code="";\n'+
						'\t\tif (Q){\n for (var i=0;i<Q.length;i++){\n\t\t\t Code+=Q[i].src+"\\'+'n"; \n} \n}; '+
						' return Code.substring(0,Code.length-1) }'

		//--Ham` focus rieng
		this.Focus_Func = 'function(){ window.location="#'+this.Name+'_NImage" }'

		//--Attach function
		this.Attach_Func = 'function(){ var A = '+this.Get_Func+' \n Get("'+this.ID+'").value=A();}'

		this.Output = function(){
			var Name = this.Name
			if (this.Data && this.Data !=''){
				var Img_Arr = this.Data.split('\n'); var Data_Code =''
				for (var i=0;i<Img_Arr.length;i++){  Data_Code += '\t\t\t<td><img border=1 src="'+Img_Arr[i]+'" height=100></td>\n' }
			}else{ var Data_Code = '' }

			var Code =	'<a  name="#'+this.Name+'_NImage"></a>\n'+
						'<div id="'+Name+'_NImage_Div" style="border:1px solid #336699;width:'+this.Width+'; height:120; overflow-x:auto;">\n'+
						'	<table id="'+Name+'_NImage_Table" height="100%" cellpadding=5 cellspacing=0>\n'+
						'		<tr onmouseover="NImage_Effect(this)">\n'+ Data_Code +
						'			<'+'!--Waiting--'+'>\n'+
						'		</tr>\n'+
						'	</table>\n'+
						'</div>\n'+
						'<div style="border:1px solid #336699;width:'+this.Width+'px; height:20px;background-color:#ffffee;text-align:center;">\n'+
						'	<a href="#ABC" class="black_link" onclick="NImage_Add(\''+Name+'\')">\n'+
						'		<img border="0" src="'+Global_Var('NImage_Path')+'/NImage_Editor/Add.gif">Th&#234;m h&#236;nh &#7843;nh</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n'+
						'	<a href="#ABC" class="black_link" onclick="NImage_Del()">\n'+
						'		<img border="0" src="'+Global_Var('NImage_Path')+'/NImage_Editor/Del.gif">X&#243;a h&#236;nh &#7843;nh</a>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \n'+
						'	<a href="#ABC" class="black_link" onclick="NImage_Left()">\n'+
						'		<img border="0" src="'+Global_Var('NImage_Path')+'/NImage_Editor/Left.gif"></a>&nbsp;&nbsp;&nbsp; \n'+
						'	<a href="#ABC" class="black_link" onclick="NImage_Right()">\n'+
						'		<img border="0" src="'+Global_Var('NImage_Path')+'/NImage_Editor/Right.gif"></a>\n'+
						'</div>\n'+
						'<input type="hidden" name="'+this.Name+'" id="'+this.ID+'">'
			return Code;
		}
	}

%>


