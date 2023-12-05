<%Response.buffer=true
Server.ScriptTimeout=90
Session.CodePage=65001
Session.LCID=2057%>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<TITLE>  :: Upload file :: </TITLE>
<!-- #include file="inc_upload.asp" -->

<%	ext = ",bmp,jpg,gif,png,tif,"
	folder_info = Global_Var("Img_Path")
	Name = Request("Name")

	Set Uploader = New FileUploader
	Uploader.Upload()
	strImagePath = Server.Mappath(folder_info)

	If Uploader.Files.Count > 0 Then
		For Each File In Uploader.Files.Items
			Original_FileName = Replace(file.FileName , "'" , "\'")
			xxx=lcase(right(file.filename, len(file.filename) - InstrRev(file.filename,".") ))
			if inStr(ext , "," & xxx & ",") > 0 then
				File.SaveToDisk strImagePath
				File_Path = folder_info & "/" & file.filename
				File_Path = Replace(File_Path , "'" , "\'")%>

						Upload thành công!<br>
						<script>
							var K = window.opener.document;
							K.getElementById('<%=Name%>_PColor_Image').src = '<%=File_Path%>'
							K.getElementById('<%=Name%>_PColor_Selected').getElementsByTagName('input')[0].value = '<%=File_Path%>'
							window.close()
						</script>

			<%else%>
					<a href="insert_pic.asp?Name=<%=Name%>"><b>
					Chỉ cho phép upload nhửng tập tin : <%=ext%> !!! </a>
		<%end if
		Next
	Else%>

		<hr>Không được phép chọn các file có tên tiếng Việt. Click vào <a href="insert_pic.asp?Name=<%=Name%>">đây</a> để quay lại.

	<%End if%>