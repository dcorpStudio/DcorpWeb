<!--#include file="Header.asp"-->


<%
	var T = VBRequest('title')
	if (T){
		var A = DB_to_Arr1("Select ID,Intro_Text,Detail from [Intro] where title = '"+ String(T) +"' ")

		if (A){
			T = Clean(T)
			var Group_1 = ',homephone1,homephone2,yahoo1,yahoo2,email,'
			if ( Group_1.indexOf( ',' + T + ',' ) >= 0 ){
				var K = new Control_Textbox( 'Detail','', '', 255 , 1 )
				K.Set_Err(2, 'Bạn chưa điền nội dung')
				K.Set_Err(1, 'Nội dung không được quá 255 ký tự')
			}

			var Group_2 = ',home_banner,logo,'
			if ( Group_2.indexOf( ',' + T + ',' ) >= 0 ){
				var K = new Control_FileBox('Detail','' ,'','' , 4)
				K.Set_Err('All' , 'Bạn chưa chọn ảnh!')
			}

			var Group_3 = ',welcome_msg,'
			if ( Group_3.indexOf( ',' + T + ',' ) >= 0 ){
				var K = new Control_Textarea('Detail','' ,'', 1000 , 1)
				K.Height = 50
				K.Set_Err('All' , 'Nội dung không hợp lệ !(1-1000 ký tự) ')
			}

			if (!K){
				var K = new Control_Editor( 'Detail','', '', 500000 , 10 )
				K.Set_Err(2, 'Nội dung phải trên 10 kí tự')
				K.Set_Err(1, 'Nội dung không được vượt quá 500 nghìn kí tự' )
				K.Height = 350
			}

			var Q = new Control_Collection('update' , Array(K))
			Q.mode = 'update'
			Q.SQL = 'Select * from Intro where ID='+A[0]
			Q.update_done = 'Cập nhật thành công!'
			Q.Width = 480
			Q.Err_Format = '<font color=#ffcc00>xxx</font>'
			Q.Run();%>

			<div class="Main_Header" style="text-transform:uppercase;">
				<%=A[1]%>
			</div>

			<div style="padding:0px 20px 20px 20px;">
				<%=Admin_Status_Format(Q.status)%>
				<%=Q.Output( Array("") )%>
				<%Q=A=null%>
			</div>

		<%}
	}
%>


<!--#include file="Footer.asp"-->


