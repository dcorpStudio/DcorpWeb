<!--#include file="Header.asp"-->




<%
	var A = new Control_Textbox('Name','','',255,1)
	A.Set_Err( 2 , 'Vui lòng điền tên báo giá !')
	A.Set_Err( 1 , 'Tên báo giá tối đa 255 ký tự !')

//------NImage : Anh minh hoa
	var C = new Control_FileBox('URL','','','',5)
	C.Type='document'
	C.Set_Err("All", "Vui lòng chọn file báo giá !")


///////////////////////////////////////////////////////////////////////////////////////////////////
var Mode = VBRequest('Mode');
if (Mode && Mode.toLowerCase() != 'update'){Mode ='insert'; var ID = 1}
else{ var ID=VBRequest('ID');
	if (!isNaN(ID) && ID !=''){ID = parseInt(ID)}else{ ID = -1 }
}

	var P=new Control_Collection( Mode , Array( A, C ) );

	P.insert_done = 'Thêm file báo giá thành công !';
	P.insert_failed = 'Có lỗi xảy ra khi thêm file báo giá !';
	P.update_done = 'Cập nhật file báo giá thành công !'
	P.update_failed = 'Có lỗi xảy ra khi cập nhật file báo giá !'

	P.Err_Format = '<font color=#ffff00><b>xxx</b></font>'
	P.Width = 460
	P.SQL = 'Select * from DOWNLOAD where ID='+ID;
	P.Run();

	var Intro_Text = Array( '<br>Tên file báo giá',
							'<br><br>File báo giá' )

	var Title = (P.Mode=='insert')?'THÊM BÁO GIÁ MỚI':'CẬP NHẬT BÁO GIÁ'%>

	<div class="Main_Header">
		<%=Title%>
	</div>

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