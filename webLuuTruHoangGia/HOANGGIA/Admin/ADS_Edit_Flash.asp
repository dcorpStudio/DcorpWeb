<!--#include file="header.asp"-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">



<%
//------NImage : Anh minh hoa
	var C = new Control_FileBox('Image','','','',5)
	C.Type='Flash'
	C.Set_Err('All' , 'Bạn chưa chọn file Flash(.swf) quảng cáo !')

//----Textbox Lien ket & Position
	var A = new Control_Textbox('Link', '' ,'' ,255 ,'')
	A.Set_Err(2 , 'Liên kết chỉ được phép dài tối đa 255 kí tự')
	A.Data = 'http://'

	var A2 = new Control_Textbox('Width', 'integer' ,'' , '' ,'')
	A2.Set_Err('All' , 'Chiều rộng không hợp lệ')
	A2.Attach_Func = "function(){var A = Number(Get('width_ID').value); Get('width_ID').value = isNaN(A)?0:A }"

	var A3 = new Control_Textbox('Height', 'integer' ,'' , '' ,'')
	A3.Set_Err('All' , 'Chiều cao không hợp lệ')
	A3.Attach_Func = "function(){var A = Number(Get('height_ID').value); Get('height_ID').value = isNaN(A)?0:A }"

	var A1 = new Control_Textbox('Pos', '' ,'' , 255 ,'')
	A1.Data = VBRequest('Pos')
	A1.Type = 'hidden'


///////////////////////////////////////////////////////////////////////////////////////////////////
var Mode = VBRequest('Mode');
if (Mode && Mode.toLowerCase() != 'update'){Mode ='insert'; var ID = -1}
else{ var ID=VBRequest('ID');
	if (!isNaN(ID)){ID = parseInt(ID)}else{ ID = -1 }
}

	var P=new Control_Collection( Mode , Array(C, A, A1, A2, A3) );

	P.insert_done = 'Thêm quảng cáo thành công !';
	P.insert_failed = 'Có lỗi xảy ra khi thêm quảng cáo !';
	P.update_done = 'Cập nhật quảng cáo thành công !'
	P.update_failed = 'Có lỗi xảy ra khi cập nhật quảng cáo !'

	P.Width = 300
	P.SQL = 'Select * from Ads where ID='+ID;
	P.Run();

	//---Lay vi tri cua quang cao
	var Pos = DB_to_Val('Select Pos from Ads where ID='+ID) || VBRequest('Pos')
	var Intro_Text = Array( '<br>Flash quảng cáo vị trí <b>'+Pos+'</b>' ,
							'<br><br>Liên kết (Chú ý, phải có đủ &nbsp; http://)' ,
							'',
							'<br>Chiều rộng của flash  (px) (không bắt buộc)',
							'<br><br>Chiều cao của flash (px) (không bắt buộc)' )

	//------Extra part : Display a JS alert & redirect to Ads Page
	if (P.status && P.status==P.insert_done){%>
		<script>
			alert('Thêm quảng cáo thành công')
			window.location='Ads.asp'
		</script>
	<%}%>

	<%var toImage_Ads = ' &nbsp; &nbsp;<a href="Ads_Edit.asp?mode='+P.Mode+'&ID='+ID+'&Pos='+Pos+'" '+
						' class="black_link" style="font-size:11px"> [ - Đổi sang ảnh - ] </a>'
	var Title = (P.Mode=='insert')?'THÊM QUẢNG CÁO':'CẬP NHẬT QUẢNG CÁO'%>


	<div class="Main_Header">
		<%=Title%> <%=toImage_Ads%>
	</div>

	<div style="padding:0px 20px 20px 30px;">
		<%=Admin_Status_Format(P.status)%>
		<%=P.Output( Intro_Text )%>
		<%P=null%>
	</div>



<!--#include file="Footer.asp"-->
