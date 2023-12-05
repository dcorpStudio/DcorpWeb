<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<Style>
	.Prod_Name {color:#333; font-weight:bold; font-size:11px;}
	.Prod_Name b {display:block; padding:0px 10px 0px 10px;}
	.Prod_Name:hover {color:#990000}
</Style>


<%
var Code =	'			@tr/ <td align=center style="padding:10px 0px 10px 0px;" width=31% valign=top>\n'+
			'				<input type=button value="Sửa" onclick="update_prod(@ID/)">\n'+
			'				<input type=button value="Xóa" onclick="del_prod(@ID/)">\n'+
			'				<a ID="@ID/" class="Prod_Name" href="@image/" rel="shadowbox[gallery]">\n'+
			'					<img src="@Image/" height="130" width="150"><br>'+
			'					<b>@Title/</b>\n'+
			'				</a>\n'+
			'			</td> @tr_close/'

var Condition = '@Cols/=3;'

Condition+=	'@Image_1st/ = Single_Image(@Image/ , "../Home_Files/NoImage.jpg");'+
			'@Image_2nd/ = Single_Image(@Image/ , "" , 1) || @Image_1st/ || "Home_Files/NoImage.jpg";'+
			'if (@i/%@Cols/==0){@tr/ = "<tr>"}else{@tr/=""};'+
			'if (!@VIP/){ @VIP_border/ = "0" }else{ @VIP_border/ = \'1 style="border:3px solid #ffcc00"\' } ;'


var T = new Control_Tem( Code , "@" , '' , Condition)
T.Set_P('P_Field' , 'VIP' , 'VIP' , 1)
T.Set_P('P_Field' , 'Image' , 'Image' , 1)
%>


