<div align="center" id="import_form"><div style="width:600px; padding-top:80px;" align="left">
	<b style="font-family:Tahoma; font-size:15px; color:#fff;">NHẬP MỤC LỤC TỪ FILE WORD VÀO HỆ THỐNG</b><br /><br />
	Phông lưu trữ : <b style="color:#000; font-size:13px; text-transform:uppercase;" class="Font_Name"></b> &nbsp; -  &nbsp;
	Danh mục bảo quản : <b style="color:#000; font-size:13px;" class="DMBQ_Name"></b>
	<div style="height:1px; border-bottom:1px solid #333;"></div> <br /><br />


	<b style="color:#000; float:left; margin-top:4px;">CHỌN FILE WORD &nbsp; &nbsp; </b>
	<input type="file" id="import_file" style="width:300px; height:23px; float:left; margin-top:1px; font-size:13px;" />
	<b class="pseudo_but" id="IMPORT_BUT" style="float:left; margin-left:40px; font-weight:bold;"> &nbsp; NHẬP MỤC LỤC &nbsp; </b>


	<br /><br /><br /><br /><div style="height:1px; border-top:1px solid #444;"></div>
	<br /><p style="line-height:1.7; font-style:italic; color:#333;">
		<b><u>Chú ý : </u></b><br />
		- Danh mục <b class="DMBQ_Name"></b> hiện tại có hồ sơ số đến <b class="max_hsso"></b> 
		. File dữ liệu phải có hồ sơ số bắt đầu từ số <b class="max_hsso_1"></b> 
		<br><br>- File dữ liệu <b>chỉ được phép</b> chứa <b>bảng thông tin</b> (table) về hồ sơ tài liệu, không được phép có các đoạn văn 
		bản khác. Bảng thông tin không được phép chứa header - footer.
		<br><br>-<b> 7 cột trong bảng phải đúng theo thứ tự :</b> <br>  1.HỘP SỐ - 2.HỒ SƠ SỐ - 3.TÊN HỒ SƠ - 4.THỜI GIAN TÀI LIỆU- 5.SỐ TỜ - 6.SỐ NĂM BẢO QUẢN - 7.GHI CHÚ
		<br><br>- Hồ sơ đầu tiên (dòng đầu tiên) trong bảng <b>phải có ghi hộp số</b></i></p>
	</p>
</div></div>

<div align="center" id="process_bar" style="display:none;padding-top:120px;">
	<b style="color:#000; font:14px Tahoma;"> Đang xử lý dữ liệu. Vui lòng chờ... </b>
	<br /><br /> <img src="Image/Process_Bar.gif" id="busy_img"/>
</div>

<div align="center" id="success_screen" style="display:none;padding-top:120px;">
	<b style="color:#800; font:14px Tahoma; font-weight:bold;"> Nhập mục lục thành công ! </b>
	<br /><br /> <b class="pseudo_but" onclick="D.load('Product.htm')"> Xem danh mục bảo quản vừa được nhập </b>
</div>

<div align="center" id="failed_screen" style="display:none;padding-top:120px;">
	<b style="color:#000; font:14px Tahoma;"> Nhập mục lục không thành công. </b>
	<br /><br /> <b class="pseudo_but" onclick="D.load('import.htm')"> Nhập lại một mục lục khác </b>
</div>












