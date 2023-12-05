<%
//fucntion to get the cat_name from DB
function Cat_Name(id){
	return DB_to_Val('Select Menu_Txt from MENU where id=' + parseInt(id) )
}
%>


<div style="float:left; color:#ccc;"> ► </div>

<%var cat = parseInt(Request("cat_id"))
if (isNaN(cat) || cat <0){ cat = 0 }

if (parseInt(Request('search'))==1){%>
	&nbsp; Kết quả tìm kiếm
<%}else{%>

	<%if (cat){%>

			<div id="menu_string_div" style="float:left; margin:0px; padding:0px; display:inline-block; width:auto;">
				<a href="Product.asp?cat_id=<%=cat%>"> <%=Cat_Name(cat)%> </a>
				&nbsp; (Q.<%=DB_to_Val("Select Menu_Txt from PROVINCE where ID in (Select Province_ID from MENU where ID="+cat+") ")%>
				- <%=DB_to_Val("Select Menu_Txt from PROVINCE where ID in (Select Root_Item from PROVINCE where ID in (Select Province_ID from MENU where ID="+cat+")) ")%>)
			</div>

	<%}else{%>
		 &nbsp;	Toàn bộ dự án
	<%}%>

<%}%>


<style>
	#menu_string_div {list-style:none; line-height:35px; float:right; margin:0px 3px 0px 3px; }
	#menu_string_div a { color:#ccc; font-weight:bold; }
	#menu_string_div a:hover { color:#fc0; }
</style>


