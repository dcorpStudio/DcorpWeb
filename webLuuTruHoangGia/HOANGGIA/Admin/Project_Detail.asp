<!--#include file="Header.asp"-->


<style>
	.tab_Project_holder td a { color:#039bcd; text-decoration:none; font-size:12px; line-height:2.0; position:relative; top:-4px; }
	.tab_Project_holder td a:hover { color:#800; }
	.tab_Project_holder td p { padding:5px; color:#222; line-height:1.7; }
	.tab_Project_gray {background:#F5F5F5;}

	.other_Project li {line-height:2.4; list-style:none; padding-left:30px;}
	.other_Project a{color:#666;}
	.other_Project a:hover{color:#36c;}
	.other_Project img {margin-right:5px;}
	.other_Project span {color:#999;}
</style>





<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'Project_Edit'
var Table_Name = 'Project'
var Delete_Confirm = 'Bạn muốn xóa dự án này?'
var Header_Text = '<b onclick="location=\'Project.asp\'" style="cursor:pointer;"> DỰ ÁN </b>'
var Header_Link_Text = 'Thêm dự án'
%>

<div class="Main_Header" style="margin-bottom:0px;">
	<%=Header_Text%> <a href="#add" onClick="add_prod()">[ - <%=Header_Link_Text%> - ]</a>
</div>





	<!--Menu_String-->

	<div class="sep_" style="height:15px;"></div>





	<%var id = parseInt(Request("id")); if (!isNaN(id)){
		var DB=DB_to_Arr("Select * from Project where id=" + id )
		if (DB){
			var Saved_ID = DB.RS('id')
			var Saved_Cat = DB.RS('cat_id')%>

			<div align="right" style="margin:0px 20px 10px;">
				<input type=button value="Sửa" onClick="update_prod(<%=DB.RS('ID')%>)">
				<input type=button value="Xóa" onClick="del_prod(<%=DB.RS('ID')%>)">
			</div>
			<table width=100% cellpadding=0 cellspacing=0 class="tab_Project_holder">
					<tr><td>
						<p>
							<a href="Project_Detail.asp?ID=<%=DB.RS('id')%>&Cat=<%=DB.RS('cat_id')%>"><b style="font-size:15px; color:#333;"> <%=DB.RS('title')%> </b></a><br>
							<img src="<%=DB.RS('image') || '../Home_Files/NoImage.jpg'%>" align="left" style="width:200px; margin-right:10px; margin-bottom:10px;">

							<div style="line-height:1.8;">
								<b style="color:#039bcd;font-size:13px;"><%=DB.RS('intro')%></b>
								<br /><br />
								<%=DB.RS('detail')%>
							</div><br>
						</p>
					</td></tr>
			</table>

		<%}else{%>
			<p style="color:#666666; margin:20px;"> dự án đã bị xóa </p>
		<%}
		DB=null
	}%>
	<div class="sep_" style="height:15px;"></div>







	<!--Other Project -->
	<div class="admin_paging" style="text-align:left; padding-left:10px;"> Các dự án khác : </div>
	<div class="other_Project" style="margin-top:10px; margin-bottom:40px;">
	<%if (Saved_ID){
		var P = DB_to_Arr('Select top 7 ID, Title, Add_Time from Project where ID < '+Saved_ID+'  Order By Add_Time Desc ')
		if (P){
			for (P.i=0;P.i<=P.ubound(2);P.i++){ %>
					<li>
						<img src="../HOME_Files/Link_Arrow.gif">
						<a href="Project_detail.asp?ID=<%=P.RS('ID')%>&Cat=<%=Saved_Cat%>">
							<%=P.RS('Title')%>
						</a>
						 &nbsp; &nbsp; <span>(<%=VBDate(P.RS('Add_Time'))%>)</span>
					</li>
			<%}
			P=null
		}
	}%>
	</div>





<script>
	function update_prod(ID){	window.location = '<%=Edit_Page%>.asp?Mode=Update&ID='+ID	}
	function del_prod(ID){ if (confirm('<%=Delete_Confirm%>')){ window.location = 'Del.asp?Table_name=<%=Table_Name%>&ID='+ID } }
	function add_prod(){	window.location = '<%=Edit_Page%>.asp?Mode=insert'	}
</script>

<!--#include file="Footer.asp"-->