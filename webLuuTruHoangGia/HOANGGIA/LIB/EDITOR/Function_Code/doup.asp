<%Response.buffer=true
Server.ScriptTimeout=90
Session.CodePage=65001
Session.LCID=2057


folder_info = Session("App_Img_Path")
ext = ",bmp,gif,jpg,png,tif,"
%>
<TITLE>  :: Upload file :: </TITLE>
<!-- #include file="inc_upload.asp" -->

<%Set Uploader = New FileUploader
Uploader.Upload()
strImagePath = Server.Mappath(folder_info)

If Uploader.Files.Count > 0 Then
	For Each File In Uploader.Files.Items
		xxx=lcase(right(file.filename,3))
		if ( inStr(ext , ","&xxx&",") > 0 )  then
			File.SaveToDisk strImagePath
			File_Path = folder_info & "/" & file.filename%>

				Upload th&#224;nh c&#244;ng!<br>
				Vui lòng ch&#7901; trong giây lát &#273;&#7875; t&#7843;i hình &#7843;nh<br>
				<img src="<%=File_Path%>" id="Original_Img" style="display:none">

				<body onload="Set_Img()">
				<script>
					function Set_Img(){
						var P = document.getElementById('Original_Img'); P.style.display = "inline";
						var K = window.opener.document;	var S = K.getElementById('Editor_Img_Src');
						S.value = '<%=File_Path%>';  S.style.width = P.offsetWidth;  S.style.height = P.offsetHeight;
						var T = K.getElementById('Editor_Img_Preview');	T.src = P.src;

						var w=P.offsetWidth; var h = P.offsetHeight;  var lim  = 130;  // Chieu` rong co' ding cua Preview Cell
						var W=w/lim; var H = h/lim;	if (W>1 || H>1){	if (W>H){w=lim ;h/=W}else{h=lim; w/=H}	}
						T.width = w; T.height = h;	window.close();	}
				</script>

		<%else%>
				<a href="insert_pic.asp?Mode=<%=Request.QueryString("Mode")%>"><b>
				Ch&#7881; cho phép upload nh&#7917;ng t&#7853;p tin : <%=ext%> !!! </a>
	<%end if
	Next
Else%>

	<hr>B&#7841;n ch&#432;a ch&#7885;n file. Click vào <a href="insert_pic.asp?Mode=<%=Request.QueryString("Mode")%>">&#273;ây</a>
	&#273;&#7875; quay l&#7841;i.

<%End if%>