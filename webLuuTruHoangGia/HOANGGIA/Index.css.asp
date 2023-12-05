<%@language = JScript%>
<%Response.ContentType = "text/css" %>

<%//----Page markup with some properties
var M = new Object()

M.Whole_Page_Width = 1000						//the size of whole page including background
M.Whole_BG = '#ccc'								//Background of the whole page
M.Page_Width = 1000								//the size of the content page whithout background
M.Left_BG = ''									//url of the left background image
M.Right_BG = ''									//url of the right background image

M.Left_Width = 240								//Width of the main page's left column	--can be set to 0
M.Main_Width = 514								//Width of the main page's main column
M.Right_Width = 232								//Width of the main page's right column	--can be set to 0

M.Sep_1	= 'width:7px; font-size:0px;'			//-Style for the 1st separator (between left col & main col)
M.Sep_2	= 'width:7px; font-size:0px;'			//-Style for the 2nd separator (between right col & main col)
%>



	/* THE MOST COMMONLY PROPERTIES */
	p,div,body,span,li,ul, img,input,select,textarea{
		border:0px; list-style:none;
		margin:0px; padding:0px;
		font:12px Arial;
		color:#000;
	}

	td {
		margin:0px; padding:0px;
		font:12px Arial;
	}


	input,select,textarea {background:#fff; color:#333; border:1px solid #000; }

	td {vertical-align:top;}
	a {text-decoration:none;}
	a img {border:0px;}

	/* this is replacement for table nuisance cellpadding=0 cellspaing=0*/
	table { border-collapse: collapse; }
	table td, table th { padding: 0px; }

	/* ---remvoe dotted border around focus object (in FF & IE8) -- */
    *::-moz-focus-inner { border : 0px; } 		/*for FireFox*/
    *:focus{ outline : none; }								/*for IE8 */


	/*---Body background---*/
	body {background:<%=M.Whole_BG%>;}

/*
	img { vertical-align: bottom; }				/*---this will remove the space upon & below an image by default */
*/
	.img_middle { vertical-align:middle; }


	/* for the width of the whole page, including background */
		.Whole_Page_Width {width:<%=M.Whole_Page_Width%>px;}

	/* the width of the whole page */
		.Page_Width { width:<%=M.Page_Width%>px; text-align:left; }

	/* for the page's left background */
		.Left_BG { width:100%; background:url(<%=M.Left_BG%>) repeat-y; }

	/* for the page's right background */
		.Right_BG { width:100%; background:url(<%=M.Right_BG%>) right repeat-y; }




	/*width & style of 3 column & 2 separator */
		.Page_Left { width:<%=M.Left_Width%>px; background:url('Home_Files/PageLeft_BG.jpg') right repeat-y; }
		.Page_Right { width:<%=M.Right_Width%>px; background:url('Home_Files/PageRight_BG.jpg') left repeat-y;  }
		.Page_Main { width:<%=M.Main_Width%>px; overflow:hidden; }

		.Page_Sep_1 {<%=M.Sep_1%>}
		.Page_Sep_2 {<%=M.Sep_2%>}



	/* Header style for 3 column & Extra header  */
		.Left_Header { 	width:100%; line-height:36px; border-top:1px solid #ccc;
						background:url(Home_Files/Left_Header.jpg) no-repeat;
						height:30px; padding-left:20px;
						color:#fff; font-size:12px; font-family:tahoma;
						font-weight:bold; line-height:30px;
						clear:both;
					 }
		.Left_Header a { color:#fff;
						font-weight:normal; font-size:11px;
						padding-right:20px; background:url(Home_Files/xArrow.png) right no-repeat;
						}


		.Main_Header {	width:100%; height:30px; color:#000; padding-left:20px; font-weight:bold;
						line-height:30px; background:url(Home_Files/main_header.jpg) no-repeat; border-top:1px solid #ccc; }

		.Main_Header a {color:#000;	background:url(Home_Files/Arrow.png) no-repeat right; padding-right:20px; font-weight:normal;}

		.Home_Header {	width:100%; height:30px; color:#fff; padding-left:17px; font-weight:bold;
						line-height:30px;
						background:url(Home_Files/Main_Header.jpg) no-repeat; }

		.Home_Header p {padding-top:30px; padding-left:15px; color:#145F9A; font-weight:bold;}
		.Home_Header a {color:#fff;	font-weight:bold;}


		.Right_Header { width:100%; line-height:30px; padding-top:0px; padding-left:25px;
						background:url(Home_Files/Right_Header.jpg) no-repeat 0px 0px;
						height:30px; color:#fff;
						font-weight:bold;  }
		.Right_Header a { color:#fff; font-size:11px; background:url(Home_Files/xArrow.png) right no-repeat; padding-right:20px; font-weight:normal; }

		.Right_Header span{
			background:url(Home_Files/Layout_r44_c48.jpg) -2px 2px no-repeat;
			padding-left:20px; padding-right:10px;
			margin-left:20px;
		}

		.Right_Header span a{
			text-transform:none;
			text-decoration:underline; font-size:10px;
		}


	/* The content of main div */
	.Main_Content p{
		padding:12px 14px 12px 14px;
		line-height:1.6;
	}


	/* This class is for clear a div container */
	div .box:after {
		content: "<div></div>";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	/* The perfect div to be separator */
	div .sep_ { font-size:0px; }


	/* These are for vertical alignment width content inside a div. For example : 
		<div style="height:100px;">
			<div class="valign_out"><div class="valign_middle"><div class="valign_in">
				Content that need to be align middle in vertical
			</div></div></div>
		</div>
		Note that we need to set the height for the container of all this div (in this example is 100px; */

	.valign_out {display: table; #position: relative; overflow:hidden; height:100%; width:100%;}
	.valign_middle {#position: absolute; #top: 50%; width:100%; display: table-cell; vertical-align: middle;}
	.valign_in {#position: relative; #top: -50%; width:100%;}



	/* set the width to 100% of the container's width */
	.w100 {width:100%;}
	.h100 {height:100%;}

	/* some border class for fast border */
		.border_red {border:1px solid #c00;}
		.border_blue {border:1px solid #369;}


	/* fast float method */
		.left {float:left;}


	/*some useful link color */
		.white_link {color:#fff;}
		.red_link {color:#c00;}
		.blue_link {color:#369;}


	/* fast format text */
		.b_ {font-weight:bold;}
		.u_ {text-decoration:underline;}
		.i_ {font-style:italic;}


	/*fast position */
		.relative_ {position:relative;}
		.abs_ {position:absolute;}
		.hide_ {display:none;}
		.inline_block_ { display:-moz-inline-stack; display:inline-block;  }
		.inline_ {display:inline;}




	/*=====================================================================*/
	/*====The style defined espescially for this website===*/

	/* the light-gray-border box*/
		.gray_border {border:1px solid #EBEBEB;}

	/*Tab_news*/
	.tab_news_header { width:246px; height:26px; line-height:26px; text-align:center; }
	.tab_news_header a {font-weight:bold; color:#fff;}

<%M = null	//--release the memory%>


