<style>
	.Left_Header {color:#fff; text-transform:uppercase; }

	.left_menu {line-height:35px; height:35px; }
	.left_menu a {border-bottom:1px solid #ccc; color:#666; font-weight:bold; display:block; float:left; width:100%; padding-left:20px;}
	.left_menu a:hover {color:#900; background:#eee;}
</style>


<div style="padding:10px; padding-left:20px;">
	<a href="change_pass.asp" style="color:#900; text-decoration:underline;"> <b>Đổi mật khẩu</b> </a> &nbsp; | &nbsp;
	<a href="#logout" onclick="logout()" style="color:#900; text-decoration:underline;"> <b>Thoát</b> </a>
	<script> function logout(){ if(confirm('Bạn chắc chắn muốn thoát ?')) location="logout.asp"} </script>
</div><br />



<!--Left menu -->
<div class="Left_Header"> Sản phẩm </div>
<div class="left_menu box">
	<a href="Menu_Edit.asp"> Quản lý danh mục sẩn phẩm </a>
	<a href="Product.asp"> Xem toàn bộ sản phẩm </a>
	<a href="Product_Edit.asp?mode=insert"> Thêm sản phẩm mới </a>
</div>


<div class="Left_Header"> Tin công ty </div>
<div class="left_menu box">
	<a href="News.asp"> Xem toàn bộ tin </a>
	<a href="News_Edit.asp?mode=insert"> Thêm tin mới </a>
</div>


<div class="Left_Header"> Gallery </div>
<div class="left_menu box">
	<a href="Gallery.asp"> Xem toàn bộ ảnh </a>
	<a href="Gallery_Edit.asp?mode=insert"> Thêm hình ảnh </a>
</div>



<div class="Left_Header"> Video </div>
<div class="left_menu box">
	<a href="Video.asp"> Xem toàn bộ video </a>
	<a href="Video_Edit.asp?mode=insert"> Thêm video </a>
</div>



<div class="Left_Header"> DỰ ÁN </div>
<div class="left_menu box">
	<a href="Project.asp"> Xem toàn bộ dự án </a>
	<a href="Project_Edit.asp?mode=insert"> Thêm dự án </a>
</div>



<div class="Left_Header"> Bài viết chuyên đề </div>
<div class="left_menu box">
	<a href="Thread.asp"> Xem toàn bộ chuyên đề </a>
	<a href="Thread_Edit.asp?mode=insert"> Thêm chuyên đề </a>
</div>


<div class="Left_Header"> QUẢNG CÁO </div>
<div class="left_menu box">
	<a href="Ads.asp"> Xem toàn bộ quảng cáo </a>
	<a href="Ads_Edit.asp?mode=insert"> Thêm quảng cáo </a>
</div>


<!--

<div class="Left_Header"> ẢNH BANNER </div>
<div class="left_menu box">
	<a href="Banner.asp"> Xem toàn bộ ảnh banner </a>
	<a href="Banner_Edit.asp?Mode=insert"> Thêm ảnh banner </a>
</div>
-->

