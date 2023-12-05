<!--#include file="CORE/x_inc.asp"-->
<script src="CORE/JQuery_Extra.js"></script>

<script>
	// Calculate the height of the Prod Grid to fit browser screen
	function Fit_Prod_Grid(){ $('#xProdGrid').height( $('#main_container').outerHeight() - $('#xSearch_Form,#xProdHeader').totalHeight() );  }

	D.SEARCH = <%=RQ('search')?1:0%>
	var DPROD={}; DPROD.DMBQ_ID = 0
	$(function(){
		if (D.SEARCH){ $('#xSearch_Form').load('Search_Form.asp?font='+D.FONT , Fit_Prod_Grid) }
		else{
//			$('#xSearch_Form .DMBQ_Name').load("content.asp?t=dmbq_name&dmbq_id="+ (DPROD.DMBQ_ID||0) )
//			$('#xSearch_Form .DMBQ_Count').load("content.asp?t=dmbq_count&dmbq_id="+ (DPROD.DMBQ_ID||0) )
			Fit_Prod_Grid()
		}
	})
</script>


<style> #xSearch_Form div, #xSearch_Form div label {color:#fff; font:16px Tahoma; } </style>
<div id="xSearch_Form" class="box"><div style="padding:20px 0px 20px 30px;" class="box">
	<label class="DMBQ_Name"></label> &nbsp; ( <label class="DMBQ_Count"></label> &nbsp; hồ sơ )
	&nbsp; <u class="pseudo_but" onclick="alert('Chức năng này không được hỗ trợ trong bản Demo')"> Nhập dữ liệu </u>
	&nbsp; <u class="pseudo_but" onclick="alert('Chức năng này không được hỗ trợ trong bản Demo')"> Xóa toàn bộ </u>
	&nbsp; <u class="pseudo_but" onclick="alert('Chức năng này không được hỗ trợ trong bản Demo');"> Xuất ra Word </u>
</div></div>




