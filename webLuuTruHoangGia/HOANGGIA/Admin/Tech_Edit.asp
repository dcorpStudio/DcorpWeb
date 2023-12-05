<!--#include file="Header.asp"-->




<%
	var A = new Control_Textbox('title','','',255,1)
	A.Set_Err( 2 , 'Vui lòng điền tiêu đề bài viết !')
	A.Set_Err( 1 , 'Tiêu đề bài viết tối đa 255 ký tự !')

	var A1 = new Control_Textarea('intro','','',1000,1)
	A1.Set_Err( 2 , 'Vui lòng điền giới thiệu bài viết !')
	A1.Set_Err( 1 , 'Giới thiệu bài viết tối đa 1000 ký tự !')
	A1.Height = 80

//------NImage : Anh minh hoa
	var C = new Control_FileBox('URL','','','','')
	C.Type = 'document'

//-------Editor : Detail
	var B = new Control_Editor('Detail', '', '', '', 1)
	B.Set_Err(2,'Vui lòng điền chi tiết bài viết !')



///////////////////////////////////////////////////////////////////////////////////////////////////
var Mode = VBRequest('Mode');
if (Mode && Mode.toLowerCase() != 'update'){Mode ='insert'; var ID = 1}
else{ var ID=VBRequest('ID');
	if (!isNaN(ID) && ID !=''){ID = parseInt(ID)}else{ ID = -1 }
}

	var P=new Control_Collection( Mode , Array( A, A1, C,B ) );

	P.insert_done = 'Thêm bài viết thành công !';
	P.insert_failed = 'Có lỗi xảy ra khi thêm bài viết !';
	P.update_done = 'Cập nhật bài viết thành công !'
	P.update_failed = 'Có lỗi xảy ra khi cập nhật bài viết !'

	P.Err_Format = '<font color=#ffff00><b>xxx</b></font>'
	P.Width = 460
	P.SQL = 'Select * from Tech where ID='+ID;
	P.Run();

	var Intro_Text = Array( '<b>Tiêu đề bài viết</b>',
							'<br><br><b>Giới thiệu bài viết</b>',
					 		'<br><br><b>File tài liệu đính kèm:</b> ',
					 		'<br><br><b>Chi tiết bài viết :</b>' )

	var Title = (P.Mode=='insert')?'THÊM bài viết TRAO ĐỔI NGHIỆP VỤ':'CẬP NHẬT bài viết TRAO ĐỔI NGHIỆP VỤ'%>

	<div class="Main_Header" style="text-transform:uppercase;"> <%=Title%> </div>

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