<!--#include file="Header.asp"-->


<style>
	.tab_project_holder td img{ width:91px; height:69px; margin-right:10px; }
	.tab_project_holder td a { color:#222; text-decoration:none; font-size:12px; line-height:2.0; position:relative; top:-4px; }
	.tab_project_holder td a:hover { color:#800; }
	.tab_project_holder td p { padding:5px; color:#222; line-height:1.7; }
	.tab_project_gray {background:#F5F5F5;}
</style>


<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'project_Edit'
var Table_Name = 'project'
var Delete_Confirm = 'Bạn muốn xóa dự án này?'
var Header_Text = '<b onclick="location=\'project.asp\'" style="cursor:pointer;"> DỰ ÁN </b>'
var Header_Link_Text = 'Thêm dự án'
%>

<div class="Main_Header" style="margin-bottom:0px;">
	<%=Header_Text%> <a href="#add" onClick="add_prod()">[ - <%=Header_Link_Text%> - ]</a>
</div>





	<div class="sep_" style="height:15px;"></div>


	<%//-----------------SQL Condition
	var key = String(Request('key')); if (key != '' && key!='undefined'){ key=key.replace(/\'/g , "''") ; var key_Con = " and ( title like '%" +key+ "%' or Intro like '%" +key+ "%') " }

	var cat = parseInt(Request("Cat")); if (isNaN(cat)){ cat=parseInt(Request("xcat")) };
	if (!isNaN(cat)){ var cat_Con = " and (cat_ID = "+cat+" or cat_ID in (Select id from [Xproject_Menu] where root_item="+cat+" or xroot_item="+cat+" )) " }

	if (Request('vip')==1){ var vip_Con = " and VIP=1 " }
	if (Request('internal_project')==1){ var internal_Con = " and internal_project=1 " }
	var tab_project = parseInt(Request('tab_project')); if (!isNaN(tab_project)){ var tab_project_Con = " and tab_project = "+tab_project+" " }
	var SQL_Con = (key_Con||'') + (cat_Con||'') + (internal_Con||'') + (vip_Con||'') + (tab_project_Con||'')


	//-------------------Build data
	var DB=DB_to_Arr('Select * from [project] where 1=1 '+ SQL_Con +' Order By Add_Time DESC' )
	if (DB){
		DB.pageSize(10)
		DB.getPage()%>

			<table width=100% cellpadding=0 cellspacing=0 class="tab_project_holder">

				<!--Template goes here-->
				<%for (DB.i=DB.startPos(); DB.i<=DB.endPos(); DB.i++){%>

					<tr><td style="height:112px;" class="<%=(DB.i%2)?'tab_project_gray':''%>">
						<p>
							<%if (0 && DB.RS('Vip')){%> <img src="../Home_Files/Star.bmp" title="Tin nổi bật" style="width:13px; height:13px; vertical-align:top; margin:0px;"> <%}%>
							<a href="project_Detail.asp?ID=<%=DB.RS('id')%>&Cat=<%=DB.RS('cat_id')%>"><b> <%=DB.RS('title')%> </b></a><br>
							<img src="<%=DB.RS('image') || '../Home_Files/NoImage.jpg'%>" align="left">
							<%=DB.RS('intro')%>
						</p>
						<div align="right" style="margin:0px 20px 10px;">
							<input type=button value="Sửa" onclick="update_prod(<%=DB.RS('ID')%>)">
							<input type=button value="Xóa" onclick="del_prod(<%=DB.RS('ID')%>)">
						</div>
					</td></tr>

				<%}%>
				<!--//Template goes here-->

			</table>


	<%}else{%>
		<p style="color:#666666; margin:20px;"> Không có dự án nào </p>
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