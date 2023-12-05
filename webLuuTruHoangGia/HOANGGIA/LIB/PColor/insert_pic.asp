<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<TITLE>Upload file ::::</TITLE>

<style>	.but {font-weight: bold; background-color: #FFFFFF; border:1px solid #336699;}</style>

<%	JS_Condition = "(/(bmp|gif|jpg|png|tif)/gi).test(ext)"
	File_list = " bmp, jpg, gif, png, tif " %>

<div id="loading" style="width:100%;height:100%;position:absolute;top:0;left:0;background-color:#ffffff;display:none">
	<table width=100% height=100% border=0><tr><td align=center valign=middle>
		<img id="Loading_Img" src="<%=Global_Var("NImage_Path")%>/NImage_Editor/Loading.gif"><br>
		Đang tải file, vui lòng chờ...
	</td></tr></table>
</div>


<script language="javascript">
	function check(){	var P = document.getElementById('myFile');   var  m= P.value.toLowerCase();
		if (m.length<5){    alert(' Bạn chưa chọn file\n Click vào nút "Browse" để chọn file '); P.text='';  return false;	}
		else{ var ext = m.substring(m.indexOf('.')+1 , m.length).toLowerCase();
			if (  <%=JS_Condition%>  ){	
				document.getElementById("loading").style.display="inline";
				setTimeout('document.getElementById("Loading_Img").src="<%=Global_Var("NImage_Path")%>/NImage_Editor/loading.gif"', 200); 
				return true; }
			else {	<%if LCase(XType)<>"document" then%> alert('Chỉ được phép chọn các file có đuôi : <%=File_List%> '); 
					<%else%> alert('Không được phép chọn các file có đuôi :  asp , php , cgi , aspx , asa , js , cmd, bat, dll , exe, msi...'); <%end if%>
					return false;	}
		}	}
</script>

<form action="doup.asp?Name=<%=Request("Name")%>" METHOD="POST" ENCTYPE="multipart/form-data" onSubmit="return check()">
	<table align=center>
		<tr><td colspan=2 class=intro>
			<b>&nbsp; <font size="4" color="#008080">&nbsp; </font></b>
			<font size="4" color="#008080"><b>Tải file lên website</b> </font></td></tr>
		<tr><td colspan=2><hr></td></tr>
		<tr><td ><b>Chọn file :&nbsp;&nbsp; </b> &nbsp;</td>
			<td><input type=file id='myFile' name=file1></td>
		</tr><tr><td colspan=2>	<hr></td></tr>
		<tr><td colspan=2 align=center>
			<input type=submit value="Tải file" class="but">&nbsp;&nbsp;
			<input type="button"  onclick="window.close()"  value="Cancel" class="but" ></td>
		</tr>
	</table>
</form>
