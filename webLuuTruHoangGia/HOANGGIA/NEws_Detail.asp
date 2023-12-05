<!--#include file="Header.asp"-->


<style>
	.tab_news_holder td a { color:#039bcd; text-decoration:none; font-size:12px; line-height:2.0; position:relative; top:-4px; }
	.tab_news_holder td a:hover { color:#800; }
	.tab_news_holder td p { padding:5px; color:#222; line-height:1.7; }
	.tab_news_gray {background:#F5F5F5;}

	.other_news li {line-height:2.4; list-style:none; padding-left:30px;}
	.other_news a{color:#666;}
	.other_news a:hover{color:#36c;}
	.other_news img {margin-right:5px;}
	.other_news span {color:#999;}
</style>





<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'News_Edit'
var Table_Name = 'News'
var Delete_Confirm = 'Bạn muốn xóa tin này?'
var Header_Text = '<b onclick="location=\'News.asp\'" style="cursor:pointer;"> TIN TỨC </b>'
var Header_Link_Text = 'Thêm bản tin'
%>

<div class="Main_Header" style="margin-bottom:0px;"><%=Header_Text%></div>





	<!--Menu_String-->

	<div class="sep_" style="height:15px;"></div>





	<%var id = parseInt(Request("id")); if (!isNaN(id)){
		var DB=DB_to_Arr("Select * from NEWS where id=" + id )
		if (DB){
			var Saved_ID = DB.RS('id')
			var Saved_Cat = DB.RS('cat_id')%>

			<table width=100% cellpadding=0 cellspacing=0 class="tab_news_holder">
					<tr><td>
						<p>
							<%if (0 && DB.RS('Vip')){%> <img src="../Home_Files/Star.bmp" title="Tin nổi bật" style="width:15px; height:15px; vertical-align:top; margin:0px;"> <%}%>
							<a href="News_Detail.asp?ID=<%=DB.RS('id')%>&Cat=<%=DB.RS('cat_id')%>"><b style="font-size:15px; color:#666;"> <%=DB.RS('title')%> </b></a><br>
							<img src="<%=DB.RS('image') || 'Home_Files/NoImage.jpg'%>" align="left" style="width:200px; margin-right:10px; margin-bottom:10px;">

							<div style="line-height:1.8;">
								<b style="color:#039bcd;font-size:13px;"><%=DB.RS('intro')%></b>
								<br /><br />
								<%=DB.RS('detail')%>
							</div><br>

						</p>
					</td></tr>
			</table>

		<%}else{%>
			<p style="color:#666666; margin:20px;"> Tin đã bị xóa </p>
		<%}
		DB=null
	}%>
	<div class="sep_" style="height:15px;"></div>







	<!--Other news -->
	<div class="admin_paging" style="text-align:left; padding-left:10px;"> Các tin khác : </div>
	<div class="other_news" style="margin-top:10px; margin-bottom:40px;">
	<%if (Saved_ID && Saved_Cat){
		var P = DB_to_Arr('Select top 7 ID, Title, Add_Time from News where ID < '+Saved_ID+'  Order By Add_Time Desc ')
		if (P){
			for (P.i=0;P.i<=P.ubound(2);P.i++){ %>
					<li>
						<img src="HOME_Files/Link_Arrow.gif">
						<a href="News_detail.asp?ID=<%=P.RS('ID')%>&Cat=<%=Saved_Cat%>">
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