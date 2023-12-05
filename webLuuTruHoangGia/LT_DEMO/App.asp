<!--#include file="inc.asp"-->
<%if (Session('admin')!="true"){ Response.Redirect("Login.asp") }%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>

<head>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link href="Image/Global.css" rel="stylesheet" type="text/css" />
	<link href="Image/Paging.css" rel="stylesheet" type="text/css" />
	<style>
		body input, body textarea {background:#fff; border:1px solid #ccc;}
		.pseudo_but { height:20px; line-height:20px; background:#eee; color:#000; font-weight:normal; font-style:normal; font-size:12px;
						text-decoration:none; text-align:center; padding:3px 12px 3px 12px; cursor:pointer; border:1px solid #ccc; }
	</style>
	<title> PHAN MEM QUAN LY TAI LIEU LUU TRU </title>
	<script src="CORE/jquery.js"></script>
	<script src="CORE/JQuery_Extra.js"></script>
	<script src="CORE/Global.js"></script>
	<script src="CORE/Lobby_Func.js"></script>
	<script src="CORE/JRender.js"></script>
	<script src="CORE/JPaging.js"></script>


<script>
	// Global Variables (kind of session)
	<%DB_to_Str("Select * from FONT_MENU Order By Menu_Order ASC").toJSArr('font')%>

	var D = {};
	D.FONT_ARR = DATA.font
	D.FONT = D.FONT_ARR.x('id')
	D.FONT_NAME = D.FONT_ARR.x('menu_txt')
	D.SEARCH = 0
	D.LAST_LOGIN = "25/5/2012 8:15:19"

	//-- for product_edit page
	D.PROD_ID=0;
	D.EDIT_MODE='';
	D.DPROD_BACKUP = {CurrentPage:0, DMBQ_ID:'', KEY:'', HOPSO:'', HSSO:'', FDATE:'', NAMBQ:'', /*extra*/ TENKHOLUUTRU:'',TENPHONG:'',MUCLUCSO:'',KYHIEUTHONGTIN:'',BUTTICH:'',SOTO:'',CHEDOSUDUNG:'',TINHTRANGVATLY:''}

	D.prevPage = 'stat.asp'; D.thisPage = 'stat.asp';
	D.backpage = function(){ D.DPROD_BACKUP.back=1; D.load(D.prevPage, function(){D.DPROD_BACKUP.back=0}); }

	D.load = function(x,y){ if(D.thisPage.toLowerCase()!=x.toLowerCase()){ D.prevPage=D.thisPage; D.thisPage=x; };  $('#main_container').load(x,y) }
	$(function(){ D.load('stat.asp?font='+D.FONT) }) // -- init page
	$(function(){ $('a').live('mousemove', function(){$(this).attr("hideFocus","true");}) }) // -- prevent IE from focusing the link with dotted outline
</script>


</head>
<body scroll="no" style="overflow:hidden; padding:0px; margin:0px;">


	<!--header & banner-->
	<div id="xBanner" style="height:86px; background:url(Image/Banner_BG.png);"><img src="Image/Banner.png" style="width:987px; height:86px;"></div>


	<!--Top menu-->
	<script> $('#xMenu a').live('click',function(){ var url=$(this).attr('name'); if (url && url.indexOf('.asp')>0) D.load( $(this).attr('name') ) }) </script>
	<style>
		#xMenu {border-bottom:2px solid #444; background:url(Image/Menu.jpg);}
		#xMenu a i {font-style:normal; font:12px Arial; line-height:40px; }
		#xMenu a { display: block; float:left; color:#000; font:10px Verdana; padding:0px 13px 0px 13px; font-weight:bold;
					height:40px; line-height:40px; background:#167EBC url(Image/Menu.jpg); border-right:1px solid #ccc;}
		#xMenu a:hover {background:#167EBC url(Image/Menu_on.jpg);}
		#xMenu span {margin:0px; padding:0px;}
		#xMenu span a {float:right; border:0px; border-left:1px solid #ccc;}
	</style>
	<div id="xMenu" style="height:40px; position:relative;" class="box">
		<a href="#x" style="background:url(Image/Phong.jpg);" id="Font_Picker"> <b style="cursor:pointer;"></b> &nbsp; </a>
		<a href="#x" name="stat.asp" id="stat_link"> THỐNG KÊ </a>
		<a href="#x" name="Product.asp?search=1" id="prod_link"> TÌM KIẾM </a>
		<a href="#x" name="Product_Edit.asp" id="edit_link" onClick="D.EDIT_MODE='insert'"> THÊM HỒ SƠ </a>
		<a href="#x" name="xChangePass.asp" onClick="alert('Chức năng này không được hỗ trợ trong bản Demo')"> ĐỔI MẬT KHẨU </a>

		<span>
			<a href="#x" name="Restore.htm" onClick="alert('Chức năng này không được hỗ trợ trong bản Demo')">PHỤC HỒI **</a> <a href="#x" name="Backup.htm" onClick="alert('Chức năng này không được hỗ trợ trong bản Demo')">SAO LƯU **</a>
			<font id="DanhmucBQ_Link_Container"></font><label class="hide_" id="DanhmucBQ_Link_Tem"><a href="#x" style="color:#900; font-size:11px;" rel="@id/">@Menu_Txt/ </a></label>
			<script>
				<%var SQL = "Select ID,Menu_Txt,font_id from DanhMucBQ Order By ID DESC"
				DB_to_Str(SQL).toJSArr('dmbq')%>
				var xDMBQ = DATA.dmbq;
				var DMBQ;

				function getDMBQ_byFontID(x){
					DMBQ = dcorp_ObjectClone(DATA.dmbq); DMBQ.splice(0,100);
					for (xDMBQ.i=0;xDMBQ.i<xDMBQ.length;xDMBQ.i++){
						if(xDMBQ.x('font_id')==x){ DMBQ.push(xDMBQ[xDMBQ.i]) }
					}
					DMBQ.F = DMBQ.Field;
					return DMBQ;
				}

				function Load_DMBQ_List(id){
					var this_DMBQ = getDMBQ_byFontID(id || D.FONT)
					$('#DanhmucBQ_Link_Container').html(  JRender( this_DMBQ, $('#DanhmucBQ_Link_Tem').html() ) )
				}
				$(function(){ Load_DMBQ_List() })
 				$('#DanhmucBQ_Link_Container a').live('click',function(){ D.DMBQ_ID = $(this).attr('rel'); D.SEARCH = 0; D.load('Product.asp?font='+D.FONT+'&dmbq_id='+D.DMBQ_ID);	})
			</script>
		</span>


		<!--hidden font_picker-->
		<style>
			#Float_Font_Picker { position:absolute; top:100%; left:0; z-index:100; display:none; width:180px; filter:progid:DXImageTransform.Microsoft.Shadow(color=#000000,direction=135,Strength=6); background:#fff; }
			#Float_Font_Picker a {display:block; font:12px Arial; letter-spacing:1px; width:180px; height:40px; line-height:40px; padding-left:13px; background:url(Image/phong.jpg); font-weight:bold; color:#000; border-top:1px solid #ccc; float:none; }
			#Float_Font_Picker a:hover { color:900; background:url(Image/phong.jpg); }
			a#font_manage_link { height:26px; line-height:26px; background:#f90; color:#fff; }
			a#font_manage_link:hover { background:#f90; color:#fff; }
		</style>
		<div id="Float_Font_Picker">
			<a href="#x" rel="0" id="font_manage_link" xonClick="D.load('font.htm');$('#Float_Font_Picker').hide();"> Quản lý phông ► </a>
		</div>

		<div class="hide_" id="font_link_tem"><a href="#x" rel="@ID/"> @Menu_Txt/ ► </a></div>
		<script>
			function FONT_PICKER_GEN(){

				<%var A=DB_to_Str("Select * from FONT_MENU Order By Menu_Order ASC")
				A.toJSArr('font')%>

				D.FONT_ARR = DATA.font; D.FONT_ARR.F=D.FONT_ARR.Field;
				var Font_Link = JRender( D.FONT_ARR , $('#font_link_tem').html(), null )
				$('#Float_Font_Picker a[rel!="0"]').remove(); $('#Float_Font_Picker').prepend(Font_Link)
				$('#Font_Picker b:first').html( $('#Float_Font_Picker a[rel="'+D.FONT+'"]').text() )
			}

			function rechange_link(){
				$("#stat_link").attr("name","stat.asp?font="+D.FONT);
				$("#prod_link").attr("name","product.asp?search=1&font="+D.FONT);
				$("#edit_link").attr("name","Product_Edit.asp?font="+D.FONT);
			}

			$(function(){
				FONT_PICKER_GEN();
				$('#Float_Font_Picker').floatDiv_Model( $('#Font_Picker'),null,null )
				rechange_link()

				// event binding
				$('#Float_Font_Picker a[rel!="0"]').live('click',function(){
					$('#Font_Picker b:first').text($(this).text());  Load_DMBQ_List($(this).attr('rel'));
					$('#Float_Font_Picker').hide(); D.FONT = $(this).attr('rel'); D.FONT_NAME = $(this).text().replace('►','')
					D.load('stat.asp?font='+ D.FONT);
					rechange_link()
				})
			})
		</script>

	</div>




	<!--main page-->
	<div style="display:block; width:10px; height:10px; overflow:hidden; background:#fff url(Image/BG.jpg) repeat-x 0px -170px;" id="main_container"> </div>
	<script>
		//adjust main_container width, height to fit screen
		$(function(){ $('#main_container').width($.viewport().w).height( $.viewport().h - $('#xBanner,#xMenu,#xStatus').totalHeight() + 17 ) })
	</script>




	<!--Footer-->
	<div id="xStatus" style="text-transform:uppercase; position:absolute; z-index:100; width:100%; bottom:0px; background:url(Image/Foot_BG.jpg) repeat-x; height:32px; line-height:32px; padding-left:6px; font-size:11px; color:#555;">
		Phần mềm Quản lý và tra cứu tài liệu lưu trữ phiên bản F.2.0 &nbsp; &nbsp; MỌI THÔNG TIN LIÊN HỆ : CÔNG TY TNHH MỘT THÀNH VIÊN LƯU TRỮ HOÀNG GIA - ĐT: 0912.28.29.30 - 0333.624.233
	</div>


</body>
</html>