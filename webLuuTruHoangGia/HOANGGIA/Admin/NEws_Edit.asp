<!--#include file="Header.asp"-->




<%
	var A = new Control_Textbox('title','','',255,1)
	A.Set_Err( 2 , 'Vui lòng điền tiêu đề tin !')
	A.Set_Err( 1 , 'Tiêu đề tin tối đa 255 ký tự !')

	var A1 = new Control_Textarea('intro','','',1000,1)
	A1.Set_Err( 2 , 'Vui lòng điền giới thiệu tin !')
	A1.Set_Err( 1 , 'Giới thiệu tin tối đa 1000 ký tự !')
	A1.Height = 80

//------NImage : Anh minh hoa
	var C = new Control_FileBox('Image','','','','')

//-------Editor : Detail
	var B = new Control_Editor('Detail', '', '', '', 1)
	B.Set_Err(2,'Vui lòng điền chi tiết tin !')



///////////////////////////////////////////////////////////////////////////////////////////////////
var Mode = VBRequest('Mode');
if (Mode && Mode.toLowerCase() != 'update'){Mode ='insert'; var ID = 1}
else{ var ID=VBRequest('ID');
	if (!isNaN(ID) && ID !=''){ID = parseInt(ID)}else{ ID = -1 }
}

	var P=new Control_Collection( Mode , Array( A, A1, C,B ) );

	P.insert_done = 'Thêm tin thành công !';
	P.insert_failed = 'Có lỗi xảy ra khi thêm tin !';
	P.update_done = 'Cập nhật tin thành công !'
	P.update_failed = 'Có lỗi xảy ra khi cập nhật tin !'

	P.Err_Format = '<font color=#ffff00><b>xxx</b></font>'
	P.Width = 460
	P.SQL = 'Select * from NEWS where ID='+ID;
	P.Run();

	var Intro_Text = Array( '<b>Tiêu đề tin</b>',
							'<br><br><b>Giới thiệu tin</b>',
					 		'<br><br><b>Hình ảnh minh họa:</b> ',
					 		'<br><br><b>Chi tiết tin :</b>' )

	var Title = (P.Mode=='insert')?'THÊM TIN MỚI':'CẬP NHẬT TIN'%>

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