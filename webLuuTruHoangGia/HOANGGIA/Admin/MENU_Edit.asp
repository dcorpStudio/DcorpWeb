<!--#include file="Header.asp"-->

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">


<%
	var X= new Menu_Editor;
	X.Table_Name = 'Menu'

	var E = (VBSession('Lang')=='E')?'E_':''

	X.Field_Name = 'ID, Root_Item, '+E+'Menu_Txt,Link, Menu_Order'
	X.DB = DB_to_Arr('Select ID, Root_Item, '+E+'Menu_Txt,Link, Menu_Order from Menu order by Menu_Order ')
	X.Limit = 1
	X.Run();

	var A = X.Output()
	R('<table width=100% ><tr><td width=100% >\n' + A + '\n</td></tr></table>');

%>

<b></b>
<!--#include file="Footer.asp"-->


