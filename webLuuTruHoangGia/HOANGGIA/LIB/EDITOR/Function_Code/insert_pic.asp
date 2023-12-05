<!--#include file="Inc.asp"-->
<%//--Truyen bien chua Image_Path cho trang DoUp.asp dung` Sesssion
Session("App_Img_Path") = Global_Var("Img_Path")%>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<TITLE>Upload file ::::</TITLE>

<style>	.but {font-weight: bold; background-color: #FFFFFF; border:1px solid #336699;}</style>

<script language="javascript">
	function check(){	var P = document.getElementById('myFile');   var  m= P.value.toLowerCase();
		if (m.length<5){    alert(' Bạn chưa chọn file\n Click vào nút "Browse" để chọn file '); P.text='';  ; return false;	}
		else{ var ext = m.substring(m.indexOf('.')+1 , m.length).toLowerCase();
			if ( (/(bmp)|(gif)|(jpg)|(png)|(tif)/gi).test(ext) > 0  ){
				document.getElementById("loading").style.display="inline";
				setTimeout('document.getElementById("Loading_Img").src="<%=Global_Var("Editor_Img_Path")%>/Editor_Pro_Img/loading.gif"', 200); 
				return true;
			}
			else {	alert('Chỉ được phép chọn các file ảnh : .bmp , .jpg , .gif, .png, .tif '); return false;	}
		}	}
</script>


<div id="loading" style="width:100%;height:100%;position:absolute;top:0;left:0;background-color:#ffffff;display:none">
	<table width=100% height=100% border=0><tr><td align=center valign=middle>
		<img id="Loading_Img" src="<%=Global_Var("Editor_Path")%>/Editor_Pro_Img/Loading.gif"><br>
		Đang tải file, vui lòng chờ...
	</td></tr></table>
</div>

<form action="doup.asp" METHOD="POST" ENCTYPE="multipart/form-data" onSubmit="return check()">
	<table align=center>
		<tr><td colspan=2 class=intro>
			<b>&nbsp; <font size="4" color="#008080">&nbsp; </font></b>
			<font size="4" color="#008080"><b>Upload file</b> </font></td></tr>
		<tr><td colspan=2><hr></td></tr>
		<tr><td ><b>Chọn file :&nbsp;&nbsp; </b> &nbsp;</td>
			<td><input type=file id='myFile' name=file1></td>
		</tr><tr><td colspan=2>	<hr></td></tr>
		<tr><td colspan=2 align=center>
			<input type=submit value="Thêm ảnh" class="but">&nbsp;&nbsp;
			<input type="button"  onclick="window.close()"  value="Cancel" class="but" ></td>
		</tr>
	</table>
</form>
