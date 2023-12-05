<!--#include file="Header.asp"-->


<style>
	.tab_news_holder td { background:#333; border-bottom:1px solid #999; padding-left:10px; }
	.tab_news_holder td img{ width:89px; margin-right:10px; margin-bottom:10px; cursor:pointer; }
	.tab_news_holder td a { color:#fc0; text-decoration:none; font-size:12px; line-height:2.0; position:relative; top:-4px; }
	.tab_news_holder td p { padding:5px; color:#ccc; line-height:1.7; }
	.tab_news_gray {background:#F5F5F5;}
</style>
<script>
	function Mem_Detail(id){	location = 'Mem_Detail.asp?id=' + id	}
</script>




<%//********This will help the List-Type-Page creation easier
var Edit_Page = 'Mem_Edit'
var Table_Name = 'Mem'
var Delete_Confirm = 'Bạn muốn xóa nhân viên này?'
var Header_Text = '<b onclick="location=\'Mem.asp\'" style="cursor:pointer;">DANH SÁCH THÀNH VIÊN</b>'
var Header_Link_Text = ''
%>

<div class="admin_main_header" style="margin-bottom:0px;">	<%=Header_Text%>
<a href="MEM.asp?Search=1"> Tìm kiếm </a> </div>


	<%if (Request("Search")==1){%>
	<div class="box w100" style="background:#444;">
		<style> #Search_Mem_Form input {width:120px; height:18px;} </style>
		<form method="get" action="MEM.asp">
		<div id="Search_Mem_Form" style="padding:15px 10px 15px;">
			Tên thành viên : <input name="mem_key" value="<%=Convert(Request("mem_key"))%>" /> &nbsp;
			Email : <input name="mem_mail" value="<%=Convert(Request("mem_mail"))%>" /> &nbsp;
			<input type="submit" value="TÌM" style="width:70px; height:23px;" />
		</div>
		<input type="hidden" name="search" value="1" />
		</form>
	</div>
	<div class="box w100" style="background:#222; border-bottom:1px solid #ccc; height:30px;">
		<span style="margin-left:20px; line-height:30px;"> Kết quả tìm kiếm : </span>
	</div>
	<%}%>
	<div class="sep_" style="height:15px;background:#333;"></div>


	<%//-----------------MEM TABLE
	function fixquote(x){ return String(Request(x)).replace(/'/g ,'').replace(/"/g,'') }
	var xname = fixquote("mem_key"); if (xname!="" && xname!="undefined"){ var name_Con = " and Mem_Name like '%"+xname+"%' " }
	var xmail = fixquote("mem_mail"); if (xmail!="" && xmail!="undefined"){ var mail_Con = " and email ='"+xmail+"' " }
	var SQL_Con = (name_Con || '') + (mail_Con || '')

	var DB=DB_to_Arr('Select * from Mem where ID <> 1 '+SQL_Con+' Order By ID DESC')
	if (DB){
		DB.pageSize(10)
		DB.getPage()%>

			<table class="tab_news_holder" width=100% cellpadding=0 cellspacing=0 class="tab_news_holder">

				<!--Template goes here-->
				<%for (DB.i=DB.startPos(); DB.i<=DB.endPos(); DB.i++){%>

					<tr><td>
						<p>
							<a href="#a"><b><%=DB.RS('mem_name')%> </b></a><br>
							<b>Email : </b><b style="color:#fff"> <%=DB.RS('Email')%> </b> <br />
							<b>Điện thoại :</b> <%=DB.RS('Phone').C(0)%><br />
							<b>Địa chỉ :</b> <%=DB.RS('Address').C(0)%><br />
							<b>Số tin đã đăng :</b> <%=DB_to_Val("Select Count(id) from RAO where Mem_ID="+DB.RS('id'))%> &nbsp;
							<a href="RAO.asp?Mem_ID=<%=DB.RS('id')%>" target="_blank" style="color:#fc0; position:static;"> [ xem ] </a>
							<br />
						</p>
						<div align="right" style="margin:0px 20px 10px;">
							<input type="button" value="Đăng nhập" onclick="LOGIN_MEM(<%=DB.RS('id')%>)" />
							<input type=button value="Sửa" onclick="update_prod(<%=DB.RS('ID')%>)">
							<input type=button value="Xóa" onclick="del_prod(<%=DB.RS('ID')%>)">
						</div>
					</td></tr>

				<%}%>
				<!--//Template goes here-->

			</table>


	<%}else{%>
		<div style="background:#333;">
			<p style="color:#666666; padding:20px;">Không tìm thấy kết quả nào</p>
		</div>
	<%}%>


	<!--Paging -->
	<div class="admin_paging">
		<!--#include file=TEM/Paging_Tem.asp-->
		<%P.lastPage = (DB?DB.lastPage():0)%>
		<b>Trang :</b> <%R(P.Output()); DB=P=null%>
	</div>





<script>
	function LOGIN_MEM(id){ window.open("LOGIN_MEM.asp?id="+id , 'login_mem_'+id) }
	function update_prod(ID){	window.location = '<%=Edit_Page%>.asp?Mode=Update&ID='+ID	}
	function del_prod(ID){ if (confirm('<%=Delete_Confirm%>')){ window.location = 'Del.asp?Table_name=<%=Table_Name%>&ID='+ID } }
	function add_prod(){	window.location = '<%=Edit_Page%>.asp?Mode=insert'	}
</script>

<!--#include file="Footer.asp"-->