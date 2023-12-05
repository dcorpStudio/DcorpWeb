<!--#include file="inc.asp"--><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<!--#include file="Lib/Common_Control.asp"-->
<!--#include file="Lib/JavaScript.asp"-->


<a name="top"></a>
<html>
	<head>
		<title> :: Lưu trữ Hoàng Gia :: </title>
		<META content="" name=keywords>
		<META content="" name=description>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
		<link rel=stylesheet href=Index.css.asp>
		<script src="lib/JS/Common.js"></script>
		<script src="JQuery.js"></script>
		<script src="HoverIntent.js"></script>
		<script src="My_Plugin.js.asp"></script>
		<!--[if IE 6]> <style>	.iepngfix {behavior:url(iepngfix.htc.asp)} </style> <![endif]-->

		<link id="ShadowBox_Css" rel="stylesheet" type="text/css" href="Home_Files/ShadowBox/shadowbox.css">
		<script src="Home_Files/ShadowBox/shadowbox.js"></script>
		<script> Shadowbox.init(); </script>
	</head>

	<body>


	<!--The page start here-->
	<div align=center>
		<div class="Whole_Page_Width">

			<!--This 2 next divs are for the body background only-->
			<div class="Left_BG">
			<div class="Right_BG">
				<div class="w100" style="background:url(Home_Files/Top_Corner_BG.jpg) no-repeat;"><!--The Extra div for the corner top background-->
				<div class="Page_Width">
				<!--[if IE 6]> <style> .Left_BG,.Right_BG {background:none;} </style> <![endif]-->



					<!--banner - logo - ads-->
					<div style="position:relative;">
						<img src="Home_Files/TopBan.jpg" style="width:773px; height:160px; margin:0px; vertical-align:bottom;">
						<div style="position:absolute; right:0px; top:0px;">
							<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="227" height="160">
								<param NAME="movie" VALUE="Home_Files/TopBan.swf"> <param NAME="quality" VALUE="high">
								<embed src="Home_Files/TopBan.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="227" height="160"></embed>
							</object>
						</div>
					</div>


					<!--menu-->
					<style>
						#Top_Menu {padding-left:17px;}
						#Top_Menu li {float:left; position:relative;}
						#Top_Menu li a {color:#fff;float:left; line-height:40px; line-height:40px; display:block; padding:0px 17px 0px 17px; font-weight:bold; }
						#Top_Menu li a:hover { background:url(Home_Files/Top_Menu_Bg_Over.jpg); color:#fff; }
			
						#Top_Menu li div {background:#097CB4; width:200px; padding:10px; display:none; position:absolute; top:100%; left:0; z-index:100;}
						#Top_Menu li div a {display:block; float:left; width:140px; color:#fff; font-weight:bold; height:30px; line-height:30px; overflow:hidden;}
						#Top_Menu li div a:hover {background:#039BCD; color:#fff;}
					</style>
					<script>
						$(function(){
							$('#Top_Menu li').hover(function(){$('div',this).show()} , function(){$('div',this).hide()} )
						})
					</script>

					<div class="Page_Width" style="height:40px; background:url(Home_Files/Top_Menu_Bg.jpg);">
						<ul id="Top_Menu">
							<li><a href="index.asp"> Trang chủ </a></li>
							<li><a href="about.asp"> Giới thiệu </a></li>
							<li>
								<a href="product.asp"> Sản phẩm </a>
								<div>
									<%var DB = DB_to_Arr("Select ID,Menu_Txt from MENU Order By Menu_Order")
									if (DB){for(DB.i=0;DB.i<=DB.ubound(2);DB.i++){%>
										<a href="Product.asp?cat=<%=DB.RS("id")%>"> <%=DB.RS("Menu_Txt")%> </a>
									<%}}%>
								</div>
							</li>
							<li><a href="service.asp"> Dịch vụ </a></li>
							<li><a href="hsnl.asp"> Năng lực </a></li>
							<li><a href="price_list.asp"> Báo giá </a></li>
							<li><a href="project.asp"> Các dự án </a></li>
							<li><a href="tech.asp"> Trao đổi nghiệp vụ </a></li>
							<li><a href="gallery.asp"> Gallery ảnh </a></li>
							<li><a href="video.asp"> Video </a></li>
							<li><a href="contact.asp"> Liên hệ </a></li>
						</ul>
					</div>







<style>
	.admin_but { background:url(admin/IMG/But_Bg.jpg); height:22px; }
	.title, .title li, .title li a, .title a { color:#9BBCff; }
	.title a:hover {color:#fc0;}
	.other_news li { height:20px; padding-left:10px; background:url(Home_Files/li.jpg) no-repeat 0 6px; }
	.detail_link { color:#FFB403; }

	.admin_paging { width:500; height:35px; line-height:35px; padding-left:20px; background:url(Home_Files/paging_bg.jpg); color:#444; }
	.admin_paging div { line-height:35px; }
	.admin_paging select {font:11px Arial; color:#666; border:1px solid #999;}

	.admin_paging1 { height:35px; line-height:35px; text-align: left; padding-left:10px; color:#ccc; background:url(admin/IMG/paging_bg.png); }
</style>


<style>
	.Main_Header {margin-bottom:20px;}
</style>
