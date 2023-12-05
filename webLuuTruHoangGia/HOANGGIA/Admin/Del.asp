
<!--#include file="Inc.asp"-->

<%
	var Table_Name = VBRequest('Table_Name')
	var ID = VBRequest('ID')
	if (!isNaN(ID) && Table_Name){
		ID = parseInt(ID);Table_Name = Clean(Table_Name)
		Session('Del_Status') = DB_Delete(Table_Name,ID)
	}

var Page2Redirect = String(VBRequest('Page_After_Delete'))
if (Page2Redirect=='' || Page2Redirect=='undefined'){
	Page2Redirect = VBSession('Page_After_Delete')
}
Response.Redirect( Page2Redirect )
%>


