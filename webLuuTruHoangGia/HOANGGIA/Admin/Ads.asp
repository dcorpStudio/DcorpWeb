<!--#include file="header.asp"-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">



<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'Ads_Edit'
var Table_Name = 'Ads'
var Delete_Confirm = 'Bạn muốn xóa quảng cáo này?'
var Header_Text = 'QUẢN LÝ QUẢNG CÁO'
var Header_Link_Text = 'Thêm quảng cáo'
%>


<div class="Main_Header">
	<%=Header_Text%>
</div>


<%var Pos_Arr = Array( 'right' )
for (var i=0;i<Pos_Arr.length;i++){%>
	<table cellpadding=0 cellspacing=0 width=100%>
		<tr><td style="padding-bottom:10px; padding-left:10px; color:#000;">
			<b>Vị trí</b> : <b style="color:#000;"><%=Pos_Arr[i]%></b> &nbsp; | &nbsp;
			<a href="#add" onclick="add_prod('<%=Pos_Arr[i]%>')" class="black_link"> Thêm quảng cáo ở vị trí này ++ </a>
		</td></tr>
		<tr><td width=100%>
			<table class="Ads_Tbl" width=100% cellpadding="0" cellspacing="0">

				<%var DB = DB_to_Arr("Select * from ADS where Pos = '"+Pos_Arr[i]+"' Order By ID DESC")
				if (DB){
					for (DB.i=0; DB.i<=DB.ubound(2); DB.i++){
						var file_path = DB.RS('Image')
						var l = file_path.length
						var ext = file_path.substr(l-3,3)
						if (ext.toLowerCase() == 'swf'){
							var Type="_Flash"
						}else{ var Type="" }%>
							<tr class="Ads_row">
								<td style="padding:10" width=220>
									<%=Image_or_Flash(DB.RS('Image') , 200)%>
								</td>
								<td style="color:#000;"> Liên kết : <br>
									<a href="<%=DB.RS('Link')%>" style="color:#900;">
									<%=DB.RS('Link')%></a>
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
<%}%>



<style>
	.Ads_tbl {  }
	.Ads_Row td {padding:10px 0px 0px 0px; border-bottom:1px solid #999; background:#eee;}
</style>

<script>
	function update_prod(ID,Type){	window.location = 'Ads_Edit'+Type+'.asp?Mode=Update&ID='+ID	}
	function del_prod(ID){ if (confirm('Bạn muốn xóa ảnh quảng cáo ?')){ window.location = 'Del.asp?Table_name=Ads&ID='+ID } }
	function add_prod(Pos){	window.location = 'Ads_Edit.asp?Mode=insert&Pos='+Pos	}
</script>

<b></b>
<!--#include file="footer.asp"-->