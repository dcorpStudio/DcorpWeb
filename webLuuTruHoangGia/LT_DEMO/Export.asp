<style>
	#Export_form input { width:120px; height:23px; float:left; margin-top:1px; font-size:13px; }
	#Export_form label { color:#000; float:left; margin-top:4px; font-weight:bold; }
</style>

<div align="center" id="Export_form"><div style="width:600px; padding-top:80px;" align="left">
	<b style="font-family:Tahoma; font-size:15px; color:#fff;"> XUẤT MỤC LỤC HỒ SƠ TỪ DANH MỤC RA FILE WORD </b><br /><br />
	Phông lưu trữ : <b style="color:#000; font-size:13px; text-transform:uppercase;" class="Font_Name"></b> &nbsp; -  &nbsp;
	Danh mục bảo quản : <b style="color:#000; font-size:13px;" class="DMBQ_Name"></b>
	<div style="height:1px; border-bottom:1px solid #333;"></div> <br /><br />


	<label>Số hồ sơ từ : &nbsp; &nbsp; </label> <input id="start_hsso"/>
	<label> &nbsp; &nbsp; Đến số : &nbsp; &nbsp; </label> <input id="end_hsso" />
	<b class="pseudo_but" id="Export_BUT" style="float:left; margin:0px; margin-left:40px; font-weight:bold;"> &nbsp; TẢI FILE WORD &nbsp; </b>


	<br /><br /><br /><br /><div style="height:1px; border-top:1px solid #444;"></div>
	<br /><p style="line-height:1.7; font-style:italic; color:#333;">
		<b><u>Chú ý : </u></b><br /><br>
		- Vui lòng điền số bắt đầu và kết thúc của hồ sơ số bạn muốn xuất ra word. Sau đó nhấn nút "TẢI FILE WORD" <br>
		- Danh mục <b class="DMBQ_Name"></b> hiện tại có hồ sơ số từ <b class="min_hsso"></b> đến số <b class="max_hsso"></b> 
		. Bạn chỉ được chọn số hồ sơ trong khung này. <br><br>
	</p>
</div></div>



<div align="center" id="process_bar" style="display:none;padding-top:120px;">
	<b style="color:#000; font:14px Tahoma;"> Đang tạo file word. Vui lòng chờ... </b>
	<br /><br /> <img src="Image/Process_Bar.gif" id="busy_img"/>
</div>












<script>
	function XConvert(x){ return htmlEncode(x) }
	var Current_Hopso_Name=0;

	$(function(){
		$('.DMBQ_Name').text(DB_to_Val("Select Menu_Txt from DanhMucBQ where ID="+ (D.EXPORT_DMBQ_ID||0) ))
		$('.Font_Name').text(DB_to_Val("Select Menu_Txt from FONT_MENU where ID="+ (D.FONT||0) ))
		var max_hsso = DB_to_Val("Select Max(HSSO) from Product where DanhMucBQ_ID=" + D.EXPORT_DMBQ_ID);
		var min_hsso = DB_to_Val("Select Min(HSSO) from Product where DanhMucBQ_ID=" + D.EXPORT_DMBQ_ID);
		max_hsso = parseInt(max_hsso); if (isNaN(max_hsso)){ max_hsso=0 }
		min_hsso = parseInt(min_hsso); if (isNaN(min_hsso)){ min_hsso=0 }
		$('.max_hsso').text(max_hsso); $('.min_hsso').text(min_hsso);

		$('#Export_BUT').click(function(){
			//-- check start_hsso & min hsso
			var s1 = parseInt($('#start_hsso').val()); var s2 = parseInt($('#end_hsso').val());
			if (isNaN(s1) || isNaN(s2) || s1 < min_hsso || s2 > max_hsso){ alert('Số bắt đầu hoặc kết thúc hồ sơ không hợp lệ !'); return false; }

			//-- create the New Exporting doc file
			var Soft_Path = "C:\\Program Files\\DCORP_SOFT\\LUUTRU_F" ;
			var Sketch_File = ReadFromFile(Soft_Path+"\\Export_Sketch.htm");
			var Row_Tem = ReadFromFile(Soft_Path+"\\Export_Row_Tem.htm")
			var DB = DB_to_Arr("Select * from [Product_Full] where DanhmucBQ_ID="+ D.EXPORT_DMBQ_ID +" and HSSO>="+s1+" and HSSO<="+s2+" Order By HSSO, Len(HSSO_Extra) , HSSO_Extra , HOPSO, HOPSO_Extra, ID ASC")
			var Con = "@tenhs/=XConvert(@tenhs/); @f_date/=XConvert(@f_date/); @soto/=XConvert(@soto/); @nambq/=XConvert(@nambq/); @ghichu/=XConvert(@ghichu/);"+
						"if (Current_Hopso_Name!=@hopso_name/){ Current_Hopso_Name=@hopso_name/ }else{@hopso_name/=''}"
			var All_Row = JRender(DB,Row_Tem, Con); WriteToFile( Soft_Path+"\\Exporting_File.doc", Sketch_File.replace('<!--DCORP DATA-->',All_Row) )

			//-- use SAFRCFileDlg to open SaveAs dialog
			try{ //--works for XP
				var objDialog = new ActiveXObject("SAFRCFileDlg.FileSave"); 
				objDialog.FileName = "Muc Luc Luu Tru.doc"; objDialog.FileType = "Microsoft Word";
				if (objDialog.OpenFileSaveDlg()){
					try{ CopyFile(Soft_Path+"\\Exporting_File.doc", objDialog.FileName) }catch(e){ alert('Có lỗi xảy ra. Chi tiết : \n'+ e.description ) }
				}
			}catch(e){ //-- Win7, vista
				var WshShell = new ActiveXObject("WScript.Shell");
				CopyFile( Soft_Path+"\\Exporting_File.doc", WshShell.SpecialFolders("Desktop")+"\\Muc Luc Luu Tru " + VTime().replace(/[:/]/g,'-')+'.doc' )
				alert("File word đã được tải về Desktop !")
			}
		})
	})



</script>
