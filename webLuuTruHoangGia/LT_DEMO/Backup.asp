<div style="padding:50px 20px 20px 120px;">
	<b style="color:#fff; font-size:15px;">SAO LƯU DỰ PHÒNG DỮ LIỆU CỦA HỆ THỐNG</b><br><br><br>
	&nbsp; &nbsp; <b class="pseudo_but" onclick="Down()"> Tải file sao lưu </b>
	<br><br><br>

	<i style="line-height:1.8;"> <b>* Lưu ý :</b> <br>
	- File sao lưu nên được lưu vào vị trí an toàn để tránh sự cố làm mất dữ liệu. <br /> (nên ghi ra đĩa CD hoặc tải lên mạng, nếu đặt trên máy, không nên lưu vào ổ C: ) <br>
	- Khi có nhiều file sao lưu, nếu hệ thống có trục trặc chỉ cần phục hồi file sao lưu mới nhất. <br>
	</i>
</div>
<iframe scrolling="0" frameborder="0" style="width:0px; height:0px;" id="download_frame"></iframe>

<script>
function Date_Name(){ var x=new Date(); return x.getDate() + '-' + (x.getMonth()+1) + '-' + x.getYear() }
function Down(){
	//--create the zipped file with extension : *.dcorp_1199726
	var Zip_Path = Global.x('site_path')+'\\backup_'+Date_Name()+'.dcorp_1199726'
	CopyFile(Global.x('db_path') + '\\DB.mdb', Zip_Path);

	//-- force download dialog
	$('#download_frame').attr('src',Zip_Path)

}
</script>

