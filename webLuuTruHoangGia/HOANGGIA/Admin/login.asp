<!--#Include file="INC.asp"-->

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<head> <title> :: Đăng nhập :: </title> </head>

<style>
	body,td,div { font:12px arial; }
</style>
<body onLoad="document.getElementById('user').focus()">


<%


if (!VBSession("try") || isNaN(parseInt(VBSession("try"))) ){  Session("try") = 0; }

var user=VBRequest("user")
var pass=VBRequest("pass")

if (user != "" && user!="undefined"){
	user=VBTrim(user)
	var valid_user = true
}

if (pass != "" && pass!="undefined"){
	pass=VBTrim(pass)
	var valid_pass = true
}

//------Inital a value false for login status
var Valid_Login = false


//------A hard test
if (valid_user && valid_pass){
	Session("try") = parseInt(VBSession("try")) + 1
	if (parseInt(VBSession("try")) <= 5){
		var DB = DB_to_Arr("select My_User , My_Pass from admin where My_User <> '' and My_Pass <> '' ")
		if (DB.RS('My_User') == user &&  DB.RS('My_Pass') == pass){
			Valid_Login = true;
		}
		DB=null
	}
}


if (Valid_Login){
	Session("admin") = true
	Response.Redirect('index.asp')
}else{
	if (parseInt(VBSession("try")) > 5){
		Response.Redirect('../index.asp')
	}
}

%>


<body style="margin:0px">


<form method="post" action="login.asp">

<div align="center" style="margin-top:100">
	<table cellspacing="0" cellpadding="0" style="width:400; height:293; background:url(../Home_Files/LOGIN_BG.jpg);">
		<tr><td height=90 colspan=2></td></tr>
		<tr>
			<td colspan="2" style="padding-left:60; height:40">
					<b>Đăng nhập</b> &nbsp;&nbsp; |&nbsp;&nbsp; </b></font>
				<a href="../index.asp" style="color:#cc6600">Quay về trang chủ</a>
			</td>
		</tr>
		<tr>
			<td align=right> User name</td>
			<td>&nbsp; <input name="user" style="width:150px;" id="user"> </td>
		</tr>
		<tr><td style="font-size:5px;">&nbsp;</td></tr>
		<tr>
			<td align=right>Password</td>
			<td>&nbsp; <input type="password" name="pass" style="width:150px;"></td>
		</tr>
		<tr>
			<td colspan="2" align=center>
				<br>
				<input type="submit" value=" Đăng nhập ">
			</td>
		</tr>
		<tr>
			<td colspan="2" align=right style="padding-right:20">
				<br>
				<a href="quen_pass.asp" style="color:#cc6600">Quên password ?</a>
			</td>
		</tr>
		<tr>
			<td colspan="2" height=100%>

			</td>
		</tr>
	</table>

	<table width="400" id="table2" style="margin-top:30; border:1px solid #ccc">
		<tr>
			<td style="padding:10px; color:#999999; line-height:1.8;"><b><u>Lưu ý&nbsp; :&nbsp;</u></b> <br>
			1. Password có phân biệt chữ hoa và chữ thường<br>
			2. Quý khách nên tắt phần mềm gõ tiếng Việt để tránh bị nhầm lẫn<br>
			3. Quý khách chỉ có thể đăng nhập tối đa 5 lần. Sau 5 lần quý khách phải chờ 20 phút mới có thể đăng nhập tiếp</td>
		</tr>
	</table>
</div>

</form>

</body>
