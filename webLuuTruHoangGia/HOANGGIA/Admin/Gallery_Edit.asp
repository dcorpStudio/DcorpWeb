<!--#include file="Header.asp"-->




<%
	var A1 = new Control_Textbox('Title','','',255,1)
	A1.Set_Err( 2 , 'Vui lòng điền tiêu đề ảnh !')
	A1.Set_Err( 1 , 'Tiêu đề ảnh tối đa 255 ký tự !')

	var C = new Control_FileBox('Image','','','',1)
	C.Type='Image'
	C.Set_Err('All','Vui lòng nhập file ảnh')



///////////////////////////////////////////////////////////////////////////////////////////////////
var Mode = VBRequest('Mode');
if (Mode && Mode.toLowerCase() != 'update'){Mode ='insert'; var ID = 1}
else{ var ID=VBRequest('ID');
	if (!isNaN(ID) && ID !=''){ID = parseInt(ID)}else{ ID = -1 }
}

	var P=new Control_Collection( Mode , Array( A1, C ) );

	P.insert_done = 'Thêm ảnh thành công !';
	P.insert_failed = 'Có lỗi xảy ra khi thêm ảnh !';
	P.update_done = 'Cập nhật ảnh thành công !'
	P.update_failed = 'Có lỗi xảy ra khi cập nhật ảnh !'

	P.Width = 460
	P.SQL = 'Select * from Gallery where ID='+ID;
	P.Run();

	var Intro_Text = Array( '<b>Tiêu đề ảnh</b>',
							'<br><br><b> File ảnh </b>' )

	var Title = (P.Mode=='insert')?'THÊM ẢNH MỚI':'CẬP NHẬT ẢNH'%>

	<div class="Main_Header"> <%=Title%> </div>

	<div style="padding:0px 20px 20px 20px;" id="new_edit_form">
		<%=Admin_Status_Format(P.status)%>
		<%=P.Output( Intro_Text )%>
		<%P=null%>
	</div>


	<%P=S=C=B=null%>


<script>
	//--reposition the checkbox
	$(function(){
		$('#new_edit_form input:checkbox').css({ position:'relative', top:'5px', border:'none' })
	})
</script>


<!--#include file="Footer.asp"-->