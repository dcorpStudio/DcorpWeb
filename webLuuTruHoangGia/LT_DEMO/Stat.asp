<!--#include file="inc.asp"-->

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script>
	//-- All the data in this page
	var Doc_Count = {}; var Box_Count={};

	$(function(){
		$('.stat_font_name').text(D.FONT_NAME);
		$('.stat_last_login').text(D.LAST_LOGIN)
		$('.Doc_Count').load("content.asp?t=doc_count&font="+D.FONT )

		//-- Stat list
		<%var font_id = RQ('font').fixQuote() || -1
		DB_to_Str("Select * from DanhMucBQ where FONT_ID="+ font_id +" Order By Menu_Order").toJSArr('stat')%>
		var DB = DATA.stat;

		<%var DM = DB_to_Arr1("Select ID from DanhMucBQ")
		if (DM){for(var i=0;i<DM.l();i++){%>
			Doc_Count[<%=DM[i]%>] = <%=DB_to_Val("Select Count(ID) from Product where DanhMucBQ_ID=" + DM[i]) || 0 %>
			Box_Count[<%=DM[i]%>] = <%=DB_to_Val("Select Count(*) from (Select DISTINCT HOPSO_NAME from [HOPSO_NAME] where DanhMucBQ_ID="+ DM[i] +")") || 0 %>
		<%}}%>

		var Tem = $('#stat_row_tem').val()
		var Condition = '@Count/ = Doc_Count[@id/] || 0;  @Count_HopSo/ = Box_Count[@id/] || 0'
		$('#stat_container').html( '<table id="stat_table" cellspacing=4>' + JRender(DB,Tem,Condition) + '</table>' )
	})
</script>


<div style="padding:40px 200px 20px 200px;">
	<p align="center"><b style="font:16px Tahoma; font-weight:bold; color:#fff;">CHÀO MỪNG QUẢN TRỊ VIÊN</b> <br><br>
	<span style="color:#fff;"> Lần sử dụng phần mềm gần đây nhất : <label class="stat_last_login" style="color:#fff; font:14px Tahoma; font-weight:bold;"></label> </p>
	<hr style="width:425px; color:#ccc;"> <br> </span>


	<br><br> <b style="color:#036; font-size:13px;"> THỐNG KÊ VỀ HỒ SƠ TÀI LIỆU LƯU TRONG : &nbsp; </b>
	<label class="stat_font_name" style="text-transform:uppercase; font-weight:bold; color:#036;"></label>

	<br><br><br> <b style="font-size:13px;">Tổng số hồ sơ - tài liệu : &nbsp; </b> <label class="Doc_Count stat_num"></label> <br><br />


	<!--Stat table-->
	<style>
		.stat_num {color:#c00;}
		#stat_table { border:1px solid #888; }
		#stat_table td { border-bottom:1px solid #888; padding:0px 24px 0px 24px; height:50px; line-height:50px;  }
		#stat_table td b{color:#222; font-size:12px;}
		.pseudo_but { margin-top:13px; }
	</style>

	<div id="stat_container"></div>
	<textarea class="hide_" id="stat_row_tem">
		<tr>
			<td bgcolor="#7ccbe4"> 	<b><font color="#000000">@Menu_Txt/</font> </b>	</td>
			<td> <font color="#CC0000"> @Count/ </font> <b>hồ sơ tài liệu</b> </td>
			<td> Tổng số hộp </td>
			<td> <font color="#CC0000"> @Count_HOPSO/ </font> hộp </td>
			<td style="vertical-align:middle;"> <b class="pseudo_but" onclick="D.DMBQ_ID=@ID/; D.SEARCH=0; D.load('Product.asp?font='+D.FONT);">xem</b> </td>
		</tr>
	</textarea>
	<script> $(function(){ $('#stat_table.pseudo_but').click(function(){ D.DMBQ_ID=$(this).attr('title'); D.load('Product.asp'); }) }) </script>
	<!--//Stat table-->


</p></div>
