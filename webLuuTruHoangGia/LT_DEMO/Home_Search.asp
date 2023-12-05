					<script>
						function clearKeyDefault(){	if ($("#skey").val()=='Nhập từ khóa'){ $("#skey").val('') }; return true; }
						$(function(){ $("#xleft_search_form").submit(clearKeyDefault) })
					</script>
					<form action="news.asp" method="get" style="display:inline;" id="xleft_search_form">
					<div class="box" style="<%=Not_Index?'width:233px;':''%> background:url(Home_Files/Home_Search_BG.jpg) repeat-x; height:84px;">
						<table width="100%" cellpadding="0" cellspacing="0">
							<tr>
								<td rowspan="2" width="69" align="center" style="padding-top:<%=Not_Index?'13':'10'%>px;"> <b style="color:#585858;">Tìm kiếm</b> </td>
								<td colspan="2" style="padding-top:10px;">
									<input value="<%=Convert(Request('key')) || 'Nhập từ khóa'%>" name="key" id="skey" style="width:<%=Not_Index?155:172%>px; height:19px; border:1px solid #ccc; color:#999; 
											font-size:11px; padding-left:2px;" onClick="clearKeyDefault()" />
								</td>
							</tr>
							<tr>
								<td style="padding-top:10px; width:<%=Not_Index?100:113%>px;">
									<%var S=new Control_NSelectbox('xcat'); S.Data=Request('xcat'); S.Intro_Text='-- Chuyên mục --'; S.Width=112; S.Style='style="width:'+(Not_Index?110:112) +'px; height:19px; border:1px solid #ccc; color:#999; font-size:11px;"';
										S.DB=DB_to_Arr('Select * from News_Menu Order By Menu_Order'); R(S.Output()); S=null%>
								</td>
								<td style="width:67px; padding-top: 10px;" align="center"><input type="image" src="Home_Files/Home_Search_But.jpg" style="border:0px;"></td>
							</tr>
						</table>
					</div>
					<input type="hidden" name="search" value="1" />
					</form>
					<div class="sep_" style="height:6px;"></div>