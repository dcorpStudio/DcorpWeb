<!--#include file="header.asp"-->


<%
//------NImage : Anh minh hoa
	var C = new Control_FileBox('Image','','','',5)
	C.Type='Image'
	C.Set_Err('All' , 'Bạn chưa chọn ảnh logo !')

//----Textbox Lien ket & Position
	var A = new Control_Textbox('Link', '' ,'' ,255 ,'')
	A.Set_Err(2 , 'Liên kết chỉ được phép dài tối đa 255 kí tự')
	A.Data = 'http://'

//----Textbox Lien ket & Position
	var A1 = new Control_Textbox('Intro', '' ,'' ,255 ,'')
	A1.Set_Err(2 , 'Tên đối tác đa 255 ký tự 1')

///////////////////////////////////////////////////////////////////////////////////////////////////
var Mode = VBRequest('Mode');
if (Mode && Mode.toLowerCase() != 'update'){Mode ='insert'; var ID = -1}
else{ var ID=VBRequest('ID');
	if (!isNaN(ID)){ID = parseInt(ID)}else{ ID = -1 }
}

	var P=new Control_Collection( Mode , Array(C, A, A1) );

	P.insert_done = 'Thêm logo đối tác thành công !';
	P.insert_failed = 'Có lỗi xảy ra khi thêm logo đối tác !';
	P.update_done = 'Cập nhật logo đối tác thành công !'
	P.update_failed = 'Có lỗi xảy ra khi cập nhật logo đối tác !'

	P.Width = 450
	P.SQL = 'Select * from Partner where ID='+ID;
	P.Run();

	var Intro_Text = Array( '<br>Ảnh logo đối tác' , '<br><br>Liên kết (Chú ý, phải có đủ &nbsp; http://)' , '<br><br>Tên đối tác' )

	//------Extra part : Display a JS alert & redirect to Ads Page
	if (P.status && P.status==P.insert_done){%>
		<script>
			alert('Thêm logo đối tác thành công')
			window.location='Partner.asp'
		</script>
	<%}%>

	<%var Title = (P.Mode=='insert')?'THÊM LOGO ĐỐI TÁC':'SỬA LOGO ĐỐI TÁC' %>

	<div class="admin_main_header">
		<%=Title%>
	</div>

	<div style="padding:0px 20px 20px 20px;">
		<%=Admin_Status_Format(P.status)%>
		<%=P.Output( Intro_Text )%>
		<%P=null%>
	</div>



<!--#include file="Footer.asp"-->
