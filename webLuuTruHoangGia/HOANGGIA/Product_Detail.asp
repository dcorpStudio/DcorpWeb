<!--#include file="Header.asp"-->

<style>
	.Color_Cell {cursor:hand;border:1px solid #000000; width:20; height:20; cursor:pointer }
	.Green_link {color:#900;}
	.Green_link:hover {color:#aa0000;}

	.menu_String {color:#000}
	.menu_String:hover {color:#669900}

	.Prod_Detail_Name {color:#900; font-size:13}

	.other_prod {color:#ffaa00; font-weight:bold;}
	.other_prod:hover {color:#ffaa00; font-weight:bold; text-decoration:underline}
</style>



<script>
	function Open_Image(ID){
		var Obj = Get(ID);
		var P = getPageCoords(Obj);
		Magnify(Obj.src, P.x , P.y)
	}
</script>


<%
//-----Xay dung cau SQL them tham so' truyen vao`
var E = (VBSession('Lang')=='E')?'E_':'';
var ID = VBRequest('ID'); ID = parseInt(ID);
if (!isNaN(ID)){

	var SQL = ' Select * from PRODUCT where ID='+ID

	//----Hien thi Data
	var DB = DB_to_Arr(SQL)
	if (DB){

		//---tao Image_Arr
		var Img_Arr = DB.RS('Image').split('\r\n')
		if (Img_Arr[0]==''){ Img_Arr.splice(0,1) }
		if (!Img_Arr.length){  Img_Arr[0] = 'Home_Files/NoImage.jpg' }%>



<script>
	function P_Img(Obj){
		Get('focus_image').src = Obj.src
	}

	function Img_On(Obj){ Obj.style.border = '2px solid #cc6600' }
	function Img_Out(Obj){ Obj.style.border = '2px solid #000000' }
</script>



			<div class="Main_Header">
				<%var Cat = parseInt(Request('Cat'));
				if (!isNaN(Cat)){%>	<a href="Product.asp?Cat=<%=Cat%>"><b><%=DB_to_Val("Select Menu_Txt from MENU where ID = " + Cat)%></b></a> <%}%>
			</div>


			<!--Detail-->
			<table width="100%" cellpadding=0 cellspacing=0>
				<tr>
					<td valign=top style="padding:10">

						<!--IMAGE COMPONENT-->
							<div align=left style="float:left; margin-right:15px;">
								<%if (Img_Arr[0]){  for (var i=0;i<Img_Arr.length;i++){%>
									<a href="<%=Img_Arr[i]%>" rel="shadowbox[prod_detail]">
										<img border="0" src="<%=Img_Arr[i]%>" width="220" style="margin-bottom:10px;" id="focus_image"><br />
									</a>
								<%}}%>
							</div>
						<!--////IMAGE COMPONENT-->



						<b style="font-size:15px; color:#900"><%=DB.RS('Name')%></b> <br /><br />

						<p style="line-height:1.8">
							<b><u>Giới thiệu</u> : <font color="#666666"></b><%=DB.RS('Intro')%></font><br>
							<%if (DB.RS('Price')){%><b><u>Giá bán</u></b> : <b style="color:#900;"> <%=Format_Price(DB.RS('Price'))%> </b> <br> <%}%>
						</p>
						<div style="color:#000; line-height:1.6;"><br />
							<b><u>Thông tin chi tiết</u></b><br /><br />
							<%=DB.RS('Detail')%>
						</div>
					</td>
				</tr>

			</table>
			<!--/////Detail-->




			<!--Other product for this Car-->
<br />
<br />
				<div class="admin_paging"> <b> Sản phẩm cùng danh mục </b></div>
				<%var SQL = 'Select top 3 * from Product where Cat_ID=' + DB.RS('cat_ID') + ' and ID <> '+ DB.RS('ID') +' Order By Add_Time DESC'
				No_Status=No_Paging=No_Err_Report=No_Header=true%>
				<!--#include file=Product_Core.asp-->
			<!--///////Other product for this Car-->




	<%
	DB=null
	}else{%>
		<p style="margin:20; color:#000">Sản phẩm không tồn tại hoặc đã bị xóa.</p>
	<%}%>

<%}%>




<!--#include file="Footer.asp"-->