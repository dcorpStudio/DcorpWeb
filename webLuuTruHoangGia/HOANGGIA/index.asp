<!--#include file=Header.asp-->



<!--- HOME ABOUT -->
<div class="box" style="padding:0px 15px 0px 15px; text-align:left;">
<br /><br />
	<style>
		#short_about img { margin:0px 10px 10px 0px; }
	</style>
	<div id="short_about" style="text-align:justify;">
		<%=INTRO('short_about')%>
	</div>
	<a style="float:right;" href="about.asp"><img src="Home_Files/detail.jpg" /></a>

</div>
<div class="sep_" style="height:10px; clear:both;"></div>




<!--- HOME PRODUCT -->
<div class="Main_Header"> Các sản phẩm nổi bật &nbsp; | &nbsp; <a href="product.asp"> xem toàn bộ </a> </div>
<style>
	#Home_Prod div {float:left; width:162px; height:168px; text-align:center; overflow:hidden; margin:0px 0px 0px 0px; padding-bottom:4px;
					border-bottom:1px solid #ccc;  }
	#Home_Prod div a {color:#006699; font-size:11px; font-weight:bold; text-transform:uppercase;}
	#Home_Prod div a:hover {color:#00CCFF;}
	#Home_Prod div a b { display:block; padding:0px 20px 0px 20px;}
	#Home_Prod div a img {width:90px; height:110px; margin:8px 0px 8px 0px; }
</style>
<div id="Home_Prod" class="box" style="margin:0px; padding:10px; padding-top:0px;">

	<%var DB = DB_to_Arr("Select top 9 * from Product Order By Add_Time DESC")
	if (DB){for(DB.i=0;DB.i<=DB.ubound(2);DB.i++){%>
		<div class="box">
			<a href="Product_Detail.asp?ID=<%=DB.RS('id')%>"> <img src="<%=Single_Image(DB.RS('Image')) || 'Home_Files/NoImage.jpg'%>" /><br />
			<b><%=DB.RS('Name')%></b> </a>
		</div>
	<%}}%>

</div>
<br />






<!--- HOME THREADS -->
<div class="Main_Header"> Các bài viết chuyên đề &nbsp; | &nbsp; <a href="thread.asp?cat=1"> xem toàn bộ </a> </div>
<style>
	#home_thread div {padding:0px 15px 0px 15px;}
	#home_thread div a {color:#006699; font-weight:bold; line-height:3.0; font-size:13px;}
	#home_thread div p img {width:100px; float:left; }
	#home_thread div p {color:#333; font-size:13px; text-align:justify;}
</style>
<div id="home_thread" class="box">
	<%var DB = DB_to_Arr("Select top 2 * from Thread Order By Add_Time DESC")
	if (DB){for(DB.i=0;DB.i<=DB.ubound(2);DB.i++){%>

		<div class="box">
			<a href="thread_detail.asp?id=<%=DB.RS('id')%>"> <%=DB.RS('title')%> </a>
			<p><img src="<%=DB.RS('image') || 'Home_Files/NoImage.jpg'%>" align="left" style="margin-right:15px;" />
			<%=DB.RS('Intro')%> </p>
			<a style="float:right;" href="thread_detail.asp?id=1"><img src="Home_Files/detail.jpg" /> </a>
		</div><div style="clear:both;" class="sep_"></div>

	<%}}%>
</div>
<br />
<br />






<!--#include file=Footer.asp-->


