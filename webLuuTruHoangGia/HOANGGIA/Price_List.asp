<!--#include file=Header.asp-->



<div class="Main_Header">
	<b onclick="location='Mem_Download.asp'" style="cursor:pointer;"> Danh sách báo giá </b>
</div>
<div class="sep_" style="height:10px;"></div>


	<%//-------------------Build data
	var DB=DB_to_Arr('Select * from DOWNLOAD Order By ID DESC' )
	if (DB){
		DB.pageSize(30)
		DB.getPage()%>

			<table cellpadding=0 cellspacing=0  id="online_support" style="width:100%;">

				<!--Template goes here-->
				<%for (DB.i=DB.startPos(); DB.i<=DB.endPos(); DB.i++){%>

					<tr><td style="padding-left:10px; height:35px;">
							<A href="#file" style="color:#006699;">
								<IMG src="Home_Files/file.jpg" border=0>
								<b><%=DB.RS('Name')%></b> <!-- ( <%=VBDate(DB.RS('Add_Time'))%> ) -->
							</A>
							<a href="Download.asp?URL=<%=Server.URLEncode(DB.RS("URL"))%>" style="color:#0099CC; float:right; margin-right:10px;">
								<img src="Home_Files/Download.png" border="0" style="vertical-align:middle; margin-left:10px;" title="Download">
								Download
							</a>
					</td></tr>

				<%}%>
				<!--//Template goes here-->

			</table>


	<%}else{%>
		<p style="color:#666666; margin:20px;"> Không có file nào </p>
	<%}%>


	<div class="sep_" style="height:10px;"></div>

	<!--Paging -->
	<div class="admin_paging">
		<!--#include file=TEM/Paging_Tem.asp-->
		<%P.lastPage = (DB?DB.lastPage():0)%>
		<b>Trang :</b> <%R(P.Output()); P=null%>
	</div>
	<div class="sep_" style="height:10px;"></div>

<style>
	#online_support td {height:40px; line-height:40px; border-bottom:1px solid #ccc; padding-left:10px;
						font-size:13px; xbackground:url(Home_Files/Small_Gray_Scale.jpg); vertical-align:middle;}
	#online_support td img{ vertical-align:baseline; }
</style>


<!--#include file=Footer.asp-->


