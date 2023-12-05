<!--#Include file="../inc.asp"-->

<%
if ( String(Session('Mem_Login'))!='1' && String(Session('Admin'))!='true'){
	Response.Redirect('../../index.asp')
}


if (String(Session('Mem_Login'))=='1' && Clean((new thisPage_URL).URL).indexOf('mem_insert_pic.asp')<0 ){
	Response.Redirect('Mem_Insert_Pic.asp?Type=Image&FName='+Request('FName'))
}

%>


