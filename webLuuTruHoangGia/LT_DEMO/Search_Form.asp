<!--#include file="CORE/x_inc.asp"-->

<div class="box left" style="padding:20px;">
	<b style="font:16px Tahoma; font-weight:bold; color:#fff;">Tìm kiếm hồ sơ tài liệu</b><br /><br />
	<b style="font-size:13px; color:#444;"> [ Kết quả : <label id="seach_result_count"></label> &nbsp; hồ sơ ] </b>
</div>

<div class="box left" style="padding:20px;">
<form id="search_form" style="display:inline;"><input type="submit" value="" style="width:0px; height:0px;" />
	<style>
		#regular_search_tbl td { text-align:right; vertical-align:middle; padding-right:7px; padding-bottom:5px; color:#000; }
		#regular_search_tbl td input {border:1px solid #999;}
		.search_col_1 input,.search_col_1 select {width:130px; height:18px;}
		.search_col_2 input {width:60px; height:18px;}
		.search_col_3 input {width:100px; height:18px;}
	</style>
	<table id="regular_search_tbl">
		<tr>
			<td><b>Tiêu đề hồ sơ</b></td>		<td class="search_col_1"><input id="key" name="key" /></td>
			<td>Hộp số</td>						<td class="search_col_2"><input id="hopso" name="hopso" /></td>
			<td>Thời gian tài liệu</td>			<td class="search_col_3"><input id="fdate" name="fdate" /></td>
			<td colspan="2" style="text-align:left; padding-left:5px;"> <u class="submit pseudo_but">Tìm kiếm</u> </td>
		</tr>
		<tr>
			<td><b>Thời hạn bảo quản</b></td>	<td class="search_col_1"><span id="danhmucbq_combo"></span></td>
			<td>Hồ sơ số</td>					<td class="search_col_2"><input id="hsso" name="hsso" /></td>
			<td>Năm bảo quản</td>				<td class="search_col_3"><input id="nambq" name="nambq" /></td>
			<td colspan="2" style="text-align:left; padding-left:5px;"> <b><u style="color:#ff9;cursor:pointer;font-size:13px;" onclick="Toggle_Advanced_Search()">Tìm kiếm nâng cao</u></b> </td>
		</tr>
	</table>

	<script>
		<%DB_to_Str("Select ID,Menu_Txt from DanhMucBQ where font_id="+RQ("font").fixQuote()).toJSArr('dmbq_combo')%>
	</script>
	<script> $(function(){
		var DB = DATA.dmbq_combo
		$('#danhmucbq_combo').html( '<select name="dmbq_id" id="dmbq_id"><option value="0">-- Tất cả --</option>'+
		JRender( DB, '<option value="@id/" > @menu_txt/ </option>' ) +"</select>" );
	}) </script>


	<!--advanced search-->
	<style>
		#dmbq_id {background:#fff;}
		#advaced_search_tbl td {text-align:right; padding:0px 7px 5px 11px; color:#333;}
		#advaced_search_tbl td input { width:100px; background:#fec; }
	</style>
	<div id="advanced_search" style="display:none;">
	<div style="height:1px; width:700px; border-bottom:1px solid #fff; margin-bottom:10px;"></div>
	<table id="advaced_search_tbl">
		<tr>
			<td>Tên kho lưu trữ</td>			<td class="search_col_1"><input id="tenkholuutru" /></td>
			<td>Tên phông</td>					<td class="search_col_2"><input id="tenphong" /></td>
			<td>Mục lục số</td>					<td class="search_col_3"><input id="muclucso" /></td>
		</tr>
		<tr>
			<td>Ký hiệu thông tin</td>			<td class="search_col_1"><input id="kyhieuthongtin" /></td>
			<td>Ngôn ngữ</td>					<td class="search_col_2"><input id="ngonngu" /></td>
			<td>Bút tích</td>					<td class="search_col_3"><input id="buttich" /></td>
		</tr>
		<tr>
			<td>Số tờ</td>						<td class="search_col_1"><input id="soto" name="soto" /></td>
			<td>Chế độ sử dụng</td>				<td class="search_col_2"><input id="chedosudung" /></td>
			<td>Tình trạng vật lý</td>			<td class="search_col_3"><input id="tinhtrangvatly" /></td>
		</tr>
	</table>
	</div>

</form>
</div>




<script>
	function Toggle_Advanced_Search(){ $('#advanced_search').toggle(); Fit_Prod_Grid() }
	$(function(){

		//-- search form bind event
		$('#search_form').submit(function(){
//var x = ''; for (var i=0;i<FArr.length;i++){ x+= FArr[i]+'='+DPROD[FArr[i]]+'\n' }; alert(x)
			RE_PRODUCT(); return false;
		})

		//input bind event
		$('#search_form input,#search_form select')
		.bind('change keyup focus blur mouseup', function(){ var x=$(this).attr('id'); x=(x||'').toUpperCase(); DPROD[x] = $(this).val(); D.DPROD_BACKUP[x]=DPROD[x]; })
		.each(function(){ $(this).val( DPROD[($(this).attr('id') || '').toUpperCase()] || '' ) })
	})
</script>





