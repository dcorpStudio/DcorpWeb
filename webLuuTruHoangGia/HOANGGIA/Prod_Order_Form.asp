<!--#include file=Inc.asp-->
<!--#include file="Lib/Common_Control.asp"-->
<!--#include file="Lib/JavaScript.asp"-->

<script src="LIB/JS/Common.js"></script>
<link rel="stylesheet" href="Index.css.asp" />
<body style="background:none;">

<%var ID=parseInt(Request('id'))
if (!isNaN(ID) && ID>0){ ID = DB_to_Val('select ID from Product where ID='+ID) }
if (!isNaN(ID) && ID>0){%>

<%
//--------------------------Ham` Generate Mail Body & Send
function Request_Prod(Control_Arr){
	var C = Control_Arr;

	var BODY =	'<p><b> ' + 'Khách hàng đặt hàng dự án BĐS '.C(0) + ' </b> '+
				'('  +VBNow()+  ')<br>\n <br>\n &nbsp;</p><br>'

	BODY += 'Thông tin chi tiết dự án : '.C(0) + Global_Var('Site_URL') + Global_Var('Site_Path') + '/Product_Detail.asp?ID='+ID+'<br><br>'

	BODY += Contact_BODY( Control_Arr , Array(
			'T&#234;n kh&#225;ch h&#224;ng' , '&#272;&#7883;a ch&#7881;', '&#272;i&#7879;n tho&#7841;i', 'Email'
			, 'L&#7901;i nh&#7855;n') )

	BODY += '<hr> L&#432;u &#253; : Email n&#224;y &#273;&#432;&#7907;c g&#7917;i t&#7921; '+
			' &#273;&#7897;ng t&#7915; website, vui l&#242;ng kh&#244;ng reply.<br><br><br>'

	Send_Mail('' , '' , '' , 'Khach hang dat mua du an BDS' , BODY)

//	hr();R('/////' + BODY + '////'); F(); AAAAAAAAAA

}



///===============Generate Control 
var A1 = new Control_Textbox('Name','','','',2)
A1.Set_Err(2,'Vui lòng điền tên <br>')

var A2 = new Control_Textarea('Address')
A2.Height = 40

var A3 = new Control_Textbox('Phone','','','',10)
A3.Set_Err('All','Vui lòng điền số điện thoại <br>')

var A4 = new Control_Textbox('Email')

var A5 = new Control_Textarea('Comment')
A5.Height = 40

var T = new Control_Collection('task' , Array( A1,A2,A3,A4,A5 ) )
T.Task_Func = Request_Prod
T.task_done = ' '
T.Width = 400;
T.Run();
%>

<%if (T.status==T.task_done){%>
	<div style="color:#fc0;">
		<b>_________________________________________________________________________<br /><br />
		Yêu cầu đặt hàng của quý khách đã được gửi đến chúng tôi.<br />
		Chúng tôi sẽ liên hệ lại với quý khách trong thời gian sớm nhất.<br />
		Chúc quý khách một ngày làm việc hiệu quả.<br />
		_________________________________________________________________________</b>
	</div>
<%}else{%>

		<p  style="margin-left:60"> <font color=#ffffff><b> <%=T.status%></b></font> </p>
		<%=T.Form_Code%>
		<%=T.JS_Code%>
		<table border="0" width="100%" id="table2" class="form_table">
			<tr>
				<td width="110" align="right">
				Tên bạn&nbsp;&nbsp;<font color=#FFCC00><b>(*)</b></font> </td>
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
				Điện thoại&nbsp;&nbsp;&nbsp;<font color=#FFCC00><b>(*)</b></font> </td>
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
				Lời nhắn &nbsp;  </td>
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

<%}%>


<style>
	.admin_but { background:url(admin/IMG/But_Bg.jpg); height:22px; }
	.form_table input, .form_table textarea { margin:3px 0px 3px 0px; }
	.Order_But {background-color:#ffffff; border:1px solid #cc6600}
</style>

<%}else{%>
	Dự án không tồn tại hoặc đã bị xóa.
<%}%>

</body>