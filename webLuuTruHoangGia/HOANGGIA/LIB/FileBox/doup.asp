<%
'-------------Security
if LCase(Session("Mem_Login")) <> "1"  and LCase(Session("Admin")) <> "true" then
	Response.Redirect "../../Index.asp"
end if


Response.buffer=true
Server.ScriptTimeout=90
Session.CodePage=65001
Session.LCID=2057%>


<%

'---------------Neu ko phai la Admin, gioi han dung luong upload
Too_Big_File = false
if Session("Admin") <> "true" then
	File_Size = Request.Totalbytes
	if File_Size > 1024*1024 	then		'--------(1Mb Max)
		Too_Big_File = true
		Session("Too_Big_File") = "true"
		Response.Redirect "insert_pic.asp?Type=" & Request.QueryString("Type") & "&FName=" & Request.QueryString("FName")
		Response.End
	end if
end if



'-------Kiem tra xem so bao gia ma thanh vien da Upload len co vuot qua quy dinh
if   LCase(Request.QueryString("Type")) = "document" then
	if Session("Price_Limit")="true" then%>


		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<font color=#aa0000>
			<b>Bạn chỉ được phép Upload tối đa <%=Session("Price_Limit_Num")%> file báo giá.<br>
			Vui lòng xóa bớt file hoặc sửa lại các file cũ</b>
		</font>
		<br><br>
		<p align=center> <b> <a href=# onclick="window.close()">X Close</a></b> </p>

		<%Response.Flush
		Response.End
	end if
end if
%>


<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<TITLE>  :: Upload file :: </TITLE>
<!-- #include file="inc_upload.asp" -->

<%XType = Request.QueryString("Type")
FName = Request.QueryString("FName")
Select case LCase(XType)
	case "image"
		ext = ",bmp,jpg,gif,png,tif,"
		folder_info = Session("App_Img_Path")
	case "flash"
		ext = ",swf,"
		folder_info = Session("App_Upload_File_Path")
	case "media"
		ext = ",avi,flv,wma,wmv,mp3,wav,mid,"
		folder_info = Session("App_Upload_File_Path")
	case "document"
		ext = ",doc,docx,xls,xlsx,ppt,txt,htm,html,jpg,bmp,png,gif,tif,rtf,rar,zip,7zip,"
		folder_info = Session("App_Upload_File_Path")
	case else
		XType = ""
		Response.Write "B&#7841;n kh&#244;ng n&#234;n s&#7917;a &#273;&#7893;i &#273;&#7883;a ch&#7881; c&#225;c trang web."
		Response.End
end select


'----Invalid extenion list :
Invalid_ext = ",asp,asa,cgi,php,js,aspx,cmd,bat,dll,exe,msi,"



if XType <> "" and not Too_Big_File=true then
	Set Uploader = New FileUploader
	Uploader.Upload()
	strImagePath = Server.Mappath(folder_info)


	If Uploader.Files.Count > 0 Then
		For Each File In Uploader.Files.Items
			Original_FileName = Replace(file.FileName , "'" , "\'")
			xxx=lcase(right(file.filename, len(file.filename) - InstrRev(file.filename,".") ))
			if inStr(ext , "," & xxx & ",") > 0  then
				File.SaveToDisk strImagePath
				File_Path = folder_info & "/" & file.filename
				File_Path = Replace(File_Path , "'" , "\'")%>


					<%Select case LCase(XType)
						Case "image"


							'--------------Xu ly resize Image :%>
							<!--#include file="Resize_Image.asp"-->


								Upload thành công!<br>
								<script>
									var K = window.opener.document;
									K.getElementById('<%=FName%>_ID').value = '<%=File_Path%>'
									K.getElementById('<%=FName%>_File_Preview').src = '<%=File_Path%>'
									K.getElementById('<%=FName%>_FName_Td').innerHTML = "(<%=Original_FileName%>)";
									window.close()
								</script>

						<%Case "flash"%>
								Upload thành công!<br>
								<script>
									var K = window.opener.document;
									K.getElementById('<%=FName%>_ID').value = '<%=File_Path%>'
									K.getElementById('<%=FName%>_Flash_Div').innerHTML ='<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" width="115" height="107"><param name="movie" value="<%=File_Path%>">\n'+
																						' <embed src="<%=File_Path%>" type="application/x-shockwave-flash" width="115" height="107"></object>\n'
									K.getElementById('<%=FName%>_Download_But').innerHTML = "";
									K.getElementById('<%=FName%>_FName_Td').innerHTML = "(<%=Original_FileName%>)";
									window.close()
								</script>

						<%Case "media"%>
								Upload thành công!<br>
								<script>
									var K = window.opener.document;
									K.getElementById('<%=FName%>_ID').value = '<%=File_Path%>'
									K.getElementById('<%=FName%>_File_Preview').src = '<%=Session("FileBox_Path")%>/Img/Media.jpg'
									K.getElementById('<%=FName%>_Download_But').innerHTML = "";
									K.getElementById('<%=FName%>_FName_Td').innerHTML = "(<%=Original_FileName%>)";
									window.close()
								</script>

						<%Case "document"%>
								Upload thành công!<br>
								<script>
									var K = window.opener.document;
									// <%="kk" & FName & "/////"%>
									K.getElementById('<%=FName%>_ID').value = '<%=File_Path%>'
									K.getElementById('<%=FName%>_File_Preview').src = '<%=Session("FileBox_Path")%>/Img/Doc.jpg'
									K.getElementById('<%=FName%>_Download_But').innerHTML = "";
									K.getElementById('<%=FName%>_FName_Td').innerHTML = "(<%=Original_FileName%>)";
									window.close()
								</script>
					<%end select%>


			<%else%>
					<a href="insert_pic.asp?Type=<%=XType%>&Fname=<%=FName%>"><b>
					Chỉ cho phép upload những tập tin : <%=ext%> !!! </a>
		<%end if
		Next
	Else%>

		<hr>Không được phép chọn các file có tên tiếng Việt hoặc các kí tự không phải chữ và số.<br> Vui lòng đổi tên file , sau đó click vào <a href="insert_pic.asp?Type=<%=XType%>&FName=<%=FName%>">đây</a> để quay lại.

	<%End if
End if%>


<b></b>
<%if Too_Big_File=true then%>
	<hr>Dung lượng file chỉ được phép nhỏ hơn 1 MB !<br>
	Vui lòng click vào <a href="insert_pic.asp?Type=<%=XType%>&FName=<%=FName%>">đây</a> và chọn một file khác.
<%End if%>