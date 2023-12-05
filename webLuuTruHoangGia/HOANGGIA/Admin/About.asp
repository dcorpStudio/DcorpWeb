<!--#include file="Header.asp"-->



<%
	var E = (VBSession('Lang')=='E')?' E_Detail as ':''
	var Code =	'<hr><a href="Intro_Edit.asp?title=@title/" style="color:#900;"><b>@Intro_Text/ &nbsp;&nbsp; -- &nbsp;&nbsp; [SỬA]</b></a>'+
				'<br><br><center> <table style="border:1px dotted #336699;" width=90% ><tr><td>'+
				'@Detail/</td></tr></table></center><br><br><br>'
	var T = new Control_Tem(Code , '@', '' , '')
	T.Data = DB_to_Arr("Select ID,title, intro_Text, "+E+" Detail from Intro where title in ('About' , 'Short_About') order by title desc")
	T.Output()
%>





<!--#include file="Footer.asp"-->


