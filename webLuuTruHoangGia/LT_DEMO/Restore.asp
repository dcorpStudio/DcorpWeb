

<div align="center" id="restore_form"><div style="width:600px; padding-top:80px;" align="left">
	<b style="font-family:Tahoma; font-size:15px; color:#fff;">KHÔI PHỤC DỮ LIỆU CHO HỆ THỐNG</b><br /><br />
	<div style="height:1px; border-bottom:1px solid #333;"></div> <br /><br />

	<b style="color:#000; float:left; margin-top:4px;">CHỌN FILE ĐÃ SAO LƯU &nbsp; &nbsp; </b>
	<input type="file" id="restore_file" style="width:300px; height:23px; float:left; margin-top:1px; font-size:13px;" />
	<b class="pseudo_but" id="restore_BUT" style="float:left; margin-left:40px; font-weight:bold;"> &nbsp; KHÔI PHỤC &nbsp; </b>


	<br /><br /><br /><br /><div style="height:1px; border-top:1px solid #444;"></div>
	<br /><p style="line-height:1.7; font-style:italic; color:#333;">
		<b><u>Chú ý : </u></b>
		<br><br>- Sau khi khôi phục dữ liệu từ file sao lưu vào hệ thống, các dữ liệu hiện tại trong hệ thống sẽ bị <b>xóa hết</b> và thay bằng dữ liệu từ file sao lưu
		<br><br>- Chỉ cần khôi phục 1 lần và khôi phục với file sao lưu mới nhất (sao lưu lần cuối gần nhất). </b></i>
	</p>
</div></div>


<div align="center" id="success_screen" style="display:none;padding-top:120px;">
	<b style="color:#800; font:14px Tahoma; font-weight:bold;"> Khôi phục dữ liệu thành công ! </b> <br /><br /><br />
	<b style="color:#800; font:14px Tahoma; font-weight:bold;"> *** CHÚ Ý QUAN TRỌNG : </b><br /><br />
	<p style="font:14px Tahoma; line-height:1.6;"> Mật khẩu đăng nhập phần mềm của bạn đã được thay đổi thành "123" <br />
	Nếu cần thiết vui lòng đổi mật khẩu ngay lúc này. </p>
</div>








<script>
	$(function(){

		$('#restore_BUT').click(function(){
			//-- check file path
			valid_file = false;
			var File_Path = $('#restore_file').val();
			if (File_Path.length < 15 || File_Path.indexOf('.dcorp_1199726') != File_Path.length-14 ){
				alert("Bạn chưa chọn file sao lưu ! \nClick vào nút 'Browse...' để chọn file ");
			}else{ 	if ( confirm("Dữ liệu hiện tại sẽ bị thay thế hoàn toàn bởi dữ sao lưu. \n Bạn chắc chắn muốn khôi phục file sao lưu này vào hệ thống ?") ){ var valid_file = true; } }
			if (!valid_file){return false}

			//-- restoring task
			CopyFile(File_Path, Global.x("db_path")+'\\DB.mdb' )

			//-- change the admin's password back to 123
			Conn_Obj().execute("Update [Admin] Set My_Pass='123'")

			//-- show success message
			$('#restore_form,#success_screen').toggle();
		})
	})


</script>



