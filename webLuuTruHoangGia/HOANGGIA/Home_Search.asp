<p align="right" style="margin:4px 8px 10px 4px;"><b>TÌM KIẾM BẤT ĐỘNG SẢN</b></p>

<style>
	#Home_Search_Header li { float:left; text-align:center; margin:0px 8px 0px 8px; height:34px; line-height:34px; }
	a.Home_Search_Header { color:#c1c1c1; font-weight:bold; display:block; padding:0px 18px 0px 18px; background:none; }
	a.Home_Search_Header_Hover { color:#fefefe; background:url(Home_Files/Search_Header_Focus_Cover.jpg) no-repeat right; line-height:27px; padding-bottom:7px; }
</style>


<div class="box w100" style="background:url(Home_Files/search_Header_BG.jpg) no-repeat left bottom;">
	<ul id="Home_Search_Header">
		<li onclick="change_rao_combo(1)"><a href="#a"> Bất động sản bán </a></li>
		<li onclick="change_rao_combo(2)"><a href="#a"> Bất động sản cho thuê </a></li>
		<li onclick="Show_ID_Search()"><a href="#a"> Tím kiếm theo ID </a></li>
	</ul>
</div>

<script>
	// Code for the Header navigator effect
	$(function(){
		$('#Home_Search_Header li').find('a').addClass('Home_Search_Header').end().hover(
			function(){
				$(this).css('background','url(Home_Files/Search_Header_Focus.jpg)')
				.find('a:first').addClass('Home_Search_Header_Hover')
			},
			function(){
				if ($(this).attr('name')!='Home_Search_Header_Focus'){
					$(this).css('background','none').find('a:first').removeClass('Home_Search_Header_Hover')
				}
			}
		).click(function(){
			$('li[name="Home_Search_Header_Focus"]',$(this).parent()).removeAttr("name").trigger('mouseout')
			$(this).attr('name','Home_Search_Header_Focus')
		}).first().trigger("mouseover").trigger("click")
	})
</script>

<div class="box w100" style="background:url(Home_Files/home_Search_BG.jpg) repeat-y;" id="rao_form_container">
	<div style="padding:13px 0px 44px 0px; position:relative;">

	<form method="get" action="Rao.asp" id="Home_Rao_Form">
		<!--The Search form-->
		<style>
			#search_form_1 td {padding:3px; color:#f7f7f7;}
			#search_form_1 select { width:200px; }
			#search_form_1 label { margin-left:61px; }
		</style>
		<table class="w100" id="search_form_1">
			<tr>
				<td style="width:238px;"> <label></label> Loại bất động sản </td>
				<td style="width:255px;"> <%S_Combo('raomenu1','r')%> </td>
			</tr>

			<%var S=new location_hierachy('r');%>
			<tr>
				<td> <label></label> Tỉnh / Thành phố </td>
				<td> <%S.Province()%> </td>
			</tr>
			<tr>
				<td> <label></label> Quận / Huyện </td>
				<td> <%S.District()%> </td>
			</tr>
			<tr>
				<td> <label></label> Diện tích </td>
				<td> <%S_Combo('area','r')%> </td>
			</tr>
			<tr>
				<td> <label></label> Giá </td>
				<td> <%S_Combo('price','r')%> </td>
			</tr>
		</table>

		<input type="hidden" name="search" value="1" />
	</form>


	<form method="get" action="rao_detail.asp" style="display:none;" id="search_by_id">
		<table class="w100" id="search_form_1">
			<tr>
				<td style="width:100px; text-align:right; vertical-align:middle;"> Mã tin rao </td>
				<td style="width:393px; padding-left:15px;"> <input name="id" style="width:250px; height:22px;" id="rao_id" /> </td>
			</tr>
		</table>
	</form>


	<!--The bottom search but & round cover -->
	<img src="Home_Files/Search_Footer.jpg" width="493" height="5" style="position:absolute; bottom:0px; _bottom:-1px; left:0px;" />
	<div onclick="Rao_From_Submit()" style="cursor:pointer; position:absolute; bottom:10px; right:15px; width:95px; height:36px; background:url(Home_Files/search_But.gif) right no-repeat;">
		<b style="color:#e0e0e0; position:relative; top:20px;"> TÌM KIẾM </b>
	</div>

	</div>
</div>


<script>
	function Rao_From_Submit(){		$('#rao_form_container form:visible').submit()	}
	function change_rao_combo(x){
		Show_Rao_Search()
		if (x==1){
			$('#rS_Combo_raomenu1_Container select:first').find('option[value!=""]').remove().end().append( $('#Cached_raomenu1_Combo select:first option').clone() )
			$('#rS_Combo_price_Container select:first').find('option[value!=""]').remove().end().append( $('#Cached_price_Combo select:first option').clone() )
		}else{
			$('#rS_Combo_raomenu1_Container select:first').find('option[value!=""]').remove().end().append( $('#Cached_raomenu2_Combo select:first option').clone() )
			$('#rS_Combo_price_Container select:first').find('option[value!=""]').remove().end().append( $('#Cached_price1_Combo select:first option').clone() )
		}
	}

	function Show_Rao_Search(){	$('#Home_Rao_Form').show(); $('#search_by_id').hide(); }
	function Show_ID_Search(){	$('#Home_Rao_Form').hide(); $('#search_by_id').show(); }
	function Search_Rao_ID(){ location = 'Rao_Detail.asp?ID=' + $("#rao_id").val() }

</script>