<style>
	/* Product grid & columns scale */
	.X_data_row td {border-bottom:1px solid #888; vertical-align:middle; padding:6px 3px 6px 3px;}

	.X_HSSO {width:5%; text-align:center; vertical-align:middle; }
	.X_HOPSO {width:5%; text-align:center; vertical-align:middle;}
	.X_TENHS {width:33%; }
	.X_F_DATE {width:15%;}
	/*.X_L_DATE {width:10%;}*/
	.X_SOTO {width:8%;}
	.X_DanhMuc {width:9%;}
	.X_GhiChu {width:6%;}
	.X_Sua {width:8%; text-align:center;}
	.X_Xoa {width:8%; text-align:center;}
</style>

<!--Prod Header-->
<script>$(function(){ $('#xProdHeader').width( $('#xProdHeader').width()-17 ) })</script>
<style> .X_header td { background:#ddd url(Image/Header_Bg.jpg) bottom; height:37px; color:#036; font-weight:bold; text-align:center; vertical-align:middle;} </style>

<div style="background:#A5DBED;" class="box">
<table id="xProdHeader" border=1 style="width:100%; color:#333; border-color:#333; border:0px; height:37px;">
	<tr class="X_header">
		<td class="X_HOPSO">Hộp Số</td>
		<td class="X_HSSO">HS Số</td>
		<td class="X_TenHS">Tiêu đề hồ sơ</td>
		<td class="X_F_Date"> Năm </td>
		<!--td class="X_L_Date">Kết thúc</td-->
		<td class="X_SoTo">Số tờ</td>
		<td class="X_DanhMuc">Bảo quản</td>
		<td class="X_GhiChu">Ghi chú</td>
		<td class="X_SUA"> Sửa </td>
		<td class="X_XOA"> Xóa </td>
	</tr>
</table>
</div>



<div id="xProdGrid" style="overflow:scroll; background:#fff;" class="box">
	<textarea id="Prod_Grid_Row_Tem" class="hide_">
		<tr class="X_data_row">
			<td class="X_HOPSO"> <b style="font-size:13px;">@HOPSO/@HOPSO_Extra/</b> </td>
			<td class="X_HSSO"> @HSSO/@HSSO_Extra/ </td>
			<td class="X_TENHS"> @TENHS/	</td>
			<td class="X_F_DATE"> @F_Date/	</td>
			<td class="X_SOTO"> @SoTo/</td>
			<td class="X_DanhMuc"> @NamBQ/ </td>
			<td class="X_GhiChu"> @GhiChu/	</td>
			<td class="X_Sua"> <b class="pseudo_but" onclick="update_prod(@ID/)" style="margin:0px;">Sửa</b> </td>
			<td class="X_Xoa"> <b class="pseudo_but" onclick="del_prod(@ID/,this)" style="margin:0px;">Xóa</b> </td>
		</tr>
	</textarea>


	<div id="prod_grid_container"></div>

	<div style="margin:20px;" class="box"> <b style="font:13px Tahoma; font-weight:bold; float:left;">Trang &nbsp; : &nbsp; </b>
		<div id="paging_container" class="left"></div>
	</div>


	<script>
		function prod_param_gen(absPage){
			var A = ['key','hsso','hopso','fdate','nambq','soto']
			var s = ""; for (var i=0;i<A.length;i++){
				s+= "&"+A[i]+"="+ $("#"+A[i]).val()
			}

			if ($.IE){ s=$('#search_form input').serialize(); } //****

			s+= "&font="+D.FONT+ "&dmbq_id="+ (D.SEARCH?$("#dmbq_id").val() : D.DMBQ_ID) +"&page="+(absPage||1)
			return s
		}

		//-- JRender
		function RE_PRODUCT(absPage){
			$('head').append('<script src="DATA.asp?t='+(new Date())+'&module=product'+ prod_param_gen(absPage) +'"></'+'script>');
			var DB = DATA.product;
			if ($('#key').val()){ var Condition = '@TenHS/=HighLight(@TenHS/,"'+ $('#key').val() +'");' }
			$('#prod_grid_container').html('<table border=1 style="width:100%; border-right:0px;">'+ JRender(DB, $('#Prod_Grid_Row_Tem').val(), Condition) +'</table>')

			//-- paging render & event binding
			var x = $('#paging_container').html(JPaging(DB.maxPage, absPage)).find('.paging_normal')
			.click(function(){ D.DPROD_BACKUP.CurrentPage=parseInt($(this).text()); RE_PRODUCT($(this).text()); $('#xProdGrid').scrollTop(1e4) })

			//-- effect binding
			$('.X_data_row').mouseover(	function(){ $(this).css('background','#BFDEFF') } ).mouseout( function(){ if (!$(this).hasClass('focusing_row')) $(this).css('background','#fff') } )
			.click(function(){ $(this).toggleClass('focusing_row'); $(this).siblings('.focusing_row').removeClass('focusing_row').trigger('mouseout'); })

			//-- result count showing
			if (D.SEARCH){ $('#seach_result_count').text(DB.recordCount) }
			else{ $(".DMBQ_Count").text(DB.recordCount) }
		}

		$(function(){ RE_PRODUCT() })

		function HighLight(X,key){ var re = new RegExp( '('+key+')' , 'gi' ); return String(X).replace(re, '<b style="color:#900; background:#ffc;">$1</b>') }
	</script>

	<!--[if IE]> <div style="clear:both; height:20px; xbackground:#eee;"></div> <![endif]-->

</div>


<script>
	function del_prod(id,obj){ if (confirm('Bạn chắc chắn muốn xóa hồ sơ này ?')){
		alert("Chức năng xóa không được hỗ trợ trong bản demo !");
	}}
	function update_prod(id){ D.PROD_ID=id; D.EDIT_MODE='update'; D.load('Product_Edit.htm');  }
</script>

