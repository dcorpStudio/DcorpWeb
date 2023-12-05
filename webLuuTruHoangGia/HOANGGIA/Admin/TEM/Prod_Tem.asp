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
			'				<a ID="@ID/" href="product_detail.asp?ID=@ID/&Cat=@Cat_ID/"  onmouseover="Prd_on(this)" onmouseout="Prd_out(this)"  class="Prod_Name">\n'+
			'					<img src="@Image_1st/" width="150" height="160" style="margin-bottom:6; border:1px solid #888888"><br>\n'+
			'					<b>@Name/</b>\n'+
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


