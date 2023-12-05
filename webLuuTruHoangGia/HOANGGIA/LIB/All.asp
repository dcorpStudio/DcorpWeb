<%Response.Buffer=true;%>

<%	//----Cac thong so can thiet
	Session.CodePage = 65001
	Session.LCID = 2057
	Session.TimeOut = 60

	//---------------No_JS_File_In_Control : Avoiding server from sending anything (JS in Control) to client. Uses in Download Page
	var No_JS_File_In_Control = 0
%>

<!--#include file="HashEncode.asp"-->
<!--#include file="function.asp"-->
<!--#include file="MD5.asp"-->
<!--#include file="VBArray.asp"-->
<!--#include file="Data_Table.asp"-->
<!--#include file="Control_Class.asp"-->
<!--#include file="Paging_Obj.asp"-->
<!--#include file="Input_Control.asp"-->
<!--#include file="JavaScript.asp"-->
<!--#include file="MENU_CORE.asp"-->



