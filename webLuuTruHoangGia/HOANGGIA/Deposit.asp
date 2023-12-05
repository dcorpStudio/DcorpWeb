<!--#include file="header.asp"-->
<!--#include file="Lib/JavaScript.asp"-->



<%
//--------------------------Ham` Generate Mail Body & Send
function Request_Prod(Control_Arr){
	var C = Control_Arr;

	var BODY =	'<p><b>Kh&#225;ch h&#224;ng ky gui t&#7915; website </b> '+
				'('  +VBNow()+  ')<br>\n <br>\n &nbsp;</p>'

	BODY += Contact_BODY( Control_Arr , Array(
			'T&#234;n kh&#225;ch h&#224;ng' , '&#272;&#7883;a ch&#7881;', '&#272;i&#7879;n tho&#7841;i', 'Email'
			, 'Thong tin ky gui') )

	BODY += '<hr> L&#432;u &#253; : Email n&#224;y &#273;&#432;&#7907;c g&#7917;i t&#7921; '+
			' &#273;&#7897;ng t&#7915; website, vui l&#242;ng kh&#244;ng reply.<br><br><br>'

	Send_Mail('' , '' , '' , 'Khach hang ky gui ban - cho thue BDS ' , BODY)

//hr();R('/////' + BODY + '////'); F(); AAAAAAAAAA

}



///===============Generate Control 
var A1 = new Control_Textbox('Name','','',255,2)
A1.Set_Err(2,'Bạn chưa điền tên <br>')
A1.Set_Err(1,'Tên không được vượt quá 255 kí tự<br>')

var A2 = new Control_Textarea('Address')
A2.Height = 40

var A3 = new Control_Textbox('Phone')
var A4 = new Control_Textbox('Email')

var A5 = new Control_Textarea('Comment','','',5000,5)
A5.Set_Err(2,'Bạn chưa điền thông tin ký gửi<br>')
A5.Set_Err(1,'Thông tin không được vượt quá 5000 kí tự<br>')
A5.Height = 180

var T = new Control_Collection('task' , Array( A1,A2,A3,A4,A5 ) )
T.Task_Func = Request_Prod
T.task_done = '<font color=#ffcc00>__________________________________________________________<br><br>'+
				'Thông tin ký gửi của quý khách đã được gửi đến chúng tôi. <br> Chúng tôi sẽ liên hệ lại với quý khách trong thời gian sớm nhất. <br> Chúc quý khách một ngày làm việc hiệu quả <br>'+
			  '__________________________________________________________</font><br><br>'
T.Width = 400;
T.Err_Format = "<font color=#ffcc00><b>xxx</b></font>"
T.Run();

%>

<table width=100% cellpadding=0 cellspacing=0>
<tr><td align=left style="color:#ffffff">

			<table border="0" width="100%" cellpadding=0 cellspacing=0>
				<tr>
					<td class="Main_Header"> KÝ GỬI </td>
				</tr>
			</table>

	<div style="padding:15px;" class="box w100">
		<p  style="margin-left:60"> <font color=#ffffff><b> <%=T.status%></b></font> </p>
		<p style="margin-left:30">
			Quý khách cần bán - cho thuê bất động sản có thể ký gửi cho chúng tôi. Quý khách vui lòng điền đẩy đủ các thông tin bên dưới, sau đó nhấn nút gửi:
		</p><br /><br /><br />
		<%=T.Form_Code%>
		<%=T.JS_Code%>
		<table border="0" width="100%" id="table2" class="form_table">
			<tr>
				<td width="110" align="right">
				Tên &nbsp;&nbsp;<font color=#FFCC00><b>(*)</b></font> </td>
				<td width=390><%=T.Err_Span('name')%><%=T.Control('name')%>
				</td>
			</tr>
			<tr>
				<td width="110" align="right" valign=top>
				Địa chỉ&nbsp;&nbsp;</td>
				<td width=390><%=T.Err_Span('address')%><%=T.Control('Address')%>
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
				Thông tin về &nbsp; <br /> BĐS cần ký gửi &nbsp; <font color=#FFCC00><b>(*)</b></font>  </td>
				<td><%=T.Err_Span('Comment')%><%=T.Control('Comment')%></td>
			</tr>
			<tr>
				<td align="center" colspan="2" height=40>&nbsp;&nbsp; 
				<input type=submit value="Gửi form" class="admin_but" style="width:70px;">
				<input type=reset value="Xóa h&#7871;t" class="admin_but" style="width:70px;"> </td>
			</tr>
			<tr>
				<td align="right" colspan="2">&nbsp;</td>
			</tr>
		</table>
	</form>
	</div>
</td></tr>
</table>




<style>
	.form_table input, .form_table textarea { margin:3px 0px 3px 0px; }
	.Order_But {background-color:#ffffff; border:1px solid #cc6600}
</style>

<!--#include file="footer.asp"-->


