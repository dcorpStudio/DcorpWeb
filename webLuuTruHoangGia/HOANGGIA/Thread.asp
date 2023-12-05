<!--#include file="Header.asp"-->


<style>
	.tab_thread_holder td img{ width:91px; margin-right:10px; }
	.tab_thread_holder td a { color:#222; text-decoration:none; font-size:12px; line-height:2.0; position:relative; top:-4px; }
	.tab_thread_holder td a:hover { color:#800; }
	.tab_thread_holder td p { padding:5px; color:#222; line-height:1.7; }
	.tab_thread_gray {background:#F5F5F5;}
</style>


<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'thread_Edit'
var Table_Name = 'thread'
var Delete_Confirm = 'Bạn muốn xóa chuyên đề này?'
var Header_Text = '<b onclick="location=\'thread.asp\'" style="cursor:pointer;"> CÁC BÀI VIẾT CHUYÊN ĐỀ </b>'
var Header_Link_Text = 'Thêm chuyên đề'
%>

<div class="Main_Header" style="margin-bottom:0px;">	<%=Header_Text%></div>





	<div class="sep_" style="height:15px;"></div>


	<%//-----------------SQL Condition
	var key = String(Request('key')); if (key != '' && key!='undefined'){ key=key.replace(/\'/g , "''") ; var key_Con = " and ( title like '%" +key+ "%' or Intro like '%" +key+ "%') " }
	var SQL_Con = (key_Con||'') 


	//-------------------Build data
	var DB=DB_to_Arr('Select * from [thread] where 1=1 '+ SQL_Con +' Order By Add_Time DESC' )
	if (DB){
		DB.pageSize(10)
		DB.getPage()%>

			<table width=100% cellpadding=0 cellspacing=0 class="tab_thread_holder">

				<!--Template goes here-->
				<%for (DB.i=DB.startPos(); DB.i<=DB.endPos(); DB.i++){%>

					<tr><td style="height:112px;" class="<%=(DB.i%2)?'tab_thread_gray':''%>">
						<p>
							<%if (0 && DB.RS('Vip')){%> <img src="../Home_Files/Star.bmp" title="Tin nổi bật" style="width:13px; height:13px; vertical-align:top; margin:0px;"> <%}%>
							<a href="thread_Detail.asp?ID=<%=DB.RS('id')%>&Cat=<%=DB.RS('cat_id')%>"><b> <%=DB.RS('title')%> </b></a><br>
							<img src="<%=DB.RS('image') || 'Home_Files/NoImage.jpg'%>" align="left">
							<%=DB.RS('intro')%>
						</p>
					</td></tr>

				<%}%>
				<!--//Template goes here-->

			</table>


	<%}else{%>
		<p style="color:#666666; margin:20px;"> Không có chuyên đề nào </p>
	<%}%>
	<div class="sep_" style="height:15px;"></div>



	<!--Paging -->
	<div class="admin_paging">
		<!--#include file=TEM/Paging_Tem.asp-->
		<%P.lastPage = (DB?DB.lastPage():0)%>
		<b>Trang :</b> <%R(P.Output()); P=null%>
	</div>





<script>
	function update_prod(ID){	window.location = '<%=Edit_Page%>.asp?Mode=Update&ID='+ID	}
	function del_prod(ID){ if (confirm('<%=Delete_Confirm%>')){ window.location = 'Del.asp?Table_name=<%=Table_Name%>&ID='+ID } }
	function add_prod(){	window.location = '<%=Edit_Page%>.asp?Mode=insert'	}
</script>

<!--#include file="Footer.asp"-->