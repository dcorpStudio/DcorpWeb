
<!--/////////////////search form///////////////////////-->
<div style="background:#f1f1f1;">
<div style="padding:15px 0px 0px 0px;"><form style="display:inline;" action="news.asp">
	<input type="text" name="key" style="height:21px; border:1px solid #999; float:left; width:150px; margin-left:10px; line-height:21px; xbackground:#f1f1f1;" value="Từ khóa..." />
	<input tabindex="2" type="image" src="Home_Files/SearchBut.png" style="float:left; border:0px; outline:none;" />
	<input type="hidden" name="search" value="1" />
</form></div>
<div style="clear:both; height:15px;"></div>
</div>

<!--Product menu-->
<div class="Left_Header" style="margin-top:0px; "> Danh mục sản phẩm </div>
<style>
	#left_prodmenu a img { width:188px; margin-bottom:5px; border:1px solid #999; }
	#left_prodmenu a { color:#333; font-weight:bold; font-size:12px; display:block; display:block; height:30px; line-height:30px;
						border-bottom:1px solid #999; background:url(Home_Files/Cat_BG.jpg); padding-left:25px; text-transform:uppercase; font-size:11px; }
	#left_prodmenu a:hover { color:#E15517; }
</style>
<div id="left_prodmenu">
	<%var DB = DB_to_Arr("Select ID,Menu_Txt from MENU Order By Menu_Order ASC");
	if (DB){for(DB.i=0;DB.i<=DB.ubound(2);DB.i++){%>
		<a href="Product.asp?cat=<%=DB.RS('id')%>"> <%=DB.RS('Menu_Txt')%> </a>
	<%}} DB=null; %>
</div>



<!--Project-->
<div class="Left_Header" style="margin-top:0px;">
	Các dự án &nbsp; | &nbsp; <a href="Project.asp"> xem toàn bộ </a>
</div>
<style>
	#left_project a img { width:80px; margin-bottom:5px; border:1px solid #999; float:left; margin-right:5px; }
	#left_project a { color:#006699; font-weight:bold; font-size:12px; display:block; text-align:left; }
	#left_project a:hover { color:#0099CC; }
	#left_project div {border-bottom:1px dotted #444; padding:10px 7px 10px 7px;}
	#left_project div div {border-bottom:0px; padding:0px;}
</style>
<div id="left_project" align="center">
	<%var DB = DB_to_Arr("Select top 5 ID,Image,title from PROJECT Order By Add_Time DESC");
	if (DB){for(DB.i=0;DB.i<=DB.ubound(2);DB.i++){%>
		<div class="box">
			<a href="Project_Detail.asp?id=<%=DB.RS('id')%>"> <img src="<%=DB.RS('Image')%>" /><%=DB.RS('title')%> </a>
			<div style="clear:both;"></div>
		</div>
	<%}} DB=null; %>
</div>





<!--video-->
<div class="Left_Header"> 	Video &nbsp; | &nbsp; <a href="video.asp"> xem toàn bộ </a> </div>
<div style="padding:20px 10px 20px 10px;">

	<%var DB = DB_to_Arr("Select top 1 title,Video from Video Order By Add_Time DESC")
	if (DB){for(DB.i=0;DB.i<=DB.ubound(2);DB.i++){%>

		<embed type="application/x-shockwave-flash" src="Home_Files/Video_Player/player.swf" style="" id="ply" name="ply" bgcolor="#ffffff" 
		quality="high" allowfullscreen="true" fullscreen="true" wmode="transparent" allowscriptaccess="always" 
		flashvars="file=<%=DB.RS('Video')%>&amp;controlbar=bottom&amp;autostart=false&amp;fullscreen=true" 
		height="164" width="220">
		<div class="box" align="center" style="margin-top:10px;"><b><%=DB.RS('title')%></b></div>
	<%}}%>

</div>




<!--statistic-->
<div class="Left_Header"> Thống kê website </div>
<div style="height:179px; padding:18px 0px 0px 28px;">
	<style> #stat li {color:#333; line-height:2.2; background:url(Home_Files/Arrow.jpg) no-repeat 8px; padding-left:24px;} </style>
	<ul id="stat">
		<li> Số bài viết : <%=DB_to_Val("Select Count(ID) from news")%> </li>
		<li> Số sản phẩm : <%=DB_to_Val("Select Count(ID) from Product")%> </li>
		<li> Số người online : <%=Application('Online') || 1%> </li>
		<li> Tổng số truy cập : <%=Application('visitor') || 1%> </li>
	</ul>
</div>






