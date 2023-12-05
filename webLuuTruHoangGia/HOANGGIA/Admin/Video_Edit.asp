<!--#include file="Header.asp"-->




<%
	var A1 = new Control_Textbox('Title','','',255,1)
	A1.Set_Err( 2 , 'Vui lòng điền tên video !')
	A1.Set_Err( 1 , 'Tên video tối đa 255 ký tự !')

	var C = new Control_FileBox('Video','','','',1)
	C.Type='Media'
	C.Set_Err('All','Vui lòng nhập file video')



///////////////////////////////////////////////////////////////////////////////////////////////////
var Mode = VBRequest('Mode');
if (Mode && Mode.toLowerCase() != 'update'){Mode ='insert'; var ID = 1}
else{ var ID=VBRequest('ID');
	if (!isNaN(ID) && ID !=''){ID = parseInt(ID)}else{ ID = -1 }
}

	var P=new Control_Collection( Mode , Array( A1, C ) );

	P.insert_done = 'Thêm video thành công !';
	P.insert_failed = 'Có lỗi xảy ra khi thêm video !';
	P.update_done = 'Cập nhật video thành công !'
	P.update_failed = 'Có lỗi xảy ra khi cập nhật video !'

	P.Width = 460
	P.SQL = 'Select * from Video where ID='+ID;
	P.Run();

	var Intro_Text = Array( '<b>Tên video</b>',
							'<br><br><b> File video </b>' )

	var Title = (P.Mode=='insert')?'THÊM VIDEO MỚI':'CẬP NHẬT VIDEO'%>

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