<!--#include file="Header.asp"-->




<%
//--------Car Name & car firm
	var S1 = new Control_Selectbox("Cat_ID",'integer','','',1)
	S1.DB = DB_to_Arr("Select ID,Menu_Txt from MENU Order by Menu_Order")
	S1.Intro_Text = '-- Chọn nhóm sản phẩm --'
	S1.Set_Err('All' , 'Vui lòng chọn nhóm sản phẩm')

	var A1 = new Control_Textbox('Name','','',255,1)
	A1.Set_Err( 2 , 'Vui lòng điền tên sản phẩm !')
	A1.Set_Err( 1 , 'Tên sản phẩm tối đa 255 ký tự !')

	var A4 = new Control_Textbox('Price','integer')
	A4.Set_Err('All','Vui lòng điền giá hợp lệ !')
%><script>
	$(function(){
		var x = parseInt($('#price_ID').val()); if (isNaN(x)){ $('#price_ID').val('0') };
	})
</script><%
	var A6 = new Control_Textarea('Intro','','',255,1)
	A6.Set_Err( 2 , 'Vui lòng điền giới thiệu sản phẩm !')
	A6.Set_Err( 1 , 'Giới thiệu sản phẩm tối đa 255 ký tự !')
	A6.Height = 60

	var B = new Control_Editor('Detail','','','',1)
	B.Set_Err("All",'Vui lòng điền thông tin chi tiết về sản phẩm')

//------NImage : Anh minh hoa
	var C = new Control_NImage('Image')




///////////////////////////////////////////////////////////////////////////////////////////////////
var Mode = VBRequest('Mode');
if (Mode && Mode.toLowerCase() != 'update'){Mode ='insert'; var ID = 1}
else{ var ID=VBRequest('ID');
	if (!isNaN(ID) && ID !=''){ID = parseInt(ID)}else{ ID = -1 }
}

	var P=new Control_Collection( Mode , Array( S1, A1, A4, A6, C, B ) );

	P.insert_done = 'Thêm sản phẩm thành công !';
	P.insert_failed = 'Có lỗi xảy ra khi thêm sản phẩm !';
	P.update_done = 'Cập nhật sản phẩm thành công !'
	P.update_failed = 'Có lỗi xảy ra khi cập nhật sản phẩm !'

	P.Width = 460
	P.SQL = 'Select * from PRODUCT where ID='+ID;
	P.Run();

	var Intro_Text = Array( '<b>Danh mục sản phẩm</b>',
							'<br><br><b> Tên sản phẩm </b>',
							'<br><br><b> Giá bán (đơn vị nghìn đồng) - giá 0đ sẽ không hiển thị </b>',
							'<br><br><b> Giới thiệu ngắn </b>',
					 		'<br><br><b> Ảnh minh họa </b> ',
							'<br><br><b> Chi tiết sản phẩm </b> ' )

	var Title = (P.Mode=='insert')?'THÊM DỰ ÁN MỚI':'CẬP NHẬT DỰ ÁN'%>

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