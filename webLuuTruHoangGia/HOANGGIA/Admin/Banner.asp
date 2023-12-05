<!--#include file="header.asp"-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">



<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'Banner_Edit'
var Table_Name = 'Banner'
var Delete_Confirm = 'Bạn muốn xóa banner này?'
var Header_Text = 'QUẢN LÝ ẢNH BANNER'
var Header_Link_Text = 'Thêm banner'
%>


<div class="Main_Header">
	<%=Header_Text%>
		&nbsp; |  &nbsp;
	<a href="Banner_Edit.asp?mode=insert">Thêm ảnh banner </a>
</div>


	<table cellpadding=0 cellspacing=0 width=100%>
		<tr><td width=100%>
			<table class="Banner_Tbl" width=100% cellpadding="0" cellspacing="0">
				<%var DB = DB_to_Arr("Select * from Banner Order By ID DESC")
				if (DB){
					for (DB.i=0; DB.i<=DB.ubound(2); DB.i++){
						var file_path = DB.RS('Image')
						var l = file_path.length
						var ext = file_path.substr(l-3,3)
						if (ext.toLowerCase() == 'swf'){
							var Type="_Flash"
						}else{ var Type="" }%>
							<tr class="Banner_row">
								<td style="padding:10" width=220>
									<%=Image_or_Flash(DB.RS('Image') , 200)%>
								</td>
								<td width=100>
									<input type="button" value="Sửa" onclick="update_prod('<%=DB.RS('ID')%>','<%=Type%>')"> &nbsp; 
									<input type="button" value="Xóa" onclick="del_prod('<%=DB.RS('ID')%>')">
								</td>
							</tr>
					<%}
				}%>

			</table>
			<hr><br><br>
		</td></tr>
	</table>




<style>
	.Banner_tbl {  }
	.Banner_Row td {padding:10px 0px 0px 0px; border-bottom:1px solid #999; background:#eee;}
</style>

<script>
	function update_prod(ID,Type){	window.location = 'Banner_Edit'+Type+'.asp?Mode=Update&ID='+ID	}
	function del_prod(ID){ if (confirm('Bạn muốn xóa ảnh banner ?')){ window.location = 'Del.asp?Table_name=Banner&ID='+ID } }
	function add_prod(Pos){	window.location = 'Banner_Edit.asp?Mode=insert&Pos='+Pos	}
</script>

<b></b>
<!--#include file="footer.asp"-->