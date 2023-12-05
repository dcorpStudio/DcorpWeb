<!--#include file="header.asp"-->


<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'Partner_Edit'
var Table_Name = 'Partner'
var Delete_Confirm = 'Bạn muốn xóa logo đối tác ?'
var Header_Text = 'QUẢN LÝ LOGO ĐỐI TÁC'
var Header_Link_Text = 'Thêm logo'
%>



<div class="admin_main_header">
	<%=Header_Text%> <a href="#add" onclick="add_prod()">[ - <%=Header_Link_Text%> - ]</a>
</div>


<table class="Ads_Tbl" cellpadding="0" cellspacing="0" width="100%">
	<%var DB = DB_to_Arr("Select * from Partner Order By ID DESC")
	if (DB){
		for (DB.i=0; DB.i<=DB.ubound(2); DB.i++){%>

				<tr class="Ads_row">
					<td width=220 align="center">
						<img src="<%=DB.RS('Image')%>" width="200" onclick="window.open('<%=DB.RS('Link')%>')" title="<%=DB.RS('Intro')%>" >
					</td>
					<td style="line-height:1.8;">
						<b>Đối tác</b> : <%=DB.RS('Intro')%><br />
						<b>Liên kết</b> : <a href="<%=DB.RS('Link')%>" class=white_link target="_blank"> <%=DB.RS('Link')%> </a>
					</td>
					<td width=100>
						<input type="button" value="Sửa" onclick="update_prod('<%=DB.RS('ID')%>')"> &nbsp; 
						<input type="button" value="Xóa" onclick="del_prod('<%=DB.RS('ID')%>')">
					</td>
				</tr>
		<%}
	}%>
</table>


<style>
	.Ads_Row td {border-bottom:1px solid #999; padding:15px 0px 15px 0px; background:#333;}
	.Ads_Row td img {cursor:pointer; border:1px solid #666; }
</style>


<script>
	function update_prod(ID){	window.location = '<%=Edit_Page%>.asp?Mode=Update&ID='+ID	}
	function del_prod(ID){ if (confirm('<%=Delete_Confirm%>')){ window.location = 'Del.asp?Table_name=<%=Table_Name%>&ID='+ID } }
	function add_prod(){	window.location = '<%=Edit_Page%>.asp?Mode=insert'	}
</script>

<b></b>
<!--#include file="footer.asp"-->