﻿<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style>
	.Menu_String {color:#880000;font-weight:bold};
	.Prod_Detail_Name {color:#FFCC00; font-size:13}
</style>


<%
	//-----Cach su dung : chi can` dinh nghia bien' SQL , sau do' include file nay` de hien thi cac du lieu theo cau SQL do'

	var key = VBRequest('key');
	//------------------------Hien thi Data
	var T=null, P=null; 
	var DB = DB_to_Arr(SQL)
	if (DB){%>
			<!--#include file="TEM/Prod_Tem.asp"-->
			<%T.Data = DB;
			T.Data.pageSize(24); T.Data.getPage();

			%><!--#include file="TEM/Paging_Tem.asp"--><%
			P.thisPage = Request("page")
			P.lastPage= T.Data.lastPage()
	}
	var SQL;
%>




<%if (!No_Header){%><div class="Main_Header">
	<%var Cat = parseInt(Request('Cat'));
	if (!isNaN(Cat)){%>	<a href="Product.asp?Cat=<%=Cat%>"><b><%=DB_to_Val("Select Menu_Txt from MENU where ID = " + Cat)%></b></a> <%}%>
	&nbsp; (<%=DB?(DB.ubound(2)+1):'0'%> sản phẩm)
</div><%}%>



	<table width=100% cellpadding=0 cellspacing=0 style="color:#fff">
		<tr><td width="33%"></td><td width="33%"></td><td width="33%"></td></tr>
		<%=T?T.Output():''%>
		<%if (!No_Err_Report){
			if (!T){ if (Clean(VBRequest('Search'))!=1){%>
				<tr><td colspan=3 style="padding-left:20; color:#000;">Hiện tại chưa có sản phẩm nào trong danh mục.<br><br></td></tr>
			<%}else{%>
				<tr><td colspan=3 style="padding-left:20; color:#000;">Không tìm thấy sản phẩm nào phù hợp.<br><br></td></tr>
			<%}}
		}%>
	</table>



	<%if (!No_Paging){%>
			<!--Paging-->
			<div class="admin_paging">
				<b style="color:#000000">Trang : </b> <%=T?P.Output():''%>
			</div>
			<!--Paging-->
	<%}%>



<%var No_Status, No_Paging, No_Err_Report, No_Header%>


