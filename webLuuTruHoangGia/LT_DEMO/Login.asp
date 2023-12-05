<!--#include file="inc.asp"-->
<%if (Session('admin')=="true"){ Response.Redirect("App.asp") }%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link href="Image/Global.css" rel="stylesheet" type="text/css" />
	<title> PHAN MEM QUAN LY TAI LIEU LUU TRU </title>
	<script src="CORE/jquery.js"></script>
	<script src="CORE/Global.js"></script>
	<script src="CORE/Lobby_Func.js"></script>
</head>


<body scroll="no" style="overflow:hidden; padding:0px; margin:0px; background:url(Image/BG.jpg) repeat-x;">


<div align=center style="padding-top:200px;">
	<p style="color:#444; border-bottom:1px solid #333; width:320px; padding-bottom:10px;">VUI LÒNG ĐĂNG NHẬP ĐỂ SỬ DỤNG PHẦN MỀM</p>

	<div style="width:319px; text-align:left; padding-left:3px;" align=center>
		<p style="margin:12px; font-weight:bold; line-height:1.8; color:#145063;color:#c00;" id="err_msg"></p>

		<style> .login {width:150px; background:#fff; height:20px; border:1px solid #ccc;} </style>
		<form id="login_form" method="get" action="login.asp" onSubmit="return false"><table border="0" cellspacing="10">
			<tr><td style="height:30px;">Tên đăng nhập:&nbsp;</td><td><input id="my_user" class="login">&nbsp;</td></tr>
			<tr><td>Mật khẩu truy cập:&nbsp;</td><td><input id="my_pass" class="login" type=password>&nbsp;</td></tr>
			<tr><td colspan="2"><p align="right" style="margin:10px 0px;"><input type=image src="Image/Login_But.jpg" name="I1"></p></td></tr>
		</table></form>
		<p style="margin:20px 20px 20px 20px; font-weight:bold; line-height:1.8; color:#145063;" align=left></p>
		<p align=right style="padding-right:33px; margin:0px; margin-bottom:10px;">&nbsp;</p>
	</div>
</div>


<div id="x" style="display:none;"></div>

<script>
	$(function(){
		$('#my_user').focus()
		$('#login_form').submit(function(){
			var my_user = $('#my_user').val().replace(/['"]/g,'');
			var my_pass = $('#my_pass').val().replace(/['"]/g,'');
			$("#x").load("check_login.asp?u="+my_user+"&p="+my_pass, function(x){
				if (x.indexOf("login_success")==0){
					location = 'App.asp?uid='+x.split(",")[1]
				}else{
					$('#err_msg').text('Mật khẩu không chính xác !')
				}
			})
			return false;
		})
	})
</script>
