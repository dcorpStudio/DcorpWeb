<!--#include file="Header.asp"-->


<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'Price_list_Edit'
var Table_Name = 'Download'
var Delete_Confirm = 'Bạn muốn xóa file này?'
var Header_Text = 'Danh sách các báo giá'
var Header_Link_Text = 'Thêm file'
%>




<div class="Main_Header">
	<%=Header_Text%> <a href="#add" onclick="add_prod()">[ - <%=Header_Link_Text%> - ]</a>
</div>



<table cellspacing="0" cellpadding="0" id="online_support" width="100%">
		<%var DB = DB_to_Arr("Select * from DOWNLOAD Order By ID DESC")
		if (DB){
			for (DB.i=0; DB.i<=DB.ubound(2); DB.i++){%>
				<tr><td>

							<A href="#file" style="color:#006699;">
								<IMG src="../Home_Files/file.jpg" border=0>
								<b><%=DB.RS('Name')%></b> ( <%=VBDate(DB.RS('Add_Time'))%> )
							</A>
							<a href="../Download.asp?URL=<%=Server.URLEncode(DB.RS("URL"))%>">
								<img src="../Home_Files/Download.png" border="0" style="vertical-align:middle; margin-left:10px;"></a>

					</td><td width="100" align="right">
					<input type=button value="Sửa" onclick="update_prod(<%=DB.RS('ID')%>)" class=But>
					<input type=button value="Xóa" onclick="del_prod(<%=DB.RS('ID')%>)" class=But>
				</td></tr>
			<%}%>
		<%}
		DB=null%>
</table>
<style>
	#online_support td {height:40px; line-height:40px; border-bottom:1px solid #999; padding-left:10px;
						font-size:13px; background:url(IMG/Small_Gray_Scale.jpg); vertical-align:middle;}
	#online_support td img{ vertical-align:baseline; }
</style>


<script>
	function update_prod(ID){	window.location = '<%=Edit_Page%>.asp?Mode=Update&ID='+ID	}
	function del_prod(ID){ if (confirm('<%=Delete_Confirm%>')){ window.location = 'Del.asp?Table_name=<%=Table_Name%>&ID='+ID } }
	function add_prod(){	window.location = '<%=Edit_Page%>.asp?Mode=insert'	}
</script>

<!--#include file="Footer.asp"-->