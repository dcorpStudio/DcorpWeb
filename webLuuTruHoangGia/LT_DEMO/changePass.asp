
<script>
	function change_pass(){
		var pass = $("#new_pass").val(); var pass1 = $("#new_pass1").val(); var old_pass = $("#old_pass").val(); var err = ''
		if (pass && pass1 && old_pass){
			if (pass != pass1){
				err = 'Hai password mới không trùng nhau !<br> Password chưa thay đổi !'
			}else if (old_pass == DB_to_Val('Select My_pass from [Admin] where ID=1')){
				Conn_Obj().execute("Update [Admin] set my_pass='"+pass.replace(/'/g,"''")+"' where ID =1 ")
				err = 'Đổi password thành công !'
			}else{
				err = 'Password cũ không đúng ! &nbsp; Password chưa thay đổi !'
			}
		}
		if (err){ $('#err_msg').html(err) }
		return false;
	}
	$('#change_pass_form').submit(change_pass)
</script>


<form id="change_pass_form">
	<div align=center> <b style="font-size:13px; color:#c00; margin:60px 0px 20px 0px;" id="err_msg">Đổi password đăng nhập quản trị</b> <hr style="width:400px;">
		<table style="width:400px; margin-top:20px;" cellspacing=20>
			<tr> <td>Password cũ : </td> <td> <input type="password" id="old_pass" size="29"></td> </tr>
			<tr> <td>Password mới : </td> <td> <input type="password" id="new_pass1" size="29"></td> </tr>
			<tr> <td>Gõ lại password mới: </td> <td> <input type="password" id="new_pass" size="29"></td></tr>
			<tr><td colspan="2" align="center">
				<b class="submit pseudo_but"> Đổi mật khẩu </b> &nbsp; <b onclick="D.backpage()" class="pseudo_but"> Bỏ qua </b> <input type="submit" value="" style="width:0px;height:0px;">
			</td></tr>
		</table>

		<i style="text-align:left;"><b>Chú ý&nbsp; :&nbsp;</b><br>
		1. Password có phân biệt chữ hoa và chữ thường<br>
		2. Bạn nên tắt phần mềm gõ tiếng Việt khi gõ password để tránh bị nhầm<br>
		</i>
	</div>
</form>