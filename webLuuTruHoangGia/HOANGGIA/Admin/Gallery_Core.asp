<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
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
			<!--#include file="TEM/Gallery_Tem.asp"-->
			<%T.Data = DB;
			T.Data.pageSize(24); T.Data.getPage();

			%><!--#include file="TEM/Paging_Tem.asp"--><%
			P.thisPage = Request("page")
			P.lastPage= T.Data.lastPage()
	}
	var SQL;
%>




<%if (!No_Header){%><div class="Main_Header">
	Gallery &nbsp; (<%=DB?(DB.ubound(2)+1):'0'%> ảnh)
	&nbsp; |  &nbsp;
	<a href="Gallery_Edit.asp?mode=insert">Thêm ảnh </a>
</div><%}%>



	<table width=100% cellpadding=0 cellspacing=0 style="color:#fff">
		<tr><td width="33%"></td><td width="33%"></td><td width="33%"></td></tr>
		<%=T?T.Output():''%>
		<%if (!No_Err_Report){
			if (!T){ if (Clean(VBRequest('Search'))!=1){%>
				<tr><td colspan=3 style="padding-left:20; color:#000;">Hiện tại chưa có ảnh nào.<br><br></td></tr>
			<%}else{%>
				<tr><td colspan=3 style="padding-left:20; color:#000;">Không tìm thấy ảnh nào phù hợp.<br><br></td></tr>
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




<script>
	function update_prod(ID){	window.location = 'Gallery_Edit.asp?Mode=Update&ID='+ID	}
	function del_prod(ID){ if (confirm('Bạn muốn xóa ảnh ?')){ window.location = 'Del.asp?Table_name=Gallery&ID='+ID } }
</script>



<%var No_Status, No_Paging, No_Err_Report, No_Header%>