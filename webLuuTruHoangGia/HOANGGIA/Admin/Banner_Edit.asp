<!--#include file="header.asp"-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">



<%
//------NImage : Anh minh hoa
	var C = new Control_FileBox('Image','','','',5)
	C.Type='Image'
	C.Set_Err('All' , 'Bạn chưa chọn ảnh banner !')


///////////////////////////////////////////////////////////////////////////////////////////////////
var Mode = VBRequest('Mode');
if (Mode && Mode.toLowerCase() != 'update'){Mode ='insert'; var ID = -1}
else{ var ID=VBRequest('ID');
	if (!isNaN(ID)){ID = parseInt(ID)}else{ ID = -1 }
}

	var P=new Control_Collection( Mode , Array(C) );

	P.insert_done = 'Thêm banner thành công ! ';
	P.insert_failed = 'Có lỗi xảy ra khi thêm banner !';
	P.update_done = 'Cập nhật banner thành công !'
	P.update_failed = 'Có lỗi xảy ra khi cập nhật banner !'

	P.Width = 300
	P.SQL = 'Select * from Banner where ID='+ID;
	P.Run();


	//------Extra part : Display a JS alert & redirect to Banner Page
	if (P.status && P.status==P.insert_done){%>
		<script>
			alert('Thêm banner thành công')
			window.location='Banner.asp'
		</script>	
	<%}%>

	<%var Title = (P.Mode=='insert')?'THÊM ẢNH BANNER':'CẬP NHẬT ẢNH BANNER' %>


	<div class="Main_Header">
		<%=Title%>
	</div>

	<div style="padding:0px 20px 20px 20px;">
		<%=Admin_Status_Format(P.status)%>
		<%=P.Output( ['Hình ảnh'] )%>
		<%P=null%>
	</div>


<!--#include file="Footer.asp"-->
