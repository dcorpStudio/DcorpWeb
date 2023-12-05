<!--#include file="header.asp"-->
<!--#include file="Lib/JavaScript.asp"-->



<%
//--------------------------Ham` Generate Mail Body & Send
function Request_Prod(Control_Arr){
	var C = Control_Arr;

	var BODY =	'<p><b>Kh&#225;ch h&#224;ng li&#234;n h&#7879; t&#7915; website </b> '+
				'('  +VBNow()+  ')<br>\n <br>\n &nbsp;</p>'

	BODY += Contact_BODY( Control_Arr , Array(
			'T&#234;n kh&#225;ch h&#224;ng' , '&#272;&#7883;a ch&#7881;', '&#272;i&#7879;n tho&#7841;i', 'Email'
			, 'L&#7901;i nh&#7855;n') )

	BODY += '<hr> L&#432;u &#253; : Email n&#224;y &#273;&#432;&#7907;c g&#7917;i t&#7921; '+
			' &#273;&#7897;ng t&#7915; website, vui l&#242;ng kh&#244;ng reply.<br><br><br>'

	Send_Mail('' , '' , '' , 'Khach hang lien he tu webite' , BODY)

//	hr();R('/////' + BODY + '////'); F(); AAAAAAAAAA

}



///===============Generate Control 
var A1 = new Control_Textbox('Name','','',255,2)
A1.Set_Err(2,'Bạn chưa điền tên <br>')
A1.Set_Err(1,'Tên không được vượt quá 255 kí tự<br>')

var A2 = new Control_Textarea('Address')
A2.Height = 60

var A3 = new Control_Textbox('Phone')
var A4 = new Control_Textbox('Email')

var A5 = new Control_Textarea('Comment','','',5000,5)
A5.Set_Err(2,'Bạn chưa ghi lời nhắn<br>')
A5.Set_Err(1,'lời nhắn không được vượt quá 5000 kí tự<br>')

var T = new Control_Collection('task' , Array( A1,A2,A3,A4,A5 ) )
T.Task_Func = Request_Prod
T.task_done = '__________________________________________________________<br><br>'+
				'L&#7901;i nh&#7855;n c&#7911;a qu&#253; kh&#225;ch &#273;&#227; &#273;&#432;&#7907;c g&#7917;i &#273;&#7871;n chúng tôi. <br> Chúng tôi s&#7869; liên h&#7879; '+
			  'l&#7841;i v&#7899;i quý khách s&#7899;m nh&#7845;t có th&#7875; <br> Chúc quý khách m&#7897;t ngày may m&#7855;n. <br>'+
			  '__________________________________________________________'
T.Width = 380;
T.Err_Format = "<font color=#ffcc00><b>xxx</b></font>"
T.Run();

%>


<div class="Main_Header"> THÔNG TIN LIÊN HỆ </div>

<style>
	#contact_full img { margin:0px 10px 10px 0px; }
</style>
<div id="contact_full" style="padding:15px; padding-top:5px;"> <%=DB_to_Val('Select Detail from Intro where title="full_Contact" ')%> </div>
<br />

<div class="sep_" style="height:1px; clear:both;"></div>










	<div class="Main_Header"> LIÊN HỆ TRỰC TUYẾN </div>
	<div style="padding:15px;" class="box w100">

		<p  style="margin-left:60"><b style="color:#900;"> <%=T.status%> </b> </p><br />

		<p style="margin-left:30px; color:#666;"> <i><b>Quý khách vui lòng điền đầy đủ thông tin vào form dưới đây:</b></i> </p><br /><br />

		<%=T.Form_Code%>
		<%=T.JS_Code%>
		<table border="0" width="100%" id="table2" class="form_table">
			<tr>
				<td width="110" align="right">
				<b style="color:#900;">(*)</b> Tên bạn&nbsp;&nbsp; </td>
				<td width=410><%=T.Err_Span('name')%><%=T.Control('name')%>
				</td>
			</tr>
			<tr>
				<td width="110" align="right" valign=top>
				Địa chỉ&nbsp;&nbsp;</td>
				<td width=410><%=T.Err_Span('address')%><%=T.Control('Address')%>
				</td>
			</tr>
			<tr>
				<td width="110" align="right">
				Điện thoại&nbsp;&nbsp;&nbsp; </td>
				<td><%=T.Err_Span('Phone')%><%=T.Control('Phone')%>
				</td>
			</tr>
			<tr>
				<td width="110" align="right">
				Email&nbsp;&nbsp;&nbsp; </td>
				<td><%=T.Err_Span('Email')%><%=T.Control('Email')%></td>
			</tr>
			<tr>
				<td width="110" align="right" valign=top>
				 <b style="color:#900;">(*)</b> Lời nhắn&nbsp;&nbsp;&nbsp;  </td>
				<td><%=T.Err_Span('Comment')%><%=T.Control('Comment')%></td>
			</tr>
			<tr>
				<td align="center" colspan="2" height=40>&nbsp;&nbsp; 
				<input type=submit value="Gửi" class="admin_but" style="width:70px;">
				<input type=reset value="Xóa hết" class="admin_but" style="width:70px;"> </td>
			</tr>
			<tr>
				<td align="right" colspan="2">&nbsp;</td>
			</tr>
		</table>
	</form>
	</div>




<style>
	.form_table input, .form_table textarea { margin:3px 0px 3px 0px; }
	.Order_But {background-color:#ffffff; border:1px solid #cc6600}
</style>

<!--#include file="footer.asp"-->


