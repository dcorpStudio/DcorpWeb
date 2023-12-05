


						<div class="box w100" align="center">
							<div class="box" style="width:807px; height:141px; overflow:hidden; margin-bottom:10px; position:relative;">
							<div id="Partner_Scroll"><ul>
						
								<%var DB = DB_to_Arr("Select * from Banner Order By ID DESC")
								if (DB){
									for (DB.i=0; DB.i<=DB.ubound(2); DB.i++){%>
										<li><div class="thumbnail"><img src="<%=DB.RS('Image')%>"></div></li>
									<%}
								}
								DB=null%>
						
							</ul></div>
							</div>
						</div>

						<!--Script and style for the thumbnail list-->
						<script src="jcarousellite.js" type="text/javascript"></script>
						<script>
							$(function() {
								//---make the image list as long as the container
								var P = $('#Partner_Scroll ul')
								var L = P.find('li').length
								if (L < 4){
									var tmp = P.html()
									for (var i=0; i< Math.floor( 4/L ) ; i++){
										P.append( tmp )
									}
								}

								$("#Partner_Scroll").jCarouselLite({
									horizontal: true, hoverPause:true, visible:4, auto:1000, speed:4000
								});

							});
						</script>
						<style>
							#Partner_Scroll { width:2000px; height:141px; }
							#Partner_Scroll ul li{ list-style:none; padding:0px; float:left; }
							#Partner_Scroll .thumbnail img{ width:201px; height:141px; cursor:pointer; }
						</style>


