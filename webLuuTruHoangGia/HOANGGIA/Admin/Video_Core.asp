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
			<!--#include file="TEM/Video_Tem.asp"-->
			<%T.Data = DB;
			T.Data.pageSize(12); T.Data.getPage();

			%><!--#include file="TEM/Paging_Tem.asp"--><%
			P.thisPage = Request("page")
			P.lastPage= T.Data.lastPage()
	}
	var SQL;
%>




<%if (!No_Header){%><div class="Main_Header">
	Video &nbsp; (<%=DB?(DB.ubound(2)+1):'0'%> video)
		&nbsp; |  &nbsp;
	<a href="video_Edit.asp?mode=insert">Thêm video </a>
</div><%}%>



	<table width=100% cellpadding=0 cellspacing=0 style="color:#fff">
		<tr><td width="33%"></td><td width="33%"></td><td width="33%"></td></tr>
		<%=T?T.Output():''%>
		<%if (!No_Err_Report){
			if (!T){ if (Clean(VBRequest('Search'))!=1){%>
				<tr><td colspan=3 style="padding-left:20; color:#000;">Hiện tại chưa có video nào.<br><br></td></tr>
			<%}else{%>
				<tr><td colspan=3 style="padding-left:20; color:#000;">Không tìm thấy video nào phù hợp.<br><br></td></tr>
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
	function update_prod(ID){	window.location = 'Video_Edit.asp?Mode=Update&ID='+ID	}
	function del_prod(ID){ if (confirm('Bạn muốn xóa video ?')){ window.location = 'Del.asp?Table_name=Video&ID='+ID } }
</script>



<%var No_Status, No_Paging, No_Err_Report, No_Header%>