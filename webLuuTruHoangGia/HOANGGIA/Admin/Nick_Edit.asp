<!--#include file="Header.asp"-->


<%

//----Selectbox : Nick Type (Yahoo or Skype)
var S1 = new Control_Selectbox('Nick_Type','','','',1)
S1.DB = Array( Array('Yahoo','Yahoo') , Array('Skype','Skype') )
S1.Intro_Text = '----------Chọn loại nick------------'

//----Textbox : Name
	var A1 = new Control_Textbox('Name', '' ,'',255,1)
	A1.Set_Err('All','Tên người tư vấn phải từ 1 đến 255 kí tự !')

//----Textbox : Nick
	var A2 = new Control_Textbox('Nick', '' ,'',255,1)
	A2.Set_Err('All','Nick Chat hoặc Skype phải từ 1 tới 255 kí tự !')


///////////////////////////////////////////////////////////////////////////////////////////////////
var Mode = VBRequest('Mode');
if (Mode && Mode.toLowerCase() != 'update'){Mode ='insert'; var ID = 1}
else{ var ID=VBRequest('ID');
	if (!isNaN(ID)){ID = parseInt(ID)}else{ ID = -1 }
}
	var P=new Control_Collection( Mode , Array( A1 , A2 ) );

	P.insert_done = 'Thêm nick thành công !';
	P.insert_failed = 'Có lỗi xảy ra khi thêm nick !';
	P.update_done = 'Cập nhật nick thành công !'
	P.update_failed = 'Có lỗi xảy ra khi cập nhật nick !'
	P.Err_Format = '<font color=#669900> <b> xxx </b> </font>'

	P.Width= 400
	P.SQL = 'Select * from Nick where ID='+ID;
	P.Run();

	var Intro_Text = Array( '<br>Tên - chức năng người tư vấn (VD: Bán hàng , Kinh doanh) ' , '<br><br> Nick  ' )
	var Title = (P.Mode=='insert')?'THÊM NICK HỖ TRỢ TRỰC TUYẾN':'SỬA NICK HỖ TRỢ TRỰC TUYẾN' %>

	<div class="admin_main_header">
		<%=Title%>
	</div>

	<div style="padding:0px 20px 20px 20px;">
		<%=Admin_Status_Format(P.status)%>
		<%=P.Output( Intro_Text )%>
		<%P=null%>
	</div>



<!--#include file="Footer.asp"-->


