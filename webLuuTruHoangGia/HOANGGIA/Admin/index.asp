<!--#include file=Header.asp-->

<div class="Main_Header"> Thống kê website </div>
<div style="padding:10px;" id="stat">



	<span> <b>-------------------------------- SẢN PHẨM: </span></b><br>
	<span class=gray>- Tổng số sản phẩm : &nbsp; <b><span> <%=DB_to_Val('Select Count(ID) from PRODUCT')%></b></span><br />
	<br>



	<span> <b>-------------------------------- TIN TỨC : </span></b><br>
	<span class=gray>- Tổng số bản tin : &nbsp; <b><span> <%=DB_to_Val('Select Count(ID) from NEWS')%></b></span><br />
	<br>

	<span> <b>-------------------------------- BÀI VIẾT CHUYÊN ĐỀ : </span></b><br>
	<span class=gray>- Tổng số bài : &nbsp; <b><span> <%=DB_to_Val('Select Count(ID) from THREAD')%></b></span><br />
	<br>

	<span> <b>-------------------------------- DỰ ÁN : </span></b><br>
	<span class=gray>- Tổng số dự án : &nbsp; <b><span> <%=DB_to_Val('Select Count(ID) from PROJECT')%></b></span><br />
	<br>


	<span> <b>-------------------------------- GALLERY ẢNH: </span></b><br>
	<span class=gray>- Tổng số hình ảnh : &nbsp; <b><span> <%=DB_to_Val('Select Count(ID) from Gallery')%></b></span><br />
	<br>



	<span> <b>-------------------------------- VIDEO: </span></b><br>
	<span class=gray>- Tổng số video : &nbsp; <b><span> <%=DB_to_Val('Select Count(ID) from VIDEO')%></b></span><br />
	<br>


	<span> <b>-------------------------------- ẢNH BANNER: </span></b><br>
	<span class=gray>- Tổng số ảnh : &nbsp; <b><span> <%=DB_to_Val('Select Count(ID) from BANNER')%></b></span><br />
	<br>

<!--Counter-->
	<span> <b>-------------------------------- Thống kê truy cập : </span>
	</b><br>
	Số người truy cập :&nbsp;</span><span><%=Application('visitor') || 1%></span><span class=gray>  <br>
	Hiện đang online : </span><span>  <%=Application('online') || 1%></span><span class=gray>  <br>
	<br>
	&nbsp;</b></span><br>
	<br>
	&nbsp;

</div>




<style>
	#stat span { color:#000; line-height:1.6; }
	#stat .gray { color:#900; line-height:1.6; }
</style>

<!--#include file=Footer.asp-->


