<!--#include file="Inc.asp"-->

<%
var ID = parseInt(Request("ID"))
if (!isNaN(ID)&&ID>0){
	Session('Mem_Login') = '1';
	Session('Mem_ID') = ID;
	Session('Mem_Name') = DB_to_Val("Select Mem_Name from MEM where ID=" + ID);
	Response.Redirect("../MEM.asp")
}else{%>
	<script>
		window.close();
	</script>
<%}%>