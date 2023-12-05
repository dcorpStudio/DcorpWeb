<!--#Include file="Inc.asp"-->

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>

<%var pass = DB_to_Val('Select My_Pass from Admin')

var Mail_Body = 'Thong tin dang nhap kenh quan tri ChoPhuTung.com <hr> '+
				' UserName : Admin <br>' +
				' Password : <br><p align=center>' + Convert(pass,2) + '</p><hr>'

Send_Mail("quen_pass@website.com" , Global_Var("Admin_Email") , Global_Var("Admin_CC_Email") ,
			"MAT KHAU ADMIN QUANLY WEBSITE"  ,	Mail_Body )

%>


<hr>
<p>Password đã được gửi đến hòm thư của bạn.<br>
Vui lòng kiểm tra hòm thư sau khoảng 5-10 phút nữa để xem lại password. /</p>
<hr>