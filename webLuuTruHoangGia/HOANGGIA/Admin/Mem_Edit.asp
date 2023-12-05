<!--#include file="Header.asp"-->

<%
//----After mem account created, send an email to inform the password to member
function Send_Notice_Mail(C){
	var e = C[0].Data		//---Get the email
	var title = 'Tai khoan dang nhap tai website Coma6.com.vn'
	var p = C[2].Data		//---Get the raw password from A0x
	var BODY = "B&#7841;n nh&#7853;n &#273;&#432;&#7907;c email n&#224;y t&#7915; ban qu&#7843;n tr&#7883; website Coma6.com.vn <hr /> <br /> \
				T&#224;i kho&#7843;n c&#7911;a b&#7841;n v&#7915;a &#273;&#432;&#7907;c t&#7841;o, \
				 b&#7841;n c&#243; th&#7875; &#273;&#259;ng nh&#7853;p v&#224;o website Coma6.com.vn v&#7899;i c&#225;c th&#244;ng tin sau:<br /><br /> \
				 <b>Email</b> &nbsp; &nbsp; &nbsp; : "+ e +"<br /> \
				 <b>M&#7853;t kh&#7849;u</b> &nbsp; : "+ p.C(0) +"<br /> <hr>\
				 Th&#244;ng tin chi ti&#7871;t vui l&#242;ng li&#234;n h&#7879; v&#7899;i ban qu&#7843;n tr&#7883; website." 
	Send_Mail( '', e , '' , title, BODY )
	//R(BODY); F();
	//Response.End()
}



//----Textbox : MEM_Name, Address, Phone, Website, Email
	var A0 = new Control_Textbox('User_pass', '' ,'','','')
	A0.Type="hidden"
	//----Check if Admin nRequest to change mem_pass
	var Pseudo_Pass = String(Request('Pseudo_Pass'))
	if (Pseudo_Pass!='' && Pseudo_Pass!='undefined'){
		eval( 'A0.Data_Func = function(x){ return HashEncode("'+ Pseudo_Pass +'") }' )
	}

	var A0x = new Control_Textbox('Pseudo_pass', '' ,'','','')
	A0x.Data = '';
	A0x.Data_Ignore = true;

	var A5 = new Control_Textbox('email','email','',255,5)
	A5.Set_Err(0,'Email không hợp lệ !')
	A5.Set_Err(1,'Email không được quá 255 kí tự !')
	A5.Set_Err(2,'')

	if ( Clean(Request('Mode'))=='insert' ){
		var Email_Server = function(x){ if (DB_to_Val("Select email from MEM where email='"+x+"' ")==x){return false}else{return x} }
		A5.Add_Condition(Email_Server , 'function(x){return x}', '<br>Email đã tồn tại trong hệ thống, vui lòng chọn một email khác.')
	}

	var A1 = new Control_Textbox('Mem_Name', '' ,'',255,1)
	A1.Set_Err('All','Vui lòng điền tên thành viên !')

	var A2 = new Control_Textbox('Address', '' ,'',255,'')
	A2.Set_Err('All','Địa chỉ không quá 255 kí tự !')

	var A3 = new Control_Textbox('Phone', '' ,'',255,'')
	A3.Set_Err('All','Điện thoại không quá 255 kí tự !')

//------NImage : Anh minh hoa
	var C = new Control_FileBox('Image','','','','')
	C.Type='Image'

	var B = new Control_Textarea('Intro', '', '', '', '')
	B.Height = 40

//-------Member ID
	var M = new Control_Textbox ('ID' , 'integer', '', '' , 0)
	M.Type = "hidden";
	M.Data_Ignore = true


///////////////////////////////////////////////////////////////////////////////////////////////////
var Mode = String(Request('Mode'));
if (Mode && Mode.toLowerCase() != 'update'){Mode ='insert'; var ID = 1}
else{ var ID=VBRequest('ID');
	if (!isNaN(ID) && ID !=''){ID = parseInt(ID)}else{ ID = -1 }
}

	var P=new Control_Collection( Mode , Array( A5, A0, A0x, A1, A2, A3 , B) );

	P.insert_done = 'Thêm thành viên thành công !';
	P.insert_failed = 'Có lỗi xảy ra khi thêm thành viên !';
	P.update_done = 'Cập nhật thông tin thành công !'
	P.update_failed = 'Có lỗi xảy ra khi cập nhật thông tin !'

	P.Err_Format = '<font color=#ffff00><b>xxx</b></font>'
	P.Width = 460
	P.SQL = 'Select * from MEM where ID='+ID;
	P.Insert_Success_Func = Send_Notice_Mail
	P.Run();

	var Pass_Edit_Note = ''
	if (P.Mode=="update"){ Pass_Edit_Note = "<br> <i style=\"font-size:11px;\">(để trống để giữ nguyên mật khẩu cũ - hoặc điền một mật khẩu mới để ghi đè lên mật khẩu cũ)</i> " }

	var Intro_Text = Array( '<br>Email thành viên (dùng để đăng nhập)',
							'',
							'<br><br><b style="color:#ff9900"> Mật khẩu </b>' + Pass_Edit_Note,
							'<br><br>Tên thành viên',
					 		'<br><br>Địa chỉ',
					 		'<br><br>Điện thoại',
					 		'<br><br>Thông tin thêm' )

	var Title = (P.Mode=='insert')?'Thêm thành viên':'Sửa thông tin thành viên' %>

	<div class="admin_main_header" style="text-transform:uppercase">
		<%=Title%>
	</div>

	<div style="padding:0px 20px 20px 20px;">
		<%=Admin_Status_Format(P.status)%>
		<%=P.Output( Intro_Text )%>
		<%P=null%>
	</div>

	<%P=S0=S1=A1=A2=A3=A4=C=B=M=N=null%>




<!--#include file="Footer.asp"-->


