<style>
	a {text-decoration:none}
	.paging {font:12px tahoma; color:000; font-weight:bold;}
	.Paging:hover {font:12px tahoma; color:#000;font-weight:bold;}
	.Paging_Focus {font:12px tahoma; color:#900;font-weight:bold; text-decoration:underline}
</style>


<%
var P = new Paging_Obj()
P.Normal_Format = '<span class="page_box"> &nbsp;<a href="$link/" class="Paging">$i/</a>&nbsp;</span> \n  '
P.Focus_Format = '<span class="page_box"> &nbsp;<a href="$link/" class="Paging_Focus">$i/</a>&nbsp;</span> \n  '

P.FirstPage_Format = '<span class="page_box">&nbsp;<a href="$link/" class="Paging"> &#171; </a>&nbsp;</span> \n &nbsp;'
P.LastPage_Format = '<span class="page_box">&nbsp;<a href="$link/" class="Paging"> &#187; </a>&nbsp;</span> \n &nbsp;'

P.PrevPage = '' // '<span class="paging">&nbsp;<a href="$link/" class="Paging"> &#171; </a>&nbsp;</span> \n &nbsp;'
P.NextPage = ''	//	'<span class="paging">&nbsp;<a href="$link/" class="Paging"> <img src="Home_Files/Next_Page.jpg" border=0> </a>&nbsp;</span> \n &nbsp;'

P.FirstPage_Format= ''//'<span class="page_box" style="background-color:#c0c0c0">&nbsp;<a href="$link/" class="Paging"> << </a>&nbsp;</span> \n &nbsp;'
P.LastPage_Format= ''//'<span class="page_box" style="background-color:#c0c0c0">&nbsp;<a href="$link/" class="Paging"> >> </a>&nbsp;</span> \n &nbsp;'

P.Sep = '<font color=#cccccc> ... </font>'

P.Before_Focus=2
P.After_Focus=2

P.thisPage = Request("page");
%>


