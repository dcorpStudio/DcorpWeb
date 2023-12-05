<!--#include file="Header.asp"-->


<style>
	.Site_Map1 { height:45px; padding-left:109px; xbackground:url(Home_Files/Site_map.jpg) no-repeat; background-position:60px 0px; }

	.Sitemap_Cell { cursor:pointer; border:1px solid #cccccc; text-align:center; padding:5px; }

	.Sitemap_Child_1 { cursor:pointer; border:1px solid #cccccc; Xtext-align:center; padding:3px; padding-left:10; background:#eeeeee; font-weight:bold }

	.Sitemap_Child_2 { cursor:pointer; border:1px solid #cccccc; Xtext-align:center; padding:3px; padding-left:5px; padding-right:5px; }

	.Site_Map_Has_Child {padding-bottom:0px; height:30px; vertical-align:bottom;  padding-left:109px; background:url(Home_Files/Site_map.jpg) no-repeat; background-position:60px 0px;}

	.Site_Map_Link {color:#cccccc;}

	.Site_Map_Link:hover {color:#fc0;}

	.Site_Map_Table td { padding:10px 0px 10px 0px; }
</style>


<script> function Site_Map_Go( URL ){ window.location.href = URL } </script>


<div class="Main_Header">
	Sơ đồ website
</div>
<div style="padding:20px 0px 0px 40px;">



						<!--REAL SITEMAP-->

									<table cellpadding=0 cellspacing=0 class="Site_Map_Table">
										<tr>
											<td>
												<div style="width:160px;" class="Sitemap_Child_2">
													<a href="Index.asp" class="Site_Map_Link"> <b style="text-transform:uppercase; color:#fc0;"> Trang chủ </b></a>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div style="width:160px;" class="Sitemap_Child_2">
													<a href="About.asp" class="Site_Map_Link"> <b style="text-transform:uppercase"> Giới thiệu </b></a>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div style="width:160px;" class="Sitemap_Child_2">
													<a href="Product.asp" class="Site_Map_Link"> <b style="text-transform:uppercase"> Dự án </b></a>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div style="width:160px;" class="Sitemap_Child_2">
													<a href="News.asp" class="Site_Map_Link"> <b style="text-transform:uppercase"> Tin tức </b></a>
												</div>
											</td>
										</tr>
									</table>


									<!--RAO MENU-->
									<%var DB = DB_to_Arr("Select * from RAO_MENU where Root_Item=0 Order By Menu_Order")
									if (DB){%>
											<table cellpadding=0 cellspacing=0>
												<%for (DB.i=0; DB.i<=DB.ubound(2); DB.i++){%>

													<tr>
														<td style="padding:10px 0px 10px 0px;">
															<div style="width:160px;" class="Sitemap_Child_2">
																<a href="RAO.asp?RAO_TYPE=<%=DB.RS("ID")%>" class="Site_Map_Link">
																<b style="text-transform:uppercase"><%=DB.RS("MENU_Txt")%></b></a>
															</div>
														</td>
													</tr>


													<!--Child Node-->
													<%var P = DB_to_Arr("Select * from RAO_MENU where Root_Item = " +DB.RS('ID') + " Order By Menu_Order" )
													if (P){%>
														<tr><td style="background:url(Home_Files/Site_Map2.jpg) repeat-y; background-position:60px 0px;">
															<table cellpadding=0 cellspacing=0>
															<%for (P.i=0; P.i<=P.ubound(2); P.i++){%>
																<tr>
																	<td class="Site_Map_Has_Child" <%if (P.i==P.ubound(2)){%> style="background:url(Home_Files/Site_map1.jpg) no-repeat; background-position: 60px 0px;" <%}%> >
																		<div style="width:160px" class="Sitemap_Child_2">
																			<a href="News.asp?cat=<%=P.RS("ID")%>" class="Site_Map_Link">
																			<%=P.RS("MENU_Txt")%></a>
																		</div>
																	</td>
																</tr>
															<%}%>

															</table>
														</td></tr>
													<%}%>
													<!--Child Node-->

												<%}%>
											</table>
									<%}
									DB = P = null%>
									<!--RAO MENU-->



								<table cellpadding=0 cellspacing=0 class="Site_Map_Table">
									<tr>
										<td>
											<div style="width:160px;" class="Sitemap_Child_2">
												<a href="Help.asp" class="Site_Map_Link"> <b style="text-transform:uppercase"> Hướng dẫn </b></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div style="width:160px;" class="Sitemap_Child_2">
												<a href="Term.asp" class="Site_Map_Link"> <b style="text-transform:uppercase"> Quy định </b></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div style="width:160px;" class="Sitemap_Child_2">
												<a href="Deposit.asp" class="Site_Map_Link"> <b style="text-transform:uppercase"> Ký gửi </b></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div style="width:160px;" class="Sitemap_Child_2">
												<a href="Contact.asp" class="Site_Map_Link"> <b style="text-transform:uppercase"> Liên hệ </b></a>
											</div>
										</td>
									</tr>
								</table>

						<!--REAL SITEMAP-->
</div>



<br />
<br />
<br />

<div class="admin_paging"> &nbsp; </div><br />
<br />



<!--#include file="Footer.asp"-->