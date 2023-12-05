<style>
	#support_tbl td { height:28px; vertical-align:middle; padding-left:10px; }
	#support_tbl td b {  color:#006699; }
</style>

<div class="Right_Header"> Tư vấn khách hàng </div>
<br />
<div id="support_tbl">
		<table width=100% style="color:#fff">
			<tr><td align=right width="20">
					<img src="/HOANGGIA/Home_Files/Phone.jpg">
				</td>
				<td>
					<b> Phone : </b> &nbsp;
					<b> <%= DB_to_Val( "Select Detail from Intro where title='HomePhone1' " )%> </b>
				</td>
			</tr>

			<tr><td align=right width="20">
					<img src="/HOANGGIA/Home_Files/Phone.jpg">
				</td>
				<td>
					<b> Phone : </b> &nbsp;
					<b> <%= DB_to_Val( "Select Detail from Intro where title='HomePhone2' " )%> </b>
				</td>
			</tr>

			<tr><td align=right width="20">
					<img src="/HOANGGIA/Home_Files/Yahoo.jpg">
				</td>
				<td>
					<b> Yahoo : </b> &nbsp;
					<%var Yahoo_Nick = DB_to_Val( "Select Detail from Intro where title='Yahoo1' " )%>
					<a href="ymsgr:sendIM?<%=Yahoo_Nick%>" style="color:#fff">
						<b><%=Yahoo_Nick%></b>
					</a>
				</td>
			</tr>
			<tr><td align=right width="20">
					<img src="/HOANGGIA/Home_Files/Yahoo.jpg">
				</td>
				<td>
					<b> Yahoo : </b> &nbsp;
					<%var Yahoo_Nick = DB_to_Val( "Select Detail from Intro where title='Yahoo2' " )%>
					<a href="ymsgr:sendIM?<%=Yahoo_Nick%>" style="color:#fff">
						<b><%=Yahoo_Nick%></b>
					</a>
				</td>
			</tr>

			<tr><td align=right width="20">
					<img src="/HOANGGIA/Home_Files/Email.jpg">
				</td>
				<td>
					<b> <%= DB_to_Val( "Select Detail from Intro where title='Email' " )%> </b>
				</td>
			</tr>

		</table>
</div><br />


<div class="Right_Header"> Demo phần mềm </div>
<div align="center">
	<a href="/LT_DEMO" target="_blank"> <img src="/HOANGGIA/Home_Files/Demo.jpg" /> </a>
</div>

<!--/////////////////left news///////////////////////-->
<div class="Right_Header"> 	Tin công ty &nbsp; | &nbsp; <a href="news.asp"> xem toàn bộ </a> </div>
<style>
	#right_news div { padding:18px 18px 27px 13px; border-bottom:1px dotted #0099CC; }
	#right_news div img { width:80px; height:50px; float:left; margin-right:10px;}
	#right_news div a {color:#000; line-height:1.4;}
	#right_news div a:hover {color:#36c;}
</style>
<div id="right_news" class="box">

	<%var DB = DB_to_Arr("Select top 3 * from News Order By Add_Time DESC")
	if (DB){for(DB.i=0;DB.i<=DB.ubound(2);DB.i++){%>
		<div class="box"><a href="news_detail.asp?id=<%=DB.RS("id")%>">
			<img src="<%=DB.RS("Image") || '/HOANGGIA/Home_Files/NoImage.jpg'%>">
			<%=DB.RS("title")%>
		</a></div>
	<%}}%>


</div>




<!--gallery-->
<div class="Right_Header"> 	Gallery ảnh &nbsp; | &nbsp; <a href="gallery.asp"> xem toàn bộ </a> </div>
<style>
	#left_gallery div {width:110px; float:left; text-align:center; margin-bottom:10px; margin-top:10px; }
	#left_gallery div img {width:88px; height:68px; float:none; }
	#left_gallery div a {color:#c50; font-weight:bold; font-size:11px; }
</style>
<div class="box" id="left_gallery" style="overflow:hidden;">

	<%var DB = DB_to_Arr("Select top 4 title,Image from Gallery Order By Add_Time DESC")
	if (DB){for(DB.i=0;DB.i<=DB.ubound(2);DB.i++){%>
		<div class="box">
			<img src="<%=DB.RS('Image')%>"><br />
			<a href="gallery.asp"> <%=DB.RS('title')%> </a>
		</div>
	<%}}%>


</div>



<!--Web Link-->
<div class="Right_Header"> Liên kết website </div>
<style> #rigthAds a img {width:210px; margin:7px; margin-top:12px;}
#rigthAds a { display:block; border-bottom:1px dotted #444; padding-bottom:10px; }</style>
<div id="rigthAds" align="center">
	<%var DB = DB_to_Arr("Select Image,Link,Intro_text from ADS where Pos='right' Order By ID DESC")
	if (DB){for(DB.i=0;DB.i<=DB.ubound(2);DB.i++){%>
		<a target="_blank" href="<%=DB.RS('Link')%>" style="color:#039bcd; font-weight:bold;"><img src="<%=DB.RS('Image')%>">
		<%=DB.RS('Link')%> </a>
	<%}} DB=null;%>
</div>