<script>
	$(function(){
		$('.DMBQ_Name').text(DB_to_Val("Select Menu_Txt from DanhMucBQ where ID="+ (D.IMPORT_DMBQ_ID||0) ))
		$('.Font_Name').text(DB_to_Val("Select Menu_Txt from FONT_MENU where ID="+ (D.FONT||0) ))
		var max_hsso = DB_to_Val("Select Max(HSSO) from Product where DanhMucBQ_ID=" + D.IMPORT_DMBQ_ID);
		max_hsso = parseInt(max_hsso); if (isNaN(max_hsso)){ max_hsso=0 }
		$('.max_hsso').text(max_hsso); $('.max_hsso_1').text( max_hsso+1 );

		$('#IMPORT_BUT').click(function(){
			//-- check file path
			valid_file = false;
			var File_Path = $('#import_file').val();
			if (File_Path.length < 5 || File_Path.lastIndexOf('.doc') < File_Path.length-5 ){
				alert("Bạn chưa chọn file word ! \nClick vào nút 'Browse...' để chọn file ");
			}else{ 	if ( confirm("Bạn chắc chắn file dữ liệu đúng định dạng để nhập vào hệ thống ?") ){ var valid_file = true; } }
			if (!valid_file){return false}

			//-- show importing running bar
			$('#import_form,#process_bar').toggle();
			MSWord_Path = File_Path; setTimeout("Import()",1);
		})
	})




	var MSWord_Path = ''
	function Import(){
		//-- create MSWord Object
		try{
			var newMSWordPath = "C:\\Program Files\\DCORP_SOFT\\LUUTRU_F\\Importing_Document." + getFileExt(MSWord_Path)
			CopyFile( MSWord_Path, newMSWordPath ); var word = new ActiveXObject("Word.Application");
			var text = String(word.documents.open(newMSWordPath).Content); word.quit()

			//-- try to import the MSWord file to DB. 
			try{






				/***********************************************************************************************************************************************************/
				/* CORE PROCESS OF IMPORT TASK *****************************************************************************************************************************/
				/***********************************************************************************************************************************************************/

				var structure_err = ''
				var Clean = function(x){ return String(x).replace(/(^\s+)|(\s+$)|/gi,'') }
				var HSName = function(a){
					var x=String(a).replace(/[^a-z0-9.]+/gi,'').replace(/\.+/g,'.'); if (x=='' || x=='undefined'){ return [null,''] }

					//-- check normal the structure : 123
					if( (/^\d+$/i).test(x) ){
						return [ parseInt(x,10) ,'' ]

					//-- check the structure : 123a
					}else if((/^\d+[a-z]*$/i).test(x)){
						return [parseInt(x.replace(/\D+/g,''),10) , x.replace(/\d+/g,'') ]

					//-- check the structure : 123.1
					}else if( (/^\d+\.(\d+)$/i).test(x) ){
						var tempArr = x.split('.')
						return [ parseInt(tempArr[0].replace(/\D+/g,''),10) , parseInt(tempArr[1].replace(/\D+/g,''),10) ]

					//-- invalid for all structure
					}else{ structure_err=a; return 'error' }


				}


				text = text.replace( /^(\D+)((\d{0,10})(\D\D)(\d+))/gi, '$2'); var S = text.split('\x0d\x07');
				for (var i=0;i<S.length;i+=8){
					/*hopso*/ S[i] = HSName(S[i]); /* hsso*/ S[i+1] = HSName(S[i+1]);
					if (S[i]=='error' || S[i+1]=='error'){ alert(" Lỗi : số hồ sơ hoặc hộp số không rõ ràng : '"+ structure_err +"' !" ); err_abc_xyz(); } /*alert for error raise an error to quit*/

					//-- reformat the time frame (f_date) a bit
					if(S[i+3]){ S[i+3]=Clean(S[i+3]).replace(/(\d)(\s+|\n+)(\d)/,'$1 - $3') }
				}

				var Current_HOPSO=0; var Current_HOPSO_Extra=''; var RS=RS_Obj("Select * from Product",Conn_Obj())
				var field_arr = ['hopso','hopso_extra','hsso','hsso_extra','tenhs','f_date','soto','nambq','ghichu','danhmucbq_id']
				var DMBQ = D.IMPORT_DMBQ_ID
				for (var i=0;i<S.length;i+=8){ if(S[i+1][0] != null){
					if (S[i][0] && S[i][0]!=Current_HOPSO){ Current_HOPSO = S[i][0] }
					if (S[i][1]!=Current_HOPSO_Extra){ Current_HOPSO_Extra = S[i][1] }
					var data_arr = [Current_HOPSO, Current_HOPSO_Extra, S[i+1][0], S[i+1][1], S[i+2], S[i+3], S[i+4], S[i+5], S[i+6], DMBQ]
					RS.AddNew();
					for (var j=0;j<field_arr.length;j++){
						RS.Fields(field_arr[j]) = data_arr[j]
					}
					RS.Update()
				}}
				RS.Close(); RS = null

				/***********************************************************************************************************************************************************/
				/***********************************************************************************************************************************************************/






				//-- hide importing bar & show success message
				$('#process_bar,#success_screen').toggle()
			}catch(e1){
				alert('Xảy ra lỗi trong quá trình nhập dữ liệu. Toàn bộ dữ liệu chưa được nhập vào. \n Có thể file word mà bạn chọn có cấu trúc không hợp lệ. Vui lòng kiểm tra lại.')
				alert('Chi tiết lỗi : '+ e1.description)
				$('#process_bar,#failed_screen').toggle(); return false;
			}
		}catch(e){
			alert('Máy tính của bạn chưa cài MS Word hoặc không có quyền Admin. \n Quá trình nhập mục lục không thành công và chưa ảnh hưởng tới hệ thống.')
			$('#process_bar,#failed_screen').toggle(); return false;
		}
		return false;
	}


</script>
