<!--#include file="CORE/x_inc.asp"-->
<%
	var u = RQ("u").fixQuote(); var p = RQ("p").fixQuote();
	var User_Info = DB_to_Arr1("Select my_user, my_pass, Last_Login, ID from [Admin] where my_user='" + u + "' ")
	if (!User_Info || User_Info[1]!=p){
		R("Failed")
	}else{
		Session("admin") = "true"
		Conn_Obj().execute("Delete from PRODUCT where Temporary=1")
		R("login_success,"+User_Info[3])
	}

%>


