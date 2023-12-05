<meta http-equiv="Content-Type" content="text/html; charset=utf-8">



<%
var Code =	'			<tr><td style="padding-left:10; padding-bottom:10;" valign=top width=105 >\n'+
			'					<a ID="@ID/" href="product_detail.asp?ID=@ID/"  Xonmouseover="Prd_on(this)" Xonmouseout="Prd_out(this)" class="Prod_Name">\n'+
			'						<img src="@Image/" width="90" border=0 @Vip_Border/ ><br>\n'+
			'					</a>\n'+
			'				</td><td valign=top width=150 style="padding-right:10">\n'+
			'					<a ID="@ID/" href="product_detail.asp?ID=@ID/"  Xonmouseover="Prd_on(this)" Xonmouseout="Prd_out(this)" class="Prod_Name"> \n'+
			'					@XName/\n'+
			'					</a><br> \n'+
			'					<span style="font-size:11px"> @XIntro/ </span> \n'+
			'				</td><td valign="top" align=center width=100> <b> @Pr_Txt/ </b> <br> @XStatus/ </td> \n'+
			'				<td valign="top"> @F_Year/ </td> \n'+
			'				<td valign="top" width=110 align=right style="padding-right:10"> <b style="color:#ffcc00"> @XPrice/ </b> </td> \n'+
			'			</tr>\n'+
			'			<tr><td style="background:url(Home_Files/Bottom_sep.jpg) repeat-x; font-size:5; height:10" colspan=10> &nbsp; </td></tr> '


Condition =	'@image/= Single_Image( @Image/ , "Home_Files/NoImage.jpg") ;'+
			'@XStatus/=(@Status/==1)?"Xe mới":"Xe cũ";'+
			'@Xprice/=Format_Price(@price/);'+
			'@XIntro/ = MEM_Text(@Detail/,80);'+
			'@Price/ = Convert(@Price/);'+
			'@XName/ = @XName/.toUpperCase();'+
			'@Vip_Border/ = @Vip/?" style=\'border:2px solid #ffcc00\' ":""; '


var T = new Control_Tem( Code , "@" , '' , Condition)
T.Set_P('P_Field' , 'Price' , 'Price' , 1)
T.Set_P('P_Val' , 'XIntro' , '' , 1)
T.Set_P('P_Field' , 'Status' , 'Status' , 1)
T.Set_P('P_Field' , 'Detail' , 'Detail' , 1)
T.Set_P('P_Field' , 'Vip' , 'Vip' , 1)
%>


