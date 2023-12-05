<!--#include file="Header.asp"-->



<%
	var E = (VBSession('Lang')=='E')?' E_Detail as ':''
	var Code =	'<hr><a href="Intro_Edit.asp?title=@title/" style="color:#900;"><b>@Intro_Text/  &nbsp;&nbsp; -- &nbsp;&nbsp; [SỬA] </b></a>'+
				'<br><br><center> <table style="border:1px dotted #336699;" width=90% ><tr><td>'+
				'@Detail/</td></tr></table></center><br><br><br>'
	var T = new Control_Tem(Code , '@', '' , '')
	T.Data = DB_to_Arr("Select ID,title, intro_Text, "+E+" Detail from Intro where title in ('Full_Contact' , 'Short_Contact') ")
	T.Output()
%>


<!--- HOME SUPPORT -->
<hr />
<b>Tư vấn & trợ giúp</b><br /><br />

<div id="support_tbl">
		<table width=100% style="color:#fff">
			<tr><td align=right width="20">
					<img src="/HOANGGIA/Home_Files/Phone.jpg">
				</td>
				<td>
					<a href="Intro_Edit.asp?title=HomePhone1">
						<b> Phone : </b> &nbsp;
						<b> <%= DB_to_Val( "Select Detail from Intro where title='HomePhone1' " )%> </b>
					</a>
				</td>
			</tr>

			<tr><td align=right width="20">
					<img src="/HOANGGIA/Home_Files/Phone.jpg">
				</td>
				<td>
					<a href="Intro_Edit.asp?title=HomePhone2">
						<b> Phone : </b> &nbsp;
						<b> <%= DB_to_Val( "Select Detail from Intro where title='HomePhone2' " )%> </b>
					</a>
				</td>
			</tr>

			<tr><td align=right width="20">
					<img src="/HOANGGIA/Home_Files/Yahoo.jpg">
				</td>
				<td>
					<a href="Intro_Edit.asp?title=Yahoo1">
						<b> Yahoo : </b> &nbsp;
						<%var Yahoo_Nick = DB_to_Val( "Select Detail from Intro where title='Yahoo1' " )%>
						<b><%=Yahoo_Nick%></b>
					</a>
				</td>
			</tr>
			<tr><td align=right width="20">
					<img src="/HOANGGIA/Home_Files/Yahoo.jpg">
				</td>
				<td>
					<a href="Intro_Edit.asp?title=Yahoo2">
						<b> Yahoo : </b> &nbsp;
						<%var Yahoo_Nick = DB_to_Val( "Select Detail from Intro where title='Yahoo2' " )%>
						<b><%=Yahoo_Nick%></b>
					</a>
				</td>
			</tr>

			<tr><td align=right width="20">
					<img src="/HOANGGIA/Home_Files/Email.jpg">
				</td>
				<td>
					<a href="Intro_Edit.asp?title=email">
						<b> <%= DB_to_Val( "Select Detail from Intro where title='Email' " )%> </b>
					</a>
				</td>
			</tr>

		</table>
</div><br />





<!--#include file="Footer.asp"-->


