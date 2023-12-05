<!--#include file="Inc.asp"-->

<%
//----Kiem tra xem so bao gia ma thanh vien da Upload len co vuot qua quy dinh
if ( Clean(Request('Type')) == "document" ){
	if (Session('Price_Limit')=="true"){%>

		<font color=#aa0000>
			<b>Bạn chỉ được phép Upload tối đa <%=Session('Price_Limit_Num')%> file báo giá.<br>
			Vui lòng xóa bớt file hoặc sửa lại các file cũ</b>
		</font>
		<br><br>
		<p align=center> <b> <a href=# onclick="window.close()">X Close</a></b> </p>

	<%Response.End();
	}
}
%>


<%//--Truyen bien chua Image_Path & File_Path cho trang DoUp.asp dung` Sesssion
Session("App_Img_Path") = Global_Var("Img_Path")
Session("App_Upload_File_Path") = Global_Var("Upload_File_Path")
Session("FileBox_Path") = Global_Var("FileBox_Path")%>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<TITLE>Upload file ::::</TITLE>

<style>	.but {font-weight: bold; background-color: #FFFFFF; border:1px solid #336699;}</style>


<%
var XType = VBRequest("Type")
switch (Clean(XType)){
	case "image":
		JS_Condition = "(/(bmp|gif|jpg|png|tif)/gi).test(ext)";
		File_List = " bmp, jpg, gif, png, tif ";
		break;
	case "flash":
		JS_Condition = "ext=='swf'";
		File_List = " swf ";
		break;
	case "media":
		JS_Condition = "(/(avi|flv|wma|wmv|mp3|wav|mid)/gi).test(ext)";
		File_List = " avi , flv , wma , wmv , mp3 , wav, mid ";
		break;
	case "document":
		JS_Condition = "(/(doc|docx|xls|xlsx|txt|htm|html|rtf|rar|zip|7zip)/gi).test(ext)";
		File_List = " doc, docx, xls, xlsx, txt, htm, html, rtf, rar,zip,7zip "
		break;
	default:
		Response.Write("B&#7841;n kh&#244;ng n&#234;n s&#7917;a &#273;&#7893;i &#273;&#7883;a ch&#7881; c&#225;c trang web.");
		Response.End();
		break;
}%>



<div id="loading" style="width:100%;height:100%;position:absolute;top:0;left:0;background-color:#ffffff;display:none">
	<table width=100% height=100% border=0><tr><td align=center valign=middle>
		<img id="Loading_Img" src="<%=Global_Var("FileBox_Path")%>/Img/Loading.gif"><br>
		Đang tải file, vui lòng chờ...
	</td></tr></table>
</div>


<script language="javascript">
	function check(){	var P = document.getElementById('myFile');   var  m= P.value.toLowerCase();
		if (m.length<5){    alert(' Bạn chưa chọn file\n Click vào nút "Browse" để chọn file '); P.text='';  return false;	}
		else{ var ext = m.substring(m.indexOf('.')+1 , m.length).toLowerCase();
			if (  <%=JS_Condition%>  ){	
				document.getElementById("loading").style.display="inline";
				setTimeout('document.getElementById("Loading_Img").src="<%=Global_Var("FileBox_Path")%>/Img/loading.gif"', 200); 
				return true; }
			else {
				alert('Chỉ được phép chọn các file có đuôi : <%=File_List%> '); 
				return false;
			}
		}
	}
</script>


<%if (Session("Too_Big_File")== "true"){%>
	<font color="#aa0000">
		<b>
			Chỉ được phép upload những file có dung lượng dưới 1Mb <br><br>
		</b>
	</font>
	<%Session("Too_Big_File") =  ""
}%>


<form action="doup.asp?Type=<%=XType%>&FName=<%=Request("FName")%>" METHOD="POST" ENCTYPE="multipart/form-data" onSubmit="return check()">
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

<%if (Session("Admin")!=true){%>
	Lưu ý : Chỉ được phép tải các file có đuôi : <%=File_List%> <br>
<%}%>