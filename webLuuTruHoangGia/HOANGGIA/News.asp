<!--#include file="Header.asp"-->


<style>
	.tab_news_holder td img{ width:91px; height:69px; margin-right:10px; }
	.tab_news_holder td a { color:#222; text-decoration:none; font-size:12px; line-height:2.0; position:relative; top:-4px; }
	.tab_news_holder td a:hover { color:#800; }
	.tab_news_holder td p { padding:5px; color:#222; line-height:1.7; }
	.tab_news_gray {background:#F5F5F5;}
</style>


<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'News_Edit'
var Table_Name = 'News'
var Delete_Confirm = 'Bạn muốn xóa tin này?'
var Header_Text = '<b onclick="location=\'News.asp\'" style="cursor:pointer;"> TIN TỨC </b>'
var Header_Link_Text = 'Thêm bản tin'
%>

<div class="Main_Header" style="margin-bottom:0px;">
	<%if (Request('Search')==1){%>
		Kết quả tìm kiếm theo từ khóa "<b style="font-size:13px;text-decoration:underline; color:#900;"><%=Request('key')%></b>"
	<%}else{%>
		<%=Header_Text%>
	<%}%>
</div>





	<div class="sep_" style="height:15px;"></div>


	<%//-----------------SQL Condition
	var key = String(Request('key')); if (key != '' && key!='undefined'){ key=key.replace(/\'/g , "''") ; var key_Con = " and ( title like '%" +key+ "%' or Intro like '%" +key+ "%') " }
	var SQL_Con = (key_Con||'') 



	//-------------------Build data
	var DB=DB_to_Arr('Select * from NEWS where 1=1 '+ SQL_Con +' Order By Add_Time DESC' )
	if (DB){
		DB.pageSize(10)
		DB.getPage()%>

			<table width=100% cellpadding=0 cellspacing=0 class="tab_news_holder">

				<!--Template goes here-->
				<%for (DB.i=DB.startPos(); DB.i<=DB.endPos(); DB.i++){%>

					<tr><td style="height:112px;" class="<%=(DB.i%2)?'tab_news_gray':''%>">
						<p>
							<%if (0 && DB.RS('Vip')){%> <img src="../Home_Files/Star.bmp" title="Tin nổi bật" style="width:13px; height:13px; vertical-align:top; margin:0px;"> <%}%>
							<a href="News_Detail.asp?ID=<%=DB.RS('id')%>&Cat=<%=DB.RS('cat_id')%>"><b> <%=DB.RS('title')%> </b></a><br>
							<img src="<%=DB.RS('image') || 'Home_Files/NoImage.jpg'%>" align="left">
							<%=DB.RS('intro')%>
						</p>
					</td></tr>

				<%}%>
				<!--//Template goes here-->

			</table>


	<%}else{%>
		<p style="color:#666666; margin:20px;"> Không có bản tin nào </p>
	<%}%>
	<div class="sep_" style="height:15px;"></div>



	<!--Paging -->
	<div class="admin_paging">
		<!--#include file=TEM/Paging_Tem.asp-->
		<%P.lastPage = (DB?DB.lastPage():0)%>
		<b>Trang :</b> <%R(P.Output()); P=null%>
	</div>



<!--#include file="Footer.asp"-->


