<!--#Include file="Header.asp"-->

<style>
	body {font:12px tahoma;}
	td {font:12px tahoma;}
</style>

<br />
<br />



<!-----------------------------------------------noi dung trang-------------------------------->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<font color="#990000"><span style="font-size: 13pt"><b>Thay đổi</b></span></font><font color="#990000" style="font-size: 13pt"><b> password</b></font>
<hr>


<p align=center>
<%
var pass = VBRequest("new_pass")
var pass1 = VBRequest("new_pass1")
var old_pass = VBRequest("old_pass")

if (pass != "" && pass1 != "" && old_pass != ""){
	if (pass != pass1){%>
		<br /><font color='#cc0000' size=2> Hai password mới không trùng nhau ! <b>Password chưa thay đổi !</b></font><br /><br />
	<%}else{
		if (old_pass == DB_to_Val('Select My_pass from Admin where ID=1')){
			DB_Update('Admin' , '1' , Array(pass) , '' ,  'My_pass')%>
			<br /><font color=#cc0000 size=2> <b>Đổi password thành công !</b></font><br /><br />
		<%}else{%>
			<br /><font color='#cc0000' size=2> Password cũ không đúng !<b> Password chưa thay đổi !</b></font><br /><br />
		<%}
	}
}%>

</p>


<style>
	.change_pass td { border-bottom:1px solid #ccc; height:50px; vertical-align:middle; }
	.change_pass td input { border:1px solid #999; width:200px; height:20px; }
</style>

<form method="post" action="change_pass.asp?act=change">
<div align="center">
<table width="400">
	<tr class="change_pass">
		<td>Password cũ : </td>
		<td > <input type="password" name="old_pass" size="29"></td>
	</tr>
	<tr class="change_pass">
		<td>Password mới : </td>
		<td> <input type="password" name="new_pass1" size="29"></td>
	</tr>
	<tr class="change_pass">
		<td style="width:150px;">Gõ lại password mới: </td>
		<td> <input type="password" name="new_pass" size="29"></td>
	</tr>

	<tr>
		<td colspan="2" align="center" style="padding-top:10px;">
			<input type="submit" value=" Đổi mật khẩu " class="Admin_But">
			<input type="button" value=" Bỏ qua " class="admin_but" onclick="history.back(-1)">
		</td>
	</tr>
</table>

<p align="center">&nbsp;</p>



<hr>
<div align="left" style="color:#999999; line-height:1.8;">
	<i><b><u> Chú ý&nbsp; : </u></b></i> <br>
	1. Password có phân biệt chữ hoa và chữ thường<br>
	2. Bạn nên tắt phần mềm gõ tiếng Việt khi gõ pass để tránh bị nhầm<br>
</div>

</div>

</form>




<!--#Include file="Footer.asp"-->


