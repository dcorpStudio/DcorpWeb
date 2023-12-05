<!--#include file="CORE/Inc.asp"-->

<%//-- Protect the admin section
var A = String(Request.ServerVariables("SCRIPT_NAME"))
A = A.match(/\/admin_[^\/]+.asp$/i)
if (A && A.length && RQS('admin')!='1'){ Response.Redirect('default.asp') }
%>

<!--  JQuery        -->		<script src="<%=Global.x('site_path')%>/JS/jquery-1.6.4.min.js"></script>


<script>
	//-- render all the JContainer block in page after page load
	function BlockRender(x,data_url){
		if (data_url){ $('head').append('<script src="'+data_url+'"></'+'script>'); };
		if (typeof(x)=='string'){x=$('#'+x) }; $(':not(.JTemplate):not(.JCondition)',x).remove();
		x.append( JRender( DATA[x.attr('name')], $('.JTemplate:first',x).val(), $('.JCondition:first',x).val()  ) )	//---note : tem & condition should be inside textarea to preserve code's accuracy
	}
	$(function(){  $(".JContainer").each(function(){ BlockRender($(this)) }); })

	/*** IMPORTANT NOTE !
		The template code should be covered by a div, for it easy to remove when RE-RENDER
	***/
</script>




