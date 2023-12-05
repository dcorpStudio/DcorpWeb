<!--#include file="Header.asp"-->


<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'Nick_Edit'
var Table_Name = 'Nick'
var Delete_Confirm = 'Bạn muốn xóa nick này?'
var Header_Text = 'HỖ TRỢ TRỰC TUYẾN'
var Header_Link_Text = 'Thêm nick chat'
%>




<div class="admin_main_header">
	<%=Header_Text%> <a href="#add" onclick="add_prod()">[ - <%=Header_Link_Text%> - ]</a>
</div>



<table cellspacing="0" cellpadding="0" id="online_support" width="100%">
		<%var DB = DB_to_Arr("Select * from Nick Order By Nick_Type DESC, ID ASC")
		if (DB){
			for (DB.i=0; DB.i<=DB.ubound(2); DB.i++){%>
				<tr><td>
					<%if (DB.RS('Nick_Type') == 'Yahoo' ){%>
								<A href="ymsgr:sendim?<%=DB.RS('Nick')%>" style="color:#fc0;">
									<IMG src="http://opi.yahoo.com/online?u=<%=DB.RS('Nick')%>&t=5" border=0>
									<b><%=DB.RS('Name')%></b> ( <%=DB.RS('Nick')%> )
								</A>
					<%}else{ //--Skype%>
								<a href="skype:<%=DB.RS('Nick')%>?call" style="color:#fc0;">
									<img src="../Home_Files/Skype_Icon.jpg" border=0>
									<%=DB.RS('Name')%> ( <b> <%=DB.RS('Nick')%> </b>)
								</a>
					<%}%>

					</td><td width="100" align="right" style="padding-right:20px;">
					<input type=button value="Sửa" onclick="update_prod(<%=DB.RS('ID')%>)" class=But>
					<input type=button value="Xóa" onclick="del_prod(<%=DB.RS('ID')%>)" class=But>
				</td></tr>
			<%}%>
		<%}
		DB=null%>
</table>
<style>
	#online_support td {height:40px; line-height:40px; border-bottom:1px solid #999; padding-left:10px;
						font-size:13px; background:#333;; vertical-align:middle;}
	#online_support td img{ vertical-align:baseline; }
</style>


<script>
	function update_prod(ID){	window.location = '<%=Edit_Page%>.asp?Mode=Update&ID='+ID	}
	function del_prod(ID){ if (confirm('<%=Delete_Confirm%>')){ window.location = 'Del.asp?Table_name=<%=Table_Name%>&ID='+ID } }
	function add_prod(){	window.location = '<%=Edit_Page%>.asp?Mode=insert'	}
</script>

<!--#include file="Footer.asp"-->