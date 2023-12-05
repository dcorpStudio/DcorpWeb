<!--#include file="Header.asp"-->


<style>
	.tab_tech_holder td a { color:#039bcd; text-decoration:none; font-size:12px; line-height:2.0; position:relative; top:-4px; }
	.tab_tech_holder td a:hover { color:#800; }
	.tab_tech_holder td p { padding:5px; color:#222; line-height:1.7; }
	.tab_tech_gray {background:#F5F5F5;}

	.other_tech li {line-height:2.4; list-style:none; padding-left:30px;}
	.other_tech a{color:#666;}
	.other_tech a:hover{color:#36c;}
	.other_tech img {margin-right:5px;}
	.other_tech span {color:#999;}
</style>
 




<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'tech_Edit'
var Table_Name = 'tech'
var Delete_Confirm = 'Bạn muốn xóa bài viết này?'
var Header_Text = '<b onclick="location=\'tech.asp\'" style="cursor:pointer;"> BÀI VIẾT TRAO ĐỔI NGHIỆP VỤ </b>'
var Header_Link_Text = 'Thêm bài viết'
%>

<div class="Main_Header" style="margin-bottom:0px;">
	<%=Header_Text%> <a href="#add" onClick="add_prod()"> &nbsp; [ - <%=Header_Link_Text%> - ]</a>
</div>





	<!--Menu_String-->

	<div class="sep_" style="height:15px;"></div>



	<%var id = parseInt(Request("id")); if (!isNaN(id)){
		var DB=DB_to_Arr("Select * from tech where id=" + id )
		if (DB){
			var Saved_ID = DB.RS('id')
			var Saved_Cat = DB.RS('cat_id')%>

			<div align="right" style="margin:0px 20px 10px;">
				<input type=button value="Sửa" onClick="update_prod(<%=DB.RS('ID')%>)">
				<input type=button value="Xóa" onClick="del_prod(<%=DB.RS('ID')%>)">
			</div>
			<table width=100% cellpadding=0 cellspacing=0 class="tab_tech_holder">
					<tr><td>
						<p>
							<%if (0 && DB.RS('Vip')){%> <img src="../Home_Files/Star.bmp" title="bài viết nổi bật" style="width:15px; height:15px; vertical-align:top; margin:0px;"> <%}%>
							<a href="#tech_Detail"><b style="font-size:15px; color:#666;"> <%=DB.RS('title')%> </b></a><br>
							<%if (DB.RS('URL')){%>
								<br /><img src="../Home_Files/file.jpg" /> File tài liệu đính kèm :
								<a href="../Download.asp?URL=<%=Server.URLEncode(DB.RS("URL"))%>" style=" color:#006699; font-weight:bold;"> <img style="vertical-align:middle;" src="../Home_Files/Download.png" /> Download </a> <br /><br />
							<%}%>

							<div style="line-height:1.8;">
								<b style="color:#039bcd;font-size:13px;"><%=DB.RS('intro')%></b>
								<br /><br />
								<%=DB.RS('detail')%>
							</div><br>

						</p>
					</td></tr>
			</table>

		<%}else{%>
			<p style="color:#666666; margin:20px;"> bài viết đã bị xóa </p>
		<%}
		DB=null
	}%>
	<div class="sep_" style="height:15px;"></div>







	<!--Other tech -->
	<div class="admin_paging" style="text-align:left; padding-left:10px;"> Các bài viết khác : </div>
	<div class="other_tech" style="margin-top:10px; margin-bottom:40px;">
	<%if (Saved_ID){
		var P = DB_to_Arr('Select top 7 ID, Title, Add_Time from tech where ID < '+Saved_ID+'  Order By Add_Time Desc ')
		if (P){
			for (P.i=0;P.i<=P.ubound(2);P.i++){ %>
					<li>
						<img src="../HOME_Files/Link_Arrow.gif">
						<a href="tech_detail.asp?ID=<%=P.RS('ID')%>&Cat=<%=Saved_Cat%>">
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